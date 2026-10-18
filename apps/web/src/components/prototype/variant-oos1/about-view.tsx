import { LightboxStage } from "../shared/lightbox-stage";
import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import {
  ChevronLeft,
  ChevronRight,
  Factory,
  Leaf,
  Recycle,
  X,
} from "@fenchem-lp/ui/components/lucide";
import { m, useScroll, useTransform } from "@/compat/motion";
import { createEffect, createMemo, createSignal, Show } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_BANNER, ABOUT_CAMPUS, ABOUT_CSR, ABOUT_HERO, ABOUT_HISTORY } from "./about-data";
import { CampusCarousel } from "./campus-carousel";
import { CAMPUS_GALLERY } from "./campus-gallery";
import { ContactCta } from "./contact-cta";
import { CTA } from "./content";
import { CultureScenes } from "./culture-scenes";
import { HistoryTimeline } from "./history-timeline";
import { Reveal, SubPageBanner, SubPageNav, kitStyles } from "./subpage-kit";
import { color, ease, font, layout, media, texture } from "./tokens.stylex";
import { Profile as ProfileOOS1G } from "./abouts/oos1g/profile";
import { NavyBand } from "./abouts/oos1c/navy-band";

const CSR_ACCENT = "#8cd6a3";
const DESKTOP = "@media (min-width: 1280px)";

const STICKY_TOP = Number.parseFloat(layout.headerHeight) + Number.parseFloat(layout.subBarHeight);

const [PROFILE_CHIP, ...LATER_CHIPS] = ABOUT_HERO.navChips;
const NAV_CHIPS = [PROFILE_CHIP, ABOUT_HISTORY.navChip, ...LATER_CHIPS];

