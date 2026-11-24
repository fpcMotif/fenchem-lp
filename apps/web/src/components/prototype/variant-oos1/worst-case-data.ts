import * as about from "./about-data";
import * as content from "./content";
import * as insights from "./insights-data";
import * as products from "./products-data";

export const DATASETS = ["demo", "worst", "empty", "one", "many"] as const;
export type Dataset = (typeof DATASETS)[number];

export const ARTICLE_COUNTS = [1, 2, 3, 4] as const;
export type ArticleCount = (typeof ARTICLE_COUNTS)[number];

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer Item)[]
      ? readonly Widen<Item>[]
      : T extends object
        ? { readonly [Key in keyof T]: Widen<T[Key]> }
        : T;

type Item<List> = List extends readonly (infer Entry)[] ? Widen<Entry> : never;

function setList<T>(target: readonly T[], next: readonly Widen<T>[]) {
  (target as unknown[]).splice(0, target.length, ...next);
}

function setFields<T extends object>(target: T, next: Partial<Widen<T>>) {
  Object.assign(target, next);
}

function cycle<T, R = T>(source: readonly T[], count: number, vary: (item: T, index: number) => R) {
  return Array.from({ length: count }, (_, index) => vary(source[index % source.length], index));
}

const MISSING_IMAGE = "/prototype/official-site/product-functional-food-2026.webp";

const WORST_HOME = () => {
  setList(content.NAV_ITEMS, [
    { label: "首页", href: "#top" },
    { label: "关于泛成", href: "#about" },
    { label: "产品与应用方案", href: "#products" },
    { label: "研发与生产基地", href: "#campus" },
    { label: "新闻与活动", href: "#news" },
    { label: "联系我们", href: "#contact" },
  ]);
  setFields(content.HERO, {
    headline: ["全球优质原料", "成就您的下一个突破。"],
    accent: "原料",
    title: "创新，从源头开始 —— 三十年专注营养、宠物健康与个人护理原料",
    primary: { label: "浏览全部产品与应用", href: "#products" },
    secondary: { label: "预约样品与技术咨询", href: "#contact" },
  });
  setFields(content.ABOUT, {
    lines: [
      "南京泛成国际控股有限公司（Fenchem Holdings Corporation Ltd.）是行业内领先的营养健康、宠物健康与个人护理原料供应商，",
      "凭借现代化生产基地、专业研发能力和遍布全球 12 个国家的 16 家分公司网络，为客户提供一站式定制化解决方案。",
      "我们经过三十多年的发展和经验积累，已成为全球范围内同行业中最具影响力的公司之一。",
    ],
  });
  setList(content.STATS, [
    { label: "公司历史", value: "31", unit: "年", caption: "1995 年创立于南京" },
    {
      label: "全球分支机构",
      value: "16",
      unit: null,
      caption: "覆盖美洲、欧洲、非洲与亚太地区的 12 个国家",
    },
    {
      label: "生产与研发基地",
      value: "135,000",
      unit: "m²",
      caption: "制造、仓储、应用研发与定制化解决方案中心",
    },
  ]);
  setFields(content.STRENGTHS_INTRO, {
    title: "为什么选择泛成作为您的长期原料合作伙伴",
    lead: "我们整合全球资源、供应保障、解决方案创新与本地化服务，从原料筛选、配方开发到法规注册全程支持，帮助客户将创意更快地转化为市场成功。",
  });
  setList(content.STRENGTHS, [
    {
      title: "全球资源整合与本地化仓储网络",
      description:
        "汇聚 30 多个国家和地区的优质原料，在美国、德国、巴西与马来西亚设有本地仓储，交付周期更短、供应更稳定。",
      link: "了解全球资源整合与本地化仓储网络",
      icon: "globe",
      tone: "blue",
    },
    { title: "稳定供应", description: null, link: null, icon: "shield", tone: "gray" },
    {
      title: "解决方案创新",
      description: "从配方设计、稳定性测试到法规文件准备，应用研发团队全程协助客户新品上市。",
      link: null,
      icon: "bulb",
      tone: "green",
    },
    {
      title: "长期合作伙伴",
      description: "帮客户打造差异化产品",
      link: "了解长期合作伙伴",
      icon: "users",
      tone: "cream",
    },
  ]);
  setFields(content.PRODUCTS_INTRO, {
    lead: "从个人护理到人类营养、宠物健康与食品原料，泛成以稳定的品质、完整的法规文件与专业的应用支持，赋能未来健康生活。",
    cta: { label: "查看全部产品与应用方案", href: "#product-list" },
  });
  const [nutrition, food, care, pet] = content.PRODUCTS;
  setList(content.PRODUCTS, [
    {
      ...nutrition,
      title: "人类营养健康与运动营养",
      description: "基于科学证据的健康营养方案，覆盖膳食补充剂、运动营养与特殊医学用途配方食品",
      tags: [
        "肠道健康",
        "女性健康",
        "情绪与睡眠健康",
        "体重管理",
        "运动营养",
        "骨关节健康",
        "免疫支持",
        "认知健康",
      ],
    },
    { ...food, image: MISSING_IMAGE },
    { ...care, description: "天然来源", tags: ["植物油脂"] },
    {
      ...pet,
      tags: ["Omega-3 鱼油（EPA/DHA）与皮毛健康", "美毛护肤与肠胃修复", "关节健康"],
    },
  ]);
  setFields(content.GLOBAL_INTRO, {
    title: "全球分公司与区域应用技术中心",
    lead: "遍布全球 12 个国家的 16 家分公司与仓储网络，让优质原料与本地化技术服务触手可及。",
  });
  setList(content.OFFICE_COLUMNS, [
    [
      {
        region: "亚洲",
        offices: [
          "南京（总部、研发中心与生产基地），中国",
          "东京，日本",
          "曼谷，泰国",
          "吉隆坡，马来西亚",
          "孟买，马哈拉施特拉邦，印度",
          "雅加达，印度尼西亚",
          "马尼拉，菲律宾",
        ],
      },
    ],
    [
      {
        region: "欧洲",
        offices: [
          "科隆，北莱茵-威斯特法伦州，德国",
          "曼彻斯特，英国",
          "克拉科夫，波兰",
          "斯特拉瓦，捷克",
        ],
      },
    ],
    [
      {
        region: "北美洲",
        offices: [
          "奇诺，加利福尼亚州，美国",
          "格莱姆斯，爱荷华州，美国",
          "劳雷尔山，新泽西州，美国",
        ],
      },
    ],
    [
      { region: "南美洲", offices: ["圣保罗，巴西"] },
      { region: "非洲", offices: ["约翰内斯堡，豪登省，南非"] },
    ],
  ]);
  setList(content.NEWS, [
    {
      title: "1. In-cosmetics® Latin America 2026 拉丁美洲个人护理原料展暨应用技术研讨会",
      details: [
        "2026 年 9 月 23 – 24 日 · 巴西 圣保罗 · 展位号 J-120",
        "参观预约：https://events.example.com/2026/in-cosmetics-latin-america/sao-paulo/fenchem-booth-registration?utm_source=fenchem&utm_medium=website",
      ],
    },
    { title: "2. IFSCC 2026", details: [] },
    {
      title: "3. Naturally Kiawah 研讨会 2026",
      details: ["[日期 · 地点待补充]", "[活动介绍待补充]"],
    },
    {
      title: "4. In-cosmetics® Global 2026 & 泛成新品发布会",
      details: [
        "2026 年 4 月 14 – 16 日 · 法国 巴黎 · 凡尔赛门展览中心 7 号馆",
        "欢迎莅临泛成展位，现场发布 OLVE'Care™ 全形态乳木果油新品，并举办三场应用技术研讨会，与全球配方师交流天然植物油脂在护肤、护发与彩妆中的最新应用。",
      ],
    },
    { title: "5. PCHi 2026", details: ["2026 年 3 月 18 – 20 日 · 中国 杭州"] },
  ]);
  setList(content.FOOTER_COLUMNS, [
    {
      heading: "公司",
      links: [
        { label: "关于泛成", page: "about" },
        { label: "产品与应用", page: "products" },
        { label: "研发与生产基地" },
        { label: "职业发展与人才招聘" },
      ],
    },
    {
      heading: "资源中心",
      links: [
        { label: "技术资讯与应用文章" },
        { label: "产品说明书与资料下载" },
        { label: "常见问题" },
      ],
    },
    {
      heading: "法律声明",
      links: [{ label: "隐私声明" }, { label: "Cookie 设置" }, { label: "网站使用条款" }],
    },
  ]);
  setFields(content.CTA, {
    title: "与泛成应用技术团队一起，开启您的下一个配方突破",
    action: { label: "预约样品与技术咨询", href: "#top" },
  });
};

