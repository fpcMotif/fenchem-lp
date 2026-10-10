import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE, ABOUT_HERO } from "../../about-data";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { font, step, tone } from "./tokens.stylex";

const s = stylex.create({
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.lg]: 32, [breakpoints.xl]: 40 },
    rowGap: 12,
    alignItems: "center",
    paddingBlock: { default: 32, [breakpoints.md]: 40, [breakpoints.xl]: 48 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  glyph: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 4" },
    fontFamily: font.cjk,
    fontSize: { default: "96px", [breakpoints.md]: "128px", [breakpoints.xl]: "160px" },
    fontWeight: 400,
    lineHeight: 1,
    userSelect: "none",
  },
  glyphBlue: { color: tone.glyphBlue },
  glyphSand: { color: tone.glyphSand },
  glyphGreen: { color: tone.glyphGreen },
  title: {
    gridColumn: { default: "auto", [breakpoints.lg]: "4 / 7" },
    margin: 0,
    fontSize: { default: step.title, [breakpoints.md]: step.headline },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  desc: {
    gridColumn: { default: "auto", [breakpoints.lg]: "7 / 13" },
    margin: 0,
    maxWidth: "30em",
    fontSize: step.body,
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: tone.body,
    textWrap: "balance",
  },
});

const GLYPH_TONE = {
  blue: s.glyphBlue,
  sand: s.glyphSand,
  green: s.glyphGreen,
} as const;

export function Culture() {
  const chip = ABOUT_HERO.navChips[2];

  return (
    <Section id={chip.id} label={ABOUT_CULTURE.eyebrow} background={ui.onPage}>
      <ul {...stylex.props(s.list)}>
        {ABOUT_CULTURE.values.map((value) => (
          <Reveal key={value.title} as="li" sx={s.row}>
            <span aria-hidden="true" {...stylex.props(s.glyph, GLYPH_TONE[value.tone])}>
              {value.glyph}
            </span>
            <h3 {...stylex.props(s.title)}>{value.title}</h3>
            <p {...stylex.props(s.desc)}>{value.desc}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
