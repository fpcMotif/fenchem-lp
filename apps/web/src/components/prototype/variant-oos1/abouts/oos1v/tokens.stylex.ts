import * as stylex from "@stylexjs/stylex";

export const media = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  desktop: "@media (min-width: 1024px)",
  wide: "@media (min-width: 768px)",
  hover: "@media (hover: hover) and (pointer: fine)",
  reduce: "@media (prefers-reduced-motion: reduce)",
});

export const tone = stylex.defineConsts({
  paper: "#faf8f4",
  ink: "#1a1a1a",
  body: "#4d4d4d",
  pencil: "#5f5f5f",
  prussian: "#0a2758",
  cobalt: "#3a6c99",
  wash: "#d9e5ee",
  light: "#ffffff",
  lightText: "rgba(250, 248, 244, 0.86)",
  lightQuiet: "rgba(250, 248, 244, 0.78)",
  hairline: "rgba(26, 26, 26, 0.12)",
  leader: "rgba(26, 26, 26, 0.28)",
  stem: "rgba(10, 39, 88, 0.3)",
});

export const font = stylex.defineConsts({
  sans: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  display: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});

export const curve = stylex.defineConsts({
  develop: "cubic-bezier(0.45, 0, 0.2, 1)",
  tide: "cubic-bezier(0.3, 0.1, 0.3, 1)",
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});
