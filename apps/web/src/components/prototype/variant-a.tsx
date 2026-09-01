import {
  certifications,
  industries,
  ingredients,
  pillars,
  regions,
  stats,
} from "@/components/landing/landing-content";
import { Eyebrow, Intro, Reveal } from "@/components/prototype/motion";
import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { breakpoints, colors, radii, shadows, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowUpRight, FlaskConical, Globe, Leaf, Sprout } from "lucide-react";
import { domAnimation, LazyMotion, m, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";

/*
 * PROTOTYPE — Variant A: "Botanical Editorial"
 * Warm cream editorial gallery. Floating pill nav, oversized Newsreader serif
 * hero with italic accents, blob-masked botanical imagery, asymmetric industry
 * cards, split "Rooted in Nature, Refined by Science" section, mint ingredient
 * chips, quiet certification strip, deep forest footer.
 */

const NAV_LINKS = [
  { label: "Industries", href: "#industries" },
  { label: "Science", href: "#science" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Quality", href: "#quality" },
] as const;

const PILLAR_ICONS = [Sprout, FlaskConical, Globe] as const;

const styles = stylex.create({
  main: {
    overflowX: "clip",
    backgroundColor: colors.cream,
    fontFamily: typography.body,
    color: colors.bark,
    WebkitFontSmoothing: "antialiased",
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
  // Nav
  nav: {
    position: "fixed",
    left: { default: "1rem", [breakpoints.md]: 0 },
    right: { default: "1rem", [breakpoints.md]: 0 },
    top: { default: "1rem", [breakpoints.md]: "1.5rem" },
    zIndex: 50,
  },
  navInner: {
    marginInline: "auto",
    display: "flex",
    maxWidth: "920px",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "color-mix(in oklab, var(--color-pebble) 70%, transparent)",
    backgroundColor: "color-mix(in oklab, var(--color-cream) 80%, transparent)",
    paddingBlock: "0.5rem",
    paddingLeft: "1.5rem",
    paddingRight: "0.5rem",
    boxShadow: shadows.ambient,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  navLogo: {
    fontFamily: typography.display,
    fontSize: "1.5rem",
    lineHeight: "2rem",
    fontWeight: 500,
    letterSpacing: "-0.025em",
    color: {
      default: colors.forest,
      ":hover": colors.fern,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  navLinks: {
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
    lineHeight: "1.25rem",
    color: {
      default: "color-mix(in oklab, var(--color-bark) 65%, transparent)",
      ":hover": colors.forest,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  navCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.forest,
      ":hover": colors.fern,
    },
    paddingInline: "1.25rem",
    paddingBlock: "0.625rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 600,
    color: colors.cream,
    boxShadow: shadows.lift,
    transitionProperty: "background-color, transform",
    transitionDuration: "300ms",
    transform: {
      default: "translateY(0)",
      ":hover": "translateY(-2px)",
    },
    textDecoration: "none",
  },
  // Hero
  hero: {
    position: "relative",
    paddingBottom: { default: "6rem", [breakpoints.md]: "9rem" },
    paddingTop: { default: "9rem", [breakpoints.md]: "12rem" },
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
    alignItems: "center",
    gap: {
      default: "4rem",
      [breakpoints.lg]: "2rem",
    },
  },
  heroColLeft: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 7",
    },
  },
  heroColRight: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 5",
    },
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.full,
    backgroundColor: colors.mint,
    paddingInline: "1rem",
    paddingBlock: "0.375rem",
    fontFamily: typography.tech,
    fontSize: { default: "10px", [breakpoints.md]: "11px" },
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: colors.fern,
  },
  heroIcon: {
    width: "0.875rem",
    height: "0.875rem",
  },
  heroTitle: {
    marginTop: "2rem",
    fontFamily: typography.display,
    fontSize: "clamp(3.25rem, 7.5vw, 6.5rem)",
    fontWeight: 300,
    lineHeight: 1.02,
    letterSpacing: "-0.025em",
    color: colors.forest,
  },
  italicMoss: {
    fontStyle: "italic",
    color: colors.moss,
  },
  heroDesc: {
    marginTop: "2rem",
    maxWidth: "36rem",
    fontSize: { default: "1.125rem", [breakpoints.md]: "1.25rem" },
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 65%, transparent)",
  },
  heroActions: {
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
      default: colors.forest,
      ":hover": colors.fern,
    },
    paddingInline: "2rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    color: colors.cream,
    boxShadow: {
      default: shadows.lift,
      ":hover": shadows.ambient,
    },
    transitionProperty: "background-color, transform, box-shadow",
    transitionDuration: "300ms",
    transform: {
      default: "translateY(0)",
      ":hover": "translateY(-2px)",
    },
    textDecoration: "none",
    borderWidth: 0,
    cursor: "pointer",
  },
  outlineBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "color-mix(in oklab, var(--color-moss) 40%, transparent)",
      ":hover": colors.moss,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklab, var(--color-mint) 40%, transparent)",
    },
    paddingInline: "2rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    color: colors.forest,
    transitionProperty: "border-color, background-color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  btnIcon: {
    width: "1rem",
    height: "1rem",
  },
  heroImageWrapper: {
    position: "relative",
    marginInline: "auto",
    width: "100%",
    maxWidth: "540px",
  },
  heroGlowBlob: {
    position: "absolute",
    inset: "-1.25rem",
    transform: "rotate(6deg)",
    backgroundColor: "color-mix(in oklab, var(--color-mint) 70%, transparent)",
    filter: "blur(40px)",
    borderRadius: "42% 58% 62% 38% / 47% 59% 41% 53%",
  },
  heroBlobContainer: {
    position: "relative",
  },
  heroImageMask: {
    overflow: "hidden",
    boxShadow: shadows.ambient,
    borderRadius: "58% 42% 38% 62% / 53% 41% 59% 47%",
  },
  heroImage: {
    aspectRatio: "4 / 5",
    width: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroFloatingTag: {
    position: "absolute",
    right: { default: 0, [breakpoints.md]: "-1rem" },
    top: { default: "2rem", [breakpoints.md]: "3rem" },
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklab, var(--color-cream) 90%, transparent)",
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: colors.fern,
    boxShadow: shadows.lift,
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },
  heroFloatingCard: {
    position: "absolute",
    bottom: { default: "-1.5rem", [breakpoints.md]: "-2rem" },
    left: { default: 0, [breakpoints.md]: "-2rem" },
    maxWidth: "220px",
    borderRadius: "24px",
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    boxShadow: shadows.ambient,
  },
  heroFloatingCardLabel: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: colors.moss,
  },
  heroFloatingCardValue: {
    marginTop: "0.5rem",
    fontFamily: typography.display,
    fontSize: "2.25rem",
    lineHeight: "2.5rem",
    fontWeight: 300,
    color: colors.forest,
  },
  heroFloatingCardDesc: {
    marginTop: "0.25rem",
    fontSize: "0.75rem",
    lineHeight: "1rem",
    color: "color-mix(in oklab, var(--color-bark) 65%, transparent)",
  },
  // Industries
  industriesSection: {
    scrollMarginTop: "7rem",
    paddingBlock: { default: "7rem", [breakpoints.md]: "10rem" },
  },
  industriesHeader: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    gap: "2rem",
    alignItems: { default: "stretch", [breakpoints.md]: "flex-end" },
    justifyContent: { default: "flex-start", [breakpoints.md]: "space-between" },
  },
  sectionHeading: {
    marginTop: "1.25rem",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3rem",
      [breakpoints.lg]: "3.75rem",
    },
    fontWeight: 300,
    letterSpacing: "-0.025em",
    color: colors.forest,
    lineHeight: 1.1,
  },
  industriesSubtext: {
    maxWidth: "24rem",
    fontSize: "1rem",
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 65%, transparent)",
  },
  industriesGrid: {
    marginTop: { default: "4rem", [breakpoints.md]: "6rem" },
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
  industryOffset0: {},
  industryOffset1: {
    marginTop: { default: 0, [breakpoints.md]: "4rem", [breakpoints.lg]: "6rem" },
  },
  industryOffset2: {
    marginTop: { default: 0, [breakpoints.md]: "2rem", [breakpoints.lg]: "3rem" },
  },
  industryCardLink: {
    display: "block",
    textDecoration: "none",
    color: "inherit",
  },
  industryImageWrap34: {
    overflow: "hidden",
    borderRadius: "24px",
    boxShadow: {
      default: shadows.lift,
      ":hover": shadows.ambient,
    },
    aspectRatio: "3 / 4",
    transitionProperty: "box-shadow",
    transitionDuration: "500ms",
  },
  industryImageWrap45: {
    overflow: "hidden",
    borderRadius: "24px",
    boxShadow: {
      default: shadows.lift,
      ":hover": shadows.ambient,
    },
    aspectRatio: "4 / 5",
    transitionProperty: "box-shadow",
    transitionDuration: "500ms",
  },
  industryImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
  },
  industryMeta: {
    marginTop: "1.75rem",
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
  },
  industryNumber: {
    fontFamily: typography.tech,
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    color: colors.moss,
  },
  industryTitle: {
    fontFamily: typography.display,
    fontSize: { default: "1.5rem", [breakpoints.md]: "1.65rem" },
    fontWeight: 500,
    letterSpacing: "-0.025em",
    color: colors.forest,
  },
  industryCopy: {
    marginTop: "0.75rem",
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 65%, transparent)",
  },
  industryAction: {
    marginTop: "1.25rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: {
      default: colors.fern,
      ":hover": colors.forest,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
  },
  // Science
  scienceSection: {
    scrollMarginTop: "7rem",
    backgroundColor: colors.parchment,
    paddingBlock: { default: "7rem", [breakpoints.md]: "10rem" },
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
      [breakpoints.lg]: "6rem",
    },
  },
  scienceImageWrapper: {
    position: "relative",
  },
  scienceGlow: {
    position: "absolute",
    left: "-3rem",
    top: "-3rem",
    height: "16rem",
    width: "16rem",
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklab, var(--color-mist) 80%, transparent)",
    filter: "blur(48px)",
  },
  sciencePrimaryImgContainer: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "28px",
    boxShadow: shadows.ambient,
  },
  sciencePrimaryImg: {
    aspectRatio: "4 / 5",
    width: "100%",
    objectFit: "cover",
    display: "block",
  },
  scienceFloatingImgContainer: {
    position: "absolute",
    bottom: "-2.5rem",
    right: { default: "0.5rem", [breakpoints.md]: "-2.5rem" },
    width: { default: "10rem", [breakpoints.md]: "14rem" },
    transform: {
      default: "rotate(2deg)",
      ":hover": "rotate(0deg)",
    },
    overflow: "hidden",
    borderRadius: "20px",
    borderWidth: "6px",
    borderStyle: "solid",
    borderColor: colors.cream,
    boxShadow: shadows.ambient,
    transitionProperty: "transform",
    transitionDuration: "500ms",
  },
  scienceFloatingImg: {
    aspectRatio: "4 / 3",
    width: "100%",
    objectFit: "cover",
    display: "block",
  },
  scienceHeading: {
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
    color: colors.forest,
  },
  scienceCopy: {
    marginTop: "2rem",
    maxWidth: "36rem",
    fontSize: "1.125rem",
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 65%, transparent)",
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
      default: colors.pebble,
      ":hover": colors.mint,
    },
    backgroundColor: {
      default: "color-mix(in oklab, #ffffff 70%, transparent)",
      ":hover": "color-mix(in oklab, var(--color-mint) 30%, transparent)",
    },
    paddingInline: "1.5rem",
    paddingBlock: "1.25rem",
    boxShadow: shadows.lift,
    transitionProperty: "border-color, background-color",
    transitionDuration: "300ms",
  },
  statValue: {
    fontFamily: typography.display,
    fontSize: { default: "1.875rem", [breakpoints.md]: "2.25rem" },
    fontWeight: 300,
    color: colors.forest,
  },
  statLabel: {
    marginTop: "0.375rem",
    fontSize: { default: "0.75rem", [breakpoints.md]: "0.875rem" },
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 65%, transparent)",
  },
  pillarsWrap: {
    marginTop: { default: "6rem", [breakpoints.md]: "8rem" },
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.pebble,
    paddingTop: { default: "4rem", [breakpoints.md]: "5rem" },
  },
  pillarsGrid: {
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
  pillarIconBox: {
    display: "flex",
    height: "3rem",
    width: "3rem",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.mint,
      ":hover": colors.mist,
    },
    color: colors.fern,
    transitionProperty: "background-color",
    transitionDuration: "300ms",
  },
  pillarIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },
  pillarTitle: {
    marginTop: "1.5rem",
    fontFamily: typography.display,
    fontSize: "1.5rem",
    fontWeight: 500,
    letterSpacing: "-0.025em",
    color: colors.forest,
  },
  pillarCopy: {
    marginTop: "0.75rem",
    maxWidth: "20rem",
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 65%, transparent)",
  },
  // Ingredients
  ingredientsSection: {
    scrollMarginTop: "7rem",
    paddingBlock: { default: "7rem", [breakpoints.md]: "10rem" },
  },
  ingredientsContainer: {
    marginInline: "auto",
    maxWidth: "1080px",
    paddingInline: { default: "1.5rem", [breakpoints.md]: "3rem" },
    textAlign: "center",
  },
  ingredientsHeading: {
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
    color: colors.forest,
  },
  ingredientsSubtext: {
    marginInline: "auto",
    marginTop: "1.75rem",
    maxWidth: "36rem",
    fontSize: { default: "1rem", [breakpoints.md]: "1.125rem" },
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 65%, transparent)",
  },
  ingredientsChipsWrap: {
    marginTop: "3.5rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: { default: "0.75rem", [breakpoints.md]: "1rem" },
  },
  ingredientChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.625rem",
    borderRadius: radii.full,
    backgroundColor: {
      default: colors.mint,
      ":hover": colors.mist,
    },
    paddingInline: "1.5rem",
    paddingBlock: "0.75rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 500,
    color: colors.fern,
    boxShadow: {
      default: "none",
      ":hover": shadows.lift,
    },
    transform: {
      default: "translateY(0)",
      ":hover": "translateY(-2px)",
    },
    transitionProperty: "background-color, transform, box-shadow",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  chipLeafIcon: {
    width: "0.875rem",
    height: "0.875rem",
    color: colors.moss,
  },
  ingredientsBottomCta: {
    marginTop: "3rem",
  },
  textLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: {
      default: colors.fern,
      ":hover": colors.forest,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  // Quality
  qualitySection: {
    scrollMarginTop: "7rem",
  },
  qualityStrip: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: "center",
    gap: "1.5rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.pebble,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
    paddingBlock: { default: "2.5rem", [breakpoints.md]: "3rem" },
    justifyContent: { default: "flex-start", [breakpoints.md]: "space-between" },
  },
  qualityLabel: {
    fontFamily: typography.tech,
    fontSize: { default: "10px", [breakpoints.md]: "11px" },
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: "color-mix(in oklab, var(--color-bark) 65%, transparent)",
  },
  qualityList: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "2rem",
    rowGap: "0.75rem",
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  qualityItem: {
    fontFamily: typography.tech,
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: {
      default: colors.moss,
      ":hover": colors.forest,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
  },
  // CTA
  ctaSection: {
    scrollMarginTop: "7rem",
    paddingBlock: { default: "7rem", [breakpoints.md]: "10rem" },
  },
  ctaCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "40px",
    backgroundColor: colors.stone,
    paddingInline: { default: "1.5rem", [breakpoints.md]: "5rem" },
    paddingBlock: { default: "5rem", [breakpoints.md]: "7rem" },
    textAlign: "center",
  },
  ctaGlow1: {
    position: "absolute",
    left: "-6rem",
    top: "-6rem",
    height: "18rem",
    width: "18rem",
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklab, var(--color-mint) 60%, transparent)",
    filter: "blur(48px)",
  },
  ctaGlow2: {
    position: "absolute",
    bottom: "-8rem",
    right: "-4rem",
    height: "20rem",
    width: "20rem",
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklab, var(--color-mist) 70%, transparent)",
    filter: "blur(48px)",
  },
  ctaHeading: {
    marginInline: "auto",
    marginTop: "1.5rem",
    maxWidth: "48rem",
    fontFamily: typography.display,
    fontSize: { default: "2.25rem", [breakpoints.md]: "3.75rem" },
    fontWeight: 300,
    lineHeight: 1.08,
    letterSpacing: "-0.025em",
    color: colors.forest,
  },
  ctaCopy: {
    marginInline: "auto",
    marginTop: "1.75rem",
    maxWidth: "36rem",
    fontSize: { default: "1rem", [breakpoints.md]: "1.125rem" },
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 65%, transparent)",
  },
  ctaButtons: {
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
      default: colors.forest,
      ":hover": colors.fern,
    },
    paddingInline: "2.25rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    color: colors.cream,
    boxShadow: {
      default: shadows.lift,
      ":hover": shadows.ambient,
    },
    transitionProperty: "background-color, transform, box-shadow",
    transitionDuration: "300ms",
    transform: {
      default: "translateY(0)",
      ":hover": "translateY(-2px)",
    },
    borderWidth: 0,
    cursor: "pointer",
  },
  ctaOutlineBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "color-mix(in oklab, var(--color-moss) 40%, transparent)",
      ":hover": colors.moss,
    },
    paddingInline: "2.25rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    color: colors.forest,
    transitionProperty: "border-color, background-color",
    transitionDuration: "300ms",
    textDecoration: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklab, var(--color-mint) 40%, transparent)",
    },
  },
  // Footer
  footer: {
    backgroundColor: colors.forest,
    color: colors.cream,
  },
  footerInner: {
    marginInline: "auto",
    maxWidth: "1280px",
    paddingInline: {
      default: "1.5rem",
      [breakpoints.md]: "3rem",
      [breakpoints.lg]: "4rem",
    },
    paddingTop: { default: "5rem", [breakpoints.md]: "7rem" },
    paddingBottom: "2.5rem",
  },
  footerEyebrow: {
    fontFamily: typography.tech,
    fontSize: { default: "10px", [breakpoints.md]: "11px" },
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: "color-mix(in oklab, var(--color-mist) 70%, transparent)",
  },
  footerLogoText: {
    marginTop: "1.5rem",
    fontFamily: typography.display,
    fontSize: "clamp(4rem, 13vw, 10rem)",
    fontWeight: 300,
    lineHeight: 0.95,
    letterSpacing: "-0.025em",
  },
  footerDot: {
    color: colors.mint,
  },
  footerGrid: {
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
  footerAboutText: {
    maxWidth: "20rem",
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-mist) 70%, transparent)",
  },
  footerColHeader: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: "color-mix(in oklab, var(--color-mist) 60%, transparent)",
  },
  footerColList: {
    marginTop: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  footerLink: {
    fontSize: "0.875rem",
    color: {
      default: "color-mix(in oklab, var(--color-mist) 70%, transparent)",
      ":hover": colors.mint,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
    textDecoration: "none",
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: 0,
  },
  footerRegionItem: {
    fontSize: "0.875rem",
    color: "color-mix(in oklab, var(--color-mist) 70%, transparent)",
  },
  footerBottom: {
    marginTop: "4rem",
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "color-mix(in oklab, var(--color-cream) 10%, transparent)",
    paddingTop: "2rem",
  },
  footerCopyright: {
    fontSize: "0.75rem",
    color: "color-mix(in oklab, var(--color-mist) 70%, transparent)",
  },
  footerLegalLinks: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  textCenter: {
    textAlign: "center",
  },
  relative: {
    position: "relative",
  },
  maxWidthXl: {
    maxWidth: "36rem",
  },
});

