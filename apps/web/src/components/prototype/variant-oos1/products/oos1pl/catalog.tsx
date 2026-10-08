import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown, ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

import { CATALOG_GROUPS, type CatalogGroup } from "../../products-data";
import { padIndex, splitTitle } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const STONE = "#f3f0eb";
const ROW_RULE = "#e2dcd2";
const GROUP_RULE = "#d3cbbd";
const ACCENT = colors.brandGreen700;
const FOCUS = colors.brandBlue700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const SM = "@media (min-width: 640px) and (max-width: 1023.98px)";
const LG = breakpoints.lg;
const MOTION_OK = breakpoints.motionOk;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;

const INCI_LATIN = /（[^）]*）/g;
const TOTAL_ITEMS = CATALOG_GROUPS.reduce((sum, group) => sum + group.items.length, 0);
const ALL_GROUP_IDS = CATALOG_GROUPS.map((group) => group.id);

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: STONE,
    color: INK,
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
    marginBottom: { default: 32, [DESKTOP]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    textWrap: "balance",
    color: INK,
  },
  lead: {
    margin: 0,
    marginTop: 12,
    maxWidth: 520,
    fontSize: 16,
    lineHeight: "26px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 8,
  },
  meta: {
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  toggleAll: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 40,
    paddingInline: 12,
    marginInlineEnd: -12,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: INK, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
  },

  frame: {
    borderTopWidth: { default: 1, [LG]: 0 },
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: GROUP_RULE,
  },
  table: {
    display: { default: "block", [LG]: "table" },
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  colgroup: {
    display: { default: "none", [LG]: "table-column-group" },
  },
  colName: { width: "25%" },
  colInci: { width: "31%" },
  colFeatures: { width: "44%" },
  thead: {
    position: { default: "absolute", [LG]: "static" },
    display: { default: "block", [LG]: "table-header-group" },
    width: { default: 1, [LG]: "auto" },
    height: { default: 1, [LG]: "auto" },
    overflow: { default: "hidden", [LG]: "visible" },
    clipPath: { default: "inset(50%)", [LG]: "none" },
    whiteSpace: { default: "nowrap", [LG]: "normal" },
  },
  columnHead: {
    position: "sticky",
    top: HEADER_HEIGHT,
    zIndex: 1,
    paddingBlock: 14,
    paddingInlineStart: 0,
    paddingInlineEnd: 24,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: INK,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: GROUP_RULE,
    backgroundColor: STONE,
    textAlign: "start",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED,
  },
  columnHeadFirst: {
    paddingInlineStart: 40,
  },

  tbody: {
    display: { default: "block", [LG]: "table-row-group" },
  },
  groupRow: {
    display: { default: "block", [LG]: "table-row" },
  },
  groupCell: {
    display: { default: "block", [LG]: "table-cell" },
    padding: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: GROUP_RULE,
    textAlign: "start",
    fontWeight: 400,
  },
  groupCellFirst: {
    borderTopWidth: 0,
  },
  groupButton: {
    display: "grid",
    gridTemplateColumns: {
      default: "32px minmax(0, 1fr) 40px",
      [LG]: "40px calc(25% - 40px) minmax(0, 1fr) 40px",
    },
    gridTemplateAreas: {
      default: '"index name icon" ". preview icon"',
      [LG]: '"index name preview icon"',
    },
    alignItems: "baseline",
    rowGap: 2,
    width: "100%",
    minHeight: 64,
    paddingBlock: { default: 16, [LG]: 20 },
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: INK, ":hover": FOCUS },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: -2,
  },
  groupIndex: {
    gridArea: "index",
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  },
  groupIndexOpen: {
    color: ACCENT,
  },
  groupName: {
    gridArea: "name",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    columnGap: 12,
    minWidth: 0,
    paddingInlineEnd: 16,
  },
  groupLabel: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: "inherit",
  },
  groupCount: {
    fontSize: 13,
    lineHeight: "20px",
    whiteSpace: "nowrap",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
  },
  groupPreview: {
    gridArea: "preview",
    minWidth: 0,
    paddingInlineEnd: { default: 0, [LG]: 16 },
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: 14,
    lineHeight: { default: "22px", [LG]: "24px" },
    color: MUTED,
    opacity: 1,
    transitionProperty: "opacity",
    transitionDuration: { default: "0s", [MOTION_OK]: "200ms" },
    transitionTimingFunction: "ease",
  },
  groupPreviewHidden: {
    display: { default: "none", [LG]: "block" },
    visibility: "hidden",
    opacity: 0,
  },
  groupIcon: {
    gridArea: "icon",
    alignSelf: "center",
    justifySelf: "end",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginBlock: -8,
    marginInlineEnd: -10,
    transform: "rotate(0deg)",
    transitionProperty: "transform",
    transitionDuration: { default: "0s", [MOTION_OK]: "280ms" },
    transitionTimingFunction: EASE_OUT_CSS,
  },
  groupIconOpen: {
    transform: "rotate(180deg)",
  },

  introRow: {
    display: { default: "block", [LG]: "table-row" },
  },
  introCell: {
    display: { default: "block", [LG]: "table-cell" },
    padding: 0,
  },
  introPad: {
    marginInlineStart: { default: 32, [LG]: 40 },
    paddingBottom: 20,
  },
  intro: {
    margin: 0,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: "26px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },

  itemRow: {
    display: { default: "grid", [LG]: "table-row" },
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [SM]: "minmax(0, 2fr) minmax(0, 3fr)",
      [LG]: null,
    },
  },
  cell: {
    display: { default: "block", [LG]: "table-cell" },
    padding: 0,
    verticalAlign: "top",
    textAlign: "start",
    fontWeight: 400,
  },
  nameCell: {
    gridRow: { default: null, [SM]: "span 2" },
  },

  fold: {
    display: "grid",
    gridTemplateRows: "0fr",
    visibility: "hidden",
    transitionProperty: "grid-template-rows, visibility",
    transitionTimingFunction: EASE_OUT_CSS,
    transitionDuration: { default: "0s", [MOTION_OK]: "280ms, 0s" },
    transitionDelay: { default: "0s", [MOTION_OK]: "0s, 280ms" },
  },
  foldOpen: {
    gridTemplateRows: "1fr",
    visibility: "visible",
    transitionDelay: "0s",
  },
  foldInner: {
    minHeight: 0,
    overflow: "hidden",
  },

  namePad: {
    display: "flex",
    flexDirection: "column",
    marginInlineStart: { default: 32, [LG]: 40 },
    paddingTop: 16,
    paddingBottom: { default: 4, [SM]: 16, [LG]: 16 },
    paddingInlineEnd: { default: 0, [SM]: 24, [LG]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: ROW_RULE,
  },
  inciPad: {
    paddingInlineStart: { default: 32, [SM]: 0, [LG]: 0 },
    paddingTop: { default: 0, [SM]: 18, [LG]: 18 },
    paddingBottom: { default: 0, [LG]: 16 },
    paddingInlineEnd: { default: 0, [LG]: 24 },
    borderTopWidth: { default: 0, [SM]: 1, [LG]: 1 },
    borderTopStyle: "solid",
    borderTopColor: ROW_RULE,
  },
  featuresPad: {
    paddingInlineStart: { default: 32, [SM]: 0, [LG]: 0 },
    paddingTop: { default: 8, [LG]: 16 },
    paddingBottom: 16,
    paddingInlineEnd: { default: 0, [LG]: 16 },
    borderTopWidth: { default: 0, [LG]: 1 },
    borderTopStyle: "solid",
    borderTopColor: ROW_RULE,
  },
  namePrimary: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
  },
  nameSecondary: {
    fontSize: 13,
    lineHeight: "20px",
    color: MUTED,
  },
  inci: {
    margin: 0,
    fontSize: 13,
    lineHeight: "22px",
    color: MUTED,
  },
  inciTag: {
    display: { default: "inline", [LG]: "none" },
    marginInlineEnd: 8,
    fontFamily: NUMERAL_FONT,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.08em",
    color: MUTED,
  },
  keepTogether: {
    whiteSpace: "nowrap",
  },
  features: {
    margin: 0,
    maxWidth: "40em",
    fontSize: 14,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
});

