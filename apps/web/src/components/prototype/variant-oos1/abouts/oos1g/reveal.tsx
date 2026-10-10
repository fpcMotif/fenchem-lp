import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { animate, useInView } from "motion/react";
import { type ReactNode, useLayoutEffect, useRef } from "react";

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
    opacity: { default: 0, [breakpoints.motionReduce]: 1 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(20px)" },
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

export function Reveal({
  children,
  step = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <Tag
      ref={ref}
      {...stylex.props(
        styles.hidden,
        shown && styles.shown,
        dynamic.delay(Math.min(step, REVEAL_MAX_STEPS) * REVEAL_STEP_MS),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}

export function CountUp({ value }: { value: string }) {
  const target = Number(value.replaceAll(",", ""));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) {
      node.textContent = value;
      return;
    }
    if (!inView) {
      node.textContent = "0";
      return;
    }
    const controls = animate(0, target, {
      duration: COUNT_UP_SECONDS,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toLocaleString("en-US");
      },
      onComplete: () => {
        node.textContent = value;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, target, value]);

  return (
    <>
      <span ref={ref} aria-hidden="true" {...stylex.props(styles.count)}>
        {value}
      </span>
      <span {...stylex.props(layout.srOnly)}>{value}</span>
    </>
  );
}
