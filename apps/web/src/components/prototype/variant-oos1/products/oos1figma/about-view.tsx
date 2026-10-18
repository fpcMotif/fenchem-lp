import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Factory, Leaf, Recycle } from "@fenchem-lp/ui/components/lucide";
import { m, useScroll, useTransform } from "@/compat/motion";
import { Dynamic } from "@solidjs/web";
import { createSignal, createUniqueId } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import {
  ABOUT_BANNER,
  ABOUT_CSR,
  ABOUT_CULTURE,
  ABOUT_HERO,
  ABOUT_HISTORY,
  ABOUT_HONORS,
  ABOUT_STRUCTURE,
} from "../../about-data";
import { CampusGallery } from "../../about-view";
import { CTA } from "../../content";
import { HistoryTimeline } from "../../history-timeline";
import type { SubPageProps } from "../../index";
import { Reveal, SubPageNav, kitStyles } from "../../subpage-kit";
import { color, font, layout, media, texture } from "../../tokens.stylex";

const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const MD = breakpoints.md;
const SECTION_GRAY = "#f6f6f6";
const FRAME_TINT = "#e6ecf7";
const CSR_ACCENT = "#8cd6a3";
const INK_64 = "rgba(26, 26, 26, 0.64)";
const INK_78 = "rgba(26, 26, 26, 0.78)";
const INK_52 = "rgba(26, 26, 26, 0.52)";
const RULE_20 = "rgba(26, 26, 26, 0.2)";
const RULE_10 = "rgba(26, 26, 26, 0.1)";

const STICKY_TOP = Number.parseFloat(layout.headerHeight) + Number.parseFloat(layout.subBarHeight);
const [PROFILE_CHIP, ...LATER_CHIPS] = ABOUT_HERO.navChips;
const NAV_CHIPS = [PROFILE_CHIP, ABOUT_HISTORY.navChip, ...LATER_CHIPS];

const HERO_TITLE = "源于自然，精于科学";
const NETWORK_LABEL = "全球 16 家分支公司，遍布";

const CULTURE_TITLES: Record<string, string> = { 专业和专注: "专业与专注" };
const cultureValue = (title: string) => {
  const value = ABOUT_CULTURE.values.find((entry) => entry.title === title);
  if (!value) throw new Error(`ABOUT_CULTURE has no value titled ${title}`);
  return { title: CULTURE_TITLES[value.title] ?? value.title, desc: value.desc };
};

const WORDMARK_WIDTH = 1200;
const WORDMARK_HEIGHT = 114;
const WORDMARK_FONT = '"Plus Jakarta Sans", "Inter Tight", sans-serif';
const WORDMARK_FONT_SIZE = 157;
const WORDMARK_INK = "#cbd8ee";
const WORDMARK_LETTERS = [
  { letter: "F", center: 36.6 },
  { letter: "E", center: 205.9 },
  { letter: "N", center: 386.6 },
  { letter: "C", center: 576.5 },
  { letter: "H", center: 764 },
  { letter: "E", center: 942.4 },
  { letter: "M", center: 1137 },
] as const;

const CSR_ICONS = { factory: Factory, recycle: Recycle, leaf: Leaf } as const;
const CSR_DESC_BREAK = ABOUT_CSR.desc.indexOf("，") + 1;

const LEVELS = [
  { level: "national", label: "国家级", english: "National" },
  { level: "provincial", label: "江苏省级", english: "Provincial" },
  { level: "municipal", label: "南京市级", english: "Municipal" },
] as const;

