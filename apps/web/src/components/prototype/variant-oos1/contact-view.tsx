import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  Download,
  MapPin,
  Plus,
} from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type SubmitEvent } from "react";
import { toast } from "sonner";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { Flow } from "../shared/flow";
import { ContactCta } from "./contact-cta";
import {
  CONTACT_BANNER,
  CONTACT_DETAILS,
  CONTACT_FAQ,
  CONTACT_FAQ_INTRO,
  CONTACT_NAV_CHIPS,
  INQUIRY_INTRO,
  INQUIRY_SUBJECTS,
  NEXT_STEPS,
  SERVICE_PROMISES,
  VISIT_INTRO,
  VISIT_LOCATION,
  type InquirySubjectId,
} from "./contact-data";
import { RiseReveal } from "./rise-reveal";
import { useActiveSection } from "./use-active-section";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b7280";
const HAIRLINE = "rgba(26, 26, 26, 0.14)";
const FIELD_BORDER = "#8a93a3";
const NAVY_DEEP = "#0b2a5c";
const TINT = "#f3f5fa";
const BLUE_TINT = "#e6ecf7";
const BLUE_WASH = "#f2f6fd";
const CHIP_BG = "#f3f4f6";
const CHIP_BG_HOVER = "#e5e7eb";
const REQUIRED_MARK = "#b91c1c";
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const SERIF_ACCENT = '"Instrument Serif", Georgia, serif';
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NAVY_SCRIM = "rgba(6, 28, 66, 0.78)";
const MAP_LAND = "#eef1f5";
const MAP_BLOCK = "#e3e8ef";
const MAP_PARK = "#dce9d8";
const MAP_WATER = "#cbdaf1";
const MAP_ROAD = "#ffffff";
const MAP_ROAD_CASING = "#d6dde7";
const MAP_HIGHWAY = "#f2d896";
const MAP_HIGHWAY_CASING = "#e0bf72";
const MAP_SHADOW = "0 18px 40px -18px rgba(11, 42, 92, 0.35)";
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const HOVER = "@media (hover: hover)";
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const INSET_120 = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const SUB_BAR_HEIGHT = 64;
const STICKY_OFFSET = HEADER_HEIGHT + SUB_BAR_HEIGHT;

const SECTION_IDS = CONTACT_NAV_CHIPS.map((chip) => chip.id);

const RISE_STAGGER = 0.06;
const RISE_MAX_STEPS = 3;
const riseDelay = (index: number) => Math.min(index, RISE_MAX_STEPS) * RISE_STAGGER;
const indexLabel = (index: number) => String(index + 1).padStart(2, "0");

const bannerSettle = stylex.keyframes({
  "0%": { scale: "1.08" },
  "100%": { scale: "1" },
});

const scrollCue = stylex.keyframes({
  "0%": { transform: "translateY(-100%)" },
  "100%": { transform: "translateY(200%)" },
});

const pinPulse = stylex.keyframes({
  "0%": { transform: "translate(-50%, -50%) scale(0.4)", opacity: 0.6 },
  "100%": { transform: "translate(-50%, -50%) scale(1.8)", opacity: 0 },
});

const answerFade = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const answerRise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(-4px)" },
  "100%": { opacity: 1, transform: "none" },
});

const dynamic = stylex.create({
  minHeight: (height: number) => ({ minHeight: height }),
});

