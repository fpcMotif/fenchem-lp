import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  phone: "@media (max-width: 767.98px)",
  wide: "@media (min-width: 768px)",
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  desktop: "@media (min-width: 1024px)",
  wideMotion: "@media (min-width: 768px) and (prefers-reduced-motion: no-preference)",
  wideStill: "@media (min-width: 768px) and (prefers-reduced-motion: reduce)",
  hoverMotion:
    "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  page: "#ffffff",
  mist: "#f6f6f6",
  tint: "#e6ecf7",
  blue: "#0743a9",
  navy: "#0b2a5c",
  hairline: "rgba(11, 42, 92, 0.16)",
  onNavy: "#ffffff",
  onNavyQuiet: "rgba(255, 255, 255, 0.62)",
  onNavyLine: "rgba(255, 255, 255, 0.22)",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  display: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, "Times New Roman", serif',
});

export const scale = stylex.defineConsts({
  title: "clamp(52px, 8.9vw, 128px)",
  titleCounterweight: "calc(clamp(52px, 8.9vw, 128px) * 3 / 8)",
  display: "clamp(34px, 4.45vw, 64px)",
  displayCounterweight: "max(14px, calc(clamp(34px, 4.45vw, 64px) * 3 / 8))",
  heading: "clamp(28px, 2.78vw, 40px)",
  headingCounterweight: "max(13px, calc(clamp(28px, 2.78vw, 40px) * 3 / 8))",
  body: "clamp(16px, 1.25vw, 18px)",
});

export const grid = stylex.defineConsts({
  gutter: "24px",
  margin: "min(120px, 8.333vw)",
  stand: "76px",
  landing: "calc(40vh - 28px)",
  readingLine: "calc(48px + 40vh)",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});
