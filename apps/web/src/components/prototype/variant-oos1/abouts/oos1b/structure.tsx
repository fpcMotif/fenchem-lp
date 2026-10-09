import * as stylex from "@stylexjs/stylex";

import { ABOUT_STRUCTURE } from "../../about-data";
import { Bevel, Mat, SectionHead, Tag, useArrived } from "./shared";
import { ROMAN, stepIn, ui } from "./shared-values";
import { bp, face, space, tone } from "./tokens.stylex";

const LEGAL_SUFFIX = /有限公司$/;

const styles = stylex.create({
  holdingHead: {
    display: "flex",
    flexDirection: { default: "column", [bp.desktop]: "row" },
    alignItems: { default: "flex-start", [bp.desktop]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 6, [bp.desktop]: 32 },
    paddingTop: { default: 10, [bp.upTablet]: 14 },
  },
  holdingName: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: { default: 24, [bp.tablet]: 32, [bp.laptop]: 34, [bp.wide]: 40 },
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "0.04em",
    color: tone.ink,
  },
  holdingEnglish: {
    margin: 0,
    fontSize: { default: 19, [bp.tablet]: 24, [bp.desktop]: 28 },
    lineHeight: 1.2,
    color: tone.navy,
  },
  wall: {
    padding: { default: 16, [bp.tablet]: space.mat, [bp.laptop]: 20, [bp.wide]: space.mat },
    backgroundColor: tone.whisper,
  },
  rowLabel: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    margin: 0,
    marginBottom: { default: 16, [bp.upTablet]: 24 },
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 17 },
    fontWeight: 500,
    color: tone.ink,
  },
  rowLabelEn: {
    fontSize: { default: 18, [bp.desktop]: 22 },
    color: tone.navy,
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, minmax(0, 1fr))",
      [bp.tablet]: "repeat(3, minmax(0, 1fr))",
      [bp.desktop]: "repeat(5, minmax(0, 1fr))",
    },
    columnGap: { default: 12, [bp.tablet]: space.mat, [bp.laptop]: 16, [bp.wide]: space.mat },
    rowGap: { default: 16, [bp.upTablet]: space.mat },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  slot: {
    display: "grid",
  },
  plate: {
    paddingTop: { default: 10, [bp.tablet]: 14, [bp.laptop]: 10, [bp.wide]: 14 },
    paddingInline: { default: 10, [bp.tablet]: 14, [bp.laptop]: 10, [bp.wide]: 14 },
  },
  plateField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "2 / 3",
    backgroundColor: tone.whisper,
  },
  name: {
    margin: 0,
    writingMode: "vertical-rl",
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.tablet]: 18, [bp.laptop]: 17, [bp.wide]: 20 },
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.12em",
    color: tone.ink,
  },
  suffix: {
    display: "block",
    color: tone.body,
    fontWeight: 400,
  },
  plateFoot: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
  },
  numeral: {
    fontFamily: face.latin,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.06em",
    color: tone.navy,
  },
  english: {
    margin: 0,
    fontSize: { default: 15, [bp.upTablet]: 16, [bp.wide]: 17 },
    lineHeight: 1.2,
  },
});

export function Structure() {
  const [ref, arrived] = useArrived<HTMLDivElement>();
  const { holding, subsidiaries, subsidiaryBadge } = ABOUT_STRUCTURE;
  return (
    <section
      id="about-structure"
      aria-labelledby="oos1b-structure"
      {...stylex.props(ui.anchor, ui.section, ui.shell)}
    >
      <SectionHead
        id="oos1b-structure"
        index={6}
        eyebrow="Structure"
        title={ABOUT_STRUCTURE.title}
        note="One holding, five companies within it."
      />
      <div ref={ref} {...stylex.props(...stepIn(arrived, 0))}>
        <Mat
          raised
          head={
            <div {...stylex.props(styles.holdingHead)}>
              <Tag numeral="I" label={holding.badge} />
              <h3 {...stylex.props(styles.holdingName)}>{holding.name}</h3>
              <p lang="en" {...stylex.props(ui.serif, styles.holdingEnglish)}>
                {holding.english}
              </p>
            </div>
          }
        >
          <Bevel field={styles.wall}>
            <p {...stylex.props(styles.rowLabel)}>
              {subsidiaryBadge}
              <span lang="en" {...stylex.props(ui.serif, styles.rowLabelEn)}>
                Wholly owned
              </span>
            </p>
            <ul {...stylex.props(styles.row)}>
              {subsidiaries.map((subsidiary, index) => (
                <li
                  key={subsidiary.id}
                  {...stylex.props(styles.slot, ...stepIn(arrived, 1 + index * 0.35))}
                >
                  <Mat
                    layout={styles.plate}
                    foot={
                      <p {...stylex.props(styles.plateFoot, ui.reset)}>
                        <span lang="en" {...stylex.props(styles.numeral)}>
                          {ROMAN[index].toLowerCase()}
                        </span>
                        <span lang="en" {...stylex.props(ui.serif, styles.english)}>
                          {subsidiary.english}
                        </span>
                      </p>
                    }
                  >
                    <Bevel field={styles.plateField}>
                      <p {...stylex.props(styles.name)}>
                        {subsidiary.name.replace(LEGAL_SUFFIX, "")}
                        <span {...stylex.props(styles.suffix)}>
                          {subsidiary.name.match(LEGAL_SUFFIX)?.[0]}
                        </span>
                      </p>
                    </Bevel>
                  </Mat>
                </li>
              ))}
            </ul>
          </Bevel>
        </Mat>
      </div>
    </section>
  );
}
