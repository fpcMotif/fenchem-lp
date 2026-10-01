import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { HONORS_BY_LEVEL, LEVEL_LABEL, type Level } from "./data";
import { layout } from "./layout";
import { palette } from "./palette.stylex";
import { Reveal } from "./reveal";

const LG = breakpoints.lg;

const styles = stylex.create({
  section: {
    backgroundColor: colors.paper,
  },
  groups: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  group: {
    alignItems: "start",
    paddingBlock: { default: 28, [LG]: 40 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.hairline,
  },
  groupFirst: {
    borderTopWidth: 0,
  },
  level: {
    paddingTop: { default: 0, [LG]: 21 },
    paddingBottom: 0,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  row: {
    margin: 0,
    paddingBlock: { default: 12, [LG]: 14 },
    fontFamily: palette.fontBody,
    fontSize: { default: 20, [LG]: 24 },
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    color: palette.ink,
  },
});

function levelTitleId(level: Level) {
  return `about-honor-level-${level}`;
}

export function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby="about-honor-title"
      {...stylex.props(styles.section, layout.sectionY, layout.anchor)}
    >
      <h2 id="about-honor-title" {...stylex.props(layout.srOnly)}>
        企业荣誉
      </h2>
      <ol {...stylex.props(layout.shell, styles.groups)}>
        {HONORS_BY_LEVEL.map((group, index) => (
          <li
            key={group.level}
            {...stylex.props(layout.split, styles.group, index === 0 && styles.groupFirst)}
          >
            <Reveal sx={[layout.padLeft, layout.seam, styles.level]}>
              <h3 id={levelTitleId(group.level)} {...stylex.props(layout.label)}>
                {LEVEL_LABEL[group.level]}
              </h3>
            </Reveal>
            <Reveal step={1} sx={layout.padRight}>
              <ul aria-labelledby={levelTitleId(group.level)} {...stylex.props(styles.list)}>
                {group.items.map((honor) => (
                  <li key={honor.id} {...stylex.props(styles.row)}>
                    {honor.title}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
