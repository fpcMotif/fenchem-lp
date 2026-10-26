import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import type { InsightArticle } from "@/components/prototype/variant-oos1/insights-data";
import { InsightArticleView } from "@/components/prototype/variant-oos1/insights-view";

export const Route = createFileRoute("/worst/insights-article")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: InsightsArticleBreakPage,
});

const COVER_IMAGE = "/products/figma/fiber-plate.jpg";
const BROKEN_IMAGE = "/products/figma/does-not-exist-404.jpg";
const UNBREAKABLE_TOKEN =
  "Lacticaseibacillus_rhamnosus_GG_ATCC_53103_Bifidobacterium_animalis_subsp_lactis_HN019_https://example.com/technical-library/probiotics/stability_testing_protocol_for_solid_beverages_and_stick_packs_2026_edition_rev04_final.pdf";

const BASELINE_ARTICLE: InsightArticle = {
  id: "baseline",
  category: "技术洞察",
  title: "GLP-1时代的膳食纤维机会",
  navLabel: "GLP-1与膳食纤维",
  lead: "从饱腹管理到肠道健康支持，重新理解膳食纤维在营养中的价值",
  cover: {
    src: COVER_IMAGE,
    alt: "盛有蔬果、豆类、全谷物与坚果的均衡膳食餐盘",
    position: "50% 50%",
  },
  thesis: {
    label: "核心观点",
    statement:
      "GLP-1相关体重管理需求正在推动营养产品从单一减重诉求，转向饱腹管理、消化舒适、肠道健康与长期营养支持的综合方案。",
  },
  intro: [
    "随着GLP-1相关体重管理方式受到关注，全球营养健康市场的产品创新逻辑也在发生变化。消费者关注的不再只是体重数字，还包括饮食质量、消化体验、肌肉维持、代谢健康以及长期健康管理。",
    "在这一背景下，膳食纤维正在从传统的“肠道规律性成分”，升级为伴随营养产品中的基础配方模块。",
  ],
  sections: [
    {
      slug: "shift",
      navLabel: "一　综合健康管理",
      title: "一　从减重诉求走向综合健康管理",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "GLP-1相关体重管理方式通常与食欲下降和进食量减少相伴。消费端由此产生了一组新的营养需求：既希望控制能量摄入，又希望在较小的进食量下获得更好的营养密度和消化体验。",
          ],
        },
        {
          kind: "bullets",
          items: [
            "提高膳食质量，帮助补充日常饮食中容易不足的营养成分；",
            "关注蛋白质与膳食纤维的合理搭配；",
            "支持肠道微生态和排便规律。",
          ],
        },
      ],
    },
    {
      slug: "matrix",
      navLabel: "二　纤维特征评估",
      title: "二　产品开发应关注哪些纤维特征",
      blocks: [
        {
          kind: "terms",
          items: [
            {
              term: "溶解与分散",
              desc: "是否适合饮料、奶昔、粉剂或固体食品，是否容易结团或沉淀。",
            },
            {
              term: "黏度与口感",
              desc: "添加后是否带来明显增稠、粉感或异味。",
            },
          ],
        },
        {
          kind: "note",
          label: "开发提示",
          text: "建议在配方立项阶段同步评估冲调分散性与热处理稳定性。",
        },
        {
          kind: "disclaimer",
          text: "本文仅供行业交流参考，不构成医疗建议或产品功效承诺。",
        },
      ],
    },
  ],
};

const EMPTY_STRINGS_ARTICLE: InsightArticle = {
  id: "empty-strings",
  category: "",
  title: "",
  navLabel: "",
  lead: "",
  cover: {
    src: "",
    alt: "",
    position: "50% 50%",
  },
  thesis: {
    label: "",
    statement: "",
  },
  intro: [""],
  sections: [
    {
      slug: "",
      navLabel: "",
      title: "",
      blocks: [
        { kind: "paragraphs", items: [""] },
        { kind: "bullets", items: [""] },
        { kind: "terms", items: [{ term: "", desc: "" }] },
        { kind: "note", label: "", text: "" },
        { kind: "disclaimer", text: "" },
      ],
    },
  ],
};

