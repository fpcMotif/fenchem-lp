import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../about-data";
import { NodeMarker, Reveal, Section, Shell } from "./layout";
import { color, font, media } from "./palette.stylex";

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [media.mdOnly]: 32, [breakpoints.lg]: 64 },
    rowGap: 48,
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontFamily: font.cjk,
  },
  glyph: {
    display: "block",
    marginBottom: 20,
    marginInlineStart: -4,
    fontSize: { default: 96, [media.mdOnly]: 88, [breakpoints.lg]: 120 },
    fontWeight: 500,
    lineHeight: 1,
  },
  glyphBlue: { color: color.glyphBlue },
  glyphSand: { color: color.glyphSand },
  glyphGreen: { color: color.glyphGreen },
  title: {
    margin: 0,
    marginBottom: 12,
    fontSize: { default: 22, [breakpoints.xl]: 24 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.08em",
    color: color.ink,
  },
  desc: {
    margin: 0,
    maxWidth: "20em",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: color.body,
    textWrap: "pretty",
  },
});

const GLYPH_TONES = {
  blue: styles.glyphBlue,
  sand: styles.glyphSand,
  green: styles.glyphGreen,
} as const;

export function Culture() {
  return (
    <Section id="about-culture" name={ABOUT_CULTURE.title}>
      <Shell>
        <NodeMarker />
        <Reveal>
          <ul {...stylex.props(styles.grid)}>
            {ABOUT_CULTURE.values.map((value) => (
              <li key={value.title}>
                <span aria-hidden="true" {...stylex.props(styles.glyph, GLYPH_TONES[value.tone])}>
                  {value.glyph}
                </span>
                <h3 {...stylex.props(styles.title)}>{value.title}</h3>
                <p {...stylex.props(styles.desc)}>{value.desc}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Shell>
    </Section>
  );
}
