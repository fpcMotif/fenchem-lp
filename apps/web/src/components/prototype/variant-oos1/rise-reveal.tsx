import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { m } from "motion/react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

const RISE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type RiseProps = {
  children: ReactNode;
  sx?: StyleXStyles;
  style?: StyleXStyles;
  delay?: number;
};

export function RiseReveal({ children, sx, style, delay = 0 }: RiseProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      {...stylex.props(sx, style)}
      initial={{ opacity: 0, transform: "translateY(16px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.45, delay: reduce ? 0 : delay, ease: RISE_EASE }}
    >
      {children}
    </m.div>
  );
}
