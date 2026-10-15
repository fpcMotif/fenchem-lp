import { INSIGHTS_ARTICLES, type InsightArticle } from "../variant-oos1/insights-data";

export type LabArticle = InsightArticle & { image: string; date: string };

const [GLP1_ARTICLE] = INSIGHTS_ARTICLES;

const BARRIER_OILS: InsightArticle = {
  id: "barrier-oils",
  category: "应用研究",
  title: "植物油脂与皮肤屏障：从脂肪酸谱读懂配方表现",
  navLabel: "植物油脂与屏障",
  lead: "亚油酸、油酸与不皂化物的比例，决定了一款油脂在敏感肌配方中的肤感与稳定性",
  thesis: {
    label: "核心观点",
    statement:
      "选择屏障修护用油，关键不在“天然”标签，而在脂肪酸组成、不皂化物含量与氧化稳定性三者之间的平衡。",
  },
  intro: [
    "敏感肌护理正在从“少添加”走向“精准修护”。配方师越来越少问“这款油是否天然”，而是更关注它能为角质层脂质补充什么、在乳化体系中如何表现，以及能否在整个货架期内保持稳定。",
    "同为植物油脂，乳木果油、巴西莓油与高纯植物角鲨烷在肤感和功能上差异明显。读懂脂肪酸谱与不皂化物数据，是把原料特性转化为可验证配方表现的第一步。",
  ],
  sections: [
    {
      slug: "profile",
      navLabel: "一　脂肪酸谱",
      title: "一　脂肪酸谱决定肤感与功能",
      blocks: [
        {
          kind: "terms",
          items: [
            {
              term: "亚油酸（C18:2）",
              desc: "角质层神经酰胺的重要前体之一。亚油酸含量较高的油脂通常肤感轻盈，适合偏油或易长痘的肤质，但对氧化更敏感。",
            },
            {
              term: "油酸（C18:1）",
              desc: "铺展性好、滋润度高，常见于鳄梨油与橄榄油。高比例使用时需关注对部分敏感肌的刺激反馈。",
            },
            {
              term: "硬脂酸与棕榈酸",
              desc: "饱和脂肪酸为配方提供结构与封闭性，是乳木果油、可可籽脂等固态油脂“厚而不腻”的来源。",
            },
            {
              term: "不皂化物",
              desc: "包括植物甾醇、生育酚和三萜类成分。精制乳木果油的不皂化物含量是评估其修护价值的重要指标。",
            },
          ],
        },
      ],
    },
    {
      slug: "criteria",
      navLabel: "二　选择标准",
      title: "二　敏感肌配方的三项选择标准",
      blocks: [
        {
          kind: "bullets",
          items: [
            "脂肪酸组成与目标肤质匹配，避免单一高油酸体系；",
            "精制工艺稳定，异味、色泽与过氧化值批次一致；",
            "与神经酰胺、胆固醇等屏障脂质复配后，乳化体系依然稳定。",
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "在实际开发中，很少有单一油脂能同时满足肤感、修护与稳定性要求。更常见的做法是以一款结构性油脂为基础，再用轻质油脂调整铺展性。",
          ],
        },
      ],
    },
    {
      slug: "stability",
      navLabel: "三　氧化稳定性",
      title: "三　氧化稳定性与货架期",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "多不饱和脂肪酸含量越高，油脂越容易氧化酸败，带来异味和潜在刺激。建议在配方早期同步评估过氧化值、酸值与加速稳定性数据，而不是等到包装定型后再补测。",
          ],
        },
        {
          kind: "note",
          label: "开发提示",
          text: "巴西莓油等高不饱和度油脂建议搭配生育酚等抗氧化体系使用，并在充氮包装或避光容器中储存。",
        },
      ],
    },
    {
      slug: "outlook",
      navLabel: "四　观点",
      title: "四　观点",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "屏障修护的竞争，正在从“添加了什么”转向“添加得是否合理”。把油脂当作可量化的功能模块，而不是营销故事，才能做出在消费者皮肤上经得起验证的产品。",
          ],
        },
        {
          kind: "disclaimer",
          text: "说明：本文为官网技术洞察示范稿，所述原料特性基于常见文献与行业经验，具体表现以实际配方测试为准。",
        },
      ],
    },
  ],
};

