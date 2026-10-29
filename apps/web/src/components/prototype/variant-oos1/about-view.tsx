import { LightboxStage } from "../shared/lightbox-stage";
import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { m, useScroll, useTransform } from "motion/react";
import { type ComponentType, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import {
  ABOUT_BANNER,
  ABOUT_CAMPUS,
  ABOUT_CERTIFICATIONS,
  ABOUT_CSR,
  ABOUT_HERO,
  ABOUT_RD,
} from "./about-data";
import { useBalancedColumns } from "./balanced-columns";
import { CampusCarousel } from "./campus-carousel";
import { CAMPUS_GALLERY } from "./campus-gallery";
import { ContactCta } from "./contact-cta";
import { CTA } from "./content";
import { CultureScenes } from "./culture-scenes";
import { HistoryTimeline } from "./history-timeline";
import { Reveal, SubPageNav, kitStyles } from "./subpage-kit";
import { color, ease, font, layout, media } from "./tokens.stylex";
import { AboutNavyBand } from "./about-navy-band";

const RD_MAX_COLUMNS = 44;
const PROFILE_MAX_COLUMNS = 33;
const CSR_DESC_BREAK = ABOUT_CSR.desc.indexOf("，") + 1;
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const RD_HAIRLINE = "rgba(26, 26, 26, 0.12)";
const HERO_TITLE = "源于自然，精于科学";

const STICKY_TOP = Number.parseFloat(layout.headerHeight) + Number.parseFloat(layout.subBarHeight);

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
    backgroundColor: color.pageTint,
    color: color.ink,
    fontFamily: font.body,
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
    backgroundColor: color.neutralTint,
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
      "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 22.222%)",
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
  profile: {
    paddingBlock: { default: 72, [DESKTOP]: 128 },
    backgroundColor: colors.paper,
  },
  profileGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [LG]: "repeat(2, minmax(0, 1fr))",
      [DESKTOP]: "minmax(0, 552px) minmax(0, 1fr)",
    },
    alignItems: "center",
    gap: { default: 32, [LG]: 64 },
  },
  profilePhoto: {
    position: "relative",
    justifySelf: { default: "stretch", [LG]: "end" },
    width: { default: "100%", [DESKTOP]: 432 },
    overflow: "hidden",
    margin: 0,
    aspectRatio: { default: "4 / 3", [LG]: "432 / 485" },
    backgroundColor: color.blueTint,
  },
  profileLobby: {
    position: "absolute",
    top: { default: 0, [LG]: "-12.99%" },
    left: { default: 0, [LG]: "-3.47%" },
    width: { default: "100%", [LG]: "105.79%" },
    height: { default: "100%", [LG]: "112.99%" },
    maxWidth: "none",
    objectFit: "cover",
  },
  profileTextCell: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 24, [DESKTOP]: 48 },
  },
  profileName: {
    margin: 0,
    fontSize: { default: 32, [media.tablet]: 40, [DESKTOP]: 48 },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.02em",
    textWrap: "balance",
    whiteSpace: { default: "normal", [DESKTOP]: "nowrap" },
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
    inlineSize: `min(${PROFILE_MAX_COLUMNS}em, round(down, 100%, 1em))`,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.6,
    textAlign: "justify",
    textJustify: "inter-character",
    textWrap: "pretty",
    lineBreak: "strict",
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

  rdSection: {
    paddingBlock: { default: 72, [DESKTOP]: 128 },
    backgroundColor: colors.paper,
  },
  rdHead: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "minmax(0, 1fr) minmax(0, 1fr)" },
    alignItems: "end",
    gap: { default: 16, [LG]: 48 },
    marginBottom: { default: 32, [DESKTOP]: 56 },
  },

  rdFigure: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    aspectRatio: { default: "4 / 3", [MD]: "16 / 7", [DESKTOP]: "12 / 5" },
    backgroundColor: color.blueTint,
  },
  rdImage: {
    objectPosition: "50% 55%",
  },
  rdPillars: {
    display: "flex",
    flexDirection: "column",
  },
  rdPillar: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "minmax(0, 1fr) minmax(0, 2fr)" },
    gap: { default: 8, [LG]: 48 },
    paddingBlock: { default: 24, [DESKTOP]: 32 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RD_HAIRLINE,
  },
  rdPillarTitle: {
    margin: 0,
    fontSize: 17,
    fontWeight: 600,
    lineHeight: 1.7,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  rdPillarDesc: {
    margin: 0,
    inlineSize: `min(${RD_MAX_COLUMNS}em, round(down, 100%, 1em))`,
    fontSize: 15,
    lineHeight: 1.9,
    textAlign: "justify",
    textJustify: "inter-character",
    textWrap: "pretty",
    lineBreak: "strict",
    overflowWrap: "anywhere",
    textAutospace: "normal",
    whiteSpace: "pre-line",
    color: color.bodyText,
  },

  certSection: {
    paddingBottom: { default: 72, [DESKTOP]: 128 },
    backgroundColor: colors.paper,
  },
  certGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [MD]: "repeat(3, minmax(0, 1fr))",
      [LG]: "repeat(5, minmax(0, 1fr))",
    },
    gap: 15,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  certItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  certLogo: {
    display: "block",
    width: "100%",
    maxWidth: 228,
    height: "auto",
    aspectRatio: "2 / 1",
    objectFit: "contain",
  },

  csrSection: {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    paddingTop: { default: 260, [media.tablet]: 340, [DESKTOP]: 420 },
    paddingBottom: { default: 64, [DESKTOP]: 194 },
    backgroundColor: "#0a2a26",
    color: "#ffffff",
  },
  csrMedia: {
    position: "absolute",
    zIndex: -2,
    top: "-8%",
    left: "-9.1%",
    width: "125.6%",
    height: "123%",
  },
  csrImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 40%",
  },
  csrInner: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, [DESKTOP]: 52 },
  },
  csrTitle: {
    margin: 0,
    fontSize: { default: 28, [media.tablet]: 34, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    textWrap: "balance",
  },
  csrStatement: {
    margin: 0,
    marginTop: 20,
    fontSize: { default: 22, [media.tablet]: 28, [DESKTOP]: 32 },
    fontWeight: 500,
    lineHeight: { default: 1.6, [DESKTOP]: 2.275 },
    letterSpacing: "0.065em",
    textWrap: "pretty",
  },
  csrDesc: {
    margin: 0,
    fontSize: 15,
    lineHeight: 2,
    letterSpacing: "0.04em",
    textWrap: "pretty",
    color: "rgba(255, 255, 255, 0.78)",
  },
  csrDescLine: {
    display: "block",
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

export function CampusGallery({
  headerSx,
  Carousel = CampusCarousel,
}: {
  headerSx?: stylex.StyleXStyles;
  Carousel?: ComponentType<{ paused: boolean; onOpen: (index: number) => void }>;
}) {
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
        <SectionHeader
          title={ABOUT_CAMPUS.galleryTitle}
          titleId="about-campus-title"
          sx={headerSx}
        />
      </div>
      <Carousel paused={openIndex !== null} onOpen={open} />
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

function RdSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useBalancedColumns(sectionRef, RD_MAX_COLUMNS);
  return (
    <section
      ref={sectionRef}
      id={ABOUT_RD.navChip.id}
      aria-labelledby="about-rd-title"
      {...stylex.props(styles.rdSection, kitStyles.anchor)}
    >
      <div {...stylex.props(kitStyles.shell, kitStyles.inset120)}>
        <Reveal sx={styles.rdHead}>
          <h2 id="about-rd-title" {...stylex.props(styles.sectionTitle)}>
            {ABOUT_RD.title}
          </h2>
        </Reveal>
        <Reveal as="figure" step={1} sx={styles.rdFigure}>
          <img
            src={ABOUT_RD.image}
            srcSet="/prototype/about/campus-lab.webp 1400w, /prototype/about/campus-lab-lg.webp 2400w"
            sizes="(min-width: 1280px) 1200px, 100vw"
            alt={ABOUT_RD.imageAlt}
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.fill, styles.rdImage)}
          />
        </Reveal>
        <div {...stylex.props(styles.rdPillars)}>
          {ABOUT_RD.pillars.map((pillar, index) => (
            <Reveal key={pillar.title} step={index} sx={styles.rdPillar}>
              <h3 {...stylex.props(styles.rdPillarTitle)}>{pillar.title}</h3>
              <div>
                <p data-balanced {...stylex.props(styles.rdPillarDesc)}>
                  {pillar.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section
      id={ABOUT_CERTIFICATIONS.id}
      aria-labelledby="about-certifications-title"
      {...stylex.props(styles.certSection, kitStyles.anchor)}
    >
      <div {...stylex.props(kitStyles.shell, kitStyles.inset120)}>
        <SectionHeader title={ABOUT_CERTIFICATIONS.title} titleId="about-certifications-title" />
        <Reveal step={1}>
          <ul {...stylex.props(styles.certGrid)}>
            {ABOUT_CERTIFICATIONS.items.map((item) => (
              <li key={item.id} {...stylex.props(styles.certItem)}>
                <img
                  src={item.image}
                  alt={item.name}
                  width={260}
                  height={130}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(styles.certLogo)}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
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
          src={ABOUT_CSR.forestImage}
          alt={ABOUT_CSR.forestImageAlt}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.csrImage)}
        />
      </m.div>
      <div {...stylex.props(kitStyles.shell, kitStyles.inset120)}>
        <Reveal sx={styles.csrInner}>
          <div>
            <h2 id="about-csr-title" {...stylex.props(styles.csrTitle)}>
              {ABOUT_CSR.title}
            </h2>
            <p {...stylex.props(styles.csrStatement)}>{ABOUT_CSR.statement.join("")}</p>
          </div>
          <p {...stylex.props(styles.csrDesc)}>
            <span {...stylex.props(styles.csrDescLine)}>
              {ABOUT_CSR.desc.slice(0, CSR_DESC_BREAK)}
            </span>
            <span {...stylex.props(styles.csrDescLine)}>
              {ABOUT_CSR.desc.slice(CSR_DESC_BREAK)}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Profile() {
  const sectionRef = useRef<HTMLElement>(null);
  useBalancedColumns(sectionRef, PROFILE_MAX_COLUMNS);
  return (
    <section
      ref={sectionRef}
      id="about-profile"
      aria-label="Company overview"
      {...stylex.props(styles.profile, kitStyles.anchor)}
    >
      <div {...stylex.props(kitStyles.shell, kitStyles.inset120, styles.profileGrid)}>
        <div {...stylex.props(styles.profileTextCell)}>
          <Reveal>
            <h2 {...stylex.props(styles.profileName)}>{ABOUT_HERO.title}</h2>
            <p lang="en" {...stylex.props(styles.profileEnglish)}>
              {ABOUT_HERO.englishTitle}
            </p>
          </Reveal>
          <Reveal step={1}>
            <p data-balanced {...stylex.props(styles.profileLead)}>
              {ABOUT_HERO.lead}
            </p>
          </Reveal>
        </div>
        <Reveal as="figure" step={1} sx={styles.profilePhoto}>
          <img
            src={ABOUT_HERO.lobbyImage}
            alt="Fenchem headquarters lobby with a curved ceiling and marble floor"
            loading="lazy"
            decoding="async"
            {...stylex.props(styles.profileLobby)}
          />
        </Reveal>
      </div>
    </section>
  );
}

export function AboutView({
  onNavigateHome,
  Carousel,
}: {
  onNavigateHome: (hash?: string) => void;
  Carousel?: ComponentType<{ paused: boolean; onOpen: (index: number) => void }>;
}) {
  return (
    <div id="about-top" {...stylex.props(styles.root)}>
      <section aria-labelledby="about-banner-title" {...stylex.props(styles.hero)}>
        <img
          src={ABOUT_BANNER.image}
          srcSet={`/prototype/about/about-hero-campus-1200.webp 1200w, ${ABOUT_BANNER.image} 2400w`}
          sizes="100vw"
          alt={ABOUT_BANNER.alt}
          fetchPriority="high"
          decoding="async"
          {...stylex.props(styles.heroImage)}
        />
        <div aria-hidden="true" {...stylex.props(styles.heroScrim)} />
        <h1 id="about-banner-title" {...stylex.props(styles.visuallyHidden)}>
          {HERO_TITLE}
        </h1>
      </section>

      <SubPageNav current="关于我们" onNavigateHome={onNavigateHome} />

      <Profile />

      <HistoryTimeline stickyTop={STICKY_TOP} sx={[kitStyles.anchor, styles.historyBand]} />

      <CampusGallery Carousel={Carousel} />

      <CultureScenes sx={kitStyles.anchor} />

      <RdSection />

      <CertificationsSection />

      <CsrSection />

      <AboutNavyBand />

      <ContactCta
        actions={[
          { label: CTA.action.label, onClick: () => onNavigateHome("contact") },
          { label: "产品与应用", tone: "secondary", onClick: () => onNavigateHome("products") },
        ]}
      />
    </div>
  );
}
