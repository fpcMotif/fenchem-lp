import * as stylex from "@stylexjs/stylex";

import { ABOUT_HONORS } from "../../about-data";
import type { Magnitude } from "./sky";
import { ChartHeading, useDusk } from "./shared";
import { ui } from "./shared-values";
import { bp, face, sky } from "./tokens.stylex";

type Level = (typeof ABOUT_HONORS.items)[number]["level"];

const CLASSES: Record<Level, { magnitude: Magnitude; zh: string; en: string }> = {
  national: { magnitude: 1, zh: "国家级", en: "National" },
  provincial: { magnitude: 2, zh: "省级", en: "Provincial" },
  municipal: { magnitude: 3, zh: "市级", en: "Municipal" },
};

const LEVELS: readonly Level[] = ["national", "provincial", "municipal"];

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.desktop]: "repeat(12, minmax(0, 1fr))" },
    columnGap: 24,
    rowGap: { default: 48, [bp.tablet]: 56 },
    alignItems: "start",
  },
  aside: {
    gridColumn: { default: "auto", [bp.desktop]: "1 / span 4" },
    display: "flex",
    flexDirection: "column",
    gap: { default: 32, [bp.desktop]: 48 },
  },
  keyBox: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  key: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  keyRow: {
    display: "grid",
    gridTemplateColumns: "20px 20px auto",
    alignItems: "center",
    columnGap: 12,
  },
  keyNumeral: {
    fontSize: 18,
    color: sky.text,
    textAlign: "center",
  },
  keyName: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
    fontFamily: face.sans,
    fontSize: 16,
    letterSpacing: "0.04em",
    color: sky.star,
  },
  dotCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    margin: 0,
  },
  dot: {
    borderRadius: "50%",
    backgroundColor: sky.star,
  },
  table: {
    gridColumn: { default: "auto", [bp.laptop]: "5 / span 8", [bp.wide]: "6 / span 7" },
    width: "100%",
    borderCollapse: "collapse",
    fontVariantNumeric: "tabular-nums",
  },
  th: {
    paddingBottom: 14,
    textAlign: "start",
    fontWeight: 500,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: sky.hairStrong,
  },
  td: {
    paddingBlock: { default: 16, [bp.desktop]: 20 },
    verticalAlign: "middle",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: sky.hair,
  },
  dotColumn: {
    width: 36,
    paddingInlineEnd: 8,
  },
  catalogue: {
    display: {
      default: "none",
      [bp.tablet]: "table-cell",
      [bp.laptop]: "none",
      [bp.wide]: "table-cell",
    },
    width: 96,
    paddingInlineEnd: 16,
    whiteSpace: "nowrap",
  },
  classColumn: {
    display: { default: "none", [bp.wideUp]: "table-cell" },
    width: 196,
    paddingInlineEnd: 16,
    whiteSpace: "nowrap",
  },
  magColumn: {
    width: 48,
    textAlign: "end",
  },
  name: {
    fontFamily: face.sans,
    fontWeight: 500,
    letterSpacing: "0.04em",
    color: sky.star,
  },
  sub: {
    display: { default: "block", [bp.wideUp]: "none" },
    marginTop: 4,
    fontSize: 14,
  },
  classZh: {
    fontFamily: face.sans,
    fontSize: 16,
    letterSpacing: "0.04em",
    color: sky.text,
    marginInlineEnd: 8,
  },
  mag: {
    fontSize: 26,
    color: sky.star,
  },
});

const scale = stylex.create({
  dotFirst: { width: 9, height: 9 },
  dotSecond: { width: 6, height: 6, opacity: 0.88 },
  dotThird: { width: 3.5, height: 3.5, opacity: 0.75 },
  nameFirst: { fontSize: { default: 21, [bp.desktop]: 25 } },
  nameSecond: { fontSize: { default: 17, [bp.desktop]: 19 } },
  nameThird: { fontSize: { default: 16, [bp.desktop]: 17 } },
});

