import { useEffect } from "react";

/*
 * The capture harness freezes the browser clock (page.clock.setFixedTime), so
 * Motion animation loops starve mid-flight and entrance content can sit at
 * opacity 0 forever. All landing components honor useReducedMotion(), so the
 * module-scope patch below forces prefers-reduced-motion BEFORE first render —
 * animations collapse to their settled state (duration 0) and captures are
 * deterministic. Cards render static previews by design, so live browsing
 * loses only the entrance flourish.
 */
const mm = window.matchMedia?.bind(window);
if (mm) {
  window.matchMedia = ((q: string) => {
    if (String(q).includes("prefers-reduced-motion")) {
      return {
        matches: true,
        media: String(q),
        onchange: null,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        dispatchEvent: () => false,
      } as unknown as MediaQueryList;
    }
    return mm(q);
  }) as typeof window.matchMedia;
}

export function CaptureStatic() {
  useEffect(() => {
    /* loading="lazy" images below the fold never fetch at card viewport and
     * stall capture's decode() settle — flip them eager. */
    for (const img of Array.from(document.images)) {
      if (img.loading === "lazy") img.loading = "eager";
    }
  }, []);
  return null;
}

/*
 * Second layer: elements animated with a transition `delay` never start under
 * the frozen clock (the delay timer never elapses), so their initial
 * opacity-0/translate styles stick — and since the animation never runs,
 * nothing fights a one-time snap to the settled state. Reduced-motion above
 * collapses every un-delayed animation, so the snap only touches stragglers.
 */
export function SnapDelayed() {
  useEffect(() => {
    /* Motion wholesale-rewrites the style attribute on every starved frame
     * tick, so inline snaps (even !important) get clobbered. A stylesheet
     * rule wins permanently: attribute selectors re-match after each
     * rewrite, and sheet-level !important beats inline declarations.
     * "opacity: 0;" (with semicolon) can't match "opacity: 0.5;", so only
     * fully-hidden entrance states are forced visible. */
    if (!document.getElementById("ds-capture-snap")) {
      const style = document.createElement("style");
      style.id = "ds-capture-snap";
      style.textContent =
        '[style*="opacity: 0;"]{opacity:1 !important}' +
        '[style*="translate"]{transform:none !important}';
      document.head.appendChild(style);
    }
  }, []);
  return null;
}
