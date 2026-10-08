import * as stylex from "@stylexjs/stylex";

export const media = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  desktop: "@media (min-width: 1280px)",
  table: "@media (min-width: 768px)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  muted: "#6b6b70",
  paper: "#ffffff",
  catalogGround: "#eff9f6",
  catalogRule: "#d3e7e0",
  solutionsGround: "#f6fcfc",
  solutionsRule: "#dbeaea",
  sheetEdge: "#d3e3e3",
  control: "#b9cdcd",
  track: "rgba(18, 82, 70, 0.075)",
  disabled: "#9aa6a6",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  numeral: '"Inter Tight", "Noto Sans SC", sans-serif',
});

export const chrome = stylex.defineConsts({
  header: "80px",
  groupTop: "124px",
  railTop: "112px",
  inset: "min(120px, 8.333vw)",
});