const magnitude = { 1: scale.dotFirst, 2: scale.dotSecond, 3: scale.dotThird } as const;
const type = { 1: scale.nameFirst, 2: scale.nameSecond, 3: scale.nameThird } as const;

function Dot({ mag, hidden }: { mag: Magnitude; hidden?: boolean }) {
  return (
    <span
      aria-hidden="true"
      {...stylex.props(
        styles.dot,
        magnitude[mag],
        ui.dim,
        hidden === true && ui.dimHidden,
        ui.dimDelay((mag - 1) * 520),
      )}
    />
  );
}

export function Honors() {
  const [tableRef, hidden] = useDusk<HTMLTableElement>();

  return (
    <section id="about-honor" aria-labelledby="oos1k-honor" {...stylex.props(ui.section, ui.shell)}>
      <div {...stylex.props(styles.grid)}>
        <div {...stylex.props(styles.aside)}>
          <ChartHeading
            id="oos1k-honor"
            numeral="V"
            label="Honors"
            title={ABOUT_HONORS.title}
            note="A catalogue by magnitude"
          />
          <div {...stylex.props(styles.keyBox)}>
            <p {...stylex.props(ui.label)}>
              <span lang="en">Magnitude</span> · 星等
            </p>
            <ul {...stylex.props(styles.key)}>
              {LEVELS.map((level) => (
                <li key={level} {...stylex.props(styles.keyRow)}>
                  <span {...stylex.props(styles.dotCell)}>
                    <Dot mag={CLASSES[level].magnitude} />
                  </span>
                  <span {...stylex.props(styles.dotCell, ui.designation, styles.keyNumeral)}>
                    {CLASSES[level].magnitude}
                  </span>
                  <span {...stylex.props(styles.keyName)}>
                    {CLASSES[level].zh}
                    <span lang="en" {...stylex.props(ui.label)}>
                      {CLASSES[level].en}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <table ref={tableRef} {...stylex.props(styles.table)}>
          <caption {...stylex.props(ui.srOnly)}>企业荣誉星表，按星等排列</caption>
          <thead>
            <tr>
              <th scope="col" {...stylex.props(ui.label, styles.th, styles.dotColumn)}>
                <span {...stylex.props(ui.srOnly)}>星点</span>
              </th>
              <th scope="col" lang="en" {...stylex.props(ui.label, styles.th, styles.catalogue)}>
                Cat. No.
              </th>
              <th scope="col" {...stylex.props(ui.label, styles.th)}>
                名称 <span lang="en">· Designation</span>
              </th>
              <th scope="col" {...stylex.props(ui.label, styles.th, styles.classColumn)}>
                级别 <span lang="en">· Class</span>
              </th>
              <th scope="col" lang="en" {...stylex.props(ui.label, styles.th, styles.magColumn)}>
                Mag.
              </th>
            </tr>
          </thead>
          <tbody>
            {ABOUT_HONORS.items.map((item, index) => {
              const level = CLASSES[item.level];
              return (
                <tr key={item.id}>
                  <td {...stylex.props(styles.td, styles.dotColumn)}>
                    <span {...stylex.props(styles.dotCell)}>
                      <Dot mag={level.magnitude} hidden={hidden} />
                    </span>
                  </td>
                  <td lang="en" {...stylex.props(ui.label, styles.td, styles.catalogue)}>
                    FC {String(index + 1).padStart(3, "0")}
                  </td>
                  <td {...stylex.props(styles.td)}>
                    <span {...stylex.props(styles.name, type[level.magnitude])}>{item.title}</span>
                    <span aria-hidden="true" {...stylex.props(ui.label, styles.sub)}>
                      {level.zh} · <span lang="en">{level.en}</span>
                    </span>
                  </td>
                  <td {...stylex.props(styles.td, styles.classColumn)}>
                    <span {...stylex.props(styles.classZh)}>{level.zh}</span>
                    <span lang="en" {...stylex.props(ui.label)}>
                      {level.en}
                    </span>
                  </td>
                  <td {...stylex.props(styles.td, styles.magColumn, ui.designation, styles.mag)}>
                    {level.magnitude}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
