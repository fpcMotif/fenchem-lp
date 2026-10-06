import * as stylex from "@stylexjs/stylex";

import { face, motion, tone } from "./tokens.stylex";

const ROOM_COUNT = 5;
const WIDTH = 60;
const HEIGHT = 36;
const STEP = 3.5;

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

export function DepthGauge({ depth }: { depth: number }) {
  const outside = depth >= ROOM_COUNT;
  return (
    <div {...stylex.props(styles.gauge)}>
      <span lang="en" {...stylex.props(styles.label)}>
        {outside ? "From above" : `Room ${depth + 1} of ${ROOM_COUNT}`}
      </span>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        {Array.from({ length: ROOM_COUNT }, (_, level) => {
          const inset = 0.5 + level * STEP;
          return (
            <rect
              key={level}
              x={inset}
              y={inset}
              width={WIDTH - inset * 2}
              height={HEIGHT - inset * 2}
              {...stylex.props(
                styles.rect,
                (outside || level < depth) && styles.passed,
                (outside || level === depth) && styles.current,
              )}
            />
          );
        })}
      </svg>
    </div>
  );
}
