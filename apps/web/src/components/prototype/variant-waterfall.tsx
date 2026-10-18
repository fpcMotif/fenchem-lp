/*
 * PROTOTYPE — Variant Waterfall: "Record"
 * B2B landing page on warm paper. The hero sets a certificate of analysis as a white sheet
 * beside the lead; the catalogue carries the lot record as an expanded row; one lot number,
 * set at display scale and cut at half its cap height by the next section's rule, threads
 * the two halves of the page together.
 *
 * Type rule, one voice per kind of content:
 *   Mono (13px, ink, tabular, 20px line): code (FN-014), lot (L-2604-014), method (HPLC),
 *     threshold (≥ 5%) and measured result (5.6%, Conforms). The stamp and the lot caption
 *     are the two labels tied to a lot, so they share the voice. Nothing else is mono.
 *   Sans: prose, labels, product names, forms, applications, buttons.
 *   Species names: the display serif in true italic, at the row's size, everywhere.
 *   Display serif: the headline, 64px section heads, the FN-014 anchor and the lot figure,
 *     all tracked -0.015em.
 * Green marks a measured result and a selected control; nothing else. Thresholds stay ink.
 * Spacing: 96px at every section boundary. Full-bleed rules only between sections;
 * every rule inside a section is bound to the container.
 * Middot only inside a physical-form value ("Root extract · powder").
 */
import { For, Show, createMemo, createSignal } from "solid-js";
import type { JSX } from "@solidjs/web";
import { AnimatePresence, LazyMotion, domAnimation, m } from "@/compat/motion";
import { Check, Menu, Search, X } from "@fenchem-lp/ui/components/lucide";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, typography } from "@fenchem-lp/ui/tokens.stylex";
import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certifications,
  company,
  createInquiryHref,
  getIngredientsByApplication,
  ingredients,
  regions,
  type Ingredient,
  type IngredientApplication,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Content ─────────────────────────────── */

const NAV_LINKS = [
  { label: "Portfolio", href: "#matrix" },
  { label: "Dossier", href: "#dossier" },
  { label: "Formulation", href: "#formulation" },
  { label: "Contact", href: "#contact" },
] as const;

const REQUEST_LABEL = "Request a specification";
const SPECIMEN_LABEL = "Request the specimen certificate";

const APPLICATIONS: readonly IngredientApplication[] = [
  "Nutrition",
  "Food & Beverage",
  "Personal Care",
] as const;
const FORMATS = ["Powder", "Beadlet", "Oil suspension", "Granular"] as const;
const CERTIFICATION_SETS = [
  "ISO 9001 + GMP",
  "FSSC 22000 + HACCP",
  "Kosher + Halal",
  "USP monograph",
] as const;

/** Standard-time offsets for the six bases in `regions`. */
const UTC_OFFSET_BY_CITY: Record<string, string> = {
  Nanjing: "UTC+8",
  Hackensack: "UTC−5",
  Frankfurt: "UTC+1",
  Johannesburg: "UTC+2",
  "São Paulo": "UTC−3",
  "Kuala Lumpur": "UTC+8",
};

const DOSSIER_CODE = "FN-014";
const DOSSIER_LOT = "L-2604-014";
const dossierActive: Ingredient =
  ingredients.find((item) => item.code === DOSSIER_CODE) ?? ingredients[0];

const SPECIMEN_HREF = `mailto:${company.email}?subject=${encodeURIComponent(
  `Specimen certificate of analysis, ${DOSSIER_CODE}, lot ${DOSSIER_LOT}`,
)}`;

const CERTIFICATE_TESTS = [
  {
    test: "Identity",
    method: "HPTLC vs reference",
    specification: "Matches reference",
    result: "Conforms",
  },
  { test: "Assay, withanolides", method: "HPLC", specification: "≥ 5.0%", result: "5.6%" },
  {
    test: "Loss on drying",
    method: "Gravimetric 105 °C",
    specification: "≤ 8.0%",
    result: "4.2%",
  },
  { test: "Heavy metals", method: "ICP-MS", specification: "≤ 10 ppm", result: "< 1 ppm" },
  {
    test: "Total plate count",
    method: "Pour plate",
    specification: "≤ 10,000 cfu/g",
    result: "< 100 cfu/g",
  },
] as const;

/** The dossier, in the order a buyer's quality team asks for it. */
const DOCUMENTS = [
  { name: "Certificate of analysis", scope: "Per lot" },
  { name: "Specification sheet", scope: "Per product" },
  { name: "Safety data sheet", scope: "Per product" },
  { name: "Regulatory dossier", scope: "Per product" },
  { name: "Allergen statement", scope: "Per product" },
] as const;

/* ─────────────────────────────── Surfaces ─────────────────────────────── */

/** Warm paper ground; the certificate is the one white sheet on it. */
const PAPER = "#FBFAF7";
const SHEET = "#FFFFFF";
const SHEET_LINE = "rgba(0, 0, 0, 0.18)";
const STAMP_RED = "#B4231C";
const ROW_HOVER = "rgba(0, 0, 0, 0.03)";
const SECTION_GAP = 96;

/*
 * The lot figure. "L-2604-014" runs 5.47em wide; 18vw − 14px keeps it inside the container
 * at every width. Newsreader at line-height 1: baseline 0.735em below the line-box top,
 * cap height 0.715em, so the caps start 0.02em down and half a cap is 0.3575em.
 */
const LOT_SIZE = "min(200px, calc(18vw - 14px))";
const LOT_CAP_TOP = "-0.02em";
const LOT_HALF_CAP = "0.3575em";

/* ─────────────────────────────── Styles ─────────────────────────────── */

