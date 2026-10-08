import { useSyncExternalStore } from "react";

const FLASH_MS = 2000;

let flashedItemId: string | null = null;
let clearFlashTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

const notify = () => {
  for (const listener of listeners) listener();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const catalogRowId = (itemId: string) => `oos1pc-item-${itemId}`;

export function flashCatalogItem(itemId: string) {
  flashedItemId = itemId;
  clearTimeout(clearFlashTimer);
  clearFlashTimer = setTimeout(() => {
    flashedItemId = null;
    notify();
  }, FLASH_MS);
  notify();
}

export function useFlashedCatalogItem() {
  return useSyncExternalStore(
    subscribe,
    () => flashedItemId,
    () => null,
  );
}
