import { InsetCorporateFooter } from "../shared/corporate-content-sections";

import { ProductSummary } from "../shared/product-summary";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import {
  ArrowUpRight,
  Globe,
  Lightbulb,
  Minus,
  Plus,
  Search,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LazyMotion, domAnimation, m } from "motion/react";
import { preinit } from "react-dom";

import { HeroGradeFilter } from "@/components/prototype/hero-grade";
import { Intro, Reveal } from "@/components/prototype/motion";
import { EASE, STAGGER } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

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
  PRODUCTS,
  PRODUCTS_INTRO,
  STATS,
  STRENGTHS,
  STRENGTHS_INTRO,
  type StrengthIcon,
  type StrengthTone,
} from "./content";
import { LINKEDIN_PATHS, LOGO_PATHS, WECHAT_PATHS, type VectorPath } from "./vectors";

const NOTO_SANS_SC =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap";

const INK = "#1a1a1a";
const BODY_TEXT = "#595959";
const TINT = "#e6ecf7";
const SURFACE = "#f6f6f6";
const PANEL_ALT = "#e8e8e8";
const FOOTER_BLUE = "#294f92";
const HERO_OVERLAY = "#0743a9";
const MD_ONLY = "@media (min-width: 768px) and (max-width: 1023.98px)";

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
    backgroundColor: colors.paper,
    color: INK,
    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
  },
  inset120: {
    paddingInline: { default: 16, [MD_ONLY]: 40, [breakpoints.lg]: 120 },
  },
  inset124: {
    paddingInline: { default: 16, [MD_ONLY]: 40, [breakpoints.lg]: 124 },
  },
  inset132: {
    paddingInline: { default: 16, [MD_ONLY]: 40, [breakpoints.lg]: 132 },
  },

  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [breakpoints.lg]: 32 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
  },
  mutedText: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.2,
    color: BODY_TEXT,
  },
  centered: {
    textAlign: "center",
  },

  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.2,
    textDecoration: "none",
    transitionProperty: "background-color, color",
    transitionDuration: "180ms",
    transitionTimingFunction: "ease-out",
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
  buttonCompact: { width: 96, height: 44 },
  buttonSmall: { width: 96, height: 40 },
  buttonWide: { width: 160, height: 48 },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  headerInner: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: 80,
    paddingLeft: { default: 16, [MD_ONLY]: 40, [breakpoints.lg]: 120 },
    paddingRight: { default: 16, [MD_ONLY]: 40, [breakpoints.lg]: 118 },
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
  nav: {
    display: { default: "none", [breakpoints.lg]: "flex" },
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
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
  },
  navLinkActive: {
    "::after": {
      content: '""',
      position: "absolute",
      left: 21,
      right: 20,
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
    backgroundColor: { default: "transparent", ":hover": "rgba(255, 255, 255, 0.4)" },
    color: INK,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  langButton: {
    padding: 0,
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
    outlineOffset: 2,
  },

  hero: {
    position: "relative",
    overflow: "hidden",
    height: { default: "auto", [breakpoints.lg]: 900 },
    backgroundColor: "#b9cdf0",
  },
  heroBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    filter: "url(#fenchem-hero-grade)",
  },
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
    paddingTop: { default: 176, [breakpoints.lg]: 362 },
    paddingBottom: { default: 120, [breakpoints.lg]: 0 },
  },
  heroCopy: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  heroTitle: {
    margin: 0,
    fontSize: { default: 32, [MD_ONLY]: 44, [breakpoints.lg]: 60 },
    fontWeight: 500,
    lineHeight: 1.2,
    color: INK,
  },
  heroLead: {
    margin: 0,
    fontSize: { default: 17, [breakpoints.lg]: 20 },
    lineHeight: 1.6,
    color: INK,
  },
  ctaRow: {
    display: "flex",
    paddingTop: 8,
  },

  about: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: { default: 0, [breakpoints.lg]: 700 },
    paddingBlock: { default: 72, [breakpoints.lg]: 96 },
    boxSizing: "border-box",
    backgroundColor: colors.paper,
  },
  aboutInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
    maxWidth: 768,
  },
  aboutBody: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.6,
    color: INK,
    textAlign: "center",
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
  },
  statValue: {
    fontSize: 60,
    lineHeight: 1.2,
  },
  statUnit: {
    fontSize: 32,
    lineHeight: 1.2,
  },
  statDivider: {
    display: { default: "none", [breakpoints.md]: "block" },
    flexShrink: 0,
    width: 1,
    height: 70,
    backgroundColor: "#000000",
  },

  strengths: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 48,
    paddingBlock: { default: 72, [breakpoints.lg]: 96 },
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
      [MD_ONLY]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(4, minmax(0, 1fr))",
    },
    width: "100%",
    maxWidth: 1200,
  },
  strengthCard: {
    position: "relative",
    isolation: "isolate",
    overflow: "hidden",
    height: 164,
  },
  toneBlue: { backgroundColor: "#6a8ece", color: "#e6ecf7" },
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
    transform: {
      default: "scale(1.06)",
      [stylex.when.ancestor(":hover")]: "scale(1)",
      [stylex.when.ancestor(":focus-within")]: "scale(1)",
    },
    transitionProperty: "opacity, transform",
    transitionDuration: { default: "450ms", [breakpoints.motionReduce]: "0s" },
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  patternCell: (left: string, top: string) => ({
    position: "absolute",
    left,
    top,
  }),
  strengthText: {
    position: "absolute",
    left: 32,
    right: 27,
    top: 105,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    color: INK,
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
  },
  strengthSmall: {
    margin: 0,
    fontSize: 11.2,
    lineHeight: 1.2,
  },
  strengthLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 11.2,
    lineHeight: 1.2,
    color: INK,
    textDecoration: { default: "none", ":hover": "underline" },
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: INK,
    outlineOffset: 2,
  },

  products: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBlock: { default: 72, [breakpoints.lg]: 96 },
    backgroundColor: SURFACE,
  },
  productsCta: {
    paddingTop: 24,
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [MD_ONLY]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(4, minmax(0, 1fr))",
    },
    width: "100%",
    maxWidth: 1200,
    marginTop: { default: 48, [breakpoints.lg]: 96 },
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
    transform: { default: "scale(1)", ":hover": "scale(1.04)" },
    transitionProperty: "transform",
    transitionDuration: "600ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  productPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 32,
    height: { default: "auto", [breakpoints.lg]: 327 },
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
    fontSize: { default: 26, [breakpoints.lg]: 32 },
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
    paddingTop: { default: 64, [breakpoints.lg]: 109 },
    paddingBottom: { default: 64, [breakpoints.lg]: 101 },
    backgroundColor: colors.paper,
  },
  globalRow: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.lg]: "row" },
    alignItems: "center",
    gap: 25,
    width: { default: "auto", [breakpoints.lg]: 1090 },
    marginLeft: { default: 16, [breakpoints.lg]: "calc(50% - 522px)" },
    marginRight: { default: 16, [breakpoints.lg]: 0 },
  },
  mapImage: {
    display: "block",
    width: "100%",
    maxWidth: 611,
    height: "auto",
    flexShrink: 0,
  },
  globalCopy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    width: { default: "100%", [breakpoints.lg]: 454 },
  },
  officesBand: {
    paddingTop: 48,
    paddingBottom: { default: 72, [breakpoints.lg]: 96 },
    backgroundColor: SURFACE,
  },
  regions: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [MD_ONLY]: "repeat(2, minmax(0, 1fr))",
      [breakpoints.lg]: "repeat(4, minmax(0, 1fr))",
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
    paddingBottom: { default: 72, [breakpoints.lg]: 96 },
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
    backgroundColor: SURFACE,
  },
  newsItemMuted: {
    opacity: 0.55,
  },
  newsItemInner: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 24,
  },
  newsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    color: INK,
  },
  newsTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  newsIcon: {
    flexShrink: 0,
  },

  cta: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: { default: 80, [breakpoints.lg]: 112 },
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
    flexDirection: { default: "column", [breakpoints.lg]: "row" },
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
    width: { default: "auto", [breakpoints.lg]: 210 },
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
    fontSize: 11.2,
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
    opacity: { default: 0.65, ":hover": 1 },
    transitionProperty: "opacity",
    transitionDuration: "150ms",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 2,
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

