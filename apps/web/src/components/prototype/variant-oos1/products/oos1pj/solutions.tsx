import { breakpoints, colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeftRight, ChevronDown } from "lucide-react";
import { m } from "motion/react";
import { useId, useState } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";

const INK = "#1a1a1a";
const BODY_TEXT = "#4d4d4d";
const MUTED_LABEL = "#6b6b70";
const BAND = "#f5fbfb";
const PAPER = "#ffffff";
const RULE = "#dbe9e9";
const CONTROL_RULE = "#729393";
const ACCENT = colors.brandGreen700;
const BODY_FONT =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const NUMERAL_FONT = '"Inter Tight", "Noto Sans SC", sans-serif';

const TABLET = "@media (min-width: 768px) and (max-width: 1279.98px)";
const DESKTOP = breakpoints.xl;
const MD = breakpoints.md;
const LG = breakpoints.lg;
const MID = "@media (min-width: 768px) and (max-width: 1023.98px)";
const INSET = "min(120px, 8.333vw)";
const HEADER_HEIGHT = 80;
const LINE_HEIGHT = 26;
const LINE_GAP = 6;
const MAX_RESERVED_LINES = 4;

type FieldKey =
  | "overview"
  | "functions"
  | "keyIngredients"
  | "challenges"
  | "texture"
  | "applications";
type Slot = "A" | "B";

const FIELDS: { key: FieldKey; label: string; english: string }[] = [
  { key: "overview", label: "概述", english: "Overview" },
  { key: "functions", label: "功能", english: "Functions" },
  { key: "keyIngredients", label: "功能性成分", english: "Functional ingredients" },
  { key: "challenges", label: "配方挑战", english: "Formulation challenges" },
  { key: "texture", label: "质地", english: "Texture" },
  { key: "applications", label: "应用", english: "Applications" },
];

const reservedHeight = (key: FieldKey) => {
  const lines = Math.min(
    MAX_RESERVED_LINES,
    Math.max(1, ...SOLUTION_ITEMS.map((item) => item[key].length)),
  );
  return `${lines * LINE_HEIGHT + (lines - 1) * LINE_GAP}px`;
};

const RESERVED_HEIGHT = Object.fromEntries(
  FIELDS.map(({ key }) => [key, reservedHeight(key)]),
) as Record<FieldKey, string>;

const INDEX_BY_ID: Record<string, number> = Object.fromEntries(
  SOLUTION_ITEMS.map((item, index) => [item.id, index]),
);

const DEFAULT_PAIR: [string, string] = [SOLUTION_ITEMS[0]?.id ?? "", SOLUTION_ITEMS[1]?.id ?? ""];

const findSolution = (id: string): SolutionItem =>
  SOLUTION_ITEMS.find((item) => item.id === id) ?? (SOLUTION_ITEMS[0] as SolutionItem);

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  borderWidth: 0,
} as const;

const focusRing = {
  outlineStyle: { default: "none", ":focus-visible": "solid" },
  outlineWidth: 2,
  outlineColor: colors.brandBlue700,
  outlineOffset: 2,
} as const;

