import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO } from "../../about-data";
import { Reveal } from "./motion";
import { Section, SectionName } from "./primitives";
import { base } from "./primitives-values";
import { font, media, tone } from "./shear.stylex";

const S = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 1fr) minmax(0, 1fr)",
    },
    columnGap: { default: 0, [breakpoints.lg]: 80, [media.desktop]: 120 },
    rowGap: 56,
    alignItems: "center",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 28,
  },
  name: {
    margin: 0,
    maxWidth: "9em",
    fontFamily: font.sans,
    fontSize: { default: 30, [media.tablet]: 38, [media.desktop]: 44 },
    fontWeight: 700,
    lineHeight: 1.35,
    letterSpacing: "0.02em",
    color: tone.ink,
    textWrap: "balance",
  },
  english: {
    marginTop: 10,
  },
  lead: {
    fontSize: { default: 16, [media.desktop]: 17 },
    color: tone.ink,
  },
  countries: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px 22px",
    margin: 0,
    marginTop: 10,
    padding: 0,
    maxWidth: "30em",
    listStyle: "none",
    fontSize: 15,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  figure: {
    margin: 0,
  },
  photo: {
    display: "block",
    width: "100%",
    aspectRatio: "4 / 3",
    objectFit: "cover",
    backgroundColor: tone.tint,
  },
  caption: {
    marginTop: 14,
  },
});

export function Profile() {
  return (
    <Section id="about-profile" labelledBy="about-profile-title" surface="paper" band="above">
      <SectionName id="about-profile-title">{ABOUT_HERO.navChips[0].label}</SectionName>
      <div {...stylex.props(base.shell, base.inset, S.grid)}>
        <Reveal sx={S.copy}>
          <div>
            <h3 {...stylex.props(S.name)}>{ABOUT_HERO.title}</h3>
            <p lang="en" {...stylex.props(base.quiet, S.english)}>
              {ABOUT_HERO.englishTitle}
            </p>
          </div>
          <p {...stylex.props(base.prose, S.lead)}>{ABOUT_HERO.lead}</p>
          <div>
            <p {...stylex.props(base.quiet)}>{ABOUT_HERO.networkLabel}</p>
            <ul {...stylex.props(S.countries)}>
              {ABOUT_HERO.countries.map((country) => (
                <li key={country}>{country}</li>
              ))}
              <li {...stylex.props(base.quiet)}>等地</li>
            </ul>
          </div>
        </Reveal>
        <Reveal as="figure" delay={120} sx={S.figure}>
          <img
            src={ABOUT_HERO.lobbyImage}
            alt="泛成总部大堂，弧形吊顶与大理石地面"
            loading="lazy"
            decoding="async"
            {...stylex.props(S.photo)}
          />
          <figcaption {...stylex.props(base.quiet, S.caption)}>
            {ABOUT_HERO.lobbyCaption}
          </figcaption>
        </Reveal>
      </div>
    </Section>
  );
}
