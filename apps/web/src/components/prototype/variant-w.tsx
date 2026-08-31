/*
 * PROTOTYPE — Variant W: "Conversion" — VariantH's exact visual language,
 * restructured for conversion per docs/brand/landing-conversion-plan.md
 * (§2 hero action, §3 outcome-first benefits, §4 buyer journey, §5 FAQ,
 * §6 risk reversal, §8 section order).
 *
 * Provenance: forked wholesale from variant-h.tsx (2026-08 production
 * direction). Everything the conversion plan does not touch — ticker, matrix,
 * dossier, formulation presenter, standards imagery, footer chrome — is
 * unchanged from H.
 *
 * Conversion deltas (all local to this file; shared content untouched):
 *   1. Hero primary CTA is the conversion action — "Request Specifications"
 *      (createInquiryHref mailto); portfolio demoted to the blue outline.
 *      24h answer micro-line beneath the CTA row.
 *   2. Quality pillars rewritten outcome-first (local PILLARS_OUTCOME const).
 *   3. "What happens next" strip carries the 3-step buyer journey
 *      (local BUYER_JOURNEY const).
 *   4. NEW FAQ accordion (8 items, spec-sheet rows, FAQ.01–08 codes) after
 *      Standards. The plan's two [confirm] items are phrased honestly with
 *      no invented MOQ or audit specifics.
 *   5. NEW risk-reversal band ("Zero-commitment start.") between FAQ and
 *      the finale.
 *   6. Finale primary CTA matches the hero: "Request Specifications".
 *
 * Section order:
 *   Nav (portfolio menu) → Hero (conversion CTA + stat band) → Ticker
 *   → Industries → Matrix → Product Dossier → Formulation Presenter
 *   → Origin + Standards → FAQ → Risk Reversal → Finale → Footer
 */
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  FileDown,
  FlaskConical,
  Globe,
  Leaf,
  Menu,
  Pause,
  Play,
  Sprout,
  X,
} from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certificationDetails,
  certifications,
  company,
  createInquiryHref,
  divisionForApplication,
  getFeaturedIngredients,
  getIngredientsByApplication,
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
  heroThumb:
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  lab: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=1400&q=80",
  origin:
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
} as const;
const IMAGE_OVERRIDES: Record<
  string,
  {
    src: string;
    alt: string;
  }
> = {
  "FN-014": {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
    alt: "Hands holding soil and a young seedling — the root origin of Ashwagandha KSM-66",
  },
  "FN-052": {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh food bowl with vibrant natural ingredients — curcumin as clean-label color",
  },
  "FN-068": {
    src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
    alt: "Macro leaf covered in dew droplets — hydration, the signature of hyaluronic acid",
  },
};
const imgFor = (item: Ingredient) => IMAGE_OVERRIDES[item.code] ?? item.image;
const STATS = [
  {
    value: "30+",
    unit: "Years",
    desc: "Botanical expertise since 1995",
  },
  {
    value: "6",
    unit: "Global Bases",
    desc: "R&D hubs across three continents",
  },
  {
    value: "ISO/GMP",
    unit: "Certified",
    desc: "Audited quality on every lot",
  },
  {
    value: "40+",
    unit: "Countries",
    desc: "Regulated markets supplied",
  },
] as const;
const INDUSTRY_COPY = [
  "Bioavailable actives standardized for potency, stability and dose accuracy — from Ashwagandha KSM-66 to Coenzyme Q10.",
  "Heat- and pH-stable carotenoids, plant proteins and functional botanicals for clean-label fortification at scale.",
  "Dermatologically active botanicals and hyaluronic acid systems formulated for cellular compatibility and sensory performance.",
] as const;
const PILLARS_OUTCOME = [
  {
    title: "Documented to Your Regulatory Map",
    copy: "Every release matches your market's pharmacopeial standard (USP, EP, FCC) with full CoA, allergen, solvent residue and pesticide panels before shipment.",
  },
  {
    title: "Batch-to-Batch Potency Consistency",
    copy: "Chromatographic fingerprinting and validated analytical assays (HPLC, UV-Vis) ensure assay numbers hold lot over lot — no reformulation between production runs.",
  },
  {
    title: "Audit-Ready Quality Management",
    copy: "ISO 9001:2015, cGMP and HACCP certified facilities. Third-party testing verification and on-site audit hosting available for qualifying formulation programs.",
  },
] as const;
const BUYER_JOURNEY = [
  {
    step: "01",
    title: "Target spec & sample request",
    copy: "Submit compound, assay, form, and regulatory requirements. We return matching specifications and sample availability within 24 hours.",
  },
  {
    step: "02",
    title: "Lab validation & documentation",
    copy: "Receive CoA, chromatographic panels, allergen / solvent residue statements, and test samples for pilot formulation validation.",
  },
  {
    step: "03",
    title: "Audited commercial release",
    copy: "Commercial supply releases against locked specification thresholds with batch-matched documentation and logistics from the nearest base.",
  },
] as const;
const FAQ_ITEMS = [
  {
    q: "How quickly do you return specifications and technical dossiers?",
    a: "Standard specification sheets, CoAs and regulatory summaries are returned within 24 business hours from your nearest regional office (North America, Europe, Asia). Custom target formulation proposals take 2–3 business days.",
  },
  {
    q: "What documentation ships with each production batch?",
    a: "Every lot ships with a batch-specific Certificate of Analysis (assay, heavy metals, microbiology, moisture), chromatographic purity fingerprint (HPLC/UV), allergen declaration, non-GMO statement, and packaging tamper seals.",
  },
  {
    q: "Can you match custom assay percentages or particle-size profiles?",
    a: "Yes. Our Nanjing application lab and processing facilities support custom standardized assay targets, specific mesh/particle-size distributions (e.g. 80-mesh powder, micro-granules), and water-dispersible beadlet encapsulation.",
  },
  {
    q: "Are samples available for laboratory bench trials?",
    a: "Yes. Evaluation samples (typically 50–500 g depending on the active) are provided with batch CoA for qualified formulation and R&D programs at zero commitment.",
  },
  {
    q: "What regulatory standards do your manufacturing facilities hold?",
    a: "Production sites operate under ISO 9001:2015, ISO 22000, cGMP, and HACCP certifications. Compounds comply with USP, EP, or Food Chemical Codex (FCC) monographs as specified in the product dossier.",
  },
  {
    q: "How does Fenchem handle supply continuity and inventory?",
    a: "We maintain regional buffer inventory across six global warehouse nodes (USA, Germany, UK, Czech Republic, South Africa, and China) to buffer against supply disruptions and shorten transit times to key formulation corridors.",
  },
  {
    q: "What are typical minimum order quantities (MOQs)?",
    a: "MOQs depend on the active compound, delivery form (standard powder vs. micro-encapsulated beadlet), and packaging format. We provide tier-specific terms alongside the initial specification proposal.",
  },
  {
    q: "Do you support third-party facility audits?",
    a: "Yes. Qualified commercial formulation partners can schedule facility audits, supplier qualification questionnaires, and remote video quality reviews with our QA/QC team.",
  },
] as const;
const RISK_POINTS = [
  "Complimentary evaluation samples with batch-specific CoA",
  "Full regulatory dossier (allergen, solvent residue, TSE/BSE, non-GMO) upfront",
  "No commercial commitment until bench-trial validation passes",
] as const;
const PILLAR_ICONS = [Sprout, FlaskConical, Globe] as const;
const FOOTER_COLS = [
  {
    head: "Portfolio",
    links: [
      {
        label: "Ingredient Matrix",
        href: "#matrix",
      },
      {
        label: "Product Dossiers",
        href: "#product",
      },
      {
        label: "Formulation Support",
        href: "#formulation",
      },
      {
        label: "Nutrition Actives",
        href: "#matrix",
      },
    ],
  },
  {
    head: "Standards",
    links: [
      {
        label: "Quality Charter",
        href: "#standards",
      },
      {
        label: "Regulatory Dossiers",
        href: "#contact",
      },
      {
        label: "Sourcing Standards",
        href: "#standards",
      },
      {
        label: "Ingredient Transparency",
        href: "#matrix",
      },
    ],
  },
  {
    head: "Partner",
    links: [
      {
        label: "Request a Specification",
        href: "#contact",
      },
      {
        label: "Partner Inquiries",
        href: "#contact",
      },
      {
        label: "Technical Dossiers",
        href: "#contact",
      },
      {
        label: "Global Offices",
        href: "#contact",
      },
    ],
  },
] as const;
const MENU_APPLICATIONS: IngredientApplication[] = [
  "Nutrition",
  "Food & Beverage",
  "Personal Care",
];
const FORM_OPTIONS = ["Powder", "Beadlet", "Oil suspension", "Granular"] as const;

/* ─────────────────────────────── Styles ─────────────────────────────── */

