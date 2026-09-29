/*
 * PROTOTYPE — Variant Y: "Atlas · dark globe hero".
 *
 * Creative direction derived from a 96-character random seed
 * (`tr -dc 'A-Za-z0-9' </dev/urandom | head -c 96`):
 *
 *   ThR6AQsb5gYk6eh6e17UFB3apFDMugr0MGxYMeqlpxfAZ5xY1cAmCMsZyIQXNa8szMbdqlFwLTexGfVlwVybAGwEM13H2BgA
 *
 * What the string dictated:
 *   - `M` is the most frequent character (6×) and `A` the second (5×): wide,
 *     monumental capitals. Display type is Plus Jakarta Sans 800, uppercase,
 *     wide-tracked; Newsreader italic carries only the accent phrase and the
 *     big numerals.
 *   - `fAZ5` reads A–Z, so the ingredient portfolio is an alphabetical index
 *     with a letter rail — the only letters lit are the ones that have a
 *     specimen.
 *   - The digits open 6 5 6 6 (three sixes up front) and the longest
 *     lowercase run `eqlpxf` is six long: the page keeps a six-cell rhythm —
 *     stat band, division strip, certification strip and region strip are all
 *     six-cell hairline grids (six divisions, six bases, six certifications).
 *   - The lone `0` sits at character 31 ≈ ⅓: the dark moment comes early. The
 *     opening act is a full-viewport brand-green-950 atlas with arcs traced
 *     from Nanjing; everything after it is Clean White and the finale is light.
 *   - Th / Na / Te appear as element symbols; the specimen codes stay mono.
 *
 * Brand law carried over unchanged: green-led, blue interactive only, division
 * colors as wayfinding dots, hairline structure, Intro/Reveal + EASE + STAGGER.
 * Landing principle 6 (the globe is the centerpiece proof) is spent first.
 */
import { useEffect, useId, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
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
  industries,
  ingredients,
  navLinks,
  pillars,
  processSteps,
  regions,
  stats,
  toAnchor,
  type DivisionKey,
  type Ingredient,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Seed ─────────────────────────────── */

const SEED =
  "ThR6AQsb5gYk6eh6e17UFB3apFDMugr0MGxYMeqlpxfAZ5xY1cAmCMsZyIQXNa8szMbdqlFwLTexGfVlwVybAGwEM13H2BgA";
const SEED_SHORT = `${SEED.slice(0, 6)}…${SEED.slice(-4)}`;

const MD_ONLY = "@media (min-width: 768px) and (max-width: 1023.98px)";

/* ─────────────────────────────── Index ─────────────────────────────── */

const ALPHABET = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

const INDEXED = [...ingredients].sort((a, b) => a.name.localeCompare(b.name));

const LIT_LETTERS = new Set(INDEXED.map((i) => i.name[0]?.toUpperCase() ?? ""));

const DIVISION_LABEL: Record<DivisionKey, string> = {
  feed: "Feed",
  cosmetics: "Cosmetics",
  agro: "Agrochemical",
  food: "Food",
  chem: "Chemical",
  nutrition: "Nutrition",
};

const DIVISION_ORDER: DivisionKey[] = ["nutrition", "food", "cosmetics", "chem", "agro", "feed"];

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

function arcPath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const cy = my - dist * 0.22;
  return `M${from.x.toFixed(1)},${from.y.toFixed(1)} Q${mx.toFixed(1)},${cy.toFixed(1)} ${to.x.toFixed(1)},${to.y.toFixed(1)}`;
}

const REGION_POINTS = regions.map((region) => ({
  region,
  point: project(parseCoords(region.coords)),
}));

const HQ_POINT = REGION_POINTS[0]?.point ?? { x: 0, y: 0 };

/* ─────────────────────────────── Keyframes ─────────────────────────────── */

const marqueeAnim = stylex.keyframes({
  from: { transform: "translateX(0)" },
  to: { transform: "translateX(-50%)" },
});

