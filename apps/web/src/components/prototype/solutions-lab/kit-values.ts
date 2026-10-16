import {
  SOLUTION_AREAS,
  SOLUTION_ITEMS,
  type SolutionAreaId,
  type SolutionItem,
} from "../variant-oos1/products-data";
import { EXTRA_SOLUTIONS } from "../variant-oos1/worst-case-data";

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
