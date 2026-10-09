import * as stylex from "@stylexjs/stylex";
import { media, tone } from "./tokens.stylex";

const HEADER_HEIGHT = 80;

const BAR_HEIGHT = 48;

export const ui = stylex.create({
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.indigo,
    outlineOffset: 3,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [media.tablet]: 40, [media.wide]: "min(124px, 8.6vw)" },
  },
  anchor: {
    scrollMarginTop: HEADER_HEIGHT + BAR_HEIGHT + 8,
  },
  section: {
    position: "relative",
    paddingBlock: { default: 84, [media.tablet]: 112, [media.wide]: 144 },
  },
  caption: {
    margin: 0,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: tone.label,
  },
});
