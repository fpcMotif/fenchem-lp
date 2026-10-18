import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown } from "@fenchem-lp/ui/components/lucide";
import type { JSX } from "@solidjs/web";
import { createSignal, createUniqueId } from "solid-js";

import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, REGION_META, inciWithoutLatin, padIndex } from "../shared/derived";

const GROUND = "#311a1d";
const GROUND_RAISED = "#3d2427";
const TEXT = "#f3e9e6";
const BODY = "#dccbc7";
const MUTED = "#c4aeaa";
const HAIRLINE = "rgba(255, 255, 255, 0.14)";
const CHAPTER_RULE = "rgba(243, 233, 230, 0.38)";
const STRONG_RULE = "rgba(243, 233, 230, 0.72)";
const CONTROL_BORDER = "rgba(243, 233, 230, 0.3)";
const CONTROL_BORDER_HOVER = "rgba(243, 233, 230, 0.6)";
const ACCENT = colors.brandGreen300;
const FOCUS = colors.brandBlue300;
const BODY_FONT =
  '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const SERIF_FONT =
  '"Instrument Serif", "Times New Roman", "Source Han Sans SC", "Noto Sans SC", serif';
const NUMERAL_FONT = '"Inter Tight", "Source Han Sans SC", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MID = "@media (min-width: 768px) and (max-width: 1023.98px)";
const WIDE = breakpoints.lg;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const JUMP_OFFSET = HEADER_HEIGHT + 24;
const NUMBER_COLUMN = "64px";
const NAME_COLUMN = "19%";
const LATIN_COLUMN = "17%";
const INCI_COLUMN = "20%";

const chapterAnchor = (groupId: string) => `oos1pd-chapter-${groupId}`;

