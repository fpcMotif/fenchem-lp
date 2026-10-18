import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { layout } from "./layout";
import { media, palette } from "./palette.stylex";
import { Reveal } from "./reveal";

const LG = "@media (min-width: 1024px)";
const INSET_120 = "min(120px, 8.333vw)";

const styles = stylex.create({
  section: {
    paddingBlock: { default: 72, ["@media (min-width: 1280px)"]: 128 },
    backgroundColor: colors.paper,
  },
  grid: {
    alignItems: "center",
  },
  photoCell: {
    boxSizing: "border-box",
    paddingBottom: { default: 32, [LG]: 0 },
    paddingInlineStart: { default: 0, [LG]: INSET_120 },
    paddingInlineEnd: { default: 0, [LG]: 48 },
  },
  textCell: {
    paddingInlineEnd: {
      default: 20,
      ["@media (min-width: 640px)"]: 28,
      [media.tablet]: 40,
      [LG]: INSET_120,
    },
  },
  photo: {
    position: "relative",
    overflow: "hidden",
    margin: 0,
    aspectRatio: { default: "4 / 3", [LG]: "5 / 6" },
    backgroundColor: palette.tint,
  },
  lobby: {
    objectPosition: "28% 50%",
  },
  caption: {
    position: "absolute",
    left: 0,
    bottom: 0,
    margin: 0,
    paddingBlock: 6,
    paddingInline: 12,
    backgroundColor: colors.paper,
    fontFamily: palette.fontBody,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: palette.body,
  },
  name: {
    margin: 0,
    maxWidth: "9em",
    fontFamily: palette.fontBody,
    fontSize: { default: 32, [media.tablet]: 40, [LG]: "clamp(36px, 3.4vw, 48px)" },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.02em",
    color: palette.ink,
    textWrap: "balance",
  },
  english: {
    margin: 0,
    marginTop: 10,
    fontSize: 14,
    letterSpacing: "0.02em",
    color: palette.body,
  },
  lead: {
    margin: 0,
    maxWidth: "30em",
    fontSize: { default: 16, [LG]: 17 },
    lineHeight: 2,
    letterSpacing: "0.05em",
    color: palette.ink,
    textWrap: "pretty",
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 24px",
    margin: 0,
    padding: 0,
    listStyle: "none",
    fontSize: 15,
    letterSpacing: "0.05em",
    color: palette.ink,
  },
  more: {
    color: palette.body,
  },
});

export function Profile() {
  return (
    <section
      id="about-profile"
      aria-label="Company overview"
      {...stylex.attrs(styles.section, layout.anchor)}
    >
      <div {...stylex.attrs(layout.shell, layout.split, styles.grid)}>
        <div {...stylex.attrs(styles.photoCell)}>
          <Reveal as="figure" sx={styles.photo}>
            <img
              src={ABOUT_HERO.lobbyImage}
              alt="Fenchem headquarters lobby with a curved ceiling and marble floor"
              loading="lazy"
              decoding="async"
              {...stylex.attrs(layout.fill, styles.lobby)}
            />
            <figcaption {...stylex.attrs(styles.caption)}>{ABOUT_HERO.lobbyCaption}</figcaption>
          </Reveal>
        </div>
        <div {...stylex.attrs(layout.padRight, layout.stack, styles.textCell)}>
          <Reveal>
            <h2 {...stylex.attrs(styles.name)}>{ABOUT_HERO.title}</h2>
            <p lang="en" {...stylex.attrs(styles.english)}>
              {ABOUT_HERO.englishTitle}
            </p>
          </Reveal>
          <Reveal step={1}>
            <p {...stylex.attrs(styles.lead)}>{ABOUT_HERO.lead}</p>
          </Reveal>
          <Reveal step={2} sx={layout.stack}>
            <p {...stylex.attrs(layout.label)}>{ABOUT_HERO.networkLabel}</p>
            <ul {...stylex.attrs(styles.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li>{country}</li>
              ))}
              <li {...stylex.attrs(styles.more)}>等地</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