const WORST_ABOUT = () => {
  setFields(about.ABOUT_BANNER, {
    title: "关于南京泛成国际控股有限公司",
    tagline:
      "Rooted in nature, refined by science — trusted by formulators in more than 60 countries.",
    lead: "1995 年创立于南京 · 三十年专注营养健康、功能性食品、宠物健康与个人护理原料，服务全球 60 多个国家和地区的客户",
    place: "Nanjing · Jiangsu · China",
  });
  setFields(about.ABOUT_HERO, {
    englishTitle: "Nanjing Fenchem International Holdings Corporation Limited",
    lead: "FENCHEM自1995年创立于南京，专注于为食品营养品、宠物健康和个人护理行业提供原料和解决方案，建立起集研发、生产、质量控制、法规注册与全球销售于一体的完整产业链，产品远销 60 多个国家和地区。",
    networkLabel: "全球 16 家分支机构，遍布",
    countries: [
      "美国",
      "德国",
      "英国",
      "捷克",
      "波兰",
      "巴西",
      "南非",
      "日本",
      "泰国",
      "马来西亚",
      "印度尼西亚",
      "菲律宾",
      "印度",
      "阿拉伯联合酋长国",
    ],
    lobbyCaption: "总部大堂 · 南京市江宁区",
    navChips: [
      { label: "企业概况", english: "Company profile and corporate overview", id: "about-profile" },
      { label: "园区环境与设施", english: "Campus environment and facilities", id: "about-campus" },
      {
        label: "企业文化与价值观",
        english: "Corporate culture and core values",
        id: "about-culture",
      },
      {
        label: "社会责任与可持续发展",
        english: "Social responsibility and sustainable development",
        id: "about-csr",
      },
      {
        label: "企业荣誉与资质认证",
        english: "Corporate honors and qualification certifications",
        id: "about-honor",
      },
      { label: "企业架构", english: "Corporate structure and subsidiaries", id: "about-structure" },
    ],
  });
  const demoMilestones = about.ABOUT_HISTORY.milestones;
  setFields(about.ABOUT_HISTORY, {
    caption: "双螺旋每交汇一次，即走过一年；向右滑动查看 1995 年至今的重要里程碑",
    milestones: [
      { year: 1995, events: [{ text: "在中国-南京成立总部" }] },
      ...demoMilestones.slice(1, -1),
      {
        year: 2024,
        events: [
          { text: "在中国江苏省南京市江宁区启用占地 13.5 万平方米的新园区和现代化生产工厂" },
          { entity: "Fenchem India Private Limited", text: "在印度马哈拉施特拉邦孟买成立" },
          { text: "第三家美国分公司在新泽西州劳雷尔山成立" },
          { entity: "Fenchem UK", text: "在英国曼彻斯特成立" },
          { text: "获评江苏省专精特新中小企业" },
          { text: "通过 FSSC 22000 食品安全体系与 ISO 14001 环境管理体系认证" },
        ],
      },
      {
        year: 2026,
        events: [
          {
            entity: "Fenchem Middle East FZ-LLC",
            text: "在阿拉伯联合酋长国迪拜成立，服务中东与北非市场",
          },
        ],
      },
    ],
  });
  setFields(about.ABOUT_MOMENT, { caption: "泛成总部园区 · 南京市江宁区秣陵街道 · 2024 年航拍" });
  const captions = [
    "总部园区鸟瞰（2024 年新园区落成）",
    "研发实验室 · 应用技术中心",
    "企业展厅",
    "接待大厅",
    "员工休闲与交流区",
    "开放办公区与玻璃会议室",
    "园区绿地",
  ];
  setFields(about.ABOUT_CAMPUS, {
    title: "园区环境与设施",
    photos: about.ABOUT_CAMPUS.photos.map((photo, index) => ({
      ...photo,
      caption: captions[index] ?? photo.caption,
      large: photo.id === "showroom" ? "/prototype/about/campus-showroom-xl.webp" : photo.large,
    })),
  });
  const [professional, quiet, together] = about.ABOUT_CULTURE.values;
  setFields(about.ABOUT_CULTURE, {
    values: [
      {
        ...professional,
        title: "专业、专注与精益求精",
        desc: "始终专注于原料领域，凭借三十年的行业经验和技术积累，确保每一个解决方案都专业、可靠。我们相信，只有长期深耕，才能真正理解客户在配方、法规与供应链上的每一个细节需求。",
      },
      { ...quiet, desc: "低调踏实。" },
      together,
    ],
  });
  setFields(about.ABOUT_CSR, {
    statement: ["平衡生态环境和客户需求，", "确保可持续发展，", "共建绿色健康的未来。"],
    desc: "在碳达峰碳中和的大背景下，我们将可持续发展理念与企业发展战略相融合，在产品中积极运用可持续科技，并从原料采购、生产工艺到物流包装全链路降低环境影响。",
    outcomes: [
      { icon: "factory", title: "降低单位产值工业能耗" },
      { icon: "recycle", title: "减少原料损耗与包装浪费" },
      { icon: "leaf", title: "减少碳足迹" },
    ],
  });
  setFields(about.ABOUT_HONORS, {
    items: [
      {
        id: "honor-1",
        title: "国家高新技术企业",
        english: "National High-Tech Enterprise",
        level: "national",
      },
      {
        id: "honor-9",
        title: "国家级专精特新“小巨人”企业（第五批）",
        english: "National Specialized and Innovative 'Little Giant' Enterprise (Fifth Batch)",
        level: "national",
      },
      ...about.ABOUT_HONORS.items.slice(1, 6),
      {
        id: "honor-7",
        title: "南京市级企业技术中心（植物油脂与天然活性物应用研究方向）",
        english:
          "Nanjing Enterprise Technology Center (Plant Oils and Natural Actives Research Direction)",
        level: "municipal",
      },
      ...about.ABOUT_HONORS.items.slice(7),
    ],
  });
  setFields(about.ABOUT_STRUCTURE, {
    holding: {
      badge: "控股公司",
      badgeEnglish: "Investment holding company and group parent",
      name: "南京泛成国际控股有限公司",
      english: "Nanjing Fenchem International Holdings Corporation Limited",
    },
    subsidiaries: about.ABOUT_STRUCTURE.subsidiaries.map((subsidiary) =>
      subsidiary.id === "sub-1"
        ? { ...subsidiary, english: "Fenchem Supply Chain Management (Nanjing) Co., Ltd." }
        : subsidiary.id === "sub-3"
          ? {
              ...subsidiary,
              english: "Nanjing Mountain Front Biotechnology Research & Development Co., Ltd.",
            }
          : subsidiary,
    ),
  });
};

