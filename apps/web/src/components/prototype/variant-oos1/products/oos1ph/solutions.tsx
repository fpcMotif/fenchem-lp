import { colors } from "@fenchem-lp/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { m } from "motion/react";
import { useId, useState } from "react";

import { EASE } from "@/components/prototype/motion-constants";
import { useReducedMotion } from "@/components/prototype/use-reduced-motion";

import { SOLUTION_ITEMS, type SolutionItem } from "../../products-data";
import { padIndex } from "../shared/derived";
import { SegmentButton, SegmentTrack } from "./shared";
import { ui } from "./shared-values";
import { chrome, face, media, tone } from "./tokens.stylex";

type FaceId = "front" | "back";

interface Field {
  label: string;
  lines: string[];
}

interface SheetSide {
  id: FaceId;
  label: string;
  fields: (item: SolutionItem) => Field[];
}

const SIDES: SheetSide[] = [
  {
    id: "front",
    label: "正面 · 是什么",
    fields: (item) => [
      { label: "概述", lines: item.overview },
      { label: "功能", lines: item.functions },
      { label: "功能性成分", lines: item.keyIngredients },
    ],
  },
  {
    id: "back",
    label: "背面 · 怎么做",
    fields: (item) => [
      { label: "配方挑战", lines: item.challenges },
      { label: "质地", lines: item.texture },
      { label: "应用", lines: item.applications },
    ],
  },
];

const TOTAL = String(SOLUTION_ITEMS.length).padStart(2, "0");
const TWELVE = "repeat(12, minmax(0, 1fr))";

const focusRing = {
  outlineStyle: { default: "none", ":focus-visible": "solid" },
  outlineWidth: 2,
  outlineColor: colors.brandBlue700,
  outlineOffset: 2,
} as const;

