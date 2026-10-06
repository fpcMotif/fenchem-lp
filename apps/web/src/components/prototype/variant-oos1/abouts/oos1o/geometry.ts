const TAU = Math.PI * 2;

export const ORIGIN_YEAR = 1995;
export const CURRENT_YEAR = Math.max(ORIGIN_YEAR + 2, new Date().getFullYear());
export const RING_COUNT = CURRENT_YEAR - ORIGIN_YEAR + 1;
export const HEARTWOOD_COUNT = Math.round(RING_COUNT * 0.375);
export const LAST_CLOSED = RING_COUNT - 2;

export const DISC_EXTENT = 500;
const OUTER_RADIUS = 446;
const PITH_RADIUS = 6;
const SAMPLES = 120;
const START_ANGLE = -Math.PI / 2;
export const OPEN_GAP = 0.32;

export type Point = { x: number; y: number };
type Harmonic = { k: number; amp: number; phase: number };

export function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = seeded(19950712);

const widths = Array.from({ length: RING_COUNT }, (_, index) => {
  const lean = random() < 0.14 ? 0.5 : 1;
  return (index < HEARTWOOD_COUNT ? 0.6 : 1) * lean * (0.64 + 0.72 * random());
});
const widestRing = Math.max(...widths);
const totalWidth = widths.reduce((sum, width) => sum + width, 0);

let grown = 0;
export const RADII = widths.map((width) => {
  grown += width;
  return PITH_RADIUS + ((OUTER_RADIUS - PITH_RADIUS) * grown) / totalWidth;
});

export const RING_ALPHA = widths.map(
  (width, index) => (index < HEARTWOOD_COUNT ? 0.46 : 0.3) + 0.22 * (1 - width / widestRing),
);

let trend: Harmonic[] = [
  { k: 1, amp: 0.026, phase: 0.8 },
  { k: 2, amp: 0.016, phase: 2.3 },
  { k: 3, amp: 0.006, phase: 4.4 },
];
let detail: Harmonic[] = [4, 5, 6, 7].map((k) => ({
  k,
  amp: 0.004 * random(),
  phase: random() * TAU,
}));

const SHAPES: Harmonic[][] = RADII.map((_, index) => {
  trend = trend.map((harmonic) => ({
    ...harmonic,
    phase: harmonic.phase + (random() - 0.5) * 0.08,
  }));
  detail = detail.map((harmonic) => ({
    k: harmonic.k,
    amp: harmonic.amp * 0.62 + 0.0062 * random() * 0.38,
    phase: harmonic.phase + (random() - 0.5) * 0.5,
  }));
  const wobble = [11, 14, 17].map((k) => ({ k, amp: 0.0011 * random(), phase: random() * TAU }));
  const scale = 0.5 + (0.5 * index) / (RING_COUNT - 1);
  return [...trend, ...detail, ...wobble].map((harmonic) => ({
    ...harmonic,
    amp: harmonic.amp * scale,
  }));
});

export function radiusAt(index: number, angle: number) {
  let offset = 1;
  for (const harmonic of SHAPES[index]) {
    offset += harmonic.amp * Math.cos(harmonic.k * angle - harmonic.phase);
  }
  return RADII[index] * offset;
}

const round = (value: number) => Math.round(value * 10) / 10;

export function polyline(points: readonly number[], closed: boolean) {
  let path = "";
  for (let i = 0; i < points.length; i += 2) {
    path += `${i === 0 ? "M" : "L"}${round(points[i])} ${round(points[i + 1])}`;
  }
  return closed ? `${path}Z` : path;
}

function sampleRing(index: number) {
  const points: number[] = [];
  for (let step = 0; step < SAMPLES; step++) {
    const angle = START_ANGLE + (step / SAMPLES) * TAU;
    const radius = index < 0 ? PITH_RADIUS * 0.7 : radiusAt(index, angle);
    points.push(radius * Math.cos(angle), radius * Math.sin(angle));
  }
  return points;
}

const PITH_SAMPLES = sampleRing(-1);
const RING_SAMPLES = RADII.map((_, index) => sampleRing(index));

export const RINGS = RING_SAMPLES.slice(0, LAST_CLOSED + 1).map((points, index) => ({
  year: ORIGIN_YEAR + index,
  path: polyline(points, true),
  alpha: RING_ALPHA[index],
}));

export function blendRing(position: number) {
  const clamped = Math.min(Math.max(position, -1), RING_COUNT - 1);
  const lower = Math.floor(clamped);
  const mix = clamped - lower;
  const from = lower < 0 ? PITH_SAMPLES : RING_SAMPLES[lower];
  const to = lower + 1 >= RING_COUNT ? from : RING_SAMPLES[lower + 1];
  const points = from.map((value, i) => value + (to[i] - value) * mix);
  return polyline(points, true);
}

export function blendRadius(position: number) {
  const clamped = Math.min(Math.max(position, -1), RING_COUNT - 1);
  const lower = Math.floor(clamped);
  const mix = clamped - lower;
  const from = lower < 0 ? PITH_RADIUS : RADII[lower];
  const to = lower + 1 >= RING_COUNT ? from : RADII[lower + 1];
  return from + (to - from) * mix;
}

function openRing() {
  const last = RING_COUNT - 1;
  const sweep = TAU - OPEN_GAP;
  const steps = Math.round((SAMPLES * sweep) / TAU);
  const points: number[] = [];
  for (let step = 0; step <= steps; step++) {
    const angle = START_ANGLE + (step / steps) * sweep;
    const radius = radiusAt(last, angle);
    points.push(radius * Math.cos(angle), radius * Math.sin(angle));
  }
  const gapAngle = START_ANGLE - OPEN_GAP / 2;
  const gapRadius = radiusAt(last, gapAngle);
  return {
    path: polyline(points, false),
    gap: { x: gapRadius * Math.cos(gapAngle), y: gapRadius * Math.sin(gapAngle) },
  };
}

export const OPEN_RING = openRing();

function rays() {
  const rayRandom = seeded(20260101);
  let path = "";
  for (let n = 0; n < 110; n++) {
    const angle = rayRandom() * TAU;
    const limit = radiusAt(LAST_CLOSED, angle) * 0.985;
    const start = (0.08 + rayRandom() * 0.78) * OUTER_RADIUS;
    const end = Math.min(start + (0.04 + rayRandom() * 0.2) * OUTER_RADIUS, limit);
    if (end - start < 6) continue;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    path += `M${round(start * cos)} ${round(start * sin)}L${round(end * cos)} ${round(end * sin)}`;
  }
  return path;
}

export const RAY_PATH = rays();

export const toPercent = (value: number) => ((value + DISC_EXTENT) / (DISC_EXTENT * 2)) * 100;
