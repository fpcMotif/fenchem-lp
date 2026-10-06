import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { bp, chrome, face, tone } from "./tokens.stylex";

export const LIGHT_WEIGHT_FONT =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap";

export const PINNED_QUERY =
  "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

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
    columnGap: { default: 16, [bp.tablet]: 20, [bp.desktop]: 24 },
  },
  anchor: {
    scrollMarginTop: chrome.header,
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
  svg: {
    display: "block",
    width: "100%",
    height: "auto",
    overflow: "visible",
  },
  latin: {
    fontFamily: face.latin,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
  },
  serif: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
  },
  body: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.85,
    color: tone.body,
    textWrap: "pretty",
  },
  lead: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 18, [bp.tablet]: 19, [bp.desktop]: 20 },
    lineHeight: 1.75,
    color: "#333333",
    textWrap: "pretty",
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.blue,
    outlineOffset: 4,
  },
});

export const srOnly = stylex.props(ui.srOnly);

export function useSvgId() {
  return `oos1o${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
}
