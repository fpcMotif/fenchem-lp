import { describe, it, expect } from "vitest";
import { parseVariantSearch } from "./variant-search";
import { DEFAULT_VARIANT, VARIANT_KEYS } from "@/components/prototype/variants";

describe("parseVariantSearch pure seam", () => {
  it("defaults when input is null, undefined, or primitive", () => {
    expect(parseVariantSearch(null)).toBe(DEFAULT_VARIANT);
    expect(parseVariantSearch(undefined)).toBe(DEFAULT_VARIANT);
    expect(parseVariantSearch("")).toBe(DEFAULT_VARIANT);
    expect(parseVariantSearch(123)).toBe(DEFAULT_VARIANT);
    expect(parseVariantSearch(true)).toBe(DEFAULT_VARIANT);
  });

  it("defaults when search params object is empty", () => {
    expect(parseVariantSearch({})).toBe(DEFAULT_VARIANT);
  });

  it("resolves each declared valid variant key", () => {
    for (const key of VARIANT_KEYS) {
      expect(parseVariantSearch({ variant: key })).toBe(key);
    }
  });

  it("defaults when variant key is unrecognized", () => {
    expect(parseVariantSearch({ variant: "z" })).toBe(DEFAULT_VARIANT);
    expect(parseVariantSearch({ variant: "unknown-variant" })).toBe(DEFAULT_VARIANT);
    expect(parseVariantSearch({ variant: "99" })).toBe(DEFAULT_VARIANT);
  });

  it("defaults when variant key is empty string", () => {
    expect(parseVariantSearch({ variant: "" })).toBe(DEFAULT_VARIANT);
  });

  it("defaults when variant key is not a string", () => {
    expect(parseVariantSearch({ variant: 42 })).toBe(DEFAULT_VARIANT);
    expect(parseVariantSearch({ variant: true })).toBe(DEFAULT_VARIANT);
    expect(parseVariantSearch({ variant: ["a"] })).toBe(DEFAULT_VARIANT);
    expect(parseVariantSearch({ variant: { key: "a" } })).toBe(DEFAULT_VARIANT);
  });

  it("safely ignores other unrelated query parameters", () => {
    expect(parseVariantSearch({ tab: "spec", variant: "h", utm_source: "google" })).toBe("h");
  });
});
