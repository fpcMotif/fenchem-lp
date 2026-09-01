/*
 * PROTOTYPE — Variant K: "Color Block" — campaign-editorial color-blocking.
 *
 * Provenance: the owner's moodboard — studio campaign photography on seamless
 * single-hue fields (a subject centered on a flat orange/purple/teal ground).
 * The tension: the brand book forbids the auxiliary division colors from ever
 * becoming a page's PRIMARY surface. K resolves it by demoting each division
 * hue to a SECTION WASH at 8–15% opacity (bg-nutrition/15, bg-food/10,
 * bg-cosmetics/10) with the fully saturated color rationed to small doses:
 * thick image frames, pill-chip borders, dots, and one oversized outlined
 * numeral per band. Clean white (paper) stays the base canvas between bands,
 * so the saturated fields of the moodboard survive only as tints and trims —
 * campaign energy inside brand law.
 *
 * Type: the brand default pairing — Newsreader (font-display) for oversized
 * display lines, Plus Jakarta Sans for body — set BIGGER and friendlier than
 * VariantH: generous, not cavernous, whitespace.
 *
 * Measured color decisions inherited from variant-h.tsx / the 2026-08 review:
 *   - Primary CTA: text-brand-green-950 on bg-brand-green-500 (5.18:1);
 *     hover bg-brand-green-400 (6.92:1). Never white on green-500.
 *   - Blue is INTERACTIVE-ONLY (outline CTA, text links). Eyebrows and
 *     section numerals: brand-green-700 on paper (5.73:1).
 *   - Small-text floor mute-600 (6.00:1); font-tech micro-labels floor 11px.
 *   - Finale labels: full-opacity green-400 (6.92:1) / green-300 on green-950.
 *
 * Deliberate deviations (recorded per the review's DIVISION_DOT precedent):
 *   - Nutrition's #FFF67F fails as text/stroke at any size on paper, so the
 *     Nutrition band's outlined numeral strokes in brand-green-600 and its
 *     hero-panel caption accent is green-700; the yellow itself is reserved
 *     for photo frames, chip borders, and dots where it is decorative.
 *   - Personal Care carries a single ingredient chip (the shared data module
 *     lists exactly one Personal Care active) — no ingredients are invented.
 *
 * Section order:
 *   Nav → Hero (color-block collage) → Division bands (signature module)
 *   → Stat moment → Compact matrix strip → Certifications row
 *   → Deep-green finale → Slim footer
 */
