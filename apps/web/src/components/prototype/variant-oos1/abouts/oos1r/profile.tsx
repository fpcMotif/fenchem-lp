import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { createUniqueId } from "solid-js";

import { ABOUT_HERO } from "../../about-data";
import { STATS } from "../../content";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { band, font, step, tone } from "./tokens.stylex";

const s = stylex.create({
  top: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 8fr) minmax(0, 4fr)",
    },
    columnGap: { default: 0, [band.lgToXl]: 48, [breakpoints.xl]: 80 },
    rowGap: 40,
  },
  nameRow: {
    display: "flex",
    alignItems: "flex-end",
    columnGap: { default: 14, [band.mdToXl]: 20, [breakpoints.xl]: 28 },
  },
  name: {
    margin: 0,
    maxWidth: "6.2em",
    fontSize: { default: 40, [band.mdToXl]: 64, [breakpoints.xl]: 96 },
    fontWeight: 500,
    lineHeight: 1.08,
    letterSpacing: "0.02em",
    color: tone.ink,
  },
  stamp: {
    position: "relative",
    flexShrink: 0,
    width: { default: 72, [band.mdToXl]: 84, [breakpoints.xl]: 96 },
    margin: 0,
    marginBottom: { default: 4, [breakpoints.xl]: 10 },
  },
  stampFrame: {
    aspectRatio: "4 / 5",
  },
  stampImage: {
    objectPosition: "30% 60%",
  },
  stampCaption: {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: 6,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.1em",
    whiteSpace: "nowrap",
    color: tone.body,
  },
  english: {
    margin: 0,
    marginTop: { default: 36, [breakpoints.xl]: 40 },
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: 20, [breakpoints.xl]: 22 },
    fontWeight: 400,
    lineHeight: 1.3,
    color: tone.body,
  },
  network: {
    alignSelf: "start",
    paddingTop: { default: 0, [band.lgToXl]: 14, [breakpoints.xl]: 22 },
  },
  networkLabel: {
    margin: 0,
    marginBottom: 12,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.1em",
    lineHeight: 1.6,
    color: tone.body,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 14,
    rowGap: 2,
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.12em",
    lineHeight: 1.9,
    color: tone.body,
  },
  body: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    marginTop: { default: 40, [breakpoints.xl]: 64 },
  },
  leadCell: {
    gridColumn: { default: "auto", [breakpoints.lg]: "5 / 11" },
  },
  lead: {
    maxWidth: "34em",
    margin: 0,
    fontSize: { default: step.body, [breakpoints.md]: step.lead },
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.05em",
    color: tone.ink,
    textWrap: "pretty",
  },
  stats: {
    gridColumn: { default: "auto", [breakpoints.lg]: "5 / 13" },
    margin: 0,
    marginTop: { default: 40, [breakpoints.xl]: 64 },
    padding: 0,
    listStyle: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  stat: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 5fr) minmax(0, 7fr)",
    },
    columnGap: 24,
    alignItems: "center",
    paddingBlock: { default: 20, [breakpoints.xl]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  statLabel: {
    margin: 0,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.1em",
    lineHeight: 1.6,
    color: tone.body,
  },
  statValue: {
    margin: 0,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: 44, [band.mdToXl]: 56, [breakpoints.xl]: 72 },
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    fontVariantNumeric: "lining-nums",
    color: tone.ink,
  },
  statUnit: {
    marginLeft: 8,
    fontSize: { default: 18, [breakpoints.xl]: 24 },
    letterSpacing: "0.02em",
  },
  statCaption: {
    margin: 0,
    marginTop: 6,
    fontSize: step.small,
    fontWeight: 400,
    letterSpacing: "0.06em",
    lineHeight: 1.7,
    color: tone.body,
  },
});

export function Profile() {
  const chip = ABOUT_HERO.navChips[0];
  const networkId = createUniqueId();

  return (
    <Section id={chip.id} label={chip.english}>
      <div {...stylex.attrs(s.top)}>
        <Reveal>
          <div {...stylex.attrs(s.nameRow)}>
            <h3 {...stylex.attrs(s.name)}>{ABOUT_HERO.title}</h3>
            <figure {...stylex.attrs(s.stamp)}>
              <div {...stylex.attrs(ui.frame, s.stampFrame)}>
                <img
                  src={ABOUT_HERO.lobbyImage}
                  alt={ABOUT_HERO.lobbyEnglish}
                  loading="lazy"
                  decoding="async"
                  {...stylex.attrs(ui.fill, s.stampImage)}
                />
              </div>
              <figcaption aria-hidden="true" {...stylex.attrs(s.stampCaption)}>
                {ABOUT_HERO.lobbyCaption}
              </figcaption>
            </figure>
          </div>
          <p lang="en" {...stylex.attrs(s.english)}>
            {ABOUT_HERO.englishTitle}
          </p>
        </Reveal>
        <Reveal delay={120} sx={s.network}>
          <p id={networkId} {...stylex.attrs(s.networkLabel)}>
            {ABOUT_HERO.networkLabel}
          </p>
          <ul aria-labelledby={networkId} {...stylex.attrs(s.countries)}>
            {ABOUT_HERO.countries.map((country) => (
              <li>{country}</li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div {...stylex.attrs(s.body)}>
        <Reveal sx={s.leadCell}>
          <p {...stylex.attrs(s.lead)}>{ABOUT_HERO.lead}</p>
        </Reveal>
        <ul {...stylex.attrs(s.stats)}>
          {STATS.map((stat, idx) => (
            <Reveal as="li" delay={idx * 100} sx={s.stat}>
              <p {...stylex.attrs(s.statValue)}>
                {stat.value}
                {stat.unit === "+" ? stat.unit : null}
                {stat.unit && stat.unit !== "+" ? (
                  <span {...stylex.attrs(s.statUnit)}>{stat.unit}</span>
                ) : null}
              </p>
              <div>
                <p {...stylex.attrs(s.statLabel)}>{stat.label}</p>
                <p {...stylex.attrs(s.statCaption)}>{stat.caption}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
