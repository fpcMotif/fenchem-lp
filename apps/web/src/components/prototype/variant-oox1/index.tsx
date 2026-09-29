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
  useMotionValue,
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
import { INTRO_REVEAL_MS, introStyles, useIntro } from "../variant-oos/intro";
import { LiquidImage } from "../variant-oos/liquid-hero";
import {
  ABOUT,
  CAMPUS,
  CONTACT,
  COPYRIGHT,
  DECK_CLOSE,
  DECK_OPEN,
  ECHO,
  FOOTER_COLUMNS,
  GLOBAL_INTRO,
  HERO,
  HERO_DECK,
  IMAGES,
  MARKET_CTA,
  MARKETS,
  MARQUEE,
  NAV_ITEMS,
  NEWS,
  NEWS_TITLE,
  OFFICE_COLUMNS,
  OFFICE_MAP_PINS,
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
const RULE_INK = "rgba(26, 26, 26, 0.55)";
const RULE_ON_DARK = "rgba(255, 255, 255, 0.3)";
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const SERIF_FONT = '"Instrument Serif", "Times New Roman", serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const DECK_QUERY =
  "(min-width: 1280px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
const DECK = `@media ${DECK_QUERY}`;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BLOOM_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const INSET_120 = "min(120px, 8.333vw)";
const INSET_118 = "min(118px, 8.194vw)";

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));
const HEADER_HEIGHT = 80;

const DECK_ID = "oox1-deck";
const DECK_TOPS = [96, 124, 152, 180] as const;
const DECK_SCALE_STEP = 0.022;
const DECK_DIM_STEP = 0.14;

const ZOOM_FROM_SCALE = 0.96;
const SETTLED = "translateY(0px) scale(1)";
const zoomFrom = (y: number, scale: number) => `translateY(${y}px) scale(${scale})`;
const twoDigits = (value: number) => String(value).padStart(2, "0");
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const [HEADLINE_OPENING, HEADLINE_CLOSING] = HERO.headline;
const [OPENING_BEFORE, OPENING_AFTER] = HEADLINE_OPENING.split(HERO.accent);
const CLOSING_BREAK = HEADLINE_CLOSING.lastIndexOf(" ");
const CLOSING_LEAD = HEADLINE_CLOSING.slice(0, CLOSING_BREAK);
const CLOSING_WORD = HEADLINE_CLOSING.slice(CLOSING_BREAK + 1).replace(/\.$/, "");

const MIRRORED_MARKETS = [...MARKETS].reverse();
const MARQUEE_LOOP = [...MARQUEE, ...MARQUEE];

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

