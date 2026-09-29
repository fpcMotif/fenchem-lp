import {
  j as g,
  au as kn,
  av as Ln,
  aw as Fn,
  ax as $n,
  X as Bn,
  a as Q,
  ay as Wn,
  az as Gn,
  aA as Hn,
  aB as Kn,
  r as m,
  Z as Vn,
  P as ee,
  a1 as le,
  q as Ze,
  ah as He,
  ai as Je,
  p as je,
  a8 as zn,
  o as E,
  a9 as Un,
  aC as Xn,
  ac as Yn,
  aa as qn,
  ad as Zn,
  ae as Jn,
  ab as Qn,
  aD as Et,
  m as eo,
  n as gt,
} from "./index-25pPz5MR.js";
import { u as to, c as Dt, a as no, I as oo, R as ro } from "./index-C6C9Fd6I.js";
import { u as so } from "./index-1rwslFp9.js";
function zs({ ...e }) {
  return g.jsx(kn, { "data-slot": "sheet", ...e });
}
function Us({ ...e }) {
  return g.jsx(Ln, { "data-slot": "sheet-trigger", ...e });
}
function io({ ...e }) {
  return g.jsx(Hn, { "data-slot": "sheet-portal", ...e });
}
function ao({ className: e, ...t }) {
  return g.jsx(Kn, {
    "data-slot": "sheet-overlay",
    className: Q(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
      e,
    ),
    ...t,
  });
}
function Xs({ className: e, children: t, side: n = "right", ...o }) {
  return g.jsxs(io, {
    children: [
      g.jsx(ao, {}),
      g.jsxs(Fn, {
        "data-slot": "sheet-content",
        className: Q(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          n === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          n === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          n === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          n === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          e,
        ),
        ...o,
        children: [
          t,
          g.jsxs($n, {
            className:
              "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
            children: [
              g.jsx(Bn, { className: "size-4" }),
              g.jsx("span", { className: "sr-only", children: "Close" }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Ys({ className: e, ...t }) {
  return g.jsx("div", {
    "data-slot": "sheet-header",
    className: Q("flex flex-col gap-1.5 p-4", e),
    ...t,
  });
}
function qs({ className: e, ...t }) {
  return g.jsx(Wn, {
    "data-slot": "sheet-title",
    className: Q("text-foreground font-semibold", e),
    ...t,
  });
}
function Zs({ className: e, ...t }) {
  return g.jsx(Gn, {
    "data-slot": "sheet-description",
    className: Q("text-muted-foreground text-sm", e),
    ...t,
  });
}
const co = ["top", "right", "bottom", "left"],
  re = Math.min,
  G = Math.max,
  Ee = Math.round,
  Pe = Math.floor,
  Y = (e) => ({ x: e, y: e }),
  lo = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Ue(e, t, n) {
  return G(e, re(t, n));
}
function Z(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function J(e) {
  return e.split("-")[0];
}
function me(e) {
  return e.split("-")[1];
}
function Qe(e) {
  return e === "x" ? "y" : "x";
}
function et(e) {
  return e === "y" ? "height" : "width";
}
function X(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function tt(e) {
  return Qe(X(e));
}
function uo(e, t, n) {
  n === void 0 && (n = !1);
  const o = me(e),
    r = tt(e),
    s = et(r);
  let i =
    r === "x" ? (o === (n ? "end" : "start") ? "right" : "left") : o === "start" ? "bottom" : "top";
  return (t.reference[s] > t.floating[s] && (i = De(i)), [i, De(i)]);
}
function fo(e) {
  const t = De(e);
  return [Xe(e), t, Xe(t)];
}
function Xe(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const wt = ["left", "right"],
  xt = ["right", "left"],
  po = ["top", "bottom"],
  mo = ["bottom", "top"];
function ho(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? xt : wt) : t ? wt : xt;
    case "left":
    case "right":
      return t ? po : mo;
    default:
      return [];
  }
}
function go(e, t, n, o) {
  const r = me(e);
  let s = ho(J(e), n === "start", o);
  return (r && ((s = s.map((i) => i + "-" + r)), t && (s = s.concat(s.map(Xe)))), s);
}
function De(e) {
  const t = J(e);
  return lo[t] + e.slice(t.length);
}
function wo(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function Ot(e) {
  return typeof e != "number" ? wo(e) : { top: e, right: e, bottom: e, left: e };
}
function Oe(e) {
  const { x: t, y: n, width: o, height: r } = e;
  return { width: o, height: r, top: n, left: t, right: t + o, bottom: n + r, x: t, y: n };
}
function vt(e, t, n) {
  let { reference: o, floating: r } = e;
  const s = X(t),
    i = tt(t),
    c = et(i),
    u = J(t),
    d = s === "y",
    l = o.x + o.width / 2 - r.width / 2,
    a = o.y + o.height / 2 - r.height / 2,
    p = o[c] / 2 - r[c] / 2;
  let f;
  switch (u) {
    case "top":
      f = { x: l, y: o.y - r.height };
      break;
    case "bottom":
      f = { x: l, y: o.y + o.height };
      break;
    case "right":
      f = { x: o.x + o.width, y: a };
      break;
    case "left":
      f = { x: o.x - r.width, y: a };
      break;
    default:
      f = { x: o.x, y: o.y };
  }
  switch (me(t)) {
    case "start":
      f[i] -= p * (n && d ? -1 : 1);
      break;
    case "end":
      f[i] += p * (n && d ? -1 : 1);
      break;
  }
  return f;
}
async function xo(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: o, y: r, platform: s, rects: i, elements: c, strategy: u } = e,
    {
      boundary: d = "clippingAncestors",
      rootBoundary: l = "viewport",
      elementContext: a = "floating",
      altBoundary: p = !1,
      padding: f = 0,
    } = Z(t, e),
    h = Ot(f),
    y = c[p ? (a === "floating" ? "reference" : "floating") : a],
    v = Oe(
      await s.getClippingRect({
        element:
          (n = await (s.isElement == null ? void 0 : s.isElement(y))) == null || n
            ? y
            : y.contextElement ||
              (await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(c.floating))),
        boundary: d,
        rootBoundary: l,
        strategy: u,
      }),
    ),
    R =
      a === "floating"
        ? { x: o, y: r, width: i.floating.width, height: i.floating.height }
        : i.reference,
    M = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(c.floating)),
    b = (await (s.isElement == null ? void 0 : s.isElement(M)))
      ? (await (s.getScale == null ? void 0 : s.getScale(M))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    S = Oe(
      s.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: c,
            rect: R,
            offsetParent: M,
            strategy: u,
          })
        : R,
    );
  return {
    top: (v.top - S.top + h.top) / b.y,
    bottom: (S.bottom - v.bottom + h.bottom) / b.y,
    left: (v.left - S.left + h.left) / b.x,
    right: (S.right - v.right + h.right) / b.x,
  };
}
const vo = 50,
  yo = async (e, t, n) => {
    const {
        placement: o = "bottom",
        strategy: r = "absolute",
        middleware: s = [],
        platform: i,
      } = n,
      c = i.detectOverflow ? i : { ...i, detectOverflow: xo },
      u = await (i.isRTL == null ? void 0 : i.isRTL(t));
    let d = await i.getElementRects({ reference: e, floating: t, strategy: r }),
      { x: l, y: a } = vt(d, o, u),
      p = o,
      f = 0;
    const h = {};
    for (let w = 0; w < s.length; w++) {
      const y = s[w];
      if (!y) continue;
      const { name: v, fn: R } = y,
        {
          x: M,
          y: b,
          data: S,
          reset: A,
        } = await R({
          x: l,
          y: a,
          initialPlacement: o,
          placement: p,
          strategy: r,
          middlewareData: h,
          rects: d,
          platform: c,
          elements: { reference: e, floating: t },
        });
      ((l = M ?? l),
        (a = b ?? a),
        (h[v] = { ...h[v], ...S }),
        A &&
          f < vo &&
          (f++,
          typeof A == "object" &&
            (A.placement && (p = A.placement),
            A.rects &&
              (d =
                A.rects === !0
                  ? await i.getElementRects({ reference: e, floating: t, strategy: r })
                  : A.rects),
            ({ x: l, y: a } = vt(d, p, u))),
          (w = -1)));
    }
    return { x: l, y: a, placement: p, strategy: r, middlewareData: h };
  },
  bo = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const { x: n, y: o, placement: r, rects: s, platform: i, elements: c, middlewareData: u } = t,
        { element: d, padding: l = 0 } = Z(e, t) || {};
      if (d == null) return {};
      const a = Ot(l),
        p = { x: n, y: o },
        f = tt(r),
        h = et(f),
        w = await i.getDimensions(d),
        y = f === "y",
        v = y ? "top" : "left",
        R = y ? "bottom" : "right",
        M = y ? "clientHeight" : "clientWidth",
        b = s.reference[h] + s.reference[f] - p[f] - s.floating[h],
        S = p[f] - s.reference[f],
        A = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(d));
      let P = A ? A[M] : 0;
      (!P || !(await (i.isElement == null ? void 0 : i.isElement(A)))) &&
        (P = c.floating[M] || s.floating[h]);
      const j = b / 2 - S / 2,
        k = P / 2 - w[h] / 2 - 1,
        D = re(a[v], k),
        F = re(a[R], k),
        I = D,
        O = P - w[h] - F,
        _ = P / 2 - w[h] / 2 + j,
        $ = Ue(I, _, O),
        T =
          !u.arrow &&
          me(r) != null &&
          _ !== $ &&
          s.reference[h] / 2 - (_ < I ? D : F) - w[h] / 2 < 0,
        N = T ? (_ < I ? _ - I : _ - O) : 0;
      return {
        [f]: p[f] + N,
        data: { [f]: $, centerOffset: _ - $ - N, ...(T && { alignmentOffset: N }) },
        reset: T,
      };
    },
  }),
  Mo = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, o;
          const {
              placement: r,
              middlewareData: s,
              rects: i,
              initialPlacement: c,
              platform: u,
              elements: d,
            } = t,
            {
              mainAxis: l = !0,
              crossAxis: a = !0,
              fallbackPlacements: p,
              fallbackStrategy: f = "bestFit",
              fallbackAxisSideDirection: h = "none",
              flipAlignment: w = !0,
              ...y
            } = Z(e, t);
          if ((n = s.arrow) != null && n.alignmentOffset) return {};
          const v = J(r),
            R = X(c),
            M = J(c) === c,
            b = await (u.isRTL == null ? void 0 : u.isRTL(d.floating)),
            S = p || (M || !w ? [De(c)] : fo(c)),
            A = h !== "none";
          !p && A && S.push(...go(c, w, h, b));
          const P = [c, ...S],
            j = await u.detectOverflow(t, y),
            k = [];
          let D = ((o = s.flip) == null ? void 0 : o.overflows) || [];
          if ((l && k.push(j[v]), a)) {
            const _ = uo(r, i, b);
            k.push(j[_[0]], j[_[1]]);
          }
          if (((D = [...D, { placement: r, overflows: k }]), !k.every((_) => _ <= 0))) {
            var F, I;
            const _ = (((F = s.flip) == null ? void 0 : F.index) || 0) + 1,
              $ = P[_];
            if (
              $ &&
              (!(a === "alignment" ? R !== X($) : !1) ||
                D.every((C) => (X(C.placement) === R ? C.overflows[0] > 0 : !0)))
            )
              return { data: { index: _, overflows: D }, reset: { placement: $ } };
            let T =
              (I = D.filter((N) => N.overflows[0] <= 0).sort(
                (N, C) => N.overflows[1] - C.overflows[1],
              )[0]) == null
                ? void 0
                : I.placement;
            if (!T)
              switch (f) {
                case "bestFit": {
                  var O;
                  const N =
                    (O = D.filter((C) => {
                      if (A) {
                        const x = X(C.placement);
                        return x === R || x === "y";
                      }
                      return !0;
                    })
                      .map((C) => [
                        C.placement,
                        C.overflows.filter((x) => x > 0).reduce((x, L) => x + L, 0),
                      ])
                      .sort((C, x) => C[1] - x[1])[0]) == null
                      ? void 0
                      : O[0];
                  N && (T = N);
                  break;
                }
                case "initialPlacement":
                  T = c;
                  break;
              }
            if (r !== T) return { reset: { placement: T } };
          }
          return {};
        },
      }
    );
  };
function yt(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function bt(e) {
  return co.some((t) => e[t] >= 0);
}
const Co = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "hide",
        options: e,
        async fn(t) {
          const { rects: n, platform: o } = t,
            { strategy: r = "referenceHidden", ...s } = Z(e, t);
          switch (r) {
            case "referenceHidden": {
              const i = await o.detectOverflow(t, { ...s, elementContext: "reference" }),
                c = yt(i, n.reference);
              return { data: { referenceHiddenOffsets: c, referenceHidden: bt(c) } };
            }
            case "escaped": {
              const i = await o.detectOverflow(t, { ...s, altBoundary: !0 }),
                c = yt(i, n.floating);
              return { data: { escapedOffsets: c, escaped: bt(c) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  Tt = new Set(["left", "top"]);
async function Ro(e, t) {
  const { placement: n, platform: o, elements: r } = e,
    s = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)),
    i = J(n),
    c = me(n),
    u = X(n) === "y",
    d = Tt.has(i) ? -1 : 1,
    l = s && u ? -1 : 1,
    a = Z(t, e);
  let {
    mainAxis: p,
    crossAxis: f,
    alignmentAxis: h,
  } = typeof a == "number"
    ? { mainAxis: a, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: a.mainAxis || 0, crossAxis: a.crossAxis || 0, alignmentAxis: a.alignmentAxis };
  return (
    c && typeof h == "number" && (f = c === "end" ? h * -1 : h),
    u ? { x: f * l, y: p * d } : { x: p * d, y: f * l }
  );
}
const Ao = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, o;
          const { x: r, y: s, placement: i, middlewareData: c } = t,
            u = await Ro(t, e);
          return i === ((n = c.offset) == null ? void 0 : n.placement) &&
            (o = c.arrow) != null &&
            o.alignmentOffset
            ? {}
            : { x: r + u.x, y: s + u.y, data: { ...u, placement: i } };
        },
      }
    );
  },
  So = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: o, placement: r, platform: s } = t,
            {
              mainAxis: i = !0,
              crossAxis: c = !1,
              limiter: u = {
                fn: (v) => {
                  let { x: R, y: M } = v;
                  return { x: R, y: M };
                },
              },
              ...d
            } = Z(e, t),
            l = { x: n, y: o },
            a = await s.detectOverflow(t, d),
            p = X(J(r)),
            f = Qe(p);
          let h = l[f],
            w = l[p];
          if (i) {
            const v = f === "y" ? "top" : "left",
              R = f === "y" ? "bottom" : "right",
              M = h + a[v],
              b = h - a[R];
            h = Ue(M, h, b);
          }
          if (c) {
            const v = p === "y" ? "top" : "left",
              R = p === "y" ? "bottom" : "right",
              M = w + a[v],
              b = w - a[R];
            w = Ue(M, w, b);
          }
          const y = u.fn({ ...t, [f]: h, [p]: w });
          return { ...y, data: { x: y.x - n, y: y.y - o, enabled: { [f]: i, [p]: c } } };
        },
      }
    );
  },
  Po = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: o, placement: r, rects: s, middlewareData: i } = t,
            { offset: c = 0, mainAxis: u = !0, crossAxis: d = !0 } = Z(e, t),
            l = { x: n, y: o },
            a = X(r),
            p = Qe(a);
          let f = l[p],
            h = l[a];
          const w = Z(c, t),
            y =
              typeof w == "number"
                ? { mainAxis: w, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...w };
          if (u) {
            const M = p === "y" ? "height" : "width",
              b = s.reference[p] - s.floating[M] + y.mainAxis,
              S = s.reference[p] + s.reference[M] - y.mainAxis;
            f < b ? (f = b) : f > S && (f = S);
          }
          if (d) {
            var v, R;
            const M = p === "y" ? "width" : "height",
              b = Tt.has(J(r)),
              S =
                s.reference[a] -
                s.floating[M] +
                ((b && ((v = i.offset) == null ? void 0 : v[a])) || 0) +
                (b ? 0 : y.crossAxis),
              A =
                s.reference[a] +
                s.reference[M] +
                (b ? 0 : ((R = i.offset) == null ? void 0 : R[a]) || 0) -
                (b ? y.crossAxis : 0);
            h < S ? (h = S) : h > A && (h = A);
          }
          return { [p]: f, [a]: h };
        },
      }
    );
  },
  _o = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          var n, o;
          const { placement: r, rects: s, platform: i, elements: c } = t,
            { apply: u = () => {}, ...d } = Z(e, t),
            l = await i.detectOverflow(t, d),
            a = J(r),
            p = me(r),
            f = X(r) === "y",
            { width: h, height: w } = s.floating;
          let y, v;
          a === "top" || a === "bottom"
            ? ((y = a),
              (v =
                p === ((await (i.isRTL == null ? void 0 : i.isRTL(c.floating))) ? "start" : "end")
                  ? "left"
                  : "right"))
            : ((v = a), (y = p === "end" ? "top" : "bottom"));
          const R = w - l.top - l.bottom,
            M = h - l.left - l.right,
            b = re(w - l[y], R),
            S = re(h - l[v], M),
            A = !t.middlewareData.shift;
          let P = b,
            j = S;
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (j = M),
            (o = t.middlewareData.shift) != null && o.enabled.y && (P = R),
            A && !p)
          ) {
            const D = G(l.left, 0),
              F = G(l.right, 0),
              I = G(l.top, 0),
              O = G(l.bottom, 0);
            f
              ? (j = h - 2 * (D !== 0 || F !== 0 ? D + F : G(l.left, l.right)))
              : (P = w - 2 * (I !== 0 || O !== 0 ? I + O : G(l.top, l.bottom)));
          }
          await u({ ...t, availableWidth: j, availableHeight: P });
          const k = await i.getDimensions(c.floating);
          return h !== k.width || w !== k.height ? { reset: { rects: !0 } } : {};
        },
      }
    );
  };
