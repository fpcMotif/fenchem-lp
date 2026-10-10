import {
  RisingHero,
  FramedCampus,
  SweepingOffices,
  StrengthQuadrantCopy,
  QuadrantStrengths,
} from "../shared/corporate-presentations";
import { CorporateHeaderActions, CampusStatistic } from "../shared/navigation-and-headline";
import { CorporateNews } from "../shared/corporate-sections";
import { Flow } from "../shared/flow";
import { LayoutGroup } from "motion/react";
import { FooterLegal } from "../shared/footer-content";
import { NewsAccordion } from "../shared/news-accordion";
import { ProductSummary } from "../shared/product-summary";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { useSearch } from "@tanstack/react-router";
import { Globe, Lightbulb, Plus, Shield, Users, type LucideIcon } from "lucide-react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domMax,
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
  type ComponentType,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { preinit } from "react-dom";

import { EASE } from "@/components/prototype/motion-constants";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { LINKEDIN_PATHS, LOGO_PATHS, WECHAT_PATHS, type VectorPath } from "../variant-o/vectors";
import { INTRO_REVEAL_MS, introStyles, useIntro } from "@/components/prototype/shared/intro";

import { AboutView } from "./about-view";
import { ContactCta } from "./contact-cta";
import { HERO_BLOB_TWIST } from "./hero-blob-twist";
import { ProductsView } from "./products-view";
import { RiseReveal } from "./rise-reveal";
import { useActiveSection } from "./use-active-section";
import {
  ABOUT,
  COPYRIGHT,
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
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, "Noto Sans SC", sans-serif';
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

const RISE_STAGGER = 0.06;
const RISE_MAX_STEPS = 3;
const riseDelay = (index: number) => Math.min(index, RISE_MAX_STEPS) * RISE_STAGGER;

const LINE_RISE_EASE = "cubic-bezier(0.2, 0.7, 0, 1)";
const MAP_PIN_STAGGER_MS = 40;
const MAP_SWEEP_MS = 1200;
const MAP_SWEEP_EASE = "cubic-bezier(0.33, 1, 0.68, 1)";
const [HEADLINE_OPENING, HEADLINE_CLOSING] = HERO.headline;
const [OPENING_BEFORE, OPENING_AFTER] = HEADLINE_OPENING.split(HERO.accent);
const CLOSING_TEXT = HEADLINE_CLOSING.replace(/[.。]$/, "");
const CLOSING_BREAK = CLOSING_TEXT.lastIndexOf(" ");
const CLOSING_LEAD = CLOSING_TEXT.slice(0, Math.max(CLOSING_BREAK, 0));
const CLOSING_WORD = CLOSING_TEXT.slice(CLOSING_BREAK + 1);
const CLOSING_CRACKS = /^[A-Za-z]+$/.test(CLOSING_WORD);

const BLOB_SCROLL_END = 0.6;
const BLOB_SCROLL_REDUCED = 0.3;

const revealZoom = stylex.keyframes({
  "0%": { scale: "1.14" },
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
  buttonHero: { minWidth: 144, height: 48, paddingInline: 24 },
  buttonCompact: { minWidth: 96, height: 48, paddingInline: 24 },

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
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "start",
    height: 80,
    paddingInlineStart: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_120 },
    paddingInlineEnd: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_118 },
  },
  logoLink: {
    display: "block",
    gridColumn: "1",
    justifySelf: "start",
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
    gridColumn: "2",
    marginTop: 23,
  },
  navCollapsed: {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
  },
  navLink: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: 40,
    paddingInline: 20,
    whiteSpace: "nowrap",
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
    gridColumn: "3",
    justifySelf: "end",
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
  menuButtonShown: {
    display: "inline-flex",
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
    animationDuration: "2000ms",
    animationDelay: "var(--oo-intro, 0ms)",
    animationTimingFunction: EASE_OUT_CSS,
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
    fontFamily: '"Instrument Serif", "Times New Roman", "Noto Sans SC", serif',
    fontStyle: "italic",
    fontSynthesis: "none",
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
  heroBreakLineWrap: {
    whiteSpace: "normal",
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
  heroBreakTailHidden: {
    display: "none",
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
    flexWrap: "wrap",
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
    backgroundColor: TINT,
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
    overflowWrap: "anywhere",
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

const NAV_CLEARANCE = 12;

function useNavFits(
  innerRef: RefObject<HTMLDivElement | null>,
  navRef: RefObject<HTMLElement | null>,
) {
  const [fits, setFits] = useState(true);
  useEffect(() => {
    const inner = innerRef.current;
    const nav = navRef.current;
    if (!inner || !nav) return;
    const measure = () => {
      const style = getComputedStyle(inner);
      const room =
        inner.clientWidth -
        parseFloat(style.paddingInlineStart) -
        parseFloat(style.paddingInlineEnd);
      const side = Math.max(
        ...Array.from(inner.children, (child) =>
          child === nav ? 0 : child.getBoundingClientRect().width,
        ),
      );
      setFits(nav.scrollWidth + 2 * (side + NAV_CLEARANCE) <= room);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    observer.observe(nav);
    void document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [innerRef, navRef]);
  return fits;
}

export type View = "home" | "about" | "products";
export type AboutPageProps = { onNavigateHome: (hash?: string) => void };
export type SubPageProps = AboutPageProps;

function SiteHeader({
  currentView,
  onNavigate,
}: {
  currentView?: View;
  onNavigate?: (view: View, targetId?: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const reduce = useReducedMotion();
  const scrolled = useScrolledPastTop();
  const activeId = useActiveSection(NAV_SECTION_IDS);
  const innerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navFits = useNavFits(innerRef, navRef);
  const closeOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && menuOpen) setMenuOpen(false);
  };
  const isActive = (href: string) => {
    if (href === "#about") {
      return currentView === "about";
    }
    if (href === "#products") {
      return currentView === "products";
    }
    if (currentView !== "home") {
      return false;
    }
    return href.slice(1) === activeId;
  };

  const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!onNavigate) return;
    if (href === "#about") {
      event.preventDefault();
      onNavigate("about", "about-top");
      setMenuOpen(false);
      return;
    }
    if (href === "#products") {
      event.preventDefault();
      onNavigate("products", "products-top");
      setMenuOpen(false);
      return;
    }
    if (href === "#top") {
      if (currentView !== "home") {
        event.preventDefault();
        onNavigate("home", "top");
      }
      setMenuOpen(false);
      return;
    }
    if (currentView !== "home") {
      event.preventDefault();
      onNavigate("home", href.slice(1));
      setMenuOpen(false);
    }
  };
  return (
    <header
      onKeyDown={closeOnEscape}
      {...stylex.props(styles.header, (scrolled || menuOpen) && styles.headerSolid)}
    >
      <div ref={innerRef} {...stylex.props(styles.shell, styles.headerInner)}>
        <a
          href="#top"
          aria-label="FENCHEM home"
          onClick={(event) => {
            if (currentView !== "home" && onNavigate) {
              event.preventDefault();
              onNavigate("home", "top");
            }
          }}
          {...stylex.props(styles.logoLink)}
        >
          <LogoMark />
        </a>
        <nav
          ref={navRef}
          aria-label="Main"
          {...stylex.props(styles.nav, !navFits && styles.navCollapsed)}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "location" : undefined}
              onClick={(event) => handleItemClick(event, item.href)}
              {...stylex.props(styles.navLink, isActive(item.href) && styles.navLinkActive)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <CorporateHeaderActions
          styles={{
            headerActions: styles.headerActions,
            searchPill: styles.searchPill,
            searchPlaceholder: styles.searchPlaceholder,
            langButton: styles.langButton,
            menuButton: [styles.menuButton, !navFits && styles.menuButtonShown],
          }}
          menuOpen={menuOpen}
          menuId={menuId}
          setMenuOpen={setMenuOpen}
        />
      </div>
      <AnimatePresence initial={false}>
        {menuOpen ? (
          <m.nav
            key="menu"
            id={menuId}
            aria-label="Main"
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
                    onClick={(event) => handleItemClick(event, item.href)}
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
  const blobScroll = useTransform(scrollYProgress, (progress) => {
    const t = clamp01(progress / BLOB_SCROLL_END);
    return t * t * (3 - 2 * t) * (reduce ? BLOB_SCROLL_REDUCED : 1);
  });
  return (
    <RisingHero
      styles={{
        hero: styles.hero,
        shell: styles.shell,
        inset120: styles.inset120,
        heroContent: styles.heroContent,
        heroCopy: styles.heroCopy,
        heroTitle: styles.heroTitle,
        heroHeadline: styles.heroHeadline,
        heroLead: styles.heroLead,
        heroRise: styles.heroRise,
        enterDelay: styles.enterDelay,
        heroAccent: styles.heroAccent,
        heroBreakLine: [styles.heroBreakLine, !CLOSING_CRACKS && styles.heroBreakLineWrap],
        heroBreak: styles.heroBreak,
        heroBreakInk: styles.heroBreakInk,
        heroBreakHead: CLOSING_CRACKS && styles.heroBreakHead,
        heroBreakTail: CLOSING_CRACKS ? styles.heroBreakTail : styles.heroBreakTailHidden,
        heroPeriodSeat: styles.heroPeriodSeat,
        heroPeriod: styles.heroPeriod,
        visuallyHidden: styles.visuallyHidden,
        heroSubtitle: styles.heroSubtitle,
        ctaRow: styles.ctaRow,
        heroFade: styles.heroFade,
        button: styles.button,
        buttonPrimary: styles.buttonPrimary,
        buttonHero: styles.buttonHero,
        buttonSecondary: styles.buttonSecondary,
      }}
      backdropStyles={{
        heroBackdrop: styles.heroBackdrop,
        heroLayer: styles.heroLayer,
        heroImage: styles.heroImage,
        heroTintColor: styles.heroTintColor,
        heroTintScreen: styles.heroTintScreen,
        heroParallax: styles.heroParallax,
      }}
      backdropFragment={HERO_BLOB_TWIST}
      backdropProgress={blobScroll}
      heroRef={heroRef}
      reduce={reduce}
      backdropY={backdropY}
      contentY={contentY}
      contentOpacity={contentOpacity}
      IMAGES={IMAGES}
      HERO={HERO}
      OPENING_BEFORE={OPENING_BEFORE}
      OPENING_AFTER={OPENING_AFTER}
      CLOSING_LEAD={CLOSING_LEAD}
      CLOSING_WORD={CLOSING_WORD}
      introAfter={introAfter}
    />
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

function About({ onOpenAboutPage }: { onOpenAboutPage?: () => void }) {
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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {onOpenAboutPage ? (
            <button
              type="button"
              onClick={onOpenAboutPage}
              {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonCompact)}
            >
              了解泛成详情 · 关于我们
            </button>
          ) : (
            <a
              href={ABOUT.cta.href}
              {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonCompact)}
            >
              {ABOUT.cta.label}
            </a>
          )}
          <a
            href="#products"
            {...stylex.props(styles.button, styles.buttonSecondary, styles.buttonCompact)}
          >
            探索四大核心业务
          </a>
        </div>
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
    <FramedCampus
      styles={{
        anchor: styles.anchor,
        campusStage: styles.campusStage,
        campusFrame: styles.campusFrame,
        campusImage: styles.campusImage,
        shell: styles.shell,
        inset132: styles.inset132,
        statsBand: styles.statsBand,
      }}
      stageRef={stageRef}
      reduce={reduce}
      windowClip={windowClip}
      photoScale={photoScale}
      IMAGES={IMAGES}
      STATS={STATS}
      StatItem={StatItem}
    />
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
    <CampusStatistic
      styles={{
        statDivider: styles.statDivider,
        stat: styles.stat,
        statText: styles.statText,
        statFigure: styles.statFigure,
        statUnit: styles.statUnit,
        visuallyHidden: styles.visuallyHidden,
      }}
      index={index}
      stat={stat}
      RiseReveal={RiseReveal}
      Odometer={Odometer}
      riseDelay={riseDelay}
      STAT_STAGGER={STAT_STAGGER}
    />
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
  const [dx, dy] = QUADRANT_DIRECTIONS[index % QUADRANT_DIRECTIONS.length];
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
      <StrengthQuadrantCopy
        styles={{
          quadrantText: styles.quadrantText,
          quadrantInverse: styles.quadrantInverse,
          quadrantCopy: styles.quadrantCopy,
          quadrantTitle: styles.quadrantTitle,
          quadrantSmall: styles.quadrantSmall,
          quadrantLink: styles.quadrantLink,
        }}
        inverse={inverse}
        index={index}
        strength={strength}
        idPrefix="oos1"
      />
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
    <QuadrantStrengths
      styles={{
        strengths: styles.strengths,
        inset120: styles.inset120,
        anchor: styles.anchor,
        introBlock: styles.introBlock,
        sectionTitle: styles.sectionTitle,
        sectionLead: styles.sectionLead,
        quadrants: styles.quadrants,
        badge: styles.badge,
        badgeSvg: styles.badgeSvg,
        badgeText: styles.badgeText,
        badgeCross: styles.badgeCross,
      }}
      RiseReveal={RiseReveal}
      STRENGTHS_INTRO={STRENGTHS_INTRO}
      gridRef={gridRef}
      STRENGTHS={STRENGTHS}
      Quadrant={Quadrant}
      apart={apart}
      rotate={rotate}
      RING_RADIUS={RING_RADIUS}
      RING_LENGTH={RING_LENGTH}
    />
  );
}

function ProductCard({ product, index }: { product: (typeof PRODUCTS)[number]; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <RiseReveal delay={riseDelay(index)} sx={styles.productCard}>
      <div {...stylex.props(styles.productImageFrame)}>
        {imageFailed ? null : (
          <img
            src={product.image}
            alt={product.english}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            {...stylex.props(styles.productImage)}
          />
        )}
      </div>
      <ProductSummary
        product={product}
        sx={[styles.productPanel, index % 2 === 1 && styles.productPanelAlt]}
        styles={{
          mutedText: styles.mutedText,
          productTitleBlock: styles.productTitleBlock,
          productTitle: styles.productTitle,
          rule: styles.rule,
          list: styles.list,
        }}
      />
    </RiseReveal>
  );
}

function Products({ onOpenProductsPage }: { onOpenProductsPage?: () => void }) {
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
          href="#products-top"
          onClick={(event) => {
            if (onOpenProductsPage) {
              event.preventDefault();
              onOpenProductsPage();
            }
          }}
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
    <SweepingOffices
      styles={{
        anchor: styles.anchor,
        globalBand: styles.globalBand,
        globalRow: styles.globalRow,
        mapWrap: styles.mapWrap,
        mapWrapEnter: styles.mapWrapEnter,
        mapWrapEnterRun: styles.mapWrapEnterRun,
        mapImage: styles.mapImage,
        mapSweep: styles.mapSweep,
        mapSweepRun: styles.mapSweepRun,
        mapRing: styles.mapRing,
        mapRingPulse: styles.mapRingPulse,
        mapRingAt: styles.mapRingAt,
        globalCopy: styles.globalCopy,
        globalCopyEnter: styles.globalCopyEnter,
        globalCopyEnterRun: styles.globalCopyEnterRun,
        sectionTitle: styles.sectionTitle,
        sectionLead: styles.sectionLead,
        officesBand: styles.officesBand,
        shell: styles.shell,
        inset120: styles.inset120,
        regions: styles.regions,
        officeColumn: styles.officeColumn,
        officeGroup: styles.officeGroup,
        regionHeader: styles.regionHeader,
        list: styles.list,
        regionBody: styles.regionBody,
        mutedText: styles.mutedText,
      }}
      rowRef={rowRef}
      rowInView={rowInView}
      IMAGES={IMAGES}
      OFFICE_MAP_PINS={OFFICE_MAP_PINS}
      MAP_SWEEP_MS={MAP_SWEEP_MS}
      MAP_PIN_STAGGER_MS={MAP_PIN_STAGGER_MS}
      GLOBAL_INTRO={GLOBAL_INTRO}
      OFFICE_COLUMNS={OFFICE_COLUMNS}
      RiseReveal={RiseReveal}
      riseDelay={riseDelay}
    />
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
  return (
    <NewsAccordion
      item={item}
      open={open}
      onToggle={onToggle}
      icon={<AccordionIcon open={open} />}
      styles={{
        mutedText: styles.mutedText,
        newsHeading: styles.newsHeading,
        newsTrigger: styles.newsTrigger,
        newsPanel: styles.newsPanel,
        newsPanelInner: styles.newsPanelInner,
      }}
    />
  );
}

function News() {
  return (
    <CorporateNews
      styles={{
        anchor: styles.anchor,
        shell: styles.shell,
        inset120: styles.inset120,
        sectionTitle: styles.sectionTitle,
        news: styles.news,
        newsInner: styles.newsInner,
        accordion: styles.accordion,
        newsItem: styles.newsItem,
      }}
      title={NEWS_TITLE}
      items={NEWS}
      Reveal={ZoomReveal}
      Item={NewsItem}
    />
  );
}

function SiteFooter({ onNavigate }: { onNavigate?: (view: View, targetId?: string) => void }) {
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
          <nav aria-label="Footer" {...stylex.props(styles.footerColumns)}>
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} {...stylex.props(styles.footerColumn)}>
                <h3 {...stylex.props(styles.footerHeading)}>{column.heading}</h3>
                <ul {...stylex.props(styles.footerLinks)}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.page ? `#${link.page}-top` : "#top"}
                        onClick={(event) => {
                          if (link.page && onNavigate) {
                            event.preventDefault();
                            onNavigate(link.page, `${link.page}-top`);
                          }
                        }}
                        {...stylex.props(styles.footerLink)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <hr {...stylex.props(styles.footerRule)} />
        <FooterLegal
          copyright={COPYRIGHT}
          styles={{
            footerBottom: styles.footerBottom,
            copyright: styles.copyright,
            social: styles.social,
          }}
        >
          <a href="#top" aria-label="LinkedIn" {...stylex.props(styles.socialLink)}>
            <VectorArt paths={LINKEDIN_PATHS} viewBox="0 0 20 20" sx={styles.socialIcon} />
          </a>
          <a href="#top" aria-label="WeChat" {...stylex.props(styles.socialLink)}>
            <VectorArt paths={WECHAT_PATHS} viewBox="0 0 20 20" sx={styles.socialIcon} />
          </a>
        </FooterLegal>
      </div>
    </footer>
  );
}

const viewFromPage = (page: unknown, startView: View): View =>
  page === "about" || page === "home"
    ? page
    : page === "products" || page === "produces"
      ? "products"
      : startView;

export function VariantOOS1({
  AboutPage = AboutView,
  ProductsPage = ProductsView,
  startView = "home",
}: {
  AboutPage?: ComponentType<SubPageProps>;
  ProductsPage?: ComponentType<SubPageProps>;
  startView?: View;
}) {
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

  const { page } = useSearch({ strict: false });
  const [view, setView] = useState<View>(() => viewFromPage(page, startView));

  const handleNavigate = (targetView: View, targetId?: string) => {
    setView(targetView);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (targetView === startView) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", targetView);
      }
      url.hash = targetId ? `#${targetId}` : "";
      window.history.pushState({}, "", url.toString());
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      setView(viewFromPage(params.get("page"), startView));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [startView]);

  return (
    <LazyMotion features={domMax} strict>
      <LayoutGroup>
        <MotionConfig reducedMotion="user">
          <div lang="zh-CN" {...stylex.props(styles.root)} style={introVars}>
            <a href="#main-content" {...stylex.props(styles.skipLink)}>
              跳到主要内容
            </a>
            <SiteHeader currentView={view} onNavigate={handleNavigate} />
            <div {...stylex.props(styles.page, intro === "play" && introStyles.pageReveal)}>
              <main id="main-content" tabIndex={-1} {...stylex.props(styles.mainTarget)}>
                {view === "about" ? (
                  <AboutPage
                    onNavigateHome={(target) =>
                      handleNavigate(target === "products" ? "products" : "home", target)
                    }
                  />
                ) : view === "products" ? (
                  <ProductsPage onNavigateHome={(target) => handleNavigate("home", target)} />
                ) : (
                  <>
                    <Hero />
                    <About onOpenAboutPage={() => handleNavigate("about", "about-top")} />
                    <Campus />
                    <Strengths />
                    <Products
                      onOpenProductsPage={() => handleNavigate("products", "products-top")}
                    />
                    <Offices />
                    <News />
                    <Flow>
                      <ContactCta id="contact" />
                    </Flow>
                  </>
                )}
              </main>
              <Flow>
                <SiteFooter onNavigate={handleNavigate} />
              </Flow>
            </div>
          </div>
        </MotionConfig>
      </LayoutGroup>
    </LazyMotion>
  );
}
