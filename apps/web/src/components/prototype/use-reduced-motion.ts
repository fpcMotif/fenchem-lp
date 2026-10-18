import type { Accessor } from "solid-js";

import { createMediaQuery, REDUCED_MOTION_QUERY } from "@/compat/reduced-motion";

/*
 * Hydration-safe reduced-motion preference: false on the server and during
 * hydration, then the live `prefers-reduced-motion` value (same contract as the
 * React app's useSyncExternalStore version).
 */
export function useReducedMotion(): Accessor<boolean> {
  return createMediaQuery(REDUCED_MOTION_QUERY);
}
