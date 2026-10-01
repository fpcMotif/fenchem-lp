import { CTA } from "../../content";

export type SheetTone = "paper" | "warm" | "navy";

export type SheetDef = {
  id: string;
  index: number;
  name: string;
  tone: SheetTone;
  nav: string | null;
};

export const NAV_ENGLISH = {
  "about-profile": "Profile",
  "about-campus": "Campus",
  "about-culture": "Culture",
  "about-csr": "Responsibility",
  "about-honor": "Honors",
  "about-structure": "Structure",
} as const;

export const PROFILE_SHEET: SheetDef = {
  id: "about-profile",
  index: 0,
  name: "企业概况",
  tone: "paper",
  nav: "about-profile",
};

export const STATS_SHEET: SheetDef = {
  id: "about-stats",
  index: 1,
  name: "发展数据",
  tone: "navy",
  nav: "about-profile",
};

export const CAMPUS_SHEET: SheetDef = {
  id: "about-campus",
  index: 2,
  name: "园区环境",
  tone: "paper",
  nav: "about-campus",
};

export const CULTURE_SHEET: SheetDef = {
  id: "about-culture",
  index: 3,
  name: "企业文化",
  tone: "warm",
  nav: "about-culture",
};

export const CSR_SHEET: SheetDef = {
  id: "about-csr",
  index: 4,
  name: "社会责任",
  tone: "paper",
  nav: "about-csr",
};

export const HONORS_SHEET: SheetDef = {
  id: "about-honor",
  index: 5,
  name: "企业荣誉",
  tone: "warm",
  nav: "about-honor",
};

export const STRUCTURE_SHEET: SheetDef = {
  id: "about-structure",
  index: 6,
  name: "企业结构",
  tone: "paper",
  nav: "about-structure",
};

export const PRODUCTS_SHEET: SheetDef = {
  id: "about-products",
  index: 7,
  name: "产品与应用",
  tone: "warm",
  nav: null,
};

export const CLOSING_SHEET: SheetDef = {
  id: "about-cta",
  index: 8,
  name: CTA.title,
  tone: "paper",
  nav: null,
};

export const SHEETS: readonly SheetDef[] = [
  PROFILE_SHEET,
  STATS_SHEET,
  CAMPUS_SHEET,
  CULTURE_SHEET,
  CSR_SHEET,
  HONORS_SHEET,
  STRUCTURE_SHEET,
  PRODUCTS_SHEET,
  CLOSING_SHEET,
];

export const SHEET_IDS = SHEETS.map((sheet) => sheet.id);