const HEALTHY_AGING: InsightArticle = {
  id: "healthy-aging",
  category: "市场趋势",
  title: "健康老龄化：蛋白质营养的下一个增长点",
  navLabel: "健康老龄化",
  lead: "从“补充蛋白”到“留住肌肉”，银发营养正在从品类走向场景",
  thesis: {
    label: "核心观点",
    statement:
      "面向中老年人群的蛋白质产品，竞争焦点正在从蛋白含量转向吸收效率、口感友好与每日可坚持的剂型设计。",
  },
  intro: [
    "随着人口结构变化，中老年人群的营养需求正在被重新认识。肌肉量与力量的维持，与行动能力、跌倒风险和生活质量密切相关，蛋白质因此成为银发营养中最受关注的方向之一。",
    "但中老年人普遍存在食欲下降、咀嚼与吞咽能力减弱等情况。只提高蛋白含量的产品，往往因为口感厚重、冲调困难而难以坚持。",
  ],
  sections: [
    {
      slug: "gap",
      navLabel: "一　营养缺口",
      title: "一　银发人群的营养缺口",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "许多中老年人的日常饮食以主食为主，优质蛋白摄入不足，且分布集中在一餐。同时，维生素D、钙和膳食纤维也常常摄入不足。这意味着产品设计需要从单一营养素转向组合方案。",
          ],
        },
      ],
    },
    {
      slug: "design",
      navLabel: "二　配方关键",
      title: "二　配方设计的三个关键",
      blocks: [
        {
          kind: "terms",
          items: [
            {
              term: "蛋白来源与吸收",
              desc: "乳清蛋白、酪蛋白与植物蛋白各有特点。复配不同消化速度的蛋白，有助于在较小份量中提供更持续的氨基酸供给。",
            },
            {
              term: "口感与质构",
              desc: "降低粉感和黏稠度，控制甜度，必要时提供易吞咽的质构选择，是提升长期饮用率的关键。",
            },
            {
              term: "协同营养素",
              desc: "维生素D、钙、膳食纤维与肌酸等成分可与蛋白质形成组合，使产品定位从“补蛋白”延展到“骨骼、肌肉与肠道”的综合支持。",
            },
          ],
        },
      ],
    },
    {
      slug: "formats",
      navLabel: "三　剂型机会",
      title: "三　剂型与场景机会",
      blocks: [
        {
          kind: "bullets",
          items: [
            "小份量、高密度的即饮营养饮品，适合早餐或餐间补充；",
            "可加入粥、汤和牛奶的无味蛋白粉，融入日常饮食；",
            "软质营养棒与咀嚼片，照顾咀嚼能力较弱的人群；",
            "面向术后与康复阶段的专业营养配方。",
          ],
        },
      ],
    },
    {
      slug: "outlook",
      navLabel: "四　观点",
      title: "四　观点",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "银发营养的机会不在于把成人产品“加量”，而在于围绕真实的饮食习惯与身体变化重新设计。能让人每天轻松吃下去的产品，才是真正有效的产品。",
          ],
        },
        {
          kind: "disclaimer",
          text: "说明：本文为官网技术洞察示范稿，不构成医疗建议或产品功效承诺。特殊医学用途配方食品须遵循目标市场的注册与审批要求。",
        },
      ],
    },
  ],
};

const TRACEABLE_SOURCING: InsightArticle = {
  id: "traceable-sourcing",
  category: "可持续发展",
  title: "可追溯原料：品牌如何回应可持续采购要求",
  navLabel: "可追溯原料",
  lead: "从产地、加工到碳足迹，下游品牌对原料透明度的要求正在写进采购合同",
  thesis: {
    label: "核心观点",
    statement:
      "可持续采购正从企业社会责任议题，转变为影响供应商准入、产品宣称与出口合规的商业门槛。",
  },
  intro: [
    "过去，品牌对原料供应商的审核主要集中在质量与价格。如今，越来越多的采购问卷开始要求提供产地信息、加工环节的能耗数据以及第三方可持续评级。",
    "对于以天然植物原料为主的供应链而言，这既是挑战，也是建立差异化信任的机会。",
  ],
  sections: [
    {
      slug: "shift",
      navLabel: "一　采购变化",
      title: "一　采购要求的三个变化",
      blocks: [
        {
          kind: "bullets",
          items: [
            "从“提供证书”到“提供数据”：采购方要求批次级别的产地与加工记录；",
            "从单一工厂到全链条：审核范围延伸到种植、采收与初加工环节；",
            "从自愿披露到合规要求：部分市场已对特定商品提出尽职调查义务。",
          ],
        },
      ],
    },
    {
      slug: "checklist",
      navLabel: "二　信息清单",
      title: "二　可追溯信息清单",
      blocks: [
        {
          kind: "terms",
          items: [
            { term: "产地信息", desc: "种植或采收区域、合作社或农户组织、采收季节" },
            { term: "加工记录", desc: "压榨、精制与提取工艺，溶剂使用与回收情况" },
            { term: "环境数据", desc: "单位产品能耗、水耗与碳足迹的测算方法与边界" },
            { term: "社会责任", desc: "劳工条件、社区收益分配与第三方审核结果" },
          ],
        },
      ],
    },
    {
      slug: "impact",
      navLabel: "三　开发影响",
      title: "三　对配方开发的影响",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "可追溯数据不只服务于采购部门。当品牌希望在包装上使用“可持续来源”等宣称时，配方中每一种关键原料都需要有可核验的依据。在配方立项阶段就纳入原料透明度评估，可以避免上市前的宣称风险。",
          ],
        },
        {
          kind: "note",
          label: "开发提示",
          text: "建议与供应商提前约定数据格式与更新频率，并将可追溯文件纳入原料规格书的标准附件。",
        },
      ],
    },
    {
      slug: "outlook",
      navLabel: "四　观点",
      title: "四　观点",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "可持续不是一张证书，而是一套持续更新的数据系统。能够稳定提供可信数据的原料供应商，将在下一轮供应链调整中获得更长期的合作关系。",
          ],
        },
        {
          kind: "disclaimer",
          text: "说明：本文为官网技术洞察示范稿，不构成法律意见。具体合规要求请以目标市场现行法规为准。",
        },
      ],
    },
  ],
};

export const LAB_ARTICLES: LabArticle[] = [
  {
    ...GLP1_ARTICLE,
    image: "/prototype/official-site/product-human-nutrition.webp",
    date: "2026-09",
  },
  {
    ...BARRIER_OILS,
    image: "/prototype/official-site/product-personal-care.webp",
    date: "2026-08",
  },
  {
    ...HEALTHY_AGING,
    image: "/prototype/official-site/product-functional-food.webp",
    date: "2026-07",
  },
  { ...TRACEABLE_SOURCING, image: "/prototype/official-site/campus-lake.webp", date: "2026-06" },
];
