import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { createSignal, onSettled, Show } from "solid-js";
import type { JSX } from "@solidjs/web";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CAMPUS_GALLERY } from "../../campus-gallery";
import { color, font } from "../../tokens.stylex";

const COUNT = CAMPUS_GALLERY.length;
const LAST = COUNT - 1;
const DESKTOP = "@media (min-width: 1280px)";
const TABLET = "@media (min-width: 768px)";
const TRACK_PX = 300;
const THUMB_PX = 22;
const DRAG_PX = 160;
const SIDE_GAP = 96;
const STACK_GAP = 88;
const FLOW_MS = 560;
const FLOW_EASE = "cubic-bezier(0.25, 1, 0.5, 1)";

type Pose = {
  x: number;
  scale: number;
  opacity: number;
  brightness: number;
  layer: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const poseAt = (offset: number): Pose => {
  const distance = Math.abs(offset);
  const direction = Math.sign(offset) || 0;
  const near = Math.min(distance, 1);
  const beyond = Math.max(distance - 1, 0);
  return {
    x: direction * (near * SIDE_GAP + beyond * STACK_GAP),
    scale: 1 - near * 0.16,
    opacity: distance > 3.6 ? 0 : 1 - Math.max(distance - 2.6, 0),
    brightness: 1 - near * 0.3 - Math.min(beyond, 2) * 0.06,
    layer: 100 - Math.round(distance * 10),
  };
};

const dynamic = stylex.create({
  focus: (position: string) => ({ objectPosition: position }),
  pose: (transform: string, opacity: number, filter: string, zIndex: number) => ({
    transform,
    opacity,
    filter,
    zIndex,
  }),
  thumb: (shift: string) => ({ insetInlineStart: shift }),
});

const styles = stylex.create({
  album: {
    width: "min(1040px, calc(100% - 24px))",
    marginInline: "auto",
    paddingBottom: 4,
  },
  stage: {
    position: "relative",
    overflow: "hidden",
    paddingTop: { default: 12, [DESKTOP]: 20 },
    cursor: { default: "grab", ":active": "grabbing" },
    userSelect: "none",
    touchAction: "pan-y",
    outlineStyle: "none",
    maskImage: "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)",
  },
  slot: {
    position: "relative",
    width: { default: 196, [TABLET]: 290, [DESKTOP]: 360 },
    height: { default: 270, [TABLET]: 396, [DESKTOP]: 490 },
    marginInline: "auto",
  },
  card: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: "100%",
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    willChange: "transform",
    transitionProperty: "transform, opacity, filter",
    transitionDuration: `${FLOW_MS}ms`,
    transitionTimingFunction: FLOW_EASE,
    outlineStyle: "none",
  },
  cardDirect: {
    transitionDuration: "0ms",
  },
  cardPlain: {
    transitionProperty: "opacity, filter",
    transitionDuration: "220ms",
    transitionTimingFunction: "ease-out",
  },
  cardFront: {
    cursor: "zoom-in",
  },
  art: {
    position: "relative",
    display: "block",
    overflow: "hidden",
    aspectRatio: "1",
    backgroundColor: "#d5dbe3",
    boxShadow: "0 24px 36px -26px rgba(6, 28, 66, 0.55)",
    outlineStyle: { default: "none", ":is(button:focus-visible > *)": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  reflection: {
    display: "block",
    overflow: "hidden",
    aspectRatio: "1",
    marginTop: 2,
    transform: "scaleY(-1)",
    opacity: 0.32,
    maskImage: "linear-gradient(to top, #000, transparent 44%)",
    pointerEvents: "none",
  },
  photo: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  },
  caption: {
    minHeight: "1.6em",
    marginTop: { default: -4, [DESKTOP]: 0 },
    textAlign: "center",
    fontFamily: font.body,
    fontSize: { default: 14, [DESKTOP]: 15 },
    fontWeight: 500,
    lineHeight: 1.6,
    color: color.ink,
  },
  counter: {
    marginInlineStart: 10,
    fontVariantNumeric: "tabular-nums",
    color: color.muted,
  },
  track: {
    position: "relative",
    width: TRACK_PX,
    height: 3,
    marginInline: "auto",
    marginTop: 14,
    borderRadius: 999,
    backgroundColor: "rgba(120, 120, 128, 0.16)",
    cursor: "pointer",
    touchAction: "none",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 6,
    "::before": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      top: -8,
      bottom: -8,
    },
  },
  thumb: {
    position: "absolute",
    top: -1.5,
    width: THUMB_PX,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(17, 17, 17, 0.92)",
    pointerEvents: "none",
  },
});

