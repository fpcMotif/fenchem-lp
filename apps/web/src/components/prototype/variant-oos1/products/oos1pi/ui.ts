import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { font, media, tone } from "./tokens.stylex";

export const ui = stylex.create({
  section: {
    paddingTop: { default: 64, [breakpoints.xl]: 96 },
    paddingBottom: { default: 72, [breakpoints.xl]: 112 },
    scrollMarginTop: 80,
    color: tone.ink,
    fontFamily: font.body,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [media.tablet]: 40, [breakpoints.xl]: "min(120px, 8.333vw)" },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 28, [breakpoints.xl]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [media.tablet]: "36px", [breakpoints.xl]: "40px" },
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: tone.ink,
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
    outlineOffset: 2,
  },
});
