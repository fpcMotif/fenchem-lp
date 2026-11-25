import * as stylex from "@stylexjs/stylex";
import { GripVertical, Maximize, Minus, Plus, RotateCcw } from "@fenchem-lp/ui/components/lucide";
import { LazyMotion, MotionConfig, domMax } from "@/compat/motion";
import {
  createEffect,
  createSignal,
  createUniqueId,
  For,
  onCleanup,
  onSettled,
  Show,
} from "solid-js";

import {
  RESET_CAMERA,
  cameraRevealing,
  clampCamera,
  clampCoordinate,
  fitCamera,
  loadLayout,
  saveLayout,
  unionRect,
  zoomAt,
  type Camera,
  type Point,
  type Rect,
  type Size,
} from "./camera";
import type { CanvasItem } from "./examples";

const MUTED = "#5d6470";
const FONT = "system-ui, -apple-system, sans-serif";
const SETTLE_MS = 200;
const SAVE_MS = 250;
const COPIED_MS = 1600;
const KEY_PAN = 64;
const KEY_PAN_FAST = 256;
const KEY_MOVE = 8;
const KEY_MOVE_FAST = 64;
const KEY_ZOOM = 1.25;
const WHEEL_ZOOM = 0.01;
const LINE_HEIGHT = 16;
const PAN_SLOP = 3;
const PREVIEW_INSET = 32;
const PREVIEW_BORDER = 1;
const EMPTY_RECT: Rect = { x: 0, y: 0, width: 1, height: 1 };
const INTERACTIVE =
  "input, textarea, select, button, a[href], summary, [role='button'], [role='textbox'], [tabindex]:not([tabindex='-1'])";

const styles = stylex.create({
  shell: {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    overflow: "hidden",
    backgroundColor: "#f3f4f6",
    outline: "none",
    overscrollBehavior: "none",
    boxShadow: { default: null, ":focus-visible": `inset 0 0 0 3px ${MUTED}` },
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    touchAction: "none",
    cursor: "default",
  },
  world: {
    position: "absolute",
    top: 0,
    left: 0,
    transformOrigin: "0 0",
    pointerEvents: "none",
    willChange: "transform",
  },
  hidden: { visibility: "hidden" },
  item: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "max-content",
    pointerEvents: "auto",
  },
  itemHead: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    minHeight: 32,
  },
  handle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    padding: 0,
    borderWidth: 0,
    borderRadius: 6,
    backgroundColor: { default: "transparent", ":hover": "#e5e7eb" },
    color: MUTED,
    cursor: "default",
    touchAction: "none",
    outline: { default: "none", ":focus-visible": `2px solid ${MUTED}` },
    outlineOffset: 1,
  },
  name: {
    padding: "2px 4px",
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: "transparent",
    color: MUTED,
    fontFamily: FONT,
    fontSize: 15,
    fontWeight: 500,
    textAlign: "start",
    cursor: "pointer",
    outline: { default: "none", ":focus-visible": `2px solid ${MUTED}` },
  },
  note: {
    fontFamily: FONT,
    fontSize: 12,
    color: MUTED,
  },
  fallback: {
    width: 320,
    padding: "2px 6px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: `color-mix(in srgb, ${MUTED} 40%, transparent)`,
    borderRadius: 4,
    fontFamily: FONT,
    fontSize: 13,
  },
  spacer: { flexGrow: 1 },
  preview: {
    padding: PREVIEW_INSET,
    borderRadius: 12,
    borderWidth: PREVIEW_BORDER,
    borderStyle: "dashed",
    borderColor: `color-mix(in srgb, ${MUTED} 25%, transparent)`,
  },
  control: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minWidth: 36,
    height: 36,
    paddingInline: 10,
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: { default: "transparent", ":hover": "#e5e7eb" },
    color: "#1a1a1a",
    fontFamily: FONT,
    fontSize: 13,
    cursor: "pointer",
    pointerEvents: "auto",
    outline: { default: "none", ":focus-visible": `2px solid ${MUTED}` },
    outlineOffset: 2,
  },
  toolbar: {
    position: "absolute",
    right: 16,
    bottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 2,
    padding: 4,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.08)",
  },
  zoomReadout: {
    minWidth: 48,
    fontFamily: FONT,
    fontSize: 13,
    fontVariantNumeric: "tabular-nums",
    textAlign: "center",
    color: "#1a1a1a",
  },
});

