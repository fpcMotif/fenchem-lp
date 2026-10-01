import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ease, face, mq, tone } from "./tokens.stylex";

export const ui = stylex.create({
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: { default: 16, [mq.tablet]: 40, [mq.xl]: "min(124px, 8.611vw)" },
  },
  section: {
    paddingBlock: { default: 48, [mq.md]: 64, [mq.xl]: 80 },
  },
  anchor: {
    scrollMarginTop: 144,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  focusRingOnNavy: {
    outlineColor: colors.paper,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    paddingInline: 28,
    borderWidth: 0,
    borderRadius: 0,
    fontFamily: face.cjk,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color, color, box-shadow",
    transitionDuration: "200ms",
    transitionTimingFunction: ease.out,
  },
  buttonPrimary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    boxShadow: {
      default: `inset 0 0 0 1px ${tone.hairline}`,
      ":hover": `inset 0 0 0 1px ${tone.ink}`,
    },
    color: tone.ink,
  },
  textLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: face.cjk,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: tone.ink,
    textDecorationLine: "underline",
    textDecorationColor: { default: tone.hairline, ":hover": tone.ink },
    textUnderlineOffset: 6,
    cursor: "pointer",
    transitionProperty: "text-decoration-color",
    transitionDuration: "200ms",
    transitionTimingFunction: ease.out,
  },
  textLinkOnNavy: {
    color: colors.paper,
    textDecorationColor: { default: tone.onNavyLine, ":hover": colors.paper },
  },
});
