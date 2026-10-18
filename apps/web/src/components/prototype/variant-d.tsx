import {
  ArrowUpRight,
  Award,
  FlaskConical,
  Globe,
  Leaf,
  MapPin,
  Sprout,
} from "@fenchem-lp/ui/components/lucide";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
} from "@/compat/motion";
import type { MotionValue } from "@/compat/motion";
import { createSignal, Show } from "solid-js";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import { EASE } from "@/components/prototype/motion-constants";
import { Eyebrow, Intro, Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certificationDetails,
  company,
  ingredients,
  industries,
  pillars,
  regions,
  stats,
} from "@/components/landing/landing-content";

/*
 * PROTOTYPE — Variant D: "Botanical Editorial" (green-led, brand book)
 * Premium wellness-magazine feel. Clean white (bg-paper) canvas, NOT warm cream.
 * font-display (Newsreader serif) for display headlines; font-body (Plus Jakarta) elsewhere.
 * GREEN-LED: brand-green-500/600 as primary accents, brand-blue-700 secondary.
 * Deep green footer (bg-brand-green-950) with paper text.
 * Floating pill nav, blob-masked hero image, asymmetric industry cards,
 * split "Rooted in Nature, Refined by Science" section, ingredient chips,
 * quiet certification strip, full-width CTA band.
 */

const NAV_LINKS = [
  {
    label: "Industries",
    href: "#industries",
  },
  {
    label: "Science",
    href: "#science",
  },
  {
    label: "Ingredients",
    href: "#ingredients",
  },
  {
    label: "Quality",
    href: "#quality",
  },
] as const;
const PILLAR_ICONS = [Sprout, FlaskConical, Globe] as const;
const marquee = stylex.keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "100%": {
    transform: "translateX(-50%)",
  },
});
// stylex.attrs with reactive (accessor) arguments resolves at runtime here, because
// the StyleX compiler tries to evaluate them at build time and throws.
const sxProps = (...args: ReadonlyArray<StyleXStyles | false | null | undefined>) =>
  stylex.attrs(...args);
