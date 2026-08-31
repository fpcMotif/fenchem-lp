import { useRef } from "react";
import type { ReactNode } from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import { Reveal } from "@/components/prototype/motion";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  divisionForApplication,
  getFeaturedIngredients,
  industries,
  ingredients,
  pillars,
  regions,
} from "@/components/landing/landing-content";

/*
 * PROTOTYPE — Variant E: "Innovation Lab" (Brand Book Green-Led)
 * Clinical white spec-sheet. Hairline border-line grid, font-tech mono
 * micro-labels, grayscale ingredient matrix with division color accents,
 * marquee ticker. Green-led palette from Fenchem brand book.
 * Based on variant-b structure; all old editorial tokens replaced.
 */

const IMG = {
  glassware:
    "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?auto=format&fit=crop&w=1000&q=80",
  microscope:
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=80",
} as const;
const NAV_LINKS = [
  {
    label: "Matrix",
    href: "#matrix",
  },
  {
    label: "Protocol",
    href: "#protocol",
  },
  {
    label: "Domains",
    href: "#domains",
  },
  {
    label: "Network",
    href: "#network",
  },
] as const;
const HERO_META = [
  {
    k: "SPEC.REF",
    v: "FN-LP / 2026-E",
  },
  {
    k: "ORIGIN",
    v: "N 32.06 / E 118.79",
  },
  {
    k: "ESTABLISHED",
    v: "1995 — NANJING",
  },
  {
    k: "CERT",
    v: "ISO 9001 / GMP",
  },
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
type DivisionKey = "nutrition" | "food" | "cosmetics" | "chem" | "agro" | "feed";
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
    division: "nutrition" as DivisionKey,
  },
  {
    code: "B-02",
    cat: "CAT: F&B",
    desc: "Heat- and pH-stable functional ingredients for fortification, natural color and clean-label claims.",
    division: "food" as DivisionKey,
  },
  {
    code: "C-03",
    cat: "CAT: CARE",
    desc: "Dermatologically active agents formulated for cellular compatibility and sensory performance.",
    division: "cosmetics" as DivisionKey,
  },
] as const;
const FOOTER_COLS = [
  {
    head: "INDEX",
    links: [
      {
        label: "Ingredient Matrix",
        href: "#matrix",
      },
      {
        label: "Operating Protocol",
        href: "#protocol",
      },
      {
        label: "Application Domains",
        href: "#domains",
      },
      {
        label: "Global Network",
        href: "#network",
      },
    ],
  },
  {
    head: "COMPLIANCE",
    links: [
      {
        label: "Quality Charter",
        href: "#protocol",
      },
      {
        label: "Regulatory Dossiers",
        href: "#contact",
      },
      {
        label: "Sourcing Standards",
        href: "#protocol",
      },
      {
        label: "Ingredient Transparency",
        href: "#matrix",
      },
    ],
  },
  {
    head: "CHANNEL",
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
        href: "#network",
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
      backgroundColor: colors.brandGreen100,
      color: colors.brandGreen800,
    },
  },
  framedContainer: {
    marginInline: "auto",
    maxWidth: "1480px",
    borderColor: colors.line,
    borderLeftWidth: {
      default: 0,
      "@media (min-width: 1481px)": "1px",
    },
    borderRightWidth: {
      default: 0,
      "@media (min-width: 1481px)": "1px",
    },
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
  },
  /* ─── Header / Nav ────────────────────────────────────── */
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-paper) 90%, transparent)",
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
    backgroundColor: colors.mute50,
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: "0.5rem",
  },
  microText: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
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
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-500) 60%, transparent)",
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
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: "1rem",
  },
  logoLink: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.75rem",
    textDecoration: "none",
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    outline: "none",
    ":hover": {
      opacity: 0.7,
    },
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "4px",
    },
  },
  logoWordmark: {
    fontFamily: typography.body,
    fontSize: "1.25rem",
    fontWeight: 900,
    letterSpacing: "-0.04em",
    color: colors.brandGreen600,
  },
  logoSub: {
    display: {
      default: "none",
      [breakpoints.sm]: "inline",
    },
    fontFamily: typography.tech,
    fontSize: "9px",
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: colors.mute600,
  },
  navLinksDesktop: {
    display: {
      default: "none",
      [breakpoints.md]: "flex",
    },
    alignItems: "center",
    gap: "2rem",
  },
  navLink: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
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
      outlineOffset: "4px",
    },
  },
  navLinkNum: {
    marginRight: "0.375rem",
    color: colors.brandGreen700,
  },
  navCta: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.625rem",
    backgroundColor: {
      default: colors.brandBlue700,
      ":hover": colors.brandBlue800,
    },
    paddingInline: "1.25rem",
    paddingBlock: "0.625rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.paper,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandBlue700}`,
      outlineOffset: "4px",
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
  },
  heroGridBg: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(to right, color-mix(in oklch, var(--color-line) 40%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--color-line) 40%, transparent) 1px, transparent 1px)`,
    backgroundSize: "56px 56px",
  },
  heroPlusTL: {
    position: "absolute",
    left: "1rem",
    top: "1rem",
    height: "1rem",
    width: "1rem",
    color: colors.mute300,
  },
  heroPlusBR: {
    position: "absolute",
    right: "1rem",
    bottom: "1rem",
    height: "1rem",
    width: "1rem",
    color: colors.mute300,
    display: {
      default: "none",
      [breakpoints.lg]: "block",
    },
  },
  heroGrid: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  heroLeft: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 8",
    },
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: {
      default: "4rem",
      [breakpoints.md]: "6rem",
      [breakpoints.lg]: "7rem",
    },
  },
  heroSysBadge: {
    display: "inline-flex",
    width: "fit-content",
    alignItems: "center",
    gap: "0.625rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.paper,
    paddingInline: "0.875rem",
    paddingBlock: "0.5rem",
  },
  heroSysPingWrap: {
    position: "relative",
    display: "flex",
    height: "0.5rem",
    width: "0.5rem",
  },
  heroSysPingOuter: {
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
  heroSysPingInner: {
    position: "relative",
    display: "inline-flex",
    height: "0.5rem",
    width: "0.5rem",
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
  },
  heroSysText: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: colors.mute600,
  },
  heroH1: {
    marginTop: "2.5rem",
    fontFamily: typography.body,
    fontSize: "clamp(2.7rem, 6.4vw, 6rem)",
    fontWeight: 900,
    lineHeight: 0.98,
    letterSpacing: "-0.04em",
    color: colors.ink,
  },
  greenAccentText: {
    color: colors.brandGreen600,
  },
  heroP: {
    marginTop: "2rem",
    maxWidth: "36rem",
    fontFamily: typography.body,
    fontSize: {
      default: "1rem",
      [breakpoints.md]: "1.125rem",
    },
    lineHeight: 1.625,
    color: colors.mute600,
  },
  heroBtns: {
    marginTop: "2.5rem",
    display: "flex",
    flexWrap: "wrap",
    gap: {
      default: "0.75rem",
      [breakpoints.md]: "1rem",
    },
  },
  heroPrimaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.75rem",
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "4px",
    },
  },
  heroSecondaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    backgroundColor: {
      default: "transparent",
      ":hover": colors.brandBlue50,
    },
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.brandBlue700,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandBlue700}`,
      outlineOffset: "4px",
    },
  },
  heroAside: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 4",
    },
    display: "flex",
    flexDirection: "column",
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
  metaDl: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    margin: 0,
  },
  metaRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
    },
    paddingBlock: "1rem",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  metaDt: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.mute600,
  },
  metaDd: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: colors.ink,
    margin: 0,
  },
  statusDd: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: colors.brandGreen700,
    margin: 0,
  },
  statusDot: {
    height: "0.375rem",
    width: "0.375rem",
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
  },
  heroImgFrame: {
    position: "relative",
    minHeight: {
      default: "16rem",
      [breakpoints.lg]: "18rem",
    },
    flex: 1,
    overflow: "hidden",
  },
  heroImg: {
    position: "absolute",
    inset: 0,
    height: "100%",
    width: "100%",
    objectFit: "cover",
    filter: "grayscale(100%)",
    transitionProperty: "filter, transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
    ":hover": {
      filter: "grayscale(0%)",
      transform: "scale(1.03)",
    },
  },
  heroImgCaption: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-paper) 90%, transparent)",
    paddingInline: "1rem",
    paddingBlock: "0.625rem",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  captionMono: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.mute600,
  },
  captionTagGreen: {
    fontFamily: typography.tech,
    fontSize: "10px",
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
  },
  /* ─── Ticker ──────────────────────────────────────────── */
  tickerSection: {
    overflow: "hidden",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    paddingBlock: {
      default: "1rem",
      [breakpoints.md]: "1.25rem",
    },
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
    gap: {
      default: "2rem",
      [breakpoints.md]: "3rem",
    },
    paddingRight: {
      default: "2rem",
      [breakpoints.md]: "3rem",
    },
  },
  tickerText: {
    whiteSpace: "nowrap",
    fontFamily: typography.tech,
    fontSize: {
      default: "11px",
      [breakpoints.md]: "12px",
    },
    textTransform: "uppercase",
    letterSpacing: "0.3em",
    color: colors.mute600,
  },
  tickerDiamond: {
    height: "0.375rem",
    width: "0.375rem",
    transform: "rotate(45deg)",
    backgroundColor: colors.brandGreen400,
  },
  /* ─── Stat Band ───────────────────────────────────────── */
  statBand: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.lg]: "repeat(4, 1fr)",
    },
    gap: "1px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
    backgroundColor: colors.line,
  },
  statCard: {
    height: "100%",
    backgroundColor: {
      default: colors.paper,
      ":hover": colors.brandGreen50,
    },
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
    },
    paddingBlock: {
      default: "2.25rem",
      [breakpoints.md]: "3rem",
    },
    transitionProperty: "background-color",
    transitionDuration: "500ms",
  },
  statLabel: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.mute600,
    margin: 0,
  },
  statValueRow: {
    marginTop: "1.25rem",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: "0.625rem",
  },
  statValue: {
    fontFamily: typography.body,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3.75rem",
    },
    fontWeight: 900,
    letterSpacing: "-0.04em",
    color: colors.brandGreen600,
  },
  statUnit: {
    fontFamily: typography.body,
    fontSize: {
      default: "1.125rem",
      [breakpoints.md]: "1.5rem",
    },
    fontWeight: 500,
    color: colors.mute600,
  },
  statDesc: {
    marginTop: "1rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: colors.mute600,
    margin: 0,
  },
  /* ─── Section Header ──────────────────────────────────── */
  sectionHead: {
    display: "flex",
    flexDirection: {
      default: "column",
      [breakpoints.md]: "row",
    },
    gap: "2rem",
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
  sectionCode: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.mute600,
    margin: 0,
  },
  sectionH2: {
    marginTop: "1.25rem",
    fontFamily: typography.body,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3rem",
    },
    fontWeight: 900,
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
    color: colors.ink,
    margin: 0,
  },
  specsButton: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.625rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: colors.line,
      ":hover": colors.brandGreen500,
    },
    color: {
      default: colors.mute600,
      ":hover": colors.brandGreen700,
    },
    paddingInline: "1.25rem",
    paddingBlock: "0.75rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    textDecoration: "none",
    transitionProperty: "color, border-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "4px",
    },
  },
  /* ─── Matrix ──────────────────────────────────────────── */
  matrixSection: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
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
  matrixCardBg: {
    backgroundColor: colors.paper,
  },
  matrixInner: {
    height: "100%",
    borderLeftWidth: "2px",
    borderLeftStyle: "solid",
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
    filter: "grayscale(100%)",
    transitionProperty: "filter, transform",
    transitionDuration: "700ms",
    transitionTimingFunction: "ease-out",
    ":hover": {
      filter: "grayscale(0%)",
      transform: "scale(1.04)",
    },
  },
  matrixTagOverlay: {
    position: "absolute",
    right: "1rem",
    top: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: "color-mix(in oklch, var(--color-paper) 90%, transparent)",
    paddingInline: "0.5rem",
    paddingBlock: "0.25rem",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  matrixTagOverlayText: {
    fontFamily: typography.tech,
    fontSize: "9px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.ink,
  },
  matrixContent: {
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "1.75rem",
    },
    paddingBlock: {
      default: "1.75rem",
      [breakpoints.md]: "2rem",
    },
  },
  matrixHeaderRow: {
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
  },
  matrixBadgeRow: {
    marginTop: "0.5rem",
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
    color: colors.mute600,
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
      default: colors.mute600,
      ":hover": colors.brandGreen700,
    },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "4px",
    },
  },
  /* ─── Protocol ────────────────────────────────────────── */
  protocolSection: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  protocolGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  protocolFigureCol: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 5",
    },
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: {
      default: "3rem",
      [breakpoints.lg]: "4rem",
    },
  },
  protocolFigureBox: {
    position: "relative",
    overflow: "hidden",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.line,
  },
  protocolFigureImg: {
    height: {
      default: "380px",
      [breakpoints.md]: "480px",
    },
    width: "100%",
    objectFit: "cover",
    filter: "grayscale(100%)",
    transitionProperty: "filter",
    transitionDuration: "700ms",
    ":hover": {
      filter: "grayscale(0%)",
    },
  },
  protocolRightCol: {
    gridColumn: {
      default: "auto",
      [breakpoints.lg]: "span 7",
    },
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
  protocolPillarRow: {
    display: "grid",
    gap: "1rem",
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
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(12, 1fr)",
    },
    columnGap: {
      default: "1rem",
      [breakpoints.md]: "1.5rem",
    },
    transitionProperty: "background-color",
    transitionDuration: "500ms",
  },
  protocolPillarDivider: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  protocolStep: {
    fontFamily: typography.tech,
    fontSize: "0.875rem",
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 2",
    },
  },
  protocolBody: {
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 10",
    },
  },
  protocolTitleRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "0.5rem",
    columnGap: "1.5rem",
  },
  protocolH3: {
    fontFamily: typography.body,
    fontSize: {
      default: "1.5rem",
      [breakpoints.md]: "1.875rem",
    },
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: colors.ink,
    margin: 0,
  },
  protocolTag: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.mute600,
  },
  protocolDesc: {
    marginTop: "1rem",
    maxWidth: "36rem",
    fontFamily: typography.body,
    fontSize: {
      default: "0.875rem",
      [breakpoints.md]: "1rem",
    },
    lineHeight: 1.625,
    color: colors.mute600,
  },
  /* ─── Domains ─────────────────────────────────────────── */
  domainsSection: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.line,
  },
  domainLink: {
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
    transitionDuration: "500ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "4px",
    },
  },
  domainRowGrid: {
    display: "grid",
    alignItems: "center",
    gap: "0.75rem",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: {
      default: "2.25rem",
      [breakpoints.md]: "3rem",
    },
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(12, 1fr)",
    },
    columnGap: {
      default: "0.75rem",
      [breakpoints.md]: "1.5rem",
    },
  },
  domainColCode: {
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 2",
    },
  },
  domainCodeRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  domainCode: {
    fontFamily: typography.tech,
    fontSize: "11px",
    letterSpacing: "0.22em",
    color: colors.brandGreen700,
    margin: 0,
  },
  domainCat: {
    marginTop: "0.25rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.mute600,
    margin: 0,
  },
  domainH3: {
    fontFamily: typography.body,
    fontSize: {
      default: "1.5rem",
      [breakpoints.md]: "2.25rem",
    },
    fontWeight: 700,
    letterSpacing: "-0.03em",
    color: {
      default: colors.ink,
      ":hover": colors.brandGreen600,
    },
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 5",
    },
    transitionProperty: "color",
    transitionDuration: "300ms",
    margin: 0,
  },
  domainDesc: {
    fontFamily: typography.body,
    fontSize: "0.875rem",
    lineHeight: 1.625,
    color: colors.mute600,
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 4",
    },
    margin: 0,
  },
  domainArrowCol: {
    display: "flex",
    justifyContent: {
      default: "flex-start",
      [breakpoints.md]: "flex-end",
    },
    gridColumn: {
      default: "auto",
      [breakpoints.md]: "span 1",
    },
  },
  domainArrow: {
    height: "1.5rem",
    width: "1.5rem",
    color: colors.mute300,
    transitionProperty: "transform, color",
    transitionDuration: "300ms",
  },
  domainAccentStrip: {
    gridColumn: "1 / -1",
    height: "2px",
  },
  /* ─── CTA + Network ───────────────────────────────────── */
  ctaNetworkSection: {
    backgroundColor: colors.brandBlue700,
    color: colors.paper,
  },
  ctaTopBanner: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-paper) 10%, transparent)",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: {
      default: "5rem",
      [breakpoints.md]: "7rem",
    },
  },
  ctaChannelTag: {
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: colors.brandGreen300,
    margin: 0,
  },
  ctaH2: {
    marginTop: "1.5rem",
    maxWidth: "56rem",
    fontFamily: typography.body,
    fontSize: {
      default: "2.25rem",
      [breakpoints.md]: "3.75rem",
    },
    fontWeight: 900,
    lineHeight: 1.02,
    letterSpacing: "-0.03em",
    color: colors.paper,
  },
  ctaH2Green: {
    color: colors.brandGreen400,
  },
  ctaP: {
    marginTop: "1.75rem",
    maxWidth: "36rem",
    fontFamily: typography.body,
    fontSize: {
      default: "0.875rem",
      [breakpoints.md]: "1rem",
    },
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-paper) 70%, transparent)",
  },
  ctaBtnGroup: {
    marginTop: "2.5rem",
    display: "flex",
    flexWrap: "wrap",
    gap: {
      default: "0.75rem",
      [breakpoints.md]: "1rem",
    },
  },
  ctaPrimaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.75rem",
    backgroundColor: {
      default: colors.brandGreen500,
      ":hover": colors.brandGreen400,
    },
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen300}`,
      outlineOffset: "4px",
    },
  },
  ctaSecondaryBtn: {
    display: "inline-flex",
    minHeight: "2.75rem",
    alignItems: "center",
    gap: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "color-mix(in oklch, var(--color-paper) 30%, transparent)",
      ":hover": colors.paper,
    },
    backgroundColor: {
      default: "transparent",
      ":hover": "color-mix(in oklch, var(--color-paper) 10%, transparent)",
    },
    paddingInline: "1.75rem",
    paddingBlock: "1rem",
    fontFamily: typography.tech,
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.22em",
    color: {
      default: "color-mix(in oklch, var(--color-paper) 90%, transparent)",
      ":hover": colors.paper,
    },
    textDecoration: "none",
    transitionProperty: "border-color, background-color, color",
    transitionDuration: "300ms",
    outline: "none",
    ":focus-visible": {
      outline: `2px solid color-mix(in oklch, var(--color-paper) 60%, transparent)`,
      outlineOffset: "4px",
    },
  },
  ctaResponseText: {
    marginTop: "2.5rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    color: "color-mix(in oklch, var(--color-paper) 65%, transparent)",
    margin: 0,
  },
  networkHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-paper) 10%, transparent)",
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2.5rem",
    },
    paddingBlock: "1.25rem",
  },
  networkNodesTitle: {
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    color: colors.brandGreen300,
  },
  networkVerifiedText: {
    display: {
      default: "none",
      [breakpoints.md]: "block",
    },
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.26em",
    color: "color-mix(in oklch, var(--color-paper) 65%, transparent)",
  },
  networkGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.sm]: "repeat(2, 1fr)",
      [breakpoints.lg]: "repeat(3, 1fr)",
    },
    gap: "1px",
    backgroundColor: "color-mix(in oklch, var(--color-paper) 10%, transparent)",
  },
  networkCard: {
    height: "100%",
    backgroundColor: {
      default: colors.brandBlue700,
      ":hover": colors.brandBlue800,
    },
    paddingInline: {
      default: "1.25rem",
      [breakpoints.md]: "2rem",
    },
    paddingBlock: {
      default: "1.75rem",
      [breakpoints.md]: "2.25rem",
    },
    transitionProperty: "background-color",
    transitionDuration: "500ms",
  },
  networkCardMeta: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.brandGreen300,
  },
  networkCity: {
    marginTop: "1rem",
    fontFamily: typography.body,
    fontSize: "1.25rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: colors.paper,
    margin: 0,
  },
  networkRole: {
    marginTop: "0.25rem",
    fontFamily: typography.body,
    fontSize: "0.875rem",
    color: "color-mix(in oklch, var(--color-paper) 70%, transparent)",
    margin: 0,
  },
  /* ─── Footer ──────────────────────────────────────────── */
  footer: {
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.line,
    backgroundColor: colors.paper,
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
  footerLogo: {
    fontFamily: typography.body,
    fontSize: "1.5rem",
    fontWeight: 900,
    letterSpacing: "-0.04em",
    color: colors.brandGreen600,
    textDecoration: "none",
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    outline: "none",
    ":hover": {
      opacity: 0.7,
    },
    ":focus-visible": {
      outline: `2px solid ${colors.brandGreen500}`,
      outlineOffset: "4px",
    },
  },
  footerSubtitle: {
    marginTop: "1rem",
    maxWidth: "20rem",
    fontFamily: typography.body,
    fontSize: "1.125rem",
    fontWeight: 500,
    color: colors.mute600,
  },
  footerCerts: {
    marginTop: "1.5rem",
    fontFamily: typography.tech,
    fontSize: "10px",
    textTransform: "uppercase",
    lineHeight: 2,
    letterSpacing: "0.22em",
    color: colors.mute600,
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
    letterSpacing: "0.28em",
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
      outlineOffset: "4px",
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
    color: "color-mix(in oklch, var(--color-brand-green-500) 6%, transparent)",
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
  footerEof: {
    color: colors.brandGreen700,
  },
  /* ─── Division Badges & Accents ───────────────────────── */
  divisionDot: {
    display: "inline-block",
    height: "0.625rem",
    width: "0.625rem",
    borderRadius: radii.full,
    flexShrink: 0,
    borderWidth: "1px",
    borderStyle: "solid",
  },
  divisionTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.375rem",
    paddingInline: "0.5rem",
    paddingBlock: "0.125rem",
    fontFamily: typography.tech,
    fontSize: "9px",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
  },
  divisionTagInnerDot: {
    height: "0.375rem",
    width: "0.375rem",
    borderRadius: radii.full,
    backgroundColor: "currentColor",
    opacity: 0.6,
  },
  // Division specific colors
  divNutrition: {
    backgroundColor: colors.nutrition,
    color: colors.ink,
    borderColor: colors.brandGreen300,
  },
  divFood: {
    backgroundColor: colors.food,
    color: colors.ink,
    borderColor: colors.food,
  },
  divCosmetics: {
    backgroundColor: colors.cosmetics,
    color: colors.paper,
    borderColor: colors.cosmetics,
  },
  divChem: {
    backgroundColor: colors.chem,
    color: colors.ink,
    borderColor: colors.chem,
  },
  divAgro: {
    backgroundColor: colors.agro,
    color: colors.ink,
    borderColor: colors.agro,
  },
  divFeed: {
    backgroundColor: colors.feed,
    color: colors.ink,
    borderColor: colors.feed,
  },
});
const DIVISION_MAP: Record<
  DivisionKey,
  {
    label: string;
    style: typeof styles.divNutrition;
  }
> = {
  nutrition: {
    label: "NUTRITION",
    style: styles.divNutrition,
  },
  food: {
    label: "FOOD & BEV",
    style: styles.divFood,
  },
  cosmetics: {
    label: "PERSONAL CARE",
    style: styles.divCosmetics,
  },
  chem: {
    label: "SPECIALTY CHEM",
    style: styles.divChem,
  },
  agro: {
    label: "AGRO",
    style: styles.divAgro,
  },
  feed: {
    label: "FEED",
    style: styles.divFeed,
  },
};

/* Division color dot chip */
function DivisionDot({ division }: { division: DivisionKey }) {
  const info = DIVISION_MAP[division];
  return <span aria-hidden {...stylex.props(styles.divisionDot, info.style)} />;
}

/* Division tag badge */
function DivisionTag({ division }: { division: DivisionKey }) {
  const info = DIVISION_MAP[division];
  return (
    <span {...stylex.props(styles.divisionTag, info.style)}>
      <span aria-hidden {...stylex.props(styles.divisionTagInnerDot)} />
      {info.label}
    </span>
  );
}

/* Section header with mono code and brand-green heading */
function SectionHead({
  code,
  title,
  sub,
  right,
}: {
  code: string;
  title: string;
  sub: string;
  right?: ReactNode;
}) {
  return (
    <div {...stylex.props(styles.sectionHead)}>
      <Reveal>
        <p {...stylex.props(styles.sectionCode)}>{code}</p>
        <h2 {...stylex.props(styles.sectionH2)}>
          {title} <span {...stylex.props(styles.greenAccentText)}>{sub}</span>
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
    <div ref={ref} {...stylex.props(styles.protocolFigureBox)}>
      <m.img
        src={IMG.microscope}
        alt="Analyst working at a microscope inside the Fenchem laboratory"
        style={{
          y: reduce ? "0%" : y,
          scale: 1.16,
        }}
        loading="lazy"
        {...stylex.props(styles.protocolFigureImg)}
      />
      <div {...stylex.props(styles.heroImgCaption)}>
        <span {...stylex.props(styles.captionMono)}>FIG. 02 — ANALYTICAL LAB, NANJING</span>
        <span {...stylex.props(styles.captionTagGreen)}>HPLC-7</span>
      </div>
    </div>
  );
}

/* ===== Hero section ===== */
function HeroSection() {
  return (
    <section {...stylex.props(styles.heroSection)}>
      {/* Grid lines */}
      <div aria-hidden {...stylex.props(styles.heroGridBg)} />
      <Plus aria-hidden strokeWidth={1} {...stylex.props(styles.heroPlusTL)} />
      <Plus aria-hidden strokeWidth={1} {...stylex.props(styles.heroPlusBR)} />
      <div {...stylex.props(styles.heroGrid)}>
        {/* Left: headline block */}
        <div {...stylex.props(styles.heroLeft)}>
          <Reveal>
            <span {...stylex.props(styles.heroSysBadge)}>
              <span {...stylex.props(styles.heroSysPingWrap)}>
                <span {...stylex.props(styles.heroSysPingOuter)} />
                <span {...stylex.props(styles.heroSysPingInner)} />
              </span>
              <span {...stylex.props(styles.heroSysText)}>
                SYS.ACTIVE — Botanical Intelligence Since 1995
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 {...stylex.props(styles.heroH1)}>
              Nurturing Vitality through{" "}
              <span {...stylex.props(styles.greenAccentText)}>Botanical Excellence</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p {...stylex.props(styles.heroP)}>
              Fenchem converts raw botanical complexity into precisely specified, clinically
              validated actives — supplied at industrial scale to formulators in more than forty
              countries.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div {...stylex.props(styles.heroBtns)}>
              <a href="#matrix" {...stylex.props(styles.heroPrimaryBtn)}>
                Explore Portfolio
                <ArrowRight
                  style={{
                    height: "0.875rem",
                    width: "0.875rem",
                  }}
                  aria-hidden
                />
              </a>
              <a href="#contact" {...stylex.props(styles.heroSecondaryBtn)}>
                Request a Specification
              </a>
            </div>
          </Reveal>
        </div>
        {/* Right: mono metadata rail */}
        <aside aria-label="System metadata" {...stylex.props(styles.heroAside)}>
          <Reveal delay={0.25}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <dl {...stylex.props(styles.metaDl)}>
                {HERO_META.map((row) => (
                  <div key={row.k} {...stylex.props(styles.metaRow)}>
                    <dt {...stylex.props(styles.metaDt)}>{row.k}</dt>
                    <dd {...stylex.props(styles.metaDd)}>{row.v}</dd>
                  </div>
                ))}
                <div {...stylex.props(styles.metaRow)}>
                  <dt {...stylex.props(styles.metaDt)}>STATUS</dt>
                  <dd {...stylex.props(styles.statusDd)}>
                    <span aria-hidden {...stylex.props(styles.statusDot)} />
                    OPERATIONAL
                  </dd>
                </div>
              </dl>
              <div {...stylex.props(styles.heroImgFrame)}>
                <img
                  src={IMG.glassware}
                  alt="Laboratory glassware during botanical extraction work at Fenchem"
                  loading="lazy"
                  {...stylex.props(styles.heroImg)}
                />
                <div {...stylex.props(styles.heroImgCaption)}>
                  <span {...stylex.props(styles.captionMono)}>FIG. 01 — EXTRACTION LAB</span>
                  <span {...stylex.props(styles.captionTagGreen)}>BATCH 2026.06</span>
                </div>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}

/* ===== Ingredient ticker marquee ===== */
function TickerSection() {
  return (
    <section aria-label="Live ingredient index" {...stylex.props(styles.tickerSection)}>
      <div {...stylex.props(styles.tickerTrack)}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} {...stylex.props(styles.tickerList)}>
            {ingredients.map((ingredient, i) => (
              <li key={ingredient.name} {...stylex.props(styles.tickerItem)}>
                <span {...stylex.props(styles.tickerText)}>
                  <span {...stylex.props(styles.captionTagGreen)}>
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
    <section aria-label="Company metrics" {...stylex.props(styles.statBand)}>
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08}>
          <div {...stylex.props(styles.statCard)}>
            <p {...stylex.props(styles.statLabel)}>{s.label}</p>
            <div {...stylex.props(styles.statValueRow)}>
              <span {...stylex.props(styles.statValue)}>{s.value}</span>
              <span {...stylex.props(styles.statUnit)}>{s.unit}</span>
            </div>
            <p {...stylex.props(styles.statDesc)}>{s.desc}</p>
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
        sub="matrix."
        right={
          <a href="#contact" {...stylex.props(styles.specsButton)}>
            View Full Specs
            <ArrowRight
              style={{
                height: "0.75rem",
                width: "0.75rem",
              }}
              aria-hidden
            />
          </a>
        }
      />
      <div {...stylex.props(styles.matrixGrid)}>
        {getFeaturedIngredients().map((item, i) => {
          const division = divisionForApplication(item.application);
          const divInfo = DIVISION_MAP[division];
          return (
            <Reveal key={item.code} delay={(i % 3) * 0.08}>
              <div {...stylex.props(styles.matrixCardBg)}>
                <div {...stylex.props(styles.matrixInner, divInfo.style)}>
                  <div {...stylex.props(styles.matrixImgBox)}>
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      loading="lazy"
                      {...stylex.props(styles.matrixImg)}
                    />
                    {/* Division tag overlay */}
                    <span {...stylex.props(styles.matrixTagOverlay)}>
                      <DivisionDot division={division} />
                      <span {...stylex.props(styles.matrixTagOverlayText)}>{item.category}</span>
                    </span>
                  </div>
                  <div {...stylex.props(styles.matrixContent)}>
                    <div {...stylex.props(styles.matrixHeaderRow)}>
                      <span {...stylex.props(styles.matrixIndex)}>
                        {String(i + 1).padStart(2, "0")} —
                      </span>
                      <span {...stylex.props(styles.matrixCode)}>{item.code}</span>
                    </div>
                    <h3 {...stylex.props(styles.matrixName)}>{item.name}</h3>
                    {/* Division badge */}
                    <div {...stylex.props(styles.matrixBadgeRow)}>
                      <DivisionTag division={division} />
                    </div>
                    <dl {...stylex.props(styles.matrixDl)}>
                      <div {...stylex.props(styles.matrixDlRow)}>
                        <dt {...stylex.props(styles.matrixDlDt)}>Purity</dt>
                        <dd {...stylex.props(styles.matrixDlDd)}>{item.purity}</dd>
                      </div>
                      <div {...stylex.props(styles.matrixDlRow)}>
                        <dt {...stylex.props(styles.matrixDlDt)}>Form</dt>
                        <dd {...stylex.props(styles.matrixDlDd)}>{item.form}</dd>
                      </div>
                      <div {...stylex.props(styles.matrixDlRow)}>
                        <dt {...stylex.props(styles.matrixDlDt)}>Application</dt>
                        <dd {...stylex.props(styles.matrixDlDd)}>{item.useCase}</dd>
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
                </div>
              </div>
            </Reveal>
          );
        })}
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
        sub="protocol."
        right={
          <p
            style={{
              maxWidth: "20rem",
              fontFamily: typography.tech,
              fontSize: "10px",
              textTransform: "uppercase",
              lineHeight: 1.625,
              letterSpacing: "0.2em",
              color: colors.mute600,
              margin: 0,
            }}
          >
            Rooted in nature, refined by science — every lot, every market, every release.
          </p>
        }
      />
      <div {...stylex.props(styles.protocolGrid)}>
        <div {...stylex.props(styles.protocolFigureCol)}>
          <Reveal>
            <ProtocolFigure />
          </Reveal>
        </div>
        <div {...stylex.props(styles.protocolRightCol)}>
          {pillars.map((pillar, i) => {
            const detail = PROTOCOL_DETAIL[i];
            const isLast = i === pillars.length - 1;
            return (
              <Reveal key={pillar.title} delay={i * 0.08}>
                <div
                  {...stylex.props(
                    styles.protocolPillarRow,
                    !isLast && styles.protocolPillarDivider,
                  )}
                >
                  <span {...stylex.props(styles.protocolStep)}>{detail.step} —</span>
                  <div {...stylex.props(styles.protocolBody)}>
                    <div {...stylex.props(styles.protocolTitleRow)}>
                      <h3 {...stylex.props(styles.protocolH3)}>{pillar.title}</h3>
                      <span {...stylex.props(styles.protocolTag)}>{detail.tag}</span>
                    </div>
                    <p {...stylex.props(styles.protocolDesc)}>{detail.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
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
        sub="industries."
      />
      <div>
        {industries.map((industry, i) => {
          const detail = DOMAIN_DETAIL[i];
          const divInfo = DIVISION_MAP[detail.division];
          return (
            <a key={industry.title} href="#contact" {...stylex.props(styles.domainLink)}>
              <Reveal delay={i * 0.06}>
                <div {...stylex.props(styles.domainRowGrid)}>
                  <div {...stylex.props(styles.domainColCode)}>
                    <div {...stylex.props(styles.domainCodeRow)}>
                      <DivisionDot division={detail.division} />
                      <p {...stylex.props(styles.domainCode)}>{detail.code}</p>
                    </div>
                    <p {...stylex.props(styles.domainCat)}>{detail.cat}</p>
                  </div>
                  <h3 {...stylex.props(styles.domainH3)}>{industry.title}</h3>
                  <p {...stylex.props(styles.domainDesc)}>{detail.desc}</p>
                  <div {...stylex.props(styles.domainArrowCol)}>
                    <ArrowUpRight aria-hidden {...stylex.props(styles.domainArrow)} />
                  </div>
                  {/* Division accent strip at bottom */}
                  <div aria-hidden {...stylex.props(styles.domainAccentStrip, divInfo.style)} />
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
      <div {...stylex.props(styles.ctaTopBanner)}>
        <Reveal>
          <p {...stylex.props(styles.ctaChannelTag)}>SYS.CONTACT // OPEN CHANNEL</p>
          <h2 {...stylex.props(styles.ctaH2)}>
            Your next formulation,{" "}
            <span {...stylex.props(styles.ctaH2Green)}>engineered to specification.</span>
          </h2>
          <p {...stylex.props(styles.ctaP)}>
            Submit a target spec — purity, form, matrix, regulatory map — and our laboratory returns
            a validated proposal with full documentation within one business day.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div {...stylex.props(styles.ctaBtnGroup)}>
            <a href="mailto:sales@fenchem.com" {...stylex.props(styles.ctaPrimaryBtn)}>
              Partner with Fenchem
              <ArrowRight
                style={{
                  height: "0.875rem",
                  width: "0.875rem",
                }}
                aria-hidden
              />
            </a>
            <a href="#matrix" {...stylex.props(styles.ctaSecondaryBtn)}>
              Explore Portfolio
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <p {...stylex.props(styles.ctaResponseText)}>
            RESPONSE.TIME &lt; 24H — TECHNICAL DOSSIERS ON REQUEST
          </p>
        </Reveal>
      </div>
      <div id="network">
        <div {...stylex.props(styles.networkHeader)}>
          <span {...stylex.props(styles.networkNodesTitle)}>SYS.NET // 6 ACTIVE NODES</span>
          <span {...stylex.props(styles.networkVerifiedText)}>LAT/LONG VERIFIED — 2026.06</span>
        </div>
        <div {...stylex.props(styles.networkGrid)}>
          {regions.map((region, i) => (
            <Reveal key={region.city} delay={(i % 3) * 0.08}>
              <div {...stylex.props(styles.networkCard)}>
                <div {...stylex.props(styles.networkCardMeta)}>
                  <span>{`NODE ${String(i + 1).padStart(2, "0")}`}</span>
                  <span
                    style={{
                      color: "color-mix(in oklch, var(--color-paper) 65%, transparent)",
                    }}
                  >
                    {region.coords}
                  </span>
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
          <a href="/" {...stylex.props(styles.footerLogo)}>
            FENCHEM
          </a>
          <p {...stylex.props(styles.footerSubtitle)}>Rooted in nature, refined by science.</p>
          <p {...stylex.props(styles.footerCerts)}>
            ISO 9001 : 2015 / GMP / HACCP
            <br />
            EST. 1995 — NANJING, CHINA
          </p>
        </div>
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
        <div
          style={{
            gridColumn: "span 1",
          }}
        />
      </div>
      <p aria-hidden {...stylex.props(styles.footerWatermark)}>
        FENCHEM
      </p>
      <div {...stylex.props(styles.footerLegalRow)}>
        <span>© 2026 Fenchem — All Rights Reserved</span>
        <span>N 32.06 / E 118.79 — Nanjing</span>
        <span {...stylex.props(styles.footerEof)}>SYS.EOF // END OF SPEC</span>
      </div>
    </footer>
  );
}
export function VariantE() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        {/* ===== Sticky top bar ===== */}
        <header {...stylex.props(styles.header)}>
          <div {...stylex.props(styles.framedContainer)}>
            {/* Micro-label strip */}
            <div {...stylex.props(styles.microStrip)}>
              <span {...stylex.props(styles.microText)}>
                <span {...stylex.props(styles.pingWrap)}>
                  <span {...stylex.props(styles.pingOuter)} />
                  <span {...stylex.props(styles.pingInner)} />
                </span>
                SYS.ACTIVE — INGREDIENT ENGINEERING
              </span>
              <span {...stylex.props(styles.microText)}>N 32.06 / E 118.79 — NANJING HQ</span>
              <span {...stylex.props(styles.microText)}>ISO 9001 : 2015 / GMP</span>
            </div>
            {/* Nav row */}
            <nav aria-label="Main navigation" {...stylex.props(styles.navRow)}>
              <a href="/" {...stylex.props(styles.logoLink)}>
                <span {...stylex.props(styles.logoWordmark)}>FENCHEM</span>
                <span {...stylex.props(styles.logoSub)}>Innovation Lab</span>
              </a>
              <div {...stylex.props(styles.navLinksDesktop)}>
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
                <ArrowRight
                  style={{
                    height: "0.75rem",
                    width: "0.75rem",
                  }}
                  aria-hidden
                />
              </a>
            </nav>
          </div>
          {/* Scroll progress hairline — brand green */}
          <m.div
            aria-hidden
            style={{
              scaleX: reduce ? 0 : scrollYProgress,
            }}
            {...stylex.props(styles.navHairline)}
          />
        </header>

        {/* ===== Framed spec-sheet ===== */}
        <div {...stylex.props(styles.framedContainer)}>
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
