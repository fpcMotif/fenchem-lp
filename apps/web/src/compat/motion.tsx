// Solid 2 stand-in for the `motion/react` API this app uses, built on the
// framework-agnostic `motion` package (the same animation engine framer-motion runs).
//
//   m.<tag>               initial, animate, exit, transition, whileInView, viewport,
//                         variants (+ propagation, staggerChildren), custom, layout,
//                         layoutId, onAnimationComplete, motion-value style
//   motion values         useMotionValue, useTransform, useSpring, useScroll,
//                         useMotionValueEvent, animate(motionValue, …)
//   AnimatePresence       initial, mode ("sync" | "wait" | "popLayout"), custom,
//                         onExitComplete
//
// Motion values are callable accessors (`value()`) that also carry framer's
// `get` / `set` / `jump` / `on("change")`. Style values may be motion values; they
// update the element reactively. Layout animations are FLIP: rects are snapshotted in
// a capture listener before user-event handlers run, and compared after the update.

import {
  animate as animateDom,
  inView,
  scroll,
  transform,
  type AnimationPlaybackControls,
} from "motion";
import {
  children,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  flush,
  getOwner,
  merge,
  omit,
  onCleanup,
  onSettled,
  runWithOwner,
  untrack,
  useContext,
  type Accessor,
  type Component,
} from "solid-js";
import { dynamic, isServer, type JSX } from "@solidjs/web";

export type { AnimationPlaybackControls };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Transition = Record<string, any>;
type TargetValue = string | number | undefined | null | Array<string | number | null>;
export type Target = { [key: string]: TargetValue | Transition | undefined } & {
  transition?: Transition;
  transitionEnd?: Record<string, string | number>;
};
export type TargetAndTransition = Target;
type Variant = Target | ((custom: unknown) => Target);
export type Variants = Record<string, Variant>;
type Definition = Target | string | string[] | false | undefined;

// ── motion values ────────────────────────────────────────────────────────────

export interface MotionValue<T = number> {
  (): T;
  get(): T;
  set(value: T): void;
  jump(value: T): void;
  on(event: "change", callback: (value: T) => void): () => void;
  stop(): void;
  isAnimating(): boolean;
  readonly isMotionValue: true;
}

export function isMotionValue(value: unknown): value is MotionValue<unknown> {
  return (
    typeof value === "function" && (value as { isMotionValue?: unknown }).isMotionValue === true
  );
}

function cleanupWithOwner(stop: () => void) {
  if (getOwner()) onCleanup(stop);
}

/** A motion value outside any component (framer's `motionValue`). */
export function motionValue<T>(initial: T): MotionValue<T> {
  const [read, write] = createSignal<T>(initial as Exclude<T, Function>, { equals: false });
  let current = initial;
  let controls: AnimationPlaybackControls | undefined;
  const listeners = new Set<(value: T) => void>();
  const assign = (next: T) => {
    if (Object.is(next, current)) return;
    current = next;
    write(() => next);
    for (const listener of Array.from(listeners)) listener(next);
  };
  const value = Object.assign(() => read(), {
    get: () => current,
    set: assign,
    jump: (next: T) => {
      controls?.stop();
      controls = undefined;
      assign(next);
    },
    on: (_event: "change", callback: (value: T) => void) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    stop: () => {
      controls?.stop();
      controls = undefined;
    },
    isAnimating: () => controls !== undefined,
    isMotionValue: true as const,
    attach(next: AnimationPlaybackControls | undefined) {
      controls?.stop();
      controls = next;
    },
  });
  return value;
}

type AttachableValue<T> = MotionValue<T> & {
  attach(controls: AnimationPlaybackControls | undefined): void;
};

export function useMotionValue<T>(initial: T): MotionValue<T> {
  const value = motionValue(initial);
  cleanupWithOwner(() => value.stop());
  return value;
}

