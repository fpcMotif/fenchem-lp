import { easeInOut, lerp, projectIso, span } from "./iso-values";

export const HERO_SHEET = {
  heightUnits: 800,
  originX: 430,
  plate: 440,
  thickness: 28,
  lift: 14,
  balloonX: 808,
  elbowX: 778,
  fanGap: 84,
} as const;

export const HERO_PARTS = [
  { id: "rd", item: 1, glyph: "研", name: "研发", english: "R&D", seat: "+δ" },
  { id: "make", item: 2, glyph: "产", name: "生产", english: "Production", seat: "Flush" },
  { id: "sell", item: 3, glyph: "销", name: "销售", english: "Sales", seat: "Flush" },
] as const;

export type HeroPartId = (typeof HERO_PARTS)[number]["id"];

const HALF = HERO_SHEET.plate / 2;
const T = HERO_SHEET.thickness;

const ASSEMBLED_TOP: Record<HeroPartId, number> = {
  rd: 3 * T + HERO_SHEET.lift,
  make: 2 * T,
  sell: T,
};

const EXPLODED_TOP: Record<HeroPartId, number> = {
  rd: ASSEMBLED_TOP.rd + 360,
  make: ASSEMBLED_TOP.make + 180,
  sell: ASSEMBLED_TOP.sell,
};

const GROUND_Y = { exploded: 581, assembled: 425 } as const;

export function heroPose(progress: number) {
  const make = easeInOut(span(progress, 0.04, 0.5));
  const rdTravel = span(progress, 0.16, 0.76);
  const rd = easeInOut(rdTravel);
  const nearMiss = HERO_SHEET.lift * 0.6 * Math.sin(Math.PI * span(rdTravel, 0.8, 1));
  const camera = easeInOut(span(progress, 0.04, 0.76));
  return {
    top: {
      rd: lerp(EXPLODED_TOP.rd, ASSEMBLED_TOP.rd, rd) - nearMiss,
      make: lerp(EXPLODED_TOP.make, ASSEMBLED_TOP.make, make),
      sell: ASSEMBLED_TOP.sell,
    } satisfies Record<HeroPartId, number>,
    groundY: lerp(GROUND_Y.exploded, GROUND_Y.assembled, camera),
    dimension: span(progress, 0.8, 0.9),
    exploded: 1 - span(progress, 0.42, 0.52),
    assembled: span(progress, 0.52, 0.62),
  };
}

type Pose = ReturnType<typeof heroPose>;

const point = (pose: Pose, x: number, y: number, z: number) => {
  const offset = projectIso(x, y, z);
  return { x: HERO_SHEET.originX + offset.x, y: pose.groundY + offset.y };
};

const CORNERS = [
  [-HALF, -HALF],
  [-HALF, HALF],
  [HALF, HALF],
] as const;

const fmt = (value: number) => value.toFixed(2);

export function guidePath(pose: Pose, upper: HeroPartId, lower: HeroPartId) {
  const from = pose.top[upper] - T;
  const to = pose.top[lower];
  if (from - to < 0.5) return "M0 0";
  return CORNERS.map(([x, y]) => {
    const a = point(pose, x, y, from);
    const b = point(pose, x, y, to);
    return `M${fmt(a.x)} ${fmt(a.y)}V${fmt(b.y)}`;
  }).join("");
}

export function guideArrows(pose: Pose, upper: HeroPartId, lower: HeroPartId) {
  const from = pose.top[upper] - T;
  const to = pose.top[lower];
  if (from - to < 40) return "M0 0";
  return [CORNERS[0], CORNERS[2]]
    .map(([x, y]) => {
      const tip = point(pose, x, y, (from + to) / 2 - 8);
      return `M${fmt(tip.x - 4)} ${fmt(tip.y - 7)}L${fmt(tip.x)} ${fmt(tip.y)}L${fmt(tip.x + 4)} ${fmt(tip.y - 7)}`;
    })
    .join("");
}

export const guideArrowOpacity = (pose: Pose, upper: HeroPartId, lower: HeroPartId) =>
  span(pose.top[upper] - T - pose.top[lower], 40, 110);

export function leaderAnchor(pose: Pose, id: HeroPartId) {
  return point(pose, HALF * 0.45, HALF, pose.top[id] - T / 2);
}

export function labelY(pose: Pose, id: HeroPartId) {
  const middle = leaderAnchor(pose, "make").y;
  if (id === "make") return middle;
  if (id === "rd") return Math.min(leaderAnchor(pose, "rd").y, middle - HERO_SHEET.fanGap);
  return Math.max(leaderAnchor(pose, "sell").y, middle + HERO_SHEET.fanGap);
}

export function leaderPath(pose: Pose, id: HeroPartId) {
  const anchor = leaderAnchor(pose, id);
  const y = labelY(pose, id);
  return `M${fmt(anchor.x)} ${fmt(anchor.y)}L${HERO_SHEET.elbowX} ${fmt(y)}H${HERO_SHEET.balloonX}`;
}

export function liftDimension(pose: Pose) {
  const top = point(pose, -HALF, -HALF, pose.top.rd - T);
  const bottom = point(pose, -HALF, -HALF, pose.top.make);
  const lineX = top.x - 46;
  const ext = `M${fmt(top.x - 8)} ${fmt(top.y)}H${fmt(top.x - 66)}M${fmt(bottom.x - 8)} ${fmt(bottom.y)}H${fmt(bottom.x - 66)}`;
  const stem = `M${fmt(lineX)} ${fmt(top.y - 34)}V${fmt(bottom.y + 34)}`;
  const heads =
    `M${fmt(lineX - 4)} ${fmt(top.y - 10)}L${fmt(lineX)} ${fmt(top.y)}L${fmt(lineX + 4)} ${fmt(top.y - 10)}Z` +
    `M${fmt(lineX - 4)} ${fmt(bottom.y + 10)}L${fmt(lineX)} ${fmt(bottom.y)}L${fmt(lineX + 4)} ${fmt(bottom.y + 10)}Z`;
  return { ext, stem, heads, labelX: lineX - 12, labelY: (top.y + bottom.y) / 2 };
}
