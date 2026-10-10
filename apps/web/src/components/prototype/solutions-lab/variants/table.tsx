import * as stylex from "@stylexjs/stylex";
import { useId, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";

import {
  AreaChips,
  LabSection,
  areaOf,
  padIndex,
  sheetRows,
  useSolutionsBrowser,
  type SheetRow,
  type SolutionItem,
} from "../kit";
import { bp, face, motion, tone } from "../tokens.stylex";

const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;
const NO_BREAK_SPACE = String.fromCharCode(0xa0);
const PREVIEW_COUNT = 3;
const COLUMN_COUNT = 5;

const HEAD_RULE = "inset 0 -1px 0 oklch(0.424 0.18 261.5 / 0.12)";
const CARD_EDGE = "inset 0 0 0 1px oklch(0.424 0.18 261.5 / 0.12)";
const CARD_OPEN_TOP = "inset 1px 0 0 #1a1a1a, inset -1px 0 0 #1a1a1a, inset 0 1px 0 #1a1a1a";
const CARD_OPEN_BOTTOM =
  "inset 1px 0 0 #1a1a1a, inset -1px 0 0 #1a1a1a, inset 0 -1px 0 #1a1a1a, inset 0 1px 0 oklch(0.424 0.18 261.5 / 0.08)";

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1], note: match[2] } : { primary: text, note: null };
};

