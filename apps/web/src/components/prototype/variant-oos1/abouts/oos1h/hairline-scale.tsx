import * as stylex from "@stylexjs/stylex";

import { ui } from "./theme.stylex";

const INTERVALS = 24;
const STRAY_TICK = 15;
const STRAY_SHIFT = 0.42;

const TICKS = Array.from({ length: INTERVALS + 1 }, (_, n) => ({
  id: `tick-${n}`,
  at: n / INTERVALS,
  major: n % 6 === 0,
  stray: n === STRAY_TICK,
}));

const styles = stylex.create({
  scale: {
    position: "relative",
    width: "100%",
    height: 22,
    color: ui.tick,
    pointerEvents: "none",
  },
  tick: {
    position: "absolute",
    bottom: 0,
    width: 1,
    backgroundColor: "currentColor",
  },
  at: (at: number) => ({ left: `${at * 100}%` }),
  minor: {
    height: 6,
  },
  major: {
    height: 12,
  },
  stray: {
    height: 18,
    marginInlineStart: `${(STRAY_SHIFT / INTERVALS) * 100}%`,
    backgroundColor: ui.ink,
  },
  mark: {
    position: "absolute",
    bottom: 14,
    width: 5,
    height: 5,
    boxSizing: "border-box",
    marginInlineStart: -2.5,
    borderRadius: "50%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: ui.ink,
  },
});

export function HairlineScale({ sx }: { sx?: stylex.StyleXStyles }) {
  return (
    <div aria-hidden="true" {...stylex.props(styles.scale, sx)}>
      {TICKS.map((tick) => (
        <span
          key={tick.id}
          {...stylex.props(
            styles.tick,
            styles.at(tick.at),
            tick.major ? styles.major : styles.minor,
            tick.stray && styles.stray,
          )}
        />
      ))}
      {TICKS.filter((tick) => tick.stray).map((tick) => (
        <span key={`mark-${tick.id}`} {...stylex.props(styles.mark, styles.at(tick.at))} />
      ))}
    </div>
  );
}
