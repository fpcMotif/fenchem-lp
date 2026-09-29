/*
 * PROTOTYPE — Variant S: "Strontium · periodic index".
 *
 * A specification catalogue set as a typographic document. One photograph on
 * the whole page (the hero specimen, in colour, framed as a plate); everything
 * else is type on a hairline grid. The only other colour is the actives
 * themselves: each index cell carries a swatch of the extract's own colour.
 *
 *   hero (type + one specimen plate, caption strip fused to it)
 *   → periodic index: a fixed four-cell module, market headers span the cells
 *   → release: a certificate-of-analysis specimen and the documents that travel
 *   → six bases as a typographic strip with time zones
 *   → contact plate.
 *
 * Grid: one 7 | 5 split at 1440 that the hero, the release section and the
 * contact plate all obey. Type: display serif (italic once), a neutral grotesk,
 * and black tabular mono for every value. One green (950). Square corners.
 */
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useScroll } from "motion/react";
import { ArrowRight, ArrowUp, Menu, X } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, typography } from "@fenchem-lp/ui/tokens.stylex";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certifications,
  company,
  createInquiryHref,
  ingredients,
  regions,
  type Ingredient,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Content ─────────────────────────────── */

const NAV = [
  { label: "Index", href: "#index" },
  { label: "Certificate", href: "#quality" },
  { label: "Coverage", href: "#global-supply" },
  { label: "Contact", href: "#contact" },
];

/** Three letters from the source name, so no glyph collides with an element symbol. */
function specimenSymbol(ingredient: Ingredient): string {
  return ingredient.latin.slice(0, 3);
}

/** Every figure on the page carries one decimal. */
const dec = (n: string | number) => Number(n).toFixed(1);

/**
 * The extract's own colour and appearance: the only colour on the page.
 * `dark` fields take paper text; `white` powders are drawn as outline glyphs on paper.
 */
const APPEARANCE: Record<
  string,
  { colour: string; label: string; dark?: boolean; white?: boolean }
> = {
  "FN-014": { colour: "#CDB88F", label: "Beige powder" },
  "FN-027": { colour: "#F2A21B", label: "Orange beadlet" },
  "FN-033": { colour: "#B4231C", label: "Dark red beadlet", dark: true },
  "FN-041": { colour: "#F7D24A", label: "Yellow powder" },
  "FN-052": { colour: "#E3B51E", label: "Yellow granule" },
  "FN-058": { colour: "#F2EFE8", label: "White powder", white: true },
  "FN-068": { colour: "#F2EFE8", label: "White powder", white: true },
  "FN-072": { colour: "#DC4A18", label: "Orange-red powder", dark: true },
};

/** The flagship grade per active, to the decimal; the catalogue range follows. */
function assayLine(ingredient: Ingredient): string {
  const range = ingredient.purity.match(/^(\d+(?:\.\d+)?)% – (\d+)% (.+)$/);
  if (range) {
    const flagship = ingredient.code === HERO_SPECIMEN.code ? "20.0" : dec(range[2]!);
    return `${flagship}% ${range[3]} · grades ${dec(range[1]!)} – ${dec(range[2]!)}%`;
  }
  return ingredient.purity.replace(/^≥ (\d+)%/, (_, n) => `≥ ${dec(n)}%`);
}

const HERO_SPECIMEN = ingredients.find((i) => i.code === "FN-027") ?? ingredients[0]!;

/** The index as a fixed four-cell module, in code order. */
const INDEX_ORDER: Ingredient[] = [...ingredients].sort((a, b) => a.code.localeCompare(b.code));

const UTC_OFFSET: Record<string, number> = {
  Nanjing: 8,
  Hackensack: -5,
  Frankfurt: 1,
  Johannesburg: 2,
  "São Paulo": -3,
  "Kuala Lumpur": 8,
};

function utcLabel(offset: number): string {
  return `UTC${offset >= 0 ? "+" : "−"}${Math.abs(offset)}`;
}

/** Bases ordered east to west. */
const BASE_ROWS = [...regions]
  .map((base) => ({ base, offset: UTC_OFFSET[base.city] ?? 0 }))
  .sort((a, b) => b.offset - a.offset);

/** Union of the bases' working days in UTC, as sorted covered intervals. */
function coverage(rows: { start: number; end: number }[]): { start: number; end: number }[] {
  const sorted = [...rows].sort((a, b) => a.start - b.start);
  const out: { start: number; end: number }[] = [];
  for (const span of sorted) {
    const last = out[out.length - 1];
    if (last && span.start <= last.end) last.end = Math.max(last.end, span.end);
    else out.push({ ...span });
  }
  return out;
}

/** Local working day, expressed in UTC, for the coverage chart. */
const WORKDAY = { start: 9, end: 18 };
function workdayUtc(offset: number): { start: number; end: number } {
  return { start: (WORKDAY.start - offset + 24) % 24, end: (WORKDAY.end - offset + 24) % 24 };
}

