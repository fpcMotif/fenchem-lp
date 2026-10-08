import * as stylex from "@stylexjs/stylex";

export const ui = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  muted: "#6b6b70",
  paper: "#ffffff",
  catalogBand: "#f1f3e3",
  catalogRule: "#d9dcc3",
  catalogTint: "#f9faf2",
  solutionsBand: "#f5f3fd",
  solutionsRule: "#dfdaf0",
  solutionsTint: "#faf9fe",
  disabled: "#a6a6ab",
  sheetShadow: "0 1px 2px rgba(44, 34, 92, 0.05)",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});

export const font = stylex.defineConsts({
  body: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  serif: '"Instrument Serif", "Times New Roman", serif',
  numeral: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
});

export const mq = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  belowMd: "@media (max-width: 767.98px)",
  mdOnly: "@media (min-width: 768px) and (max-width: 1023.98px)",
});
