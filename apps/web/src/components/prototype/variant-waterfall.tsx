/*
 * PROTOTYPE — Variant Waterfall: "The Botanical Fountain"
 * Complete B2B Production Landing Page powered by real-time Three.js WebGL fluid physics.
 * Features:
 *   1. Sticky Nav with Portfolio Dropdown & Mobile Menu
 *   2. Real-time Three.js Particle Waterfall & Fountain Hero
 *   3. Stat Strip (30+ Years, 6 Global Bases, ISO/GMP, 40+ Countries)
 *   4. Active Compound Marquee Ticker
 *   5. Three Application Domain Cards (Nutrition, Food & Beverage, Personal Care)
 *   6. Filterable Standardized Ingredient Matrix
 *   7. Deep Product Dossier (Analytical Panel & Format Chips)
 *   8. Live Interactive Formulation Presenter (Dynamic Spec Matcher)
 *   9. Quality Standards, Certifications & 6 Global Bases
 *  10. High-Converting Finale & Enterprise Footer
 */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Droplets,
  FileDown,
  Globe,
  Menu,
  Pause,
  Play,
  Search,
  Sliders,
  X,
} from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { breakpoints, colors, radii, typography } from "@fenchem-lp/ui/tokens.stylex";
import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";
import {
  certifications,
  company,
  createInquiryHref,
  getFeaturedIngredients,
  getIngredientsByApplication,
  industries,
  ingredients,
  pillars,
  regions,
  type IngredientApplication,
} from "@/components/landing/landing-content";

/* ─────────────────────────────── Simulation Types ─────────────────────────────── */

