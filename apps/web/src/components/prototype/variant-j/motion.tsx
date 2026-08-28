import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

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

export const EASE_OUT = "power3.out";
export const EASE_SETTLE = "power2.inOut";

const ReducedMotionContext = createContext(false);

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useReducedMotionFlag(): boolean {
  return useContext(ReducedMotionContext);
}

/** Page root: owns the sole Lenis instance and the ScrollTrigger wiring. */
export function MotionRoot({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
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
    { scope: ref, dependencies: [reduced] },
  );
  return ref;
}

type TriggerOptions = {
  /** ScrollTrigger start position; defaults to "top 78%". */
  start?: string;
  /** Extra delay before the tween begins (seconds). */
  delay?: number;
};

const START = "top 78%";

/** Word-by-word rise for a SplitWords heading. `sel` targets the heading. */
export function revealWords(root: HTMLElement, sel: string, options: TriggerOptions = {}) {
  const targets = root.querySelectorAll(`${sel} .vi-word-inner`);
  if (!targets.length) return;
  gsap.from(targets, {
    yPercent: 112,
    duration: 0.9,
    ease: EASE_OUT,
    stagger: 0.045,
    delay: options.delay ?? 0,
    scrollTrigger: {
      trigger: root.querySelector(sel) ?? root,
      start: options.start ?? START,
      once: true,
    },
  });
}

/** Masked rise-and-fade for copy, chips, cards. Staggers over all matches. */
export function riseIn(
  root: HTMLElement,
  sel: string,
  options: TriggerOptions & { stagger?: number } = {},
) {
  const targets = gsap.utils.toArray<HTMLElement>(sel, root);
  if (!targets.length) return;
  gsap.from(targets, {
    y: 28,
    autoAlpha: 0,
    duration: 0.9,
    ease: EASE_OUT,
    stagger: options.stagger ?? 0.08,
    delay: options.delay ?? 0,
    scrollTrigger: { trigger: targets[0], start: options.start ?? START, once: true },
  });
}

/** Images settle from a gentle overscale as they enter. */
export function settleImage(root: HTMLElement, sel: string, options: TriggerOptions = {}) {
  const targets = gsap.utils.toArray<HTMLElement>(sel, root);
  if (!targets.length) return;
  for (const target of targets) {
    gsap.from(target, {
      scale: 1.06,
      duration: 1.4,
      ease: EASE_SETTLE,
      delay: options.delay ?? 0,
      scrollTrigger: { trigger: target, start: options.start ?? START, once: true },
    });
  }
}

/** Ledger hairlines draw themselves in, left to right. */
export function drawRule(
  root: HTMLElement,
  sel: string,
  options: TriggerOptions & { stagger?: number } = {},
) {
  const targets = gsap.utils.toArray<HTMLElement>(sel, root);
  if (!targets.length) return;
  gsap.from(targets, {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 1.1,
    ease: EASE_SETTLE,
    stagger: options.stagger ?? 0.1,
    delay: options.delay ?? 0,
    scrollTrigger: { trigger: targets[0], start: options.start ?? START, once: true },
  });
}

/**
 * Continuous marquee. The track must contain its content TWICE; the tween
 * loops the first copy out of view. Returns nothing; cleaned up by scope.
 */
export function marquee(root: HTMLElement, trackSel: string, durationSeconds = 32) {
  const track = root.querySelector<HTMLElement>(trackSel);
  if (!track) return;
  gsap.to(track, { xPercent: -50, duration: durationSeconds, ease: "none", repeat: -1 });
}

/* ── Accessible word splitting ─────────────────────────────────────────── */

export type Segment = {
  text: string;
  /** Extra classes for this segment's words (e.g. italic accent). */
  className?: string;
};

/**
 * Splits text into per-word spans for staggered reveals while keeping an
 * unsplit accessible name: the original string stays in an sr-only span and
 * the visual words are aria-hidden. Never wrap links or interactive content.
 * Under no-JS the split words are simply visible in place.
 */
export function SplitWords({ segments, className }: { segments: Segment[]; className?: string }) {
  const plain = segments.map((segment) => segment.text).join(" ");
  return (
    <span className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {segments.map((segment, segmentIndex) =>
          segment.text.split(/\s+/).map((word, wordIndex) => (
            <span
              // eslint-disable-next-line react/no-array-index-key -- static content, order never changes
              key={`${segmentIndex}-${wordIndex}`}
              className="vi-word inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-baseline"
            >
              <span
                className={`vi-word-inner inline-block will-change-transform ${segment.className ?? ""}`}
              >
                {word}
                {" "}
              </span>
            </span>
          )),
        )}
      </span>
    </span>
  );
}
