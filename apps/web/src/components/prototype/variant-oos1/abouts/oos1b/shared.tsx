import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";

import { fonts, layout, media, palette } from "./tokens.stylex";

const BLEED = "-48px";

export const s = stylex.create({
  section: {
    position: "relative",
    scrollMarginTop: layout.anchorOffset,
    paddingBlock: { default: 44, [breakpoints.lg]: 72 },
  },
  bandPage: { backgroundColor: palette.page },
  bandPaper: { backgroundColor: colors.paper },
  bandNavy: { backgroundColor: palette.navy },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [breakpoints.md]: 40, [breakpoints.xl]: layout.inset },
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
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  focusRingLight: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
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
  caption: {
    margin: 0,
    fontFamily: fonts.cjk,
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: palette.quiet,
  },
  textLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: 0,
    paddingBlock: 6,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: { default: palette.hairline, ":hover": colors.brandBlue700 },
    backgroundColor: "transparent",
    fontFamily: fonts.cjk,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: { default: palette.ink, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color, border-color",
    transitionDuration: "200ms",
    transitionTimingFunction: layout.ease,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    minHeight: 52,
    minWidth: { default: 200, [breakpoints.lg]: 216 },
    paddingInline: 32,
    borderWidth: 0,
    borderRadius: 2,
    fontFamily: fonts.cjk,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.1em",
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "200ms",
    transitionTimingFunction: layout.ease,
  },
  buttonInverse: {
    backgroundColor: { default: colors.paper, ":hover": palette.tint },
    color: palette.navy,
  },
  buttonGhost: {
    backgroundColor: { default: "transparent", ":hover": "rgba(255, 255, 255, 0.08)" },
    boxShadow: `inset 0 0 0 1px ${palette.lightLine}`,
    color: colors.paper,
  },
});

const fold = stylex.create({
  inner: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    boxSizing: "border-box",
    minWidth: 0,
    minHeight: "100%",
  },
  base: {
    transitionProperty: "clip-path, opacity, transform",
    transitionDuration: "900ms",
    transitionTimingFunction: layout.ease,
  },
  rise: {
    opacity: { default: 1, [media.motion]: 0 },
    transform: { default: null, [media.motion]: "translateY(20px)" },
  },
  left: {
    opacity: { default: 1, [media.fade]: 0 },
    transform: { default: null, [media.fade]: "translateY(20px)" },
    clipPath: { default: null, [media.fold]: `inset(${BLEED} 0 ${BLEED} 100%)` },
  },
  right: {
    opacity: { default: 1, [media.fade]: 0 },
    transform: { default: null, [media.fade]: "translateY(20px)" },
    clipPath: { default: null, [media.fold]: `inset(${BLEED} 100% ${BLEED} 0)` },
  },
  shown: {
    opacity: 1,
    transform: "none",
    clipPath: `inset(${BLEED})`,
  },
});

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

const FOLD_START = {
  rise: fold.rise,
  left: fold.left,
  right: fold.right,
} as const;

export type FoldSide = keyof typeof FOLD_START;

export function Fold({
  children,
  side = "rise",
  step = 0,
  sx,
  innerSx,
  as: Tag = "div",
}: {
  children: ReactNode;
  side?: FoldSide;
  step?: number;
  sx?: stylex.StyleXStyles;
  innerSx?: stylex.StyleXStyles;
  as?: "div" | "span" | "li" | "figure";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const Inner = Tag === "span" ? "span" : "div";
  return (
    <Tag ref={ref} {...stylex.props(sx)}>
      <Inner
        {...stylex.props(
          fold.inner,
          fold.base,
          FOLD_START[side],
          shown && fold.shown,
          dynamic.delay(Math.min(step, 4) * 90),
          innerSx,
        )}
      >
        {children}
      </Inner>
    </Tag>
  );
}
