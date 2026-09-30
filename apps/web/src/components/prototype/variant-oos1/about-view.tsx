import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Leaf,
  Lightbulb,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import {
  ABOUT_CSR,
  ABOUT_CULTURE,
  ABOUT_HERO,
  ABOUT_HONORS,
  ABOUT_STATS,
  ABOUT_STRUCTURE,
} from "./about-data";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const TINT = "#e6ecf7";
const OOX_WORD_ON_TINT = "#d7e1f1";
const WORD_ON_TINT = `color-mix(in srgb, ${OOX_WORD_ON_TINT} 80%, ${TINT})`;
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const SURFACE = "#f6f6f6";
const FOOTER_BLUE = "#294f92";
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const HOVER_MOTION =
  "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const INSET_120 = "min(120px, 8.333vw)";
const INSET_124 = "min(124px, 8.611vw)";
const HEADER_HEIGHT = 80;

const styles = stylex.create({
  root: {
    backgroundColor: "#f3f5fa",
    color: INK,
    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
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
  anchor: {
    scrollMarginTop: HEADER_HEIGHT + 32,
  },

  subBar: {
    position: "sticky",
    top: HEADER_HEIGHT,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 1px 0 0 rgba(26, 26, 26, 0.08)",
  },
  subBarInner: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "flex-start", [breakpoints.md]: "center" },
    justifyContent: "space-between",
    gap: 12,
    minHeight: 56,
    paddingBlock: { default: 10, [breakpoints.md]: 0 },
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: BODY_TEXT,
  },
  breadcrumbLink: {
    color: BODY_TEXT,
    textDecoration: "none",
    cursor: "pointer",
    ":hover": { color: colors.brandBlue700 },
  },
  breadcrumbCurrent: {
    color: INK,
    fontWeight: 600,
  },
  chipList: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    overflowX: "auto",
    width: { default: "100%", [breakpoints.md]: "auto" },
    paddingBottom: { default: 4, [breakpoints.md]: 0 },
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    height: 32,
    paddingInline: 14,
    borderRadius: 16,
    backgroundColor: SURFACE,
    fontSize: 13,
    fontWeight: 500,
    color: INK,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "background-color, color",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
    ":hover": {
      backgroundColor: TINT,
      color: colors.brandBlue700,
    },
  },

  heroBanner: {
    position: "relative",
    overflow: "hidden",
    paddingTop: { default: 56, [DESKTOP]: 88 },
    paddingBottom: { default: 56, [DESKTOP]: 80 },
    backgroundColor: colors.paper,
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "1.15fr 0.85fr" },
    gap: { default: 40, [DESKTOP]: 64 },
    alignItems: "center",
  },
  heroText: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: colors.brandBlue700,
  },
  kickerDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: colors.brandBlue700,
  },
  heroTitle: {
    margin: 0,
    fontSize: { default: 30, [TABLET]: 38, [DESKTOP]: 46 },
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    color: INK,
  },
  heroEnglishTitle: {
    fontFamily: DISPLAY_FONT,
    fontSize: { default: 16, [DESKTOP]: 18 },
    fontWeight: 500,
    color: BODY_TEXT,
    letterSpacing: "0.02em",
  },
  heroLead: {
    margin: 0,
    fontSize: { default: 16, [DESKTOP]: 17 },
    lineHeight: 1.8,
    color: INK,
    textWrap: "pretty",
  },
  heroSublead: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.75,
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  highlightList: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.sm]: "repeat(2, 1fr)" },
    gap: 12,
    paddingTop: 8,
  },
  highlightItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    borderRadius: 8,
    backgroundColor: SURFACE,
    fontSize: 14,
    fontWeight: 600,
    color: INK,
  },
  highlightIcon: {
    color: colors.brandBlue700,
    flexShrink: 0,
  },
  heroImageFrame: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    aspectRatio: { default: "16 / 10", [DESKTOP]: "4 / 3" },
    boxShadow: "0 12px 36px -12px rgba(7, 67, 174, 0.16)",
  },
  heroImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: { default: null, ":hover": { default: null, [HOVER_MOTION]: "scale(1.03)" } },
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  heroImageCaption: {
    position: "absolute",
    bottom: 0,
    insetInline: 0,
    padding: "16px 20px",
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
    color: colors.paper,
    fontSize: 13,
    fontWeight: 500,
  },

  statsSection: {
    paddingBlock: { default: 48, [DESKTOP]: 64 },
    backgroundColor: SURFACE,
    boxShadow: "inset 0 1px 0 0 rgba(0,0,0,0.04), inset 0 -1px 0 0 rgba(0,0,0,0.04)",
  },
  statsBand: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "stretch", [breakpoints.md]: "center" },
    gap: { default: 32, [breakpoints.md]: 16 },
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
  statFigure: {
    display: "flex",
    alignItems: "baseline",
    gap: 2,
    margin: 0,
    fontFamily: DISPLAY_FONT,
  },
  statValue: {
    display: "inline-flex",
    fontSize: { default: 48, [DESKTOP]: 60 },
    fontWeight: 600,
    lineHeight: 1.1,
    letterSpacing: "-0.03em",
    color: INK,
  },
  statUnit: {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 1.2,
    color: colors.brandBlue700,
  },
  statText: {
    margin: 0,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.3,
    color: BODY_TEXT,
  },
  statDivider: {
    display: { default: "none", [breakpoints.md]: "block" },
    flexShrink: 0,
    width: 1,
    height: 60,
    backgroundColor: "rgba(0,0,0,0.12)",
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

  sectionHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    maxWidth: 768,
    marginInline: "auto",
    textAlign: "center",
    marginBottom: { default: 40, [DESKTOP]: 64 },
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 28, [TABLET]: 34, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
  },
  sectionLead: {
    margin: 0,
    fontSize: { default: 15, [DESKTOP]: 17 },
    lineHeight: 1.7,
    color: BODY_TEXT,
  },

  cultureSection: {
    paddingBlock: { default: 64, [DESKTOP]: 104 },
    backgroundColor: colors.paper,
  },
  cultureGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.md]: "repeat(3, 1fr)" },
    gap: 24,
  },
  cultureCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 28,
    minHeight: { default: 320, [DESKTOP]: 380 },
    padding: { default: 28, [DESKTOP]: 36 },
    boxSizing: "border-box",
    borderRadius: 16,
    transitionProperty: "transform, box-shadow",
    transitionDuration: "250ms",
    transitionTimingFunction: EASE_OUT_CSS,
    ":hover": {
      transform: { default: null, [HOVER_MOTION]: "translateY(-4px)" },
      boxShadow: "0 16px 40px -12px rgba(7, 67, 174, 0.15)",
    },
  },
  cultureBlue: {
    backgroundColor: "#294f92",
    color: "#ffffff",
  },
  cultureCream: {
    backgroundColor: "#f5edd8",
    color: INK,
  },
  cultureGreen: {
    backgroundColor: "#4f7a55",
    color: "#ffffff",
  },
  cultureTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  cultureIndex: {
    fontFamily: DISPLAY_FONT,
    fontSize: 44,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    opacity: 0.35,
  },
  cultureIconPill: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "inherit",
  },
  cultureBody: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  cultureCardTitle: {
    margin: 0,
    fontSize: { default: 22, [DESKTOP]: 24 },
    fontWeight: 700,
    lineHeight: 1.25,
  },
  cultureCardEnglish: {
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    opacity: 0.75,
  },
  cultureDesc: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.7,
    opacity: 0.9,
  },
  cultureTagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 8,
  },
  cultureTag: {
    display: "inline-flex",
    padding: "4px 10px",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 500,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  cultureTagInverse: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    color: "#ffffff",
  },

  csrSection: {
    paddingBlock: { default: 64, [DESKTOP]: 104 },
    backgroundColor: "#0d2b24",
    color: "#ffffff",
  },
  csrGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "0.9fr 1.1fr" },
    gap: { default: 40, [DESKTOP]: 64 },
    alignItems: "center",
  },
  csrVisual: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  csrImageFrame: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    aspectRatio: "16 / 10",
    boxShadow: "0 20px 48px -12px rgba(0, 0, 0, 0.4)",
  },
  csrImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  csrVisualTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    color: "#8cd6a3",
    fontWeight: 500,
  },
  csrContent: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  csrTitleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  csrTitle: {
    margin: 0,
    fontSize: { default: 28, [TABLET]: 34, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: "#ffffff",
  },
  csrSlogan: {
    margin: 0,
    fontSize: { default: 18, [DESKTOP]: 20 },
    fontWeight: 600,
    color: "#8cd6a3",
  },
  csrDesc: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.8,
    color: "#d0e3d7",
  },
  csrPillarList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingTop: 8,
  },
  csrPillarCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  csrPillarNum: {
    fontFamily: DISPLAY_FONT,
    fontSize: 18,
    fontWeight: 700,
    color: "#8cd6a3",
    flexShrink: 0,
    lineHeight: 1.2,
    paddingTop: 2,
  },
  csrPillarBody: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  csrPillarTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: "#ffffff",
  },
  csrPillarDesc: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.6,
    color: "#d0e3d7",
  },

  honorsSection: {
    paddingBlock: { default: 64, [DESKTOP]: 104 },
    backgroundColor: SURFACE,
  },
  honorsGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.sm]: "repeat(2, 1fr)",
      [DESKTOP]: "repeat(4, 1fr)",
    },
    gap: 20,
  },
  honorCard: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.06)",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "250ms",
    transitionTimingFunction: EASE_OUT_CSS,
    ":hover": {
      transform: { default: null, [HOVER_MOTION]: "translateY(-4px)" },
      boxShadow: "0 12px 28px -8px rgba(7, 67, 174, 0.12)",
    },
  },
  honorImageWrap: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: "3 / 2",
    backgroundColor: "#f0f2f5",
  },
  honorImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  honorBody: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 16,
    flexGrow: 1,
  },
  honorTier: {
    display: "inline-flex",
    alignSelf: "flex-start",
    padding: "3px 8px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.04em",
    backgroundColor: TINT,
    color: colors.brandBlue700,
  },
  honorTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 1.3,
    color: INK,
  },
  honorSubtitle: {
    fontFamily: DISPLAY_FONT,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: BODY_TEXT,
  },
  honorDesc: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.55,
    color: BODY_TEXT,
    marginTop: "auto",
    paddingTop: 8,
  },

  structureSection: {
    paddingBlock: { default: 64, [DESKTOP]: 104 },
    backgroundColor: colors.paper,
  },
  holdingCard: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "flex-start", [breakpoints.md]: "center" },
    justifyContent: "space-between",
    gap: 20,
    padding: { default: 24, [DESKTOP]: 32 },
    borderRadius: 16,
    backgroundColor: FOOTER_BLUE,
    color: colors.paper,
    boxShadow: "0 12px 32px -10px rgba(41, 79, 146, 0.3)",
    marginBottom: 32,
  },
  holdingMain: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  holdingBadge: {
    display: "inline-flex",
    alignSelf: "flex-start",
    padding: "4px 10px",
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.06em",
  },
  holdingTitle: {
    margin: 0,
    fontSize: { default: 22, [DESKTOP]: 28 },
    fontWeight: 800,
    lineHeight: 1.2,
  },
  holdingEnglish: {
    fontFamily: DISPLAY_FONT,
    fontSize: 14,
    fontWeight: 500,
    opacity: 0.8,
  },
  holdingSummary: {
    margin: 0,
    maxWidth: 420,
    fontSize: 14,
    lineHeight: 1.6,
    opacity: 0.9,
  },
  subsidiaryGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.md]: "repeat(2, 1fr)",
      [DESKTOP]: "repeat(3, 1fr)",
    },
    gap: 20,
  },
  subsidiaryCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
    padding: 24,
    borderRadius: 12,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0.06)",
    transitionProperty: "transform, border-color, background-color",
    transitionDuration: "200ms",
    transitionTimingFunction: EASE_OUT_CSS,
    ":hover": {
      backgroundColor: colors.paper,
      borderColor: colors.brandBlue700,
      transform: { default: null, [HOVER_MOTION]: "translateY(-3px)" },
    },
  },
  subBadge: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.brandBlue700,
  },
  subTitleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  subTitle: {
    margin: 0,
    fontSize: 17,
    fontWeight: 700,
    lineHeight: 1.3,
    color: INK,
  },
  subEnglish: {
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    fontWeight: 500,
    color: BODY_TEXT,
  },
  subFocusPill: {
    display: "inline-flex",
    alignSelf: "flex-start",
    padding: "3px 8px",
    borderRadius: 4,
    backgroundColor: TINT,
    fontSize: 12,
    fontWeight: 600,
    color: colors.brandBlue700,
  },
  subDesc: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.6,
    color: BODY_TEXT,
  },

  diagramTriggerWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    marginTop: 40,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "rgba(0,0,0,0.08)",
  },
  diagramFrame: {
    position: "relative",
    width: "100%",
    maxWidth: 960,
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: SURFACE,
    boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
  },
  diagramImg: {
    display: "block",
    width: "100%",
    height: "auto",
  },

  ctaBanner: {
    position: "relative",
    overflow: "hidden",
    paddingTop: { default: 72, [DESKTOP]: 104 },
    paddingBottom: { default: 80, [DESKTOP]: 120 },
    backgroundColor: TINT,
  },
  ctaWord: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: { default: "24vw", [DESKTOP]: "min(280px, 20vw)" },
    fontWeight: 800,
    lineHeight: 0.74,
    letterSpacing: "-0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    color: WORD_ON_TINT,
    translate: "-50% 20%",
    pointerEvents: "none",
    userSelect: "none",
  },
  ctaInner: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 24,
    maxWidth: 680,
    marginInline: "auto",
  },
  ctaTitle: {
    margin: 0,
    fontSize: { default: 28, [TABLET]: 36, [DESKTOP]: 42 },
    fontWeight: 800,
    lineHeight: 1.2,
    color: INK,
  },
  ctaText: {
    margin: 0,
    fontSize: { default: 15, [DESKTOP]: 17 },
    lineHeight: 1.7,
    color: BODY_TEXT,
  },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
    paddingTop: 8,
  },
  buttonPrimary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    paddingInline: 28,
    borderRadius: 0,
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
    fontSize: 16,
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  buttonSecondary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    paddingInline: 28,
    borderRadius: 0,
    backgroundColor: { default: colors.paper, ":hover": SURFACE },
    color: colors.brandBlue700,
    fontSize: 16,
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
});

