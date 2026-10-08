import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { font, ink, layout, mq } from "./theme.stylex";

const DESKTOP = breakpoints.xl;

export const frame = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: 80,
    fontFamily: font.body,
    color: ink.primary,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [mq.tablet]: 40, [DESKTOP]: layout.inset },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [mq.tablet]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [mq.tablet]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: ink.primary,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
});