interface SimulationConfig {
  particleCount: number;
  flowSpeed: number;
  splashIntensity: number;
  gravity: number;
  hue: number;
}
type PresetName = "gentle" | "vibrant" | "torrential";
type SimStats = {
  fps: number;
  particles: number;
};
type SimStatsRef = {
  current: SimStats;
};
const PRESETS: Record<PresetName, SimulationConfig> = {
  gentle: {
    particleCount: 8000,
    flowSpeed: 0.8,
    splashIntensity: 0.6,
    gravity: 6.0,
    hue: 110,
  },
  vibrant: {
    particleCount: 14000,
    flowSpeed: 1.2,
    splashIntensity: 1.1,
    gravity: 9.8,
    hue: 102,
  },
  torrential: {
    particleCount: 22000,
    flowSpeed: 2.0,
    splashIntensity: 1.8,
    gravity: 14.0,
    hue: 95,
  },
};
const PRESET_LABELS: Record<PresetName, string> = {
  gentle: "Gentle Spring",
  vibrant: "Vibrant Cascade",
  torrential: "High Torrent",
};
const MAX_PARTICLES = Math.max(...Object.values(PRESETS).map((p) => p.particleCount));
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
const MENU_APPLICATIONS: readonly IngredientApplication[] = [
  "Nutrition",
  "Food & Beverage",
  "Personal Care",
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
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "oklch(0.18 0.03 134.7)",
    fontFamily: typography.body,
    color: colors.brandGreen50,
    "::selection": {
      backgroundColor: colors.brandGreen400,
      color: colors.brandGreen950,
    },
  },
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-brand-green-900) 40%, transparent)",
    backgroundColor: "color-mix(in oklch, oklch(0.18 0.03 134.7) 85%, transparent)",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 14,
    paddingBottom: 14,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  brandGroup: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  brandTitle: {
    fontFamily: typography.display,
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: colors.paper,
  },
  brandSinceBadge: {
    display: {
      default: "none",
      [breakpoints.sm]: "inline-block",
    },
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-500) 30%, transparent)",
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-950) 60%, transparent)",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    fontFamily: typography.tech,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: colors.brandGreen300,
  },
  navDesktop: {
    display: {
      default: "none",
      [breakpoints.md]: "flex",
    },
    alignItems: "center",
    gap: 24,
  },
  navLink: {
    fontFamily: typography.body,
    fontSize: 14,
    color: "color-mix(in oklch, var(--color-brand-green-200) 80%, transparent)",
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    ":hover": {
      color: colors.paper,
    },
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  inquireSpecBtn: {
    display: {
      default: "none",
      [breakpoints.sm]: "inline-flex",
    },
    alignItems: "center",
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: typography.body,
    fontSize: 12,
    fontWeight: 700,
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    ":hover": {
      backgroundColor: colors.brandGreen400,
    },
  },
  /* Portfolio menu */
  portfolioRoot: {
    position: "relative",
  },
  portfolioBtn: {
    display: "inline-flex",
    minHeight: 44,
    alignItems: "center",
    gap: 6,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: typography.body,
    fontSize: 14,
    color: "color-mix(in oklch, var(--color-brand-green-200) 80%, transparent)",
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "200ms",
    ":hover": {
      color: colors.brandGreen400,
    },
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
  portfolioDropdown: {
    position: "absolute",
    left: "50%",
    top: "100%",
    zIndex: 50,
    marginTop: 8,
    width: 640,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
    backgroundColor: "color-mix(in oklch, oklch(0.21 0.035 134.7) 95%, transparent)",
    padding: 4,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
  },
  portfolioGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 1,
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-900) 30%, transparent)",
    borderRadius: radii.md,
    overflow: "hidden",
  },
  portfolioCol: {
    backgroundColor: "oklch(0.21 0.035 134.7)",
    padding: 20,
  },
  portfolioColTitle: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: typography.tech,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.brandGreen400,
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
    color: colors.brandGreen100,
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    ":hover": {
      color: colors.brandGreen400,
    },
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
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  portfolioFooterCount: {
    fontFamily: typography.tech,
    fontSize: 12,
    color: "color-mix(in oklch, var(--color-brand-green-400) 80%, transparent)",
  },
  portfolioFooterCta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    color: colors.brandGreen400,
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    ":hover": {
      color: colors.brandGreen300,
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
    color: colors.brandGreen200,
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "200ms",
    ":hover": {
      color: colors.paper,
    },
  },
  mobileMenuPopover: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "100%",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
    backgroundColor: "color-mix(in oklch, oklch(0.18 0.03 134.7) 95%, transparent)",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
  },
  mobileMenuList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  mobileNavLink: {
    display: "block",
    fontFamily: typography.body,
    fontSize: 16,
    color: colors.brandGreen100,
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    ":hover": {
      color: colors.brandGreen400,
    },
  },
  /* Hero Canvas & Content */
  heroSection: {
    position: "relative",
    display: "flex",
    minHeight: "92vh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    paddingTop: 80,
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    pointerEvents: "auto",
  },
  canvasHidden: {
    display: "none",
  },
  heroFallbackBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(ellipse at 50% 28%, oklch(from var(--color-brand-green-900) l c h / 0.4) 0%, transparent 55%), radial-gradient(ellipse at 50% 88%, oklch(from var(--color-brand-green-800) l c h / 0.3) 0%, transparent 60%)",
  },
  heroGradientOverlay1: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to top, oklch(0.18 0.03 134.7), transparent, transparent)",
    opacity: 0.9,
  },
  heroGradientOverlay2: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(ellipse at center, oklch(from var(--color-brand-green-900) l c h / 0.18) 0%, transparent 70%)",
  },
  heroContentBox: {
    pointerEvents: "none",
    position: "relative",
    zIndex: 10,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 896,
    paddingLeft: 24,
    paddingRight: 24,
    textAlign: "center",
  },
  heroBadgePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-500) 30%, transparent)",
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-950) 70%, transparent)",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.brandGreen300,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  heroHeading: {
    marginTop: 32,
    fontFamily: typography.display,
    fontSize: {
      default: 48,
      [breakpoints.sm]: 72,
    },
    fontWeight: 300,
    lineHeight: 1.06,
    letterSpacing: "-0.02em",
    color: colors.paper,
    margin: 0,
  },
  heroHeadingItalic: {
    fontStyle: "italic",
    color: colors.brandGreen300,
  },
  heroLead: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 24,
    maxWidth: 576,
    fontFamily: typography.body,
    fontSize: 18,
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-brand-green-100) 80%, transparent)",
    margin: 0,
  },
  heroActions: {
    pointerEvents: "auto",
    marginTop: 32,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  heroPrimaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 14,
    paddingBottom: 14,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 700,
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    ":hover": {
      backgroundColor: colors.brandGreen400,
    },
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  heroSecondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-500) 40%, transparent)",
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-950) 60%, transparent)",
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 14,
    paddingBottom: 14,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 600,
    color: colors.brandGreen200,
    textDecoration: "none",
    transitionProperty: "border-color, background-color",
    transitionDuration: "200ms",
    ":hover": {
      borderColor: colors.brandGreen400,
      backgroundColor: "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
    },
    outline: {
      default: "none",
      ":focus-visible": "2px solid currentColor",
    },
  },
  presetControlBar: {
    pointerEvents: "auto",
    marginTop: 40,
    display: "inline-flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: radii["2xl"],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-800) 50%, transparent)",
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-950) 90%, transparent)",
    padding: 8,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  },
  presetLabel: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.brandGreen400,
  },
  presetBtn: {
    borderRadius: radii.xl,
    borderWidth: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: typography.body,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "200ms",
  },
  presetBtnActive: {
    backgroundColor: colors.brandGreen500,
    color: colors.brandGreen950,
  },
  presetBtnInactive: {
    backgroundColor: "transparent",
    color: colors.brandGreen300,
    ":hover": {
      backgroundColor: "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
    },
  },
  /* Ticker */
  tickerSection: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-900) 40%, transparent)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-brand-green-900) 40%, transparent)",
    backgroundColor: "oklch(0.16 0.025 134.7)",
    paddingTop: 16,
    paddingBottom: 16,
  },
  tickerInner: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    overflow: "hidden",
  },
  tickerBtn: {
    marginLeft: 24,
    display: "inline-flex",
    width: 32,
    height: 32,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-800) 60%, transparent)",
    backgroundColor: "transparent",
    color: colors.brandGreen400,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    ":hover": {
      backgroundColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    },
  },
  tickerTrackWrapper: {
    display: "flex",
    flex: "1 1 0%",
    overflow: "hidden",
  },
  tickerMarqueeTrack: {
    display: "flex",
    width: "max-content",
    flexShrink: 0,
    alignItems: "center",
    animationName: marqueeAnim,
    animationDuration: "40s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  tickerList: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    gap: 32,
    paddingRight: 32,
    listStyle: "none",
    margin: 0,
  },
  tickerItemLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "color-mix(in oklch, var(--color-brand-green-300) 80%, transparent)",
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    ":hover": {
      color: colors.brandGreen400,
    },
  },
  tickerCode: {
    color: colors.brandGreen600,
  },
  tickerName: {
    fontWeight: 600,
    color: colors.paper,
  },
  tickerLatin: {
    fontStyle: "italic",
    color: "color-mix(in oklch, var(--color-brand-green-400) 80%, transparent)",
  },
  tickerDotSep: {
    color: colors.brandGreen800,
  },
  /* Stat Band */
  statBandSection: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-brand-green-900) 40%, transparent)",
    backgroundColor: "oklch(0.18 0.03 134.7)",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 48,
    paddingBottom: 48,
  },
  statBandGrid: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 1152,
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.md]: "repeat(4, 1fr)",
    },
    gap: 24,
  },
  statItem: {
    borderLeftWidth: 2,
    borderLeftStyle: "solid",
    borderLeftColor: "color-mix(in oklch, var(--color-brand-green-500) 50%, transparent)",
    paddingLeft: 20,
  },
  statValue: {
    fontFamily: typography.display,
    fontSize: {
      default: 36,
      [breakpoints.sm]: 48,
    },
    fontWeight: 300,
    letterSpacing: "-0.02em",
    color: colors.paper,
    margin: 0,
  },
  statUnit: {
    marginTop: 4,
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: colors.brandGreen400,
    margin: 0,
  },
  statDesc: {
    marginTop: 4,
    fontFamily: typography.body,
    fontSize: 12,
    color: "color-mix(in oklch, var(--color-brand-green-200) 60%, transparent)",
    margin: 0,
  },
  /* Industries */
  industriesSection: {
    backgroundColor: "oklch(0.18 0.03 134.7)",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 96,
    paddingBottom: 96,
  },
  sectionMaxWidth: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 1152,
  },
  industriesHeaderBox: {
    marginBottom: 56,
  },
  sectionNumLabel: {
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.24em",
    color: colors.brandGreen400,
  },
  sectionHeadingLarge: {
    marginTop: 12,
    fontFamily: typography.display,
    fontSize: {
      default: 30,
      [breakpoints.sm]: 48,
    },
    fontWeight: 300,
    color: colors.paper,
    margin: 0,
  },
  sectionSubLead: {
    marginTop: 16,
    maxWidth: 672,
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-brand-green-200) 70%, transparent)",
    margin: 0,
  },
  industriesGrid: {
    display: "grid",
    gap: 32,
    gridTemplateColumns: {
      default: null,
      [breakpoints.md]: "repeat(3, 1fr)",
    },
  },
  industryCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: radii["2xl"],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    backgroundColor: "color-mix(in oklch, oklch(0.23 0.04 134.7) 60%, transparent)",
    padding: 24,
    textDecoration: "none",
    transitionProperty: "border-color, background-color",
    transitionDuration: "300ms",
    ":hover": {
      borderColor: "color-mix(in oklch, var(--color-brand-green-500) 50%, transparent)",
      backgroundColor: "oklch(0.23 0.04 134.7)",
    },
  },
  industryImgWrapper: {
    position: "relative",
    aspectRatio: "16 / 10",
    overflow: "hidden",
    borderRadius: radii.xl,
    backgroundColor: colors.brandGreen950,
  },
  industryCardImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    transitionProperty: "transform",
    transitionDuration: "500ms",
  },
  industryCardScrim: {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to top, oklch(0.18 0.03 134.7), transparent, transparent)",
  },
  industryDivisionBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklch, oklch(0.18 0.03 134.7) 80%, transparent)",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: typography.tech,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.brandGreen300,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  industryCardTitle: {
    marginTop: 24,
    fontFamily: typography.display,
    fontSize: 24,
    fontWeight: 500,
    color: colors.paper,
    margin: 0,
  },
  industryCardCopy: {
    marginTop: 12,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-brand-green-200) 70%, transparent)",
    margin: 0,
  },
  industryExploreLinkText: {
    marginTop: 24,
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontFamily: typography.tech,
    fontSize: 12,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.brandGreen400,
  },
  /* Matrix Table */
  matrixSection: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    backgroundColor: "oklch(0.16 0.025 134.7)",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 96,
    paddingBottom: 96,
  },
  matrixHeaderRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 24,
    marginBottom: 40,
  },
  matrixHeading: {
    marginTop: 8,
    fontFamily: typography.display,
    fontSize: {
      default: 30,
      [breakpoints.sm]: 36,
    },
    fontWeight: 300,
    color: colors.paper,
    margin: 0,
  },
  matrixFullIndexBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: typography.body,
    fontSize: 12,
    fontWeight: 700,
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    ":hover": {
      backgroundColor: colors.brandGreen400,
    },
  },
  filterToolbar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
    backgroundColor: "oklch(0.21 0.035 134.7)",
    padding: 12,
  },
  tabButtonsGroup: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  filterTabBtn: {
    borderRadius: radii.lg,
    borderWidth: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "200ms",
  },
  filterTabActive: {
    backgroundColor: colors.brandGreen500,
    color: colors.brandGreen950,
    fontWeight: 700,
  },
  filterTabInactive: {
    backgroundColor: "transparent",
    color: "color-mix(in oklch, var(--color-brand-green-300) 80%, transparent)",
    ":hover": {
      backgroundColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
      color: colors.paper,
    },
  },
  searchInputWrapper: {
    position: "relative",
    minWidth: 240,
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: colors.brandGreen500,
  },
  searchInput: {
    width: "100%",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-800) 60%, transparent)",
    backgroundColor: "oklch(0.16 0.025 134.7)",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 36,
    paddingRight: 16,
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.paper,
    outline: {
      default: "none",
      ":focus-visible": `2px solid ${colors.brandGreen400}`,
    },
    "::placeholder": {
      color: colors.brandGreen500,
    },
  },
  matrixTableScroll: {
    marginTop: 24,
    overflowX: "auto",
    borderRadius: radii.xl,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    backgroundColor: "oklch(0.18 0.03 134.7)",
  },
  matrixTable: {
    width: "100%",
    textAlign: "left",
    fontSize: 14,
    borderCollapse: "collapse",
  },
  matrixThead: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-950) 40%, transparent)",
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.brandGreen400,
  },
  matrixTh: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  matrixTr: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-brand-green-900) 40%, transparent)",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    ":hover": {
      backgroundColor: "color-mix(in oklch, var(--color-brand-green-950) 30%, transparent)",
    },
  },
  matrixTd: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  matrixTdCode: {
    fontFamily: typography.tech,
    fontSize: 10,
    color: colors.brandGreen500,
    display: "block",
  },
  matrixTdName: {
    fontWeight: 600,
    color: colors.paper,
  },
  matrixTdLatin: {
    fontFamily: typography.display,
    fontStyle: "italic",
    color: "color-mix(in oklch, var(--color-brand-green-300) 80%, transparent)",
  },
  matrixTdPurity: {
    fontFamily: typography.tech,
    fontSize: 12,
    color: colors.brandGreen200,
  },
  matrixTdForm: {
    fontSize: 12,
    color: "color-mix(in oklch, var(--color-brand-green-300) 70%, transparent)",
  },
  matrixAppPill: {
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: typography.tech,
    fontSize: 10,
    color: colors.brandGreen300,
  },
  matrixReqSpecLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontFamily: typography.tech,
    fontSize: 12,
    fontWeight: 600,
    color: colors.brandGreen400,
    textDecoration: "none",
    ":hover": {
      color: colors.brandGreen300,
    },
  },
  emptySearchBox: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 48,
    paddingBottom: 48,
    textAlign: "center",
  },
  emptySearchText: {
    fontFamily: typography.body,
    fontSize: 14,
    color: "color-mix(in oklch, var(--color-brand-green-200) 80%, transparent)",
  },
  emptyClearBtn: {
    marginTop: 12,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.brandGreen400,
    textDecoration: "underline",
    textUnderlineOffset: 4,
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "200ms",
    ":hover": {
      color: colors.brandGreen300,
    },
  },
  /* Dossier */
  dossierSection: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    backgroundColor: "oklch(0.18 0.03 134.7)",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 96,
    paddingBottom: 96,
  },
  dossierHeaderBox: {
    marginBottom: 48,
  },
  dossierCard: {
    display: "grid",
    gap: 32,
    alignItems: "center",
    borderRadius: radii["2xl"],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
    backgroundColor: "oklch(0.21 0.035 134.7)",
    padding: {
      default: 32,
      [breakpoints.md]: 48,
    },
    gridTemplateColumns: {
      default: null,
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  dossierImgCol: {
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 5 / span 5",
    },
  },
  dossierImgBox: {
    position: "relative",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    borderRadius: radii.xl,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-800) 40%, transparent)",
  },
  dossierImg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  dossierBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    borderRadius: radii.sm,
    backgroundColor: "color-mix(in oklch, oklch(0.18 0.03 134.7) 80%, transparent)",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: typography.tech,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: colors.brandGreen400,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  },
  dossierBodyCol: {
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 7 / span 7",
    },
  },
  dossierCategoryPill: {
    borderRadius: radii.full,
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-500) 20%, transparent)",
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    fontFamily: typography.tech,
    fontSize: 12,
    color: colors.brandGreen400,
  },
  dossierAppLabel: {
    fontFamily: typography.tech,
    fontSize: 12,
    color: colors.brandGreen500,
  },
  dossierTitle: {
    marginTop: 16,
    fontFamily: typography.display,
    fontSize: 30,
    fontWeight: 500,
    color: colors.paper,
    margin: 0,
  },
  dossierLatin: {
    fontFamily: typography.display,
    fontSize: 18,
    fontStyle: "italic",
    color: colors.brandGreen300,
    margin: 0,
  },
  dossierCopy: {
    marginTop: 16,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-brand-green-200) 80%, transparent)",
    margin: 0,
  },
  dossierMetaGrid: {
    marginTop: 24,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    paddingTop: 16,
    paddingBottom: 16,
    fontFamily: typography.tech,
    fontSize: 12,
  },
  dossierMetaLabel: {
    color: colors.brandGreen500,
    display: "block",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  dossierMetaVal: {
    color: colors.paper,
    fontWeight: 600,
  },
  dossierBtnRow: {
    marginTop: 32,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 16,
  },
  dossierReqBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: typography.body,
    fontSize: 12,
    fontWeight: 700,
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    ":hover": {
      backgroundColor: colors.brandGreen400,
    },
  },
  dossierTdsBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-700) 60%, transparent)",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: typography.body,
    fontSize: 12,
    fontWeight: 600,
    color: colors.brandGreen200,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    ":hover": {
      backgroundColor: "color-mix(in oklch, var(--color-brand-green-900) 40%, transparent)",
    },
  },
  /* Formulation Presenter */
  formulationSection: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    backgroundColor: "oklch(0.16 0.025 134.7)",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 96,
    paddingBottom: 96,
  },
  formulationGrid: {
    display: "grid",
    gap: 32,
    gridTemplateColumns: {
      default: null,
      [breakpoints.lg]: "repeat(12, 1fr)",
    },
  },
  formulationControlsBox: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    borderRadius: radii["2xl"],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
    backgroundColor: "oklch(0.21 0.035 134.7)",
    padding: 32,
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 6 / span 6",
    },
  },
  formulationFieldset: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  formulationLegend: {
    display: "block",
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.brandGreen400,
    marginBottom: 12,
  },
  formulationBtnsGrid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
  },
  formulationBtnsGrid4: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.sm]: "repeat(4, 1fr)",
    },
    gap: 8,
  },
  formulationBtnsGrid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 8,
  },
  formulationOptionBtn: {
    borderRadius: radii.lg,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: typography.body,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transitionProperty: "background-color, color, border-color",
    transitionDuration: "200ms",
  },
  formulationOptionActive: {
    borderWidth: 0,
    backgroundColor: colors.brandGreen500,
    color: colors.brandGreen950,
  },
  formulationOptionInactive: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-brand-green-900)",
    backgroundColor: "oklch(0.16 0.025 134.7)",
    color: colors.brandGreen300,
    ":hover": {
      backgroundColor: colors.brandGreen950,
    },
  },
  formulationBriefBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: radii["2xl"],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-800) 60%, transparent)",
    backgroundColor: "oklch(0.26 0.05 134.7)",
    padding: 32,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    gridColumn: {
      default: null,
      [breakpoints.lg]: "span 6 / span 6",
    },
  },
  briefHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "color-mix(in oklch, var(--color-brand-green-800) 50%, transparent)",
    paddingBottom: 16,
  },
  briefLabel: {
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: colors.brandGreen400,
  },
  briefCode: {
    fontFamily: typography.tech,
    fontSize: 12,
    color: "color-mix(in oklch, var(--color-brand-green-300) 70%, transparent)",
  },
  briefSpecsList: {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontFamily: typography.tech,
    fontSize: 12,
  },
  briefSpecRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  briefExtractivesBox: {
    marginTop: 24,
    borderRadius: radii.xl,
    backgroundColor: "color-mix(in oklch, oklch(0.16 0.025 134.7) 80%, transparent)",
    padding: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
  },
  briefExtractivesTitle: {
    fontFamily: typography.tech,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: colors.brandGreen500,
    display: "block",
    marginBottom: 8,
  },
  briefMatchingUl: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.brandGreen200,
  },
  briefSubmitBtn: {
    width: "100%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: radii.xl,
    backgroundColor: colors.brandGreen500,
    paddingTop: 14,
    paddingBottom: 14,
    fontFamily: typography.body,
    fontSize: 14,
    fontWeight: 700,
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    ":hover": {
      backgroundColor: colors.brandGreen400,
    },
  },
  briefFootnote: {
    marginTop: 8,
    textAlign: "center",
    fontFamily: typography.tech,
    fontSize: 11,
    color: colors.brandGreen500,
    margin: 0,
  },
  /* Standards */
  standardsSection: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    backgroundColor: "oklch(0.18 0.03 134.7)",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 96,
    paddingBottom: 96,
  },
  standardsHeaderBox: {
    marginBottom: 64,
    textAlign: "center",
  },
  pillarsGrid: {
    display: "grid",
    gap: 32,
    gridTemplateColumns: {
      default: null,
      [breakpoints.md]: "repeat(3, 1fr)",
    },
  },
  pillarCard: {
    borderRadius: radii["2xl"],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    backgroundColor: "oklch(0.21 0.035 134.7)",
    padding: 32,
  },
  pillarTitle: {
    fontFamily: typography.display,
    fontSize: 20,
    fontWeight: 500,
    color: colors.paper,
    margin: 0,
  },
  pillarCopy: {
    marginTop: 12,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-brand-green-200) 70%, transparent)",
    margin: 0,
  },
  certsBox: {
    marginTop: 64,
    borderRadius: radii["2xl"],
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-900) 60%, transparent)",
    backgroundColor: "oklch(0.16 0.025 134.7)",
    padding: 32,
    textAlign: "center",
  },
  certsTitle: {
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: colors.brandGreen400,
  },
  certsCloud: {
    marginTop: 24,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  certPill: {
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-800) 60%, transparent)",
    backgroundColor: "color-mix(in oklch, var(--color-brand-green-950) 60%, transparent)",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: typography.tech,
    fontSize: 12,
    fontWeight: 600,
    color: colors.brandGreen200,
  },
  basesSection: {
    marginTop: 64,
  },
  basesTitle: {
    fontFamily: typography.tech,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: colors.brandGreen400,
    display: "block",
    marginBottom: 24,
    textAlign: "center",
  },
  basesGrid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [breakpoints.md]: "repeat(3, 1fr)",
      [breakpoints.lg]: "repeat(6, 1fr)",
    },
  },
  baseCard: {
    borderRadius: radii.xl,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    backgroundColor: "oklch(0.21 0.035 134.7)",
    padding: 16,
    textAlign: "center",
  },
  baseCity: {
    fontFamily: typography.display,
    fontSize: 16,
    fontWeight: 600,
    color: colors.paper,
    margin: 0,
  },
  baseCountry: {
    fontSize: 12,
    color: "color-mix(in oklch, var(--color-brand-green-400) 80%, transparent)",
    margin: 0,
  },
  baseRole: {
    marginTop: 8,
    display: "block",
    fontFamily: typography.tech,
    fontSize: 10,
    color: colors.brandGreen500,
  },
  /* Finale & Footer */
  finaleFooter: {
    position: "relative",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-900) 70%, transparent)",
    backgroundColor: "oklch(0.15 0.02 134.7)",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 96,
    paddingBottom: 96,
    textAlign: "center",
  },
  finaleInner: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 768,
  },
  finaleTitle: {
    marginTop: 16,
    fontFamily: typography.display,
    fontSize: {
      default: 36,
      [breakpoints.sm]: 48,
    },
    fontWeight: 300,
    color: colors.paper,
    margin: 0,
  },
  finaleLead: {
    marginTop: 16,
    fontFamily: typography.body,
    fontSize: 16,
    lineHeight: 1.625,
    color: "color-mix(in oklch, var(--color-brand-green-200) 80%, transparent)",
    margin: 0,
  },
  finaleCtaBox: {
    marginTop: 32,
    display: "flex",
    justifyContent: "center",
  },
  finaleSubmitBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen500,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    fontFamily: typography.body,
    fontSize: 16,
    fontWeight: 700,
    color: colors.brandGreen950,
    textDecoration: "none",
    transitionProperty: "background-color",
    transitionDuration: "200ms",
    ":hover": {
      backgroundColor: colors.brandGreen400,
    },
  },
  finaleBottomBar: {
    marginTop: 64,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "color-mix(in oklch, var(--color-brand-green-900) 50%, transparent)",
    paddingTop: 40,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    fontFamily: typography.tech,
    fontSize: 12,
    color: colors.brandGreen600,
  },
  footerLinksRow: {
    display: "flex",
    gap: 24,
  },
  footerLink: {
    color: "inherit",
    textDecoration: "none",
    ":hover": {
      color: colors.brandGreen400,
    },
  },
  /* Sim stats badge */
  simStatsBadge: {
    display: {
      default: "none",
      [breakpoints.lg]: "flex",
    },
    alignItems: "center",
    gap: 8,
    fontFamily: typography.tech,
    fontSize: 12,
    color: "color-mix(in oklch, var(--color-brand-green-400) 80%, transparent)",
  },
  simStatsPulseDot: {
    display: "inline-block",
    height: 8,
    width: 8,
    borderRadius: radii.full,
    backgroundColor: colors.brandGreen400,
    animationName: pulseAnim,
    animationDuration: "2s",
    animationIterationCount: "infinite",
  },
  simStatsSep: {
    color: colors.brandGreen700,
  },
});

