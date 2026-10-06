import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { STATS } from "../../content";
import { Figure, Reveal, ui } from "./shared";
import { font, step, tone } from "./tokens.stylex";

const s = stylex.create({
  section: {
    scrollMarginTop: 132,
  },
  copy: {
    paddingTop: { default: 32, [breakpoints.md]: 56, [breakpoints.xl]: 56 },
    paddingBottom: { default: 64, [breakpoints.md]: 96, [breakpoints.xl]: 120 },
    rowGap: { default: 40, [breakpoints.md]: 56 },
  },
  photo: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 5" },
    marginRight: { default: "22%", [breakpoints.md]: "40%", [breakpoints.lg]: 0 },
  },
  ratio: {
    aspectRatio: { default: "1 / 1", [breakpoints.md]: "4 / 5" },
  },
  lobby: {
    objectPosition: "28% 50%",
  },
  text: {
    gridColumn: { default: "auto", [breakpoints.lg]: "6 / 13" },
    alignSelf: "end",
    maxWidth: "34em",
  },
  name: {
    margin: 0,
    fontSize: { default: step.title, [breakpoints.md]: 36, [breakpoints.xl]: 40 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.1em",
    color: tone.ink,
    textWrap: "balance",
  },
  english: {
    marginTop: 12,
    fontFamily: font.serif,
    fontSize: step.line,
    fontWeight: 400,
    letterSpacing: "0.01em",
    color: tone.quiet,
  },
  lead: {
    margin: 0,
    marginTop: { default: 36, [breakpoints.xl]: 48 },
    fontSize: { default: step.body, [breakpoints.xl]: step.lead },
    lineHeight: 2,
    letterSpacing: "0.05em",
    color: tone.body,
    textWrap: "pretty",
  },
  network: {
    marginTop: { default: 40, [breakpoints.xl]: 56 },
  },
  networkLabel: {
    margin: 0,
    marginBottom: 12,
    fontSize: step.label,
    letterSpacing: "0.06em",
    color: tone.quiet,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 20,
    rowGap: 6,
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: step.small,
    letterSpacing: "0.08em",
    color: tone.ink,
  },
  countriesMore: {
    color: tone.quiet,
  },
  band: {
    backgroundColor: tone.navy,
    color: tone.onNavy,
    paddingBlock: { default: 36, [breakpoints.md]: 72, [breakpoints.xl]: 88 },
  },
  stats: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.navyRule,
  },
  stat: {
    alignItems: "center",
    rowGap: 8,
    paddingBlock: { default: 20, [breakpoints.md]: 24, [breakpoints.xl]: 30 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.navyRule,
  },
  value: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 8" },
    margin: 0,
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    fontFamily: font.serif,
    fontSize: { default: 56, [breakpoints.md]: 72, [breakpoints.xl]: 96 },
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    fontVariantNumeric: "lining-nums",
    color: tone.onNavy,
  },
  unit: {
    fontSize: { default: 24, [breakpoints.md]: 32, [breakpoints.xl]: 40 },
    color: tone.onNavyQuiet,
  },
  note: {
    gridColumn: { default: "auto", [breakpoints.lg]: "8 / 13" },
  },
  statLabel: {
    margin: 0,
    fontSize: step.label,
    letterSpacing: "0.08em",
    color: tone.onNavyQuiet,
  },
  statCaption: {
    margin: 0,
    marginTop: 6,
    fontSize: { default: step.body, [breakpoints.md]: step.lead },
    letterSpacing: "0.1em",
    color: tone.onNavy,
  },
});

export function Profile() {
  const chip = ABOUT_HERO.navChips[0];

  return (
    <section id={chip.id} aria-labelledby="about-profile-name" {...stylex.props(s.section)}>
      <h2 id="about-profile-name" {...stylex.props(ui.srOnly)}>
        {chip.label}
      </h2>
      <div {...stylex.props(ui.shell, ui.inset, ui.grid, s.copy)}>
        <Figure
          src={ABOUT_HERO.lobbyImage}
          alt="泛成总部大堂，弧形吊顶与大理石地面"
          caption={ABOUT_HERO.lobbyCaption}
          ratio={s.ratio}
          fit={s.lobby}
          sx={s.photo}
        />
        <div {...stylex.props(s.text)}>
          <Reveal>
            <h3 {...stylex.props(s.name)}>{ABOUT_HERO.title}</h3>
            <div lang="en" {...stylex.props(s.english)}>
              {ABOUT_HERO.englishTitle}
            </div>
          </Reveal>
          <Reveal as="p" sx={s.lead}>
            {ABOUT_HERO.lead}
          </Reveal>
          <Reveal sx={s.network}>
            <p {...stylex.props(s.networkLabel)}>{ABOUT_HERO.networkLabel}</p>
            <ul {...stylex.props(s.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li key={country}>{country}</li>
              ))}
              <li {...stylex.props(s.countriesMore)}>等地</li>
            </ul>
          </Reveal>
        </div>
      </div>
      <div {...stylex.props(s.band)}>
        <div {...stylex.props(ui.shell, ui.inset)}>
          <h3 {...stylex.props(ui.srOnly)}>泛成发展数据</h3>
          <ul {...stylex.props(s.stats)}>
            {STATS.map((stat, idx) => (
              <Reveal key={stat.label} as="li" step={idx} sx={[ui.grid, s.stat]}>
                <p {...stylex.props(s.value)}>
                  <span>{stat.value}</span>
                  {stat.unit ? <span {...stylex.props(s.unit)}>{stat.unit}</span> : null}
                </p>
                <div {...stylex.props(s.note)}>
                  <p {...stylex.props(s.statLabel)}>{stat.label}</p>
                  <p {...stylex.props(s.statCaption)}>{stat.caption}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
