import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CULTURE } from "./about-data";
import { Reveal } from "./subpage-kit";
import { color, layout, media } from "./tokens.stylex";

const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const FRAME_TINT = "#e6ecf7";
const SECTION_GRAY = "#f6f6f6";
const SCENE_OFFSET: ["start end", "end 0.35"] = ["start end", "end 0.35"];
const HUMAN_ZOOM = 2.3;

const CULTURE_TITLES: Record<string, string> = { 专业和专注: "专业与专注" };

const cultureValue = (title: string) => {
  const value = ABOUT_CULTURE.values.find((entry) => entry.title === title);
  if (!value) throw new Error(`ABOUT_CULTURE has no value titled ${title}`);
  return { title: CULTURE_TITLES[value.title] ?? value.title, desc: value.desc };
};

const styles = stylex.create({
  section: {
    paddingTop: { default: 72, [DESKTOP]: 152 },
    paddingBottom: { default: 72, [DESKTOP]: 200 },
    backgroundColor: SECTION_GRAY,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [media.tablet]: 40, [DESKTOP]: layout.inset120 },
  },
  header: {
    marginBottom: { default: 40, [DESKTOP]: 98 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    textWrap: "balance",
    color: color.ink,
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
  artMotion: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
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
});

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

const SCROLLS = [
  { input: [0, 0.7], output: [1.18, 1], reduced: 1, origin: "50% 72%" },
  { input: [0, 1], output: [1, 1.16], reduced: 1, origin: "center" },
  { input: [0, 0.8], output: [1.5, HUMAN_ZOOM], reduced: HUMAN_ZOOM, origin: "73% 78%" },
] as const;

function CultureScene({
  scene,
  scroll,
}: {
  scene: (typeof SCENES)[number];
  scroll: (typeof SCROLLS)[number];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: SCENE_OFFSET });
  const scale = useTransform(scrollYProgress, [...scroll.input], [...scroll.output]);

  return (
    <article ref={ref} {...stylex.props(styles.scene)}>
      <Reveal as="figure" sx={[styles.sceneFigure, scene.imageEnd && styles.sceneFigureEnd]}>
        <div {...stylex.props(styles.sceneFrame)}>
          <m.div
            {...stylex.props(styles.artMotion)}
            style={{ scale: reduce ? scroll.reduced : scale, transformOrigin: scroll.origin }}
          >
            <img
              src={scene.art}
              alt={scene.alt}
              loading="lazy"
              decoding="async"
              {...stylex.props(styles.sceneArt, scene.artStyle)}
            />
          </m.div>
        </div>
      </Reveal>
      <Reveal step={1} sx={[styles.sceneText, scene.imageEnd && styles.sceneTextStart]}>
        <h3 {...stylex.props(styles.valueTitle)}>{scene.value.title}</h3>
        <p {...stylex.props(styles.valueDesc)}>{scene.value.desc}</p>
      </Reveal>
    </article>
  );
}

export function CultureScenes({ sx }: { sx?: stylex.StyleXStyles }) {
  return (
    <section
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.props(styles.section, sx)}
    >
      <div {...stylex.props(styles.shell)}>
        <Reveal sx={styles.header}>
          <h2 id="about-culture-title" {...stylex.props(styles.title)}>
            {ABOUT_CULTURE.title}
          </h2>
        </Reveal>
        <div {...stylex.props(styles.story)}>
          {SCENES.map((scene, index) => (
            <CultureScene key={scene.value.title} scene={scene} scroll={SCROLLS[index]} />
          ))}
        </div>
      </div>
    </section>
  );
}
