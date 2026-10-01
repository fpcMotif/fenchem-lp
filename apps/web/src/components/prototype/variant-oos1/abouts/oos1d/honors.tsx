import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO, ABOUT_HONORS } from "../../about-data";
import { Reveal, Section, ui } from "./shared";
import { step, tone } from "./tokens.stylex";

const LEVEL_LABEL = {
  national: "国家级",
  provincial: "江苏省级",
  municipal: "南京市级",
} as const;

const s = stylex.create({
  list: {
    gridColumn: { default: "auto", [breakpoints.lg]: 2 },
    margin: 0,
    padding: 0,
    listStyle: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  row: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 24,
    paddingBlock: { default: 20, [breakpoints.xl]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  title: {
    margin: 0,
    fontSize: { default: step.body, [breakpoints.md]: step.lead },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  level: {
    flexShrink: 0,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: tone.body,
  },
});

export function Honors() {
  const chip = ABOUT_HERO.navChips[4];

  return (
    <Section id={chip.id} label={ABOUT_HONORS.title} background={ui.onPage}>
      <div {...stylex.props(ui.phi)}>
        <ul {...stylex.props(s.list)}>
          {ABOUT_HONORS.items.map((honor, idx) => (
            <Reveal key={honor.id} as="li" step={idx % 4} sx={s.row}>
              <h3 {...stylex.props(s.title)}>{honor.title}</h3>
              <span {...stylex.props(s.level)}>{LEVEL_LABEL[honor.level]}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
