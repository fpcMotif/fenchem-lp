import { j as e, r, a as m } from "./index-25pPz5MR.js";
function B({ className: a }) {
  return e.jsx("div", {
    className: a,
    children: e.jsx("img", {
      src: "/AppUpload/Image/d23d17a965454ad9acfcba73cb9b6089.png",
      alt: "全球分公司地图",
      className: "w-full h-full object-contain",
    }),
  });
}
function F({ threshold: a = 0.15, rootMargin: s = "0px 0px -40px 0px" } = {}) {
  const t = r.useRef(null),
    [i, l] = r.useState(!1);
  return (
    r.useEffect(() => {
      const n = t.current;
      if (!n) return;
      const c = new IntersectionObserver(
        ([o]) => {
          o.isIntersecting && (l(!0), c.disconnect());
        },
        { threshold: a, rootMargin: s },
      );
      return (c.observe(n), () => c.disconnect());
    }, [a, s]),
    { ref: t, shown: i }
  );
}
function x({ children: a, className: s, tone: t = "default", id: i }) {
  return e.jsx("section", {
    id: i,
    "data-tone": t === "primary" || t === "dark" ? t : void 0,
    className: m(
      "relative overflow-hidden py-16 md:py-24",
      t === "muted" && "bg-muted/40",
      t === "primary" && "bg-primary text-primary-foreground",
      t === "dark" && "bg-foreground text-background",
      s,
    ),
    children: a,
  });
}
function p({ children: a, className: s, width: t = "default" }) {
  return e.jsx("div", {
    className: m(
      "relative mx-auto px-4 md:px-6",
      t === "default" && "max-w-6xl",
      t === "narrow" && "max-w-3xl",
      t === "wide" && "max-w-[1240px]",
      s,
    ),
    children: a,
  });
}
function d({ children: a, className: s, delay: t = 0, as: i = "div" }) {
  const { ref: l, shown: n } = F();
  return e.jsx(i, {
    ref: l,
    className: m(
      "transition-[opacity,translate] duration-(--motion-duration-slow) ease-(--motion-ease)",
      n ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      s,
    ),
    style: t ? { transitionDelay: `${t}ms` } : void 0,
    children: a,
  });
}
function k({ onComplete: a }) {
  const [s, t] = r.useState(!0);
  return (
    r.useEffect(() => {
      const i = setTimeout(() => {
          t(!1);
        }, 2500),
        l = setTimeout(() => {
          a?.();
        }, 4100);
      return () => {
        (clearTimeout(i), clearTimeout(l));
      };
    }, [a]),
    e.jsxs("div", {
      className: `fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-[1600ms] ${s ? "opacity-100" : "opacity-0 pointer-events-none"}`,
      children: [
        e.jsx("img", {
          src: "/AppUpload/Image/ca8375bebf1a4d6ab634a64e6dcdd68e.png",
          alt: "FENCHEM 泛成",
          className: "h-16 w-auto animate-[preloaderFade_0.6s_ease-out_both]",
        }),
        e.jsx("style", {
          children: `
        @keyframes preloaderFade {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `,
        }),
      ],
    })
  );
}
function A({ target: a, suffix: s = "" }) {
  const t = r.useRef(null),
    [i, l] = r.useState(0),
    n = r.useRef(!1);
  r.useEffect(() => {
    const o = t.current;
    if (!o) return;
    const h = new IntersectionObserver(
      (f) => {
        f.forEach((g) => {
          if (g.isIntersecting && !n.current) {
            n.current = !0;
            const j = 2e3,
              v = performance.now(),
              u = (N) => {
                const y = N - v,
                  b = Math.min(y / j, 1),
                  w = 1 - Math.pow(1 - b, 3),
                  I = Math.floor(w * a);
                (l(I), b < 1 ? requestAnimationFrame(u) : l(a));
              };
            requestAnimationFrame(u);
          }
        });
      },
      { threshold: 0.5 },
    );
    return (h.observe(o), () => h.disconnect());
  }, [a]);
  const c = i.toLocaleString();
  return e.jsxs("span", {
    ref: t,
    children: [c, s && e.jsx("span", { className: "text-2xl align-top ml-1", children: s })],
  });
}
const E = "/AppUpload/Image/337e2bdc61a944d7a4de9677b9892ac8.png",
  C = "/AppUpload/Image/d8b476aaddeb4d93af3d3bb9d5de32f6.png",
  S = "/AppUpload/Image/3ef0ce2695d843ff9476399c75207f4b.png",
  M = "/AppUpload/Image/14c79e1e972644a2964af724eb9249ee.png",
  H = "/AppUpload/Image/614078814e8f4ac5a502f02664dd2f03.png",
  _ = "/AppUpload/Image/bc0468732a7043a4adbf6ec7e538246b.avif",
  U = "/AppUpload/Image/9b6bc1baf67a490fb77d9d814d83d927.avif",
  D = "/AppUpload/Image/c34439f2d01343c48b34cfd6c4c67056.png",
  T = "/AppUpload/Image/1fef3765bd1b4730902c7378a9308a94.png";
