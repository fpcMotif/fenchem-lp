import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { STATS } from "../../content";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { font, range, step, tone } from "./tokens.stylex";

const s = stylex.create({
  cols: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.lg]: 24, [breakpoints.xl]: 32 },
    rowGap: 48,
  },
  copy: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 6" },
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, [breakpoints.xl]: 40 },
    maxWidth: "36em",
  },
  name: {
    margin: 0,
    fontSize: { default: step.title, [breakpoints.md]: step.display },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  english: {
    marginTop: 12,
    fontSize: step.body,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: tone.body,
  },
  lead: {
    margin: 0,
    fontSize: { default: step.body, [breakpoints.xl]: step.lead },
    fontWeight: 400,
    lineHeight: 1.9,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "pretty",
  },
  networkLabel: {
    marginBottom: 12,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 20,
    rowGap: 8,
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: step.body,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  countryMore: {
    color: tone.body,
  },
  photo: {
    gridColumn: { default: "auto", [breakpoints.lg]: "7 / 13" },
    paddingTop: { default: 0, [breakpoints.lg]: 72 },
  },
  frame: {
    aspectRatio: "3 / 2",
  },
  stats: {
    margin: 0,
    marginTop: { default: 72, [breakpoints.xl]: 120 },
    padding: 0,
    listStyle: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  stat: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [range.tablet]: "repeat(2, minmax(0, 1fr))",
      [range.wide]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [range.tablet]: 32, [range.wide]: 32 },
    rowGap: 8,
    alignItems: "end",
    paddingBlock: { default: 24, [breakpoints.xl]: 36 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  statFigure: {
    gridColumn: { default: "auto", [range.wide]: "1 / 7" },
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    fontFamily: font.latin,
    color: tone.ink,
  },
  statValue: {
    fontSize: { default: "56px", [breakpoints.xl]: "80px" },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.03em",
  },
  statUnit: {
    fontSize: { default: step.title, [breakpoints.xl]: step.display },
    fontWeight: 500,
    lineHeight: 1,
    color: colors.brandBlue700,
  },
  statText: {
    gridColumn: { default: "auto", [range.wide]: "7 / 13" },
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  statCaption: {
    margin: 0,
    fontSize: step.body,
    letterSpacing: "0.08em",
    color: tone.body,
  },
});

export function Profile() {
  const chip = ABOUT_HERO.navChips[0];
  return (
    <Section id={chip.id} label={chip.english} background={ui.onPaper}>
      <div {...stylex.attrs(s.cols)}>
        <div {...stylex.attrs(s.copy)}>
          <Reveal>
            <h3 {...stylex.attrs(s.name)}>{ABOUT_HERO.title}</h3>
            <div lang="en" {...stylex.attrs(s.english)}>
              {ABOUT_HERO.englishTitle}
            </div>
          </Reveal>
          <Reveal step={1}>
            <p {...stylex.attrs(s.lead)}>{ABOUT_HERO.lead}</p>
          </Reveal>
          <Reveal step={2}>
            <p {...stylex.attrs(ui.label, s.networkLabel)}>{ABOUT_HERO.networkLabel}</p>
            <ul {...stylex.attrs(s.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li>{country}</li>
              ))}
              <li {...stylex.attrs(s.countryMore)}>等地</li>
            </ul>
          </Reveal>
        </div>
        <div {...stylex.attrs(s.photo)}>
          <Reveal as="figure" sx={ui.figure}>
            <div {...stylex.attrs(ui.frame, s.frame)}>
              <img
                src={ABOUT_HERO.lobbyImage}
                alt="Fenchem headquarters lobby with a curved ceiling and marble floor"
                loading="lazy"
                decoding="async"
                {...stylex.attrs(ui.fill)}
              />
            </div>
            <figcaption {...stylex.attrs(ui.caption)}>{ABOUT_HERO.lobbyCaption}</figcaption>
          </Reveal>
        </div>
      </div>
      <h3 {...stylex.attrs(ui.srOnly)}>Growth figures</h3>
      <ul {...stylex.attrs(s.stats)}>
        {STATS.map((stat, idx) => (
          <Reveal as="li" step={idx} sx={s.stat}>
            <div {...stylex.attrs(s.statFigure)}>
              <span {...stylex.attrs(s.statValue)}>{stat.value}</span>
              {stat.unit ? <span {...stylex.attrs(s.statUnit)}>{stat.unit}</span> : null}
            </div>
            <div {...stylex.attrs(s.statText)}>
              <p {...stylex.attrs(ui.label)}>{stat.label}</p>
              <p {...stylex.attrs(s.statCaption)}>{stat.caption}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
