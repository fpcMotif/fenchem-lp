import * as stylex from "@stylexjs/stylex";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import {
  SOLUTION_AREAS,
  SOLUTION_ITEMS,
  type SolutionAreaId,
  type SolutionItem,
} from "../variant-oos1/products-data";
import { layout } from "../variant-oos1/products-sections-values";
import { EXTRA_SOLUTIONS } from "../variant-oos1/worst-case-data";
import { bp, face, motion, tone } from "./tokens.stylex";

export type { SolutionAreaId, SolutionItem };
export type AreaFilter = SolutionAreaId | "all";

export const LAB_SOLUTIONS: SolutionItem[] = SOLUTION_AREAS.flatMap((area) =>
  [...SOLUTION_ITEMS, ...EXTRA_SOLUTIONS].filter((item) => item.area === area.id),
);

export const padIndex = (index: number) => String(index + 1).padStart(2, "0");

export const areaOf = (id: SolutionAreaId) => SOLUTION_AREAS.find((area) => area.id === id);

export type SheetRow = {
  label: string;
  kind: "lines" | "strong" | "list" | "plain";
  values: string[];
};

export const sheetRows = (item: SolutionItem): SheetRow[] => [
  { label: "概述", kind: "lines", values: item.overview },
  { label: "功能", kind: "strong", values: item.functions },
  { label: "配方挑战", kind: "lines", values: item.challenges },
  { label: "功能性成分", kind: "list", values: item.keyIngredients },
  { label: "质地", kind: "plain", values: item.texture },
  { label: "应用", kind: "plain", values: item.applications },
];

export function useSolutionsBrowser(initialArea: AreaFilter = "all") {
  const solutions = LAB_SOLUTIONS;
  const [area, setArea] = useState<AreaFilter>(initialArea);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    initialArea === "all"
      ? solutions[0]?.id
      : solutions.find((item) => item.area === initialArea)?.id,
  );

  const scope = useMemo(
    () => (area === "all" ? solutions : solutions.filter((item) => item.area === area)),
    [area, solutions],
  );
  const position = Math.max(
    0,
    scope.findIndex((item) => item.id === selectedId),
  );
  const selected = scope[position];
  const groups = SOLUTION_AREAS.map((entry) => ({
    ...entry,
    items: scope.filter((item) => item.area === entry.id),
  })).filter((group) => group.items.length > 0);
  const chips = [{ id: "all" as const, label: "全部" }, ...SOLUTION_AREAS]
    .map((entry) => ({
      id: entry.id as AreaFilter,
      label: entry.label,
      count:
        entry.id === "all"
          ? solutions.length
          : solutions.filter((item) => item.area === entry.id).length,
    }))
    .filter((entry) => entry.count > 0);

  const chooseArea = (next: AreaFilter) => {
    setArea(next);
    if (next !== "all" && selected?.area !== next) {
      setSelectedId(solutions.find((item) => item.area === next)?.id);
    }
  };

  return {
    solutions,
    area,
    chooseArea,
    chips,
    scope,
    groups,
    selected,
    position,
    select: setSelectedId,
  };
}

export type SolutionsBrowser = ReturnType<typeof useSolutionsBrowser>;

const styles = stylex.create({
  section: {
    paddingBlock: { default: 72, [bp.xl]: 128 },
    fontFamily: face.body,
    color: tone.ink,
  },
  head: {
    marginBottom: { default: 32, [bp.xl]: 56 },
  },
  eyebrow: {
    margin: 0,
    marginBottom: 12,
    fontFamily: face.display,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: tone.accent,
  },
  title: {
    margin: 0,
    fontSize: { default: 26, [bp.tablet]: 32, [bp.xl]: 40 },
    fontWeight: 700,
    lineHeight: 1.2,
    color: tone.ink,
  },
  areaList: {
    position: "relative",
    display: "flex",
    flexWrap: { default: "nowrap", [bp.xl]: "wrap" },
    gap: 8,
    minWidth: 0,
    marginInline: { default: -16, [bp.tablet]: -40, [bp.xl]: 0 },
    paddingInline: { default: 16, [bp.tablet]: 40, [bp.xl]: 0 },
    paddingBlock: 4,
    scrollPaddingInline: { default: 16, [bp.tablet]: 40, [bp.xl]: 0 },
    overflowX: { default: "auto", [bp.xl]: "visible" },
    scrollbarWidth: "none",
    overscrollBehaviorX: "contain",
  },
  area: {
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    height: 40,
    paddingInline: 16,
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: 999,
    backgroundColor: {
      default: tone.tintFill,
      ":hover": { default: tone.tintFill, [bp.hover]: tone.accentTint },
    },
    fontFamily: "inherit",
    color: {
      default: tone.tintBody,
      ":hover": { default: tone.tintBody, [bp.hover]: tone.tintInk },
    },
    cursor: "pointer",
    transform: { default: null, ":active": "scale(0.96)" },
    transitionProperty: "background-color, color, transform",
    transitionDuration: { default: "0ms", [bp.motionOk]: "160ms" },
    transitionTimingFunction: motion.easeOut,
    outlineStyle: { default: "none", ":focus-visible": "solid" },
    outlineWidth: 2,
    outlineColor: tone.accent,
    outlineOffset: 2,
  },
  areaActive: {
    backgroundColor: tone.accent,
    color: tone.paper,
    cursor: "default",
    transform: "none",
  },
  areaLabel: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
  },
  areaCount: {
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0.04em",
    fontVariantNumeric: "tabular-nums",
    color: tone.tintMuted,
  },
  areaCountActive: {
    color: "rgba(255, 255, 255, 0.72)",
  },
});

export function LabSection({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="lab-solutions-title" {...stylex.props(styles.section)}>
      <div {...stylex.props(layout.shell, layout.inset)}>
        <header {...stylex.props(styles.head)}>
          <p lang="en" {...stylex.props(styles.eyebrow)}>
            Solutions
          </p>
          <h2 id="lab-solutions-title" {...stylex.props(styles.title)}>
            应用方案
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}

export function AreaChips({ browser }: { browser: SolutionsBrowser }) {
  const listRef = useRef<HTMLDivElement>(null);
  const { area, chips, chooseArea } = browser;

  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!list || !chip || list.scrollWidth <= list.clientWidth) return;
    const left = chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [area]);

  return (
    <div ref={listRef} role="group" aria-label="按应用领域筛选" {...stylex.props(styles.areaList)}>
      {chips.map((entry) => {
        const isActive = area === entry.id;
        return (
          <button
            key={entry.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => chooseArea(entry.id)}
            {...stylex.props(styles.area, isActive && styles.areaActive)}
          >
            <span {...stylex.props(styles.areaLabel)}>{entry.label}</span>
            <span {...stylex.props(styles.areaCount, isActive && styles.areaCountActive)}>
              {entry.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