export function useMotionValueEvent<T>(
  value: MotionValue<T>,
  event: "change",
  callback: (latest: T) => void,
) {
  cleanupWithOwner(value.on(event, (latest) => callback(latest)));
}

type TransformOptions = { clamp?: boolean; ease?: unknown; mixer?: unknown };

function derive<T>(sources: MotionValue<unknown>[], compute: () => T): MotionValue<T> {
  const value = motionValue(untrack(compute));
  const update = () => value.set(compute());
  const stops = sources.map((source) => source.on("change", update));
  cleanupWithOwner(() => stops.forEach((stop) => stop()));
  return value;
}

export function useTransform<T>(compute: () => T): MotionValue<T>;
export function useTransform<T>(
  source: MotionValue<number>,
  map: (value: number) => T,
): MotionValue<T>;
export function useTransform<T>(
  sources: MotionValue<number>[],
  map: (values: number[]) => T,
): MotionValue<T>;
export function useTransform<T extends string | number>(
  source: MotionValue<number>,
  input: number[],
  output: T[],
  options?: TransformOptions,
): MotionValue<T>;
export function useTransform<T>(
  source: MotionValue<number> | MotionValue<number>[] | (() => T),
  inputOrMap?: number[] | ((value: never) => T),
  output?: T[],
  options?: TransformOptions,
): MotionValue<T> {
  if (Array.isArray(source)) {
    const map = inputOrMap as (values: number[]) => T;
    return derive(source, () => map(source.map((value) => value.get())));
  }
  if (!isMotionValue(source)) {
    // Dependencies are whatever motion values `compute` reads; track them with a memo.
    const compute = source as () => T;
    const tracked = createMemo(compute);
    const value = motionValue(untrack(tracked));
    createEffect(tracked, (next) => value.set(next));
    return value;
  }
  if (typeof inputOrMap === "function") {
    const map = inputOrMap as (value: number) => T;
    return derive([source], () => map(source.get()));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapper = transform(inputOrMap as number[], output as any, options as any) as (
    value: number,
  ) => T;
  return derive([source], () => mapper(source.get()));
}

type SpringOptions = {
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
  restDelta?: number;
  restSpeed?: number;
  bounce?: number;
  duration?: number;
  visualDuration?: number;
};

export function useSpring(
  source: MotionValue<number> | number,
  options: SpringOptions = {},
): MotionValue<number> {
  const initial = isMotionValue(source) ? (source as MotionValue<number>).get() : source;
  const value = motionValue(initial) as AttachableValue<number>;
  const raw = value.set.bind(value);
  let velocity = 0;
  let last = initial;
  let lastTime = 0;
  const track = (next: number) => {
    const now = performance.now();
    if (lastTime) velocity = ((next - last) / Math.max(now - lastTime, 1)) * 1000;
    last = next;
    lastTime = now;
    raw(next);
  };
  const springTo = (target: number) => {
    if (reducedMotion()) {
      value.attach(undefined);
      raw(target);
      return;
    }
    value.attach(
      animateDom(value.get(), target, {
        type: "spring",
        ...options,
        velocity,
        onUpdate: track,
        onComplete: () => value.attach(undefined),
      }),
    );
  };
  value.set = springTo;
  value.jump = (next: number) => {
    value.attach(undefined);
    velocity = 0;
    raw(next);
  };
  if (isMotionValue(source)) {
    cleanupWithOwner((source as MotionValue<number>).on("change", springTo));
  }
  cleanupWithOwner(() => value.stop());
  return value;
}

type ElementRef = Accessor<Element | null | undefined> | Element | null | undefined;
const unref = (ref: ElementRef | undefined) =>
  (typeof ref === "function" ? ref() : ref) ?? undefined;

type ScrollOffset = Array<string | [number, number]>;

export function useScroll(
  options: {
    target?: ElementRef;
    container?: ElementRef;
    offset?: ScrollOffset;
    axis?: "x" | "y";
    layoutEffect?: boolean;
  } = {},
) {
  const scrollX = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const scrollXProgress = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  onSettled(() => {
    const stop = scroll(
      (_progress: number, info: { x: ScrollAxis; y: ScrollAxis }) => {
        scrollX.set(info.x.current);
        scrollY.set(info.y.current);
        scrollXProgress.set(info.x.progress);
        scrollYProgress.set(info.y.progress);
      },
      {
        target: unref(options.target),
        container: unref(options.container) as HTMLElement | undefined,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        offset: options.offset as any,
        axis: options.axis,
      },
    );
    return stop;
  });
  return { scrollX, scrollY, scrollXProgress, scrollYProgress };
}
type ScrollAxis = { current: number; progress: number };

export function useInView(
  ref: ElementRef,
  options: {
    once?: boolean;
    amount?: number | "some" | "all";
    margin?: string;
    root?: ElementRef;
    initial?: boolean;
  } = {},
): Accessor<boolean> {
  const [visible, setVisible] = createSignal(options.initial ?? false);
  onSettled(() => {
    const el = unref(ref);
    if (!el) return;
    const stop = inView(
      el,
      () => {
        setVisible(true);
        if (options.once) {
          stop();
          return;
        }
        return () => setVisible(false);
      },
      {
        amount: options.amount,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        margin: options.margin as any,
        root: unref(options.root),
      },
    );
    return stop;
  });
  return visible;
}

/** framer's `animate`: a DOM target, a motion value, or a plain value with onUpdate. */
export function animate<T extends number | string>(
  value: MotionValue<T>,
  to: T | T[],
  options?: Transition,
): AnimationPlaybackControls;
export function animate(...args: Parameters<typeof animateDom>): AnimationPlaybackControls;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function animate(subject: any, to: any, options?: any): AnimationPlaybackControls {
  if (isMotionValue(subject)) {
    const value = subject as AttachableValue<number | string>;
    const controls = animateDom(value.get() as number, to, {
      ...timing(options),
      onUpdate: (latest: number | string) => {
        if ("attach" in value) value.set(latest);
        options?.onUpdate?.(latest);
      },
    });
    value.attach?.(controls);
    return controls;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (animateDom as any)(
    subject,
    to,
    options && typeof options === "object" ? timing(options) : options,
  );
}

// ── reduced motion (MotionConfig reducedMotion="user") ───────────────────────

const reducedMotion = () =>
  !isServer && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Live `prefers-reduced-motion`; false on the server and during hydration. */
export function useReducedMotion(): Accessor<boolean> {
  const [reduced, setReduced] = createSignal(false);
  onSettled(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  });
  return reduced;
}

function timing(transition: Transition | undefined): Transition {
  const t = { ...transition };
  if (reducedMotion()) {
    t.duration = 0;
    t.delay = 0;
    if (t.type === "spring") t.type = "tween";
  }
  return t;
}

// ── style conversion ─────────────────────────────────────────────────────────

type StyleValue = string | number | undefined | null | Accessor<string | number | undefined>;
export type MotionStyle = Record<string, StyleValue>;

const UNITLESS = new Set([
  "opacity",
  "zIndex",
  "fontWeight",
  "lineHeight",
  "flex",
  "flexGrow",
  "flexShrink",
  "order",
  "scale",
  "scaleX",
  "scaleY",
  "fillOpacity",
  "strokeOpacity",
  "stopOpacity",
  "floodOpacity",
  "strokeMiterlimit",
  "zoom",
  "aspectRatio",
  "columnCount",
  "gridRow",
  "gridColumn",
  "WebkitLineClamp",
]);
const TRANSFORM_ORDER = [
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY",
] as const;
const TRANSFORM_KEYS = new Set<string>(TRANSFORM_ORDER);
const kebab = (key: string) =>
  key.startsWith("--") ? key : key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const read = (value: unknown) => (typeof value === "function" ? (value as () => unknown)() : value);

function parseCssText(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const declaration of text.split(";")) {
    const colon = declaration.indexOf(":");
    if (colon > 0) out[declaration.slice(0, colon).trim()] = declaration.slice(colon + 1).trim();
  }
  return out;
}

