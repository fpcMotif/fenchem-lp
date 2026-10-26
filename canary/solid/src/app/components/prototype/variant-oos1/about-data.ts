export const ABOUT_BANNER = {
  title: "关于泛成",
  tagline: "Rooted in nature, refined by science.",
  lead: "1995 年创立于南京 · 三十年专注营养、宠物健康与个人护理原料",
  established: "Est. 1995",
  place: "Nanjing · China",
  image: "/prototype/about/about-hero-campus.webp",
  alt: "Fenchem headquarters campus: a waterside path leading to the R&D and office building",
} as const;

export const ABOUT_HERO = {
  title: "南京泛成国际控股有限公司",
  englishTitle: "Fenchem Holdings Corporation Ltd.",
  lead: "自1995年创立于南京，专注于为食品营养品、宠物健康和个人护理行业提供原料和解决方案，建立起集研产销于一体的完整产业链。",
  networkLabel: "全球 16 家分支机构，遍布",
  countries: [
    "美国",
    "德国",
    "英国",
    "捷克",
    "巴西",
    "南非",
    "日本",
    "泰国",
    "马来西亚",
    "印度尼西亚",
    "菲律宾",
    "印度",
  ],
  lobbyImage: "/prototype/about/about-lobby.webp",
  lobbyCaption: "总部大堂",
  lobbyEnglish: "Headquarters lobby",
  navChips: [
    { label: "企业概况", english: "Profile", id: "about-profile" },
    { label: "园区环境", english: "Campus", id: "about-campus" },
    { label: "企业文化", english: "Culture", id: "about-culture" },
    { label: "社会责任", english: "Responsibility", id: "about-csr" },
    { label: "企业荣誉", english: "Honors", id: "about-honor" },
    { label: "企业架构", english: "Structure", id: "about-structure" },
  ],
} as const;

export const ABOUT_HISTORY = {
  navChip: { label: "发展历程", english: "Milestones", id: "about-history" },
  eyebrow: "Milestones",
  title: "发展历程",
  caption: "双螺旋每交汇一次，即走过一年",
  milestones: [
    {
      year: 1995,
      kicker: "Beginning",
      events: [{ text: "在中国-南京成立总部" }],
    },
    {
      year: 2007,
      events: [{ entity: "Fenchem Inc.", text: "在美国加利福尼亚州成立" }],
    },
    {
      year: 2009,
      events: [{ entity: "Fenchem Europe", text: "在捷克共和国斯特拉瓦成立" }],
    },
    {
      year: 2011,
      events: [
        { entity: "Fenchem Malaysia", text: "在马来西亚吉隆坡成立" },
        { text: "启动全球采购" },
        { text: "建立生产基地和研发中心" },
      ],
    },
    {
      year: 2012,
      events: [{ entity: "Fenchem S.A", text: "在南非约翰内斯堡成立" }],
    },
    {
      year: 2013,
      events: [{ entity: "Fenchem GmbH", text: "在德国科隆成立" }],
    },
    {
      year: 2015,
      events: [
        { entity: "Fenchem Thailand", text: "在泰国曼谷成立" },
        { text: "第二家美国分公司在爱荷华州成立" },
        { entity: "Fenchem Brazil", text: "在巴西圣保罗成立" },
      ],
    },
    {
      year: 2021,
      events: [
        { text: "泛成荣获国家高新技术企业称号" },
        { entity: "Fenchem Indonesia", text: "在印度尼西亚雅加达成立" },
      ],
    },
    {
      year: 2023,
      events: [
        { entity: "Fenchem Japan", text: "在日本东京成立" },
        { entity: "Fenchem Philippines", text: "在菲律宾马尼拉成立" },
      ],
    },
    {
      year: 2024,
      events: [
        { text: "在中国启用新园区和工厂" },
        { entity: "Fenchem India", text: "在印度孟买成立" },
        { text: "第三家美国分公司在新泽西州成立" },
        { entity: "Fenchem UK", text: "在曼彻斯特成立" },
      ],
    },
  ],
} as const;

export const ABOUT_MOMENT = {
  image: "/prototype/about/about-campus-panorama.webp",
  alt: "Aerial view of Fenchem headquarters: the R&D building, rooftop garden, and wide green space",
  caption: "泛成总部园区 · 南京",
} as const;

