import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR, ABOUT_CULTURE } from "../../about-data";
import { Reveal, SectionName } from "./parts";
import { base, ty } from "./shared";
import { font, hue, size } from "./theme.stylex";

const WATER = `linear-gradient(rgba(11, 42, 92, 0.3), rgba(11, 42, 92, 0.3)), url(${ABOUT_CSR.image})`;

const styles = stylex.create({
  culture: {
    backgroundColor: hue.page,
  },
  values: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: { default: 40, [breakpoints.xl]: 56 },
    rowGap: 56,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  value: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    paddingTop: { default: 28, [breakpoints.lg]: 36 },
  },
  rule: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: hue.hairline,
  },
  ruleInk: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: hue.ink,
    transformOrigin: "left center",
    transform: { default: "scaleX(0)", [stylex.when.ancestor(":hover")]: "none" },
    transitionProperty: "transform",
    transitionDuration: "900ms",
    transitionTimingFunction: size.ease,
  },
  glyph: {
    alignSelf: "flex-start",
    fontSize: "clamp(112px, 10.4vw, 160px)",
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: 8,
    color: "transparent",
    backgroundColor: hue.glyphBlue,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto 520%",
    translate: {
      default: null,
      [stylex.when.ancestor(":hover")]: { default: null, [breakpoints.motionOk]: "0 -4px" },
    },
    transitionProperty: "background-position, translate",
    transitionDuration: "2400ms, 900ms",
    transitionTimingFunction: size.ease,
  },
  glyphImage: (image: string) => ({
    backgroundImage: image,
  }),
  water0: {
    backgroundPosition: {
      default: "0 0, 12% 96%",
      [stylex.when.ancestor(":hover")]: "0 0, 26% 88%",
    },
  },
  water1: {
    backgroundPosition: {
      default: "0 0, 46% 96%",
      [stylex.when.ancestor(":hover")]: "0 0, 60% 88%",
    },
  },
  water2: {
    backgroundPosition: {
      default: "0 0, 80% 96%",
      [stylex.when.ancestor(":hover")]: "0 0, 94% 88%",
    },
  },
  numeral: {
    position: "absolute",
    top: { default: 28, [breakpoints.lg]: 36 },
    right: 0,
    fontFamily: font.display,
    fontSize: 11,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.14em",
    color: hue.quiet,
  },
  title: {
    margin: 0,
    fontSize: "clamp(24px, 2.2vw, 30px)",
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.08em",
    color: hue.ink,
  },
  desc: {
    wordBreak: { default: "normal", [breakpoints.lg]: "keep-all" },
    overflowWrap: "anywhere",
  },
});

const GLYPH_WATER = [styles.water0, styles.water1, styles.water2] as const;

export function Culture() {
  return (
    <section
      id="about-culture"
      aria-labelledby="about-culture-title"
      {...stylex.props(base.section, base.anchor, styles.culture)}
    >
      <SectionName id="about-culture-title">企业文化</SectionName>
      <div {...stylex.props(base.shell)}>
        <ul {...stylex.props(styles.values)}>
          {ABOUT_CULTURE.values.map((value, idx) => (
            <Reveal
              key={value.title}
              as="li"
              step={idx}
              sx={[styles.value, stylex.defaultMarker()]}
            >
              <span aria-hidden="true" {...stylex.props(styles.rule)} />
              <span aria-hidden="true" {...stylex.props(styles.ruleInk)} />
              <span aria-hidden="true" lang="en" {...stylex.props(styles.numeral)}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                {...stylex.props(styles.glyph, styles.glyphImage(WATER), GLYPH_WATER[idx])}
              >
                {value.glyph}
              </span>
              <h3 {...stylex.props(styles.title)}>{value.title}</h3>
              <p {...stylex.props(ty.body, styles.desc)}>{value.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
