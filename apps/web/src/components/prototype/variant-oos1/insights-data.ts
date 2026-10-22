export type InsightBlock =
  | { kind: "paragraphs"; items: readonly string[] }
  | { kind: "bullets"; items: readonly string[] }
  | { kind: "terms"; items: readonly { term: string; desc: string }[] }
  | { kind: "note"; label: string; text: string }
  | { kind: "disclaimer"; text: string };

export type InsightSection = {
  slug: string;
  navLabel: string;
  title: string;
  blocks: readonly InsightBlock[];
};

export type InsightArticle = {
  id: string;
  category: string;
  title: string;
  navLabel: string | null;
  lead: string | null;
  cover?: { src: string; alt: string; position: string };
  thesis: { label: string; statement: string } | null;
  intro: readonly string[];
  sections: readonly InsightSection[];
};

export const INSIGHTS_PAGE = {
  lead: "泛成技术团队对营养原料、配方趋势与市场变化的观察与解读。",
  imageAlt: "身穿米白色毛衣的女士在明黄背景前闭眼微笑",
};

const GLP1_ARTICLE: InsightArticle = {
  id: "insights",
  category: "技术洞察",
  title: "GLP-1时代的膳食纤维机会",
  navLabel: "GLP-1与膳食纤维",
  lead: "从饱腹管理到肠道健康支持，重新理解膳食纤维在营养中的价值",
  cover: {
    src: "/products/figma/fiber-plate.jpg",
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
    "在这一背景下，膳食纤维正在从传统的“肠道规律性成分”，升级为伴随营养产品中的基础配方模块。对于品牌商而言，新的机会并不是简单地在产品中增加纤维，而是根据目标人群与剂型，选择适宜的纤维类型、合理的添加量以及更易坚持的产品形态。",
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
          kind: "paragraphs",
          items: ["因此，品牌开发方向正在从单一的“低热量”概念，转向更完整的伴随营养体系，包括："],
        },
        {
          kind: "bullets",
          items: [
            "提高膳食质量，帮助补充日常饮食中容易不足的营养成分；",
            "关注蛋白质与膳食纤维的合理搭配；",
            "支持肠道微生态和排便规律；",
            "降低配方对口感、黏度和胃肠耐受性的负担；",
            "通过便捷剂型提升长期使用的可持续性。",
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "这意味着，未来的体重管理产品不能只回答“如何少吃”，还需要回答“如何吃得更合理、感觉更舒适，并更容易长期坚持”。",
          ],
        },
      ],
    },
    {
      slug: "value",
      navLabel: "二　关键配方模块",
      title: "二　膳食纤维为何成为关键配方模块",
      blocks: [
        {
          kind: "terms",
          items: [
            {
              term: "支持饱腹管理",
              desc: "部分膳食纤维能够吸水、形成一定结构或延缓营养物质在消化道中的移动速度，从而为饱腹管理提供配方基础。",
            },
            {
              term: "支持肠道微生态",
              desc: "可发酵膳食纤维可被肠道微生物利用，并参与短链脂肪酸（SCFAs）等代谢产物的形成。对于饮食量减少、饮食结构变化或纤维摄入不足的人群而言，稳定而适量的膳食纤维摄入具有重要意义。",
            },
            {
              term: "改善消化体验",
              desc: "体重管理人群往往更加关注腹胀、排便变化和胃肠舒适度。高添加量和快速发酵并不适合所有人群。低黏度、良好分散性以及相对温和的发酵特征，会成为纤维原料选择的重要标准。",
            },
            {
              term: "延展代谢健康价值",
              desc: "膳食纤维可以与低糖、高蛋白、全谷物和益生元等概念形成协同，使产品从“减重辅助”进一步延展至血糖管理、肠道健康和健康老龄化等更广泛场景。",
            },
          ],
        },
      ],
    },
    {
      slug: "matrix",
      navLabel: "三　纤维特征评估",
      title: "三　产品开发应关注哪些纤维特征",
      blocks: [
        {
          kind: "terms",
          items: [
            {
              term: "溶解与分散",
              desc: "是否适合饮料、奶昔、粉剂或固体食品，是否容易结团或沉淀",
            },
            { term: "黏度与口感", desc: "添加后是否带来明显增稠、粉感或异味" },
            { term: "胃肠耐受", desc: "目标添加量下是否容易引起胀气或不适" },
            { term: "发酵特征", desc: "发酵速度是否适合目标人群和产品定位" },
            { term: "稳定性", desc: "对酸度、温度、剪切和货架期的适应能力" },
            {
              term: "复配能力",
              desc: "与蛋白质、矿物质、益生菌、后生元及植物活性成分的兼容性",
            },
          ],
        },
      ],
    },
    {
      slug: "phgg",
      navLabel: "四　PHGG应用潜力",
      title: "四　PHGG在伴随营养中的应用潜力",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "部分水解瓜尔胶是一类水溶性膳食纤维。相较于高黏度瓜尔胶，经过部分水解后，其黏度明显降低，更适合需要保持顺滑口感和良好冲调性的产品。",
          ],
        },
        {
          kind: "paragraphs",
          items: ["在GLP-1伴随营养场景中，部分水解瓜尔胶的开发价值主要体现在以下几个方面："],
        },
        {
          kind: "bullets",
          items: [
            "低黏度与良好分散性，适合代餐奶昔、固体饮料、即饮饮品等剂型；",
            "属于低FODMAP，相对温和，有利于面向关注胃肠舒适度的人群进行产品设计；",
            "可与蛋白质、后生元、益生菌、矿物质和植物活性成分组合；",
            "口味存在感较低，极低的甜味，便于开发日常化、长期使用的营养产品。",
          ],
        },
      ],
    },
    {
      slug: "opportunities",
      navLabel: "五　四类产品机会",
      title: "五　值得关注的四类产品机会",
      blocks: [
        {
          kind: "terms",
          items: [
            {
              term: "高蛋白加高纤维营养奶昔",
              desc: "蛋白质有助于构建更完整的营养基础，膳食纤维则可强化饱腹管理与肠道健康定位。开发重点是控制整体黏度、粉感和冲调性，避免产品因“高营养”而牺牲饮用体验。",
            },
            {
              term: "日常型肠道健康饮品",
              desc: "以低负担、轻口感和每日可坚持为核心，将膳食纤维与益生元、后生元或电解质系统结合，适合做成即饮饮料、冲调粉或条袋装产品。",
            },
            {
              term: "高纤零食与烘焙产品",
              desc: "饼干、能量棒、烘焙食品和功能零食能够为不习惯服用营养补充剂的消费者提供更自然的摄入场景。配方重点包括含水率、质构、甜味系统和货架期管理。",
            },
            {
              term: "分阶段伴随营养产品",
              desc: "可围绕“初期适应、稳定管理和长期维持”设计不同配方，例如在不同阶段调整蛋白质、膳食纤维、电解质和微量营养素的组合，提升产品体系的专业度。",
            },
          ],
        },
      ],
    },
    {
      slug: "outlook",
      navLabel: "六　结语",
      title: "六　结语",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "GLP-1时代的膳食纤维机会，并不只是增加一种原料，而是重新设计体重管理产品的价值结构。未来更具竞争力的产品，需要同时考虑营养密度、胃肠耐受、口感体验、使用便利性与长期坚持。",
            "对品牌而言，膳食纤维可作为贯穿多种产品形态的基础平台，与蛋白质、益生元、后生元、植物提取物和矿物质形成组合。产品开发应从真实消费场景出发，避免过度承诺，并通过配方测试和科学证据建立可信度。",
            "从肠道健康到代谢支持，从体重管理到健康老龄化，膳食纤维将在下一代营养产品中扮演更重要的角色。",
          ],
        },
        {
          kind: "disclaimer",
          text: "本文仅供行业交流参考，不构成医疗建议或产品功效承诺。",
        },
      ],
    },
  ],
};

export const INSIGHTS_ARTICLES: InsightArticle[] = [GLP1_ARTICLE];
