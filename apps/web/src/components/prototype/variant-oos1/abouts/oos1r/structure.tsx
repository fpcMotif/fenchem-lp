import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId, useState } from "react";

import { ABOUT_HERO, ABOUT_STRUCTURE } from "../../about-data";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { band, font, motionCss, step, tone } from "./tokens.stylex";

const fadeRise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "none" },
});

const s = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: 24,
    rowGap: 48,
  },
  holdingCell: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 6" },
  },
  subsCell: {
    gridColumn: { default: "auto", [breakpoints.lg]: "7 / 13" },
  },
  label: {
    margin: 0,
    marginBottom: 14,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.1em",
    lineHeight: 1.6,
    color: tone.body,
  },
  holdingName: {
    margin: 0,
    fontSize: { default: 26, [band.mdToXl]: 36, [breakpoints.xl]: 44 },
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  holdingEnglish: {
    margin: 0,
    marginTop: 16,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: 20, [breakpoints.xl]: 26 },
    fontWeight: 400,
    lineHeight: 1.3,
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
    gap: { default: 2, [breakpoints.md]: 24 },
    paddingBlock: { default: 16, [breakpoints.xl]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  name: {
    margin: 0,
    fontSize: { default: step.body, [breakpoints.md]: step.lead },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  english: {
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: { default: 16, [breakpoints.md]: 18 },
    fontWeight: 400,
    color: tone.body,
  },
  toggleWrap: {
    marginTop: 24,
  },
  diagram: {
    marginTop: { default: 32, [breakpoints.xl]: 56 },
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
  const subsLabelId = useId();

  return (
    <Section id={chip.id} label={ABOUT_STRUCTURE.title}>
      <div {...stylex.props(s.grid)}>
        <Reveal sx={s.holdingCell}>
          <p {...stylex.props(s.label)}>{ABOUT_STRUCTURE.holding.badge}</p>
          <h3 {...stylex.props(s.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
          <p lang="en" {...stylex.props(s.holdingEnglish)}>
            {ABOUT_STRUCTURE.holding.english}
          </p>
        </Reveal>
        <Reveal delay={120} sx={s.subsCell}>
          <p id={subsLabelId} {...stylex.props(s.label)}>
            {ABOUT_STRUCTURE.subsidiaryBadge}
          </p>
          <ul aria-labelledby={subsLabelId} {...stylex.props(s.list)}>
            {ABOUT_STRUCTURE.subsidiaries.map((sub) => (
              <li key={sub.id} {...stylex.props(s.row)}>
                <h3 {...stylex.props(s.name)}>{sub.name}</h3>
                <span lang="en" {...stylex.props(s.english)}>
                  {sub.english}
                </span>
              </li>
            ))}
          </ul>
          <div {...stylex.props(s.toggleWrap)}>
            <button
              type="button"
              aria-expanded={showDiagram}
              aria-controls={diagramId}
              onClick={() => setShowDiagram((prev) => !prev)}
              {...stylex.props(ui.quietButton, ui.focusRing)}
            >
              {showDiagram ? "收起组织架构图" : "查看官方组织架构图"}
            </button>
          </div>
        </Reveal>
      </div>
      <div id={diagramId} hidden={!showDiagram} {...stylex.props(s.diagram)}>
        <img
          src={ABOUT_STRUCTURE.chartImage}
          alt="南京泛成国际控股有限公司官方组织架构图"
          loading="lazy"
          decoding="async"
          {...stylex.props(s.diagramImage)}
        />
      </div>
    </Section>
  );
}