const styles = stylex.create({
  section: {
    paddingTop: { default: 64, [DESKTOP]: 96 },
    paddingBottom: { default: 72, [DESKTOP]: 112 },
    scrollMarginTop: HEADER_HEIGHT,
    backgroundColor: BAND,
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
    marginBottom: { default: 24, [DESKTOP]: 40 },
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [TABLET]: 28, [DESKTOP]: 32 },
    fontWeight: 400,
    lineHeight: { default: "34px", [TABLET]: "36px", [DESKTOP]: "40px" },
    letterSpacing: "0.04em",
    color: INK,
  },
  meta: {
    margin: 0,
    marginTop: 8,
    fontSize: 14,
    lineHeight: "22px",
    color: MUTED_LABEL,
  },
  numeral: {
    fontFamily: NUMERAL_FONT,
    fontWeight: 500,
    fontVariantNumeric: "tabular-nums",
    color: INK,
  },
  srOnly: visuallyHidden,

  phoneBar: {
    display: { default: "grid", [MD]: "none" },
    gridTemplateColumns: "minmax(0, 1fr) 56px minmax(0, 1fr)",
    alignItems: "stretch",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: RULE,
  },
  phoneToggle: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 2,
    minWidth: 0,
    minHeight: 56,
    paddingBlock: 8,
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: { default: MUTED_LABEL, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transitionProperty: "color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
    outlineOffset: -2,
    "::after": {
      content: '""',
      position: "absolute",
      insetInline: 0,
      bottom: -1,
      height: 2,
      backgroundColor: ACCENT,
      transform: "scaleX(0)",
      transformOrigin: "left center",
      transitionProperty: "transform",
      transitionDuration: "240ms",
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
  },
  phoneToggleEnd: {
    alignItems: "flex-end",
    textAlign: "end",
  },
  phoneToggleOn: {
    color: { default: INK, ":hover": INK },
    "::after": {
      transform: "scaleX(1)",
    },
  },
  phoneToggleSlot: {
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
  },
  phoneToggleTitle: {
    maxWidth: "100%",
    overflow: "hidden",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "22px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  phoneSwap: {
    alignSelf: "center",
    justifySelf: "center",
  },

  compare: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [MID]: "minmax(0, 1fr) 56px minmax(0, 1fr)",
      [LG]: "104px minmax(0, 1fr) 64px minmax(0, 1fr)",
    },
    gridTemplateRows: "auto auto repeat(6, auto)",
    rowGap: 0,
  },
  rail: {
    display: { default: "none", [LG]: "grid" },
    gridColumn: "1",
    gridRow: "3 / -1",
    gridTemplateRows: "subgrid",
    rowGap: 0,
    margin: 0,
    padding: 0,
  },
  railLabel: {
    paddingTop: 16,
    paddingInlineEnd: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: RULE,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: `${LINE_HEIGHT}px`,
    letterSpacing: "0.04em",
    color: MUTED_LABEL,
  },
  sheet: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gridTemplateRows: "subgrid",
    gridRow: "1 / -1",
    rowGap: 0,
    minWidth: 0,
  },
  sheetA: {
    gridColumn: { default: "1", [LG]: "2" },
  },
  sheetB: {
    gridColumn: { default: "1", [MID]: "3", [LG]: "4" },
  },
  sheetHiddenOnPhone: {
    display: { default: "none", [MD]: "grid" },
  },
  control: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingBottom: 12,
  },
  controlLabel: {
    fontFamily: NUMERAL_FONT,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: MUTED_LABEL,
  },
  selectWrap: {
    position: "relative",
    display: "block",
  },
  select: {
    appearance: "none",
    display: "block",
    width: "100%",
    height: 48,
    margin: 0,
    paddingInlineStart: 14,
    paddingInlineEnd: 44,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: CONTROL_RULE, ":hover": colors.brandBlue700 },
    borderRadius: 2,
    backgroundColor: PAPER,
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: INK,
    textOverflow: "ellipsis",
    cursor: "pointer",
    transitionProperty: "border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
  },
  selectIcon: {
    position: "absolute",
    insetInlineEnd: 14,
    top: "50%",
    marginTop: -8,
    color: MUTED_LABEL,
    pointerEvents: "none",
  },
  swapCell: {
    display: { default: "none", [MD]: "flex" },
    gridColumn: { default: "auto", [MID]: "2", [LG]: "3" },
    gridRow: "1",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 16,
  },
  swap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: CONTROL_RULE, ":hover": colors.brandBlue700 },
    borderRadius: "50%",
    backgroundColor: { default: PAPER, ":active": BAND },
    color: { default: INK, ":hover": colors.brandBlue700 },
    cursor: "pointer",
    transform: {
      default: null,
      ":active": { default: null, [breakpoints.motionOk]: "scale(0.96)" },
    },
    transitionProperty: "color, border-color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
  },
  paper: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gridTemplateRows: "subgrid",
    gridRow: "2 / -1",
    rowGap: 0,
    minWidth: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: RULE,
    borderRadius: 2,
    backgroundColor: PAPER,
    boxShadow: "0 1px 2px rgba(22, 64, 64, 0.05)",
  },
  paperHead: {
    minWidth: 0,
    paddingTop: { default: 24, [DESKTOP]: 28 },
    paddingBottom: 24,
    paddingInline: { default: 20, [MD]: 24, [DESKTOP]: 32 },
  },
  index: {
    display: "block",
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
    marginTop: 8,
    fontSize: { default: 20, [DESKTOP]: 22 },
    fontWeight: 500,
    lineHeight: { default: "28px", [DESKTOP]: "30px" },
    letterSpacing: "0.02em",
    color: INK,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "30em",
    fontSize: { default: 14, [DESKTOP]: 15 },
    lineHeight: { default: "22px", [DESKTOP]: "24px" },
    color: BODY_TEXT,
    textWrap: "pretty",
  },
  fields: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gridTemplateRows: "subgrid",
    gridRow: "2 / -1",
    rowGap: 0,
    minWidth: 0,
    margin: 0,
  },
  field: {
    minWidth: 0,
    paddingTop: 16,
    paddingBottom: { default: 16, ":last-child": 28 },
    paddingInline: { default: 20, [MD]: 24, [DESKTOP]: 32 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: RULE,
  },
  fieldLabel: {
    margin: 0,
    marginBottom: { default: 6, [LG]: 0 },
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    color: MUTED_LABEL,
    position: { default: "static", [LG]: visuallyHidden.position },
    width: { default: "auto", [LG]: visuallyHidden.width },
    height: { default: "auto", [LG]: visuallyHidden.height },
    overflow: { default: "visible", [LG]: visuallyHidden.overflow },
    clipPath: { default: "none", [LG]: visuallyHidden.clipPath },
    whiteSpace: { default: "normal", [LG]: visuallyHidden.whiteSpace },
  },
  fieldValue: {
    margin: 0,
    fontSize: 15,
    lineHeight: `${LINE_HEIGHT}px`,
    color: INK,
  },
  reserve: (minHeight: string) => ({
    minHeight,
  }),
  lineList: {
    display: "flex",
    flexDirection: "column",
    gap: LINE_GAP,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  lineItem: {
    position: "relative",
    paddingInlineStart: 16,
    textWrap: "pretty",
    "::before": {
      content: '""',
      position: "absolute",
      insetInlineStart: 0,
      top: LINE_HEIGHT / 2,
      width: 6,
      height: 1,
      backgroundColor: MUTED_LABEL,
    },
  },
  empty: {
    color: MUTED_LABEL,
  },
});

