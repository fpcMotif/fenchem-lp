import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { font, hue, media, size } from "./theme.stylex";

export const base = stylex.create({
  root: {
    backgroundColor: hue.page,
    color: hue.ink,
    fontFamily: font.cjk,
    overflowX: "clip",
  },
  section: {
    position: "relative",
    isolation: "isolate",
    paddingBlock: size.sectionY,
  },
  shell: {
    position: "relative",
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 20, [media.tablet]: 40, [breakpoints.xl]: size.inset },
  },
  anchor: {
    scrollMarginTop: size.anchor,
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
  focus: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
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
});

export const ty = stylex.create({
  headline: {
    margin: 0,
    fontSize: "clamp(30px, 3.6vw, 52px)",
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.02em",
    color: hue.ink,
    textWrap: "balance",
  },
  serif: {
    margin: 0,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 20, [breakpoints.lg]: 24 },
    lineHeight: 1.3,
    color: hue.body,
  },
  body: {
    margin: 0,
    maxWidth: "36em",
    fontSize: { default: 16, [breakpoints.lg]: 17 },
    fontWeight: 400,
    lineHeight: 1.9,
    letterSpacing: "0.03em",
    color: hue.body,
    textWrap: "pretty",
  },
  quiet: {
    margin: 0,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.05em",
    color: hue.body,
  },
});

export const btn = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    minHeight: 52,
    paddingInline: 28,
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 0,
    fontFamily: font.cjk,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textDecoration: "none",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.98)" },
    },
    transitionProperty: "transform",
    transitionDuration: "160ms",
    transitionTimingFunction: size.ease,
  },
  accent: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  outline: {
    backgroundColor: "transparent",
    boxShadow: `inset 0 0 0 1px ${hue.ink}`,
    color: hue.ink,
  },
});
