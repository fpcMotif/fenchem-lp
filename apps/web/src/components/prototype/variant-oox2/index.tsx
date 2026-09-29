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
  domAnimation,
  m,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { preinit } from "react-dom";

import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { HeroGradeFilter } from "@/components/prototype/hero-grade";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { LINKEDIN_PATHS, LOGO_PATHS, WECHAT_PATHS, type VectorPath } from "../variant-o/vectors";
import { INTRO_REVEAL_MS, introStyles, useIntro } from "../variant-oos/intro";
import { LiquidImage } from "../variant-oos/liquid-hero";
import {
  ABOUT,
  CAMPUS,
  COPYRIGHT,
  CTA,
  FOOTER_COLUMNS,
  FORK_ACCENT,
  GLOBAL_INTRO,
  HERO,
  IMAGES,
  MARKET_CTA,
  MARKETS,
  NAV_ITEMS,
  NEWS,
  NEWS_TITLE,
  OFFICE_COLUMNS,
  OFFICE_MAP_PINS,
  PASSAGE,
  PRODUCTS_INTRO,
  SOURCE_LABEL,
  STATS,
  STRENGTHS,
  STRENGTHS_INTRO,
  type Market,
  type StrengthIcon,
  type StrengthTone,
} from "./content";

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,500;0,800;1,500&family=Noto+Sans+SC:wght@400;500;700;900&display=swap";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const TINT = "#e6ecf7";
const SURFACE = "#f6f6f6";
const FOOTER_BLUE = "#294f92";
const HERO_OVERLAY = "#0743a9";
const ROUTE_BLUE = "#0743ae";
const ROUTE_GHOST = "rgba(7, 67, 174, 0.14)";
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const SERIF_FONT = '"Instrument Serif", "Times New Roman", serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const DESKTOP_QUERY = "(min-width: 1280px)";
const HOVER_MOTION =
  "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BLOOM_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const INSET_120 = "min(120px, 8.333vw)";
const INSET_118 = "min(118px, 8.194vw)";

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));
const HEADER_HEIGHT = 80;

const PEN = 0.68;
const LANE_SPREAD = 12;
const STATION_INSET = 72;
const CONNECTOR_DROP = 22;
const CONNECTOR_RUN = 90;

const ZOOM_FROM_SCALE = 0.96;
const SETTLED = "translateY(0px) scale(1)";
const zoomFrom = (y: number, scale: number) => `translateY(${y}px) scale(${scale})`;

const [HEADLINE_OPENING, HEADLINE_CLOSING] = HERO.headline;
const [OPENING_BEFORE, OPENING_AFTER] = HEADLINE_OPENING.split(HERO.accent);
const CLOSING_BREAK = HEADLINE_CLOSING.lastIndexOf(" ");
const CLOSING_LEAD = HEADLINE_CLOSING.slice(0, CLOSING_BREAK);
const CLOSING_WORD = HEADLINE_CLOSING.slice(CLOSING_BREAK + 1).replace(/\.$/, "");

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

const introAfter = (ms: number) => `calc(var(--oo-intro, 0ms) + ${ms}ms)`;

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

