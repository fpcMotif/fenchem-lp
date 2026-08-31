/*
 * PROTOTYPE — Variant G: "Green-Led Hybrid — Production Candidate"
 * Curates the strongest modules from D/E/F into one coherent page.
 * font-display (Newsreader) for display headlines, font-body (Plus Jakarta Sans) for UI/body,
 * Brand Blue structural, division colours in matrix only.
 *
 * Section order (mirrors variant-b.tsx structure):
 *   Nav → Hero (editorial-scale, stat band inline) → Industries → Ingredient Matrix → Deep-Green Finale → Footer
 */
import { useRef } from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FlaskConical,
  Globe,
  Leaf,
  Sprout,
} from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certifications,
  company,
  getFeaturedIngredients,
  industries,
  ingredients,
  pillars,
  regions,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Constants ─────────────────────────────── */

const IMG = {
  hero: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80",
  heroThumb:
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  lab: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=80",
} as const;
const NAV_LINKS = [
  {
    label: "Industries",
    href: "#industries",
  },
  {
    label: "Portfolio",
    href: "#matrix",
  },
  {
    label: "Standards",
    href: "#standards",
  },
  {
    label: "Contact",
    href: "#contact",
  },
] as const;
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
const PILLAR_DETAIL = [
  {
    icon: Sprout,
    copy: "Every botanical lot is geo-tagged at origin and tracked through extraction, refinement and release — an unbroken record from field to finished certificate of analysis.",
  },
  {
    icon: FlaskConical,
    copy: "In-house laboratories run identity, potency and stability programs on every compound — chromatographic and microbiological panels executed on each production batch.",
  },
  {
    icon: Globe,
    copy: "Documentation engineered for your regulatory map — ISO, GMP, HACCP, Halal and Kosher dossiers prepared and maintained for more than forty markets.",
  },
] as const;
const FOOTER_COLS = [
  {
    head: "Portfolio",
    links: [
      {
        label: "Ingredient Matrix",
        href: "#matrix",
      },
      {
        label: "Nutrition Actives",
        href: "#matrix",
      },
      {
        label: "Food & Beverage",
        href: "#matrix",
      },
      {
        label: "Cosmeceuticals",
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
const ping = stylex.keyframes({
  "75%, 100%": {
    transform: "scale(2)",
    opacity: 0,
  },
});
const marquee = stylex.keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "100%": {
    transform: "translateX(-50%)",
  },
});
const styles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    fontFamily: typography.body,
    color: colors.ink,
    WebkitFontSmoothing: "antialiased",
    "::selection": {
      backgroundColor: colors.brandGreen200,
      color: colors.brandGreen900,
    },
  },
  container1480: {
    marginInline: "auto",
    maxWidth: "1480px",
  },
  /* ─── Nav ─────────────────────────────────────────────── */
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    borderBottomWidth: "1px",
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
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    paddingInline: "1.5rem",
    paddingBlock: "0.375rem",
  },
  microText: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.mute600,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  pingWrap: {
    position: "relative",
    display: "flex",
    height: "0.375rem",
    width: "0.375rem",
  },
  pingOuter: {
    position: "absolute",
    display: "inline-flex",
    height: "100%",
    width: "100%",
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-500) 50%, transparent)",
    animationName: {
      default: ping,
      [breakpoints.motionReduce]: "none",
    },
    animationDuration: "1.5s",
    animationIterationCount: "infinite",
  },
  pingInner: {
    position: "relative",
    display: "inline-flex",
    height: "0.375rem",
    width: "0.375rem",
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
  },
  navRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
    },
    paddingBlock: "0.75rem",
  },
  logoLink: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.625rem",
    textDecoration: "none",
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    outline: "none",
    ":hover": {
      opacity: 0.75,
    },
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  logoWordmark: {
    fontFamily: typography.body,
    fontSize: "1.25rem",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    color: colors.brandGreen600,
  },
  logoIcon: {
    height: "1rem",
    width: "1rem",
    color: colors.brandGreen500,
    alignSelf: "center",
  },
  navLinksDesktop: {
    display: {
      default: "none",
      [breakpoints.md]: "flex",
    },
    alignItems: "center",
    gap: "1.75rem",
  },
  navLink: {
    fontFamily: typography.body,
    fontSize: "0.875rem",
    color: {
      default: colors.mute600,
      ":hover": colors.brandGreen700,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  navCtaBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.sm,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "1.25rem",
    paddingBlock: "0.625rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  navHairline: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "2px",
    transformOrigin: "left",
    backgroundColor: colors.brandGreen500,
  },
  /* ─── Hero ────────────────────────────────────────────── */
  heroSection: {
    position: "relative",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  heroGrid: {
    display: "grid",
    minHeight: "80vh",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  heroLeft: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 7",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: {
      default: "4rem",
      [breakpoints.md]: "6rem",
      [breakpoints.lg]: "8rem",
    },
  },
  heroPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.full,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.brandGreen200,
    backgroundColor: colors.brandGreen50,
    paddingInline: "1rem",
    paddingBlock: "0.375rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.32em",
    color: colors.brandBlue700,
    margin: 0,
  },
  heroH1: {
    marginTop: "2rem",
    fontFamily: typography.display,
    fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
    fontWeight: 700,
    lineHeight: 1.0,
    letterSpacing: "-0.04em",
    color: colors.ink,
  },
  greenSpan: {
    color: colors.brandGreen600,
  },
  heroP: {
    marginTop: "1.75rem",
    maxWidth: "32rem",
    fontFamily: typography.body,
    fontSize: {
      default: "1rem",
      [breakpoints.md]: "1.125rem",
    },
    lineHeight: 1.625,
    color: colors.mute600,
  },
  heroBtns: {
    marginTop: "2.25rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
  },
  heroPrimaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.625rem",
    borderRadius: radii.sm,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  heroSecondaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.625rem",
    borderRadius: radii.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandBlue50,
    },
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: colors.brandBlue700,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandBlue700}`,
      outlineOffset: "2px",
    },
  },
  heroStatsBand: {
    marginTop: "3.5rem",
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.sm]: "repeat(4, 1fr)",
    },
    gap: "1px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.line,
    borderRadius: radii.sm,
    overflow: "hidden",
    backgroundColor: colors.line,
  },
  heroStatCard: {
    backgroundColor: colors.paper,
    paddingInline: "1rem",
    paddingBlock: "1.25rem",
  },
  heroStatUnit: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: colors.mute600,
  },
  heroStatVal: {
    marginTop: "0.375rem",
    fontFamily: typography.body,
    fontSize: {
      default: "1.5rem",
      [breakpoints.md]: "1.875rem",
    },
    fontWeight: 700,
    letterSpacing: "-0.03em",
    color: colors.brandGreen600,
    margin: 0,
  },
  heroStatDesc: {
    marginTop: "0.25rem",
    fontFamily: typography.body,
    fontSize: "0.75rem",
    color: colors.mute600,
    margin: 0,
  },
  heroRight: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 5",
    },
    position: "relative",
    overflow: "hidden",
    borderTopWidth: {
      default: "1px",
      [breakpoints.lg]: 0,
    },
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    borderLeftWidth: {
      default: 0,
      [breakpoints.lg]: "1px",
    },
    borderLeftStyle: "solid",
    borderLeftColor: colors.line,
  },
  heroImgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, color-mix(in oklch, var(--color-brand-green-950) 30%, transparent), transparent 60%)",
  },
  heroImgBadgeWrap: {
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
    right: "1rem",
  },
  heroImgBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-paper) 20%, transparent)",
    backgroundColor: "color-mix(in oklch, var(--color-paper) 90%, transparent)",
    paddingInline: "1rem",
    paddingBlock: "0.625rem",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  heroBadgeMono: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.mute600,
  },
  heroBadgeGreen: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
  },
  /* ─── Ticker ──────────────────────────────────────────── */
  tickerSection: {
    overflow: "hidden",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.brandGreen50,
    paddingBlock: "0.875rem",
  },
  tickerTrack: {
    display: "flex",
    width: "max-content",
    animationName: {
      default: marquee,
      [breakpoints.motionReduce]: "none",
    },
    animationDuration: "35s",
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
    gap: "2rem",
    paddingRight: "2rem",
  },
  tickerText: {
    whiteSpace: "nowrap",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: colors.brandGreen700,
  },
  tickerBlueNum: {
    color: colors.brandBlue700,
  },
  tickerDiamond: {
    height: "0.375rem",
    width: "0.375rem",
    transform: "rotate(45deg)",
    backgroundColor: colors.brandGreen400,
  },
  /* ─── Industries ──────────────────────────────────────── */
  industriesSection: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  sectionHeader: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: "1.5rem",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: {
      default: "3.5rem",
      [breakpoints.md]: "5rem",
    },
    alignItems: {
      default: "flex-start",
      [breakpoints.md]: "flex-end",
    },
    justifyContent: "space-between",
  },
  sectionTagBlue: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.32em",
    color: colors.brandBlue700,
    margin: 0,
  },
  sectionH2: {
    marginTop: "1rem",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3rem",
    },
    fontWeight: 700,
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
  },
  sectionHeaderP: {
    maxWidth: "20rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  industryRowLink: {
    display: "block",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    textDecoration: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandGreen50,
    },
    transitionProperty: "background-color",
    transitionDuration: "400ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  industryRowGrid: {
    display: "grid",
    alignItems: "center",
    gap: "1rem",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: {
      default: "2.5rem",
      [breakpoints.md]: "3rem",
    },
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(12, 1fr)",
    },
    columnGap: {
      default: "1rem",
      [breakpoints.md]: "1.5rem",
    },
  },
  industryIndexCol: {
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 1",
    },
  },
  industryIndex: {
    fontFamily: typography.tech,
    fontSize: "0.875rem",
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
  },
  industryTitle: {
    fontFamily: typography.body,
    fontSize: {
      default: "1.5rem",
      [breakpoints.md]: "1.875rem",
    },
    fontWeight: 700,
    letterSpacing: "-0.03em",
    color: {
      default: colors.ink,
      ":hover": colors.brandGreen600,
    },
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 4",
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
    margin: 0,
  },
  industryCopy: {
    fontFamily: typography.body,
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: colors.mute600,
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 5",
    },
    margin: 0,
  },
  industryThumbWrapper: {
    position: "relative",
    aspectRatio: {
      default: "16 / 9",
      [breakpoints.md]: "1 / 1",
    },
    overflow: "hidden",
    borderRadius: radii.sm,
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 1",
    },
  },
  industryThumbImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
  },
  industryArrowCol: {
    display: "flex",
    justifyContent: "flex-end",
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 1",
    },
  },
  industryArrow: {
    height: "1.25rem",
    width: "1.25rem",
    color: colors.mute300,
    transitionProperty: "transform, color",
    transitionDuration: "300ms",
  },
  /* ─── Matrix ──────────────────────────────────────────── */
  matrixSection: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.mute50,
  },
  requestFullSpecsBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.5rem",
    borderRadius: radii.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    paddingInline: "1.25rem",
    paddingBlock: "0.75rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: colors.brandBlue700,
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandBlue50,
    },
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandBlue700}`,
      outlineOffset: "2px",
    },
  },
  matrixGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(2, 1fr)",
      [breakpoints.lg]: "repeat(3, 1fr)",
    },
    gap: "1px",
    backgroundColor: colors.line,
  },
  matrixCard: {
    backgroundColor: colors.paper,
  },
  matrixImgBox: {
    position: "relative",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  matrixImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
  },
  matrixBadge: {
    position: "absolute",
    right: "0.75rem",
    top: "0.75rem",
    borderRadius: radii.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    paddingInline: "0.5rem",
    paddingBlock: "0.25rem",
    fontFamily: typography.tech,
    fontSize: "9px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  badgeNutrition: {
    color: colors.ink,
    backgroundColor: "color-mix(in oklch, var(--color-nutrition) 30%, transparent)",
    borderColor: colors.nutrition,
  },
  badgeFood: {
    color: colors.ink,
    backgroundColor: colors.food,
    borderColor: colors.food,
  },
  badgeCosmetics: {
    color: colors.paper,
    backgroundColor: colors.cosmetics,
    borderColor: colors.cosmetics,
  },
  matrixImgHoverOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-950) 0%, transparent)",
    transitionProperty: "background-color",
    transitionDuration: "500ms",
  },
  matrixBody: {
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "1.75rem",
    },
    paddingBlock: {
      default: "1.75rem",
      [breakpoints.md]: "2rem",
    },
  },
  matrixTopRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  matrixIndex: {
    fontFamily: typography.tech,
    fontSize: "11px",
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
  },
  matrixCode: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.mute600,
  },
  matrixName: {
    marginTop: "0.75rem",
    fontFamily: typography.body,
    fontSize: "1.25rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: {
      default: colors.ink,
      ":hover": colors.brandGreen600,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
    margin: 0,
  },
  matrixLatin: {
    fontFamily: typography.tech,
    fontSize: "11px",
    fontStyle: "italic",
    letterSpacing: "0.06em",
    color: colors.mute600,
    margin: 0,
  },
  matrixDl: {
    marginTop: "1.25rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.625rem",
    margin: 0,
  },
  matrixDlRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "1rem",
  },
  matrixDlDt: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.mute600,
  },
  matrixDlDd: {
    textAlign: "right",
    fontFamily: typography.tech,
    fontSize: "11px",
    color: colors.mute700,
    margin: 0,
  },
  matrixRequestSpec: {
    marginTop: "1.5rem",
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: {
      default: colors.brandBlue700,
      ":hover": colors.brandGreen700,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandBlue700}`,
      outlineOffset: "2px",
    },
  },
  /* ─── Standards ───────────────────────────────────────── */
  standardsSection: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.paper,
  },
  standardsGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  standardsImgCol: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 5",
    },
    position: "relative",
    overflow: "hidden",
    borderBottomWidth: {
      default: "1px",
      [breakpoints.lg]: 0,
    },
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    borderRightWidth: {
      default: 0,
      [breakpoints.lg]: "1px",
    },
    borderRightStyle: "solid",
    borderRightColor: colors.line,
  },
  standardsImgFrame: {
    position: "relative",
    minHeight: {
      default: "18rem",
      [breakpoints.lg]: "100%",
    },
  },
  standardsImg: {
    height: {
      default: "480px",
      [breakpoints.lg]: "100%",
    },
    width: "100%",
    objectFit: "cover",
    position: {
      default: "static",
      [breakpoints.lg]: "absolute",
    },
    inset: {
      default: "auto",
      [breakpoints.lg]: 0,
    },
    display: "block",
  },
  standardsImgOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, color-mix(in oklch, var(--color-brand-green-950) 20%, transparent), transparent 60%)",
  },
  standardsCaptionWrap: {
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
    right: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radii.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-paper) 20%, transparent)",
    backgroundColor: "color-mix(in oklch, var(--color-paper) 90%, transparent)",
    paddingInline: "1rem",
    paddingBlock: "0.625rem",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  standardsPillarsCol: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 7",
    },
  },
  pillarRow: {
    display: "flex",
    gap: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
    },
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: {
      default: "2.5rem",
      [breakpoints.md]: "3rem",
    },
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandGreen50,
    },
    transitionProperty: "background-color",
    transitionDuration: "400ms",
  },
  pillarRowDivider: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  pillarIconBadge: {
    marginTop: "0.25rem",
    display: "flex",
    height: {
      default: "2.5rem",
      [breakpoints.md]: "3rem",
    },
    width: {
      default: "2.5rem",
      [breakpoints.md]: "3rem",
    },
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.sm,
    backgroundColor: colors.brandGreen100,
    color: colors.brandGreen600,
  },
  pillarH3: {
    fontFamily: typography.body,
    fontSize: {
      default: "1.25rem",
      [breakpoints.md]: "1.5rem",
    },
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: colors.ink,
    margin: 0,
  },
  pillarP: {
    marginTop: "0.75rem",
    fontFamily: typography.body,
    fontSize: {
      default: "0.875rem",
      [breakpoints.md]: "1rem",
    },
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  pillarIsoBadge: {
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
  },
  /* ─── Deep Green Finale ───────────────────────────────── */
  finaleSection: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.brandGreen950,
  },
  finaleParallaxBg: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
  },
  finaleParallaxImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    opacity: 0.1,
  },
  finaleOverlay: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom right, color-mix(in oklch, var(--color-brand-green-950) 90%, transparent), color-mix(in oklch, var(--color-brand-green-950) 70%, transparent), color-mix(in oklch, var(--color-brand-green-900) 90%, transparent))",
  },
  finaleContent: {
    position: "relative",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: {
      default: "6rem",
      [breakpoints.md]: "9rem",
    },
  },
  finaleTag: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.32em",
    color: colors.brandGreen400,
    margin: 0,
  },
  finaleH2: {
    marginTop: "1.5rem",
    maxWidth: "56rem",
    fontFamily: typography.display,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3.75rem",
    },
    fontWeight: 700,
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
    color: colors.paper,
  },
  finaleGreenSpan: {
    color: colors.brandGreen400,
  },
  finaleP: {
    marginTop: "1.75rem",
    maxWidth: "36rem",
    fontFamily: typography.body,
    fontSize: {
      default: "1rem",
      [breakpoints.md]: "1.125rem",
    },
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-brand-green-100) 70%, transparent)",
  },
  finaleBtns: {
    marginTop: "2.5rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
  finalePrimaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.75rem",
    borderRadius: radii.sm,
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "2rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 700,
    color: colors.brandGreen950,
    textDecoration: "none",
    boxShadow: {
      default: "0 0 40px oklch(from var(--color-brand-green-500) l c h / 0.3)",
      ":hover": "0 0 64px oklch(from var(--color-brand-green-500) l c h / 0.5)",
    },
    transitionProperty: "background-color, box-shadow",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  finaleSecondaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.75rem",
    borderRadius: radii.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-500) 40%, transparent)",
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklch, var(--color-brand-green-900) 40%, transparent)",
    },
    paddingInline: "2rem",
    paddingBlock: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: colors.brandGreen200,
    textDecoration: "none",
    transitionProperty: "border-color, background-color, color",
    transitionDuration: "300ms",
    outline: "none",
    ":hover": {
      borderColor: colors.brandGreen400,
      color: colors.paper,
    },
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen400}`,
      outlineOffset: "2px",
    },
  },
  finaleResponseText: {
    marginTop: "2.5rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.brandGreen400,
    margin: 0,
  },
  nodesWrap: {
    marginTop: "5rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.brandGreen800,
    paddingTop: "3.5rem",
  },
  nodesTitle: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: colors.brandGreen400,
    margin: 0,
  },
  nodesGrid: {
    marginTop: "2rem",
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.sm]: "repeat(3, 1fr)",
      [breakpoints.lg]: "repeat(6, 1fr)",
    },
    gap: "1px",
    backgroundColor: colors.brandGreen800,
  },
  nodeCard: {
    backgroundColor: {
      default: "color-mix(in oklch, var(--color-brand-green-950) 80%, transparent)",
      ":hover": "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
    },
    paddingInline: "1rem",
    paddingBlock: "1.5rem",
    transitionProperty: "background-color",
    transitionDuration: "300ms",
  },
  nodeCity: {
    fontFamily: typography.body,
    fontSize: "0.875rem",
    fontWeight: 600,
    color: colors.paper,
    margin: 0,
  },
  nodeShort: {
    marginTop: "0.125rem",
    fontFamily: typography.body,
    fontSize: "0.75rem",
    color: colors.brandGreen400,
    margin: 0,
  },
  nodeCoords: {
    marginTop: "0.5rem",
    fontFamily: typography.tech,
    fontSize: "9px",
    letterSpacing: "0.16em",
    color: colors.brandGreen400,
    margin: 0,
  },
  /* ─── Footer ──────────────────────────────────────────── */
  footer: {
    backgroundColor: colors.paper,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.line,
  },
  footerGrid: {
    display: "grid",
    gap: "3rem",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(12, 1fr)",
    },
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: {
      default: "3.5rem",
      [breakpoints.md]: "4rem",
    },
  },
  footerBrandCol: {
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 5",
    },
  },
  footerBrandRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  footerWordmark: {
    fontFamily: typography.body,
    fontSize: "1.5rem",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    color: colors.brandGreen600,
  },
  footerLeafIcon: {
    height: "1.25rem",
    width: "1.25rem",
    color: colors.brandGreen500,
  },
  footerTagline: {
    marginTop: "0.75rem",
    fontFamily: typography.body,
    fontSize: "1rem",
    fontWeight: 500,
    color: colors.brandGreen700,
    margin: 0,
  },
  footerCertsText: {
    marginTop: "1.25rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    lineHeight: 2,
    letterSpacing: "0.22em",
    color: colors.mute600,
  },
  footerCertBadges: {
    marginTop: "1.5rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  footerCertBadge: {
    borderRadius: radii.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.brandBlue200,
    backgroundColor: colors.brandBlue50,
    paddingInline: "0.625rem",
    paddingBlock: "0.25rem",
    fontFamily: typography.tech,
    fontSize: "9px",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: colors.brandBlue700,
  },
  footerNavCol: {
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 2",
    },
  },
  footerHead: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: colors.mute600,
    margin: 0,
  },
  footerList: {
    marginTop: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  footerLink: {
    fontFamily: typography.body,
    fontSize: "0.875rem",
    color: {
      default: colors.mute600,
      ":hover": colors.brandGreen700,
    },
    textDecorationLine: "underline",
    textDecorationColor: {
      default: colors.line,
      ":hover": colors.brandGreen400,
    },
    textUnderlineOffset: "4px",
    transitionProperty: "color, text-decoration-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "2px",
    },
  },
  footerWatermark: {
    userSelect: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    fontFamily: typography.body,
    fontSize: {
      default: "17vw",
      "@media (min-width: 1481px)": "15rem",
    },
    fontWeight: 900,
    lineHeight: 0.78,
    letterSpacing: "-0.06em",
    color: "color-mix(in oklch, var(--color-brand-green-500) 5%, transparent)",
    margin: 0,
  },
  footerLegalRow: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: "0.5rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: "1rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.mute600,
    alignItems: {
      default: "flex-start",
      [breakpoints.md]: "center",
    },
    justifyContent: {
      default: "flex-start",
      [breakpoints.md]: "space-between",
    },
  },
  footerLegalGreen: {
    color: colors.brandGreen700,
  },
});
const MATRIX_DETAIL = [
  {
    division: "Nutrition",
    badgeStyle: styles.badgeNutrition,
  },
  {
    division: "Nutrition",
    badgeStyle: styles.badgeNutrition,
  },
  {
    division: "Food & Bev",
    badgeStyle: styles.badgeFood,
  },
  {
    division: "Nutrition",
    badgeStyle: styles.badgeNutrition,
  },
  {
    division: "Food & Bev",
    badgeStyle: styles.badgeFood,
  },
  {
    division: "Cosmetics",
    badgeStyle: styles.badgeCosmetics,
  },
] as const;