const styles = stylex.create({
  root: {
    overflowX: "clip",
    backgroundColor: colors.paper,
    fontFamily: typography.body,
    color: colors.ink,
    WebkitFontSmoothing: "antialiased",
    "::selection": {
      backgroundColor: colors.brandGreen100,
      color: colors.brandGreen800,
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
    maxWidth: "960px",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-paper) 85%, transparent)",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "1.5rem",
    paddingRight: "0.5rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  logo: {
    fontFamily: typography.body,
    fontSize: "1.25rem",
    fontWeight: 600,
    letterSpacing: "-0.025em",
    color: {
      default: colors.ink,
      ":hover": colors.brandGreen700,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  desktopLinks: {
    display: {
      default: "none",
      [breakpoints.md]: "flex",
    },
    alignItems: "center",
    gap: "1.75rem",
  },
  navLink: {
    fontFamily: typography.body,
    fontSize: "0.875rem",
    color: {
      default: colors.mute600,
      ":hover": colors.ink,
    },
    textDecoration: "none",
    borderRadius: radii.sm,
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  navCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "1.25rem",
    paddingBlock: "0.625rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: colors.brandGreen950,
    textDecoration: "none",
    minHeight: "2.75rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    transitionProperty: "background-color, transform",
    transitionDuration: "300ms",
    transform: {
      default: "none",
      ":hover": "translateY(-2px)",
    },
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  mobileMenuButton: {
    display: {
      default: "flex",
      [breakpoints.md]: "none",
    },
    height: "2.5rem",
    width: "2.5rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: colors.line,
      ":hover": colors.brandGreen300,
    },
    color: {
      default: colors.mute600,
      ":hover": colors.brandGreen600,
    },
    backgroundColor: "transparent",
    cursor: "pointer",
    transitionProperty: "color, border-color",
    transitionDuration: "200ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  hamburgerGrid: {
    display: "grid",
    gap: "0.25rem",
  },
  hamburgerBar: {
    display: "block",
    height: "2px",
    width: "1.25rem",
    backgroundColor: "currentColor",
    transitionProperty: "transform, opacity",
    transitionDuration: "300ms",
  },
  hamburgerBarTopOpen: {
    transform: "translateY(6px) rotate(45deg)",
  },
  hamburgerBarMidOpen: {
    opacity: 0,
  },
  hamburgerBarBotOpen: {
    transform: "translateY(-6px) rotate(-45deg)",
  },
  mobileDropdown: {
    marginInline: "auto",
    marginTop: "0.5rem",
    maxWidth: "960px",
    overflow: "hidden",
    borderRadius: radii["3xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-paper) 95%, transparent)",
    paddingInline: "1.5rem",
    paddingBlock: "1.25rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    display: {
      default: "block",
      [breakpoints.md]: "none",
    },
  },
  mobileList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  mobileLink: {
    display: "block",
    borderRadius: radii.xl,
    paddingInline: "0.75rem",
    paddingBlock: "0.75rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    color: {
      default: colors.mute600,
      ":hover": colors.brandGreen700,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandGreen50,
    },
    textDecoration: "none",
    minHeight: "2.75rem",
    transitionProperty: "background-color, color",
    transitionDuration: "200ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  /* ─── Hero ────────────────────────────────────────────── */
  heroHeader: {
    position: "relative",
    overflow: "hidden",
    paddingTop: {
      default: "9rem",
      [breakpoints.md]: "13rem",
    },
    paddingBottom: {
      default: "6rem",
      [breakpoints.md]: "10rem",
    },
  },
  heroGlow: {
    pointerEvents: "none",
    position: "absolute",
    top: "-8rem",
    left: "-10%",
    height: "600px",
    width: "600px",
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen50,
    filter: "blur(48px)",
    opacity: 0.6,
  },
  heroContainer: {
    position: "relative",
    zIndex: 10,
    marginInline: "auto",
    display: "grid",
    maxWidth: "1280px",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
    alignItems: "center",
    gap: {
      default: "4rem",
      [breakpoints.lg]: "2.5rem",
    },
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "3rem",
      [breakpoints.lg]: "4rem",
    },
  },
  heroLeft: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 7",
    },
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.brandGreen200,
    backgroundColor: colors.brandGreen50,
    paddingInline: "1rem",
    paddingBlock: "0.375rem",
    fontFamily: typography.tech,
    fontSize: {
      default: "10px",
      [breakpoints.md]: "11px",
    },
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: colors.brandGreen700,
  },
  badgeIcon: {
    height: "0.875rem",
    width: "0.875rem",
  },
  heroH1: {
    marginTop: "2rem",
    fontFamily: typography.display,
    fontSize: "clamp(3rem, 7.5vw, 6.25rem)",
    fontWeight: 400,
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
    color: colors.ink,
  },
  emGreen: {
    fontStyle: "normal",
    color: colors.brandGreen700,
  },
  emBlue: {
    fontStyle: "italic",
    color: colors.brandBlue700,
  },
  heroP: {
    marginTop: "2rem",
    maxWidth: "36rem",
    fontFamily: typography.body,
    fontSize: {
      default: "1.125rem",
      [breakpoints.md]: "1.25rem",
    },
    lineHeight: 1.625,
    color: colors.mute600,
  },
  heroBtnGroup: {
    marginTop: "2.5rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "1rem",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "2rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    color: colors.brandGreen950,
    textDecoration: "none",
    minHeight: "2.75rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    transitionProperty: "background-color, transform",
    transitionDuration: "300ms",
    transform: {
      default: "none",
      ":hover": "translateY(-2px)",
    },
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: colors.brandBlue200,
      ":hover": colors.brandBlue400,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandBlue50,
    },
    paddingInline: "2rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    color: colors.brandBlue700,
    textDecoration: "none",
    minHeight: "2.75rem",
    transitionProperty: "color, border-color, background-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandBlue500}`,
      outlineOffset: "2px",
    },
  },
  heroRight: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 5",
    },
  },
  blobFrame: {
    position: "relative",
    marginInline: "auto",
    width: "100%",
    maxWidth: "520px",
  },
  blobInner: {
    position: "relative",
  },
  blobHalo: {
    pointerEvents: "none",
    position: "absolute",
    inset: "-1.5rem",
    transform: "rotate(6deg)",
    opacity: 0.4,
    borderRadius: "42% 58% 62% 38% / 47% 59% 41% 53%",
    backgroundColor: colors.brandGreen400,
    filter: "blur(8px)",
  },
  blobImgContainer: {
    overflow: "hidden",
    borderRadius: "58% 42% 38% 62% / 53% 41% 59% 47%",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  },
  blobImg: {
    aspectRatio: "4 / 5",
    width: "100%",
    objectFit: "cover",
    display: "block",
  },
  isoBadge: {
    position: "absolute",
    right: {
      default: 0,
      [breakpoints.md]: "-1rem",
    },
    top: {
      default: "2rem",
      [breakpoints.md]: "3rem",
    },
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-paper) 90%, transparent)",
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: colors.brandGreen700,
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
  heroStatCard: {
    position: "absolute",
    bottom: {
      default: "-1.5rem",
      [breakpoints.md]: "-2rem",
    },
    left: {
      default: 0,
      [breakpoints.md]: "-2rem",
    },
    maxWidth: "220px",
    borderRadius: radii["3xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.paper,
    padding: "1.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  },
  heroStatLabel: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: colors.mute600,
    margin: 0,
  },
  heroStatVal: {
    marginTop: "0.5rem",
    fontFamily: typography.display,
    fontSize: "2.25rem",
    fontWeight: 300,
    color: colors.brandGreen600,
    margin: 0,
  },
  heroStatDesc: {
    marginTop: "0.25rem",
    fontFamily: typography.body,
    fontSize: "0.75rem",
    lineHeight: 1.5,
    color: colors.mute600,
    margin: 0,
  },
  /* ─── Industries ──────────────────────────────────────── */
  section: {
    scrollMarginTop: "7rem",
    paddingBlock: {
      default: "7rem",
      [breakpoints.md]: "10rem",
    },
  },
  container: {
    marginInline: "auto",
    maxWidth: "1280px",
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "3rem",
      [breakpoints.lg]: "4rem",
    },
  },
  sectionHeaderFlex: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: "2rem",
    alignItems: {
      default: "flex-start",
      [breakpoints.md]: "flex-end",
    },
    justifyContent: "space-between",
  },
  sectionH2: {
    marginTop: "1.25rem",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3rem",
      [breakpoints.lg]: "3.75rem",
    },
    fontWeight: 300,
    letterSpacing: "-0.025em",
    color: colors.ink,
    lineHeight: 1.1,
  },
  emGreen600: {
    fontStyle: "italic",
    color: colors.brandGreen600,
  },
  sectionSubP: {
    maxWidth: "24rem",
    fontFamily: typography.body,
    fontSize: "1rem",
    lineHeight: 1.625,
    color: colors.mute600,
  },
  industriesGrid: {
    marginTop: {
      default: "4rem",
      [breakpoints.md]: "6rem",
    },
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(3, 1fr)",
    },
    gap: {
      default: "3rem",
      [breakpoints.md]: "2rem",
      [breakpoints.lg]: "2.5rem",
    },
  },
  offset0: {
    marginTop: 0,
  },
  offset1: {
    marginTop: {
      default: 0,
      [breakpoints.md]: "4rem",
      [breakpoints.lg]: "6rem",
    },
  },
  offset2: {
    marginTop: {
      default: 0,
      [breakpoints.md]: "2rem",
      [breakpoints.lg]: "3rem",
    },
  },
  industryCard: {
    display: "block",
    textDecoration: "none",
    borderRadius: radii["3xl"],
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  industryImgWrapper: {
    overflow: "hidden",
    borderRadius: "24px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    transitionProperty: "box-shadow",
    transitionDuration: "500ms",
  },
  industryImgWrapperAspect34: {
    aspectRatio: "3 / 4",
  },
  industryImgWrapperAspect45: {
    aspectRatio: "4 / 5",
  },
  industryImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
  },
  industryTitleRow: {
    marginTop: "1.75rem",
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
  },
  industryNum: {
    fontFamily: typography.tech,
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    color: colors.brandGreen700,
  },
  industryH3: {
    fontFamily: typography.display,
    fontSize: {
      default: "1.5rem",
      [breakpoints.md]: "1.65rem",
    },
    fontWeight: 500,
    letterSpacing: "-0.025em",
    color: colors.ink,
    margin: 0,
  },
  industryP: {
    marginTop: "0.75rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: colors.mute600,
  },
  industryLink: {
    marginTop: "1.25rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: colors.brandGreen700,
    transitionProperty: "color",
    transitionDuration: "300ms",
  },
  /* ─── Science / Split Section ─────────────────────────── */
  scienceTintBand: {
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-50) 50%, transparent)",
    paddingBlock: "0.25rem",
  },
  scienceContainer: {
    paddingTop: "5rem",
    paddingBottom: "2rem",
  },
  scienceGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(2, 1fr)",
    },
    alignItems: "center",
    gap: {
      default: "5rem",
      [breakpoints.lg]: "7rem",
    },
  },
  scienceImgWrapper: {
    position: "relative",
  },
  scienceGlow: {
    pointerEvents: "none",
    position: "absolute",
    left: "-3rem",
    top: "-3rem",
    height: "16rem",
    width: "16rem",
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen100,
    filter: "blur(48px)",
    opacity: 0.5,
  },
  sciencePrimaryImgContainer: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "28px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  },
  sciencePrimaryImg: {
    aspectRatio: "4 / 5",
    width: "100%",
    objectFit: "cover",
    display: "block",
  },
  scienceImgOverlay: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, transparent 60%, oklch(from var(--color-brand-green-900) l c h / 0.35) 100%)",
  },
  scienceSecondaryImgContainer: {
    position: "absolute",
    bottom: "-2.5rem",
    right: "0.5rem",
    width: {
      default: "10rem",
      [breakpoints.md]: "14rem",
    },
    transform: "rotate(2deg)",
    overflow: "hidden",
    borderRadius: "20px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: colors.paper,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    transitionProperty: "transform",
    transitionDuration: "500ms",
    ":hover": {
      transform: "rotate(0deg)",
    },
  },
  scienceSecondaryImg: {
    aspectRatio: "4 / 3",
    width: "100%",
    objectFit: "cover",
    display: "block",
  },
  scienceH2: {
    marginTop: "1.25rem",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3rem",
      [breakpoints.lg]: "3.75rem",
    },
    fontWeight: 300,
    lineHeight: 1.08,
    letterSpacing: "-0.025em",
    color: colors.ink,
  },
  scienceP: {
    marginTop: "2rem",
    maxWidth: "36rem",
    fontFamily: typography.body,
    fontSize: "1.125rem",
    lineHeight: 1.625,
    color: colors.mute600,
  },
  statsGrid: {
    marginTop: "3rem",
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.sm]: "repeat(2, 1fr)",
    },
    gap: "1rem",
  },
  statCard: {
    height: "100%",
    borderRadius: "20px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: colors.line,
      ":hover": colors.brandGreen300,
    },
    backgroundColor: colors.paper,
    paddingInline: "1.5rem",
    paddingBlock: "1.25rem",
    boxShadow: {
      default: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      ":hover": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    },
    transitionProperty: "border-color, box-shadow",
    transitionDuration: "300ms",
  },
  statValGreen: {
    fontFamily: typography.display,
    fontSize: {
      default: "1.875rem",
      [breakpoints.md]: "2.25rem",
    },
    fontWeight: 300,
    color: colors.brandGreen600,
    display: "block",
  },
  statValBlue: {
    fontFamily: typography.display,
    fontSize: {
      default: "1.875rem",
      [breakpoints.md]: "2.25rem",
    },
    fontWeight: 300,
    color: colors.brandBlue700,
    display: "block",
  },
  statLabel: {
    marginTop: "0.375rem",
    fontFamily: typography.body,
    fontSize: {
      default: "0.75rem",
      [breakpoints.md]: "0.875rem",
    },
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  pillarsDivider: {
    marginTop: {
      default: "6rem",
      [breakpoints.md]: "8rem",
    },
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: {
      default: "4rem",
      [breakpoints.md]: "5rem",
    },
  },
  pillarsGrid: {
    marginTop: "3.5rem",
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(3, 1fr)",
    },
    gap: {
      default: "3rem",
      [breakpoints.md]: "2.5rem",
    },
  },
  pillarIconBadge: {
    display: "flex",
    height: "3rem",
    width: "3rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen100,
    color: colors.brandGreen600,
    transitionProperty: "background-color, color",
    transitionDuration: "300ms",
  },
  pillarH3: {
    marginTop: "1.5rem",
    fontFamily: typography.display,
    fontSize: "1.5rem",
    fontWeight: 500,
    letterSpacing: "-0.025em",
    color: colors.ink,
  },
  pillarP: {
    marginTop: "0.75rem",
    maxWidth: "20rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: colors.mute600,
  },
  /* ─── Ingredients ─────────────────────────────────────── */
  marqueeWrapper: {
    position: "relative",
    marginBottom: "5rem",
    overflow: "hidden",
  },
  marqueeTrack: {
    display: "flex",
    gap: "1rem",
    width: "max-content",
    animationName: {
      default: marquee,
      [breakpoints.motionReduce]: "none",
    },
    animationDuration: "32s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  marqueeItem: {
    height: "7rem",
    width: "10rem",
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: radii["2xl"],
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },
  marqueeImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    display: "block",
  },
  centerContainer: {
    marginInline: "auto",
    maxWidth: "1080px",
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "3rem",
    },
    textAlign: "center",
  },
  ingredientsH2: {
    marginInline: "auto",
    marginTop: "1.25rem",
    maxWidth: "48rem",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3rem",
      [breakpoints.lg]: "3.75rem",
    },
    fontWeight: 300,
    letterSpacing: "-0.025em",
    color: colors.ink,
  },
  ingredientsP: {
    marginInline: "auto",
    marginTop: "1.75rem",
    maxWidth: "36rem",
    fontFamily: typography.body,
    fontSize: {
      default: "1rem",
      [breakpoints.md]: "1.125rem",
    },
    lineHeight: 1.625,
    color: colors.mute600,
  },
  chipsContainer: {
    marginTop: "3.5rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: {
      default: "0.75rem",
      [breakpoints.md]: "1rem",
    },
  },
  ingredientChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.625rem",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: colors.brandGreen200,
      ":hover": colors.brandGreen400,
    },
    backgroundColor: {
      default: colors.brandGreen50,
      ":hover": colors.brandGreen100,
    },
    paddingInline: "1.5rem",
    paddingBlock: "0.75rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 500,
    color: colors.brandGreen700,
    textDecoration: "none",
    minHeight: "2.75rem",
    transitionProperty: "background-color, border-color, transform, box-shadow",
    transitionDuration: "300ms",
    transform: {
      default: "none",
      ":hover": "translateY(-2px)",
    },
    boxShadow: {
      default: "none",
      ":hover": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  chipIcon: {
    height: "0.875rem",
    width: "0.875rem",
    color: colors.brandGreen500,
    transitionProperty: "transform",
    transitionDuration: "300ms",
  },
  specLinkWrapper: {
    marginTop: "3rem",
  },
  specLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: {
      default: colors.brandGreen700,
      ":hover": colors.brandGreen800,
    },
    textDecoration: "none",
    borderRadius: radii.sm,
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  /* ─── Quality ─────────────────────────────────────────── */
  qualitySection: {
    scrollMarginTop: "7rem",
    paddingBlock: {
      default: "4rem",
      [breakpoints.md]: "5rem",
    },
  },
  qualityCard: {
    borderRadius: radii["3xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-50) 40%, transparent)",
    paddingInline: {
      default: "2rem",
      [breakpoints.md]: "3.5rem",
    },
    paddingBlock: {
      default: "2.5rem",
      [breakpoints.md]: "3rem",
    },
  },
  qualityFlex: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: "2rem",
    alignItems: {
      default: "flex-start",
      [breakpoints.md]: "center",
    },
    justifyContent: "space-between",
  },
  qualityLeft: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexShrink: 0,
  },
  qualityIconBadge: {
    display: "flex",
    height: "2.5rem",
    width: "2.5rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen100,
    color: colors.brandGreen600,
  },
  qualityLabel: {
    fontFamily: typography.tech,
    fontSize: {
      default: "10px",
      [breakpoints.md]: "11px",
    },
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: colors.mute600,
    margin: 0,
  },
  certsList: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: {
      default: "1.5rem",
      [breakpoints.md]: "2.5rem",
    },
    rowGap: "1rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  certItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.125rem",
  },
  certName: {
    fontFamily: typography.tech,
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: {
      default: colors.ink,
      ":hover": colors.brandGreen700,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
  },
  certSub: {
    fontFamily: typography.body,
    fontSize: "10px",
    color: colors.mute600,
  },
  /* ─── Global Presence ─────────────────────────────────── */
  globalSection: {
    paddingBlock: {
      default: "5rem",
      [breakpoints.md]: "7rem",
    },
  },
  globalFlex: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: {
      default: "2.5rem",
      [breakpoints.md]: "5rem",
    },
    alignItems: "flex-start",
  },
  globalLeft: {
    flexShrink: 0,
    width: {
      default: "auto",
      [breakpoints.md]: "16rem",
    },
  },
  globalH2: {
    marginTop: "1rem",
    fontFamily: typography.display,
    fontSize: {
      default: "1.875rem",
      [breakpoints.md]: "2.25rem",
    },
    fontWeight: 300,
    letterSpacing: "-0.025em",
    color: colors.ink,
  },
  globalRight: {
    flex: 1,
    width: "100%",
  },
  regionsGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.sm]: "repeat(2, 1fr)",
      [breakpoints.lg]: "repeat(3, 1fr)",
    },
    gap: "0.75rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  regionCard: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    borderRadius: radii["2xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: colors.line,
      ":hover": colors.brandBlue200,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklch, var(--color-brand-blue-50) 30%, transparent)",
    },
    paddingInline: "1.25rem",
    paddingBlock: "1rem",
    transitionProperty: "border-color, background-color",
    transitionDuration: "300ms",
  },
  regionIcon: {
    height: "1rem",
    width: "1rem",
    flexShrink: 0,
    color: colors.brandBlue400,
  },
  regionText: {
    fontFamily: typography.body,
    fontSize: "0.875rem",
    color: colors.mute600,
  },
  /* ─── CTA ─────────────────────────────────────────────── */
  ctaCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "40px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.brandGreen200,
    backgroundColor: colors.brandGreen50,
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "5rem",
    },
    paddingBlock: {
      default: "5rem",
      [breakpoints.md]: "7rem",
    },
    textAlign: "center",
  },
  ctaBlobGreen: {
    pointerEvents: "none",
    position: "absolute",
    left: "-6rem",
    top: "-6rem",
    height: "18rem",
    width: "18rem",
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-200) 50%, transparent)",
    filter: "blur(48px)",
  },
  ctaBlobBlue: {
    pointerEvents: "none",
    position: "absolute",
    bottom: "-8rem",
    right: "-4rem",
    height: "20rem",
    width: "20rem",
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklch, var(--color-brand-blue-100) 40%, transparent)",
    filter: "blur(48px)",
  },
  ctaContent: {
    position: "relative",
  },
  ctaH2: {
    marginInline: "auto",
    marginTop: "1.5rem",
    maxWidth: "48rem",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3.75rem",
    },
    fontWeight: 300,
    lineHeight: 1.08,
    letterSpacing: "-0.025em",
    color: colors.ink,
  },
  ctaP: {
    marginInline: "auto",
    marginTop: "1.75rem",
    maxWidth: "36rem",
    fontFamily: typography.body,
    fontSize: {
      default: "1rem",
      [breakpoints.md]: "1.125rem",
    },
    lineHeight: 1.625,
    color: colors.mute600,
  },
  ctaBtnGroup: {
    marginTop: "2.5rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  ctaPrimaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "2.25rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    color: colors.brandGreen950,
    textDecoration: "none",
    minHeight: "2.75rem",
    boxShadow: {
      default: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      ":hover": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    },
    transitionProperty: "background-color, transform, box-shadow",
    transitionDuration: "300ms",
    transform: {
      default: "none",
      ":hover": "translateY(-2px)",
    },
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  ctaSecondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: colors.brandBlue300,
      ":hover": colors.brandBlue500,
    },
    backgroundColor: {
      default: "color-mix(in oklch, var(--color-paper) 60%, transparent)",
      ":hover": colors.brandBlue50,
    },
    paddingInline: "2.25rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    color: colors.brandBlue700,
    textDecoration: "none",
    minHeight: "2.75rem",
    transitionProperty: "color, border-color, background-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandBlue500}`,
      outlineOffset: "2px",
    },
  },
  /* ─── Footer ──────────────────────────────────────────── */
  footer: {
    backgroundColor: colors.brandGreen950,
    color: colors.paper,
  },
  footerContainer: {
    marginInline: "auto",
    maxWidth: "1280px",
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "3rem",
      [breakpoints.lg]: "4rem",
    },
    paddingTop: {
      default: "5rem",
      [breakpoints.md]: "7rem",
    },
    paddingBottom: "2.5rem",
  },
  footerEyebrow: {
    fontFamily: typography.tech,
    fontSize: {
      default: "10px",
      [breakpoints.md]: "11px",
    },
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: "color-mix(in oklch, var(--color-brand-green-400) 80%, transparent)",
  },
  footerWordmark: {
    marginTop: "1.5rem",
    fontFamily: typography.display,
    fontSize: "clamp(4rem, 13vw, 10rem)",
    fontWeight: 300,
    lineHeight: 0.95,
    letterSpacing: "-0.025em",
    color: colors.paper,
  },
  footerWordmarkDot: {
    color: colors.brandGreen400,
  },
  footerColsGrid: {
    marginTop: "4rem",
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(3, 1fr)",
    },
    gap: {
      default: "3rem",
      [breakpoints.md]: "2.5rem",
    },
  },
  footerColP: {
    maxWidth: "20rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-brand-green-200) 70%, transparent)",
  },
  footerEmailLink: {
    marginTop: "1.5rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: {
      default: colors.brandGreen400,
      ":hover": colors.brandGreen300,
    },
    textDecoration: "none",
    borderRadius: radii.sm,
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  footerColHead: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: "color-mix(in oklch, var(--color-brand-green-400) 80%, transparent)",
  },
  footerNavList: {
    marginTop: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  footerNavLink: {
    fontFamily: typography.body,
    fontSize: "0.875rem",
    color: {
      default: "color-mix(in oklch, var(--color-brand-green-200) 70%, transparent)",
      ":hover": colors.brandGreen300,
    },
    textDecoration: "none",
    borderRadius: radii.sm,
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  footerLegalRow: {
    marginTop: "4rem",
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.brandGreen800,
    paddingTop: "2rem",
  },
  footerLegalText: {
    fontFamily: typography.body,
    fontSize: "0.75rem",
    color: "color-mix(in oklch, var(--color-brand-green-400) 80%, transparent)",
    margin: 0,
  },
  footerLegalLinks: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
});

