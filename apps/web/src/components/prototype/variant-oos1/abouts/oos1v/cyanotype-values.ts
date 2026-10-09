import * as stylex from "@stylexjs/stylex";
import { curve, media, tone } from "./tokens.stylex";

export const CYANOTYPE_ID = "oos1v-cyanotype";

export const shared = stylex.create({
  defs: {
    position: "absolute",
    width: 0,
    height: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  coat: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
  },
  coatFill: {
    fill: tone.prussian,
  },
  wideOnly: {
    display: { default: "none", [media.wide]: "inline" },
  },
  narrowOnly: {
    display: { default: "inline", [media.wide]: "none" },
  },
  cyanotype: {
    filter: `url(#${CYANOTYPE_ID})`,
  },
  fill: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  develop: {
    opacity: { default: 0.3, [media.reduce]: 1 },
    transitionProperty: "opacity",
    transitionDuration: "2400ms",
    transitionTimingFunction: curve.develop,
  },
  developEcho: {
    opacity: { default: 0.42, [media.reduce]: 1 },
    transitionDuration: "1200ms",
  },
  developed: {
    opacity: 1,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.prussian,
    outlineOffset: 3,
  },
  caption: {
    marginTop: 14,
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.02em",
    color: tone.pencil,
  },
});
