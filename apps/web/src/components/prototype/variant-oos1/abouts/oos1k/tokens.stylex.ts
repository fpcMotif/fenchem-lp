import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  phone: "@media (max-width: 767.98px)",
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  wideUp: "@media (min-width: 768px)",
  desktop: "@media (min-width: 1024px)",
  laptop: "@media (min-width: 1024px) and (max-width: 1279.98px)",
  wide: "@media (min-width: 1280px)",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  hoverMotion:
    "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
});

export const sky = stylex.defineConsts({
  night: "#081f45",
  navy: "#0b2a5c",
  deep: "#06183a",
  tint: "#e6ecf7",
  star: "#ffffff",
  text: "rgba(230, 236, 247, 0.9)",
  muted: "rgba(230, 236, 247, 0.74)",
  faint: "rgba(230, 236, 247, 0.5)",
  hair: "rgba(230, 236, 247, 0.14)",
  hairStrong: "rgba(230, 236, 247, 0.3)",
  focus: "#ffffff",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  latin: '"Inter Tight", "Noto Sans SC", system-ui, sans-serif',
  serif: '"Instrument Serif", "Noto Sans SC", serif',
});

export const chrome = stylex.defineConsts({
  header: "80px",
  anchor: "104px",
  sky: "calc(100svh - 80px)",
  inset: "min(120px, 8.333vw)",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});
