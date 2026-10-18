import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { STATS } from "../../content";
import { ArchPhoto, Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { font, step, tone } from "./tokens.stylex";

const s = stylex.create({
  figure: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 6" },
    minWidth: 0,
    maxWidth: { default: "none", [breakpoints.md]: 520 },
  },
  ratio: {
    aspectRatio: "4 / 5",
  },
  photo: {
    objectPosition: "30% 50%",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 32,
    gridColumn: { default: "auto", [breakpoints.lg]: "7 / 13" },
    minWidth: 0,
  },
  name: {
    margin: 0,
    fontSize: { default: step.headline, [breakpoints.md]: step.display },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  english: {
    margin: 0,
    marginTop: 12,
    fontFamily: font.serif,
    fontSize: step.title,
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: 1.2,
    color: tone.quiet,
  },
  lead: {
    margin: 0,
    maxWidth: "30em",
    fontSize: step.body,
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: tone.body,
    textWrap: "balance",
  },
  network: {
    margin: 0,
    maxWidth: "34em",
    fontSize: step.body,
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: tone.body,
  },
  networkLabel: {
    display: "block",
    fontSize: step.label,
    letterSpacing: "0.04em",
    color: tone.quiet,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 12,
    margin: 0,
    padding: 0,
    listStyle: "none",
    color: tone.ink,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.md]: 32, [breakpoints.xl]: 40 },
    rowGap: 32,
    margin: 0,
    marginTop: { default: 56, [breakpoints.md]: 80, [breakpoints.xl]: 112 },
    padding: 0,
    listStyle: "none",
  },
  stat: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  statLabel: {
    margin: 0,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.quiet,
  },
  statValue: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    margin: 0,
    marginBlock: 12,
    fontFamily: font.serif,
    fontSize: { default: "56px", [breakpoints.md]: step.stat },
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    color: tone.ink,
    fontVariantNumeric: "lining-nums",
  },
  statUnit: {
    fontSize: { default: step.title, [breakpoints.md]: "32px" },
    letterSpacing: 0,
    color: tone.body,
  },
  statCaption: {
    margin: 0,
    fontSize: step.body,
    letterSpacing: "0.06em",
    color: tone.body,
  },
});

export function Profile() {
  const chip = ABOUT_HERO.navChips[0];

  return (
    <Section id={chip.id} label={chip.english} background={ui.onPage}>
      <div {...stylex.attrs(ui.grid)}>
        <figure {...stylex.attrs(ui.figure, s.figure)}>
          <ArchPhoto
            src={ABOUT_HERO.lobbyImage}
            alt="Fenchem headquarters lobby with a curved vault and the company logo"
            mode="view"
            ratio={s.ratio}
            position={s.photo}
          />
          <figcaption {...stylex.attrs(ui.caption)}>{ABOUT_HERO.lobbyCaption}</figcaption>
        </figure>
        <Reveal sx={s.copy}>
          <div>
            <h3 {...stylex.attrs(s.name)}>{ABOUT_HERO.title}</h3>
            <p lang="en" {...stylex.attrs(s.english)}>
              {ABOUT_HERO.englishTitle}
            </p>
          </div>
          <p {...stylex.attrs(s.lead)}>{ABOUT_HERO.lead}</p>
          <div {...stylex.attrs(s.network)}>
            <span {...stylex.attrs(s.networkLabel)}>{ABOUT_HERO.networkLabel}</span>
            <ul {...stylex.attrs(s.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li>{country}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <ul {...stylex.attrs(s.stats)}>
        {STATS.map((stat, idx) => (
          <Reveal as="li" step={idx} sx={s.stat}>
            <p {...stylex.attrs(s.statLabel)}>{stat.label}</p>
            <p {...stylex.attrs(s.statValue)}>
              <span>{stat.value}</span>
              {stat.unit ? <span {...stylex.attrs(s.statUnit)}>{stat.unit}</span> : null}
            </p>
            <p {...stylex.attrs(s.statCaption)}>{stat.caption}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
