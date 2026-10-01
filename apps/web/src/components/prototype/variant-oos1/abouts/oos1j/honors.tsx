import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import { Reveal, SectionName } from "./parts";
import { base, ty } from "./shared";
import { hue } from "./theme.stylex";

const LEVEL_LABEL = {
  national: "国家级",
  provincial: "江苏省级",
  municipal: "南京市级",
} as const;

const styles = stylex.create({
  honors: {
    backgroundColor: hue.page,
  },
  list: {
    maxWidth: 960,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [breakpoints.md]: "minmax(0, 1fr) 96px",
    },
    alignItems: "baseline",
    columnGap: 32,
    rowGap: 4,
    paddingBlock: { default: 18, [breakpoints.lg]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: hue.hairline,
  },
  rowLast: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: hue.hairline,
  },
  title: {
    margin: 0,
    fontSize: "clamp(20px, 2vw, 28px)",
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: "0.05em",
    color: hue.ink,
  },
  level: {
    justifySelf: { default: "start", [breakpoints.md]: "end" },
  },
});

export function Honors() {
  const lastIndex = ABOUT_HONORS.items.length - 1;
  return (
    <section
      id="about-honor"
      aria-labelledby="about-honor-title"
      {...stylex.props(base.section, base.anchor, styles.honors)}
    >
      <SectionName id="about-honor-title">企业荣誉</SectionName>
      <div {...stylex.props(base.shell)}>
        <ul {...stylex.props(styles.list)}>
          {ABOUT_HONORS.items.map((honor, idx) => (
            <Reveal
              key={honor.id}
              as="li"
              step={idx % 3}
              sx={[styles.row, idx === lastIndex && styles.rowLast]}
            >
              <h3 {...stylex.props(styles.title)}>{honor.title}</h3>
              <span {...stylex.props(ty.quiet, styles.level)}>{LEVEL_LABEL[honor.level]}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
