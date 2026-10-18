import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
import { createEffect, createSignal, merge } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { bp, pane } from "./tokens.stylex";

type Phase = "rest" | "hidden" | "shown";

const styles = stylex.create({
  base: {
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: pane.ease,
  },
  hidden: {
    opacity: { default: 0, [bp.motionReduce]: 1 },
    transform: { default: "translateY(20px)", [bp.motionReduce]: "none" },
  },
  shown: {
    opacity: 1,
    transform: "none",
  },
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export function useReveal<T extends HTMLElement>() {
  const [ref, setRef] = createSignal<T>();
  const [phase, setPhase] = createSignal<Phase>("rest");
  const reduce = useReducedMotion();

  createEffect(
    () => [ref(), reduce()] as const,
    ([element, reduced]) => {
      if (!element || reduced) return;
      let first = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          const alreadyOnScreen = entry.boundingClientRect.top < window.innerHeight;
          if (first) {
            first = false;
            if (entry.isIntersecting || alreadyOnScreen) {
              observer.disconnect();
              return;
            }
            setPhase("hidden");
            return;
          }
          if (entry.isIntersecting) {
            setPhase("shown");
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      observer.observe(element);
      return () => observer.disconnect();
    },
  );

  return [setRef, phase] as const;
}

export function Reveal(props: { children: JSX.Element; sx?: StyleXStyles; delay?: number }) {
  const p = merge({ delay: 0 }, props);
  const [ref, phase] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      {...stylex.attrs(
        styles.base,
        phase() === "hidden" && styles.hidden,
        phase() === "shown" && styles.shown,
        p.delay > 0 && styles.delay(p.delay),
        p.sx,
      )}
    >
      {p.children}
    </div>
  );
}
