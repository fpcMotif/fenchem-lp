import * as stylex from "@stylexjs/stylex";
import { useScroll, type MotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { AERIAL_PLATE, ROOMS_IN_WALKING_ORDER } from "./journey";
import {
  AERIAL_FRAME_COUNT,
  AERIAL_INDEX,
  TIMELINE_UNITS,
  frameAt,
  layoutStage,
  type Pose,
  type Size,
  type StageLayout,
} from "./portal-geometry";
import { DepthGauge } from "./depth-gauge";
import { Tag } from "./shared";
import { ui } from "./shared-values";
import { chrome, face, motion, tone } from "./tokens.stylex";

const PLATES = [...ROOMS_IN_WALKING_ORDER.map((room) => room.plate), AERIAL_PLATE];
const SCROLL_SVH_PER_UNIT = 46;

const rectStyle = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: `${x}px`,
  top: `${y}px`,
  width: `${w}px`,
  height: `${h}px`,
});

const styles = stylex.create({
  track: {
    position: "relative",
  },
  stage: {
    position: "sticky",
    top: chrome.header,
    height: "calc(100svh - 80px)",
    minHeight: 560,
    overflow: "hidden",
    backgroundColor: tone.page,
  },
  viewport: {
    position: "absolute",
    overflow: "hidden",
    backgroundColor: tone.depth2,
  },
  world: {
    position: "absolute",
  },
  plate: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: tone.page,
    transformOrigin: "0 0",
    visibility: "hidden",
  },
  photo: {
    position: "absolute",
    display: "block",
    objectFit: "cover",
  },
  lines: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 3,
    overflow: "visible",
    pointerEvents: "none",
  },
  tag: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 4,
    visibility: "hidden",
  },
  hidden: {
    visibility: "hidden",
  },
  passe: {
    position: "absolute",
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.ruleStrong,
    pointerEvents: "none",
  },
  band: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
  },
  captions: {
    display: "grid",
  },
  caption: {
    gridArea: "1 / 1",
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "520ms",
    transitionTimingFunction: motion.ease,
  },
  captionOn: {
    opacity: 1,
  },
  numeral: {
    minWidth: 30,
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.navy,
  },
  chinese: {
    fontFamily: face.sans,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  english: {
    fontSize: 19,
    lineHeight: 1,
  },
});

const strokeProps = {
  fill: "none",
  stroke: "rgba(11, 42, 92, 0.62)",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
  shapeRendering: "crispEdges",
} as const;

export function PortalStage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size | null>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80px", "end end"],
  });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      setSize((current) =>
        current && current.width === width && current.height === height
          ? current
          : { width, height },
      );
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const layout = useMemo(() => (size ? layoutStage(size, AERIAL_PLATE.aspect) : null), [size]);

  return (
    <div
      ref={trackRef}
      {...stylex.props(styles.track)}
      style={{ height: `calc(${TIMELINE_UNITS * SCROLL_SVH_PER_UNIT}svh + 100svh - 80px)` }}
    >
      <div ref={stageRef} aria-hidden="true" {...stylex.props(styles.stage)}>
        {layout ? <Scene layout={layout} progress={scrollYProgress} /> : null}
      </div>
    </div>
  );
}

