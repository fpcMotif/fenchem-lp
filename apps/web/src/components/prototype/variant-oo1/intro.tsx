import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import * as stylex from "@stylexjs/stylex";
import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { styles } from "./intro-values";

export const INTRO_REVEAL_MS = 500;

const FLIGHT_START_MS = 1100;
const FLIGHT_SECONDS = 1.35;
const IMPACT_AT = 0.7;

export type IntroState = "play" | "skip";

export function useIntro(): IntroState {
  const reduce = useReducedMotion();
  const [state, setState] = useState<IntroState>("play");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
  return reduce ? "skip" : state;
}

export function IntroOverlay({
  onImpact,
  onLanded,
}: {
  onImpact: () => void;
  onLanded: () => void;
}) {
  const dotRef = useRef<HTMLSpanElement>(null);
  const impactRef = useRef(onImpact);
  const landedRef = useRef(onLanded);
  useEffect(() => {
    impactRef.current = onImpact;
    landedRef.current = onLanded;
  }, [onImpact, onLanded]);

  useEffect(() => {
    let stop = () => {};
    let impactTimer = 0;
    const timer = window.setTimeout(() => {
      const dot = dotRef.current;
      const period = document.querySelector("[data-hero-period]");
      if (!dot || !period) {
        impactRef.current();
        landedRef.current();
        return;
      }
      impactTimer = window.setTimeout(() => impactRef.current(), FLIGHT_SECONDS * IMPACT_AT * 1000);
      const from = dot.getBoundingClientRect();
      const to = period.getBoundingClientRect();
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      const size = to.width / from.width;
      const peak = Math.min(dy, 0) - 150;
      const controls = animate(
        dot,
        {
          x: [0, -dx * 0.04, dx * 0.55, dx, dx, dx, dx],
          y: [0, -28, peak, dy, dy + 1.5, dy - 13, dy],
          scaleX: [1, 0.8, 0.74, size * 1.4, size * 1.4, size * 0.9, size],
          scaleY: [1, 0.8, 0.74, size * 0.6, size * 0.6, size * 1.1, size],
        },
        {
          duration: FLIGHT_SECONDS,
          times: [0, 0.16, 0.48, IMPACT_AT, 0.75, 0.86, 1],
          ease: ["easeOut", "easeInOut", "easeIn", "linear", "easeOut", "easeIn"],
        },
      );
      stop = () => controls.stop();
      void controls.then(() => {
        dot.style.opacity = "0";
        landedRef.current();
      });
    }, FLIGHT_START_MS);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(impactTimer);
      stop();
    };
  }, []);

  return (
    <div aria-hidden="true" {...stylex.props(styles.overlay)}>
      <span ref={dotRef} {...stylex.props(styles.dot)} />
    </div>
  );
}
