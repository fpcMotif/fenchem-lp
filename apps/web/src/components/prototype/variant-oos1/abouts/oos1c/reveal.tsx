import * as stylex from "@stylexjs/stylex";
import { useInView } from "@/compat/motion";
import { dynamic as dynamicTag, type JSX } from "@solidjs/web";

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

export function Reveal(props: {
  children: JSX.Element;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li";
}) {
  const Tag = dynamicTag(() => props.as ?? "div");
  let ref: HTMLElement | undefined;
  const shown = useInView(() => ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Tag
      ref={(el: HTMLElement) => (ref = el)}
      {...stylex.attrs(
        styles.reveal,
        shown() && styles.shown,
        dyn.delay(Math.min(props.step ?? 0, MAX_STEPS) * STEP_MS),
        props.sx,
      )}
    >
      {props.children}
    </Tag>
  );
}
