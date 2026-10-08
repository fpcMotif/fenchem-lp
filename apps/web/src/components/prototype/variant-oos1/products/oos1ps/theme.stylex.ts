import * as stylex from "@stylexjs/stylex";

export const ink = stylex.defineConsts({
  primary: "#1a1a1a",
  body: "#4d4d4d",
  muted: "#6b6b70",
  faint: "#8c8c92",
});

export const catalogTone = stylex.defineConsts({
  ground: "#fff8f6",
  selected: "#fcefea",
  rule: "#efdfd9",
  strip: "#ffffff",
  stripRule: "#ead9d2",
  chipRule: "#e3d2cb",
  boxRule: "#8c8c92",
  boxDisabled: "#f4ecea",
  boxDisabledRule: "#d6cac5",
});

export const sheetTone = stylex.defineConsts({
  ground: "#fffbf9",
  paper: "#ffffff",
  edge: "#e9dcd6",
  edgeStrong: "#d9c8c1",
  rule: "#f0e6e1",
  gutter: "#f7eeea",
});

export const font = stylex.defineConsts({
  body: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  numeral: '"Inter Tight", "Noto Sans SC", sans-serif',
});

export const mq = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
});

export const layout = stylex.defineConsts({
  inset: "min(120px, 8.333vw)",
  easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
});
