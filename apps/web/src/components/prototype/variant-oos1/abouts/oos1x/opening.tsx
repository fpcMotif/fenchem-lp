import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { LEVER } from "./counterweight";
import { Pair } from "./pair";
import { type, ui } from "./shared";
import { bp, face, scale, tone } from "./tokens.stylex";

const styles = stylex.create({
  stand: {
    minHeight: { default: 0, [bp.wide]: "max(220px, calc(40vh - 32px))" },
    paddingTop: { default: 40, [bp.wide]: 0 },
    paddingBottom: { default: 22, [bp.wide]: 30 },
    rowGap: { default: 14, [bp.wide]: 22 },
    alignItems: "end",
  },
  tagline: {
    gridColumn: { default: "auto", [bp.wide]: "1 / 8" },
    fontSize: "clamp(20px, 1.67vw, 24px)",
    color: tone.body,
  },
  title: {
    gridColumn: { default: "auto", [bp.wide]: "1 / 8" },
    marginInlineStart: "-0.04em",
  },
  established: {
    display: "grid",
    rowGap: 10,
    margin: 0,
    paddingTop: { default: 0, [bp.wide]: 10 },
  },
  est: {
    fontSize: 18,
  },
  lead: {
    fontSize: { default: 17, [bp.wide]: "clamp(19px, 1.67vw, 24px)" },
    lineHeight: 1.7,
    letterSpacing: "0.03em",
  },
  leadLine: {
    display: "block",
  },
  place: {
    marginTop: { default: 16, [bp.wide]: 24 },
    fontFamily: face.display,
    fontSize: scale.headingCounterweight,
    fontWeight: 800,
    letterSpacing: "0.01em",
    color: tone.navy,
  },
  frame: {
    margin: 0,
    aspectRatio: { default: "4 / 5", [bp.wide]: "1 / 1" },
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  image: {
    objectPosition: "50% 60%",
  },
});

export function Opening() {
  return (
    <header aria-labelledby="oos1x-title">
      <Pair
        lever={LEVER}
        loadRatio={1}
        offset="start"
        standingSx={styles.stand}
        standing={
          <>
            <p lang="en" {...stylex.props(type.serif, styles.tagline, ui.knockout)}>
              {ABOUT_BANNER.tagline}
            </p>
            <h1
              id="oos1x-title"
              {...stylex.props(type.light, type.title, styles.title, ui.knockout)}
            >
              {ABOUT_BANNER.title}
            </h1>
          </>
        }
        tag={
          <p {...stylex.props(styles.established)}>
            <span lang="en" {...stylex.props(type.serif, styles.est)}>
              Est.
            </span>
            <span {...stylex.props(type.counterweight, type.counterTitle)}>1995</span>
          </p>
        }
        load={
          <figure {...stylex.props(styles.frame)}>
            <img
              src={ABOUT_BANNER.image}
              alt={ABOUT_BANNER.alt}
              fetchPriority="high"
              decoding="async"
              {...stylex.props(ui.fill, styles.image)}
            />
          </figure>
        }
      >
        <p {...stylex.props(type.light, styles.lead)}>
          {ABOUT_BANNER.lead.split(" · ").map((half) => (
            <span key={half} {...stylex.props(styles.leadLine)}>
              {half}
            </span>
          ))}
        </p>
        <p lang="en" {...stylex.props(styles.place)}>
          {ABOUT_BANNER.place}
        </p>
      </Pair>
    </header>
  );
}
