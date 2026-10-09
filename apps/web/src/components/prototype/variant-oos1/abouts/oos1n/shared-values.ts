import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { font, motionCss, step, tone, vessel } from "./tokens.stylex";

const lift = stylex.keyframes({
  "0%": { clipPath: "inset(0 0 0 0)" },
  "100%": { clipPath: "inset(0 0 100% 0)" },
});

export const ui = stylex.create({
  root: {
    backgroundColor: tone.page,
    color: tone.ink,
    fontFamily: font.cjk,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: { default: 16, [breakpoints.md]: 40, [breakpoints.xl]: "min(124px, 8.611vw)" },
  },
  section: {
    scrollMarginTop: 140,
    paddingBlock: { default: 40, [breakpoints.md]: 64, [breakpoints.xl]: 76 },
  },
  onPage: {
    backgroundColor: tone.page,
  },
  onPaper: {
    backgroundColor: colors.paper,
  },
  onNavy: {
    backgroundColor: tone.navy,
    color: colors.paper,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    fontWeight: 400,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.lg]: 32, [breakpoints.xl]: 40 },
    rowGap: { default: 40, [breakpoints.lg]: 0 },
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  figure: {
    margin: 0,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  caption: {
    marginTop: 12,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.quiet,
  },
  reveal: {
    opacity: { default: 1, [breakpoints.motionOk]: 0 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(24px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: motionCss.out,
  },
  revealShown: {
    opacity: 1,
    transform: "none",
  },
  arch: {
    overflow: "hidden",
    borderTopLeftRadius: vessel.rim,
    borderTopRightRadius: vessel.rim,
    backgroundColor: tone.tint,
  },
  veil: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: tone.tint,
    clipPath: "inset(0 0 100% 0)",
    pointerEvents: "none",
  },
  veilOnLoad: {
    animationName: { default: null, [breakpoints.motionOk]: lift },
    animationDuration: "900ms",
    animationDelay: "250ms",
    animationTimingFunction: motionCss.out,
    animationFillMode: "backwards",
  },
  veilOnView: {
    clipPath: { default: "inset(0 0 100% 0)", [breakpoints.motionOk]: "inset(0 0 0 0)" },
    transitionProperty: "clip-path",
    transitionDuration: { default: "0ms", [breakpoints.motionOk]: "900ms" },
    transitionTimingFunction: motionCss.out,
  },
  veilLifted: {
    clipPath: "inset(0 0 100% 0)",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    paddingInline: 28,
    borderWidth: 0,
    borderRadius: 2,
    fontFamily: font.cjk,
    fontSize: step.body,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textDecoration: "none",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.98)" },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: motionCss.out,
  },
  buttonPrimary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 2px ${colors.paper}, 0 0 0 4px ${colors.brandBlue700}`,
    },
    color: colors.paper,
  },
  buttonQuiet: {
    backgroundColor: { default: "transparent", ":hover": tone.tint },
    boxShadow: `inset 0 0 0 1px ${tone.hairlineStrong}`,
    color: tone.ink,
  },
});
