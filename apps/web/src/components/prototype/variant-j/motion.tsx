import type { StyleXStyles } from "@stylexjs/stylex";
import * as stylex from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { createContext, createEffect, createSignal, useContext, type Accessor } from "solid-js";
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
  gsap.registerPlugin(ScrollTrigger);
}

const ReducedMotionContext = createContext<Accessor<boolean>>(() => false);

export function useReducedMotionFlag(): Accessor<boolean> {
  return useContext(ReducedMotionContext);
}

/** Page root: owns the sole Lenis instance and the ScrollTrigger wiring. */
export function MotionRoot(props: { children: JSX.Element }) {
  const reduced = useReducedMotion();

  createEffect(reduced, (reduced) => {
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
  });

  return <ReducedMotionContext value={reduced}>{props.children}</ReducedMotionContext>;
}

/**
 * Section animation hook. `build` runs once on mount inside a gsap context
 * scoped to the returned ref (selectors in helpers resolve within the
 * section; everything reverts automatically on unmount). Skipped entirely
 * under reduced motion — the SSR markup already shows the final state.
 */
export function useSectionAnimation<T extends HTMLElement = HTMLElement>(
  build: (root: T) => void,
): (el: T) => void {
  const [root, setRoot] = createSignal<T>();
  const reduced = useReducedMotionFlag();
  createEffect(
    () => [reduced(), root()] as const,
    ([reduced, root]) => {
      if (reduced || !root) return;
      const ctx = gsap.context(() => build(root), root);
      /* revert on update: the reduce flag settles one render after hydration, so
       * the tweens a non-reduce first pass created must revert when it flips. */
      return () => ctx.revert();
    },
  );
  return setRoot;
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
export function SplitWords(props: { segments: Segment[]; sx?: StyleXStyles }) {
  const plain = props.segments.map((segment) => segment.text).join(" ");
  return (
    <span {...stylex.attrs(props.sx)}>
      <span {...stylex.attrs(styles.srOnly)}>{plain}</span>
      <span aria-hidden="true">
        {props.segments.map((segment) =>
          segment.text.split(/\s+/).map((word) => (
            <span data-word="" {...stylex.attrs(styles.word)}>
              <span data-word-inner="" {...stylex.attrs(styles.wordInner, segment.sx)}>
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
