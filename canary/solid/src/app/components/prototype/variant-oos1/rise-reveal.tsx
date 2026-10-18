import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { m } from "../../../../compat/motion";
import type { JSX } from "@solidjs/web";

import { useReducedMotion } from "../use-reduced-motion";

const RISE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type RiseProps = {
  children: JSX.Element;
  sx?: StyleXStyles;
  style?: StyleXStyles;
  delay?: number;
};

export function RiseReveal(props: RiseProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      {...stylex.attrs(props.sx, props.style)}
      initial={{ opacity: 0, transform: "translateY(16px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: reduce() ? 0.2 : 0.45,
        delay: reduce() ? 0 : (props.delay ?? 0),
        ease: RISE_EASE,
      }}
    >
      {props.children}
    </m.div>
  );
}
