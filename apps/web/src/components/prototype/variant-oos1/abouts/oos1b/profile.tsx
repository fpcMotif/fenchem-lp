import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { Fold, s } from "./shared";
import { fonts, palette } from "./tokens.stylex";

const HALF = Math.ceil(ABOUT_HERO.countries.length / 2);
const NAME_GLYPHS = Array.from(ABOUT_HERO.title);
const NAME_SPLIT = Math.ceil(NAME_GLYPHS.length / 2);

const dynamic = stylex.create({
  rows: (count: number) => ({ gridTemplateRows: `repeat(${count}, auto)` }),
});

const styles = stylex.create({
  spread: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(2, minmax(0, 1fr))",
    },
    alignItems: "start",
    rowGap: 28,
  },
  name: {
    margin: 0,
    paddingInlineEnd: { default: 0, [breakpoints.lg]: 48 },
    fontSize: {
      default: 34,
      [breakpoints.md]: "min(5.6vw, 48px)",
      [breakpoints.lg]: "min(5vw, 72px)",
    },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.02em",
    textAlign: { default: "center", [breakpoints.lg]: "end" },
    color: palette.ink,
  },
  nameLine: {
    display: "block",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingInlineStart: { default: 0, [breakpoints.lg]: 48 },
    textAlign: { default: "center", [breakpoints.lg]: "start" },
  },
  english: {
    margin: 0,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: palette.quiet,
  },
  lead: {
    maxWidth: "34em",
    margin: 0,
    marginInline: { default: "auto", [breakpoints.lg]: 0 },
    fontSize: { default: 16, [breakpoints.lg]: 17 },
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: palette.body,
    textWrap: "pretty",
  },
  network: {
    marginTop: { default: 56, [breakpoints.lg]: 96 },
  },
  networkLabel: {
    margin: 0,
    marginBottom: 12,
    textAlign: "center",
  },
  ledgerWrap: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    maxWidth: 760,
    marginInline: "auto",
  },
  ledger: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gridAutoFlow: "column",
    columnGap: { default: 28, [breakpoints.md]: 64 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    paddingBlock: { default: 14, [breakpoints.md]: 18 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: palette.hairline,
  },
  rowStart: { justifyContent: "flex-end" },
  rowEnd: { justifyContent: "flex-start" },
  country: {
    fontFamily: fonts.cjk,
    fontSize: { default: 17, [breakpoints.md]: 20 },
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: palette.ink,
  },
  more: {
    alignSelf: { default: "flex-end", [breakpoints.xl]: "auto" },
    marginTop: { default: 14, [breakpoints.xl]: 0 },
    position: { default: "static", [breakpoints.xl]: "absolute" },
    insetInlineStart: { default: "auto", [breakpoints.xl]: "calc(100% + 24px)" },
    bottom: { default: "auto", [breakpoints.xl]: 14 },
    fontSize: 15,
    fontWeight: 400,
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
    color: palette.quiet,
  },
  figure: {
    width: "100%",
    maxWidth: 1120,
    margin: 0,
    marginInline: "auto",
    marginTop: { default: 56, [breakpoints.lg]: 96 },
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "16 / 8" },
    backgroundColor: palette.page,
  },
  figcaption: {
    marginTop: 14,
    textAlign: "center",
  },
});

export function Profile() {
  return (
    <section id="about-profile" aria-label="企业概况" {...stylex.props(s.section, s.bandPaper)}>
      <div {...stylex.props(s.shell)}>
        <div {...stylex.props(styles.spread)}>
          <Fold side="rise">
            <h2 {...stylex.props(styles.name)}>
              <span {...stylex.props(styles.nameLine)}>
                {NAME_GLYPHS.slice(0, NAME_SPLIT).join("")}
              </span>
              <span {...stylex.props(styles.nameLine)}>
                {NAME_GLYPHS.slice(NAME_SPLIT).join("")}
              </span>
            </h2>
          </Fold>
          <Fold side="rise" step={1}>
            <div {...stylex.props(styles.copy)}>
              <p lang="en" {...stylex.props(styles.english)}>
                {ABOUT_HERO.englishTitle}
              </p>
              <p {...stylex.props(styles.lead)}>{ABOUT_HERO.lead}</p>
            </div>
          </Fold>
        </div>

        <div {...stylex.props(styles.network)}>
          <p {...stylex.props(s.caption, styles.networkLabel)}>{ABOUT_HERO.networkLabel}</p>
          <div {...stylex.props(styles.ledgerWrap)}>
            <ul {...stylex.props(styles.ledger, dynamic.rows(HALF))}>
              {ABOUT_HERO.countries.map((country, idx) => (
                <Fold
                  key={country}
                  as="li"
                  step={idx % HALF}
                  innerSx={[styles.row, idx < HALF ? styles.rowStart : styles.rowEnd]}
                >
                  <span {...stylex.props(styles.country)}>{country}</span>
                </Fold>
              ))}
            </ul>
            <span {...stylex.props(styles.more)}>等地</span>
          </div>
        </div>

        <Fold side="rise">
          <figure {...stylex.props(styles.figure)}>
            <div {...stylex.props(styles.frame)}>
              <img
                src={ABOUT_HERO.lobbyImage}
                alt="泛成总部大堂，弧形吊顶与大理石地面"
                loading="lazy"
                decoding="async"
                {...stylex.props(s.fill)}
              />
            </div>
            <figcaption {...stylex.props(s.caption, styles.figcaption)}>
              {ABOUT_HERO.lobbyCaption}
            </figcaption>
          </figure>
        </Fold>
      </div>
    </section>
  );
}
