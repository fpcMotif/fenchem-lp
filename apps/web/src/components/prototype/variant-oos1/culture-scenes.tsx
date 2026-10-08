import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { type MotionValue, m, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CAMPUS, ABOUT_CULTURE, ABOUT_MOMENT } from "./about-data";
import { RiseReveal } from "./rise-reveal";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const FRAME_TINT = "#e6ecf7";
const WASH_SAND = "#f8f4ec";
const WASH_BLUE = "#f1f4fa";
const WASH_GREEN = "#f1f6ee";
const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const MD_TO_LG = "@media (min-width: 768px) and (max-width: 1023.98px)";
const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const INSET_124 = "min(124px, 8.611vw)";
const BLEED_MD = "calc(max(0px, (100vw - 1440px) / 2) + 40px)";
const BLEED_XL = `calc(max(0px, (100vw - 1440px) / 2) + ${INSET_124})`;
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
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET_124 },
  },
  header: {
    marginBottom: { default: 48, [DESKTOP]: 80 },
    textAlign: "center",
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
  scene: {
    position: "relative",
  },
  sceneGrid: {
    display: { default: "block", [LG]: "grid" },
    gridTemplateColumns: { default: "none", [LG]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    alignItems: "end",
  },
  layer: {
    position: "relative",
    zIndex: 1,
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
    marginLeft: {
      default: -16,
      [TABLET]: `calc(-1 * ${BLEED_MD})`,
      [DESKTOP]: `calc(-1 * ${BLEED_XL})`,
    },
    marginRight: { default: -16, [breakpoints.md]: 0 },
  },
  vastCaption: {
    paddingLeft: { default: 16, [TABLET]: BLEED_MD, [DESKTOP]: BLEED_XL },
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
    gridColumn: { default: "auto", [LG]: "6 / 12" },
  },
  roomFigure: {
    gridColumn: { default: "auto", [LG]: "1 / 9" },
    width: { default: "82%", [MD_TO_LG]: "72%", [LG]: "auto" },
  },
  roomFrame: {
    aspectRatio: "2.4 / 1",
  },
  roomText: {
    gridColumn: { default: "auto", [LG]: "9 / 13" },
    marginTop: { default: 24, [LG]: 0 },
  },
  humanFigure: {
    gridColumn: { default: "auto", [LG]: "1 / 4" },
    width: { default: "52%", [MD_TO_LG]: "38%", [LG]: "auto" },
  },
  humanFrame: {
    aspectRatio: "4 / 5",
  },
  humanImage: {
    transformOrigin: "73% 78%",
  },
  humanText: {
    gridColumn: { default: "auto", [LG]: "5 / 10" },
    marginTop: { default: 24, [LG]: 0 },
    alignSelf: "start",
  },

  titleVast: {
    margin: 0,
    fontSize: { default: 28, [TABLET]: 40, [DESKTOP]: 52 },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.06em",
    color: INK,
  },
  titleRoom: {
    margin: 0,
    fontSize: { default: 24, [DESKTOP]: 32 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: INK,
  },
  titleHuman: {
    margin: 0,
    fontSize: 22,
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

  glyph: {
    position: "absolute",
    zIndex: 0,
    display: "block",
    fontWeight: 400,
    lineHeight: 1,
    pointerEvents: "none",
    userSelect: "none",
  },
  glyphOutline: {
    display: "block",
    color: "transparent",
    WebkitTextStrokeWidth: 1,
  },
  glyphInk: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
  },
  strokeSand: { WebkitTextStrokeColor: "rgba(150, 118, 52, 0.28)" },
  strokeBlue: { WebkitTextStrokeColor: "rgba(7, 67, 174, 0.22)" },
  strokeGreen: { WebkitTextStrokeColor: "rgba(72, 132, 36, 0.26)" },
  inkSand: { color: "#ecdfc2" },
  inkBlue: { color: "#d6e1f4" },
  inkGreen: { color: "#d5e7c8" },
  glyphVast: {
    top: { default: "auto", [LG]: -12 },
    bottom: { default: -24, [LG]: "auto" },
    right: { default: -8, [LG]: "auto" },
    left: { default: "auto", [LG]: -8 },
    fontSize: { default: 168, [TABLET]: 240, [DESKTOP]: 296 },
  },
  glyphRoom: {
    top: { default: "auto", [LG]: -96 },
    bottom: { default: -16, [LG]: "auto" },
    right: { default: -8, [LG]: -24 },
    fontSize: { default: 150, [TABLET]: 240, [DESKTOP]: 300 },
  },
  glyphHuman: {
    top: { default: 8, [LG]: "calc(50% - 0.55em)" },
    right: { default: -8, [LG]: 0 },
    fontSize: { default: 168, [TABLET]: 280, [DESKTOP]: 380 },
  },
});

const TONES = {
  sand: { stroke: styles.strokeSand, ink: styles.inkSand },
  blue: { stroke: styles.strokeBlue, ink: styles.inkBlue },
  green: { stroke: styles.strokeGreen, ink: styles.inkGreen },
} as const;

type Value = (typeof ABOUT_CULTURE.values)[number];

const [professional, quiet, together] = ABOUT_CULTURE.values;
const lab = ABOUT_CAMPUS.photos[1];
const lounge = ABOUT_CAMPUS.photos[4];

function InkGlyph({
  value,
  progress,
  sx,
}: {
  value: Value;
  progress: MotionValue<number>;
  sx: stylex.StyleXStyles;
}) {
  const reduce = useReducedMotion();
  const level = useTransform(progress, [0.05, 0.85], [-14, 100]);
  const edge = useTransform(level, (inked) => inked + 14);
  const mask = useMotionTemplate`linear-gradient(to top, #000 ${level}%, transparent ${edge}%)`;
  const drift = useTransform(progress, [0, 1], ["10%", "-12%"]);
  const tone = TONES[value.tone];

  return (
    <m.span
      aria-hidden="true"
      {...stylex.props(styles.glyph, sx)}
      style={{ y: reduce ? 0 : drift }}
    >
      <span {...stylex.props(styles.glyphOutline, tone.stroke)}>{value.glyph}</span>
      <m.span
        {...stylex.props(styles.glyphInk, tone.ink)}
        style={{ maskImage: reduce ? "none" : mask, WebkitMaskImage: reduce ? "none" : mask }}
      >
        {value.glyph}
      </m.span>
    </m.span>
  );
}

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
    <article ref={ref} {...stylex.props(styles.scene)}>
      <RiseReveal sx={[styles.layer, styles.figure, styles.vastFigure]}>
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
      <div {...stylex.props(styles.scene, styles.vastText)}>
        <InkGlyph value={quiet} progress={progress} sx={styles.glyphVast} />
        <RiseReveal delay={0.15} sx={[styles.layer, styles.vastBody]}>
          <h3 {...stylex.props(styles.titleVast)}>{quiet.title}</h3>
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
    <article ref={ref} {...stylex.props(styles.scene, styles.sceneGrid)}>
      <InkGlyph value={professional} progress={progress} sx={styles.glyphRoom} />
      <RiseReveal sx={[styles.layer, styles.roomFigure]}>
        <figure {...stylex.props(styles.figure)}>
          <div {...stylex.props(styles.frame, styles.roomFrame)}>
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
      <RiseReveal delay={0.15} sx={[styles.layer, styles.roomText]}>
        <h3 {...stylex.props(styles.titleRoom)}>{professional.title}</h3>
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
    <article ref={ref} {...stylex.props(styles.scene, styles.sceneGrid)}>
      <InkGlyph value={together} progress={progress} sx={styles.glyphHuman} />
      <RiseReveal sx={[styles.layer, styles.humanFigure]}>
        <figure {...stylex.props(styles.figure)}>
          <div {...stylex.props(styles.frame, styles.humanFrame)}>
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
      <RiseReveal delay={0.15} sx={[styles.layer, styles.humanText]}>
        <h3 {...stylex.props(styles.titleHuman)}>{together.title}</h3>
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