const styles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    color: INK,
    fontFamily: BODY_FONT,
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
  anchor: {
    scrollMarginTop: STICKY_OFFSET,
  },
  section: {
    paddingBlock: { default: 72, [DESKTOP]: 112 },
  },
  focusRing: {
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  list: {
    margin: 0,
    paddingInlineStart: 0,
    listStyle: "none",
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
  banner: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    height: { default: 480, [TABLET]: 580, [DESKTOP]: "clamp(580px, 80svh, 720px)" },
    backgroundColor: NAVY_DEEP,
    color: colors.paper,
  },
  bannerImage: {
    objectPosition: "center 58%",
    animationName: { default: null, [breakpoints.motionOk]: bannerSettle },
    animationDuration: "1800ms",
    animationDelay: "200ms",
    animationTimingFunction: EASE_OUT_CSS,
    animationFillMode: "both",
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
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.92)",
  },
  bannerMetaRule: {
    width: 40,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.72)",
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
    fontFamily: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit",
    color: { default: BODY_TEXT, ":hover": { default: null, [HOVER]: colors.brandBlue700 } },
    cursor: "pointer",
  },
  breadcrumbCurrent: {
    color: INK,
    fontWeight: 600,
  },
  chipList: {
    display: "flex",
    alignItems: "center",
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
    backgroundColor: { default: CHIP_BG, ":hover": { default: null, [HOVER]: CHIP_BG_HOVER } },
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": { default: null, [HOVER]: colors.brandBlue700 } },
    textDecoration: "none",
    whiteSpace: "nowrap",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, color, box-shadow, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease, ease, ease, ease-out",
    WebkitTapHighlightColor: "transparent",
  },
  chipLead: {
    marginInlineStart: { default: 0, [breakpoints.lg]: "auto" },
  },
  chipActive: {
    backgroundColor: {
      default: colors.brandBlue700,
      ":hover": { default: null, [HOVER]: colors.brandBlue800 },
    },
    color: { default: colors.paper, ":hover": { default: null, [HOVER]: colors.paper } },
    boxShadow: "0 4px 12px -2px rgba(29, 78, 216, 0.32)",
  },

  sectionHead: {
    maxWidth: 720,
    marginBottom: { default: 40, [DESKTOP]: 56 },
  },
  sectionHeadTight: {
    marginBottom: { default: 32, [DESKTOP]: 40 },
  },
  sectionEyebrow: {
    margin: 0,
    marginBottom: 12,
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.brandBlue700,
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
    marginTop: 14,
    maxWidth: "36em",
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.8,
    letterSpacing: "0.03em",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  inquiryLayout: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "minmax(0, 0.82fr) minmax(0, 1.18fr)",
    },
    gap: { default: 48, [DESKTOP]: 96 },
    alignItems: "start",
  },
  inquiryAside: {
    position: { default: "static", [breakpoints.lg]: "sticky" },
    top: STICKY_OFFSET + 40,
  },
  details: {
    margin: 0,
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  detailRow: {
    display: "grid",
    gridTemplateColumns: "88px minmax(0, 1fr)",
    columnGap: 16,
    alignItems: "baseline",
    paddingBlock: 18,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  detailTerm: {
    fontSize: 13,
    letterSpacing: "0.04em",
    color: MUTED,
  },
  detailValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.01em",
    fontVariantNumeric: "tabular-nums",
    color: INK,
    overflowWrap: "break-word",
  },
  detailLink: {
    color: { default: INK, ":hover": { default: null, [HOVER]: colors.brandBlue700 } },
    textDecorationLine: { default: "none", ":hover": { default: null, [HOVER]: "underline" } },
    textDecorationThickness: 1,
    textUnderlineOffset: 4,
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  promises: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 28,
  },
  promise: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.5,
    color: BODY_TEXT,
  },
  promiseIcon: {
    flexShrink: 0,
    color: colors.brandBlue700,
  },
  brochureButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    minHeight: 44,
    marginTop: 20,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.02em",
    color: colors.brandBlue700,
    textDecorationLine: { default: "none", ":hover": { default: null, [HOVER]: "underline" } },
    textUnderlineOffset: 4,
    cursor: "pointer",
  },

  formPanel: {
    backgroundColor: TINT,
    padding: { default: "32px 20px", [breakpoints.md]: 40, [DESKTOP]: 48 },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  fieldset: {
    minWidth: 0,
    margin: 0,
    padding: 0,
    borderWidth: 0,
  },
  legend: {
    padding: 0,
    marginBottom: 10,
  },
  subjectList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  subjectOption: {
    position: "relative",
    display: "inline-flex",
  },
  subjectChip: {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    height: 40,
    paddingInline: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: FIELD_BORDER, ":hover": { default: null, [HOVER]: INK } },
    backgroundColor: colors.paper,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.02em",
    color: INK,
    whiteSpace: "nowrap",
    cursor: "pointer",
    userSelect: "none",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, border-color, color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease, ease, ease, ease-out",
    WebkitTapHighlightColor: "transparent",
    outlineStyle: {
      default: "none",
      [stylex.when.siblingBefore(":focus-visible")]: "solid",
    },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  subjectChipActive: {
    paddingInline: 15,
    borderWidth: 2,
    borderColor: {
      default: colors.brandBlue700,
      ":hover": { default: null, [HOVER]: colors.brandBlue700 },
    },
    backgroundColor: BLUE_WASH,
    color: colors.brandBlue700,
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.md]: "repeat(2, minmax(0, 1fr))" },
    columnGap: 20,
    rowGap: 24,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 0,
  },
  fieldFull: {
    gridColumn: "1 / -1",
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.02em",
    color: INK,
  },
  requiredMark: {
    marginInlineStart: 2,
    color: REQUIRED_MARK,
  },
  input: {
    boxSizing: "border-box",
    width: "100%",
    height: 48,
    paddingInline: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: FIELD_BORDER,
      ":hover": { default: null, [HOVER]: INK },
      ":focus-visible": colors.brandBlue700,
    },
    borderRadius: 0,
    backgroundColor: colors.paper,
    fontFamily: "inherit",
    fontSize: 15,
    color: INK,
    transitionProperty: "border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 1,
    outlineColor: colors.brandBlue700,
    outlineOffset: 0,
    "::placeholder": { color: MUTED },
  },
  textarea: {
    height: "auto",
    minHeight: 140,
    paddingBlock: 12,
    lineHeight: 1.7,
    resize: "vertical",
  },
  formFooter: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "stretch", [breakpoints.md]: "center" },
    justifyContent: "space-between",
    gap: { default: 20, [breakpoints.md]: 32 },
    marginTop: 8,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  consent: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    minWidth: 0,
    maxWidth: { default: "none", [breakpoints.md]: "26em" },
    fontSize: 13,
    lineHeight: 1.7,
    color: BODY_TEXT,
    cursor: "pointer",
  },
  checkbox: {
    flexShrink: 0,
    width: 18,
    height: 18,
    margin: 0,
    marginTop: 3,
    accentColor: colors.brandBlue700,
    cursor: "pointer",
  },
  submit: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexShrink: 0,
    height: 52,
    paddingInlineStart: 28,
    paddingInlineEnd: 26,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: {
      default: colors.brandBlue700,
      ":hover": { default: null, [HOVER]: colors.brandBlue800 },
    },
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: colors.paper,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease, ease-out",
    WebkitTapHighlightColor: "transparent",
  },
  submitArrow: {
    transform: {
      default: null,
      [stylex.when.ancestor(":hover")]: {
        default: null,
        "@media (hover: hover) and (prefers-reduced-motion: no-preference)": "translateX(3px)",
      },
    },
    transitionProperty: "transform",
    transitionDuration: "150ms",
    transitionTimingFunction: EASE_OUT_CSS,
  },

  swapFrame: {
    display: "flex",
    flexDirection: "column",
  },
  swapItem: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  done: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flexGrow: 1,
    gap: 16,
  },
  doneIcon: {
    color: colors.brandBlue700,
  },
  doneTitle: {
    margin: 0,
    fontSize: { default: 22, [DESKTOP]: 26 },
    fontWeight: 700,
    lineHeight: 1.3,
    color: INK,
    outlineStyle: "none",
    scrollMarginTop: STICKY_OFFSET + 24,
  },
  doneText: {
    margin: 0,
    maxWidth: "32em",
    fontSize: 15,
    lineHeight: 1.8,
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  doneSteps: {
    alignSelf: "stretch",
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  doneStep: {
    display: "flex",
    alignItems: "baseline",
    gap: 16,
    paddingBlock: 14,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
    fontSize: 14,
    lineHeight: 1.6,
    color: INK,
  },
  doneStepIndex: {
    flexShrink: 0,
    width: 24,
    fontFamily: DISPLAY_FONT,
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.12em",
    color: colors.brandBlue700,
  },
  againButton: {
    display: "inline-flex",
    alignItems: "center",
    height: 44,
    marginTop: 8,
    paddingInline: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.brandBlue700,
    borderRadius: 0,
    backgroundColor: {
      default: colors.paper,
      ":hover": { default: null, [HOVER]: BLUE_TINT },
    },
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    color: colors.brandBlue700,
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease, ease-out",
    WebkitTapHighlightColor: "transparent",
  },

  visitSection: {
    backgroundColor: TINT,
  },
  visitStage: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  mapFrame: {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    aspectRatio: { default: "4 / 3", [breakpoints.md]: "16 / 9", [breakpoints.lg]: "2 / 1" },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: HAIRLINE,
    backgroundColor: MAP_LAND,
  },
  mapGlow: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 360,
    height: 360,
    translate: "-50% -50%",
    borderRadius: "50%",
    backgroundImage: `radial-gradient(closest-side, color-mix(in srgb, ${colors.brandBlue700} 16%, transparent), transparent)`,
    pointerEvents: "none",
  },
  mapPulse: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 72,
    height: 72,
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    backgroundColor: `color-mix(in srgb, ${colors.brandBlue700} 30%, transparent)`,
    opacity: { default: 0.5, [breakpoints.motionOk]: 0 },
    animationName: { default: null, [breakpoints.motionOk]: pinPulse },
    animationDuration: "2400ms",
    animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    animationIterationCount: "infinite",
    pointerEvents: "none",
  },
  mapPin: {
    position: "absolute",
    left: "50%",
    top: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    translate: "-50% calc(-100% - 7px)",
    pointerEvents: "none",
  },
  mapPinLabel: {
    paddingBlock: 6,
    paddingInline: 12,
    borderRadius: 999,
    backgroundColor: colors.paper,
    boxShadow: "0 6px 16px -6px rgba(11, 42, 92, 0.35)",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.06em",
    whiteSpace: "nowrap",
    color: INK,
  },
  mapPinHead: {
    display: "grid",
    placeItems: "center",
    width: 34,
    height: 34,
    borderRadius: "50% 50% 50% 0",
    rotate: "-45deg",
    backgroundColor: colors.brandBlue700,
    boxShadow: "0 8px 16px -6px rgba(11, 42, 92, 0.55)",
  },
  mapPinDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: colors.paper,
  },
  visitCard: {
    position: { default: "static", [breakpoints.lg]: "absolute" },
    top: 24,
    left: 24,
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    boxSizing: "border-box",
    width: { default: "100%", [breakpoints.lg]: 380 },
    padding: { default: 24, [DESKTOP]: 28 },
    backgroundColor: colors.paper,
    boxShadow: { default: "none", [breakpoints.lg]: MAP_SHADOW },
  },
  visitName: {
    margin: 0,
    fontSize: { default: 17, [DESKTOP]: 18 },
    fontWeight: 700,
    lineHeight: 1.4,
    color: INK,
  },
  visitFacts: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  visitFact: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    fontSize: 14,
    lineHeight: 1.7,
    color: BODY_TEXT,
  },
  visitFactIcon: {
    flexShrink: 0,
    marginTop: 4,
    color: colors.brandBlue700,
  },
  visitActions: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 20,
    rowGap: 8,
    marginTop: 4,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  visitBook: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 44,
    paddingInline: 20,
    backgroundColor: {
      default: colors.brandBlue700,
      ":hover": { default: null, [HOVER]: colors.brandBlue800 },
    },
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.02em",
    color: colors.paper,
    textDecoration: "none",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease, ease-out",
    WebkitTapHighlightColor: "transparent",
  },
  visitCopy: {
    marginTop: 0,
  },

  faqLayout: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      [breakpoints.lg]: "minmax(0, 0.82fr) minmax(0, 1.18fr)",
    },
    gap: { default: 8, [DESKTOP]: 96 },
    alignItems: "start",
  },
  faqPhone: {
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: colors.brandBlue700,
    textDecoration: "none",
  },
  faqList: {
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: INK,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: HAIRLINE,
  },
  faqSummary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    paddingBlock: { default: 20, [DESKTOP]: 24 },
    listStyle: "none",
    fontSize: { default: 16, [DESKTOP]: 17 },
    fontWeight: 700,
    lineHeight: 1.5,
    color: { default: INK, ":hover": { default: null, [HOVER]: colors.brandBlue700 } },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    WebkitTapHighlightColor: "transparent",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
    "::-webkit-details-marker": { display: "none" },
  },
  faqIcon: {
    display: "inline-grid",
    placeItems: "center",
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: CHIP_BG,
    color: INK,
    transitionProperty: "transform, background-color, color",
    transitionDuration: { default: "0s", [breakpoints.motionOk]: "200ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  faqIconOpen: {
    transform: "rotate(45deg)",
    backgroundColor: colors.brandBlue700,
    color: colors.paper,
  },
  faqAnswer: {
    margin: 0,
    maxWidth: "38em",
    paddingBottom: 24,
    paddingInlineEnd: { default: 0, [breakpoints.md]: 56 },
    fontSize: 15,
    lineHeight: 1.9,
    color: BODY_TEXT,
    textWrap: "pretty",
    animationName: {
      default: null,
      [stylex.when.ancestor(":open")]: {
        default: answerFade,
        [breakpoints.motionOk]: answerRise,
      },
    },
    animationDuration: "200ms",
    animationTimingFunction: EASE_OUT_CSS,
  },
});

