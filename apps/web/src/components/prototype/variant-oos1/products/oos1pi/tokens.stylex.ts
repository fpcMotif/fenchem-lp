import * as stylex from "@stylexjs/stylex";

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  muted: "#6b6b70",
  catalogGround: "#f8fbf2",
  catalogRule: "#e1e8d6",
  catalogRuleStrong: "#c3cdb4",
  solutionsGround: "#f7fefb",
  solutionsTint: "#e9f5ef",
  solutionsHover: "#eff9f4",
  solutionsRule: "#dbe7e1",
  paper: "#ffffff",
  paperEdge: "#d5e1db",
  paperRule: "#e7eeea",
});

export const font = stylex.defineConsts({
  body: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  serif: '"Instrument Serif", "Times New Roman", serif',
  numeral: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
});

export const media = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  phoneMotion: "@media (max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
});

export const motionCss = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});
