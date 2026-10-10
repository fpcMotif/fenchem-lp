import { LightboxStage } from "../shared/lightbox-stage";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, Factory, Leaf, Recycle, X } from "lucide-react";
import { m, useInView, useScroll, useTransform } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_BANNER, ABOUT_CAMPUS, ABOUT_CSR, ABOUT_HERO, ABOUT_HISTORY } from "./about-data";
import { CampusCarousel } from "./campus-carousel";
import { CAMPUS_GALLERY } from "./campus-gallery";
import { ContactCta } from "./contact-cta";
import { CTA } from "./content";
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
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

const INSET_120 = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const SUB_BAR_HEIGHT = 64;
const REVEAL_STEP_MS = 70;
const REVEAL_MAX_STEPS = 5;

const [PROFILE_CHIP, ...LATER_CHIPS] = ABOUT_HERO.navChips;
const NAV_CHIPS = [PROFILE_CHIP, ABOUT_HISTORY.navChip, ...LATER_CHIPS];
const SECTION_IDS = NAV_CHIPS.map((chip) => chip.id);

const revealDelay = (index: number) => Math.min(index, REVEAL_MAX_STEPS) * REVEAL_STEP_MS;

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
  inset120: {
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_120 },
  },
  anchor: {
    scrollMarginTop: HEADER_HEIGHT + SUB_BAR_HEIGHT + 24,
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
  chipLead: {
    marginInlineStart: { default: 0, [breakpoints.lg]: "auto" },
  },
  chipActive: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: { default: colors.paper, ":hover": colors.paper },
    boxShadow: "0 4px 12px -2px rgba(29, 78, 216, 0.32)",
  },

  sectionHeader: {
    marginBottom: { default: 40, [DESKTOP]: 64 },
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

  campusSection: {
    paddingBlock: { default: 72, [DESKTOP]: 128 },
    backgroundColor: colors.paper,
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

function SectionHeader({
  eyebrow,
  title,
  titleId,
}: {
  eyebrow: string;
  title: string;
  titleId: string;
}) {
  return (
    <Reveal sx={styles.sectionHeader}>
      <p lang="en" {...stylex.props(styles.sectionEyebrow)}>
        {eyebrow}
      </p>
      <h2 id={titleId} {...stylex.props(styles.sectionTitle)}>
        {title}
      </h2>
    </Reveal>
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
  const photos = CAMPUS_GALLERY;
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
      neighbor.src = photos[(index + delta + photos.length) % photos.length].image;
    }
  }, [index, photos]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Campus photos"
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
          <LightboxStage onClose={onClose} sx={styles.lightboxStage}>
            <figure
              key={photo.id}
              {...stylex.props(
                styles.lightboxFigure,
                stepped ? styles.lightboxFigureStep : styles.lightboxFigureOpen,
              )}
            >
              <img src={photo.image} alt={photo.alt} {...stylex.props(styles.lightboxImage)} />
              <figcaption {...stylex.props(styles.lightboxCaption)}>{photo.caption}</figcaption>
            </figure>
          </LightboxStage>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => onStep(-1)}
            {...stylex.props(styles.lightboxButton, styles.lightboxPrev)}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => onStep(1)}
            {...stylex.props(styles.lightboxButton, styles.lightboxNext)}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Close"
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
  const count = CAMPUS_GALLERY.length;
  const open = (index: number) => {
    setStepped(false);
    setOpenIndex(index);
  };

  return (
    <section
      id="about-campus"
      aria-labelledby="about-campus-title"
      {...stylex.props(styles.campusSection, styles.anchor)}
    >
      <div {...stylex.props(styles.shell, styles.inset120)}>
        <SectionHeader
          eyebrow={ABOUT_CAMPUS.eyebrow}
          title={ABOUT_CAMPUS.title}
          titleId="about-campus-title"
        />
      </div>
      <CampusCarousel paused={openIndex !== null} onOpen={open} />
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
      <div {...stylex.props(styles.shell, styles.inset120, styles.csrInner)}>
        <Reveal sx={styles.csrHead}>
          <div>
            <h2 id="about-csr-title" {...stylex.props(styles.csrTitle)}>
              {ABOUT_CSR.title}
            </h2>
            <p {...stylex.props(styles.csrStatement)}>
              {ABOUT_CSR.statement.map((line) => (
                <span key={line} {...stylex.props(styles.csrStatementLine)}>
                  {line}
                </span>
              ))}
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
      <div {...stylex.props(styles.shell, styles.inset120, styles.subBarInner)}>
        <nav aria-label="Breadcrumb" {...stylex.props(styles.breadcrumb)}>
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
        <nav aria-label="On this page" ref={chipListRef} {...stylex.props(styles.chipList)}>
          {NAV_CHIPS.map((chip, index) => (
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
        <div {...stylex.props(styles.shell, styles.inset120, styles.bannerContent)}>
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
