import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId, useState } from "react";

import { ABOUT_HERO, ABOUT_STRUCTURE } from "../../about-data";
import { Reveal, Section, ui } from "./shared";
import { motionCss, step, tone } from "./tokens.stylex";

const fadeRise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "none" },
});

const s = stylex.create({
  label: {
    marginBottom: { default: 16, [breakpoints.xl]: 20 },
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
    marginTop: 16,
    fontSize: step.body,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.body,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  row: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.md]: "row" },
    alignItems: { default: "flex-start", [breakpoints.md]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 6, [breakpoints.md]: 24 },
    paddingBlock: { default: 18, [breakpoints.xl]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  name: {
    margin: 0,
    fontSize: { default: step.body, [breakpoints.md]: "19px" },
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  english: {
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.quiet,
  },
  toggleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 24,
    marginTop: { default: 32, [breakpoints.xl]: 40 },
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
    <Section id={chip.id} label={ABOUT_STRUCTURE.title} background={ui.onPaper}>
      <div {...stylex.props(ui.phi)}>
        <div {...stylex.props(ui.asideCol)}>
          <Reveal>
            <p {...stylex.props(ui.label, s.label)}>{ABOUT_STRUCTURE.holding.badge}</p>
            <h3 {...stylex.props(s.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
            <div lang="en" {...stylex.props(s.holdingEnglish)}>
              {ABOUT_STRUCTURE.holding.english}
            </div>
          </Reveal>
        </div>
        <div {...stylex.props(ui.main)}>
          <p {...stylex.props(ui.label, s.label)}>{ABOUT_STRUCTURE.subsidiaryBadge}</p>
          <ul aria-label={ABOUT_STRUCTURE.subsidiaryBadge} {...stylex.props(s.list)}>
            {ABOUT_STRUCTURE.subsidiaries.map((sub, idx) => (
              <Reveal key={sub.id} as="li" step={idx} sx={s.row}>
                <h4 {...stylex.props(s.name)}>{sub.name}</h4>
                <span lang="en" {...stylex.props(s.english)}>
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
                alt="南京泛成国际控股有限公司官方组织架构图"
                loading="lazy"
                decoding="async"
                {...stylex.props(s.diagramImage)}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