function SectionHead({
  eyebrow,
  title,
  titleId,
  lead,
  tight = false,
}: {
  eyebrow: string;
  title: string;
  titleId: string;
  lead?: ReactNode;
  tight?: boolean;
}) {
  return (
    <RiseReveal sx={[styles.sectionHead, tight && styles.sectionHeadTight]}>
      <p lang="en" {...stylex.props(styles.sectionEyebrow)}>
        {eyebrow}
      </p>
      <h2 id={titleId} {...stylex.props(styles.sectionTitle)}>
        {title}
      </h2>
      {lead ? <p {...stylex.props(styles.sectionLead)}>{lead}</p> : null}
    </RiseReveal>
  );
}

function Banner() {
  return (
    <section aria-labelledby="contact-banner-title" {...stylex.props(styles.banner)}>
      <img
        src={CONTACT_BANNER.image}
        alt={CONTACT_BANNER.imageAlt}
        fetchPriority="high"
        decoding="async"
        {...stylex.props(styles.fill, styles.bannerImage)}
      />
      <div aria-hidden="true" {...stylex.props(styles.fill, styles.bannerScrim)} />
      <div aria-hidden="true" {...stylex.props(styles.grain)} />
      <div {...stylex.props(styles.shell, styles.inset120, styles.bannerContent)}>
        <div {...stylex.props(styles.bannerText)}>
          <h1 id="contact-banner-title" {...stylex.props(styles.bannerTitle)}>
            {CONTACT_BANNER.title}
          </h1>
          <p lang="en" {...stylex.props(styles.bannerTagline)}>
            {CONTACT_BANNER.tagline}
          </p>
          <p {...stylex.props(styles.bannerLead)}>{CONTACT_BANNER.lead}</p>
        </div>
        <div lang="en" {...stylex.props(styles.bannerMeta)}>
          {CONTACT_BANNER.meta.map((item, index) => (
            <span key={item}>
              {index > 0 ? (
                <span aria-hidden="true" {...stylex.props(styles.bannerMetaRule)} />
              ) : null}
              {item}
            </span>
          ))}
          <span aria-hidden="true" {...stylex.props(styles.scrollTrack)}>
            <span {...stylex.props(styles.scrollThumb)} />
          </span>
        </div>
      </div>
    </section>
  );
}