/** Specimen certificate for the featured active. Example values, labelled as such. */
const CERTIFICATE = {
  number: "CoA-027-2604-011",
  lot: "L-2604-011",
  released: "14 Apr 2026",
  grade: "Lutein 20.0% beadlet",
  assay: "19.0 – 21.0% lutein",
  tests: [
    {
      test: "Identity",
      method: "HPLC, RT vs reference",
      specification: "Matches reference",
      result: "Conforms",
    },
    { test: "Assay (lutein)", method: "HPLC", specification: "19.0 – 21.0%", result: "20.4%" },
    {
      test: "Loss on drying",
      method: "Gravimetric, 105 °C",
      specification: "≤ 5.0%",
      result: "3.1%",
    },
    {
      test: "Particle size",
      method: "Sieve",
      specification: "≥ 90.0% through 20 mesh",
      result: "97.0%",
    },
    {
      test: "Total plate count",
      method: "Pour plate",
      specification: "≤ 1,000 cfu/g",
      result: "< 100 cfu/g",
    },
  ],
};

const TRAVELS_WITH_LOT = [
  "Certificate of analysis",
  "Specification sheet",
  "Safety data sheet",
  "Regulatory dossier",
  "Allergen statement",
  "Chain-of-custody record",
  "Stability data, on request",
  "Kosher and Halal certificates",
];

/** Two families on the page: the serif for every word, the mono for every value. */
const SANS = typography.display;

/* ─────────────────────────────── Styles ─────────────────────────────── */

const MD_ONLY = "@media (min-width: 768px) and (max-width: 1023.98px)";
const SM_TO_LG = "@media (min-width: 640px) and (max-width: 1023.98px)";

