export const SHEET_WIDTH_UNITS = 1000;

export const cq = (units: number) => `${(units * 100) / SHEET_WIDTH_UNITS}cqw`;

const COS_45 = Math.SQRT1_2;

const HALF_COS_45 = Math.SQRT1_2 / 2;

const SIN_60 = Math.sqrt(3) / 2;

export function projectIso(x: number, y: number, z: number) {
  return { x: COS_45 * (x + y), y: HALF_COS_45 * (y - x) - SIN_60 * z };
}

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

export const easeInOut = (value: number) =>
  value < 0.5 ? 4 * value * value * value : 1 - (-2 * value + 2) ** 3 / 2;

export const span = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start));
