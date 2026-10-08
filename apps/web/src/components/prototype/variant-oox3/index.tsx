import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  CornerDownRight,
  Globe,
  Lightbulb,
  Menu,
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
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { preinit } from "react-dom";

import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { HeroGradeFilter } from "@/components/prototype/hero-grade";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { LINKEDIN_PATHS, LOGO_PATHS, WECHAT_PATHS, type VectorPath } from "../variant-o/vectors";
import { INTRO_REVEAL_MS, introStyles, useIntro } from "@/components/prototype/shared/intro";
import { LiquidImage } from "@/components/prototype/shared/campus-liquid-image";
import {
  ABOUT,
  CAMPUS,
  CONTACT_DISPLAY,
  COPYRIGHT,
  CTA,
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
  SECTION_LABELS,
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
const HAIRLINE = "rgba(26, 26, 26, 0.16)";
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const SERIF_FONT = '"Instrument Serif", "Times New Roman", serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const APERTURE_QUERY = "(min-width: 1280px) and (prefers-reduced-motion: no-preference)";
const APERTURE = `@media ${APERTURE_QUERY}`;
const DESKTOP_STILL = "@media (min-width: 1280px) and (prefers-reduced-motion: reduce)";
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BLOOM_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const INSET_120 = "min(120px, 8.333vw)";
const INSET_118 = "min(118px, 8.194vw)";

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));
const HEADER_HEIGHT = 80;

const RUN_ID = "oox3-aperture-run";
const APERTURE_STOPS = [0, 0.14, 0.24, 0.38, 0.48, 0.62, 0.72, 0.86, 1];
const APERTURE_TRACK = [0, 1, 1, 2, 2, 3, 3, 4, 4];
const HOLD_CENTERS = [0.19, 0.43, 0.67, 0.93] as const;
const LAST_MARKET = MARKETS.length - 1;

const ZOOM_FROM_SCALE = 0.96;
const SETTLED = "translateY(0px) scale(1)";
const zoomFrom = (y: number, scale: number) => `translateY(${y}px) scale(${scale})`;
const twoDigits = (value: number) => String(value).padStart(2, "0");
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const windowClip = (open: number) => {
  const eased = easeInOut(clamp01(open));
  const inset = (50 * (1 - eased)).toFixed(2);
  const radius = Math.round(360 * (1 - eased));
  return `inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius}px)`;
};

const [HEADLINE_OPENING, HEADLINE_CLOSING] = HERO.headline;
const [OPENING_BEFORE, OPENING_AFTER] = HEADLINE_OPENING.split(HERO.accent);
const CLOSING_BREAK = HEADLINE_CLOSING.lastIndexOf(" ");
const CLOSING_LEAD = HEADLINE_CLOSING.slice(0, CLOSING_BREAK);
const CLOSING_WORD = HEADLINE_CLOSING.slice(CLOSING_BREAK + 1).replace(/\.$/, "");

const [CONTACT_FIRST, CONTACT_SECOND] = CONTACT_DISPLAY.lines;
const [CONTACT_BEFORE, CONTACT_AFTER] = CONTACT_SECOND.split(CONTACT_DISPLAY.accent);

const STRENGTH_ICONS: Record<StrengthIcon, LucideIcon> = {
  globe: Globe,
  shield: Shield,
  bulb: Lightbulb,
  users: Users,
};