function SiteHeader() {
  return (
    <header {...stylex.props(styles.header)}>
      <Intro y={-16} sx={[styles.shell, styles.headerInner]}>
        <a href="#top" aria-label="FENCHEM home" {...stylex.props(styles.logoLink)}>
          <VectorArt paths={LOGO_PATHS} viewBox="0 0 161 52" sx={styles.logo} />
        </a>
        <nav aria-label="Main" {...stylex.props(styles.nav)}>
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={index === 0 ? "page" : undefined}
              {...stylex.props(styles.navLink, index === 0 && styles.navLinkActive)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div {...stylex.props(styles.headerActions)}>
          <button type="button" aria-label="AI search" {...stylex.props(styles.searchPill)}>
            <Search size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />
          </button>
          <button type="button" aria-label="Switch language" {...stylex.props(styles.langButton)}>
            CN
          </button>
        </div>
      </Intro>
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" aria-labelledby="official-hero-title" {...stylex.props(styles.hero)}>
      <HeroGradeFilter />
      <m.div
        aria-hidden="true"
        {...stylex.props(styles.heroBackdrop)}
        initial={{ scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduce ? 0 : 2, ease: EASE }}
      >
        <img
          src={IMAGES.hero}
          alt=""
          decoding="async"
          {...stylex.props(styles.heroLayer, styles.heroImage)}
        />
        <div {...stylex.props(styles.heroLayer, styles.heroTintColor)} />
        <div {...stylex.props(styles.heroLayer, styles.heroTintScreen)} />
      </m.div>
      <div {...stylex.props(styles.shell, styles.inset120, styles.heroContent)}>
        <div {...stylex.props(styles.heroCopy)}>
          <Intro delay={0.3} scale={0.92}>
            <h1 id="official-hero-title" {...stylex.props(styles.heroTitle)}>
              {HERO.title}
            </h1>
          </Intro>
          <Intro delay={0.45} scale={0.95}>
            <p {...stylex.props(styles.heroLead)}>{HERO.lead}</p>
          </Intro>
        </div>
        <Intro delay={0.6} scale={0.95} sx={styles.ctaRow}>
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
        </Intro>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      aria-labelledby="official-about-title"
      {...stylex.props(styles.about, styles.inset124)}
    >
      <Reveal scale={0.92} sx={styles.aboutInner}>
        <h2 id="official-about-title" {...stylex.props(styles.sectionTitle)}>
          {ABOUT.title}
        </h2>
        <p {...stylex.props(styles.aboutBody)}>{ABOUT.body}</p>
        <a
          href={ABOUT.cta.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonCompact)}
        >
          {ABOUT.cta.label}
        </a>
      </Reveal>
    </section>
  );
}

