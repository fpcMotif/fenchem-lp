/*
 * PROTOTYPE — Variant B: "Innovation Lab"
 * Clinical white spec-sheet. Hairline border-pebble grid, JetBrains Mono
 * micro-labels, grayscale ingredient matrix, marquee ticker.
 * Base layout mined from reference/innovation_home.html.
 */
import {
  getFeaturedIngredients,
  industries,
  ingredients,
  pillars,
  regions,
} from "@/components/landing/landing-content";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { domAnimation, LazyMotion, m, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

const IMG = {
  glassware:
    "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?auto=format&fit=crop&w=1000&q=80",
  microscope:
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=80",
} as const;

const NAV_LINKS = [
  { label: "Matrix", href: "#matrix" },
  { label: "Protocol", href: "#protocol" },
  { label: "Domains", href: "#domains" },
  { label: "Network", href: "#network" },
] as const;

const HERO_META = [
  { k: "SPEC.REF", v: "FN-LP / 2026-B" },
  { k: "ORIGIN", v: "N 32.06 / E 118.79" },
  { k: "ESTABLISHED", v: "1995 — NANJING" },
  { k: "CERT", v: "ISO 9001 / GMP" },
] as const;

const STATS = [
  {
    label: "[SYS.UPTIME]",
    value: "30+",
    unit: "years",
    desc: "Continuous ingredient engineering and refinement since 1995.",
  },
  {
    label: "[NODES]",
    value: "06",
    unit: "global bases",
    desc: "R&D and manufacturing distributed across three continents.",
  },
  {
    label: "[CERT.INDEX]",
    value: "ISO",
    unit: "/ GMP",
    desc: "Audited quality compliance across every production vector.",
  },
  {
    label: "[REACH]",
    value: "40+",
    unit: "countries",
    desc: "Formulation partners supplied across regulated markets.",
  },
] as const;

const PROTOCOL_DETAIL = [
  {
    step: "01",
    tag: "CHAIN.OF.CUSTODY",
    desc: "Every botanical lot is geo-tagged at origin and tracked through extraction, refinement and release — an unbroken record from field coordinate to finished certificate of analysis.",
  },
  {
    step: "02",
    tag: "HPLC // GC // MICRO",
    desc: "In-house laboratories run identity, potency and stability programs on every compound — chromatographic and microbiological panels executed on each production batch.",
  },
  {
    step: "03",
    tag: "ISO.9001 / GMP / HACCP",
    desc: "Documentation engineered for your regulatory map — ISO, GMP, HACCP, Halal and Kosher dossiers prepared and maintained for more than forty markets.",
  },
] as const;

const DOMAIN_DETAIL = [
  {
    code: "A-01",
    cat: "CAT: NUTRI",
    desc: "Bioavailable actives engineered for capsules, tablets, softgels and powder delivery systems.",
  },
  {
    code: "B-02",
    cat: "CAT: F&B",
    desc: "Heat- and pH-stable functional ingredients for fortification, natural color and clean-label claims.",
  },
  {
    code: "C-03",
    cat: "CAT: CARE",
    desc: "Dermatologically active agents formulated for cellular compatibility and sensory performance.",
  },
] as const;

const FOOTER_COLS = [
  {
    head: "INDEX",
    links: [
      { label: "Ingredient Matrix", href: "#matrix" },
      { label: "Operating Protocol", href: "#protocol" },
      { label: "Application Domains", href: "#domains" },
      { label: "Global Network", href: "#network" },
    ],
  },
  {
    head: "COMPLIANCE",
    links: [
      { label: "Quality Charter", href: "#protocol" },
      { label: "Regulatory Dossiers", href: "#contact" },
      { label: "Sourcing Standards", href: "#protocol" },
      { label: "Ingredient Transparency", href: "#matrix" },
    ],
  },
  {
    head: "CHANNEL",
    links: [
      { label: "Request a Specification", href: "#contact" },
      { label: "Partner Inquiries", href: "#contact" },
      { label: "Technical Dossiers", href: "#contact" },
      { label: "Global Offices", href: "#network" },
    ],
  },
] as const;

const pingAnim = stylex.keyframes({
  "75%, 100%": {
    transform: "scale(2)",
    opacity: 0,
  },
});

const marqueeAnim = stylex.keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "100%": {
    transform: "translateX(-50%)",
  },
});

