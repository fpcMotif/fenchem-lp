import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CAMPUS_GALLERY } from "./campus-gallery";

const COUNT = CAMPUS_GALLERY.length;
const LAST = COUNT - 1;
const DESKTOP = breakpoints.xl;
const TRACK_PX = 300;
const THUMB_PX = 22;
const DRAG_PX = 160;
const TILT = 58;
const FLOW_EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

type Pose = {
  x: number;
  rotate: number;
  z: number;
  scale: number;
  opacity: number;
  brightness: number;
  blur: number;
  layer: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const poseAt = (offset: number): Pose => {
  const distance = Math.abs(offset);
  const direction = Math.sign(offset) || 0;
  const near = Math.min(distance, 1);
  return {
    x: direction * (near * 96 + Math.max(distance - 1, 0) * 46),
    rotate: direction * -TILT * near,
    z: (1 - near) * 140 - Math.min(distance, 2.2) * 40,
    scale: 1.18 - near * 0.36,
    opacity: distance > 3.6 ? 0 : 1 - Math.max(distance - 2.8, 0) * 0.8,
    brightness: 1 - near * 0.1,
    blur: near * 6 + Math.max(distance - 1, 0) * 2,
    layer: 30 - Math.round(distance * 6),
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
    paddingTop: 8,
    cursor: { default: "grab", ":active": "grabbing" },
    userSelect: "none",
    touchAction: "pan-y",
    outlineStyle: "none",
  },
  slot: {
    position: "relative",
    width: { default: 240, [breakpoints.md]: 310, [DESKTOP]: 380 },
    height: { default: 290, [breakpoints.md]: 370, [DESKTOP]: 450 },
    marginInline: "auto",
    perspective: 1100,
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
    willChange: "transform",
    transitionProperty: "transform, opacity, filter",
    transitionDuration: "460ms",
    transitionTimingFunction: FLOW_EASE,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  cardDirect: {
    transitionDuration: "0ms",
  },
  cardFront: {
    cursor: "zoom-in",
  },
  art: {
    display: "block",
    overflow: "hidden",
    aspectRatio: "1",
    backgroundColor: "#d5dbe3",
    boxShadow: "0 22px 40px -20px rgba(6, 28, 66, 0.6)",
  },
  photo: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
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

export function CampusCarousel({
  onOpen,
}: {
  paused: boolean;
  onOpen: (index: number) => void;
}) {
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
  glideRef.current = glideTo;

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
                  (dragging || reduce) && styles.cardDirect,
                  dynamic.pose(
                    `translate3d(calc(-50% + ${placed.x}%), 0, ${placed.z}px) rotateY(${placed.rotate}deg) scale(${placed.scale})`,
                    placed.opacity,
                    `brightness(${placed.brightness}) blur(${placed.blur}px)`,
                    placed.layer,
                  ),
                )}
              >
                <span {...stylex.props(styles.art)}>
                  <img
                    src={photo.image}
                    srcSet={photo.srcSet || undefined}
                    sizes="(min-width: 1280px) 448px, (min-width: 768px) 366px, 283px"
                    alt={photo.alt}
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