function withUnit(key: string, value: string | number) {
  if (typeof value === "string") return value;
  if (key.startsWith("rotate") || key.startsWith("skew")) return `${value}deg`;
  return UNITLESS.has(key) || key.startsWith("--") ? String(value) : `${value}px`;
}

function transformPart(key: string, value: string | number) {
  if (key === "x") return `translateX(${withUnit(key, value)})`;
  if (key === "y") return `translateY(${withUnit(key, value)})`;
  if (key === "z") return `translateZ(${withUnit(key, value)})`;
  return `${key}(${withUnit(key, value)})`;
}

const firstFrame = (value: unknown) => (Array.isArray(value) ? value[0] : value);

/** React/motion style object (camelCase, x/y/rotate, motion values) → Solid style object. */
export function toCss(style: MotionStyle | Target | string | undefined): JSX.CSSProperties {
  const out: Record<string, string> = {};
  if (!style) return out;
  if (typeof style === "string") return parseCssText(style);
  const transforms = new Map<string, string>();
  for (const [key, raw] of Object.entries(style)) {
    if (key === "transition" || key === "transitionEnd") continue;
    const value = firstFrame(read(raw)) as string | number | null | undefined;
    if (value === undefined || value === null) continue;
    if (TRANSFORM_KEYS.has(key)) {
      transforms.set(key, transformPart(key, value));
      continue;
    }
    if (key === "pathLength") {
      out["stroke-dasharray"] = `${value}px 1px`;
      out["stroke-dashoffset"] = "0px";
      continue;
    }
    if (key === "pathOffset") {
      out["stroke-dashoffset"] = `${-Number(value)}px`;
      continue;
    }
    out[kebab(key)] = withUnit(key, value);
  }
  if (transforms.size) {
    const ordered = TRANSFORM_ORDER.filter((key) => transforms.has(key)).map((key) =>
      transforms.get(key)!,
    );
    out.transform = [out.transform, ...ordered].filter(Boolean).join(" ");
  }
  return out;
}

