import { breakpoints } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import { Fold, s } from "./shared";
import { fonts, palette } from "./tokens.stylex";

const LEVELS = [
  { level: "national", label: "国家级" },
  { level: "provincial", label: "江苏省级" },
  { level: "municipal", label: "南京市级" },
] as const;

const styles = stylex.create({
  groups: {
    maxWidth: 1040,
    marginInline: "auto",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: palette.hairline,
  },
  group: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: { default: 20, [breakpoints.md]: 64 },
    alignItems: "start",
    paddingBlock: { default: 20, [breakpoints.lg]: 32 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: palette.hairline,
  },
  label: {
    margin: 0,
    paddingBlock: { default: 7, [breakpoints.lg]: 9 },
    textAlign: "end",
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  item: {
    paddingBlock: { default: 6, [breakpoints.lg]: 8 },
    fontFamily: fonts.cjk,
    fontSize: { default: 16, [breakpoints.lg]: 20 },
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    color: palette.ink,
  },
});

export function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby="about-honor-title"
      {...stylex.props(s.section, s.bandPage)}
    >
      <h2 id="about-honor-title" {...stylex.props(s.srOnly)}>
        {ABOUT_HONORS.title}
      </h2>
      <div {...stylex.props(s.shell)}>
        <div {...stylex.props(styles.groups)}>
          {LEVELS.map((group) => (
            <Fold key={group.level} innerSx={styles.group}>
              <p {...stylex.props(s.caption, styles.label)}>{group.label}</p>
              <ul {...stylex.props(styles.list)}>
                {ABOUT_HONORS.items
                  .filter((honor) => honor.level === group.level)
                  .map((honor) => (
                    <li key={honor.id} {...stylex.props(styles.item)}>
                      {honor.title}
                    </li>
                  ))}
              </ul>
            </Fold>
          ))}
        </div>
      </div>
    </section>
  );
}
