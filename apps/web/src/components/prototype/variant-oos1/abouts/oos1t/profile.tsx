import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { Cast } from "./cast";
import { LIFT } from "./cast-values";
import { Phrase } from "./phrase";
import { SectionHead } from "./head";
import { ui } from "./shared";
import { SECTION_HOURS } from "./sun";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    paddingTop: { default: 72, [bp.tablet]: 96, [bp.desktop]: 104 },
  },
  body: {
    rowGap: 56,
    marginTop: { default: 48, [bp.desktop]: 80 },
    alignItems: "start",
  },
  text: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "4 / span 5" },
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  name: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 700,
    fontSize: { default: 24, [bp.desktop]: "clamp(24px, 2.1vw, 30px)" },
    lineHeight: 1.35,
    color: tone.ink,
  },
  english: {
    display: "block",
    marginTop: 6,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: { default: 19, [bp.desktop]: 22 },
    color: tone.quiet,
  },
  lead: {
    fontSize: { default: 16, [bp.desktop]: 17 },
    maxWidth: "30em",
  },
  network: {
    marginTop: 8,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.lineSoft,
  },
  label: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.quiet,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px 18px",
    marginBlock: "12px 0",
    marginInline: 0,
    padding: 0,
    listStyleType: "none",
    fontFamily: face.sans,
    fontSize: 15,
    lineHeight: 1.6,
    color: tone.ink,
  },
  figure: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "2 / span 4", [bp.desktop]: "10 / span 3" },
    gridRow: { default: "auto", [bp.desktop]: "1" },
    marginBlock: { default: 0, [bp.desktop]: "8px 0" },
    marginInline: 0,
  },
  photo: {
    aspectRatio: "4 / 5",
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  caption: {
    marginTop: 14,
    fontFamily: face.sans,
    fontSize: 15,
    color: tone.quiet,
  },
});

export function Profile() {
  return (
    <section
      id="about-profile"
      aria-labelledby="oos1t-profile"
      data-hour={SECTION_HOURS.profile}
      {...stylex.props(ui.section, ui.shell, styles.section)}
    >
      <SectionHead
        titleId="oos1t-profile"
        hour={SECTION_HOURS.profile}
        title="企业概况"
        english="Profile"
      />
      <div {...stylex.props(ui.grid, styles.body)}>
        <div {...stylex.props(styles.text)}>
          <h3 {...stylex.props(styles.name)}>
            <Phrase text={ABOUT_HERO.title} />
            <span lang="en" {...stylex.props(styles.english)}>
              {ABOUT_HERO.englishTitle}
            </span>
          </h3>
          <p {...stylex.props(ui.body, styles.lead)}>{ABOUT_HERO.lead}</p>
          <div {...stylex.props(styles.network)}>
            <p {...stylex.props(styles.label)}>{ABOUT_HERO.networkLabel}</p>
            <ul {...stylex.props(styles.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li key={country}>{country}</li>
              ))}
            </ul>
          </div>
        </div>
        <figure {...stylex.props(styles.figure)}>
          <div {...stylex.props(ui.plate)}>
            <Cast lift={LIFT.block} still />
            <div {...stylex.props(ui.face, styles.photo)}>
              <img
                src={ABOUT_HERO.lobbyImage}
                alt={ABOUT_HERO.lobbyEnglish}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill)}
              />
            </div>
          </div>
          <figcaption {...stylex.props(styles.caption)}>{ABOUT_HERO.lobbyCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