const pingAnim = stylex.keyframes({
  "0%": { transform: "scale(1)", opacity: 0.8 },
  "100%": { transform: "scale(2.8)", opacity: 0 },
});

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
    maxWidth: 1480,
    marginInline: "auto",
    paddingInline: {
      default: 20,
      [breakpoints.md]: 40,
    },
  },
  containerFull: {
    width: "100%",
  },
  section: {
    paddingBlock: {
      default: 72,
      [MD_ONLY]: 96,
      [breakpoints.lg]: 120,
    },
  },
  sectionTight: {
    paddingBlock: {
      default: 48,
      [MD_ONLY]: 64,
      [breakpoints.lg]: 80,
    },
  },
  hairlineTop: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
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
  eyebrowOnDark: {
    color: colors.brandGreen400,
  },
  techLabel: {
    fontFamily: typography.tech,
    fontSize: 11,
    lineHeight: 1.4,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.mute600,
  },
  display: {
    margin: 0,
    fontFamily: typography.body,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    lineHeight: 0.98,
    color: colors.ink,
  },
  displayItalic: {
    fontFamily: typography.display,
    fontWeight: 400,
    fontStyle: "italic",
    textTransform: "none",
    letterSpacing: "-0.01em",
    color: colors.brandGreen600,
  },
  h2: {
    fontSize: "clamp(1.9rem, 3.6vw, 3.3rem)",
    maxWidth: "20ch",
  },
  serifItalic: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontWeight: 400,
  },
  lead: {
    margin: 0,
    fontSize: {
      default: 17,
      [breakpoints.md]: 19,
    },
    lineHeight: 1.6,
    color: colors.mute700,
    maxWidth: "58ch",
  },
  prose: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.65,
    color: colors.mute700,
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
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: 3,
  },
  ctaGhostDark: {
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
      default: colors.brandGreen400,
      ":hover": colors.brandGreen300,
    },
    backgroundColor: "transparent",
    color: colors.brandGreen300,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    transitionProperty: "border-color, transform",
    transitionDuration: "240ms",
    transform: {
      default: "scale(1)",
      ":active": "scale(0.97)",
    },
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen300}`,
    },
    outlineOffset: 3,
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
    transitionProperty: "border-color, transform",
    transitionDuration: "240ms",
    transform: {
      default: "scale(1)",
      ":active": "scale(0.97)",
    },
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: 3,
  },
  ctaCompact: {
    minHeight: 40,
    paddingInline: 18,
    paddingBlock: 8,
    fontSize: 13,
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

  /* Nav */
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 60,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    color: colors.paper,
    transitionProperty: "background-color, border-color, color",
    transitionDuration: "320ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  headerSolid: {
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottomColor: colors.line,
    color: colors.ink,
  },
  navRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    height: 64,
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: "inherit",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen500}`,
    },
    outlineOffset: 4,
  },
  brandWord: {
    fontFamily: typography.body,
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: "0.28em",
  },
  brandLeaf: {
    width: 16,
    height: 16,
    color: colors.brandGreen500,
  },
  navLinks: {
    display: {
      default: "none",
      [breakpoints.lg]: "flex",
    },
    alignItems: "center",
    gap: 32,
  },
  navLinkDark: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: {
      default: colors.brandGreen100,
      ":hover": colors.paper,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen500}`,
    },
    outlineOffset: 6,
  },
  navLinkSolid: {
    color: {
      default: colors.mute700,
      ":hover": colors.ink,
    },
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
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
    borderColor: "currentColor",
    backgroundColor: "transparent",
    color: "inherit",
    cursor: "pointer",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen500}`,
    },
  },
  mobilePanel: {
    display: {
      default: "block",
      [breakpoints.lg]: "none",
    },
    overflow: "hidden",
    backgroundColor: colors.paper,
    color: colors.ink,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
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
    fontFamily: typography.body,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    fontSize: 24,
    color: colors.ink,
    textDecoration: "none",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
  },

  /* Atlas hero */
  hero: {
    position: "relative",
    overflow: "hidden",
    minHeight: "100svh",
    display: "grid",
    alignContent: "center",
    backgroundColor: colors.brandGreen950,
    color: colors.paper,
    paddingTop: 120,
    paddingBottom: 120,
  },
  heroMapWrap: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: {
      default: "100%",
      [breakpoints.lg]: "66%",
    },
    opacity: {
      default: 0.55,
      [breakpoints.lg]: 1,
    },
    pointerEvents: "none",
  },
  heroMap: {
    width: "100%",
    height: "100%",
    display: "block",
  },
  heroScrim: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(90deg, rgba(3, 20, 6, 0.86) 0%, rgba(3, 20, 6, 0.55) 45%, rgba(3, 20, 6, 0.05) 100%)",
    pointerEvents: "none",
  },
  heroInner: {
    position: "relative",
    display: "grid",
    gap: 28,
    maxWidth: 880,
  },
  heroTitle: {
    fontSize: "clamp(2.8rem, 6.2vw, 6.5rem)",
    color: colors.paper,
  },
  heroTitleItalic: {
    display: "block",
    fontFamily: typography.display,
    fontWeight: 400,
    fontStyle: "italic",
    textTransform: "none",
    letterSpacing: "-0.015em",
    color: colors.brandGreen300,
  },
  heroLead: {
    margin: 0,
    fontSize: {
      default: 17,
      [breakpoints.md]: 19,
    },
    lineHeight: 1.6,
    color: colors.brandGreen100,
    maxWidth: "56ch",
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 4,
  },
  heroMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    marginTop: 8,
  },
  heroMetaItem: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.brandGreen400,
  },
  heroTicker: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    paddingBlock: 14,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.brandGreen800,
    backgroundColor: "rgba(3, 20, 6, 0.6)",
  },
  tickerTrack: {
    display: "flex",
    width: "max-content",
    animationName: marqueeAnim,
    animationDuration: "44s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationPlayState: {
      default: "running",
      [breakpoints.motionReduce]: "paused",
    },
  },
  tickerList: {
    display: "flex",
    flexShrink: 0,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  tickerItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 14,
    paddingInline: 22,
    whiteSpace: "nowrap",
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.brandGreen300,
  },
  tickerDot: {
    width: 6,
    height: 6,
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
  },
  pingRing: {
    transformOrigin: "center",
    transformBox: "fill-box",
    animationName: pingAnim,
    animationDuration: "2.6s",
    animationTimingFunction: "ease-out",
    animationIterationCount: "infinite",
    animationPlayState: {
      default: "running",
      [breakpoints.motionReduce]: "paused",
    },
  },

  /* Six-cell grids */
  sixGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [MD_ONLY]: "repeat(3, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(6, minmax(0, 1fr))",
    },
    gap: 1,
    backgroundColor: colors.line,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  cell: {
    backgroundColor: colors.paper,
    padding: {
      default: 18,
      [breakpoints.md]: 24,
    },
    display: "grid",
    gap: 8,
    alignContent: "start",
  },
  statValue: {
    fontFamily: typography.display,
    fontSize: {
      default: 34,
      [breakpoints.md]: 44,
    },
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
    color: colors.ink,
  },
  statLabel: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.45,
    color: colors.mute600,
  },
  cellIndex: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
  },
  cellTitle: {
    margin: 0,
    fontSize: 15,
    fontWeight: 700,
    color: colors.ink,
  },
  cellSub: {
    margin: 0,
    fontSize: 13,
    color: colors.mute600,
  },
  cellMono: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.1em",
    fontVariantNumeric: "tabular-nums",
    color: colors.mute600,
  },
  divisionCell: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    paddingBlock: 14,
    paddingInline: 18,
    backgroundColor: colors.paper,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: colors.mute700,
  },
  divisionIndex: {
    marginLeft: "auto",
    color: colors.mute500,
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
  certDot: {
    width: 8,
    height: 8,
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
    flexShrink: 0,
  },
  certName: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    fontWeight: 700,
    color: colors.ink,
  },

  /* Section header */
  sectionHead: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 20,
    alignItems: "end",
    marginBottom: {
      default: 36,
      [breakpoints.lg]: 56,
    },
  },
  sectionHeadMain: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "1 / span 8",
    },
    display: "grid",
    gap: 16,
  },
  sectionHeadAside: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "10 / span 3",
    },
    display: "grid",
    gap: 12,
    justifyItems: {
      default: "start",
      [breakpoints.lg]: "end",
    },
    textAlign: {
      default: "left",
      [breakpoints.lg]: "right",
    },
  },
  ordinal: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 14,
    color: colors.brandGreen700,
  },

  /* A–Z index */
  rail: {
    display: "flex",
    flexWrap: "wrap",
    gap: {
      default: 6,
      [breakpoints.md]: 10,
    },
    listStyle: "none",
    margin: 0,
    padding: 0,
    marginBottom: 24,
  },
  railLetter: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    fontFamily: typography.tech,
    fontSize: 12,
    color: colors.mute400,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    textDecoration: "none",
  },
  railLetterLit: {
    color: colors.brandGreen700,
    borderBottomColor: colors.brandGreen500,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
    outlineOffset: 2,
  },
  indexGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 32,
    alignItems: "start",
  },
  indexList: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "1 / span 8",
    },
    listStyle: "none",
    margin: 0,
    padding: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  indexRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "40px 56px minmax(0, 1fr)",
      [breakpoints.lg]: "48px minmax(0, 1.5fr) 88px minmax(0, 1.4fr) 128px auto",
    },
    columnGap: {
      default: 12,
      [breakpoints.lg]: 20,
    },
    alignItems: "center",
    paddingBlock: 16,
    paddingLeft: {
      default: 8,
      ":hover": 14,
    },
    paddingRight: 8,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    borderLeftWidth: 2,
    borderLeftStyle: "solid",
    borderLeftColor: "transparent",
    transitionProperty: "background-color, border-color, padding-left",
    transitionDuration: "240ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  indexRowActive: {
    backgroundColor: colors.brandGreen50,
    borderLeftColor: colors.brandGreen500,
    paddingLeft: 14,
  },
  indexLetter: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: {
      default: 24,
      [breakpoints.lg]: 30,
    },
    lineHeight: 1,
    color: colors.brandGreen700,
  },
  indexThumb: {
    display: {
      default: "block",
      [breakpoints.lg]: "none",
    },
    width: 56,
    height: 56,
    objectFit: "cover",
    borderRadius: radii.sm,
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
  },
  indexMain: {
    display: "grid",
    gap: 2,
    minWidth: 0,
  },
  indexName: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: colors.ink,
    lineHeight: 1.3,
  },
  indexLatin: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 15,
    color: colors.mute600,
  },
  indexCode: {
    display: {
      default: "none",
      [breakpoints.lg]: "block",
    },
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.1em",
    color: colors.mute600,
  },
  indexSpec: {
    display: {
      default: "none",
      [breakpoints.lg]: "grid",
    },
    gap: 2,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.06em",
    fontVariantNumeric: "tabular-nums",
    color: colors.mute700,
  },
  indexDivision: {
    display: {
      default: "none",
      [breakpoints.lg]: "inline-flex",
    },
    alignItems: "center",
    gap: 8,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: colors.mute600,
  },
  indexMobileMeta: {
    display: {
      default: "flex",
      [breakpoints.lg]: "none",
    },
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.08em",
    color: colors.mute600,
  },
  indexLinkCell: {
    justifySelf: "end",
  },
  preview: {
    display: {
      default: "none",
      [breakpoints.lg]: "block",
    },
    gridColumn: "9 / span 4",
    position: "sticky",
    top: 96,
  },
  previewFigure: {
    position: "relative",
    margin: 0,
    aspectRatio: "4 / 5",
    overflow: "hidden",
    borderRadius: radii.sm,
    backgroundColor: colors.mute100,
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
  },
  previewImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "420ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  previewImgActive: {
    opacity: 1,
  },
  previewCaption: {
    display: "grid",
    gap: 4,
    paddingTop: 14,
  },
  previewLetter: {
    position: "absolute",
    left: 16,
    top: 12,
    paddingInline: 10,
    paddingBlock: 6,
    borderRadius: radii.sm,
    backgroundColor: colors.paper,
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 22,
    lineHeight: 1,
    color: colors.brandGreen700,
  },

  /* Industries */
  industryGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 40,
  },
  industryCard: {
    display: "grid",
    gap: 16,
  },
  industryFigure: {
    position: "relative",
    margin: 0,
    aspectRatio: "3 / 2",
    overflow: "hidden",
    borderRadius: radii.sm,
    backgroundColor: colors.mute100,
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
  },
  industryImg: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transitionProperty: "transform",
    transitionDuration: "900ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transform: {
      default: "scale(1)",
      ":hover": "scale(1.04)",
    },
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
    fontSize: 22,
    lineHeight: 1,
    color: colors.brandGreen700,
  },
  industryTitle: {
    margin: 0,
    fontFamily: typography.body,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    fontSize: 18,
    lineHeight: 1.2,
    color: colors.ink,
  },

  /* Quality */
  pillarGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    gap: 1,
    backgroundColor: colors.line,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    marginBottom: 1,
  },
  pillarCell: {
    display: "grid",
    gap: 12,
    alignContent: "start",
    padding: {
      default: 24,
      [breakpoints.md]: 32,
    },
    minHeight: 200,
    backgroundColor: colors.paper,
  },
  pillarTitle: {
    margin: 0,
    fontFamily: typography.body,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.03em",
    fontSize: 17,
    lineHeight: 1.25,
    color: colors.ink,
  },
  processRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [MD_ONLY]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(4, minmax(0, 1fr))",
    },
    listStyle: "none",
    margin: 0,
    padding: 0,
    columnGap: 24,
    rowGap: 28,
    marginTop: {
      default: 40,
      [breakpoints.lg]: 64,
    },
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  processStep: {
    display: "grid",
    gap: 10,
    alignContent: "start",
  },
  processTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    color: colors.ink,
  },

  /* Finale (light) */
  finale: {
    backgroundColor: colors.brandGreen50,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.brandGreen100,
  },
  finaleGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 40,
    alignItems: "end",
  },
  finaleMain: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "1 / span 8",
    },
    display: "grid",
    gap: 28,
  },
  finaleAside: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "10 / span 3",
    },
    display: "grid",
    gap: 12,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: colors.brandGreen700,
  },
  finaleTitle: {
    margin: 0,
    fontFamily: typography.display,
    fontWeight: 400,
    fontStyle: "italic",
    fontSize: "clamp(2.4rem, 5.2vw, 4.8rem)",
    lineHeight: 1.04,
    letterSpacing: "-0.02em",
    color: colors.ink,
    maxWidth: "18ch",
  },
  finaleTitleUpright: {
    fontStyle: "normal",
    fontFamily: typography.body,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    fontSize: "0.72em",
    color: colors.brandGreen700,
  },
  finaleActions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 20,
  },
  finaleMail: {
    fontFamily: typography.tech,
    fontSize: 12,
    letterSpacing: "0.12em",
    color: colors.brandBlue700,
    textDecoration: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: {
      default: "transparent",
      ":hover": colors.brandBlue700,
    },
    paddingBottom: 2,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: 4,
  },
  finaleRule: {
    height: 1,
    backgroundColor: colors.brandGreen200,
  },

  /* Footer */
  footer: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: 56,
    paddingBottom: 32,
    overflow: "hidden",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [MD_ONLY]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 32,
  },
  footerIntro: {
    gridColumn: {
      default: "auto",
      [MD_ONLY]: "1 / span 2",
      [breakpoints.lg]: "1 / span 4",
    },
    display: "grid",
    gap: 12,
    alignContent: "start",
    color: colors.ink,
  },
  footerCol: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 3",
    },
    display: "grid",
    gap: 12,
    alignContent: "start",
  },
  footerColLast: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "11 / span 2",
    },
  },
  footerHead: {
    margin: 0,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.mute600,
  },
  footerList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 8,
  },
  footerItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    color: colors.mute700,
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
  ghostWord: {
    marginTop: 64,
    marginBottom: 24,
    fontFamily: typography.body,
    fontWeight: 800,
    fontSize: "clamp(4.5rem, 20.4vw, 20.4rem)",
    lineHeight: 0.85,
    letterSpacing: "-0.04em",
    color: "transparent",
    WebkitTextStroke: `1px ${colors.line}`,
    userSelect: "none",
    whiteSpace: "nowrap",
  },
  footerBottom: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 20,
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

