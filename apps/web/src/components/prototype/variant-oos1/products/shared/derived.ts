import {
  CATALOG_GROUPS,
  SOLUTION_ITEMS,
  type CatalogGroup,
  type CatalogItem,
  type SolutionItem,
} from "../../products-data";

export type RegionId = CatalogGroup["id"];

export interface RegionMeta {
  english: string;
  short: string;
  latitude: number | null;
  origin: string;
}

export const REGION_META: Record<string, RegionMeta> = {
  brazil: {
    english: "Amazon & Latin America",
    short: "巴西拉美",
    latitude: -10,
    origin: "亚马逊雨林",
  },
  mediterranean: { english: "Mediterranean", short: "地中海", latitude: 37, origin: "地中海沿岸" },
  "south-africa": { english: "Southern Africa", short: "南非", latitude: -29, origin: "南非旷野" },
  "north-america": { english: "North America", short: "北美", latitude: 42, origin: "北美大陆" },
  active: { english: "Actives", short: "活性物", latitude: null, origin: "实验室" },
  other: { english: "Formulation aids", short: "其他", latitude: null, origin: "实验室" },
};

export const splitTitle = (text: string) => {
  const open = text.indexOf(" (");
  if (open === -1 || !text.endsWith(")")) return { primary: text, secondary: null };
  return { primary: text.slice(0, open), secondary: text.slice(open + 2, -1) };
};

const LATIN_IN_INCI = /（([^）]+)）/g;

const binomial = (upper: string) => {
  const [genus = "", ...rest] = upper.trim().toLowerCase().split(/\s+/);
  return [genus.charAt(0).toUpperCase() + genus.slice(1), ...rest].join(" ");
};

export const latinNames = (inci: string): string[] =>
  Array.from(inci.matchAll(LATIN_IN_INCI), (match) => binomial(match[1] ?? ""));

export const inciWithoutLatin = (inci: string) => inci.replace(LATIN_IN_INCI, "");

export type Form = "liquid" | "solid" | "wax" | "extract" | "water" | "unspecified";

export const FORM_LABEL: Record<Form, string> = {
  liquid: "液态油",
  solid: "固态脂",
  wax: "蜡",
  extract: "提取物 / 活性物",
  water: "花水",
  unspecified: "未注明",
};

export type FunctionTag =
  | "保湿滋润"
  | "修护屏障"
  | "抗氧化"
  | "舒缓抗炎"
  | "抗皱紧致"
  | "美白提亮"
  | "护发"
  | "硅油替代"
  | "彩妆"
  | "基础油"
  | "配方助剂";

export const FUNCTION_TAGS: FunctionTag[] = [
  "保湿滋润",
  "修护屏障",
  "抗氧化",
  "舒缓抗炎",
  "抗皱紧致",
  "美白提亮",
  "护发",
  "硅油替代",
  "彩妆",
  "基础油",
  "配方助剂",
];

export interface ItemTraits {
  color: string | null;
  colorWord: string | null;
  colorStated: boolean;
  form: Form;
  tags: FunctionTag[];
}

