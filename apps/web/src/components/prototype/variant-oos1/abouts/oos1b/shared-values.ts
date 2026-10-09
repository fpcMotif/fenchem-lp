import * as stylex from "@stylexjs/stylex";
import { bp, chrome, face, motion, space, tone } from "./tokens.stylex";

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"] as const;

export const ui = stylex.create({
  reset: {
    margin: 0,
  },
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
    paddingInline: space.gutter,
  },
  anchor: {
    scrollMarginTop: chrome.anchor,
  },
  section: {
    paddingTop: { default: 88, [bp.tablet]: 120, [bp.desktop]: 160 },
  },
  frame: {
    position: "relative",
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.rule,
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
  serif: {
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    color: tone.body,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.blue,
    outlineOffset: 4,
  },
});

export const srOnly = stylex.props(ui.srOnly);

export const bevel = stylex.create({
  edge: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.bevelOuter,
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: tone.bevelInner,
    outlineOffset: -6,
  },
});

const stepStyles = stylex.create({
  base: {
    transitionProperty: "opacity, transform",
    transitionDuration: "900ms",
    transitionTimingFunction: motion.ease,
  },
  waiting: {
    opacity: { default: 1, [bp.motionOk]: 0 },
    transform: { default: "none", [bp.motionOk]: "scale(0.985)" },
  },
  delay: (transitionDelay: string) => ({ transitionDelay }),
});

export function stepIn(arrived: boolean, depth: number) {
  return [
    stepStyles.base,
    !arrived && stepStyles.waiting,
    stepStyles.delay(`${Math.round(depth * 140)}ms`),
  ] as const;
}
