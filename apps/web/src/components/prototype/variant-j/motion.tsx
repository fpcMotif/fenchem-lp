import { useGSAP } from "@gsap/react";
import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { createContext, use, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

/*
 * PROTOTYPE — Variant I motion core ("germination" system).
 * One smooth-scroll engine (Lenis) driven by gsap.ticker and wired to
 * ScrollTrigger; everything is bypassed under prefers-reduced-motion, where
 * content renders in its final state on native scroll. Sections express
 * entrances exclusively through the helpers below so the whole page shares
 * one motion voice. SSR markup stays fully visible — initial hidden states
 * only ever come from gsap.from() at runtime.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const ReducedMotionContext = createContext(false);

export function useReducedMotionFlag(): boolean {
  return use(ReducedMotionContext);
}

/** Page root: owns the sole Lenis instance and the ScrollTrigger wiring. */
export function MotionRoot({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: false });
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return <ReducedMotionContext.Provider value={reduced}>{children}</ReducedMotionContext.Provider>;
}

/**
 * Section animation hook. `build` runs once on mount inside a gsap context
 * scoped to the returned ref (selectors in helpers resolve within the
 * section; everything reverts automatically on unmount). Skipped entirely
 * under reduced motion — the SSR markup already shows the final state.
 */
export function useSectionAnimation<T extends HTMLElement = HTMLElement>(
  build: (root: T) => void,
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reduced = useReducedMotionFlag();
  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      build(ref.current);
    },
    /* revertOnUpdate: the reduce flag settles one render after hydration, so
     * the tweens a non-reduce first pass created must revert when it flips. */
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );
  return ref;
}

/* ── Accessible word splitting ─────────────────────────────────────────── */

const styles = stylex.create({
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  word: {
    display: "inline-block",
    overflow: "hidden",
    paddingBottom: "0.08em",
    marginBottom: "-0.08em",
    verticalAlign: "baseline",
  },
  wordInner: {
    display: "inline-block",
    willChange: "transform",
  },
});

export type Segment = {
  text: string;
  /** Extra StyleX styles for this segment's words (e.g. italic accent). */
  sx?: StyleXStyles;
};

/**
 * Splits text into per-word spans for staggered reveals while keeping an
 * unsplit accessible name: the original string stays in an sr-only span and
 * the visual words are aria-hidden. Never wrap links or interactive content.
 * Under no-JS the split words are simply visible in place.
 */
export function SplitWords({ segments, sx }: { segments: Segment[]; sx?: StyleXStyles }) {
  const plain = segments.map((segment) => segment.text).join(" ");
  return (
    <span {...stylex.props(sx)}>
      <span {...stylex.props(styles.srOnly)}>{plain}</span>
      <span aria-hidden="true">
        {segments.map((segment, segmentIndex) =>
          segment.text.split(/\s+/).map((word, wordIndex) => (
            <span
              // eslint-disable-next-line react/no-array-index-key -- static content, order never changes
              key={`${segmentIndex}-${wordIndex}`}
              data-word
              {...stylex.props(styles.word)}
            >
              <span data-word-inner {...stylex.props(styles.wordInner, segment.sx)}>
                {word}
                {"\u00A0"}
              </span>
            </span>
          )),
        )}
      </span>
    </span>
  );
}