function SubNav({ onNavigateHome }: { onNavigateHome: (target?: string) => void }) {
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
      <div {...stylex.props(styles.shell, styles.inset120, styles.subBarInner)}>
        <nav aria-label="Breadcrumb" {...stylex.props(styles.breadcrumb)}>
          <button
            type="button"
            onClick={() => onNavigateHome("top")}
            {...stylex.props(styles.breadcrumbLink, styles.focusRing)}
          >
            首页
          </button>
          <ChevronRight size={14} strokeWidth={1.5} nonScalingStroke aria-hidden="true" />
          <span aria-current="page" {...stylex.props(styles.breadcrumbCurrent)}>
            {CONTACT_BANNER.title}
          </span>
        </nav>
        <nav aria-label="本页导航" ref={chipListRef} {...stylex.props(styles.chipList)}>
          {CONTACT_NAV_CHIPS.map((chip, index) => (
            <a
              key={chip.id}
              href={`#${chip.id}`}
              aria-current={active === chip.id ? "location" : undefined}
              {...stylex.props(
                styles.chip,
                index === 0 && styles.chipLead,
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

function Field({
  id,
  label,
  required = false,
  full = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <div {...stylex.props(styles.field, full && styles.fieldFull)}>
      <label htmlFor={id} {...stylex.props(styles.label)}>
        {label}
        {required ? (
          <span aria-hidden="true" {...stylex.props(styles.requiredMark)}>
            *
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}

function InquiryFields({
  subjectId,
  onSubjectChange,
  onSubmit,
  focusOnMount,
}: {
  subjectId: InquirySubjectId;
  onSubjectChange: (id: InquirySubjectId) => void;
  onSubmit: () => void;
  focusOnMount: boolean;
}) {
  const nameRef = useRef<HTMLInputElement>(null);
  const subject = INQUIRY_SUBJECTS.find((item) => item.id === subjectId) ?? INQUIRY_SUBJECTS[0];

  useEffect(() => {
    if (focusOnMount) nameRef.current?.focus();
  }, [focusOnMount]);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form method="post" onSubmit={handleSubmit} {...stylex.props(styles.form)}>
      <fieldset {...stylex.props(styles.fieldset)}>
        <legend {...stylex.props(styles.label, styles.legend)}>咨询主题</legend>
        <div {...stylex.props(styles.subjectList)}>
          {INQUIRY_SUBJECTS.map((item) => {
            const isActive = item.id === subjectId;
            return (
              <label key={item.id} {...stylex.props(styles.subjectOption)}>
                <input
                  type="radio"
                  name="subject"
                  value={item.id}
                  checked={isActive}
                  onChange={() => onSubjectChange(item.id)}
                  {...stylex.props(styles.srOnly, stylex.defaultMarker())}
                />
                <span {...stylex.props(styles.subjectChip, isActive && styles.subjectChipActive)}>
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div {...stylex.props(styles.fieldGrid)}>
        <Field id="contact-name" label="联系人姓名" required>
          <input
            ref={nameRef}
            id="contact-name"
            name="contactName"
            required
            autoComplete="name"
            {...stylex.props(styles.input)}
          />
        </Field>
        <Field id="contact-role" label="职务">
          <input
            id="contact-role"
            name="jobTitle"
            autoComplete="organization-title"
            placeholder="如：配方工程师、采购经理"
            {...stylex.props(styles.input)}
          />
        </Field>
        <Field id="contact-phone" label="手机号" required>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="用于物流通知与技术对接"
            {...stylex.props(styles.input)}
          />
        </Field>
        <Field id="contact-email" label="工作邮箱" required>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            placeholder="name@company.com"
            {...stylex.props(styles.input)}
          />
        </Field>
        <Field id="contact-company" label="公司或机构名称" required full>
          <input
            id="contact-company"
            name="company"
            required
            autoComplete="organization"
            placeholder="品牌方、代工厂或研发机构全称"
            {...stylex.props(styles.input)}
          />
        </Field>
        <Field id="contact-message" label="需求描述" required full>
          <textarea
            id="contact-message"
            name="message"
            required
            placeholder={subject.placeholder}
            {...stylex.props(styles.input, styles.textarea)}
          />
        </Field>
      </div>

      <div {...stylex.props(styles.formFooter)}>
        <label {...stylex.props(styles.consent)}>
          <input type="checkbox" name="consent" required {...stylex.props(styles.checkbox)} />
          <span>我同意泛成就本次咨询与我联系。您提交的配方信息将严格保密。</span>
        </label>
        <button
          type="submit"
          {...stylex.props(styles.submit, styles.focusRing, stylex.defaultMarker())}
        >
          提交咨询
          <ArrowRight
            size={18}
            strokeWidth={2}
            nonScalingStroke
            aria-hidden="true"
            {...stylex.props(styles.submitArrow)}
          />
        </button>
      </div>
    </form>
  );
}

function InquirySubmitted({ onReset }: { onReset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div role="status" {...stylex.props(styles.done)}>
      <CheckCircle2
        size={40}
        strokeWidth={2.5}
        nonScalingStroke
        aria-hidden="true"
        {...stylex.props(styles.doneIcon)}
      />
      <h3 ref={headingRef} tabIndex={-1} {...stylex.props(styles.doneTitle)}>
        需求已提交
      </h3>
      <p {...stylex.props(styles.doneText)}>
        感谢您的咨询！专属客户经理与应用工程师将在工作日 24 小时内与您联系。
      </p>
      <ol aria-label="接下来" {...stylex.props(styles.list, styles.doneSteps)}>
        {NEXT_STEPS.map((step, index) => (
          <li key={step} {...stylex.props(styles.doneStep)}>
            <span aria-hidden="true" {...stylex.props(styles.doneStepIndex)}>
              {indexLabel(index)}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={onReset}
        {...stylex.props(styles.againButton, styles.focusRing)}
      >
        提交另一条需求
      </button>
    </div>
  );
}

function InquiryForm() {
  const [subjectId, setSubjectId] = useState<InquirySubjectId>(INQUIRY_SUBJECTS[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [returning, setReturning] = useState(false);
  const [lockedHeight, setLockedHeight] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const offset = (px: number) =>
    reduce ? {} : { transform: `translateY(${px}px)`, filter: "blur(4px)" };

  return (
    <div
      ref={frameRef}
      {...stylex.props(styles.swapFrame, submitted && dynamic.minHeight(lockedHeight))}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={submitted ? "submitted" : "form"}
          initial={{ opacity: 0, ...offset(12) }}
          animate={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
          exit={{ opacity: 0, ...offset(-12), transition: { duration: 0.15, ease: "easeOut" } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          {...stylex.props(styles.swapItem)}
        >
          {submitted ? (
            <InquirySubmitted
              onReset={() => {
                setReturning(true);
                setSubmitted(false);
              }}
            />
          ) : (
            <InquiryFields
              subjectId={subjectId}
              onSubjectChange={setSubjectId}
              onSubmit={() => {
                setLockedHeight(frameRef.current?.offsetHeight ?? 0);
                setSubmitted(true);
              }}
              focusOnMount={returning}
            />
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}

function Inquiry() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-inquiry-title"
      {...stylex.props(styles.section, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.inquiryLayout)}>
        <div {...stylex.props(styles.inquiryAside)}>
          <SectionHead
            eyebrow={INQUIRY_INTRO.eyebrow}
            title={INQUIRY_INTRO.title}
            titleId="contact-inquiry-title"
            lead={INQUIRY_INTRO.lead}
            tight
          />
          <RiseReveal delay={riseDelay(1)}>
            <dl {...stylex.props(styles.details)}>
              {CONTACT_DETAILS.map((detail) => (
                <div key={detail.term} {...stylex.props(styles.detailRow)}>
                  <dt {...stylex.props(styles.detailTerm)}>{detail.term}</dt>
                  <dd {...stylex.props(styles.detailValue)}>
                    {detail.href ? (
                      <a href={detail.href} {...stylex.props(styles.detailLink, styles.focusRing)}>
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <ul aria-label="服务承诺" {...stylex.props(styles.list, styles.promises)}>
              {SERVICE_PROMISES.map((promise) => (
                <li key={promise} {...stylex.props(styles.promise)}>
                  <Check
                    size={16}
                    strokeWidth={2}
                    nonScalingStroke
                    aria-hidden="true"
                    {...stylex.props(styles.promiseIcon)}
                  />
                  {promise}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() =>
                toast("企业画册 PDF 正在更新", {
                  description: "可在表单中备注索取，我们会通过邮件发送最新版本。",
                })
              }
              {...stylex.props(styles.brochureButton, styles.focusRing)}
            >
              <Download size={16} strokeWidth={2} nonScalingStroke aria-hidden="true" />
              {INQUIRY_INTRO.brochureLabel}
            </button>
          </RiseReveal>
        </div>
        <div {...stylex.props(styles.formPanel)}>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}

function MapPlaceholder() {
  return (
    <>
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        {...stylex.props(styles.fill)}
      >
        <rect width="1200" height="600" fill={MAP_LAND} />
        <g fill={MAP_PARK}>
          <path d="M0 0H250C290 80 250 170 180 230C120 280 60 300 0 320Z" />
          <path d="M0 430C120 390 230 430 300 505C330 540 345 575 352 600H0Z" />
          <path d="M870 475C930 445 1015 455 1062 503C1092 534 1102 570 1104 600H856C846 560 838 505 870 475Z" />
        </g>
        <g fill={MAP_BLOCK}>
          <rect x="330" y="40" width="130" height="80" rx="6" />
          <rect x="700" y="50" width="150" height="110" rx="6" />
          <rect x="890" y="40" width="110" height="120" rx="6" />
          <rect x="1050" y="50" width="150" height="100" rx="6" />
          <rect x="360" y="360" width="140" height="110" rx="6" />
          <rect x="690" y="390" width="120" height="90" rx="6" />
          <rect x="1040" y="340" width="160" height="70" rx="6" />
          <rect x="880" y="200" width="100" height="80" rx="6" />
        </g>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M110 -10C150 120 60 220 140 330C210 430 380 470 440 610"
            stroke={MAP_WATER}
            strokeWidth="30"
          />
          <g stroke={MAP_ROAD_CASING}>
            <path d="M-10 262C200 250 380 300 520 380C640 450 760 462 1210 422" strokeWidth="13" />
            <path d="M820 -10L862 610" strokeWidth="13" />
            <path d="M985 -10C960 200 1012 400 1000 610" strokeWidth="13" />
            <path d="M520 380L560 610" strokeWidth="13" />
            <path d="M300 -10C380 160 470 262 600 300C760 350 980 330 1210 298" strokeWidth="20" />
          </g>
          <g stroke={MAP_ROAD}>
            <path d="M-10 262C200 250 380 300 520 380C640 450 760 462 1210 422" strokeWidth="9" />
            <path d="M820 -10L862 610" strokeWidth="9" />
            <path d="M985 -10C960 200 1012 400 1000 610" strokeWidth="9" />
            <path d="M520 380L560 610" strokeWidth="9" />
            <path d="M300 -10C380 160 470 262 600 300C760 350 980 330 1210 298" strokeWidth="15" />
          </g>
          <path
            d="M540 -10C610 180 700 380 770 610"
            stroke={MAP_HIGHWAY_CASING}
            strokeWidth="28"
          />
          <path d="M540 -10C610 180 700 380 770 610" stroke={MAP_HIGHWAY} strokeWidth="22" />
        </g>
      </svg>
      <span aria-hidden="true" {...stylex.props(styles.mapGlow)} />
      <span aria-hidden="true" {...stylex.props(styles.mapPulse)} />
      <span aria-hidden="true" {...stylex.props(styles.mapPin)}>
        <span {...stylex.props(styles.mapPinLabel)}>{VISIT_LOCATION.pinLabel}</span>
        <span {...stylex.props(styles.mapPinHead)}>
          <span {...stylex.props(styles.mapPinDot)} />
        </span>
      </span>
    </>
  );
}

function Visit() {
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(VISIT_LOCATION.address);
      toast("地址已复制", { description: VISIT_LOCATION.address });
    } catch {
      toast("复制失败，请手动复制", { description: VISIT_LOCATION.address });
    }
  };

  return (
    <section
      id="contact-visit"
      aria-labelledby="contact-visit-title"
      {...stylex.props(styles.section, styles.visitSection, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120)}>
        <SectionHead
          eyebrow={VISIT_INTRO.eyebrow}
          title={VISIT_INTRO.title}
          titleId="contact-visit-title"
          lead={VISIT_INTRO.lead}
        />
        <RiseReveal delay={riseDelay(1)} sx={styles.visitStage}>
          <div {...stylex.props(styles.mapFrame)}>
            <MapPlaceholder />
          </div>
          <div {...stylex.props(styles.visitCard)}>
            <h3 {...stylex.props(styles.visitName)}>{VISIT_LOCATION.name}</h3>
            <ul {...stylex.props(styles.list, styles.visitFacts)}>
              <li {...stylex.props(styles.visitFact)}>
                <MapPin
                  size={16}
                  strokeWidth={2}
                  nonScalingStroke
                  aria-hidden="true"
                  {...stylex.props(styles.visitFactIcon)}
                />
                {VISIT_LOCATION.address}
              </li>
              <li {...stylex.props(styles.visitFact)}>
                <Clock
                  size={16}
                  strokeWidth={2}
                  nonScalingStroke
                  aria-hidden="true"
                  {...stylex.props(styles.visitFactIcon)}
                />
                {VISIT_LOCATION.hours}
              </li>
            </ul>
            <div {...stylex.props(styles.visitActions)}>
              <a
                href="#contact"
                {...stylex.props(styles.visitBook, styles.focusRing, stylex.defaultMarker())}
              >
                预约到访
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  nonScalingStroke
                  aria-hidden="true"
                  {...stylex.props(styles.submitArrow)}
                />
              </a>
              <button
                type="button"
                onClick={copyAddress}
                {...stylex.props(styles.brochureButton, styles.visitCopy, styles.focusRing)}
              >
                <Copy size={16} strokeWidth={2} nonScalingStroke aria-hidden="true" />
                复制地址
              </button>
            </div>
          </div>
        </RiseReveal>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li {...stylex.props(styles.faqItem)}>
      <details
        name="contact-faq"
        onToggle={(event) => setOpen(event.currentTarget.open)}
        {...stylex.props(stylex.defaultMarker())}
      >
        <summary {...stylex.props(styles.faqSummary)}>
          {question}
          <span aria-hidden="true" {...stylex.props(styles.faqIcon, open && styles.faqIconOpen)}>
            <Plus size={16} strokeWidth={2.5} nonScalingStroke />
          </span>
        </summary>
        <p {...stylex.props(styles.faqAnswer)}>{answer}</p>
      </details>
    </li>
  );
}

function Faq() {
  return (
    <section
      id="contact-faq"
      aria-labelledby="contact-faq-title"
      {...stylex.props(styles.section, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120, styles.faqLayout)}>
        <SectionHead
          eyebrow={CONTACT_FAQ_INTRO.eyebrow}
          title={CONTACT_FAQ_INTRO.title}
          titleId="contact-faq-title"
          lead={
            <>
              没有找到答案？欢迎致电{" "}
              <a href="tel:+862584218888" {...stylex.props(styles.faqPhone, styles.focusRing)}>
                025-8421 8888
              </a>
              ，或直接在上方提交需求。
            </>
          }
        />
        <RiseReveal delay={riseDelay(1)}>
          <ul {...stylex.props(styles.list, styles.faqList)}>
            {CONTACT_FAQ.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </ul>
        </RiseReveal>
      </div>
    </section>
  );
}

export function ContactView({ onNavigateHome }: { onNavigateHome: (target?: string) => void }) {
  return (
    <div id="contact-top" lang="zh-CN" {...stylex.props(styles.root)}>
      <Banner />
      <SubNav onNavigateHome={onNavigateHome} />
      <Inquiry />
      <Visit />
      <Faq />
      <Flow>
        <ContactCta actions={[{ label: "在线咨询", href: "#contact" }]} />
      </Flow>
    </div>
  );
}
