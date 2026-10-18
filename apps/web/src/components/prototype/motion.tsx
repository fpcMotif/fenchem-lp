import { breakpoints, colors, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { m } from "@/compat/motion";
import type { JSX } from "@solidjs/web";

import { EASE } from "./motion-constants";
import { useReducedMotion } from "./use-reduced-motion";

/*
 * Shared motion primitives for the Fenchem landing prototypes.
 *
 * One source of truth for the scroll-reveal feel, the entrance easing curve,
 * and reduced-motion handling — previously re-typed in all seven variant files
 * (`Reveal` ×7, `Intro` ×2, `Eyebrow` ×2, plus seven byte-identical `EASE`
 * declarations and 31 scattered `useReducedMotion` calls).
 *
 * Built on motion's tree-shakeable `m` component, so every consumer must render
 * inside a `<LazyMotion features={domAnimation} strict>` provider — all seven
 * variants do.
 *
 * `prefers-reduced-motion` is honoured here, once and centrally: under reduce we
 * drop the translate, zero the duration and delay, and only settle opacity.
 */

const styles = stylex.create({
  eyebrow: {
    fontFamily: typography.tech,
    fontSize: {
      default: "11px",
      [breakpoints.md]: "12px",
    },
    lineHeight: 1.5,
    textTransform: "uppercase",
    letterSpacing: "0.35em",
    color: colors.brandGreen600,
  },
  accent_forest: { color: colors.forest },
  accent_moss: { color: colors.moss },
  accent_fern: { color: colors.fern },
  accent_brandGreen600: { color: colors.brandGreen600 },
  accent_brandGreen700: { color: colors.brandGreen700 },
  accent_brandGreen400: { color: colors.brandGreen400 },
  accent_brandBlue700: { color: colors.brandBlue700 },
  accent_mute600: { color: colors.mute600 },
  accent_mint: { color: colors.mint },
});

const accentMap: Record<string, StyleXStyles> = {
  "text-moss": styles.accent_moss,
  "text-forest": styles.accent_forest,
  "text-fern": styles.accent_fern,
  "text-brand-green-600": styles.accent_brandGreen600,
  "text-brand-green-700": styles.accent_brandGreen700,
  "text-brand-green-400": styles.accent_brandGreen400,
  "text-brand-blue-700": styles.accent_brandBlue700,
  "text-mute-600": styles.accent_mute600,
  "text-mint": styles.accent_mint,
};

type RevealProps = {
  children: JSX.Element;
  sx?: StyleXStyles;
  style?: StyleXStyles;
  /** Entrance delay in seconds. Ignored under reduced motion. */
  delay?: number;
  /** Entrance travel in px. Ignored under reduced motion. */
  y?: number;
  /** Entrance duration in seconds. Ignored under reduced motion. */
  duration?: number;
  /** Root margin for triggering. Defaults to "-80px". */
  margin?: `${number}px` | `${number}%`;
  scale?: number;
};

/** Scroll-triggered reveal for below-the-fold content. Fires once. */
export function Reveal(props: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      {...stylex.attrs(props.sx, props.style)}
      initial={
        reduce() ? { opacity: 0 } : { opacity: 0, y: props.y ?? 32, scale: props.scale ?? 1 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: props.margin ?? "-80px" }}
      transition={{
        duration: reduce() ? 0 : (props.duration ?? 0.8),
        delay: reduce() ? 0 : (props.delay ?? 0),
        ease: EASE,
      }}
    >
      {props.children}
    </m.div>
  );
}

type IntroProps = {
  children: JSX.Element;
  sx?: StyleXStyles;
  style?: StyleXStyles;
  /** Entrance delay in seconds. Ignored under reduced motion. */
  delay?: number;
  /** Entrance travel in px. Ignored under reduced motion. */
  y?: number;
  scale?: number;
};

/** Mount-time entrance for above-the-fold hero content. */
export function Intro(props: IntroProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      {...stylex.attrs(props.sx, props.style)}
      initial={
        reduce() ? { opacity: 0 } : { opacity: 0, y: props.y ?? 28, scale: props.scale ?? 1 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reduce() ? 0 : 0.9,
        delay: reduce() ? 0 : (props.delay ?? 0),
        ease: EASE,
      }}
    >
      {props.children}
    </m.div>
  );
}

type EyebrowProps = {
  children: JSX.Element;
  sx?: StyleXStyles;
  style?: StyleXStyles;
  /** StyleX style or legacy accent string / token */
  accent?: StyleXStyles | keyof typeof accentMap;
};

/** Static uppercase micro-label above a section heading. */
export function Eyebrow(props: EyebrowProps) {
  const accentStyle = () => {
    const accent = props.accent ?? styles.accent_brandGreen600;
    return typeof accent === "string" ? accentMap[accent] : accent;
  };
  return (
    <p {...stylex.attrs(styles.eyebrow, accentStyle(), props.sx, props.style)}>{props.children}</p>
  );
}
