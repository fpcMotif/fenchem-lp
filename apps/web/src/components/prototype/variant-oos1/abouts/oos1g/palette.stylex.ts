import * as stylex from "@stylexjs/stylex";

export const palette = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  tint: "#e6ecf7",
  page: "#f3f5fa",
  paperWarm: "#faf8f4",
  navy: "#0b2a5c",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  hairline: "rgba(26, 26, 26, 0.12)",
  hairlineOnDark: "rgba(255, 255, 255, 0.22)",
  fontBody:
    '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  fontDisplay: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  fontSerif: '"Instrument Serif", Georgia, serif',
  easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
  headerHeight: "80px",
  barHeight: "48px",
});

export const media = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
});
