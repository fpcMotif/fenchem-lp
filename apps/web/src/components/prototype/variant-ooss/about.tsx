import * as stylex from "@stylexjs/stylex";

import { ABOUT, IMAGES, STATS } from "./content";
import { Reveal } from "./motion";
import { hero, media } from "./tokens.stylex";
import { Button, layout } from "./ui";

const HEADER_HEIGHT = 80;

const INK = "#1a1a1a";
const INSET_124 = "min(124px, 8.611vw)";
const INSET_132 = "min(132px, 9.167vw)";

const styles = stylex.create({
  heroOverlap: {
    position: "relative",
    zIndex: 1,
    marginTop: { default: 0, [media.pin]: hero.overlap },
    minHeight: { default: 0, [media.desktop]: 700, [media.pin]: hero.stage },
  },
  anchor: {
    scrollMarginTop: HEADER_HEIGHT,
  },
  inset124: {
    paddingInline: { default: 16, [media.tablet]: 40, [media.desktop]: INSET_124 },
  },
  inset132: {
    paddingInline: { default: 16, [media.tablet]: 40, [media.desktop]: INSET_132 },
  },
  sectionTitle: {
    margin: 0,
    fontSize: { default: 26, [media.tablet]: 32, [media.desktop]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: INK,
    textWrap: "balance",
  },
  about: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: { default: 72, [media.desktop]: 96 },
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
  },
  aboutInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
    maxWidth: { default: 768, [media.desktop]: 920 },
  },
  aboutBody: {
    margin: 0,
    fontSize: { default: 16, [media.desktop]: 18 },
    fontWeight: 400,
    lineHeight: 1.8,
    color: INK,
    textAlign: "center",
  },

  campusFrame: {
    overflow: "hidden",
    width: "100%",
    aspectRatio: "1440 / 716",
  },
  campusImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  statsBand: {
    display: "flex",
    flexDirection: { default: "column", [media.tabletUp]: "row" },
    alignItems: { default: "stretch", [media.tabletUp]: "center" },
    gap: { default: 32, [media.tabletUp]: 15.5 },
    minHeight: { default: 0, [media.tabletUp]: 184 },
    paddingBlock: { default: 48, [media.tabletUp]: 0 },
  },
  stat: {
    flexGrow: 1,
    flexBasis: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    textAlign: "center",
  },
  statText: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.2,
    color: INK,
  },
  statFigure: {
    display: "flex",
    alignItems: "flex-start",
    gap: 2,
    margin: 0,
  },
  statValue: {
    fontSize: 60,
    lineHeight: 1.2,
  },
  statUnit: {
    fontSize: 32,
    lineHeight: 1.2,
  },
  statDivider: {
    display: { default: "none", [media.tabletUp]: "block" },
    flexShrink: 0,
    width: 1,
    height: 70,
    backgroundColor: "#000000",
  },
});

export function About() {
  return (
    <>
      <AboutStatement />
      <Campus />
    </>
  );
}

function AboutStatement() {
  return (
    <section
      id="about"
      aria-labelledby="oo-about-title"
      {...stylex.props(styles.about, styles.inset124, styles.heroOverlap)}
    >
      <Reveal sx={styles.aboutInner}>
        <h2 id="oo-about-title" {...stylex.props(styles.sectionTitle)}>
          {ABOUT.title}
        </h2>
        <p {...stylex.props(styles.aboutBody)}>
          {ABOUT.lines[0]}
          <br />
          {ABOUT.lines[1]}
          <br />
          {ABOUT.lines[2]}
        </p>
        <Button href={ABOUT.cta.href}>{ABOUT.cta.label}</Button>
      </Reveal>
    </section>
  );
}

function Campus() {
  return (
    <section id="campus" aria-label="研发与生产" {...stylex.props(styles.anchor)}>
      <div {...stylex.props(styles.campusFrame)}>
        <img
          src={IMAGES.campus.src}
          alt={IMAGES.campus.alt}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.campusImage)}
        />
      </div>
      <div {...stylex.props(layout.shell, styles.inset132, styles.statsBand)}>
        {STATS.map((stat, index) => (
          <StatItem key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  return (
    <>
      {index > 0 ? <span aria-hidden="true" {...stylex.props(styles.statDivider)} /> : null}
      <Reveal index={index} sx={styles.stat}>
        <p {...stylex.props(styles.statText)}>{stat.label}</p>
        <p {...stylex.props(styles.statFigure)}>
          <span {...stylex.props(styles.statValue)}>{stat.value}</span>
          {stat.unit ? <span {...stylex.props(styles.statUnit)}>{stat.unit}</span> : null}
        </p>
        <p {...stylex.props(styles.statText)}>{stat.caption}</p>
      </Reveal>
    </>
  );
}
