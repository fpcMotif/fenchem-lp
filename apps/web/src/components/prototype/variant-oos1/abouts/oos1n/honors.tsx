import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO, ABOUT_HONORS } from "../../about-data";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { step, tone } from "./tokens.stylex";

const LEVEL_LABEL = {
  national: "国家级",
  provincial: "江苏省级",
  municipal: "南京市级",
} as const;

const s = stylex.create({
  list: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(2, minmax(0, 1fr))",
    },
    gridTemplateRows: {
      default: "none",
      [breakpoints.lg]: "repeat(4, auto)",
    },
    gridAutoFlow: { default: "row", [breakpoints.lg]: "column" },
    columnGap: { default: 0, [breakpoints.lg]: 64, [breakpoints.xl]: 96 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  row: {
    display: "flex",
    flexDirection: { default: "column", [breakpoints.sm]: "row" },
    alignItems: { default: "flex-start", [breakpoints.sm]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 4, [breakpoints.sm]: 24 },
    paddingBlock: { default: 20, [breakpoints.xl]: 28 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  rowLast: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  rowFirstColumnEnd: {
    borderBottomWidth: { default: 0, [breakpoints.lg]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  title: {
    margin: 0,
    fontSize: { default: step.body, [breakpoints.md]: step.lead },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  level: {
    flexShrink: 0,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.quiet,
  },
});

export function Honors() {
  const chip = ABOUT_HERO.navChips[4];
  const last = ABOUT_HONORS.items.length - 1;

  return (
    <Section id={chip.id} label={ABOUT_HONORS.title} background={ui.onPaper}>
      <ul {...stylex.props(s.list)}>
        {ABOUT_HONORS.items.map((item, idx) => (
          <Reveal
            key={item.id}
            as="li"
            step={idx % 4}
            sx={[s.row, idx === last && s.rowLast, idx === 3 && s.rowFirstColumnEnd]}
          >
            <h3 {...stylex.props(s.title)}>{item.title}</h3>
            <span {...stylex.props(s.level)}>{LEVEL_LABEL[item.level]}</span>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