const styles = stylex.create({
  root: {
    backgroundColor: "#ffffff",
    fontFamily: typography.body,
    color: colors.bark,
    WebkitFontSmoothing: "antialiased",
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
    backgroundColor: "color-mix(in oklab, #ffffff 90%, transparent)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  frameContainer: {
    marginInline: "auto",
    maxWidth: "1480px",
    borderLeftColor: colors.pebble,
    borderRightColor: colors.pebble,
    "@media (min-width: 1481px)": {
      borderLeftWidth: "1px",
      borderLeftStyle: "solid",
      borderRightWidth: "1px",
      borderRightStyle: "solid",
    },
  },
  microLabelStrip: {
    display: { default: "none", [breakpoints.md]: "flex" },
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    paddingBlock: "0.5rem",
  },
  microLabelItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    color: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
  },
  pingWrapper: {
    position: "relative",
    display: "flex",
    width: "0.375rem",
    height: "0.375rem",
  },
  pingRing: {
    position: "absolute",
    display: "inline-flex",
    height: "100%",
    width: "100%",
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklab, var(--color-moss) 60%, transparent)",
    animationName: {
      default: pingAnim,
      [breakpoints.motionReduce]: "none",
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },
  pingDot: {
    position: "relative",
    display: "inline-flex",
    width: "0.375rem",
    height: "0.375rem",
    borderRadius: radii.full,
    backgroundColor: colors.moss,
  },
  navRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    paddingBlock: "1rem",
  },
  brandBtn: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.75rem",
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: 0,
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    ":hover": {
      opacity: 0.7,
    },
  },
  brandLogoText: {
    fontFamily: typography.body,
    fontSize: "1.25rem",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    color: colors.forest,
  },
  brandSubtitle: {
    display: { default: "none", [breakpoints.sm]: "inline" },
    fontFamily: typography.tech,
    fontSize: "9px",
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
  },
  navLinksWrapper: {
    display: { default: "none", [breakpoints.md]: "flex" },
    alignItems: "center",
    gap: "2rem",
  },
  navLink: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: {
      default: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
      ":hover": colors.forest,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  navLinkNum: {
    marginRight: "0.375rem",
    color: colors.moss,
  },
  navCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.625rem",
    backgroundColor: {
      default: colors.forest,
      ":hover": colors.fern,
    },
    paddingInline: "1.25rem",
    paddingBlock: "0.625rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.cream,
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  scrollBar: {
    position: "absolute",
    insetInline: 0,
    bottom: 0,
    height: "2px",
    transformOrigin: "left",
    backgroundColor: colors.moss,
  },
  // Hero
  heroSection: {
    position: "relative",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
  },
  heroGridBg: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(to right, color-mix(in oklab, var(--color-forest) 3.5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-forest) 3.5%, transparent) 1px, transparent 1px)",
    backgroundSize: "56px 56px",
  },
  plusTopLeft: {
    position: "absolute",
    left: "1rem",
    top: "1rem",
    width: "1rem",
    height: "1rem",
    color: "color-mix(in oklab, var(--color-bark) 20%, transparent)",
  },
  plusBottomRight: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    display: { default: "none", [breakpoints.lg]: "block" },
    width: "1rem",
    height: "1rem",
    color: "color-mix(in oklab, var(--color-bark) 20%, transparent)",
  },
  heroGrid: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.lg]: "repeat(12, 1fr)" },
  },
  heroLeft: {
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    paddingBlock: { default: "4rem", [breakpoints.md]: "6rem", [breakpoints.lg]: "7rem" },
    gridColumn: { default: "auto", [breakpoints.lg]: "span 8" },
  },
  heroStatusBadge: {
    display: "inline-flex",
    width: "fit-content",
    alignItems: "center",
    gap: "0.625rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.pebble,
    backgroundColor: "#ffffff",
    paddingInline: "0.875rem",
    paddingBlock: "0.5rem",
  },
  heroStatusPingWrap: {
    position: "relative",
    display: "flex",
    width: "0.5rem",
    height: "0.5rem",
  },
  heroStatusPingRing: {
    position: "absolute",
    display: "inline-flex",
    height: "100%",
    width: "100%",
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklab, var(--color-moss) 50%, transparent)",
    animationName: {
      default: pingAnim,
      [breakpoints.motionReduce]: "none",
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },
  heroStatusPingDot: {
    position: "relative",
    display: "inline-flex",
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: radii.full,
    backgroundColor: colors.moss,
  },
  heroStatusText: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
  },
  heroHeadline: {
    marginTop: "2.5rem",
    fontFamily: typography.body,
    fontSize: "clamp(2.7rem, 6.4vw, 6rem)",
    fontWeight: 600,
    lineHeight: 0.98,
    letterSpacing: "-0.04em",
    color: colors.bark,
  },
  heroHeadlineItalic: {
    marginTop: "0.5rem",
    display: "block",
    fontFamily: typography.display,
    fontWeight: 300,
    fontStyle: "italic",
    lineHeight: 1.05,
    letterSpacing: "-0.01em",
    color: colors.moss,
  },
  heroDesc: {
    marginTop: "2rem",
    maxWidth: "36rem",
    fontSize: { default: "1rem", [breakpoints.md]: "1.125rem" },
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
  },
  heroCtas: {
    marginTop: "2.5rem",
    display: "flex",
    flexWrap: "wrap",
    gap: { default: "0.75rem", [breakpoints.md]: "1rem" },
  },
  heroPrimaryCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.75rem",
    backgroundColor: {
      default: colors.forest,
      ":hover": colors.fern,
    },
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.cream,
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  heroOutlineCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "color-mix(in oklab, var(--color-bark) 20%, transparent)",
      ":hover": colors.forest,
    },
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: {
      default: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
      ":hover": colors.forest,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklab, var(--color-mint) 20%, transparent)",
    },
    transitionProperty: "border-color, background-color, color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  iconSm: {
    width: "0.875rem",
    height: "0.875rem",
  },
  heroRightRail: {
    display: "flex",
    flexDirection: "column",
    borderTopWidth: { default: "1px", [breakpoints.lg]: 0 },
    borderLeftWidth: { default: 0, [breakpoints.lg]: "1px" },
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderTopColor: colors.pebble,
    borderLeftColor: colors.pebble,
    gridColumn: { default: "auto", [breakpoints.lg]: "span 4" },
  },
  heroRailContent: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
  },
  heroMetaDl: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
  },
  heroMetaRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2rem" },
    paddingBlock: "1rem",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
  },
  heroMetaDt: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
  },
  heroMetaDd: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "color-mix(in oklab, var(--color-bark) 80%, transparent)",
  },
  heroMetaDdActive: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: colors.moss,
  },
  heroMetaStatusDot: {
    width: "0.375rem",
    height: "0.375rem",
    borderRadius: radii.full,
    backgroundColor: colors.moss,
  },
  heroLabImgWrapper: {
    position: "relative",
    minHeight: { default: "16rem", [breakpoints.lg]: "18rem" },
    flex: 1,
    overflow: "hidden",
  },
  heroLabImg: {
    position: "absolute",
    inset: 0,
    height: "100%",
    width: "100%",
    objectFit: "cover",
    filter: {
      default: "grayscale(100%)",
      ":hover": "grayscale(0%)",
    },
    transform: {
      default: "scale(1)",
      ":hover": "scale(1.03)",
    },
    transitionProperty: "transform, filter",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
  },
  figOverlay: {
    position: "absolute",
    insetInline: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.pebble,
    backgroundColor: "color-mix(in oklab, #ffffff 90%, transparent)",
    paddingInline: "1rem",
    paddingBlock: "0.625rem",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  figText: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
  },
  figCode: {
    fontFamily: typography.tech,
    fontSize: "10px",
    letterSpacing: "0.22em",
    color: colors.moss,
  },
  // Ticker
  tickerSection: {
    overflow: "hidden",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
    paddingBlock: { default: "1rem", [breakpoints.md]: "1.25rem" },
  },
  tickerTrack: {
    display: "flex",
    width: "max-content",
    animationName: {
      default: marqueeAnim,
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
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  tickerItem: {
    display: "flex",
    alignItems: "center",
    gap: { default: "2rem", [breakpoints.md]: "3rem" },
    paddingRight: { default: "2rem", [breakpoints.md]: "3rem" },
  },
  tickerText: {
    whiteSpace: "nowrap",
    fontFamily: typography.tech,
    fontSize: { default: "11px", [breakpoints.md]: "12px" },
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
  },
  tickerIndex: {
    color: colors.moss,
  },
  tickerDiamond: {
    width: "0.375rem",
    height: "0.375rem",
    transform: "rotate(45deg)",
    backgroundColor: colors.mint,
  },
  // Stat band
  statBandGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.lg]: "repeat(4, 1fr)",
    },
    gap: "1px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
    backgroundColor: colors.pebble,
  },
  statBandCardBg: {
    backgroundColor: "#ffffff",
  },
  statBandCell: {
    height: "100%",
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2rem" },
    paddingBlock: { default: "2.25rem", [breakpoints.md]: "3rem" },
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklab, var(--color-mint) 20%, transparent)",
    },
    transitionProperty: "background-color",
    transitionDuration: "500ms",
  },
  statBandLabel: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
  },
  statBandValWrap: {
    marginTop: "1.25rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: "0.625rem",
  },
  statBandValue: {
    fontFamily: typography.body,
    fontSize: { default: "2.25rem", [breakpoints.md]: "3.75rem" },
    fontWeight: 600,
    letterSpacing: "-0.04em",
    color: colors.forest,
  },
  statBandUnit: {
    fontFamily: typography.display,
    fontSize: { default: "1.125rem", [breakpoints.md]: "1.5rem" },
    fontWeight: 300,
    fontStyle: "italic",
    color: colors.moss,
  },
  statBandDesc: {
    marginTop: "1rem",
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
  },
  // Section Head
  sectionHeadWrap: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    gap: "2rem",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    paddingBlock: { default: "3.5rem", [breakpoints.md]: "5rem" },
    alignItems: { default: "stretch", [breakpoints.md]: "flex-end" },
    justifyContent: { default: "flex-start", [breakpoints.md]: "space-between" },
  },
  sectionHeadCode: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.moss,
  },
  sectionHeadTitle: {
    marginTop: "1.25rem",
    fontFamily: typography.body,
    fontSize: { default: "2.25rem", [breakpoints.md]: "3rem" },
    fontWeight: 600,
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
    color: colors.bark,
  },
  sectionHeadItalic: {
    fontFamily: typography.display,
    fontWeight: 300,
    fontStyle: "italic",
    letterSpacing: "-0.01em",
    color: colors.moss,
  },
  // Matrix
  matrixSection: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
  },
  matrixSpecsBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.625rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: colors.pebble,
      ":hover": colors.forest,
    },
    paddingInline: "1.25rem",
    paddingBlock: "0.75rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    color: {
      default: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
      ":hover": colors.forest,
    },
    transitionProperty: "border-color, color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  matrixGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(2, 1fr)",
      [breakpoints.lg]: "repeat(3, 1fr)",
    },
    gap: "1px",
    backgroundColor: colors.pebble,
  },
  matrixCardBg: {
    backgroundColor: "#ffffff",
  },
  matrixImgContainer: {
    position: "relative",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
  },
  matrixImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    filter: {
      default: "grayscale(100%)",
      ":hover": "grayscale(0%)",
    },
    transform: {
      default: "scale(1)",
      ":hover": "scale(1.04)",
    },
    transitionProperty: "transform, filter",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
  },
  matrixCategoryBadge: {
    position: "absolute",
    right: "1rem",
    top: "1rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.pebble,
    backgroundColor: "color-mix(in oklab, #ffffff 90%, transparent)",
    paddingInline: "0.5rem",
    paddingBlock: "0.25rem",
    fontFamily: typography.tech,
    fontSize: "9px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  matrixCardContent: {
    paddingInline: { default: "1.25rem", [breakpoints.md]: "1.75rem" },
    paddingBlock: { default: "1.75rem", [breakpoints.md]: "2rem" },
  },
  matrixCardHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  matrixCardNum: {
    fontFamily: typography.tech,
    fontSize: "11px",
    letterSpacing: "0.22em",
    color: colors.moss,
  },
  matrixCardCode: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
  },
  matrixCardTitle: {
    marginTop: "0.75rem",
    fontFamily: typography.body,
    fontSize: "1.25rem",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: {
      default: colors.bark,
      ":hover": colors.forest,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
  },
  matrixCardDl: {
    marginTop: "1.25rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.pebble,
    paddingTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.625rem",
  },
  matrixCardDlRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "1rem",
  },
  matrixCardDt: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
  },
  matrixCardDd: {
    textAlign: "right",
    fontFamily: typography.tech,
    fontSize: "11px",
    color: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
  },
  matrixRequestSpecLink: {
    marginTop: "1.5rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: {
      default: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
      ":hover": colors.forest,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  iconXs: {
    width: "0.75rem",
    height: "0.75rem",
  },
  // Protocol
  protocolSection: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
  },
  protocolSubtitle: {
    maxWidth: "20rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    lineHeight: 1.625,
    letterSpacing: "0.2em",
    color: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
  },
  protocolGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.lg]: "repeat(12, 1fr)" },
  },
  protocolFigCol: {
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    paddingBlock: { default: "3rem", [breakpoints.lg]: "4rem" },
    gridColumn: { default: "auto", [breakpoints.lg]: "span 5" },
  },
  protocolPillarsCol: {
    borderTopWidth: { default: "1px", [breakpoints.lg]: 0 },
    borderLeftWidth: { default: 0, [breakpoints.lg]: "1px" },
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    borderTopColor: colors.pebble,
    borderLeftColor: colors.pebble,
    gridColumn: { default: "auto", [breakpoints.lg]: "span 7" },
  },
  protocolFigureContainer: {
    position: "relative",
    overflow: "hidden",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.pebble,
  },
  protocolFigureImg: {
    height: { default: "380px", [breakpoints.md]: "480px" },
    width: "100%",
    objectFit: "cover",
    filter: {
      default: "grayscale(100%)",
      ":hover": "grayscale(0%)",
    },
    transitionProperty: "filter",
    transitionDuration: "700ms",
  },
  protocolBorderB: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
  },
  protocolRowGrid: {
    display: "grid",
    gap: "1rem",
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    paddingBlock: { default: "2.5rem", [breakpoints.md]: "3rem" },
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklab, var(--color-mint) 20%, transparent)",
    },
    transitionProperty: "background-color",
    transitionDuration: "500ms",
    gridTemplateColumns: { default: "1fr", [breakpoints.md]: "repeat(12, 1fr)" },
  },
  protocolStepNum: {
    fontFamily: typography.tech,
    fontSize: "0.875rem",
    letterSpacing: "0.22em",
    color: colors.moss,
    gridColumn: { default: "auto", [breakpoints.md]: "span 2" },
  },
  protocolRowBody: {
    gridColumn: { default: "auto", [breakpoints.md]: "span 10" },
  },
  protocolRowHeader: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    columnGap: "1.5rem",
    rowGap: "0.5rem",
  },
  protocolRowTitle: {
    fontFamily: typography.body,
    fontSize: { default: "1.5rem", [breakpoints.md]: "1.875rem" },
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: colors.bark,
  },
  protocolRowTag: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
  },
  protocolRowDesc: {
    marginTop: "1rem",
    maxWidth: "36rem",
    fontSize: { default: "0.875rem", [breakpoints.md]: "1rem" },
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
  },
  // Domains
  domainsSection: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
  },
  domainRowLink: {
    display: "block",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.pebble,
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklab, var(--color-mint) 20%, transparent)",
    },
    transitionProperty: "background-color",
    transitionDuration: "500ms",
    textDecoration: "none",
    color: "inherit",
  },
  domainRowLinkLast: {
    borderBottomWidth: 0,
  },
  domainRowInner: {
    display: "grid",
    alignItems: "center",
    gap: "0.75rem",
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    paddingBlock: { default: "2.25rem", [breakpoints.md]: "3rem" },
    gridTemplateColumns: { default: "1fr", [breakpoints.md]: "repeat(12, 1fr)" },
  },
  domainMetaCol: {
    gridColumn: { default: "auto", [breakpoints.md]: "span 2" },
  },
  domainCode: {
    fontFamily: typography.tech,
    fontSize: "11px",
    letterSpacing: "0.22em",
    color: colors.moss,
  },
  domainCat: {
    marginTop: "0.25rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
  },
  domainTitleCol: {
    gridColumn: { default: "auto", [breakpoints.md]: "span 5" },
    fontFamily: typography.body,
    fontSize: { default: "1.5rem", [breakpoints.md]: "2.25rem" },
    fontWeight: 600,
    letterSpacing: "-0.03em",
    color: {
      default: colors.bark,
      ":hover": colors.forest,
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
  },
  domainDescCol: {
    gridColumn: { default: "auto", [breakpoints.md]: "span 4" },
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
  },
  domainArrowCol: {
    display: "flex",
    justifyContent: { default: "flex-start", [breakpoints.md]: "flex-end" },
    gridColumn: { default: "auto", [breakpoints.md]: "span 1" },
  },
  domainArrowIcon: {
    width: "1.5rem",
    height: "1.5rem",
    color: "color-mix(in oklab, var(--color-bark) 30%, transparent)",
    transitionProperty: "transform, color",
    transitionDuration: "300ms",
  },
  // CTA Network
  ctaNetworkSection: {
    backgroundColor: colors.forest,
    color: colors.cream,
  },
  ctaTopBlock: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklab, var(--color-cream) 10%, transparent)",
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    paddingBlock: { default: "5rem", [breakpoints.md]: "7rem" },
  },
  ctaTopEyebrow: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: "color-mix(in oklab, var(--color-mint) 80%, transparent)",
  },
  ctaTopHeading: {
    marginTop: "1.5rem",
    maxWidth: "56rem",
    fontFamily: typography.body,
    fontSize: { default: "2.25rem", [breakpoints.md]: "3.75rem" },
    fontWeight: 600,
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
  },
  ctaTopItalic: {
    fontFamily: typography.display,
    fontWeight: 300,
    fontStyle: "italic",
    letterSpacing: "-0.01em",
    color: colors.mint,
  },
  ctaTopDesc: {
    marginTop: "1.75rem",
    maxWidth: "36rem",
    fontSize: { default: "0.875rem", [breakpoints.md]: "1rem" },
    lineHeight: 1.625,
    color: "color-mix(in oklab, var(--color-cream) 70%, transparent)",
  },
  ctaTopBtnRow: {
    marginTop: "2.5rem",
    display: "flex",
    flexWrap: "wrap",
    gap: { default: "0.75rem", [breakpoints.md]: "1rem" },
  },
  ctaPartnerBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.75rem",
    backgroundColor: {
      default: colors.mint,
      ":hover": colors.mist,
    },
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.forest,
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    borderWidth: 0,
    cursor: "pointer",
  },
  ctaExploreBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "color-mix(in oklab, var(--color-cream) 30%, transparent)",
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: {
      default: "color-mix(in oklab, var(--color-cream) 90%, transparent)",
      ":hover": colors.cream,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklab, var(--color-cream) 10%, transparent)",
    },
    transitionProperty: "border-color, background-color, color",
    transitionDuration: "300ms",
    textDecoration: "none",
  },
  ctaResponseTime: {
    marginTop: "2.5rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: "color-mix(in oklab, var(--color-cream) 60%, transparent)",
  },
  networkHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklab, var(--color-cream) 10%, transparent)",
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    paddingBlock: "1.25rem",
  },
  networkHeaderTag: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    color: "color-mix(in oklab, var(--color-mint) 70%, transparent)",
  },
  networkHeaderLatLong: {
    display: { default: "none", [breakpoints.md]: "block" },
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    color: "color-mix(in oklab, var(--color-cream) 60%, transparent)",
  },
  networkGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.sm]: "repeat(2, 1fr)",
      [breakpoints.lg]: "repeat(3, 1fr)",
    },
    gap: "1px",
    backgroundColor: "color-mix(in oklab, var(--color-cream) 10%, transparent)",
  },
  networkCellBg: {
    backgroundColor: colors.forest,
  },
  networkCell: {
    height: "100%",
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2rem" },
    paddingBlock: { default: "1.75rem", [breakpoints.md]: "2.25rem" },
    backgroundColor: {
      default: "transparent",
      ":hover": colors.fern,
    },
    transitionProperty: "background-color",
    transitionDuration: "500ms",
  },
  networkCellMeta: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: "color-mix(in oklab, var(--color-mint) 70%, transparent)",
  },
  networkCellCoords: {
    color: "color-mix(in oklab, var(--color-cream) 60%, transparent)",
  },
  networkCity: {
    marginTop: "1rem",
    fontFamily: typography.body,
    fontSize: "1.25rem",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: colors.cream,
  },
  networkRole: {
    marginTop: "0.25rem",
    fontSize: "0.875rem",
    color: "color-mix(in oklab, var(--color-cream) 60%, transparent)",
  },
  // Footer
  footer: {
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.pebble,
    backgroundColor: "#ffffff",
  },
  footerGrid: {
    display: "grid",
    gap: "3rem",
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    paddingBlock: { default: "3.5rem", [breakpoints.md]: "4rem" },
    gridTemplateColumns: { default: "1fr", [breakpoints.md]: "repeat(12, 1fr)" },
  },
  footerBrandCol: {
    gridColumn: { default: "auto", [breakpoints.md]: "span 5" },
  },
  footerBrandBtn: {
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: typography.body,
    fontSize: "1.5rem",
    fontWeight: 700,
    letterSpacing: "-0.04em",
    color: colors.forest,
    cursor: "pointer",
    padding: 0,
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    ":hover": {
      opacity: 0.7,
    },
  },
  footerTagline: {
    marginTop: "1rem",
    maxWidth: "20rem",
    fontFamily: typography.display,
    fontSize: "1.125rem",
    fontWeight: 300,
    fontStyle: "italic",
    color: colors.moss,
  },
  footerCertText: {
    marginTop: "1.5rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    lineHeight: 2,
    letterSpacing: "0.22em",
    color: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
  },
  footerNavCol: {
    gridColumn: { default: "auto", [breakpoints.md]: "span 2" },
  },
  footerColHead: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
  },
  footerLinksList: {
    marginTop: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  footerLinkA: {
    fontSize: "0.875rem",
    color: {
      default: "color-mix(in oklab, var(--color-bark) 70%, transparent)",
      ":hover": colors.forest,
    },
    textDecorationLine: "underline",
    textDecorationColor: {
      default: colors.pebble,
      ":hover": colors.moss,
    },
    textUnderlineOffset: "4px",
    transitionProperty: "color, text-decoration-color",
    transitionDuration: "300ms",
  },
  footerWatermark: {
    userSelect: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    fontFamily: typography.body,
    fontSize: "17vw",
    "@media (min-width: 1481px)": {
      fontSize: "15rem",
    },
    fontWeight: 700,
    lineHeight: 0.78,
    letterSpacing: "-0.06em",
    color: "color-mix(in oklab, var(--color-forest) 5%, transparent)",
  },
  footerBottomBar: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    gap: "0.5rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.pebble,
    paddingInline: { default: "1.25rem", [breakpoints.md]: "2.5rem" },
    paddingBlock: "1rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: "color-mix(in oklab, var(--color-bark) 60%, transparent)",
    alignItems: { default: "stretch", [breakpoints.md]: "center" },
    justifyContent: { default: "flex-start", [breakpoints.md]: "space-between" },
  },
  textMoss: {
    color: colors.moss,
  },
});

