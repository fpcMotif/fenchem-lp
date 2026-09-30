export const ABOUT_HERO = {
  kicker: "ABOUT US · 关于我们",
  title: "南京泛成国际控股有限公司",
  englishTitle: "Fenchem Holdings Corporation Ltd.",
  lead: "自1995年创立于南京，是一家专注于为食品营养品、宠物健康和个人护理行业提供原料和解决方案的供应商。三十年来，我们专注研发、生产与销售，建立起集研产销于一体的完整产业链，始终致力于为客户提供更高品质、更具价值的产品与服务。",
  sublead:
    "为更好地服务国际客户，泛成持续拓展全球网络。如今，我们在全球拥有超过13家分支机构，遍布美国、德国、英国、捷克、巴西、南非、日本、泰国、马来西亚、印度尼西亚、菲律宾、印度等地，形成辐射各大洲的本地化服务与销售体系。无论客户身在何处，都能获得我们及时、专业、全方位的支持，实现全球资源与本地需求的高效对接。",
  bannerImage: "/prototype/official-site/campus.webp",
  lobbyImage: "/prototype/about/about-lobby.png",
  highlights: [
    "集研产销一体化完整产业链",
    "全球13+海外本地化分支机构",
    "业务辐射全球80+国家与地区",
    "长期服务500+国际知名品牌",
  ],
  navChips: [
    { label: "企业概况", href: "#about-profile" },
    { label: "发展数据", href: "#about-stats" },
    { label: "企业文化", href: "#about-culture" },
    { label: "社会责任", href: "#about-csr" },
    { label: "企业荣誉", href: "#about-honor" },
    { label: "企业架构", href: "#about-structure" },
  ],
} as const;

export const ABOUT_STATS = [
  { value: "30", unit: "+", label: "年行业深耕经验" },
  { value: "13", unit: "+", label: "家海外分支机构" },
  { value: "80", unit: "+", label: "个辐射服务国家" },
  { value: "500", unit: "+", label: "家全球品牌客户" },
] as const;

export const ABOUT_CULTURE = {
  kicker: "CORPORATE CULTURE",
  title: "企业文化",
  slogan: "专业和专注、安静与坚持、合作与创新",
  cards: [
    {
      index: "01",
      title: "专业和专注",
      english: "MAJOR AND FOCUS",
      desc: "我们始终专注于原料领域，致力于为客户提供高质量的产品和服务。凭借多年的行业经验和技术积累，我们深入了解市场需求，确保每一个解决方案都具备卓越的专业性和可靠性。",
      tags: ["原料深耕", "技术积累", "专业可靠"],
      tone: "blue",
    },
    {
      index: "02",
      title: "安静与坚持",
      english: "QUIETNESS AND PERSISTENCE",
      desc: "我们低调踏实地深耕于自己的领域，始终坚持长期主义的理念。无论市场如何变化，我们都坚持做难而正确的事，保持稳健发展，持续为客户提供高品质的产品和服务。",
      tags: ["低调踏实", "长期主义", "稳健前行"],
      tone: "cream",
    },
    {
      index: "03",
      title: "合作与创新",
      english: "COOPERATION AND INNOVATION",
      desc: "我们重视团队合作，鼓励激情参与，共同推动企业发展。我们坚信创新是企业的基石，持续开发新产品和新技术，以满足不断变化的市场需求，实现与客户的共同成长。",
      tags: ["团队协作", "自主研发", "协同成长"],
      tone: "green",
    },
  ],
} as const;

export const ABOUT_CSR = {
  kicker: "CORPORATE SOCIAL RESPONSIBILITY",
  title: "社会责任",
  slogan: "平衡生态环境和客户需求，确保可持续发展。",
  desc: "在碳达峰碳中和的大背景下，可持续发展已经成为全球共识，也成为客户和消费者选择产品的标准之一。我们紧跟时代趋势，积极承担企业社会责任，将可持续发展理念与企业发展战略相融合，在产品中积极运用可持续科技，有效降低工业能耗和原料损耗，减少碳足迹，实现环境、社会与经济效益的统一。",
  image: "/prototype/about/about-csr-globe.png",
  pillars: [
    {
      num: "01",
      title: "绿色低碳与节能减排",
      desc: "优化精益生产与工艺流程，在生产基地持续推进清洁能源利用与工业能耗精细化管控，切实降低单位产品碳足迹。",
    },
    {
      num: "02",
      title: "可持续科技与天然源溯源",
      desc: "积极运用生物转化与绿色提取技术，开发低损耗、高生物利用度的原料配方，协同全球上游推进可再生与负责任种植。",
    },
    {
      num: "03",
      title: "产业共荣与全球责任生态",
      desc: "将企业责任延伸至全球13个海外分支及供应链伙伴，践行合规采购、员工福祉关怀与社区共建，实现多方共赢发展。",
    },
  ],
} as const;

