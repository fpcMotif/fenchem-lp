import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { ROOMS_IN_WALKING_ORDER } from "./journey";
import { Bevel, Mat, SectionHead, Tag, useArrived } from "./shared";
import { stepIn, ui } from "./shared-values";
import { bp, face, space, tone } from "./tokens.stylex";

const LOBBY = ROOMS_IN_WALKING_ORDER[0].plate;

const styles = stylex.create({
  nameRow: {
    display: "flex",
    flexDirection: { default: "column", [bp.desktop]: "row" },
    alignItems: { default: "flex-start", [bp.desktop]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 6, [bp.desktop]: 32 },
    paddingTop: { default: 10, [bp.upTablet]: 14 },
  },
  company: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 24, [bp.tablet]: 32, [bp.laptop]: 34, [bp.wide]: 40 },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  english: {
    margin: 0,
    fontSize: { default: 19, [bp.tablet]: 24, [bp.desktop]: 28 },
    lineHeight: 1.2,
    color: tone.navy,
  },
  inner: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.desktop]: "minmax(0, 5fr) minmax(0, 7fr)",
    },
    columnGap: `calc(${space.mat} * 1.5)`,
    rowGap: 28,
    paddingTop: { default: 24, [bp.upTablet]: space.mat },
  },
  leadColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 28,
  },
  lead: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 17, [bp.tablet]: 19, [bp.desktop]: 20 },
    lineHeight: 1.9,
    color: tone.ink,
    textWrap: "pretty",
  },
  founded: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    margin: 0,
  },
  year: {
    fontSize: { default: 64, [bp.tablet]: 88, [bp.desktop]: 112 },
    lineHeight: 0.8,
    color: tone.navy,
    fontVariantNumeric: "lining-nums",
  },
  foundedLabel: {
    fontFamily: face.sans,
    fontSize: { default: 14, [bp.desktop]: 15 },
    letterSpacing: "0.08em",
    color: tone.body,
  },
  photo: {
    position: "relative",
    aspectRatio: "3 / 2",
    overflow: "hidden",
    backgroundColor: tone.whisper,
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    margin: 0,
    marginTop: { default: 12, [bp.upTablet]: 16 },
  },
  captionText: {
    fontFamily: face.sans,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  captionEnglish: {
    fontSize: 19,
  },
  network: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 20,
    rowGap: 8,
  },
  networkLabel: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 17 },
    fontWeight: 500,
    color: tone.ink,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: { default: 12, [bp.desktop]: 18 },
    rowGap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 17 },
    lineHeight: 1.6,
    color: tone.body,
  },
});

export function Profile() {
  const [ref, arrived] = useArrived<HTMLDivElement>();
  return (
    <section
      id="about-profile"
      aria-labelledby="oos1b-profile"
      {...stylex.props(ui.anchor, ui.section, ui.shell)}
    >
      <SectionHead
        id="oos1b-profile"
        index={1}
        eyebrow="Profile"
        title="企业概况"
        note="Thirty years of ingredients, from Nanjing."
      />
      <div ref={ref} {...stylex.props(...stepIn(arrived, 0))}>
        <Mat
          raised
          head={
            <div {...stylex.props(styles.nameRow)}>
              <Tag numeral="I" />
              <h3 {...stylex.props(styles.company)}>{ABOUT_HERO.title}</h3>
              <p lang="en" {...stylex.props(ui.serif, styles.english)}>
                {ABOUT_HERO.englishTitle}
              </p>
            </div>
          }
          foot={
            <div {...stylex.props(styles.network)}>
              <p {...stylex.props(styles.networkLabel)}>{ABOUT_HERO.networkLabel}</p>
              <ul {...stylex.props(styles.countries)}>
                {ABOUT_HERO.countries.map((country) => (
                  <li key={country}>{country}</li>
                ))}
              </ul>
            </div>
          }
        >
          <Bevel>
            <Mat bare layout={styles.inner}>
              <Tag numeral="II" />
              <div {...stylex.props(styles.leadColumn, ...stepIn(arrived, 1))}>
                <p {...stylex.props(styles.lead)}>{ABOUT_HERO.lead}</p>
                <p {...stylex.props(styles.founded)}>
                  <span lang="en" {...stylex.props(ui.serif, styles.year)}>
                    1995
                  </span>
                  <span {...stylex.props(styles.foundedLabel)}>创立于南京</span>
                </p>
              </div>
              <figure {...stylex.props(ui.reset, ...stepIn(arrived, 2))}>
                <Bevel>
                  <div {...stylex.props(styles.photo)}>
                    <img
                      src={LOBBY.large}
                      alt={ABOUT_HERO.lobbyEnglish}
                      loading="lazy"
                      decoding="async"
                      {...stylex.props(ui.fill)}
                    />
                  </div>
                  <Tag numeral="III" />
                </Bevel>
                <figcaption {...stylex.props(styles.caption)}>
                  <span {...stylex.props(styles.captionText)}>{ABOUT_HERO.lobbyCaption}</span>
                  <span lang="en" {...stylex.props(ui.serif, styles.captionEnglish)}>
                    {LOBBY.english}
                  </span>
                </figcaption>
              </figure>
            </Mat>
          </Bevel>
        </Mat>
      </div>
    </section>
  );
}
