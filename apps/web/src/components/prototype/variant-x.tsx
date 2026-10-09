import { CurrentYear } from "./shared/current-year";
import { SpecificationMobileMenu } from "./shared/navigation-and-headline";
import { LayoutGroup } from "motion/react";

/*
 * PROTOTYPE — Variant X: "Folio · magazine spread".
 *
 * Creative direction derived from a 96-character random seed
 * (`tr -dc 'A-Za-z0-9' </dev/urandom | head -c 96`):
 *
 *   N4vpKltTutVWa1YDLZydJcsR5uIIslnR7oOd9IIJ4o8O3xpN6Uc3Y8eO2jVwluC0h02aGQb8vKh7UUHpbKm53SU02gRg0lrH
 *
 * What the string dictated:
 *   - Doubled letters everywhere — II (twice), UU, 00, ll, tT — so the page is
 *     a diptych: two equal columns with a 1px rule between them, inside a
 *     1280px measure. Prose is set in real two-column text.
 *   - The top characters l, I, U, 0 are all vertical strokes: column rules,
 *     rails, and running folio labels set sideways in the left margin.
 *   - The II is the chapter numbering: Roman numerals I–IV, a real sequence.
 *   - Four zeros, the most of any seed, and the string ends on 0: the six
 *     featured ingredients are round portraits, and the page ends in the
 *     single dark band.
 *   - No element symbols at all — this seed is about print, not chemistry, so
 *     Newsreader leads: drop cap, pull-quote, standfirst, colophon.
 *   - 22 digits (sum 87), 36 upper / 38 lower: a calm, serif-weighted page.
 *
 * Brand law carried over unchanged: Clean White canvas, green-led, blue only
 * interactive, hairline structure, division colors as wayfinding dots, one
 * gradient (the finale glow), Reveal + EASE + STAGGER only.
 */
