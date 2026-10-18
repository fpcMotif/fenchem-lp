import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  MapPin,
  Plus,
} from "@fenchem-lp/ui/components/lucide";
import { AnimatePresence, m } from "@/compat/motion";
import type { JSX } from "@solidjs/web";
import { createSignal, onSettled, Show } from "solid-js";
import { toast } from "@fenchem-lp/ui/components/sonner";

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
import { SubPageBanner, SubPageNav, kitStyles } from "./subpage-kit";
import { color, ease, font, layout, media } from "./tokens.stylex";

const HAIRLINE = "rgba(26, 26, 26, 0.14)";
const FIELD_BORDER = "#8a93a3";
const TINT = "#f3f5fa";
const BLUE_TINT = "#e6ecf7";
const BLUE_WASH = "#f2f6fd";
const CHIP_BG = "#f3f4f6";
const REQUIRED_MARK = "#b91c1c";
const MAP_LAND = "#eef1f5";
const MAP_BLOCK = "#e3e8ef";
const MAP_PARK = "#dce9d8";
const MAP_WATER = "#cbdaf1";
const MAP_ROAD = "#ffffff";
const MAP_ROAD_CASING = "#d6dde7";
const MAP_HIGHWAY = "#f2d896";
const MAP_HIGHWAY_CASING = "#e0bf72";
const MAP_SHADOW = "0 18px 40px -18px rgba(11, 42, 92, 0.35)";

const DESKTOP = "@media (min-width: 1280px)";
const HOVER = "@media (hover: hover)";