const sourcePulse = stylex.keyframes({
  "0%": { scale: "0.6", opacity: 0.7 },
  "100%": { scale: "2.2", opacity: 0 },
});

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
    zIndex: 4,
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
    textWrap: "pretty",
  },
  centerText: {
    textAlign: "center",
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
  buttonWide: { width: 160, height: 48 },

  header: {
    position: "fixed",
    top: 0,
    insetInline: 0,
    zIndex: 3,
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

  journey: {
    position: "relative",
  },
  route: {
    display: { default: "none", [DESKTOP]: "block" },
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    overflow: "visible",
    pointerEvents: "none",
  },
  routeGhost: {
    fill: "none",
    stroke: ROUTE_GHOST,
    strokeWidth: 1.5,
  },
  routeInk: {
    fill: "none",
    stroke: ROUTE_BLUE,
    strokeWidth: 1.5,
    strokeLinecap: "butt",
    strokeLinejoin: "round",
  },
  nodeRing: {
    fill: "#ffffff",
    stroke: ROUTE_BLUE,
    strokeWidth: 1.5,
  },
  nodeRingSoft: {
    fill: "#ffffff",
    stroke: ROUTE_GHOST,
    strokeWidth: 1.5,
  },
  nodeCore: {
    fill: ROUTE_BLUE,
  },
  nodeHalo: {
    fill: "none",
    stroke: ROUTE_BLUE,
    strokeWidth: 1,
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
    opacity: 0,
    animationName: { default: sourcePulse, [breakpoints.motionReduce]: "none" },
    animationDuration: "2600ms",
    animationTimingFunction: EASE_OUT_CSS,
    animationIterationCount: "infinite",
  },
  anchorDot: {
    display: { default: "none", [DESKTOP]: "block" },
    width: 18,
    height: 18,
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
    fontFamily: DISPLAY_FONT,
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
    fontFamily: SERIF_FONT,
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
  heroSource: {
    display: { default: "none", [DESKTOP]: "flex" },
    position: "absolute",
    left: "50%",
    bottom: 132,
    alignItems: "center",
    gap: 18,
    marginLeft: -9,
    animationName: fadeIn,
    animationDuration: "900ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 1100ms)",
    animationTimingFunction: EASE_OUT_CSS,
    animationFillMode: "both",
  },
  heroSourceLabel: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.4em",
    color: INK,
  },

  about: {
    paddingTop: { default: 72, [DESKTOP]: 128 },
    paddingBottom: { default: 48, [DESKTOP]: 72 },
    backgroundColor: colors.paper,
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [DESKTOP]: "minmax(0, 1fr) 160px minmax(0, 1fr)",
    },
    rowGap: 24,
    alignItems: "start",
  },
  aboutTitle: {
    gridColumn: { default: "1", [DESKTOP]: "1" },
    textAlign: { default: "start", [DESKTOP]: "end" },
  },
  aboutBody: {
    gridColumn: { default: "1", [DESKTOP]: "3" },
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
  },
  aboutText: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 18 },
    fontWeight: 500,
    lineHeight: 1.9,
    color: INK,
    textWrap: "pretty",
  },

  products: {
    position: "relative",
    backgroundColor: colors.paper,
  },
  productsIntro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 36,
    paddingTop: { default: 72, [DESKTOP]: 64 },
  },
  introStack: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 18,
    textAlign: "center",
  },
  forkAccent: {
    margin: 0,
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontSize: { default: 26, [DESKTOP]: 36 },
    lineHeight: 1.1,
    color: colors.brandGreen800,
  },
  introLead: {
    maxWidth: 620,
  },
  forkSpace: {
    height: { default: 40, [DESKTOP]: 360 },
  },
  rowList: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: { default: 72, [DESKTOP]: 150 },
    margin: 0,
    paddingBlock: 0,
    paddingInlineEnd: 0,
    paddingInlineStart: { default: 32, [DESKTOP]: 0 },
    listStyleType: "none",
    "::before": {
      content: '""',
      display: { default: "block", [DESKTOP]: "none" },
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 7,
      width: 1.5,
      backgroundColor: ROUTE_BLUE,
    },
  },
  row: {
    position: "relative",
    display: "flex",
    flexDirection: { default: "column", [DESKTOP]: "row" },
    alignItems: { default: "stretch", [DESKTOP]: "flex-start" },
    gap: { default: 28, [DESKTOP]: "min(104px, 7vw)" },
    scrollMarginTop: HEADER_HEIGHT + 24,
  },
  rowFlip: {
    flexDirection: { default: "column", [DESKTOP]: "row-reverse" },
  },
  rowNode: {
    display: { default: "block", [DESKTOP]: "none" },
    position: "absolute",
    top: 24,
    left: -32,
    width: 15,
    height: 15,
    boxSizing: "border-box",
    borderRadius: "50%",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: ROUTE_BLUE,
    backgroundColor: ROUTE_BLUE,
    boxShadow: "0 0 0 4px #ffffff",
  },
  figure: {
    position: "relative",
    flexShrink: 0,
    width: { default: "100%", [DESKTOP]: "44%" },
    maxWidth: { default: 545, [DESKTOP]: "none" },
    aspectRatio: "545 / 614",
    margin: 0,
    overflow: "hidden",
    backgroundColor: SURFACE,
  },
  figureImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "grayscale(1) contrast(0.92) brightness(1.06)",
    opacity: 0.55,
    scale: "1.06",
    transitionProperty: "filter, opacity, scale",
    transitionDuration: { default: "1100ms", [breakpoints.motionReduce]: "0ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  figureImageLit: {
    filter: "grayscale(0) contrast(1) brightness(1)",
    opacity: 1,
    scale: "1",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 16, [DESKTOP]: 20 },
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 0,
    maxWidth: 540,
  },
  copyLow: {
    alignSelf: { default: "auto", [DESKTOP]: "flex-end" },
    paddingBottom: { default: 0, [DESKTOP]: 24 },
  },
  copyHigh: {
    alignSelf: { default: "auto", [DESKTOP]: "flex-start" },
    paddingTop: { default: 0, [DESKTOP]: 40 },
  },
  rowLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    margin: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.06em",
    textTransform: "lowercase",
    color: BODY_TEXT,
    transitionProperty: "color",
    transitionDuration: "600ms",
    transitionTimingFunction: "ease",
  },
  rowLabelLit: {
    color: colors.brandBlue700,
  },
  rowLabelDot: {
    width: 9,
    height: 9,
    boxSizing: "border-box",
    borderRadius: "50%",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "currentColor",
    backgroundColor: "transparent",
    transitionProperty: "background-color",
    transitionDuration: "600ms",
    transitionTimingFunction: "ease",
  },
  rowLabelDotLit: {
    backgroundColor: "currentColor",
  },
  rowTitle: {
    margin: 0,
    fontSize: { default: 30, [TABLET]: 40, [DESKTOP]: "min(52px, 3.8vw)" },
    fontWeight: 700,
    lineHeight: 1.12,
    color: INK,
  },
  rowPitch: {
    margin: 0,
    marginTop: -4,
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontSize: { default: 24, [DESKTOP]: 30 },
    lineHeight: 1.05,
    color: colors.brandGreen800,
  },
  rowKicker: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 17 },
    lineHeight: 1.7,
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  rowTags: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 10,
    rowGap: 6,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    fontSize: 15,
    lineHeight: 1.6,
    color: INK,
  },
  rowTagSlash: {
    color: colors.brandBlue300,
  },
  rowLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: { default: colors.brandBlue700, ":hover": colors.brandBlue900 },
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.2,
    color: { default: colors.brandBlue700, ":hover": colors.brandBlue900 },
    textDecoration: "none",
    transitionProperty: "color, border-color",
    transitionDuration: "160ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  rowLinkArrow: {
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: { default: null, [HOVER_MOTION]: "translate(2px, -2px)" },
    },
    transitionProperty: "transform",
    transitionDuration: "200ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  rejoinSpace: {
    height: { default: 72, [DESKTOP]: 360 },
  },

  cta: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: { default: 72, [DESKTOP]: 40 },
    paddingBottom: { default: 88, [DESKTOP]: 120 },
    backgroundColor: TINT,
  },
  ctaInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    maxWidth: 720,
    paddingTop: { default: 0, [DESKTOP]: 40 },
    textAlign: "center",
  },
  ctaMarkets: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: 0,
    marginBlock: 8,
    padding: 0,
    listStyleType: "none",
  },
  ctaMarketItem: {
    display: "flex",
    borderInlineStartWidth: { default: 1, ":first-child": 0 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: "rgba(7, 67, 174, 0.28)",
  },
  ctaMarket: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    minHeight: 44,
    paddingInline: { default: 12, [breakpoints.md]: 20 },
    fontSize: 16,
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

  strengths: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 48,
    paddingBlock: { default: 72, [DESKTOP]: 112 },
    backgroundColor: colors.paper,
  },
  introBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    maxWidth: 768,
    textAlign: "center",
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

  passage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
    paddingTop: { default: 96, [DESKTOP]: 200 },
    paddingBottom: { default: 96, [DESKTOP]: 220 },
    backgroundColor: colors.paper,
    textAlign: "center",
  },
  passageStem: {
    width: 1.5,
    height: { default: 56, [DESKTOP]: 96 },
    backgroundColor: ROUTE_BLUE,
  },
  passageLine: {
    margin: 0,
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 40, [TABLET]: 60, [DESKTOP]: "min(92px, 6.4vw)" },
    lineHeight: 1.02,
    letterSpacing: "-0.015em",
    color: INK,
    textWrap: "balance",
  },
  passageMotto: {
    margin: 0,
    fontSize: { default: 14, [DESKTOP]: 16 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.5em",
    color: BODY_TEXT,
  },

  campusFrame: {
    overflow: "hidden",
    width: "100%",
    aspectRatio: "1440 / 716",
  },
  campusImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  statsBand: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    gap: { default: 32, [breakpoints.md]: 40 },
    paddingBlock: { default: 48, [DESKTOP]: 72 },
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  statLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.2em",
    color: BODY_TEXT,
  },
  statCaption: {
    margin: 0,
    fontSize: { default: 20, [DESKTOP]: 24 },
    fontWeight: 700,
    lineHeight: 1.3,
    color: INK,
  },
  statFigure: {
    margin: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.04em",
    color: colors.brandBlue700,
    fontVariantNumeric: "tabular-nums",
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
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    margin: 0,
    padding: 0,
    listStyleType: "none",
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

type NodeKind = "source" | "joint" | "station" | "tick" | "end";
type RouteSegment = { id: string; d: string; top: number; bottom: number };
type RouteNode = { id: string; x: number; y: number; kind: NodeKind };
type Route = {
  width: number;
  height: number;
  top: number;
  viewport: number;
  segments: RouteSegment[];
  nodes: RouteNode[];
  stations: number[];
};

const NODE_RADIUS: Record<NodeKind, { ring: number; core: number }> = {
  source: { ring: 9, core: 5 },
  joint: { ring: 0, core: 3 },
  station: { ring: 8, core: 4 },
  tick: { ring: 0, core: 2.5 },
  end: { ring: 11, core: 6 },
};

function subscribeDesktop(onChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function useDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

function offsetWithin(element: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent instanceof HTMLElement ? node.offsetParent : null;
  }
  return { x, y, width: element.offsetWidth, height: element.offsetHeight };
}

const swoop = (x0: number, y0: number, x1: number, y1: number) => {
  const middle = (y0 + y1) / 2;
  return `M${x0} ${y0}C${x0} ${middle} ${x1} ${middle} ${x1} ${y1}`;
};

function buildRoute(root: HTMLElement): Route | null {
  const find = (name: string) => root.querySelector<HTMLElement>(`[data-route="${name}"]`);
  const sourceElement = find("source");
  const inletElement = find("inlet");
  const outletElement = find("outlet");
  const rejoinElement = find("rejoin");
  const endElement = find("end");
  const figureElements = MARKETS.map((_, index) => find(`figure-${index}`));
  if (!sourceElement || !inletElement || !outletElement || !rejoinElement || !endElement) {
    return null;
  }
  const figures = figureElements.flatMap((element) =>
    element ? [offsetWithin(element, root)] : [],
  );
  if (figures.length !== MARKETS.length) return null;
  const centerOf = (element: HTMLElement) => {
    const box = offsetWithin(element, root);
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  };
  const width = root.offsetWidth;
  const source = centerOf(sourceElement);
  const inlet = centerOf(inletElement);
  const outlet = centerOf(outletElement);
  const end = centerOf(endElement);
  const rejoin = offsetWithin(rejoinElement, root);
  const [first, second] = figures;
  if (!first || !second) return null;
  const leftMargin = first.x / 2;
  const rightEdge = second.x + second.width;
  const rightMargin = rightEdge + (width - rightEdge) / 2;
  const splitY = outlet.y + (first.y - outlet.y) * 0.56;
  const lanesY = first.y - 16;
  const rejoinTop = rejoin.y;
  const rejoinBottom = rejoin.y + rejoin.height;
  const mergeY = rejoinTop + rejoin.height * 0.34;
  const laneX = MARKETS.map((_, index) => {
    const onLeft = index % 2 === 0;
    const inner = index < 2;
    const base = onLeft ? leftMargin : rightMargin;
    const inward = onLeft ? 1 : -1;
    return base + inward * (inner ? LANE_SPREAD : -LANE_SPREAD);
  });
  const segments: RouteSegment[] = [
    { id: "stem", d: swoop(source.x, source.y, inlet.x, inlet.y), top: source.y, bottom: inlet.y },
    {
      id: "fork-left",
      d: swoop(outlet.x, outlet.y, leftMargin, splitY),
      top: outlet.y,
      bottom: splitY,
    },
    {
      id: "fork-right",
      d: swoop(outlet.x, outlet.y, rightMargin, splitY),
      top: outlet.y,
      bottom: splitY,
    },
  ];
  const nodes: RouteNode[] = [
    { id: "source", ...source, kind: "source" },
    { id: "inlet", ...inlet, kind: "joint" },
    { id: "outlet", ...outlet, kind: "joint" },
    { id: "split-left", x: leftMargin, y: splitY, kind: "joint" },
    { id: "split-right", x: rightMargin, y: splitY, kind: "joint" },
  ];
  const stations: number[] = [];
  laneX.forEach((x, index) => {
    const origin = index % 2 === 0 ? leftMargin : rightMargin;
    const figure = figures[index];
    if (!figure) return;
    const onLeft = index % 2 === 0;
    const toward = onLeft ? 1 : -1;
    const edge = onLeft ? figure.x : figure.x + figure.width;
    const stationY = figure.y + STATION_INSET;
    segments.push(
      { id: `split-${index}`, d: swoop(origin, splitY, x, lanesY), top: splitY, bottom: lanesY },
      { id: `lane-${index}`, d: `M${x} ${lanesY}V${rejoinTop}`, top: lanesY, bottom: rejoinTop },
      {
        id: `reach-${index}`,
        d: `M${x} ${stationY}H${x + toward * 10}L${edge - toward * 14} ${stationY + CONNECTOR_DROP}H${edge}`,
        top: stationY,
        bottom: stationY + CONNECTOR_RUN,
      },
      {
        id: `merge-${index}`,
        d: swoop(x, rejoinTop, origin, mergeY),
        top: rejoinTop,
        bottom: mergeY,
      },
    );
    nodes.push(
      { id: `station-${index}`, x, y: stationY, kind: "station" },
      { id: `tick-${index}`, x: edge, y: stationY + CONNECTOR_DROP, kind: "tick" },
    );
    stations.push(stationY);
  });
  segments.push(
    {
      id: "join-left",
      d: swoop(leftMargin, mergeY, end.x, rejoinBottom),
      top: mergeY,
      bottom: rejoinBottom,
    },
    {
      id: "join-right",
      d: swoop(rightMargin, mergeY, end.x, rejoinBottom),
      top: mergeY,
      bottom: rejoinBottom,
    },
    { id: "arrive", d: `M${end.x} ${rejoinBottom}V${end.y}`, top: rejoinBottom, bottom: end.y },
  );
  nodes.push(
    { id: "merge-left", x: leftMargin, y: mergeY, kind: "joint" },
    { id: "merge-right", x: rightMargin, y: mergeY, kind: "joint" },
    { id: "join", x: end.x, y: rejoinBottom, kind: "joint" },
    { id: "end", ...end, kind: "end" },
  );
  return {
    width,
    height: root.offsetHeight,
    top: root.getBoundingClientRect().top + window.scrollY,
    viewport: window.innerHeight,
    segments,
    nodes,
    stations,
  };
}

function useRoute(rootRef: RefObject<HTMLDivElement | null>, enabled: boolean) {
  const [route, setRoute] = useState<Route | null>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) {
      setRoute(null);
      return;
    }
    let frame = 0;
    const measure = () => {
      frame = 0;
      setRoute(buildRoute(root));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [rootRef, enabled]);
  return route;
}

