/*
 * PROTOTYPE — Variant I: "Market Portal" — buyer wayfinding, Seppic-style.
 *
 * Philosophy: the visitor is a formulator who wants to FIND their ingredient
 * in seconds. Utility-first portal structure modeled on seppic.com (the
 * same-industry reference): slim navy nav, a hero whose signature module is a
 * live ingredient search, market cards as the primary wayfinding surface, and
 * a compact spec table instead of a gallery. Provenance: VariantH supplies the
 * code canon (LazyMotion wrapper, MobileNav disclosure, DivisionBadge chip,
 * deep-green finale, ghost-wordmark footer); the shared landing-content module
 * supplies every fact.
 *
 * Lane traits (deliberate deviations from the H baseline, recorded here):
 *   - ALL-SANS: font-body (Plus Jakarta Sans) everywhere including display
 *     headlines at font-extrabold / tight tracking. No Newsreader serif.
 *   - Blue-led structural: brand-blue-700/800/900 carry nav, heading accents,
 *     stat band and footer (Seppic navy energy). Green is strictly primary
 *     CTAs and live-status accents.
 *   - Eyebrows/section accents use brand-blue-700 on paper (8.38:1 measured,
 *     above the 5.73:1 green-700 floor the review set) instead of H's
 *     brand-green-700 — the blue lane's one sanctioned divergence.
 *   - Larger radii than H: rounded-lg cards throughout.
 *
 * Measured color decisions inherited from the 2026-08 design review:
 *   - Primary CTA: text-brand-green-950 on bg-brand-green-500 (5.18:1);
 *     hover bg-brand-green-400 (6.92:1). Never white on green-500.
 *   - Small text floor mute-600 on paper; full-opacity brand-blue-100/200 on
 *     navy, brand-green-100/300/400 on the deep-green finale (9.35:1 coords).
 *   - font-tech micro-labels floor at 11px.
 *   - Text over photographs sits on an ink/65+ scrim gradient.
 *   - Division chips: solid paper chip + ink text + accent dot.
 *
 * Section order:
 *   Slim NavBar → Hero + ingredient search (#top) → Market cards (#markets)
 *   → Stat band → Heritage narrative → Portfolio table (#matrix)
 *   → Global network (#network) → Finale (#contact) → Footer
 */
