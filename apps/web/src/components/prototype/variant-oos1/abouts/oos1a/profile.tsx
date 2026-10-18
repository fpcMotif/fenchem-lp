import { colors } from "@fenchem-lp/ui/tokens.stylex";
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
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "1 / span 14" },
    marginBottom: { default: 40, ["@media (min-width: 1024px)"]: 72 },
  },
  english: {
    marginTop: { default: 12, ["@media (min-width: 1024px)"]: 16 },
  },
  textCell: {
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "1 / span 6" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 48,
    boxSizing: "border-box",
    paddingInlineEnd: { default: 0, ["@media (min-width: 1024px)"]: 32 },
    marginBottom: { default: 40, ["@media (min-width: 1024px)"]: 0 },
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
    gridColumn: { default: null, ["@media (min-width: 1024px)"]: "8 / span 9" },
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
      {...stylex.attrs(styles.section, shared.anchor)}
    >
      <Frame innerSx={shared.sectionPad}>
        <div {...stylex.attrs(shared.grid16)}>
          <div {...stylex.attrs(styles.head)}>
            <h2 id="about-profile-title" {...stylex.attrs(shared.headline)}>
              {ABOUT_HERO.title}
            </h2>
            <p lang="en" {...stylex.attrs(shared.serifLine, styles.english)}>
              {ABOUT_HERO.englishTitle}
            </p>
          </div>
          <Reveal sx={styles.textCell}>
            <p {...stylex.attrs(shared.body)}>{ABOUT_HERO.lead}</p>
            <div {...stylex.attrs(styles.network)}>
              <p {...stylex.attrs(shared.small)}>{ABOUT_HERO.networkLabel}</p>
              <ul {...stylex.attrs(styles.countries)}>
                {ABOUT_HERO.countries.map((country) => (
                  <li>{country}</li>
                ))}
                <li {...stylex.attrs(styles.countryMore)}>等地</li>
              </ul>
            </div>
          </Reveal>
          <Reveal as="figure" step={2} sx={styles.photoCell}>
            <div {...stylex.attrs(styles.photo)}>
              <img
                src={ABOUT_HERO.lobbyImage}
                alt="Fenchem headquarters lobby with a curved ceiling and marble floor"
                loading="lazy"
                decoding="async"
                {...stylex.attrs(shared.cover)}
              />
            </div>
            <figcaption {...stylex.attrs(shared.small, styles.caption)}>
              {ABOUT_HERO.lobbyCaption}
            </figcaption>
          </Reveal>
        </div>
      </Frame>
    </section>
  );
}