const PATTERN_CELLS = Array.from({ length: 15 }, (_, column) =>
  (column % 2 === 0 ? [0, 65, 130, 195] : [32.5, 97.5, 162.5]).map((top) => ({
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

const hangDrop = stylex.keyframes({
  "0%": { opacity: 0, translate: "0px -18px" },
  "65%": { opacity: 1, translate: "0px 4px" },
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

  hang: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    margin: 0,
    paddingTop: 14,
    paddingInlineStart: 18,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.12em",
    color: INK,
  },
  hangEnd: {
    paddingInlineStart: { default: 18, [DESKTOP]: 0 },
    paddingInlineEnd: { default: 0, [DESKTOP]: 18 },
  },
  hangOnDark: {
    borderTopColor: colors.paper,
    color: colors.paper,
  },
  hook: {
    position: "absolute",
    top: -1,
    insetInlineStart: 0,
    width: 9,
    height: 20,
    boxSizing: "border-box",
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderColor: colors.brandBlue700,
    borderBottomLeftRadius: 7,
    pointerEvents: "none",
  },
  hookEnd: {
    insetInlineStart: { default: 0, [DESKTOP]: "auto" },
    insetInlineEnd: { default: "auto", [DESKTOP]: 0 },
    borderInlineStartWidth: { default: 1, [DESKTOP]: 0 },
    borderInlineEndWidth: { default: 0, [DESKTOP]: 1 },
    borderInlineEndStyle: "solid",
    borderBottomLeftRadius: { default: 7, [DESKTOP]: 0 },
    borderBottomRightRadius: { default: 0, [DESKTOP]: 7 },
  },
  hookOnDark: {
    borderColor: colors.paper,
  },
  hangNumber: {
    fontFamily: DISPLAY_FONT,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.06em",
    color: colors.brandBlue700,
  },
  hangNumberOnDark: {
    color: colors.paper,
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
    alignItems: "flex-start",
    gap: 20,
    maxWidth: 768,
  },
  headCenter: {
    alignItems: "center",
    marginInline: "auto",
    textAlign: "center",
  },

  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
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
  buttonWide: { minWidth: 160, height: 48, paddingInline: 28 },
  hookIcon: {
    flexShrink: 0,
    display: "block",
    translate: {
      default: "0px -2px",
      [stylex.when.ancestor(":hover")]: "3px 0px",
      [stylex.when.ancestor(":focus-visible")]: "3px 0px",
    },
    transitionProperty: "translate",
    transitionDuration: "260ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },

  header: {
    position: "fixed",
    top: 0,
    insetInline: 0,
    zIndex: 6,
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
  heroHang: {
    animationName: { default: hangDrop, [breakpoints.motionReduce]: fadeIn },
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
    paddingBottom: { default: 72, [DESKTOP]: 48 },
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
  tagRow: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: "repeat(4, minmax(0, 1fr))",
    },
    columnGap: 0,
    rowGap: 24,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  heroTags: {
    marginTop: { default: 24, [DESKTOP]: "auto" },
  },
  tagLink: {
    display: "flex",
    width: "100%",
    boxSizing: "border-box",
    minHeight: { default: 60, [DESKTOP]: 72 },
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingInlineEnd: 20,
    color: { default: INK, ":hover": colors.brandBlue700 },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  tagLinkOnDark: {
    color: { default: colors.paper, ":hover": colors.brandBlue100 },
    outlineColor: colors.paper,
  },
  tagLinkText: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    letterSpacing: 0,
  },
  tagName: {
    fontSize: { default: 15, [DESKTOP]: 17 },
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.02em",
  },

  about: {
    paddingTop: { default: 72, [DESKTOP]: 144 },
    paddingBottom: { default: 48, [DESKTOP]: 96 },
    backgroundColor: colors.paper,
  },
  mirrorGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [DESKTOP]: "minmax(0, 1fr) 1px minmax(0, 1fr)",
    },
    columnGap: { default: 0, [DESKTOP]: 64 },
    rowGap: 32,
  },
  mirrorAxis: {
    display: { default: "none", [DESKTOP]: "block" },
    backgroundColor: HAIRLINE,
  },
  mirrorStart: {
    display: "flex",
    flexDirection: "column",
    alignItems: { default: "flex-start", [DESKTOP]: "flex-end" },
    textAlign: { default: "start", [DESKTOP]: "end" },
    gap: 24,
  },
  aboutTitle: {
    fontSize: { default: 32, [TABLET]: 44, [DESKTOP]: 56 },
    lineHeight: 1.1,
  },
  mirrorEnd: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
    maxWidth: 560,
    paddingTop: { default: 0, [DESKTOP]: 34 },
  },
  aboutText: {
    margin: 0,
    fontSize: { default: 17, [DESKTOP]: 20 },
    fontWeight: 500,
    lineHeight: 1.8,
    color: INK,
    textWrap: "pretty",
  },

  productsIntro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: { default: 72, [DESKTOP]: 96 },
    paddingBottom: { default: 24, [DESKTOP]: 0 },
  },
  plumb: {
    display: { default: "none", [APERTURE]: "block" },
    width: 1,
    height: 96,
    marginTop: 40,
    backgroundImage: `linear-gradient(${INK}, ${INK})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "1px 100%",
    transformOrigin: "50% 0%",
  },

  run: {
    position: "relative",
    height: { default: "auto", [APERTURE]: "450vh" },
  },
  runViewport: {
    position: { default: "relative", [APERTURE]: "sticky" },
    top: 0,
    height: { default: "auto", [APERTURE]: "100vh" },
    overflow: { default: "visible", [APERTURE]: "clip" },
    backgroundColor: colors.paper,
  },
  stages: {
    position: "relative",
    height: { default: "auto", [APERTURE]: "100%" },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  stage: {
    position: { default: "relative", [APERTURE]: "absolute" },
    inset: { default: "auto", [APERTURE]: 0 },
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [DESKTOP]: "minmax(0, 1fr) auto minmax(0, 1fr)",
    },
    alignItems: "center",
    columnGap: "min(64px, 4.5vw)",
    rowGap: 32,
    paddingTop: { default: 56, [DESKTOP_STILL]: 96, [APERTURE]: 176 },
    paddingBottom: { default: 72, [DESKTOP_STILL]: 96, [APERTURE]: 64 },
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_120 },
    boxSizing: "border-box",
    backgroundColor: { default: colors.paper, [APERTURE]: "transparent" },
    pointerEvents: { default: "auto", [APERTURE]: "none" },
    scrollMarginTop: HEADER_HEIGHT,
  },
  stageAlt: {
    backgroundColor: { default: SURFACE, [APERTURE]: "transparent" },
  },
  stageJoined: {
    borderTopWidth: { default: 1, [APERTURE]: 0 },
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  stageStart: {
    display: "flex",
    flexDirection: "column",
    alignItems: { default: "flex-start", [DESKTOP]: "flex-end" },
    textAlign: { default: "start", [DESKTOP]: "end" },
    gap: 18,
  },
  stageEnd: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 20,
    maxWidth: 380,
  },
  stageTitle: {
    margin: 0,
    fontSize: { default: 32, [TABLET]: 44, [DESKTOP]: "min(46px, 3.2vw)" },
    fontWeight: 700,
    lineHeight: 1.12,
    whiteSpace: { default: "normal", [DESKTOP]: "nowrap" },
    letterSpacing: "0.01em",
    color: INK,
  },
  stagePitch: {
    margin: 0,
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontSize: { default: 24, [DESKTOP]: 30 },
    lineHeight: 1,
    color: colors.brandGreen800,
  },
  stageKicker: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.7,
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  stageTags: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  stageTag: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    paddingBlock: 11,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
    fontSize: 15,
    lineHeight: 1.3,
    color: INK,
  },
  stageTagIcon: {
    flexShrink: 0,
    color: colors.brandBlue700,
    translate: "0px -2px",
  },
  frame: {
    position: "relative",
    justifySelf: { default: "start", [DESKTOP]: "center" },
    width: { default: "100%", [DESKTOP]: "auto" },
    maxWidth: { default: 545, [DESKTOP]: "none" },
    height: {
      default: "auto",
      [DESKTOP_STILL]: "min(560px, 62vh)",
      [APERTURE]: "min(560px, calc(100vh - 300px))",
    },
    aspectRatio: "545 / 614",
    margin: 0,
    pointerEvents: "none",
  },
  frameSlot: {
    display: { default: "none", [APERTURE]: "block" },
    position: "absolute",
    inset: 0,
    backgroundColor: TINT,
  },
  frameWindow: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
  },
  frameImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  rail: {
    display: { default: "none", [APERTURE]: "flex" },
    position: "absolute",
    top: 96,
    insetInline: INSET_120,
    zIndex: 5,
    justifyContent: "center",
    gap: 56,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  railTag: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingTop: 22,
    paddingInlineStart: 16,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.2,
    color: { default: BODY_TEXT, ":hover": colors.brandBlue700 },
    textDecoration: "none",
    transitionProperty: "padding-top, color",
    transitionDuration: "320ms",
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
    "::before": {
      content: '""',
      position: "absolute",
      top: -1,
      insetInlineStart: 0,
      width: 9,
      height: 28,
      boxSizing: "border-box",
      borderInlineStartWidth: 1,
      borderInlineStartStyle: "solid",
      borderInlineStartColor: HAIRLINE,
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: HAIRLINE,
      borderBottomLeftRadius: 7,
      transitionProperty: "height, border-color",
      transitionDuration: "320ms",
      transitionTimingFunction: EASE_OUT_CSS,
    },
  },
  railTagActive: {
    paddingTop: 36,
    color: INK,
    "::before": {
      height: 42,
      borderInlineStartColor: colors.brandBlue700,
      borderBottomColor: colors.brandBlue700,
    },
  },

  strengths: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 48, [DESKTOP]: 64 },
    paddingBlock: { default: 72, [DESKTOP]: 144 },
    backgroundColor: colors.paper,
  },
  strengthRail: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: "repeat(4, minmax(0, 1fr))",
    },
    rowGap: 24,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  strengthSlot: {
    paddingTop: 40,
    paddingInline: 8,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  strengthHang: {
    position: "relative",
    transformOrigin: "50% -40px",
    "::before": {
      content: '""',
      position: "absolute",
      top: -40,
      left: "50%",
      width: 1,
      height: 40,
      backgroundColor: INK,
    },
  },
  strengthCard: {
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 40,
    minHeight: 240,
    paddingTop: 28,
    paddingBottom: 24,
    paddingInline: 28,
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
  strengthTop: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: INK,
  },
  strengthNumber: {
    fontFamily: DISPLAY_FONT,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
  },
  strengthText: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    color: INK,
  },
  strengthInverse: {
    color: "#ffffff",
  },
  strengthTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  strengthSmall: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.4,
  },
  strengthLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
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
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
  },
  campusTitle: {
    color: colors.paper,
  },
  statsBand: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 32,
    rowGap: 40,
    paddingBlock: { default: 56, [DESKTOP]: 88 },
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 14,
  },
  statFigure: {
    display: "flex",
    alignItems: "flex-start",
    gap: 2,
    margin: 0,
    fontFamily: DISPLAY_FONT,
    color: INK,
  },
  statValue: {
    fontSize: { default: 52, [DESKTOP]: 64 },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  statUnit: {
    fontSize: 28,
    fontWeight: 500,
    lineHeight: 1,
    color: colors.brandBlue700,
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
    gap: 48,
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
    alignItems: "flex-start",
    gap: 20,
    width: "100%",
    maxWidth: { default: "none", [DESKTOP]: 420 },
    flexShrink: 1,
    minWidth: 0,
  },
  officesBand: {
    paddingTop: 56,
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
    gap: 28,
  },
  officeGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  regionHang: {
    display: "flex",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: "0.04em",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: 0,
    padding: 0,
    paddingInlineStart: 18,
    listStyleType: "none",
  },

  news: {
    paddingBlock: { default: 72, [DESKTOP]: 120 },
    backgroundColor: colors.paper,
  },
  newsInner: {
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  accordion: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  newsItem: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
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
    paddingBlock: 22,
    paddingInline: 4,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: { default: 16, [DESKTOP]: 18 },
    fontWeight: 700,
    lineHeight: 1.3,
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
    display: "flex",
    flexShrink: 0,
    color: colors.brandBlue700,
  },
  newsPanel: {
    overflow: "hidden",
  },
  newsPanelInner: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    paddingInlineStart: 22,
    paddingInlineEnd: 4,
    paddingBottom: 24,
  },

  contact: {
    position: "relative",
    overflow: "hidden",
    minHeight: { default: 0, [DESKTOP]: 760 },
    backgroundColor: "#b9cdf0",
  },
  contactContent: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: { default: "flex-start", [DESKTOP]: "flex-end" },
    gap: 40,
    minHeight: { default: 0, [DESKTOP]: 760 },
    paddingTop: { default: 48, [DESKTOP]: 56 },
    paddingBottom: { default: 72, [DESKTOP]: 104 },
    textAlign: { default: "start", [DESKTOP]: "end" },
  },
  contactTags: {
    width: "100%",
    marginBottom: { default: 24, [DESKTOP]: "auto" },
  },
  contactDisplay: {
    margin: 0,
    fontFamily: DISPLAY_FONT,
    fontWeight: 800,
    color: INK,
  },
  contactLine: {
    display: "block",
    fontSize: { default: 34, [TABLET]: 56, [DESKTOP]: "min(84px, 6vw)" },
    lineHeight: 1.05,
    letterSpacing: "-0.05em",
  },
  contactLineSoft: {
    fontSize: { default: 20, [TABLET]: 26, [DESKTOP]: "min(34px, 2.5vw)" },
    fontWeight: 500,
    letterSpacing: "-0.025em",
    marginBottom: 8,
  },
  contactCopy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "inherit",
    gap: 20,
    maxWidth: 620,
  },
  contactAccent: {
    paddingInlineStart: "0.08em",
    paddingInlineEnd: 0,
    marginInlineEnd: "-0.06em",
  },
  contactLead: {
    color: INK,
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

function subscribeAperture(onChange: () => void) {
  const mediaQuery = window.matchMedia(APERTURE_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function useAperture() {
  return useSyncExternalStore(
    subscribeAperture,
    () => window.matchMedia(APERTURE_QUERY).matches,
    () => false,
  );
}

function apertureStop(index: number) {
  const run = document.getElementById(RUN_ID);
  if (!run || !window.matchMedia(APERTURE_QUERY).matches) return null;
  const top = run.getBoundingClientRect().top + window.scrollY;
  return top + HOLD_CENTERS[index] * (run.offsetHeight - window.innerHeight);
}

function goToMarket(event: MouseEvent<HTMLAnchorElement>, index: number) {
  const stop = apertureStop(index);
  if (stop === null) return;
  event.preventDefault();
  window.scrollTo({ top: stop });
}

function revealMarket(index: number) {
  const stop = apertureStop(index);
  if (stop !== null && Math.abs(window.scrollY - stop) > 2) window.scrollTo({ top: stop });
}

function ZoomReveal({
  children,
  sx,
  delay = 0,
}: {
  children: ReactNode;
  sx?: StyleXStyles;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      {...stylex.props(sx)}
      initial={{ opacity: 0, transform: zoomFrom(24, ZOOM_FROM_SCALE) }}
      whileInView={{ opacity: 1, transform: SETTLED }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0.2 : 0.8, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

function DropIn({
  children,
  sx,
  delay = 0,
  swing = 0,
}: {
  children: ReactNode;
  sx?: StyleXStyles;
  delay?: number;
  swing?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      {...stylex.props(sx)}
      initial={{ opacity: 0, y: -36, rotate: swing }}
      whileInView={{ opacity: 1, y: [-36, 7, 0], rotate: [swing, swing * -0.4, 0] }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        default: {
          duration: reduce ? 0 : 0.95,
          delay: reduce ? 0 : delay,
          ease: EASE,
          times: [0, 0.62, 1],
        },
        opacity: { duration: reduce ? 0.2 : 0.4, delay: reduce ? 0 : delay },
      }}
    >
      {children}
    </m.div>
  );
}

function Hook({ mirror = false, onDark = false }: { mirror?: boolean; onDark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      {...stylex.props(styles.hook, mirror && styles.hookEnd, onDark && styles.hookOnDark)}
    />
  );
}

function Hang({
  children,
  number,
  mirror = false,
  onDark = false,
}: {
  children: ReactNode;
  number?: number;
  mirror?: boolean;
  onDark?: boolean;
}) {
  return (
    <p {...stylex.props(styles.hang, mirror && styles.hangEnd, onDark && styles.hangOnDark)}>
      <Hook mirror={mirror} onDark={onDark} />
      {number === undefined ? null : (
        <span {...stylex.props(styles.hangNumber, onDark && styles.hangNumberOnDark)}>
          {twoDigits(number)}
        </span>
      )}
      {children}
    </p>
  );
}

function HookArrow({ size = 16 }: { size?: number }) {
  return (
    <CornerDownRight
      size={size}
      strokeWidth={1.5}
      absoluteStrokeWidth
      aria-hidden="true"
      {...stylex.props(styles.hookIcon)}
    />
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

function MarketTags({
  label,
  onDark = false,
  hangEnter = false,
  sx,
}: {
  label: string;
  onDark?: boolean;
  hangEnter?: boolean;
  sx?: StyleXStyles;
}) {
  return (
    <nav aria-label={label} {...stylex.props(sx)}>
      <ul {...stylex.props(styles.tagRow)}>
        {MARKETS.map((market, index) => (
          <li
            key={market.id}
            {...stylex.props(
              hangEnter && styles.heroHang,
              hangEnter && styles.enterDelay(introAfter(900 + index * 90)),
            )}
          >
            <a
              href={`#oox3-market-${market.id}`}
              onClick={(event) => goToMarket(event, index)}
              {...stylex.props(
                styles.hang,
                styles.tagLink,
                onDark && styles.hangOnDark,
                onDark && styles.tagLinkOnDark,
                stylex.defaultMarker(),
              )}
            >
              <Hook onDark={onDark} />
              <span {...stylex.props(styles.tagLinkText)}>
                <span {...stylex.props(styles.hangNumber, onDark && styles.hangNumberOnDark)}>
                  {twoDigits(index + 1)}
                </span>
                <span {...stylex.props(styles.tagName)}>{market.title}</span>
              </span>
              <HookArrow size={18} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function HeroBackdrop({ liquid }: { liquid: boolean }) {
  return (
    <div {...stylex.props(styles.heroBackdrop)}>
      <img
        src={IMAGES.hero}
        alt=""
        decoding="async"
        loading={liquid ? "eager" : "lazy"}
        {...stylex.props(styles.heroLayer, styles.heroImage)}
      />
      {liquid ? <LiquidImage src={IMAGES.hero} sx={styles.heroImage} /> : null}
      <div {...stylex.props(styles.heroLayer, styles.heroTintColor)} />
      <div {...stylex.props(styles.heroLayer, styles.heroTintScreen)} />
    </div>
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
      aria-labelledby="oox3-hero-title"
      {...stylex.props(styles.hero)}
    >
      <HeroGradeFilter />
      <m.div
        aria-hidden="true"
        {...stylex.props(styles.heroParallax)}
        style={reduce ? undefined : { y: backdropY }}
      >
        <HeroBackdrop liquid />
      </m.div>
      <m.div
        {...stylex.props(styles.shell, styles.inset120, styles.heroContent)}
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div {...stylex.props(styles.heroCopy)}>
          <h1 id="oox3-hero-title" {...stylex.props(styles.heroTitle)}>
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
        <MarketTags label="四大应用领域" hangEnter sx={styles.heroTags} />
      </m.div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      aria-labelledby="oox3-about-title"
      {...stylex.props(styles.about, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.mirrorGrid)}>
        <DropIn sx={styles.mirrorStart}>
          <Hang number={1} mirror>
            {SECTION_LABELS.about}
          </Hang>
          <h2 id="oox3-about-title" {...stylex.props(styles.sectionTitle, styles.aboutTitle)}>
            {ABOUT.title}
          </h2>
        </DropIn>
        <span aria-hidden="true" {...stylex.props(styles.mirrorAxis)} />
        <ZoomReveal sx={styles.mirrorEnd} delay={0.1}>
          <p {...stylex.props(styles.aboutText)}>{ABOUT.body}</p>
          <a
            href={ABOUT.cta.href}
            {...stylex.props(
              styles.button,
              styles.buttonPrimary,
              styles.buttonCompact,
              stylex.defaultMarker(),
            )}
          >
            {ABOUT.cta.label}
            <HookArrow />
          </a>
        </ZoomReveal>
      </div>
    </section>
  );
}

function ProductsIntro() {
  const plumbRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: plumbRef, offset: ["start 0.95", "end 0.6"] });
  return (
    <div {...stylex.props(styles.shell, styles.inset120, styles.productsIntro)}>
      <DropIn sx={[styles.head, styles.headCenter]}>
        <Hang number={2}>{SECTION_LABELS.products}</Hang>
        <h2 id="oox3-products-title" {...stylex.props(styles.sectionTitle)}>
          {PRODUCTS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{PRODUCTS_INTRO.lead}</p>
      </DropIn>
      <m.span
        ref={plumbRef}
        aria-hidden="true"
        {...stylex.props(styles.plumb)}
        style={reduce ? undefined : { scaleY: scrollYProgress }}
      />
    </div>
  );
}

function MarketStage({
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
    on ? position - index : 1,
  );
  const clipPath = useTransform(local, windowClip);
  const imageScale = useTransform(
    local,
    (value) => 1.28 - 0.28 * easeInOut(clamp01(value)) + 0.08 * easeInOut(clamp01(value - 1)),
  );
  const copyOpacity = useTransform(local, [0.62, 0.9, 1.04, 1.26], [0, 1, 1, 0]);
  const copyEvents = useTransform(copyOpacity, (value) => (value > 0.5 ? "auto" : "none"));
  const titleY = useTransform(local, [0.62, 0.82, 0.94], [-44, 7, 0]);
  const startY = useTransform(local, [0.62, 0.92], [-18, 0]);
  const endY = useTransform(local, [0.7, 0.98], [22, 0]);
  const alt = index % 2 === 1;
  return (
    <li
      id={`oox3-market-${market.id}`}
      aria-labelledby={titleId}
      onFocus={() => revealMarket(index)}
      {...stylex.props(styles.stage, index > 0 && styles.stageJoined, alt && styles.stageAlt)}
    >
      <m.div
        {...stylex.props(styles.stageStart)}
        style={{ opacity: copyOpacity, pointerEvents: copyEvents }}
      >
        <m.div style={{ y: startY }}>
          <Hang number={index + 1} mirror>
            <span lang="en">
              / {twoDigits(MARKETS.length)} · {market.english}
            </span>
          </Hang>
        </m.div>
        <m.h3 id={titleId} {...stylex.props(styles.stageTitle)} style={{ y: titleY }}>
          {market.title}
        </m.h3>
        <m.p lang="en" {...stylex.props(styles.stagePitch)} style={{ y: startY }}>
          {market.pitch}
        </m.p>
      </m.div>
      <figure {...stylex.props(styles.frame)}>
        {index === 0 ? <span aria-hidden="true" {...stylex.props(styles.frameSlot)} /> : null}
        <m.div {...stylex.props(styles.frameWindow)} style={{ clipPath }}>
          <m.img
            src={market.image}
            alt={market.title}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.frameImage)}
            style={{ scale: imageScale }}
          />
        </m.div>
      </figure>
      <m.div
        {...stylex.props(styles.stageEnd)}
        style={{ opacity: copyOpacity, pointerEvents: copyEvents, y: endY }}
      >
        <p {...stylex.props(styles.stageKicker)}>{market.kicker}</p>
        <ul aria-label={`${market.title} 细分方向`} {...stylex.props(styles.stageTags)}>
          {market.tags.map((tag) => (
            <li key={tag} {...stylex.props(styles.stageTag)}>
              <CornerDownRight
                size={14}
                strokeWidth={1.5}
                absoluteStrokeWidth
                aria-hidden="true"
                {...stylex.props(styles.stageTagIcon)}
              />
              {tag}
            </li>
          ))}
        </ul>
        <a
          href={MARKET_CTA.href}
          {...stylex.props(
            styles.button,
            styles.buttonPrimary,
            styles.buttonCompact,
            stylex.defaultMarker(),
          )}
        >
          {MARKET_CTA.label}
          <HookArrow />
        </a>
      </m.div>
    </li>
  );
}

function ApertureRun() {
  const runRef = useRef<HTMLDivElement>(null);
  const aperture = useAperture();
  const enabled = useMotionValue(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: runRef, offset: ["start start", "end end"] });
  const track = useTransform(scrollYProgress, APERTURE_STOPS, APERTURE_TRACK);
  useEffect(() => {
    enabled.set(aperture ? 1 : 0);
  }, [aperture, enabled]);
  useMotionValueEvent(track, "change", (position) => {
    setActive(Math.min(LAST_MARKET, Math.max(0, Math.floor(position - 0.3))));
  });
  return (
    <div ref={runRef} id={RUN_ID} {...stylex.props(styles.run)}>
      <div {...stylex.props(styles.runViewport)}>
        <nav aria-label="产品领域" {...stylex.props(styles.rail)}>
          {MARKETS.map((market, index) => (
            <a
              key={market.id}
              href={`#oox3-market-${market.id}`}
              aria-current={active === index ? "step" : undefined}
              onClick={(event) => goToMarket(event, index)}
              {...stylex.props(styles.railTag, active === index && styles.railTagActive)}
            >
              <span {...stylex.props(styles.hangNumber)}>{twoDigits(index + 1)}</span>
              {market.title}
            </a>
          ))}
        </nav>
        <ol {...stylex.props(styles.stages)}>
          {MARKETS.map((market, index) => (
            <MarketStage
              key={market.id}
              market={market}
              index={index}
              track={track}
              enabled={enabled}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

function Products() {
  return (
    <section id="products" aria-labelledby="oox3-products-title" {...stylex.props(styles.anchor)}>
      <ProductsIntro />
      <ApertureRun />
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

function Strengths() {
  return (
    <section
      id="strengths"
      aria-labelledby="oox3-strengths-title"
      {...stylex.props(styles.strengths, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120)}>
        <DropIn sx={styles.head}>
          <Hang number={3}>{SECTION_LABELS.strengths}</Hang>
          <h2 id="oox3-strengths-title" {...stylex.props(styles.sectionTitle)}>
            {STRENGTHS_INTRO.title}
          </h2>
          <p {...stylex.props(styles.sectionLead)}>{STRENGTHS_INTRO.lead}</p>
        </DropIn>
      </div>
      <div {...stylex.props(styles.shell, styles.inset120)}>
        <ul {...stylex.props(styles.strengthRail)}>
          {STRENGTHS.map((strength, index) => {
            const Icon = STRENGTH_ICONS[strength.icon];
            const inverse = strength.tone === "blue";
            return (
              <li key={strength.title} {...stylex.props(styles.strengthSlot)}>
                <DropIn sx={styles.strengthHang} delay={index * STAGGER * 1.5} swing={-5}>
                  <article
                    aria-labelledby={`oox3-strength-${index}`}
                    {...stylex.props(
                      styles.strengthCard,
                      TONE_STYLES[strength.tone],
                      stylex.defaultMarker(),
                    )}
                  >
                    <IconPattern icon={strength.icon} />
                    <div {...stylex.props(styles.strengthTop, inverse && styles.strengthInverse)}>
                      <Icon size={32} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                      <span aria-hidden="true" {...stylex.props(styles.strengthNumber)}>
                        {twoDigits(index + 1)}
                      </span>
                    </div>
                    <div {...stylex.props(styles.strengthText, inverse && styles.strengthInverse)}>
                      <h3 id={`oox3-strength-${index}`} {...stylex.props(styles.strengthTitle)}>
                        {strength.title}
                      </h3>
                      {strength.description ? (
                        <p {...stylex.props(styles.strengthSmall)}>{strength.description}</p>
                      ) : null}
                      {strength.link ? (
                        <a href="#offices" {...stylex.props(styles.strengthLink)}>
                          {strength.link}
                          <HookArrow size={14} />
                        </a>
                      ) : null}
                    </div>
                  </article>
                </DropIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Campus() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center 0.55"] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(30% 34% 30% 34% round 480px)", "inset(0% 0% 0% 0% round 0px)"],
  );
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  return (
    <section
      id="campus"
      aria-labelledby="oox3-campus-title"
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
            <Hang number={4} onDark>
              <span lang="en">{CAMPUS.echo}</span>
            </Hang>
            <h2 id="oox3-campus-title" {...stylex.props(styles.sectionTitle, styles.campusTitle)}>
              {CAMPUS.label}
            </h2>
          </div>
        </m.div>
      </div>
      <div {...stylex.props(styles.shell, styles.inset120, styles.statsBand)}>
        {STATS.map((stat, index) => (
          <DropIn key={stat.label} sx={styles.stat} delay={index * STAGGER * 1.5}>
            <Hang>{stat.label}</Hang>
            <p {...stylex.props(styles.statFigure)}>
              <span {...stylex.props(styles.statValue)}>{stat.value}</span>
              {stat.unit ? <span {...stylex.props(styles.statUnit)}>{stat.unit}</span> : null}
            </p>
            <p {...stylex.props(styles.mutedText)}>{stat.caption}</p>
          </DropIn>
        ))}
      </div>
    </section>
  );
}

function Offices() {
  return (
    <section id="offices" aria-labelledby="oox3-offices-title" {...stylex.props(styles.anchor)}>
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
            <Hang number={5}>{SECTION_LABELS.offices}</Hang>
            <h2 id="oox3-offices-title" {...stylex.props(styles.sectionTitle)}>
              {GLOBAL_INTRO.title}
            </h2>
            <p {...stylex.props(styles.sectionLead)}>{GLOBAL_INTRO.lead}</p>
          </div>
        </ZoomReveal>
      </div>
      <div {...stylex.props(styles.officesBand)}>
        <div {...stylex.props(styles.shell, styles.inset120, styles.regions)}>
          {OFFICE_COLUMNS.map((column, index) => (
            <DropIn key={column[0].region} delay={index * STAGGER} sx={styles.officeColumn}>
              {column.map((group) => (
                <div key={group.region} {...stylex.props(styles.officeGroup)}>
                  <h3 {...stylex.props(styles.hang, styles.regionHang)}>
                    <Hook />
                    {group.region}
                  </h3>
                  <ul {...stylex.props(styles.list)}>
                    {group.offices.map((office) => (
                      <li key={office} {...stylex.props(styles.mutedText)}>
                        {office}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </DropIn>
          ))}
        </div>
      </div>
    </section>
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
          <m.span
            aria-hidden="true"
            {...stylex.props(styles.newsIconSlot)}
            animate={{ rotate: open ? 90 : 0 }}
            transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.35, bounce: 0.2 }}
          >
            <CornerDownRight size={18} strokeWidth={1.5} absoluteStrokeWidth />
          </m.span>
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
      aria-labelledby="oox3-news-title"
      {...stylex.props(styles.news, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.newsInner)}>
        <DropIn sx={styles.head}>
          <Hang number={6}>{SECTION_LABELS.news}</Hang>
          <h2 id="oox3-news-title" {...stylex.props(styles.sectionTitle)}>
            {NEWS_TITLE}
          </h2>
        </DropIn>
        <ul {...stylex.props(styles.accordion)}>
          {NEWS.map((item, index) => (
            <li key={item.title} {...stylex.props(styles.newsItem)}>
              <NewsItem
                item={item}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactMirror() {
  return (
    <section
      id="contact"
      aria-labelledby="oox3-contact-title"
      {...stylex.props(styles.contact, styles.anchor)}
    >
      <div aria-hidden="true" {...stylex.props(styles.heroParallax)}>
        <HeroBackdrop liquid={false} />
      </div>
      <div {...stylex.props(styles.shell, styles.inset120, styles.contactContent)}>
        <MarketTags label="选择应用领域" sx={styles.contactTags} />
        <DropIn sx={styles.contactCopy}>
          <Hang number={7} mirror>
            {SECTION_LABELS.contact}
          </Hang>
          <p lang="en" {...stylex.props(styles.contactDisplay)}>
            <span {...stylex.props(styles.contactLine, styles.contactLineSoft)}>
              {CONTACT_FIRST}
            </span>
            <span {...stylex.props(styles.contactLine)}>
              {CONTACT_BEFORE}
              <span {...stylex.props(styles.heroAccent, styles.contactAccent)}>
                {CONTACT_DISPLAY.accent}
              </span>
              {CONTACT_AFTER}
            </span>
          </p>
          <h2 id="oox3-contact-title" {...stylex.props(styles.sectionTitle)}>
            {CTA.title}
          </h2>
          <p {...stylex.props(styles.sectionLead, styles.contactLead)}>{CTA.lead}</p>
          <a
            href={CTA.action.href}
            {...stylex.props(
              styles.button,
              styles.buttonPrimary,
              styles.buttonWide,
              stylex.defaultMarker(),
            )}
          >
            {CTA.action.label}
            <HookArrow />
          </a>
        </DropIn>
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

export function VariantOOX3() {
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
              <Products />
              <Strengths />
              <Campus />
              <Offices />
              <News />
              <ContactMirror />
            </main>
            <SiteFooter />
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