function NavBar() {
  const reduce = useReducedMotion();
  return (
    <m.nav
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      {...stylex.props(styles.nav)}
    >
      <div {...stylex.props(styles.navInner)}>
        <a href="#top" {...stylex.props(styles.navLogo)}>
          Fenchem
        </a>
        <div {...stylex.props(styles.navLinks)}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} {...stylex.props(styles.navLink)}>
              {link.label}
            </a>
          ))}
        </div>
        <a href="#contact" {...stylex.props(styles.navCta)}>
          Partner with Us
        </a>
      </div>
    </m.nav>
  );
}

type HeroSectionProps = {
  heroRef: React.RefObject<HTMLElement | null>;
  blobY: MotionValue<number>;
};

function HeroSection({ heroRef, blobY }: HeroSectionProps) {
  const reduce = useReducedMotion();
  return (
    <header id="top" ref={heroRef} {...stylex.props(styles.hero)}>
      <div {...stylex.props(styles.container, styles.heroGrid)}>
        <div {...stylex.props(styles.heroColLeft)}>
          <Intro delay={0.05}>
            <span {...stylex.props(styles.heroBadge)}>
              <Leaf {...stylex.props(styles.heroIcon)} aria-hidden />
              Botanical Intelligence Since 1995
            </span>
          </Intro>
          <Intro delay={0.18}>
            <h1 {...stylex.props(styles.heroTitle)}>
              Nurturing <em {...stylex.props(styles.italicMoss)}>Vitality</em> through Botanical
              Excellence
            </h1>
          </Intro>
          <Intro delay={0.32}>
            <p {...stylex.props(styles.heroDesc)}>
              Premium botanical and functional ingredients for nutrition, food and personal care —
              bridging ancient plant wisdom with modern scientific precision.
            </p>
          </Intro>
          <Intro delay={0.46} sx={styles.heroActions}>
            <a href="#ingredients" {...stylex.props(styles.primaryBtn)}>
              Explore Portfolio
              <ArrowUpRight {...stylex.props(styles.btnIcon)} aria-hidden />
            </a>
            <a href="#contact" {...stylex.props(styles.outlineBtn)}>
              Request a Specification
            </a>
          </Intro>
        </div>

        <Intro delay={0.3} sx={styles.heroColRight}>
          <div {...stylex.props(styles.heroImageWrapper)}>
            <div aria-hidden {...stylex.props(styles.heroGlowBlob)} />
            <m.div style={{ y: reduce ? 0 : blobY }} {...stylex.props(styles.heroBlobContainer)}>
              <div {...stylex.props(styles.heroImageMask)}>
                <img
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80"
                  alt="Macro photograph of a green leaf with morning dew"
                  {...stylex.props(styles.heroImage)}
                  loading="eager"
                />
              </div>
              <span {...stylex.props(styles.heroFloatingTag)}>ISO · GMP Certified</span>
              <m.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={
                  reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }
                {...stylex.props(styles.heroFloatingCard)}
              >
                <p {...stylex.props(styles.heroFloatingCardLabel)}>Extraction Yield</p>
                <p {...stylex.props(styles.heroFloatingCardValue)}>98%</p>
                <p {...stylex.props(styles.heroFloatingCardDesc)}>
                  Bio-active retention across our extraction process.
                </p>
              </m.div>
            </m.div>
          </div>
        </Intro>
      </div>
    </header>
  );
}

