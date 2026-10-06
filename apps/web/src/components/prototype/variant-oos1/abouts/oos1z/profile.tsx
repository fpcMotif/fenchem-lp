import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { RoomSign } from "./room-sign";
import { sectionTitle, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  text: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: { default: 56, [bp.tablet]: 72, [bp.desktop]: 88 },
    textAlign: "center",
  },
  company: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 300,
    fontSize: { default: 28, [bp.tablet]: 40, [bp.desktop]: 48 },
    lineHeight: 1.35,
    letterSpacing: "0.03em",
    color: tone.ink,
    fontFeatureSettings: '"palt"',
  },
  english: {
    margin: 0,
    marginTop: 10,
    fontSize: { default: 19, [bp.desktop]: 24 },
    lineHeight: 1.3,
    color: tone.body,
  },
  lead: {
    margin: 0,
    marginTop: { default: 36, [bp.desktop]: 48 },
    maxWidth: "30em",
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 18 },
    lineHeight: 2.05,
    color: tone.ink,
    textAlign: "justify",
    textAlignLast: "center",
  },
  network: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    marginTop: { default: 40, [bp.desktop]: 56 },
    paddingTop: { default: 28, [bp.desktop]: 36 },
    width: "min(100%, 34em)",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.line,
  },
  networkLabel: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.6,
    color: tone.body,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: { default: 18, [bp.desktop]: 24 },
    rowGap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 18 },
    lineHeight: 1.8,
    color: tone.ink,
  },
});

export function Profile() {
  return (
    <section
      id="about-profile"
      aria-labelledby="oos1z-profile"
      {...stylex.props(ui.anchor, ui.room)}
    >
      <div {...stylex.props(ui.shell)}>
        <RoomSign
          numeral="I"
          id="oos1z-profile"
          title={sectionTitle("about-profile")}
          english="Introduction"
        />
        <div {...stylex.props(styles.text)}>
          <p {...stylex.props(styles.company)}>{ABOUT_HERO.title}</p>
          <p lang="en" {...stylex.props(ui.italic, styles.english)}>
            {ABOUT_HERO.englishTitle}
          </p>
          <p {...stylex.props(styles.lead)}>{ABOUT_HERO.lead}</p>
          <div {...stylex.props(styles.network)}>
            <p {...stylex.props(styles.networkLabel)}>{ABOUT_HERO.networkLabel}</p>
            <ul {...stylex.props(styles.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li key={country}>{country}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
