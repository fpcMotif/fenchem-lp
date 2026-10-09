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
    backgroundColor: tone.page,
    color: tone.ink,
    fontFamily: font.cjk,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset: {
    paddingInline: { default: 16, [breakpoints.md]: 40, [breakpoints.xl]: "min(124px, 8.611vw)" },
  },
  section: {
    scrollMarginTop: 136,
    paddingBlock: { default: 40, [breakpoints.md]: 56, [breakpoints.xl]: 72 },
  },
  onPaper: {
    backgroundColor: colors.paper,
  },
  onPage: {
    backgroundColor: tone.page,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    fontWeight: 400,
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
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
  reveal: {
    opacity: { default: 0, [breakpoints.motionReduce]: 1 },
    transform: { default: null, [breakpoints.motionOk]: "translateY(20px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "800ms",
    transitionTimingFunction: motionCss.out,
  },
  revealShown: {
    opacity: 1,
    transform: "none",
  },
  phi: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 38.2fr) minmax(0, 61.8fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 48, [breakpoints.xl]: 80 },
    rowGap: { default: 32, [breakpoints.lg]: 0 },
  },
  asideCol: {
    minWidth: 0,
  },
  asideSticky: {
    position: { default: "static", [breakpoints.lg]: "sticky" },
    top: { default: "auto", [breakpoints.lg]: 160 },
  },
  main: {
    minWidth: 0,
  },
  figure: {
    margin: 0,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  caption: {
    marginTop: 14,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: tone.quiet,
  },
  label: {
    margin: 0,
    fontSize: step.label,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.12em",
    color: tone.quiet,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    paddingInline: 28,
    borderWidth: 0,
    borderRadius: 0,
    fontFamily: font.cjk,
    fontSize: step.body,
    fontWeight: 500,
    letterSpacing: "0.06em",
    textDecoration: "none",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.98)" },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: motionCss.out,
  },
  buttonPrimary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  buttonSecondary: {
    backgroundColor: { default: "transparent", ":hover": tone.tint },
    boxShadow: `inset 0 0 0 1px ${tone.hairlineStrong}`,
    color: tone.ink,
  },
});
