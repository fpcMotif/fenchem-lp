import * as stylex from "@stylexjs/stylex";

export const color = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  muted: "#6a6d74",
  tint: "#e6ecf7",
  page: "#f3f5fa",
  paperWarm: "#faf8f4",
  navy: "#0b2a5c",
  onNavy: "rgba(255, 255, 255, 0.88)",
  onNavyMuted: "rgba(217, 226, 242, 0.8)",
  onNavyQuiet: "rgba(217, 226, 242, 0.6)",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  hairline: "rgba(26, 26, 26, 0.1)",
  lift: "rgba(11, 42, 92, 0.2)",
});

export const font = stylex.defineConsts({
  cjk: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  display:
    '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});

export const media = stylex.defineConsts({
  mdUp: "@media (min-width: 768px)",
  md: "@media (min-width: 768px) and (max-width: 1023.98px)",
  lgUp: "@media (min-width: 1024px)",
  xlUp: "@media (min-width: 1280px)",
  stack: "@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
});

export const metric = stylex.defineConsts({
  header: "80px",
  rail: "52px",
  pin: "132px",
  flowAnchor: "144px",
  sheetMax: "1392px",
});
