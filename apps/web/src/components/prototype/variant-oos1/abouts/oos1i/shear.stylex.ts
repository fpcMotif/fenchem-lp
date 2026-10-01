import * as stylex from "@stylexjs/stylex";

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  tint: "#e6ecf7",
  page: "#f3f5fa",
  navy: "#0b2a5c",
  mint: "#8cd6a3",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  rule: "rgba(26, 26, 26, 0.12)",
  blueRule: "rgba(7, 67, 174, 0.28)",
  paleRule: "rgba(255, 255, 255, 0.22)",
  white80: "rgba(255, 255, 255, 0.8)",
});

export const font = stylex.defineConsts({
  sans: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  display: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});

export const media = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  desktop: "@media (min-width: 1280px)",
  hoverMotion:
    "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
});

export const ease = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});

export const layout = stylex.defineConsts({
  inset: "min(124px, 8.611vw)",
  header: "80px",
});

export const shear = stylex.defineConsts({
  drop: "12.28cqw",
  cutTop: "polygon(0 12.28cqw, 100% 0, 100% 100%, 0 100%)",
  cutBoth: "polygon(0 12.28cqw, 100% 0, 100% calc(100% - 12.28cqw), 0 100%)",
});
