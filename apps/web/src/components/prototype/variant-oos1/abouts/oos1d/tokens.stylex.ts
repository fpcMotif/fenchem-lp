import * as stylex from "@stylexjs/stylex";

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  quiet: "#6b7079",
  tint: "#e6ecf7",
  page: "#f3f5fa",
  navy: "#0b2a5c",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  hairline: "rgba(26, 26, 26, 0.12)",
  hairlineStrong: "rgba(26, 26, 26, 0.28)",
  onNavy: "rgba(255, 255, 255, 0.84)",
  navyRule: "rgba(255, 255, 255, 0.2)",
});

export const font = stylex.defineConsts({
  cjk: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});

export const step = stylex.defineConsts({
  label: "13px",
  body: "16px",
  lead: "20px",
  title: "26px",
  display: "42px",
  large: "68px",
  huge: "110px",
});

export const motionCss = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});
