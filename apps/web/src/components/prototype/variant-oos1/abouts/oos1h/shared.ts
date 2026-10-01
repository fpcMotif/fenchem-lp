import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { font, layout, mq, ui } from "./theme.stylex";

export const shared = stylex.create({
  shell: {
    width: "100%",
    maxWidth: layout.shellMax,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: { default: 16, [mq.tablet]: 40, [breakpoints.xl]: layout.inset },
  },
  section: {
    paddingBlock: { default: 80, [breakpoints.xl]: 144 },
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
  anchor: {
    scrollMarginTop: { default: 140, [breakpoints.xl]: 96 },
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
    fontFamily: font.cjk,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "160ms",
    transitionTimingFunction: layout.easeOut,
  },
  buttonPrimary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  buttonQuiet: {
    backgroundColor: { default: "transparent", ":hover": ui.tint },
    boxShadow: `inset 0 0 0 1px ${ui.hairline}`,
    color: ui.ink,
  },
});