const styles = stylex.create({
  ground: {
    backgroundColor: tone.solutionsGround,
  },
  head: {
    marginBottom: { default: 28, [media.desktop]: 48 },
  },
  layout: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [media.desktop]: TWELVE },
    columnGap: 24,
    rowGap: { default: 28, [media.table]: 32 },
    alignItems: "start",
  },
  rail: {
    gridColumn: { default: "1 / -1", [media.desktop]: "10 / 13" },
    gridRow: { default: "auto", [media.desktop]: "1" },
    position: { default: "static", [media.desktop]: "sticky" },
    top: chrome.railTop,
    display: "flex",
    flexDirection: { default: "row", [media.desktop]: "column" },
    alignItems: { default: "center", [media.desktop]: "stretch" },
    gap: { default: 8, [media.table]: 16 },
  },
  selectWrap: {
    position: "relative",
    flexGrow: 1,
    minWidth: 0,
    maxWidth: { default: "none", [media.tablet]: 360 },
  },
  select: {
    appearance: "none",
    display: "block",
    width: "100%",
    height: 44,
    margin: 0,
    paddingBlock: 0,
    paddingInlineStart: 14,
    paddingInlineEnd: 40,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: tone.control, ":hover": colors.brandBlue700 },
    borderRadius: 4,
    backgroundColor: tone.paper,
    fontFamily: "inherit",
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    color: tone.ink,
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
    color: tone.muted,
    pointerEvents: "none",
  },
  stepper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
    gap: 4,
  },
  stepButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 44,
    height: 44,
    padding: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: tone.control,
      ":hover": colors.brandBlue700,
      ":disabled": tone.solutionsRule,
    },
    borderRadius: 4,
    backgroundColor: { default: tone.paper, ":disabled": "transparent" },
    color: { default: tone.ink, ":hover": colors.brandBlue700, ":disabled": tone.disabled },
    cursor: { default: "pointer", ":disabled": "not-allowed" },
    transform: {
      default: null,
      ":active": { default: null, [media.motionOk]: "scale(0.96)" },
      ":disabled": null,
    },
    transitionProperty: "color, border-color, transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ...focusRing,
  },
  counter: {
    margin: 0,
    minWidth: 64,
    fontFamily: face.numeral,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    textAlign: "center",
    whiteSpace: "nowrap",
    color: tone.ink,
  },
  counterTotal: {
    color: tone.muted,
  },
  stage: {
    gridColumn: { default: "1 / -1", [media.desktop]: "1 / 10" },
    gridRow: { default: "auto", [media.desktop]: "1" },
    minWidth: 0,
  },
  intro: {
    display: "flex",
    flexDirection: "column",
  },
  number: {
    margin: 0,
    fontFamily: face.numeral,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    fontVariantNumeric: "tabular-nums",
    color: colors.brandGreen700,
  },
  title: {
    margin: 0,
    marginTop: 8,
    fontSize: { default: 22, [media.table]: 24 },
    fontWeight: 500,
    lineHeight: { default: "30px", [media.table]: "32px" },
    letterSpacing: "0.04em",
    color: tone.ink,
    textWrap: "balance",
  },
  subtitle: {
    margin: 0,
    marginTop: 8,
    maxWidth: "36em",
    fontSize: 15,
    lineHeight: "24px",
    color: tone.body,
    textWrap: "pretty",
  },
  sideToggle: {
    marginTop: { default: 24, [media.table]: 28 },
  },
  perspective: {
    marginTop: 16,
    perspective: "2400px",
  },
  flipper: {
    display: "grid",
    minHeight: { default: 0, [media.table]: 440 },
    transformStyle: "preserve-3d",
  },
  side: {
    gridArea: "1 / 1",
    boxSizing: "border-box",
    minWidth: 0,
    paddingTop: { default: 20, [media.table]: 28, [media.desktop]: 32 },
    paddingBottom: { default: 4, [media.table]: 12 },
    paddingInline: { default: 20, [media.table]: 32, [media.desktop]: 40 },
    backgroundColor: tone.paper,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.sheetEdge,
    borderRadius: 2,
    boxShadow: "0 1px 2px rgba(20, 72, 72, 0.06)",
    backfaceVisibility: "hidden",
    transitionProperty: "opacity",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  },
  sideTurned: {
    transform: "rotateY(180deg)",
  },
  sideHidden: {
    opacity: 0,
  },
  caption: {
    margin: 0,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.ink,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0.08em",
    color: tone.muted,
  },
  fields: {
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [media.table]: "112px minmax(0, 1fr)" },
    columnGap: 24,
    rowGap: 6,
    paddingBlock: { default: 16, [media.table]: 20 },
    borderBottomWidth: { default: 1, ":last-child": 0 },
    borderBottomStyle: "solid",
    borderBottomColor: tone.solutionsRule,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: { default: "20px", [media.table]: "26px" },
    letterSpacing: "0.04em",
    color: tone.muted,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    maxWidth: "38em",
    fontSize: 15,
    lineHeight: "26px",
    color: tone.ink,
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
  absent: {
    color: tone.muted,
  },
});