import { useEffect, useId, useState } from "react";
import { LazyMotion, domMax, m } from "motion/react";
import { ArrowRight, ArrowUpRight, Leaf, Menu, X } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { WORLD_PATH } from "@/components/prototype/world-map-path";
import {
  certificationDetails,
  company,
  createInquiryHref,
  divisionForApplication,
  getFeaturedIngredients,
  heroImage,
  industries,
  navLinks,
  pillars,
  regions,
  stats,
  toAnchor,
  type DivisionKey,
  type Ingredient,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Seed ─────────────────────────────── */

const SEED =
  "N4vpKltTutVWa1YDLZydJcsR5uIIslnR7oOd9IIJ4o8O3xpN6Uc3Y8eO2jVwluC0h02aGQb8vKh7UUHpbKm53SU02gRg0lrH";
const SEED_SHORT = `${SEED.slice(0, 6)}…${SEED.slice(-4)}`;

const MD_ONLY = "@media (min-width: 768px) and (max-width: 1023.98px)";

const CHAPTERS = ["I", "II", "III", "IV"] as const;

const DIVISION_LABEL: Record<DivisionKey, string> = {
  feed: "Feed",
  cosmetics: "Cosmetics",
  agro: "Agrochemical",
  food: "Food",
  chem: "Chemical",
  nutrition: "Nutrition",
};

const DIVISION_ORDER: DivisionKey[] = ["nutrition", "food", "cosmetics", "chem", "agro", "feed"];

const FEATURED = getFeaturedIngredients();

/* ─────────────────────────────── Map ─────────────────────────────── */

type LatLon = { lat: number; lon: number };

function parseCoords(coords: string): LatLon {
  const match = coords.match(/([NS])\s*([\d.]+)\s*\/\s*([EW])\s*([\d.]+)/);
  if (!match) return { lat: 0, lon: 0 };
  const lat = Number(match[2]) * (match[1] === "S" ? -1 : 1);
  const lon = Number(match[4]) * (match[3] === "W" ? -1 : 1);
  return { lat, lon };
}

/** Equirectangular projection into the 2000×1001 plane of WORLD_PATH. */
function project({ lat, lon }: LatLon): { x: number; y: number } {
  return { x: ((lon + 180) / 360) * 2000, y: ((90 - lat) / 180) * 1001 };
}

const REGION_POINTS = regions.map((region) => ({
  region,
  point: project(parseCoords(region.coords)),
}));

/* ─────────────────────────────── Styles ─────────────────────────────── */

const styles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    color: colors.ink,
    fontFamily: typography.body,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "::selection": {
      backgroundColor: colors.brandGreen200,
      color: colors.brandGreen950,
    },
  },
  container: {
    maxWidth: 1280,
    marginInline: "auto",
    paddingInline: {
      default: 20,
      [breakpoints.md]: 40,
    },
  },
  /*
   * Overlapping min-width queries on one property are emitted in hash order by
   * the compiler, so a middle tier is always a bounded range here.
   */
  section: {
    paddingBlock: {
      default: 64,
      [MD_ONLY]: 88,
      [breakpoints.lg]: 112,
    },
  },
  hairlineTop: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },

  /* Folio rail: [folio] [content] at lg */
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "56px minmax(0, 1fr)",
    },
    columnGap: {
      default: 0,
      [breakpoints.lg]: 24,
    },
    alignItems: "start",
  },
  folioCell: {
    display: {
      default: "none",
      [breakpoints.lg]: "block",
    },
    position: "sticky",
    top: 112,
    alignSelf: "start",
    height: "fit-content",
  },
  folio: {
    display: "inline-block",
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    fontFamily: typography.tech,
    fontSize: 11,
    lineHeight: 1,
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: colors.mute600,
    paddingBlock: 4,
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: colors.line,
    paddingLeft: 10,
  },

  /* Diptych */
  diptych: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 1fr) minmax(0, 1fr)",
    },
    rowGap: 40,
  },
  leaf: {
    paddingRight: {
      default: 0,
      [breakpoints.lg]: 40,
    },
    borderRightWidth: {
      default: 0,
      [breakpoints.lg]: 1,
    },
    borderRightStyle: "solid",
    borderRightColor: colors.line,
  },
  leafRight: {
    paddingLeft: {
      default: 0,
      [breakpoints.lg]: 40,
    },
  },
  diptychTight: {
    rowGap: 0,
  },
  regionListSecond: {
    borderTopWidth: {
      default: 0,
      [breakpoints.lg]: 1,
    },
  },
  issueCoords: {
    display: {
      default: "none",
      [breakpoints.md]: "inline",
    },
  },

  /* Type roles */
  eyebrow: {
    margin: 0,
    fontFamily: typography.tech,
    fontSize: 11,
    lineHeight: 1.4,
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    color: colors.brandGreen700,
  },
  techLabel: {
    fontFamily: typography.tech,
    fontSize: 11,
    lineHeight: 1.5,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: colors.mute600,
  },
  display: {
    margin: 0,
    fontFamily: typography.display,
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: 1.02,
    color: colors.ink,
  },
  h1: {
    fontSize: "clamp(3rem, 6vw, 6rem)",
    maxWidth: "12ch",
  },
  h2: {
    fontSize: "clamp(2rem, 3.8vw, 3.4rem)",
    lineHeight: 1.06,
    maxWidth: "18ch",
  },
  h3: {
    margin: 0,
    fontFamily: typography.display,
    fontWeight: 400,
    fontSize: 26,
    lineHeight: 1.15,
    letterSpacing: "-0.01em",
    color: colors.ink,
  },
  italicGreen: {
    fontStyle: "italic",
    color: colors.brandGreen600,
  },
  italic: {
    fontStyle: "italic",
  },
  standfirst: {
    margin: 0,
    fontFamily: typography.display,
    fontSize: {
      default: 19,
      [breakpoints.md]: 22,
    },
    lineHeight: 1.5,
    color: colors.mute800,
  },
  dropCap: {
    float: "left",
    fontFamily: typography.display,
    fontSize: {
      default: 74,
      [breakpoints.md]: 92,
    },
    lineHeight: 0.82,
    fontWeight: 400,
    color: colors.brandGreen700,
    paddingRight: 12,
    paddingTop: 6,
  },
  prose: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    color: colors.mute700,
  },
  proseColumns: {
    columnCount: {
      default: 1,
      [breakpoints.lg]: 2,
    },
    columnGap: 40,
    columnRuleWidth: 1,
    columnRuleStyle: "solid",
    columnRuleColor: colors.line,
  },
  caption: {
    margin: 0,
    fontFamily: typography.tech,
    fontSize: 11,
    lineHeight: 1.6,
    letterSpacing: "0.08em",
    color: colors.mute600,
  },
  chapterHead: {
    display: "grid",
    gap: 14,
    marginBottom: {
      default: 36,
      [breakpoints.lg]: 56,
    },
  },
  chapterRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 16,
  },
  numeral: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 28,
    lineHeight: 1,
    color: colors.brandGreen700,
  },

  /* Buttons */
  ctaPrimary: {
    display: "inline-flex",
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingInline: 24,
    paddingBlock: 12,
    borderRadius: radii.sm,
    borderWidth: 0,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    color: colors.brandGreen950,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color, transform",
    transitionDuration: "240ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transform: {
      default: "scale(1)",
      ":active": "scale(0.97)",
    },
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
    outlineOffset: 3,
  },
  ctaCompact: {
    minHeight: 40,
    paddingInline: 18,
    paddingBlock: 8,
    fontSize: 13,
  },
  ctaOutline: {
    display: "inline-flex",
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingInline: 22,
    paddingBlock: 12,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: colors.line,
      ":hover": colors.brandBlue700,
    },
    backgroundColor: "transparent",
    color: colors.brandBlue700,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    transitionProperty: "border-color",
    transitionDuration: "240ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: 3,
  },
  textLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.brandBlue700,
    textDecoration: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: {
      default: "transparent",
      ":hover": colors.brandBlue700,
    },
    paddingBottom: 2,
    transitionProperty: "border-color",
    transitionDuration: "200ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: 4,
  },

  /* Masthead */
  header: {
    position: "sticky",
    top: 0,
    zIndex: 60,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  masthead: {
    display: "grid",
    gridTemplateColumns: {
      default: "auto 1fr auto",
      [breakpoints.lg]: "1fr auto 1fr",
    },
    alignItems: "center",
    columnGap: 24,
    height: 68,
  },
  mastLeft: {
    display: {
      default: "none",
      [breakpoints.lg]: "flex",
    },
    alignItems: "center",
    gap: 28,
  },
  mastRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 28,
  },
  mastRightLinks: {
    display: {
      default: "none",
      [breakpoints.lg]: "contents",
    },
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: colors.ink,
    justifySelf: {
      default: "start",
      [breakpoints.lg]: "center",
    },
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
    outlineOffset: 4,
  },
  brandWord: {
    fontFamily: typography.display,
    fontSize: 24,
    letterSpacing: "0.22em",
    lineHeight: 1,
  },
  brandLeaf: {
    width: 16,
    height: 16,
    color: colors.brandGreen600,
  },
  navLink: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: {
      default: colors.mute700,
      ":hover": colors.ink,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
    outlineOffset: 6,
  },
  navCta: {
    display: {
      default: "none",
      [breakpoints.md]: "inline-flex",
    },
  },
  menuButton: {
    display: {
      default: "inline-flex",
      [breakpoints.lg]: "none",
    },
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.paper,
    color: colors.ink,
    cursor: "pointer",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
  },
  mobilePanel: {
    display: {
      default: "block",
      [breakpoints.lg]: "none",
    },
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  mobileList: {
    listStyle: "none",
    margin: 0,
    paddingBlock: 16,
    paddingInline: 0,
    display: "grid",
    gap: 4,
  },
  mobileLink: {
    display: "block",
    paddingBlock: 12,
    fontFamily: typography.display,
    fontSize: 28,
    color: colors.ink,
    textDecoration: "none",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
  },
  issueLine: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    paddingBlock: 10,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },

  /* Cover */
  cover: {
    paddingTop: {
      default: 48,
      [breakpoints.lg]: 80,
    },
    paddingBottom: {
      default: 64,
      [breakpoints.lg]: 112,
    },
  },
  coverLeft: {
    display: "grid",
    gap: 28,
    alignContent: "start",
  },
  coverActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  coverStats: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 20,
    marginTop: 8,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  statValue: {
    fontFamily: typography.display,
    fontSize: 40,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
    color: colors.ink,
  },
  statLabel: {
    margin: 0,
    marginTop: 8,
    fontSize: 13,
    lineHeight: 1.5,
    color: colors.mute600,
  },
  figure: {
    margin: 0,
    display: "grid",
    gap: 12,
  },
  portraitFrame: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: "3 / 4",
    borderRadius: radii.sm,
    backgroundColor: colors.mute100,
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
  },
  portraitImg: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transitionProperty: "transform",
    transitionDuration: "1200ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transform: {
      default: "scale(1)",
      ":hover": "scale(1.04)",
    },
  },

  /* Industries */
  industryGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 40,
  },
  industryCard: {
    display: "grid",
    gap: 16,
    alignContent: "start",
  },
  industryNumeral: {
    position: "absolute",
    top: 14,
    left: 14,
    paddingInline: 10,
    paddingBlock: 6,
    borderRadius: radii.sm,
    backgroundColor: colors.paper,
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 20,
    lineHeight: 1,
    color: colors.brandGreen700,
  },

  /* Pull quote */
  pullQuote: {
    margin: 0,
    paddingBlock: {
      default: 48,
      [breakpoints.lg]: 72,
    },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    display: "grid",
    gap: 24,
    justifyItems: "center",
    textAlign: "center",
  },
  pullQuoteText: {
    margin: 0,
    fontFamily: typography.display,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)",
    lineHeight: 1.18,
    letterSpacing: "-0.015em",
    maxWidth: "24ch",
    color: colors.ink,
  },
  pullQuoteCite: {
    fontStyle: "normal",
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.brandGreen700,
  },

  /* Portfolio (round portraits) */
  portfolioGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: {
      default: 20,
      [breakpoints.md]: 32,
    },
    rowGap: {
      default: 40,
      [breakpoints.md]: 56,
    },
  },
  portrait: {
    display: "grid",
    gap: 14,
    justifyItems: "center",
    textAlign: "center",
  },
  ring: {
    position: "relative",
    width: "min(100%, 240px)",
    aspectRatio: "1 / 1",
    borderRadius: radii.full,
    overflow: "hidden",
    backgroundColor: colors.mute100,
    outline: `1px solid ${colors.line}`,
    outlineOffset: 8,
    transitionProperty: "outline-color",
    transitionDuration: "300ms",
  },
  ringActive: {
    outline: `1px solid ${colors.brandGreen500}`,
  },
  ringImg: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "saturate(0.9)",
    transitionProperty: "transform",
    transitionDuration: "1200ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transform: "scale(1)",
  },
  ringImgActive: {
    transform: "scale(1.06)",
  },
  portraitCode: {
    marginTop: 8,
  },
  portraitName: {
    margin: 0,
    fontFamily: typography.display,
    fontWeight: 400,
    fontSize: 24,
    lineHeight: 1.15,
    color: colors.ink,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    transitionProperty: "border-color",
    transitionDuration: "300ms",
  },
  portraitNameActive: {
    borderBottomColor: colors.brandGreen600,
  },
  portraitLatin: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 15,
    color: colors.mute600,
  },
  portraitSpec: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.08em",
    color: colors.mute700,
    fontVariantNumeric: "tabular-nums",
  },
  portraitDivision: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: colors.mute600,
  },
  dot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: radii.full,
    flexShrink: 0,
  },
  dot_feed: { backgroundColor: colors.feed },
  dot_cosmetics: { backgroundColor: colors.cosmetics },
  dot_agro: { backgroundColor: colors.agro },
  dot_food: { backgroundColor: colors.food },
  dot_chem: { backgroundColor: colors.chem },
  dot_nutrition: { backgroundColor: colors.nutrition },

  /* Quality */
  /* Multicol needs a block container, so no grid here; items space themselves. */
  pillarList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  pillarItem: {
    display: "grid",
    gap: 8,
    breakInside: "avoid",
    marginBottom: 28,
  },
  pillarTitle: {
    margin: 0,
    fontFamily: typography.display,
    fontWeight: 400,
    fontSize: 24,
    lineHeight: 1.15,
    color: colors.ink,
  },
  certTable: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  certRow: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  certCellName: {
    paddingBlock: 12,
    paddingRight: 16,
    textAlign: "left",
    fontWeight: 600,
    color: colors.ink,
    whiteSpace: "nowrap",
  },
  certCellSub: {
    paddingBlock: 12,
    textAlign: "left",
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: colors.mute600,
  },
  certCellDot: {
    paddingBlock: 12,
    paddingRight: 12,
    width: 20,
  },
  certDot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
  },

  /* Global */
  regionList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  regionRow: {
    display: "grid",
    gridTemplateColumns: "32px minmax(0, 1fr) auto",
    columnGap: 12,
    alignItems: "baseline",
    paddingBlock: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  regionIndex: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 15,
    color: colors.brandGreen700,
  },
  regionCity: {
    margin: 0,
    fontSize: 15,
    fontWeight: 600,
    color: colors.ink,
  },
  regionRole: {
    margin: 0,
    fontSize: 13,
    color: colors.mute600,
  },
  regionCoords: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.06em",
    color: colors.mute600,
    fontVariantNumeric: "tabular-nums",
    textAlign: "right",
  },
  mapFrame: {
    position: "relative",
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.mute50,
    overflow: "hidden",
  },
  mapSvg: {
    display: "block",
    width: "100%",
    height: "auto",
    opacity: 0.85,
  },

  /* Finale */
  finale: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.brandGreen950,
    color: colors.paper,
    paddingBlock: {
      default: 96,
      [breakpoints.lg]: 152,
    },
  },
  finaleGlow: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(55% 70% at 25% 40%, rgba(100, 167, 51, 0.3), rgba(100, 167, 51, 0) 70%)",
    pointerEvents: "none",
  },
  finaleInner: {
    position: "relative",
    display: "grid",
    gap: 28,
    justifyItems: "center",
    textAlign: "center",
  },
  finaleEyebrow: {
    color: colors.brandGreen400,
  },
  finaleTitle: {
    fontSize: "clamp(2.3rem, 5vw, 4.6rem)",
    color: colors.paper,
    maxWidth: "18ch",
  },
  finaleItalic: {
    fontStyle: "italic",
    color: colors.brandGreen300,
  },
  finaleActions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  finaleMail: {
    fontFamily: typography.tech,
    fontSize: 12,
    letterSpacing: "0.12em",
    color: colors.brandGreen300,
    textDecoration: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: {
      default: "transparent",
      ":hover": colors.brandGreen300,
    },
    paddingBottom: 2,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: 4,
  },
  finaleMeta: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: colors.brandGreen400,
  },

  /* Colophon */
  footer: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: 48,
    paddingBottom: 28,
  },
  colophonGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [MD_ONLY]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr)",
    },
    columnGap: 40,
    rowGap: 32,
  },
  colophonCol: {
    display: "grid",
    gap: 12,
    alignContent: "start",
  },
  colophonHead: {
    margin: 0,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.mute600,
  },
  colophonList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 8,
  },
  colophonItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    color: colors.mute700,
  },
  colophonMono: {
    margin: 0,
    fontFamily: typography.tech,
    fontSize: 11,
    lineHeight: 1.9,
    letterSpacing: "0.06em",
    color: colors.mute600,
  },
  footerLink: {
    color: colors.brandBlue700,
    textDecoration: "none",
    fontSize: 14,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: 3,
  },
  footerBottom: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 40,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.12em",
    color: colors.mute600,
  },
});