const pulseAnim = stylex.keyframes({
  "0%, 100%": {
    opacity: 1,
  },
  "50%": {
    opacity: 0.5,
  },
});
const marqueeAnim = stylex.keyframes({
  from: {
    transform: "translateX(0)",
  },
  to: {
    transform: "translateX(-50%)",
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
    letterSpacing: "0.26em",
    color: colors.mute600,
  },
  eyebrowGreen: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.32em",
    color: colors.brandGreen700,
  },
  eyebrowGreen400: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.32em",
    color: colors.brandGreen400,
  },
  textGreen600: {
    color: colors.brandGreen600,
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
    paddingTop: 16,
    paddingBottom: 16,
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
  ctaPrimaryCompact: {
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 8,
    borderRadius: radii.sm,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingLeft: 20,
    paddingRight: 20,
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
    gap: 12,
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
    boxShadow: "0 0 40px oklch(from var(--color-brand-green-500) l c h / 0.3)",
    textDecoration: "none",
    transitionProperty: "background-color, transform, box-shadow",
    transitionDuration: "300ms",
    transform: {
      default: "scale(1)",
      ":active": "scale(0.96)",
    },
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
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
    paddingTop: 16,
    paddingBottom: 16,
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
  ctaOutlineBlueCompact: {
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 8,
    borderRadius: radii.sm,
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
  /* Division Dots */
  dotBase: {
    width: 8,
    height: 8,
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
  /* Header & Nav */
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
  microStrip: {
    display: {
      default: "none",
      [breakpoints.md]: "flex",
    },
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 6,
    paddingBottom: 6,
  },
  microStripItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    color: colors.mute600,
  },
  liveDotOuter: {
    position: "relative",
    display: "flex",
    width: 6,
    height: 6,
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
  navInner: {
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
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    textDecoration: "none",
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    opacity: {
      default: 1,
      ":hover": 0.75,
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
  navDesktopLinks: {
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
  progressHairline: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    transformOrigin: "left",
    backgroundColor: colors.brandGreen500,
  },
  /* Portfolio Menu */
  portfolioMenuRoot: {
    position: "relative",
  },
  portfolioMenuBtn: {
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 6,
    fontFamily: typography.body,
    fontSize: 14,
    color: {
      default: colors.mute600,
      ":hover": colors.brandGreen700,
    },
    backgroundColor: "transparent",
    borderWidth: 0,
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  portfolioChevron: {
    width: 14,
    height: 14,
    transitionProperty: "transform",
    transitionDuration: "300ms",
  },
  portfolioChevronOpen: {
    transform: "rotate(180deg)",
  },
  portfolioPopover: {
    position: "absolute",
    left: "50%",
    top: "100%",
    zIndex: 50,
    marginTop: 8,
    width: 640,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.paper,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  },
  portfolioGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 1,
    backgroundColor: colors.line,
  },
  portfolioCol: {
    backgroundColor: colors.paper,
    padding: 20,
  },
  portfolioColHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.mute600,
    margin: 0,
  },
  portfolioItemList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  portfolioItemLink: {
    fontFamily: typography.body,
    fontSize: 14,
    color: {
      default: colors.ink,
      ":hover": colors.brandGreen700,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  portfolioFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  portfolioFooterLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    color: {
      default: colors.brandBlue700,
      ":hover": colors.brandGreen700,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  /* Mobile Nav */
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
  /* Hero */
  heroSection: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  heroGrid: {
    display: "grid",
    minHeight: "80vh",
    gridTemplateColumns: {
      default: null,
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  heroLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
      [breakpoints.lg]: 128,
    },
    paddingBottom: {
      default: 64,
      [breakpoints.md]: 96,
      [breakpoints.lg]: 128,
    },
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 7 / span 7",
    },
  },
  heroBadge: {
    display: "inline-flex",
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
    margin: 0,
  },
  heroHeading: {
    marginTop: 32,
    fontFamily: typography.display,
    fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
    fontWeight: 700,
    lineHeight: {
      default: 1.1,
      [breakpoints.md]: 1.05,
    },
    letterSpacing: "-0.04em",
    color: colors.ink,
    margin: 0,
  },
  heroLead: {
    marginTop: 28,
    maxWidth: 512,
    fontFamily: typography.body,
    fontSize: {
      default: 16,
      [breakpoints.md]: 18,
    },
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  heroActionsCol: {
    marginTop: 36,
  },
  heroActions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  heroAnswerNote: {
    marginTop: 12,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
    margin: 0,
  },
  heroStatGrid: {
    marginTop: 56,
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.sm]: "repeat(4, 1fr)",
    },
    gap: 1,
    overflow: "hidden",
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.line,
    margin: 0,
    padding: 0,
  },
  heroStatItem: {
    backgroundColor: colors.paper,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  heroStatUnit: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: colors.mute600,
  },
  heroStatValue: {
    fontFamily: typography.display,
    fontSize: {
      default: 30,
      [breakpoints.md]: 36,
    },
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: colors.brandGreen600,
    margin: 0,
  },
  heroStatDesc: {
    marginTop: 4,
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.mute600,
    margin: 0,
  },
  heroRight: {
    position: "relative",
    overflow: "hidden",
    borderTopWidth: {
      default: 1,
      [breakpoints.lg]: 0,
    },
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 5 / span 5",
    },
    borderLeftWidth: {
      default: null,
      [breakpoints.lg]: 1,
    },
    borderLeftStyle: {
      default: null,
      [breakpoints.lg]: "solid",
    },
    borderLeftColor: {
      default: null,
      [breakpoints.lg]: colors.line,
    },
  },
  heroImgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroImg: {
    height: "116%",
    width: "100%",
    objectFit: "cover",
  },
  heroImgScrim: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to top, color-mix(in oklch, var(--color-brand-green-950) 30%, transparent), transparent, transparent)",
  },
  heroCaptionBadge: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.sm,
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
  /* Ticker */
  tickerSection: {
    position: "relative",
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.brandGreen50,
    paddingTop: 14,
    paddingBottom: 14,
  },
  tickerFadeLeft: {
    pointerEvents: "none",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    width: 64,
    background: "linear-gradient(to right, var(--color-brand-green-50), transparent)",
  },
  tickerFadeRight: {
    pointerEvents: "none",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    width: 64,
    background: "linear-gradient(to left, var(--color-brand-green-50), transparent)",
  },
  tickerPauseBtn: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 20,
    display: "inline-flex",
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandGreen200,
    backgroundColor: "color-mix(in oklch, var(--color-paper) 95%, transparent)",
    color: colors.brandGreen700,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    ":hover": {
      backgroundColor: colors.brandGreen100,
    },
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  tickerMarqueeTrack: {
    display: "flex",
    width: "max-content",
    animationName: marqueeAnim,
    animationDuration: "32s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  tickerList: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  tickerItem: {
    display: "flex",
    alignItems: "center",
    gap: 32,
    paddingRight: 32,
  },
  tickerText: {
    whiteSpace: "nowrap",
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: colors.brandGreen700,
  },
  tickerIndex: {
    color: colors.brandGreen800,
  },
  tickerDiamond: {
    width: 6,
    height: 6,
    transform: "rotate(45deg)",
    backgroundColor: colors.brandGreen400,
  },
  /* Section Header */
  sectionHeaderRow: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: 24,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
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
    alignItems: {
      default: null,
      [breakpoints.md]: "flex-end",
    },
    justifyContent: {
      default: null,
      [breakpoints.md]: "space-between",
    },
  },
  sectionHeading: {
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
  sectionAsideLead: {
    maxWidth: 320,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  /* Industries */
  industriesSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  industryRowLink: {
    display: "block",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "400ms",
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandGreen50,
    },
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  industryRowLinkLast: {
    borderBottomWidth: 0,
  },
  industryRowGrid: {
    display: "grid",
    alignItems: "center",
    gap: {
      default: 16,
      [breakpoints.md]: 24,
    },
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 40,
      [breakpoints.md]: 48,
    },
    paddingBottom: {
      default: 40,
      [breakpoints.md]: 48,
    },
    gridTemplateColumns: {
      default: null,
      [breakpoints.md]: "repeat(12, 1fr)",
    },
  },
  industryColIndex: {
    gridColumn: {
      default: null,
      [breakpoints.md]: "span 1 / span 1",
    },
  },
  industryIndexText: {
    fontFamily: typography.tech,
    fontSize: 14,
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
  },
  industryColTitle: {
    gridColumn: {
      default: null,
      [breakpoints.md]: "span 4 / span 4",
    },
  },
  industryTitle: {
    fontFamily: typography.body,
    fontSize: {
      default: 24,
      [breakpoints.md]: 30,
    },
    fontWeight: 700,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
    transitionProperty: "color",
    transitionDuration: "300ms",
  },
  industryColCopy: {
    gridColumn: {
      default: null,
      [breakpoints.md]: "span 5 / span 5",
    },
  },
  industryCopy: {
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  industryColImg: {
    position: "relative",
    aspectRatio: {
      default: "16 / 9",
      [breakpoints.md]: "1 / 1",
    },
    overflow: "hidden",
    borderRadius: radii.sm,
    gridColumn: {
      default: null,
      [breakpoints.md]: "span 1 / span 1",
    },
  },
  industryImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
  },
  industryColArrow: {
    display: "flex",
    justifyContent: "flex-end",
    gridColumn: {
      default: null,
      [breakpoints.md]: "span 1 / span 1",
    },
  },
  industryArrowIcon: {
    color: colors.mute400,
    transitionProperty: "transform, color",
    transitionDuration: "300ms",
  },
  /* Division Badge */
  divisionBadge: {
    position: "absolute",
    right: 12,
    top: 12,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-paper) 95%, transparent)",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: colors.ink,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  /* Matrix */
  matrixSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.mute50,
  },
  matrixGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(2, 1fr)",
      [breakpoints.lg]: "repeat(3, 1fr)",
    },
    gap: 1,
    backgroundColor: colors.line,
  },
  matrixCardBg: {
    backgroundColor: colors.paper,
  },
  matrixCardImgBox: {
    position: "relative",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  matrixCardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
  },
  matrixCardHoverOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    transitionProperty: "background-color",
    transitionDuration: "500ms",
  },
  matrixCardBody: {
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 28,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 28,
    },
    paddingTop: {
      default: 28,
      [breakpoints.md]: 32,
    },
    paddingBottom: {
      default: 28,
      [breakpoints.md]: 32,
    },
  },
  matrixCardMeta: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  matrixCardIndex: {
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
  },
  matrixCardCode: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.mute600,
  },
  matrixCardTitle: {
    marginTop: 12,
    fontFamily: typography.body,
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: colors.ink,
    margin: 0,
    transitionProperty: "color",
    transitionDuration: "300ms",
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
    marginTop: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: 0,
  },
  matrixCardDlRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
  },
  matrixSpecLink: {
    marginTop: 24,
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
  /* Dossier */
  dossierSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  dossierGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: null,
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  dossierImgCol: {
    position: "relative",
    minHeight: 320,
    overflow: "hidden",
    borderBottomWidth: {
      default: 1,
      [breakpoints.lg]: 0,
    },
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 5 / span 5",
    },
    borderRightWidth: {
      default: null,
      [breakpoints.lg]: 1,
    },
    borderRightStyle: {
      default: null,
      [breakpoints.lg]: "solid",
    },
    borderRightColor: {
      default: null,
      [breakpoints.lg]: colors.line,
    },
  },
  dossierImg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
  },
  dossierImgScrim: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to top, color-mix(in oklch, var(--color-brand-green-950) 25%, transparent), transparent, transparent)",
  },
  dossierBadgeTopLeft: {
    position: "absolute",
    left: 16,
    top: 16,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-paper) 95%, transparent)",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: colors.ink,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  dossierBadgeBottom: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.sm,
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
  dossierBodyCol: {
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 48,
      [breakpoints.md]: 64,
    },
    paddingBottom: {
      default: 48,
      [breakpoints.md]: 64,
    },
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 7 / span 7",
    },
  },
  dossierTitle: {
    fontFamily: typography.display,
    fontSize: {
      default: 30,
      [breakpoints.md]: 36,
    },
    fontWeight: 700,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
  },
  dossierLatin: {
    marginTop: 4,
    fontFamily: typography.display,
    fontSize: 16,
    fontStyle: "italic",
    color: colors.mute600,
    margin: 0,
  },
  dossierDescription: {
    marginTop: 20,
    maxWidth: 576,
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  dossierDl: {
    marginTop: 32,
    maxWidth: 576,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    margin: 0,
    padding: 0,
  },
  dossierDlRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 24,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    paddingTop: 12,
    paddingBottom: 12,
  },
  dossierDd: {
    textAlign: "right",
    fontFamily: typography.tech,
    fontSize: 14,
    color: colors.ink,
    margin: 0,
  },
  dossierFormatsRow: {
    marginTop: 24,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  dossierFormatPill: {
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandGreen200,
    backgroundColor: colors.brandGreen50,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: typography.body,
    fontSize: 12,
    fontWeight: 500,
    color: colors.brandGreen800,
  },
  dossierActionsRow: {
    marginTop: 32,
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  /* Chips */
  chipBase: {
    minHeight: 44,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transitionProperty: "background-color, border-color, color, transform",
    transitionDuration: "200ms",
    transform: {
      default: "scale(1)",
      ":active": "scale(0.96)",
    },
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen700}`,
    },
  },
  chipSelected: {
    borderColor: colors.brandGreen600,
    backgroundColor: colors.brandGreen500,
    color: colors.brandGreen950,
  },
  chipUnselected: {
    borderColor: {
      default: colors.line,
      ":hover": colors.brandGreen400,
    },
    backgroundColor: colors.paper,
    color: {
      default: colors.mute600,
      ":hover": colors.ink,
    },
  },
  /* Formulation Presenter */
  formulationSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-50) 60%, transparent)",
  },
  formulationGrid: {
    display: "grid",
    gap: 1,
    backgroundColor: colors.line,
    gridTemplateColumns: {
      default: null,
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  formulationLeft: {
    backgroundColor: colors.paper,
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 40,
      [breakpoints.md]: 48,
    },
    paddingBottom: {
      default: 40,
      [breakpoints.md]: 48,
    },
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 7 / span 7",
    },
  },
  formulationFieldset: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
    marginTop: 32,
  },
  chipsWrapRow: {
    marginTop: 12,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  processStripOuter: {
    marginTop: 48,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: 32,
  },
  processOl: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    marginTop: 16,
    display: "grid",
    gap: 16,
    gridTemplateColumns: {
      default: null,
      [breakpoints.sm]: "repeat(3, 1fr)",
    },
  },
  processLi: {
    display: "flex",
    gap: 12,
  },
  processIndex: {
    fontFamily: typography.tech,
    fontSize: 14,
    letterSpacing: "0.16em",
    color: colors.brandGreen700,
  },
  processTitle: {
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    color: colors.ink,
    margin: 0,
  },
  processCopy: {
    marginTop: 4,
    fontFamily: typography.body,
    fontSize: 12,
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  formulationRight: {
    backgroundColor: colors.brandGreen950,
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingTop: {
      default: 40,
      [breakpoints.md]: 48,
    },
    paddingBottom: {
      default: 40,
      [breakpoints.md]: 48,
    },
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 5 / span 5",
    },
  },
  specDraftHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  specDraftLabel: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.brandGreen400,
  },
  specDraftCode: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.brandGreen300,
    fontVariantNumeric: "tabular-nums",
  },
  specDraftDl: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.brandGreen800,
    margin: 0,
    padding: 0,
  },
  specDraftDlRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.brandGreen800,
    paddingTop: 14,
    paddingBottom: 14,
  },
  specDraftDt: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: colors.brandGreen400,
  },
  specDraftDd: {
    textAlign: "right",
    fontFamily: typography.tech,
    fontSize: 14,
    color: colors.paper,
    fontVariantNumeric: "tabular-nums",
    margin: 0,
  },
  specMatchesList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  specMatchItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: colors.brandGreen300,
  },
  specSubmitBtn: {
    marginTop: 32,
    display: "inline-flex",
    minHeight: 44,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: radii.sm,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingLeft: 24,
    paddingRight: 24,
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
  specDossiersRequestNote: {
    marginTop: 16,
    textAlign: "center",
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: colors.brandGreen400,
    margin: 0,
  },
  /* Standards */
  standardsSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  originGrid: {
    display: "grid",
    gap: 1,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.line,
    gridTemplateColumns: {
      default: null,
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  originImgCol: {
    position: "relative",
    minHeight: 288,
    overflow: "hidden",
    backgroundColor: colors.paper,
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 5 / span 5",
    },
  },
  originImg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
  },
  originTextCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: colors.paper,
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 48,
      [breakpoints.md]: 64,
    },
    paddingBottom: {
      default: 48,
      [breakpoints.md]: 64,
    },
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 7 / span 7",
    },
  },
  originTitle: {
    marginTop: 16,
    fontFamily: typography.display,
    fontSize: {
      default: 30,
      [breakpoints.md]: 36,
    },
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    color: colors.ink,
    margin: 0,
  },
  originQuote: {
    marginTop: 24,
    maxWidth: 576,
    borderLeftWidth: 2,
    borderLeftStyle: "solid",
    borderLeftColor: colors.brandGreen400,
    paddingLeft: 20,
    fontFamily: typography.display,
    fontSize: 18,
    fontStyle: "italic",
    lineHeight: 1.625,
    color: colors.brandGreen800,
    margin: 0,
  },
  standardsGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: null,
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  labImgCol: {
    position: "relative",
    overflow: "hidden",
    borderBottomWidth: {
      default: 1,
      [breakpoints.lg]: 0,
    },
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 5 / span 5",
    },
    borderRightWidth: {
      default: null,
      [breakpoints.lg]: 1,
    },
    borderRightStyle: {
      default: null,
      [breakpoints.lg]: "solid",
    },
    borderRightColor: {
      default: null,
      [breakpoints.lg]: colors.line,
    },
  },
  labImgContainer: {
    position: "relative",
    minHeight: {
      default: 288,
      [breakpoints.lg]: "100%",
    },
  },
  labImg: {
    height: {
      default: 480,
      [breakpoints.lg]: "100%",
    },
    width: "100%",
    objectFit: "cover",
    outline: "1px solid rgba(0, 0, 0, 0.1)",
    outlineOffset: -1,
    position: {
      default: null,
      [breakpoints.lg]: "absolute",
    },
    top: {
      default: null,
      [breakpoints.lg]: 0,
    },
    left: {
      default: null,
      [breakpoints.lg]: 0,
    },
    right: {
      default: null,
      [breakpoints.lg]: 0,
    },
    bottom: {
      default: null,
      [breakpoints.lg]: 0,
    },
  },
  labImgScrim: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to top, color-mix(in oklch, var(--color-brand-green-950) 20%, transparent), transparent, transparent)",
  },
  labCaptionBadge: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.sm,
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
  pillarsCol: {
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 7 / span 7",
    },
  },
  pillarRowBorder: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  pillarInner: {
    display: "flex",
    gap: {
      default: 20,
      [breakpoints.md]: 32,
    },
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 40,
      [breakpoints.md]: 48,
    },
    paddingBottom: {
      default: 40,
      [breakpoints.md]: 48,
    },
    transitionProperty: "background-color",
    transitionDuration: "400ms",
    ":hover": {
      backgroundColor: colors.brandGreen50,
    },
  },
  pillarIconBox: {
    marginTop: 4,
    display: "flex",
    width: {
      default: 40,
      [breakpoints.md]: 48,
    },
    height: {
      default: 40,
      [breakpoints.md]: 48,
    },
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.sm,
    backgroundColor: colors.brandGreen100,
    color: colors.brandGreen700,
  },
  pillarTitle: {
    fontFamily: typography.body,
    fontSize: {
      default: 20,
      [breakpoints.md]: 24,
    },
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: colors.ink,
    margin: 0,
  },
  pillarCopy: {
    marginTop: 12,
    maxWidth: 576,
    fontFamily: typography.body,
    fontSize: {
      default: 14,
      [breakpoints.md]: 16,
    },
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  pillarCert: {
    marginTop: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.brandGreen700,
  },
  /* FAQ */
  faqSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  faqRow: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  faqRowLast: {
    borderBottomWidth: 0,
  },
  faqHeadingWrap: {
    margin: 0,
  },
  faqBtn: {
    display: "flex",
    minHeight: 44,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    borderWidth: 0,
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandGreen50,
    },
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingTop: {
      default: 20,
      [breakpoints.md]: 24,
    },
    paddingBottom: {
      default: 20,
      [breakpoints.md]: 24,
    },
    textAlign: "left",
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  faqBtnLeft: {
    display: "grid",
    flex: "1 1 0%",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "6.5rem 1fr",
    },
    alignItems: "baseline",
    gap: {
      default: 6,
      [breakpoints.md]: 24,
    },
  },
  faqCode: {
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
  },
  faqQuestion: {
    fontFamily: typography.body,
    fontSize: {
      default: 16,
      [breakpoints.md]: 18,
    },
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: colors.ink,
  },
  faqChevron: {
    width: 16,
    height: 16,
    flexShrink: 0,
    color: colors.mute600,
    transitionProperty: "transform",
    transitionDuration: "300ms",
  },
  faqChevronOpen: {
    transform: "rotate(180deg)",
  },
  faqPanelBox: {
    overflow: "hidden",
  },
  faqPanelInner: {
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingBottom: {
      default: 28,
      [breakpoints.md]: 32,
    },
  },
  faqAnswer: {
    maxWidth: 768,
    fontFamily: typography.body,
    fontSize: {
      default: 14,
      [breakpoints.md]: 16,
    },
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
    marginLeft: {
      default: null,
      [breakpoints.md]: "8rem",
    },
  },
  /* Risk Reversal */
  riskSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-50) 60%, transparent)",
  },
  riskInner: {
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
      [breakpoints.md]: 80,
    },
    paddingBottom: {
      default: 64,
      [breakpoints.md]: 80,
    },
  },
  riskGrid: {
    display: "grid",
    gap: 40,
    gridTemplateColumns: {
      default: null,
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
    alignItems: {
      default: null,
      [breakpoints.lg]: "center",
    },
  },
  riskColLeft: {
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 6 / span 6",
    },
  },
  riskHeading: {
    marginTop: 16,
    fontFamily: typography.display,
    fontSize: {
      default: 30,
      [breakpoints.md]: 36,
    },
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    color: colors.ink,
    margin: 0,
  },
  riskLead: {
    marginTop: 16,
    maxWidth: 512,
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  riskColRight: {
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 6 / span 6",
    },
  },
  riskList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  riskItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontFamily: typography.body,
    fontSize: {
      default: 14,
      [breakpoints.md]: 16,
    },
    fontWeight: 500,
    color: colors.ink,
  },
  riskCtaWrap: {
    marginTop: 28,
  },
  /* Finale */
  finaleSection: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.brandGreen950,
  },
  finaleThumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.1,
  },
  finaleScrim: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom right, color-mix(in oklch, var(--color-brand-green-950) 90%, transparent), color-mix(in oklch, var(--color-brand-green-950) 70%, transparent), color-mix(in oklch, var(--color-brand-green-900) 90%, transparent))",
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
      [breakpoints.md]: 128,
    },
    paddingBottom: {
      default: 96,
      [breakpoints.md]: 128,
    },
  },
  finaleHeading: {
    marginTop: 24,
    maxWidth: 896,
    fontFamily: typography.display,
    fontSize: {
      default: 36,
      [breakpoints.md]: 60,
    },
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
    color: colors.paper,
    margin: 0,
  },
  finaleLead: {
    marginTop: 28,
    maxWidth: 576,
    fontFamily: typography.body,
    fontSize: {
      default: 16,
      [breakpoints.md]: 18,
    },
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-brand-green-100) 70%, transparent)",
    margin: 0,
  },
  finaleActions: {
    marginTop: 40,
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
  },
  finaleSecondaryBtn: {
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 12,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-500) 40%, transparent)",
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    color: colors.brandGreen200,
    textDecoration: "none",
    transitionProperty: "background-color, border-color, color, transform",
    transitionDuration: "300ms",
    transform: {
      default: "scale(1)",
      ":active": "scale(0.96)",
    },
    ":hover": {
      borderColor: colors.brandGreen400,
      backgroundColor: "color-mix(in oklch, var(--color-brand-green-900) 40%, transparent)",
      color: colors.paper,
    },
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  finaleResponseTime: {
    marginTop: 40,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.brandGreen400,
  },
  officesOuter: {
    marginTop: 80,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.brandGreen800,
    paddingTop: 56,
  },
  officesGrid: {
    marginTop: 32,
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.sm]: "repeat(3, 1fr)",
      [breakpoints.lg]: "repeat(6, 1fr)",
    },
    gap: 1,
    backgroundColor: colors.brandGreen800,
  },
  officeCardBg: {
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-950) 80%, transparent)",
  },
  officeCardInner: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    paddingBottom: 24,
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    ":hover": {
      backgroundColor: "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
    },
  },
  officeCity: {
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    color: colors.paper,
    margin: 0,
  },
  officeShort: {
    marginTop: 2,
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.brandGreen300,
    margin: 0,
  },
  officeCoords: {
    marginTop: 8,
    fontFamily: typography.tech,
    fontSize: 11,
    letterSpacing: "0.14em",
    color: colors.brandGreen300,
    fontVariantNumeric: "tabular-nums",
    margin: 0,
  },
  /* Footer */
  footer: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    backgroundColor: colors.paper,
  },
  footerGrid: {
    display: "grid",
    gap: 48,
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
  footerBrandRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  footerBrandTagline: {
    marginTop: 12,
    fontFamily: typography.body,
    fontSize: 16,
    fontWeight: 500,
    color: colors.brandGreen700,
    margin: 0,
  },
  footerEst: {
    marginTop: 20,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    lineHeight: 2,
    letterSpacing: "0.22em",
    color: colors.mute600,
    margin: 0,
  },
  footerCertsList: {
    marginTop: 24,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  footerCertBadge: {
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue200,
    backgroundColor: colors.brandBlue50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: colors.brandBlue700,
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
      default: colors.mute600,
      ":hover": colors.brandGreen700,
    },
    textDecoration: "underline",
    textDecorationColor: {
      default: colors.line,
      ":hover": colors.brandGreen400,
    },
    textUnderlineOffset: 4,
    transitionProperty: "color, text-decoration-color",
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
    paddingLeft: {
      default: 20,
      [breakpoints.md]: 40,
    },
    paddingRight: {
      default: 20,
      [breakpoints.md]: 40,
    },
    fontFamily: typography.body,
    fontSize: {
      default: "17vw",
      "@media (min-width: 1481px)": "15rem",
    },
    fontWeight: 800,
    lineHeight: 0.78,
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
});
const DIVISION_DOT_KEYS: Record<DivisionKey, keyof typeof styles> = {
  nutrition: "dot_nutrition",
  food: "dot_food",
  cosmetics: "dot_cosmetics",
  chem: "dot_chem",
  agro: "dot_agro",
  feed: "dot_feed",
};

/* ─────────────────────────────── Nav + Portfolio menu ─────────────────────────────── */

function PortfolioMenu() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  return (
    <div
      ref={rootRef}
      {...stylex.props(styles.portfolioMenuRoot)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="portfolio-menu"
        onClick={() => setOpen((v) => !v)}
        {...stylex.props(styles.portfolioMenuBtn)}
      >
        Portfolio
        <ChevronDown
          aria-hidden
          {...stylex.props(styles.portfolioChevron, open && styles.portfolioChevronOpen)}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="portfolio-menu"
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
            style={{
              x: "-50%",
            }}
            {...stylex.props(styles.portfolioPopover)}
          >
            <div {...stylex.props(styles.portfolioGrid)}>
              {MENU_APPLICATIONS.map((application) => {
                const items = getIngredientsByApplication(application).slice(0, 4);
                const division = divisionForApplication(application);
                return (
                  <div key={application} {...stylex.props(styles.portfolioCol)}>
                    <p {...stylex.props(styles.portfolioColHeader)}>
                      <span
                        aria-hidden
                        {...stylex.props(styles.dotBase, styles[DIVISION_DOT_KEYS[division]])}
                      />
                      {application}
                    </p>
                    <ul {...stylex.props(styles.portfolioItemList)}>
                      {items.map((item) => (
                        <li key={item.code}>
                          <a
                            href="#matrix"
                            onClick={() => setOpen(false)}
                            {...stylex.props(styles.portfolioItemLink)}
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div {...stylex.props(styles.portfolioFooter)}>
              <span {...stylex.props(styles.techLabel)}>{ingredients.length} active compounds</span>
              <a
                href="#formulation"
                onClick={() => setOpen(false)}
                {...stylex.props(styles.portfolioFooterLink)}
              >
                Build a formulation
                <ArrowRight aria-hidden size={14} />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const links = [
    {
      label: "Industries",
      href: "#industries",
    },
    {
      label: "Portfolio",
      href: "#matrix",
    },
    {
      label: "Formulation",
      href: "#formulation",
    },
    {
      label: "Standards",
      href: "#standards",
    },
    {
      label: "FAQ",
      href: "#faq",
    },
  ];
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
        <AnimatePresence initial={false} mode="popLayout">
          <m.span
            key={open ? "close" : "open"}
            initial={{
              opacity: 0,
              scale: 0.25,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.25,
              filter: "blur(4px)",
            }}
            transition={
              reduce
                ? {
                    duration: 0,
                  }
                : {
                    type: "spring",
                    duration: 0.3,
                    bounce: 0,
                  }
            }
            style={{
              display: "inline-flex",
            }}
          >
            {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
          </m.span>
        </AnimatePresence>
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
              {links.map((link, idx) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    {...stylex.props(
                      styles.mobileNavLink,
                      idx === links.length - 1 && styles.mobileNavLinkLast,
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
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.container)}>
        {/* Micro-strip */}
        <div {...stylex.props(styles.microStrip)}>
          <span {...stylex.props(styles.microStripItem)}>
            <span {...stylex.props(styles.liveDotOuter)}>
              <span {...stylex.props(styles.liveDotPing)} />
              <span {...stylex.props(styles.liveDotInner)} />
            </span>
            Botanical Intelligence Since 1995
          </span>
          <span {...stylex.props(styles.techLabel)}>ISO 9001 · GMP · HACCP</span>
          <span {...stylex.props(styles.techLabel)}>{company.hq.coords} — Nanjing HQ</span>
        </div>
        {/* Main nav */}
        <nav aria-label="Main navigation" {...stylex.props(styles.navInner)}>
          <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brandLink)}>
            <span {...stylex.props(styles.brandText)}>FENCHEM</span>
            <Leaf aria-hidden strokeWidth={1.5} {...stylex.props(styles.brandLeaf)} />
          </a>
          <div {...stylex.props(styles.navDesktopLinks)}>
            <a href="#industries" {...stylex.props(styles.navLink)}>
              Industries
            </a>
            <PortfolioMenu />
            <a href="#formulation" {...stylex.props(styles.navLink)}>
              Formulation
            </a>
            <a href="#standards" {...stylex.props(styles.navLink)}>
              Standards
            </a>
            <a href="#faq" {...stylex.props(styles.navLink)}>
              FAQ
            </a>
          </div>
          <div {...stylex.props(styles.navRight)}>
            <MobileNav />
            <a href={createInquiryHref()} {...stylex.props(styles.ctaPrimaryCompact)}>
              Request a Specification
              <ArrowRight aria-hidden size={14} />
            </a>
          </div>
        </nav>
      </div>
      {!reduce && (
        <m.div
          aria-hidden
          style={{
            scaleX: scrollYProgress,
          }}
          {...stylex.props(styles.progressHairline)}
        />
      )}
    </header>
  );
}

/* ─────────────────────────────── Hero ─────────────────────────────── */

function HeroSection() {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  return (
    <section id="top" aria-label="Hero" {...stylex.props(styles.heroSection)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.heroGrid)}>
          {/* Left: Headline block */}
          <div {...stylex.props(styles.heroLeft)}>
            <Reveal>
              <p {...stylex.props(styles.heroBadge)}>Botanical Intelligence Since 1995</p>
            </Reveal>
            <Reveal delay={STAGGER}>
              <h1 {...stylex.props(styles.heroHeading)}>
                Nurturing Vitality
                <br />
                through <span {...stylex.props(styles.textGreen600)}>Botanical Excellence</span>
              </h1>
            </Reveal>
            <Reveal delay={STAGGER * 2}>
              <p {...stylex.props(styles.heroLead)}>
                Fenchem converts raw botanical complexity into precisely specified, clinically
                validated actives — supplied at industrial scale to formulators in more than forty
                countries.
              </p>
            </Reveal>
            <Reveal delay={STAGGER * 3}>
              <div {...stylex.props(styles.heroActionsCol)}>
                <div {...stylex.props(styles.heroActions)}>
                  <a href={createInquiryHref()} {...stylex.props(styles.ctaPrimary)}>
                    Request Specifications
                    <ArrowRight aria-hidden size={16} />
                  </a>
                  <a href="#matrix" {...stylex.props(styles.ctaOutlineBlue)}>
                    Explore Portfolio
                  </a>
                </div>
                <p {...stylex.props(styles.heroAnswerNote)}>
                  Response within 24h — full documentation &amp; trial samples
                </p>
              </div>
            </Reveal>

            {/* Stat band */}
            <Reveal delay={STAGGER * 4}>
              <dl {...stylex.props(styles.heroStatGrid)}>
                {STATS.map((s) => (
                  <div key={s.unit} {...stylex.props(styles.heroStatItem)}>
                    <dt {...stylex.props(styles.heroStatUnit)}>{s.unit}</dt>
                    <dd
                      style={{
                        margin: 0,
                        marginTop: 6,
                      }}
                    >
                      <span {...stylex.props(styles.heroStatValue)}>{s.value}</span>
                      <p {...stylex.props(styles.heroStatDesc)}>{s.desc}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: botanical image */}
          <div {...stylex.props(styles.heroRight)}>
            <div ref={imgRef} {...stylex.props(styles.heroImgContainer)}>
              <m.img
                src={IMG.hero}
                alt="Lush green botanical leaves in morning light — representing Fenchem's natural ingredient sourcing"
                style={{
                  y: reduce ? 0 : imgY,
                }}
                initial={
                  reduce
                    ? false
                    : {
                        scale: 1.06,
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
                {...stylex.props(styles.heroImg)}
              />
              <div aria-hidden {...stylex.props(styles.heroImgScrim)} />
            </div>
            {/* Caption badge */}
            <div {...stylex.props(styles.heroCaptionBadge)}>
              <span {...stylex.props(styles.techLabel)}>{company.tagline}</span>
              <span {...stylex.props(styles.eyebrowGreen)}>{company.since}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Ingredient Ticker ─────────────────────────────── */

function TickerSection() {
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  return (
    <section aria-label="Ingredient index ticker" {...stylex.props(styles.tickerSection)}>
      <span aria-hidden {...stylex.props(styles.tickerFadeLeft)} />
      <span aria-hidden {...stylex.props(styles.tickerFadeRight)} />
      <button
        type="button"
        aria-pressed={paused}
        aria-label={paused ? "Resume ingredient ticker" : "Pause ingredient ticker"}
        onClick={() => setPaused((v) => !v)}
        {...stylex.props(styles.tickerPauseBtn)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <m.span
            key={paused ? "play" : "pause"}
            initial={{
              opacity: 0,
              scale: 0.25,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.25,
              filter: "blur(4px)",
            }}
            transition={
              reduce
                ? {
                    duration: 0,
                  }
                : {
                    type: "spring",
                    duration: 0.3,
                    bounce: 0,
                  }
            }
            style={{
              display: "inline-flex",
            }}
          >
            {paused ? (
              <Play
                aria-hidden
                size={14}
                style={{
                  marginLeft: 1,
                }}
              />
            ) : (
              <Pause aria-hidden size={14} />
            )}
          </m.span>
        </AnimatePresence>
      </button>
      <div
        style={
          paused
            ? {
                animationPlayState: "paused",
              }
            : undefined
        }
        {...stylex.props(styles.tickerMarqueeTrack)}
      >
        {([0, 1] as const).map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} {...stylex.props(styles.tickerList)}>
            {ingredients.map((ingredient, i) => (
              <li key={ingredient.name} {...stylex.props(styles.tickerItem)}>
                <span {...stylex.props(styles.tickerText)}>
                  <span {...stylex.props(styles.tickerIndex)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {" — "}
                  {ingredient.name}
                </span>
                <span aria-hidden {...stylex.props(styles.tickerDiamond)} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────── Section header helper ─────────────────────────────── */

function SectionHeader({
  id,
  number,
  label,
  title,
  accent,
  aside,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  accent: string;
  aside?: React.ReactNode;
}) {
  return (
    <div {...stylex.props(styles.sectionHeaderRow)}>
      <Reveal>
        <p {...stylex.props(styles.eyebrowGreen)}>
          {number} — {label}
        </p>
        <h2 id={id} {...stylex.props(styles.sectionHeading)}>
          {title} <span {...stylex.props(styles.textGreen600)}>{accent}</span>
        </h2>
      </Reveal>
      {aside && <Reveal delay={STAGGER}>{aside}</Reveal>}
    </div>
  );
}

/* ─────────────────────────────── Industries ─────────────────────────────── */

function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      {...stylex.props(styles.industriesSection)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHeader
          id="industries-heading"
          number="01"
          label="Application Domains"
          title="Built for three"
          accent="industries"
          aside={
            <p {...stylex.props(styles.sectionAsideLead)}>
              Clinically supported actives engineered for the precise demands of each formulation
              discipline.
            </p>
          }
        />

        <div>
          {industries.map((industry, i) => (
            <a
              key={industry.title}
              href="#matrix"
              aria-label={`${industry.title} — view in the ingredient matrix`}
              {...stylex.props(
                styles.industryRowLink,
                i === industries.length - 1 && styles.industryRowLinkLast,
              )}
            >
              <Reveal delay={i * STAGGER}>
                <div {...stylex.props(styles.industryRowGrid)}>
                  <div {...stylex.props(styles.industryColIndex)}>
                    <span {...stylex.props(styles.industryIndexText)}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div {...stylex.props(styles.industryColTitle)}>
                    <h3 {...stylex.props(styles.industryTitle)}>{industry.title}</h3>
                  </div>
                  <div {...stylex.props(styles.industryColCopy)}>
                    <p {...stylex.props(styles.industryCopy)}>{INDUSTRY_COPY[i]}</p>
                  </div>
                  <div {...stylex.props(styles.industryColImg)}>
                    <img
                      src={industry.image.src}
                      alt={industry.image.alt}
                      loading="lazy"
                      {...stylex.props(styles.industryImg)}
                    />
                  </div>
                  <div {...stylex.props(styles.industryColArrow)}>
                    <ArrowUpRight
                      aria-hidden
                      size={20}
                      {...stylex.props(styles.industryArrowIcon)}
                    />
                  </div>
                </div>
              </Reveal>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Ingredient Matrix ─────────────────────────────── */

function DivisionBadge({ ingredient }: { ingredient: Ingredient }) {
  const division = divisionForApplication(ingredient.application);
  return (
    <span {...stylex.props(styles.divisionBadge)}>
      <span aria-hidden {...stylex.props(styles.dotBase, styles[DIVISION_DOT_KEYS[division]])} />
      {ingredient.application}
    </span>
  );
}
function MatrixSection() {
  return (
    <section id="matrix" aria-labelledby="matrix-heading" {...stylex.props(styles.matrixSection)}>
      <div {...stylex.props(styles.container)}>
        <SectionHeader
          id="matrix-heading"
          number="02"
          label="Active Compounds"
          title="Ingredient"
          accent="matrix"
          aside={
            <a href="#contact" {...stylex.props(styles.ctaOutlineBlueCompact)}>
              Request Full Specifications
              <ArrowRight aria-hidden size={14} />
            </a>
          }
        />

        <div {...stylex.props(styles.matrixGrid)}>
          {getFeaturedIngredients().map((item, i) => (
            <Reveal key={item.code} delay={(i % 3) * STAGGER}>
              <article {...stylex.props(styles.matrixCardBg)}>
                <div {...stylex.props(styles.matrixCardImgBox)}>
                  <img
                    src={imgFor(item).src}
                    alt={imgFor(item).alt}
                    loading="lazy"
                    {...stylex.props(styles.matrixCardImg)}
                  />
                  <DivisionBadge ingredient={item} />
                  <div aria-hidden {...stylex.props(styles.matrixCardHoverOverlay)} />
                </div>
                <div {...stylex.props(styles.matrixCardBody)}>
                  <div {...stylex.props(styles.matrixCardMeta)}>
                    <span {...stylex.props(styles.matrixCardIndex)}>
                      {String(i + 1).padStart(2, "0")} —
                    </span>
                    <span {...stylex.props(styles.matrixCardCode)}>{item.code}</span>
                  </div>
                  <h3 {...stylex.props(styles.matrixCardTitle)}>{item.name}</h3>
                  <p {...stylex.props(styles.matrixCardLatin)}>{item.latin}</p>
                  <dl {...stylex.props(styles.matrixCardDl)}>
                    <div {...stylex.props(styles.matrixCardDlRow)}>
                      <dt {...stylex.props(styles.techLabel)}>Purity</dt>
                      <dd
                        style={{
                          margin: 0,
                          fontFamily: typography.tech,
                          fontSize: 11,
                          color: colors.mute700,
                        }}
                      >
                        {item.purity}
                      </dd>
                    </div>
                    <div {...stylex.props(styles.matrixCardDlRow)}>
                      <dt {...stylex.props(styles.techLabel)}>Form</dt>
                      <dd
                        style={{
                          margin: 0,
                          fontFamily: typography.tech,
                          fontSize: 11,
                          color: colors.mute700,
                        }}
                      >
                        {item.form}
                      </dd>
                    </div>
                  </dl>
                  <a href="#contact" {...stylex.props(styles.matrixSpecLink)}>
                    Request Spec
                    <ArrowUpRight aria-hidden size={12} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Product Dossier ─────────────────────────────── */

const DOSSIER = ingredients[0]; // Ashwagandha KSM-66

function DossierSection() {
  const division = divisionForApplication(DOSSIER.application);
  const specRows = [
    {
      label: "Spec Ref",
      value: DOSSIER.code,
    },
    {
      label: "Assay",
      value: DOSSIER.purity,
    },
    {
      label: "Form",
      value: DOSSIER.form,
    },
    {
      label: "Class",
      value: DOSSIER.category,
    },
    {
      label: "Application",
      value: DOSSIER.useCase,
    },
  ];
  return (
    <section
      id="product"
      aria-labelledby="product-heading"
      {...stylex.props(styles.dossierSection)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHeader
          id="product-heading"
          number="03"
          label="Product Dossier"
          title="One active,"
          accent="documented to the lot"
          aside={
            <p {...stylex.props(styles.sectionAsideLead)}>
              Every compound in the matrix carries this depth of documentation — {DOSSIER.name}{" "}
              shown as the working example.
            </p>
          }
        />

        <div {...stylex.props(styles.dossierGrid)}>
          {/* Image */}
          <div {...stylex.props(styles.dossierImgCol)}>
            <img
              src={imgFor(DOSSIER).src}
              alt={imgFor(DOSSIER).alt}
              loading="lazy"
              {...stylex.props(styles.dossierImg)}
            />
            <div aria-hidden {...stylex.props(styles.dossierImgScrim)} />
            <span {...stylex.props(styles.dossierBadgeTopLeft)}>
              <span
                aria-hidden
                {...stylex.props(styles.dotBase, styles[DIVISION_DOT_KEYS[division]])}
              />
              {DOSSIER.application}
            </span>
            <div {...stylex.props(styles.dossierBadgeBottom)}>
              <span {...stylex.props(styles.techLabel)}>
                {DOSSIER.category} · {DOSSIER.specification}
              </span>
              <span {...stylex.props(styles.eyebrowGreen)}>{DOSSIER.code}</span>
            </div>
          </div>

          {/* Dossier body */}
          <div {...stylex.props(styles.dossierBodyCol)}>
            <Reveal>
              <h3 {...stylex.props(styles.dossierTitle)}>{DOSSIER.name}</h3>
              <p {...stylex.props(styles.dossierLatin)}>{DOSSIER.latin}</p>
              <p {...stylex.props(styles.dossierDescription)}>
                A branded, clinically studied adaptogen standardized by withanolide content.
                Supplied with full identity, potency and stability documentation — chromatographic
                panels run on every production batch, third-party verification on request.
              </p>
            </Reveal>

            <Reveal delay={STAGGER}>
              <dl {...stylex.props(styles.dossierDl)}>
                {specRows.map((row) => (
                  <div key={row.label} {...stylex.props(styles.dossierDlRow)}>
                    <dt {...stylex.props(styles.techLabel)}>{row.label}</dt>
                    <dd {...stylex.props(styles.dossierDd)}>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={STAGGER * 2}>
              <div {...stylex.props(styles.dossierFormatsRow)}>
                {["Capsule", "Tablet", "Softgel", "Powder blend"].map((format) => (
                  <span key={format} {...stylex.props(styles.dossierFormatPill)}>
                    {format}
                  </span>
                ))}
              </div>
              <div {...stylex.props(styles.dossierActionsRow)}>
                <a href={createInquiryHref("dossier")} {...stylex.props(styles.ctaPrimary)}>
                  Request this specification
                  <ArrowRight aria-hidden size={16} />
                </a>
                <a href={createInquiryHref("tds")} {...stylex.props(styles.ctaOutlineBlue)}>
                  <FileDown aria-hidden size={16} />
                  Technical data sheet
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Formulation Presenter ─────────────────────────────── */

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      {...stylex.props(styles.chipBase, selected ? styles.chipSelected : styles.chipUnselected)}
    >
      {label}
    </button>
  );
}
function RadioChips<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  const move = (delta: number) => {
    const next = options[(options.indexOf(value) + delta + options.length) % options.length];
    onChange(next);
  };
  return (
    <div
      role="radiogroup"
      aria-label={label}
      {...stylex.props(styles.chipsWrapRow)}
      onKeyDown={(event) => {
        if (event.key.startsWith("Arrow")) event.stopPropagation();
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          move(1);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          tabIndex={value === option ? 0 : -1}
          ref={(node) => {
            if (
              node &&
              value === option &&
              node.closest('[role="radiogroup"]')?.contains(document.activeElement)
            ) {
              node.focus();
            }
          }}
          onClick={() => onChange(option)}
          {...stylex.props(
            styles.chipBase,
            value === option ? styles.chipSelected : styles.chipUnselected,
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
function FormulationSection() {
  const [application, setApplication] = useState<IngredientApplication>("Nutrition");
  const [form, setForm] = useState<(typeof FORM_OPTIONS)[number]>("Beadlet");
  const [regulatory, setRegulatory] = useState<string[]>(["ISO 9001", "GMP"]);
  const matches = getIngredientsByApplication(application);
  const toggleRegulatory = (name: string) =>
    setRegulatory((current) =>
      current.includes(name) ? current.filter((c) => c !== name) : [...current, name],
    );
  return (
    <section
      id="formulation"
      aria-labelledby="formulation-heading"
      {...stylex.props(styles.formulationSection)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHeader
          id="formulation-heading"
          number="04"
          label="Formulation"
          title="Your target spec,"
          accent="engineered back to you"
          aside={
            <p {...stylex.props(styles.sectionAsideLead)}>
              Pick the shape of your formulation — our laboratory returns a validated proposal
              within one business day.
            </p>
          }
        />

        <div {...stylex.props(styles.formulationGrid)}>
          {/* Pickers */}
          <div {...stylex.props(styles.formulationLeft)}>
            <div>
              <p id="formulation-application-label" {...stylex.props(styles.techLabel)}>
                Application
              </p>
              <RadioChips
                label="Application"
                options={MENU_APPLICATIONS}
                value={application}
                onChange={setApplication}
              />
            </div>

            <div
              style={{
                marginTop: 32,
              }}
            >
              <p {...stylex.props(styles.techLabel)}>Delivery form</p>
              <RadioChips
                label="Delivery form"
                options={FORM_OPTIONS}
                value={form}
                onChange={setForm}
              />
            </div>

            <fieldset {...stylex.props(styles.formulationFieldset)}>
              <legend {...stylex.props(styles.techLabel)}>Regulatory map</legend>
              <div {...stylex.props(styles.chipsWrapRow)}>
                {certificationDetails.map((cert) => (
                  <Chip
                    key={cert.name}
                    label={cert.name}
                    selected={regulatory.includes(cert.name)}
                    onClick={() => toggleRegulatory(cert.name)}
                  />
                ))}
              </div>
            </fieldset>

            {/* Buyer Journey strip */}
            <div {...stylex.props(styles.processStripOuter)}>
              <p {...stylex.props(styles.techLabel)}>Buyer journey</p>
              <ol {...stylex.props(styles.processOl)}>
                {BUYER_JOURNEY.map((step) => (
                  <li key={step.step} {...stylex.props(styles.processLi)}>
                    <span {...stylex.props(styles.processIndex)}>{step.step}</span>
                    <div>
                      <p {...stylex.props(styles.processTitle)}>{step.title}</p>
                      <p {...stylex.props(styles.processCopy)}>{step.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Live spec sheet */}
          <div {...stylex.props(styles.formulationRight)}>
            <div {...stylex.props(styles.specDraftHeader)}>
              <span {...stylex.props(styles.specDraftLabel)}>Draft Specification</span>
              <span {...stylex.props(styles.specDraftCode)}>FN-REQ / 2026</span>
            </div>
            <div aria-live="polite">
              <dl {...stylex.props(styles.specDraftDl)}>
                {[
                  ["Application", application],
                  ["Delivery form", form],
                  ["Regulatory", regulatory.length ? regulatory.join(" · ") : "—"],
                  ["Matching actives", `${matches.length} of ${ingredients.length} in portfolio`],
                  ["Response", "< 24h with full documentation"],
                ].map(([label, value]) => (
                  <div key={label} {...stylex.props(styles.specDraftDlRow)}>
                    <dt {...stylex.props(styles.specDraftDt)}>{label}</dt>
                    <dd {...stylex.props(styles.specDraftDd)}>{value}</dd>
                  </div>
                ))}
              </dl>
              <ul {...stylex.props(styles.specMatchesList)}>
                {matches.slice(0, 3).map((item) => (
                  <li key={item.code} {...stylex.props(styles.specMatchItem)}>
                    <CheckCircle2 aria-hidden size={12} color={colors.brandGreen400} />
                    {item.name} — {item.purity}
                  </li>
                ))}
              </ul>
            </div>
            <a href={createInquiryHref("formulation")} {...stylex.props(styles.specSubmitBtn)}>
              Submit this specification
              <ArrowRight aria-hidden size={16} />
            </a>
            <p {...stylex.props(styles.specDossiersRequestNote)}>Technical dossiers on request</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Origin + Standards ─────────────────────────────── */

function StandardsSection() {
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <section
      id="standards"
      aria-labelledby="standards-heading"
      {...stylex.props(styles.standardsSection)}
    >
      <div {...stylex.props(styles.container)}>
        {/* Origin editorial beat */}
        <div {...stylex.props(styles.originGrid)}>
          <div {...stylex.props(styles.originImgCol)}>
            <img
              src={IMG.origin}
              alt="Rows of cultivated green crops on a partner farm at golden hour"
              loading="lazy"
              {...stylex.props(styles.originImg)}
            />
          </div>
          <div {...stylex.props(styles.originTextCol)}>
            <Reveal>
              <p {...stylex.props(styles.eyebrowGreen)}>Origin</p>
              <h2 {...stylex.props(styles.originTitle)}>
                Grown with{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: colors.brandGreen600,
                  }}
                >
                  patience.
                </em>
              </h2>
              <p {...stylex.props(styles.heroLead)}>
                Our botanicals begin in soil we know by name — a global network of partner farms
                cultivated over decades, where harvests are timed to the plant, never to the
                quarter.
              </p>
              <blockquote {...stylex.props(styles.originQuote)}>
                "Nature holds the keys to human vitality. We simply refuse to lose them in
                translation."
              </blockquote>
            </Reveal>
          </div>
        </div>

        <SectionHeader
          id="standards-heading"
          number="05"
          label="Quality Infrastructure"
          title="Science-backed"
          accent="standards"
          aside={
            <p {...stylex.props(styles.sectionAsideLead)}>
              Every lot. Every market. Every release — documented to your regulatory map.
            </p>
          }
        />

        <div {...stylex.props(styles.standardsGrid)}>
          {/* Image */}
          <div {...stylex.props(styles.labImgCol)}>
            <div ref={imgRef} {...stylex.props(styles.labImgContainer)}>
              <m.img
                src={IMG.lab}
                alt="Dense botanical foliage awaiting quality-control intake at the Nanjing laboratory"
                style={{
                  y: reduce ? 0 : imgY,
                }}
                loading="lazy"
                {...stylex.props(styles.labImg)}
              />
              <div aria-hidden {...stylex.props(styles.labImgScrim)} />
              <div {...stylex.props(styles.labCaptionBadge)}>
                <span {...stylex.props(styles.techLabel)}>QC Program — Nanjing</span>
                <span {...stylex.props(styles.eyebrowGreen)}>Identity · Potency · Stability</span>
              </div>
            </div>
          </div>

          {/* Pillars — outcome-first copy */}
          <div {...stylex.props(styles.pillarsCol)}>
            {PILLARS_OUTCOME.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal key={pillar.title} delay={i * STAGGER}>
                  <div
                    {...stylex.props(
                      styles.pillarInner,
                      i < PILLARS_OUTCOME.length - 1 && styles.pillarRowBorder,
                    )}
                  >
                    <div {...stylex.props(styles.pillarIconBox)}>
                      <Icon aria-hidden strokeWidth={1.5} size={24} />
                    </div>
                    <div>
                      <h3 {...stylex.props(styles.pillarTitle)}>{pillar.title}</h3>
                      <p {...stylex.props(styles.pillarCopy)}>{pillar.copy}</p>
                      <div {...stylex.props(styles.pillarCert)}>
                        <CheckCircle2 aria-hidden size={14} />
                        ISO 9001 · GMP Certified
                      </div>
                    </div>
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

/* ─────────────────────────────── FAQ ─────────────────────────────── */

function FaqRow({ index, question, answer }: { index: number; question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const code = String(index + 1).padStart(2, "0");
  const buttonId = `faq-trigger-${code}`;
  const panelId = `faq-panel-${code}`;
  return (
    <div {...stylex.props(styles.faqRow, index === FAQ_ITEMS.length - 1 && styles.faqRowLast)}>
      <h3 {...stylex.props(styles.faqHeadingWrap)}>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          {...stylex.props(styles.faqBtn)}
        >
          <span {...stylex.props(styles.faqBtnLeft)}>
            <span {...stylex.props(styles.faqCode)}>FAQ.{code}</span>
            <span {...stylex.props(styles.faqQuestion)}>{question}</span>
          </span>
          <ChevronDown
            aria-hidden
            {...stylex.props(styles.faqChevron, open && styles.faqChevronOpen)}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={
              reduce
                ? {
                    opacity: 0,
                  }
                : {
                    height: 0,
                    opacity: 0,
                  }
            }
            animate={
              reduce
                ? {
                    opacity: 1,
                  }
                : {
                    height: "auto",
                    opacity: 1,
                  }
            }
            exit={
              reduce
                ? {
                    opacity: 0,
                  }
                : {
                    height: 0,
                    opacity: 0,
                  }
            }
            transition={{
              duration: reduce ? 0 : 0.32,
              ease: EASE,
            }}
            {...stylex.props(styles.faqPanelBox)}
          >
            <div {...stylex.props(styles.faqPanelInner)}>
              <p {...stylex.props(styles.faqAnswer)}>{answer}</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" {...stylex.props(styles.faqSection)}>
      <div {...stylex.props(styles.container)}>
        <SectionHeader
          id="faq-heading"
          number="06"
          label="FAQ"
          title="Answers before"
          accent="you ask"
          aside={
            <p {...stylex.props(styles.sectionAsideLead)}>
              Grounded in the documentation that travels with every lot. Anything else — a technical
              response lands within 24 hours.
            </p>
          }
        />
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FaqRow key={item.q} index={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Risk Reversal ─────────────────────────────── */

function RiskReversalSection() {
  return (
    <section aria-labelledby="risk-heading" {...stylex.props(styles.riskSection)}>
      <div {...stylex.props(styles.container, styles.riskInner)}>
        <div {...stylex.props(styles.riskGrid)}>
          <div {...stylex.props(styles.riskColLeft)}>
            <Reveal>
              <p {...stylex.props(styles.eyebrowGreen)}>Risk Reversal</p>
              <h2 id="risk-heading" {...stylex.props(styles.riskHeading)}>
                Zero-commitment <span {...stylex.props(styles.textGreen600)}>start.</span>
              </h2>
              <p {...stylex.props(styles.riskLead)}>
                Send a spec, validate a sample with full documentation — before any purchase order.
              </p>
            </Reveal>
          </div>
          <div {...stylex.props(styles.riskColRight)}>
            <Reveal delay={STAGGER}>
              <ul {...stylex.props(styles.riskList)}>
                {RISK_POINTS.map((point) => (
                  <li key={point} {...stylex.props(styles.riskItem)}>
                    <CheckCircle2 aria-hidden size={16} color={colors.brandGreen600} />
                    {point}
                  </li>
                ))}
              </ul>
              <div {...stylex.props(styles.riskCtaWrap)}>
                <a href={createInquiryHref()} {...stylex.props(styles.ctaPrimary)}>
                  Request Specifications
                  <ArrowRight aria-hidden size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Deep-Green Finale ─────────────────────────────── */

function FinaleSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      {...stylex.props(styles.finaleSection)}
    >
      <m.div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          y: reduce ? 0 : bgY,
        }}
      >
        <img src={IMG.heroThumb} alt="" loading="lazy" {...stylex.props(styles.finaleThumbImg)} />
      </m.div>
      <div aria-hidden {...stylex.props(styles.finaleScrim)} />

      <div {...stylex.props(styles.container, styles.finaleInner)}>
        <Reveal>
          <p {...stylex.props(styles.eyebrowGreen400)}>07 — Partner with Fenchem</p>
          <h2 id="contact-heading" {...stylex.props(styles.finaleHeading)}>
            Your next formulation,{" "}
            <span
              style={{
                color: colors.brandGreen400,
              }}
            >
              engineered to specification
            </span>
          </h2>
          <p {...stylex.props(styles.finaleLead)}>
            Submit a target spec — purity, form, matrix, regulatory map — and our laboratory returns
            a validated proposal with full documentation within one business day.
          </p>
        </Reveal>

        <Reveal delay={STAGGER * 2}>
          <div {...stylex.props(styles.finaleActions)}>
            <a href={createInquiryHref("contact")} {...stylex.props(styles.ctaPrimaryDark)}>
              Request Specifications
              <ArrowRight aria-hidden size={16} />
            </a>
            <a href="#matrix" {...stylex.props(styles.finaleSecondaryBtn)}>
              Explore Portfolio
            </a>
          </div>
        </Reveal>

        <Reveal delay={STAGGER * 3}>
          <p {...stylex.props(styles.finaleResponseTime)}>
            Response Time &lt; 24h — Technical Dossiers on Request
          </p>
        </Reveal>

        {/* Office nodes */}
        <div {...stylex.props(styles.officesOuter)}>
          <Reveal>
            <p {...stylex.props(styles.eyebrowGreen400)}>6 Global Bases — 40+ Countries Served</p>
          </Reveal>
          <div {...stylex.props(styles.officesGrid)}>
            {regions.map((region, i) => (
              <Reveal key={region.city} delay={i * (STAGGER * 0.75)}>
                <div {...stylex.props(styles.officeCardBg)}>
                  <div {...stylex.props(styles.officeCardInner)}>
                    <p {...stylex.props(styles.officeCity)}>{region.city}</p>
                    <p {...stylex.props(styles.officeShort)}>{region.short}</p>
                    <p {...stylex.props(styles.officeCoords)}>{region.coords}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
          {/* Brand block */}
          <div {...stylex.props(styles.footerBrandCol)}>
            <div {...stylex.props(styles.footerBrandRow)}>
              <span {...stylex.props(styles.brandText)}>FENCHEM</span>
              <Leaf aria-hidden strokeWidth={1.5} size={20} color={colors.brandGreen500} />
            </div>
            <p {...stylex.props(styles.footerBrandTagline)}>{company.tagline}.</p>
            <p {...stylex.props(styles.footerEst)}>
              ISO 9001 : 2015 · GMP · HACCP
              <br />
              Est. {company.founded} — {company.hq.city}, {company.hq.country}
            </p>
            <div {...stylex.props(styles.footerCertsList)}>
              {certifications.map((cert) => (
                <span key={cert} {...stylex.props(styles.footerCertBadge)}>
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.head} {...stylex.props(styles.footerNavCol)}>
              <p {...stylex.props(styles.techLabel)}>{col.head}</p>
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

        {/* Wordmark watermark */}
        <p aria-hidden {...stylex.props(styles.footerWordmark)}>
          FENCHEM
        </p>

        {/* Legal strip */}
        <div {...stylex.props(styles.footerLegal)}>
          <span>© 2026 {company.legalName} — All Rights Reserved</span>
          <span
            style={{
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {company.hq.coords} — Nanjing, China
          </span>
          <span
            style={{
              color: colors.brandGreen700,
            }}
          >
            Botanical Intelligence Since 1995
          </span>
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
export function VariantW() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        <SmoothScroll />
        <NavBar />
        <main>
          <HeroSection />
          <TickerSection />
          <IndustriesSection />
          <MatrixSection />
          <DossierSection />
          <FormulationSection />
          <StandardsSection />
          <FaqSection />
          <RiskReversalSection />
          <FinaleSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
