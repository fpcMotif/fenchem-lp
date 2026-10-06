import * as stylex from "@stylexjs/stylex";

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  tint: "#e6ecf7",
  page: "#f3f5fa",
  pageGlass: "rgba(243, 245, 250, 0.92)",
  navy: "#0b2a5c",
  mint: "#8cd6a3",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  hairline: "rgba(26, 26, 26, 0.12)",
  hairlineStrong: "rgba(26, 26, 26, 0.3)",
  scrim: "rgba(6, 28, 66, 0.96)",
  onNavy: "rgba(255, 255, 255, 0.92)",
  navyRule: "rgba(255, 255, 255, 0.28)",
});

export const font = stylex.defineConsts({
  cjk: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});

export const step = stylex.defineConsts({
  label: "12px",
  small: "14px",
  body: "16px",
  lead: "18px",
  title: "22px",
  head: "32px",
});

export const motionCss = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});

export const band = stylex.defineConsts({
  mdToLg: "@media (min-width: 768px) and (max-width: 1023.98px)",
  lgToXl: "@media (min-width: 1024px) and (max-width: 1279.98px)",
  mdToXl: "@media (min-width: 768px) and (max-width: 1279.98px)",
  smToLg: "@media (min-width: 640px) and (max-width: 1023.98px)",
});

export const layout = stylex.defineConsts({
  insetMd: "40px",
  insetXl: "min(124px, 8.611vw)",
  bleedMd: "calc(max(0px, (100vw - 1440px) / 2) + 40px)",
  bleedXl: "calc(max(0px, (100vw - 1440px) / 2) + min(124px, 8.611vw))",
});
