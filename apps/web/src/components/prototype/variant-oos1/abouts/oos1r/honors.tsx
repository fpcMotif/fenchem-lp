import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO, ABOUT_HONORS } from "../../about-data";
import { Reveal, Section } from "./shared";
import { band, step, tone } from "./tokens.stylex";

const LEVELS = [
  { level: "national", label: "国家级" },
  { level: "provincial", label: "江苏省级" },
  { level: "municipal", label: "南京市级" },
] as const;

const s = stylex.create({
  groups: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 40, [breakpoints.xl]: 64 },
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
    columnGap: 24,
    rowGap: 8,
  },
  level: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 4" },
    margin: 0,
    paddingTop: { default: 0, [breakpoints.lg]: 20 },
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.1em",
    lineHeight: 1.6,
    color: tone.body,
  },
  titles: {
    gridColumn: { default: "auto", [breakpoints.lg]: "4 / 13" },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  title: {
    paddingBlock: { default: 14, [breakpoints.xl]: 18 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    fontSize: { default: 20, [band.mdToXl]: 24, [breakpoints.xl]: 30 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
});

export function Honors() {
  const chip = ABOUT_HERO.navChips[4];

  return (
    <Section id={chip.id} label={chip.english}>
      <ul {...stylex.props(s.groups)}>
        {LEVELS.map(({ level, label }, groupIdx) => {
          const items = ABOUT_HONORS.items.filter((item) => item.level === level);
          const labelId = `about-honor-${level}`;
          return (
            <Reveal key={level} as="li" delay={groupIdx * 80} sx={s.group}>
              <p id={labelId} {...stylex.props(s.level)}>
                {label}
              </p>
              <ul aria-labelledby={labelId} {...stylex.props(s.titles)}>
                {items.map((item) => (
                  <li key={item.id} {...stylex.props(s.title)}>
                    {item.title}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
