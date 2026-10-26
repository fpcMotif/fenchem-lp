import * as stylex from "@stylexjs/stylex";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import {
  INSIGHTS_ARTICLES,
  type InsightArticle,
} from "@/components/prototype/variant-oos1/insights-data";
import { InsightArticleView } from "@/components/prototype/variant-oos1/insights-view";
import { kitStyles } from "@/components/prototype/variant-oos1/subpage-kit";

const HAIRLINE = "rgba(26, 26, 26, 0.12)";

const stageStyles = stylex.create({
  root: {
    width: "100%",
    maxWidth: 800,
    minWidth: 0,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: HAIRLINE,
  },
});

const [GLP1_ARTICLE, COLORED_OILS_ARTICLE] = INSIGHTS_ARTICLES;

const PROBIOTIC_STABILITY_ARTICLE: InsightArticle = {
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
              desc: "体系水分活度越高，活菌数下降越快；吸湿性原料的比例需要严格控制。",
            },
            {
              term: "储存温度",
              desc: "常温货架与冷链储存的活菌衰减速度差异明显，标签条件需与测试条件一致。",
            },
            {
              term: "微胶囊化（Microencapsulation）",
              desc: "包埋工艺可以降低胃酸与加工过程对菌株的影响，但会增加成本和粒径。",
            },
            {
              term: "氧气与包材",
              desc: "铝箔复合膜条袋的阻隔性优于普通复合膜，必要时可充氮包装。",
            },
            {
              term: "复配原料",
              desc: "部分矿物质、酸味剂和高吸湿性纤维可能加速活菌数下降。",
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
              term: "Lacticaseibacillus rhamnosus GG ATCC 53103",
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
      slug: "protocol",
      navLabel: "三　立项测试建议",
      title: "三　立项阶段测试与合规建议",
      blocks: [
        {
          kind: "note",
          label: "开发提示",
          text: "建议在配方立项阶段同步评估原辅料水分活度（aw ≤ 0.25）、铝箔条袋残氧量与 37℃ 加速稳定性下的菌落总数衰减曲线。",
        },
        {
          kind: "disclaimer",
          text: "说明：本文为官网技术洞察示范稿，菌株信息仅作配方讨论参考，不构成产品功效承诺。正式发布前，应结合目标市场法规与菌株证据进行合规审核。",
        },
      ],
    },
  ],
};

const HMB_BRIEF_ARTICLE: InsightArticle = {
  id: "hmb",
  category: "原料解读",
  title: "HMB（β-羟基-β-甲基丁酸）在肌肉营养配方中的应用简述",
  navLabel: null,
  lead: null,
  thesis: null,
  intro: [
    "2026年，运动营养产品的目标人群正从专业运动员扩展到中老年与体重管理人群。HMB（β-羟基-β-甲基丁酸）作为亮氨酸的代谢产物，常被用于与肌肉维持相关的配方设计。",
  ],
  sections: [
    {
      slug: "formats",
      navLabel: "一　适用剂型",
      title: "一　适用剂型与复配方向",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "HMB钙盐水溶性良好，常与乳清蛋白、大豆分离蛋白、维生素D3及钙盐组合，用于固体饮料、压片糖果与运动营养粉剂。",
          ],
        },
        {
          kind: "bullets",
          items: [
            "固体饮料与冲调粉：需关注金属离子苦涩味的掩蔽体系；",
            "片剂与硬胶囊：剂量精准，需控制压片颗粒的流动性与吸湿性；",
            "法规核查：不同国家与地区对HMB的适用食品类别及每日推荐摄入量上限存在差异。",
          ],
        },
      ],
    },
  ],
};

const GUT_DRINKS_WITH_NOTE_ARTICLE: InsightArticle = {
  id: "gut-drinks",
  category: "应用方案",
  title: "后生元、益生元与膳食纤维协同：日常型肠道健康饮品配方开发要点",
  navLabel: "肠道健康饮品开发",
  lead: "从原料筛选、发酵特征与胃肠耐受评估，到即饮饮料、冲调粉与条袋装的稳定性测试",
  cover: {
    src: "/products/figma/fiber-plate.jpg",
    alt: "日常型肠道健康饮品配方样品与天然膳食纤维原料",
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
  ],
  sections: [
    {
      slug: "need",
      navLabel: "一　人群细分",
      title: "一　目标人群细分与剂型偏好",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "随着消费者对肠道微生态认知的加深，以及体重管理和健康老龄化需求的增长，品类正在向“每日饮用、长期坚持”的习惯型产品转变。不同人群对口感、剂量和剂型的要求各有侧重：",
          ],
        },
        {
          kind: "bullets",
          items: [
            "体重管理人群：进食量减少，更关注饱腹感、低能量和胃肠舒适度，对甜味和黏度较为敏感；",
            "中老年人群：偏好温和口感与易冲调的剂型，同时关注蛋白质与钙、维生素D的协同补充；",
            "久坐办公人群：关注排便规律与便捷性，倾向于即饮或条袋装产品；",
            "运动与健身人群：希望在补充电解质和蛋白质的同时兼顾肠道舒适，避免训练前后出现胀气。",
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
              term: "后生元",
              desc: "不依赖活菌存活，耐热、耐酸，适合热灌装即饮饮料与常温货架产品。",
            },
            {
              term: "益生元",
              desc: "低聚果糖、低聚半乳糖与菊粉可被有益菌利用，需结合目标人群控制单次添加量。",
            },
            {
              term: "可溶性膳食纤维",
              desc: "部分水解瓜尔胶等低黏度纤维冲调性好、口味存在感低，适合作为每日饮用的纤维基础。",
            },
            {
              term: "电解质与植物提取物",
              desc: "钠、钾、镁与姜、柑橘等天然风味协同，兼顾日常补水与口感修饰。",
            },
          ],
        },
      ],
    },
    {
      slug: "summary",
      navLabel: "三　小结与开发提示",
      title: "三　小结",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "肠道健康饮品的下一阶段竞争，将更多地体现在长期饮用体验和配方的科学性上。品牌需要在原料选择、剂型设计和稳定性验证之间找到平衡。",
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
};

