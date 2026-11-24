import {
  ABOUT as FIGMA_ABOUT,
  CTA as FIGMA_CTA,
  HERO as FIGMA_HERO,
  PRODUCTS_INTRO as FIGMA_PRODUCTS_INTRO,
  STRENGTHS as FIGMA_STRENGTHS,
} from "../variant-o/content";

export {
  COPYRIGHT,
  GLOBAL_INTRO,
  IMAGES,
  NEWS_TITLE,
  OFFICE_COLUMNS,
  PRODUCTS,
  STATS,
  STRENGTHS_INTRO,
  type StrengthIcon,
  type StrengthTone,
} from "../variant-o/content";

export const PRODUCT_MENU = [
  { id: "personal-care", label: "个人护理" },
  { id: "functional-food", label: "功能性食品" },
  { id: "human-nutrition", label: "人类营养健康" },
  { id: "pet-health", label: "宠物健康" },
] as const;

export const NAV_ITEMS = [
  { label: "首页", href: "#top" },
  { label: "关于我们", href: "#about" },
  { label: "产品与应用", href: "#products" },
  { label: "行业洞察", href: "#insights" },
  { label: "新闻资讯", href: "#news" },
  { label: "联系我们", href: "#contact" },
] as const;

export const HERO = {
  headline: ["Global ingredients", "Your next breakthrough."],
  accent: "ingredients",
  title: "创新，从源头开始",
  primary: FIGMA_HERO.primary,
  secondary: FIGMA_HERO.secondary,
} as const;

export const ABOUT = {
  ...FIGMA_ABOUT,
  lines: [
    "南京泛成生物科技有限公司是南京泛成国际控股有限公司的控股子公司，是行业内领先的原料供应商，",
    "凭借现代化生产基地和专业研发能力、遍布全球的业务和销售网络，为客户提供一站式定制化解决方案。",
    "我们经过三十余年的发展和经验积累，已成为全球范围内同行业中具有影响力的公司之一。",
  ],
  cta: { label: "更多", href: "#campus" },
} as const;

export const CTA = {
  ...FIGMA_CTA,
  title: "一起开启下一个突破",
} as const;

export const PRODUCTS_CTA_SUBTITLE =
  "需要样品、技术资料或定制配方？我们的应用团队随时为您提供支持。";

export const PRODUCTS_INTRO = {
  ...FIGMA_PRODUCTS_INTRO,
  cta: { label: "查看全部产品", href: "#product-list" },
} as const;

const STRENGTH_DESCRIPTIONS = new Map([
  ["稳定供应保障", "本地仓储与高效交付"],
  ["解决方案创新", "应用研发与技术支持"],
  ["长期合作伙伴", "帮客户打造差异化产品"],
]);

export const STRENGTHS = FIGMA_STRENGTHS.map((strength) => ({
  ...strength,
  description: strength.description ?? STRENGTH_DESCRIPTIONS.get(strength.title) ?? null,
  link: strength.link ? `了解${strength.title}` : null,
}));

export const NEWS: readonly { title: string; details: readonly string[] }[] = [
  {
    title: "1. PCHi 2027 中国国际化妆品个人及家庭护理用品原料展览会",
    details: ["2027 年 2 月 24 – 26 日 · 展位号 3D39"],
  },
  {
    title: "2. FIC 2027 中国国际食品添加剂和配料展览会",
    details: ["2027 年 3 月 17 – 19 日 · 展位号 3Y01"],
  },
  {
    title: "3. FIA 2027 亚洲食品配料中国展",
    details: ["2027 年 6 月 22 – 24 日 · 展位号 41H30"],
  },
  {
    title: "4. PCT 2027 个人护理品技术高峰论坛",
    details: ["2027 年 7 月"],
  },
];

export type FooterLink = {
  label: string;
  page?: "about" | "products" | "insights" | "news" | "contact";
};

export const FOOTER_COLUMNS: readonly { heading: string; links: readonly FooterLink[] }[] = [
  {
    heading: "公司",
    links: [
      { label: "关于我们", page: "about" },
      { label: "产品与应用", page: "products" },
      { label: "联系我们", page: "contact" },
    ],
  },
  {
    heading: "资讯与资源",
    links: [
      { label: "行业洞察", page: "insights" },
      { label: "新闻资讯", page: "news" },
    ],
  },
  { heading: "法律与合规", links: [{ label: "隐私声明" }, { label: "合规准则" }] },
];

export const OFFICE_MAP_PINS: readonly { left: number; top: number }[] = [
  { left: 14.74, top: 45.09 },
  { left: 20.46, top: 39.47 },
  { left: 27.14, top: 37.75 },
  { left: 32.02, top: 81.12 },
  { left: 34.86, top: 77.07 },
  { left: 46.28, top: 30.73 },
  { left: 48.84, top: 33.23 },
  { left: 51.25, top: 36.66 },
  { left: 53.17, top: 31.67 },
  { left: 54.67, top: 81.12 },
  { left: 67.97, top: 51.79 },
  { left: 74.06, top: 55.07 },
  { left: 74.81, top: 63.03 },
  { left: 76.64, top: 68.49 },
  { left: 79.54, top: 46.49 },
  { left: 81.04, top: 58.35 },
  { left: 84.52, top: 43.84 },
];
