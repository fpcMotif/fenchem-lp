import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, Pause, Play } from "@fenchem-lp/ui/components/lucide";
import { useInView } from "@/compat/motion";
import { createEffect, createSignal } from "solid-js";
import type { JSX } from "@solidjs/web";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CAMPUS_GALLERY } from "./campus-gallery";
import { color, font } from "./tokens.stylex";

const COUNT = CAMPUS_GALLERY.length;
const BRAND_MARK = "/prototype/official-site/fenchem-logo.png";
const DESKTOP = "@media (min-width: 1280px)";
const SLIDE_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const SLIDE_MS = 700;

const AUTOPLAY_MS = 2500;
const DRAG_START_PX = 6;
const SWIPE_COMMIT = 0.18;
const WHEEL_STEP_PX = 40;
const WHEEL_LOCK_MS = 700;
const EAGER_RANGE = 2;
const SIDE_BLUR_PX = 6;

type Pose = { x: number; scale: number; opacity: number; dim: number; blur: number; z: number };

const fade = (distance: number, start: number, end: number) =>
  Math.min(1, Math.max(0, (end - distance) / (end - start)));

const poseAt = (offset: number): Pose => {
  const distance = Math.abs(offset);
  const near = Math.min(distance, 1);
  return {
    x: Math.sign(offset) * (near * 96 + Math.max(distance - 1, 0) * 88),
    scale: 1 - near * 0.16,
    opacity: fade(distance, 1.4, 2.2),
    dim: near * 0.18,
    blur: near * SIDE_BLUR_PX,
    z: 100 - Math.round(distance * 10),
  };
};

const wrapOffset = (offset: number) =>
  ((((offset + COUNT / 2) % COUNT) + COUNT) % COUNT) - COUNT / 2;
const wrapIndex = (position: number) => ((position % COUNT) + COUNT) % COUNT;
const pad = (value: number) => String(value).padStart(2, "0");

const dynamic = stylex.create({
  pose: (transform: string, opacity: number, filter: string, zIndex: number) => ({
    transform,
    opacity,
    filter,
    zIndex,
  }),
  focus: (position: string) => ({ objectPosition: position }),
});

const styles = stylex.create({
  stage: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    paddingBlock: { default: 16, [DESKTOP]: 24 },
    overflowX: "clip",
    overscrollBehaviorX: "contain",
    touchAction: "pan-y",
    userSelect: "none",
    cursor: { default: "grab", ":active": "grabbing" },
  },
  slot: {
    position: "relative",
    flexShrink: 0,
    width: {
      default: "calc(100vw - 112px)",
      ["@media (min-width: 768px)"]: "min(520px, 62vw)",
      [DESKTOP]: 600,
    },
    aspectRatio: { default: "4 / 3", ["@media (min-width: 768px)"]: "16 / 10" },
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    padding: 0,
    borderWidth: 0,
    borderRadius: { default: 16, [DESKTOP]: 22 },
    backgroundColor: "#dfe5ee",
    boxShadow: "0 28px 56px -28px rgba(6, 28, 66, 0.45)",
    cursor: "pointer",
    willChange: "transform, filter, opacity",
    transitionProperty: "transform, opacity, filter",
    transitionDuration: {
      default: "0ms",
      ["@media (prefers-reduced-motion: no-preference)"]: `${SLIDE_MS}ms`,
    },
    transitionTimingFunction: SLIDE_EASE,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 3,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  cardFront: {
    cursor: "zoom-in",
  },
  cardDragging: {
    transitionDuration: "0ms",
  },
  photo: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  },
  head: {
    position: "absolute",
    top: 0,
    insetInlineStart: 0,
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    boxSizing: "border-box",
    padding: { default: "12px 12px 36px", [DESKTOP]: "16px 16px 44px" },
    backgroundImage: "linear-gradient(to bottom, rgba(6, 28, 66, 0.48), rgba(6, 28, 66, 0))",
    fontSize: { default: 12, [DESKTOP]: 13 },
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: colors.paper,
    textAlign: "start",
    textShadow: "0 1px 8px rgba(0, 0, 0, 0.3)",
    pointerEvents: "none",
  },
  avatar: {
    flexShrink: 0,
    width: 26,
    height: 26,
    boxSizing: "border-box",
    padding: 3,
    borderRadius: "50%",
    backgroundColor: colors.paper,
    boxShadow: "0 0 0 1.5px rgba(255, 255, 255, 0.6)",
    objectFit: "cover",
    objectPosition: "0% 50%",
  },
  autoplayToggle: {
    position: "absolute",
    top: { default: 9, [DESKTOP]: 13 },
    insetInlineEnd: { default: 9, [DESKTOP]: 13 },
    zIndex: 101,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    padding: 0,
    borderWidth: 0,
    borderRadius: "50%",
    backgroundColor: { default: "rgba(6, 28, 66, 0.42)", ":hover": "rgba(6, 28, 66, 0.6)" },
    boxShadow: "0 0 0 1.5px rgba(255, 255, 255, 0.6)",
    color: colors.paper,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: SLIDE_EASE,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 2,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: { default: 16, [DESKTOP]: 24 },
    marginTop: { default: 8, [DESKTOP]: 12 },
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 44,
    height: 44,
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(26, 26, 26, 0.14)",
    borderRadius: "50%",
    backgroundColor: { default: colors.paper, ":hover": "#f3f4f6" },
    color: color.ink,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: SLIDE_EASE,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  status: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    minWidth: { default: 150, [DESKTOP]: 190 },
    margin: 0,
  },
  area: {
    fontSize: 12,
    letterSpacing: "0.16em",
    color: colors.brandBlue700,
  },
  captionRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
  },
  caption: {
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: color.ink,
  },
  counter: {
    fontFamily: font.display,
    fontSize: 13,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.08em",
    color: color.muted,
  },
});

