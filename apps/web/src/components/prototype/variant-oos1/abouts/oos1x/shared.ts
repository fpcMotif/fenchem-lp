import * as stylex from "@stylexjs/stylex";

import { bp, face, grid, scale, tone } from "./tokens.stylex";

export const LIGHT_WEIGHT_FONT =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap";

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
    paddingInline: { default: 20, [bp.tablet]: 40, [bp.desktop]: grid.margin },
  },
  columns: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.wide]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [bp.wide]: grid.gutter },
  },
  anchor: {
    scrollMarginTop: { default: 96, [bp.wide]: grid.landing },
  },
  fill: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  knockout: {
    justifySelf: "start",
    maxWidth: "100%",
    backgroundColor: tone.page,
    boxShadow: "0 0 0 6px #ffffff",
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.blue,
    outlineOffset: 4,
  },
});

export const type = stylex.create({
  counterweight: {
    margin: 0,
    fontFamily: face.display,
    fontWeight: 800,
    lineHeight: 0.84,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "lining-nums tabular-nums",
    color: tone.navy,
  },
  counterTitle: { fontSize: scale.titleCounterweight },
  counterDisplay: { fontSize: scale.displayCounterweight },
  counterHeading: { fontSize: scale.headingCounterweight, letterSpacing: "-0.01em" },
  light: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 300,
    color: tone.ink,
  },
  title: {
    fontSize: scale.title,
    lineHeight: 1,
    letterSpacing: "0.02em",
  },
  display: {
    fontSize: scale.display,
    lineHeight: 1.08,
    letterSpacing: "0.02em",
  },
  heading: {
    fontSize: scale.heading,
    lineHeight: 1.2,
    letterSpacing: "0.04em",
  },
  body: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: scale.body,
    lineHeight: 1.95,
    letterSpacing: "0.02em",
    color: tone.body,
    textWrap: "pretty",
  },
  serif: {
    margin: 0,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: 1.1,
    color: tone.body,
  },
  note: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 14, [bp.wide]: 15 },
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: tone.body,
  },
});

export const srOnly = stylex.props(ui.srOnly);
