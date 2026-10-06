import * as stylex from "@stylexjs/stylex";

import { ABOUT_STRUCTURE } from "../../about-data";
import { AT_REST } from "./counterweight";
import { Pair, StandingTitle } from "./pair";
import { type, ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    marginTop: { default: 24, [bp.wide]: 40 },
  },
  badge: {
    marginBottom: { default: 12, [bp.wide]: 18 },
  },
  subsidiaries: {
    display: "grid",
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  subsidiary: {
    display: "grid",
    rowGap: 6,
    paddingBlock: { default: 14, [bp.wide]: 18 },
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  name: {
    fontSize: "clamp(19px, 1.67vw, 24px)",
    lineHeight: 1.35,
    letterSpacing: "0.04em",
  },
  english: {
    margin: 0,
    fontFamily: face.display,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.01em",
    color: tone.body,
  },
  holding: {
    display: "grid",
    rowGap: 12,
  },
  holdingName: {
    margin: 0,
    paddingTop: { default: 0, [bp.wide]: 24 },
    fontFamily: face.sans,
    fontSize: "clamp(20px, 2.23vw, 32px)",
    fontWeight: 900,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: tone.navy,
  },
  holdingEnglish: {
    margin: 0,
    fontFamily: face.display,
    fontSize: "max(13px, calc(clamp(20px, 2.23vw, 32px) * 3 / 8))",
    fontWeight: 800,
    letterSpacing: "0.01em",
    color: tone.navy,
  },
});

export function Structure() {
  const { holding } = ABOUT_STRUCTURE;
  return (
    <section
      id="about-structure"
      aria-labelledby="oos1x-structure"
      {...stylex.props(ui.anchor, styles.section)}
    >
      <Pair
        lever={AT_REST}
        loadLine
        loadFirstOnPhone
        standing={
          <StandingTitle id="oos1x-structure" en="Structure">
            {ABOUT_STRUCTURE.title}
          </StandingTitle>
        }
        load={
          <div {...stylex.props(styles.holding)}>
            <p {...stylex.props(type.note)}>{holding.badge}</p>
            <p {...stylex.props(styles.holdingName)}>{holding.name}</p>
            <p lang="en" {...stylex.props(styles.holdingEnglish)}>
              {holding.english}
            </p>
          </div>
        }
      >
        <p {...stylex.props(type.note, styles.badge)}>{ABOUT_STRUCTURE.subsidiaryBadge}</p>
        <ul {...stylex.props(styles.subsidiaries)}>
          {ABOUT_STRUCTURE.subsidiaries.map((subsidiary) => (
            <li key={subsidiary.id} {...stylex.props(styles.subsidiary)}>
              <span {...stylex.props(type.light, styles.name)}>{subsidiary.name}</span>
              <span lang="en" {...stylex.props(styles.english)}>
                {subsidiary.english}
              </span>
            </li>
          ))}
        </ul>
      </Pair>
    </section>
  );
}