import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowRight, ArrowUpRight, Leaf, Menu, X } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, radii, shadows, typography } from "@fenchem-lp/ui/tokens.stylex";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { Intro, Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certificationDetails,
  company,
  createInquiryHref,
  divisionForApplication,
  getFeaturedIngredients,
  getIngredientsByApplication,
  industries,
  type DivisionKey,
  type Ingredient,
  type IngredientApplication,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Constants ─────────────────────────────── */

/* Verified-rendering Unsplash assets, reused from variant-h / landing-content. */
const IMG = {
  heroLeaves: {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
    alt: "Lush green botanical leaves in morning light — Fenchem's raw-material sourcing",
  },
  heroCare: {
    src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    alt: "Minimal skincare bottle in warm natural light — the Personal Care division",
  },
  bandNutrition: {
    src: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=1200&q=80",
    alt: "Dried botanical roots and herbs arranged for extraction",
  },
  bandFood: {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    alt: "Fresh food bowl with greens, grains, and natural color sources in daylight",
  },
  bandCare: {
    src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80",
    alt: "Macro leaf covered in dew droplets — hydration, the signature of hyaluronic acid",
  },
} as const;
const NAV_LINKS = [
  {
    label: "Divisions",
    href: "#divisions",
  },
  {
    label: "Portfolio",
    href: "#matrix",
  },
  {
    label: "Story",
    href: "#story",
  },
  {
    label: "Contact",
    href: "#contact",
  },
] as const;

/* ─────────────────────────────── Styles ─────────────────────────────── */

const styles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    fontFamily: typography.body,
    color: colors.ink,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "::selection": {
      backgroundColor: colors.brandGreen200,
      color: colors.brandGreen900,
    },
  },
  container: {
    maxWidth: 1480,
    marginLeft: "auto",
    marginRight: "auto",
  },
  techLabel: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: colors.mute600,
  },
  eyebrowGreen: {
    fontFamily: typography.tech,
    fontSize: {
      default: 11,
      [breakpoints.md]: 12,
    },
    textTransform: "uppercase",
    letterSpacing: "0.35em",
    color: colors.brandGreen700,
  },
  eyebrowGreen400: {
    fontFamily: typography.tech,
    fontSize: {
      default: 11,
      [breakpoints.md]: 12,
    },
    textTransform: "uppercase",
    letterSpacing: "0.35em",
    color: colors.brandGreen400,
  },
  ctaPrimary: {
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 10,
    borderRadius: radii.sm,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 14,
    paddingBottom: 14,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color, transform",
    transitionDuration: "300ms",
    transform: {
      default: "scale(1)",
      ":active": "scale(0.96)",
    },
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  ctaPrimaryDark: {
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 10,
    borderRadius: radii.sm,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 700,
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color, transform",
    transitionDuration: "300ms",
    transform: {
      default: "scale(1)",
      ":active": "scale(0.96)",
    },
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  ctaOutlineBlue: {
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 10,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 14,
    paddingBottom: 14,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    color: colors.brandBlue700,
    textDecoration: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandBlue50,
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "300ms",
    transform: {
      default: "scale(1)",
      ":active": "scale(0.96)",
    },
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
  },
  /* Header / Nav */
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-paper) 95%, transparent)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  navInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
  },
  brandLink: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    textDecoration: "none",
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    opacity: {
      default: 1,
      ":hover": 0.85,
    },
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  brandText: {
    fontFamily: typography.body,
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: "-0.04em",
    color: colors.brandGreen600,
  },
  brandLeaf: {
    width: 16,
    height: 16,
    alignSelf: "center",
    color: colors.brandGreen500,
  },
  navLinksDesktop: {
    display: {
      default: "none",
      [breakpoints.md]: "flex",
    },
    alignItems: "center",
    gap: 28,
  },
  navLink: {
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    fontFamily: typography.body,
    fontSize: 14,
    color: {
      default: colors.mute600,
      ":hover": colors.brandGreen700,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  mobileNavWrapper: {
    display: {
      default: "block",
      [breakpoints.md]: "none",
    },
  },
  mobileMenuBtn: {
    display: "inline-flex",
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.sm,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: {
      default: colors.ink,
      ":hover": colors.brandGreen700,
    },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "200ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  mobileMenuPopover: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "100%",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  },
  mobileMenuList: {
    listStyle: "none",
    margin: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  mobileNavLink: {
    display: "block",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: typography.body,
    fontSize: 16,
    color: {
      default: colors.ink,
      ":hover": colors.brandGreen700,
    },
    textDecoration: "none",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  mobileNavLinkLast: {
    borderBottomWidth: 0,
  },
  /* Hero Section */
  heroSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  heroInner: {
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 64,
      [breakpoints.md]: 96,
      [breakpoints.lg]: 112,
    },
    paddingBottom: {
      default: 64,
      [breakpoints.md]: 96,
      [breakpoints.lg]: 112,
    },
  },
  heroGrid: {
    display: "grid",
    gap: {
      default: 48,
      [breakpoints.lg]: 64,
    },
    gridTemplateColumns: {
      default: null,
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  heroLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 7 / span 7",
    },
  },
  heroBadge: {
    display: "inline-flex",
    width: "fit-content",
    alignItems: "center",
    gap: 8,
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandGreen200,
    backgroundColor: colors.brandGreen50,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.32em",
    color: colors.brandGreen700,
  },
  heroTitle: {
    marginTop: 32,
    fontFamily: typography.display,
    fontSize: "clamp(3rem, 7.5vw, 6.5rem)",
    fontWeight: 700,
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
  },
  italicGreen: {
    fontStyle: "italic",
    color: colors.brandGreen600,
  },
  heroLead: {
    marginTop: 32,
    maxWidth: 576,
    fontFamily: typography.body,
    fontSize: {
      default: 18,
      [breakpoints.md]: 20,
    },
    lineHeight: 1.625,
    color: colors.mute600,
  },
  heroActions: {
    marginTop: 40,
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  heroRight: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 5 / span 5",
    },
  },
  heroFigureNutrition: {
    margin: 0,
    borderRadius: radii.sm,
    backgroundColor: "color-mix(in oklch, var(--color-nutrition) 20%, transparent)",
    padding: {
      default: 20,
      [breakpoints.md]: 24,
    },
  },
  heroFigureCare: {
    margin: 0,
    borderRadius: radii.sm,
    backgroundColor: "color-mix(in oklch, var(--color-cosmetics) 10%, transparent)",
    padding: {
      default: 20,
      [breakpoints.md]: 24,
    },
  },
  frameNutrition: {
    overflow: "hidden",
    borderRadius: radii.sm,
    borderWidth: 8,
    borderStyle: "solid",
    borderColor: colors.nutrition,
  },
  frameCosmetics: {
    overflow: "hidden",
    borderRadius: radii.sm,
    borderWidth: 8,
    borderStyle: "solid",
    borderColor: colors.cosmetics,
  },
  imgCover1610: {
    aspectRatio: "16 / 10",
    width: "100%",
    objectFit: "cover",
    display: "block",
  },
  imgCover169: {
    aspectRatio: "16 / 9",
    width: "100%",
    objectFit: "cover",
    display: "block",
  },
  figCaption: {
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  captionFieldAccent: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: colors.brandGreen700,
  },
  /* Division bands signature module */
  divisionsHeaderOuter: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  divisionsHeaderInner: {
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 56,
      [breakpoints.md]: 80,
    },
    paddingBottom: {
      default: 56,
      [breakpoints.md]: 80,
    },
  },
  divisionsHeading: {
    marginTop: 16,
    maxWidth: 768,
    fontFamily: typography.display,
    fontSize: {
      default: 36,
      [breakpoints.md]: 60,
    },
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
  },
  divisionsLead: {
    marginTop: 24,
    maxWidth: 576,
    fontFamily: typography.body,
    fontSize: {
      default: 16,
      [breakpoints.md]: 18,
    },
    lineHeight: 1.625,
    color: colors.mute600,
  },
  bandSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  bandWash_nutrition: {
    backgroundColor: "color-mix(in oklch, var(--color-nutrition) 15%, transparent)",
  },
  bandWash_food: {
    backgroundColor: "color-mix(in oklch, var(--color-food) 10%, transparent)",
  },
  bandWash_care: {
    backgroundColor: "color-mix(in oklch, var(--color-cosmetics) 10%, transparent)",
  },
  bandInner: {
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 64,
      [breakpoints.md]: 96,
    },
    paddingBottom: {
      default: 64,
      [breakpoints.md]: 96,
    },
  },
  bandGrid: {
    display: "grid",
    alignItems: "center",
    gap: {
      default: 40,
      [breakpoints.lg]: 64,
    },
    gridTemplateColumns: {
      default: null,
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  bandTextCol: {
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 7 / span 7",
    },
  },
  bandTextColOrder2: {
    order: {
      default: null,
      [breakpoints.lg]: 2,
    },
  },
  bandNumeral: {
    display: "block",
    userSelect: "none",
    fontFamily: typography.display,
    fontSize: {
      default: "6rem",
      [breakpoints.md]: "9.5rem",
    },
    fontWeight: 700,
    lineHeight: 0.85,
    color: "transparent",
  },
  bandTitle: {
    marginTop: 16,
    maxWidth: 672,
    fontFamily: typography.display,
    fontSize: {
      default: 36,
      [breakpoints.md]: 60,
    },
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
  },
  bandCopy: {
    marginTop: 24,
    maxWidth: 576,
    fontFamily: typography.body,
    fontSize: {
      default: 16,
      [breakpoints.md]: 18,
    },
    lineHeight: 1.625,
    color: colors.mute600,
  },
  bandChipsList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    marginTop: 32,
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  bandChipBase: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    borderRadius: radii.full,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: colors.paper,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
  },
  chipBorder_nutrition: {
    borderColor: colors.nutrition,
  },
  chipBorder_food: {
    borderColor: colors.food,
  },
  chipBorder_care: {
    borderColor: colors.cosmetics,
  },
  chipName: {
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 500,
    color: colors.ink,
  },
  chipPurity: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: colors.mute600,
  },
  bandMatrixLink: {
    marginTop: 32,
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 8,
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: {
      default: colors.brandBlue700,
      ":hover": colors.brandGreen700,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  bandImageCol: {
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 5 / span 5",
    },
  },
  bandImageColOrder1: {
    order: {
      default: null,
      [breakpoints.lg]: 1,
    },
  },
  bandFrame_nutrition: {
    overflow: "hidden",
    borderRadius: radii.sm,
    borderWidth: 8,
    borderStyle: "solid",
    borderColor: colors.nutrition,
    boxShadow: shadows.lift,
  },
  bandFrame_food: {
    overflow: "hidden",
    borderRadius: radii.sm,
    borderWidth: 8,
    borderStyle: "solid",
    borderColor: colors.food,
    boxShadow: shadows.lift,
  },
  bandFrame_care: {
    overflow: "hidden",
    borderRadius: radii.sm,
    borderWidth: 8,
    borderStyle: "solid",
    borderColor: colors.cosmetics,
    boxShadow: shadows.lift,
  },
  imgCover45: {
    aspectRatio: "4 / 5",
    width: "100%",
    objectFit: "cover",
    display: "block",
  },
  /* Story Section */
  storySection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  storyInner: {
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 80,
      [breakpoints.md]: 128,
    },
    paddingBottom: {
      default: 80,
      [breakpoints.md]: 128,
    },
  },
  storyTitle: {
    marginTop: 32,
    maxWidth: 1024,
    fontFamily: typography.display,
    fontSize: "clamp(2.8rem, 8vw, 7rem)",
    fontWeight: 700,
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
  },
  storyBody: {
    marginTop: 40,
    maxWidth: 672,
    fontFamily: typography.body,
    fontSize: {
      default: 18,
      [breakpoints.md]: 20,
    },
    lineHeight: 1.625,
    color: colors.mute600,
  },
  storyTagline: {
    marginTop: 32,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.brandGreen700,
  },
  /* Matrix Section */
  matrixSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  matrixInner: {
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 64,
      [breakpoints.md]: 96,
    },
    paddingBottom: {
      default: 64,
      [breakpoints.md]: 96,
    },
  },
  matrixHeaderRow: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: 24,
    alignItems: {
      default: null,
      [breakpoints.md]: "flex-end",
    },
    justifyContent: {
      default: null,
      [breakpoints.md]: "space-between",
    },
  },
  matrixHeading: {
    marginTop: 16,
    fontFamily: typography.display,
    fontSize: {
      default: 36,
      [breakpoints.md]: 48,
    },
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
  },
  matrixStrip: {
    marginTop: 40,
    display: "flex",
    gap: 20,
    overflowX: "auto",
    paddingBottom: 16,
    scrollSnapType: "x mandatory",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  matrixCard: {
    minWidth: 250,
    maxWidth: 280,
    flexShrink: 0,
    scrollSnapAlign: "start",
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    borderTopWidth: 4,
    backgroundColor: colors.paper,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 24,
    paddingBottom: 24,
    boxShadow: shadows.ambient,
  },
  matrixTop_nutrition: {
    borderTopColor: colors.nutrition,
  },
  matrixTop_food: {
    borderTopColor: colors.food,
  },
  matrixTop_cosmetics: {
    borderTopColor: colors.cosmetics,
  },
  matrixTop_chem: {
    borderTopColor: colors.chem,
  },
  matrixTop_agro: {
    borderTopColor: colors.agro,
  },
  matrixTop_feed: {
    borderTopColor: colors.feed,
  },
  matrixCardMeta: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
  },
  matrixIndex: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
  },
  matrixCode: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.mute600,
  },
  matrixCardTitle: {
    marginTop: 12,
    fontFamily: typography.body,
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: colors.ink,
    margin: 0,
  },
  matrixCardLatin: {
    marginTop: 2,
    fontFamily: typography.display,
    fontSize: 14,
    fontStyle: "italic",
    color: colors.mute600,
    margin: 0,
  },
  matrixCardDl: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: 14,
    margin: 0,
  },
  matrixCardRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
  },
  matrixDt: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.mute600,
  },
  matrixDd: {
    textAlign: "right",
    fontFamily: typography.tech,
    fontSize: 11,
    color: colors.mute700,
    margin: 0,
  },
  /* Certifications section */
  certsSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.mute50,
  },
  certsInner: {
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 56,
      [breakpoints.md]: 64,
    },
    paddingBottom: {
      default: 56,
      [breakpoints.md]: 64,
    },
  },
  certsFlex: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.lg]: "row",
    },
    gap: 32,
    alignItems: {
      default: null,
      [breakpoints.lg]: "center",
    },
    justifyContent: {
      default: null,
      [breakpoints.lg]: "space-between",
    },
  },
  certsHeading: {
    marginTop: 12,
    fontFamily: typography.display,
    fontSize: {
      default: 30,
      [breakpoints.md]: 36,
    },
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: colors.ink,
    margin: 0,
  },
  certsList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  certBadge: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 8,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue200,
    backgroundColor: colors.brandBlue50,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
  },
  certName: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: colors.brandBlue700,
  },
  certSub: {
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.mute600,
  },
  /* Finale Section */
  finaleSection: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.brandGreen950,
  },
  finaleGlow: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  finaleInner: {
    position: "relative",
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 96,
      [breakpoints.md]: 144,
    },
    paddingBottom: {
      default: 96,
      [breakpoints.md]: 144,
    },
    textAlign: "center",
  },
  finaleHeading: {
    marginTop: 32,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 896,
    fontFamily: typography.display,
    fontSize: {
      default: 36,
      [breakpoints.md]: 72,
    },
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: colors.paper,
    margin: 0,
  },
  finaleLead: {
    marginTop: 32,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 576,
    fontFamily: typography.body,
    fontSize: {
      default: 16,
      [breakpoints.md]: 18,
    },
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-brand-green-100) 70%, transparent)",
  },
  finaleActions: {
    marginTop: 40,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  finaleResponseTime: {
    marginTop: 40,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.brandGreen400,
  },
  /* Footer */
  footer: {
    backgroundColor: colors.paper,
  },
  footerWordmark: {
    userSelect: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: 40,
    fontFamily: typography.body,
    fontSize: {
      default: "16vw",
      "@media (min-width: 1481px)": "14rem",
    },
    fontWeight: 800,
    lineHeight: 0.8,
    letterSpacing: "-0.06em",
    color: "color-mix(in oklch, var(--color-brand-green-500) 5%, transparent)",
    margin: 0,
  },
  footerLegal: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: 8,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: 16,
    paddingBottom: 16,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.mute600,
    alignItems: {
      default: null,
      [breakpoints.md]: "center",
    },
    justifyContent: {
      default: null,
      [breakpoints.md]: "space-between",
    },
  },
  backToTopLink: {
    color: {
      default: colors.mute600,
      ":hover": colors.brandGreen700,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  footerTagline: {
    color: colors.brandGreen700,
  },
});