function Scene({ layout, progress }: { layout: StageLayout; progress: MotionValue<number> }) {
  const plateEls = useRef<(HTMLDivElement | null)[]>([]);
  const lineEls = useRef<(SVGGElement | null)[]>([]);
  const tagEls = useRef<(HTMLSpanElement | null)[]>([]);
  const ringEls = useRef<(SVGRectElement | null)[]>([]);
  const [caption, setCaption] = useState(0);
  const { size, box, gap, aerial, aerialFrameStep } = layout;

  useEffect(() => {
    const place = (index: number, pose: Pose | null, opacity: number, layer: number) => {
      const plate = plateEls.current[index];
      const lines = lineEls.current[index];
      const tag = tagEls.current[index];
      if (!plate || !lines || !tag) return;
      const visibility = pose ? "visible" : "hidden";
      plate.style.visibility = visibility;
      lines.style.visibility = visibility;
      tag.style.visibility = pose && layer === 2 ? "visible" : "hidden";
      if (!pose) return;
      const opacityText = String(opacity);
      plate.style.transform = `translate(${pose.x}px, ${pose.y}px) scale(${pose.s})`;
      plate.style.opacity = opacityText;
      plate.style.zIndex = String(layer);
      lines.setAttribute("transform", `matrix(${pose.s} 0 0 ${pose.s} ${pose.x} ${pose.y})`);
      lines.style.opacity = opacityText;
      tag.style.opacity = opacityText;
      tag.style.transform = `translate(${pose.x - pose.s * gap}px, ${pose.y - pose.s * gap}px) translateY(-50%)`;
    };

    const paint = (value: number) => {
      const frame = frameAt(value, layout);
      PLATES.forEach((_, index) => {
        if (frame.base.plate === index) place(index, frame.base.pose, 1, 1);
        else if (frame.window && frame.window.plate === index)
          place(index, frame.window.pose, frame.window.opacity, 2);
        else place(index, null, 0, 0);
      });
      ringEls.current.forEach((ring, index) => {
        if (!ring) return;
        const shown = Math.min(1, Math.max(0, frame.settled * AERIAL_FRAME_COUNT - index));
        ring.style.opacity = String(shown);
      });
      setCaption(frame.caption);
    };

    paint(progress.get());
    const unsubscribe = progress.on("change", paint);
    return () => unsubscribe();
  }, [layout, progress, gap]);

  return (
    <>
      <div {...stylex.props(styles.viewport)} style={rectStyle(box.x, box.y, box.w, box.h)}>
        <div
          {...stylex.props(styles.world)}
          style={rectStyle(-box.x, -box.y, size.width, size.height)}
        >
          {PLATES.map((plate, index) => (
            <div
              key={plate.id}
              ref={(node) => {
                plateEls.current[index] = node;
              }}
              {...stylex.props(styles.plate)}
              style={rectStyle(0, 0, size.width, size.height)}
            >
              <img
                src={plate.large}
                alt=""
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.photo)}
                style={
                  index === AERIAL_INDEX
                    ? rectStyle(aerial.x, aerial.y, aerial.w, aerial.h)
                    : rectStyle(box.x, box.y, box.w, box.h)
                }
              />
            </div>
          ))}

          <svg
            width={size.width}
            height={size.height}
            viewBox={`0 0 ${size.width} ${size.height}`}
            {...stylex.props(styles.lines)}
          >
            {PLATES.map((plate, index) => (
              <g
                key={plate.id}
                ref={(node) => {
                  lineEls.current[index] = node;
                }}
                {...stylex.props(styles.hidden)}
              >
                {index === AERIAL_INDEX ? (
                  Array.from({ length: AERIAL_FRAME_COUNT }, (_, ring) => {
                    const offset = aerialFrameStep * (ring + 0.5) - 0.5;
                    return (
                      <rect
                        key={ring}
                        ref={(node) => {
                          if (ring > 0) ringEls.current[ring - 1] = node;
                        }}
                        x={aerial.x - offset}
                        y={aerial.y - offset}
                        width={aerial.w + offset * 2}
                        height={aerial.h + offset * 2}
                        {...strokeProps}
                        strokeOpacity={1 - ring * 0.22}
                      />
                    );
                  })
                ) : (
                  <>
                    <rect
                      x={-gap}
                      y={-gap}
                      width={size.width + gap * 2}
                      height={size.height + gap * 2}
                      {...strokeProps}
                    />
                    <rect
                      x={box.x - gap}
                      y={box.y - gap}
                      width={box.w + gap * 2}
                      height={box.h + gap * 2}
                      {...strokeProps}
                    />
                  </>
                )}
              </g>
            ))}
          </svg>

          {PLATES.map((plate, index) => (
            <span
              key={plate.id}
              ref={(node) => {
                tagEls.current[index] = node;
              }}
              {...stylex.props(styles.tag)}
            >
              <Tag numeral={plate.numeral} pinned={false} />
            </span>
          ))}
        </div>
      </div>

      <span
        {...stylex.props(styles.passe)}
        style={rectStyle(box.x - gap, box.y - gap, box.w + gap * 2, box.h + gap * 2)}
      />

      <div
        {...stylex.props(styles.band)}
        style={rectStyle(box.x, box.y + box.h + gap, box.w, size.height - box.y - box.h - gap)}
      >
        <div {...stylex.props(styles.captions)}>
          {PLATES.map((plate, index) => (
            <p
              key={plate.id}
              {...stylex.props(styles.caption, ui.reset, caption === index && styles.captionOn)}
            >
              <span {...stylex.props(styles.numeral)}>{plate.numeral}</span>
              <span {...stylex.props(styles.chinese)}>{plate.caption}</span>
              <span lang="en" {...stylex.props(ui.serif, styles.english)}>
                {plate.english}
              </span>
            </p>
          ))}
        </div>
        <DepthGauge depth={caption} />
      </div>
    </>
  );
}