/* ─────────────────────────────── Nav ─────────────────────────────── */

function NavBar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const panelId = useId();

  useMotionValueEvent(scrollY, "change", (value) => {
    setSolid(value > 40);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [{ label: "Index", href: "#index" }].concat(
    navLinks.map((link) => ({ label: link.label, href: toAnchor(link.section) })),
  );
  const onLight = solid || open;

  return (
    <header {...stylex.props(styles.header, onLight && styles.headerSolid)}>
      <div {...stylex.props(styles.container)}>
        <nav aria-label="Primary navigation" {...stylex.props(styles.navRow)}>
          <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brand)}>
            <span {...stylex.props(styles.brandWord)}>FENCHEM</span>
            <Leaf aria-hidden strokeWidth={1.5} {...stylex.props(styles.brandLeaf)} />
          </a>
          <div {...stylex.props(styles.navLinks)}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...stylex.props(styles.navLinkDark, onLight && styles.navLinkSolid)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div {...stylex.props(styles.navRight)}>
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
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.36, ease: EASE }}
            {...stylex.props(styles.mobilePanel)}
          >
            <div {...stylex.props(styles.container)}>
              <ul {...stylex.props(styles.mobileList)}>
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      {...stylex.props(styles.mobileLink)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={createInquiryHref("contact")}
                    onClick={() => setOpen(false)}
                    {...stylex.props(styles.ctaPrimary)}
                  >
                    Request a specification
                    <ArrowRight aria-hidden size={14} />
                  </a>
                </li>
              </ul>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────────────── Atlas hero ─────────────────────────────── */

function AtlasMap() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden {...stylex.props(styles.heroMapWrap)}>
      <svg
        viewBox="540 150 1200 560"
        preserveAspectRatio="xMidYMid meet"
        {...stylex.props(styles.heroMap)}
      >
        <path d={WORLD_PATH} fill="var(--color-brand-green-900)" fillRule="evenodd" />
        {REGION_POINTS.slice(1).map(({ region, point }, i) => (
          <m.path
            key={region.city}
            d={arcPath(HQ_POINT, point)}
            fill="none"
            stroke="var(--color-brand-green-500)"
            strokeWidth={2}
            strokeDasharray="6 8"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: reduce ? 0 : 1.8,
              delay: reduce ? 0 : 0.5 + i * 0.14,
              ease: EASE,
            }}
          />
        ))}
        {REGION_POINTS.map(({ region, point }, i) => {
          const isHq = i === 0;
          return (
            <g key={region.city}>
              {isHq ? (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={12}
                  fill="var(--color-brand-green-400)"
                  opacity={0.5}
                  {...stylex.props(styles.pingRing)}
                />
              ) : null}
              <circle
                cx={point.x}
                cy={point.y}
                r={isHq ? 8 : 6}
                fill="var(--color-brand-green-400)"
                stroke="var(--color-brand-green-950)"
                strokeWidth={2.5}
              />
              <text
                x={point.x > 1560 ? point.x - 16 : point.x + 16}
                y={point.y + 6}
                textAnchor={point.x > 1560 ? "end" : "start"}
                fontFamily="JetBrains Mono, ui-monospace, monospace"
                fontSize={17}
                letterSpacing={2}
                fill="var(--color-brand-green-300)"
              >
                {region.short.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function HeroTicker() {
  const items = regions.map((region) => (
    <li key={region.city} {...stylex.props(styles.tickerItem)}>
      <span aria-hidden {...stylex.props(styles.tickerDot)} />
      <span>{region.short}</span>
      <span>{region.city}</span>
      <span>{region.coords}</span>
    </li>
  ));
  return (
    <div aria-label="Fenchem bases" {...stylex.props(styles.heroTicker)}>
      <div {...stylex.props(styles.tickerTrack)}>
        <ul {...stylex.props(styles.tickerList)}>{items}</ul>
        <ul aria-hidden {...stylex.props(styles.tickerList)}>
          {items}
        </ul>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section id="top" aria-label="Introduction" {...stylex.props(styles.hero)}>
      <AtlasMap />
      <div aria-hidden {...stylex.props(styles.heroScrim)} />
      <div {...stylex.props(styles.container, styles.containerFull)}>
        <div {...stylex.props(styles.heroInner)}>
          <Reveal margin="0px">
            <p {...stylex.props(styles.eyebrow, styles.eyebrowOnDark)}>
              Botanical intelligence since 1995 · six bases · three continents
            </p>
          </Reveal>
          <Reveal delay={STAGGER} margin="0px">
            <h1 {...stylex.props(styles.display, styles.heroTitle)}>
              Rooted in nature,
              <span {...stylex.props(styles.heroTitleItalic)}>refined by science.</span>
            </h1>
          </Reveal>
          <Reveal delay={STAGGER * 2} margin="0px">
            <p {...stylex.props(styles.heroLead)}>
              Standardized botanical actives sourced at origin and traced from Nanjing — supplied
              with dossiers, assays and lead times held locally in more than forty countries.
            </p>
          </Reveal>
          <Reveal delay={STAGGER * 3} margin="0px">
            <div {...stylex.props(styles.heroActions)}>
              <a href="#index" {...stylex.props(styles.ctaPrimary)}>
                Open the A–Z index
                <ArrowRight aria-hidden size={16} />
              </a>
              <a href={createInquiryHref("contact")} {...stylex.props(styles.ctaGhostDark)}>
                Request a specification
              </a>
            </div>
          </Reveal>
          <Reveal delay={STAGGER * 4} margin="0px">
            <div {...stylex.props(styles.heroMeta)}>
              <span {...stylex.props(styles.heroMetaItem)}>ISO 9001 · GMP · FSSC 22000</span>
              <span {...stylex.props(styles.heroMetaItem)}>Response &lt; 24h</span>
              <span {...stylex.props(styles.heroMetaItem)}>{company.hq.coords}</span>
            </div>
          </Reveal>
        </div>
      </div>
      <HeroTicker />
    </section>
  );
}

/* ─────────────────────────────── Stat band ─────────────────────────────── */

function StatBand() {
  const cells = stats
    .map((stat) => ({ value: stat.value, label: stat.label }))
    .concat([
      { value: "1995", label: `${company.legalName} founded in ${company.hq.city}` },
      { value: "N 32°", label: `Headquarters at ${company.hq.coords}` },
    ]);
  return (
    <section aria-label="Key figures" {...stylex.props(styles.sectionTight)}>
      <div {...stylex.props(styles.container)}>
        <Reveal>
          <dl {...stylex.props(styles.sixGrid)}>
            {cells.map((cell) => (
              <div key={cell.label} {...stylex.props(styles.cell)}>
                <dt {...stylex.props(styles.statValue)}>{cell.value}</dt>
                <dd {...stylex.props(styles.statLabel)}>{cell.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Section header ─────────────────────────────── */

function SectionHead({
  ordinal,
  eyebrow,
  title,
  aside,
}: {
  ordinal: string;
  eyebrow: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div {...stylex.props(styles.sectionHead)}>
      <div {...stylex.props(styles.sectionHeadMain)}>
        <Reveal>
          <p {...stylex.props(styles.eyebrow)}>
            <span {...stylex.props(styles.ordinal)}>{ordinal}</span> — {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={STAGGER}>
          <h2 {...stylex.props(styles.display, styles.h2)}>{title}</h2>
        </Reveal>
      </div>
      {aside ? (
        <Reveal delay={STAGGER * 2} sx={styles.sectionHeadAside}>
          {aside}
        </Reveal>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────── A–Z index ─────────────────────────────── */

function IndexRow({
  ingredient,
  active,
  onActivate,
}: {
  ingredient: Ingredient;
  active: boolean;
  onActivate: () => void;
}) {
  const division = divisionForApplication(ingredient.application);
  const letter = ingredient.name[0]?.toUpperCase() ?? "";
  return (
    <li
      id={`az-${letter}-${ingredient.code}`}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      {...stylex.props(styles.indexRow, active && styles.indexRowActive)}
    >
      <span aria-hidden {...stylex.props(styles.indexLetter)}>
        {letter}
      </span>
      <img
        src={ingredient.image.src}
        alt=""
        loading="lazy"
        decoding="async"
        {...stylex.props(styles.indexThumb)}
      />
      <div {...stylex.props(styles.indexMain)}>
        <h3 {...stylex.props(styles.indexName)}>{ingredient.name}</h3>
        <span {...stylex.props(styles.indexLatin)}>{ingredient.latin}</span>
        <div {...stylex.props(styles.indexMobileMeta)}>
          <span>{ingredient.code}</span>
          <span>{ingredient.purity}</span>
          <a href={createInquiryHref("industries")} {...stylex.props(styles.textLink)}>
            Spec
            <ArrowUpRight aria-hidden size={12} />
          </a>
        </div>
      </div>
      <span {...stylex.props(styles.indexCode)}>{ingredient.code}</span>
      <div {...stylex.props(styles.indexSpec)}>
        <span>{ingredient.purity}</span>
        <span>{ingredient.form}</span>
      </div>
      <span {...stylex.props(styles.indexDivision)}>
        <DivisionDot division={division} />
        {DIVISION_LABEL[division]}
      </span>
      <span {...stylex.props(styles.indexCode, styles.indexLinkCell)}>
        <a href={createInquiryHref("industries")} {...stylex.props(styles.textLink)}>
          Spec
          <ArrowUpRight aria-hidden size={12} />
        </a>
      </span>
    </li>
  );
}

function IndexSection() {
  const [active, setActive] = useState(0);
  const current = INDEXED[active] ?? INDEXED[0];
  return (
    <section
      id="index"
      aria-labelledby="index-title"
      {...stylex.props(styles.section, styles.hairlineTop)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHead
          ordinal="01"
          eyebrow="A–Z index · 08 specimens"
          title={
            <span id="index-title">
              The portfolio, <span {...stylex.props(styles.displayItalic)}>alphabetically</span>{" "}
              specified.
            </span>
          }
          aside={
            <>
              <p {...stylex.props(styles.prose)}>
                Every entry carries its assay, format and a dossier prepared before sampling.
              </p>
              <a href={createInquiryHref("industries")} {...stylex.props(styles.textLink)}>
                Full portfolio
                <ArrowUpRight aria-hidden size={12} />
              </a>
            </>
          }
        />
        <Reveal>
          <ul aria-label="Letter rail" {...stylex.props(styles.rail)}>
            {ALPHABET.map((letter) => {
              const lit = LIT_LETTERS.has(letter);
              const first = INDEXED.find((i) => i.name[0]?.toUpperCase() === letter);
              return (
                <li key={letter}>
                  {lit && first ? (
                    <a
                      href={`#az-${letter}-${first.code}`}
                      {...stylex.props(styles.railLetter, styles.railLetterLit)}
                    >
                      {letter}
                    </a>
                  ) : (
                    <span aria-hidden {...stylex.props(styles.railLetter)}>
                      {letter}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
        <div {...stylex.props(styles.indexGrid)}>
          <Reveal delay={STAGGER} sx={styles.indexList}>
            <ul
              aria-label="Ingredients A to Z"
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {INDEXED.map((ingredient, i) => (
                <IndexRow
                  key={ingredient.code}
                  ingredient={ingredient}
                  active={active === i}
                  onActivate={() => setActive(i)}
                />
              ))}
            </ul>
          </Reveal>
          <Reveal delay={STAGGER * 2} sx={styles.preview}>
            <figure {...stylex.props(styles.previewFigure)}>
              {INDEXED.map((ingredient, i) => (
                <img
                  key={ingredient.code}
                  src={ingredient.image.src}
                  alt={i === active ? ingredient.image.alt : ""}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(styles.previewImg, i === active && styles.previewImgActive)}
                />
              ))}
              <span aria-hidden {...stylex.props(styles.previewLetter)}>
                {current?.name[0]?.toUpperCase()}
              </span>
            </figure>
            <div {...stylex.props(styles.previewCaption)}>
              <span {...stylex.props(styles.techLabel)}>
                {current?.code} · {current?.category}
              </span>
              <span {...stylex.props(styles.indexName)}>{current?.name}</span>
              <span {...stylex.props(styles.indexLatin)}>{current?.latin}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Divisions + industries ─────────────────────────────── */

function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-title"
      {...stylex.props(styles.section, styles.hairlineTop)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHead
          ordinal="02"
          eyebrow="Industries · 03 markets · 06 divisions"
          title={
            <span id="industries-title">
              Three markets, <span {...stylex.props(styles.displayItalic)}>one</span> chain of
              custody.
            </span>
          }
          aside={
            <p {...stylex.props(styles.prose)}>
              Standardized for potency, stability and dose accuracy — from field to finished
              extract.
            </p>
          }
        />
        <div {...stylex.props(styles.industryGrid)}>
          {industries.map((industry, i) => (
            <Reveal key={industry.title} delay={STAGGER * i} sx={styles.industryCard}>
              <figure {...stylex.props(styles.industryFigure)}>
                <img
                  src={industry.image.src}
                  alt={industry.image.alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(styles.industryImg)}
                />
                <figcaption {...stylex.props(styles.industryNumeral)}>
                  {String(i + 1).padStart(2, "0")}
                </figcaption>
              </figure>
              <h3 {...stylex.props(styles.industryTitle)}>{industry.title}</h3>
              <p {...stylex.props(styles.prose)}>{industry.copy}</p>
              <a href={createInquiryHref("industries")} {...stylex.props(styles.textLink)}>
                Explore actives
                <ArrowUpRight aria-hidden size={12} />
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={STAGGER * 3}>
          <ul aria-label="Divisions" {...stylex.props(styles.sixGrid)} style={{ marginTop: 48 }}>
            {DIVISION_ORDER.map((division, i) => (
              <li key={division} {...stylex.props(styles.divisionCell)}>
                <DivisionDot division={division} />
                {DIVISION_LABEL[division]}
                <span {...stylex.props(styles.divisionIndex)}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Quality ─────────────────────────────── */

function QualitySection() {
  return (
    <section
      id="quality"
      aria-labelledby="quality-title"
      {...stylex.props(styles.section, styles.hairlineTop)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHead
          ordinal="03"
          eyebrow="Quality · 03 pillars · 06 certifications"
          title={
            <span id="quality-title">
              Trust is argued with{" "}
              <span {...stylex.props(styles.displayItalic)}>specifications</span>, not adjectives.
            </span>
          }
          aside={
            <p {...stylex.props(styles.prose)}>
              Identity, potency and stability validated on every lot; third-party verification on
              request.
            </p>
          }
        />
        <Reveal>
          <div {...stylex.props(styles.pillarGrid)}>
            {pillars.map((pillar, i) => (
              <div key={pillar.title} {...stylex.props(styles.pillarCell)}>
                <span {...stylex.props(styles.ordinal)} style={{ fontSize: 22 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 {...stylex.props(styles.pillarTitle)}>{pillar.title}</h3>
                <p {...stylex.props(styles.prose)}>{pillar.copy}</p>
              </div>
            ))}
          </div>
          <ul aria-label="Certifications" {...stylex.props(styles.sixGrid)}>
            {certificationDetails.map((cert) => (
              <li key={cert.name} {...stylex.props(styles.cell)}>
                <span {...stylex.props(styles.certName)}>
                  <span aria-hidden {...stylex.props(styles.certDot)} />
                  {cert.name}
                </span>
                <span {...stylex.props(styles.techLabel)}>{cert.sub}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <ol aria-label="Process" {...stylex.props(styles.processRow)}>
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={STAGGER * i} sx={styles.processStep}>
              <span {...stylex.props(styles.cellIndex)}>Step {String(i + 1).padStart(2, "0")}</span>
              <h3 {...stylex.props(styles.processTitle)}>{step.title}</h3>
              <p {...stylex.props(styles.prose)}>{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Global supply (light) ─────────────────────────────── */

function GlobalSection() {
  return (
    <section
      id="global-supply"
      aria-labelledby="global-title"
      {...stylex.props(styles.section, styles.hairlineTop)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHead
          ordinal="04"
          eyebrow="Global supply · 06 bases"
          title={
            <span id="global-title">
              Sourced at origin, <span {...stylex.props(styles.displayItalic)}>traced</span> from
              Nanjing.
            </span>
          }
          aside={
            <p {...stylex.props(styles.prose)}>
              Documentation, compliance and lead times are held locally on three continents.
            </p>
          }
        />
        <Reveal>
          <ul aria-label="Regions" {...stylex.props(styles.sixGrid)}>
            {regions.map((region, i) => (
              <li key={region.city} {...stylex.props(styles.cell)}>
                <span {...stylex.props(styles.cellIndex)}>
                  {String(i + 1).padStart(2, "0")} · {region.short}
                </span>
                <h3 {...stylex.props(styles.cellTitle)}>{region.city}</h3>
                <p {...stylex.props(styles.cellSub)}>
                  {region.country} · {region.role}
                </p>
                <span {...stylex.props(styles.cellMono)}>{region.coords}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Finale (light) ─────────────────────────────── */

function FinaleSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      {...stylex.props(styles.section, styles.finale)}
    >
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.finaleGrid)}>
          <div {...stylex.props(styles.finaleMain)}>
            <Reveal>
              <p {...stylex.props(styles.eyebrow)}>
                <span {...stylex.props(styles.ordinal)}>05</span> — Contact
              </p>
            </Reveal>
            <Reveal delay={STAGGER}>
              <h2 id="contact-title" {...stylex.props(styles.finaleTitle)}>
                Send us the target.{" "}
                <span {...stylex.props(styles.finaleTitleUpright)}>We send the specification.</span>
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
          </div>
          <Reveal delay={STAGGER * 3} sx={styles.finaleAside}>
            <span>Response &lt; 24h</span>
            <span {...stylex.props(styles.finaleRule)} />
            <span>Documentation before sampling</span>
            <span {...stylex.props(styles.finaleRule)} />
            <span>{company.legalName}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Footer ─────────────────────────────── */

function FooterSection() {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.footerGrid)}>
          <div {...stylex.props(styles.footerIntro)}>
            <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brand)}>
              <span {...stylex.props(styles.brandWord)}>FENCHEM</span>
              <Leaf aria-hidden strokeWidth={1.5} {...stylex.props(styles.brandLeaf)} />
            </a>
            <p {...stylex.props(styles.prose)}>{company.tagline}</p>
            <span {...stylex.props(styles.techLabel)}>
              {company.since} · {company.hq.city}
            </span>
          </div>
          <div {...stylex.props(styles.footerCol)}>
            <h3 {...stylex.props(styles.footerHead)}>Divisions</h3>
            <ul {...stylex.props(styles.footerList)}>
              {DIVISION_ORDER.map((division) => (
                <li key={division} {...stylex.props(styles.footerItem)}>
                  <DivisionDot division={division} />
                  {DIVISION_LABEL[division]}
                </li>
              ))}
            </ul>
          </div>
          <div {...stylex.props(styles.footerCol)}>
            <h3 {...stylex.props(styles.footerHead)}>Bases</h3>
            <ul {...stylex.props(styles.footerList)}>
              {regions.map((region) => (
                <li key={region.city} {...stylex.props(styles.footerItem)}>
                  {region.city}
                  <span {...stylex.props(styles.techLabel)}>{region.short}</span>
                </li>
              ))}
            </ul>
          </div>
          <div {...stylex.props(styles.footerCol, styles.footerColLast)}>
            <h3 {...stylex.props(styles.footerHead)}>Contact</h3>
            <ul {...stylex.props(styles.footerList)}>
              <li>
                <a href={`mailto:${company.email}`} {...stylex.props(styles.footerLink)}>
                  {company.email}
                </a>
              </li>
              <li {...stylex.props(styles.footerItem)}>{company.hq.coords}</li>
            </ul>
          </div>
        </div>
        <div aria-hidden {...stylex.props(styles.ghostWord)}>
          FENCHEM
        </div>
        <div {...stylex.props(styles.footerBottom)}>
          <span>
            © {new Date().getFullYear()} {company.legalName}
          </span>
          <span>Edition Y · seed {SEED_SHORT}</span>
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

export function VariantY() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        <SmoothScroll />
        <NavBar />
        <main>
          <HeroSection />
          <StatBand />
          <IndexSection />
          <IndustriesSection />
          <QualitySection />
          <GlobalSection />
          <FinaleSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