export const ABOUT_CAMPUS = {
  eyebrow: "Campus",
  title: "园区环境",
  photos: [
    {
      id: "aerial",
      src: "/prototype/about/campus-aerial.webp",
      large: "/prototype/about/campus-aerial-lg.webp",
      alt: "Aerial view of the Fenchem headquarters building with its rooftop garden and campus greenery",
      description: "泛成总部大楼鸟瞰，屋顶花园与园区绿地",
      caption: "总部园区",
      english: "Headquarters campus",
      span: "feature",
    },
    {
      id: "lab",
      src: "/prototype/about/campus-lab.webp",
      large: "/prototype/about/campus-lab-lg.webp",
      alt: "R&D lab corridor with glass partitions",
      description: "玻璃隔断的研发实验室走廊",
      caption: "研发实验室",
      english: "R&D lab",
      span: "wide",
    },
    {
      id: "showroom",
      src: "/prototype/about/campus-showroom.webp",
      large: "/prototype/about/campus-showroom-lg.webp",
      alt: "Company showroom and history wall",
      description: "企业展厅与发展历程展墙",
      caption: "企业展厅",
      english: "Company showroom",
      span: "single",
    },
    {
      id: "reception",
      src: "/prototype/about/campus-reception.webp",
      large: "/prototype/about/campus-reception-lg.webp",
      alt: "Reception desk with the Fenchem logo",
      description: "带有泛成标识的接待前台",
      caption: "接待大厅",
      english: "Reception hall",
      span: "single",
    },
    {
      id: "lounge",
      src: "/prototype/about/campus-lounge.webp",
      large: "/prototype/about/campus-lounge-lg.webp",
      alt: "Bright staff lounge and meeting space",
      description: "明亮的员工休闲与交流空间",
      caption: "员工休闲区",
      english: "Staff lounge",
      span: "wide",
    },
    {
      id: "office",
      src: "/prototype/about/campus-office.webp",
      large: "/prototype/about/campus-office-lg.webp",
      alt: "Open-plan office with glass meeting rooms",
      description: "开放式办公区与玻璃会议室",
      caption: "开放办公区",
      english: "Open-plan office",
      span: "single",
    },
    {
      id: "grounds",
      src: "/prototype/about/campus-grounds.webp",
      large: "/prototype/about/campus-grounds-lg.webp",
      alt: "Fenchem R&D building with a lawn under a blue sky",
      description: "草坪与蓝天下的泛成研发大楼",
      caption: "园区绿地",
      english: "Campus green",
      span: "single",
    },
  ],
} as const;

export const ABOUT_CULTURE = {
  eyebrow: "Culture",
  title: "企业文化",
  values: [
    {
      glyph: "专",
      title: "专业和专注",
      desc: "始终专注于原料领域，凭借多年的行业经验和技术积累，确保每一个解决方案都专业、可靠。",
      tone: "blue",
    },
    {
      glyph: "静",
      title: "安静与坚持",
      desc: "低调踏实地深耕自己的领域，坚持长期主义；无论市场如何变化，都坚持做难而正确的事。",
      tone: "sand",
    },
    {
      glyph: "新",
      title: "合作与创新",
      desc: "重视团队合作，坚信创新是企业的基石，持续开发新产品和新技术，与客户共同成长。",
      tone: "green",
    },
  ],
} as const;

export const ABOUT_CSR = {
  title: "社会责任",
  statement: ["平衡生态环境和客户需求，", "确保可持续发展。"],
  desc: "在碳达峰碳中和的大背景下，我们将可持续发展理念与企业发展战略相融合，在产品中积极运用可持续科技。",
  image: "/prototype/about/csr-campus-lake.webp",
  imageAlt: "Campus pond reflecting the Fenchem R&D building and trees",
  outcomes: [
    { icon: "factory", title: "降低工业能耗" },
    { icon: "recycle", title: "减少原料损耗" },
    { icon: "leaf", title: "减少碳足迹" },
  ],
} as const;

export const ABOUT_HONORS = {
  eyebrow: "Honors",
  title: "企业荣誉",
  items: [
    {
      id: "honor-1",
      title: "国家高新技术企业",
      english: "National High-Tech Enterprise",
      level: "national",
    },
    {
      id: "honor-2",
      title: "江苏省专精特新中小企业",
      english: "Jiangsu Specialized and Innovative SME",
      level: "provincial",
    },
    {
      id: "honor-3",
      title: "江苏省瞪羚企业",
      english: "Jiangsu Gazelle Enterprise",
      level: "provincial",
    },
    {
      id: "honor-4",
      title: "江苏省民营科技企业",
      english: "Jiangsu Private Technology Enterprise",
      level: "provincial",
    },
    {
      id: "honor-5",
      title: "江苏省国际知名品牌",
      english: "Jiangsu Internationally Renowned Brand",
      level: "provincial",
    },
    {
      id: "honor-6",
      title: "南京市创新型中小企业",
      english: "Nanjing Innovative SME",
      level: "municipal",
    },
    {
      id: "honor-7",
      title: "南京市级企业技术中心",
      english: "Nanjing Enterprise Technology Center",
      level: "municipal",
    },
    {
      id: "honor-8",
      title: "南京市工程技术研究中心",
      english: "Nanjing Engineering Technology Research Center",
      level: "municipal",
    },
  ],
} as const;

export const ABOUT_STRUCTURE = {
  eyebrow: "Structure",
  title: "企业架构",
  chartImage: "/prototype/about/corporate-structure.png",
  holding: {
    badge: "控股公司",
    badgeEnglish: "Holding company",
    name: "南京泛成国际控股有限公司",
    english: "Fenchem Holdings Corporation Ltd.",
  },
  subsidiaryBadge: "全资子公司",
  subsidiaryBadgeEnglish: "Wholly owned subsidiary",
  subsidiaries: [
    { id: "sub-1", name: "南京豪亚生物化工有限公司", english: "Fenchem Supply Chain Ltd." },
    { id: "sub-2", name: "南京嘉驰生物科技有限公司", english: "Giant Ingredients Ltd." },
    { id: "sub-3", name: "南京汇峰生物科技有限公司", english: "Nanjing Mountain Front Ltd." },
    { id: "sub-4", name: "南京百佳得生物化工有限公司", english: "Pegasus Ltd." },
    { id: "sub-5", name: "南京泛成生物科技有限公司", english: "Fenchem Biotech Ltd." },
  ],
} as const;