function Lines({ lines }: { lines: string[] }) {
  return (
    <ul {...stylex.props(styles.lineList)}>
      {lines.map((line) => (
        <li key={line} {...stylex.props(styles.lineItem)}>
          {line}
        </li>
      ))}
    </ul>
  );
}

function SwapButton({ onSwap }: { onSwap: () => void }) {
  return (
    <button type="button" aria-label="Swap" onClick={onSwap} {...stylex.props(styles.swap)}>
      <ArrowLeftRight size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
    </button>
  );
}

function Sheet({
  slot,
  sheetId,
  item,
  otherSlot,
  otherId,
  onSelect,
  shownOnPhone,
  animateEntry,
}: {
  slot: Slot;
  sheetId: string;
  item: SolutionItem;
  otherSlot: Slot;
  otherId: string;
  onSelect: (id: string) => void;
  shownOnPhone: boolean;
  animateEntry: boolean;
}) {
  const reduce = useReducedMotion();
  const selectId = useId();
  const labelId = useId();
  const titleId = useId();
  const entry = animateEntry && !reduce ? { opacity: 0, y: 4 } : false;
  const settle = { opacity: 1, y: 0 };
  const timing = { duration: reduce ? 0 : 0.22, ease: EASE };

  return (
    <article
      id={sheetId}
      aria-labelledby={`${labelId} ${titleId}`}
      {...stylex.props(
        styles.sheet,
        slot === "A" ? styles.sheetA : styles.sheetB,
        !shownOnPhone && styles.sheetHiddenOnPhone,
      )}
    >
      <div {...stylex.props(styles.control)}>
        <label id={labelId} htmlFor={selectId} {...stylex.props(styles.controlLabel)}>
          方案 {slot}
        </label>
        <span {...stylex.props(styles.selectWrap)}>
          <select
            id={selectId}
            value={item.id}
            onChange={(event) => onSelect(event.target.value)}
            {...stylex.props(styles.select)}
          >
            {SOLUTION_ITEMS.map((solution, index) => {
              const taken = solution.id === otherId;
              return (
                <option key={solution.id} value={solution.id} disabled={taken}>
                  {padIndex(index)} {solution.title}
                  {taken ? `（方案 ${otherSlot}）` : ""}
                </option>
              );
            })}
          </select>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            absoluteStrokeWidth
            aria-hidden="true"
            {...stylex.props(styles.selectIcon)}
          />
        </span>
      </div>
      <div {...stylex.props(styles.paper)}>
        <m.header
          key={`head-${item.id}`}
          initial={entry}
          animate={settle}
          transition={timing}
          {...stylex.props(styles.paperHead)}
        >
          <span {...stylex.props(styles.index)}>{padIndex(INDEX_BY_ID[item.id] ?? 0)}</span>
          <h3 id={titleId} {...stylex.props(styles.sheetTitle)}>
            {item.title}
          </h3>
          <p {...stylex.props(styles.subtitle)}>{item.subtitle}</p>
        </m.header>
        <m.dl
          key={`fields-${item.id}`}
          initial={entry}
          animate={settle}
          transition={timing}
          {...stylex.props(styles.fields)}
        >
          {FIELDS.map(({ key, label, english }) => {
            const lines = item[key];
            return (
              <div key={key} {...stylex.props(styles.field)}>
                <dt {...stylex.props(styles.fieldLabel)}>
                  <span aria-hidden="true">{label}</span>
                  <span {...stylex.props(styles.srOnly)}>{english}</span>
                </dt>
                <dd {...stylex.props(styles.fieldValue, styles.reserve(RESERVED_HEIGHT[key]))}>
                  {lines.length > 0 ? (
                    <Lines lines={lines} />
                  ) : (
                    <>
                      <span aria-hidden="true" {...stylex.props(styles.empty)}>
                        —
                      </span>
                      <span {...stylex.props(styles.srOnly)}>None</span>
                    </>
                  )}
                </dd>
              </div>
            );
          })}
        </m.dl>
      </div>
    </article>
  );
}

