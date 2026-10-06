import * as stylex from "@stylexjs/stylex";

import { bp, chrome, face, tone } from "./tokens.stylex";

export const SHEET_COUNT = 6;

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
    paddingInline: { default: 20, [bp.tablet]: 40, [bp.desktop]: chrome.gutter },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(4, minmax(0, 1fr))",
      [bp.tabletUp]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 16, [bp.tablet]: 20, [bp.desktop]: 24 },
  },
  anchor: {
    scrollMarginTop: chrome.anchor,
  },
  section: {
    paddingTop: { default: 88, [bp.tablet]: 120, [bp.desktop]: 152 },
  },
  caps: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontVariantNumeric: "tabular-nums",
    color: tone.muted,
  },
  label: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: { default: 12, [bp.tabletUp]: 13 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: tone.muted,
  },
  serif: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
  },
  balloon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    width: { default: 24, [bp.tabletUp]: 28 },
    height: { default: 24, [bp.tabletUp]: 28 },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.line,
    borderRadius: "50%",
    backgroundColor: tone.paper,
    fontFamily: face.latin,
    fontSize: { default: 11, [bp.tabletUp]: 12 },
    fontWeight: 500,
    lineHeight: 1,
    fontVariantNumeric: "tabular-nums",
    color: tone.navy,
  },
  balloonActive: {
    borderColor: tone.blue,
    backgroundColor: tone.blue,
    color: tone.paper,
  },
  focusRing: {
    outline: {
      default: "none",
      ":focus-visible": "2px solid #0743a9",
    },
    outlineOffset: 3,
  },
});

export const srOnly = stylex.props(ui.srOnly);

export const pad2 = (value: number) => String(value).padStart(2, "0");
