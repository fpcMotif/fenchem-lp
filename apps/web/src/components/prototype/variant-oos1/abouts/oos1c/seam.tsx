import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { mq, tone } from "./tokens.stylex";

const DASH_COLUMN = `repeating-linear-gradient(to bottom, ${tone.seam} 0, ${tone.seam} 6px, transparent 6px, transparent 11px)`;
const DASH_ROW = `repeating-linear-gradient(to right, ${tone.seam} 0, ${tone.seam} 6px, transparent 6px, transparent 11px)`;

const styles = stylex.create({
  seam: {
    position: "relative",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: { default: "100%", [mq.snap]: 28, [mq.pin]: 48 },
    height: { default: 40, [mq.snap]: "auto", [mq.pin]: "100%" },
    alignSelf: { default: "auto", [mq.track]: "stretch" },
  },
  thread: {
    position: "absolute",
    top: { default: "50%", [mq.track]: 0 },
    left: { default: 0, [mq.track]: "50%" },
    width: { default: "100%", [mq.track]: 1 },
    height: { default: 1, [mq.track]: "100%" },
    translate: { default: "0 -50%", [mq.track]: "-50% 0" },
    backgroundImage: { default: DASH_ROW, [mq.track]: DASH_COLUMN },
  },
  knot: {
    position: "relative",
    display: "flex",
    paddingBlock: { default: 0, [mq.track]: 14 },
    paddingInline: { default: 14, [mq.track]: 0 },
    backgroundColor: colors.paper,
    color: tone.ink,
  },
});

export function Cross({ size = 8 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 8 8" fill="none">
      <path d="M1 1 7 7M7 1 1 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function Seam() {
  return (
    <div aria-hidden="true" {...stylex.props(styles.seam)}>
      <span {...stylex.props(styles.thread)} />
      <span {...stylex.props(styles.knot)}>
        <Cross />
      </span>
    </div>
  );
}
