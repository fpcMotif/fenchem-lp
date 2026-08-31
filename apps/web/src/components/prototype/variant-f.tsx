import { ArrowRight, ArrowUpRight, ChevronDown, FlaskConical, Globe2, Sprout } from "lucide-react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import { EASE } from "@/components/prototype/motion-constants";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { getFeaturedIngredients, pillars } from "@/components/landing/landing-content";

/*
 * PROTOTYPE — Variant F: "Deep Green Immersive"
 * Green-led dark luxury flagship. Full-viewport hero on deep brand-green-950,
 * story chapters, horizontal snap ingredient rail, glowing brand-green CTA.
 * Reinterpretation of Variant C with full brand-book compliance.
 */

const img = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;
const NAV_LINKS = [
  {
    label: "Origin",
    href: "#origin",
  },
  {
    label: "Science",
    href: "#science",
  },
  {
    label: "Portfolio",
    href: "#portfolio",
  },
  {
    label: "Standards",
    href: "#standards",
  },
] as const;
const PILLAR_DETAIL = [
  {
    icon: Sprout,
    copy: "A documented chain of custody from origin farm to finished extract — every lot, every season.",
  },
  {
    icon: FlaskConical,
    copy: "Identity, potency and stability validated in-house; third-party verification on request.",
  },
  {
    icon: Globe2,
    copy: "ISO and GMP certified systems with regulatory dossiers prepared for 40+ markets.",
  },
] as const;
const MARQUEE_ITEMS = [
  "Nutrition & Supplements",
  "Food & Beverage",
  "Personal Care & Cosmeceuticals",
  "ISO Certified",
  "GMP Compliant",
  "40+ Countries",
  "30+ Years",
];
const MARQUEE_TRACK = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
const marquee = stylex.keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "100%": {
    transform: "translateX(-50%)",
  },
});
const styles = stylex.create({
  root: {
    backgroundColor: colors.brandGreen950,
    fontFamily: typography.body,
    color: "#ffffff",
    WebkitFontSmoothing: "antialiased",
    "::selection": {
      backgroundColor: colors.brandGreen500,
      color: colors.brandGreen950,
    },
  },
  /* ─── Nav ─────────────────────────────────────────────── */
  nav: {
    position: "fixed",
    left: {
      default: "1rem",
      [breakpoints.md]: 0,
    },
    right: {
      default: "1rem",
      [breakpoints.md]: 0,
    },
    top: {
      default: "1rem",
      [breakpoints.md]: "1.5rem",
    },
    zIndex: 50,
  },
  navContainer: {
    marginInline: "auto",
    display: "flex",
    maxWidth: "880px",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-950) 60%, transparent)",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1.5rem",
    paddingRight: "0.5rem",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
  },
  navLogo: {
    fontFamily: typography.display,
    fontSize: "1.25rem",
    fontWeight: 300,
    letterSpacing: "-0.025em",
    color: "#ffffff",
    textDecoration: "none",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  navLinksDesktop: {
    display: {
      default: "none",
      [breakpoints.md]: "flex",
    },
    alignItems: "center",
    gap: "1.75rem",
  },
  navLink: {
    fontSize: "0.875rem",
    color: {
      default: "rgba(255, 255, 255, 0.6)",
      ":hover": colors.brandGreen300,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  inquireBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "1.25rem",
    paddingBlock: "0.625rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: colors.brandGreen950,
    textDecoration: "none",
    boxShadow: {
      default: "0 0 24px oklch(from var(--color-brand-green-500) l c h / 0.35)",
      ":hover": "0 0 40px oklch(from var(--color-brand-green-500) l c h / 0.55)",
    },
    transitionProperty: "background-color, box-shadow",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: "2px solid #ffffff",
      outlineOffset: "2px",
    },
  },
  /* ─── Hero ────────────────────────────────────────────── */
  heroHeader: {
    position: "relative",
    display: "flex",
    minHeight: "100svh",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.brandGreen950,
  },
  heroParallaxBg: {
    position: "absolute",
    inset: 0,
  },
  heroParallaxImg: {
    height: "100%",
    width: "100%",
    transform: "scale(1.1)",
    objectFit: "cover",
    display: "block",
  },
  heroGradientOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, oklch(from var(--color-brand-green-950) 0.14 0.06 h / 0.85) 0%, oklch(from var(--color-brand-green-950) 0.14 0.06 h / 0.35) 45%, oklch(from var(--color-brand-green-950) 0.14 0.06 h) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 10,
    paddingInline: "1.5rem",
    textAlign: "center",
  },
  heroMicroTag: {
    fontFamily: typography.tech,
    fontSize: {
      default: "11px",
      [breakpoints.md]: "12px",
    },
    textTransform: "uppercase",
    letterSpacing: "0.45em",
    color: colors.brandGreen400,
    margin: 0,
  },
  heroH1: {
    marginInline: "auto",
    marginTop: "2rem",
    maxWidth: "80rem",
    fontFamily: typography.display,
    fontSize: "clamp(3rem, 9vw, 7.5rem)",
    fontWeight: 300,
    lineHeight: 1.02,
    letterSpacing: "-0.02em",
    color: "#ffffff",
  },
  italicGreen300: {
    color: colors.brandGreen300,
    fontStyle: "italic",
  },
  heroP: {
    marginInline: "auto",
    marginTop: "2rem",
    maxWidth: "36rem",
    fontSize: "1.125rem",
    lineHeight: 1.625,
    color: "rgba(255, 255, 255, 0.7)",
  },
  heroBtns: {
    marginTop: "3rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  heroPrimaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "2.25rem",
    paddingBlock: "1rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: colors.brandGreen950,
    textDecoration: "none",
    boxShadow: {
      default: "0 0 32px oklch(from var(--color-brand-green-500) l c h / 0.35)",
      ":hover": "0 0 56px oklch(from var(--color-brand-green-500) l c h / 0.55)",
    },
    transitionProperty: "background-color, box-shadow",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: "2px solid #ffffff",
      outlineOffset: "2px",
    },
  },
  heroSecondaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.25)",
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklch, var(--color-brand-green-900) 40%, transparent)",
    },
    paddingInline: "2.25rem",
    paddingBlock: "1rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#ffffff",
    textDecoration: "none",
    transitionProperty: "border-color, background-color",
    transitionDuration: "300ms",
    outline: "none",
    ":hover": {
      borderColor: "color-mix(in oklch, var(--color-brand-green-400) 60%, transparent)",
    },
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  scrollDownIndicator: {
    position: "absolute",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
    minHeight: "2.75rem",
    color: {
      default: "rgba(255, 255, 255, 0.5)",
      ":hover": colors.brandGreen400,
    },
    transitionProperty: "color",
    transitionDuration: "200ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  /* ─── Stats Band ──────────────────────────────────────── */
  statsBandSection: {
    position: "relative",
    backgroundColor: colors.brandGreen950,
    paddingInline: "1.5rem",
    paddingBlock: {
      default: "6rem",
      [breakpoints.md]: "8rem",
    },
  },
  statsTopGlow: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    height: "1px",
    width: "75%",
    background:
      "linear-gradient(to right, transparent, color-mix(in oklch, var(--color-brand-green-500) 40%, transparent), transparent)",
  },
  statsGrid: {
    marginInline: "auto",
    display: "grid",
    maxWidth: "64rem",
    gap: "1.25rem",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.sm]: "repeat(3, 1fr)",
    },
  },
  statCard: {
    borderRadius: radii["3xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "color-mix(in oklch, var(--color-brand-green-800) 60%, transparent)",
      ":hover": "color-mix(in oklch, var(--color-brand-green-500) 50%, transparent)",
    },
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-900) 40%, transparent)",
    paddingInline: "2rem",
    paddingBlock: "2.5rem",
    textAlign: "center",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transitionProperty: "border-color",
    transitionDuration: "500ms",
  },
  statValue: {
    fontFamily: typography.display,
    fontSize: {
      default: "3rem",
      [breakpoints.md]: "3.75rem",
    },
    fontWeight: 300,
    color: colors.brandGreen300,
    margin: 0,
  },
  statLabel: {
    marginTop: "0.75rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: "rgba(255, 255, 255, 0.5)",
    margin: 0,
  },
  /* ─── Chapters ────────────────────────────────────────── */
  chapterSection: {
    scrollMarginTop: "6rem",
    backgroundColor: colors.brandGreen950,
    paddingInline: "1.5rem",
    paddingBlock: {
      default: "4rem",
      [breakpoints.md]: "6rem",
    },
  },
  chapterSectionGradient: {
    scrollMarginTop: "6rem",
    background: `linear-gradient(to bottom, ${colors.brandGreen950}, ${colors.brandGreen900})`,
    paddingInline: "1.5rem",
    paddingBlock: {
      default: "4rem",
      [breakpoints.md]: "6rem",
    },
  },
  chapterGrid: {
    marginInline: "auto",
    display: "grid",
    maxWidth: "72rem",
    alignItems: "center",
    gap: "3.5rem",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(2, 1fr)",
    },
  },
  chapterImageFrame: {
    position: "relative",
    height: {
      default: "60vh",
      [breakpoints.md]: "78vh",
    },
    overflow: "hidden",
    borderRadius: "28px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  chapterImg: {
    position: "absolute",
    inset: 0,
    height: "116%",
    width: "100%",
    objectFit: "cover",
    display: "block",
  },
  chapterImgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, oklch(from var(--color-brand-green-950) 0.14 0.06 h) 0%, transparent 55%, oklch(from var(--color-brand-green-950) 0.14 0.06 h / 0.3) 100%)",
  },
  chapterTextCol: {
    paddingLeft: {
      default: 0,
      [breakpoints.lg]: "2rem",
    },
  },
  chapterTextColReversed: {
    paddingRight: {
      default: 0,
      [breakpoints.lg]: "2rem",
    },
    order: {
      default: 2,
      [breakpoints.lg]: 1,
    },
  },
  chapterImageColReversed: {
    order: {
      default: 1,
      [breakpoints.lg]: 2,
    },
  },
  chapterEyebrow: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.4em",
    color: colors.brandGreen400,
    margin: 0,
  },
  chapterH2: {
    marginTop: "1.5rem",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3.75rem",
    },
    fontWeight: 300,
    lineHeight: 1.08,
    letterSpacing: "-0.025em",
    color: "#ffffff",
  },
  chapterP: {
    marginTop: "2rem",
    maxWidth: "28rem",
    fontSize: {
      default: "1rem",
      [breakpoints.md]: "1.125rem",
    },
    lineHeight: 1.625,
    color: "rgba(255, 255, 255, 0.65)",
  },
  chapterQuote: {
    marginTop: "2.5rem",
    borderLeftWidth: "2px",
    borderLeftStyle: "solid",
    borderLeftColor: "color-mix(in oklch, var(--color-brand-green-500) 40%, transparent)",
    paddingLeft: "1.5rem",
    fontFamily: typography.display,
    fontSize: {
      default: "1.5rem",
      [breakpoints.md]: "1.875rem",
    },
    fontStyle: "italic",
    lineHeight: 1.375,
    color: colors.brandGreen200,
    margin: 0,
  },
  chapterLink: {
    marginTop: "2.5rem",
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.875rem",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: {
      default: colors.brandGreen400,
      ":hover": colors.brandGreen200,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  /* ─── Ingredient Rail ─────────────────────────────────── */
  railSection: {
    scrollMarginTop: "6rem",
    backgroundColor: colors.brandGreen900,
    paddingBlock: {
      default: "6rem",
      [breakpoints.md]: "8rem",
    },
  },
  railHeaderContainer: {
    marginInline: "auto",
    maxWidth: "72rem",
    paddingInline: "1.5rem",
  },
  railHeaderFlex: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "1.5rem",
  },
  railH2: {
    marginTop: "1.5rem",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3.75rem",
    },
    fontWeight: 300,
    lineHeight: 1.1,
    letterSpacing: "-0.025em",
    color: "#ffffff",
  },
  railScrollHint: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: "rgba(255, 255, 255, 0.6)",
    margin: 0,
  },
  railScrollContainer: {
    marginTop: "3.5rem",
    overflowX: "auto",
    paddingBottom: "1.5rem",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  railTrack: {
    display: "flex",
    scrollSnapType: "x mandatory",
    gap: "1.5rem",
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "max(1.5rem, calc((100vw - 72rem) / 2))",
    },
  },
  railCard: {
    width: {
      default: "300px",
      [breakpoints.md]: "340px",
    },
    flexShrink: 0,
    scrollSnapAlign: "start",
    overflow: "hidden",
    borderRadius: radii["3xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "color-mix(in oklch, var(--color-brand-green-700) 40%, transparent)",
      ":hover": "color-mix(in oklch, var(--color-brand-green-400) 60%, transparent)",
    },
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transitionProperty: "border-color",
    transitionDuration: "500ms",
  },
  railCardImgBox: {
    height: "13rem",
    overflow: "hidden",
  },
  railCardImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
  },
  railCardBody: {
    padding: "1.75rem",
  },
  railCardTitle: {
    fontFamily: typography.display,
    fontSize: "1.5rem",
    fontWeight: 300,
    color: "#ffffff",
    margin: 0,
  },
  railCardLatin: {
    marginTop: "0.25rem",
    fontSize: "0.875rem",
    fontStyle: "italic",
    color: "rgba(255, 255, 255, 0.6)",
    margin: 0,
  },
  railDl: {
    marginTop: "1.5rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-800) 60%, transparent)",
    paddingTop: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.625rem",
    margin: 0,
  },
  railDlRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "1rem",
  },
  railDlDt: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.brandGreen300,
  },
  railDlDd: {
    fontFamily: typography.tech,
    fontSize: "0.75rem",
    color: "rgba(255, 255, 255, 0.7)",
    margin: 0,
  },
  /* ─── Standards Pillars ───────────────────────────────── */
  standardsSection: {
    scrollMarginTop: "6rem",
    background: `linear-gradient(to bottom, ${colors.brandGreen900}, ${colors.brandGreen950})`,
    paddingInline: "1.5rem",
    paddingBlock: {
      default: "4rem",
      [breakpoints.md]: "6rem",
    },
  },
  standardsContainer: {
    marginInline: "auto",
    maxWidth: "72rem",
  },
  standardsHeader: {
    marginBottom: "3.5rem",
    textAlign: "center",
  },
  standardsH2: {
    marginInline: "auto",
    marginTop: "1.5rem",
    maxWidth: "42rem",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3rem",
    },
    fontWeight: 300,
    lineHeight: 1.1,
    letterSpacing: "-0.025em",
    color: "#ffffff",
  },
  standardsGrid: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(3, 1fr)",
    },
  },
  standardCard: {
    height: "100%",
    borderRadius: radii["3xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "color-mix(in oklch, var(--color-brand-green-800) 60%, transparent)",
      ":hover": "color-mix(in oklch, var(--color-brand-green-500) 50%, transparent)",
    },
    background: `linear-gradient(to bottom, color-mix(in oklch, var(--color-brand-green-900) 60%, transparent), color-mix(in oklch, var(--color-brand-green-950) 40%, transparent))`,
    padding: "2.25rem",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transitionProperty: "border-color",
    transitionDuration: "500ms",
  },
  standardIconBadge: {
    display: "flex",
    height: "3rem",
    width: "3rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-500) 40%, transparent)",
    color: colors.brandGreen400,
    boxShadow: {
      default: "0 0 16px oklch(from var(--color-brand-green-500) l c h / 0.15)",
      ":hover": "0 0 28px oklch(from var(--color-brand-green-500) l c h / 0.3)",
    },
    transitionProperty: "box-shadow",
    transitionDuration: "500ms",
  },
  standardH3: {
    marginTop: "1.75rem",
    fontFamily: typography.display,
    fontSize: "1.5rem",
    fontWeight: 300,
    color: "#ffffff",
    margin: 0,
  },
  standardP: {
    marginTop: "0.75rem",
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: "rgba(255, 255, 255, 0.55)",
    margin: 0,
  },
  /* ─── Marquee Strip ───────────────────────────────────── */
  marqueeStrip: {
    overflow: "hidden",
    borderTopWidth: "1px",
    borderBottomWidth: "1px",
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-800) 40%, transparent)",
    borderBottomColor: "color-mix(in oklch, var(--color-brand-green-800) 40%, transparent)",
    backgroundColor: colors.brandGreen950,
    paddingBlock: "1rem",
  },
  marqueeTrackWrapper: {
    display: "flex",
    width: "max-content",
    gap: "4rem",
    animationName: {
      default: marquee,
      [breakpoints.motionReduce]: "none",
    },
    animationDuration: "35s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  marqueeItem: {
    flexShrink: 0,
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: "color-mix(in oklch, var(--color-brand-green-500) 60%, transparent)",
  },
  /* ─── CTA ─────────────────────────────────────────────── */
  ctaSection: {
    position: "relative",
    scrollMarginTop: "6rem",
    overflow: "hidden",
    backgroundColor: colors.brandGreen950,
    paddingInline: "1.5rem",
    paddingBlock: {
      default: "8rem",
      [breakpoints.md]: "11rem",
    },
    textAlign: "center",
  },
  ctaGlowGreen: {
    pointerEvents: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "32rem",
    width: "32rem",
    borderRadius: radii.full,
    background:
      "radial-gradient(circle, oklch(from var(--color-brand-green-500) l c h / 0.12) 0%, transparent 70%)",
  },
  ctaGlowBlue: {
    pointerEvents: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "48rem",
    width: "48rem",
    borderRadius: radii.full,
    background:
      "radial-gradient(circle, oklch(from var(--color-brand-blue-700) l c h / 0.06) 0%, transparent 65%)",
  },
  ctaContent: {
    position: "relative",
  },
  ctaH2: {
    marginInline: "auto",
    marginTop: "2rem",
    maxWidth: "48rem",
    fontFamily: typography.display,
    fontSize: "clamp(2.5rem, 6vw, 5rem)",
    fontWeight: 300,
    lineHeight: 1.05,
    letterSpacing: "-0.025em",
    color: "#ffffff",
  },
  ctaP: {
    marginInline: "auto",
    marginTop: "1.5rem",
    maxWidth: "32rem",
    fontSize: "1.125rem",
    lineHeight: 1.625,
    color: "rgba(255, 255, 255, 0.55)",
  },
  ctaBtns: {
    marginTop: "3rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  ctaPrimaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "2.5rem",
    paddingBlock: "1.25rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: colors.brandGreen950,
    textDecoration: "none",
    boxShadow: {
      default: "0 0 40px oklch(from var(--color-brand-green-500) l c h / 0.4)",
      ":hover": "0 0 72px oklch(from var(--color-brand-green-500) l c h / 0.6)",
    },
    transitionProperty: "background-color, box-shadow",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: "2px solid #ffffff",
      outlineOffset: "2px",
    },
  },
  ctaSecondaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "color-mix(in oklch, var(--color-brand-green-700) 60%, transparent)",
      ":hover": "color-mix(in oklch, var(--color-brand-green-400) 80%, transparent)",
    },
    paddingInline: "2.5rem",
    paddingBlock: "1.25rem",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: {
      default: colors.brandGreen300,
      ":hover": "#ffffff",
    },
    textDecoration: "none",
    transitionProperty: "border-color, color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  /* ─── Footer ──────────────────────────────────────────── */
  footer: {
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-800) 40%, transparent)",
    background: `linear-gradient(to bottom, ${colors.brandGreen950}, #000000)`,
    paddingInline: "1.5rem",
    paddingTop: "4rem",
    paddingBottom: "2.5rem",
  },
  footerContainer: {
    marginInline: "auto",
    display: "flex",
    maxWidth: "72rem",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    textAlign: "center",
  },
  footerBrand: {
    fontFamily: typography.display,
    fontSize: "1.875rem",
    fontWeight: 300,
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },
  footerSub: {
    marginTop: "0.25rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: colors.brandGreen500,
    margin: 0,
  },
  footerNav: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "2rem",
    rowGap: "0.75rem",
  },
  footerNavLink: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: {
      default: "rgba(255, 255, 255, 0.6)",
      ":hover": colors.brandGreen400,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  footerLegal: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: "rgba(255, 255, 255, 0.5)",
    margin: 0,
  },
});
function ChapterImage({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} {...stylex.props(styles.chapterImageFrame)}>
      <m.img
        src={src}
        alt={alt}
        style={{
          y: reduce ? 0 : y,
        }}
        loading="lazy"
        {...stylex.props(styles.chapterImg)}
      />
      {/* Dark green gradient overlay derived from the brand-green-950 hue */}
      <div aria-hidden {...stylex.props(styles.chapterImgOverlay)} />
    </div>
  );
}
function HeroNav({ reduce }: { reduce: boolean | null }) {
  return (
    <m.nav
      initial={
        reduce
          ? {
              opacity: 0,
            }
          : {
              opacity: 0,
              y: -16,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: EASE,
      }}
      aria-label="Main navigation"
      {...stylex.props(styles.nav)}
    >
      <div {...stylex.props(styles.navContainer)}>
        <a href="#top" {...stylex.props(styles.navLogo)}>
          Fenchem
        </a>
        <div {...stylex.props(styles.navLinksDesktop)}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} {...stylex.props(styles.navLink)}>
              {link.label}
            </a>
          ))}
        </div>
        <a href="mailto:sales@fenchem.com" {...stylex.props(styles.inquireBtn)}>
          Inquire
        </a>
      </div>
    </m.nav>
  );
}
function HeroHeader({ reduce }: { reduce: boolean | null }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <header id="top" ref={heroRef} {...stylex.props(styles.heroHeader)}>
      {/* Parallax canopy image */}
      <m.div
        style={{
          y: reduce ? 0 : heroY,
        }}
        {...stylex.props(styles.heroParallaxBg)}
      >
        <img
          src={img("photo-1542601906990-b4d3fb778b09", 2000)}
          alt="Sunlight breaking through a deep forest canopy of green leaves"
          loading="eager"
          {...stylex.props(styles.heroParallaxImg)}
        />
      </m.div>
      {/* Deep green gradient overlay derived from the brand-green-950 hue */}
      <div aria-hidden {...stylex.props(styles.heroGradientOverlay)} />

      <m.div
        style={{
          opacity: reduce ? 1 : heroFade,
        }}
        {...stylex.props(styles.heroContent)}
      >
        <m.p
          initial={
            reduce
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: EASE,
          }}
          {...stylex.props(styles.heroMicroTag)}
        >
          Botanical Intelligence Since 1995
        </m.p>
        <m.h1
          initial={
            reduce
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: 32,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.1,
            delay: 0.55,
            ease: EASE,
          }}
          {...stylex.props(styles.heroH1)}
        >
          Rooted in Nature,
          <br />
          <span {...stylex.props(styles.italicGreen300)}>Refined by Science.</span>
        </m.h1>
        <m.p
          initial={
            reduce
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.75,
            ease: EASE,
          }}
          {...stylex.props(styles.heroP)}
        >
          Premium botanical ingredients for the world&rsquo;s most demanding formulations — grown
          with patience, perfected in the laboratory.
        </m.p>
        <m.div
          initial={
            reduce
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.9,
            ease: EASE,
          }}
          {...stylex.props(styles.heroBtns)}
        >
          <a href="#portfolio" {...stylex.props(styles.heroPrimaryBtn)}>
            Explore the Portfolio
          </a>
          <a href="#origin" {...stylex.props(styles.heroSecondaryBtn)}>
            Our Story
          </a>
        </m.div>
      </m.div>

      <m.a
        href="#origin"
        aria-label="Scroll down to read our story"
        animate={
          reduce
            ? undefined
            : {
                y: [0, 8, 0],
              }
        }
        transition={
          reduce
            ? undefined
            : {
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        {...stylex.props(styles.scrollDownIndicator)}
      >
        <ChevronDown
          style={{
            height: "1.5rem",
            width: "1.5rem",
          }}
          aria-hidden
        />
      </m.a>
    </header>
  );
}
function StatsBand() {
  return (
    <section aria-label="Company statistics" {...stylex.props(styles.statsBandSection)}>
      {/* Subtle glow at top edge */}
      <div aria-hidden {...stylex.props(styles.statsTopGlow)} />
      <div {...stylex.props(styles.statsGrid)}>
        {(
          [
            ["30+", "Years of botanical R&D"],
            ["6", "Global production bases"],
            ["40+", "Markets with full dossiers"],
          ] as const
        ).map(([stat, label], i) => (
          <Reveal key={label} delay={i * 0.1}>
            <div {...stylex.props(styles.statCard)}>
              <p {...stylex.props(styles.statValue)}>{stat}</p>
              <p {...stylex.props(styles.statLabel)}>{label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
function OriginChapter() {
  return (
    <section id="origin" aria-labelledby="origin-heading" {...stylex.props(styles.chapterSection)}>
      <div {...stylex.props(styles.chapterGrid)}>
        <Reveal>
          <ChapterImage
            src={img("photo-1466781783364-36c955e42a7f", 1200)}
            alt="Dense green foliage in diffused soft light, symbolising traceable botanical sourcing"
          />
        </Reveal>
        <div {...stylex.props(styles.chapterTextCol)}>
          <Reveal>
            <p {...stylex.props(styles.chapterEyebrow)}>01 — Origin</p>
            <h2 id="origin-heading" {...stylex.props(styles.chapterH2)}>
              Grown with <span {...stylex.props(styles.italicGreen300)}>patience.</span>
            </h2>
            <p {...stylex.props(styles.chapterP)}>
              Our botanicals begin in soil we know by name — a global network of partner farms
              cultivated over decades, where harvests are timed to the plant, never to the quarter.
            </p>
            <blockquote {...stylex.props(styles.chapterQuote)}>
              &ldquo;Nature holds the keys to human vitality. We simply refuse to lose them in
              translation.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function ScienceChapter() {
  return (
    <section
      id="science"
      aria-labelledby="science-heading"
      {...stylex.props(styles.chapterSectionGradient)}
    >
      <div {...stylex.props(styles.chapterGrid)}>
        <div {...stylex.props(styles.chapterTextColReversed)}>
          <Reveal>
            <p {...stylex.props(styles.chapterEyebrow)}>02 — Science</p>
            <h2 id="science-heading" {...stylex.props(styles.chapterH2)}>
              Refined to the <span {...stylex.props(styles.italicGreen300)}>molecule.</span>
            </h2>
            <p {...stylex.props(styles.chapterP)}>
              Every extract passes through clinical-grade validation — identity, potency, stability
              — before it carries the Fenchem name. 98% bio-active retention across our extraction
              process is not a goal; it is the specification.
            </p>
            <a href="#portfolio" {...stylex.props(styles.chapterLink)}>
              See what we make
              <ArrowRight
                style={{
                  height: "1rem",
                  width: "1rem",
                }}
                aria-hidden
              />
            </a>
          </Reveal>
        </div>
        <div {...stylex.props(styles.chapterImageColReversed)}>
          <Reveal>
            <ChapterImage
              src={img("photo-1576086213369-97a306d36557", 1200)}
              alt="Biotech laboratory with scientific glassware and precision instruments"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function IngredientRail() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      {...stylex.props(styles.railSection)}
    >
      <div {...stylex.props(styles.railHeaderContainer)}>
        <Reveal>
          <div {...stylex.props(styles.railHeaderFlex)}>
            <div>
              <p {...stylex.props(styles.chapterEyebrow)}>03 — Portfolio</p>
              <h2 id="portfolio-heading" {...stylex.props(styles.railH2)}>
                The <span {...stylex.props(styles.italicGreen300)}>living</span> library
              </h2>
            </div>
            <p {...stylex.props(styles.railScrollHint)}>Scroll →</p>
          </div>
        </Reveal>
      </div>
      <div {...stylex.props(styles.railScrollContainer)}>
        <div {...stylex.props(styles.railTrack)}>
          {getFeaturedIngredients().map((item, i) => (
            <Reveal key={item.name} delay={Math.min(i * 0.08, 0.3)}>
              <article {...stylex.props(styles.railCard)}>
                <div {...stylex.props(styles.railCardImgBox)}>
                  <img
                    src={item.image.src}
                    alt={`${item.name} — ${item.latin} ingredient`}
                    loading="lazy"
                    {...stylex.props(styles.railCardImg)}
                  />
                </div>
                <div {...stylex.props(styles.railCardBody)}>
                  <h3 {...stylex.props(styles.railCardTitle)}>{item.name}</h3>
                  <p {...stylex.props(styles.railCardLatin)}>{item.latin}</p>
                  <dl {...stylex.props(styles.railDl)}>
                    {(
                      [
                        ["Purity", item.purity],
                        ["Form", item.form],
                      ] as const
                    ).map(([k, v]) => (
                      <div key={k} {...stylex.props(styles.railDlRow)}>
                        <dt {...stylex.props(styles.railDlDt)}>{k}</dt>
                        <dd {...stylex.props(styles.railDlDd)}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function StandardsPillars() {
  return (
    <section
      id="standards"
      aria-labelledby="standards-heading"
      {...stylex.props(styles.standardsSection)}
    >
      <div {...stylex.props(styles.standardsContainer)}>
        <Reveal>
          <div {...stylex.props(styles.standardsHeader)}>
            <p {...stylex.props(styles.chapterEyebrow)}>04 — Standards</p>
            <h2 id="standards-heading" {...stylex.props(styles.standardsH2)}>
              Our promise, <span {...stylex.props(styles.italicGreen300)}>codified.</span>
            </h2>
          </div>
        </Reveal>
        <div {...stylex.props(styles.standardsGrid)}>
          {pillars.map((pillar, i) => {
            const detail = PILLAR_DETAIL[i];
            const Icon = detail.icon;
            return (
              <Reveal key={pillar.title} delay={i * 0.1}>
                <div {...stylex.props(styles.standardCard)}>
                  <span aria-hidden {...stylex.props(styles.standardIconBadge)}>
                    <Icon
                      style={{
                        height: "1.25rem",
                        width: "1.25rem",
                      }}
                    />
                  </span>
                  <h3 {...stylex.props(styles.standardH3)}>{pillar.title}</h3>
                  <p {...stylex.props(styles.standardP)}>{detail.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function MarqueeStrip() {
  return (
    <div aria-hidden {...stylex.props(styles.marqueeStrip)}>
      <div {...stylex.props(styles.marqueeTrackWrapper)}>
        {MARQUEE_TRACK.map((label, i) => (
          <span key={`${label}-${i}`} {...stylex.props(styles.marqueeItem)}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
function CtaSection() {
  return (
    <section id="contact" aria-labelledby="cta-heading" {...stylex.props(styles.ctaSection)}>
      {/* Central brand-green glow orb */}
      <div aria-hidden {...stylex.props(styles.ctaGlowGreen)} />
      {/* Secondary brand-blue glow accent */}
      <div aria-hidden {...stylex.props(styles.ctaGlowBlue)} />

      <Reveal>
        <div {...stylex.props(styles.ctaContent)}>
          <p {...stylex.props(styles.chapterEyebrow)}>Partner with Fenchem</p>
          <h2 id="cta-heading" {...stylex.props(styles.ctaH2)}>
            Bring the forest to{" "}
            <span {...stylex.props(styles.italicGreen300)}>your formulation.</span>
          </h2>
          <p {...stylex.props(styles.ctaP)}>
            Our team of botanical scientists and regulatory specialists are ready to accelerate your
            next ingredient partnership.
          </p>
          <div {...stylex.props(styles.ctaBtns)}>
            <a href="mailto:sales@fenchem.com" {...stylex.props(styles.ctaPrimaryBtn)}>
              Request a Specification
              <ArrowUpRight
                style={{
                  height: "1rem",
                  width: "1rem",
                }}
                aria-hidden
              />
            </a>
            <a href="#portfolio" {...stylex.props(styles.ctaSecondaryBtn)}>
              Explore Portfolio
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
function SiteFooter() {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.footerContainer)}>
        <div>
          <p {...stylex.props(styles.footerBrand)}>Fenchem</p>
          <p {...stylex.props(styles.footerSub)}>Rooted in Nature, Refined by Science</p>
        </div>
        <nav aria-label="Footer navigation" {...stylex.props(styles.footerNav)}>
          {["Privacy Policy", "Terms of Service", "Ingredient Transparency", "Global Offices"].map(
            (label) => (
              <a key={label} href="#top" {...stylex.props(styles.footerNavLink)}>
                {label}
              </a>
            ),
          )}
        </nav>
        <p {...stylex.props(styles.footerLegal)}>
          &copy; 2026 Fenchem Biotek Ltd. — ISO &amp; GMP Certified · 40+ Countries
        </p>
      </div>
    </footer>
  );
}
export function VariantF() {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        <main {...stylex.props(styles.root)}>
          <HeroNav reduce={reduce} />
          <HeroHeader reduce={reduce} />
          <StatsBand />
          <MarqueeStrip />
          <OriginChapter />
          <ScienceChapter />
          <IngredientRail />
          <StandardsPillars />
          <CtaSection />
          <SiteFooter />
        </main>
      </AnimatePresence>
    </LazyMotion>
  );
}
