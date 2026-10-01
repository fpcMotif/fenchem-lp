export const ABOUT_BANNER = {
  title: "关于泛成",
  tagline: "Rooted in nature, refined by science.",
  lead: "1995 年创立于南京 · 三十年专注营养、宠物健康与个人护理原料",
  established: "Est. 1995",
  place: "Nanjing · China",
  image: "/prototype/about/about-hero-campus.webp",
  alt: "泛成总部园区外景：水景步道通向研发与办公大楼",
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
  navChips: [
    { label: "企业概况", id: "about-profile" },
    { label: "园区环境", id: "about-campus" },
    { label: "企业文化", id: "about-culture" },
    { label: "社会责任", id: "about-csr" },
    { label: "企业荣誉", id: "about-honor" },
    { label: "企业架构", id: "about-structure" },
  ],
} as const;

export const ABOUT_MOMENT = {
  image: "/prototype/about/about-campus-panorama.webp",
  alt: "泛成总部园区鸟瞰：研发大楼、屋顶花园与大片绿地",
  caption: "泛成总部园区 · 南京",
} as const;

export const ABOUT_CAMPUS = {
  title: "园区环境",
  photos: [
    {
      id: "aerial",
      src: "/prototype/about/campus-aerial.webp",
      large: "/prototype/about/campus-aerial-lg.webp",
      alt: "泛成总部大楼鸟瞰，屋顶花园与园区绿地",
      caption: "总部园区",
      span: "feature",
    },
    {
      id: "lab",
      src: "/prototype/about/campus-lab.webp",
      large: "/prototype/about/campus-lab-lg.webp",
      alt: "玻璃隔断的研发实验室走廊",
      caption: "研发实验室",
      span: "wide",
    },
    {
      id: "showroom",
      src: "/prototype/about/campus-showroom.webp",
      large: "/prototype/about/campus-showroom-lg.webp",
      alt: "企业展厅与发展历程展墙",
      caption: "企业展厅",
      span: "single",
    },
    {
      id: "reception",
      src: "/prototype/about/campus-reception.webp",
      large: "/prototype/about/campus-reception-lg.webp",
      alt: "带有泛成标识的接待前台",
      caption: "接待大厅",
      span: "single",
    },
    {
      id: "lounge",
      src: "/prototype/about/campus-lounge.webp",
      large: "/prototype/about/campus-lounge-lg.webp",
      alt: "明亮的员工休闲与交流空间",
      caption: "员工休闲区",
      span: "wide",
    },
    {
      id: "office",
      src: "/prototype/about/campus-office.webp",
      large: "/prototype/about/campus-office-lg.webp",
      alt: "开放式办公区与玻璃会议室",
      caption: "开放办公区",
      span: "single",
    },
    {
      id: "grounds",
      src: "/prototype/about/campus-grounds.webp",
      large: "/prototype/about/campus-grounds-lg.webp",
      alt: "草坪与蓝天下的泛成研发大楼",
      caption: "园区绿地",
      span: "single",
    },
  ],
} as const;

export const ABOUT_CULTURE = {
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
  imageAlt: "泛成园区水景倒映研发大楼与绿树",
  outcomes: [
    { icon: "factory", title: "降低工业能耗" },
    { icon: "recycle", title: "减少原料损耗" },
    { icon: "leaf", title: "减少碳足迹" },
  ],
} as const;

export const ABOUT_HONORS = {
  title: "企业荣誉",
  items: [
    { id: "honor-1", title: "国家高新技术企业", level: "national" },
    { id: "honor-2", title: "江苏省专精特新中小企业", level: "provincial" },
    { id: "honor-3", title: "江苏省瞪羚企业", level: "provincial" },
    { id: "honor-4", title: "江苏省民营科技企业", level: "provincial" },
    { id: "honor-5", title: "江苏省国际知名品牌", level: "provincial" },
    { id: "honor-6", title: "南京市创新型中小企业", level: "municipal" },
    { id: "honor-7", title: "南京市级企业技术中心", level: "municipal" },
    { id: "honor-8", title: "南京市工程技术研究中心", level: "municipal" },
  ],
} as const;

export const ABOUT_STRUCTURE = {
  title: "企业结构",
  chartImage: "/prototype/about/corporate-structure.png",
  holding: {
    badge: "控股公司",
    name: "南京泛成国际控股有限公司",
    english: "Fenchem Holdings Corporation Ltd.",
  },
  subsidiaryBadge: "全资子公司",
  subsidiaries: [
    { id: "sub-1", name: "南京豪亚生物化工有限公司", english: "Fenchem Supply Chain Ltd." },
    { id: "sub-2", name: "南京嘉驰生物科技有限公司", english: "Giant Ingredients Ltd." },
    { id: "sub-3", name: "南京汇峰生物科技有限公司", english: "Nanjing Mountain Front Ltd." },
    { id: "sub-4", name: "南京百佳得生物化工有限公司", english: "Pegasus Ltd." },
    { id: "sub-5", name: "南京泛成生物科技有限公司", english: "Fenchem Biotech Ltd." },
  ],
} as const;