export const ITEM_TRAITS: Record<string, ItemTraits> = {
  "brazil-01": {
    color: "#efe6c8",
    colorWord: "乳白",
    colorStated: false,
    form: "solid",
    tags: ["保湿滋润", "硅油替代"],
  },
  "brazil-02": {
    color: "#f1e9d2",
    colorWord: "乳白",
    colorStated: false,
    form: "solid",
    tags: ["保湿滋润"],
  },
  "brazil-03": {
    color: "#7a4a22",
    colorWord: "深棕色",
    colorStated: true,
    form: "liquid",
    tags: ["舒缓抗炎", "修护屏障"],
  },
  "brazil-04": {
    color: "#6d6a2c",
    colorWord: "棕绿色",
    colorStated: true,
    form: "liquid",
    tags: ["抗氧化"],
  },
  "brazil-05": {
    color: "#d4561f",
    colorWord: "橙红色",
    colorStated: true,
    form: "liquid",
    tags: ["保湿滋润", "彩妆"],
  },
  "brazil-06": {
    color: "#2f4a22",
    colorWord: "深绿色",
    colorStated: true,
    form: "liquid",
    tags: ["抗氧化", "抗皱紧致"],
  },
  "brazil-07": {
    color: "#e0702a",
    colorWord: "橙红色",
    colorStated: true,
    form: "liquid",
    tags: ["护发", "抗氧化"],
  },
  "brazil-08": {
    color: "#f3ead0",
    colorWord: "类白至淡黄色",
    colorStated: true,
    form: "liquid",
    tags: ["护发", "保湿滋润"],
  },
  "brazil-09": {
    color: "#efd98a",
    colorWord: "淡黄色",
    colorStated: true,
    form: "liquid",
    tags: ["修护屏障", "抗氧化", "护发"],
  },
  "brazil-10": {
    color: "#ead27a",
    colorWord: "淡黄",
    colorStated: false,
    form: "liquid",
    tags: ["抗皱紧致", "护发", "硅油替代"],
  },
  "brazil-11": {
    color: "#d9a62e",
    colorWord: "金黄色",
    colorStated: true,
    form: "liquid",
    tags: ["护发", "舒缓抗炎", "修护屏障"],
  },
  "brazil-12": {
    color: "#d8c070",
    colorWord: "浅黄",
    colorStated: false,
    form: "wax",
    tags: ["彩妆"],
  },
  "mediterranean-01": {
    color: "#f4eedd",
    colorWord: "乳白色",
    colorStated: true,
    form: "solid",
    tags: ["保湿滋润"],
  },
  "mediterranean-02": {
    color: "#f0dc9a",
    colorWord: "淡黄",
    colorStated: false,
    form: "liquid",
    tags: ["保湿滋润", "基础油"],
  },
  "mediterranean-03": {
    color: "#e2b94a",
    colorWord: "金色 / 无色",
    colorStated: true,
    form: "liquid",
    tags: ["保湿滋润", "基础油"],
  },
  "mediterranean-04": {
    color: "#f7f7f2",
    colorWord: "无色",
    colorStated: true,
    form: "liquid",
    tags: ["基础油", "保湿滋润"],
  },
  "mediterranean-05": {
    color: "#efdf98",
    colorWord: "淡黄色",
    colorStated: true,
    form: "liquid",
    tags: ["基础油", "保湿滋润"],
  },
  "mediterranean-06": {
    color: "#e6d77c",
    colorWord: "淡黄色",
    colorStated: true,
    form: "liquid",
    tags: ["基础油"],
  },
  "mediterranean-07": {
    color: "#d9d88a",
    colorWord: "淡黄绿",
    colorStated: false,
    form: "liquid",
    tags: ["抗氧化", "基础油"],
  },
  "mediterranean-08": {
    color: "#f0dc7c",
    colorWord: "淡黄",
    colorStated: false,
    form: "liquid",
    tags: ["基础油", "保湿滋润"],
  },
  "mediterranean-09": {
    color: "#efdf9c",
    colorWord: "淡黄",
    colorStated: false,
    form: "liquid",
    tags: ["保湿滋润"],
  },
  "mediterranean-10": {
    color: "#e3b64c",
    colorWord: "金黄",
    colorStated: false,
    form: "liquid",
    tags: ["修护屏障", "护发"],
  },
  "mediterranean-11": {
    color: "#8a9a3a",
    colorWord: "绿色",
    colorStated: false,
    form: "liquid",
    tags: ["修护屏障", "舒缓抗炎", "保湿滋润"],
  },
  "mediterranean-12": {
    color: "#f2e2a6",
    colorWord: "淡黄色",
    colorStated: true,
    form: "solid",
    tags: ["保湿滋润"],
  },
  "mediterranean-13": {
    color: "#f0d48a",
    colorWord: "淡黄色",
    colorStated: true,
    form: "liquid",
    tags: ["修护屏障", "舒缓抗炎"],
  },
  "mediterranean-14": {
    color: "#eadf9e",
    colorWord: "淡黄",
    colorStated: false,
    form: "liquid",
    tags: ["修护屏障", "舒缓抗炎"],
  },
  "mediterranean-15": {
    color: "#efe3a8",
    colorWord: "淡黄",
    colorStated: false,
    form: "liquid",
    tags: ["彩妆", "护发"],
  },
  "south-africa-01": {
    color: "#e8c25a",
    colorWord: "金黄",
    colorStated: false,
    form: "liquid",
    tags: ["保湿滋润", "舒缓抗炎", "护发"],
  },
  "south-africa-02": {
    color: "#ecd580",
    colorWord: "淡黄",
    colorStated: false,
    form: "liquid",
    tags: ["抗氧化", "保湿滋润", "护发"],
  },
  "south-africa-03": {
    color: "#ecd690",
    colorWord: "淡黄色",
    colorStated: true,
    form: "liquid",
    tags: ["修护屏障"],
  },
  "south-africa-04": {
    color: "#eadbb0",
    colorWord: "淡黄",
    colorStated: false,
    form: "solid",
    tags: ["保湿滋润", "修护屏障"],
  },
  "north-america-01": {
    color: "#f1e4a8",
    colorWord: "淡黄",
    colorStated: false,
    form: "liquid",
    tags: ["保湿滋润", "彩妆"],
  },
  "north-america-02": {
    color: "#eee0a0",
    colorWord: "淡黄",
    colorStated: false,
    form: "liquid",
    tags: ["护发", "硅油替代"],
  },
  "active-01": {
    color: null,
    colorWord: null,
    colorStated: false,
    form: "extract",
    tags: ["舒缓抗炎"],
  },
  "active-02": {
    color: null,
    colorWord: null,
    colorStated: false,
    form: "extract",
    tags: ["抗皱紧致"],
  },
  "active-03": {
    color: null,
    colorWord: null,
    colorStated: false,
    form: "extract",
    tags: ["美白提亮"],
  },
  "active-04": {
    color: null,
    colorWord: null,
    colorStated: false,
    form: "extract",
    tags: ["美白提亮"],
  },
  "active-05": {
    color: null,
    colorWord: null,
    colorStated: false,
    form: "extract",
    tags: ["美白提亮", "抗氧化"],
  },
  "other-01": {
    color: null,
    colorWord: null,
    colorStated: false,
    form: "unspecified",
    tags: ["配方助剂"],
  },
  "other-02": {
    color: "#f6f4ea",
    colorWord: "无色",
    colorStated: false,
    form: "liquid",
    tags: ["基础油"],
  },
  "other-03": {
    color: "#f6f4ea",
    colorWord: "无色",
    colorStated: false,
    form: "liquid",
    tags: ["配方助剂"],
  },
  "other-04": {
    color: "#f5f2f2",
    colorWord: "无色",
    colorStated: false,
    form: "water",
    tags: ["保湿滋润"],
  },
};

