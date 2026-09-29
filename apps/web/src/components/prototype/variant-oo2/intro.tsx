import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useEffect, useState } from "react";

export const INTRO_REVEAL_MS = 500;

const REVEAL_EASE = "cubic-bezier(0.77, 0, 0.175, 1)";

const circleReveal = stylex.keyframes({
  "0%": { clipPath: "circle(0px at 50% 50vh)" },
  "100%": { clipPath: "circle(120vmax at 50% 50vh)" },
});

const styles = stylex.create({
  pageReveal: {
    animationName: { default: circleReveal, [breakpoints.motionReduce]: "none" },
    animationDuration: "1100ms",
    animationDelay: "200ms",
    animationTimingFunction: REVEAL_EASE,
    animationFillMode: "backwards",
  },
});

export const introStyles = { pageReveal: styles.pageReveal };

export type IntroState = "play" | "skip";

export function useIntro(): IntroState {
  const [state, setState] = useState<IntroState>("play");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("skip");
      return;
    }
    const skip = () => setState("skip");
    const events = ["keydown", "pointerdown", "wheel", "touchmove"] as const;
    const finished = window.setTimeout(() => {
      for (const name of events) window.removeEventListener(name, skip);
    }, INTRO_REVEAL_MS + 1100);
    for (const name of events) window.addEventListener(name, skip, { once: true, passive: true });
    return () => {
      window.clearTimeout(finished);
      for (const name of events) window.removeEventListener(name, skip);
    };
  }, []);
  return state;
}
