import * as stylex from "@stylexjs/stylex";

export const hue = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  tint: "#e6ecf7",
  page: "#f3f5fa",
  navy: "#0b2a5c",
  navyScrim: "rgba(6, 28, 66, 0.84)",
  mint: "#8cd6a3",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  hairline: "rgba(26, 26, 26, 0.12)",
  hairlineOnDark: "rgba(255, 255, 255, 0.2)",
  ghost: "rgba(11, 42, 92, 0.06)",
  onDark: "rgba(255, 255, 255, 0.86)",
  onDarkSoft: "rgba(255, 255, 255, 0.72)",
  barSurface: "rgba(243, 245, 250, 0.92)",
});

export const font = stylex.defineConsts({
  cjk: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  display: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});

export const media = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
});

export const size = stylex.defineConsts({
  header: "80px",
  bar: "56px",
  anchor: "160px",
  inset: "min(124px, 8.611vw)",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  sectionY: "clamp(40px, 5vw, 72px)",
  bandY: "clamp(72px, 8.4vw, 120px)",
});
