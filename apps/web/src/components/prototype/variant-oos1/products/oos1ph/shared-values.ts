import * as stylex from "@stylexjs/stylex";
import { chrome, face, media, tone } from "./tokens.stylex";

export const ui = stylex.create({
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
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [media.tablet]: 40, [media.desktop]: chrome.inset },
  },
  section: {
    paddingTop: { default: 64, [media.desktop]: 96 },
    paddingBottom: { default: 72, [media.desktop]: 112 },
    scrollMarginTop: chrome.header,
    fontFamily: face.sans,
    color: tone.ink,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 28, [media.desktop]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [media.tablet]: "36px", [media.desktop]: "40px" },
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: tone.ink,
  },
});
