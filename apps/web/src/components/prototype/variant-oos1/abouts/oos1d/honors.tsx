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

const LEVELS = ["national", "provincial", "municipal"] as const;

const s = stylex.create({
  group: {
    alignItems: "baseline",
    rowGap: { default: 12, [breakpoints.lg]: 0 },
  },
  level: {
    paddingTop: { default: 28, [breakpoints.lg]: 0 },
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  listLast: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  row: {
    paddingBlock: { default: 18, [breakpoints.xl]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    fontSize: { default: step.body, [breakpoints.md]: "19px" },
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
});

export function Honors() {
  const chip = ABOUT_HERO.navChips[4];
  const lastLevel = LEVELS.length - 1;

  return (
    <Section id={chip.id} label={ABOUT_HONORS.eyebrow} background={ui.onPage}>
      {LEVELS.map((level, levelIdx) => (
        <div key={level} {...stylex.props(ui.phi, s.group)}>
          <h3 {...stylex.props(ui.label, levelIdx > 0 && s.level)}>{LEVEL_LABEL[level]}</h3>
          <ul {...stylex.props(ui.main, s.list, levelIdx === lastLevel && s.listLast)}>
            {ABOUT_HONORS.items
              .filter((honor) => honor.level === level)
              .map((honor, idx) => (
                <Reveal key={honor.id} as="li" step={idx % 4} sx={s.row}>
                  {honor.title}
                </Reveal>
              ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}