/* Section header: mono code / big sans title with one serif italic word */
function SectionHead({
  code,
  title,
  italic,
  right,
}: {
  code: string;
  title: string;
  italic: string;
  right?: ReactNode;
}) {
  return (
    <div {...stylex.props(styles.sectionHeadWrap)}>
      <Reveal>
        <p {...stylex.props(styles.sectionHeadCode)}>{code}</p>
        <h2 {...stylex.props(styles.sectionHeadTitle)}>
          {title} <span {...stylex.props(styles.sectionHeadItalic)}>{italic}</span>
        </h2>
      </Reveal>
      {right ? <Reveal delay={0.15}>{right}</Reveal> : null}
    </div>
  );
}

/* Protocol figure with gentle scroll parallax */
function ProtocolFigure() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <div ref={ref} {...stylex.props(styles.protocolFigureContainer)}>
      <m.img
        src={IMG.microscope}
        alt="Analyst working at a microscope inside the Fenchem laboratory"
        {...stylex.props(styles.protocolFigureImg)}
        style={{ y: reduce ? "0%" : y, scale: 1.16 }}
        loading="lazy"
      />
      <div {...stylex.props(styles.figOverlay)}>
        <span {...stylex.props(styles.figText)}>FIG. 02 — ANALYTICAL LAB, NANJING</span>
        <span {...stylex.props(styles.figCode)}>HPLC-7</span>
      </div>
    </div>
  );
}

