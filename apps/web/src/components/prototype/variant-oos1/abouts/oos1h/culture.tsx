import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../about-data";
import { Reveal } from "./reveal";
import { shared } from "./shared";
import { mq, ui } from "./theme.stylex";

const styles = stylex.create({
  section: {
    backgroundColor: ui.paperWarm,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [mq.tablet]: 40, [breakpoints.xl]: 96 },
    rowGap: 72,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  value: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 24,
  },
  glyph: {
    display: "block",
    fontSize: { default: 120, [breakpoints.xl]: 168 },
    fontWeight: 500,
    lineHeight: 1,
  },
  glyphBlue: { color: ui.glyphBlue },
  glyphSand: { color: ui.glyphSand },
  glyphGreen: { color: ui.glyphGreen },
  title: {
    margin: 0,
    fontSize: { default: 24, [breakpoints.xl]: 28 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.08em",
    color: ui.ink,
  },
  desc: {
    margin: 0,
    maxWidth: "22em",
    fontSize: 15,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: ui.body,
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
      {...stylex.props(shared.anchor, shared.section, styles.section)}
    >
      <h2 id="about-culture-title" {...stylex.props(shared.srOnly)}>
        {ABOUT_CULTURE.eyebrow}
      </h2>
      <div {...stylex.props(shared.shell, shared.inset)}>
        <ul {...stylex.props(styles.grid)}>
          {ABOUT_CULTURE.values.map((value, position) => (
            <Reveal key={value.title} as="li" step={position} sx={styles.value}>
              <span aria-hidden="true" {...stylex.props(styles.glyph, TONES[value.tone])}>
                {value.glyph}
              </span>
              <h3 {...stylex.props(styles.title)}>{value.title}</h3>
              <p {...stylex.props(styles.desc)}>{value.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
