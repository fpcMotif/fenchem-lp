import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useInView } from "motion/react";
import { type ReactNode, useRef } from "react";

import { ABOUT_HERO } from "../../about-data";
import { font, motionCss, step, tone } from "./tokens.stylex";

const REVEAL_STEP_MS = 80;
const REVEAL_MAX_STEPS = 4;

const revealDelay = (index: number) => Math.min(index, REVEAL_MAX_STEPS) * REVEAL_STEP_MS;

const NAV_ENGLISH = ["Profile", "Campus", "Culture", "Responsibility", "Honors", "Structure"];

export const NAV_ITEMS = [
  ...ABOUT_HERO.navChips.map((chip, idx) => ({ ...chip, english: NAV_ENGLISH[idx] })),
  { label: "产品与应用", id: "about-products", english: "Products" },
];

export const SECTION_IDS: readonly string[] = NAV_ITEMS.map((item) => item.id);

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

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

export function Reveal({
  children,
  step: stagger = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure" | "article";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <Tag
      ref={ref}
      {...stylex.props(ui.reveal, shown && ui.revealShown, dynamic.delay(revealDelay(stagger)), sx)}
    >
      {children}
    </Tag>
  );
}

export function Section({
  id,
  label,
  background,
  sx,
  children,
}: {
  id: string;
  label: string;
  background: stylex.StyleXStyles;
  sx?: stylex.StyleXStyles;
  children: ReactNode;
}) {
  const nameId = `${id}-name`;
  return (
    <section id={id} aria-labelledby={nameId} {...stylex.props(ui.section, background, sx)}>
      <h2 id={nameId} {...stylex.props(ui.srOnly)}>
        {label}
      </h2>
      <div {...stylex.props(ui.shell, ui.inset)}>{children}</div>
    </section>
  );
}

export function Figure({
  src,
  alt,
  caption,
  ratio,
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio: stylex.StyleXStyles;
}) {
  return (
    <Reveal as="figure" sx={ui.figure}>
      <div {...stylex.props(ui.frame, ratio)}>
        <img src={src} alt={alt} loading="lazy" decoding="async" {...stylex.props(ui.fill)} />
      </div>
      {caption ? <figcaption {...stylex.props(ui.caption)}>{caption}</figcaption> : null}
    </Reveal>
  );
}
