import * as stylex from "@stylexjs/stylex";

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  tint: "#e6ecf7",
  page: "#f3f5fa",
  warm: "#faf8f4",
  hairline: "rgba(26, 26, 26, 0.12)",
  hairlineStrong: "rgba(26, 26, 26, 0.28)",
  plate: "rgba(26, 26, 26, 0.06)",
});

export const font = stylex.defineConsts({
  cjk: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
  latin: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
});

export const step = stylex.defineConsts({
  label: "13px",
  body: "16px",
  lead: "20px",
  title: "28px",
  display: "44px",
  large: "72px",
  huge: "112px",
});

export const motionCss = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  shutter: "cubic-bezier(0.65, 0, 0.2, 1)",
});

export const range = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  wide: "@media (min-width: 1024px)",
});

export const slit = stylex.defineConsts({
  openingClosed: "inset(43% 0% 55.4% 0%)",
  openingOpen: "inset(0% 0% 0% 0%)",
  closingOpen: "inset(0% 0% 0% 0%)",
  closingShut: "inset(91.2% 0% 6% 0%)",
});
