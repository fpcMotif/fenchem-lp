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
  useInView,
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
  COPYRIGHT,
  CTA,
  FOOTER_COLUMNS,
  GLOBAL_INTRO,
  HERO,
  IMAGES,
  NAV_ITEMS,
  NEWS,
  NEWS_TITLE,
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
const OOX_WORD_ON_TINT = "#d7e1f1";
const WORD_ON_TINT = `color-mix(in srgb, ${OOX_WORD_ON_TINT} 80%, ${TINT})`;
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const SURFACE = "#f6f6f6";
const PANEL_ALT = "#e8e8e8";
const FOOTER_BLUE = "#294f92";
const HERO_OVERLAY = "#0743a9";
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const HOVER_MOTION =
  "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const INSET_120 = "min(120px, 8.333vw)";
const INSET_124 = "min(124px, 8.611vw)";
const INSET_132 = "min(132px, 9.167vw)";
const INSET_118 = "min(118px, 8.194vw)";

const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));
const HEADER_HEIGHT = 80;

const ABOUT_CHARS = ABOUT.lines.join("").length;
const ABOUT_INK_LINES = (() => {
  let inked = 0;
  return ABOUT.lines.map((line) =>
    line.split(/(?<=[，。、])/).map((text) => {
      const start = inked / ABOUT_CHARS;
      inked += text.length;
      return { text, range: [start, inked / ABOUT_CHARS] as [number, number] };
    }),
  );
})();

const CLIP_FROM = { top: 17, side: 22, bottom: 13, radius: 44 };
const CLIP_TO = { top: 0, side: 0, bottom: 0, radius: 0 };
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const revealProgress = (progress: number) => 1 - (1 - clamp01(progress)) ** 3;

const QUADRANT_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const QUADRANT_DIRECTIONS = [
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
] as const;
const RING_RADIUS = 62;
const RING_LENGTH = Math.round(2 * Math.PI * RING_RADIUS);