export function CampusCarousel(props: { paused: boolean; onOpen: (index: number) => void }) {
  let stage: HTMLDivElement | undefined;
  let positionNow = 0;
  let dragged = false;
  let gesture: { pointerId: number; x: number; origin: number } | null = null;
  const [position, setPosition] = createSignal(0);
  const [dragging, setDragging] = createSignal(false);
  const reduce = useReducedMotion();
  const active = () => clamp(Math.round(position()), 0, LAST);

  const paint = (value: number) => {
    const next = clamp(value, 0, LAST);
    positionNow = next;
    setPosition(next);
  };

  const glideTo = (value: number) => {
    const next = clamp(Math.round(value), 0, LAST);
    setDragging(false);
    if (reduce()) {
      paint(next);
      return;
    }
    requestAnimationFrame(() => paint(next));
  };

  onSettled(() => {
    const node = stage;
    if (!node) return;
    let idle = 0;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      setDragging(true);
      const next = clamp(positionNow + event.deltaX / DRAG_PX, 0, LAST);
      positionNow = next;
      setPosition(next);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => glideTo(positionNow), 140);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      node.removeEventListener("wheel", onWheel);
      window.clearTimeout(idle);
    };
  });

  const onPointerDown: JSX.EventHandler<HTMLDivElement, PointerEvent> = (event) => {
    if (event.button !== 0) return;
    dragged = false;
    gesture = { pointerId: event.pointerId, x: event.clientX, origin: positionNow };
  };

  const onPointerMove: JSX.EventHandler<HTMLDivElement, PointerEvent> = (event) => {
    const tracked = gesture;
    if (!tracked || tracked.pointerId !== event.pointerId) return;
    const dx = event.clientX - tracked.x;
    if (!dragged) {
      if (Math.abs(dx) < 5) return;
      dragged = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    paint(tracked.origin - dx / DRAG_PX);
  };

  const onPointerUp: JSX.EventHandler<HTMLDivElement, PointerEvent> = (event) => {
    const tracked = gesture;
    gesture = null;
    if (!tracked || tracked.pointerId !== event.pointerId || !dragged) return;
    glideTo(positionNow);
  };

  const scrub = (clientX: number, track: HTMLDivElement, release: boolean) => {
    const rect = track.getBoundingClientRect();
    const travel = Math.max(rect.width - THUMB_PX, 1);
    const x = clamp(clientX - rect.left - THUMB_PX / 2, 0, travel);
    const raw = (x / travel) * LAST;
    if (release) glideTo(raw);
    else {
      setDragging(true);
      paint(raw);
    }
  };

  const step = (delta: number) => glideTo(Math.round(positionNow) + delta);

  return (
    <div {...stylex.attrs(styles.album)}>
      <div
        ref={stage}
        role="region"
        aria-roledescription="carousel"
        aria-label="Campus album"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          step(event.key === "ArrowRight" ? 1 : -1);
        }}
        {...stylex.attrs(styles.stage)}
      >
        <div {...stylex.attrs(styles.slot)}>
          {CAMPUS_GALLERY.map((photo, index) => {
            const offset = () => index - position();
            const placed = () => poseAt(offset());
            const front = () => index === active();
            return (
              <Show when={Math.abs(offset()) <= 4}>
                <button
                  type="button"
                  tabindex={front() ? 0 : -1}
                  aria-label={front() ? `View larger: ${photo.english}` : `Show: ${photo.english}`}
                  onClick={() => {
                    if (dragged) {
                      dragged = false;
                      return;
                    }
                    if (front()) props.onOpen(index);
                    else glideTo(index);
                  }}
                  {...stylex.attrs(
                    styles.card,
                    front() && styles.cardFront,
                    reduce() && styles.cardPlain,
                    dragging() && styles.cardDirect,
                    dynamic.pose(
                      `translateX(calc(-50% + ${placed().x}%)) scale(${placed().scale})`,
                      placed().opacity,
                      `brightness(${placed().brightness})`,
                      placed().layer,
                    ),
                  )}
                >
                  <span {...stylex.attrs(styles.art)}>
                    <img
                      src={photo.image}
                      srcset={photo.srcSet || undefined}
                      sizes="(min-width: 1280px) 360px, (min-width: 768px) 290px, 196px"
                      alt={photo.alt}
                      loading={Math.abs(offset()) <= 2 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                      {...stylex.attrs(styles.photo, dynamic.focus(photo.focus))}
                    />
                  </span>
                  <span aria-hidden="true" {...stylex.attrs(styles.reflection)}>
                    <img
                      src={photo.image}
                      srcset={photo.srcSet || undefined}
                      sizes="(min-width: 1280px) 360px, (min-width: 768px) 290px, 196px"
                      alt=""
                      loading={Math.abs(offset()) <= 2 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                      {...stylex.attrs(styles.photo, dynamic.focus(photo.focus))}
                    />
                  </span>
                </button>
              </Show>
            );
          })}
        </div>
      </div>
      <p aria-live="polite" {...stylex.attrs(styles.caption)}>
        {CAMPUS_GALLERY[active()]?.caption}
        <span {...stylex.attrs(styles.counter)}>
          {active() + 1} / {COUNT}
        </span>
      </p>
      <div
        role="slider"
        aria-label="Album position"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={LAST}
        aria-valuenow={active()}
        tabindex={0}
        onPointerDown={(event) => {
          event.stopPropagation();
          event.currentTarget.setPointerCapture(event.pointerId);
          scrub(event.clientX, event.currentTarget, false);
        }}
        onPointerMove={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
          scrub(event.clientX, event.currentTarget, false);
        }}
        onPointerUp={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
          scrub(event.clientX, event.currentTarget, true);
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          step(event.key === "ArrowRight" ? 1 : -1);
        }}
        {...stylex.attrs(styles.track)}
      >
        <span
          {...stylex.attrs(
            styles.thumb,
            dynamic.thumb(`${(position() / LAST) * (TRACK_PX - THUMB_PX)}px`),
          )}
        />
      </div>
    </div>
  );
}