const RISE_STAGGER = 0.06;
const RISE_MAX_STEPS = 3;
const riseDelay = (index: number) => Math.min(index, RISE_MAX_STEPS) * RISE_STAGGER;
const indexLabel = (index: number) => String(index + 1).padStart(2, "0");

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
    fontFamily: font.display,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.brandBlue700,
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: color.ink,
    textWrap: "balance",
  },
  sectionLead: {
    margin: 0,
    marginTop: 14,
    maxWidth: "36em",
    fontSize: { default: 15, [DESKTOP]: 16 },
    lineHeight: 1.8,
    letterSpacing: "0.03em",
    color: color.bodyText,
    textWrap: "pretty",
  },

  inquiryLayout: {
    display: "grid",
    gridTemplateColumns: {
      default: "1fr",
      ["@media (min-width: 1024px)"]: "minmax(0, 0.82fr) minmax(0, 1.18fr)",
    },
    gap: { default: 48, [DESKTOP]: 96 },
    alignItems: "start",
  },
  inquiryAside: {
    position: { default: "static", ["@media (min-width: 1024px)"]: "sticky" },
    top: `calc(${layout.headerHeight} + ${layout.subBarHeight} + 40px)`,
  },
  details: {
    margin: 0,
    borderTopWidth: 2,
    borderTopStyle: "solid",
    borderTopColor: color.ink,
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
    color: color.muted,
  },
  detailValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.01em",
    fontVariantNumeric: "tabular-nums",
    color: color.ink,
    overflowWrap: "break-word",
  },
  detailLink: {
    color: { default: color.ink, ":hover": { default: null, [HOVER]: colors.brandBlue700 } },
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
    color: color.bodyText,
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
    padding: { default: "32px 20px", ["@media (min-width: 768px)"]: 40, [DESKTOP]: 48 },
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
    borderColor: { default: FIELD_BORDER, ":hover": { default: null, [HOVER]: color.ink } },
    backgroundColor: colors.paper,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.02em",
    color: color.ink,
    whiteSpace: "nowrap",
    cursor: "pointer",
    userSelect: "none",
    transform: {
      default: null,
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
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
    gridTemplateColumns: {
      default: "1fr",
      ["@media (min-width: 768px)"]: "repeat(2, minmax(0, 1fr))",
    },
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
    color: color.ink,
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
      ":hover": { default: null, [HOVER]: color.ink },
      ":focus-visible": colors.brandBlue700,
    },
    borderRadius: 0,
    backgroundColor: colors.paper,
    fontFamily: "inherit",
    fontSize: 15,
    color: color.ink,
    transitionProperty: "border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 1,
    outlineColor: colors.brandBlue700,
    outlineOffset: 0,
    "::placeholder": { color: color.muted },
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
    flexDirection: { default: "column", ["@media (min-width: 768px)"]: "row" },
    alignItems: { default: "stretch", ["@media (min-width: 768px)"]: "center" },
    justifyContent: "space-between",
    gap: { default: 20, ["@media (min-width: 768px)"]: 32 },
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
    maxWidth: { default: "none", ["@media (min-width: 768px)"]: "26em" },
    fontSize: 13,
    lineHeight: 1.7,
    color: color.bodyText,
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
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
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
    transitionTimingFunction: ease.out,
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
    color: color.ink,
    outlineStyle: "none",
    scrollMarginTop: `calc(${layout.headerHeight} + ${layout.subBarHeight} + 24px)`,
  },
  doneText: {
    margin: 0,
    maxWidth: "32em",
    fontSize: 15,
    lineHeight: 1.8,
    color: color.bodyText,
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
    color: color.ink,
  },
  doneStepIndex: {
    flexShrink: 0,
    width: 24,
    fontFamily: font.display,
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
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
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
    aspectRatio: {
      default: "4 / 3",
      ["@media (min-width: 768px)"]: "16 / 9",
      ["@media (min-width: 1024px)"]: "2 / 1",
    },
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
    opacity: { default: 0.5, ["@media (prefers-reduced-motion: no-preference)"]: 0 },
    animationName: { default: null, ["@media (prefers-reduced-motion: no-preference)"]: pinPulse },
    animationDuration: "2400ms",
    animationTimingFunction: ease.out,
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
    color: color.ink,
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
    position: { default: "static", ["@media (min-width: 1024px)"]: "absolute" },
    top: 24,
    left: 24,
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    boxSizing: "border-box",
    width: { default: "100%", ["@media (min-width: 1024px)"]: 380 },
    padding: { default: 24, [DESKTOP]: 28 },
    backgroundColor: colors.paper,
    boxShadow: { default: "none", ["@media (min-width: 1024px)"]: MAP_SHADOW },
  },
  visitName: {
    margin: 0,
    fontSize: { default: 17, [DESKTOP]: 18 },
    fontWeight: 700,
    lineHeight: 1.4,
    color: color.ink,
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
    color: color.bodyText,
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
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
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
      ["@media (min-width: 1024px)"]: "minmax(0, 0.82fr) minmax(0, 1.18fr)",
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
    borderTopColor: color.ink,
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
    color: { default: color.ink, ":hover": { default: null, [HOVER]: colors.brandBlue700 } },
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
    color: color.ink,
    transitionProperty: "transform, background-color, color",
    transitionDuration: {
      default: "0s",
      ["@media (prefers-reduced-motion: no-preference)"]: "200ms",
    },
    transitionTimingFunction: ease.out,
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
    paddingInlineEnd: { default: 0, ["@media (min-width: 768px)"]: 56 },
    fontSize: 15,
    lineHeight: 1.9,
    color: color.bodyText,
    textWrap: "pretty",
    animationName: {
      default: null,
      [stylex.when.ancestor(":open")]: {
        default: answerFade,
        ["@media (prefers-reduced-motion: no-preference)"]: answerRise,
      },
    },
    animationDuration: "200ms",
    animationTimingFunction: ease.out,
  },
});

function SectionHead(props: {
  eyebrow: string;
  title: string;
  titleId: string;
  lead?: JSX.Element;
  tight?: boolean;
}) {
  return (
    <RiseReveal sx={[styles.sectionHead, props.tight && styles.sectionHeadTight]}>
      <p lang="en" {...stylex.attrs(styles.sectionEyebrow)}>
        {props.eyebrow}
      </p>
      <h2 id={props.titleId} {...stylex.attrs(styles.sectionTitle)}>
        {props.title}
      </h2>
      <Show when={props.lead}>
        {(lead) => <p {...stylex.attrs(styles.sectionLead)}>{lead()}</p>}
      </Show>
    </RiseReveal>
  );
}

