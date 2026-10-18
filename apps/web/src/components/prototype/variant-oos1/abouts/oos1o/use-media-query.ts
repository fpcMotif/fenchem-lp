import type { Accessor } from "solid-js";

import { createExternalStore } from "@/compat/external-store";

export function useMediaQuery(query: string): Accessor<boolean> {
  const subscribe = (onChange: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  };
  return createExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
