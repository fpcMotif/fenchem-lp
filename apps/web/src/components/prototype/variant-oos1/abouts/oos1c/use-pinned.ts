import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const list = window.matchMedia(QUERY);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
}

export function usePinned(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
