import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  ArrowUpRight,
  Globe,
  Lightbulb,
  Menu,
  Plus,
  Search,
  Shield,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  animate,
  domAnimation,
  m,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { preinit } from "react-dom";

import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { HeroGradeFilter } from "@/components/prototype/hero-grade";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { LINKEDIN_PATHS, LOGO_PATHS, WECHAT_PATHS, type VectorPath } from "../variant-o/vectors";
import { INTRO_REVEAL_MS, introStyles, useIntro } from "./intro";
import { DepthPhoto } from "./depth-photo";
import { glyphRise, screenWaterline } from "./depth-photo-math";
import { LiquidImage } from "./liquid-hero";
import {
  ABOUT,
  COPYRIGHT,
  CTA,
  FOOTER_COLUMNS,
  GLOBAL_INTRO,
  HERO,
  IMAGES,
  NAV_ITEMS,
  NEWS,
  NEWS_TITLE,
  CAMPUS_LAKE,
  OFFICE_COLUMNS,
  OFFICE_MAP_PINS,
  PRODUCTS,
  PRODUCTS_INTRO,
  STATS,
  STRENGTHS,
  STRENGTHS_INTRO,
  type StrengthIcon,
  type StrengthTone,
} from "./content";

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,500;0,800;1,500&family=Noto+Sans+SC:wght@400;500;700;900&display=swap";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const TINT = "#e6ecf7";
const SURFACE = "#f6f6f6";
const PANEL_ALT = "#e8e8e8";
const FOOTER_BLUE = "#294f92";
const HERO_OVERLAY = "#0743a9";
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const HOVER_MOTION =
  "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const PINNED = "@media (min-width: 768px) and (prefers-reduced-motion: no-preference)";
const PINNED_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const INSET_120 = "min(120px, 8.333vw)";
const INSET_124 = "min(124px, 8.611vw)";
const INSET_132 = "min(132px, 9.167vw)";
const INSET_118 = "min(118px, 8.194vw)";

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));
const HEADER_HEIGHT = 80;

const ZOOM_FROM_SCALE = 0.96;
const SETTLED = "translateY(0px) scale(1)";
const zoomFrom = (y: number, scale: number) => `translateY(${y}px) scale(${scale})`;

const BLOOM_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const [HEADLINE_OPENING, HEADLINE_CLOSING] = HERO.headline;
const [OPENING_BEFORE, OPENING_AFTER] = HEADLINE_OPENING.split(HERO.accent);
const CLOSING_BREAK = HEADLINE_CLOSING.lastIndexOf(" ");
const CLOSING_LEAD = HEADLINE_CLOSING.slice(0, CLOSING_BREAK);
const CLOSING_WORD = HEADLINE_CLOSING.slice(CLOSING_BREAK + 1).replace(/\.$/, "");

const revealZoom = stylex.keyframes({
  "0%": { scale: "1.22" },
  "100%": { scale: "1" },
});

const headerDrop = stylex.keyframes({
  "0%": { opacity: 0, translate: "0px -14px" },
  "100%": { opacity: 1, translate: "0px 0px" },
});

const pinPulse = stylex.keyframes({
  "0%": { scale: "0.2", opacity: 0.85 },
  "100%": { scale: "2.4", opacity: 0 },
});

const introAfter = (ms: number) => `calc(var(--oo-intro, 0ms) + ${ms}ms)`;

const textBloom = stylex.keyframes({
  "0%": { scale: "0.88", filter: "blur(10px)", opacity: 0 },
  "35%": { filter: "blur(5px)", opacity: 1 },
  "60%": { scale: "1.012", filter: "blur(1.5px)" },
  "82%": { scale: "1.003", filter: "blur(0.4px)" },
  "100%": { scale: "1", filter: "blur(0px)", opacity: 1 },
});

const logoBlurIn = stylex.keyframes({
  "0%": { filter: "blur(6px)" },
  "100%": { filter: "blur(0px)" },
});

const logoPartBloom = stylex.keyframes({
  "0%": { scale: "0.5", opacity: 0 },
  "55%": { opacity: 1 },
  "100%": { scale: "1", opacity: 1 },
});

const crackOpen = stylex.keyframes({
  "0%": { translate: "0em 0em" },
  "100%": { translate: "0.015em 0.08em" },
});

const dotSettle = stylex.keyframes({
  "0%": { translate: "0em 0em" },
  "100%": { translate: "0em 0.08em" },
});

const dotBounce = stylex.keyframes({
  "0%": { translate: "0em -1.6em", scale: "1 1", opacity: 0 },
  "6%": { opacity: 1 },
  "10%": { translate: "0em -1.5em" },
  "20%": { translate: "0em -1.2em" },
  "30%": { translate: "0em -0.7em" },
  "40%": { translate: "0em 0em", scale: "1.35 0.7" },
  "46%": { translate: "0em -0.2em", scale: "0.92 1.1" },
  "58%": { translate: "0em -0.55em", scale: "1 1" },
  "67%": { translate: "0em -0.4em" },
  "76%": { translate: "0em 0em", scale: "1.18 0.86" },
  "81%": { translate: "0em -0.08em", scale: "1 1" },
  "87%": { translate: "0em -0.15em" },
  "95%": { translate: "0em 0em", scale: "1.06 0.95" },
  "100%": { translate: "0em 0em", scale: "1 1", opacity: 1 },
});

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const logoPartDelay = (d: string) => {
  const startX = Number(/^M(-?[\d.]+)/.exec(d)?.[1] ?? 0);
  return introAfter(Math.round(250 + startX * 4));
};

const STRENGTH_ICONS: Record<StrengthIcon, LucideIcon> = {
  globe: Globe,
  shield: Shield,
  bulb: Lightbulb,
  users: Users,
};

const PATTERN_CELLS = Array.from({ length: 15 }, (_, column) =>
  (column % 2 === 0 ? [0, 65, 130] : [32.5, 97.5]).map((top) => ({
    left: 3 + column * 32.75,
    top,
  })),
).flat();

