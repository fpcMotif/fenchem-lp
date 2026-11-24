import { describe, expect, it } from "vitest";

import { MAX_COORDINATE } from "./camera";
import { ITEMS } from "./examples";

describe("taste canvas registry", () => {
  it("gives every item a unique id and a unique readable name", () => {
    expect(new Set(ITEMS.map((item) => item.id)).size).toBe(ITEMS.length);
    expect(new Set(ITEMS.map((item) => item.name)).size).toBe(ITEMS.length);
    for (const item of ITEMS) expect(item.name, item.id).not.toBe(item.id);
  });

  it("places every item at a finite, bounded position with a real width", () => {
    for (const item of ITEMS) {
      expect(Math.abs(item.x), item.id).toBeLessThanOrEqual(MAX_COORDINATE);
      expect(Math.abs(item.y), item.id).toBeLessThanOrEqual(MAX_COORDINATE);
      expect(item.width, item.id).toBeGreaterThan(0);
    }
  });

  it("keeps the shipped culture section next to its emblem variants", () => {
    expect(ITEMS.map((item) => item.id)).toEqual([
      "culture-shipped",
      "culture-depth",
      "culture-breath",
      "culture-tint",
    ]);
  });
});
