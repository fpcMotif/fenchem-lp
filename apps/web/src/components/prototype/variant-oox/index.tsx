import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  ArrowDown,
  ArrowDownRight,
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
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
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
  ECHO,
  FOOTER_COLUMNS,
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
  PRODUCTS_INTRO,
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
const HAIRLINE = "rgba(26, 26, 26, 0.14)";
const WORD_ON_PAPER = "#e9eef7";
const WORD_ON_SURFACE = "#e3e9f3";
const WORD_ON_TINT = "#d7e1f1";
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const SERIF_FONT = '"Instrument Serif", "Times New Roman", serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const CROSSING_QUERY = "(min-width: 1280px) and (prefers-reduced-motion: no-preference)";
const CROSSING = `@media ${CROSSING_QUERY}`;
const DESKTOP_STILL = "@media (min-width: 1280px) and (prefers-reduced-motion: reduce)";
const QUADRANT_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BLOOM_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const INSET_120 = "min(120px, 8.333vw)";
const INSET_118 = "min(118px, 8.194vw)";

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));
const HEADER_HEIGHT = 80;

const RUN_ID = "oox-market-run";
const CROSS_STOPS = [0, 0.1, 0.3, 0.4, 0.6, 0.7, 0.9, 1];
const CROSS_TRACK = [0, 0, 1, 1, 2, 2, 3, 3];
const HOLD_CENTERS = [0.05, 0.35, 0.65, 0.95] as const;
const LAST_MARKET = MARKETS.length - 1;

const ZOOM_FROM_SCALE = 0.96;
const SETTLED = "translateY(0px) scale(1)";
const zoomFrom = (y: number, scale: number) => `translateY(${y}px) scale(${scale})`;
const twoDigits = (value: number) => String(value).padStart(2, "0");
const threeDigits = (value: number) => String(Math.round(value * 100)).padStart(3, "0");

const [HEADLINE_OPENING, HEADLINE_CLOSING] = HERO.headline;
const [OPENING_BEFORE, OPENING_AFTER] = HEADLINE_OPENING.split(HERO.accent);
const CLOSING_BREAK = HEADLINE_CLOSING.lastIndexOf(" ");
const CLOSING_LEAD = HEADLINE_CLOSING.slice(0, CLOSING_BREAK);
const CLOSING_WORD = HEADLINE_CLOSING.slice(CLOSING_BREAK + 1).replace(/\.$/, "");

const ABOUT_PHRASES = ABOUT.body.split(/(?<=[，。、])/);
const DIGIT_CELLS = Array.from({ length: 20 }, (_, position) => ({
  id: `cell-${position}`,
  digit: position % 10,
}));
const RING_RADIUS = 62;
const RING_LENGTH = Math.round(2 * Math.PI * RING_RADIUS);

const STRENGTH_ICONS: Record<StrengthIcon, LucideIcon> = {
  globe: Globe,
  shield: Shield,
  bulb: Lightbulb,
  users: Users,
};

const QUADRANT_DIRECTIONS = [
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
] as const;

