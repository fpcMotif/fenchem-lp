import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";
import { base } from "./shared-values";

const REVEAL_STEP_MS = 70;
const REVEAL_MAX_STEPS = 4;

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function Reveal({
  children,
  step = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Tag
      ref={ref}
      {...stylex.props(
        base.reveal,
        shown && base.revealShown,
        dynamic.delay(Math.min(step, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}
