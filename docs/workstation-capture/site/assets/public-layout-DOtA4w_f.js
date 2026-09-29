import {
  c as f,
  r as c,
  j as e,
  B as S,
  L as M,
  a as h,
  N as _,
  g as p,
  b as g,
  u as k,
  s as j,
  O as z,
} from "./index-25pPz5MR.js";
import {
  D as B,
  a as E,
  b as A,
  c as F,
  S as P,
  d as T,
  e as O,
  f as I,
  g as G,
} from "./dropdown-menu-D88pNK4a.js";
import { C as H } from "./check-BnVm3EGq.js";
import { S as D } from "./search-Dr5WIagZ.js";
import { u as R } from "./member-auth-store-BvsgpZBh.js";
import { m as w } from "./member-api-B494A4Zv.js";
import "./index-C6C9Fd6I.js";
import "./index-1rwslFp9.js";
const U = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  V = f("arrow-right", U);
const W = [
    ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
    ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
    ["path", { d: "M2 5h12", key: "or177f" }],
    ["path", { d: "M7 2h1", key: "1t2jsx" }],
    ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
    ["path", { d: "M14 18h6", key: "1m8k6r" }],
  ],
  q = f("languages", W);
const X = [
    ["path", { d: "M4 5h16", key: "1tepv9" }],
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 19h16", key: "1djgab" }],
  ],
  Y = f("menu", X),
  Z = c.createContext(null);
