import * as stylex from "@stylexjs/stylex";

import { face, tone } from "./tokens.stylex";

const styles = stylex.create({
  flag: {
    position: "relative",
    display: "inline-flex",
    alignItems: "flex-end",
    justifyContent: "center",
    flexShrink: 0,
    width: 20,
    height: 18,
    verticalAlign: "-3px",
  },
  triangle: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
  number: {
    position: "relative",
    paddingBottom: 2,
    fontFamily: face.latin,
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 1,
    fontVariantNumeric: "tabular-nums",
    color: tone.navy,
  },
});

export function FlagNote({ number }: { number: number }) {
  return (
    <span {...stylex.props(styles.flag)}>
      <svg viewBox="0 0 20 18" aria-hidden="true" {...stylex.props(styles.triangle)}>
        <path
          d="M10 0.8 L19.2 17.2 H0.8 Z"
          fill="#ffffff"
          stroke="rgba(11, 42, 92, 0.88)"
          strokeWidth={1}
          strokeLinejoin="round"
        />
      </svg>
      <span {...stylex.props(styles.number)}>{number}</span>
    </span>
  );
}