const enter = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(-4px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

const styles = stylex.create({
  wrap: {
    marginTop: { default: 16, [bp.xl]: 24 },
    marginInline: { default: 0, [bp.md]: -16 },
    overflowAnchor: "none",
  },
  table: {
    display: { default: "block", [bp.md]: "table" },
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "collapse",
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  },
  colgroup: {
    display: { default: "none", [bp.md]: "table-column-group" },
  },
  colName: { width: "30%" },
  colFunctions: { width: "20%" },
  colIngredients: { width: "28%" },
  colToggle: { width: 48 },
  head: {
    display: { default: "none", [bp.md]: "table-header-group" },
  },
  headCell: {
    position: "sticky",
    top: 80,
    zIndex: 2,
    paddingBlock: 14,
    paddingInline: 16,
    backgroundColor: tone.paper,
    boxShadow: HEAD_RULE,
    textAlign: "start",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
    whiteSpace: "nowrap",
  },
  headName: {
    paddingInlineStart: 44,
  },
  body: {
    display: { default: "block", [bp.md]: "table-row-group" },
  },
  groupRow: {
    display: { default: "block", [bp.md]: "table-row" },
  },
  groupCell: {
    display: { default: "block", [bp.md]: "table-cell" },
    paddingTop: { default: 24, [bp.md]: 36 },
    paddingBottom: { default: 4, [bp.md]: 12 },
    paddingInline: { default: 4, [bp.md]: 16 },
    textAlign: "start",
    fontWeight: 400,
  },
  groupInner: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
  },
  groupLabel: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    color: tone.tintInk,
  },
  groupEnglish: {
    fontFamily: face.display,
    fontSize: 11,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: tone.tintMuted,
  },
  groupCount: {
    marginInlineStart: "auto",
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  row: {
    position: "relative",
    display: { default: "block", [bp.md]: "table-row" },
    marginTop: { default: 8, [bp.md]: 0 },
    paddingBlock: { default: 16, [bp.md]: 0 },
    paddingInlineStart: { default: 16, [bp.md]: 0 },
    paddingInlineEnd: { default: 48, [bp.md]: 0 },
    borderStartStartRadius: { default: 12, [bp.md]: 0 },
    borderStartEndRadius: { default: 12, [bp.md]: 0 },
    borderEndStartRadius: { default: 12, [bp.md]: 0 },
    borderEndEndRadius: { default: 12, [bp.md]: 0 },
    boxShadow: { default: CARD_EDGE, [bp.md]: "none" },
    backgroundColor: {
      default: tone.paper,
      ":hover": { default: tone.paper, [bp.hover]: tone.tintFill },
    },
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
  },
  rowOpen: {
    borderEndStartRadius: 0,
    borderEndEndRadius: 0,
    boxShadow: { default: CARD_OPEN_TOP, [bp.md]: "none" },
    backgroundColor: tone.paper,
  },
  cell: {
    display: { default: "none", [bp.md]: "table-cell" },
    paddingBlock: 18,
    paddingInline: 16,
    verticalAlign: "top",
    textAlign: "start",
    borderTopWidth: { default: 0, [bp.md]: 1 },
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "22px",
    color: tone.tintBody,
  },
  cellFlush: {
    borderTopWidth: 0,
  },
  cellOpen: {
    borderTopColor: tone.ink,
    color: tone.ink,
  },
  nameCell: {
    display: { default: "block", [bp.md]: "table-cell" },
    paddingBlock: { default: 0, [bp.md]: 18 },
    paddingInline: { default: 0, [bp.md]: 16 },
  },
  toggleCell: {
    display: { default: "block", [bp.md]: "table-cell" },
    position: { default: "absolute", [bp.md]: "static" },
    top: { default: 16, [bp.md]: null },
    right: { default: 16, [bp.md]: null },
    paddingBlock: { default: 0, [bp.md]: 18 },
    paddingInline: { default: 0, [bp.md]: 16 },
    textAlign: "center",
  },
  chevron: {
    display: "inline-block",
    fontSize: 11,
    lineHeight: "22px",
    color: tone.tintMuted,
    transform: "rotate(-90deg)",
    transformOrigin: "50% 50%",
    transitionProperty: "transform, color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "180ms" },
    transitionTimingFunction: motion.easeOut,
  },
  chevronOpen: {
    color: tone.ink,
    transform: "rotate(0deg)",
  },
  trigger: {
    display: "grid",
    gridTemplateColumns: "28px minmax(0, 1fr)",
    alignItems: "baseline",
    width: "100%",
    padding: 0,
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: "inherit",
    cursor: "pointer",
    scrollMarginTop: 140,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 4,
  },
  index: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  indexOpen: {
    color: tone.ink,
  },
  nameStack: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  name: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: {
      default: tone.tintInk,
      [stylex.when.ancestor(":hover")]: { default: tone.tintInk, [bp.hover]: tone.accent },
    },
    textWrap: "pretty",
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
  },
  nameOpen: {
    color: tone.ink,
  },
  mobileMeta: {
    display: { default: "block", [bp.md]: "none" },
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    color: tone.tintMuted,
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  more: {
    fontSize: 13,
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  detailRow: {
    display: { default: "block", [bp.md]: "table-row" },
    borderEndStartRadius: { default: 12, [bp.md]: 0 },
    borderEndEndRadius: { default: 12, [bp.md]: 0 },
    boxShadow: { default: CARD_OPEN_BOTTOM, [bp.md]: "none" },
    backgroundColor: tone.paper,
  },
  detailCell: {
    display: { default: "block", [bp.md]: "table-cell" },
    paddingBlock: 0,
    paddingInline: 16,
    verticalAlign: "top",
    textAlign: "start",
    borderBottomWidth: { default: 0, [bp.md]: 1 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.ink,
  },
  detail: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.md]: "repeat(2, minmax(0, 1fr))",
      [bp.lg]: "repeat(3, minmax(0, 1fr))",
    },
    columnGap: 40,
    rowGap: 24,
    paddingTop: { default: 16, [bp.md]: 4 },
    paddingBottom: { default: 20, [bp.md]: 32 },
    paddingInlineStart: { default: 0, [bp.md]: 28 },
    animationName: { default: "none", [bp.motionOk]: enter },
    animationDuration: "180ms",
    animationTimingFunction: motion.easeOut,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    minWidth: 0,
    margin: 0,
  },
  areaLine: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  areaEnglish: {
    fontFamily: face.display,
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
  subtitle: {
    margin: 0,
    marginTop: -10,
    fontSize: 15,
    lineHeight: "24px",
    color: tone.tintInk,
    textWrap: "pretty",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  fieldMobile: {
    display: { default: "flex", [bp.md]: "none" },
  },
  fieldLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 14,
    lineHeight: "22px",
    color: tone.tintInk,
    textWrap: "pretty",
  },
  fieldLines: {
    gap: 4,
  },
  description: {
    color: tone.tintBody,
  },
  strong: {
    fontWeight: 500,
  },
  absent: {
    color: tone.tintMuted,
  },
  keepWords: {
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
  note: {
    marginInlineStart: 6,
    fontSize: 13,
    color: tone.tintMuted,
  },
});

function FieldValue({ row }: { row: SheetRow }) {
  if (row.values.length === 0) return <span {...stylex.props(styles.absent)}>无</span>;
  if (row.kind === "lines") {
    return (
      <ul {...stylex.props(styles.lines, styles.fieldLines, styles.description)}>
        {row.values.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    );
  }
  if (row.kind === "strong") {
    return <span {...stylex.props(styles.strong)}>{row.values.join(" · ")}</span>;
  }
  if (row.kind === "list") {
    return (
      <ul {...stylex.props(styles.lines, styles.fieldLines)}>
        {row.values.map((entry) => {
          const { primary, note } = splitNote(entry);
          return (
            <li key={entry} {...stylex.props(styles.keepWords)}>
              <span {...stylex.props(styles.strong)}>
                {primary.replaceAll(" / ", `${NO_BREAK_SPACE}/ `)}
              </span>
              {note && <span {...stylex.props(styles.note)}>{note}</span>}
            </li>
          );
        })}
      </ul>
    );
  }
  return <>{row.values.join("、")}</>;
}

function Field({ row, mobileOnly = false }: { row: SheetRow; mobileOnly?: boolean }) {
  return (
    <div {...stylex.props(styles.field, mobileOnly && styles.fieldMobile)}>
      <dt {...stylex.props(styles.fieldLabel)}>{row.label}</dt>
      <dd {...stylex.props(styles.fieldValue)}>
        <FieldValue row={row} />
      </dd>
    </div>
  );
}

function Detail({ item }: { item: SolutionItem }) {
  const [overview, , challenges, ingredients, texture, applications] = sheetRows(item);
  const area = areaOf(item.area);
  return (
    <div {...stylex.props(styles.detail)}>
      <div {...stylex.props(styles.column)}>
        {area && (
          <p {...stylex.props(styles.areaLine)}>
            <span>{area.label}</span>
            <span lang="en" {...stylex.props(styles.areaEnglish)}>
              {area.englishLabel}
            </span>
          </p>
        )}
        <p {...stylex.props(styles.subtitle)}>{item.subtitle}</p>
        <dl {...stylex.props(styles.column)}>
          <Field row={overview} />
        </dl>
      </div>
      <dl {...stylex.props(styles.column)}>
        <Field row={ingredients} />
      </dl>
      <dl {...stylex.props(styles.column)}>
        <Field row={challenges} />
        <Field row={applications} />
        <Field row={texture} mobileOnly />
      </dl>
    </div>
  );
}

function Lines({ values }: { values: string[] }) {
  return (
    <ul {...stylex.props(styles.lines)}>
      {values.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>
  );
}

function SolutionRow({
  item,
  index,
  open,
  flush,
  detailId,
  onToggle,
}: {
  item: SolutionItem;
  index: number;
  open: boolean;
  flush: boolean;
  detailId: string;
  onToggle: (row: HTMLElement) => void;
}) {
  const extra = item.keyIngredients.length - PREVIEW_COUNT;
  const cellState = [flush && !open && styles.cellFlush, open && styles.cellOpen];

  return (
    <>
      <tr
        onClick={(event) => onToggle(event.currentTarget)}
        {...stylex.props(styles.row, open && styles.rowOpen, stylex.defaultMarker())}
      >
        <th scope="row" {...stylex.props(styles.cell, styles.nameCell, cellState)}>
          <button
            type="button"
            data-row-trigger=""
            aria-expanded={open}
            aria-controls={open ? detailId : undefined}
            {...stylex.props(styles.trigger)}
          >
            <span {...stylex.props(styles.index, open && styles.indexOpen)}>{padIndex(index)}</span>
            <span {...stylex.props(styles.nameStack)}>
              <span {...stylex.props(styles.name, open && styles.nameOpen)}>{item.title}</span>
              <span {...stylex.props(styles.mobileMeta)}>{item.functions.join(" · ")}</span>
            </span>
          </button>
        </th>
        <td {...stylex.props(styles.cell, cellState)}>
          <Lines values={item.functions} />
        </td>
        <td {...stylex.props(styles.cell, cellState)}>
          <ul {...stylex.props(styles.lines)}>
            {item.keyIngredients.slice(0, PREVIEW_COUNT).map((entry) => (
              <li key={entry} {...stylex.props(styles.keepWords)}>
                {splitNote(entry).primary}
              </li>
            ))}
            {extra > 0 && (
              <li {...stylex.props(styles.more)}>
                <span aria-hidden="true">+{extra}</span>
                <span {...stylex.props(styles.srOnly)}>另有 {extra} 项</span>
              </li>
            )}
          </ul>
        </td>
        <td {...stylex.props(styles.cell, cellState)}>
          <Lines values={item.texture} />
        </td>
        <td aria-hidden="true" {...stylex.props(styles.cell, styles.toggleCell, cellState)}>
          <span {...stylex.props(styles.chevron, open && styles.chevronOpen)}>▾</span>
        </td>
      </tr>
      {open && (
        <tr id={detailId} {...stylex.props(styles.detailRow)}>
          <td colSpan={COLUMN_COUNT} {...stylex.props(styles.detailCell)}>
            <Detail item={item} />
          </td>
        </tr>
      )}
    </>
  );
}

export function TableVariant() {
  const browser = useSolutionsBrowser();
  const { area, scope, groups } = browser;
  const uid = useId();
  const [openId, setOpenId] = useState<string | null>(() => scope[0]?.id ?? null);
  const [shownArea, setShownArea] = useState(area);
  const grouped = area === "all";

  if (shownArea !== area) {
    setShownArea(area);
    setOpenId(scope[0]?.id ?? null);
  }

  const toggle = (id: string, row: HTMLElement) => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && row.contains(selection.anchorNode)) return;
    const top = row.getBoundingClientRect().top;
    flushSync(() => setOpenId((current) => (current === id ? null : id)));
    const shift = row.getBoundingClientRect().top - top;
    if (shift !== 0) window.scrollBy({ top: shift, behavior: "instant" });
  };

  const moveFocus = (event: KeyboardEvent<HTMLTableElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const triggers = [
      ...event.currentTarget.querySelectorAll<HTMLButtonElement>("button[data-row-trigger]"),
    ];
    const current = triggers.indexOf(event.target as HTMLButtonElement);
    if (current === -1) return;
    event.preventDefault();
    triggers[current + (event.key === "ArrowDown" ? 1 : -1)]?.focus();
  };

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <div {...stylex.props(styles.wrap)}>
        <table onKeyDown={moveFocus} {...stylex.props(styles.table)}>
          <caption {...stylex.props(styles.srOnly)}>应用方案对比</caption>
          <colgroup {...stylex.props(styles.colgroup)}>
            <col {...stylex.props(styles.colName)} />
            <col {...stylex.props(styles.colFunctions)} />
            <col {...stylex.props(styles.colIngredients)} />
            <col />
            <col {...stylex.props(styles.colToggle)} />
          </colgroup>
          <thead {...stylex.props(styles.head)}>
            <tr>
              <th scope="col" {...stylex.props(styles.headCell, styles.headName)}>
                方案
              </th>
              <th scope="col" {...stylex.props(styles.headCell)}>
                功能
              </th>
              <th scope="col" {...stylex.props(styles.headCell)}>
                核心成分
              </th>
              <th scope="col" {...stylex.props(styles.headCell)}>
                质地
              </th>
              <td aria-hidden="true" {...stylex.props(styles.headCell)} />
            </tr>
          </thead>
          {groups.map((group) => (
            <tbody key={group.id} {...stylex.props(styles.body)}>
              {grouped && (
                <tr {...stylex.props(styles.groupRow)}>
                  <th scope="rowgroup" colSpan={COLUMN_COUNT} {...stylex.props(styles.groupCell)}>
                    <span {...stylex.props(styles.groupInner)}>
                      <span {...stylex.props(styles.groupLabel)}>{group.label}</span>
                      <span lang="en" {...stylex.props(styles.groupEnglish)}>
                        {group.englishLabel}
                      </span>
                      <span {...stylex.props(styles.groupCount)}>{group.items.length} 款</span>
                    </span>
                  </th>
                </tr>
              )}
              {group.items.map((item, index) => (
                <SolutionRow
                  key={item.id}
                  item={item}
                  index={index}
                  open={item.id === openId}
                  flush={!grouped && index === 0}
                  detailId={`${uid}-${item.id}`}
                  onToggle={(row) => toggle(item.id, row)}
                />
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </LabSection>
  );
}
