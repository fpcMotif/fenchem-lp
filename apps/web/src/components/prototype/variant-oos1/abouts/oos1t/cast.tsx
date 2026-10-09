import * as stylex from "@stylexjs/stylex";
import type { CSSProperties } from "react";

const SHADE =
  "rgba(11, 42, 92, 0.26), rgba(11, 42, 92, 0.19) 14%, rgba(11, 42, 92, 0.11) 58%, rgba(11, 42, 92, 0.035)";
const VERTICAL = "matrix(1, 0, calc(var(--ux) * var(--k)), calc(var(--uy) * var(--k)), 0, 0)";
const SIDE_X = "calc(var(--ux) * var(--k) * var(--dir))";
const SIDE_Y = "calc(var(--uy) * var(--k) * var(--dir))";

const styles = stylex.create({
  root: {
    position: "absolute",
    inset: 0,
    zIndex: -1,
    pointerEvents: "none",
    opacity: "calc(0.72 + var(--sun-day) * 0.28)",
    "--dir": "1",
    "--k": "calc(var(--lift) * var(--sun-scale) / 100)",
  },
  live: {
    "--ux": "var(--sun-ux)",
    "--uy": "var(--sun-uy)",
  },
  still: {
    "--ux": "calc(var(--sun-ux) * var(--sun-live) + var(--sun-still-ux) * (1 - var(--sun-live)))",
    "--uy": "calc(var(--sun-uy) * var(--sun-live) + var(--sun-still-uy) * (1 - var(--sun-live)))",
  },
  toward: {
    "--dir": "-1",
  },
  trail: {
    position: "absolute",
    display: "block",
    willChange: "transform",
  },
  below: {
    top: "100%",
    left: 0,
    width: "100%",
    height: 100,
    transformOrigin: "0 0",
    transform: VERTICAL,
    backgroundImage: `linear-gradient(to bottom, ${SHADE})`,
  },
  above: {
    bottom: "100%",
    left: 0,
    width: "100%",
    height: 100,
    transformOrigin: "0 100%",
    transform: VERTICAL,
    backgroundImage: `linear-gradient(to top, ${SHADE})`,
  },
  right: {
    top: 0,
    left: "100%",
    width: 100,
    height: "100%",
    transformOrigin: "0 0",
    transform: `matrix(${SIDE_X}, ${SIDE_Y}, 0, 1, 0, 0)`,
    opacity: `clamp(0, ${SIDE_X} * 400, 1)`,
    backgroundImage: `linear-gradient(to right, ${SHADE})`,
  },
  left: {
    top: 0,
    right: "100%",
    width: 100,
    height: "100%",
    transformOrigin: "100% 0",
    transform: `matrix(calc(${SIDE_X} * -1), calc(${SIDE_Y} * -1), 0, 1, 0, 0)`,
    opacity: `clamp(0, ${SIDE_X} * -400, 1)`,
    backgroundImage: `linear-gradient(to left, ${SHADE})`,
  },
});

export function Cast({
  lift,
  toward = false,
  still = false,
}: {
  lift: number;
  toward?: boolean;
  still?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ "--lift": lift } as CSSProperties}
      {...stylex.props(styles.root, still ? styles.still : styles.live, toward && styles.toward)}
    >
      <span {...stylex.props(styles.trail, toward ? styles.above : styles.below)} />
      <span {...stylex.props(styles.trail, styles.right)} />
      <span {...stylex.props(styles.trail, styles.left)} />
    </span>
  );
}