const subscribeQuadrants = (onChange: () => void) => {
  const media = window.matchMedia(QUADRANT_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

function useQuadrantMotion() {
  return useSyncExternalStore(
    subscribeQuadrants,
    () => window.matchMedia(QUADRANT_QUERY).matches,
    () => false,
  );
}

const RISE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const RISE_STAGGER = 0.06;
const RISE_MAX_STEPS = 3;
const riseDelay = (index: number) => Math.min(index, RISE_MAX_STEPS) * RISE_STAGGER;

const BLOOM_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const LINE_RISE_EASE = "cubic-bezier(0.2, 0.7, 0, 1)";
const MAP_PIN_STAGGER_MS = 40;
const MAP_SWEEP_MS = 1200;
const MAP_SWEEP_EASE = "cubic-bezier(0.33, 1, 0.68, 1)";
const [HEADLINE_OPENING, HEADLINE_CLOSING] = HERO.headline;
const [OPENING_BEFORE, OPENING_AFTER] = HEADLINE_OPENING.split(HERO.accent);
const CLOSING_BREAK = HEADLINE_CLOSING.lastIndexOf(" ");
const CLOSING_LEAD = HEADLINE_CLOSING.slice(0, CLOSING_BREAK);
const CLOSING_WORD = HEADLINE_CLOSING.slice(CLOSING_BREAK + 1).replace(/\.$/, "");

const revealZoom = stylex.keyframes({
  "0%": { scale: "1.22" },
  "100%": { scale: "1" },
});

const pinPulse = stylex.keyframes({
  "0%": { scale: "0.2", opacity: 0.85 },
  "100%": { scale: "2.4", opacity: 0 },
});

const mapSweep = stylex.keyframes({
  "0%": { maskPosition: "100% 0%" },
  "100%": { maskPosition: "0% 0%" },
});

const mapSlideIn = stylex.keyframes({
  "0%": { translate: "-120px 0px" },
  "100%": { translate: "0px 0px" },
});

const slideFromLeft = stylex.keyframes({
  "0%": { opacity: 0, translate: "-80px 0px" },
  "100%": { opacity: 1, translate: "0px 0px" },
});

const introAfter = (ms: number) => `calc(var(--oo-intro, 0ms) + ${ms}ms)`;

const lineRise = stylex.keyframes({
  "0%": { translate: "0px 100%", clipPath: "inset(-0.4em -0.4em 100% -0.4em)" },
  "100%": { translate: "0px 0px", clipPath: "inset(-0.4em -0.4em -0.4em -0.4em)" },
});

const logoPartRise = stylex.keyframes({
  "0%": { opacity: 0, scale: "0.9" },
  "100%": { opacity: 1, scale: "1" },
});

const LOGO_SWEEP_MS_PER_UNIT = 1.5;
const logoPartDelay = (d: string) => {
  const startX = Number(/^M(-?[\d.]+)/.exec(d)?.[1] ?? 0);
  return `${Math.round(startX * LOGO_SWEEP_MS_PER_UNIT)}ms`;
};

const CRACK_GAP = "0.035em 0em";

const crackOpen = stylex.keyframes({
  "0%": { translate: "0em 0em" },
  "100%": { translate: CRACK_GAP },
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

const DIGIT_CELLS = Array.from({ length: 20 }, (_, index) => index % 10);
const DIGIT_STAGGER = 0.09;
const STAT_STAGGER = 0.2;

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
  buttonCompact: { minWidth: 96, height: 48, paddingInline: 24 },
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
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 1px 0 0 rgba(26, 26, 26, 0.08)",
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
  logo: {
    display: "block",
    width: 161,
    height: 52,
  },
  logoPart: {
    transformBox: "fill-box",
    transformOrigin: "50% 50%",
    animationName: { default: logoPartRise, [breakpoints.motionReduce]: fadeIn },
    animationDuration: { default: "280ms", [breakpoints.motionReduce]: "200ms" },
    animationTimingFunction: EASE_OUT_CSS,
    animationFillMode: "both",
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
    gap: 8,
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
  searchPlaceholder: {
    fontFamily: "inherit",
    fontSize: 14,
    lineHeight: 1.2,
    color: BODY_TEXT,
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
  heroRise: {
    animationName: { default: lineRise, [breakpoints.motionReduce]: fadeIn },
    animationDuration: { default: "600ms", [breakpoints.motionReduce]: "300ms" },
    animationTimingFunction: LINE_RISE_EASE,
    animationFillMode: "both",
  },
  heroFade: {
    animationName: fadeIn,
    animationDuration: { default: "400ms", [breakpoints.motionReduce]: "300ms" },
    animationTimingFunction: EASE_OUT_CSS,
    animationFillMode: "both",
  },
  heroPeriodSeat: {
    display: "inline-block",
    marginInlineStart: "0.04em",
    translate: CRACK_GAP,
    animationName: { default: crackOpen, [breakpoints.motionReduce]: "none" },
    animationDuration: "900ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 920ms)",
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
    animationDelay: "calc(var(--oo-intro, 0ms) + 520ms)",
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
    translate: CRACK_GAP,
    animationName: { default: crackOpen, [breakpoints.motionReduce]: "none" },
    animationDuration: "900ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 920ms)",
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
    gap: 12,
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
  inkPhrase: {
    transitionProperty: "opacity",
    transitionDuration: "120ms",
    transitionTimingFunction: "linear",
  },

  campusStage: {
    position: "relative",
    width: "100%",
  },
  campusFrame: {
    overflow: "hidden",
    width: "100%",
    aspectRatio: "1440 / 716",
    willChange: "clip-path",
  },
  campusImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
    alignItems: "baseline",
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

  strengths: {
    overflowX: "clip",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { default: 48, [DESKTOP]: 72 },
    paddingBlock: { default: 72, [DESKTOP]: 144 },
    backgroundColor: colors.paper,
  },
  introBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    maxWidth: 768,
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
  quadrantUpper: {
    flexDirection: { default: "column", [breakpoints.md]: "column-reverse" },
  },
  quadrantRight: {
    alignItems: { default: "stretch", [breakpoints.md]: "flex-end" },
    textAlign: { default: "start", [breakpoints.md]: "end" },
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
  quadrantText: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "inherit",
    gap: 32,
    flexGrow: 1,
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
    color: FOOTER_BLUE,
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
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
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
    transform: { default: null, ":hover": { default: null, [HOVER_MOTION]: "scale(1.04)" } },
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
  },
  mapRingPulse: {
    animationName: { default: pinPulse, [breakpoints.motionReduce]: "none" },
    animationDuration: "1600ms",
    animationTimingFunction: EASE_OUT_CSS,
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
  mapWrapEnter: {
    translate: { default: "-120px 0px", [breakpoints.motionReduce]: null },
  },
  mapWrapEnterRun: {
    animationName: { default: mapSlideIn, [breakpoints.motionReduce]: "none" },
    animationDuration: `${MAP_SWEEP_MS}ms`,
    animationTimingFunction: MAP_SWEEP_EASE,
    animationFillMode: "both",
  },
  mapSweep: {
    maskImage: {
      default: "linear-gradient(to right, #000 43.5%, transparent 56.5%)",
      [breakpoints.motionReduce]: "none",
    },
    maskSize: "230% 100%",
    maskRepeat: "no-repeat",
    maskPosition: "100% 0%",
    opacity: { default: null, [breakpoints.motionReduce]: 0 },
  },
  mapSweepRun: {
    animationName: { default: mapSweep, [breakpoints.motionReduce]: fadeIn },
    animationDuration: { default: `${MAP_SWEEP_MS}ms`, [breakpoints.motionReduce]: "300ms" },
    animationTimingFunction: MAP_SWEEP_EASE,
    animationFillMode: "both",
  },
  globalCopyEnter: {
    opacity: 0,
    translate: { default: "-80px 0px", [breakpoints.motionReduce]: null },
  },
  globalCopyEnterRun: {
    animationName: { default: slideFromLeft, [breakpoints.motionReduce]: fadeIn },
    animationDuration: { default: "700ms", [breakpoints.motionReduce]: "300ms" },
    animationDelay: { default: `${MAP_SWEEP_MS / 2}ms`, [breakpoints.motionReduce]: "0ms" },
    animationTimingFunction: EASE_OUT_CSS,
    animationFillMode: "both",
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
    position: "relative",
    display: "flex",
    justifyContent: "center",
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
    width: 32,
    height: 32,
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

const ZOOM_FROM_SCALE = 0.96;
const SETTLED = "translateY(0px) scale(1)";
const zoomFrom = (y: number, scale: number) => `translateY(${y}px) scale(${scale})`;

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

type RiseProps = {
  children: ReactNode;
  sx?: StyleXStyles;
  style?: StyleXStyles;
  delay?: number;
};

function RiseReveal({ children, sx, style, delay = 0 }: RiseProps) {
  const reduce = useReducedMotion();
  return (
    <m.div
      {...stylex.props(sx, style)}
      initial={{ opacity: 0, transform: "translateY(16px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.45, delay: reduce ? 0 : delay, ease: RISE_EASE }}
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
  const [active, setActive] = useState<string | undefined>(ids[0]);
  useEffect(() => {
    const crossing = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) crossing.add(entry.target.id);
          else crossing.delete(entry.target.id);
        }
        setActive(ids.find((id) => crossing.has(id)));
      },
      { rootMargin: "-40% 0px -59% 0px" },
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
      <div {...stylex.props(styles.shell, styles.headerInner)}>
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
          <button type="button" {...stylex.props(styles.searchPill)}>
            <Search size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
            <span {...stylex.props(styles.searchPlaceholder)}>AI 搜索</span>
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
    <svg viewBox="0 0 161 52" aria-hidden="true" focusable="false" {...stylex.props(styles.logo)}>
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
                  styles.heroRise,
                  styles.enterDelay(introAfter(0)),
                )}
              >
                {OPENING_BEFORE}
                <span {...stylex.props(styles.heroAccent)}>{HERO.accent}</span>
                {OPENING_AFTER}
              </span>{" "}
              <span
                {...stylex.props(
                  styles.heroLead,
                  styles.heroRise,
                  styles.enterDelay(introAfter(80)),
                )}
              >
                {CLOSING_LEAD}
              </span>{" "}
              <span {...stylex.props(styles.heroBreakLine)}>
                <span
                  {...stylex.props(
                    styles.heroBreak,
                    styles.heroRise,
                    styles.enterDelay(introAfter(160)),
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
                styles.heroRise,
                styles.enterDelay(introAfter(240)),
              )}
            >
              {HERO.title}
            </span>
          </h1>
        </div>
        <div {...stylex.props(styles.ctaRow, styles.heroFade, styles.enterDelay(introAfter(600)))}>
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
  return (
    <section
      id="about"
      aria-labelledby="oo-about-title"
      {...stylex.props(styles.about, styles.inset124, styles.anchor)}
    >
      <RiseReveal sx={styles.aboutInner}>
        <h2 id="oo-about-title" {...stylex.props(styles.sectionTitle)}>
          {ABOUT.title}
        </h2>
        <p ref={textRef} {...stylex.props(styles.aboutBody)}>
          {ABOUT_INK_LINES.map((segments, lineIndex) => (
            <Fragment key={segments[0].text}>
              {lineIndex > 0 ? <br /> : null}
              {segments.map((segment) => (
                <InkPhrase key={segment.text} progress={scrollYProgress} range={segment.range}>
                  {segment.text}
                </InkPhrase>
              ))}
            </Fragment>
          ))}
        </p>
        <a
          href={ABOUT.cta.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonCompact)}
        >
          {ABOUT.cta.label}
        </a>
      </RiseReveal>
    </section>
  );
}

function Campus() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const maxProgressRef = useRef(0);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center 0.55"] });
  const windowClip = useTransform(scrollYProgress, (progress) => {
    if (progress > maxProgressRef.current) {
      maxProgressRef.current = progress;
    }
    const t = revealProgress(maxProgressRef.current);
    const top = lerp(CLIP_FROM.top, CLIP_TO.top, t);
    const side = lerp(CLIP_FROM.side, CLIP_TO.side, t);
    const bottom = lerp(CLIP_FROM.bottom, CLIP_TO.bottom, t);
    const radius = lerp(CLIP_FROM.radius, CLIP_TO.radius, t);
    return `inset(${top}% ${side}% ${bottom}% ${side}% round ${radius}px)`;
  });
  const photoScale = useTransform(scrollYProgress, (progress) => {
    if (progress > maxProgressRef.current) {
      maxProgressRef.current = progress;
    }
    return lerp(1.22, 1, revealProgress(maxProgressRef.current));
  });

  return (
    <section id="campus" aria-label="研发与生产" {...stylex.props(styles.anchor)}>
      <div ref={stageRef} {...stylex.props(styles.campusStage)}>
        <m.div
          {...stylex.props(styles.campusFrame)}
          style={reduce ? undefined : { clipPath: windowClip }}
        >
          <m.img
            src={IMAGES.campus.src}
            alt={IMAGES.campus.alt}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.campusImage)}
            style={reduce ? undefined : { scale: photoScale }}
          />
        </m.div>
      </div>
      <div {...stylex.props(styles.shell, styles.inset132, styles.statsBand)}>
        {STATS.map((stat, index) => (
          <StatItem key={stat.label} stat={stat} index={index} />
        ))}
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
        initial={{ transform: "translateY(0%)" }}
        whileInView={{ transform: `translateY(${-(10 + digit) * 5}%)` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: reduce ? 0 : 1.6, delay: reduce ? 0 : delay, ease: EASE }}
      >
        {DIGIT_CELLS.map((cell, index) => (
          <span key={index} {...stylex.props(styles.wheelCell)}>
            {cell}
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
        .map((character, index) =>
          /\d/.test(character) ? (
            <DigitWheel
              key={index}
              digit={Number(character)}
              delay={offset + index * DIGIT_STAGGER}
            />
          ) : (
            <span key={index}>{character}</span>
          ),
        )}
    </span>
  );
}

function StatItem({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  return (
    <>
      {index > 0 ? <span aria-hidden="true" {...stylex.props(styles.statDivider)} /> : null}
      <RiseReveal delay={riseDelay(index)} sx={styles.stat}>
        <p {...stylex.props(styles.statText)}>{stat.label}</p>
        <p {...stylex.props(styles.statFigure)}>
          <Odometer value={stat.value} offset={index * STAT_STAGGER} />
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
      </RiseReveal>
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
  const inverse = strength.tone === "blue";
  const right = dx === 1;
  return (
    <m.article
      aria-labelledby={`oos1-strength-${index}`}
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
      <div {...stylex.props(styles.quadrantText, inverse && styles.quadrantInverse)}>
        <div {...stylex.props(styles.quadrantCopy)}>
          <h3 id={`oos1-strength-${index}`} {...stylex.props(styles.quadrantTitle)}>
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
      aria-labelledby="oos1-strengths-title"
      {...stylex.props(styles.strengths, styles.inset120, styles.anchor)}
    >
      <RiseReveal sx={styles.introBlock}>
        <h2 id="oos1-strengths-title" {...stylex.props(styles.sectionTitle)}>
          {STRENGTHS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{STRENGTHS_INTRO.lead}</p>
      </RiseReveal>
      <div ref={gridRef} {...stylex.props(styles.quadrants)}>
        {STRENGTHS.map((strength, index) => (
          <Quadrant key={strength.title} strength={strength} index={index} apart={apart} />
        ))}
        <m.div aria-hidden="true" {...stylex.props(styles.badge)} style={{ rotate }}>
          <svg viewBox="0 0 160 160" {...stylex.props(styles.badgeSvg)}>
            <defs>
              <path
                id="oos1-badge-ring"
                d={`M80,80 m-${RING_RADIUS},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 ${RING_RADIUS * 2},0 a${RING_RADIUS},${RING_RADIUS} 0 1,1 -${RING_RADIUS * 2},0`}
              />
            </defs>
            <text {...stylex.props(styles.badgeText)}>
              <textPath href="#oos1-badge-ring" textLength={RING_LENGTH} lengthAdjust="spacing">
                WHY FENCHEM · 为什么选择泛成 · WHY FENCHEM · 为什么选择泛成 ·
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

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[number]; index: number }) {
  return (
    <RiseReveal delay={riseDelay(index)} sx={styles.productCard}>
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
    </RiseReveal>
  );
}

function Products() {
  return (
    <section
      id="products"
      aria-labelledby="oo-products-title"
      {...stylex.props(styles.products, styles.inset120, styles.anchor)}
    >
      <RiseReveal sx={styles.introBlock}>
        <h2 id="oo-products-title" {...stylex.props(styles.sectionTitle)}>
          {PRODUCTS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.sectionLead)}>{PRODUCTS_INTRO.lead}</p>
      </RiseReveal>
      <RiseReveal delay={riseDelay(1)} sx={styles.productsCta}>
        <a
          href={PRODUCTS_INTRO.cta.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonCompact)}
        >
          {PRODUCTS_INTRO.cta.label}
        </a>
      </RiseReveal>
      <div id="product-list" {...stylex.props(styles.productGrid)}>
        {PRODUCTS.map((product, index) => (
          <ProductCard key={product.title} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}

function Offices() {
  const rowRef = useRef<HTMLDivElement>(null);
  const rowInView = useInView(rowRef, { once: true, amount: 0.5 });
  return (
    <section id="offices" aria-labelledby="oo-offices-title" {...stylex.props(styles.anchor)}>
      <div {...stylex.props(styles.globalBand)}>
        <div ref={rowRef} {...stylex.props(styles.globalRow)}>
          <div
            {...stylex.props(
              styles.mapWrap,
              styles.mapWrapEnter,
              rowInView && styles.mapWrapEnterRun,
            )}
          >
            <img
              src={IMAGES.officeMap.src}
              alt={IMAGES.officeMap.alt}
              width={611}
              height={321}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.mapImage, styles.mapSweep, rowInView && styles.mapSweepRun)}
            />
            {OFFICE_MAP_PINS.map((pin, index) => (
              <span
                key={`${pin.left}-${pin.top}`}
                aria-hidden="true"
                {...stylex.props(
                  styles.mapRing,
                  rowInView && styles.mapRingPulse,
                  styles.mapRingAt(
                    `${pin.left}%`,
                    `${pin.top}%`,
                    `${MAP_SWEEP_MS / 4 + index * MAP_PIN_STAGGER_MS}ms`,
                  ),
                )}
              />
            ))}
          </div>
          <div
            {...stylex.props(
              styles.globalCopy,
              styles.globalCopyEnter,
              rowInView && styles.globalCopyEnterRun,
            )}
          >
            <h2 id="oo-offices-title" {...stylex.props(styles.sectionTitle)}>
              {GLOBAL_INTRO.title}
            </h2>
            <p {...stylex.props(styles.sectionLead)}>{GLOBAL_INTRO.lead}</p>
          </div>
        </div>
      </div>
      <div {...stylex.props(styles.officesBand)}>
        <div {...stylex.props(styles.shell, styles.inset120, styles.regions)}>
          {OFFICE_COLUMNS.map((column, index) => (
            <RiseReveal key={column[0].region} delay={riseDelay(index)} sx={styles.officeColumn}>
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
            </RiseReveal>
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
      <span aria-hidden="true" lang="en" {...stylex.props(styles.ctaWord)}>
        Fenchem
      </span>
      <RiseReveal sx={styles.ctaInner}>
        <h2 id="oo-contact-title" {...stylex.props(styles.sectionTitle)}>
          {CTA.title}
        </h2>
        <a
          href={CTA.action.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonWide)}
        >
          {CTA.action.label}
        </a>
      </RiseReveal>
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

export function VariantOOS3() {
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
          <a href="#main-content" {...stylex.props(styles.skipLink)}>
            跳到主要内容
          </a>
          <SiteHeader />
          <div {...stylex.props(styles.page, intro === "play" && introStyles.pageReveal)}>
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
