import { LightboxStage } from "../shared/lightbox-stage";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_BANNER, ABOUT_CAMPUS, ABOUT_CSR, ABOUT_HERO, ABOUT_HISTORY } from "./about-data";
import { CampusCarousel } from "./campus-carousel";
import { CAMPUS_GALLERY } from "./campus-gallery";
import { ContactCta } from "./contact-cta";
import { CTA } from "./content";
import { CultureScenes } from "./culture-scenes";
import { HistoryTimeline } from "./history-timeline";
import { Reveal, SubPageNav, kitStyles } from "./subpage-kit";
import { color, ease, font, layout, media, texture } from "./tokens.stylex";
import { NavyBand } from "./abouts/oos1c/navy-band";

const CSR_ACCENT = "#8cd6a3";
const HISTORY_GRAY = "#f6f6f6";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const FRAME_TINT = "#e6ecf7";
const HERO_TITLE = "源于自然，精于科学";

const STICKY_TOP = Number.parseFloat(layout.headerHeight) + Number.parseFloat(layout.subBarHeight);

const [PROFILE_CHIP, ...LATER_CHIPS] = ABOUT_HERO.navChips;
const NAV_CHIPS = [PROFILE_CHIP, ABOUT_HISTORY.navChip, ...LATER_CHIPS];

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
  historyBand: {
    backgroundColor: HISTORY_GRAY,
  },
  hero: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    height: { default: 240, [MD]: "clamp(300px, 31vw, 480px)" },
    overflow: "hidden",
    backgroundColor: color.navyDeep,
  },
  heroImage: {
    position: "absolute",
    top: "-19.73%",
    left: "-2.17%",
    width: "104.35%",
    height: "161.43%",
    objectFit: "cover",
  },
  heroScrim: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 22.222%), linear-gradient(0deg, rgba(6, 28, 66, 0.78) 0%, rgba(6, 28, 66, 0.34) 42%, rgba(6, 28, 66, 0) 66%)",
  },
  heroContent: {
    position: "relative",
    paddingBottom: { default: 24, [MD]: 40 },
  },
  heroTitle: {
    margin: 0,
    fontSize: { default: 34, [MD]: 48, [DESKTOP]: 60 },
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "0.072em",
    textWrap: "balance",
    color: colors.paper,
  },
  heroLead: {
    margin: 0,
    marginTop: { default: 8, [MD]: 20 },
    fontSize: { default: 14, [MD]: 17 },
    lineHeight: 1.8,
    letterSpacing: "0.08em",
    textWrap: "pretty",
    color: "rgba(255, 255, 255, 0.84)",
  },
  profile: {
    paddingTop: { default: 72, [DESKTOP]: 128 },
    paddingBottom: { default: 56, [DESKTOP]: 80 },
    backgroundColor: colors.paper,
  },
  profileGrid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(2, minmax(0, 1fr))" },
    alignItems: "center",
    rowGap: 32,
    paddingInline: { default: 16, [media.tablet]: 40, [LG]: 0 },
  },
  profilePhotoCell: {
    paddingInlineStart: { default: 0, [LG]: layout.inset120 },
    paddingInlineEnd: { default: 0, [LG]: 48 },
  },
  profilePhoto: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    aspectRatio: { default: "4 / 3", [LG]: "5 / 6" },
    backgroundColor: FRAME_TINT,
  },
  profileLobby: {
    objectPosition: "28% 50%",
  },
  profileTextCell: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 24, [DESKTOP]: 48 },
    paddingInlineStart: { default: 0, [LG]: 48 },
    paddingInlineEnd: { default: 0, [LG]: layout.inset120 },
    paddingBottom: { default: 0, [LG]: 28 },
  },
  profileName: {
    margin: 0,
    maxWidth: "9em",
    fontSize: { default: 32, [media.tablet]: 40, [LG]: "clamp(36px, 3.4vw, 48px)" },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.02em",
    textWrap: "balance",
    color: color.ink,
  },
  profileEnglish: {
    margin: 0,
    marginTop: { default: 10, [DESKTOP]: 6 },
    fontSize: { default: 18, [DESKTOP]: 24 },
    fontWeight: 500,
    lineHeight: "29px",
    letterSpacing: "0.012em",
    color: color.bodyText,
  },
  profileLead: {
    margin: 0,
    maxWidth: 510,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.053em",
    textWrap: "pretty",
    color: color.ink,
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
    padding: { default: "64px 12px", [breakpoints.md]: "72px 104px" },
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
    transitionTimingFunction: ease.out,
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
});

function SectionHeader({
  title,
  titleId,
  sx,
}: {
  title: string;
  titleId: string;
  sx?: stylex.StyleXStyles;
}) {
  return (
    <Reveal sx={[styles.sectionHeader, sx]}>
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

export function CampusGallery({ headerSx }: { headerSx?: stylex.StyleXStyles }) {
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
      {...stylex.props(styles.campusSection, kitStyles.anchor)}
    >
      <div {...stylex.props(kitStyles.shell, kitStyles.inset120)}>
        <SectionHeader title={ABOUT_CAMPUS.title} titleId="about-campus-title" sx={headerSx} />
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
      {...stylex.props(styles.csrSection, kitStyles.anchor)}
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
      <div {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.csrInner)}>
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
      </div>
    </section>
  );
}

function Profile() {
  return (
    <section
      id="about-profile"
      aria-label="Company overview"
      {...stylex.props(styles.profile, kitStyles.anchor)}
    >
      <div {...stylex.props(kitStyles.shell, styles.profileGrid)}>
        <div {...stylex.props(styles.profilePhotoCell)}>
          <Reveal as="figure" sx={styles.profilePhoto}>
            <img
              src={ABOUT_HERO.lobbyImage}
              alt="Fenchem headquarters lobby with a curved ceiling and marble floor"
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.fill, styles.profileLobby)}
            />
          </Reveal>
        </div>
        <div {...stylex.props(styles.profileTextCell)}>
          <Reveal>
            <h2 {...stylex.props(styles.profileName)}>{ABOUT_HERO.title}</h2>
            <p lang="en" {...stylex.props(styles.profileEnglish)}>
              {ABOUT_HERO.englishTitle}
            </p>
          </Reveal>
          <Reveal step={1}>
            <p {...stylex.props(styles.profileLead)}>{ABOUT_HERO.lead}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AboutView({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <section aria-labelledby="about-banner-title" {...stylex.props(styles.hero)}>
        <img
          src={ABOUT_BANNER.image}
          alt={ABOUT_BANNER.alt}
          fetchPriority="high"
          decoding="async"
          {...stylex.props(styles.heroImage)}
        />
        <div aria-hidden="true" {...stylex.props(styles.heroScrim)} />
        <div {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.heroContent)}>
          <h1 id="about-banner-title" {...stylex.props(styles.heroTitle)}>
            {HERO_TITLE}
          </h1>
          <p {...stylex.props(styles.heroLead)}>{ABOUT_BANNER.lead}</p>
        </div>
      </section>

      <SubPageNav current="关于我们" chips={NAV_CHIPS} onNavigateHome={onNavigateHome} />

      <Profile />

      <HistoryTimeline
        stickyTop={STICKY_TOP}
        plain
        showYear
        sx={[kitStyles.anchor, styles.historyBand]}
      />

      <CampusGallery />

      <CultureScenes sx={kitStyles.anchor} />

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
