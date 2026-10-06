import * as stylex from "@stylexjs/stylex";

import { bp, chrome, face, tone } from "./tokens.stylex";

export const LIGHT_WEIGHT_FONT =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap";

export const HEADER_PX = 80;
export const BAR_PX = 48;

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
  section: {
    scrollMarginTop: chrome.barBottom,
  },
  label: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
    fontFamily: face.sans,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  labelEn: {
    fontFamily: face.serif,
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: 400,
    letterSpacing: 0,
    color: tone.body,
  },
  body: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.tablet]: 17, [bp.desktop]: 18 },
    fontWeight: 400,
    lineHeight: 1.9,
    letterSpacing: "0.02em",
    color: tone.body,
    textWrap: "pretty",
  },
  bodyColumn: {
    boxSizing: "border-box",
    width: { default: "100%", [bp.tablet]: "62%", [bp.desktop]: "41.5%" },
    marginInlineStart: "auto",
  },
  note: {
    fontFamily: face.latin,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.01em",
    color: tone.body,
    fontVariantNumeric: "tabular-nums",
  },
  photo: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundColor: tone.tint,
  },
});

export const srOnly = stylex.props(ui.srOnly);
