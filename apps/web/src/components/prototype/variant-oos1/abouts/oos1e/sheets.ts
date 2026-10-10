export type SheetTone = "paper" | "warm" | "navy";

export type SheetDef = {
  id: string;
  index: number;
  english: string;
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
  english: "Profile",
  tone: "paper",
  nav: "about-profile",
};

export const STATS_SHEET: SheetDef = {
  id: "about-stats",
  index: 1,
  english: "Growth figures",
  tone: "navy",
  nav: "about-profile",
};

export const CAMPUS_SHEET: SheetDef = {
  id: "about-campus",
  index: 2,
  english: "Campus",
  tone: "paper",
  nav: "about-campus",
};

export const CULTURE_SHEET: SheetDef = {
  id: "about-culture",
  index: 3,
  english: "Culture",
  tone: "warm",
  nav: "about-culture",
};

export const CSR_SHEET: SheetDef = {
  id: "about-csr",
  index: 4,
  english: "Responsibility",
  tone: "paper",
  nav: "about-csr",
};

export const HONORS_SHEET: SheetDef = {
  id: "about-honor",
  index: 5,
  english: "Honors",
  tone: "warm",
  nav: "about-honor",
};

export const STRUCTURE_SHEET: SheetDef = {
  id: "about-structure",
  index: 6,
  english: "Structure",
  tone: "paper",
  nav: "about-structure",
};

export const PRODUCTS_SHEET: SheetDef = {
  id: "about-products",
  index: 7,
  english: "Products and applications",
  tone: "warm",
  nav: null,
};

export const CLOSING_SHEET: SheetDef = {
  id: "about-cta",
  index: 8,
  english: "Open the next breakthrough together",
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
