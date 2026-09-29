/*
 * PROTOTYPE — Variant T: "Chevron · kinetic poster".
 *
 * Creative direction derived from a 96-character random seed
 * (`tr -dc 'A-Za-z0-9' </dev/urandom | head -c 96`):
 *
 *   ehvVxOx5IVP23jXt2Zy9pJtzUYOGBJYbSyNp94GpYXpLoaVyFeadVHDbmeVu0xPYR2V0riMPNfRkaVmVf4eoC3ttHoO6Qyq4
 *
 * What the string dictated:
 *   - `V` is the most frequent character (8×) → the V is the motif: a diagonal
 *     "V cut" seam in the hero, chevron separators, a `V` glyph breaking every
 *     section hairline, and "vitality" as the one italic phrase.
 *   - Exactly 41 upper / 41 lower case → the hero is a true 50/50 split.
 *   - Palindromes `xOx` and `VmV` → chapters mirror: image-left/text-right,
 *     then text-left/image-right, and back again.
 *   - 42 case flips, the jitteriest seed → kinetic: the headline enters word by
 *     word, chapters slide in from their own side, a chevron marquee runs.
 *   - Two zeros at chars 60 and 67 (≈ 62% and 70%) → two inverted
 *     brand-green-950 beats: the stat band and the contact finale.
 *   - Opens quietly in lowercase `ehv` → the eyebrow, not the headline, is the
 *     first thing to appear.
 *
 * Brand law carried over unchanged: Clean White canvas, green-led, blue only
 * interactive, hairline structure, division colours as wayfinding dots, one
 * gradient (the finale glow), Intro/Reveal + EASE + STAGGER only. Corners are
 * sharp (radii.none) except pill chips.
 */
import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronRight, ChevronsDown, Leaf, Menu, X } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
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
  "ehvVxOx5IVP23jXt2Zy9pJtzUYOGBJYbSyNp94GpYXpLoaVyFeadVHDbmeVu0xPYR2V0riMPNfRkaVmVf4eoC3ttHoO6Qyq4";
const SEED_SHORT = `${SEED.slice(0, 6)}…${SEED.slice(-4)}`;

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

/** Headline words; the italic one is the seed's `V`. */
const HEADLINE: { word: string; italic?: boolean }[] = [
  { word: "Nurturing" },
  { word: "vitality", italic: true },
  { word: "through" },
  { word: "botanical" },
  { word: "excellence" },
];

/* Staircase for the six regions: x offsets in a 1000-wide SVG plane. */
const STAIR_STEP = 60;

/* ─────────────────────────────── Keyframes ─────────────────────────────── */

const marqueeAnim = stylex.keyframes({
  from: { transform: "translateX(0)" },
  to: { transform: "translateX(-50%)" },
});

/* ─────────────────────────────── Styles ─────────────────────────────── */

const MD_ONLY = "@media (min-width: 768px) and (max-width: 1023.98px)";

