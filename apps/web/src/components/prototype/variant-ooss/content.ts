import {
  HERO as FIGMA_HERO,
  IMAGES as FIGMA_IMAGES,
  PRODUCTS_INTRO as FIGMA_PRODUCTS_INTRO,
} from "../variant-o/content";

export {
  COPYRIGHT,
  CTA,
  GLOBAL_INTRO,
  OFFICE_COLUMNS,
  PRODUCTS,
  STATS,
} from "../variant-o/content";

export const IMAGES = {
  officeMap: FIGMA_IMAGES.officeMap,
} as const;

export const NAV_ITEMS = [
  { label: "首页", href: "#top" },
  { label: "关于我们", href: "#about" },
  { label: "研发与生产", href: "#campus" },
  { label: "产品与应用", href: "#products" },
  { label: "全球网络", href: "#offices" },
  { label: "新闻资讯", href: "#news" },
  { label: "联系我们", href: "#contact" },
] as const;

export const SECTION_IDS = [
  "top",
  "about",
  "campus",
  "products",
  "offices",
  "news",
  "contact",
] as const;

export const HERO = {
  image: "/prototype/official-site/campus-lake.webp",
  zh: "创新，从源头开始",
  en: "Global ingredients. Your next breakthrough.",
  primary: FIGMA_HERO.primary,
  secondary: FIGMA_HERO.secondary,
} as const;

export const ABOUT_STATEMENT = [
  "三十余年，泛成以现代化生产基地、",
  "专业研发与全球分公司网络，",
  "为客户提供一站式定制化原料解决方案。",
] as const;

export const ABOUT_SUPPORT =
  "南京泛成国际控股有限公司是行业内领先的原料供应商，已成为全球范围内同行业中最具影响力的公司之一。";

export const CAMPUS = {
  title: "现代化研发与生产基地",
  lead: "依托现代化生产基地与专业研发能力，为客户提供一站式定制化解决方案。",
  spoken: {
    公司历史: "More than 30 years",
    全球分公司: "16 offices",
    生产基地: "35,000 square meters",
  },
} as const;

export const PRODUCTS_INTRO = {
  title: FIGMA_PRODUCTS_INTRO.title,
  cta: { label: "查看全部产品", href: "#product-list" },
} as const;

export const FOOTER_COLUMNS = [
  { heading: "公司", links: ["关于我们", "产品与应用", "研发与生产", "职业发展"] },
  { heading: "资源", links: ["技术资讯", "资源下载", "常见问题"] },
  { heading: "法律", links: ["隐私声明"] },
] as const;
