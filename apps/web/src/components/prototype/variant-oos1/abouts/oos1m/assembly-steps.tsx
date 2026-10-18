import * as stylex from "@stylexjs/stylex";
import { m, useTransform, type MotionValue } from "@/compat/motion";

import { span } from "./iso-values";
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

function Step(props: { progress: MotionValue<number>; index: number }) {
  const step = STEPS[props.index];
  const opacity = useTransform(props.progress, (value) => {
    const [start, end] = step.window;
    const inside = span(value, start - 0.04, start) * (1 - span(value, end, end + 0.04));
    return 0.32 + inside * 0.68;
  });
  return (
    <m.li style={{ opacity }} {...stylex.attrs(styles.step)}>
      <span {...stylex.attrs(styles.number)}>{props.index + 1}</span>
      <span {...stylex.attrs(styles.mark, step.mark === "δ" && styles.delta)}>{step.mark}</span>
      <span lang="en" {...stylex.attrs(styles.text)}>
        {step.text}
      </span>
    </m.li>
  );
}

export function AssemblySteps(props: { progress: MotionValue<number> }) {
  return (
    <div aria-hidden="true" {...stylex.attrs(styles.root)}>
      <p lang="en" {...stylex.attrs(ui.caps, styles.caption)}>
        Assembly sequence
      </p>
      <ol {...stylex.attrs(styles.list)}>
        {STEPS.map((_, index) => (
          <Step progress={props.progress} index={index} />
        ))}
      </ol>
    </div>
  );
}