async function $() {
  const { data: s, error: t } = await w.GET("/member/product-favorites/ids");
  if (t) throw t;
  return (s ?? []).map(String);
}
async function K(s) {
  const { error: t } = await w.POST("/member/product-favorites", { body: { productId: s } });
  if (t) throw t;
}
async function J(s) {
  const { error: t } = await w.POST("/member/product-favorites/{productId}/delete", {
    params: { path: { productId: s } },
  });
  if (t) throw t;
}
function Q() {
  const s = window.__WXZ_LANGUAGE_SWITCHER_CONFIG__;
  if (!s) return null;
  try {
    return s.getTranslateState();
  } catch {
    return null;
  }
}
function ee() {
  const [s, t] = c.useState(null),
    [o, n] = c.useState(!1),
    r = c.useCallback(() => t(Q()), []);
  if (
    (c.useEffect(
      () => (
        r(),
        window.addEventListener("translate-updated", r),
        document.addEventListener("ultron:ready", r),
        () => {
          (window.removeEventListener("translate-updated", r),
            document.removeEventListener("ultron:ready", r));
        }
      ),
      [r],
    ),
    !s || s.supportedLanguages.length === 0)
  )
    return null;
  const { sourceLanguage: l, currentLanguage: i, supportedLanguages: a } = s,
    b = [l, ...a].filter(
      (d, m, C) => !!d && C.findIndex((L) => L?.code.toLowerCase() === d.code.toLowerCase()) === m,
    ),
    x = i?.code ?? l?.code ?? "",
    u = (d) => {
      const m = window.__WXZ_LANGUAGE_SWITCHER_CONFIG__;
      !m ||
        d === x ||
        (n(!0),
        Promise.resolve(m.startTranslate(d))
          .catch(() => {})
          .then(() => {
            (n(!1), r());
          }));
    };
  return e.jsxs(B, {
    children: [
      e.jsx(E, {
        asChild: !0,
        children: e.jsxs(S, {
          variant: "ghost",
          size: "sm",
          className: "text-muted-foreground gap-1.5",
          "aria-label": "Switch language",
          translate: "no",
          children: [
            o ? e.jsx(M, { className: "size-4 animate-spin" }) : e.jsx(q, { className: "size-4" }),
            e.jsx("span", { className: "hidden sm:inline", children: i?.label ?? i?.code ?? "" }),
          ],
        }),
      }),
      e.jsx(A, {
        align: "end",
        className: "z-[100] min-w-[10rem]",
        translate: "no",
        children: b.map((d) => {
          const m = d.code.toLowerCase() === x.toLowerCase();
          return e.jsxs(
            F,
            {
              onSelect: () => u(d.code),
              className: h("gap-2", m && "bg-accent"),
              children: [
                d.emoji &&
                  e.jsx("span", { className: "text-base leading-none", children: d.emoji }),
                e.jsx("span", { className: "flex-1", children: d.label }),
                m && e.jsx(H, { className: "size-4" }),
              ],
            },
            d.code,
          );
        }),
      }),
    ],
  });
}
function te({ items: s, groups: t, path: o, open: n, onOpenChange: r }) {
  return s.length === 0 && t.length === 0
    ? null
    : e.jsxs(P, {
        open: n,
        onOpenChange: r,
        children: [
          e.jsx(T, {
            asChild: !0,
            children: e.jsx(S, {
              variant: "ghost",
              size: "icon",
              className: "md:hidden",
              "aria-label": "打开导航菜单",
              children: e.jsx(Y, { className: "size-5" }),
            }),
          }),
          e.jsxs(O, {
            side: "right",
            className: "w-[min(20rem,85vw)] gap-0 p-0",
            children: [
              e.jsx(I, {
                className: "border-b text-left",
                children: e.jsx(G, { children: "导航" }),
              }),
              e.jsxs("nav", {
                className: "flex flex-col gap-1 p-3",
                children: [
                  s.map((l) =>
                    e.jsx(
                      _,
                      {
                        to: p(l.to),
                        end: l.end,
                        viewTransition: !0,
                        onClick: () => r(!1),
                        className: ({ isActive: i }) =>
                          h(
                            "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            i
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground hover:bg-muted",
                          ),
                        children: l.label,
                      },
                      l.to,
                    ),
                  ),
                  t.map((l) =>
                    e.jsxs(
                      "div",
                      {
                        className: "mt-2 space-y-1 border-t pt-3",
                        children: [
                          e.jsx("p", {
                            className:
                              "text-muted-foreground px-3 text-xs font-semibold tracking-wide uppercase",
                            children: l.label,
                          }),
                          l.links.map((i) =>
                            e.jsxs(
                              g,
                              {
                                to: p(i.to),
                                viewTransition: !0,
                                onClick: () => r(!1),
                                className: h(
                                  "hover:bg-muted flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                                  o === i.to && "bg-accent",
                                ),
                                children: [
                                  e.jsx("span", {
                                    className:
                                      "bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg",
                                    children: e.jsx(i.icon, { className: "size-4" }),
                                  }),
                                  e.jsxs("span", {
                                    className: "min-w-0",
                                    children: [
                                      e.jsx("span", {
                                        className: "block text-sm font-medium",
                                        children: i.label,
                                      }),
                                      i.description &&
                                        e.jsx("span", {
                                          className: "text-muted-foreground block text-xs",
                                          children: i.description,
                                        }),
                                    ],
                                  }),
                                ],
                              },
                              i.to,
                            ),
                          ),
                        ],
                      },
                      l.label,
                    ),
                  ),
                ],
              }),
            ],
          }),
        ],
      });
}
function se() {
  const { pathname: s } = k(),
    t = s,
    [o, n] = c.useState(!1);
  return { path: t, mobileOpen: o, setMobileOpen: n };
}
const v = [
    { to: "/", label: "首页", end: !0 },
    { to: "/about", label: "关于我们" },
    { to: "/products", label: "产品与应用" },
    { to: "/rd", label: "研发与生产" },
    { to: "/careers", label: "职业发展" },
    { to: "/contact", label: "联系我们" },
  ],
  N = [],
  ae = "/AppUpload/Image/ca8375bebf1a4d6ab634a64e6dcdd68e.png";