function Inci({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INCI_LATIN)) {
    parts.push(text.slice(last, match.index));
    parts.push(
      <span key={match.index} {...stylex.props(styles.keepTogether)}>
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  parts.push(text.slice(last));
  return <>{parts}</>;
}

function Fold({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div {...stylex.props(styles.fold, open && styles.foldOpen)}>
      <div {...stylex.props(styles.foldInner)}>{children}</div>
    </div>
  );
}

function GroupBody({
  group,
  index,
  open,
  onToggle,
}: {
  group: CatalogGroup;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const baseId = useId();
  const introId = `${baseId}-intro`;
  const rowId = (itemIndex: number) => `${baseId}-row-${itemIndex}`;
  const controlled = [
    ...(group.intro ? [introId] : []),
    ...group.items.map((_, itemIndex) => rowId(itemIndex)),
  ].join(" ");
  const preview = group.items.map((item) => splitTitle(item.title).primary).join("、");
  const hiddenWhenClosed = open ? undefined : true;

  return (
    <tbody {...stylex.props(styles.tbody)}>
      <tr {...stylex.props(styles.groupRow)}>
        <th
          scope="rowgroup"
          colSpan={3}
          {...stylex.props(styles.groupCell, index === 0 && styles.groupCellFirst)}
        >
          <button
            type="button"
            aria-expanded={open}
            aria-controls={controlled}
            onClick={onToggle}
            {...stylex.props(styles.groupButton)}
          >
            <span
              aria-hidden="true"
              {...stylex.props(styles.groupIndex, open && styles.groupIndexOpen)}
            >
              {padIndex(index)}
            </span>
            <span {...stylex.props(styles.groupName)}>
              <span {...stylex.props(styles.groupLabel)}>{group.label}</span>
              <span {...stylex.props(styles.groupCount)}>{group.items.length} 款</span>
            </span>
            <span
              aria-hidden="true"
              {...stylex.props(styles.groupPreview, open && styles.groupPreviewHidden)}
            >
              {preview}
            </span>
            <span
              aria-hidden="true"
              {...stylex.props(styles.groupIcon, open && styles.groupIconOpen)}
            >
              <ChevronDown size={18} strokeWidth={1.5} absoluteStrokeWidth />
            </span>
          </button>
        </th>
      </tr>
      {group.intro && (
        <tr id={introId} aria-hidden={hiddenWhenClosed} {...stylex.props(styles.introRow)}>
          <td colSpan={3} {...stylex.props(styles.introCell)}>
            <Fold open={open}>
              <div {...stylex.props(styles.introPad)}>
                <p {...stylex.props(styles.intro)}>{group.intro}</p>
              </div>
            </Fold>
          </td>
        </tr>
      )}
      {group.items.map((item, itemIndex) => {
        const { primary, secondary } = splitTitle(item.title);
        return (
          <tr
            key={item.id}
            id={rowId(itemIndex)}
            aria-hidden={hiddenWhenClosed}
            {...stylex.props(styles.itemRow)}
          >
            <th scope="row" {...stylex.props(styles.cell, styles.nameCell)}>
              <Fold open={open}>
                <div {...stylex.props(styles.namePad)}>
                  <span {...stylex.props(styles.namePrimary)}>{primary}</span>
                  {secondary && <span {...stylex.props(styles.nameSecondary)}>{secondary}</span>}
                </div>
              </Fold>
            </th>
            <td {...stylex.props(styles.cell)}>
              <Fold open={open}>
                <div {...stylex.props(styles.inciPad)}>
                  <p {...stylex.props(styles.inci)}>
                    <span aria-hidden="true" {...stylex.props(styles.inciTag)}>
                      INCI
                    </span>
                    <Inci text={item.inci} />
                  </p>
                </div>
              </Fold>
            </td>
            <td {...stylex.props(styles.cell)}>
              <Fold open={open}>
                <div {...stylex.props(styles.featuresPad)}>
                  <p {...stylex.props(styles.features)}>{item.features}</p>
                </div>
              </Fold>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export function Catalog() {
  const headingId = useId();
  const tableId = useId();
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(
    () => new Set(ALL_GROUP_IDS.slice(0, 1)),
  );
  const allOpen = ALL_GROUP_IDS.every((id) => openIds.has(id));

  const toggleGroup = (id: string) => {
    setOpenIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setOpenIds(allOpen ? new Set() : new Set(ALL_GROUP_IDS));
  };

  return (
    <section id="products-catalog" aria-labelledby={headingId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={headingId} {...stylex.props(styles.title)}>
            产品目录
          </h2>
          <p {...stylex.props(styles.lead)}>精选个人护理全形态天然油脂与经典功效配方方案</p>
        </header>
        <div {...stylex.props(styles.toolbar)}>
          <span {...stylex.props(styles.meta)}>
            {CATALOG_GROUPS.length} 个分类 · {TOTAL_ITEMS} 款原料
          </span>
          <button
            type="button"
            aria-controls={tableId}
            onClick={toggleAll}
            {...stylex.props(styles.toggleAll)}
          >
            {allOpen ? (
              <ChevronsDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            ) : (
              <ChevronsUpDown size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
            )}
            {allOpen ? "收起全部" : "展开全部"}
          </button>
        </div>
        <div {...stylex.props(styles.frame)}>
          <table id={tableId} aria-labelledby={headingId} {...stylex.props(styles.table)}>
            <colgroup {...stylex.props(styles.colgroup)}>
              <col {...stylex.props(styles.colName)} />
              <col {...stylex.props(styles.colInci)} />
              <col {...stylex.props(styles.colFeatures)} />
            </colgroup>
            <thead {...stylex.props(styles.thead)}>
              <tr>
                <th scope="col" {...stylex.props(styles.columnHead, styles.columnHeadFirst)}>
                  名称
                </th>
                <th scope="col" {...stylex.props(styles.columnHead)}>
                  INCI 名称
                </th>
                <th scope="col" {...stylex.props(styles.columnHead)}>
                  特性&amp;应用
                </th>
              </tr>
            </thead>
            {CATALOG_GROUPS.map((group, index) => (
              <GroupBody
                key={group.id}
                group={group}
                index={index}
                open={openIds.has(group.id)}
                onToggle={() => toggleGroup(group.id)}
              />
            ))}
          </table>
        </div>
      </div>
    </section>
  );
}