const ONE_WORD_ARTICLE: InsightArticle = {
  id: "one-word",
  category: "洞察",
  title: "纤维",
  navLabel: "纤维",
  lead: "饱腹",
  cover: {
    src: COVER_IMAGE,
    alt: "餐盘",
    position: "50% 50%",
  },
  thesis: {
    label: "观点",
    statement: "温和",
  },
  intro: ["稳定"],
  sections: [
    {
      slug: "one",
      navLabel: "一",
      title: "溶解",
      blocks: [
        { kind: "paragraphs", items: ["顺滑"] },
        { kind: "bullets", items: ["耐受"] },
        { kind: "terms", items: [{ term: "黏度", desc: "极低" }] },
        { kind: "note", label: "提示", text: "复配" },
        { kind: "disclaimer", text: "参考" },
      ],
    },
  ],
};

const SEVERAL_SENTENCES_ARTICLE: InsightArticle = {
  id: "several-sentences",
  category: "跨剂型配方工程与临床营养转化深度研究专题",
  title:
    "当体重管理从短期热量控制走向全周期代谢与肠道微生态协同支持：低黏度水溶性膳食纤维在即饮饮品、高蛋白代餐奶昔、功能性烘焙与分阶段营养补充剂中的配方工程实践与货架期稳定性验证指南",
  navLabel: "全周期代谢与肠道微生态协同支持配方工程实践指南",
  lead: "消费者不再满足于单一的饱腹感或短期体重数字变化，而是同时要求高营养密度、顺滑清爽的饮用口感、温和无腹胀的胃肠耐受表现，以及在跨区域常温物流和长货架期储存下依然稳定的理化与感官品质。这对原料筛选、复配比例与杀菌包装工艺提出了系统性挑战。",
  cover: {
    src: COVER_IMAGE,
    alt: "多种水溶性膳食纤维与高蛋白饮品在不同酸度与热处理条件下的流变学及沉淀对比实验样本",
    position: "50% 50%",
  },
  thesis: {
    label:
      "跨品类配方工程核心结论与立项阶段关键决策原则（适用于即饮饮料、固体冲调粉剂与高纤功能零食）",
    statement:
      "决定一款伴随营养产品商业化生命周期的并非单一功能声称，而是配方在目标添加量下能否兼顾低黏度顺滑口感、低FODMAP温和发酵速率、与高比例乳清或植物蛋白复配时的热稳定性，以及在十二个月加速与长期储存期内不发生分层、絮凝、风味漂移或营养素衰减。",
  },
  intro: [
    "在过去三年的全球营养健康新品追踪中，伴随体重管理人群增长而出现的配方退市案例，绝大多数并非源于核心功能成分选型错误，而是因为高添加量功能原料在真实饮用场景中带来了难以接受的糊口黏稠感、冲调结团挂壁、或是饮用后两小时内明显的腹胀与产气反应，直接导致消费者在第一周内放弃复购。",
    "与此同时，研发团队在实验室小试阶段往往只评估常温即配即饮的感官表现，忽略了工业化连续UHT杀菌、热灌装冷却速率、高阻隔条袋充氮残氧量以及夏季跨省仓储温度波动对多糖链段水解、蛋白等电点聚集和微量营养素氧化降解的耦合放大效应。",
  ],
  sections: [
    {
      slug: "long-section",
      navLabel: "一　多维理化指标与感官耐受协同评估矩阵",
      title:
        "一　在高蛋白、高矿物质与低pH复合体系中评估水溶性膳食纤维的多维理化指标、感官顺滑度与胃肠耐受边界条件",
      blocks: [
        {
          kind: "terms",
          items: [
            {
              term: "高剪切UHT热处理与酸性货架期（pH 3.2–4.0，25℃/60%RH至40℃/75%RH连续十二个月）条件下的分子量分布与黏度漂移控制",
              desc: "部分水溶性多糖在酸性热灌装与长期储存过程中会发生糖苷键缓慢水解，不仅改变体系表观黏度与挂壁感，还可能在货架中后期释放小分子还原糖并与游离氨基发生非酶褐变，导致浅色澄清饮品出现肉眼可见的黄变与风味劣化。",
            },
            {
              term: "高浓度植物蛋白与二价矿物质（钙、镁、铁、锌）共存体系中的胶体空间位阻保护与抗沉淀协同机制",
              desc: "在蛋白含量超过6%且同步强化可溶性钙镁盐的即饮体系中，纤维分子的电荷密度与水合层厚度直接决定了热杀菌后是否出现微米级砂砾感絮凝或底部硬沉淀。",
            },
          ],
        },
        {
          kind: "note",
          label: "面向研发立项、中试放大与法规审核团队的跨部门协同验证提示（建议在首轮打样前完成）",
          text: "请务必将加速稳定性测试周期从常规的四주延长至十二周以上，并在每次取样节点同步测定表观黏度、粒径分布D90、色差ΔE、可溶性膳食纤维实测保留率及盲测感官评分。",
        },
        {
          kind: "disclaimer",
          text: "免责声明与合规说明：本页所列配方逻辑、加速测试参数及人群耐受观察仅供B2B食品与营养品研发人员进行内部技术探讨，不构成任何针对终端消费者的医疗建议、疾病预防或治疗宣称，亦不代表对特定商业配方在目标销售辖区内的法规准入保证。",
        },
      ],
    },
  ],
};