export interface FlatItem extends CatalogItem {
  group: CatalogGroup;
  groupIndex: number;
  primary: string;
  secondary: string | null;
  latin: string[];
  traits: ItemTraits;
}

export const FLAT_ITEMS: FlatItem[] = CATALOG_GROUPS.flatMap((group, groupIndex) =>
  group.items.map((item) => {
    const { primary, secondary } = splitTitle(item.title);
    return {
      ...item,
      group,
      groupIndex,
      primary,
      secondary,
      latin: latinNames(item.inci),
      traits: ITEM_TRAITS[item.id] ?? {
        color: null,
        colorWord: null,
        colorStated: false,
        form: "unspecified",
        tags: [],
      },
    };
  }),
);

export const ITEM_BY_ID: Record<string, FlatItem> = Object.fromEntries(
  FLAT_ITEMS.map((item) => [item.id, item]),
);

export type Vessel = "jar" | "spray" | "pump" | "tube" | "dropper" | "bottle";
export type TextureFamily = "水" | "油" | "乳" | "霜" | "膏";
export type Zone = "面部" | "手部" | "身体" | "头发";
export type FormulaTag = "清洁" | "保湿" | "滋养" | "舒缓" | "修护" | "美白" | "防晒" | "护发";

export const TEXTURE_FAMILIES: TextureFamily[] = ["水", "油", "乳", "霜", "膏"];
export const ZONES: Zone[] = ["面部", "手部", "身体", "头发"];
export const FORMULA_TAGS: FormulaTag[] = [
  "清洁",
  "保湿",
  "滋养",
  "舒缓",
  "修护",
  "美白",
  "防晒",
  "护发",
];

