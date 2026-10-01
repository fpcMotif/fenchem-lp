const DROP_CQW = 12.28;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function wipeClip(progress: number): string {
  const p = clamp01(progress);
  if (p >= 0.999) return "none";
  const front = (p * 100).toFixed(2);
  const left = `calc(${front}% + ${(p * DROP_CQW).toFixed(3)}cqw)`;
  const right = `calc(${front}% - ${((1 - p) * DROP_CQW).toFixed(3)}cqw)`;
  return `polygon(0 0, 100% 0, 100% ${right}, 0 ${left})`;
}