/* ===== Hero section ===== */
function HeroSection() {
  return (
    <section {...stylex.props(styles.heroSection)}>
      <div aria-hidden {...stylex.props(styles.heroGridBg)} />
      <Plus aria-hidden strokeWidth={1} {...stylex.props(styles.plusTopLeft)} />
      <Plus aria-hidden strokeWidth={1} {...stylex.props(styles.plusBottomRight)} />
      <div {...stylex.props(styles.heroGrid)}>
        {/* Left: headline block */}
        <div {...stylex.props(styles.heroLeft)}>
          <Reveal>
            <span {...stylex.props(styles.heroStatusBadge)}>
              <span {...stylex.props(styles.heroStatusPingWrap)}>
                <span {...stylex.props(styles.heroStatusPingRing)} />
                <span {...stylex.props(styles.heroStatusPingDot)} />
              </span>
              <span {...stylex.props(styles.heroStatusText)}>
                System Active — Botanical Intelligence Since 1995
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 {...stylex.props(styles.heroHeadline)}>
              Engineering high-performance botanical ingredients
              <span {...stylex.props(styles.heroHeadlineItalic)}>for a synthesized world.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p {...stylex.props(styles.heroDesc)}>
              Fenchem converts raw botanical complexity into precisely specified, clinically
              validated actives — supplied at industrial scale to formulators in more than forty
              countries.
            </p>
          </Reveal>
          <Reveal delay={0.3} sx={styles.heroCtas}>
            <a href="#matrix" {...stylex.props(styles.heroPrimaryCta)}>
              Explore Portfolio
              <ArrowRight {...stylex.props(styles.iconSm)} />
            </a>
            <a href="#contact" {...stylex.props(styles.heroOutlineCta)}>
              Request a Specification
            </a>
          </Reveal>
        </div>
        {/* Right: mono metadata rail */}
        <aside {...stylex.props(styles.heroRightRail)}>
          <Reveal delay={0.25} sx={styles.heroRailContent}>
            <dl {...stylex.props(styles.heroMetaDl)}>
              {HERO_META.map((row) => (
                <div key={row.k} {...stylex.props(styles.heroMetaRow)}>
                  <dt {...stylex.props(styles.heroMetaDt)}>{row.k}</dt>
                  <dd {...stylex.props(styles.heroMetaDd)}>{row.v}</dd>
                </div>
              ))}
              <div {...stylex.props(styles.heroMetaRow)}>
                <dt {...stylex.props(styles.heroMetaDt)}>STATUS</dt>
                <dd {...stylex.props(styles.heroMetaDdActive)}>
                  <span {...stylex.props(styles.heroMetaStatusDot)} />
                  OPERATIONAL
                </dd>
              </div>
            </dl>
            <div {...stylex.props(styles.heroLabImgWrapper)}>
              <img
                src={IMG.glassware}
                alt="Laboratory glassware during botanical extraction work"
                {...stylex.props(styles.heroLabImg)}
                loading="lazy"
              />
              <div {...stylex.props(styles.figOverlay)}>
                <span {...stylex.props(styles.figText)}>FIG. 01 — EXTRACTION LAB</span>
                <span {...stylex.props(styles.figCode)}>BATCH 2026.06</span>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}

/* ===== Ingredient ticker ===== */
function TickerSection() {
  return (
    <section aria-label="Live ingredient index" {...stylex.props(styles.tickerSection)}>
      <div {...stylex.props(styles.tickerTrack)}>
        {[0, 1].map((copy) => (
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

/* ===== Stat band ===== */
function StatBand() {
  return (
    <section aria-label="Company metrics" {...stylex.props(styles.statBandGrid)}>
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} sx={styles.statBandCardBg}>
          <div {...stylex.props(styles.statBandCell)}>
            <p {...stylex.props(styles.statBandLabel)}>{s.label}</p>
            <div {...stylex.props(styles.statBandValWrap)}>
              <span {...stylex.props(styles.statBandValue)}>{s.value}</span>
              <span {...stylex.props(styles.statBandUnit)}>{s.unit}</span>
            </div>
            <p {...stylex.props(styles.statBandDesc)}>{s.desc}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ===== Ingredient Matrix ===== */
function MatrixSection() {
  return (
    <section id="matrix" {...stylex.props(styles.matrixSection)}>
      <SectionHead
        code="SYS.CAT_01 // ACTIVE COMPOUNDS"
        title="Ingredient"
        italic="matrix."
        right={
          <a href="#contact" {...stylex.props(styles.matrixSpecsBtn)}>
            View Full Specs
            <ArrowRight {...stylex.props(styles.iconXs)} />
          </a>
        }
      />
      <div {...stylex.props(styles.matrixGrid)}>
        {getFeaturedIngredients().map((item, i) => (
          <Reveal key={item.code} delay={(i % 3) * 0.08} sx={styles.matrixCardBg}>
            <div {...stylex.props(styles.matrixImgContainer)}>
              <img
                src={item.image.src}
                alt={item.image.alt}
                {...stylex.props(styles.matrixImg)}
                loading="lazy"
              />
              <span {...stylex.props(styles.matrixCategoryBadge)}>{item.category}</span>
            </div>
            <div {...stylex.props(styles.matrixCardContent)}>
              <div {...stylex.props(styles.matrixCardHeader)}>
                <span {...stylex.props(styles.matrixCardNum)}>
                  {String(i + 1).padStart(2, "0")} —
                </span>
                <span {...stylex.props(styles.matrixCardCode)}>{item.code}</span>
              </div>
              <h3 {...stylex.props(styles.matrixCardTitle)}>{item.name}</h3>
              <dl {...stylex.props(styles.matrixCardDl)}>
                <div {...stylex.props(styles.matrixCardDlRow)}>
                  <dt {...stylex.props(styles.matrixCardDt)}>Purity</dt>
                  <dd {...stylex.props(styles.matrixCardDd)}>{item.purity}</dd>
                </div>
                <div {...stylex.props(styles.matrixCardDlRow)}>
                  <dt {...stylex.props(styles.matrixCardDt)}>Form</dt>
                  <dd {...stylex.props(styles.matrixCardDd)}>{item.form}</dd>
                </div>
                <div {...stylex.props(styles.matrixCardDlRow)}>
                  <dt {...stylex.props(styles.matrixCardDt)}>Application</dt>
                  <dd {...stylex.props(styles.matrixCardDd)}>{item.useCase}</dd>
                </div>
              </dl>
              <a href="#contact" {...stylex.props(styles.matrixRequestSpecLink)}>
                Request Spec
                <ArrowUpRight {...stylex.props(styles.iconXs)} />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ===== Operating Protocol ===== */
function ProtocolSection() {
  return (
    <section id="protocol" {...stylex.props(styles.protocolSection)}>
      <SectionHead
        code="SYS.METHOD // 02"
        title="Operating"
        italic="protocol."
        right={
          <p {...stylex.props(styles.protocolSubtitle)}>
            Rooted in nature, refined by science — every lot, every market, every release.
          </p>
        }
      />
      <div {...stylex.props(styles.protocolGrid)}>
        <div {...stylex.props(styles.protocolFigCol)}>
          <Reveal>
            <ProtocolFigure />
          </Reveal>
        </div>
        <div {...stylex.props(styles.protocolPillarsCol)}>
          {pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 0.08}
              sx={i < pillars.length - 1 ? styles.protocolBorderB : undefined}
            >
              <div {...stylex.props(styles.protocolRowGrid)}>
                <span {...stylex.props(styles.protocolStepNum)}>{PROTOCOL_DETAIL[i].step} —</span>
                <div {...stylex.props(styles.protocolRowBody)}>
                  <div {...stylex.props(styles.protocolRowHeader)}>
                    <h3 {...stylex.props(styles.protocolRowTitle)}>{pillar.title}</h3>
                    <span {...stylex.props(styles.protocolRowTag)}>{PROTOCOL_DETAIL[i].tag}</span>
                  </div>
                  <p {...stylex.props(styles.protocolRowDesc)}>{PROTOCOL_DETAIL[i].desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Application Domains ===== */
function DomainsSection() {
  return (
    <section id="domains" {...stylex.props(styles.domainsSection)}>
      <SectionHead
        code="SYS.CAT_02 // APPLICATION DOMAINS"
        title="Built for three"
        italic="industries."
      />
      <div>
        {industries.map((industry, i) => {
          const isLast = i === industries.length - 1;
          return (
            <a
              key={industry.title}
              href="#contact"
              {...stylex.props(styles.domainRowLink, isLast && styles.domainRowLinkLast)}
            >
              <Reveal delay={i * 0.06} sx={styles.domainRowInner}>
                <div {...stylex.props(styles.domainMetaCol)}>
                  <p {...stylex.props(styles.domainCode)}>{DOMAIN_DETAIL[i].code}</p>
                  <p {...stylex.props(styles.domainCat)}>{DOMAIN_DETAIL[i].cat}</p>
                </div>
                <h3 {...stylex.props(styles.domainTitleCol)}>{industry.title}</h3>
                <p {...stylex.props(styles.domainDescCol)}>{DOMAIN_DETAIL[i].desc}</p>
                <div {...stylex.props(styles.domainArrowCol)}>
                  <ArrowUpRight {...stylex.props(styles.domainArrowIcon)} />
                </div>
              </Reveal>
            </a>
          );
        })}
      </div>
    </section>
  );
}

/* ===== CTA + Global Network ===== */
function CtaNetworkSection() {
  return (
    <section id="contact" {...stylex.props(styles.ctaNetworkSection)}>
      <div {...stylex.props(styles.ctaTopBlock)}>
        <Reveal>
          <p {...stylex.props(styles.ctaTopEyebrow)}>SYS.CONTACT // OPEN CHANNEL</p>
          <h2 {...stylex.props(styles.ctaTopHeading)}>
            Your next formulation,{" "}
            <span {...stylex.props(styles.ctaTopItalic)}>engineered to specification.</span>
          </h2>
          <p {...stylex.props(styles.ctaTopDesc)}>
            Submit a target spec — purity, form, matrix, regulatory map — and our laboratory returns
            a validated proposal with full documentation within one business day.
          </p>
        </Reveal>
        <Reveal delay={0.15} sx={styles.ctaTopBtnRow}>
          <button type="button" {...stylex.props(styles.ctaPartnerBtn)}>
            Partner with Fenchem
            <ArrowRight {...stylex.props(styles.iconSm)} />
          </button>
          <a href="#matrix" {...stylex.props(styles.ctaExploreBtn)}>
            Explore Portfolio
          </a>
        </Reveal>
        <Reveal delay={0.25}>
          <p {...stylex.props(styles.ctaResponseTime)}>
            RESPONSE.TIME &lt; 24H — TECHNICAL DOSSIERS ON REQUEST
          </p>
        </Reveal>
      </div>
      <div id="network">
        <div {...stylex.props(styles.networkHeaderRow)}>
          <span {...stylex.props(styles.networkHeaderTag)}>SYS.NET // 6 ACTIVE NODES</span>
          <span {...stylex.props(styles.networkHeaderLatLong)}>LAT/LONG VERIFIED — 2026.06</span>
        </div>
        <div {...stylex.props(styles.networkGrid)}>
          {regions.map((region, i) => (
            <Reveal key={region.city} delay={(i % 3) * 0.08} sx={styles.networkCellBg}>
              <div {...stylex.props(styles.networkCell)}>
                <div {...stylex.props(styles.networkCellMeta)}>
                  <span>{`NODE ${String(i + 1).padStart(2, "0")}`}</span>
                  <span {...stylex.props(styles.networkCellCoords)}>{region.coords}</span>
                </div>
                <p {...stylex.props(styles.networkCity)}>{region.city}</p>
                <p {...stylex.props(styles.networkRole)}>{region.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Footer ===== */
function FooterSection() {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.footerGrid)}>
        <div {...stylex.props(styles.footerBrandCol)}>
          <button type="button" {...stylex.props(styles.footerBrandBtn)}>
            FENCHEM
          </button>
          <p {...stylex.props(styles.footerTagline)}>Rooted in nature, refined by science.</p>
          <p {...stylex.props(styles.footerCertText)}>
            ISO 9001 : 2015 / GMP / HACCP
            <br />
            EST. 1995 — NANJING, CHINA
          </p>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.head} {...stylex.props(styles.footerNavCol)}>
            <p {...stylex.props(styles.footerColHead)}>{col.head}</p>
            <ul {...stylex.props(styles.footerLinksList)}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} {...stylex.props(styles.footerLinkA)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p aria-hidden {...stylex.props(styles.footerWatermark)}>
        FENCHEM
      </p>
      <div {...stylex.props(styles.footerBottomBar)}>
        <span>© 2026 Fenchem — All Rights Reserved</span>
        <span>N 32.06 / E 118.79 — Nanjing</span>
        <span {...stylex.props(styles.textMoss)}>SYS.EOF // END OF SPEC</span>
      </div>
    </footer>
  );
}

export function VariantB() {
  const { scrollYProgress } = useScroll();

  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        {/* ===== Sticky top bar ===== */}
        <header {...stylex.props(styles.stickyHeader)}>
          <div {...stylex.props(styles.frameContainer)}>
            {/* Micro-label strip */}
            <div {...stylex.props(styles.microLabelStrip)}>
              <span {...stylex.props(styles.microLabelItem)}>
                <span {...stylex.props(styles.pingWrapper)}>
                  <span {...stylex.props(styles.pingRing)} />
                  <span {...stylex.props(styles.pingDot)} />
                </span>
                SYS.ACTIVE — INGREDIENT ENGINEERING
              </span>
              <span {...stylex.props(styles.microLabelItem)}>N 32.06 / E 118.79 — NANJING HQ</span>
              <span {...stylex.props(styles.microLabelItem)}>ISO 9001 : 2015 / GMP</span>
            </div>
            {/* Nav row */}
            <nav {...stylex.props(styles.navRow)}>
              <button type="button" {...stylex.props(styles.brandBtn)}>
                <span {...stylex.props(styles.brandLogoText)}>FENCHEM</span>
                <span {...stylex.props(styles.brandSubtitle)}>Innovation Lab</span>
              </button>
              <div {...stylex.props(styles.navLinksWrapper)}>
                {NAV_LINKS.map((link, i) => (
                  <a key={link.href} href={link.href} {...stylex.props(styles.navLink)}>
                    <span {...stylex.props(styles.navLinkNum)}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                ))}
              </div>
              <a href="#contact" {...stylex.props(styles.navCta)}>
                Request a Specification
                <ArrowRight {...stylex.props(styles.iconXs)} />
              </a>
            </nav>
          </div>
          {/* Scroll progress hairline */}
          <m.div
            aria-hidden
            {...stylex.props(styles.scrollBar)}
            style={{ scaleX: scrollYProgress }}
          />
        </header>

        {/* ===== Framed sheet ===== */}
        <div {...stylex.props(styles.frameContainer)}>
          <main>
            <HeroSection />
            <TickerSection />
            <StatBand />
            <MatrixSection />
            <ProtocolSection />
            <DomainsSection />
            <CtaNetworkSection />
          </main>

          <FooterSection />
        </div>
      </div>
    </LazyMotion>
  );
}
