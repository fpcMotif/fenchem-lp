import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId, useState } from "react";

import { ABOUT_HERO, ABOUT_STRUCTURE } from "../../about-data";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { motionCss, step, tone } from "./tokens.stylex";

const fadeRise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "none" },
});

const s = stylex.create({
  holding: {
    maxWidth: "36em",
  },
  holdingLabel: {
    marginBottom: 12,
  },
  holdingName: {
    margin: 0,
    fontSize: { default: step.title, [breakpoints.md]: step.display },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  holdingEnglish: {
    marginTop: 12,
    fontSize: step.body,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: tone.body,
  },
  link: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: { default: 56, [breakpoints.lg]: 72 },
    paddingInlineStart: 20,
    boxSizing: "border-box",
  },
  linkLine: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 1,
    height: "100%",
    backgroundColor: tone.hairlineStrong,
  },
  subs: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(5, minmax(0, 1fr))",
    },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  sub: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    paddingTop: { default: 20, [breakpoints.lg]: 40 },
    paddingBottom: { default: 20, [breakpoints.lg]: 0 },
    paddingInlineEnd: { default: 0, [breakpoints.lg]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: { default: tone.hairline, [breakpoints.lg]: tone.hairlineStrong },
  },
  tick: {
    display: { default: "none", [breakpoints.lg]: "block" },
    position: "absolute",
    top: 0,
    left: 0,
    width: 1,
    height: 24,
    backgroundColor: tone.hairlineStrong,
  },
  subName: {
    margin: 0,
    fontSize: { default: step.body, [breakpoints.md]: step.lead },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  subEnglish: {
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: tone.body,
  },
  toggleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 24,
    marginTop: { default: 40, [breakpoints.xl]: 72 },
  },
  diagram: {
    width: "100%",
    animationName: { default: null, [breakpoints.motionOk]: fadeRise },
    animationDuration: "400ms",
    animationTimingFunction: motionCss.out,
  },
  diagramImage: {
    display: "block",
    width: "100%",
    height: "auto",
  },
});

export function Structure() {
  const chip = ABOUT_HERO.navChips[5];
  const [showDiagram, setShowDiagram] = useState(false);
  const diagramId = useId();

  return (
    <Section id={chip.id} label={chip.english} background={ui.onPaper}>
      <Reveal sx={s.holding}>
        <p {...stylex.props(ui.label, s.holdingLabel)}>{ABOUT_STRUCTURE.holding.badge}</p>
        <h3 {...stylex.props(s.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
        <div lang="en" {...stylex.props(s.holdingEnglish)}>
          {ABOUT_STRUCTURE.holding.english}
        </div>
      </Reveal>
      <div {...stylex.props(s.link)}>
        <span aria-hidden="true" {...stylex.props(s.linkLine)} />
        <p {...stylex.props(ui.label)}>{ABOUT_STRUCTURE.subsidiaryBadge}</p>
      </div>
      <ul aria-label={ABOUT_STRUCTURE.subsidiaryBadgeEnglish} {...stylex.props(s.subs)}>
        {ABOUT_STRUCTURE.subsidiaries.map((sub, idx) => (
          <Reveal key={sub.id} as="li" step={idx} sx={s.sub}>
            <span aria-hidden="true" {...stylex.props(s.tick)} />
            <h4 {...stylex.props(s.subName)}>{sub.name}</h4>
            <span lang="en" {...stylex.props(s.subEnglish)}>
              {sub.english}
            </span>
          </Reveal>
        ))}
      </ul>
      <div {...stylex.props(s.toggleWrap)}>
        <button
          type="button"
          aria-expanded={showDiagram}
          aria-controls={diagramId}
          onClick={() => setShowDiagram((prev) => !prev)}
          {...stylex.props(ui.button, ui.buttonSecondary, ui.focusRing)}
        >
          {showDiagram ? "收起组织架构图" : "查看官方组织架构图"}
        </button>
        <div id={diagramId} hidden={!showDiagram} {...stylex.props(s.diagram)}>
          <img
            src={ABOUT_STRUCTURE.chartImage}
            alt="Official organizational chart of Nanjing Fenchem International Holdings Corporation Limited"
            loading="lazy"
            decoding="async"
            {...stylex.props(s.diagramImage)}
          />
        </div>
      </div>
    </Section>
  );
}
