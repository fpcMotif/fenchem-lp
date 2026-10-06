import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../../about-data";
import { Sheet } from "../sheet";
import { base, Reveal } from "../shared";
import { CULTURE_SHEET } from "../sheets";
import { color, font, media } from "../tokens.stylex";

const styles = stylex.create({
  values: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.mdUp]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 64,
    rowGap: 64,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  value: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  glyph: {
    marginBottom: { default: 8, [media.lgUp]: 14 },
    fontFamily: font.cjk,
    fontSize: { default: 96, [media.lgUp]: 120 },
    fontWeight: 500,
    lineHeight: 1,
    userSelect: "none",
  },
  glyphBlue: { color: color.glyphBlue },
  glyphSand: { color: color.glyphSand },
  glyphGreen: { color: color.glyphGreen },
  title: {
    margin: 0,
    fontSize: { default: 24, [media.lgUp]: 28 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.1em",
    color: color.ink,
  },
  desc: {
    margin: 0,
    maxWidth: "22em",
    fontSize: 15,
    lineHeight: 1.95,
    letterSpacing: "0.04em",
    color: color.body,
  },
});

const GLYPH_TONES = {
  blue: styles.glyphBlue,
  sand: styles.glyphSand,
  green: styles.glyphGreen,
} as const;

export function CultureSheet() {
  return (
    <Sheet def={CULTURE_SHEET}>
      <ul {...stylex.props(styles.values)}>
        {ABOUT_CULTURE.values.map((value, idx) => (
          <Reveal key={value.title} as="li" step={idx} sx={styles.value}>
            <span aria-hidden="true" {...stylex.props(styles.glyph, GLYPH_TONES[value.tone])}>
              {value.glyph}
            </span>
            <h3 {...stylex.props(styles.title)}>{value.title}</h3>
            <p {...stylex.props(styles.desc)}>
              <span {...stylex.props(base.balance)}>{value.desc}</span>
            </p>
          </Reveal>
        ))}
      </ul>
    </Sheet>
  );
}
