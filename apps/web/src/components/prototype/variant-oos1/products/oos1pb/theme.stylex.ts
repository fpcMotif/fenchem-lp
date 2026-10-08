import * as stylex from "@stylexjs/stylex";

export const ink = stylex.defineConsts({
  primary: "#1a1a1a",
  body: "#4d4d4d",
  muted: "#6b6b70",
  disabled: "#a8a2a6",
});

export const matrix = stylex.defineConsts({
  ground: "#f4f6ff",
  rule: "#dce2f4",
  column: "#e9edfd",
  raised: "#ffffff",
});

export const blush = stylex.defineConsts({
  ground: "#fff8fb",
  rule: "#f0dfe7",
  hover: "#fcedf3",
  paper: "#ffffff",
  edge: "#ecdbe3",
});

export const font = stylex.defineConsts({
  body: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  serif: '"Instrument Serif", "Times New Roman", serif',
  numeral: '"Inter Tight", "Noto Sans SC", sans-serif',
});

export const mq = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  mdOnly: "@media (min-width: 768px) and (max-width: 1023.98px)",
});

export const layout = stylex.defineConsts({
  inset: "min(120px, 8.333vw)",
  easeOut: "cubic-bezier(0.22, 1, 0.36, 1)",
});
