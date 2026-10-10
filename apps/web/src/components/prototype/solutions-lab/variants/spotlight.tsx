import * as stylex from "@stylexjs/stylex";
import { m } from "motion/react";
import { Fragment, useId, useRef, useState, type KeyboardEvent } from "react";

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
import { bp, face, motion, tone } from "../tokens.stylex";

const HEADER_OFFSET = 80;
const REVEAL_MARGIN = 24;
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const NO_BREAK_SPACE = String.fromCharCode(0xa0);
const TRAILING_NOTE = /^(.+?)\s*[（(]([^（）()]+)[）)]$/;
const INGREDIENTS_LABEL = "功能性成分";

const splitNote = (text: string) => {
  const match = TRAILING_NOTE.exec(text);
  return match ? { primary: match[1] ?? text, note: match[2] ?? null } : { primary: text, note: null };
};

const TAB_STEPS: Record<string, (index: number, count: number) => number> = {
  ArrowDown: (index, count) => (index + 1) % count,
  ArrowRight: (index, count) => (index + 1) % count,
  ArrowUp: (index, count) => (index - 1 + count) % count,
  ArrowLeft: (index, count) => (index - 1 + count) % count,
  Home: () => 0,
  End: (_, count) => count - 1,
};

const styles = stylex.create({
  hero: {
    marginTop: { default: 32, [bp.xl]: 48 },
    paddingTop: { default: 20, [bp.xl]: 28 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.ink,
    scrollMarginTop: HEADER_OFFSET,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 4,
  },
  heroMeta: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 16,
    margin: 0,
  },
  heroArea: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    minWidth: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintInk,
  },
  english: {
    fontFamily: face.display,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: tone.tintMuted,
  },
  heroPosition: {
    flexShrink: 0,
    fontFamily: face.display,
    fontSize: 13,
    lineHeight: "20px",
    letterSpacing: "0.06em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  heroPositionCurrent: {
    color: tone.ink,
  },
  heroTitle: {
    margin: 0,
    marginTop: { default: 20, [bp.xl]: 28 },
    maxWidth: "18em",
    fontSize: { default: 28, [bp.md]: 36, [bp.xl]: 40 },
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "0.02em",
    textWrap: "balance",
    color: tone.ink,
  },
  heroSubtitle: {
    margin: 0,
    marginTop: { default: 12, [bp.xl]: 16 },
    maxWidth: "36em",
    fontSize: { default: 16, [bp.md]: 18 },
    lineHeight: 1.6,
    textWrap: "pretty",
    color: tone.tintBody,
  },
  ingredients: {
    gridColumn: { default: null, [bp.xl]: "1 / -1" },
    gridRow: { default: null, [bp.xl]: "1" },
    display: "grid",
    gridTemplateColumns: { default: "minmax(0, 1fr)", [bp.md]: "96px minmax(0, 1fr)" },
    alignItems: "baseline",
    columnGap: 16,
    rowGap: 10,
    marginTop: { default: 28, [bp.xl]: 40 },
    paddingBlock: { default: 16, [bp.md]: 20 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
  },
  label: {
    margin: 0,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    color: tone.tintMuted,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  chip: {
    display: "inline-flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    columnGap: 6,
    maxWidth: "100%",
    paddingBlock: 4,
    paddingInline: 12,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tone.tintRule,
    borderRadius: 15,
    fontSize: 13,
    fontWeight: 500,
    lineHeight: "20px",
    color: tone.tintInk,
    wordBreak: "keep-all",
    overflowWrap: "anywhere",
  },
  chipNote: {
    fontSize: 12,
    fontWeight: 400,
    color: tone.tintMuted,
  },
  fields: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.xl]: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr)",
    },
    gridTemplateRows: { default: "none", [bp.xl]: "auto auto 1fr" },
    columnGap: { default: 0, [bp.xl]: 48 },
    margin: 0,
  },
  field: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr)",
      [bp.md]: "96px minmax(0, 1fr)",
      [bp.xl]: "minmax(0, 1fr)",
    },
    alignContent: "start",
    columnGap: 16,
    rowGap: 6,
    paddingTop: { default: 16, [bp.md]: 20 },
    paddingBottom: { default: 16, [bp.md]: 20, [bp.xl]: 28 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.tintRuleSoft,
  },
  placeOverview: {
    gridColumn: { default: null, [bp.xl]: "1" },
    gridRow: { default: null, [bp.xl]: "2 / span 2" },
  },
  placeFunctions: {
    gridColumn: { default: null, [bp.xl]: "2" },
    gridRow: { default: null, [bp.xl]: "2" },
  },
  placeChallenges: {
    gridColumn: { default: null, [bp.xl]: "2" },
    gridRow: { default: null, [bp.xl]: "3" },
  },
  placeTexture: {
    gridColumn: { default: null, [bp.xl]: "3" },
    gridRow: { default: null, [bp.xl]: "2" },
  },
  placeApplications: {
    gridColumn: { default: null, [bp.xl]: "3" },
    gridRow: { default: null, [bp.xl]: "3" },
  },
  fieldValue: {
    margin: 0,
    minWidth: 0,
    fontSize: 15,
    lineHeight: "24px",
    textWrap: "pretty",
    color: tone.tintInk,
  },
  lines: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
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
  heroFoot: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: { default: 12, [bp.xl]: 4 },
  },
  next: {
    display: "inline-flex",
    alignItems: "baseline",
    gap: 10,
    minWidth: 0,
    maxWidth: "100%",
    paddingBlock: 8,
    paddingInline: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    color: tone.tintInk,
    cursor: "pointer",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 4,
    borderRadius: 4,
  },
  nextLabel: {
    flexShrink: 0,
    fontSize: 12,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  nextName: {
    overflow: "hidden",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    color: {
      default: tone.tintInk,
      [stylex.when.ancestor(":hover")]: { default: tone.tintInk, [bp.hover]: tone.accent },
    },
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
  },
  nextArrow: {
    flexShrink: 0,
    fontFamily: face.display,
    fontSize: 15,
    color: tone.tintMuted,
    transform: {
      default: "none",
      [stylex.when.ancestor(":hover")]: { default: "none", [bp.hover]: "translateX(3px)" },
    },
    transitionProperty: "transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "180ms" },
    transitionTimingFunction: motion.easeOut,
  },
  contents: {
    marginTop: { default: 56, [bp.xl]: 96 },
    paddingTop: { default: 20, [bp.xl]: 28 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.ink,
  },
  contentsHead: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    marginBottom: { default: 16, [bp.xl]: 28 },
  },
  contentsTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "0.12em",
    color: tone.ink,
  },
  toc: {
    columnCount: { default: 1, [bp.md]: 2, [bp.xl]: 3 },
    columnGap: { default: 0, [bp.md]: 40, [bp.xl]: 56 },
    columnRuleWidth: { default: 0, [bp.md]: 1 },
    columnRuleStyle: "solid",
    columnRuleColor: tone.tintRuleSoft,
  },
  tocGroup: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    margin: 0,
    marginTop: { default: 20, ":first-child": 0 },
    paddingBottom: 6,
    breakInside: "avoid",
    breakAfter: "avoid",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.08em",
    color: tone.tintInk,
  },
  entry: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    width: "100%",
    minWidth: 0,
    paddingBlock: 9,
    paddingInline: 0,
    borderWidth: 0,
    borderRadius: 4,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    textAlign: "start",
    cursor: "pointer",
    breakInside: "avoid",
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  entrySelected: {
    cursor: "default",
  },
  entryName: {
    minWidth: 0,
    fontSize: 15,
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.02em",
    textWrap: "pretty",
    color: {
      default: tone.tintBody,
      [stylex.when.ancestor(":hover")]: { default: tone.tintBody, [bp.hover]: tone.accent },
    },
    transitionProperty: "color",
    transitionDuration: { default: "0ms", [bp.motionOk]: "150ms" },
    transitionTimingFunction: motion.easeOut,
  },
  entryNameSelected: {
    fontWeight: 600,
    color: tone.ink,
  },
  entryCurrent: {
    flexShrink: 0,
    fontSize: 11,
    lineHeight: "16px",
    letterSpacing: "0.08em",
    color: tone.tintMuted,
  },
  leader: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 16,
    height: 0,
    borderBottomWidth: 1,
    borderBottomStyle: "dotted",
    borderBottomColor: "oklch(0.52 0.02 261.5 / 0.45)",
    transform: "translateY(-5px)",
  },
  entryIndex: {
    flexShrink: 0,
    fontFamily: face.display,
    fontSize: 12,
    lineHeight: "24px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  entryIndexSelected: {
    color: tone.ink,
  },
});