const styles = stylex.create({
  root: {
    position: "relative",
    backgroundColor: "#f3f5fa",
    color: INK,
    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "::selection": {
      backgroundColor: colors.brandBlue100,
      color: colors.brandBlue950,
    },
  },
  page: {
    position: "relative",
    backgroundColor: colors.paper,
  },
  anchor: {
    scrollMarginTop: HEADER_HEIGHT,
  },
  skipLink: {
    position: "absolute",
    top: 16,
    insetInlineStart: 16,
    zIndex: 3,
    paddingBlock: 12,
    paddingInline: 16,
    backgroundColor: colors.paper,
    color: colors.brandBlue700,
    fontSize: 16,
    lineHeight: 1.2,
    textDecoration: "none",
    transform: { default: "translateY(-200%)", ":focus-visible": "none" },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  mainTarget: {
    outlineStyle: "none",
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset120: {
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_120 },
  },
  inset124: {
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_124 },
  },
  inset132: {
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_132 },
  },

  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
    textWrap: "balance",
  },
  sectionLead: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 18 },
    lineHeight: 1.6,
    color: BODY_TEXT,
    textAlign: "center",
    textWrap: "pretty",
  },
  mutedText: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.2,
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.2,
    textDecoration: "none",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  buttonPrimary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  buttonSecondary: {
    backgroundColor: { default: colors.paper, ":hover": TINT },
    color: colors.brandBlue700,
  },
  buttonHero: { width: 144, height: 48 },
  buttonCompact: { minWidth: 96, height: 44, paddingInline: 24 },
  buttonSmall: { minWidth: 96, height: 40, paddingInline: 24 },
  buttonWide: { width: 160, height: 48 },

  header: {
    position: "fixed",
    top: 0,
    insetInline: 0,
    zIndex: 2,
    backgroundColor: "transparent",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  },
  headerSolid: {
    backgroundColor: "rgba(255, 255, 255, 0.88)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.06)",
  },
  headerInner: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: 80,
    paddingInlineStart: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_120 },
    paddingInlineEnd: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_118 },
  },
  logoLink: {
    display: "block",
    marginTop: 15,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  headerEnter: {
    animationName: { default: headerDrop, [breakpoints.motionReduce]: fadeIn },
    animationDuration: { default: "800ms", [breakpoints.motionReduce]: "300ms" },
    animationDelay: "calc(var(--oo-intro, 0ms) + 200ms)",
    animationTimingFunction: EASE_OUT_CSS,
    animationFillMode: "both",
  },
  logoAssemble: {
    animationName: { default: logoBlurIn, [breakpoints.motionReduce]: "none" },
    animationDuration: "1100ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 250ms)",
    animationTimingFunction: EASE_OUT_CSS,
    animationFillMode: "both",
  },
  logoPart: {
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
    animationName: { default: logoPartBloom, [breakpoints.motionReduce]: fadeIn },
    animationDuration: { default: "1100ms", [breakpoints.motionReduce]: "300ms" },
    animationTimingFunction: EASE_OUT_CSS,
    animationFillMode: "both",
  },
  logo: {
    display: "block",
    width: 161,
    height: 52,
  },
  nav: {
    display: { default: "none", [DESKTOP]: "flex" },
    position: "absolute",
    top: 23,
    left: "50%",
    transform: "translateX(-50%)",
  },
  navLink: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: 40,
    paddingInline: 20,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.2,
    color: { default: INK, ":hover": colors.brandBlue700 },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
  },
  navLinkActive: {
    "::after": {
      content: '""',
      position: "absolute",
      insetInlineStart: 21,
      insetInlineEnd: 20,
      bottom: 3,
      height: 1,
      backgroundColor: "#0743a2",
    },
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 25,
  },
  searchPill: {
    display: { default: "none", [breakpoints.md]: "flex" },
    alignItems: "center",
    width: 170,
    height: 38,
    paddingInline: 16,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: INK,
    borderRadius: 19,
    backgroundColor: { default: "transparent", ":hover": "rgba(7, 67, 174, 0.06)" },
    color: INK,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  langButton: {
    paddingBlock: 10,
    paddingInline: 6,
    marginBlock: -10,
    marginInline: -6,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 16,
    lineHeight: 1.2,
    color: INK,
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  menuButton: {
    display: { default: "inline-flex", [DESKTOP]: "none" },
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    marginBlock: -3,
    marginInlineEnd: -8,
    padding: 0,
    borderWidth: 0,
    borderRadius: 22,
    backgroundColor: { default: "transparent", ":hover": "rgba(7, 67, 174, 0.06)" },
    color: INK,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  menuPanel: {
    position: "absolute",
    top: 80,
    insetInline: 0,
    paddingBlock: 8,
    paddingInline: { default: 8, [TABLET]: 32 },
    backgroundColor: colors.paper,
    boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.12), 0 1px 0 0 rgba(0, 0, 0, 0.06)",
  },
  menuList: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  menuLink: {
    display: "flex",
    alignItems: "center",
    minHeight: 48,
    paddingInline: 8,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.2,
    color: { default: INK, ":hover": colors.brandBlue700 },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  menuLinkActive: {
    color: colors.brandBlue700,
  },

  hero: {
    position: "relative",
    overflow: "hidden",
    height: { default: "auto", [DESKTOP]: 900 },
    backgroundColor: "#b9cdf0",
  },
  heroBackdrop: {
    position: "absolute",
    inset: 0,
    filter: "url(#fenchem-hero-grade)",
    animationName: { default: revealZoom, [breakpoints.motionReduce]: "none" },
    animationDuration: "2200ms",
    animationDelay: "var(--oo-intro, 0ms)",
    animationTimingFunction: BLOOM_EASE,
    animationFillMode: "both",
  },
  heroParallax: {
    position: "absolute",
    inset: 0,
  },
  heroBloom: {
    transformOrigin: "0% 50%",
    animationName: { default: textBloom, [breakpoints.motionReduce]: fadeIn },
    animationDuration: { default: "1400ms", [breakpoints.motionReduce]: "400ms" },
    animationTimingFunction: BLOOM_EASE,
    animationFillMode: "both",
  },
  heroPhrase: {
    display: "inline-block",
  },
  heroPeriodSeat: {
    display: "inline-block",
    marginInlineStart: "0.04em",
    translate: "0em 0.08em",
    animationName: { default: dotSettle, [breakpoints.motionReduce]: "none" },
    animationDuration: "900ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 1700ms)",
    animationTimingFunction: "cubic-bezier(0.2, 1.4, 0.4, 1)",
    animationFillMode: "both",
  },
  heroPeriod: {
    display: "block",
    width: "0.17em",
    height: "0.17em",
    borderRadius: "50%",
    backgroundColor: colors.brandBlue700,
    transformOrigin: "50% 100%",
    animationName: { default: dotBounce, [breakpoints.motionReduce]: fadeIn },
    animationDuration: { default: "1000ms", [breakpoints.motionReduce]: "400ms" },
    animationDelay: "calc(var(--oo-intro, 0ms) + 1300ms)",
    animationTimingFunction: "linear",
    animationFillMode: "both",
  },
  enterDelay: (delay: string) => ({
    animationDelay: delay,
  }),
  heroLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  heroImage: {
    objectFit: "cover",
    filter: "contrast(0.8) saturate(1.27)",
  },
  heroTintColor: {
    backgroundColor: HERO_OVERLAY,
    opacity: 0.7,
    mixBlendMode: "color",
  },
  heroTintScreen: {
    backgroundColor: "rgba(7, 67, 169, 0.7)",
    opacity: 0.7,
    mixBlendMode: "screen",
  },
  heroContent: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 40,
    paddingTop: { default: 176, [DESKTOP]: 320 },
    paddingBottom: { default: 120, [DESKTOP]: 0 },
  },
  heroCopy: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 18, [DESKTOP]: 26 },
  },
  heroTitle: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 18, [DESKTOP]: 30 },
    margin: 0,
    color: INK,
  },
  heroHeadline: {
    display: "block",
    fontFamily: '"Inter Tight", "Helvetica Neue", Arial, sans-serif',
    fontWeight: 800,
  },
  heroLead: {
    display: "block",
    fontSize: { default: 20, [TABLET]: 26, [DESKTOP]: "min(34px, 2.5vw)" },
    fontWeight: 500,
    lineHeight: 1.06,
    letterSpacing: "-0.025em",
    wordSpacing: "0.05em",
  },
  heroAccent: {
    fontFamily: '"Instrument Serif", "Times New Roman", serif',
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "1.24em",
    lineHeight: 0.8,
    letterSpacing: "-0.01em",
    color: colors.brandGreen800,
    paddingInlineEnd: "0.06em",
  },
  heroBreakLine: {
    display: "block",
    marginTop: "-0.07em",
    marginBottom: "-0.12em",
    fontSize: { default: "10.5vw", [TABLET]: "7vw", [DESKTOP]: "min(84px, 6vw)" },
    lineHeight: 1.18,
    letterSpacing: "-0.055em",
    whiteSpace: "nowrap",
  },
  heroBreak: {
    position: "relative",
    display: "inline-block",
  },
  heroBreakInk: {
    display: "inline-block",
    paddingInlineEnd: "0.06em",
    backgroundImage:
      "linear-gradient(100deg, var(--color-brand-blue-950) 0%, var(--color-brand-blue-800) 45%, var(--color-brand-blue-600) 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  heroBreakHead: {
    clipPath: "polygon(-5% -20%, 42.7% -20%, 34.3% 120%, -5% 120%)",
  },
  heroBreakTail: {
    position: "absolute",
    top: 0,
    left: 0,
    clipPath: "polygon(42.7% -20%, 105% -20%, 105% 120%, 34.3% 120%)",
    translate: "0.015em 0.08em",
    animationName: { default: crackOpen, [breakpoints.motionReduce]: "none" },
    animationDuration: "900ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 1700ms)",
    animationTimingFunction: "cubic-bezier(0.2, 1.4, 0.4, 1)",
    animationFillMode: "both",
  },
  heroSubtitle: {
    display: "block",
    fontSize: { default: 16, [TABLET]: 18, [DESKTOP]: 20 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.14em",
    fontFeatureSettings: '"palt"',
  },
  ctaRow: {
    display: "flex",
    paddingTop: 8,
  },

  about: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: { default: 0, [DESKTOP]: 700 },
    paddingBlock: { default: 72, [DESKTOP]: 96 },
    boxSizing: "border-box",
    backgroundColor: colors.paper,
  },
  aboutInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
    maxWidth: { default: 768, [DESKTOP]: 920 },
  },
  aboutBody: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 18 },
    fontWeight: 500,
    lineHeight: 1.8,
    color: INK,
    textAlign: "center",
  },

  campusTrack: {
    position: "relative",
    height: { default: "auto", [PINNED]: "260vh" },
  },
  campusSticky: {
    position: { default: "relative", [PINNED]: "sticky" },
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: { default: "auto", [PINNED]: "100vh" },
    paddingInline: { default: 16, [PINNED]: 0 },
    paddingBlock: { default: 24, [PINNED]: 0 },
    overflow: "hidden",
  },
  campusWindow: {
    position: "relative",
    width: "100%",
    height: { default: "auto", [PINNED]: "100%" },
    aspectRatio: { default: "2400 / 1712", [PINNED]: "auto" },
    borderRadius: { default: 20, [PINNED]: 0 },
    overflow: "hidden",
    backgroundColor: "#dfe8f6",
  },
  campusStage: {
    position: "absolute",
    inset: 0,
  },
  campusImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "50% 58%",
  },
  statsBand: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "stretch", [breakpoints.md]: "center" },
    gap: { default: 32, [breakpoints.md]: 15.5 },
    minHeight: { default: 0, [breakpoints.md]: 184 },
    paddingBlock: { default: 48, [breakpoints.md]: 0 },
  },
  stat: {
    flexGrow: 1,
    flexBasis: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    textAlign: "center",
  },
  statText: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.2,
    color: INK,
  },
  statFigure: {
    display: "flex",
    alignItems: "flex-start",
    gap: 2,
    margin: 0,
    fontVariantNumeric: "tabular-nums",
  },
  statValue: {
    fontSize: { default: 48, [DESKTOP]: 60 },
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
    textAlign: "center",
  },
  statValueWidth: (width: string) => ({
    minWidth: width,
  }),
  visuallyHidden: {
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
  statUnit: {
    fontSize: { default: 26, [DESKTOP]: 32 },
    lineHeight: 1.2,
  },
  statDivider: {
    display: { default: "none", [breakpoints.md]: "block" },
    flexShrink: 0,
    width: 1,
    height: 70,
    backgroundColor: "#000000",
  },
  lake: {
    position: "absolute",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    alignItems: "center",
    containerType: "size",
    color: "#ffffff",
    pointerEvents: "none",
    backgroundImage: "linear-gradient(180deg, rgba(4, 24, 60, 0) 0%, rgba(4, 24, 60, 0.3) 100%)",
  },
  lakeFrame: (top: string, side: string, bottom: string) => ({
    top,
    left: side,
    right: side,
    bottom,
  }),
  lakeStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(2px, 2.5cqh, 10px)",
    textAlign: "center",
  },
  lakeLabel: {
    margin: 0,
    fontSize: "clamp(12px, 7cqh, 15px)",
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.16em",
    textIndent: "0.16em",
    color: "rgba(255, 255, 255, 0.94)",
    textShadow: "0 1px 12px rgba(6, 36, 84, 0.6)",
  },
  lakeFigure: {
    display: "flex",
    alignItems: "flex-start",
    margin: 0,
    fontWeight: 500,
    fontSize: "min(7cqw, calc((100cqh - 64px) * 0.95))",
    lineHeight: 1,
    letterSpacing: "-0.02em",
    color: "#ffffff",
    textShadow: "0 2px 18px rgba(6, 36, 84, 0.45)",
    fontVariantNumeric: "tabular-nums",
  },
  lakeFigureDrawn: {
    color: "transparent",
    textShadow: "none",
  },
  lakeUnit: {
    fontSize: "0.42em",
    marginInlineStart: "0.14em",
  },
  lakeCaption: {
    margin: 0,
    fontSize: "clamp(12px, 6.5cqh, 14px)",
    lineHeight: 1.3,
    letterSpacing: "0.12em",
    color: "rgba(255, 255, 255, 0.92)",
    textShadow: "0 1px 3px rgba(6, 36, 84, 0.55), 0 1px 12px rgba(6, 36, 84, 0.7)",
  },

  strengths: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 48,
    paddingBlock: { default: 72, [DESKTOP]: 96 },
    backgroundColor: colors.paper,
  },
  introBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    maxWidth: 768,
  },
  strengthGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [TABLET]: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: "repeat(4, minmax(0, 1fr))",
    },
    width: "100%",
    maxWidth: 1200,
  },
  strengthCard: {
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    minHeight: 164,
    paddingTop: 105,
    paddingBottom: 18,
    paddingInlineStart: 32,
    paddingInlineEnd: 27,
    boxSizing: "border-box",
  },
  toneBlue: { backgroundColor: "#4668a5", color: "#e6ecf7" },
  toneGray: { backgroundColor: "#e3e3e3", color: "#f1f1f1" },
  toneGreen: { backgroundColor: "#93c170", color: "#a2ca85" },
  toneCream: { backgroundColor: "#fffae5", color: "#fff7d9" },
  pattern: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    mixBlendMode: "multiply",
    pointerEvents: "none",
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: 1,
      [stylex.when.ancestor(":focus-within")]: 1,
    },
    transitionProperty: "opacity",
    transitionDuration: "250ms",
    transitionTimingFunction: "ease",
  },
  patternCell: (left: string, top: string) => ({
    position: "absolute",
    left,
    top,
  }),
  strengthText: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
    justifyContent: "space-between",
    columnGap: 12,
    rowGap: 8,
    color: INK,
  },
  strengthTextInverse: {
    color: "#ffffff",
  },
  strengthCopy: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  strengthTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  },
  strengthSmall: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.3,
  },
  strengthLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    paddingBlock: 8,
    marginBlock: -8,
    fontSize: 13,
    lineHeight: 1.3,
    color: "inherit",
    whiteSpace: "nowrap",
    textDecoration: { default: "none", ":hover": "underline" },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: "currentColor",
    outlineOffset: -2,
  },

  products: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBlock: { default: 72, [DESKTOP]: 96 },
    backgroundColor: SURFACE,
  },
  productsCta: {
    paddingTop: 24,
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [TABLET]: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: "repeat(4, minmax(0, 1fr))",
    },
    width: "100%",
    maxWidth: 1200,
    marginTop: { default: 48, [DESKTOP]: 96 },
    scrollMarginTop: HEADER_HEIGHT + 24,
  },
  productCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    zIndex: { default: 0, ":hover": 1 },
  },
  productTilt: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "450ms",
    transitionTimingFunction: EASE_OUT_CSS,
    boxShadow: {
      default: "0 0 0 rgba(7, 67, 174, 0)",
      [stylex.when.ancestor(":hover")]: {
        default: "0 0 0 rgba(7, 67, 174, 0)",
        [HOVER_MOTION]: "0 24px 48px -20px rgba(7, 67, 174, 0.35)",
      },
    },
  },
  productGlare: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage:
      "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 30%), rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 55%)",
    opacity: {
      default: 0,
      [stylex.when.ancestor(":hover")]: { default: 0, [HOVER_MOTION]: 1 },
    },
    transitionProperty: "opacity",
    transitionDuration: "300ms",
    transitionTimingFunction: "ease",
  },
  productImageFrame: {
    overflow: "hidden",
    aspectRatio: "300 / 327",
  },
  productImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: { default: null, [HOVER_MOTION]: "scale(1.04)" },
    },
    transitionProperty: "transform",
    transitionDuration: "600ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  productPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 32,
    flexGrow: 1,
    minHeight: { default: 0, [DESKTOP]: 327 },
    padding: 24,
    boxSizing: "border-box",
    backgroundColor: colors.paper,
  },
  productPanelAlt: {
    backgroundColor: PANEL_ALT,
  },
  productTitleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  productTitle: {
    margin: 0,
    fontSize: { default: 26, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: 1.2,
    color: INK,
  },
  rule: {
    width: "100%",
    height: 1,
    margin: 0,
    borderWidth: 0,
    backgroundColor: colors.line,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },

  globalBand: {
    paddingTop: { default: 64, [DESKTOP]: 109 },
    paddingBottom: { default: 64, [DESKTOP]: 101 },
    backgroundColor: colors.paper,
  },
  globalRow: {
    display: "flex",
    flexDirection: { default: "column", [DESKTOP]: "row" },
    alignItems: "center",
    gap: 25,
    maxWidth: 1090,
    marginInlineStart: {
      default: 16,
      [TABLET]: 40,
      [DESKTOP]: `max(${INSET_120}, calc(50% - 522px))`,
    },
    marginInlineEnd: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_120 },
  },
  mapWrap: {
    position: "relative",
    width: "100%",
    maxWidth: 611,
    flexBasis: { default: "auto", [DESKTOP]: 611 },
    flexShrink: 1,
    minWidth: 0,
  },
  mapRing: {
    position: "absolute",
    width: 26,
    height: 10,
    marginLeft: -13,
    marginTop: -5,
    borderRadius: "50%",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    opacity: 0,
    pointerEvents: "none",
    animationName: { default: pinPulse, [breakpoints.motionReduce]: "none" },
    animationDuration: "2800ms",
    animationTimingFunction: EASE_OUT_CSS,
    animationIterationCount: "infinite",
  },
  mapRingAt: (left: string, top: string, delay: string) => ({
    left,
    top,
    animationDelay: delay,
  }),
  mapImage: {
    display: "block",
    width: "100%",
    height: "auto",
  },
  globalCopy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    width: "100%",
    maxWidth: { default: "none", [DESKTOP]: 454 },
    flexBasis: { default: "auto", [DESKTOP]: 454 },
    flexShrink: 1,
    minWidth: 0,
  },
  officesBand: {
    paddingTop: 48,
    paddingBottom: { default: 72, [DESKTOP]: 96 },
    backgroundColor: SURFACE,
  },
  regions: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [TABLET]: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: "repeat(4, minmax(0, 1fr))",
    },
    gap: 32,
  },
  officeColumn: {
    display: "flex",
    flexDirection: "column",
  },
  officeGroup: {
    display: "flex",
    flexDirection: "column",
    flexGrow: { default: 0, ":last-child": 1 },
  },
  regionHeader: {
    display: "flex",
    alignItems: "center",
    height: 40,
    margin: 0,
    paddingInline: 16,
    backgroundColor: TINT,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
  },
  regionBody: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: colors.paper,
  },

  news: {
    paddingTop: 48,
    paddingBottom: { default: 72, [DESKTOP]: 96 },
    backgroundColor: colors.paper,
  },
  newsInner: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  accordion: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  newsItem: {
    paddingBottom: 12,
    backgroundColor: SURFACE,
  },
  newsHeading: {
    margin: 0,
  },
  newsTrigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    width: "100%",
    paddingTop: 24,
    paddingInline: 24,
    paddingBottom: 12,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
    textAlign: "start",
    color: { default: INK, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  newsIconSlot: {
    position: "relative",
    flexShrink: 0,
    width: 16,
    height: 16,
  },
  newsIconLayer: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  newsPanel: {
    overflow: "hidden",
  },
  newsPanelInner: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingInline: 24,
    paddingBottom: 12,
  },

  cta: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: { default: 80, [DESKTOP]: 112 },
    backgroundColor: TINT,
  },
  ctaInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
  },

  footer: {
    paddingTop: 64,
    paddingBottom: 48,
    backgroundColor: FOOTER_BLUE,
    color: colors.paper,
  },
  footerInner: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  footerTop: {
    display: "flex",
    flexDirection: { default: "column", [DESKTOP]: "row" },
    justifyContent: "space-between",
    gap: 40,
  },
  footerLogo: {
    display: "block",
    width: 225,
    height: 73,
    objectFit: "cover",
    filter: "brightness(0) invert(1)",
  },
  footerColumns: {
    display: "flex",
    flexWrap: "wrap",
    gap: 32,
  },
  footerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 35,
    width: { default: "auto", [DESKTOP]: 210 },
    minWidth: 140,
  },
  footerHeading: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  footerLinks: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    margin: 0,
    padding: 0,
    fontSize: 16,
    lineHeight: 1.2,
    listStyleType: "none",
  },
  footerLink: {
    fontSize: 16,
    lineHeight: 1.2,
    color: colors.paper,
    textDecoration: { default: "none", ":hover": "underline" },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 2,
  },
  footerRule: {
    width: "100%",
    height: 1,
    margin: 0,
    borderWidth: 0,
    backgroundColor: colors.paper,
  },
  footerBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  copyright: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1.2,
  },
  social: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  socialLink: {
    display: "block",
    width: 20,
    height: 20,
    padding: 6,
    margin: -6,
    opacity: { default: 0.65, ":hover": 1 },
    transitionProperty: "opacity",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: -2,
  },
  socialIcon: {
    display: "block",
    width: 20,
    height: 20,
  },
});

