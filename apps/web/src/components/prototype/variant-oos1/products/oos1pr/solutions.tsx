import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useId, useState } from "react";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED = "#6b6b70";
const GROUND = "#f6f5f3";
const SHEET = "#ffffff";
const SHEET_EDGE = "#e2dfd9";
const SHEET_RULE = "#e9e6e1";
const CONTROL_EDGE = "#c9c5be";
const DISABLED = "#a9a59f";
const ACCENT = colors.brandGreen700;
const FOCUS = colors.brandBlue700;
const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const SHEET_PAD = { default: 20, [MD]: 32, [DESKTOP]: 48 } as const;

type FieldKey =
  | "overview"
  | "functions"
  | "keyIngredients"
  | "challenges"
  | "texture"
  | "applications";

interface Field {
  key: FieldKey;
  label: string;
}

const SPLIT: Field[][] = [
  [
    { key: "overview", label: "概述" },
    { key: "functions", label: "功能" },
    { key: "keyIngredients", label: "功能性成分" },
  ],
  [
    { key: "challenges", label: "配方挑战" },
    { key: "texture", label: "质地" },
    { key: "applications", label: "应用" },
  ],
];

const TOTAL = SOLUTION_ITEMS.length;

const fadeIn = stylex.keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: GROUND,
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
    marginBottom: { default: 32, [DESKTOP]: 56 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: INK,
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    margin: -1,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },

  route: {
    display: "grid",
    gridTemplateColumns: {
      default: "44px 44px minmax(0, 1fr) auto",
      [MD]: "44px minmax(0, 320px) 44px minmax(0, 1fr) auto",
    },
    gridTemplateAreas: {
      default: '"select select select select" "prev next . counter"',
      [MD]: '"prev select next . counter"',
    },
    alignItems: "center",
    columnGap: 8,
    rowGap: 8,
    marginBottom: 16,
  },
  prev: { gridArea: "prev" },
  next: { gridArea: "next" },
  iconButton: {
    display: "grid",
    placeItems: "center",
    width: 44,
    height: 44,
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: CONTROL_EDGE, ":hover": FOCUS },
    borderRadius: 2,
    backgroundColor: SHEET,
    color: { default: INK, ":hover": FOCUS },
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "color, border-color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: EASE_OUT_CSS,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 2,
  },
  iconButtonDisabled: {
    borderColor: SHEET_EDGE,
    color: DISABLED,
    cursor: "default",
    transform: "none",
  },
  selectWrap: {
    gridArea: "select",
    position: "relative",
    minWidth: 0,
  },
  select: {
    appearance: "none",
    display: "block",
    width: "100%",
    height: 44,
    margin: 0,
    paddingInlineStart: 14,
    paddingInlineEnd: 40,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: CONTROL_EDGE, ":hover": FOCUS },
    borderRadius: 2,
    backgroundColor: SHEET,
    fontFamily: "inherit",
    fontSize: { default: 16, [MD]: 15 },
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    fontVariantNumeric: "tabular-nums",
    color: INK,
    textOverflow: "ellipsis",
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: FOCUS,
    outlineOffset: 2,
  },
  selectIcon: {
    position: "absolute",
    insetInlineEnd: 14,
    top: "50%",
    marginTop: -8,
    display: "block",
    color: MUTED,
    pointerEvents: "none",
  },
  counter: {
    gridArea: "counter",
    justifySelf: "end",
    margin: 0,
    fontFamily: NUMERAL_FONT,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: MUTED,
    whiteSpace: "nowrap",
  },
  counterCurrent: {
    color: INK,
  },

  sheet: {
    backgroundColor: SHEET,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: SHEET_EDGE,
    boxShadow: "0 1px 2px rgba(26, 26, 26, 0.04)",
  },
  stack: {
    display: "grid",
  },
  page: {
    gridArea: "1 / 1",
    display: { default: "none", [MD]: "flex" },
    flexDirection: "column",
    minWidth: 0,
    opacity: 0,
    visibility: "hidden",
    transitionProperty: "opacity, visibility",
    transitionDuration: { default: "140ms", [breakpoints.motionReduce]: "0ms" },
    transitionTimingFunction: "ease",
  },
  pageActive: {
    display: "flex",
    opacity: 1,
    visibility: "visible",
    animationName: fadeIn,
    animationDuration: { default: "240ms", [breakpoints.motionReduce]: "0ms" },
    animationDelay: { default: "60ms", [breakpoints.motionReduce]: "0ms" },
    animationFillMode: "backwards",
    animationTimingFunction: EASE_OUT_CSS,
  },
  sheetHead: {
    paddingTop: { default: 24, [MD]: 32, [DESKTOP]: 40 },
    paddingBottom: { default: 20, [MD]: 28, [DESKTOP]: 32 },
    paddingInline: SHEET_PAD,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: SHEET_RULE,
  },
  sheetIndex: {
    margin: 0,
    marginBottom: 8,
    fontFamily: NUMERAL_FONT,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: ACCENT,
  },
  sheetTitle: {
    margin: 0,
    fontSize: { default: 20, [MD]: 22, [DESKTOP]: 24 },
    fontWeight: 500,
    lineHeight: { default: "28px", [MD]: "32px" },
    letterSpacing: "0.04em",
    color: INK,
    textWrap: "balance",
  },
  sheetSubtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: "24px",
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  split: {
    flexGrow: 1,
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [MD]: "repeat(2, minmax(0, 1fr))" },
  },
  half: {
    display: "flex",
    flexDirection: "column",
    gap: { default: 20, [DESKTOP]: 28 },
    margin: 0,
    paddingTop: { default: 24, [MD]: 32, [DESKTOP]: 40 },
    paddingBottom: { default: 24, [MD]: 36, [DESKTOP]: 48 },
    paddingInlineStart: SHEET_PAD,
    paddingInlineEnd: { default: 20, [MD]: 32, [DESKTOP]: 48 },
  },
  halfSecond: {
    paddingInlineStart: { default: 20, [MD]: 32, [DESKTOP]: 48 },
    paddingInlineEnd: SHEET_PAD,
    borderTopWidth: { default: 1, [MD]: 0 },
    borderTopStyle: "solid",
    borderTopColor: SHEET_RULE,
    borderInlineStartWidth: { default: 0, [MD]: 1 },
    borderInlineStartStyle: "solid",
    borderInlineStartColor: SHEET_RULE,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [LG]: "88px minmax(0, 1fr)" },
    columnGap: 20,
    rowGap: 6,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: { default: "20px", [LG]: "26px" },
    letterSpacing: "0.04em",
    color: MUTED,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "26px",
    color: INK,
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  line: {
    textWrap: "pretty",
  },
  empty: {
    color: MUTED,
  },
});

function FieldRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div {...stylex.props(styles.field)}>
      <dt {...stylex.props(styles.fieldLabel)}>{label}</dt>
      <dd {...stylex.props(styles.fieldValue)}>
        {values.length > 0 ? (
          <ul {...stylex.props(styles.lines)}>
            {values.map((value) => (
              <li key={value} {...stylex.props(styles.line)}>
                {value}
              </li>
            ))}
          </ul>
        ) : (
          <span {...stylex.props(styles.empty)}>
            <span aria-hidden="true">—</span>
            <span {...stylex.props(styles.srOnly)}>未提供</span>
          </span>
        )}
      </dd>
    </div>
  );
}

function SheetPage({
  item,
  index,
  active,
}: {
  item: SolutionItem;
  index: number;
  active: boolean;
}) {
  return (
    <article inert={!active} {...stylex.props(styles.page, active && styles.pageActive)}>
      <header {...stylex.props(styles.sheetHead)}>
        <p {...stylex.props(styles.sheetIndex)}>{padIndex(index)}</p>
        <h3 {...stylex.props(styles.sheetTitle)}>{item.title}</h3>
        <p {...stylex.props(styles.sheetSubtitle)}>{item.subtitle}</p>
      </header>
      <div {...stylex.props(styles.split)}>
        {SPLIT.map((fields, half) => (
          <dl key={fields[0]?.key} {...stylex.props(styles.half, half === 1 && styles.halfSecond)}>
            {fields.map((field) => (
              <FieldRow key={field.key} label={field.label} values={item[field.key]} />
            ))}
          </dl>
        ))}
      </div>
    </article>
  );
}

export function Solutions() {
  const titleId = useId();
  const sheetId = useId();
  const selectId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const atStart = activeIndex === 0;
  const atEnd = activeIndex === TOTAL - 1;
  const activeItem = SOLUTION_ITEMS[activeIndex];

  const goTo = (index: number) => {
    setActiveIndex(Math.min(Math.max(index, 0), TOTAL - 1));
  };

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            应用方案
          </h2>
        </header>

        <div {...stylex.props(styles.route)}>
          <button
            type="button"
            aria-label="上一个"
            aria-controls={sheetId}
            aria-disabled={atStart}
            onClick={() => {
              if (!atStart) goTo(activeIndex - 1);
            }}
            {...stylex.props(styles.iconButton, styles.prev, atStart && styles.iconButtonDisabled)}
          >
            <ChevronLeft size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
          </button>
          <div {...stylex.props(styles.selectWrap)}>
            <label htmlFor={selectId} {...stylex.props(styles.srOnly)}>
              选择应用方案
            </label>
            <select
              id={selectId}
              value={activeIndex}
              aria-controls={sheetId}
              onChange={(event) => goTo(Number(event.target.value))}
              {...stylex.props(styles.select)}
            >
              {SOLUTION_ITEMS.map((item, index) => (
                <option key={item.id} value={index}>
                  {`${padIndex(index)} ${item.title}`}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              absoluteStrokeWidth
              aria-hidden="true"
              {...stylex.props(styles.selectIcon)}
            />
          </div>
          <button
            type="button"
            aria-label="下一个"
            aria-controls={sheetId}
            aria-disabled={atEnd}
            onClick={() => {
              if (!atEnd) goTo(activeIndex + 1);
            }}
            {...stylex.props(styles.iconButton, styles.next, atEnd && styles.iconButtonDisabled)}
          >
            <ChevronRight size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
          </button>
          <p aria-live="polite" {...stylex.props(styles.counter)}>
            <span {...stylex.props(styles.counterCurrent)}>{padIndex(activeIndex)}</span>
            {` / ${padIndex(TOTAL - 1)}`}
            <span {...stylex.props(styles.srOnly)}>{activeItem?.title}</span>
          </p>
        </div>

        <div id={sheetId} {...stylex.props(styles.sheet)}>
          <div {...stylex.props(styles.stack)}>
            {SOLUTION_ITEMS.map((item, index) => (
              <SheetPage key={item.id} item={item} index={index} active={index === activeIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
