import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  desktop: "@media (min-width: 1024px)",
  wide: "@media (min-width: 1280px)",
  short: "@media (min-width: 1024px) and (max-height: 760px)",
  pinned: "@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  still: "@media (min-width: 1024px) and (prefers-reduced-motion: reduce)",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  hover: "@media (hover: hover) and (pointer: fine)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  page: "#f3f5fa",
  plate: "#ffffff",
  tint: "#e6ecf7",
  blue: "#0743a9",
  navy: "#0b2a5c",
  mid: "#294f92",
  hairline: "rgba(11, 42, 92, 0.14)",
  rule: "rgba(26, 26, 26, 0.16)",
  pencil: "rgba(26, 26, 26, 0.44)",
  graphite: "rgba(26, 26, 26, 0.58)",
  wet: "rgba(7, 67, 169, 0.06)",
  wetEdge: "rgba(7, 67, 169, 0.5)",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  latin: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, "Times New Roman", serif',
});

export const chrome = stylex.defineConsts({
  header: "80px",
  stage: "calc(100svh - 80px)",
  inset: "min(120px, 8.333vw)",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});