function RouteStroke({
  segment,
  pen,
  still,
}: {
  segment: RouteSegment;
  pen: MotionValue<number>;
  still: boolean;
}) {
  const progress = useTransform(
    pen,
    [segment.top, Math.max(segment.bottom, segment.top + 1)],
    [0, 1],
  );
  return (
    <m.path
      d={segment.d}
      {...stylex.props(styles.routeInk)}
      style={still ? undefined : { pathLength: progress }}
    />
  );
}

function RouteMark({
  node,
  pen,
  still,
}: {
  node: RouteNode;
  pen: MotionValue<number>;
  still: boolean;
}) {
  const lit = useTransform(pen, [node.y - 2, node.y], [0, 1]);
  const { ring, core } = NODE_RADIUS[node.kind];
  const always = still || node.kind === "source";
  return (
    <g>
      {node.kind === "source" ? (
        <circle cx={node.x} cy={node.y} r={ring} {...stylex.props(styles.nodeHalo)} />
      ) : null}
      {ring > 0 ? (
        <circle cx={node.x} cy={node.y} r={ring} {...stylex.props(styles.nodeRing)} />
      ) : (
        <circle cx={node.x} cy={node.y} r={core} {...stylex.props(styles.nodeRingSoft)} />
      )}
      <m.circle
        cx={node.x}
        cy={node.y}
        r={core}
        {...stylex.props(styles.nodeCore)}
        style={always ? undefined : { opacity: lit }}
      />
    </g>
  );
}

