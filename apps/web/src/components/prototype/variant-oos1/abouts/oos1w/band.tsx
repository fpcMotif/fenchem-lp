import { m } from "motion/react";
import * as stylex from "@stylexjs/stylex";
import { type MotionValue } from "motion/react";
import { look } from "./band-values";

const spot = stylex.create({
  root: {
    position: "relative",
    display: "block",
    width: "100%",
    height: "100%",
  },
  layer: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
  },
  upper: { top: "-20%", opacity: 0.9 },
  centre: { top: 0, opacity: 0.8 },
  lower: { top: "20%", opacity: 0.85 },
});

export function MixedSpot() {
  return (
    <span aria-hidden="true" {...stylex.props(spot.root)}>
      <span {...stylex.props(spot.layer, spot.upper, look.navyBody)} />
      <span {...stylex.props(spot.layer, spot.centre, look.midBody)} />
      <span {...stylex.props(spot.layer, spot.lower, look.blueBody)} />
    </span>
  );
}

export function PencilRing({
  visible,
  ahead = false,
}: {
  visible: MotionValue<number>;
  ahead?: boolean;
}) {
  return (
    <m.svg
      viewBox="0 0 120 48"
      preserveAspectRatio="none"
      style={{ opacity: visible }}
      {...stylex.props(look.ring)}
    >
      <path
        d="M16 31 C 6 19, 30 6, 62 5 C 94 4, 117 13, 114 26 C 111 38, 84 44, 56 43 C 28 42, 6 35, 11 22 C 14 15, 23 10, 34 8"
        fill="none"
        stroke={ahead ? "rgba(7, 67, 169, 0.75)" : "rgba(26, 26, 26, 0.46)"}
        strokeWidth={1}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </m.svg>
  );
}