const TONE_STYLES: Record<StrengthTone, StyleXStyles> = {
  blue: styles.toneBlue,
  gray: styles.toneGray,
  green: styles.toneGreen,
  cream: styles.toneCream,
};

type ZoomProps = {
  children: ReactNode;
  sx?: StyleXStyles;
  style?: StyleXStyles;
  delay?: number;
  y?: number;
  scale?: number;
};

function ZoomReveal({
  children,
  sx,
  style,
  delay = 0,
  y = 24,
  scale = ZOOM_FROM_SCALE,
}: ZoomProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      {...stylex.props(sx, style)}
      initial={{ opacity: 0, transform: zoomFrom(y, scale) }}
      whileInView={{ opacity: 1, transform: SETTLED }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0.2 : 0.8, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

function VectorArt({
  paths,
  viewBox,
  sx,
}: {
  paths: readonly VectorPath[];
  viewBox: string;
  sx: StyleXStyles;
}) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" focusable="false" {...stylex.props(sx)}>
      {paths.map((path) => (
        <path key={path.d} d={path.d} fill={path.fill} />
      ))}
    </svg>
  );
}

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useScrolledPastTop() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );
}

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        const next = ids.find((id) => (ratios.get(id) ?? 0) > 0);
        if (next) setActive(next);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.01] },
    );
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const reduce = useReducedMotion();
  const scrolled = useScrolledPastTop();
  const activeId = useActiveSection(NAV_SECTION_IDS);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  const isActive = (href: string) => href.slice(1) === activeId;
  return (
    <header {...stylex.props(styles.header, (scrolled || menuOpen) && styles.headerSolid)}>
      <div {...stylex.props(styles.shell, styles.headerInner, styles.headerEnter)}>
        <a href="#top" aria-label="FENCHEM 泛成 首页" {...stylex.props(styles.logoLink)}>
          <LogoMark />
        </a>
        <nav aria-label="主导航" {...stylex.props(styles.nav)}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "location" : undefined}
              {...stylex.props(styles.navLink, isActive(item.href) && styles.navLinkActive)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div {...stylex.props(styles.headerActions)}>
          <button type="button" aria-label="AI 搜索" {...stylex.props(styles.searchPill)}>
            <Search size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
          </button>
          <button type="button" aria-label="CN，切换语言" {...stylex.props(styles.langButton)}>
            CN
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
            {...stylex.props(styles.menuButton)}
          >
            {menuOpen ? (
              <X size={24} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
            ) : (
              <Menu size={24} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {menuOpen ? (
          <m.nav
            key="menu"
            id={menuId}
            aria-label="主导航"
            {...stylex.props(styles.menuPanel)}
            initial={{ opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: reduce ? 0.15 : 0.2, ease: EASE }}
          >
            <ul {...stylex.props(styles.menuList)}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive(item.href) ? "location" : undefined}
                    onClick={() => setMenuOpen(false)}
                    {...stylex.props(styles.menuLink, isActive(item.href) && styles.menuLinkActive)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function LogoMark() {
  return (
    <svg
      viewBox="0 0 161 52"
      aria-hidden="true"
      focusable="false"
      {...stylex.props(styles.logo, styles.logoAssemble)}
    >
      {LOGO_PATHS.map((path) => (
        <path
          key={path.d}
          d={path.d}
          fill={path.fill}
          {...stylex.props(styles.logoPart, styles.enterDelay(logoPartDelay(path.d)))}
        />
      ))}
    </svg>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  return (
    <section ref={heroRef} id="top" aria-labelledby="oo-hero-title" {...stylex.props(styles.hero)}>
      <HeroGradeFilter />
      <m.div
        aria-hidden="true"
        {...stylex.props(styles.heroParallax)}
        style={reduce ? undefined : { y: backdropY }}
      >
        <div {...stylex.props(styles.heroBackdrop)}>
          <img
            src={IMAGES.hero}
            alt=""
            decoding="async"
            {...stylex.props(styles.heroLayer, styles.heroImage)}
          />
          <LiquidImage src={IMAGES.hero} sx={styles.heroImage} />
          <div {...stylex.props(styles.heroLayer, styles.heroTintColor)} />
          <div {...stylex.props(styles.heroLayer, styles.heroTintScreen)} />
        </div>
      </m.div>
      <m.div
        {...stylex.props(styles.shell, styles.inset120, styles.heroContent)}
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div {...stylex.props(styles.heroCopy)}>
          <h1 id="oo-hero-title" {...stylex.props(styles.heroTitle)}>
            <span lang="en" {...stylex.props(styles.heroHeadline)}>
              <span
                {...stylex.props(
                  styles.heroLead,
                  styles.heroBloom,
                  styles.enterDelay(introAfter(300)),
                )}
              >
                {OPENING_BEFORE}
                <span {...stylex.props(styles.heroAccent)}>{HERO.accent}</span>
                {OPENING_AFTER}
              </span>{" "}
              <span
                {...stylex.props(
                  styles.heroLead,
                  styles.heroBloom,
                  styles.enterDelay(introAfter(400)),
                )}
              >
                {CLOSING_LEAD}
              </span>{" "}
              <span {...stylex.props(styles.heroBreakLine)}>
                <span
                  {...stylex.props(
                    styles.heroBreak,
                    styles.heroBloom,
                    styles.enterDelay(introAfter(500)),
                  )}
                >
                  <span {...stylex.props(styles.heroBreakInk, styles.heroBreakHead)}>
                    {CLOSING_WORD}
                  </span>
                  <span
                    aria-hidden="true"
                    {...stylex.props(styles.heroBreakInk, styles.heroBreakTail)}
                  >
                    {CLOSING_WORD}
                  </span>
                </span>
                <span aria-hidden="true" {...stylex.props(styles.heroPeriodSeat)}>
                  <span {...stylex.props(styles.heroPeriod)} />
                </span>
                <span {...stylex.props(styles.visuallyHidden)}>.</span>
              </span>
            </span>{" "}
            <span
              {...stylex.props(
                styles.heroSubtitle,
                styles.heroBloom,
                styles.enterDelay(introAfter(600)),
              )}
            >
              {HERO.title}
            </span>
          </h1>
        </div>
        <div {...stylex.props(styles.ctaRow, styles.heroBloom, styles.enterDelay(introAfter(760)))}>
          <a
            href={HERO.primary.href}
            {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonHero)}
          >
            {HERO.primary.label}
          </a>
          <a
            href={HERO.secondary.href}
            {...stylex.props(styles.button, styles.buttonSecondary, styles.buttonHero)}
          >
            {HERO.secondary.label}
          </a>
        </div>
      </m.div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      aria-labelledby="oo-about-title"
      {...stylex.props(styles.about, styles.inset124, styles.anchor)}
    >
      <ZoomReveal sx={styles.aboutInner}>
        <h2 id="oo-about-title" {...stylex.props(styles.sectionTitle)}>
          {ABOUT.title}
        </h2>
        <p {...stylex.props(styles.aboutBody)}>
          {ABOUT.lines[0]}
          <br />
          {ABOUT.lines[1]}
          <br />
          {ABOUT.lines[2]}
        </p>
        <a
          href={ABOUT.cta.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonCompact)}
        >
          {ABOUT.cta.label}
        </a>
      </ZoomReveal>
    </section>
  );
}

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const revealProgress = (progress: number) => 1 - (1 - clamp01(progress / 0.45)) ** 3;

const CLIP_FROM = { top: 17, side: 22, bottom: 13, radius: 44 };
const CLIP_TO = { top: 0, side: 0, bottom: 0, radius: 0 };
const LAKE_FRAME = { side: 9, bottom: 7 };
const RISE_START = 0.42;
const RISE_SPAN = 0.36;
const LAKE_GAP = 0.025;

const riseProgress = (progress: number) => {
  const t = clamp01((progress - RISE_START) / RISE_SPAN);
  return t * t * (3 - 2 * t);
};

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function Campus() {
  const trackRef = useRef<HTMLDivElement>(null);
  const lakeRef = useRef<HTMLDivElement>(null);
  const pinned = useMediaQuery(PINNED_QUERY);
  const [glyphsDrawn, setGlyphsDrawn] = useState(false);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const windowClip = useTransform(scrollYProgress, (progress) => {
    const t = revealProgress(progress);
    const top = lerp(CLIP_FROM.top, CLIP_TO.top, t);
    const side = lerp(CLIP_FROM.side, CLIP_TO.side, t);
    const bottom = lerp(CLIP_FROM.bottom, CLIP_TO.bottom, t);
    const radius = lerp(CLIP_FROM.radius, CLIP_TO.radius, t);
    return `inset(${top}% ${side}% ${bottom}% ${side}% round ${radius}px)`;
  });
  const photoScale = useTransform(scrollYProgress, (progress) =>
    lerp(1.22, 1, revealProgress(progress)),
  );
  const rise = useTransform(scrollYProgress, riseProgress);
  return (
    <section id="campus" aria-label="研发与生产" {...stylex.props(styles.anchor)}>
      <div ref={trackRef} {...stylex.props(styles.campusTrack)}>
        <div {...stylex.props(styles.campusSticky)}>
          <m.div
            {...stylex.props(styles.campusWindow)}
            style={pinned ? { clipPath: windowClip } : undefined}
          >
            <m.div
              {...stylex.props(styles.campusStage)}
              style={pinned ? { scale: photoScale } : undefined}
            >
              <img
                src={CAMPUS_LAKE.src}
                alt={CAMPUS_LAKE.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.campusImage)}
              />
              <DepthPhoto
                src={CAMPUS_LAKE.src}
                depthSrc={CAMPUS_LAKE.depth}
                waterline={CAMPUS_LAKE.waterline}
                progress={scrollYProgress}
                glyphRoot={pinned ? lakeRef : undefined}
                rise={pinned ? rise : undefined}
                onGlyphsReady={() => setGlyphsDrawn(true)}
              />
              {pinned ? <LakeStats rootRef={lakeRef} rise={rise} drawn={glyphsDrawn} /> : null}
            </m.div>
          </m.div>
        </div>
      </div>
      {pinned ? null : (
        <div {...stylex.props(styles.shell, styles.inset132, styles.statsBand)}>
          {STATS.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}

function LakeStats({
  rootRef,
  rise,
  drawn,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  rise: MotionValue<number>;
  drawn: boolean;
}) {
  const [top, setTop] = useState("72%");
  useEffect(() => {
    const stage = rootRef.current?.parentElement;
    if (!stage) return;
    const measure = () => {
      const waterline = screenWaterline(
        CAMPUS_LAKE.waterline,
        stage.clientWidth,
        stage.clientHeight,
        CAMPUS_LAKE.aspect,
      );
      setTop(`${((waterline + LAKE_GAP) * 100).toFixed(2)}%`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [rootRef]);

  return (
    <div
      ref={rootRef}
      {...stylex.props(
        styles.lake,
        styles.lakeFrame(top, `${LAKE_FRAME.side}%`, `${LAKE_FRAME.bottom}%`),
      )}
    >
      {STATS.map((stat, index) => (
        <LakeStat
          key={stat.label}
          stat={stat}
          rise={rise}
          at={(index + 0.5) / STATS.length}
          drawn={drawn}
        />
      ))}
    </div>
  );
}

function LakeStat({
  stat,
  rise,
  at,
  drawn,
}: {
  stat: (typeof STATS)[number];
  rise: MotionValue<number>;
  at: number;
  drawn: boolean;
}) {
  const surfacing = useTransform(rise, (value) => glyphRise(value, at));
  const lift = useTransform(surfacing, (value) => (1 - value) * 16);
  const [surfaced, setSurfaced] = useState(() => surfacing.get() > 0.05);
  useMotionValueEvent(surfacing, "change", (value) => {
    if (value > 0.05) setSurfaced(true);
  });
  const display = useCountUp(stat.value, surfaced);

  return (
    <div {...stylex.props(styles.lakeStat)}>
      <m.p {...stylex.props(styles.lakeLabel)} style={{ opacity: surfacing, y: lift }}>
        {stat.label}
      </m.p>
      <m.p
        data-lake-glyph={display}
        data-lake-final={stat.value}
        data-lake-unit={stat.unit ?? ""}
        {...stylex.props(styles.lakeFigure, drawn && styles.lakeFigureDrawn)}
        style={{ opacity: surfacing }}
      >
        <span aria-hidden="true">{display}</span>
        <span {...stylex.props(styles.visuallyHidden)}>{stat.value}</span>
        {stat.unit ? <span {...stylex.props(styles.lakeUnit)}>{stat.unit}</span> : null}
      </m.p>
      <m.p {...stylex.props(styles.lakeCaption)} style={{ opacity: surfacing, y: lift }}>
        {stat.caption}
      </m.p>
    </div>
  );
}

const NUMBER_FORMAT = new Intl.NumberFormat("en-US");

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const display = useCountUp(value, inView);

  return (
    <span ref={ref} {...stylex.props(styles.statValue, styles.statValueWidth(`${value.length}ch`))}>
      <span aria-hidden="true">{display}</span>
      <span {...stylex.props(styles.visuallyHidden)}>{value}</span>
    </span>
  );
}

const subscribeToNothing = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

function useCountUp(value: string, run: boolean) {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const target = Number(value.replace(/[^\d]/g, ""));
  const [count, setCount] = useState(0);
  const counting = hydrated && !reduce && Number.isFinite(target);

  useEffect(() => {
    if (!run || !counting) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    });
    return () => controls.stop();
  }, [run, counting, target]);

  return counting ? NUMBER_FORMAT.format(count) : value;
}

function StatItem({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  return (
    <>
      {index > 0 ? <span aria-hidden="true" {...stylex.props(styles.statDivider)} /> : null}
      <ZoomReveal delay={index * STAGGER} sx={styles.stat}>
        <p {...stylex.props(styles.statText)}>{stat.label}</p>
        <p {...stylex.props(styles.statFigure)}>
          <CountUp value={stat.value} />
          {stat.unit ? <span {...stylex.props(styles.statUnit)}>{stat.unit}</span> : null}
        </p>
        <p {...stylex.props(styles.statText)}>{stat.caption}</p>
      </ZoomReveal>
    </>
  );
}

function IconPattern({ icon }: { icon: StrengthIcon }) {
  const Icon = STRENGTH_ICONS[icon];
  return (
    <div aria-hidden="true" {...stylex.props(styles.pattern)}>
      {PATTERN_CELLS.map((cell) => (
        <Icon
          key={`${cell.left}-${cell.top}`}
          size={32}
          strokeWidth={2}
          absoluteStrokeWidth
          {...stylex.props(styles.patternCell(`${cell.left}px`, `${cell.top}px`))}
        />
      ))}
    </div>
  );
}

function Strengths() {
  return (
    <section
      id="strengths"
      aria-labelledby="oo-strengths-title"
      {...stylex.props(styles.strengths, styles.inset120, styles.anchor)}
    >
      <ZoomReveal sx={styles.introBlock}>
        <h2 id="oo-strengths-title" {...stylex.props(styles.sectionTitle)}>
          {STRENGTHS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{STRENGTHS_INTRO.lead}</p>
      </ZoomReveal>
      <div {...stylex.props(styles.strengthGrid)}>
        {STRENGTHS.map((strength, index) => (
          <ZoomReveal
            key={strength.title}
            delay={index * STAGGER}
            sx={[styles.strengthCard, stylex.defaultMarker()]}
            style={TONE_STYLES[strength.tone]}
          >
            <IconPattern icon={strength.icon} />
            <div
              {...stylex.props(
                styles.strengthText,
                strength.tone === "blue" && styles.strengthTextInverse,
              )}
            >
              <div {...stylex.props(styles.strengthCopy)}>
                <h3 {...stylex.props(styles.strengthTitle)}>{strength.title}</h3>
                {strength.description ? (
                  <p {...stylex.props(styles.strengthSmall)}>{strength.description}</p>
                ) : null}
              </div>
              {strength.link ? (
                <a href="#offices" {...stylex.props(styles.strengthLink)}>
                  {strength.link}
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    aria-hidden="true"
                  />
                </a>
              ) : null}
            </div>
          </ZoomReveal>
        ))}
      </div>
    </section>
  );
}

function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const card = ref.current;
    if (!card || reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const image = card.querySelector("img");
    let frame = 0;
    let rotateX = 0;
    let rotateY = 0;
    const apply = () => {
      frame = 0;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      if (image) image.style.translate = `${rotateY * -1.4}px ${rotateX * 1.4}px`;
    };
    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      rotateY = (x - 0.5) * 9;
      rotateX = (0.5 - y) * 7;
      card.style.setProperty("--glare-x", `${Math.round(x * 100)}%`);
      card.style.setProperty("--glare-y", `${Math.round(y * 100)}%`);
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      rotateX = 0;
      rotateY = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      card.style.transform = "";
      if (image) image.style.translate = "";
    };
  }, [reduce]);
  return ref;
}

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[number]; index: number }) {
  const tiltRef = useTilt<HTMLDivElement>();
  return (
    <ZoomReveal delay={index * STAGGER} sx={[styles.productCard, stylex.defaultMarker()]}>
      <div ref={tiltRef} {...stylex.props(styles.productTilt)}>
        <div {...stylex.props(styles.productImageFrame)}>
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.productImage)}
          />
        </div>
        <div {...stylex.props(styles.productPanel, index % 2 === 1 && styles.productPanelAlt)}>
          <div {...stylex.props(styles.productTitleBlock)}>
            <h3 {...stylex.props(styles.productTitle)}>{product.title}</h3>
            <hr {...stylex.props(styles.rule)} />
            <p {...stylex.props(styles.mutedText)}>{product.description}</p>
          </div>
          <ul {...stylex.props(styles.list)}>
            {product.tags.map((tag) => (
              <li key={tag} {...stylex.props(styles.mutedText)}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <span aria-hidden="true" {...stylex.props(styles.productGlare)} />
      </div>
    </ZoomReveal>
  );
}

function Products() {
  return (
    <section
      id="products"
      aria-labelledby="oo-products-title"
      {...stylex.props(styles.products, styles.inset120, styles.anchor)}
    >
      <ZoomReveal sx={styles.introBlock}>
        <h2 id="oo-products-title" {...stylex.props(styles.sectionTitle)}>
          {PRODUCTS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{PRODUCTS_INTRO.lead}</p>
      </ZoomReveal>
      <ZoomReveal delay={0.1} sx={styles.productsCta}>
        <a
          href={PRODUCTS_INTRO.cta.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonSmall)}
        >
          {PRODUCTS_INTRO.cta.label}
        </a>
      </ZoomReveal>
      <div id="product-list" {...stylex.props(styles.productGrid)}>
        {PRODUCTS.map((product, index) => (
          <ProductCard key={product.title} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}

function Offices() {
  return (
    <section id="offices" aria-labelledby="oo-offices-title" {...stylex.props(styles.anchor)}>
      <div {...stylex.props(styles.globalBand)}>
        <ZoomReveal sx={styles.globalRow}>
          <div {...stylex.props(styles.mapWrap)}>
            <img
              src={IMAGES.officeMap.src}
              alt={IMAGES.officeMap.alt}
              width={611}
              height={321}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.mapImage)}
            />
            {OFFICE_MAP_PINS.map((pin, index) => (
              <span
                key={`${pin.left}-${pin.top}`}
                aria-hidden="true"
                {...stylex.props(
                  styles.mapRing,
                  styles.mapRingAt(`${pin.left}%`, `${pin.top}%`, `${(index * 370) % 2800}ms`),
                )}
              />
            ))}
          </div>
          <div {...stylex.props(styles.globalCopy)}>
            <h2 id="oo-offices-title" {...stylex.props(styles.sectionTitle)}>
              {GLOBAL_INTRO.title}
            </h2>
            <p {...stylex.props(styles.sectionLead)}>{GLOBAL_INTRO.lead}</p>
          </div>
        </ZoomReveal>
      </div>
      <div {...stylex.props(styles.officesBand)}>
        <div {...stylex.props(styles.shell, styles.inset120, styles.regions)}>
          {OFFICE_COLUMNS.map((column, index) => (
            <ZoomReveal key={column[0].region} delay={index * STAGGER} sx={styles.officeColumn}>
              {column.map((group) => (
                <div key={group.region} {...stylex.props(styles.officeGroup)}>
                  <h3 {...stylex.props(styles.regionHeader)}>{group.region}</h3>
                  <ul {...stylex.props(styles.list, styles.regionBody)}>
                    {group.offices.map((office) => (
                      <li key={office} {...stylex.props(styles.mutedText)}>
                        {office}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ZoomReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionIcon({ open }: { open: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span aria-hidden="true" {...stylex.props(styles.newsIconSlot)}>
      <m.span
        {...stylex.props(styles.newsIconLayer)}
        animate={{ rotate: open ? 45 : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.3, bounce: 0 }}
      >
        <Plus size={16} strokeWidth={2} absoluteStrokeWidth />
      </m.span>
    </span>
  );
}

function NewsItem({
  item,
  open,
  onToggle,
}: {
  item: (typeof NEWS)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = useId();
  return (
    <>
      <h3 {...stylex.props(styles.newsHeading)}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          {...stylex.props(styles.newsTrigger)}
        >
          <span>{item.title}</span>
          <AccordionIcon open={open} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            key="panel"
            id={panelId}
            {...stylex.props(styles.newsPanel)}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
          >
            <div {...stylex.props(styles.newsPanelInner)}>
              {item.details.map((detail) => (
                <p key={detail} {...stylex.props(styles.mutedText)}>
                  {detail}
                </p>
              ))}
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function News() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section
      id="news"
      aria-labelledby="oo-news-title"
      {...stylex.props(styles.news, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.newsInner)}>
        <ZoomReveal>
          <h2 id="oo-news-title" {...stylex.props(styles.sectionTitle)}>
            {NEWS_TITLE}
          </h2>
        </ZoomReveal>
        <ul {...stylex.props(styles.accordion)}>
          {NEWS.map((item, index) => (
            <li key={item.title}>
              <ZoomReveal delay={index * STAGGER} sx={styles.newsItem}>
                <NewsItem
                  item={item}
                  open={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </ZoomReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section
      id="contact"
      aria-labelledby="oo-contact-title"
      {...stylex.props(styles.cta, styles.inset124, styles.anchor)}
    >
      <ZoomReveal sx={styles.ctaInner}>
        <h2 id="oo-contact-title" {...stylex.props(styles.sectionTitle)}>
          {CTA.title}
        </h2>
        <a
          href={CTA.action.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonWide)}
        >
          {CTA.action.label}
        </a>
      </ZoomReveal>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer {...stylex.props(styles.footer)}>
      <div {...stylex.props(styles.shell, styles.inset120, styles.footerInner)}>
        <div {...stylex.props(styles.footerTop)}>
          <img
            src={IMAGES.footerLogo.src}
            alt={IMAGES.footerLogo.alt}
            width={225}
            height={73}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.footerLogo)}
          />
          <nav aria-label="页脚导航" {...stylex.props(styles.footerColumns)}>
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} {...stylex.props(styles.footerColumn)}>
                <h3 {...stylex.props(styles.footerHeading)}>{column.heading}</h3>
                <ul {...stylex.props(styles.footerLinks)}>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#top" {...stylex.props(styles.footerLink)}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <hr {...stylex.props(styles.footerRule)} />
        <div {...stylex.props(styles.footerBottom)}>
          <p {...stylex.props(styles.copyright)}>{COPYRIGHT}</p>
          <div {...stylex.props(styles.social)}>
            <a href="#top" aria-label="LinkedIn" {...stylex.props(styles.socialLink)}>
              <VectorArt paths={LINKEDIN_PATHS} viewBox="0 0 20 20" sx={styles.socialIcon} />
            </a>
            <a href="#top" aria-label="微信" {...stylex.props(styles.socialLink)}>
              <VectorArt paths={WECHAT_PATHS} viewBox="0 0 20 20" sx={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function VariantOO() {
  preinit(GOOGLE_FONTS, { as: "style" });
  const reduce = useReducedMotion();
  const intro = useIntro();
  const introVars = {
    "--oo-intro": intro === "play" ? `${INTRO_REVEAL_MS}ms` : "0ms",
  } as CSSProperties;
  useEffect(() => {
    if (reduce) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollBehavior = previous;
    };
  }, [reduce]);
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div lang="zh-CN" {...stylex.props(styles.root)} style={introVars}>
          <div {...stylex.props(styles.page, intro === "play" && introStyles.pageReveal)}>
            <a href="#main-content" {...stylex.props(styles.skipLink)}>
              跳到主要内容
            </a>
            <SiteHeader />
            <main id="main-content" tabIndex={-1} {...stylex.props(styles.mainTarget)}>
              <Hero />
              <About />
              <Campus />
              <Strengths />
              <Products />
              <Offices />
              <News />
              <ContactCta />
            </main>
            <SiteFooter />
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
