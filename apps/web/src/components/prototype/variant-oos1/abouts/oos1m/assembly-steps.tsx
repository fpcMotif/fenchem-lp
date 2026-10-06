import * as stylex from "@stylexjs/stylex";
import { m, useTransform, type MotionValue } from "motion/react";

import { span } from "./iso";
import { ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const STEPS = [
  { mark: "产 → 销", text: "Seat production on sales. Flush.", window: [0.02, 0.5] },
  { mark: "研 → 产", text: "Lower R&D onto production.", window: [0.16, 0.76] },
  { mark: "δ", text: "Stop short. Item 1 stays lifted.", window: [0.76, 1.01] },
] as const;

const styles = stylex.create({
  root: {
    display: { default: "none", [bp.pin]: "block" },
    maxWidth: 380,
    paddingBottom: "14svh",
  },
  caption: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.rule,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  step: {
    display: "grid",
    gridTemplateColumns: "28px 72px minmax(0, 1fr)",
    alignItems: "center",
    columnGap: 14,
    paddingBlock: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.rule,
  },
  number: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.line,
    fontFamily: face.latin,
    fontSize: 11,
    fontWeight: 500,
    color: tone.navy,
  },
  mark: {
    fontFamily: face.sans,
    fontSize: 16,
    fontWeight: 500,
    whiteSpace: "nowrap",
    color: tone.navy,
  },
  delta: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 22,
    fontWeight: 400,
    lineHeight: 1,
  },
  text: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: 17,
    lineHeight: 1.3,
    color: tone.ink,
  },
});

function Step({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const step = STEPS[index];
  const opacity = useTransform(progress, (value) => {
    const [start, end] = step.window;
    const inside = span(value, start - 0.04, start) * (1 - span(value, end, end + 0.04));
    return 0.32 + inside * 0.68;
  });
  return (
    <m.li style={{ opacity }} {...stylex.props(styles.step)}>
      <span {...stylex.props(styles.number)}>{index + 1}</span>
      <span {...stylex.props(styles.mark, step.mark === "δ" && styles.delta)}>{step.mark}</span>
      <span lang="en" {...stylex.props(styles.text)}>
        {step.text}
      </span>
    </m.li>
  );
}

export function AssemblySteps({ progress }: { progress: MotionValue<number> }) {
  return (
    <div aria-hidden="true" {...stylex.props(styles.root)}>
      <p lang="en" {...stylex.props(ui.caps, styles.caption)}>
        Assembly sequence
      </p>
      <ol {...stylex.props(styles.list)}>
        {STEPS.map((step, index) => (
          <Step key={step.mark} progress={progress} index={index} />
        ))}
      </ol>
    </div>
  );
}
