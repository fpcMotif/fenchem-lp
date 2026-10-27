import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CAMPUS_GALLERY } from "../../campus-gallery";
import { color, font } from "../../tokens.stylex";

const COUNT = CAMPUS_GALLERY.length;
const LAST = COUNT - 1;
const DESKTOP = breakpoints.xl;
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
    width: { default: 196, [breakpoints.md]: 290, [DESKTOP]: 360 },
    height: { default: 270, [breakpoints.md]: 396, [DESKTOP]: 490 },
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

export function CampusCarousel({ onOpen }: { paused: boolean; onOpen: (index: number) => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const glideRef = useRef<(value: number) => void>(() => {});
  const dragged = useRef(false);
  const gesture = useRef<{ pointerId: number; x: number; origin: number } | null>(null);
  const [position, setPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();
  const active = clamp(Math.round(position), 0, LAST);

  const paint = (value: number) => {
    const next = clamp(value, 0, LAST);
    positionRef.current = next;
    setPosition(next);
  };

  const glideTo = (value: number) => {
    const next = clamp(Math.round(value), 0, LAST);
    setDragging(false);
    if (reduce) {
      paint(next);
      return;
    }
    requestAnimationFrame(() => paint(next));
  };
  useEffect(() => {
    glideRef.current = glideTo;
  });

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    let idle = 0;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      setDragging(true);
      const next = clamp(positionRef.current + event.deltaX / DRAG_PX, 0, LAST);
      positionRef.current = next;
      setPosition(next);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => glideRef.current(positionRef.current), 140);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      node.removeEventListener("wheel", onWheel);
      window.clearTimeout(idle);
    };
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragged.current = false;
    gesture.current = { pointerId: event.pointerId, x: event.clientX, origin: positionRef.current };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const tracked = gesture.current;
    if (!tracked || tracked.pointerId !== event.pointerId) return;
    const dx = event.clientX - tracked.x;
    if (!dragged.current) {
      if (Math.abs(dx) < 5) return;
      dragged.current = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    paint(tracked.origin - dx / DRAG_PX);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const tracked = gesture.current;
    gesture.current = null;
    if (!tracked || tracked.pointerId !== event.pointerId || !dragged.current) return;
    glideTo(positionRef.current);
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

  const step = (delta: number) => glideTo(Math.round(positionRef.current) + delta);

  return (
    <div {...stylex.props(styles.album)}>
      <div
        ref={stageRef}
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
        {...stylex.props(styles.stage)}
      >
        <div {...stylex.props(styles.slot)}>
          {CAMPUS_GALLERY.map((photo, index) => {
            const offset = index - position;
            if (Math.abs(offset) > 4) return null;
            const placed = poseAt(offset);
            const front = index === active;
            return (
              <button
                key={photo.id}
                type="button"
                tabIndex={front ? 0 : -1}
                aria-label={front ? `View larger: ${photo.english}` : `Show: ${photo.english}`}
                onClick={() => {
                  if (dragged.current) {
                    dragged.current = false;
                    return;
                  }
                  if (front) onOpen(index);
                  else glideTo(index);
                }}
                {...stylex.props(
                  styles.card,
                  front && styles.cardFront,
                  reduce && styles.cardPlain,
                  dragging && styles.cardDirect,
                  dynamic.pose(
                    `translateX(calc(-50% + ${placed.x}%)) scale(${placed.scale})`,
                    placed.opacity,
                    `brightness(${placed.brightness})`,
                    placed.layer,
                  ),
                )}
              >
                <span {...stylex.props(styles.art)}>
                  <img
                    src={photo.image}
                    srcSet={photo.srcSet || undefined}
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 290px, 196px"
                    alt={photo.alt}
                    loading={Math.abs(offset) <= 2 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    {...stylex.props(styles.photo, dynamic.focus(photo.focus))}
                  />
                </span>
                <span aria-hidden="true" {...stylex.props(styles.reflection)}>
                  <img
                    src={photo.image}
                    srcSet={photo.srcSet || undefined}
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 290px, 196px"
                    alt=""
                    loading={Math.abs(offset) <= 2 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    {...stylex.props(styles.photo, dynamic.focus(photo.focus))}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p aria-live="polite" {...stylex.props(styles.caption)}>
        {CAMPUS_GALLERY[active]?.caption}
        <span {...stylex.props(styles.counter)}>
          {active + 1} / {COUNT}
        </span>
      </p>
      <div
        role="slider"
        aria-label="Album position"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={LAST}
        aria-valuenow={active}
        tabIndex={0}
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
        {...stylex.props(styles.track)}
      >
        <span
          {...stylex.props(
            styles.thumb,
            dynamic.thumb(`${(position / LAST) * (TRACK_PX - THUMB_PX)}px`),
          )}
        />
      </div>
    </div>
  );
}