const UNBREAKABLE_ARTICLE: InsightArticle = {
  id: "unbreakable",
  category: UNBREAKABLE_TOKEN,
  title: UNBREAKABLE_TOKEN,
  navLabel: UNBREAKABLE_TOKEN,
  lead: UNBREAKABLE_TOKEN,
  cover: {
    src: COVER_IMAGE,
    alt: UNBREAKABLE_TOKEN,
    position: "50% 50%",
  },
  thesis: {
    label: UNBREAKABLE_TOKEN,
    statement: UNBREAKABLE_TOKEN,
  },
  intro: [UNBREAKABLE_TOKEN],
  sections: [
    {
      slug: "unbreakable-sec",
      navLabel: UNBREAKABLE_TOKEN,
      title: UNBREAKABLE_TOKEN,
      blocks: [
        { kind: "paragraphs", items: [UNBREAKABLE_TOKEN] },
        { kind: "bullets", items: [UNBREAKABLE_TOKEN] },
        {
          kind: "terms",
          items: [{ term: UNBREAKABLE_TOKEN, desc: UNBREAKABLE_TOKEN }],
        },
        { kind: "note", label: UNBREAKABLE_TOKEN, text: UNBREAKABLE_TOKEN },
        { kind: "disclaimer", text: UNBREAKABLE_TOKEN },
      ],
    },
  ],
};

const EMOJI_ARTICLE: InsightArticle = {
  id: "emoji",
  category: "🧪🌱",
  title: "🧪🌱🦠 GLP-1 膳食纤维配方洞察 🥤✨🔬",
  navLabel: "🧪🌱🦠",
  lead: "🌾 饱腹管理 🫗 低黏度冲调 🦠 肠道微生态协同 💪📦",
  cover: {
    src: COVER_IMAGE,
    alt: "🥗🥑🫘🌾",
    position: "50% 50%",
  },
  thesis: {
    label: "💡 核心观点 ✨",
    statement:
      "🧪 膳食纤维 ➕ 🥛 蛋白质 ➕ 🦠 益生元 = ✅ 低负担日常营养方案（👨‍👩‍👧‍👦 全年龄段适用 🏃‍♀️🧘‍♂️）",
  },
  intro: ["🥤 即饮饮品、🥣 代餐奶昔与 🍪 高纤烘焙的口感平衡 ⚖️。"],
  sections: [
    {
      slug: "emoji-sec",
      navLabel: "1️⃣ 关键维度",
      title: "1️⃣ 配方评估维度 🔬📊",
      blocks: [
        {
          kind: "bullets",
          items: ["💧 溶解性：100% 冷水速溶 ❄️", "🌡️ 耐热性：UHT 137℃ 15s 稳定 🔥"],
        },
        {
          kind: "terms",
          items: [
            {
              term: "🦠 低FODMAP发酵",
              desc: "🫧 减少产气与腹胀，提升每日饮用依从性 👍",
            },
          ],
        },
      ],
    },
  ],
};

