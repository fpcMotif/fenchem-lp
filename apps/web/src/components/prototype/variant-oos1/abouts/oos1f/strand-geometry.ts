export type Band = { top: number; bottom: number };

export type StrandInput = {
  width: number;
  height: number;
  nodeYs: readonly number[];
  bands: readonly Band[];
};

export type StrandShape = {
  width: number;
  height: number;
  radius: number;
  strandA: string;
  strandB: string;
  nodes: readonly { y: number; fraction: number }[];
  bands: readonly Band[];
  sampleYs: readonly number[];
  sampleFractions: readonly number[];
};

const SAMPLE_STEP = 8;

const clampRange = (value: number, low: number, high: number) =>
  Math.min(high, Math.max(low, value));

const fixed = (value: number) => value.toFixed(1);

export function strandSignature(input: StrandInput) {
  const nodes = input.nodeYs.map((y) => Math.round(y)).join(",");
  const bands = input.bands.map((b) => `${Math.round(b.top)}-${Math.round(b.bottom)}`).join(",");
  return `${Math.round(input.width)}|${Math.round(input.height)}|${nodes}|${bands}`;
}

export function buildStrand(input: StrandInput): StrandShape | null {
  const { width, height, nodeYs, bands } = input;
  if (nodeYs.length < 2 || width < 8) return null;

  const cx = width / 2;
  const amp = clampRange(width * 0.12, 3.5, 14);
  const radius = width >= 90 ? 4.5 : 4;
  const halfWave = width >= 90 ? 260 : width >= 50 ? 200 : 150;

  const xs: number[] = [];
  const ys: number[] = [];
  const nodeIndexes: number[] = [];
  let orientation = 1;

  for (let i = 0; i < nodeYs.length - 1; i += 1) {
    const y0 = nodeYs[i];
    const gap = nodeYs[i + 1] - y0;
    const halves = Math.max(1, Math.round(gap / halfWave));
    const steps = Math.max(2, Math.ceil(gap / SAMPLE_STEP));

    for (let s = i === 0 ? 0 : 1; s <= steps; s += 1) {
      const u = s / steps;
      const swell = 0.55 + 0.45 * Math.sin(Math.PI * u);
      xs.push(cx + orientation * amp * swell * Math.sin(Math.PI * halves * u));
      ys.push(y0 + gap * u);
      if ((i === 0 && s === 0) || s === steps) nodeIndexes.push(xs.length - 1);
    }

    orientation *= halves % 2 === 0 ? 1 : -1;
  }

  const cumulative: number[] = [0];
  for (let i = 1; i < xs.length; i += 1) {
    cumulative.push(cumulative[i - 1] + Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]));
  }
  const total = cumulative[cumulative.length - 1] || 1;
  const fractions = cumulative.map((value) => value / total);

  const strandA = xs.map((x, i) => `${i === 0 ? "M" : "L"}${fixed(x)} ${fixed(ys[i])}`).join("");
  const strandB = xs
    .map((x, i) => `${i === 0 ? "M" : "L"}${fixed(2 * cx - x)} ${fixed(ys[i])}`)
    .join("");

  return {
    width,
    height,
    radius,
    strandA,
    strandB,
    nodes: nodeIndexes.map((index) => ({ y: ys[index], fraction: fractions[index] })),
    bands,
    sampleYs: ys,
    sampleFractions: fractions,
  };
}

export function fractionAt(shape: StrandShape, y: number) {
  const { sampleYs, sampleFractions } = shape;
  if (y <= sampleYs[0]) return 0;
  const last = sampleYs.length - 1;
  if (y >= sampleYs[last]) return 1;
  let low = 0;
  let high = last;
  while (high - low > 1) {
    const mid = (low + high) >> 1;
    if (sampleYs[mid] <= y) low = mid;
    else high = mid;
  }
  const span = sampleYs[high] - sampleYs[low] || 1;
  const t = (y - sampleYs[low]) / span;
  return sampleFractions[low] + (sampleFractions[high] - sampleFractions[low]) * t;
}
