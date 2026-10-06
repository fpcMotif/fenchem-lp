import * as stylex from "@stylexjs/stylex";

export const media = stylex.defineConsts({
  phone: "@media (max-width: 767.98px)",
  tablet: "@media (min-width: 768px) and (max-width: 1179.98px)",
  wide: "@media (min-width: 1180px)",
  aboveTablet: "@media (min-width: 768px)",
  belowWide: "@media (max-width: 1179.98px)",
  hoverMotion:
    "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  label: "#666666",
  page: "#f3f5fa",
  warm: "#faf8f4",
  paper: "#ffffff",
  indigo: "rgb(48, 54, 97)",
  indigoDeep: "#22264a",
  hairline: "rgba(48, 54, 97, 0.16)",
  thread: "rgba(48, 54, 97, 0.55)",
  seam: "rgba(48, 54, 97, 0.32)",
  photoEdge: "rgba(26, 26, 26, 0.08)",
});

export const curve = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});

export const type = stylex.defineConsts({
  sans: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  display: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});