export const ABOUT_HONORS = {
  kicker: "ENTERPRISE HONOR",
  title: "企业荣誉",
  lead: "三十年稳健经营与自主创新，泛成先后斩获国家、省、市各级权威主管部门与行业协会颁发的重量级荣誉与资质认定。",
  items: [
    {
      id: "honor-1",
      title: "国家高新技术企业",
      subtitle: "NATIONAL HIGH-TECH ENTERPRISE",
      tier: "国家级权威认定",
      image: "/prototype/about/honor-1.png",
      desc: "持续研发投入、高素质技术人才与自主知识产权核心竞争力的国家级权威认证。",
    },
    {
      id: "honor-2",
      title: "江苏省专精特新中小企业",
      subtitle: "JIANGSU SPECIALIZED & SOPHISTICATED SME",
      tier: "省级重点培育认定",
      image: "/prototype/about/honor-2.png",
      desc: "在细分原料赛道具备专业化、精细化、特色化与新颖化核心能力的标杆企业。",
    },
    {
      id: "honor-3",
      title: "江苏省瞪羚企业",
      subtitle: "JIANGSU GAZELLE ENTERPRISE",
      tier: "省级高成长性认证",
      image: "/prototype/about/honor-3.png",
      desc: "跨越创业初期的死亡谷、以超常规高速度发展且具有强大创新活力的标杆示范企业。",
    },
    {
      id: "honor-4",
      title: "江苏省民营科技企业",
      subtitle: "JIANGSU PRIVATE SCIENCE & TECHNOLOGY ENTERPRISE",
      tier: "省级科技企业认证",
      image: "/prototype/about/honor-4.png",
      desc: "坚持科技自主创新、科技成果高效转化与产业化高质量发展的优秀民营企业。",
    },
    {
      id: "honor-5",
      title: "江苏省国际知名品牌",
      subtitle: "JIANGSU FAMOUS INTERNATIONAL BRAND",
      tier: "省商务厅重点认定",
      image: "/prototype/about/honor-5.png",
      desc: "在全球市场具备高品牌知名度、优秀外贸竞争力与良好国际声誉的出海品牌代表。",
    },
    {
      id: "honor-6",
      title: "南京市创新型中小企业",
      subtitle: "NANJING INNOVATIVE SME",
      tier: "市级核心创新认证",
      image: "/prototype/about/honor-6.png",
      desc: "健全的研发创新体系与成果转化机制，驱动高质量增长的创新先锋。",
    },
    {
      id: "honor-7",
      title: "南京市级企业技术中心",
      subtitle: "NANJING MUNICIPAL ENTERPRISE TECH CENTER",
      tier: "市级研发平台资质",
      image: "/prototype/about/honor-7.png",
      desc: "具备高水平研发试验条件与核心技术攻坚能力的企业级综合技术创新高地。",
    },
    {
      id: "honor-8",
      title: "南京市工程技术研究中心",
      subtitle: "NANJING ENGINEERING TECH RESEARCH CENTER",
      tier: "市级工程技术转化平台",
      image: "/prototype/about/honor-8.png",
      desc: "专注于原料关键共性技术研究、工程化验证与产业化应用集成的示范研发中心。",
    },
  ],
} as const;

export const ABOUT_STRUCTURE = {
  kicker: "CORPORATE STRUCTURE",
  title: "企业结构",
  lead: "集团以南京泛成国际控股有限公司为战略运营核心，设立五大专业化全资子公司，形成协同高效、纵深覆盖的产业矩阵。",
  chartImage: "/prototype/about/corporate-structure.png",
  holding: {
    badge: "控股公司 · 集团总部",
    name: "南京泛成国际控股有限公司",
    english: "Fenchem Holdings Corporation Ltd.",
    summary: "战略决策、全球投资、资本运作、跨国供应链调度与品牌统筹中心。",
  },
  subsidiaries: [
    {
      id: "sub-1",
      badge: "全资子公司 · 01",
      name: "南京豪亚生物化工有限公司",
      english: "Fenchem Supply Chain Ltd.",
      focus: "供应链与国际物流",
      desc: "专注国际航运物流、保税仓储、清关合规与全球原料敏捷调度，为跨大洲交付提供稳定时效保障。",
    },
    {
      id: "sub-2",
      badge: "全资子公司 · 02",
      name: "南京嘉驰生物科技有限公司",
      english: "Giant Ingredients Ltd.",
      focus: "食品与功能营养配料",
      desc: "专注食品添加剂、膳食补充剂原料、功能糖醇与定制预混料方案，赋能健康食品与饮料品牌创新。",
    },
    {
      id: "sub-3",
      badge: "全资子公司 · 03",
      name: "南京汇峰生物科技有限公司",
      english: "Nanjing Mountain Front Ltd.",
      focus: "个人护理与美妆原料",
      desc: "专注护肤活性物、天然来源防腐增效剂、绿色表活与功效护发原料，助力全球化妆品配方升级。",
    },
    {
      id: "sub-4",
      badge: "全资子公司 · 04",
      name: "南京百佳得生物化工有限公司",
      english: "Pegasus Ltd.",
      focus: "宠物健康与动物营养",
      desc: "专注宠物功能营养成分、天然抗氧化剂与动物保健配料，满足伴侣动物全生命周期的健康需求。",
    },
    {
      id: "sub-5",
      badge: "全资子公司 · 05",
      name: "南京泛成生物科技有限公司",
      english: "Fenchem Biotech Ltd.",
      focus: "前沿生物科技与配方研发",
      desc: "聚焦生物发酵合成、酶催化工程与微胶囊包埋技术，攻克活性成分稳定性与规模化转化难题。",
    },
  ],
} as const;
