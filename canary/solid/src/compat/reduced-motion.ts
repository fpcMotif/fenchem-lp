import { createSignal, onSettled, type Accessor } from "solid-js";

const QUERY = "(prefers-reduced-motion: reduce)";

/** Hydration-safe media query: false on the server and during hydration, then live. */
export function createMediaQuery(query: string): Accessor<boolean> {
  const [matches, setMatches] = createSignal(false);
  onSettled(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  });
  return matches;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(QUERY).matches;
}

export const REDUCED_MOTION_QUERY = QUERY;
