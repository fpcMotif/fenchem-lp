import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER } from "../../about-data";
import { MountWipe } from "./motion";
import { Frame, base } from "./primitives";
import { font, layout, media, tone } from "./shear.stylex";

const S = stylex.create({
  hero: {
    position: "relative",
    overflowX: "clip",
    backgroundColor: tone.page,
    paddingTop: { default: 104, [breakpoints.lg]: 132 },
    paddingBottom: { default: 64, [breakpoints.lg]: 112 },
  },
  stage: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 6.1fr) minmax(0, 5.9fr)",
    },
    alignItems: "center",
    rowGap: 40,
  },
  cross: {
    position: "absolute",
    left: { default: "-10%", [breakpoints.lg]: "-30%" },
    top: { default: "70%", [breakpoints.lg]: "54%" },
    width: "120%",
    height: 0,
    pointerEvents: "none",
  },
  line: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 1,
    backgroundImage: `linear-gradient(to right, transparent 0%, ${tone.blueRule} 25%, ${tone.blueRule} 75%, transparent 100%)`,
  },
  lineUp: { rotate: "-7deg" },
  lineDown: { rotate: "7deg" },
  copy: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { default: 22, [breakpoints.lg]: 30 },
  },
  title: {
    width: "100%",
    margin: 0,
    paddingBottom: 6,
    fontFamily: font.sans,
    fontSize: {
      default: "clamp(84px, 25vw, 140px)",
      [breakpoints.lg]: "clamp(112px, 11vw, 168px)",
    },
    fontWeight: 900,
    lineHeight: 1.04,
    letterSpacing: "0.01em",
    color: tone.ink,
  },
  line1: {
    display: "block",
  },
  line2: {
    display: "block",
    color: colors.brandBlue700,
    transform: "translate(0.5em, -0.0614em)",
  },
  tagline: {
    margin: 0,
    fontFamily: font.serif,
    fontSize: { default: 26, [breakpoints.md]: 32, [media.desktop]: 36 },
    fontStyle: "italic",
    fontWeight: 400,
    lineHeight: 1.15,
    color: tone.ink,
  },
  lead: {
    margin: 0,
    fontSize: { default: 16, [media.desktop]: 18 },
    fontWeight: 400,
    lineHeight: 1.9,
    letterSpacing: "0.08em",
    color: tone.body,
  },
  leadLine: {
    display: "block",
  },
  visual: {
    position: "relative",
    marginInlineStart: { default: -16, [media.tablet]: -40, [breakpoints.lg]: 0 },
    marginInlineEnd: {
      default: -16,
      [media.tablet]: -40,
      [media.desktop]: `calc(${layout.inset} * -1)`,
    },
  },
  caption: {
    marginTop: 16,
    paddingInlineStart: { default: 16, [media.tablet]: 40, [breakpoints.lg]: 0 },
  },
});

export function Hero() {
  const lines = [ABOUT_BANNER.title.slice(0, 2), ABOUT_BANNER.title.slice(2)];
  return (
    <section aria-labelledby="about-banner-title" {...stylex.props(S.hero)}>
      <div {...stylex.props(base.shell, base.inset, S.stage)}>
        <div aria-hidden="true" {...stylex.props(S.cross)}>
          <span {...stylex.props(S.line, S.lineUp)} />
          <span {...stylex.props(S.line, S.lineDown)} />
        </div>
        <div {...stylex.props(S.copy)}>
          <h1 id="about-banner-title" {...stylex.props(S.title)}>
            {lines.map((line, index) => (
              <span key={line} {...stylex.props(index === 0 ? S.line1 : S.line2)}>
                <MountWipe as="span" delay={0.3 + index * 0.18} duration={1.2}>
                  {line}
                </MountWipe>
              </span>
            ))}
          </h1>
          <MountWipe delay={0.8}>
            <p lang="en" {...stylex.props(S.tagline)}>
              {ABOUT_BANNER.tagline}
            </p>
          </MountWipe>
          <MountWipe delay={0.95}>
            <p {...stylex.props(S.lead)}>
              {ABOUT_BANNER.lead.split(" · ").map((part) => (
                <span key={part} {...stylex.props(S.leadLine)}>
                  {part}
                </span>
              ))}
            </p>
          </MountWipe>
        </div>
        <div {...stylex.props(S.visual)}>
          <MountWipe delay={0.25} duration={1.5}>
            <Frame
              src={ABOUT_BANNER.image}
              alt={ABOUT_BANNER.alt}
              ratio="6 / 5"
              position="58% 50%"
              priority
            />
          </MountWipe>
          <p lang="en" {...stylex.props(base.quiet, S.caption)}>
            {ABOUT_BANNER.established} · {ABOUT_BANNER.place}
          </p>
        </div>
      </div>
    </section>
  );
}