/* ─────────────────────────────── Division bands data ─────────────────────────────── */

type BandConfig = {
  key: string;
  numeral: string;
  application: IngredientApplication;
  washKey: "bandWash_nutrition" | "bandWash_food" | "bandWash_care";
  frameKey: "bandFrame_nutrition" | "bandFrame_food" | "bandFrame_care";
  chipBorderKey: "chipBorder_nutrition" | "chipBorder_food" | "chipBorder_care";
  stroke: string;
  image: {
    src: string;
    alt: string;
  };
};
const BANDS: readonly BandConfig[] = [
  {
    key: "nutrition",
    numeral: "01",
    application: "Nutrition",
    washKey: "bandWash_nutrition",
    frameKey: "bandFrame_nutrition",
    chipBorderKey: "chipBorder_nutrition",
    stroke: "var(--color-brand-green-600)",
    image: IMG.bandNutrition,
  },
  {
    key: "food",
    numeral: "02",
    application: "Food & Beverage",
    washKey: "bandWash_food",
    frameKey: "bandFrame_food",
    chipBorderKey: "chipBorder_food",
    stroke: "var(--color-food)",
    image: IMG.bandFood,
  },
  {
    key: "care",
    numeral: "03",
    application: "Personal Care",
    washKey: "bandWash_care",
    frameKey: "bandFrame_care",
    chipBorderKey: "chipBorder_care",
    stroke: "var(--color-cosmetics)",
    image: IMG.bandCare,
  },
];
const MATRIX_TOP_KEYS: Record<DivisionKey, keyof typeof styles> = {
  nutrition: "matrixTop_nutrition",
  food: "matrixTop_food",
  cosmetics: "matrixTop_cosmetics",
  chem: "matrixTop_chem",
  agro: "matrixTop_agro",
  feed: "matrixTop_feed",
};

