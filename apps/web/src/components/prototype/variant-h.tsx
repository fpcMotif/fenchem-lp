import { ProductionPage } from "./shared/page-shells";
import {
  IngredientCardDetails,
  IngredientDossierDetails,
} from "./shared/corporate-content-sections";
import type { DivisionKey } from "@/components/landing/landing-content";
import { DivisionBadge } from "./shared/production-navigation";
import { SectionHeader } from "./shared/production-sections";

/*
 * PROTOTYPE — Variant H: "Production" — the recommended direction.
 * VariantG's hybrid structure with every finding from the 2026-08 design
 * review applied, plus the three modules the set was missing: a real product
 * dropdown in the nav, an ingredient dossier (product intro), and an
 * interactive formulation presenter.
 *
 * Measured color decisions (WCAG ratios in docs/brand/landing-variants-design-review.md):
 *   - Primary CTA: text-brand-green-950 on bg-brand-green-500 (5.18:1);
 *     hover bg-brand-green-400 (6.92:1). White-on-green-500 failed at 2.95:1.
 *   - Blue is INTERACTIVE-ONLY (outline CTAs, links). Eyebrows/section
 *     numerals use brand-green-700 (5.73:1 on paper).
 *   - Small text floor: mute-600 (6.00:1); mute-400/500 are border/decoration
 *     tier only. font-tech micro-labels floor at 11px.
 *   - Division badges: solid paper chip + ink text + color dot — readable
 *     over any photograph (white-on-food failed at 2.76:1).
 *   - Finale labels: full-opacity green-400 (6.92:1) / green-300 coords
 *     (9.35:1); the alpha-muted greens failed at 2.2–2.8:1.
 *
 * Section order:
 *   Nav (portfolio menu) → Hero (stat band) → Ticker → Industries → Matrix
 *   → Product Dossier → Formulation Presenter → Origin + Standards → Finale → Footer
 */
import { useEffect } from "react";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import { STAGGER } from "@/components/prototype/motion-constants";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  divisionForApplication,
  getFeaturedIngredients,
  industries,
  ingredients,
  type Ingredient,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Constants ─────────────────────────────── */

const IMAGE_OVERRIDES: Record<
  string,
  {
    src: string;
    alt: string;
  }
> = {
  "FN-014": {
    src: "https://images.unsplash.com/photo-1569936906148-06de87cb0681?auto=format&fit=crop&w=900&q=80",
    alt: "Hands holding soil and a young seedling — the root origin of Ashwagandha KSM-66",
  },
  "FN-052": {
    src: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh food bowl with vibrant natural ingredients — curcumin as clean-label color",
  },
  "FN-068": {
    src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
    alt: "Macro leaf covered in dew droplets — hydration, the signature of hyaluronic acid",
  },
};
const imgFor = (item: Ingredient) => IMAGE_OVERRIDES[item.code] ?? item.image;

