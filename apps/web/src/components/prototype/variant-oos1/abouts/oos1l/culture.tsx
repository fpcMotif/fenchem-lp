import * as stylex from "@stylexjs/stylex";

import { ABOUT_CULTURE } from "../../about-data";
import { Clause } from "./clause";
import { SectionLabel, headingId } from "./label";
import { SENTENCE } from "./sentence";
import { ui } from "./shared";
import { bp } from "./tokens.stylex";

const styles = stylex.create({
  section: {
    paddingTop: { default: 144, [bp.tablet]: 176, [bp.desktop]: 224 },
  },
  values: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 72, [bp.tablet]: 104, [bp.desktop]: 128 },
    marginTop: { default: 40, [bp.desktop]: 56 },
    marginBottom: 0,
    padding: 0,
    listStyleType: "none",
  },
  desc: {
    marginTop: { default: 20, [bp.desktop]: 28 },
  },
});

export function Culture() {
  return (
    <section
      id="about-culture"
      aria-labelledby={headingId("about-culture")}
      {...stylex.props(ui.section, styles.section)}
    >
      <div {...stylex.props(ui.shell)}>
        <SectionLabel section="about-culture" />
        <ul {...stylex.props(styles.values)}>
          {ABOUT_CULTURE.values.map((value, index) => (
            <li key={value.glyph}>
              <Clause line={SENTENCE.culture[index]} />
              <p {...stylex.props(ui.body, ui.bodyColumn, styles.desc)}>{value.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