function Field(props: {
  id: string;
  label: string;
  required?: boolean;
  full?: boolean;
  children: JSX.Element;
}) {
  return (
    <div {...stylex.attrs(styles.field, props.full && styles.fieldFull)}>
      <label for={props.id} {...stylex.attrs(styles.label)}>
        {props.label}
        <Show when={props.required}>
          <span aria-hidden="true" {...stylex.attrs(styles.requiredMark)}>
            *
          </span>
        </Show>
      </label>
      {props.children}
    </div>
  );
}

// The swapped-in panel mounts before AnimatePresence inserts it, so focus waits for insertion.
const focusWhenConnected = (node: HTMLElement | undefined, frames = 60) => {
  if (!node) return;
  if (node.isConnected) node.focus();
  else if (frames > 0) requestAnimationFrame(() => focusWhenConnected(node, frames - 1));
};

function InquiryFields(props: {
  subjectId: InquirySubjectId;
  onSubjectChange: (id: InquirySubjectId) => void;
  onSubmit: () => void;
  focusOnMount: boolean;
}) {
  let nameInput: HTMLInputElement | undefined;
  const subject = () =>
    INQUIRY_SUBJECTS.find((item) => item.id === props.subjectId) ?? INQUIRY_SUBJECTS[0];

  onSettled(() => {
    if (props.focusOnMount) focusWhenConnected(nameInput);
  });

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <form method="post" onSubmit={handleSubmit} {...stylex.attrs(styles.form)}>
      <fieldset {...stylex.attrs(styles.fieldset)}>
        <legend {...stylex.attrs(styles.label, styles.legend)}>咨询主题</legend>
        <div {...stylex.attrs(styles.subjectList)}>
          {INQUIRY_SUBJECTS.map((item) => {
            const isActive = () => item.id === props.subjectId;
            return (
              <label {...stylex.attrs(styles.subjectOption)}>
                <input
                  type="radio"
                  name="subject"
                  value={item.id}
                  checked={isActive()}
                  onChange={() => props.onSubjectChange(item.id)}
                  {...stylex.attrs(styles.srOnly, stylex.defaultMarker())}
                />
                <span {...stylex.attrs(styles.subjectChip, isActive() && styles.subjectChipActive)}>
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div {...stylex.attrs(styles.fieldGrid)}>
        <Field id="contact-name" label="联系人姓名" required>
          <input
            ref={nameInput}
            id="contact-name"
            name="contactName"
            required
            autocomplete="name"
            {...stylex.attrs(styles.input)}
          />
        </Field>
        <Field id="contact-role" label="职务">
          <input
            id="contact-role"
            name="jobTitle"
            autocomplete="organization-title"
            placeholder="如：配方工程师、采购经理"
            {...stylex.attrs(styles.input)}
          />
        </Field>
        <Field id="contact-phone" label="手机号" required>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            autocomplete="tel"
            inputmode="tel"
            placeholder="用于物流通知与技术对接"
            {...stylex.attrs(styles.input)}
          />
        </Field>
        <Field id="contact-email" label="工作邮箱" required>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autocomplete="email"
            spellcheck={false}
            placeholder="name@company.com"
            {...stylex.attrs(styles.input)}
          />
        </Field>
        <Field id="contact-company" label="公司或机构名称" required full>
          <input
            id="contact-company"
            name="company"
            required
            autocomplete="organization"
            placeholder="品牌方、代工厂或研发机构全称"
            {...stylex.attrs(styles.input)}
          />
        </Field>
        <Field id="contact-message" label="需求描述" required full>
          <textarea
            id="contact-message"
            name="message"
            required
            placeholder={subject().placeholder}
            {...stylex.attrs(styles.input, styles.textarea)}
          />
        </Field>
      </div>

      <div {...stylex.attrs(styles.formFooter)}>
        <label {...stylex.attrs(styles.consent)}>
          <input type="checkbox" name="consent" required {...stylex.attrs(styles.checkbox)} />
          <span>我同意泛成就本次咨询与我联系。您提交的配方信息将严格保密。</span>
        </label>
        <button
          type="submit"
          {...stylex.attrs(styles.submit, kitStyles.focusRing, stylex.defaultMarker())}
        >
          提交
          <ArrowRight
            size={18}
            strokeWidth={2}
            nonScalingStroke
            aria-hidden="true"
            {...stylex.attrs(styles.submitArrow)}
          />
        </button>
      </div>
    </form>
  );
}

function InquirySubmitted(props: { onReset: () => void }) {
  let heading: HTMLHeadingElement | undefined;

  onSettled(() => {
    focusWhenConnected(heading);
  });

  return (
    <div role="status" {...stylex.attrs(styles.done)}>
      <CheckCircle2
        size={40}
        strokeWidth={2.5}
        nonScalingStroke
        aria-hidden="true"
        {...stylex.attrs(styles.doneIcon)}
      />
      <h3 ref={heading} tabindex={-1} {...stylex.attrs(styles.doneTitle)}>
        需求已提交
      </h3>
      <p {...stylex.attrs(styles.doneText)}>
        感谢您的咨询！专属客户经理与应用工程师将在工作日 24 小时内与您联系。
      </p>
      <ol aria-label="接下来" {...stylex.attrs(styles.list, styles.doneSteps)}>
        {NEXT_STEPS.map((step, index) => (
          <li {...stylex.attrs(styles.doneStep)}>
            <span aria-hidden="true" {...stylex.attrs(styles.doneStepIndex)}>
              {indexLabel(index)}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => props.onReset()}
        {...stylex.attrs(styles.againButton, kitStyles.focusRing)}
      >
        提交另一条需求
      </button>
    </div>
  );
}

function InquiryForm() {
  const [subjectId, setSubjectId] = createSignal<InquirySubjectId>(INQUIRY_SUBJECTS[0].id);
  const [submitted, setSubmitted] = createSignal(false);
  const [returning, setReturning] = createSignal(false);
  const [lockedHeight, setLockedHeight] = createSignal(0);
  let frame: HTMLDivElement | undefined;
  const reduce = useReducedMotion();

  const offset = (px: number) =>
    reduce() ? {} : { transform: `translateY(${px}px)`, filter: "blur(4px)" };

  return (
    <div
      ref={frame}
      {...stylex.attrs(styles.swapFrame, submitted() && dynamic.minHeight(lockedHeight()))}
    >
      <AnimatePresence mode="wait" initial={false}>
        <Show when={submitted() ? "submitted" : "form"} keyed>
          {(state) => (
            <m.div
              initial={{ opacity: 0, ...offset(12) }}
              animate={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                ...offset(-12),
                transition: { duration: 0.15, ease: "easeOut" },
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              {...stylex.attrs(styles.swapItem)}
            >
              {state === "submitted" ? (
                <InquirySubmitted
                  onReset={() => {
                    setReturning(true);
                    setSubmitted(false);
                  }}
                />
              ) : (
                <InquiryFields
                  subjectId={subjectId()}
                  onSubjectChange={(id) => setSubjectId(id)}
                  onSubmit={() => {
                    setLockedHeight(frame?.offsetHeight ?? 0);
                    setSubmitted(true);
                  }}
                  focusOnMount={returning()}
                />
              )}
            </m.div>
          )}
        </Show>
      </AnimatePresence>
    </div>
  );
}

function Inquiry() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-inquiry-title"
      {...stylex.attrs(kitStyles.section, kitStyles.anchor)}
    >
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.inquiryLayout)}>
        <div {...stylex.attrs(styles.inquiryAside)}>
          <SectionHead
            eyebrow={INQUIRY_INTRO.eyebrow}
            title={INQUIRY_INTRO.title}
            titleId="contact-inquiry-title"
            lead={INQUIRY_INTRO.lead}
            tight
          />
          <RiseReveal delay={riseDelay(1)}>
            <dl {...stylex.attrs(styles.details)}>
              {CONTACT_DETAILS.map((detail) => (
                <div {...stylex.attrs(styles.detailRow)}>
                  <dt {...stylex.attrs(styles.detailTerm)}>{detail.term}</dt>
                  <dd {...stylex.attrs(styles.detailValue)}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        {...stylex.attrs(styles.detailLink, kitStyles.focusRing)}
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <ul aria-label="服务承诺" {...stylex.attrs(styles.list, styles.promises)}>
              {SERVICE_PROMISES.map((promise) => (
                <li {...stylex.attrs(styles.promise)}>
                  <Check
                    size={16}
                    strokeWidth={2}
                    nonScalingStroke
                    aria-hidden="true"
                    {...stylex.attrs(styles.promiseIcon)}
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
              {...stylex.attrs(styles.brochureButton, kitStyles.focusRing)}
            >
              <Download size={16} strokeWidth={2} nonScalingStroke aria-hidden="true" />
              {INQUIRY_INTRO.brochureLabel}
            </button>
          </RiseReveal>
        </div>
        <div {...stylex.attrs(styles.formPanel)}>
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
        {...stylex.attrs(styles.fill)}
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
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M110 -10C150 120 60 220 140 330C210 430 380 470 440 610"
            stroke={MAP_WATER}
            stroke-width="30"
          />
          <g stroke={MAP_ROAD_CASING}>
            <path d="M-10 262C200 250 380 300 520 380C640 450 760 462 1210 422" stroke-width="13" />
            <path d="M820 -10L862 610" stroke-width="13" />
            <path d="M985 -10C960 200 1012 400 1000 610" stroke-width="13" />
            <path d="M520 380L560 610" stroke-width="13" />
            <path d="M300 -10C380 160 470 262 600 300C760 350 980 330 1210 298" stroke-width="20" />
          </g>
          <g stroke={MAP_ROAD}>
            <path d="M-10 262C200 250 380 300 520 380C640 450 760 462 1210 422" stroke-width="9" />
            <path d="M820 -10L862 610" stroke-width="9" />
            <path d="M985 -10C960 200 1012 400 1000 610" stroke-width="9" />
            <path d="M520 380L560 610" stroke-width="9" />
            <path d="M300 -10C380 160 470 262 600 300C760 350 980 330 1210 298" stroke-width="15" />
          </g>
          <path
            d="M540 -10C610 180 700 380 770 610"
            stroke={MAP_HIGHWAY_CASING}
            stroke-width="28"
          />
          <path d="M540 -10C610 180 700 380 770 610" stroke={MAP_HIGHWAY} stroke-width="22" />
        </g>
      </svg>
      <span aria-hidden="true" {...stylex.attrs(styles.mapGlow)} />
      <span aria-hidden="true" {...stylex.attrs(styles.mapPulse)} />
      <span aria-hidden="true" {...stylex.attrs(styles.mapPin)}>
        <span {...stylex.attrs(styles.mapPinLabel)}>{VISIT_LOCATION.pinLabel}</span>
        <span {...stylex.attrs(styles.mapPinHead)}>
          <span {...stylex.attrs(styles.mapPinDot)} />
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
      {...stylex.attrs(kitStyles.section, styles.visitSection, kitStyles.anchor)}
    >
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
        <SectionHead
          eyebrow={VISIT_INTRO.eyebrow}
          title={VISIT_INTRO.title}
          titleId="contact-visit-title"
          lead={VISIT_INTRO.lead}
        />
        <RiseReveal delay={riseDelay(1)} sx={styles.visitStage}>
          <div {...stylex.attrs(styles.mapFrame)}>
            <MapPlaceholder />
          </div>
          <div {...stylex.attrs(styles.visitCard)}>
            <h3 {...stylex.attrs(styles.visitName)}>{VISIT_LOCATION.name}</h3>
            <ul {...stylex.attrs(styles.list, styles.visitFacts)}>
              <li {...stylex.attrs(styles.visitFact)}>
                <MapPin
                  size={16}
                  strokeWidth={2}
                  nonScalingStroke
                  aria-hidden="true"
                  {...stylex.attrs(styles.visitFactIcon)}
                />
                {VISIT_LOCATION.address}
              </li>
            </ul>
            <div {...stylex.attrs(styles.visitActions)}>
              <a
                href="#contact"
                {...stylex.attrs(styles.visitBook, kitStyles.focusRing, stylex.defaultMarker())}
              >
                预约到访
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  nonScalingStroke
                  aria-hidden="true"
                  {...stylex.attrs(styles.submitArrow)}
                />
              </a>
              <button
                type="button"
                onClick={() => void copyAddress()}
                {...stylex.attrs(styles.brochureButton, styles.visitCopy, kitStyles.focusRing)}
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

function FaqItem(props: { question: string; answer: string }) {
  const [open, setOpen] = createSignal(false);
  return (
    <li {...stylex.attrs(styles.faqItem)}>
      <details
        name="contact-faq"
        onToggle={(event) => setOpen(event.currentTarget.open)}
        {...stylex.attrs(stylex.defaultMarker())}
      >
        <summary {...stylex.attrs(styles.faqSummary)}>
          {props.question}
          <span aria-hidden="true" {...stylex.attrs(styles.faqIcon, open() && styles.faqIconOpen)}>
            <Plus size={16} strokeWidth={2.5} nonScalingStroke />
          </span>
        </summary>
        <p {...stylex.attrs(styles.faqAnswer)}>{props.answer}</p>
      </details>
    </li>
  );
}

function Faq() {
  return (
    <section
      id="contact-faq"
      aria-labelledby="contact-faq-title"
      {...stylex.attrs(kitStyles.section, kitStyles.anchor)}
    >
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.faqLayout)}>
        <SectionHead
          eyebrow={CONTACT_FAQ_INTRO.eyebrow}
          title={CONTACT_FAQ_INTRO.title}
          titleId="contact-faq-title"
          lead={
            <>
              没有找到答案？欢迎致电{" "}
              <a href="tel:+862584218888" {...stylex.attrs(styles.faqPhone, kitStyles.focusRing)}>
                025-8421 8888
              </a>
              ，或直接在上方提交需求。
            </>
          }
        />
        <RiseReveal delay={riseDelay(1)}>
          <ul {...stylex.attrs(styles.list, styles.faqList)}>
            {CONTACT_FAQ.map((item) => (
              <FaqItem question={item.question} answer={item.answer} />
            ))}
          </ul>
        </RiseReveal>
      </div>
    </section>
  );
}

export function ContactView(props: { onNavigateHome: (target?: string) => void }) {
  return (
    <div id="contact-top" lang="zh-CN" {...stylex.attrs(kitStyles.root)}>
      <SubPageBanner
        size="compact"
        title={CONTACT_BANNER.title}
        titleId="contact-banner-title"
        tagline={CONTACT_BANNER.tagline}
        lead={CONTACT_BANNER.lead}
        meta={CONTACT_BANNER.meta}
        image={CONTACT_BANNER.image}
        imageAlt={CONTACT_BANNER.imageAlt}
      />
      <SubPageNav
        current={CONTACT_BANNER.title}
        chips={CONTACT_NAV_CHIPS}
        chipsLabel="本页导航"
        onNavigateHome={props.onNavigateHome}
      />
      <Inquiry />
      <Visit />
      <Faq />
      <Flow>
        <ContactCta actions={[{ label: "在线咨询", href: "#contact" }]} />
      </Flow>
    </div>
  );
}