const WORST_PRODUCTS = () => {
  setList(products.CATEGORIES, [
    {
      id: "personal-care",
      label: "个人护理与美妆",
      englishLabel: "Personal care and cosmetic actives",
    },
    {
      id: "functional-food",
      label: "功能性食品与饮料",
      englishLabel: "Functional food and beverage ingredients",
    },
    {
      id: "human-nutrition",
      label: "人类营养健康",
      englishLabel: "Human nutrition and health solutions",
    },
    {
      id: "pet-health",
      label: "宠物健康与动物营养",
      englishLabel: "Pet health and companion animal nutrition",
    },
  ]);
  setFields(products.FEATURED_PRODUCT, {
    brand: "OLVE'Care™ Shea & Botanical Butters",
    tagline: "天然全形态乳木果油脂，适配乳霜、身体乳、唇部护理、彩妆与护发等任何配方剂型",
  });
  setList(
    products.FEATURED_ITEMS,
    products.FEATURED_ITEMS.map((item) =>
      item.id === "shea-oil"
        ? {
            ...item,
            englishName: "OLVE'Care™ Shea Oil Ultra-Refined Liquid Fraction",
            desc: "更加全能，突破形态界限。高流动性和铺展性，无需担心高添加量下的结晶问题；不皂化物含量高于常规乳木果脂，适合冷配工艺与高油相配方。",
          }
        : item.id === "shea-butter"
          ? { ...item, desc: "经典固态版" }
          : item.id === "acai-oil"
            ? { ...item, cardImage: "/products/card-3-v2.png" }
            : item,
    ),
  );
  setList(
    products.CATALOG_GROUPS,
    products.CATALOG_GROUPS.map((group) =>
      group.id === "brazil"
        ? {
            ...group,
            label: "巴西与拉丁美洲亚马逊雨林天然植物油脂",
            englishLabel: "Brazilian and Latin American Amazon rainforest natural plant oils",
            items: [
              {
                id: "brazil-00",
                title: "乳木果不皂化物 (Shea Unsaponifiables)",
                englishName:
                  "Shea Unsaponifiables Concentrate (Triterpene Alcohol and Phytosterol Rich)",
                inci: "牛油果树（BUTYROSPERMUM PARKII (SHEA) BUTTER UNSAPONIFIABLES）",
                features:
                  "乳木果油中提取的不皂化物浓缩物，富含三萜醇与植物甾醇，抗炎修护、强化屏障，适配高端面霜与护发精华。",
              },
              ...group.items,
            ],
          }
        : group,
    ),
  );
  const sunscreen = products.SOLUTION_ITEMS.find((item) => item.id === "sunscreen");
  const bodyOil = products.SOLUTION_ITEMS.find((item) => item.id === "body-oil");
  setList(products.SOLUTION_ITEMS, [
    ...(sunscreen
      ? [
          {
            ...sunscreen,
            title: "SPF50+ PA++++ 高倍物化结合户外防晒乳霜（防水型）",
            subtitle:
              "一款物化结合、全波段广谱防护的高倍户外防晒面霜，40 分钟防水，适合户外运动与长时间日晒场景",
          },
        ]
      : []),
    ...products.SOLUTION_ITEMS.filter((item) => item.id !== "sunscreen").map((item) =>
      bodyOil && item.id === bodyOil.id
        ? {
            ...item,
            overview: [
              ...item.overview,
              "选用冷榨甜杏仁油，保留天然维生素 E 与脂肪酸",
              "角鲨烷来源于 100% 植物橄榄，无动物来源成分",
              "霍霍巴油结构近似人体皮脂，亲肤易吸收",
              "红没药醇用量 0.3%，温和不刺激",
              "不含矿物油、硅油与合成色素",
              "适用于沐浴后湿润肌肤，锁水效果更佳",
              "可单独使用，或与身体乳叠加使用",
              "通过 48 小时人体斑贴测试",
            ],
          }
        : item,
    ),
  ]);
};

