import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { Clause } from "./clause";
import { SectionLabel, headingId } from "./label";
import { SENTENCE } from "./sentence";
import { ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    paddingTop: { default: 144, [bp.tablet]: 184, [bp.desktop]: 216 },
  },
  lead: {
    marginTop: { default: 40, [bp.desktop]: 56 },
  },
  stanza: {
    marginTop: { default: 88, [bp.tablet]: 120, [bp.desktop]: 152 },
  },
  lobby: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    width: { default: "100%", [bp.tablet]: "58%", [bp.desktop]: "41.5%" },
    marginTop: { default: 88, [bp.tablet]: 120, [bp.desktop]: 152 },
    marginInline: 0,
    marginBottom: 0,
  },
  frame: {
    aspectRatio: "3 / 2",
    overflow: "hidden",
  },
  caption: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    fontFamily: face.sans,
    fontSize: 14,
    lineHeight: 1.4,
    color: tone.ink,
  },
  countries: {
    marginTop: { default: 12, [bp.desktop]: 20 },
  },
});

export function Profile() {
  const { founding, focus, chain, branches, countries } = SENTENCE.profile;
  return (
    <section
      id="about-profile"
      aria-labelledby={headingId("about-profile")}
      {...stylex.props(ui.section, styles.section)}
    >
      <div {...stylex.props(ui.shell)}>
        <SectionLabel section="about-profile" />
        {founding.map((line) => (
          <Clause key={line.id} line={line} sx={styles.lead} />
        ))}
        <div {...stylex.props(styles.stanza)}>
          {focus.map((line) => (
            <Clause key={line.id} line={line} />
          ))}
        </div>
        <div {...stylex.props(styles.stanza)}>
          {chain.map((line) => (
            <Clause key={line.id} line={line} />
          ))}
        </div>
        <figure {...stylex.props(styles.lobby)}>
          <div {...stylex.props(styles.frame)}>
            <img
              src={ABOUT_HERO.lobbyImage}
              alt={ABOUT_HERO.lobbyCaption}
              loading="lazy"
              decoding="async"
              {...stylex.props(ui.photo)}
            />
          </div>
          <figcaption {...stylex.props(styles.caption)}>
            <span>{ABOUT_HERO.lobbyCaption}</span>
            <span lang="en" {...stylex.props(ui.note)}>
              Lobby
            </span>
          </figcaption>
        </figure>
        <div {...stylex.props(styles.stanza)}>
          {branches.map((line) => (
            <Clause key={line.id} line={line} />
          ))}
          <div {...stylex.props(styles.countries)}>
            {countries.map((line) => (
              <Clause key={line.id} line={line} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