const RTL_ARTICLE: InsightArticle = {
  id: "rtl",
  category: "رؤى تقنية",
  title: "فرص الألياف الغذائية في عصر إدارة الوزن الحديثة وصحة الجهاز الهضمي",
  navLabel: "الألياف الغذائية",
  lead: "من إدارة الشبع إلى دعم الميكروبيوم المعوي: إعادة فهم قيمة الألياف الذائبة في التركيبات الغذائية اليومية.",
  cover: {
    src: COVER_IMAGE,
    alt: "طبق غذائي متوازن يحتوي على ألياف طبيعية وحبوب كاملة",
    position: "50% 50%",
  },
  thesis: {
    label: "الخلاصة الأساسية",
    statement:
      "تتحول منتجات التغذية المرافقة من مجرد تقليل السعرات الحرارية إلى حلول متكاملة تجمع بين الشبع، الراحة الهضمية، واستقرار التركيبة.",
  },
  intro: [
    "يحتاج المستهلكون إلى تركيبات منخفضة اللزوجة وسهلة الذوبان دون التسبب في انتفاخ أو تغير في الطعم.",
  ],
  sections: [
    {
      slug: "rtl-sec",
      navLabel: "١　معايير الاختيار",
      title: "١　معايير اختيار الألياف الغذائية في المشروبات الجاهزة",
      blocks: [
        {
          kind: "bullets",
          items: [
            "الذوبان السريع في الماء البارد والساخن دون تكتل؛",
            "الحفاظ على لزوجة منخفضة وملمس ناعم في الفم؛",
            "التوافق مع البروتينات والمعادن والفيتامينات.",
          ],
        },
        {
          kind: "terms",
          items: [
            {
              term: "الاستقرار الحراري والحمضي",
              desc: "مقاومة التحلل المائي أثناء البسترة والتخزين طويل الأمد في درجات حموضة منخفضة.",
            },
          ],
        },
        {
          kind: "note",
          label: "ملاحظة التطوير",
          text: "يُنصح بإجراء اختبارات الثبات المسرعة لمدة ١٢ أسبوعًا قبل الإطلاق التجاري.",
        },
      ],
    },
  ],
};

const MIXED_DIRECTION_ARTICLE: InsightArticle = {
  id: "mixed-bidi",
  category: "技术洞察 / رؤى",
  title:
    "إدارة الوزن مع GLP-1: تطبيقات PHGG (5.0 g/serving) وسلالة Lacticaseibacillus rhamnosus GG ATCC 53103 في المشروبات",
  navLabel: "GLP-1 / PHGG",
  lead: "دمج PHGG低黏度膳食纤维 مع Bifidobacterium lactis HN019 عند pH 3.8 ودرجة 25°C/60%RH لمدة 12 شهرًا.",
  cover: {
    src: COVER_IMAGE,
    alt: "Mixed LTR/RTL formulation test",
    position: "50% 50%",
  },
  thesis: {
    label: "核心观点 / الخلاصة (Rev 2.4)",
    statement:
      "إن إضافة 6.5g من PHGG (Sunfiber® / 瓜尔胶) مع 1×10¹⁰ CFU/sachet يحقق توازنًا بين الشبع واستقرار活菌数.",
  },
  intro: [
    "在中东市场（السوق العربي / MENA）推出固体饮料时，包装与技术文档常混合中文、English strain IDs (ATCC® 53103™) 与 العربية في نفس الفقرة.",
  ],
  sections: [
    {
      slug: "bidi-sec",
      navLabel: "一 / ١　Bidi Parameters",
      title: "一　تقييم 25°C/60%RH لتركيبات PHGG + Whey Isolate (90% WPI)",
      blocks: [
        {
          kind: "terms",
          items: [
            {
              term: "اللزوجة (Brookfield LV, 60 rpm @ 20°C)",
              desc: "أقل من 15 mPa·s عند تركيز 5.0% w/v في مشروب RTD حمضي (pH 3.6 ± 0.1).",
            },
          ],
        },
      ],
    },
  ],
};

