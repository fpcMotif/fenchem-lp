export type DomesticShow = {
  id: string;
  title: string;
  when: string;
  booth: string;
};

/** Append a show here when the next domestic exhibition is confirmed. */
export const DOMESTIC_SHOWS: readonly DomesticShow[] = [
  {
    id: "pchi-2027",
    title: "PCHi 2027 中国国际化妆品个人及家庭护理用品原料展览会",
    when: "2027 年 2 月 24 – 26 日",
    booth: "展位号 3D39",
  },
  {
    id: "fic-2027",
    title: "FIC 2027 中国国际食品添加剂和配料展览会",
    when: "2027 年 3 月 17 – 19 日",
    booth: "展位号 3Y01",
  },
  {
    id: "fia-2027",
    title: "FIA 2027 亚洲食品配料中国展",
    when: "2027 年 6 月 22 – 24 日",
    booth: "展位号 41H30",
  },
  {
    id: "pct-2027",
    title: "PCT 2027 个人护理品技术高峰论坛",
    when: "2027 年 7 月",
    booth: "",
  },
];

export type CompanyNewsItem = {
  id: string;
  title: string;
  published: string;
  paragraphs: readonly string[];
};

/**
 * Company news. Add the next item to this list; an empty list renders the
 * placeholder in the news page.
 */
export const COMPANY_NEWS: readonly CompanyNewsItem[] = [
  {
    id: "specialized-sme-2024",
    title: "泛成获评江苏省专精特新中小企业，主导产品硫酸软骨素获认可",
    published: "2024年5月",
    paragraphs: [
      "我公司成功入选江苏省专精特新中小企业名单，主导产品硫酸软骨素获得认定。",
      "“专精特新”中小企业是指具备专业化、精细化、特色化、新颖化特征的中小企业，重点考察企业在细分领域的专注程度与创新能力。公司长期深耕硫酸软骨素领域，在原料提取、工艺优化与质量控制方面形成了自身特色。",
      "此次获评，是对公司专业化发展路径的肯定。公司将继续聚焦硫酸软骨素及相关生物制品的研发与生产，做深做精，巩固在细分领域的技术与市场优势。",
    ],
  },
  {
    id: "gazelle-2024",
    title: "泛成获评“江苏省瞪羚企业”",
    published: "2024年10月",
    paragraphs: [
      "近日，我公司成功入选江苏省瞪羚企业名单。",
      "瞪羚企业是指跨越创业期，以科技创新或商业模式创新为支撑，进入高成长期的中小企业。该资质的获得，是对公司近年来成长速度、创新活力与发展潜力的认可。",
      "作为一家专注于生物科技领域的企业，公司将持续加大研发投入，保持技术优势，以更优质的产品与服务回馈客户与市场。",
    ],
  },
  {
    id: "high-tech-2024",
    title: "泛成硫酸软骨素、复合抗氧化剂相关技术获高新技术企业认定",
    published: "2024年11月",
    paragraphs: [
      "我公司凭借在硫酸软骨素及复合抗氧化剂领域的技术积累与创新成果，成功获得高新技术企业认定。",
      "高新技术企业认定对企业核心自主知识产权、研发投入、科技成果转化能力等方面均有明确要求。此次获评，标志着公司在上述产品方向上的技术实力与规范化管理水平得到了认可。",
      "未来，公司将继续围绕硫酸软骨素与复合抗氧化剂的核心技术深化研发，推动产品品质与生产工艺的持续提升。",
    ],
  },
];

export const NEWS_PAGE = {
  title: "新闻资讯",
  lead: "展会行程与公司近况，集中在这里。",
  showsTitle: "国内展会",
  showsLead: "即将参加的国内展会与论坛。",
  companyTitle: "公司新闻",
  companyEmpty: "内容整理中，随后补充。",
} as const;
