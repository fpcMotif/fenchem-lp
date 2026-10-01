import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";

import { layout } from "./theme.stylex";

const STEP_MS = 80;
const MAX_STEPS = 4;

const styles = stylex.create({
  rise: {
    opacity: { default: 0, [breakpoints.motionReduce]: 1 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(24px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: layout.easeOut,
  },
  shown: {
    opacity: 1,
    transform: "none",
  },
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
        styles.rise,
        shown && styles.shown,
        styles.delay(Math.min(step, MAX_STEPS) * STEP_MS),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}
