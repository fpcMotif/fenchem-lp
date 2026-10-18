import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";

import { ui } from "./shared";
import { clock, hourAngle } from "./sun";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  head: {
    alignItems: "end",
    rowGap: 20,
    paddingTop: { default: 20, [bp.desktop]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.line,
  },
  reading: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "1 / span 3" },
    display: "flex",
    alignItems: "flex-end",
    gap: { default: 14, [bp.desktop]: 18 },
  },
  dial: {
    position: "relative",
    flexShrink: 0,
    width: { default: 40, [bp.desktop]: 52 },
    height: { default: 40, [bp.desktop]: 52 },
  },
  hand: {
    position: "absolute",
    top: 6,
    left: "50%",
    width: 1,
    height: "calc(100% - 6px)",
    marginLeft: -0.5,
    transformOrigin: "50% 0",
  },
  mark: {
    backgroundColor: tone.line,
    transform: "rotate(calc(var(--mark) * -1deg))",
  },
  live: {
    backgroundImage: `linear-gradient(to bottom, ${tone.navy}, rgba(11, 42, 92, 0.15))`,
    transform: "rotate(calc(var(--sun-deg) * -1deg)) scaleY(calc(0.3 + var(--sun-len) * 0.29))",
    willChange: "transform",
  },
  pin: {
    position: "absolute",
    top: 3,
    left: "50%",
    width: 7,
    height: 7,
    marginLeft: -3.5,
    borderRadius: "50%",
    backgroundColor: tone.navy,
  },
  time: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    margin: 0,
    fontFamily: face.serif,
    color: tone.navy,
    whiteSpace: "nowrap",
  },
  digits: {
    fontSize: { default: 44, [bp.laptop]: 50, [bp.wide]: 60 },
    lineHeight: 0.86,
    fontVariantNumeric: "lining-nums tabular-nums",
  },
  half: {
    fontStyle: "italic",
    fontSize: { default: 17, [bp.desktop]: 20 },
    color: tone.quiet,
  },
  titles: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "4 / span 8" },
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: { default: 14, [bp.desktop]: 20 },
    rowGap: 4,
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 700,
    fontSize: { default: 30, [bp.tablet]: 36, [bp.desktop]: 44 },
    lineHeight: 1.15,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
});

export function SectionHead(props: {
  titleId: string;
  hour: number;
  title: string;
  english: string;
}) {
  const reading = clock(props.hour);
  return (
    <header {...stylex.attrs(ui.grid, styles.head)}>
      <div {...stylex.attrs(styles.reading)}>
        <span aria-hidden="true" {...stylex.attrs(styles.dial)}>
          <span
            style={{ "--mark": hourAngle(props.hour) } as JSX.CSSProperties}
            {...stylex.attrs(styles.hand, styles.mark)}
          />
          <span {...stylex.attrs(styles.hand, styles.live)} />
          <span {...stylex.attrs(styles.pin)} />
        </span>
        <p {...stylex.attrs(styles.time)}>
          <span {...stylex.attrs(styles.digits)}>{reading.time}</span>
          <span lang="en" {...stylex.attrs(styles.half)}>
            {reading.half}
          </span>
        </p>
      </div>
      <div {...stylex.attrs(styles.titles)}>
        <h2 id={props.titleId} {...stylex.attrs(styles.title)}>
          {props.title}
        </h2>
        <p lang="en" {...stylex.attrs(ui.eyebrow)}>
          {props.english}
        </p>
      </div>
    </header>
  );
}
