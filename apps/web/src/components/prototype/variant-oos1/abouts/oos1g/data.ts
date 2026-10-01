import { ABOUT_HERO, ABOUT_HONORS } from "../../about-data";

export const SECTION_IDS: readonly string[] = ABOUT_HERO.navChips.map((chip) => chip.id);

export const LEVEL_LABEL = {
  national: "国家级",
  provincial: "江苏省级",
  municipal: "南京市级",
} as const;

export type Level = keyof typeof LEVEL_LABEL;

export const LEVEL_ORDER: readonly Level[] = ["national", "provincial", "municipal"];

export const HONORS_BY_LEVEL = LEVEL_ORDER.map((level) => ({
  level,
  items: ABOUT_HONORS.items.filter((honor) => honor.level === level),
}));

export const MOSAIC_FOCUS: Readonly<Record<string, string>> = {
  aerial: "36% 42%",
  grounds: "50% 58%",
  reception: "50% 50%",
  lab: "50% 50%",
  showroom: "50% 55%",
  lounge: "50% 60%",
  office: "46% 50%",
};

export const MOSAIC_LEFT = ["aerial"] as const;

export const MOSAIC_RIGHT = [
  "grounds",
  "reception",
  "lab",
  "showroom",
  "lounge",
  "office",
] as const;
