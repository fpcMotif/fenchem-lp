import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO, ABOUT_HONORS } from "../../about-data";
import { Reveal, Section } from "./shared";
import { ui } from "./shared-values";
import { step, tone } from "./tokens.stylex";

const LEVELS = [
  { key: "national", label: "国家级" },
  { key: "provincial", label: "江苏省级" },
  { key: "municipal", label: "南京市级" },
] as const;

const s = stylex.create({
  groups: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  group: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.lg]: 24, [breakpoints.xl]: 32 },
    rowGap: 12,
    paddingBlock: { default: 28, [breakpoints.xl]: 40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  groupLast: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.hairline,
  },
  level: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 4" },
    paddingTop: { default: 0, [breakpoints.lg]: 6 },
  },
  titles: {
    gridColumn: { default: "auto", [breakpoints.lg]: "4 / 13" },
    display: "flex",
    flexDirection: "column",
    gap: { default: 14, [breakpoints.xl]: 18 },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  title: {
    margin: 0,
    fontSize: { default: step.body, [breakpoints.md]: step.lead, [breakpoints.xl]: "24px" },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
});

export function Honors() {
  const chip = ABOUT_HERO.navChips[4];
  const lastIndex = LEVELS.length - 1;

  return (
    <Section id={chip.id} label={chip.english} background={ui.onPage}>
      <ul {...stylex.props(s.groups)}>
        {LEVELS.map((level, idx) => (
          <Reveal key={level.key} as="li" sx={[s.group, idx === lastIndex && s.groupLast]}>
            <p {...stylex.props(ui.label, s.level)}>{level.label}</p>
            <ul {...stylex.props(s.titles)}>
              {ABOUT_HONORS.items
                .filter((honor) => honor.level === level.key)
                .map((honor) => (
                  <li key={honor.id}>
                    <h3 {...stylex.props(s.title)}>{honor.title}</h3>
                  </li>
                ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
