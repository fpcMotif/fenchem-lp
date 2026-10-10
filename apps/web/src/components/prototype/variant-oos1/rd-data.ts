export const RD_HEADER = {
  title: "R&D & Manufacturing",
  chineseTitle: "研发与生产",
  lead: "以前沿配方科学与绿色工程智造，驱动健康与美妆原料的下一代突破。",
  englishLead: "Science-driven efficacy, precision manufacturing.",
} as const;

export const RD_METRICS = [
  { value: "35,000", unit: "m²", label: "智造基地", desc: "符合国际 cGMP 规范" },
  { value: "100,000", unit: "级", label: "洁净车间", desc: "恒温恒湿正负压隔离" },
  { value: "DCS", unit: "自控", label: "闭环集成控制", desc: "全程数字化温控与压力记录" },
  { value: "98.5", unit: "%", label: "溶剂循环回收率", desc: "低碳绿色化学工程" },
] as const;

export const RD_NAV_CHIPS = [
  { id: "rd-platforms", label: "研发创新平台" },
  { id: "rd-facilities", label: "智能制造基地" },
  { id: "rd-tech", label: "核心工艺矩阵" },
  { id: "rd-quality", label: "质量与合规" },
] as const;

export type PlatformItem = {
  id: string;
  name: string;
  english: string;
  badge: string;
  summary: string;
  points: readonly string[];
  image: string;
  stat: { value: string; label: string };
};

export const RD_PLATFORMS: readonly PlatformItem[] = [
  {
    id: "formulation",
    name: "感官美学与配方应用实验室",
    english: "Sensory & Formulation Studio",
    badge: "感官美学与肤感科学",
    summary:
      "配备高精度旋转流变仪与感官质构评价舱，不仅提供高纯原料，更协助客户在 2 周内完成乳霜、精华与凝露的原型配方验证与打样。",
    points: [
      "活性物多相微乳化与热力学稳定性测试 (45°C / 3个月)",
      "流变学质构分析与感官雷达图谱绘制",
      "护肤、洗护与防晒配方体系定制及相容性评估",
    ],
    image: "/prototype/about/campus-lab.webp",
    stat: { value: "300+", label: "每年验证原型配方" },
  },
  {
    id: "delivery",
    name: "纳米载体与微囊包裹中心",
    english: "Active Delivery & Encapsulation",
    badge: "靶向递送与保活技术",
    summary:
      "针对视黄醇、多肽及维生素C等易失活原料，构建磷脂双分子层微囊与冷水自乳化技术，显著提升透皮吸收效率并降低刺激性。",
    points: [
      "纳米级多层微囊粒径均一分布 (100–180 nm)",
      "水溶与脂溶性成分双效共载技术",
      "光照与热敏性原料 12 个月保活率提高 40%+",
    ],
    image: "/prototype/about/campus-showroom.webp",
    stat: { value: "<150nm", label: "微囊平均粒径" },
  },
  {
    id: "efficacy",
    name: "细胞生物学与功效验证平台",
    english: "Cell Biology & Efficacy Lab",
    badge: "体外机制与临床背书",
    summary:
      "建立人角质形成细胞 (HaCaT) 与成纤维细胞模型，通过 qPCR 基因表达分析及 3D 人表皮模型，科学量化评估原料屏障修护与抗光老化机制。",
    points: [
      "I型/III型胶原蛋白及弹性蛋白 mRNA 表达测定",
      "NF-κB、IL-1α 炎症通线下调评估",
      "3D 重建人表皮模型 (RhE) 安全性与屏障修护验证",
    ],
    image: "/prototype/about/campus-office.webp",
    stat: { value: "99.2%", label: "机理重现率" },
  },
  {
    id: "fermentation",
    name: "合成生物与微生物发酵工程",
    english: "Synthetic Biology & Fermentation",
    badge: "绿色生物智造",
    summary:
      "结合代谢通路设计与工业级发酵罐群，从 50L 种子罐到 10,000L 全自动化发酵生产线，实现依克多因与高纯透明质酸钠的超高收率生产。",
    points: [
      "高密度微生物发酵自动补料控制",
      "超滤膜截留纯化与内毒素去除技术",
      "相比传统化工路线，综合碳足迹降低 65%",
    ],
    image: "/prototype/about/campus-grounds.webp",
    stat: { value: "10,000L", label: "单批发酵罐容" },
  },
];

export const RD_TECH_STEPS = [
  {
    step: "01",
    title: "优质天然植物溯源",
    desc: "全球严选 GAP 种植庄园生物基原料，批次全农残与重金属 GC/MS 筛查。",
  },
  {
    step: "02",
    title: "绿色超临界与酶法提取",
    desc: "超临界 CO₂ 与酶解技术低温萃取，零有机溶剂残留，最大化保留多酚活性。",
  },
  {
    step: "03",
    title: "精密分子膜分离纯化",
    desc: "多级精密反渗透与截留纳滤系统，去除杂质异味，色泽透亮、纯度达 98%+。",
  },
  {
    step: "04",
    title: "低温惰性喷雾干燥微囊",
    desc: "双流体低温喷雾成形均匀球形微粒，赋予极佳流动性与冷水速溶分散度。",
  },
  {
    step: "05",
    title: "全项目分析放行与留样",
    desc: "严苛依据 CP/USP/EP 标准，出具 HPLC/GC/ICP-MS 全检 COA 并留样 3 年以上。",
  },
] as const;

export const RD_CERTIFICATIONS = [
  { name: "cGMP", desc: "良好生产规范认证" },
  { name: "ISO 9001:2015", desc: "国际质量管理体系" },
  { name: "FSSC 22000", desc: "食品安全体系认证" },
  { name: "ISO 22716", desc: "化妆品良好生产规范" },
  { name: "EcoVadis 认证", desc: "企业社会责任评估" },
  { name: "Halal 清真认证", desc: "清真洁净合规" },
  { name: "Kosher 犹太认证", desc: "犹太洁食合规" },
  { name: "RSPO 认证", desc: "可持续棕榈油供应链" },
] as const;
