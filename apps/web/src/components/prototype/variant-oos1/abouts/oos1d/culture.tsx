import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE, ABOUT_HERO, ABOUT_MOMENT } from "../../about-data";
import { Figure, Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { font, step, tone } from "./tokens.stylex";

const s = stylex.create({
  ratio: {
    aspectRatio: "1.618 / 1",
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 768px)"]: "repeat(13, minmax(0, 1fr))",
    },
    rowGap: { default: 20, ["@media (min-width: 768px)"]: 8 },
    alignItems: "center",
    paddingBlock: { default: 40, ["@media (min-width: 1280px)"]: 56 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  rowFirst: {
    paddingTop: 0,
    borderTopWidth: 0,
  },
  glyphCell: {
    gridColumn: { default: "auto", ["@media (min-width: 768px)"]: "span 5" },
  },
  glyphCellWide: {
    gridColumn: { default: "auto", ["@media (min-width: 768px)"]: "span 6" },
  },
  textCell: {
    gridColumn: { default: "auto", ["@media (min-width: 768px)"]: "span 8" },
    minWidth: 0,
  },
  textCellNarrow: {
    gridColumn: { default: "auto", ["@media (min-width: 768px)"]: "span 7" },
  },
  glyph: {
    display: "block",
    fontFamily: font.cjk,
    fontSize: { default: "88px", ["@media (min-width: 768px)"]: step.huge },
    fontWeight: 500,
    lineHeight: 1,
  },
  glyphBlue: { color: tone.glyphBlue },
  glyphSand: { color: tone.glyphSand },
  glyphGreen: { color: tone.glyphGreen },
  valueTitle: {
    margin: 0,
    marginBottom: 16,
    fontSize: { default: step.lead, ["@media (min-width: 1280px)"]: step.title },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.08em",
    color: tone.ink,
  },
  valueDesc: {
    margin: 0,
    maxWidth: "26em",
    fontSize: step.body,
    lineHeight: 1.9,
    letterSpacing: "0.04em",
    color: tone.body,
    textWrap: "pretty",
  },
});

const GLYPH_TONES = {
  blue: s.glyphBlue,
  sand: s.glyphSand,
  green: s.glyphGreen,
} as const;

export function Culture() {
  const chip = ABOUT_HERO.navChips[2];
  const lastIndex = ABOUT_CULTURE.values.length - 1;

  return (
    <Section id={chip.id} label={ABOUT_CULTURE.eyebrow} background={ui.onPaper}>
      <div {...stylex.attrs(ui.phi)}>
        <div {...stylex.attrs(ui.asideCol)}>
          <div {...stylex.attrs(ui.asideSticky)}>
            <Figure
              src={ABOUT_MOMENT.image}
              alt={ABOUT_MOMENT.alt}
              caption={ABOUT_MOMENT.caption}
              ratio={s.ratio}
            />
          </div>
        </div>
        <ul {...stylex.attrs(ui.main, s.list)}>
          {ABOUT_CULTURE.values.map((value, idx) => {
            const isLast = idx === lastIndex;
            return (
              <Reveal as="li" sx={[s.row, idx === 0 && s.rowFirst]}>
                <div {...stylex.attrs(s.glyphCell, isLast && s.glyphCellWide)}>
                  <span aria-hidden="true" {...stylex.attrs(s.glyph, GLYPH_TONES[value.tone])}>
                    {value.glyph}
                  </span>
                </div>
                <div {...stylex.attrs(s.textCell, isLast && s.textCellNarrow)}>
                  <h3 {...stylex.attrs(s.valueTitle)}>{value.title}</h3>
                  <p {...stylex.attrs(s.valueDesc)}>{value.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