/* ─────────────────────────────── Nav ─────────────────────────────── */

function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  return (
    <div {...stylex.props(styles.mobileNavWrapper)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="k-mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        {...stylex.props(styles.mobileMenuBtn)}
      >
        {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id="k-mobile-menu"
            initial={
              reduce
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: -6,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={
              reduce
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: -4,
                  }
            }
            transition={{
              duration: reduce ? 0 : 0.22,
              ease: EASE,
            }}
            {...stylex.props(styles.mobileMenuPopover)}
          >
            <ul {...stylex.props(styles.mobileMenuList)}>
              {NAV_LINKS.map((link, idx) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    {...stylex.props(
                      styles.mobileNavLink,
                      idx === NAV_LINKS.length - 1 && styles.mobileNavLinkLast,
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
function NavBar() {
  return (
    <header {...stylex.props(styles.header)}>
      <nav aria-label="Main navigation" {...stylex.props(styles.container, styles.navInner)}>
        <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brandLink)}>
          <span {...stylex.props(styles.brandText)}>FENCHEM</span>
          <Leaf aria-hidden strokeWidth={1.5} {...stylex.props(styles.brandLeaf)} />
        </a>

        <div {...stylex.props(styles.navLinksDesktop)}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} {...stylex.props(styles.navLink)}>
              {link.label}
            </a>
          ))}
        </div>

        <div {...stylex.props(styles.navRight)}>
          <MobileNav />
          <a href={createInquiryHref()} {...stylex.props(styles.ctaPrimary)}>
            Request Specifications
            <ArrowRight aria-hidden size={14} />
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ─────────────────────────────── Hero ─────────────────────────────── */

function HeroSection() {
  const reduce = useReducedMotion();
  return (
    <section id="top" aria-label="Hero" {...stylex.props(styles.heroSection)}>
      <div {...stylex.props(styles.container, styles.heroInner)}>
        <div {...stylex.props(styles.heroGrid)}>
          {/* Headline block */}
          <div {...stylex.props(styles.heroLeft)}>
            <Intro>
              <p {...stylex.props(styles.heroBadge)}>Botanical ingredients — since 1995</p>
            </Intro>
            <Intro delay={STAGGER}>
              <h1 {...stylex.props(styles.heroTitle)}>
                Every division,
                <br />
                <em {...stylex.props(styles.italicGreen)}>one standard.</em>
              </h1>
            </Intro>
            <Intro delay={STAGGER * 2}>
              <p {...stylex.props(styles.heroLead)}>
                Nutrition, food &amp; beverage, personal care — three color-coded divisions,
                supplied from a single documented quality system to formulators in more than forty
                countries.
              </p>
            </Intro>
            <Intro delay={STAGGER * 3}>
              <div {...stylex.props(styles.heroActions)}>
                <a href={createInquiryHref()} {...stylex.props(styles.ctaPrimary)}>
                  Request Specifications
                  <ArrowRight aria-hidden size={16} />
                </a>
                <a href="#matrix" {...stylex.props(styles.ctaOutlineBlue)}>
                  See the portfolio
                </a>
              </div>
            </Intro>
          </div>

          {/* Color-block collage: two tinted panels, thick saturated frames */}
          <div {...stylex.props(styles.heroRight)}>
            <Intro delay={STAGGER * 2}>
              <figure {...stylex.props(styles.heroFigureNutrition)}>
                <div {...stylex.props(styles.frameNutrition)}>
                  <m.img
                    src={IMG.heroLeaves.src}
                    alt={IMG.heroLeaves.alt}
                    initial={
                      reduce
                        ? false
                        : {
                            scale: 1.08,
                          }
                    }
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      duration: 1.4,
                      ease: EASE,
                    }}
                    loading="eager"
                    {...stylex.props(styles.imgCover1610)}
                  />
                </div>
                <figcaption {...stylex.props(styles.figCaption)}>
                  <span {...stylex.props(styles.techLabel)}>Nutrition division</span>
                  <span {...stylex.props(styles.captionFieldAccent)}>Field — 01</span>
                </figcaption>
              </figure>
            </Intro>
            <Intro delay={STAGGER * 3}>
              <figure {...stylex.props(styles.heroFigureCare)}>
                <div {...stylex.props(styles.frameCosmetics)}>
                  <img
                    src={IMG.heroCare.src}
                    alt={IMG.heroCare.alt}
                    loading="eager"
                    {...stylex.props(styles.imgCover169)}
                  />
                </div>
                <figcaption {...stylex.props(styles.figCaption)}>
                  <span {...stylex.props(styles.techLabel)}>Personal care division</span>
                  <span {...stylex.props(styles.captionFieldAccent)}>Field — 03</span>
                </figcaption>
              </figure>
            </Intro>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Division bands — signature module ─────────────────────────────── */

function DivisionBand({ band, index }: { band: BandConfig; index: number }) {
  const industry = industries[index];
  const items = getIngredientsByApplication(band.application).slice(0, 3);
  const flip = index % 2 === 1;
  const headingId = `division-${band.key}-heading`;
  return (
    <section
      aria-labelledby={headingId}
      {...stylex.props(styles.bandSection, styles[band.washKey])}
    >
      <div {...stylex.props(styles.container, styles.bandInner)}>
        <div {...stylex.props(styles.bandGrid)}>
          {/* Text column */}
          <div {...stylex.props(styles.bandTextCol, flip && styles.bandTextColOrder2)}>
            <Reveal>
              <span
                aria-hidden
                style={{
                  WebkitTextStroke: `2.5px ${band.stroke}`,
                }}
                {...stylex.props(styles.bandNumeral)}
              >
                {band.numeral}
              </span>
              <p {...stylex.props(styles.eyebrowGreen)}>
                Division {band.numeral} — {band.application}
              </p>
              <h3 id={headingId} {...stylex.props(styles.bandTitle)}>
                {industry.title}
              </h3>
              <p {...stylex.props(styles.bandCopy)}>{industry.copy}</p>

              {/* Ingredient pill chips — saturated border, paper ground, ink text */}
              <ul {...stylex.props(styles.bandChipsList)}>
                {items.map((item) => (
                  <li key={item.code}>
                    <span {...stylex.props(styles.bandChipBase, styles[band.chipBorderKey])}>
                      <span {...stylex.props(styles.chipName)}>{item.name}</span>
                      <span {...stylex.props(styles.chipPurity)}>{item.purity}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <a href="#matrix" {...stylex.props(styles.bandMatrixLink)}>
                Matching actives in the matrix
                <ArrowUpRight aria-hidden size={14} />
              </a>
            </Reveal>
          </div>

          {/* Image column — thick saturated accent frame */}
          <div {...stylex.props(styles.bandImageCol, flip && styles.bandImageColOrder1)}>
            <Reveal delay={STAGGER}>
              <div {...stylex.props(styles[band.frameKey])}>
                <img
                  src={band.image.src}
                  alt={band.image.alt}
                  loading="lazy"
                  {...stylex.props(styles.imgCover45)}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
function DivisionsSection() {
  return (
    <div id="divisions">
      <div {...stylex.props(styles.divisionsHeaderOuter)}>
        <div {...stylex.props(styles.container, styles.divisionsHeaderInner)}>
          <Reveal>
            <p {...stylex.props(styles.eyebrowGreen)}>01 — The divisions</p>
            <h2 {...stylex.props(styles.divisionsHeading)}>
              Three fields of color,{" "}
              <span {...stylex.props(styles.italicGreen)}>one signature.</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <p {...stylex.props(styles.divisionsLead)}>
              Each division carries its own hue from the Fenchem brand book — worn here as a wash,
              never a wall — and every one releases against the same audited standard.
            </p>
          </Reveal>
        </div>
      </div>
      {BANDS.map((band, i) => (
        <DivisionBand key={band.key} band={band} index={i} />
      ))}
    </div>
  );
}

/* ─────────────────────────────── Stat moment ─────────────────────────────── */

function StorySection() {
  return (
    <section id="story" aria-labelledby="story-heading" {...stylex.props(styles.storySection)}>
      <div {...stylex.props(styles.container, styles.storyInner)}>
        <Reveal>
          <p {...stylex.props(styles.eyebrowGreen)}>02 — The record</p>
          <h2 id="story-heading" {...stylex.props(styles.storyTitle)}>
            <span {...stylex.props(styles.italicGreen)}>30+ years.</span> 6 bases. 40+ countries.
          </h2>
        </Reveal>
        <Reveal delay={STAGGER * 2}>
          <p {...stylex.props(styles.storyBody)}>
            Founded in {company.hq.city} in {company.founded}, Fenchem has spent three decades
            converting raw botanical complexity into precisely documented actives. One laboratory
            became six global bases across three continents; a first shipment became a supply
            network serving more than forty countries — and every lot, in every division, still
            releases against the same audited standard.
          </p>
        </Reveal>
        <Reveal delay={STAGGER * 3}>
          <p {...stylex.props(styles.storyTagline)}>
            {company.tagline} — {company.since}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Compact matrix strip ─────────────────────────────── */

function MatrixCard({ item, index }: { item: Ingredient; index: number }) {
  const division = divisionForApplication(item.application);
  const topStyleKey = MATRIX_TOP_KEYS[division];
  return (
    <article {...stylex.props(styles.matrixCard, styles[topStyleKey])}>
      <div {...stylex.props(styles.matrixCardMeta)}>
        <span {...stylex.props(styles.matrixIndex)}>{String(index + 1).padStart(2, "0")} —</span>
        <span {...stylex.props(styles.matrixCode)}>{item.code}</span>
      </div>
      <h3 {...stylex.props(styles.matrixCardTitle)}>{item.name}</h3>
      <p {...stylex.props(styles.matrixCardLatin)}>{item.latin}</p>
      <dl {...stylex.props(styles.matrixCardDl)}>
        <div {...stylex.props(styles.matrixCardRow)}>
          <dt {...stylex.props(styles.matrixDt)}>Purity</dt>
          <dd {...stylex.props(styles.matrixDd)}>{item.purity}</dd>
        </div>
      </dl>
    </article>
  );
}
function MatrixSection() {
  return (
    <section id="matrix" aria-labelledby="matrix-heading" {...stylex.props(styles.matrixSection)}>
      <div {...stylex.props(styles.container, styles.matrixInner)}>
        <div {...stylex.props(styles.matrixHeaderRow)}>
          <Reveal>
            <p {...stylex.props(styles.eyebrowGreen)}>03 — Featured portfolio</p>
            <h2 id="matrix-heading" {...stylex.props(styles.matrixHeading)}>
              The compact <span {...stylex.props(styles.italicGreen)}>matrix</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <a href={createInquiryHref()} {...stylex.props(styles.ctaOutlineBlue)}>
              Request full specifications
              <ArrowRight aria-hidden size={14} />
            </a>
          </Reveal>
        </div>

        {/* Horizontal strip — tabbable so keyboard users can scroll the overflow */}
        <Reveal delay={STAGGER * 2}>
          <div
            role="group"
            aria-label="Featured ingredients — scrolls horizontally"
            tabIndex={0}
            {...stylex.props(styles.matrixStrip)}
          >
            {getFeaturedIngredients().map((item, i) => (
              <MatrixCard key={item.code} item={item} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Certifications row ─────────────────────────────── */

function CertificationsSection() {
  return (
    <section aria-labelledby="certs-heading" {...stylex.props(styles.certsSection)}>
      <div {...stylex.props(styles.container, styles.certsInner)}>
        <Reveal>
          <div {...stylex.props(styles.certsFlex)}>
            <div>
              <p {...stylex.props(styles.eyebrowGreen)}>04 — Certified</p>
              <h2 id="certs-heading" {...stylex.props(styles.certsHeading)}>
                Audited on every lot
              </h2>
            </div>
            <ul {...stylex.props(styles.certsList)}>
              {certificationDetails.map((cert) => (
                <li key={cert.name} {...stylex.props(styles.certBadge)}>
                  <span {...stylex.props(styles.certName)}>{cert.name}</span>
                  <span {...stylex.props(styles.certSub)}>{cert.sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Finale ─────────────────────────────── */

function FinaleSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" {...stylex.props(styles.finaleSection)}>
      {/* Radial glow — the one saturated field the brand book does allow */}
      <div
        aria-hidden
        style={{
          background:
            "radial-gradient(80% 70% at 50% 0%, oklch(from var(--color-brand-green-500) l c h / 0.16), transparent 65%)",
        }}
        {...stylex.props(styles.finaleGlow)}
      />
      <div {...stylex.props(styles.container, styles.finaleInner)}>
        <Reveal>
          <p {...stylex.props(styles.eyebrowGreen400)}>05 — Partner with Fenchem</p>
          <h2 id="contact-heading" {...stylex.props(styles.finaleHeading)}>
            One standard, <span {...stylex.props(styles.italicGreen)}>signed on every lot.</span>
          </h2>
          <p {...stylex.props(styles.finaleLead)}>
            Send a target specification — purity, form, matrix, regulatory map — and our laboratory
            returns a validated proposal with full documentation within one business day.
          </p>
        </Reveal>
        <Reveal delay={STAGGER * 2}>
          <div {...stylex.props(styles.finaleActions)}>
            <a href={createInquiryHref()} {...stylex.props(styles.ctaPrimaryDark)}>
              Request Specifications
              <ArrowRight aria-hidden size={16} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={STAGGER * 3}>
          <p {...stylex.props(styles.finaleResponseTime)}>
            Response &lt; 24h — Technical dossiers on request
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Footer ─────────────────────────────── */

function FooterSection() {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.container)}>
        {/* Ghost wordmark — extrabold: Jakarta loads 300–800; 900 would synthesize */}
        <p aria-hidden {...stylex.props(styles.footerWordmark)}>
          FENCHEM
        </p>
        <div {...stylex.props(styles.footerLegal)}>
          <span>© 2026 {company.legalName} — All Rights Reserved</span>
          <a href="#top" {...stylex.props(styles.backToTopLink)}>
            Back to top
          </a>
          <span {...stylex.props(styles.footerTagline)}>{company.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── Root export ─────────────────────────────── */

/** Anchor navigation glides instead of jumping; restores on unmount and honors reduced motion. */
function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollBehavior = previous;
    };
  }, [reduce]);
  return null;
}
export function VariantK() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        <SmoothScroll />
        <NavBar />
        <main>
          <HeroSection />
          <DivisionsSection />
          <StorySection />
          <MatrixSection />
          <CertificationsSection />
          <FinaleSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