type Pan = { camera: Camera; points: Point[]; origin: Point; moved: boolean; explicit: boolean };
type Drag = { id: string; pointerId: number; start: Point; origin: Point; handle: HTMLElement };
type Controls = { zoomBy: (factor: number) => void; fit: () => void; reset: () => void };

const getStorage = (): Storage | undefined => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
};

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const midpoint = (a: Point, b: Point) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

function canScrollNatively(target: EventTarget | null, stop: Element, dx: number, dy: number) {
  for (let node = target instanceof Element ? target : null; node && node !== stop;) {
    const style = getComputedStyle(node);
    const scrollsY = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight;
    const scrollsX = /(auto|scroll)/.test(style.overflowX) && node.scrollWidth > node.clientWidth;
    if (scrollsY && dy !== 0) {
      const atEdge =
        dy < 0 ? node.scrollTop <= 0 : node.scrollTop + node.clientHeight >= node.scrollHeight;
      if (!atEdge) return true;
    }
    if (scrollsX && dx !== 0) {
      const atEdge =
        dx < 0 ? node.scrollLeft <= 0 : node.scrollLeft + node.clientWidth >= node.scrollWidth;
      if (!atEdge) return true;
    }
    node = node.parentElement;
  }
  return false;
}

function CopyName(props: { id: string; name: string; hintId: string }) {
  const [status, setStatus] = createSignal<"idle" | "copied" | "failed">("idle");
  const [hinted, setHinted] = createSignal(false);
  let timer = 0;
  let fallback: HTMLInputElement | undefined;
  onCleanup(() => clearTimeout(timer));
  createEffect(status, (next) => {
    if (next === "failed") fallback?.select();
  });

  const copy = () => {
    const finish = (next: "copied" | "failed") => {
      setStatus(next);
      clearTimeout(timer);
      if (next === "copied") {
        timer = window.setTimeout(() => setStatus("idle"), COPIED_MS);
      }
    };
    const clipboard = typeof navigator === "undefined" ? undefined : navigator.clipboard;
    if (!clipboard) {
      finish("failed");
      return;
    }
    clipboard.writeText(props.name).then(
      () => finish("copied"),
      () => finish("failed"),
    );
  };

  return (
    <>
      <button
        id={props.id}
        type="button"
        aria-describedby={props.hintId}
        onClick={copy}
        onPointerEnter={() => setHinted(true)}
        onPointerLeave={() => setHinted(false)}
        onFocus={() => setHinted(true)}
        onBlur={() => setHinted(false)}
        {...stylex.attrs(styles.name)}
      >
        {props.name}
      </button>
      <span role="status" {...stylex.attrs(styles.note)}>
        {status() === "copied" ? "Copied" : null}
      </span>
      <Show when={status() === "idle" && hinted()}>
        <span aria-hidden="true" {...stylex.attrs(styles.note)}>
          Click to copy name
        </span>
      </Show>
      <Show when={status() === "failed"}>
        <input
          ref={fallback}
          readonly
          value={props.name}
          aria-label={`Clipboard unavailable. Select and copy: ${props.name}`}
          onBlur={() => setStatus("idle")}
          {...stylex.attrs(styles.fallback)}
        />
      </Show>
    </>
  );
}

