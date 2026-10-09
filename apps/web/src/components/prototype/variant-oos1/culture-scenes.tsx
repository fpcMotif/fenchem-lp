import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CAMPUS, ABOUT_CULTURE, ABOUT_MOMENT } from "./about-data";
import { RiseReveal } from "./rise-reveal";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const DISPLAY_FONT = '"Inter Tight", "Helvetica Neue", Arial, sans-serif';
const FRAME_TINT = "#e6ecf7";
const WASH_SAND = "#f8f4ec";
const WASH_BLUE = "#f1f4fa";
const WASH_GREEN = "#f1f6ee";
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const MD_TO_LG = "@media (min-width: 768px) and (max-width: 1023.98px)";
const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const INSET_120 = "min(120px, 8.333vw)";
const SCENE_OFFSET: ["start end", "end 0.35"] = ["start end", "end 0.35"];
const HUMAN_ZOOM = 2.3;

const styles = stylex.create({
  section: {
    position: "relative",
    overflow: "hidden",
    paddingBlock: { default: 72, [DESKTOP]: 128 },
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_120 },
  },
  header: {
    marginBottom: { default: 40, [DESKTOP]: 64 },
  },
  eyebrow: {
    margin: 0,
    marginBottom: 12,
    fontFamily: DISPLAY_FONT,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.brandBlue700,
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
  },
  story: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 72, [TABLET]: 96, [DESKTOP]: 128 },
  },
  sceneGrid: {
    display: { default: "block", [LG]: "grid" },
    gridTemplateColumns: { default: "none", [LG]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    alignItems: "end",
  },

  figure: {
    margin: 0,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: FRAME_TINT,
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
  caption: {
    marginTop: 12,
    fontSize: 12,
    lineHeight: 1.6,
    letterSpacing: "0.06em",
    color: BODY_TEXT,
  },

  vastFigure: {
    marginInline: { default: -16, [breakpoints.md]: 0 },
  },
  vastCaption: {
    paddingLeft: { default: 16, [breakpoints.md]: 0 },
  },
  vastFrame: {
    aspectRatio: { default: "4 / 3", [TABLET]: "2 / 1", [DESKTOP]: "2.3 / 1" },
  },
  vastImage: {
    objectPosition: "50% 72%",
  },
  vastText: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    marginTop: { default: 28, [DESKTOP]: 40 },
  },
  vastBody: {
    gridColumn: { default: "auto", [LG]: "7 / 13" },
  },
  sceneFigure: {
    gridColumn: { default: "auto", [LG]: "1 / 7" },
    width: { default: "82%", [MD_TO_LG]: "72%", [LG]: "auto" },
  },
  sceneFrame: {
    aspectRatio: "3 / 2",
  },
  sceneText: {
    gridColumn: { default: "auto", [LG]: "7 / 13" },
    marginTop: { default: 24, [LG]: 0 },
  },
  humanImage: {
    transformOrigin: "73% 78%",
  },

  valueTitle: {
    margin: 0,
    fontSize: { default: 24, [DESKTOP]: 32 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: INK,
  },
  desc: {
    maxWidth: "28em",
    margin: 0,
    marginTop: 14,
    fontSize: 16,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
});

const [professional, quiet, together] = ABOUT_CULTURE.values;
const lab = ABOUT_CAMPUS.photos[1];
const lounge = ABOUT_CAMPUS.photos[4];

function useSceneProgress() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: SCENE_OFFSET });
  return [ref, scrollYProgress] as const;
}

function VastScene() {
  const [ref, progress] = useSceneProgress();
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [0, 0.7], [1.18, 1]);

  return (
    <article ref={ref}>
      <RiseReveal sx={[styles.figure, styles.vastFigure]}>
        <figure {...stylex.props(styles.figure)}>
          <div {...stylex.props(styles.frame, styles.vastFrame)}>
            <m.img
              src={ABOUT_MOMENT.image}
              alt={ABOUT_MOMENT.alt}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.fill, styles.vastImage)}
              style={{ scale: reduce ? 1 : scale }}
            />
          </div>
          <figcaption {...stylex.props(styles.caption, styles.vastCaption)}>
            {ABOUT_MOMENT.caption}
          </figcaption>
        </figure>
      </RiseReveal>
      <div {...stylex.props(styles.vastText)}>
        <RiseReveal delay={0.15} sx={styles.vastBody}>
          <h3 {...stylex.props(styles.valueTitle)}>{quiet.title}</h3>
          <p {...stylex.props(styles.desc)}>{quiet.desc}</p>
        </RiseReveal>
      </div>
    </article>
  );
}

function RoomScene() {
  const [ref, progress] = useSceneProgress();
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [0, 1], [1, 1.16]);

  return (
    <article ref={ref} {...stylex.props(styles.sceneGrid)}>
      <RiseReveal sx={styles.sceneFigure}>
        <figure {...stylex.props(styles.figure)}>
          <div {...stylex.props(styles.frame, styles.sceneFrame)}>
            <m.img
              src={lab.src}
              alt={lab.alt}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.fill)}
              style={{ scale: reduce ? 1 : scale }}
            />
          </div>
          <figcaption {...stylex.props(styles.caption)}>{lab.caption}</figcaption>
        </figure>
      </RiseReveal>
      <RiseReveal delay={0.15} sx={styles.sceneText}>
        <h3 {...stylex.props(styles.valueTitle)}>{professional.title}</h3>
        <p {...stylex.props(styles.desc)}>{professional.desc}</p>
      </RiseReveal>
    </article>
  );
}

function HumanScene() {
  const [ref, progress] = useSceneProgress();
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [0, 0.8], [1.5, HUMAN_ZOOM]);

  return (
    <article ref={ref} {...stylex.props(styles.sceneGrid)}>
      <RiseReveal sx={styles.sceneFigure}>
        <figure {...stylex.props(styles.figure)}>
          <div {...stylex.props(styles.frame, styles.sceneFrame)}>
            <m.img
              src={lounge.large}
              alt={lounge.alt}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.fill, styles.humanImage)}
              style={{ scale: reduce ? HUMAN_ZOOM : scale }}
            />
          </div>
          <figcaption {...stylex.props(styles.caption)}>{lounge.caption}</figcaption>
        </figure>
      </RiseReveal>
      <RiseReveal delay={0.15} sx={styles.sceneText}>
        <h3 {...stylex.props(styles.valueTitle)}>{together.title}</h3>
        <p {...stylex.props(styles.desc)}>{together.desc}</p>
      </RiseReveal>
    </article>
  );
}

export function CultureScenes({ sx }: { sx?: stylex.StyleXStyles }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const wash = useTransform(
    scrollYProgress,
    [0.12, 0.45, 0.78],
    [WASH_SAND, WASH_BLUE, WASH_GREEN],
  );

  return (
    <m.section
      ref={sectionRef}
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.props(styles.section, sx)}
      style={{ backgroundColor: wash }}
    >
      <div {...stylex.props(styles.shell)}>
        <RiseReveal sx={styles.header}>
          <p lang="en" {...stylex.props(styles.eyebrow)}>
            {ABOUT_CULTURE.eyebrow}
          </p>
          <h2 id="about-culture-title" {...stylex.props(styles.title)}>
            {ABOUT_CULTURE.title}
          </h2>
        </RiseReveal>
        <div {...stylex.props(styles.story)}>
          <VastScene />
          <RoomScene />
          <HumanScene />
        </div>
      </div>
    </m.section>
  );
}