function ForkRoute({
  route,
  pen,
  still,
}: {
  route: Route;
  pen: MotionValue<number>;
  still: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={route.width}
      height={route.height}
      viewBox={`0 0 ${route.width} ${route.height}`}
      {...stylex.props(styles.route)}
    >
      <path
        d={route.segments.map((segment) => segment.d).join("")}
        {...stylex.props(styles.routeGhost)}
      />
      {route.segments.map((segment) => (
        <RouteStroke key={segment.id} segment={segment} pen={pen} still={still} />
      ))}
      {route.nodes.map((node) => (
        <RouteMark key={node.id} node={node} pen={pen} still={still} />
      ))}
    </svg>
  );
}

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

function FadeReveal({ children, sx }: { children: ReactNode; sx?: StyleXStyles }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      {...stylex.props(sx)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0.2 : 1, ease: EASE }}
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

function useScrolledPastTop() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return scrolled;
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
  const closeOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && menuOpen) setMenuOpen(false);
  };
  const isActive = (href: string) => href.slice(1) === activeId;
  return (
    <header
      onKeyDown={closeOnEscape}
      {...stylex.props(styles.header, (scrolled || menuOpen) && styles.headerSolid)}
    >
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
    <section
      ref={heroRef}
      id="top"
      aria-labelledby="oox2-hero-title"
      {...stylex.props(styles.hero)}
    >
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
          <h1 id="oox2-hero-title" {...stylex.props(styles.heroTitle)}>
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
      <div aria-hidden="true" {...stylex.props(styles.heroSource)}>
        <span data-route="source" {...stylex.props(styles.anchorDot)} />
        <span {...stylex.props(styles.heroSourceLabel)}>{SOURCE_LABEL}</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      aria-labelledby="oox2-about-title"
      {...stylex.props(styles.about, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.aboutGrid)}>
        <ZoomReveal sx={styles.aboutTitle}>
          <h2 id="oox2-about-title" {...stylex.props(styles.sectionTitle)}>
            {ABOUT.title}
          </h2>
        </ZoomReveal>
        <ZoomReveal delay={0.08} sx={styles.aboutBody}>
          <p {...stylex.props(styles.aboutText)}>{ABOUT.body}</p>
          <a
            href={ABOUT.cta.href}
            {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonCompact)}
          >
            {ABOUT.cta.label}
          </a>
        </ZoomReveal>
      </div>
    </section>
  );
}

