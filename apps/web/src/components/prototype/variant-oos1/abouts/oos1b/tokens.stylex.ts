import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  desktop: "@media (min-width: 1024px)",
  laptop: "@media (min-width: 1024px) and (max-width: 1279.98px)",
  wide: "@media (min-width: 1280px)",
  upTablet: "@media (min-width: 768px)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  hoverMotion:
    "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  page: "#ffffff",
  wall: "#f6f6f6",
  navy: "#0b2a5c",
  blue: "#0743a9",
  rule: "rgba(11, 42, 92, 0.26)",
  ruleStrong: "rgba(11, 42, 92, 0.62)",
  ruleFaint: "rgba(11, 42, 92, 0.12)",
  quiet: "rgba(11, 42, 92, 0.5)",
  note: "rgba(11, 42, 92, 0.72)",
  bevelOuter: "rgba(11, 42, 92, 0.34)",
  bevelInner: "rgba(11, 42, 92, 0.18)",
  whisper: "#f3f5fa",
  depth2: "#eff3f9",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  latin: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, "Times New Roman", serif',
});

export const motion = stylex.defineConsts({
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});

export const chrome = stylex.defineConsts({
  header: "80px",
  anchor: "104px",
});

export const space = stylex.defineVars({
  step: {
    default: "12px",
    "@media (min-width: 768px) and (max-width: 1023.98px)": "24px",
    "@media (min-width: 1024px) and (max-width: 1279.98px)": "32px",
    "@media (min-width: 1280px)": "40px",
  },
  square: {
    default: "min(358px, calc(100vw - 32px))",
    "@media (min-width: 768px) and (max-width: 1023.98px)": "560px",
    "@media (min-width: 1024px) and (max-width: 1279.98px)": "480px",
    "@media (min-width: 1280px)": "620px",
  },
  mat: {
    default: "16px",
    "@media (min-width: 768px) and (max-width: 1023.98px)": "28px",
    "@media (min-width: 1024px) and (max-width: 1279.98px)": "32px",
    "@media (min-width: 1280px)": "40px",
  },
  matFoot: {
    default: "24px",
    "@media (min-width: 768px) and (max-width: 1023.98px)": "40px",
    "@media (min-width: 1024px) and (max-width: 1279.98px)": "48px",
    "@media (min-width: 1280px)": "60px",
  },
  gutter: {
    default: "16px",
    "@media (min-width: 768px) and (max-width: 1023.98px)": "32px",
    "@media (min-width: 1024px) and (max-width: 1279.98px)": "48px",
    "@media (min-width: 1280px)": "64px",
  },
});