import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowRight, ArrowUpRight, Menu, Search, X } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, radii, shadows, typography } from "@fenchem-lp/ui/tokens.stylex";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { Intro, Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certifications,
  company,
  createInquiryHref,
  divisionForApplication,
  getFeaturedIngredients,
  industries,
  ingredients,
  regions,
  type DivisionKey,
  type Ingredient,
  type IngredientApplication,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Constants ─────────────────────────────── */

const IMG = {
  hero: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80",
  origin:
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
} as const;
const STATS = [
  {
    value: "30+",
    unit: "Years",
    desc: "Botanical supply since 1995",
  },
  {
    value: "6",
    unit: "Global Bases",
    desc: "Across three continents",
  },
  {
    value: "40+",
    unit: "Countries",
    desc: "Regulated markets supplied",
  },
  {
    value: "ISO/GMP",
    unit: "Certified",
    desc: "Audited quality on every lot",
  },
] as const;
const NAV_LINKS = [
  {
    label: "Markets",
    href: "#markets",
  },
  {
    label: "Portfolio",
    href: "#matrix",
  },
  {
    label: "Network",
    href: "#network",
  },
  {
    label: "Contact",
    href: "#contact",
  },
] as const;
const MARKET_APPLICATIONS: readonly IngredientApplication[] = [
  "Nutrition",
  "Food & Beverage",
  "Personal Care",
] as const;
const FOOTER_COLS = [
  {
    head: "Markets",
    links: [
      {
        label: "Nutrition & Supplements",
        href: "#markets",
      },
      {
        label: "Food & Beverage",
        href: "#markets",
      },
      {
        label: "Personal Care",
        href: "#markets",
      },
    ],
  },
  {
    head: "Portfolio",
    links: [
      {
        label: "Featured Compounds",
        href: "#matrix",
      },
      {
        label: "Ingredient Search",
        href: "#top",
      },
      {
        label: "Request Specifications",
        href: "#contact",
      },
    ],
  },
  {
    head: "Network",
    links: [
      {
        label: "Six Global Bases",
        href: "#network",
      },
      {
        label: "Nanjing HQ & R&D",
        href: "#network",
      },
      {
        label: "Contact Sales",
        href: "#contact",
      },
    ],
  },
] as const;
function searchIngredients(query: string): Ingredient[] {
  const q = query.toLowerCase();
  return ingredients
    .filter((item) =>
      [item.name, item.latin, item.category, item.application].some((field) =>
        field.toLowerCase().includes(q),
      ),
    )
    .slice(0, 6);
}

/* ─────────────────────────────── Styles ─────────────────────────────── */

const pulseAnim = stylex.keyframes({
  "0%, 100%": {
    opacity: 1,
  },
  "50%": {
    opacity: 0.5,
  },
});
const styles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    fontFamily: typography.body,
    color: colors.ink,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "::selection": {
      backgroundColor: colors.brandBlue100,
      color: colors.brandBlue900,
    },
  },
  container: {
    maxWidth: 1280,
    marginLeft: "auto",
    marginRight: "auto",
  },
  techLabelLight: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    color: colors.mute600,
  },
  techLabelNavy: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    color: colors.brandBlue200,
  },
  eyebrowBlue: {
    fontFamily: typography.tech,
    fontSize: {
      default: 11,
      [breakpoints.md]: 12,
    },
    textTransform: "uppercase",
    letterSpacing: "0.35em",
    color: colors.brandBlue700,
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
    gap: 8,
    borderRadius: radii.lg,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingLeft: {
      default: 16,
      [breakpoints.md]: 20,
    },
    paddingRight: {
      default: 16,
      [breakpoints.md]: 20,
    },
    paddingTop: 10,
    paddingBottom: 10,
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
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
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
    borderRadius: radii.lg,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingLeft: 28,
    paddingRight: 28,
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
    gap: 8,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
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
  /* Live dot */
  liveDotOuter: {
    position: "relative",
    display: "flex",
    width: 6,
    height: 6,
    flexShrink: 0,
  },
  liveDotPing: {
    position: "absolute",
    display: "inline-flex",
    width: "100%",
    height: "100%",
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-500) 60%, transparent)",
    animationName: pulseAnim,
    animationDuration: "2.4s",
    animationIterationCount: "infinite",
  },
  liveDotInner: {
    position: "relative",
    display: "inline-flex",
    width: 6,
    height: 6,
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
  },
  /* Division Dot & Bar */
  dotBase: {
    width: 6,
    height: 6,
    borderRadius: radii.full,
    flexShrink: 0,
  },
  dot_nutrition: {
    backgroundColor: colors.nutrition,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-700) 30%, transparent)",
  },
  dot_food: {
    backgroundColor: colors.food,
  },
  dot_cosmetics: {
    backgroundColor: colors.cosmetics,
  },
  dot_chem: {
    backgroundColor: colors.chem,
  },
  dot_agro: {
    backgroundColor: colors.agro,
  },
  dot_feed: {
    backgroundColor: colors.feed,
  },
  bar_nutrition: {
    backgroundColor: colors.nutrition,
  },
  bar_food: {
    backgroundColor: colors.food,
  },
  bar_cosmetics: {
    backgroundColor: colors.cosmetics,
  },
  bar_chem: {
    backgroundColor: colors.chem,
  },
  bar_agro: {
    backgroundColor: colors.agro,
  },
  bar_feed: {
    backgroundColor: colors.feed,
  },
  /* Header */
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.brandBlue800,
    backgroundColor: "color-mix(in oklch, var(--color-brand-blue-900) 95%, transparent)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  navInner: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingTop: 12,
    paddingBottom: 12,
  },
  brandLink: {
    fontFamily: typography.body,
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: "-0.04em",
    color: colors.paper,
    textDecoration: "none",
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    opacity: {
      default: 1,
      ":hover": 0.8,
    },
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
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
      default: colors.brandBlue100,
      ":hover": colors.paper,
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
    borderRadius: radii.lg,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: {
      default: colors.paper,
      ":hover": colors.brandGreen300,
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
    borderBottomColor: colors.brandBlue800,
    backgroundColor: colors.brandBlue900,
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
    borderBottomColor: colors.brandBlue800,
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: typography.body,
    fontSize: 16,
    color: {
      default: colors.brandBlue100,
      ":hover": colors.paper,
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
  /* Hero */
  heroSection: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.brandBlue950,
  },
  heroImgBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroScrim: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom, color-mix(in oklch, var(--color-ink) 75%, transparent), color-mix(in oklch, var(--color-ink) 65%, transparent), color-mix(in oklch, var(--color-ink) 85%, transparent))",
  },
  heroInner: {
    position: "relative",
    display: "flex",
    minHeight: "82vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingTop: {
      default: 80,
      [breakpoints.md]: 112,
    },
    paddingBottom: {
      default: 80,
      [breakpoints.md]: 112,
    },
    textAlign: "center",
  },
  heroTagPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-paper) 25%, transparent)",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
  },
  heroTagText: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.32em",
    color: colors.brandGreen300,
  },
  heroHeading: {
    marginTop: 32,
    maxWidth: 896,
    fontFamily: typography.body,
    fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
    color: colors.paper,
    margin: 0,
  },
  heroSub: {
    marginTop: 24,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 672,
    fontFamily: typography.body,
    fontSize: {
      default: 16,
      [breakpoints.md]: 18,
    },
    lineHeight: 1.625,
    color: colors.mute100,
  },
  heroSearchIntro: {
    width: "100%",
  },
  /* Ingredient Search */
  searchCard: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
    width: "100%",
    maxWidth: 672,
    borderRadius: radii.lg,
    backgroundColor: colors.paper,
    padding: {
      default: 16,
      [breakpoints.md]: 20,
    },
    textAlign: "left",
    boxShadow: shadows.lift,
  },
  searchForm: {
    margin: 0,
  },
  searchLabel: {
    display: "block",
  },
  searchRel: {
    position: "relative",
    marginTop: 10,
  },
  searchIcon: {
    pointerEvents: "none",
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    color: colors.mute500,
  },
  searchInput: {
    minHeight: 44,
    width: "100%",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.mute50,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 40,
    paddingRight: 16,
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.ink,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    "::placeholder": {
      color: colors.mute600,
    },
  },
  searchCountRow: {
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  searchCountText: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.mute600,
  },
  searchResultsBox: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: 8,
  },
  searchList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  searchResultItem: {
    display: "flex",
    minHeight: 44,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderRadius: radii.lg,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    textDecoration: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandBlue50,
    },
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  searchResultLeft: {
    display: "flex",
    minWidth: 0,
    alignItems: "center",
    gap: 10,
  },
  searchResultName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    color: colors.ink,
  },
  searchResultLatin: {
    display: {
      default: "none",
      [breakpoints.sm]: "inline",
    },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: typography.body,
    fontSize: 12,
    fontStyle: "italic",
    color: colors.mute600,
  },
  searchResultPurity: {
    flexShrink: 0,
    fontFamily: typography.tech,
    fontSize: 11,
    color: colors.mute600,
  },
  searchEmptyText: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.mute600,
  },
  searchEmptyLink: {
    fontWeight: 600,
    color: colors.brandBlue700,
    textDecoration: "underline",
    textDecorationColor: colors.line,
    textUnderlineOffset: 4,
    transitionProperty: "color",
    transitionDuration: "200ms",
    ":hover": {
      color: colors.brandBlue800,
    },
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  /* Markets Section */
  marketsSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
    paddingTop: {
      default: 64,
      [breakpoints.md]: 96,
    },
    paddingBottom: {
      default: 64,
      [breakpoints.md]: 96,
    },
  },
  marketsInner: {
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 32,
    },
  },
  marketsHeaderRow: {
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
  marketsHeading: {
    marginTop: 16,
    maxWidth: 672,
    fontFamily: typography.body,
    fontSize: {
      default: 30,
      [breakpoints.md]: 36,
    },
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
  },
  marketsLead: {
    maxWidth: 320,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 1.625,
    color: colors.mute600,
  },
  marketsGrid: {
    marginTop: 40,
    display: "grid",
    gap: 20,
    gridTemplateColumns: {
      default: null,
      [breakpoints.md]: "repeat(3, 1fr)",
    },
  },
  marketCard: {
    position: "relative",
    display: "flex",
    aspectRatio: "4 / 5",
    flexDirection: "column",
    justifyContent: "flex-end",
    overflow: "hidden",
    borderRadius: radii.lg,
    textDecoration: "none",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
    outlineOffset: {
      ":focus-visible": 2,
    },
  },
  marketCardImg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transform: {
      default: "scale(1)",
      ":hover": "scale(1.05)",
    },
  },
  marketCardScrim: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to top, color-mix(in oklch, var(--color-ink) 85%, transparent), color-mix(in oklch, var(--color-ink) 45%, transparent), color-mix(in oklch, var(--color-ink) 10%, transparent))",
  },
  marketCardTopBar: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
  },
  marketCardBody: {
    position: "relative",
    padding: 24,
  },
  marketCardApp: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: colors.paper,
    margin: 0,
  },
  marketCardTitle: {
    marginTop: 12,
    fontFamily: typography.body,
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: colors.paper,
    margin: 0,
  },
  marketCardCopy: {
    marginTop: 8,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-paper) 90%, transparent)",
    margin: 0,
  },
  marketCardExplore: {
    marginTop: 16,
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 6,
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: {
      default: colors.paper,
      ":hover": colors.brandGreen300,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
  },
  /* Stat Band */
  statBandSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.brandBlue800,
    backgroundColor: colors.brandBlue900,
  },
  statBandInner: {
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 32,
    },
  },
  statBandGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.md]: "repeat(4, 1fr)",
    },
    margin: 0,
    padding: 0,
  },
  statItem: {
    paddingLeft: {
      default: 8,
      [breakpoints.md]: 24,
    },
    paddingRight: {
      default: 8,
      [breakpoints.md]: 24,
    },
    paddingTop: {
      default: 32,
      [breakpoints.md]: 40,
    },
    paddingBottom: {
      default: 32,
      [breakpoints.md]: 40,
    },
  },
  statItemBorderLeft: {
    borderLeftWidth: {
      default: null,
      [breakpoints.md]: 1,
    },
    borderLeftStyle: {
      default: null,
      [breakpoints.md]: "solid",
    },
    borderLeftColor: {
      default: null,
      [breakpoints.md]: colors.brandBlue800,
    },
  },
  statValue: {
    fontFamily: typography.body,
    fontSize: {
      default: 30,
      [breakpoints.md]: 36,
    },
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: colors.paper,
    margin: 0,
  },
  statDesc: {
    marginTop: 4,
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.brandBlue200,
    margin: 0,
  },
  /* Heritage Section */
  heritageSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
    paddingTop: {
      default: 64,
      [breakpoints.md]: 96,
    },
    paddingBottom: {
      default: 64,
      [breakpoints.md]: 96,
    },
  },
  heritageGrid: {
    display: "grid",
    alignItems: "center",
    gap: {
      default: 40,
      [breakpoints.lg]: 64,
    },
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 32,
    },
    gridTemplateColumns: {
      default: null,
      [breakpoints.lg]: "repeat(2, 1fr)",
    },
  },
  heritageHeading: {
    marginTop: 16,
    fontFamily: typography.body,
    fontSize: {
      default: 30,
      [breakpoints.md]: 36,
    },
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
  },
  heritageParagraph: {
    marginTop: 24,
    maxWidth: 576,
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  heritageParagraph2: {
    marginTop: 16,
    maxWidth: 576,
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  heritageCertList: {
    marginTop: 24,
  },
  heritageLink: {
    marginTop: 24,
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 8,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    color: {
      default: colors.brandBlue700,
      ":hover": colors.brandBlue800,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  heritageImgBox: {
    position: "relative",
    overflow: "hidden",
    borderRadius: radii.lg,
  },
  heritageImg: {
    aspectRatio: "4 / 3",
    width: "100%",
    objectFit: "cover",
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
  },
  heritageBadge: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-paper) 95%, transparent)",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  heritageBadgeCity: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.mute600,
  },
  heritageBadgeCoords: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.brandBlue700,
    fontVariantNumeric: "tabular-nums",
  },
  /* Portfolio Table */
  matrixSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.mute50,
    paddingTop: {
      default: 64,
      [breakpoints.md]: 96,
    },
    paddingBottom: {
      default: 64,
      [breakpoints.md]: 96,
    },
  },
  matrixHeading: {
    marginTop: 16,
    maxWidth: 672,
    fontFamily: typography.body,
    fontSize: {
      default: 30,
      [breakpoints.md]: 36,
    },
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
  },
  tableScrollBox: {
    marginTop: 40,
    overflowX: "auto",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.paper,
    boxShadow: shadows.ambient,
  },
  table: {
    width: "100%",
    minWidth: 720,
    borderCollapse: "collapse",
    textAlign: "left",
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
  tableHeaderRow: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  th: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklch, var(--color-brand-blue-50) 60%, transparent)",
    },
  },
  tableRowLast: {
    borderBottomWidth: 0,
  },
  td: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  tdCompoundName: {
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 700,
    color: colors.ink,
    margin: 0,
  },
  tdCompoundCode: {
    marginTop: 2,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: colors.mute600,
    margin: 0,
  },
  tdLatin: {
    fontFamily: typography.body,
    fontSize: 14,
    fontStyle: "italic",
    color: colors.mute600,
  },
  tdPurity: {
    fontFamily: typography.tech,
    fontSize: 12,
    color: colors.mute700,
  },
  appChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.paper,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: colors.ink,
  },
  matrixFooterText: {
    marginTop: 20,
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.mute600,
  },
  /* Global Network */
  networkSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-brand-blue-50) 50%, transparent)",
    paddingTop: {
      default: 64,
      [breakpoints.md]: 96,
    },
    paddingBottom: {
      default: 64,
      [breakpoints.md]: 96,
    },
  },
  networkGrid: {
    marginTop: 40,
    display: "grid",
    gap: 20,
    gridTemplateColumns: {
      default: null,
      [breakpoints.sm]: "repeat(2, 1fr)",
      [breakpoints.lg]: "repeat(3, 1fr)",
    },
  },
  networkCard: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: colors.line,
      ":hover": colors.brandBlue300,
    },
    backgroundColor: colors.paper,
    padding: 20,
    boxShadow: shadows.lift,
    transitionProperty: "border-color",
    transitionDuration: "300ms",
  },
  networkCardHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
  },
  networkCity: {
    fontFamily: typography.body,
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: colors.ink,
    margin: 0,
  },
  networkCountry: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: colors.mute600,
  },
  networkRole: {
    marginTop: 6,
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.mute600,
    margin: 0,
  },
  networkCardFooter: {
    marginTop: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: 12,
  },
  networkShort: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.mute600,
  },
  networkCoords: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.14em",
    color: colors.brandBlue700,
    fontVariantNumeric: "tabular-nums",
  },
  /* Finale Section */
  finaleSection: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.brandGreen950,
  },
  finaleRadial: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(ellipse 70% 60% at 50% 0%, var(--color-brand-green-500), transparent)",
    opacity: 0.2,
  },
  finaleInner: {
    position: "relative",
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingTop: {
      default: 80,
      [breakpoints.md]: 112,
    },
    paddingBottom: {
      default: 80,
      [breakpoints.md]: 112,
    },
    textAlign: "center",
  },
  finaleHeading: {
    marginTop: 24,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 768,
    fontFamily: typography.body,
    fontSize: {
      default: 30,
      [breakpoints.md]: 48,
    },
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: "-0.03em",
    color: colors.paper,
    margin: 0,
  },
  finaleLead: {
    marginTop: 24,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 576,
    fontFamily: typography.body,
    fontSize: {
      default: 16,
      [breakpoints.md]: 18,
    },
    lineHeight: 1.625,
    color: colors.brandGreen100,
    margin: 0,
  },
  finaleActions: {
    marginTop: 36,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  finaleEmailLink: {
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    color: {
      default: colors.brandGreen300,
      ":hover": colors.paper,
    },
    textDecoration: "underline",
    textDecorationColor: colors.brandGreen700,
    textUnderlineOffset: 4,
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  finaleResponseTime: {
    marginTop: 32,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.brandGreen400,
  },
  /* Footer */
  footer: {
    backgroundColor: colors.brandBlue950,
  },
  footerGrid: {
    display: "grid",
    gap: 40,
    paddingTop: {
      default: 56,
      [breakpoints.md]: 64,
    },
    paddingBottom: {
      default: 56,
      [breakpoints.md]: 64,
    },
    gridTemplateColumns: {
      default: null,
      [breakpoints.md]: "repeat(12, 1fr)",
    },
  },
  footerBrandCol: {
    gridColumn: {
      default: null,
      [breakpoints.md]: "span 5 / span 5",
    },
  },
  footerBrandName: {
    fontFamily: typography.body,
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: "-0.04em",
    color: colors.paper,
    margin: 0,
  },
  footerBrandTagline: {
    marginTop: 12,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 500,
    color: colors.brandBlue100,
    margin: 0,
  },
  footerEst: {
    marginTop: 20,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    lineHeight: 2,
    letterSpacing: "0.22em",
    color: colors.brandBlue200,
    margin: 0,
  },
  footerCertsList: {
    marginTop: 20,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  footerCertChip: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    backgroundColor: colors.brandBlue900,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: colors.brandBlue100,
  },
  footerNavCol: {
    gridColumn: {
      default: null,
      [breakpoints.md]: "span 2 / span 2",
    },
  },
  footerNavList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  footerNavLink: {
    fontFamily: typography.body,
    fontSize: 14,
    color: {
      default: colors.brandBlue200,
      ":hover": colors.paper,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  footerWordmark: {
    userSelect: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontFamily: typography.body,
    fontSize: {
      default: "17vw",
      "@media (min-width: 1281px)": "13rem",
    },
    fontWeight: 800,
    lineHeight: 0.78,
    letterSpacing: "-0.06em",
    color: "color-mix(in oklch, var(--color-paper) 5%, transparent)",
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
    borderTopColor: colors.brandBlue800,
    paddingTop: 16,
    paddingBottom: 16,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.brandBlue200,
    alignItems: {
      default: null,
      [breakpoints.md]: "center",
    },
    justifyContent: {
      default: null,
      [breakpoints.md]: "space-between",
    },
  },
});
const DIVISION_DOT_KEYS: Record<DivisionKey, keyof typeof styles> = {
  nutrition: "dot_nutrition",
  food: "dot_food",
  cosmetics: "dot_cosmetics",
  chem: "dot_chem",
  agro: "dot_agro",
  feed: "dot_feed",
};
const DIVISION_BAR_KEYS: Record<DivisionKey, keyof typeof styles> = {
  nutrition: "bar_nutrition",
  food: "bar_food",
  cosmetics: "bar_cosmetics",
  chem: "bar_chem",
  agro: "bar_agro",
  feed: "bar_feed",
};
function LiveDot() {
  return (
    <span aria-hidden {...stylex.props(styles.liveDotOuter)}>
      <span {...stylex.props(styles.liveDotPing)} />
      <span {...stylex.props(styles.liveDotInner)} />
    </span>
  );
}

/* ─────────────────────────────── Nav ─────────────────────────────── */

function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  return (
    <div {...stylex.props(styles.mobileNavWrapper)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        {...stylex.props(styles.mobileMenuBtn)}
      >
        {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
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
          FENCHEM
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

/* ─────────────────────────────── Hero + Ingredient search ─────────────────────────────── */

function IngredientSearch() {
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();
  const trimmed = query.trim();
  const matches = trimmed ? searchIngredients(trimmed) : [];
  return (
    <div {...stylex.props(styles.searchCard)}>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        {...stylex.props(styles.searchForm)}
      >
        <label
          htmlFor="ingredient-search"
          {...stylex.props(styles.techLabelLight, styles.searchLabel)}
        >
          Search the ingredient portfolio
        </label>
        <div {...stylex.props(styles.searchRel)}>
          <Search aria-hidden size={16} {...stylex.props(styles.searchIcon)} />
          <input
            id="ingredient-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Try "Lutein", "Curcuma longa" or "Personal Care"'
            autoComplete="off"
            {...stylex.props(styles.searchInput)}
          />
        </div>
      </form>

      {/* Result count — live region so filtering is announced, not silent. */}
      <p aria-live="polite" {...stylex.props(styles.searchCountRow)}>
        <LiveDot />
        <span {...stylex.props(styles.searchCountText)}>
          {trimmed
            ? matches.length > 0
              ? `${matches.length} matching compound${matches.length === 1 ? "" : "s"}`
              : "No matching compounds"
            : `${ingredients.length} active compounds indexed`}
        </span>
      </p>

      <AnimatePresence initial={false}>
        {trimmed && (
          <m.div
            initial={
              reduce
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    y: -4,
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
            {...stylex.props(styles.searchResultsBox)}
          >
            {matches.length > 0 ? (
              <ul {...stylex.props(styles.searchList)}>
                {matches.map((item) => {
                  const div = divisionForApplication(item.application);
                  return (
                    <li key={item.code}>
                      <a href="#matrix" {...stylex.props(styles.searchResultItem)}>
                        <span {...stylex.props(styles.searchResultLeft)}>
                          <span
                            aria-hidden
                            {...stylex.props(styles.dotBase, styles[DIVISION_DOT_KEYS[div]])}
                          />
                          <span {...stylex.props(styles.searchResultName)}>{item.name}</span>
                          <span {...stylex.props(styles.searchResultLatin)}>{item.latin}</span>
                        </span>
                        <span {...stylex.props(styles.searchResultPurity)}>{item.purity}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p {...stylex.props(styles.searchEmptyText)}>
                Nothing in the featured index matches "{trimmed}" — our sourcing desk covers far
                more.{" "}
                <a href="#contact" {...stylex.props(styles.searchEmptyLink)}>
                  Ask for a sourcing brief
                </a>
                .
              </p>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
function HeroSection() {
  return (
    <section id="top" aria-label="Hero and ingredient search" {...stylex.props(styles.heroSection)}>
      <img
        src={IMG.hero}
        alt="Lush green botanical leaves in morning light — Fenchem's raw-material world"
        loading="eager"
        {...stylex.props(styles.heroImgBg)}
      />
      <div aria-hidden {...stylex.props(styles.heroScrim)} />
      <div {...stylex.props(styles.container, styles.heroInner)}>
        <Intro>
          <p {...stylex.props(styles.heroTagPill)}>
            <LiveDot />
            <span {...stylex.props(styles.heroTagText)}>
              Ingredient supply portal — 40+ countries
            </span>
          </p>
        </Intro>
        <Intro delay={STAGGER}>
          <h1 {...stylex.props(styles.heroHeading)}>Botanical intelligence, supplied worldwide.</h1>
        </Intro>
        <Intro delay={STAGGER * 2}>
          <p {...stylex.props(styles.heroSub)}>
            Find the standardized active your formulation needs — specifications, regulatory
            documentation and samples from one audited supplier, since 1995.
          </p>
        </Intro>
        <Intro delay={STAGGER * 3}>
          <div {...stylex.props(styles.heroSearchIntro)}>
            <IngredientSearch />
          </div>
        </Intro>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Market cards ─────────────────────────────── */

function MarketsSection() {
  return (
    <section
      id="markets"
      aria-labelledby="markets-heading"
      {...stylex.props(styles.marketsSection)}
    >
      <div {...stylex.props(styles.container, styles.marketsInner)}>
        <div {...stylex.props(styles.marketsHeaderRow)}>
          <Reveal>
            <p {...stylex.props(styles.eyebrowBlue)}>01 — Markets</p>
            <h2 id="markets-heading" {...stylex.props(styles.marketsHeading)}>
              Start from <span {...stylex.props(styles.eyebrowBlue)}>your market</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <p {...stylex.props(styles.marketsLead)}>
              Three application domains, one documentation standard. Pick a lane and land on the
              compounds built for it.
            </p>
          </Reveal>
        </div>

        <div {...stylex.props(styles.marketsGrid)}>
          {industries.map((industry, i) => {
            const division = divisionForApplication(MARKET_APPLICATIONS[i]);
            return (
              <Reveal key={industry.title} delay={i * STAGGER}>
                <a
                  href="#matrix"
                  aria-label={`${industry.title} — explore ingredients in the portfolio table`}
                  {...stylex.props(styles.marketCard)}
                >
                  <img
                    src={industry.image.src}
                    alt={industry.image.alt}
                    loading="lazy"
                    {...stylex.props(styles.marketCardImg)}
                  />
                  <div aria-hidden {...stylex.props(styles.marketCardScrim)} />
                  <span
                    aria-hidden
                    {...stylex.props(styles.marketCardTopBar, styles[DIVISION_BAR_KEYS[division]])}
                  />
                  <div {...stylex.props(styles.marketCardBody)}>
                    <p {...stylex.props(styles.marketCardApp)}>
                      <span
                        aria-hidden
                        {...stylex.props(styles.dotBase, styles[DIVISION_DOT_KEYS[division]])}
                      />
                      {MARKET_APPLICATIONS[i]}
                    </p>
                    <h3 {...stylex.props(styles.marketCardTitle)}>{industry.title}</h3>
                    <p {...stylex.props(styles.marketCardCopy)}>{industry.copy}</p>
                    <span {...stylex.props(styles.marketCardExplore)}>
                      Explore ingredients
                      <ArrowUpRight aria-hidden size={14} />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Stat band ─────────────────────────────── */

function StatBand() {
  return (
    <section aria-label="Company metrics" {...stylex.props(styles.statBandSection)}>
      <div {...stylex.props(styles.container, styles.statBandInner)}>
        <dl {...stylex.props(styles.statBandGrid)}>
          {STATS.map((stat, i) => (
            <Reveal key={stat.unit} delay={i * STAGGER}>
              <div {...stylex.props(styles.statItem, i > 0 && styles.statItemBorderLeft)}>
                <dt {...stylex.props(styles.techLabelNavy)}>{stat.unit}</dt>
                <dd>
                  <span {...stylex.props(styles.statValue)}>{stat.value}</span>
                  <p {...stylex.props(styles.statDesc)}>{stat.desc}</p>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Heritage narrative ─────────────────────────────── */

function HeritageSection() {
  const otherBases = regions
    .slice(1)
    .map((region) => region.city)
    .join(", ");
  return (
    <section aria-labelledby="heritage-heading" {...stylex.props(styles.heritageSection)}>
      <div {...stylex.props(styles.container, styles.heritageGrid)}>
        <Reveal>
          <p {...stylex.props(styles.eyebrowBlue)}>02 — Since {company.founded}</p>
          <h2 id="heritage-heading" {...stylex.props(styles.heritageHeading)}>
            Thirty years from Nanjing{" "}
            <span {...stylex.props(styles.eyebrowBlue)}>to six global bases</span>
          </h2>
          <p {...stylex.props(styles.heritageParagraph)}>
            Fenchem began in {company.founded} as a Nanjing ingredient laboratory with one
            conviction: botanical actives deserve the same specification discipline as any fine
            chemical. Three decades on, that discipline runs an audited supply chain serving
            formulators in more than forty countries.
          </p>
          <p {...stylex.props(styles.heritageParagraph2)}>
            Six bases — the {company.hq.city} headquarters and R&D campus plus {otherBases} — keep
            documentation, compliance and logistics close to every regulated market we supply.
          </p>
          <p {...stylex.props(styles.techLabelLight, styles.heritageCertList)}>
            {certifications.join(" · ")}
          </p>
          <a href="#network" {...stylex.props(styles.heritageLink)}>
            See the network
            <ArrowUpRight aria-hidden size={16} />
          </a>
        </Reveal>

        <Reveal delay={STAGGER}>
          <div {...stylex.props(styles.heritageImgBox)}>
            <img
              src={IMG.origin}
              alt="Rows of cultivated green crops on a partner farm at golden hour"
              loading="lazy"
              {...stylex.props(styles.heritageImg)}
            />
            <div {...stylex.props(styles.heritageBadge)}>
              <span {...stylex.props(styles.heritageBadgeCity)}>
                {company.hq.city}, {company.hq.country} — HQ
              </span>
              <span {...stylex.props(styles.heritageBadgeCoords)}>{company.hq.coords}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Portfolio table ─────────────────────────────── */

function ApplicationChip({ application }: { application: IngredientApplication }) {
  const div = divisionForApplication(application);
  return (
    <span {...stylex.props(styles.appChip)}>
      <span aria-hidden {...stylex.props(styles.dotBase, styles[DIVISION_DOT_KEYS[div]])} />
      {application}
    </span>
  );
}
function MatrixSection() {
  const featured = getFeaturedIngredients();
  return (
    <section id="matrix" aria-labelledby="matrix-heading" {...stylex.props(styles.matrixSection)}>
      <div {...stylex.props(styles.container, styles.marketsInner)}>
        <div {...stylex.props(styles.marketsHeaderRow)}>
          <Reveal>
            <p {...stylex.props(styles.eyebrowBlue)}>03 — Portfolio</p>
            <h2 id="matrix-heading" {...stylex.props(styles.matrixHeading)}>
              The featured <span {...stylex.props(styles.eyebrowBlue)}>compound index</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <a href="#contact" {...stylex.props(styles.ctaOutlineBlue)}>
              Request Full Specifications
              <ArrowRight aria-hidden size={14} />
            </a>
          </Reveal>
        </div>

        <Reveal delay={STAGGER}>
          <div {...stylex.props(styles.tableScrollBox)}>
            <table {...stylex.props(styles.table)}>
              <caption {...stylex.props(styles.srOnly)}>
                Featured ingredient portfolio with botanical source, assay, form and application
              </caption>
              <thead>
                <tr {...stylex.props(styles.tableHeaderRow)}>
                  <th scope="col" {...stylex.props(styles.th, styles.techLabelLight)}>
                    Compound
                  </th>
                  <th scope="col" {...stylex.props(styles.th, styles.techLabelLight)}>
                    Botanical Source
                  </th>
                  <th scope="col" {...stylex.props(styles.th, styles.techLabelLight)}>
                    Assay
                  </th>
                  <th scope="col" {...stylex.props(styles.th, styles.techLabelLight)}>
                    Form
                  </th>
                  <th scope="col" {...stylex.props(styles.th, styles.techLabelLight)}>
                    Application
                  </th>
                </tr>
              </thead>
              <tbody>
                {featured.map((item, idx) => (
                  <tr
                    key={item.code}
                    {...stylex.props(
                      styles.tableRow,
                      idx === featured.length - 1 && styles.tableRowLast,
                    )}
                  >
                    <td {...stylex.props(styles.td)}>
                      <p {...stylex.props(styles.tdCompoundName)}>{item.name}</p>
                      <p {...stylex.props(styles.tdCompoundCode)}>{item.code}</p>
                    </td>
                    <td {...stylex.props(styles.td, styles.tdLatin)}>{item.latin}</td>
                    <td {...stylex.props(styles.td, styles.tdPurity)}>{item.purity}</td>
                    <td {...stylex.props(styles.td, styles.tdPurity)}>{item.form}</td>
                    <td {...stylex.props(styles.td)}>
                      <ApplicationChip application={item.application} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={STAGGER * 2}>
          <p {...stylex.props(styles.matrixFooterText)}>
            {ingredients.length - featured.length} further actives ship under the same documentation
            standard —{" "}
            <a href="#contact" {...stylex.props(styles.searchEmptyLink)}>
              ask for the full index
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Global network ─────────────────────────────── */

function NetworkSection() {
  return (
    <section
      id="network"
      aria-labelledby="network-heading"
      {...stylex.props(styles.networkSection)}
    >
      <div {...stylex.props(styles.container, styles.marketsInner)}>
        <div {...stylex.props(styles.marketsHeaderRow)}>
          <Reveal>
            <p {...stylex.props(styles.eyebrowBlue)}>04 — Network</p>
            <h2 id="network-heading" {...stylex.props(styles.matrixHeading)}>
              Six bases, <span {...stylex.props(styles.eyebrowBlue)}>one supply standard</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER}>
            <p {...stylex.props(styles.marketsLead)}>
              Documentation, compliance and logistics handled from the base nearest your regulatory
              map.
            </p>
          </Reveal>
        </div>

        <div {...stylex.props(styles.networkGrid)}>
          {regions.map((region, i) => (
            <Reveal key={region.city} delay={(i % 3) * STAGGER}>
              <div {...stylex.props(styles.networkCard)}>
                <div {...stylex.props(styles.networkCardHeader)}>
                  <h3 {...stylex.props(styles.networkCity)}>{region.city}</h3>
                  <span {...stylex.props(styles.networkCountry)}>{region.country}</span>
                </div>
                <p {...stylex.props(styles.networkRole)}>{region.role}</p>
                <div {...stylex.props(styles.networkCardFooter)}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <LiveDot />
                    <span {...stylex.props(styles.networkShort)}>{region.short}</span>
                  </span>
                  <span {...stylex.props(styles.networkCoords)}>{region.coords}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Finale ─────────────────────────────── */

function FinaleSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" {...stylex.props(styles.finaleSection)}>
      <div aria-hidden {...stylex.props(styles.finaleRadial)} />
      <div {...stylex.props(styles.container, styles.finaleInner)}>
        <Reveal>
          <p {...stylex.props(styles.eyebrowGreen400)}>05 — Contact</p>
          <h2 id="contact-heading" {...stylex.props(styles.finaleHeading)}>
            Found your ingredient?{" "}
            <span
              style={{
                color: colors.brandGreen400,
              }}
            >
              Get its specification.
            </span>
          </h2>
          <p {...stylex.props(styles.finaleLead)}>
            Send your target — compound, assay, form, regulatory map — and the nearest base returns
            specifications, documentation and lead times within one business day.
          </p>
        </Reveal>
        <Reveal delay={STAGGER * 2}>
          <div {...stylex.props(styles.finaleActions)}>
            <a href={createInquiryHref()} {...stylex.props(styles.ctaPrimaryDark)}>
              Request Specifications
              <ArrowRight aria-hidden size={16} />
            </a>
            <a href={`mailto:${company.email}`} {...stylex.props(styles.finaleEmailLink)}>
              {company.email}
            </a>
          </div>
          <p {...stylex.props(styles.finaleResponseTime)}>
            Response &lt; 24h — Technical Dossiers on Request
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
      <div {...stylex.props(styles.container, styles.marketsInner)}>
        <div {...stylex.props(styles.footerGrid)}>
          <div {...stylex.props(styles.footerBrandCol)}>
            <p {...stylex.props(styles.footerBrandName)}>FENCHEM</p>
            <p {...stylex.props(styles.footerBrandTagline)}>{company.tagline}.</p>
            <p {...stylex.props(styles.footerEst)}>
              Est. {company.founded} — {company.hq.city}, {company.hq.country}
            </p>
            <div {...stylex.props(styles.footerCertsList)}>
              {certifications.map((cert) => (
                <span key={cert} {...stylex.props(styles.footerCertChip)}>
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.head} {...stylex.props(styles.footerNavCol)}>
              <p {...stylex.props(styles.techLabelNavy)}>{col.head}</p>
              <ul {...stylex.props(styles.footerNavList)}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} {...stylex.props(styles.footerNavLink)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ghost wordmark — extrabold: Jakarta loads 300–800; 900 would synthesize */}
        <p aria-hidden {...stylex.props(styles.footerWordmark)}>
          FENCHEM
        </p>

        <div {...stylex.props(styles.footerLegal)}>
          <span>© 2026 {company.legalName} — All Rights Reserved</span>
          <span
            style={{
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {company.hq.coords} — Nanjing, China
          </span>
          <span>Botanical Intelligence Since {company.founded}</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── Root export ─────────────────────────────── */

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
export function VariantI() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        <SmoothScroll />
        <NavBar />
        <main>
          <HeroSection />
          <MarketsSection />
          <StatBand />
          <HeritageSection />
          <MatrixSection />
          <NetworkSection />
          <FinaleSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
