import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  hover: "@media (hover: hover) and (pointer: fine)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  paper: "#ffffff",
  surface: "#f3f5fa",
  accent: "#0743ae",
  accentSoft: "oklch(0.97 0.014 261.5)",
  accentTint: "oklch(0.93 0.033 261.5)",
  accentLine: "oklch(0.78 0.11 261.5)",
  tintInk: "oklch(0.26 0.035 261.5)",
  tintBody: "oklch(0.44 0.025 261.5)",
  tintMuted: "oklch(0.52 0.02 261.5)",
  tintRule: "oklch(0.424 0.18 261.5 / 0.12)",
  tintRuleSoft: "oklch(0.424 0.18 261.5 / 0.08)",
  tintFill: "oklch(0.965 0.009 261.5)",
  tintHead: "oklch(0.958 0.011 261.5)",
});

export const depth = stylex.defineConsts({
  card: "0 1px 2px rgba(7, 67, 174, 0.04), 0 16px 40px -24px rgba(7, 67, 174, 0.18)",
  lift: "0 1px 3px rgba(7, 67, 174, 0.1)",
  float: "0 2px 6px rgba(7, 26, 74, 0.06), 0 32px 72px -24px rgba(7, 26, 74, 0.32)",
});

export const motion = stylex.defineConsts({
  easeOut: "cubic-bezier(0.23, 1, 0.32, 1)",
  easeInOut: "cubic-bezier(0.77, 0, 0.175, 1)",
});

export const face = stylex.defineConsts({
  display: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", "Times New Roman", "Noto Sans SC", serif',
  body: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
});
