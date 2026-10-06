import {
  HEARTWOOD_COUNT,
  LAST_CLOSED,
  RADII,
  RING_ALPHA,
  polyline,
  radiusAt,
  seeded,
} from "./geometry";

export const WEDGE_ANGLE = 0.7;
const SECTOR = 2.1;
const CAMBIUM_DEPTH = 3.2;
const STEPS = 36;
const MARGIN = 10;

type Radius = (angle: number) => number;

const ringRadius =
  (index: number, scale = 1): Radius =>
  (angle) =>
    index < 0 ? 4 : radiusAt(index, angle + SECTOR) * scale;

function arc(radius: Radius, reverse = false) {
  const points: number[] = [];
  for (let step = 0; step <= STEPS; step++) {
    const angle = (WEDGE_ANGLE * (reverse ? STEPS - step : step)) / STEPS;
    const r = radius(angle);
    points.push(r * Math.cos(angle), r * Math.sin(angle));
  }
  return points;
}

const band = (outer: Radius, inner: Radius) => polyline([...arc(outer), ...arc(inner, true)], true);

const heartEdge = ringRadius(HEARTWOOD_COUNT - 1);
const sapEdge = ringRadius(LAST_CLOSED);
const cambiumEdge: Radius = (angle) => sapEdge(angle) + CAMBIUM_DEPTH;

export const RING_ARCS = RADII.slice(0, LAST_CLOSED + 1).map((_, index) => ({
  key: index,
  path: polyline(arc(ringRadius(index)), false),
  alpha: RING_ALPHA[index],
}));

export const LATEWOOD = RADII.slice(0, LAST_CLOSED + 1)
  .map((radius, index) => {
    const previous = index === 0 ? 4 : RADII[index - 1];
    return band(
      ringRadius(index),
      ringRadius(index, (radius - (radius - previous) * 0.34) / radius),
    );
  })
  .join("");

export const HEARTWOOD = polyline([0, 0, ...arc(heartEdge)], true);
export const SAPWOOD = band(sapEdge, heartEdge);
export const CAMBIUM = band(cambiumEdge, sapEdge);
export const OUTLINE = polyline([0, 0, ...arc(cambiumEdge)], true);

const outerTop = cambiumEdge(0);
const outerBottom = arc(cambiumEdge).slice(-2);

export const VIEW = {
  x: -MARGIN,
  y: -MARGIN,
  width: Math.max(outerTop, outerBottom[0]) + MARGIN * 2,
  height: outerBottom[1] + MARGIN * 2,
};

const round = (value: number) => Math.round(value * 10) / 10;

function texture() {
  const random = seeded(1995_2026);
  let rays = "";
  for (let n = 0; n < 64; n++) {
    const angle = 0.03 + random() * (WEDGE_ANGLE - 0.06);
    const limit = sapEdge(angle) - 2;
    const start = (0.08 + random() * 0.86) * limit;
    const end = Math.min(start + (0.025 + random() * 0.07) * limit, limit);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    rays += `M${round(start * cos)} ${round(start * sin)}L${round(end * cos)} ${round(end * sin)}`;
  }
  let pores = "";
  for (let index = 0; index <= LAST_CLOSED; index++) {
    const inner = index === 0 ? 4 : RADII[index - 1];
    const depth = (RADII[index] - inner) * 0.5;
    const count = Math.floor(((inner + depth / 2) * WEDGE_ANGLE) / 11);
    for (let n = 0; n < count; n++) {
      const angle = 0.02 + random() * (WEDGE_ANGLE - 0.04);
      const base = index === 0 ? 4 : ringRadius(index - 1)(angle);
      const r = base + 0.8 + random() * depth;
      const size = round(0.4 + random() * 0.45);
      const x = round(r * Math.cos(angle) - size);
      const y = round(r * Math.sin(angle));
      pores += `M${x} ${y}a${size} ${size} 0 1 0 ${size * 2} 0a${size} ${size} 0 1 0 ${-size * 2} 0`;
    }
  }
  return { rays, pores };
}

export const TEXTURE = texture();

function anchorAt(fraction: number, radius: Radius, share: number) {
  const y = VIEW.y + VIEW.height * fraction;
  let angle = 0;
  for (let step = 1; step <= 200; step++) {
    const candidate = (WEDGE_ANGLE * step) / 200;
    if (radius(candidate) * Math.sin(candidate) >= y) {
      angle = candidate;
      break;
    }
  }
  const outerX = radius(angle) * Math.cos(angle);
  const edgeX = y / Math.tan(WEDGE_ANGLE);
  return { x: edgeX + (outerX - edgeX) * share, y };
}

export const ANCHORS = [
  anchorAt(0.11, heartEdge, 0.55),
  anchorAt(0.46, sapEdge, 0.6),
  anchorAt(0.83, cambiumEdge, 0.985),
];

export const toX = (x: number) => ((x - VIEW.x) / VIEW.width) * 100;
export const toY = (y: number) => ((y - VIEW.y) / VIEW.height) * 100;