const PATTERN_CELLS = Array.from({ length: 15 }, (_, column) =>
  (column % 2 === 0 ? [0, 65, 130, 195, 260] : [32.5, 97.5, 162.5, 227.5]).map((top) => ({
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

const riseIn = stylex.keyframes({
  "0%": { opacity: 0, translate: "0px 14px" },
  "100%": { opacity: 1, translate: "0px 0px" },
});

const pinPulse = stylex.keyframes({
  "0%": { scale: "0.2", opacity: 0.85 },
  "100%": { scale: "2.4", opacity: 0 },
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

  regMark: {
    position: "absolute",
    width: 13,
    height: 13,
    color: colors.brandBlue700,
    pointerEvents: "none",
    backgroundImage:
      "linear-gradient(currentColor, currentColor), linear-gradient(currentColor, currentColor)",
    backgroundSize: "100% 1px, 1px 100%",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat",
  },
  regTopLeft: { top: -6, left: -6 },
  regTopRight: { top: -6, right: -6 },
  regBottomLeft: { bottom: -6, left: -6 },
  regBottomRight: { bottom: -6, right: -6 },
  regOnDark: { color: colors.paper },

  headRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 16,
    rowGap: 4,
  },
  headRowCenter: {
    justifyContent: "center",
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
    textWrap: "balance",
  },
  echo: {
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 24, [DESKTOP]: 32 },
    lineHeight: 1,
    letterSpacing: "-0.01em",
    color: colors.brandGreen800,
    textTransform: "lowercase",
  },
  sectionLead: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 18 },
    lineHeight: 1.6,
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  mutedText: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.2,
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  head: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 768,
  },
  headCenter: {
    alignItems: "center",
    marginInline: "auto",
    textAlign: "center",
  },
  verticalLabel: {
    writingMode: "vertical-rl",
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.42em",
    color: BODY_TEXT,
  },
  upright: {
    textCombineUpright: "all",
    fontFamily: DISPLAY_FONT,
    letterSpacing: 0,
    color: colors.brandBlue700,
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
  heroRise: {
    animationName: { default: riseIn, [breakpoints.motionReduce]: fadeIn },
    animationDuration: { default: "900ms", [breakpoints.motionReduce]: "300ms" },
    animationTimingFunction: EASE_OUT_CSS,
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
    height: { default: "auto", [DESKTOP]: "100%" },
    paddingTop: { default: 176, [DESKTOP]: 300 },
    paddingBottom: { default: 72, [DESKTOP]: 44 },
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
  heroMotto: {
    display: { default: "none", [DESKTOP]: "flex" },
    position: "absolute",
    top: 300,
    right: `calc(${INSET_120} / 2 - 6px)`,
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    color: INK,
  },
  heroMottoRule: {
    width: 1,
    height: 56,
    backgroundColor: INK,
  },
  heroMottoText: {
    color: INK,
    letterSpacing: "0.5em",
  },
  heroIndex: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: "repeat(4, minmax(0, 1fr))",
    },
    columnGap: { default: 16, [DESKTOP]: 0 },
    rowGap: 20,
    marginTop: { default: 24, [DESKTOP]: "auto" },
    marginBottom: 0,
    padding: 0,
    listStyleType: "none",
  },
  heroIndexItem: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
    minHeight: { default: 64, [DESKTOP]: 76 },
    paddingTop: 16,
    paddingBottom: 4,
    paddingInlineEnd: { default: 0, [DESKTOP]: 24 },
    boxSizing: "border-box",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: { default: "rgba(26, 26, 26, 0.3)", ":hover": colors.brandBlue700 },
    color: { default: INK, ":hover": colors.brandBlue700 },
    textDecoration: "none",
    transitionProperty: "color, border-color",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  heroIndexText: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  heroIndexNumber: {
    fontFamily: DISPLAY_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
  },
  heroIndexName: {
    fontSize: { default: 15, [DESKTOP]: 17 },
    fontWeight: 500,
    lineHeight: 1.2,
  },
  turnArrow: {
    flexShrink: 0,
    display: "block",
    rotate: {
      default: "0deg",
      [stylex.when.ancestor(":hover")]: "-45deg",
      [stylex.when.ancestor(":focus-visible")]: "-45deg",
    },
    transitionProperty: "rotate",
    transitionDuration: "320ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },

  about: {
    paddingTop: { default: 72, [DESKTOP]: 144 },
    paddingBottom: { default: 24, [DESKTOP]: 48 },
    backgroundColor: colors.paper,
  },
  aboutGrid: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [DESKTOP]: "minmax(0, 3fr) minmax(0, 9fr)",
    },
    gap: { default: 32, [DESKTOP]: 48 },
  },
  aboutHead: {
    display: "flex",
    flexDirection: { default: "row", [DESKTOP]: "row-reverse" },
    justifyContent: { default: "flex-start", [DESKTOP]: "flex-end" },
    alignItems: { default: "baseline", [DESKTOP]: "flex-start" },
    gap: 16,
  },
  aboutTitle: {
    writingMode: { default: "horizontal-tb", [DESKTOP]: "vertical-rl" },
    letterSpacing: { default: 0, [DESKTOP]: "0.18em" },
  },
  aboutEcho: {
    writingMode: { default: "horizontal-tb", [DESKTOP]: "vertical-rl" },
  },
  aboutBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 40,
    maxWidth: 820,
  },
  aboutText: {
    margin: 0,
    fontSize: { default: 19, [TABLET]: 22, [DESKTOP]: 26 },
    fontWeight: 500,
    lineHeight: 1.75,
    color: INK,
    textWrap: "pretty",
  },
  inkPhrase: {
    transitionProperty: "opacity",
    transitionDuration: "120ms",
    transitionTimingFunction: "linear",
  },

  productsIntro: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [DESKTOP]: "auto minmax(0, 1fr) auto",
    },
    alignItems: "end",
    gap: { default: 24, [DESKTOP]: 40 },
    paddingTop: { default: 72, [DESKTOP]: 120 },
    paddingBottom: { default: 24, [DESKTOP]: 56 },
  },
  productsEyebrow: {
    display: { default: "none", [DESKTOP]: "block" },
    alignSelf: "stretch",
    paddingInlineEnd: 20,
    borderInlineEndWidth: 1,
    borderInlineEndStyle: "solid",
    borderInlineEndColor: HAIRLINE,
  },
  crossHint: {
    display: { default: "none", [CROSSING]: "inline-flex" },
    alignItems: "center",
    gap: 12,
    margin: 0,
    fontSize: 14,
    lineHeight: 1.3,
    color: BODY_TEXT,
    whiteSpace: "nowrap",
  },
  crossHintArrow: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: "50%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    color: colors.brandBlue700,
  },

  run: {
    position: "relative",
    height: { default: "auto", [CROSSING]: "400vh" },
  },
  runViewport: {
    position: { default: "relative", [CROSSING]: "sticky" },
    top: 0,
    height: { default: "auto", [CROSSING]: "100vh" },
    overflow: { default: "visible", [CROSSING]: "clip" },
    backgroundColor: colors.paper,
  },
  runTrack: {
    display: "flex",
    flexDirection: { default: "column", [CROSSING]: "row" },
    width: { default: "100%", [CROSSING]: "400%" },
    height: { default: "auto", [CROSSING]: "100%" },
    margin: 0,
    padding: 0,
    listStyleType: "none",
    willChange: { default: "auto", [CROSSING]: "transform" },
  },
  panel: {
    position: "relative",
    overflow: "clip",
    display: "flex",
    flexDirection: { default: "column", [DESKTOP]: "row" },
    alignItems: { default: "stretch", [DESKTOP]: "center" },
    gap: { default: 32, [TABLET]: 40, [DESKTOP]: "min(96px, 6.5vw)" },
    width: { default: "100%", [CROSSING]: "25%" },
    height: { default: "auto", [CROSSING]: "100%" },
    flexShrink: 0,
    paddingTop: { default: 56, [DESKTOP_STILL]: 96, [CROSSING]: 168 },
    paddingBottom: { default: 120, [DESKTOP_STILL]: 160, [CROSSING]: 64 },
    paddingInlineStart: { default: 16, [TABLET]: 40, [DESKTOP]: `calc(${INSET_120} + 56px)` },
    paddingInlineEnd: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_120 },
    boxSizing: "border-box",
    backgroundColor: colors.paper,
    scrollMarginTop: HEADER_HEIGHT,
  },
  panelJoined: {
    borderInlineStartWidth: { default: 0, [CROSSING]: 1 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: HAIRLINE,
    borderTopWidth: { default: 1, [CROSSING]: 0 },
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  panelAlt: {
    backgroundColor: SURFACE,
  },
  panelSeam: {
    display: { default: "none", [CROSSING]: "block" },
    top: "50%",
    left: -6,
  },
  marketWord: {
    position: "absolute",
    left: { default: 8, [DESKTOP]: INSET_120 },
    bottom: 0,
    zIndex: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: { default: "34vw", [DESKTOP]: "min(320px, 22vw)" },
    fontWeight: 800,
    lineHeight: 0.74,
    letterSpacing: "-0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    color: WORD_ON_PAPER,
    translate: "0 20%",
    pointerEvents: "none",
    userSelect: "none",
  },
  marketWordAlt: {
    color: WORD_ON_SURFACE,
  },
  panelTag: {
    display: { default: "none", [DESKTOP]: "block" },
    position: "absolute",
    top: { default: 96, [CROSSING]: 168 },
    left: `calc(${INSET_120} / 2 + 2px)`,
    zIndex: 1,
  },
  marketFigure: {
    position: "relative",
    zIndex: 1,
    flexShrink: 0,
    width: { default: "100%", [DESKTOP]: "auto" },
    height: {
      default: "auto",
      [DESKTOP_STILL]: "min(600px, 62vh)",
      [CROSSING]: "min(560px, calc(100vh - 300px))",
    },
    maxWidth: { default: 545, [DESKTOP]: "none" },
    aspectRatio: "545 / 614",
    margin: 0,
  },
  marketFrame: {
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  marketImage: {
    display: "block",
    width: "124%",
    height: "100%",
    marginInlineStart: "-12%",
    objectFit: "cover",
  },
  marketCopy: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 18, [DESKTOP]: 22 },
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 0,
    maxWidth: 560,
  },
  marketLabel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.06em",
    color: colors.brandBlue700,
  },
  marketLabelNumber: {
    fontVariantNumeric: "tabular-nums",
  },
  marketLabelRule: {
    width: 40,
    height: 1,
    backgroundColor: colors.brandBlue700,
  },
  marketLabelWord: {
    textTransform: "lowercase",
    color: BODY_TEXT,
  },
  marketTitle: {
    margin: 0,
    fontSize: { default: 32, [TABLET]: 44, [DESKTOP]: "min(60px, 4.2vw)" },
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: "0.01em",
    color: INK,
  },
  marketPitch: {
    margin: 0,
    marginTop: -6,
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontSize: { default: 24, [DESKTOP]: 32 },
    lineHeight: 1,
    color: colors.brandGreen800,
  },
  marketKicker: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 18 },
    lineHeight: 1.6,
    color: BODY_TEXT,
    textWrap: "pretty",
    maxWidth: 480,
  },
  marketTags: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: 24,
    width: "100%",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  marketTag: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    paddingBlock: 12,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.3,
    color: INK,
  },
  marketTagIcon: {
    flexShrink: 0,
    color: colors.brandBlue700,
  },

  rail: {
    display: { default: "none", [CROSSING]: "grid" },
    position: "absolute",
    top: 100,
    insetInline: INSET_120,
    zIndex: 2,
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 24,
  },
  railItem: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingBottom: 6,
    textDecoration: "none",
    color: { default: BODY_TEXT, ":hover": colors.brandBlue700 },
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  railItemActive: {
    color: INK,
  },
  railTrack: {
    position: "relative",
    display: "block",
    height: 1,
    backgroundColor: HAIRLINE,
  },
  railFill: {
    position: "absolute",
    inset: 0,
    display: "block",
    height: 2,
    marginTop: -0.5,
    backgroundColor: colors.brandBlue700,
    transformOrigin: "0% 50%",
  },
  railLabel: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.2,
  },
  railNumber: {
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.06em",
  },
  dial: {
    display: { default: "none", [CROSSING]: "flex" },
    position: "absolute",
    left: INSET_120,
    bottom: 40,
    zIndex: 2,
    alignItems: "center",
    gap: 16,
  },
  dialSvg: {
    display: "block",
    width: 64,
    height: 64,
    overflow: "visible",
  },
  dialRing: {
    color: "rgba(26, 26, 26, 0.24)",
  },
  dialArm: {
    color: colors.brandBlue700,
  },
  dialHub: {
    color: colors.brandGreen700,
  },
  dialCount: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    fontFamily: DISPLAY_FONT,
    lineHeight: 1,
  },
  dialNumber: {
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: "-0.04em",
    fontVariantNumeric: "tabular-nums",
    color: INK,
  },
  dialTotal: {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: BODY_TEXT,
  },

  strengths: {
    overflowX: "clip",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { default: 48, [DESKTOP]: 72 },
    paddingBlock: { default: 72, [DESKTOP]: 144 },
    backgroundColor: colors.paper,
  },
  quadrants: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
    },
    gap: 2,
    width: "100%",
    maxWidth: 1200,
  },
  quadrant: {
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 48,
    minHeight: { default: 200, [breakpoints.md]: 280 },
    padding: { default: 24, [DESKTOP]: 40 },
    boxSizing: "border-box",
    color: INK,
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
  quadrantUpper: {
    flexDirection: { default: "column", [breakpoints.md]: "column-reverse" },
  },
  quadrantRight: {
    alignItems: { default: "stretch", [breakpoints.md]: "flex-end" },
    textAlign: { default: "start", [breakpoints.md]: "end" },
  },
  quadrantTop: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: INK,
  },
  quadrantTopRight: {
    flexDirection: { default: "row", [breakpoints.md]: "row-reverse" },
  },
  quadrantNumber: {
    fontFamily: DISPLAY_FONT,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
  },
  quadrantText: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "inherit",
    gap: 12,
    color: INK,
  },
  quadrantInverse: {
    color: "#ffffff",
  },
  quadrantCopy: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  quadrantTitle: {
    margin: 0,
    fontSize: { default: 20, [DESKTOP]: 24 },
    fontWeight: 700,
    lineHeight: 1.2,
  },
  quadrantSmall: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.4,
  },
  quadrantLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    paddingBlock: 8,
    marginBlock: -8,
    fontSize: 14,
    lineHeight: 1.3,
    color: "inherit",
    whiteSpace: "nowrap",
    textDecoration: { default: "none", ":hover": "underline" },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: "currentColor",
    outlineOffset: -2,
  },
  badge: {
    display: { default: "none", [breakpoints.md]: "block" },
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1,
    width: 160,
    height: 160,
    marginTop: -80,
    marginLeft: -80,
    borderRadius: "50%",
    backgroundColor: colors.paper,
    boxShadow: "0 0 0 1px rgba(26, 26, 26, 0.08), 0 18px 40px -18px rgba(7, 67, 174, 0.35)",
    pointerEvents: "none",
  },
  badgeSvg: {
    display: "block",
    width: "100%",
    height: "100%",
  },
  badgeText: {
    fontFamily: DISPLAY_FONT,
    fontSize: 10.5,
    fontWeight: 500,
    letterSpacing: "0.12em",
    fill: INK,
  },
  badgeCross: {
    color: colors.brandBlue700,
  },

  campus: {
    backgroundColor: colors.paper,
  },
  campusStage: {
    position: "relative",
  },
  campusFrame: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    aspectRatio: { default: "4 / 3", [breakpoints.md]: "1440 / 716" },
  },
  campusImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  campusShade: {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(180deg, rgba(7, 30, 80, 0) 55%, rgba(7, 30, 80, 0.55) 100%)",
    pointerEvents: "none",
  },
  campusCaption: {
    position: "absolute",
    left: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_120 },
    bottom: { default: 24, [DESKTOP]: 48 },
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 16,
    rowGap: 4,
    color: colors.paper,
  },
  campusTitle: {
    color: colors.paper,
  },
  campusEcho: {
    color: colors.paper,
  },
  campusCut: {
    display: { default: "block", [breakpoints.motionReduce]: "none" },
    position: "absolute",
    top: "50%",
    insetInline: 0,
    height: 1,
    backgroundColor: colors.brandBlue700,
    pointerEvents: "none",
  },
  campusCutStart: {
    top: -6,
    left: { default: 10, [DESKTOP]: `calc(${INSET_120} - 6px)` },
  },
  campusCutEnd: {
    top: -6,
    right: { default: 10, [DESKTOP]: `calc(${INSET_120} - 6px)` },
  },
  statsBand: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "stretch", [breakpoints.md]: "center" },
    gap: { default: 32, [breakpoints.md]: 15.5 },
    minHeight: { default: 0, [breakpoints.md]: 200 },
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
    fontFamily: DISPLAY_FONT,
  },
  statValue: {
    display: "inline-flex",
    fontSize: 60,
    fontWeight: 500,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  statUnit: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 1.2,
    color: colors.brandBlue700,
  },
  statDivider: {
    display: { default: "none", [breakpoints.md]: "block" },
    flexShrink: 0,
    width: 1,
    height: 70,
    backgroundColor: "#000000",
  },
  wheel: {
    display: "inline-block",
    overflow: "hidden",
    height: "1.1em",
  },
  wheelColumn: {
    display: "flex",
    flexDirection: "column",
  },
  wheelCell: {
    display: "block",
    height: "1.1em",
  },

  globalBand: {
    paddingTop: { default: 64, [DESKTOP]: 120 },
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
  mapCross: {
    width: 9,
    height: 9,
    marginLeft: -4.5,
    marginTop: -4.5,
  },
  pinAt: (left: string, top: string, delay: string) => ({
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
    textAlign: "center",
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
    paddingTop: { default: 72, [DESKTOP]: 120 },
    paddingBottom: { default: 72, [DESKTOP]: 120 },
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
    position: "relative",
    overflow: "clip",
    paddingTop: { default: 80, [DESKTOP]: 128 },
    paddingBottom: { default: 120, [DESKTOP]: 220 },
    backgroundColor: TINT,
  },
  ctaWord: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: { default: "30vw", [DESKTOP]: "min(360px, 25vw)" },
    fontWeight: 800,
    lineHeight: 0.74,
    letterSpacing: "-0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    color: WORD_ON_TINT,
    translate: "-50% 22%",
    pointerEvents: "none",
    userSelect: "none",
  },
  ctaInner: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 28,
    textAlign: "center",
  },
  ctaLead: {
    maxWidth: 640,
  },
  ctaMarkets: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  ctaMarket: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 44,
    paddingInline: 18,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: INK, ":hover": colors.brandBlue700 },
    borderRadius: 22,
    backgroundColor: { default: "transparent", ":hover": colors.brandBlue700 },
    color: { default: INK, ":hover": colors.paper },
    fontSize: 15,
    lineHeight: 1.2,
    textDecoration: "none",
    transitionProperty: "background-color, border-color, color",
    transitionDuration: "180ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  ctaMarketNumber: {
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    letterSpacing: "0.06em",
    fontVariantNumeric: "tabular-nums",
    opacity: 0.7,
  },

  readout: {
    display: { default: "none", [DESKTOP]: "flex" },
    position: "fixed",
    right: 24,
    bottom: 24,
    zIndex: 3,
    alignItems: "center",
    gap: 12,
    paddingBlock: 10,
    paddingInline: 12,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.86)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 0 1px rgba(26, 26, 26, 0.08)",
    pointerEvents: "none",
  },
  readoutPlane: {
    position: "relative",
    width: 40,
    height: 40,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: INK,
  },
  readoutDot: {
    position: "absolute",
    top: -6,
    left: -6,
  },
  readoutValues: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    fontFamily: DISPLAY_FONT,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.1em",
    fontVariantNumeric: "tabular-nums",
    color: INK,
  },
  readoutAxis: {
    color: colors.brandBlue700,
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

function subscribeToMedia(query: string) {
  return (onChange: () => void) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  };
}