const styles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    color: colors.ink,
    fontFamily: typography.body,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    overflowX: "clip",
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
  section: {
    paddingBlock: {
      default: 64,
      [MD_ONLY]: 88,
      [breakpoints.lg]: 112,
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
    lineHeight: 1.4,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.mute600,
  },
  poster: {
    margin: 0,
    fontFamily: typography.body,
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 0.94,
    textTransform: "uppercase",
    color: colors.ink,
  },
  posterItalic: {
    fontFamily: typography.display,
    fontWeight: 400,
    fontStyle: "italic",
    textTransform: "none",
    letterSpacing: "-0.02em",
    color: colors.brandGreen600,
  },
  h2: {
    fontSize: "clamp(2.2rem, 4.6vw, 4.4rem)",
    maxWidth: "14ch",
  },
  lead: {
    margin: 0,
    fontSize: {
      default: 17,
      [breakpoints.md]: 19,
    },
    lineHeight: 1.6,
    color: colors.mute700,
    maxWidth: "52ch",
  },
  prose: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.65,
    color: colors.mute700,
  },
  numeral: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 22,
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
    borderRadius: radii.none,
    borderWidth: 0,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    color: colors.brandGreen950,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.02em",
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
  ctaOutline: {
    display: "inline-flex",
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingInline: 22,
    paddingBlock: 12,
    borderRadius: radii.none,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: colors.ink,
      ":hover": colors.brandBlue700,
    },
    backgroundColor: "transparent",
    color: {
      default: colors.ink,
      ":hover": colors.brandBlue700,
    },
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.02em",
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "border-color, color, transform",
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
    position: "sticky",
    top: 0,
    zIndex: 60,
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.ink,
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
    color: colors.ink,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
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
    color: colors.brandGreen600,
  },
  navLinks: {
    display: {
      default: "none",
      [breakpoints.lg]: "flex",
    },
    alignItems: "center",
    gap: 28,
  },
  navLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
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
    borderRadius: radii.none,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.ink,
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
    display: "flex",
    alignItems: "center",
    gap: 10,
    paddingBlock: 12,
    fontFamily: typography.body,
    fontWeight: 800,
    fontSize: 26,
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
    color: colors.ink,
    textDecoration: "none",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
  },
  progress: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,
    height: 2,
    backgroundColor: colors.brandGreen500,
    transformOrigin: "0 50%",
  },

  /* Hero */
  hero: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.ink,
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "1fr 1fr",
    },
    minHeight: {
      default: "auto",
      [breakpoints.lg]: "calc(100svh - 65px)",
    },
  },
  heroLeft: {
    display: "grid",
    alignContent: "center",
    gap: 28,
    paddingBlock: {
      default: 56,
      [breakpoints.lg]: 96,
    },
    paddingLeft: {
      default: 20,
      [MD_ONLY]: 40,
      [breakpoints.lg]: "max(40px, calc((100vw - 1480px) / 2 + 40px))",
    },
    paddingRight: {
      default: 20,
      [MD_ONLY]: 40,
      [breakpoints.lg]: 64,
    },
  },
  heroTitle: {
    fontSize: "clamp(2.8rem, 5.6vw, 6rem)",
    display: "flex",
    flexWrap: "wrap",
    columnGap: "0.22em",
    rowGap: 0,
    maxWidth: "10ch",
  },
  heroWord: {
    display: "inline-block",
    whiteSpace: "nowrap",
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 8,
  },
  heroMeta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 20,
    marginTop: 8,
  },
  heroScrollCue: {
    display: {
      default: "none",
      [breakpoints.lg]: "inline-flex",
    },
    alignItems: "center",
    gap: 8,
    color: colors.mute600,
  },
  heroRight: {
    position: "relative",
    minHeight: {
      default: 420,
      [breakpoints.lg]: "auto",
    },
    overflow: "hidden",
    backgroundColor: colors.mute100,
  },
  heroPanel: {
    position: "absolute",
    inset: 0,
    clipPath: {
      default: "none",
      [breakpoints.lg]: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)",
    },
    overflow: "hidden",
    backgroundColor: colors.brandGreen950,
  },
  heroImg: {
    display: "block",
    width: "100%",
    height: "118%",
    objectFit: "cover",
    marginTop: "-9%",
  },
  heroStripe: {
    position: "absolute",
    inset: 0,
    display: {
      default: "none",
      [breakpoints.lg]: "block",
    },
    clipPath: "polygon(14% 0, 15.4% 0, 1.4% 100%, 0 100%)",
    backgroundColor: colors.brandGreen500,
    pointerEvents: "none",
  },
  heroTag: {
    position: "absolute",
    right: 24,
    bottom: 24,
    display: "grid",
    gap: 4,
    paddingInline: 14,
    paddingBlock: 12,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.ink,
    textAlign: "right",
  },
  heroTagBig: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 28,
    lineHeight: 1,
    color: colors.ink,
  },

  /* Chevron divider */
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    color: colors.brandGreen700,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.ink,
  },
  dividerGlyph: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 22,
    lineHeight: 1,
  },

  /* Marquee */
  marquee: {
    overflow: "hidden",
    paddingBlock: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.ink,
    backgroundColor: colors.paper,
  },
  marqueeTrack: {
    display: "flex",
    width: "max-content",
    animationName: marqueeAnim,
    animationDuration: "36s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationPlayState: {
      default: "running",
      [breakpoints.motionReduce]: "paused",
    },
  },
  marqueeList: {
    display: "flex",
    flexShrink: 0,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  marqueeItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 14,
    paddingInline: 18,
    whiteSpace: "nowrap",
    fontFamily: typography.body,
    fontWeight: 800,
    fontSize: 14,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: colors.ink,
  },
  marqueeChevron: {
    color: colors.brandGreen600,
  },

  /* Section head */
  sectionHead: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "1fr 1fr",
    },
    columnGap: 24,
    rowGap: 20,
    alignItems: "end",
    marginBottom: {
      default: 40,
      [breakpoints.lg]: 64,
    },
  },
  sectionHeadMain: {
    display: "grid",
    gap: 16,
  },
  sectionHeadAside: {
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
  sectionHeadAsideMirror: {
    justifyItems: "start",
    textAlign: "left",
  },

  /* Industries — mirrored chapters */
  chapterList: {
    display: "grid",
    gap: {
      default: 48,
      [breakpoints.lg]: 0,
    },
  },
  chapterRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "1fr 1fr",
    },
    columnGap: 48,
    rowGap: 20,
    alignItems: "center",
    paddingBlock: {
      default: 0,
      [breakpoints.lg]: 40,
    },
    borderTopWidth: {
      default: 0,
      [breakpoints.lg]: 1,
    },
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  chapterFigure: {
    position: "relative",
    margin: 0,
    width: "100%",
    maxWidth: 560,
    justifySelf: {
      default: "stretch",
      [breakpoints.lg]: "end",
    },
    aspectRatio: "1 / 1",
    overflow: "hidden",
    backgroundColor: colors.mute100,
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: 1,
    },
    gridRow: {
      default: "auto",
      [breakpoints.lg]: 1,
    },
  },
  chapterFigureMirror: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: 2,
    },
    justifySelf: {
      default: "stretch",
      [breakpoints.lg]: "start",
    },
  },
  chapterImg: {
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
  chapterNumeralBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingInline: 14,
    paddingBlock: 10,
    backgroundColor: colors.paper,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderRightColor: colors.ink,
    borderBottomColor: colors.ink,
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 26,
    lineHeight: 1,
    color: colors.brandGreen700,
  },
  chapterBody: {
    display: "grid",
    gap: 18,
    alignContent: "center",
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: 2,
    },
    gridRow: {
      default: "auto",
      [breakpoints.lg]: 1,
    },
    paddingInline: {
      default: 0,
      [breakpoints.lg]: 24,
    },
  },
  chapterBodyMirror: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: 1,
    },
  },
  chapterTitle: {
    margin: 0,
    fontFamily: typography.body,
    fontWeight: 800,
    fontSize: "clamp(1.8rem, 3.2vw, 3rem)",
    lineHeight: 1,
    letterSpacing: "-0.03em",
    textTransform: "uppercase",
    color: colors.ink,
  },

  /* Portfolio poster grid */
  posterGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      "@media (min-width: 640px) and (max-width: 1023.98px)": "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(3, minmax(0, 1fr))",
    },
    gap: 1,
    backgroundColor: colors.ink,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.ink,
  },
  card: {
    position: "relative",
    display: "grid",
    gap: 0,
    backgroundColor: colors.paper,
    color: colors.ink,
  },
  cardFigure: {
    position: "relative",
    margin: 0,
    aspectRatio: "4 / 5",
    overflow: "hidden",
    backgroundColor: colors.mute100,
  },
  cardImg: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: "scale(1)",
    transitionProperty: "transform, filter",
    transitionDuration: "800ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    filter: "grayscale(30%)",
  },
  cardImgActive: {
    transform: "scale(1.05)",
    filter: "grayscale(0%)",
  },
  cardCode: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingInline: 12,
    paddingBlock: 8,
    backgroundColor: colors.paper,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    color: colors.mute700,
  },
  cardBody: {
    display: "grid",
    gap: 6,
    padding: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.ink,
  },
  cardNameWrap: {
    display: "inline-block",
    position: "relative",
    width: "fit-content",
    paddingBottom: 4,
  },
  cardName: {
    margin: 0,
    fontFamily: typography.body,
    fontWeight: 800,
    fontSize: 20,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
    color: colors.ink,
  },
  cardSweep: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 3,
    width: "0%",
    backgroundColor: colors.brandGreen500,
    transitionProperty: "width",
    transitionDuration: "520ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  cardSweepActive: {
    width: "100%",
  },
  cardLatin: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 16,
    color: colors.mute600,
  },
  cardSpec: {
    marginTop: 8,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.08em",
    color: colors.mute700,
    fontVariantNumeric: "tabular-nums",
  },
  cardFoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    paddingInline: 10,
    paddingBlock: 4,
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: colors.mute700,
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

  /* Dark beat: stats */
  dark: {
    position: "relative",
    backgroundColor: colors.brandGreen950,
    color: colors.paper,
    overflow: "hidden",
  },
  darkEyebrow: {
    color: colors.brandGreen400,
  },
  darkHead: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 16,
    marginBottom: 40,
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [MD_ONLY]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(4, minmax(0, 1fr))",
    },
    gap: 1,
    backgroundColor: colors.brandGreen800,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderTopColor: colors.brandGreen800,
    borderBottomColor: colors.brandGreen800,
  },
  statCell: {
    display: "grid",
    gap: 12,
    alignContent: "start",
    paddingBlock: 32,
    paddingInline: {
      default: 0,
      [breakpoints.md]: 24,
    },
    backgroundColor: colors.brandGreen950,
  },
  statValue: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: "clamp(3.2rem, 5.4vw, 5.6rem)",
    lineHeight: 0.9,
    letterSpacing: "-0.04em",
    fontVariantNumeric: "tabular-nums",
    color: colors.paper,
  },
  statLabel: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.5,
    color: colors.brandGreen300,
    maxWidth: "24ch",
  },

  /* Quality */
  pillarGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    gap: 1,
    backgroundColor: colors.ink,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.ink,
  },
  pillarCell: {
    display: "grid",
    gap: 14,
    alignContent: "start",
    padding: {
      default: 24,
      [breakpoints.md]: 32,
    },
    minHeight: 220,
    backgroundColor: colors.paper,
  },
  pillarTitle: {
    margin: 0,
    fontFamily: typography.body,
    fontWeight: 800,
    fontSize: 22,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
    color: colors.ink,
  },
  certStrip: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [MD_ONLY]: "repeat(3, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(6, minmax(0, 1fr))",
    },
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: 1,
    backgroundColor: colors.ink,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.ink,
    marginTop: 1,
  },
  certCell: {
    display: "grid",
    gap: 6,
    paddingBlock: 18,
    paddingInline: 20,
    backgroundColor: colors.paper,
  },
  certName: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    fontWeight: 700,
    color: colors.ink,
  },
  certDot: {
    width: 8,
    height: 8,
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
    flexShrink: 0,
  },
  certSub: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: colors.mute600,
  },

  /* Global staircase */
  stairWrap: {
    position: "relative",
  },
  stairSvg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: {
      default: "none",
      [breakpoints.lg]: "block",
    },
    pointerEvents: "none",
  },
  stairList: {
    position: "relative",
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
  },
  stairRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "40px 1fr",
      [breakpoints.md]: "48px 1fr auto",
    },
    columnGap: 16,
    alignItems: "center",
    paddingBlock: 18,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
    transitionProperty: "background-color",
    transitionDuration: "240ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
    outlineOffset: -2,
  },
  stairRowActive: {
    backgroundColor: colors.brandGreen50,
  },
  /* The staircase: each base steps in by one tread (the seed's `V` descending). */
  stair0: { marginLeft: 0 },
  stair1: { marginLeft: { default: 0, [breakpoints.lg]: "6%" } },
  stair2: { marginLeft: { default: 0, [breakpoints.lg]: "12%" } },
  stair3: { marginLeft: { default: 0, [breakpoints.lg]: "18%" } },
  stair4: { marginLeft: { default: 0, [breakpoints.lg]: "24%" } },
  stair5: { marginLeft: { default: 0, [breakpoints.lg]: "30%" } },
  stairIndex: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 20,
    color: colors.brandGreen700,
  },
  stairCity: {
    margin: 0,
    fontFamily: typography.body,
    fontWeight: 800,
    fontSize: 18,
    letterSpacing: "-0.01em",
    textTransform: "uppercase",
    color: colors.ink,
  },
  stairRole: {
    margin: 0,
    fontSize: 13,
    color: colors.mute600,
  },
  stairCoords: {
    gridColumn: {
      default: "2",
      [breakpoints.md]: "auto",
    },
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.08em",
    color: colors.mute600,
    fontVariantNumeric: "tabular-nums",
    textAlign: {
      default: "left",
      [breakpoints.md]: "right",
    },
  },

  /* Finale */
  finale: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.brandGreen950,
    color: colors.paper,
    paddingBlock: {
      default: 96,
      [breakpoints.lg]: 150,
    },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.brandGreen800,
  },
  finaleGlow: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(60% 70% at 78% 24%, rgba(100, 167, 51, 0.34), rgba(100, 167, 51, 0) 70%)",
    pointerEvents: "none",
  },
  finaleGrid: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "2fr 1fr",
    },
    columnGap: 48,
    rowGap: 40,
    alignItems: "end",
  },
  finaleMain: {
    display: "grid",
    gap: 28,
  },
  finaleTitle: {
    fontSize: "clamp(2.6rem, 6.4vw, 6.8rem)",
    color: colors.paper,
    maxWidth: "12ch",
  },
  finaleItalic: {
    color: colors.brandGreen300,
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
  finaleAside: {
    display: "grid",
    gap: 12,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: colors.brandGreen400,
  },
  finaleRule: {
    height: 1,
    backgroundColor: colors.brandGreen800,
  },

  /* Footer */
  footer: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.ink,
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
  ghostRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.12em",
    marginTop: 64,
    marginBottom: 24,
    whiteSpace: "nowrap",
    userSelect: "none",
  },
  ghostWord: {
    fontFamily: typography.body,
    fontWeight: 800,
    fontSize: "clamp(4rem, 17.4vw, 17.4rem)",
    lineHeight: 0.85,
    letterSpacing: "-0.04em",
    color: colors.ink,
  },
  ghostV: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: "clamp(4rem, 17.4vw, 17.4rem)",
    lineHeight: 0.85,
    color: colors.brandGreen500,
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