const WORST_INSIGHT_ARTICLES: insights.InsightArticle[] = [
  {
    id: "gut-drinks",
    category: "应用方案",
    title:
      "后生元、益生元与膳食纤维协同：面向GLP-1伴随营养与健康老龄化人群的日常型肠道健康饮品配方开发要点",
    navLabel: null,
    lead: "从原料筛选、发酵特征与胃肠耐受评估，到即饮饮料、冲调粉与条袋装等不同剂型的稳定性测试，系统梳理肠道健康饮品从概念到上市的关键环节",
    cover: {
      src: MISSING_IMAGE,
      alt: "肠道健康饮品稳定性加速测试与流变学表征实验样品",
      position: "50% 50%",
    },
    thesis: {
      label: "核心观点",
      statement:
        "肠道健康饮品的竞争点正在从“添加了什么”转向“每天能不能喝下去”：口感负担、胃肠耐受与剂型便利性，共同决定了产品能否被长期坚持。",
    },
    intro: [
      "“每天喝、喝得下、喝得久”正在成为肠道健康饮品的核心评价标准。与一次性尝鲜的功能饮料不同，肠道健康产品的价值需要在持续使用中体现，因此配方的口感、黏度与胃肠舒适度比单一成分的添加量更重要。",
      "对于同时面向体重管理人群与中老年人群的品牌而言，这意味着要在有限的饮用量中兼顾营养密度与低负担体验，并为不同渠道准备即饮、冲调与条袋装等多种剂型。",
      "本文结合常见的原料组合与剂型测试经验，整理出从概念设计到上市前验证的主要关注点，供配方团队在立项阶段参考。",
    ],
    sections: [
      {
        slug: "need",
        navLabel: "一　需求变化",
        title: "一　从功能饮料到每日习惯：肠道健康饮品的需求变化与目标人群细分",
        blocks: [
          {
            kind: "paragraphs",
            items: [
              "过去，肠道健康饮品多以“通便”“排毒”等短期诉求切入市场，产品生命周期短、复购率低。随着消费者对肠道微生态认知的加深，以及体重管理和健康老龄化需求的增长，品类正在向“每日饮用、长期坚持”的习惯型产品转变。",
            ],
          },
          {
            kind: "paragraphs",
            items: [
              "从目标人群看，至少可以细分为以下几类，每一类对口感、剂量和剂型的要求都不相同：",
            ],
          },
          {
            kind: "bullets",
            items: [
              "体重管理人群：进食量减少，更关注饱腹感、低能量和胃肠舒适度，对甜味和黏度较为敏感；",
              "中老年人群：咀嚼和吞咽能力下降，偏好温和口感与易冲调的剂型，同时关注蛋白质与钙、维生素D等营养素的补充；",
              "久坐办公人群：关注排便规律与便捷性，倾向于即饮或条袋装产品，对包装便携性要求较高；",
              "运动与健身人群：希望在补充电解质和蛋白质的同时兼顾肠道舒适，避免训练前后出现胀气；",
              "孕产与哺乳期人群：对原料安全性和法规合规要求更严格，配方需要更加保守；",
              "儿童与青少年：口味接受度是首要门槛，同时需要关注添加量与适用年龄的法规限制。",
            ],
          },
        ],
      },
      {
        slug: "ingredients",
        navLabel: "二　原料组合",
        title: "二　常见原料组合及其在配方中的角色",
        blocks: [
          {
            kind: "terms",
            items: [
              {
                term: "后生元（灭活乳酸菌及其代谢产物）",
                desc: "不依赖活菌存活，耐热、耐酸，适合热灌装即饮饮料与常温货架产品，可作为肠道健康定位的核心成分之一。",
              },
              {
                term: "益生元（低聚果糖、低聚半乳糖、菊粉）",
                desc: "可被肠道有益菌利用，但发酵速度较快，添加量过高时可能引起胀气，需要结合目标人群控制剂量。",
              },
              {
                term: "可溶性膳食纤维",
                desc: "部分水解瓜尔胶、抗性糊精等低黏度纤维，冲调性好、口味存在感低，适合作为每日饮用产品的纤维基础。",
              },
              {
                term: "电解质与微量营养素",
                desc: "钠、钾、镁及维生素C、锌等，有助于提升产品在运动后补水和日常营养补充场景中的价值。",
              },
              {
                term: "植物提取物与天然风味",
                desc: "姜、薄荷、柑橘等风味既能改善整体口感，也能在一定程度上掩盖纤维和后生元带来的不良风味。",
              },
            ],
          },
        ],
      },
      {
        slug: "testing",
        navLabel: "三　稳定性测试",
        title: "三　上市前稳定性测试清单",
        blocks: [
          {
            kind: "terms",
            items: [
              {
                term: "沉淀与分层",
                desc: "即饮产品静置后是否出现沉淀、絮状物或上下分层，摇匀后能否恢复",
              },
              {
                term: "黏度变化（25℃/60%RH，12个月）",
                desc: "加速与长期储存条件下黏度是否明显上升，是否影响口感与灌装",
              },
              {
                term: "pH与风味漂移",
                desc: "储存期内pH、酸甜比与风味是否发生变化，是否出现异味",
              },
              {
                term: "冲调分散时间",
                desc: "粉剂在常温水和温水中的分散时间，是否结团、挂壁或漂浮",
              },
              {
                term: "热灌装耐受",
                desc: "后生元、维生素与风味物质在热灌装或巴氏杀菌后的保留情况",
              },
              {
                term: "包材阻隔性（铝箔复合膜 vs. PET瓶）",
                desc: "不同包材对氧气和水分的阻隔能力，以及对货架期的影响",
              },
              { term: "运输振动", desc: "模拟运输后是否出现漏液、胀袋或粉剂板结" },
            ],
          },
        ],
      },
      {
        slug: "formats",
        navLabel: "四　剂型选择",
        title: "四　即饮、冲调粉还是条袋装？",
        blocks: [
          {
            kind: "paragraphs",
            items: [
              "即饮饮料的饮用体验最好，但对稳定性和热处理工艺要求最高；冲调粉的配方自由度更大，适合高纤维和高蛋白组合，但需要解决分散与结团问题；条袋装便于携带和控制单次剂量，适合作为每日一袋的习惯型产品。",
              "多数品牌会选择一个主剂型切入市场，再根据渠道反馈延展到其他剂型。配方设计时提前考虑剂型迁移，可以减少后续重复开发的工作量。",
            ],
          },
        ],
      },
      {
        slug: "summary",
        navLabel: "五　小结",
        title: "五　小结",
        blocks: [
          {
            kind: "paragraphs",
            items: [
              "肠道健康饮品的下一阶段竞争，将更多地体现在长期饮用体验和配方的科学性上。品牌需要在原料选择、剂型设计和稳定性验证之间找到平衡，并以真实的消费场景为出发点。",
            ],
          },
          {
            kind: "note",
            label: "开发提示",
            text: "可与“GLP-1时代的膳食纤维机会”一文联动，形成“体重管理伴随营养”系列专题，并在产品页关联部分水解瓜尔胶、后生元及电解质相关原料。",
          },
          {
            kind: "disclaimer",
            text: "说明：本文为官网应用方案示范稿，不构成医疗建议或产品功效承诺。正式发布前，应结合目标市场法规、所用原料证据及最终配方进行合规审核。",
          },
        ],
      },
    ],
  },
  {
    id: "hmb",
    category: "原料解读",
    title: "HMB",
    navLabel: null,
    lead: null,
    thesis: null,
    intro: [
      "2026年，运动营养产品的目标人群正从专业运动员扩展到中老年与体重管理人群。HMB（β-羟基-β-甲基丁酸）作为亮氨酸的代谢产物，常被用于与肌肉维持相关的配方设计。",
    ],
    sections: [
      {
        slug: "formats",
        navLabel: "一　剂型",
        title: "一　剂型",
        blocks: [
          {
            kind: "paragraphs",
            items: ["HMB钙盐易溶于水，适合固体饮料、片剂与蛋白粉复配。"],
          },
        ],
      },
      {
        slug: "notes",
        navLabel: "二　提示",
        title: "二　提示",
        blocks: [{ kind: "bullets", items: ["注意苦味掩盖；", "关注目标市场法规。"] }],
      },
    ],
  },
  {
    id: "probiotic-stability",
    category: "技术洞察",
    title:
      "Lacticaseibacillus rhamnosus GG与Bifidobacterium animalis subsp. lactis在固体饮料中的活菌稳定性",
    navLabel: "益生菌活菌稳定性",
    lead: "水分活度、储存温度与包材阻隔性如何影响固体饮料中的活菌数，以及配方阶段可以提前做哪些准备",
    thesis: {
      label: "核心观点",
      statement:
        "固体饮料中的益生菌稳定性主要取决于“水、热、氧”三个因素，配方、工艺与包材需要作为一个整体来设计。",
    },
    intro: [
      "Lacticaseibacillus rhamnosus（原Lactobacillus rhamnosus）与Bifidobacterium animalis subsp. lactis是固体饮料和条袋装产品中较常见的益生菌菌株。与液态产品相比，固体饮料的水分活度更低，有利于活菌保存，但在与膳食纤维、蛋白质和矿物质复配后，体系的吸湿性和储存条件会显著影响货架期内的活菌数。",
      "因此，配方团队需要在立项阶段就明确目标活菌数、储存条件和包材方案，而不是在稳定性测试失败后再回头调整。",
    ],
    sections: [
      {
        slug: "factors",
        navLabel: "一　影响因素",
        title: "一　影响活菌稳定性的主要因素",
        blocks: [
          {
            kind: "terms",
            items: [
              {
                term: "水分活度（aw）",
                desc: "体系水分活度越高，活菌数下降越快；吸湿性原料的比例需要严格控制",
              },
              {
                term: "储存温度",
                desc: "常温货架与冷链储存的活菌衰减速度差异明显，标签条件需与测试条件一致",
              },
              {
                term: "微胶囊化（Microencapsulation）",
                desc: "包埋工艺可以降低胃酸与加工过程对菌株的影响，但会增加成本和粒径",
              },
              {
                term: "氧气与包材",
                desc: "铝箔复合膜条袋的阻隔性优于普通复合膜，必要时可充氮包装",
              },
              {
                term: "复配原料",
                desc: "部分矿物质、酸味剂和高吸湿性纤维可能加速活菌数下降",
              },
            ],
          },
        ],
      },
      {
        slug: "strains",
        navLabel: "二　菌株选择",
        title: "二　菌株与载体的选择",
        blocks: [
          {
            kind: "terms",
            items: [
              {
                term: "Lacticaseibacillus_rhamnosus_GG_ATCC_53103",
                desc: "研究资料较多、应用历史较长的菌株之一，常用于儿童与成人肠道健康产品。",
              },
              {
                term: "Bifidobacterium animalis subsp. lactis BB-12 / HN019",
                desc: "耐酸、耐氧能力相对较好，适合与乳制品和固体饮料体系复配。",
              },
              {
                term: "载体与填充剂",
                desc: "麦芽糊精、低聚果糖等载体的水分含量和吸湿性，会直接影响菌粉在成品中的稳定性。",
              },
            ],
          },
        ],
      },
      {
        slug: "references",
        navLabel: "三　参考资料",
        title: "三　参考资料",
        blocks: [
          {
            kind: "paragraphs",
            items: [
              "完整的加速与长期稳定性测试方案可参考：https://example.com/technical-library/probiotics/stability_testing_protocol_for_solid_beverages_and_stick_packs_2026_edition_rev04_final.pdf",
              "技术支持与COA索取邮箱：formulation.stability.support@northwind-nutraceutical-ingredients-holdings.example.com",
            ],
          },
          {
            kind: "disclaimer",
            text: "说明：本文为官网技术洞察示范稿，菌株信息仅作配方讨论参考，不构成产品功效承诺。正式发布前，应结合目标市场法规与菌株证据进行合规审核。",
          },
        ],
      },
    ],
  },
];

const WORST_INSIGHTS = () => {
  setList(insights.INSIGHTS_ARTICLES, [...WORST_INSIGHT_ARTICLES, ...insights.INSIGHTS_ARTICLES]);
};

const TYPICAL_DISCLAIMER =
  "说明：本文为官网技术洞察示范稿，不构成医疗建议或产品功效承诺。正式发布前，应结合目标市场法规、所用原料证据及最终配方进行合规审核。";

