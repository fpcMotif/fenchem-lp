import { describe, expect, it } from "vitest";

import { CATALOG_GROUPS, SOLUTION_ITEMS } from "../../products-data";
import { FLAT_FORMULAS, FLAT_ITEMS, FORM_LABEL, FORMULA_TRAITS, ITEM_TRAITS } from "./derived";

describe("product variant source coverage", () => {
  it("retains all 42 catalog products with explicit traits", () => {
    const ids = CATALOG_GROUPS.flatMap((group) => group.items.map((item) => item.id));
    expect(FLAT_ITEMS).toHaveLength(42);
    expect(FLAT_ITEMS.map((item) => item.id)).toEqual(ids);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of FLAT_ITEMS) {
      expect(ITEM_TRAITS[item.id]).toBeDefined();
      expect(FORM_LABEL[item.traits.form]).toBeTruthy();
      expect(item.inci.trim()).not.toBe("");
      expect(item.features.trim()).not.toBe("");
    }
  });

  it("retains every formula and its metadata", () => {
    expect(FLAT_FORMULAS).toHaveLength(10);
    expect(FLAT_FORMULAS.map((item) => item.id)).toEqual(SOLUTION_ITEMS.map((item) => item.id));
    for (const formula of FLAT_FORMULAS) {
      expect(FORMULA_TRAITS[formula.id]).toBeDefined();
      expect(formula.overview.length).toBeGreaterThan(0);
      expect(formula.keyIngredients.length).toBeGreaterThan(0);
    }
  });

  it("does not misclassify the emulsifier as a botanical extract", () => {
    const emulsifier = FLAT_ITEMS.find((item) => item.id === "other-01");
    expect(emulsifier).toBeDefined();
    expect(emulsifier?.traits.form).toBe("unspecified");
    expect(FORM_LABEL.unspecified).toBe("未注明");
  });

  it("preserves missing challenge data without inventing a claim", () => {
    const mist = FLAT_FORMULAS.find((item) => item.id === "rose-mist");
    expect(mist).toBeDefined();
    expect(mist?.challenges).toEqual([]);
  });
});