const styles = stylex.create({
  root: {
    backgroundColor: colors.paper,
    color: color.ink,
    fontFamily: font.body,
  },
  fill: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    textWrap: "balance",
    color: color.ink,
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
  network: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 9,
    marginTop: { default: 40, [DESKTOP]: 66 },
    paddingInline: 16,
    paddingBottom: { default: 0, [DESKTOP]: 26 },
    lineHeight: "19px",
    textAlign: "center",
  },
  networkLabel: {
    margin: 0,
    fontSize: { default: 14, [MD]: 16 },
    letterSpacing: "0.04em",
    color: color.bodyText,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "8px 22px",
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: { default: 14, [MD]: 16 },
    letterSpacing: "0.047em",
    color: color.ink,
  },

  historyGray: {
    backgroundColor: SECTION_GRAY,
  },
  campusHead: {
    paddingTop: { default: 0, [DESKTOP]: 27 },
    marginBottom: { default: 40, [DESKTOP]: 64 },
  },

  culture: {
    paddingTop: { default: 72, [DESKTOP]: 152 },
    paddingBottom: { default: 72, [DESKTOP]: 200 },
    backgroundColor: SECTION_GRAY,
  },
  cultureHead: {
    marginBottom: { default: 40, [DESKTOP]: 98 },
  },
  story: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 72, [media.tablet]: 96, [DESKTOP]: 159 },
  },
  scene: {
    display: { default: "block", [LG]: "grid" },
    gridTemplateColumns: { default: "none", [LG]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    alignItems: "end",
  },
  sceneFigure: {
    gridColumn: { default: "auto", [LG]: "1 / 7" },
    gridRow: { default: "auto", [LG]: "1" },
    margin: 0,
  },
  sceneFigureEnd: {
    gridColumn: { default: "auto", [LG]: "7 / 13" },
  },
  sceneFrame: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: "3 / 2",
    backgroundColor: FRAME_TINT,
  },
  sceneArt: {
    position: "absolute",
    display: "block",
    maxWidth: "none",
    objectFit: "cover",
  },
  helixArt: {
    top: "-63.16%",
    left: "-2.21%",
    width: "156.12%",
    height: "175.77%",
  },
  lensArt: {
    top: "-64.48%",
    left: "-17.35%",
    width: "166.5%",
    height: "187.24%",
  },
  networkArt: {
    top: "-30.97%",
    left: "-24.25%",
    width: "139.96%",
    height: "157.45%",
    transform: "rotate(26.34deg)",
  },
  sceneText: {
    gridColumn: { default: "auto", [LG]: "7 / 13" },
    gridRow: { default: "auto", [LG]: "1" },
    marginTop: { default: 24, [LG]: 0 },
  },
  sceneTextStart: {
    gridColumn: { default: "auto", [LG]: "1 / 7" },
    display: "flex",
    flexDirection: "column",
    alignItems: { default: "flex-start", [LG]: "flex-end" },
    textAlign: { default: "start", [LG]: "end" },
  },
  valueTitle: {
    margin: 0,
    fontSize: { default: 24, [DESKTOP]: 32 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: color.ink,
  },
  valueDesc: {
    maxWidth: "28em",
    margin: 0,
    marginTop: 14,
    fontSize: 16,
    lineHeight: 2,
    letterSpacing: "0.04em",
    textWrap: "pretty",
    color: color.bodyText,
  },

  band: {
    paddingBlock: { default: 40, [DESKTOP]: 48 },
    backgroundColor: colors.paper,
  },
  bandHead: {
    paddingTop: { default: 0, [DESKTOP]: 7 },
    marginBottom: { default: 20, [DESKTOP]: 25 },
  },
  structure: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [LG]: "minmax(0, 0.42fr) minmax(0, 0.58fr)" },
    columnGap: { default: 0, [LG]: 64, [DESKTOP]: 96 },
    rowGap: { default: 40, [DESKTOP]: 56 },
    alignItems: "start",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  smallLabel: {
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "17px",
    letterSpacing: "0.12em",
    color: INK_64,
  },
  holdingName: {
    margin: 0,
    fontSize: { default: 28, [media.tablet]: 34, [DESKTOP]: 40 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.06em",
    textWrap: { default: "balance", [DESKTOP]: "wrap" },
    color: color.ink,
  },
  holdingEnglish: {
    fontSize: 14,
    lineHeight: "17px",
    letterSpacing: "0.03em",
    color: INK_64,
  },
  subs: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE_20,
  },
  sub: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.sm]: "row" },
    alignItems: { default: "flex-start", [breakpoints.sm]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 6, [breakpoints.sm]: 24 },
    paddingBlock: 14,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: RULE_20,
  },
  subName: {
    margin: 0,
    fontSize: { default: 16, [MD]: 18 },
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    color: INK_78,
  },
  subEnglish: {
    flexShrink: 0,
    fontSize: 13,
    letterSpacing: "0.03em",
    color: INK_52,
  },
  level: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [LG]: "200px minmax(0, 1fr)" },
    gap: { default: 16, [LG]: 40 },
    paddingBlock: { default: 16, [DESKTOP]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: RULE_10,
  },
  levelLabel: {
    margin: 0,
    paddingTop: { default: 0, [LG]: 8 },
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "17px",
    letterSpacing: "0.12em",
    color: INK_64,
  },
  honorList: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [breakpoints.sm]: "repeat(2, minmax(0, 1fr))" },
    gap: { default: "10px 32px", [DESKTOP]: "12px 56px" },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  honor: {
    fontSize: { default: 18, [MD]: 20 },
    lineHeight: 1.6,
    letterSpacing: "0.08em",
    textWrap: "balance",
    color: INK_78,
  },
  honorLead: {
    gridColumn: "1 / -1",
    fontSize: { default: 28, [media.tablet]: 34, [DESKTOP]: 44 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.1em",
    color: color.ink,
  },

  csr: {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    paddingTop: { default: 260, [media.tablet]: 340, [DESKTOP]: 420 },
    paddingBottom: { default: 48, [DESKTOP]: 63 },
    backgroundColor: "#0a2a26",
    color: colors.paper,
  },
  csrMedia: {
    position: "absolute",
    zIndex: -2,
    top: "-15%",
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
  csrGrain: {
    zIndex: -1,
    backgroundImage: texture.grain,
    opacity: 0.14,
    mixBlendMode: "overlay",
    pointerEvents: "none",
  },
  csrInner: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, [DESKTOP]: 0 },
  },
  csrHead: {
    paddingTop: { default: 0, [DESKTOP]: 53 },
  },
  csrDescBlock: {
    marginTop: { default: 0, [DESKTOP]: 26 },
  },
  csrTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: colors.paper,
  },
  csrStatement: {
    margin: 0,
    marginTop: { default: 20, [DESKTOP]: 30 },
    fontSize: { default: 22, [media.tablet]: 28, [DESKTOP]: 32 },
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.065em",
    textWrap: "pretty",
  },
  csrDesc: {
    margin: 0,
    fontSize: 15,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: "rgba(255, 255, 255, 0.78)",
  },
  csrDescLine: {
    display: "block",
  },
  csrOutcomes: {
    display: "grid",
    gridTemplateColumns: { default: "1fr", [MD]: "repeat(3, minmax(0, 1fr))" },
    columnGap: 40,
    margin: 0,
    marginTop: { default: 0, [DESKTOP]: 52 },
    padding: 0,
    listStyle: "none",
  },
  csrOutcome: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    paddingBlock: { default: 18, [MD]: 24 },
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

  cta: {
    paddingTop: { default: 80, [DESKTOP]: 112 },
    backgroundColor: FRAME_TINT,
    textAlign: "center",
  },
  ctaTitle: {
    margin: 0,
    paddingInline: 16,
    fontSize: { default: 26, [DESKTOP]: 32 },
    fontWeight: 700,
    lineHeight: 1.2,
    textWrap: "balance",
    color: color.ink,
  },
  ctaActions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginTop: 32,
    paddingInline: 16,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 48,
    borderWidth: 0,
    borderRadius: 0,
    fontFamily: "inherit",
    fontSize: 16,
    lineHeight: 1.2,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "160ms",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  ctaPrimary: {
    backgroundColor: { default: colors.brandBlue700, ":hover": colors.brandBlue800 },
    color: colors.paper,
  },
  ctaSecondary: {
    backgroundColor: { default: colors.paper, ":hover": SECTION_GRAY },
    color: colors.brandBlue700,
  },
  ctaWord: {
    display: "block",
    width: "100%",
    height: "auto",
    marginTop: 32,
    overflow: "visible",
  },
});

