import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { ui } from "./layout";
import { PlateHead } from "./plate-head";
import { StrobeImage, useEntry } from "./strobe";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  lead: {
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 400,
    fontSize: { default: 20, [bp.tablet]: 24, [bp.desktop]: "clamp(27px, 2.2vw, 32px)" },
    lineHeight: 1.7,
    letterSpacing: "0.02em",
    color: tone.ink,
    maxWidth: "24em",
    textWrap: "balance",
  },
  study: {
    marginTop: { default: 48, [bp.tablet]: 72, [bp.desktop]: 104 },
    rowGap: 40,
    alignItems: "start",
  },
  figure: {
    margin: 0,
  },
  lobby: {
    aspectRatio: "3 / 2",
  },
  lobbyImage: {
    objectPosition: "50% 55%",
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    marginTop: 14,
  },
  captionText: {
    fontFamily: face.sans,
    fontSize: 16,
    color: tone.ink,
  },
  captionEnglish: {
    fontSize: 19,
  },
  network: {
    paddingTop: { default: 0, [bp.desktop]: 2 },
  },
  networkLabel: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 18, [bp.desktop]: 21 },
    fontWeight: 500,
    lineHeight: 1.5,
    color: tone.ink,
  },
  countries: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    columnGap: 16,
    rowGap: { default: 12, [bp.desktop]: 16 },
    margin: 0,
    marginTop: { default: 22, [bp.desktop]: 30 },
    paddingTop: { default: 22, [bp.desktop]: 30 },
    paddingInline: 0,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    listStyleType: "none",
  },
  country: {
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 17 },
    lineHeight: 1.45,
    color: tone.body,
  },
});

export function Profile() {
  const [figureRef, figurePhase] = useEntry<HTMLElement>();
  return (
    <section id="about-profile" aria-labelledby="oos1p-profile" {...stylex.props(ui.plate)}>
      <PlateHead plate={1} english="Profile" title="企业概况" titleId="oos1p-profile" />
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(ui.grid)}>
          <p {...stylex.props(ui.q2to4, styles.lead)}>{ABOUT_HERO.lead}</p>
        </div>

        <div {...stylex.props(ui.grid, styles.study)}>
          <figure ref={figureRef} {...stylex.props(ui.q1to2, styles.figure)}>
            <StrobeImage
              phase={figurePhase}
              count={4}
              unit="5%"
              src={ABOUT_HERO.lobbyImage}
              alt={ABOUT_HERO.lobbyCaption}
              sx={styles.lobby}
              imageSx={styles.lobbyImage}
            />
            <figcaption {...stylex.props(styles.caption)}>
              <span {...stylex.props(styles.captionText)}>{ABOUT_HERO.lobbyCaption}</span>
              <span lang="en" {...stylex.props(ui.eyebrow, styles.captionEnglish)}>
                Lobby
              </span>
            </figcaption>
          </figure>

          <div {...stylex.props(ui.q3to4, styles.network)}>
            <p {...stylex.props(styles.networkLabel)}>{ABOUT_HERO.networkLabel}</p>
            <ul {...stylex.props(styles.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li key={country} {...stylex.props(styles.country)}>
                  {country}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