export function AboutView({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const [showDiagram, setShowDiagram] = useState(true);

  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <nav aria-label="页面局部导航" {...stylex.props(styles.subBar)}>
        <div {...stylex.props(styles.shell, styles.inset124, styles.subBarInner)}>
          <div {...stylex.props(styles.breadcrumb)}>
            <button
              type="button"
              onClick={() => onNavigateHome("top")}
              {...stylex.props(styles.breadcrumbLink)}
            >
              首页
            </button>
            <ChevronRight size={14} aria-hidden="true" />
            <span {...stylex.props(styles.breadcrumbCurrent)}>关于我们</span>
          </div>
          <div {...stylex.props(styles.chipList)}>
            {ABOUT_HERO.navChips.map((chip) => (
              <a key={chip.href} href={chip.href} {...stylex.props(styles.chip)}>
                {chip.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => onNavigateHome("top")}
              {...stylex.props(styles.chip)}
            >
              <ArrowLeft size={14} style={{ marginRight: 4 }} aria-hidden="true" />
              返回首页
            </button>
          </div>
        </div>
      </nav>

      <section
        id="about-profile"
        aria-labelledby="about-profile-title"
        {...stylex.props(styles.heroBanner, styles.anchor)}
      >
        <div {...stylex.props(styles.shell, styles.inset124, styles.heroGrid)}>
          <div {...stylex.props(styles.heroText)}>
            <div {...stylex.props(styles.kicker)}>
              <span {...stylex.props(styles.kickerDot)} />
              {ABOUT_HERO.kicker}
            </div>
            <div>
              <h1 id="about-profile-title" {...stylex.props(styles.heroTitle)}>
                {ABOUT_HERO.title}
              </h1>
              <div {...stylex.props(styles.heroEnglishTitle)}>{ABOUT_HERO.englishTitle}</div>
            </div>
            <p {...stylex.props(styles.heroLead)}>{ABOUT_HERO.lead}</p>
            <p {...stylex.props(styles.heroSublead)}>{ABOUT_HERO.sublead}</p>
            <div {...stylex.props(styles.highlightList)}>
              {ABOUT_HERO.highlights.map((item) => (
                <div key={item} {...stylex.props(styles.highlightItem)}>
                  <CheckCircle2 size={16} {...stylex.props(styles.highlightIcon)} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div {...stylex.props(styles.heroImageFrame)}>
            <img
              src={ABOUT_HERO.lobbyImage}
              alt="南京泛成国际控股有限公司总部园区现代研发与行政中心"
              loading="eager"
              decoding="async"
              {...stylex.props(styles.heroImage)}
            />
            <div {...stylex.props(styles.heroImageCaption)}>
              泛成南京溧水产业基地 · 现代化智能园区与研发展厅
            </div>
          </div>
        </div>
      </section>

      <section
        id="about-stats"
        aria-label="泛成发展关键数据"
        {...stylex.props(styles.statsSection, styles.anchor)}
      >
        <div {...stylex.props(styles.shell, styles.inset124, styles.statsBand)}>
          {ABOUT_STATS.map((stat, idx) => (
            <div key={stat.label} style={{ display: "contents" }}>
              {idx > 0 && <span aria-hidden="true" {...stylex.props(styles.statDivider)} />}
              <div {...stylex.props(styles.stat)}>
                <div {...stylex.props(styles.statFigure)}>
                  <span {...stylex.props(styles.statValue)}>{stat.value}</span>
                  <span {...stylex.props(styles.statUnit)}>{stat.unit}</span>
                </div>
                <p {...stylex.props(styles.statText)}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="about-culture"
        aria-labelledby="about-culture-title"
        {...stylex.props(styles.cultureSection, styles.anchor)}
      >
        <div {...stylex.props(styles.shell, styles.inset124)}>
          <div {...stylex.props(styles.sectionHeader)}>
            <div {...stylex.props(styles.kicker)}>
              <Compass size={14} aria-hidden="true" />
              {ABOUT_CULTURE.kicker}
            </div>
            <h2 id="about-culture-title" {...stylex.props(styles.sectionTitle)}>
              {ABOUT_CULTURE.title}
            </h2>
            <p {...stylex.props(styles.sectionLead)}>{ABOUT_CULTURE.slogan}</p>
          </div>
          <div {...stylex.props(styles.cultureGrid)}>
            {ABOUT_CULTURE.cards.map((card) => {
              const isBlue = card.tone === "blue";
              const isGreen = card.tone === "green";
              const toneStyle = isBlue
                ? styles.cultureBlue
                : isGreen
                  ? styles.cultureGreen
                  : styles.cultureCream;
              return (
                <article key={card.index} {...stylex.props(styles.cultureCard, toneStyle)}>
                  <div {...stylex.props(styles.cultureTop)}>
                    <span {...stylex.props(styles.cultureIndex)}>{card.index}</span>
                    <div {...stylex.props(styles.cultureIconPill)}>
                      {isBlue ? (
                        <ShieldCheck size={22} aria-hidden="true" />
                      ) : isGreen ? (
                        <Lightbulb size={22} aria-hidden="true" />
                      ) : (
                        <Sparkles size={22} aria-hidden="true" />
                      )}
                    </div>
                  </div>
                  <div {...stylex.props(styles.cultureBody)}>
                    <div>
                      <h3 {...stylex.props(styles.cultureCardTitle)}>{card.title}</h3>
                      <div {...stylex.props(styles.cultureCardEnglish)}>{card.english}</div>
                    </div>
                    <p {...stylex.props(styles.cultureDesc)}>{card.desc}</p>
                  </div>
                  <div {...stylex.props(styles.cultureTagRow)}>
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        {...stylex.props(
                          styles.cultureTag,
                          (isBlue || isGreen) && styles.cultureTagInverse,
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="about-csr"
        aria-labelledby="about-csr-title"
        {...stylex.props(styles.csrSection, styles.anchor)}
      >
        <div {...stylex.props(styles.shell, styles.inset124, styles.csrGrid)}>
          <div {...stylex.props(styles.csrVisual)}>
            <div {...stylex.props(styles.csrImageFrame)}>
              <img
                src={ABOUT_CSR.image}
                alt="生态林海与地球绿色生命体系"
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.csrImage)}
              />
            </div>
            <div {...stylex.props(styles.csrVisualTag)}>
              <Leaf size={16} aria-hidden="true" />
              <span>践行碳达峰·碳中和目标 · 守护全球生态家园</span>
            </div>
          </div>
          <div {...stylex.props(styles.csrContent)}>
            <div {...stylex.props(styles.csrTitleBlock)}>
              <div
                {...stylex.props(styles.kicker)}
                style={{ color: "#8cd6a3", letterSpacing: "0.14em" }}
              >
                <Leaf size={14} aria-hidden="true" />
                {ABOUT_CSR.kicker}
              </div>
              <h2 id="about-csr-title" {...stylex.props(styles.csrTitle)}>
                {ABOUT_CSR.title}
              </h2>
              <div {...stylex.props(styles.csrSlogan)}>{ABOUT_CSR.slogan}</div>
            </div>
            <p {...stylex.props(styles.csrDesc)}>{ABOUT_CSR.desc}</p>
            <div {...stylex.props(styles.csrPillarList)}>
              {ABOUT_CSR.pillars.map((pillar) => (
                <div key={pillar.num} {...stylex.props(styles.csrPillarCard)}>
                  <span {...stylex.props(styles.csrPillarNum)}>{pillar.num}</span>
                  <div {...stylex.props(styles.csrPillarBody)}>
                    <h3 {...stylex.props(styles.csrPillarTitle)}>{pillar.title}</h3>
                    <p {...stylex.props(styles.csrPillarDesc)}>{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="about-honor"
        aria-labelledby="about-honor-title"
        {...stylex.props(styles.honorsSection, styles.anchor)}
      >
        <div {...stylex.props(styles.shell, styles.inset124)}>
          <div {...stylex.props(styles.sectionHeader)}>
            <div {...stylex.props(styles.kicker)}>
              <Award size={14} aria-hidden="true" />
              {ABOUT_HONORS.kicker}
            </div>
            <h2 id="about-honor-title" {...stylex.props(styles.sectionTitle)}>
              {ABOUT_HONORS.title}
            </h2>
            <p {...stylex.props(styles.sectionLead)}>{ABOUT_HONORS.lead}</p>
          </div>
          <div {...stylex.props(styles.honorsGrid)}>
            {ABOUT_HONORS.items.map((honor) => (
              <article key={honor.id} {...stylex.props(styles.honorCard)}>
                <div {...stylex.props(styles.honorImageWrap)}>
                  <img
                    src={honor.image}
                    alt={honor.title}
                    loading="lazy"
                    decoding="async"
                    {...stylex.props(styles.honorImage)}
                  />
                </div>
                <div {...stylex.props(styles.honorBody)}>
                  <span {...stylex.props(styles.honorTier)}>{honor.tier}</span>
                  <div>
                    <h3 {...stylex.props(styles.honorTitle)}>{honor.title}</h3>
                    <div {...stylex.props(styles.honorSubtitle)}>{honor.subtitle}</div>
                  </div>
                  <p {...stylex.props(styles.honorDesc)}>{honor.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about-structure"
        aria-labelledby="about-structure-title"
        {...stylex.props(styles.structureSection, styles.anchor)}
      >
        <div {...stylex.props(styles.shell, styles.inset124)}>
          <div {...stylex.props(styles.sectionHeader)}>
            <div {...stylex.props(styles.kicker)}>
              <Network size={14} aria-hidden="true" />
              {ABOUT_STRUCTURE.kicker}
            </div>
            <h2 id="about-structure-title" {...stylex.props(styles.sectionTitle)}>
              {ABOUT_STRUCTURE.title}
            </h2>
            <p {...stylex.props(styles.sectionLead)}>{ABOUT_STRUCTURE.lead}</p>
          </div>

          <div {...stylex.props(styles.holdingCard)}>
            <div {...stylex.props(styles.holdingMain)}>
              <span {...stylex.props(styles.holdingBadge)}>{ABOUT_STRUCTURE.holding.badge}</span>
              <h3 {...stylex.props(styles.holdingTitle)}>{ABOUT_STRUCTURE.holding.name}</h3>
              <div {...stylex.props(styles.holdingEnglish)}>{ABOUT_STRUCTURE.holding.english}</div>
            </div>
            <p {...stylex.props(styles.holdingSummary)}>{ABOUT_STRUCTURE.holding.summary}</p>
          </div>

          <div {...stylex.props(styles.subsidiaryGrid)}>
            {ABOUT_STRUCTURE.subsidiaries.map((sub) => (
              <article key={sub.id} {...stylex.props(styles.subsidiaryCard)}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span {...stylex.props(styles.subBadge)}>{sub.badge}</span>
                  <div {...stylex.props(styles.subTitleBlock)}>
                    <h4 {...stylex.props(styles.subTitle)}>{sub.name}</h4>
                    <span {...stylex.props(styles.subEnglish)}>{sub.english}</span>
                  </div>
                  <span {...stylex.props(styles.subFocusPill)}>{sub.focus}</span>
                </div>
                <p {...stylex.props(styles.subDesc)}>{sub.desc}</p>
              </article>
            ))}
          </div>

          <div {...stylex.props(styles.diagramTriggerWrap)}>
            <button
              type="button"
              onClick={() => setShowDiagram((prev) => !prev)}
              {...stylex.props(styles.buttonSecondary)}
            >
              <Building2 size={16} aria-hidden="true" />
              <span>{showDiagram ? "收起官方架构拓扑图" : "查看官方组织架构拓扑图"}</span>
            </button>
            {showDiagram && (
              <div {...stylex.props(styles.diagramFrame)}>
                <img
                  src={ABOUT_STRUCTURE.chartImage}
                  alt="南京泛成国际控股有限公司官方组织架构图"
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(styles.diagramImg)}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="about-cta-title" {...stylex.props(styles.ctaBanner)}>
        <span aria-hidden="true" lang="en" {...stylex.props(styles.ctaWord)}>
          FENCHEM
        </span>
        <div {...stylex.props(styles.shell, styles.inset124, styles.ctaInner)}>
          <h2 id="about-cta-title" {...stylex.props(styles.ctaTitle)}>
            与泛成携手 · 赋能全球营养与健康
          </h2>
          <p {...stylex.props(styles.ctaText)}>
            三十载行业积淀，全球13+分支网络随时响应您的原料咨询、定制生产与配方技术需求。
          </p>
          <div {...stylex.props(styles.buttonGroup)}>
            <button
              type="button"
              onClick={() => onNavigateHome("contact")}
              {...stylex.props(styles.buttonPrimary)}
            >
              <span>联系我们</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome("products")}
              {...stylex.props(styles.buttonSecondary)}
            >
              <span>浏览核心产品与市场</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