const DIACRITICS_ARTICLE: InsightArticle = {
  id: "diacritics",
  category: "Kỹ thuật & วิจัย",
  title:
    "Ứng dụng chất xơ hòa tan độ nhớt thấp trong thực phẩm bổ sung: กู้คืนสมดุลจุลินทรีย์และเพิ่มความอิ่มท้องอย่างยั่งยืน Ệ Ố Ữ Ầ",
  navLabel: "Chất xơ & จุลินทรีย์",
  lead: "Đánh giá độ ổn định pH, độ nhớt biểu kiến và khả năng chịu đựng đường tiêu hóa: ระดับความหนืดต่ำและการกระจายตัวที่ดีเยี่ยมในเครื่องดื่มโปรตีนสูง",
  cover: {
    src: COVER_IMAGE,
    alt: "Thử nghiệm độ ổn định chất xơ",
    position: "50% 50%",
  },
  thesis: {
    label: "Điểm cốt lõi / ข้อสรุปสำคัญ",
    statement:
      "Chất xơ thủy phân một phần giúp duy trì cấu trúc mượt mà, không gây đầy hơi, đồng thời hỗ trợ hệ vi sinh đường ruột: ประสิทธิภาพสูงในการคงสภาพตลอดอายุการเก็บรักษา Ố Ữ Ệ Ầ Ể.",
  },
  intro: [
    "Khi kết hợp với đạm whey hoặc đạm thực vật ở nồng độ cao, các chuỗi polysaccharide ngắn không làm tăng áp suất thẩm thấu đột ngột.",
  ],
  sections: [
    {
      slug: "diacritics-sec",
      navLabel: "I. Thông số kỹ thuật",
      title: "I. Tiêu chí đánh giá độ hòa tan & ความทนทานต่อความร้อนและกรด",
      blocks: [
        {
          kind: "terms",
          items: [
            {
              term: "Độ nhớt & Cảm quan (רגישות / ความหนืด)",
              desc: "Không làm biến đổi mùi vị tự nhiên của sản phẩm, giữ độ trong suốt cao.",
            },
          ],
        },
      ],
    },
  ],
};

const ZERO_ITEMS_ARTICLE: InsightArticle = {
  id: "zero-items",
  category: "技术洞察",
  title: "零子项与全缺省字段测试（无封面、无导语、无核心观点、无引言、无章节）",
  navLabel: null,
  lead: null,
  thesis: null,
  intro: [],
  sections: [],
};

const EMPTY_CONTAINERS_ARTICLE: InsightArticle = {
  id: "empty-containers",
  category: "技术洞察",
  title: "空数组容器测试（含空章节 blocks 与空 items 列表）",
  navLabel: null,
  lead: null,
  thesis: null,
  intro: [],
  sections: [
    {
      slug: "empty-blocks",
      navLabel: "一　空块章节",
      title: "一　无任何内容块的章节",
      blocks: [],
    },
    {
      slug: "empty-items",
      navLabel: "二　空列表块",
      title: "二　包含空数组的段落、列表与词条块",
      blocks: [
        { kind: "paragraphs", items: [] },
        { kind: "bullets", items: [] },
        { kind: "terms", items: [] },
      ],
    },
  ],
};

const ONE_ITEM_ARTICLE: InsightArticle = {
  id: "one-item",
  category: "原料解读",
  title: "单一项最小文章（无封面、1段引言、1个章节、1条词条）",
  navLabel: null,
  lead: null,
  thesis: null,
  intro: ["HMB（β-羟基-β-甲基丁酸）作为亮氨酸的代谢产物，常被用于与肌肉维持相关的配方设计。"],
  sections: [
    {
      slug: "only-section",
      navLabel: "一　剂型",
      title: "一　适用剂型",
      blocks: [
        {
          kind: "terms",
          items: [{ term: "固体饮料", desc: "HMB钙盐易溶于水，适合固体饮料与蛋白粉复配。" }],
        },
      ],
    },
  ],
};

const DUPLICATE_ITEMS_ARTICLE: InsightArticle = {
  id: "duplicate-items",
  category: "技术洞察",
  title: "重复文本项与重复章节 slug 测试",
  navLabel: null,
  lead: "测试相同段落文本、相同列表项文本、相同词条名称与相同章节 slug 时的渲染表现",
  thesis: null,
  intro: ["待补充。", "待补充。"],
  sections: [
    {
      slug: "dup",
      navLabel: "一　待补充",
      title: "一　待补充",
      blocks: [
        { kind: "paragraphs", items: ["待定。", "待定。"] },
        { kind: "bullets", items: ["常规检测指标；", "常规检测指标；"] },
        {
          kind: "terms",
          items: [
            { term: "水分", desc: "≤ 6.0%" },
            { term: "水分", desc: "≤ 8.0%（加速6个月后）" },
          ],
        },
      ],
    },
    {
      slug: "dup",
      navLabel: "二　待补充",
      title: "二　重复 slug 的第二章节",
      blocks: [{ kind: "paragraphs", items: ["第二章节内容。"] }],
    },
  ],
};