const STAIR_STYLE = [
  styles.stair0,
  styles.stair1,
  styles.stair2,
  styles.stair3,
  styles.stair4,
  styles.stair5,
] as const;

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

/** A hairline broken by the seed's V at the centre. */
function ChevronDivider() {
  return (
    <div aria-hidden {...stylex.props(styles.divider)}>
      <span {...stylex.props(styles.dividerLine)} />
      <span {...stylex.props(styles.dividerGlyph)}>V</span>
      <span {...stylex.props(styles.dividerLine)} />
    </div>
  );
}

/* ─────────────────────────────── Nav ─────────────────────────────── */

function NavBar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [{ label: "Portfolio", href: "#portfolio" }].concat(
    navLinks.map((link) => ({ label: link.label, href: toAnchor(link.section) })),
  );

  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.container)}>
        <nav aria-label="Primary navigation" {...stylex.props(styles.navRow)}>
          <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brand)}>
            <span {...stylex.props(styles.brandWord)}>FENCHEM</span>
            <Leaf aria-hidden strokeWidth={1.5} {...stylex.props(styles.brandLeaf)} />
          </a>
          <div {...stylex.props(styles.navLinks)}>
            {links.map((link) => (
              <a key={link.href} href={link.href} {...stylex.props(styles.navLink)}>
                <ChevronRight aria-hidden size={12} />
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
                      <ChevronRight aria-hidden size={18} />
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
      {reduce ? null : (
        <m.div aria-hidden style={{ scaleX: scrollYProgress }} {...stylex.props(styles.progress)} />
      )}
    </header>
  );
}

/* ─────────────────────────────── Hero ─────────────────────────────── */

function HeroSection() {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section id="top" aria-label="Introduction" {...stylex.props(styles.hero)}>
      <div {...stylex.props(styles.heroGrid)}>
        <div {...stylex.props(styles.heroLeft)}>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
            {...stylex.props(styles.eyebrow)}
          >
            Botanical intelligence since 1995
          </m.p>
          <h1 {...stylex.props(styles.poster, styles.heroTitle)}>
            {HEADLINE.map((part, i) => (
              <m.span
                key={part.word}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduce ? 0 : 0.8,
                  delay: reduce ? 0 : 0.2 + i * STAGGER * 1.5,
                  ease: EASE,
                }}
                {...stylex.props(styles.heroWord, part.italic && styles.posterItalic)}
              >
                {part.word}
              </m.span>
            ))}
          </h1>
          <Reveal delay={STAGGER * 6} margin="0px">
            <p {...stylex.props(styles.lead)}>
              Fenchem turns raw botanical complexity into standardized, documented actives —
              supplied at industrial scale to formulators in more than forty countries.
            </p>
          </Reveal>
          <Reveal delay={STAGGER * 7} margin="0px">
            <div {...stylex.props(styles.heroActions)}>
              <a href="#portfolio" {...stylex.props(styles.ctaPrimary)}>
                See the portfolio
                <ArrowRight aria-hidden size={16} />
              </a>
              <a href={createInquiryHref("contact")} {...stylex.props(styles.ctaOutline)}>
                Request a specification
              </a>
            </div>
          </Reveal>
          <Reveal delay={STAGGER * 8} margin="0px">
            <div {...stylex.props(styles.heroMeta)}>
              <span {...stylex.props(styles.techLabel)}>ISO 9001 · GMP · FSSC 22000</span>
              <span {...stylex.props(styles.techLabel)}>Response &lt; 24h</span>
              <span {...stylex.props(styles.heroScrollCue)}>
                <ChevronsDown aria-hidden size={14} />
                <span {...stylex.props(styles.techLabel)}>Scroll</span>
              </span>
            </div>
          </Reveal>
        </div>

        <div ref={panelRef} {...stylex.props(styles.heroRight)}>
          <m.div
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : 0.15, ease: EASE }}
            {...stylex.props(styles.heroPanel)}
          >
            <m.img
              src={heroImage.src}
              alt={heroImage.alt}
              loading="eager"
              style={{ y: reduce ? 0 : imgY }}
              {...stylex.props(styles.heroImg)}
            />
          </m.div>
          <div aria-hidden {...stylex.props(styles.heroStripe)} />
          <Reveal delay={STAGGER * 6} y={12} margin="0px">
            <div {...stylex.props(styles.heroTag)}>
              <span {...stylex.props(styles.techLabel)}>{company.since}</span>
              <span {...stylex.props(styles.heroTagBig)}>{company.tagline}</span>
              <span {...stylex.props(styles.techLabel)}>{company.hq.coords}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Marquee ─────────────────────────────── */