function ke() {
  return typeof window < "u";
}
function he(e) {
  return Nt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function H(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function q(e) {
  var t;
  return (t = (Nt(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function Nt(e) {
  return ke() ? e instanceof Node || e instanceof H(e).Node : !1;
}
function V(e) {
  return ke() ? e instanceof Element || e instanceof H(e).Element : !1;
}
function te(e) {
  return ke() ? e instanceof HTMLElement || e instanceof H(e).HTMLElement : !1;
}
function Mt(e) {
  return !ke() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof H(e).ShadowRoot;
}
function Me(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: r } = z(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && r !== "inline" && r !== "contents";
}
function Eo(e) {
  return /^(table|td|th)$/.test(he(e));
}
function Le(e) {
  try {
    if (e.matches(":popover-open")) return !0;
  } catch {}
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
const Do = /transform|translate|scale|rotate|perspective|filter/,
  Oo = /paint|layout|strict|content/,
  ae = (e) => !!e && e !== "none";
let Ke;
function nt(e) {
  const t = V(e) ? z(e) : e;
  return (
    ae(t.transform) ||
    ae(t.translate) ||
    ae(t.scale) ||
    ae(t.rotate) ||
    ae(t.perspective) ||
    (!ot() && (ae(t.backdropFilter) || ae(t.filter))) ||
    Do.test(t.willChange || "") ||
    Oo.test(t.contain || "")
  );
}
function To(e) {
  let t = se(e);
  for (; te(t) && !pe(t); ) {
    if (nt(t)) return t;
    if (Le(t)) return null;
    t = se(t);
  }
  return null;
}
function ot() {
  return (
    Ke == null &&
      (Ke = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")),
    Ke
  );
}
function pe(e) {
  return /^(html|body|#document)$/.test(he(e));
}
function z(e) {
  return H(e).getComputedStyle(e);
}
function Fe(e) {
  return V(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function se(e) {
  if (he(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (Mt(e) && e.host) || q(e);
  return Mt(t) ? t.host : t;
}
function It(e) {
  const t = se(e);
  return pe(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : te(t) && Me(t) ? t : It(t);
}
function ve(e, t, n) {
  var o;
  (t === void 0 && (t = []), n === void 0 && (n = !0));
  const r = It(e),
    s = r === ((o = e.ownerDocument) == null ? void 0 : o.body),
    i = H(r);
  if (s) {
    const c = Ye(i);
    return t.concat(i, i.visualViewport || [], Me(r) ? r : [], c && n ? ve(c) : []);
  } else return t.concat(r, ve(r, [], n));
}
function Ye(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function jt(e) {
  const t = z(e);
  let n = parseFloat(t.width) || 0,
    o = parseFloat(t.height) || 0;
  const r = te(e),
    s = r ? e.offsetWidth : n,
    i = r ? e.offsetHeight : o,
    c = Ee(n) !== s || Ee(o) !== i;
  return (c && ((n = s), (o = i)), { width: n, height: o, $: c });
}
function rt(e) {
  return V(e) ? e : e.contextElement;
}
function fe(e) {
  const t = rt(e);
  if (!te(t)) return Y(1);
  const n = t.getBoundingClientRect(),
    { width: o, height: r, $: s } = jt(t);
  let i = (s ? Ee(n.width) : n.width) / o,
    c = (s ? Ee(n.height) : n.height) / r;
  return (
    (!i || !Number.isFinite(i)) && (i = 1), (!c || !Number.isFinite(c)) && (c = 1), { x: i, y: c }
  );
}
const No = Y(0);
function kt(e) {
  const t = H(e);
  return !ot() || !t.visualViewport
    ? No
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function Io(e, t, n) {
  return (t === void 0 && (t = !1), !n || (t && n !== H(e)) ? !1 : t);
}
function ce(e, t, n, o) {
  (t === void 0 && (t = !1), n === void 0 && (n = !1));
  const r = e.getBoundingClientRect(),
    s = rt(e);
  let i = Y(1);
  t && (o ? V(o) && (i = fe(o)) : (i = fe(e)));
  const c = Io(s, n, o) ? kt(s) : Y(0);
  let u = (r.left + c.x) / i.x,
    d = (r.top + c.y) / i.y,
    l = r.width / i.x,
    a = r.height / i.y;
  if (s) {
    const p = H(s),
      f = o && V(o) ? H(o) : o;
    let h = p,
      w = Ye(h);
    for (; w && o && f !== h; ) {
      const y = fe(w),
        v = w.getBoundingClientRect(),
        R = z(w),
        M = v.left + (w.clientLeft + parseFloat(R.paddingLeft)) * y.x,
        b = v.top + (w.clientTop + parseFloat(R.paddingTop)) * y.y;
      ((u *= y.x), (d *= y.y), (l *= y.x), (a *= y.y), (u += M), (d += b), (h = H(w)), (w = Ye(h)));
    }
  }
  return Oe({ width: l, height: a, x: u, y: d });
}
function $e(e, t) {
  const n = Fe(e).scrollLeft;
  return t ? t.left + n : ce(q(e)).left + n;
}
function Lt(e, t) {
  const n = e.getBoundingClientRect(),
    o = n.left + t.scrollLeft - $e(e, n),
    r = n.top + t.scrollTop;
  return { x: o, y: r };
}
function jo(e) {
  let { elements: t, rect: n, offsetParent: o, strategy: r } = e;
  const s = r === "fixed",
    i = q(o),
    c = t ? Le(t.floating) : !1;
  if (o === i || (c && s)) return n;
  let u = { scrollLeft: 0, scrollTop: 0 },
    d = Y(1);
  const l = Y(0),
    a = te(o);
  if ((a || (!a && !s)) && ((he(o) !== "body" || Me(i)) && (u = Fe(o)), a)) {
    const f = ce(o);
    ((d = fe(o)), (l.x = f.x + o.clientLeft), (l.y = f.y + o.clientTop));
  }
  const p = i && !a && !s ? Lt(i, u) : Y(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - u.scrollLeft * d.x + l.x + p.x,
    y: n.y * d.y - u.scrollTop * d.y + l.y + p.y,
  };
}
function ko(e) {
  return Array.from(e.getClientRects());
}
function Lo(e) {
  const t = q(e),
    n = Fe(e),
    o = e.ownerDocument.body,
    r = G(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth),
    s = G(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let i = -n.scrollLeft + $e(e);
  const c = -n.scrollTop;
  return (
    z(o).direction === "rtl" && (i += G(t.clientWidth, o.clientWidth) - r),
    { width: r, height: s, x: i, y: c }
  );
}
const Ct = 25;
function Fo(e, t) {
  const n = H(e),
    o = q(e),
    r = n.visualViewport;
  let s = o.clientWidth,
    i = o.clientHeight,
    c = 0,
    u = 0;
  if (r) {
    ((s = r.width), (i = r.height));
    const l = ot();
    (!l || (l && t === "fixed")) && ((c = r.offsetLeft), (u = r.offsetTop));
  }
  const d = $e(o);
  if (d <= 0) {
    const l = o.ownerDocument,
      a = l.body,
      p = getComputedStyle(a),
      f =
        (l.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight)) ||
        0,
      h = Math.abs(o.clientWidth - a.clientWidth - f);
    h <= Ct && (s -= h);
  } else d <= Ct && (s += d);
  return { width: s, height: i, x: c, y: u };
}
function $o(e, t) {
  const n = ce(e, !0, t === "fixed"),
    o = n.top + e.clientTop,
    r = n.left + e.clientLeft,
    s = te(e) ? fe(e) : Y(1),
    i = e.clientWidth * s.x,
    c = e.clientHeight * s.y,
    u = r * s.x,
    d = o * s.y;
  return { width: i, height: c, x: u, y: d };
}
function Rt(e, t, n) {
  let o;
  if (t === "viewport") o = Fo(e, n);
  else if (t === "document") o = Lo(q(e));
  else if (V(t)) o = $o(t, n);
  else {
    const r = kt(e);
    o = { x: t.x - r.x, y: t.y - r.y, width: t.width, height: t.height };
  }
  return Oe(o);
}
function Ft(e, t) {
  const n = se(e);
  return n === t || !V(n) || pe(n) ? !1 : z(n).position === "fixed" || Ft(n, t);
}
function Bo(e, t) {
  const n = t.get(e);
  if (n) return n;
  let o = ve(e, [], !1).filter((c) => V(c) && he(c) !== "body"),
    r = null;
  const s = z(e).position === "fixed";
  let i = s ? se(e) : e;
  for (; V(i) && !pe(i); ) {
    const c = z(i),
      u = nt(i);
    (!u && c.position === "fixed" && (r = null),
      (
        s
          ? !u && !r
          : (!u &&
              c.position === "static" &&
              !!r &&
              (r.position === "absolute" || r.position === "fixed")) ||
            (Me(i) && !u && Ft(e, i))
      )
        ? (o = o.filter((l) => l !== i))
        : (r = c),
      (i = se(i)));
  }
  return (t.set(e, o), o);
}
function Wo(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: r } = e;
  const i = [...(n === "clippingAncestors" ? (Le(t) ? [] : Bo(t, this._c)) : [].concat(n)), o],
    c = Rt(t, i[0], r);
  let u = c.top,
    d = c.right,
    l = c.bottom,
    a = c.left;
  for (let p = 1; p < i.length; p++) {
    const f = Rt(t, i[p], r);
    ((u = G(f.top, u)), (d = re(f.right, d)), (l = re(f.bottom, l)), (a = G(f.left, a)));
  }
  return { width: d - a, height: l - u, x: a, y: u };
}
function Go(e) {
  const { width: t, height: n } = jt(e);
  return { width: t, height: n };
}
function Ho(e, t, n) {
  const o = te(t),
    r = q(t),
    s = n === "fixed",
    i = ce(e, !0, s, t);
  let c = { scrollLeft: 0, scrollTop: 0 };
  const u = Y(0);
  function d() {
    u.x = $e(r);
  }
  if (o || (!o && !s))
    if (((he(t) !== "body" || Me(r)) && (c = Fe(t)), o)) {
      const f = ce(t, !0, s, t);
      ((u.x = f.x + t.clientLeft), (u.y = f.y + t.clientTop));
    } else r && d();
  s && !o && r && d();
  const l = r && !o && !s ? Lt(r, c) : Y(0),
    a = i.left + c.scrollLeft - u.x - l.x,
    p = i.top + c.scrollTop - u.y - l.y;
  return { x: a, y: p, width: i.width, height: i.height };
}
function Ve(e) {
  return z(e).position === "static";
}
function At(e, t) {
  if (!te(e) || z(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return (q(e) === n && (n = n.ownerDocument.body), n);
}
function $t(e, t) {
  const n = H(e);
  if (Le(e)) return n;
  if (!te(e)) {
    let r = se(e);
    for (; r && !pe(r); ) {
      if (V(r) && !Ve(r)) return r;
      r = se(r);
    }
    return n;
  }
  let o = At(e, t);
  for (; o && Eo(o) && Ve(o); ) o = At(o, t);
  return o && pe(o) && Ve(o) && !nt(o) ? n : o || To(e) || n;
}
const Ko = async function (e) {
  const t = this.getOffsetParent || $t,
    n = this.getDimensions,
    o = await n(e.floating);
  return {
    reference: Ho(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: o.width, height: o.height },
  };
};
function Vo(e) {
  return z(e).direction === "rtl";
}
const zo = {
  convertOffsetParentRelativeRectToViewportRelativeRect: jo,
  getDocumentElement: q,
  getClippingRect: Wo,
  getOffsetParent: $t,
  getElementRects: Ko,
  getClientRects: ko,
  getDimensions: Go,
  getScale: fe,
  isElement: V,
  isRTL: Vo,
};
function Bt(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Uo(e, t) {
  let n = null,
    o;
  const r = q(e);
  function s() {
    var c;
    (clearTimeout(o), (c = n) == null || c.disconnect(), (n = null));
  }
  function i(c, u) {
    (c === void 0 && (c = !1), u === void 0 && (u = 1), s());
    const d = e.getBoundingClientRect(),
      { left: l, top: a, width: p, height: f } = d;
    if ((c || t(), !p || !f)) return;
    const h = Pe(a),
      w = Pe(r.clientWidth - (l + p)),
      y = Pe(r.clientHeight - (a + f)),
      v = Pe(l),
      M = {
        rootMargin: -h + "px " + -w + "px " + -y + "px " + -v + "px",
        threshold: G(0, re(1, u)) || 1,
      };
    let b = !0;
    function S(A) {
      const P = A[0].intersectionRatio;
      if (P !== u) {
        if (!b) return i();
        P
          ? i(!1, P)
          : (o = setTimeout(() => {
              i(!1, 1e-7);
            }, 1e3));
      }
      (P === 1 && !Bt(d, e.getBoundingClientRect()) && i(), (b = !1));
    }
    try {
      n = new IntersectionObserver(S, { ...M, root: r.ownerDocument });
    } catch {
      n = new IntersectionObserver(S, M);
    }
    n.observe(e);
  }
  return (i(!0), s);
}
function Xo(e, t, n, o) {
  o === void 0 && (o = {});
  const {
      ancestorScroll: r = !0,
      ancestorResize: s = !0,
      elementResize: i = typeof ResizeObserver == "function",
      layoutShift: c = typeof IntersectionObserver == "function",
      animationFrame: u = !1,
    } = o,
    d = rt(e),
    l = r || s ? [...(d ? ve(d) : []), ...(t ? ve(t) : [])] : [];
  l.forEach((v) => {
    (r && v.addEventListener("scroll", n, { passive: !0 }), s && v.addEventListener("resize", n));
  });
  const a = d && c ? Uo(d, n) : null;
  let p = -1,
    f = null;
  i &&
    ((f = new ResizeObserver((v) => {
      let [R] = v;
      (R &&
        R.target === d &&
        f &&
        t &&
        (f.unobserve(t),
        cancelAnimationFrame(p),
        (p = requestAnimationFrame(() => {
          var M;
          (M = f) == null || M.observe(t);
        }))),
        n());
    })),
    d && !u && f.observe(d),
    t && f.observe(t));
  let h,
    w = u ? ce(e) : null;
  u && y();
  function y() {
    const v = ce(e);
    (w && !Bt(w, v) && n(), (w = v), (h = requestAnimationFrame(y)));
  }
  return (
    n(),
    () => {
      var v;
      (l.forEach((R) => {
        (r && R.removeEventListener("scroll", n), s && R.removeEventListener("resize", n));
      }),
        a?.(),
        (v = f) == null || v.disconnect(),
        (f = null),
        u && cancelAnimationFrame(h));
    }
  );
}
const Yo = Ao,
  qo = So,
  Zo = Mo,
  Jo = _o,
  Qo = Co,
  St = bo,
  er = Po,
  tr = (e, t, n) => {
    const o = new Map(),
      r = { platform: zo, ...n },
      s = { ...r.platform, _c: o };
    return yo(e, t, { ...r, platform: s });
  };
var nr = typeof document < "u",
  or = function () {},
  _e = nr ? m.useLayoutEffect : or;
function Te(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, o, r;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (o = n; o-- !== 0; ) if (!Te(e[o], t[o])) return !1;
      return !0;
    }
    if (((r = Object.keys(e)), (n = r.length), n !== Object.keys(t).length)) return !1;
    for (o = n; o-- !== 0; ) if (!{}.hasOwnProperty.call(t, r[o])) return !1;
    for (o = n; o-- !== 0; ) {
      const s = r[o];
      if (!(s === "_owner" && e.$$typeof) && !Te(e[s], t[s])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Wt(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Pt(e, t) {
  const n = Wt(e);
  return Math.round(t * n) / n;
}
function ze(e) {
  const t = m.useRef(e);
  return (
    _e(() => {
      t.current = e;
    }),
    t
  );
}
function rr(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: n = "absolute",
      middleware: o = [],
      platform: r,
      elements: { reference: s, floating: i } = {},
      transform: c = !0,
      whileElementsMounted: u,
      open: d,
    } = e,
    [l, a] = m.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [p, f] = m.useState(o);
  Te(p, o) || f(o);
  const [h, w] = m.useState(null),
    [y, v] = m.useState(null),
    R = m.useCallback((C) => {
      C !== A.current && ((A.current = C), w(C));
    }, []),
    M = m.useCallback((C) => {
      C !== P.current && ((P.current = C), v(C));
    }, []),
    b = s || h,
    S = i || y,
    A = m.useRef(null),
    P = m.useRef(null),
    j = m.useRef(l),
    k = u != null,
    D = ze(u),
    F = ze(r),
    I = ze(d),
    O = m.useCallback(() => {
      if (!A.current || !P.current) return;
      const C = { placement: t, strategy: n, middleware: p };
      (F.current && (C.platform = F.current),
        tr(A.current, P.current, C).then((x) => {
          const L = { ...x, isPositioned: I.current !== !1 };
          _.current &&
            !Te(j.current, L) &&
            ((j.current = L),
            Vn.flushSync(() => {
              a(L);
            }));
        }));
    }, [p, t, n, F, I]);
  _e(() => {
    d === !1 &&
      j.current.isPositioned &&
      ((j.current.isPositioned = !1), a((C) => ({ ...C, isPositioned: !1 })));
  }, [d]);
  const _ = m.useRef(!1);
  (_e(
    () => (
      (_.current = !0),
      () => {
        _.current = !1;
      }
    ),
    [],
  ),
    _e(() => {
      if ((b && (A.current = b), S && (P.current = S), b && S)) {
        if (D.current) return D.current(b, S, O);
        O();
      }
    }, [b, S, O, D, k]));
  const $ = m.useMemo(
      () => ({ reference: A, floating: P, setReference: R, setFloating: M }),
      [R, M],
    ),
    T = m.useMemo(() => ({ reference: b, floating: S }), [b, S]),
    N = m.useMemo(() => {
      const C = { position: n, left: 0, top: 0 };
      if (!T.floating) return C;
      const x = Pt(T.floating, l.x),
        L = Pt(T.floating, l.y);
      return c
        ? {
            ...C,
            transform: "translate(" + x + "px, " + L + "px)",
            ...(Wt(T.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: n, left: x, top: L };
    }, [n, c, T.floating, l.x, l.y]);
  return m.useMemo(
    () => ({ ...l, update: O, refs: $, elements: T, floatingStyles: N }),
    [l, O, $, T, N],
  );
}
const sr = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(n) {
        const { element: o, padding: r } = typeof e == "function" ? e(n) : e;
        return o && t(o)
          ? o.current != null
            ? St({ element: o.current, padding: r }).fn(n)
            : {}
          : o
            ? St({ element: o, padding: r }).fn(n)
            : {};
      },
    };
  },
  ir = (e, t) => {
    const n = Yo(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  ar = (e, t) => {
    const n = qo(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  cr = (e, t) => ({ fn: er(e).fn, options: [e, t] }),
  lr = (e, t) => {
    const n = Zo(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  ur = (e, t) => {
    const n = Jo(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  dr = (e, t) => {
    const n = Qo(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  },
  fr = (e, t) => {
    const n = sr(e);
    return { name: n.name, fn: n.fn, options: [e, t] };
  };
var pr = "Arrow",
  Gt = m.forwardRef((e, t) => {
    const { children: n, width: o = 10, height: r = 5, ...s } = e;
    return g.jsx(ee.svg, {
      ...s,
      ref: t,
      width: o,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : g.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
Gt.displayName = pr;
var mr = Gt,
  st = "Popper",
  [Ht, Kt] = Ze(st),
  [hr, Vt] = Ht(st),
  zt = (e) => {
    const { __scopePopper: t, children: n } = e,
      [o, r] = m.useState(null),
      [s, i] = m.useState(void 0);
    return g.jsx(hr, {
      scope: t,
      anchor: o,
      onAnchorChange: r,
      placementState: s,
      setPlacementState: i,
      children: n,
    });
  };
zt.displayName = st;
var Ut = "PopperAnchor",
  Xt = m.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: o, ...r } = e,
      s = Vt(Ut, n),
      i = m.useRef(null),
      c = s.onAnchorChange,
      u = m.useCallback(
        (h) => {
          ((i.current = h), h && c(h));
        },
        [c],
      ),
      d = le(t, u),
      l = m.useRef(null);
    m.useEffect(() => {
      if (!o) return;
      const h = l.current;
      ((l.current = o.current), h !== l.current && c(l.current));
    });
    const a = s.placementState && at(s.placementState),
      p = a?.[0],
      f = a?.[1];
    return o
      ? null
      : g.jsx(ee.div, { "data-radix-popper-side": p, "data-radix-popper-align": f, ...r, ref: d });
  });
Xt.displayName = Ut;
var it = "PopperContent",
  [gr, wr] = Ht(it),
  Yt = m.forwardRef((e, t) => {
    const {
        __scopePopper: n,
        side: o = "bottom",
        sideOffset: r = 0,
        align: s = "center",
        alignOffset: i = 0,
        arrowPadding: c = 0,
        avoidCollisions: u = !0,
        collisionBoundary: d = [],
        collisionPadding: l = 0,
        sticky: a = "partial",
        hideWhenDetached: p = !1,
        updatePositionStrategy: f = "optimized",
        onPlaced: h,
        ...w
      } = e,
      y = Vt(it, n),
      [v, R] = m.useState(null),
      M = le(t, (oe) => R(oe)),
      [b, S] = m.useState(null),
      A = so(b),
      P = A?.width ?? 0,
      j = A?.height ?? 0,
      k = o + (s !== "center" ? "-" + s : ""),
      D = typeof l == "number" ? l : { top: 0, right: 0, bottom: 0, left: 0, ...l },
      F = Array.isArray(d) ? d : [d],
      I = F.length > 0,
      O = { padding: D, boundary: F.filter(vr), altBoundary: I },
      {
        refs: _,
        floatingStyles: $,
        placement: T,
        isPositioned: N,
        middlewareData: C,
      } = rr({
        strategy: "fixed",
        placement: k,
        whileElementsMounted: (...oe) => Xo(...oe, { animationFrame: f === "always" }),
        elements: { reference: y.anchor },
        middleware: [
          ir({ mainAxis: r + j, alignmentAxis: i }),
          u && ar({ mainAxis: !0, crossAxis: !1, limiter: a === "partial" ? cr() : void 0, ...O }),
          u && lr({ ...O }),
          ur({
            ...O,
            apply: ({ elements: oe, rects: ht, availableWidth: Tn, availableHeight: Nn }) => {
              const { width: In, height: jn } = ht.reference,
                Se = oe.floating.style;
              (Se.setProperty("--radix-popper-available-width", `${Tn}px`),
                Se.setProperty("--radix-popper-available-height", `${Nn}px`),
                Se.setProperty("--radix-popper-anchor-width", `${In}px`),
                Se.setProperty("--radix-popper-anchor-height", `${jn}px`));
            },
          }),
          b && fr({ element: b, padding: c }),
          yr({ arrowWidth: P, arrowHeight: j }),
          p && dr({ strategy: "referenceHidden", ...O, boundary: I ? O.boundary : void 0 }),
        ],
      }),
      x = y.setPlacementState;
    He(
      () => (
        x(T),
        () => {
          x(void 0);
        }
      ),
      [T, x],
    );
    const [L, U] = at(T),
      ne = Je(h);
    He(() => {
      N && ne?.();
    }, [N, ne]);
    const ge = C.arrow?.x,
      we = C.arrow?.y,
      Ae = C.arrow?.centerOffset !== 0,
      [ie, B] = m.useState();
    return (
      He(() => {
        v && B(window.getComputedStyle(v).zIndex);
      }, [v]),
      g.jsx("div", {
        ref: _.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...$,
          transform: N ? $.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: ie,
          "--radix-popper-transform-origin": [C.transformOrigin?.x, C.transformOrigin?.y].join(" "),
          ...(C.hide?.referenceHidden && { visibility: "hidden", pointerEvents: "none" }),
        },
        dir: e.dir,
        children: g.jsx(gr, {
          scope: n,
          placedSide: L,
          placedAlign: U,
          onArrowChange: S,
          arrowX: ge,
          arrowY: we,
          shouldHideArrow: Ae,
          children: g.jsx(ee.div, {
            "data-side": L,
            "data-align": U,
            ...w,
            ref: M,
            style: { ...w.style, animation: N ? void 0 : "none" },
          }),
        }),
      })
    );
  });
Yt.displayName = it;
var qt = "PopperArrow",
  xr = { top: "bottom", right: "left", bottom: "top", left: "right" },
  Zt = m.forwardRef(function (t, n) {
    const { __scopePopper: o, ...r } = t,
      s = wr(qt, o),
      i = xr[s.placedSide];
    return g.jsx("span", {
      ref: s.onArrowChange,
      style: {
        position: "absolute",
        left: s.arrowX,
        top: s.arrowY,
        [i]: 0,
        transformOrigin: { top: "", right: "0 0", bottom: "center 0", left: "100% 0" }[
          s.placedSide
        ],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[s.placedSide],
        visibility: s.shouldHideArrow ? "hidden" : void 0,
      },
      children: g.jsx(mr, { ...r, ref: n, style: { ...r.style, display: "block" } }),
    });
  });
Zt.displayName = qt;
function vr(e) {
  return e !== null;
}
var yr = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: o, middlewareData: r } = t,
      i = r.arrow?.centerOffset !== 0,
      c = i ? 0 : e.arrowWidth,
      u = i ? 0 : e.arrowHeight,
      [d, l] = at(n),
      a = { start: "0%", center: "50%", end: "100%" }[l],
      p = (r.arrow?.x ?? 0) + c / 2,
      f = (r.arrow?.y ?? 0) + u / 2;
    let h = "",
      w = "";
    return (
      d === "bottom"
        ? ((h = i ? a : `${p}px`), (w = `${-u}px`))
        : d === "top"
          ? ((h = i ? a : `${p}px`), (w = `${o.floating.height + u}px`))
          : d === "right"
            ? ((h = `${-u}px`), (w = i ? a : `${f}px`))
            : d === "left" && ((h = `${o.floating.width + u}px`), (w = i ? a : `${f}px`)),
      { data: { x: h, y: w } }
    );
  },
});
function at(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var br = zt,
  Mr = Xt,
  Cr = Yt,
  Rr = Zt,
  qe = ["Enter", " "],
  Ar = ["ArrowDown", "PageUp", "Home"],
  Jt = ["ArrowUp", "PageDown", "End"],
  Sr = [...Ar, ...Jt],
  Pr = { ltr: [...qe, "ArrowRight"], rtl: [...qe, "ArrowLeft"] },
  _r = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  Ce = "Menu",
  [ye, Er, Dr] = no(Ce),
  [ue, Qt] = Ze(Ce, [Dr, Kt, Dt]),
  Be = Kt(),
  en = Dt(),
  [Or, de] = ue(Ce),
  [Tr, Re] = ue(Ce),
  tn = (e) => {
    const { __scopeMenu: t, open: n = !1, children: o, dir: r, onOpenChange: s, modal: i = !0 } = e,
      c = Be(t),
      [u, d] = m.useState(null),
      l = m.useRef(!1),
      a = Je(s),
      p = to(r);
    return (
      m.useEffect(() => {
        const f = () => {
            ((l.current = !0),
              document.addEventListener("pointerdown", h, { capture: !0, once: !0 }),
              document.addEventListener("pointermove", h, { capture: !0, once: !0 }));
          },
          h = () => (l.current = !1);
        return (
          document.addEventListener("keydown", f, { capture: !0 }),
          () => {
            (document.removeEventListener("keydown", f, { capture: !0 }),
              document.removeEventListener("pointerdown", h, { capture: !0 }),
              document.removeEventListener("pointermove", h, { capture: !0 }));
          }
        );
      }, []),
      m.useEffect(() => {
        if (!n) return;
        const f = () => a(!1);
        return (window.addEventListener("blur", f), () => window.removeEventListener("blur", f));
      }, [n, a]),
      g.jsx(br, {
        ...c,
        children: g.jsx(Or, {
          scope: t,
          open: n,
          onOpenChange: a,
          content: u,
          onContentChange: d,
          children: g.jsx(Tr, {
            scope: t,
            onClose: m.useCallback(() => a(!1), [a]),
            isUsingKeyboardRef: l,
            dir: p,
            modal: i,
            children: o,
          }),
        }),
      })
    );
  };
tn.displayName = Ce;
var Nr = "MenuAnchor",
  ct = m.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e,
      r = Be(n);
    return g.jsx(Mr, { ...r, ...o, ref: t });
  });
ct.displayName = Nr;
var lt = "MenuPortal",
  [Ir, nn] = ue(lt, { forceMount: void 0 }),
  on = (e) => {
    const { __scopeMenu: t, forceMount: n, children: o, container: r } = e,
      s = de(lt, t);
    return g.jsx(Ir, {
      scope: t,
      forceMount: n,
      children: g.jsx(je, {
        present: n || s.open,
        children: g.jsx(zn, { asChild: !0, container: r, children: o }),
      }),
    });
  };
on.displayName = lt;
var K = "MenuContent",
  [jr, ut] = ue(K),
  rn = m.forwardRef((e, t) => {
    const n = nn(K, e.__scopeMenu),
      { forceMount: o = n.forceMount, ...r } = e,
      s = de(K, e.__scopeMenu),
      i = Re(K, e.__scopeMenu);
    return g.jsx(ye.Provider, {
      scope: e.__scopeMenu,
      children: g.jsx(je, {
        present: o || s.open,
        children: g.jsx(ye.Slot, {
          scope: e.__scopeMenu,
          children: i.modal ? g.jsx(kr, { ...r, ref: t }) : g.jsx(Lr, { ...r, ref: t }),
        }),
      }),
    });
  }),
  kr = m.forwardRef((e, t) => {
    const n = de(K, e.__scopeMenu),
      o = m.useRef(null),
      r = le(t, o);
    return (
      m.useEffect(() => {
        const s = o.current;
        if (s) return Un(s);
      }, []),
      g.jsx(dt, {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: E(e.onFocusOutside, (s) => s.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  Lr = m.forwardRef((e, t) => {
    const n = de(K, e.__scopeMenu);
    return g.jsx(dt, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    });
  }),
  Fr = Qn("MenuContent.ScrollLock"),
  dt = m.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: o = !1,
        trapFocus: r,
        onOpenAutoFocus: s,
        onCloseAutoFocus: i,
        disableOutsidePointerEvents: c,
        onEntryFocus: u,
        onEscapeKeyDown: d,
        onPointerDownOutside: l,
        onFocusOutside: a,
        onInteractOutside: p,
        onDismiss: f,
        disableOutsideScroll: h,
        ...w
      } = e,
      y = de(K, n),
      v = Re(K, n),
      R = Be(n),
      M = en(n),
      b = Er(n),
      [S, A] = m.useState(null),
      P = m.useRef(null),
      j = le(t, P, y.onContentChange),
      k = m.useRef(0),
      D = m.useRef(""),
      F = m.useRef(0),
      I = m.useRef(null),
      O = m.useRef("right"),
      _ = m.useRef(0),
      $ = h ? qn : m.Fragment,
      T = h ? { as: Fr, allowPinchZoom: !0 } : void 0,
      N = (x) => {
        const L = D.current + x,
          U = b().filter((B) => !B.disabled),
          ne = document.activeElement,
          ge = U.find((B) => B.ref.current === ne)?.textValue,
          we = U.map((B) => B.textValue),
          Ae = qr(we, L, ge),
          ie = U.find((B) => B.textValue === Ae)?.ref.current;
        ((function B(oe) {
          ((D.current = oe),
            window.clearTimeout(k.current),
            oe !== "" && (k.current = window.setTimeout(() => B(""), 1e3)));
        })(L),
          ie && setTimeout(() => ie.focus()));
      };
    (m.useEffect(() => () => window.clearTimeout(k.current), []), Yn());
    const C = m.useCallback((x) => O.current === I.current?.side && Jr(x, I.current?.area), []);
    return g.jsx(jr, {
      scope: n,
      searchRef: D,
      onItemEnter: m.useCallback(
        (x) => {
          C(x) && x.preventDefault();
        },
        [C],
      ),
      onItemLeave: m.useCallback(
        (x) => {
          C(x) || (P.current?.focus(), A(null));
        },
        [C],
      ),
      onTriggerLeave: m.useCallback(
        (x) => {
          C(x) && x.preventDefault();
        },
        [C],
      ),
      pointerGraceTimerRef: F,
      onPointerGraceIntentChange: m.useCallback((x) => {
        I.current = x;
      }, []),
      children: g.jsx($, {
        ...T,
        children: g.jsx(Zn, {
          asChild: !0,
          trapped: r,
          onMountAutoFocus: E(s, (x) => {
            (x.preventDefault(), P.current?.focus({ preventScroll: !0 }));
          }),
          onUnmountAutoFocus: i,
          children: g.jsx(Jn, {
            asChild: !0,
            disableOutsidePointerEvents: c,
            onEscapeKeyDown: d,
            onPointerDownOutside: l,
            onFocusOutside: a,
            onInteractOutside: p,
            onDismiss: f,
            children: g.jsx(ro, {
              asChild: !0,
              ...M,
              dir: v.dir,
              orientation: "vertical",
              loop: o,
              currentTabStopId: S,
              onCurrentTabStopIdChange: A,
              onEntryFocus: E(u, (x) => {
                v.isUsingKeyboardRef.current || x.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: g.jsx(Cr, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": bn(y.open),
                "data-radix-menu-content": "",
                dir: v.dir,
                ...R,
                ...w,
                ref: j,
                style: { outline: "none", ...w.style },
                onKeyDown: E(w.onKeyDown, (x) => {
                  const U = x.target.closest("[data-radix-menu-content]") === x.currentTarget,
                    ne = x.ctrlKey || x.altKey || x.metaKey,
                    ge = x.key.length === 1;
                  U && (x.key === "Tab" && x.preventDefault(), !ne && ge && N(x.key));
                  const we = P.current;
                  if (x.target !== we || !Sr.includes(x.key)) return;
                  x.preventDefault();
                  const ie = b()
                    .filter((B) => !B.disabled)
                    .map((B) => B.ref.current);
                  (Jt.includes(x.key) && ie.reverse(), Xr(ie));
                }),
                onBlur: E(e.onBlur, (x) => {
                  x.currentTarget.contains(x.target) ||
                    (window.clearTimeout(k.current), (D.current = ""));
                }),
                onPointerMove: E(
                  e.onPointerMove,
                  be((x) => {
                    const L = x.target,
                      U = _.current !== x.clientX;
                    if (x.currentTarget.contains(L) && U) {
                      const ne = x.clientX > _.current ? "right" : "left";
                      ((O.current = ne), (_.current = x.clientX));
                    }
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
rn.displayName = K;
var $r = "MenuGroup",
  ft = m.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return g.jsx(ee.div, { role: "group", ...o, ref: t });
  });
ft.displayName = $r;
var Br = "MenuLabel",
  sn = m.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return g.jsx(ee.div, { ...o, ref: t });
  });
sn.displayName = Br;
var Ne = "MenuItem",
  _t = "menu.itemSelect",
  We = m.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: o, ...r } = e,
      s = m.useRef(null),
      i = Re(Ne, e.__scopeMenu),
      c = ut(Ne, e.__scopeMenu),
      u = le(t, s),
      d = m.useRef(!1),
      l = () => {
        const a = s.current;
        if (!n && a) {
          const p = new CustomEvent(_t, { bubbles: !0, cancelable: !0 });
          (a.addEventListener(_t, (f) => o?.(f), { once: !0 }),
            Xn(a, p),
            p.defaultPrevented ? (d.current = !1) : i.onClose());
        }
      };
    return g.jsx(an, {
      ...r,
      ref: u,
      disabled: n,
      onClick: E(e.onClick, l),
      onPointerDown: (a) => {
        (e.onPointerDown?.(a), (d.current = !0));
      },
      onPointerUp: E(e.onPointerUp, (a) => {
        d.current || a.currentTarget?.click();
      }),
      onKeyDown: E(e.onKeyDown, (a) => {
        const p = c.searchRef.current !== "";
        n ||
          (p && a.key === " ") ||
          (qe.includes(a.key) && (a.currentTarget.click(), a.preventDefault()));
      }),
    });
  });
We.displayName = Ne;
var an = m.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: o = !1, textValue: r, ...s } = e,
      i = ut(Ne, n),
      c = en(n),
      u = m.useRef(null),
      d = le(t, u),
      [l, a] = m.useState(!1),
      [p, f] = m.useState("");
    return (
      m.useEffect(() => {
        const h = u.current;
        h && f((h.textContent ?? "").trim());
      }, [s.children]),
      g.jsx(ye.ItemSlot, {
        scope: n,
        disabled: o,
        textValue: r ?? p,
        children: g.jsx(oo, {
          asChild: !0,
          ...c,
          focusable: !o,
          children: g.jsx(ee.div, {
            role: "menuitem",
            "data-highlighted": l ? "" : void 0,
            "aria-disabled": o || void 0,
            "data-disabled": o ? "" : void 0,
            ...s,
            ref: d,
            onPointerMove: E(
              e.onPointerMove,
              be((h) => {
                o
                  ? i.onItemLeave(h)
                  : (i.onItemEnter(h),
                    h.defaultPrevented || h.currentTarget.focus({ preventScroll: !0 }));
              }),
            ),
            onPointerLeave: E(
              e.onPointerLeave,
              be((h) => i.onItemLeave(h)),
            ),
            onFocus: E(e.onFocus, () => a(!0)),
            onBlur: E(e.onBlur, () => a(!1)),
          }),
        }),
      })
    );
  }),
  Wr = "MenuCheckboxItem",
  cn = m.forwardRef((e, t) => {
    const { checked: n = !1, onCheckedChange: o, ...r } = e;
    return g.jsx(pn, {
      scope: e.__scopeMenu,
      checked: n,
      children: g.jsx(We, {
        role: "menuitemcheckbox",
        "aria-checked": Ie(n) ? "mixed" : n,
        ...r,
        ref: t,
        "data-state": mt(n),
        onSelect: E(r.onSelect, () => o?.(Ie(n) ? !0 : !n), { checkForDefaultPrevented: !1 }),
      }),
    });
  });
cn.displayName = Wr;
var ln = "MenuRadioGroup",
  [Gr, Hr] = ue(ln, { value: void 0, onValueChange: () => {} }),
  un = m.forwardRef((e, t) => {
    const { value: n, onValueChange: o, ...r } = e,
      s = Je(o);
    return g.jsx(Gr, {
      scope: e.__scopeMenu,
      value: n,
      onValueChange: s,
      children: g.jsx(ft, { ...r, ref: t }),
    });
  });
un.displayName = ln;
var dn = "MenuRadioItem",
  fn = m.forwardRef((e, t) => {
    const { value: n, ...o } = e,
      r = Hr(dn, e.__scopeMenu),
      s = n === r.value;
    return g.jsx(pn, {
      scope: e.__scopeMenu,
      checked: s,
      children: g.jsx(We, {
        role: "menuitemradio",
        "aria-checked": s,
        ...o,
        ref: t,
        "data-state": mt(s),
        onSelect: E(o.onSelect, () => r.onValueChange?.(n), { checkForDefaultPrevented: !1 }),
      }),
    });
  });
fn.displayName = dn;
var pt = "MenuItemIndicator",
  [pn, Kr] = ue(pt, { checked: !1 }),
  mn = m.forwardRef((e, t) => {
    const { __scopeMenu: n, forceMount: o, ...r } = e,
      s = Kr(pt, n);
    return g.jsx(je, {
      present: o || Ie(s.checked) || s.checked === !0,
      children: g.jsx(ee.span, { ...r, ref: t, "data-state": mt(s.checked) }),
    });
  });
mn.displayName = pt;
var Vr = "MenuSeparator",
  hn = m.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return g.jsx(ee.div, { role: "separator", "aria-orientation": "horizontal", ...o, ref: t });
  });
hn.displayName = Vr;
var zr = "MenuArrow",
  gn = m.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e,
      r = Be(n);
    return g.jsx(Rr, { ...r, ...o, ref: t });
  });
gn.displayName = zr;
var Ur = "MenuSub",
  [Js, wn] = ue(Ur),
  xe = "MenuSubTrigger",
  xn = m.forwardRef((e, t) => {
    const n = de(xe, e.__scopeMenu),
      o = Re(xe, e.__scopeMenu),
      r = wn(xe, e.__scopeMenu),
      s = ut(xe, e.__scopeMenu),
      i = m.useRef(null),
      { pointerGraceTimerRef: c, onPointerGraceIntentChange: u } = s,
      d = { __scopeMenu: e.__scopeMenu },
      l = m.useCallback(() => {
        (i.current && window.clearTimeout(i.current), (i.current = null));
      }, []);
    return (
      m.useEffect(() => l, [l]),
      m.useEffect(() => {
        const a = c.current;
        return () => {
          (window.clearTimeout(a), u(null));
        };
      }, [c, u]),
      g.jsx(ct, {
        asChild: !0,
        ...d,
        children: g.jsx(an, {
          id: r.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": n.open,
          "aria-controls": n.open ? r.contentId : void 0,
          "data-state": bn(n.open),
          ...e,
          ref: Et(t, r.onTriggerChange),
          onClick: (a) => {
            (e.onClick?.(a),
              !(e.disabled || a.defaultPrevented) &&
                (a.currentTarget.focus(), n.open || n.onOpenChange(!0)));
          },
          onPointerMove: E(
            e.onPointerMove,
            be((a) => {
              (s.onItemEnter(a),
                !a.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !i.current &&
                  (s.onPointerGraceIntentChange(null),
                  (i.current = window.setTimeout(() => {
                    (n.onOpenChange(!0), l());
                  }, 100))));
            }),
          ),
          onPointerLeave: E(
            e.onPointerLeave,
            be((a) => {
              l();
              const p = n.content?.getBoundingClientRect();
              if (p) {
                const f = n.content?.dataset.side,
                  h = f === "right",
                  w = h ? -5 : 5,
                  y = p[h ? "left" : "right"],
                  v = p[h ? "right" : "left"];
                (s.onPointerGraceIntentChange({
                  area: [
                    { x: a.clientX + w, y: a.clientY },
                    { x: y, y: p.top },
                    { x: v, y: p.top },
                    { x: v, y: p.bottom },
                    { x: y, y: p.bottom },
                  ],
                  side: f,
                }),
                  window.clearTimeout(c.current),
                  (c.current = window.setTimeout(() => s.onPointerGraceIntentChange(null), 300)));
              } else {
                if ((s.onTriggerLeave(a), a.defaultPrevented)) return;
                s.onPointerGraceIntentChange(null);
              }
            }),
          ),
          onKeyDown: E(e.onKeyDown, (a) => {
            const p = s.searchRef.current !== "";
            e.disabled ||
              (p && a.key === " ") ||
              (Pr[o.dir].includes(a.key) &&
                (n.onOpenChange(!0), n.content?.focus(), a.preventDefault()));
          }),
        }),
      })
    );
  });
xn.displayName = xe;
var vn = "MenuSubContent",
  yn = m.forwardRef((e, t) => {
    const n = nn(K, e.__scopeMenu),
      { forceMount: o = n.forceMount, align: r = "start", ...s } = e,
      i = de(K, e.__scopeMenu),
      c = Re(K, e.__scopeMenu),
      u = wn(vn, e.__scopeMenu),
      d = m.useRef(null),
      l = le(t, d);
    return g.jsx(ye.Provider, {
      scope: e.__scopeMenu,
      children: g.jsx(je, {
        present: o || i.open,
        children: g.jsx(ye.Slot, {
          scope: e.__scopeMenu,
          children: g.jsx(dt, {
            id: u.contentId,
            "aria-labelledby": u.triggerId,
            ...s,
            ref: l,
            align: r,
            side: c.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (a) => {
              (c.isUsingKeyboardRef.current && d.current?.focus(), a.preventDefault());
            },
            onCloseAutoFocus: (a) => a.preventDefault(),
            onFocusOutside: E(e.onFocusOutside, (a) => {
              a.target !== u.trigger && i.onOpenChange(!1);
            }),
            onEscapeKeyDown: E(e.onEscapeKeyDown, (a) => {
              (c.onClose(), a.preventDefault());
            }),
            onKeyDown: E(e.onKeyDown, (a) => {
              const p = a.currentTarget.contains(a.target),
                f = _r[c.dir].includes(a.key);
              p && f && (i.onOpenChange(!1), u.trigger?.focus(), a.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
yn.displayName = vn;
function bn(e) {
  return e ? "open" : "closed";
}
function Ie(e) {
  return e === "indeterminate";
}
function mt(e) {
  return Ie(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Xr(e) {
  const t = document.activeElement;
  for (const n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Yr(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function qr(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t,
    s = n ? e.indexOf(n) : -1;
  let i = Yr(e, Math.max(s, 0));
  r.length === 1 && (i = i.filter((d) => d !== n));
  const u = i.find((d) => d.toLowerCase().startsWith(r.toLowerCase()));
  return u !== n ? u : void 0;
}
function Zr(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let s = 0, i = t.length - 1; s < t.length; i = s++) {
    const c = t[s],
      u = t[i],
      d = c.x,
      l = c.y,
      a = u.x,
      p = u.y;
    l > o != p > o && n < ((a - d) * (o - l)) / (p - l) + d && (r = !r);
  }
  return r;
}
function Jr(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Zr(n, t);
}
function be(e) {
  return (t) => (t.pointerType === "mouse" ? e(t) : void 0);
}
var Qr = tn,
  es = ct,
  ts = on,
  ns = rn,
  os = ft,
  rs = sn,
  ss = We,
  is = cn,
  as = un,
  cs = fn,
  ls = mn,
  us = hn,
  ds = gn,
  fs = xn,
  ps = yn,
  Ge = "DropdownMenu",
  [ms] = Ze(Ge, [Qt]),
  W = Qt(),
  [hs, Mn] = ms(Ge),
  Cn = (e) => {
    const {
        __scopeDropdownMenu: t,
        children: n,
        dir: o,
        open: r,
        defaultOpen: s,
        onOpenChange: i,
        modal: c = !0,
      } = e,
      u = W(t),
      d = m.useRef(null),
      [l, a] = eo({ prop: r, defaultProp: s ?? !1, onChange: i, caller: Ge });
    return g.jsx(hs, {
      scope: t,
      triggerId: gt(),
      triggerRef: d,
      contentId: gt(),
      open: l,
      onOpenChange: a,
      onOpenToggle: m.useCallback(() => a((p) => !p), [a]),
      modal: c,
      children: g.jsx(Qr, { ...u, open: l, onOpenChange: a, dir: o, modal: c, children: n }),
    });
  };
Cn.displayName = Ge;
var Rn = "DropdownMenuTrigger",
  An = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: o = !1, ...r } = e,
      s = Mn(Rn, n),
      i = W(n);
    return g.jsx(es, {
      asChild: !0,
      ...i,
      children: g.jsx(ee.button, {
        type: "button",
        id: s.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": s.open,
        "aria-controls": s.open ? s.contentId : void 0,
        "data-state": s.open ? "open" : "closed",
        "data-disabled": o ? "" : void 0,
        disabled: o,
        ...r,
        ref: Et(t, s.triggerRef),
        onPointerDown: E(e.onPointerDown, (c) => {
          !o &&
            c.button === 0 &&
            c.ctrlKey === !1 &&
            (s.onOpenToggle(), s.open || c.preventDefault());
        }),
        onKeyDown: E(e.onKeyDown, (c) => {
          o ||
            (["Enter", " "].includes(c.key) && s.onOpenToggle(),
            c.key === "ArrowDown" && s.onOpenChange(!0),
            ["Enter", " ", "ArrowDown"].includes(c.key) && c.preventDefault());
        }),
      }),
    });
  });
An.displayName = Rn;
var gs = "DropdownMenuPortal",
  Sn = (e) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      o = W(t);
    return g.jsx(ts, { ...o, ...n });
  };
Sn.displayName = gs;
var Pn = "DropdownMenuContent",
  _n = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = Mn(Pn, n),
      s = W(n),
      i = m.useRef(!1);
    return g.jsx(ns, {
      id: r.contentId,
      "aria-labelledby": r.triggerId,
      ...s,
      ...o,
      ref: t,
      onCloseAutoFocus: E(e.onCloseAutoFocus, (c) => {
        (i.current || r.triggerRef.current?.focus(), (i.current = !1), c.preventDefault());
      }),
      onInteractOutside: E(e.onInteractOutside, (c) => {
        const u = c.detail.originalEvent,
          d = u.button === 0 && u.ctrlKey === !0,
          l = u.button === 2 || d;
        (!r.modal || l) && (i.current = !0);
      }),
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)",
      },
    });
  });
_n.displayName = Pn;
var ws = "DropdownMenuGroup",
  xs = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = W(n);
    return g.jsx(os, { ...r, ...o, ref: t });
  });
xs.displayName = ws;
var vs = "DropdownMenuLabel",
  En = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = W(n);
    return g.jsx(rs, { ...r, ...o, ref: t });
  });
En.displayName = vs;
var ys = "DropdownMenuItem",
  Dn = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = W(n);
    return g.jsx(ss, { ...r, ...o, ref: t });
  });
Dn.displayName = ys;
var bs = "DropdownMenuCheckboxItem",
  Ms = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = W(n);
    return g.jsx(is, { ...r, ...o, ref: t });
  });
Ms.displayName = bs;
var Cs = "DropdownMenuRadioGroup",
  Rs = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = W(n);
    return g.jsx(as, { ...r, ...o, ref: t });
  });
Rs.displayName = Cs;
var As = "DropdownMenuRadioItem",
  Ss = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = W(n);
    return g.jsx(cs, { ...r, ...o, ref: t });
  });
Ss.displayName = As;
var Ps = "DropdownMenuItemIndicator",
  _s = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = W(n);
    return g.jsx(ls, { ...r, ...o, ref: t });
  });
_s.displayName = Ps;
var Es = "DropdownMenuSeparator",
  On = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = W(n);
    return g.jsx(us, { ...r, ...o, ref: t });
  });
On.displayName = Es;
var Ds = "DropdownMenuArrow",
  Os = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = W(n);
    return g.jsx(ds, { ...r, ...o, ref: t });
  });
Os.displayName = Ds;
var Ts = "DropdownMenuSubTrigger",
  Ns = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = W(n);
    return g.jsx(fs, { ...r, ...o, ref: t });
  });
Ns.displayName = Ts;
var Is = "DropdownMenuSubContent",
  js = m.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      r = W(n);
    return g.jsx(ps, {
      ...r,
      ...o,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)",
      },
    });
  });
js.displayName = Is;
var ks = Cn,
  Ls = An,
  Fs = Sn,
  $s = _n,
  Bs = En,
  Ws = Dn,
  Gs = On;
function Qs({ ...e }) {
  return g.jsx(ks, { "data-slot": "dropdown-menu", ...e });
}
function ei({ ...e }) {
  return g.jsx(Ls, { "data-slot": "dropdown-menu-trigger", ...e });
}
function ti({ className: e, sideOffset: t = 4, ...n }) {
  return g.jsx(Fs, {
    children: g.jsx($s, {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: Q(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e,
      ),
      ...n,
    }),
  });
}
function ni({ className: e, inset: t, variant: n = "default", ...o }) {
  return g.jsx(Ws, {
    "data-slot": "dropdown-menu-item",
    "data-inset": t,
    "data-variant": n,
    className: Q(
      "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      e,
    ),
    ...o,
  });
}
function oi({ className: e, inset: t, ...n }) {
  return g.jsx(Bs, {
    "data-slot": "dropdown-menu-label",
    "data-inset": t,
    className: Q("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", e),
    ...n,
  });
}
function ri({ className: e, ...t }) {
  return g.jsx(Gs, {
    "data-slot": "dropdown-menu-separator",
    className: Q("bg-border -mx-1 my-1 h-px", e),
    ...t,
  });
}
export {
  Mr as A,
  Cr as C,
  Qs as D,
  br as R,
  zs as S,
  ei as a,
  ti as b,
  ni as c,
  Us as d,
  Xs as e,
  Ys as f,
  qs as g,
  Kt as h,
  Rr as i,
  Zs as j,
  oi as k,
  ri as l,
};
