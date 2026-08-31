import { useSyncExternalStore } from "react";

/*
 * Hydration-safe replacement for motion/react's `useReducedMotion`.
 *
 * motion's hook seeds `useState` from `matchMedia` synchronously, so under
 * `prefers-reduced-motion: reduce` the first client render takes the reduce
 * branch while the server rendered the other one — every variant page then
 * logs "Hydration failed because the server rendered HTML didn't match the
 * client". `useSyncExternalStore` renders the server snapshot (false) during
 * hydration, then re-renders with the real preference and tracks live changes.
 *
 * Consequence for callers: the reduce value arrives one render AFTER mount,
 * so a reduce-branched `initial` is captured with its non-reduce value —
 * animation targets must always reset transforms (e.g. `y: 0`) rather than
 * relying on the reduce branch to never have applied them.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
