import { DEFAULT_VARIANT, VARIANT_KEYS, type VariantKey } from "@/components/prototype/variants";

export interface VariantSearchParams {
  variant?: unknown;
}

/**
 * Pure parsing seam for the prototype variant search parameter.
 * Takes an unknown parameter object (from TanStack router, Remix loader, URLSearchParams, etc.)
 * and resolves the active VariantKey, safely falling back to DEFAULT_VARIANT for invalid/missing values.
 */
export function parseVariantSearch(searchParams: unknown): VariantKey {
  if (!searchParams || typeof searchParams !== "object") {
    return DEFAULT_VARIANT;
  }

  if ("variant" in searchParams) {
    const candidate = (searchParams as VariantSearchParams).variant;
    if (typeof candidate === "string" && (VARIANT_KEYS as readonly string[]).includes(candidate)) {
      return candidate as VariantKey;
    }
  }

  return DEFAULT_VARIANT;
}
