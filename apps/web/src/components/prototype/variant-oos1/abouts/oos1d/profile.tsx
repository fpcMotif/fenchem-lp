import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
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
    marginTop: 16,
    fontSize: step.body,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  lead: {
    margin: 0,
    maxWidth: "32em",
    fontSize: { default: step.body, [breakpoints.xl]: "18px" },
    fontWeight: 400,
    lineHeight: 1.95,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  network: {
    paddingTop: { default: 24, [breakpoints.xl]: 32 },
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
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 24, [breakpoints.xl]: 48 },
    rowGap: 40,
    margin: 0,
    marginTop: { default: 72, [breakpoints.xl]: 120 },
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
    marginTop: { default: 20, [breakpoints.xl]: 28 },
    marginBottom: { default: 16, [breakpoints.xl]: 20 },
    fontFamily: font.serif,
    color: tone.ink,
  },
  statValue: {
    fontSize: { default: step.large, [breakpoints.xl]: step.huge },
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "lining-nums",
  },
  statUnit: {
    fontSize: { default: step.title, [breakpoints.xl]: step.display },
    lineHeight: 1,
    color: colors.brandBlue700,
  },
  statCaption: {
    margin: 0,
    fontSize: { default: "15px", [breakpoints.xl]: step.body },
    lineHeight: 1.7,
    letterSpacing: "0.06em",
    color: tone.body,
  },
});

export function Profile() {
  const chip = ABOUT_HERO.navChips[0];
  return (
    <Section id={chip.id} label={chip.english} background={ui.onPaper}>
      <div {...stylex.props(ui.phi)}>
        <div {...stylex.props(ui.asideCol)}>
          <Figure
            src={ABOUT_HERO.lobbyImage}
            alt="Fenchem headquarters lobby with a curved ceiling and marble floor"
            caption={ABOUT_HERO.lobbyCaption}
            ratio={s.ratio}
          />
        </div>
        <div {...stylex.props(ui.main, s.body)}>
          <Reveal>
            <h3 {...stylex.props(s.name)}>{ABOUT_HERO.title}</h3>
            <div lang="en" {...stylex.props(s.english)}>
              {ABOUT_HERO.englishTitle}
            </div>
          </Reveal>
          <Reveal step={1}>
            <p {...stylex.props(s.lead)}>{ABOUT_HERO.lead}</p>
          </Reveal>
          <Reveal step={2} sx={s.network}>
            <p {...stylex.props(ui.label, s.networkLabel)}>{ABOUT_HERO.networkLabel}</p>
            <ul {...stylex.props(s.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li key={country}>{country}</li>
              ))}
              <li {...stylex.props(s.countryMore)}>等地</li>
            </ul>
          </Reveal>
        </div>
      </div>
      <h3 {...stylex.props(ui.srOnly)}>Growth figures</h3>
      <ul {...stylex.props(s.stats)}>
        {STATS.map((stat, idx) => (
          <Reveal key={stat.label} as="li" step={idx} sx={s.stat}>
            <p {...stylex.props(ui.label)}>{stat.label}</p>
            <div {...stylex.props(s.statFigure)}>
              <span {...stylex.props(s.statValue)}>{stat.value}</span>
              {stat.unit ? <span {...stylex.props(s.statUnit)}>{stat.unit}</span> : null}
            </div>
            <p {...stylex.props(s.statCaption)}>{stat.caption}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