function IndustriesSection() {
  const offsetStyles = [styles.industryOffset0, styles.industryOffset1, styles.industryOffset2];
  const aspectStyles = [
    styles.industryImageWrap34,
    styles.industryImageWrap45,
    styles.industryImageWrap34,
  ];

  return (
    <section id="industries" {...stylex.props(styles.industriesSection)}>
      <div {...stylex.props(styles.container)}>
        <Reveal sx={styles.industriesHeader}>
          <div {...stylex.props(styles.maxWidthXl)}>
            <Eyebrow accent="text-moss">Where our ingredients work</Eyebrow>
            <h2 {...stylex.props(styles.sectionHeading)}>
              Purity across <em {...stylex.props(styles.italicMoss)}>industries</em>
            </h2>
          </div>
          <p {...stylex.props(styles.industriesSubtext)}>
            Crafted to meet the rigorous demands of global leaders in health, wellness and beauty.
          </p>
        </Reveal>

        <div {...stylex.props(styles.industriesGrid)}>
          {industries.map((industry, i) => (
            <Reveal key={industry.title} delay={i * 0.12} sx={offsetStyles[i]}>
              <a href="#ingredients" {...stylex.props(styles.industryCardLink)}>
                <div {...stylex.props(aspectStyles[i])}>
                  <img
                    src={industry.image.src}
                    alt={industry.image.alt}
                    {...stylex.props(styles.industryImage)}
                    loading="lazy"
                  />
                </div>
                <div {...stylex.props(styles.industryMeta)}>
                  <span {...stylex.props(styles.industryNumber)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 {...stylex.props(styles.industryTitle)}>{industry.title}</h3>
                </div>
                <p {...stylex.props(styles.industryCopy)}>{industry.copy}</p>
                <span {...stylex.props(styles.industryAction)}>
                  Explore applications
                  <ArrowUpRight {...stylex.props(styles.btnIcon)} aria-hidden />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScienceSection() {
  return (
    <section id="science" {...stylex.props(styles.scienceSection)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.scienceGrid)}>
          <Reveal>
            <div {...stylex.props(styles.scienceImageWrapper)}>
              <div aria-hidden {...stylex.props(styles.scienceGlow)} />
              <div {...stylex.props(styles.sciencePrimaryImgContainer)}>
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80"
                  alt="Tall forest path with sunlight filtering through the canopy"
                  {...stylex.props(styles.sciencePrimaryImg)}
                  loading="lazy"
                />
              </div>
              <div {...stylex.props(styles.scienceFloatingImgContainer)}>
                <img
                  src="https://images.unsplash.com/photo-1466781783364-36c955e42a7f?auto=format&fit=crop&w=640&q=80"
                  alt="Laboratory glassware during botanical analysis"
                  {...stylex.props(styles.scienceFloatingImg)}
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow accent="text-moss">The Fenchem legacy</Eyebrow>
              <h2 {...stylex.props(styles.scienceHeading)}>
                Rooted in Nature,
                <br />
                <em {...stylex.props(styles.italicMoss)}>Refined by Science.</em>
              </h2>
              <p {...stylex.props(styles.scienceCopy)}>
                Our journey began with a simple belief: that nature holds the keys to human
                vitality. Today we manage a global network of sustainable farms and advanced
                laboratories to bring those keys to our partners, lot after lot.
              </p>
            </Reveal>
            <div {...stylex.props(styles.statsGrid)}>
              {stats.map((stat, i) => (
                <Reveal key={stat.value} delay={i * 0.08}>
                  <div {...stylex.props(styles.statCard)}>
                    <span {...stylex.props(styles.statValue)}>{stat.value}</span>
                    <p {...stylex.props(styles.statLabel)}>{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div {...stylex.props(styles.pillarsWrap)}>
          <div {...stylex.props(styles.pillarsGrid)}>
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal key={pillar.title} delay={i * 0.12}>
                  <div>
                    <span {...stylex.props(styles.pillarIconBox)}>
                      <Icon {...stylex.props(styles.pillarIcon)} aria-hidden />
                    </span>
                    <h3 {...stylex.props(styles.pillarTitle)}>{pillar.title}</h3>
                    <p {...stylex.props(styles.pillarCopy)}>{pillar.copy}</p>
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

function IngredientsSection() {
  return (
    <section id="ingredients" {...stylex.props(styles.ingredientsSection)}>
      <div {...stylex.props(styles.ingredientsContainer)}>
        <Reveal>
          <Eyebrow accent="text-moss" sx={styles.textCenter}>
            The portfolio
          </Eyebrow>
          <h2 {...stylex.props(styles.ingredientsHeading)}>
            A <em {...stylex.props(styles.italicMoss)}>living library</em> of botanical actives
          </h2>
          <p {...stylex.props(styles.ingredientsSubtext)}>
            Standardized extracts and functional ingredients, each backed by full identity, potency
            and stability documentation.
          </p>
        </Reveal>
        <Reveal delay={0.15} sx={styles.ingredientsChipsWrap}>
          {ingredients.map((ingredient) => (
            <a key={ingredient.name} href="#contact" {...stylex.props(styles.ingredientChip)}>
              <Leaf {...stylex.props(styles.chipLeafIcon)} aria-hidden />
              {ingredient.name}
            </a>
          ))}
        </Reveal>
        <Reveal delay={0.3} sx={styles.ingredientsBottomCta}>
          <a href="#contact" {...stylex.props(styles.textLink)}>
            Request a Specification
            <ArrowUpRight {...stylex.props(styles.btnIcon)} aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function QualitySection() {
  return (
    <section id="quality" {...stylex.props(styles.qualitySection)}>
      <div {...stylex.props(styles.container)}>
        <Reveal>
          <div {...stylex.props(styles.qualityStrip)}>
            <p {...stylex.props(styles.qualityLabel)}>Certified quality systems</p>
            <ul {...stylex.props(styles.qualityList)}>
              {certifications.map((cert) => (
                <li key={cert} {...stylex.props(styles.qualityItem)}>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="contact" {...stylex.props(styles.ctaSection)}>
      <div {...stylex.props(styles.container)}>
        <Reveal>
          <div {...stylex.props(styles.ctaCard)}>
            <div aria-hidden {...stylex.props(styles.ctaGlow1)} />
            <div aria-hidden {...stylex.props(styles.ctaGlow2)} />
            <div {...stylex.props(styles.relative)}>
              <Eyebrow accent="text-moss" sx={styles.textCenter}>
                Start the conversation
              </Eyebrow>
              <h2 {...stylex.props(styles.ctaHeading)}>
                Let&rsquo;s formulate{" "}
                <em {...stylex.props(styles.italicMoss)}>what&rsquo;s next.</em>
              </h2>
              <p {...stylex.props(styles.ctaCopy)}>
                From first sample to full-scale supply — tell us what you&rsquo;re building and our
                technical team will respond within one business day.
              </p>
              <div {...stylex.props(styles.ctaButtons)}>
                <button type="button" {...stylex.props(styles.ctaPrimaryBtn)}>
                  Partner with Fenchem
                  <ArrowUpRight {...stylex.props(styles.btnIcon)} aria-hidden />
                </button>
                <a href="#ingredients" {...stylex.props(styles.ctaOutlineBtn)}>
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

function FooterSection() {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.footerInner)}>
        <Reveal>
          <p {...stylex.props(styles.footerEyebrow)}>Rooted in Nature, Refined by Science</p>
          <p {...stylex.props(styles.footerLogoText)}>
            Fenchem<span {...stylex.props(styles.footerDot)}>.</span>
          </p>
        </Reveal>
        <div {...stylex.props(styles.footerGrid)}>
          <Reveal>
            <p {...stylex.props(styles.footerAboutText)}>
              A global B2B supplier of botanical and functional ingredients for nutrition, food
              &amp; beverage and personal care — since 1995.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p {...stylex.props(styles.footerColHeader)}>Explore</p>
            <ul {...stylex.props(styles.footerColList)}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} {...stylex.props(styles.footerLink)}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" {...stylex.props(styles.footerLink)}>
                  Partner with Us
                </a>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.16}>
            <p {...stylex.props(styles.footerColHeader)}>Global bases</p>
            <ul {...stylex.props(styles.footerColList)}>
              {regions.map((region) => (
                <li key={region.city} {...stylex.props(styles.footerRegionItem)}>
                  {`${region.city}, ${region.country}${region.city === "Nanjing" ? " — HQ" : ""}`}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div {...stylex.props(styles.footerBottom)}>
          <p {...stylex.props(styles.footerCopyright)}>
            © 2026 Fenchem Biotek Ltd. All rights reserved.
          </p>
          <div {...stylex.props(styles.footerLegalLinks)}>
            <button type="button" {...stylex.props(styles.footerLink)}>
              Privacy Policy
            </button>
            <button type="button" {...stylex.props(styles.footerLink)}>
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function VariantA() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 72]);

  return (
    <LazyMotion features={domAnimation} strict>
      <main {...stylex.props(styles.main)}>
        <NavBar />
        <HeroSection heroRef={heroRef} blobY={blobY} />
        <IndustriesSection />
        <ScienceSection />
        <IngredientsSection />
        <QualitySection />
        <CtaSection />
        <FooterSection />
      </main>
    </LazyMotion>
  );
}
