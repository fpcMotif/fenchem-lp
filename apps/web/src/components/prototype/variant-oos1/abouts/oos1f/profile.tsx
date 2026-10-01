import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { NodeMarker, Reveal, Section, Shell } from "./layout";
import { color, font, media } from "./palette.stylex";

const NUMBER_RUN = /(\d+)/;

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 6fr) minmax(0, 5fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 80 },
    rowGap: 48,
    alignItems: "center",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 24, [breakpoints.lg]: 32 },
    minWidth: 0,
    fontFamily: font.cjk,
  },
  name: {
    margin: 0,
    fontSize: {
      default: 26,
      [media.mdOnly]: 36,
      [media.lgOnly]: 30,
      [breakpoints.xl]: 40,
    },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.02em",
    color: color.ink,
    textWrap: "balance",
  },
  english: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: color.body,
  },
  lead: {
    margin: 0,
    maxWidth: "34em",
    fontSize: { default: 16, [breakpoints.lg]: 17 },
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: color.ink,
    textWrap: "pretty",
  },
  network: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    margin: 0,
  },
  networkLabel: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 8,
    margin: 0,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: color.body,
  },
  networkFigure: {
    fontFamily: font.display,
    fontSize: { default: 40, [breakpoints.lg]: 48 },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
    color: colors.brandBlue700,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 18,
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.06em",
    color: color.body,
  },
  figure: {
    margin: 0,
  },
  image: {
    display: "block",
    width: "100%",
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "5 / 4" },
    objectFit: "cover",
    borderRadius: 2,
  },
  caption: {
    marginTop: 14,
    fontFamily: font.cjk,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.1em",
    color: color.body,
  },
});

export function Profile() {
  const countries = [...ABOUT_HERO.countries, "等地"];
  return (
    <Section id="about-profile" name={ABOUT_HERO.navChips[0].label}>
      <Shell>
        <NodeMarker />
        <div {...stylex.props(styles.grid)}>
          <Reveal sx={styles.copy}>
            <div>
              <h3 {...stylex.props(styles.name)}>{ABOUT_HERO.title}</h3>
              <div lang="en" {...stylex.props(styles.english)}>
                {ABOUT_HERO.englishTitle}
              </div>
            </div>
            <p {...stylex.props(styles.lead)}>{ABOUT_HERO.lead}</p>
            <div {...stylex.props(styles.network)}>
              <p {...stylex.props(styles.networkLabel)}>
                {ABOUT_HERO.networkLabel.split(NUMBER_RUN).map((part, index) =>
                  /^\d+$/.test(part) ? (
                    <span key={`${part}-${index}`} {...stylex.props(styles.networkFigure)}>
                      {part}
                    </span>
                  ) : (
                    <span key={`${part}-${index}`}>{part.trim()}</span>
                  ),
                )}
              </p>
              <ul {...stylex.props(styles.countries)}>
                {countries.map((country) => (
                  <li key={country}>{country}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <figure {...stylex.props(styles.figure)}>
              <img
                src={ABOUT_HERO.lobbyImage}
                alt="泛成总部大堂，弧形吊顶与大理石地面"
                loading="lazy"
                decoding="async"
                {...stylex.props(styles.image)}
              />
              <figcaption {...stylex.props(styles.caption)}>{ABOUT_HERO.lobbyCaption}</figcaption>
            </figure>
          </Reveal>
        </div>
      </Shell>
    </Section>
  );
}
