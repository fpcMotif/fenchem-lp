import * as stylex from "@stylexjs/stylex";

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  page: "#f3f5fa",
  navy: "#0b2a5c",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  hairline: "rgba(26, 26, 26, 0.14)",
  seam: "rgba(26, 26, 26, 0.32)",
  onNavy: "rgba(255, 255, 255, 0.78)",
  onNavyMuted: "rgba(255, 255, 255, 0.64)",
  onNavyLine: "rgba(255, 255, 255, 0.2)",
  placeholder: "#e8ecf3",
});

export const face = stylex.defineConsts({
  cjk: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  latin: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});

export const mq = stylex.defineConsts({
  pin: "@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  snap: "@media (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
  track: "@media (prefers-reduced-motion: no-preference)",
  stack: "@media (prefers-reduced-motion: reduce)",
  stackWide: "@media (min-width: 640px) and (prefers-reduced-motion: reduce)",
  mid: "@media (min-width: 640px) and (max-width: 1023.98px)",
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
});

export const stage = stylex.defineConsts({
  height: "max(600px, calc(100svh - 128px))",
  row: "max(440px, calc(100svh - 264px))",
  photo: "calc(max(440px, calc(100svh - 264px)) - 56px)",
});

export const ease = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});
