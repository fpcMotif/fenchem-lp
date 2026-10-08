import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, Factory, Leaf, Recycle, X } from "lucide-react";
import { animate, m, useInView, useScroll, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import {
  ABOUT_BANNER,
  ABOUT_CAMPUS,
  ABOUT_CSR,
  ABOUT_HERO,
  ABOUT_HISTORY,
  ABOUT_MOMENT,
} from "./about-data";
import { ContactCta } from "./contact-cta";
import { CTA, STATS } from "./content";
import { CultureScenes } from "./culture-scenes";
import { HistoryTimeline } from "./history-timeline";
import { useActiveSection } from "./use-active-section";
import { Profile as ProfileOOS1G } from "./abouts/oos1g/profile";
import { NavyBand } from "./abouts/oos1c/navy-band";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const SERIF_ACCENT = '"Instrument Serif", Georgia, serif';
const CSR_ACCENT = "#8cd6a3";
const NAVY_SCRIM = "rgba(6, 28, 66, 0.78)";
const PHOTO_OUTLINE = "rgba(0, 0, 0, 0.1)";
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const SM_BELOW_DESKTOP = "@media (min-width: 640px) and (max-width: 1279.98px)";
const HOVER_MOTION =
  "@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const INSET_124 = "min(124px, 8.611vw)";
const HEADER_HEIGHT = 80;
const SUB_BAR_HEIGHT = 64;
const REVEAL_STEP_MS = 70;
const REVEAL_MAX_STEPS = 5;
const COUNT_UP_SECONDS = 1.6;

const [PROFILE_CHIP, ...LATER_CHIPS] = ABOUT_HERO.navChips;
const NAV_CHIPS = [PROFILE_CHIP, ABOUT_HISTORY.navChip, ...LATER_CHIPS];
const SECTION_IDS = NAV_CHIPS.map((chip) => chip.id);

const revealDelay = (index: number) => Math.min(index, REVEAL_MAX_STEPS) * REVEAL_STEP_MS;
const easeOutCubic = (t: number) => 1 - (1 - Math.min(1, Math.max(0, t))) ** 3;

const CSR_ICONS = {
  factory: Factory,
  recycle: Recycle,
  leaf: Leaf,
} as const;

const bannerSettle = stylex.keyframes({
  "0%": { scale: "1.08" },
  "100%": { scale: "1" },
});

const scrollCue = stylex.keyframes({
  "0%": { transform: "translateY(-100%)" },
  "100%": { transform: "translateY(200%)" },
});

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const zoomIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "scale(0.96)" },
  "100%": { opacity: 1, transform: "none" },
});

