import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO, ABOUT_MOMENT } from "../../about-data";
import { Odometer } from "./odometer";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { font, mq, ui } from "./theme.stylex";

const COUNTRY_TOTAL = String(ABOUT_HERO.countries.length);

const styles = stylex.create({
  section: {
    paddingTop: { default: 80, ["@media (min-width: 1280px)"]: 144 },
    backgroundColor: colors.paper,
  },
  top: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1280px)"]: "minmax(0, 5fr) minmax(0, 6fr)",
    },
    columnGap: 96,
    rowGap: 56,
    alignItems: "center",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  name: {
    margin: 0,
    fontSize: { default: 30, [mq.tablet]: 40, ["@media (min-width: 1280px)"]: 44 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.03em",
    color: ui.ink,
    textWrap: "balance",
  },
  english: {
    fontFamily: font.display,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.02em",
    color: ui.body,
  },
  lead: {
    margin: 0,
    maxWidth: "36em",
    fontSize: { default: 16, ["@media (min-width: 1280px)"]: 17 },
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: ui.ink,
    textWrap: "pretty",
  },
  figure: {
    margin: 0,
  },
  lobby: {
    display: "block",
    width: "100%",
    height: "auto",
    aspectRatio: "3 / 2",
    objectFit: "cover",
  },
  caption: {
    marginTop: 12,
    fontSize: 12,
    letterSpacing: "0.1em",
    color: ui.body,
  },
  network: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      ["@media (min-width: 1280px)"]: "minmax(0, 5fr) minmax(0, 6fr)",
    },
    columnGap: 96,
    rowGap: 32,
    alignItems: "start",
    marginTop: { default: 72, ["@media (min-width: 1280px)"]: 112 },
  },
  count: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.08em",
    fontSize: { default: 72, ["@media (min-width: 1280px)"]: 96 },
    lineHeight: 1,
    color: ui.ink,
  },
  unit: {
    fontFamily: font.unit,
    fontSize: "0.34em",
    fontStyle: "italic",
    fontWeight: 400,
    color: ui.body,
  },
  networkLabel: {
    margin: 0,
    marginTop: 16,
    fontSize: 14,
    letterSpacing: "0.08em",
    color: ui.body,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 28,
    rowGap: 12,
    margin: 0,
    padding: 0,
    maxWidth: "36em",
    listStyle: "none",
    fontSize: { default: 16, ["@media (min-width: 1280px)"]: 17 },
    letterSpacing: "0.06em",
    color: ui.ink,
  },
  countryMore: {
    color: ui.body,
  },
  panorama: {
    margin: 0,
    marginTop: { default: 80, ["@media (min-width: 1280px)"]: 144 },
  },
  panoramaImage: {
    display: "block",
    width: "100%",
    height: "auto",
    aspectRatio: { default: "4 / 3", ["@media (min-width: 768px)"]: "2400 / 1000" },
    objectFit: "cover",
    objectPosition: "center 55%",
  },
  panoramaCaption: {
    paddingBlock: 14,
    fontSize: 12,
    letterSpacing: "0.1em",
    color: ui.body,
  },
});

export function Profile() {
  return (
    <section
      id="about-profile"
      aria-label="Company overview"
      {...stylex.attrs(shared.anchor, styles.section)}
    >
      <div {...stylex.attrs(shared.shell, shared.inset)}>
        <div {...stylex.attrs(styles.top)}>
          <Reveal sx={styles.copy}>
            <h2 {...stylex.attrs(styles.name)}>{ABOUT_HERO.title}</h2>
            <div lang="en" {...stylex.attrs(styles.english)}>
              {ABOUT_HERO.englishTitle}
            </div>
            <p {...stylex.attrs(styles.lead)}>{ABOUT_HERO.lead}</p>
          </Reveal>
          <Reveal step={1}>
            <figure {...stylex.attrs(styles.figure)}>
              <img
                src={ABOUT_HERO.lobbyImage}
                alt="Fenchem headquarters lobby with a curved ceiling and marble floor"
                loading="lazy"
                decoding="async"
                {...stylex.attrs(styles.lobby)}
              />
              <figcaption {...stylex.attrs(styles.caption)}>{ABOUT_HERO.lobbyCaption}</figcaption>
            </figure>
          </Reveal>
        </div>

        <div {...stylex.attrs(styles.network)}>
          <div>
            <div {...stylex.attrs(styles.count)}>
              <Odometer value={COUNTRY_TOTAL} />
              <span {...stylex.attrs(styles.unit)}>国</span>
            </div>
            <p {...stylex.attrs(styles.networkLabel)}>{ABOUT_HERO.networkLabel}</p>
          </div>
          <Reveal>
            <ul {...stylex.attrs(styles.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li>{country}</li>
              ))}
              <li {...stylex.attrs(styles.countryMore)}>等地</li>
            </ul>
          </Reveal>
        </div>
      </div>

      <figure {...stylex.attrs(styles.panorama)}>
        <img
          src={ABOUT_MOMENT.image}
          alt={ABOUT_MOMENT.alt}
          loading="lazy"
          decoding="async"
          {...stylex.attrs(styles.panoramaImage)}
        />
        <figcaption {...stylex.attrs(shared.shell, shared.inset, styles.panoramaCaption)}>
          {ABOUT_MOMENT.caption}
        </figcaption>
      </figure>
    </section>
  );
}
