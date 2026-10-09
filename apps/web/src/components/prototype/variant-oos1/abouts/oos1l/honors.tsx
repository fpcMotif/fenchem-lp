import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import { Clause } from "./clause";
import { SectionLabel } from "./label";
import { headingId } from "./label-values";
import { SENTENCE } from "./sentence";
import { ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

type Level = (typeof ABOUT_HONORS.items)[number]["level"];

const LEVELS: readonly { level: Level; english: string }[] = [
  { level: "national", english: "National" },
  { level: "provincial", english: "Provincial" },
  { level: "municipal", english: "Municipal" },
];

const styles = stylex.create({
  section: {
    paddingTop: { default: 144, [bp.tablet]: 176, [bp.desktop]: 224 },
  },
  groups: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 36, [bp.desktop]: 48 },
    marginTop: { default: 40, [bp.desktop]: 56 },
    marginBottom: 0,
    padding: 0,
    listStyleType: "none",
  },
  group: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.tablet]: "minmax(0, 18%) minmax(0, 1fr)",
      [bp.desktop]: "minmax(0, 16.6%) minmax(0, 1fr)",
    },
    columnGap: 24,
    rowGap: 8,
    alignItems: "baseline",
  },
  level: {
    margin: 0,
    fontFamily: face.serif,
    fontSize: { default: 18, [bp.desktop]: 20 },
    fontStyle: "italic",
    lineHeight: 1,
    color: tone.navy,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
});

export function Honors() {
  return (
    <section
      id="about-honor"
      aria-labelledby={headingId("about-honor")}
      {...stylex.props(ui.section, styles.section)}
    >
      <div {...stylex.props(ui.shell)}>
        <SectionLabel section="about-honor" />
        <ul {...stylex.props(styles.groups)}>
          {LEVELS.map(({ level, english }) => (
            <li key={level} {...stylex.props(styles.group)}>
              <p
                lang="en"
                data-follows={
                  SENTENCE.honors[ABOUT_HONORS.items.findIndex((item) => item.level === level)]
                    .index
                }
                {...stylex.props(styles.level)}
              >
                {english}
              </p>
              <ul {...stylex.props(styles.list)}>
                {ABOUT_HONORS.items.map((item, index) =>
                  item.level === level ? (
                    <li key={item.id}>
                      <Clause line={SENTENCE.honors[index]} />
                    </li>
                  ) : null,
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
