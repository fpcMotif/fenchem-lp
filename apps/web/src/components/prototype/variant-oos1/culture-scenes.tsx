import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { m, useScroll, useTransform } from "@/compat/motion";
import { createSignal, Show } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { ABOUT_CAMPUS, ABOUT_CULTURE, ABOUT_MOMENT } from "./about-data";
import { RiseReveal } from "./rise-reveal";
import { color, font, layout, media } from "./tokens.stylex";

const FRAME_TINT = "#e6ecf7";
const WASH_SAND = "#f8f4ec";
const WASH_BLUE = "#f1f4fa";
const WASH_GREEN = "#f1f6ee";
const MD_TO_LG = "@media (min-width: 768px) and (max-width: 1023.98px)";
const DESKTOP = "@media (min-width: 1280px)";
const LG = "@media (min-width: 1024px)";
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
    paddingInline: { default: 16, [media.tablet]: 40, [DESKTOP]: layout.inset120 },
  },
  header: {
    marginBottom: { default: 40, [DESKTOP]: 64 },
  },
  eyebrow: {
    margin: 0,
    marginBottom: 12,
    fontFamily: font.display,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: colors.brandBlue700,
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: color.ink,
  },
  story: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 72, [media.tablet]: 96, [DESKTOP]: 128 },
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
    color: color.bodyText,
  },

  vastFigure: {
    marginInline: { default: -16, ["@media (min-width: 768px)"]: 0 },
  },
  vastCaption: {
    paddingLeft: { default: 16, ["@media (min-width: 768px)"]: 0 },
  },
  vastFrame: {
    aspectRatio: { default: "4 / 3", [media.tablet]: "2 / 1", [DESKTOP]: "2.3 / 1" },
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
    color: color.ink,
  },
  desc: {
    maxWidth: "28em",
    margin: 0,
    marginTop: 14,
    fontSize: 16,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: color.bodyText,
    textWrap: "pretty",
  },
});

type CultureValue = (typeof ABOUT_CULTURE.values)[number];
type CampusShot = (typeof ABOUT_CAMPUS.photos)[number];

const VALUES: readonly CultureValue[] = ABOUT_CULTURE.values;
const [PROFESSIONAL, QUIET, TOGETHER, ...MORE_VALUES] = VALUES;
const LAB = ABOUT_CAMPUS.photos.find((photo) => photo.id === "lab");
const LOUNGE = ABOUT_CAMPUS.photos.find((photo) => photo.id === "lounge");
const SPARE_PHOTOS = ABOUT_CAMPUS.photos.filter(
  (photo) => photo.id !== "lab" && photo.id !== "lounge",
);

function useSceneProgress() {
  const [target, setTarget] = createSignal<HTMLElement>();
  const { scrollYProgress } = useScroll({ target, offset: SCENE_OFFSET });
  return [setTarget, scrollYProgress] as const;
}

function VastScene(props: { value: CultureValue }) {
  const [ref, progress] = useSceneProgress();
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [0, 0.7], [1.18, 1]);

  return (
    <article ref={ref}>
      <RiseReveal sx={[styles.figure, styles.vastFigure]}>
        <figure {...stylex.attrs(styles.figure)}>
          <div {...stylex.attrs(styles.frame, styles.vastFrame)}>
            <m.img
              src={ABOUT_MOMENT.image}
              alt={ABOUT_MOMENT.alt}
              loading="lazy"
              decoding="async"
              {...stylex.attrs(styles.fill, styles.vastImage)}
              style={{ scale: reduce() ? 1 : scale }}
            />
          </div>
          <figcaption {...stylex.attrs(styles.caption, styles.vastCaption)}>
            {ABOUT_MOMENT.caption}
          </figcaption>
        </figure>
      </RiseReveal>
      <div {...stylex.attrs(styles.vastText)}>
        <RiseReveal delay={0.15} sx={styles.vastBody}>
          <h3 {...stylex.attrs(styles.valueTitle)}>{props.value.title}</h3>
          <p {...stylex.attrs(styles.desc)}>{props.value.desc}</p>
        </RiseReveal>
      </div>
    </article>
  );
}

