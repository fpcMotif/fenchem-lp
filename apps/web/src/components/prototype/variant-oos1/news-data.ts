export const NEWS_HEADER = {
  title: "News & Events",
  chineseTitle: "新闻与展会资讯",
  lead: "追踪泛成全球学术动态、重磅原料发布与全球展会日程。",
  englishLead: "Discover our latest product launches, global events, and scientific updates.",
} as const;

export const NEWS_CATEGORIES = [
  { id: "all", label: "全部 (All)" },
  { id: "launch", label: "原料首发 (Launches)" },
  { id: "events", label: "全球展会 (Events)" },
  { id: "science", label: "科研前瞻 (Science)" },
  { id: "corporate", label: "企业与ESG (Corporate)" },
] as const;

export type NewsItem = {
  id: string;
  category: "launch" | "events" | "science" | "corporate";
  categoryLabel: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  featured?: boolean;
  location?: string;
  booth?: string;
};

export const FEATURED_NEWS: NewsItem = {
  id: "incosmetics-2026",
  category: "events",
  categoryLabel: "全球展会 · 巴黎",
  title: "泛成受邀参展 In-cosmetics® Global 2026 巴黎展，发布新一代活性包裹递送平台",
  date: "2026-03-28",
  readTime: "3 min",
  excerpt:
    "泛成技术团队将于法国巴黎凡尔赛门展馆展示针对光敏及氧敏感活性物的全新微囊包裹与冷水自乳化技术，现场提供原型配方体验装。",
  image: "/prototype/about/campus-lounge-lg.webp",
  featured: true,
  location: "巴黎 · Paris Expo Porte de Versailles",
  booth: "Stand D42 (Hall 1)",
};

export const NEWS_LIST: readonly NewsItem[] = [
  FEATURED_NEWS,
  {
    id: "kanu-actives",
    category: "launch",
    categoryLabel: "原料首发",
    title: "发布全新 OptiShield™ 天然植物抗敏屏障修护复配活性物",
    date: "2026-03-12",
    readTime: "2 min",
    excerpt:
      "基于超临界流体温和提取技术，在不破坏多酚活性前提下实现高纯浓缩，体外细胞测试显示屏障修护基因表达提升 42%。",
    image: "/prototype/about/campus-lab.webp",
  },
  {
    id: "vitafoods-geneva",
    category: "events",
    categoryLabel: "全球展会 · 日内瓦",
    title: "Vitafoods Europe 2026 瑞士日内瓦展会参展预告",
    date: "2026-05-12",
    readTime: "2 min",
    excerpt:
      "泛成欧洲团队将展示应用于机能食品、软糖与机能饮品的高分散植物甾醇微粉与生物发酵多糖配料。",
    image: "/prototype/about/campus-reception.webp",
    location: "日内瓦 · Palexpo Geneva",
    booth: "Stand J120",
  },
  {
    id: "whitepaper-delivery",
    category: "science",
    categoryLabel: "科研前瞻",
    title: "技术白皮书：《脂质体双分子层在活性物透皮吸收中的靶向机制》",
    date: "2026-02-18",
    readTime: "4 min",
    excerpt:
      "系统梳理磷脂微囊对视黄醇与多肽分子的保活与缓释动力学数据，包含三套标准参考原型配方框架。",
    image: "/prototype/about/campus-office.webp",
  },
  {
    id: "ecovadis-silver",
    category: "corporate",
    categoryLabel: "企业与ESG",
    title: "制造基地完成全封闭溶剂循环改造，获 EcoVadis 可持续发展评级",
    date: "2026-01-25",
    readTime: "2 min",
    excerpt:
      "秉承绿色化学原则，有机溶剂循环利用率达到 98.5%，年减少温室气体碳排放超 1,200 吨。",
    image: "/prototype/about/csr-campus-lake.webp",
  },
  {
    id: "uk-hub",
    category: "corporate",
    categoryLabel: "企业动态",
    title: "泛成英国曼彻斯特仓储中心正式启用，提供本地化 48 小时极速交付",
    date: "2025-12-10",
    readTime: "2 min",
    excerpt:
      "进一步完善欧洲三点仓储网络，配备本地温控仓储与快速样品分拨，支持英镑直接结算。",
    image: "/prototype/about/about-lobby.webp",
  },
];

export const UPCOMING_EVENTS = [
  {
    date: "2026.03.31 – 04.02",
    name: "In-cosmetics® Global 2026",
    city: "巴黎 · 法国 (Paris, France)",
    booth: "Stand D42",
  },
  {
    date: "2026.05.12 – 05.14",
    name: "Vitafoods Europe 2026",
    city: "日内瓦 · 瑞士 (Geneva, Switzerland)",
    booth: "Stand J120",
  },
  {
    date: "2026.09.23 – 09.24",
    name: "In-cosmetics® Latin America",
    city: "圣保罗 · 巴西 (São Paulo, Brazil)",
    booth: "Stand E30",
  },
  {
    date: "2026.10.28 – 10.29",
    name: "SupplySide West 2026",
    city: "拉斯维加斯 · 美国 (Las Vegas, USA)",
    booth: "Booth #4825",
  },
] as const;