const TEN_TIMES_ARTICLE: InsightArticle = {
  id: "ten-times",
  category: "技术洞察",
  title: "十倍数量规模压力测试（20段引言、60个章节、单项50条要点与40组词条）",
  navLabel: "十倍规模",
  lead: "验证超长深度报告在展开动画、阅读时长估算与大数量列表渲染下的表现",
  cover: {
    src: COVER_IMAGE,
    alt: "十倍数量规模压力测试封面",
    position: "50% 50%",
  },
  thesis: {
    label: "核心观点",
    statement:
      "当单篇行业报告包含数十个章节与数百条配方参数时，展开高度测量与列表排版应保持完整可读。",
  },
  intro: Array.from(
    { length: 20 },
    (_, index) =>
      `引言第 ${index + 1} 段：随着营养健康产品剂型日益多元化，原料在不同加工温度、剪切力与货架期环境下的理化稳定性数据成为配方立项的基础依据。`,
  ),
  sections: Array.from({ length: 60 }, (_, index) => ({
    slug: `sec-${index + 1}`,
    navLabel: `第 ${index + 1} 节`,
    title: `第 ${index + 1} 节　稳定性与配方兼容性分段评估指标（批次 #${1000 + index}）`,
    blocks:
      index === 0
        ? [
            {
              kind: "bullets" as const,
              items: Array.from(
                { length: 50 },
                (_, bIndex) =>
                  `要点 ${bIndex + 1}：在 25℃/60%RH 条件下连续监测第 ${bIndex + 1} 周的水分活度、溶解分散时间与感官评分；`,
              ),
            },
            {
              kind: "terms" as const,
              items: Array.from({ length: 40 }, (_, tIndex) => ({
                term: `理化指标 #${tIndex + 1}（25℃/60%RH）`,
                desc: `样品在第 ${(tIndex + 1) * 7} 天取样复测，表观黏度变化率控制在 ±${((tIndex % 9) + 1) * 0.5}% 以内，无分层与沉淀。`,
              })),
            },
          ]
        : [
            {
              kind: "paragraphs" as const,
              items: [
                `第 ${index + 1} 节正文：记录该实验条件下样品的澄清度、色差 ΔE 与活性成分保留率。`,
              ],
            },
          ],
  })),
};

const BROKEN_COVER_ARTICLE: InsightArticle = {
  ...BASELINE_ARTICLE,
  id: "broken-cover",
  title: "封面图片地址失效（404）且带超长替代文本",
  cover: {
    src: BROKEN_IMAGE,
    alt: "封面图加载失败时的替代文本：盛有蔬果、豆类、全谷物与坚果的均衡膳食餐盘及低黏度水溶性膳食纤维实验样品对比图",
    position: "50% 50%",
  },
};

type ScenarioSpec = {
  id: string;
  label: string;
  note?: string;
  article: InsightArticle;
  coverEnd?: boolean;
  defaultOpen: boolean;
  wrapper?: "default" | "w320" | "flex-squeeze" | "w1600";
};

