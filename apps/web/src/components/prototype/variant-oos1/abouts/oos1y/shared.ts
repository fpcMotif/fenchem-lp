import * as stylex from "@stylexjs/stylex";

import { bp, chrome, face, pane, tone } from "./tokens.stylex";

export const LIGHT_WEIGHT_FONT =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap";

export const CHROME_HEIGHT = 128;

export const SECTION_IDS = [
  "about-profile",
  "about-campus",
  "about-culture",
  "about-csr",
  "about-honor",
  "about-structure",
] as const;

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
    paddingInline: { default: 16, [bp.tablet]: 40, [bp.desktop]: chrome.inset },
  },
  anchor: {
    scrollMarginTop: chrome.anchor,
  },
  glass: {
    position: "relative",
    boxSizing: "border-box",
    backgroundImage: pane.fill,
    backdropFilter: pane.blur,
    WebkitBackdropFilter: pane.blur,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: pane.edge,
    borderRadius: 2,
    boxShadow: pane.shadow,
  },
  etched: {
    margin: 0,
    fontFamily: face.etched,
    fontWeight: 300,
    color: tone.navy,
    textShadow: "0 1px 0 rgba(255, 255, 255, 0.7)",
    fontFeatureSettings: '"palt"',
  },
  label: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: "0.02em",
    color: tone.body,
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
