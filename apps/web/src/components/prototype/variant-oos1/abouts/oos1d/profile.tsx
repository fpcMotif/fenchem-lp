import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { STATS } from "../../content";
import { Figure, Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { font, step, tone } from "./tokens.stylex";

const s = stylex.create({
  ratio: {
    aspectRatio: "3 / 2",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, ["@media (min-width: 1280px)"]: 40 },
    maxWidth: "36em",
  },
  name: {
    margin: 0,
    fontSize: { default: step.title, ["@media (min-width: 768px)"]: step.display },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  english: {
    marginTop: 16,
    fontSize: step.body,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  lead: {
    margin: 0,
    maxWidth: "32em",
    fontSize: { default: step.body, ["@media (min-width: 1280px)"]: "18px" },
    fontWeight: 400,
    lineHeight: 1.95,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  network: {
    paddingTop: { default: 24, ["@media (min-width: 1280px)"]: 32 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  networkLabel: {
    marginBottom: 16,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 28,
    rowGap: 10,
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: step.body,
    lineHeight: 1.7,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  countryMore: {
    color: tone.quiet,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 768px)"]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 24, ["@media (min-width: 1280px)"]: 48 },
    rowGap: 40,
    margin: 0,
    marginTop: { default: 72, ["@media (min-width: 1280px)"]: 120 },
    padding: 0,
    listStyle: "none",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 28,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  statFigure: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    marginTop: { default: 20, ["@media (min-width: 1280px)"]: 28 },
    marginBottom: { default: 16, ["@media (min-width: 1280px)"]: 20 },
    fontFamily: font.serif,
    color: tone.ink,
  },
  statValue: {
    fontSize: { default: step.large, ["@media (min-width: 1280px)"]: step.huge },
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "lining-nums",
  },
  statUnit: {
    fontSize: { default: step.title, ["@media (min-width: 1280px)"]: step.display },
    lineHeight: 1,
    color: colors.brandBlue700,
  },
  statCaption: {
    margin: 0,
    fontSize: { default: "15px", ["@media (min-width: 1280px)"]: step.body },
    lineHeight: 1.7,
    letterSpacing: "0.06em",
    color: tone.body,
  },
});

export function Profile() {
  const chip = ABOUT_HERO.navChips[0];
  return (
    <Section id={chip.id} label={chip.english} background={ui.onPaper}>
      <div {...stylex.attrs(ui.phi)}>
        <div {...stylex.attrs(ui.asideCol)}>
          <Figure
            src={ABOUT_HERO.lobbyImage}
            alt="Fenchem headquarters lobby with a curved ceiling and marble floor"
            caption={ABOUT_HERO.lobbyCaption}
            ratio={s.ratio}
          />
        </div>
        <div {...stylex.attrs(ui.main, s.body)}>
          <Reveal>
            <h3 {...stylex.attrs(s.name)}>{ABOUT_HERO.title}</h3>
            <div lang="en" {...stylex.attrs(s.english)}>
              {ABOUT_HERO.englishTitle}
            </div>
          </Reveal>
          <Reveal step={1}>
            <p {...stylex.attrs(s.lead)}>{ABOUT_HERO.lead}</p>
          </Reveal>
          <Reveal step={2} sx={s.network}>
            <p {...stylex.attrs(ui.label, s.networkLabel)}>{ABOUT_HERO.networkLabel}</p>
            <ul {...stylex.attrs(s.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li>{country}</li>
              ))}
              <li {...stylex.attrs(s.countryMore)}>等地</li>
            </ul>
          </Reveal>
        </div>
      </div>
      <h3 {...stylex.attrs(ui.srOnly)}>Growth figures</h3>
      <ul {...stylex.attrs(s.stats)}>
        {STATS.map((stat, idx) => (
          <Reveal as="li" step={idx} sx={s.stat}>
            <p {...stylex.attrs(ui.label)}>{stat.label}</p>
            <div {...stylex.attrs(s.statFigure)}>
              <span {...stylex.attrs(s.statValue)}>{stat.value}</span>
              {stat.unit ? <span {...stylex.attrs(s.statUnit)}>{stat.unit}</span> : null}
            </div>
            <p {...stylex.attrs(s.statCaption)}>{stat.caption}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
