import * as stylex from "@stylexjs/stylex";

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  quiet: "rgba(77, 77, 77, 0.88)",
  paper: "#faf8f4",
  paperVeil: "rgba(250, 248, 244, 0.94)",
  tint: "#e6ecf7",
  navy: "#0b2a5c",
  onNavy: "rgba(255, 255, 255, 0.92)",
  onNavyQuiet: "rgba(255, 255, 255, 0.68)",
  navyRule: "rgba(255, 255, 255, 0.16)",
  hairline: "rgba(26, 26, 26, 0.12)",
  hairlineStrong: "rgba(26, 26, 26, 0.3)",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  shade: "rgba(6, 28, 66, 0.94)",
  shadeRule: "rgba(255, 255, 255, 0.24)",
  shadeText: "rgba(255, 255, 255, 0.86)",
});

export const font = stylex.defineConsts({
  cjk: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});

export const step = stylex.defineConsts({
  label: "13px",
  small: "15px",
  body: "16px",
  lead: "18px",
  line: "22px",
  title: "28px",
  display: "44px",
  big: "72px",
  huge: "112px",
});

export const motionCss = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});
