import { describe, expect, it } from "vitest";

import { balancedColumns } from "./balanced-columns";

const RD_LENGTHS = [74.3, 114.8, 81];

describe("balancedColumns", () => {
  it("narrows one paragraph until its last line is at least half full", () => {
    expect(balancedColumns(43, [131])).toEqual({ width: 37, columns: [37] });
  });

  it("keeps the full room when every paragraph already ends well", () => {
    expect(balancedColumns(44, RD_LENGTHS)).toEqual({ width: 44, columns: [44, 44, 44] });
  });

  it("loosens one paragraph's spacing to keep a shared width", () => {
    expect(balancedColumns(21, RD_LENGTHS)).toEqual({ width: 21, columns: [21, 20, 21] });
  });

  it("gives up when no width leaves room for a kinsoku push", () => {
    expect(balancedColumns(3, [2.5])).toBeUndefined();
  });
});