function ProductRow({ market, index, lit }: { market: Market; index: number; lit: boolean }) {
  const titleId = useId();
  const flip = index % 2 === 1;
  return (
    <li
      id={`oox2-market-${market.id}`}
      aria-labelledby={titleId}
      {...stylex.props(styles.row, flip && styles.rowFlip)}
    >
      <span aria-hidden="true" {...stylex.props(styles.rowNode)} />
      <figure data-route={`figure-${index}`} {...stylex.props(styles.figure)}>
        <img
          src={market.image}
          alt={market.title}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.figureImage, lit && styles.figureImageLit)}
        />
      </figure>
      <ZoomReveal sx={[styles.copy, flip ? styles.copyHigh : styles.copyLow]}>
        <p lang="en" {...stylex.props(styles.rowLabel, lit && styles.rowLabelLit)}>
          <span
            aria-hidden="true"
            {...stylex.props(styles.rowLabelDot, lit && styles.rowLabelDotLit)}
          />
          {market.english}
        </p>
        <h3 id={titleId} {...stylex.props(styles.rowTitle)}>
          {market.title}
        </h3>
        <p lang="en" {...stylex.props(styles.rowPitch)}>
          {market.pitch}
        </p>
        <p {...stylex.props(styles.rowKicker)}>{market.kicker}</p>
        <ul aria-label={`${market.title} 细分方向`} {...stylex.props(styles.rowTags)}>
          {market.tags.map((tag, tagIndex) => (
            <Fragment key={tag}>
              {tagIndex > 0 ? (
                <li aria-hidden="true" {...stylex.props(styles.rowTagSlash)}>
                  /
                </li>
              ) : null}
              <li>{tag}</li>
            </Fragment>
          ))}
        </ul>
        <a href={MARKET_CTA.href} {...stylex.props(styles.rowLink, stylex.defaultMarker())}>
          {MARKET_CTA.label}
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            absoluteStrokeWidth
            aria-hidden="true"
            {...stylex.props(styles.rowLinkArrow)}
          />
        </a>
      </ZoomReveal>
    </li>
  );
}

