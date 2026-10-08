import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronUp, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { REGION_META, type FlatItem } from "../shared/derived";
import { Inci } from "./inci";
import { catalogTone, font, ink, layout, mq } from "./theme.stylex";

const MD = breakpoints.md;
const DESKTOP = breakpoints.xl;
const BAR_HEIGHT = 64;

interface CompareRow {
  label: string;
  render: (item: FlatItem) => ReactNode;
}

const originOf = (item: FlatItem) => {
  const meta = REGION_META[item.group.id];
  return meta && meta.latitude !== null ? meta.short : null;
};

const styles = stylex.create({
  strip: {
    position: "sticky",
    bottom: 0,
    zIndex: 20,
    marginTop: { default: 32, [MD]: 40 },
    backgroundColor: catalogTone.strip,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: catalogTone.stripRule,
    boxShadow: "0 -10px 24px -20px rgba(26, 26, 26, 0.28)",
    color: ink.primary,
  },
  shell: {
    width: "100%",
    maxWidth: 1440,
    marginInline: "auto",
    boxSizing: "border-box",
    paddingInline: { default: 16, [mq.tablet]: 40, [DESKTOP]: layout.inset },
  },
  bar: {
    display: "flex",
    alignItems: "center",
    gap: { default: 12, [MD]: 24 },
    minHeight: BAR_HEIGHT,
    paddingBlock: 8,
    boxSizing: "border-box",
  },
  barLead: {
    display: "flex",
    flexWrap: { default: "wrap", [MD]: "nowrap" },
    alignItems: "center",
    columnGap: 16,
    rowGap: 0,
    flex: "1 1 auto",
    minWidth: 0,
  },
  barLabel: {
    display: { default: "none", [MD]: "block" },
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: ink.muted,
    whiteSpace: "nowrap",
  },
  barTitle: {
    margin: 0,
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    flexShrink: 0,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: ink.primary,
    whiteSpace: "nowrap",
  },
  barCount: {
    fontFamily: font.numeral,
    fontSize: 13,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: ink.muted,
  },
  chips: {
    display: "flex",
    gap: 8,
    flex: { default: "1 1 100%", [MD]: "0 1 auto" },
    minWidth: 0,
    margin: 0,
    paddingBlock: 6,
    paddingInline: 3,
    marginInline: -3,
    listStyleType: "none",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  chipItem: {
    flexShrink: 0,
  },
  chip: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 32,
    paddingInlineStart: 12,
    paddingInlineEnd: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: catalogTone.chipRule, ":hover": colors.brandBlue700 },
    borderRadius: 2,
    backgroundColor: "#ffffff",
    fontFamily: "inherit",
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    color: { default: ink.primary, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color, border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 1,
    "::before": {
      content: '""',
      position: "absolute",
      insetBlock: -6,
      insetInline: 0,
    },
  },
  chipIcon: {
    display: "flex",
    color: ink.muted,
  },
  hint: {
    flexBasis: { default: "100%", [MD]: "auto" },
    flexShrink: 0,
    fontSize: 12,
    lineHeight: "18px",
    letterSpacing: "0.04em",
    color: ink.muted,
    whiteSpace: "nowrap",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  },
  textButton: {
    height: 40,
    paddingInline: 12,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: ink.muted, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  toggle: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 40,
    paddingInlineStart: 16,
    paddingInlineEnd: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: colors.brandGreen700, ":hover": colors.brandBlue700 },
    borderRadius: 2,
    backgroundColor: { default: colors.brandGreen700, ":hover": colors.brandBlue700 },
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
    color: "#ffffff",
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.97)" },
    },
    transitionProperty: "background-color, border-color, color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: layout.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: 2,
  },
  toggleOpen: {
    borderColor: { default: ink.primary, ":hover": colors.brandBlue700 },
    backgroundColor: { default: "#ffffff", ":hover": "#ffffff" },
    color: { default: ink.primary, ":hover": colors.brandBlue700 },
  },
  chevron: {
    display: "flex",
  },
  panelClip: {
    overflow: "hidden",
  },
  panelScroll: {
    maxHeight: { default: "calc(70vh - 88px)", [MD]: "calc(70vh - 64px)" },
    overflowY: "auto",
    overscrollBehavior: "contain",
    paddingBottom: { default: 8, [MD]: 24 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: catalogTone.rule,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -2,
  },
  table: {
    display: { default: "none", [MD]: "table" },
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  colLabel: {
    width: { default: 104, [DESKTOP]: 120 },
  },
  rowLabel: {
    paddingBlock: 14,
    paddingInlineEnd: 16,
    verticalAlign: "baseline",
    textAlign: "start",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: ink.muted,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: catalogTone.rule,
  },
  cell: {
    position: "relative",
    paddingBlock: 14,
    paddingInline: { default: 16, [DESKTOP]: 24 },
    verticalAlign: "baseline",
    textAlign: "start",
    fontWeight: 400,
    borderInlineStartWidth: 1,
    borderInlineStartStyle: "solid",
    borderInlineStartColor: catalogTone.rule,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: catalogTone.rule,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  nameCell: {
    paddingTop: 16,
    paddingInlineEnd: 48,
  },
  namePrimary: {
    display: "block",
    fontSize: 16,
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
  emptySlot: {
    fontSize: 13,
    lineHeight: "24px",
    color: ink.muted,
  },
  remove: {
    position: "absolute",
    top: 8,
    insetInlineEnd: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    padding: 0,
    borderWidth: 0,
    borderRadius: 2,
    backgroundColor: "transparent",
    color: { default: ink.muted, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: colors.brandBlue700,
    outlineOffset: -4,
  },
  removeInline: {
    position: "static",
    flexShrink: 0,
    marginTop: -8,
    marginInlineEnd: -10,
  },
  origin: {
    fontSize: 14,
    lineHeight: "24px",
    color: ink.primary,
  },
  none: {
    fontSize: 14,
    lineHeight: "24px",
    color: ink.muted,
  },
  inci: {
    fontSize: 13,
    lineHeight: "22px",
    color: ink.muted,
    overflowWrap: "anywhere",
  },
  features: {
    fontSize: 14,
    lineHeight: "24px",
    color: ink.body,
    textWrap: "pretty",
  },
  list: {
    display: { default: "block", [MD]: "none" },
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  listItem: {
    paddingBlock: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: catalogTone.rule,
  },
  listItemLast: {
    borderBottomWidth: 0,
  },
  listHead: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  listName: {
    margin: 0,
    minWidth: 0,
  },
  facts: {
    margin: 0,
    marginTop: 8,
  },
  fact: {
    display: "grid",
    gridTemplateColumns: "72px minmax(0, 1fr)",
    columnGap: 12,
    paddingBlock: 6,
  },
  factLabel: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: ink.muted,
  },
  factValue: {
    margin: 0,
    minWidth: 0,
  },
});

const ROWS: CompareRow[] = [
  {
    label: "产地",
    render: (item) => {
      const origin = originOf(item);
      return origin ? (
        <span {...stylex.props(styles.origin)}>{origin}</span>
      ) : (
        <span {...stylex.props(styles.none)}>—</span>
      );
    },
  },
  {
    label: "INCI 名称",
    render: (item) => (
      <span {...stylex.props(styles.inci)}>
        <Inci text={item.inci} />
      </span>
    ),
  },
  {
    label: "特性&应用",
    render: (item) => <span {...stylex.props(styles.features)}>{item.features}</span>,
  },
];

function ItemName({ item }: { item: FlatItem }) {
  return (
    <>
      <span {...stylex.props(styles.namePrimary)}>{item.primary}</span>
      {item.secondary && <span {...stylex.props(styles.nameSecondary)}>{item.secondary}</span>}
    </>
  );
}

function RemoveButton({
  item,
  inline,
  onRemove,
}: {
  item: FlatItem;
  inline?: boolean;
  onRemove: (item: FlatItem) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`移除 ${item.primary}`}
      onClick={() => onRemove(item)}
      {...stylex.props(styles.remove, inline && styles.removeInline)}
    >
      <X size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
    </button>
  );
}

function CompareTable({
  slots,
  onRemove,
}: {
  slots: (FlatItem | null)[];
  onRemove: (item: FlatItem) => void;
}) {
  return (
    <table aria-label="对比详情" {...stylex.props(styles.table)}>
      <colgroup>
        <col {...stylex.props(styles.colLabel)} />
        {slots.map((_, slot) => (
          <col key={slot} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th scope="row" {...stylex.props(styles.rowLabel)}>
            名称
          </th>
          {slots.map((item, slot) =>
            item ? (
              <th key={item.id} scope="col" {...stylex.props(styles.cell, styles.nameCell)}>
                <ItemName item={item} />
                <RemoveButton item={item} onRemove={onRemove} />
              </th>
            ) : (
              <td key={`slot-${slot}`} {...stylex.props(styles.cell, styles.nameCell)}>
                <span {...stylex.props(styles.emptySlot)}>从目录勾选加入</span>
              </td>
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {ROWS.map((row, rowIndex) => {
          const last = rowIndex === ROWS.length - 1;
          return (
            <tr key={row.label}>
              <th scope="row" {...stylex.props(styles.rowLabel, last && styles.lastRow)}>
                {row.label}
              </th>
              {slots.map((item, slot) => (
                <td
                  key={item ? item.id : `slot-${slot}`}
                  {...stylex.props(styles.cell, last && styles.lastRow)}
                >
                  {item ? row.render(item) : null}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function CompareList({
  items,
  onRemove,
}: {
  items: FlatItem[];
  onRemove: (item: FlatItem) => void;
}) {
  return (
    <ol aria-label="对比详情" {...stylex.props(styles.list)}>
      {items.map((item, index) => (
        <li
          key={item.id}
          {...stylex.props(styles.listItem, index === items.length - 1 && styles.listItemLast)}
        >
          <div {...stylex.props(styles.listHead)}>
            <p {...stylex.props(styles.listName)}>
              <ItemName item={item} />
            </p>
            <RemoveButton item={item} inline onRemove={onRemove} />
          </div>
          <dl {...stylex.props(styles.facts)}>
            {ROWS.map((row) => (
              <div key={row.label} {...stylex.props(styles.fact)}>
                <dt {...stylex.props(styles.factLabel)}>{row.label}</dt>
                <dd {...stylex.props(styles.factValue)}>{row.render(item)}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ol>
  );
}

export function CompareStrip({
  items,
  max,
  hintId,
  limitHint,
  onRemove,
  onClear,
}: {
  items: FlatItem[];
  max: number;
  hintId: string;
  limitHint: string;
  onRemove: (item: FlatItem) => void;
  onClear: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false);
  const count = items.length;
  const slots = Array.from({ length: max }, (_, slot) => items[slot] ?? null);
  const transition = { duration: reduce ? 0 : 0.24, ease: EASE };

  const remove = (item: FlatItem) => {
    onRemove(item);
    if (count > 1) toggleRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || !expanded) return;
    event.stopPropagation();
    setExpanded(false);
    toggleRef.current?.focus();
  };

  return (
    <m.div
      role="region"
      aria-label="原料对比"
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={transition}
      {...stylex.props(styles.strip)}
    >
      <div {...stylex.props(styles.shell)}>
        <div {...stylex.props(styles.bar)}>
          <div {...stylex.props(styles.barLead)}>
            {expanded ? (
              <p {...stylex.props(styles.barTitle)}>
                原料对比
                <span {...stylex.props(styles.barCount)}>
                  {count} / {max}
                </span>
              </p>
            ) : (
              <>
                <span aria-hidden="true" {...stylex.props(styles.barLabel)}>
                  对比清单
                </span>
                <ul aria-label="已选原料" {...stylex.props(styles.chips)}>
                  {items.map((item) => (
                    <li key={item.id} {...stylex.props(styles.chipItem)}>
                      <button
                        type="button"
                        aria-label={`移除 ${item.primary}`}
                        onClick={() => remove(item)}
                        {...stylex.props(styles.chip)}
                      >
                        {item.primary}
                        <span aria-hidden="true" {...stylex.props(styles.chipIcon)}>
                          <X size={14} strokeWidth={1.5} absoluteStrokeWidth />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {count >= max && (
              <span id={hintId} {...stylex.props(styles.hint)}>
                {limitHint}
              </span>
            )}
          </div>
          <div {...stylex.props(styles.actions)}>
            {expanded && (
              <button type="button" onClick={onClear} {...stylex.props(styles.textButton)}>
                清除
              </button>
            )}
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={expanded}
              aria-controls={expanded ? panelId : undefined}
              onClick={() => setExpanded((open) => !open)}
              {...stylex.props(styles.toggle, expanded && styles.toggleOpen)}
            >
              {expanded ? "收起" : `对比 (${count})`}
              <m.span
                aria-hidden="true"
                initial={false}
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={transition}
                {...stylex.props(styles.chevron)}
              >
                <ChevronUp size={16} strokeWidth={1.5} absoluteStrokeWidth />
              </m.span>
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <m.div
              key="compare-panel"
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={transition}
              {...stylex.props(styles.panelClip)}
            >
              <div
                tabIndex={0}
                aria-label="对比详情"
                role="group"
                {...stylex.props(styles.panelScroll)}
              >
                <CompareTable slots={slots} onRemove={remove} />
                <CompareList items={items} onRemove={remove} />
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
}