export interface Ingredient {
  id: string;
  label: string;
  englishLabel: string;
  catalogId: string | null;
}

export const INGREDIENTS: Ingredient[] = [
  { id: "ha4d", label: "4D 玻尿酸", englishLabel: "4D Hyaluronic Acid", catalogId: null },
  {
    id: "squalane",
    label: "橄榄角鲨烷",
    englishLabel: "Olive Squalane",
    catalogId: "mediterranean-04",
  },
  {
    id: "meadowfoam",
    label: "白池花籽油",
    englishLabel: "Meadowfoam Seed Oil",
    catalogId: "north-america-01",
  },
  { id: "shea", label: "乳木果油", englishLabel: "Shea Butter", catalogId: "mediterranean-01" },
  {
    id: "shea-oil",
    label: "液态乳木果油",
    englishLabel: "Liquid Shea Oil",
    catalogId: "mediterranean-02",
  },
  { id: "calmist", label: "AT Calm-ist™", englishLabel: "AT Calm-ist™", catalogId: "active-01" },
  { id: "jojoba", label: "霍霍巴油", englishLabel: "Jojoba Oil", catalogId: "mediterranean-03" },
  { id: "avocado", label: "鳄梨油", englishLabel: "Avocado Oil", catalogId: "mediterranean-11" },
  { id: "bisabolol", label: "红没药醇", englishLabel: "Bisabolol", catalogId: null },
  { id: "allantoin", label: "尿囊素", englishLabel: "Allantoin", catalogId: null },
  {
    id: "cupuacu",
    label: "大花可可树籽脂",
    englishLabel: "Cupuaçu Seed Butter",
    catalogId: "brazil-02",
  },
  {
    id: "macadamia",
    label: "澳洲坚果油",
    englishLabel: "Macadamia Nut Oil",
    catalogId: "mediterranean-09",
  },
  {
    id: "mango",
    label: "芒果籽脂",
    englishLabel: "Mango Seed Butter",
    catalogId: "mediterranean-12",
  },
  {
    id: "almond",
    label: "甜杏仁油",
    englishLabel: "Sweet Almond Oil",
    catalogId: "mediterranean-05",
  },
  { id: "argan", label: "阿甘油", englishLabel: "Argan Oil", catalogId: "mediterranean-10" },
  {
    id: "rose",
    label: "大马士革玫瑰纯露",
    englishLabel: "Damask Rose Hydrosol",
    catalogId: "other-04",
  },
  {
    id: "butylresorcinol",
    label: "4-丁基间苯二酚",
    englishLabel: "4-Butylresorcinol",
    catalogId: "active-04",
  },
  { id: "niacinamide", label: "烟酰胺", englishLabel: "Niacinamide", catalogId: null },
  { id: "clay", label: "巴西黏土", englishLabel: "Brazilian Clay", catalogId: null },
  { id: "linseed", label: "亚麻籽油", englishLabel: "Linseed Oil", catalogId: null },
  { id: "vcip", label: "VC-IP", englishLabel: "VC-IP", catalogId: null },
  {
    id: "filters",
    label: "物化防晒剂",
    englishLabel: "Mineral and chemical UV filters",
    catalogId: null,
  },
];

