import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../about-data";
import { Reveal, SectionName } from "./parts";
import { base, ty } from "./shared";
import { hue } from "./theme.stylex";

const styles = stylex.create({
  culture: {
    backgroundColor: hue.page,
  },
  values: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 40,
    rowGap: 48,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  value: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingTop: 28,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: hue.hairline,
  },
  glyph: {
    fontSize: 88,
    fontWeight: 500,
    lineHeight: 1,
  },
  glyphBlue: { color: hue.glyphBlue },
  glyphSand: { color: hue.glyphSand },
  glyphGreen: { color: hue.glyphGreen },
  title: {
    margin: 0,
    fontSize: "clamp(24px, 2.4vw, 32px)",
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: hue.ink,
  },
});

const TONES = {
  blue: styles.glyphBlue,
  sand: styles.glyphSand,
  green: styles.glyphGreen,
} as const;

export function Culture() {
  return (
    <section
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.props(base.section, base.anchor, styles.culture)}
    >
      <SectionName id="about-culture-title">企业文化</SectionName>
      <div {...stylex.props(base.shell)}>
        <ul {...stylex.props(styles.values)}>
          {ABOUT_CULTURE.values.map((value, idx) => (
            <Reveal key={value.title} as="li" step={idx} sx={styles.value}>
              <span aria-hidden="true" {...stylex.props(styles.glyph, TONES[value.tone])}>
                {value.glyph}
              </span>
              <h3 {...stylex.props(styles.title)}>{value.title}</h3>
              <p {...stylex.props(ty.body)}>{value.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
