import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ABOUT_HERO } from "../../about-data";
import { band, font, layout, motionCss, step, tone } from "./tokens.stylex";

const NAV_ENGLISH = ["Profile", "Campus", "Culture", "Responsibility", "Honors", "Structure"];

export const NAV_ITEMS = [
  ...ABOUT_HERO.navChips.map((chip, idx) => ({ ...chip, english: NAV_ENGLISH[idx] })),
  { label: "产品与应用", id: "about-products", english: "Products" },
];

export const SECTION_IDS: readonly string[] = NAV_ITEMS.map((item) => item.id);

export const ui = stylex.create({
  root: {
    paddingTop: 80,
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
    paddingInline: {
      default: 16,
      [band.mdToXl]: layout.insetMd,
      [breakpoints.xl]: layout.insetXl,
    },
  },
  section: {
    scrollMarginTop: 136,
    paddingBlock: { default: 40, [band.mdToXl]: 60, [breakpoints.xl]: 72 },
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
  figure: {
    margin: 0,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  caption: {
    marginTop: 12,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.06em",
    lineHeight: 1.6,
    color: tone.body,
  },
  quietButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    minHeight: 44,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: font.cjk,
    fontSize: step.small,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: tone.ink,
    cursor: "pointer",
    textDecorationLine: "underline",
    textDecorationThickness: 1,
    textUnderlineOffset: 8,
    textDecorationColor: { default: tone.hairlineStrong, ":hover": tone.ink },
    transitionProperty: "text-decoration-color",
    transitionDuration: "200ms",
    transitionTimingFunction: motionCss.out,
  },
});
