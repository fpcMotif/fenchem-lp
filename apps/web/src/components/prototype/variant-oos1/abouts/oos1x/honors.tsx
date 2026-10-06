import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import { AT_REST } from "./counterweight";
import { Pair, StandingTitle } from "./pair";
import { type, ui } from "./shared";
import { bp, face, scale, tone } from "./tokens.stylex";

type Level = (typeof ABOUT_HONORS.items)[number]["level"];

const LEVELS: readonly { level: Level; label: string; english: string }[] = [
  { level: "national", label: "国家级", english: "National" },
  { level: "provincial", label: "省级", english: "Provincial" },
  { level: "municipal", label: "市级", english: "Municipal" },
];

const styles = stylex.create({
  section: {
    marginTop: { default: 40, [bp.wide]: 72 },
  },
  titles: {
    display: "grid",
    rowGap: { default: 10, [bp.wide]: 14 },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  title: {
    fontSize: "clamp(20px, 1.81vw, 26px)",
    lineHeight: 1.45,
    letterSpacing: "0.04em",
  },
  level: {
    display: "grid",
    rowGap: 12,
    margin: 0,
  },
  levelLabel: {
    fontFamily: face.sans,
    fontSize: scale.heading,
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: "0.06em",
    color: tone.navy,
  },
  levelEnglish: {
    fontSize: 20,
  },
});

export function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby="oos1x-honor"
      {...stylex.props(ui.anchor, styles.section)}
    >
      {LEVELS.map((group, index) => (
        <Pair
          key={group.level}
          lever={AT_REST}
          loadLine
          loadFirstOnPhone
          standing={
            index === 0 ? (
              <StandingTitle id="oos1x-honor" en="Honors">
                {ABOUT_HONORS.title}
              </StandingTitle>
            ) : undefined
          }
          load={
            <p {...stylex.props(styles.level)}>
              <span {...stylex.props(styles.levelLabel)}>{group.label}</span>
              <span lang="en" {...stylex.props(type.serif, styles.levelEnglish)}>
                {group.english}
              </span>
            </p>
          }
        >
          <ul {...stylex.props(styles.titles)}>
            {ABOUT_HONORS.items
              .filter((item) => item.level === group.level)
              .map((item) => (
                <li key={item.id} {...stylex.props(type.light, styles.title)}>
                  {item.title}
                </li>
              ))}
          </ul>
        </Pair>
      ))}
    </section>
  );
}