const TYPICAL_INSIGHT_ARTICLES: insights.InsightArticle[] = [
  {
    id: "rtd-fiber",
    category: "应用方案",
    title: "低黏度膳食纤维在即饮饮品中的应用",
    navLabel: "即饮饮品与膳食纤维",
    lead: "兼顾口感、澄清度与货架期稳定性的配方思路",
    thesis: {
      label: "核心观点",
      statement:
        "即饮饮品添加膳食纤维的难点不在添加量本身，而在于黏度、澄清度与货架期稳定性之间的平衡。",
    },
    intro: [
      "即饮饮品是消费者最容易坚持的日常摄入形式之一。越来越多品牌希望在饮品中加入膳食纤维，以支持肠道健康和饱腹管理定位。",
      "然而，纤维的加入往往会带来增稠、浑浊、沉淀或风味变化。原料选择与工艺设计，决定了产品能否在整个货架期内保持稳定的饮用体验。",
    ],
    sections: [
      {
        slug: "constraints",
        navLabel: "一　开发约束",
        title: "一　即饮饮品的三项开发约束",
        blocks: [
          {
            kind: "terms",
            items: [
              {
                term: "黏度",
                desc: "饮品需要保持顺滑、清爽的口感，高黏度纤维容易带来明显的厚重感。",
              },
              {
                term: "澄清度",
                desc: "透明或浅色饮品对浑浊和沉淀更加敏感，纤维需要具备良好的溶解性。",
              },
              {
                term: "热与酸稳定性",
                desc: "杀菌工艺和酸性体系可能导致部分纤维降解，影响标示含量。",
              },
            ],
          },
        ],
      },
      {
        slug: "selection",
        navLabel: "二　原料选择",
        title: "二　原料选择要点",
        blocks: [
          {
            kind: "bullets",
            items: [
              "优先选择低黏度、易溶解的水溶性膳食纤维；",
              "在目标pH和杀菌条件下验证纤维含量的保留率；",
              "关注纤维对甜味、酸味和香精表现的影响；",
              "结合目标添加量评估胃肠耐受性。",
            ],
          },
        ],
      },
      {
        slug: "outlook",
        navLabel: "三　观点",
        title: "三　观点",
        blocks: [
          {
            kind: "paragraphs",
            items: [
              "即饮饮品中的膳食纤维应用，需要从原料、工艺和包装三个环节同步设计。尽早开展稳定性测试，可以显著降低量产阶段的配方调整成本。",
            ],
          },
          { kind: "disclaimer", text: TYPICAL_DISCLAIMER },
        ],
      },
    ],
  },
  {
    id: "hmb-aging",
    category: "技术洞察",
    title: "HMB与健康老龄化：肌肉营养的新机会",
    navLabel: "HMB与肌肉健康",
    lead: "从运动营养走向中老年日常营养的配方方向",
    thesis: {
      label: "核心观点",
      statement:
        "随着人口老龄化，肌肉健康正在从运动人群的专属话题，转变为中老年营养产品的核心需求之一。",
    },
    intro: [
      "肌肉量和肌肉力量会随年龄增长逐渐下降，并影响日常活动能力与生活质量。中老年人群对蛋白质及相关营养素的关注度正在持续上升。",
      "HMB（β-羟基-β-甲基丁酸）是亮氨酸的代谢产物，常与蛋白质、维生素D等成分组合，用于肌肉健康相关的营养产品开发。",
    ],
    sections: [
      {
        slug: "needs",
        navLabel: "一　人群需求",
        title: "一　中老年人群的营养需求",
        blocks: [
          {
            kind: "bullets",
            items: [
              "日常饮食中优质蛋白摄入不足；",
              "食欲和进食量随年龄增长而下降；",
              "希望维持行动能力和独立生活能力；",
              "偏好口感温和、易于冲调的产品形态。",
            ],
          },
        ],
      },
      {
        slug: "formats",
        navLabel: "二　产品形态",
        title: "二　值得关注的产品形态",
        blocks: [
          {
            kind: "terms",
            items: [
              { term: "营养粉剂", desc: "可与蛋白质、维生素D和钙组合，适合早餐或加餐场景。" },
              {
                term: "即饮营养饮品",
                desc: "便于每日饮用，需关注HMB的风味掩蔽与蛋白体系的稳定性。",
              },
              {
                term: "片剂与软糖",
                desc: "剂量精准、便于携带，适合作为日常饮食之外的营养补充。",
              },
            ],
          },
        ],
      },
      {
        slug: "outlook",
        navLabel: "三　观点",
        title: "三　观点",
        blocks: [
          {
            kind: "paragraphs",
            items: [
              "面向中老年人群的肌肉营养产品，需要同时考虑营养组合、口感接受度和长期使用的便利性。",
            ],
          },
          { kind: "disclaimer", text: TYPICAL_DISCLAIMER },
        ],
      },
    ],
  },
  {
    id: "probiotic-shelf-life",
    category: "应用方案",
    title: "益生菌产品的活菌稳定性管理",
    navLabel: "益生菌稳定性",
    lead: "从菌株选择、生产工艺到包装储存的全链路思路",
    thesis: {
      label: "核心观点",
      statement:
        "益生菌产品的价值取决于货架期末的活菌数，稳定性管理需要贯穿配方、工艺和包装的每一个环节。",
    },
    intro: [
      "益生菌是肠道健康品类中增长最快的原料之一。与多数营养成分不同，益生菌是活的微生物，其数量会在生产、运输和储存过程中逐渐下降。",
      "因此，品牌在标示活菌数时，需要以货架期末而非出厂时的数据为依据，并为不同剂型设计相应的保护策略。",
    ],
    sections: [
      {
        slug: "factors",
        navLabel: "一　影响因素",
        title: "一　影响活菌稳定性的主要因素",
        blocks: [
          {
            kind: "terms",
            items: [
              {
                term: "水分活度",
                desc: "水分是影响粉剂和片剂中益生菌存活的关键因素，需要严格控制原辅料含水率。",
              },
              {
                term: "温度",
                desc: "高温加工和常温储存都会加速活菌下降，部分剂型需要冷链或低温工艺。",
              },
              { term: "氧气", desc: "多数益生菌对氧气敏感，包装材料的阻隔性直接影响货架期表现。" },
              { term: "配方相容性", desc: "酸性成分、矿物质和部分植物提取物可能影响菌株存活。" },
            ],
          },
        ],
      },
      {
        slug: "outlook",
        navLabel: "二　观点",
        title: "二　观点",
        blocks: [
          {
            kind: "paragraphs",
            items: [
              "稳定性测试应在配方开发早期启动，并在目标储存条件下验证完整货架期的活菌数，为标签声称提供可靠依据。",
            ],
          },
          { kind: "disclaimer", text: TYPICAL_DISCLAIMER },
        ],
      },
    ],
  },
];

const TYPICAL_INSIGHTS = (count: ArticleCount) => {
  setList(
    insights.INSIGHTS_ARTICLES,
    [...insights.INSIGHTS_ARTICLES, ...TYPICAL_INSIGHT_ARTICLES].slice(0, count),
  );
  setFields(insights.INSIGHTS_PAGE, {
    lead: "围绕体重管理、肠道健康与健康老龄化，分享原料选择与配方开发的技术观点",
  });
};

const NEWS_EVENTS = [
  "In-cosmetics® 拉丁美洲展",
  "IFSCC 大会 2026",
  "Naturally Kiawah 研讨会 2026",
  "In-cosmetics® Global 2026",
  "PCHi 2026 个人护理品行业峰会",
  "Vitafoods Europe 2026",
  "Vitafoods Asia 2026",
  "SupplySide Global 2026",
  "IFT FIRST 2026",
  "Fi Europe 2026",
  "Interzoo 2026",
  "CPHI China 2026",
];

const COUNTRY_NAMES = [
  "美国",
  "德国",
  "英国",
  "捷克",
  "波兰",
  "巴西",
  "南非",
  "日本",
  "泰国",
  "马来西亚",
  "印度尼西亚",
  "菲律宾",
  "印度",
  "越南",
  "韩国",
  "澳大利亚",
  "墨西哥",
  "阿根廷",
  "土耳其",
  "阿拉伯联合酋长国",
  "沙特阿拉伯",
  "意大利",
];

const EXTRA_MILESTONE_YEARS = [2001, 2004, 2017, 2018, 2019, 2020, 2022, 2025, 2026];

const MANY_STRENGTH = {
  title: "可持续发展承诺",
  description: "公平贸易采购与低碳生产",
  link: null,
  icon: "globe",
  tone: "blue",
} as const;

const MANY_CULTURE_VALUE = {
  glyph: "诚",
  title: "诚信与责任",
  desc: "以诚信对待每一位客户、供应商与同事，对产品质量与社会环境负责。",
  tone: "blue",
} as const;

