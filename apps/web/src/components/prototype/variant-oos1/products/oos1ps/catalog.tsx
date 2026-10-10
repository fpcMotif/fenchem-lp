import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Check } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useId, useState } from "react";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, ITEM_BY_ID, padIndex, type FlatItem } from "../shared/derived";
import { CompareStrip } from "./compare-strip";
import { Inci } from "./inci";
import { catalogTone, font, ink, layout, mq } from "./theme.stylex";

const MAX_COMPARE = 3;
const MD = breakpoints.md;
const DESKTOP = breakpoints.xl;
const HEADER_HEIGHT = 80;
const LIMIT_HINT = `最多对比 ${MAX_COMPARE} 款`;

const GROUPS = CATALOG_GROUPS.map((group, index) => ({
  group,
  index,
  items: FLAT_ITEMS.filter((item) => item.group.id === group.id),
}));

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: catalogTone.ground,
    color: ink.primary,
    fontFamily: font.body,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [mq.tablet]: 40, [DESKTOP]: layout.inset },
  },
  head: {
    display: "flex",
    flexDirection: { default: "column", [MD]: "row" },
    alignItems: { default: "flex-start", [MD]: "baseline" },
    justifyContent: "space-between",
    gap: { default: 8, [MD]: 24 },
    marginBottom: { default: 32, [DESKTOP]: 48 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [mq.tablet]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [mq.tablet]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: ink.primary,
  },
  meta: {
    margin: 0,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: ink.muted,
    fontVariantNumeric: "tabular-nums",
  },
  metaCount: {
    fontFamily: font.numeral,
    fontWeight: 500,
    color: ink.primary,
  },
  metaDot: {
    marginInline: 8,
  },
  table: {
    display: { default: "block", [MD]: "table" },
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
    borderTopWidth: { default: 1, [MD]: 0 },
    borderTopStyle: "solid",
    borderTopColor: ink.primary,
  },
  colCheck: { width: { default: "auto", [MD]: 76, [DESKTOP]: 84 } },
  colName: { width: { default: "auto", [MD]: "24%" } },
  colInci: { width: { default: "auto", [MD]: "29%" } },
  thead: {
    display: { default: "block", [MD]: "table-header-group" },
    position: { default: "absolute", [MD]: "static" },
    width: { default: 1, [MD]: "auto" },
    height: { default: 1, [MD]: "auto" },
    overflow: { default: "hidden", [MD]: "visible" },
    clipPath: { default: "inset(50%)", [MD]: "none" },
    whiteSpace: "nowrap",
  },
  headCell: {
    position: { default: "static", [MD]: "sticky" },
    top: HEADER_HEIGHT,
    zIndex: 2,
    paddingTop: 14,
    paddingBottom: 14,
    paddingInlineStart: 0,
    paddingInlineEnd: 24,
    backgroundColor: catalogTone.ground,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: ink.primary,
    boxShadow: "inset 0 -1px 0 #efdfd9",
    textAlign: "start",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: ink.muted,
  },
  headCellFirst: {
    paddingInlineStart: 12,
    paddingInlineEnd: 0,
  },
  headCellLast: {
    paddingInlineEnd: 12,
  },
  tbody: {
    display: { default: "block", [MD]: "table-row-group" },
  },
  groupRow: {
    display: { default: "grid", [MD]: "table-row" },
    gridTemplateColumns: "44px minmax(0, 1fr)",
    rowGap: 8,
    paddingTop: { default: 40, [MD]: 0 },
    paddingBottom: { default: 14, [MD]: 0 },
    paddingInline: { default: 8, [MD]: 0 },
    borderBottomWidth: { default: 1, [MD]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: ink.primary,
  },
  groupRowFirst: {
    paddingTop: { default: 24, [MD]: 0 },
  },
  groupCell: {
    display: { default: "block", [MD]: "table-cell" },
    paddingTop: { default: 0, [MD]: 48 },
    paddingBottom: { default: 0, [MD]: 14 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [MD]: 24 },
    borderBottomWidth: { default: 0, [MD]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: ink.primary,
    verticalAlign: "top",
    textAlign: "start",
    fontWeight: 400,
  },
  groupCellFirst: {
    paddingTop: { default: 0, [MD]: 32 },
  },
  groupIndexCell: {
    gridColumn: "1",
    gridRow: "1",
    paddingInlineStart: { default: 0, [MD]: 12 },
    fontFamily: font.numeral,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ink.muted,
  },
  groupLabelCell: {
    gridColumn: "2",
    gridRow: "1",
  },
  groupIntroCell: {
    gridColumn: "2",
    gridRow: "2",
    paddingInlineEnd: { default: 0, [MD]: 12 },
  },
  groupLabel: {
    display: "block",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: ink.primary,
  },
  groupCount: {
    display: "block",
    marginTop: 2,
    fontSize: 13,
    lineHeight: "20px",
    color: ink.muted,
    fontVariantNumeric: "tabular-nums",
  },
  groupIntro: {
    margin: 0,
    maxWidth: "40em",
    fontSize: 14,
    lineHeight: "24px",
    color: ink.body,
    textWrap: "pretty",
  },
  itemRow: {
    display: { default: "grid", [MD]: "table-row" },
    gridTemplateColumns: "44px minmax(0, 1fr)",
    paddingBlock: { default: 16, [MD]: 0 },
    paddingInline: { default: 8, [MD]: 0 },
    borderBottomWidth: { default: 1, [MD]: 0 },
    borderBottomStyle: "solid",
    borderBottomColor: catalogTone.rule,
    backgroundColor: "transparent",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  itemRowSelected: {
    backgroundColor: catalogTone.selected,
  },
  cell: {
    display: { default: "block", [MD]: "table-cell" },
    gridColumn: "2",
    minWidth: 0,
    paddingTop: { default: 0, [MD]: 16 },
    paddingBottom: { default: 0, [MD]: 16 },
    paddingInlineStart: 0,
    paddingInlineEnd: { default: 0, [MD]: 24 },
    borderBottomWidth: { default: 0, [MD]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: catalogTone.rule,
    verticalAlign: "baseline",
    textAlign: "start",
    fontWeight: 400,
  },
  cellLast: {
    paddingInlineEnd: { default: 0, [MD]: 12 },
  },
  checkCell: {
    gridColumn: "1",
    gridRow: "1 / span 3",
    paddingInlineStart: { default: 0, [MD]: 12 },
    paddingInlineEnd: 0,
    verticalAlign: "top",
  },
  checkHit: {
    display: "flex",
    alignItems: "center",
    width: 44,
    height: 44,
    marginTop: -10,
    marginInlineStart: { default: -2, [MD]: 0 },
    cursor: "pointer",
  },
  checkHitDisabled: {
    cursor: "not-allowed",
  },
  checkBox: {
    position: "relative",
    display: "block",
    flexShrink: 0,
    width: 18,
    height: 18,
  },
  checkInput: {
    appearance: "none",
    position: "absolute",
    inset: 0,
    width: 18,
    height: 18,
    margin: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: catalogTone.boxRule, ":hover": colors.brandBlue700 },
    borderRadius: 3,
    backgroundColor: "#ffffff",
    cursor: "inherit",
    transitionProperty: "background-color, border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 3,
  },
  checkInputChecked: {
    borderColor: { default: colors.brandGreen700, ":hover": colors.brandBlue700 },
    backgroundColor: { default: colors.brandGreen700, ":hover": colors.brandBlue700 },
  },
  checkInputDisabled: {
    borderColor: { default: catalogTone.boxDisabledRule, ":hover": catalogTone.boxDisabledRule },
    backgroundColor: catalogTone.boxDisabled,
  },
  checkMark: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    pointerEvents: "none",
  },
  namePrimary: {
    display: "block",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: ink.primary,
  },
  nameSecondary: {
    display: "block",
    fontSize: 13,
    lineHeight: "20px",
    color: ink.muted,
  },
  inci: {
    marginTop: { default: 4, [MD]: 0 },
    fontSize: 13,
    lineHeight: "22px",
    color: ink.muted,
    overflowWrap: "anywhere",
  },
  features: {
    marginTop: { default: 8, [MD]: 0 },
    fontSize: 14,
    lineHeight: "24px",
    color: ink.body,
    textWrap: "pretty",
  },
  srOnly: {
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

function CompareCheckbox({
  item,
  inputId,
  checked,
  disabled,
  hintId,
  onToggle,
}: {
  item: FlatItem;
  inputId: string;
  checked: boolean;
  disabled: boolean;
  hintId: string;
  onToggle: () => void;
}) {
  return (
    <label
      title={disabled ? LIMIT_HINT : undefined}
      {...stylex.props(styles.checkHit, disabled && styles.checkHitDisabled)}
    >
      <span {...stylex.props(styles.checkBox)}>
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onToggle}
          aria-label={`Add to comparison: ${item.englishName}`}
          aria-describedby={disabled ? hintId : undefined}
          {...stylex.props(
            styles.checkInput,
            checked && styles.checkInputChecked,
            disabled && styles.checkInputDisabled,
          )}
        />
        {checked && (
          <span aria-hidden="true" {...stylex.props(styles.checkMark)}>
            <Check size={13} strokeWidth={2.25} absoluteStrokeWidth />
          </span>
        )}
      </span>
    </label>
  );
}

function ItemRow({
  item,
  inputId,
  checked,
  disabled,
  hintId,
  onToggle,
}: {
  item: FlatItem;
  inputId: string;
  checked: boolean;
  disabled: boolean;
  hintId: string;
  onToggle: () => void;
}) {
  return (
    <tr {...stylex.props(styles.itemRow, checked && styles.itemRowSelected)}>
      <td {...stylex.props(styles.cell, styles.checkCell)}>
        <CompareCheckbox
          item={item}
          inputId={inputId}
          checked={checked}
          disabled={disabled}
          hintId={hintId}
          onToggle={onToggle}
        />
      </td>
      <th scope="row" {...stylex.props(styles.cell)}>
        <span {...stylex.props(styles.namePrimary)}>{item.primary}</span>
        {item.secondary && <span {...stylex.props(styles.nameSecondary)}>{item.secondary}</span>}
      </th>
      <td {...stylex.props(styles.cell, styles.inci)}>
        <Inci text={item.inci} />
      </td>
      <td {...stylex.props(styles.cell, styles.cellLast, styles.features)}>{item.features}</td>
    </tr>
  );
}

export function Catalog() {
  const titleId = useId();
  const metaId = useId();
  const hintId = useId();
  const inputBase = useId();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedIdSet = new Set(selectedIds);
  const [announcement, setAnnouncement] = useState("");

  const inputIdFor = (itemId: string) => `${inputBase}-${itemId}`;
  const selectedItems = selectedIds.flatMap((id) => {
    const item = ITEM_BY_ID[id];
    return item ? [item] : [];
  });
  const full = selectedIds.length >= MAX_COMPARE;

  const announce = (lead: string, count: number) => {
    setAnnouncement(
      count === 0
        ? `${lead}, comparison list cleared`
        : `${lead}, comparison list ${count} / ${MAX_COMPARE} items`,
    );
  };

  const toggleItem = (item: FlatItem) => {
    if (selectedIds.includes(item.id)) {
      const next = selectedIds.filter((id) => id !== item.id);
      setSelectedIds(next);
      announce(`Removed from comparison: ${item.englishName}`, next.length);
      return;
    }
    if (full) return;
    const next = [...selectedIds, item.id];
    setSelectedIds(next);
    announce(`Added to comparison: ${item.englishName}`, next.length);
  };

  const removeItem = (item: FlatItem) => {
    const next = selectedIds.filter((id) => id !== item.id);
    setSelectedIds(next);
    announce(`Removed from comparison: ${item.englishName}`, next.length);
    if (next.length === 0) document.getElementById(inputIdFor(item.id))?.focus();
  };

  const clearAll = () => {
    const first = selectedIds[0];
    setSelectedIds([]);
    setAnnouncement("Comparison list cleared");
    if (first) document.getElementById(inputIdFor(first))?.focus();
  };

  return (
    <section
      id="products-catalog"
      aria-labelledby={titleId}
      lang="zh-CN"
      {...stylex.props(styles.section)}
    >
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            产品目录
          </h2>
          <p id={metaId} {...stylex.props(styles.meta)}>
            <span {...stylex.props(styles.metaCount)}>{FLAT_ITEMS.length}</span> 款原料
            <span aria-hidden="true" {...stylex.props(styles.metaDot)}>
              ·
            </span>
            勾选最多 {MAX_COMPARE} 款加入对比
          </p>
        </header>
        <table aria-labelledby={titleId} aria-describedby={metaId} {...stylex.props(styles.table)}>
          <colgroup>
            <col {...stylex.props(styles.colCheck)} />
            <col {...stylex.props(styles.colName)} />
            <col {...stylex.props(styles.colInci)} />
            <col />
          </colgroup>
          <thead {...stylex.props(styles.thead)}>
            <tr>
              <th
                scope="col"

                {...stylex.props(styles.headCell, styles.headCellFirst)}
              >
                <span aria-hidden="true">加入对比</span>
                <span {...stylex.props(styles.srOnly)}>Add to comparison</span>
              </th>
              <th scope="col" {...stylex.props(styles.headCell)}>
                <span aria-hidden="true">名称</span>
                <span {...stylex.props(styles.srOnly)}>Name</span>
              </th>
              <th scope="col" {...stylex.props(styles.headCell)}>
                <span aria-hidden="true">INCI 名称</span>
                <span {...stylex.props(styles.srOnly)}>INCI name</span>
              </th>
              <th
                scope="col"

                {...stylex.props(styles.headCell, styles.headCellLast)}
              >
                <span aria-hidden="true">特性&应用</span>
                <span {...stylex.props(styles.srOnly)}>Features & applications</span>
              </th>
            </tr>
          </thead>
          {GROUPS.map(({ group, index, items }) => {
            const first = index === 0;
            return (
              <tbody key={group.id} {...stylex.props(styles.tbody)}>
                <tr {...stylex.props(styles.groupRow, first && styles.groupRowFirst)}>
                  <td
                    {...stylex.props(
                      styles.groupCell,
                      first && styles.groupCellFirst,
                      styles.groupIndexCell,
                    )}
                  >
                    <span aria-hidden="true">{padIndex(index)}</span>
                  </td>
                  <th
                    scope="rowgroup"

                    colSpan={group.intro ? 1 : 3}
                    {...stylex.props(
                      styles.groupCell,
                      first && styles.groupCellFirst,
                      styles.groupLabelCell,
                    )}
                  >
                    <span {...stylex.props(styles.groupLabel)}>{group.label}</span>
                    <span {...stylex.props(styles.groupCount)}>{items.length} 款</span>
                  </th>
                  {group.intro && (
                    <td
                      colSpan={2}
                      {...stylex.props(
                        styles.groupCell,
                        first && styles.groupCellFirst,
                        styles.groupIntroCell,
                      )}
                    >
                      <p {...stylex.props(styles.groupIntro)}>{group.intro}</p>
                    </td>
                  )}
                </tr>
                {items.map((item) => {
                  const checked = selectedIdSet.has(item.id);
                  return (
                    <ItemRow
                      key={item.id}
                      item={item}
                      inputId={inputIdFor(item.id)}
                      checked={checked}
                      disabled={full && !checked}
                      hintId={hintId}
                      onToggle={() => toggleItem(item)}
                    />
                  );
                })}
              </tbody>
            );
          })}
        </table>
      </div>
      <AnimatePresence initial={false}>
        {selectedItems.length > 0 && (
          <CompareStrip
            key="compare-strip"
            items={selectedItems}
            max={MAX_COMPARE}
            hintId={hintId}
            limitHint={LIMIT_HINT}
            onRemove={removeItem}
            onClear={clearAll}
          />
        )}
      </AnimatePresence>
      <p aria-live="polite" aria-atomic="true" {...stylex.props(styles.srOnly)}>
        {announcement}
      </p>
    </section>
  );
}
