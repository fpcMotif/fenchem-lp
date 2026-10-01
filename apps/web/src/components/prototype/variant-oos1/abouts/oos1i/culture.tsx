import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../about-data";
import { Reveal } from "./motion";
import { Section, SectionName, base } from "./primitives";
import { font, media, tone } from "./shear.stylex";

const S = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  value: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 20,
    boxSizing: "border-box",
    paddingBlock: { default: 36, [breakpoints.md]: 8 },
    paddingInlineStart: { default: 0, [breakpoints.md]: 40 },
    paddingInlineEnd: { default: 0, [breakpoints.md]: 32 },
    borderStyle: "solid",
    borderColor: tone.rule,
    borderWidth: 0,
  },
  divided: {
    borderTopWidth: { default: 1, [breakpoints.md]: 0 },
    borderInlineStartWidth: { default: 0, [breakpoints.md]: 1 },
  },
  glyph: {
    fontFamily: font.sans,
    fontSize: { default: 88, [media.desktop]: 120 },
    fontWeight: 500,
    lineHeight: 1,
  },
  glyphBlue: { color: tone.glyphBlue },
  glyphSand: { color: tone.glyphSand },
  glyphGreen: { color: tone.glyphGreen },
});

const GLYPH_TONES = {
  blue: S.glyphBlue,
  sand: S.glyphSand,
  green: S.glyphGreen,
} as const;

export function Culture() {
  return (
    <Section id="about-culture" labelledBy="about-culture-title" surface="paper">
      <SectionName id="about-culture-title">{ABOUT_CULTURE.title}</SectionName>
      <div {...stylex.props(base.shell, base.inset)}>
        <ul {...stylex.props(S.grid)}>
          {ABOUT_CULTURE.values.map((value, index) => (
            <Reveal
              key={value.title}
              as="li"
              delay={index * 100}
              sx={[S.value, index > 0 && S.divided]}
            >
              <span aria-hidden="true" {...stylex.props(S.glyph, GLYPH_TONES[value.tone])}>
                {value.glyph}
              </span>
              <h3 {...stylex.props(base.headline)}>{value.title}</h3>
              <p {...stylex.props(base.prose)}>{value.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
