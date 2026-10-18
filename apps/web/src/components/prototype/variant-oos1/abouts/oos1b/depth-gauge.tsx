import * as stylex from "@stylexjs/stylex";

import { face, motion, tone } from "./tokens.stylex";

const ROOM_COUNT = 5;
const WIDTH = 60;
const HEIGHT = 36;
const STEP = 3.5;

// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps: typeof stylex.attrs = (...args) => stylex.attrs(...args);

const styles = stylex.create({
  gauge: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  label: {
    fontFamily: face.latin,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.body,
    fontVariantNumeric: "tabular-nums",
  },
  rect: {
    fill: "none",
    strokeWidth: 1,
    stroke: tone.ruleFaint,
    transitionProperty: "stroke",
    transitionDuration: "420ms",
    transitionTimingFunction: motion.ease,
  },
  passed: {
    stroke: tone.rule,
  },
  current: {
    stroke: tone.navy,
  },
});

export function DepthGauge(props: { depth: number }) {
  const outside = () => props.depth >= ROOM_COUNT;
  return (
    <div {...stylex.attrs(styles.gauge)}>
      <span lang="en" {...stylex.attrs(styles.label)}>
        {outside() ? "From above" : `Room ${props.depth + 1} of ${ROOM_COUNT}`}
      </span>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        {Array.from({ length: ROOM_COUNT }, (_, level) => {
          const inset = 0.5 + level * STEP;
          return (
            <rect
              x={inset}
              y={inset}
              width={WIDTH - inset * 2}
              height={HEIGHT - inset * 2}
              {...sxProps(
                styles.rect,
                (outside() || level < props.depth) && styles.passed,
                (outside() || level === props.depth) && styles.current,
              )}
            />
          );
        })}
      </svg>
    </div>
  );
}
