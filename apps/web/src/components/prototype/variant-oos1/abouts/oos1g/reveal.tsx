import * as stylex from "@stylexjs/stylex";
import { animate, motionValue, useInView } from "@/compat/motion";
import { createEffect } from "solid-js";
import { dynamic as dynamicTag, type JSX } from "@solidjs/web";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { layout } from "./layout";
import { palette } from "./palette.stylex";

const REVEAL_STEP_MS = 90;
const REVEAL_MAX_STEPS = 4;
const COUNT_UP_SECONDS = 1.4;

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

const styles = stylex.create({
  hidden: {
    opacity: { default: 0, ["@media (prefers-reduced-motion: reduce)"]: 1 },
    transform: {
      default: null,
      ["@media (prefers-reduced-motion: no-preference)"]: "translateY(20px)",
    },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: palette.easeOut,
  },
  shown: {
    opacity: 1,
    transform: "none",
  },
  count: {
    fontVariantNumeric: "tabular-nums",
  },
});

export function Reveal(props: {
  children: JSX.Element;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure";
}) {
  const Tag = dynamicTag(() => props.as ?? "div");
  let ref: HTMLElement | undefined;
  const shown = useInView(() => ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <Tag
      ref={(el: HTMLElement) => (ref = el)}
      {...stylex.attrs(
        styles.hidden,
        shown() && styles.shown,
        dynamic.delay(Math.min(props.step ?? 0, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
        props.sx,
      )}
    >
      {props.children}
    </Tag>
  );
}

export function CountUp(props: { value: string }) {
  const target = () => Number(props.value.replaceAll(",", ""));
  let ref: HTMLSpanElement | undefined;
  const inView = useInView(() => ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();

  createEffect(
    () => [inView(), reduce(), target(), props.value] as const,
    ([inViewNow, reduceNow, targetNow, value]) => {
      const node = ref;
      if (!node) return;
      if (reduceNow) {
        node.textContent = value;
        return;
      }
      if (!inViewNow) {
        node.textContent = "0";
        return;
      }
      const controls = animate(motionValue(0), targetNow, {
        duration: COUNT_UP_SECONDS,
        ease: EASE,
        onUpdate: (latest: number) => {
          node.textContent = Math.round(latest).toLocaleString("en-US");
        },
        onComplete: () => {
          node.textContent = value;
        },
      });
      return () => controls.stop();
    },
  );

  return (
    <>
      <span ref={ref} aria-hidden="true" {...stylex.attrs(styles.count)}>
        {props.value}
      </span>
      <span {...stylex.attrs(layout.srOnly)}>{props.value}</span>
    </>
  );
}
