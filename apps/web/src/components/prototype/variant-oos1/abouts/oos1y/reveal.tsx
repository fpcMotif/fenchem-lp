import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { useEffect, useRef, useState, type ReactNode } from "react";

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
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<Phase>("rest");
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduce) return;
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
  }, [reduce]);

  return [ref, phase] as const;
}

export function Reveal({
  children,
  sx,
  delay = 0,
}: {
  children: ReactNode;
  sx?: StyleXStyles;
  delay?: number;
}) {
  const [ref, phase] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      {...stylex.props(
        styles.base,
        phase === "hidden" && styles.hidden,
        phase === "shown" && styles.shown,
        delay > 0 && styles.delay(delay),
        sx,
      )}
    >
      {children}
    </div>
  );
}