function ne({ overlay: s = !1 }) {
  const { path: t, mobileOpen: o, setMobileOpen: n } = se(),
    r = N.flatMap((a) => a.links),
    [l, i] = c.useState(!1);
  return (
    c.useEffect(() => {
      const a = () => {
        i(window.scrollY > 50);
      };
      return (window.addEventListener("scroll", a), () => window.removeEventListener("scroll", a));
    }, []),
    e.jsx("header", {
      className: h(
        "z-50 transition-all duration-300",
        s ? "absolute top-0 left-0 right-0" : "sticky top-0",
        l ? "bg-white shadow-sm" : "bg-transparent",
      ),
      children: e.jsxs("div", {
        className:
          "mx-auto flex h-20 w-full max-w-[1240px] items-center justify-between gap-4 px-6 lg:px-8",
        children: [
          e.jsx(g, {
            to: p("/"),
            viewTransition: !0,
            className: "flex shrink-0 items-center gap-2",
            children: e.jsx("img", { src: ae, alt: "FENCHEM", className: "h-[52px] w-auto" }),
          }),
          e.jsxs("nav", {
            className: h(
              "hidden lg:flex items-center rounded-full pr-2 pl-0 py-0 transition-all duration-300 flex-1 max-w-[600px]",
              l ? "bg-gray-100 shadow-sm" : "bg-white/90 shadow-sm",
            ),
            children: [
              v.map((a) =>
                e.jsx(
                  "span",
                  {
                    className: h(
                      "px-5 py-2.5 text-sm font-medium transition-colors cursor-default whitespace-nowrap",
                      t === a.to
                        ? "bg-[#131B2B] text-white rounded-l-full"
                        : "text-[#374151] hover:text-gray-900 rounded-full",
                    ),
                    children: a.label,
                  },
                  a.to,
                ),
              ),
              r.map((a) =>
                e.jsx(
                  "span",
                  {
                    className:
                      "px-5 py-2.5 text-sm font-medium text-[#374151] rounded-full cursor-default whitespace-nowrap",
                    children: a.label,
                  },
                  a.to,
                ),
              ),
            ],
          }),
          e.jsxs("div", {
            className: "hidden lg:flex items-center gap-3",
            children: [
              e.jsxs("div", {
                className: h(
                  "flex items-center rounded-full px-6 py-2 border transition-all duration-300 w-[170px]",
                  l ? "bg-gray-100 border-[#131B2B]" : "bg-transparent border-[#131B2B]",
                ),
                children: [
                  e.jsx(D, { className: "w-4 h-4 mr-2 text-[#131B2B]" }),
                  e.jsx("span", { className: "text-sm text-[#131B2B]", children: "AI 搜索" }),
                ],
              }),
              e.jsx("button", {
                className:
                  "w-8 h-8 rounded-full bg-[#131B2B] text-white flex items-center justify-center hover:bg-[#0D1219] transition-colors",
                children: e.jsx(V, { className: "w-4 h-4" }),
              }),
              e.jsx("span", { className: "text-sm font-medium text-[#131B2B]", children: "CN" }),
            ],
          }),
          e.jsxs("div", {
            className: "flex items-center gap-2 lg:hidden",
            children: [
              e.jsx(ee, {}),
              e.jsx(te, { items: v, groups: N, path: t, open: o, onOpenChange: n }),
            ],
          }),
        ],
      }),
    })
  );
}
const y = [
  {
    title: "公司",
    links: [
      { to: "/about", label: "关于我们" },
      { to: "/products", label: "产品与应用" },
      { to: "/rd", label: "研发与生产" },
      { to: "/careers", label: "职业发展" },
    ],
  },
  {
    title: "资源",
    links: [
      { to: "/news", label: "技术资讯" },
      { to: "/downloads", label: "资源下载" },
      { to: "/faq", label: "常见问题" },
    ],
  },
  {
    title: "法律",
    links: [
      { to: "/terms", label: "" },
      { to: "/privacy", label: "Privacy Statement" },
    ],
  },
];
function re() {
  const s = new Date().getFullYear(),
    t = y.length > 0;
  return e.jsx("footer", {
    className: "relative z-10 bg-[#131B2B]",
    children: e.jsxs("div", {
      className: "mx-auto w-full max-w-[1240px] px-6 py-12 lg:px-8",
      children: [
        t
          ? e.jsxs("div", {
              className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5",
              children: [
                e.jsx("div", {
                  className: "lg:col-span-2 flex items-start h-full pt-4",
                  children: e.jsx("div", {
                    className: "flex items-center gap-2",
                    children: e.jsx("img", {
                      src: "/AppUpload/Image/ca8375bebf1a4d6ab634a64e6dcdd68e.png",
                      alt: "FENCHEM泛成",
                      className: "h-[73px] w-auto brightness-0 invert",
                    }),
                  }),
                }),
                y.map((o) =>
                  e.jsxs(
                    "div",
                    {
                      children: [
                        e.jsx("p", {
                          className:
                            "text-xs font-semibold tracking-wider uppercase text-white mb-4",
                          children: o.title,
                        }),
                        e.jsx("ul", {
                          className: "space-y-2.5",
                          children: o.links.map((n) =>
                            e.jsx(
                              "li",
                              {
                                children: e.jsx(g, {
                                  to: p(n.to),
                                  viewTransition: !0,
                                  className:
                                    "text-sm text-white/70 hover:text-white transition-colors",
                                  children: n.label,
                                }),
                              },
                              n.to,
                            ),
                          ),
                        }),
                      ],
                    },
                    o.title,
                  ),
                ),
              ],
            })
          : e.jsx("p", { className: "text-lg font-bold text-white", children: j.name }),
        e.jsx("div", {
          className: "mt-10 pt-8 border-t border-white/20",
          children: e.jsxs("div", {
            className: "flex flex-col md:flex-row items-center justify-between gap-4",
            children: [
              e.jsx("div", {
                className: "flex items-center gap-4",
                children: e.jsxs("span", {
                  className: "text-xs text-white/50",
                  children: ["© ", s, " ", j.name, ". All rights reserved."],
                }),
              }),
              e.jsxs("div", {
                className: "flex items-center gap-4",
                children: [
                  e.jsx("a", {
                    href: "#",
                    className: "text-white/50 hover:text-white transition-colors",
                    "aria-label": "LinkedIn",
                    children: e.jsx("svg", {
                      className: "h-5 w-5",
                      fill: "currentColor",
                      viewBox: "0 0 24 24",
                      children: e.jsx("path", {
                        d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                      }),
                    }),
                  }),
                  e.jsx("a", {
                    href: "#",
                    className: "text-white/50 hover:text-white transition-colors",
                    "aria-label": "WeChat",
                    children: e.jsx("svg", {
                      className: "h-5 w-5",
                      fill: "currentColor",
                      viewBox: "0 0 24 24",
                      children: e.jsx("path", {
                        d: "M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.11.24-.245 0-.06-.024-.12-.04-.178l-.325-1.233a.492.492 0 01.177-.554C23.004 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z",
                      }),
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function le({ children: s }) {
  const t = R((a) => a.isAuthenticated()),
    [o, n] = c.useState(new Set()),
    r = c.useCallback(async () => {
      if (!t) {
        n(new Set());
        return;
      }
      const a = await $();
      n(new Set(a));
    }, [t]);
  c.useEffect(() => {
    r().catch(() => n(new Set()));
  }, [r]);
  const l = c.useCallback(
      async (a) =>
        o.has(a)
          ? (await J(a),
            n((x) => {
              const u = new Set(x);
              return (u.delete(a), u);
            }),
            !1)
          : (await K(a), n((x) => new Set(x).add(a)), !0),
      [o],
    ),
    i = c.useMemo(
      () => ({
        favoriteIds: o,
        isFavorited: (a) => o.has(a),
        toggleFavorite: l,
        reloadFavorites: r,
      }),
      [o, l, r],
    );
  return e.jsx(Z.Provider, { value: i, children: s });
}
function pe() {
  const { pathname: s } = k(),
    t = s === "/";
  return e.jsx(le, {
    children: e.jsxs("div", {
      className: "bg-background flex min-h-svh flex-col",
      children: [
        e.jsx(ne, { overlay: t }),
        e.jsx("main", { className: t ? "" : "pt-20", children: e.jsx(z, {}) }),
        e.jsx(re, {}),
      ],
    }),
  });
}
export { pe as PublicLayout };