export const EXTRA_SOLUTIONS: products.SolutionItem[] = [
  {
    id: "acai-face-oil",
    area: "face",
    title: "巴西莓抗氧精华油",
    englishName: "Açai Antioxidant Face Oil",
    subtitle: "一款以冷榨巴西莓油为核心的抗氧化面部精华油",
    overview: [
      "全油基面部精华油，冷榨巴西莓油为核心",
      "复配橄榄角鲨烷与霍霍巴籽油，轻盈亲肤",
      "富含花青素与多酚，抗氧化抗糖化",
    ],
    functions: ["抗氧化", "弹润活肤", "柔润滋养"],
    keyIngredients: ["巴西莓油", "橄榄角鲨烷", "霍霍巴籽油", "生育酚"],
    challenges: ["深色油体的外观与色泽稳定", "高不饱和油脂的氧化稳定"],
    texture: ["澄清油状液体", "轻薄易吸收"],
    applications: ["面部护理", "抗氧精华油"],
  },
  {
    id: "rose-toner",
    area: "face",
    title: "玫瑰纯露保湿爽肤水",
    englishName: "Rose Hydrating Toner",
    subtitle: "一款以大马士革玫瑰纯露为基底的保湿爽肤水",
    overview: ["玫瑰纯露替代部分去离子水", "4D 玻尿酸多层保湿", "无酒精配方，温和不刺激"],
    functions: ["补水保湿", "二次清洁", "柔肤"],
    keyIngredients: ["大马士革玫瑰纯露", "4D HA 多重透明质酸钠", "泛醇"],
    challenges: ["纯露香气的长期保持", "无酒精体系的防腐保障"],
    texture: ["水状", "清爽不黏"],
    applications: ["面部护理", "爽肤水"],
  },
  {
    id: "centella-serum",
    area: "face",
    title: "积雪草舒缓修护精华",
    englishName: "Centella Soothing Serum",
    subtitle: "一款积雪草与植物抗敏剂协同的舒缓修护精华",
    overview: [
      "水剂型精华，积雪草提取物为核心",
      "AT Calm-ist™ 植物抗敏剂协同舒缓",
      "尿囊素与泛醇修护屏障",
    ],
    functions: ["舒缓泛红", "修护屏障", "保湿"],
    keyIngredients: ["积雪草提取物", "AT Calm-ist™ 植物抗敏剂", "FM-AT 尿囊素", "泛醇"],
    challenges: ["植物提取物的色泽与气味控制", "活性物在水相中的稳定"],
    texture: ["微稠啫喱状", "清爽易吸收"],
    applications: ["面部护理", "敏感肌修护精华"],
  },
  {
    id: "ha-sheet-mask",
    area: "face",
    title: "4D 玻尿酸补水面膜",
    englishName: "4D HA Hydrating Sheet Mask",
    subtitle: "一款 4D 多重玻尿酸体系的密集补水贴片面膜",
    overview: [
      "贴片式补水面膜，精华液为水剂体系",
      "4D 多重透明质酸钠多层级补水",
      "玫瑰纯露复配，舒缓香气",
    ],
    functions: ["密集补水", "即时水润", "舒缓"],
    keyIngredients: ["4D HA 多重透明质酸钠复合物", "大马士革玫瑰纯露", "甘油"],
    challenges: ["精华液黏度与膜布浸润的匹配", "高保湿与不黏腻的平衡"],
    texture: ["稀薄精华液", "服帖不滴落"],
    applications: ["面部护理", "贴片面膜"],
  },
  {
    id: "squalane-night-cream",
    area: "face",
    title: "角鲨烷修护晚霜",
    englishName: "Squalane Night Repair Cream",
    subtitle: "一款橄榄角鲨烷与乳木果油复配的夜间修护面霜",
    overview: [
      "乳化型修护晚霜",
      "橄榄角鲨烷与精制乳木果油双重滋养",
      "Ⅲ 型胶原蛋白与乙酰氨基葡萄糖修护",
    ],
    functions: ["夜间修护", "深层滋润", "改善干燥"],
    keyIngredients: ["橄榄角鲨烷", "精制乳木果油", "Ⅲ 型胶原蛋白", "乙酰氨基葡萄糖"],
    challenges: ["高油相乳化稳定", "厚润肤感与吸收速度的平衡"],
    texture: ["丰润乳霜", "按压融肤"],
    applications: ["面部护理", "修护晚霜"],
  },
  {
    id: "eye-cream",
    area: "face",
    title: "紧致淡纹眼霜",
    englishName: "Firming Eye Cream",
    subtitle: "一款适配眼周肌肤的轻润紧致眼霜",
    overview: ["乳化型眼霜，质地轻润", "白池花籽油与角鲨烷滋养眼周", "4D 玻尿酸保湿，减少干纹"],
    functions: ["紧致", "淡化干纹", "保湿"],
    keyIngredients: ["白池花籽油", "橄榄角鲨烷", "4D HA 多重透明质酸钠", "红没药醇"],
    challenges: ["眼周使用的低刺激要求", "小包装下的膏体稳定"],
    texture: ["细腻乳霜", "轻润不油腻"],
    applications: ["眼部护理", "紧致眼霜"],
  },
  {
    id: "shea-dry-oil-mist",
    area: "body",
    title: "乳木果身体干油喷雾",
    englishName: "Shea Dry Body Oil Mist",
    subtitle: "一款液态乳木果油为核心的快吸收身体干油喷雾",
    overview: ["全油基喷雾，液态乳木果油为核心", "复配轻质酯类，干爽速吸", "可喷涂于身体与发尾"],
    functions: ["速吸滋养", "柔润肌肤", "提亮光泽"],
    keyIngredients: ["液态乳木果油", "甜杏仁油", "生育酚"],
    challenges: ["喷雾雾化与油体黏度的匹配", "低温下的流动性保持"],
    texture: ["轻质油状", "干爽不黏"],
    applications: ["身体护理", "身体喷雾油"],
  },
  {
    id: "salt-body-scrub",
    area: "body",
    title: "海盐身体磨砂膏",
    englishName: "Sea Salt Body Scrub",
    subtitle: "一款海盐颗粒与植物油脂复配的去角质身体磨砂膏",
    overview: [
      "无水磨砂膏，海盐颗粒为去角质主体",
      "乳木果油与鳄梨油滋润，冲洗后不紧绷",
      "颗粒粒径分级，摩擦温和",
    ],
    functions: ["去角质", "滋润", "柔滑肌肤"],
    keyIngredients: ["海盐", "精制乳木果油", "鳄梨油"],
    challenges: ["颗粒在油相中的悬浮与分层", "去角质力与温和度的平衡"],
    texture: ["颗粒膏状", "遇水乳化易冲洗"],
    applications: ["身体护理", "身体磨砂"],
  },
  {
    id: "foot-balm",
    area: "body",
    title: "足部修护霜",
    englishName: "Foot Repair Balm",
    subtitle: "一款高滋润的足部干裂修护霜",
    overview: ["乳化型高滋润修护霜", "乳木果油与尿素协同软化角质", "尿囊素舒缓修护"],
    functions: ["软化角质", "修护干裂", "深度滋润"],
    keyIngredients: ["精制乳木果油", "尿素", "FM-AT 尿囊素"],
    challenges: ["高尿素含量的体系稳定", "厚重膏体的涂抹性"],
    texture: ["厚实膏状", "滋润不黏腻"],
    applications: ["足部护理", "干裂修护"],
  },
  {
    id: "cleansing-balm",
    area: "face",
    title: "白池花籽油卸妆膏",
    englishName: "Meadowfoam Cleansing Balm",
    subtitle: "一款以白池花籽油为核心的固态卸妆膏",
    overview: [
      "无水卸妆膏，遇体温融化为油",
      "白池花籽油抗氧稳定，溶妆力强",
      "遇水乳化，易冲洗不残留",
    ],
    functions: ["深层卸妆", "温和不刺激", "卸后不紧绷"],
    keyIngredients: ["白池花籽油", "精制乳木果油", "植物乳化剂"],
    challenges: ["膏体硬度随温度的变化控制", "乳化冲洗性与溶妆力的平衡"],
    texture: ["固态膏体", "遇温融化"],
    applications: ["面部清洁", "卸妆膏"],
  },
  {
    id: "amino-cleanser",
    area: "face",
    title: "氨基酸温和洁面乳",
    englishName: "Amino Acid Gentle Cleanser",
    subtitle: "一款氨基酸表活体系的温和保湿洁面乳",
    overview: [
      "氨基酸表面活性剂体系，弱酸性",
      "复配甘油与 4D 玻尿酸，洗后不紧绷",
      "AT Calm-ist™ 舒缓敏感肌",
    ],
    functions: ["温和清洁", "保湿", "舒缓"],
    keyIngredients: ["氨基酸表面活性剂", "4D HA 多重透明质酸钠", "AT Calm-ist™ 植物抗敏剂"],
    challenges: ["氨基酸体系的增稠与泡沫", "低温下的析出与稳定"],
    texture: ["珠光乳状", "泡沫绵密"],
    applications: ["面部清洁", "敏感肌洁面"],
  },
  {
    id: "cleansing-oil",
    area: "face",
    title: "植物卸妆油",
    englishName: "Botanical Cleansing Oil",
    subtitle: "一款植物油脂复配的易乳化卸妆油",
    overview: [
      "全油基卸妆油，霍霍巴籽油与葵花籽油复配",
      "遇水快速乳化，冲洗干净",
      "适配全脸与眼唇卸妆",
    ],
    functions: ["卸除彩妆", "快速乳化", "温和清洁"],
    keyIngredients: ["霍霍巴籽油", "葵花籽油", "生育酚"],
    challenges: ["乳化速度与卸妆力的平衡", "避免糊眼"],
    texture: ["澄清油状液体", "遇水乳白"],
    applications: ["面部清洁", "卸妆油"],
  },
  {
    id: "shea-body-wash",
    area: "body",
    title: "乳木果滋润沐浴露",
    englishName: "Shea Moisturizing Body Wash",
    subtitle: "一款添加液态乳木果油的滋润型沐浴露",
    overview: ["温和表活体系沐浴露", "添加液态乳木果油，洗后滋润", "低刺激，适合全家使用"],
    functions: ["温和清洁", "滋润", "柔肤"],
    keyIngredients: ["液态乳木果油", "甘油", "温和表面活性剂"],
    challenges: ["油脂添加对泡沫的影响", "体系透明度与稳定"],
    texture: ["凝露状", "泡沫丰富"],
    applications: ["身体清洁", "滋润沐浴露"],
  },
  {
    id: "silicone-free-shampoo",
    area: "hair",
    title: "无硅油修护洗发水",
    englishName: "Silicone-Free Repair Shampoo",
    subtitle: "一款以阿甘油修护的无硅油洗发水",
    overview: ["无硅油温和洗发水", "阿甘油与阳离子调理剂改善梳理性", "清洁同时修护毛躁"],
    functions: ["温和清洁", "修护毛躁", "顺滑易梳"],
    keyIngredients: ["阿甘油", "阳离子调理剂", "泛醇"],
    challenges: ["无硅油体系的湿梳性", "油脂添加与泡沫的平衡"],
    texture: ["凝露状", "泡沫细腻"],
    applications: ["头发护理", "洗发水"],
  },
  {
    id: "argan-hair-mask",
    area: "hair",
    title: "阿甘油深层修护发膜",
    englishName: "Argan Deep Repair Hair Mask",
    subtitle: "一款阿甘油与乳木果油复配的深层修护发膜",
    overview: ["乳化型发膜，高油脂含量", "阿甘油与乳木果油修护受损发丝", "角鲨烷提升光泽"],
    functions: ["深层修护", "柔顺", "提升光泽"],
    keyIngredients: ["阿甘油", "精制乳木果油", "橄榄角鲨烷"],
    challenges: ["高油脂体系的乳化稳定", "修护力与冲洗性的平衡"],
    texture: ["厚实膏状", "易冲洗"],
    applications: ["头发护理", "发膜"],
  },
  {
    id: "scalp-serum",
    area: "hair",
    title: "头皮舒缓精华液",
    englishName: "Scalp Soothing Serum",
    subtitle: "一款舒缓头皮不适的水剂精华",
    overview: ["水剂型头皮精华", "AT Calm-ist™ 舒缓头皮敏感", "清爽不油，可每日使用"],
    functions: ["舒缓头皮", "控油清爽", "保湿"],
    keyIngredients: ["AT Calm-ist™ 植物抗敏剂", "泛醇", "薄荷醇"],
    challenges: ["清凉感强度的控制", "活性物在水相中的溶解"],
    texture: ["水状", "清爽速干"],
    applications: ["头皮护理", "头皮精华"],
  },
  {
    id: "leave-in-conditioner",
    area: "hair",
    title: "免洗修护护发乳",
    englishName: "Leave-in Conditioner",
    subtitle: "一款轻盈免洗的修护护发乳",
    overview: ["免洗乳化型护发乳", "阿甘油与亚麻籽油修护发尾", "轻盈不压塌"],
    functions: ["修护发尾", "抗毛躁", "轻盈顺滑"],
    keyIngredients: ["阿甘油", "亚麻籽油", "泛醇"],
    challenges: ["免洗产品的轻盈度控制", "热防护与修护的兼顾"],
    texture: ["轻盈乳状", "不黏不腻"],
    applications: ["头发护理", "免洗护发"],
  },
  {
    id: "mineral-sunscreen",
    area: "sun",
    title: "纯物理防晒乳 SPF30",
    englishName: "Mineral Sunscreen Lotion SPF30",
    subtitle: "一款纯物理防晒剂的温和防晒乳",
    overview: ["纯物理防晒乳，SPF30、PA+++", "二氧化钛与氧化锌复配", "适合敏感肌与儿童"],
    functions: ["温和防晒", "敏感肌适用", "保湿"],
    keyIngredients: ["二氧化钛", "氧化锌", "4D HA 多重透明质酸钠"],
    challenges: ["物理防晒剂的分散与防泛白", "粉体高添加下的肤感"],
    texture: ["乳液状", "轻微提亮"],
    applications: ["面部与身体防晒", "敏感肌防晒"],
  },
  {
    id: "sunscreen-spray",
    area: "sun",
    title: "清爽防晒喷雾 SPF50",
    englishName: "Sunscreen Spray SPF50",
    subtitle: "一款可随时补涂的清爽防晒喷雾",
    overview: ["喷雾型防晒，SPF50、PA++++", "化学防晒剂复配，成膜快", "可透妆补涂"],
    functions: ["高倍防晒", "清爽速干", "便捷补涂"],
    keyIngredients: [
      "双-乙基己氧苯酚甲氧苯基三嗪",
      "乙基己基三嗪酮",
      "二乙氨基羟苯甲酰基苯甲酸己酯",
    ],
    challenges: ["喷雾的均匀成膜", "防晒剂在醇体系中的溶解"],
    texture: ["喷雾", "速干不黏"],
    applications: ["面部与身体防晒", "补涂防晒"],
  },
  {
    id: "after-sun-gel",
    area: "sun",
    title: "晒后舒缓修护啫喱",
    englishName: "After-Sun Soothing Gel",
    subtitle: "一款舒缓晒后泛红的清凉修护啫喱",
    overview: ["水凝胶型晒后修护", "芦荟与 AT Calm-ist™ 舒缓镇静", "尿囊素修护晒后干燥"],
    functions: ["晒后舒缓", "清凉镇静", "补水修护"],
    keyIngredients: ["芦荟叶汁", "AT Calm-ist™ 植物抗敏剂", "FM-AT 尿囊素"],
    challenges: ["凝胶透明度与稳定", "清凉感与刺激性的平衡"],
    texture: ["透明啫喱", "清凉不黏"],
    applications: ["晒后修护", "面部与身体"],
  },
];

