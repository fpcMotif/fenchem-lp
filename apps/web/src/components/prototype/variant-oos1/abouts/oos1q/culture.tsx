import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE, ABOUT_HERO } from "../../about-data";
import { Reveal, Section } from "./shared";
import { font, step, tone } from "./tokens.stylex";

const s = stylex.create({
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.lg]: 24, [breakpoints.xl]: 32 },
    rowGap: { default: 72, [breakpoints.md]: 88, [breakpoints.lg]: 120 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  line: {
    position: "relative",
    minWidth: 0,
  },
  first: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 8" },
  },
  second: {
    gridColumn: { default: "auto", [breakpoints.lg]: "4 / 11" },
    marginLeft: { default: 24, [breakpoints.lg]: 0 },
  },
  third: {
    gridColumn: { default: "auto", [breakpoints.lg]: "7 / 13" },
    marginLeft: { default: 48, [breakpoints.lg]: 0 },
  },
  glyph: {
    position: "absolute",
    top: { default: -28, [breakpoints.lg]: -24 },
    right: 0,
    fontFamily: font.cjk,
    fontSize: { default: 96, [breakpoints.lg]: 144 },
    fontWeight: 400,
    lineHeight: 1,
    userSelect: "none",
    pointerEvents: "none",
  },
  glyphBlue: { color: tone.glyphBlue },
  glyphSand: { color: tone.glyphSand },
  glyphGreen: { color: tone.glyphGreen },
  text: {
    position: "relative",
    maxWidth: "24em",
  },
  title: {
    margin: 0,
    fontSize: { default: step.title, [breakpoints.xl]: 32 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.14em",
    color: tone.ink,
  },
  desc: {
    margin: 0,
    marginTop: 16,
    fontSize: step.body,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: tone.body,
    textWrap: "pretty",
  },
});

const PLACEMENT = [s.first, s.second, s.third] as const;
const TONES = {
  blue: s.glyphBlue,
  sand: s.glyphSand,
  green: s.glyphGreen,
} as const;

export function Culture() {
  const chip = ABOUT_HERO.navChips[2];

  return (
    <Section id={chip.id} label={chip.english}>
      <ul {...stylex.props(s.list)}>
        {ABOUT_CULTURE.values.map((value, idx) => (
          <Reveal key={value.title} as="li" sx={[s.line, PLACEMENT[idx]]}>
            <span aria-hidden="true" {...stylex.props(s.glyph, TONES[value.tone])}>
              {value.glyph}
            </span>
            <div {...stylex.props(s.text)}>
              <h3 {...stylex.props(s.title)}>{value.title}</h3>
              <p {...stylex.props(s.desc)}>{value.desc}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
