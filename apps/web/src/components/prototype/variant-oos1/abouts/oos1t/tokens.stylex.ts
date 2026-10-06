import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  phone: "@media (max-width: 767.98px)",
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  tabletUp: "@media (min-width: 768px)",
  desktop: "@media (min-width: 1024px)",
  laptop: "@media (min-width: 1024px) and (max-width: 1279.98px)",
  wide: "@media (min-width: 1280px)",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  hover: "@media (hover: hover) and (pointer: fine)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  quiet: "rgba(26, 26, 26, 0.56)",
  ground: "#eef2f9",
  face: "#ffffff",
  tint: "#e6ecf7",
  blue: "#0743a9",
  navy: "#0b2a5c",
  line: "rgba(11, 42, 92, 0.16)",
  lineSoft: "rgba(11, 42, 92, 0.09)",
  edge: "rgba(11, 42, 92, 0.1)",
  shade: "rgba(11, 42, 92, 0.2)",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  latin: '"Inter Tight", "Noto Sans SC", sans-serif',
  serif: '"Instrument Serif", Georgia, "Times New Roman", serif',
});

const REDUCE = "@media (prefers-reduced-motion: reduce)";
const TABLET = "@media (min-width: 768px) and (max-width: 1023.98px)";
const DESKTOP = "@media (min-width: 1024px)";

export const sun = stylex.defineVars({
  deg: { default: "72", [REDUCE]: "48" },
  ux: { default: "2.2825", [REDUCE]: "1.172" },
  uy: { default: "0.7416", [REDUCE]: "1.0552" },
  len: { default: "2.4", [REDUCE]: "1.577" },
  day: { default: "0.3", [REDUCE]: "0.533" },
  scale: { default: "0.5", [TABLET]: "0.8", [DESKTOP]: "1" },
  live: { default: "0", [TABLET]: "1", [DESKTOP]: "1" },
  heroFont: {
    default: "clamp(36px, 10.4vw, 46px)",
    [TABLET]: "clamp(52px, 8.4vw, 72px)",
    [DESKTOP]: "clamp(60px, min(calc((100svh - 80px) * 0.106), 7.4vw), 116px)",
  },
  closingFont: {
    default: "clamp(30px, 8.6vw, 38px)",
    [TABLET]: "48px",
    [DESKTOP]: "clamp(48px, 4.6vw, 66px)",
  },
});

export const chrome = stylex.defineConsts({
  header: "80px",
  anchor: "104px",
  inset: "min(120px, 8.333vw)",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});