function Products({ lit }: { lit: number }) {
  return (
    <section
      id="products"
      aria-labelledby="oox2-products-title"
      {...stylex.props(styles.products, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120)}>
        <div {...stylex.props(styles.productsIntro)}>
          <span aria-hidden="true" data-route="inlet" {...stylex.props(styles.anchorDot)} />
          <FadeReveal sx={styles.introStack}>
            <h2 id="oox2-products-title" {...stylex.props(styles.sectionTitle)}>
              {PRODUCTS_INTRO.title}
            </h2>
            <p lang="en" {...stylex.props(styles.forkAccent)}>
              {FORK_ACCENT}
            </p>
            <p {...stylex.props(styles.sectionLead, styles.introLead)}>{PRODUCTS_INTRO.lead}</p>
          </FadeReveal>
          <span aria-hidden="true" data-route="outlet" {...stylex.props(styles.anchorDot)} />
        </div>
        <div aria-hidden="true" {...stylex.props(styles.forkSpace)} />
        <ul {...stylex.props(styles.rowList)}>
          {MARKETS.map((market, index) => (
            <ProductRow key={market.id} market={market} index={index} lit={index < lit} />
          ))}
        </ul>
        <div aria-hidden="true" data-route="rejoin" {...stylex.props(styles.rejoinSpace)} />
      </div>
    </section>
  );
}

