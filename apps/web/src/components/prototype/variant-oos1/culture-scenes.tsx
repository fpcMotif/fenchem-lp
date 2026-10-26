import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "./about-data";
import { Reveal } from "./subpage-kit";
import { color, layout, media } from "./tokens.stylex";

const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const PETAL = "/prototype/about/figma/culture-card-petal.jpg";
const WAVE = "/prototype/about/figma/culture-card-wave.jpg";
const DESC_GRAY = "#595959";

const CULTURE_TITLES: Record<string, string> = { 专业和专注: "专业与专注" };

const cultureValue = (title: string) => {
  const value = ABOUT_CULTURE.values.find((entry) => entry.title === title);
  if (!value) throw new Error(`ABOUT_CULTURE has no value titled ${title}`);
  return { title: CULTURE_TITLES[value.title] ?? value.title, desc: value.desc };
};

const styles = stylex.create({
  section: {
    paddingTop: { default: 72, [DESKTOP]: 143 },
    paddingBottom: { default: 72, [DESKTOP]: 128 },
    backgroundColor: colors.paper,
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
  title: {
    margin: 0,
    paddingTop: 12,
    fontSize: { default: 26, [media.tablet]: 32, [DESKTOP]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    textWrap: "balance",
    color: color.ink,
  },
  cards: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "repeat(3, minmax(0, 1fr))" },
    gap: { default: 16, [LG]: 24 },
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    aspectRatio: "1 / 1",
    overflow: "hidden",
    boxSizing: "border-box",
    paddingTop: "37.92%",
    paddingInline: "8.33%",
    backgroundColor: colors.paper,
    isolation: "isolate",
  },
  layer: {
    position: "absolute",
    zIndex: -1,
    display: "block",
    maxWidth: "none",
    pointerEvents: "none",
  },
  layerBox: (left: string, top: string, width: string, height: string, blur: number) => ({
    left,
    top,
    width,
    height,
    filter: `blur(${blur}px)`,
  }),
  cardTitle: {
    margin: 0,
    fontSize: { default: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: 1.2,
    textAlign: "center",
    color: color.ink,
  },
  cardDesc: {
    alignSelf: "stretch",
    maxWidth: 320,
    margin: 0,
    fontSize: 16,
    lineHeight: 1.2,
    color: DESC_GRAY,
  },
});

type Layer = { src: string; box: [string, string, string, string]; blur: number };

const PETAL_LAYER: Layer = { src: PETAL, box: ["-86.98%", "0%", "614.1%", "263%"], blur: 40 };
const WAVE_WIDE: Layer = {
  src: WAVE,
  box: ["-1208.3%", "-20.01%", "2079.4%", "891.2%"],
  blur: 10,
};

const CARDS = [
  {
    value: cultureValue("安静与坚持"),
    layers: [PETAL_LAYER, { src: WAVE, box: ["-525.4%", "-13.36%", "942.4%", "404.3%"], blur: 10 }],
  },
  {
    value: cultureValue("专业和专注"),
    layers: [
      PETAL_LAYER,
      WAVE_WIDE,
      { src: WAVE, box: ["-46.41%", "-28.46%", "843%", "410.3%"], blur: 64.2 },
    ],
  },
  {
    value: cultureValue("合作与创新"),
    layers: [
      PETAL_LAYER,
      WAVE_WIDE,
      { src: WAVE, box: ["-389.6%", "-8.63%", "843%", "410.3%"], blur: 64.2 },
    ],
  },
] satisfies { value: ReturnType<typeof cultureValue>; layers: Layer[] }[];

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
        <div {...stylex.props(styles.cards)}>
          {CARDS.map((card, index) => (
            <Reveal key={card.value.title} as="article" step={index} sx={styles.card}>
              {card.layers.map((layer) => (
                <img
                  key={layer.box.join()}
                  src={layer.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(styles.layer, styles.layerBox(...layer.box, layer.blur))}
                />
              ))}
              <h3 {...stylex.props(styles.cardTitle)}>{card.value.title}</h3>
              <p {...stylex.props(styles.cardDesc)}>{card.value.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
