import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const REVEAL_EASE = "cubic-bezier(0.77, 0, 0.175, 1)";

const dotPop = stylex.keyframes({
  "0%": { scale: "0" },
  "60%": { scale: "1.15" },
  "100%": { scale: "1" },
});

const circleReveal = stylex.keyframes({
  "0%": { clipPath: "circle(0px at 50% 50vh)" },
  "100%": { clipPath: "circle(120vmax at 50% 50vh)" },
});

export const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 60,
    display: { default: "block", [breakpoints.motionReduce]: "none" },
    pointerEvents: "none",
  },
  dot: {
    position: "absolute",
    top: "calc(50vh - 7px)",
    left: "calc(50% - 7px)",
    width: 14,
    height: 14,
    borderRadius: "50%",
    backgroundColor: colors.brandBlue700,
    animationName: dotPop,
    animationDuration: "500ms",
    animationDelay: "100ms",
    animationTimingFunction: EASE_OUT,
    animationFillMode: "both",
  },
  pageReveal: {
    animationName: { default: circleReveal, [breakpoints.motionReduce]: "none" },
    animationDuration: "1100ms",
    animationDelay: "500ms",
    animationTimingFunction: REVEAL_EASE,
    animationFillMode: "backwards",
  },
});

export const introStyles = { pageReveal: styles.pageReveal };
