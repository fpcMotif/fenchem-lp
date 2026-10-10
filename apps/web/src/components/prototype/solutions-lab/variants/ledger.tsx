import * as stylex from "@stylexjs/stylex";
import { Plus } from "lucide-react";
import { m, useInstantLayoutTransition } from "motion/react";
import { useId, useState } from "react";
import { flushSync } from "react-dom";

import { Collapse } from "../../shared/collapse";
import { useReducedMotion } from "../../use-reduced-motion";
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
import { bp, depth, face, motion, tone } from "../tokens.stylex";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;
const NO_BREAK_SPACE = String.fromCharCode(0xa0);

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1], note: match[2] } : { primary: text, note: null };
};

const ingredientNames = (item: SolutionItem) => [
  ...new Set(item.keyIngredients.flatMap((entry) => splitNote(entry).primary.split(" / "))),
];

const enter = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const styles = stylex.create({
  card: {
    marginTop: { default: 16, [bp.xl]: 24 },
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: { default: 12, [bp.xl]: 16 },
    backgroundColor: tone.paper,
    boxShadow: depth.card,
  },
  inline: {
    paddingInline: { default: 20, [bp.lg]: 32 },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) 32px",
      [bp.lg]: "repeat(12, minmax(0, 1fr))",
    },
    columnGap: { default: 12, [bp.lg]: 24 },
  },
  columnHead: {
    display: { default: "none", [bp.lg]: "grid" },
    paddingBlock: 14,
    backgroundColor: tone.tintHead,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  colName: { gridColumn: { default: null, [bp.lg]: "1 / 5" } },
  colPreview: { gridColumn: { default: null, [bp.lg]: "5 / 12" } },
  colToggle: { gridColumn: { default: null, [bp.lg]: "12 / 13" } },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  enter: {
    animationName: { default: "none", [bp.motionOk]: enter },
    animationDuration: "180ms",
    animationTimingFunction: motion.easeOut,
  },
  group: {
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.tintRule,
  },
  groupHeading: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
    paddingTop: { default: 22, [bp.lg]: 26 },
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tone.tintRuleSoft,
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
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
    transitionProperty: "background-color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "200ms" },
    transitionTimingFunction: motion.easeOut,
  },
  rowOpen: {
    backgroundColor: tone.accentSoft,
  },
  heading: {
    margin: 0,
  },
  trigger: {
    alignItems: "start",
    width: "100%",
    paddingBlock: 18,
    borderWidth: 0,
    backgroundColor: {
      default: "transparent",
      ":hover": { default: null, [bp.hover]: tone.tintFill },
    },
    fontFamily: "inherit",
    textAlign: "start",
    color: tone.tintInk,
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "200ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: -2,
  },
  triggerOpen: {
    backgroundColor: "transparent",
  },
  name: {
    display: "flex",
    alignItems: "baseline",
    gap: 14,
    minWidth: 0,
  },
  index: {
    flexShrink: 0,
    width: 24,
    fontSize: 12,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  indexOpen: {
    color: tone.ink,
  },
  names: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
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
  titleOpen: {
    color: tone.ink,
  },
  meta: {
    fontSize: 13,
    lineHeight: "20px",
    color: tone.tintMuted,
  },
  preview: {
    display: { default: "none", [bp.lg]: "flex" },
    alignItems: "center",
    alignSelf: "center",
    gap: 6,
    overflow: "hidden",
    maskImage: "linear-gradient(to right, #000 calc(100% - 56px), transparent)",
    opacity: 1,
    transitionProperty: "opacity",
    transitionDuration: { default: "0ms", [bp.motionOk]: "200ms" },
    transitionTimingFunction: motion.easeOut,
  },
  previewOpen: {
    opacity: 0,
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    height: 26,
    paddingInline: 10,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: 999,
    backgroundColor: tone.paper,
    fontSize: 13,
    lineHeight: "24px",
    color: tone.tintBody,
    whiteSpace: "nowrap",
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    justifySelf: "end",
    width: 32,
    height: 32,
    marginBlock: -4,
    marginInlineEnd: -6,
    borderRadius: 999,
    backgroundColor: {
      default: tone.tintFill,
      [stylex.when.ancestor(":hover")]: { default: tone.tintFill, [bp.hover]: tone.accentTint },
    },
    color: {
      default: tone.tintBody,
      [stylex.when.ancestor(":hover")]: { default: tone.tintBody, [bp.hover]: tone.accent },
    },
    transitionProperty: "background-color, color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
  },
  toggleOpen: {
    backgroundColor: tone.ink,
    color: tone.paper,
  },
  toggleGlyph: {
    display: "flex",
  },
  panelClip: {
    overflow: "hidden",
  },
  panel: {
    rowGap: 16,
    paddingBottom: { default: 20, [bp.lg]: 28 },
  },
  lead: {
    gridColumn: { default: "1 / -1", [bp.lg]: "1 / 10" },
    display: "flex",
    flexDirection: "column",
    gap: 6,
    paddingInlineStart: { default: 0, [bp.lg]: 38 },
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
    maxWidth: "40em",
    fontSize: 15,
    lineHeight: "26px",
    color: tone.tintBody,
    textWrap: "pretty",
  },
  sheet: {
    gridColumn: "1 / -1",
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.xl]: "repeat(2, minmax(0, 1fr))" },
    gridTemplateRows: { default: "none", [bp.xl]: "repeat(3, auto)" },
    gridAutoFlow: { default: "row", [bp.xl]: "column" },
    columnGap: { default: 0, [bp.xl]: 48 },
    margin: 0,
    marginInlineStart: { default: 0, [bp.lg]: 38 },
    paddingInline: { default: 16, [bp.md]: 24 },
    paddingBlock: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: 10,
    backgroundColor: tone.paper,
  },
  field: {
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.md]: "88px minmax(0, 1fr)" },
    alignContent: "start",
    columnGap: 16,
    rowGap: 4,
    paddingBlock: 14,
    borderTopWidth: {
      default: 1,
      ":first-child": 0,
      [bp.xl]: { default: 1, ":nth-child(3n+1)": 0 },
    },
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
  },
  fieldLabel: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: tone.tintMuted,
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "24px",
    color: tone.tintInk,
    textWrap: "pretty",
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    margin: 0,
    padding: 0,
    listStyleType: "none",
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
      <ul {...stylex.props(styles.lines, styles.description)}>
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
      <ul {...stylex.props(styles.lines)}>
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