type Counts = {
  home: Record<"nav" | "stats" | "products" | "offices" | "news" | "footer", number>;
  about: Record<
    | "countries"
    | "milestones"
    | "photos"
    | "cultureValues"
    | "outcomes"
    | "honors"
    | "subsidiaries",
    number
  >;
  products: Record<
    "categories" | "featured" | "catalogGroups" | "catalogItems" | "solutions",
    number
  >;
  insights: number;
  strengths: number;
};

const COUNTS: Record<"empty" | "one" | "many", Counts> = {
  empty: {
    home: { nav: 6, stats: 0, products: 0, offices: 0, news: 0, footer: 3 },
    about: {
      countries: 0,
      milestones: 0,
      photos: 0,
      cultureValues: 0,
      outcomes: 0,
      honors: 0,
      subsidiaries: 0,
    },
    products: { categories: 0, featured: 0, catalogGroups: 0, catalogItems: 0, solutions: 0 },
    insights: 0,
    strengths: 0,
  },
  one: {
    home: { nav: 6, stats: 1, products: 1, offices: 1, news: 1, footer: 1 },
    about: {
      countries: 1,
      milestones: 1,
      photos: 1,
      cultureValues: 1,
      outcomes: 1,
      honors: 1,
      subsidiaries: 1,
    },
    products: { categories: 1, featured: 1, catalogGroups: 1, catalogItems: 1, solutions: 1 },
    insights: 1,
    strengths: 1,
  },
  many: {
    home: { nav: 7, stats: 4, products: 6, offices: 22, news: 12, footer: 4 },
    about: {
      countries: 22,
      milestones: 19,
      photos: 14,
      cultureValues: 4,
      outcomes: 6,
      honors: 16,
      subsidiaries: 10,
    },
    products: { categories: 6, featured: 9, catalogGroups: 9, catalogItems: 40, solutions: 30 },
    insights: 8,
    strengths: 5,
  },
};

