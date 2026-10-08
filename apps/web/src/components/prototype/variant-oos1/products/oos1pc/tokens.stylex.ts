import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  tabletNarrow: "@media (min-width: 768px) and (max-width: 1023.98px)",
  desktop: "@media (min-width: 1024px)",
  wide: "@media (min-width: 1280px)",
  upTablet: "@media (min-width: 768px)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  muted: "#6b6b70",
  disabled: "#9a9aa0",
  cream: "#f9f4e1",
  creamRule: "#e4d9bb",
  mint: "#eefbf7",
  mintRule: "#cfe6de",
  mintWell: "#f3fcf9",
  paper: "#ffffff",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  numeral: '"Inter Tight", "Noto Sans SC", "PingFang SC", sans-serif',
});