const placementFor = (label: string) => {
  switch (label) {
    case "概述":
      return styles.placeOverview;
    case "功能":
      return styles.placeFunctions;
    case "配方挑战":
      return styles.placeChallenges;
    case "质地":
      return styles.placeTexture;
    case "应用":
      return styles.placeApplications;
    default:
      return null;
  }
};

function RowValue({ row }: { row: SheetRow }) {
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
        {row.values.map((value) => {
          const { primary, note } = splitNote(value);
          return (
            <li key={value} {...stylex.props(styles.keepWords)}>
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

function Hero({ item, position, total }: { item: SolutionItem; position: number; total: number }) {
  const rows = sheetRows(item);
  const ingredients = rows.find((row) => row.label === INGREDIENTS_LABEL);
  const area = areaOf(item.area);
  return (
    <>
      <header>
        <p {...stylex.props(styles.heroMeta)}>
          <span {...stylex.props(styles.heroArea)}>
            {area?.label}
            <span lang="en" {...stylex.props(styles.english)}>
              {area?.englishLabel}
            </span>
          </span>
          <span {...stylex.props(styles.heroPosition)}>
            <span {...stylex.props(styles.heroPositionCurrent)}>{padIndex(position)}</span>
            {` / ${padIndex(total - 1)}`}
          </span>
        </p>
        <h3 {...stylex.props(styles.heroTitle)}>{item.title}</h3>
        <p {...stylex.props(styles.heroSubtitle)}>{item.subtitle}</p>
      </header>
      <dl {...stylex.props(styles.fields)}>
        {ingredients && (
          <div {...stylex.props(styles.ingredients)}>
            <dt {...stylex.props(styles.label)}>{ingredients.label}</dt>
            <dd {...stylex.props(styles.fieldValue)}>
              {ingredients.values.length === 0 ? (
                <span {...stylex.props(styles.absent)}>无</span>
              ) : (
                <ul {...stylex.props(styles.chips)}>
                  {ingredients.values.map((value) => {
                    const { primary, note } = splitNote(value);
                    return (
                      <li key={value} {...stylex.props(styles.chip)}>
                        <span>{primary.replaceAll(" / ", `${NO_BREAK_SPACE}/ `)}</span>
                        {note && <span {...stylex.props(styles.chipNote)}>{note}</span>}
                      </li>
                    );
                  })}
                </ul>
              )}
            </dd>
          </div>
        )}
        {rows
          .filter((row) => row.label !== INGREDIENTS_LABEL)
          .map((row) => (
            <div key={row.label} {...stylex.props(styles.field, placementFor(row.label))}>
              <dt {...stylex.props(styles.label)}>{row.label}</dt>
              <dd {...stylex.props(styles.fieldValue)}>
                <RowValue row={row} />
              </dd>
            </div>
          ))}
      </dl>
    </>
  );
}

export function SpotlightVariant() {
  const browser = useSolutionsBrowser();
  const reduce = useReducedMotion();
  const uid = useId();
  const heroRef = useRef<HTMLDivElement>(null);
  const [swapped, setSwapped] = useState(false);
  const { area, scope, groups, selected, position, select } = browser;
  const next = scope.length > 1 ? scope[(position + 1) % scope.length] : undefined;

  const choose = (id: string) => {
    if (id !== selected?.id) setSwapped(true);
    select(id);
  };

  const revealHero = () => {
    const hero = heroRef.current;
    if (!hero) return;
    const top = hero.getBoundingClientRect().top;
    if (top >= HEADER_OFFSET && top <= window.innerHeight - 200) return;
    window.scrollTo({
      top: window.scrollY + top - HEADER_OFFSET - REVEAL_MARGIN,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = TAB_STEPS[event.key];
    if (!step) return;
    event.preventDefault();
    const nextIndex = step(position, scope.length);
    const item = scope[nextIndex];
    if (!item) return;
    choose(item.id);
    event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]')[nextIndex]?.focus();
  };

  const renderEntry = (item: SolutionItem) => {
    const isSelected = item.id === selected?.id;
    return (
      <button
        key={item.id}
        type="button"
        role="tab"
        id={`${uid}-tab-${item.id}`}
        aria-selected={isSelected}
        aria-controls={`${uid}-panel`}
        tabIndex={isSelected ? 0 : -1}
        onClick={() => {
          choose(item.id);
          revealHero();
        }}
        {...stylex.props(styles.entry, isSelected && styles.entrySelected, stylex.defaultMarker())}
      >
        <span {...stylex.props(styles.entryName, isSelected && styles.entryNameSelected)}>
          {item.title}
        </span>
        {isSelected && <span {...stylex.props(styles.entryCurrent)}>当前</span>}
        <span aria-hidden="true" {...stylex.props(styles.leader)} />
        <span {...stylex.props(styles.entryIndex, isSelected && styles.entryIndexSelected)}>
          {padIndex(scope.indexOf(item))}
        </span>
      </button>
    );
  };

  return (
    <LabSection>
      <AreaChips browser={browser} />
      {selected && (
        <div
          ref={heroRef}
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${selected.id}`}
          tabIndex={0}
          {...stylex.props(styles.hero)}
        >
          <m.div
            key={selected.id}
            initial={swapped ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: EASE_OUT }}
          >
            <Hero item={selected} position={position} total={scope.length} />
          </m.div>
          {next && (
            <div {...stylex.props(styles.heroFoot)}>
              <button
                type="button"
                onClick={() => {
                  choose(next.id);
                  revealHero();
                }}
                {...stylex.props(styles.next, stylex.defaultMarker())}
              >
                <span {...stylex.props(styles.nextLabel)}>下一个</span>
                <span {...stylex.props(styles.nextName)}>{next.title}</span>
                <span aria-hidden="true" {...stylex.props(styles.nextArrow)}>
                  →
                </span>
              </button>
            </div>
          )}
        </div>
      )}
      <div {...stylex.props(styles.contents)}>
        <div {...stylex.props(styles.contentsHead)}>
          <h3 id={`${uid}-contents`} {...stylex.props(styles.contentsTitle)}>
            目录
          </h3>
          <span lang="en" {...stylex.props(styles.english)}>
            Contents
          </span>
        </div>
        <div
          role="tablist"
          aria-labelledby={`${uid}-contents`}
          aria-orientation="vertical"
          onKeyDown={handleKeyDown}
          {...stylex.props(styles.toc)}
        >
          {area === "all"
            ? groups.map((group) => (
                <Fragment key={group.id}>
                  <p aria-hidden="true" {...stylex.props(styles.tocGroup)}>
                    {group.label}
                    <span lang="en" {...stylex.props(styles.english)}>
                      {group.englishLabel}
                    </span>
                  </p>
                  {group.items.map(renderEntry)}
                </Fragment>
              ))
            : scope.map(renderEntry)}
        </div>
      </div>
    </LabSection>
  );
}
