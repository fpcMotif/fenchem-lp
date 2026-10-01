import * as stylex from "@stylexjs/stylex";

export const ui = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  tint: "#e6ecf7",
  page: "#f3f5fa",
  surface: "#f6f6f6",
  paperWarm: "#faf8f4",
  mint: "#8cd6a3",
  navy: "#0b2a5c",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  tick: "rgba(26, 26, 26, 0.45)",
  tickStrong: "rgba(26, 26, 26, 0.78)",
  hairline: "rgba(26, 26, 26, 0.14)",
  hairlineSoft: "rgba(26, 26, 26, 0.08)",
  inkOnDark: "rgba(255, 255, 255, 0.78)",
  plate: "rgba(255, 255, 255, 0.88)",
});

export const font = stylex.defineConsts({
  cjk: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  display: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
  unit: '"Instrument Serif", "Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Georgia, serif',
});

export const mq = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  mdOnly: "@media (min-width: 768px) and (max-width: 1023.98px)",
  smToXl: "@media (min-width: 640px) and (max-width: 1279.98px)",
  shortViewport: "@media (max-height: 799.98px)",
});

export const layout = stylex.defineConsts({
  header: "80px",
  shellMax: "1440px",
  inset: "min(124px, 8.611vw)",
  easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
});
