import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Plus, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useId, useState, type ReactNode } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { CATALOG_GROUPS } from "../../products-data";
import { FLAT_ITEMS, FUNCTION_TAGS, type FlatItem, type FunctionTag } from "../shared/derived";
import { frame } from "./frame";
import { font, ink, layout, matrix, mq } from "./theme.stylex";

const LG = breakpoints.lg;
const MD_ONLY = mq.mdOnly;
const EDGE = { default: 16, [MD_ONLY]: 40, [LG]: 16 } as const;
const COLUMN_COUNT = FUNCTION_TAGS.length + 1;

const GROUP_ROWS = CATALOG_GROUPS.map((group) => ({
  group,
  items: FLAT_ITEMS.filter((item) => item.group.id === group.id),
}));

const hasTag = (item: FlatItem, tag: FunctionTag) => item.traits.tags.includes(tag);

const TAG_TOTALS = new Map(
  FUNCTION_TAGS.map((tag) => [tag, FLAT_ITEMS.filter((item) => hasTag(item, tag)).length]),
);

const stackedLabel = (tag: string) => (tag.length === 4 ? [tag.slice(0, 2), tag.slice(2)] : [tag]);

const INCI_LATIN = /（[^）]*）/g;

const styles = stylex.create({
  ground: {
    backgroundColor: matrix.ground,
  },
  head: {
    marginBottom: { default: 24, [breakpoints.xl]: 32 },
  },
  note: {
    margin: 0,
    marginTop: 8,
    fontSize: 13,
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: ink.muted,
  },
  status: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    minHeight: 40,
    marginBottom: 8,
  },
  statusText: {
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.04em",
    color: ink.primary,
  },
  statusDivider: {
    marginInline: 8,
    color: ink.muted,
  },
  numeral: {
    fontFamily: font.numeral,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
  },
  statusUnit: {
    marginInlineStart: 4,
  },
  hint: {
    fontSize: 13,
    lineHeight: "20px",
    color: ink.muted,
    textAlign: "end",
  },
  clear: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    minHeight: 40,
    paddingInline: 8,
    marginInlineEnd: -8,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    color: { default: ink.body, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineOffset: -2,
  },
  scroller: {
    position: "relative",
    marginInline: { default: -16, [MD_ONLY]: -40, [LG]: -16 },
    overflowX: { default: "auto", [LG]: "visible" },
    overscrollBehaviorX: "contain",
    containerType: { default: "inline-size", [LG]: "normal" },
  },
  table: {
    width: { default: "max(100%, 740px)", [MD_ONLY]: "max(100%, 836px)", [LG]: "100%" },
    tableLayout: "fixed",
    borderCollapse: "separate",
    borderSpacing: 0,
  },
  nameCol: {
    width: { default: 168, [MD_ONLY]: 220, [LG]: "27%" },
  },
  tagCol: {
    width: { default: 52, [MD_ONLY]: 56, [LG]: "auto" },
  },
  headCell: {
    padding: 0,
    verticalAlign: "bottom",
    backgroundColor: matrix.ground,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: ink.primary,
    fontWeight: 500,
    position: { default: "static", [LG]: "sticky" },
    top: { default: "auto", [LG]: 80 },
    zIndex: 2,
  },
  nameHead: {
    position: "sticky",
    insetInlineStart: { default: 0, [LG]: "auto" },
    zIndex: 3,
    paddingBlock: 12,
    paddingInlineStart: EDGE,
    textAlign: "start",
    fontSize: 13,
    lineHeight: "18px",
    letterSpacing: "0.04em",
    color: ink.muted,
    borderInlineEndWidth: { default: 1, [LG]: 0 },
    borderInlineEndStyle: "solid",
    borderInlineEndColor: matrix.rule,
  },
  tagHeadOn: {
    backgroundColor: matrix.column,
  },
  tagButton: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    minHeight: 64,
    paddingBlock: 12,
    paddingInline: 2,
    borderWidth: 0,
    backgroundColor: { default: "transparent", ":hover": matrix.column },
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0.04em",
    color: { default: ink.muted, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 8,
      bottom: -1,
      height: 2,
      backgroundColor: colors.brandGreen700,
      transform: "scaleX(0)",
      transitionProperty: "transform",
      transitionDuration: "240ms",
      transitionTimingFunction: layout.easeOut,
    },
  },
  tagButtonOn: {
    color: { default: ink.primary, ":hover": ink.primary },
    "::after": {
      transform: "scaleX(1)",
    },
  },
  tagLine: {
    display: "block",
    whiteSpace: "nowrap",
  },
  groupCell: {
    padding: 0,
    paddingTop: 32,
    textAlign: "start",
    fontWeight: 400,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: matrix.rule,
  },
  groupInner: {
    display: "block",
    position: { default: "sticky", [LG]: "static" },
    insetInlineStart: 0,
    width: { default: "100cqi", [LG]: "auto" },
    boxSizing: "border-box",
    paddingInline: EDGE,
    paddingBottom: 10,
  },
  groupTitle: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
  },
  groupLabel: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: ink.primary,
  },
  groupCount: {
    fontSize: 12,
    lineHeight: "18px",
    color: ink.muted,
    whiteSpace: "nowrap",
  },
  groupIntro: {
    display: "block",
    maxWidth: "40em",
    marginTop: 6,
    fontSize: 13,
    lineHeight: "22px",
    color: ink.muted,
    textWrap: "pretty",
  },
  row: {
    backgroundColor: { default: matrix.ground, ":hover": "#eef1fe" },
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  rowOpen: {
    backgroundColor: { default: matrix.raised, ":hover": matrix.raised },
  },
  nameCell: {
    position: { default: "sticky", [LG]: "static" },
    insetInlineStart: 0,
    zIndex: 1,
    padding: 0,
    textAlign: "start",
    fontWeight: 400,
    backgroundColor: "inherit",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: matrix.rule,
    borderInlineEndWidth: { default: 1, [LG]: 0 },
    borderInlineEndStyle: "solid",
    borderInlineEndColor: matrix.rule,
  },
  nameCellOpen: {
    borderBottomColor: "transparent",
    boxShadow: `inset 2px 0 0 ${colors.brandGreen700}`,
  },
  nameButton: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 14px",
    alignItems: "center",
    columnGap: { default: 6, [breakpoints.md]: 10 },
    width: "100%",
    minHeight: 60,
    paddingBlock: 10,
    paddingInlineStart: EDGE,
    paddingInlineEnd: { default: 8, [LG]: 16 },
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: ink.primary, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineOffset: -2,
  },
  names: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    transitionProperty: "opacity",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  },
  primary: {
    fontSize: { default: 14, [breakpoints.md]: 15 },
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0.02em",
    color: "inherit",
  },
  secondary: {
    marginInlineStart: 6,
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.02em",
    color: ink.muted,
  },
  latin: {
    marginTop: 1,
    fontFamily: font.serif,
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: "18px",
    letterSpacing: "0.01em",
    color: ink.muted,
  },
  latinMore: {
    marginInlineStart: 4,
    fontFamily: font.numeral,
    fontStyle: "normal",
    fontSize: 11,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 14,
    height: 14,
    color: ink.muted,
  },
  tagCell: {
    padding: 0,
    textAlign: "center",
    verticalAlign: "middle",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: matrix.rule,
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  tagCellOn: {
    backgroundColor: matrix.column,
  },
  tagCellOpen: {
    borderBottomColor: "transparent",
  },
  dot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: colors.brandGreen700,
    verticalAlign: "middle",
    transitionProperty: "opacity",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  },
  detailCell: {
    padding: 0,
    backgroundColor: matrix.raised,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: matrix.rule,
    boxShadow: `inset 2px 0 0 ${colors.brandGreen700}`,
  },
  detailClip: {
    position: { default: "sticky", [LG]: "static" },
    insetInlineStart: 0,
    width: { default: "100cqi", [LG]: "auto" },
    overflow: "hidden",
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    margin: 0,
    paddingTop: 4,
    paddingBottom: 28,
    paddingInlineStart: EDGE,
    paddingInlineEnd: { default: 16, [MD_ONLY]: 40, [LG]: 16 },
  },
  field: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [MD_ONLY]: "140px minmax(0, 1fr)",
      [LG]: "calc((100% + 32px) * 0.27 - 32px) minmax(0, 1fr)",
    },
    columnGap: { default: 0, [MD_ONLY]: 40, [LG]: 16 },
    rowGap: 4,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.06em",
    color: ink.muted,
  },
  inci: {
    margin: 0,
    maxWidth: "40em",
    fontSize: 14,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: ink.body,
    textWrap: "pretty",
  },
  features: {
    margin: 0,
    maxWidth: "36em",
    fontSize: 15,
    lineHeight: "26px",
    color: ink.primary,
    textWrap: "pretty",
  },
  keepTogether: {
    whiteSpace: "nowrap",
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

function LatinLine({ names }: { names: string[] }) {
  const [first, ...rest] = names;
  if (!first) return null;
  return (
    <span lang="la" title={names.join(", ")} {...stylex.props(styles.latin)}>
      {first}
      {rest.length > 0 && <span {...stylex.props(styles.latinMore)}>+{rest.length}</span>}
    </span>
  );
}

function ItemRows({
  item,
  activeTag,
  open,
  onToggle,
}: {
  item: FlatItem;
  activeTag: FunctionTag | null;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const detailId = useId();

  return (
    <>
      <tr {...stylex.props(styles.row, open && styles.rowOpen)}>
        <th scope="row" {...stylex.props(styles.nameCell, open && styles.nameCellOpen)}>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={open ? detailId : undefined}
            onClick={onToggle}
            {...stylex.props(frame.focusRing, styles.nameButton)}
          >
            <span {...stylex.props(styles.names)}>
              <span {...stylex.props(styles.primary)}>
                {item.primary}
                {item.secondary && (
                  <span {...stylex.props(styles.secondary)}>{item.secondary}</span>
                )}
              </span>
              <LatinLine names={item.latin} />
            </span>
            <m.span
              aria-hidden="true"
              initial={false}
              animate={{ rotate: open ? 45 : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.2, ease: EASE }}
              {...stylex.props(styles.toggle)}
            >
              <Plus size={14} strokeWidth={1.5} absoluteStrokeWidth />
            </m.span>
          </button>
        </th>
        {FUNCTION_TAGS.map((tag) => (
          <td
            key={tag}
            {...stylex.props(
              styles.tagCell,
              activeTag === tag && styles.tagCellOn,
              open && styles.tagCellOpen,
            )}
          >
            {hasTag(item, tag) && (
              <>
                <span aria-hidden="true" {...stylex.props(styles.dot)} />
                <span {...stylex.props(frame.srOnly)}>有</span>
              </>
            )}
          </td>
        ))}
      </tr>
      <AnimatePresence initial={false}>
        {open && (
          <tr key="detail">
            <td colSpan={COLUMN_COUNT} {...stylex.props(styles.detailCell)}>
              <m.div
                id={detailId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.24, ease: EASE }}
                {...stylex.props(styles.detailClip)}
              >
                <dl {...stylex.props(styles.detail)}>
                  <div {...stylex.props(styles.field)}>
                    <dt {...stylex.props(styles.fieldLabel)}>INCI 名称</dt>
                    <dd {...stylex.props(styles.inci)}>
                      <Inci text={item.inci} />
                    </dd>
                  </div>
                  <div {...stylex.props(styles.field)}>
                    <dt {...stylex.props(styles.fieldLabel)}>特性&应用</dt>
                    <dd {...stylex.props(styles.features)}>{item.features}</dd>
                  </div>
                </dl>
              </m.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}

export function Catalog() {
  const tableId = useId();
  const noteId = useId();
  const [activeTag, setActiveTag] = useState<FunctionTag | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const matchCount = activeTag ? (TAG_TOTALS.get(activeTag) ?? 0) : FLAT_ITEMS.length;

  return (
    <section
      id="products-catalog"
      aria-labelledby="catalog-title"
      {...stylex.props(frame.section, styles.ground)}
    >
      <div {...stylex.props(frame.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id="catalog-title" {...stylex.props(frame.title)}>
            产品目录
          </h2>
          <p id={noteId} {...stylex.props(styles.note)}>
            功效依据原料描述整理
          </p>
        </header>
        <div {...stylex.props(styles.status)}>
          <p aria-live="polite" {...stylex.props(styles.statusText)}>
            {activeTag ?? "全部"}
            <span aria-hidden="true" {...stylex.props(styles.statusDivider)}>
              ·
            </span>
            <span {...stylex.props(styles.numeral)}>{matchCount}</span>
            <span {...stylex.props(styles.statusUnit)}>款</span>
          </p>
          {activeTag ? (
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              {...stylex.props(frame.focusRing, styles.clear)}
            >
              <X size={14} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              清除
            </button>
          ) : (
            <span {...stylex.props(styles.hint)}>点按功效列标题筛选</span>
          )}
        </div>
        <div {...stylex.props(styles.scroller)}>
          <table
            id={tableId}
            aria-labelledby="catalog-title"
            aria-describedby={noteId}
            {...stylex.props(styles.table)}
          >
            <colgroup>
              <col {...stylex.props(styles.nameCol)} />
              {FUNCTION_TAGS.map((tag) => (
                <col key={tag} {...stylex.props(styles.tagCol)} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col" {...stylex.props(styles.headCell, styles.nameHead)}>
                  名称
                </th>
                {FUNCTION_TAGS.map((tag) => {
                  const pressed = activeTag === tag;
                  return (
                    <th
                      key={tag}
                      scope="col"
                      {...stylex.props(styles.headCell, pressed && styles.tagHeadOn)}
                    >
                      <button
                        type="button"
                        aria-pressed={pressed}
                        aria-controls={tableId}
                        onClick={() => setActiveTag(pressed ? null : tag)}
                        {...stylex.props(
                          frame.focusRing,
                          styles.tagButton,
                          pressed && styles.tagButtonOn,
                        )}
                      >
                        {stackedLabel(tag).map((part) => (
                          <span key={part} {...stylex.props(styles.tagLine)}>
                            {part}
                          </span>
                        ))}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            {GROUP_ROWS.map(({ group, items }) => {
              const visibleItems = activeTag
                ? items.filter((item) => hasTag(item, activeTag))
                : items;
              const matching = visibleItems.length;
              if (matching === 0) return null;
              return (
                <tbody key={group.id}>
                  <tr>
                    <th scope="rowgroup" colSpan={COLUMN_COUNT} {...stylex.props(styles.groupCell)}>
                      <span {...stylex.props(styles.groupInner)}>
                        <span {...stylex.props(styles.groupTitle)}>
                          <span {...stylex.props(styles.groupLabel)}>{group.label}</span>
                          <span {...stylex.props(styles.groupCount)}>
                            <span {...stylex.props(styles.numeral)}>
                              {activeTag ? `${matching} / ${items.length}` : items.length}
                            </span>
                            <span {...stylex.props(styles.statusUnit)}>款</span>
                          </span>
                        </span>
                        {group.intro && (
                          <span {...stylex.props(styles.groupIntro)}>{group.intro}</span>
                        )}
                      </span>
                    </th>
                  </tr>
                  {visibleItems.map((item) => (
                    <ItemRows
                      key={item.id}
                      item={item}
                      activeTag={activeTag}
                      open={openId === item.id}
                      onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                    />
                  ))}
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </section>
  );
}
