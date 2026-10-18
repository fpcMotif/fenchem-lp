import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../about-data";
import { fonts, media, palette } from "./lattice.stylex";
import { Frame, Reveal, SectionName } from "./parts";
import { shared } from "./parts-values";

const styles = stylex.create({
  section: {
    backgroundColor: colors.paper,
  },
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1024px)"]: "repeat(16, minmax(0, 1fr))",
    },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  value: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    paddingBottom: { default: 48, ["@media (min-width: 1024px)"]: 0 },
    paddingInlineEnd: { default: 0, ["@media (min-width: 1024px)"]: 40 },
  },
  one: { gridColumn: { default: null, ["@media (min-width: 1024px)"]: "1 / span 5" } },
  two: { gridColumn: { default: null, ["@media (min-width: 1024px)"]: "6 / span 5" } },
  three: { gridColumn: { default: null, ["@media (min-width: 1024px)"]: "11 / span 6" } },
  glyph: {
    margin: 0,
    marginBottom: { default: 20, ["@media (min-width: 1024px)"]: 32 },
    fontFamily: fonts.cjk,
    fontSize: { default: 120, [media.tablet]: 140, ["@media (min-width: 1280px)"]: 168 },
    fontWeight: 500,
    lineHeight: 1,
  },
  blue: { color: palette.glyphBlue },
  sand: { color: palette.glyphSand },
  green: { color: palette.glyphGreen },
  title: {
    margin: 0,
    marginBottom: 12,
    fontFamily: fonts.cjk,
    fontSize: { default: 22, ["@media (min-width: 1280px)"]: 24 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.08em",
    color: palette.ink,
  },
});

const COLUMN_STYLES = [styles.one, styles.two, styles.three] as const;

const TONES = {
  blue: styles.blue,
  sand: styles.sand,
  green: styles.green,
} as const;

export function Culture() {
  return (
    <section
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.attrs(styles.section, shared.anchor)}
    >
      <SectionName id="about-culture-title">{ABOUT_CULTURE.eyebrow}</SectionName>
      <Frame innerSx={shared.sectionPad}>
        <ul {...stylex.attrs(styles.list)}>
          {ABOUT_CULTURE.values.map((value, index) => (
            <Reveal as="li" step={index} sx={[styles.value, COLUMN_STYLES[index]]}>
              <p aria-hidden="true" {...stylex.attrs(styles.glyph, TONES[value.tone])}>
                {value.glyph}
              </p>
              <h3 {...stylex.attrs(styles.title)}>{value.title}</h3>
              <p {...stylex.attrs(shared.body)}>{value.desc}</p>
            </Reveal>
          ))}
        </ul>
      </Frame>
    </section>
  );
}