const dynamic = stylex.create({
  delay: (ms: number) => ({ transitionDelay: `${ms}ms` }),
});

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
  inset124: {
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_124 },
  },
  anchor: {
    scrollMarginTop: HEADER_HEIGHT + SUB_BAR_HEIGHT + 24,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  reveal: {
    opacity: 0,
    transform: { default: null, [breakpoints.motionOk]: "translateY(18px)" },
    transitionProperty: "opacity, transform",
    transitionDuration: "900ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },
  revealShown: {
    opacity: 1,
    transform: "none",
  },
  grain: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: GRAIN,
    opacity: 0.14,
    mixBlendMode: "overlay",
    pointerEvents: "none",
  },
  behind: {
    zIndex: -1,
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  photoOutline: {
    outlineWidth: 1,
    outlineStyle: "solid",
    outlineColor: PHOTO_OUTLINE,
    outlineOffset: -1,
  },

  banner: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    height: { default: 480, [TABLET]: 580, [DESKTOP]: "clamp(580px, 80svh, 720px)" },
    backgroundColor: "#0b2a5c",
    color: colors.paper,
  },
  bannerImage: {
    animationName: { default: null, [breakpoints.motionOk]: bannerSettle },
    animationDuration: "1800ms",
    animationDelay: "200ms",
    animationTimingFunction: EASE_OUT_CSS,
    animationFillMode: "both",
    objectPosition: "center 58%",
  },
  bannerScrim: {
    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0px, rgba(255, 255, 255, 0) 160px), linear-gradient(to top, ${NAVY_SCRIM} 0%, rgba(6, 28, 66, 0.34) 42%, rgba(6, 28, 66, 0) 66%)`,
    pointerEvents: "none",
  },
  bannerContent: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 40,
    paddingBottom: { default: 44, [TABLET]: 60, [DESKTOP]: 80 },
  },
  bannerText: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  bannerTitle: {
    margin: 0,
    fontSize: { default: 40, [TABLET]: 56, [DESKTOP]: 72 },
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "0.06em",
    textShadow: "0 2px 24px rgba(6, 28, 66, 0.35)",
  },
  bannerTagline: {
    margin: 0,
    fontFamily: SERIF_ACCENT,
    fontStyle: "italic",
    fontSize: { default: 22, [TABLET]: 26, [DESKTOP]: 30 },
    fontWeight: 400,
    lineHeight: 1.2,
    color: "rgba(255, 255, 255, 0.94)",
  },
  bannerLead: {
    margin: 0,
    maxWidth: 640,
    fontSize: { default: 15, [DESKTOP]: 17 },
    lineHeight: 1.8,
    letterSpacing: "0.08em",
    color: "rgba(255, 255, 255, 0.84)",
    textWrap: "pretty",
  },
  bannerMeta: {
    display: { default: "none", [breakpoints.md]: "flex" },
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 14,
    flexShrink: 0,
    fontFamily: DISPLAY_FONT,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.78)",
  },
  bannerMetaRule: {
    width: 40,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  scrollTrack: {
    position: "relative",
    overflow: "hidden",
    width: 1,
    height: 56,
    marginTop: 10,
    marginInlineEnd: 4,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  scrollThumb: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "40%",
    backgroundColor: colors.paper,
    animationName: { default: null, [breakpoints.motionOk]: scrollCue },
    animationDuration: "2400ms",
    animationTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
    animationIterationCount: "infinite",
  },

  subBar: {
    position: "sticky",
    top: HEADER_HEIGHT,
    zIndex: 30,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 1px 0 0 rgba(26, 26, 26, 0.08)",
  },
  subBarInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    height: SUB_BAR_HEIGHT,
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
    fontSize: 13,
    letterSpacing: "0.04em",
    color: BODY_TEXT,
  },
  breadcrumbLink: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: { default: BODY_TEXT, ":hover": colors.brandBlue700 },
    cursor: "pointer",
  },
  breadcrumbCurrent: {
    color: INK,
    fontWeight: 600,
  },
  chipList: {
    display: "flex",
    alignItems: "center",
    justifyContent: { default: "flex-start", [breakpoints.lg]: "flex-end" },
    gap: 12,
    flexGrow: 1,
    minWidth: 0,
    paddingBlock: 4,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: 36,
    paddingInline: 18,
    borderRadius: 999,
    backgroundColor: { default: "#f3f4f6", ":hover": "#e5e7eb" },
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": colors.brandBlue700 },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transitionProperty: "background-color, color, transform, box-shadow",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  chipActive: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: { default: colors.paper, ":hover": colors.paper },
    boxShadow: "0 4px 12px -2px rgba(29, 78, 216, 0.32)",
  },

  sectionHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    maxWidth: 760,
    marginInline: "auto",
    marginBottom: { default: 40, [DESKTOP]: 64 },
    textAlign: "center",
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
    textWrap: "balance",
  },

  moment: {
    position: "relative",
    height: { default: 560, [TABLET]: 680, [DESKTOP]: "min(92svh, 860px)" },
    backgroundColor: colors.paper,
  },
  momentFrame: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#0b2a5c",
    color: colors.paper,
  },
  momentScrim: {
    backgroundImage: {
      default:
        "linear-gradient(to top, rgba(6, 28, 66, 0.9) 0%, rgba(6, 28, 66, 0.62) 58%, rgba(6, 28, 66, 0) 88%)",
      [breakpoints.md]:
        "linear-gradient(to top, rgba(6, 28, 66, 0.82) 0%, rgba(6, 28, 66, 0.36) 42%, rgba(6, 28, 66, 0) 68%)",
    },
    pointerEvents: "none",
  },
  momentCaption: {
    position: "absolute",
    top: { default: 24, [DESKTOP]: 40 },
    insetInlineStart: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_124 },
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.16em",
    color: "rgba(255, 255, 255, 0.86)",
    textShadow: "0 1px 12px rgba(0, 0, 0, 0.35)",
  },
  momentStats: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.md]: "repeat(3, minmax(0, 1fr))" },
    paddingBottom: { default: 32, [TABLET]: 56, [DESKTOP]: 80 },
  },
  momentStat: {
    display: "flex",
    flexDirection: { default: "row", [breakpoints.md]: "column" },
    alignItems: { default: "baseline", [breakpoints.md]: "center" },
    justifyContent: { default: "space-between", [breakpoints.md]: "flex-start" },
    gap: { default: 16, [breakpoints.md]: 10 },
    paddingBlock: { default: 14, [breakpoints.md]: 0 },
    borderTopWidth: { default: 1, [breakpoints.md]: 0 },
    borderInlineStartWidth: 0,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  momentStatDivided: {
    borderInlineStartWidth: { default: 0, [breakpoints.md]: 1 },
  },
  statFigure: {
    display: "flex",
    alignItems: "baseline",
    gap: 4,
    fontFamily: DISPLAY_FONT,
  },
  statValue: {
    fontSize: { default: 40, [TABLET]: 56, [DESKTOP]: 72 },
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  statUnit: {
    fontSize: { default: 20, [DESKTOP]: 28 },
    fontWeight: 600,
    color: CSR_ACCENT,
  },
  statText: {
    margin: 0,
    fontSize: 14,
    letterSpacing: "0.1em",
    color: "rgba(255, 255, 255, 0.82)",
  },

  campusSection: {
    paddingBlock: { default: 72, [DESKTOP]: 128 },
    backgroundColor: colors.paper,
  },
  campusGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [breakpoints.md]: "repeat(4, minmax(0, 1fr))",
    },
    gridAutoRows: { default: 150, [SM_BELOW_DESKTOP]: 200, [DESKTOP]: 250 },
    gap: { default: 8, [breakpoints.md]: 16 },
  },
  campusTile: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    borderRadius: 12,
    backgroundColor: "#dfe5ee",
  },
  tileFeature: {
    gridColumn: "span 2",
    gridRow: "span 2",
  },
  tileWide: {
    gridColumn: "span 2",
  },
  tileButton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "zoom-in",
    transform: {
      default: null,
      ":hover": { default: null, [HOVER_MOTION]: "scale(1.04)" },
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.99)" },
    },
    transitionProperty: "transform",
    transitionDuration: "700ms",
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 3,
    outlineColor: colors.paper,
    outlineOffset: -6,
  },
  campusCaption: {
    position: "absolute",
    insetInlineStart: 0,
    insetBlockEnd: 0,
    width: "100%",
    boxSizing: "border-box",
    padding: { default: "36px 12px 12px", [breakpoints.md]: "56px 20px 18px" },
    backgroundImage: "linear-gradient(to top, rgba(6, 28, 66, 0.62), rgba(6, 28, 66, 0))",
    fontSize: { default: 13, [breakpoints.md]: 15 },
    fontWeight: 600,
    letterSpacing: "0.08em",
    color: colors.paper,
    pointerEvents: "none",
  },

  lightbox: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100dvh",
    maxWidth: "none",
    maxHeight: "none",
    margin: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "rgba(6, 12, 24, 0.94)",
    color: colors.paper,
    animationName: fadeIn,
    animationDuration: "240ms",
    animationTimingFunction: EASE_OUT_CSS,
    "::backdrop": { backgroundColor: "transparent" },
  },
  lightboxStage: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: { default: "64px 12px", [breakpoints.md]: "72px 104px" },
  },
  lightboxFigure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    margin: 0,
    maxWidth: "100%",
    animationTimingFunction: EASE_OUT_CSS,
  },
  lightboxFigureOpen: {
    animationName: { default: fadeIn, [breakpoints.motionOk]: zoomIn },
    animationDuration: "260ms",
  },
  lightboxFigureStep: {
    animationName: fadeIn,
    animationDuration: "180ms",
  },
  lightboxImage: {
    display: "block",
    maxWidth: "min(1400px, 100%)",
    maxHeight: "calc(100dvh - 200px)",
    width: "auto",
    height: "auto",
    borderRadius: 8,
  },
  lightboxCaption: {
    fontSize: 15,
    letterSpacing: "0.1em",
    color: "rgba(255, 255, 255, 0.86)",
  },
  lightboxButton: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    padding: 0,
    borderWidth: 0,
    borderRadius: "50%",
    backgroundColor: { default: "rgba(255, 255, 255, 0.1)", ":hover": "rgba(255, 255, 255, 0.2)" },
    color: colors.paper,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 2,
  },
  lightboxPrev: {
    top: "50%",
    insetInlineStart: { default: 12, [breakpoints.md]: 32 },
    marginTop: -24,
  },
  lightboxNext: {
    top: "50%",
    insetInlineEnd: { default: 12, [breakpoints.md]: 32 },
    marginTop: -24,
  },
  lightboxClose: {
    top: { default: 12, [breakpoints.md]: 24 },
    insetInlineEnd: { default: 12, [breakpoints.md]: 32 },
  },

  csrSection: {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    paddingTop: { default: 260, [TABLET]: 340, [DESKTOP]: 420 },
    paddingBottom: { default: 64, [DESKTOP]: 104 },
    backgroundColor: "#0a2a26",
    color: "#ffffff",
  },
  csrMedia: {
    position: "absolute",
    zIndex: -2,
    top: "-8%",
    left: 0,
    width: "100%",
    height: "116%",
  },
  csrImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 40%",
  },
  csrScrim: {
    zIndex: -1,
    backgroundImage:
      "linear-gradient(to top, rgba(6, 30, 27, 0.97) 0%, rgba(6, 30, 27, 0.86) 36%, rgba(6, 30, 27, 0.32) 64%, rgba(6, 30, 27, 0.05) 100%), linear-gradient(to right, rgba(6, 30, 27, 0.5), rgba(6, 30, 27, 0) 64%)",
    pointerEvents: "none",
  },
  csrInner: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 48, [DESKTOP]: 88 },
  },
  csrHead: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [DESKTOP]: "minmax(0, 1.2fr) minmax(0, 0.8fr)" },
    gap: { default: 24, [DESKTOP]: 80 },
    alignItems: "end",
  },
  csrTitle: {
    margin: 0,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: "0.12em",
    color: CSR_ACCENT,
  },
  csrStatement: {
    margin: 0,
    fontSize: { default: 28, [TABLET]: 40, [DESKTOP]: 52 },
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: "0.04em",
  },
  csrStatementLine: {
    display: "block",
  },
  csrDesc: {
    margin: 0,
    maxWidth: "28em",
    fontSize: 15,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: "rgba(255, 255, 255, 0.78)",
  },
  csrOutcomes: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.md]: "repeat(3, minmax(0, 1fr))" },
    columnGap: 40,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  csrOutcome: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    paddingBlock: { default: 18, [breakpoints.md]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "rgba(255, 255, 255, 0.22)",
    fontSize: { default: 17, [DESKTOP]: 20 },
    fontWeight: 600,
    letterSpacing: "0.08em",
  },
  csrOutcomeIcon: {
    flexShrink: 0,
    color: CSR_ACCENT,
  },
});

function Reveal({
  children,
  step = 0,
  sx,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  sx?: stylex.StyleXStyles;
  as?: "div" | "li" | "figure";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const shown = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return (
    <Tag
      ref={ref}
      {...stylex.props(
        styles.reveal,
        shown && styles.revealShown,
        dynamic.delay(revealDelay(step)),
        sx,
      )}
    >
      {children}
    </Tag>
  );
}

function SectionHeader({ title, titleId }: { title: string; titleId: string }) {
  return (
    <Reveal sx={styles.sectionHeader}>
      <h2 id={titleId} {...stylex.props(styles.sectionTitle)}>
        {title}
      </h2>
    </Reveal>
  );
}

function CountUp({ value }: { value: string }) {
  const target = Number(value.replaceAll(",", ""));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (reduce) {
      setDisplay(target);
      return;
    }
    if (!inView) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, target, {
      duration: COUNT_UP_SECONDS,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  return (
    <span ref={ref} {...stylex.props(styles.statValue)}>
      <span aria-hidden="true">{display.toLocaleString("en-US")}</span>
      <span {...stylex.props(styles.srOnly)}>{value}</span>
    </span>
  );
}

function CampusMoment() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.2"],
  });
  const clipPath = useTransform(scrollYProgress, (progress) => {
    const rest = 1 - easeOutCubic(progress);
    return `inset(${10 * rest}% ${6 * rest}% ${10 * rest}% ${6 * rest}% round ${32 * rest}px)`;
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      ref={sectionRef}
      id="about-stats"
      aria-label="泛成发展数据"
      {...stylex.props(styles.moment)}
    >
      <m.div {...stylex.props(styles.momentFrame)} style={reduce ? undefined : { clipPath }}>
        <m.img
          src={ABOUT_MOMENT.image}
          alt={ABOUT_MOMENT.alt}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.fill)}
          style={reduce ? undefined : { scale }}
        />
        <div aria-hidden="true" {...stylex.props(styles.fill, styles.momentScrim)} />
        <span {...stylex.props(styles.momentCaption)}>{ABOUT_MOMENT.caption}</span>
        <div {...stylex.props(styles.shell, styles.inset124, styles.momentStats)}>
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              {...stylex.props(styles.momentStat, idx > 0 && styles.momentStatDivided)}
            >
              <div {...stylex.props(styles.statFigure)}>
                <CountUp value={stat.value} />
                {stat.unit ? <span {...stylex.props(styles.statUnit)}>{stat.unit}</span> : null}
              </div>
              <p {...stylex.props(styles.statText)}>{stat.caption}</p>
            </div>
          ))}
        </div>
      </m.div>
    </section>
  );
}

function Lightbox({
  index,
  stepped,
  onClose,
  onStep,
}: {
  index: number | null;
  stepped: boolean;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photos = ABOUT_CAMPUS.photos;
  const photo = index === null ? null : photos[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    for (const delta of [1, -1]) {
      const neighbor = new Image();
      neighbor.src = photos[(index + delta + photos.length) % photos.length].large;
    }
  }, [index, photos]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="园区照片"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        event.stopPropagation();
        onStep(event.key === "ArrowRight" ? 1 : -1);
      }}
      {...stylex.props(styles.lightbox)}
    >
      {photo ? (
        <>
          <div
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
            {...stylex.props(styles.lightboxStage)}
          >
            <figure
              key={photo.id}
              {...stylex.props(
                styles.lightboxFigure,
                stepped ? styles.lightboxFigureStep : styles.lightboxFigureOpen,
              )}
            >
              <img src={photo.large} alt={photo.alt} {...stylex.props(styles.lightboxImage)} />
              <figcaption {...stylex.props(styles.lightboxCaption)}>{photo.caption}</figcaption>
            </figure>
          </div>
          <button
            type="button"
            aria-label="上一张"
            onClick={() => onStep(-1)}
            {...stylex.props(styles.lightboxButton, styles.lightboxPrev)}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="下一张"
            onClick={() => onStep(1)}
            {...stylex.props(styles.lightboxButton, styles.lightboxNext)}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            {...stylex.props(styles.lightboxButton, styles.lightboxClose)}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </>
      ) : null}
    </dialog>
  );
}

function CampusGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [stepped, setStepped] = useState(false);
  const count = ABOUT_CAMPUS.photos.length;

  return (
    <section
      id="about-campus"
      aria-labelledby="about-campus-title"
      {...stylex.props(styles.campusSection, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset124)}>
        <SectionHeader title={ABOUT_CAMPUS.title} titleId="about-campus-title" />
        <div {...stylex.props(styles.campusGrid)}>
          {ABOUT_CAMPUS.photos.map((photo, idx) => (
            <Reveal
              key={photo.id}
              as="figure"
              step={idx}
              sx={[
                styles.campusTile,
                styles.photoOutline,
                photo.span === "feature" && styles.tileFeature,
                photo.span === "wide" && styles.tileWide,
              ]}
            >
              <button
                type="button"
                aria-label={`查看大图：${photo.caption}`}
                onClick={() => {
                  setStepped(false);
                  setOpenIndex(idx);
                }}
                {...stylex.props(styles.tileButton)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(styles.fill)}
                />
              </button>
              <figcaption {...stylex.props(styles.campusCaption)}>{photo.caption}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox
        index={openIndex}
        stepped={stepped}
        onClose={() => setOpenIndex(null)}
        onStep={(delta) => {
          setStepped(true);
          setOpenIndex((current) => (current === null ? null : (current + delta + count) % count));
        }}
      />
    </section>
  );
}

function CsrSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const [statementLead, statementClose] = ABOUT_CSR.statement;

  return (
    <section
      ref={sectionRef}
      id="about-csr"
      aria-labelledby="about-csr-title"
      {...stylex.props(styles.csrSection, styles.anchor)}
    >
      <m.div {...stylex.props(styles.csrMedia)} style={reduce ? undefined : { y: drift }}>
        <img
          src={ABOUT_CSR.image}
          alt={ABOUT_CSR.imageAlt}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.csrImage)}
        />
      </m.div>
      <div aria-hidden="true" {...stylex.props(styles.fill, styles.csrScrim)} />
      <div aria-hidden="true" {...stylex.props(styles.grain, styles.behind)} />
      <div {...stylex.props(styles.shell, styles.inset124, styles.csrInner)}>
        <Reveal sx={styles.csrHead}>
          <div>
            <h2 id="about-csr-title" {...stylex.props(styles.csrTitle)}>
              {ABOUT_CSR.title}
            </h2>
            <p {...stylex.props(styles.csrStatement)}>
              <span {...stylex.props(styles.csrStatementLine)}>{statementLead}</span>
              <span {...stylex.props(styles.csrStatementLine)}>{statementClose}</span>
            </p>
          </div>
          <p {...stylex.props(styles.csrDesc)}>{ABOUT_CSR.desc}</p>
        </Reveal>
        <ul {...stylex.props(styles.csrOutcomes)}>
          {ABOUT_CSR.outcomes.map((outcome, idx) => {
            const Icon = CSR_ICONS[outcome.icon];
            return (
              <Reveal key={outcome.title} as="li" step={idx} sx={styles.csrOutcome}>
                <Icon
                  size={22}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  {...stylex.props(styles.csrOutcomeIcon)}
                />
                {outcome.title}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function SubNav({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  const active = useActiveSection(SECTION_IDS);
  const chipListRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const list = chipListRef.current;
    const chip = active ? list?.querySelector<HTMLElement>(`[href="#${active}"]`) : null;
    if (!list || !chip) return;
    const listBox = list.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();
    if (chipBox.left < listBox.left || chipBox.right > listBox.right) {
      list.scrollBy({
        left: chipBox.left - listBox.left - 16,
        behavior: reduce ? "auto" : "smooth",
      });
    }
  }, [active, reduce]);

  return (
    <div {...stylex.props(styles.subBar)}>
      <div {...stylex.props(styles.shell, styles.inset124, styles.subBarInner)}>
        <nav aria-label="面包屑导航" {...stylex.props(styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(styles.breadcrumbLink, styles.focusRing)}
          >
            首页
          </button>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
            关于我们
          </span>
        </nav>
        <nav aria-label="本页导航" ref={chipListRef} {...stylex.props(styles.chipList)}>
          {NAV_CHIPS.map((chip) => (
            <a
              key={chip.id}
              href={`#${chip.id}`}
              aria-current={active === chip.id ? "location" : undefined}
              {...stylex.props(
                styles.chip,
                active === chip.id && styles.chipActive,
                styles.focusRing,
              )}
            >
              {chip.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function AboutView({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <section aria-labelledby="about-banner-title" {...stylex.props(styles.banner)}>
        <img
          src={ABOUT_BANNER.image}
          alt={ABOUT_BANNER.alt}
          fetchPriority="high"
          decoding="async"
          {...stylex.props(styles.fill, styles.bannerImage)}
        />
        <div aria-hidden="true" {...stylex.props(styles.fill, styles.bannerScrim)} />
        <div aria-hidden="true" {...stylex.props(styles.grain)} />
        <div {...stylex.props(styles.shell, styles.inset124, styles.bannerContent)}>
          <div {...stylex.props(styles.bannerText)}>
            <h1 id="about-banner-title" {...stylex.props(styles.bannerTitle)}>
              {ABOUT_BANNER.title}
            </h1>
            <p lang="en" {...stylex.props(styles.bannerTagline)}>
              {ABOUT_BANNER.tagline}
            </p>
            <p {...stylex.props(styles.bannerLead)}>{ABOUT_BANNER.lead}</p>
          </div>
          <div lang="en" {...stylex.props(styles.bannerMeta)}>
            <span>{ABOUT_BANNER.established}</span>
            <span aria-hidden="true" {...stylex.props(styles.bannerMetaRule)} />
            <span>{ABOUT_BANNER.place}</span>
            <span aria-hidden="true" {...stylex.props(styles.scrollTrack)}>
              <span {...stylex.props(styles.scrollThumb)} />
            </span>
          </div>
        </div>
      </section>

      <SubNav onNavigateHome={onNavigateHome} />

      <ProfileOOS1G />

      <HistoryTimeline stickyTop={HEADER_HEIGHT + SUB_BAR_HEIGHT} sx={styles.anchor} />

      <CampusMoment />

      <CampusGallery />

      <CultureScenes sx={styles.anchor} />

      <CsrSection />

      <NavyBand />

      <ContactCta
        actions={[
          { label: CTA.action.label, onClick: () => onNavigateHome("contact") },
          { label: "产品与应用", tone: "secondary", onClick: () => onNavigateHome("products") },
        ]}
      />
    </div>
  );
}
