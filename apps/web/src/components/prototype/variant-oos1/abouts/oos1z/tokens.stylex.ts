import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  phone: "@media (max-width: 767.98px)",
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  desktop: "@media (min-width: 1024px)",
  laptop: "@media (min-width: 1024px) and (max-width: 1279.98px)",
  wide: "@media (min-width: 1280px)",
  corridor: "@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  still: "@media (min-width: 1024px) and (prefers-reduced-motion: reduce)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  hover: "@media (hover: hover) and (pointer: fine)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  navy: "#0b2a5c",
  blue: "#0743a9",
  dusk: "#294f92",
  tint: "#e6ecf7",
  mist: "#f3f5fa",
  stone: "#f6f6f6",
  paper: "#ffffff",
  line: "rgba(11, 42, 92, 0.22)",
  lineSoft: "rgba(11, 42, 92, 0.12)",
  lineStrong: "rgba(11, 42, 92, 0.56)",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  latin: '"Inter Tight", "Noto Sans SC", "PingFang SC", sans-serif',
  serif: '"Instrument Serif", Georgia, "Times New Roman", serif',
});

export const chrome = stylex.defineConsts({
  header: "80px",
  stage: "max(560px, calc(100svh - 80px))",
  track: "900svh",
  lakeWrap: "calc(max(560px, calc(100svh - 80px)) + 70svh)",
  lakeLift: "calc(-1 * (max(560px, calc(100svh - 80px)) + 70svh))",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});