export function Solutions() {
  const titleId = useId();
  const sheetAId = useId();
  const sheetBId = useId();
  const [[idA, idB], setPair] = useState<[string, string]>(DEFAULT_PAIR);
  const [phoneSlot, setPhoneSlot] = useState<Slot>("A");
  const [animateEntry, setAnimateEntry] = useState(false);
  const itemA = findSolution(idA);
  const itemB = findSolution(idB);

  const choose = (slot: Slot, id: string) => {
    setAnimateEntry(true);
    setPair(([a, b]) => (slot === "A" ? [id, b] : [a, id]));
  };

  const swap = () => {
    setAnimateEntry(true);
    setPair(([a, b]) => [b, a]);
  };

  return (
    <section id="products-solutions" aria-labelledby={titleId} {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(styles.title)}>
            应用方案
          </h2>
          <p {...stylex.props(styles.meta)}>
            <span {...stylex.props(styles.numeral)}>{SOLUTION_ITEMS.length}</span>{" "}
            款方案，任选两款逐项对照
          </p>
        </header>

        <div
          role="group"
          aria-label="Change the displayed solution"
          {...stylex.props(styles.phoneBar)}
        >
          <PhoneToggle
            slot="A"
            title={itemA.title}
            controls={sheetAId}
            pressed={phoneSlot === "A"}
            onPress={() => setPhoneSlot("A")}
          />
          <span {...stylex.props(styles.phoneSwap)}>
            <SwapButton onSwap={swap} />
          </span>
          <PhoneToggle
            slot="B"
            title={itemB.title}
            controls={sheetBId}
            pressed={phoneSlot === "B"}
            onPress={() => setPhoneSlot("B")}
          />
        </div>

        <div {...stylex.props(styles.compare)}>
          <ul aria-hidden="true" {...stylex.props(styles.rail)}>
            {FIELDS.map(({ key, label }) => (
              <li key={key} {...stylex.props(styles.railLabel)}>
                {label}
              </li>
            ))}
          </ul>
          <Sheet
            slot="A"
            sheetId={sheetAId}
            item={itemA}
            otherSlot="B"
            otherId={idB}
            onSelect={(id) => choose("A", id)}
            shownOnPhone={phoneSlot === "A"}
            animateEntry={animateEntry}
          />
          <div {...stylex.props(styles.swapCell)}>
            <SwapButton onSwap={swap} />
          </div>
          <Sheet
            slot="B"
            sheetId={sheetBId}
            item={itemB}
            otherSlot="A"
            otherId={idA}
            onSelect={(id) => choose("B", id)}
            shownOnPhone={phoneSlot === "B"}
            animateEntry={animateEntry}
          />
        </div>
      </div>
    </section>
  );
}

function PhoneToggle({
  slot,
  title,
  controls,
  pressed,
  onPress,
}: {
  slot: Slot;
  title: string;
  controls: string;
  pressed: boolean;
  onPress: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-controls={controls}
      onClick={onPress}
      {...stylex.props(
        styles.phoneToggle,
        slot === "B" && styles.phoneToggleEnd,
        pressed && styles.phoneToggleOn,
      )}
    >
      <span {...stylex.props(styles.phoneToggleSlot)}>方案 {slot}</span>
      <span {...stylex.props(styles.phoneToggleTitle)}>{title}</span>
    </button>
  );
}
