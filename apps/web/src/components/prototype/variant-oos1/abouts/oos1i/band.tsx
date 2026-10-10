import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_MOMENT } from "../../about-data";
import { STATS } from "../../content";
import { Reveal, ScrollWipe } from "./motion";
import { Frame, SectionName } from "./primitives";
import { base } from "./primitives-values";
import { font, media, shear, tone } from "./shear.stylex";

const S = stylex.create({
  band: {
    position: "relative",
    isolation: "isolate",
    containerType: "inline-size",
    marginBlock: `calc(${shear.drop} * -1)`,
    color: colors.paper,
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    clipPath: shear.cutBoth,
    backgroundColor: tone.navy,
  },
  stats: {
    paddingTop: { default: 40, [breakpoints.md]: 56 },
    paddingBottom: {
      default: `calc(${shear.drop} + 56px)`,
      [media.desktop]: `calc(${shear.drop} + 72px)`,
    },
  },
  caption: {
    marginBottom: { default: 32, [breakpoints.md]: 48 },
  },
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 48,
    rowGap: 32,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.paleRule,
  },
  figure: {
    display: "flex",
    alignItems: "baseline",
    gap: 6,
    fontFamily: font.display,
    fontSize: { default: 64, [breakpoints.md]: "clamp(48px, 6.4vw, 92px)" },
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.03em",
    fontVariantNumeric: "tabular-nums",
  },
  unit: {
    fontSize: "0.4em",
    color: tone.mint,
  },
  text: {
    margin: 0,
    fontFamily: font.sans,
    fontSize: 15,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: tone.white80,
  },
});

export function Band() {
  return (
    <section id="about-stats" aria-labelledby="about-stats-title" {...stylex.props(S.band)}>
      <span aria-hidden="true" {...stylex.props(S.bg)} />
      <SectionName id="about-stats-title">Growth figures</SectionName>
      <ScrollWipe>
        <Frame src={ABOUT_MOMENT.image} alt={ABOUT_MOMENT.alt} ratio="12 / 5" position="50% 38%" />
      </ScrollWipe>
      <div {...stylex.props(base.shell, base.inset, S.stats)}>
        <p {...stylex.props(base.quiet, base.quietOnDark, S.caption)}>{ABOUT_MOMENT.caption}</p>
        <ul {...stylex.props(S.list)}>
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} as="li" delay={index * 120} sx={S.stat}>
              <p {...stylex.props(base.quiet, base.quietOnDark)}>{stat.label}</p>
              <div lang="en" {...stylex.props(S.figure)}>
                <span>{stat.value}</span>
                {stat.unit ? <span {...stylex.props(S.unit)}>{stat.unit}</span> : null}
              </div>
              <p {...stylex.props(S.text)}>{stat.caption}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
