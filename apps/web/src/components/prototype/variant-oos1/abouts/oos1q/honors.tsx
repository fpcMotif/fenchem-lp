import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HERO, ABOUT_HONORS } from "../../about-data";
import { Reveal, Section } from "./shared";
import { step, tone } from "./tokens.stylex";

const LEVELS = [
  { level: "national", label: "国家级" },
  { level: "provincial", label: "江苏省级" },
  { level: "municipal", label: "南京市级" },
] as const;

const s = stylex.create({
  tiers: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  tier: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 0, [breakpoints.lg]: 24, [breakpoints.xl]: 32 },
    rowGap: 12,
    paddingBlock: { default: 36, [breakpoints.xl]: 56 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  label: {
    gridColumn: { default: "auto", [breakpoints.lg]: "1 / 4" },
    margin: 0,
    fontSize: step.label,
    fontWeight: 400,
    letterSpacing: "0.08em",
    lineHeight: 2.6,
    color: tone.quiet,
  },
  names: {
    gridColumn: { default: "auto", [breakpoints.lg]: "5 / 13" },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  name: {
    fontSize: { default: step.lead, [breakpoints.md]: step.line },
    lineHeight: 2.2,
    letterSpacing: "0.08em",
    color: tone.ink,
  },
});

export function Honors() {
  const chip = ABOUT_HERO.navChips[4];

  return (
    <Section id={chip.id} label={chip.english}>
      <ul {...stylex.props(s.tiers)}>
        {LEVELS.map((tier, idx) => (
          <Reveal key={tier.level} as="li" step={idx} sx={s.tier}>
            <h3 {...stylex.props(s.label)}>{tier.label}</h3>
            <ul {...stylex.props(s.names)}>
              {ABOUT_HONORS.items
                .filter((honor) => honor.level === tier.level)
                .map((honor) => (
                  <li key={honor.id} {...stylex.props(s.name)}>
                    {honor.title}
                  </li>
                ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