/* ─────────────────────────────── Navigation ─────────────────────────────── */

function PortfolioMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();
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
      {...stylex.props(styles.portfolioRoot)}
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
        {...stylex.props(styles.portfolioBtn)}
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
            {...stylex.props(styles.portfolioDropdown)}
          >
            <div {...stylex.props(styles.portfolioGrid)}>
              {MENU_APPLICATIONS.map((application) => {
                const items = getIngredientsByApplication(application).slice(0, 4);
                return (
                  <div key={application} {...stylex.props(styles.portfolioCol)}>
                    <p {...stylex.props(styles.portfolioColTitle)}>
                      <span
                        aria-hidden
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 9999,
                          backgroundColor:
                            application === "Nutrition"
                              ? colors.nutrition
                              : application === "Food & Beverage"
                                ? colors.food
                                : colors.cosmetics,
                        }}
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
              <span {...stylex.props(styles.portfolioFooterCount)}>
                {ingredients.length} active compounds
              </span>
              <a
                href="#formulation"
                onClick={() => setOpen(false)}
                {...stylex.props(styles.portfolioFooterCta)}
              >
                Build formulation <ArrowRight aria-hidden size={14} />
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
      label: "Dossier",
      href: "#dossier",
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
      label: "Contact",
      href: "#contact",
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
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.25,
            }}
            transition={
              reduce
                ? {
                    duration: 0,
                  }
                : {
                    duration: 0.2,
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
            initial={{
              opacity: 0,
              y: -6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -4,
            }}
            {...stylex.props(styles.mobileMenuPopover)}
          >
            <ul {...stylex.props(styles.mobileMenuList)}>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    {...stylex.props(styles.mobileNavLink)}
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

/* ─────────────────────────────── Three.js Waterfall Hero ─────────────────────────────── */

function WaterfallHeroCanvas({
  config,
  statsRef,
  preset,
  applyPreset,
}: {
  config: SimulationConfig;
  statsRef: SimStatsRef;
  preset: PresetName;
  applyPreset: (p: PresetName) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const configRef = useRef(config);
  const applyLookRef = useRef<(cfg: SimulationConfig) => void>(() => {});
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    configRef.current = config;
    applyLookRef.current(config);
  }, [config]);
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d140a, 0.025);
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 4, 18);
    camera.lookAt(0, 1, 0);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    } catch {
      setFailed(true);
      return;
    }
    const count = MAX_PARTICLES;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const lifetimes = new Float32Array(count);
    const maxLifetimes = new Float32Array(count);
    const colorsArr = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colorMixes = new Float32Array(count);
    const topWidth = 8.0;
    const topDepth = 2.0;
    const topY = 9.0;
    const basinY = -5.0;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * topWidth;
      positions[i3 + 1] = topY - Math.random() * 2.0;
      positions[i3 + 2] = (Math.random() - 0.5) * topDepth;
      velocities[i3] = (Math.random() - 0.5) * 0.4;
      velocities[i3 + 1] = -Math.random() * 2.0 - 1.0;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.4;
      lifetimes[i] = Math.random() * 3.0;
      maxLifetimes[i] = 2.5 + Math.random() * 1.5;
      colorMixes[i] = Math.random();
      sizes[i] = Math.random() * 3.5 + 1.5;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colorsArr, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setDrawRange(0, configRef.current.particleCount);
    const recolor = (hue: number) => {
      const colorBase = new THREE.Color(`hsl(${hue}, 85%, 65%)`);
      const colorFoam = new THREE.Color(0xf2fae8);
      const colorDeep = new THREE.Color(`hsl(${hue + 14}, 75%, 32%)`);
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const mix = colorMixes[i];
        const col = mix > 0.8 ? colorFoam : mix > 0.3 ? colorBase : colorDeep;
        colorsArr[i3] = col.r;
        colorsArr[i3 + 1] = col.g;
        colorsArr[i3 + 2] = col.b;
      }
      geometry.attributes.color.needsUpdate = true;
    };
    recolor(configRef.current.hue);
    const material = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    const basinGeo = new THREE.CylinderGeometry(10, 10, 0.4, 32);
    const basinMat = new THREE.MeshBasicMaterial({
      color: 0x2f4a15,
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    });
    const basinMesh = new THREE.Mesh(basinGeo, basinMat);
    basinMesh.position.y = basinY;
    scene.add(basinMesh);
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 4;
      targetY = -y * 3;
    };
    window.addEventListener("mousemove", handleMouseMove);
    const step = (delta: number, time: number) => {
      const cfg = configRef.current;
      const active = Math.min(cfg.particleCount, count);
      const grav = cfg.gravity * cfg.flowSpeed;
      const pos = positions;
      const vel = velocities;
      basinMesh.rotation.y += 0.003;
      for (let i = 0; i < active; i++) {
        const i3 = i * 3;
        lifetimes[i] += delta;
        vel[i3 + 1] -= grav * 0.4 * delta;
        pos[i3] += vel[i3] * delta * 4.0;
        pos[i3 + 1] += vel[i3 + 1] * delta * 4.0;
        pos[i3 + 2] += vel[i3 + 2] * delta * 4.0;
        const progress = (topY - pos[i3 + 1]) / (topY - basinY);
        pos[i3] += Math.sin(time * 0.003 + pos[i3 + 1] * 2.0) * 0.02 * (1 - progress);
        if (pos[i3 + 1] <= basinY) {
          pos[i3 + 1] = basinY;
          const angle = Math.random() * Math.PI * 2;
          const speed = (Math.random() * 2.5 + 1.0) * cfg.splashIntensity;
          vel[i3] = Math.cos(angle) * speed;
          vel[i3 + 1] = (Math.random() * 4.0 + 2.5) * cfg.splashIntensity;
          vel[i3 + 2] = Math.sin(angle) * speed;
          if (Math.random() > 0.8) {
            lifetimes[i] = maxLifetimes[i] * 0.9;
          }
        }
        if (lifetimes[i] >= maxLifetimes[i] || pos[i3 + 1] < basinY - 2) {
          lifetimes[i] = 0;
          pos[i3] = (Math.random() - 0.5) * topWidth;
          pos[i3 + 1] = topY + (Math.random() - 0.5) * 0.8;
          pos[i3 + 2] = (Math.random() - 0.5) * topDepth;
          vel[i3] = (Math.random() - 0.5) * 0.2;
          vel[i3 + 1] = -Math.random() * 1.5 - 0.5;
          vel[i3 + 2] = (Math.random() - 0.5) * 0.2;
        }
      }
      geometry.attributes.position.needsUpdate = true;
    };
    let raf: number | null = null;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = 0;
    const animate = (time: number) => {
      raf = requestAnimationFrame(animate);
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      frameCount++;
      fpsTimer += delta;
      if (fpsTimer >= 0.5) {
        statsRef.current = {
          fps: Math.round(frameCount / fpsTimer),
          particles: configRef.current.particleCount,
        };
        frameCount = 0;
        fpsTimer = 0;
      }
      if (geometry.drawRange.count !== configRef.current.particleCount) {
        geometry.setDrawRange(0, configRef.current.particleCount);
      }
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX * 2;
      camera.position.y = 4 + mouseY * 1.5;
      camera.lookAt(0, 0.5, 0);
      step(delta, time);
      renderer.render(scene, camera);
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = () => {
      if (raf !== null || reduce) return;
      lastTime = performance.now();
      raf = requestAnimationFrame(animate);
    };
    const stop = () => {
      if (raf === null) return;
      cancelAnimationFrame(raf);
      raf = null;
    };
    const renderStill = () => {
      for (let s = 0; s < 240; s++) step(1 / 60, s * (1000 / 60));
      renderer.render(scene, camera);
      statsRef.current = {
        fps: 0,
        particles: configRef.current.particleCount,
      };
    };
    applyLookRef.current = (cfg) => {
      geometry.setDrawRange(0, cfg.particleCount);
      recolor(cfg.hue);
      if (reduce) renderStill();
    };
    statsRef.current = {
      fps: 0,
      particles: configRef.current.particleCount,
    };
    if (reduce) renderStill();
    const handleResize = () => {
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      if (raf === null) renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      {
        threshold: 0.05,
      },
    );
    observer.observe(container);
    const onContextLost = (event: Event) => {
      event.preventDefault();
      stop();
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    return () => {
      stop();
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      applyLookRef.current = () => {};
      geometry.dispose();
      material.dispose();
      basinGeo.dispose();
      basinMat.dispose();
      renderer.dispose();
    };
  }, [statsRef]);
  return (
    <section ref={containerRef} {...stylex.props(styles.heroSection)}>
      <canvas
        ref={canvasRef}
        aria-hidden
        {...stylex.props(styles.canvas, failed && styles.canvasHidden)}
      />
      {failed && <div aria-hidden {...stylex.props(styles.heroFallbackBg)} />}
      <div aria-hidden {...stylex.props(styles.heroGradientOverlay1)} />
      <div aria-hidden {...stylex.props(styles.heroGradientOverlay2)} />

      <div {...stylex.props(styles.heroContentBox)}>
        <div {...stylex.props(styles.heroBadgePill)}>
          <Droplets size={14} color={colors.brandGreen400} />
          Continuous Botanical Extraction Flow
        </div>

        <h1 {...stylex.props(styles.heroHeading)}>
          Fluid Vitality, <br />
          <span {...stylex.props(styles.heroHeadingItalic)}>Refined by Botanical Science.</span>
        </h1>

        <p {...stylex.props(styles.heroLead)}>
          Fenchem converts raw botanical complexity into precisely specified, clinically validated
          actives — supplied at industrial scale to formulators in more than forty countries.
        </p>

        <div {...stylex.props(styles.heroActions)}>
          <a href="#matrix" {...stylex.props(styles.heroPrimaryBtn)}>
            Explore Portfolio
            <ArrowRight size={16} />
          </a>
          <a href="#formulation" {...stylex.props(styles.heroSecondaryBtn)}>
            Build Formulation
          </a>
        </div>

        {/* Preset Controls */}
        <div {...stylex.props(styles.presetControlBar)}>
          <span {...stylex.props(styles.presetLabel)}>
            <Sliders aria-hidden size={14} /> Fluid Preset:
          </span>
          {(Object.keys(PRESETS) as PresetName[]).map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={preset === name}
              onClick={() => applyPreset(name)}
              {...stylex.props(
                styles.presetBtn,
                preset === name ? styles.presetBtnActive : styles.presetBtnInactive,
              )}
            >
              {PRESET_LABELS[name]}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Marquee Ticker ─────────────────────────────── */

function TickerSection() {
  const [paused, setPaused] = useState(false);
  const featured = getFeaturedIngredients();
  return (
    <section aria-label="Featured compounds ticker" {...stylex.props(styles.tickerSection)}>
      <div {...stylex.props(styles.tickerInner)}>
        <button
          type="button"
          aria-label={paused ? "Resume marquee" : "Pause marquee"}
          onClick={() => setPaused((v) => !v)}
          {...stylex.props(styles.tickerBtn)}
        >
          {paused ? (
            <Play
              size={14}
              style={{
                marginLeft: 2,
              }}
            />
          ) : (
            <Pause size={14} />
          )}
        </button>
        <div {...stylex.props(styles.tickerTrackWrapper)}>
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
                {featured.map((item) => (
                  <li key={item.code}>
                    <a
                      href="#matrix"
                      tabIndex={copy === 1 ? -1 : undefined}
                      {...stylex.props(styles.tickerItemLink)}
                    >
                      <span {...stylex.props(styles.tickerCode)}>{item.code}</span>
                      <span {...stylex.props(styles.tickerName)}>{item.name}</span>
                      <span {...stylex.props(styles.tickerLatin)}>({item.latin})</span>
                      <span aria-hidden {...stylex.props(styles.tickerDotSep)}>
                        ·
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Stat Band ─────────────────────────────── */

function StatBand() {
  return (
    <section aria-label="Key statistics" {...stylex.props(styles.statBandSection)}>
      <div {...stylex.props(styles.statBandGrid)}>
        {STATS.map((st) => (
          <div key={st.unit} {...stylex.props(styles.statItem)}>
            <p {...stylex.props(styles.statValue)}>{st.value}</p>
            <p {...stylex.props(styles.statUnit)}>{st.unit}</p>
            <p {...stylex.props(styles.statDesc)}>{st.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────── Industries ─────────────────────────────── */

function IndustriesSection() {
  return (
    <section id="industries" {...stylex.props(styles.industriesSection)}>
      <div {...stylex.props(styles.sectionMaxWidth)}>
        <div {...stylex.props(styles.industriesHeaderBox)}>
          <span {...stylex.props(styles.sectionNumLabel)}>01 — Application Domains</span>
          <h2 {...stylex.props(styles.sectionHeadingLarge)}>Built for Three Core Industries</h2>
          <p {...stylex.props(styles.sectionSubLead)}>
            Clinically supported bioactives standardized for potency, dose accuracy and clean-label
            formulation.
          </p>
        </div>

        <div {...stylex.props(styles.industriesGrid)}>
          {industries.map((ind, i) => (
            <a key={ind.title} href="#matrix" {...stylex.props(styles.industryCard)}>
              <div {...stylex.props(styles.industryImgWrapper)}>
                <img
                  src={ind.image.src}
                  alt={ind.image.alt}
                  loading="lazy"
                  {...stylex.props(styles.industryCardImg)}
                />
                <div aria-hidden {...stylex.props(styles.industryCardScrim)} />
                <span {...stylex.props(styles.industryDivisionBadge)}>0{i + 1} Division</span>
              </div>
              <h3 {...stylex.props(styles.industryCardTitle)}>{ind.title}</h3>
              <p {...stylex.props(styles.industryCardCopy)}>{ind.copy}</p>
              <div {...stylex.props(styles.industryExploreLinkText)}>
                Explore Ingredients <ArrowRight size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Matrix Table ─────────────────────────────── */

function MatrixSection() {
  const [filter, setFilter] = useState<"All" | IngredientApplication>("All");
  const [search, setSearch] = useState("");
  const filtered = ingredients.filter((item) => {
    const matchesTab = filter === "All" || item.application === filter;
    const matchesQuery =
      search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.latin.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesQuery;
  });
  return (
    <section id="matrix" {...stylex.props(styles.matrixSection)}>
      <div {...stylex.props(styles.sectionMaxWidth)}>
        <div {...stylex.props(styles.matrixHeaderRow)}>
          <div>
            <span {...stylex.props(styles.sectionNumLabel)}>02 — Active Compounds</span>
            <h2 {...stylex.props(styles.matrixHeading)}>Standardized Ingredient Matrix</h2>
          </div>
          <a
            href={createInquiryHref("Full Portfolio Spec Request")}
            {...stylex.props(styles.matrixFullIndexBtn)}
          >
            Request Full Index <ArrowRight size={14} />
          </a>
        </div>

        {/* Filter Toolbar */}
        <div {...stylex.props(styles.filterToolbar)}>
          <div {...stylex.props(styles.tabButtonsGroup)}>
            {(["All", "Nutrition", "Food & Beverage", "Personal Care"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                {...stylex.props(
                  styles.filterTabBtn,
                  filter === tab ? styles.filterTabActive : styles.filterTabInactive,
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div {...stylex.props(styles.searchInputWrapper)}>
            <Search aria-hidden size={16} {...stylex.props(styles.searchIcon)} />
            <input
              type="text"
              aria-label="Search actives by name, source, or code"
              placeholder="Search active or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              {...stylex.props(styles.searchInput)}
            />
          </div>
        </div>

        {/* Table */}
        <div {...stylex.props(styles.matrixTableScroll)}>
          <table {...stylex.props(styles.matrixTable)}>
            <thead {...stylex.props(styles.matrixThead)}>
              <tr>
                <th {...stylex.props(styles.matrixTh)}>Compound</th>
                <th {...stylex.props(styles.matrixTh)}>Botanical Source</th>
                <th {...stylex.props(styles.matrixTh)}>Standardized Assay</th>
                <th {...stylex.props(styles.matrixTh)}>Physical Form</th>
                <th {...stylex.props(styles.matrixTh)}>Application</th>
                <th
                  style={{
                    textAlign: "right",
                  }}
                  {...stylex.props(styles.matrixTh)}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.code} {...stylex.props(styles.matrixTr)}>
                  <td {...stylex.props(styles.matrixTd)}>
                    <span {...stylex.props(styles.matrixTdCode)}>{item.code}</span>
                    <span {...stylex.props(styles.matrixTdName)}>{item.name}</span>
                  </td>
                  <td {...stylex.props(styles.matrixTd, styles.matrixTdLatin)}>{item.latin}</td>
                  <td {...stylex.props(styles.matrixTd, styles.matrixTdPurity)}>{item.purity}</td>
                  <td {...stylex.props(styles.matrixTd, styles.matrixTdForm)}>{item.form}</td>
                  <td {...stylex.props(styles.matrixTd)}>
                    <span {...stylex.props(styles.matrixAppPill)}>{item.application}</span>
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                    }}
                    {...stylex.props(styles.matrixTd)}
                  >
                    <a
                      href={createInquiryHref(`Spec Request: ${item.name} (${item.code})`)}
                      {...stylex.props(styles.matrixReqSpecLink)}
                    >
                      Request Spec <ArrowUpRight size={12} />
                    </a>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} {...stylex.props(styles.emptySearchBox)}>
                    <p {...stylex.props(styles.emptySearchText)}>
                      No actives match{search ? ` "${search}"` : " this filter"}.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setFilter("All");
                      }}
                      {...stylex.props(styles.emptyClearBtn)}
                    >
                      Clear search &amp; filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Product Dossier ─────────────────────────────── */

function DossierSection() {
  const ashwa = ingredients.find((i) => i.code === "FN-014") || ingredients[0];
  return (
    <section id="dossier" {...stylex.props(styles.dossierSection)}>
      <div {...stylex.props(styles.sectionMaxWidth)}>
        <div {...stylex.props(styles.dossierHeaderBox)}>
          <span {...stylex.props(styles.sectionNumLabel)}>03 — Analytical Dossier</span>
          <h2 {...stylex.props(styles.matrixHeading)}>One Active, Documented to the Lot</h2>
          <p {...stylex.props(styles.sectionSubLead)}>
            Every compound in our matrix ships with exhaustive identity, chromatographic purity, and
            heavy metal testing panels.
          </p>
        </div>

        <div {...stylex.props(styles.dossierCard)}>
          <div {...stylex.props(styles.dossierImgCol)}>
            <div {...stylex.props(styles.dossierImgBox)}>
              <img
                src={ashwa.image.src}
                alt={ashwa.image.alt}
                loading="lazy"
                {...stylex.props(styles.dossierImg)}
              />
              <div {...stylex.props(styles.dossierBadge)}>{ashwa.code} Analytical Reference</div>
            </div>
          </div>

          <div {...stylex.props(styles.dossierBodyCol)}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span {...stylex.props(styles.dossierCategoryPill)}>{ashwa.category}</span>
              <span {...stylex.props(styles.dossierAppLabel)}>{ashwa.application}</span>
            </div>

            <h3 {...stylex.props(styles.dossierTitle)}>{ashwa.name}</h3>
            <p {...stylex.props(styles.dossierLatin)}>{ashwa.latin}</p>

            <p {...stylex.props(styles.dossierCopy)}>
              A clinically studied, root-only adaptogenic extract standardized to ≥ 5% withanolides
              by HPLC. Certified Kosher, Halal, Non-GMO, and verified compliant with USP/EP
              monograph parameters.
            </p>

            <div {...stylex.props(styles.dossierMetaGrid)}>
              <div>
                <span {...stylex.props(styles.dossierMetaLabel)}>Assay / Purity</span>
                <span {...stylex.props(styles.dossierMetaVal)}>{ashwa.purity}</span>
              </div>
              <div>
                <span {...stylex.props(styles.dossierMetaLabel)}>Physical Form</span>
                <span {...stylex.props(styles.dossierMetaVal)}>{ashwa.form}</span>
              </div>
              <div>
                <span {...stylex.props(styles.dossierMetaLabel)}>Shelf Life</span>
                <span {...stylex.props(styles.dossierMetaVal)}>24 Months Sealed</span>
              </div>
              <div>
                <span {...stylex.props(styles.dossierMetaLabel)}>Origin Base</span>
                <span {...stylex.props(styles.dossierMetaVal)}>Nanjing R&amp;D Hub</span>
              </div>
            </div>

            <div {...stylex.props(styles.dossierBtnRow)}>
              <a
                href={createInquiryHref("Ashwagandha KSM-66 Technical Dossier")}
                {...stylex.props(styles.dossierReqBtn)}
              >
                Request Spec Dossier <ArrowRight size={14} />
              </a>
              <a
                href={createInquiryHref("Ashwagandha KSM-66 Technical Data Sheet (TDS)")}
                {...stylex.props(styles.dossierTdsBtn)}
              >
                <FileDown aria-hidden size={14} /> Request TDS Summary
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Formulation Presenter ─────────────────────────────── */

function FormulationPresenter() {
  const [app, setApp] = useState<IngredientApplication>("Nutrition");
  const [format, setFormat] = useState("Beadlet");
  const [standard, setStandard] = useState("ISO 9001 + GMP");
  const matching = getIngredientsByApplication(app);
  return (
    <section id="formulation" {...stylex.props(styles.formulationSection)}>
      <div {...stylex.props(styles.sectionMaxWidth)}>
        <div {...stylex.props(styles.industriesHeaderBox)}>
          <span {...stylex.props(styles.sectionNumLabel)}>04 — Live Formulation Tool</span>
          <h2 {...stylex.props(styles.matrixHeading)}>Engineer Your Target Specification</h2>
          <p {...stylex.props(styles.sectionSubLead)}>
            Select your product parameters — our lab matches active compounds and returns a
            validated proposal within one business day.
          </p>
        </div>

        <div {...stylex.props(styles.formulationGrid)}>
          {/* Controls */}
          <div {...stylex.props(styles.formulationControlsBox)}>
            <fieldset {...stylex.props(styles.formulationFieldset)}>
              <legend {...stylex.props(styles.formulationLegend)}>1. Target Application</legend>
              <div {...stylex.props(styles.formulationBtnsGrid3)}>
                {MENU_APPLICATIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setApp(opt)}
                    {...stylex.props(
                      styles.formulationOptionBtn,
                      app === opt
                        ? styles.formulationOptionActive
                        : styles.formulationOptionInactive,
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset {...stylex.props(styles.formulationFieldset)}>
              <legend {...stylex.props(styles.formulationLegend)}>2. Delivery Format</legend>
              <div {...stylex.props(styles.formulationBtnsGrid4)}>
                {["Powder", "Beadlet", "Oil Suspension", "Granular"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormat(opt)}
                    {...stylex.props(
                      styles.formulationOptionBtn,
                      format === opt
                        ? styles.formulationOptionActive
                        : styles.formulationOptionInactive,
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset {...stylex.props(styles.formulationFieldset)}>
              <legend {...stylex.props(styles.formulationLegend)}>
                3. Regulatory Certification
              </legend>
              <div {...stylex.props(styles.formulationBtnsGrid2)}>
                {["ISO 9001 + GMP", "FSSC 22000 + HACCP", "Kosher + Halal", "USP Monograph"].map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setStandard(opt)}
                      {...stylex.props(
                        styles.formulationOptionBtn,
                        standard === opt
                          ? styles.formulationOptionActive
                          : styles.formulationOptionInactive,
                      )}
                    >
                      {opt}
                    </button>
                  ),
                )}
              </div>
            </fieldset>
          </div>

          {/* Generated Brief */}
          <div {...stylex.props(styles.formulationBriefBox)}>
            <div>
              <div {...stylex.props(styles.briefHeaderRow)}>
                <span {...stylex.props(styles.briefLabel)}>Live Formulation Brief</span>
                <span {...stylex.props(styles.briefCode)}>FN-SPEC-2026</span>
              </div>

              <div {...stylex.props(styles.briefSpecsList)}>
                <div {...stylex.props(styles.briefSpecRow)}>
                  <span
                    style={{
                      color: colors.brandGreen500,
                    }}
                  >
                    Domain:
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: colors.paper,
                    }}
                  >
                    {app}
                  </span>
                </div>
                <div {...stylex.props(styles.briefSpecRow)}>
                  <span
                    style={{
                      color: colors.brandGreen500,
                    }}
                  >
                    Format:
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: colors.paper,
                    }}
                  >
                    {format}
                  </span>
                </div>
                <div {...stylex.props(styles.briefSpecRow)}>
                  <span
                    style={{
                      color: colors.brandGreen500,
                    }}
                  >
                    Standard:
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: colors.paper,
                    }}
                  >
                    {standard}
                  </span>
                </div>
                <div {...stylex.props(styles.briefSpecRow)}>
                  <span
                    style={{
                      color: colors.brandGreen500,
                    }}
                  >
                    Matching Actives:
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: colors.brandGreen400,
                    }}
                  >
                    {matching.length} compounds
                  </span>
                </div>
              </div>

              <div {...stylex.props(styles.briefExtractivesBox)}>
                <span {...stylex.props(styles.briefExtractivesTitle)}>
                  Matching Portfolio Extractives:
                </span>
                <ul {...stylex.props(styles.briefMatchingUl)}>
                  {matching.map((m) => (
                    <li
                      key={m.code}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <CheckCircle2
                        size={12}
                        color={colors.brandGreen400}
                        style={{
                          flexShrink: 0,
                        }}
                      />
                      <span>{m.name}</span>
                      <span
                        style={{
                          fontStyle: "italic",
                          color:
                            "color-mix(in oklch, var(--color-brand-green-400) 80%, transparent)",
                        }}
                      >
                        ({m.purity})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              style={{
                marginTop: 32,
              }}
            >
              <a
                href={createInquiryHref(`Formulation Spec: ${app} | ${format} | ${standard}`)}
                {...stylex.props(styles.briefSubmitBtn)}
              >
                Submit This Specification <ArrowRight size={16} />
              </a>
              <p {...stylex.props(styles.briefFootnote)}>
                Validated response &amp; analytical certificate within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Origin & Standards ─────────────────────────────── */

function StandardsSection() {
  return (
    <section id="standards" {...stylex.props(styles.standardsSection)}>
      <div {...stylex.props(styles.sectionMaxWidth)}>
        <div {...stylex.props(styles.standardsHeaderBox)}>
          <span {...stylex.props(styles.sectionNumLabel)}>05 — Quality &amp; Compliance</span>
          <h2 {...stylex.props(styles.sectionHeadingLarge)}>Documented Science-Backed Standards</h2>
        </div>

        {/* Pillars */}
        <div {...stylex.props(styles.pillarsGrid)}>
          {pillars.map((p) => (
            <div key={p.title} {...stylex.props(styles.pillarCard)}>
              <h3 {...stylex.props(styles.pillarTitle)}>{p.title}</h3>
              <p {...stylex.props(styles.pillarCopy)}>{p.copy}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div {...stylex.props(styles.certsBox)}>
          <span {...stylex.props(styles.certsTitle)}>
            Audited Quality Management Certifications
          </span>
          <div {...stylex.props(styles.certsCloud)}>
            {certifications.map((cert) => (
              <span key={cert} {...stylex.props(styles.certPill)}>
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* 6 Global Bases */}
        <div {...stylex.props(styles.basesSection)}>
          <span {...stylex.props(styles.basesTitle)}>Six Global Operating Bases</span>
          <div {...stylex.props(styles.basesGrid)}>
            {regions.map((reg) => (
              <div key={reg.city} {...stylex.props(styles.baseCard)}>
                <Globe
                  size={16}
                  color={colors.brandGreen400}
                  style={{
                    margin: "0 auto 8px auto",
                    display: "block",
                  }}
                />
                <h4 {...stylex.props(styles.baseCity)}>{reg.city}</h4>
                <p {...stylex.props(styles.baseCountry)}>{reg.country}</p>
                <span {...stylex.props(styles.baseRole)}>{reg.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Finale & Footer ─────────────────────────────── */

function FinaleSection() {
  return (
    <footer id="contact" {...stylex.props(styles.finaleFooter)}>
      <div {...stylex.props(styles.finaleInner)}>
        <span {...stylex.props(styles.sectionNumLabel)}>Partner with Fenchem</span>
        <h2 {...stylex.props(styles.finaleTitle)}>
          Your Next Formulation, Engineered to Specification.
        </h2>
        <p {...stylex.props(styles.finaleLead)}>
          Send a target specification — purity, delivery format, matrix, regulatory map — and our
          laboratory returns a validated proposal with complete documentation within one business
          day.
        </p>

        <div {...stylex.props(styles.finaleCtaBox)}>
          <a
            href={createInquiryHref("Botanical Fountain Partnership Inquiry")}
            {...stylex.props(styles.finaleSubmitBtn)}
          >
            Submit Specification Inquiry
            <ArrowRight size={16} />
          </a>
        </div>

        <div {...stylex.props(styles.finaleBottomBar)}>
          <span>
            © {new Date().getFullYear()} {company.name} — Botanical Intelligence Since 1995.
          </span>
          <div {...stylex.props(styles.footerLinksRow)}>
            <a href="#industries" {...stylex.props(styles.footerLink)}>
              Industries
            </a>
            <a href="#matrix" {...stylex.props(styles.footerLink)}>
              Portfolio
            </a>
            <a href="#standards" {...stylex.props(styles.footerLink)}>
              Compliance
            </a>
            <a href="mailto:sales@fenchem.com" {...stylex.props(styles.footerLink)}>
              sales@fenchem.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── Root Export ─────────────────────────────── */

function SimStatsBadge({ statsRef }: { statsRef: SimStatsRef }) {
  const [stats, setStats] = useState<SimStats>({
    fps: 0,
    particles: 0,
  });
  useEffect(() => {
    const id = window.setInterval(
      () =>
        setStats({
          ...statsRef.current,
        }),
      600,
    );
    return () => window.clearInterval(id);
  }, [statsRef]);
  return (
    <div {...stylex.props(styles.simStatsBadge)}>
      <span aria-hidden {...stylex.props(styles.simStatsPulseDot)} />
      <span>{stats.fps > 0 ? `${stats.fps} FPS` : "STILL"}</span>
      <span aria-hidden {...stylex.props(styles.simStatsSep)}>
        |
      </span>
      <span>{stats.particles > 0 ? `${stats.particles.toLocaleString()} PARTICLES` : "—"}</span>
    </div>
  );
}
export function VariantWaterfall() {
  const [config, setConfig] = useState<SimulationConfig>(PRESETS.vibrant);
  const [preset, setPreset] = useState<PresetName>("vibrant");
  const statsRef = useRef<SimStats>({
    fps: 0,
    particles: 0,
  });
  const applyPreset = (name: PresetName) => {
    setPreset(name);
    setConfig(PRESETS[name]);
  };
  return (
    <LazyMotion features={domAnimation} strict>
      <div {...stylex.props(styles.root)}>
        {/* Sticky Header */}
        <header {...stylex.props(styles.header)}>
          <div {...stylex.props(styles.headerLeft)}>
            <div {...stylex.props(styles.brandGroup)}>
              <span {...stylex.props(styles.brandTitle)}>FENCHEM</span>
              <span {...stylex.props(styles.brandSinceBadge)}>Since 1995</span>
            </div>
            <nav {...stylex.props(styles.navDesktop)}>
              <PortfolioMenu />
              <a href="#industries" {...stylex.props(styles.navLink)}>
                Industries
              </a>
              <a href="#matrix" {...stylex.props(styles.navLink)}>
                Portfolio
              </a>
              <a href="#dossier" {...stylex.props(styles.navLink)}>
                Dossier
              </a>
              <a href="#formulation" {...stylex.props(styles.navLink)}>
                Formulation
              </a>
              <a href="#standards" {...stylex.props(styles.navLink)}>
                Standards
              </a>
            </nav>
          </div>

          <div {...stylex.props(styles.headerRight)}>
            <SimStatsBadge statsRef={statsRef} />
            <a href="#contact" {...stylex.props(styles.inquireSpecBtn)}>
              Inquire Spec
            </a>
            <MobileNav />
          </div>
        </header>

        {/* Main Content Sections */}
        <main>
          <WaterfallHeroCanvas
            config={config}
            statsRef={statsRef}
            preset={preset}
            applyPreset={applyPreset}
          />
          <TickerSection />
          <StatBand />
          <IndustriesSection />
          <MatrixSection />
          <DossierSection />
          <FormulationPresenter />
          <StandardsSection />
          <FinaleSection />
        </main>
      </div>
    </LazyMotion>
  );
}
