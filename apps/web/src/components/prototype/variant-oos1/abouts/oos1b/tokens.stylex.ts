import * as stylex from "@stylexjs/stylex";

export const palette = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  quiet: "rgba(26, 26, 26, 0.68)",
  tint: "#e6ecf7",
  page: "#f3f5fa",
  navy: "#0b2a5c",
  mint: "#8cd6a3",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  hairline: "rgba(26, 26, 26, 0.12)",
  rule: "rgba(26, 26, 26, 0.24)",
  lightLine: "rgba(255, 255, 255, 0.28)",
  lightText: "rgba(255, 255, 255, 0.78)",
});

export const fonts = stylex.defineConsts({
  cjk: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  latin: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});

export const media = stylex.defineConsts({
  fold: "@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  fade: "@media (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
  motion: "@media (prefers-reduced-motion: no-preference)",
});

export const layout = stylex.defineConsts({
  inset: "min(124px, 8.611vw)",
  anchorOffset: "156px",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});
