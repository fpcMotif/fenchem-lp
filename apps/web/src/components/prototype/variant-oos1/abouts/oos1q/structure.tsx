import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { useId, useState } from "react";

import { ABOUT_HERO, ABOUT_STRUCTURE } from "../../about-data";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { font, motionCss, step, tone } from "./tokens.stylex";

const fadeRise = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "none" },
});

const s = stylex.create({
  tree: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.lg]: "row" },
    alignItems: { default: "stretch", [breakpoints.lg]: "center" },
  },
  holding: {
    flexBasis: { default: "auto", [breakpoints.lg]: "40%" },
    flexGrow: 0,
    flexShrink: 0,
  },
  kind: {
    margin: 0,
    marginBottom: 12,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: tone.quiet,
  },
  holdingName: {
    margin: 0,
    fontSize: { default: step.title, [breakpoints.md]: 36, [breakpoints.xl]: 40 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.1em",
    color: tone.ink,
    textWrap: "balance",
  },
  holdingEnglish: {
    marginTop: 12,
    fontFamily: font.serif,
    fontSize: step.line,
    letterSpacing: "0.01em",
    color: tone.quiet,
  },
  link: {
    flexGrow: { default: 0, [breakpoints.lg]: 1 },
    flexShrink: 0,
    alignSelf: { default: "flex-start", [breakpoints.lg]: "center" },
    width: { default: 1, [breakpoints.lg]: "auto" },
    height: { default: 32, [breakpoints.lg]: 1 },
    minWidth: { default: 0, [breakpoints.lg]: 32 },
    marginLeft: { default: 6, [breakpoints.lg]: 0 },
    backgroundColor: tone.hairline,
  },
  subs: {
    position: "relative",
    flexBasis: { default: "auto", [breakpoints.lg]: "46%" },
    flexGrow: 0,
    flexShrink: 0,
    marginLeft: { default: 6, [breakpoints.lg]: 0 },
  },
  subsKind: {
    position: { default: "static", [breakpoints.lg]: "absolute" },
    top: { default: "auto", [breakpoints.lg]: -36 },
    left: 0,
    margin: 0,
    paddingLeft: { default: 24, [breakpoints.lg]: 41 },
    paddingBottom: { default: 12, [breakpoints.lg]: 0 },
    borderLeftWidth: { default: 1, [breakpoints.lg]: 0 },
    borderLeftStyle: "solid",
    borderLeftColor: tone.hairline,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.08em",
    color: tone.quiet,
  },
  list: {
    margin: 0,
    paddingBlock: 0,
    paddingRight: 0,
    paddingLeft: { default: 24, [breakpoints.lg]: 40 },
    listStyle: "none",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: tone.hairline,
  },
  sub: {
    paddingBlock: { default: 14, [breakpoints.xl]: 24 },
  },
  subName: {
    margin: 0,
    fontSize: { default: step.lead, [breakpoints.lg]: step.line },
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  subEnglish: {
    display: "block",
    marginTop: 2,
    fontFamily: font.serif,
    fontSize: { default: 17, [breakpoints.xl]: step.lead },
    letterSpacing: "0.01em",
    color: tone.quiet,
  },
  chartBar: {
    marginTop: { default: 56, [breakpoints.xl]: 80 },
  },
  chart: {
    marginTop: 40,
    animationName: { default: null, [breakpoints.motionOk]: fadeRise },
    animationDuration: "500ms",
    animationTimingFunction: motionCss.out,
  },
  chartImage: {
    display: "block",
    width: "100%",
    height: "auto",
  },
});

export function Structure() {
  const chip = ABOUT_HERO.navChips[5];
  const [showChart, setShowChart] = useState(false);
  const chartId = useId();

  return (
    <Section id={chip.id} label={chip.label}>
      <div {...stylex.props(s.tree)}>
        <Reveal sx={s.holding}>
          <p {...stylex.props(s.kind)}>{ABOUT_STRUCTURE.holding.badge}</p>
          <h3 {...stylex.props(s.holdingName)}>{ABOUT_STRUCTURE.holding.name}</h3>
          <div lang="en" {...stylex.props(s.holdingEnglish)}>
            {ABOUT_STRUCTURE.holding.english}
          </div>
        </Reveal>
        <span aria-hidden="true" {...stylex.props(s.link)} />
        <div {...stylex.props(s.subs)}>
          <p {...stylex.props(s.subsKind)}>{ABOUT_STRUCTURE.subsidiaryBadge}</p>
          <ul aria-label={ABOUT_STRUCTURE.subsidiaryBadge} {...stylex.props(s.list)}>
            {ABOUT_STRUCTURE.subsidiaries.map((sub, idx) => (
              <Reveal key={sub.id} as="li" step={idx} sx={s.sub}>
                <h4 {...stylex.props(s.subName)}>{sub.name}</h4>
                <span lang="en" {...stylex.props(s.subEnglish)}>
                  {sub.english}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
      <div {...stylex.props(s.chartBar)}>
        <button
          type="button"
          aria-expanded={showChart}
          aria-controls={chartId}
          onClick={() => setShowChart((prev) => !prev)}
          {...stylex.props(ui.textButton, ui.focusRing)}
        >
          {showChart ? "收起组织架构图" : "查看官方组织架构图"}
        </button>
        <div id={chartId} hidden={!showChart} {...stylex.props(s.chart)}>
          <img
            src={ABOUT_STRUCTURE.chartImage}
            alt="南京泛成国际控股有限公司官方组织架构图"
            loading="lazy"
            decoding="async"
            {...stylex.props(s.chartImage)}
          />
        </div>
      </div>
    </Section>
  );
}