function ToggleIcon({ open }: { open: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span
      aria-hidden="true"
      {...stylex.props(styles.toggle, open && styles.toggleOpen, styles.colToggle)}
    >
      <m.span
        {...stylex.props(styles.toggleGlyph)}
        initial={false}
        animate={{ rotate: open ? 45 : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT }}
      >
        <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      </m.span>
    </span>
  );
}

function SolutionRow({
  item,
  index,
  open,
  heading: Heading,
  onToggle,
}: {
  item: SolutionItem;
  index: number;
  open: boolean;
  heading: "h3" | "h4";
  onToggle: (trigger: HTMLElement) => void;
}) {
  const reduce = useReducedMotion();
  const panelId = useId();
  const area = areaOf(item.area);

  return (
    <m.li
      layout="position"
      transition={{ duration: 0.26, ease: EASE_OUT }}
      {...stylex.props(styles.row, open && styles.rowOpen)}
    >
      <Heading {...stylex.props(styles.heading, stylex.defaultMarker())}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={(event) => onToggle(event.currentTarget)}
          {...stylex.props(styles.grid, styles.inline, styles.trigger, open && styles.triggerOpen)}
        >
          <span {...stylex.props(styles.name, styles.colName)}>
            <span {...stylex.props(styles.index, open && styles.indexOpen)}>{padIndex(index)}</span>
            <span {...stylex.props(styles.names)}>
              <span {...stylex.props(styles.title, open && styles.titleOpen)}>{item.title}</span>
              <span {...stylex.props(styles.meta)}>{item.functions.join(" · ")}</span>
            </span>
          </span>
          <span
            aria-hidden="true"
            {...stylex.props(styles.preview, open && styles.previewOpen, styles.colPreview)}
          >
            {ingredientNames(item).map((name) => (
              <span key={name} {...stylex.props(styles.chip)}>
                {name}
              </span>
            ))}
          </span>
          <ToggleIcon open={open} />
        </button>
      </Heading>
      <Collapse
        id={panelId}
        open={open}
        transition={{ duration: reduce ? 0 : 0.28, ease: EASE_OUT }}
        {...stylex.props(styles.panelClip)}
      >
        <div {...stylex.props(styles.grid, styles.inline, styles.panel)}>
          <div {...stylex.props(styles.lead)}>
            {area && (
              <p {...stylex.props(styles.areaLine)}>
                <span>{area.label}</span>
                <span lang="en" {...stylex.props(styles.areaEnglish)}>
                  {area.englishLabel}
                </span>
              </p>
            )}
            <p {...stylex.props(styles.subtitle)}>{item.subtitle}</p>
          </div>
          <dl {...stylex.props(styles.sheet)}>
            {sheetRows(item).map((row) => (
              <div key={row.label} {...stylex.props(styles.field)}>
                <dt {...stylex.props(styles.fieldLabel)}>{row.label}</dt>
                <dd {...stylex.props(styles.fieldValue)}>
                  <FieldValue row={row} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Collapse>
    </m.li>
  );
}

export function LedgerVariant() {
  const browser = useSolutionsBrowser();
  const { area, scope, groups } = browser;
  const startInstantLayout = useInstantLayoutTransition();
  const [openId, setOpenId] = useState<string | null>(() => scope[0]?.id ?? null);
  const [shownArea, setShownArea] = useState(area);

  if (shownArea !== area) {
    setShownArea(area);
    setOpenId(scope[0]?.id ?? null);
  }

  const toggle = (id: string, trigger: HTMLElement) => {
    const openIndex = scope.findIndex((item) => item.id === openId);
    const index = scope.findIndex((item) => item.id === id);
    if (openIndex !== -1 && openIndex < index) {
      const triggerTop = trigger.getBoundingClientRect().top;
      startInstantLayout(() => flushSync(() => setOpenId(null)));
      window.scrollBy({
        top: trigger.getBoundingClientRect().top - triggerTop,
        behavior: "instant",
      });
    }
    setOpenId(openId === id ? null : id);
  };

  const renderRows = (items: SolutionItem[], heading: "h3" | "h4") => (
    <ul {...stylex.props(styles.list)}>
      {items.map((item, index) => (
        <SolutionRow
          key={item.id}
          item={item}
          index={index}
          open={item.id === openId}
          heading={heading}
          onToggle={(trigger) => toggle(item.id, trigger)}
        />
      ))}
    </ul>
  );

  return (
    <LabSection>
      <AreaChips browser={browser} />
      <div {...stylex.props(styles.card)}>
        <div aria-hidden="true" {...stylex.props(styles.grid, styles.inline, styles.columnHead)}>
          <span {...stylex.props(styles.colName)}>方案</span>
          <span {...stylex.props(styles.colPreview)}>核心成分</span>
        </div>
        <div key={area} {...stylex.props(styles.enter)}>
          {area === "all" ? (
            <ul {...stylex.props(styles.list)}>
              {groups.map((group) => (
                <li key={group.id} {...stylex.props(styles.group)}>
                  <h3 {...stylex.props(styles.groupHeading, styles.inline)}>
                    <span {...stylex.props(styles.groupLabel)}>{group.label}</span>
                    <span lang="en" {...stylex.props(styles.groupEnglish)}>
                      {group.englishLabel}
                    </span>
                    <span {...stylex.props(styles.groupCount)}>{group.items.length} 款</span>
                  </h3>
                  {renderRows(group.items, "h4")}
                </li>
              ))}
            </ul>
          ) : (
            renderRows(scope, "h3")
          )}
        </div>
      </div>
    </LabSection>
  );
}