type StateSpec = {
  id: string;
  label: string;
  article: InsightArticle;
  coverEnd: boolean;
  open: boolean;
};

type StateGroup = {
  id: string;
  heading: string;
  states: readonly StateSpec[];
};

const STATE_GROUPS: readonly StateGroup[] = [
  {
    id: "collapsed",
    heading: "Collapsed",
    states: [
      {
        id: "collapsed-cover-start",
        label: "Cover start (GLP-1)",
        article: GLP1_ARTICLE,
        coverEnd: false,
        open: false,
      },
      {
        id: "collapsed-cover-end",
        label: "Cover end (Colored oils)",
        article: COLORED_OILS_ARTICLE,
        coverEnd: true,
        open: false,
      },
      {
        id: "collapsed-no-cover",
        label: "No cover (Probiotics)",
        article: PROBIOTIC_STABILITY_ARTICLE,
        coverEnd: false,
        open: false,
      },
      {
        id: "collapsed-minimal",
        label: "No cover, lead or thesis",
        article: HMB_BRIEF_ARTICLE,
        coverEnd: false,
        open: false,
      },
    ],
  },
  {
    id: "expanded",
    heading: "Expanded",
    states: [
      {
        id: "expanded-cover-start",
        label: "Full article (GLP-1)",
        article: GLP1_ARTICLE,
        coverEnd: false,
        open: true,
      },
      {
        id: "expanded-cover-end",
        label: "Cover end (Colored oils)",
        article: COLORED_OILS_ARTICLE,
        coverEnd: true,
        open: true,
      },
      {
        id: "expanded-with-note",
        label: "All 5 block types + note",
        article: GUT_DRINKS_WITH_NOTE_ARTICLE,
        coverEnd: false,
        open: true,
      },
      {
        id: "expanded-no-cover",
        label: "No cover + note block",
        article: PROBIOTIC_STABILITY_ARTICLE,
        coverEnd: false,
        open: true,
      },
      {
        id: "expanded-minimal",
        label: "Minimal (no thesis, 1 sec)",
        article: HMB_BRIEF_ARTICLE,
        coverEnd: false,
        open: true,
      },
    ],
  },
];

const ALL_STATES: readonly StateSpec[] = STATE_GROUPS.flatMap((group) => group.states);
const DEFAULT_STATE_ID = ALL_STATES[0].id;

export const Route = createFileRoute("/states/insights-article")({
  validateSearch: (search: { __state?: unknown }): { __state?: string } => {
    const raw = typeof search.__state === "string" ? search.__state : undefined;
    const matched = ALL_STATES.find((state) => state.id === raw);
    return matched ? { __state: matched.id } : {};
  },
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound();
  },
  component: InsightsArticleStatePage,
});

