import * as stylex from "@stylexjs/stylex";

export const color = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  page: "#f3f5fa",
  navy: "#0b2a5c",
  mint: "#8cd6a3",
  glyphBlue: "#d9e2f2",
  glyphSand: "#ebdfc4",
  glyphGreen: "#d6e6ca",
  hairline: "rgba(26, 26, 26, 0.12)",
  blueTrack: "rgba(7, 67, 174, 0.14)",
  greenTrack: "rgba(100, 167, 51, 0.26)",
  onNavy: "rgba(255, 255, 255, 0.86)",
  onNavySoft: "rgba(255, 255, 255, 0.66)",
  onNavyTrack: "rgba(255, 255, 255, 0.16)",
});

export const font = stylex.defineConsts({
  cjk: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  display: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
});

export const space = stylex.defineConsts({
  shellMax: "1440px",
  startSm: "36px",
  startMd: "76px",
  startLg: "160px",
  startXl: "216px",
  endSm: "20px",
  endMd: "40px",
  endLg: "56px",
  endXl: "min(96px, 6.67vw)",
  sectionSm: "40px",
  sectionMd: "56px",
  sectionLg: "64px",
  sectionXl: "72px",
  bandSm: "72px",
  bandLg: "104px",
  bandXl: "128px",
  anchor: "152px",
});

export const media = stylex.defineConsts({
  mdOnly: "@media (min-width: 768px) and (max-width: 1023.98px)",
  lgOnly: "@media (min-width: 1024px) and (max-width: 1279.98px)",
  midToXl: "@media (min-width: 768px) and (max-width: 1279.98px)",
});

export const ease = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});