// SVG attributes framer animates as attributes rather than CSS.
const SVG_ATTRIBUTES = new Set([
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "d",
  "x1",
  "x2",
  "y1",
  "y2",
  "points",
  "attrX",
  "attrY",
  "viewBox",
]);
const SVG_TAGS = new Set([
  "svg",
  "g",
  "path",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "rect",
  "text",
  "tspan",
  "stop",
  "linearGradient",
  "radialGradient",
  "mask",
  "clipPath",
  "use",
  "image",
  "foreignObject",
  "pattern",
  "filter",
  "feGaussianBlur",
  "feTurbulence",
  "feDisplacementMap",
]);

// The server has no DOM classes; presence diffs still run there.
const isElement = (node: unknown): node is Element =>
  typeof Element !== "undefined" && node instanceof Element;

function splitSvg(target: Target | undefined) {
  const attrs: Record<string, string | number> = {};
  const style: Target = {};
  if (!target) return { attrs, style };
  for (const [key, raw] of Object.entries(target)) {
    if (SVG_ATTRIBUTES.has(key)) {
      const value = firstFrame(read(raw));
      if (value !== undefined && value !== null)
        attrs[key === "attrX" ? "x" : key === "attrY" ? "y" : key] = value as string | number;
    } else style[key] = raw as TargetValue;
  }
  if ("pathLength" in target || "pathOffset" in target) attrs.pathLength = 1;
  return { attrs, style };
}

// ── layout (FLIP) ────────────────────────────────────────────────────────────

