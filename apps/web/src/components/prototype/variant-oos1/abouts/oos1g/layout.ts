import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { media, palette } from "./palette.stylex";

const LG = breakpoints.lg;
const EDGE = "min(72px, 5.2vw)";
const SECTION_PAD_LG = "clamp(64px, 5.6vw, 80px)";

export const layout = stylex.create({
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  split: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "minmax(0, 1fr) minmax(0, 1fr)" },
  },
  padLeft: {
    boxSizing: "border-box",
    paddingBottom: { default: 32, [LG]: 0 },
    paddingInlineStart: { default: 20, [breakpoints.sm]: 28, [media.tablet]: 40, [LG]: EDGE },
    paddingInlineEnd: { default: 20, [breakpoints.sm]: 28, [media.tablet]: 40, [LG]: 48 },
  },
  padRight: {
    boxSizing: "border-box",
    paddingInlineStart: { default: 20, [breakpoints.sm]: 28, [media.tablet]: 40, [LG]: 48 },
    paddingInlineEnd: { default: 20, [breakpoints.sm]: 28, [media.tablet]: 40, [LG]: EDGE },
  },
  padBoth: {
    boxSizing: "border-box",
    paddingInline: { default: 20, [breakpoints.sm]: 28, [media.tablet]: 40, [LG]: EDGE },
  },
  seam: {
    display: "flex",
    flexDirection: "column",
    alignItems: { default: "flex-start", [LG]: "flex-end" },
    textAlign: { default: "start", [LG]: "end" },
  },
  fillBox: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
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
  sectionY: {
    paddingBlock: { default: 44, [media.tablet]: 56, [LG]: SECTION_PAD_LG },
  },
  anchor: {
    scrollMarginTop: 148,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 28, [LG]: 40 },
  },
  label: {
    margin: 0,
    fontFamily: palette.fontBody,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.05em",
    color: palette.body,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 48,
    paddingInline: 24,
    borderWidth: 0,
    borderRadius: 0,
    fontFamily: palette.fontBody,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "160ms",
    transitionTimingFunction: palette.easeOut,
  },
  buttonPrimary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  buttonOutline: {
    backgroundColor: { default: "transparent", ":hover": palette.tint },
    boxShadow: `inset 0 0 0 1px ${colors.brandBlue700}`,
    color: colors.brandBlue700,
  },
});
