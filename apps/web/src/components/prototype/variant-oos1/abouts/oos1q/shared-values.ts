import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ABOUT_HERO } from "../../about-data";
import { font, motionCss, step, tone } from "./tokens.stylex";

const NAV_ENGLISH = ["Profile", "Campus", "Culture", "Responsibility", "Honors", "Structure"];

export const NAV_ITEMS = [
  ...ABOUT_HERO.navChips.map((chip, idx) => ({ ...chip, english: NAV_ENGLISH[idx] })),
  { label: "产品与应用", id: "about-products", english: "Products" },
];

export const SECTION_IDS: readonly string[] = NAV_ITEMS.map((item) => item.id);

export const ui = stylex.create({
  root: {
    overflowX: "clip",
    backgroundColor: tone.paper,
    color: tone.ink,
    fontFamily: font.cjk,
    fontWeight: 400,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: { default: 24, [breakpoints.md]: 56, [breakpoints.xl]: "min(160px, 11.111vw)" },
  },
  section: {
    scrollMarginTop: 132,
    paddingBlock: { default: 44, [breakpoints.md]: 64, [breakpoints.xl]: 80 },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.lg]: 24, [breakpoints.xl]: 32 },
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    fontWeight: 400,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
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
  frame: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  figure: {
    margin: 0,
  },
  caption: {
    margin: 0,
    marginTop: 12,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.06em",
    lineHeight: 1.6,
    color: tone.quiet,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    paddingInline: 32,
    borderWidth: 0,
    borderRadius: 0,
    fontFamily: font.cjk,
    fontSize: step.small,
    fontWeight: 400,
    letterSpacing: "0.14em",
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "200ms",
    transitionTimingFunction: motionCss.out,
  },
  buttonPrimary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  buttonSecondary: {
    backgroundColor: { default: "transparent", ":hover": "rgba(26, 26, 26, 0.04)" },
    boxShadow: `inset 0 0 0 1px ${tone.hairlineStrong}`,
    color: tone.ink,
  },
  textButton: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: step.small,
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: { default: tone.body, ":hover": tone.ink },
    textDecorationLine: "underline",
    textDecorationColor: tone.hairlineStrong,
    textUnderlineOffset: 6,
    cursor: "pointer",
  },
  hidden: {
    opacity: { default: 0, [breakpoints.motionReduce]: 1, "@media print": 1 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(24px)" },
  },
  shown: {
    opacity: 1,
    transform: "none",
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: motionCss.out,
  },
});
