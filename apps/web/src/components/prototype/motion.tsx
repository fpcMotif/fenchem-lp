import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { EASE } from "./motion-constants";

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

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. Ignored under reduced motion. */
  delay?: number;
  /** Entrance travel in px. Ignored under reduced motion. */
  y?: number;
  /** Transition duration in seconds. */
  duration?: number;
  /** Viewport root margin controlling when the reveal fires. */
  margin?: string;
};

/** Scroll-triggered reveal for below-the-fold content. Fires once. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  duration = 0.8,
  margin = "-80px",
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

type IntroProps = {
  children: ReactNode;
  className?: string;
  /** Entrance delay in seconds. Ignored under reduced motion. */
  delay?: number;
  /** Entrance travel in px. Ignored under reduced motion. */
  y?: number;
};

/** Mount-time entrance for above-the-fold hero content. */
export function Intro({ children, className, delay = 0, y = 28 }: IntroProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** Tailwind text-color utility for the label tint. */
  accent?: string;
};

/** Static uppercase micro-label above a section heading. */
export function Eyebrow({
  children,
  className = "",
  accent = "text-brand-green-600",
}: EyebrowProps) {
  return (
    <p
      className={`font-tech text-[11px] uppercase tracking-[0.35em] ${accent} md:text-xs ${className}`}
    >
      {children}
    </p>
  );
}