const styles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    color: colors.ink,
    fontFamily: SANS,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "::selection": {
      backgroundColor: colors.brandGreen200,
      color: colors.brandGreen950,
    },
  },
  container: {
    maxWidth: 1440,
    marginInline: "auto",
    paddingInline: {
      default: 20,
      [MD_ONLY]: 40,
      [breakpoints.lg]: 64,
    },
  },
  section: {
    paddingBlock: {
      default: 56,
      [MD_ONLY]: 72,
      [breakpoints.lg]: 96,
    },
  },
  hairlineTop: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  grid12: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 40,
  },
  left7: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "1 / span 7",
    },
  },
  right5: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "8 / span 5",
    },
  },

  /* Type roles */
  small: {
    margin: 0,
    fontFamily: SANS,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.4,
    color: colors.mute600,
  },
  data: {
    fontFamily: typography.tech,
    fontSize: 13,
    lineHeight: 1.55,
    letterSpacing: "0",
    fontVariantNumeric: "tabular-nums",
    color: colors.ink,
  },
  dataMuted: {
    color: colors.mute500,
  },
  display: {
    margin: 0,
    fontFamily: typography.display,
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: 1.02,
    color: colors.ink,
  },
  running: {
    fontSize: 28,
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
  },
  h2: {
    fontSize: {
      default: 32,
      [breakpoints.md]: 40,
      [breakpoints.lg]: 44,
    },
    lineHeight: 1.06,
    maxWidth: "24ch",
  },
  sectionHead: {
    rowGap: 12,
    alignItems: "end",
    marginBottom: 36,
  },
  sectionRef: {
    paddingBottom: 6,
  },
  deck: {
    margin: 0,
    fontSize: 19,
    lineHeight: 1.45,
    color: colors.mute700,
    maxWidth: "36ch",
    paddingBottom: 4,
  },
  lead: {
    margin: 0,
    fontSize: {
      default: 19,
      [breakpoints.md]: 23,
    },
    lineHeight: 1.4,
    color: colors.mute700,
    maxWidth: "40ch",
  },
  prose: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.55,
    color: colors.mute700,
  },
  body: {
    margin: 0,
    fontSize: 19,
    lineHeight: 1.45,
    color: colors.ink,
  },

  /* Actions */
  ctaPrimary: {
    display: "inline-flex",
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingInline: 24,
    paddingBlock: 12,
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: {
      default: "#F2A21B",
      ":hover": "#E39510",
    },
    color: colors.ink,
    fontFamily: SANS,
    fontSize: 17,
    fontWeight: 500,
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
      ":focus-visible": `2px solid ${colors.ink}`,
    },
    outlineOffset: 3,
  },
  ctaOnDark: {
    backgroundColor: {
      default: "#F2A21B",
      ":hover": "#E39510",
    },
    color: colors.ink,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.paper}`,
    },
  },
  textLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: SANS,
    fontSize: 17,
    fontWeight: 500,
    lineHeight: 1.4,
    color: {
      default: colors.ink,
      ":hover": colors.brandGreen900,
    },
    textDecoration: "underline",
    textDecorationThickness: 1,
    textUnderlineOffset: 5,
    textDecorationColor: {
      default: colors.mute400,
      ":hover": colors.brandGreen900,
    },
    transitionProperty: "color, text-decoration-color",
    transitionDuration: "200ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.ink}`,
    },
    outlineOffset: 4,
  },

  /* Nav */
  header: {
    position: "sticky",
    top: 0,
    zIndex: 60,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  navRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    height: 64,
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: 48,
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
    color: colors.ink,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.ink}`,
    },
    outlineOffset: 4,
  },
  brandWord: {
    fontFamily: typography.display,
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: "-0.03em",
    lineHeight: 1,
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
    fontFamily: SANS,
    fontSize: 17,
    fontWeight: 500,
    color: {
      default: colors.mute700,
      ":hover": colors.ink,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.ink}`,
    },
    outlineOffset: 6,
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: 16,
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
    borderRadius: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.paper,
    color: colors.ink,
    cursor: "pointer",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.ink}`,
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
    backgroundColor: colors.paper,
  },
  mobileList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    paddingBlock: 16,
    display: "grid",
    gap: 4,
  },
  mobileLink: {
    display: "block",
    paddingBlock: 12,
    fontFamily: SANS,
    fontSize: 20,
    fontWeight: 500,
    color: colors.ink,
    textDecoration: "none",
  },
  progress: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -1,
    height: 1,
    backgroundColor: colors.ink,
    transformOrigin: "0 50%",
  },

  /* Hero */
  hero: {
    paddingTop: {
      default: 32,
      [breakpoints.lg]: 48,
    },
    paddingBottom: {
      default: 48,
      [breakpoints.lg]: 0,
    },
  },
  heroGrid: {
    rowGap: 40,
    alignItems: "stretch",
  },
  heroLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 40,
  },
  heroTop: {
    display: "grid",
    gap: 28,
  },
  heroTail: {
    display: "grid",
    gap: 36,
  },
  heroTitle: {
    fontSize: {
      default: 52,
      [breakpoints.md]: 80,
      [breakpoints.lg]: 96,
    },
    lineHeight: 0.96,
    letterSpacing: "-0.035em",
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 28,
  },
  chip: {
    display: "grid",
    gridTemplateRows: "1fr auto",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    borderBottomWidth: 0,
    minHeight: {
      default: 420,
      [breakpoints.lg]: "100%",
    },
  },
  chipField: {
    position: "relative",
    overflow: "hidden",
    padding: 20,
    minHeight: {
      default: 320,
      [breakpoints.lg]: 600,
    },
    color: colors.ink,
  },
  chipMeta: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  },
  chipSymbol: {
    position: "absolute",
    left: "50%",
    bottom: "-0.22em",
    transform: "translateX(-50%)",
    fontSize: {
      default: 180,
      [breakpoints.lg]: 290,
    },
    lineHeight: 1,
    letterSpacing: "-0.06em",
    whiteSpace: "nowrap",
    pointerEvents: "none",
  },
  whiteField: {
    borderBottomColor: colors.line,
  },
  onPaper: {
    color: colors.paper,
  },
  chipLink: {
    textDecoration: "none",
    color: colors.ink,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.ink}`,
    },
    outlineOffset: 4,
  },
  chipCaption: {
    display: "grid",
    gridTemplateColumns: "1fr 1.35fr",
    columnGap: 24,
    rowGap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    backgroundColor: colors.paper,
  },
  stripCell: {
    display: "grid",
    gap: 2,
  },
  stripName: {
    fontFamily: typography.display,
    fontSize: 19,
    fontWeight: 500,
    lineHeight: 1.25,
    color: colors.ink,
  },
  sourceLine: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontSize: 16,
    lineHeight: 1.4,
    color: colors.mute600,
  },

  /* Running section header */
  runningHead: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 16,
    marginBottom: 28,
  },

  tableBlock: {
    display: "block",
  },
  tableContents: {
    display: "contents",
  },
  tableCell: {
    display: "block",
    padding: 0,
    fontWeight: "inherit",
    textAlign: "inherit",
  },

  /* Periodic index: a fixed module */
  indexTable: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [SM_TO_LG]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(4, minmax(0, 1fr))",
    },
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderTopColor: colors.line,
    borderLeftColor: colors.line,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  tile: {
    display: "grid",
    gridTemplateRows: "auto auto",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderRightColor: colors.line,
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  tileField: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: "1 / 1",
    padding: 16,
    color: colors.ink,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(0, 0, 0, 0.08)",
  },
  fieldLabel: {
    fontFamily: typography.display,
    fontSize: 15,
    lineHeight: 1.4,
  },
  tileFieldMeta: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  },
  tileSymbol: {
    position: "absolute",
    left: "50%",
    bottom: "-0.22em",
    transform: "translateX(-50%)",
    fontSize: 176,
    lineHeight: 1,
    letterSpacing: "-0.06em",
    whiteSpace: "nowrap",
    pointerEvents: "none",
  },
  tileCaption: {
    display: "grid",
    gap: 2,
    padding: 16,
  },
  tileRule: {
    height: 10,
  },
  tileMarket: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 1.4,
    color: colors.mute600,
  },
  dataSoft: {
    color: colors.mute700,
  },

  /* Release: certificate + documents */
  releaseGrid: {
    rowGap: 40,
    alignItems: "stretch",
  },
  certificate: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
  },
  certHead: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 16,
    paddingBlock: 20,
    paddingInline: 20,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  certRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr 1fr",
      [breakpoints.md]: "repeat(4, minmax(0, 1fr))",
    },
    alignItems: "baseline",
    minHeight: 46,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    fontSize: 14,
    lineHeight: 1.5,
  },
  certDocs: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "1fr 3fr",
    },
    alignItems: "baseline",
    minHeight: 46,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    fontSize: 15,
    lineHeight: 1.6,
  },
  signature: {
    display: "grid",
    gap: 6,
    minWidth: 260,
    textAlign: "right",
  },
  certRowHead: {
    backgroundColor: colors.mute50,
  },
  certCell: {
    paddingBlock: 12,
    paddingInline: 20,
  },
  certLabel: {
    color: colors.mute600,
    fontWeight: 500,
  },
  certResult: {
    fontWeight: 600,
    textAlign: "right",
  },
  certNumeric: {
    textAlign: "right",
  },
  certFoot: {
    hyphens: "manual",
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "1fr auto",
    },
    gap: 24,
    alignItems: "end",
    padding: 20,
  },
  release: {
    display: "grid",
    gap: 2,
    textAlign: "right",
    fontSize: 14,
    lineHeight: 1.5,
    color: colors.mute700,
  },
  docs: {
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    rowGap: 20,
    height: "100%",
  },
  docHead: {
    display: "flex",
    alignItems: "center",
    minHeight: 76,
    marginBottom: -20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  docList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gridAutoRows: "1fr",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  docItem: {
    display: "flex",
    alignItems: "center",
    paddingBlock: 4,
    minHeight: 40,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    fontSize: 16,
    lineHeight: 1.5,
    color: colors.ink,
  },

  /* Bases: working-hours coverage in UTC */
  chart: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "240px 1fr 96px",
    },
    columnGap: 0,
    rowGap: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  chartHeadCell: {
    display: "flex",
    alignItems: "center",
    height: 38,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  chartAxis: {
    position: "relative",
    height: 38,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  chartTick: {
    position: "absolute",
    top: 8,
    whiteSpace: "nowrap",
    fontFamily: typography.tech,
    fontSize: 13,
    lineHeight: 1.4,
    color: colors.mute700,
  },
  tickFirst: { transform: "translateX(0)" },
  tickMid: { transform: "translateX(-50%)" },
  tickLast: { transform: "translateX(-100%)" },
  chartLabel: {
    display: "grid",
    gap: 0,
    paddingBlock: 6,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  chartTrack: {
    position: "relative",
    alignSelf: "stretch",
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: colors.line,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundImage: `linear-gradient(90deg, ${colors.mute100} 0 1px, transparent 1px)`,
    backgroundSize: "calc(100% / 4) 100%",
  },
  chartBar: {
    position: "absolute",
    top: "50%",
    height: 9,
    marginTop: -4.5,
    backgroundColor: colors.brandGreen950,
  },
  chartCover: {
    position: "absolute",
    top: "50%",
    height: 14,
    marginTop: -7,
    backgroundColor: colors.brandGreen950,
  },
  chartGap: {
    position: "absolute",
    top: "50%",
    height: 14,
    marginTop: -7,
    backgroundImage: `repeating-linear-gradient(135deg, ${colors.mute400} 0 1px, transparent 1px 5px)`,
  },
  chartCoverRow: {
    backgroundColor: colors.mute50,
  },
  chartUtc: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingLeft: 24,
    paddingBlock: 6,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  baseCity: {
    margin: 0,
    fontFamily: SANS,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.3,
    color: colors.ink,
  },
  baseRole: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.4,
    color: colors.mute600,
  },
  bigNumber: {
    fontSize: {
      default: 72,
      [breakpoints.md]: 96,
      [breakpoints.lg]: 120,
    },
    lineHeight: 0.9,
    letterSpacing: "-0.04em",
  },
  bigNumberUnit: {
    fontSize: "0.42em",
    letterSpacing: "-0.02em",
  },
  bigLead: {
    fontSize: {
      default: 22,
      [breakpoints.lg]: 28,
    },
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
    maxWidth: "22ch",
  },
  chartNote: {
    marginTop: 14,
  },
  chartLegend: {
    marginBottom: 16,
  },

  /* Contact plate */
  finale: {
    backgroundColor: colors.brandGreen950,
    color: colors.paper,
    paddingBlock: {
      default: 64,
      [breakpoints.lg]: 88,
    },
  },
  finaleGrid: {
    rowGap: 48,
    alignItems: "stretch",
  },
  finaleLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 40,
  },
  finaleTitle: {
    color: colors.paper,
  },
  finaleRef: {
    color: "rgba(255, 255, 255, 0.6)",
  },
  finaleActions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 28,
  },
  finaleMail: {
    fontFamily: SANS,
    fontSize: 15,
    fontWeight: 500,
    color: {
      default: colors.paper,
      ":hover": colors.brandGreen200,
    },
    textDecoration: "underline",
    textUnderlineOffset: 5,
    textDecorationColor: "rgba(255, 255, 255, 0.4)",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.paper}`,
    },
    outlineOffset: 4,
  },
  finaleAside: {
    display: "grid",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "rgba(255, 255, 255, 0.22)",
  },
  finaleRow: {
    display: "grid",
    gridTemplateColumns: "88px 1fr",
    gap: 16,
    paddingBlock: 18,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(255, 255, 255, 0.22)",
  },
  finaleKey: {
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.55,
    color: colors.paper,
  },
  finaleValue: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.55,
    color: "rgba(255, 255, 255, 0.78)",
  },

  /* Footer */
  footer: {
    paddingTop: {
      default: 48,
      [breakpoints.lg]: 64,
    },
    paddingBottom: 28,
  },
  footerGrid: {
    rowGap: 32,
  },
  footerIntro: {
    display: "grid",
    gap: 14,
    justifyItems: "start",
    alignContent: "start",
    maxWidth: "36ch",
  },
  footerCol: {
    display: "grid",
    gap: 10,
    alignContent: "start",
  },
  footerList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    rowGap: 6,
  },
  smallHead: {
    margin: 0,
    fontFamily: SANS,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.4,
    color: colors.ink,
  },
  footerItem: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.5,
    color: colors.mute700,
  },
  footerLink: {
    fontSize: 16,
    lineHeight: 1.5,
    color: {
      default: colors.ink,
      ":hover": colors.brandGreen900,
    },
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textUnderlineOffset: 4,
  },
  footerBottom: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginTop: {
      default: 40,
      [breakpoints.lg]: 56,
    },
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    fontSize: 14,
    color: colors.mute500,
  },
  topLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 14,
    fontWeight: 500,
    color: {
      default: colors.mute600,
      ":hover": colors.ink,
    },
    textDecoration: "none",
  },
});

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

  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.container)}>
        <nav aria-label="Primary navigation" {...stylex.props(styles.navRow)}>
          <div {...stylex.props(styles.navLeft)}>
            <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brand)}>
              <span {...stylex.props(styles.brandWord)}>Fenchem</span>
            </a>
            <div {...stylex.props(styles.navLinks)}>
              {NAV.map((link) => (
                <a key={link.href} href={link.href} {...stylex.props(styles.navLink)}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div {...stylex.props(styles.navRight)}>
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
                {NAV.map((link) => (
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
      {reduce ? null : (
        <m.div aria-hidden style={{ scaleX: scrollYProgress }} {...stylex.props(styles.progress)} />
      )}
    </header>
  );
}

/* ─────────────────────────────── Shared bits ─────────────────────────────── */

function SourceLine({ ingredient }: { ingredient: Ingredient }) {
  return <span {...stylex.props(styles.sourceLine)}>{ingredient.latin}</span>;
}

/** One heading model for every section: a 44px serif statement left, a mono reference right. */
function SectionHead({
  id,
  reference,
  deck,
  children,
  onDark = false,
}: {
  id: string;
  reference?: string;
  deck?: string;
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <Reveal sx={styles.grid12} style={styles.sectionHead}>
      <h2
        id={id}
        {...stylex.props(styles.display, styles.h2, styles.left7, onDark && styles.finaleTitle)}
      >
        {children}
      </h2>
      {deck ? <p {...stylex.props(styles.deck, styles.right5)}>{deck}</p> : null}
      {reference ? (
        <span
          {...stylex.props(
            styles.data,
            styles.dataMuted,
            styles.right5,
            styles.sectionRef,
            onDark && styles.finaleRef,
          )}
        >
          {reference}
        </span>
      ) : null}
    </Reveal>
  );
}

/* ─────────────────────────────── Hero ─────────────────────────────── */

function HeroSection() {
  const look = APPEARANCE[HERO_SPECIMEN.code]!;
  const invert = look.dark === true;
  return (
    <section id="top" aria-label="Introduction" {...stylex.props(styles.hero)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.grid12, styles.heroGrid)}>
          <div {...stylex.props(styles.left7, styles.heroLeft)}>
            <Reveal margin="0px" sx={styles.heroTop}>
              <h1 {...stylex.props(styles.display, styles.heroTitle)}>
                Standardized
                <br />
                actives, specified
                <br />
                to the decimal.
              </h1>
              <p {...stylex.props(styles.lead)}>
                Eight standardized actives with assay, form and dossier fixed before sampling,
                supplied from six bases to formulators in more than forty countries.
              </p>
            </Reveal>
            <Reveal delay={STAGGER} margin="0px" sx={styles.heroTail}>
              <div {...stylex.props(styles.heroActions)}>
                <a href={createInquiryHref("contact")} {...stylex.props(styles.ctaPrimary)}>
                  Request a specification
                  <ArrowRight aria-hidden size={16} />
                </a>
                <a href="#quality" {...stylex.props(styles.textLink)}>
                  Read a certificate of analysis
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={STAGGER} margin="0px" sx={styles.right5}>
            <a
              href="#quality"
              aria-label="Lot release card, see the certificate"
              {...stylex.props(styles.chip, styles.chipLink)}
            >
              <div style={{ backgroundColor: look.colour }} {...stylex.props(styles.chipField)}>
                <div {...stylex.props(styles.chipMeta)}>
                  <span {...stylex.props(styles.data, invert && styles.onPaper)}>
                    {HERO_SPECIMEN.code} · lot {CERTIFICATE.lot}
                  </span>
                  <span {...stylex.props(styles.data, invert && styles.onPaper)}>
                    Released {CERTIFICATE.released}
                  </span>
                </div>
                <span
                  aria-hidden
                  {...stylex.props(styles.display, styles.chipSymbol, invert && styles.onPaper)}
                >
                  {specimenSymbol(HERO_SPECIMEN)}
                </span>
              </div>
              <div {...stylex.props(styles.chipCaption)}>
                <div {...stylex.props(styles.stripCell)}>
                  <span {...stylex.props(styles.stripName)}>{CERTIFICATE.grade}</span>
                  <SourceLine ingredient={HERO_SPECIMEN} />
                </div>
                <div {...stylex.props(styles.stripCell)}>
                  <span {...stylex.props(styles.data)}>Assay 20.4% · spec 19.0 – 21.0%</span>
                  <span {...stylex.props(styles.data, styles.dataMuted)}>{HERO_SPECIMEN.form}</span>
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Periodic index ─────────────────────────────── */

function SpecimenTile({ ingredient }: { ingredient: Ingredient }) {
  const look = APPEARANCE[ingredient.code] ?? { colour: "#E5E5E5", label: "" };
  const invert = look.dark === true;
  const white = look.white === true;
  return (
    <li
      aria-label={`${ingredient.name}, ${ingredient.latin}`}
      {...stylex.props(styles.tile)}
      style={{ textWrap: "wrap" }}
    >
      <div
        style={{ backgroundColor: look.colour }}
        {...stylex.props(styles.tileField, white && styles.whiteField)}
      >
        <div {...stylex.props(styles.tileFieldMeta)}>
          <span {...stylex.props(styles.data, invert && styles.onPaper)}>{ingredient.code}</span>
          <span {...stylex.props(styles.fieldLabel, invert && styles.onPaper)}>
            {ingredient.application}
          </span>
        </div>
        <span
          aria-hidden
          {...stylex.props(styles.display, styles.tileSymbol, invert && styles.onPaper)}
        >
          {specimenSymbol(ingredient)}
        </span>
      </div>
      <div {...stylex.props(styles.tileCaption)}>
        <h3 {...stylex.props(styles.stripName)}>{ingredient.name}</h3>
        <SourceLine ingredient={ingredient} />
        <div aria-hidden {...stylex.props(styles.tileRule)} />
        <span {...stylex.props(styles.data)}>{assayLine(ingredient)}</span>
        <span {...stylex.props(styles.data)}>{ingredient.form}</span>
        <span {...stylex.props(styles.data, styles.dataSoft)}>{look.label}</span>
      </div>
    </li>
  );
}

function IndexSection() {
  return (
    <section
      id="index"
      aria-labelledby="index-title"
      {...stylex.props(styles.section, styles.hairlineTop)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHead id="index-title">
          Periodic index: eight actives, one specification each.
        </SectionHead>
        <Reveal>
          <ul aria-label="Periodic index of actives" {...stylex.props(styles.indexTable)}>
            {INDEX_ORDER.map((ingredient) => (
              <SpecimenTile key={ingredient.code} ingredient={ingredient} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Release ─────────────────────────────── */

function CertificateSection() {
  return (
    <section
      id="quality"
      aria-labelledby="quality-title"
      {...stylex.props(styles.section, styles.hairlineTop)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHead
          id="quality-title"
          deck={`Issued for every lot before a sample ships. Nothing leaves ${company.hq.city} without the full document set.`}
        >
          Trust is argued with specifications, not adjectives.
        </SectionHead>
        <Reveal>
          <div aria-label="Certificate of analysis, specimen" {...stylex.props(styles.certificate)}>
            <div {...stylex.props(styles.certHead)}>
              <h3 {...stylex.props(styles.display, styles.running)}>Certificate of analysis</h3>
              <span {...stylex.props(styles.data)}>{CERTIFICATE.number}</span>
            </div>
            <table aria-label="Lot identity" {...stylex.props(styles.tableBlock)}>
              <tbody {...stylex.props(styles.tableBlock)}>
                <tr {...stylex.props(styles.certRow)}>
                  <td {...stylex.props(styles.tableCell, styles.certCell, styles.certLabel)}>
                    Product
                  </td>
                  <td {...stylex.props(styles.tableCell, styles.certCell, styles.data)}>
                    {CERTIFICATE.grade}
                  </td>
                  <td {...stylex.props(styles.tableCell, styles.certCell, styles.certLabel)}>
                    Source
                  </td>
                  <td {...stylex.props(styles.tableCell, styles.certCell, styles.data)}>
                    {HERO_SPECIMEN.latin}
                  </td>
                </tr>
                <tr {...stylex.props(styles.certRow)}>
                  <td {...stylex.props(styles.tableCell, styles.certCell, styles.certLabel)}>
                    Spec reference
                  </td>
                  <td {...stylex.props(styles.tableCell, styles.certCell, styles.data)}>
                    {HERO_SPECIMEN.code}
                  </td>
                  <td {...stylex.props(styles.tableCell, styles.certCell, styles.certLabel)}>
                    Lot
                  </td>
                  <td {...stylex.props(styles.tableCell, styles.certCell, styles.data)}>
                    {CERTIFICATE.lot}
                  </td>
                </tr>
              </tbody>
            </table>
            <table aria-label="Tests" {...stylex.props(styles.tableBlock)}>
              <thead {...stylex.props(styles.tableBlock)}>
                <tr {...stylex.props(styles.certRow, styles.certRowHead)}>
                  <th
                    scope="col"
                    {...stylex.props(styles.tableCell, styles.certCell, styles.certLabel)}
                  >
                    Test
                  </th>
                  <th
                    scope="col"
                    {...stylex.props(styles.tableCell, styles.certCell, styles.certLabel)}
                  >
                    Method
                  </th>
                  <th
                    scope="col"
                    {...stylex.props(
                      styles.tableCell,
                      styles.certCell,
                      styles.certLabel,
                      styles.certNumeric,
                    )}
                  >
                    Specification
                  </th>
                  <th
                    scope="col"
                    {...stylex.props(
                      styles.tableCell,
                      styles.certCell,
                      styles.certLabel,
                      styles.certNumeric,
                    )}
                  >
                    Result
                  </th>
                </tr>
              </thead>
              <tbody {...stylex.props(styles.tableBlock)}>
                {CERTIFICATE.tests.map((row) => (
                  <tr key={row.test} {...stylex.props(styles.certRow)}>
                    <td {...stylex.props(styles.tableCell, styles.certCell)}>{row.test}</td>
                    <td {...stylex.props(styles.tableCell, styles.certCell, styles.data)}>
                      {row.method}
                    </td>
                    <td
                      {...stylex.props(
                        styles.tableCell,
                        styles.certCell,
                        styles.data,
                        styles.certNumeric,
                      )}
                    >
                      {row.specification}
                    </td>
                    <td
                      {...stylex.props(
                        styles.tableCell,
                        styles.certCell,
                        styles.data,
                        styles.certResult,
                      )}
                    >
                      {row.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div {...stylex.props(styles.certDocs)}>
              <span {...stylex.props(styles.certCell, styles.certLabel)}>Document set</span>
              <span {...stylex.props(styles.certCell)}>{TRAVELS_WITH_LOT.join(", ")}.</span>
            </div>
            <div {...stylex.props(styles.certFoot)}>
              <p {...stylex.props(styles.prose)}>
                Certified under {certifications.join(", ")}. Identity, potency and stability are
                validated in {company.hq.city} on every lot; third-party verification on request.
              </p>
              <div {...stylex.props(styles.signature)}>
                <div {...stylex.props(styles.release)}>
                  <span {...stylex.props(styles.data)}>Released {CERTIFICATE.released}</span>
                  <span>Quality control, {company.hq.city}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Bases ─────────────────────────────── */

const AXIS_TICKS = [0, 6, 12, 18, 24];

const hh = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

const tickStyle = (tick: number) =>
  tick === 0 ? styles.tickFirst : tick === 24 ? styles.tickLast : styles.tickMid;

function BasesSection() {
  const rows = BASE_ROWS.map((row) => ({ ...row, ...workdayUtc(row.offset) }));
  const covered = coverage(rows);
  const hours = covered.reduce((sum, span) => sum + (span.end - span.start), 0);
  const gaps: { start: number; end: number }[] = [];
  let cursor = 0;
  for (const span of covered) {
    if (span.start > cursor) gaps.push({ start: cursor, end: span.start });
    cursor = span.end;
  }
  if (cursor < 24) gaps.push({ start: cursor, end: 24 });
  return (
    <section
      id="global-supply"
      aria-labelledby="bases-title"
      {...stylex.props(styles.section, styles.hairlineTop)}
    >
      <div {...stylex.props(styles.container)}>
        <Reveal sx={styles.grid12} style={styles.sectionHead}>
          <p aria-hidden {...stylex.props(styles.display, styles.bigNumber, styles.left7)}>
            {hours}
            <span {...stylex.props(styles.bigNumberUnit)}> h</span>
          </p>
          <h2 id="bases-title" {...stylex.props(styles.display, styles.bigLead, styles.right5)}>
            {hours} hours of every day answered, from six bases on five continents.
          </h2>
        </Reveal>
        <Reveal>
          <table
            aria-label="Working hours of each base, shown in UTC"
            {...stylex.props(styles.chart)}
          >
            <thead {...stylex.props(styles.tableContents)}>
              <tr {...stylex.props(styles.tableContents)}>
                <th
                  scope="col"
                  {...stylex.props(styles.tableCell, styles.small, styles.chartHeadCell)}
                >
                  Base
                </th>
                <th
                  scope="col"
                  aria-label="Hours in UTC"
                  {...stylex.props(styles.tableCell, styles.chartAxis)}
                >
                  {AXIS_TICKS.map((tick) => (
                    <span
                      key={tick}
                      style={{ left: `${(tick / 24) * 100}%` }}
                      {...stylex.props(styles.chartTick, tickStyle(tick))}
                    >
                      {String(tick).padStart(2, "0")}
                      {tick === 0 ? " UTC" : ""}
                    </span>
                  ))}
                </th>
                <th
                  scope="col"
                  {...stylex.props(styles.tableCell, styles.small, styles.chartHeadCell)}
                  style={{ justifyContent: "flex-end", paddingRight: 0, paddingLeft: 24 }}
                >
                  Offset
                </th>
              </tr>
            </thead>
            <tbody {...stylex.props(styles.tableContents)}>
              <tr {...stylex.props(styles.tableContents)}>
                <th
                  scope="row"
                  {...stylex.props(styles.tableCell, styles.chartLabel, styles.chartCoverRow)}
                >
                  <p {...stylex.props(styles.baseCity)}>Coverage, {hours} h</p>
                  <p {...stylex.props(styles.baseRole)}>
                    Unstaffed {hh(covered[covered.length - 1]?.end ?? 0)} –{" "}
                    {hh(covered[0]?.start ?? 0)} UTC
                  </p>
                </th>
                <td
                  aria-label={`${hours} hours covered`}
                  {...stylex.props(styles.tableCell, styles.chartTrack, styles.chartCoverRow)}
                >
                  {covered.map((span) => (
                    <span
                      key={span.start}
                      aria-hidden
                      style={{
                        left: `${(span.start / 24) * 100}%`,
                        width: `${((span.end - span.start) / 24) * 100}%`,
                      }}
                      {...stylex.props(styles.chartCover)}
                    />
                  ))}
                  {gaps.map((gap) => (
                    <span
                      key={gap.start}
                      aria-hidden
                      style={{
                        left: `${(gap.start / 24) * 100}%`,
                        width: `${((gap.end - gap.start) / 24) * 100}%`,
                      }}
                      {...stylex.props(styles.chartGap)}
                    />
                  ))}
                </td>
                <td
                  {...stylex.props(
                    styles.tableCell,
                    styles.data,
                    styles.chartUtc,
                    styles.chartCoverRow,
                  )}
                />
              </tr>

              {rows.map(({ offset, base, start, end }) => (
                <tr key={base.city} {...stylex.props(styles.tableContents)}>
                  <th scope="row" {...stylex.props(styles.tableCell, styles.chartLabel)}>
                    <p {...stylex.props(styles.baseCity)}>{base.city}</p>
                    <p {...stylex.props(styles.baseRole)}>
                      {base.country}, {base.role}
                    </p>
                  </th>
                  <td
                    aria-label={`${hh(start)} to ${hh(end)} UTC`}
                    {...stylex.props(styles.tableCell, styles.chartTrack)}
                  >
                    <span
                      aria-hidden
                      style={{
                        left: `${(start / 24) * 100}%`,
                        width: `${((end - start) / 24) * 100}%`,
                      }}
                      {...stylex.props(styles.chartBar)}
                    />
                  </td>
                  <td {...stylex.props(styles.tableCell, styles.data, styles.chartUtc)}>
                    {utcLabel(offset)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p {...stylex.props(styles.small, styles.chartNote)}>
            Each bar is a base's working day, {hh(WORKDAY.start)} – {hh(WORKDAY.end)} local, drawn
            in UTC. Documentation, compliance and lead times are handled local to the buyer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Contact ─────────────────────────────── */

const CONTACT_ROWS = [
  { key: "Send", value: "The target assay, the delivery format, and the market and volume." },
  {
    key: "Receive",
    value: "A specification with assay, form and dossier within one business day.",
  },
  { key: "Ship", value: "Samples leave once the documentation is accepted." },
];

function FinaleSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" {...stylex.props(styles.finale)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.grid12, styles.finaleGrid)}>
          <div {...stylex.props(styles.left7, styles.finaleLeft)}>
            <Reveal>
              <h2
                id="contact-title"
                {...stylex.props(styles.display, styles.h2, styles.finaleTitle)}
              >
                Send us the target.
                <br />
                We send the specification.
              </h2>
            </Reveal>
            <Reveal delay={STAGGER}>
              <div {...stylex.props(styles.finaleActions)}>
                <a
                  href={createInquiryHref("contact")}
                  {...stylex.props(styles.ctaPrimary, styles.ctaOnDark)}
                >
                  Request a specification
                  <ArrowRight aria-hidden size={16} />
                </a>
                <a href={`mailto:${company.email}`} {...stylex.props(styles.finaleMail)}>
                  {company.email}
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={STAGGER * 2} sx={styles.right5} style={styles.finaleAside}>
            {CONTACT_ROWS.map((row) => (
              <div key={row.key} {...stylex.props(styles.finaleRow)}>
                <p {...stylex.props(styles.finaleKey)}>{row.key}</p>
                <p {...stylex.props(styles.finaleValue)}>{row.value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Footer ─────────────────────────────── */

const subscribeToNothing = () => () => {};
const getCurrentYear = () => new Date().getFullYear();

function FooterSection() {
  const year = useSyncExternalStore(subscribeToNothing, getCurrentYear, getCurrentYear);
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.grid12, styles.footerGrid)}>
          <div {...stylex.props(styles.left7, styles.footerIntro)}>
            <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brand)}>
              <span {...stylex.props(styles.brandWord)}>Fenchem</span>
            </a>
            <p {...stylex.props(styles.prose)}>
              {company.legalName} Standardized botanical actives for nutrition, food and personal
              care since {company.founded}.
            </p>
          </div>
          <div {...stylex.props(styles.right5, styles.footerCol)}>
            <h3 {...stylex.props(styles.smallHead)}>Contact</h3>
            <p {...stylex.props(styles.footerItem)}>
              <a href={`mailto:${company.email}`} {...stylex.props(styles.footerLink)}>
                {company.email}
              </a>
            </p>
            <p {...stylex.props(styles.footerItem)}>
              {company.hq.city}, {company.hq.country}
            </p>
          </div>
        </div>
        <div {...stylex.props(styles.footerBottom)}>
          <span>
            © {year} {company.legalName} {company.hq.city}, {company.hq.country}.
          </span>
          <a href="#top" {...stylex.props(styles.topLink)}>
            Back to top
            <ArrowUp aria-hidden size={12} />
          </a>
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

export function VariantS() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        <SmoothScroll />
        <NavBar />
        <main>
          <HeroSection />
          <IndexSection />
          <CertificateSection />
          <BasesSection />
          <FinaleSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