/* ─────────────────────────────── Nav ─────────────────────────────── */

function NavBar() {
  const { scrollYProgress } = useScroll();
  return (
    <header {...stylex.props(styles.header)}>
      <div {...stylex.props(styles.container1480)}>
        {/* Micro-strip */}
        <div {...stylex.props(styles.microStrip)}>
          <span {...stylex.props(styles.microText)}>
            <span {...stylex.props(styles.pingWrap)}>
              <span {...stylex.props(styles.pingOuter)} />
              <span {...stylex.props(styles.pingInner)} />
            </span>
            Global Intelligent Research — Botanical Intelligence Since 1995
          </span>
          <span {...stylex.props(styles.microText)}>ISO 9001 · GMP · HACCP</span>
          <span {...stylex.props(styles.microText)}>N 32.06 / E 118.79 — Nanjing HQ</span>
        </div>
        {/* Main nav */}
        <nav aria-label="Main navigation" {...stylex.props(styles.navRow)}>
          <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.logoLink)}>
            <span {...stylex.props(styles.logoWordmark)}>FENCHEM</span>
            <Leaf aria-hidden strokeWidth={1.5} {...stylex.props(styles.logoIcon)} />
          </a>
          <div {...stylex.props(styles.navLinksDesktop)}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} {...stylex.props(styles.navLink)}>
                {link.label}
              </a>
            ))}
          </div>
          <a href="#contact" {...stylex.props(styles.navCtaBtn)}>
            Request a Specification
            <ArrowRight
              style={{
                height: "0.875rem",
                width: "0.875rem",
              }}
              aria-hidden
            />
          </a>
        </nav>
      </div>
      {/* Progress hairline */}
      <m.div
        aria-hidden
        style={{
          scaleX: scrollYProgress,
        }}
        {...stylex.props(styles.navHairline)}
      />
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
      <div {...stylex.props(styles.container1480)}>
        <div {...stylex.props(styles.heroGrid)}>
          {/* Left: Headline block */}
          <div {...stylex.props(styles.heroLeft)}>
            <Reveal>
              <p {...stylex.props(styles.heroPill)}>Botanical Intelligence Since 1995</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 {...stylex.props(styles.heroH1)}>
                Nurturing Vitality
                <br />
                <span {...stylex.props(styles.greenSpan)}>through Botanical</span>
                <br />
                <span {...stylex.props(styles.greenSpan)}>Excellence</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p {...stylex.props(styles.heroP)}>
                Fenchem converts raw botanical complexity into precisely specified, clinically
                validated actives — supplied at industrial scale to formulators in more than forty
                countries.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div {...stylex.props(styles.heroBtns)}>
                <a href="#matrix" {...stylex.props(styles.heroPrimaryBtn)}>
                  Explore Portfolio
                  <ArrowRight
                    style={{
                      height: "1rem",
                      width: "1rem",
                    }}
                    aria-hidden
                  />
                </a>
                <a href="#contact" {...stylex.props(styles.heroSecondaryBtn)}>
                  Partner with Fenchem
                </a>
              </div>
            </Reveal>

            {/* Stat band */}
            <Reveal delay={0.34}>
              <dl {...stylex.props(styles.heroStatsBand)}>
                {STATS.map((s) => (
                  <div key={s.value} {...stylex.props(styles.heroStatCard)}>
                    <dt {...stylex.props(styles.heroStatUnit)}>{s.unit}</dt>
                    <dd {...stylex.props(styles.heroStatVal)}>{s.value}</dd>
                    <p {...stylex.props(styles.heroStatDesc)}>{s.desc}</p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: botanical image */}
          <div {...stylex.props(styles.heroRight)}>
            <div
              ref={imgRef}
              style={{
                position: "absolute",
                inset: 0,
              }}
            >
              <m.img
                src={IMG.hero}
                alt="Lush green botanical leaves in morning light — representing Fenchem's natural ingredient sourcing"
                style={{
                  y: reduce ? 0 : imgY,
                  height: "116%",
                  width: "100%",
                  objectFit: "cover",
                }}
                loading="eager"
              />
              <div aria-hidden {...stylex.props(styles.heroImgOverlay)} />
            </div>
            {/* Caption badge */}
            <div {...stylex.props(styles.heroImgBadgeWrap)}>
              <div {...stylex.props(styles.heroImgBadge)}>
                <span {...stylex.props(styles.heroBadgeMono)}>
                  Rooted in Nature, Refined by Science
                </span>
                <span {...stylex.props(styles.heroBadgeGreen)}>Since 1995</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Ingredient Ticker ─────────────────────────────── */

function TickerSection() {
  return (
    <section aria-label="Ingredient index ticker" {...stylex.props(styles.tickerSection)}>
      <div {...stylex.props(styles.tickerTrack)}>
        {([0, 1] as const).map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} {...stylex.props(styles.tickerList)}>
            {ingredients.map((ingredient, i) => (
              <li key={ingredient.name} {...stylex.props(styles.tickerItem)}>
                <span {...stylex.props(styles.tickerText)}>
                  <span {...stylex.props(styles.tickerBlueNum)}>
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

/* ─────────────────────────────── Industries ─────────────────────────────── */

function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      {...stylex.props(styles.industriesSection)}
    >
      <div {...stylex.props(styles.container1480)}>
        {/* Section header */}
        <div {...stylex.props(styles.sectionHeader)}>
          <Reveal>
            <p {...stylex.props(styles.sectionTagBlue)}>01 — Application Domains</p>
            <h2 id="industries-heading" {...stylex.props(styles.sectionH2)}>
              Built for three <span {...stylex.props(styles.greenSpan)}>industries</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p {...stylex.props(styles.sectionHeaderP)}>
              Clinically supported actives engineered for the precise demands of each formulation
              discipline.
            </p>
          </Reveal>
        </div>

        {/* Industry rows */}
        <div>
          {industries.map((industry, i) => (
            <a key={industry.title} href="#contact" {...stylex.props(styles.industryRowLink)}>
              <Reveal delay={i * 0.07}>
                <div {...stylex.props(styles.industryRowGrid)}>
                  {/* Index */}
                  <div {...stylex.props(styles.industryIndexCol)}>
                    <span {...stylex.props(styles.industryIndex)}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 {...stylex.props(styles.industryTitle)}>{industry.title}</h3>
                  {/* Copy */}
                  <p {...stylex.props(styles.industryCopy)}>{INDUSTRY_COPY[i]}</p>
                  {/* Image thumbnail */}
                  <div {...stylex.props(styles.industryThumbWrapper)}>
                    <img
                      src={industry.image.src}
                      alt={industry.image.alt}
                      loading="lazy"
                      {...stylex.props(styles.industryThumbImg)}
                    />
                  </div>
                  {/* Arrow */}
                  <div {...stylex.props(styles.industryArrowCol)}>
                    <ArrowUpRight aria-hidden {...stylex.props(styles.industryArrow)} />
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
      <div {...stylex.props(styles.container1480)}>
        {/* Header */}
        <div {...stylex.props(styles.sectionHeader)}>
          <Reveal>
            <p {...stylex.props(styles.sectionTagBlue)}>02 — Active Compounds</p>
            <h2 id="matrix-heading" {...stylex.props(styles.sectionH2)}>
              Ingredient <span {...stylex.props(styles.greenSpan)}>matrix</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#contact" {...stylex.props(styles.requestFullSpecsBtn)}>
              Request Full Specifications
              <ArrowRight
                style={{
                  height: "0.875rem",
                  width: "0.875rem",
                }}
                aria-hidden
              />
            </a>
          </Reveal>
        </div>

        {/* Matrix grid */}
        <div {...stylex.props(styles.matrixGrid)}>
          {getFeaturedIngredients().map((item, i) => (
            <Reveal key={item.code} delay={(i % 3) * 0.08}>
              <article {...stylex.props(styles.matrixCard)}>
                {/* Image */}
                <div {...stylex.props(styles.matrixImgBox)}>
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    loading="lazy"
                    {...stylex.props(styles.matrixImg)}
                  />
                  {/* Division badge */}
                  <span {...stylex.props(styles.matrixBadge, MATRIX_DETAIL[i].badgeStyle)}>
                    {MATRIX_DETAIL[i].division}
                  </span>
                  {/* Hover overlay */}
                  <div aria-hidden {...stylex.props(styles.matrixImgHoverOverlay)} />
                </div>
                {/* Content */}
                <div {...stylex.props(styles.matrixBody)}>
                  <div {...stylex.props(styles.matrixTopRow)}>
                    <span {...stylex.props(styles.matrixIndex)}>
                      {String(i + 1).padStart(2, "0")} —
                    </span>
                    <span {...stylex.props(styles.matrixCode)}>{item.code}</span>
                  </div>
                  <h3 {...stylex.props(styles.matrixName)}>{item.name}</h3>
                  <p {...stylex.props(styles.matrixLatin)}>{item.latin}</p>
                  <dl {...stylex.props(styles.matrixDl)}>
                    <div {...stylex.props(styles.matrixDlRow)}>
                      <dt {...stylex.props(styles.matrixDlDt)}>Purity</dt>
                      <dd {...stylex.props(styles.matrixDlDd)}>{item.purity}</dd>
                    </div>
                    <div {...stylex.props(styles.matrixDlRow)}>
                      <dt {...stylex.props(styles.matrixDlDt)}>Form</dt>
                      <dd {...stylex.props(styles.matrixDlDd)}>{item.form}</dd>
                    </div>
                  </dl>
                  <a href="#contact" {...stylex.props(styles.matrixRequestSpec)}>
                    Request Spec
                    <ArrowUpRight
                      style={{
                        height: "0.75rem",
                        width: "0.75rem",
                      }}
                      aria-hidden
                    />
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

/* ─────────────────────────────── Science / Standards ─────────────────────────────── */

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
      <div {...stylex.props(styles.container1480)}>
        {/* Header */}
        <div {...stylex.props(styles.sectionHeader)}>
          <Reveal>
            <p {...stylex.props(styles.sectionTagBlue)}>03 — Quality Infrastructure</p>
            <h2 id="standards-heading" {...stylex.props(styles.sectionH2)}>
              Science-backed <span {...stylex.props(styles.greenSpan)}>standards</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p {...stylex.props(styles.sectionHeaderP)}>
              Every lot. Every market. Every release — documented to your regulatory map.
            </p>
          </Reveal>
        </div>

        {/* Layout: lab image + pillars */}
        <div {...stylex.props(styles.standardsGrid)}>
          {/* Image */}
          <div {...stylex.props(styles.standardsImgCol)}>
            <div ref={imgRef} {...stylex.props(styles.standardsImgFrame)}>
              <m.img
                src={IMG.lab}
                alt="Fenchem analyst at a microscope inside the quality control laboratory in Nanjing"
                style={{
                  y: reduce ? 0 : imgY,
                }}
                loading="lazy"
                {...stylex.props(styles.standardsImg)}
              />
              <div aria-hidden {...stylex.props(styles.standardsImgOverlay)} />
              {/* Caption */}
              <div {...stylex.props(styles.standardsCaptionWrap)}>
                <span {...stylex.props(styles.heroBadgeMono)}>QC Laboratory — Nanjing</span>
                <span {...stylex.props(styles.heroBadgeGreen)}>HPLC · GC · Micro</span>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div {...stylex.props(styles.standardsPillarsCol)}>
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_DETAIL[i].icon;
              const isLast = i === pillars.length - 1;
              return (
                <Reveal key={pillar.title} delay={i * 0.09}>
                  <div {...stylex.props(styles.pillarRow, !isLast && styles.pillarRowDivider)}>
                    <div {...stylex.props(styles.pillarIconBadge)}>
                      <Icon
                        aria-hidden
                        strokeWidth={1.5}
                        style={{
                          height: "1.5rem",
                          width: "1.5rem",
                        }}
                      />
                    </div>
                    <div>
                      <h3 {...stylex.props(styles.pillarH3)}>{pillar.title}</h3>
                      <p {...stylex.props(styles.pillarP)}>{PILLAR_DETAIL[i].copy}</p>
                      <div {...stylex.props(styles.pillarIsoBadge)}>
                        <CheckCircle2
                          aria-hidden
                          style={{
                            height: "0.875rem",
                            width: "0.875rem",
                          }}
                        />
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
      {/* Parallax botanical background */}
      <m.div
        aria-hidden
        style={{
          y: reduce ? 0 : bgY,
        }}
        {...stylex.props(styles.finaleParallaxBg)}
      >
        <img
          src={IMG.heroThumb}
          alt=""
          loading="lazy"
          {...stylex.props(styles.finaleParallaxImg)}
        />
      </m.div>
      {/* Gradient overlay */}
      <div aria-hidden {...stylex.props(styles.finaleOverlay)} />

      <div {...stylex.props(styles.container1480)}>
        <div {...stylex.props(styles.finaleContent)}>
          <Reveal>
            <p {...stylex.props(styles.finaleTag)}>04 — Partner with Fenchem</p>
            <h2 id="contact-heading" {...stylex.props(styles.finaleH2)}>
              Your next formulation,
              <br />
              <span {...stylex.props(styles.finaleGreenSpan)}>engineered to specification</span>
            </h2>
            <p {...stylex.props(styles.finaleP)}>
              Submit a target spec — purity, form, matrix, regulatory map — and our laboratory
              returns a validated proposal with full documentation within one business day.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div {...stylex.props(styles.finaleBtns)}>
              <a href={`mailto:${company.email}`} {...stylex.props(styles.finalePrimaryBtn)}>
                Partner with Fenchem
                <ArrowRight
                  style={{
                    height: "1rem",
                    width: "1rem",
                  }}
                  aria-hidden
                />
              </a>
              <a href="#matrix" {...stylex.props(styles.finaleSecondaryBtn)}>
                Explore Portfolio
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p {...stylex.props(styles.finaleResponseText)}>
              Response Time &lt; 24h — Technical Dossiers on Request
            </p>
          </Reveal>

          {/* Office nodes */}
          <div {...stylex.props(styles.nodesWrap)}>
            <Reveal>
              <p {...stylex.props(styles.nodesTitle)}>6 Global Bases — 40+ Countries Served</p>
            </Reveal>
            <div {...stylex.props(styles.nodesGrid)}>
              {regions.map((region, i) => (
                <Reveal key={region.city} delay={i * 0.06}>
                  <div {...stylex.props(styles.nodeCard)}>
                    <p {...stylex.props(styles.nodeCity)}>{region.city}</p>
                    <p {...stylex.props(styles.nodeShort)}>{region.short}</p>
                    <p {...stylex.props(styles.nodeCoords)}>{region.coords}</p>
                  </div>
                </Reveal>
              ))}
            </div>
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
      <div {...stylex.props(styles.container1480)}>
        <div {...stylex.props(styles.footerGrid)}>
          {/* Brand block */}
          <div {...stylex.props(styles.footerBrandCol)}>
            <div {...stylex.props(styles.footerBrandRow)}>
              <span {...stylex.props(styles.footerWordmark)}>FENCHEM</span>
              <Leaf aria-hidden strokeWidth={1.5} {...stylex.props(styles.footerLeafIcon)} />
            </div>
            <p {...stylex.props(styles.footerTagline)}>Rooted in Nature, Refined by Science.</p>
            <p {...stylex.props(styles.footerCertsText)}>
              ISO 9001 : 2015 · GMP · HACCP
              <br />
              Est. 1995 — Nanjing, China
            </p>
            <div {...stylex.props(styles.footerCertBadges)}>
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
              <p {...stylex.props(styles.footerHead)}>{col.head}</p>
              <ul {...stylex.props(styles.footerList)}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} {...stylex.props(styles.footerLink)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark watermark */}
        <p aria-hidden {...stylex.props(styles.footerWatermark)}>
          FENCHEM
        </p>

        {/* Legal strip */}
        <div {...stylex.props(styles.footerLegalRow)}>
          <span>© 2026 Fenchem Biochemical Group — All Rights Reserved</span>
          <span>N 32.06 / E 118.79 — Nanjing, China</span>
          <span {...stylex.props(styles.footerLegalGreen)}>Botanical Intelligence Since 1995</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── Root export ─────────────────────────────── */

export function VariantG() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        <NavBar />
        <main>
          <HeroSection />
          <TickerSection />
          <IndustriesSection />
          <MatrixSection />
          <StandardsSection />
          <FinaleSection />
        </main>
        <FooterSection />
      </div>
    </LazyMotion>
  );
}
