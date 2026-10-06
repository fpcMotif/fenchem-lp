import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../about-data";
import { LEVER } from "./counterweight";
import { Pair, StandingTitle } from "./pair";
import { type, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const GLYPH_SHARE = 0.62;

const styles = stylex.create({
  title: {
    textWrap: "balance",
  },
  desc: {
    marginTop: { default: 14, [bp.wide]: 24 },
    maxWidth: "26em",
  },
  weight: {
    containerType: "inline-size",
  },
  glyph: {
    display: "block",
    width: "fit-content",
    margin: 0,
    fontFamily: face.sans,
    fontWeight: 900,
    fontSize: { default: "38cqw", [bp.wide]: "62cqw" },
    lineHeight: 1,
    color: tone.navy,
    marginTop: "-0.06em",
    marginBottom: "-0.1em",
  },
});

export function Culture() {
  return (
    <section id="about-culture" aria-labelledby="oos1x-culture" {...stylex.props(ui.anchor)}>
      {ABOUT_CULTURE.values.map((value, index) => (
        <Pair
          key={value.glyph}
          lever={LEVER}
          loadRatio={1 / GLYPH_SHARE}
          loadLine
          offset={index % 2 === 0 ? "start" : "end"}
          standing={
            index === 0 ? (
              <StandingTitle id="oos1x-culture" en="Culture">
                {ABOUT_CULTURE.title}
              </StandingTitle>
            ) : undefined
          }
          tag={
            <p aria-hidden="true" {...stylex.props(type.counterweight, type.counterDisplay)}>
              {String(index + 1).padStart(2, "0")}
            </p>
          }
          load={
            <div aria-hidden="true" {...stylex.props(styles.weight)}>
              <span {...stylex.props(styles.glyph, ui.knockout)}>{value.glyph}</span>
            </div>
          }
        >
          <h3 {...stylex.props(type.light, type.display, styles.title)}>{value.title}</h3>
          <p {...stylex.props(type.body, styles.desc)}>{value.desc}</p>
        </Pair>
      ))}
    </section>
  );
}
