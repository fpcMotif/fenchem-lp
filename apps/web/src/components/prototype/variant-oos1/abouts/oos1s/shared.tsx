import * as stylex from "@stylexjs/stylex";
import { dynamic as dynamicTag, type JSX } from "@solidjs/web";
import { createEffect, createSignal, merge } from "solid-js";
import { useInView } from "@/compat/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {} from "./tokens.stylex";
import { ui } from "./shared-values";

const REVEAL_STEP_MS = 90;
const REVEAL_MAX_STEPS = 4;

const revealDelay = (index: number) => Math.min(index, REVEAL_MAX_STEPS) * REVEAL_STEP_MS;

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function Reveal(props: {
  children: JSX.Element;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const p = merge({ step: 0, as: "div" }, props);
  const Tag = dynamicTag(() => p.as);
  let ref: (HTMLDivElement & HTMLLIElement) | undefined;
  const reduce = useReducedMotion();
  const [armed, setArmed] = createSignal(false);
  const seen = useInView(() => ref, { once: true, margin: "0px 0px -8% 0px" });

  createEffect(
    () => reduce(),
    (reduced) => {
      const box = ref?.getBoundingClientRect();
      if (!reduced && box && box.top > window.innerHeight) setArmed(true);
    },
  );

  return (
    <Tag
      ref={ref}
      {...stylex.attrs(
        ui.reveal,
        armed() && !seen() && !reduce() && ui.revealHidden,
        dynamic.delay(revealDelay(p.step)),
        p.sx,
      )}
    >
      {p.children}
    </Tag>
  );
}

export function Section(props: {
  id: string;
  label: string;
  background: stylex.StyleXStyles;
  sx?: stylex.StyleXStyles;
  children: JSX.Element;
}) {
  const nameId = `${props.id}-name`;
  return (
    <section
      id={props.id}
      aria-labelledby={nameId}
      {...stylex.attrs(ui.section, props.background, props.sx)}
    >
      <h2 id={nameId} {...stylex.attrs(ui.srOnly)}>
        {props.label}
      </h2>
      <div {...stylex.attrs(ui.shell, ui.inset)}>{props.children}</div>
    </section>
  );
}
