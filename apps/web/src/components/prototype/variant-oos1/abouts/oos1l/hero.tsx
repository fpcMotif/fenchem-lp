import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER, ABOUT_HERO } from "../../about-data";
import { Clause } from "./clause";
import { SENTENCE } from "./sentence";
import { ui } from "./shared";
import { bp, chrome, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  hero: {
    position: "relative",
    paddingTop: chrome.heroTop,
    paddingBottom: 0,
  },
  meta: {
    position: "absolute",
    top: { default: 32, [bp.desktop]: 48 },
    insetInline: 0,
  },
  metaRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 24,
  },
  place: {
    margin: 0,
  },
  title: {
    margin: 0,
    fontWeight: "inherit",
  },
  foot: {
    display: "flex",
    flexDirection: { default: "column", [bp.desktop]: "row" },
    alignItems: { default: "flex-end", [bp.desktop]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 8, [bp.desktop]: 32 },
    marginTop: { default: 40, [bp.tablet]: 56, [bp.desktop]: 64 },
  },
  english: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: { default: 13, [bp.desktop]: 14 },
    fontWeight: 500,
    letterSpacing: "0.01em",
    color: tone.body,
  },
  tagline: {
    margin: 0,
    fontFamily: face.serif,
    fontSize: { default: 22, [bp.tablet]: 26, [bp.desktop]: 30 },
    fontStyle: "italic",
    lineHeight: 1.2,
    color: tone.navy,
    textAlign: "end",
  },
});

export function Hero() {
  const [head, tail] = SENTENCE.hero;
  return (
    <div {...stylex.attrs(styles.hero)}>
      <div {...stylex.attrs(styles.meta)}>
        <div {...stylex.attrs(ui.shell, styles.metaRow)}>
          <p {...stylex.attrs(ui.label)}>
            <span>{ABOUT_BANNER.title}</span>
            <span lang="en" {...stylex.attrs(ui.labelEn)}>
              About Fenchem, in one sentence
            </span>
          </p>
          <p lang="en" {...stylex.attrs(ui.note, styles.place)}>
            {ABOUT_BANNER.established} · {ABOUT_BANNER.place}
          </p>
        </div>
      </div>
      <div {...stylex.attrs(ui.shell)}>
        <h1 {...stylex.attrs(styles.title)}>
          <Clause line={head} as="span" />
          <Clause line={tail} as="span" />
        </h1>
        <div {...stylex.attrs(styles.foot)}>
          <p lang="en" {...stylex.attrs(styles.english)}>
            {ABOUT_HERO.englishTitle}
          </p>
          <p lang="en" {...stylex.attrs(styles.tagline)}>
            {ABOUT_BANNER.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
