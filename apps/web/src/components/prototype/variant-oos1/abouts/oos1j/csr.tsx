import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_CSR } from "../../about-data";
import { CropMarks, DriftImage, Reveal, RiseLines, SectionName, useInViewOnce } from "./parts";
import { base, ty } from "./shared";
import { font, hue, size } from "./theme.stylex";

const styles = stylex.create({
  csr: {
    backgroundColor: colors.paper,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "minmax(0, 1.1fr) minmax(0, 0.9fr)",
    },
    columnGap: 96,
    rowGap: 48,
    alignItems: "center",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  statement: {
    margin: 0,
    fontSize: "clamp(26px, 3vw, 44px)",
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.03em",
    color: hue.ink,
  },
  outcomes: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  outcome: {
    position: "relative",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 24,
    paddingBlock: 20,
    fontSize: 18,
    fontWeight: 400,
    letterSpacing: "0.06em",
    color: hue.ink,
  },
  outcomeRule: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: hue.hairline,
    transformOrigin: "left center",
    transform: { default: null, [breakpoints.motionOk]: "scaleX(0)" },
    transitionProperty: "transform",
    transitionDuration: "1200ms",
    transitionTimingFunction: size.ease,
  },
  outcomeRuleShown: {
    transform: "none",
  },
  outcomeDelay: (index: number) => ({ transitionDelay: `${300 + index * 140}ms` }),
  numeral: {
    fontFamily: font.display,
    fontSize: 11,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "0.14em",
    color: hue.quiet,
  },
  photoWrap: {
    position: "relative",
  },
  photo: {
    aspectRatio: { default: "4 / 3", [breakpoints.lg]: "4 / 5" },
  },
});

export function Csr() {
  const [textRef, textShown] = useInViewOnce<HTMLDivElement>();
  return (
    <section
      id="about-csr"
      aria-labelledby="about-csr-title"
      {...stylex.props(base.section, base.anchor, styles.csr)}
    >
      <SectionName id="about-csr-title">Responsibility</SectionName>
      <div {...stylex.props(base.shell, styles.grid)}>
        <div ref={textRef} {...stylex.props(styles.text)}>
          <p {...stylex.props(styles.statement)}>
            <RiseLines lines={ABOUT_CSR.statement} play={textShown} />
          </p>
          <Reveal step={2}>
            <p {...stylex.props(ty.body)}>{ABOUT_CSR.desc}</p>
          </Reveal>
          <ul {...stylex.props(styles.outcomes)}>
            {ABOUT_CSR.outcomes.map((outcome, index) => (
              <li key={outcome.title} {...stylex.props(styles.outcome)}>
                <span
                  aria-hidden="true"
                  {...stylex.props(
                    styles.outcomeRule,
                    textShown && styles.outcomeRuleShown,
                    styles.outcomeDelay(index),
                  )}
                />
                <span>{outcome.title}</span>
                <span aria-hidden="true" lang="en" {...stylex.props(styles.numeral)}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div {...stylex.props(styles.photoWrap)}>
          <DriftImage
            src={ABOUT_CSR.image}
            alt={ABOUT_CSR.imageAlt}
            frame={styles.photo}
            wipeDelay={200}
          />
          <CropMarks delay={900} />
        </div>
      </div>
    </section>
  );
}
