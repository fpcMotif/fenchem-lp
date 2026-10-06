import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  desktop: "@media (min-width: 1024px)",
  laptop: "@media (min-width: 1024px) and (max-width: 1279.98px)",
  wide: "@media (min-width: 1280px)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  hoverMotion:
    "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  page: "#f3f5fa",
  navy: "#0b2a5c",
  onGlass: "#262a33",
  hairline: "rgba(26, 26, 26, 0.1)",
});

export const face = stylex.defineConsts({
  sans: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  etched:
    '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  serif: '"Instrument Serif", Georgia, "Times New Roman", serif',
});

export const pane = stylex.defineConsts({
  fill: "linear-gradient(160deg, rgba(255, 255, 255, 0.8) 0%, rgba(244, 246, 251, 0.66) 100%)",
  blur: "blur(26px) saturate(160%)",
  edge: "rgba(255, 255, 255, 0.72)",
  shadow: "inset 0 1px 0 rgba(255, 255, 255, 0.85), 0 48px 96px -56px rgba(11, 42, 92, 0.5)",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});

export const chrome = stylex.defineConsts({
  header: "80px",
  index: "48px",
  total: "128px",
  anchor: "144px",
  pin: "max(520px, calc(100svh - 128px))",
  pinLift: "calc(-1 * max(520px, calc(100svh - 128px)))",
  inset: "min(120px, 8.333vw)",
});
