import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  laptop: "@media (min-width: 1024px) and (max-width: 1279.98px)",
  wide: "@media (min-width: 1280px)",
  abovePhone: "@media (min-width: 768px)",
  desktop: "@media (min-width: 1024px)",
  pin: "@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  hoverMotion:
    "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  page: "#f6f6f6",
  white: "#ffffff",
  tint: "#e6ecf7",
  brand: "#0743a9",
  navy: "#0b2a5c",
  timeLine: "rgba(11, 42, 92, 0.085)",
  hairline: "rgba(11, 42, 92, 0.16)",
  frameNumber: "rgba(11, 42, 92, 0.56)",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  latin: '"Inter Tight", "Inter", system-ui, sans-serif',
  serif: '"Instrument Serif", Georgia, "Times New Roman", serif',
});

export const chrome = stylex.defineConsts({
  header: "80px",
  anchor: "104px",
  inset: "min(120px, 8.333vw)",
});
