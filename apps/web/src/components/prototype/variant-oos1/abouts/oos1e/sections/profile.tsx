import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../../about-data";
import { Sheet } from "../sheet";
import { base, Reveal } from "../shared";
import { PROFILE_SHEET } from "../sheets";
import { color, font, media } from "../tokens.stylex";

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [media.lgUp]: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
    },
    columnGap: 96,
    rowGap: 56,
    alignItems: "center",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 40, [media.lgUp]: 56 },
  },
  name: {
    margin: 0,
    fontSize: { default: 32, [media.md]: 44, [media.xlUp]: 56 },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.02em",
    color: color.ink,
    textWrap: "balance",
  },
  english: {
    margin: 0,
    marginTop: { default: 12, [media.lgUp]: 16 },
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: 20, [media.lgUp]: 24 },
    lineHeight: 1.3,
    color: color.body,
  },
  lead: {
    margin: 0,
    maxWidth: "32em",
    fontSize: { default: 16, [media.lgUp]: 17 },
    lineHeight: 1.95,
    letterSpacing: "0.04em",
    color: color.ink,
  },
  network: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    paddingTop: { default: 28, [media.lgUp]: 32 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: color.hairline,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: { default: 20, [media.lgUp]: 26 },
    rowGap: 8,
    maxWidth: "32em",
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: { default: 15, [media.lgUp]: 16 },
    lineHeight: 1.7,
    letterSpacing: "0.06em",
    color: color.body,
  },
  more: {
    color: color.muted,
  },
  figure: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    margin: 0,
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: "4 / 5",
    borderRadius: 2,
    backgroundColor: color.tint,
  },
});

export function ProfileSheet() {
  return (
    <Sheet def={PROFILE_SHEET}>
      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.text)}>
          <Reveal>
            <h3 {...stylex.props(styles.name)}>{ABOUT_HERO.title}</h3>
            <p lang="en" {...stylex.props(styles.english)}>
              {ABOUT_HERO.englishTitle}
            </p>
          </Reveal>
          <Reveal step={1}>
            <p {...stylex.props(styles.lead)}>
              <span {...stylex.props(base.balance)}>{ABOUT_HERO.lead}</span>
            </p>
          </Reveal>
          <Reveal step={2} sx={styles.network}>
            <p {...stylex.props(base.quiet)}>{ABOUT_HERO.networkLabel}</p>
            <ul {...stylex.props(styles.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li key={country}>{country}</li>
              ))}
              <li {...stylex.props(styles.more)}>等地</li>
            </ul>
          </Reveal>
        </div>
        <Reveal step={1}>
          <figure {...stylex.props(styles.figure)}>
            <div {...stylex.props(styles.frame)}>
              <img
                src={ABOUT_HERO.lobbyImage}
                alt="泛成总部大堂，弧形吊顶与大理石地面"
                loading="lazy"
                decoding="async"
                {...stylex.props(base.fill)}
              />
            </div>
            <figcaption {...stylex.props(base.quiet)}>{ABOUT_HERO.lobbyCaption}</figcaption>
          </figure>
        </Reveal>
      </div>
    </Sheet>
  );
}
