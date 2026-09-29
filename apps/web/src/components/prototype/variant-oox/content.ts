import { ABOUT as FIGMA_ABOUT, PRODUCTS } from "../variant-o/content";
import { HERO as OOS_HERO } from "../variant-oos/content";

export {
  COPYRIGHT,
  FOOTER_COLUMNS,
  GLOBAL_INTRO,
  IMAGES,
  NAV_ITEMS,
  NEWS,
  NEWS_TITLE,
  OFFICE_COLUMNS,
  OFFICE_MAP_PINS,
  STATS,
  STRENGTHS,
  STRENGTHS_INTRO,
  type StrengthIcon,
  type StrengthTone,
} from "../variant-oos/content";

export const HERO = {
  ...OOS_HERO,
  title: "四大应用领域，一个可靠源头",
  motto: "创新，从源头开始",
} as const;

export const ABOUT = {
  title: "关于泛成",
  echo: "about",
  body: FIGMA_ABOUT.body,
  cta: FIGMA_ABOUT.cta,
} as const;

export const PRODUCTS_INTRO = {
  title: "产品与应用方案",
  echo: "four markets",
  eyebrow: "应用领域",
  lead: "从个人护理到人类营养、宠物健康与食品原料，泛成以稳定的品质与专业的应用支持，赋能未来健康生活。",
  hint: "继续向下滚动，横向浏览四大领域",
} as const;

const [NUTRITION, FOOD, CARE, PET] = PRODUCTS;

export const MARKETS = [
  {
    ...NUTRITION,
    id: "nutrition",
    word: "Nutrition",
    english: "human nutrition",
    pitch: "Evidence-led nutrition",
    kicker: "以科学证据为基础，覆盖肠道、女性、情绪与体重管理等细分需求。",
  },
  {
    ...FOOD,
    id: "food",
    word: "Food",
    english: "functional food",
    pitch: "Function in every bite",
    kicker: "从膳食纤维到天然色素，为现代饮食提供稳定供应的功能原料。",
  },
  {
    ...CARE,
    id: "care",
    word: "Care",
    english: "personal care",
    pitch: "Nature, made active",
    kicker: "植物油脂与活性物，以天然来源成分回应每一个配方需求。",
  },
  {
    ...PET,
    id: "pet",
    word: "Pet",
    english: "pet health",
    pitch: "Care for every companion",
    kicker: "从美毛护肤到关节健康，为宠物营养提供全面方案。",
  },
] as const;

export type Market = (typeof MARKETS)[number];

export const MARKET_CTA = { label: "咨询该方案", href: "#contact" } as const;

export const CAMPUS = {
  label: "研发与生产",
  echo: "made at source",
} as const;

export const ECHO = {
  strengths: "why us",
  strengthsRing: "WHY FENCHEM · 为什么选择泛成 · WHY FENCHEM · 为什么选择泛成 · ",
  offices: "sixteen offices",
  news: "in the field",
} as const;

export const CTA = {
  title: "告诉我们您的市场",
  echo: "let's cross over",
  lead: "无论是人类营养、功能性食品、个人护理还是宠物健康，泛成的应用团队都会与您一起完成从配方到上市的每一步。",
  action: { label: "联系我们", href: "#top" },
} as const;
