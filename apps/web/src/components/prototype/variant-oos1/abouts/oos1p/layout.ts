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
    paddingInline: { default: 16, [bp.tablet]: 40, [bp.laptop]: 40, [bp.wide]: chrome.inset },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    columnGap: { default: 12, [bp.tablet]: 16, [bp.desktop]: 24 },
  },
  plate: {
    position: "relative",
    scrollMarginTop: chrome.anchor,
    paddingTop: { default: 104, [bp.tablet]: 144, [bp.desktop]: 176 },
  },
  full: { gridColumn: "1 / -1" },
  q1: { gridColumn: { default: "1 / -1", [bp.abovePhone]: "1 / 4" } },
  q2to4: { gridColumn: { default: "1 / -1", [bp.abovePhone]: "4 / 13" } },
  q2to3: { gridColumn: { default: "1 / -1", [bp.abovePhone]: "4 / 10" } },
  q4: { gridColumn: { default: "1 / -1", [bp.abovePhone]: "10 / 13" } },
  q1to2: { gridColumn: { default: "1 / -1", [bp.abovePhone]: "1 / 7" } },
  q3to4: { gridColumn: { default: "1 / -1", [bp.abovePhone]: "7 / 13" } },
  frameNumber: {
    fontFamily: face.latin,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.frameNumber,
  },
  eyebrow: {
    margin: 0,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 20, [bp.desktop]: 24 },
    lineHeight: 1.1,
    color: tone.navy,
  },
  body: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 17 },
    fontWeight: 400,
    lineHeight: 1.85,
    color: tone.body,
    textWrap: "pretty",
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.brand,
    outlineOffset: 4,
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export const srOnly = stylex.props(ui.srOnly);
