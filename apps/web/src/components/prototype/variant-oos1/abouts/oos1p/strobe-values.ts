import * as stylex from "@stylexjs/stylex";

const EXPOSURES_PER_SECOND = 12;

export const TICK = Math.round(1000 / EXPOSURES_PER_SECOND);

const TRAIL_RAMP_CURVE = 1.3;

export function trailOpacity(k: number, count: number, brightest: number) {
  return brightest * (1 - (k - 1) / count) ** TRAIL_RAMP_CURVE;
}

export function echoIndexes(count: number) {
  return Array.from({ length: count }, (_, index) => index + 1);
}

export const pop = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const flash = stylex.keyframes({
  "0%": { opacity: 0 },
  "0.5%": { opacity: 1 },
  "99.5%": { opacity: 1 },
  "100%": { opacity: 0 },
});

export const strobe = stylex.create({
  hidden: { opacity: 0 },
  pop: {
    animationName: pop,
    animationDuration: "1ms",
    animationDelay: "var(--pop-at)",
    animationFillMode: "both",
  },
  flash: {
    animationName: flash,
    animationDuration: "var(--flash-len)",
    animationDelay: "var(--flash-at)",
    animationTimingFunction: "linear",
    animationFillMode: "both",
  },
});
