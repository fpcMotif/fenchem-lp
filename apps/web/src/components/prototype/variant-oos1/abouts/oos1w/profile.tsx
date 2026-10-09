import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { SectionHead } from "./shared";
import { ui } from "./shared-values";
import { bp, face, tone } from "./tokens.stylex";

const PROFILE_LABEL =
  ABOUT_HERO.navChips.find((chip) => chip.id === "about-profile")?.label ?? "企业概况";

const styles = stylex.create({
  abstract: {
    gridColumn: { default: "1 / -1", [bp.desktop]: "4 / 10" },
    marginTop: { default: 36, [bp.desktop]: 0 },
  },
  company: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 24, [bp.tablet]: 28, [bp.desktop]: 28, [bp.wide]: 32 },
    fontWeight: 500,
    lineHeight: 1.35,
    letterSpacing: "0.03em",
    color: tone.ink,
    textWrap: "balance",
  },
  english: {
    marginTop: 8,
  },
  lead: {
    margin: 0,
    marginTop: { default: 24, [bp.desktop]: 36 },
    maxWidth: "26em",
    fontFamily: face.sans,
    fontSize: { default: 18, [bp.desktop]: 20 },
    lineHeight: 1.9,
    color: tone.ink,
    textWrap: "pretty",
  },
  lobby: {
    gridColumn: { default: "1 / -1", [bp.tablet]: "3 / -1", [bp.desktop]: "10 / -1" },
    margin: 0,
    marginTop: { default: 40, [bp.desktop]: 0 },
  },
  lobbyFrame: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: { default: "3 / 2", [bp.desktop]: "3 / 4" },
    backgroundColor: tone.tint,
    borderRadius: 2,
  },
  lobbyImage: {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "42% 50%",
  },
  figCaption: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    marginTop: 14,
  },
  figNum: {
    flexShrink: 0,
    color: tone.ink,
  },
  figText: {
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    color: tone.ink,
  },
  network: {
    marginTop: { default: 44, [bp.desktop]: 64 },
  },
  networkCaption: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 12,
    rowGap: 4,
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 18 },
    lineHeight: 1.6,
    color: tone.ink,
  },
  countries: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(3, minmax(0, 1fr))",
      [bp.tablet]: "repeat(4, minmax(0, 1fr))",
      [bp.desktop]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 12, [bp.desktop]: 24 },
    margin: 0,
    marginTop: { default: 16, [bp.desktop]: 20 },
    padding: 0,
    listStyleType: "none",
  },
  country: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    paddingBlock: { default: 12, [bp.desktop]: 14 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    fontFamily: face.sans,
    fontSize: { default: 16, [bp.desktop]: 17 },
    color: tone.ink,
  },
  index: {
    minWidth: "1.8em",
  },
});

export function Profile() {
  return (
    <section id="about-profile" aria-labelledby="oos1w-profile" {...stylex.props(ui.section)}>
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(ui.grid, ui.ruled)}>
          <div {...stylex.props(ui.headCol)}>
            <SectionHead num="01" word="Abstract" title={PROFILE_LABEL} titleId="oos1w-profile" />
          </div>

          <div {...stylex.props(styles.abstract)}>
            <h3 {...stylex.props(styles.company)}>{ABOUT_HERO.title}</h3>
            <p lang="en" {...stylex.props(ui.english, styles.english)}>
              {ABOUT_HERO.englishTitle}
            </p>
            <p {...stylex.props(styles.lead)}>{ABOUT_HERO.lead}</p>

            <div {...stylex.props(styles.network)}>
              <p {...stylex.props(styles.networkCaption)}>
                <span lang="en" {...stylex.props(ui.micro)}>
                  Table 1
                </span>
                <span>{ABOUT_HERO.networkLabel}</span>
              </p>
              <ol {...stylex.props(styles.countries)}>
                {ABOUT_HERO.countries.map((country, index) => (
                  <li key={country} {...stylex.props(styles.country)}>
                    <span aria-hidden="true" {...stylex.props(ui.micro, styles.index)}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {country}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <figure {...stylex.props(styles.lobby)}>
            <div {...stylex.props(styles.lobbyFrame)}>
              <img
                src={ABOUT_HERO.lobbyImage}
                alt={ABOUT_HERO.lobbyCaption}
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.lobbyImage)}
              />
            </div>
            <figcaption {...stylex.props(ui.micro, styles.figCaption)}>
              <span lang="en" {...stylex.props(styles.figNum)}>
                Fig. 1
              </span>
              <span {...stylex.props(styles.figText)}>{ABOUT_HERO.lobbyCaption}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
