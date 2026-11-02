import * as stylex from "@octanejs/stylex";

export const color = stylex.defineConsts({
  ink: "#1a1a1a",
  bodyText: "#4d4d4d",
  muted: "#6b7280",
  navyDeep: "#0b2a5c",
});

export const font = stylex.defineConsts({
  display:
    '"Inter Tight", "Helvetica Neue", Arial, "Source Han Sans SC", "Noto Sans SC", sans-serif',
  serifAccent: '"Instrument Serif", Georgia, "Source Han Sans SC", "Noto Sans SC", serif',
  body: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
});

export const texture = stylex.defineConsts({
  grain: `url("data:image/svg+xml,%3Csvg xmlns=http://www.w3.org/2000/svg width=180 height=180%3E%3Cfilter id=n%3E%3CfeTurbulence type=fractalNoise baseFrequency=0.85 numOctaves=2 stitchTiles=stitch/%3E%3C/filter%3E%3Crect width=100%25 height=100%25 filter=url(%23n)/%3E%3C/svg%3E")`,
});

export const layout = stylex.defineConsts({
  headerHeight: "80px",
  subBarHeight: "64px",
  inset120: "min(120px, 8.333vw)",
  inset124: "min(124px, 8.611vw)",
});

export const media = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1279.98px)",
});

export const ease = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
});

export const zIndex = stylex.defineConsts({
  subBar: 30,
  header: 40,
});
