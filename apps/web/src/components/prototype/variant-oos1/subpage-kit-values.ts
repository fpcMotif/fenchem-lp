import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { color, font, layout, media } from "./tokens.stylex";

const DESKTOP = breakpoints.xl;

export const kitStyles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    color: color.ink,
    fontFamily: font.body,
    minHeight: "100vh",
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset120: {
    paddingInline: { default: 16, [media.tablet]: 40, [DESKTOP]: layout.inset120 },
  },
  anchor: {
    scrollMarginTop: `calc(${layout.headerHeight} + ${layout.subBarHeight} + 24px)`,
  },
  section: {
    paddingBlock: { default: 72, [DESKTOP]: 112 },
  },
  sectionAlt: {
    backgroundColor: "#f3f5fa",
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
});
