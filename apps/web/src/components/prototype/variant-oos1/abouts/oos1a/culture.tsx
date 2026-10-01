import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../about-data";
import { fonts, media, palette } from "./lattice.stylex";
import { Frame, Reveal, SectionName, shared } from "./parts";

const styles = stylex.create({
  section: {
    backgroundColor: colors.paper,
  },
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(16, minmax(0, 1fr))",
    },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  value: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    paddingBottom: { default: 48, [breakpoints.lg]: 0 },
    paddingInlineEnd: { default: 0, [breakpoints.lg]: 40 },
  },
  one: { gridColumn: { default: null, [breakpoints.lg]: "1 / span 5" } },
  two: { gridColumn: { default: null, [breakpoints.lg]: "6 / span 5" } },
  three: { gridColumn: { default: null, [breakpoints.lg]: "11 / span 6" } },
  glyph: {
    margin: 0,
    marginBottom: { default: 20, [breakpoints.lg]: 32 },
    fontFamily: fonts.cjk,
    fontSize: { default: 120, [media.tablet]: 140, [breakpoints.xl]: 168 },
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
    fontSize: { default: 22, [breakpoints.xl]: 24 },
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
      {...stylex.props(styles.section, shared.anchor)}
    >
      <SectionName id="about-culture-title">企业文化</SectionName>
      <Frame innerSx={shared.sectionPad}>
        <ul {...stylex.props(styles.list)}>
          {ABOUT_CULTURE.values.map((value, index) => (
            <Reveal
              key={value.title}
              as="li"
              step={index}
              sx={[styles.value, COLUMN_STYLES[index]]}
            >
              <p aria-hidden="true" {...stylex.props(styles.glyph, TONES[value.tone])}>
                {value.glyph}
              </p>
              <h3 {...stylex.props(styles.title)}>{value.title}</h3>
              <p {...stylex.props(shared.body)}>{value.desc}</p>
            </Reveal>
          ))}
        </ul>
      </Frame>
    </section>
  );
}