const SCENARIOS: readonly ScenarioSpec[] = [
  {
    id: "typical-collapsed",
    label: "1. Content length — Typical content (collapsed baseline)",
    article: BASELINE_ARTICLE,
    defaultOpen: false,
  },
  {
    id: "typical-expanded",
    label: "2. Content length — Typical content (expanded, coverEnd = true)",
    article: { ...BASELINE_ARTICLE, id: "baseline-expanded" },
    coverEnd: true,
    defaultOpen: true,
  },
  {
    id: "empty-strings-collapsed",
    label: "3. Content length — Empty strings across all fields (collapsed)",
    note: "Break (better-layout / better-writing): Empty cover.src renders a 317×237px broken-image box, h2 collapses to 0px height, and readMeta still claims '全文 1 节 · 约 1 分钟' for 0 characters.",
    article: { ...EMPTY_STRINGS_ARTICLE, id: "empty-strings-collapsed" },
    defaultOpen: false,
  },
  {
    id: "empty-strings-expanded",
    label: "4. Content length — Empty strings across all fields (expanded)",
    note: "Break (better-layout): Empty thesis and note render blank 30px/27px gray boxes, empty bullets render an orphan bullet disc, and empty terms render a blank 37px bordered row.",
    article: EMPTY_STRINGS_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "one-word",
    label: "5. Content length — One word per field (expanded)",
    article: ONE_WORD_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "several-sentences-collapsed",
    label: "6. Content length — Several sentences in title, lead & thesis (collapsed)",
    article: { ...SEVERAL_SENTENCES_ARTICLE, id: "several-sentences-collapsed" },
    defaultOpen: false,
  },
  {
    id: "several-sentences-expanded",
    label: "7. Content length — Several sentences in all fields & 220px term column (expanded)",
    article: SEVERAL_SENTENCES_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "unbreakable-collapsed",
    label: "8. Content length — One unbreakable 215-character string (collapsed)",
    note: "Break (better-typography): Title (scrollWidth 1921px in 443px column) and lead (scrollWidth 955px) have no overflowWrap and escape the 800px card's right edge by 1478px.",
    article: { ...UNBREAKABLE_ARTICLE, id: "unbreakable-collapsed" },
    defaultOpen: false,
  },
  {
    id: "unbreakable-expanded",
    label: "9. Content length — One unbreakable 215-character string (expanded)",
    note: "Break (better-typography / better-layout): Unbreakable h4 term (scrollWidth 1040px) overflows its 220px column across the 32px gap and collides with the description; expandedWrap (overflow: hidden) clips thesis, intro, h3, bullets, and note at 800px.",
    article: UNBREAKABLE_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "emoji",
    label: "10. Content shape — Emoji alone and mixed into text (expanded)",
    article: EMOJI_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "rtl",
    label: "11. Content shape — RTL text (Arabic, expanded)",
    note: "Break (better-layout / better-typography): No dir='auto'; Arabic copy renders LTR left-aligned with bullets indented on the left, punctuation on the wrong side, and the 220px term column unmirrored on the left.",
    article: RTL_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "mixed-bidi",
    label:
      "12. Content shape — Mixed-direction text (LTR formulas/URLs inside RTL & CJK, expanded)",
    note: "Break (better-typography): Forced LTR direction on Arabic paragraphs containing LTR strain IDs and units scrambles bidirectional sentence order across line wraps.",
    article: MIXED_DIRECTION_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "diacritics-collapsed",
    label: "13. Content shape — Diacritics and tall scripts in 2-line clamped excerpt (collapsed)",
    article: { ...DIACRITICS_ARTICLE, id: "diacritics-collapsed" },
    defaultOpen: false,
  },
  {
    id: "diacritics-expanded",
    label: "14. Content shape — Diacritics and tall scripts (Vietnamese & Thai, expanded)",
    article: DIACRITICS_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "zero-items",
    label: "15. Quantity — Zero optional fields, zero intro paragraphs, zero sections (expanded)",
    note: "Break (better-writing / better-layout): Shows '全文 0 节 · 约 1 分钟' with an active toggle button that expands an empty 96px padded region with a top border and no empty state.",
    article: ZERO_ITEMS_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "empty-containers",
    label: "16. Quantity — Sections with empty blocks[] and blocks with empty items[] (expanded)",
    note: "Break (better-layout): Empty paragraphs/bullets/terms blocks still render wrapper nodes that add 18px flex gaps and an orphan 1px top border on the empty terms <ul>.",
    article: EMPTY_CONTAINERS_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "one-item",
    label: "17. Quantity — One intro paragraph, one section, one block with one item (expanded)",
    article: ONE_ITEM_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "duplicate-items",
    label: "18. Quantity — Duplicate paragraph, bullet, term & section slug keys (expanded)",
    note: "Break (better-accessibility): Keying by text content and section.slug causes duplicate React keys and duplicate DOM IDs (#duplicate-items-dup, #duplicate-items-dup-title) referenced by aria-labelledby.",
    article: DUPLICATE_ITEMS_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "ten-times",
    label:
      "19. Quantity — Ten times realistic count (20 intros, 60 sections, 50 bullets, 40 terms)",
    article: TEN_TIMES_ARTICLE,
    defaultOpen: true,
  },
  {
    id: "container-320-collapsed",
    label: "20. Container — 320px container (collapsed)",
    note: "Break (better-layout): articleHead uses a viewport @media (min-width: 768px) query instead of a container query, keeping 2 columns + 40px gap inside 320px and crushing expandMeta to 25px wide (8 vertical lines).",
    article: { ...BASELINE_ARTICLE, id: "c320-collapsed" },
    defaultOpen: false,
    wrapper: "w320",
  },
  {
    id: "container-320-expanded",
    label: "21. Container — 320px container (expanded)",
    note: "Break (better-layout): editorialRow keeps its 220px left column + 32px gap inside a 320px container on desktop viewports, crushing the right description column to 66px wide (~4 chars/line).",
    article: { ...BASELINE_ARTICLE, id: "c320-expanded" },
    defaultOpen: true,
    wrapper: "w320",
  },
  {
    id: "container-flex-squeezed",
    label: "22. Container — Squeezed by an unshrinking flex sibling (no Cover vs with Cover)",
    note: "Break (better-layout): In a 262px flex slot on desktop, the 220px term column + 32px gap crushes the description <p> to 10px wide (577px tall, 1 char/line) and overflows the 262px box to 288px.",
    article: { ...ONE_ITEM_ARTICLE, id: "flex-squeezed" },
    defaultOpen: true,
    wrapper: "flex-squeeze",
  },
  {
    id: "container-wide-1600",
    label: "23. Container — Very wide 1600px container (expanded without parent 800px cap)",
    note: "Break (better-layout / better-typography): InsightArticleView has no max-width of its own; body lines stretch to 1598px (~100 CJK chars/line) and expandRow pins metadata and toggle button 655px apart.",
    article: { ...BASELINE_ARTICLE, id: "wide-1600" },
    defaultOpen: true,
    wrapper: "w1600",
  },
  {
    id: "broken-cover",
    label: "24. State — Broken cover image URL (404) with long alt text",
    note: "Break (better-ui): Failed cover image renders the browser broken-image icon and raw alt text inside the 4:3 figure box with no fallback state.",
    article: BROKEN_COVER_ARTICLE,
    defaultOpen: false,
  },
];

