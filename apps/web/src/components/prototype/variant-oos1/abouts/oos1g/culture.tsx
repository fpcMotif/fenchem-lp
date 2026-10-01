import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../about-data";
import { layout } from "./layout";
import { palette } from "./palette.stylex";
import { Reveal } from "./reveal";

const LG = breakpoints.lg;

const styles = stylex.create({
  section: {
    backgroundColor: palette.paperWarm,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  row: {
    alignItems: "center",
    paddingBlock: { default: 40, [LG]: 64 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.hairline,
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  value: {
    display: "flex",
    flexDirection: { default: "row", [LG]: "row-reverse" },
    alignItems: "center",
    justifyContent: { default: "flex-start", [LG]: "flex-start" },
    gap: { default: 20, [LG]: 36 },
  },
  glyph: {
    flexShrink: 0,
    fontFamily: palette.fontBody,
    fontSize: { default: 72, [LG]: 128 },
    fontWeight: 500,
    lineHeight: 1,
  },
  glyphBlue: { color: palette.glyphBlue },
  glyphSand: { color: palette.glyphSand },
  glyphGreen: { color: palette.glyphGreen },
  title: {
    margin: 0,
    fontFamily: palette.fontBody,
    fontSize: { default: 24, [LG]: 28 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.1em",
    color: palette.ink,
  },
  desc: {
    margin: 0,
    maxWidth: "28em",
    fontSize: { default: 16, [LG]: 17 },
    lineHeight: 2,
    letterSpacing: "0.05em",
    color: palette.body,
    textWrap: "pretty",
  },
});

const TONES = {
  blue: styles.glyphBlue,
  sand: styles.glyphSand,
  green: styles.glyphGreen,
} as const;

export function Culture() {
  return (
    <section
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.props(styles.section, layout.sectionY, layout.anchor)}
    >
      <h2 id="about-culture-title" {...stylex.props(layout.srOnly)}>
        企业文化
      </h2>
      <ol {...stylex.props(layout.shell, styles.list)}>
        {ABOUT_CULTURE.values.map((value, index) => (
          <li
            key={value.title}
            {...stylex.props(layout.split, styles.row, index === 0 && styles.rowFirst)}
          >
            <Reveal sx={[layout.padLeft, layout.seam]}>
              <div {...stylex.props(styles.value)}>
                <span aria-hidden="true" {...stylex.props(styles.glyph, TONES[value.tone])}>
                  {value.glyph}
                </span>
                <h3 {...stylex.props(styles.title)}>{value.title}</h3>
              </div>
            </Reveal>
            <Reveal step={1} sx={layout.padRight}>
              <p {...stylex.props(styles.desc)}>{value.desc}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