function AboutHero() {
  return (
    <section aria-labelledby="about-banner-title" {...stylex.attrs(styles.hero)}>
      <img
        src={ABOUT_BANNER.image}
        alt={ABOUT_BANNER.alt}
        fetchpriority="high"
        decoding="async"
        {...stylex.attrs(styles.heroImage)}
      />
      <div aria-hidden="true" {...stylex.attrs(styles.heroScrim)} />
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.heroContent)}>
        <h1 id="about-banner-title" {...stylex.attrs(styles.heroTitle)}>
          {HERO_TITLE}
        </h1>
        <p {...stylex.attrs(styles.heroLead)}>{ABOUT_BANNER.lead}</p>
      </div>
    </section>
  );
}

function Profile() {
  return (
    <section
      id="about-profile"
      aria-label="Company overview"
      {...stylex.attrs(styles.profile, kitStyles.anchor)}
    >
      <div {...stylex.attrs(kitStyles.shell, styles.profileGrid)}>
        <div {...stylex.attrs(styles.profilePhotoCell)}>
          <Reveal as="figure" sx={styles.profilePhoto}>
            <img
              src={ABOUT_HERO.lobbyImage}
              alt="Fenchem headquarters lobby with a curved ceiling and marble floor"
              loading="lazy"
              decoding="async"
              {...stylex.attrs(styles.fill, styles.profileLobby)}
            />
          </Reveal>
        </div>
        <div {...stylex.attrs(styles.profileTextCell)}>
          <Reveal>
            <h2 {...stylex.attrs(styles.profileName)}>{ABOUT_HERO.title}</h2>
            <p lang="en" {...stylex.attrs(styles.profileEnglish)}>
              {ABOUT_HERO.englishTitle}
            </p>
          </Reveal>
          <Reveal step={1}>
            <p {...stylex.attrs(styles.profileLead)}>{ABOUT_HERO.lead}</p>
          </Reveal>
        </div>
      </div>
      <Reveal step={2} sx={styles.network}>
        <p {...stylex.attrs(styles.networkLabel)}>{NETWORK_LABEL}</p>
        <ul {...stylex.attrs(styles.countries)}>
          {ABOUT_HERO.countries.map((country) => (
            <li>{country}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

const SCENES = [
  {
    value: cultureValue("安静与坚持"),
    art: "/prototype/about/figma/culture-helix.jpg",
    alt: "A glowing DNA double helix",
    artStyle: styles.helixArt,
    imageEnd: false,
  },
  {
    value: cultureValue("专业和专注"),
    art: "/prototype/about/figma/culture-lens.jpg",
    alt: "A magnifying glass over a DNA strand",
    artStyle: styles.lensArt,
    imageEnd: true,
  },
  {
    value: cultureValue("合作与创新"),
    art: "/prototype/about/figma/culture-network.jpg",
    alt: "Molecules linked together in a network",
    artStyle: styles.networkArt,
    imageEnd: false,
  },
] as const;

function Culture() {
  return (
    <section
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.attrs(styles.culture, kitStyles.anchor)}
    >
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
        <Reveal sx={styles.cultureHead}>
          <h2 id="about-culture-title" {...stylex.attrs(styles.sectionTitle)}>
            {ABOUT_CULTURE.title}
          </h2>
        </Reveal>
        <div {...stylex.attrs(styles.story)}>
          {SCENES.map((scene) => (
            <article {...stylex.attrs(styles.scene)}>
              <Reveal
                as="figure"
                sx={[styles.sceneFigure, scene.imageEnd && styles.sceneFigureEnd]}
              >
                <div {...stylex.attrs(styles.sceneFrame)}>
                  <img
                    src={scene.art}
                    alt={scene.alt}
                    loading="lazy"
                    decoding="async"
                    {...stylex.attrs(styles.sceneArt, scene.artStyle)}
                  />
                </div>
              </Reveal>
              <Reveal step={1} sx={[styles.sceneText, scene.imageEnd && styles.sceneTextStart]}>
                <h3 {...stylex.attrs(styles.valueTitle)}>{scene.value.title}</h3>
                <p {...stylex.attrs(styles.valueDesc)}>{scene.value.desc}</p>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Structure() {
  const subsLabelId = createUniqueId();
  return (
    <section
      id="about-structure"
      aria-labelledby="about-structure-title"
      {...stylex.attrs(styles.band, kitStyles.anchor)}
    >
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
        <Reveal sx={styles.bandHead}>
          <h2 id="about-structure-title" {...stylex.attrs(styles.sectionTitle)}>
            {ABOUT_STRUCTURE.title}
          </h2>
        </Reveal>
        <div {...stylex.attrs(styles.structure)}>
          <Reveal sx={styles.stack}>
            <p {...stylex.attrs(styles.smallLabel)}>{ABOUT_STRUCTURE.holding.badge}</p>
            <h3 {...stylex.attrs(styles.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
            <div lang="en" {...stylex.attrs(styles.holdingEnglish)}>
              {ABOUT_STRUCTURE.holding.english}
            </div>
          </Reveal>
          <div {...stylex.attrs(styles.stack)}>
            <p id={subsLabelId} {...stylex.attrs(styles.smallLabel)}>
              {ABOUT_STRUCTURE.subsidiaryBadge}
            </p>
            <ul aria-labelledby={subsLabelId} {...stylex.attrs(styles.subs)}>
              {ABOUT_STRUCTURE.subsidiaries.map((sub, index) => (
                <Reveal as="li" step={index} sx={styles.sub}>
                  <h4 {...stylex.attrs(styles.subName)}>{sub.name}</h4>
                  <span lang="en" {...stylex.attrs(styles.subEnglish)}>
                    {sub.english}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby="about-honor-title"
      {...stylex.attrs(styles.band, kitStyles.anchor)}
    >
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
        <Reveal sx={styles.bandHead}>
          <h2 id="about-honor-title" {...stylex.attrs(styles.sectionTitle)}>
            {ABOUT_HONORS.title}
          </h2>
        </Reveal>
        {LEVELS.map((entry) => {
          const items = ABOUT_HONORS.items.filter((item) => item.level === entry.level);
          if (items.length === 0) return null;
          return (
            <Reveal sx={styles.level}>
              <h3 {...stylex.attrs(styles.levelLabel)}>{entry.label}</h3>
              <ul aria-label={`${entry.english} honors`} {...stylex.attrs(styles.honorList)}>
                {items.map((honor) => (
                  <li
                    {...stylex.attrs(styles.honor, entry.level === "national" && styles.honorLead)}
                  >
                    {honor.title}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Csr() {
  const [sectionEl, setSectionEl] = createSignal<HTMLElement>();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionEl,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={setSectionEl}
      id="about-csr"
      aria-labelledby="about-csr-title"
      {...stylex.attrs(styles.csr, kitStyles.anchor)}
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
      <div aria-hidden="true" {...stylex.attrs(styles.fill, styles.csrGrain)} />
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120, styles.csrInner)}>
        <Reveal sx={styles.csrHead}>
          <h2 id="about-csr-title" {...stylex.attrs(styles.csrTitle)}>
            {ABOUT_CSR.title}
          </h2>
          <p {...stylex.attrs(styles.csrStatement)}>{ABOUT_CSR.statement.join("")}</p>
        </Reveal>
        <Reveal step={1} sx={styles.csrDescBlock}>
          <p {...stylex.attrs(styles.csrDesc)}>
            <span {...stylex.attrs(styles.csrDescLine)}>
              {ABOUT_CSR.desc.slice(0, CSR_DESC_BREAK)}
            </span>
            <span {...stylex.attrs(styles.csrDescLine)}>
              {ABOUT_CSR.desc.slice(CSR_DESC_BREAK)}
            </span>
          </p>
        </Reveal>
        <ul {...stylex.attrs(styles.csrOutcomes)}>
          {ABOUT_CSR.outcomes.map((outcome, index) => {
            return (
              <Reveal as="li" step={index} sx={styles.csrOutcome}>
                <Dynamic
                  component={CSR_ICONS[outcome.icon]}
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

function FigmaCta(props: SubPageProps) {
  const titleId = createUniqueId();
  const wordFillId = createUniqueId();
  return (
    <section aria-labelledby={titleId} {...stylex.attrs(styles.cta)}>
      <Reveal>
        <h2 id={titleId} {...stylex.attrs(styles.ctaTitle)}>
          {CTA.title}
        </h2>
        <div {...stylex.attrs(styles.ctaActions)}>
          <button
            type="button"
            onClick={() => props.onNavigateHome("contact")}
            {...stylex.attrs(styles.ctaButton, styles.ctaPrimary)}
          >
            {CTA.action.label}
          </button>
          <button
            type="button"
            onClick={() => props.onNavigateHome("products")}
            {...stylex.attrs(styles.ctaButton, styles.ctaSecondary)}
          >
            产品与应用
          </button>
        </div>
      </Reveal>
      <div {...stylex.attrs(kitStyles.shell, kitStyles.inset120)}>
        <svg
          viewBox={`0 0 ${WORDMARK_WIDTH} ${WORDMARK_HEIGHT}`}
          aria-hidden="true"
          {...stylex.attrs(styles.ctaWord)}
        >
          <defs>
            <linearGradient
              id={wordFillId}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="0"
              y2={WORDMARK_HEIGHT}
            >
              <stop offset="0" stop-color={FRAME_TINT} />
              <stop offset="1" stop-color={WORDMARK_INK} />
            </linearGradient>
          </defs>
          <g
            font-family={WORDMARK_FONT}
            font-size={WORDMARK_FONT_SIZE}
            font-weight={600}
            text-anchor="middle"
            fill={`url(#${wordFillId})`}
          >
            {WORDMARK_LETTERS.map(({ letter, center }) => (
              <text x={center} y={WORDMARK_HEIGHT}>
                {letter}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </section>
  );
}

export function AboutOOS1Figma(props: SubPageProps) {
  return (
    <div id="about-top" {...stylex.attrs(styles.root)}>
      <AboutHero />
      <SubPageNav current="关于我们" chips={NAV_CHIPS} onNavigateHome={props.onNavigateHome} />
      <Profile />
      <HistoryTimeline stickyTop={STICKY_TOP} plain sx={[kitStyles.anchor, styles.historyGray]} />
      <CampusGallery showEyebrow={false} headerSx={styles.campusHead} />
      <Culture />
      <Structure />
      <Csr />
      <Honors />
      <FigmaCta onNavigateHome={props.onNavigateHome} />
    </div>
  );
}
