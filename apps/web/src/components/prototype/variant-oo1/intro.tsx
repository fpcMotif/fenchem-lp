import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { animate } from "motion/react";
import { useEffect, useRef } from "react";

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const dotPop = stylex.keyframes({
  "0%": { scale: "0" },
  "60%": { scale: "1.15" },
  "100%": { scale: "1" },
});

const FLIGHT_START_MS = 1100;
const FLIGHT_SECONDS = 1.35;
const IMPACT_AT = 0.7;

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 60,
    display: { default: "block", [breakpoints.motionReduce]: "none" },
    pointerEvents: "none",
  },
  dot: {
    position: "absolute",
    top: "calc(50vh - 7px)",
    left: "calc(50% - 7px)",
    width: 14,
    height: 14,
    borderRadius: "50%",
    backgroundColor: colors.brandBlue700,
    animationName: dotPop,
    animationDuration: "500ms",
    animationDelay: "100ms",
    animationTimingFunction: EASE_OUT,
    animationFillMode: "both",
  },
});

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
