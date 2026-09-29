const ASSET_BASE = "/prototype/official-site";

export const IMAGES = {
  hero: `${ASSET_BASE}/hero-background.webp`,
  campus: { src: `${ASSET_BASE}/campus.webp`, alt: "泛成园区建筑外景" },
  officeMap: { src: `${ASSET_BASE}/office-map.webp`, alt: "泛成全球分公司分布地图" },
  footerLogo: { src: `${ASSET_BASE}/fenchem-logo.png`, alt: "FENCHEM 泛成" },
} as const;

export const NAV_ITEMS = [
  { label: "首页", href: "#top" },
  { label: "关于我们", href: "#about" },
  { label: "产品与应用", href: "#products" },
  { label: "研发与生产", href: "#campus" },
  { label: "新闻资讯", href: "#news" },
  { label: "联系我们", href: "#contact" },
] as const;

export const HERO = {
  title: "链接全球优质原料，打造创新解决方案。",
  lead: "通过全球化资源、创新能力与稳定供应链，赋能营养健康、食品、个人护理及宠物健康客户。",
  primary: { label: "了解产品", href: "#products" },
  secondary: { label: "联系我们", href: "#contact" },
} as const;

export const ABOUT = {
  title: "关于泛成",
  body: "南京泛成国际控股有限公司是行业内领先的原料供应商，凭借现代化生产基地和专业研发能力、遍布全球的分公司网络，为客户提供一站式定制化解决方案。我们经过三十多年的发展和经验积累，已成为全球范围内同行业中最具影响力的公司之一。",
  cta: { label: "更多", href: "#campus" },
} as const;

export const STATS = [
  { label: "公司历史", value: "30", unit: "+", caption: "三十余年行业积淀" },
  { label: "全球分公司", value: "16", unit: null, caption: "全球16家分支机构" },
  { label: "生产基地", value: "35,000", unit: "m²", caption: "制造与解决方案" },
] as const;

export type StrengthTone = "blue" | "gray" | "green" | "cream";
export type StrengthIcon = "globe" | "shield" | "bulb" | "users";

export const STRENGTHS_INTRO = {
  title: "为什么选择泛成",
  lead: "我们整合全球资源、供应保障、解决方案创新与本地化服务，帮助客户将创意转化为市场成功。",
} as const;

export const STRENGTHS: readonly {
  title: string;
  description: string | null;
  link: string | null;
  icon: StrengthIcon;
  tone: StrengthTone;
}[] = [
  {
    title: "全球资源整合",
    description: "汇聚全球优质原料资源",
    link: "了解更多",
    icon: "globe",
    tone: "blue",
  },
  { title: "稳定供应保障", description: null, link: null, icon: "shield", tone: "gray" },
  { title: "解决方案创新", description: null, link: null, icon: "bulb", tone: "green" },
  { title: "长期合作伙伴", description: null, link: null, icon: "users", tone: "cream" },
];

export const PRODUCTS_INTRO = {
  title: "产品与应用方案",
  lead: "从个人护理到人类营养、宠物健康与食品原料，泛成以稳定的品质与专业的应用支持，赋能未来健康生活。",
  cta: { label: "更多", href: "#offices" },
} as const;

export const PRODUCTS = [
  {
    title: "人类营养健康",
    description: "基于科学证据的健康营养方案",
    tags: ["肠道健康", "女性健康", "情绪健康", "体重管理"],
    image: `${ASSET_BASE}/product-human-nutrition.webp`,
  },
  {
    title: "功能性食品",
    description: "面向现代生活方式的功能方案",
    tags: ["膳食纤维", "亲水胶体", "天然色素"],
    image: `${ASSET_BASE}/product-functional-food.webp`,
  },
  {
    title: "个人护理",
    description: "天然来源活性成分方案",
    tags: ["植物油脂", "活性物"],
    image: `${ASSET_BASE}/product-personal-care.webp`,
  },
  {
    title: "宠物健康",
    description: "全面宠物营养方案",
    tags: ["美毛护肤与肠胃修复", "毛发顺滑与骨骼保健", "肠道养护", "关节健康"],
    image: `${ASSET_BASE}/product-pet-health.webp`,
  },
] as const;

export const GLOBAL_INTRO = {
  title: "全球分公司",
  lead: "遍布全球的分公司网络，让优质原料触手可及。",
} as const;

export const OFFICE_COLUMNS = [
  [
    {
      region: "亚洲",
      offices: [
        "南京，中国",
        "东京，日本",
        "曼谷，泰国",
        "吉隆坡，马来西亚",
        "孟买，印度",
        "雅加达，印度尼西亚",
      ],
    },
  ],
  [
    {
      region: "欧洲",
      offices: ["科隆，德国", "曼彻斯特，英国", "克拉科夫，波兰", "斯特拉瓦，捷克"],
    },
  ],
  [
    {
      region: "北美洲",
      offices: ["奇诺，加利福尼亚州", "格莱姆斯，爱荷华州", "劳雷尔山，新泽西州"],
    },
  ],
  [
    { region: "南美洲", offices: ["圣保罗，巴西", "库里蒂巴，巴西"] },
    { region: "非洲", offices: ["约翰内斯堡，南非"] },
  ],
] as const;

export const NEWS_TITLE = "新闻资讯";

export const NEWS: readonly { title: string; details: readonly string[]; muted: boolean }[] = [
  {
    title: "1. In-cosmetics® 拉丁美洲展",
    details: [
      "2026 年 9 月 23 – 24 日 · 巴西 圣保罗",
      "欢迎参加 2026 年 In-cosmetics® 拉丁美洲展!",
    ],
    muted: false,
  },
  { title: "2. IFSCC 大会 2026", details: [], muted: false },
  { title: "3. Naturally Kiawah 研讨会 2026", details: [], muted: false },
  { title: "4. In-cosmetics® Global 2026", details: [], muted: false },
  { title: "5. PCHi 2026 个人护理品行业峰会", details: [], muted: true },
];

export const CTA = {
  title: "更多合作机会",
  action: { label: "联系我们", href: "#top" },
} as const;

export const FOOTER_COLUMNS = [
  { heading: "公司", links: ["关于我们", "产品与应用", "研发与生产", "职业发展"] },
  { heading: "资源", links: ["技术资讯", "资源下载", "常见问题"] },
  { heading: "法律", links: ["Privacy Statement"] },
] as const;

export const COPYRIGHT = "© 2026 FENCHEM 泛成. All rights reserved.";
