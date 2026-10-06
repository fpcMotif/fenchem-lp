import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  tabletUp: "@media (min-width: 768px)",
  plateStack: "@media (min-width: 768px) and (max-width: 1399.98px)",
  plateSide: "@media (min-width: 1400px)",
  desktop: "@media (min-width: 1024px)",
  laptop: "@media (min-width: 1024px) and (max-width: 1279.98px)",
  wide: "@media (min-width: 1280px)",
  pinned:
    "@media (min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)",
  desktopStill:
    "@media (min-width: 1024px) and (max-height: 639.98px), (min-width: 1024px) and (prefers-reduced-motion: reduce)",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  hoverMotion:
    "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  paper: "#ffffff",
  mist: "#f3f5fa",
  tint: "#e6ecf7",
  blue: "#0743a9",
  navy: "#0b2a5c",
  hairline: "rgba(11, 42, 92, 0.16)",
  faint: "rgba(11, 42, 92, 0.08)",
  halo: "0 0 3px #ffffff, 0 0 6px #ffffff, 0 0 10px #ffffff",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  latin: '"Inter Tight", "Noto Sans SC", "PingFang SC", sans-serif',
  serif: '"Instrument Serif", Georgia, "Times New Roman", serif',
});

export const chrome = stylex.defineConsts({
  header: "80px",
  stage: "calc(100svh - 80px)",
  stageLift: "calc(80px - 100svh)",
  inset: "min(120px, 8.333vw)",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});
