import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO, ABOUT_MOMENT } from "../../about-data";
import { LEVER } from "./counterweight";
import { Pair, StandingTitle } from "./pair";
import { type, ui } from "./shared";
import { bp, face, scale, tone } from "./tokens.stylex";

const styles = stylex.create({
  name: {
    fontSize: "clamp(22px, 2.23vw, 32px)",
    lineHeight: 1.3,
    letterSpacing: "0.04em",
  },
  english: {
    marginTop: 12,
    fontFamily: face.display,
    fontSize: "max(13px, calc(clamp(22px, 2.23vw, 32px) * 3 / 8))",
    fontWeight: 800,
    letterSpacing: "0.01em",
    color: tone.navy,
  },
  lead: {
    marginTop: { default: 22, [bp.wide]: 32 },
  },
  network: {
    marginBottom: { default: 12, [bp.wide]: 18 },
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: "0.72em",
    rowGap: "0.18em",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    fontSize: "clamp(22px, 2.23vw, 32px)",
    lineHeight: 1.45,
    letterSpacing: "0.04em",
  },
  figure: {
    display: "grid",
    rowGap: 12,
    margin: 0,
  },
  frame: {
    overflow: "hidden",
    backgroundColor: tone.tint,
  },
  classic: { aspectRatio: "3 / 2" },
  panorama: { aspectRatio: "4 / 3" },
  lobbyPosition: { objectPosition: "50% 60%" },
  panoramaPosition: { objectPosition: "40% 50%" },
  sixteen: {
    fontSize: scale.titleCounterweight,
  },
});

export function Profile() {
  return (
    <section id="about-profile" aria-labelledby="oos1x-profile" {...stylex.props(ui.anchor)}>
      <Pair
        lever={LEVER}
        loadRatio={3 / 2}
        offset="end"
        standing={
          <StandingTitle id="oos1x-profile" en="Profile">
            企业概况
          </StandingTitle>
        }
        load={
          <figure {...stylex.props(styles.figure)}>
            <div {...stylex.props(styles.frame, styles.classic)}>
              <img
                src={ABOUT_HERO.lobbyImage}
                alt={ABOUT_HERO.lobbyEnglish}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, styles.lobbyPosition)}
              />
            </div>
            <figcaption {...stylex.props(type.note, ui.knockout)}>
              {ABOUT_HERO.lobbyCaption}
            </figcaption>
          </figure>
        }
      >
        <p {...stylex.props(type.light, styles.name)}>{ABOUT_HERO.title}</p>
        <p lang="en" {...stylex.props(styles.english)}>
          {ABOUT_HERO.englishTitle}
        </p>
        <p {...stylex.props(type.body, styles.lead)}>{ABOUT_HERO.lead}</p>
      </Pair>
      <Pair
        lever={LEVER}
        loadRatio={4 / 3}
        offset="start"
        tag={
          <p aria-hidden="true" {...stylex.props(type.counterweight, styles.sixteen)}>
            16
          </p>
        }
        load={
          <figure {...stylex.props(styles.figure)}>
            <div {...stylex.props(styles.frame, styles.panorama)}>
              <img
                src={ABOUT_MOMENT.image}
                alt={ABOUT_MOMENT.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, styles.panoramaPosition)}
              />
            </div>
            <figcaption {...stylex.props(type.note, ui.knockout)}>
              {ABOUT_MOMENT.caption}
            </figcaption>
          </figure>
        }
      >
        <p {...stylex.props(type.body, styles.network)}>{ABOUT_HERO.networkLabel}</p>
        <ul {...stylex.props(type.light, styles.countries)}>
          {ABOUT_HERO.countries.map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      </Pair>
    </section>
  );
}