const SWITCHER_CSS = `
.state-page {
  container: state-page / inline-size;
  margin-inline: calc(50% - 50vw);
  padding: 24px;
}

.state-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
  margin-inline: auto;
}

.state-switcher {
  all: unset;
  display: none;
  flex-direction: column;
  gap: 16px;
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  scrollbar-width: none;
  padding: 6px;
  border-radius: 14px;
  background: rgb(20 20 20 / 0.92);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1);
  font: 13px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  user-select: none;
}

.state-switcher-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.state-switcher-heading {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px 6px;
  font-size: 11px;
  font-weight: 500;
  color: rgb(255 255 255 / 0.45);
}

.state-switcher button {
  all: unset;
  flex: none;
  padding: 8px 10px;
  border-radius: 8px;
  font: inherit;
  color: rgb(255 255 255 / 0.6);
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 200ms ease-out, font-weight 200ms ease-out;
}

.state-switcher button:hover {
  color: rgb(255 255 255 / 0.85);
}

.state-switcher button[aria-pressed="true"] {
  background: rgb(255 255 255 / 0.14);
  color: rgb(255 255 255);
  font-weight: 500;
}

.state-switcher button:focus-visible {
  outline: 2px solid rgb(255 255 255 / 0.7);
  outline-offset: 2px;
}

.state-switcher-select {
  position: relative;
  align-self: flex-start;
  max-width: 100%;
  color: rgb(255 255 255);
}

.state-switcher-select select {
  all: unset;
  box-sizing: border-box;
  max-width: 100%;
  padding: 10px 36px 10px 16px;
  border-radius: 999px;
  background: rgb(20 20 20 / 0.92);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1);
  font: 500 13px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  cursor: pointer;
}

.state-switcher-select select:focus-visible {
  outline: 2px solid rgb(255 255 255 / 0.7);
  outline-offset: 2px;
}

.state-switcher-select svg {
  position: absolute;
  top: 50%;
  right: 14px;
  translate: 0 -50%;
  pointer-events: none;
  color: rgb(255 255 255 / 0.6);
}

.state-stage {
  min-width: 0;
  width: 100%;
  max-width: 800px;
}

@container state-page (min-width: 1032px) {
  .state-layout {
    display: grid;
    grid-template-columns: 208px 800px;
    justify-content: center;
    gap: 24px;
    align-items: start;
    max-width: none;
  }

  .state-switcher {
    display: flex;
    position: sticky;
    top: 24px;
  }

  .state-switcher-select {
    display: none;
  }
}

.state-layout[data-switcher-hidden="true"] .state-switcher,
.state-layout[data-switcher-hidden="true"] .state-switcher-select {
  display: none !important;
}

@container state-page (min-width: 1032px) {
  .state-layout[data-switcher-hidden="true"] {
    grid-template-columns: 800px;
  }
}
`;

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return target.isContentEditable;
}

function InsightsArticleStatePage() {
  const { __state } = Route.useSearch();
  const navigate = Route.useNavigate();
  const activeState = ALL_STATES.find((state) => state.id === __state) ?? ALL_STATES[0];
  const [openOverride, setOpenOverride] = useState<{ stateId: string; open: boolean } | null>(null);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isOpen =
    openOverride && openOverride.stateId === activeState.id ? openOverride.open : activeState.open;

  const selectState = (nextId: string) => {
    setOpenOverride(null);
    void navigate({
      search: nextId === DEFAULT_STATE_ID ? {} : { __state: nextId },
      replace: false,
      resetScroll: false,
    });
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeBtn = nav.querySelector<HTMLButtonElement>(
      `button[data-state="${activeState.id}"]`,
    );
    activeBtn?.scrollIntoView({ block: "nearest" });
  }, [activeState.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isInteractiveTarget(event.target)) return;

      if (event.key === "h" || event.key === "H") {
        event.preventDefault();
        setHidden((prev) => !prev);
        return;
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft"
      ) {
        event.preventDefault();
        const currentIndex = ALL_STATES.findIndex((state) => state.id === activeState.id);
        const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (currentIndex + delta + ALL_STATES.length) % ALL_STATES.length;
        const nextState = ALL_STATES[nextIndex];
        if (nextState) {
          setOpenOverride(null);
          void navigate({
            search: nextState.id === DEFAULT_STATE_ID ? {} : { __state: nextState.id },
            replace: false,
            resetScroll: false,
          });
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeState.id, navigate]);

  return (
    <div lang="zh-CN" {...stylex.props(kitStyles.root)}>
      <style>{SWITCHER_CSS}</style>
      <div className="state-page">
        <div className="state-layout" data-switcher-hidden={hidden ? "true" : undefined}>
          <nav ref={navRef} className="state-switcher" aria-label="States">
            {STATE_GROUPS.map((group) => {
              const headingId = `states-${group.id}`;
              return (
                <div
                  key={group.id}
                  className="state-switcher-group"
                  role="group"
                  aria-labelledby={headingId}
                >
                  <span className="state-switcher-heading" id={headingId}>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 3v4a3 3 0 0 0 3 3h7" />
                      <path d="m10 7 3 3-3 3" />
                    </svg>
                    {group.heading}
                  </span>
                  {group.states.map((state) => (
                    <button
                      key={state.id}
                      type="button"
                      data-state={state.id}
                      aria-pressed={state.id === activeState.id}
                      onClick={() => selectState(state.id)}
                    >
                      {state.label}
                    </button>
                  ))}
                </div>
              );
            })}
          </nav>

          <div className="state-switcher-select">
            <select
              aria-label="State"
              value={activeState.id}
              onChange={(event) => selectState(event.target.value)}
            >
              {STATE_GROUPS.map((group) => (
                <optgroup key={group.id} label={group.heading}>
                  {group.states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          </div>

          <div className="state-stage">
            <div {...stylex.props(stageStyles.root)}>
              <InsightArticleView
                key={activeState.id}
                article={activeState.article}
                coverEnd={activeState.coverEnd}
                open={isOpen}
                onToggle={() =>
                  setOpenOverride({
                    stateId: activeState.id,
                    open: !isOpen,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