function InsightsArticleBreakPage() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SCENARIOS.map((scenario) => [scenario.id, scenario.defaultOpen])),
  );

  const toggle = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main
      lang="zh-CN"
      style={{
        padding: "40px 24px 120px",
        display: "flex",
        flexDirection: "column",
        gap: 48,
      }}
    >
      {SCENARIOS.map((scenario) => {
        const isOpen = openMap[scenario.id] ?? scenario.defaultOpen;
        const element = (
          <InsightArticleView
            article={scenario.article}
            coverEnd={scenario.coverEnd ?? false}
            open={isOpen}
            onToggle={() => toggle(scenario.id)}
          />
        );

        return (
          <section key={scenario.id} data-scenario={scenario.id}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{scenario.label}</div>
              {scenario.note ? (
                <div style={{ fontSize: 13, color: "#b91c1c", marginTop: 4 }}>{scenario.note}</div>
              ) : null}
            </div>
            {scenario.wrapper === "w320" ? (
              <div style={{ width: 320, border: "1px dashed rgba(0,0,0,0.2)" }}>{element}</div>
            ) : scenario.wrapper === "flex-squeeze" ? (
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  maxWidth: 800,
                  border: "1px dashed rgba(0,0,0,0.2)",
                }}
              >
                {element}
                <div
                  style={{
                    flex: "0 0 520px",
                    padding: 12,
                    border: "1px dashed rgba(0,0,0,0.2)",
                    fontSize: 13,
                  }}
                >
                  520px fixed flex sibling
                </div>
              </div>
            ) : scenario.wrapper === "w1600" ? (
              <div style={{ width: 1600, maxWidth: "100%", border: "1px dashed rgba(0,0,0,0.2)" }}>
                {element}
              </div>
            ) : (
              <div style={{ maxWidth: 800 }}>{element}</div>
            )}
          </section>
        );
      })}
    </main>
  );
}
