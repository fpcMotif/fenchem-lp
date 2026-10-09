import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CAMPUS, ABOUT_CULTURE, ABOUT_HERO } from "../../about-data";
import { Reveal } from "./shared";
import { ui } from "./shared-values";
import { font, range, step, tone } from "./tokens.stylex";

const [FOCUS, PATIENCE, TOGETHER] = ABOUT_CULTURE.values;
const LAB = ABOUT_CAMPUS.photos[1];
const LOUNGE = ABOUT_CAMPUS.photos[4];

const s = stylex.create({
  anchor: {
    scrollMarginTop: 144,
  },
  scene: {
    paddingBlock: { default: 40, [breakpoints.md]: 56, [breakpoints.xl]: 72 },
  },
  cool: { backgroundColor: tone.tint },
  day: { backgroundColor: tone.page },
  warm: { backgroundColor: tone.warm },
  slug: {
    margin: 0,
    marginBottom: { default: 20, [breakpoints.md]: 28 },
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: "34px", [range.tablet]: "44px", [range.wide]: "56px" },
    fontWeight: 400,
    lineHeight: 1.05,
    color: tone.ink,
  },
  slugMid: {
    paddingInlineStart: { default: 0, [range.wide]: "16.6667%" },
  },
  slugLate: {
    paddingInlineStart: { default: 0, [range.wide]: "33.3333%" },
  },
  frame: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: tone.plate,
  },
  ratioFocus: {
    aspectRatio: { default: "3 / 1", [range.tablet]: "3.5 / 1", [range.wide]: "4 / 1" },
  },
  ratioPatience: {
    aspectRatio: { default: "2 / 1", [range.tablet]: "2.39 / 1", [range.wide]: "2.39 / 1" },
  },
  ratioTogether: {
    aspectRatio: { default: "4 / 3", [range.tablet]: "3 / 2", [range.wide]: "16 / 9" },
  },
  focusImage: { objectPosition: "50% 50%" },
  patienceImage: { objectPosition: "50% 68%" },
  togetherImage: { objectPosition: "50% 55%" },
  subtitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    marginInline: "auto",
    marginTop: { default: 24, [breakpoints.md]: 32 },
    maxWidth: "30em",
    textAlign: "center",
  },
  subtitleTitle: {
    margin: 0,
    fontSize: step.lead,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.24em",
    paddingInlineStart: "0.24em",
    color: tone.ink,
  },
  subtitleDesc: {
    margin: 0,
    fontSize: step.body,
    lineHeight: 1.9,
    letterSpacing: "0.04em",
    color: tone.body,
    textWrap: "pretty",
  },
});

export function Culture() {
  const chip = ABOUT_HERO.navChips[2];
  const nameId = `${chip.id}-name`;

  return (
    <section id={chip.id} aria-labelledby={nameId} {...stylex.props(s.anchor)}>
      <h2 id={nameId} {...stylex.props(ui.srOnly)}>
        {ABOUT_CULTURE.title}
      </h2>

      <article aria-labelledby="about-culture-focus" {...stylex.props(s.scene, s.cool)}>
        <div {...stylex.props(ui.shell, ui.inset)}>
          <Reveal>
            <p lang="en" {...stylex.props(s.slug)}>
              In the lab,
            </p>
          </Reveal>
          <Reveal as="figure" step={1} sx={ui.figure}>
            <div {...stylex.props(s.frame, s.ratioFocus)}>
              <img
                src={LAB.large}
                alt={LAB.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, s.focusImage)}
              />
            </div>
          </Reveal>
          <Reveal step={2} sx={s.subtitle}>
            <h3 id="about-culture-focus" {...stylex.props(s.subtitleTitle)}>
              {FOCUS.title}
            </h3>
            <p {...stylex.props(s.subtitleDesc)}>{FOCUS.desc}</p>
          </Reveal>
        </div>
      </article>

      <article aria-labelledby="about-culture-patience" {...stylex.props(s.scene, s.day)}>
        <div {...stylex.props(ui.shell, ui.inset)}>
          <Reveal>
            <p lang="en" {...stylex.props(s.slug, s.slugMid)}>
              by the lake,
            </p>
          </Reveal>
          <Reveal as="figure" step={1} sx={ui.figure}>
            <div {...stylex.props(s.frame, s.ratioPatience)}>
              <img
                src="/prototype/official-site/campus-lake.webp"
                alt="平静的水面倒映着泛成研发大楼"
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, s.patienceImage)}
              />
            </div>
          </Reveal>
          <Reveal step={2} sx={s.subtitle}>
            <h3 id="about-culture-patience" {...stylex.props(s.subtitleTitle)}>
              {PATIENCE.title}
            </h3>
            <p {...stylex.props(s.subtitleDesc)}>{PATIENCE.desc}</p>
          </Reveal>
        </div>
      </article>

      <article aria-labelledby="about-culture-together" {...stylex.props(s.scene, s.warm)}>
        <div {...stylex.props(ui.shell, ui.inset)}>
          <Reveal>
            <p lang="en" {...stylex.props(s.slug, s.slugLate)}>
              where people meet.
            </p>
          </Reveal>
          <Reveal as="figure" step={1} sx={ui.figure}>
            <div {...stylex.props(s.frame, s.ratioTogether)}>
              <img
                src={LOUNGE.large}
                alt={LOUNGE.alt}
                loading="lazy"
                decoding="async"
                {...stylex.props(ui.fill, s.togetherImage)}
              />
            </div>
          </Reveal>
          <Reveal step={2} sx={s.subtitle}>
            <h3 id="about-culture-together" {...stylex.props(s.subtitleTitle)}>
              {TOGETHER.title}
            </h3>
            <p {...stylex.props(s.subtitleDesc)}>{TOGETHER.desc}</p>
          </Reveal>
        </div>
      </article>
    </section>
  );
}
