import * as stylex from "@stylexjs/stylex";

export const bp = stylex.defineConsts({
  phone: "@media (max-width: 767.98px)",
  tablet: "@media (min-width: 768px) and (max-width: 1023.98px)",
  desktop: "@media (min-width: 1024px)",
  motionOk: "@media (prefers-reduced-motion: no-preference)",
  motionReduce: "@media (prefers-reduced-motion: reduce)",
  hoverMotion:
    "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
});

export const tone = stylex.defineConsts({
  ink: "#1a1a1a",
  body: "#4d4d4d",
  page: "#ffffff",
  mist: "#f3f5fa",
  tint: "#e6ecf7",
  blue: "#0743a9",
  navy: "#0b2a5c",
  hairline: "rgba(11, 42, 92, 0.12)",
  scrim: "#08142c",
});

export const face = stylex.defineConsts({
  sans: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  latin: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
  serif: '"Instrument Serif", Georgia, "Times New Roman", serif',
});

export const chrome = stylex.defineConsts({
  header: "80px",
  bar: "48px",
  barBottom: "128px",
  inset: "min(120px, 8.333vw)",
  heroTop: "calc(min(24vh, 220px) + 88px)",
  anchor: "calc(152px + min(24vh, 220px))",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
});

export const size = stylex.defineConsts({
  s0Desktop: "clamp(72px, 8.9vw, 128px)",
  s0Tablet: "clamp(64px, 10vw, 104px)",
  s0Phone: "clamp(32px, 10.4vw, 48px)",
  s1Desktop: "clamp(64px, 8.2vw, 124px)",
  s1Tablet: "clamp(56px, 9.2vw, 96px)",
  s1Phone: "clamp(30px, 9.2vw, 44px)",
  s2Desktop: "clamp(56px, 6.6vw, 96px)",
  s2Tablet: "clamp(48px, 7.6vw, 72px)",
  s2Phone: "clamp(26px, 8vw, 36px)",
  s3Desktop: "clamp(44px, 4.8vw, 72px)",
  s3Tablet: "clamp(36px, 5.6vw, 52px)",
  s3Phone: "clamp(22px, 7.2vw, 30px)",
});