const CHAPTERS = CATALOG_GROUPS.map((group, groupIndex) => {
  const rows = FLAT_ITEMS.map((item, index) => ({ item, number: padIndex(index) })).filter(
    (row) => row.item.groupIndex === groupIndex,
  );
  const first = rows[0]?.number ?? "";
  const last = rows[rows.length - 1]?.number ?? "";
  return {
    group,
    english: REGION_META[group.id]?.english ?? "",
    rows,
    range: first === last ? first : `${first}–${last}`,
  };
});

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: GROUND,
    color: TEXT,
    fontFamily: BODY_FONT,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [TABLET]: 40, [DESKTOP]: INSET },
  },
  head: {
    display: "flex",
    flexDirection: { default: "column", [WIDE]: "row" },
    alignItems: { default: "stretch", [WIDE]: "flex-end" },
    justifyContent: "space-between",
    gap: { default: 24, [WIDE]: 40 },
    marginBottom: { default: 32, [DESKTOP]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: TEXT,
  },
  summary: {
    margin: 0,
    marginTop: 8,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: MUTED,
    fontVariantNumeric: "tabular-nums",
  },
  jump: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  jumpLabel: {
    flexShrink: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: MUTED,
  },
  selectWrap: {
    position: "relative",
    display: "flex",
    flexGrow: { default: 1, [MID]: 0, [WIDE]: 0 },
    minWidth: 0,
  },
  select: {
    appearance: "none",
    width: { default: "100%", [MID]: 320, [WIDE]: 264 },
    height: 40,
    margin: 0,
    paddingBlock: 0,
    paddingInlineStart: 12,
    paddingInlineEnd: 40,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: CONTROL_BORDER, ":hover": CONTROL_BORDER_HOVER },
    borderRadius: 2,
    backgroundColor: GROUND_RAISED,
    colorScheme: "dark",
    fontFamily: "inherit",
    fontSize: { default: 16, [WIDE]: 14 },
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: TEXT,
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 2,
  },
  option: {
    backgroundColor: GROUND_RAISED,
    color: TEXT,
  },
  selectIcon: {
    position: "absolute",
    insetInlineEnd: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: MUTED,
    pointerEvents: "none",
  },

  frame: {
    paddingTop: 3,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: STRONG_RULE,
  },
  table: {
    display: { default: "block", [WIDE]: "table" },
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: STRONG_RULE,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: STRONG_RULE,
  },
  colNumber: { width: NUMBER_COLUMN },
  colName: { width: NAME_COLUMN },
  colLatin: { width: LATIN_COLUMN },
  colInci: { width: INCI_COLUMN },
  thead: {
    display: { default: "none", [WIDE]: "table-header-group" },
  },
  headCell: {
    paddingTop: 14,
    paddingBottom: 14,
    paddingInlineStart: 0,
    paddingInlineEnd: 24,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.12em",
    textAlign: "start",
    color: MUTED,
    whiteSpace: "nowrap",
  },
  headCellLast: {
    paddingInlineEnd: 0,
  },
  headNumber: {
    fontFamily: NUMERAL_FONT,
    letterSpacing: "0.08em",
  },
  tbody: {
    display: { default: "block", [WIDE]: "table-row-group" },
  },
  chapterRow: {
    display: { default: "block", [WIDE]: "table-row" },
  },
  chapterCell: {
    display: { default: "block", [WIDE]: "table-cell" },
    paddingTop: { default: 40, [WIDE]: 48 },
    paddingBottom: { default: 20, [WIDE]: 24 },
    paddingInline: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: CHAPTER_RULE,
    fontWeight: 400,
    textAlign: "start",
  },
  chapterCellFirst: {
    borderTopWidth: { default: 0, [WIDE]: 1 },
    paddingTop: { default: 28, [WIDE]: 48 },
  },
  chapterGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [WIDE]: `${NUMBER_COLUMN} ${NAME_COLUMN} ${LATIN_COLUMN} ${INCI_COLUMN} minmax(0, 1fr)`,
    },
    alignItems: "baseline",
    rowGap: 12,
  },
  chapterRange: {
    display: { default: "none", [WIDE]: "block" },
    gridColumn: "1",
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "30px",
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  chapterHeading: {
    gridColumn: { default: "1", [WIDE]: "2 / 5" },
    paddingInlineEnd: { default: 0, [WIDE]: 24 },
  },
  chapterLabel: {
    margin: 0,
    fontSize: { default: 20, [WIDE]: 22 },
    fontWeight: 500,
    lineHeight: { default: "28px", [WIDE]: "30px" },
    letterSpacing: "0.04em",
    color: TEXT,
    textWrap: "balance",
  },
  chapterMeta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 16,
    rowGap: 4,
    margin: 0,
    marginTop: 8,
  },
  chapterEnglish: {
    fontFamily: NUMERAL_FONT,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: ACCENT,
  },
  chapterCount: {
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  chapterIntro: {
    gridColumn: { default: "1", [WIDE]: "5" },
    maxWidth: "36em",
    margin: 0,
    fontSize: 14,
    lineHeight: "24px",
    color: BODY,
    textWrap: "pretty",
  },

  row: {
    display: { default: "grid", [WIDE]: "table-row" },
    gridTemplateColumns: {
      default: "32px minmax(0, 1fr)",
      [MID]: "40px minmax(0, 5fr) minmax(0, 7fr)",
      [WIDE]: null,
    },
    gridTemplateRows: { default: null, [MID]: "auto auto 1fr", [WIDE]: null },
    gridTemplateAreas: {
      default: '"no name" ". latin" ". feat" ". inci"',
      [MID]: '"no name feat" ". latin feat" ". inci feat"',
      [WIDE]: null,
    },
    columnGap: { default: 0, [MID]: 24 },
    rowGap: { default: 6, [MID]: 4 },
    paddingBlock: { default: 16, [MID]: 20, [WIDE]: 0 },
    borderTopWidth: { default: 1, [WIDE]: 0 },
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
  cell: {
    display: { default: "block", [WIDE]: "table-cell" },
    minWidth: 0,
    paddingTop: { default: 0, [WIDE]: 20 },
    paddingBottom: { default: 0, [WIDE]: 22 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [WIDE]: 24 },
    borderTopWidth: { default: 0, [WIDE]: 1 },
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
    verticalAlign: "baseline",
    textAlign: "start",
  },
  cellLast: {
    paddingInlineEnd: 0,
  },
  numberCell: {
    gridArea: "no",
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  nameCell: {
    gridArea: "name",
    fontWeight: 400,
  },
  namePrimary: {
    display: "block",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: TEXT,
  },
  nameSecondary: {
    display: "block",
    marginTop: 2,
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED,
  },
  latinCell: {
    gridArea: "latin",
  },
  latinCellEmpty: {
    display: { default: "none", [WIDE]: "table-cell" },
  },
  latinName: {
    display: "block",
    fontFamily: SERIF_FONT,
    fontStyle: "italic",
    fontSize: 17,
    lineHeight: "24px",
    letterSpacing: "0.005em",
    color: BODY,
  },
  none: {
    fontSize: 14,
    lineHeight: "24px",
    color: MUTED,
  },
  inciCell: {
    gridArea: "inci",
    marginTop: { default: 4, [MID]: 4, [WIDE]: 0 },
    fontSize: 13,
    lineHeight: "22px",
    color: MUTED,
  },
  inciLabel: {
    display: { default: "inline", [WIDE]: "none" },
    marginInlineEnd: 8,
    fontFamily: NUMERAL_FONT,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.1em",
    color: MUTED,
  },
  featuresCell: {
    gridArea: "feat",
    marginTop: { default: 2, [MID]: 0 },
    fontSize: 14,
    lineHeight: "24px",
    color: BODY,
    textWrap: "pretty",
  },
  featuresText: {
    display: "block",
    maxWidth: "34em",
  },
  visuallyHidden: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
});

export function Catalog() {
  const titleId = createUniqueId();
  const selectId = createUniqueId();
  const reduce = useReducedMotion();
  const [region, setRegion] = createSignal(CHAPTERS[0]?.group.id ?? "");

  const jumpTo: JSX.EventHandler<HTMLSelectElement, Event> = (event) => {
    const groupId = event.currentTarget.value;
    setRegion(groupId);
    const target = document.getElementById(chapterAnchor(groupId));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - JUMP_OFFSET;
    window.scrollTo({ top, behavior: reduce() ? "instant" : "smooth" });
  };

  return (
    <section id="products-catalog" aria-labelledby={titleId} {...stylex.attrs(styles.section)}>
      <div {...stylex.attrs(styles.shell)}>
        <header {...stylex.attrs(styles.head)}>
          <div>
            <h2 id={titleId} {...stylex.attrs(styles.title)}>
              产品目录
            </h2>
            <p {...stylex.attrs(styles.summary)}>
              {FLAT_ITEMS.length} 款原料 · {CHAPTERS.length} 个分类
            </p>
          </div>
          <div {...stylex.attrs(styles.jump)}>
            <label for={selectId} {...stylex.attrs(styles.jumpLabel)}>
              跳转至
            </label>
            <span {...stylex.attrs(styles.selectWrap)}>
              <select
                id={selectId}
                value={region()}
                onChange={jumpTo}
                {...stylex.attrs(styles.select)}
              >
                {CHAPTERS.map((chapter) => (
                  <option value={chapter.group.id} {...stylex.attrs(styles.option)}>
                    {chapter.group.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                absoluteStrokeWidth
                aria-hidden="true"
                {...stylex.attrs(styles.selectIcon)}
              />
            </span>
          </div>
        </header>

        <div {...stylex.attrs(styles.frame)}>
          <table aria-labelledby={titleId} {...stylex.attrs(styles.table)}>
            <colgroup>
              <col {...stylex.attrs(styles.colNumber)} />
              <col {...stylex.attrs(styles.colName)} />
              <col {...stylex.attrs(styles.colLatin)} />
              <col {...stylex.attrs(styles.colInci)} />
              <col />
            </colgroup>
            <thead {...stylex.attrs(styles.thead)}>
              <tr>
                <th scope="col" {...stylex.attrs(styles.headCell, styles.headNumber)}>
                  No.
                </th>
                <th scope="col" {...stylex.attrs(styles.headCell)}>
                  名称
                </th>
                <th scope="col" {...stylex.attrs(styles.headCell)}>
                  学名
                </th>
                <th scope="col" {...stylex.attrs(styles.headCell)}>
                  INCI 名称
                </th>
                <th scope="col" {...stylex.attrs(styles.headCell, styles.headCellLast)}>
                  特性&应用
                </th>
              </tr>
            </thead>
            {CHAPTERS.map((chapter, chapterIndex) => (
              <tbody {...stylex.attrs(styles.tbody)}>
                <tr id={chapterAnchor(chapter.group.id)} {...stylex.attrs(styles.chapterRow)}>
                  <th
                    scope="rowgroup"
                    colspan={5}
                    {...stylex.attrs(
                      styles.chapterCell,
                      chapterIndex === 0 && styles.chapterCellFirst,
                    )}
                  >
                    <div {...stylex.attrs(styles.chapterGrid)}>
                      <span aria-hidden="true" {...stylex.attrs(styles.chapterRange)}>
                        {chapter.range}
                      </span>
                      <div {...stylex.attrs(styles.chapterHeading)}>
                        <h3 {...stylex.attrs(styles.chapterLabel)}>{chapter.group.label}</h3>
                        <p {...stylex.attrs(styles.chapterMeta)}>
                          <span lang="en" {...stylex.attrs(styles.chapterEnglish)}>
                            {chapter.english}
                          </span>
                          <span {...stylex.attrs(styles.chapterCount)}>
                            {chapter.rows.length} 款原料
                          </span>
                        </p>
                      </div>
                      {chapter.group.intro && (
                        <p {...stylex.attrs(styles.chapterIntro)}>{chapter.group.intro}</p>
                      )}
                    </div>
                  </th>
                </tr>
                {chapter.rows.map(({ item, number }) => (
                  <tr {...stylex.attrs(styles.row)}>
                    <td {...stylex.attrs(styles.cell, styles.numberCell)}>{number}</td>
                    <th scope="row" {...stylex.attrs(styles.cell, styles.nameCell)}>
                      <span {...stylex.attrs(styles.namePrimary)}>{item.primary}</span>
                      {item.secondary && (
                        <span {...stylex.attrs(styles.nameSecondary)}>{item.secondary}</span>
                      )}
                    </th>
                    <td
                      {...stylex.attrs(
                        styles.cell,
                        styles.latinCell,
                        item.latin.length === 0 && styles.latinCellEmpty,
                      )}
                    >
                      {item.latin.length > 0 ? (
                        item.latin.map((name) => (
                          <span lang="la" {...stylex.attrs(styles.latinName)}>
                            {name}
                          </span>
                        ))
                      ) : (
                        <>
                          <span aria-hidden="true" {...stylex.attrs(styles.none)}>
                            —
                          </span>
                          <span {...stylex.attrs(styles.visuallyHidden)}>None</span>
                        </>
                      )}
                    </td>
                    <td {...stylex.attrs(styles.cell, styles.inciCell)}>
                      <span aria-hidden="true" {...stylex.attrs(styles.inciLabel)}>
                        INCI
                      </span>
                      {inciWithoutLatin(item.inci)}
                    </td>
                    <td {...stylex.attrs(styles.cell, styles.cellLast, styles.featuresCell)}>
                      <span {...stylex.attrs(styles.featuresText)}>{item.features}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </section>
  );
}