function z() {
  return e.jsx("section", {
    id: "hero",
    className: "relative flex items-center overflow-hidden",
    style: {
      height: "920px",
      backgroundImage: "url(/AppUpload/Image/6aae5e7bd5b94f72afc259896bac7776.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    children: e.jsxs("div", {
      className: "mx-auto w-full max-w-[1240px] px-6 lg:px-8 pt-24 pb-20 relative z-10",
      children: [
        e.jsx(d, {
          children: e.jsx("img", {
            src: "/AppUpload/Image/5d73428d722e4a00927fc9f28a9dd4bc.png",
            alt: "泛成生物",
            className: "w-[154px] h-auto mb-8",
          }),
        }),
        e.jsx(d, {
          delay: 100,
          children: e.jsx("h2", {
            className: "text-3xl md:text-4xl text-[#131B2B] mb-6 font-medium",
            children: "链接全球优质原料，打造创新解决方案。",
          }),
        }),
        e.jsx(d, {
          delay: 200,
          children: e.jsx("p", {
            className: "text-base md:text-lg text-[#131B2B] max-w-3xl mb-12 leading-relaxed",
            children:
              "通过全球化资源、创新能力与稳定供应链，赋能营养健康、食品、个人护理及宠物健康客户。",
          }),
        }),
        e.jsx(d, {
          delay: 300,
          children: e.jsxs("div", {
            className: "flex",
            children: [
              e.jsx("button", {
                className:
                  "bg-[#131B2B] text-white px-10 py-4 text-sm font-medium hover:bg-[#0D1219] transition-colors",
                children: "了解产品",
              }),
              e.jsx("button", {
                className:
                  "bg-white text-[#131B2B] px-10 py-4 text-sm font-medium hover:bg-gray-50 transition-colors border-l border-gray-200",
                children: "联系我们",
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function G() {
  const a = [
    { label: "公司历史", value: 30, suffix: "+", desc: "三十余年行业积淀" },
    { label: "全球分公司", value: 16, suffix: "", desc: "全球16家分支机构" },
    { label: "生产基地", value: 35e3, suffix: "m²", desc: "制造与解决方案" },
  ];
  return e.jsxs("section", {
    id: "about",
    className: "relative min-h-[600px] md:min-h-[780px] flex items-center overflow-hidden",
    style: { backgroundImage: `url(${E})`, backgroundSize: "cover", backgroundPosition: "center" },
    children: [
      e.jsx("div", {
        className: "relative z-10 mx-auto w-full max-w-[1240px] px-6 lg:px-8 py-20 md:py-24",
        children: e.jsx(d, {
          children: e.jsxs("div", {
            className: "max-w-[470px]",
            children: [
              e.jsxs("div", {
                className: "translate-y-[-70px]",
                children: [
                  e.jsx("h2", {
                    className: "text-3xl md:text-4xl font-bold text-[#142233] mb-4",
                    children: "关于泛成",
                  }),
                  e.jsx("p", {
                    className: "text-[#495f7e] leading-[2.1]",
                    children:
                      "南京泛成国际控股有限公司是行业内领先的原料供应商，凭借现代化生产基地和专业研发能力、遍布全球的分公司网络，为客户提供一站式定制化解决方案。我们经过三十多年的发展和经验积累，已成为全球范围内同行业中最具影响力的公司之一。",
                  }),
                ],
              }),
              e.jsx("button", {
                className:
                  "bg-[#131B2B] text-white px-8 py-3 text-sm font-medium hover:bg-[#0D1219] transition-colors",
                children: "更多",
              }),
            ],
          }),
        }),
      }),
      e.jsx("div", {
        className: "absolute bottom-0 left-0 right-0 z-10 w-full",
        style: { backgroundColor: "rgba(19, 27, 43, 0.4)" },
        children: e.jsx("div", {
          className: "mx-auto w-full max-w-[1240px] px-6 lg:px-8 py-7 md:py-10",
          children: e.jsx("div", {
            className: "grid grid-cols-3 gap-8",
            children: a.map((s) =>
              e.jsxs(
                "div",
                {
                  className: "text-center",
                  children: [
                    e.jsx("p", { className: "text-white/70 text-sm mb-2", children: s.label }),
                    e.jsx("p", {
                      className: "text-white text-4xl md:text-5xl font-light mb-2",
                      children: e.jsx(A, { target: s.value, suffix: s.suffix }),
                    }),
                    e.jsx("p", { className: "text-white/80 text-sm", children: s.desc }),
                  ],
                },
                s.label,
              ),
            ),
          }),
        }),
      }),
    ],
  });
}
function R() {
  const [a, s] = r.useState(null),
    t = [
      { title: "全球资源整合", desc: "汇聚全球优质原料资源", img: _ },
      { title: "稳定供应保障", desc: "本地仓储与高效交付", img: U },
      { title: "解决方案创新", desc: "应用研发与技术支持", img: D },
      { title: "长期合作伙伴", desc: "帮客户打造差异化产品", img: T },
    ],
    l = a !== null ? a : 0;
  return e.jsx(x, {
    id: "why-choose",
    className: "py-16 md:py-24",
    children: e.jsxs(p, {
      width: "wide",
      children: [
        e.jsx(d, {
          children: e.jsxs("div", {
            className: "mb-12 text-center",
            children: [
              e.jsx("h2", {
                className: "text-3xl md:text-4xl font-bold text-[#131B2B] mb-4",
                children: "为什么选择泛成",
              }),
              e.jsx("p", {
                className: "text-[#2f4d73] max-w-3xl mx-auto",
                children:
                  "我们整合全球资源、供应保障、解决方案创新与本地化服务，帮助客户将创意转化为市场成功。",
              }),
            ],
          }),
        }),
        e.jsx("div", {
          className: "flex flex-col lg:flex-row gap-4 w-full",
          style: { height: "650px" },
          onMouseLeave: () => s(null),
          children: t.map((n, c) => {
            const o = c === l;
            return e.jsxs(
              "div",
              {
                className: "relative rounded-xl overflow-hidden cursor-pointer lg:flex-1",
                style: {
                  flex: o ? 2 : 0.5,
                  transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  height: "100%",
                },
                onMouseEnter: () => s(c),
                children: [
                  e.jsx("div", {
                    className: "absolute inset-0 bg-cover bg-center",
                    style: {
                      backgroundImage: `url(${n.img})`,
                      filter: "brightness(1.15) saturate(0.75) contrast(0.95)",
                      transition: "transform 0.5s ease",
                      transform: o ? "scale(1.05)" : "scale(1)",
                    },
                  }),
                  e.jsx("div", {
                    className: "absolute inset-0",
                    style: {
                      background:
                        "linear-gradient(180deg, rgba(19,27,43,0.15) 0%, rgba(19,27,43,0.75) 100%)",
                    },
                  }),
                  e.jsxs("div", {
                    className:
                      "absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white flex flex-col gap-3 lg:gap-4 z-10",
                    children: [
                      e.jsx("div", {
                        className:
                          "w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/20 backdrop-blur-[10px] flex items-center justify-center mb-1 lg:mb-2",
                        children: e.jsxs("svg", {
                          width: "24",
                          height: "24",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "white",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          children: [
                            c === 0 &&
                              e.jsxs(e.Fragment, {
                                children: [
                                  e.jsx("circle", { cx: "12", cy: "12", r: "10" }),
                                  e.jsx("path", { d: "M2 12h20" }),
                                  e.jsx("path", {
                                    d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
                                  }),
                                ],
                              }),
                            c === 1 &&
                              e.jsx(e.Fragment, {
                                children: e.jsx("path", {
                                  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
                                }),
                              }),
                            c === 2 &&
                              e.jsx(e.Fragment, {
                                children: e.jsx("path", {
                                  d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                                }),
                              }),
                            c === 3 &&
                              e.jsxs(e.Fragment, {
                                children: [
                                  e.jsx("path", { d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" }),
                                  e.jsx("circle", { cx: "9", cy: "7", r: "4" }),
                                  e.jsx("path", { d: "M23 21v-2a4 4 0 00-3-3.87" }),
                                  e.jsx("path", { d: "M16 3.13a4 4 0 010 7.75" }),
                                ],
                              }),
                          ],
                        }),
                      }),
                      e.jsx("h3", {
                        className:
                          "text-lg lg:text-xl font-medium text-white whitespace-nowrap overflow-hidden text-ellipsis",
                        children: n.title,
                      }),
                      e.jsx("p", {
                        className: "text-sm text-white/85 leading-relaxed overflow-hidden",
                        style: {
                          maxHeight: o ? "100px" : "0px",
                          opacity: o ? 1 : 0,
                          transition: "max-height 0.4s ease, opacity 0.3s ease",
                        },
                        children: n.desc,
                      }),
                      e.jsxs("a", {
                        className: "inline-flex items-center gap-2 text-sm text-white",
                        style: {
                          opacity: o ? 1 : 0,
                          transform: o ? "translateY(0)" : "translateY(10px)",
                          transition: "opacity 0.3s ease, transform 0.3s ease",
                        },
                        href: "#",
                        children: [
                          "了解更多",
                          e.jsx("span", {
                            className: "transition-transform duration-300 hover:translate-x-1",
                            children: "→",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              },
              n.title,
            );
          }),
        }),
      ],
    }),
  });
}
function P() {
  const a = [
      {
        title: "人类营养健康",
        desc: "基于科学证据的健康营养方案",
        img: C,
        items: ["肠道健康", "女性健康", "情绪健康", "体重管理"],
      },
      {
        title: "功能性食品",
        desc: "面向现代生活方式的功能方案",
        img: S,
        items: ["膳食纤维", "亲水胶体", "天然色素"],
      },
      { title: "个人护理", desc: "天然来源活性成分方案", img: M, items: ["植物油脂", "活性物"] },
      {
        title: "宠物健康",
        desc: "全面宠物营养方案",
        img: H,
        items: ["美毛护肤与肠胃修复", "毛发顺滑与骨骼保健", "肠道养护", "关节健康"],
      },
    ],
    s = ["#FFFFFF", "#E6E6E6", "#FFFFFF", "#E6E6E6"];
  return e.jsx(x, {
    id: "products",
    className: "py-16 md:py-24 bg-[#F2F7F7]",
    children: e.jsxs(p, {
      width: "wide",
      children: [
        e.jsx(d, {
          children: e.jsxs("div", {
            className: "mb-12 text-center",
            children: [
              e.jsx("h2", {
                className: "text-3xl md:text-4xl font-bold text-[#131B2B] mb-4",
                children: "产品与应用方案",
              }),
              e.jsx("p", {
                className: "text-[#2f4d73] max-w-3xl mx-auto",
                children:
                  "从个人护理到人类营养、宠物健康与食品原料，泛成以稳定的品质与专业的应用支持，赋能未来健康生活。",
              }),
              e.jsx("button", {
                className:
                  "mt-6 bg-[#131B2B] text-white px-8 py-2.5 text-sm font-medium hover:bg-[#0D1219] transition-colors",
                children: "更多",
              }),
            ],
          }),
        }),
        e.jsx("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          children: a.map((t, i) =>
            e.jsx(
              d,
              {
                delay: i * 100,
                children: e.jsxs("div", {
                  className: "flex flex-col",
                  style: { height: "650px" },
                  children: [
                    e.jsx("div", {
                      className: "overflow-hidden",
                      style: { height: "50%" },
                      children: e.jsx("img", {
                        src: t.img,
                        alt: t.title,
                        className:
                          "w-full h-full object-cover hover:scale-105 transition-transform duration-500",
                        loading: "lazy",
                      }),
                    }),
                    e.jsxs("div", {
                      className: "p-6 flex flex-col",
                      style: { height: "50%", backgroundColor: s[i] },
                      children: [
                        e.jsxs("div", {
                          style: { minHeight: "80px" },
                          children: [
                            e.jsx("h3", {
                              className:
                                "text-2xl font-normal text-[#0b0b0c] mb-2 pb-2 border-b border-gray-400/40",
                              children: t.title,
                            }),
                            e.jsx("p", { className: "text-base text-[#495f7e]", children: t.desc }),
                          ],
                        }),
                        e.jsx("ul", {
                          className: "space-y-2 mt-auto",
                          style: { minHeight: "120px" },
                          children: t.items.map((l) =>
                            e.jsx("li", { className: "text-base text-[#495f7e]", children: l }, l),
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
              },
              t.title,
            ),
          ),
        }),
      ],
    }),
  });
}
const W = [
  {
    name: "🇩🇪 科隆，德国",
    value: [6.96, 50.94],
    position: "欧洲总部",
    address: "科隆市中心",
    capabilities: ["欧洲市场销售", "技术支持", "客户服务"],
    categories: ["营养健康", "功能性食品"],
    performance: "48h 响应",
  },
  {
    name: "🇬🇧 曼彻斯特，英国",
    value: [-2.24, 53.48],
    position: "英国分公司",
    address: "曼彻斯特市中心",
    capabilities: ["英国市场销售", "仓储物流"],
    categories: ["营养健康", "个人护理"],
    performance: "24h 响应",
  },
  {
    name: "🇵🇱 克拉科夫，波兰",
    value: [19.94, 50.06],
    position: "东欧分公司",
    address: "克拉科夫市中心",
    capabilities: ["东欧市场销售", "本地化服务"],
    categories: ["营养健康"],
    performance: "48h 响应",
  },
  {
    name: "🇿 斯特拉瓦，捷克",
    value: [18.29, 49.82],
    position: "中欧分公司",
    address: "斯特拉瓦市中心",
    capabilities: ["中欧市场销售", "技术支持"],
    categories: ["功能性食品"],
    performance: "48h 响应",
  },
  {
    name: "🇸 奇诺，美国",
    value: [-117.69, 34.01],
    position: "北美西海岸",
    address: "加利福尼亚州",
    capabilities: ["北美市场销售", "仓储物流", "技术支持"],
    categories: ["营养健康", "功能性食品", "个人护理"],
    performance: "24h 响应",
  },
  {
    name: "🇺🇸 格莱姆斯，美国",
    value: [-93.82, 41.69],
    position: "北美中部",
    address: "爱荷华州",
    capabilities: ["北美市场销售", "仓储物流"],
    categories: ["营养健康", "功能性食品"],
    performance: "24h 响应",
  },
  {
    name: "🇺 劳雷尔山，美国",
    value: [-76.85, 39.1],
    position: "北美东海岸",
    address: "新泽西州",
    capabilities: ["北美市场销售", "客户服务"],
    categories: ["营养健康", "个人护理"],
    performance: "24h 响应",
  },
  {
    name: "🇷 圣保罗，巴西",
    value: [-46.63, -23.55],
    position: "南美总部",
    address: "圣保罗市中心",
    capabilities: ["南美市场销售", "仓储物流", "本地化服务"],
    categories: ["营养健康", "功能性食品"],
    performance: "48h 响应",
  },
  {
    name: "🇧 库里蒂巴，巴西",
    value: [-49.27, -25.43],
    position: "巴西南部",
    address: "库里蒂巴市中心",
    capabilities: ["巴西南部销售", "仓储物流"],
    categories: ["营养健康"],
    performance: "48h 响应",
  },
  {
    name: "🇨🇳 南京，中国",
    value: [118.79, 32.06],
    position: "中国总部",
    address: "南京市",
    capabilities: ["研发生产", "全球销售", "技术支持", "客户服务"],
    categories: ["营养健康", "功能性食品", "个人护理", "宠物健康"],
    performance: "24h 响应",
  },
  {
    name: "🇯🇵 东京，日本",
    value: [139.69, 35.69],
    position: "日本分公司",
    address: "东京都",
    capabilities: ["日本市场销售", "技术支持"],
    categories: ["营养健康", "功能性食品"],
    performance: "24h 响应",
  },
  {
    name: "🇹🇭 曼谷，泰国",
    value: [100.5, 13.75],
    position: "东南亚总部",
    address: "曼谷市中心",
    capabilities: ["东南亚市场销售", "仓储物流"],
    categories: ["营养健康", "功能性食品"],
    performance: "48h 响应",
  },
  {
    name: "🇲🇾 吉隆坡，马来西亚",
    value: [101.69, 3.14],
    position: "马来西亚分公司",
    address: "吉隆坡市中心",
    capabilities: ["马来西亚市场销售", "本地化服务"],
    categories: ["营养健康"],
    performance: "48h 响应",
  },
  {
    name: "🇳 孟买，印度",
    value: [72.88, 19.08],
    position: "印度分公司",
    address: "孟买市中心",
    capabilities: ["印度市场销售", "技术支持"],
    categories: ["营养健康", "功能性食品"],
    performance: "48h 响应",
  },
  {
    name: "🇮 雅加达，印度尼西亚",
    value: [106.85, -6.21],
    position: "印尼分公司",
    address: "雅加达市中心",
    capabilities: ["印尼市场销售", "仓储物流"],
    categories: ["营养健康"],
    performance: "48h 响应",
  },
  {
    name: "🇵🇭 马尼拉，菲律宾",
    value: [120.98, 14.6],
    position: "菲律宾分公司",
    address: "马尼拉市中心",
    capabilities: ["菲律宾市场销售", "本地化服务"],
    categories: ["营养健康"],
    performance: "48h 响应",
  },
  {
    name: "🇿🇦 约翰内斯堡，南非",
    value: [28.04, -26.2],
    position: "非洲总部",
    address: "约翰内斯堡市中心",
    capabilities: ["非洲市场销售", "仓储物流"],
    categories: ["营养健康", "功能性食品"],
    performance: "48h 响应",
  },
];
function O() {
  const a = [
    {
      name: "亚洲",
      bg: "#131B2B",
      offices: [
        "南京，中国",
        "东京，日本",
        "曼谷，泰国",
        "吉隆坡，马来西亚",
        "孟买，印度",
        "雅加达，印度尼西亚",
      ],
    },
    {
      name: "欧洲",
      bg: "#131B2B",
      offices: ["科隆，德国", "曼彻斯特，英国", "克拉科夫，波兰", "斯特拉瓦，捷克"],
    },
    {
      name: "北美洲",
      bg: "#131B2B",
      offices: ["奇诺，加利福尼亚州", "格莱姆斯，爱荷华州", "劳雷尔山，新泽西州"],
    },
    { name: "非洲", bg: "#131B2B", offices: ["约翰内斯堡，南非"] },
    { name: "南美洲", bg: "#131B2B", offices: ["圣保罗，巴西", "库里蒂巴，巴西"] },
  ];
  return e.jsxs(x, {
    id: "global",
    className: "!py-0",
    children: [
      e.jsx("div", {
        className: "relative bg-[#2F4D73] py-12 md:py-20",
        children: e.jsx("div", {
          className: "relative mx-auto px-4 md:px-6 max-w-[1240px]",
          children: e.jsxs("div", {
            className: "flex flex-col lg:flex-row items-center gap-8",
            children: [
              e.jsx("div", {
                className: "flex-1 w-full",
                children: e.jsx("div", {
                  className: "rounded-xl overflow-hidden",
                  style: { height: "400px" },
                  children: e.jsx(B, { warehouseData: W, className: "w-full h-full" }),
                }),
              }),
              e.jsxs("div", {
                className: "lg:w-[300px] text-center lg:text-left",
                children: [
                  e.jsx("h2", {
                    className: "text-3xl md:text-4xl font-bold text-white mb-6",
                    children: "全球分公司",
                  }),
                  e.jsxs("p", {
                    className: "text-white/80 text-lg leading-relaxed",
                    children: ["遍布全球的分公司网络，", e.jsx("br", {}), "让优质原料触手可及。"],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      e.jsx("div", {
        className: "py-16 md:py-24",
        style: { backgroundColor: "#F2F7F7" },
        children: e.jsx("div", {
          className: "relative mx-auto px-4 md:px-6 max-w-[1240px]",
          children: e.jsxs("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
            children: [
              e.jsxs("div", {
                style: { backgroundColor: "rgba(255, 255, 255, 0.7)" },
                children: [
                  e.jsx("div", {
                    className: "py-2 mb-4",
                    style: { backgroundColor: a[0].bg },
                    children: e.jsx("h3", {
                      className: "text-white font-medium px-4",
                      children: a[0].name,
                    }),
                  }),
                  e.jsx("ul", {
                    className: "space-y-2 px-4 pb-4",
                    children: a[0].offices.map((s) =>
                      e.jsx("li", { className: "text-[#495f7e]", children: s }, s),
                    ),
                  }),
                ],
              }),
              e.jsxs("div", {
                style: { backgroundColor: "rgba(255, 255, 255, 0.7)" },
                children: [
                  e.jsx("div", {
                    className: "py-2 mb-4",
                    style: { backgroundColor: a[1].bg },
                    children: e.jsx("h3", {
                      className: "text-white font-medium px-4",
                      children: a[1].name,
                    }),
                  }),
                  e.jsx("ul", {
                    className: "space-y-2 px-4 pb-4",
                    children: a[1].offices.map((s) =>
                      e.jsx("li", { className: "text-[#495f7e]", children: s }, s),
                    ),
                  }),
                ],
              }),
              e.jsxs("div", {
                style: { backgroundColor: "rgba(255, 255, 255, 0.7)" },
                children: [
                  e.jsx("div", {
                    className: "py-2 mb-4",
                    style: { backgroundColor: a[2].bg },
                    children: e.jsx("h3", {
                      className: "text-white font-medium px-4",
                      children: a[2].name,
                    }),
                  }),
                  e.jsx("ul", {
                    className: "space-y-2 px-4 pb-4",
                    children: a[2].offices.map((s) =>
                      e.jsx("li", { className: "text-[#495f7e]", children: s }, s),
                    ),
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "flex flex-col",
                style: { backgroundColor: "rgba(255, 255, 255, 0.7)" },
                children: [
                  e.jsxs("div", {
                    className: "mb-[5px]",
                    children: [
                      e.jsx("div", {
                        className: "py-2 mb-4",
                        style: { backgroundColor: a[3].bg },
                        children: e.jsx("h3", {
                          className: "text-white font-medium px-4",
                          children: a[3].name,
                        }),
                      }),
                      e.jsx("ul", {
                        className: "space-y-2 px-4 pb-4",
                        children: a[3].offices.map((s) =>
                          e.jsx("li", { className: "text-[#495f7e]", children: s }, s),
                        ),
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "flex-1",
                    children: [
                      e.jsx("div", {
                        className: "py-2 mb-4",
                        style: { backgroundColor: a[4].bg },
                        children: e.jsx("h3", {
                          className: "text-white font-medium px-4",
                          children: a[4].name,
                        }),
                      }),
                      e.jsx("ul", {
                        className: "space-y-2 px-4 pb-4",
                        children: a[4].offices.map((s) =>
                          e.jsx("li", { className: "text-[#495f7e]", children: s }, s),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
function Y() {
  const a = [
      {
        date: "2026 年 9 月 23 – 24 日",
        location: "巴西 圣保罗",
        name: "In-cosmetics® 拉丁美洲展",
        sub: "欢迎参加 2026 年 In-cosmetics® 拉丁美洲展！",
      },
      {
        date: "2026 年 9 月 28 日 – 10 月 1 日",
        location: "澳大利亚 珀斯",
        name: "IFSCC 大会 2026",
        sub: "欢迎参加 2026 年 IFSCC 大会！",
      },
      {
        date: "2026 年 10 月 6 – 8 日",
        location: "美国 南卡罗来纳州 查尔斯顿",
        name: "Naturally Kiawah 研讨会 2026",
        sub: "欢迎参加 2026 年 Naturally Kiawah 研讨会！",
      },
      {
        date: "2026 年 10 月 15 – 17 日",
        location: "德国 科隆",
        name: "In-cosmetics® Global 2026",
        sub: "欢迎参加 2026 年 In-cosmetics® Global 展会！",
      },
      {
        date: "2026 年 11 月 3 – 5 日",
        location: "日本 东京",
        name: "PCHi 2026 个人护理品行业峰会",
        sub: "欢迎参加 2026 年 PCHi 个人护理品行业峰会！",
      },
    ],
    [s, t] = r.useState(0);
  return e.jsx(x, {
    id: "exhibitions",
    className: "py-16 md:py-24 bg-white",
    children: e.jsxs(p, {
      width: "wide",
      children: [
        e.jsx(d, {
          children: e.jsx("div", {
            className: "mb-8",
            children: e.jsx("h2", {
              className: "text-3xl md:text-4xl font-bold text-[#131B2B] mb-4",
              children: "新闻资讯",
            }),
          }),
        }),
        e.jsx("div", {
          className: "space-y-3",
          children: a.map((i, l) =>
            e.jsx(
              d,
              {
                delay: l * 100,
                children: e.jsxs("div", {
                  className: "rounded-sm",
                  style: { backgroundColor: "#F5F5F5" },
                  children: [
                    e.jsxs("button", {
                      className: "w-full flex items-center justify-between px-6 py-5 text-left",
                      onClick: () => t(s === l ? null : l),
                      children: [
                        e.jsxs("span", {
                          className: "text-base font-bold text-[#1a1a2e]",
                          children: [l + 1, ". ", i.name],
                        }),
                        e.jsx("span", {
                          className: "text-2xl text-[#6b7280] ml-4 shrink-0",
                          children: s === l ? "−" : "+",
                        }),
                      ],
                    }),
                    s === l &&
                      e.jsx("div", {
                        className: "px-6 pb-5",
                        children: e.jsxs("p", {
                          className: "text-sm text-[#6b7280] leading-relaxed",
                          children: [i.date, " · ", i.location, e.jsx("br", {}), i.sub],
                        }),
                      }),
                  ],
                }),
              },
              i.name,
            ),
          ),
        }),
      ],
    }),
  });
}
function L() {
  return e.jsx("section", {
    className: "py-20 md:py-28",
    style: { backgroundColor: "#B8D4E3" },
    children: e.jsxs("div", {
      className: "relative mx-auto px-4 md:px-6 max-w-[1240px] text-center",
      children: [
        e.jsx("h2", {
          className: "text-3xl md:text-4xl font-bold text-[#131B2B] mb-8",
          children: "更多合作机会",
        }),
        e.jsx("button", {
          className:
            "bg-[#131B2B] text-white px-12 text-base font-medium hover:bg-[#0D1219] transition-colors",
          style: { height: "45px" },
          children: "联系我们",
        }),
      ],
    }),
  });
}
function $() {
  const [a, s] = r.useState(!0);
  return e.jsxs("main", {
    className: "flex-1",
    children: [
      a && e.jsx(k, { onComplete: () => s(!1) }),
      e.jsx(z, {}),
      e.jsx(G, {}),
      e.jsx(R, {}),
      e.jsx(P, {}),
      e.jsx(O, {}),
      e.jsx(Y, {}),
      e.jsx(L, {}),
    ],
  });
}
export { $ as default };
