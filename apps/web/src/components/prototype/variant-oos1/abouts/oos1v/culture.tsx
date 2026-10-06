import * as stylex from "@stylexjs/stylex";
import { useRef } from "react";

import { ABOUT_CULTURE } from "../../about-data";
import { campusPhoto, type CampusPhoto } from "./campus-hang";
import { BrushCoat, shared, useDeveloped } from "./cyanotype";
import { curve, media, tone } from "./tokens.stylex";

type CultureValue = (typeof ABOUT_CULTURE.values)[number];
type SceneLayout = "left" | "right" | "wide";

const SCENES: readonly {
  value: CultureValue;
  photo: CampusPhoto;
  narration: string;
  layout: SceneLayout;
}[] = [
  {
    value: ABOUT_CULTURE.values[0],
    photo: campusPhoto("lab"),
    narration: "在实验室里，",
    layout: "left",
  },
  {
    value: ABOUT_CULTURE.values[1],
    photo: campusPhoto("grounds"),
    narration: "在园区的草地上，",
    layout: "right",
  },
  {
    value: ABOUT_CULTURE.values[2],
    photo: campusPhoto("lounge"),
    narration: "在人们相遇的地方，",
    layout: "wide",
  },
];

export function CultureStory() {
  return (
    <section
      id="about-culture"
      aria-labelledby="about-culture-heading"
      {...stylex.props(styles.section)}
    >
      <h2 id="about-culture-heading" {...stylex.props(shared.srOnly)}>
        {ABOUT_CULTURE.title}
      </h2>
      <div {...stylex.props(styles.sheet)}>
        <BrushCoat />
        {SCENES.map((scene) => (
          <Scene key={scene.value.title} {...scene} />
        ))}
      </div>
    </section>
  );
}

function Scene({
  value,
  photo,
  narration,
  layout,
}: {
  value: CultureValue;
  photo: CampusPhoto;
  narration: string;
  layout: SceneLayout;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const developed = useDeveloped(ref, 0.3);

  return (
    <div ref={ref} {...stylex.props(styles.scene)}>
      <div {...stylex.props(styles.image, imageLayout[layout])}>
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          {...stylex.props(shared.fill, shared.cyanotype, styles.feather, focus[layout])}
        />
        <span
          aria-hidden="true"
          {...stylex.props(styles.imageVeil, styles.feather, developed && styles.veilCleared)}
        />
      </div>
      <div {...stylex.props(styles.words, wordsLayout[layout], developed && styles.wordsLit)}>
        <p {...stylex.props(styles.narration)}>{narration}</p>
        <h3 {...stylex.props(styles.title)}>{value.title}</h3>
        <p {...stylex.props(styles.desc)}>{value.desc}</p>
      </div>
    </div>
  );
}

const FEATHER =
  "linear-gradient(to right, transparent, #000 13%, #000 87%, transparent), linear-gradient(to bottom, transparent, #000 13%, #000 87%, transparent)";

const styles = stylex.create({
  section: {
    position: "relative",
    paddingTop: { default: 84, [media.desktop]: 144 },
    paddingInline: { default: 16, [media.tablet]: 40, [media.desktop]: "min(120px, 8.333vw)" },
    overflowX: "clip",
    scrollMarginTop: 152,
  },
  sheet: {
    position: "relative",
    isolation: "isolate",
    maxWidth: 1200,
    marginInline: "auto",
    paddingBlock: { default: 64, [media.tablet]: 96, [media.desktop]: 128 },
    paddingInline: { default: 28, [media.tablet]: 56, [media.desktop]: 88 },
    display: "flex",
    flexDirection: "column",
    rowGap: { default: 80, [media.desktop]: 128 },
    color: tone.light,
  },
  scene: {
    display: { default: "block", [media.wide]: "grid" },
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    columnGap: 24,
    alignItems: "center",
  },
  veilCleared: {
    opacity: 0,
  },
  image: {
    position: "relative",
  },
  feather: {
    maskImage: FEATHER,
    maskComposite: "intersect",
  },
  imageVeil: {
    position: "absolute",
    inset: 0,
    backgroundColor: tone.paper,
    opacity: { default: 0.8, [media.reduce]: 0 },
    transitionProperty: "opacity",
    transitionDuration: "2600ms",
    transitionTimingFunction: curve.develop,
  },
  words: {
    position: "relative",
    marginTop: { default: 28, [media.wide]: 0 },
    opacity: { default: 0.7, [media.reduce]: 1 },
    transitionProperty: "opacity",
    transitionDuration: "2000ms",
    transitionDelay: "600ms",
    transitionTimingFunction: curve.develop,
  },
  wordsLit: {
    opacity: 1,
  },
  narration: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.6,
    letterSpacing: "0.08em",
    color: tone.lightQuiet,
  },
  title: {
    marginBlock: "12px 0",
    fontSize: { default: 30, [media.desktop]: 44 },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.06em",
    color: tone.light,
    textShadow: "0 0 1px rgba(255, 255, 255, 0.5), 0 0 18px rgba(186, 212, 236, 0.28)",
  },
  desc: {
    marginBlock: "18px 0",
    maxWidth: "22em",
    fontSize: 16,
    lineHeight: 1.95,
    color: tone.lightText,
    textWrap: "pretty",
  },
});

const imageLayout = stylex.create({
  left: {
    gridColumn: "1 / span 8",
    aspectRatio: "1400 / 577",
  },
  right: {
    gridColumn: { default: "8 / span 4", [media.tablet]: "7 / span 6" },
    gridRow: 1,
    aspectRatio: "2 / 3",
    width: { default: "78%", [media.wide]: "auto" },
    marginInlineStart: { default: "auto", [media.wide]: 0 },
  },
  wide: {
    gridColumn: "3 / span 10",
    aspectRatio: "3 / 2",
  },
});

const wordsLayout = stylex.create({
  left: {
    gridColumn: "9 / span 4",
    alignSelf: "end",
  },
  right: {
    gridColumn: { default: "2 / span 5", [media.tablet]: "1 / span 6" },
    gridRow: 1,
  },
  wide: {
    gridColumn: { default: "1 / span 6", [media.tablet]: "1 / span 9" },
    gridRow: 2,
    marginTop: { default: 28, [media.wide]: 40 },
  },
});

const focus = stylex.create({
  left: { objectPosition: "50% 50%" },
  right: { objectPosition: "62% 50%" },
  wide: { objectPosition: "50% 62%" },
});
