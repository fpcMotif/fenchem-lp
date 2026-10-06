import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { AT_REST } from "./counterweight";
import { Pair } from "./pair";
import { StillPoint } from "./still-point";
import { type, ui } from "./shared";
import { bp, scale, tone } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    scrollMarginTop: 80,
  },
  rest: {
    paddingTop: { default: 72, [bp.wide]: 152 },
  },
  desc: {
    maxWidth: "27em",
    color: tone.ink,
  },
  outcomes: {
    display: "grid",
    margin: 0,
    marginTop: { default: 28, [bp.wide]: 44 },
    padding: 0,
    listStyleType: "none",
  },
  outcome: {
    display: "grid",
    gridTemplateColumns: { default: "40px minmax(0, 1fr)", [bp.wide]: "56px minmax(0, 1fr)" },
    alignItems: "baseline",
    paddingBlock: { default: 14, [bp.wide]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  outcomeTitle: {
    fontSize: scale.heading,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
  },
  frame: {
    margin: 0,
    aspectRatio: "3 / 2",
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  image: {
    objectPosition: "50% 70%",
  },
});

export function Csr() {
  return (
    <section id="about-csr" aria-labelledby="oos1x-csr" {...stylex.props(styles.section)}>
      <StillPoint />
      <div {...stylex.props(ui.shell, styles.rest)}>
        <Pair
          lever={AT_REST}
          load={
            <figure {...stylex.props(styles.frame)}>
              <img
                src={ABOUT_CSR.image}
                alt={ABOUT_CSR.imageAlt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, styles.image)}
              />
            </figure>
          }
        >
          <p {...stylex.props(type.body, styles.desc)}>{ABOUT_CSR.desc}</p>
          <ul {...stylex.props(styles.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome, index) => (
              <li key={outcome.title} {...stylex.props(styles.outcome)}>
                <span aria-hidden="true" {...stylex.props(type.counterweight, type.counterHeading)}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span {...stylex.props(type.light, styles.outcomeTitle)}>{outcome.title}</span>
              </li>
            ))}
          </ul>
        </Pair>
      </div>
    </section>
  );
}