function DivisionMarquee() {
  const items = DIVISION_ORDER.map((division) => (
    <li key={division} {...stylex.props(styles.marqueeItem)}>
      <DivisionDot division={division} />
      {DIVISION_LABEL[division]}
      <ChevronRight aria-hidden size={16} {...stylex.props(styles.marqueeChevron)} />
    </li>
  ));
  return (
    <div aria-label="Divisions" {...stylex.props(styles.marquee)}>
      <div {...stylex.props(styles.marqueeTrack)}>
        <ul {...stylex.props(styles.marqueeList)}>{items}</ul>
        <ul aria-hidden {...stylex.props(styles.marqueeList)}>
          {items}
        </ul>
      </div>
    </div>
  );
}

/* ─────────────────────────────── Section head ─────────────────────────────── */

function SectionHead({
  index,
  eyebrow,
  title,
  aside,
  mirror,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  mirror?: boolean;
}) {
  return (
    <div {...stylex.props(styles.sectionHead)}>
      <div {...stylex.props(styles.sectionHeadMain)}>
        <Reveal>
          <p {...stylex.props(styles.eyebrow)}>
            <span {...stylex.props(styles.numeral)}>{index}</span> — {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={STAGGER}>
          <h2 {...stylex.props(styles.poster, styles.h2)}>{title}</h2>
        </Reveal>
      </div>
      {aside ? (
        <Reveal
          delay={STAGGER * 2}
          sx={[styles.sectionHeadAside, mirror && styles.sectionHeadAsideMirror]}
        >
          {aside}
        </Reveal>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────── Industries — mirrored chapters ─────────────────────────────── */

function IndustriesSection() {
  const reduce = useReducedMotion();
  return (
    <section id="industries" aria-labelledby="industries-title" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <SectionHead
          index="01"
          eyebrow="Industries · 03 markets"
          title={
            <span id="industries-title">
              Three markets, <span {...stylex.props(styles.posterItalic)}>one</span> chain of
              custody
            </span>
          }
          aside={
            <p {...stylex.props(styles.prose)}>
              Standardized for potency, stability and dose accuracy — from field to finished
              extract.
            </p>
          }
        />
        <div {...stylex.props(styles.chapterList)}>
          {industries.map((industry, i) => {
            const mirror = i % 2 === 1;
            const fromX = mirror ? 24 : -24;
            return (
              <m.article
                key={industry.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: fromX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
                {...stylex.props(styles.chapterRow)}
              >
                <figure
                  {...stylex.props(styles.chapterFigure, mirror && styles.chapterFigureMirror)}
                >
                  <img
                    src={industry.image.src}
                    alt={industry.image.alt}
                    loading="lazy"
                    decoding="async"
                    {...stylex.props(styles.chapterImg)}
                  />
                  <figcaption {...stylex.props(styles.chapterNumeralBadge)}>
                    {String(i + 1).padStart(2, "0")}
                  </figcaption>
                </figure>
                <div {...stylex.props(styles.chapterBody, mirror && styles.chapterBodyMirror)}>
                  <span {...stylex.props(styles.techLabel)}>
                    {String(i + 1).padStart(2, "0")} / 03
                  </span>
                  <h3 {...stylex.props(styles.chapterTitle)}>{industry.title}</h3>
                  <p {...stylex.props(styles.lead)}>{industry.copy}</p>
                  <a href={createInquiryHref("industries")} {...stylex.props(styles.textLink)}>
                    Explore actives
                    <ArrowUpRight aria-hidden size={12} />
                  </a>
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Portfolio poster grid ─────────────────────────────── */

function PosterCard({ ingredient, index }: { ingredient: Ingredient; index: number }) {
  const [active, setActive] = useState(false);
  const division = divisionForApplication(ingredient.application);
  const on = () => setActive(true);
  const off = () => setActive(false);
  return (
    <article
      onPointerEnter={on}
      onPointerLeave={off}
      onFocus={on}
      onBlur={off}
      aria-label={`${ingredient.name}, ${ingredient.latin}`}
      {...stylex.props(styles.card)}
    >
      <figure {...stylex.props(styles.cardFigure)}>
        <img
          src={ingredient.image.src}
          alt={ingredient.image.alt}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.cardImg, active && styles.cardImgActive)}
        />
        <figcaption {...stylex.props(styles.cardCode)}>
          {ingredient.code} · {String(index + 1).padStart(2, "0")} / 06
        </figcaption>
      </figure>
      <div {...stylex.props(styles.cardBody)}>
        <span {...stylex.props(styles.cardNameWrap)}>
          <h3 {...stylex.props(styles.cardName)}>{ingredient.name}</h3>
          <span aria-hidden {...stylex.props(styles.cardSweep, active && styles.cardSweepActive)} />
        </span>
        <span {...stylex.props(styles.cardLatin)}>{ingredient.latin}</span>
        <span {...stylex.props(styles.cardSpec)}>
          {ingredient.purity} · {ingredient.form}
        </span>
        <div {...stylex.props(styles.cardFoot)}>
          <span {...stylex.props(styles.chip)}>
            <DivisionDot division={division} />
            {DIVISION_LABEL[division]}
          </span>
          <a href={createInquiryHref("industries")} {...stylex.props(styles.textLink)}>
            Spec sheet
            <ArrowUpRight aria-hidden size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}

function PortfolioSection() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <ChevronDivider />
        <div style={{ height: 48 }} />
        <SectionHead
          index="02"
          eyebrow="Portfolio · 06 featured actives"
          mirror
          title={
            <span id="portfolio-title">
              Specified to the <span {...stylex.props(styles.posterItalic)}>decimal</span>
            </span>
          }
          aside={
            <>
              <p {...stylex.props(styles.prose)}>
                Every active ships with assay, form and a dossier prepared before sampling.
              </p>
              <a href={createInquiryHref("industries")} {...stylex.props(styles.textLink)}>
                Full portfolio
                <ArrowUpRight aria-hidden size={12} />
              </a>
            </>
          }
        />
        <Reveal>
          <div {...stylex.props(styles.posterGrid)}>
            {FEATURED.map((ingredient, i) => (
              <PosterCard key={ingredient.code} ingredient={ingredient} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Dark beat: stats ─────────────────────────────── */

function StatsBeat() {
  return (
    <section aria-label="Key figures" {...stylex.props(styles.dark, styles.section)}>
      <div {...stylex.props(styles.container)}>
        <Reveal>
          <div {...stylex.props(styles.darkHead)}>
            <p {...stylex.props(styles.eyebrow, styles.darkEyebrow)}>
              Figures a formulator can check
            </p>
            <span {...stylex.props(styles.techLabel, styles.darkEyebrow)}>
              {company.legalName} · {company.since}
            </span>
          </div>
        </Reveal>
        <dl {...stylex.props(styles.statGrid)}>
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={STAGGER * i} sx={styles.statCell}>
              <dt {...stylex.props(styles.statValue)}>{stat.value}</dt>
              <dd {...stylex.props(styles.statLabel)}>{stat.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Quality ─────────────────────────────── */

function QualitySection() {
  return (
    <section id="quality" aria-labelledby="quality-title" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <SectionHead
          index="03"
          eyebrow="Quality · 03 pillars · 06 certifications"
          title={
            <span id="quality-title">
              Trust is argued with{" "}
              <span {...stylex.props(styles.posterItalic)}>specifications</span>
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
                <span {...stylex.props(styles.numeral)}>{String(i + 1).padStart(2, "0")}</span>
                <h3 {...stylex.props(styles.pillarTitle)}>{pillar.title}</h3>
                <p {...stylex.props(styles.prose)}>{pillar.copy}</p>
              </div>
            ))}
          </div>
          <ul aria-label="Certifications" {...stylex.props(styles.certStrip)}>
            {certificationDetails.map((cert) => (
              <li key={cert.name} {...stylex.props(styles.certCell)}>
                <span {...stylex.props(styles.certName)}>
                  <span aria-hidden {...stylex.props(styles.certDot)} />
                  {cert.name}
                </span>
                <span {...stylex.props(styles.certSub)}>{cert.sub}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Global staircase ─────────────────────────────── */

function StaircasePath({ rows }: { rows: number }) {
  const reduce = useReducedMotion();
  // One step per row: right by STAIR_STEP, down by one row (1000 × rows*100 plane).
  const rowH = 100;
  const points: string[] = [];
  for (let i = 0; i < rows; i++) {
    const x = i * STAIR_STEP + 24;
    const y = i * rowH + rowH / 2;
    points.push(`${x},${y}`);
    if (i < rows - 1) points.push(`${x},${y + rowH}`);
  }
  const d = `M${points.join(" L")}`;
  return (
    <svg
      viewBox={`0 0 1000 ${rows * rowH}`}
      preserveAspectRatio="none"
      aria-hidden
      {...stylex.props(styles.stairSvg)}
    >
      <m.path
        d={d}
        fill="none"
        stroke="var(--color-brand-green-500)"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
      />
    </svg>
  );
}

function GlobalSection() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="global-supply" aria-labelledby="global-title" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.container)}>
        <ChevronDivider />
        <div style={{ height: 48 }} />
        <SectionHead
          index="04"
          eyebrow="Global supply · 06 bases"
          mirror
          title={
            <span id="global-title">
              Sourced at origin, <span {...stylex.props(styles.posterItalic)}>traced</span> from
              Nanjing
            </span>
          }
          aside={
            <p {...stylex.props(styles.prose)}>
              Six bases on three continents keep documentation, compliance and lead times local.
            </p>
          }
        />
        <Reveal sx={styles.stairWrap}>
          <StaircasePath rows={regions.length} />
          <ol aria-label="Regions" {...stylex.props(styles.stairList)}>
            {regions.map((region, i) => (
              <li
                key={region.city}
                tabIndex={0}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`${region.city}, ${region.country}: ${region.role}`}
                {...stylex.props(
                  styles.stairRow,
                  STAIR_STYLE[i] ?? styles.stair0,
                  active === i && styles.stairRowActive,
                )}
              >
                <span {...stylex.props(styles.stairIndex)}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p {...stylex.props(styles.stairCity)}>
                    {region.city}, {region.country}
                  </p>
                  <p {...stylex.props(styles.stairRole)}>{region.role}</p>
                </div>
                <span {...stylex.props(styles.stairCoords)}>{region.coords}</span>
              </li>
            ))}
          </ol>
        </Reveal>
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
        <div {...stylex.props(styles.finaleGrid)}>
          <div {...stylex.props(styles.finaleMain)}>
            <Reveal>
              <p {...stylex.props(styles.eyebrow, styles.darkEyebrow)}>
                <span {...stylex.props(styles.numeral, styles.finaleItalic)}>05</span> — Contact
              </p>
            </Reveal>
            <Reveal delay={STAGGER}>
              <h2 id="contact-title" {...stylex.props(styles.poster, styles.finaleTitle)}>
                Send the target.{" "}
                <span {...stylex.props(styles.posterItalic, styles.finaleItalic)}>
                  We send the specification.
                </span>
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
            <span>{company.hq.coords}</span>
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
        <div aria-hidden {...stylex.props(styles.ghostRow)}>
          <span {...stylex.props(styles.ghostWord)}>FENCHEM</span>
          <span {...stylex.props(styles.ghostV)}>V</span>
        </div>
        <div {...stylex.props(styles.footerBottom)}>
          <span>
            © {new Date().getFullYear()} {company.legalName}
          </span>
          <span>Edition T · seed {SEED_SHORT}</span>
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

export function VariantT() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        <SmoothScroll />
        <NavBar />
        <main>
          <HeroSection />
          <DivisionMarquee />
          <IndustriesSection />
          <PortfolioSection />
          <StatsBeat />
          <QualitySection />
          <GlobalSection />
          <FinaleSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