function Campus() {
  const reduce = useReducedMotion();
  return (
    <section id="campus" aria-label="R&D and production">
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
      <div {...stylex.props(styles.shell, styles.inset132, styles.statsBand)}>
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
      <Reveal delay={index * STAGGER} scale={0.88} sx={styles.stat}>
        <p {...stylex.props(styles.statText)}>{stat.label}</p>
        <p {...stylex.props(styles.statFigure)}>
          <span {...stylex.props(styles.statValue)}>{stat.value}</span>
          {stat.unit ? <span {...stylex.props(styles.statUnit)}>{stat.unit}</span> : null}
        </p>
        <p {...stylex.props(styles.statText)}>{stat.caption}</p>
      </Reveal>
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
      aria-labelledby="official-strengths-title"
      {...stylex.props(styles.strengths, styles.inset120)}
    >
      <Reveal scale={0.94} sx={styles.introBlock}>
        <h2 id="official-strengths-title" {...stylex.props(styles.sectionTitle)}>
          {STRENGTHS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.mutedText, styles.centered)}>{STRENGTHS_INTRO.lead}</p>
      </Reveal>
      <div {...stylex.props(styles.strengthGrid)}>
        {STRENGTHS.map((strength, index) => (
          <Reveal
            key={strength.title}
            delay={index * STAGGER}
            scale={0.9}
            sx={[styles.strengthCard, stylex.defaultMarker()]}
            style={TONE_STYLES[strength.tone]}
          >
            <IconPattern icon={strength.icon} />
            <div {...stylex.props(styles.strengthText)}>
              <div {...stylex.props(styles.strengthCopy)}>
                <h3 {...stylex.props(styles.strengthTitle)}>{strength.title}</h3>
                {strength.description ? (
                  <p {...stylex.props(styles.strengthSmall)}>{strength.description}</p>
                ) : null}
              </div>
              {strength.link ? (
                <a href="#products" {...stylex.props(styles.strengthLink)}>
                  {strength.link}
                  <ArrowUpRight size={12} strokeWidth={1} absoluteStrokeWidth aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Products() {
  return (
    <section
      id="products"
      aria-labelledby="official-products-title"
      {...stylex.props(styles.products, styles.inset120)}
    >
      <Reveal scale={0.94} sx={styles.introBlock}>
        <h2 id="official-products-title" {...stylex.props(styles.sectionTitle)}>
          {PRODUCTS_INTRO.title}
        </h2>
        <p {...stylex.props(styles.mutedText, styles.centered)}>{PRODUCTS_INTRO.lead}</p>
      </Reveal>
      <Reveal delay={0.1} scale={0.9} sx={styles.productsCta}>
        <a
          href={PRODUCTS_INTRO.cta.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonSmall)}
        >
          {PRODUCTS_INTRO.cta.label}
        </a>
      </Reveal>
      <div {...stylex.props(styles.productGrid)}>
        {PRODUCTS.map((product, index) => (
          <Reveal key={product.title} delay={index * STAGGER} scale={0.92} sx={styles.productCard}>
            <div {...stylex.props(styles.productImageFrame)}>
              <img
                src={product.image}
                alt={product.english}
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.productImage)}
              />
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Offices() {
  return (
    <section id="offices" aria-labelledby="official-offices-title">
      <div {...stylex.props(styles.globalBand)}>
        <Reveal scale={0.94} sx={styles.globalRow}>
          <img
            src={IMAGES.officeMap.src}
            alt={IMAGES.officeMap.alt}
            width={611}
            height={321}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.mapImage)}
          />
          <div {...stylex.props(styles.globalCopy)}>
            <h2 id="official-offices-title" {...stylex.props(styles.sectionTitle)}>
              {GLOBAL_INTRO.title}
            </h2>
            <p {...stylex.props(styles.mutedText, styles.centered)}>{GLOBAL_INTRO.lead}</p>
          </div>
        </Reveal>
      </div>
      <div {...stylex.props(styles.officesBand)}>
        <div {...stylex.props(styles.shell, styles.inset124, styles.regions)}>
          {OFFICE_COLUMNS.map((column, index) => (
            <Reveal
              key={column[0].region}
              delay={index * STAGGER}
              scale={0.94}
              sx={styles.officeColumn}
            >
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function News() {
  return (
    <section id="news" aria-labelledby="official-news-title" {...stylex.props(styles.news)}>
      <div {...stylex.props(styles.shell, styles.inset124, styles.newsInner)}>
        <Reveal scale={0.96}>
          <h2 id="official-news-title" {...stylex.props(styles.sectionTitle)}>
            {NEWS_TITLE}
          </h2>
        </Reveal>
        <ul {...stylex.props(styles.accordion)}>
          {NEWS.map((item, index) => (
            <li
              key={item.title}
              {...stylex.props(styles.newsItem, item.muted && styles.newsItemMuted)}
            >
              <Reveal delay={index * STAGGER} scale={0.97} sx={styles.newsItemInner}>
                <div {...stylex.props(styles.newsHeader)}>
                  <h3 {...stylex.props(styles.newsTitle)}>{item.title}</h3>
                  {item.details.length > 0 ? (
                    <Minus
                      size={16}
                      strokeWidth={1.5}
                      absoluteStrokeWidth
                      aria-hidden="true"
                      {...stylex.props(styles.newsIcon)}
                    />
                  ) : (
                    <Plus
                      size={16}
                      strokeWidth={1.5}
                      absoluteStrokeWidth
                      aria-hidden="true"
                      {...stylex.props(styles.newsIcon)}
                    />
                  )}
                </div>
                {item.details.map((detail) => (
                  <p key={detail} {...stylex.props(styles.mutedText)}>
                    {detail}
                  </p>
                ))}
              </Reveal>
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
      aria-labelledby="official-contact-title"
      {...stylex.props(styles.cta, styles.inset124)}
    >
      <Reveal scale={0.9} sx={styles.ctaInner}>
        <h2 id="official-contact-title" {...stylex.props(styles.sectionTitle)}>
          {CTA.title}
        </h2>
        <a
          href={CTA.action.href}
          {...stylex.props(styles.button, styles.buttonPrimary, styles.buttonWide)}
        >
          {CTA.action.label}
        </a>
      </Reveal>
    </section>
  );
}

function SiteFooter() {
  return (
    <InsetCorporateFooter
      styles={{
        footer: styles.footer,
        shell: styles.shell,
        inset132: styles.inset132,
        footerInner: styles.footerInner,
        footerRule: styles.footerRule,
      }}
      navigationStyles={{
        footerLogo: styles.footerLogo,
        footerLink: styles.footerLink,
        footerTop: styles.footerTop,
        footerColumns: styles.footerColumns,
        footerColumn: styles.footerColumn,
        footerHeading: styles.footerHeading,
        footerLinks: styles.footerLinks,
      }}
      legalStyles={{
        footerBottom: styles.footerBottom,
        copyright: styles.copyright,
        social: styles.social,
      }}
      logo={IMAGES.footerLogo}
      columns={FOOTER_COLUMNS}
      copyright={COPYRIGHT}
    >
      <a href="#top" aria-label="LinkedIn" {...stylex.props(styles.socialLink)}>
        <VectorArt paths={LINKEDIN_PATHS} viewBox="0 0 20 20" sx={styles.socialIcon} />
      </a>
      <a href="#top" aria-label="WeChat" {...stylex.props(styles.socialLink)}>
        <VectorArt paths={WECHAT_PATHS} viewBox="0 0 20 20" sx={styles.socialIcon} />
      </a>
    </InsetCorporateFooter>
  );
}

export function VariantO() {
  preinit(NOTO_SANS_SC, { as: "style" });
  return (
    <LazyMotion features={domAnimation} strict>
      <div lang="zh-CN" {...stylex.props(styles.root)}>
        <SiteHeader />
        <main>
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
    </LazyMotion>
  );
}