export function TasteCanvas(props: { items: readonly CanvasItem[]; label: string }) {
  let shellRef: HTMLDivElement | undefined;
  let backdropRef: HTMLDivElement | undefined;
  let worldRef: HTMLDivElement | undefined;
  let readoutRef: HTMLOutputElement | undefined;
  let controls: Controls | null = null;
  const [ready, setReady] = createSignal(false);
  const [replays, setReplays] = createSignal<Record<string, number>>({});
  const copyHintId = createUniqueId();
  const moveHintId = createUniqueId();

  onSettled(() => {
    const shell = shellRef;
    const backdrop = backdropRef;
    const world = worldRef;
    const readout = readoutRef;
    if (!shell || !backdrop || !world || !readout) return;
    const items = props.items;

    const storage = getStorage();
    const ids = new Set(items.map((item) => item.id));
    const stored = loadLayout(storage, ids);
    const positions: Record<string, Point> = {};
    for (const item of items) {
      positions[item.id] = stored.positions[item.id] ?? { x: item.x, y: item.y };
    }
    const fresh =
      stored.camera && Object.keys(stored.positions).length > 0
        ? items.filter((item) => !(item.id in stored.positions)).map((item) => item.id)
        : [];
    const nodes = new Map<string, HTMLElement>();
    for (const node of world.querySelectorAll<HTMLElement>("[data-canvas-item]")) {
      const id = node.dataset.canvasItem;
      if (id) nodes.set(id, node);
    }
    const sizes = new Map<string, Size>();
    const dirty = new Set(ids);
    let camera = stored.camera ?? RESET_CAMERA;
    let frame = 0;
    let saveTimer = 0;
    let settleTimer = 0;
    let suppressTimer = 0;
    let settled = false;
    let shown = false;

    const viewport = (): Size => ({ width: shell.clientWidth, height: shell.clientHeight });
    const rectOf = (id: string): Rect => {
      const size = sizes.get(id) ?? { width: 0, height: 0 };
      return { ...positions[id], ...size };
    };
    const bounds = () => unionRect([...sizes.keys()].map(rectOf)) ?? EMPTY_RECT;

    const flush = () => {
      frame = 0;
      for (const id of dirty) {
        const node = nodes.get(id);
        const point = positions[id];
        if (node && point) node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      }
      dirty.clear();
      world.style.transform = `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.zoom})`;
      readout.textContent = `${Math.round(camera.zoom * 100)}%`;
      if (settled && !shown) {
        shown = true;
        setReady(true);
      }
    };
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(flush);
    };
    const save = () => {
      saveTimer = 0;
      saveLayout(storage, camera, positions);
    };
    const queueSave = () => {
      clearTimeout(saveTimer);
      saveTimer = window.setTimeout(save, SAVE_MS);
    };
    const setCamera = (next: Camera) => {
      camera = clampCamera(next, bounds(), viewport());
      schedule();
      queueSave();
    };
    const moveItem = (id: string, point: Point) => {
      positions[id] = { x: clampCoordinate(point.x), y: clampCoordinate(point.y) };
      dirty.add(id);
      schedule();
      queueSave();
    };
    const fit = () => setCamera(fitCamera(bounds(), viewport()));
    const zoomBy = (factor: number) =>
      setCamera(
        zoomAt(camera, camera.zoom * factor, {
          x: shell.clientWidth / 2,
          y: shell.clientHeight / 2,
        }),
      );
    controls = { zoomBy, fit, reset: () => setCamera(RESET_CAMERA) };

    const reveal = (element: Element) => {
      const shellBox = shell.getBoundingClientRect();
      const box = element.getBoundingClientRect();
      const next = cameraRevealing(
        camera,
        {
          x: (box.left - shellBox.left - camera.x) / camera.zoom,
          y: (box.top - shellBox.top - camera.y) / camera.zoom,
          width: box.width / camera.zoom,
          height: box.height / camera.zoom,
        },
        viewport(),
      );
      if (next) setCamera(next);
    };

    let autoFitted: Camera | null = null;
    const onLayoutSettled = () => {
      const untouched = autoFitted !== null && camera === autoFitted;
      if (settled && !untouched) {
        setCamera(camera);
        return;
      }
      settled = true;
      if (!stored.camera || untouched) {
        fit();
        autoFitted = camera;
        return;
      }
      setCamera(stored.camera);
      const added = unionRect(fresh.filter((id) => sizes.has(id)).map(rectOf));
      const next = added ? cameraRevealing(camera, added, viewport()) : null;
      if (next) setCamera(next);
    };
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const node = entry.target as HTMLElement;
        const id = node.dataset.canvasItem;
        if (id) sizes.set(id, { width: node.offsetWidth, height: node.offsetHeight });
      }
      clearTimeout(settleTimer);
      settleTimer = window.setTimeout(onLayoutSettled, SETTLE_MS);
    });
    for (const node of nodes.values()) observer.observe(node);
    schedule();

    const pointers = new Map<number, Point>();
    let pan: Pan | null = null;
    let drag: Drag | null = null;
    let spaceHeld = false;
    const local = (event: { clientX: number; clientY: number }): Point => {
      const box = shell.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top };
    };
    const restartPan = (explicit: boolean) => {
      const points = [...pointers.values()];
      pan =
        points.length > 0
          ? { camera, points, origin: points[0], moved: pan?.moved ?? false, explicit }
          : null;
    };
    const blockClick = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const stopSuppressing = () => {
      window.removeEventListener("click", blockClick, true);
      window.removeEventListener("auxclick", blockClick, true);
    };
    const suppressNextClick = () => {
      window.addEventListener("click", blockClick, { capture: true, once: true });
      window.addEventListener("auxclick", blockClick, { capture: true, once: true });
      clearTimeout(suppressTimer);
      suppressTimer = window.setTimeout(stopSuppressing, 0);
    };
    const endDrag = () => {
      if (drag?.handle.hasPointerCapture(drag.pointerId)) {
        drag.handle.releasePointerCapture(drag.pointerId);
      }
      drag = null;
    };
    const endAll = () => {
      for (const id of pointers.keys()) {
        if (shell.hasPointerCapture(id)) shell.releasePointerCapture(id);
      }
      pointers.clear();
      pan = null;
      endDrag();
      spaceHeld = false;
    };

    const onPointerDownCapture = (event: PointerEvent) => {
      const isMouse = event.pointerType === "mouse";
      const explicit = (isMouse && event.button === 1) || (event.button === 0 && spaceHeld);
      const onBackdrop = event.target === backdrop && (!isMouse || event.button === 0);
      if (!explicit && !onBackdrop && !(pan && pointers.size > 0)) return;
      if (explicit) {
        event.preventDefault();
        event.stopPropagation();
      }
      endDrag();
      shell.setPointerCapture(event.pointerId);
      pointers.set(event.pointerId, local(event));
      restartPan(explicit || (pan?.explicit ?? false));
      if (!explicit) shell.focus({ preventScroll: true });
    };
    const dragTo = (active: Drag, event: PointerEvent) =>
      moveItem(active.id, {
        x: active.origin.x + (event.clientX - active.start.x) / camera.zoom,
        y: active.origin.y + (event.clientY - active.start.y) / camera.zoom,
      });
    const onPointerMove = (event: PointerEvent) => {
      if (drag && event.pointerId === drag.pointerId) {
        dragTo(drag, event);
        return;
      }
      if (!pan || !pointers.has(event.pointerId)) return;
      pointers.set(event.pointerId, local(event));
      const now = [...pointers.values()];
      const start = pan.points;
      if (distance(now[0], pan.origin) > PAN_SLOP) pan.moved = true;
      if (now.length === 1 || start.length === 1) {
        setCamera({
          ...pan.camera,
          x: pan.camera.x + now[0].x - start[0].x,
          y: pan.camera.y + now[0].y - start[0].y,
        });
        return;
      }
      const startMid = midpoint(start[0], start[1]);
      const mid = midpoint(now[0], now[1]);
      const moved = {
        ...pan.camera,
        x: pan.camera.x + mid.x - startMid.x,
        y: pan.camera.y + mid.y - startMid.y,
      };
      const scale = distance(now[0], now[1]) / Math.max(1, distance(start[0], start[1]));
      setCamera(zoomAt(moved, pan.camera.zoom * scale, mid));
    };
    const onPointerEnd = (event: PointerEvent) => {
      if (drag && event.pointerId === drag.pointerId) {
        if (event.type === "pointerup") dragTo(drag, event);
        endDrag();
        return;
      }
      if (!pointers.delete(event.pointerId)) return;
      const wasExplicit = pan?.explicit ?? false;
      const wasMoved = pan?.moved ?? false;
      restartPan(wasExplicit);
      if (pointers.size === 0 && (wasExplicit || wasMoved)) suppressNextClick();
    };
    const onMouseDown = (event: MouseEvent) => {
      if (event.button === 1) event.preventDefault();
    };

    const handleOf = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>("[data-canvas-handle]") : null;
    const onHandleDown = (event: PointerEvent) => {
      if (pan || (event.pointerType === "mouse" && event.button !== 0)) return;
      const handle = handleOf(event.target);
      const id = handle?.dataset.canvasHandle;
      if (!handle || !id || !(id in positions)) return;
      event.preventDefault();
      handle.setPointerCapture(event.pointerId);
      handle.focus({ preventScroll: true });
      drag = {
        id,
        pointerId: event.pointerId,
        start: { x: event.clientX, y: event.clientY },
        origin: positions[id],
        handle,
      };
    };
    const onWorldKeyDown = (event: KeyboardEvent) => {
      const id = handleOf(event.target)?.dataset.canvasHandle;
      if (!id || !(id in positions) || event.altKey || event.ctrlKey || event.metaKey) return;
      const step = event.shiftKey ? KEY_MOVE_FAST : KEY_MOVE;
      const moves: Record<string, Point> = {
        ArrowLeft: { x: -step, y: 0 },
        ArrowRight: { x: step, y: 0 },
        ArrowUp: { x: 0, y: -step },
        ArrowDown: { x: 0, y: step },
      };
      const move = moves[event.key];
      if (!move) return;
      event.preventDefault();
      const point = positions[id];
      moveItem(id, { x: point.x + move.x, y: point.y + move.y });
    };

    const onWheel = (event: WheelEvent) => {
      const unit = event.deltaMode === 1 ? LINE_HEIGHT : 1;
      const dx = event.deltaX * unit;
      const dy = event.deltaY * unit;
      const zooming = event.ctrlKey || event.metaKey;
      if (!zooming && canScrollNatively(event.target, shell, dx, dy)) return;
      event.preventDefault();
      if (zooming) {
        setCamera(zoomAt(camera, camera.zoom * Math.exp(-dy * WHEEL_ZOOM), local(event)));
      } else {
        setCamera({ ...camera, x: camera.x - dx, y: camera.y - dy });
      }
    };
    const onShellKeyDown = (event: KeyboardEvent) => {
      if (event.target !== shell || event.altKey || event.ctrlKey || event.metaKey) return;
      const step = event.shiftKey ? KEY_PAN_FAST : KEY_PAN;
      const pans: Record<string, Point> = {
        ArrowLeft: { x: step, y: 0 },
        ArrowRight: { x: -step, y: 0 },
        ArrowUp: { x: 0, y: step },
        ArrowDown: { x: 0, y: -step },
      };
      const delta = pans[event.key];
      if (delta) setCamera({ ...camera, x: camera.x + delta.x, y: camera.y + delta.y });
      else if (event.key === "+" || event.key === "=") zoomBy(KEY_ZOOM);
      else if (event.key === "-" || event.key === "_") zoomBy(1 / KEY_ZOOM);
      else if (event.key === "0") setCamera(RESET_CAMERA);
      else if (event.key === "1") fit();
      else return;
      event.preventDefault();
    };
    const spaceArmable = () => {
      const active = document.activeElement;
      if (!(active instanceof HTMLElement) || active === shell) return true;
      return !active.isContentEditable && !active.matches(INTERACTIVE);
    };
    const onWindowKeyDown = (event: KeyboardEvent) => {
      if (event.key !== " " || !spaceArmable()) return;
      spaceHeld = true;
      event.preventDefault();
    };
    const onWindowKeyUp = (event: KeyboardEvent) => {
      if (event.key === " ") spaceHeld = false;
    };
    const undoNativeScroll = () => {
      shell.scrollTop = 0;
      shell.scrollLeft = 0;
    };
    const onFocusIn = (event: FocusEvent) => {
      undoNativeScroll();
      if (event.target instanceof Element) reveal(event.target);
    };
    const onClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!anchor) return;
      event.preventDefault();
      const href = anchor.getAttribute("href") ?? "";
      const target = href.startsWith("#") ? document.getElementById(href.slice(1)) : null;
      if (target && world.contains(target)) reveal(target);
    };
    const onVisibility = () => {
      if (document.hidden) endAll();
    };
    const onResize = () => {
      if (settled) setCamera(camera);
    };
    const onPageHide = () => {
      if (saveTimer !== 0) save();
    };

    const root = document.documentElement;
    const previousOverscroll = [
      root.style.overscrollBehaviorX,
      document.body.style.overscrollBehaviorX,
    ];
    root.style.overscrollBehaviorX = "none";
    document.body.style.overscrollBehaviorX = "none";

    shell.addEventListener("pointerdown", onPointerDownCapture, true);
    shell.addEventListener("pointermove", onPointerMove);
    shell.addEventListener("pointerup", onPointerEnd);
    shell.addEventListener("pointercancel", onPointerEnd);
    shell.addEventListener("lostpointercapture", onPointerEnd);
    shell.addEventListener("mousedown", onMouseDown);
    shell.addEventListener("wheel", onWheel, { passive: false });
    shell.addEventListener("keydown", onShellKeyDown);
    shell.addEventListener("scroll", undoNativeScroll);
    world.addEventListener("pointerdown", onHandleDown);
    world.addEventListener("keydown", onWorldKeyDown);
    world.addEventListener("focusin", onFocusIn);
    world.addEventListener("click", onClick);
    window.addEventListener("keydown", onWindowKeyDown);
    window.addEventListener("keyup", onWindowKeyUp);
    window.addEventListener("blur", endAll);
    window.addEventListener("resize", onResize);
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      endAll();
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(settleTimer);
      clearTimeout(suppressTimer);
      stopSuppressing();
      if (saveTimer !== 0) {
        clearTimeout(saveTimer);
        save();
      }
      controls = null;
      [root.style.overscrollBehaviorX, document.body.style.overscrollBehaviorX] =
        previousOverscroll;
      shell.removeEventListener("pointerdown", onPointerDownCapture, true);
      shell.removeEventListener("pointermove", onPointerMove);
      shell.removeEventListener("pointerup", onPointerEnd);
      shell.removeEventListener("pointercancel", onPointerEnd);
      shell.removeEventListener("lostpointercapture", onPointerEnd);
      shell.removeEventListener("mousedown", onMouseDown);
      shell.removeEventListener("wheel", onWheel);
      shell.removeEventListener("keydown", onShellKeyDown);
      shell.removeEventListener("scroll", undoNativeScroll);
      world.removeEventListener("pointerdown", onHandleDown);
      world.removeEventListener("keydown", onWorldKeyDown);
      world.removeEventListener("focusin", onFocusIn);
      world.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onWindowKeyDown);
      window.removeEventListener("keyup", onWindowKeyUp);
      window.removeEventListener("blur", endAll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  });

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <div
          ref={shellRef}
          tabindex={0}
          role="region"
          aria-roledescription="canvas"
          aria-label={props.label}
          lang="zh-CN"
          {...stylex.attrs(styles.shell)}
        >
          <div ref={backdropRef} data-canvas-backdrop="" {...stylex.attrs(styles.backdrop)} />
          <div ref={worldRef} {...stylex.attrs(styles.world, !ready() && styles.hidden)}>
            <For each={props.items}>
              {(item) => (
                <section
                  id={item.id}
                  data-canvas-item={item.id}
                  aria-labelledby={`${item.id}-name`}
                  lang="en"
                  {...stylex.attrs(styles.item)}
                >
                  <div {...stylex.attrs(styles.itemHead)}>
                    <button
                      type="button"
                      data-canvas-handle={item.id}
                      aria-label={`Move ${item.name}`}
                      aria-describedby={moveHintId}
                      {...stylex.attrs(styles.handle)}
                    >
                      <GripVertical size={16} aria-hidden="true" />
                    </button>
                    <CopyName id={`${item.id}-name`} name={item.name} hintId={copyHintId} />
                    <span {...stylex.attrs(styles.spacer)} />
                    <Show when={item.replayable}>
                      <button
                        type="button"
                        aria-label={`Replay ${item.name}`}
                        onClick={() =>
                          setReplays((previous) => ({
                            ...previous,
                            [item.id]: (previous[item.id] ?? 0) + 1,
                          }))
                        }
                        {...stylex.attrs(styles.control)}
                      >
                        <RotateCcw size={14} aria-hidden="true" />
                        Replay
                      </button>
                    </Show>
                  </div>
                  <Show when={`${item.id}-${replays()[item.id] ?? 0}`} keyed>
                    <div
                      lang="zh-CN"
                      {...stylex.attrs(styles.preview)}
                      style={{ width: `${item.width + (PREVIEW_INSET + PREVIEW_BORDER) * 2}px` }}
                    >
                      {item.render()}
                    </div>
                  </Show>
                </section>
              )}
            </For>
          </div>
          <p id={copyHintId} hidden>
            Activate to copy this name.
          </p>
          <p id={moveHintId} hidden>
            Drag to move, or press the arrow keys. Hold Shift for larger steps.
          </p>
          <div role="toolbar" aria-label="Camera" {...stylex.attrs(styles.toolbar)}>
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => controls?.zoomBy(1 / KEY_ZOOM)}
              {...stylex.attrs(styles.control)}
            >
              <Minus size={16} aria-hidden="true" />
            </button>
            <output ref={readoutRef} aria-label="Zoom level" {...stylex.attrs(styles.zoomReadout)}>
              100%
            </output>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => controls?.zoomBy(KEY_ZOOM)}
              {...stylex.attrs(styles.control)}
            >
              <Plus size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Fit all"
              onClick={() => controls?.fit()}
              {...stylex.attrs(styles.control)}
            >
              <Maximize size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Reset camera"
              onClick={() => controls?.reset()}
              {...stylex.attrs(styles.control)}
            >
              <RotateCcw size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