/* ─── NavBar ─────────────────────────────────────────────────── */

function NavBar() {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = createSignal(false);
  return (
    <m.nav
      role="navigation"
      aria-label="Main navigation"
      initial={
        reduce()
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
        duration: reduce() ? 0 : 0.7,
        ease: EASE,
      }}
      {...stylex.attrs(styles.nav)}
    >
      <div {...stylex.attrs(styles.navContainer)}>
        <a href="#top" {...stylex.attrs(styles.logo)}>
          Fenchem
        </a>

        {/* Desktop links */}
        <div aria-label="Site sections" {...stylex.attrs(styles.desktopLinks)}>
          {NAV_LINKS.map((link) => (
            <a href={link.href} {...stylex.attrs(styles.navLink)}>
              {link.label}
            </a>
          ))}
        </div>

        <div {...stylex.attrs(styles.navActions)}>
          <a href="#contact" {...stylex.attrs(styles.navCta)}>
            Partner with Us
          </a>
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen() ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen() ? "true" : "false"}
            onClick={() => setMenuOpen((v) => !v)}
            {...stylex.attrs(styles.mobileMenuButton)}
          >
            <span aria-hidden="true" {...stylex.attrs(styles.hamburgerGrid)}>
              <span {...sxProps(styles.hamburgerBar, menuOpen() && styles.hamburgerBarTopOpen)} />
              <span {...sxProps(styles.hamburgerBar, menuOpen() && styles.hamburgerBarMidOpen)} />
              <span {...sxProps(styles.hamburgerBar, menuOpen() && styles.hamburgerBarBotOpen)} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        <Show when={menuOpen()}>
          <m.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.2,
              ease: EASE,
            }}
            {...stylex.attrs(styles.mobileDropdown)}
          >
            <ul {...stylex.attrs(styles.mobileList)}>
              {NAV_LINKS.map((link) => (
                <li>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    {...stylex.attrs(styles.mobileLink)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        </Show>
      </AnimatePresence>
    </m.nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */

type HeroSectionProps = {
  heroRef: (el: HTMLElement) => void;
  blobY: MotionValue<number>;
};
function HeroSection(props: HeroSectionProps) {
  const reduce = useReducedMotion();
  return (
    <header id="top" ref={props.heroRef} {...stylex.attrs(styles.heroHeader)}>
      {/* Subtle green radial glow behind hero text */}
      <div aria-hidden="true" {...stylex.attrs(styles.heroGlow)} />

      <div {...stylex.attrs(styles.heroContainer)}>
        {/* Left: headline copy */}
        <div {...stylex.attrs(styles.heroLeft)}>
          <Intro delay={0.05}>
            <span {...stylex.attrs(styles.heroBadge)}>
              <Leaf {...stylex.attrs(styles.badgeIcon)} aria-hidden="true" />
              Botanical Intelligence Since 1995
            </span>
          </Intro>

          <Intro delay={0.18}>
            <h1 {...stylex.attrs(styles.heroH1)}>
              Nurturing <em {...stylex.attrs(styles.emGreen)}>Vitality</em>
              <br />
              through Botanical
              <br />
              <em {...stylex.attrs(styles.emBlue)}>Excellence</em>
            </h1>
          </Intro>

          <Intro delay={0.3}>
            <p {...stylex.attrs(styles.heroP)}>
              Premium botanical and functional ingredients for nutrition, food and personal care —
              bridging ancient plant wisdom with modern scientific precision.
            </p>
          </Intro>

          <Intro delay={0.44}>
            <div {...stylex.attrs(styles.heroBtnGroup)}>
              <a href="#ingredients" {...stylex.attrs(styles.primaryBtn)}>
                Explore Portfolio
                <ArrowUpRight
                  style={{
                    height: "1rem",
                    width: "1rem",
                  }}
                  aria-hidden="true"
                />
              </a>
              <a href={`mailto:${company.email}`} {...stylex.attrs(styles.secondaryBtn)}>
                Request a Specification
              </a>
            </div>
          </Intro>
        </div>

        {/* Right: blob-masked botanical image */}
        <div {...stylex.attrs(styles.heroRight)}>
          <Intro delay={0.28}>
            <div {...stylex.attrs(styles.blobFrame)}>
              {/* Glow halo */}
              <div aria-hidden="true" {...stylex.attrs(styles.blobHalo)} />

              <m.div
                style={{
                  y: reduce() ? 0 : props.blobY,
                }}
                {...stylex.attrs(styles.blobInner)}
              >
                {/* Blob image */}
                <div {...stylex.attrs(styles.blobImgContainer)}>
                  <img
                    src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80"
                    alt="Macro photograph of a green leaf with morning dew, representing botanical purity"
                    loading="eager"
                    {...stylex.attrs(styles.blobImg)}
                  />
                </div>

                {/* ISO badge */}
                <span {...stylex.attrs(styles.isoBadge)}>ISO · GMP Certified</span>

                {/* Floating stat card */}
                <m.div
                  animate={
                    reduce()
                      ? undefined
                      : {
                          y: [0, -8, 0],
                        }
                  }
                  transition={
                    reduce()
                      ? undefined
                      : {
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  {...stylex.attrs(styles.heroStatCard)}
                >
                  <p {...stylex.attrs(styles.heroStatLabel)}>Extraction Yield</p>
                  <p {...stylex.attrs(styles.heroStatVal)}>98%</p>
                  <p {...stylex.attrs(styles.heroStatDesc)}>
                    Bio-active retention across our extraction process.
                  </p>
                </m.div>
              </m.div>
            </div>
          </Intro>
        </div>
      </div>
    </header>
  );
}

/* ─── Industries ─────────────────────────────────────────────── */

const INDUSTRY_LAYOUTS = [
  {
    offset: styles.offset0,
    aspect: styles.industryImgWrapperAspect34,
  },
  {
    offset: styles.offset1,
    aspect: styles.industryImgWrapperAspect45,
  },
  {
    offset: styles.offset2,
    aspect: styles.industryImgWrapperAspect34,
  },
];

function IndustriesSection() {
  return (
    <section id="industries" {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.container)}>
        <Reveal>
          <div {...stylex.attrs(styles.sectionHeaderFlex)}>
            <div
              style={{
                "max-width": "36rem",
              }}
            >
              <Eyebrow>Where our ingredients work</Eyebrow>
              <h2 {...stylex.attrs(styles.sectionH2)}>
                Purity across <em {...stylex.attrs(styles.emGreen600)}>industries</em>
              </h2>
            </div>
            <p {...stylex.attrs(styles.sectionSubP)}>
              Crafted to meet the rigorous demands of global leaders in health, wellness and beauty.
            </p>
          </div>
        </Reveal>

        <div {...stylex.attrs(styles.industriesGrid)}>
          {industries.map((industry, i) => (
            <Reveal delay={i * 0.12}>
              <div {...stylex.attrs(INDUSTRY_LAYOUTS[i].offset)}>
                <a href="#ingredients" {...stylex.attrs(styles.industryCard)}>
                  <div {...stylex.attrs(styles.industryImgWrapper, INDUSTRY_LAYOUTS[i].aspect)}>
                    <img
                      src={industry.image.src}
                      alt={industry.image.alt}
                      loading="lazy"
                      {...stylex.attrs(styles.industryImg)}
                    />
                  </div>
                  <div {...stylex.attrs(styles.industryTitleRow)}>
                    <span {...stylex.attrs(styles.industryNum)}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 {...stylex.attrs(styles.industryH3)}>{industry.title}</h3>
                  </div>
                  <p {...stylex.attrs(styles.industryP)}>{industry.copy}</p>
                  <span {...stylex.attrs(styles.industryLink)}>
                    Explore applications
                    <ArrowUpRight
                      style={{
                        height: "1rem",
                        width: "1rem",
                      }}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Science / Split Section ────────────────────────────────── */

const STAT_VAL_STYLES = [
  styles.statValGreen,
  styles.statValBlue,
  styles.statValGreen,
  styles.statValBlue,
];

function ScienceSection() {
  return (
    <section id="science" {...stylex.attrs(styles.section)}>
      {/* Subtle full-width tint band */}
      <div aria-hidden="true" {...stylex.attrs(styles.scienceTintBand)} />

      <div {...stylex.attrs(styles.container, styles.scienceContainer)}>
        <div {...stylex.attrs(styles.scienceGrid)}>
          {/* Image collage */}
          <Reveal>
            <div {...stylex.attrs(styles.scienceImgWrapper)}>
              <div aria-hidden="true" {...stylex.attrs(styles.scienceGlow)} />
              <div {...stylex.attrs(styles.sciencePrimaryImgContainer)}>
                <img
                  src="https://images.unsplash.com/photo-1569936906148-06de87cb0681?auto=format&fit=crop&w=1000&q=80"
                  alt="Sunlight filtering through a lush forest canopy representing nature and botanical sourcing"
                  loading="lazy"
                  {...stylex.attrs(styles.sciencePrimaryImg)}
                />
                {/* Green gradient overlay for brand feel */}
                <div aria-hidden="true" {...stylex.attrs(styles.scienceImgOverlay)} />
              </div>

              {/* Tilted inset second image */}
              <div {...stylex.attrs(styles.scienceSecondaryImgContainer)}>
                <img
                  src="https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=640&q=80"
                  alt="Scientific laboratory glassware used during botanical extract analysis"
                  loading="lazy"
                  {...stylex.attrs(styles.scienceSecondaryImg)}
                />
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>The Fenchem legacy</Eyebrow>
              <h2 {...stylex.attrs(styles.scienceH2)}>
                Rooted in Nature,
                <br />
                <em {...stylex.attrs(styles.emGreen600)}>Refined by Science.</em>
              </h2>
              <p {...stylex.attrs(styles.scienceP)}>
                Our journey began with a simple belief: that nature holds the keys to human
                vitality. Today we manage a global network of sustainable farms and advanced
                laboratories to bring those keys to our partners, lot after lot.
              </p>
            </Reveal>

            <div {...stylex.attrs(styles.statsGrid)}>
              {stats.map((stat, i) => (
                <Reveal delay={i * 0.08}>
                  <div {...stylex.attrs(styles.statCard)}>
                    <span {...stylex.attrs(STAT_VAL_STYLES[i])}>{stat.value}</span>
                    <p {...stylex.attrs(styles.statLabel)}>{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div {...stylex.attrs(styles.pillarsDivider)}>
          <Reveal>
            <div
              style={{
                "text-align": "center",
              }}
            >
              <Eyebrow>Three pillars of excellence</Eyebrow>
            </div>
          </Reveal>
          <div {...stylex.attrs(styles.pillarsGrid)}>
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal delay={i * 0.12}>
                  <div>
                    <span {...stylex.attrs(styles.pillarIconBadge)}>
                      <Icon
                        style={{
                          height: "1.25rem",
                          width: "1.25rem",
                        }}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 {...stylex.attrs(styles.pillarH3)}>{pillar.title}</h3>
                    <p {...stylex.attrs(styles.pillarP)}>{pillar.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Ingredients ────────────────────────────────────────────── */

const MARQUEE_IMAGES = [
  "photo-1530013526807-2ec93afddab9",
  "photo-1741513599050-487ccfb86275",
  "photo-1601961545517-59307b1fbac3",
  "photo-1559757148-5c350d0d3c56",
  "photo-1569936906148-06de87cb0681",
  "photo-1501004318641-b39e6451bec6",
  "photo-1530013526807-2ec93afddab9",
  "photo-1741513599050-487ccfb86275",
  "photo-1601961545517-59307b1fbac3",
  "photo-1559757148-5c350d0d3c56",
  "photo-1569936906148-06de87cb0681",
  "photo-1501004318641-b39e6451bec6",
];

function IngredientsSection() {
  return (
    <section id="ingredients" {...stylex.attrs(styles.section)}>
      {/* Ingredient image marquee strip */}
      <div aria-hidden="true" {...stylex.attrs(styles.marqueeWrapper)}>
        <div {...stylex.attrs(styles.marqueeTrack)}>
          {MARQUEE_IMAGES.map((id) => (
            <div {...stylex.attrs(styles.marqueeItem)}>
              <img
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=320&q=70`}
                alt=""
                loading="lazy"
                {...stylex.attrs(styles.marqueeImg)}
              />
            </div>
          ))}
        </div>
      </div>

      <div {...stylex.attrs(styles.centerContainer)}>
        <Reveal>
          <div
            style={{
              "text-align": "center",
            }}
          >
            <Eyebrow>The portfolio</Eyebrow>
          </div>
          <h2 {...stylex.attrs(styles.ingredientsH2)}>
            A <em {...stylex.attrs(styles.emGreen600)}>living library</em> of botanical actives
          </h2>
          <p {...stylex.attrs(styles.ingredientsP)}>
            Standardized extracts and functional ingredients, each backed by full identity, potency
            and stability documentation.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div {...stylex.attrs(styles.chipsContainer)}>
            {ingredients.map((ingredient) => (
              <a href={`mailto:${company.email}`} {...stylex.attrs(styles.ingredientChip)}>
                <Leaf {...stylex.attrs(styles.chipIcon)} aria-hidden="true" />
                {ingredient.name}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div {...stylex.attrs(styles.specLinkWrapper)}>
            <a href={`mailto:${company.email}`} {...stylex.attrs(styles.specLink)}>
              Request a Specification
              <ArrowUpRight
                style={{
                  height: "1rem",
                  width: "1rem",
                }}
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Quality / Certification Strip ─────────────────────────── */

function QualitySection() {
  return (
    <section id="quality" {...stylex.attrs(styles.qualitySection)}>
      <div {...stylex.attrs(styles.container)}>
        <Reveal>
          <div {...stylex.attrs(styles.qualityCard)}>
            <div {...stylex.attrs(styles.qualityFlex)}>
              <div {...stylex.attrs(styles.qualityLeft)}>
                <span {...stylex.attrs(styles.qualityIconBadge)}>
                  <Award
                    style={{
                      height: "1.25rem",
                      width: "1.25rem",
                    }}
                    aria-hidden="true"
                  />
                </span>
                <p {...stylex.attrs(styles.qualityLabel)}>Certified quality systems</p>
              </div>

              <ul {...stylex.attrs(styles.certsList)}>
                {certificationDetails.map((cert) => (
                  <li {...stylex.attrs(styles.certItem)}>
                    <span {...stylex.attrs(styles.certName)}>{cert.name}</span>
                    <span {...stylex.attrs(styles.certSub)}>{cert.sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Global Presence Strip ──────────────────────────────────── */

function GlobalSection() {
  return (
    <section aria-label="Global presence" {...stylex.attrs(styles.globalSection)}>
      <div {...stylex.attrs(styles.container)}>
        <Reveal>
          <div {...stylex.attrs(styles.globalFlex)}>
            <div {...stylex.attrs(styles.globalLeft)}>
              <Eyebrow>Global intelligent research</Eyebrow>
              <h2 {...stylex.attrs(styles.globalH2)}>
                Six bases,
                <br />
                <em {...stylex.attrs(styles.emBlue)}>one standard.</em>
              </h2>
            </div>

            <div {...stylex.attrs(styles.globalRight)}>
              <ul {...stylex.attrs(styles.regionsGrid)}>
                {regions.map((region, i) => (
                  <Reveal delay={i * 0.07}>
                    <li {...stylex.attrs(styles.regionCard)}>
                      <MapPin {...stylex.attrs(styles.regionIcon)} aria-hidden="true" />
                      <span {...stylex.attrs(styles.regionText)}>
                        {`${region.city}, ${region.country}${region.city === "Nanjing" ? " — HQ" : ""}`}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CTA Section ────────────────────────────────────────────── */

function CtaSection() {
  return (
    <section id="contact" {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.container)}>
        <Reveal>
          <div {...stylex.attrs(styles.ctaCard)}>
            {/* Decorative background blobs */}
            <div aria-hidden="true" {...stylex.attrs(styles.ctaBlobGreen)} />
            <div aria-hidden="true" {...stylex.attrs(styles.ctaBlobBlue)} />

            <div {...stylex.attrs(styles.ctaContent)}>
              <div
                style={{
                  "text-align": "center",
                }}
              >
                <Eyebrow>Start the conversation</Eyebrow>
              </div>
              <h2 {...stylex.attrs(styles.ctaH2)}>
                Let&rsquo;s formulate{" "}
                <em {...stylex.attrs(styles.emGreen600)}>what&rsquo;s next.</em>
              </h2>
              <p {...stylex.attrs(styles.ctaP)}>
                From first sample to full-scale supply — tell us what you&rsquo;re building and our
                technical team will respond within one business day.
              </p>

              <div {...stylex.attrs(styles.ctaBtnGroup)}>
                <a href={`mailto:${company.email}`} {...stylex.attrs(styles.ctaPrimaryBtn)}>
                  Partner with Fenchem
                  <ArrowUpRight
                    style={{
                      height: "1rem",
                      width: "1rem",
                    }}
                    aria-hidden="true"
                  />
                </a>
                <a href="#ingredients" {...stylex.attrs(styles.ctaSecondaryBtn)}>
                  Explore Portfolio
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */

function FooterSection() {
  return (
    <footer {...stylex.attrs(styles.footer)}>
      <div {...stylex.attrs(styles.footerContainer)}>
        <Reveal>
          <p {...stylex.attrs(styles.footerEyebrow)}>Rooted in Nature, Refined by Science</p>
          <p {...stylex.attrs(styles.footerWordmark)}>
            Fenchem<span {...stylex.attrs(styles.footerWordmarkDot)}>.</span>
          </p>
        </Reveal>

        <div {...stylex.attrs(styles.footerColsGrid)}>
          <Reveal>
            <div>
              <p {...stylex.attrs(styles.footerColP)}>
                A global B2B supplier of botanical and functional ingredients for nutrition, food
                &amp; beverage and personal care — since 1995.
              </p>
              <a href={`mailto:${company.email}`} {...stylex.attrs(styles.footerEmailLink)}>
                {company.email}
                <ArrowUpRight
                  style={{
                    height: "0.875rem",
                    width: "0.875rem",
                  }}
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <p {...stylex.attrs(styles.footerColHead)}>Explore</p>
              <ul {...stylex.attrs(styles.footerNavList)}>
                {NAV_LINKS.map((link) => (
                  <li>
                    <a href={link.href} {...stylex.attrs(styles.footerNavLink)}>
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#contact" {...stylex.attrs(styles.footerNavLink)}>
                    Partner with Us
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div>
              <p {...stylex.attrs(styles.footerColHead)}>Global bases</p>
              <ul {...stylex.attrs(styles.footerNavList)}>
                {regions.map((region) => (
                  <li {...stylex.attrs(styles.footerNavLink)}>
                    {`${region.city}, ${region.country}${region.city === "Nanjing" ? " — HQ" : ""}`}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div {...stylex.attrs(styles.footerLegalRow)}>
          <p {...stylex.attrs(styles.footerLegalText)}>
            © 2026 Fenchem Biotek Ltd. All rights reserved.
          </p>
          <div {...stylex.attrs(styles.footerLegalLinks)}>
            <a href="#top" {...stylex.attrs(styles.footerNavLink)}>
              Privacy Policy
            </a>
            <a href="#top" {...stylex.attrs(styles.footerNavLink)}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root export ────────────────────────────────────────────── */

export function VariantD() {
  const [heroRef, setHeroRef] = createSignal<HTMLElement>();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const reduce = useReducedMotion();
  const blobY = useTransform(() => (reduce() ? 0 : scrollYProgress() * 72));
  return (
    <LazyMotion features={domAnimation} strict>
      <main id="top" {...stylex.attrs(styles.root)}>
        <NavBar />
        <HeroSection heroRef={setHeroRef} blobY={blobY} />
        <IndustriesSection />
        <ScienceSection />
        <IngredientsSection />
        <QualitySection />
        <GlobalSection />
        <CtaSection />
        <FooterSection />
      </main>
    </LazyMotion>
  );
}
