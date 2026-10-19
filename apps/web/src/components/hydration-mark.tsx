import { onSettled } from "solid-js";

/**
 * Sets `<html data-hydrated>` once everything rendered before it inside the same
 * `<Loading>` boundary has hydrated. Specs wait on this app-owned signal.
 */
export function HydrationMark() {
  onSettled(() => {
    document.documentElement.dataset.hydrated = "";
  });
  return null;
}
