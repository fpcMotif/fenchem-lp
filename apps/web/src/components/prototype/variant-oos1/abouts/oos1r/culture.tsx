import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CAMPUS, ABOUT_CULTURE, ABOUT_HERO, ABOUT_MOMENT } from "../../about-data";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { band, font, layout, step, tone } from "./tokens.stylex";

const s = stylex.create({
  story: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 64, [band.mdToXl]: 88, [breakpoints.xl]: 112 },
  },
  scene: {
    display: { default: "block", [breakpoints.lg]: "grid" },
    gridTemplateColumns: {
      default: "none",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    alignItems: "end",
  },
  vastFigure: {
    margin: 0,
    marginLeft: {
      default: -16,
      [band.mdToXl]: `calc(-1 * ${layout.bleedMd})`,
      [breakpoints.xl]: `calc(-1 * ${layout.bleedXl})`,
    },
    marginRight: { default: -16, [breakpoints.md]: 0 },
  },
  captionInset: {
    paddingLeft: { default: 16, [band.mdToXl]: layout.bleedMd, [breakpoints.xl]: layout.bleedXl },
  },
  vastFrame: {
    aspectRatio: { default: "4 / 3", [band.mdToXl]: "2 / 1", [breakpoints.xl]: "2.3 / 1" },
  },
  vastImage: {
    objectPosition: "50% 72%",
  },
  roomFigure: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 9" },
    width: { default: "82%", [band.mdToLg]: "72%", [breakpoints.lg]: "auto" },
    margin: 0,
  },
  roomFrame: {
    aspectRatio: "2.4 / 1",
  },
  humanFigure: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 4" },
    width: { default: "52%", [band.mdToLg]: "38%", [breakpoints.lg]: "auto" },
    margin: 0,
  },
  humanFrame: {
    aspectRatio: "4 / 5",
  },
  humanImage: {
    transform: "scale(2.3)",
    transformOrigin: "73% 78%",
  },
  vastText: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 12,
    marginTop: { default: 24, [breakpoints.xl]: 36 },
  },
  vastSlug: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 5" },
    fontSize: { default: 28, [breakpoints.lg]: 40 },
  },
  vastBody: {
    gridColumn: { default: "auto", [breakpoints.lg]: "6 / 12" },
  },
  roomText: {
    gridColumn: { default: "auto", [breakpoints.lg]: "9 / 13" },
    marginTop: { default: 24, [breakpoints.lg]: 0 },
  },
  humanText: {
    gridColumn: { default: "auto", [breakpoints.lg]: "5 / 10" },
    marginTop: { default: 24, [breakpoints.lg]: 0 },
    alignSelf: "start",
  },
  slug: {
    margin: 0,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: 1.1,
    color: tone.body,
  },
  roomSlug: {
    fontSize: { default: 24, [breakpoints.lg]: 28 },
  },
  humanSlug: {
    fontSize: 20,
  },
  titleVast: {
    margin: 0,
    fontSize: { default: 28, [band.mdToXl]: 40, [breakpoints.xl]: 52 },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  titleRoom: {
    margin: 0,
    marginTop: 12,
    fontSize: { default: 24, [breakpoints.xl]: 32 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  titleHuman: {
    margin: 0,
    marginTop: 10,
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  desc: {
    maxWidth: "28em",
    margin: 0,
    marginTop: 14,
    fontSize: step.body,
    fontWeight: 400,
    lineHeight: 2,
    letterSpacing: "0.04em",
    color: tone.body,
    textWrap: "pretty",
  },
});

const [professional, quiet, together] = ABOUT_CULTURE.values;
const lab = ABOUT_CAMPUS.photos[1];
const lounge = ABOUT_CAMPUS.photos[4];

export function Culture() {
  const chip = ABOUT_HERO.navChips[2];

  return (
    <Section id={chip.id} label={ABOUT_CULTURE.title}>
      <div {...stylex.props(s.story)}>
        <article>
          <Reveal as="figure" sx={s.vastFigure}>
            <div {...stylex.props(ui.frame, s.vastFrame)}>
              <img
                src={ABOUT_MOMENT.image}
                alt={ABOUT_MOMENT.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, s.vastImage)}
              />
            </div>
            <figcaption {...stylex.props(ui.caption, s.captionInset)}>
              {ABOUT_MOMENT.caption}
            </figcaption>
          </Reveal>
          <Reveal delay={150} sx={s.vastText}>
            <p lang="en" {...stylex.props(s.slug, s.vastSlug)}>
              From above
            </p>
            <div {...stylex.props(s.vastBody)}>
              <h3 {...stylex.props(s.titleVast)}>{quiet.title}</h3>
              <p {...stylex.props(s.desc)}>{quiet.desc}</p>
            </div>
          </Reveal>
        </article>
        <article {...stylex.props(s.scene)}>
          <Reveal as="figure" sx={s.roomFigure}>
            <div {...stylex.props(ui.frame, s.roomFrame)}>
              <img
                src={lab.src}
                alt={lab.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill)}
              />
            </div>
            <figcaption {...stylex.props(ui.caption)}>{lab.caption}</figcaption>
          </Reveal>
          <Reveal delay={150} sx={s.roomText}>
            <p lang="en" {...stylex.props(s.slug, s.roomSlug)}>
              Down the corridor
            </p>
            <h3 {...stylex.props(s.titleRoom)}>{professional.title}</h3>
            <p {...stylex.props(s.desc)}>{professional.desc}</p>
          </Reveal>
        </article>
        <article {...stylex.props(s.scene)}>
          <Reveal as="figure" sx={s.humanFigure}>
            <div {...stylex.props(ui.frame, s.humanFrame)}>
              <img
                src={lounge.large}
                alt={lounge.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, s.humanImage)}
              />
            </div>
            <figcaption {...stylex.props(ui.caption)}>{lounge.caption}</figcaption>
          </Reveal>
          <Reveal delay={150} sx={s.humanText}>
            <p lang="en" {...stylex.props(s.slug, s.humanSlug)}>
              Where people meet
            </p>
            <h3 {...stylex.props(s.titleHuman)}>{together.title}</h3>
            <p {...stylex.props(s.desc)}>{together.desc}</p>
          </Reveal>
        </article>
      </div>
    </Section>
  );
}