type LayoutEntry = { mode: true | "position"; transition: () => Transition | undefined };
const layoutEls = new Map<HTMLElement, LayoutEntry>();
const layoutIds = new Map<string, { el: HTMLElement; transition: () => Transition | undefined }>();
const before = new Map<HTMLElement, DOMRect>();
const beforeIds = new Map<string, DOMRect>();
let pending = false;

function snapshot() {
  if (pending) return;
  pending = true;
  for (const el of layoutEls.keys()) before.set(el, el.getBoundingClientRect());
  for (const [id, { el }] of layoutIds) beforeIds.set(id, el.getBoundingClientRect());
  queueMicrotask(flip);
}

function flip() {
  flush();
  pending = false;
  const skip = reducedMotion();
  if (!skip) {
    for (const [el, entry] of layoutEls) {
      const from = before.get(el);
      if (!from || !el.isConnected) continue;
      const to = el.getBoundingClientRect();
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      const transition = timing(entry.transition());
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        animateDom(
          el,
          { transform: [`translate(${dx}px, ${dy}px)`, "translate(0px, 0px)"] },
          transition,
        );
      }
      if (entry.mode === true && Math.abs(from.height - to.height) > 0.5) {
        const declared = el.style.height;
        void animateDom(el, { height: [`${from.height}px`, `${to.height}px`] }, transition).then(
          () => {
            el.style.height = declared;
          },
        );
      }
    }
    for (const [id, { el, transition }] of layoutIds) {
      const from = beforeIds.get(id);
      if (!from || !el.isConnected) continue;
      const to = el.getBoundingClientRect();
      if (!to.width || !to.height) continue;
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(from.width - to.width) < 0.5)
        continue;
      el.style.transformOrigin = "0 0";
      animateDom(
        el,
        {
          transform: [
            `translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height})`,
            "translate(0px, 0px) scale(1, 1)",
          ],
        },
        timing(transition()),
      );
    }
  }
  before.clear();
  beforeIds.clear();
}

if (!isServer) {
  for (const type of ["click", "keydown", "change", "input", "pointerup"]) {
    window.addEventListener(type, () => (layoutEls.size || layoutIds.size) && snapshot(), {
      capture: true,
    });
  }
}

/** Snapshot layout now, so the next state change animates (for changes outside user events). */
export function snapshotLayout() {
  if (layoutEls.size || layoutIds.size) snapshot();
}

/** The next layout change jumps instead of animating (motion's useInstantLayoutTransition). */
export function useInstantLayoutTransition() {
  return (callback?: () => void) => {
    callback?.();
    if (!pending) return;
    before.clear();
    beforeIds.clear();
    pending = false;
    snapshot();
  };
}

// ── presence ─────────────────────────────────────────────────────────────────

type PresenceState = { skipInitial: Accessor<boolean>; custom: Accessor<unknown> };
const PresenceContext = createContext<PresenceState>({
  skipInitial: () => false,
  custom: () => undefined,
});

type ExitInfo = {
  resolve: (custom: unknown) => Target | undefined;
  transition: Transition | undefined;
  custom: Accessor<unknown>;
};
const exits = new WeakMap<Element, ExitInfo>();

export function AnimatePresence(props: {
  initial?: boolean;
  mode?: "sync" | "wait" | "popLayout";
  custom?: unknown;
  onExitComplete?: () => void;
  children: JSX.Element;
}) {
  const [skipInitial, setSkipInitial] = createSignal(untrack(() => props.initial === false));
  onSettled(() => {
    setSkipInitial(false);
  });
  return (
    <PresenceContext value={{ skipInitial, custom: () => props.custom }}>
      <Presence
        mode={props.mode ?? "sync"}
        custom={() => props.custom}
        onExitComplete={() => props.onExitComplete?.()}
      >
        {props.children}
      </Presence>
    </PresenceContext>
  );
}

