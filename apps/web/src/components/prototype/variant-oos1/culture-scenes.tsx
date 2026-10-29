import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

import { ABOUT_CULTURE } from "./about-data";
import { Reveal, kitStyles } from "./subpage-kit";
import { color, media } from "./tokens.stylex";

const DESKTOP = breakpoints.xl;
const LG = breakpoints.lg;
const TILE_SIZE = 384;
const COMPACT_TILE = 112;
const STROKE_WIDTH = 5;

const CULTURE_TITLES: Record<string, string> = { 专业和专注: "专业与专注" };

const cultureValue = (title: string) => {
  const value = ABOUT_CULTURE.values.find((entry) => entry.title === title);
  if (!value) throw new Error(`ABOUT_CULTURE has no value titled ${title}`);
  return { title: CULTURE_TITLES[value.title] ?? value.title, desc: value.desc };
};

const styles = stylex.create({
  section: {
    backgroundColor: colors.paper,
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
    gap: { default: 20, [LG]: 24 },
  },
  card: {
    display: "flex",
    flexDirection: { default: "row", [LG]: "column" },
    alignItems: { default: "center", [LG]: "stretch" },
    gap: { default: 16, [LG]: 0 },
  },
  tile: {
    flexShrink: 0,
    width: { default: COMPACT_TILE, [LG]: "auto" },
    aspectRatio: "1 / 1",
    overflow: "hidden",
  },
  copy: {
    minWidth: 0,
    textAlign: { default: "start", [LG]: "center" },
  },
  art: {
    display: "block",
    width: "100%",
    height: "100%",
  },
  cardTitle: {
    margin: 0,
    marginTop: { default: 0, [LG]: 20 },
    fontSize: { default: 18, [LG]: 22, [DESKTOP]: 24 },
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: color.ink,
  },
  cardDesc: {
    margin: 0,
    marginTop: { default: 6, [LG]: 10 },
    fontSize: 14,
    lineHeight: 1.8,
    letterSpacing: "0.02em",
    color: color.bodyText,
    textWrap: "balance",
  },
});

const CARDS = [
  {
    value: cultureValue("安静与坚持"),
    fill: "#6a8ece",

    art: (
      <g stroke="#394f77">
        <ellipse cx={191.505} cy={95.609} rx={93.5} ry={34} />
        <ellipse cx={191.005} cy={170.609} rx={113} ry={41} />
        <ellipse cx={191.505} cy={266.609} rx={151.5} ry={55} />
      </g>
    ),
  },
  {
    value: cultureValue("专业和专注"),
    fill: "#e3e3e3",

    art: (
      <g stroke="#8e8e93">
        <circle cx={189.005} cy={191.609} r={66.0714} />
        <circle cx={189.005} cy={191.609} r={111.786} />
        <circle cx={189.005} cy={191.609} r={157.5} />
      </g>
    ),
  },
  {
    value: cultureValue("合作与创新"),
    fill: "#93c170",

    art: (
      <path
        d="M309.71 40.609H159.576L61.005 246.102H167.159L83.752 349.609L337 200.437H208.1L309.71 40.609Z"
        stroke="#558b2b"
        strokeLinejoin="round"
      />
    ),
  },
] satisfies { value: ReturnType<typeof cultureValue>; fill: string; art: ReactNode }[];

export function CultureScenes({ sx }: { sx?: stylex.StyleXStyles }) {
  return (
    <section
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.props(styles.section, sx)}
    >
      <div {...stylex.props(kitStyles.shell, kitStyles.inset120)}>
        <Reveal sx={styles.header}>
          <h2 id="about-culture-title" {...stylex.props(styles.title)}>
            {ABOUT_CULTURE.title}
          </h2>
        </Reveal>
        <div {...stylex.props(styles.cards)}>
          {CARDS.map((card, index) => (
            <Reveal key={card.value.title} as="article" step={index} sx={styles.card}>
              <div {...stylex.props(styles.tile)}>
                <svg
                  viewBox={`0 0 ${TILE_SIZE} ${TILE_SIZE}`}
                  fill="none"
                  strokeWidth={STROKE_WIDTH}
                  aria-hidden="true"
                  focusable="false"
                  {...stylex.props(styles.art)}
                >
                  <rect width={TILE_SIZE} height={TILE_SIZE} fill={card.fill} />
                  {card.art}
                </svg>
              </div>
              <div {...stylex.props(styles.copy)}>
                <h3 {...stylex.props(styles.cardTitle)}>{card.value.title}</h3>
                <p {...stylex.props(styles.cardDesc)}>{card.value.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
