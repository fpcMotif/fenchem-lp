import * as stylex from "@stylexjs/stylex";

export const palette = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  tint: "#e6ecf7",
  page: "#f3f5fa",
  mint: "#8cd6a3",
  navy: "#0b2a5c",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  inkHair: "rgba(26, 26, 26, 0.07)",
  inkRule: "rgba(26, 26, 26, 0.12)",
  blueLine: "rgba(7, 67, 174, 0.4)",
  paleHair: "rgba(255, 255, 255, 0.1)",
  paleRule: "rgba(255, 255, 255, 0.2)",
  paleText: "rgba(255, 255, 255, 0.78)",
  glass: "rgba(255, 255, 255, 0.94)",
  shade: "rgba(6, 28, 66, 0.96)",
});

export const fonts = stylex.defineConsts({
  cjk: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  display: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});

export const media = stylex.defineConsts({
  mdOnly: "@media (min-width: 768px) and (max-width: 1023.98px)",
  lgOnly: "@media (min-width: 1024px) and (max-width: 1279.98px)",
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  smBelowLg: "@media (min-width: 640px) and (max-width: 1023.98px)",
});

export const ease = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});

export const metrics = stylex.defineConsts({
  anchor: "132px",
});
