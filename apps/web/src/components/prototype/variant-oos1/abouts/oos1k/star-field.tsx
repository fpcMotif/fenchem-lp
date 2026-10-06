import * as stylex from "@stylexjs/stylex";
import { m, useScroll, useSpring, useTransform } from "motion/react";
import type { RefObject } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import {
  DECLINATION_RADII,
  FIELD,
  FIELD_RADIUS,
  HOUR_LINES,
  RING_HOURS,
  RING_RADIUS,
  RING_TICKS,
  type MagnitudePaths,
} from "./sky";
import { bp, chrome, face, sky } from "./tokens.stylex";

const dusk = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  layer: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
  sky: {
    position: "sticky",
    top: chrome.header,
    height: chrome.sky,
    overflow: "hidden",
    contain: "strict",
  },
  frame: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rotor: {
    flexShrink: 0,
    width: stylex.firstThatWorks("hypot(100vw, 100svh)", "142vmax"),
    height: stylex.firstThatWorks("hypot(100vw, 100svh)", "142vmax"),
    willChange: "transform",
  },
  svg: {
    display: "block",
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  grid: {
    fill: "none",
    stroke: sky.tint,
    strokeWidth: 1,
    opacity: 0.075,
  },
  hours: {
    fill: "none",
    stroke: sky.tint,
    strokeWidth: 1,
    opacity: 0.045,
  },
  ticks: {
    fill: "none",
    stroke: sky.tint,
    strokeWidth: 1,
    opacity: 0.2,
  },
  numeral: {
    fill: sky.tint,
    opacity: 0.46,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 22,
  },
  wideOnly: {
    display: { default: "none", [bp.wideUp]: "inline" },
  },
  star: {
    fill: "none",
    strokeLinecap: "round",
    animationName: { default: dusk, [bp.motionReduce]: "none" },
    animationDuration: "1400ms",
    animationTimingFunction: chrome.ease,
    animationFillMode: "both",
  },
  mag1: {
    stroke: sky.star,
    strokeWidth: { default: 2.8, [bp.wideUp]: 3.4 },
    animationDelay: "calc(var(--oo-intro, 0ms) + 200ms)",
  },
  mag2: {
    stroke: sky.tint,
    strokeOpacity: 0.8,
    strokeWidth: { default: 1.8, [bp.wideUp]: 2.1 },
    animationDelay: "calc(var(--oo-intro, 0ms) + 700ms)",
  },
  mag3: {
    stroke: sky.tint,
    strokeOpacity: 0.5,
    strokeWidth: { default: 1.2, [bp.wideUp]: 1.3 },
    animationDelay: "calc(var(--oo-intro, 0ms) + 1200ms)",
  },
});

function Magnitudes({ paths }: { paths: MagnitudePaths }) {
  return (
    <>
      <path
        d={paths[3]}
        vectorEffect="non-scaling-stroke"
        {...stylex.props(styles.star, styles.mag3)}
      />
      <path
        d={paths[2]}
        vectorEffect="non-scaling-stroke"
        {...stylex.props(styles.star, styles.mag2)}
      />
      <path
        d={paths[1]}
        vectorEffect="non-scaling-stroke"
        {...stylex.props(styles.star, styles.mag1)}
      />
    </>
  );
}

export function StarField({
  trackRef,
  flare,
}: {
  trackRef: RefObject<HTMLDivElement | null>;
  flare: boolean;
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const settled = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.6 });
  const rotate = useTransform(settled, [0, 1], [0, -36]);
  const exposure = flare && !reduce ? { opacity: [1, 0.38, 1] } : { opacity: 1 };

  return (
    <div aria-hidden="true" {...stylex.props(styles.layer)}>
      <div {...stylex.props(styles.sky)}>
        <m.div
          initial={false}
          animate={exposure}
          transition={{ duration: 2.4, times: [0, 0.12, 1], ease: "easeOut" }}
          {...stylex.props(styles.frame)}
        >
          <m.div style={{ rotate: reduce ? 0 : rotate }} {...stylex.props(styles.rotor)}>
            <svg
              viewBox={`${-FIELD_RADIUS} ${-FIELD_RADIUS} ${FIELD_RADIUS * 2} ${FIELD_RADIUS * 2}`}
              {...stylex.props(styles.svg)}
            >
              <g {...stylex.props(styles.grid)}>
                {DECLINATION_RADII.map((radius) => (
                  <circle key={radius} r={radius} vectorEffect="non-scaling-stroke" />
                ))}
              </g>
              <path
                d={HOUR_LINES}
                vectorEffect="non-scaling-stroke"
                {...stylex.props(styles.hours)}
              />
              <g {...stylex.props(styles.wideOnly)}>
                <circle
                  r={RING_RADIUS}
                  vectorEffect="non-scaling-stroke"
                  {...stylex.props(styles.ticks)}
                />
                <path
                  d={RING_TICKS}
                  vectorEffect="non-scaling-stroke"
                  {...stylex.props(styles.ticks)}
                />
                {RING_HOURS.map((hour) => (
                  <text
                    key={hour.label}
                    x={hour.x}
                    y={hour.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${hour.degrees + 90} ${hour.x} ${hour.y})`}
                    {...stylex.props(styles.numeral)}
                  >
                    {hour.label}
                  </text>
                ))}
              </g>
              <Magnitudes paths={FIELD.sparse} />
              <g {...stylex.props(styles.wideOnly)}>
                <Magnitudes paths={FIELD.dense} />
              </g>
            </svg>
          </m.div>
        </m.div>
      </div>
    </div>
  );
}
