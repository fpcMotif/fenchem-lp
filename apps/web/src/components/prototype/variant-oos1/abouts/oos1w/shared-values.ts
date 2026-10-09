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
      [bp.tablet]: "repeat(8, minmax(0, 1fr))",
      [bp.desktop]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 12, [bp.tablet]: 20, [bp.desktop]: 24 },
  },
  section: {
    scrollMarginTop: chrome.header,
    paddingBlock: { default: 72, [bp.tablet]: 104, [bp.desktop]: 136 },
  },
  ruled: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.rule,
    paddingTop: { default: 20, [bp.desktop]: 24 },
  },
  headCol: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "1 / span 3" },
  },
  bodyCol: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "4 / -1" },
  },
  micro: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: tone.body,
  },
  english: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: "0.01em",
    color: tone.body,
  },
  note: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.7,
    color: tone.body,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.blue,
    outlineOffset: 3,
  },
});

export const srOnly = stylex.props(ui.srOnly);