const DOT_STYLE: Record<DivisionKey, keyof typeof styles> = {
  feed: "dot_feed",
  cosmetics: "dot_cosmetics",
  agro: "dot_agro",
  food: "dot_food",
  chem: "dot_chem",
  nutrition: "dot_nutrition",
};

function DivisionDot({ division }: { division: DivisionKey }) {
  return <span aria-hidden {...stylex.props(styles.dot, styles[DOT_STYLE[division]])} />;
}

/* ─────────────────────────────── Masthead ─────────────────────────────── */

function Masthead() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = navLinks.map((link) => ({ label: link.label, href: toAnchor(link.section) }));
  const left = links.slice(0, 2);
  const right = links.slice(2);

  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.container)}>
        <nav aria-label="Primary navigation" {...stylex.props(styles.masthead)}>
          <div {...stylex.props(styles.mastLeft)}>
            {left.map((link) => (
              <a key={link.href} href={link.href} {...stylex.props(styles.navLink)}>
                {link.label}
              </a>
            ))}
          </div>
          <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brand)}>
            <span {...stylex.props(styles.brandWord)}>FENCHEM</span>
            <Leaf aria-hidden strokeWidth={1.5} {...stylex.props(styles.brandLeaf)} />
          </a>
          <div {...stylex.props(styles.mastRight)}>
            <div {...stylex.props(styles.mastRightLinks)}>
              {right.map((link) => (
                <a key={link.href} href={link.href} {...stylex.props(styles.navLink)}>
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href={createInquiryHref("contact")}
              {...stylex.props(styles.ctaPrimary, styles.ctaCompact, styles.navCta)}
            >
              Request a specification
              <ArrowRight aria-hidden size={14} />
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              {...stylex.props(styles.menuButton)}
            >
              {open ? <X aria-hidden size={18} /> : <Menu aria-hidden size={18} />}
            </button>
          </div>
        </nav>
        <div {...stylex.props(styles.issueLine)}>
          <span {...stylex.props(styles.techLabel)}>
            Issue 01 · Botanical intelligence since 1995
          </span>
          <span {...stylex.props(styles.techLabel, styles.issueCoords)}>
            {company.hq.city} · {company.hq.coords}
          </span>
        </div>
      </div>
      <SpecificationMobileMenu
        styles={{
          mobilePanel: styles.mobilePanel,
          container: styles.container,
          mobileList: styles.mobileList,
          mobileLink: styles.mobileLink,
          ctaPrimary: styles.ctaPrimary,
        }}
        panelId={panelId}
        open={open}
        reduce={reduce}
        links={links}
        setOpen={setOpen}
      />
    </header>
  );
}

/* ─────────────────────────────── Folio + chapter ─────────────────────────────── */

function Folio({ label }: { label: string }) {
  return (
    <div aria-hidden {...stylex.props(styles.folioCell)}>
      <Reveal y={0} margin="0px">
        <span {...stylex.props(styles.folio)}>{label}</span>
      </Reveal>
    </div>
  );
}

function ChapterHead({
  numeral,
  eyebrow,
  title,
  id,
}: {
  numeral: string;
  eyebrow: string;
  title: React.ReactNode;
  id: string;
}) {
  return (
    <div {...stylex.props(styles.chapterHead)}>
      <Reveal>
        <div {...stylex.props(styles.chapterRow)}>
          <span {...stylex.props(styles.numeral)}>{numeral}</span>
          <p {...stylex.props(styles.eyebrow)}>{eyebrow}</p>
        </div>
      </Reveal>
      <Reveal delay={STAGGER}>
        <h2 id={id} {...stylex.props(styles.display, styles.h2)}>
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

/* ─────────────────────────────── Cover ─────────────────────────────── */

const STANDFIRST =
  "Fenchem turns raw botanical complexity into actives specified to the decimal — standardized, documented and supplied at industrial scale to formulators in more than forty countries.";

function CoverSpread() {
  const reduce = useReducedMotion();
  const first = STANDFIRST.charAt(0);
  const rest = STANDFIRST.slice(1);
  return (
    <section id="top" aria-label="Cover" {...stylex.props(styles.cover)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.sectionGrid)}>
          <Folio label="Fenchem · Feature · Cover" />
          <div {...stylex.props(styles.diptych)}>
            <div {...stylex.props(styles.leaf, styles.coverLeft)}>
              <Reveal margin="0px">
                <p {...stylex.props(styles.eyebrow)}>Botanical intelligence since 1995</p>
              </Reveal>
              <Reveal delay={STAGGER} margin="0px">
                <h1 {...stylex.props(styles.display, styles.h1)}>
                  Nurturing vitality through{" "}
                  <span {...stylex.props(styles.italicGreen)}>botanical excellence</span>
                </h1>
              </Reveal>
              <Reveal delay={STAGGER * 2} margin="0px">
                <p {...stylex.props(styles.standfirst)}>
                  <span aria-hidden {...stylex.props(styles.dropCap)}>
                    {first}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      width: 1,
                      height: 1,
                      overflow: "hidden",
                      clip: "rect(0 0 0 0)",
                    }}
                  >
                    {first}
                  </span>
                  {rest}
                </p>
              </Reveal>
              <Reveal delay={STAGGER * 3} margin="0px">
                <div {...stylex.props(styles.coverActions)}>
                  <a href="#portfolio" {...stylex.props(styles.ctaPrimary)}>
                    Read the portfolio
                    <ArrowRight aria-hidden size={16} />
                  </a>
                  <a href={createInquiryHref("contact")} {...stylex.props(styles.ctaOutline)}>
                    Request a specification
                  </a>
                </div>
              </Reveal>
              <Reveal delay={STAGGER * 4} margin="0px">
                <dl {...stylex.props(styles.coverStats)}>
                  {stats.slice(0, 2).map((stat) => (
                    <div key={stat.label}>
                      <dt {...stylex.props(styles.statValue)}>{stat.value}</dt>
                      <dd {...stylex.props(styles.statLabel)}>{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
            <div {...stylex.props(styles.leafRight)}>
              <m.figure
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.2, ease: EASE }}
                {...stylex.props(styles.figure)}
              >
                <div {...stylex.props(styles.portraitFrame)}>
                  <m.img
                    src={heroImage.src}
                    alt={heroImage.alt}
                    loading="eager"
                    initial={reduce ? false : { scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
                    {...stylex.props(styles.portraitImg)}
                  />
                </div>
                <figcaption {...stylex.props(styles.caption)}>Fig. 1 — {heroImage.alt}.</figcaption>
              </m.figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Chapter I — Industries ─────────────────────────────── */

function IndustriesChapter() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-title"
      {...stylex.props(styles.section, styles.hairlineTop)}
    >
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.sectionGrid)}>
          <Folio label="Fenchem · Feature · Chapter I" />
          <div>
            <ChapterHead
              numeral={CHAPTERS[0]}
              eyebrow="Industries · three markets"
              id="industries-title"
              title={
                <>
                  Three markets, <span {...stylex.props(styles.italic)}>one</span> chain of custody.
                </>
              }
            />
            <div {...stylex.props(styles.industryGrid)}>
              {industries.map((industry, i) => (
                <Reveal key={industry.title} delay={STAGGER * i} sx={styles.industryCard}>
                  <figure {...stylex.props(styles.figure)}>
                    <div {...stylex.props(styles.portraitFrame)}>
                      <img
                        src={industry.image.src}
                        alt={industry.image.alt}
                        loading="lazy"
                        decoding="async"
                        {...stylex.props(styles.portraitImg)}
                      />
                      <span aria-hidden {...stylex.props(styles.industryNumeral)}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <figcaption {...stylex.props(styles.caption)}>
                      Fig. {i + 2} — {industry.image.alt}.
                    </figcaption>
                  </figure>
                  <h3 {...stylex.props(styles.h3)}>{industry.title}</h3>
                  <p {...stylex.props(styles.prose)}>{industry.copy}</p>
                  <a href={createInquiryHref("industries")} {...stylex.props(styles.textLink)}>
                    Explore actives
                    <ArrowUpRight aria-hidden size={12} />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Pull quote ─────────────────────────────── */

function PullQuoteSpread() {
  return (
    <section aria-label="Pull quote">
      <div {...stylex.props(styles.container)}>
        <Reveal>
          <blockquote {...stylex.props(styles.pullQuote)}>
            <p {...stylex.props(styles.pullQuoteText)}>
              “Trust is argued with specifications, not adjectives.”
            </p>
            <cite {...stylex.props(styles.pullQuoteCite)}>— Fenchem quality charter</cite>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Chapter II — Portfolio ─────────────────────────────── */

function Portrait({ ingredient, index }: { ingredient: Ingredient; index: number }) {
  const [active, setActive] = useState(false);
  const division = divisionForApplication(ingredient.application);
  const on = () => setActive(true);
  const off = () => setActive(false);
  return (
    <Reveal delay={STAGGER * (index % 3)}>
      <article
        onPointerEnter={on}
        onPointerLeave={off}
        onFocus={on}
        onBlur={off}
        aria-label={`${ingredient.name}, ${ingredient.latin}`}
        {...stylex.props(styles.portrait)}
      >
        <div {...stylex.props(styles.ring, active && styles.ringActive)}>
          <img
            src={ingredient.image.src}
            alt={ingredient.image.alt}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.ringImg, active && styles.ringImgActive)}
          />
        </div>
        <span {...stylex.props(styles.techLabel, styles.portraitCode)}>
          {ingredient.code} · {String(index + 1).padStart(2, "0")} / 06
        </span>
        <h3 {...stylex.props(styles.portraitName, active && styles.portraitNameActive)}>
          {ingredient.name}
        </h3>
        <span {...stylex.props(styles.portraitLatin)}>{ingredient.latin}</span>
        <span {...stylex.props(styles.portraitSpec)}>{ingredient.purity}</span>
        <span {...stylex.props(styles.portraitDivision)}>
          <DivisionDot division={division} />
          {DIVISION_LABEL[division]}
        </span>
        <a href={createInquiryHref("industries")} {...stylex.props(styles.textLink)}>
          Spec sheet
          <ArrowUpRight aria-hidden size={12} />
        </a>
      </article>
    </Reveal>
  );
}

function PortfolioChapter() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.sectionGrid)}>
          <Folio label="Fenchem · Feature · Chapter II" />
          <div>
            <ChapterHead
              numeral={CHAPTERS[1]}
              eyebrow="Portfolio · six featured actives"
              id="portfolio-title"
              title={
                <>
                  Six actives, <span {...stylex.props(styles.italicGreen)}>specified</span> to the
                  decimal.
                </>
              }
            />
            <div {...stylex.props(styles.portfolioGrid)}>
              {FEATURED.map((ingredient, i) => (
                <Portrait key={ingredient.code} ingredient={ingredient} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Chapter III — Quality ─────────────────────────────── */

function QualityChapter() {
  return (
    <section
      id="quality"
      aria-labelledby="quality-title"
      {...stylex.props(styles.section, styles.hairlineTop)}
    >
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.sectionGrid)}>
          <Folio label="Fenchem · Feature · Chapter III" />
          <div>
            <ChapterHead
              numeral={CHAPTERS[2]}
              eyebrow="Quality · three pillars · six certifications"
              id="quality-title"
              title={
                <>
                  Identity, potency and stability,{" "}
                  <span {...stylex.props(styles.italic)}>validated</span> on every lot.
                </>
              }
            />
            <div {...stylex.props(styles.diptych)}>
              <Reveal sx={styles.leaf}>
                <ol {...stylex.props(styles.pillarList, styles.proseColumns)}>
                  {pillars.map((pillar, i) => (
                    <li key={pillar.title} {...stylex.props(styles.pillarItem)}>
                      <span {...stylex.props(styles.numeral)}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 {...stylex.props(styles.pillarTitle)}>{pillar.title}</h3>
                      <p {...stylex.props(styles.prose)}>{pillar.copy}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal delay={STAGGER} sx={styles.leafRight}>
                <p {...stylex.props(styles.eyebrow)} style={{ marginBottom: 16 }}>
                  Certifications
                </p>
                <table {...stylex.props(styles.certTable)}>
                  <caption
                    style={{
                      position: "absolute",
                      width: 1,
                      height: 1,
                      overflow: "hidden",
                      clip: "rect(0 0 0 0)",
                    }}
                  >
                    Quality certifications
                  </caption>
                  <tbody>
                    {certificationDetails.map((cert) => (
                      <tr key={cert.name} {...stylex.props(styles.certRow)}>
                        <td {...stylex.props(styles.certCellDot)}>
                          <span aria-hidden {...stylex.props(styles.certDot)} />
                        </td>
                        <th scope="row" {...stylex.props(styles.certCellName)}>
                          {cert.name}
                        </th>
                        <td {...stylex.props(styles.certCellSub)}>{cert.sub}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p {...stylex.props(styles.caption)} style={{ marginTop: 16 }}>
                  Response &lt; 24h · Documentation before sampling · Third-party verification on
                  request.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Chapter IV — Global ─────────────────────────────── */

function WorldMap() {
  return (
    <svg
      viewBox="500 140 1300 600"
      role="img"
      aria-label="Six Fenchem bases on a world map"
      {...stylex.props(styles.mapSvg)}
    >
      <path d={WORLD_PATH} fill="var(--color-mute-200)" fillRule="evenodd" />
      {REGION_POINTS.map(({ region, point }, i) => (
        <g key={region.city}>
          <circle
            cx={point.x}
            cy={point.y}
            r={i === 0 ? 8 : 6}
            fill="var(--color-brand-green-500)"
            stroke="var(--color-paper)"
            strokeWidth={2}
          />
          <text
            x={point.x + 14}
            y={point.y + 5}
            fontFamily="JetBrains Mono, ui-monospace, monospace"
            fontSize={15}
            letterSpacing={1.5}
            fill="var(--color-mute-700)"
          >
            {region.short.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

function GlobalChapter() {
  const halves = [regions.slice(0, 3), regions.slice(3)];
  return (
    <section
      id="global-supply"
      aria-labelledby="global-title"
      {...stylex.props(styles.section, styles.hairlineTop)}
    >
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.sectionGrid)}>
          <Folio label="Fenchem · Feature · Chapter IV" />
          <div>
            <ChapterHead
              numeral={CHAPTERS[3]}
              eyebrow="Global supply · six bases"
              id="global-title"
              title={
                <>
                  Sourced at origin, <span {...stylex.props(styles.italicGreen)}>traced</span> from
                  Nanjing.
                </>
              }
            />
            <div {...stylex.props(styles.diptych, styles.diptychTight)}>
              {halves.map((half, h) => (
                <Reveal key={h} delay={STAGGER * h} sx={h === 0 ? styles.leaf : styles.leafRight}>
                  <ul
                    aria-label={`Regions ${h + 1}`}
                    {...stylex.props(styles.regionList, h === 1 && styles.regionListSecond)}
                  >
                    {half.map((region, i) => (
                      <li key={region.city} {...stylex.props(styles.regionRow)}>
                        <span {...stylex.props(styles.regionIndex)}>
                          {String(h * 3 + i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p {...stylex.props(styles.regionCity)}>
                            {region.city}, {region.country}
                          </p>
                          <p {...stylex.props(styles.regionRole)}>{region.role}</p>
                        </div>
                        <span {...stylex.props(styles.regionCoords)}>{region.coords}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
            <Reveal delay={STAGGER * 2}>
              <figure {...stylex.props(styles.figure)} style={{ marginTop: 40 }}>
                <div {...stylex.props(styles.mapFrame)}>
                  <WorldMap />
                </div>
                <figcaption {...stylex.props(styles.caption)}>
                  Fig. 5 — Equirectangular plate, six bases on three continents; headquarters at{" "}
                  {company.hq.coords}.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Finale ─────────────────────────────── */

function FinaleSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" {...stylex.props(styles.finale)}>
      <div aria-hidden {...stylex.props(styles.finaleGlow)} />
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.finaleInner)}>
          <Reveal>
            <p {...stylex.props(styles.eyebrow, styles.finaleEyebrow)}>Back page · Contact</p>
          </Reveal>
          <Reveal delay={STAGGER}>
            <h2 id="contact-title" {...stylex.props(styles.display, styles.finaleTitle)}>
              Send us the target.{" "}
              <span {...stylex.props(styles.finaleItalic)}>We send the specification.</span>
            </h2>
          </Reveal>
          <Reveal delay={STAGGER * 2}>
            <div {...stylex.props(styles.finaleActions)}>
              <a href={createInquiryHref("contact")} {...stylex.props(styles.ctaPrimary)}>
                Request a specification
                <ArrowRight aria-hidden size={16} />
              </a>
              <a href={`mailto:${company.email}`} {...stylex.props(styles.finaleMail)}>
                {company.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={STAGGER * 3}>
            <div {...stylex.props(styles.finaleMeta)}>
              <span>Response &lt; 24h</span>
              <span>Documentation before sampling</span>
              <span>{company.legalName}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Colophon ─────────────────────────────── */

function Colophon() {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.colophonGrid)}>
          <div {...stylex.props(styles.colophonCol)}>
            <a
              href="#top"
              aria-label="Fenchem home"
              {...stylex.props(styles.brand)}
              style={{ justifySelf: "start" }}
            >
              <span {...stylex.props(styles.brandWord)}>FENCHEM</span>
              <Leaf aria-hidden strokeWidth={1.5} {...stylex.props(styles.brandLeaf)} />
            </a>
            <p {...stylex.props(styles.prose)}>{company.tagline}</p>
            <p {...stylex.props(styles.colophonMono)}>
              Issue 01 · {company.since} · {company.hq.city}
              <br />
              Set in Newsreader &amp; Plus Jakarta Sans
              <br />
              Seed {SEED_SHORT}
            </p>
          </div>
          <div {...stylex.props(styles.colophonCol)}>
            <h3 {...stylex.props(styles.colophonHead)}>Divisions</h3>
            <ul {...stylex.props(styles.colophonList)}>
              {DIVISION_ORDER.map((division) => (
                <li key={division} {...stylex.props(styles.colophonItem)}>
                  <DivisionDot division={division} />
                  {DIVISION_LABEL[division]}
                </li>
              ))}
            </ul>
          </div>
          <div {...stylex.props(styles.colophonCol)}>
            <h3 {...stylex.props(styles.colophonHead)}>Contact</h3>
            <ul {...stylex.props(styles.colophonList)}>
              <li>
                <a href={`mailto:${company.email}`} {...stylex.props(styles.footerLink)}>
                  {company.email}
                </a>
              </li>
              <li {...stylex.props(styles.colophonItem)}>{company.legalName}</li>
              <li {...stylex.props(styles.colophonItem)}>{company.hq.coords}</li>
            </ul>
          </div>
        </div>
        <div {...stylex.props(styles.footerBottom)}>
          <span>
            © <CurrentYear /> {company.legalName}
          </span>
          <span>Edition X · Folio</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── Page ─────────────────────────────── */

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

export function VariantX() {
  return (
    <LazyMotion features={domMax} strict>
      <LayoutGroup>
        <div {...stylex.props(styles.root)}>
          <SmoothScroll />
          <Masthead />
          <main>
            <CoverSpread />
            <IndustriesChapter />
            <PullQuoteSpread />
            <PortfolioChapter />
            <QualityChapter />
            <GlobalChapter />
            <FinaleSection />
          </main>
          <Colophon />
        </div>
      </LayoutGroup>
    </LazyMotion>
  );
}
