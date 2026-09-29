/*
 * PROTOTYPE — Variant U: "Ledger · Stitch corporate".
 *
 * Creative direction derived from a 96-character random seed
 * (`tr -dc 'A-Za-z0-9' </dev/urandom | head -c 96`):
 *
 *   Q1cdjc45qZkW6kx72DF68SUjaIXljGiu7b7wRjrd05NIHY82FgBxWkUkBhg1iL8WUHf54pqX57mZElTGm0iM2rjPZ0DPtxb4
 *
 * What the string dictated:
 *   - 24 of 96 characters are digits — exactly one quarter of the page is
 *     numeric. So the page is a ledger: a KPI band, a full ingredient data
 *     table, a regions table, tabular numerals on every figure.
 *   - Ascending runs `456` and `567` → sequences are laid out as numbered
 *     ledgers (process steps 01–04, region rows 01–06), never decoration.
 *   - `72DF68` is a valid hex colour, a bright green within a hair of
 *     brand-green-400 — so green-400 is the one highlight: 8px status dots
 *     and 2px rules, exactly the Stitch rule for the logo green.
 *   - It opens with `Q1` — a quarter, a report cover — so the hero is a
 *     report cover with a specification card, and the utility strip reads
 *     "Q1 index". `Pt` (platinum) → precision, premium, no ornament.
 *   - Fewest vowels (11) and fewest case flips (29) of the four seeds → the
 *     calmest, most disciplined layout: 8px rhythm, 48–64px between bands,
 *     one sans family, no serif, no marquee, no parallax.
 *
 * DEVIATION NOTE: this variant deliberately applies the Stitch design system
 * "Fenchem B2B Corporate Identity" (Stitch project FENCHEM 泛成 官网桌面端重构,
 * 2026-09-08) where it conflicts with docs/brand/landing-design-principles.md:
 * navy is the ink and the primary CTA surface (the principles say blue is
 * interactive-only and never a surface), green is restricted to dots and
 * hairlines (the principles are green-led), and there is no dark green band.
 * It exists so the two systems can be compared side by side on the same
 * content seam. Plus Jakarta Sans stands in for Noto Sans SC per ADR-0002.
 */
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronsUpDown, Menu, X } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certificationDetails,
  company,
  createInquiryHref,
  industries,
  ingredients,
  navLinks,
  pillars,
  processSteps,
  regions,
  stats,
  toAnchor,
  type Ingredient,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Constants ─────────────────────────────── */

const LEDGER_COLUMNS = ["Code", "Ingredient", "Source", "Assay", "Form", "Application", "Spec"];

const COVER = ingredients[0] ?? null;