const CSR_ICONS = {
  factory: Factory,
  recycle: Recycle,
  leaf: Leaf,
} as const;

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const zoomIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "scale(0.96)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  root: {
    backgroundColor: "#f3f5fa",
    color: color.ink,
    fontFamily: font.body,
  },
  grain: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: texture.grain,
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

  sectionHeader: {
    marginBottom: { default: 40, [DESKTOP]: 64 },
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
    animationTimingFunction: ease.out,
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
    padding: { default: "64px 12px", ["@media (min-width: 768px)"]: "72px 104px" },
  },
  lightboxFigure: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    margin: 0,
    maxWidth: "100%",
    animationTimingFunction: ease.out,
  },
  lightboxFigureOpen: {
    animationName: { default: fadeIn, ["@media (prefers-reduced-motion: no-preference)"]: zoomIn },
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
      ":active": {
        default: null,
        ["@media (prefers-reduced-motion: no-preference)"]: "scale(0.96)",
      },
    },
    transitionProperty: "background-color, transform",
    transitionDuration: "160ms",
    transitionTimingFunction: ease.out,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.paper,
    outlineOffset: 2,
  },
  lightboxPrev: {
    top: "50%",
    insetInlineStart: { default: 12, ["@media (min-width: 768px)"]: 32 },
    marginTop: -24,
  },
  lightboxNext: {
    top: "50%",
    insetInlineEnd: { default: 12, ["@media (min-width: 768px)"]: 32 },
    marginTop: -24,
  },
  lightboxClose: {
    top: { default: 12, ["@media (min-width: 768px)"]: 24 },
    insetInlineEnd: { default: 12, ["@media (min-width: 768px)"]: 32 },
  },

  csrSection: {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    paddingTop: { default: 260, [media.tablet]: 340, [DESKTOP]: 420 },
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
    fontSize: { default: 28, [media.tablet]: 40, [DESKTOP]: 52 },
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
    gridTemplateColumns: {
      default: "1fr",
      ["@media (min-width: 768px)"]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 40,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  csrOutcome: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    paddingBlock: { default: 18, ["@media (min-width: 768px)"]: 24 },
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

function SectionHeader(props: {
  eyebrow?: string;
  title: string;
  titleId: string;
  sx?: stylex.StyleXStyles;
}) {
  return (
    <Reveal sx={[styles.sectionHeader, props.sx]}>
      <Show when={props.eyebrow}>
        {(eyebrow) => (
          <p lang="en" {...stylex.attrs(styles.sectionEyebrow)}>
            {eyebrow()}
          </p>
        )}
      </Show>
      <h2 id={props.titleId} {...stylex.attrs(styles.sectionTitle)}>
        {props.title}
      </h2>
    </Reveal>
  );
}

function Lightbox(props: {
  index: number | null;
  stepped: boolean;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  let dialog: HTMLDialogElement | undefined;
  const photos = CAMPUS_GALLERY;
  const photo = createMemo(() => (props.index === null ? undefined : photos[props.index]));

  createEffect(
    () => props.index,
    (index) => {
      if (!dialog) return;
      if (index !== null && !dialog.open) dialog.showModal();
      if (index === null && dialog.open) dialog.close();
      if (index === null) return;
      for (const delta of [1, -1]) {
        const neighbor = new Image();
        neighbor.src = photos[(index + delta + photos.length) % photos.length].image;
      }
    },
  );

  return (
    <dialog
      ref={dialog}
      aria-label="Campus photos"
      onClose={() => props.onClose()}
      onKeyDown={(event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        event.stopPropagation();
        props.onStep(event.key === "ArrowRight" ? 1 : -1);
      }}
      {...stylex.attrs(styles.lightbox)}
    >
      <Show when={photo()}>
        {(current) => (
          <>
            <LightboxStage onClose={() => props.onClose()} sx={styles.lightboxStage}>
              <figure
                {...stylex.attrs(
                  styles.lightboxFigure,
                  props.stepped ? styles.lightboxFigureStep : styles.lightboxFigureOpen,
                )}
              >
                <img
                  src={current().image}
                  alt={current().alt}
                  {...stylex.attrs(styles.lightboxImage)}
                />
                <figcaption {...stylex.attrs(styles.lightboxCaption)}>
                  {current().caption}
                </figcaption>
              </figure>
            </LightboxStage>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => props.onStep(-1)}
              {...stylex.attrs(styles.lightboxButton, styles.lightboxPrev)}
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => props.onStep(1)}
              {...stylex.attrs(styles.lightboxButton, styles.lightboxNext)}
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={() => props.onClose()}
              {...stylex.attrs(styles.lightboxButton, styles.lightboxClose)}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </>
        )}
      </Show>
    </dialog>
  );
}

export function CampusGallery(props: { showEyebrow?: boolean; headerSx?: stylex.StyleXStyles }) {
  const [openIndex, setOpenIndex] = createSignal<number | null>(null);
  const [stepped, setStepped] = createSignal(false);
  const count = CAMPUS_GALLERY.length;
  const open = (index: number) => {
    setStepped(false);
    setOpenIndex(index);
  };

  return (
    <section
      id="about-campus"
      aria-labelledby="about-campus-title"
      {...stylex.attrs(styles.campusSection, kitStyles.anchor)}
    >
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
        <SectionHeader
          eyebrow={(props.showEyebrow ?? true) ? ABOUT_CAMPUS.eyebrow : undefined}
          title={ABOUT_CAMPUS.title}
          titleId="about-campus-title"
          sx={props.headerSx}
        />
      </div>
      <CampusCarousel paused={openIndex() !== null} onOpen={open} />
      <Lightbox
        index={openIndex()}
        stepped={stepped()}
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
  let section: HTMLElement | undefined;
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: () => section,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={section}
      id="about-csr"
      aria-labelledby="about-csr-title"
      {...stylex.attrs(styles.csrSection, kitStyles.anchor)}
    >
      <m.div {...stylex.attrs(styles.csrMedia)} style={reduce() ? undefined : { y: drift }}>
        <img
          src={ABOUT_CSR.image}
          alt={ABOUT_CSR.imageAlt}
          loading="lazy"
          decoding="async"
          {...stylex.attrs(styles.csrImage)}
        />
      </m.div>
      <div aria-hidden="true" {...stylex.attrs(styles.fill, styles.csrScrim)} />
      <div aria-hidden="true" {...stylex.attrs(styles.grain, styles.behind)} />
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.csrInner)}>
        <Reveal sx={styles.csrHead}>
          <div>
            <h2 id="about-csr-title" {...stylex.attrs(styles.csrTitle)}>
              {ABOUT_CSR.title}
            </h2>
            <p {...stylex.attrs(styles.csrStatement)}>
              {ABOUT_CSR.statement.map((line) => (
                <span {...stylex.attrs(styles.csrStatementLine)}>{line}</span>
              ))}
            </p>
          </div>
          <p {...stylex.attrs(styles.csrDesc)}>{ABOUT_CSR.desc}</p>
        </Reveal>
        <ul {...stylex.attrs(styles.csrOutcomes)}>
          {ABOUT_CSR.outcomes.map((outcome, idx) => {
            const Icon = CSR_ICONS[outcome.icon];
            return (
              <Reveal as="li" step={idx} sx={styles.csrOutcome}>
                <Icon
                  size={22}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  {...stylex.attrs(styles.csrOutcomeIcon)}
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

export function AboutView(props: { onNavigateHome: (hash?: string) => void }) {
  return (
    <div id="about-top" {...stylex.attrs(styles.root)}>
      <SubPageBanner
        size="tall"
        title={ABOUT_BANNER.title}
        titleId="about-banner-title"
        tagline={ABOUT_BANNER.tagline}
        lead={ABOUT_BANNER.lead}
        meta={[ABOUT_BANNER.established, ABOUT_BANNER.place]}
        image={ABOUT_BANNER.image}
        imageAlt={ABOUT_BANNER.alt}
      />

      <SubPageNav current="关于我们" chips={NAV_CHIPS} onNavigateHome={props.onNavigateHome} />

      <ProfileOOS1G />

      <HistoryTimeline stickyTop={STICKY_TOP} sx={kitStyles.anchor} />

      <CampusGallery />

      <CultureScenes sx={kitStyles.anchor} />

      <CsrSection />

      <NavyBand />

      <ContactCta
        actions={[
          { label: CTA.action.label, onClick: () => props.onNavigateHome("contact") },
          {
            label: "产品与应用",
            tone: "secondary",
            onClick: () => props.onNavigateHome("products"),
          },
        ]}
      />
    </div>
  );
}
