export const CONTACT_BANNER = {
  title: "联系我们",
  tagline: "Talk to the people behind the ingredients.",
  lead: "申请试样、咨询配方或探讨定制研发，泛成技术团队随时恭候您的联络。",
  meta: ["Mon – Fri 08:30 – 17:30", "Nanjing · China"],
  image: "/prototype/official-site/campus-lake.webp",
  imageAlt: "泛成南京园区研发楼与景观水池",
} as const;

const HQ_ADDRESS = "南京市秦淮区洪武路359号财富大厦19层";
const OFFICE_HOURS = "周一至周五 08:30 – 17:30";

export const CONTACT_NAV_CHIPS = [
  { id: "contact", label: "在线咨询" },
  { id: "contact-visit", label: "交通位置" },
  { id: "contact-faq", label: "常见问题" },
] as const;

export const INQUIRY_INTRO = {
  eyebrow: "Get in touch",
  title: "告诉我们您的需求",
  lead: "填写表单后，专属客户经理与应用工程师会在工作日 24 小时内与您联系。",
  brochureLabel: "下载企业画册与产品目录 (PDF)",
} as const;

export const CONTACT_DETAILS = [
  { term: "咨询专线", value: "025-8421 8888", href: "tel:+862584218888" },
  { term: "商务报价", value: "sales@fenchem.com", href: "mailto:sales@fenchem.com" },
  { term: "综合事务", value: "info@fenchem.com", href: "mailto:info@fenchem.com" },
  { term: "总部地址", value: HQ_ADDRESS, href: null },
  { term: "工作时间", value: OFFICE_HOURS, href: null },
] as const;

export const VISIT_INTRO = {
  eyebrow: "Visit us",
  title: "交通位置",
  lead: "到访前请通过表单预约，我们会提前安排专人接待与参观路线。",
} as const;

export const VISIT_LOCATION = {
  name: "南京泛成国际控股有限公司",
  pinLabel: "泛成总部",
  address: HQ_ADDRESS,
  hours: OFFICE_HOURS,
} as const;

export const SERVICE_PROMISES = [
  "48 小时内顺丰寄样",
  "随样附 COA、TDS 与 MSDS",
  "1 对 1 资深配方工程师答疑",
] as const;

export const INQUIRY_SUBJECTS = [
  {
    id: "sample",
    label: "申请样品",
    placeholder: "请填写所需原料品名、纯度规格、测试剂型（如精华、乳霜、功能饮品）及样品收件地址",
  },
  {
    id: "formulation",
    label: "配方与技术支持",
    placeholder: "请描述目标功效、剂型与当前配方遇到的问题，如添加比例、稳定性或感官表现",
  },
  {
    id: "quote",
    label: "商务报价",
    placeholder: "请填写品名、规格、预计年用量、包装要求与交付地点",
  },
  {
    id: "visit",
    label: "参观交流",
    placeholder: "请填写期望到访日期、到访人数与希望交流的主题",
  },
  {
    id: "other",
    label: "其他合作",
    placeholder: "请简要描述您的合作意向",
  },
] as const;

export type InquirySubjectId = (typeof INQUIRY_SUBJECTS)[number]["id"];

export const NEXT_STEPS = [
  "客户经理确认您的需求与规格",
  "应用工程师准备样品或技术方案",
  "顺丰寄出样品，短信通知运单号",
] as const;

export const CONTACT_FAQ_INTRO = {
  eyebrow: "FAQ",
  title: "常见问题",
} as const;

export const CONTACT_FAQ = [
  {
    question: "申请样品需要付费吗？",
    answer:
      "标准规格样品免费提供，收到申请后 48 小时内由顺丰发出。特殊规格或较大用量的试样，客户经理会提前与您确认。",
  },
  {
    question: "样品会附带哪些技术文件？",
    answer:
      "随样提供对应批次的 COA、TDS 与中文 MSDS。如需 Halal、Kosher 等认证文件，请在需求描述中注明。",
  },
  {
    question: "提交需求后多久能收到回复？",
    answer:
      "工作日提交的需求，专属客户经理会在 24 小时内与您联系。周末与节假日提交的需求，将在下一个工作日处理。",
  },
  {
    question: "是否支持配方定制与联合开发？",
    answer:
      "支持。应用研发团队可提供添加比例建议、稳定性评估与原型配方，也可针对特定功效或剂型开展联合开发。",
  },
  {
    question: "批量采购的起订量与交期如何确定？",
    answer:
      "起订量与交期因品类、规格和包装而异。请在需求中注明品名、预计用量与交付地点，商务团队会提供对应报价与交期。",
  },
  {
    question: "可以预约参观研发与生产基地吗？",
    answer:
      "可以。选择“参观交流”主题提交需求，我们会与您确认到访时间，并安排应用工程师陪同参观智造基地。",
  },
] as const;