const INDUSTRY_COPY = [
  "Bioavailable actives standardized for potency, stability and dose accuracy — from Ashwagandha KSM-66 to Coenzyme Q10.",
  "Heat- and pH-stable carotenoids, plant proteins and functional botanicals for clean-label fortification at scale.",
  "Dermatologically active botanicals and hyaluronic acid systems formulated for cellular compatibility and sensory performance.",
] as const;

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
      default: null,
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
      default: null,
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
  heroActions: {
    marginTop: 36,
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
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
      [breakpoints.sm]: "repeat(2, 1fr)",
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
      default: null,
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

/* ─────────────────────────────── Nav + Portfolio menu ─────────────────────────────── */

/* ─────────────────────────────── Hero ─────────────────────────────── */

/* ─────────────────────────────── Ingredient Ticker ─────────────────────────────── */

/* ─────────────────────────────── Section header helper ─────────────────────────────── */

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
          styles={{
            container: styles.container,
            header: styles.header,
            microStrip: styles.microStrip,
            navLink: styles.navLink,
            heroSection: styles.heroSection,
            heroGrid: styles.heroGrid,
            heroLeft: styles.heroLeft,
            heroImg: styles.heroImg,
            footer: styles.footer,
            footerGrid: styles.footerGrid,
            footerBrandCol: styles.footerBrandCol,
            footerNavCol: styles.footerNavCol,
            heroStatUnit: styles.heroStatUnit,
            heroStatDesc: styles.heroStatDesc,
            heroRight: styles.heroRight,
            standardsSection: styles.standardsSection,
            standardsGrid: styles.standardsGrid,
            finaleSection: styles.finaleSection,
            finaleSecondaryBtn: styles.finaleSecondaryBtn,
            footerBrandRow: styles.footerBrandRow,
            footerWordmark: styles.footerWordmark,
            footerCertBadge: styles.footerCertBadge,
            microStripItem: styles.microStripItem,
            liveDotOuter: styles.liveDotOuter,
            liveDotPing: styles.liveDotPing,
            liveDotInner: styles.liveDotInner,
            techLabel: styles.techLabel,
            navInner: styles.navInner,
            brandLink: styles.brandLink,
            brandText: styles.brandText,
            brandLeaf: styles.brandLeaf,
            navDesktopLinks: styles.navDesktopLinks,
            navRight: styles.navRight,
            ctaPrimaryCompact: styles.ctaPrimaryCompact,
            progressHairline: styles.progressHairline,
            heroBadge: styles.heroBadge,
            heroHeading: styles.heroHeading,
            textGreen600: styles.textGreen600,
            heroLead: styles.heroLead,
            heroActions: styles.heroActions,
            ctaPrimary: styles.ctaPrimary,
            ctaOutlineBlue: styles.ctaOutlineBlue,
            heroStatGrid: styles.heroStatGrid,
            heroStatItem: styles.heroStatItem,
            heroStatValue: styles.heroStatValue,
            heroImgContainer: styles.heroImgContainer,
            heroImgScrim: styles.heroImgScrim,
            heroCaptionBadge: styles.heroCaptionBadge,
            eyebrowGreen: styles.eyebrowGreen,
            formulationSection: styles.formulationSection,
            sectionAsideLead: styles.sectionAsideLead,
            formulationGrid: styles.formulationGrid,
            formulationLeft: styles.formulationLeft,
            formulationFieldset: styles.formulationFieldset,
            chipsWrapRow: styles.chipsWrapRow,
            processStripOuter: styles.processStripOuter,
            processOl: styles.processOl,
            processLi: styles.processLi,
            processIndex: styles.processIndex,
            processTitle: styles.processTitle,
            processCopy: styles.processCopy,
            formulationRight: styles.formulationRight,
            specDraftHeader: styles.specDraftHeader,
            specDraftLabel: styles.specDraftLabel,
            specDraftCode: styles.specDraftCode,
            specDraftDl: styles.specDraftDl,
            specDraftDlRow: styles.specDraftDlRow,
            specDraftDt: styles.specDraftDt,
            specDraftDd: styles.specDraftDd,
            specMatchesList: styles.specMatchesList,
            specMatchItem: styles.specMatchItem,
            specSubmitBtn: styles.specSubmitBtn,
            specDossiersRequestNote: styles.specDossiersRequestNote,
            originGrid: styles.originGrid,
            originImgCol: styles.originImgCol,
            originImg: styles.originImg,
            originTextCol: styles.originTextCol,
            originTitle: styles.originTitle,
            originQuote: styles.originQuote,
            labImgCol: styles.labImgCol,
            labImgContainer: styles.labImgContainer,
            labImg: styles.labImg,
            labImgScrim: styles.labImgScrim,
            labCaptionBadge: styles.labCaptionBadge,
            pillarsCol: styles.pillarsCol,
            pillarInner: styles.pillarInner,
            pillarRowBorder: styles.pillarRowBorder,
            pillarIconBox: styles.pillarIconBox,
            pillarTitle: styles.pillarTitle,
            pillarCopy: styles.pillarCopy,
            pillarCert: styles.pillarCert,
            finaleThumbImg: styles.finaleThumbImg,
            finaleScrim: styles.finaleScrim,
            finaleInner: styles.finaleInner,
            eyebrowGreen400: styles.eyebrowGreen400,
            finaleHeading: styles.finaleHeading,
            finaleLead: styles.finaleLead,
            finaleActions: styles.finaleActions,
            ctaPrimaryDark: styles.ctaPrimaryDark,
            finaleResponseTime: styles.finaleResponseTime,
            officesOuter: styles.officesOuter,
            officesGrid: styles.officesGrid,
            officeCardBg: styles.officeCardBg,
            officeCardInner: styles.officeCardInner,
            officeCity: styles.officeCity,
            officeShort: styles.officeShort,
            officeCoords: styles.officeCoords,
            footerBrandTagline: styles.footerBrandTagline,
            footerEst: styles.footerEst,
            footerCertsList: styles.footerCertsList,
            footerNavList: styles.footerNavList,
            footerNavLink: styles.footerNavLink,
            footerLegal: styles.footerLegal,
            sectionHeaderRow: styles.sectionHeaderRow,
            sectionHeading: styles.sectionHeading,
            chipBase: styles.chipBase,
            chipSelected: styles.chipSelected,
            chipUnselected: styles.chipUnselected,
          }}
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

function MatrixSection() {
  return (
    <section id="matrix" aria-labelledby="matrix-heading" {...stylex.props(styles.matrixSection)}>
      <div {...stylex.props(styles.container)}>
        <SectionHeader
          styles={{
            container: styles.container,
            header: styles.header,
            microStrip: styles.microStrip,
            navLink: styles.navLink,
            heroSection: styles.heroSection,
            heroGrid: styles.heroGrid,
            heroLeft: styles.heroLeft,
            heroImg: styles.heroImg,
            footer: styles.footer,
            footerGrid: styles.footerGrid,
            footerBrandCol: styles.footerBrandCol,
            footerNavCol: styles.footerNavCol,
            heroStatUnit: styles.heroStatUnit,
            heroStatDesc: styles.heroStatDesc,
            heroRight: styles.heroRight,
            standardsSection: styles.standardsSection,
            standardsGrid: styles.standardsGrid,
            finaleSection: styles.finaleSection,
            finaleSecondaryBtn: styles.finaleSecondaryBtn,
            footerBrandRow: styles.footerBrandRow,
            footerWordmark: styles.footerWordmark,
            footerCertBadge: styles.footerCertBadge,
            microStripItem: styles.microStripItem,
            liveDotOuter: styles.liveDotOuter,
            liveDotPing: styles.liveDotPing,
            liveDotInner: styles.liveDotInner,
            techLabel: styles.techLabel,
            navInner: styles.navInner,
            brandLink: styles.brandLink,
            brandText: styles.brandText,
            brandLeaf: styles.brandLeaf,
            navDesktopLinks: styles.navDesktopLinks,
            navRight: styles.navRight,
            ctaPrimaryCompact: styles.ctaPrimaryCompact,
            progressHairline: styles.progressHairline,
            heroBadge: styles.heroBadge,
            heroHeading: styles.heroHeading,
            textGreen600: styles.textGreen600,
            heroLead: styles.heroLead,
            heroActions: styles.heroActions,
            ctaPrimary: styles.ctaPrimary,
            ctaOutlineBlue: styles.ctaOutlineBlue,
            heroStatGrid: styles.heroStatGrid,
            heroStatItem: styles.heroStatItem,
            heroStatValue: styles.heroStatValue,
            heroImgContainer: styles.heroImgContainer,
            heroImgScrim: styles.heroImgScrim,
            heroCaptionBadge: styles.heroCaptionBadge,
            eyebrowGreen: styles.eyebrowGreen,
            formulationSection: styles.formulationSection,
            sectionAsideLead: styles.sectionAsideLead,
            formulationGrid: styles.formulationGrid,
            formulationLeft: styles.formulationLeft,
            formulationFieldset: styles.formulationFieldset,
            chipsWrapRow: styles.chipsWrapRow,
            processStripOuter: styles.processStripOuter,
            processOl: styles.processOl,
            processLi: styles.processLi,
            processIndex: styles.processIndex,
            processTitle: styles.processTitle,
            processCopy: styles.processCopy,
            formulationRight: styles.formulationRight,
            specDraftHeader: styles.specDraftHeader,
            specDraftLabel: styles.specDraftLabel,
            specDraftCode: styles.specDraftCode,
            specDraftDl: styles.specDraftDl,
            specDraftDlRow: styles.specDraftDlRow,
            specDraftDt: styles.specDraftDt,
            specDraftDd: styles.specDraftDd,
            specMatchesList: styles.specMatchesList,
            specMatchItem: styles.specMatchItem,
            specSubmitBtn: styles.specSubmitBtn,
            specDossiersRequestNote: styles.specDossiersRequestNote,
            originGrid: styles.originGrid,
            originImgCol: styles.originImgCol,
            originImg: styles.originImg,
            originTextCol: styles.originTextCol,
            originTitle: styles.originTitle,
            originQuote: styles.originQuote,
            labImgCol: styles.labImgCol,
            labImgContainer: styles.labImgContainer,
            labImg: styles.labImg,
            labImgScrim: styles.labImgScrim,
            labCaptionBadge: styles.labCaptionBadge,
            pillarsCol: styles.pillarsCol,
            pillarInner: styles.pillarInner,
            pillarRowBorder: styles.pillarRowBorder,
            pillarIconBox: styles.pillarIconBox,
            pillarTitle: styles.pillarTitle,
            pillarCopy: styles.pillarCopy,
            pillarCert: styles.pillarCert,
            finaleThumbImg: styles.finaleThumbImg,
            finaleScrim: styles.finaleScrim,
            finaleInner: styles.finaleInner,
            eyebrowGreen400: styles.eyebrowGreen400,
            finaleHeading: styles.finaleHeading,
            finaleLead: styles.finaleLead,
            finaleActions: styles.finaleActions,
            ctaPrimaryDark: styles.ctaPrimaryDark,
            finaleResponseTime: styles.finaleResponseTime,
            officesOuter: styles.officesOuter,
            officesGrid: styles.officesGrid,
            officeCardBg: styles.officeCardBg,
            officeCardInner: styles.officeCardInner,
            officeCity: styles.officeCity,
            officeShort: styles.officeShort,
            officeCoords: styles.officeCoords,
            footerBrandTagline: styles.footerBrandTagline,
            footerEst: styles.footerEst,
            footerCertsList: styles.footerCertsList,
            footerNavList: styles.footerNavList,
            footerNavLink: styles.footerNavLink,
            footerLegal: styles.footerLegal,
            sectionHeaderRow: styles.sectionHeaderRow,
            sectionHeading: styles.sectionHeading,
            chipBase: styles.chipBase,
            chipSelected: styles.chipSelected,
            chipUnselected: styles.chipUnselected,
          }}
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
                  <DivisionBadge
                    styles={{
                      tickerSection: styles.tickerSection,
                      tickerList: styles.tickerList,
                      tickerItem: styles.tickerItem,
                      tickerText: styles.tickerText,
                      tickerDiamond: styles.tickerDiamond,
                      techLabel: styles.techLabel,
                      dotBase: styles.dotBase,
                      dot_nutrition: styles.dot_nutrition,
                      dot_food: styles.dot_food,
                      dot_cosmetics: styles.dot_cosmetics,
                      dot_chem: styles.dot_chem,
                      dot_agro: styles.dot_agro,
                      dot_feed: styles.dot_feed,
                      portfolioMenuRoot: styles.portfolioMenuRoot,
                      portfolioMenuBtn: styles.portfolioMenuBtn,
                      portfolioChevron: styles.portfolioChevron,
                      portfolioChevronOpen: styles.portfolioChevronOpen,
                      portfolioPopover: styles.portfolioPopover,
                      portfolioGrid: styles.portfolioGrid,
                      portfolioCol: styles.portfolioCol,
                      portfolioColHeader: styles.portfolioColHeader,
                      portfolioItemList: styles.portfolioItemList,
                      portfolioItemLink: styles.portfolioItemLink,
                      portfolioFooter: styles.portfolioFooter,
                      portfolioFooterLink: styles.portfolioFooterLink,
                      mobileNavWrapper: styles.mobileNavWrapper,
                      mobileMenuBtn: styles.mobileMenuBtn,
                      mobileMenuPopover: styles.mobileMenuPopover,
                      mobileMenuList: styles.mobileMenuList,
                      mobileNavLink: styles.mobileNavLink,
                      mobileNavLinkLast: styles.mobileNavLinkLast,
                      tickerFadeLeft: styles.tickerFadeLeft,
                      tickerFadeRight: styles.tickerFadeRight,
                      tickerPauseBtn: styles.tickerPauseBtn,
                      tickerMarqueeTrack: styles.tickerMarqueeTrack,
                      tickerIndex: styles.tickerIndex,
                      divisionBadge: styles.divisionBadge,
                    }}
                    ingredient={item}
                  />
                  <div aria-hidden {...stylex.props(styles.matrixCardHoverOverlay)} />
                </div>
                <IngredientCardDetails
                  styles={{
                    matrixCardBody: styles.matrixCardBody,
                    matrixCardMeta: styles.matrixCardMeta,
                    matrixCardIndex: styles.matrixCardIndex,
                    matrixCardCode: styles.matrixCardCode,
                    matrixCardTitle: styles.matrixCardTitle,
                    matrixCardLatin: styles.matrixCardLatin,
                    matrixCardDl: styles.matrixCardDl,
                    matrixCardDlRow: styles.matrixCardDlRow,
                    techLabel: styles.techLabel,
                    matrixSpecLink: styles.matrixSpecLink,
                  }}
                  i={i}
                  item={item}
                />
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

const SPEC_ROWS = [
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

function DossierSection() {
  const division = divisionForApplication(DOSSIER.application);
  return (
    <section
      id="product"
      aria-labelledby="product-heading"
      {...stylex.props(styles.dossierSection)}
    >
      <div {...stylex.props(styles.container)}>
        <SectionHeader
          styles={{
            container: styles.container,
            header: styles.header,
            microStrip: styles.microStrip,
            navLink: styles.navLink,
            heroSection: styles.heroSection,
            heroGrid: styles.heroGrid,
            heroLeft: styles.heroLeft,
            heroImg: styles.heroImg,
            footer: styles.footer,
            footerGrid: styles.footerGrid,
            footerBrandCol: styles.footerBrandCol,
            footerNavCol: styles.footerNavCol,
            heroStatUnit: styles.heroStatUnit,
            heroStatDesc: styles.heroStatDesc,
            heroRight: styles.heroRight,
            standardsSection: styles.standardsSection,
            standardsGrid: styles.standardsGrid,
            finaleSection: styles.finaleSection,
            finaleSecondaryBtn: styles.finaleSecondaryBtn,
            footerBrandRow: styles.footerBrandRow,
            footerWordmark: styles.footerWordmark,
            footerCertBadge: styles.footerCertBadge,
            microStripItem: styles.microStripItem,
            liveDotOuter: styles.liveDotOuter,
            liveDotPing: styles.liveDotPing,
            liveDotInner: styles.liveDotInner,
            techLabel: styles.techLabel,
            navInner: styles.navInner,
            brandLink: styles.brandLink,
            brandText: styles.brandText,
            brandLeaf: styles.brandLeaf,
            navDesktopLinks: styles.navDesktopLinks,
            navRight: styles.navRight,
            ctaPrimaryCompact: styles.ctaPrimaryCompact,
            progressHairline: styles.progressHairline,
            heroBadge: styles.heroBadge,
            heroHeading: styles.heroHeading,
            textGreen600: styles.textGreen600,
            heroLead: styles.heroLead,
            heroActions: styles.heroActions,
            ctaPrimary: styles.ctaPrimary,
            ctaOutlineBlue: styles.ctaOutlineBlue,
            heroStatGrid: styles.heroStatGrid,
            heroStatItem: styles.heroStatItem,
            heroStatValue: styles.heroStatValue,
            heroImgContainer: styles.heroImgContainer,
            heroImgScrim: styles.heroImgScrim,
            heroCaptionBadge: styles.heroCaptionBadge,
            eyebrowGreen: styles.eyebrowGreen,
            formulationSection: styles.formulationSection,
            sectionAsideLead: styles.sectionAsideLead,
            formulationGrid: styles.formulationGrid,
            formulationLeft: styles.formulationLeft,
            formulationFieldset: styles.formulationFieldset,
            chipsWrapRow: styles.chipsWrapRow,
            processStripOuter: styles.processStripOuter,
            processOl: styles.processOl,
            processLi: styles.processLi,
            processIndex: styles.processIndex,
            processTitle: styles.processTitle,
            processCopy: styles.processCopy,
            formulationRight: styles.formulationRight,
            specDraftHeader: styles.specDraftHeader,
            specDraftLabel: styles.specDraftLabel,
            specDraftCode: styles.specDraftCode,
            specDraftDl: styles.specDraftDl,
            specDraftDlRow: styles.specDraftDlRow,
            specDraftDt: styles.specDraftDt,
            specDraftDd: styles.specDraftDd,
            specMatchesList: styles.specMatchesList,
            specMatchItem: styles.specMatchItem,
            specSubmitBtn: styles.specSubmitBtn,
            specDossiersRequestNote: styles.specDossiersRequestNote,
            originGrid: styles.originGrid,
            originImgCol: styles.originImgCol,
            originImg: styles.originImg,
            originTextCol: styles.originTextCol,
            originTitle: styles.originTitle,
            originQuote: styles.originQuote,
            labImgCol: styles.labImgCol,
            labImgContainer: styles.labImgContainer,
            labImg: styles.labImg,
            labImgScrim: styles.labImgScrim,
            labCaptionBadge: styles.labCaptionBadge,
            pillarsCol: styles.pillarsCol,
            pillarInner: styles.pillarInner,
            pillarRowBorder: styles.pillarRowBorder,
            pillarIconBox: styles.pillarIconBox,
            pillarTitle: styles.pillarTitle,
            pillarCopy: styles.pillarCopy,
            pillarCert: styles.pillarCert,
            finaleThumbImg: styles.finaleThumbImg,
            finaleScrim: styles.finaleScrim,
            finaleInner: styles.finaleInner,
            eyebrowGreen400: styles.eyebrowGreen400,
            finaleHeading: styles.finaleHeading,
            finaleLead: styles.finaleLead,
            finaleActions: styles.finaleActions,
            ctaPrimaryDark: styles.ctaPrimaryDark,
            finaleResponseTime: styles.finaleResponseTime,
            officesOuter: styles.officesOuter,
            officesGrid: styles.officesGrid,
            officeCardBg: styles.officeCardBg,
            officeCardInner: styles.officeCardInner,
            officeCity: styles.officeCity,
            officeShort: styles.officeShort,
            officeCoords: styles.officeCoords,
            footerBrandTagline: styles.footerBrandTagline,
            footerEst: styles.footerEst,
            footerCertsList: styles.footerCertsList,
            footerNavList: styles.footerNavList,
            footerNavLink: styles.footerNavLink,
            footerLegal: styles.footerLegal,
            sectionHeaderRow: styles.sectionHeaderRow,
            sectionHeading: styles.sectionHeading,
            chipBase: styles.chipBase,
            chipSelected: styles.chipSelected,
            chipUnselected: styles.chipUnselected,
          }}
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
          <IngredientDossierDetails
            styles={{
              dossierBodyCol: styles.dossierBodyCol,
              dossierTitle: styles.dossierTitle,
              dossierLatin: styles.dossierLatin,
              dossierDescription: styles.dossierDescription,
              dossierDl: styles.dossierDl,
              dossierDlRow: styles.dossierDlRow,
              techLabel: styles.techLabel,
              dossierDd: styles.dossierDd,
              dossierFormatsRow: styles.dossierFormatsRow,
              dossierFormatPill: styles.dossierFormatPill,
              dossierActionsRow: styles.dossierActionsRow,
              ctaPrimary: styles.ctaPrimary,
              ctaOutlineBlue: styles.ctaOutlineBlue,
            }}
            DOSSIER={DOSSIER}
            SPEC_ROWS={SPEC_ROWS}
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Formulation Presenter ─────────────────────────────── */

/* ─────────────────────────────── Origin + Standards ─────────────────────────────── */

/* ─────────────────────────────── Deep-Green Finale ─────────────────────────────── */

/* ─────────────────────────────── Footer ─────────────────────────────── */

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
export function VariantH() {
  return (
    <ProductionPage
      styles={{ root: styles.root }}
      productionStyles={{
        container: styles.container,
        header: styles.header,
        microStrip: styles.microStrip,
        navLink: styles.navLink,
        heroSection: styles.heroSection,
        heroGrid: styles.heroGrid,
        heroLeft: styles.heroLeft,
        heroImg: styles.heroImg,
        footer: styles.footer,
        footerGrid: styles.footerGrid,
        footerBrandCol: styles.footerBrandCol,
        footerNavCol: styles.footerNavCol,
        heroStatUnit: styles.heroStatUnit,
        heroStatDesc: styles.heroStatDesc,
        heroRight: styles.heroRight,
        standardsSection: styles.standardsSection,
        standardsGrid: styles.standardsGrid,
        finaleSection: styles.finaleSection,
        finaleSecondaryBtn: styles.finaleSecondaryBtn,
        footerBrandRow: styles.footerBrandRow,
        footerWordmark: styles.footerWordmark,
        footerCertBadge: styles.footerCertBadge,
        microStripItem: styles.microStripItem,
        liveDotOuter: styles.liveDotOuter,
        liveDotPing: styles.liveDotPing,
        liveDotInner: styles.liveDotInner,
        techLabel: styles.techLabel,
        navInner: styles.navInner,
        brandLink: styles.brandLink,
        brandText: styles.brandText,
        brandLeaf: styles.brandLeaf,
        navDesktopLinks: styles.navDesktopLinks,
        navRight: styles.navRight,
        ctaPrimaryCompact: styles.ctaPrimaryCompact,
        progressHairline: styles.progressHairline,
        heroBadge: styles.heroBadge,
        heroHeading: styles.heroHeading,
        textGreen600: styles.textGreen600,
        heroLead: styles.heroLead,
        heroActions: styles.heroActions,
        ctaPrimary: styles.ctaPrimary,
        ctaOutlineBlue: styles.ctaOutlineBlue,
        heroStatGrid: styles.heroStatGrid,
        heroStatItem: styles.heroStatItem,
        heroStatValue: styles.heroStatValue,
        heroImgContainer: styles.heroImgContainer,
        heroImgScrim: styles.heroImgScrim,
        heroCaptionBadge: styles.heroCaptionBadge,
        eyebrowGreen: styles.eyebrowGreen,
        formulationSection: styles.formulationSection,
        sectionAsideLead: styles.sectionAsideLead,
        formulationGrid: styles.formulationGrid,
        formulationLeft: styles.formulationLeft,
        formulationFieldset: styles.formulationFieldset,
        chipsWrapRow: styles.chipsWrapRow,
        processStripOuter: styles.processStripOuter,
        processOl: styles.processOl,
        processLi: styles.processLi,
        processIndex: styles.processIndex,
        processTitle: styles.processTitle,
        processCopy: styles.processCopy,
        formulationRight: styles.formulationRight,
        specDraftHeader: styles.specDraftHeader,
        specDraftLabel: styles.specDraftLabel,
        specDraftCode: styles.specDraftCode,
        specDraftDl: styles.specDraftDl,
        specDraftDlRow: styles.specDraftDlRow,
        specDraftDt: styles.specDraftDt,
        specDraftDd: styles.specDraftDd,
        specMatchesList: styles.specMatchesList,
        specMatchItem: styles.specMatchItem,
        specSubmitBtn: styles.specSubmitBtn,
        specDossiersRequestNote: styles.specDossiersRequestNote,
        originGrid: styles.originGrid,
        originImgCol: styles.originImgCol,
        originImg: styles.originImg,
        originTextCol: styles.originTextCol,
        originTitle: styles.originTitle,
        originQuote: styles.originQuote,
        labImgCol: styles.labImgCol,
        labImgContainer: styles.labImgContainer,
        labImg: styles.labImg,
        labImgScrim: styles.labImgScrim,
        labCaptionBadge: styles.labCaptionBadge,
        pillarsCol: styles.pillarsCol,
        pillarInner: styles.pillarInner,
        pillarRowBorder: styles.pillarRowBorder,
        pillarIconBox: styles.pillarIconBox,
        pillarTitle: styles.pillarTitle,
        pillarCopy: styles.pillarCopy,
        pillarCert: styles.pillarCert,
        finaleThumbImg: styles.finaleThumbImg,
        finaleScrim: styles.finaleScrim,
        finaleInner: styles.finaleInner,
        eyebrowGreen400: styles.eyebrowGreen400,
        finaleHeading: styles.finaleHeading,
        finaleLead: styles.finaleLead,
        finaleActions: styles.finaleActions,
        ctaPrimaryDark: styles.ctaPrimaryDark,
        finaleResponseTime: styles.finaleResponseTime,
        officesOuter: styles.officesOuter,
        officesGrid: styles.officesGrid,
        officeCardBg: styles.officeCardBg,
        officeCardInner: styles.officeCardInner,
        officeCity: styles.officeCity,
        officeShort: styles.officeShort,
        officeCoords: styles.officeCoords,
        footerBrandTagline: styles.footerBrandTagline,
        footerEst: styles.footerEst,
        footerCertsList: styles.footerCertsList,
        footerNavList: styles.footerNavList,
        footerNavLink: styles.footerNavLink,
        footerLegal: styles.footerLegal,
        sectionHeaderRow: styles.sectionHeaderRow,
        sectionHeading: styles.sectionHeading,
        chipBase: styles.chipBase,
        chipSelected: styles.chipSelected,
        chipUnselected: styles.chipUnselected,
        tickerSection: styles.tickerSection,
        tickerList: styles.tickerList,
        tickerItem: styles.tickerItem,
        tickerText: styles.tickerText,
        tickerDiamond: styles.tickerDiamond,
        dotBase: styles.dotBase,
        dot_nutrition: styles.dot_nutrition,
        dot_food: styles.dot_food,
        dot_cosmetics: styles.dot_cosmetics,
        dot_chem: styles.dot_chem,
        dot_agro: styles.dot_agro,
        dot_feed: styles.dot_feed,
        portfolioMenuRoot: styles.portfolioMenuRoot,
        portfolioMenuBtn: styles.portfolioMenuBtn,
        portfolioChevron: styles.portfolioChevron,
        portfolioChevronOpen: styles.portfolioChevronOpen,
        portfolioPopover: styles.portfolioPopover,
        portfolioGrid: styles.portfolioGrid,
        portfolioCol: styles.portfolioCol,
        portfolioColHeader: styles.portfolioColHeader,
        portfolioItemList: styles.portfolioItemList,
        portfolioItemLink: styles.portfolioItemLink,
        portfolioFooter: styles.portfolioFooter,
        portfolioFooterLink: styles.portfolioFooterLink,
        mobileNavWrapper: styles.mobileNavWrapper,
        mobileMenuBtn: styles.mobileMenuBtn,
        mobileMenuPopover: styles.mobileMenuPopover,
        mobileMenuList: styles.mobileMenuList,
        mobileNavLink: styles.mobileNavLink,
        mobileNavLinkLast: styles.mobileNavLinkLast,
        tickerFadeLeft: styles.tickerFadeLeft,
        tickerFadeRight: styles.tickerFadeRight,
        tickerPauseBtn: styles.tickerPauseBtn,
        tickerMarqueeTrack: styles.tickerMarqueeTrack,
        tickerIndex: styles.tickerIndex,
        divisionBadge: styles.divisionBadge,
      }}
      SmoothScroll={SmoothScroll}
      IndustriesSection={IndustriesSection}
      MatrixSection={MatrixSection}
      DossierSection={DossierSection}
    />
  );
}

const DIVISION_DOT_KEYS: Record<DivisionKey, keyof typeof styles> = {
  nutrition: "dot_nutrition",
  food: "dot_food",
  cosmetics: "dot_cosmetics",
  chem: "dot_chem",
  agro: "dot_agro",
  feed: "dot_feed",
};
