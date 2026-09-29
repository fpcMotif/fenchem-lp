import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { m, useInView, useScroll, type MotionValue } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode, type RefObject } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ease, media } from "./tokens.stylex";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const REVEAL_MARGIN = "0px 0px 0px 0px";
const STAGGER_MS = 60;
const MAX_STAGGER_INDEX = 3;

const REVEAL_SECONDS = 0.6;
const MASK_SECONDS = 0.7;
const REVEAL_RISE_PX = 16;
const MASK_HIDDEN = "120%";

export const staggerMs = (index: number) => Math.min(index, MAX_STAGGER_INDEX) * STAGGER_MS;

const PIN_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function subscribePin(onChange: () => void) {
  const query = window.matchMedia(PIN_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function usePinEnabled(): boolean {
  return useSyncExternalStore(
    subscribePin,
    () => window.matchMedia(PIN_QUERY).matches,
    () => false,
  );
}

export function usePinProgress(target: RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  return scrollYProgress;
}

const maskRise = stylex.keyframes({
  "0%": { transform: "translateY(120%)" },
  "100%": { transform: "translateY(0%)" },
});

const fadeRise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "translateY(0px)" },
});

const styles = stylex.create({
  maskLine: {
    display: "block",
    overflow: "hidden",
    paddingBottom: "0.14em",
    marginBottom: "-0.14em",
  },
  maskInner: {
    display: "block",
  },
  maskLoadWaiting: {
    transform: { default: "translateY(120%)", [media.motionReduce]: "none" },
  },
  maskLoad: {
    animationName: { default: maskRise, [media.motionReduce]: "none" },
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  maskLoadAt: (delayMs: number, durationMs: number) => ({
    animationDelay: `${delayMs}ms`,
    animationDuration: `${durationMs}ms`,
  }),
  loadFadeWaiting: {
    opacity: { default: 0, [media.motionReduce]: 1 },
  },
  loadFade: {
    animationName: { default: fadeRise, [media.motionReduce]: "none" },
    animationTimingFunction: ease.out,
    animationFillMode: "both",
  },
  loadFadeAt: (delayMs: number, durationMs: number) => ({
    animationDelay: `${delayMs}ms`,
    animationDuration: `${durationMs}ms`,
  }),
});

const REVEAL_TAGS = { div: m.div, li: m.li, article: m.article, p: m.p } as const;

type RevealProps = {
  children: ReactNode;
  sx?: StyleXStyles;
  as?: keyof typeof REVEAL_TAGS;
  index?: number;
  delay?: number;
};

export function Reveal({ children, sx, as = "div", index = 0, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = REVEAL_TAGS[as] as typeof m.div;
  return (
    <Tag
      {...stylex.props(sx)}
      initial={{ opacity: 0, y: REVEAL_RISE_PX }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: REVEAL_MARGIN }}
      transition={{
        duration: reduce ? 0 : REVEAL_SECONDS,
        delay: reduce ? 0 : (delay + staggerMs(index)) / 1000,
        ease: EASE_OUT,
      }}
    >
      {children}
    </Tag>
  );
}

type MaskLineProps = {
  children: ReactNode;
  sx?: StyleXStyles;
  when?: "view" | "load";
  start?: boolean;
  index?: number;
  delay?: number;
  duration?: number;
};

export function MaskLine({
  children,
  sx,
  when = "view",
  start = true,
  index = 0,
  delay = 0,
  duration = MASK_SECONDS * 1000,
}: MaskLineProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: REVEAL_MARGIN });
  if (when === "load") {
    return (
      <span {...stylex.props(styles.maskLine, sx)}>
        <span
          {...stylex.props(
            styles.maskInner,
            start ? styles.maskLoad : styles.maskLoadWaiting,
            start && styles.maskLoadAt(delay + staggerMs(index), duration),
          )}
        >
          {children}
        </span>
      </span>
    );
  }
  return (
    <span ref={ref} {...stylex.props(styles.maskLine, sx)}>
      <m.span
        {...stylex.props(styles.maskInner)}
        initial={{ y: MASK_HIDDEN }}
        animate={{ y: seen ? "0%" : MASK_HIDDEN }}
        transition={{
          duration: reduce ? 0 : duration / 1000,
          delay: reduce ? 0 : (delay + staggerMs(index)) / 1000,
          ease: EASE_OUT,
        }}
      >
        {children}
      </m.span>
    </span>
  );
}

type LoadFadeProps = {
  children: ReactNode;
  sx?: StyleXStyles;
  as?: "div" | "p";
  start?: boolean;
  delay?: number;
  duration?: number;
};

export function LoadFade({
  children,
  sx,
  as = "div",
  start = true,
  delay = 0,
  duration = REVEAL_SECONDS * 1000,
}: LoadFadeProps) {
  const props = stylex.props(
    start ? styles.loadFade : styles.loadFadeWaiting,
    start && styles.loadFadeAt(delay, duration),
    sx,
  );
  return as === "p" ? <p {...props}>{children}</p> : <div {...props}>{children}</div>;
}