function ContactCta() {
  return (
    <section
      id="contact"
      aria-labelledby="oox2-contact-title"
      {...stylex.props(styles.cta, styles.inset120, styles.anchor)}
    >
      <span aria-hidden="true" data-route="end" {...stylex.props(styles.anchorDot)} />
      <ZoomReveal sx={styles.ctaInner}>
        <h2 id="oox2-contact-title" {...stylex.props(styles.sectionTitle)}>
          {CTA.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{CTA.lead}</p>
        <ul aria-label="选择应用领域" {...stylex.props(styles.ctaMarkets)}>
          {MARKETS.map((market) => (
            <li key={market.id} {...stylex.props(styles.ctaMarketItem)}>
              <a href={`#oox2-market-${market.id}`} {...stylex.props(styles.ctaMarket)}>
                {market.title}
                <ArrowUpRight size={14} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
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

function Journey() {
  const rootRef = useRef<HTMLDivElement>(null);
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const route = useRoute(rootRef, desktop);
  const drawing = desktop && !reduce && route !== null;
  const { scrollY } = useScroll();
  const pen = useTransform(scrollY, (value) =>
    route ? value + route.viewport * PEN - route.top : -1,
  );
  const [reached, setReached] = useState(0);
  useMotionValueEvent(scrollY, "change", (value) => {
    if (!route) return;
    const at = value + route.viewport * PEN - route.top;
    const next = route.stations.filter((y) => at >= y).length;
    setReached((previous) => (previous === next ? previous : next));
  });
  useEffect(() => {
    if (!route) return;
    const at = scrollY.get() + route.viewport * PEN - route.top;
    setReached(route.stations.filter((y) => at >= y).length);
  }, [route, scrollY]);
  return (
    <div ref={rootRef} {...stylex.props(styles.journey)}>
      <Hero />
      <About />
      <Products lit={drawing ? reached : MARKETS.length} />
      <ContactCta />
      {route ? <ForkRoute route={route} pen={pen} still={!drawing} /> : null}
    </div>
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
      aria-labelledby="oox2-strengths-title"
      {...stylex.props(styles.strengths, styles.inset120, styles.anchor)}
    >
      <ZoomReveal sx={styles.introBlock}>
        <h2 id="oox2-strengths-title" {...stylex.props(styles.sectionTitle)}>
          {STRENGTHS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead, styles.centerText)}>{STRENGTHS_INTRO.lead}</p>
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

function Passage() {
  return (
    <section aria-label={PASSAGE.motto} {...stylex.props(styles.passage, styles.inset120)}>
      <span aria-hidden="true" {...stylex.props(styles.passageStem)} />
      <FadeReveal>
        <p lang="en" {...stylex.props(styles.passageLine)}>
          {PASSAGE.line}
        </p>
      </FadeReveal>
      <p {...stylex.props(styles.passageMotto)}>{PASSAGE.motto}</p>
    </section>
  );
}

function Campus() {
  const reduce = useReducedMotion();
  return (
    <section id="campus" aria-labelledby="oox2-campus-title" {...stylex.props(styles.anchor)}>
      <h2 id="oox2-campus-title" {...stylex.props(styles.visuallyHidden)}>
        {CAMPUS.label}
      </h2>
      <div {...stylex.props(styles.campusFrame)}>
        <m.img
          src={IMAGES.campus.src}
          alt={IMAGES.campus.alt}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.campusImage)}
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduce ? 0 : 1.6, ease: EASE }}
        />
      </div>
      <div {...stylex.props(styles.shell, styles.inset120, styles.statsBand)}>
        {STATS.map((stat, index) => (
          <ZoomReveal key={stat.label} delay={index * STAGGER} sx={styles.stat}>
            <p {...stylex.props(styles.statLabel)}>{stat.label}</p>
            <p {...stylex.props(styles.statCaption)}>{stat.caption}</p>
            <p {...stylex.props(styles.statFigure)}>
              {stat.value}
              {stat.unit ?? ""}
            </p>
          </ZoomReveal>
        ))}
      </div>
    </section>
  );
}

function Offices() {
  return (
    <section id="offices" aria-labelledby="oox2-offices-title" {...stylex.props(styles.anchor)}>
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
            <h2 id="oox2-offices-title" {...stylex.props(styles.sectionTitle)}>
              {GLOBAL_INTRO.title}
            </h2>
            <p {...stylex.props(styles.sectionLead, styles.centerText)}>{GLOBAL_INTRO.lead}</p>
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
      aria-labelledby="oox2-news-title"
      {...stylex.props(styles.news, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.newsInner)}>
        <ZoomReveal>
          <h2 id="oox2-news-title" {...stylex.props(styles.sectionTitle)}>
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

export function VariantOOX2() {
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
              <Journey />
              <Strengths />
              <Passage />
              <Campus />
              <Offices />
              <News />
            </main>
            <SiteFooter />
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