const styles = stylex.create({
  root: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: PAPER,
    fontFamily: typography.body,
    color: colors.ink,
    WebkitFontSmoothing: "antialiased",
    "::selection": {
      backgroundColor: colors.mute200,
      color: colors.ink,
    },
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
  container: {
    width: "100%",
    maxWidth: 1232,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: {
      default: 24,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 24,
      [breakpoints.md]: 40,
    },
  },
  /* The three voices */
  mono: {
    fontFamily: typography.tech,
    fontSize: 13,
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: "20px",
    fontVariantNumeric: "tabular-nums",
    color: colors.ink,
    whiteSpace: "nowrap",
  },
  species: {
    fontFamily: typography.display,
    fontStyle: "italic",
    fontWeight: 400,
    color: colors.mute700,
  },
  // Newsreader's x-height runs smaller than the sans; one size up keeps the row even.
  speciesMd: {
    fontSize: 15,
  },
  speciesLg: {
    fontSize: 16,
  },
  /* Header */
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    height: 72,
    display: "flex",
    alignItems: "center",
    backgroundColor: PAPER,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
  },
  wordmark: {
    margin: 0,
    fontFamily: typography.display,
    fontSize: 26,
    fontWeight: 500,
    letterSpacing: "-0.02em",
    lineHeight: 1,
    color: colors.ink,
    textDecoration: "none",
  },
  navDesktop: {
    display: {
      default: "none",
      [breakpoints.md]: "flex",
    },
    alignItems: "center",
    gap: 28,
  },
  navLink: {
    fontSize: 14,
    fontWeight: 500,
    color: {
      default: colors.mute700,
      ":hover": colors.ink,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  headerCta: {
    // Hidden in the md–lg tier: the desktop nav and the CTA do not both fit at 768–1023.
    display: {
      default: "none",
      "@media (min-width: 640px) and (max-width: 767.98px)": "inline-flex",
      [breakpoints.lg]: "inline-flex",
    },
  },
  /* Mobile nav */
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
    borderWidth: 0,
    backgroundColor: "transparent",
    color: colors.ink,
    cursor: "pointer",
  },
  mobileMenuPopover: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "100%",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: PAPER,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  mobileMenuList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  mobileNavLink: {
    display: "block",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 500,
    color: colors.ink,
    textDecoration: "none",
  },
  /* The one button and the one text link; every control is 44px tall */
  btn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: {
      default: colors.ink,
      ":hover": colors.mute800,
    },
    fontFamily: typography.body,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1,
    whiteSpace: "nowrap",
    color: colors.paper,
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.ink}`,
    },
    outlineOffset: 2,
  },
  textLink: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 8,
    fontFamily: typography.body,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "20px",
    color: {
      default: colors.ink,
      ":hover": colors.mute600,
    },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  /* Section scaffolding: one padding, one full-bleed hairline, one heading model */
  section: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: SECTION_GAP,
    paddingBottom: SECTION_GAP,
  },
  sectionHead: {
    marginBottom: 40,
  },
  h2: {
    marginTop: 0,
    marginBottom: 0,
    maxWidth: 980,
    fontFamily: typography.display,
    fontSize: {
      default: 40,
      [breakpoints.md]: 64,
    },
    fontWeight: 400,
    lineHeight: 1.05,
    letterSpacing: "-0.015em",
    color: colors.ink,
    textWrap: "balance",
  },
  lead: {
    marginTop: 20,
    marginBottom: 0,
    maxWidth: 620,
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 1.6,
    color: colors.mute700,
  },
  /* Hero: the headline runs the full measure; lead, dossier list and certificate hang from one rule */
  hero: {
    paddingTop: {
      default: 112,
      [breakpoints.lg]: 136,
    },
    paddingBottom: SECTION_GAP,
  },
  heroHeading: {
    margin: 0,
    fontFamily: typography.display,
    fontSize: {
      default: 48,
      "@media (min-width: 640px) and (max-width: 1023.98px)": 64,
      "@media (min-width: 1024px) and (max-width: 1279.98px)": 80,
      [breakpoints.xl]: 96,
    },
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.015em",
    color: colors.ink,
  },
  heroLine: {
    display: "block",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      "@media (min-width: 1024px) and (max-width: 1279.98px)": "minmax(0, 4fr) minmax(0, 8fr)",
      [breakpoints.xl]: "minmax(0, 5fr) minmax(0, 7fr)",
    },
    columnGap: 48,
    rowGap: 40,
    alignItems: "start",
    marginTop: {
      default: 40,
      [breakpoints.lg]: 56,
    },
    // Container-bound rule; both columns start 24px below it, so no border doubles it.
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  heroText: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
  },
  heroLead: {
    marginTop: 0,
    marginBottom: 0,
    maxWidth: 460,
    fontFamily: typography.body,
    fontSize: {
      default: 17,
      [breakpoints.sm]: 18,
    },
    lineHeight: 1.55,
    color: colors.mute700,
  },
  heroDocs: {
    marginTop: 32,
  },
  heroDocsTitle: {
    margin: 0,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: "20px",
    color: colors.mute600,
  },
  heroDocList: {
    listStyle: "none",
    margin: 0,
    marginTop: 8,
    padding: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  // Rows share the catalogue's 56px rhythm so the column meets the certificate's base.
  heroDocItem: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: 16,
    minHeight: 56,
    paddingTop: 18,
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    fontFamily: typography.body,
    fontSize: 15,
    lineHeight: "20px",
    color: colors.ink,
  },
  heroDocScope: {
    fontSize: 13,
    color: colors.mute600,
    whiteSpace: "nowrap",
  },
  // Pushed to the column's foot so the button's base meets the certificate's base.
  heroActions: {
    marginTop: "auto",
    paddingTop: 32,
  },
  /* Certificate of analysis: one white sheet, sans labels, mono values, 44px rows */
  cert: {
    width: "100%",
    margin: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: SHEET_LINE,
    backgroundColor: SHEET,
    fontFamily: typography.body,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    color: colors.ink,
  },
  certHead: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  certCode: {
    margin: 0,
    fontFamily: typography.display,
    fontSize: 44,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.015em",
    color: colors.ink,
  },
  certIdentity: {
    margin: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  certIdRow: {
    display: "grid",
    gridTemplateColumns: "110px minmax(0, 1fr)",
    columnGap: 16,
    alignItems: "baseline",
    minHeight: 44,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  certIdRowLast: {
    borderBottomWidth: 0,
  },
  certTerm: {
    margin: 0,
    color: colors.mute600,
  },
  certValue: {
    margin: 0,
    fontSize: 14,
    color: colors.ink,
  },
  certTableWrap: {
    overflowX: "auto",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  certTable: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  certTh: {
    height: 44,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    fontWeight: 400,
    color: colors.mute600,
    whiteSpace: "nowrap",
  },
  certTd: {
    height: 44,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    color: colors.ink,
    whiteSpace: "nowrap",
  },
  certCellFirst: {
    paddingLeft: 20,
  },
  certCellLast: {
    paddingRight: 20,
  },
  certRowEnd: {
    borderBottomWidth: 0,
  },
  certResult: {
    color: colors.brandGreen700,
  },
  certFoot: {
    display: "flex",
    alignItems: "center",
    minHeight: 60,
    margin: 0,
    paddingLeft: 24,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  certStamp: {
    display: "inline-block",
    paddingTop: 6,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: STAMP_RED,
    fontFamily: typography.tech,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.16em",
    color: STAMP_RED,
    whiteSpace: "nowrap",
    transform: "rotate(-6deg)",
    transformOrigin: "center",
  },
  /* Matrix */
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  tabs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    marginBottom: -1,
  },
  tab: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    backgroundColor: "transparent",
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transitionProperty: "color, border-color",
    transitionDuration: "150ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.ink}`,
    },
  },
  tabActive: {
    borderBottomColor: colors.brandGreen950,
    color: colors.brandGreen950,
  },
  tabInactive: {
    borderBottomColor: "transparent",
    color: {
      default: colors.mute600,
      ":hover": colors.ink,
    },
  },
  search: {
    position: "relative",
    width: {
      default: "100%",
      [breakpoints.sm]: 280,
    },
    marginBottom: 8,
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: colors.mute500,
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    height: 44,
    margin: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: colors.line,
      ":hover": colors.mute500,
      ":focus": colors.ink,
    },
    borderRadius: 0,
    appearance: "none",
    backgroundColor: SHEET,
    paddingLeft: 12,
    paddingRight: 12,
    fontFamily: typography.body,
    fontSize: 15,
    color: colors.ink,
    outline: "none",
    "::placeholder": {
      color: colors.mute500,
    },
  },
  searchInput: {
    paddingLeft: 36,
    fontSize: 14,
  },
  tableScroll: {
    // Positioned so the visually hidden header text is clipped with the table, not the page.
    position: "relative",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    minWidth: 900,
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    paddingTop: 20,
    paddingBottom: 12,
    paddingLeft: 0,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.ink,
    fontFamily: typography.body,
    fontSize: 13,
    fontWeight: 500,
    color: colors.mute600,
    whiteSpace: "nowrap",
  },
  thRight: {
    paddingRight: 0,
    textAlign: "right",
  },
  row: {
    backgroundColor: {
      default: "transparent",
      ":hover": ROW_HOVER,
    },
    cursor: "pointer",
  },
  td: {
    height: 56,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    verticalAlign: "middle",
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: "20px",
    color: colors.mute700,
  },
  tdRight: {
    paddingRight: 0,
    textAlign: "right",
    whiteSpace: "nowrap",
  },
  cellName: {
    fontSize: 15,
    fontWeight: 600,
    color: colors.ink,
    whiteSpace: "nowrap",
  },
  cellLatin: {
    fontSize: 16,
  },
  cellDash: {
    fontFamily: typography.body,
    fontSize: 14,
    color: colors.mute500,
  },
  // The arrow is a hover affordance; it shows on the row's hover, on its own focus, and on touch.
  rowLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 44,
    height: 44,
    fontFamily: typography.body,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1,
    color: {
      default: colors.ink,
      ":hover": colors.mute600,
    },
    textDecoration: "none",
    opacity: {
      default: 0,
      ":focus-visible": 1,
      "@media (hover: none)": 1,
    },
    transitionProperty: "opacity, color",
    transitionDuration: "150ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.ink}`,
    },
    outlineOffset: -2,
  },
  rowLinkVisible: {
    opacity: 1,
  },
  tableFoot: {
    marginTop: 16,
    marginBottom: 0,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: "20px",
    color: colors.mute600,
  },
  emptyCell: {
    height: "auto",
    paddingTop: 48,
    paddingBottom: 48,
    textAlign: "center",
  },
  emptyText: {
    margin: 0,
    fontSize: 14,
    color: colors.mute600,
  },
  clearBtn: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 500,
    color: colors.ink,
    textDecoration: "underline",
    textUnderlineOffset: 4,
    cursor: "pointer",
  },
  /* The lot record, folded into the catalogue as an expanded row */
  expandedCell: {
    height: "auto",
    paddingTop: 24,
    paddingBottom: 10,
    paddingRight: 0,
    cursor: "default",
  },
  expandedTitle: {
    margin: 0,
    marginBottom: 16,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 12,
    fontFamily: typography.body,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: "20px",
    color: colors.ink,
  },
  expandedGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.md]: "repeat(4, minmax(0, 1fr))",
    },
    columnGap: 32,
    rowGap: 0,
    margin: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  expandedItem: {
    paddingTop: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    lineHeight: "20px",
    whiteSpace: "normal",
  },
  // The last grid row drops its rule so the cell's own rule closes the panel: the last
  // four items at four columns, the last two at two.
  expandedItemTail: {
    borderBottomWidth: {
      default: 1,
      [breakpoints.md]: 0,
    },
  },
  expandedItemEnd: {
    borderBottomWidth: 0,
  },
  expandedTerm: {
    margin: 0,
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.mute600,
  },
  expandedValue: {
    margin: 0,
    marginTop: 4,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: "20px",
    color: colors.ink,
  },
  /* Lot thread: 96px above, a mono caption, then the figure cut at half its cap height */
  lotBand: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: SECTION_GAP,
  },
  lotCaption: {
    margin: 0,
    fontFamily: typography.tech,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    fontVariantNumeric: "tabular-nums",
    color: colors.mute600,
  },
  lotCrop: {
    marginTop: 24,
    overflow: "hidden",
    fontSize: LOT_SIZE,
    height: LOT_HALF_CAP,
  },
  lotFigure: {
    margin: 0,
    marginTop: LOT_CAP_TOP,
    fontFamily: typography.display,
    fontSize: "1em",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.015em",
    fontVariantNumeric: "lining-nums",
    whiteSpace: "nowrap",
    color: colors.ink,
  },
  /* Formulation: both columns start on one ink rule with a 44px head row */
  formulationGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 7fr) minmax(0, 5fr)",
    },
    columnGap: 48,
    rowGap: 40,
    alignItems: "start",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    margin: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.ink,
  },
  fieldset: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
    minWidth: 0,
  },
  legend: {
    display: "flex",
    alignItems: "center",
    height: 44,
    padding: 0,
    margin: 0,
    fontFamily: typography.body,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: "20px",
    color: colors.ink,
  },
  optionGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.sm]: "repeat(3, minmax(0, 1fr))",
    },
    gap: 8,
  },
  option: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: 44,
    paddingLeft: 12,
    paddingRight: 36,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 0,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    textAlign: "left",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transitionProperty: "background-color, border-color, color",
    transitionDuration: "150ms",
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.ink}`,
    },
    outlineOffset: 2,
  },
  // Selected = green, the same green that marks a verified result.
  optionActive: {
    backgroundColor: colors.brandGreen950,
    borderColor: colors.brandGreen950,
    color: colors.paper,
  },
  optionInactive: {
    backgroundColor: SHEET,
    borderColor: {
      default: colors.line,
      ":hover": colors.mute500,
    },
    color: colors.ink,
  },
  optionCheck: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    width: 14,
    height: 14,
    color: colors.paper,
  },
  fields: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.sm]: "repeat(2, minmax(0, 1fr))",
    },
    gap: 12,
  },
  fieldWide: {
    gridColumn: {
      default: null,
      [breakpoints.sm]: "1 / -1",
    },
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
  },
  fieldLabel: {
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.mute600,
  },
  formActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
  },
  formNote: {
    margin: 0,
    fontFamily: typography.body,
    fontSize: 13,
    color: colors.mute600,
  },
  brief: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.ink,
  },
  briefHead: {
    display: "flex",
    alignItems: "center",
    minHeight: 44,
    paddingTop: 12,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  briefTitle: {
    margin: 0,
    fontFamily: typography.body,
    fontSize: 15,
    fontWeight: 600,
    lineHeight: "20px",
    color: colors.ink,
  },
  briefRows: {
    margin: 0,
  },
  specRow: {
    display: "grid",
    gridTemplateColumns: "128px minmax(0, 1fr)",
    columnGap: 16,
    alignItems: "baseline",
    minHeight: 44,
    paddingTop: 12,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    lineHeight: "20px",
  },
  specTerm: {
    margin: 0,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: "20px",
    color: colors.mute600,
  },
  specValue: {
    margin: 0,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: "20px",
    fontVariantNumeric: "tabular-nums",
    color: colors.ink,
  },
  matchTitle: {
    marginTop: 24,
    marginBottom: 0,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: "20px",
    color: colors.mute600,
  },
  matchList: {
    listStyle: "none",
    margin: 0,
    marginTop: 8,
    padding: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  // Sans name and mono value share one 20px line and sit on one baseline.
  matchRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: 16,
    minHeight: 44,
    paddingTop: 12,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    lineHeight: "20px",
  },
  matchName: {
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: "20px",
    color: colors.ink,
  },
  matchLatin: {
    marginLeft: 8,
    fontSize: 15,
  },
  /* Contact: one 96px band, three facts in columns, no separators */
  contactBand: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: 26,
    paddingBottom: 26,
  },
  contactRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 24,
    rowGap: 12,
  },
  contactLine: {
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 32,
    rowGap: 4,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: "20px",
    color: colors.ink,
  },
  /* Footer: wordmark, compliance rows, legal line */
  footer: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: 48,
    paddingBottom: 48,
  },
  footerTop: {
    marginBottom: 28,
  },
  footerList: {
    margin: 0,
  },
  footerRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.sm]: "160px minmax(0, 1fr)",
    },
    columnGap: 24,
    rowGap: 4,
    alignItems: "baseline",
    minHeight: 44,
    paddingTop: 12,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: "20px",
  },
  footerTerm: {
    margin: 0,
    color: colors.mute600,
  },
  // Items sit in columns, 24px apart; no separator glyph.
  footerValue: {
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    columnGap: 24,
    rowGap: 4,
    color: colors.ink,
  },
  footerMuted: {
    color: colors.mute600,
  },
  footerLink: {
    color: {
      default: colors.ink,
      ":hover": colors.mute600,
    },
    textDecoration: "underline",
    textDecorationColor: colors.line,
    textUnderlineOffset: 4,
    transitionProperty: "color",
    transitionDuration: "150ms",
  },
  footerLegal: {
    marginTop: 28,
    marginBottom: 0,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: "20px",
    color: colors.mute600,
  },
});

/* ─────────────────────────────── Shared cells ─────────────────────────────── */

const hasNumericAssay = (item: Ingredient) => /\d/.test(item.purity);

/** A threshold in the mono voice, ink; only a measured result in the certificate is green. */
function AssayValue(props: { item: Ingredient }) {
  if (!hasNumericAssay(props.item)) {
    return <span {...stylex.attrs(styles.cellDash)}>—</span>;
  }
  return <span {...stylex.attrs(styles.mono)}>{props.item.purity}</span>;
}

/** Physical form; a non-numeric grade note moves here so the assay column stays numeric. */
const formLabel = (item: Ingredient) =>
  hasNumericAssay(item)
    ? item.form
    : `${item.form} · ${item.purity.charAt(0).toLowerCase()}${item.purity.slice(1)}`;

/* ─────────────────────────────── Navigation ─────────────────────────────── */

function MobileNav() {
  const [open, setOpen] = createSignal(false);
  const reduce = useReducedMotion();
  return (
    <div {...stylex.attrs(styles.mobileNavWrapper)}>
      <button
        type="button"
        aria-expanded={open() ? "true" : "false"}
        aria-controls="mobile-menu"
        aria-label={open() ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        {...stylex.attrs(styles.mobileMenuBtn)}
      >
        {open() ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
      </button>
      <AnimatePresence>
        <Show when={open()}>
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reduce() ? 0 : 0.2, ease: EASE }}
            {...stylex.attrs(styles.mobileMenuPopover)}
          >
            <ul {...stylex.attrs(styles.mobileMenuList)}>
              {NAV_LINKS.map((link) => (
                <li>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    {...stylex.attrs(styles.mobileNavLink)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.div>
        </Show>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────── Certificate of analysis ─────────────────────────────── */

function Certificate() {
  const identity: readonly { term: string; value: JSX.Element }[] = [
    {
      term: "Product",
      value: <span {...stylex.attrs(styles.certValue)}>{dossierActive.name} root extract</span>,
    },
    {
      term: "Source",
      value: (
        <span {...stylex.attrs(styles.certValue, styles.species, styles.speciesMd)}>
          {dossierActive.latin}
        </span>
      ),
    },
    { term: "Lot", value: <span {...stylex.attrs(styles.mono)}>{DOSSIER_LOT}</span> },
  ];
  const lastTest = CERTIFICATE_TESTS.length - 1;
  return (
    <figure
      aria-label={`Certificate of analysis, specimen, ${dossierActive.code} lot ${DOSSIER_LOT}`}
      {...stylex.attrs(styles.cert)}
    >
      <div {...stylex.attrs(styles.certHead)}>
        <p {...stylex.attrs(styles.certCode)}>{dossierActive.code}</p>
      </div>
      <dl {...stylex.attrs(styles.certIdentity)}>
        {identity.map((row, i) => (
          <div
            {...stylex.attrs(styles.certIdRow, i === identity.length - 1 && styles.certIdRowLast)}
          >
            <dt {...stylex.attrs(styles.certTerm)}>{row.term}</dt>
            <dd {...stylex.attrs(styles.certValue)}>{row.value}</dd>
          </div>
        ))}
      </dl>
      <div {...stylex.attrs(styles.certTableWrap)}>
        <table {...stylex.attrs(styles.certTable)}>
          <thead>
            <tr>
              <th scope="col" {...stylex.attrs(styles.certTh, styles.certCellFirst)}>
                Test
              </th>
              <th scope="col" {...stylex.attrs(styles.certTh)}>
                Method
              </th>
              <th scope="col" {...stylex.attrs(styles.certTh)}>
                Specification
              </th>
              <th scope="col" {...stylex.attrs(styles.certTh, styles.certCellLast)}>
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {CERTIFICATE_TESTS.map((row, i) => (
              <tr>
                <td
                  {...stylex.attrs(
                    styles.certTd,
                    styles.certCellFirst,
                    i === lastTest && styles.certRowEnd,
                  )}
                >
                  {row.test}
                </td>
                <td
                  {...stylex.attrs(styles.certTd, styles.mono, i === lastTest && styles.certRowEnd)}
                >
                  {row.method}
                </td>
                <td
                  {...stylex.attrs(styles.certTd, styles.mono, i === lastTest && styles.certRowEnd)}
                >
                  {row.specification}
                </td>
                <td
                  {...stylex.attrs(
                    styles.certTd,
                    styles.mono,
                    styles.certCellLast,
                    styles.certResult,
                    i === lastTest && styles.certRowEnd,
                  )}
                >
                  {row.result}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption {...stylex.attrs(styles.certFoot)}>
        <span aria-hidden="true" {...stylex.attrs(styles.certStamp)}>
          RELEASED
        </span>
        <span {...stylex.attrs(styles.srOnly)}>Released by quality control</span>
      </figcaption>
    </figure>
  );
}

function HeroSection() {
  return (
    <section {...stylex.attrs(styles.hero)}>
      <div {...stylex.attrs(styles.container)}>
        <h1 {...stylex.attrs(styles.heroHeading)}>
          <span {...stylex.attrs(styles.heroLine)}>Botanical actives,</span>{" "}
          <span {...stylex.attrs(styles.heroLine)}>documented to the lot.</span>
        </h1>
        <div {...stylex.attrs(styles.heroGrid)}>
          <div {...stylex.attrs(styles.heroText)}>
            <p {...stylex.attrs(styles.heroLead)}>
              Standardized extracts with a stated assay, a stated physical form and a dossier
              prepared before sampling. Produced across six bases and supplied to formulators in
              more than forty markets.
            </p>
            <div {...stylex.attrs(styles.heroDocs)}>
              <p id="dossier-contents" {...stylex.attrs(styles.heroDocsTitle)}>
                Dossier contents
              </p>
              <ul aria-labelledby="dossier-contents" {...stylex.attrs(styles.heroDocList)}>
                {DOCUMENTS.map((doc) => (
                  <li {...stylex.attrs(styles.heroDocItem)}>
                    <span>{doc.name}</span>
                    <span {...stylex.attrs(styles.heroDocScope)}>{doc.scope}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div {...stylex.attrs(styles.heroActions)}>
              <a href={SPECIMEN_HREF} {...stylex.attrs(styles.btn)}>
                {SPECIMEN_LABEL}
              </a>
            </div>
          </div>
          <Certificate />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Catalogue with the lot record ─────────────────────────────── */

const MATRIX_TABS = ["All", ...APPLICATIONS] as const;
type MatrixTab = (typeof MATRIX_TABS)[number];

/** The FN-014 record, expanded beneath its catalogue row. */
function DossierRow() {
  const ashwa = dossierActive;
  const fields: readonly { term: string; value: JSX.Element }[] = [
    { term: "Lot", value: <span {...stylex.attrs(styles.mono)}>{DOSSIER_LOT}</span> },
    { term: "Standardization", value: <AssayValue item={ashwa} /> },
    {
      term: "Method",
      value: <span {...stylex.attrs(styles.mono)}>HPLC, USP/EP parameters</span>,
    },
    { term: "Plant part", value: "Root only, no leaf" },
    { term: "Physical form", value: ashwa.form },
    { term: "Application", value: ashwa.application },
    { term: "Shelf life", value: "24 months, sealed" },
    { term: "Dossier documents", value: "CoA, TDS, SDS, allergen, GMO" },
  ];
  const tailStart = fields.length - 4;
  const endStart = fields.length - 2;
  return (
    <tr>
      <td colspan={7} id="dossier" {...stylex.attrs(styles.td, styles.expandedCell)}>
        <p {...stylex.attrs(styles.expandedTitle)}>
          <span>Lot record, {ashwa.name}</span>
          <span {...stylex.attrs(styles.species, styles.speciesLg)}>{ashwa.latin}</span>
        </p>
        <dl {...stylex.attrs(styles.expandedGrid)}>
          {fields.map((field, i) => (
            <div
              {...stylex.attrs(
                styles.expandedItem,
                i >= tailStart && styles.expandedItemTail,
                i >= endStart && styles.expandedItemEnd,
              )}
            >
              <dt {...stylex.attrs(styles.expandedTerm)}>{field.term}</dt>
              <dd {...stylex.attrs(styles.expandedValue)}>{field.value}</dd>
            </div>
          ))}
        </dl>
      </td>
    </tr>
  );
}

function MatrixSection() {
  const [filter, setFilter] = createSignal<MatrixTab>("All");
  const [search, setSearch] = createSignal("");
  const [hovered, setHovered] = createSignal<string | null>(null);
  const query = createMemo(() => search().trim().toLowerCase());
  const filterActive = createMemo(() => filter() !== "All" || query() !== "");
  const filtered = createMemo(() =>
    ingredients.filter((item) => {
      const matchesTab = filter() === "All" || item.application === filter();
      const matchesQuery =
        query() === "" ||
        item.name.toLowerCase().includes(query()) ||
        item.latin.toLowerCase().includes(query()) ||
        item.code.toLowerCase().includes(query());
      return matchesTab && matchesQuery;
    }),
  );
  const specHref = createInquiryHref("quality");
  const openRow = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest("a")) return;
    window.location.assign(specHref);
  };
  return (
    <section id="matrix" {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.container)}>
        <div {...stylex.attrs(styles.sectionHead)}>
          <h2 {...stylex.attrs(styles.h2)}>
            Every active in the catalogue, with its assay and form
          </h2>
        </div>

        <div {...stylex.attrs(styles.toolbar)}>
          <div role="tablist" aria-label="Filter by application" {...stylex.attrs(styles.tabs)}>
            {MATRIX_TABS.map((tab) => (
              <button
                type="button"
                role="tab"
                aria-selected={filter() === tab ? "true" : "false"}
                onClick={() => setFilter(tab)}
                {...stylex.attrs(
                  styles.tab,
                  filter() === tab ? styles.tabActive : styles.tabInactive,
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <label {...stylex.attrs(styles.search)}>
            <Search aria-hidden="true" size={15} {...stylex.attrs(styles.searchIcon)} />
            <input
              type="search"
              aria-label="Search actives by name, source, or code"
              placeholder="Search by name, source or code"
              value={search()}
              onInput={(e) => setSearch(e.currentTarget.value)}
              {...stylex.attrs(styles.input, styles.searchInput)}
            />
          </label>
        </div>

        <div {...stylex.attrs(styles.tableScroll)}>
          <table {...stylex.attrs(styles.table)}>
            <thead>
              <tr>
                <th scope="col" {...stylex.attrs(styles.th)}>
                  Code
                </th>
                <th scope="col" {...stylex.attrs(styles.th)}>
                  Active
                </th>
                <th scope="col" {...stylex.attrs(styles.th)}>
                  Botanical source
                </th>
                <th scope="col" {...stylex.attrs(styles.th)}>
                  Assay
                </th>
                <th scope="col" {...stylex.attrs(styles.th)}>
                  Physical form
                </th>
                <th scope="col" {...stylex.attrs(styles.th)}>
                  Application
                </th>
                <th scope="col" {...stylex.attrs(styles.th, styles.thRight)}>
                  <span {...stylex.attrs(styles.srOnly)}>Specification</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={filtered()}>
                {(item) => (
                  <>
                    <tr
                      onClick={openRow}
                      onMouseEnter={() => setHovered(item.code)}
                      onMouseLeave={() => setHovered(null)}
                      {...stylex.attrs(styles.row)}
                    >
                      <td {...stylex.attrs(styles.td, styles.mono)}>{item.code}</td>
                      <td {...stylex.attrs(styles.td, styles.cellName)}>{item.name}</td>
                      <td {...stylex.attrs(styles.td, styles.species, styles.cellLatin)}>
                        {item.latin}
                      </td>
                      <td {...stylex.attrs(styles.td)}>
                        <AssayValue item={item} />
                      </td>
                      <td {...stylex.attrs(styles.td)}>{formLabel(item)}</td>
                      <td {...stylex.attrs(styles.td)}>{item.application}</td>
                      <td {...stylex.attrs(styles.td, styles.tdRight)}>
                        <a
                          href={specHref}
                          aria-label={`${REQUEST_LABEL}, ${item.name}`}
                          {...stylex.attrs(
                            styles.rowLink,
                            hovered() === item.code && styles.rowLinkVisible,
                          )}
                        >
                          <span aria-hidden="true">→</span>
                        </a>
                      </td>
                    </tr>
                    {item.code === DOSSIER_CODE && <DossierRow />}
                  </>
                )}
              </For>
              {filtered().length === 0 && (
                <tr>
                  <td colspan={7} {...stylex.attrs(styles.td, styles.emptyCell)}>
                    <p {...stylex.attrs(styles.emptyText)}>
                      No actives match{search() ? ` “${search()}”` : " this filter"}.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setFilter("All");
                      }}
                      {...stylex.attrs(styles.clearBtn)}
                    >
                      Clear search and filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p {...stylex.attrs(styles.tableFoot)}>
          {filterActive() && `Showing ${filtered().length} of ${ingredients.length} actives. `}
          Assay values are release specifications, confirmed by HPLC on every lot. Each row requests
          a specification.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Lot thread ─────────────────────────────── */

function LotBand() {
  return (
    <section aria-label="Lot record" {...stylex.attrs(styles.lotBand)}>
      <div {...stylex.attrs(styles.container)}>
        <p {...stylex.attrs(styles.lotCaption)}>
          {`Lot ${DOSSIER_LOT}, ${DOSSIER_CODE}. One lot, one record, printed on every drum.`}
        </p>
      </div>
      <div aria-hidden="true" {...stylex.attrs(styles.lotCrop)}>
        <div {...stylex.attrs(styles.container)}>
          <p {...stylex.attrs(styles.lotFigure)}>{DOSSIER_LOT}</p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Formulation Tool ─────────────────────────────── */

function OptionButton(props: { label: string; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={props.active ? "true" : "false"}
      onClick={props.onSelect}
      {...stylex.attrs(styles.option, props.active ? styles.optionActive : styles.optionInactive)}
    >
      {props.label}
      {props.active && (
        <Check
          aria-hidden="true"
          size={14}
          strokeWidth={2.5}
          {...stylex.attrs(styles.optionCheck)}
        />
      )}
    </button>
  );
}

function FormulationSection() {
  const [app, setApp] = createSignal<IngredientApplication>("Nutrition");
  const [format, setFormat] = createSignal<(typeof FORMATS)[number]>("Beadlet");
  const [certification, setCertification] =
    createSignal<(typeof CERTIFICATION_SETS)[number]>("ISO 9001 + GMP");
  const [name, setName] = createSignal("");
  const [org, setOrg] = createSignal("");
  const [email, setEmail] = createSignal("");
  const matching = createMemo(() => getIngredientsByApplication(app()));

  const submit = (event: SubmitEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Formulation brief, ${app()}, ${format()}`);
    const body = encodeURIComponent(
      [
        `Name: ${name()}`,
        `Company: ${org()}`,
        `Email: ${email()}`,
        "",
        `Application: ${app()}`,
        `Delivery format: ${format()}`,
        `Certification set: ${certification()}`,
        `Actives in scope: ${matching()
          .map((item) => `${item.name} (${item.code}, ${item.purity})`)
          .join("; ")}`,
        "",
        "Please return a validated proposal with specification sheets.",
      ].join("\n"),
    );
    window.location.assign(`mailto:${company.email}?subject=${subject}&body=${body}`);
  };

  return (
    <section id="formulation" {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.container)}>
        <div {...stylex.attrs(styles.sectionHead)}>
          <h2 {...stylex.attrs(styles.h2)}>Build the target, we return the specification</h2>
          <p {...stylex.attrs(styles.lead)}>
            Choose the application, the delivery format and the certification set, then add your
            details. The brief lists the matching actives with their assay thresholds; the
            laboratory returns a validated proposal within one business day.
          </p>
        </div>

        <div {...stylex.attrs(styles.formulationGrid)}>
          <form onSubmit={submit} {...stylex.attrs(styles.controls)}>
            <fieldset {...stylex.attrs(styles.fieldset)}>
              <legend {...stylex.attrs(styles.legend)}>Application</legend>
              <div {...stylex.attrs(styles.optionGrid)}>
                {APPLICATIONS.map((opt) => (
                  <OptionButton label={opt} active={app() === opt} onSelect={() => setApp(opt)} />
                ))}
              </div>
            </fieldset>
            <fieldset {...stylex.attrs(styles.fieldset)}>
              <legend {...stylex.attrs(styles.legend)}>Delivery format</legend>
              <div {...stylex.attrs(styles.optionGrid)}>
                {FORMATS.map((opt) => (
                  <OptionButton
                    label={opt}
                    active={format() === opt}
                    onSelect={() => setFormat(opt)}
                  />
                ))}
              </div>
            </fieldset>
            <fieldset {...stylex.attrs(styles.fieldset)}>
              <legend {...stylex.attrs(styles.legend)}>Certification set</legend>
              <div {...stylex.attrs(styles.optionGrid)}>
                {CERTIFICATION_SETS.map((opt) => (
                  <OptionButton
                    label={opt}
                    active={certification() === opt}
                    onSelect={() => setCertification(opt)}
                  />
                ))}
              </div>
            </fieldset>
            <fieldset {...stylex.attrs(styles.fieldset)}>
              <legend {...stylex.attrs(styles.legend)}>Your details</legend>
              <div {...stylex.attrs(styles.fields)}>
                <label {...stylex.attrs(styles.field)}>
                  <span {...stylex.attrs(styles.fieldLabel)}>Name</span>
                  <input
                    type="text"
                    name="name"
                    autocomplete="name"
                    required
                    value={name()}
                    onInput={(e) => setName(e.currentTarget.value)}
                    {...stylex.attrs(styles.input)}
                  />
                </label>
                <label {...stylex.attrs(styles.field)}>
                  <span {...stylex.attrs(styles.fieldLabel)}>Company</span>
                  <input
                    type="text"
                    name="organization"
                    autocomplete="organization"
                    required
                    value={org()}
                    onInput={(e) => setOrg(e.currentTarget.value)}
                    {...stylex.attrs(styles.input)}
                  />
                </label>
                <label {...stylex.attrs(styles.field, styles.fieldWide)}>
                  <span {...stylex.attrs(styles.fieldLabel)}>Work email</span>
                  <input
                    type="email"
                    name="email"
                    autocomplete="email"
                    required
                    value={email()}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                    {...stylex.attrs(styles.input)}
                  />
                </label>
              </div>
            </fieldset>
            <div {...stylex.attrs(styles.formActions)}>
              <button type="submit" {...stylex.attrs(styles.btn)}>
                Send this brief
              </button>
              <p {...stylex.attrs(styles.formNote)}>Sent to {company.email}</p>
            </div>
          </form>

          <div {...stylex.attrs(styles.brief)} aria-live="polite">
            <div {...stylex.attrs(styles.briefHead)}>
              <p {...stylex.attrs(styles.briefTitle)}>Formulation brief</p>
            </div>
            <dl {...stylex.attrs(styles.briefRows)}>
              <div {...stylex.attrs(styles.specRow)}>
                <dt {...stylex.attrs(styles.specTerm)}>Application</dt>
                <dd {...stylex.attrs(styles.specValue)}>{app()}</dd>
              </div>
              <div {...stylex.attrs(styles.specRow)}>
                <dt {...stylex.attrs(styles.specTerm)}>Delivery format</dt>
                <dd {...stylex.attrs(styles.specValue)}>{format()}</dd>
              </div>
              <div {...stylex.attrs(styles.specRow)}>
                <dt {...stylex.attrs(styles.specTerm)}>Certification</dt>
                <dd {...stylex.attrs(styles.specValue)}>{certification()}</dd>
              </div>
              <div {...stylex.attrs(styles.specRow)}>
                <dt {...stylex.attrs(styles.specTerm)}>Lot documents</dt>
                <dd {...stylex.attrs(styles.specValue)}>CoA, TDS, SDS</dd>
              </div>
              <div {...stylex.attrs(styles.specRow)}>
                <dt {...stylex.attrs(styles.specTerm)}>Matching actives</dt>
                <dd {...stylex.attrs(styles.specValue)}>{matching().length}</dd>
              </div>
            </dl>
            <p {...stylex.attrs(styles.matchTitle)}>Actives in scope</p>
            <ul {...stylex.attrs(styles.matchList)}>
              <For each={matching()}>
                {(item) => (
                  <li {...stylex.attrs(styles.matchRow)}>
                    <span>
                      <span {...stylex.attrs(styles.matchName)}>{item.name}</span>{" "}
                      <span {...stylex.attrs(styles.species, styles.matchLatin)}>{item.latin}</span>
                    </span>
                    <AssayValue item={item} />
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Contact band ─────────────────────────────── */

function ContactSection() {
  return (
    <section id="contact" aria-label="Contact" {...stylex.attrs(styles.contactBand)}>
      <div {...stylex.attrs(styles.container, styles.contactRow)}>
        <p {...stylex.attrs(styles.contactLine)}>
          <a href={`mailto:${company.email}`} {...stylex.attrs(styles.footerLink)}>
            {company.email}
          </a>
          <span>
            {company.hq.city}, {company.hq.country}
          </span>
          <span>A specification within one business day.</span>
        </p>
        <a href="#top" {...stylex.attrs(styles.textLink)}>
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Footer ─────────────────────────────── */

function FooterRow(props: { term: string; items: readonly { key: string; node: JSX.Element }[] }) {
  return (
    <div {...stylex.attrs(styles.footerRow)}>
      <dt {...stylex.attrs(styles.footerTerm)}>{props.term}</dt>
      <dd {...stylex.attrs(styles.footerValue)}>
        {props.items.map((item) => (
          <span>{item.node}</span>
        ))}
      </dd>
    </div>
  );
}

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  const documentHref = createInquiryHref("quality");
  return (
    <footer {...stylex.attrs(styles.footer)}>
      <div {...stylex.attrs(styles.container)}>
        <div {...stylex.attrs(styles.footerTop)}>
          <p {...stylex.attrs(styles.wordmark)}>{company.name}</p>
        </div>
        <dl {...stylex.attrs(styles.footerList)}>
          <FooterRow
            term="Certifications"
            items={certifications.map((name) => ({ key: name, node: name }))}
          />
          <FooterRow
            term="Bases"
            items={regions.map((region) => ({
              key: region.city,
              node: (
                <>
                  {region.city}{" "}
                  <span {...stylex.attrs(styles.footerMuted)}>
                    {UTC_OFFSET_BY_CITY[region.city] ?? ""}
                  </span>
                </>
              ),
            }))}
          />
          <FooterRow
            term="Documents"
            items={DOCUMENTS.map((doc) => ({
              key: doc.name,
              node: (
                <a href={documentHref} {...stylex.attrs(styles.footerLink)}>
                  {doc.name}
                </a>
              ),
            }))}
          />
        </dl>
        <p {...stylex.attrs(styles.footerLegal)}>
          © {CURRENT_YEAR} {company.legalName} {company.hq.city}, {company.hq.country}.
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── Root Export ─────────────────────────────── */

export function VariantWaterfall() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.attrs(styles.root)}>
        <header {...stylex.attrs(styles.header)}>
          <div {...stylex.attrs(styles.container, styles.headerRow)}>
            <a href="#top" {...stylex.attrs(styles.wordmark)}>
              {company.name}
            </a>
            <nav aria-label="Primary" {...stylex.attrs(styles.navDesktop)}>
              {NAV_LINKS.map((link) => (
                <a href={link.href} {...stylex.attrs(styles.navLink)}>
                  {link.label}
                </a>
              ))}
            </nav>
            <div {...stylex.attrs(styles.headerRight)}>
              <a
                href={createInquiryHref("contact")}
                {...stylex.attrs(styles.btn, styles.headerCta)}
              >
                {REQUEST_LABEL}
              </a>
              <MobileNav />
            </div>
          </div>
        </header>

        <main id="top">
          <HeroSection />
          <MatrixSection />
          <LotBand />
          <FormulationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LazyMotion>
  );
}