const riseIn = stylex.keyframes({
  "0%": { opacity: 0, translate: "0px 24px" },
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

const loopLeft = stylex.keyframes({
  "0%": { translate: "0% 0px" },
  "100%": { translate: "-50% 0px" },
});

const loopRight = stylex.keyframes({
  "0%": { translate: "-50% 0px" },
  "100%": { translate: "0% 0px" },
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

  doubleRule: {
    width: "100%",
    height: 0,
    margin: 0,
    borderWidth: 0,
    borderTopWidth: 4,
    borderTopStyle: "double",
    borderTopColor: RULE_INK,
  },
  doubleRuleSoft: {
    borderTopColor: HAIRLINE,
  },
  doubleRuleOnDark: {
    borderTopColor: RULE_ON_DARK,
  },
  ring: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 38,
    height: 38,
    boxSizing: "border-box",
    borderRadius: "50%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "currentColor",
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: "currentColor",
    outlineOffset: 3,
    fontFamily: DISPLAY_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: colors.brandBlue700,
  },
  ringSmall: {
    width: 26,
    height: 26,
    outlineOffset: 2,
    fontSize: 10,
  },
  ringOnDark: {
    color: colors.paper,
  },

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
  echoOnDark: {
    color: colors.brandGreen300,
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

  button: {
    position: "relative",
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
  ghostWrap: {
    position: "relative",
    display: "inline-flex",
    alignSelf: "flex-start",
  },
  ghostWrapCenter: {
    alignSelf: "center",
  },
  ghostWrapEnd: {
    alignSelf: { default: "flex-start", [DESKTOP]: "flex-end" },
  },
  ghost: {
    position: "absolute",
    inset: 0,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    pointerEvents: "none",
    translate: {
      default: "6px 6px",
      [stylex.when.ancestor(":hover")]: "0px 0px",
      [stylex.when.ancestor(":focus-within")]: "0px 0px",
    },
    transitionProperty: "translate",
    transitionDuration: "260ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  ghostOnDark: {
    borderColor: colors.paper,
  },

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
      bottom: 1,
      height: 0,
      borderTopWidth: 4,
      borderTopStyle: "double",
      borderTopColor: "#0743a2",
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
    animationDuration: { default: "1000ms", [breakpoints.motionReduce]: "300ms" },
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
    paddingTop: { default: 176, [DESKTOP]: 320 },
    paddingBottom: { default: 96, [DESKTOP]: 0 },
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
  heroDeck: {
    display: { default: "none", [DESKTOP]: "block" },
    position: "absolute",
    right: `calc(${INSET_120} + 48px)`,
    bottom: 132,
    width: 204,
    height: 300,
    color: INK,
    textDecoration: "none",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 8,
  },
  heroDeckCard: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 180,
    height: 203,
    padding: 6,
    boxSizing: "border-box",
    backgroundColor: colors.paper,
    boxShadow: "0 18px 36px -18px rgba(7, 40, 110, 0.45), 0 0 0 1px rgba(26, 26, 26, 0.06)",
    transformOrigin: "50% 100%",
    transitionProperty: "translate, rotate",
    transitionDuration: "520ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  heroDeckAt0: {
    translate: { default: "12px 0px", [stylex.when.ancestor(":hover")]: "-78px -18px" },
    rotate: { default: "0deg", [stylex.when.ancestor(":hover")]: "-9deg" },
  },
  heroDeckAt1: {
    translate: { default: "12px 14px", [stylex.when.ancestor(":hover")]: "-22px -4px" },
    rotate: { default: "0deg", [stylex.when.ancestor(":hover")]: "-3deg" },
  },
  heroDeckAt2: {
    translate: { default: "12px 28px", [stylex.when.ancestor(":hover")]: "34px 2px" },
    rotate: { default: "0deg", [stylex.when.ancestor(":hover")]: "3deg" },
  },
  heroDeckAt3: {
    translate: { default: "12px 42px", [stylex.when.ancestor(":hover")]: "90px 8px" },
    rotate: { default: "0deg", [stylex.when.ancestor(":hover")]: "9deg" },
  },
  heroDeckImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroDeckLabel: {
    position: "absolute",
    left: 12,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.08em",
  },

  about: {
    position: "relative",
    overflow: "clip",
    paddingTop: { default: 72, [DESKTOP]: 120 },
    paddingBottom: { default: 88, [DESKTOP]: 150 },
    backgroundColor: colors.brandBlue950,
    color: colors.paper,
  },
  aboutWord: {
    position: "absolute",
    right: "-0.04em",
    bottom: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: { default: "38vw", [DESKTOP]: "min(400px, 28vw)" },
    fontWeight: 800,
    lineHeight: 0.74,
    letterSpacing: "-0.06em",
    color: "rgba(255, 255, 255, 0.05)",
    translate: "0 18%",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    userSelect: "none",
  },
  aboutInner: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, [DESKTOP]: 56 },
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [DESKTOP]: "minmax(0, 4fr) minmax(0, 8fr)",
    },
    gap: { default: 28, [DESKTOP]: 48 },
    alignItems: "start",
  },
  aboutTitle: {
    color: colors.paper,
  },
  aboutBody: {
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  aboutText: {
    margin: 0,
    maxWidth: 760,
    fontSize: { default: 18, [TABLET]: 20, [DESKTOP]: 22 },
    fontWeight: 500,
    lineHeight: 1.85,
    color: "rgba(255, 255, 255, 0.88)",
    textWrap: "pretty",
  },

  frame: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 28, [DESKTOP]: 40 },
    paddingBlock: { default: 56, [DESKTOP]: 88 },
  },
  frameRow: {
    display: "flex",
    flexDirection: { default: "column", [DESKTOP]: "row" },
    alignItems: { default: "flex-start", [DESKTOP]: "flex-end" },
    justifyContent: "space-between",
    gap: { default: 16, [DESKTOP]: 64 },
  },
  frameLead: {
    maxWidth: 520,
  },
  frameIndex: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: "repeat(4, minmax(0, 1fr))",
    },
    gap: { default: 12, [DESKTOP]: 24 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  frameIndexItem: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    minHeight: 56,
    color: { default: INK, ":hover": colors.brandBlue700 },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "180ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 4,
  },
  frameIndexText: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  frameIndexName: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.2,
  },
  frameIndexWord: {
    fontFamily: DISPLAY_FONT,
    fontSize: 13,
    lineHeight: 1.2,
    color: BODY_TEXT,
    textTransform: "lowercase",
  },
  frameIndexMuted: {
    color: BODY_TEXT,
  },
  frameClose: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 24,
    rowGap: 12,
  },
  frameCloseLine: {
    margin: 0,
    fontSize: { default: 22, [DESKTOP]: 28 },
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: INK,
  },

  deck: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, [DECK]: "22vh" },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  card: {
    position: { default: "relative", [DECK]: "sticky" },
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: { default: "auto", [DECK]: "min(620px, calc(100vh - 212px))" },
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: HAIRLINE,
    backgroundColor: colors.paper,
    boxShadow: "0 -18px 40px -26px rgba(7, 40, 110, 0.35)",
    transformOrigin: "50% 0%",
    scrollMarginTop: HEADER_HEIGHT + 16,
  },
  deckTail: {
    display: { default: "none", [DECK]: "block" },
    height: "4vh",
  },
  cardAt0: { top: 96 },
  cardAt1: { top: 124, backgroundColor: SURFACE },
  cardAt2: { top: 152, backgroundColor: TINT },
  cardAt3: { top: 180 },
  cardDim: {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    backgroundColor: colors.brandBlue950,
    opacity: 0,
    pointerEvents: "none",
  },
  cardStrip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexShrink: 0,
    height: { default: 40, [DECK]: 28 },
    paddingInline: { default: 16, [TABLET]: 24, [DESKTOP]: 32 },
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.08em",
    color: BODY_TEXT,
  },
  cardStripName: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: INK,
    fontFamily: '"Noto Sans SC", "PingFang SC", sans-serif',
    letterSpacing: "0.12em",
  },
  cardStripNumber: {
    fontFamily: DISPLAY_FONT,
    color: colors.brandBlue700,
    fontVariantNumeric: "tabular-nums",
  },
  cardStripWord: {
    textTransform: "lowercase",
  },
  cardBody: {
    display: "flex",
    flexDirection: { default: "column", [DESKTOP]: "row" },
    alignItems: { default: "stretch", [DESKTOP]: "center" },
    gap: { default: 28, [DESKTOP]: "min(72px, 5vw)" },
    flexGrow: 1,
    minHeight: 0,
    paddingTop: { default: 20, [DESKTOP]: 28 },
    paddingBottom: { default: 28, [DESKTOP]: 32 },
    paddingInline: { default: 16, [TABLET]: 24, [DESKTOP]: 40 },
  },
  figure: {
    position: "relative",
    flexShrink: 0,
    width: { default: "calc(100% - 8px)", [DESKTOP]: "min(40%, 440px)" },
    maxWidth: { default: 537, [DESKTOP]: "none" },
    maxHeight: { default: "none", [DECK]: "calc(100% - 8px)" },
    aspectRatio: "545 / 614",
    margin: 0,
  },
  figureGhost: {
    position: "absolute",
    inset: 0,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    translate: "8px 8px",
    pointerEvents: "none",
  },
  figureFrame: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  figureImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 14, [DESKTOP]: "min(16px, 1.8vh)" },
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 0,
  },
  wordRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
  },
  word: {
    fontFamily: DISPLAY_FONT,
    fontSize: { default: 64, [TABLET]: 88, [DESKTOP]: "min(108px, 11vh)" },
    fontWeight: 800,
    lineHeight: 0.84,
    letterSpacing: "-0.055em",
    textTransform: "lowercase",
    color: INK,
    paddingBottom: "0.08em",
  },
  wordRing: {
    marginTop: 4,
  },
  cardTitle: {
    margin: 0,
    fontSize: { default: 28, [DESKTOP]: "min(40px, 4.4vh)" },
    fontWeight: 700,
    lineHeight: 1.15,
    color: INK,
  },
  pitch: {
    margin: 0,
    marginTop: -4,
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontSize: { default: 24, [DESKTOP]: "min(30px, 3.3vh)" },
    lineHeight: 1,
    color: colors.brandGreen800,
  },
  kicker: {
    margin: 0,
    maxWidth: 520,
    fontSize: { default: 16, [DESKTOP]: 17 },
    lineHeight: 1.6,
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  tags: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: 24,
    width: "100%",
    maxWidth: 560,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  tag: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    paddingBlock: { default: 10, [DESKTOP]: "min(11px, 1.2vh)" },
    borderTopWidth: 4,
    borderTopStyle: "double",
    borderTopColor: HAIRLINE,
    fontSize: 15,
    lineHeight: 1.3,
    color: INK,
  },
  tagIcon: {
    flexShrink: 0,
    color: colors.brandBlue700,
  },

  strengths: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 48,
    paddingBlock: { default: 72, [DESKTOP]: 120 },
    backgroundColor: colors.paper,
  },
  strengthGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [TABLET]: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: "repeat(4, minmax(0, 1fr))",
    },
    gap: { default: 12, [DESKTOP]: 16 },
    width: "100%",
    maxWidth: 1200,
  },
  strengthCard: {
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 40,
    minHeight: { default: 180, [DESKTOP]: 240 },
    padding: { default: 24, [DESKTOP]: 28 },
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
  strengthRing: {
    color: INK,
  },
  strengthText: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    color: INK,
  },
  strengthInverse: {
    color: "#ffffff",
  },
  strengthTitle: {
    margin: 0,
    fontSize: { default: 18, [DESKTOP]: 20 },
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
    alignSelf: "flex-start",
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

  campus: {
    backgroundColor: colors.paper,
  },
  campusFrame: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    aspectRatio: { default: "4 / 3", [breakpoints.md]: "1440 / 640" },
  },
  campusImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  campusHead: {
    paddingTop: { default: 72, [DESKTOP]: 120 },
  },
  figures: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    paddingBlock: { default: 40, [DESKTOP]: 64 },
  },
  figureItem: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingBlock: { default: 20, [breakpoints.md]: 8 },
    paddingInline: { default: 0, [breakpoints.md]: 32 },
    borderTopWidth: { default: 4, [breakpoints.md]: 0 },
    borderTopStyle: "double",
    borderTopColor: HAIRLINE,
    borderInlineStartWidth: { default: 0, [breakpoints.md]: 4 },
    borderInlineStartStyle: "double",
    borderInlineStartColor: HAIRLINE,
  },
  figureItemFirst: {
    borderTopWidth: { default: 0, [breakpoints.md]: 0 },
    borderInlineStartWidth: { default: 0, [breakpoints.md]: 0 },
    paddingInlineStart: { default: 0, [breakpoints.md]: 0 },
  },
  figureLabel: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.3,
    color: BODY_TEXT,
  },
  figureValue: {
    display: "flex",
    alignItems: "flex-start",
    gap: 4,
    margin: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: { default: 64, [DESKTOP]: 96 },
    fontWeight: 800,
    lineHeight: 0.95,
    letterSpacing: "-0.05em",
    fontVariantNumeric: "tabular-nums",
    color: INK,
  },
  figureUnit: {
    fontSize: "0.4em",
    fontWeight: 500,
    letterSpacing: "-0.02em",
    color: colors.brandBlue700,
  },
  marquee: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    borderTopWidth: 4,
    borderTopStyle: "double",
    borderTopColor: RULE_INK,
    borderBottomWidth: 4,
    borderBottomStyle: "double",
    borderBottomColor: RULE_INK,
  },
  marqueeRow: {
    display: "flex",
    width: "max-content",
    paddingBlock: { default: 14, [DESKTOP]: 20 },
    animationName: { default: loopLeft, [breakpoints.motionReduce]: "none" },
    animationDuration: "48s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  marqueeRowReverse: {
    animationName: { default: loopRight, [breakpoints.motionReduce]: "none" },
    animationDuration: "56s",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  marqueeItem: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    paddingInlineEnd: { default: 40, [DESKTOP]: 64 },
    whiteSpace: "nowrap",
  },
  marqueeFigure: {
    fontFamily: DISPLAY_FONT,
    fontSize: { default: 40, [DESKTOP]: 64 },
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    color: INK,
  },
  marqueeFigureOutline: {
    color: "transparent",
    WebkitTextStrokeWidth: 1,
    WebkitTextStrokeColor: colors.brandBlue700,
  },
  marqueeLabel: {
    fontSize: { default: 14, [DESKTOP]: 16 },
    lineHeight: 1.2,
    color: BODY_TEXT,
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
    margin: 0,
    padding: 0,
    listStyleType: "none",
    borderBottomWidth: 4,
    borderBottomStyle: "double",
    borderBottomColor: HAIRLINE,
  },
  newsItem: {
    paddingBottom: 12,
    borderTopWidth: 4,
    borderTopStyle: "double",
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
    paddingTop: 24,
    paddingInline: 8,
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
    paddingInline: 8,
    paddingBottom: 12,
  },

  cta: {
    paddingTop: { default: 80, [DESKTOP]: 120 },
    paddingBottom: { default: 80, [DESKTOP]: 120 },
    backgroundColor: TINT,
  },
  ctaInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 28,
    textAlign: "center",
  },
  ctaRule: {
    maxWidth: 560,
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
    gap: 10,
    height: 44,
    paddingInlineStart: 8,
    paddingInlineEnd: 18,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: INK, ":hover": colors.brandBlue700 },
    borderRadius: 22,
    backgroundColor: { default: "transparent", ":hover": colors.paper },
    color: { default: INK, ":hover": colors.brandBlue700 },
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

