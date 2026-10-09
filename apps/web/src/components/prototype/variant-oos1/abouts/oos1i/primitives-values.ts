import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { font, layout, media, tone } from "./shear.stylex";

export const base = stylex.create({
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: { default: 16, [media.tablet]: 40, [media.desktop]: layout.inset },
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
  quiet: {
    margin: 0,
    fontFamily: font.sans,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.06em",
    lineHeight: 1.6,
    color: tone.body,
  },
  quietOnDark: {
    color: tone.white80,
  },
  headline: {
    margin: 0,
    fontFamily: font.sans,
    fontSize: { default: 22, [media.desktop]: 24 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  prose: {
    margin: 0,
    maxWidth: "36em",
    fontFamily: font.sans,
    fontSize: { default: 15, [media.desktop]: 16 },
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: tone.body,
    textWrap: "pretty",
  },
});