function SheetFace({
  side,
  item,
  shown,
  reduce,
}: {
  side: SheetSide;
  item: SolutionItem;
  shown: boolean;
  reduce: boolean;
}) {
  return (
    <div
      inert={!shown}
      aria-hidden={!shown}
      {...stylex.props(
        styles.side,
        side.id === "back" && !reduce && styles.sideTurned,
        reduce && !shown && styles.sideHidden,
      )}
    >
      <p {...stylex.props(styles.caption)}>{side.label}</p>
      <dl {...stylex.props(styles.fields)}>
        {side.fields(item).map((field) => (
          <div key={field.label} {...stylex.props(styles.field)}>
            <dt {...stylex.props(styles.fieldLabel)}>{field.label}</dt>
            <dd {...stylex.props(styles.fieldValue)}>
              {field.lines.length > 0 ? (
                <ul {...stylex.props(styles.lines)}>
                  {field.lines.map((line) => (
                    <li key={line} {...stylex.props(styles.line)}>
                      {line}
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <span aria-hidden="true" {...stylex.props(styles.absent)}>
                    —
                  </span>
                  <span {...stylex.props(ui.srOnly)}>无</span>
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Solutions() {
  const reduce = useReducedMotion();
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const selectId = `${baseId}-select`;
  const stageId = `${baseId}-stage`;
  const sheetId = `${baseId}-sheet`;
  const [index, setIndex] = useState(0);
  const [sideId, setSideId] = useState<FaceId>("front");
  const [routed, setRouted] = useState(false);
  const item = SOLUTION_ITEMS[index];
  const flipped = sideId === "back";

  const route = (next: number) => {
    if (next < 0 || next >= SOLUTION_ITEMS.length || next === index) return;
    setIndex(next);
    setSideId("front");
    setRouted(true);
  };

  return (
    <section
      id="products-solutions"
      aria-labelledby={titleId}
      {...stylex.props(ui.section, styles.ground)}
    >
      <div {...stylex.props(ui.shell)}>
        <header {...stylex.props(styles.head)}>
          <h2 id={titleId} {...stylex.props(ui.sectionTitle)}>
            应用方案
          </h2>
        </header>
        <div {...stylex.props(styles.layout)}>
          <div role="group" aria-label="方案切换" {...stylex.props(styles.rail)}>
            <label htmlFor={selectId} {...stylex.props(ui.srOnly)}>
              选择方案
            </label>
            <div {...stylex.props(styles.selectWrap)}>
              <select
                id={selectId}
                value={index}
                aria-controls={stageId}
                onChange={(event) => route(Number(event.target.value))}
                {...stylex.props(styles.select)}
              >
                {SOLUTION_ITEMS.map((solution, solutionIndex) => (
                  <option key={solution.id} value={solutionIndex}>
                    {`${padIndex(solutionIndex)}  ${solution.title}`}
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
            <div {...stylex.props(styles.stepper)}>
              <button
                type="button"
                aria-label="上一个"
                aria-controls={stageId}
                disabled={index === 0}
                onClick={() => route(index - 1)}
                {...stylex.props(styles.stepButton)}
              >
                <ArrowLeft size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              </button>
              <p {...stylex.props(styles.counter)}>
                {padIndex(index)}
                <span {...stylex.props(styles.counterTotal)}> / {TOTAL}</span>
              </p>
              <button
                type="button"
                aria-label="下一个"
                aria-controls={stageId}
                disabled={index === SOLUTION_ITEMS.length - 1}
                onClick={() => route(index + 1)}
                {...stylex.props(styles.stepButton)}
              >
                <ArrowRight size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              </button>
            </div>
            <p aria-live="polite" {...stylex.props(ui.srOnly)}>
              {routed ? `${padIndex(index)} / ${TOTAL} ${item.title}` : ""}
            </p>
          </div>
          <div id={stageId} {...stylex.props(styles.stage)}>
            <m.div
              key={item.id}
              initial={routed ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
            >
              <div {...stylex.props(styles.intro)}>
                <p {...stylex.props(styles.number)}>{padIndex(index)}</p>
                <h3 {...stylex.props(styles.title)}>{item.title}</h3>
                <p {...stylex.props(styles.subtitle)}>{item.subtitle}</p>
              </div>
              <div {...stylex.props(styles.sideToggle)}>
                <SegmentTrack role="group" aria-label="正反面" stretch>
                  {SIDES.map((side) => (
                    <SegmentButton
                      key={side.id}
                      aria-pressed={side.id === sideId}
                      aria-controls={sheetId}
                      selected={side.id === sideId}
                      stretch
                      onClick={() => setSideId(side.id)}
                    >
                      {side.label}
                    </SegmentButton>
                  ))}
                </SegmentTrack>
              </div>
              <div id={sheetId} {...stylex.props(styles.perspective)}>
                <m.div
                  initial={false}
                  animate={{ rotateY: flipped && !reduce ? 180 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                  {...stylex.props(styles.flipper)}
                >
                  {SIDES.map((side) => (
                    <SheetFace
                      key={side.id}
                      side={side}
                      item={item}
                      shown={side.id === sideId}
                      reduce={reduce}
                    />
                  ))}
                </m.div>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
