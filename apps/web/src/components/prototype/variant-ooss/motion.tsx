import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { m, useInView, useScroll, type MotionValue } from "@/compat/motion";
import { createMediaQuery } from "@/compat/reduced-motion";
import { merge, type Accessor } from "solid-js";
import type { JSX } from "@solidjs/web";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { ease, media } from "./tokens.stylex";
import { EASE_OUT, staggerMs } from "./motion-values";

export const REVEAL_MARGIN = "0px 0px 0px 0px";

const REVEAL_SECONDS = 0.6;
const MASK_SECONDS = 0.7;
const REVEAL_RISE_PX = 16;
const MASK_HIDDEN = "120%";

const PIN_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

export function usePinEnabled(): Accessor<boolean> {
  return createMediaQuery(PIN_QUERY);
}

export function usePinProgress(target: Accessor<HTMLElement | undefined>): MotionValue<number> {
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
  children: JSX.Element;
  sx?: StyleXStyles;
  as?: keyof typeof REVEAL_TAGS;
  index?: number;
  delay?: number;
};

export function Reveal(props: RevealProps) {
  const p = merge({ as: "div" as const, index: 0, delay: 0 }, props);
  const reduce = useReducedMotion();
  const Tag = REVEAL_TAGS[p.as] as typeof m.div;
  return (
    <Tag
      {...stylex.attrs(p.sx)}
      initial={{ opacity: 0, y: REVEAL_RISE_PX }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: REVEAL_MARGIN }}
      transition={{
        duration: reduce() ? 0 : REVEAL_SECONDS,
        delay: reduce() ? 0 : (p.delay + staggerMs(p.index)) / 1000,
        ease: EASE_OUT,
      }}
    >
      {p.children}
    </Tag>
  );
}

type MaskLineProps = {
  children: JSX.Element;
  sx?: StyleXStyles;
  when?: "view" | "load";
  start?: boolean;
  index?: number;
  delay?: number;
  duration?: number;
};

export function MaskLine(props: MaskLineProps) {
  const p = merge(
    { when: "view" as const, start: true, index: 0, delay: 0, duration: MASK_SECONDS * 1000 },
    props,
  );
  const reduce = useReducedMotion();
  let el: HTMLSpanElement | undefined;
  const seen = useInView(() => el, { once: true, margin: REVEAL_MARGIN });
  if (p.when === "load") {
    return (
      <span {...stylex.attrs(styles.maskLine, p.sx)}>
        <span
          {...stylex.attrs(
            styles.maskInner,
            p.start ? styles.maskLoad : styles.maskLoadWaiting,
            p.start && styles.maskLoadAt(p.delay + staggerMs(p.index), p.duration),
          )}
        >
          {p.children}
        </span>
      </span>
    );
  }
  return (
    <span ref={el} {...stylex.attrs(styles.maskLine, p.sx)}>
      <m.span
        {...stylex.attrs(styles.maskInner)}
        initial={{ y: MASK_HIDDEN }}
        animate={{ y: seen() ? "0%" : MASK_HIDDEN }}
        transition={{
          duration: reduce() ? 0 : p.duration / 1000,
          delay: reduce() ? 0 : (p.delay + staggerMs(p.index)) / 1000,
          ease: EASE_OUT,
        }}
      >
        {p.children}
      </m.span>
    </span>
  );
}

type LoadFadeProps = {
  children: JSX.Element;
  sx?: StyleXStyles;
  as?: "div" | "p";
  start?: boolean;
  delay?: number;
  duration?: number;
};

export function LoadFade(props: LoadFadeProps) {
  const p = merge(
    { as: "div" as const, start: true, delay: 0, duration: REVEAL_SECONDS * 1000 },
    props,
  );
  return p.as === "p" ? (
    <p
      {...stylex.attrs(
        p.start ? styles.loadFade : styles.loadFadeWaiting,
        p.start && styles.loadFadeAt(p.delay, p.duration),
        p.sx,
      )}
    >
      {p.children}
    </p>
  ) : (
    <div
      {...stylex.attrs(
        p.start ? styles.loadFade : styles.loadFadeWaiting,
        p.start && styles.loadFadeAt(p.delay, p.duration),
        p.sx,
      )}
    >
      {p.children}
    </div>
  );
}
