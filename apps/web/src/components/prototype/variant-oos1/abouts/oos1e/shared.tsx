import * as stylex from "@stylexjs/stylex";
import { useInView } from "@/compat/motion";
import { dynamic as dynamicTag, type JSX } from "@solidjs/web";
import { base } from "./shared-values";

const REVEAL_STEP_MS = 70;
const REVEAL_MAX_STEPS = 4;

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function Reveal(props: {
  children: JSX.Element;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const Tag = dynamicTag(() => props.as ?? "div");
  let ref: HTMLElement | undefined;
  const shown = useInView(() => ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <Tag
      ref={(el: HTMLElement) => (ref = el)}
      {...stylex.attrs(
        base.reveal,
        shown() && base.revealShown,
        dynamic.delay(Math.min(props.step ?? 0, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
        props.sx,
      )}
    >
      {props.children}
    </Tag>
  );
}