const subscribeCrossing = subscribeToMedia(CROSSING_QUERY);
const subscribeQuadrants = subscribeToMedia(QUADRANT_QUERY);

function useCrossing() {
  return useSyncExternalStore(
    subscribeCrossing,
    () => window.matchMedia(CROSSING_QUERY).matches,
    () => false,
  );
}

function useQuadrantMotion() {
  return useSyncExternalStore(
    subscribeQuadrants,
    () => window.matchMedia(QUADRANT_QUERY).matches,
    () => false,
  );
}

function crossingStop(index: number) {
  const run = document.getElementById(RUN_ID);
  if (!run || !window.matchMedia(CROSSING_QUERY).matches) return null;
  const top = run.getBoundingClientRect().top + window.scrollY;
  return top + HOLD_CENTERS[index] * (run.offsetHeight - window.innerHeight);
}

function goToMarket(event: MouseEvent<HTMLAnchorElement>, index: number) {
  const stop = crossingStop(index);
  if (stop === null) return;
  event.preventDefault();
  window.scrollTo({ top: stop });
}

function revealMarket(index: number) {
  const stop = crossingStop(index);
  if (stop !== null && Math.abs(window.scrollY - stop) > 2) window.scrollTo({ top: stop });
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

function RegMark({ sx }: { sx?: StyleXStyles }) {
  return <span aria-hidden="true" {...stylex.props(styles.regMark, sx)} />;
}

function Echo({ children, sx }: { children: ReactNode; sx?: StyleXStyles }) {
  return (
    <span aria-hidden="true" lang="en" {...stylex.props(styles.echo, sx)}>
      {children}
    </span>
  );
}

function SectionHead({
  id,
  title,
  echo,
  lead,
  center = false,
}: {
  id: string;
  title: string;
  echo: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <ZoomReveal sx={[styles.head, center && styles.headCenter]}>
      <div {...stylex.props(styles.headRow, center && styles.headRowCenter)}>
        <h2 id={id} {...stylex.props(styles.sectionTitle)}>
          {title}
        </h2>
        <Echo>{echo}</Echo>
      </div>
      {lead ? <p {...stylex.props(styles.sectionLead)}>{lead}</p> : null}
    </ZoomReveal>
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

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useScrolledPastTop() {
  return useSyncExternalStore(
    subscribeScroll,
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
    <section ref={heroRef} id="top" aria-labelledby="oox-hero-title" {...stylex.props(styles.hero)}>
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
          <h1 id="oox-hero-title" {...stylex.props(styles.heroTitle)}>
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
        <div
          {...stylex.props(styles.heroMotto, styles.heroRise, styles.enterDelay(introAfter(900)))}
        >
          <span aria-hidden="true" {...stylex.props(styles.heroMottoRule)} />
          <p {...stylex.props(styles.verticalLabel, styles.heroMottoText)}>{HERO.motto}</p>
        </div>
        <nav aria-label="四大应用领域">
          <ul {...stylex.props(styles.heroIndex)}>
            {MARKETS.map((market, index) => (
              <li
                key={market.id}
                {...stylex.props(styles.heroRise, styles.enterDelay(introAfter(900 + index * 80)))}
              >
                <a
                  href={`#market-${market.id}`}
                  onClick={(event) => goToMarket(event, index)}
                  {...stylex.props(styles.heroIndexItem, stylex.defaultMarker())}
                >
                  <RegMark sx={styles.regTopLeft} />
                  <span {...stylex.props(styles.heroIndexText)}>
                    <span {...stylex.props(styles.heroIndexNumber)}>{twoDigits(index + 1)}</span>
                    <span {...stylex.props(styles.heroIndexName)}>{market.title}</span>
                  </span>
                  <ArrowDownRight
                    size={20}
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                    aria-hidden="true"
                    {...stylex.props(styles.turnArrow)}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </m.div>
    </section>
  );
}

function InkPhrase({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <m.span {...stylex.props(styles.inkPhrase)} style={reduce ? undefined : { opacity }}>
      {children}
    </m.span>
  );
}

function About() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.85", "end 0.45"] });
  const share = 1 / ABOUT_PHRASES.length;
  return (
    <section
      id="about"
      aria-labelledby="oox-about-title"
      {...stylex.props(styles.about, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.aboutGrid)}>
        <ZoomReveal sx={styles.aboutHead}>
          <h2 id="oox-about-title" {...stylex.props(styles.sectionTitle, styles.aboutTitle)}>
            {ABOUT.title}
          </h2>
          <Echo sx={styles.aboutEcho}>{ABOUT.echo}</Echo>
        </ZoomReveal>
        <div {...stylex.props(styles.aboutBody)}>
          <p ref={textRef} {...stylex.props(styles.aboutText)}>
            {ABOUT_PHRASES.map((phrase, index) => (
              <InkPhrase
                key={phrase}
                progress={scrollYProgress}
                range={[index * share, (index + 1) * share]}
              >
                {phrase}
              </InkPhrase>
            ))}
          </p>
          <a
            href={ABOUT.cta.href}
            {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonCompact)}
          >
            {ABOUT.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductsIntro() {
  const introRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: introRef, offset: ["start 0.7", "end start"] });
  const turn = useTransform(scrollYProgress, [0, 1], [0, -90]);
  return (
    <div ref={introRef} {...stylex.props(styles.shell, styles.inset120, styles.productsIntro)}>
      <p aria-hidden="true" {...stylex.props(styles.verticalLabel, styles.productsEyebrow)}>
        {PRODUCTS_INTRO.eyebrow}
        <span {...stylex.props(styles.upright)}>{twoDigits(MARKETS.length)}</span>
      </p>
      <SectionHead
        id="oox-products-title"
        title={PRODUCTS_INTRO.title}
        echo={PRODUCTS_INTRO.echo}
        lead={PRODUCTS_INTRO.lead}
      />
      <p {...stylex.props(styles.crossHint)}>
        {PRODUCTS_INTRO.hint}
        <m.span
          aria-hidden="true"
          {...stylex.props(styles.crossHintArrow)}
          style={reduce ? undefined : { rotate: turn }}
        >
          <ArrowDown size={16} strokeWidth={1.5} absoluteStrokeWidth />
        </m.span>
      </p>
    </div>
  );
}

function MarketPanel({
  market,
  index,
  track,
  enabled,
}: {
  market: Market;
  index: number;
  track: MotionValue<number>;
  enabled: MotionValue<number>;
}) {
  const titleId = useId();
  const local = useTransform<number, number>([track, enabled], ([position, on]) =>
    on ? position - index : 0,
  );
  const imageX = useTransform(local, [-1, 0, 1], ["-12%", "0%", "12%"]);
  const imageScale = useTransform(local, [-1, 0, 1], [1.16, 1, 1.16]);
  const copyX = useTransform(local, [-1, 0, 1], [180, 0, -180]);
  const wordX = useTransform(local, [-1, 0, 1], [520, 0, -520]);
  const alt = index % 2 === 1;
  return (
    <li
      id={`market-${market.id}`}
      aria-labelledby={titleId}
      onFocus={() => revealMarket(index)}
      {...stylex.props(styles.panel, index > 0 && styles.panelJoined, alt && styles.panelAlt)}
    >
      {index > 0 ? <RegMark sx={styles.panelSeam} /> : null}
      <m.span
        aria-hidden="true"
        lang="en"
        {...stylex.props(styles.marketWord, alt && styles.marketWordAlt)}
        style={{ x: wordX }}
      >
        {market.word}
      </m.span>
      <p aria-hidden="true" {...stylex.props(styles.verticalLabel, styles.panelTag)}>
        应用领域
        <span {...stylex.props(styles.upright)}>{twoDigits(index + 1)}</span>
      </p>
      <figure {...stylex.props(styles.marketFigure)}>
        <div {...stylex.props(styles.marketFrame)}>
          <m.img
            src={market.image}
            alt={market.title}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.marketImage)}
            style={{ x: imageX, scale: imageScale }}
          />
        </div>
        <RegMark sx={styles.regTopLeft} />
        <RegMark sx={styles.regTopRight} />
        <RegMark sx={styles.regBottomLeft} />
        <RegMark sx={styles.regBottomRight} />
      </figure>
      <m.div {...stylex.props(styles.marketCopy)} style={{ x: copyX }}>
        <p lang="en" {...stylex.props(styles.marketLabel)}>
          <span {...stylex.props(styles.marketLabelNumber)}>
            {twoDigits(index + 1)} / {twoDigits(MARKETS.length)}
          </span>
          <span aria-hidden="true" {...stylex.props(styles.marketLabelRule)} />
          <span {...stylex.props(styles.marketLabelWord)}>{market.english}</span>
        </p>
        <h3 id={titleId} {...stylex.props(styles.marketTitle)}>
          {market.title}
        </h3>
        <p lang="en" {...stylex.props(styles.marketPitch)}>
          {market.pitch}
        </p>
        <p {...stylex.props(styles.marketKicker)}>{market.kicker}</p>
        <ul aria-label={`${market.title} 细分方向`} {...stylex.props(styles.marketTags)}>
          {market.tags.map((tag) => (
            <li key={tag} {...stylex.props(styles.marketTag)}>
              <Plus
                size={12}
                strokeWidth={1.5}
                absoluteStrokeWidth
                aria-hidden="true"
                {...stylex.props(styles.marketTagIcon)}
              />
              {tag}
            </li>
          ))}
        </ul>
        <a
          href={MARKET_CTA.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonCompact)}
        >
          {MARKET_CTA.label}
        </a>
      </m.div>
    </li>
  );
}

function RailItem({
  market,
  index,
  track,
  active,
}: {
  market: Market;
  index: number;
  track: MotionValue<number>;
  active: boolean;
}) {
  const fill = useTransform(track, [index - 1, index], [0, 1]);
  return (
    <a
      href={`#market-${market.id}`}
      aria-current={active ? "step" : undefined}
      onClick={(event) => goToMarket(event, index)}
      {...stylex.props(styles.railItem, active && styles.railItemActive)}
    >
      <span aria-hidden="true" {...stylex.props(styles.railTrack)}>
        <m.span {...stylex.props(styles.railFill)} style={{ scaleX: fill }} />
      </span>
      <span {...stylex.props(styles.railLabel)}>
        <span {...stylex.props(styles.railNumber)}>{twoDigits(index + 1)}</span>
        {market.title}
      </span>
    </a>
  );
}

function MarketDial({ track, active }: { track: MotionValue<number>; active: number }) {
  const rotate = useTransform(track, (position) => position * 90);
  return (
    <div aria-hidden="true" {...stylex.props(styles.dial)}>
      <m.svg viewBox="0 0 64 64" {...stylex.props(styles.dialSvg)} style={{ rotate }}>
        <g {...stylex.props(styles.dialRing)} fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="32" cy="32" r="31" />
          <line x1="32" y1="6" x2="32" y2="58" />
          <line x1="6" y1="32" x2="58" y2="32" />
        </g>
        <line
          x1="32"
          y1="6"
          x2="32"
          y2="32"
          stroke="currentColor"
          strokeWidth="2"
          {...stylex.props(styles.dialArm)}
        />
        <circle cx="32" cy="32" r="3.5" fill="currentColor" {...stylex.props(styles.dialHub)} />
      </m.svg>
      <span {...stylex.props(styles.dialCount)}>
        <span {...stylex.props(styles.dialNumber)}>{twoDigits(active + 1)}</span>
        <span {...stylex.props(styles.dialTotal)}>/ {twoDigits(MARKETS.length)}</span>
      </span>
    </div>
  );
}

function MarketRun({ crossX }: { crossX: MotionValue<number> }) {
  const runRef = useRef<HTMLDivElement>(null);
  const crossing = useCrossing();
  const enabled = useMotionValue(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: runRef, offset: ["start start", "end end"] });
  const track = useTransform(scrollYProgress, CROSS_STOPS, CROSS_TRACK);
  const trackX = useTransform<number, string>(
    [track, enabled],
    ([position, on]) => `${-position * 25 * on}%`,
  );
  useEffect(() => {
    enabled.set(crossing ? 1 : 0);
    crossX.set(crossing ? track.get() / LAST_MARKET : 0);
  }, [crossing, enabled, crossX, track]);
  useMotionValueEvent(track, "change", (position) => {
    setActive(Math.round(position));
    crossX.set((position / LAST_MARKET) * enabled.get());
  });
  return (
    <div ref={runRef} id={RUN_ID} {...stylex.props(styles.run)}>
      <div {...stylex.props(styles.runViewport)}>
        <nav aria-label="产品领域进度" {...stylex.props(styles.rail)}>
          {MARKETS.map((market, index) => (
            <RailItem
              key={market.id}
              market={market}
              index={index}
              track={track}
              active={active === index}
            />
          ))}
        </nav>
        <m.ol {...stylex.props(styles.runTrack)} style={{ x: trackX }}>
          {MARKETS.map((market, index) => (
            <MarketPanel
              key={market.id}
              market={market}
              index={index}
              track={track}
              enabled={enabled}
            />
          ))}
        </m.ol>
        <MarketDial track={track} active={active} />
      </div>
    </div>
  );
}

function Products({ crossX }: { crossX: MotionValue<number> }) {
  return (
    <section id="products" aria-labelledby="oox-products-title" {...stylex.props(styles.anchor)}>
      <ProductsIntro />
      <MarketRun crossX={crossX} />
    </section>
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

function Quadrant({
  strength,
  index,
  apart,
}: {
  strength: (typeof STRENGTHS)[number];
  index: number;
  apart: MotionValue<number>;
}) {
  const [dx, dy] = QUADRANT_DIRECTIONS[index];
  const x = useTransform(apart, (value) => value * dx * 56);
  const y = useTransform(apart, (value) => value * dy * 40);
  const Icon = STRENGTH_ICONS[strength.icon];
  const inverse = strength.tone === "blue";
  const right = dx === 1;
  return (
    <m.article
      aria-labelledby={`oox-strength-${index}`}
      {...stylex.props(
        styles.quadrant,
        TONE_STYLES[strength.tone],
        dy === -1 && styles.quadrantUpper,
        right && styles.quadrantRight,
        stylex.defaultMarker(),
      )}
      style={{ x, y }}
    >
      <IconPattern icon={strength.icon} />
      <div
        {...stylex.props(
          styles.quadrantTop,
          right && styles.quadrantTopRight,
          inverse && styles.quadrantInverse,
        )}
      >
        <Icon size={36} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
        <span aria-hidden="true" {...stylex.props(styles.quadrantNumber)}>
          {twoDigits(index + 1)}
        </span>
      </div>
      <div {...stylex.props(styles.quadrantText, inverse && styles.quadrantInverse)}>
        <div {...stylex.props(styles.quadrantCopy)}>
          <h3 id={`oox-strength-${index}`} {...stylex.props(styles.quadrantTitle)}>
            {strength.title}
          </h3>
          {strength.description ? (
            <p {...stylex.props(styles.quadrantSmall)}>{strength.description}</p>
          ) : null}
        </div>
        {strength.link ? (
          <a href="#offices" {...stylex.props(styles.quadrantLink)}>
            {strength.link}
            <ArrowUpRight size={12} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </m.article>
  );
}

function Strengths() {
  const gridRef = useRef<HTMLDivElement>(null);
  const converge = useQuadrantMotion();
  const { scrollYProgress: approach } = useScroll({
    target: gridRef,
    offset: ["start end", "center 0.6"],
  });
  const { scrollYProgress: pass } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const apart = useTransform(approach, (value) => (converge ? 1 - value : 0));
  const rotate = useTransform(pass, [0, 1], [0, 180]);
  return (
    <section
      id="strengths"
      aria-labelledby="oox-strengths-title"
      {...stylex.props(styles.strengths, styles.inset120, styles.anchor)}
    >
      <SectionHead
        id="oox-strengths-title"
        title={STRENGTHS_INTRO.title}
        echo={ECHO.strengths}
        lead={STRENGTHS_INTRO.lead}
        center
      />
      <div ref={gridRef} {...stylex.props(styles.quadrants)}>
        {STRENGTHS.map((strength, index) => (
          <Quadrant key={strength.title} strength={strength} index={index} apart={apart} />
        ))}
        <m.div aria-hidden="true" {...stylex.props(styles.badge)} style={{ rotate }}>
          <svg viewBox="0 0 160 160" {...stylex.props(styles.badgeSvg)}>
            <defs>
              <path
                id="oox-badge-ring"
                d={`M80,80 m-${RING_RADIUS},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 ${RING_RADIUS * 2},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 -${RING_RADIUS * 2},0`}
              />
            </defs>
            <text {...stylex.props(styles.badgeText)}>
              <textPath href="#oox-badge-ring" textLength={RING_LENGTH} lengthAdjust="spacing">
                {ECHO.strengthsRing}
              </textPath>
            </text>
            <g {...stylex.props(styles.badgeCross)} stroke="currentColor" strokeWidth="1">
              <line x1="80" y1="56" x2="80" y2="104" />
              <line x1="56" y1="80" x2="104" y2="80" />
            </g>
          </svg>
        </m.div>
      </div>
    </section>
  );
}

function DigitWheel({ digit, delay }: { digit: number; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span {...stylex.props(styles.wheel)}>
      <m.span
        {...stylex.props(styles.wheelColumn)}
        initial={{ y: "0%" }}
        whileInView={{ y: `${-(10 + digit) * 5}%` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduce ? 0 : 1.6, delay: reduce ? 0 : delay, ease: EASE }}
      >
        {DIGIT_CELLS.map((cell) => (
          <span key={cell.id} {...stylex.props(styles.wheelCell)}>
            {cell.digit}
          </span>
        ))}
      </m.span>
    </span>
  );
}

function Odometer({ value, offset }: { value: string; offset: number }) {
  return (
    <span aria-hidden="true" {...stylex.props(styles.statValue)}>
      {value
        .split("")
        .map((character, position) => ({ id: `${position}-${character}`, character, position }))
        .map((cell) =>
          /\d/.test(cell.character) ? (
            <DigitWheel
              key={cell.id}
              digit={Number(cell.character)}
              delay={offset + cell.position * 0.09}
            />
          ) : (
            <span key={cell.id}>{cell.character}</span>
          ),
        )}
    </span>
  );
}

function Campus() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center 0.55"] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(46% 0% 46% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.24, 1]);
  const cutOpacity = useTransform(scrollYProgress, [0.55, 1], [1, 0]);
  return (
    <section
      id="campus"
      aria-labelledby="oox-campus-title"
      {...stylex.props(styles.campus, styles.anchor)}
    >
      <div ref={stageRef} {...stylex.props(styles.campusStage)}>
        <m.div {...stylex.props(styles.campusFrame)} style={reduce ? undefined : { clipPath }}>
          <m.img
            src={IMAGES.campus.src}
            alt={IMAGES.campus.alt}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.campusImage)}
            style={reduce ? undefined : { scale: imageScale }}
          />
          <div aria-hidden="true" {...stylex.props(styles.campusShade)} />
          <div {...stylex.props(styles.campusCaption)}>
            <h2 id="oox-campus-title" {...stylex.props(styles.sectionTitle, styles.campusTitle)}>
              {CAMPUS.label}
            </h2>
            <Echo sx={styles.campusEcho}>{CAMPUS.echo}</Echo>
          </div>
        </m.div>
        <m.span
          aria-hidden="true"
          {...stylex.props(styles.campusCut)}
          style={reduce ? undefined : { opacity: cutOpacity }}
        >
          <RegMark sx={styles.campusCutStart} />
          <RegMark sx={styles.campusCutEnd} />
        </m.span>
      </div>
      <div {...stylex.props(styles.shell, styles.inset120, styles.statsBand)}>
        {STATS.map((stat, index) => (
          <StatItem key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  return (
    <>
      {index > 0 ? <span aria-hidden="true" {...stylex.props(styles.statDivider)} /> : null}
      <ZoomReveal delay={index * STAGGER} sx={styles.stat}>
        <p {...stylex.props(styles.statText)}>{stat.label}</p>
        <p {...stylex.props(styles.statFigure)}>
          <Odometer value={stat.value} offset={index * 0.2} />
          {stat.unit ? (
            <span aria-hidden="true" {...stylex.props(styles.statUnit)}>
              {stat.unit}
            </span>
          ) : null}
          <span {...stylex.props(styles.visuallyHidden)}>
            {stat.value}
            {stat.unit ?? ""}
          </span>
        </p>
        <p {...stylex.props(styles.statText)}>{stat.caption}</p>
      </ZoomReveal>
    </>
  );
}

function Offices() {
  return (
    <section id="offices" aria-labelledby="oox-offices-title" {...stylex.props(styles.anchor)}>
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
              <span key={`${pin.left}-${pin.top}`} aria-hidden="true">
                <span
                  {...stylex.props(
                    styles.mapRing,
                    styles.pinAt(`${pin.left}%`, `${pin.top}%`, `${(index * 370) % 2800}ms`),
                  )}
                />
                <span
                  {...stylex.props(
                    styles.regMark,
                    styles.mapCross,
                    styles.pinAt(`${pin.left}%`, `${pin.top}%`, "0ms"),
                  )}
                />
              </span>
            ))}
          </div>
          <div {...stylex.props(styles.globalCopy)}>
            <div {...stylex.props(styles.headRow, styles.headRowCenter)}>
              <h2 id="oox-offices-title" {...stylex.props(styles.sectionTitle)}>
                {GLOBAL_INTRO.title}
              </h2>
              <Echo>{ECHO.offices}</Echo>
            </div>
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
      aria-labelledby="oox-news-title"
      {...stylex.props(styles.news, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.newsInner)}>
        <SectionHead id="oox-news-title" title={NEWS_TITLE} echo={ECHO.news} />
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
      aria-labelledby="oox-contact-title"
      {...stylex.props(styles.cta, styles.anchor)}
    >
      <span aria-hidden="true" lang="en" {...stylex.props(styles.ctaWord)}>
        Fenchem
      </span>
      <ZoomReveal sx={[styles.shell, styles.inset120, styles.ctaInner]}>
        <div {...stylex.props(styles.headRow, styles.headRowCenter)}>
          <h2 id="oox-contact-title" {...stylex.props(styles.sectionTitle)}>
            {CTA.title}
          </h2>
          <Echo>{CTA.echo}</Echo>
        </div>
        <p {...stylex.props(styles.sectionLead, styles.ctaLead)}>{CTA.lead}</p>
        <ul aria-label="选择应用领域" {...stylex.props(styles.ctaMarkets)}>
          {MARKETS.map((market, index) => (
            <li key={market.id}>
              <a
                href={`#market-${market.id}`}
                onClick={(event) => goToMarket(event, index)}
                {...stylex.props(styles.ctaMarket)}
              >
                <span aria-hidden="true" {...stylex.props(styles.ctaMarketNumber)}>
                  {twoDigits(index + 1)}
                </span>
                {market.title}
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

function AxisReadout({ crossX }: { crossX: MotionValue<number> }) {
  const { scrollYProgress } = useScroll();
  const dotX = useTransform(crossX, (value) => value * 40);
  const dotY = useTransform(scrollYProgress, (value) => value * 40);
  const yText = useTransform(scrollYProgress, threeDigits);
  const xText = useTransform(crossX, threeDigits);
  return (
    <div aria-hidden="true" {...stylex.props(styles.readout)}>
      <span {...stylex.props(styles.readoutPlane)}>
        <m.span {...stylex.props(styles.regMark, styles.readoutDot)} style={{ x: dotX, y: dotY }} />
      </span>
      <span {...stylex.props(styles.readoutValues)}>
        <span>
          <span {...stylex.props(styles.readoutAxis)}>Y </span>
          <m.span>{yText}</m.span>
        </span>
        <span>
          <span {...stylex.props(styles.readoutAxis)}>X </span>
          <m.span>{xText}</m.span>
        </span>
      </span>
    </div>
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

export function VariantOOX() {
  preinit(GOOGLE_FONTS, { as: "style" });
  const reduce = useReducedMotion();
  const intro = useIntro();
  const crossX = useMotionValue(0);
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
              <Products crossX={crossX} />
              <Strengths />
              <Campus />
              <Offices />
              <News />
              <ContactCta />
            </main>
            <SiteFooter />
          </div>
          <AxisReadout crossX={crossX} />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
