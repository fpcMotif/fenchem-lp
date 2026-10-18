import type { Component } from "solid-js";
import { describe, expect, it } from "vitest";

import { DEFAULT_VARIANT, VARIANTS } from "./variants";

const aboutViews = import.meta.glob<Record<string, Component | undefined>>(
  "./variant-oos1/abouts/*/about-view.tsx",
  { eager: true },
);
const catalogs = import.meta.glob<{ Catalog?: Component }>(
  "./variant-oos1/products/*/catalog.tsx",
  { eager: true },
);
const solutions = import.meta.glob<{ Solutions?: Component }>(
  "./variant-oos1/products/*/solutions.tsx",
  { eager: true },
);

const keysOf = (family: string) => VARIANTS.filter((v) => v.family === family).map((v) => v.key);

describe("variant registry", () => {
  it("has unique keys, a registered default, and twins that exist", () => {
    const keys = VARIANTS.map((v) => v.key);
    expect(new Set(keys).size).toBe(keys.length);
    expect(keys).toContain(DEFAULT_VARIANT);
    for (const { key, twinOf } of VARIANTS) {
      if (twinOf) expect(keys, `${key} twins ${twinOf}`).toContain(twinOf);
    }
  });

  it("registers every about folder, each exporting About<KEY>", () => {
    const keys = keysOf("about");
    expect(keys).toHaveLength(Object.keys(aboutViews).length);
    for (const key of keys) {
      const view = aboutViews[`./variant-oos1/abouts/${key}/about-view.tsx`];
      expect(view?.[`About${key.toUpperCase()}`], key).toBeTypeOf("function");
    }
  });

  it("registers every products folder with sections, each exporting Catalog and Solutions", () => {
    const keys = keysOf("products");
    expect(keys).toHaveLength(Object.keys(catalogs).length);
    expect(keys).not.toContain("oos1doubao");
    for (const key of keys) {
      expect(catalogs[`./variant-oos1/products/${key}/catalog.tsx`]?.Catalog, key).toBeTypeOf(
        "function",
      );
      expect(solutions[`./variant-oos1/products/${key}/solutions.tsx`]?.Solutions, key).toBeTypeOf(
        "function",
      );
    }
  });
});
