export const PHOTO_INSET = 0.95;

export const GLYPH_SWEEP = 0.35;

export const glyphRise = (rise: number, x: number) =>
  Math.min(1, Math.max(0, rise * (1 + GLYPH_SWEEP) - x * GLYPH_SWEEP));

export function screenWaterline(
  waterline: number,
  width: number,
  height: number,
  imageAspect: number,
) {
  const scaleY = Math.min(1, imageAspect / (width / height));
  return (waterline - 0.5) / (scaleY * PHOTO_INSET) + 0.5;
}
