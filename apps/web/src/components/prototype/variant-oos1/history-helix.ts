export type HelixInput = {
  nodeXs: readonly number[];
  years: readonly number[];
  tailX: number;
  height: number;
};

export type Helix = {
  width: number;
  height: number;
  radius: number;
  strandA: string;
  strandB: string;
  nodes: readonly { x: number; fraction: number }[];
  sampleXs: readonly number[];
  sampleFractions: readonly number[];
};

const TAIL_HALVES = 2;
const SAMPLES_PER_HALF = 14;
const MAX_SAMPLE_STEP = 6;

const clampRange = (value: number, low: number, high: number) =>
  Math.min(high, Math.max(low, value));

const fixed = (value: number) => value.toFixed(1);

export function helixSignature(input: HelixInput) {
  const nodes = input.nodeXs.map((x) => Math.round(x)).join(",");
  return `${nodes}|${Math.round(input.tailX)}|${Math.round(input.height)}`;
}

export function buildHelix({ nodeXs, years, tailX, height }: HelixInput): Helix | null {
  if (nodeXs.length < 2 || nodeXs.length !== years.length || height < 16) return null;

  const cy = height / 2;
  const radius = height >= 52 ? 5.5 : 5;
  const maxAmp = Math.min(16, cy - 7);
  const minAmp = maxAmp * 0.45;

  const segments = nodeXs.slice(1).map((x, i) => ({
    x0: nodeXs[i],
    span: x - nodeXs[i],
    halves: Math.max(1, years[i + 1] - years[i]),
  }));
  const last = nodeXs[nodeXs.length - 1];
  if (tailX > last) segments.push({ x0: last, span: tailX - last, halves: TAIL_HALVES });

  const xs: number[] = [];
  const ys: number[] = [];
  const nodeIndexes: number[] = [];
  let orientation = 1;

  segments.forEach(({ x0, span, halves }, i) => {
    const amp = clampRange((span / halves) * 0.09, minAmp, maxAmp);
    const steps = Math.max(halves * SAMPLES_PER_HALF, Math.ceil(span / MAX_SAMPLE_STEP));
    for (let s = i === 0 ? 0 : 1; s <= steps; s += 1) {
      const u = s / steps;
      const swell = 0.55 + 0.45 * Math.sin(Math.PI * u);
      xs.push(x0 + span * u);
      ys.push(cy + orientation * amp * swell * Math.sin(Math.PI * halves * u));
      if (i < nodeXs.length - 1 && ((i === 0 && s === 0) || s === steps)) {
        nodeIndexes.push(xs.length - 1);
      }
    }
    orientation *= halves % 2 === 0 ? 1 : -1;
  });

  const cumulative: number[] = [0];
  for (let i = 1; i < xs.length; i += 1) {
    cumulative.push(cumulative[i - 1] + Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]));
  }
  const total = cumulative[cumulative.length - 1] || 1;
  const fractions = cumulative.map((value) => value / total);

  const strandA = xs.map((x, i) => `${i === 0 ? "M" : "L"}${fixed(x)} ${fixed(ys[i])}`).join("");
  const strandB = xs
    .map((x, i) => `${i === 0 ? "M" : "L"}${fixed(x)} ${fixed(2 * cy - ys[i])}`)
    .join("");

  return {
    width: Math.max(tailX, last),
    height,
    radius,
    strandA,
    strandB,
    nodes: nodeIndexes.map((index) => ({ x: xs[index], fraction: fractions[index] })),
    sampleXs: xs,
    sampleFractions: fractions,
  };
}

export function fractionAt(helix: Helix, x: number) {
  const { sampleXs, sampleFractions } = helix;
  if (x <= sampleXs[0]) return 0;
  const last = sampleXs.length - 1;
  if (x >= sampleXs[last]) return 1;
  let low = 0;
  let high = last;
  while (high - low > 1) {
    const mid = (low + high) >> 1;
    if (sampleXs[mid] <= x) low = mid;
    else high = mid;
  }
  const span = sampleXs[high] - sampleXs[low] || 1;
  const t = (x - sampleXs[low]) / span;
  return sampleFractions[low] + (sampleFractions[high] - sampleFractions[low]) * t;
}

export function litCountAt(nodeXs: readonly number[], x: number) {
  return nodeXs.filter((nodeX) => nodeX <= x + 1).length;
}

export function yearAt(nodeXs: readonly number[], years: readonly number[], x: number) {
  if (x <= nodeXs[0]) return years[0];
  for (let i = 0; i < nodeXs.length - 1; i += 1) {
    if (x < nodeXs[i + 1]) {
      const t = (x - nodeXs[i]) / (nodeXs[i + 1] - nodeXs[i]);
      return years[i] + Math.floor(t * (years[i + 1] - years[i]));
    }
  }
  return years[years.length - 1];
}
