import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  phone: "@media (max-width: 767.98px)",
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  tabletUp: "@media (min-width: 768px)",
  desktop: "@media (min-width: 1024px)",
  laptop: "@media (min-width: 1024px) and (max-width: 1279.98px)",
  wide: "@media (min-width: 1280px)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  pin: "@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  still: "@media (min-width: 1024px) and (prefers-reduced-motion: reduce)",
  hoverFine: "@media (hover: hover) and (pointer: fine)",
});

export const tone = stylex.defineConsts({
  paper: "#ffffff",
  mist: "#f3f5fa",
  tint: "#e6ecf7",
  tintDeep: "#d2dcee",
  ink: "#1a1a1a",
  body: "#4d4d4d",
  navy: "#0b2a5c",
  blue: "#0743a9",
  line: "rgba(11, 42, 92, 0.88)",
  guide: "rgba(11, 42, 92, 0.5)",
  rule: "rgba(11, 42, 92, 0.16)",
  faint: "rgba(11, 42, 92, 0.08)",
  muted: "rgba(11, 42, 92, 0.62)",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  latin: '"Inter Tight", "Noto Sans SC", system-ui, sans-serif',
  serif: '"Instrument Serif", Georgia, "Times New Roman", serif',
});

export const chrome = stylex.defineConsts({
  header: "80px",
  anchor: "104px",
  stage: "calc(100svh - 80px)",
  gutter: "min(120px, 8.333vw)",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});
