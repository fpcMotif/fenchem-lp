import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { fonts, palette } from "./lattice.stylex";
import { Frame, Reveal } from "./parts";
import { shared } from "./parts-values";

const styles = stylex.create({
  section: {
    backgroundColor: colors.paper,
  },
  head: {
    gridColumn: { default: null, [breakpoints.lg]: "1 / span 14" },
    marginBottom: { default: 40, [breakpoints.lg]: 72 },
  },
  english: {
    marginTop: { default: 12, [breakpoints.lg]: 16 },
  },
  textCell: {
    gridColumn: { default: null, [breakpoints.lg]: "1 / span 6" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 48,
    boxSizing: "border-box",
    paddingInlineEnd: { default: 0, [breakpoints.lg]: 32 },
    marginBottom: { default: 40, [breakpoints.lg]: 0 },
  },
  network: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 20,
    rowGap: 6,
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontFamily: fonts.cjk,
    fontSize: 15,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: palette.ink,
  },
  countryMore: {
    color: palette.body,
  },
  photoCell: {
    gridColumn: { default: null, [breakpoints.lg]: "8 / span 9" },
    margin: 0,
  },
  photo: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: "4 / 3",
    backgroundColor: palette.tint,
  },
  caption: {
    marginTop: 12,
  },
});

export function Profile() {
  return (
    <section
      id="about-profile"
      aria-labelledby="about-profile-title"
      {...stylex.props(styles.section, shared.anchor)}
    >
      <Frame innerSx={shared.sectionPad}>
        <div {...stylex.props(shared.grid16)}>
          <div {...stylex.props(styles.head)}>
            <h2 id="about-profile-title" {...stylex.props(shared.headline)}>
              {ABOUT_HERO.title}
            </h2>
            <p lang="en" {...stylex.props(shared.serifLine, styles.english)}>
              {ABOUT_HERO.englishTitle}
            </p>
          </div>
          <Reveal sx={styles.textCell}>
            <p {...stylex.props(shared.body)}>{ABOUT_HERO.lead}</p>
            <div {...stylex.props(styles.network)}>
              <p {...stylex.props(shared.small)}>{ABOUT_HERO.networkLabel}</p>
              <ul {...stylex.props(styles.countries)}>
                {ABOUT_HERO.countries.map((country) => (
                  <li key={country}>{country}</li>
                ))}
                <li {...stylex.props(styles.countryMore)}>等地</li>
              </ul>
            </div>
          </Reveal>
          <Reveal as="figure" step={2} sx={styles.photoCell}>
            <div {...stylex.props(styles.photo)}>
              <img
                src={ABOUT_HERO.lobbyImage}
                alt="Fenchem headquarters lobby with a curved ceiling and marble floor"
                loading="lazy"
                decoding="async"
                {...stylex.props(shared.cover)}
              />
            </div>
            <figcaption {...stylex.props(shared.small, styles.caption)}>
              {ABOUT_HERO.lobbyCaption}
            </figcaption>
          </Reveal>
        </div>
      </Frame>
    </section>
  );
}