const CARD_AT = [styles.cardAt0, styles.cardAt1, styles.cardAt2, styles.cardAt3] as const;
const HERO_DECK_AT = [
  styles.heroDeckAt0,
  styles.heroDeckAt1,
  styles.heroDeckAt2,
  styles.heroDeckAt3,
] as const;

function subscribeDeck(onChange: () => void) {
  const mediaQuery = window.matchMedia(DECK_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function useDeck() {
  return useSyncExternalStore(
    subscribeDeck,
    () => window.matchMedia(DECK_QUERY).matches,
    () => false,
  );
}

function deckStop(index: number) {
  const deck = document.getElementById(DECK_ID);
  if (!deck || !window.matchMedia(DECK_QUERY).matches) return null;
  const first = deck.children[0] as HTMLElement | undefined;
  if (!first) return null;
  const gap = Number.parseFloat(getComputedStyle(deck).rowGap) || 0;
  const top = deck.getBoundingClientRect().top + window.scrollY;
  return top + index * (first.offsetHeight + gap) - DECK_TOPS[index];
}

function goToCard(event: MouseEvent<HTMLAnchorElement>, index: number) {
  const stop = deckStop(index);
  if (stop === null) return;
  event.preventDefault();
  window.scrollTo({ top: stop });
}

function revealCard(index: number) {
  if (index === MARKETS.length - 1) return;
  const stop = deckStop(index);
  if (stop !== null && window.scrollY > stop + 8) window.scrollTo({ top: stop });
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

function DoubleRule({ sx }: { sx?: StyleXStyles }) {
  return <hr {...stylex.props(styles.doubleRule, sx)} />;
}

function Ring({ value, sx }: { value: number; sx?: StyleXStyles }) {
  return (
    <span aria-hidden="true" {...stylex.props(styles.ring, sx)}>
      {twoDigits(value)}
    </span>
  );
}

function Echo({ children, sx }: { children: ReactNode; sx?: StyleXStyles }) {
  return (
    <span aria-hidden="true" lang="en" {...stylex.props(styles.echo, sx)}>
      {children}
    </span>
  );
}

function GhostButton({
  href,
  label,
  variant = "primary",
  size = "compact",
  sx,
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  size?: "compact" | "wide" | "hero";
  sx?: StyleXStyles;
}) {
  return (
    <span {...stylex.props(styles.ghostWrap, stylex.defaultMarker(), sx)}>
      <span
        aria-hidden="true"
        {...stylex.props(styles.ghost, variant === "secondary" && styles.ghostOnDark)}
      />
      <a
        href={href}
        {...stylex.props(
          styles.button,
          variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary,
          size === "compact" && styles.buttonCompact,
          size === "wide" && styles.buttonWide,
          size === "hero" && styles.buttonHero,
        )}
      >
        {label}
      </a>
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

function HeroDeck() {
  return (
    <a
      href="#products"
      aria-label={HERO_DECK.aria}
      {...stylex.props(
        styles.heroDeck,
        styles.heroRise,
        styles.enterDelay(introAfter(900)),
        stylex.defaultMarker(),
      )}
    >
      {MARKETS.map((market, index) => (
        <span key={market.id} {...stylex.props(styles.heroDeckCard, HERO_DECK_AT[index])}>
          <img src={market.image} alt="" decoding="async" {...stylex.props(styles.heroDeckImage)} />
        </span>
      ))}
      <span aria-hidden="true" {...stylex.props(styles.heroDeckLabel)}>
        <Ring value={MARKETS.length} sx={styles.ringSmall} />
        {HERO_DECK.label}
      </span>
    </a>
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
      aria-labelledby="oox1-hero-title"
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
          <h1 id="oox1-hero-title" {...stylex.props(styles.heroTitle)}>
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
        <HeroDeck />
      </m.div>
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
      aria-labelledby="oox1-strengths-title"
      {...stylex.props(styles.strengths, styles.inset120, styles.anchor)}
    >
      <SectionHead
        id="oox1-strengths-title"
        title={STRENGTHS_INTRO.title}
        echo={ECHO.strengths}
        lead={STRENGTHS_INTRO.lead}
        center
      />
      <div {...stylex.props(styles.strengthGrid)}>
        {STRENGTHS.map((strength, index) => {
          const Icon = STRENGTH_ICONS[strength.icon];
          const inverse = strength.tone === "blue";
          return (
            <ZoomReveal
              key={strength.title}
              delay={index * STAGGER}
              sx={[styles.strengthCard, stylex.defaultMarker()]}
              style={TONE_STYLES[strength.tone]}
            >
              <IconPattern icon={strength.icon} />
              <div {...stylex.props(styles.strengthTop, inverse && styles.strengthInverse)}>
                <Ring value={index + 1} sx={[styles.strengthRing, inverse && styles.ringOnDark]} />
                <Icon size={28} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              </div>
              <div {...stylex.props(styles.strengthText, inverse && styles.strengthInverse)}>
                <h3 {...stylex.props(styles.strengthTitle)}>{strength.title}</h3>
                {strength.description ? (
                  <p {...stylex.props(styles.strengthSmall)}>{strength.description}</p>
                ) : null}
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
          );
        })}
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      aria-labelledby="oox1-about-title"
      {...stylex.props(styles.about, styles.anchor)}
    >
      <span aria-hidden="true" lang="en" {...stylex.props(styles.aboutWord)}>
        {ABOUT.echo}
      </span>
      <div {...stylex.props(styles.shell, styles.inset120, styles.aboutInner)}>
        <DoubleRule sx={styles.doubleRuleOnDark} />
        <div {...stylex.props(styles.aboutGrid)}>
          <ZoomReveal sx={styles.headRow}>
            <h2 id="oox1-about-title" {...stylex.props(styles.sectionTitle, styles.aboutTitle)}>
              {ABOUT.title}
            </h2>
            <Echo sx={styles.echoOnDark}>{ABOUT.echo}</Echo>
          </ZoomReveal>
          <ZoomReveal delay={0.08} sx={styles.aboutBody}>
            <p {...stylex.props(styles.aboutText)}>{ABOUT.body}</p>
            <GhostButton href={ABOUT.cta.href} label={ABOUT.cta.label} variant="secondary" />
          </ZoomReveal>
        </div>
      </div>
    </section>
  );
}

function FrameIndex({ mirrored = false }: { mirrored?: boolean }) {
  const items = mirrored ? MIRRORED_MARKETS : MARKETS;
  return (
    <ul
      aria-label={mirrored ? undefined : "四大应用领域"}
      aria-hidden={mirrored ? "true" : undefined}
      {...stylex.props(styles.frameIndex)}
    >
      {items.map((market) => {
        const index = MARKETS.indexOf(market);
        const body = (
          <>
            <Ring value={index + 1} />
            <span {...stylex.props(styles.frameIndexText)}>
              <span {...stylex.props(styles.frameIndexName)}>{market.title}</span>
              <span lang="en" {...stylex.props(styles.frameIndexWord)}>
                {market.english}
              </span>
            </span>
          </>
        );
        return (
          <li key={market.id}>
            {mirrored ? (
              <span {...stylex.props(styles.frameIndexItem, styles.frameIndexMuted)}>{body}</span>
            ) : (
              <a
                href={`#oox1-card-${market.id}`}
                onClick={(event) => goToCard(event, index)}
                {...stylex.props(styles.frameIndexItem)}
              >
                {body}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function DeckOpen() {
  return (
    <div {...stylex.props(styles.shell, styles.inset120, styles.frame)}>
      <DoubleRule />
      <div {...stylex.props(styles.frameRow)}>
        <SectionHead id="oox1-products-title" title={DECK_OPEN.title} echo={DECK_OPEN.echo} />
        <ZoomReveal delay={0.08} sx={styles.frameLead}>
          <p {...stylex.props(styles.sectionLead)}>{DECK_OPEN.lead}</p>
        </ZoomReveal>
      </div>
      <FrameIndex />
    </div>
  );
}

function DeckClose() {
  return (
    <div {...stylex.props(styles.shell, styles.inset120, styles.frame)}>
      <FrameIndex mirrored />
      <div {...stylex.props(styles.frameRow)}>
        <ZoomReveal sx={styles.frameClose}>
          <p {...stylex.props(styles.frameCloseLine)}>{DECK_CLOSE.line}</p>
          <Echo>{DECK_CLOSE.echo}</Echo>
        </ZoomReveal>
        <GhostButton
          href={DECK_CLOSE.cta.href}
          label={DECK_CLOSE.cta.label}
          sx={styles.ghostWrapEnd}
        />
      </div>
      <DoubleRule />
    </div>
  );
}

function DeckCard({
  market,
  index,
  depth,
}: {
  market: Market;
  index: number;
  depth: MotionValue<number>;
}) {
  const titleId = useId();
  const scale = useTransform(depth, (value) => 1 - value * DECK_SCALE_STEP);
  const dim = useTransform(depth, (value) => Math.min(0.42, value * DECK_DIM_STEP));
  return (
    <m.li
      id={`oox1-card-${market.id}`}
      aria-labelledby={titleId}
      onFocus={() => revealCard(index)}
      {...stylex.props(styles.card, CARD_AT[index])}
      style={{ scale }}
    >
      <div {...stylex.props(styles.cardStrip)}>
        <span {...stylex.props(styles.cardStripName)}>
          <span {...stylex.props(styles.cardStripNumber)}>{twoDigits(index + 1)}</span>
          {market.title}
        </span>
        <span lang="en" {...stylex.props(styles.cardStripWord)}>
          {twoDigits(index + 1)} / {twoDigits(MARKETS.length)} · {market.english}
        </span>
      </div>
      <DoubleRule sx={styles.doubleRuleSoft} />
      <div {...stylex.props(styles.cardBody)}>
        <figure {...stylex.props(styles.figure)}>
          <span aria-hidden="true" {...stylex.props(styles.figureGhost)} />
          <div {...stylex.props(styles.figureFrame)}>
            <img
              src={market.image}
              alt={market.title}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.figureImage)}
            />
          </div>
        </figure>
        <div {...stylex.props(styles.copy)}>
          <div {...stylex.props(styles.wordRow)}>
            <span aria-hidden="true" lang="en" {...stylex.props(styles.word)}>
              {market.word}
            </span>
            <Ring value={index + 1} sx={styles.wordRing} />
          </div>
          <h3 id={titleId} {...stylex.props(styles.cardTitle)}>
            {market.title}
          </h3>
          <p lang="en" {...stylex.props(styles.pitch)}>
            {market.pitch}
          </p>
          <p {...stylex.props(styles.kicker)}>{market.kicker}</p>
          <ul aria-label={`${market.title} 细分方向`} {...stylex.props(styles.tags)}>
            {market.tags.map((tag) => (
              <li key={tag} {...stylex.props(styles.tag)}>
                <Plus
                  size={12}
                  strokeWidth={1.5}
                  absoluteStrokeWidth
                  aria-hidden="true"
                  {...stylex.props(styles.tagIcon)}
                />
                {tag}
              </li>
            ))}
          </ul>
          <GhostButton href={MARKET_CTA.href} label={MARKET_CTA.label} />
        </div>
      </div>
      <m.span aria-hidden="true" {...stylex.props(styles.cardDim)} style={{ opacity: dim }} />
    </m.li>
  );
}

function DeckCardSlot({
  market,
  index,
  metrics,
}: {
  market: Market;
  index: number;
  metrics: {
    progress: MotionValue<number>;
    span: MotionValue<number>;
    stride: MotionValue<number>;
    cardHeight: MotionValue<number>;
    enabled: MotionValue<number>;
  };
}) {
  const depth = useTransform<number, number>(
    [metrics.progress, metrics.span, metrics.stride, metrics.cardHeight, metrics.enabled],
    ([progress, span, stride, cardHeight, enabled]) => {
      if (!enabled || !cardHeight) return 0;
      const local = progress * span;
      let depthSoFar = 0;
      for (let next = index + 1; next < MARKETS.length; next++) {
        const stick = next * stride - DECK_TOPS[next];
        depthSoFar += clamp01((local - (stick - cardHeight)) / cardHeight);
      }
      return depthSoFar;
    },
  );
  return <DeckCard market={market} index={index} depth={depth} />;
}

function Deck() {
  const deckRef = useRef<HTMLOListElement>(null);
  const decking = useDeck();
  const enabled = useMotionValue(0);
  const span = useMotionValue(0);
  const stride = useMotionValue(0);
  const cardHeight = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: deckRef, offset: ["start start", "end start"] });
  useEffect(() => {
    enabled.set(decking ? 1 : 0);
    const deck = deckRef.current;
    if (!deck) return;
    const measure = () => {
      const first = deck.children[0] as HTMLElement | undefined;
      if (!first) return;
      const gap = Number.parseFloat(getComputedStyle(deck).rowGap) || 0;
      span.set(deck.offsetHeight);
      stride.set(first.offsetHeight + gap);
      cardHeight.set(first.offsetHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(deck);
    return () => observer.disconnect();
  }, [decking, enabled, span, stride, cardHeight]);
  const metrics = { progress: scrollYProgress, span, stride, cardHeight, enabled };
  return (
    <div {...stylex.props(styles.shell, styles.inset120)}>
      <ol ref={deckRef} id={DECK_ID} {...stylex.props(styles.deck)}>
        {MARKETS.map((market, index) => (
          <DeckCardSlot key={market.id} market={market} index={index} metrics={metrics} />
        ))}
        <li aria-hidden="true" {...stylex.props(styles.deckTail)} />
      </ol>
    </div>
  );
}

function Products() {
  return (
    <section id="products" aria-labelledby="oox1-products-title" {...stylex.props(styles.anchor)}>
      <DeckOpen />
      <Deck />
      <DeckClose />
    </section>
  );
}

function Campus() {
  const reduce = useReducedMotion();
  return (
    <section
      id="campus"
      aria-labelledby="oox1-campus-title"
      {...stylex.props(styles.campus, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.campusHead)}>
        <SectionHead id="oox1-campus-title" title={CAMPUS.label} echo={CAMPUS.echo} />
      </div>
      <div {...stylex.props(styles.shell, styles.inset120, styles.figures)}>
        {STATS.map((stat, index) => (
          <ZoomReveal
            key={stat.label}
            delay={index * STAGGER}
            sx={[styles.figureItem, index === 0 && styles.figureItemFirst]}
          >
            <p {...stylex.props(styles.figureLabel)}>{stat.label}</p>
            <p {...stylex.props(styles.figureValue)}>
              {stat.value}
              {stat.unit ? <span {...stylex.props(styles.figureUnit)}>{stat.unit}</span> : null}
            </p>
            <p {...stylex.props(styles.figureLabel)}>{stat.caption}</p>
          </ZoomReveal>
        ))}
      </div>
      <FigureLoop />
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
    </section>
  );
}

function FigureLoop() {
  return (
    <div aria-hidden="true" {...stylex.props(styles.marquee)}>
      <div {...stylex.props(styles.marqueeRow)}>
        {MARQUEE_LOOP.map((item, index) => (
          <span key={index} {...stylex.props(styles.marqueeItem)}>
            <span {...stylex.props(styles.marqueeFigure)}>{item.figure}</span>
            <span {...stylex.props(styles.marqueeLabel)}>{item.label}</span>
          </span>
        ))}
      </div>
      <div {...stylex.props(styles.marqueeRow, styles.marqueeRowReverse)}>
        {MARQUEE_LOOP.map((item, index) => (
          <span key={index} {...stylex.props(styles.marqueeItem)}>
            <span {...stylex.props(styles.marqueeFigure, styles.marqueeFigureOutline)}>
              {item.figure}
            </span>
            <span {...stylex.props(styles.marqueeLabel)}>{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Offices() {
  return (
    <section id="offices" aria-labelledby="oox1-offices-title" {...stylex.props(styles.anchor)}>
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
                  styles.pinAt(`${pin.left}%`, `${pin.top}%`, `${(index * 370) % 2800}ms`),
                )}
              />
            ))}
          </div>
          <div {...stylex.props(styles.globalCopy)}>
            <div {...stylex.props(styles.headRow, styles.headRowCenter)}>
              <h2 id="oox1-offices-title" {...stylex.props(styles.sectionTitle)}>
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
      aria-labelledby="oox1-news-title"
      {...stylex.props(styles.news, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.newsInner)}>
        <SectionHead id="oox1-news-title" title={NEWS_TITLE} echo={ECHO.news} />
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
      aria-labelledby="oox1-contact-title"
      {...stylex.props(styles.cta, styles.anchor)}
    >
      <ZoomReveal sx={[styles.shell, styles.inset120, styles.ctaInner]}>
        <DoubleRule sx={styles.ctaRule} />
        <div {...stylex.props(styles.headRow, styles.headRowCenter)}>
          <h2 id="oox1-contact-title" {...stylex.props(styles.sectionTitle)}>
            {CONTACT.title}
          </h2>
          <Echo>{CONTACT.echo}</Echo>
        </div>
        <p {...stylex.props(styles.sectionLead, styles.ctaLead)}>{CONTACT.lead}</p>
        <ul aria-label="选择应用领域" {...stylex.props(styles.ctaMarkets)}>
          {MARKETS.map((market, index) => (
            <li key={market.id}>
              <a
                href={`#oox1-card-${market.id}`}
                onClick={(event) => goToCard(event, index)}
                {...stylex.props(styles.ctaMarket)}
              >
                <Ring value={index + 1} sx={styles.ringSmall} />
                {market.title}
              </a>
            </li>
          ))}
        </ul>
        <GhostButton
          href={CONTACT.action.href}
          label={CONTACT.action.label}
          size="wide"
          sx={styles.ghostWrapCenter}
        />
        <DoubleRule sx={styles.ctaRule} />
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
        <DoubleRule sx={styles.doubleRuleOnDark} />
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

export function VariantOOX1() {
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
              <Strengths />
              <Offices />
              <About />
              <Products />
              <Campus />
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
