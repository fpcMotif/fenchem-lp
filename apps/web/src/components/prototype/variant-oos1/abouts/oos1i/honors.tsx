import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import { Reveal } from "./motion";
import { Section, SectionName } from "./primitives";
import { base } from "./primitives-values";
import { font, media, tone } from "./shear.stylex";

type Level = (typeof ABOUT_HONORS.items)[number]["level"];

const LEVELS: readonly { level: Level; label: string }[] = [
  { level: "national", label: "国家级" },
  { level: "provincial", label: "江苏省级" },
  { level: "municipal", label: "南京市级" },
];

const S = stylex.create({
  groups: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  group: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "minmax(0, 3fr) minmax(0, 9fr)",
    },
    columnGap: 32,
    rowGap: 16,
    paddingBlock: { default: 28, [media.desktop]: 40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.rule,
  },
  groupLast: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.rule,
  },
  items: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "repeat(2, minmax(0, 1fr))",
    },
    gap: { default: "14px 32px", [media.desktop]: "20px 48px" },
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  itemsNational: {
    gridTemplateColumns: "minmax(0, 1fr)",
  },
  title: {
    margin: 0,
    fontFamily: font.sans,
    fontSize: { default: 18, [media.desktop]: 22 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    color: tone.ink,
  },
  titleNational: {
    fontSize: { default: 26, [media.desktop]: 40 },
    fontWeight: 700,
    letterSpacing: "0.04em",
  },
});

export function Honors() {
  return (
    <Section id="about-honor" labelledBy="about-honor-title" surface="paper">
      <SectionName id="about-honor-title">{ABOUT_HONORS.eyebrow}</SectionName>
      <div {...stylex.props(base.shell, base.inset)}>
        <ul {...stylex.props(S.groups)}>
          {LEVELS.map((group, groupIndex) => {
            const honors = ABOUT_HONORS.items.filter((item) => item.level === group.level);
            const national = group.level === "national";
            return (
              <Reveal
                key={group.level}
                as="li"
                delay={groupIndex * 100}
                sx={[S.group, groupIndex === LEVELS.length - 1 && S.groupLast]}
              >
                <h3 {...stylex.props(base.quiet)}>{group.label}</h3>
                <ul {...stylex.props(S.items, national && S.itemsNational)}>
                  {honors.map((honor) => (
                    <li key={honor.id}>
                      <p {...stylex.props(S.title, national && S.titleNational)}>{honor.title}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
