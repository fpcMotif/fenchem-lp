import * as stylex from "@stylexjs/stylex";

export const color = stylex.defineConsts({
  ink: "#0d1a33",
  inkMuted: "#5a6478",
  inkFaint: "rgba(13, 26, 51, 0.22)",
  royal: "var(--color-brand-blue-700)",
  royalHover: "var(--color-brand-blue-800)",
  royalBright: "#4d8dff",
  deep: "#06245e",
  green: "#64a233",
  surface: "#f3f4f6",
  paper: "#ffffff",
  paperHover: "#e8eefa",
  rule: "rgba(13, 26, 51, 0.12)",
  ruleStrong: "rgba(13, 26, 51, 0.15)",
  hairline: "rgba(13, 26, 51, 0.08)",
  headerRule: "#e6e8ec",
  scrim: "rgba(4, 20, 60, 0.6)",
  scrimClear: "rgba(4, 20, 60, 0)",
  white90: "rgba(255, 255, 255, 0.9)",
  white80: "rgba(255, 255, 255, 0.8)",
  white70: "rgba(255, 255, 255, 0.7)",
  white60: "rgba(255, 255, 255, 0.6)",
  white55: "rgba(255, 255, 255, 0.55)",
  white35: "rgba(255, 255, 255, 0.35)",
  white25: "rgba(255, 255, 255, 0.25)",
  white15: "rgba(255, 255, 255, 0.15)",
  selectionBg: "#cfdcf5",
  selectionInk: "#06245e",
});

export const font = stylex.defineConsts({
  display:
    '"Inter Tight", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
  cjk: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
});

export const layout = stylex.defineConsts({
  shellMax: "1440px",
  insetMobile: "16px",
  insetTablet: "40px",
  insetDesktop: "min(120px, 8.333vw)",
  gutter: "24px",
  sectionPadMobile: "72px",
  sectionPadTablet: "96px",
  sectionPadDesktop: "128px",
  headerHeight: "80px",
});

export const ease = stylex.defineConsts({
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  hover: "160ms",
  fade: "200ms",
});

export const media = stylex.defineConsts({
  tabletUp: "@media (min-width: 768px)",
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
  desktop: "@media (min-width: 1280px)",
  hoverMotion:
    "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
  pin: "@media (min-width: 768px) and (prefers-reduced-motion: no-preference)",
  pinNarrow:
    "@media (min-width: 768px) and (max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
  pinWide: "@media (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  pinTablet:
    "@media (min-width: 768px) and (max-width: 1279.98px) and (prefers-reduced-motion: no-preference)",
  pinDesktop: "@media (min-width: 1280px) and (prefers-reduced-motion: no-preference)",
  reduceTabletUp: "@media (min-width: 768px) and (prefers-reduced-motion: reduce)",
  reduceTablet:
    "@media (min-width: 768px) and (max-width: 1279.98px) and (prefers-reduced-motion: reduce)",
  reduceDesktop: "@media (min-width: 1280px) and (prefers-reduced-motion: reduce)",
});

export const hero = stylex.defineConsts({
  stage: "100svh",
  height: "300svh",
  aboutAnchor: "150svh",
});