function RoomScene(props: { value: CultureValue; photo?: CampusShot }) {
  const [ref, progress] = useSceneProgress();
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [0, 1], [1, 1.16]);

  return (
    <article ref={ref} {...stylex.attrs(styles.sceneGrid)}>
      <Show when={props.photo}>
        {(photo) => (
          <RiseReveal sx={styles.sceneFigure}>
            <figure {...stylex.attrs(styles.figure)}>
              <div {...stylex.attrs(styles.frame, styles.sceneFrame)}>
                <m.img
                  src={photo().src}
                  alt={photo().alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.attrs(styles.fill)}
                  style={{ scale: reduce() ? 1 : scale }}
                />
              </div>
              <figcaption {...stylex.attrs(styles.caption)}>{photo().caption}</figcaption>
            </figure>
          </RiseReveal>
        )}
      </Show>
      <RiseReveal delay={0.15} sx={styles.sceneText}>
        <h3 {...stylex.attrs(styles.valueTitle)}>{props.value.title}</h3>
        <p {...stylex.attrs(styles.desc)}>{props.value.desc}</p>
      </RiseReveal>
    </article>
  );
}

function HumanScene(props: { value: CultureValue; photo?: CampusShot }) {
  const [ref, progress] = useSceneProgress();
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [0, 0.8], [1.5, HUMAN_ZOOM]);

  return (
    <article ref={ref} {...stylex.attrs(styles.sceneGrid)}>
      <Show when={props.photo}>
        {(photo) => (
          <RiseReveal sx={styles.sceneFigure}>
            <figure {...stylex.attrs(styles.figure)}>
              <div {...stylex.attrs(styles.frame, styles.sceneFrame)}>
                <m.img
                  src={photo().large}
                  alt={photo().alt}
                  loading="lazy"
                  decoding="async"
                  {...stylex.attrs(styles.fill, styles.humanImage)}
                  style={{ scale: reduce() ? HUMAN_ZOOM : scale }}
                />
              </div>
              <figcaption {...stylex.attrs(styles.caption)}>{photo().caption}</figcaption>
            </figure>
          </RiseReveal>
        )}
      </Show>
      <RiseReveal delay={0.15} sx={styles.sceneText}>
        <h3 {...stylex.attrs(styles.valueTitle)}>{props.value.title}</h3>
        <p {...stylex.attrs(styles.desc)}>{props.value.desc}</p>
      </RiseReveal>
    </article>
  );
}

export function CultureScenes(props: { sx?: stylex.StyleXStyles }) {
  const [section, setSection] = createSignal<HTMLElement>();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const wash = useTransform(
    scrollYProgress,
    [0.12, 0.45, 0.78],
    [WASH_SAND, WASH_BLUE, WASH_GREEN],
  );

  return (
    <m.section
      ref={setSection}
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.attrs(styles.section, props.sx)}
      style={{ backgroundColor: wash }}
    >
      <div {...stylex.attrs(styles.shell)}>
        <RiseReveal sx={styles.header}>
          <p lang="en" {...stylex.attrs(styles.eyebrow)}>
            {ABOUT_CULTURE.eyebrow}
          </p>
          <h2 id="about-culture-title" {...stylex.attrs(styles.title)}>
            {ABOUT_CULTURE.title}
          </h2>
        </RiseReveal>
        <div {...stylex.attrs(styles.story)}>
          {QUIET ? <VastScene value={QUIET} /> : null}
          {PROFESSIONAL ? <RoomScene value={PROFESSIONAL} photo={LAB} /> : null}
          {TOGETHER ? <HumanScene value={TOGETHER} photo={LOUNGE} /> : null}
          {MORE_VALUES.map((value, index) =>
            index % 2 === 0 ? (
              <RoomScene value={value} photo={SPARE_PHOTOS[index % SPARE_PHOTOS.length]} />
            ) : (
              <HumanScene value={value} photo={SPARE_PHOTOS[index % SPARE_PHOTOS.length]} />
            ),
          )}
        </div>
      </div>
    </m.section>
  );
}
