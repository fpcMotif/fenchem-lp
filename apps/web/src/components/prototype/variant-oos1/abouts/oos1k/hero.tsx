import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER, ABOUT_HERO } from "../../about-data";
import { PoleMark } from "./shared";
import { srOnly, ui } from "./shared-values";
import { bp, chrome, face, sky } from "./tokens.stylex";

const NUMERALS = ["I", "II", "III", "IV", "V", "VI"] as const;
const [LEAD_SINCE, LEAD_FOCUS] = ABOUT_BANNER.lead.split(" · ");

const styles = stylex.create({
  hero: {
    position: "relative",
  },
  stage: {
    position: "relative",
    display: "grid",
    gridTemplateRows: "1fr 0 1fr",
    height: chrome.sky,
    minHeight: 560,
  },
  margin: {
    position: "absolute",
    top: { default: 20, [bp.desktop]: 28 },
    insetInline: 0,
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
  },
  upper: {
    alignSelf: "end",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { default: 14, [bp.desktop]: 18 },
    paddingBottom: { default: 44, [bp.desktop]: 56 },
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 72, [bp.tablet]: 112, [bp.desktop]: "clamp(120px, 10.5vw, 168px)" },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.06em",
    marginInlineEnd: "-0.06em",
    color: sky.star,
  },
  poleRow: {
    position: "relative",
  },
  poleLabel: {
    position: "absolute",
    top: 0,
    left: "calc(50% + 22px)",
    display: "flex",
    flexDirection: { default: "column", [bp.wideUp]: "row" },
    alignItems: { default: "flex-start", [bp.wideUp]: "baseline" },
    gap: { default: 2, [bp.wideUp]: 10 },
    margin: 0,
    transform: "translateY(-50%)",
    whiteSpace: "nowrap",
  },
  poleName: {
    fontFamily: face.sans,
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: sky.tint,
  },
  lower: {
    alignSelf: "start",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { default: 14, [bp.desktop]: 18 },
    paddingTop: { default: 44, [bp.desktop]: 56 },
    textAlign: "center",
  },
  tagline: {
    margin: 0,
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 27, [bp.tablet]: 32, [bp.desktop]: 38 },
    lineHeight: 1.2,
    color: sky.star,
  },
  lead: {
    maxWidth: "36em",
    fontSize: { default: 16, [bp.desktop]: 18 },
    lineHeight: 1.8,
    color: sky.text,
  },
  leadBreak: {
    display: { default: "block", [bp.wideUp]: "inline" },
    height: { default: 0, [bp.wideUp]: "auto" },
    overflow: { default: "hidden", [bp.wideUp]: "visible" },
  },
  index: {
    position: "absolute",
    bottom: { default: 20, [bp.desktop]: 28 },
    insetInline: 0,
  },
  list: {
    display: "grid",
    gridTemplateColumns: { default: "repeat(3, minmax(0, 1fr))", [bp.wideUp]: "repeat(6, auto)" },
    justifyContent: { default: "stretch", [bp.wideUp]: "space-between" },
    rowGap: 4,
    columnGap: 12,
    margin: 0,
    padding: 0,
    paddingTop: { default: 12, [bp.desktop]: 16 },
    listStyleType: "none",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: sky.hair,
  },
  link: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 8,
    minHeight: 32,
    paddingBlock: 6,
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    letterSpacing: "0.04em",
    color: { default: sky.text, ":hover": sky.star },
    textDecoration: "none",
    transitionProperty: "color",
    transitionDuration: "200ms",
  },
  linkNumeral: {
    minWidth: "1.4em",
    fontSize: 19,
    color: sky.muted,
  },
});

export function Hero() {
  return (
    <section aria-labelledby="oos1k-title" {...stylex.props(styles.hero)}>
      <div {...stylex.props(ui.shell)}>
        <div {...stylex.props(styles.stage)}>
          <div {...stylex.props(styles.margin)}>
            <p lang="en" {...stylex.props(ui.label)}>
              Atlas of Fenchem
            </p>
            <p lang="en" {...stylex.props(ui.label)}>
              {ABOUT_BANNER.established} · {ABOUT_BANNER.place}
            </p>
          </div>

          <div {...stylex.props(styles.upper)}>
            <p {...stylex.props(ui.label)}>泛成星图</p>
            <h1 id="oos1k-title" {...stylex.props(styles.title)}>
              {ABOUT_BANNER.title}
            </h1>
          </div>

          <div {...stylex.props(styles.poleRow)}>
            <PoleMark />
            <p {...stylex.props(styles.poleLabel)}>
              <span {...stylex.props(styles.poleName)}>天极 · 南京</span>
              <span lang="en" {...stylex.props(ui.label)}>
                Pole · 32°03′ N 118°47′ E
              </span>
            </p>
          </div>

          <div {...stylex.props(styles.lower)}>
            <p lang="en" {...stylex.props(styles.tagline)}>
              {ABOUT_BANNER.tagline}
            </p>
            <p {...stylex.props(ui.body, styles.lead)}>
              {LEAD_SINCE}
              <span {...stylex.props(styles.leadBreak)}> · </span>
              {LEAD_FOCUS}
            </p>
          </div>

          <nav aria-label="星图目录" {...stylex.props(styles.index)}>
            <ol {...stylex.props(styles.list)}>
              {ABOUT_HERO.navChips.map((chip, index) => (
                <li key={chip.id}>
                  <a href={`#${chip.id}`} {...stylex.props(styles.link, ui.focusable)}>
                    <span aria-hidden="true" {...stylex.props(ui.designation, styles.linkNumeral)}>
                      {NUMERALS[index]}
                    </span>
                    <span {...srOnly}>第 {index + 1} 图 </span>
                    {chip.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
