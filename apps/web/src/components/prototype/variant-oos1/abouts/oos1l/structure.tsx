import * as stylex from "@stylexjs/stylex";

import { ABOUT_STRUCTURE } from "../../about-data";
import { Clause } from "./clause";
import { SectionLabel } from "./label";
import { headingId } from "./label-values";
import { SENTENCE } from "./sentence";
import { ui } from "./shared";
import { bp, face, tone } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    paddingTop: { default: 144, [bp.tablet]: 176, [bp.desktop]: 224 },
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.desktop]: "minmax(0, 20%) minmax(0, 1fr)",
    },
    columnGap: 24,
    rowGap: 4,
    alignItems: "last baseline",
  },
  lead: {
    marginTop: { default: 40, [bp.desktop]: 56 },
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 20, [bp.desktop]: 6 },
    marginTop: { default: 28, [bp.desktop]: 36 },
    marginBottom: 0,
    padding: 0,
    listStyleType: "none",
  },
  holding: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    margin: 0,
    order: { default: 2, [bp.desktop]: 0 },
  },
  badge: {
    fontFamily: face.sans,
    fontSize: 13,
    color: tone.body,
  },
  english: {
    margin: 0,
    fontFamily: face.latin,
    fontSize: { default: 13, [bp.desktop]: 14 },
    fontWeight: 500,
    lineHeight: 1.3,
    color: tone.body,
    textAlign: { default: "end", [bp.desktop]: "start" },
    order: { default: 2, [bp.desktop]: 0 },
  },
});

export function Structure() {
  const { lead, subsidiaries } = SENTENCE.structure;
  return (
    <section
      id="about-structure"
      aria-labelledby={headingId("about-structure")}
      {...stylex.attrs(ui.section, styles.section)}
    >
      <div {...stylex.attrs(ui.shell)}>
        <SectionLabel section="about-structure" />
        <div {...stylex.attrs(styles.row, styles.lead)}>
          <p data-follows={lead[0].index} {...stylex.attrs(styles.holding)}>
            <span {...stylex.attrs(styles.badge)}>{ABOUT_STRUCTURE.holding.badge}</span>
            <span lang="en" {...stylex.attrs(ui.note)}>
              {ABOUT_STRUCTURE.holding.english}
            </span>
          </p>
          {lead.map((line) => (
            <Clause line={line} />
          ))}
        </div>
        <ol {...stylex.attrs(styles.list)}>
          {ABOUT_STRUCTURE.subsidiaries.map((company, index) => (
            <li {...stylex.attrs(styles.row)}>
              <p
                lang="en"
                data-follows={subsidiaries[index].index}
                {...stylex.attrs(styles.english)}
              >
                {company.english}
              </p>
              <Clause line={subsidiaries[index]} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
