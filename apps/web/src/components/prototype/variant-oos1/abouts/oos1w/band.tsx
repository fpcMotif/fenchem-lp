import { m } from "@/compat/motion";
import * as stylex from "@stylexjs/stylex";
import { type MotionValue } from "@/compat/motion";
import { look } from "./band-values";
import { merge } from "solid-js";

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
    <span aria-hidden="true" {...stylex.attrs(spot.root)}>
      <span {...stylex.attrs(spot.layer, spot.upper, look.navyBody)} />
      <span {...stylex.attrs(spot.layer, spot.centre, look.midBody)} />
      <span {...stylex.attrs(spot.layer, spot.lower, look.blueBody)} />
    </span>
  );
}

export function PencilRing(props: { visible: MotionValue<number>; ahead?: boolean }) {
  const p = merge({ ahead: false }, props);
  return (
    <m.svg
      viewBox="0 0 120 48"
      preserveAspectRatio="none"
      style={{ opacity: p.visible }}
      {...stylex.attrs(look.ring)}
    >
      <path
        d="M16 31 C 6 19, 30 6, 62 5 C 94 4, 117 13, 114 26 C 111 38, 84 44, 56 43 C 28 42, 6 35, 11 22 C 14 15, 23 10, 34 8"
        fill="none"
        stroke={p.ahead ? "rgba(7, 67, 169, 0.75)" : "rgba(26, 26, 26, 0.46)"}
        stroke-width={1}
        stroke-linecap="round"
        {...{ "vector-effect": "non-scaling-stroke" }}
      />
    </m.svg>
  );
}