function Presence(props: {
  mode: "sync" | "wait" | "popLayout";
  custom: Accessor<unknown>;
  onExitComplete: () => void;
  children: JSX.Element;
}) {
  const resolved = children(() => props.children);
  const exited = new WeakSet<Element>();
  const exiting = new WeakSet<Element>();
  const [exitDone, setExitDone] = createSignal(0);

  const shown = createMemo<unknown[]>((previous = []) => {
    exitDone();
    const next: unknown[] = resolved.toArray();
    if (isServer) return next;
    const leaving: Element[] = [];
    previous.forEach((node, index) => {
      if (next.includes(node) || !isElement(node)) return;
      if (!exits.has(node) || exited.has(node)) return;
      leaving.push(node);
      next.splice(Math.min(index, next.length), 0, node);
    });
    // "wait": entering children appear only once every exit has finished.
    if (untrack(() => props.mode) === "wait" && leaving.length)
      return next.filter((node) => leaving.includes(node as Element) || previous.includes(node));
    return next;
  });

  createEffect(
    () =>
      shown().filter(
        (node): node is Element => isElement(node) && !resolved.toArray().includes(node),
      ),
    (leaving) => {
      let running = 0;
      for (const el of leaving) {
        if (exiting.has(el)) continue;
        exiting.add(el);
        running += 1;
        const info = exits.get(el)!;
        if (props.mode === "popLayout" && el instanceof HTMLElement) {
          const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = el;
          Object.assign(el.style, {
            position: "absolute",
            top: `${offsetTop}px`,
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
            height: `${offsetHeight}px`,
            pointerEvents: "none",
          });
        }
        const finish = () => {
          exited.add(el);
          setExitDone((n) => n + 1);
          running -= 1;
          if (running === 0) props.onExitComplete();
        };
        const target = info.resolve(props.custom() ?? info.custom());
        if (!target) {
          finish();
          continue;
        }
        const { transition, transitionEnd: _end, ...values } = target;
        animateDom(el, values as never, timing({ ...info.transition, ...transition })).then(
          finish,
          finish,
        );
      }
    },
  );

  return shown as unknown as JSX.Element;
}

// ── variants ─────────────────────────────────────────────────────────────────

type VariantState = {
  initial: Accessor<string[] | false | undefined>;
  animate: Accessor<string[] | undefined>;
  register: () => number;
  stagger: () => number;
};
const NO_VARIANTS: VariantState = {
  initial: () => undefined,
  animate: () => undefined,
  register: () => 0,
  stagger: () => 0,
};
const VariantContext = createContext<VariantState>(NO_VARIANTS);

const labels = (definition: Definition): string[] | undefined =>
  typeof definition === "string"
    ? [definition]
    : Array.isArray(definition)
      ? definition
      : undefined;

function resolveDefinition(
  definition: Definition,
  variants: Variants | undefined,
  custom: unknown,
): Target | undefined {
  if (!definition) return undefined;
  const names = labels(definition);
  if (!names) return definition as Target;
  if (!variants) return undefined;
  const merged: Target = {};
  for (const name of names) {
    const variant = variants[name];
    if (!variant) continue;
    Object.assign(merged, typeof variant === "function" ? variant(custom) : variant);
  }
  return merged;
}

// ── m.* components ───────────────────────────────────────────────────────────