function coverRows(ingredient: Ingredient): Array<[string, string]> {
  return [
    ["Code", ingredient.code],
    ["Assay", ingredient.purity],
    ["Form", ingredient.form],
    ["Category", ingredient.category],
    ["Application", ingredient.application],
    ["Use case", ingredient.useCase],
  ];
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ─────────────────────────────── Styles ─────────────────────────────── */

const MD_ONLY = "@media (min-width: 768px) and (max-width: 1023.98px)";

const styles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    color: colors.brandBlue950,
    fontFamily: typography.body,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    fontVariantNumeric: "tabular-nums",
    "::selection": {
      backgroundColor: colors.brandBlue100,
      color: colors.brandBlue950,
    },
  },
  container: {
    maxWidth: 1280,
    marginInline: "auto",
    paddingInline: {
      default: 16,
      [breakpoints.md]: 40,
    },
  },
  band: {
    paddingBlock: {
      default: 40,
      [breakpoints.lg]: 64,
    },
  },
  bandSurface: {
    backgroundColor: colors.mute50,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },

  /* Type */
  labelSm: {
    margin: 0,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: colors.mute600,
  },
  mono: {
    fontFamily: typography.tech,
    fontSize: 11,
    lineHeight: 1.4,
    letterSpacing: "0.08em",
    color: colors.mute600,
  },
  displayLg: {
    margin: 0,
    fontSize: {
      default: 34,
      [breakpoints.md]: 48,
    },
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    color: colors.brandBlue950,
  },
  headlineLg: {
    margin: 0,
    fontSize: {
      default: 26,
      [breakpoints.md]: 32,
    },
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
    color: colors.brandBlue950,
  },
  headlineMd: {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.4,
    color: colors.brandBlue900,
  },
  bodyLg: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.6,
    color: colors.mute700,
    maxWidth: "60ch",
  },
  bodyMd: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.55,
    color: colors.mute700,
  },
  bodySm: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.5,
    color: colors.mute600,
  },

  /* Buttons */
  btnPrimary: {
    display: "inline-flex",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingInline: 22,
    borderRadius: radii.sm,
    borderWidth: 0,
    backgroundColor: {
      default: colors.brandBlue700,
      ":hover": colors.brandBlue800,
    },
    color: colors.paper,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: 3,
  },
  btnSecondary: {
    display: "inline-flex",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingInline: 22,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: colors.line,
      ":hover": colors.brandBlue700,
    },
    backgroundColor: colors.paper,
    color: colors.brandBlue700,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "160ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: 3,
  },
  btnCompact: {
    height: 40,
    paddingInline: 16,
    fontSize: 13,
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 13,
    fontWeight: 600,
    color: colors.brandBlue700,
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textUnderlineOffset: 3,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: 3,
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    paddingBlock: 4,
    paddingInline: 12,
    borderRadius: radii.full,
    backgroundColor: colors.brandBlue50,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.4,
    color: colors.brandBlue900,
    whiteSpace: "nowrap",
  },
  dot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen400,
    flexShrink: 0,
  },

  /* Utility strip + nav */
  strip: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.mute50,
  },
  stripRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    height: 32,
    overflow: "hidden",
  },
  stripGroup: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    whiteSpace: "nowrap",
  },
  stripRight: {
    display: {
      default: "none",
      [breakpoints.md]: "flex",
    },
  },
  stripHideMobile: {
    display: {
      default: "none",
      [breakpoints.md]: "inline",
    },
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 60,
    backgroundColor: colors.paper,
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
  brand: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: colors.brandBlue950,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
    outlineOffset: 4,
  },
  brandMark: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: colors.brandBlue700,
  },
  brandWord: {
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: "0.22em",
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
    fontSize: 14,
    fontWeight: 500,
    color: {
      default: colors.brandBlue900,
      ":hover": colors.brandBlue700,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "160ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
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
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.paper,
    color: colors.brandBlue950,
    cursor: "pointer",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
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
    padding: 0,
    paddingBlock: 8,
    display: "grid",
  },
  mobileLink: {
    display: "block",
    paddingBlock: 14,
    fontSize: 18,
    fontWeight: 600,
    color: colors.brandBlue950,
    textDecoration: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandBlue700}`,
    },
  },
  mobileCtaRow: {
    paddingBlock: 16,
  },

  /* Hero */
  hero: {
    paddingTop: {
      default: 40,
      [breakpoints.lg]: 64,
    },
    paddingBottom: {
      default: 40,
      [breakpoints.lg]: 64,
    },
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 32,
    alignItems: "start",
  },
  heroLeft: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "1 / span 7",
    },
    display: "grid",
    gap: 24,
  },
  heroKicker: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  heroRule: {
    width: 32,
    height: 2,
    backgroundColor: colors.brandGreen400,
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  heroMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  heroRight: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "9 / span 4",
    },
  },
  specCard: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.brandBlue50,
    overflow: "hidden",
  },
  specCardHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingBlock: 12,
    paddingInline: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.brandBlue100,
  },
  specCardTitle: {
    paddingBlock: 16,
    paddingInline: 16,
    display: "grid",
    gap: 4,
  },
  specName: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: colors.brandBlue950,
  },
  kvTable: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },
  kvRow: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  kvKey: {
    paddingBlock: 10,
    paddingInline: 16,
    textAlign: "left",
    fontWeight: 600,
    color: colors.mute600,
    fontSize: 12,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    width: "38%",
    verticalAlign: "top",
  },
  kvVal: {
    paddingBlock: 10,
    paddingInline: 16,
    color: colors.brandBlue950,
    fontWeight: 500,
  },
  specCardFoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBlock: 12,
    paddingInline: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },

  /* KPI band */
  kpiGrid: {
    display: "grid",
    margin: 0,
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(4, minmax(0, 1fr))",
    },
    gap: 16,
  },
  kpiCard: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    borderTopWidth: 2,
    borderTopColor: colors.brandGreen400,
    backgroundColor: colors.paper,
    padding: 20,
    display: "grid",
    gap: 8,
  },
  kpiValue: {
    margin: 0,
    fontSize: {
      default: 28,
      [breakpoints.md]: 34,
    },
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    color: colors.brandBlue950,
  },

  /* Section head */
  sectionHead: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "end",
    gap: 16,
    marginBottom: 24,
  },
  sectionHeadMain: {
    display: "grid",
    gap: 10,
  },
  sectionIndex: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  /* Ledger table */
  card: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.paper,
    overflow: "hidden",
  },
  tableWrap: {
    display: {
      default: "none",
      [breakpoints.lg]: "block",
    },
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },
  th: {
    height: 40,
    paddingInline: 14,
    textAlign: "left",
    backgroundColor: colors.mute100,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: colors.mute600,
    whiteSpace: "nowrap",
  },
  thInner: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  thIcon: {
    width: 12,
    height: 12,
    color: colors.mute400,
  },
  tr: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: {
      default: colors.paper,
      ":hover": colors.mute50,
    },
    transitionProperty: "background-color",
    transitionDuration: "120ms",
  },
  td: {
    height: 40,
    paddingInline: 14,
    verticalAlign: "middle",
    color: colors.mute700,
    whiteSpace: "nowrap",
  },
  tdCode: {
    fontFamily: typography.tech,
    fontSize: 12,
    letterSpacing: "0.06em",
    color: colors.brandBlue900,
  },
  tdName: {
    fontWeight: 600,
    color: colors.brandBlue950,
  },
  tdMuted: {
    color: colors.mute600,
  },
  tdRight: {
    textAlign: "right",
  },
  appCell: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  tableFoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingBlock: 10,
    paddingInline: 14,
    backgroundColor: colors.mute50,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },

  /* Mobile ledger cards */
  cardList: {
    display: {
      default: "grid",
      [breakpoints.lg]: "none",
    },
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: 12,
  },
  ledgerCard: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.mute50,
    padding: 16,
    display: "grid",
    gap: 10,
  },
  ledgerCardHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  ledgerCardRows: {
    display: "grid",
    margin: 0,
    gap: 6,
    fontSize: 13,
  },
  ledgerCardRow: {
    display: "grid",
    gridTemplateColumns: "88px 1fr",
    gap: 12,
  },

  /* Industries */
  threeGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    gap: 16,
  },
  tintCard: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.brandBlue50,
    overflow: "hidden",
    display: "grid",
    gridTemplateRows: "auto 1fr",
    boxShadow: {
      default: "none",
      ":hover": "0 1px 4px rgba(19, 27, 43, 0.05)",
    },
    transitionProperty: "box-shadow",
    transitionDuration: "160ms",
  },
  tintCardImg: {
    display: "block",
    width: "100%",
    aspectRatio: "16 / 9",
    objectFit: "cover",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  tintCardBody: {
    padding: 20,
    display: "grid",
    alignContent: "start",
    gap: 10,
  },
  cardIndex: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.08em",
    color: colors.mute600,
  },

  /* Quality */
  pillarGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    gap: 16,
  },
  pillarCard: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.mute50,
    padding: 20,
    display: "grid",
    alignContent: "start",
    gap: 8,
  },
  processGrid: {
    display: "grid",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gridTemplateColumns: {
      default: "1fr",
      [MD_ONLY]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(4, minmax(0, 1fr))",
    },
    gap: 1,
    backgroundColor: colors.line,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    borderRadius: radii.sm,
    overflow: "hidden",
    marginTop: 16,
  },
  processCell: {
    backgroundColor: colors.paper,
    padding: 20,
    display: "grid",
    alignContent: "start",
    gap: 8,
  },
  processIndex: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.08em",
    color: colors.brandBlue900,
  },
  processRule: {
    flex: 1,
    height: 1,
    backgroundColor: colors.line,
  },
  certList: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [MD_ONLY]: "repeat(3, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(6, minmax(0, 1fr))",
    },
    gap: 12,
    listStyle: "none",
    margin: 0,
    padding: 0,
    marginTop: 16,
  },
  certItem: {
    display: "grid",
    gap: 6,
    paddingBlock: 12,
    paddingInline: 14,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.paper,
  },
  certName: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 600,
    color: colors.brandBlue950,
  },

  /* Contact */
  contactBand: {
    backgroundColor: colors.brandBlue50,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 24,
    alignItems: "center",
  },
  contactMain: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "1 / span 7",
    },
    display: "grid",
    gap: 16,
  },
  contactAside: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "9 / span 4",
    },
    display: "grid",
    gap: 12,
    justifyItems: "start",
  },
  contactMeta: {
    display: "grid",
    gap: 8,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  contactMetaItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: colors.mute700,
  },

  /* Footer */
  footer: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: 40,
    paddingBottom: 24,
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [MD_ONLY]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "2fr 1fr 1fr 1fr",
    },
    gap: 32,
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
    gap: 8,
  },
  footerItem: {
    fontSize: 14,
    color: colors.mute700,
  },
  footerLink: {
    fontSize: 14,
    color: colors.brandBlue700,
    textDecoration: "none",
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
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
});

/* ─────────────────────────────── Chrome ─────────────────────────────── */

function UtilityStrip() {
  return (
    <div {...stylex.props(styles.strip)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.stripRow)}>
          <div {...stylex.props(styles.stripGroup)}>
            <span {...stylex.props(styles.mono)}>Q1 index · 08 specimens</span>
            <span {...stylex.props(styles.mono, styles.stripHideMobile)}>
              ISO 9001 · GMP · FSSC 22000
            </span>
          </div>
          <div {...stylex.props(styles.stripGroup, styles.stripRight)}>
            <span {...stylex.props(styles.mono)}>
              {company.hq.city} HQ · {company.hq.coords}
            </span>
            <span {...stylex.props(styles.mono)}>Response &lt; 24h</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavBar() {
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

  const links = [{ label: "Ledger", href: "#ledger" }].concat(
    navLinks.map((link) => ({ label: link.label, href: toAnchor(link.section) })),
  );

  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.container)}>
        <nav aria-label="Primary navigation" {...stylex.props(styles.navRow)}>
          <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brand)}>
            <span aria-hidden {...stylex.props(styles.brandMark)} />
            <span {...stylex.props(styles.brandWord)}>FENCHEM</span>
          </a>
          <div {...stylex.props(styles.navLinks)}>
            {links.map((link) => (
              <a key={link.href} href={link.href} {...stylex.props(styles.navLink)}>
                {link.label}
              </a>
            ))}
          </div>
          <div {...stylex.props(styles.navRight)}>
            <a
              href={createInquiryHref("contact")}
              {...stylex.props(styles.btnPrimary, styles.btnCompact, styles.navCta)}
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
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
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
                <li {...stylex.props(styles.mobileCtaRow)}>
                  <a
                    href={createInquiryHref("contact")}
                    onClick={() => setOpen(false)}
                    {...stylex.props(styles.btnPrimary)}
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

/* ─────────────────────────────── Hero ─────────────────────────────── */

function HeroSection() {
  return (
    <section id="top" aria-label="Introduction" {...stylex.props(styles.hero)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.heroGrid)}>
          <div {...stylex.props(styles.heroLeft)}>
            <Reveal margin="0px">
              <div {...stylex.props(styles.heroKicker)}>
                <span aria-hidden {...stylex.props(styles.heroRule)} />
                <p {...stylex.props(styles.labelSm)}>
                  {company.legalName} · {company.since}
                </p>
              </div>
            </Reveal>
            <Reveal delay={STAGGER} margin="0px">
              <h1 {...stylex.props(styles.displayLg)}>
                Specified ingredients for formulators in 40+ countries
              </h1>
            </Reveal>
            <Reveal delay={STAGGER * 2} margin="0px">
              <p {...stylex.props(styles.bodyLg)}>
                Standardized botanical actives, carotenoids and bioenergetic compounds — each lot
                shipped with assay, form and a regulatory dossier prepared before sampling.
              </p>
            </Reveal>
            <Reveal delay={STAGGER * 3} margin="0px">
              <div {...stylex.props(styles.heroActions)}>
                <a href="#ledger" {...stylex.props(styles.btnPrimary)}>
                  Open the ledger
                  <ArrowRight aria-hidden size={16} />
                </a>
                <a href={createInquiryHref("contact")} {...stylex.props(styles.btnSecondary)}>
                  Request a specification
                </a>
              </div>
            </Reveal>
            <Reveal delay={STAGGER * 4} margin="0px">
              <div {...stylex.props(styles.heroMeta)}>
                {certificationDetails.slice(0, 4).map((cert) => (
                  <span key={cert.name} {...stylex.props(styles.pill)}>
                    <span aria-hidden {...stylex.props(styles.dot)} />
                    {cert.name}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {COVER ? (
            <Reveal delay={STAGGER * 2} margin="0px" sx={styles.heroRight}>
              <article aria-label="Specification card" {...stylex.props(styles.specCard)}>
                <div {...stylex.props(styles.specCardHead)}>
                  <span {...stylex.props(styles.labelSm)}>Specification</span>
                  <span {...stylex.props(styles.mono)}>{COVER.code}</span>
                </div>
                <div {...stylex.props(styles.specCardTitle)}>
                  <h2 {...stylex.props(styles.specName)}>{COVER.name}</h2>
                  <p {...stylex.props(styles.bodySm)}>{COVER.latin}</p>
                </div>
                <table {...stylex.props(styles.kvTable)}>
                  <tbody>
                    {coverRows(COVER).map(([key, value]) => (
                      <tr key={key} {...stylex.props(styles.kvRow)}>
                        <th scope="row" {...stylex.props(styles.kvKey)}>
                          {key}
                        </th>
                        <td {...stylex.props(styles.kvVal)}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div {...stylex.props(styles.specCardFoot)}>
                  <span {...stylex.props(styles.appCell, styles.bodySm)}>
                    <span aria-hidden {...stylex.props(styles.dot)} />
                    Documentation available
                  </span>
                  <a href={createInquiryHref("industries")} {...stylex.props(styles.link)}>
                    Request dossier
                    <ArrowUpRight aria-hidden size={14} />
                  </a>
                </div>
              </article>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── KPI band ─────────────────────────────── */

function KpiBand() {
  return (
    <section aria-label="Key figures" {...stylex.props(styles.band, styles.bandSurface)}>
      <div {...stylex.props(styles.container)}>
        <Reveal>
          <dl {...stylex.props(styles.kpiGrid)}>
            {stats.map((stat) => (
              <div key={stat.label} {...stylex.props(styles.kpiCard)}>
                <dt {...stylex.props(styles.kpiValue)}>{stat.value}</dt>
                <dd {...stylex.props(styles.bodySm)}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Section head ─────────────────────────────── */

function SectionHead({
  index,
  label,
  title,
  aside,
}: {
  index: string;
  label: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <Reveal sx={styles.sectionHead}>
      <div {...stylex.props(styles.sectionHeadMain)}>
        <div {...stylex.props(styles.sectionIndex)}>
          <span {...stylex.props(styles.mono)}>{index}</span>
          <span aria-hidden {...stylex.props(styles.heroRule)} />
          <p {...stylex.props(styles.labelSm)}>{label}</p>
        </div>
        <h2 {...stylex.props(styles.headlineLg)}>{title}</h2>
      </div>
      {aside}
    </Reveal>
  );
}

/* ─────────────────────────────── Ledger ─────────────────────────────── */

function LedgerSection() {
  return (
    <section id="ledger" aria-labelledby="ledger-title" {...stylex.props(styles.band)}>
      <div {...stylex.props(styles.container)}>
        <SectionHead
          index="01"
          label="Ingredient ledger"
          title="Eight actives, one specification each"
          aside={
            <a href={createInquiryHref("industries")} {...stylex.props(styles.link)}>
              Full portfolio
              <ArrowUpRight aria-hidden size={14} />
            </a>
          }
        />
        <Reveal delay={STAGGER}>
          <div {...stylex.props(styles.card)}>
            <div {...stylex.props(styles.tableWrap)}>
              <table {...stylex.props(styles.table)}>
                <thead>
                  <tr>
                    {LEDGER_COLUMNS.map((column, i) => (
                      <th
                        key={column}
                        scope="col"
                        {...stylex.props(
                          styles.th,
                          i === LEDGER_COLUMNS.length - 1 && styles.tdRight,
                        )}
                      >
                        <span {...stylex.props(styles.thInner)}>
                          {column}
                          {i < LEDGER_COLUMNS.length - 1 ? (
                            <ChevronsUpDown aria-hidden {...stylex.props(styles.thIcon)} />
                          ) : null}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map((ingredient) => (
                    <tr key={ingredient.code} {...stylex.props(styles.tr)}>
                      <td {...stylex.props(styles.td, styles.tdCode)}>{ingredient.code}</td>
                      <td {...stylex.props(styles.td, styles.tdName)}>{ingredient.name}</td>
                      <td {...stylex.props(styles.td, styles.tdMuted)}>{ingredient.latin}</td>
                      <td {...stylex.props(styles.td)}>{ingredient.purity}</td>
                      <td {...stylex.props(styles.td, styles.tdMuted)}>{ingredient.form}</td>
                      <td {...stylex.props(styles.td)}>
                        <span {...stylex.props(styles.appCell)}>
                          <span aria-hidden {...stylex.props(styles.dot)} />
                          {ingredient.application}
                        </span>
                      </td>
                      <td {...stylex.props(styles.td, styles.tdRight)}>
                        <a href={createInquiryHref("industries")} {...stylex.props(styles.link)}>
                          Spec
                          <ArrowUpRight aria-hidden size={13} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul aria-label="Ingredient ledger" {...stylex.props(styles.cardList)}>
              {ingredients.map((ingredient) => (
                <li key={ingredient.code} {...stylex.props(styles.ledgerCard)}>
                  <div {...stylex.props(styles.ledgerCardHead)}>
                    <span {...stylex.props(styles.mono)}>{ingredient.code}</span>
                    <span {...stylex.props(styles.pill)}>
                      <span aria-hidden {...stylex.props(styles.dot)} />
                      {ingredient.application}
                    </span>
                  </div>
                  <div>
                    <h3 {...stylex.props(styles.headlineMd)}>{ingredient.name}</h3>
                    <p {...stylex.props(styles.bodySm)}>{ingredient.latin}</p>
                  </div>
                  <dl {...stylex.props(styles.ledgerCardRows)}>
                    {(
                      [
                        ["Assay", ingredient.purity],
                        ["Form", ingredient.form],
                        ["Category", ingredient.category],
                      ] as const
                    ).map(([key, value]) => (
                      <div key={key} {...stylex.props(styles.ledgerCardRow)}>
                        <dt {...stylex.props(styles.labelSm)}>{key}</dt>
                        <dd {...stylex.props(styles.bodyMd)} style={{ margin: 0 }}>
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <a href={createInquiryHref("industries")} {...stylex.props(styles.link)}>
                    Request specification
                    <ArrowUpRight aria-hidden size={13} />
                  </a>
                </li>
              ))}
            </ul>
            <div {...stylex.props(styles.tableFoot)}>
              <span {...stylex.props(styles.mono)}>
                {pad(ingredients.length)} rows · assay and form per lot
              </span>
              <span {...stylex.props(styles.mono)}>Documentation before sampling</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Industries ─────────────────────────────── */

function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-title"
      {...stylex.props(styles.band, styles.bandSurface)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHead index="02" label="Industries" title="Three markets, one chain of custody" />
        <div {...stylex.props(styles.threeGrid)}>
          {industries.map((industry, i) => (
            <Reveal key={industry.title} delay={STAGGER * i} sx={styles.tintCard}>
              <img
                src={industry.image.src}
                alt={industry.image.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.tintCardImg)}
              />
              <div {...stylex.props(styles.tintCardBody)}>
                <span {...stylex.props(styles.cardIndex)}>
                  {pad(i + 1)} / {pad(industries.length)}
                </span>
                <h3 {...stylex.props(styles.headlineMd)}>{industry.title}</h3>
                <p {...stylex.props(styles.bodyMd)}>{industry.copy}</p>
                <a href={createInquiryHref("industries")} {...stylex.props(styles.link)}>
                  Explore actives
                  <ArrowUpRight aria-hidden size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Quality ─────────────────────────────── */

function QualitySection() {
  return (
    <section id="quality" aria-labelledby="quality-title" {...stylex.props(styles.band)}>
      <div {...stylex.props(styles.container)}>
        <SectionHead
          index="03"
          label="Quality"
          title="Identity, potency and stability validated on every lot"
        />
        <Reveal>
          <div {...stylex.props(styles.pillarGrid)}>
            {pillars.map((pillar, i) => (
              <div key={pillar.title} {...stylex.props(styles.pillarCard)}>
                <span {...stylex.props(styles.cardIndex)}>{pad(i + 1)}</span>
                <h3 {...stylex.props(styles.headlineMd)}>{pillar.title}</h3>
                <p {...stylex.props(styles.bodyMd)}>{pillar.copy}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={STAGGER}>
          <ol aria-label="Process" {...stylex.props(styles.processGrid)}>
            {processSteps.map((step, i) => (
              <li key={step.title} {...stylex.props(styles.processCell)}>
                <span {...stylex.props(styles.processIndex)}>
                  Step {pad(i + 1)}
                  <span aria-hidden {...stylex.props(styles.processRule)} />
                </span>
                <h3 {...stylex.props(styles.headlineMd)}>{step.title}</h3>
                <p {...stylex.props(styles.bodySm)}>{step.copy}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={STAGGER * 2}>
          <ul aria-label="Certifications" {...stylex.props(styles.certList)}>
            {certificationDetails.map((cert) => (
              <li key={cert.name} {...stylex.props(styles.certItem)}>
                <span {...stylex.props(styles.certName)}>
                  <span aria-hidden {...stylex.props(styles.dot)} />
                  {cert.name}
                </span>
                <span {...stylex.props(styles.labelSm)}>{cert.sub}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Global ─────────────────────────────── */

function GlobalSection() {
  return (
    <section
      id="global-supply"
      aria-labelledby="global-title"
      {...stylex.props(styles.band, styles.bandSurface)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHead
          index="04"
          label="Global supply"
          title="Six bases on three continents"
          aside={
            <span {...stylex.props(styles.mono)}>
              HQ {company.hq.city} · {company.hq.coords}
            </span>
          }
        />
        <Reveal>
          <div {...stylex.props(styles.card)}>
            <div style={{ overflowX: "auto" }}>
              <table {...stylex.props(styles.table)}>
                <thead>
                  <tr>
                    <th scope="col" {...stylex.props(styles.th)}>
                      #
                    </th>
                    <th scope="col" {...stylex.props(styles.th)}>
                      City
                    </th>
                    <th scope="col" {...stylex.props(styles.th)}>
                      Country
                    </th>
                    <th scope="col" {...stylex.props(styles.th)}>
                      Role
                    </th>
                    <th scope="col" {...stylex.props(styles.th, styles.tdRight)}>
                      Coordinates
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {regions.map((region, i) => (
                    <tr key={region.city} {...stylex.props(styles.tr)}>
                      <td {...stylex.props(styles.td, styles.tdCode)}>{pad(i + 1)}</td>
                      <td {...stylex.props(styles.td, styles.tdName)}>{region.city}</td>
                      <td {...stylex.props(styles.td)}>{region.country}</td>
                      <td {...stylex.props(styles.td, styles.tdMuted)}>{region.role}</td>
                      <td {...stylex.props(styles.td, styles.tdCode, styles.tdRight)}>
                        {region.coords}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Contact ─────────────────────────────── */

function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      {...stylex.props(styles.band, styles.contactBand)}
    >
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.contactGrid)}>
          <Reveal sx={styles.contactMain}>
            <div {...stylex.props(styles.sectionIndex)}>
              <span {...stylex.props(styles.mono)}>05</span>
              <span aria-hidden {...stylex.props(styles.heroRule)} />
              <p {...stylex.props(styles.labelSm)}>Contact</p>
            </div>
            <h2 id="contact-title" {...stylex.props(styles.headlineLg)}>
              Send the target specification. We return assay, form and dossier within 24 hours.
            </h2>
            <p {...stylex.props(styles.bodyMd)}>
              Regulatory documentation for more than forty markets is prepared before you ask.
            </p>
          </Reveal>
          <Reveal delay={STAGGER} sx={styles.contactAside}>
            <a href={createInquiryHref("contact")} {...stylex.props(styles.btnPrimary)}>
              Request a specification
              <ArrowRight aria-hidden size={16} />
            </a>
            <a href={`mailto:${company.email}`} {...stylex.props(styles.link)}>
              {company.email}
            </a>
            <ul {...stylex.props(styles.contactMeta)}>
              <li {...stylex.props(styles.contactMetaItem)}>
                <span aria-hidden {...stylex.props(styles.dot)} />
                Response &lt; 24h
              </li>
              <li {...stylex.props(styles.contactMetaItem)}>
                <span aria-hidden {...stylex.props(styles.dot)} />
                Documentation before sampling
              </li>
            </ul>
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
        <div {...stylex.props(styles.footerGrid)}>
          <div {...stylex.props(styles.footerCol)}>
            <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brand)}>
              <span aria-hidden {...stylex.props(styles.brandMark)} />
              <span {...stylex.props(styles.brandWord)}>FENCHEM</span>
            </a>
            <p {...stylex.props(styles.bodySm)}>{company.tagline}</p>
            <span {...stylex.props(styles.mono)}>
              {company.legalName} · {company.since}
            </span>
          </div>
          <div {...stylex.props(styles.footerCol)}>
            <h3 {...stylex.props(styles.labelSm)}>Sections</h3>
            <ul {...stylex.props(styles.footerList)}>
              {navLinks.map((link) => (
                <li key={link.section}>
                  <a href={toAnchor(link.section)} {...stylex.props(styles.footerLink)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div {...stylex.props(styles.footerCol)}>
            <h3 {...stylex.props(styles.labelSm)}>Bases</h3>
            <ul {...stylex.props(styles.footerList)}>
              {regions.map((region) => (
                <li key={region.city} {...stylex.props(styles.footerItem)}>
                  {region.city}, {region.country}
                </li>
              ))}
            </ul>
          </div>
          <div {...stylex.props(styles.footerCol)}>
            <h3 {...stylex.props(styles.labelSm)}>Contact</h3>
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
        <div {...stylex.props(styles.footerBottom)}>
          <span {...stylex.props(styles.mono)}>
            © {year} {company.legalName}
          </span>
          <span {...stylex.props(styles.mono)}>Edition U · Q1 ledger</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── Page ─────────────────────────────── */

export function VariantU() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        <UtilityStrip />
        <NavBar />
        <main>
          <HeroSection />
          <KpiBand />
          <LedgerSection />
          <IndustriesSection />
          <QualitySection />
          <GlobalSection />
          <ContactSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
