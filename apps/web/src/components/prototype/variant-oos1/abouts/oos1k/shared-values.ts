import * as stylex from "@stylexjs/stylex";
import { bp, chrome, face, sky } from "./tokens.stylex";

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
    position: "relative",
    scrollMarginTop: chrome.anchor,
    paddingBlock: { default: 96, [bp.tablet]: 128, [bp.desktop]: 168 },
  },
  label: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    fontVariantCaps: "all-small-caps",
    fontVariantNumeric: "lining-nums tabular-nums",
    color: sky.muted,
  },
  designation: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    letterSpacing: 0,
    fontVariantCaps: "normal",
  },
  body: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.9,
    color: sky.text,
    textWrap: "pretty",
  },
  focusable: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 1,
    outlineOffset: 4,
    outlineColor: sky.focus,
  },
  dim: {
    transitionProperty: "opacity",
    transitionDuration: "1200ms",
    transitionTimingFunction: chrome.ease,
  },
  dimHidden: {
    opacity: { default: 0, [bp.motionReduce]: 1 },
  },
  dimDelay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

export const srOnly = stylex.props(ui.srOnly);
