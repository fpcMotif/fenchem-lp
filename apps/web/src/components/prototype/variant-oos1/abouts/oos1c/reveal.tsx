import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";

import { ease, mq } from "./tokens.stylex";

const STEP_MS = 80;
const MAX_STEPS = 3;

const styles = stylex.create({
  reveal: {
    opacity: { default: 0, [mq.stack]: 1 },
    transform: { default: null, [mq.track]: "translateY(20px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: { default: "800ms", [mq.stack]: "0ms" },
    transitionTimingFunction: ease.out,
  },
  shown: {
    opacity: 1,
    transform: "none",
  },
});

const dyn = stylex.create({
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
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Tag
      ref={ref}
      {...stylex.props(
        styles.reveal,
        shown && styles.shown,
        dyn.delay(Math.min(step, MAX_STEPS) * STEP_MS),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}
