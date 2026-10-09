import gsap from "gsap";

export const EASE_OUT = "power3.out";

const EASE_SETTLE = "power2.inOut";

type TriggerOptions = {
  /** ScrollTrigger start position; defaults to "top 78%". */
  start?: string;
  /** Extra delay before the tween begins (seconds). */
  delay?: number;
};

const START = "top 78%";

/** Word-by-word rise for a SplitWords heading. `sel` targets the heading. */
export function revealWords(root: HTMLElement, sel: string, options: TriggerOptions = {}) {
  const targets = root.querySelectorAll(`${sel} [data-word-inner], ${sel} .vi-word-inner`);
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
  if (!track) return undefined;
  return gsap.to(track, { xPercent: -50, duration: durationSeconds, ease: "none", repeat: -1 });
}