export const INGREDIENT_BY_ID: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((ingredient) => [ingredient.id, ingredient]),
);

export interface FormulaTraits {
  vessel: Vessel;
  family: TextureFamily;
  viscosity: number;
  zone: Zone;
  tags: FormulaTag[];
  uses: string[];
}

export const FORMULA_TRAITS: Record<string, FormulaTraits> = {
  "clay-mask": {
    vessel: "jar",
    family: "膏",
    viscosity: 92,
    zone: "面部",
    tags: ["清洁", "保湿", "舒缓"],
    uses: ["clay", "calmist", "shea", "meadowfoam", "jojoba"],
  },
  "rose-mist": {
    vessel: "spray",
    family: "水",
    viscosity: 4,
    zone: "面部",
    tags: ["保湿", "舒缓"],
    uses: ["rose", "calmist"],
  },
  "botanical-lotion": {
    vessel: "pump",
    family: "乳",
    viscosity: 45,
    zone: "身体",
    tags: ["保湿", "滋养", "舒缓"],
    uses: ["ha4d", "vcip", "allantoin", "cupuacu", "avocado", "macadamia"],
  },
  "hand-cream": {
    vessel: "tube",
    family: "膏",
    viscosity: 82,
    zone: "手部",
    tags: ["滋养", "保湿", "修护"],
    uses: ["ha4d", "shea", "mango", "meadowfoam"],
  },
  "shea-body-cream": {
    vessel: "jar",
    family: "霜",
    viscosity: 70,
    zone: "身体",
    tags: ["滋养", "舒缓"],
    uses: ["shea-oil"],
  },
  "body-oil": {
    vessel: "dropper",
    family: "油",
    viscosity: 18,
    zone: "身体",
    tags: ["滋养", "舒缓"],
    uses: ["almond", "squalane", "jojoba", "bisabolol"],
  },
  "whitening-cream": {
    vessel: "jar",
    family: "霜",
    viscosity: 62,
    zone: "面部",
    tags: ["美白", "保湿", "舒缓"],
    uses: ["butylresorcinol", "niacinamide", "ha4d", "meadowfoam", "squalane", "bisabolol"],
  },
  "shower-oil": {
    vessel: "bottle",
    family: "油",
    viscosity: 26,
    zone: "身体",
    tags: ["清洁", "滋养"],
    uses: ["avocado"],
  },
  "argan-hair-oil": {
    vessel: "dropper",
    family: "油",
    viscosity: 22,
    zone: "头发",
    tags: ["护发", "修护"],
    uses: ["argan", "linseed", "squalane"],
  },
  sunscreen: {
    vessel: "tube",
    family: "霜",
    viscosity: 58,
    zone: "面部",
    tags: ["防晒", "保湿", "舒缓"],
    uses: ["filters", "ha4d", "allantoin"],
  },
};

export const SHARED_INGREDIENT_IDS: string[] = INGREDIENTS.map(
  (ingredient) => ingredient.id,
).filter(
  (id) => Object.values(FORMULA_TRAITS).filter((traits) => traits.uses.includes(id)).length > 1,
);

export interface FlatFormula extends SolutionItem {
  index: number;
  traits: FormulaTraits;
}

export const FLAT_FORMULAS: FlatFormula[] = SOLUTION_ITEMS.map((item, index) => ({
  ...item,
  index,
  traits: FORMULA_TRAITS[item.id] as FormulaTraits,
}));

export const formulasUsing = (ingredientId: string): FlatFormula[] =>
  FLAT_FORMULAS.filter((formula) => formula.traits.uses.includes(ingredientId));

export const padIndex = (index: number) => String(index + 1).padStart(2, "0");
