import * as stylex from "@stylexjs/stylex";

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  muted: "#6b6b70",
  slate: "#14242b",
  slateText: "#e9eef0",
  slateBody: "#c9d4d8",
  slateMuted: "#a9b7bc",
  slateRule: "rgba(255, 255, 255, 0.12)",
  slateRuleStrong: "rgba(255, 255, 255, 0.28)",
  slateRuleTop: "rgba(233, 238, 240, 0.6)",
  slateEdge: "rgba(255, 255, 255, 0.22)",
  mint: "#f0f5f4",
  mintRule: "#d6e1de",
  mintRuleStrong: "#a3b8b2",
  mintHairline: "#e4ebe9",
  paper: "#ffffff",
  backdrop: "rgba(20, 36, 43, 0.56)",
});

export const font = stylex.defineConsts({
  body: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  numeral: '"Inter Tight", "Noto Sans SC", sans-serif',
});

export const media = stylex.defineConsts({
  md: "@media (min-width: 768px)",
  mdOnly: "@media (min-width: 768px) and (max-width: 1023.98px)",
  lg: "@media (min-width: 1024px)",
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  desktop: "@media (min-width: 1280px)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
});

export const motionCss = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});
