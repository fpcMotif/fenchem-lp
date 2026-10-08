import { describe, expect, it } from "vitest";

import { ABOUT_HISTORY } from "./about-data";
import { buildHelix, fractionAt, litCountAt, yearAt } from "./history-helix";

const YEARS = ABOUT_HISTORY.milestones.map((milestone) => milestone.year);
const STEP = 280;
const NODE_XS = YEARS.map((_, index) => index * STEP);
const HEIGHT = 56;

function crossingsBetween(strand: string, from: number, to: number) {
  const points = Array.from(strand.matchAll(/[ML](-?[\d.]+) (-?[\d.]+)/g), (match) => ({
    x: Number(match[1]),
    y: Number(match[2]) - HEIGHT / 2,
  })).filter((point) => point.x > from + 0.5 && point.x < to - 0.5);
  let crossings = 0;
  for (let i = 1; i < points.length; i += 1) {
    if (Math.sign(points[i].y) !== Math.sign(points[i - 1].y) && points[i].y !== 0) crossings += 1;
  }
  return crossings;
}

describe("history helix", () => {
  const helix = buildHelix({
    nodeXs: NODE_XS,
    years: YEARS,
    tailX: NODE_XS.at(-1)! + STEP,
    height: HEIGHT,
  });

  it("keeps every milestone in chronological order", () => {
    expect(YEARS).toHaveLength(10);
    expect([...YEARS].sort((a, b) => a - b)).toEqual(YEARS);
    expect(YEARS[0]).toBe(1995);
    expect(YEARS.at(-1)).toBe(2024);
  });

  it("places a node on every milestone and ties both strands there", () => {
    expect(helix).not.toBeNull();
    expect(helix!.nodes.map((node) => Math.round(node.x))).toEqual(NODE_XS);
    const fractions = helix!.nodes.map((node) => node.fraction);
    expect(fractions[0]).toBe(0);
    expect(fractions.every((value, i) => i === 0 || value > fractions[i - 1])).toBe(true);
    expect(fractions.at(-1)!).toBeLessThan(1);
  });

  it("crosses the strands once per year between milestones", () => {
    for (let i = 0; i < YEARS.length - 1; i += 1) {
      const interior = YEARS[i + 1] - YEARS[i] - 1;
      expect(crossingsBetween(helix!.strandA, NODE_XS[i], NODE_XS[i + 1])).toBe(interior);
    }
  });

  it("maps the drawing tip to the year counter and lit milestones", () => {
    expect(yearAt(NODE_XS, YEARS, -40)).toBe(1995);
    expect(yearAt(NODE_XS, YEARS, STEP / 2)).toBe(2001);
    expect(yearAt(NODE_XS, YEARS, STEP)).toBe(2007);
    expect(yearAt(NODE_XS, YEARS, NODE_XS.at(-1)!)).toBe(2024);
    expect(litCountAt(NODE_XS, 0)).toBe(1);
    expect(litCountAt(NODE_XS, STEP - 0.5)).toBe(2);
    expect(litCountAt(NODE_XS, NODE_XS.at(-1)!)).toBe(10);
    expect(fractionAt(helix!, NODE_XS[3])).toBeCloseTo(helix!.nodes[3].fraction, 6);
  });

  it("refuses shapes it cannot draw", () => {
    expect(buildHelix({ nodeXs: [0], years: [1995], tailX: 10, height: HEIGHT })).toBeNull();
    expect(buildHelix({ nodeXs: [0, 10], years: [1995], tailX: 10, height: HEIGHT })).toBeNull();
  });
});