const resizeHome = ({ home, strengths }: Counts) => {
  setList(
    content.NAV_ITEMS,
    cycle(
      [...content.NAV_ITEMS, { label: "加入我们", href: "#careers" }],
      home.nav,
      (item) => item,
    ),
  );
  setList(
    content.STATS,
    cycle(
      [
        ...content.STATS,
        { label: "服务客户", value: "3,000", unit: "+", caption: "遍布 60 多个国家" },
      ],
      home.stats,
      (stat) => stat,
    ),
  );
  setList(
    content.STRENGTHS,
    cycle([...content.STRENGTHS, MANY_STRENGTH], strengths, (strength) => strength),
  );
  const extraProducts: Item<typeof content.PRODUCTS>[] = [
    {
      title: "运动营养",
      english: "Sports nutrition for endurance and strength training programs",
      description: "面向耐力与力量训练的营养方案",
      tags: ["蛋白质", "电解质"],
      image: content.PRODUCTS[0].image,
    },
    {
      title: "植物基食品",
      english: "Plant-based foods with plant proteins and clean-label ingredients",
      description: "植物蛋白与清洁标签配料",
      tags: ["植物蛋白", "天然色素"],
      image: content.PRODUCTS[1].image,
    },
  ];
  setList(
    content.PRODUCTS,
    cycle([...content.PRODUCTS, ...extraProducts], home.products, (product) => product),
  );
  const offices = content.OFFICE_COLUMNS.flatMap((column) =>
    column.flatMap((group) => group.offices.map((office) => ({ region: group.region, office }))),
  );
  const extraOffices = [
    { region: "亚洲", office: "上海，中国" },
    { region: "亚洲", office: "广州，中国" },
    { region: "亚洲", office: "胡志明市，越南" },
    { region: "亚洲", office: "首尔，韩国" },
    { region: "大洋洲", office: "悉尼，澳大利亚" },
    { region: "北美洲", office: "墨西哥城，墨西哥" },
  ];
  const kept = cycle(
    [...offices, ...extraOffices],
    Math.min(home.offices, offices.length + extraOffices.length),
    (entry) => entry,
  );
  const regions = [...new Set(kept.map((entry) => entry.region))];
  setList(
    content.OFFICE_COLUMNS,
    regions.map((region) => [
      {
        region,
        offices: kept.filter((entry) => entry.region === region).map((entry) => entry.office),
      },
    ]),
  );
  setList(
    content.NEWS,
    cycle(NEWS_EVENTS, home.news, (event, index) => ({
      title: `${index + 1}. ${event}`,
      details: ["[日期 · 地点待补充]", "[活动介绍待补充]"],
    })),
  );
  setList(
    content.FOOTER_COLUMNS,
    cycle(
      [
        ...content.FOOTER_COLUMNS,
        {
          heading: "关注我们",
          links: [{ label: "微信公众号" }, { label: "LinkedIn" }, { label: "视频号" }],
        },
      ],
      home.footer,
      (column) => column,
    ),
  );
};

const resizeAbout = ({ about: counts }: Counts, keepFixedCounts: boolean) => {
  setFields(about.ABOUT_HERO, {
    countries: cycle(COUNTRY_NAMES, counts.countries, (country) => country),
  });
  const extraMilestones = EXTRA_MILESTONE_YEARS.map((year) => ({
    year,
    events: [{ text: "启用区域仓储与应用技术中心" }],
  }));
  setFields(about.ABOUT_HISTORY, {
    milestones: [...about.ABOUT_HISTORY.milestones, ...extraMilestones]
      .sort((a, b) => a.year - b.year)
      .slice(0, counts.milestones),
  });
  if (!keepFixedCounts) {
    setFields(about.ABOUT_CAMPUS, {
      photos: cycle(about.ABOUT_CAMPUS.photos, counts.photos, (photo, index) =>
        index < about.ABOUT_CAMPUS.photos.length
          ? photo
          : {
              ...photo,
              id: `${photo.id}-${index}`,
              caption: `${photo.caption} ${Math.floor(index / 7) + 1}`,
            },
      ),
    });
    setFields(about.ABOUT_CULTURE, {
      values: cycle(
        [...about.ABOUT_CULTURE.values, MANY_CULTURE_VALUE],
        counts.cultureValues,
        (value) => value,
      ),
    });
  }
  const extraOutcomes = [
    { icon: "leaf", title: "使用可再生能源" },
    { icon: "recycle", title: "包装可回收" },
    { icon: "factory", title: "废水零排放" },
  ] as const;
  setFields(about.ABOUT_CSR, {
    outcomes: cycle(
      [...about.ABOUT_CSR.outcomes, ...extraOutcomes],
      counts.outcomes,
      (outcome) => outcome,
    ),
  });
  setFields(about.ABOUT_HONORS, {
    items: cycle(about.ABOUT_HONORS.items, counts.honors, (honor, index) =>
      index < about.ABOUT_HONORS.items.length
        ? honor
        : {
            ...honor,
            id: `honor-${index + 1}`,
            title: `${honor.title}（${2018 + (index % 8)} 年度）`,
          },
    ),
  });
  setFields(about.ABOUT_STRUCTURE, {
    subsidiaries: cycle(
      about.ABOUT_STRUCTURE.subsidiaries,
      counts.subsidiaries,
      (subsidiary, index) =>
        index < about.ABOUT_STRUCTURE.subsidiaries.length
          ? subsidiary
          : {
              id: `sub-${index + 1}`,
              name: subsidiary.name.replace("南京", "上海"),
              english: subsidiary.english.replace("Ltd.", "(Shanghai) Ltd."),
            },
    ),
  });
};

const resizeProducts = ({ products: counts }: Counts) => {
  setList(
    products.CATEGORIES,
    cycle(
      [
        ...products.CATEGORIES,
        {
          id: "sports-nutrition",
          label: "运动营养",
          englishLabel: "Sports nutrition and performance support",
        },
        {
          id: "plant-based",
          label: "植物基食品",
          englishLabel: "Plant-based foods and clean-label ingredients",
        },
      ],
      counts.categories,
      (category) => category,
    ),
  );
  setList(
    products.FEATURED_ITEMS,
    cycle(products.FEATURED_ITEMS, counts.featured, (item, index) => ({
      ...item,
      id: `${item.id}-${index}`,
    })),
  );
  const allItems = products.CATALOG_GROUPS.flatMap((group) => group.items);
  setList(
    products.CATALOG_GROUPS,
    cycle(products.CATALOG_GROUPS, counts.catalogGroups, (group, index) => ({
      ...group,
      id: `${group.id}-${index}`,
      label:
        index < products.CATALOG_GROUPS.length
          ? group.label
          : `${group.label}（补充目录 ${index + 1}）`,
      items:
        index === 0
          ? cycle(allItems, counts.catalogItems, (item, itemIndex) => ({
              ...item,
              id: `${item.id}-${itemIndex}`,
            }))
          : group.items,
    })),
  );
  const solutions = [...products.SOLUTION_ITEMS, ...EXTRA_SOLUTIONS];
  setList(
    products.SOLUTION_ITEMS,
    cycle(solutions, counts.solutions, (item, index) => ({
      ...item,
      id: `${item.id}-${index}`,
      title:
        index < solutions.length
          ? item.title
          : `${item.title} ${Math.floor(index / solutions.length) + 1}`,
    })),
  );
};

const resizeInsights = ({ insights: count }: Counts) => {
  const articles = [...insights.INSIGHTS_ARTICLES, ...WORST_INSIGHT_ARTICLES];
  setList(
    insights.INSIGHTS_ARTICLES,
    cycle(articles, count, (article, index) =>
      index < articles.length
        ? article
        : {
            ...article,
            id: `${article.id}-${index}`,
            title: `${article.title} ${Math.floor(index / articles.length) + 1}`,
            navLabel:
              article.navLabel === null
                ? null
                : `${article.navLabel} ${Math.floor(index / articles.length) + 1}`,
          },
    ),
  );
};

let applied = false;

export function applyDataset(
  dataset: Dataset,
  keepFixedCounts: boolean,
  articleCount: ArticleCount,
) {
  if (applied) return;
  applied = true;
  if (dataset === "worst") {
    WORST_HOME();
    WORST_ABOUT();
    WORST_PRODUCTS();
    WORST_INSIGHTS();
    return;
  }
  if (dataset === "demo") {
    if (articleCount > 1) TYPICAL_INSIGHTS(articleCount);
    return;
  }
  const counts = COUNTS[dataset];
  resizeHome(keepFixedCounts ? { ...counts, strengths: content.STRENGTHS.length } : counts);
  resizeAbout(counts, keepFixedCounts);
  resizeProducts(counts);
  resizeInsights(counts);
}