type MotionOwnProps = {
  initial?: Definition;
  animate?: Definition;
  exit?: Definition;
  transition?: Transition;
  whileInView?: Definition;
  viewport?: {
    once?: boolean;
    amount?: number | "some" | "all";
    margin?: string;
    root?: ElementRef;
  };
  variants?: Variants;
  custom?: unknown;
  layout?: boolean | "position";
  layoutId?: string;
  layoutScroll?: boolean;
  onAnimationComplete?: (definition: Definition) => void;
  style?: MotionStyle | string;
  ref?: ((el: HTMLElement) => void) | HTMLElement | undefined;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MotionProps = MotionOwnProps & Record<string, any>;
export type HTMLMotionProps<_T extends string = "div"> = MotionProps;

const OWN = [
  "initial",
  "animate",
  "exit",
  "transition",
  "whileInView",
  "viewport",
  "variants",
  "custom",
  "layout",
  "layoutId",
  "layoutScroll",
  "onAnimationComplete",
  "style",
  "ref",
] as const;

function whenConnected(node: Element, run: () => void) {
  if (node.isConnected) return run();
  let frame = requestAnimationFrame(function check() {
    if (node.isConnected) run();
    else frame = requestAnimationFrame(check);
  });
  return () => cancelAnimationFrame(frame);
}

type PassedAttributes = { readonly [attribute: string]: unknown };

function createMotionComponent(tag: string) {
  const svg = SVG_TAGS.has(tag);
  return (props: MotionProps) => {
    const Tag = dynamic(() => tag) as Component<JSX.HTMLAttributes<HTMLElement>>;
    const passed = omit(props, ...OWN) as PassedAttributes;
    const motionKeys = untrack(() =>
      Object.keys(passed).filter((key) => key !== "children" && isMotionValue(passed[key])),
    );
    const rest = merge(
      passed,
      Object.defineProperties(
        {},
        Object.fromEntries(
          motionKeys.map((key) => [
            key,
            { enumerable: true, get: () => (passed[key] as MotionValue<unknown>)() },
          ]),
        ),
      ),
    );
    const presence = useContext(PresenceContext);
    const provided = useContext(VariantContext);
    const parent = provided === NO_VARIANTS ? undefined : provided;
    // Conditional props compile to memo getters, so effect callbacks read them under this owner.
    const owner = getOwner();
    const peek = <T,>(read: () => T): T => runWithOwner(owner, () => untrack(read));
    const transition = () => peek(() => props.transition);
    const custom = () => props.custom ?? presence.custom();
    const variants = () => props.variants;

    // Inherit the parent's variant labels when this node has variants but no own state.
    const inherits = untrack(
      () => props.variants !== undefined && props.animate === undefined && parent !== undefined,
    );
    const index = inherits ? parent!.register() : 0;
    const initialDef = (): Definition =>
      props.initial !== undefined ? props.initial : inherits ? parent!.initial() : undefined;
    const [inViewActive, setInViewActive] = createSignal(false);
    const animateDef = (): Definition => {
      if (props.animate !== undefined) return props.animate;
      if (props.whileInView !== undefined) {
        return inViewActive() ? props.whileInView : initialDef() || undefined;
      }
      return inherits ? parent!.animate() : undefined;
    };

    const skipInitial = untrack(() => props.initial === false || presence.skipInitial());
    // First paint (server and hydration): `initial`, or the `animate` target when
    // initial is skipped, which is what framer-motion renders inline on the server too.
    const first = untrack(() => {
      const definition = skipInitial ? animateDef() : initialDef() || animateDef();
      return splitSvg(resolveDefinition(definition, variants(), custom()));
    });
    const firstStyle = toCss(first.style);
    const firstAttrs = svg ? first.attrs : {};
    if (!svg && first.attrs) Object.assign(firstStyle, toCss(first.attrs as Target));

    const [element, setElement] = createSignal<HTMLElement>();
    let el: HTMLElement | undefined;

    const run = (definition: Definition, extraDelay = 0) => {
      const node = el;
      const target = resolveDefinition(definition, peek(variants), peek(custom));
      if (!node || !target) return;
      const { transition: own, transitionEnd, ...values } = target;
      const merged = { ...transition(), ...own };
      const stagger = parent && inherits ? parent.stagger() * index : 0;
      if (stagger || extraDelay) merged.delay = (merged.delay ?? 0) + stagger + extraDelay;
      delete merged.staggerChildren;
      delete merged.delayChildren;
      void animateDom(node, values as never, timing(merged)).then(() => {
        if (transitionEnd) Object.assign(node.style, toCss(transitionEnd as Target));
        props.onAnimationComplete?.(definition);
      });
    };

    let staggerCount = 0;
    const childState: VariantState = {
      initial: () => labels(initialDef()) ?? (initialDef() === false ? false : undefined),
      animate: () => labels(animateDef()),
      register: () => staggerCount++,
      stagger: () => {
        const target = resolveDefinition(animateDef(), variants(), custom());
        return (target?.transition?.staggerChildren as number | undefined) ?? 0;
      },
    };

    createEffect(element, (node) => {
      if (!node) return;
      const { exit, whileInView, viewport, layoutId } = peek(() => ({
        exit: props.exit,
        whileInView: props.whileInView,
        viewport: props.viewport,
        layoutId: props.layoutId,
      }));
      const stops: Array<() => void> = [() => layoutEls.delete(node)];
      if (exit !== undefined) {
        exits.set(node, {
          resolve: (latest) => resolveDefinition(exit, peek(variants), latest),
          transition: transition(),
          custom,
        });
      }
      if (!skipInitial && peek(initialDef) && peek(animateDef) && whileInView === undefined) {
        const stop = whenConnected(node, () => run(peek(animateDef)));
        if (stop) stops.push(stop);
      }
      if (whileInView !== undefined) {
        const stop = inView(
          node,
          () => {
            setInViewActive(true);
            if (viewport?.once) {
              stop();
              return;
            }
            return () => setInViewActive(false);
          },
          {
            amount: viewport?.amount,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            margin: viewport?.margin as any,
            root: unref(viewport?.root),
          },
        );
        stops.push(stop);
      }
      if (layoutId) {
        layoutIds.set(layoutId, { el: node, transition });
        stops.push(() => {
          if (layoutIds.get(layoutId)?.el === node) layoutIds.delete(layoutId);
        });
      }
      return () => stops.forEach((stop) => stop());
    });
    createEffect(
      () => (element() && props.layout ? (props.layout === "position" ? "position" : true) : false),
      (mode) => {
        if (!el) return;
        if (mode) layoutEls.set(el, { mode, transition });
        else layoutEls.delete(el);
      },
    );
    const keyOf = (definition: Definition) =>
      definition === undefined || definition === false
        ? ""
        : JSON.stringify(resolveDefinition(definition, peek(variants), peek(custom)) ?? "");
    let lastTarget = untrack(() => keyOf(animateDef()));
    createEffect(
      () => animateDef(),
      (definition) => {
        const key = keyOf(definition);
        if (key === lastTarget) return;
        lastTarget = key;
        if (el && definition) run(definition);
      },
    );

    const setRef = (node: HTMLElement) => {
      el = node;
      setElement(node);
      const ref = props.ref;
      if (typeof ref === "function") ref(node);
    };

    const content = (
      <Tag
        {...firstAttrs}
        {...rest}
        ref={setRef}
        style={{ ...firstStyle, ...toCss(props.style) }}
      />
    );
    return props.variants !== undefined || inherits ? (
      <VariantContext value={childState}>{content}</VariantContext>
    ) : (
      content
    );
  };
}

type MotionComponent = (props: MotionProps) => JSX.Element;
const cache = new Map<string, MotionComponent>();
export const m = new Proxy({} as Record<string, MotionComponent>, {
  get(_target, tag: string) {
    let component = cache.get(tag);
    if (!component) {
      component = createMotionComponent(tag);
      cache.set(tag, component);
    }
    return component;
  },
});
export const motion = m;

// LazyMotion / LayoutGroup / MotionConfig have no work to do here: every feature is
// always loaded, layout ids are global, and reduced motion always follows the user.
export const LazyMotion = (props: {
  children: JSX.Element;
  features?: unknown;
  strict?: boolean;
}) => props.children;
export const LayoutGroup = (props: { children: JSX.Element; id?: string }) => props.children;
export const MotionConfig = (props: {
  children: JSX.Element;
  reducedMotion?: string;
  transition?: Transition;
}) => props.children;
export const domMax = {};
export const domAnimation = {};
