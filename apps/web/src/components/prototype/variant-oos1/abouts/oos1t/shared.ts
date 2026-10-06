import * as stylex from "@stylexjs/stylex";

import { bp, chrome, face, tone } from "./tokens.stylex";

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
    paddingInline: { default: 20, [bp.tablet]: 40, [bp.desktop]: chrome.inset },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(4, minmax(0, 1fr))",
      [bp.tablet]: "repeat(6, minmax(0, 1fr))",
      [bp.desktop]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 16, [bp.tablet]: 20, [bp.desktop]: 24 },
  },
  section: {
    position: "relative",
    scrollMarginTop: chrome.anchor,
    paddingTop: { default: 96, [bp.tablet]: 128, [bp.desktop]: 168 },
  },
  plate: {
    position: "relative",
  },
  face: {
    position: "relative",
    zIndex: 1,
  },
  fill: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  eyebrow: {
    margin: 0,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 18, [bp.desktop]: 20 },
    lineHeight: 1.3,
    color: tone.quiet,
  },
  body: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.85,
    color: tone.body,
    textWrap: "pretty",
  },
  focus: {
    outlineWidth: { default: 0, ":focus-visible": 2 },
    outlineStyle: "solid",
    outlineColor: tone.blue,
    outlineOffset: 4,
  },
});

export const srOnly = stylex.props(ui.srOnly);