type Gesture = { pointerId: number; startX: number; width: number; moved: boolean };

export function CampusCarousel(props: { paused: boolean; onOpen: (index: number) => void }) {
  const [position, setPosition] = createSignal(0);
  const [drag, setDrag] = createSignal<number | null>(null);
  const [playChoice, setPlayChoice] = createSignal<boolean | null>(null);
  let region: HTMLDivElement | undefined;
  let slot: HTMLDivElement | undefined;
  let gesture: Gesture | null = null;
  let dragged = false;
  let wheel = { total: 0, lockedUntil: 0 };
  const approached = useInView(() => region, { once: true, margin: "600px 0px" });
  const reduceMotion = useReducedMotion();

  const active = () => wrapIndex(position());
  const current = () => CAMPUS_GALLERY[active()];
  const playing = () => playChoice() ?? !reduceMotion();
  const paused = () => props.paused || drag() !== null || !playing();
  const step = (delta: number) => setPosition((value) => value + delta);
  const goTo = (index: number) => step(wrapOffset(index - active()));

  createEffect(
    () => [paused(), position()] as const,
    ([isPaused]) => {
      if (isPaused) return;
      const timer = window.setTimeout(() => setPosition((value) => value + 1), AUTOPLAY_MS);
      return () => window.clearTimeout(timer);
    },
  );

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    dragged = false;
    gesture = {
      pointerId: event.pointerId,
      startX: event.clientX,
      width: slot?.offsetWidth ?? 1,
      moved: false,
    };
  };

  const onPointerMove: JSX.EventHandler<HTMLDivElement, PointerEvent> = (event) => {
    const tracked = gesture;
    if (!tracked || tracked.pointerId !== event.pointerId) return;
    const dx = event.clientX - tracked.startX;
    if (!tracked.moved) {
      if (Math.abs(dx) < DRAG_START_PX) return;
      tracked.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setDrag(-dx / tracked.width);
  };

  const onPointerUp = (event: PointerEvent) => {
    const tracked = gesture;
    gesture = null;
    if (!tracked?.moved) return;
    dragged = true;
    const travelled = -(event.clientX - tracked.startX) / tracked.width;
    const steps =
      Math.abs(travelled) < SWIPE_COMMIT
        ? 0
        : Math.sign(travelled) * Math.max(1, Math.round(Math.abs(travelled)));
    step(steps);
    setDrag(null);
  };

  const onPointerCancel = () => {
    gesture = null;
    setDrag(null);
  };

  const onWheel = (event: WheelEvent) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    const now = performance.now();
    if (now < wheel.lockedUntil) return;
    wheel.total += event.deltaX;
    if (Math.abs(wheel.total) < WHEEL_STEP_PX) return;
    step(Math.sign(wheel.total));
    wheel = { total: 0, lockedUntil: now + WHEEL_LOCK_MS };
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    step(event.key === "ArrowRight" ? 1 : -1);
  };

  return (
    <div
      ref={region}
      role="region"
      aria-roledescription="carousel"
      aria-label="Campus photos"
      tabindex={-1}
      onKeyDown={onKeyDown}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onWheel={onWheel}
        {...stylex.attrs(styles.stage)}
      >
        <div ref={slot} {...stylex.attrs(styles.slot)}>
          <button
            type="button"
            aria-label={playing() ? "Pause slideshow" : "Play slideshow"}
            onClick={() => setPlayChoice(!playing())}
            {...stylex.attrs(styles.autoplayToggle)}
          >
            {playing() ? (
              <Pause size={14} fill="currentColor" aria-hidden="true" />
            ) : (
              <Play size={14} fill="currentColor" aria-hidden="true" />
            )}
          </button>
          {CAMPUS_GALLERY.map((photo, index) => {
            const offset = () => wrapOffset(index - position() - (drag() ?? 0));
            const placed = () => poseAt(offset());
            const front = () => index === active();
            return (
              <button
                type="button"
                tabindex={front() ? 0 : -1}
                inert={placed().opacity === 0}
                aria-label={front() ? `View larger: ${photo.english}` : `Show: ${photo.english}`}
                onClick={() => {
                  if (dragged) {
                    dragged = false;
                    return;
                  }
                  if (front()) props.onOpen(index);
                  else goTo(index);
                }}
                {...stylex.attrs(
                  styles.card,
                  front() && styles.cardFront,
                  drag() !== null && styles.cardDragging,
                  dynamic.pose(
                    `translate3d(${placed().x}%, 0, 0) scale(${placed().scale})`,
                    placed().opacity,
                    `brightness(${1 - placed().dim}) blur(${placed().blur}px)`,
                    placed().z,
                  ),
                )}
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading={approached() && Math.abs(offset()) <= EAGER_RANGE ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  {...stylex.attrs(styles.photo, dynamic.focus(photo.focus))}
                />
                <span aria-hidden="true" {...stylex.attrs(styles.head)}>
                  <img src={BRAND_MARK} alt="" {...stylex.attrs(styles.avatar)} />
                  {photo.caption}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div {...stylex.attrs(styles.controls)}>
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => step(-1)}
          {...stylex.attrs(styles.navButton)}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <p {...stylex.attrs(styles.status)}>
          <span {...stylex.attrs(styles.area)}>{current().area}</span>
          <span {...stylex.attrs(styles.captionRow)}>
            <span {...stylex.attrs(styles.caption)}>{current().caption}</span>
            <span lang="en" {...stylex.attrs(styles.counter)}>
              {pad(active() + 1)} / {pad(COUNT)}
            </span>
          </span>
        </p>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => step(1)}
          {...stylex.attrs(styles.navButton)}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
