import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../about-data";
import { Fold, s } from "./shared";
import { fonts, palette } from "./tokens.stylex";

const QUIET_INDEX = 1;

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.xl]: 32 },
    rowGap: { default: 40, [breakpoints.md]: 0 },
    maxWidth: 1180,
    marginInline: "auto",
  },
  value: {
    alignItems: "center",
    paddingInline: { default: 8, [breakpoints.md]: 12, [breakpoints.xl]: 32 },
    textAlign: "center",
  },
  quiet: {
    translate: { default: "0 0", [breakpoints.md]: "0 40px" },
  },
  glyph: {
    marginBottom: "0.08em",
    fontFamily: fonts.cjk,
    fontSize: { default: 140, [breakpoints.md]: "min(13vw, 184px)" },
    fontWeight: 500,
    lineHeight: 1,
    userSelect: "none",
  },
  glyphBlue: { color: palette.glyphBlue },
  glyphSand: { color: palette.glyphSand },
  glyphGreen: { color: palette.glyphGreen },
  title: {
    position: "relative",
    margin: 0,
    paddingInlineStart: "0.1em",
    fontSize: { default: 22, [breakpoints.xl]: 24 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.1em",
    color: palette.ink,
  },
  desc: {
    margin: 0,
    marginTop: 18,
    maxWidth: "19em",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: palette.body,
    textWrap: "pretty",
  },
});

const GLYPH_TONES = {
  blue: styles.glyphBlue,
  sand: styles.glyphSand,
  green: styles.glyphGreen,
} as const;

export function Culture() {
  return (
    <section
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.props(s.section, s.bandPage)}
    >
      <h2 id="about-culture-title" {...stylex.props(s.srOnly)}>
        {ABOUT_CULTURE.title}
      </h2>
      <div {...stylex.props(s.shell)}>
        <div {...stylex.props(styles.grid)}>
          {ABOUT_CULTURE.values.map((value, idx) => (
            <Fold
              key={value.title}
              step={idx}
              innerSx={[styles.value, idx === QUIET_INDEX && styles.quiet]}
            >
              <span aria-hidden="true" {...stylex.props(styles.glyph, GLYPH_TONES[value.tone])}>
                {value.glyph}
              </span>
              <h3 {...stylex.props(styles.title)}>{value.title}</h3>
              <p {...stylex.props(styles.desc)}>{value.desc}</p>
            </Fold>
          ))}
        </div>
      </div>
    </section>
  );
}
