const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/admin-articles-page-Cl2VzOax.js",
      "assets/keywords-input-Xli283ir.js",
      "assets/table-states-VTf3GIXM.js",
      "assets/admin-layout-D3WjUxhk.js",
      "assets/logo-DAJBFNbw.js",
      "assets/dropdown-menu-D88pNK4a.js",
      "assets/index-C6C9Fd6I.js",
      "assets/index-1rwslFp9.js",
      "assets/admin-api-94YXH0tb.js",
      "assets/check-BnVm3EGq.js",
      "assets/search-Dr5WIagZ.js",
      "assets/table-o88iDBgg.js",
      "assets/use-confirm-delete-ids-DDSg_Q9p.js",
      "assets/filter-select-Cs0rPkl5.js",
      "assets/badge-CSxjnkuI.js",
      "assets/checkbox-BAJ8w1mx.js",
      "assets/confirm-delete-dialog-CMcXr7MC.js",
      "assets/textarea-DJGz8HHr.js",
      "assets/status-badge-wdb31ySY.js",
      "assets/embed-Dz41SyH7.js",
      "assets/keywords-input-TYr5uW33.css",
      "assets/format-date-BFCYKGOm.js",
      "assets/member-api-B494A4Zv.js",
      "assets/admin-products-page-CxGSI2Nv.js",
      "assets/commerce-config-D8S4uB_x.js",
      "assets/format-price-DaPIseqw.js",
      "assets/star-BX7zr5eL.js",
      "assets/admin-orders-page-B03feuA4.js",
      "assets/order-status-badge-DIqj7UXR.js",
      "assets/admin-order-detail-page-DVwDE6aC.js",
      "assets/card-B_EVv-XE.js",
      "assets/admin-members-page-DWRpK1vz.js",
      "assets/admin-reviews-page-C67s4dcT.js",
      "assets/admin-form-submissions-page-C6b3TroK.js",
      "assets/public-layout-DOtA4w_f.js",
      "assets/member-auth-store-BvsgpZBh.js",
      "assets/home-page-sr417Htn.js",
      "assets/home-page-CZ462Oxv.css",
      "assets/admin-api-docs-page-DrqpkLrD.js",
      "assets/platform-embed-page-CUDD_SCF.js",
      "assets/page-BsICXRkc.js",
      "assets/admin-encrypted-login-page-Dlm52NYZ.js",
      "assets/member-auth-page-CrUXTEiE.js",
      "assets/page-xTy00aQa.js",
      "assets/page-0qSxTv7e.js",
      "assets/page-DMVmZKoW.js",
      "assets/placeholder-CUns1gXE.js",
      "assets/page-DsOdI7r-.js",
      "assets/page-BX1W3AjW.js",
      "assets/page-CYzN6hCD.js",
      "assets/page-BBKr9xnR.js",
    ]),
) => i.map((i) => d[i]);
function P1(e, a) {
  for (var r = 0; r < a.length; r++) {
    const i = a[r];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const s in i)
        if (s !== "default" && !(s in e)) {
          const u = Object.getOwnPropertyDescriptor(i, s);
          u && Object.defineProperty(e, s, u.get ? u : { enumerable: !0, get: () => i[s] });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
(function () {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const u of s)
      if (u.type === "childList")
        for (const c of u.addedNodes) c.tagName === "LINK" && c.rel === "modulepreload" && i(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(s) {
    const u = {};
    return (
      s.integrity && (u.integrity = s.integrity),
      s.referrerPolicy && (u.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (u.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (u.credentials = "omit")
          : (u.credentials = "same-origin"),
      u
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const u = r(s);
    fetch(s.href, u);
  }
})();
function e0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var vd = { exports: {} },
  yo = {};
var Vg;
function X1() {
  if (Vg) return yo;
  Vg = 1;
  var e = Symbol.for("react.transitional.element"),
    a = Symbol.for("react.fragment");
  function r(i, s, u) {
    var c = null;
    if ((u !== void 0 && (c = "" + u), s.key !== void 0 && (c = "" + s.key), "key" in s)) {
      u = {};
      for (var h in s) h !== "key" && (u[h] = s[h]);
    } else u = s;
    return ((s = u.ref), { $$typeof: e, type: i, key: c, ref: s !== void 0 ? s : null, props: u });
  }
  return ((yo.Fragment = a), (yo.jsx = r), (yo.jsxs = r), yo);
}
var Bg;
function I1() {
  return (Bg || ((Bg = 1), (vd.exports = X1())), vd.exports);
}
var ee = I1(),
  gd = { exports: {} },
  qe = {};
var Hg;
function Q1() {
  if (Hg) return qe;
  Hg = 1;
  var e = Symbol.for("react.transitional.element"),
    a = Symbol.for("react.portal"),
    r = Symbol.for("react.fragment"),
    i = Symbol.for("react.strict_mode"),
    s = Symbol.for("react.profiler"),
    u = Symbol.for("react.consumer"),
    c = Symbol.for("react.context"),
    h = Symbol.for("react.forward_ref"),
    p = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    y = Symbol.for("react.lazy"),
    v = Symbol.for("react.activity"),
    S = Symbol.iterator;
  function E(O) {
    return O === null || typeof O != "object"
      ? null
      : ((O = (S && O[S]) || O["@@iterator"]), typeof O == "function" ? O : null);
  }
  var w = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    z = Object.assign,
    R = {};
  function j(O, I, q) {
    ((this.props = O), (this.context = I), (this.refs = R), (this.updater = q || w));
  }
  ((j.prototype.isReactComponent = {}),
    (j.prototype.setState = function (O, I) {
      if (typeof O != "object" && typeof O != "function" && O != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, O, I, "setState");
    }),
    (j.prototype.forceUpdate = function (O) {
      this.updater.enqueueForceUpdate(this, O, "forceUpdate");
    }));
  function k() {}
  k.prototype = j.prototype;
  function F(O, I, q) {
    ((this.props = O), (this.context = I), (this.refs = R), (this.updater = q || w));
  }
  var $ = (F.prototype = new k());
  (($.constructor = F), z($, j.prototype), ($.isPureReactComponent = !0));
  var G = Array.isArray;
  function he() {}
  var ce = { H: null, A: null, T: null, S: null },
    T = Object.prototype.hasOwnProperty;
  function me(O, I, q) {
    var J = q.ref;
    return { $$typeof: e, type: O, key: I, ref: J !== void 0 ? J : null, props: q };
  }
  function Oe(O, I) {
    return me(O.type, I, O.props);
  }
  function Be(O) {
    return typeof O == "object" && O !== null && O.$$typeof === e;
  }
  function fe(O) {
    var I = { "=": "=0", ":": "=2" };
    return (
      "$" +
      O.replace(/[=:]/g, function (q) {
        return I[q];
      })
    );
  }
  var be = /\/+/g;
  function ze(O, I) {
    return typeof O == "object" && O !== null && O.key != null ? fe("" + O.key) : I.toString(36);
  }
  function xe(O) {
    switch (O.status) {
      case "fulfilled":
        return O.value;
      case "rejected":
        throw O.reason;
      default:
        switch (
          (typeof O.status == "string"
            ? O.then(he, he)
            : ((O.status = "pending"),
              O.then(
                function (I) {
                  O.status === "pending" && ((O.status = "fulfilled"), (O.value = I));
                },
                function (I) {
                  O.status === "pending" && ((O.status = "rejected"), (O.reason = I));
                },
              )),
          O.status)
        ) {
          case "fulfilled":
            return O.value;
          case "rejected":
            throw O.reason;
        }
    }
    throw O;
  }
  function D(O, I, q, J, ie) {
    var ve = typeof O;
    (ve === "undefined" || ve === "boolean") && (O = null);
    var Me = !1;
    if (O === null) Me = !0;
    else
      switch (ve) {
        case "bigint":
        case "string":
        case "number":
          Me = !0;
          break;
        case "object":
          switch (O.$$typeof) {
            case e:
            case a:
              Me = !0;
              break;
            case y:
              return ((Me = O._init), D(Me(O._payload), I, q, J, ie));
          }
      }
    if (Me)
      return (
        (ie = ie(O)),
        (Me = J === "" ? "." + ze(O, 0) : J),
        G(ie)
          ? ((q = ""),
            Me != null && (q = Me.replace(be, "$&/") + "/"),
            D(ie, I, q, "", function (un) {
              return un;
            }))
          : ie != null &&
            (Be(ie) &&
              (ie = Oe(
                ie,
                q +
                  (ie.key == null || (O && O.key === ie.key)
                    ? ""
                    : ("" + ie.key).replace(be, "$&/") + "/") +
                  Me,
              )),
            I.push(ie)),
        1
      );
    Me = 0;
    var He = J === "" ? "." : J + ":";
    if (G(O))
      for (var Ne = 0; Ne < O.length; Ne++)
        ((J = O[Ne]), (ve = He + ze(J, Ne)), (Me += D(J, I, q, ve, ie)));
    else if (((Ne = E(O)), typeof Ne == "function"))
      for (O = Ne.call(O), Ne = 0; !(J = O.next()).done; )
        ((J = J.value), (ve = He + ze(J, Ne++)), (Me += D(J, I, q, ve, ie)));
    else if (ve === "object") {
      if (typeof O.then == "function") return D(xe(O), I, q, J, ie);
      throw (
        (I = String(O)),
        Error(
          "Objects are not valid as a React child (found: " +
            (I === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : I) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return Me;
  }
  function X(O, I, q) {
    if (O == null) return O;
    var J = [],
      ie = 0;
    return (
      D(O, J, "", "", function (ve) {
        return I.call(q, ve, ie++);
      }),
      J
    );
  }
  function pe(O) {
    if (O._status === -1) {
      var I = O._result;
      ((I = I()),
        I.then(
          function (q) {
            (O._status === 0 || O._status === -1) && ((O._status = 1), (O._result = q));
          },
          function (q) {
            (O._status === 0 || O._status === -1) && ((O._status = 2), (O._result = q));
          },
        ),
        O._status === -1 && ((O._status = 0), (O._result = I)));
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var ge =
      typeof reportError == "function"
        ? reportError
        : function (O) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var I = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof O == "object" && O !== null && typeof O.message == "string"
                    ? String(O.message)
                    : String(O),
                error: O,
              });
              if (!window.dispatchEvent(I)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
              process.emit("uncaughtException", O);
              return;
            }
            console.error(O);
          },
    Q = {
      map: X,
      forEach: function (O, I, q) {
        X(
          O,
          function () {
            I.apply(this, arguments);
          },
          q,
        );
      },
      count: function (O) {
        var I = 0;
        return (
          X(O, function () {
            I++;
          }),
          I
        );
      },
      toArray: function (O) {
        return (
          X(O, function (I) {
            return I;
          }) || []
        );
      },
      only: function (O) {
        if (!Be(O))
          throw Error("React.Children.only expected to receive a single React element child.");
        return O;
      },
    };
  return (
    (qe.Activity = v),
    (qe.Children = Q),
    (qe.Component = j),
    (qe.Fragment = r),
    (qe.Profiler = s),
    (qe.PureComponent = F),
    (qe.StrictMode = i),
    (qe.Suspense = p),
    (qe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ce),
    (qe.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (O) {
        return ce.H.useMemoCache(O);
      },
    }),
    (qe.cache = function (O) {
      return function () {
        return O.apply(null, arguments);
      };
    }),
    (qe.cacheSignal = function () {
      return null;
    }),
    (qe.cloneElement = function (O, I, q) {
      if (O == null) throw Error("The argument must be a React element, but you passed " + O + ".");
      var J = z({}, O.props),
        ie = O.key;
      if (I != null)
        for (ve in (I.key !== void 0 && (ie = "" + I.key), I))
          !T.call(I, ve) ||
            ve === "key" ||
            ve === "__self" ||
            ve === "__source" ||
            (ve === "ref" && I.ref === void 0) ||
            (J[ve] = I[ve]);
      var ve = arguments.length - 2;
      if (ve === 1) J.children = q;
      else if (1 < ve) {
        for (var Me = Array(ve), He = 0; He < ve; He++) Me[He] = arguments[He + 2];
        J.children = Me;
      }
      return me(O.type, ie, J);
    }),
    (qe.createContext = function (O) {
      return (
        (O = {
          $$typeof: c,
          _currentValue: O,
          _currentValue2: O,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (O.Provider = O),
        (O.Consumer = { $$typeof: u, _context: O }),
        O
      );
    }),
    (qe.createElement = function (O, I, q) {
      var J,
        ie = {},
        ve = null;
      if (I != null)
        for (J in (I.key !== void 0 && (ve = "" + I.key), I))
          T.call(I, J) && J !== "key" && J !== "__self" && J !== "__source" && (ie[J] = I[J]);
      var Me = arguments.length - 2;
      if (Me === 1) ie.children = q;
      else if (1 < Me) {
        for (var He = Array(Me), Ne = 0; Ne < Me; Ne++) He[Ne] = arguments[Ne + 2];
        ie.children = He;
      }
      if (O && O.defaultProps)
        for (J in ((Me = O.defaultProps), Me)) ie[J] === void 0 && (ie[J] = Me[J]);
      return me(O, ve, ie);
    }),
    (qe.createRef = function () {
      return { current: null };
    }),
    (qe.forwardRef = function (O) {
      return { $$typeof: h, render: O };
    }),
    (qe.isValidElement = Be),
    (qe.lazy = function (O) {
      return { $$typeof: y, _payload: { _status: -1, _result: O }, _init: pe };
    }),
    (qe.memo = function (O, I) {
      return { $$typeof: m, type: O, compare: I === void 0 ? null : I };
    }),
    (qe.startTransition = function (O) {
      var I = ce.T,
        q = {};
      ce.T = q;
      try {
        var J = O(),
          ie = ce.S;
        (ie !== null && ie(q, J),
          typeof J == "object" && J !== null && typeof J.then == "function" && J.then(he, ge));
      } catch (ve) {
        ge(ve);
      } finally {
        (I !== null && q.types !== null && (I.types = q.types), (ce.T = I));
      }
    }),
    (qe.unstable_useCacheRefresh = function () {
      return ce.H.useCacheRefresh();
    }),
    (qe.use = function (O) {
      return ce.H.use(O);
    }),
    (qe.useActionState = function (O, I, q) {
      return ce.H.useActionState(O, I, q);
    }),
    (qe.useCallback = function (O, I) {
      return ce.H.useCallback(O, I);
    }),
    (qe.useContext = function (O) {
      return ce.H.useContext(O);
    }),
    (qe.useDebugValue = function () {}),
    (qe.useDeferredValue = function (O, I) {
      return ce.H.useDeferredValue(O, I);
    }),
    (qe.useEffect = function (O, I) {
      return ce.H.useEffect(O, I);
    }),
    (qe.useEffectEvent = function (O) {
      return ce.H.useEffectEvent(O);
    }),
    (qe.useId = function () {
      return ce.H.useId();
    }),
    (qe.useImperativeHandle = function (O, I, q) {
      return ce.H.useImperativeHandle(O, I, q);
    }),
    (qe.useInsertionEffect = function (O, I) {
      return ce.H.useInsertionEffect(O, I);
    }),
    (qe.useLayoutEffect = function (O, I) {
      return ce.H.useLayoutEffect(O, I);
    }),
    (qe.useMemo = function (O, I) {
      return ce.H.useMemo(O, I);
    }),
    (qe.useOptimistic = function (O, I) {
      return ce.H.useOptimistic(O, I);
    }),
    (qe.useReducer = function (O, I, q) {
      return ce.H.useReducer(O, I, q);
    }),
    (qe.useRef = function (O) {
      return ce.H.useRef(O);
    }),
    (qe.useState = function (O) {
      return ce.H.useState(O);
    }),
    (qe.useSyncExternalStore = function (O, I, q) {
      return ce.H.useSyncExternalStore(O, I, q);
    }),
    (qe.useTransition = function () {
      return ce.H.useTransition();
    }),
    (qe.version = "19.2.7"),
    qe
  );
}
var Zg;
function mh() {
  return (Zg || ((Zg = 1), (gd.exports = Q1())), gd.exports);
}
var _ = mh();
const K = e0(_),
  $u = P1({ __proto__: null, default: K }, [_]);
var yd = { exports: {} },
  bo = {},
  bd = { exports: {} },
  _d = {};
var $g;
function K1() {
  return (
    $g ||
      (($g = 1),
      (function (e) {
        function a(D, X) {
          var pe = D.length;
          D.push(X);
          e: for (; 0 < pe; ) {
            var ge = (pe - 1) >>> 1,
              Q = D[ge];
            if (0 < s(Q, X)) ((D[ge] = X), (D[pe] = Q), (pe = ge));
            else break e;
          }
        }
        function r(D) {
          return D.length === 0 ? null : D[0];
        }
        function i(D) {
          if (D.length === 0) return null;
          var X = D[0],
            pe = D.pop();
          if (pe !== X) {
            D[0] = pe;
            e: for (var ge = 0, Q = D.length, O = Q >>> 1; ge < O; ) {
              var I = 2 * (ge + 1) - 1,
                q = D[I],
                J = I + 1,
                ie = D[J];
              if (0 > s(q, pe))
                J < Q && 0 > s(ie, q)
                  ? ((D[ge] = ie), (D[J] = pe), (ge = J))
                  : ((D[ge] = q), (D[I] = pe), (ge = I));
              else if (J < Q && 0 > s(ie, pe)) ((D[ge] = ie), (D[J] = pe), (ge = J));
              else break e;
            }
          }
          return X;
        }
        function s(D, X) {
          var pe = D.sortIndex - X.sortIndex;
          return pe !== 0 ? pe : D.id - X.id;
        }
        if (
          ((e.unstable_now = void 0),
          typeof performance == "object" && typeof performance.now == "function")
        ) {
          var u = performance;
          e.unstable_now = function () {
            return u.now();
          };
        } else {
          var c = Date,
            h = c.now();
          e.unstable_now = function () {
            return c.now() - h;
          };
        }
        var p = [],
          m = [],
          y = 1,
          v = null,
          S = 3,
          E = !1,
          w = !1,
          z = !1,
          R = !1,
          j = typeof setTimeout == "function" ? setTimeout : null,
          k = typeof clearTimeout == "function" ? clearTimeout : null,
          F = typeof setImmediate < "u" ? setImmediate : null;
        function $(D) {
          for (var X = r(m); X !== null; ) {
            if (X.callback === null) i(m);
            else if (X.startTime <= D) (i(m), (X.sortIndex = X.expirationTime), a(p, X));
            else break;
            X = r(m);
          }
        }
        function G(D) {
          if (((z = !1), $(D), !w))
            if (r(p) !== null) ((w = !0), he || ((he = !0), fe()));
            else {
              var X = r(m);
              X !== null && xe(G, X.startTime - D);
            }
        }
        var he = !1,
          ce = -1,
          T = 5,
          me = -1;
        function Oe() {
          return R ? !0 : !(e.unstable_now() - me < T);
        }
        function Be() {
          if (((R = !1), he)) {
            var D = e.unstable_now();
            me = D;
            var X = !0;
            try {
              e: {
                ((w = !1), z && ((z = !1), k(ce), (ce = -1)), (E = !0));
                var pe = S;
                try {
                  t: {
                    for ($(D), v = r(p); v !== null && !(v.expirationTime > D && Oe()); ) {
                      var ge = v.callback;
                      if (typeof ge == "function") {
                        ((v.callback = null), (S = v.priorityLevel));
                        var Q = ge(v.expirationTime <= D);
                        if (((D = e.unstable_now()), typeof Q == "function")) {
                          ((v.callback = Q), $(D), (X = !0));
                          break t;
                        }
                        (v === r(p) && i(p), $(D));
                      } else i(p);
                      v = r(p);
                    }
                    if (v !== null) X = !0;
                    else {
                      var O = r(m);
                      (O !== null && xe(G, O.startTime - D), (X = !1));
                    }
                  }
                  break e;
                } finally {
                  ((v = null), (S = pe), (E = !1));
                }
                X = void 0;
              }
            } finally {
              X ? fe() : (he = !1);
            }
          }
        }
        var fe;
        if (typeof F == "function")
          fe = function () {
            F(Be);
          };
        else if (typeof MessageChannel < "u") {
          var be = new MessageChannel(),
            ze = be.port2;
          ((be.port1.onmessage = Be),
            (fe = function () {
              ze.postMessage(null);
            }));
        } else
          fe = function () {
            j(Be, 0);
          };
        function xe(D, X) {
          ce = j(function () {
            D(e.unstable_now());
          }, X);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (D) {
            D.callback = null;
          }),
          (e.unstable_forceFrameRate = function (D) {
            0 > D || 125 < D
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (T = 0 < D ? Math.floor(1e3 / D) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return S;
          }),
          (e.unstable_next = function (D) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var X = 3;
                break;
              default:
                X = S;
            }
            var pe = S;
            S = X;
            try {
              return D();
            } finally {
              S = pe;
            }
          }),
          (e.unstable_requestPaint = function () {
            R = !0;
          }),
          (e.unstable_runWithPriority = function (D, X) {
            switch (D) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                D = 3;
            }
            var pe = S;
            S = D;
            try {
              return X();
            } finally {
              S = pe;
            }
          }),
          (e.unstable_scheduleCallback = function (D, X, pe) {
            var ge = e.unstable_now();
            switch (
              (typeof pe == "object" && pe !== null
                ? ((pe = pe.delay), (pe = typeof pe == "number" && 0 < pe ? ge + pe : ge))
                : (pe = ge),
              D)
            ) {
              case 1:
                var Q = -1;
                break;
              case 2:
                Q = 250;
                break;
              case 5:
                Q = 1073741823;
                break;
              case 4:
                Q = 1e4;
                break;
              default:
                Q = 5e3;
            }
            return (
              (Q = pe + Q),
              (D = {
                id: y++,
                callback: X,
                priorityLevel: D,
                startTime: pe,
                expirationTime: Q,
                sortIndex: -1,
              }),
              pe > ge
                ? ((D.sortIndex = pe),
                  a(m, D),
                  r(p) === null &&
                    D === r(m) &&
                    (z ? (k(ce), (ce = -1)) : (z = !0), xe(G, pe - ge)))
                : ((D.sortIndex = Q), a(p, D), w || E || ((w = !0), he || ((he = !0), fe()))),
              D
            );
          }),
          (e.unstable_shouldYield = Oe),
          (e.unstable_wrapCallback = function (D) {
            var X = S;
            return function () {
              var pe = S;
              S = X;
              try {
                return D.apply(this, arguments);
              } finally {
                S = pe;
              }
            };
          }));
      })(_d)),
    _d
  );
}
var Yg;
function J1() {
  return (Yg || ((Yg = 1), (bd.exports = K1())), bd.exports);
}
var Sd = { exports: {} },
  wn = {};
var Fg;
function W1() {
  if (Fg) return wn;
  Fg = 1;
  var e = mh();
  function a(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++) m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return (
      "Minified React error #" +
      p +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function r() {}
  var i = {
      d: {
        f: r,
        r: function () {
          throw Error(a(522));
        },
        D: r,
        C: r,
        L: r,
        m: r,
        X: r,
        S: r,
        M: r,
      },
      p: 0,
      findDOMNode: null,
    },
    s = Symbol.for("react.portal");
  function u(p, m, y) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: v == null ? null : "" + v,
      children: p,
      containerInfo: m,
      implementation: y,
    };
  }
  var c = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, m) {
    if (p === "font") return "";
    if (typeof m == "string") return m === "use-credentials" ? m : "";
  }
  return (
    (wn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i),
    (wn.createPortal = function (p, m) {
      var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)) throw Error(a(299));
      return u(p, m, null, y);
    }),
    (wn.flushSync = function (p) {
      var m = c.T,
        y = i.p;
      try {
        if (((c.T = null), (i.p = 2), p)) return p();
      } finally {
        ((c.T = m), (i.p = y), i.d.f());
      }
    }),
    (wn.preconnect = function (p, m) {
      typeof p == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m = typeof m == "string" ? (m === "use-credentials" ? m : "") : void 0))
          : (m = null),
        i.d.C(p, m));
    }),
    (wn.prefetchDNS = function (p) {
      typeof p == "string" && i.d.D(p);
    }),
    (wn.preinit = function (p, m) {
      if (typeof p == "string" && m && typeof m.as == "string") {
        var y = m.as,
          v = h(y, m.crossOrigin),
          S = typeof m.integrity == "string" ? m.integrity : void 0,
          E = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
        y === "style"
          ? i.d.S(p, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: v,
              integrity: S,
              fetchPriority: E,
            })
          : y === "script" &&
            i.d.X(p, {
              crossOrigin: v,
              integrity: S,
              fetchPriority: E,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
      }
    }),
    (wn.preinitModule = function (p, m) {
      if (typeof p == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var y = h(m.as, m.crossOrigin);
            i.d.M(p, {
              crossOrigin: y,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            });
          }
        } else m == null && i.d.M(p);
    }),
    (wn.preload = function (p, m) {
      if (typeof p == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
        var y = m.as,
          v = h(y, m.crossOrigin);
        i.d.L(p, y, {
          crossOrigin: v,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy: typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet: typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        });
      }
    }),
    (wn.preloadModule = function (p, m) {
      if (typeof p == "string")
        if (m) {
          var y = h(m.as, m.crossOrigin);
          i.d.m(p, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: y,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          });
        } else i.d.m(p);
    }),
    (wn.requestFormReset = function (p) {
      i.d.r(p);
    }),
    (wn.unstable_batchedUpdates = function (p, m) {
      return p(m);
    }),
    (wn.useFormState = function (p, m, y) {
      return c.H.useFormState(p, m, y);
    }),
    (wn.useFormStatus = function () {
      return c.H.useHostTransitionStatus();
    }),
    (wn.version = "19.2.7"),
    wn
  );
}
var qg;
function t0() {
  if (qg) return Sd.exports;
  qg = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return (e(), (Sd.exports = W1()), Sd.exports);
}
var Gg;
function ew() {
  if (Gg) return bo;
  Gg = 1;
  var e = J1(),
    a = mh(),
    r = t0();
  function i(t) {
    var n = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++) n += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      n +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function u(t) {
    var n = t,
      l = t;
    if (t.alternate) for (; n.return; ) n = n.return;
    else {
      t = n;
      do ((n = t), (n.flags & 4098) !== 0 && (l = n.return), (t = n.return));
      while (t);
    }
    return n.tag === 3 ? l : null;
  }
  function c(t) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if ((n === null && ((t = t.alternate), t !== null && (n = t.memoizedState)), n !== null))
        return n.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (t.tag === 31) {
      var n = t.memoizedState;
      if ((n === null && ((t = t.alternate), t !== null && (n = t.memoizedState)), n !== null))
        return n.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (u(t) !== t) throw Error(i(188));
  }
  function m(t) {
    var n = t.alternate;
    if (!n) {
      if (((n = u(t)), n === null)) throw Error(i(188));
      return n !== t ? null : t;
    }
    for (var l = t, o = n; ; ) {
      var f = l.return;
      if (f === null) break;
      var d = f.alternate;
      if (d === null) {
        if (((o = f.return), o !== null)) {
          l = o;
          continue;
        }
        break;
      }
      if (f.child === d.child) {
        for (d = f.child; d; ) {
          if (d === l) return (p(f), t);
          if (d === o) return (p(f), n);
          d = d.sibling;
        }
        throw Error(i(188));
      }
      if (l.return !== o.return) ((l = f), (o = d));
      else {
        for (var g = !1, b = f.child; b; ) {
          if (b === l) {
            ((g = !0), (l = f), (o = d));
            break;
          }
          if (b === o) {
            ((g = !0), (o = f), (l = d));
            break;
          }
          b = b.sibling;
        }
        if (!g) {
          for (b = d.child; b; ) {
            if (b === l) {
              ((g = !0), (l = d), (o = f));
              break;
            }
            if (b === o) {
              ((g = !0), (o = d), (l = f));
              break;
            }
            b = b.sibling;
          }
          if (!g) throw Error(i(189));
        }
      }
      if (l.alternate !== o) throw Error(i(190));
    }
    if (l.tag !== 3) throw Error(i(188));
    return l.stateNode.current === l ? t : n;
  }
  function y(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((n = y(t)), n !== null)) return n;
      t = t.sibling;
    }
    return null;
  }
  var v = Object.assign,
    S = Symbol.for("react.element"),
    E = Symbol.for("react.transitional.element"),
    w = Symbol.for("react.portal"),
    z = Symbol.for("react.fragment"),
    R = Symbol.for("react.strict_mode"),
    j = Symbol.for("react.profiler"),
    k = Symbol.for("react.consumer"),
    F = Symbol.for("react.context"),
    $ = Symbol.for("react.forward_ref"),
    G = Symbol.for("react.suspense"),
    he = Symbol.for("react.suspense_list"),
    ce = Symbol.for("react.memo"),
    T = Symbol.for("react.lazy"),
    me = Symbol.for("react.activity"),
    Oe = Symbol.for("react.memo_cache_sentinel"),
    Be = Symbol.iterator;
  function fe(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (Be && t[Be]) || t["@@iterator"]), typeof t == "function" ? t : null);
  }
  var be = Symbol.for("react.client.reference");
  function ze(t) {
    if (t == null) return null;
    if (typeof t == "function") return t.$$typeof === be ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case z:
        return "Fragment";
      case j:
        return "Profiler";
      case R:
        return "StrictMode";
      case G:
        return "Suspense";
      case he:
        return "SuspenseList";
      case me:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case w:
          return "Portal";
        case F:
          return t.displayName || "Context";
        case k:
          return (t._context.displayName || "Context") + ".Consumer";
        case $:
          var n = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = n.displayName || n.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case ce:
          return ((n = t.displayName || null), n !== null ? n : ze(t.type) || "Memo");
        case T:
          ((n = t._payload), (t = t._init));
          try {
            return ze(t(n));
          } catch {}
      }
    return null;
  }
  var xe = Array.isArray,
    D = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    X = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    pe = { pending: !1, data: null, method: null, action: null },
    ge = [],
    Q = -1;
  function O(t) {
    return { current: t };
  }
  function I(t) {
    0 > Q || ((t.current = ge[Q]), (ge[Q] = null), Q--);
  }
  function q(t, n) {
    (Q++, (ge[Q] = t.current), (t.current = n));
  }
  var J = O(null),
    ie = O(null),
    ve = O(null),
    Me = O(null);
  function He(t, n) {
    switch ((q(ve, n), q(ie, t), q(J, null), n.nodeType)) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? og(t) : 0;
        break;
      default:
        if (((t = n.tagName), (n = n.namespaceURI))) ((n = og(n)), (t = sg(n, t)));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    (I(J), q(J, t));
  }
  function Ne() {
    (I(J), I(ie), I(ve));
  }
  function un(t) {
    t.memoizedState !== null && q(Me, t);
    var n = J.current,
      l = sg(n, t.type);
    n !== l && (q(ie, t), q(J, l));
  }
  function an(t) {
    (ie.current === t && (I(J), I(ie)), Me.current === t && (I(Me), (mo._currentValue = pe)));
  }
  var Ut, St;
  function xt(t) {
    if (Ut === void 0)
      try {
        throw Error();
      } catch (l) {
        var n = l.stack.trim().match(/\n( *(at )?)/);
        ((Ut = (n && n[1]) || ""),
          (St =
            -1 <
            l.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Ut +
      t +
      St
    );
  }
  var Ma = !1;
  function la(t, n) {
    if (!t || Ma) return "";
    Ma = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function () {
          try {
            if (n) {
              var ae = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(ae.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(ae, []);
                } catch (P) {
                  var Y = P;
                }
                Reflect.construct(t, [], ae);
              } else {
                try {
                  ae.call();
                } catch (P) {
                  Y = P;
                }
                t.call(ae.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (P) {
                Y = P;
              }
              (ae = t()) && typeof ae.catch == "function" && ae.catch(function () {});
            }
          } catch (P) {
            if (P && Y && typeof P.stack == "string") return [P.stack, Y.stack];
          }
          return [null, null];
        },
      };
      o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var f = Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot, "name");
      f &&
        f.configurable &&
        Object.defineProperty(o.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var d = o.DetermineComponentFrameRoot(),
        g = d[0],
        b = d[1];
      if (g && b) {
        var C = g.split(`
`),
          Z = b.split(`
`);
        for (f = o = 0; o < C.length && !C[o].includes("DetermineComponentFrameRoot"); ) o++;
        for (; f < Z.length && !Z[f].includes("DetermineComponentFrameRoot"); ) f++;
        if (o === C.length || f === Z.length)
          for (o = C.length - 1, f = Z.length - 1; 1 <= o && 0 <= f && C[o] !== Z[f]; ) f--;
        for (; 1 <= o && 0 <= f; o--, f--)
          if (C[o] !== Z[f]) {
            if (o !== 1 || f !== 1)
              do
                if ((o--, f--, 0 > f || C[o] !== Z[f])) {
                  var W =
                    `
` + C[o].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      W.includes("<anonymous>") &&
                      (W = W.replace("<anonymous>", t.displayName)),
                    W
                  );
                }
              while (1 <= o && 0 <= f);
            break;
          }
      }
    } finally {
      ((Ma = !1), (Error.prepareStackTrace = l));
    }
    return (l = t ? t.displayName || t.name : "") ? xt(l) : "";
  }
  function cn(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return xt(t.type);
      case 16:
        return xt("Lazy");
      case 13:
        return t.child !== n && n !== null ? xt("Suspense Fallback") : xt("Suspense");
      case 19:
        return xt("SuspenseList");
      case 0:
      case 15:
        return la(t.type, !1);
      case 11:
        return la(t.type.render, !1);
      case 1:
        return la(t.type, !0);
      case 31:
        return xt("Activity");
      default:
        return "";
    }
  }
  function Sa(t) {
    try {
      var n = "",
        l = null;
      do ((n += cn(t, l)), (l = t), (t = t.return));
      while (t);
      return n;
    } catch (o) {
      return (
        `
Error generating stack: ` +
        o.message +
        `
` +
        o.stack
      );
    }
  }
  var rn = Object.prototype.hasOwnProperty,
    Na = e.unstable_scheduleCallback,
    ka = e.unstable_cancelCallback,
    ln = e.unstable_shouldYield,
    Yn = e.unstable_requestPaint,
    Xt = e.unstable_now,
    Fn = e.unstable_getCurrentPriorityLevel,
    Tn = e.unstable_ImmediatePriority,
    vr = e.unstable_UserBlockingPriority,
    ia = e.unstable_NormalPriority,
    fn = e.unstable_LowPriority,
    x = e.unstable_IdlePriority,
    L = e.log,
    V = e.unstable_setDisableYieldValue,
    le = null,
    oe = null;
  function de(t) {
    if ((typeof L == "function" && V(t), oe && typeof oe.setStrictMode == "function"))
      try {
        oe.setStrictMode(le, t);
      } catch {}
  }
  var ue = Math.clz32 ? Math.clz32 : Je,
    _e = Math.log,
    Ve = Math.LN2;
  function Je(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((_e(t) / Ve) | 0)) | 0);
  }
  var Nt = 256,
    dn = 262144,
    It = 4194304;
  function Qt(t) {
    var n = t & 42;
    if (n !== 0) return n;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function $e(t, n, l) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var f = 0,
      d = t.suspendedLanes,
      g = t.pingedLanes;
    t = t.warmLanes;
    var b = o & 134217727;
    return (
      b !== 0
        ? ((o = b & ~d),
          o !== 0
            ? (f = Qt(o))
            : ((g &= b), g !== 0 ? (f = Qt(g)) : l || ((l = b & ~t), l !== 0 && (f = Qt(l)))))
        : ((b = o & ~d),
          b !== 0
            ? (f = Qt(b))
            : g !== 0
              ? (f = Qt(g))
              : l || ((l = o & ~t), l !== 0 && (f = Qt(l)))),
      f === 0
        ? 0
        : n !== 0 &&
            n !== f &&
            (n & d) === 0 &&
            ((d = f & -f), (l = n & -n), d >= l || (d === 32 && (l & 4194048) !== 0))
          ? n
          : f
    );
  }
  function ct(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function jt(t, n) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Vt() {
    var t = It;
    return ((It <<= 1), (It & 62914560) === 0 && (It = 4194304), t);
  }
  function qn(t) {
    for (var n = [], l = 0; 31 > l; l++) n.push(t);
    return n;
  }
  function vt(t, n) {
    ((t.pendingLanes |= n),
      n !== 268435456 && ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)));
  }
  function mn(t, n, l, o, f, d) {
    var g = t.pendingLanes;
    ((t.pendingLanes = l),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= l),
      (t.entangledLanes &= l),
      (t.errorRecoveryDisabledLanes &= l),
      (t.shellSuspendCounter = 0));
    var b = t.entanglements,
      C = t.expirationTimes,
      Z = t.hiddenUpdates;
    for (l = g & ~l; 0 < l; ) {
      var W = 31 - ue(l),
        ae = 1 << W;
      ((b[W] = 0), (C[W] = -1));
      var Y = Z[W];
      if (Y !== null)
        for (Z[W] = null, W = 0; W < Y.length; W++) {
          var P = Y[W];
          P !== null && (P.lane &= -536870913);
        }
      l &= ~ae;
    }
    (o !== 0 && Pa(t, o, 0),
      d !== 0 && f === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(g & ~n)));
  }
  function Pa(t, n, l) {
    ((t.pendingLanes |= n), (t.suspendedLanes &= ~n));
    var o = 31 - ue(n);
    ((t.entangledLanes |= n),
      (t.entanglements[o] = t.entanglements[o] | 1073741824 | (l & 261930)));
  }
  function En(t, n) {
    var l = (t.entangledLanes |= n);
    for (t = t.entanglements; l; ) {
      var o = 31 - ue(l),
        f = 1 << o;
      ((f & n) | (t[o] & n) && (t[o] |= n), (l &= ~f));
    }
  }
  function A(t, n) {
    var l = n & -n;
    return ((l = (l & 42) !== 0 ? 1 : N(l)), (l & (t.suspendedLanes | n)) !== 0 ? 0 : l);
  }
  function N(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function B(t) {
    return ((t &= -t), 2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function re() {
    var t = X.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Dg(t.type));
  }
  function se(t, n) {
    var l = X.p;
    try {
      return ((X.p = t), n());
    } finally {
      X.p = l;
    }
  }
  var Te = Math.random().toString(36).slice(2),
    Se = "__reactFiber$" + Te,
    we = "__reactProps$" + Te,
    Ee = "__reactContainer$" + Te,
    Ue = "__reactEvents$" + Te,
    je = "__reactListeners$" + Te,
    Ge = "__reactHandles$" + Te,
    Ye = "__reactResources$" + Te,
    Ke = "__reactMarker$" + Te;
  function it(t) {
    (delete t[Se], delete t[we], delete t[Ue], delete t[je], delete t[Ge]);
  }
  function zt(t) {
    var n = t[Se];
    if (n) return n;
    for (var l = t.parentNode; l; ) {
      if ((n = l[Ee] || l[Se])) {
        if (((l = n.alternate), n.child !== null || (l !== null && l.child !== null)))
          for (t = pg(t); t !== null; ) {
            if ((l = t[Se])) return l;
            t = pg(t);
          }
        return n;
      }
      ((t = l), (l = t.parentNode));
    }
    return null;
  }
  function ft(t) {
    if ((t = t[Se] || t[Ee])) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3) return t;
    }
    return null;
  }
  function rt(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(i(33));
  }
  function Ft(t) {
    var n = t[Ye];
    return (n || (n = t[Ye] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), n);
  }
  function lt(t) {
    t[Ke] = !0;
  }
  var gr = new Set(),
    Ea = {};
  function Nn(t, n) {
    (An(t, n), An(t + "Capture", n));
  }
  function An(t, n) {
    for (Ea[t] = n, t = 0; t < n.length; t++) gr.add(n[t]);
  }
  var oa = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    zl = {},
    wa = {};
  function Tl(t) {
    return rn.call(wa, t)
      ? !0
      : rn.call(zl, t)
        ? !1
        : oa.test(t)
          ? (wa[t] = !0)
          : ((zl[t] = !0), !1);
  }
  function Xa(t, n, l) {
    if (Tl(n))
      if (l === null) t.removeAttribute(n);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(n);
            return;
          case "boolean":
            var o = n.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              t.removeAttribute(n);
              return;
            }
        }
        t.setAttribute(n, "" + l);
      }
  }
  function Ia(t, n, l) {
    if (l === null) t.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, "" + l);
    }
  }
  function Fe(t, n, l, o) {
    if (o === null) t.removeAttribute(l);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(n, l, "" + o);
    }
  }
  function Et(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Gn(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function xa(t, n, l) {
    var o = Object.getOwnPropertyDescriptor(t.constructor.prototype, n);
    if (
      !t.hasOwnProperty(n) &&
      typeof o < "u" &&
      typeof o.get == "function" &&
      typeof o.set == "function"
    ) {
      var f = o.get,
        d = o.set;
      return (
        Object.defineProperty(t, n, {
          configurable: !0,
          get: function () {
            return f.call(this);
          },
          set: function (g) {
            ((l = "" + g), d.call(this, g));
          },
        }),
        Object.defineProperty(t, n, { enumerable: o.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (g) {
            l = "" + g;
          },
          stopTracking: function () {
            ((t._valueTracker = null), delete t[n]);
          },
        }
      );
    }
  }
  function Al(t) {
    if (!t._valueTracker) {
      var n = Gn(t) ? "checked" : "value";
      t._valueTracker = xa(t, n, "" + t[n]);
    }
  }
  function Ol(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var l = n.getValue(),
      o = "";
    return (
      t && (o = Gn(t) ? (t.checked ? "true" : "false") : t.value),
      (t = o),
      t !== l ? (n.setValue(t), !0) : !1
    );
  }
  function ht(t) {
    if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")) return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Qa = /[\n"\\]/g;
  function On(t) {
    return t.replace(Qa, function (n) {
      return "\\" + n.charCodeAt(0).toString(16) + " ";
    });
  }
  function Oi(t, n, l, o, f, d, g, b) {
    ((t.name = ""),
      g != null && typeof g != "function" && typeof g != "symbol" && typeof g != "boolean"
        ? (t.type = g)
        : t.removeAttribute("type"),
      n != null
        ? g === "number"
          ? ((n === 0 && t.value === "") || t.value != n) && (t.value = "" + Et(n))
          : t.value !== "" + Et(n) && (t.value = "" + Et(n))
        : (g !== "submit" && g !== "reset") || t.removeAttribute("value"),
      n != null
        ? cc(t, g, Et(n))
        : l != null
          ? cc(t, g, Et(l))
          : o != null && t.removeAttribute("value"),
      f == null && d != null && (t.defaultChecked = !!d),
      f != null && (t.checked = f && typeof f != "function" && typeof f != "symbol"),
      b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean"
        ? (t.name = "" + Et(b))
        : t.removeAttribute("name"));
  }
  function tm(t, n, l, o, f, d, g, b) {
    if (
      (d != null &&
        typeof d != "function" &&
        typeof d != "symbol" &&
        typeof d != "boolean" &&
        (t.type = d),
      n != null || l != null)
    ) {
      if (!((d !== "submit" && d !== "reset") || n != null)) {
        Al(t);
        return;
      }
      ((l = l != null ? "" + Et(l) : ""),
        (n = n != null ? "" + Et(n) : l),
        b || n === t.value || (t.value = n),
        (t.defaultValue = n));
    }
    ((o = o ?? f),
      (o = typeof o != "function" && typeof o != "symbol" && !!o),
      (t.checked = b ? t.checked : !!o),
      (t.defaultChecked = !!o),
      g != null &&
        typeof g != "function" &&
        typeof g != "symbol" &&
        typeof g != "boolean" &&
        (t.name = g),
      Al(t));
  }
  function cc(t, n, l) {
    (n === "number" && ht(t.ownerDocument) === t) ||
      t.defaultValue === "" + l ||
      (t.defaultValue = "" + l);
  }
  function Cl(t, n, l, o) {
    if (((t = t.options), n)) {
      n = {};
      for (var f = 0; f < l.length; f++) n["$" + l[f]] = !0;
      for (l = 0; l < t.length; l++)
        ((f = n.hasOwnProperty("$" + t[l].value)),
          t[l].selected !== f && (t[l].selected = f),
          f && o && (t[l].defaultSelected = !0));
    } else {
      for (l = "" + Et(l), n = null, f = 0; f < t.length; f++) {
        if (t[f].value === l) {
          ((t[f].selected = !0), o && (t[f].defaultSelected = !0));
          return;
        }
        n !== null || t[f].disabled || (n = t[f]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function nm(t, n, l) {
    if (n != null && ((n = "" + Et(n)), n !== t.value && (t.value = n), l == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = l != null ? "" + Et(l) : "";
  }
  function am(t, n, l, o) {
    if (n == null) {
      if (o != null) {
        if (l != null) throw Error(i(92));
        if (xe(o)) {
          if (1 < o.length) throw Error(i(93));
          o = o[0];
        }
        l = o;
      }
      (l == null && (l = ""), (n = l));
    }
    ((l = Et(n)),
      (t.defaultValue = l),
      (o = t.textContent),
      o === l && o !== "" && o !== null && (t.value = o),
      Al(t));
  }
  function Dl(t, n) {
    if (n) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var $S = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function rm(t, n, l) {
    var o = n.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === ""
      ? o
        ? t.setProperty(n, "")
        : n === "float"
          ? (t.cssFloat = "")
          : (t[n] = "")
      : o
        ? t.setProperty(n, l)
        : typeof l != "number" || l === 0 || $S.has(n)
          ? n === "float"
            ? (t.cssFloat = l)
            : (t[n] = ("" + l).trim())
          : (t[n] = l + "px");
  }
  function lm(t, n, l) {
    if (n != null && typeof n != "object") throw Error(i(62));
    if (((t = t.style), l != null)) {
      for (var o in l)
        !l.hasOwnProperty(o) ||
          (n != null && n.hasOwnProperty(o)) ||
          (o.indexOf("--") === 0
            ? t.setProperty(o, "")
            : o === "float"
              ? (t.cssFloat = "")
              : (t[o] = ""));
      for (var f in n) ((o = n[f]), n.hasOwnProperty(f) && l[f] !== o && rm(t, f, o));
    } else for (var d in n) n.hasOwnProperty(d) && rm(t, d, n[d]);
  }
  function fc(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var YS = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    FS =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Go(t) {
    return FS.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function Ka() {}
  var dc = null;
  function hc(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Ml = null,
    Nl = null;
  function im(t) {
    var n = ft(t);
    if (n && (t = n.stateNode)) {
      var l = t[we] || null;
      e: switch (((t = n.stateNode), n.type)) {
        case "input":
          if (
            (Oi(
              t,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name,
            ),
            (n = l.name),
            l.type === "radio" && n != null)
          ) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll('input[name="' + On("" + n) + '"][type="radio"]'), n = 0;
              n < l.length;
              n++
            ) {
              var o = l[n];
              if (o !== t && o.form === t.form) {
                var f = o[we] || null;
                if (!f) throw Error(i(90));
                Oi(
                  o,
                  f.value,
                  f.defaultValue,
                  f.defaultValue,
                  f.checked,
                  f.defaultChecked,
                  f.type,
                  f.name,
                );
              }
            }
            for (n = 0; n < l.length; n++) ((o = l[n]), o.form === t.form && Ol(o));
          }
          break e;
        case "textarea":
          nm(t, l.value, l.defaultValue);
          break e;
        case "select":
          ((n = l.value), n != null && Cl(t, !!l.multiple, n, !1));
      }
    }
  }
  var mc = !1;
  function om(t, n, l) {
    if (mc) return t(n, l);
    mc = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (
        ((mc = !1),
        (Ml !== null || Nl !== null) &&
          (Ns(), Ml && ((n = Ml), (t = Nl), (Nl = Ml = null), im(n), t)))
      )
        for (n = 0; n < t.length; n++) im(t[n]);
    }
  }
  function Ci(t, n) {
    var l = t.stateNode;
    if (l === null) return null;
    var o = l[we] || null;
    if (o === null) return null;
    l = o[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((o = !o.disabled) ||
          ((t = t.type),
          (o = !(t === "button" || t === "input" || t === "select" || t === "textarea"))),
          (t = !o));
        break e;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function") throw Error(i(231, n, typeof l));
    return l;
  }
  var Ja = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    pc = !1;
  if (Ja)
    try {
      var Di = {};
      (Object.defineProperty(Di, "passive", {
        get: function () {
          pc = !0;
        },
      }),
        window.addEventListener("test", Di, Di),
        window.removeEventListener("test", Di, Di));
    } catch {
      pc = !1;
    }
  var yr = null,
    vc = null,
    Po = null;
  function sm() {
    if (Po) return Po;
    var t,
      n = vc,
      l = n.length,
      o,
      f = "value" in yr ? yr.value : yr.textContent,
      d = f.length;
    for (t = 0; t < l && n[t] === f[t]; t++);
    var g = l - t;
    for (o = 1; o <= g && n[l - o] === f[d - o]; o++);
    return (Po = f.slice(t, 1 < o ? 1 - o : void 0));
  }
  function Xo(t) {
    var n = t.keyCode;
    return (
      "charCode" in t ? ((t = t.charCode), t === 0 && n === 13 && (t = 13)) : (t = n),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Io() {
    return !0;
  }
  function um() {
    return !1;
  }
  function kn(t) {
    function n(l, o, f, d, g) {
      ((this._reactName = l),
        (this._targetInst = f),
        (this.type = o),
        (this.nativeEvent = d),
        (this.target = g),
        (this.currentTarget = null));
      for (var b in t) t.hasOwnProperty(b) && ((l = t[b]), (this[b] = l ? l(d) : d[b]));
      return (
        (this.isDefaultPrevented = (
          d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1
        )
          ? Io
          : um),
        (this.isPropagationStopped = um),
        this
      );
    }
    return (
      v(n.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = Io));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = Io));
        },
        persist: function () {},
        isPersistent: Io,
      }),
      n
    );
  }
  var Wr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Qo = kn(Wr),
    Mi = v({}, Wr, { view: 0, detail: 0 }),
    qS = kn(Mi),
    gc,
    yc,
    Ni,
    Ko = v({}, Mi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: _c,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== Ni &&
              (Ni && t.type === "mousemove"
                ? ((gc = t.screenX - Ni.screenX), (yc = t.screenY - Ni.screenY))
                : (yc = gc = 0),
              (Ni = t)),
            gc);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : yc;
      },
    }),
    cm = kn(Ko),
    GS = v({}, Ko, { dataTransfer: 0 }),
    PS = kn(GS),
    XS = v({}, Mi, { relatedTarget: 0 }),
    bc = kn(XS),
    IS = v({}, Wr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    QS = kn(IS),
    KS = v({}, Wr, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    JS = kn(KS),
    WS = v({}, Wr, { data: 0 }),
    fm = kn(WS),
    eE = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    tE = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    nE = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function aE(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = nE[t]) ? !!n[t] : !1;
  }
  function _c() {
    return aE;
  }
  var rE = v({}, Mi, {
      key: function (t) {
        if (t.key) {
          var n = eE[t.key] || t.key;
          if (n !== "Unidentified") return n;
        }
        return t.type === "keypress"
          ? ((t = Xo(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
            ? tE[t.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: _c,
      charCode: function (t) {
        return t.type === "keypress" ? Xo(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? Xo(t)
          : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
      },
    }),
    lE = kn(rE),
    iE = v({}, Ko, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    dm = kn(iE),
    oE = v({}, Mi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: _c,
    }),
    sE = kn(oE),
    uE = v({}, Wr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    cE = kn(uE),
    fE = v({}, Ko, {
      deltaX: function (t) {
        return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
            ? -t.wheelDeltaY
            : "wheelDelta" in t
              ? -t.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    dE = kn(fE),
    hE = v({}, Wr, { newState: 0, oldState: 0 }),
    mE = kn(hE),
    pE = [9, 13, 27, 32],
    Sc = Ja && "CompositionEvent" in window,
    ki = null;
  Ja && "documentMode" in document && (ki = document.documentMode);
  var vE = Ja && "TextEvent" in window && !ki,
    hm = Ja && (!Sc || (ki && 8 < ki && 11 >= ki)),
    mm = " ",
    pm = !1;
  function vm(t, n) {
    switch (t) {
      case "keyup":
        return pE.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function gm(t) {
    return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
  }
  var kl = !1;
  function gE(t, n) {
    switch (t) {
      case "compositionend":
        return gm(n);
      case "keypress":
        return n.which !== 32 ? null : ((pm = !0), mm);
      case "textInput":
        return ((t = n.data), t === mm && pm ? null : t);
      default:
        return null;
    }
  }
  function yE(t, n) {
    if (kl)
      return t === "compositionend" || (!Sc && vm(t, n))
        ? ((t = sm()), (Po = vc = yr = null), (kl = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
          if (n.char && 1 < n.char.length) return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return hm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var bE = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function ym(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!bE[t.type] : n === "textarea";
  }
  function bm(t, n, l, o) {
    (Ml ? (Nl ? Nl.push(o) : (Nl = [o])) : (Ml = o),
      (n = Hs(n, "onChange")),
      0 < n.length &&
        ((l = new Qo("onChange", "change", null, l, o)), t.push({ event: l, listeners: n })));
  }
  var Li = null,
    Ui = null;
  function _E(t) {
    tg(t, 0);
  }
  function Jo(t) {
    var n = rt(t);
    if (Ol(n)) return t;
  }
  function _m(t, n) {
    if (t === "change") return n;
  }
  var Sm = !1;
  if (Ja) {
    var Ec;
    if (Ja) {
      var wc = "oninput" in document;
      if (!wc) {
        var Em = document.createElement("div");
        (Em.setAttribute("oninput", "return;"), (wc = typeof Em.oninput == "function"));
      }
      Ec = wc;
    } else Ec = !1;
    Sm = Ec && (!document.documentMode || 9 < document.documentMode);
  }
  function wm() {
    Li && (Li.detachEvent("onpropertychange", xm), (Ui = Li = null));
  }
  function xm(t) {
    if (t.propertyName === "value" && Jo(Ui)) {
      var n = [];
      (bm(n, Ui, t, hc(t)), om(_E, n));
    }
  }
  function SE(t, n, l) {
    t === "focusin"
      ? (wm(), (Li = n), (Ui = l), Li.attachEvent("onpropertychange", xm))
      : t === "focusout" && wm();
  }
  function EE(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown") return Jo(Ui);
  }
  function wE(t, n) {
    if (t === "click") return Jo(n);
  }
  function xE(t, n) {
    if (t === "input" || t === "change") return Jo(n);
  }
  function RE(t, n) {
    return (t === n && (t !== 0 || 1 / t === 1 / n)) || (t !== t && n !== n);
  }
  var Pn = typeof Object.is == "function" ? Object.is : RE;
  function ji(t, n) {
    if (Pn(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null) return !1;
    var l = Object.keys(t),
      o = Object.keys(n);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var f = l[o];
      if (!rn.call(n, f) || !Pn(t[f], n[f])) return !1;
    }
    return !0;
  }
  function Rm(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function zm(t, n) {
    var l = Rm(t);
    t = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (((o = t + l.textContent.length), t <= n && o >= n)) return { node: l, offset: n - t };
        t = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Rm(l);
    }
  }
  function Tm(t, n) {
    return t && n
      ? t === n
        ? !0
        : t && t.nodeType === 3
          ? !1
          : n && n.nodeType === 3
            ? Tm(t, n.parentNode)
            : "contains" in t
              ? t.contains(n)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(n) & 16)
                : !1
      : !1;
  }
  function Am(t) {
    t =
      t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var n = ht(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof n.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = n.contentWindow;
      else break;
      n = ht(t.document);
    }
    return n;
  }
  function xc(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      n &&
      ((n === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        n === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var zE = Ja && "documentMode" in document && 11 >= document.documentMode,
    Ll = null,
    Rc = null,
    Vi = null,
    zc = !1;
  function Om(t, n, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    zc ||
      Ll == null ||
      Ll !== ht(o) ||
      ((o = Ll),
      "selectionStart" in o && xc(o)
        ? (o = { start: o.selectionStart, end: o.selectionEnd })
        : ((o = ((o.ownerDocument && o.ownerDocument.defaultView) || window).getSelection()),
          (o = {
            anchorNode: o.anchorNode,
            anchorOffset: o.anchorOffset,
            focusNode: o.focusNode,
            focusOffset: o.focusOffset,
          })),
      (Vi && ji(Vi, o)) ||
        ((Vi = o),
        (o = Hs(Rc, "onSelect")),
        0 < o.length &&
          ((n = new Qo("onSelect", "select", null, n, l)),
          t.push({ event: n, listeners: o }),
          (n.target = Ll))));
  }
  function el(t, n) {
    var l = {};
    return (
      (l[t.toLowerCase()] = n.toLowerCase()),
      (l["Webkit" + t] = "webkit" + n),
      (l["Moz" + t] = "moz" + n),
      l
    );
  }
  var Ul = {
      animationend: el("Animation", "AnimationEnd"),
      animationiteration: el("Animation", "AnimationIteration"),
      animationstart: el("Animation", "AnimationStart"),
      transitionrun: el("Transition", "TransitionRun"),
      transitionstart: el("Transition", "TransitionStart"),
      transitioncancel: el("Transition", "TransitionCancel"),
      transitionend: el("Transition", "TransitionEnd"),
    },
    Tc = {},
    Cm = {};
  Ja &&
    ((Cm = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ul.animationend.animation,
      delete Ul.animationiteration.animation,
      delete Ul.animationstart.animation),
    "TransitionEvent" in window || delete Ul.transitionend.transition);
  function tl(t) {
    if (Tc[t]) return Tc[t];
    if (!Ul[t]) return t;
    var n = Ul[t],
      l;
    for (l in n) if (n.hasOwnProperty(l) && l in Cm) return (Tc[t] = n[l]);
    return t;
  }
  var Dm = tl("animationend"),
    Mm = tl("animationiteration"),
    Nm = tl("animationstart"),
    TE = tl("transitionrun"),
    AE = tl("transitionstart"),
    OE = tl("transitioncancel"),
    km = tl("transitionend"),
    Lm = new Map(),
    Ac =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Ac.push("scrollEnd");
  function Ra(t, n) {
    (Lm.set(t, n), Nn(n, [t]));
  }
  var Wo =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var n = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" && t !== null && typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(n)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          },
    sa = [],
    jl = 0,
    Oc = 0;
  function es() {
    for (var t = jl, n = (Oc = jl = 0); n < t; ) {
      var l = sa[n];
      sa[n++] = null;
      var o = sa[n];
      sa[n++] = null;
      var f = sa[n];
      sa[n++] = null;
      var d = sa[n];
      if (((sa[n++] = null), o !== null && f !== null)) {
        var g = o.pending;
        (g === null ? (f.next = f) : ((f.next = g.next), (g.next = f)), (o.pending = f));
      }
      d !== 0 && Um(l, f, d);
    }
  }
  function ts(t, n, l, o) {
    ((sa[jl++] = t),
      (sa[jl++] = n),
      (sa[jl++] = l),
      (sa[jl++] = o),
      (Oc |= o),
      (t.lanes |= o),
      (t = t.alternate),
      t !== null && (t.lanes |= o));
  }
  function Cc(t, n, l, o) {
    return (ts(t, n, l, o), ns(t));
  }
  function nl(t, n) {
    return (ts(t, null, null, n), ns(t));
  }
  function Um(t, n, l) {
    t.lanes |= l;
    var o = t.alternate;
    o !== null && (o.lanes |= l);
    for (var f = !1, d = t.return; d !== null; )
      ((d.childLanes |= l),
        (o = d.alternate),
        o !== null && (o.childLanes |= l),
        d.tag === 22 && ((t = d.stateNode), t === null || t._visibility & 1 || (f = !0)),
        (t = d),
        (d = d.return));
    return t.tag === 3
      ? ((d = t.stateNode),
        f &&
          n !== null &&
          ((f = 31 - ue(l)),
          (t = d.hiddenUpdates),
          (o = t[f]),
          o === null ? (t[f] = [n]) : o.push(n),
          (n.lane = l | 536870912)),
        d)
      : null;
  }
  function ns(t) {
    if (50 < io) throw ((io = 0), (Hf = null), Error(i(185)));
    for (var n = t.return; n !== null; ) ((t = n), (n = t.return));
    return t.tag === 3 ? t.stateNode : null;
  }
  var Vl = {};
  function CE(t, n, l, o) {
    ((this.tag = t),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = n),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = o),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Xn(t, n, l, o) {
    return new CE(t, n, l, o);
  }
  function Dc(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent));
  }
  function Wa(t, n) {
    var l = t.alternate;
    return (
      l === null
        ? ((l = Xn(t.tag, n, t.key, t.mode)),
          (l.elementType = t.elementType),
          (l.type = t.type),
          (l.stateNode = t.stateNode),
          (l.alternate = t),
          (t.alternate = l))
        : ((l.pendingProps = n),
          (l.type = t.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = t.flags & 65011712),
      (l.childLanes = t.childLanes),
      (l.lanes = t.lanes),
      (l.child = t.child),
      (l.memoizedProps = t.memoizedProps),
      (l.memoizedState = t.memoizedState),
      (l.updateQueue = t.updateQueue),
      (n = t.dependencies),
      (l.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
      (l.sibling = t.sibling),
      (l.index = t.index),
      (l.ref = t.ref),
      (l.refCleanup = t.refCleanup),
      l
    );
  }
  function jm(t, n) {
    t.flags &= 65011714;
    var l = t.alternate;
    return (
      l === null
        ? ((t.childLanes = 0),
          (t.lanes = n),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = l.childLanes),
          (t.lanes = l.lanes),
          (t.child = l.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = l.memoizedProps),
          (t.memoizedState = l.memoizedState),
          (t.updateQueue = l.updateQueue),
          (t.type = l.type),
          (n = l.dependencies),
          (t.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext })),
      t
    );
  }
  function as(t, n, l, o, f, d) {
    var g = 0;
    if (((o = t), typeof t == "function")) Dc(t) && (g = 1);
    else if (typeof t == "string")
      g = L1(t, l, J.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (t) {
        case me:
          return ((t = Xn(31, l, n, f)), (t.elementType = me), (t.lanes = d), t);
        case z:
          return al(l.children, f, d, n);
        case R:
          ((g = 8), (f |= 24));
          break;
        case j:
          return ((t = Xn(12, l, n, f | 2)), (t.elementType = j), (t.lanes = d), t);
        case G:
          return ((t = Xn(13, l, n, f)), (t.elementType = G), (t.lanes = d), t);
        case he:
          return ((t = Xn(19, l, n, f)), (t.elementType = he), (t.lanes = d), t);
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case F:
                g = 10;
                break e;
              case k:
                g = 9;
                break e;
              case $:
                g = 11;
                break e;
              case ce:
                g = 14;
                break e;
              case T:
                ((g = 16), (o = null));
                break e;
            }
          ((g = 29), (l = Error(i(130, t === null ? "null" : typeof t, ""))), (o = null));
      }
    return ((n = Xn(g, l, n, f)), (n.elementType = t), (n.type = o), (n.lanes = d), n);
  }
  function al(t, n, l, o) {
    return ((t = Xn(7, t, o, n)), (t.lanes = l), t);
  }
  function Mc(t, n, l) {
    return ((t = Xn(6, t, null, n)), (t.lanes = l), t);
  }
  function Vm(t) {
    var n = Xn(18, null, null, 0);
    return ((n.stateNode = t), n);
  }
  function Nc(t, n, l) {
    return (
      (n = Xn(4, t.children !== null ? t.children : [], t.key, n)),
      (n.lanes = l),
      (n.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      n
    );
  }
  var Bm = new WeakMap();
  function ua(t, n) {
    if (typeof t == "object" && t !== null) {
      var l = Bm.get(t);
      return l !== void 0 ? l : ((n = { value: t, source: n, stack: Sa(n) }), Bm.set(t, n), n);
    }
    return { value: t, source: n, stack: Sa(n) };
  }
  var Bl = [],
    Hl = 0,
    rs = null,
    Bi = 0,
    ca = [],
    fa = 0,
    br = null,
    La = 1,
    Ua = "";
  function er(t, n) {
    ((Bl[Hl++] = Bi), (Bl[Hl++] = rs), (rs = t), (Bi = n));
  }
  function Hm(t, n, l) {
    ((ca[fa++] = La), (ca[fa++] = Ua), (ca[fa++] = br), (br = t));
    var o = La;
    t = Ua;
    var f = 32 - ue(o) - 1;
    ((o &= ~(1 << f)), (l += 1));
    var d = 32 - ue(n) + f;
    if (30 < d) {
      var g = f - (f % 5);
      ((d = (o & ((1 << g) - 1)).toString(32)),
        (o >>= g),
        (f -= g),
        (La = (1 << (32 - ue(n) + f)) | (l << f) | o),
        (Ua = d + t));
    } else ((La = (1 << d) | (l << f) | o), (Ua = t));
  }
  function kc(t) {
    t.return !== null && (er(t, 1), Hm(t, 1, 0));
  }
  function Lc(t) {
    for (; t === rs; ) ((rs = Bl[--Hl]), (Bl[Hl] = null), (Bi = Bl[--Hl]), (Bl[Hl] = null));
    for (; t === br; )
      ((br = ca[--fa]),
        (ca[fa] = null),
        (Ua = ca[--fa]),
        (ca[fa] = null),
        (La = ca[--fa]),
        (ca[fa] = null));
  }
  function Zm(t, n) {
    ((ca[fa++] = La), (ca[fa++] = Ua), (ca[fa++] = br), (La = n.id), (Ua = n.overflow), (br = t));
  }
  var pn = null,
    Tt = null,
    at = !1,
    _r = null,
    da = !1,
    Uc = Error(i(519));
  function Sr(t) {
    var n = Error(
      i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""),
    );
    throw (Hi(ua(n, t)), Uc);
  }
  function $m(t) {
    var n = t.stateNode,
      l = t.type,
      o = t.memoizedProps;
    switch (((n[Se] = t), (n[we] = o), l)) {
      case "dialog":
        (et("cancel", n), et("close", n));
        break;
      case "iframe":
      case "object":
      case "embed":
        et("load", n);
        break;
      case "video":
      case "audio":
        for (l = 0; l < so.length; l++) et(so[l], n);
        break;
      case "source":
        et("error", n);
        break;
      case "img":
      case "image":
      case "link":
        (et("error", n), et("load", n));
        break;
      case "details":
        et("toggle", n);
        break;
      case "input":
        (et("invalid", n),
          tm(n, o.value, o.defaultValue, o.checked, o.defaultChecked, o.type, o.name, !0));
        break;
      case "select":
        et("invalid", n);
        break;
      case "textarea":
        (et("invalid", n), am(n, o.value, o.defaultValue, o.children));
    }
    ((l = o.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      n.textContent === "" + l ||
      o.suppressHydrationWarning === !0 ||
      lg(n.textContent, l)
        ? (o.popover != null && (et("beforetoggle", n), et("toggle", n)),
          o.onScroll != null && et("scroll", n),
          o.onScrollEnd != null && et("scrollend", n),
          o.onClick != null && (n.onclick = Ka),
          (n = !0))
        : (n = !1),
      n || Sr(t, !0));
  }
  function Ym(t) {
    for (pn = t.return; pn; )
      switch (pn.tag) {
        case 5:
        case 31:
        case 13:
          da = !1;
          return;
        case 27:
        case 3:
          da = !0;
          return;
        default:
          pn = pn.return;
      }
  }
  function Zl(t) {
    if (t !== pn) return !1;
    if (!at) return (Ym(t), (at = !0), !1);
    var n = t.tag,
      l;
    if (
      ((l = n !== 3 && n !== 27) &&
        ((l = n === 5) &&
          ((l = t.type), (l = !(l !== "form" && l !== "button") || td(t.type, t.memoizedProps))),
        (l = !l)),
      l && Tt && Sr(t),
      Ym(t),
      n === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(i(317));
      Tt = mg(t);
    } else if (n === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t)) throw Error(i(317));
      Tt = mg(t);
    } else
      n === 27
        ? ((n = Tt), Lr(t.type) ? ((t = id), (id = null), (Tt = t)) : (Tt = n))
        : (Tt = pn ? ma(t.stateNode.nextSibling) : null);
    return !0;
  }
  function rl() {
    ((Tt = pn = null), (at = !1));
  }
  function jc() {
    var t = _r;
    return (t !== null && (Vn === null ? (Vn = t) : Vn.push.apply(Vn, t), (_r = null)), t);
  }
  function Hi(t) {
    _r === null ? (_r = [t]) : _r.push(t);
  }
  var Vc = O(null),
    ll = null,
    tr = null;
  function Er(t, n, l) {
    (q(Vc, n._currentValue), (n._currentValue = l));
  }
  function nr(t) {
    ((t._currentValue = Vc.current), I(Vc));
  }
  function Bc(t, n, l) {
    for (; t !== null; ) {
      var o = t.alternate;
      if (
        ((t.childLanes & n) !== n
          ? ((t.childLanes |= n), o !== null && (o.childLanes |= n))
          : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n),
        t === l)
      )
        break;
      t = t.return;
    }
  }
  function Hc(t, n, l, o) {
    var f = t.child;
    for (f !== null && (f.return = t); f !== null; ) {
      var d = f.dependencies;
      if (d !== null) {
        var g = f.child;
        d = d.firstContext;
        e: for (; d !== null; ) {
          var b = d;
          d = f;
          for (var C = 0; C < n.length; C++)
            if (b.context === n[C]) {
              ((d.lanes |= l),
                (b = d.alternate),
                b !== null && (b.lanes |= l),
                Bc(d.return, l, t),
                o || (g = null));
              break e;
            }
          d = b.next;
        }
      } else if (f.tag === 18) {
        if (((g = f.return), g === null)) throw Error(i(341));
        ((g.lanes |= l), (d = g.alternate), d !== null && (d.lanes |= l), Bc(g, l, t), (g = null));
      } else g = f.child;
      if (g !== null) g.return = f;
      else
        for (g = f; g !== null; ) {
          if (g === t) {
            g = null;
            break;
          }
          if (((f = g.sibling), f !== null)) {
            ((f.return = g.return), (g = f));
            break;
          }
          g = g.return;
        }
      f = g;
    }
  }
  function $l(t, n, l, o) {
    t = null;
    for (var f = n, d = !1; f !== null; ) {
      if (!d) {
        if ((f.flags & 524288) !== 0) d = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var g = f.alternate;
        if (g === null) throw Error(i(387));
        if (((g = g.memoizedProps), g !== null)) {
          var b = f.type;
          Pn(f.pendingProps.value, g.value) || (t !== null ? t.push(b) : (t = [b]));
        }
      } else if (f === Me.current) {
        if (((g = f.alternate), g === null)) throw Error(i(387));
        g.memoizedState.memoizedState !== f.memoizedState.memoizedState &&
          (t !== null ? t.push(mo) : (t = [mo]));
      }
      f = f.return;
    }
    (t !== null && Hc(n, t, l, o), (n.flags |= 262144));
  }
  function ls(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Pn(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function il(t) {
    ((ll = t), (tr = null), (t = t.dependencies), t !== null && (t.firstContext = null));
  }
  function vn(t) {
    return Fm(ll, t);
  }
  function is(t, n) {
    return (ll === null && il(t), Fm(t, n));
  }
  function Fm(t, n) {
    var l = n._currentValue;
    if (((n = { context: n, memoizedValue: l, next: null }), tr === null)) {
      if (t === null) throw Error(i(308));
      ((tr = n), (t.dependencies = { lanes: 0, firstContext: n }), (t.flags |= 524288));
    } else tr = tr.next = n;
    return l;
  }
  var DE =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              n = (this.signal = {
                aborted: !1,
                addEventListener: function (l, o) {
                  t.push(o);
                },
              });
            this.abort = function () {
              ((n.aborted = !0),
                t.forEach(function (l) {
                  return l();
                }));
            };
          },
    ME = e.unstable_scheduleCallback,
    NE = e.unstable_NormalPriority,
    Kt = {
      $$typeof: F,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Zc() {
    return { controller: new DE(), data: new Map(), refCount: 0 };
  }
  function Zi(t) {
    (t.refCount--,
      t.refCount === 0 &&
        ME(NE, function () {
          t.controller.abort();
        }));
  }
  var $i = null,
    $c = 0,
    Yl = 0,
    Fl = null;
  function kE(t, n) {
    if ($i === null) {
      var l = ($i = []);
      (($c = 0),
        (Yl = Gf()),
        (Fl = {
          status: "pending",
          value: void 0,
          then: function (o) {
            l.push(o);
          },
        }));
    }
    return ($c++, n.then(qm, qm), n);
  }
  function qm() {
    if (--$c === 0 && $i !== null) {
      Fl !== null && (Fl.status = "fulfilled");
      var t = $i;
      (($i = null), (Yl = 0), (Fl = null));
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function LE(t, n) {
    var l = [],
      o = {
        status: "pending",
        value: null,
        reason: null,
        then: function (f) {
          l.push(f);
        },
      };
    return (
      t.then(
        function () {
          ((o.status = "fulfilled"), (o.value = n));
          for (var f = 0; f < l.length; f++) (0, l[f])(n);
        },
        function (f) {
          for (o.status = "rejected", o.reason = f, f = 0; f < l.length; f++) (0, l[f])(void 0);
        },
      ),
      o
    );
  }
  var Gm = D.S;
  D.S = function (t, n) {
    ((Ov = Xt()),
      typeof n == "object" && n !== null && typeof n.then == "function" && kE(t, n),
      Gm !== null && Gm(t, n));
  };
  var ol = O(null);
  function Yc() {
    var t = ol.current;
    return t !== null ? t : wt.pooledCache;
  }
  function os(t, n) {
    n === null ? q(ol, ol.current) : q(ol, n.pool);
  }
  function Pm() {
    var t = Yc();
    return t === null ? null : { parent: Kt._currentValue, pool: t };
  }
  var ql = Error(i(460)),
    Fc = Error(i(474)),
    ss = Error(i(542)),
    us = { then: function () {} };
  function Xm(t) {
    return ((t = t.status), t === "fulfilled" || t === "rejected");
  }
  function Im(t, n, l) {
    switch (
      ((l = t[l]), l === void 0 ? t.push(n) : l !== n && (n.then(Ka, Ka), (n = l)), n.status)
    ) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw ((t = n.reason), Km(t), t);
      default:
        if (typeof n.status == "string") n.then(Ka, Ka);
        else {
          if (((t = wt), t !== null && 100 < t.shellSuspendCounter)) throw Error(i(482));
          ((t = n),
            (t.status = "pending"),
            t.then(
              function (o) {
                if (n.status === "pending") {
                  var f = n;
                  ((f.status = "fulfilled"), (f.value = o));
                }
              },
              function (o) {
                if (n.status === "pending") {
                  var f = n;
                  ((f.status = "rejected"), (f.reason = o));
                }
              },
            ));
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw ((t = n.reason), Km(t), t);
        }
        throw ((ul = n), ql);
    }
  }
  function sl(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? ((ul = l), ql) : l;
    }
  }
  var ul = null;
  function Qm() {
    if (ul === null) throw Error(i(459));
    var t = ul;
    return ((ul = null), t);
  }
  function Km(t) {
    if (t === ql || t === ss) throw Error(i(483));
  }
  var Gl = null,
    Yi = 0;
  function cs(t) {
    var n = Yi;
    return ((Yi += 1), Gl === null && (Gl = []), Im(Gl, t, n));
  }
  function Fi(t, n) {
    ((n = n.props.ref), (t.ref = n !== void 0 ? n : null));
  }
  function fs(t, n) {
    throw n.$$typeof === S
      ? Error(i(525))
      : ((t = Object.prototype.toString.call(n)),
        Error(
          i(
            31,
            t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t,
          ),
        ));
  }
  function Jm(t) {
    function n(U, M) {
      if (t) {
        var H = U.deletions;
        H === null ? ((U.deletions = [M]), (U.flags |= 16)) : H.push(M);
      }
    }
    function l(U, M) {
      if (!t) return null;
      for (; M !== null; ) (n(U, M), (M = M.sibling));
      return null;
    }
    function o(U) {
      for (var M = new Map(); U !== null; )
        (U.key !== null ? M.set(U.key, U) : M.set(U.index, U), (U = U.sibling));
      return M;
    }
    function f(U, M) {
      return ((U = Wa(U, M)), (U.index = 0), (U.sibling = null), U);
    }
    function d(U, M, H) {
      return (
        (U.index = H),
        t
          ? ((H = U.alternate),
            H !== null
              ? ((H = H.index), H < M ? ((U.flags |= 67108866), M) : H)
              : ((U.flags |= 67108866), M))
          : ((U.flags |= 1048576), M)
      );
    }
    function g(U) {
      return (t && U.alternate === null && (U.flags |= 67108866), U);
    }
    function b(U, M, H, te) {
      return M === null || M.tag !== 6
        ? ((M = Mc(H, U.mode, te)), (M.return = U), M)
        : ((M = f(M, H)), (M.return = U), M);
    }
    function C(U, M, H, te) {
      var ke = H.type;
      return ke === z
        ? W(U, M, H.props.children, te, H.key)
        : M !== null &&
            (M.elementType === ke ||
              (typeof ke == "object" && ke !== null && ke.$$typeof === T && sl(ke) === M.type))
          ? ((M = f(M, H.props)), Fi(M, H), (M.return = U), M)
          : ((M = as(H.type, H.key, H.props, null, U.mode, te)), Fi(M, H), (M.return = U), M);
    }
    function Z(U, M, H, te) {
      return M === null ||
        M.tag !== 4 ||
        M.stateNode.containerInfo !== H.containerInfo ||
        M.stateNode.implementation !== H.implementation
        ? ((M = Nc(H, U.mode, te)), (M.return = U), M)
        : ((M = f(M, H.children || [])), (M.return = U), M);
    }
    function W(U, M, H, te, ke) {
      return M === null || M.tag !== 7
        ? ((M = al(H, U.mode, te, ke)), (M.return = U), M)
        : ((M = f(M, H)), (M.return = U), M);
    }
    function ae(U, M, H) {
      if ((typeof M == "string" && M !== "") || typeof M == "number" || typeof M == "bigint")
        return ((M = Mc("" + M, U.mode, H)), (M.return = U), M);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case E:
            return ((H = as(M.type, M.key, M.props, null, U.mode, H)), Fi(H, M), (H.return = U), H);
          case w:
            return ((M = Nc(M, U.mode, H)), (M.return = U), M);
          case T:
            return ((M = sl(M)), ae(U, M, H));
        }
        if (xe(M) || fe(M)) return ((M = al(M, U.mode, H, null)), (M.return = U), M);
        if (typeof M.then == "function") return ae(U, cs(M), H);
        if (M.$$typeof === F) return ae(U, is(U, M), H);
        fs(U, M);
      }
      return null;
    }
    function Y(U, M, H, te) {
      var ke = M !== null ? M.key : null;
      if ((typeof H == "string" && H !== "") || typeof H == "number" || typeof H == "bigint")
        return ke !== null ? null : b(U, M, "" + H, te);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case E:
            return H.key === ke ? C(U, M, H, te) : null;
          case w:
            return H.key === ke ? Z(U, M, H, te) : null;
          case T:
            return ((H = sl(H)), Y(U, M, H, te));
        }
        if (xe(H) || fe(H)) return ke !== null ? null : W(U, M, H, te, null);
        if (typeof H.then == "function") return Y(U, M, cs(H), te);
        if (H.$$typeof === F) return Y(U, M, is(U, H), te);
        fs(U, H);
      }
      return null;
    }
    function P(U, M, H, te, ke) {
      if ((typeof te == "string" && te !== "") || typeof te == "number" || typeof te == "bigint")
        return ((U = U.get(H) || null), b(M, U, "" + te, ke));
      if (typeof te == "object" && te !== null) {
        switch (te.$$typeof) {
          case E:
            return ((U = U.get(te.key === null ? H : te.key) || null), C(M, U, te, ke));
          case w:
            return ((U = U.get(te.key === null ? H : te.key) || null), Z(M, U, te, ke));
          case T:
            return ((te = sl(te)), P(U, M, H, te, ke));
        }
        if (xe(te) || fe(te)) return ((U = U.get(H) || null), W(M, U, te, ke, null));
        if (typeof te.then == "function") return P(U, M, H, cs(te), ke);
        if (te.$$typeof === F) return P(U, M, H, is(M, te), ke);
        fs(M, te);
      }
      return null;
    }
    function Ce(U, M, H, te) {
      for (
        var ke = null, ot = null, De = M, Xe = (M = 0), nt = null;
        De !== null && Xe < H.length;
        Xe++
      ) {
        De.index > Xe ? ((nt = De), (De = null)) : (nt = De.sibling);
        var st = Y(U, De, H[Xe], te);
        if (st === null) {
          De === null && (De = nt);
          break;
        }
        (t && De && st.alternate === null && n(U, De),
          (M = d(st, M, Xe)),
          ot === null ? (ke = st) : (ot.sibling = st),
          (ot = st),
          (De = nt));
      }
      if (Xe === H.length) return (l(U, De), at && er(U, Xe), ke);
      if (De === null) {
        for (; Xe < H.length; Xe++)
          ((De = ae(U, H[Xe], te)),
            De !== null &&
              ((M = d(De, M, Xe)), ot === null ? (ke = De) : (ot.sibling = De), (ot = De)));
        return (at && er(U, Xe), ke);
      }
      for (De = o(De); Xe < H.length; Xe++)
        ((nt = P(De, U, Xe, H[Xe], te)),
          nt !== null &&
            (t && nt.alternate !== null && De.delete(nt.key === null ? Xe : nt.key),
            (M = d(nt, M, Xe)),
            ot === null ? (ke = nt) : (ot.sibling = nt),
            (ot = nt)));
      return (
        t &&
          De.forEach(function (Hr) {
            return n(U, Hr);
          }),
        at && er(U, Xe),
        ke
      );
    }
    function Ze(U, M, H, te) {
      if (H == null) throw Error(i(151));
      for (
        var ke = null, ot = null, De = M, Xe = (M = 0), nt = null, st = H.next();
        De !== null && !st.done;
        Xe++, st = H.next()
      ) {
        De.index > Xe ? ((nt = De), (De = null)) : (nt = De.sibling);
        var Hr = Y(U, De, st.value, te);
        if (Hr === null) {
          De === null && (De = nt);
          break;
        }
        (t && De && Hr.alternate === null && n(U, De),
          (M = d(Hr, M, Xe)),
          ot === null ? (ke = Hr) : (ot.sibling = Hr),
          (ot = Hr),
          (De = nt));
      }
      if (st.done) return (l(U, De), at && er(U, Xe), ke);
      if (De === null) {
        for (; !st.done; Xe++, st = H.next())
          ((st = ae(U, st.value, te)),
            st !== null &&
              ((M = d(st, M, Xe)), ot === null ? (ke = st) : (ot.sibling = st), (ot = st)));
        return (at && er(U, Xe), ke);
      }
      for (De = o(De); !st.done; Xe++, st = H.next())
        ((st = P(De, U, Xe, st.value, te)),
          st !== null &&
            (t && st.alternate !== null && De.delete(st.key === null ? Xe : st.key),
            (M = d(st, M, Xe)),
            ot === null ? (ke = st) : (ot.sibling = st),
            (ot = st)));
      return (
        t &&
          De.forEach(function (G1) {
            return n(U, G1);
          }),
        at && er(U, Xe),
        ke
      );
    }
    function bt(U, M, H, te) {
      if (
        (typeof H == "object" &&
          H !== null &&
          H.type === z &&
          H.key === null &&
          (H = H.props.children),
        typeof H == "object" && H !== null)
      ) {
        switch (H.$$typeof) {
          case E:
            e: {
              for (var ke = H.key; M !== null; ) {
                if (M.key === ke) {
                  if (((ke = H.type), ke === z)) {
                    if (M.tag === 7) {
                      (l(U, M.sibling), (te = f(M, H.props.children)), (te.return = U), (U = te));
                      break e;
                    }
                  } else if (
                    M.elementType === ke ||
                    (typeof ke == "object" && ke !== null && ke.$$typeof === T && sl(ke) === M.type)
                  ) {
                    (l(U, M.sibling), (te = f(M, H.props)), Fi(te, H), (te.return = U), (U = te));
                    break e;
                  }
                  l(U, M);
                  break;
                } else n(U, M);
                M = M.sibling;
              }
              H.type === z
                ? ((te = al(H.props.children, U.mode, te, H.key)), (te.return = U), (U = te))
                : ((te = as(H.type, H.key, H.props, null, U.mode, te)),
                  Fi(te, H),
                  (te.return = U),
                  (U = te));
            }
            return g(U);
          case w:
            e: {
              for (ke = H.key; M !== null; ) {
                if (M.key === ke)
                  if (
                    M.tag === 4 &&
                    M.stateNode.containerInfo === H.containerInfo &&
                    M.stateNode.implementation === H.implementation
                  ) {
                    (l(U, M.sibling), (te = f(M, H.children || [])), (te.return = U), (U = te));
                    break e;
                  } else {
                    l(U, M);
                    break;
                  }
                else n(U, M);
                M = M.sibling;
              }
              ((te = Nc(H, U.mode, te)), (te.return = U), (U = te));
            }
            return g(U);
          case T:
            return ((H = sl(H)), bt(U, M, H, te));
        }
        if (xe(H)) return Ce(U, M, H, te);
        if (fe(H)) {
          if (((ke = fe(H)), typeof ke != "function")) throw Error(i(150));
          return ((H = ke.call(H)), Ze(U, M, H, te));
        }
        if (typeof H.then == "function") return bt(U, M, cs(H), te);
        if (H.$$typeof === F) return bt(U, M, is(U, H), te);
        fs(U, H);
      }
      return (typeof H == "string" && H !== "") || typeof H == "number" || typeof H == "bigint"
        ? ((H = "" + H),
          M !== null && M.tag === 6
            ? (l(U, M.sibling), (te = f(M, H)), (te.return = U), (U = te))
            : (l(U, M), (te = Mc(H, U.mode, te)), (te.return = U), (U = te)),
          g(U))
        : l(U, M);
    }
    return function (U, M, H, te) {
      try {
        Yi = 0;
        var ke = bt(U, M, H, te);
        return ((Gl = null), ke);
      } catch (De) {
        if (De === ql || De === ss) throw De;
        var ot = Xn(29, De, null, U.mode);
        return ((ot.lanes = te), (ot.return = U), ot);
      }
    };
  }
  var cl = Jm(!0),
    Wm = Jm(!1),
    wr = !1;
  function qc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Gc(t, n) {
    ((t = t.updateQueue),
      n.updateQueue === t &&
        (n.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }));
  }
  function xr(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Rr(t, n, l) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (((o = o.shared), (ut & 2) !== 0)) {
      var f = o.pending;
      return (
        f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)),
        (o.pending = n),
        (n = ns(t)),
        Um(t, null, l),
        n
      );
    }
    return (ts(t, o, n, l), ns(t));
  }
  function qi(t, n, l) {
    if (((n = n.updateQueue), n !== null && ((n = n.shared), (l & 4194048) !== 0))) {
      var o = n.lanes;
      ((o &= t.pendingLanes), (l |= o), (n.lanes = l), En(t, l));
    }
  }
  function Pc(t, n) {
    var l = t.updateQueue,
      o = t.alternate;
    if (o !== null && ((o = o.updateQueue), l === o)) {
      var f = null,
        d = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var g = { lane: l.lane, tag: l.tag, payload: l.payload, callback: null, next: null };
          (d === null ? (f = d = g) : (d = d.next = g), (l = l.next));
        } while (l !== null);
        d === null ? (f = d = n) : (d = d.next = n);
      } else f = d = n;
      ((l = {
        baseState: o.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: d,
        shared: o.shared,
        callbacks: o.callbacks,
      }),
        (t.updateQueue = l));
      return;
    }
    ((t = l.lastBaseUpdate),
      t === null ? (l.firstBaseUpdate = n) : (t.next = n),
      (l.lastBaseUpdate = n));
  }
  var Xc = !1;
  function Gi() {
    if (Xc) {
      var t = Fl;
      if (t !== null) throw t;
    }
  }
  function Pi(t, n, l, o) {
    Xc = !1;
    var f = t.updateQueue;
    wr = !1;
    var d = f.firstBaseUpdate,
      g = f.lastBaseUpdate,
      b = f.shared.pending;
    if (b !== null) {
      f.shared.pending = null;
      var C = b,
        Z = C.next;
      ((C.next = null), g === null ? (d = Z) : (g.next = Z), (g = C));
      var W = t.alternate;
      W !== null &&
        ((W = W.updateQueue),
        (b = W.lastBaseUpdate),
        b !== g && (b === null ? (W.firstBaseUpdate = Z) : (b.next = Z), (W.lastBaseUpdate = C)));
    }
    if (d !== null) {
      var ae = f.baseState;
      ((g = 0), (W = Z = C = null), (b = d));
      do {
        var Y = b.lane & -536870913,
          P = Y !== b.lane;
        if (P ? (tt & Y) === Y : (o & Y) === Y) {
          (Y !== 0 && Y === Yl && (Xc = !0),
            W !== null &&
              (W = W.next =
                { lane: 0, tag: b.tag, payload: b.payload, callback: null, next: null }));
          e: {
            var Ce = t,
              Ze = b;
            Y = n;
            var bt = l;
            switch (Ze.tag) {
              case 1:
                if (((Ce = Ze.payload), typeof Ce == "function")) {
                  ae = Ce.call(bt, ae, Y);
                  break e;
                }
                ae = Ce;
                break e;
              case 3:
                Ce.flags = (Ce.flags & -65537) | 128;
              case 0:
                if (
                  ((Ce = Ze.payload),
                  (Y = typeof Ce == "function" ? Ce.call(bt, ae, Y) : Ce),
                  Y == null)
                )
                  break e;
                ae = v({}, ae, Y);
                break e;
              case 2:
                wr = !0;
            }
          }
          ((Y = b.callback),
            Y !== null &&
              ((t.flags |= 64),
              P && (t.flags |= 8192),
              (P = f.callbacks),
              P === null ? (f.callbacks = [Y]) : P.push(Y)));
        } else
          ((P = { lane: Y, tag: b.tag, payload: b.payload, callback: b.callback, next: null }),
            W === null ? ((Z = W = P), (C = ae)) : (W = W.next = P),
            (g |= Y));
        if (((b = b.next), b === null)) {
          if (((b = f.shared.pending), b === null)) break;
          ((P = b),
            (b = P.next),
            (P.next = null),
            (f.lastBaseUpdate = P),
            (f.shared.pending = null));
        }
      } while (!0);
      (W === null && (C = ae),
        (f.baseState = C),
        (f.firstBaseUpdate = Z),
        (f.lastBaseUpdate = W),
        d === null && (f.shared.lanes = 0),
        (Cr |= g),
        (t.lanes = g),
        (t.memoizedState = ae));
    }
  }
  function ep(t, n) {
    if (typeof t != "function") throw Error(i(191, t));
    t.call(n);
  }
  function tp(t, n) {
    var l = t.callbacks;
    if (l !== null) for (t.callbacks = null, t = 0; t < l.length; t++) ep(l[t], n);
  }
  var Pl = O(null),
    ds = O(0);
  function np(t, n) {
    ((t = fr), q(ds, t), q(Pl, n), (fr = t | n.baseLanes));
  }
  function Ic() {
    (q(ds, fr), q(Pl, Pl.current));
  }
  function Qc() {
    ((fr = ds.current), I(Pl), I(ds));
  }
  var In = O(null),
    ha = null;
  function zr(t) {
    var n = t.alternate;
    (q(qt, qt.current & 1),
      q(In, t),
      ha === null && (n === null || Pl.current !== null || n.memoizedState !== null) && (ha = t));
  }
  function Kc(t) {
    (q(qt, qt.current), q(In, t), ha === null && (ha = t));
  }
  function ap(t) {
    t.tag === 22 ? (q(qt, qt.current), q(In, t), ha === null && (ha = t)) : Tr();
  }
  function Tr() {
    (q(qt, qt.current), q(In, In.current));
  }
  function Qn(t) {
    (I(In), ha === t && (ha = null), I(qt));
  }
  var qt = O(0);
  function hs(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var l = n.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || rd(l) || ld(l))) return n;
      } else if (
        n.tag === 19 &&
        (n.memoizedProps.revealOrder === "forwards" ||
          n.memoizedProps.revealOrder === "backwards" ||
          n.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          n.memoizedProps.revealOrder === "together")
      ) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        ((n.child.return = n), (n = n.child));
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return null;
        n = n.return;
      }
      ((n.sibling.return = n.return), (n = n.sibling));
    }
    return null;
  }
  var ar = 0,
    Pe = null,
    gt = null,
    Jt = null,
    ms = !1,
    Xl = !1,
    fl = !1,
    ps = 0,
    Xi = 0,
    Il = null,
    UE = 0;
  function Bt() {
    throw Error(i(321));
  }
  function Jc(t, n) {
    if (n === null) return !1;
    for (var l = 0; l < n.length && l < t.length; l++) if (!Pn(t[l], n[l])) return !1;
    return !0;
  }
  function Wc(t, n, l, o, f, d) {
    return (
      (ar = d),
      (Pe = n),
      (n.memoizedState = null),
      (n.updateQueue = null),
      (n.lanes = 0),
      (D.H = t === null || t.memoizedState === null ? Hp : pf),
      (fl = !1),
      (d = l(o, f)),
      (fl = !1),
      Xl && (d = lp(n, l, o, f)),
      rp(t),
      d
    );
  }
  function rp(t) {
    D.H = Ki;
    var n = gt !== null && gt.next !== null;
    if (((ar = 0), (Jt = gt = Pe = null), (ms = !1), (Xi = 0), (Il = null), n)) throw Error(i(300));
    t === null || Wt || ((t = t.dependencies), t !== null && ls(t) && (Wt = !0));
  }
  function lp(t, n, l, o) {
    Pe = t;
    var f = 0;
    do {
      if ((Xl && (Il = null), (Xi = 0), (Xl = !1), 25 <= f)) throw Error(i(301));
      if (((f += 1), (Jt = gt = null), t.updateQueue != null)) {
        var d = t.updateQueue;
        ((d.lastEffect = null),
          (d.events = null),
          (d.stores = null),
          d.memoCache != null && (d.memoCache.index = 0));
      }
      ((D.H = Zp), (d = n(l, o)));
    } while (Xl);
    return d;
  }
  function jE() {
    var t = D.H,
      n = t.useState()[0];
    return (
      (n = typeof n.then == "function" ? Ii(n) : n),
      (t = t.useState()[0]),
      (gt !== null ? gt.memoizedState : null) !== t && (Pe.flags |= 1024),
      n
    );
  }
  function ef() {
    var t = ps !== 0;
    return ((ps = 0), t);
  }
  function tf(t, n, l) {
    ((n.updateQueue = t.updateQueue), (n.flags &= -2053), (t.lanes &= ~l));
  }
  function nf(t) {
    if (ms) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        (n !== null && (n.pending = null), (t = t.next));
      }
      ms = !1;
    }
    ((ar = 0), (Jt = gt = Pe = null), (Xl = !1), (Xi = ps = 0), (Il = null));
  }
  function Cn() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Jt === null ? (Pe.memoizedState = Jt = t) : (Jt = Jt.next = t), Jt);
  }
  function Gt() {
    if (gt === null) {
      var t = Pe.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = gt.next;
    var n = Jt === null ? Pe.memoizedState : Jt.next;
    if (n !== null) ((Jt = n), (gt = t));
    else {
      if (t === null) throw Pe.alternate === null ? Error(i(467)) : Error(i(310));
      ((gt = t),
        (t = {
          memoizedState: gt.memoizedState,
          baseState: gt.baseState,
          baseQueue: gt.baseQueue,
          queue: gt.queue,
          next: null,
        }),
        Jt === null ? (Pe.memoizedState = Jt = t) : (Jt = Jt.next = t));
    }
    return Jt;
  }
  function vs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ii(t) {
    var n = Xi;
    return (
      (Xi += 1),
      Il === null && (Il = []),
      (t = Im(Il, t, n)),
      (n = Pe),
      (Jt === null ? n.memoizedState : Jt.next) === null &&
        ((n = n.alternate), (D.H = n === null || n.memoizedState === null ? Hp : pf)),
      t
    );
  }
  function gs(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ii(t);
      if (t.$$typeof === F) return vn(t);
    }
    throw Error(i(438, String(t)));
  }
  function af(t) {
    var n = null,
      l = Pe.updateQueue;
    if ((l !== null && (n = l.memoCache), n == null)) {
      var o = Pe.alternate;
      o !== null &&
        ((o = o.updateQueue),
        o !== null &&
          ((o = o.memoCache),
          o != null &&
            (n = {
              data: o.data.map(function (f) {
                return f.slice();
              }),
              index: 0,
            })));
    }
    if (
      (n == null && (n = { data: [], index: 0 }),
      l === null && ((l = vs()), (Pe.updateQueue = l)),
      (l.memoCache = n),
      (l = n.data[n.index]),
      l === void 0)
    )
      for (l = n.data[n.index] = Array(t), o = 0; o < t; o++) l[o] = Oe;
    return (n.index++, l);
  }
  function rr(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function ys(t) {
    var n = Gt();
    return rf(n, gt, t);
  }
  function rf(t, n, l) {
    var o = t.queue;
    if (o === null) throw Error(i(311));
    o.lastRenderedReducer = l;
    var f = t.baseQueue,
      d = o.pending;
    if (d !== null) {
      if (f !== null) {
        var g = f.next;
        ((f.next = d.next), (d.next = g));
      }
      ((n.baseQueue = f = d), (o.pending = null));
    }
    if (((d = t.baseState), f === null)) t.memoizedState = d;
    else {
      n = f.next;
      var b = (g = null),
        C = null,
        Z = n,
        W = !1;
      do {
        var ae = Z.lane & -536870913;
        if (ae !== Z.lane ? (tt & ae) === ae : (ar & ae) === ae) {
          var Y = Z.revertLane;
          if (Y === 0)
            (C !== null &&
              (C = C.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: Z.action,
                  hasEagerState: Z.hasEagerState,
                  eagerState: Z.eagerState,
                  next: null,
                }),
              ae === Yl && (W = !0));
          else if ((ar & Y) === Y) {
            ((Z = Z.next), Y === Yl && (W = !0));
            continue;
          } else
            ((ae = {
              lane: 0,
              revertLane: Z.revertLane,
              gesture: null,
              action: Z.action,
              hasEagerState: Z.hasEagerState,
              eagerState: Z.eagerState,
              next: null,
            }),
              C === null ? ((b = C = ae), (g = d)) : (C = C.next = ae),
              (Pe.lanes |= Y),
              (Cr |= Y));
          ((ae = Z.action), fl && l(d, ae), (d = Z.hasEagerState ? Z.eagerState : l(d, ae)));
        } else
          ((Y = {
            lane: ae,
            revertLane: Z.revertLane,
            gesture: Z.gesture,
            action: Z.action,
            hasEagerState: Z.hasEagerState,
            eagerState: Z.eagerState,
            next: null,
          }),
            C === null ? ((b = C = Y), (g = d)) : (C = C.next = Y),
            (Pe.lanes |= ae),
            (Cr |= ae));
        Z = Z.next;
      } while (Z !== null && Z !== n);
      if (
        (C === null ? (g = d) : (C.next = b),
        !Pn(d, t.memoizedState) && ((Wt = !0), W && ((l = Fl), l !== null)))
      )
        throw l;
      ((t.memoizedState = d), (t.baseState = g), (t.baseQueue = C), (o.lastRenderedState = d));
    }
    return (f === null && (o.lanes = 0), [t.memoizedState, o.dispatch]);
  }
  function lf(t) {
    var n = Gt(),
      l = n.queue;
    if (l === null) throw Error(i(311));
    l.lastRenderedReducer = t;
    var o = l.dispatch,
      f = l.pending,
      d = n.memoizedState;
    if (f !== null) {
      l.pending = null;
      var g = (f = f.next);
      do ((d = t(d, g.action)), (g = g.next));
      while (g !== f);
      (Pn(d, n.memoizedState) || (Wt = !0),
        (n.memoizedState = d),
        n.baseQueue === null && (n.baseState = d),
        (l.lastRenderedState = d));
    }
    return [d, o];
  }
  function ip(t, n, l) {
    var o = Pe,
      f = Gt(),
      d = at;
    if (d) {
      if (l === void 0) throw Error(i(407));
      l = l();
    } else l = n();
    var g = !Pn((gt || f).memoizedState, l);
    if (
      (g && ((f.memoizedState = l), (Wt = !0)),
      (f = f.queue),
      uf(up.bind(null, o, f, t), [t]),
      f.getSnapshot !== n || g || (Jt !== null && Jt.memoizedState.tag & 1))
    ) {
      if (
        ((o.flags |= 2048),
        Ql(9, { destroy: void 0 }, sp.bind(null, o, f, l, n), null),
        wt === null)
      )
        throw Error(i(349));
      d || (ar & 127) !== 0 || op(o, n, l);
    }
    return l;
  }
  function op(t, n, l) {
    ((t.flags |= 16384),
      (t = { getSnapshot: n, value: l }),
      (n = Pe.updateQueue),
      n === null
        ? ((n = vs()), (Pe.updateQueue = n), (n.stores = [t]))
        : ((l = n.stores), l === null ? (n.stores = [t]) : l.push(t)));
  }
  function sp(t, n, l, o) {
    ((n.value = l), (n.getSnapshot = o), cp(n) && fp(t));
  }
  function up(t, n, l) {
    return l(function () {
      cp(n) && fp(t);
    });
  }
  function cp(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var l = n();
      return !Pn(t, l);
    } catch {
      return !0;
    }
  }
  function fp(t) {
    var n = nl(t, 2);
    n !== null && Bn(n, t, 2);
  }
  function of(t) {
    var n = Cn();
    if (typeof t == "function") {
      var l = t;
      if (((t = l()), fl)) {
        de(!0);
        try {
          l();
        } finally {
          de(!1);
        }
      }
    }
    return (
      (n.memoizedState = n.baseState = t),
      (n.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: rr,
        lastRenderedState: t,
      }),
      n
    );
  }
  function dp(t, n, l, o) {
    return ((t.baseState = l), rf(t, gt, typeof o == "function" ? o : rr));
  }
  function VE(t, n, l, o, f) {
    if (Ss(t)) throw Error(i(485));
    if (((t = n.action), t !== null)) {
      var d = {
        payload: f,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (g) {
          d.listeners.push(g);
        },
      };
      (D.T !== null ? l(!0) : (d.isTransition = !1),
        o(d),
        (l = n.pending),
        l === null
          ? ((d.next = n.pending = d), hp(n, d))
          : ((d.next = l.next), (n.pending = l.next = d)));
    }
  }
  function hp(t, n) {
    var l = n.action,
      o = n.payload,
      f = t.state;
    if (n.isTransition) {
      var d = D.T,
        g = {};
      D.T = g;
      try {
        var b = l(f, o),
          C = D.S;
        (C !== null && C(g, b), mp(t, n, b));
      } catch (Z) {
        sf(t, n, Z);
      } finally {
        (d !== null && g.types !== null && (d.types = g.types), (D.T = d));
      }
    } else
      try {
        ((d = l(f, o)), mp(t, n, d));
      } catch (Z) {
        sf(t, n, Z);
      }
  }
  function mp(t, n, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (o) {
            pp(t, n, o);
          },
          function (o) {
            return sf(t, n, o);
          },
        )
      : pp(t, n, l);
  }
  function pp(t, n, l) {
    ((n.status = "fulfilled"),
      (n.value = l),
      vp(n),
      (t.state = l),
      (n = t.pending),
      n !== null &&
        ((l = n.next), l === n ? (t.pending = null) : ((l = l.next), (n.next = l), hp(t, l))));
  }
  function sf(t, n, l) {
    var o = t.pending;
    if (((t.pending = null), o !== null)) {
      o = o.next;
      do ((n.status = "rejected"), (n.reason = l), vp(n), (n = n.next));
      while (n !== o);
    }
    t.action = null;
  }
  function vp(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function gp(t, n) {
    return n;
  }
  function yp(t, n) {
    if (at) {
      var l = wt.formState;
      if (l !== null) {
        e: {
          var o = Pe;
          if (at) {
            if (Tt) {
              t: {
                for (var f = Tt, d = da; f.nodeType !== 8; ) {
                  if (!d) {
                    f = null;
                    break t;
                  }
                  if (((f = ma(f.nextSibling)), f === null)) {
                    f = null;
                    break t;
                  }
                }
                ((d = f.data), (f = d === "F!" || d === "F" ? f : null));
              }
              if (f) {
                ((Tt = ma(f.nextSibling)), (o = f.data === "F!"));
                break e;
              }
            }
            Sr(o);
          }
          o = !1;
        }
        o && (n = l[0]);
      }
    }
    return (
      (l = Cn()),
      (l.memoizedState = l.baseState = n),
      (o = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: gp,
        lastRenderedState: n,
      }),
      (l.queue = o),
      (l = jp.bind(null, Pe, o)),
      (o.dispatch = l),
      (o = of(!1)),
      (d = mf.bind(null, Pe, !1, o.queue)),
      (o = Cn()),
      (f = { state: n, dispatch: null, action: t, pending: null }),
      (o.queue = f),
      (l = VE.bind(null, Pe, f, d, l)),
      (f.dispatch = l),
      (o.memoizedState = t),
      [n, l, !1]
    );
  }
  function bp(t) {
    var n = Gt();
    return _p(n, gt, t);
  }
  function _p(t, n, l) {
    if (
      ((n = rf(t, n, gp)[0]),
      (t = ys(rr)[0]),
      typeof n == "object" && n !== null && typeof n.then == "function")
    )
      try {
        var o = Ii(n);
      } catch (g) {
        throw g === ql ? ss : g;
      }
    else o = n;
    n = Gt();
    var f = n.queue,
      d = f.dispatch;
    return (
      l !== n.memoizedState &&
        ((Pe.flags |= 2048), Ql(9, { destroy: void 0 }, BE.bind(null, f, l), null)),
      [o, d, t]
    );
  }
  function BE(t, n) {
    t.action = n;
  }
  function Sp(t) {
    var n = Gt(),
      l = gt;
    if (l !== null) return _p(n, l, t);
    (Gt(), (n = n.memoizedState), (l = Gt()));
    var o = l.queue.dispatch;
    return ((l.memoizedState = t), [n, o, !1]);
  }
  function Ql(t, n, l, o) {
    return (
      (t = { tag: t, create: l, deps: o, inst: n, next: null }),
      (n = Pe.updateQueue),
      n === null && ((n = vs()), (Pe.updateQueue = n)),
      (l = n.lastEffect),
      l === null
        ? (n.lastEffect = t.next = t)
        : ((o = l.next), (l.next = t), (t.next = o), (n.lastEffect = t)),
      t
    );
  }
  function Ep() {
    return Gt().memoizedState;
  }
  function bs(t, n, l, o) {
    var f = Cn();
    ((Pe.flags |= t),
      (f.memoizedState = Ql(1 | n, { destroy: void 0 }, l, o === void 0 ? null : o)));
  }
  function _s(t, n, l, o) {
    var f = Gt();
    o = o === void 0 ? null : o;
    var d = f.memoizedState.inst;
    gt !== null && o !== null && Jc(o, gt.memoizedState.deps)
      ? (f.memoizedState = Ql(n, d, l, o))
      : ((Pe.flags |= t), (f.memoizedState = Ql(1 | n, d, l, o)));
  }
  function wp(t, n) {
    bs(8390656, 8, t, n);
  }
  function uf(t, n) {
    _s(2048, 8, t, n);
  }
  function HE(t) {
    Pe.flags |= 4;
    var n = Pe.updateQueue;
    if (n === null) ((n = vs()), (Pe.updateQueue = n), (n.events = [t]));
    else {
      var l = n.events;
      l === null ? (n.events = [t]) : l.push(t);
    }
  }
  function xp(t) {
    var n = Gt().memoizedState;
    return (
      HE({ ref: n, nextImpl: t }),
      function () {
        if ((ut & 2) !== 0) throw Error(i(440));
        return n.impl.apply(void 0, arguments);
      }
    );
  }
  function Rp(t, n) {
    return _s(4, 2, t, n);
  }
  function zp(t, n) {
    return _s(4, 4, t, n);
  }
  function Tp(t, n) {
    if (typeof n == "function") {
      t = t();
      var l = n(t);
      return function () {
        typeof l == "function" ? l() : n(null);
      };
    }
    if (n != null)
      return (
        (t = t()),
        (n.current = t),
        function () {
          n.current = null;
        }
      );
  }
  function Ap(t, n, l) {
    ((l = l != null ? l.concat([t]) : null), _s(4, 4, Tp.bind(null, n, t), l));
  }
  function cf() {}
  function Op(t, n) {
    var l = Gt();
    n = n === void 0 ? null : n;
    var o = l.memoizedState;
    return n !== null && Jc(n, o[1]) ? o[0] : ((l.memoizedState = [t, n]), t);
  }
  function Cp(t, n) {
    var l = Gt();
    n = n === void 0 ? null : n;
    var o = l.memoizedState;
    if (n !== null && Jc(n, o[1])) return o[0];
    if (((o = t()), fl)) {
      de(!0);
      try {
        t();
      } finally {
        de(!1);
      }
    }
    return ((l.memoizedState = [o, n]), o);
  }
  function ff(t, n, l) {
    return l === void 0 || ((ar & 1073741824) !== 0 && (tt & 261930) === 0)
      ? (t.memoizedState = n)
      : ((t.memoizedState = l), (t = Dv()), (Pe.lanes |= t), (Cr |= t), l);
  }
  function Dp(t, n, l, o) {
    return Pn(l, n)
      ? l
      : Pl.current !== null
        ? ((t = ff(t, l, o)), Pn(t, n) || (Wt = !0), t)
        : (ar & 42) === 0 || ((ar & 1073741824) !== 0 && (tt & 261930) === 0)
          ? ((Wt = !0), (t.memoizedState = l))
          : ((t = Dv()), (Pe.lanes |= t), (Cr |= t), n);
  }
  function Mp(t, n, l, o, f) {
    var d = X.p;
    X.p = d !== 0 && 8 > d ? d : 8;
    var g = D.T,
      b = {};
    ((D.T = b), mf(t, !1, n, l));
    try {
      var C = f(),
        Z = D.S;
      if (
        (Z !== null && Z(b, C), C !== null && typeof C == "object" && typeof C.then == "function")
      ) {
        var W = LE(C, o);
        Qi(t, n, W, Wn(t));
      } else Qi(t, n, o, Wn(t));
    } catch (ae) {
      Qi(t, n, { then: function () {}, status: "rejected", reason: ae }, Wn());
    } finally {
      ((X.p = d), g !== null && b.types !== null && (g.types = b.types), (D.T = g));
    }
  }
  function ZE() {}
  function df(t, n, l, o) {
    if (t.tag !== 5) throw Error(i(476));
    var f = Np(t).queue;
    Mp(
      t,
      f,
      n,
      pe,
      l === null
        ? ZE
        : function () {
            return (kp(t), l(o));
          },
    );
  }
  function Np(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: pe,
      baseState: pe,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: rr,
        lastRenderedState: pe,
      },
      next: null,
    };
    var l = {};
    return (
      (n.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: rr,
          lastRenderedState: l,
        },
        next: null,
      }),
      (t.memoizedState = n),
      (t = t.alternate),
      t !== null && (t.memoizedState = n),
      n
    );
  }
  function kp(t) {
    var n = Np(t);
    (n.next === null && (n = t.alternate.memoizedState), Qi(t, n.next.queue, {}, Wn()));
  }
  function hf() {
    return vn(mo);
  }
  function Lp() {
    return Gt().memoizedState;
  }
  function Up() {
    return Gt().memoizedState;
  }
  function $E(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var l = Wn();
          t = xr(l);
          var o = Rr(n, t, l);
          (o !== null && (Bn(o, n, l), qi(o, n, l)), (n = { cache: Zc() }), (t.payload = n));
          return;
      }
      n = n.return;
    }
  }
  function YE(t, n, l) {
    var o = Wn();
    ((l = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Ss(t) ? Vp(n, l) : ((l = Cc(t, n, l, o)), l !== null && (Bn(l, t, o), Bp(l, n, o))));
  }
  function jp(t, n, l) {
    var o = Wn();
    Qi(t, n, l, o);
  }
  function Qi(t, n, l, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Ss(t)) Vp(n, f);
    else {
      var d = t.alternate;
      if (
        t.lanes === 0 &&
        (d === null || d.lanes === 0) &&
        ((d = n.lastRenderedReducer), d !== null)
      )
        try {
          var g = n.lastRenderedState,
            b = d(g, l);
          if (((f.hasEagerState = !0), (f.eagerState = b), Pn(b, g)))
            return (ts(t, n, f, 0), wt === null && es(), !1);
        } catch {}
      if (((l = Cc(t, n, f, o)), l !== null)) return (Bn(l, t, o), Bp(l, n, o), !0);
    }
    return !1;
  }
  function mf(t, n, l, o) {
    if (
      ((o = {
        lane: 2,
        revertLane: Gf(),
        gesture: null,
        action: o,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Ss(t))
    ) {
      if (n) throw Error(i(479));
    } else ((n = Cc(t, l, o, 2)), n !== null && Bn(n, t, 2));
  }
  function Ss(t) {
    var n = t.alternate;
    return t === Pe || (n !== null && n === Pe);
  }
  function Vp(t, n) {
    Xl = ms = !0;
    var l = t.pending;
    (l === null ? (n.next = n) : ((n.next = l.next), (l.next = n)), (t.pending = n));
  }
  function Bp(t, n, l) {
    if ((l & 4194048) !== 0) {
      var o = n.lanes;
      ((o &= t.pendingLanes), (l |= o), (n.lanes = l), En(t, l));
    }
  }
  var Ki = {
    readContext: vn,
    use: gs,
    useCallback: Bt,
    useContext: Bt,
    useEffect: Bt,
    useImperativeHandle: Bt,
    useLayoutEffect: Bt,
    useInsertionEffect: Bt,
    useMemo: Bt,
    useReducer: Bt,
    useRef: Bt,
    useState: Bt,
    useDebugValue: Bt,
    useDeferredValue: Bt,
    useTransition: Bt,
    useSyncExternalStore: Bt,
    useId: Bt,
    useHostTransitionStatus: Bt,
    useFormState: Bt,
    useActionState: Bt,
    useOptimistic: Bt,
    useMemoCache: Bt,
    useCacheRefresh: Bt,
  };
  Ki.useEffectEvent = Bt;
  var Hp = {
      readContext: vn,
      use: gs,
      useCallback: function (t, n) {
        return ((Cn().memoizedState = [t, n === void 0 ? null : n]), t);
      },
      useContext: vn,
      useEffect: wp,
      useImperativeHandle: function (t, n, l) {
        ((l = l != null ? l.concat([t]) : null), bs(4194308, 4, Tp.bind(null, n, t), l));
      },
      useLayoutEffect: function (t, n) {
        return bs(4194308, 4, t, n);
      },
      useInsertionEffect: function (t, n) {
        bs(4, 2, t, n);
      },
      useMemo: function (t, n) {
        var l = Cn();
        n = n === void 0 ? null : n;
        var o = t();
        if (fl) {
          de(!0);
          try {
            t();
          } finally {
            de(!1);
          }
        }
        return ((l.memoizedState = [o, n]), o);
      },
      useReducer: function (t, n, l) {
        var o = Cn();
        if (l !== void 0) {
          var f = l(n);
          if (fl) {
            de(!0);
            try {
              l(n);
            } finally {
              de(!1);
            }
          }
        } else f = n;
        return (
          (o.memoizedState = o.baseState = f),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: f,
          }),
          (o.queue = t),
          (t = t.dispatch = YE.bind(null, Pe, t)),
          [o.memoizedState, t]
        );
      },
      useRef: function (t) {
        var n = Cn();
        return ((t = { current: t }), (n.memoizedState = t));
      },
      useState: function (t) {
        t = of(t);
        var n = t.queue,
          l = jp.bind(null, Pe, n);
        return ((n.dispatch = l), [t.memoizedState, l]);
      },
      useDebugValue: cf,
      useDeferredValue: function (t, n) {
        var l = Cn();
        return ff(l, t, n);
      },
      useTransition: function () {
        var t = of(!1);
        return ((t = Mp.bind(null, Pe, t.queue, !0, !1)), (Cn().memoizedState = t), [!1, t]);
      },
      useSyncExternalStore: function (t, n, l) {
        var o = Pe,
          f = Cn();
        if (at) {
          if (l === void 0) throw Error(i(407));
          l = l();
        } else {
          if (((l = n()), wt === null)) throw Error(i(349));
          (tt & 127) !== 0 || op(o, n, l);
        }
        f.memoizedState = l;
        var d = { value: l, getSnapshot: n };
        return (
          (f.queue = d),
          wp(up.bind(null, o, d, t), [t]),
          (o.flags |= 2048),
          Ql(9, { destroy: void 0 }, sp.bind(null, o, d, l, n), null),
          l
        );
      },
      useId: function () {
        var t = Cn(),
          n = wt.identifierPrefix;
        if (at) {
          var l = Ua,
            o = La;
          ((l = (o & ~(1 << (32 - ue(o) - 1))).toString(32) + l),
            (n = "_" + n + "R_" + l),
            (l = ps++),
            0 < l && (n += "H" + l.toString(32)),
            (n += "_"));
        } else ((l = UE++), (n = "_" + n + "r_" + l.toString(32) + "_"));
        return (t.memoizedState = n);
      },
      useHostTransitionStatus: hf,
      useFormState: yp,
      useActionState: yp,
      useOptimistic: function (t) {
        var n = Cn();
        n.memoizedState = n.baseState = t;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((n.queue = l), (n = mf.bind(null, Pe, !0, l)), (l.dispatch = n), [t, n]);
      },
      useMemoCache: af,
      useCacheRefresh: function () {
        return (Cn().memoizedState = $E.bind(null, Pe));
      },
      useEffectEvent: function (t) {
        var n = Cn(),
          l = { impl: t };
        return (
          (n.memoizedState = l),
          function () {
            if ((ut & 2) !== 0) throw Error(i(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    pf = {
      readContext: vn,
      use: gs,
      useCallback: Op,
      useContext: vn,
      useEffect: uf,
      useImperativeHandle: Ap,
      useInsertionEffect: Rp,
      useLayoutEffect: zp,
      useMemo: Cp,
      useReducer: ys,
      useRef: Ep,
      useState: function () {
        return ys(rr);
      },
      useDebugValue: cf,
      useDeferredValue: function (t, n) {
        var l = Gt();
        return Dp(l, gt.memoizedState, t, n);
      },
      useTransition: function () {
        var t = ys(rr)[0],
          n = Gt().memoizedState;
        return [typeof t == "boolean" ? t : Ii(t), n];
      },
      useSyncExternalStore: ip,
      useId: Lp,
      useHostTransitionStatus: hf,
      useFormState: bp,
      useActionState: bp,
      useOptimistic: function (t, n) {
        var l = Gt();
        return dp(l, gt, t, n);
      },
      useMemoCache: af,
      useCacheRefresh: Up,
    };
  pf.useEffectEvent = xp;
  var Zp = {
    readContext: vn,
    use: gs,
    useCallback: Op,
    useContext: vn,
    useEffect: uf,
    useImperativeHandle: Ap,
    useInsertionEffect: Rp,
    useLayoutEffect: zp,
    useMemo: Cp,
    useReducer: lf,
    useRef: Ep,
    useState: function () {
      return lf(rr);
    },
    useDebugValue: cf,
    useDeferredValue: function (t, n) {
      var l = Gt();
      return gt === null ? ff(l, t, n) : Dp(l, gt.memoizedState, t, n);
    },
    useTransition: function () {
      var t = lf(rr)[0],
        n = Gt().memoizedState;
      return [typeof t == "boolean" ? t : Ii(t), n];
    },
    useSyncExternalStore: ip,
    useId: Lp,
    useHostTransitionStatus: hf,
    useFormState: Sp,
    useActionState: Sp,
    useOptimistic: function (t, n) {
      var l = Gt();
      return gt !== null ? dp(l, gt, t, n) : ((l.baseState = t), [t, l.queue.dispatch]);
    },
    useMemoCache: af,
    useCacheRefresh: Up,
  };
  Zp.useEffectEvent = xp;
  function vf(t, n, l, o) {
    ((n = t.memoizedState),
      (l = l(o, n)),
      (l = l == null ? n : v({}, n, l)),
      (t.memoizedState = l),
      t.lanes === 0 && (t.updateQueue.baseState = l));
  }
  var gf = {
    enqueueSetState: function (t, n, l) {
      t = t._reactInternals;
      var o = Wn(),
        f = xr(o);
      ((f.payload = n),
        l != null && (f.callback = l),
        (n = Rr(t, f, o)),
        n !== null && (Bn(n, t, o), qi(n, t, o)));
    },
    enqueueReplaceState: function (t, n, l) {
      t = t._reactInternals;
      var o = Wn(),
        f = xr(o);
      ((f.tag = 1),
        (f.payload = n),
        l != null && (f.callback = l),
        (n = Rr(t, f, o)),
        n !== null && (Bn(n, t, o), qi(n, t, o)));
    },
    enqueueForceUpdate: function (t, n) {
      t = t._reactInternals;
      var l = Wn(),
        o = xr(l);
      ((o.tag = 2),
        n != null && (o.callback = n),
        (n = Rr(t, o, l)),
        n !== null && (Bn(n, t, l), qi(n, t, l)));
    },
  };
  function $p(t, n, l, o, f, d, g) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(o, d, g)
        : n.prototype && n.prototype.isPureReactComponent
          ? !ji(l, o) || !ji(f, d)
          : !0
    );
  }
  function Yp(t, n, l, o) {
    ((t = n.state),
      typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(l, o),
      typeof n.UNSAFE_componentWillReceiveProps == "function" &&
        n.UNSAFE_componentWillReceiveProps(l, o),
      n.state !== t && gf.enqueueReplaceState(n, n.state, null));
  }
  function dl(t, n) {
    var l = n;
    if ("ref" in n) {
      l = {};
      for (var o in n) o !== "ref" && (l[o] = n[o]);
    }
    if ((t = t.defaultProps)) {
      l === n && (l = v({}, l));
      for (var f in t) l[f] === void 0 && (l[f] = t[f]);
    }
    return l;
  }
  function Fp(t) {
    Wo(t);
  }
  function qp(t) {
    console.error(t);
  }
  function Gp(t) {
    Wo(t);
  }
  function Es(t, n) {
    try {
      var l = t.onUncaughtError;
      l(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function () {
        throw o;
      });
    }
  }
  function Pp(t, n, l) {
    try {
      var o = t.onCaughtError;
      o(l.value, { componentStack: l.stack, errorBoundary: n.tag === 1 ? n.stateNode : null });
    } catch (f) {
      setTimeout(function () {
        throw f;
      });
    }
  }
  function yf(t, n, l) {
    return (
      (l = xr(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        Es(t, n);
      }),
      l
    );
  }
  function Xp(t) {
    return ((t = xr(t)), (t.tag = 3), t);
  }
  function Ip(t, n, l, o) {
    var f = l.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var d = o.value;
      ((t.payload = function () {
        return f(d);
      }),
        (t.callback = function () {
          Pp(n, l, o);
        }));
    }
    var g = l.stateNode;
    g !== null &&
      typeof g.componentDidCatch == "function" &&
      (t.callback = function () {
        (Pp(n, l, o),
          typeof f != "function" && (Dr === null ? (Dr = new Set([this])) : Dr.add(this)));
        var b = o.stack;
        this.componentDidCatch(o.value, { componentStack: b !== null ? b : "" });
      });
  }
  function FE(t, n, l, o, f) {
    if (((l.flags |= 32768), o !== null && typeof o == "object" && typeof o.then == "function")) {
      if (((n = l.alternate), n !== null && $l(n, l, f, !0), (l = In.current), l !== null)) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              ha === null ? ks() : l.alternate === null && Ht === 0 && (Ht = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = f),
              o === us
                ? (l.flags |= 16384)
                : ((n = l.updateQueue),
                  n === null ? (l.updateQueue = new Set([o])) : n.add(o),
                  Yf(t, o, f)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              o === us
                ? (l.flags |= 16384)
                : ((n = l.updateQueue),
                  n === null
                    ? ((n = { transitions: null, markerInstances: null, retryQueue: new Set([o]) }),
                      (l.updateQueue = n))
                    : ((l = n.retryQueue), l === null ? (n.retryQueue = new Set([o])) : l.add(o)),
                  Yf(t, o, f)),
              !1
            );
        }
        throw Error(i(435, l.tag));
      }
      return (Yf(t, o, f), ks(), !1);
    }
    if (at)
      return (
        (n = In.current),
        n !== null
          ? ((n.flags & 65536) === 0 && (n.flags |= 256),
            (n.flags |= 65536),
            (n.lanes = f),
            o !== Uc && ((t = Error(i(422), { cause: o })), Hi(ua(t, l))))
          : (o !== Uc && ((n = Error(i(423), { cause: o })), Hi(ua(n, l))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (f &= -f),
            (t.lanes |= f),
            (o = ua(o, l)),
            (f = yf(t.stateNode, o, f)),
            Pc(t, f),
            Ht !== 4 && (Ht = 2)),
        !1
      );
    var d = Error(i(520), { cause: o });
    if (((d = ua(d, l)), lo === null ? (lo = [d]) : lo.push(d), Ht !== 4 && (Ht = 2), n === null))
      return !0;
    ((o = ua(o, l)), (l = n));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (t = f & -f),
            (l.lanes |= t),
            (t = yf(l.stateNode, o, t)),
            Pc(l, t),
            !1
          );
        case 1:
          if (
            ((n = l.type),
            (d = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof n.getDerivedStateFromError == "function" ||
                (d !== null &&
                  typeof d.componentDidCatch == "function" &&
                  (Dr === null || !Dr.has(d)))))
          )
            return (
              (l.flags |= 65536),
              (f &= -f),
              (l.lanes |= f),
              (f = Xp(f)),
              Ip(f, t, l, o),
              Pc(l, f),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var bf = Error(i(461)),
    Wt = !1;
  function gn(t, n, l, o) {
    n.child = t === null ? Wm(n, null, l, o) : cl(n, t.child, l, o);
  }
  function Qp(t, n, l, o, f) {
    l = l.render;
    var d = n.ref;
    if ("ref" in o) {
      var g = {};
      for (var b in o) b !== "ref" && (g[b] = o[b]);
    } else g = o;
    return (
      il(n),
      (o = Wc(t, n, l, g, d, f)),
      (b = ef()),
      t !== null && !Wt
        ? (tf(t, n, f), lr(t, n, f))
        : (at && b && kc(n), (n.flags |= 1), gn(t, n, o, f), n.child)
    );
  }
  function Kp(t, n, l, o, f) {
    if (t === null) {
      var d = l.type;
      return typeof d == "function" && !Dc(d) && d.defaultProps === void 0 && l.compare === null
        ? ((n.tag = 15), (n.type = d), Jp(t, n, d, o, f))
        : ((t = as(l.type, null, o, n, n.mode, f)), (t.ref = n.ref), (t.return = n), (n.child = t));
    }
    if (((d = t.child), !Tf(t, f))) {
      var g = d.memoizedProps;
      if (((l = l.compare), (l = l !== null ? l : ji), l(g, o) && t.ref === n.ref))
        return lr(t, n, f);
    }
    return ((n.flags |= 1), (t = Wa(d, o)), (t.ref = n.ref), (t.return = n), (n.child = t));
  }
  function Jp(t, n, l, o, f) {
    if (t !== null) {
      var d = t.memoizedProps;
      if (ji(d, o) && t.ref === n.ref)
        if (((Wt = !1), (n.pendingProps = o = d), Tf(t, f))) (t.flags & 131072) !== 0 && (Wt = !0);
        else return ((n.lanes = t.lanes), lr(t, n, f));
    }
    return _f(t, n, l, o, f);
  }
  function Wp(t, n, l, o) {
    var f = o.children,
      d = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        n.stateNode === null &&
        (n.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      o.mode === "hidden")
    ) {
      if ((n.flags & 128) !== 0) {
        if (((d = d !== null ? d.baseLanes | l : l), t !== null)) {
          for (o = n.child = t.child, f = 0; o !== null; )
            ((f = f | o.lanes | o.childLanes), (o = o.sibling));
          o = f & ~d;
        } else ((o = 0), (n.child = null));
        return ev(t, n, d, l, o);
      }
      if ((l & 536870912) !== 0)
        ((n.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && os(n, d !== null ? d.cachePool : null),
          d !== null ? np(n, d) : Ic(),
          ap(n));
      else return ((o = n.lanes = 536870912), ev(t, n, d !== null ? d.baseLanes | l : l, l, o));
    } else
      d !== null
        ? (os(n, d.cachePool), np(n, d), Tr(), (n.memoizedState = null))
        : (t !== null && os(n, null), Ic(), Tr());
    return (gn(t, n, f, l), n.child);
  }
  function Ji(t, n) {
    return (
      (t !== null && t.tag === 22) ||
        n.stateNode !== null ||
        (n.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      n.sibling
    );
  }
  function ev(t, n, l, o, f) {
    var d = Yc();
    return (
      (d = d === null ? null : { parent: Kt._currentValue, pool: d }),
      (n.memoizedState = { baseLanes: l, cachePool: d }),
      t !== null && os(n, null),
      Ic(),
      ap(n),
      t !== null && $l(t, n, o, !0),
      (n.childLanes = f),
      null
    );
  }
  function ws(t, n) {
    return (
      (n = Rs({ mode: n.mode, children: n.children }, t.mode)),
      (n.ref = t.ref),
      (t.child = n),
      (n.return = t),
      n
    );
  }
  function tv(t, n, l) {
    return (
      cl(n, t.child, null, l),
      (t = ws(n, n.pendingProps)),
      (t.flags |= 2),
      Qn(n),
      (n.memoizedState = null),
      t
    );
  }
  function qE(t, n, l) {
    var o = n.pendingProps,
      f = (n.flags & 128) !== 0;
    if (((n.flags &= -129), t === null)) {
      if (at) {
        if (o.mode === "hidden") return ((t = ws(n, o)), (n.lanes = 536870912), Ji(null, t));
        if (
          (Kc(n),
          (t = Tt)
            ? ((t = hg(t, da)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((n.memoizedState = {
                  dehydrated: t,
                  treeContext: br !== null ? { id: La, overflow: Ua } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Vm(t)),
                (l.return = n),
                (n.child = l),
                (pn = n),
                (Tt = null)))
            : (t = null),
          t === null)
        )
          throw Sr(n);
        return ((n.lanes = 536870912), null);
      }
      return ws(n, o);
    }
    var d = t.memoizedState;
    if (d !== null) {
      var g = d.dehydrated;
      if ((Kc(n), f))
        if (n.flags & 256) ((n.flags &= -257), (n = tv(t, n, l)));
        else if (n.memoizedState !== null) ((n.child = t.child), (n.flags |= 128), (n = null));
        else throw Error(i(558));
      else if ((Wt || $l(t, n, l, !1), (f = (l & t.childLanes) !== 0), Wt || f)) {
        if (((o = wt), o !== null && ((g = A(o, l)), g !== 0 && g !== d.retryLane)))
          throw ((d.retryLane = g), nl(t, g), Bn(o, t, g), bf);
        (ks(), (n = tv(t, n, l)));
      } else
        ((t = d.treeContext),
          (Tt = ma(g.nextSibling)),
          (pn = n),
          (at = !0),
          (_r = null),
          (da = !1),
          t !== null && Zm(n, t),
          (n = ws(n, o)),
          (n.flags |= 4096));
      return n;
    }
    return (
      (t = Wa(t.child, { mode: o.mode, children: o.children })),
      (t.ref = n.ref),
      (n.child = t),
      (t.return = n),
      t
    );
  }
  function xs(t, n) {
    var l = n.ref;
    if (l === null) t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(i(284));
      (t === null || t.ref !== l) && (n.flags |= 4194816);
    }
  }
  function _f(t, n, l, o, f) {
    return (
      il(n),
      (l = Wc(t, n, l, o, void 0, f)),
      (o = ef()),
      t !== null && !Wt
        ? (tf(t, n, f), lr(t, n, f))
        : (at && o && kc(n), (n.flags |= 1), gn(t, n, l, f), n.child)
    );
  }
  function nv(t, n, l, o, f, d) {
    return (
      il(n),
      (n.updateQueue = null),
      (l = lp(n, o, l, f)),
      rp(t),
      (o = ef()),
      t !== null && !Wt
        ? (tf(t, n, d), lr(t, n, d))
        : (at && o && kc(n), (n.flags |= 1), gn(t, n, l, d), n.child)
    );
  }
  function av(t, n, l, o, f) {
    if ((il(n), n.stateNode === null)) {
      var d = Vl,
        g = l.contextType;
      (typeof g == "object" && g !== null && (d = vn(g)),
        (d = new l(o, d)),
        (n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null),
        (d.updater = gf),
        (n.stateNode = d),
        (d._reactInternals = n),
        (d = n.stateNode),
        (d.props = o),
        (d.state = n.memoizedState),
        (d.refs = {}),
        qc(n),
        (g = l.contextType),
        (d.context = typeof g == "object" && g !== null ? vn(g) : Vl),
        (d.state = n.memoizedState),
        (g = l.getDerivedStateFromProps),
        typeof g == "function" && (vf(n, l, g, o), (d.state = n.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof d.getSnapshotBeforeUpdate == "function" ||
          (typeof d.UNSAFE_componentWillMount != "function" &&
            typeof d.componentWillMount != "function") ||
          ((g = d.state),
          typeof d.componentWillMount == "function" && d.componentWillMount(),
          typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(),
          g !== d.state && gf.enqueueReplaceState(d, d.state, null),
          Pi(n, o, d, f),
          Gi(),
          (d.state = n.memoizedState)),
        typeof d.componentDidMount == "function" && (n.flags |= 4194308),
        (o = !0));
    } else if (t === null) {
      d = n.stateNode;
      var b = n.memoizedProps,
        C = dl(l, b);
      d.props = C;
      var Z = d.context,
        W = l.contextType;
      ((g = Vl), typeof W == "object" && W !== null && (g = vn(W)));
      var ae = l.getDerivedStateFromProps;
      ((W = typeof ae == "function" || typeof d.getSnapshotBeforeUpdate == "function"),
        (b = n.pendingProps !== b),
        W ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((b || Z !== g) && Yp(n, d, o, g)),
        (wr = !1));
      var Y = n.memoizedState;
      ((d.state = Y),
        Pi(n, o, d, f),
        Gi(),
        (Z = n.memoizedState),
        b || Y !== Z || wr
          ? (typeof ae == "function" && (vf(n, l, ae, o), (Z = n.memoizedState)),
            (C = wr || $p(n, l, C, o, Y, Z, g))
              ? (W ||
                  (typeof d.UNSAFE_componentWillMount != "function" &&
                    typeof d.componentWillMount != "function") ||
                  (typeof d.componentWillMount == "function" && d.componentWillMount(),
                  typeof d.UNSAFE_componentWillMount == "function" &&
                    d.UNSAFE_componentWillMount()),
                typeof d.componentDidMount == "function" && (n.flags |= 4194308))
              : (typeof d.componentDidMount == "function" && (n.flags |= 4194308),
                (n.memoizedProps = o),
                (n.memoizedState = Z)),
            (d.props = o),
            (d.state = Z),
            (d.context = g),
            (o = C))
          : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), (o = !1)));
    } else {
      ((d = n.stateNode),
        Gc(t, n),
        (g = n.memoizedProps),
        (W = dl(l, g)),
        (d.props = W),
        (ae = n.pendingProps),
        (Y = d.context),
        (Z = l.contextType),
        (C = Vl),
        typeof Z == "object" && Z !== null && (C = vn(Z)),
        (b = l.getDerivedStateFromProps),
        (Z = typeof b == "function" || typeof d.getSnapshotBeforeUpdate == "function") ||
          (typeof d.UNSAFE_componentWillReceiveProps != "function" &&
            typeof d.componentWillReceiveProps != "function") ||
          ((g !== ae || Y !== C) && Yp(n, d, o, C)),
        (wr = !1),
        (Y = n.memoizedState),
        (d.state = Y),
        Pi(n, o, d, f),
        Gi());
      var P = n.memoizedState;
      g !== ae || Y !== P || wr || (t !== null && t.dependencies !== null && ls(t.dependencies))
        ? (typeof b == "function" && (vf(n, l, b, o), (P = n.memoizedState)),
          (W =
            wr ||
            $p(n, l, W, o, Y, P, C) ||
            (t !== null && t.dependencies !== null && ls(t.dependencies)))
            ? (Z ||
                (typeof d.UNSAFE_componentWillUpdate != "function" &&
                  typeof d.componentWillUpdate != "function") ||
                (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, P, C),
                typeof d.UNSAFE_componentWillUpdate == "function" &&
                  d.UNSAFE_componentWillUpdate(o, P, C)),
              typeof d.componentDidUpdate == "function" && (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024))
            : (typeof d.componentDidUpdate != "function" ||
                (g === t.memoizedProps && Y === t.memoizedState) ||
                (n.flags |= 4),
              typeof d.getSnapshotBeforeUpdate != "function" ||
                (g === t.memoizedProps && Y === t.memoizedState) ||
                (n.flags |= 1024),
              (n.memoizedProps = o),
              (n.memoizedState = P)),
          (d.props = o),
          (d.state = P),
          (d.context = C),
          (o = W))
        : (typeof d.componentDidUpdate != "function" ||
            (g === t.memoizedProps && Y === t.memoizedState) ||
            (n.flags |= 4),
          typeof d.getSnapshotBeforeUpdate != "function" ||
            (g === t.memoizedProps && Y === t.memoizedState) ||
            (n.flags |= 1024),
          (o = !1));
    }
    return (
      (d = o),
      xs(t, n),
      (o = (n.flags & 128) !== 0),
      d || o
        ? ((d = n.stateNode),
          (l = o && typeof l.getDerivedStateFromError != "function" ? null : d.render()),
          (n.flags |= 1),
          t !== null && o
            ? ((n.child = cl(n, t.child, null, f)), (n.child = cl(n, null, l, f)))
            : gn(t, n, l, f),
          (n.memoizedState = d.state),
          (t = n.child))
        : (t = lr(t, n, f)),
      t
    );
  }
  function rv(t, n, l, o) {
    return (rl(), (n.flags |= 256), gn(t, n, l, o), n.child);
  }
  var Sf = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Ef(t) {
    return { baseLanes: t, cachePool: Pm() };
  }
  function wf(t, n, l) {
    return ((t = t !== null ? t.childLanes & ~l : 0), n && (t |= Jn), t);
  }
  function lv(t, n, l) {
    var o = n.pendingProps,
      f = !1,
      d = (n.flags & 128) !== 0,
      g;
    if (
      ((g = d) || (g = t !== null && t.memoizedState === null ? !1 : (qt.current & 2) !== 0),
      g && ((f = !0), (n.flags &= -129)),
      (g = (n.flags & 32) !== 0),
      (n.flags &= -33),
      t === null)
    ) {
      if (at) {
        if (
          (f ? zr(n) : Tr(),
          (t = Tt)
            ? ((t = hg(t, da)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((n.memoizedState = {
                  dehydrated: t,
                  treeContext: br !== null ? { id: La, overflow: Ua } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = Vm(t)),
                (l.return = n),
                (n.child = l),
                (pn = n),
                (Tt = null)))
            : (t = null),
          t === null)
        )
          throw Sr(n);
        return (ld(t) ? (n.lanes = 32) : (n.lanes = 536870912), null);
      }
      var b = o.children;
      return (
        (o = o.fallback),
        f
          ? (Tr(),
            (f = n.mode),
            (b = Rs({ mode: "hidden", children: b }, f)),
            (o = al(o, f, l, null)),
            (b.return = n),
            (o.return = n),
            (b.sibling = o),
            (n.child = b),
            (o = n.child),
            (o.memoizedState = Ef(l)),
            (o.childLanes = wf(t, g, l)),
            (n.memoizedState = Sf),
            Ji(null, o))
          : (zr(n), xf(n, b))
      );
    }
    var C = t.memoizedState;
    if (C !== null && ((b = C.dehydrated), b !== null)) {
      if (d)
        n.flags & 256
          ? (zr(n), (n.flags &= -257), (n = Rf(t, n, l)))
          : n.memoizedState !== null
            ? (Tr(), (n.child = t.child), (n.flags |= 128), (n = null))
            : (Tr(),
              (b = o.fallback),
              (f = n.mode),
              (o = Rs({ mode: "visible", children: o.children }, f)),
              (b = al(b, f, l, null)),
              (b.flags |= 2),
              (o.return = n),
              (b.return = n),
              (o.sibling = b),
              (n.child = o),
              cl(n, t.child, null, l),
              (o = n.child),
              (o.memoizedState = Ef(l)),
              (o.childLanes = wf(t, g, l)),
              (n.memoizedState = Sf),
              (n = Ji(null, o)));
      else if ((zr(n), ld(b))) {
        if (((g = b.nextSibling && b.nextSibling.dataset), g)) var Z = g.dgst;
        ((g = Z),
          (o = Error(i(419))),
          (o.stack = ""),
          (o.digest = g),
          Hi({ value: o, source: null, stack: null }),
          (n = Rf(t, n, l)));
      } else if ((Wt || $l(t, n, l, !1), (g = (l & t.childLanes) !== 0), Wt || g)) {
        if (((g = wt), g !== null && ((o = A(g, l)), o !== 0 && o !== C.retryLane)))
          throw ((C.retryLane = o), nl(t, o), Bn(g, t, o), bf);
        (rd(b) || ks(), (n = Rf(t, n, l)));
      } else
        rd(b)
          ? ((n.flags |= 192), (n.child = t.child), (n = null))
          : ((t = C.treeContext),
            (Tt = ma(b.nextSibling)),
            (pn = n),
            (at = !0),
            (_r = null),
            (da = !1),
            t !== null && Zm(n, t),
            (n = xf(n, o.children)),
            (n.flags |= 4096));
      return n;
    }
    return f
      ? (Tr(),
        (b = o.fallback),
        (f = n.mode),
        (C = t.child),
        (Z = C.sibling),
        (o = Wa(C, { mode: "hidden", children: o.children })),
        (o.subtreeFlags = C.subtreeFlags & 65011712),
        Z !== null ? (b = Wa(Z, b)) : ((b = al(b, f, l, null)), (b.flags |= 2)),
        (b.return = n),
        (o.return = n),
        (o.sibling = b),
        (n.child = o),
        Ji(null, o),
        (o = n.child),
        (b = t.child.memoizedState),
        b === null
          ? (b = Ef(l))
          : ((f = b.cachePool),
            f !== null
              ? ((C = Kt._currentValue), (f = f.parent !== C ? { parent: C, pool: C } : f))
              : (f = Pm()),
            (b = { baseLanes: b.baseLanes | l, cachePool: f })),
        (o.memoizedState = b),
        (o.childLanes = wf(t, g, l)),
        (n.memoizedState = Sf),
        Ji(t.child, o))
      : (zr(n),
        (l = t.child),
        (t = l.sibling),
        (l = Wa(l, { mode: "visible", children: o.children })),
        (l.return = n),
        (l.sibling = null),
        t !== null &&
          ((g = n.deletions), g === null ? ((n.deletions = [t]), (n.flags |= 16)) : g.push(t)),
        (n.child = l),
        (n.memoizedState = null),
        l);
  }
  function xf(t, n) {
    return ((n = Rs({ mode: "visible", children: n }, t.mode)), (n.return = t), (t.child = n));
  }
  function Rs(t, n) {
    return ((t = Xn(22, t, null, n)), (t.lanes = 0), t);
  }
  function Rf(t, n, l) {
    return (
      cl(n, t.child, null, l),
      (t = xf(n, n.pendingProps.children)),
      (t.flags |= 2),
      (n.memoizedState = null),
      t
    );
  }
  function iv(t, n, l) {
    t.lanes |= n;
    var o = t.alternate;
    (o !== null && (o.lanes |= n), Bc(t.return, n, l));
  }
  function zf(t, n, l, o, f, d) {
    var g = t.memoizedState;
    g === null
      ? (t.memoizedState = {
          isBackwards: n,
          rendering: null,
          renderingStartTime: 0,
          last: o,
          tail: l,
          tailMode: f,
          treeForkCount: d,
        })
      : ((g.isBackwards = n),
        (g.rendering = null),
        (g.renderingStartTime = 0),
        (g.last = o),
        (g.tail = l),
        (g.tailMode = f),
        (g.treeForkCount = d));
  }
  function ov(t, n, l) {
    var o = n.pendingProps,
      f = o.revealOrder,
      d = o.tail;
    o = o.children;
    var g = qt.current,
      b = (g & 2) !== 0;
    if (
      (b ? ((g = (g & 1) | 2), (n.flags |= 128)) : (g &= 1),
      q(qt, g),
      gn(t, n, o, l),
      (o = at ? Bi : 0),
      !b && t !== null && (t.flags & 128) !== 0)
    )
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && iv(t, l, n);
        else if (t.tag === 19) iv(t, l, n);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === n) break e;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === n) break e;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    switch (f) {
      case "forwards":
        for (l = n.child, f = null; l !== null; )
          ((t = l.alternate), t !== null && hs(t) === null && (f = l), (l = l.sibling));
        ((l = f),
          l === null ? ((f = n.child), (n.child = null)) : ((f = l.sibling), (l.sibling = null)),
          zf(n, !1, f, l, d, o));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, f = n.child, n.child = null; f !== null; ) {
          if (((t = f.alternate), t !== null && hs(t) === null)) {
            n.child = f;
            break;
          }
          ((t = f.sibling), (f.sibling = l), (l = f), (f = t));
        }
        zf(n, !0, l, null, d, o);
        break;
      case "together":
        zf(n, !1, null, null, void 0, o);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function lr(t, n, l) {
    if (
      (t !== null && (n.dependencies = t.dependencies), (Cr |= n.lanes), (l & n.childLanes) === 0)
    )
      if (t !== null) {
        if (($l(t, n, l, !1), (l & n.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && n.child !== t.child) throw Error(i(153));
    if (n.child !== null) {
      for (t = n.child, l = Wa(t, t.pendingProps), n.child = l, l.return = n; t.sibling !== null; )
        ((t = t.sibling), (l = l.sibling = Wa(t, t.pendingProps)), (l.return = n));
      l.sibling = null;
    }
    return n.child;
  }
  function Tf(t, n) {
    return (t.lanes & n) !== 0 ? !0 : ((t = t.dependencies), !!(t !== null && ls(t)));
  }
  function GE(t, n, l) {
    switch (n.tag) {
      case 3:
        (He(n, n.stateNode.containerInfo), Er(n, Kt, t.memoizedState.cache), rl());
        break;
      case 27:
      case 5:
        un(n);
        break;
      case 4:
        He(n, n.stateNode.containerInfo);
        break;
      case 10:
        Er(n, n.type, n.memoizedProps.value);
        break;
      case 31:
        if (n.memoizedState !== null) return ((n.flags |= 128), Kc(n), null);
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null
            ? (zr(n), (n.flags |= 128), null)
            : (l & n.child.childLanes) !== 0
              ? lv(t, n, l)
              : (zr(n), (t = lr(t, n, l)), t !== null ? t.sibling : null);
        zr(n);
        break;
      case 19:
        var f = (t.flags & 128) !== 0;
        if (
          ((o = (l & n.childLanes) !== 0),
          o || ($l(t, n, l, !1), (o = (l & n.childLanes) !== 0)),
          f)
        ) {
          if (o) return ov(t, n, l);
          n.flags |= 128;
        }
        if (
          ((f = n.memoizedState),
          f !== null && ((f.rendering = null), (f.tail = null), (f.lastEffect = null)),
          q(qt, qt.current),
          o)
        )
          break;
        return null;
      case 22:
        return ((n.lanes = 0), Wp(t, n, l, n.pendingProps));
      case 24:
        Er(n, Kt, t.memoizedState.cache);
    }
    return lr(t, n, l);
  }
  function sv(t, n, l) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps) Wt = !0;
      else {
        if (!Tf(t, l) && (n.flags & 128) === 0) return ((Wt = !1), GE(t, n, l));
        Wt = (t.flags & 131072) !== 0;
      }
    else ((Wt = !1), at && (n.flags & 1048576) !== 0 && Hm(n, Bi, n.index));
    switch (((n.lanes = 0), n.tag)) {
      case 16:
        e: {
          var o = n.pendingProps;
          if (((t = sl(n.elementType)), (n.type = t), typeof t == "function"))
            Dc(t)
              ? ((o = dl(t, o)), (n.tag = 1), (n = av(null, n, t, o, l)))
              : ((n.tag = 0), (n = _f(null, n, t, o, l)));
          else {
            if (t != null) {
              var f = t.$$typeof;
              if (f === $) {
                ((n.tag = 11), (n = Qp(null, n, t, o, l)));
                break e;
              } else if (f === ce) {
                ((n.tag = 14), (n = Kp(null, n, t, o, l)));
                break e;
              }
            }
            throw ((n = ze(t) || t), Error(i(306, n, "")));
          }
        }
        return n;
      case 0:
        return _f(t, n, n.type, n.pendingProps, l);
      case 1:
        return ((o = n.type), (f = dl(o, n.pendingProps)), av(t, n, o, f, l));
      case 3:
        e: {
          if ((He(n, n.stateNode.containerInfo), t === null)) throw Error(i(387));
          o = n.pendingProps;
          var d = n.memoizedState;
          ((f = d.element), Gc(t, n), Pi(n, o, null, l));
          var g = n.memoizedState;
          if (
            ((o = g.cache),
            Er(n, Kt, o),
            o !== d.cache && Hc(n, [Kt], l, !0),
            Gi(),
            (o = g.element),
            d.isDehydrated)
          )
            if (
              ((d = { element: o, isDehydrated: !1, cache: g.cache }),
              (n.updateQueue.baseState = d),
              (n.memoizedState = d),
              n.flags & 256)
            ) {
              n = rv(t, n, o, l);
              break e;
            } else if (o !== f) {
              ((f = ua(Error(i(424)), n)), Hi(f), (n = rv(t, n, o, l)));
              break e;
            } else
              for (
                t = n.stateNode.containerInfo,
                  t.nodeType === 9
                    ? (t = t.body)
                    : (t = t.nodeName === "HTML" ? t.ownerDocument.body : t),
                  Tt = ma(t.firstChild),
                  pn = n,
                  at = !0,
                  _r = null,
                  da = !0,
                  l = Wm(n, null, o, l),
                  n.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
          else {
            if ((rl(), o === f)) {
              n = lr(t, n, l);
              break e;
            }
            gn(t, n, o, l);
          }
          n = n.child;
        }
        return n;
      case 26:
        return (
          xs(t, n),
          t === null
            ? (l = bg(n.type, null, n.pendingProps, null))
              ? (n.memoizedState = l)
              : at ||
                ((l = n.type),
                (t = n.pendingProps),
                (o = Zs(ve.current).createElement(l)),
                (o[Se] = n),
                (o[we] = t),
                yn(o, l, t),
                lt(o),
                (n.stateNode = o))
            : (n.memoizedState = bg(n.type, t.memoizedProps, n.pendingProps, t.memoizedState)),
          null
        );
      case 27:
        return (
          un(n),
          t === null &&
            at &&
            ((o = n.stateNode = vg(n.type, n.pendingProps, ve.current)),
            (pn = n),
            (da = !0),
            (f = Tt),
            Lr(n.type) ? ((id = f), (Tt = ma(o.firstChild))) : (Tt = f)),
          gn(t, n, n.pendingProps.children, l),
          xs(t, n),
          t === null && (n.flags |= 4194304),
          n.child
        );
      case 5:
        return (
          t === null &&
            at &&
            ((f = o = Tt) &&
              ((o = E1(o, n.type, n.pendingProps, da)),
              o !== null
                ? ((n.stateNode = o), (pn = n), (Tt = ma(o.firstChild)), (da = !1), (f = !0))
                : (f = !1)),
            f || Sr(n)),
          un(n),
          (f = n.type),
          (d = n.pendingProps),
          (g = t !== null ? t.memoizedProps : null),
          (o = d.children),
          td(f, d) ? (o = null) : g !== null && td(f, g) && (n.flags |= 32),
          n.memoizedState !== null && ((f = Wc(t, n, jE, null, null, l)), (mo._currentValue = f)),
          xs(t, n),
          gn(t, n, o, l),
          n.child
        );
      case 6:
        return (
          t === null &&
            at &&
            ((t = l = Tt) &&
              ((l = w1(l, n.pendingProps, da)),
              l !== null ? ((n.stateNode = l), (pn = n), (Tt = null), (t = !0)) : (t = !1)),
            t || Sr(n)),
          null
        );
      case 13:
        return lv(t, n, l);
      case 4:
        return (
          He(n, n.stateNode.containerInfo),
          (o = n.pendingProps),
          t === null ? (n.child = cl(n, null, o, l)) : gn(t, n, o, l),
          n.child
        );
      case 11:
        return Qp(t, n, n.type, n.pendingProps, l);
      case 7:
        return (gn(t, n, n.pendingProps, l), n.child);
      case 8:
        return (gn(t, n, n.pendingProps.children, l), n.child);
      case 12:
        return (gn(t, n, n.pendingProps.children, l), n.child);
      case 10:
        return ((o = n.pendingProps), Er(n, n.type, o.value), gn(t, n, o.children, l), n.child);
      case 9:
        return (
          (f = n.type._context),
          (o = n.pendingProps.children),
          il(n),
          (f = vn(f)),
          (o = o(f)),
          (n.flags |= 1),
          gn(t, n, o, l),
          n.child
        );
      case 14:
        return Kp(t, n, n.type, n.pendingProps, l);
      case 15:
        return Jp(t, n, n.type, n.pendingProps, l);
      case 19:
        return ov(t, n, l);
      case 31:
        return qE(t, n, l);
      case 22:
        return Wp(t, n, l, n.pendingProps);
      case 24:
        return (
          il(n),
          (o = vn(Kt)),
          t === null
            ? ((f = Yc()),
              f === null &&
                ((f = wt),
                (d = Zc()),
                (f.pooledCache = d),
                d.refCount++,
                d !== null && (f.pooledCacheLanes |= l),
                (f = d)),
              (n.memoizedState = { parent: o, cache: f }),
              qc(n),
              Er(n, Kt, f))
            : ((t.lanes & l) !== 0 && (Gc(t, n), Pi(n, null, null, l), Gi()),
              (f = t.memoizedState),
              (d = n.memoizedState),
              f.parent !== o
                ? ((f = { parent: o, cache: o }),
                  (n.memoizedState = f),
                  n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f),
                  Er(n, Kt, o))
                : ((o = d.cache), Er(n, Kt, o), o !== f.cache && Hc(n, [Kt], l, !0))),
          gn(t, n, n.pendingProps.children, l),
          n.child
        );
      case 29:
        throw n.pendingProps;
    }
    throw Error(i(156, n.tag));
  }
  function ir(t) {
    t.flags |= 4;
  }
  function Af(t, n, l, o, f) {
    if (((n = (t.mode & 32) !== 0) && (n = !1), n)) {
      if (((t.flags |= 16777216), (f & 335544128) === f))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Lv()) t.flags |= 8192;
        else throw ((ul = us), Fc);
    } else t.flags &= -16777217;
  }
  function uv(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0) t.flags &= -16777217;
    else if (((t.flags |= 16777216), !xg(n)))
      if (Lv()) t.flags |= 8192;
      else throw ((ul = us), Fc);
  }
  function zs(t, n) {
    (n !== null && (t.flags |= 4),
      t.flags & 16384 && ((n = t.tag !== 22 ? Vt() : 536870912), (t.lanes |= n), (ei |= n)));
  }
  function Wi(t, n) {
    if (!at)
      switch (t.tailMode) {
        case "hidden":
          n = t.tail;
          for (var l = null; n !== null; ) (n.alternate !== null && (l = n), (n = n.sibling));
          l === null ? (t.tail = null) : (l.sibling = null);
          break;
        case "collapsed":
          l = t.tail;
          for (var o = null; l !== null; ) (l.alternate !== null && (o = l), (l = l.sibling));
          o === null
            ? n || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (o.sibling = null);
      }
  }
  function At(t) {
    var n = t.alternate !== null && t.alternate.child === t.child,
      l = 0,
      o = 0;
    if (n)
      for (var f = t.child; f !== null; )
        ((l |= f.lanes | f.childLanes),
          (o |= f.subtreeFlags & 65011712),
          (o |= f.flags & 65011712),
          (f.return = t),
          (f = f.sibling));
    else
      for (f = t.child; f !== null; )
        ((l |= f.lanes | f.childLanes),
          (o |= f.subtreeFlags),
          (o |= f.flags),
          (f.return = t),
          (f = f.sibling));
    return ((t.subtreeFlags |= o), (t.childLanes = l), n);
  }
  function PE(t, n, l) {
    var o = n.pendingProps;
    switch ((Lc(n), n.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (At(n), null);
      case 1:
        return (At(n), null);
      case 3:
        return (
          (l = n.stateNode),
          (o = null),
          t !== null && (o = t.memoizedState.cache),
          n.memoizedState.cache !== o && (n.flags |= 2048),
          nr(Kt),
          Ne(),
          l.pendingContext && ((l.context = l.pendingContext), (l.pendingContext = null)),
          (t === null || t.child === null) &&
            (Zl(n)
              ? ir(n)
              : t === null ||
                (t.memoizedState.isDehydrated && (n.flags & 256) === 0) ||
                ((n.flags |= 1024), jc())),
          At(n),
          null
        );
      case 26:
        var f = n.type,
          d = n.memoizedState;
        return (
          t === null
            ? (ir(n), d !== null ? (At(n), uv(n, d)) : (At(n), Af(n, f, null, o, l)))
            : d
              ? d !== t.memoizedState
                ? (ir(n), At(n), uv(n, d))
                : (At(n), (n.flags &= -16777217))
              : ((t = t.memoizedProps), t !== o && ir(n), At(n), Af(n, f, t, o, l)),
          null
        );
      case 27:
        if ((an(n), (l = ve.current), (f = n.type), t !== null && n.stateNode != null))
          t.memoizedProps !== o && ir(n);
        else {
          if (!o) {
            if (n.stateNode === null) throw Error(i(166));
            return (At(n), null);
          }
          ((t = J.current), Zl(n) ? $m(n) : ((t = vg(f, o, l)), (n.stateNode = t), ir(n)));
        }
        return (At(n), null);
      case 5:
        if ((an(n), (f = n.type), t !== null && n.stateNode != null))
          t.memoizedProps !== o && ir(n);
        else {
          if (!o) {
            if (n.stateNode === null) throw Error(i(166));
            return (At(n), null);
          }
          if (((d = J.current), Zl(n))) $m(n);
          else {
            var g = Zs(ve.current);
            switch (d) {
              case 1:
                d = g.createElementNS("http://www.w3.org/2000/svg", f);
                break;
              case 2:
                d = g.createElementNS("http://www.w3.org/1998/Math/MathML", f);
                break;
              default:
                switch (f) {
                  case "svg":
                    d = g.createElementNS("http://www.w3.org/2000/svg", f);
                    break;
                  case "math":
                    d = g.createElementNS("http://www.w3.org/1998/Math/MathML", f);
                    break;
                  case "script":
                    ((d = g.createElement("div")),
                      (d.innerHTML = "<script><\/script>"),
                      (d = d.removeChild(d.firstChild)));
                    break;
                  case "select":
                    ((d =
                      typeof o.is == "string"
                        ? g.createElement("select", { is: o.is })
                        : g.createElement("select")),
                      o.multiple ? (d.multiple = !0) : o.size && (d.size = o.size));
                    break;
                  default:
                    d =
                      typeof o.is == "string"
                        ? g.createElement(f, { is: o.is })
                        : g.createElement(f);
                }
            }
            ((d[Se] = n), (d[we] = o));
            e: for (g = n.child; g !== null; ) {
              if (g.tag === 5 || g.tag === 6) d.appendChild(g.stateNode);
              else if (g.tag !== 4 && g.tag !== 27 && g.child !== null) {
                ((g.child.return = g), (g = g.child));
                continue;
              }
              if (g === n) break e;
              for (; g.sibling === null; ) {
                if (g.return === null || g.return === n) break e;
                g = g.return;
              }
              ((g.sibling.return = g.return), (g = g.sibling));
            }
            n.stateNode = d;
            e: switch ((yn(d, f, o), f)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                o = !!o.autoFocus;
                break e;
              case "img":
                o = !0;
                break e;
              default:
                o = !1;
            }
            o && ir(n);
          }
        }
        return (At(n), Af(n, n.type, t === null ? null : t.memoizedProps, n.pendingProps, l), null);
      case 6:
        if (t && n.stateNode != null) t.memoizedProps !== o && ir(n);
        else {
          if (typeof o != "string" && n.stateNode === null) throw Error(i(166));
          if (((t = ve.current), Zl(n))) {
            if (((t = n.stateNode), (l = n.memoizedProps), (o = null), (f = pn), f !== null))
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            ((t[Se] = n),
              (t = !!(
                t.nodeValue === l ||
                (o !== null && o.suppressHydrationWarning === !0) ||
                lg(t.nodeValue, l)
              )),
              t || Sr(n, !0));
          } else ((t = Zs(t).createTextNode(o)), (t[Se] = n), (n.stateNode = t));
        }
        return (At(n), null);
      case 31:
        if (((l = n.memoizedState), t === null || t.memoizedState !== null)) {
          if (((o = Zl(n)), l !== null)) {
            if (t === null) {
              if (!o) throw Error(i(318));
              if (((t = n.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
                throw Error(i(557));
              t[Se] = n;
            } else (rl(), (n.flags & 128) === 0 && (n.memoizedState = null), (n.flags |= 4));
            (At(n), (t = !1));
          } else
            ((l = jc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = l),
              (t = !0));
          if (!t) return n.flags & 256 ? (Qn(n), n) : (Qn(n), null);
          if ((n.flags & 128) !== 0) throw Error(i(558));
        }
        return (At(n), null);
      case 13:
        if (
          ((o = n.memoizedState),
          t === null || (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((f = Zl(n)), o !== null && o.dehydrated !== null)) {
            if (t === null) {
              if (!f) throw Error(i(318));
              if (((f = n.memoizedState), (f = f !== null ? f.dehydrated : null), !f))
                throw Error(i(317));
              f[Se] = n;
            } else (rl(), (n.flags & 128) === 0 && (n.memoizedState = null), (n.flags |= 4));
            (At(n), (f = !1));
          } else
            ((f = jc()),
              t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = f),
              (f = !0));
          if (!f) return n.flags & 256 ? (Qn(n), n) : (Qn(n), null);
        }
        return (
          Qn(n),
          (n.flags & 128) !== 0
            ? ((n.lanes = l), n)
            : ((l = o !== null),
              (t = t !== null && t.memoizedState !== null),
              l &&
                ((o = n.child),
                (f = null),
                o.alternate !== null &&
                  o.alternate.memoizedState !== null &&
                  o.alternate.memoizedState.cachePool !== null &&
                  (f = o.alternate.memoizedState.cachePool.pool),
                (d = null),
                o.memoizedState !== null &&
                  o.memoizedState.cachePool !== null &&
                  (d = o.memoizedState.cachePool.pool),
                d !== f && (o.flags |= 2048)),
              l !== t && l && (n.child.flags |= 8192),
              zs(n, n.updateQueue),
              At(n),
              null)
        );
      case 4:
        return (Ne(), t === null && Qf(n.stateNode.containerInfo), At(n), null);
      case 10:
        return (nr(n.type), At(n), null);
      case 19:
        if ((I(qt), (o = n.memoizedState), o === null)) return (At(n), null);
        if (((f = (n.flags & 128) !== 0), (d = o.rendering), d === null))
          if (f) Wi(o, !1);
          else {
            if (Ht !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = n.child; t !== null; ) {
                if (((d = hs(t)), d !== null)) {
                  for (
                    n.flags |= 128,
                      Wi(o, !1),
                      t = d.updateQueue,
                      n.updateQueue = t,
                      zs(n, t),
                      n.subtreeFlags = 0,
                      t = l,
                      l = n.child;
                    l !== null;
                  )
                    (jm(l, t), (l = l.sibling));
                  return (q(qt, (qt.current & 1) | 2), at && er(n, o.treeForkCount), n.child);
                }
                t = t.sibling;
              }
            o.tail !== null &&
              Xt() > Ds &&
              ((n.flags |= 128), (f = !0), Wi(o, !1), (n.lanes = 4194304));
          }
        else {
          if (!f)
            if (((t = hs(d)), t !== null)) {
              if (
                ((n.flags |= 128),
                (f = !0),
                (t = t.updateQueue),
                (n.updateQueue = t),
                zs(n, t),
                Wi(o, !0),
                o.tail === null && o.tailMode === "hidden" && !d.alternate && !at)
              )
                return (At(n), null);
            } else
              2 * Xt() - o.renderingStartTime > Ds &&
                l !== 536870912 &&
                ((n.flags |= 128), (f = !0), Wi(o, !1), (n.lanes = 4194304));
          o.isBackwards
            ? ((d.sibling = n.child), (n.child = d))
            : ((t = o.last), t !== null ? (t.sibling = d) : (n.child = d), (o.last = d));
        }
        return o.tail !== null
          ? ((t = o.tail),
            (o.rendering = t),
            (o.tail = t.sibling),
            (o.renderingStartTime = Xt()),
            (t.sibling = null),
            (l = qt.current),
            q(qt, f ? (l & 1) | 2 : l & 1),
            at && er(n, o.treeForkCount),
            t)
          : (At(n), null);
      case 22:
      case 23:
        return (
          Qn(n),
          Qc(),
          (o = n.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== o && (n.flags |= 8192)
            : o && (n.flags |= 8192),
          o
            ? (l & 536870912) !== 0 &&
              (n.flags & 128) === 0 &&
              (At(n), n.subtreeFlags & 6 && (n.flags |= 8192))
            : At(n),
          (l = n.updateQueue),
          l !== null && zs(n, l.retryQueue),
          (l = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          (o = null),
          n.memoizedState !== null &&
            n.memoizedState.cachePool !== null &&
            (o = n.memoizedState.cachePool.pool),
          o !== l && (n.flags |= 2048),
          t !== null && I(ol),
          null
        );
      case 24:
        return (
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          n.memoizedState.cache !== l && (n.flags |= 2048),
          nr(Kt),
          At(n),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, n.tag));
  }
  function XE(t, n) {
    switch ((Lc(n), n.tag)) {
      case 1:
        return ((t = n.flags), t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null);
      case 3:
        return (
          nr(Kt),
          Ne(),
          (t = n.flags),
          (t & 65536) !== 0 && (t & 128) === 0 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 26:
      case 27:
      case 5:
        return (an(n), null);
      case 31:
        if (n.memoizedState !== null) {
          if ((Qn(n), n.alternate === null)) throw Error(i(340));
          rl();
        }
        return ((t = n.flags), t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null);
      case 13:
        if ((Qn(n), (t = n.memoizedState), t !== null && t.dehydrated !== null)) {
          if (n.alternate === null) throw Error(i(340));
          rl();
        }
        return ((t = n.flags), t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null);
      case 19:
        return (I(qt), null);
      case 4:
        return (Ne(), null);
      case 10:
        return (nr(n.type), null);
      case 22:
      case 23:
        return (
          Qn(n),
          Qc(),
          t !== null && I(ol),
          (t = n.flags),
          t & 65536 ? ((n.flags = (t & -65537) | 128), n) : null
        );
      case 24:
        return (nr(Kt), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function cv(t, n) {
    switch ((Lc(n), n.tag)) {
      case 3:
        (nr(Kt), Ne());
        break;
      case 26:
      case 27:
      case 5:
        an(n);
        break;
      case 4:
        Ne();
        break;
      case 31:
        n.memoizedState !== null && Qn(n);
        break;
      case 13:
        Qn(n);
        break;
      case 19:
        I(qt);
        break;
      case 10:
        nr(n.type);
        break;
      case 22:
      case 23:
        (Qn(n), Qc(), t !== null && I(ol));
        break;
      case 24:
        nr(Kt);
    }
  }
  function eo(t, n) {
    try {
      var l = n.updateQueue,
        o = l !== null ? l.lastEffect : null;
      if (o !== null) {
        var f = o.next;
        l = f;
        do {
          if ((l.tag & t) === t) {
            o = void 0;
            var d = l.create,
              g = l.inst;
            ((o = d()), (g.destroy = o));
          }
          l = l.next;
        } while (l !== f);
      }
    } catch (b) {
      pt(n, n.return, b);
    }
  }
  function Ar(t, n, l) {
    try {
      var o = n.updateQueue,
        f = o !== null ? o.lastEffect : null;
      if (f !== null) {
        var d = f.next;
        o = d;
        do {
          if ((o.tag & t) === t) {
            var g = o.inst,
              b = g.destroy;
            if (b !== void 0) {
              ((g.destroy = void 0), (f = n));
              var C = l,
                Z = b;
              try {
                Z();
              } catch (W) {
                pt(f, C, W);
              }
            }
          }
          o = o.next;
        } while (o !== d);
      }
    } catch (W) {
      pt(n, n.return, W);
    }
  }
  function fv(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var l = t.stateNode;
      try {
        tp(n, l);
      } catch (o) {
        pt(t, t.return, o);
      }
    }
  }
  function dv(t, n, l) {
    ((l.props = dl(t.type, t.memoizedProps)), (l.state = t.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (o) {
      pt(t, n, o);
    }
  }
  function to(t, n) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var o = t.stateNode;
            break;
          case 30:
            o = t.stateNode;
            break;
          default:
            o = t.stateNode;
        }
        typeof l == "function" ? (t.refCleanup = l(o)) : (l.current = o);
      }
    } catch (f) {
      pt(t, n, f);
    }
  }
  function ja(t, n) {
    var l = t.ref,
      o = t.refCleanup;
    if (l !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (f) {
          pt(t, n, f);
        } finally {
          ((t.refCleanup = null), (t = t.alternate), t != null && (t.refCleanup = null));
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (f) {
          pt(t, n, f);
        }
      else l.current = null;
  }
  function hv(t) {
    var n = t.type,
      l = t.memoizedProps,
      o = t.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && o.focus();
          break e;
        case "img":
          l.src ? (o.src = l.src) : l.srcSet && (o.srcset = l.srcSet);
      }
    } catch (f) {
      pt(t, t.return, f);
    }
  }
  function Of(t, n, l) {
    try {
      var o = t.stateNode;
      (v1(o, t.type, l, n), (o[we] = n));
    } catch (f) {
      pt(t, t.return, f);
    }
  }
  function mv(t) {
    return (
      t.tag === 5 || t.tag === 3 || t.tag === 26 || (t.tag === 27 && Lr(t.type)) || t.tag === 4
    );
  }
  function Cf(t) {
    e: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || mv(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if ((t.tag === 27 && Lr(t.type)) || t.flags & 2 || t.child === null || t.tag === 4)
          continue e;
        ((t.child.return = t), (t = t.child));
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Df(t, n, l) {
    var o = t.tag;
    if (o === 5 || o === 6)
      ((t = t.stateNode),
        n
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l
            ).insertBefore(t, n)
          : ((n = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l),
            n.appendChild(t),
            (l = l._reactRootContainer),
            l != null || n.onclick !== null || (n.onclick = Ka)));
    else if (
      o !== 4 &&
      (o === 27 && Lr(t.type) && ((l = t.stateNode), (n = null)), (t = t.child), t !== null)
    )
      for (Df(t, n, l), t = t.sibling; t !== null; ) (Df(t, n, l), (t = t.sibling));
  }
  function Ts(t, n, l) {
    var o = t.tag;
    if (o === 5 || o === 6) ((t = t.stateNode), n ? l.insertBefore(t, n) : l.appendChild(t));
    else if (o !== 4 && (o === 27 && Lr(t.type) && (l = t.stateNode), (t = t.child), t !== null))
      for (Ts(t, n, l), t = t.sibling; t !== null; ) (Ts(t, n, l), (t = t.sibling));
  }
  function pv(t) {
    var n = t.stateNode,
      l = t.memoizedProps;
    try {
      for (var o = t.type, f = n.attributes; f.length; ) n.removeAttributeNode(f[0]);
      (yn(n, o, l), (n[Se] = t), (n[we] = l));
    } catch (d) {
      pt(t, t.return, d);
    }
  }
  var or = !1,
    en = !1,
    Mf = !1,
    vv = typeof WeakSet == "function" ? WeakSet : Set,
    hn = null;
  function IE(t, n) {
    if (((t = t.containerInfo), (Wf = Xs), (t = Am(t)), xc(t))) {
      if ("selectionStart" in t) var l = { start: t.selectionStart, end: t.selectionEnd };
      else
        e: {
          l = ((l = t.ownerDocument) && l.defaultView) || window;
          var o = l.getSelection && l.getSelection();
          if (o && o.rangeCount !== 0) {
            l = o.anchorNode;
            var f = o.anchorOffset,
              d = o.focusNode;
            o = o.focusOffset;
            try {
              (l.nodeType, d.nodeType);
            } catch {
              l = null;
              break e;
            }
            var g = 0,
              b = -1,
              C = -1,
              Z = 0,
              W = 0,
              ae = t,
              Y = null;
            t: for (;;) {
              for (
                var P;
                ae !== l || (f !== 0 && ae.nodeType !== 3) || (b = g + f),
                  ae !== d || (o !== 0 && ae.nodeType !== 3) || (C = g + o),
                  ae.nodeType === 3 && (g += ae.nodeValue.length),
                  (P = ae.firstChild) !== null;
              )
                ((Y = ae), (ae = P));
              for (;;) {
                if (ae === t) break t;
                if (
                  (Y === l && ++Z === f && (b = g),
                  Y === d && ++W === o && (C = g),
                  (P = ae.nextSibling) !== null)
                )
                  break;
                ((ae = Y), (Y = ae.parentNode));
              }
              ae = P;
            }
            l = b === -1 || C === -1 ? null : { start: b, end: C };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (ed = { focusedElem: t, selectionRange: l }, Xs = !1, hn = n; hn !== null; )
      if (((n = hn), (t = n.child), (n.subtreeFlags & 1028) !== 0 && t !== null))
        ((t.return = n), (hn = t));
      else
        for (; hn !== null; ) {
          switch (((n = hn), (d = n.alternate), (t = n.flags), n.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = n.updateQueue), (t = t !== null ? t.events : null), t !== null)
              )
                for (l = 0; l < t.length; l++) ((f = t[l]), (f.ref.impl = f.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && d !== null) {
                ((t = void 0),
                  (l = n),
                  (f = d.memoizedProps),
                  (d = d.memoizedState),
                  (o = l.stateNode));
                try {
                  var Ce = dl(l.type, f);
                  ((t = o.getSnapshotBeforeUpdate(Ce, d)),
                    (o.__reactInternalSnapshotBeforeUpdate = t));
                } catch (Ze) {
                  pt(l, l.return, Ze);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (((t = n.stateNode.containerInfo), (l = t.nodeType), l === 9)) ad(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ad(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(i(163));
          }
          if (((t = n.sibling), t !== null)) {
            ((t.return = n.return), (hn = t));
            break;
          }
          hn = n.return;
        }
  }
  function gv(t, n, l) {
    var o = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (ur(t, l), o & 4 && eo(5, l));
        break;
      case 1:
        if ((ur(t, l), o & 4))
          if (((t = l.stateNode), n === null))
            try {
              t.componentDidMount();
            } catch (g) {
              pt(l, l.return, g);
            }
          else {
            var f = dl(l.type, n.memoizedProps);
            n = n.memoizedState;
            try {
              t.componentDidUpdate(f, n, t.__reactInternalSnapshotBeforeUpdate);
            } catch (g) {
              pt(l, l.return, g);
            }
          }
        (o & 64 && fv(l), o & 512 && to(l, l.return));
        break;
      case 3:
        if ((ur(t, l), o & 64 && ((t = l.updateQueue), t !== null))) {
          if (((n = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                n = l.child.stateNode;
                break;
              case 1:
                n = l.child.stateNode;
            }
          try {
            tp(t, n);
          } catch (g) {
            pt(l, l.return, g);
          }
        }
        break;
      case 27:
        n === null && o & 4 && pv(l);
      case 26:
      case 5:
        (ur(t, l), n === null && o & 4 && hv(l), o & 512 && to(l, l.return));
        break;
      case 12:
        ur(t, l);
        break;
      case 31:
        (ur(t, l), o & 4 && _v(t, l));
        break;
      case 13:
        (ur(t, l),
          o & 4 && Sv(t, l),
          o & 64 &&
            ((t = l.memoizedState),
            t !== null && ((t = t.dehydrated), t !== null && ((l = r1.bind(null, l)), x1(t, l)))));
        break;
      case 22:
        if (((o = l.memoizedState !== null || or), !o)) {
          ((n = (n !== null && n.memoizedState !== null) || en), (f = or));
          var d = en;
          ((or = o),
            (en = n) && !d ? cr(t, l, (l.subtreeFlags & 8772) !== 0) : ur(t, l),
            (or = f),
            (en = d));
        }
        break;
      case 30:
        break;
      default:
        ur(t, l);
    }
  }
  function yv(t) {
    var n = t.alternate;
    (n !== null && ((t.alternate = null), yv(n)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((n = t.stateNode), n !== null && it(n)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null));
  }
  var Ot = null,
    Ln = !1;
  function sr(t, n, l) {
    for (l = l.child; l !== null; ) (bv(t, n, l), (l = l.sibling));
  }
  function bv(t, n, l) {
    if (oe && typeof oe.onCommitFiberUnmount == "function")
      try {
        oe.onCommitFiberUnmount(le, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (en || ja(l, n),
          sr(t, n, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        en || ja(l, n);
        var o = Ot,
          f = Ln;
        (Lr(l.type) && ((Ot = l.stateNode), (Ln = !1)),
          sr(t, n, l),
          co(l.stateNode),
          (Ot = o),
          (Ln = f));
        break;
      case 5:
        en || ja(l, n);
      case 6:
        if (((o = Ot), (f = Ln), (Ot = null), sr(t, n, l), (Ot = o), (Ln = f), Ot !== null))
          if (Ln)
            try {
              (Ot.nodeType === 9
                ? Ot.body
                : Ot.nodeName === "HTML"
                  ? Ot.ownerDocument.body
                  : Ot
              ).removeChild(l.stateNode);
            } catch (d) {
              pt(l, n, d);
            }
          else
            try {
              Ot.removeChild(l.stateNode);
            } catch (d) {
              pt(l, n, d);
            }
        break;
      case 18:
        Ot !== null &&
          (Ln
            ? ((t = Ot),
              fg(
                t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
                l.stateNode,
              ),
              si(t))
            : fg(Ot, l.stateNode));
        break;
      case 4:
        ((o = Ot),
          (f = Ln),
          (Ot = l.stateNode.containerInfo),
          (Ln = !0),
          sr(t, n, l),
          (Ot = o),
          (Ln = f));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Ar(2, l, n), en || Ar(4, l, n), sr(t, n, l));
        break;
      case 1:
        (en ||
          (ja(l, n), (o = l.stateNode), typeof o.componentWillUnmount == "function" && dv(l, n, o)),
          sr(t, n, l));
        break;
      case 21:
        sr(t, n, l);
        break;
      case 22:
        ((en = (o = en) || l.memoizedState !== null), sr(t, n, l), (en = o));
        break;
      default:
        sr(t, n, l);
    }
  }
  function _v(t, n) {
    if (
      n.memoizedState === null &&
      ((t = n.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        si(t);
      } catch (l) {
        pt(n, n.return, l);
      }
    }
  }
  function Sv(t, n) {
    if (
      n.memoizedState === null &&
      ((t = n.alternate),
      t !== null && ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        si(t);
      } catch (l) {
        pt(n, n.return, l);
      }
  }
  function QE(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return (n === null && (n = t.stateNode = new vv()), n);
      case 22:
        return (
          (t = t.stateNode), (n = t._retryCache), n === null && (n = t._retryCache = new vv()), n
        );
      default:
        throw Error(i(435, t.tag));
    }
  }
  function As(t, n) {
    var l = QE(t);
    n.forEach(function (o) {
      if (!l.has(o)) {
        l.add(o);
        var f = l1.bind(null, t, o);
        o.then(f, f);
      }
    });
  }
  function Un(t, n) {
    var l = n.deletions;
    if (l !== null)
      for (var o = 0; o < l.length; o++) {
        var f = l[o],
          d = t,
          g = n,
          b = g;
        e: for (; b !== null; ) {
          switch (b.tag) {
            case 27:
              if (Lr(b.type)) {
                ((Ot = b.stateNode), (Ln = !1));
                break e;
              }
              break;
            case 5:
              ((Ot = b.stateNode), (Ln = !1));
              break e;
            case 3:
            case 4:
              ((Ot = b.stateNode.containerInfo), (Ln = !0));
              break e;
          }
          b = b.return;
        }
        if (Ot === null) throw Error(i(160));
        (bv(d, g, f),
          (Ot = null),
          (Ln = !1),
          (d = f.alternate),
          d !== null && (d.return = null),
          (f.return = null));
      }
    if (n.subtreeFlags & 13886) for (n = n.child; n !== null; ) (Ev(n, t), (n = n.sibling));
  }
  var za = null;
  function Ev(t, n) {
    var l = t.alternate,
      o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Un(n, t), jn(t), o & 4 && (Ar(3, t, t.return), eo(3, t), Ar(5, t, t.return)));
        break;
      case 1:
        (Un(n, t),
          jn(t),
          o & 512 && (en || l === null || ja(l, l.return)),
          o & 64 &&
            or &&
            ((t = t.updateQueue),
            t !== null &&
              ((o = t.callbacks),
              o !== null &&
                ((l = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = l === null ? o : l.concat(o))))));
        break;
      case 26:
        var f = za;
        if ((Un(n, t), jn(t), o & 512 && (en || l === null || ja(l, l.return)), o & 4)) {
          var d = l !== null ? l.memoizedState : null;
          if (((o = t.memoizedState), l === null))
            if (o === null)
              if (t.stateNode === null) {
                e: {
                  ((o = t.type), (l = t.memoizedProps), (f = f.ownerDocument || f));
                  t: switch (o) {
                    case "title":
                      ((d = f.getElementsByTagName("title")[0]),
                        (!d ||
                          d[Ke] ||
                          d[Se] ||
                          d.namespaceURI === "http://www.w3.org/2000/svg" ||
                          d.hasAttribute("itemprop")) &&
                          ((d = f.createElement(o)),
                          f.head.insertBefore(d, f.querySelector("head > title"))),
                        yn(d, o, l),
                        (d[Se] = t),
                        lt(d),
                        (o = d));
                      break e;
                    case "link":
                      var g = Eg("link", "href", f).get(o + (l.href || ""));
                      if (g) {
                        for (var b = 0; b < g.length; b++)
                          if (
                            ((d = g[b]),
                            d.getAttribute("href") ===
                              (l.href == null || l.href === "" ? null : l.href) &&
                              d.getAttribute("rel") === (l.rel == null ? null : l.rel) &&
                              d.getAttribute("title") === (l.title == null ? null : l.title) &&
                              d.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            g.splice(b, 1);
                            break t;
                          }
                      }
                      ((d = f.createElement(o)), yn(d, o, l), f.head.appendChild(d));
                      break;
                    case "meta":
                      if ((g = Eg("meta", "content", f).get(o + (l.content || "")))) {
                        for (b = 0; b < g.length; b++)
                          if (
                            ((d = g[b]),
                            d.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              d.getAttribute("name") === (l.name == null ? null : l.name) &&
                              d.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              d.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              d.getAttribute("charset") === (l.charSet == null ? null : l.charSet))
                          ) {
                            g.splice(b, 1);
                            break t;
                          }
                      }
                      ((d = f.createElement(o)), yn(d, o, l), f.head.appendChild(d));
                      break;
                    default:
                      throw Error(i(468, o));
                  }
                  ((d[Se] = t), lt(d), (o = d));
                }
                t.stateNode = o;
              } else wg(f, t.type, t.stateNode);
            else t.stateNode = Sg(f, o, t.memoizedProps);
          else
            d !== o
              ? (d === null
                  ? l.stateNode !== null && ((l = l.stateNode), l.parentNode.removeChild(l))
                  : d.count--,
                o === null ? wg(f, t.type, t.stateNode) : Sg(f, o, t.memoizedProps))
              : o === null && t.stateNode !== null && Of(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (Un(n, t),
          jn(t),
          o & 512 && (en || l === null || ja(l, l.return)),
          l !== null && o & 4 && Of(t, t.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if ((Un(n, t), jn(t), o & 512 && (en || l === null || ja(l, l.return)), t.flags & 32)) {
          f = t.stateNode;
          try {
            Dl(f, "");
          } catch (Ce) {
            pt(t, t.return, Ce);
          }
        }
        (o & 4 &&
          t.stateNode != null &&
          ((f = t.memoizedProps), Of(t, f, l !== null ? l.memoizedProps : f)),
          o & 1024 && (Mf = !0));
        break;
      case 6:
        if ((Un(n, t), jn(t), o & 4)) {
          if (t.stateNode === null) throw Error(i(162));
          ((o = t.memoizedProps), (l = t.stateNode));
          try {
            l.nodeValue = o;
          } catch (Ce) {
            pt(t, t.return, Ce);
          }
        }
        break;
      case 3:
        if (
          ((Fs = null),
          (f = za),
          (za = $s(n.containerInfo)),
          Un(n, t),
          (za = f),
          jn(t),
          o & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            si(n.containerInfo);
          } catch (Ce) {
            pt(t, t.return, Ce);
          }
        Mf && ((Mf = !1), wv(t));
        break;
      case 4:
        ((o = za), (za = $s(t.stateNode.containerInfo)), Un(n, t), jn(t), (za = o));
        break;
      case 12:
        (Un(n, t), jn(t));
        break;
      case 31:
        (Un(n, t),
          jn(t),
          o & 4 && ((o = t.updateQueue), o !== null && ((t.updateQueue = null), As(t, o))));
        break;
      case 13:
        (Un(n, t),
          jn(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) != (l !== null && l.memoizedState !== null) &&
            (Cs = Xt()),
          o & 4 && ((o = t.updateQueue), o !== null && ((t.updateQueue = null), As(t, o))));
        break;
      case 22:
        f = t.memoizedState !== null;
        var C = l !== null && l.memoizedState !== null,
          Z = or,
          W = en;
        if (((or = Z || f), (en = W || C), Un(n, t), (en = W), (or = Z), jn(t), o & 8192))
          e: for (
            n = t.stateNode,
              n._visibility = f ? n._visibility & -2 : n._visibility | 1,
              f && (l === null || C || or || en || hl(t)),
              l = null,
              n = t;
            ;
          ) {
            if (n.tag === 5 || n.tag === 26) {
              if (l === null) {
                C = l = n;
                try {
                  if (((d = C.stateNode), f))
                    ((g = d.style),
                      typeof g.setProperty == "function"
                        ? g.setProperty("display", "none", "important")
                        : (g.display = "none"));
                  else {
                    b = C.stateNode;
                    var ae = C.memoizedProps.style,
                      Y = ae != null && ae.hasOwnProperty("display") ? ae.display : null;
                    b.style.display = Y == null || typeof Y == "boolean" ? "" : ("" + Y).trim();
                  }
                } catch (Ce) {
                  pt(C, C.return, Ce);
                }
              }
            } else if (n.tag === 6) {
              if (l === null) {
                C = n;
                try {
                  C.stateNode.nodeValue = f ? "" : C.memoizedProps;
                } catch (Ce) {
                  pt(C, C.return, Ce);
                }
              }
            } else if (n.tag === 18) {
              if (l === null) {
                C = n;
                try {
                  var P = C.stateNode;
                  f ? dg(P, !0) : dg(C.stateNode, !1);
                } catch (Ce) {
                  pt(C, C.return, Ce);
                }
              }
            } else if (
              ((n.tag !== 22 && n.tag !== 23) || n.memoizedState === null || n === t) &&
              n.child !== null
            ) {
              ((n.child.return = n), (n = n.child));
              continue;
            }
            if (n === t) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break e;
              (l === n && (l = null), (n = n.return));
            }
            (l === n && (l = null), (n.sibling.return = n.return), (n = n.sibling));
          }
        o & 4 &&
          ((o = t.updateQueue),
          o !== null && ((l = o.retryQueue), l !== null && ((o.retryQueue = null), As(t, l))));
        break;
      case 19:
        (Un(n, t),
          jn(t),
          o & 4 && ((o = t.updateQueue), o !== null && ((t.updateQueue = null), As(t, o))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Un(n, t), jn(t));
    }
  }
  function jn(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var l, o = t.return; o !== null; ) {
          if (mv(o)) {
            l = o;
            break;
          }
          o = o.return;
        }
        if (l == null) throw Error(i(160));
        switch (l.tag) {
          case 27:
            var f = l.stateNode,
              d = Cf(t);
            Ts(t, d, f);
            break;
          case 5:
            var g = l.stateNode;
            l.flags & 32 && (Dl(g, ""), (l.flags &= -33));
            var b = Cf(t);
            Ts(t, b, g);
            break;
          case 3:
          case 4:
            var C = l.stateNode.containerInfo,
              Z = Cf(t);
            Df(t, Z, C);
            break;
          default:
            throw Error(i(161));
        }
      } catch (W) {
        pt(t, t.return, W);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function wv(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        (wv(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), (t = t.sibling));
      }
  }
  function ur(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; ) (gv(t, n.alternate, n), (n = n.sibling));
  }
  function hl(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Ar(4, n, n.return), hl(n));
          break;
        case 1:
          ja(n, n.return);
          var l = n.stateNode;
          (typeof l.componentWillUnmount == "function" && dv(n, n.return, l), hl(n));
          break;
        case 27:
          co(n.stateNode);
        case 26:
        case 5:
          (ja(n, n.return), hl(n));
          break;
        case 22:
          n.memoizedState === null && hl(n);
          break;
        case 30:
          hl(n);
          break;
        default:
          hl(n);
      }
      t = t.sibling;
    }
  }
  function cr(t, n, l) {
    for (l = l && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate,
        f = t,
        d = n,
        g = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          (cr(f, d, l), eo(4, d));
          break;
        case 1:
          if ((cr(f, d, l), (o = d), (f = o.stateNode), typeof f.componentDidMount == "function"))
            try {
              f.componentDidMount();
            } catch (Z) {
              pt(o, o.return, Z);
            }
          if (((o = d), (f = o.updateQueue), f !== null)) {
            var b = o.stateNode;
            try {
              var C = f.shared.hiddenCallbacks;
              if (C !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < C.length; f++) ep(C[f], b);
            } catch (Z) {
              pt(o, o.return, Z);
            }
          }
          (l && g & 64 && fv(d), to(d, d.return));
          break;
        case 27:
          pv(d);
        case 26:
        case 5:
          (cr(f, d, l), l && o === null && g & 4 && hv(d), to(d, d.return));
          break;
        case 12:
          cr(f, d, l);
          break;
        case 31:
          (cr(f, d, l), l && g & 4 && _v(f, d));
          break;
        case 13:
          (cr(f, d, l), l && g & 4 && Sv(f, d));
          break;
        case 22:
          (d.memoizedState === null && cr(f, d, l), to(d, d.return));
          break;
        case 30:
          break;
        default:
          cr(f, d, l);
      }
      n = n.sibling;
    }
  }
  function Nf(t, n) {
    var l = null;
    (t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (l = t.memoizedState.cachePool.pool),
      (t = null),
      n.memoizedState !== null &&
        n.memoizedState.cachePool !== null &&
        (t = n.memoizedState.cachePool.pool),
      t !== l && (t != null && t.refCount++, l != null && Zi(l)));
  }
  function kf(t, n) {
    ((t = null),
      n.alternate !== null && (t = n.alternate.memoizedState.cache),
      (n = n.memoizedState.cache),
      n !== t && (n.refCount++, t != null && Zi(t)));
  }
  function Ta(t, n, l, o) {
    if (n.subtreeFlags & 10256) for (n = n.child; n !== null; ) (xv(t, n, l, o), (n = n.sibling));
  }
  function xv(t, n, l, o) {
    var f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (Ta(t, n, l, o), f & 2048 && eo(9, n));
        break;
      case 1:
        Ta(t, n, l, o);
        break;
      case 3:
        (Ta(t, n, l, o),
          f & 2048 &&
            ((t = null),
            n.alternate !== null && (t = n.alternate.memoizedState.cache),
            (n = n.memoizedState.cache),
            n !== t && (n.refCount++, t != null && Zi(t))));
        break;
      case 12:
        if (f & 2048) {
          (Ta(t, n, l, o), (t = n.stateNode));
          try {
            var d = n.memoizedProps,
              g = d.id,
              b = d.onPostCommit;
            typeof b == "function" &&
              b(g, n.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
          } catch (C) {
            pt(n, n.return, C);
          }
        } else Ta(t, n, l, o);
        break;
      case 31:
        Ta(t, n, l, o);
        break;
      case 13:
        Ta(t, n, l, o);
        break;
      case 23:
        break;
      case 22:
        ((d = n.stateNode),
          (g = n.alternate),
          n.memoizedState !== null
            ? d._visibility & 2
              ? Ta(t, n, l, o)
              : no(t, n)
            : d._visibility & 2
              ? Ta(t, n, l, o)
              : ((d._visibility |= 2), Kl(t, n, l, o, (n.subtreeFlags & 10256) !== 0 || !1)),
          f & 2048 && Nf(g, n));
        break;
      case 24:
        (Ta(t, n, l, o), f & 2048 && kf(n.alternate, n));
        break;
      default:
        Ta(t, n, l, o);
    }
  }
  function Kl(t, n, l, o, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var d = t,
        g = n,
        b = l,
        C = o,
        Z = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          (Kl(d, g, b, C, f), eo(8, g));
          break;
        case 23:
          break;
        case 22:
          var W = g.stateNode;
          (g.memoizedState !== null
            ? W._visibility & 2
              ? Kl(d, g, b, C, f)
              : no(d, g)
            : ((W._visibility |= 2), Kl(d, g, b, C, f)),
            f && Z & 2048 && Nf(g.alternate, g));
          break;
        case 24:
          (Kl(d, g, b, C, f), f && Z & 2048 && kf(g.alternate, g));
          break;
        default:
          Kl(d, g, b, C, f);
      }
      n = n.sibling;
    }
  }
  function no(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var l = t,
          o = n,
          f = o.flags;
        switch (o.tag) {
          case 22:
            (no(l, o), f & 2048 && Nf(o.alternate, o));
            break;
          case 24:
            (no(l, o), f & 2048 && kf(o.alternate, o));
            break;
          default:
            no(l, o);
        }
        n = n.sibling;
      }
  }
  var ao = 8192;
  function Jl(t, n, l) {
    if (t.subtreeFlags & ao) for (t = t.child; t !== null; ) (Rv(t, n, l), (t = t.sibling));
  }
  function Rv(t, n, l) {
    switch (t.tag) {
      case 26:
        (Jl(t, n, l),
          t.flags & ao && t.memoizedState !== null && U1(l, za, t.memoizedState, t.memoizedProps));
        break;
      case 5:
        Jl(t, n, l);
        break;
      case 3:
      case 4:
        var o = za;
        ((za = $s(t.stateNode.containerInfo)), Jl(t, n, l), (za = o));
        break;
      case 22:
        t.memoizedState === null &&
          ((o = t.alternate),
          o !== null && o.memoizedState !== null
            ? ((o = ao), (ao = 16777216), Jl(t, n, l), (ao = o))
            : Jl(t, n, l));
        break;
      default:
        Jl(t, n, l);
    }
  }
  function zv(t) {
    var n = t.alternate;
    if (n !== null && ((t = n.child), t !== null)) {
      n.child = null;
      do ((n = t.sibling), (t.sibling = null), (t = n));
      while (t !== null);
    }
  }
  function ro(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var o = n[l];
          ((hn = o), Av(o, t));
        }
      zv(t);
    }
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (Tv(t), (t = t.sibling));
  }
  function Tv(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (ro(t), t.flags & 2048 && Ar(9, t, t.return));
        break;
      case 3:
        ro(t);
        break;
      case 12:
        ro(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13)
          ? ((n._visibility &= -3), Os(t))
          : ro(t);
        break;
      default:
        ro(t);
    }
  }
  function Os(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var l = 0; l < n.length; l++) {
          var o = n[l];
          ((hn = o), Av(o, t));
        }
      zv(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((n = t), n.tag)) {
        case 0:
        case 11:
        case 15:
          (Ar(8, n, n.return), Os(n));
          break;
        case 22:
          ((l = n.stateNode), l._visibility & 2 && ((l._visibility &= -3), Os(n)));
          break;
        default:
          Os(n);
      }
      t = t.sibling;
    }
  }
  function Av(t, n) {
    for (; hn !== null; ) {
      var l = hn;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Ar(8, l, n);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var o = l.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Zi(l.memoizedState.cache);
      }
      if (((o = l.child), o !== null)) ((o.return = l), (hn = o));
      else
        e: for (l = t; hn !== null; ) {
          o = hn;
          var f = o.sibling,
            d = o.return;
          if ((yv(o), o === l)) {
            hn = null;
            break e;
          }
          if (f !== null) {
            ((f.return = d), (hn = f));
            break e;
          }
          hn = d;
        }
    }
  }
  var KE = {
      getCacheForType: function (t) {
        var n = vn(Kt),
          l = n.data.get(t);
        return (l === void 0 && ((l = t()), n.data.set(t, l)), l);
      },
      cacheSignal: function () {
        return vn(Kt).controller.signal;
      },
    },
    JE = typeof WeakMap == "function" ? WeakMap : Map,
    ut = 0,
    wt = null,
    We = null,
    tt = 0,
    mt = 0,
    Kn = null,
    Or = !1,
    Wl = !1,
    Lf = !1,
    fr = 0,
    Ht = 0,
    Cr = 0,
    ml = 0,
    Uf = 0,
    Jn = 0,
    ei = 0,
    lo = null,
    Vn = null,
    jf = !1,
    Cs = 0,
    Ov = 0,
    Ds = 1 / 0,
    Ms = null,
    Dr = null,
    on = 0,
    Mr = null,
    ti = null,
    dr = 0,
    Vf = 0,
    Bf = null,
    Cv = null,
    io = 0,
    Hf = null;
  function Wn() {
    return (ut & 2) !== 0 && tt !== 0 ? tt & -tt : D.T !== null ? Gf() : re();
  }
  function Dv() {
    if (Jn === 0)
      if ((tt & 536870912) === 0 || at) {
        var t = dn;
        ((dn <<= 1), (dn & 3932160) === 0 && (dn = 262144), (Jn = t));
      } else Jn = 536870912;
    return ((t = In.current), t !== null && (t.flags |= 32), Jn);
  }
  function Bn(t, n, l) {
    (((t === wt && (mt === 2 || mt === 9)) || t.cancelPendingCommit !== null) &&
      (ni(t, 0), Nr(t, tt, Jn, !1)),
      vt(t, l),
      ((ut & 2) === 0 || t !== wt) &&
        (t === wt && ((ut & 2) === 0 && (ml |= l), Ht === 4 && Nr(t, tt, Jn, !1)), Va(t)));
  }
  function Mv(t, n, l) {
    if ((ut & 6) !== 0) throw Error(i(327));
    var o = (!l && (n & 127) === 0 && (n & t.expiredLanes) === 0) || ct(t, n),
      f = o ? t1(t, n) : $f(t, n, !0),
      d = o;
    do {
      if (f === 0) {
        Wl && !o && Nr(t, n, 0, !1);
        break;
      } else {
        if (((l = t.current.alternate), d && !WE(l))) {
          ((f = $f(t, n, !1)), (d = !1));
          continue;
        }
        if (f === 2) {
          if (((d = n), t.errorRecoveryDisabledLanes & d)) var g = 0;
          else
            ((g = t.pendingLanes & -536870913), (g = g !== 0 ? g : g & 536870912 ? 536870912 : 0));
          if (g !== 0) {
            n = g;
            e: {
              var b = t;
              f = lo;
              var C = b.current.memoizedState.isDehydrated;
              if ((C && (ni(b, g).flags |= 256), (g = $f(b, g, !1)), g !== 2)) {
                if (Lf && !C) {
                  ((b.errorRecoveryDisabledLanes |= d), (ml |= d), (f = 4));
                  break e;
                }
                ((d = Vn), (Vn = f), d !== null && (Vn === null ? (Vn = d) : Vn.push.apply(Vn, d)));
              }
              f = g;
            }
            if (((d = !1), f !== 2)) continue;
          }
        }
        if (f === 1) {
          (ni(t, 0), Nr(t, n, 0, !0));
          break;
        }
        e: {
          switch (((o = t), (d = f), d)) {
            case 0:
            case 1:
              throw Error(i(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              Nr(o, n, Jn, !Or);
              break e;
            case 2:
              Vn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((n & 62914560) === n && ((f = Cs + 300 - Xt()), 10 < f)) {
            if ((Nr(o, n, Jn, !Or), $e(o, 0, !0) !== 0)) break e;
            ((dr = n),
              (o.timeoutHandle = ug(
                Nv.bind(null, o, l, Vn, Ms, jf, n, Jn, ml, ei, Or, d, "Throttled", -0, 0),
                f,
              )));
            break e;
          }
          Nv(o, l, Vn, Ms, jf, n, Jn, ml, ei, Or, d, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Va(t);
  }
  function Nv(t, n, l, o, f, d, g, b, C, Z, W, ae, Y, P) {
    if (
      ((t.timeoutHandle = -1), (ae = n.subtreeFlags), ae & 8192 || (ae & 16785408) === 16785408)
    ) {
      ((ae = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ka,
      }),
        Rv(n, d, ae));
      var Ce = (d & 62914560) === d ? Cs - Xt() : (d & 4194048) === d ? Ov - Xt() : 0;
      if (((Ce = j1(ae, Ce)), Ce !== null)) {
        ((dr = d),
          (t.cancelPendingCommit = Ce(Zv.bind(null, t, n, d, l, o, f, g, b, C, W, ae, null, Y, P))),
          Nr(t, d, g, !Z));
        return;
      }
    }
    Zv(t, n, d, l, o, f, g, b, C);
  }
  function WE(t) {
    for (var n = t; ; ) {
      var l = n.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        n.flags & 16384 &&
        ((l = n.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var o = 0; o < l.length; o++) {
          var f = l[o],
            d = f.getSnapshot;
          f = f.value;
          try {
            if (!Pn(d(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = n.child), n.subtreeFlags & 16384 && l !== null)) ((l.return = n), (n = l));
      else {
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return !0;
          n = n.return;
        }
        ((n.sibling.return = n.return), (n = n.sibling));
      }
    }
    return !0;
  }
  function Nr(t, n, l, o) {
    ((n &= ~Uf),
      (n &= ~ml),
      (t.suspendedLanes |= n),
      (t.pingedLanes &= ~n),
      o && (t.warmLanes |= n),
      (o = t.expirationTimes));
    for (var f = n; 0 < f; ) {
      var d = 31 - ue(f),
        g = 1 << d;
      ((o[d] = -1), (f &= ~g));
    }
    l !== 0 && Pa(t, l, n);
  }
  function Ns() {
    return (ut & 6) === 0 ? (oo(0), !1) : !0;
  }
  function Zf() {
    if (We !== null) {
      if (mt === 0) var t = We.return;
      else ((t = We), (tr = ll = null), nf(t), (Gl = null), (Yi = 0), (t = We));
      for (; t !== null; ) (cv(t.alternate, t), (t = t.return));
      We = null;
    }
  }
  function ni(t, n) {
    var l = t.timeoutHandle;
    (l !== -1 && ((t.timeoutHandle = -1), b1(l)),
      (l = t.cancelPendingCommit),
      l !== null && ((t.cancelPendingCommit = null), l()),
      (dr = 0),
      Zf(),
      (wt = t),
      (We = l = Wa(t.current, null)),
      (tt = n),
      (mt = 0),
      (Kn = null),
      (Or = !1),
      (Wl = ct(t, n)),
      (Lf = !1),
      (ei = Jn = Uf = ml = Cr = Ht = 0),
      (Vn = lo = null),
      (jf = !1),
      (n & 8) !== 0 && (n |= n & 32));
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var f = 31 - ue(o),
          d = 1 << f;
        ((n |= t[f]), (o &= ~d));
      }
    return ((fr = n), es(), l);
  }
  function kv(t, n) {
    ((Pe = null),
      (D.H = Ki),
      n === ql || n === ss
        ? ((n = Qm()), (mt = 3))
        : n === Fc
          ? ((n = Qm()), (mt = 4))
          : (mt =
              n === bf
                ? 8
                : n !== null && typeof n == "object" && typeof n.then == "function"
                  ? 6
                  : 1),
      (Kn = n),
      We === null && ((Ht = 1), Es(t, ua(n, t.current))));
  }
  function Lv() {
    var t = In.current;
    return t === null
      ? !0
      : (tt & 4194048) === tt
        ? ha === null
        : (tt & 62914560) === tt || (tt & 536870912) !== 0
          ? t === ha
          : !1;
  }
  function Uv() {
    var t = D.H;
    return ((D.H = Ki), t === null ? Ki : t);
  }
  function jv() {
    var t = D.A;
    return ((D.A = KE), t);
  }
  function ks() {
    ((Ht = 4),
      Or || ((tt & 4194048) !== tt && In.current !== null) || (Wl = !0),
      ((Cr & 134217727) === 0 && (ml & 134217727) === 0) || wt === null || Nr(wt, tt, Jn, !1));
  }
  function $f(t, n, l) {
    var o = ut;
    ut |= 2;
    var f = Uv(),
      d = jv();
    ((wt !== t || tt !== n) && ((Ms = null), ni(t, n)), (n = !1));
    var g = Ht;
    e: do
      try {
        if (mt !== 0 && We !== null) {
          var b = We,
            C = Kn;
          switch (mt) {
            case 8:
              (Zf(), (g = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              In.current === null && (n = !0);
              var Z = mt;
              if (((mt = 0), (Kn = null), ai(t, b, C, Z), l && Wl)) {
                g = 0;
                break e;
              }
              break;
            default:
              ((Z = mt), (mt = 0), (Kn = null), ai(t, b, C, Z));
          }
        }
        (e1(), (g = Ht));
        break;
      } catch (W) {
        kv(t, W);
      }
    while (!0);
    return (
      n && t.shellSuspendCounter++,
      (tr = ll = null),
      (ut = o),
      (D.H = f),
      (D.A = d),
      We === null && ((wt = null), (tt = 0), es()),
      g
    );
  }
  function e1() {
    for (; We !== null; ) Vv(We);
  }
  function t1(t, n) {
    var l = ut;
    ut |= 2;
    var o = Uv(),
      f = jv();
    wt !== t || tt !== n ? ((Ms = null), (Ds = Xt() + 500), ni(t, n)) : (Wl = ct(t, n));
    e: do
      try {
        if (mt !== 0 && We !== null) {
          n = We;
          var d = Kn;
          t: switch (mt) {
            case 1:
              ((mt = 0), (Kn = null), ai(t, n, d, 1));
              break;
            case 2:
            case 9:
              if (Xm(d)) {
                ((mt = 0), (Kn = null), Bv(n));
                break;
              }
              ((n = function () {
                ((mt !== 2 && mt !== 9) || wt !== t || (mt = 7), Va(t));
              }),
                d.then(n, n));
              break e;
            case 3:
              mt = 7;
              break e;
            case 4:
              mt = 5;
              break e;
            case 7:
              Xm(d) ? ((mt = 0), (Kn = null), Bv(n)) : ((mt = 0), (Kn = null), ai(t, n, d, 7));
              break;
            case 5:
              var g = null;
              switch (We.tag) {
                case 26:
                  g = We.memoizedState;
                case 5:
                case 27:
                  var b = We;
                  if (g ? xg(g) : b.stateNode.complete) {
                    ((mt = 0), (Kn = null));
                    var C = b.sibling;
                    if (C !== null) We = C;
                    else {
                      var Z = b.return;
                      Z !== null ? ((We = Z), Ls(Z)) : (We = null);
                    }
                    break t;
                  }
              }
              ((mt = 0), (Kn = null), ai(t, n, d, 5));
              break;
            case 6:
              ((mt = 0), (Kn = null), ai(t, n, d, 6));
              break;
            case 8:
              (Zf(), (Ht = 6));
              break e;
            default:
              throw Error(i(462));
          }
        }
        n1();
        break;
      } catch (W) {
        kv(t, W);
      }
    while (!0);
    return (
      (tr = ll = null),
      (D.H = o),
      (D.A = f),
      (ut = l),
      We !== null ? 0 : ((wt = null), (tt = 0), es(), Ht)
    );
  }
  function n1() {
    for (; We !== null && !ln(); ) Vv(We);
  }
  function Vv(t) {
    var n = sv(t.alternate, t, fr);
    ((t.memoizedProps = t.pendingProps), n === null ? Ls(t) : (We = n));
  }
  function Bv(t) {
    var n = t,
      l = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = nv(l, n, n.pendingProps, n.type, void 0, tt);
        break;
      case 11:
        n = nv(l, n, n.pendingProps, n.type.render, n.ref, tt);
        break;
      case 5:
        nf(n);
      default:
        (cv(l, n), (n = We = jm(n, fr)), (n = sv(l, n, fr)));
    }
    ((t.memoizedProps = t.pendingProps), n === null ? Ls(t) : (We = n));
  }
  function ai(t, n, l, o) {
    ((tr = ll = null), nf(n), (Gl = null), (Yi = 0));
    var f = n.return;
    try {
      if (FE(t, f, n, l, tt)) {
        ((Ht = 1), Es(t, ua(l, t.current)), (We = null));
        return;
      }
    } catch (d) {
      if (f !== null) throw ((We = f), d);
      ((Ht = 1), Es(t, ua(l, t.current)), (We = null));
      return;
    }
    n.flags & 32768
      ? (at || o === 1
          ? (t = !0)
          : Wl || (tt & 536870912) !== 0
            ? (t = !1)
            : ((Or = t = !0),
              (o === 2 || o === 9 || o === 3 || o === 6) &&
                ((o = In.current), o !== null && o.tag === 13 && (o.flags |= 16384))),
        Hv(n, t))
      : Ls(n);
  }
  function Ls(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        Hv(n, Or);
        return;
      }
      t = n.return;
      var l = PE(n.alternate, n, fr);
      if (l !== null) {
        We = l;
        return;
      }
      if (((n = n.sibling), n !== null)) {
        We = n;
        return;
      }
      We = n = t;
    } while (n !== null);
    Ht === 0 && (Ht = 5);
  }
  function Hv(t, n) {
    do {
      var l = XE(t.alternate, t);
      if (l !== null) {
        ((l.flags &= 32767), (We = l));
        return;
      }
      if (
        ((l = t.return),
        l !== null && ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !n && ((t = t.sibling), t !== null))
      ) {
        We = t;
        return;
      }
      We = t = l;
    } while (t !== null);
    ((Ht = 6), (We = null));
  }
  function Zv(t, n, l, o, f, d, g, b, C) {
    t.cancelPendingCommit = null;
    do Us();
    while (on !== 0);
    if ((ut & 6) !== 0) throw Error(i(327));
    if (n !== null) {
      if (n === t.current) throw Error(i(177));
      if (
        ((d = n.lanes | n.childLanes),
        (d |= Oc),
        mn(t, l, d, g, b, C),
        t === wt && ((We = wt = null), (tt = 0)),
        (ti = n),
        (Mr = t),
        (dr = l),
        (Vf = d),
        (Bf = f),
        (Cv = o),
        (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            i1(ia, function () {
              return (Gv(), null);
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (o = (n.flags & 13878) !== 0),
        (n.subtreeFlags & 13878) !== 0 || o)
      ) {
        ((o = D.T), (D.T = null), (f = X.p), (X.p = 2), (g = ut), (ut |= 4));
        try {
          IE(t, n, l);
        } finally {
          ((ut = g), (X.p = f), (D.T = o));
        }
      }
      ((on = 1), $v(), Yv(), Fv());
    }
  }
  function $v() {
    if (on === 1) {
      on = 0;
      var t = Mr,
        n = ti,
        l = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || l) {
        ((l = D.T), (D.T = null));
        var o = X.p;
        X.p = 2;
        var f = ut;
        ut |= 4;
        try {
          Ev(n, t);
          var d = ed,
            g = Am(t.containerInfo),
            b = d.focusedElem,
            C = d.selectionRange;
          if (g !== b && b && b.ownerDocument && Tm(b.ownerDocument.documentElement, b)) {
            if (C !== null && xc(b)) {
              var Z = C.start,
                W = C.end;
              if ((W === void 0 && (W = Z), "selectionStart" in b))
                ((b.selectionStart = Z), (b.selectionEnd = Math.min(W, b.value.length)));
              else {
                var ae = b.ownerDocument || document,
                  Y = (ae && ae.defaultView) || window;
                if (Y.getSelection) {
                  var P = Y.getSelection(),
                    Ce = b.textContent.length,
                    Ze = Math.min(C.start, Ce),
                    bt = C.end === void 0 ? Ze : Math.min(C.end, Ce);
                  !P.extend && Ze > bt && ((g = bt), (bt = Ze), (Ze = g));
                  var U = zm(b, Ze),
                    M = zm(b, bt);
                  if (
                    U &&
                    M &&
                    (P.rangeCount !== 1 ||
                      P.anchorNode !== U.node ||
                      P.anchorOffset !== U.offset ||
                      P.focusNode !== M.node ||
                      P.focusOffset !== M.offset)
                  ) {
                    var H = ae.createRange();
                    (H.setStart(U.node, U.offset),
                      P.removeAllRanges(),
                      Ze > bt
                        ? (P.addRange(H), P.extend(M.node, M.offset))
                        : (H.setEnd(M.node, M.offset), P.addRange(H)));
                  }
                }
              }
            }
            for (ae = [], P = b; (P = P.parentNode); )
              P.nodeType === 1 && ae.push({ element: P, left: P.scrollLeft, top: P.scrollTop });
            for (typeof b.focus == "function" && b.focus(), b = 0; b < ae.length; b++) {
              var te = ae[b];
              ((te.element.scrollLeft = te.left), (te.element.scrollTop = te.top));
            }
          }
          ((Xs = !!Wf), (ed = Wf = null));
        } finally {
          ((ut = f), (X.p = o), (D.T = l));
        }
      }
      ((t.current = n), (on = 2));
    }
  }
  function Yv() {
    if (on === 2) {
      on = 0;
      var t = Mr,
        n = ti,
        l = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || l) {
        ((l = D.T), (D.T = null));
        var o = X.p;
        X.p = 2;
        var f = ut;
        ut |= 4;
        try {
          gv(t, n.alternate, n);
        } finally {
          ((ut = f), (X.p = o), (D.T = l));
        }
      }
      on = 3;
    }
  }
  function Fv() {
    if (on === 4 || on === 3) {
      ((on = 0), Yn());
      var t = Mr,
        n = ti,
        l = dr,
        o = Cv;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0
        ? (on = 5)
        : ((on = 0), (ti = Mr = null), qv(t, t.pendingLanes));
      var f = t.pendingLanes;
      if (
        (f === 0 && (Dr = null),
        B(l),
        (n = n.stateNode),
        oe && typeof oe.onCommitFiberRoot == "function")
      )
        try {
          oe.onCommitFiberRoot(le, n, void 0, (n.current.flags & 128) === 128);
        } catch {}
      if (o !== null) {
        ((n = D.T), (f = X.p), (X.p = 2), (D.T = null));
        try {
          for (var d = t.onRecoverableError, g = 0; g < o.length; g++) {
            var b = o[g];
            d(b.value, { componentStack: b.stack });
          }
        } finally {
          ((D.T = n), (X.p = f));
        }
      }
      ((dr & 3) !== 0 && Us(),
        Va(t),
        (f = t.pendingLanes),
        (l & 261930) !== 0 && (f & 42) !== 0 ? (t === Hf ? io++ : ((io = 0), (Hf = t))) : (io = 0),
        oo(0));
    }
  }
  function qv(t, n) {
    (t.pooledCacheLanes &= n) === 0 &&
      ((n = t.pooledCache), n != null && ((t.pooledCache = null), Zi(n)));
  }
  function Us() {
    return ($v(), Yv(), Fv(), Gv());
  }
  function Gv() {
    if (on !== 5) return !1;
    var t = Mr,
      n = Vf;
    Vf = 0;
    var l = B(dr),
      o = D.T,
      f = X.p;
    try {
      ((X.p = 32 > l ? 32 : l), (D.T = null), (l = Bf), (Bf = null));
      var d = Mr,
        g = dr;
      if (((on = 0), (ti = Mr = null), (dr = 0), (ut & 6) !== 0)) throw Error(i(331));
      var b = ut;
      if (
        ((ut |= 4),
        Tv(d.current),
        xv(d, d.current, g, l),
        (ut = b),
        oo(0, !1),
        oe && typeof oe.onPostCommitFiberRoot == "function")
      )
        try {
          oe.onPostCommitFiberRoot(le, d);
        } catch {}
      return !0;
    } finally {
      ((X.p = f), (D.T = o), qv(t, n));
    }
  }
  function Pv(t, n, l) {
    ((n = ua(l, n)),
      (n = yf(t.stateNode, n, 2)),
      (t = Rr(t, n, 2)),
      t !== null && (vt(t, 2), Va(t)));
  }
  function pt(t, n, l) {
    if (t.tag === 3) Pv(t, t, l);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Pv(n, t, l);
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (
            typeof n.type.getDerivedStateFromError == "function" ||
            (typeof o.componentDidCatch == "function" && (Dr === null || !Dr.has(o)))
          ) {
            ((t = ua(l, t)),
              (l = Xp(2)),
              (o = Rr(n, l, 2)),
              o !== null && (Ip(l, o, n, t), vt(o, 2), Va(o)));
            break;
          }
        }
        n = n.return;
      }
  }
  function Yf(t, n, l) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new JE();
      var f = new Set();
      o.set(n, f);
    } else ((f = o.get(n)), f === void 0 && ((f = new Set()), o.set(n, f)));
    f.has(l) || ((Lf = !0), f.add(l), (t = a1.bind(null, t, n, l)), n.then(t, t));
  }
  function a1(t, n, l) {
    var o = t.pingCache;
    (o !== null && o.delete(n),
      (t.pingedLanes |= t.suspendedLanes & l),
      (t.warmLanes &= ~l),
      wt === t &&
        (tt & l) === l &&
        (Ht === 4 || (Ht === 3 && (tt & 62914560) === tt && 300 > Xt() - Cs)
          ? (ut & 2) === 0 && ni(t, 0)
          : (Uf |= l),
        ei === tt && (ei = 0)),
      Va(t));
  }
  function Xv(t, n) {
    (n === 0 && (n = Vt()), (t = nl(t, n)), t !== null && (vt(t, n), Va(t)));
  }
  function r1(t) {
    var n = t.memoizedState,
      l = 0;
    (n !== null && (l = n.retryLane), Xv(t, l));
  }
  function l1(t, n) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var o = t.stateNode,
          f = t.memoizedState;
        f !== null && (l = f.retryLane);
        break;
      case 19:
        o = t.stateNode;
        break;
      case 22:
        o = t.stateNode._retryCache;
        break;
      default:
        throw Error(i(314));
    }
    (o !== null && o.delete(n), Xv(t, l));
  }
  function i1(t, n) {
    return Na(t, n);
  }
  var js = null,
    ri = null,
    Ff = !1,
    Vs = !1,
    qf = !1,
    kr = 0;
  function Va(t) {
    (t !== ri && t.next === null && (ri === null ? (js = ri = t) : (ri = ri.next = t)),
      (Vs = !0),
      Ff || ((Ff = !0), s1()));
  }
  function oo(t, n) {
    if (!qf && Vs) {
      qf = !0;
      do
        for (var l = !1, o = js; o !== null; ) {
          if (t !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var d = 0;
            else {
              var g = o.suspendedLanes,
                b = o.pingedLanes;
              ((d = (1 << (31 - ue(42 | t) + 1)) - 1),
                (d &= f & ~(g & ~b)),
                (d = d & 201326741 ? (d & 201326741) | 1 : d ? d | 2 : 0));
            }
            d !== 0 && ((l = !0), Jv(o, d));
          } else
            ((d = tt),
              (d = $e(
                o,
                o === wt ? d : 0,
                o.cancelPendingCommit !== null || o.timeoutHandle !== -1,
              )),
              (d & 3) === 0 || ct(o, d) || ((l = !0), Jv(o, d)));
          o = o.next;
        }
      while (l);
      qf = !1;
    }
  }
  function o1() {
    Iv();
  }
  function Iv() {
    Vs = Ff = !1;
    var t = 0;
    kr !== 0 && y1() && (t = kr);
    for (var n = Xt(), l = null, o = js; o !== null; ) {
      var f = o.next,
        d = Qv(o, n);
      (d === 0
        ? ((o.next = null), l === null ? (js = f) : (l.next = f), f === null && (ri = l))
        : ((l = o), (t !== 0 || (d & 3) !== 0) && (Vs = !0)),
        (o = f));
    }
    ((on !== 0 && on !== 5) || oo(t), kr !== 0 && (kr = 0));
  }
  function Qv(t, n) {
    for (
      var l = t.suspendedLanes,
        o = t.pingedLanes,
        f = t.expirationTimes,
        d = t.pendingLanes & -62914561;
      0 < d;
    ) {
      var g = 31 - ue(d),
        b = 1 << g,
        C = f[g];
      (C === -1
        ? ((b & l) === 0 || (b & o) !== 0) && (f[g] = jt(b, n))
        : C <= n && (t.expiredLanes |= b),
        (d &= ~b));
    }
    if (
      ((n = wt),
      (l = tt),
      (l = $e(t, t === n ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      (o = t.callbackNode),
      l === 0 || (t === n && (mt === 2 || mt === 9)) || t.cancelPendingCommit !== null)
    )
      return (o !== null && o !== null && ka(o), (t.callbackNode = null), (t.callbackPriority = 0));
    if ((l & 3) === 0 || ct(t, l)) {
      if (((n = l & -l), n === t.callbackPriority)) return n;
      switch ((o !== null && ka(o), B(l))) {
        case 2:
        case 8:
          l = vr;
          break;
        case 32:
          l = ia;
          break;
        case 268435456:
          l = x;
          break;
        default:
          l = ia;
      }
      return (
        (o = Kv.bind(null, t)), (l = Na(l, o)), (t.callbackPriority = n), (t.callbackNode = l), n
      );
    }
    return (
      o !== null && o !== null && ka(o), (t.callbackPriority = 2), (t.callbackNode = null), 2
    );
  }
  function Kv(t, n) {
    if (on !== 0 && on !== 5) return ((t.callbackNode = null), (t.callbackPriority = 0), null);
    var l = t.callbackNode;
    if (Us() && t.callbackNode !== l) return null;
    var o = tt;
    return (
      (o = $e(t, t === wt ? o : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1)),
      o === 0
        ? null
        : (Mv(t, o, n),
          Qv(t, Xt()),
          t.callbackNode != null && t.callbackNode === l ? Kv.bind(null, t) : null)
    );
  }
  function Jv(t, n) {
    if (Us()) return null;
    Mv(t, n, !0);
  }
  function s1() {
    _1(function () {
      (ut & 6) !== 0 ? Na(Tn, o1) : Iv();
    });
  }
  function Gf() {
    if (kr === 0) {
      var t = Yl;
      (t === 0 && ((t = Nt), (Nt <<= 1), (Nt & 261888) === 0 && (Nt = 256)), (kr = t));
    }
    return kr;
  }
  function Wv(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
        ? t
        : Go("" + t);
  }
  function eg(t, n) {
    var l = n.ownerDocument.createElement("input");
    return (
      (l.name = n.name),
      (l.value = n.value),
      t.id && l.setAttribute("form", t.id),
      n.parentNode.insertBefore(l, n),
      (t = new FormData(t)),
      l.parentNode.removeChild(l),
      t
    );
  }
  function u1(t, n, l, o, f) {
    if (n === "submit" && l && l.stateNode === f) {
      var d = Wv((f[we] || null).action),
        g = o.submitter;
      g &&
        ((n = (n = g[we] || null) ? Wv(n.formAction) : g.getAttribute("formAction")),
        n !== null && ((d = n), (g = null)));
      var b = new Qo("action", "action", null, o, f);
      t.push({
        event: b,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (o.defaultPrevented) {
                if (kr !== 0) {
                  var C = g ? eg(f, g) : new FormData(f);
                  df(l, { pending: !0, data: C, method: f.method, action: d }, null, C);
                }
              } else
                typeof d == "function" &&
                  (b.preventDefault(),
                  (C = g ? eg(f, g) : new FormData(f)),
                  df(l, { pending: !0, data: C, method: f.method, action: d }, d, C));
            },
            currentTarget: f,
          },
        ],
      });
    }
  }
  for (var Pf = 0; Pf < Ac.length; Pf++) {
    var Xf = Ac[Pf],
      c1 = Xf.toLowerCase(),
      f1 = Xf[0].toUpperCase() + Xf.slice(1);
    Ra(c1, "on" + f1);
  }
  (Ra(Dm, "onAnimationEnd"),
    Ra(Mm, "onAnimationIteration"),
    Ra(Nm, "onAnimationStart"),
    Ra("dblclick", "onDoubleClick"),
    Ra("focusin", "onFocus"),
    Ra("focusout", "onBlur"),
    Ra(TE, "onTransitionRun"),
    Ra(AE, "onTransitionStart"),
    Ra(OE, "onTransitionCancel"),
    Ra(km, "onTransitionEnd"),
    An("onMouseEnter", ["mouseout", "mouseover"]),
    An("onMouseLeave", ["mouseout", "mouseover"]),
    An("onPointerEnter", ["pointerout", "pointerover"]),
    An("onPointerLeave", ["pointerout", "pointerover"]),
    Nn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    Nn(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Nn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Nn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    Nn(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Nn(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var so =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    d1 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(so),
    );
  function tg(t, n) {
    n = (n & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var o = t[l],
        f = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (n)
          for (var g = o.length - 1; 0 <= g; g--) {
            var b = o[g],
              C = b.instance,
              Z = b.currentTarget;
            if (((b = b.listener), C !== d && f.isPropagationStopped())) break e;
            ((d = b), (f.currentTarget = Z));
            try {
              d(f);
            } catch (W) {
              Wo(W);
            }
            ((f.currentTarget = null), (d = C));
          }
        else
          for (g = 0; g < o.length; g++) {
            if (
              ((b = o[g]),
              (C = b.instance),
              (Z = b.currentTarget),
              (b = b.listener),
              C !== d && f.isPropagationStopped())
            )
              break e;
            ((d = b), (f.currentTarget = Z));
            try {
              d(f);
            } catch (W) {
              Wo(W);
            }
            ((f.currentTarget = null), (d = C));
          }
      }
    }
  }
  function et(t, n) {
    var l = n[Ue];
    l === void 0 && (l = n[Ue] = new Set());
    var o = t + "__bubble";
    l.has(o) || (ng(n, t, 2, !1), l.add(o));
  }
  function If(t, n, l) {
    var o = 0;
    (n && (o |= 4), ng(l, t, o, n));
  }
  var Bs = "_reactListening" + Math.random().toString(36).slice(2);
  function Qf(t) {
    if (!t[Bs]) {
      ((t[Bs] = !0),
        gr.forEach(function (l) {
          l !== "selectionchange" && (d1.has(l) || If(l, !1, t), If(l, !0, t));
        }));
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[Bs] || ((n[Bs] = !0), If("selectionchange", !1, n));
    }
  }
  function ng(t, n, l, o) {
    switch (Dg(n)) {
      case 2:
        var f = H1;
        break;
      case 8:
        f = Z1;
        break;
      default:
        f = fd;
    }
    ((l = f.bind(null, n, l, t)),
      (f = void 0),
      !pc || (n !== "touchstart" && n !== "touchmove" && n !== "wheel") || (f = !0),
      o
        ? f !== void 0
          ? t.addEventListener(n, l, { capture: !0, passive: f })
          : t.addEventListener(n, l, !0)
        : f !== void 0
          ? t.addEventListener(n, l, { passive: f })
          : t.addEventListener(n, l, !1));
  }
  function Kf(t, n, l, o, f) {
    var d = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      e: for (;;) {
        if (o === null) return;
        var g = o.tag;
        if (g === 3 || g === 4) {
          var b = o.stateNode.containerInfo;
          if (b === f) break;
          if (g === 4)
            for (g = o.return; g !== null; ) {
              var C = g.tag;
              if ((C === 3 || C === 4) && g.stateNode.containerInfo === f) return;
              g = g.return;
            }
          for (; b !== null; ) {
            if (((g = zt(b)), g === null)) return;
            if (((C = g.tag), C === 5 || C === 6 || C === 26 || C === 27)) {
              o = d = g;
              continue e;
            }
            b = b.parentNode;
          }
        }
        o = o.return;
      }
    om(function () {
      var Z = d,
        W = hc(l),
        ae = [];
      e: {
        var Y = Lm.get(t);
        if (Y !== void 0) {
          var P = Qo,
            Ce = t;
          switch (t) {
            case "keypress":
              if (Xo(l) === 0) break e;
            case "keydown":
            case "keyup":
              P = lE;
              break;
            case "focusin":
              ((Ce = "focus"), (P = bc));
              break;
            case "focusout":
              ((Ce = "blur"), (P = bc));
              break;
            case "beforeblur":
            case "afterblur":
              P = bc;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              P = cm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              P = PS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              P = sE;
              break;
            case Dm:
            case Mm:
            case Nm:
              P = QS;
              break;
            case km:
              P = cE;
              break;
            case "scroll":
            case "scrollend":
              P = qS;
              break;
            case "wheel":
              P = dE;
              break;
            case "copy":
            case "cut":
            case "paste":
              P = JS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              P = dm;
              break;
            case "toggle":
            case "beforetoggle":
              P = mE;
          }
          var Ze = (n & 4) !== 0,
            bt = !Ze && (t === "scroll" || t === "scrollend"),
            U = Ze ? (Y !== null ? Y + "Capture" : null) : Y;
          Ze = [];
          for (var M = Z, H; M !== null; ) {
            var te = M;
            if (
              ((H = te.stateNode),
              (te = te.tag),
              (te !== 5 && te !== 26 && te !== 27) ||
                H === null ||
                U === null ||
                ((te = Ci(M, U)), te != null && Ze.push(uo(M, te, H))),
              bt)
            )
              break;
            M = M.return;
          }
          0 < Ze.length && ((Y = new P(Y, Ce, null, l, W)), ae.push({ event: Y, listeners: Ze }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (
            ((Y = t === "mouseover" || t === "pointerover"),
            (P = t === "mouseout" || t === "pointerout"),
            Y && l !== dc && (Ce = l.relatedTarget || l.fromElement) && (zt(Ce) || Ce[Ee]))
          )
            break e;
          if (
            (P || Y) &&
            ((Y =
              W.window === W
                ? W
                : (Y = W.ownerDocument)
                  ? Y.defaultView || Y.parentWindow
                  : window),
            P
              ? ((Ce = l.relatedTarget || l.toElement),
                (P = Z),
                (Ce = Ce ? zt(Ce) : null),
                Ce !== null &&
                  ((bt = u(Ce)), (Ze = Ce.tag), Ce !== bt || (Ze !== 5 && Ze !== 27 && Ze !== 6)) &&
                  (Ce = null))
              : ((P = null), (Ce = Z)),
            P !== Ce)
          ) {
            if (
              ((Ze = cm),
              (te = "onMouseLeave"),
              (U = "onMouseEnter"),
              (M = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((Ze = dm), (te = "onPointerLeave"), (U = "onPointerEnter"), (M = "pointer")),
              (bt = P == null ? Y : rt(P)),
              (H = Ce == null ? Y : rt(Ce)),
              (Y = new Ze(te, M + "leave", P, l, W)),
              (Y.target = bt),
              (Y.relatedTarget = H),
              (te = null),
              zt(W) === Z &&
                ((Ze = new Ze(U, M + "enter", Ce, l, W)),
                (Ze.target = H),
                (Ze.relatedTarget = bt),
                (te = Ze)),
              (bt = te),
              P && Ce)
            )
              t: {
                for (Ze = h1, U = P, M = Ce, H = 0, te = U; te; te = Ze(te)) H++;
                te = 0;
                for (var ke = M; ke; ke = Ze(ke)) te++;
                for (; 0 < H - te; ) ((U = Ze(U)), H--);
                for (; 0 < te - H; ) ((M = Ze(M)), te--);
                for (; H--; ) {
                  if (U === M || (M !== null && U === M.alternate)) {
                    Ze = U;
                    break t;
                  }
                  ((U = Ze(U)), (M = Ze(M)));
                }
                Ze = null;
              }
            else Ze = null;
            (P !== null && ag(ae, Y, P, Ze, !1),
              Ce !== null && bt !== null && ag(ae, bt, Ce, Ze, !0));
          }
        }
        e: {
          if (
            ((Y = Z ? rt(Z) : window),
            (P = Y.nodeName && Y.nodeName.toLowerCase()),
            P === "select" || (P === "input" && Y.type === "file"))
          )
            var ot = _m;
          else if (ym(Y))
            if (Sm) ot = xE;
            else {
              ot = EE;
              var De = SE;
            }
          else
            ((P = Y.nodeName),
              !P || P.toLowerCase() !== "input" || (Y.type !== "checkbox" && Y.type !== "radio")
                ? Z && fc(Z.elementType) && (ot = _m)
                : (ot = wE));
          if (ot && (ot = ot(t, Z))) {
            bm(ae, ot, l, W);
            break e;
          }
          (De && De(t, Y, Z),
            t === "focusout" &&
              Z &&
              Y.type === "number" &&
              Z.memoizedProps.value != null &&
              cc(Y, "number", Y.value));
        }
        switch (((De = Z ? rt(Z) : window), t)) {
          case "focusin":
            (ym(De) || De.contentEditable === "true") && ((Ll = De), (Rc = Z), (Vi = null));
            break;
          case "focusout":
            Vi = Rc = Ll = null;
            break;
          case "mousedown":
            zc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((zc = !1), Om(ae, l, W));
            break;
          case "selectionchange":
            if (zE) break;
          case "keydown":
          case "keyup":
            Om(ae, l, W);
        }
        var Xe;
        if (Sc)
          e: {
            switch (t) {
              case "compositionstart":
                var nt = "onCompositionStart";
                break e;
              case "compositionend":
                nt = "onCompositionEnd";
                break e;
              case "compositionupdate":
                nt = "onCompositionUpdate";
                break e;
            }
            nt = void 0;
          }
        else
          kl
            ? vm(t, l) && (nt = "onCompositionEnd")
            : t === "keydown" && l.keyCode === 229 && (nt = "onCompositionStart");
        (nt &&
          (hm &&
            l.locale !== "ko" &&
            (kl || nt !== "onCompositionStart"
              ? nt === "onCompositionEnd" && kl && (Xe = sm())
              : ((yr = W), (vc = "value" in yr ? yr.value : yr.textContent), (kl = !0))),
          (De = Hs(Z, nt)),
          0 < De.length &&
            ((nt = new fm(nt, t, null, l, W)),
            ae.push({ event: nt, listeners: De }),
            Xe ? (nt.data = Xe) : ((Xe = gm(l)), Xe !== null && (nt.data = Xe)))),
          (Xe = vE ? gE(t, l) : yE(t, l)) &&
            ((nt = Hs(Z, "onBeforeInput")),
            0 < nt.length &&
              ((De = new fm("onBeforeInput", "beforeinput", null, l, W)),
              ae.push({ event: De, listeners: nt }),
              (De.data = Xe))),
          u1(ae, t, Z, l, W));
      }
      tg(ae, n);
    });
  }
  function uo(t, n, l) {
    return { instance: t, listener: n, currentTarget: l };
  }
  function Hs(t, n) {
    for (var l = n + "Capture", o = []; t !== null; ) {
      var f = t,
        d = f.stateNode;
      if (
        ((f = f.tag),
        (f !== 5 && f !== 26 && f !== 27) ||
          d === null ||
          ((f = Ci(t, l)),
          f != null && o.unshift(uo(t, f, d)),
          (f = Ci(t, n)),
          f != null && o.push(uo(t, f, d))),
        t.tag === 3)
      )
        return o;
      t = t.return;
    }
    return [];
  }
  function h1(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function ag(t, n, l, o, f) {
    for (var d = n._reactName, g = []; l !== null && l !== o; ) {
      var b = l,
        C = b.alternate,
        Z = b.stateNode;
      if (((b = b.tag), C !== null && C === o)) break;
      ((b !== 5 && b !== 26 && b !== 27) ||
        Z === null ||
        ((C = Z),
        f
          ? ((Z = Ci(l, d)), Z != null && g.unshift(uo(l, Z, C)))
          : f || ((Z = Ci(l, d)), Z != null && g.push(uo(l, Z, C)))),
        (l = l.return));
    }
    g.length !== 0 && t.push({ event: n, listeners: g });
  }
  var m1 = /\r\n?/g,
    p1 = /\u0000|\uFFFD/g;
  function rg(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        m1,
        `
`,
      )
      .replace(p1, "");
  }
  function lg(t, n) {
    return ((n = rg(n)), rg(t) === n);
  }
  function yt(t, n, l, o, f, d) {
    switch (l) {
      case "children":
        typeof o == "string"
          ? n === "body" || (n === "textarea" && o === "") || Dl(t, o)
          : (typeof o == "number" || typeof o == "bigint") && n !== "body" && Dl(t, "" + o);
        break;
      case "className":
        Ia(t, "class", o);
        break;
      case "tabIndex":
        Ia(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ia(t, l, o);
        break;
      case "style":
        lm(t, o, d);
        break;
      case "data":
        if (n !== "object") {
          Ia(t, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (n !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(l);
          break;
        }
        ((o = Go("" + o)), t.setAttribute(l, o));
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof d == "function" &&
            (l === "formAction"
              ? (n !== "input" && yt(t, n, "name", f.name, f, null),
                yt(t, n, "formEncType", f.formEncType, f, null),
                yt(t, n, "formMethod", f.formMethod, f, null),
                yt(t, n, "formTarget", f.formTarget, f, null))
              : (yt(t, n, "encType", f.encType, f, null),
                yt(t, n, "method", f.method, f, null),
                yt(t, n, "target", f.target, f, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(l);
          break;
        }
        ((o = Go("" + o)), t.setAttribute(l, o));
        break;
      case "onClick":
        o != null && (t.onclick = Ka);
        break;
      case "onScroll":
        o != null && et("scroll", t);
        break;
      case "onScrollEnd":
        o != null && et("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o)) throw Error(i(61));
          if (((l = o.__html), l != null)) {
            if (f.children != null) throw Error(i(60));
            t.innerHTML = l;
          }
        }
        break;
      case "multiple":
        t.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        t.muted = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (o == null || typeof o == "function" || typeof o == "boolean" || typeof o == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        ((l = Go("" + o)), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        o != null && typeof o != "function" && typeof o != "symbol"
          ? t.setAttribute(l, "" + o)
          : t.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        o && typeof o != "function" && typeof o != "symbol"
          ? t.setAttribute(l, "")
          : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        o === !0
          ? t.setAttribute(l, "")
          : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol"
            ? t.setAttribute(l, o)
            : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o
          ? t.setAttribute(l, o)
          : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o)
          ? t.removeAttribute(l)
          : t.setAttribute(l, o);
        break;
      case "popover":
        (et("beforetoggle", t), et("toggle", t), Xa(t, "popover", o));
        break;
      case "xlinkActuate":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:actuate", o);
        break;
      case "xlinkArcrole":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", o);
        break;
      case "xlinkRole":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:role", o);
        break;
      case "xlinkShow":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:show", o);
        break;
      case "xlinkTitle":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:title", o);
        break;
      case "xlinkType":
        Fe(t, "http://www.w3.org/1999/xlink", "xlink:type", o);
        break;
      case "xmlBase":
        Fe(t, "http://www.w3.org/XML/1998/namespace", "xml:base", o);
        break;
      case "xmlLang":
        Fe(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", o);
        break;
      case "xmlSpace":
        Fe(t, "http://www.w3.org/XML/1998/namespace", "xml:space", o);
        break;
      case "is":
        Xa(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || (l[0] !== "o" && l[0] !== "O") || (l[1] !== "n" && l[1] !== "N")) &&
          ((l = YS.get(l) || l), Xa(t, l, o));
    }
  }
  function Jf(t, n, l, o, f, d) {
    switch (l) {
      case "style":
        lm(t, o, d);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o)) throw Error(i(61));
          if (((l = o.__html), l != null)) {
            if (f.children != null) throw Error(i(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof o == "string"
          ? Dl(t, o)
          : (typeof o == "number" || typeof o == "bigint") && Dl(t, "" + o);
        break;
      case "onScroll":
        o != null && et("scroll", t);
        break;
      case "onScrollEnd":
        o != null && et("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = Ka);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Ea.hasOwnProperty(l))
          e: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((f = l.endsWith("Capture")),
              (n = l.slice(2, f ? l.length - 7 : void 0)),
              (d = t[we] || null),
              (d = d != null ? d[l] : null),
              typeof d == "function" && t.removeEventListener(n, d, f),
              typeof o == "function")
            ) {
              (typeof d != "function" &&
                d !== null &&
                (l in t ? (t[l] = null) : t.hasAttribute(l) && t.removeAttribute(l)),
                t.addEventListener(n, o, f));
              break e;
            }
            l in t ? (t[l] = o) : o === !0 ? t.setAttribute(l, "") : Xa(t, l, o);
          }
    }
  }
  function yn(t, n, l) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (et("error", t), et("load", t));
        var o = !1,
          f = !1,
          d;
        for (d in l)
          if (l.hasOwnProperty(d)) {
            var g = l[d];
            if (g != null)
              switch (d) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  f = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(i(137, n));
                default:
                  yt(t, n, d, g, l, null);
              }
          }
        (f && yt(t, n, "srcSet", l.srcSet, l, null), o && yt(t, n, "src", l.src, l, null));
        return;
      case "input":
        et("invalid", t);
        var b = (d = g = f = null),
          C = null,
          Z = null;
        for (o in l)
          if (l.hasOwnProperty(o)) {
            var W = l[o];
            if (W != null)
              switch (o) {
                case "name":
                  f = W;
                  break;
                case "type":
                  g = W;
                  break;
                case "checked":
                  C = W;
                  break;
                case "defaultChecked":
                  Z = W;
                  break;
                case "value":
                  d = W;
                  break;
                case "defaultValue":
                  b = W;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (W != null) throw Error(i(137, n));
                  break;
                default:
                  yt(t, n, o, W, l, null);
              }
          }
        tm(t, d, b, C, Z, g, f, !1);
        return;
      case "select":
        (et("invalid", t), (o = g = d = null));
        for (f in l)
          if (l.hasOwnProperty(f) && ((b = l[f]), b != null))
            switch (f) {
              case "value":
                d = b;
                break;
              case "defaultValue":
                g = b;
                break;
              case "multiple":
                o = b;
              default:
                yt(t, n, f, b, l, null);
            }
        ((n = d),
          (l = g),
          (t.multiple = !!o),
          n != null ? Cl(t, !!o, n, !1) : l != null && Cl(t, !!o, l, !0));
        return;
      case "textarea":
        (et("invalid", t), (d = f = o = null));
        for (g in l)
          if (l.hasOwnProperty(g) && ((b = l[g]), b != null))
            switch (g) {
              case "value":
                o = b;
                break;
              case "defaultValue":
                f = b;
                break;
              case "children":
                d = b;
                break;
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(i(91));
                break;
              default:
                yt(t, n, g, b, l, null);
            }
        am(t, o, f, d);
        return;
      case "option":
        for (C in l)
          l.hasOwnProperty(C) &&
            ((o = l[C]), o != null) &&
            (C === "selected"
              ? (t.selected = o && typeof o != "function" && typeof o != "symbol")
              : yt(t, n, C, o, l, null));
        return;
      case "dialog":
        (et("beforetoggle", t), et("toggle", t), et("cancel", t), et("close", t));
        break;
      case "iframe":
      case "object":
        et("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < so.length; o++) et(so[o], t);
        break;
      case "image":
        (et("error", t), et("load", t));
        break;
      case "details":
        et("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        (et("error", t), et("load", t));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (Z in l)
          if (l.hasOwnProperty(Z) && ((o = l[Z]), o != null))
            switch (Z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, n));
              default:
                yt(t, n, Z, o, l, null);
            }
        return;
      default:
        if (fc(n)) {
          for (W in l)
            l.hasOwnProperty(W) && ((o = l[W]), o !== void 0 && Jf(t, n, W, o, l, void 0));
          return;
        }
    }
    for (b in l) l.hasOwnProperty(b) && ((o = l[b]), o != null && yt(t, n, b, o, l, null));
  }
  function v1(t, n, l, o) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var f = null,
          d = null,
          g = null,
          b = null,
          C = null,
          Z = null,
          W = null;
        for (P in l) {
          var ae = l[P];
          if (l.hasOwnProperty(P) && ae != null)
            switch (P) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                C = ae;
              default:
                o.hasOwnProperty(P) || yt(t, n, P, null, o, ae);
            }
        }
        for (var Y in o) {
          var P = o[Y];
          if (((ae = l[Y]), o.hasOwnProperty(Y) && (P != null || ae != null)))
            switch (Y) {
              case "type":
                d = P;
                break;
              case "name":
                f = P;
                break;
              case "checked":
                Z = P;
                break;
              case "defaultChecked":
                W = P;
                break;
              case "value":
                g = P;
                break;
              case "defaultValue":
                b = P;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null) throw Error(i(137, n));
                break;
              default:
                P !== ae && yt(t, n, Y, P, o, ae);
            }
        }
        Oi(t, g, b, C, Z, W, d, f);
        return;
      case "select":
        P = g = b = Y = null;
        for (d in l)
          if (((C = l[d]), l.hasOwnProperty(d) && C != null))
            switch (d) {
              case "value":
                break;
              case "multiple":
                P = C;
              default:
                o.hasOwnProperty(d) || yt(t, n, d, null, o, C);
            }
        for (f in o)
          if (((d = o[f]), (C = l[f]), o.hasOwnProperty(f) && (d != null || C != null)))
            switch (f) {
              case "value":
                Y = d;
                break;
              case "defaultValue":
                b = d;
                break;
              case "multiple":
                g = d;
              default:
                d !== C && yt(t, n, f, d, o, C);
            }
        ((n = b),
          (l = g),
          (o = P),
          Y != null
            ? Cl(t, !!l, Y, !1)
            : !!o != !!l && (n != null ? Cl(t, !!l, n, !0) : Cl(t, !!l, l ? [] : "", !1)));
        return;
      case "textarea":
        P = Y = null;
        for (b in l)
          if (((f = l[b]), l.hasOwnProperty(b) && f != null && !o.hasOwnProperty(b)))
            switch (b) {
              case "value":
                break;
              case "children":
                break;
              default:
                yt(t, n, b, null, o, f);
            }
        for (g in o)
          if (((f = o[g]), (d = l[g]), o.hasOwnProperty(g) && (f != null || d != null)))
            switch (g) {
              case "value":
                Y = f;
                break;
              case "defaultValue":
                P = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(i(91));
                break;
              default:
                f !== d && yt(t, n, g, f, o, d);
            }
        nm(t, Y, P);
        return;
      case "option":
        for (var Ce in l)
          ((Y = l[Ce]),
            l.hasOwnProperty(Ce) &&
              Y != null &&
              !o.hasOwnProperty(Ce) &&
              (Ce === "selected" ? (t.selected = !1) : yt(t, n, Ce, null, o, Y)));
        for (C in o)
          ((Y = o[C]),
            (P = l[C]),
            o.hasOwnProperty(C) &&
              Y !== P &&
              (Y != null || P != null) &&
              (C === "selected"
                ? (t.selected = Y && typeof Y != "function" && typeof Y != "symbol")
                : yt(t, n, C, Y, o, P)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Ze in l)
          ((Y = l[Ze]),
            l.hasOwnProperty(Ze) && Y != null && !o.hasOwnProperty(Ze) && yt(t, n, Ze, null, o, Y));
        for (Z in o)
          if (((Y = o[Z]), (P = l[Z]), o.hasOwnProperty(Z) && Y !== P && (Y != null || P != null)))
            switch (Z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null) throw Error(i(137, n));
                break;
              default:
                yt(t, n, Z, Y, o, P);
            }
        return;
      default:
        if (fc(n)) {
          for (var bt in l)
            ((Y = l[bt]),
              l.hasOwnProperty(bt) &&
                Y !== void 0 &&
                !o.hasOwnProperty(bt) &&
                Jf(t, n, bt, void 0, o, Y));
          for (W in o)
            ((Y = o[W]),
              (P = l[W]),
              !o.hasOwnProperty(W) ||
                Y === P ||
                (Y === void 0 && P === void 0) ||
                Jf(t, n, W, Y, o, P));
          return;
        }
    }
    for (var U in l)
      ((Y = l[U]),
        l.hasOwnProperty(U) && Y != null && !o.hasOwnProperty(U) && yt(t, n, U, null, o, Y));
    for (ae in o)
      ((Y = o[ae]),
        (P = l[ae]),
        !o.hasOwnProperty(ae) || Y === P || (Y == null && P == null) || yt(t, n, ae, Y, o, P));
  }
  function ig(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function g1() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var t = 0, n = 0, l = performance.getEntriesByType("resource"), o = 0;
        o < l.length;
        o++
      ) {
        var f = l[o],
          d = f.transferSize,
          g = f.initiatorType,
          b = f.duration;
        if (d && b && ig(g)) {
          for (g = 0, b = f.responseEnd, o += 1; o < l.length; o++) {
            var C = l[o],
              Z = C.startTime;
            if (Z > b) break;
            var W = C.transferSize,
              ae = C.initiatorType;
            W && ig(ae) && ((C = C.responseEnd), (g += W * (C < b ? 1 : (b - Z) / (C - Z))));
          }
          if ((--o, (n += (8 * (d + g)) / (f.duration / 1e3)), t++, 10 < t)) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && ((t = navigator.connection.downlink), typeof t == "number")
      ? t
      : 5;
  }
  var Wf = null,
    ed = null;
  function Zs(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function og(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function sg(t, n) {
    if (t === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && n === "foreignObject" ? 0 : t;
  }
  function td(t, n) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof n.children == "string" ||
      typeof n.children == "number" ||
      typeof n.children == "bigint" ||
      (typeof n.dangerouslySetInnerHTML == "object" &&
        n.dangerouslySetInnerHTML !== null &&
        n.dangerouslySetInnerHTML.__html != null)
    );
  }
  var nd = null;
  function y1() {
    var t = window.event;
    return t && t.type === "popstate" ? (t === nd ? !1 : ((nd = t), !0)) : ((nd = null), !1);
  }
  var ug = typeof setTimeout == "function" ? setTimeout : void 0,
    b1 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    cg = typeof Promise == "function" ? Promise : void 0,
    _1 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof cg < "u"
          ? function (t) {
              return cg.resolve(null).then(t).catch(S1);
            }
          : ug;
  function S1(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Lr(t) {
    return t === "head";
  }
  function fg(t, n) {
    var l = n,
      o = 0;
    do {
      var f = l.nextSibling;
      if ((t.removeChild(l), f && f.nodeType === 8))
        if (((l = f.data), l === "/$" || l === "/&")) {
          if (o === 0) {
            (t.removeChild(f), si(n));
            return;
          }
          o--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&") o++;
        else if (l === "html") co(t.ownerDocument.documentElement);
        else if (l === "head") {
          ((l = t.ownerDocument.head), co(l));
          for (var d = l.firstChild; d; ) {
            var g = d.nextSibling,
              b = d.nodeName;
            (d[Ke] ||
              b === "SCRIPT" ||
              b === "STYLE" ||
              (b === "LINK" && d.rel.toLowerCase() === "stylesheet") ||
              l.removeChild(d),
              (d = g));
          }
        } else l === "body" && co(t.ownerDocument.body);
      l = f;
    } while (l);
    si(n);
  }
  function dg(t, n) {
    var l = t;
    t = 0;
    do {
      var o = l.nextSibling;
      if (
        (l.nodeType === 1
          ? n
            ? ((l._stashedDisplay = l.style.display), (l.style.display = "none"))
            : ((l.style.display = l._stashedDisplay || ""),
              l.getAttribute("style") === "" && l.removeAttribute("style"))
          : l.nodeType === 3 &&
            (n
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ""))
              : (l.nodeValue = l._stashedText || "")),
        o && o.nodeType === 8)
      )
        if (((l = o.data), l === "/$")) {
          if (t === 0) break;
          t--;
        } else (l !== "$" && l !== "$?" && l !== "$~" && l !== "$!") || t++;
      l = o;
    } while (l);
  }
  function ad(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var l = n;
      switch (((n = n.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (ad(l), it(l));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function E1(t, n, l, o) {
    for (; t.nodeType === 1; ) {
      var f = l;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (o) {
        if (!t[Ke])
          switch (n) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((d = t.getAttribute("rel")),
                d === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                d !== f.rel ||
                t.getAttribute("href") !== (f.href == null || f.href === "" ? null : f.href) ||
                t.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin) ||
                t.getAttribute("title") !== (f.title == null ? null : f.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((d = t.getAttribute("src")),
                (d !== (f.src == null ? null : f.src) ||
                  t.getAttribute("type") !== (f.type == null ? null : f.type) ||
                  t.getAttribute("crossorigin") !==
                    (f.crossOrigin == null ? null : f.crossOrigin)) &&
                  d &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (n === "input" && t.type === "hidden") {
        var d = f.name == null ? null : "" + f.name;
        if (f.type === "hidden" && t.getAttribute("name") === d) return t;
      } else return t;
      if (((t = ma(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function w1(t, n, l) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l) ||
        ((t = ma(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function hg(t, n) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n) ||
        ((t = ma(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function rd(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function ld(t) {
    return t.data === "$!" || (t.data === "$?" && t.ownerDocument.readyState !== "loading");
  }
  function x1(t, n) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = n;
    else if (t.data !== "$?" || l.readyState !== "loading") n();
    else {
      var o = function () {
        (n(), l.removeEventListener("DOMContentLoaded", o));
      };
      (l.addEventListener("DOMContentLoaded", o), (t._reactRetry = o));
    }
  }
  function ma(t) {
    for (; t != null; t = t.nextSibling) {
      var n = t.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (
          ((n = t.data),
          n === "$" ||
            n === "$!" ||
            n === "$?" ||
            n === "$~" ||
            n === "&" ||
            n === "F!" ||
            n === "F")
        )
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return t;
  }
  var id = null;
  function mg(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (n === 0) return ma(t.nextSibling);
          n--;
        } else (l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&") || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function pg(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (n === 0) return t;
          n--;
        } else (l !== "/$" && l !== "/&") || n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function vg(t, n, l) {
    switch (((n = Zs(l)), t)) {
      case "html":
        if (((t = n.documentElement), !t)) throw Error(i(452));
        return t;
      case "head":
        if (((t = n.head), !t)) throw Error(i(453));
        return t;
      case "body":
        if (((t = n.body), !t)) throw Error(i(454));
        return t;
      default:
        throw Error(i(451));
    }
  }
  function co(t) {
    for (var n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
    it(t);
  }
  var pa = new Map(),
    gg = new Set();
  function $s(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument;
  }
  var hr = X.d;
  X.d = { f: R1, r: z1, D: T1, C: A1, L: O1, m: C1, X: M1, S: D1, M: N1 };
  function R1() {
    var t = hr.f(),
      n = Ns();
    return t || n;
  }
  function z1(t) {
    var n = ft(t);
    n !== null && n.tag === 5 && n.type === "form" ? kp(n) : hr.r(t);
  }
  var li = typeof document > "u" ? null : document;
  function yg(t, n, l) {
    var o = li;
    if (o && typeof n == "string" && n) {
      var f = On(n);
      ((f = 'link[rel="' + t + '"][href="' + f + '"]'),
        typeof l == "string" && (f += '[crossorigin="' + l + '"]'),
        gg.has(f) ||
          (gg.add(f),
          (t = { rel: t, crossOrigin: l, href: n }),
          o.querySelector(f) === null &&
            ((n = o.createElement("link")), yn(n, "link", t), lt(n), o.head.appendChild(n))));
    }
  }
  function T1(t) {
    (hr.D(t), yg("dns-prefetch", t, null));
  }
  function A1(t, n) {
    (hr.C(t, n), yg("preconnect", t, n));
  }
  function O1(t, n, l) {
    hr.L(t, n, l);
    var o = li;
    if (o && t && n) {
      var f = 'link[rel="preload"][as="' + On(n) + '"]';
      n === "image" && l && l.imageSrcSet
        ? ((f += '[imagesrcset="' + On(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" && (f += '[imagesizes="' + On(l.imageSizes) + '"]'))
        : (f += '[href="' + On(t) + '"]');
      var d = f;
      switch (n) {
        case "style":
          d = ii(t);
          break;
        case "script":
          d = oi(t);
      }
      pa.has(d) ||
        ((t = v(
          { rel: "preload", href: n === "image" && l && l.imageSrcSet ? void 0 : t, as: n },
          l,
        )),
        pa.set(d, t),
        o.querySelector(f) !== null ||
          (n === "style" && o.querySelector(fo(d))) ||
          (n === "script" && o.querySelector(ho(d))) ||
          ((n = o.createElement("link")), yn(n, "link", t), lt(n), o.head.appendChild(n)));
    }
  }
  function C1(t, n) {
    hr.m(t, n);
    var l = li;
    if (l && t) {
      var o = n && typeof n.as == "string" ? n.as : "script",
        f = 'link[rel="modulepreload"][as="' + On(o) + '"][href="' + On(t) + '"]',
        d = f;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = oi(t);
      }
      if (
        !pa.has(d) &&
        ((t = v({ rel: "modulepreload", href: t }, n)), pa.set(d, t), l.querySelector(f) === null)
      ) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(ho(d))) return;
        }
        ((o = l.createElement("link")), yn(o, "link", t), lt(o), l.head.appendChild(o));
      }
    }
  }
  function D1(t, n, l) {
    hr.S(t, n, l);
    var o = li;
    if (o && t) {
      var f = Ft(o).hoistableStyles,
        d = ii(t);
      n = n || "default";
      var g = f.get(d);
      if (!g) {
        var b = { loading: 0, preload: null };
        if ((g = o.querySelector(fo(d)))) b.loading = 5;
        else {
          ((t = v({ rel: "stylesheet", href: t, "data-precedence": n }, l)),
            (l = pa.get(d)) && od(t, l));
          var C = (g = o.createElement("link"));
          (lt(C),
            yn(C, "link", t),
            (C._p = new Promise(function (Z, W) {
              ((C.onload = Z), (C.onerror = W));
            })),
            C.addEventListener("load", function () {
              b.loading |= 1;
            }),
            C.addEventListener("error", function () {
              b.loading |= 2;
            }),
            (b.loading |= 4),
            Ys(g, n, o));
        }
        ((g = { type: "stylesheet", instance: g, count: 1, state: b }), f.set(d, g));
      }
    }
  }
  function M1(t, n) {
    hr.X(t, n);
    var l = li;
    if (l && t) {
      var o = Ft(l).hoistableScripts,
        f = oi(t),
        d = o.get(f);
      d ||
        ((d = l.querySelector(ho(f))),
        d ||
          ((t = v({ src: t, async: !0 }, n)),
          (n = pa.get(f)) && sd(t, n),
          (d = l.createElement("script")),
          lt(d),
          yn(d, "link", t),
          l.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        o.set(f, d));
    }
  }
  function N1(t, n) {
    hr.M(t, n);
    var l = li;
    if (l && t) {
      var o = Ft(l).hoistableScripts,
        f = oi(t),
        d = o.get(f);
      d ||
        ((d = l.querySelector(ho(f))),
        d ||
          ((t = v({ src: t, async: !0, type: "module" }, n)),
          (n = pa.get(f)) && sd(t, n),
          (d = l.createElement("script")),
          lt(d),
          yn(d, "link", t),
          l.head.appendChild(d)),
        (d = { type: "script", instance: d, count: 1, state: null }),
        o.set(f, d));
    }
  }
  function bg(t, n, l, o) {
    var f = (f = ve.current) ? $s(f) : null;
    if (!f) throw Error(i(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((n = ii(l.href)),
            (l = Ft(f).hoistableStyles),
            (o = l.get(n)),
            o || ((o = { type: "style", instance: null, count: 0, state: null }), l.set(n, o)),
            o)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          t = ii(l.href);
          var d = Ft(f).hoistableStyles,
            g = d.get(t);
          if (
            (g ||
              ((f = f.ownerDocument || f),
              (g = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              d.set(t, g),
              (d = f.querySelector(fo(t))) && !d._p && ((g.instance = d), (g.state.loading = 5)),
              pa.has(t) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                pa.set(t, l),
                d || k1(f, t, l, g.state))),
            n && o === null)
          )
            throw Error(i(528, ""));
          return g;
        }
        if (n && o !== null) throw Error(i(529, ""));
        return null;
      case "script":
        return (
          (n = l.async),
          (l = l.src),
          typeof l == "string" && n && typeof n != "function" && typeof n != "symbol"
            ? ((n = oi(l)),
              (l = Ft(f).hoistableScripts),
              (o = l.get(n)),
              o || ((o = { type: "script", instance: null, count: 0, state: null }), l.set(n, o)),
              o)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(i(444, t));
    }
  }
  function ii(t) {
    return 'href="' + On(t) + '"';
  }
  function fo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function _g(t) {
    return v({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function k1(t, n, l, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]")
      ? (o.loading = 1)
      : ((n = t.createElement("link")),
        (o.preload = n),
        n.addEventListener("load", function () {
          return (o.loading |= 1);
        }),
        n.addEventListener("error", function () {
          return (o.loading |= 2);
        }),
        yn(n, "link", l),
        lt(n),
        t.head.appendChild(n));
  }
  function oi(t) {
    return '[src="' + On(t) + '"]';
  }
  function ho(t) {
    return "script[async]" + t;
  }
  function Sg(t, n, l) {
    if ((n.count++, n.instance === null))
      switch (n.type) {
        case "style":
          var o = t.querySelector('style[data-href~="' + On(l.href) + '"]');
          if (o) return ((n.instance = o), lt(o), o);
          var f = v({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (o = (t.ownerDocument || t).createElement("style")),
            lt(o),
            yn(o, "style", f),
            Ys(o, l.precedence, t),
            (n.instance = o)
          );
        case "stylesheet":
          f = ii(l.href);
          var d = t.querySelector(fo(f));
          if (d) return ((n.state.loading |= 4), (n.instance = d), lt(d), d);
          ((o = _g(l)),
            (f = pa.get(f)) && od(o, f),
            (d = (t.ownerDocument || t).createElement("link")),
            lt(d));
          var g = d;
          return (
            (g._p = new Promise(function (b, C) {
              ((g.onload = b), (g.onerror = C));
            })),
            yn(d, "link", o),
            (n.state.loading |= 4),
            Ys(d, l.precedence, t),
            (n.instance = d)
          );
        case "script":
          return (
            (d = oi(l.src)),
            (f = t.querySelector(ho(d)))
              ? ((n.instance = f), lt(f), f)
              : ((o = l),
                (f = pa.get(d)) && ((o = v({}, l)), sd(o, f)),
                (t = t.ownerDocument || t),
                (f = t.createElement("script")),
                lt(f),
                yn(f, "link", o),
                t.head.appendChild(f),
                (n.instance = f))
          );
        case "void":
          return null;
        default:
          throw Error(i(443, n.type));
      }
    else
      n.type === "stylesheet" &&
        (n.state.loading & 4) === 0 &&
        ((o = n.instance), (n.state.loading |= 4), Ys(o, l.precedence, t));
    return n.instance;
  }
  function Ys(t, n, l) {
    for (
      var o = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        f = o.length ? o[o.length - 1] : null,
        d = f,
        g = 0;
      g < o.length;
      g++
    ) {
      var b = o[g];
      if (b.dataset.precedence === n) d = b;
      else if (d !== f) break;
    }
    d
      ? d.parentNode.insertBefore(t, d.nextSibling)
      : ((n = l.nodeType === 9 ? l.head : l), n.insertBefore(t, n.firstChild));
  }
  function od(t, n) {
    (t.crossOrigin == null && (t.crossOrigin = n.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy),
      t.title == null && (t.title = n.title));
  }
  function sd(t, n) {
    (t.crossOrigin == null && (t.crossOrigin = n.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy),
      t.integrity == null && (t.integrity = n.integrity));
  }
  var Fs = null;
  function Eg(t, n, l) {
    if (Fs === null) {
      var o = new Map(),
        f = (Fs = new Map());
      f.set(l, o);
    } else ((f = Fs), (o = f.get(l)), o || ((o = new Map()), f.set(l, o)));
    if (o.has(t)) return o;
    for (o.set(t, null), l = l.getElementsByTagName(t), f = 0; f < l.length; f++) {
      var d = l[f];
      if (
        !(d[Ke] || d[Se] || (t === "link" && d.getAttribute("rel") === "stylesheet")) &&
        d.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var g = d.getAttribute(n) || "";
        g = t + g;
        var b = o.get(g);
        b ? b.push(d) : o.set(g, [d]);
      }
    }
    return o;
  }
  function wg(t, n, l) {
    ((t = t.ownerDocument || t),
      t.head.insertBefore(l, n === "title" ? t.querySelector("head > title") : null));
  }
  function L1(t, n, l) {
    if (l === 1 || n.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "") break;
        return !0;
      case "link":
        if (
          typeof n.rel != "string" ||
          typeof n.href != "string" ||
          n.href === "" ||
          n.onLoad ||
          n.onError
        )
          break;
        return n.rel === "stylesheet"
          ? ((t = n.disabled), typeof n.precedence == "string" && t == null)
          : !0;
      case "script":
        if (
          n.async &&
          typeof n.async != "function" &&
          typeof n.async != "symbol" &&
          !n.onLoad &&
          !n.onError &&
          n.src &&
          typeof n.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function xg(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function U1(t, n, l, o) {
    if (
      l.type === "stylesheet" &&
      (typeof o.media != "string" || matchMedia(o.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var f = ii(o.href),
          d = n.querySelector(fo(f));
        if (d) {
          ((n = d._p),
            n !== null &&
              typeof n == "object" &&
              typeof n.then == "function" &&
              (t.count++, (t = qs.bind(t)), n.then(t, t)),
            (l.state.loading |= 4),
            (l.instance = d),
            lt(d));
          return;
        }
        ((d = n.ownerDocument || n),
          (o = _g(o)),
          (f = pa.get(f)) && od(o, f),
          (d = d.createElement("link")),
          lt(d));
        var g = d;
        ((g._p = new Promise(function (b, C) {
          ((g.onload = b), (g.onerror = C));
        })),
          yn(d, "link", o),
          (l.instance = d));
      }
      (t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(l, n),
        (n = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (t.count++,
          (l = qs.bind(t)),
          n.addEventListener("load", l),
          n.addEventListener("error", l)));
    }
  }
  var ud = 0;
  function j1(t, n) {
    return (
      t.stylesheets && t.count === 0 && Ps(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (l) {
            var o = setTimeout(function () {
              if ((t.stylesheets && Ps(t, t.stylesheets), t.unsuspend)) {
                var d = t.unsuspend;
                ((t.unsuspend = null), d());
              }
            }, 6e4 + n);
            0 < t.imgBytes && ud === 0 && (ud = 62500 * g1());
            var f = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 && (t.stylesheets && Ps(t, t.stylesheets), t.unsuspend))
                ) {
                  var d = t.unsuspend;
                  ((t.unsuspend = null), d());
                }
              },
              (t.imgBytes > ud ? 50 : 800) + n,
            );
            return (
              (t.unsuspend = l),
              function () {
                ((t.unsuspend = null), clearTimeout(o), clearTimeout(f));
              }
            );
          }
        : null
    );
  }
  function qs() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Ps(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        ((this.unsuspend = null), t());
      }
    }
  }
  var Gs = null;
  function Ps(t, n) {
    ((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++, (Gs = new Map()), n.forEach(V1, t), (Gs = null), qs.call(t)));
  }
  function V1(t, n) {
    if (!(n.state.loading & 4)) {
      var l = Gs.get(t);
      if (l) var o = l.get(null);
      else {
        ((l = new Map()), Gs.set(t, l));
        for (
          var f = t.querySelectorAll("link[data-precedence],style[data-precedence]"), d = 0;
          d < f.length;
          d++
        ) {
          var g = f[d];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") &&
            (l.set(g.dataset.precedence, g), (o = g));
        }
        o && l.set(null, o);
      }
      ((f = n.instance),
        (g = f.getAttribute("data-precedence")),
        (d = l.get(g) || o),
        d === o && l.set(null, f),
        l.set(g, f),
        this.count++,
        (o = qs.bind(this)),
        f.addEventListener("load", o),
        f.addEventListener("error", o),
        d
          ? d.parentNode.insertBefore(f, d.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t), t.insertBefore(f, t.firstChild)),
        (n.state.loading |= 4));
    }
  }
  var mo = {
    $$typeof: F,
    Provider: null,
    Consumer: null,
    _currentValue: pe,
    _currentValue2: pe,
    _threadCount: 0,
  };
  function B1(t, n, l, o, f, d, g, b, C) {
    ((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = qn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = qn(0)),
      (this.hiddenUpdates = qn(null)),
      (this.identifierPrefix = o),
      (this.onUncaughtError = f),
      (this.onCaughtError = d),
      (this.onRecoverableError = g),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = C),
      (this.incompleteTransitions = new Map()));
  }
  function Rg(t, n, l, o, f, d, g, b, C, Z, W, ae) {
    return (
      (t = new B1(t, n, l, g, C, Z, W, ae, b)),
      (n = 1),
      d === !0 && (n |= 24),
      (d = Xn(3, null, null, n)),
      (t.current = d),
      (d.stateNode = t),
      (n = Zc()),
      n.refCount++,
      (t.pooledCache = n),
      n.refCount++,
      (d.memoizedState = { element: o, isDehydrated: l, cache: n }),
      qc(d),
      t
    );
  }
  function zg(t) {
    return t ? ((t = Vl), t) : Vl;
  }
  function Tg(t, n, l, o, f, d) {
    ((f = zg(f)),
      o.context === null ? (o.context = f) : (o.pendingContext = f),
      (o = xr(n)),
      (o.payload = { element: l }),
      (d = d === void 0 ? null : d),
      d !== null && (o.callback = d),
      (l = Rr(t, o, n)),
      l !== null && (Bn(l, t, n), qi(l, t, n)));
  }
  function Ag(t, n) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < n ? l : n;
    }
  }
  function cd(t, n) {
    (Ag(t, n), (t = t.alternate) && Ag(t, n));
  }
  function Og(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = nl(t, 67108864);
      (n !== null && Bn(n, t, 67108864), cd(t, 67108864));
    }
  }
  function Cg(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Wn();
      n = N(n);
      var l = nl(t, n);
      (l !== null && Bn(l, t, n), cd(t, n));
    }
  }
  var Xs = !0;
  function H1(t, n, l, o) {
    var f = D.T;
    D.T = null;
    var d = X.p;
    try {
      ((X.p = 2), fd(t, n, l, o));
    } finally {
      ((X.p = d), (D.T = f));
    }
  }
  function Z1(t, n, l, o) {
    var f = D.T;
    D.T = null;
    var d = X.p;
    try {
      ((X.p = 8), fd(t, n, l, o));
    } finally {
      ((X.p = d), (D.T = f));
    }
  }
  function fd(t, n, l, o) {
    if (Xs) {
      var f = dd(o);
      if (f === null) (Kf(t, n, o, Is, l), Mg(t, o));
      else if (Y1(f, t, n, l, o)) o.stopPropagation();
      else if ((Mg(t, o), n & 4 && -1 < $1.indexOf(t))) {
        for (; f !== null; ) {
          var d = ft(f);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (((d = d.stateNode), d.current.memoizedState.isDehydrated)) {
                  var g = Qt(d.pendingLanes);
                  if (g !== 0) {
                    var b = d;
                    for (b.pendingLanes |= 2, b.entangledLanes |= 2; g; ) {
                      var C = 1 << (31 - ue(g));
                      ((b.entanglements[1] |= C), (g &= ~C));
                    }
                    (Va(d), (ut & 6) === 0 && ((Ds = Xt() + 500), oo(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((b = nl(d, 2)), b !== null && Bn(b, d, 2), Ns(), cd(d, 2));
            }
          if (((d = dd(o)), d === null && Kf(t, n, o, Is, l), d === f)) break;
          f = d;
        }
        f !== null && o.stopPropagation();
      } else Kf(t, n, o, null, l);
    }
  }
  function dd(t) {
    return ((t = hc(t)), hd(t));
  }
  var Is = null;
  function hd(t) {
    if (((Is = null), (t = zt(t)), t !== null)) {
      var n = u(t);
      if (n === null) t = null;
      else {
        var l = n.tag;
        if (l === 13) {
          if (((t = c(n)), t !== null)) return t;
          t = null;
        } else if (l === 31) {
          if (((t = h(n)), t !== null)) return t;
          t = null;
        } else if (l === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else n !== t && (t = null);
      }
    }
    return ((Is = t), null);
  }
  function Dg(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Fn()) {
          case Tn:
            return 2;
          case vr:
            return 8;
          case ia:
          case fn:
            return 32;
          case x:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var md = !1,
    Ur = null,
    jr = null,
    Vr = null,
    po = new Map(),
    vo = new Map(),
    Br = [],
    $1 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Mg(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ur = null;
        break;
      case "dragenter":
      case "dragleave":
        jr = null;
        break;
      case "mouseover":
      case "mouseout":
        Vr = null;
        break;
      case "pointerover":
      case "pointerout":
        po.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        vo.delete(n.pointerId);
    }
  }
  function go(t, n, l, o, f, d) {
    return t === null || t.nativeEvent !== d
      ? ((t = {
          blockedOn: n,
          domEventName: l,
          eventSystemFlags: o,
          nativeEvent: d,
          targetContainers: [f],
        }),
        n !== null && ((n = ft(n)), n !== null && Og(n)),
        t)
      : ((t.eventSystemFlags |= o),
        (n = t.targetContainers),
        f !== null && n.indexOf(f) === -1 && n.push(f),
        t);
  }
  function Y1(t, n, l, o, f) {
    switch (n) {
      case "focusin":
        return ((Ur = go(Ur, t, n, l, o, f)), !0);
      case "dragenter":
        return ((jr = go(jr, t, n, l, o, f)), !0);
      case "mouseover":
        return ((Vr = go(Vr, t, n, l, o, f)), !0);
      case "pointerover":
        var d = f.pointerId;
        return (po.set(d, go(po.get(d) || null, t, n, l, o, f)), !0);
      case "gotpointercapture":
        return ((d = f.pointerId), vo.set(d, go(vo.get(d) || null, t, n, l, o, f)), !0);
    }
    return !1;
  }
  function Ng(t) {
    var n = zt(t.target);
    if (n !== null) {
      var l = u(n);
      if (l !== null) {
        if (((n = l.tag), n === 13)) {
          if (((n = c(l)), n !== null)) {
            ((t.blockedOn = n),
              se(t.priority, function () {
                Cg(l);
              }));
            return;
          }
        } else if (n === 31) {
          if (((n = h(l)), n !== null)) {
            ((t.blockedOn = n),
              se(t.priority, function () {
                Cg(l);
              }));
            return;
          }
        } else if (n === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Qs(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var l = dd(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var o = new l.constructor(l.type, l);
        ((dc = o), l.target.dispatchEvent(o), (dc = null));
      } else return ((n = ft(l)), n !== null && Og(n), (t.blockedOn = l), !1);
      n.shift();
    }
    return !0;
  }
  function kg(t, n, l) {
    Qs(t) && l.delete(n);
  }
  function F1() {
    ((md = !1),
      Ur !== null && Qs(Ur) && (Ur = null),
      jr !== null && Qs(jr) && (jr = null),
      Vr !== null && Qs(Vr) && (Vr = null),
      po.forEach(kg),
      vo.forEach(kg));
  }
  function Ks(t, n) {
    t.blockedOn === n &&
      ((t.blockedOn = null),
      md || ((md = !0), e.unstable_scheduleCallback(e.unstable_NormalPriority, F1)));
  }
  var Js = null;
  function Lg(t) {
    Js !== t &&
      ((Js = t),
      e.unstable_scheduleCallback(e.unstable_NormalPriority, function () {
        Js === t && (Js = null);
        for (var n = 0; n < t.length; n += 3) {
          var l = t[n],
            o = t[n + 1],
            f = t[n + 2];
          if (typeof o != "function") {
            if (hd(o || l) === null) continue;
            break;
          }
          var d = ft(l);
          d !== null &&
            (t.splice(n, 3),
            (n -= 3),
            df(d, { pending: !0, data: f, method: l.method, action: o }, o, f));
        }
      }));
  }
  function si(t) {
    function n(C) {
      return Ks(C, t);
    }
    (Ur !== null && Ks(Ur, t),
      jr !== null && Ks(jr, t),
      Vr !== null && Ks(Vr, t),
      po.forEach(n),
      vo.forEach(n));
    for (var l = 0; l < Br.length; l++) {
      var o = Br[l];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < Br.length && ((l = Br[0]), l.blockedOn === null); )
      (Ng(l), l.blockedOn === null && Br.shift());
    if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
      for (o = 0; o < l.length; o += 3) {
        var f = l[o],
          d = l[o + 1],
          g = f[we] || null;
        if (typeof d == "function") g || Lg(l);
        else if (g) {
          var b = null;
          if (d && d.hasAttribute("formAction")) {
            if (((f = d), (g = d[we] || null))) b = g.formAction;
            else if (hd(f) !== null) continue;
          } else b = g.action;
          (typeof b == "function" ? (l[o + 1] = b) : (l.splice(o, 3), (o -= 3)), Lg(l));
        }
      }
  }
  function Ug() {
    function t(d) {
      d.canIntercept &&
        d.info === "react-transition" &&
        d.intercept({
          handler: function () {
            return new Promise(function (g) {
              return (f = g);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function n() {
      (f !== null && (f(), (f = null)), o || setTimeout(l, 20));
    }
    function l() {
      if (!o && !navigation.transition) {
        var d = navigation.currentEntry;
        d &&
          d.url != null &&
          navigation.navigate(d.url, {
            state: d.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var o = !1,
        f = null;
      return (
        navigation.addEventListener("navigate", t),
        navigation.addEventListener("navigatesuccess", n),
        navigation.addEventListener("navigateerror", n),
        setTimeout(l, 100),
        function () {
          ((o = !0),
            navigation.removeEventListener("navigate", t),
            navigation.removeEventListener("navigatesuccess", n),
            navigation.removeEventListener("navigateerror", n),
            f !== null && (f(), (f = null)));
        }
      );
    }
  }
  function pd(t) {
    this._internalRoot = t;
  }
  ((Ws.prototype.render = pd.prototype.render =
    function (t) {
      var n = this._internalRoot;
      if (n === null) throw Error(i(409));
      var l = n.current,
        o = Wn();
      Tg(l, o, t, n, null, null);
    }),
    (Ws.prototype.unmount = pd.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var n = t.containerInfo;
          (Tg(t.current, 2, null, t, null, null), Ns(), (n[Ee] = null));
        }
      }));
  function Ws(t) {
    this._internalRoot = t;
  }
  Ws.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var n = re();
      t = { blockedOn: null, target: t, priority: n };
      for (var l = 0; l < Br.length && n !== 0 && n < Br[l].priority; l++);
      (Br.splice(l, 0, t), l === 0 && Ng(t));
    }
  };
  var jg = a.version;
  if (jg !== "19.2.7") throw Error(i(527, jg, "19.2.7"));
  X.findDOMNode = function (t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function"
        ? Error(i(188))
        : ((t = Object.keys(t).join(",")), Error(i(268, t)));
    return ((t = m(n)), (t = t !== null ? y(t) : null), (t = t === null ? null : t.stateNode), t);
  };
  var q1 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: D,
    reconcilerVersion: "19.2.7",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var eu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!eu.isDisabled && eu.supportsFiber)
      try {
        ((le = eu.inject(q1)), (oe = eu));
      } catch {}
  }
  return (
    (bo.createRoot = function (t, n) {
      if (!s(t)) throw Error(i(299));
      var l = !1,
        o = "",
        f = Fp,
        d = qp,
        g = Gp;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (f = n.onUncaughtError),
          n.onCaughtError !== void 0 && (d = n.onCaughtError),
          n.onRecoverableError !== void 0 && (g = n.onRecoverableError)),
        (n = Rg(t, 1, !1, null, null, l, o, null, f, d, g, Ug)),
        (t[Ee] = n.current),
        Qf(t),
        new pd(n)
      );
    }),
    (bo.hydrateRoot = function (t, n, l) {
      if (!s(t)) throw Error(i(299));
      var o = !1,
        f = "",
        d = Fp,
        g = qp,
        b = Gp,
        C = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (o = !0),
          l.identifierPrefix !== void 0 && (f = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (d = l.onUncaughtError),
          l.onCaughtError !== void 0 && (g = l.onCaughtError),
          l.onRecoverableError !== void 0 && (b = l.onRecoverableError),
          l.formState !== void 0 && (C = l.formState)),
        (n = Rg(t, 1, !0, n, l ?? null, o, f, C, d, g, b, Ug)),
        (n.context = zg(null)),
        (l = n.current),
        (o = Wn()),
        (o = N(o)),
        (f = xr(o)),
        (f.callback = null),
        Rr(l, f, o),
        (l = o),
        (n.current.lanes = l),
        vt(n, l),
        Va(n),
        (t[Ee] = n.current),
        Qf(t),
        new Ws(n)
      );
    }),
    (bo.version = "19.2.7"),
    bo
  );
}
var Pg;
function tw() {
  if (Pg) return yd.exports;
  Pg = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (a) {
        console.error(a);
      }
  }
  return (e(), (yd.exports = ew()), yd.exports);
}
var nw = tw();
var n0 = (e) => {
    throw TypeError(e);
  },
  a0 = (e, a, r) => a.has(e) || n0("Cannot " + r),
  va = (e, a, r) => (a0(e, a, "read from private field"), r ? r.call(e) : a.get(e)),
  Ro = (e, a, r) =>
    a.has(e)
      ? n0("Cannot add the same private member more than once")
      : a instanceof WeakSet
        ? a.add(e)
        : a.set(e, r),
  Ba = (e, a, r, i) => (a0(e, a, "write to private field"), a.set(e, r), r),
  Yu = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  ph = /^[\\/]{2}/;
function r0(e, a) {
  return a + e.replace(/\\/g, "/");
}
var Xg = "popstate";
function Ig(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "pathname" in e &&
    "search" in e &&
    "hash" in e &&
    "state" in e &&
    "key" in e
  );
}
function aw(e = {}) {
  function a(i, s) {
    let u = s.state?.masked,
      { pathname: c, search: h, hash: p } = u || i.location;
    return Do(
      "",
      { pathname: c, search: h, hash: p },
      (s.state && s.state.usr) || null,
      (s.state && s.state.key) || "default",
      u
        ? { pathname: i.location.pathname, search: i.location.search, hash: i.location.hash }
        : void 0,
    );
  }
  function r(i, s) {
    return typeof s == "string" ? s : qa(s);
  }
  return lw(a, r, null, e);
}
function Ie(e, a) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(a);
}
function Dt(e, a) {
  if (!e) {
    typeof console < "u" && console.warn(a);
    try {
      throw new Error(a);
    } catch {}
  }
}
function rw() {
  return Math.random().toString(36).substring(2, 10);
}
function Qg(e, a) {
  return {
    usr: e.state,
    key: e.key,
    idx: a,
    masked: e.mask ? { pathname: e.pathname, search: e.search, hash: e.hash } : void 0,
  };
}
function Do(e, a, r = null, i, s) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof a == "string" ? Ga(a) : a),
    state: r,
    key: (a && a.key) || i || rw(),
    mask: s,
  };
}
function qa({ pathname: e = "/", search: a = "", hash: r = "" }) {
  return (
    a && a !== "?" && (e += a.charAt(0) === "?" ? a : "?" + a),
    r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r),
    e
  );
}
function Ga(e) {
  let a = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && ((a.hash = e.substring(r)), (e = e.substring(0, r)));
    let i = e.indexOf("?");
    (i >= 0 && ((a.search = e.substring(i)), (e = e.substring(0, i))), e && (a.pathname = e));
  }
  return a;
}
function lw(e, a, r, i = {}) {
  let { window: s = document.defaultView, v5Compat: u = !1 } = i,
    c = s.history,
    h = "POP",
    p = null,
    m = y();
  m == null && ((m = 0), c.replaceState({ ...c.state, idx: m }, ""));
  function y() {
    return (c.state || { idx: null }).idx;
  }
  function v() {
    h = "POP";
    let R = y(),
      j = R == null ? null : R - m;
    ((m = R), p && p({ action: h, location: z.location, delta: j }));
  }
  function S(R, j) {
    h = "PUSH";
    let k = Ig(R) ? R : Do(z.location, R, j);
    m = y() + 1;
    let F = Qg(k, m),
      $ = z.createHref(k.mask || k);
    try {
      c.pushState(F, "", $);
    } catch (G) {
      if (G instanceof DOMException && G.name === "DataCloneError") throw G;
      s.location.assign($);
    }
    u && p && p({ action: h, location: z.location, delta: 1 });
  }
  function E(R, j) {
    h = "REPLACE";
    let k = Ig(R) ? R : Do(z.location, R, j);
    m = y();
    let F = Qg(k, m),
      $ = z.createHref(k.mask || k);
    (c.replaceState(F, "", $), u && p && p({ action: h, location: z.location, delta: 0 }));
  }
  function w(R) {
    return l0(s, R);
  }
  let z = {
    get action() {
      return h;
    },
    get location() {
      return e(s, c);
    },
    listen(R) {
      if (p) throw new Error("A history only accepts one active listener");
      return (
        s.addEventListener(Xg, v),
        (p = R),
        () => {
          (s.removeEventListener(Xg, v), (p = null));
        }
      );
    },
    createHref(R) {
      return a(s, R);
    },
    createURL: w,
    encodeLocation(R) {
      let j = w(R);
      return { pathname: j.pathname, search: j.search, hash: j.hash };
    },
    push: S,
    replace: E,
    go(R) {
      return c.go(R);
    },
  };
  return z;
}
function l0(e, a, r = !1) {
  let i = "http://localhost";
  (e && (i = e.location.origin !== "null" ? e.location.origin : e.location.href),
    Ie(i, "No window.location.(origin|href) available to create URL"));
  let s = typeof a == "string" ? a : qa(a);
  return ((s = s.replace(/ $/, "%20")), !r && ph.test(s) && (s = i + s), new URL(s, i));
}
var zo,
  Kg = class {
    constructor(e) {
      if ((Ro(this, zo, new Map()), e)) for (let [a, r] of e) this.set(a, r);
    }
    get(e) {
      if (va(this, zo).has(e)) return va(this, zo).get(e);
      if (e.defaultValue !== void 0) return e.defaultValue;
      throw new Error("No value found for context");
    }
    set(e, a) {
      va(this, zo).set(e, a);
    }
  };
zo = new WeakMap();
var iw = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function ow(e) {
  return iw.has(e);
}
var sw = new Set(["lazy", "caseSensitive", "path", "id", "index", "middleware", "children"]);
function uw(e) {
  return sw.has(e);
}
function cw(e) {
  return e.index === !0;
}
function Mo(e, a, r = [], i = {}, s = !1) {
  return e.map((u, c) => {
    let h = [...r, String(c)],
      p = typeof u.id == "string" ? u.id : h.join("-");
    if (
      (Ie(u.index !== !0 || !u.children, "Cannot specify children on an index route"),
      Ie(
        s || !i[p],
        `Found a route id collision on id "${p}".  Route id's must be globally unique within Data Router usages`,
      ),
      cw(u))
    ) {
      let m = { ...u, id: p };
      return ((i[p] = Jg(m, a(m))), m);
    } else {
      let m = { ...u, id: p, children: void 0 };
      return ((i[p] = Jg(m, a(m))), u.children && (m.children = Mo(u.children, a, h, i, s)), m);
    }
  });
}
function Jg(e, a) {
  return Object.assign(e, {
    ...a,
    ...(typeof a.lazy == "object" && a.lazy != null ? { lazy: { ...e.lazy, ...a.lazy } } : {}),
  });
}
function i0(e, a, r = "/") {
  return Aa(e, a, r, !1);
}
function Aa(e, a, r, i, s) {
  let u = typeof a == "string" ? Ga(a) : a,
    c = aa(u.pathname || "/", r);
  if (c == null) return null;
  let h = s ?? Eu(e),
    p = null,
    m = Sw(c);
  for (let y = 0; p == null && y < h.length; ++y) p = _w(h[y], m, i);
  return p;
}
function o0(e, a) {
  let { route: r, pathname: i, params: s } = e;
  return { id: r.id, pathname: i, params: s, data: a[r.id], loaderData: a[r.id], handle: r.handle };
}
function Eu(e) {
  let a = s0(e);
  return (fw(a), a);
}
function s0(e, a = [], r = [], i = "", s = !1) {
  let u = (c, h, p = s, m) => {
    let y = {
      relativePath: m === void 0 ? c.path || "" : m,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: h,
      route: c,
    };
    if (y.relativePath.startsWith("/")) {
      if (!y.relativePath.startsWith(i) && p) return;
      (Ie(
        y.relativePath.startsWith(i),
        `Absolute route path "${y.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (y.relativePath = y.relativePath.slice(i.length)));
    }
    let v = ya([i, y.relativePath]),
      S = r.concat(y);
    (c.children &&
      c.children.length > 0 &&
      (Ie(
        c.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${v}".`,
      ),
      s0(c.children, a, S, v, p)),
      !(c.path == null && !c.index) &&
        a.push({
          path: v,
          score: yw(v, c.index),
          routesMeta: S.map((E, w) => {
            let [z, R] = f0(E.relativePath, E.caseSensitive, w === S.length - 1);
            return { ...E, matcher: z, compiledParams: R };
          }),
        }));
  };
  return (
    e.forEach((c, h) => {
      if (c.path === "" || !c.path?.includes("?")) u(c, h);
      else for (let p of u0(c.path)) u(c, h, !0, p);
    }),
    a
  );
}
function u0(e) {
  let a = e.split("/");
  if (a.length === 0) return [];
  let [r, ...i] = a,
    s = r.endsWith("?"),
    u = r.replace(/\?$/, "");
  if (i.length === 0) return s ? [u, ""] : [u];
  let c = u0(i.join("/")),
    h = [];
  return (
    h.push(...c.map((p) => (p === "" ? u : [u, p].join("/")))),
    s && h.push(...c),
    h.map((p) => (e.startsWith("/") && p === "" ? "/" : p))
  );
}
function fw(e) {
  e.sort((a, r) =>
    a.score !== r.score
      ? r.score - a.score
      : bw(
          a.routesMeta.map((i) => i.childrenIndex),
          r.routesMeta.map((i) => i.childrenIndex),
        ),
  );
}
var dw = /^:[\w-]+$/,
  hw = 3,
  mw = 2,
  pw = 1,
  vw = 10,
  gw = -2,
  Wg = (e) => e === "*";
function yw(e, a) {
  let r = e.split("/"),
    i = r.length;
  return (
    r.some(Wg) && (i += gw),
    a && (i += mw),
    r.filter((s) => !Wg(s)).reduce((s, u) => s + (dw.test(u) ? hw : u === "" ? pw : vw), i)
  );
}
function bw(e, a) {
  return e.length === a.length && e.slice(0, -1).every((i, s) => i === a[s])
    ? e[e.length - 1] - a[a.length - 1]
    : 0;
}
function _w(e, a, r = !1) {
  let { routesMeta: i } = e,
    s = {},
    u = "/",
    c = [];
  for (let h = 0; h < i.length; ++h) {
    let p = i[h],
      m = h === i.length - 1,
      y = u === "/" ? a : a.slice(u.length) || "/",
      v = { path: p.relativePath, caseSensitive: p.caseSensitive, end: m },
      S = p.matcher && p.compiledParams ? c0(v, y, p.matcher, p.compiledParams) : Cu(v, y),
      E = p.route;
    if (
      (!S &&
        m &&
        r &&
        !i[i.length - 1].route.index &&
        (S = Cu({ path: p.relativePath, caseSensitive: p.caseSensitive, end: !1 }, y)),
      !S)
    )
      return null;
    (Object.assign(s, S.params),
      c.push({
        params: s,
        pathname: ya([u, S.pathname]),
        pathnameBase: xw(ya([u, S.pathnameBase])),
        route: E,
      }),
      S.pathnameBase !== "/" && (u = ya([u, S.pathnameBase])));
  }
  return c;
}
function Cu(e, a) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, i] = f0(e.path, e.caseSensitive, e.end);
  return c0(e, a, r, i);
}
function c0(e, a, r, i) {
  let s = a.match(r);
  if (!s) return null;
  let u = s[0],
    c = u.replace(/(.)\/+$/, "$1"),
    h = s.slice(1);
  return {
    params: i.reduce((m, { paramName: y, isOptional: v }, S) => {
      if (y === "*") {
        let w = h[S] || "";
        c = u.slice(0, u.length - w.length).replace(/(.)\/+$/, "$1");
      }
      const E = h[S];
      return (v && !E ? (m[y] = void 0) : (m[y] = (E || "").replace(/%2F/g, "/")), m);
    }, {}),
    pathname: u,
    pathnameBase: c,
    pattern: e,
  };
}
function f0(e, a = !1, r = !0) {
  Dt(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
  );
  let i = [],
    s =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (c, h, p, m, y) => {
          if ((i.push({ paramName: h, isOptional: p != null }), p)) {
            let v = y.charAt(m + c.length);
            return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    e.endsWith("*")
      ? (i.push({ paramName: "*" }), (s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : r
        ? (s += "\\/*$")
        : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"),
    [new RegExp(s, a ? void 0 : "i"), i]
  );
}
function Sw(e) {
  try {
    return e
      .split("/")
      .map((a) => decodeURIComponent(a).replace(/\//g, "%2F"))
      .join("/");
  } catch (a) {
    return (
      Dt(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`,
      ),
      e
    );
  }
}
function aa(e, a) {
  if (a === "/") return e;
  if (!e.toLowerCase().startsWith(a.toLowerCase())) return null;
  let r = a.endsWith("/") ? a.length - 1 : a.length,
    i = e.charAt(r);
  return i && i !== "/" ? null : e.slice(r) || "/";
}
function Ew({ basename: e, pathname: a }) {
  return a === "/" ? e : ya([e, a]);
}
var vh = (e) => Yu.test(e);
function ww(e, a = "/") {
  let { pathname: r, search: i = "", hash: s = "" } = typeof e == "string" ? Ga(e) : e,
    u;
  return (
    r ? ((r = gh(r)), r.startsWith("/") ? (u = ey(r.substring(1), "/")) : (u = ey(r, a))) : (u = a),
    { pathname: u, search: Rw(i), hash: zw(s) }
  );
}
function ey(e, a) {
  let r = Du(a).split("/");
  return (
    e.split("/").forEach((s) => {
      s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
    }),
    r.length > 1 ? r.join("/") : "/"
  );
}
function Ed(e, a, r, i) {
  return `Cannot include a '${e}' character in a manually specified \`to.${a}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function d0(e) {
  return e.filter((a, r) => r === 0 || (a.route.path && a.route.path.length > 0));
}
function Fu(e) {
  let a = d0(e);
  return a.map((r, i) => (i === a.length - 1 ? r.pathname : r.pathnameBase));
}
function jo(e, a, r, i = !1) {
  let s;
  typeof e == "string"
    ? (s = Ga(e))
    : ((s = { ...e }),
      Ie(!s.pathname || !s.pathname.includes("?"), Ed("?", "pathname", "search", s)),
      Ie(!s.pathname || !s.pathname.includes("#"), Ed("#", "pathname", "hash", s)),
      Ie(!s.search || !s.search.includes("#"), Ed("#", "search", "hash", s)));
  let u = e === "" || s.pathname === "",
    c = u ? "/" : s.pathname,
    h;
  if (c == null) h = r;
  else {
    let v = a.length - 1;
    if (!i && c.startsWith("..")) {
      let S = c.split("/");
      for (; S[0] === ".."; ) (S.shift(), (v -= 1));
      s.pathname = S.join("/");
    }
    h = v >= 0 ? a[v] : "/";
  }
  let p = ww(s, h),
    m = c && c !== "/" && c.endsWith("/"),
    y = (u || c === ".") && r.endsWith("/");
  return (!p.pathname.endsWith("/") && (m || y) && (p.pathname += "/"), p);
}
var gh = (e) => e.replace(/[\\/]{2,}/g, "/"),
  ya = (e) => gh(e.join("/")),
  Du = (e) => e.replace(/\/+$/, ""),
  xw = (e) => Du(e).replace(/^\/*/, "/"),
  Rw = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  zw = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e),
  Tw = ["EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"],
  Vo = class {
    constructor(e, a, r, i = !1) {
      ((this.status = e),
        (this.statusText = a || ""),
        (this.internal = i),
        r instanceof Error ? ((this.data = r.toString()), (this.error = r)) : (this.data = r));
    }
  };
function Ei(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
function Bo(e) {
  let a = e.map((r) => r.route.path).filter(Boolean);
  return ya(a) || "/";
}
var h0 =
  typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function m0(e, a) {
  let r = e;
  if (typeof r != "string" || !Yu.test(r)) return { absoluteURL: void 0, isExternal: !1, to: r };
  let i = r,
    s = !1;
  if (h0)
    try {
      let u = new URL(window.location.href),
        c = ph.test(r) ? new URL(r0(r, u.protocol)) : new URL(r),
        h = aa(c.pathname, a);
      c.origin === u.origin && h != null ? (r = h + c.search + c.hash) : (s = !0);
    } catch {
      Dt(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: i, isExternal: s, to: r };
}
var Xr = Symbol("Uninstrumented");
function Aw(e, a) {
  let r = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: [],
  };
  e.forEach((s) =>
    s({
      id: a.id,
      index: a.index,
      path: a.path,
      instrument(u) {
        let c = Object.keys(r);
        for (let h of c) u[h] && r[h].push(u[h]);
      },
    }),
  );
  let i = {};
  if (typeof a.lazy == "function" && r.lazy.length > 0) {
    let s = gi(r.lazy, a.lazy, () => {});
    s && (i.lazy = s);
  }
  if (typeof a.lazy == "object") {
    let s = a.lazy;
    ["middleware", "loader", "action"].forEach((u) => {
      let c = s[u],
        h = r[`lazy.${u}`];
      if (typeof c == "function" && h.length > 0) {
        let p = gi(h, c, () => {});
        p && (i.lazy = Object.assign(i.lazy || {}, { [u]: p }));
      }
    });
  }
  return (
    ["loader", "action"].forEach((s) => {
      let u = a[s];
      if (typeof u == "function" && r[s].length > 0) {
        let c = u[Xr] ?? u,
          h = gi(r[s], c, (...p) => ty(p[0]));
        h && (s === "loader" && c.hydrate === !0 && (h.hydrate = !0), (h[Xr] = c), (i[s] = h));
      }
    }),
    a.middleware &&
      a.middleware.length > 0 &&
      r.middleware.length > 0 &&
      (i.middleware = a.middleware.map((s) => {
        let u = s[Xr] ?? s,
          c = gi(r.middleware, u, (...h) => ty(h[0]));
        return c ? ((c[Xr] = u), c) : s;
      })),
    i
  );
}
function Ow(e, a) {
  let r = { navigate: [], fetch: [] };
  if (
    (a.forEach((i) =>
      i({
        instrument(s) {
          let u = Object.keys(s);
          for (let c of u) s[c] && r[c].push(s[c]);
        },
      }),
    ),
    r.navigate.length > 0)
  ) {
    let i = e.navigate[Xr] ?? e.navigate,
      s = gi(r.navigate, i, (...u) => {
        let [c, h] = u;
        return {
          to: typeof c == "number" || typeof c == "string" ? c : c ? qa(c) : ".",
          ...ny(e, h ?? {}),
        };
      });
    s && ((s[Xr] = i), (e.navigate = s));
  }
  if (r.fetch.length > 0) {
    let i = e.fetch[Xr] ?? e.fetch,
      s = gi(r.fetch, i, (...u) => {
        let [c, , h, p] = u;
        return { href: h ?? ".", fetcherKey: c, ...ny(e, p ?? {}) };
      });
    s && ((s[Xr] = i), (e.fetch = s));
  }
  return e;
}
function gi(e, a, r) {
  return e.length === 0
    ? null
    : async (...i) => {
        let s = await p0(e, r(...i), () => a(...i), e.length - 1);
        if (s.type === "error") throw s.value;
        return s.value;
      };
}
async function p0(e, a, r, i) {
  let s = e[i],
    u;
  if (s) {
    let c,
      h = async () => (
        c
          ? console.error("You cannot call instrumented handlers more than once")
          : (c = p0(e, a, r, i - 1)),
        (u = await c),
        Ie(u, "Expected a result"),
        u.type === "error" && u.value instanceof Error
          ? { status: "error", error: u.value }
          : { status: "success", error: void 0 }
      );
    try {
      await s(h, a);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    (c || (await h()), await c);
  } else
    try {
      u = { type: "success", value: await r() };
    } catch (c) {
      u = { type: "error", value: c };
    }
  return u || { type: "error", value: new Error("No result assigned in instrumentation chain.") };
}
function ty(e) {
  let { request: a, context: r, params: i, pattern: s } = e;
  return { request: Cw(a), params: { ...i }, pattern: s, context: Dw(r) };
}
function ny(e, a) {
  return {
    currentUrl: qa(e.state.location),
    ...("formMethod" in a ? { formMethod: a.formMethod } : {}),
    ...("formEncType" in a ? { formEncType: a.formEncType } : {}),
    ...("formData" in a ? { formData: a.formData } : {}),
    ...("body" in a ? { body: a.body } : {}),
  };
}
function Cw(e) {
  return { method: e.method, url: e.url, headers: { get: (...a) => e.headers.get(...a) } };
}
function Dw(e) {
  if (Nw(e)) {
    let a = { ...e };
    return (Object.freeze(a), a);
  } else return { get: (a) => e.get(a) };
}
var Mw = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Nw(e) {
  if (e === null || typeof e != "object") return !1;
  const a = Object.getPrototypeOf(e);
  return (
    a === Object.prototype || a === null || Object.getOwnPropertyNames(a).sort().join("\0") === Mw
  );
}
var v0 = ["POST", "PUT", "PATCH", "DELETE"],
  kw = new Set(v0),
  Lw = ["GET", ...v0],
  Uw = new Set(Lw),
  g0 = new Set([301, 302, 303, 307, 308]),
  jw = new Set([307, 308]),
  wd = {
    state: "idle",
    location: void 0,
    matches: void 0,
    historyAction: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Vw = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  _o = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  Bw = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  y0 = "remix-router-transitions",
  b0 = Symbol("ResetLoaderData"),
  vl,
  mi,
  Fr,
  pi,
  Hw = class {
    constructor(e) {
      (Ro(this, vl),
        Ro(this, mi),
        Ro(this, Fr),
        Ro(this, pi),
        Ba(this, vl, e),
        Ba(this, mi, Eu(e)));
    }
    get stableRoutes() {
      return va(this, vl);
    }
    get activeRoutes() {
      return va(this, Fr) ?? va(this, vl);
    }
    get branches() {
      return va(this, pi) ?? va(this, mi);
    }
    get hasHMRRoutes() {
      return va(this, Fr) != null;
    }
    setRoutes(e) {
      (Ba(this, vl, e), Ba(this, mi, Eu(e)));
    }
    setHmrRoutes(e) {
      (Ba(this, Fr, e), Ba(this, pi, Eu(e)));
    }
    commitHmrRoutes() {
      va(this, Fr) &&
        (Ba(this, vl, va(this, Fr)),
        Ba(this, mi, va(this, pi)),
        Ba(this, Fr, void 0),
        Ba(this, pi, void 0));
    }
  };
vl = new WeakMap();
mi = new WeakMap();
Fr = new WeakMap();
pi = new WeakMap();
function Zw(e) {
  const a = e.window ? e.window : typeof window < "u" ? window : void 0,
    r = typeof a < "u" && typeof a.document < "u" && typeof a.document.createElement < "u";
  Ie(e.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let i = e.hydrationRouteProperties || [],
    s = e.mapRouteProperties || Bw,
    u = s;
  if (e.instrumentations) {
    let A = e.instrumentations;
    u = (N) => ({ ...s(N), ...Aw(A.map((B) => B.route).filter(Boolean), N) });
  }
  let c = {},
    h = new Hw(Mo(e.routes, u, void 0, c)),
    p = e.basename || "/";
  p.startsWith("/") || (p = `/${p}`);
  let m = e.dataStrategy || Gw,
    y = { ...e.future },
    v = null,
    S = new Set(),
    E = null,
    w = null,
    z = null,
    R = null,
    j = e.hydrationData != null,
    k = Aa(h.activeRoutes, e.history.location, p, !1, h.branches),
    F = !1,
    $ = null,
    G,
    he;
  if (k == null && !e.patchRoutesOnNavigation) {
    let A = ga(404, { pathname: e.history.location.pathname }),
      { matches: N, route: B } = tu(h.activeRoutes);
    ((G = !0), (he = !G), (k = N), ($ = { [B.id]: A }));
  } else if (
    (k &&
      !e.hydrationData &&
      qn(k, h.activeRoutes, e.history.location.pathname).active &&
      (k = null),
    k)
  )
    if (k.some((A) => A.route.lazy)) ((G = !1), (he = !G));
    else if (!k.some((A) => yh(A.route))) ((G = !0), (he = !G));
    else {
      let A = e.hydrationData ? e.hydrationData.loaderData : null,
        N = e.hydrationData ? e.hydrationData.errors : null,
        B = k;
      if (N) {
        let re = k.findIndex((se) => N[se.route.id] !== void 0);
        B = B.slice(0, re + 1);
      }
      ((he = !1),
        (G = !0),
        B.forEach((re) => {
          let se = _0(re.route, A, N);
          ((he = he || se.renderFallback), (G = G && !se.shouldLoad));
        }));
    }
  else {
    ((G = !1), (he = !G), (k = []));
    let A = qn(null, h.activeRoutes, e.history.location.pathname);
    A.active && A.matches && ((F = !0), (k = A.matches));
  }
  let ce,
    T = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: k,
      initialized: G,
      renderFallback: he,
      navigation: wd,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || $,
      fetchers: new Map(),
      blockers: new Map(),
    },
    me = "POP",
    Oe = null,
    Be = !1,
    fe,
    be = !1,
    ze = new Map(),
    xe = null,
    D = !1,
    X = !1,
    pe = new Set(),
    ge = new Map(),
    Q = 0,
    O = -1,
    I = new Map(),
    q = new Set(),
    J = new Map(),
    ie = new Map(),
    ve = new Set(),
    Me = new Map(),
    He,
    Ne = null;
  function un() {
    if (
      ((v = e.history.listen(({ action: A, location: N, delta: B }) => {
        if (He) {
          (He(), (He = void 0));
          return;
        }
        Dt(
          Me.size === 0 || B != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
        );
        let re = It({ currentLocation: T.location, nextLocation: N, historyAction: A });
        if (re && B != null) {
          let se = new Promise((Te) => {
            He = Te;
          });
          (e.history.go(B * -1),
            dn(re, {
              state: "blocked",
              location: N,
              proceed() {
                (dn(re, { state: "proceeding", proceed: void 0, reset: void 0, location: N }),
                  se.then(() => e.history.go(B)));
              },
              reset() {
                let Te = new Map(T.blockers);
                (Te.set(re, _o), St({ blockers: Te }));
              },
            }),
            Oe?.resolve(),
            (Oe = null));
          return;
        }
        return cn(A, N);
      })),
      r)
    ) {
      fx(a, ze);
      let A = () => dx(a, ze);
      (a.addEventListener("pagehide", A), (xe = () => a.removeEventListener("pagehide", A)));
    }
    return (T.initialized || cn("POP", T.location, { initialHydration: !0 }), ce);
  }
  function an() {
    (v && v(),
      xe && xe(),
      S.clear(),
      fe && fe.abort(),
      T.fetchers.forEach((A, N) => le(T.fetchers, N)),
      T.blockers.forEach((A, N) => Nt(N)));
  }
  function Ut(A) {
    if ((S.add(A), E)) {
      let { newErrors: N } = E;
      ((E = null),
        A(T, { deletedFetchers: [], newErrors: N, viewTransitionOpts: void 0, flushSync: !1 }));
    }
    return () => S.delete(A);
  }
  function St(A, N = {}) {
    (A.matches &&
      (A.matches = A.matches.map((se) => {
        let Te = c[se.route.id],
          Se = se.route;
        return Se.element !== Te.element ||
          Se.errorElement !== Te.errorElement ||
          Se.hydrateFallbackElement !== Te.hydrateFallbackElement
          ? { ...se, route: Te }
          : se;
      })),
      (T = { ...T, ...A }));
    let B = [],
      re = [];
    (T.fetchers.forEach((se, Te) => {
      se.state === "idle" && (ve.has(Te) ? B.push(Te) : re.push(Te));
    }),
      ve.forEach((se) => {
        !T.fetchers.has(se) && !ge.has(se) && B.push(se);
      }),
      S.size === 0 && (E = { newErrors: A.errors ?? null }),
      [...S].forEach((se) =>
        se(T, {
          deletedFetchers: B,
          newErrors: A.errors ?? null,
          viewTransitionOpts: N.viewTransitionOpts,
          flushSync: N.flushSync === !0,
        }),
      ),
      B.forEach((se) => le(T.fetchers, se)),
      re.forEach((se) => T.fetchers.delete(se)));
  }
  function xt(A, N, { flushSync: B } = {}) {
    let re =
        T.actionData != null &&
        T.navigation.formMethod != null &&
        xn(T.navigation.formMethod) &&
        T.navigation.state === "loading" &&
        A.state?._isRedirect !== !0,
      se;
    N.actionData
      ? Object.keys(N.actionData).length > 0
        ? (se = N.actionData)
        : (se = null)
      : re
        ? (se = T.actionData)
        : (se = null);
    let Te = N.loaderData
        ? dy(T.loaderData, N.loaderData, N.matches || [], N.errors)
        : T.loaderData,
      Se = T.blockers;
    Se.size > 0 && ((Se = new Map(Se)), Se.forEach((je, Ge) => Se.set(Ge, _o)));
    let we = D ? !1 : Vt(A, N.matches || T.matches),
      Ee =
        Be === !0 ||
        (T.navigation.formMethod != null &&
          xn(T.navigation.formMethod) &&
          A.state?._isRedirect !== !0);
    (h.commitHmrRoutes(),
      D ||
        me === "POP" ||
        (me === "PUSH"
          ? e.history.push(A, A.state)
          : me === "REPLACE" && e.history.replace(A, A.state)));
    let Ue;
    if (me === "POP") {
      let je = ze.get(T.location.pathname);
      je && je.has(A.pathname)
        ? (Ue = { currentLocation: T.location, nextLocation: A })
        : ze.has(A.pathname) && (Ue = { currentLocation: A, nextLocation: T.location });
    } else if (be) {
      let je = ze.get(T.location.pathname);
      (je ? je.add(A.pathname) : ((je = new Set([A.pathname])), ze.set(T.location.pathname, je)),
        (Ue = { currentLocation: T.location, nextLocation: A }));
    }
    (St(
      {
        ...N,
        actionData: se,
        loaderData: Te,
        historyAction: me,
        location: A,
        initialized: !0,
        renderFallback: !1,
        navigation: wd,
        revalidation: "idle",
        restoreScrollPosition: we,
        preventScrollReset: Ee,
        blockers: Se,
      },
      { viewTransitionOpts: Ue, flushSync: B === !0 },
    ),
      (me = "POP"),
      (Be = !1),
      (be = !1),
      (D = !1),
      (X = !1),
      Oe?.resolve(),
      (Oe = null),
      Ne?.resolve(),
      (Ne = null));
  }
  async function Ma(A, N) {
    if ((Oe?.resolve(), (Oe = null), typeof A == "number")) {
      Oe || (Oe = vy());
      let it = Oe.promise;
      return (e.history.go(A), it);
    }
    let B = $d(T.location, T.matches, p, A, N?.fromRouteId, N?.relative),
      { path: re, submission: se, error: Te } = ay(!1, B, N),
      Se;
    N?.mask &&
      (Se = {
        pathname: "",
        search: "",
        hash: "",
        ...(typeof N.mask == "string" ? Ga(N.mask) : { ...T.location.mask, ...N.mask }),
      });
    let we = T.location,
      Ee = Do(we, re, N && N.state, void 0, Se);
    Ee = { ...Ee, ...e.history.encodeLocation(Ee) };
    let Ue = N && N.replace != null ? N.replace : void 0,
      je = "PUSH";
    Ue === !0
      ? (je = "REPLACE")
      : Ue === !1 ||
        (se != null &&
          xn(se.formMethod) &&
          se.formAction === T.location.pathname + T.location.search &&
          (je = "REPLACE"));
    let Ge = N && "preventScrollReset" in N ? N.preventScrollReset === !0 : void 0,
      Ye = (N && N.flushSync) === !0,
      Ke = It({ currentLocation: we, nextLocation: Ee, historyAction: je });
    if (Ke) {
      dn(Ke, {
        state: "blocked",
        location: Ee,
        proceed() {
          (dn(Ke, { state: "proceeding", proceed: void 0, reset: void 0, location: Ee }), Ma(A, N));
        },
        reset() {
          let it = new Map(T.blockers);
          (it.set(Ke, _o), St({ blockers: it }));
        },
      });
      return;
    }
    await cn(je, Ee, {
      submission: se,
      pendingError: Te,
      preventScrollReset: Ge,
      replace: N && N.replace,
      enableViewTransition: N && N.viewTransition,
      flushSync: Ye,
      callSiteDefaultShouldRevalidate: N && N.defaultShouldRevalidate,
    });
  }
  function la() {
    (Ne || (Ne = vy()), ia(), St({ revalidation: "loading" }));
    let A = Ne.promise;
    return T.navigation.state === "submitting"
      ? A
      : T.navigation.state === "idle"
        ? (cn(T.historyAction, T.location, { startUninterruptedRevalidation: !0 }), A)
        : (cn(me || T.historyAction, T.navigation.location, {
            overrideNavigation: T.navigation,
            enableViewTransition: be === !0,
          }),
          A);
  }
  async function cn(A, N, B) {
    (fe && fe.abort(),
      (fe = null),
      (me = A),
      (D = (B && B.startUninterruptedRevalidation) === !0),
      jt(T.location, T.matches),
      (Be = (B && B.preventScrollReset) === !0),
      (be = (B && B.enableViewTransition) === !0));
    let re = h.activeRoutes,
      se =
        B?.initialHydration && T.matches && T.matches.length > 0 && !F
          ? T.matches
          : Aa(re, N, p, !1, h.branches),
      Te = (B && B.flushSync) === !0;
    if (
      se &&
      T.initialized &&
      !X &&
      tx(T.location, N) &&
      !(B && B.submission && xn(B.submission.formMethod))
    ) {
      xt(N, { matches: se }, { flushSync: Te });
      return;
    }
    let Se = qn(se, re, N.pathname);
    if ((Se.active && Se.matches && (se = Se.matches), !se)) {
      let { error: ft, notFoundMatches: rt, route: Ft } = Qt(N.pathname);
      xt(N, { matches: rt, loaderData: {}, errors: { [Ft.id]: ft } }, { flushSync: Te });
      return;
    }
    let we =
      B && B.overrideNavigation
        ? { ...B.overrideNavigation, matches: se, historyAction: A }
        : void 0;
    fe = new AbortController();
    let Ee = vi(e.history, N, fe.signal, B && B.submission),
      Ue = e.getContext ? await e.getContext() : new Kg(),
      je;
    if (B && B.pendingError) je = [Pr(se).route.id, { type: "error", error: B.pendingError }];
    else if (B && B.submission && xn(B.submission.formMethod)) {
      let ft = await Sa(Ee, N, B.submission, se, A, Ue, Se.active, B && B.initialHydration === !0, {
        replace: B.replace,
        flushSync: Te,
      });
      if (ft.shortCircuited) return;
      if (ft.pendingActionResult) {
        let [rt, Ft] = ft.pendingActionResult;
        if (ea(Ft) && Ei(Ft.error) && Ft.error.status === 404) {
          ((fe = null), xt(N, { matches: ft.matches, loaderData: {}, errors: { [rt]: Ft.error } }));
          return;
        }
      }
      ((se = ft.matches || se),
        (je = ft.pendingActionResult),
        (we = xd(N, se, A, B.submission)),
        (Te = !1),
        (Se.active = !1),
        (Ee = vi(e.history, Ee.url, Ee.signal)));
    }
    let {
      shortCircuited: Ge,
      matches: Ye,
      loaderData: Ke,
      errors: it,
      workingFetchers: zt,
    } = await rn(
      Ee,
      N,
      se,
      A,
      Ue,
      Se.active,
      we,
      B && B.submission,
      B && B.fetcherSubmission,
      B && B.replace,
      B && B.initialHydration === !0,
      Te,
      je,
      B && B.callSiteDefaultShouldRevalidate,
    );
    Ge ||
      ((fe = null),
      xt(N, {
        matches: Ye || se,
        ...hy(je),
        loaderData: Ke,
        errors: it,
        ...(zt ? { fetchers: zt } : {}),
      }));
  }
  async function Sa(A, N, B, re, se, Te, Se, we, Ee = {}) {
    ia();
    let Ue = ux(N, re, se, B);
    if ((St({ navigation: Ue }, { flushSync: Ee.flushSync === !0 }), Se)) {
      let Ye = await vt(re, N.pathname, A.signal);
      if (Ye.type === "aborted") return { shortCircuited: !0 };
      if (Ye.type === "error") {
        if (Ye.partialMatches.length === 0) {
          let { matches: it, route: zt } = tu(h.activeRoutes);
          return { matches: it, pendingActionResult: [zt.id, { type: "error", error: Ye.error }] };
        }
        let Ke = Pr(Ye.partialMatches).route.id;
        return {
          matches: Ye.partialMatches,
          pendingActionResult: [Ke, { type: "error", error: Ye.error }],
        };
      } else if (Ye.matches) re = Ye.matches;
      else {
        let { notFoundMatches: Ke, error: it, route: zt } = Qt(N.pathname);
        return { matches: Ke, pendingActionResult: [zt.id, { type: "error", error: it }] };
      }
    }
    let je,
      Ge = wu(re, N);
    if (!Ge.route.action && !Ge.route.lazy)
      je = {
        type: "error",
        error: ga(405, { method: A.method, pathname: N.pathname, routeId: Ge.route.id }),
      };
    else {
      let Ye = bi(u, c, A, N, re, Ge, we ? [] : i, Te),
        Ke = await Tn(A, N, Ye, Te, null);
      if (((je = Ke[Ge.route.id]), !je)) {
        for (let it of re)
          if (Ke[it.route.id]) {
            je = Ke[it.route.id];
            break;
          }
      }
      if (A.signal.aborted) return { shortCircuited: !0 };
    }
    if (yl(je)) {
      let Ye;
      return (
        Ee && Ee.replace != null
          ? (Ye = Ee.replace)
          : (Ye =
              uy(je.response.headers.get("Location"), new URL(A.url), p, e.history) ===
              T.location.pathname + T.location.search),
        await Fn(A, je, !0, { submission: B, replace: Ye }),
        { shortCircuited: !0 }
      );
    }
    if (ea(je)) {
      let Ye = Pr(re, Ge.route.id);
      return (
        (Ee && Ee.replace) !== !0 && (me = "PUSH"),
        { matches: re, pendingActionResult: [Ye.route.id, je, Ge.route.id] }
      );
    }
    return { matches: re, pendingActionResult: [Ge.route.id, je] };
  }
  async function rn(A, N, B, re, se, Te, Se, we, Ee, Ue, je, Ge, Ye, Ke) {
    let it = Se || xd(N, B, re, we),
      zt = we || Ee || py(it),
      ft = !D && !je;
    if (Te) {
      if (ft) {
        let Et = Na(Ye);
        St({ navigation: it, ...(Et !== void 0 ? { actionData: Et } : {}) }, { flushSync: Ge });
      }
      let Fe = await vt(B, N.pathname, A.signal);
      if (Fe.type === "aborted") return { shortCircuited: !0 };
      if (Fe.type === "error") {
        if (Fe.partialMatches.length === 0) {
          let { matches: Gn, route: xa } = tu(h.activeRoutes);
          return { matches: Gn, loaderData: {}, errors: { [xa.id]: Fe.error } };
        }
        let Et = Pr(Fe.partialMatches).route.id;
        return { matches: Fe.partialMatches, loaderData: {}, errors: { [Et]: Fe.error } };
      } else if (Fe.matches) B = Fe.matches;
      else {
        let { error: Et, notFoundMatches: Gn, route: xa } = Qt(N.pathname);
        return { matches: Gn, loaderData: {}, errors: { [xa.id]: Et } };
      }
    }
    let rt = h.activeRoutes,
      { dsMatches: Ft, revalidatingFetchers: lt } = ry(
        A,
        se,
        u,
        c,
        e.history,
        T,
        B,
        zt,
        N,
        je ? [] : i,
        je === !0,
        X,
        pe,
        ve,
        J,
        q,
        rt,
        p,
        e.patchRoutesOnNavigation != null,
        h.branches,
        Ye,
        Ke,
      );
    if (
      ((O = ++Q),
      !e.dataStrategy &&
        !Ft.some((Fe) => Fe.shouldLoad) &&
        !Ft.some((Fe) => Fe.route.middleware && Fe.route.middleware.length > 0) &&
        lt.length === 0)
    ) {
      let Fe = new Map(T.fetchers),
        Et = _e(Fe);
      return (
        xt(
          N,
          {
            matches: B,
            loaderData: {},
            errors: Ye && ea(Ye[1]) ? { [Ye[0]]: Ye[1].error } : null,
            ...hy(Ye),
            ...(Et ? { fetchers: Fe } : {}),
          },
          { flushSync: Ge },
        ),
        { shortCircuited: !0 }
      );
    }
    if (ft) {
      let Fe = {};
      if (!Te) {
        Fe.navigation = it;
        let Et = Na(Ye);
        Et !== void 0 && (Fe.actionData = Et);
      }
      (lt.length > 0 && (Fe.fetchers = ka(lt)), St(Fe, { flushSync: Ge }));
    }
    lt.forEach((Fe) => {
      (de(Fe.key), Fe.controller && ge.set(Fe.key, Fe.controller));
    });
    let gr = () => lt.forEach((Fe) => de(Fe.key));
    fe && fe.signal.addEventListener("abort", gr);
    let { loaderResults: Ea, fetcherResults: Nn } = await vr(Ft, lt, A, N, se);
    if (A.signal.aborted) return { shortCircuited: !0 };
    (fe && fe.signal.removeEventListener("abort", gr), lt.forEach((Fe) => ge.delete(Fe.key)));
    let An = nu(Ea);
    if (An) return (await Fn(A, An.result, !0, { replace: Ue }), { shortCircuited: !0 });
    if (((An = nu(Nn)), An))
      return (q.add(An.key), await Fn(A, An.result, !0, { replace: Ue }), { shortCircuited: !0 });
    let oa = new Map(T.fetchers),
      { loaderData: zl, errors: wa } = fy(T, B, Ea, Ye, lt, Nn, oa);
    je && T.errors && (wa = { ...T.errors, ...wa });
    let Tl = _e(oa),
      Xa = Ve(O, oa),
      Ia = Tl || Xa || lt.length > 0;
    return { matches: B, loaderData: zl, errors: wa, ...(Ia ? { workingFetchers: oa } : {}) };
  }
  function Na(A) {
    if (A && !ea(A[1])) return { [A[0]]: A[1].data };
    if (T.actionData) return Object.keys(T.actionData).length === 0 ? null : T.actionData;
  }
  function ka(A) {
    let N = new Map(T.fetchers);
    return (
      A.forEach((B) => {
        let re = N.get(B.key),
          se = So(void 0, re ? re.data : void 0);
        N.set(B.key, se);
      }),
      N
    );
  }
  async function ln(A, N, B, re) {
    de(A);
    let se = (re && re.flushSync) === !0,
      Te = h.activeRoutes,
      Se = $d(T.location, T.matches, p, B, N, re?.relative),
      we = Aa(Te, Se, p, !1, h.branches),
      Ee = qn(we, Te, Se);
    if ((Ee.active && Ee.matches && (we = Ee.matches), !we)) {
      x(A, N, ga(404, { pathname: Se }), { flushSync: se });
      return;
    }
    let { path: Ue, submission: je, error: Ge } = ay(!0, Se, re);
    if (Ge) {
      x(A, N, Ge, { flushSync: se });
      return;
    }
    let Ye = e.getContext ? await e.getContext() : new Kg(),
      Ke = (re && re.preventScrollReset) === !0;
    if (je && xn(je.formMethod)) {
      await Yn(A, N, Ue, we, Ye, Ee.active, se, Ke, je, re && re.defaultShouldRevalidate);
      return;
    }
    (J.set(A, { routeId: N, path: Ue }), await Xt(A, N, Ue, we, Ye, Ee.active, se, Ke, je));
  }
  async function Yn(A, N, B, re, se, Te, Se, we, Ee, Ue) {
    (ia(), J.delete(A));
    let je = T.fetchers.get(A);
    fn(A, cx(Ee, je), { flushSync: Se });
    let Ge = new AbortController(),
      Ye = vi(e.history, B, Ge.signal, Ee);
    if (Te) {
      let ht = await vt(re, new URL(Ye.url).pathname, Ye.signal, A);
      if (ht.type === "aborted") return;
      if (ht.type === "error") {
        x(A, N, ht.error, { flushSync: Se });
        return;
      } else if (ht.matches) re = ht.matches;
      else {
        x(A, N, ga(404, { pathname: B }), { flushSync: Se });
        return;
      }
    }
    let Ke = wu(re, B);
    if (!Ke.route.action && !Ke.route.lazy) {
      let ht = ga(405, { method: Ee.formMethod, pathname: B, routeId: N });
      x(A, N, ht, { flushSync: Se });
      return;
    }
    ge.set(A, Ge);
    let it = Q,
      zt = bi(u, c, Ye, B, re, Ke, i, se),
      ft = await Tn(Ye, B, zt, se, A),
      rt = ft[Ke.route.id];
    if (!rt) {
      for (let ht of zt)
        if (ft[ht.route.id]) {
          rt = ft[ht.route.id];
          break;
        }
    }
    if (Ye.signal.aborted) {
      ge.get(A) === Ge && ge.delete(A);
      return;
    }
    if (ve.has(A)) {
      if (yl(rt) || ea(rt)) {
        fn(A, Ya(void 0));
        return;
      }
    } else {
      if (yl(rt))
        if ((ge.delete(A), O > it)) {
          fn(A, Ya(void 0));
          return;
        } else
          return (
            q.add(A),
            fn(A, So(Ee)),
            Fn(Ye, rt, !1, { fetcherSubmission: Ee, preventScrollReset: we })
          );
      if (ea(rt)) {
        x(A, N, rt.error);
        return;
      }
    }
    let Ft = T.navigation.location || T.location,
      lt = vi(e.history, Ft, Ge.signal),
      gr = h.activeRoutes,
      Ea =
        T.navigation.state !== "idle"
          ? Aa(gr, T.navigation.location, p, !1, h.branches)
          : T.matches;
    Ie(Ea, "Didn't find any matches after fetcher action");
    let Nn = ++Q;
    I.set(A, Nn);
    let { dsMatches: An, revalidatingFetchers: oa } = ry(
        lt,
        se,
        u,
        c,
        e.history,
        T,
        Ea,
        Ee,
        Ft,
        i,
        !1,
        X,
        pe,
        ve,
        J,
        q,
        gr,
        p,
        e.patchRoutesOnNavigation != null,
        h.branches,
        [Ke.route.id, rt],
        Ue,
      ),
      zl = So(Ee, rt.data),
      wa = new Map(T.fetchers);
    (wa.set(A, zl),
      oa
        .filter((ht) => ht.key !== A)
        .forEach((ht) => {
          let Qa = ht.key,
            On = wa.get(Qa),
            Oi = So(void 0, On ? On.data : void 0);
          (wa.set(Qa, Oi), de(Qa), ht.controller && ge.set(Qa, ht.controller));
        }),
      St({ fetchers: wa }));
    let Tl = () => oa.forEach((ht) => de(ht.key));
    Ge.signal.addEventListener("abort", Tl);
    let { loaderResults: Xa, fetcherResults: Ia } = await vr(An, oa, lt, Ft, se);
    if (Ge.signal.aborted) return;
    (Ge.signal.removeEventListener("abort", Tl),
      I.delete(A),
      ge.delete(A),
      oa.forEach((ht) => ge.delete(ht.key)));
    let Fe = T.fetchers.has(A),
      Et = (ht) => {
        if (!Fe) return ht;
        let Qa = new Map(ht.fetchers);
        return (Qa.set(A, Ya(rt.data)), { ...ht, fetchers: Qa });
      },
      Gn = nu(Xa);
    if (Gn) return ((T = Et(T)), Fn(lt, Gn.result, !1, { preventScrollReset: we }));
    if (((Gn = nu(Ia)), Gn))
      return (q.add(Gn.key), (T = Et(T)), Fn(lt, Gn.result, !1, { preventScrollReset: we }));
    let xa = new Map(T.fetchers);
    Fe && xa.set(A, Ya(rt.data));
    let { loaderData: Al, errors: Ol } = fy(T, Ea, Xa, void 0, oa, Ia, xa);
    (Ve(Nn, xa),
      T.navigation.state === "loading" && Nn > O
        ? (Ie(me, "Expected pending action"),
          fe && fe.abort(),
          xt(T.navigation.location, { matches: Ea, loaderData: Al, errors: Ol, fetchers: xa }))
        : (St({ errors: Ol, loaderData: dy(T.loaderData, Al, Ea, Ol), fetchers: xa }), (X = !1)));
  }
  async function Xt(A, N, B, re, se, Te, Se, we, Ee) {
    let Ue = T.fetchers.get(A);
    fn(A, So(Ee, Ue ? Ue.data : void 0), { flushSync: Se });
    let je = new AbortController(),
      Ge = vi(e.history, B, je.signal);
    if (Te) {
      let rt = await vt(re, new URL(Ge.url).pathname, Ge.signal, A);
      if (rt.type === "aborted") return;
      if (rt.type === "error") {
        x(A, N, rt.error, { flushSync: Se });
        return;
      } else if (rt.matches) re = rt.matches;
      else {
        x(A, N, ga(404, { pathname: B }), { flushSync: Se });
        return;
      }
    }
    let Ye = wu(re, B);
    ge.set(A, je);
    let Ke = Q,
      it = bi(u, c, Ge, B, re, Ye, i, se),
      zt = await Tn(Ge, B, it, se, A),
      ft = zt[Ye.route.id];
    if (!ft) {
      for (let rt of re)
        if (zt[rt.route.id]) {
          ft = zt[rt.route.id];
          break;
        }
    }
    if ((ge.get(A) === je && ge.delete(A), !Ge.signal.aborted)) {
      if (ve.has(A)) {
        fn(A, Ya(void 0));
        return;
      }
      if (yl(ft))
        if (O > Ke) {
          fn(A, Ya(void 0));
          return;
        } else {
          (q.add(A), await Fn(Ge, ft, !1, { preventScrollReset: we }));
          return;
        }
      if (ea(ft)) {
        x(A, N, ft.error);
        return;
      }
      fn(A, Ya(ft.data));
    }
  }
  async function Fn(
    A,
    N,
    B,
    { submission: re, fetcherSubmission: se, preventScrollReset: Te, replace: Se } = {},
  ) {
    (B || (Oe?.resolve(), (Oe = null)), N.response.headers.has("X-Remix-Revalidate") && (X = !0));
    let we = N.response.headers.get("Location");
    (Ie(we, "Expected a Location header on the redirect Response"),
      (we = uy(we, new URL(A.url), p, e.history)));
    let Ee = Do(T.location, we, { _isRedirect: !0 });
    if (r) {
      let it = !1;
      if (N.response.headers.has("X-Remix-Reload-Document")) it = !0;
      else if (vh(we)) {
        const zt = l0(a, we, !0);
        it = zt.origin !== a.location.origin || aa(zt.pathname, p) == null;
      }
      if (it) {
        Se ? a.location.replace(we) : a.location.assign(we);
        return;
      }
    }
    fe = null;
    let Ue = Se === !0 || N.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH",
      { formMethod: je, formAction: Ge, formEncType: Ye } = T.navigation;
    !re && !se && je && Ge && Ye && (re = py(T.navigation));
    let Ke = re || se;
    if (jw.has(N.response.status) && Ke && xn(Ke.formMethod))
      await cn(Ue, Ee, {
        submission: { ...Ke, formAction: we },
        preventScrollReset: Te || Be,
        enableViewTransition: B ? be : void 0,
      });
    else {
      let it = xd(Ee, [], Ue, re);
      await cn(Ue, Ee, {
        overrideNavigation: it,
        fetcherSubmission: se,
        preventScrollReset: Te || Be,
        enableViewTransition: B ? be : void 0,
      });
    }
  }
  async function Tn(A, N, B, re, se) {
    let Te,
      Se = {};
    try {
      Te = await Xw(m, A, N, B, se, re, !1);
    } catch (we) {
      return (
        B.filter((Ee) => Ee.shouldLoad).forEach((Ee) => {
          Se[Ee.route.id] = { type: "error", error: we };
        }),
        Se
      );
    }
    if (A.signal.aborted) return Se;
    if (!xn(A.method))
      for (let we of B) {
        if (Te[we.route.id]?.type === "error") break;
        !Te.hasOwnProperty(we.route.id) &&
          !T.loaderData.hasOwnProperty(we.route.id) &&
          (!T.errors || !T.errors.hasOwnProperty(we.route.id)) &&
          we.shouldCallHandler() &&
          (Te[we.route.id] = {
            type: "error",
            result: new Error(`No result returned from dataStrategy for route ${we.route.id}`),
          });
      }
    for (let [we, Ee] of Object.entries(Te))
      if (lx(Ee)) {
        let Ue = Ee.result;
        Se[we] = { type: "redirect", response: Jw(Ue, A, we, B, p) };
      } else Se[we] = await Kw(Ee);
    return Se;
  }
  async function vr(A, N, B, re, se) {
    let Te = Tn(B, re, A, se, null),
      Se = Promise.all(
        N.map(async (Ue) => {
          if (Ue.matches && Ue.match && Ue.request && Ue.controller) {
            let Ge = (await Tn(Ue.request, Ue.path, Ue.matches, se, Ue.key))[Ue.match.route.id];
            return { [Ue.key]: Ge };
          } else
            return Promise.resolve({
              [Ue.key]: { type: "error", error: ga(404, { pathname: Ue.path }) },
            });
        }),
      ),
      we = await Te,
      Ee = (await Se).reduce((Ue, je) => Object.assign(Ue, je), {});
    return { loaderResults: we, fetcherResults: Ee };
  }
  function ia() {
    ((X = !0),
      J.forEach((A, N) => {
        (ge.has(N) && pe.add(N), de(N));
      }));
  }
  function fn(A, N, B = {}) {
    let re = new Map(T.fetchers);
    (re.set(A, N), St({ fetchers: re }, { flushSync: (B && B.flushSync) === !0 }));
  }
  function x(A, N, B, re = {}) {
    let se = Pr(T.matches, N),
      Te = new Map(T.fetchers);
    (le(Te, A),
      St(
        { errors: { [se.route.id]: B }, fetchers: Te },
        { flushSync: (re && re.flushSync) === !0 },
      ));
  }
  function L(A) {
    return (ie.set(A, (ie.get(A) || 0) + 1), ve.has(A) && ve.delete(A), T.fetchers.get(A) || Vw);
  }
  function V(A, N) {
    (de(A, N?.reason), fn(A, Ya(null)));
  }
  function le(A, N) {
    let B = T.fetchers.get(N);
    (ge.has(N) && !(B && B.state === "loading" && I.has(N)) && de(N),
      J.delete(N),
      I.delete(N),
      q.delete(N),
      ve.delete(N),
      pe.delete(N),
      A.delete(N));
  }
  function oe(A) {
    let N = (ie.get(A) || 0) - 1;
    (N <= 0 ? (ie.delete(A), ve.add(A)) : ie.set(A, N), St({ fetchers: new Map(T.fetchers) }));
  }
  function de(A, N) {
    let B = ge.get(A);
    B && (B.abort(N), ge.delete(A));
  }
  function ue(A, N) {
    for (let B of A) {
      let re = N.get(B);
      Ie(re, `Expected fetcher: ${B}`);
      let se = Ya(re.data);
      N.set(B, se);
    }
  }
  function _e(A) {
    let N = [],
      B = !1;
    for (let re of q) {
      let se = A.get(re);
      (Ie(se, `Expected fetcher: ${re}`),
        se.state === "loading" && (q.delete(re), N.push(re), (B = !0)));
    }
    return (ue(N, A), B);
  }
  function Ve(A, N) {
    let B = [];
    for (let [re, se] of I)
      if (se < A) {
        let Te = N.get(re);
        (Ie(Te, `Expected fetcher: ${re}`),
          Te.state === "loading" && (de(re), I.delete(re), B.push(re)));
      }
    return (ue(B, N), B.length > 0);
  }
  function Je(A, N) {
    let B = T.blockers.get(A) || _o;
    return (Me.get(A) !== N && Me.set(A, N), B);
  }
  function Nt(A) {
    (T.blockers.delete(A), Me.delete(A));
  }
  function dn(A, N) {
    let B = T.blockers.get(A) || _o;
    Ie(
      (B.state === "unblocked" && N.state === "blocked") ||
        (B.state === "blocked" && N.state === "blocked") ||
        (B.state === "blocked" && N.state === "proceeding") ||
        (B.state === "blocked" && N.state === "unblocked") ||
        (B.state === "proceeding" && N.state === "unblocked"),
      `Invalid blocker state transition: ${B.state} -> ${N.state}`,
    );
    let re = new Map(T.blockers);
    (re.set(A, N), St({ blockers: re }));
  }
  function It({ currentLocation: A, nextLocation: N, historyAction: B }) {
    if (Me.size === 0) return;
    Me.size > 1 && Dt(!1, "A router only supports one blocker at a time");
    let re = Array.from(Me.entries()),
      [se, Te] = re[re.length - 1],
      Se = T.blockers.get(se);
    if (
      !(Se && Se.state === "proceeding") &&
      Te({ currentLocation: A, nextLocation: N, historyAction: B })
    )
      return se;
  }
  function Qt(A) {
    let N = ga(404, { pathname: A }),
      B = h.activeRoutes,
      { matches: re, route: se } = tu(B);
    return { notFoundMatches: re, route: se, error: N };
  }
  function $e(A, N, B) {
    if (((w = A), (R = N), (z = B || null), !j && T.navigation === wd)) {
      j = !0;
      let re = Vt(T.location, T.matches);
      re != null && St({ restoreScrollPosition: re });
    }
    return () => {
      ((w = null), (R = null), (z = null));
    };
  }
  function ct(A, N) {
    return (
      (z &&
        z(
          A,
          N.map((re) => o0(re, T.loaderData)),
        )) ||
      A.key
    );
  }
  function jt(A, N) {
    if (w && R) {
      let B = ct(A, N);
      w[B] = R();
    }
  }
  function Vt(A, N) {
    if (w) {
      let B = ct(A, N),
        re = w[B];
      if (typeof re == "number") return re;
    }
    return null;
  }
  function qn(A, N, B) {
    if (e.patchRoutesOnNavigation) {
      let re = h.branches;
      if (A) {
        if (Object.keys(A[0].params).length > 0)
          return { active: !0, matches: Aa(N, B, p, !0, re) };
      } else return { active: !0, matches: Aa(N, B, p, !0, re) || [] };
    }
    return { active: !1, matches: null };
  }
  async function vt(A, N, B, re) {
    if (!e.patchRoutesOnNavigation) return { type: "success", matches: A };
    let se = A;
    for (;;) {
      let Te = c;
      try {
        await e.patchRoutesOnNavigation({
          signal: B,
          path: N,
          matches: se,
          fetcherKey: re,
          patch: (Ue, je) => {
            B.aborted || ly(Ue, je, h, Te, u, !1);
          },
        });
      } catch (Ue) {
        return { type: "error", error: Ue, partialMatches: se };
      }
      if (B.aborted) return { type: "aborted" };
      let Se = h.branches,
        we = Aa(h.activeRoutes, N, p, !1, Se),
        Ee = null;
      if (we) {
        if (Object.keys(we[0].params).length === 0) return { type: "success", matches: we };
        if (
          ((Ee = Aa(h.activeRoutes, N, p, !0, Se)),
          !(Ee && se.length < Ee.length && mn(se, Ee.slice(0, se.length))))
        )
          return { type: "success", matches: we };
      }
      if ((Ee || (Ee = Aa(h.activeRoutes, N, p, !0, Se)), !Ee || mn(se, Ee)))
        return { type: "success", matches: null };
      se = Ee;
    }
  }
  function mn(A, N) {
    return A.length === N.length && A.every((B, re) => B.route.id === N[re].route.id);
  }
  function Pa(A) {
    ((c = {}), h.setHmrRoutes(Mo(A, u, void 0, c)));
  }
  function En(A, N, B = !1) {
    (ly(A, N, h, c, u, B), h.hasHMRRoutes || St({}));
  }
  return (
    (ce = {
      get basename() {
        return p;
      },
      get future() {
        return y;
      },
      get state() {
        return T;
      },
      get routes() {
        return h.stableRoutes;
      },
      get branches() {
        return h.branches;
      },
      get manifest() {
        return c;
      },
      get window() {
        return a;
      },
      initialize: un,
      subscribe: Ut,
      enableScrollRestoration: $e,
      navigate: Ma,
      fetch: ln,
      revalidate: la,
      createHref: (A) => e.history.createHref(A),
      encodeLocation: (A) => e.history.encodeLocation(A),
      getFetcher: L,
      resetFetcher: V,
      deleteFetcher: oe,
      dispose: an,
      getBlocker: Je,
      deleteBlocker: Nt,
      patchRoutes: En,
      _internalFetchControllers: ge,
      _internalSetRoutes: Pa,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(A) {
        St(A);
      },
    }),
    e.instrumentations && (ce = Ow(ce, e.instrumentations.map((A) => A.router).filter(Boolean))),
    ce
  );
}
function $w(e) {
  return (
    e != null && (("formData" in e && e.formData != null) || ("body" in e && e.body !== void 0))
  );
}
function $d(e, a, r, i, s, u) {
  let c, h;
  if (s) {
    c = [];
    for (let m of a)
      if ((c.push(m), m.route.id === s)) {
        h = m;
        break;
      }
  } else ((c = a), (h = a[a.length - 1]));
  let p = jo(i || ".", Fu(c), aa(e.pathname, r) || e.pathname, u === "path");
  if (
    (i == null && ((p.search = e.search), (p.hash = e.hash)),
    (i == null || i === "" || i === ".") && h)
  ) {
    let m = _h(p.search);
    if (h.route.index && !m) p.search = p.search ? p.search.replace(/^\?/, "?index&") : "?index";
    else if (!h.route.index && m) {
      let y = new URLSearchParams(p.search),
        v = y.getAll("index");
      (y.delete("index"), v.filter((E) => E).forEach((E) => y.append("index", E)));
      let S = y.toString();
      p.search = S ? `?${S}` : "";
    }
  }
  return (r !== "/" && (p.pathname = Ew({ basename: r, pathname: p.pathname })), qa(p));
}
function ay(e, a, r) {
  if (!r || !$w(r)) return { path: a };
  if (r.formMethod && !sx(r.formMethod))
    return { path: a, error: ga(405, { method: r.formMethod }) };
  let i = () => ({ path: a, error: ga(400, { type: "invalid-body" }) }),
    u = (r.formMethod || "get").toUpperCase(),
    c = T0(a);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!xn(u)) return i();
      let v =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
            ? Array.from(r.body.entries()).reduce(
                (S, [E, w]) => `${S}${E}=${w}
`,
                "",
              )
            : String(r.body);
      return {
        path: a,
        submission: {
          formMethod: u,
          formAction: c,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: v,
        },
      };
    } else if (r.formEncType === "application/json") {
      if (!xn(u)) return i();
      try {
        let v = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: a,
          submission: {
            formMethod: u,
            formAction: c,
            formEncType: r.formEncType,
            formData: void 0,
            json: v,
            text: void 0,
          },
        };
      } catch {
        return i();
      }
    }
  }
  Ie(typeof FormData == "function", "FormData is not available in this environment");
  let h, p;
  if (r.formData) ((h = qd(r.formData)), (p = r.formData));
  else if (r.body instanceof FormData) ((h = qd(r.body)), (p = r.body));
  else if (r.body instanceof URLSearchParams) ((h = r.body), (p = cy(h)));
  else if (r.body == null) ((h = new URLSearchParams()), (p = new FormData()));
  else
    try {
      ((h = new URLSearchParams(r.body)), (p = cy(h)));
    } catch {
      return i();
    }
  let m = {
    formMethod: u,
    formAction: c,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0,
  };
  if (xn(m.formMethod)) return { path: a, submission: m };
  let y = Ga(a);
  return (
    e && y.search && _h(y.search) && h.append("index", ""),
    (y.search = `?${h}`),
    { path: qa(y), submission: m }
  );
}
function ry(e, a, r, i, s, u, c, h, p, m, y, v, S, E, w, z, R, j, k, F, $, G) {
  let he = $ ? (ea($[1]) ? $[1].error : $[1].data) : void 0,
    ce = s.createURL(u.location),
    T = s.createURL(p),
    me;
  if (y && u.errors) {
    let D = Object.keys(u.errors)[0];
    me = c.findIndex((X) => X.route.id === D);
  } else if ($ && ea($[1])) {
    let D = $[0];
    me = c.findIndex((X) => X.route.id === D) - 1;
  }
  let Oe = $ ? $[1].statusCode : void 0,
    Be = Oe && Oe >= 400,
    fe = {
      currentUrl: ce,
      currentParams: u.matches[0]?.params || {},
      nextUrl: T,
      nextParams: c[0].params,
      ...h,
      actionResult: he,
      actionStatus: Oe,
    },
    be = Bo(c),
    ze = c.map((D, X) => {
      let { route: pe } = D,
        ge = null;
      if (me != null && X > me) ge = !1;
      else if (pe.lazy) ge = !0;
      else if (!yh(pe)) ge = !1;
      else if (y) {
        let { shouldLoad: q } = _0(pe, u.loaderData, u.errors);
        ge = q;
      } else Yw(u.loaderData, u.matches[X], D) && (ge = !0);
      if (ge !== null) return Yd(r, i, e, p, be, D, m, a, ge);
      let Q = !1;
      typeof G == "boolean"
        ? (Q = G)
        : Be
          ? (Q = !1)
          : (v ||
              ce.pathname + ce.search === T.pathname + T.search ||
              ce.search !== T.search ||
              Fw(u.matches[X], D)) &&
            (Q = !0);
      let O = { ...fe, defaultShouldRevalidate: Q },
        I = Ao(D, O);
      return Yd(r, i, e, p, be, D, m, a, I, O, G);
    }),
    xe = [];
  return (
    w.forEach((D, X) => {
      if (y || !c.some((ie) => ie.route.id === D.routeId) || E.has(X)) return;
      let pe = u.fetchers.get(X),
        ge = pe && pe.state !== "idle" && pe.data === void 0,
        Q = Aa(R, D.path, j ?? "/", !1, F);
      if (!Q) {
        if (k && ge) return;
        xe.push({
          key: X,
          routeId: D.routeId,
          path: D.path,
          matches: null,
          match: null,
          request: null,
          controller: null,
        });
        return;
      }
      if (z.has(X)) return;
      let O = wu(Q, D.path),
        I = new AbortController(),
        q = vi(s, D.path, I.signal),
        J = null;
      if (S.has(X)) (S.delete(X), (J = bi(r, i, q, D.path, Q, O, m, a)));
      else if (ge) v && (J = bi(r, i, q, D.path, Q, O, m, a));
      else {
        let ie;
        typeof G == "boolean" ? (ie = G) : Be ? (ie = !1) : (ie = v);
        let ve = { ...fe, defaultShouldRevalidate: ie };
        Ao(O, ve) && (J = bi(r, i, q, D.path, Q, O, m, a, ve));
      }
      J &&
        xe.push({
          key: X,
          routeId: D.routeId,
          path: D.path,
          matches: J,
          match: O,
          request: q,
          controller: I,
        });
    }),
    { dsMatches: ze, revalidatingFetchers: xe }
  );
}
function yh(e) {
  return e.loader != null || (e.middleware != null && e.middleware.length > 0);
}
function _0(e, a, r) {
  if (e.lazy) return { shouldLoad: !0, renderFallback: !0 };
  if (!yh(e)) return { shouldLoad: !1, renderFallback: !1 };
  let i = a != null && e.id in a,
    s = r != null && r[e.id] !== void 0;
  if (!i && s) return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == "function" && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !i };
  let u = !i && !s;
  return { shouldLoad: u, renderFallback: u };
}
function Yw(e, a, r) {
  let i = !a || r.route.id !== a.route.id,
    s = !e.hasOwnProperty(r.route.id);
  return i || s;
}
function Fw(e, a) {
  let r = e.route.path;
  return (
    e.pathname !== a.pathname || (r != null && r.endsWith("*") && e.params["*"] !== a.params["*"])
  );
}
function Ao(e, a) {
  if (e.route.shouldRevalidate) {
    let r = e.route.shouldRevalidate(a);
    if (typeof r == "boolean") return r;
  }
  return a.defaultShouldRevalidate;
}
function ly(e, a, r, i, s, u) {
  let c;
  if (e) {
    let m = i[e];
    (Ie(m, `No route found to patch children into: routeId = ${e}`),
      m.children || (m.children = []),
      (c = m.children));
  } else c = r.activeRoutes;
  let h = [],
    p = [];
  if (
    (a.forEach((m) => {
      let y = c.find((v) => S0(m, v));
      y ? p.push({ existingRoute: y, newRoute: m }) : h.push(m);
    }),
    h.length > 0)
  ) {
    let m = Mo(h, s, [e || "_", "patch", String(c?.length || "0")], i);
    c.push(...m);
  }
  if (u && p.length > 0)
    for (let m = 0; m < p.length; m++) {
      let { existingRoute: y, newRoute: v } = p[m],
        S = y,
        [E] = Mo([v], s, [], {}, !0);
      Object.assign(S, {
        element: E.element ? E.element : S.element,
        errorElement: E.errorElement ? E.errorElement : S.errorElement,
        hydrateFallbackElement: E.hydrateFallbackElement
          ? E.hydrateFallbackElement
          : S.hydrateFallbackElement,
      });
    }
  r.hasHMRRoutes || r.setRoutes([...r.activeRoutes]);
}
function S0(e, a) {
  return "id" in e && "id" in a && e.id === a.id
    ? !0
    : e.index === a.index && e.path === a.path && e.caseSensitive === a.caseSensitive
      ? (!e.children || e.children.length === 0) && (!a.children || a.children.length === 0)
        ? !0
        : (e.children?.every((r, i) => a.children?.some((s) => S0(r, s))) ?? !1)
      : !1;
}
var iy = new WeakMap(),
  E0 = ({ key: e, route: a, manifest: r, mapRouteProperties: i }) => {
    let s = r[a.id];
    if ((Ie(s, "No route found in manifest"), !s.lazy || typeof s.lazy != "object")) return;
    let u = s.lazy[e];
    if (!u) return;
    let c = iy.get(s);
    c || ((c = {}), iy.set(s, c));
    let h = c[e];
    if (h) return h;
    let p = (async () => {
      let m = ow(e),
        v = s[e] !== void 0 && e !== "hasErrorBoundary";
      if (m)
        (Dt(
          !m,
          "Route property " +
            e +
            " is not a supported lazy route property. This property will be ignored.",
        ),
          (c[e] = Promise.resolve()));
      else if (v)
        Dt(
          !1,
          `Route "${s.id}" has a static property "${e}" defined. The lazy property will be ignored.`,
        );
      else {
        let S = await u();
        S != null && (Object.assign(s, { [e]: S }), Object.assign(s, i(s)));
      }
      typeof s.lazy == "object" &&
        ((s.lazy[e] = void 0),
        Object.values(s.lazy).every((S) => S === void 0) && (s.lazy = void 0));
    })();
    return ((c[e] = p), p);
  },
  oy = new WeakMap();
function qw(e, a, r, i, s) {
  let u = r[e.id];
  if ((Ie(u, "No route found in manifest"), !e.lazy))
    return { lazyRoutePromise: void 0, lazyHandlerPromise: void 0 };
  if (typeof e.lazy == "function") {
    let y = oy.get(u);
    if (y) return { lazyRoutePromise: y, lazyHandlerPromise: y };
    let v = (async () => {
      Ie(typeof e.lazy == "function", "No lazy route function found");
      let S = await e.lazy(),
        E = {};
      for (let w in S) {
        let z = S[w];
        if (z === void 0) continue;
        let R = uw(w),
          k = u[w] !== void 0 && w !== "hasErrorBoundary";
        R
          ? Dt(
              !R,
              "Route property " +
                w +
                " is not a supported property to be returned from a lazy route function. This property will be ignored.",
            )
          : k
            ? Dt(
                !k,
                `Route "${u.id}" has a static property "${w}" defined but its lazy function is also returning a value for this property. The lazy route property "${w}" will be ignored.`,
              )
            : (E[w] = z);
      }
      (Object.assign(u, E), Object.assign(u, { ...i(u), lazy: void 0 }));
    })();
    return (oy.set(u, v), v.catch(() => {}), { lazyRoutePromise: v, lazyHandlerPromise: v });
  }
  let c = Object.keys(e.lazy),
    h = [],
    p;
  for (let y of c) {
    if (s && s.includes(y)) continue;
    let v = E0({ key: y, route: e, manifest: r, mapRouteProperties: i });
    v && (h.push(v), y === a && (p = v));
  }
  let m = h.length > 0 ? Promise.all(h).then(() => {}) : void 0;
  return (m?.catch(() => {}), p?.catch(() => {}), { lazyRoutePromise: m, lazyHandlerPromise: p });
}
async function sy(e) {
  let a = e.matches.filter((s) => s.shouldLoad),
    r = {};
  return (
    (await Promise.all(a.map((s) => s.resolve()))).forEach((s, u) => {
      r[a[u].route.id] = s;
    }),
    r
  );
}
async function Gw(e) {
  return e.matches.some((a) => a.route.middleware) ? w0(e, () => sy(e)) : sy(e);
}
function w0(e, a) {
  return Pw(
    e,
    a,
    (i) => {
      if (ox(i)) throw i;
      return i;
    },
    ax,
    r,
  );
  function r(i, s, u) {
    if (u) return Promise.resolve(Object.assign(u.value, { [s]: { type: "error", result: i } }));
    {
      let { matches: c } = e,
        h = Math.min(
          Math.max(
            c.findIndex((m) => m.route.id === s),
            0,
          ),
          Math.max(
            c.findIndex((m) => m.shouldCallHandler()),
            0,
          ),
        ),
        p = Pr(c, c[h].route.id).route.id;
      return Promise.resolve({ [p]: { type: "error", result: i } });
    }
  }
}
async function Pw(e, a, r, i, s) {
  let { matches: u, ...c } = e,
    h = u.flatMap((m) =>
      m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : [],
    );
  return await x0(c, h, a, r, i, s);
}
async function x0(e, a, r, i, s, u, c = 0) {
  let { request: h } = e;
  if (h.signal.aborted) throw h.signal.reason ?? new Error(`Request aborted: ${h.method} ${h.url}`);
  let p = a[c];
  if (!p) return await r();
  let [m, y] = p,
    v,
    S = async () => {
      if (v) throw new Error("You may only call `next()` once per middleware");
      try {
        return ((v = { value: await x0(e, a, r, i, s, u, c + 1) }), v.value);
      } catch (E) {
        return ((v = { value: await u(E, m, v) }), v.value);
      }
    };
  try {
    let E = await y(e, S),
      w = E != null ? i(E) : void 0;
    return s(w) ? w : v ? (w ?? v.value) : ((v = { value: await S() }), v.value);
  } catch (E) {
    return await u(E, m, v);
  }
}
function R0(e, a, r, i, s) {
  let u = E0({ key: "middleware", route: i.route, manifest: a, mapRouteProperties: e }),
    c = qw(i.route, xn(r.method) ? "action" : "loader", a, e, s);
  return { middleware: u, route: c.lazyRoutePromise, handler: c.lazyHandlerPromise };
}
function Yd(e, a, r, i, s, u, c, h, p, m = null, y) {
  let v = !1,
    S = R0(e, a, r, u, c);
  return {
    ...u,
    _lazyPromises: S,
    shouldLoad: p,
    shouldRevalidateArgs: m,
    shouldCallHandler(E) {
      return (
        (v = !0),
        m
          ? typeof y == "boolean"
            ? Ao(u, { ...m, defaultShouldRevalidate: y })
            : typeof E == "boolean"
              ? Ao(u, { ...m, defaultShouldRevalidate: E })
              : Ao(u, m)
          : p
      );
    },
    resolve(E) {
      let { lazy: w, loader: z, middleware: R } = u.route,
        j = v || p || (E && !xn(r.method) && (w || z)),
        k = R && R.length > 0 && !z && !w;
      return j && (xn(r.method) || !k)
        ? Iw({
            request: r,
            path: i,
            pattern: s,
            match: u,
            lazyHandlerPromise: S?.handler,
            lazyRoutePromise: S?.route,
            handlerOverride: E,
            scopedContext: h,
          })
        : Promise.resolve({ type: "data", result: void 0 });
    },
  };
}
function bi(e, a, r, i, s, u, c, h, p = null) {
  return s.map((m) =>
    m.route.id !== u.route.id
      ? {
          ...m,
          shouldLoad: !1,
          shouldRevalidateArgs: p,
          shouldCallHandler: () => !1,
          _lazyPromises: R0(e, a, r, m, c),
          resolve: () => Promise.resolve({ type: "data", result: void 0 }),
        }
      : Yd(e, a, r, i, Bo(s), m, c, h, !0, p),
  );
}
async function Xw(e, a, r, i, s, u, c) {
  i.some((y) => y._lazyPromises?.middleware) &&
    (await Promise.all(i.map((y) => y._lazyPromises?.middleware)));
  let h = {
      request: a,
      url: z0(a, r),
      pattern: Bo(i),
      params: i[0].params,
      context: u,
      matches: i,
    },
    m = await e({
      ...h,
      fetcherKey: s,
      runClientMiddleware: (y) => {
        let v = h;
        return w0(v, () =>
          y({
            ...v,
            fetcherKey: s,
            runClientMiddleware: () => {
              throw new Error(
                "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler",
              );
            },
          }),
        );
      },
    });
  try {
    await Promise.all(i.flatMap((y) => [y._lazyPromises?.handler, y._lazyPromises?.route]));
  } catch {}
  return m;
}
async function Iw({
  request: e,
  path: a,
  pattern: r,
  match: i,
  lazyHandlerPromise: s,
  lazyRoutePromise: u,
  handlerOverride: c,
  scopedContext: h,
}) {
  let p,
    m,
    y = xn(e.method),
    v = y ? "action" : "loader",
    S = (E) => {
      let w,
        z = new Promise((k, F) => (w = F));
      ((m = () => w()), e.signal.addEventListener("abort", m));
      let R = (k) =>
          typeof E != "function"
            ? Promise.reject(
                new Error(
                  `You cannot call the handler for a route which defines a boolean "${v}" [routeId: ${i.route.id}]`,
                ),
              )
            : E(
                { request: e, url: z0(e, a), pattern: r, params: i.params, context: h },
                ...(k !== void 0 ? [k] : []),
              ),
        j = (async () => {
          try {
            return { type: "data", result: await (c ? c((F) => R(F)) : R()) };
          } catch (k) {
            return { type: "error", result: k };
          }
        })();
      return Promise.race([j, z]);
    };
  try {
    let E = y ? i.route.action : i.route.loader;
    if (s || u)
      if (E) {
        let w,
          [z] = await Promise.all([
            S(E).catch((R) => {
              w = R;
            }),
            s,
            u,
          ]);
        if (w !== void 0) throw w;
        p = z;
      } else {
        await s;
        let w = y ? i.route.action : i.route.loader;
        if (w) [p] = await Promise.all([S(w), u]);
        else if (v === "action") {
          let z = new URL(e.url),
            R = z.pathname + z.search;
          throw ga(405, { method: e.method, pathname: R, routeId: i.route.id });
        } else return { type: "data", result: void 0 };
      }
    else if (E) p = await S(E);
    else {
      let w = new URL(e.url),
        z = w.pathname + w.search;
      throw ga(404, { pathname: z });
    }
  } catch (E) {
    return { type: "error", result: E };
  } finally {
    m && e.signal.removeEventListener("abort", m);
  }
  return p;
}
async function Qw(e) {
  let a = e.headers.get("Content-Type");
  return a && /\bapplication\/json\b/.test(a) ? (e.body == null ? null : e.json()) : e.text();
}
async function Kw(e) {
  let { result: a, type: r } = e;
  if (bh(a)) {
    let i;
    try {
      i = await Qw(a);
    } catch (s) {
      return { type: "error", error: s };
    }
    return r === "error"
      ? {
          type: "error",
          error: new Vo(a.status, a.statusText, i),
          statusCode: a.status,
          headers: a.headers,
        }
      : { type: "data", data: i, statusCode: a.status, headers: a.headers };
  }
  return r === "error"
    ? my(a)
      ? a.data instanceof Error
        ? {
            type: "error",
            error: a.data,
            statusCode: a.init?.status,
            headers: a.init?.headers ? new Headers(a.init.headers) : void 0,
          }
        : {
            type: "error",
            error: nx(a),
            statusCode: Ei(a) ? a.status : void 0,
            headers: a.init?.headers ? new Headers(a.init.headers) : void 0,
          }
      : { type: "error", error: a, statusCode: Ei(a) ? a.status : void 0 }
    : my(a)
      ? {
          type: "data",
          data: a.data,
          statusCode: a.init?.status,
          headers: a.init?.headers ? new Headers(a.init.headers) : void 0,
        }
      : { type: "data", data: a };
}
function Jw(e, a, r, i, s) {
  let u = e.headers.get("Location");
  if (
    (Ie(u, "Redirects returned/thrown from loaders/actions must have a Location header"), !vh(u))
  ) {
    let c = i.slice(0, i.findIndex((h) => h.route.id === r) + 1);
    ((u = $d(new URL(a.url), c, s, u)), e.headers.set("Location", u));
  }
  return e;
}
var Ww = [
  "about:",
  "blob:",
  "chrome:",
  "chrome-untrusted:",
  "content:",
  "data:",
  "devtools:",
  "file:",
  "filesystem:",
  "javascript:",
];
function Fd(e) {
  try {
    return Ww.includes(new URL(e).protocol);
  } catch {
    return !1;
  }
}
function uy(e, a, r, i) {
  if (vh(e)) {
    let s = e,
      u = ph.test(s) ? new URL(r0(s, a.protocol)) : new URL(s);
    if (Fd(u.toString())) throw new Error("Invalid redirect location");
    let c = aa(u.pathname, r) != null;
    if (u.origin === a.origin && c) return gh(u.pathname) + u.search + u.hash;
  }
  try {
    let s = i.createURL(e);
    if (Fd(s.toString())) throw new Error("Invalid redirect location");
  } catch {}
  return e;
}
function vi(e, a, r, i) {
  let s = e.createURL(T0(a)).toString(),
    u = { signal: r };
  if (i && xn(i.formMethod)) {
    let { formMethod: c, formEncType: h } = i;
    ((u.method = c.toUpperCase()),
      h === "application/json"
        ? ((u.headers = new Headers({ "Content-Type": h })), (u.body = JSON.stringify(i.json)))
        : h === "text/plain"
          ? (u.body = i.text)
          : h === "application/x-www-form-urlencoded" && i.formData
            ? (u.body = qd(i.formData))
            : (u.body = i.formData));
  }
  return new Request(s, u);
}
function z0(e, a) {
  let r = new URL(e.url),
    i = typeof a == "string" ? Ga(a) : a;
  if (((r.pathname = i.pathname || "/"), i.search)) {
    let s = new URLSearchParams(i.search),
      u = s.getAll("index");
    s.delete("index");
    for (let c of u.filter(Boolean)) s.append("index", c);
    r.search = s.size ? `?${s.toString()}` : "";
  } else r.search = "";
  return ((r.hash = i.hash || ""), r);
}
function qd(e) {
  let a = new URLSearchParams();
  for (let [r, i] of e.entries()) a.append(r, typeof i == "string" ? i : i.name);
  return a;
}
function cy(e) {
  let a = new FormData();
  for (let [r, i] of e.entries()) a.append(r, i);
  return a;
}
function ex(e, a, r, i = !1, s = !1) {
  let u = {},
    c = null,
    h,
    p = !1,
    m = {},
    y = r && ea(r[1]) ? r[1].error : void 0;
  return (
    e.forEach((v) => {
      if (!(v.route.id in a)) return;
      let S = v.route.id,
        E = a[S];
      if ((Ie(!yl(E), "Cannot handle redirect results in processLoaderData"), ea(E))) {
        let w = E.error;
        if ((y !== void 0 && ((w = y), (y = void 0)), (c = c || {}), s)) c[S] = w;
        else {
          let z = Pr(e, S);
          c[z.route.id] == null && (c[z.route.id] = w);
        }
        (i || (u[S] = b0),
          p || ((p = !0), (h = Ei(E.error) ? E.error.status : 500)),
          E.headers && (m[S] = E.headers));
      } else
        ((u[S] = E.data),
          E.statusCode && E.statusCode !== 200 && !p && (h = E.statusCode),
          E.headers && (m[S] = E.headers));
    }),
    y !== void 0 && r && ((c = { [r[0]]: y }), r[2] && (u[r[2]] = void 0)),
    { loaderData: u, errors: c, statusCode: h || 200, loaderHeaders: m }
  );
}
function fy(e, a, r, i, s, u, c) {
  let { loaderData: h, errors: p } = ex(a, r, i);
  return (
    s
      .filter((m) => !m.matches || m.matches.some((y) => y.shouldLoad))
      .forEach((m) => {
        let { key: y, match: v, controller: S } = m;
        if (S && S.signal.aborted) return;
        let E = u[y];
        if ((Ie(E, "Did not find corresponding fetcher result"), ea(E))) {
          let w = Pr(e.matches, v?.route.id);
          ((p && p[w.route.id]) || (p = { ...p, [w.route.id]: E.error }), c.delete(y));
        } else if (yl(E)) Ie(!1, "Unhandled fetcher revalidation redirect");
        else {
          let w = Ya(E.data);
          c.set(y, w);
        }
      }),
    { loaderData: h, errors: p }
  );
}
function dy(e, a, r, i) {
  let s = Object.entries(a)
    .filter(([, u]) => u !== b0)
    .reduce((u, [c, h]) => ((u[c] = h), u), {});
  for (let u of r) {
    let c = u.route.id;
    if (
      (!a.hasOwnProperty(c) && e.hasOwnProperty(c) && u.route.loader && (s[c] = e[c]),
      i && i.hasOwnProperty(c))
    )
      break;
  }
  return s;
}
function hy(e) {
  return e ? (ea(e[1]) ? { actionData: {} } : { actionData: { [e[0]]: e[1].data } }) : {};
}
function Pr(e, a) {
  return (
    (a ? e.slice(0, e.findIndex((i) => i.route.id === a) + 1) : [...e])
      .reverse()
      .find((i) => i.route.hasErrorBoundary === !0) || e[0]
  );
}
function tu(e) {
  let a =
    e.length === 1
      ? e[0]
      : e.find((r) => r.index || !r.path || r.path === "/") || { id: "__shim-error-route__" };
  return { matches: [{ params: {}, pathname: "", pathnameBase: "", route: a }], route: a };
}
function ga(e, { pathname: a, routeId: r, method: i, type: s, message: u } = {}) {
  let c = "Unknown Server Error",
    h = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((c = "Bad Request"),
        i && a && r
          ? (h = `You made a ${i} request to "${a}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.`)
          : s === "invalid-body" && (h = "Unable to encode submission body"))
      : e === 403
        ? ((c = "Forbidden"), (h = `Route "${r}" does not match URL "${a}"`))
        : e === 404
          ? ((c = "Not Found"), (h = `No route matches URL "${a}"`))
          : e === 405 &&
            ((c = "Method Not Allowed"),
            i && a && r
              ? (h = `You made a ${i.toUpperCase()} request to "${a}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.`)
              : i && (h = `Invalid request method "${i.toUpperCase()}"`)),
    new Vo(e || 500, c, new Error(h), !0)
  );
}
function nu(e) {
  let a = Object.entries(e);
  for (let r = a.length - 1; r >= 0; r--) {
    let [i, s] = a[r];
    if (yl(s)) return { key: i, result: s };
  }
}
function T0(e) {
  let a = typeof e == "string" ? Ga(e) : e;
  return qa({ ...a, hash: "" });
}
function tx(e, a) {
  return e.pathname !== a.pathname || e.search !== a.search
    ? !1
    : e.hash === ""
      ? a.hash !== ""
      : e.hash === a.hash
        ? !0
        : a.hash !== "";
}
function nx(e) {
  return new Vo(e.init?.status ?? 500, e.init?.statusText ?? "Internal Server Error", e.data);
}
function ax(e) {
  return (
    e != null &&
    typeof e == "object" &&
    Object.entries(e).every(([a, r]) => typeof a == "string" && rx(r))
  );
}
function rx(e) {
  return (
    e != null &&
    typeof e == "object" &&
    "type" in e &&
    "result" in e &&
    (e.type === "data" || e.type === "error")
  );
}
function lx(e) {
  return bh(e.result) && g0.has(e.result.status);
}
function ea(e) {
  return e.type === "error";
}
function yl(e) {
  return (e && e.type) === "redirect";
}
function my(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "type" in e &&
    "data" in e &&
    "init" in e &&
    e.type === "DataWithResponseInit"
  );
}
function bh(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function ix(e) {
  return g0.has(e);
}
function ox(e) {
  return bh(e) && ix(e.status) && e.headers.has("Location");
}
function sx(e) {
  return Uw.has(e.toUpperCase());
}
function xn(e) {
  return kw.has(e.toUpperCase());
}
function _h(e) {
  return new URLSearchParams(e).getAll("index").some((a) => a === "");
}
function wu(e, a) {
  let r = typeof a == "string" ? Ga(a).search : a.search;
  if (e[e.length - 1].route.index && _h(r || "")) return e[e.length - 1];
  let i = d0(e);
  return i[i.length - 1];
}
function py(e) {
  let { formMethod: a, formAction: r, formEncType: i, text: s, formData: u, json: c } = e;
  if (!(!a || !r || !i)) {
    if (s != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: i,
        formData: void 0,
        json: void 0,
        text: s,
      };
    if (u != null)
      return {
        formMethod: a,
        formAction: r,
        formEncType: i,
        formData: u,
        json: void 0,
        text: void 0,
      };
    if (c !== void 0)
      return {
        formMethod: a,
        formAction: r,
        formEncType: i,
        formData: void 0,
        json: c,
        text: void 0,
      };
  }
}
function xd(e, a, r, i) {
  return i
    ? {
        state: "loading",
        location: e,
        matches: a,
        historyAction: r,
        formMethod: i.formMethod,
        formAction: i.formAction,
        formEncType: i.formEncType,
        formData: i.formData,
        json: i.json,
        text: i.text,
      }
    : {
        state: "loading",
        location: e,
        matches: a,
        historyAction: r,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function ux(e, a, r, i) {
  return {
    state: "submitting",
    location: e,
    matches: a,
    historyAction: r,
    formMethod: i.formMethod,
    formAction: i.formAction,
    formEncType: i.formEncType,
    formData: i.formData,
    json: i.json,
    text: i.text,
  };
}
function So(e, a) {
  return e
    ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: a,
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: a,
      };
}
function cx(e, a) {
  return {
    state: "submitting",
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: a ? a.data : void 0,
  };
}
function Ya(e) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function fx(e, a) {
  try {
    let r = e.sessionStorage.getItem(y0);
    if (r) {
      let i = JSON.parse(r);
      for (let [s, u] of Object.entries(i || {}))
        u && Array.isArray(u) && a.set(s, new Set(u || []));
    }
  } catch {}
}
function dx(e, a) {
  if (a.size > 0) {
    let r = {};
    for (let [i, s] of a) r[i] = [...s];
    try {
      e.sessionStorage.setItem(y0, JSON.stringify(r));
    } catch (i) {
      Dt(!1, `Failed to save applied view transitions in sessionStorage (${i}).`);
    }
  }
}
function vy() {
  let e,
    a,
    r = new Promise((i, s) => {
      ((e = async (u) => {
        i(u);
        try {
          await r;
        } catch {}
      }),
        (a = async (u) => {
          s(u);
          try {
            await r;
          } catch {}
        }));
    });
  return { promise: r, resolve: e, reject: a };
}
var El = _.createContext(null);
El.displayName = "DataRouter";
var zi = _.createContext(null);
zi.displayName = "DataRouterState";
var A0 = _.createContext(!1);
function O0() {
  return _.useContext(A0);
}
var Sh = _.createContext({ isTransitioning: !1 });
Sh.displayName = "ViewTransition";
var C0 = _.createContext(new Map());
C0.displayName = "Fetchers";
var hx = _.createContext(null);
hx.displayName = "Await";
var Mn = _.createContext(null);
Mn.displayName = "Navigation";
var qu = _.createContext(null);
qu.displayName = "Location";
var ba = _.createContext({ outlet: null, matches: [], isDataRoute: !1 });
ba.displayName = "Route";
var Eh = _.createContext(null);
Eh.displayName = "RouteError";
var D0 = "REACT_ROUTER_ERROR",
  mx = "REDIRECT",
  px = "ROUTE_ERROR_RESPONSE";
function vx(e) {
  if (e.startsWith(`${D0}:${mx}:{`))
    try {
      let a = JSON.parse(e.slice(28));
      if (
        typeof a == "object" &&
        a &&
        typeof a.status == "number" &&
        typeof a.statusText == "string" &&
        typeof a.location == "string" &&
        typeof a.reloadDocument == "boolean" &&
        typeof a.replace == "boolean"
      )
        return a;
    } catch {}
}
function gx(e) {
  if (e.startsWith(`${D0}:${px}:{`))
    try {
      let a = JSON.parse(e.slice(40));
      if (
        typeof a == "object" &&
        a &&
        typeof a.status == "number" &&
        typeof a.statusText == "string"
      )
        return new Vo(a.status, a.statusText, a.data);
    } catch {}
}
function yx(e, { relative: a } = {}) {
  Ie(Ti(), "useHref() may be used only in the context of a <Router> component.");
  let { basename: r, navigator: i } = _.useContext(Mn),
    { hash: s, pathname: u, search: c } = Zo(e, { relative: a }),
    h = u;
  return (
    r !== "/" && (h = u === "/" ? r : ya([r, u])), i.createHref({ pathname: h, search: c, hash: s })
  );
}
function Ti() {
  return _.useContext(qu) != null;
}
function Zn() {
  return (
    Ie(Ti(), "useLocation() may be used only in the context of a <Router> component."),
    _.useContext(qu).location
  );
}
var M0 =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function N0(e) {
  _.useContext(Mn).static || _.useLayoutEffect(e);
}
function Ho() {
  let { isDataRoute: e } = _.useContext(ba);
  return e ? Mx() : bx();
}
function bx() {
  Ie(Ti(), "useNavigate() may be used only in the context of a <Router> component.");
  let e = _.useContext(El),
    { basename: a, navigator: r } = _.useContext(Mn),
    { matches: i } = _.useContext(ba),
    { pathname: s } = Zn(),
    u = JSON.stringify(Fu(i)),
    c = _.useRef(!1);
  return (
    N0(() => {
      c.current = !0;
    }),
    _.useCallback(
      (p, m = {}) => {
        if ((Dt(c.current, M0), !c.current)) return;
        if (typeof p == "number") {
          r.go(p);
          return;
        }
        let y = jo(p, JSON.parse(u), s, m.relative === "path");
        (e == null && a !== "/" && (y.pathname = y.pathname === "/" ? a : ya([a, y.pathname])),
          (m.replace ? r.replace : r.push)(y, m.state, m));
      },
      [a, r, u, s, e],
    )
  );
}
var _x = _.createContext(null);
function Sx(e) {
  let a = _.useContext(ba).outlet;
  return _.useMemo(() => a && _.createElement(_x.Provider, { value: e }, a), [a, e]);
}
function e3() {
  let { matches: e } = _.useContext(ba);
  return e[e.length - 1]?.params ?? {};
}
function Zo(e, { relative: a } = {}) {
  let { matches: r } = _.useContext(ba),
    { pathname: i } = Zn(),
    s = JSON.stringify(Fu(r));
  return _.useMemo(() => jo(e, JSON.parse(s), i, a === "path"), [e, s, i, a]);
}
function Ex(e, a, r) {
  Ie(Ti(), "useRoutes() may be used only in the context of a <Router> component.");
  let { navigator: i } = _.useContext(Mn),
    { matches: s } = _.useContext(ba),
    u = s[s.length - 1],
    c = u ? u.params : {},
    h = u ? u.pathname : "/",
    p = u ? u.pathnameBase : "/",
    m = u && u.route;
  {
    let R = (m && m.path) || "";
    U0(
      h,
      !m || R.endsWith("*") || R.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${R}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${R}"> to <Route path="${R === "/" ? "*" : `${R}/*`}">.`,
    );
  }
  let y = Zn(),
    v;
  v = y;
  let S = v.pathname || "/",
    E = S;
  if (p !== "/") {
    let R = p.replace(/^\//, "").split("/");
    E = "/" + S.replace(/^\//, "").split("/").slice(R.length).join("/");
  }
  let w =
    r && r.state.matches.length
      ? r.state.matches.map((R) => Object.assign(R, { route: r.manifest[R.route.id] || R.route }))
      : i0(e, { pathname: E });
  return (
    Dt(m || w != null, `No routes matched location "${v.pathname}${v.search}${v.hash}" `),
    Dt(
      w == null ||
        w[w.length - 1].route.element !== void 0 ||
        w[w.length - 1].route.Component !== void 0 ||
        w[w.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ),
    Tx(
      w &&
        w.map((R) =>
          Object.assign({}, R, {
            params: Object.assign({}, c, R.params),
            pathname: ya([
              p,
              i.encodeLocation
                ? i.encodeLocation(
                    R.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23"),
                  ).pathname
                : R.pathname,
            ]),
            pathnameBase:
              R.pathnameBase === "/"
                ? p
                : ya([
                    p,
                    i.encodeLocation
                      ? i.encodeLocation(
                          R.pathnameBase
                            .replace(/%/g, "%25")
                            .replace(/\?/g, "%3F")
                            .replace(/#/g, "%23"),
                        ).pathname
                      : R.pathnameBase,
                  ]),
          }),
        ),
      s,
      r,
    )
  );
}
function wx() {
  let e = L0(),
    a = Ei(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e),
    r = e instanceof Error ? e.stack : null,
    i = "rgba(200,200,200, 0.5)",
    s = { padding: "0.5rem", backgroundColor: i },
    u = { padding: "2px 4px", backgroundColor: i },
    c = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (c = _.createElement(
      _.Fragment,
      null,
      _.createElement("p", null, "💿 Hey developer 👋"),
      _.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        _.createElement("code", { style: u }, "ErrorBoundary"),
        " or",
        " ",
        _.createElement("code", { style: u }, "errorElement"),
        " prop on your route.",
      ),
    )),
    _.createElement(
      _.Fragment,
      null,
      _.createElement("h2", null, "Unexpected Application Error!"),
      _.createElement("h3", { style: { fontStyle: "italic" } }, a),
      r ? _.createElement("pre", { style: s }, r) : null,
      c,
    )
  );
}
var xx = _.createElement(wx, null),
  k0 = class extends _.Component {
    constructor(e) {
      (super(e),
        (this.state = { location: e.location, revalidation: e.revalidation, error: e.error }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, a) {
      return a.location !== e.location || (a.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : a.error,
            location: a.location,
            revalidation: e.revalidation || a.revalidation,
          };
    }
    componentDidCatch(e, a) {
      this.props.onError
        ? this.props.onError(e, a)
        : console.error("React Router caught the following error during render", e);
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == "object" &&
        e &&
        "digest" in e &&
        typeof e.digest == "string"
      ) {
        const r = gx(e.digest);
        r && (e = r);
      }
      let a =
        e !== void 0
          ? _.createElement(
              ba.Provider,
              { value: this.props.routeContext },
              _.createElement(Eh.Provider, { value: e, children: this.props.component }),
            )
          : this.props.children;
      return this.context ? _.createElement(Rx, { error: e }, a) : a;
    }
  };
k0.contextType = A0;
var Rd = new WeakMap();
function Rx({ children: e, error: a }) {
  let { basename: r } = _.useContext(Mn);
  if (typeof a == "object" && a && "digest" in a && typeof a.digest == "string") {
    let i = vx(a.digest);
    if (i) {
      let s = Rd.get(a);
      if (s) throw s;
      let u = m0(i.location, r),
        c = u.absoluteURL || u.to;
      if (Fd(c)) throw new Error("Invalid redirect location");
      if (h0 && !Rd.get(a))
        if (u.isExternal || i.reloadDocument) window.location.href = c;
        else {
          const h = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(u.to, { replace: i.replace }),
          );
          throw (Rd.set(a, h), h);
        }
      return _.createElement("meta", { httpEquiv: "refresh", content: `0;url=${c}` });
    }
  }
  return e;
}
function zx({ routeContext: e, match: a, children: r }) {
  let i = _.useContext(El);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (a.route.errorElement || a.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = a.route.id),
    _.createElement(ba.Provider, { value: e }, r)
  );
}
function Tx(e, a = [], r) {
  let i = r?.state;
  if (e == null) {
    if (!i) return null;
    if (i.errors) e = i.matches;
    else if (a.length === 0 && !i.initialized && i.matches.length > 0) e = i.matches;
    else return null;
  }
  let s = e,
    u = i?.errors;
  if (u != null) {
    let y = s.findIndex((v) => v.route.id && u?.[v.route.id] !== void 0);
    (Ie(
      y >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`,
    ),
      (s = s.slice(0, Math.min(s.length, y + 1))));
  }
  let c = !1,
    h = -1;
  if (r && i) {
    c = i.renderFallback;
    for (let y = 0; y < s.length; y++) {
      let v = s[y];
      if (((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (h = y), v.route.id)) {
        let { loaderData: S, errors: E } = i,
          w = v.route.loader && !S.hasOwnProperty(v.route.id) && (!E || E[v.route.id] === void 0);
        if (v.route.lazy || w) {
          (r.isStatic && (c = !0), h >= 0 ? (s = s.slice(0, h + 1)) : (s = [s[0]]));
          break;
        }
      }
    }
  }
  let p = r?.onError,
    m =
      i && p
        ? (y, v) => {
            p(y, {
              location: i.location,
              params: i.matches?.[0]?.params ?? {},
              pattern: Bo(i.matches),
              errorInfo: v,
            });
          }
        : void 0;
  return s.reduceRight((y, v, S) => {
    let E,
      w = !1,
      z = null,
      R = null;
    i &&
      ((E = u && v.route.id ? u[v.route.id] : void 0),
      (z = v.route.errorElement || xx),
      c &&
        (h < 0 && S === 0
          ? (U0(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (w = !0),
            (R = null))
          : h === S && ((w = !0), (R = v.route.hydrateFallbackElement || null))));
    let j = a.concat(s.slice(0, S + 1)),
      k = () => {
        let F;
        return (
          E
            ? (F = z)
            : w
              ? (F = R)
              : v.route.Component
                ? (F = _.createElement(v.route.Component, null))
                : v.route.element
                  ? (F = v.route.element)
                  : (F = y),
          _.createElement(zx, {
            match: v,
            routeContext: { outlet: y, matches: j, isDataRoute: i != null },
            children: F,
          })
        );
      };
    return i && (v.route.ErrorBoundary || v.route.errorElement || S === 0)
      ? _.createElement(k0, {
          location: i.location,
          revalidation: i.revalidation,
          component: z,
          error: E,
          children: k(),
          routeContext: { outlet: null, matches: j, isDataRoute: !0 },
          onError: m,
        })
      : k();
  }, null);
}
function wh(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ax(e) {
  let a = _.useContext(El);
  return (Ie(a, wh(e)), a);
}
function xh(e) {
  let a = _.useContext(zi);
  return (Ie(a, wh(e)), a);
}
function Ox(e) {
  let a = _.useContext(ba);
  return (Ie(a, wh(e)), a);
}
function Rh(e) {
  let a = Ox(e),
    r = a.matches[a.matches.length - 1];
  return (Ie(r.route.id, `${e} can only be used on routes that contain a unique "id"`), r.route.id);
}
function Cx() {
  return Rh("useRouteId");
}
function Dx() {
  let e = xh("useNavigation");
  return _.useMemo(() => {
    let { matches: a, historyAction: r, ...i } = e.navigation;
    return i;
  }, [e.navigation]);
}
function zh() {
  let { matches: e, loaderData: a } = xh("useMatches");
  return _.useMemo(() => e.map((r) => o0(r, a)), [e, a]);
}
function L0() {
  let e = _.useContext(Eh),
    a = xh("useRouteError"),
    r = Rh("useRouteError");
  return e !== void 0 ? e : a.errors?.[r];
}
function Mx() {
  let { router: e } = Ax("useNavigate"),
    a = Rh("useNavigate"),
    r = _.useRef(!1);
  return (
    N0(() => {
      r.current = !0;
    }),
    _.useCallback(
      async (s, u = {}) => {
        (Dt(r.current, M0),
          r.current &&
            (typeof s == "number"
              ? await e.navigate(s)
              : await e.navigate(s, { fromRouteId: a, ...u })));
      },
      [e, a],
    )
  );
}
var gy = {};
function U0(e, a, r) {
  !a && !gy[e] && ((gy[e] = !0), Dt(!1, r));
}
var yy = {};
function by(e, a) {
  !e && !yy[a] && ((yy[a] = !0), console.warn(a));
}
var Nx = "useOptimistic",
  _y = $u[Nx],
  kx = () => {};
function Lx(e) {
  return _y ? _y(e) : [e, kx];
}
function Ux(e) {
  let a = {
    hasErrorBoundary: e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      (e.element &&
        Dt(
          !1,
          "You should not include both `Component` and `element` on your route - `Component` will be used.",
        ),
      Object.assign(a, { element: _.createElement(e.Component), Component: void 0 })),
    e.HydrateFallback &&
      (e.hydrateFallbackElement &&
        Dt(
          !1,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.",
        ),
      Object.assign(a, {
        hydrateFallbackElement: _.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      })),
    e.ErrorBoundary &&
      (e.errorElement &&
        Dt(
          !1,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.",
        ),
      Object.assign(a, { errorElement: _.createElement(e.ErrorBoundary), ErrorBoundary: void 0 })),
    a
  );
}
var jx = ["HydrateFallback", "hydrateFallbackElement"],
  Vx = class {
    constructor() {
      ((this.status = "pending"),
        (this.promise = new Promise((e, a) => {
          ((this.resolve = (r) => {
            this.status === "pending" && ((this.status = "resolved"), e(r));
          }),
            (this.reject = (r) => {
              this.status === "pending" && ((this.status = "rejected"), a(r));
            }));
        })));
    }
  };
function Bx({ router: e, flushSync: a, onError: r, useTransitions: i }) {
  i = O0() || i;
  let [u, c] = _.useState(e.state),
    [h, p] = Lx(u),
    [m, y] = _.useState(),
    [v, S] = _.useState({ isTransitioning: !1 }),
    [E, w] = _.useState(),
    [z, R] = _.useState(),
    [j, k] = _.useState(),
    F = _.useRef(new Map()),
    $ = _.useCallback(
      (T, { deletedFetchers: me, newErrors: Oe, flushSync: Be, viewTransitionOpts: fe }) => {
        (Oe &&
          r &&
          Object.values(Oe).forEach((ze) =>
            r(ze, {
              location: T.location,
              params: T.matches[0]?.params ?? {},
              pattern: Bo(T.matches),
            }),
          ),
          T.fetchers.forEach((ze, xe) => {
            ze.data !== void 0 && F.current.set(xe, ze.data);
          }),
          me.forEach((ze) => F.current.delete(ze)),
          by(
            Be === !1 || a != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.',
          ));
        let be =
          e.window != null &&
          e.window.document != null &&
          typeof e.window.document.startViewTransition == "function";
        if (
          (by(
            fe == null || be,
            "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.",
          ),
          !fe || !be)
        ) {
          a && Be
            ? a(() => c(T))
            : i === !1
              ? c(T)
              : _.startTransition(() => {
                  (i === !0 && p((ze) => Sy(ze, T)), c(T));
                });
          return;
        }
        if (a && Be) {
          a(() => {
            (z && (E?.resolve(), z.skipTransition()),
              S({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: fe.currentLocation,
                nextLocation: fe.nextLocation,
              }));
          });
          let ze = e.window.document.startViewTransition(() => {
            a(() => c(T));
          });
          (ze.finished.finally(() => {
            a(() => {
              (w(void 0), R(void 0), y(void 0), S({ isTransitioning: !1 }));
            });
          }),
            a(() => R(ze)));
          return;
        }
        z
          ? (E?.resolve(),
            z.skipTransition(),
            k({ state: T, currentLocation: fe.currentLocation, nextLocation: fe.nextLocation }))
          : (y(T),
            S({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: fe.currentLocation,
              nextLocation: fe.nextLocation,
            }));
      },
      [e.window, a, z, E, i, p, r],
    );
  (_.useLayoutEffect(() => e.subscribe($), [e, $]),
    _.useEffect(() => {
      v.isTransitioning && !v.flushSync && w(new Vx());
    }, [v]),
    _.useEffect(() => {
      if (E && m && e.window) {
        let T = m,
          me = E.promise,
          Oe = e.window.document.startViewTransition(async () => {
            (i === !1
              ? c(T)
              : _.startTransition(() => {
                  (i === !0 && p((Be) => Sy(Be, T)), c(T));
                }),
              await me);
          });
        (Oe.finished.finally(() => {
          (w(void 0), R(void 0), y(void 0), S({ isTransitioning: !1 }));
        }),
          R(Oe));
      }
    }, [m, E, e.window, i, p]),
    _.useEffect(() => {
      E && m && h.location.key === m.location.key && E.resolve();
    }, [E, z, h.location, m]),
    _.useEffect(() => {
      !v.isTransitioning &&
        j &&
        (y(j.state),
        S({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: j.currentLocation,
          nextLocation: j.nextLocation,
        }),
        k(void 0));
    }, [v.isTransitioning, j]));
  let G = _.useMemo(
      () => ({
        createHref: e.createHref,
        encodeLocation: e.encodeLocation,
        go: (T) => e.navigate(T),
        push: (T, me, Oe) =>
          e.navigate(T, { state: me, preventScrollReset: Oe?.preventScrollReset }),
        replace: (T, me, Oe) =>
          e.navigate(T, { replace: !0, state: me, preventScrollReset: Oe?.preventScrollReset }),
      }),
      [e],
    ),
    he = e.basename || "/",
    ce = _.useMemo(
      () => ({ router: e, navigator: G, static: !1, basename: he, onError: r }),
      [e, G, he, r],
    );
  return _.createElement(
    _.Fragment,
    null,
    _.createElement(
      El.Provider,
      { value: ce },
      _.createElement(
        zi.Provider,
        { value: h },
        _.createElement(
          C0.Provider,
          { value: F.current },
          _.createElement(
            Sh.Provider,
            { value: v },
            _.createElement(
              Fx,
              {
                basename: he,
                location: h.location,
                navigationType: h.historyAction,
                navigator: G,
                useTransitions: i,
              },
              _.createElement(Hx, {
                routes: e.routes,
                manifest: e.manifest,
                future: e.future,
                state: h,
                isStatic: !1,
                onError: r,
              }),
            ),
          ),
        ),
      ),
    ),
    null,
  );
}
function Sy(e, a) {
  return {
    ...e,
    navigation: a.navigation.state !== "idle" ? a.navigation : e.navigation,
    revalidation: a.revalidation !== "idle" ? a.revalidation : e.revalidation,
    actionData: a.navigation.state !== "submitting" ? a.actionData : e.actionData,
    fetchers: a.fetchers,
  };
}
var Hx = _.memo(Zx);
function Zx({ routes: e, manifest: a, future: r, state: i, isStatic: s, onError: u }) {
  return Ex(e, void 0, { manifest: a, state: i, isStatic: s, onError: u });
}
function $x({ to: e, replace: a, state: r, relative: i }) {
  Ie(Ti(), "<Navigate> may be used only in the context of a <Router> component.");
  let { static: s } = _.useContext(Mn);
  Dt(
    !s,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.",
  );
  let { matches: u } = _.useContext(ba),
    { pathname: c } = Zn(),
    h = Ho(),
    p = jo(e, Fu(u), c, i === "path"),
    m = JSON.stringify(p);
  return (
    _.useEffect(() => {
      h(JSON.parse(m), { replace: a, state: r, relative: i });
    }, [h, m, i, a, r]),
    null
  );
}
function Yx(e) {
  return Sx(e.context);
}
function Fx({
  basename: e = "/",
  children: a = null,
  location: r,
  navigationType: i = "POP",
  navigator: s,
  static: u = !1,
  useTransitions: c,
}) {
  Ie(
    !Ti(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let h = e.replace(/^\/*/, "/"),
    p = _.useMemo(
      () => ({ basename: h, navigator: s, static: u, useTransitions: c, future: {} }),
      [h, s, u, c],
    );
  typeof r == "string" && (r = Ga(r));
  let {
      pathname: m = "/",
      search: y = "",
      hash: v = "",
      state: S = null,
      key: E = "default",
      mask: w,
    } = r,
    z = _.useMemo(() => {
      let R = aa(m, h);
      return R == null
        ? null
        : {
            location: { pathname: R, search: y, hash: v, state: S, key: E, mask: w },
            navigationType: i,
          };
    }, [h, m, y, v, S, E, i, w]);
  return (
    Dt(
      z != null,
      `<Router basename="${h}"> is not able to match the URL "${m}${y}${v}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    z == null
      ? null
      : _.createElement(
          Mn.Provider,
          { value: p },
          _.createElement(qu.Provider, { children: a, value: z }),
        )
  );
}
var xu = "get",
  Ru = "application/x-www-form-urlencoded";
function Gu(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function qx(e) {
  return Gu(e) && e.tagName.toLowerCase() === "button";
}
function Gx(e) {
  return Gu(e) && e.tagName.toLowerCase() === "form";
}
function Px(e) {
  return Gu(e) && e.tagName.toLowerCase() === "input";
}
function Xx(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Ix(e, a) {
  return e.button === 0 && (!a || a === "_self") && !Xx(e);
}
function Gd(e = "") {
  return new URLSearchParams(
    typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams
      ? e
      : Object.keys(e).reduce((a, r) => {
          let i = e[r];
          return a.concat(Array.isArray(i) ? i.map((s) => [r, s]) : [[r, i]]);
        }, []),
  );
}
function Qx(e, a) {
  let r = Gd(e);
  return (
    a &&
      a.forEach((i, s) => {
        r.has(s) ||
          a.getAll(s).forEach((u) => {
            r.append(s, u);
          });
      }),
    r
  );
}
var au = null;
function Kx() {
  if (au === null)
    try {
      (new FormData(document.createElement("form"), 0), (au = !1));
    } catch {
      au = !0;
    }
  return au;
}
var Jx = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function zd(e) {
  return e != null && !Jx.has(e)
    ? (Dt(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ru}"`,
      ),
      null)
    : e;
}
function Wx(e, a) {
  let r, i, s, u, c;
  if (Gx(e)) {
    let h = e.getAttribute("action");
    ((i = h ? aa(h, a) : null),
      (r = e.getAttribute("method") || xu),
      (s = zd(e.getAttribute("enctype")) || Ru),
      (u = new FormData(e)));
  } else if (qx(e) || (Px(e) && (e.type === "submit" || e.type === "image"))) {
    let h = e.form;
    if (h == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let p = e.getAttribute("formaction") || h.getAttribute("action");
    if (
      ((i = p ? aa(p, a) : null),
      (r = e.getAttribute("formmethod") || h.getAttribute("method") || xu),
      (s = zd(e.getAttribute("formenctype")) || zd(h.getAttribute("enctype")) || Ru),
      (u = new FormData(h, e)),
      !Kx())
    ) {
      let { name: m, type: y, value: v } = e;
      if (y === "image") {
        let S = m ? `${m}.` : "";
        (u.append(`${S}x`, "0"), u.append(`${S}y`, "0"));
      } else m && u.append(m, v);
    }
  } else {
    if (Gu(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((r = xu), (i = null), (s = Ru), (c = e));
  }
  return (
    u && s === "text/plain" && ((c = u), (u = void 0)),
    { action: i, method: r.toLowerCase(), encType: s, formData: u, body: c }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var eR = {
    "&": "\\u0026",
    ">": "\\u003e",
    "<": "\\u003c",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
  },
  tR = /[&><\u2028\u2029]/g;
function Ey(e) {
  return e.replace(tR, (a) => eR[a]);
}
function Th(e, a) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(a);
}
function j0(e, a, r, i) {
  let s =
    typeof e == "string"
      ? new URL(e, typeof window > "u" ? "server://singlefetch/" : window.location.origin)
      : e;
  return (
    r
      ? s.pathname.endsWith("/")
        ? (s.pathname = `${s.pathname}_.${i}`)
        : (s.pathname = `${s.pathname}.${i}`)
      : s.pathname === "/"
        ? (s.pathname = `_root.${i}`)
        : a && aa(s.pathname, a) === "/"
          ? (s.pathname = `${Du(a)}/_root.${i}`)
          : (s.pathname = `${Du(s.pathname)}.${i}`),
    s
  );
}
async function nR(e, a) {
  if (e.id in a) return a[e.id];
  try {
    let r = await import(e.module);
    return ((a[e.id] = r), r);
  } catch (r) {
    return (
      console.error(`Error loading route module \`${e.module}\`, reloading page...`),
      console.error(r),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function aR(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function rR(e, a, r) {
  let i = await Promise.all(
    e.map(async (s) => {
      let u = a.routes[s.route.id];
      if (u) {
        let c = await nR(u, r);
        return c.links ? c.links() : [];
      }
      return [];
    }),
  );
  return sR(
    i
      .flat(1)
      .filter(aR)
      .filter((s) => s.rel === "stylesheet" || s.rel === "preload")
      .map((s) =>
        s.rel === "stylesheet" ? { ...s, rel: "prefetch", as: "style" } : { ...s, rel: "prefetch" },
      ),
  );
}
function wy(e, a, r, i, s, u) {
  let c = (p, m) => (r[m] ? p.route.id !== r[m].route.id : !0),
    h = (p, m) =>
      r[m].pathname !== p.pathname ||
      (r[m].route.path?.endsWith("*") && r[m].params["*"] !== p.params["*"]);
  return u === "assets"
    ? a.filter((p, m) => c(p, m) || h(p, m))
    : u === "data"
      ? a.filter((p, m) => {
          let y = i.routes[p.route.id];
          if (!y || !y.hasLoader) return !1;
          if (c(p, m) || h(p, m)) return !0;
          if (p.route.shouldRevalidate) {
            let v = p.route.shouldRevalidate({
              currentUrl: new URL(s.pathname + s.search + s.hash, window.origin),
              currentParams: r[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: p.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof v == "boolean") return v;
          }
          return !0;
        })
      : [];
}
function lR(e, a, { includeHydrateFallback: r } = {}) {
  return iR(
    e
      .map((i) => {
        let s = a.routes[i.route.id];
        if (!s) return [];
        let u = [s.module];
        return (
          s.clientActionModule && (u = u.concat(s.clientActionModule)),
          s.clientLoaderModule && (u = u.concat(s.clientLoaderModule)),
          r && s.hydrateFallbackModule && (u = u.concat(s.hydrateFallbackModule)),
          s.imports && (u = u.concat(s.imports)),
          u
        );
      })
      .flat(1),
  );
}
function iR(e) {
  return [...new Set(e)];
}
function oR(e) {
  let a = {},
    r = Object.keys(e).sort();
  for (let i of r) a[i] = e[i];
  return a;
}
function sR(e, a) {
  let r = new Set();
  return (
    new Set(a),
    e.reduce((i, s) => {
      let u = JSON.stringify(oR(s));
      return (r.has(u) || (r.add(u), i.push({ key: u, link: s })), i);
    }, [])
  );
}
function Ah() {
  let e = _.useContext(El);
  return (Th(e, "You must render this element inside a <DataRouterContext.Provider> element"), e);
}
function uR() {
  let e = _.useContext(zi);
  return (
    Th(e, "You must render this element inside a <DataRouterStateContext.Provider> element"), e
  );
}
var Pu = _.createContext(void 0);
Pu.displayName = "FrameworkContext";
function Xu() {
  let e = _.useContext(Pu);
  return (Th(e, "You must render this element inside a <HydratedRouter> element"), e);
}
function cR(e, a) {
  let r = _.useContext(Pu),
    [i, s] = _.useState(!1),
    [u, c] = _.useState(!1),
    { onFocus: h, onBlur: p, onMouseEnter: m, onMouseLeave: y, onTouchStart: v } = a,
    S = _.useRef(null);
  (_.useEffect(() => {
    if ((e === "render" && c(!0), e === "viewport")) {
      let z = (j) => {
          j.forEach((k) => {
            c(k.isIntersecting);
          });
        },
        R = new IntersectionObserver(z, { threshold: 0.5 });
      return (
        S.current && R.observe(S.current),
        () => {
          R.disconnect();
        }
      );
    }
  }, [e]),
    _.useEffect(() => {
      if (i) {
        let z = setTimeout(() => {
          c(!0);
        }, 100);
        return () => {
          clearTimeout(z);
        };
      }
    }, [i]));
  let E = () => {
      s(!0);
    },
    w = () => {
      (s(!1), c(!1));
    };
  return r
    ? e !== "intent"
      ? [u, S, {}]
      : [
          u,
          S,
          {
            onFocus: Eo(h, E),
            onBlur: Eo(p, w),
            onMouseEnter: Eo(m, E),
            onMouseLeave: Eo(y, w),
            onTouchStart: Eo(v, E),
          },
        ]
    : [!1, S, {}];
}
function Eo(e, a) {
  return (r) => {
    (e && e(r), r.defaultPrevented || a(r));
  };
}
function fR({ page: e, ...a }) {
  let r = O0(),
    { nonce: i } = Xu(),
    { router: s } = Ah(),
    u = _.useMemo(() => i0(s.routes, e, s.basename), [s.routes, e, s.basename]);
  return u
    ? (a.nonce == null && i && (a = { ...a, nonce: i }),
      r
        ? _.createElement(hR, { page: e, matches: u, ...a })
        : _.createElement(mR, { page: e, matches: u, ...a }))
    : null;
}
function dR(e) {
  let { manifest: a, routeModules: r } = Xu(),
    [i, s] = _.useState([]);
  return (
    _.useEffect(() => {
      let u = !1;
      return (
        rR(e, a, r).then((c) => {
          u || s(c);
        }),
        () => {
          u = !0;
        }
      );
    }, [e, a, r]),
    i
  );
}
function hR({ page: e, matches: a, ...r }) {
  let i = Zn(),
    { future: s } = Xu(),
    { basename: u } = Ah(),
    c = _.useMemo(() => {
      if (e === i.pathname + i.search + i.hash) return [];
      let h = j0(e, u, s.v8_trailingSlashAwareDataRequests, "rsc"),
        p = !1,
        m = [];
      for (let y of a)
        typeof y.route.shouldRevalidate == "function" ? (p = !0) : m.push(y.route.id);
      return (
        p && m.length > 0 && h.searchParams.set("_routes", m.join(",")), [h.pathname + h.search]
      );
    }, [u, s.v8_trailingSlashAwareDataRequests, e, i, a]);
  return _.createElement(
    _.Fragment,
    null,
    c.map((h) => _.createElement("link", { key: h, rel: "prefetch", as: "fetch", href: h, ...r })),
  );
}
function mR({ page: e, matches: a, ...r }) {
  let i = Zn(),
    { future: s, manifest: u, routeModules: c } = Xu(),
    { basename: h } = Ah(),
    { loaderData: p, matches: m } = uR(),
    y = _.useMemo(() => wy(e, a, m, u, i, "data"), [e, a, m, u, i]),
    v = _.useMemo(() => wy(e, a, m, u, i, "assets"), [e, a, m, u, i]),
    S = _.useMemo(() => {
      if (e === i.pathname + i.search + i.hash) return [];
      let z = new Set(),
        R = !1;
      if (
        (a.forEach((k) => {
          let F = u.routes[k.route.id];
          !F ||
            !F.hasLoader ||
            ((!y.some(($) => $.route.id === k.route.id) &&
              k.route.id in p &&
              c[k.route.id]?.shouldRevalidate) ||
            F.hasClientLoader
              ? (R = !0)
              : z.add(k.route.id));
        }),
        z.size === 0)
      )
        return [];
      let j = j0(e, h, s.v8_trailingSlashAwareDataRequests, "data");
      return (
        R &&
          z.size > 0 &&
          j.searchParams.set(
            "_routes",
            a
              .filter((k) => z.has(k.route.id))
              .map((k) => k.route.id)
              .join(","),
          ),
        [j.pathname + j.search]
      );
    }, [h, s.v8_trailingSlashAwareDataRequests, p, i, u, y, a, e, c]),
    E = _.useMemo(() => lR(v, u), [v, u]),
    w = dR(v);
  return _.createElement(
    _.Fragment,
    null,
    S.map((z) => _.createElement("link", { key: z, rel: "prefetch", as: "fetch", href: z, ...r })),
    E.map((z) => _.createElement("link", { key: z, rel: "modulepreload", href: z, ...r })),
    w.map(({ key: z, link: R }) =>
      _.createElement("link", {
        key: z,
        nonce: r.nonce,
        ...R,
        crossOrigin: R.crossOrigin ?? r.crossOrigin,
      }),
    ),
  );
}
function pR(...e) {
  return (a) => {
    e.forEach((r) => {
      typeof r == "function" ? r(a) : r != null && (r.current = a);
    });
  };
}
var vR =
  typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  vR && (window.__reactRouterVersion = "7.18.0");
} catch {}
function gR(e, a) {
  return Zw({
    basename: a?.basename,
    getContext: a?.getContext,
    future: a?.future,
    history: aw({ window: a?.window }),
    hydrationData: a?.hydrationData || yR(),
    routes: e,
    mapRouteProperties: Ux,
    hydrationRouteProperties: jx,
    dataStrategy: a?.dataStrategy,
    patchRoutesOnNavigation: a?.patchRoutesOnNavigation,
    window: a?.window,
    instrumentations: a?.instrumentations,
  }).initialize();
}
function yR() {
  let e = window?.__staticRouterHydrationData;
  return (e && e.errors && (e = { ...e, errors: bR(e.errors) }), e);
}
function bR(e) {
  if (!e) return null;
  let a = Object.entries(e),
    r = {};
  for (let [i, s] of a)
    if (s && s.__type === "RouteErrorResponse")
      r[i] = new Vo(s.status, s.statusText, s.data, s.internal === !0);
    else if (s && s.__type === "Error") {
      if (typeof s.__subType == "string" && Tw.includes(s.__subType)) {
        let u = window[s.__subType];
        if (typeof u == "function")
          try {
            let c = new u(s.message);
            ((c.stack = ""), (r[i] = c));
          } catch {}
      }
      if (r[i] == null) {
        let u = new Error(s.message);
        ((u.stack = ""), (r[i] = u));
      }
    } else r[i] = s;
  return r;
}
var V0 = _.forwardRef(function (
  {
    onClick: a,
    discover: r = "render",
    prefetch: i = "none",
    relative: s,
    reloadDocument: u,
    replace: c,
    mask: h,
    state: p,
    target: m,
    to: y,
    preventScrollReset: v,
    viewTransition: S,
    defaultShouldRevalidate: E,
    ...w
  },
  z,
) {
  let { basename: R, navigator: j, useTransitions: k } = _.useContext(Mn),
    F = typeof y == "string" && Yu.test(y),
    $ = m0(y, R);
  y = $.to;
  let G = yx(y, { relative: s }),
    he = Zn(),
    ce = null;
  if (h) {
    let xe = jo(h, [], he.mask ? he.mask.pathname : "/", !0);
    (R !== "/" && (xe.pathname = xe.pathname === "/" ? R : ya([R, xe.pathname])),
      (ce = j.createHref(xe)));
  }
  let [T, me, Oe] = cR(i, w),
    Be = wR(y, {
      replace: c,
      mask: h,
      state: p,
      target: m,
      preventScrollReset: v,
      relative: s,
      viewTransition: S,
      defaultShouldRevalidate: E,
      useTransitions: k,
    });
  function fe(xe) {
    (a && a(xe), xe.defaultPrevented || Be(xe));
  }
  let be = !($.isExternal || u),
    ze = _.createElement("a", {
      ...w,
      ...Oe,
      href: (be ? ce : void 0) || $.absoluteURL || G,
      onClick: be ? fe : a,
      ref: pR(z, me),
      target: m,
      "data-discover": !F && r === "render" ? "true" : void 0,
    });
  return T && !F ? _.createElement(_.Fragment, null, ze, _.createElement(fR, { page: G })) : ze;
});
V0.displayName = "Link";
var _R = _.forwardRef(function (
  {
    "aria-current": a = "page",
    caseSensitive: r = !1,
    className: i = "",
    end: s = !1,
    style: u,
    to: c,
    viewTransition: h,
    children: p,
    ...m
  },
  y,
) {
  let v = Zo(c, { relative: m.relative }),
    S = Zn(),
    E = _.useContext(zi),
    { navigator: w, basename: z } = _.useContext(Mn),
    R = E != null && CR(v) && h === !0,
    j = w.encodeLocation ? w.encodeLocation(v).pathname : v.pathname,
    k = S.pathname,
    F = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
  (r || ((k = k.toLowerCase()), (F = F ? F.toLowerCase() : null), (j = j.toLowerCase())),
    F && z && (F = aa(F, z) || F));
  const $ = j !== "/" && j.endsWith("/") ? j.length - 1 : j.length;
  let G = k === j || (!s && k.startsWith(j) && k.charAt($) === "/"),
    he = F != null && (F === j || (!s && F.startsWith(j) && F.charAt(j.length) === "/")),
    ce = { isActive: G, isPending: he, isTransitioning: R },
    T = G ? a : void 0,
    me;
  typeof i == "function"
    ? (me = i(ce))
    : (me = [i, G ? "active" : null, he ? "pending" : null, R ? "transitioning" : null]
        .filter(Boolean)
        .join(" "));
  let Oe = typeof u == "function" ? u(ce) : u;
  return _.createElement(
    V0,
    { ...m, "aria-current": T, className: me, ref: y, style: Oe, to: c, viewTransition: h },
    typeof p == "function" ? p(ce) : p,
  );
});
_R.displayName = "NavLink";
var SR = _.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: a,
      navigate: r,
      reloadDocument: i,
      replace: s,
      state: u,
      method: c = xu,
      action: h,
      onSubmit: p,
      relative: m,
      preventScrollReset: y,
      viewTransition: v,
      defaultShouldRevalidate: S,
      ...E
    },
    w,
  ) => {
    let { useTransitions: z } = _.useContext(Mn),
      R = zR(),
      j = TR(h, { relative: m }),
      k = c.toLowerCase() === "get" ? "get" : "post",
      F = typeof h == "string" && Yu.test(h),
      $ = (G) => {
        if ((p && p(G), G.defaultPrevented)) return;
        G.preventDefault();
        let he = G.nativeEvent.submitter,
          ce = he?.getAttribute("formmethod") || c,
          T = () =>
            R(he || G.currentTarget, {
              fetcherKey: a,
              method: ce,
              navigate: r,
              replace: s,
              state: u,
              relative: m,
              preventScrollReset: y,
              viewTransition: v,
              defaultShouldRevalidate: S,
            });
        z && r !== !1 ? _.startTransition(() => T()) : T();
      };
    return _.createElement("form", {
      ref: w,
      method: k,
      action: j,
      onSubmit: i ? p : $,
      ...E,
      "data-discover": !F && e === "render" ? "true" : void 0,
    });
  },
);
SR.displayName = "Form";
function B0({ getKey: e, storageKey: a, ...r }) {
  let i = _.useContext(Pu),
    { basename: s } = _.useContext(Mn),
    u = Zn(),
    c = zh();
  AR({ getKey: e, storageKey: a });
  let h = _.useMemo(() => {
    if (!i || !e) return null;
    let m = Xd(u, c, s, e);
    return m !== u.key ? m : null;
  }, []);
  if (!i || i.isSpaMode) return null;
  let p = ((m, y) => {
    if (!window.history.state || !window.history.state.key) {
      let v = Math.random().toString(32).slice(2);
      window.history.replaceState({ key: v }, "");
    }
    try {
      let S = JSON.parse(sessionStorage.getItem(m) || "{}")[y || window.history.state.key];
      typeof S == "number" && window.scrollTo(0, S);
    } catch (v) {
      (console.error(v), sessionStorage.removeItem(m));
    }
  }).toString();
  return (
    r.nonce == null && i?.nonce && (r.nonce = i.nonce),
    _.createElement("script", {
      ...r,
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: `(${p})(${Ey(JSON.stringify(a || Pd))}, ${Ey(JSON.stringify(h))})`,
      },
    })
  );
}
B0.displayName = "ScrollRestoration";
function H0(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Oh(e) {
  let a = _.useContext(El);
  return (Ie(a, H0(e)), a);
}
function ER(e) {
  let a = _.useContext(zi);
  return (Ie(a, H0(e)), a);
}
function wR(
  e,
  {
    target: a,
    replace: r,
    mask: i,
    state: s,
    preventScrollReset: u,
    relative: c,
    viewTransition: h,
    defaultShouldRevalidate: p,
    useTransitions: m,
  } = {},
) {
  let y = Ho(),
    v = Zn(),
    S = Zo(e, { relative: c });
  return _.useCallback(
    (E) => {
      if (Ix(E, a)) {
        E.preventDefault();
        let w = r !== void 0 ? r : qa(v) === qa(S),
          z = () =>
            y(e, {
              replace: w,
              mask: i,
              state: s,
              preventScrollReset: u,
              relative: c,
              viewTransition: h,
              defaultShouldRevalidate: p,
            });
        m ? _.startTransition(() => z()) : z();
      }
    },
    [v, y, S, r, i, s, a, e, u, c, h, p, m],
  );
}
function t3(e) {
  Dt(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.",
  );
  let a = _.useRef(Gd(e)),
    r = _.useRef(!1),
    i = Zn(),
    s = _.useMemo(() => Qx(i.search, r.current ? null : a.current), [i.search]),
    u = Ho(),
    c = _.useCallback(
      (h, p) => {
        const m = Gd(typeof h == "function" ? h(new URLSearchParams(s)) : h);
        ((r.current = !0), u("?" + m, p));
      },
      [u, s],
    );
  return [s, c];
}
var xR = 0,
  RR = () => `__${String(++xR)}__`;
function zR() {
  let { router: e } = Oh("useSubmit"),
    { basename: a } = _.useContext(Mn),
    r = Cx(),
    i = e.fetch,
    s = e.navigate;
  return _.useCallback(
    async (u, c = {}) => {
      let { action: h, method: p, encType: m, formData: y, body: v } = Wx(u, a);
      if (c.navigate === !1) {
        let S = c.fetcherKey || RR();
        await i(S, r, c.action || h, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: v,
          formMethod: c.method || p,
          formEncType: c.encType || m,
          flushSync: c.flushSync,
        });
      } else
        await s(c.action || h, {
          defaultShouldRevalidate: c.defaultShouldRevalidate,
          preventScrollReset: c.preventScrollReset,
          formData: y,
          body: v,
          formMethod: c.method || p,
          formEncType: c.encType || m,
          replace: c.replace,
          state: c.state,
          fromRouteId: r,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition,
        });
    },
    [i, s, a, r],
  );
}
function TR(e, { relative: a } = {}) {
  let { basename: r } = _.useContext(Mn),
    i = _.useContext(ba);
  Ie(i, "useFormAction must be used inside a RouteContext");
  let [s] = i.matches.slice(-1),
    u = { ...Zo(e || ".", { relative: a }) },
    c = Zn();
  if (e == null) {
    u.search = c.search;
    let h = new URLSearchParams(u.search),
      p = h.getAll("index");
    if (p.some((y) => y === "")) {
      (h.delete("index"), p.filter((v) => v).forEach((v) => h.append("index", v)));
      let y = h.toString();
      u.search = y ? `?${y}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      s.route.index &&
      (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (u.pathname = u.pathname === "/" ? r : ya([r, u.pathname])),
    qa(u)
  );
}
var Pd = "react-router-scroll-positions",
  ru = {};
function Xd(e, a, r, i) {
  let s = null;
  return (
    i &&
      (r !== "/" ? (s = i({ ...e, pathname: aa(e.pathname, r) || e.pathname }, a)) : (s = i(e, a))),
    s == null && (s = e.key),
    s
  );
}
function AR({ getKey: e, storageKey: a } = {}) {
  let { router: r } = Oh("useScrollRestoration"),
    { restoreScrollPosition: i, preventScrollReset: s } = ER("useScrollRestoration"),
    { basename: u } = _.useContext(Mn),
    c = Zn(),
    h = zh(),
    p = Dx();
  (_.useEffect(
    () => (
      (window.history.scrollRestoration = "manual"),
      () => {
        window.history.scrollRestoration = "auto";
      }
    ),
    [],
  ),
    OR(
      _.useCallback(() => {
        if (p.state === "idle") {
          let m = Xd(c, h, u, e);
          ru[m] = window.scrollY;
        }
        try {
          sessionStorage.setItem(a || Pd, JSON.stringify(ru));
        } catch (m) {
          Dt(
            !1,
            `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${m}).`,
          );
        }
        window.history.scrollRestoration = "auto";
      }, [p.state, e, u, c, h, a]),
    ),
    typeof document < "u" &&
      (_.useLayoutEffect(() => {
        try {
          let m = sessionStorage.getItem(a || Pd);
          m && (ru = JSON.parse(m));
        } catch {}
      }, [a]),
      _.useLayoutEffect(() => {
        let m = r?.enableScrollRestoration(
          ru,
          () => window.scrollY,
          e ? (y, v) => Xd(y, v, u, e) : void 0,
        );
        return () => m && m();
      }, [r, u, e]),
      _.useLayoutEffect(() => {
        if (i !== !1) {
          if (typeof i == "number") {
            window.scrollTo(0, i);
            return;
          }
          try {
            if (c.hash) {
              let m = document.getElementById(decodeURIComponent(c.hash.slice(1)));
              if (m) {
                m.scrollIntoView();
                return;
              }
            }
          } catch {
            Dt(
              !1,
              `"${c.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`,
            );
          }
          s !== !0 && window.scrollTo(0, 0);
        }
      }, [c, i, s])));
}
function OR(e, a) {
  let { capture: r } = {};
  _.useEffect(() => {
    let i = r != null ? { capture: r } : void 0;
    return (
      window.addEventListener("pagehide", e, i),
      () => {
        window.removeEventListener("pagehide", e, i);
      }
    );
  }, [e, r]);
}
function CR(e, { relative: a } = {}) {
  let r = _.useContext(Sh);
  Ie(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: i } = Oh("useViewTransitionState"),
    s = Zo(e, { relative: a });
  if (!r.isTransitioning) return !1;
  let u = aa(r.currentLocation.pathname, i) || r.currentLocation.pathname,
    c = aa(r.nextLocation.pathname, i) || r.nextLocation.pathname;
  return Cu(s.pathname, c) != null || Cu(s.pathname, u) != null;
}
var Iu = t0();
const DR = e0(Iu);
function MR(e) {
  return _.createElement(Bx, { flushSync: Iu.flushSync, ...e });
}
const NR = _.createContext(null);
function kR({ children: e }) {
  const [a, r] = _.useState({ variant: "inset", collapsible: "none", side: "left" }),
    i = _.useCallback((s) => {
      r((u) => ({ ...u, ...s }));
    }, []);
  return ee.jsx(NR.Provider, { value: { config: a, updateConfig: i }, children: e });
}
const LR = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  UR = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (a, r, i) => (i ? i.toUpperCase() : r.toLowerCase())),
  xy = (e) => {
    const a = UR(e);
    return a.charAt(0).toUpperCase() + a.slice(1);
  },
  Z0 = (...e) =>
    e
      .filter((a, r, i) => !!a && a.trim() !== "" && i.indexOf(a) === r)
      .join(" ")
      .trim(),
  jR = (e) => {
    for (const a in e) if (a.startsWith("aria-") || a === "role" || a === "title") return !0;
  };
var VR = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const BR = _.forwardRef(
  (
    {
      color: e = "currentColor",
      size: a = 24,
      strokeWidth: r = 2,
      absoluteStrokeWidth: i,
      className: s = "",
      children: u,
      iconNode: c,
      ...h
    },
    p,
  ) =>
    _.createElement(
      "svg",
      {
        ref: p,
        ...VR,
        width: a,
        height: a,
        stroke: e,
        strokeWidth: i ? (Number(r) * 24) / Number(a) : r,
        className: Z0("lucide", s),
        ...(!u && !jR(h) && { "aria-hidden": "true" }),
        ...h,
      },
      [...c.map(([m, y]) => _.createElement(m, y)), ...(Array.isArray(u) ? u : [u])],
    ),
);
const wl = (e, a) => {
  const r = _.forwardRef(({ className: i, ...s }, u) =>
    _.createElement(BR, {
      ref: u,
      iconNode: a,
      className: Z0(`lucide-${LR(xy(e))}`, `lucide-${e}`, i),
      ...s,
    }),
  );
  return ((r.displayName = xy(e)), r);
};
const HR = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]],
  ZR = wl("chevron-down", HR);
const $R = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
  ],
  YR = wl("circle-alert", $R);
const FR = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  qR = wl("circle-check", FR);
const GR = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }],
  ],
  PR = wl("circle-x", GR);
const XR = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }],
  ],
  IR = wl("info", XR);
const QR = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  KR = wl("loader-circle", QR);
const JR = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  WR = wl("x", JR);
function ez(e) {
  if (typeof document > "u") return;
  let a = document.head || document.getElementsByTagName("head")[0],
    r = document.createElement("style");
  ((r.type = "text/css"),
    a.appendChild(r),
    r.styleSheet ? (r.styleSheet.cssText = e) : r.appendChild(document.createTextNode(e)));
}
const tz = (e) => {
    switch (e) {
      case "success":
        return rz;
      case "info":
        return iz;
      case "warning":
        return lz;
      case "error":
        return oz;
      default:
        return null;
    }
  },
  nz = Array(12).fill(0),
  az = ({ visible: e, className: a }) =>
    K.createElement(
      "div",
      { className: ["sonner-loading-wrapper", a].filter(Boolean).join(" "), "data-visible": e },
      K.createElement(
        "div",
        { className: "sonner-spinner" },
        nz.map((r, i) =>
          K.createElement("div", { className: "sonner-loading-bar", key: `spinner-bar-${i}` }),
        ),
      ),
    ),
  rz = K.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    K.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    }),
  ),
  lz = K.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    K.createElement("path", {
      fillRule: "evenodd",
      d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
      clipRule: "evenodd",
    }),
  ),
  iz = K.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    K.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
      clipRule: "evenodd",
    }),
  ),
  oz = K.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    K.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    }),
  ),
  sz = K.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    K.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
    K.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }),
  ),
  uz = () => {
    const [e, a] = K.useState(document.hidden);
    return (
      K.useEffect(() => {
        const r = () => {
          a(document.hidden);
        };
        return (
          document.addEventListener("visibilitychange", r),
          () => window.removeEventListener("visibilitychange", r)
        );
      }, []),
      e
    );
  };
let Id = 1;
class cz {
  constructor() {
    ((this.subscribe = (a) => (
      this.subscribers.push(a),
      () => {
        const r = this.subscribers.indexOf(a);
        this.subscribers.splice(r, 1);
      }
    )),
      (this.publish = (a) => {
        this.subscribers.forEach((r) => r(a));
      }),
      (this.addToast = (a) => {
        (this.publish(a), (this.toasts = [...this.toasts, a]));
      }),
      (this.create = (a) => {
        var r;
        const { message: i, ...s } = a,
          u =
            typeof a?.id == "number" || ((r = a.id) == null ? void 0 : r.length) > 0 ? a.id : Id++,
          c = this.toasts.find((p) => p.id === u),
          h = a.dismissible === void 0 ? !0 : a.dismissible;
        return (
          this.dismissedToasts.has(u) && this.dismissedToasts.delete(u),
          c
            ? (this.toasts = this.toasts.map((p) =>
                p.id === u
                  ? (this.publish({ ...p, ...a, id: u, title: i }),
                    { ...p, ...a, id: u, dismissible: h, title: i })
                  : p,
              ))
            : this.addToast({ title: i, ...s, dismissible: h, id: u }),
          u
        );
      }),
      (this.dismiss = (a) => (
        a
          ? (this.dismissedToasts.add(a),
            requestAnimationFrame(() => this.subscribers.forEach((r) => r({ id: a, dismiss: !0 }))))
          : this.toasts.forEach((r) => {
              this.subscribers.forEach((i) => i({ id: r.id, dismiss: !0 }));
            }),
        a
      )),
      (this.message = (a, r) => this.create({ ...r, message: a })),
      (this.error = (a, r) => this.create({ ...r, message: a, type: "error" })),
      (this.success = (a, r) => this.create({ ...r, type: "success", message: a })),
      (this.info = (a, r) => this.create({ ...r, type: "info", message: a })),
      (this.warning = (a, r) => this.create({ ...r, type: "warning", message: a })),
      (this.loading = (a, r) => this.create({ ...r, type: "loading", message: a })),
      (this.promise = (a, r) => {
        if (!r) return;
        let i;
        r.loading !== void 0 &&
          (i = this.create({
            ...r,
            promise: a,
            type: "loading",
            message: r.loading,
            description: typeof r.description != "function" ? r.description : void 0,
          }));
        const s = Promise.resolve(a instanceof Function ? a() : a);
        let u = i !== void 0,
          c;
        const h = s
            .then(async (m) => {
              if (((c = ["resolve", m]), K.isValidElement(m)))
                ((u = !1), this.create({ id: i, type: "default", message: m }));
              else if (dz(m) && !m.ok) {
                u = !1;
                const v =
                    typeof r.error == "function"
                      ? await r.error(`HTTP error! status: ${m.status}`)
                      : r.error,
                  S =
                    typeof r.description == "function"
                      ? await r.description(`HTTP error! status: ${m.status}`)
                      : r.description,
                  w = typeof v == "object" && !K.isValidElement(v) ? v : { message: v };
                this.create({ id: i, type: "error", description: S, ...w });
              } else if (m instanceof Error) {
                u = !1;
                const v = typeof r.error == "function" ? await r.error(m) : r.error,
                  S = typeof r.description == "function" ? await r.description(m) : r.description,
                  w = typeof v == "object" && !K.isValidElement(v) ? v : { message: v };
                this.create({ id: i, type: "error", description: S, ...w });
              } else if (r.success !== void 0) {
                u = !1;
                const v = typeof r.success == "function" ? await r.success(m) : r.success,
                  S = typeof r.description == "function" ? await r.description(m) : r.description,
                  w = typeof v == "object" && !K.isValidElement(v) ? v : { message: v };
                this.create({ id: i, type: "success", description: S, ...w });
              }
            })
            .catch(async (m) => {
              if (((c = ["reject", m]), r.error !== void 0)) {
                u = !1;
                const y = typeof r.error == "function" ? await r.error(m) : r.error,
                  v = typeof r.description == "function" ? await r.description(m) : r.description,
                  E = typeof y == "object" && !K.isValidElement(y) ? y : { message: y };
                this.create({ id: i, type: "error", description: v, ...E });
              }
            })
            .finally(() => {
              (u && (this.dismiss(i), (i = void 0)), r.finally == null || r.finally.call(r));
            }),
          p = () =>
            new Promise((m, y) => h.then(() => (c[0] === "reject" ? y(c[1]) : m(c[1]))).catch(y));
        return typeof i != "string" && typeof i != "number"
          ? { unwrap: p }
          : Object.assign(i, { unwrap: p });
      }),
      (this.custom = (a, r) => {
        const i = r?.id || Id++;
        return (this.create({ jsx: a(i), id: i, ...r }), i);
      }),
      (this.getActiveToasts = () => this.toasts.filter((a) => !this.dismissedToasts.has(a.id))),
      (this.subscribers = []),
      (this.toasts = []),
      (this.dismissedToasts = new Set()));
  }
}
const Hn = new cz(),
  fz = (e, a) => {
    const r = a?.id || Id++;
    return (Hn.addToast({ title: e, ...a, id: r }), r);
  },
  dz = (e) =>
    e &&
    typeof e == "object" &&
    "ok" in e &&
    typeof e.ok == "boolean" &&
    "status" in e &&
    typeof e.status == "number",
  hz = fz,
  mz = () => Hn.toasts,
  pz = () => Hn.getActiveToasts(),
  vz = Object.assign(
    hz,
    {
      success: Hn.success,
      info: Hn.info,
      warning: Hn.warning,
      error: Hn.error,
      custom: Hn.custom,
      message: Hn.message,
      promise: Hn.promise,
      dismiss: Hn.dismiss,
      loading: Hn.loading,
    },
    { getHistory: mz, getToasts: pz },
  );
ez(
  "[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}",
);
function lu(e) {
  return e.label !== void 0;
}
const gz = 3,
  yz = "24px",
  bz = "16px",
  Ry = 4e3,
  _z = 356,
  Sz = 14,
  Ez = 45,
  wz = 200;
function Ha(...e) {
  return e.filter(Boolean).join(" ");
}
function xz(e) {
  const [a, r] = e.split("-"),
    i = [];
  return (a && i.push(a), r && i.push(r), i);
}
const Rz = (e) => {
  var a, r, i, s, u, c, h, p, m;
  const {
      invert: y,
      toast: v,
      unstyled: S,
      interacting: E,
      setHeights: w,
      visibleToasts: z,
      heights: R,
      index: j,
      toasts: k,
      expanded: F,
      removeToast: $,
      defaultRichColors: G,
      closeButton: he,
      style: ce,
      cancelButtonStyle: T,
      actionButtonStyle: me,
      className: Oe = "",
      descriptionClassName: Be = "",
      duration: fe,
      position: be,
      gap: ze,
      expandByDefault: xe,
      classNames: D,
      icons: X,
      closeButtonAriaLabel: pe = "Close toast",
    } = e,
    [ge, Q] = K.useState(null),
    [O, I] = K.useState(null),
    [q, J] = K.useState(!1),
    [ie, ve] = K.useState(!1),
    [Me, He] = K.useState(!1),
    [Ne, un] = K.useState(!1),
    [an, Ut] = K.useState(!1),
    [St, xt] = K.useState(0),
    [Ma, la] = K.useState(0),
    cn = K.useRef(v.duration || fe || Ry),
    Sa = K.useRef(null),
    rn = K.useRef(null),
    Na = j === 0,
    ka = j + 1 <= z,
    ln = v.type,
    Yn = v.dismissible !== !1,
    Xt = v.className || "",
    Fn = v.descriptionClassName || "",
    Tn = K.useMemo(() => R.findIndex(($e) => $e.toastId === v.id) || 0, [R, v.id]),
    vr = K.useMemo(() => {
      var $e;
      return ($e = v.closeButton) != null ? $e : he;
    }, [v.closeButton, he]),
    ia = K.useMemo(() => v.duration || fe || Ry, [v.duration, fe]),
    fn = K.useRef(0),
    x = K.useRef(0),
    L = K.useRef(0),
    V = K.useRef(null),
    [le, oe] = be.split("-"),
    de = K.useMemo(() => R.reduce(($e, ct, jt) => (jt >= Tn ? $e : $e + ct.height), 0), [R, Tn]),
    ue = uz(),
    _e = v.invert || y,
    Ve = ln === "loading";
  ((x.current = K.useMemo(() => Tn * ze + de, [Tn, de])),
    K.useEffect(() => {
      cn.current = ia;
    }, [ia]),
    K.useEffect(() => {
      J(!0);
    }, []),
    K.useEffect(() => {
      const $e = rn.current;
      if ($e) {
        const ct = $e.getBoundingClientRect().height;
        return (
          la(ct),
          w((jt) => [{ toastId: v.id, height: ct, position: v.position }, ...jt]),
          () => w((jt) => jt.filter((Vt) => Vt.toastId !== v.id))
        );
      }
    }, [w, v.id]),
    K.useLayoutEffect(() => {
      if (!q) return;
      const $e = rn.current,
        ct = $e.style.height;
      $e.style.height = "auto";
      const jt = $e.getBoundingClientRect().height;
      (($e.style.height = ct),
        la(jt),
        w((Vt) =>
          Vt.find((vt) => vt.toastId === v.id)
            ? Vt.map((vt) => (vt.toastId === v.id ? { ...vt, height: jt } : vt))
            : [{ toastId: v.id, height: jt, position: v.position }, ...Vt],
        ));
    }, [q, v.title, v.description, w, v.id, v.jsx, v.action, v.cancel]));
  const Je = K.useCallback(() => {
    (ve(!0),
      xt(x.current),
      w(($e) => $e.filter((ct) => ct.toastId !== v.id)),
      setTimeout(() => {
        $(v);
      }, wz));
  }, [v, $, w, x]);
  (K.useEffect(() => {
    if ((v.promise && ln === "loading") || v.duration === 1 / 0 || v.type === "loading") return;
    let $e;
    return (
      F || E || ue
        ? (() => {
            if (L.current < fn.current) {
              const Vt = new Date().getTime() - fn.current;
              cn.current = cn.current - Vt;
            }
            L.current = new Date().getTime();
          })()
        : cn.current !== 1 / 0 &&
          ((fn.current = new Date().getTime()),
          ($e = setTimeout(() => {
            (v.onAutoClose == null || v.onAutoClose.call(v, v), Je());
          }, cn.current))),
      () => clearTimeout($e)
    );
  }, [F, E, v, ln, ue, Je]),
    K.useEffect(() => {
      v.delete && (Je(), v.onDismiss == null || v.onDismiss.call(v, v));
    }, [Je, v.delete]));
  function Nt() {
    var $e;
    if (X?.loading) {
      var ct;
      return K.createElement(
        "div",
        {
          className: Ha(
            D?.loader,
            v == null || (ct = v.classNames) == null ? void 0 : ct.loader,
            "sonner-loader",
          ),
          "data-visible": ln === "loading",
        },
        X.loading,
      );
    }
    return K.createElement(az, {
      className: Ha(D?.loader, v == null || ($e = v.classNames) == null ? void 0 : $e.loader),
      visible: ln === "loading",
    });
  }
  const dn = v.icon || X?.[ln] || tz(ln);
  var It, Qt;
  return K.createElement(
    "li",
    {
      tabIndex: 0,
      ref: rn,
      className: Ha(
        Oe,
        Xt,
        D?.toast,
        v == null || (a = v.classNames) == null ? void 0 : a.toast,
        D?.default,
        D?.[ln],
        v == null || (r = v.classNames) == null ? void 0 : r[ln],
      ),
      "data-sonner-toast": "",
      "data-rich-colors": (It = v.richColors) != null ? It : G,
      "data-styled": !(v.jsx || v.unstyled || S),
      "data-mounted": q,
      "data-promise": !!v.promise,
      "data-swiped": an,
      "data-removed": ie,
      "data-visible": ka,
      "data-y-position": le,
      "data-x-position": oe,
      "data-index": j,
      "data-front": Na,
      "data-swiping": Me,
      "data-dismissible": Yn,
      "data-type": ln,
      "data-invert": _e,
      "data-swipe-out": Ne,
      "data-swipe-direction": O,
      "data-expanded": !!(F || (xe && q)),
      "data-testid": v.testId,
      style: {
        "--index": j,
        "--toasts-before": j,
        "--z-index": k.length - j,
        "--offset": `${ie ? St : x.current}px`,
        "--initial-height": xe ? "auto" : `${Ma}px`,
        ...ce,
        ...v.style,
      },
      onDragEnd: () => {
        (He(!1), Q(null), (V.current = null));
      },
      onPointerDown: ($e) => {
        $e.button !== 2 &&
          (Ve ||
            !Yn ||
            ((Sa.current = new Date()),
            xt(x.current),
            $e.target.setPointerCapture($e.pointerId),
            $e.target.tagName !== "BUTTON" &&
              (He(!0), (V.current = { x: $e.clientX, y: $e.clientY }))));
      },
      onPointerUp: () => {
        var $e, ct, jt;
        if (Ne || !Yn) return;
        V.current = null;
        const Vt = Number(
            (($e = rn.current) == null
              ? void 0
              : $e.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0,
          ),
          qn = Number(
            ((ct = rn.current) == null
              ? void 0
              : ct.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0,
          ),
          vt = new Date().getTime() - ((jt = Sa.current) == null ? void 0 : jt.getTime()),
          mn = ge === "x" ? Vt : qn,
          Pa = Math.abs(mn) / vt;
        if (Math.abs(mn) >= Ez || Pa > 0.11) {
          (xt(x.current),
            v.onDismiss == null || v.onDismiss.call(v, v),
            I(ge === "x" ? (Vt > 0 ? "right" : "left") : qn > 0 ? "down" : "up"),
            Je(),
            un(!0));
          return;
        } else {
          var En, A;
          ((En = rn.current) == null || En.style.setProperty("--swipe-amount-x", "0px"),
            (A = rn.current) == null || A.style.setProperty("--swipe-amount-y", "0px"));
        }
        (Ut(!1), He(!1), Q(null));
      },
      onPointerMove: ($e) => {
        var ct, jt, Vt;
        if (
          !V.current ||
          !Yn ||
          ((ct = window.getSelection()) == null ? void 0 : ct.toString().length) > 0
        )
          return;
        const vt = $e.clientY - V.current.y,
          mn = $e.clientX - V.current.x;
        var Pa;
        const En = (Pa = e.swipeDirections) != null ? Pa : xz(be);
        !ge && (Math.abs(mn) > 1 || Math.abs(vt) > 1) && Q(Math.abs(mn) > Math.abs(vt) ? "x" : "y");
        let A = { x: 0, y: 0 };
        const N = (B) => 1 / (1.5 + Math.abs(B) / 20);
        if (ge === "y") {
          if (En.includes("top") || En.includes("bottom"))
            if ((En.includes("top") && vt < 0) || (En.includes("bottom") && vt > 0)) A.y = vt;
            else {
              const B = vt * N(vt);
              A.y = Math.abs(B) < Math.abs(vt) ? B : vt;
            }
        } else if (ge === "x" && (En.includes("left") || En.includes("right")))
          if ((En.includes("left") && mn < 0) || (En.includes("right") && mn > 0)) A.x = mn;
          else {
            const B = mn * N(mn);
            A.x = Math.abs(B) < Math.abs(mn) ? B : mn;
          }
        ((Math.abs(A.x) > 0 || Math.abs(A.y) > 0) && Ut(!0),
          (jt = rn.current) == null || jt.style.setProperty("--swipe-amount-x", `${A.x}px`),
          (Vt = rn.current) == null || Vt.style.setProperty("--swipe-amount-y", `${A.y}px`));
      },
    },
    vr && !v.jsx && ln !== "loading"
      ? K.createElement(
          "button",
          {
            "aria-label": pe,
            "data-disabled": Ve,
            "data-close-button": !0,
            onClick:
              Ve || !Yn
                ? () => {}
                : () => {
                    (Je(), v.onDismiss == null || v.onDismiss.call(v, v));
                  },
            className: Ha(
              D?.closeButton,
              v == null || (i = v.classNames) == null ? void 0 : i.closeButton,
            ),
          },
          (Qt = X?.close) != null ? Qt : sz,
        )
      : null,
    (ln || v.icon || v.promise) && v.icon !== null && (X?.[ln] !== null || v.icon)
      ? K.createElement(
          "div",
          {
            "data-icon": "",
            className: Ha(D?.icon, v == null || (s = v.classNames) == null ? void 0 : s.icon),
          },
          v.promise || (v.type === "loading" && !v.icon) ? v.icon || Nt() : null,
          v.type !== "loading" ? dn : null,
        )
      : null,
    K.createElement(
      "div",
      {
        "data-content": "",
        className: Ha(D?.content, v == null || (u = v.classNames) == null ? void 0 : u.content),
      },
      K.createElement(
        "div",
        {
          "data-title": "",
          className: Ha(D?.title, v == null || (c = v.classNames) == null ? void 0 : c.title),
        },
        v.jsx ? v.jsx : typeof v.title == "function" ? v.title() : v.title,
      ),
      v.description
        ? K.createElement(
            "div",
            {
              "data-description": "",
              className: Ha(
                Be,
                Fn,
                D?.description,
                v == null || (h = v.classNames) == null ? void 0 : h.description,
              ),
            },
            typeof v.description == "function" ? v.description() : v.description,
          )
        : null,
    ),
    K.isValidElement(v.cancel)
      ? v.cancel
      : v.cancel && lu(v.cancel)
        ? K.createElement(
            "button",
            {
              "data-button": !0,
              "data-cancel": !0,
              style: v.cancelButtonStyle || T,
              onClick: ($e) => {
                lu(v.cancel) &&
                  Yn &&
                  (v.cancel.onClick == null || v.cancel.onClick.call(v.cancel, $e), Je());
              },
              className: Ha(
                D?.cancelButton,
                v == null || (p = v.classNames) == null ? void 0 : p.cancelButton,
              ),
            },
            v.cancel.label,
          )
        : null,
    K.isValidElement(v.action)
      ? v.action
      : v.action && lu(v.action)
        ? K.createElement(
            "button",
            {
              "data-button": !0,
              "data-action": !0,
              style: v.actionButtonStyle || me,
              onClick: ($e) => {
                lu(v.action) &&
                  (v.action.onClick == null || v.action.onClick.call(v.action, $e),
                  !$e.defaultPrevented && Je());
              },
              className: Ha(
                D?.actionButton,
                v == null || (m = v.classNames) == null ? void 0 : m.actionButton,
              ),
            },
            v.action.label,
          )
        : null,
  );
};
function zy() {
  if (typeof window > "u" || typeof document > "u") return "ltr";
  const e = document.documentElement.getAttribute("dir");
  return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function zz(e, a) {
  const r = {};
  return (
    [e, a].forEach((i, s) => {
      const u = s === 1,
        c = u ? "--mobile-offset" : "--offset",
        h = u ? bz : yz;
      function p(m) {
        ["top", "right", "bottom", "left"].forEach((y) => {
          r[`${c}-${y}`] = typeof m == "number" ? `${m}px` : m;
        });
      }
      typeof i == "number" || typeof i == "string"
        ? p(i)
        : typeof i == "object"
          ? ["top", "right", "bottom", "left"].forEach((m) => {
              i[m] === void 0
                ? (r[`${c}-${m}`] = h)
                : (r[`${c}-${m}`] = typeof i[m] == "number" ? `${i[m]}px` : i[m]);
            })
          : p(h);
    }),
    r
  );
}
const Tz = K.forwardRef(function (a, r) {
  const {
      id: i,
      invert: s,
      position: u = "bottom-right",
      hotkey: c = ["altKey", "KeyT"],
      expand: h,
      closeButton: p,
      className: m,
      offset: y,
      mobileOffset: v,
      theme: S = "light",
      richColors: E,
      duration: w,
      style: z,
      visibleToasts: R = gz,
      toastOptions: j,
      dir: k = zy(),
      gap: F = Sz,
      icons: $,
      containerAriaLabel: G = "Notifications",
    } = a,
    [he, ce] = K.useState([]),
    T = K.useMemo(
      () => (i ? he.filter((q) => q.toasterId === i) : he.filter((q) => !q.toasterId)),
      [he, i],
    ),
    me = K.useMemo(
      () => Array.from(new Set([u].concat(T.filter((q) => q.position).map((q) => q.position)))),
      [T, u],
    ),
    [Oe, Be] = K.useState([]),
    [fe, be] = K.useState(!1),
    [ze, xe] = K.useState(!1),
    [D, X] = K.useState(
      S !== "system"
        ? S
        : typeof window < "u" &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
    ),
    pe = K.useRef(null),
    ge = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
    Q = K.useRef(null),
    O = K.useRef(!1),
    I = K.useCallback((q) => {
      ce((J) => {
        var ie;
        return (
          ((ie = J.find((ve) => ve.id === q.id)) != null && ie.delete) || Hn.dismiss(q.id),
          J.filter(({ id: ve }) => ve !== q.id)
        );
      });
    }, []);
  return (
    K.useEffect(
      () =>
        Hn.subscribe((q) => {
          if (q.dismiss) {
            requestAnimationFrame(() => {
              ce((J) => J.map((ie) => (ie.id === q.id ? { ...ie, delete: !0 } : ie)));
            });
            return;
          }
          setTimeout(() => {
            DR.flushSync(() => {
              ce((J) => {
                const ie = J.findIndex((ve) => ve.id === q.id);
                return ie !== -1
                  ? [...J.slice(0, ie), { ...J[ie], ...q }, ...J.slice(ie + 1)]
                  : [q, ...J];
              });
            });
          });
        }),
      [he],
    ),
    K.useEffect(() => {
      if (S !== "system") {
        X(S);
        return;
      }
      if (
        (S === "system" &&
          (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
            ? X("dark")
            : X("light")),
        typeof window > "u")
      )
        return;
      const q = window.matchMedia("(prefers-color-scheme: dark)");
      try {
        q.addEventListener("change", ({ matches: J }) => {
          X(J ? "dark" : "light");
        });
      } catch {
        q.addListener(({ matches: ie }) => {
          try {
            X(ie ? "dark" : "light");
          } catch (ve) {
            console.error(ve);
          }
        });
      }
    }, [S]),
    K.useEffect(() => {
      he.length <= 1 && be(!1);
    }, [he]),
    K.useEffect(() => {
      const q = (J) => {
        var ie;
        if (c.every((He) => J[He] || J.code === He)) {
          var Me;
          (be(!0), (Me = pe.current) == null || Me.focus());
        }
        J.code === "Escape" &&
          (document.activeElement === pe.current ||
            ((ie = pe.current) != null && ie.contains(document.activeElement))) &&
          be(!1);
      };
      return (
        document.addEventListener("keydown", q), () => document.removeEventListener("keydown", q)
      );
    }, [c]),
    K.useEffect(() => {
      if (pe.current)
        return () => {
          Q.current &&
            (Q.current.focus({ preventScroll: !0 }), (Q.current = null), (O.current = !1));
        };
    }, [pe.current]),
    K.createElement(
      "section",
      {
        ref: r,
        "aria-label": `${G} ${ge}`,
        tabIndex: -1,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false",
        suppressHydrationWarning: !0,
      },
      me.map((q, J) => {
        var ie;
        const [ve, Me] = q.split("-");
        return T.length
          ? K.createElement(
              "ol",
              {
                key: q,
                dir: k === "auto" ? zy() : k,
                tabIndex: -1,
                ref: pe,
                className: m,
                "data-sonner-toaster": !0,
                "data-sonner-theme": D,
                "data-y-position": ve,
                "data-x-position": Me,
                style: {
                  "--front-toast-height": `${((ie = Oe[0]) == null ? void 0 : ie.height) || 0}px`,
                  "--width": `${_z}px`,
                  "--gap": `${F}px`,
                  ...z,
                  ...zz(y, v),
                },
                onBlur: (He) => {
                  O.current &&
                    !He.currentTarget.contains(He.relatedTarget) &&
                    ((O.current = !1),
                    Q.current && (Q.current.focus({ preventScroll: !0 }), (Q.current = null)));
                },
                onFocus: (He) => {
                  (He.target instanceof HTMLElement && He.target.dataset.dismissible === "false") ||
                    O.current ||
                    ((O.current = !0), (Q.current = He.relatedTarget));
                },
                onMouseEnter: () => be(!0),
                onMouseMove: () => be(!0),
                onMouseLeave: () => {
                  ze || be(!1);
                },
                onDragEnd: () => be(!1),
                onPointerDown: (He) => {
                  (He.target instanceof HTMLElement && He.target.dataset.dismissible === "false") ||
                    xe(!0);
                },
                onPointerUp: () => xe(!1),
              },
              T.filter((He) => (!He.position && J === 0) || He.position === q).map((He, Ne) => {
                var un, an;
                return K.createElement(Rz, {
                  key: He.id,
                  icons: $,
                  index: Ne,
                  toast: He,
                  defaultRichColors: E,
                  duration: (un = j?.duration) != null ? un : w,
                  className: j?.className,
                  descriptionClassName: j?.descriptionClassName,
                  invert: s,
                  visibleToasts: R,
                  closeButton: (an = j?.closeButton) != null ? an : p,
                  interacting: ze,
                  position: q,
                  style: j?.style,
                  unstyled: j?.unstyled,
                  classNames: j?.classNames,
                  cancelButtonStyle: j?.cancelButtonStyle,
                  actionButtonStyle: j?.actionButtonStyle,
                  closeButtonAriaLabel: j?.closeButtonAriaLabel,
                  removeToast: I,
                  toasts: T.filter((Ut) => Ut.position == He.position),
                  heights: Oe.filter((Ut) => Ut.position == He.position),
                  setHeights: Be,
                  expandByDefault: h,
                  gap: F,
                  expanded: fe,
                  swipeDirections: a.swipeDirections,
                });
              }),
            )
          : null;
      }),
    )
  );
});
function $0(e) {
  var a,
    r,
    i = "";
  if (typeof e == "string" || typeof e == "number") i += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var s = e.length;
      for (a = 0; a < s; a++) e[a] && (r = $0(e[a])) && (i && (i += " "), (i += r));
    } else for (r in e) e[r] && (i && (i += " "), (i += r));
  return i;
}
function Y0() {
  for (var e, a, r = 0, i = "", s = arguments.length; r < s; r++)
    (e = arguments[r]) && (a = $0(e)) && (i && (i += " "), (i += a));
  return i;
}
const Az = (e, a) => {
    const r = new Array(e.length + a.length);
    for (let i = 0; i < e.length; i++) r[i] = e[i];
    for (let i = 0; i < a.length; i++) r[e.length + i] = a[i];
    return r;
  },
  Oz = (e, a) => ({ classGroupId: e, validator: a }),
  F0 = (e = new Map(), a = null, r) => ({ nextPart: e, validators: a, classGroupId: r }),
  Mu = "-",
  Ty = [],
  Cz = "arbitrary..",
  Dz = (e) => {
    const a = Nz(e),
      { conflictingClassGroups: r, conflictingClassGroupModifiers: i } = e;
    return {
      getClassGroupId: (c) => {
        if (c.startsWith("[") && c.endsWith("]")) return Mz(c);
        const h = c.split(Mu),
          p = h[0] === "" && h.length > 1 ? 1 : 0;
        return q0(h, p, a);
      },
      getConflictingClassGroupIds: (c, h) => {
        if (h) {
          const p = i[c],
            m = r[c];
          return p ? (m ? Az(m, p) : p) : m || Ty;
        }
        return r[c] || Ty;
      },
    };
  },
  q0 = (e, a, r) => {
    if (e.length - a === 0) return r.classGroupId;
    const s = e[a],
      u = r.nextPart.get(s);
    if (u) {
      const m = q0(e, a + 1, u);
      if (m) return m;
    }
    const c = r.validators;
    if (c === null) return;
    const h = a === 0 ? e.join(Mu) : e.slice(a).join(Mu),
      p = c.length;
    for (let m = 0; m < p; m++) {
      const y = c[m];
      if (y.validator(h)) return y.classGroupId;
    }
  },
  Mz = (e) =>
    e.slice(1, -1).indexOf(":") === -1
      ? void 0
      : (() => {
          const a = e.slice(1, -1),
            r = a.indexOf(":"),
            i = a.slice(0, r);
          return i ? Cz + i : void 0;
        })(),
  Nz = (e) => {
    const { theme: a, classGroups: r } = e;
    return kz(r, a);
  },
  kz = (e, a) => {
    const r = F0();
    for (const i in e) {
      const s = e[i];
      Ch(s, r, i, a);
    }
    return r;
  },
  Ch = (e, a, r, i) => {
    const s = e.length;
    for (let u = 0; u < s; u++) {
      const c = e[u];
      Lz(c, a, r, i);
    }
  },
  Lz = (e, a, r, i) => {
    if (typeof e == "string") {
      Uz(e, a, r);
      return;
    }
    if (typeof e == "function") {
      jz(e, a, r, i);
      return;
    }
    Vz(e, a, r, i);
  },
  Uz = (e, a, r) => {
    const i = e === "" ? a : G0(a, e);
    i.classGroupId = r;
  },
  jz = (e, a, r, i) => {
    if (Bz(e)) {
      Ch(e(i), a, r, i);
      return;
    }
    (a.validators === null && (a.validators = []), a.validators.push(Oz(r, e)));
  },
  Vz = (e, a, r, i) => {
    const s = Object.entries(e),
      u = s.length;
    for (let c = 0; c < u; c++) {
      const [h, p] = s[c];
      Ch(p, G0(a, h), r, i);
    }
  },
  G0 = (e, a) => {
    let r = e;
    const i = a.split(Mu),
      s = i.length;
    for (let u = 0; u < s; u++) {
      const c = i[u];
      let h = r.nextPart.get(c);
      (h || ((h = F0()), r.nextPart.set(c, h)), (r = h));
    }
    return r;
  },
  Bz = (e) => "isThemeGetter" in e && e.isThemeGetter === !0,
  Hz = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} };
    let a = 0,
      r = Object.create(null),
      i = Object.create(null);
    const s = (u, c) => {
      ((r[u] = c), a++, a > e && ((a = 0), (i = r), (r = Object.create(null))));
    };
    return {
      get(u) {
        let c = r[u];
        if (c !== void 0) return c;
        if ((c = i[u]) !== void 0) return (s(u, c), c);
      },
      set(u, c) {
        u in r ? (r[u] = c) : s(u, c);
      },
    };
  },
  Qd = "!",
  Ay = ":",
  Zz = [],
  Oy = (e, a, r, i, s) => ({
    modifiers: e,
    hasImportantModifier: a,
    baseClassName: r,
    maybePostfixModifierPosition: i,
    isExternal: s,
  }),
  $z = (e) => {
    const { prefix: a, experimentalParseClassName: r } = e;
    let i = (s) => {
      const u = [];
      let c = 0,
        h = 0,
        p = 0,
        m;
      const y = s.length;
      for (let z = 0; z < y; z++) {
        const R = s[z];
        if (c === 0 && h === 0) {
          if (R === Ay) {
            (u.push(s.slice(p, z)), (p = z + 1));
            continue;
          }
          if (R === "/") {
            m = z;
            continue;
          }
        }
        R === "[" ? c++ : R === "]" ? c-- : R === "(" ? h++ : R === ")" && h--;
      }
      const v = u.length === 0 ? s : s.slice(p);
      let S = v,
        E = !1;
      v.endsWith(Qd)
        ? ((S = v.slice(0, -1)), (E = !0))
        : v.startsWith(Qd) && ((S = v.slice(1)), (E = !0));
      const w = m && m > p ? m - p : void 0;
      return Oy(u, E, S, w);
    };
    if (a) {
      const s = a + Ay,
        u = i;
      i = (c) => (c.startsWith(s) ? u(c.slice(s.length)) : Oy(Zz, !1, c, void 0, !0));
    }
    if (r) {
      const s = i;
      i = (u) => r({ className: u, parseClassName: s });
    }
    return i;
  },
  Yz = (e) => {
    const a = new Map();
    return (
      e.orderSensitiveModifiers.forEach((r, i) => {
        a.set(r, 1e6 + i);
      }),
      (r) => {
        const i = [];
        let s = [];
        for (let u = 0; u < r.length; u++) {
          const c = r[u],
            h = c[0] === "[",
            p = a.has(c);
          h || p ? (s.length > 0 && (s.sort(), i.push(...s), (s = [])), i.push(c)) : s.push(c);
        }
        return (s.length > 0 && (s.sort(), i.push(...s)), i);
      }
    );
  },
  Fz = (e) => ({
    cache: Hz(e.cacheSize),
    parseClassName: $z(e),
    sortModifiers: Yz(e),
    postfixLookupClassGroupIds: qz(e),
    ...Dz(e),
  }),
  qz = (e) => {
    const a = Object.create(null),
      r = e.postfixLookupClassGroups;
    if (r) for (let i = 0; i < r.length; i++) a[r[i]] = !0;
    return a;
  },
  Gz = /\s+/,
  Pz = (e, a) => {
    const {
        parseClassName: r,
        getClassGroupId: i,
        getConflictingClassGroupIds: s,
        sortModifiers: u,
        postfixLookupClassGroupIds: c,
      } = a,
      h = [],
      p = e.trim().split(Gz);
    let m = "";
    for (let y = p.length - 1; y >= 0; y -= 1) {
      const v = p[y],
        {
          isExternal: S,
          modifiers: E,
          hasImportantModifier: w,
          baseClassName: z,
          maybePostfixModifierPosition: R,
        } = r(v);
      if (S) {
        m = v + (m.length > 0 ? " " + m : m);
        continue;
      }
      let j = !!R,
        k;
      if (j) {
        const ce = z.substring(0, R);
        k = i(ce);
        const T = k && c[k] ? i(z) : void 0;
        T && T !== k && ((k = T), (j = !1));
      } else k = i(z);
      if (!k) {
        if (!j) {
          m = v + (m.length > 0 ? " " + m : m);
          continue;
        }
        if (((k = i(z)), !k)) {
          m = v + (m.length > 0 ? " " + m : m);
          continue;
        }
        j = !1;
      }
      const F = E.length === 0 ? "" : E.length === 1 ? E[0] : u(E).join(":"),
        $ = w ? F + Qd : F,
        G = $ + k;
      if (h.indexOf(G) > -1) continue;
      h.push(G);
      const he = s(k, j);
      for (let ce = 0; ce < he.length; ++ce) {
        const T = he[ce];
        h.push($ + T);
      }
      m = v + (m.length > 0 ? " " + m : m);
    }
    return m;
  },
  Xz = (...e) => {
    let a = 0,
      r,
      i,
      s = "";
    for (; a < e.length; ) (r = e[a++]) && (i = P0(r)) && (s && (s += " "), (s += i));
    return s;
  },
  P0 = (e) => {
    if (typeof e == "string") return e;
    let a,
      r = "";
    for (let i = 0; i < e.length; i++) e[i] && (a = P0(e[i])) && (r && (r += " "), (r += a));
    return r;
  },
  Iz = (e, ...a) => {
    let r, i, s, u;
    const c = (p) => {
        const m = a.reduce((y, v) => v(y), e());
        return ((r = Fz(m)), (i = r.cache.get), (s = r.cache.set), (u = h), h(p));
      },
      h = (p) => {
        const m = i(p);
        if (m) return m;
        const y = Pz(p, r);
        return (s(p, y), y);
      };
    return ((u = c), (...p) => u(Xz(...p)));
  },
  Qz = [],
  sn = (e) => {
    const a = (r) => r[e] || Qz;
    return ((a.isThemeGetter = !0), a);
  },
  X0 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  I0 = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Kz = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  Jz = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Wz =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  eT = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  tT = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  nT =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Zr = (e) => Kz.test(e),
  Qe = (e) => !!e && !Number.isNaN(Number(e)),
  Za = (e) => !!e && Number.isInteger(Number(e)),
  Td = (e) => e.endsWith("%") && Qe(e.slice(0, -1)),
  mr = (e) => Jz.test(e),
  Q0 = () => !0,
  aT = (e) => Wz.test(e) && !eT.test(e),
  Dh = () => !1,
  rT = (e) => tT.test(e),
  lT = (e) => nT.test(e),
  iT = (e) => !Re(e) && !Ae(e),
  oT = (e) =>
    e.startsWith("@container") &&
    ((e[10] === "/" && e[11] !== void 0) ||
      (e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10)) ||
      (e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10))),
  sT = (e) => Ir(e, W0, Dh),
  Re = (e) => X0.test(e),
  pl = (e) => Ir(e, e_, aT),
  Cy = (e) => Ir(e, vT, Qe),
  uT = (e) => Ir(e, n_, Q0),
  cT = (e) => Ir(e, t_, Dh),
  Dy = (e) => Ir(e, K0, Dh),
  fT = (e) => Ir(e, J0, lT),
  iu = (e) => Ir(e, a_, rT),
  Ae = (e) => I0.test(e),
  wo = (e) => xl(e, e_),
  dT = (e) => xl(e, t_),
  My = (e) => xl(e, K0),
  hT = (e) => xl(e, W0),
  mT = (e) => xl(e, J0),
  ou = (e) => xl(e, a_, !0),
  pT = (e) => xl(e, n_, !0),
  Ir = (e, a, r) => {
    const i = X0.exec(e);
    return i ? (i[1] ? a(i[1]) : r(i[2])) : !1;
  },
  xl = (e, a, r = !1) => {
    const i = I0.exec(e);
    return i ? (i[1] ? a(i[1]) : r) : !1;
  },
  K0 = (e) => e === "position" || e === "percentage",
  J0 = (e) => e === "image" || e === "url",
  W0 = (e) => e === "length" || e === "size" || e === "bg-size",
  e_ = (e) => e === "length",
  vT = (e) => e === "number",
  t_ = (e) => e === "family-name",
  n_ = (e) => e === "number" || e === "weight",
  a_ = (e) => e === "shadow",
  gT = () => {
    const e = sn("color"),
      a = sn("font"),
      r = sn("text"),
      i = sn("font-weight"),
      s = sn("tracking"),
      u = sn("leading"),
      c = sn("breakpoint"),
      h = sn("container"),
      p = sn("spacing"),
      m = sn("radius"),
      y = sn("shadow"),
      v = sn("inset-shadow"),
      S = sn("text-shadow"),
      E = sn("drop-shadow"),
      w = sn("blur"),
      z = sn("perspective"),
      R = sn("aspect"),
      j = sn("ease"),
      k = sn("animate"),
      F = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
      $ = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      G = () => [...$(), Ae, Re],
      he = () => ["auto", "hidden", "clip", "visible", "scroll"],
      ce = () => ["auto", "contain", "none"],
      T = () => [Ae, Re, p],
      me = () => [Zr, "full", "auto", ...T()],
      Oe = () => [Za, "none", "subgrid", Ae, Re],
      Be = () => ["auto", { span: ["full", Za, Ae, Re] }, Za, Ae, Re],
      fe = () => [Za, "auto", Ae, Re],
      be = () => ["auto", "min", "max", "fr", Ae, Re],
      ze = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      xe = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"],
      D = () => ["auto", ...T()],
      X = () => [
        Zr,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...T(),
      ],
      pe = () => [Zr, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...T()],
      ge = () => [Zr, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...T()],
      Q = () => [e, Ae, Re],
      O = () => [...$(), My, Dy, { position: [Ae, Re] }],
      I = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      q = () => ["auto", "cover", "contain", hT, sT, { size: [Ae, Re] }],
      J = () => [Td, wo, pl],
      ie = () => ["", "none", "full", m, Ae, Re],
      ve = () => ["", Qe, wo, pl],
      Me = () => ["solid", "dashed", "dotted", "double"],
      He = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      Ne = () => [Qe, Td, My, Dy],
      un = () => ["", "none", w, Ae, Re],
      an = () => ["none", Qe, Ae, Re],
      Ut = () => ["none", Qe, Ae, Re],
      St = () => [Qe, Ae, Re],
      xt = () => [Zr, "full", ...T()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [mr],
        breakpoint: [mr],
        color: [Q0],
        container: [mr],
        "drop-shadow": [mr],
        ease: ["in", "out", "in-out"],
        font: [iT],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [mr],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
        radius: [mr],
        shadow: [mr],
        spacing: ["px", Qe],
        text: [mr],
        "text-shadow": [mr],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", Zr, Re, Ae, R] }],
        container: ["container"],
        "container-type": [{ "@container": ["", "normal", "size", Ae, Re] }],
        "container-named": [oT],
        columns: [{ columns: [Qe, Re, Ae, h] }],
        "break-after": [{ "break-after": F() }],
        "break-before": [{ "break-before": F() }],
        "break-inside": [{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] }],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [{ object: ["contain", "cover", "fill", "none", "scale-down"] }],
        "object-position": [{ object: G() }],
        overflow: [{ overflow: he() }],
        "overflow-x": [{ "overflow-x": he() }],
        "overflow-y": [{ "overflow-y": he() }],
        overscroll: [{ overscroll: ce() }],
        "overscroll-x": [{ "overscroll-x": ce() }],
        "overscroll-y": [{ "overscroll-y": ce() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: me() }],
        "inset-x": [{ "inset-x": me() }],
        "inset-y": [{ "inset-y": me() }],
        start: [{ "inset-s": me(), start: me() }],
        end: [{ "inset-e": me(), end: me() }],
        "inset-bs": [{ "inset-bs": me() }],
        "inset-be": [{ "inset-be": me() }],
        top: [{ top: me() }],
        right: [{ right: me() }],
        bottom: [{ bottom: me() }],
        left: [{ left: me() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [Za, "auto", Ae, Re] }],
        basis: [{ basis: [Zr, "full", "auto", h, ...T()] }],
        "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [Qe, Zr, "auto", "initial", "none", Re] }],
        grow: [{ grow: ["", Qe, Ae, Re] }],
        shrink: [{ shrink: ["", Qe, Ae, Re] }],
        order: [{ order: [Za, "first", "last", "none", Ae, Re] }],
        "grid-cols": [{ "grid-cols": Oe() }],
        "col-start-end": [{ col: Be() }],
        "col-start": [{ "col-start": fe() }],
        "col-end": [{ "col-end": fe() }],
        "grid-rows": [{ "grid-rows": Oe() }],
        "row-start-end": [{ row: Be() }],
        "row-start": [{ "row-start": fe() }],
        "row-end": [{ "row-end": fe() }],
        "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
        "auto-cols": [{ "auto-cols": be() }],
        "auto-rows": [{ "auto-rows": be() }],
        gap: [{ gap: T() }],
        "gap-x": [{ "gap-x": T() }],
        "gap-y": [{ "gap-y": T() }],
        "justify-content": [{ justify: [...ze(), "normal"] }],
        "justify-items": [{ "justify-items": [...xe(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...xe()] }],
        "align-content": [{ content: ["normal", ...ze()] }],
        "align-items": [{ items: [...xe(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...xe(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": ze() }],
        "place-items": [{ "place-items": [...xe(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...xe()] }],
        p: [{ p: T() }],
        px: [{ px: T() }],
        py: [{ py: T() }],
        ps: [{ ps: T() }],
        pe: [{ pe: T() }],
        pbs: [{ pbs: T() }],
        pbe: [{ pbe: T() }],
        pt: [{ pt: T() }],
        pr: [{ pr: T() }],
        pb: [{ pb: T() }],
        pl: [{ pl: T() }],
        m: [{ m: D() }],
        mx: [{ mx: D() }],
        my: [{ my: D() }],
        ms: [{ ms: D() }],
        me: [{ me: D() }],
        mbs: [{ mbs: D() }],
        mbe: [{ mbe: D() }],
        mt: [{ mt: D() }],
        mr: [{ mr: D() }],
        mb: [{ mb: D() }],
        ml: [{ ml: D() }],
        "space-x": [{ "space-x": T() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": T() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: X() }],
        "inline-size": [{ inline: ["auto", ...pe()] }],
        "min-inline-size": [{ "min-inline": ["auto", ...pe()] }],
        "max-inline-size": [{ "max-inline": ["none", ...pe()] }],
        "block-size": [{ block: ["auto", ...ge()] }],
        "min-block-size": [{ "min-block": ["auto", ...ge()] }],
        "max-block-size": [{ "max-block": ["none", ...ge()] }],
        w: [{ w: [h, "screen", ...X()] }],
        "min-w": [{ "min-w": [h, "screen", "none", ...X()] }],
        "max-w": [{ "max-w": [h, "screen", "none", "prose", { screen: [c] }, ...X()] }],
        h: [{ h: ["screen", "lh", ...X()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...X()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...X()] }],
        "font-size": [{ text: ["base", r, wo, pl] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [i, pT, uT] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              Td,
              Re,
            ],
          },
        ],
        "font-family": [{ font: [dT, cT, a] }],
        "font-features": [{ "font-features": [Re] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [s, Ae, Re] }],
        "line-clamp": [{ "line-clamp": [Qe, "none", Ae, Cy] }],
        leading: [{ leading: [u, ...T()] }],
        "list-image": [{ "list-image": ["none", Ae, Re] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", Ae, Re] }],
        "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
        "placeholder-color": [{ placeholder: Q() }],
        "text-color": [{ text: Q() }],
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        "text-decoration-style": [{ decoration: [...Me(), "wavy"] }],
        "text-decoration-thickness": [{ decoration: [Qe, "from-font", "auto", Ae, pl] }],
        "text-decoration-color": [{ decoration: Q() }],
        "underline-offset": [{ "underline-offset": [Qe, "auto", Ae, Re] }],
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: T() }],
        "tab-size": [{ tab: [Za, Ae, Re] }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              Ae,
              Re,
            ],
          },
        ],
        whitespace: [
          { whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", Ae, Re] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: O() }],
        "bg-repeat": [{ bg: I() }],
        "bg-size": [{ bg: q() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [{ to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, Za, Ae, Re],
                radial: ["", Ae, Re],
                conic: [Za, Ae, Re],
              },
              mT,
              fT,
            ],
          },
        ],
        "bg-color": [{ bg: Q() }],
        "gradient-from-pos": [{ from: J() }],
        "gradient-via-pos": [{ via: J() }],
        "gradient-to-pos": [{ to: J() }],
        "gradient-from": [{ from: Q() }],
        "gradient-via": [{ via: Q() }],
        "gradient-to": [{ to: Q() }],
        rounded: [{ rounded: ie() }],
        "rounded-s": [{ "rounded-s": ie() }],
        "rounded-e": [{ "rounded-e": ie() }],
        "rounded-t": [{ "rounded-t": ie() }],
        "rounded-r": [{ "rounded-r": ie() }],
        "rounded-b": [{ "rounded-b": ie() }],
        "rounded-l": [{ "rounded-l": ie() }],
        "rounded-ss": [{ "rounded-ss": ie() }],
        "rounded-se": [{ "rounded-se": ie() }],
        "rounded-ee": [{ "rounded-ee": ie() }],
        "rounded-es": [{ "rounded-es": ie() }],
        "rounded-tl": [{ "rounded-tl": ie() }],
        "rounded-tr": [{ "rounded-tr": ie() }],
        "rounded-br": [{ "rounded-br": ie() }],
        "rounded-bl": [{ "rounded-bl": ie() }],
        "border-w": [{ border: ve() }],
        "border-w-x": [{ "border-x": ve() }],
        "border-w-y": [{ "border-y": ve() }],
        "border-w-s": [{ "border-s": ve() }],
        "border-w-e": [{ "border-e": ve() }],
        "border-w-bs": [{ "border-bs": ve() }],
        "border-w-be": [{ "border-be": ve() }],
        "border-w-t": [{ "border-t": ve() }],
        "border-w-r": [{ "border-r": ve() }],
        "border-w-b": [{ "border-b": ve() }],
        "border-w-l": [{ "border-l": ve() }],
        "divide-x": [{ "divide-x": ve() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": ve() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...Me(), "hidden", "none"] }],
        "divide-style": [{ divide: [...Me(), "hidden", "none"] }],
        "border-color": [{ border: Q() }],
        "border-color-x": [{ "border-x": Q() }],
        "border-color-y": [{ "border-y": Q() }],
        "border-color-s": [{ "border-s": Q() }],
        "border-color-e": [{ "border-e": Q() }],
        "border-color-bs": [{ "border-bs": Q() }],
        "border-color-be": [{ "border-be": Q() }],
        "border-color-t": [{ "border-t": Q() }],
        "border-color-r": [{ "border-r": Q() }],
        "border-color-b": [{ "border-b": Q() }],
        "border-color-l": [{ "border-l": Q() }],
        "divide-color": [{ divide: Q() }],
        "outline-style": [{ outline: [...Me(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [Qe, Ae, Re] }],
        "outline-w": [{ outline: ["", Qe, wo, pl] }],
        "outline-color": [{ outline: Q() }],
        shadow: [{ shadow: ["", "none", y, ou, iu] }],
        "shadow-color": [{ shadow: Q() }],
        "inset-shadow": [{ "inset-shadow": ["none", v, ou, iu] }],
        "inset-shadow-color": [{ "inset-shadow": Q() }],
        "ring-w": [{ ring: ve() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: Q() }],
        "ring-offset-w": [{ "ring-offset": [Qe, pl] }],
        "ring-offset-color": [{ "ring-offset": Q() }],
        "inset-ring-w": [{ "inset-ring": ve() }],
        "inset-ring-color": [{ "inset-ring": Q() }],
        "text-shadow": [{ "text-shadow": ["none", S, ou, iu] }],
        "text-shadow-color": [{ "text-shadow": Q() }],
        opacity: [{ opacity: [Qe, Ae, Re] }],
        "mix-blend": [{ "mix-blend": [...He(), "plus-darker", "plus-lighter"] }],
        "bg-blend": [{ "bg-blend": He() }],
        "mask-clip": [
          { "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"] },
          "mask-no-clip",
        ],
        "mask-composite": [{ mask: ["add", "subtract", "intersect", "exclude"] }],
        "mask-image-linear-pos": [{ "mask-linear": [Qe] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": Ne() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": Ne() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": Q() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": Q() }],
        "mask-image-t-from-pos": [{ "mask-t-from": Ne() }],
        "mask-image-t-to-pos": [{ "mask-t-to": Ne() }],
        "mask-image-t-from-color": [{ "mask-t-from": Q() }],
        "mask-image-t-to-color": [{ "mask-t-to": Q() }],
        "mask-image-r-from-pos": [{ "mask-r-from": Ne() }],
        "mask-image-r-to-pos": [{ "mask-r-to": Ne() }],
        "mask-image-r-from-color": [{ "mask-r-from": Q() }],
        "mask-image-r-to-color": [{ "mask-r-to": Q() }],
        "mask-image-b-from-pos": [{ "mask-b-from": Ne() }],
        "mask-image-b-to-pos": [{ "mask-b-to": Ne() }],
        "mask-image-b-from-color": [{ "mask-b-from": Q() }],
        "mask-image-b-to-color": [{ "mask-b-to": Q() }],
        "mask-image-l-from-pos": [{ "mask-l-from": Ne() }],
        "mask-image-l-to-pos": [{ "mask-l-to": Ne() }],
        "mask-image-l-from-color": [{ "mask-l-from": Q() }],
        "mask-image-l-to-color": [{ "mask-l-to": Q() }],
        "mask-image-x-from-pos": [{ "mask-x-from": Ne() }],
        "mask-image-x-to-pos": [{ "mask-x-to": Ne() }],
        "mask-image-x-from-color": [{ "mask-x-from": Q() }],
        "mask-image-x-to-color": [{ "mask-x-to": Q() }],
        "mask-image-y-from-pos": [{ "mask-y-from": Ne() }],
        "mask-image-y-to-pos": [{ "mask-y-to": Ne() }],
        "mask-image-y-from-color": [{ "mask-y-from": Q() }],
        "mask-image-y-to-color": [{ "mask-y-to": Q() }],
        "mask-image-radial": [{ "mask-radial": [Ae, Re] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": Ne() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": Ne() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": Q() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": Q() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          { "mask-radial": [{ closest: ["side", "corner"], farthest: ["side", "corner"] }] },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": $() }],
        "mask-image-conic-pos": [{ "mask-conic": [Qe] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": Ne() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": Ne() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": Q() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": Q() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          { "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"] },
        ],
        "mask-position": [{ mask: O() }],
        "mask-repeat": [{ mask: I() }],
        "mask-size": [{ mask: q() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", Ae, Re] }],
        filter: [{ filter: ["", "none", Ae, Re] }],
        blur: [{ blur: un() }],
        brightness: [{ brightness: [Qe, Ae, Re] }],
        contrast: [{ contrast: [Qe, Ae, Re] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", E, ou, iu] }],
        "drop-shadow-color": [{ "drop-shadow": Q() }],
        grayscale: [{ grayscale: ["", Qe, Ae, Re] }],
        "hue-rotate": [{ "hue-rotate": [Qe, Ae, Re] }],
        invert: [{ invert: ["", Qe, Ae, Re] }],
        saturate: [{ saturate: [Qe, Ae, Re] }],
        sepia: [{ sepia: ["", Qe, Ae, Re] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", Ae, Re] }],
        "backdrop-blur": [{ "backdrop-blur": un() }],
        "backdrop-brightness": [{ "backdrop-brightness": [Qe, Ae, Re] }],
        "backdrop-contrast": [{ "backdrop-contrast": [Qe, Ae, Re] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", Qe, Ae, Re] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [Qe, Ae, Re] }],
        "backdrop-invert": [{ "backdrop-invert": ["", Qe, Ae, Re] }],
        "backdrop-opacity": [{ "backdrop-opacity": [Qe, Ae, Re] }],
        "backdrop-saturate": [{ "backdrop-saturate": [Qe, Ae, Re] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", Qe, Ae, Re] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": T() }],
        "border-spacing-x": [{ "border-spacing-x": T() }],
        "border-spacing-y": [{ "border-spacing-y": T() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          { transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", Ae, Re] },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [Qe, "initial", Ae, Re] }],
        ease: [{ ease: ["linear", "initial", j, Ae, Re] }],
        delay: [{ delay: [Qe, Ae, Re] }],
        animate: [{ animate: ["none", k, Ae, Re] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [z, Ae, Re] }],
        "perspective-origin": [{ "perspective-origin": G() }],
        rotate: [{ rotate: an() }],
        "rotate-x": [{ "rotate-x": an() }],
        "rotate-y": [{ "rotate-y": an() }],
        "rotate-z": [{ "rotate-z": an() }],
        scale: [{ scale: Ut() }],
        "scale-x": [{ "scale-x": Ut() }],
        "scale-y": [{ "scale-y": Ut() }],
        "scale-z": [{ "scale-z": Ut() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: St() }],
        "skew-x": [{ "skew-x": St() }],
        "skew-y": [{ "skew-y": St() }],
        transform: [{ transform: [Ae, Re, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: G() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: xt() }],
        "translate-x": [{ "translate-x": xt() }],
        "translate-y": [{ "translate-y": xt() }],
        "translate-z": [{ "translate-z": xt() }],
        "translate-none": ["translate-none"],
        zoom: [{ zoom: [Za, Ae, Re] }],
        accent: [{ accent: Q() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: Q() }],
        "color-scheme": [
          { scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"] },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              Ae,
              Re,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scrollbar-thumb-color": [{ "scrollbar-thumb": Q() }],
        "scrollbar-track-color": [{ "scrollbar-track": Q() }],
        "scrollbar-gutter": [{ "scrollbar-gutter": ["auto", "stable", "both"] }],
        "scrollbar-w": [{ scrollbar: ["auto", "thin", "none"] }],
        "scroll-m": [{ "scroll-m": T() }],
        "scroll-mx": [{ "scroll-mx": T() }],
        "scroll-my": [{ "scroll-my": T() }],
        "scroll-ms": [{ "scroll-ms": T() }],
        "scroll-me": [{ "scroll-me": T() }],
        "scroll-mbs": [{ "scroll-mbs": T() }],
        "scroll-mbe": [{ "scroll-mbe": T() }],
        "scroll-mt": [{ "scroll-mt": T() }],
        "scroll-mr": [{ "scroll-mr": T() }],
        "scroll-mb": [{ "scroll-mb": T() }],
        "scroll-ml": [{ "scroll-ml": T() }],
        "scroll-p": [{ "scroll-p": T() }],
        "scroll-px": [{ "scroll-px": T() }],
        "scroll-py": [{ "scroll-py": T() }],
        "scroll-ps": [{ "scroll-ps": T() }],
        "scroll-pe": [{ "scroll-pe": T() }],
        "scroll-pbs": [{ "scroll-pbs": T() }],
        "scroll-pbe": [{ "scroll-pbe": T() }],
        "scroll-pt": [{ "scroll-pt": T() }],
        "scroll-pr": [{ "scroll-pr": T() }],
        "scroll-pb": [{ "scroll-pb": T() }],
        "scroll-pl": [{ "scroll-pl": T() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", Ae, Re] }],
        fill: [{ fill: ["none", ...Q()] }],
        "stroke-w": [{ stroke: [Qe, wo, pl, Cy] }],
        stroke: [{ stroke: ["none", ...Q()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        "container-named": ["container-type"],
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "inset-bs",
          "inset-be",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-bs",
          "border-w-be",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-bs",
          "border-color-be",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mbs",
          "scroll-mbe",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pbs",
          "scroll-pbe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      postfixLookupClassGroups: ["container-type"],
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  yT = Iz(gT);
function Pt(...e) {
  return yT(Y0(e));
}
function n3(e) {
  return "" + (e.startsWith("/") ? e : `/${e}`);
}
const bT = ({ ...e }) =>
  ee.jsx(Tz, {
    theme: "light",
    className: "toaster group",
    position: "top-right",
    offset: 24,
    gap: 12,
    duration: 4e3,
    visibleToasts: 3,
    expand: !1,
    style: {
      "--normal-bg": "var(--foreground)",
      "--normal-text": "var(--background)",
      "--normal-border": "transparent",
      "--border-radius": "14px",
      "--width": "360px",
    },
    icons: {
      success: ee.jsx(qR, { className: "size-[18px] text-emerald-400 dark:text-emerald-600" }),
      error: ee.jsx(PR, { className: "size-[18px] text-red-400 dark:text-red-600" }),
      warning: ee.jsx(YR, { className: "size-[18px] text-amber-400 dark:text-amber-600" }),
      info: ee.jsx(IR, { className: "size-[18px] text-sky-400 dark:text-sky-600" }),
      loading: ee.jsx(KR, { className: "size-[18px] animate-spin text-background/60" }),
    },
    toastOptions: {
      classNames: {
        toast: Pt(
          "group toast !pointer-events-auto !w-[var(--width)]",
          "!flex !items-center !gap-3 !rounded-[14px] !px-4 !py-3.5",
          "!border-0 !bg-foreground !text-background",
          "!shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_12px_32px_-8px_rgba(0,0,0,0.35)]",
          "dark:!shadow-[inset_0_1px_0_0_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.6)]",
        ),
        title: "!text-[13px] !font-semibold !leading-snug !tracking-[-0.01em]",
        description: "!mt-0.5 !text-xs !leading-relaxed !text-background/60",
        content: "!flex-1 !gap-0",
        icon: "!m-0 !h-auto !w-auto !shrink-0",
        actionButton: Pt(
          "!h-7 !shrink-0 !rounded-lg !px-3 !text-xs !font-medium",
          "!bg-background !text-foreground !shadow-none",
          "hover:!bg-background/90",
        ),
        cancelButton: Pt(
          "!h-7 !shrink-0 !rounded-lg !px-3 !text-xs !font-medium",
          "!bg-background/15 !text-background !shadow-none",
          "hover:!bg-background/25",
        ),
        closeButton: Pt(
          "!border-0 !bg-foreground !text-background/50",
          "hover:!bg-foreground hover:!text-background",
          "[&_svg]:!size-3.5",
        ),
      },
    },
    ...e,
  });
function pr(e, a, { checkForDefaultPrevented: r = !0 } = {}) {
  return function (s) {
    if ((e?.(s), r === !1 || !s.defaultPrevented)) return a?.(s);
  };
}
function Ny(e, a) {
  if (typeof e == "function") return e(a);
  e != null && (e.current = a);
}
function _T(...e) {
  return (a) => {
    let r = !1;
    const i = e.map((s) => {
      const u = Ny(s, a);
      return (!r && typeof u == "function" && (r = !0), u);
    });
    if (r)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const u = i[s];
          typeof u == "function" ? u() : Ny(e[s], null);
        }
      };
  };
}
function Qr(...e) {
  return _.useCallback(_T(...e), e);
}
function r_(e, a = []) {
  let r = [];
  function i(u, c) {
    const h = _.createContext(c);
    h.displayName = u + "Context";
    const p = r.length;
    r = [...r, c];
    const m = (v) => {
      const { scope: S, children: E, ...w } = v,
        z = S?.[e]?.[p] || h,
        R = _.useMemo(() => w, Object.values(w));
      return ee.jsx(z.Provider, { value: R, children: E });
    };
    m.displayName = u + "Provider";
    function y(v, S) {
      const E = S?.[e]?.[p] || h,
        w = _.useContext(E);
      if (w) return w;
      if (c !== void 0) return c;
      throw new Error(`\`${v}\` must be used within \`${u}\``);
    }
    return [m, y];
  }
  const s = () => {
    const u = r.map((c) => _.createContext(c));
    return function (h) {
      const p = h?.[e] || u;
      return _.useMemo(() => ({ [`__scope${e}`]: { ...h, [e]: p } }), [h, p]);
    };
  };
  return ((s.scopeName = e), [i, ST(s, ...a)]);
}
function ST(...e) {
  const a = e[0];
  if (e.length === 1) return a;
  const r = () => {
    const i = e.map((s) => ({ useScope: s(), scopeName: s.scopeName }));
    return function (u) {
      const c = i.reduce((h, { useScope: p, scopeName: m }) => {
        const v = p(u)[`__scope${m}`];
        return { ...h, ...v };
      }, {});
      return _.useMemo(() => ({ [`__scope${a.scopeName}`]: c }), [c]);
    };
  };
  return ((r.scopeName = a.scopeName), r);
}
var wi = globalThis?.document ? _.useLayoutEffect : () => {},
  ET = $u[" useId ".trim().toString()] || (() => {}),
  wT = 0;
function zu(e) {
  const [a, r] = _.useState(ET());
  return (
    wi(() => {
      r((i) => i ?? String(wT++));
    }, [e]),
    e || (a ? `radix-${a}` : "")
  );
}
var xT = $u[" useInsertionEffect ".trim().toString()] || wi;
function l_({ prop: e, defaultProp: a, onChange: r = () => {}, caller: i }) {
  const [s, u, c] = RT({ defaultProp: a, onChange: r }),
    h = e !== void 0,
    p = h ? e : s;
  {
    const y = _.useRef(e !== void 0);
    _.useEffect(() => {
      const v = y.current;
      (v !== h &&
        console.warn(
          `${i} is changing from ${v ? "controlled" : "uncontrolled"} to ${h ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (y.current = h));
    }, [h, i]);
  }
  const m = _.useCallback(
    (y) => {
      if (h) {
        const v = zT(y) ? y(e) : y;
        v !== e && c.current?.(v);
      } else u(y);
    },
    [h, e, u, c],
  );
  return [p, m];
}
function RT({ defaultProp: e, onChange: a }) {
  const [r, i] = _.useState(e),
    s = _.useRef(r),
    u = _.useRef(a);
  return (
    xT(() => {
      u.current = a;
    }, [a]),
    _.useEffect(() => {
      s.current !== r && (u.current?.(r), (s.current = r));
    }, [r, s]),
    [r, i, u]
  );
}
function zT(e) {
  return typeof e == "function";
}
function Mh(e) {
  const a = _.forwardRef((r, i) => {
    let { children: s, ...u } = r,
      c = null,
      h = !1;
    const p = [];
    (ky(s) && typeof su == "function" && (s = su(s._payload)),
      _.Children.forEach(s, (S) => {
        if (CT(S)) {
          h = !0;
          const E = S;
          let w = "child" in E.props ? E.props.child : E.props.children;
          (ky(w) && typeof su == "function" && (w = su(w._payload)),
            (c = TT(E, w)),
            p.push(c?.props?.children));
        } else p.push(S);
      }),
      c
        ? (c = _.cloneElement(c, void 0, p))
        : !h && _.Children.count(s) === 1 && _.isValidElement(s) && (c = s));
    const m = c ? OT(c) : void 0,
      y = Qr(i, m);
    if (!c) {
      if (s || s === 0) throw new Error(h ? kT(e) : NT(e));
      return s;
    }
    const v = AT(u, c.props ?? {});
    return (c.type !== _.Fragment && (v.ref = i ? y : m), _.cloneElement(c, v));
  });
  return ((a.displayName = `${e}.Slot`), a);
}
var i_ = Mh("Slot"),
  o_ = Symbol.for("radix.slottable");
function a3(e) {
  const a = (r) => ("child" in r ? r.children(r.child) : r.children);
  return ((a.displayName = `${e}.Slottable`), (a.__radixId = o_), a);
}
var TT = (e, a) => {
  if ("child" in e.props) {
    const r = e.props.child;
    return _.isValidElement(r)
      ? _.cloneElement(r, void 0, e.props.children(r.props.children))
      : null;
  }
  return _.isValidElement(a) ? a : null;
};
function AT(e, a) {
  const r = { ...a };
  for (const i in a) {
    const s = e[i],
      u = a[i];
    /^on[A-Z]/.test(i)
      ? s && u
        ? (r[i] = (...h) => {
            const p = u(...h);
            return (s(...h), p);
          })
        : s && (r[i] = s)
      : i === "style"
        ? (r[i] = { ...s, ...u })
        : i === "className" && (r[i] = [s, u].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function OT(e) {
  let a = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    r = a && "isReactWarning" in a && a.isReactWarning;
  return r
    ? e.ref
    : ((a = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (r = a && "isReactWarning" in a && a.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref);
}
function CT(e) {
  return (
    _.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === o_
  );
}
var DT = Symbol.for("react.lazy");
function ky(e) {
  return (
    e != null &&
    typeof e == "object" &&
    "$$typeof" in e &&
    e.$$typeof === DT &&
    "_payload" in e &&
    MT(e._payload)
  );
}
function MT(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
var NT = (e) =>
    `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
  kT = (e) =>
    `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
  su = $u[" use ".trim().toString()],
  LT = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  ra = LT.reduce((e, a) => {
    const r = Mh(`Primitive.${a}`),
      i = _.forwardRef((s, u) => {
        const { asChild: c, ...h } = s,
          p = c ? r : a;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), ee.jsx(p, { ...h, ref: u })
        );
      });
    return ((i.displayName = `Primitive.${a}`), { ...e, [a]: i });
  }, {});
function UT(e, a) {
  e && Iu.flushSync(() => e.dispatchEvent(a));
}
function No(e) {
  const a = _.useRef(e);
  return (
    _.useEffect(() => {
      a.current = e;
    }),
    _.useMemo(
      () =>
        (...r) =>
          a.current?.(...r),
      [],
    )
  );
}
function jT(e, a = globalThis?.document) {
  const r = No(e);
  _.useEffect(() => {
    const i = (s) => {
      s.key === "Escape" && r(s);
    };
    return (
      a.addEventListener("keydown", i, { capture: !0 }),
      () => a.removeEventListener("keydown", i, { capture: !0 })
    );
  }, [r, a]);
}
var VT = "DismissableLayer",
  Kd = "dismissableLayer.update",
  BT = "dismissableLayer.pointerDownOutside",
  HT = "dismissableLayer.focusOutside",
  Ly,
  Nh = _.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
    dismissableSurfaces: new Set(),
  }),
  s_ = _.forwardRef((e, a) => {
    const {
        disableOutsidePointerEvents: r = !1,
        deferPointerDownOutside: i = !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: u,
        onFocusOutside: c,
        onInteractOutside: h,
        onDismiss: p,
        ...m
      } = e,
      y = _.useContext(Nh),
      [v, S] = _.useState(null),
      E = v?.ownerDocument ?? globalThis?.document,
      [, w] = _.useState({}),
      z = Qr(a, (me) => S(me)),
      R = Array.from(y.layers),
      [j] = [...y.layersWithOutsidePointerEventsDisabled].slice(-1),
      k = R.indexOf(j),
      F = v ? R.indexOf(v) : -1,
      $ = y.layersWithOutsidePointerEventsDisabled.size > 0,
      G = F >= k,
      he = _.useRef(!1),
      ce = FT(
        (me) => {
          const Oe = me.target;
          if (!(Oe instanceof Node)) return;
          const Be = [...y.branches].some((fe) => fe.contains(Oe));
          !G || Be || (u?.(me), h?.(me), me.defaultPrevented || p?.());
        },
        {
          ownerDocument: E,
          deferPointerDownOutside: i,
          isDeferredPointerDownOutsideRef: he,
          dismissableSurfaces: y.dismissableSurfaces,
        },
      ),
      T = qT((me) => {
        if (i && he.current) return;
        const Oe = me.target;
        [...y.branches].some((fe) => fe.contains(Oe)) ||
          (c?.(me), h?.(me), me.defaultPrevented || p?.());
      }, E);
    return (
      jT((me) => {
        F === y.layers.size - 1 &&
          (s?.(me), !me.defaultPrevented && p && (me.preventDefault(), p()));
      }, E),
      _.useEffect(() => {
        if (v)
          return (
            r &&
              (y.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Ly = E.body.style.pointerEvents), (E.body.style.pointerEvents = "none")),
              y.layersWithOutsidePointerEventsDisabled.add(v)),
            y.layers.add(v),
            Uy(),
            () => {
              r &&
                (y.layersWithOutsidePointerEventsDisabled.delete(v),
                y.layersWithOutsidePointerEventsDisabled.size === 0 &&
                  (E.body.style.pointerEvents = Ly));
            }
          );
      }, [v, E, r, y]),
      _.useEffect(
        () => () => {
          v && (y.layers.delete(v), y.layersWithOutsidePointerEventsDisabled.delete(v), Uy());
        },
        [v, y],
      ),
      _.useEffect(() => {
        const me = () => w({});
        return (document.addEventListener(Kd, me), () => document.removeEventListener(Kd, me));
      }, []),
      ee.jsx(ra.div, {
        ...m,
        ref: z,
        style: { pointerEvents: $ ? (G ? "auto" : "none") : void 0, ...e.style },
        onFocusCapture: pr(e.onFocusCapture, T.onFocusCapture),
        onBlurCapture: pr(e.onBlurCapture, T.onBlurCapture),
        onPointerDownCapture: pr(e.onPointerDownCapture, ce.onPointerDownCapture),
      })
    );
  });
s_.displayName = VT;
var ZT = "DismissableLayerBranch",
  $T = _.forwardRef((e, a) => {
    const r = _.useContext(Nh),
      i = _.useRef(null),
      s = Qr(a, i);
    return (
      _.useEffect(() => {
        const u = i.current;
        if (u)
          return (
            r.branches.add(u),
            () => {
              r.branches.delete(u);
            }
          );
      }, [r.branches]),
      ee.jsx(ra.div, { ...e, ref: s })
    );
  });
$T.displayName = ZT;
function YT() {
  const e = _.useContext(Nh),
    [a, r] = _.useState(null);
  return (
    _.useEffect(() => {
      if (a)
        return (
          e.dismissableSurfaces.add(a),
          () => {
            e.dismissableSurfaces.delete(a);
          }
        );
    }, [a, e.dismissableSurfaces]),
    r
  );
}
function FT(e, a) {
  const {
      ownerDocument: r = globalThis?.document,
      deferPointerDownOutside: i = !1,
      isDeferredPointerDownOutsideRef: s,
      dismissableSurfaces: u,
    } = a,
    c = No(e),
    h = _.useRef(!1),
    p = _.useRef(!1),
    m = _.useRef(new Map()),
    y = _.useRef(() => {});
  return (
    _.useEffect(() => {
      function v() {
        ((p.current = !1), (s.current = !1), m.current.clear());
      }
      function S() {
        return Array.from(m.current.values()).some(Boolean);
      }
      function E(k) {
        if (!p.current) return;
        const F = k.target;
        ((F instanceof Node && [...u].some((G) => G.contains(F))) || m.current.set(k.type, !0),
          k.type === "click" &&
            window.setTimeout(() => {
              p.current && y.current();
            }, 0));
      }
      function w(k) {
        p.current && m.current.set(k.type, !1);
      }
      const z = (k) => {
          if (k.target && !h.current) {
            let F = function () {
              r.removeEventListener("click", y.current);
              const G = S();
              (v(), G || u_(BT, c, $, { discrete: !0 }));
            };
            const $ = { originalEvent: k };
            ((p.current = !0),
              (s.current = i && k.button === 0),
              m.current.clear(),
              !i || k.button !== 0
                ? F()
                : (r.removeEventListener("click", y.current),
                  (y.current = F),
                  r.addEventListener("click", y.current, { once: !0 })));
          } else (r.removeEventListener("click", y.current), v());
          h.current = !1;
        },
        R = ["pointerup", "mousedown", "mouseup", "touchstart", "touchend", "click"];
      for (const k of R) (r.addEventListener(k, E, !0), r.addEventListener(k, w));
      const j = window.setTimeout(() => {
        r.addEventListener("pointerdown", z);
      }, 0);
      return () => {
        (window.clearTimeout(j),
          r.removeEventListener("pointerdown", z),
          r.removeEventListener("click", y.current));
        for (const k of R) (r.removeEventListener(k, E, !0), r.removeEventListener(k, w));
      };
    }, [r, c, i, s, u]),
    { onPointerDownCapture: () => (h.current = !0) }
  );
}
function qT(e, a = globalThis?.document) {
  const r = No(e),
    i = _.useRef(!1);
  return (
    _.useEffect(() => {
      const s = (u) => {
        u.target && !i.current && u_(HT, r, { originalEvent: u }, { discrete: !1 });
      };
      return (a.addEventListener("focusin", s), () => a.removeEventListener("focusin", s));
    }, [a, r]),
    { onFocusCapture: () => (i.current = !0), onBlurCapture: () => (i.current = !1) }
  );
}
function Uy() {
  const e = new CustomEvent(Kd);
  document.dispatchEvent(e);
}
function u_(e, a, r, { discrete: i }) {
  const s = r.originalEvent.target,
    u = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
  (a && s.addEventListener(e, a, { once: !0 }), i ? UT(s, u) : s.dispatchEvent(u));
}
var Ad = "focusScope.autoFocusOnMount",
  Od = "focusScope.autoFocusOnUnmount",
  jy = { bubbles: !1, cancelable: !0 },
  GT = "FocusScope",
  c_ = _.forwardRef((e, a) => {
    const { loop: r = !1, trapped: i = !1, onMountAutoFocus: s, onUnmountAutoFocus: u, ...c } = e,
      [h, p] = _.useState(null),
      m = No(s),
      y = No(u),
      v = _.useRef(null),
      S = Qr(a, (z) => p(z)),
      E = _.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (_.useEffect(() => {
      if (i) {
        let z = function (F) {
            if (E.paused || !h) return;
            const $ = F.target;
            h.contains($) ? (v.current = $) : qr(v.current, { select: !0 });
          },
          R = function (F) {
            if (E.paused || !h) return;
            const $ = F.relatedTarget;
            $ !== null && (h.contains($) || qr(v.current, { select: !0 }));
          },
          j = function (F) {
            if (document.activeElement === document.body)
              for (const G of F) G.removedNodes.length > 0 && qr(h);
          };
        (document.addEventListener("focusin", z), document.addEventListener("focusout", R));
        const k = new MutationObserver(j);
        return (
          h && k.observe(h, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener("focusin", z),
              document.removeEventListener("focusout", R),
              k.disconnect());
          }
        );
      }
    }, [i, h, E.paused]),
      _.useEffect(() => {
        if (h) {
          By.add(E);
          const z = document.activeElement;
          if (!h.contains(z)) {
            const j = new CustomEvent(Ad, jy);
            (h.addEventListener(Ad, m),
              h.dispatchEvent(j),
              j.defaultPrevented ||
                (PT(JT(f_(h)), { select: !0 }), document.activeElement === z && qr(h)));
          }
          return () => {
            (h.removeEventListener(Ad, m),
              setTimeout(() => {
                const j = new CustomEvent(Od, jy);
                (h.addEventListener(Od, y),
                  h.dispatchEvent(j),
                  j.defaultPrevented || qr(z ?? document.body, { select: !0 }),
                  h.removeEventListener(Od, y),
                  By.remove(E));
              }, 0));
          };
        }
      }, [h, m, y, E]));
    const w = _.useCallback(
      (z) => {
        if ((!r && !i) || E.paused) return;
        const R = z.key === "Tab" && !z.altKey && !z.ctrlKey && !z.metaKey,
          j = document.activeElement;
        if (R && j) {
          const k = z.currentTarget,
            [F, $] = XT(k);
          F && $
            ? !z.shiftKey && j === $
              ? (z.preventDefault(), r && qr(F, { select: !0 }))
              : z.shiftKey && j === F && (z.preventDefault(), r && qr($, { select: !0 }))
            : j === k && z.preventDefault();
        }
      },
      [r, i, E.paused],
    );
    return ee.jsx(ra.div, { tabIndex: -1, ...c, ref: S, onKeyDown: w });
  });
c_.displayName = GT;
function PT(e, { select: a = !1 } = {}) {
  const r = document.activeElement;
  for (const i of e) if ((qr(i, { select: a }), document.activeElement !== r)) return;
}
function XT(e) {
  const a = f_(e),
    r = Vy(a, e),
    i = Vy(a.reverse(), e);
  return [r, i];
}
function f_(e) {
  const a = [],
    r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (i) => {
        const s = i.tagName === "INPUT" && i.type === "hidden";
        return i.disabled || i.hidden || s
          ? NodeFilter.FILTER_SKIP
          : i.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; r.nextNode(); ) a.push(r.currentNode);
  return a;
}
function Vy(e, a) {
  for (const r of e) if (!IT(r, { upTo: a })) return r;
}
function IT(e, { upTo: a }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (a !== void 0 && e === a) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function QT(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function qr(e, { select: a = !1 } = {}) {
  if (e && e.focus) {
    const r = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== r && QT(e) && a && e.select());
  }
}
var By = KT();
function KT() {
  let e = [];
  return {
    add(a) {
      const r = e[0];
      (a !== r && r?.pause(), (e = Hy(e, a)), e.unshift(a));
    },
    remove(a) {
      ((e = Hy(e, a)), e[0]?.resume());
    },
  };
}
function Hy(e, a) {
  const r = [...e],
    i = r.indexOf(a);
  return (i !== -1 && r.splice(i, 1), r);
}
function JT(e) {
  return e.filter((a) => a.tagName !== "A");
}
var WT = "Portal",
  d_ = _.forwardRef((e, a) => {
    const { container: r, ...i } = e,
      [s, u] = _.useState(!1);
    wi(() => u(!0), []);
    const c = r || (s && globalThis?.document?.body);
    return c ? Iu.createPortal(ee.jsx(ra.div, { ...i, ref: a }), c) : null;
  });
d_.displayName = WT;
function e2(e, a) {
  return _.useReducer((r, i) => a[r][i] ?? r, e);
}
var $o = (e) => {
  const { present: a, children: r } = e,
    i = t2(a),
    s = typeof r == "function" ? r({ present: i.isPresent }) : _.Children.only(r),
    u = n2(i.ref, a2(s));
  return typeof r == "function" || i.isPresent ? _.cloneElement(s, { ref: u }) : null;
};
$o.displayName = "Presence";
function t2(e) {
  const [a, r] = _.useState(),
    i = _.useRef(null),
    s = _.useRef(e),
    u = _.useRef("none"),
    c = e ? "mounted" : "unmounted",
    [h, p] = e2(c, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    _.useEffect(() => {
      const m = uu(i.current);
      u.current = h === "mounted" ? m : "none";
    }, [h]),
    wi(() => {
      const m = i.current,
        y = s.current;
      if (y !== e) {
        const S = u.current,
          E = uu(m);
        (e
          ? p("MOUNT")
          : E === "none" || m?.display === "none"
            ? p("UNMOUNT")
            : p(y && S !== E ? "ANIMATION_OUT" : "UNMOUNT"),
          (s.current = e));
      }
    }, [e, p]),
    wi(() => {
      if (a) {
        let m;
        const y = a.ownerDocument.defaultView ?? window,
          v = (E) => {
            const z = uu(i.current).includes(CSS.escape(E.animationName));
            if (E.target === a && z && (p("ANIMATION_END"), !s.current)) {
              const R = a.style.animationFillMode;
              ((a.style.animationFillMode = "forwards"),
                (m = y.setTimeout(() => {
                  a.style.animationFillMode === "forwards" && (a.style.animationFillMode = R);
                })));
            }
          },
          S = (E) => {
            E.target === a && (u.current = uu(i.current));
          };
        return (
          a.addEventListener("animationstart", S),
          a.addEventListener("animationcancel", v),
          a.addEventListener("animationend", v),
          () => {
            (y.clearTimeout(m),
              a.removeEventListener("animationstart", S),
              a.removeEventListener("animationcancel", v),
              a.removeEventListener("animationend", v));
          }
        );
      } else p("ANIMATION_END");
    }, [a, p]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(h),
      ref: _.useCallback((m) => {
        ((i.current = m ? getComputedStyle(m) : null), r(m));
      }, []),
    }
  );
}
function Zy(e, a) {
  if (typeof e == "function") return e(a);
  e != null && (e.current = a);
}
function n2(...e) {
  const a = _.useRef(e);
  return (
    (a.current = e),
    _.useCallback((r) => {
      const i = a.current;
      let s = !1;
      const u = i.map((c) => {
        const h = Zy(c, r);
        return (!s && typeof h == "function" && (s = !0), h);
      });
      if (s)
        return () => {
          for (let c = 0; c < u.length; c++) {
            const h = u[c];
            typeof h == "function" ? h() : Zy(i[c], null);
          }
        };
    }, [])
  );
}
function uu(e) {
  return e?.animationName || "none";
}
function a2(e) {
  let a = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    r = a && "isReactWarning" in a && a.isReactWarning;
  return r
    ? e.ref
    : ((a = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (r = a && "isReactWarning" in a && a.isReactWarning),
      r ? e.props.ref : e.props.ref || e.ref);
}
var cu = 0,
  ui = null;
function r2() {
  _.useEffect(() => {
    ui || (ui = { start: $y(), end: $y() });
    const { start: e, end: a } = ui;
    return (
      document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e),
      document.body.lastElementChild !== a && document.body.insertAdjacentElement("beforeend", a),
      cu++,
      () => {
        (cu === 1 && (ui?.start.remove(), ui?.end.remove(), (ui = null)),
          (cu = Math.max(0, cu - 1)));
      }
    );
  }, []);
}
function $y() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var Fa = function () {
  return (
    (Fa =
      Object.assign ||
      function (a) {
        for (var r, i = 1, s = arguments.length; i < s; i++) {
          r = arguments[i];
          for (var u in r) Object.prototype.hasOwnProperty.call(r, u) && (a[u] = r[u]);
        }
        return a;
      }),
    Fa.apply(this, arguments)
  );
};
function h_(e, a) {
  var r = {};
  for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && a.indexOf(i) < 0 && (r[i] = e[i]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, i = Object.getOwnPropertySymbols(e); s < i.length; s++)
      a.indexOf(i[s]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, i[s]) &&
        (r[i[s]] = e[i[s]]);
  return r;
}
function l2(e, a, r) {
  if (r || arguments.length === 2)
    for (var i = 0, s = a.length, u; i < s; i++)
      (u || !(i in a)) && (u || (u = Array.prototype.slice.call(a, 0, i)), (u[i] = a[i]));
  return e.concat(u || Array.prototype.slice.call(a));
}
var Tu = "right-scroll-bar-position",
  Au = "width-before-scroll-bar",
  i2 = "with-scroll-bars-hidden",
  o2 = "--removed-body-scroll-bar-size";
function Cd(e, a) {
  return (typeof e == "function" ? e(a) : e && (e.current = a), e);
}
function s2(e, a) {
  var r = _.useState(function () {
    return {
      value: e,
      callback: a,
      facade: {
        get current() {
          return r.value;
        },
        set current(i) {
          var s = r.value;
          s !== i && ((r.value = i), r.callback(i, s));
        },
      },
    };
  })[0];
  return ((r.callback = a), r.facade);
}
var u2 = typeof window < "u" ? _.useLayoutEffect : _.useEffect,
  Yy = new WeakMap();
function c2(e, a) {
  var r = s2(null, function (i) {
    return e.forEach(function (s) {
      return Cd(s, i);
    });
  });
  return (
    u2(
      function () {
        var i = Yy.get(r);
        if (i) {
          var s = new Set(i),
            u = new Set(e),
            c = r.current;
          (s.forEach(function (h) {
            u.has(h) || Cd(h, null);
          }),
            u.forEach(function (h) {
              s.has(h) || Cd(h, c);
            }));
        }
        Yy.set(r, e);
      },
      [e],
    ),
    r
  );
}
function f2(e) {
  return e;
}
function d2(e, a) {
  a === void 0 && (a = f2);
  var r = [],
    i = !1,
    s = {
      read: function () {
        if (i)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
          );
        return r.length ? r[r.length - 1] : e;
      },
      useMedium: function (u) {
        var c = a(u, i);
        return (
          r.push(c),
          function () {
            r = r.filter(function (h) {
              return h !== c;
            });
          }
        );
      },
      assignSyncMedium: function (u) {
        for (i = !0; r.length; ) {
          var c = r;
          ((r = []), c.forEach(u));
        }
        r = {
          push: function (h) {
            return u(h);
          },
          filter: function () {
            return r;
          },
        };
      },
      assignMedium: function (u) {
        i = !0;
        var c = [];
        if (r.length) {
          var h = r;
          ((r = []), h.forEach(u), (c = r));
        }
        var p = function () {
            var y = c;
            ((c = []), y.forEach(u));
          },
          m = function () {
            return Promise.resolve().then(p);
          };
        (m(),
          (r = {
            push: function (y) {
              (c.push(y), m());
            },
            filter: function (y) {
              return ((c = c.filter(y)), r);
            },
          }));
      },
    };
  return s;
}
function h2(e) {
  e === void 0 && (e = {});
  var a = d2(null);
  return ((a.options = Fa({ async: !0, ssr: !1 }, e)), a);
}
var m_ = function (e) {
  var a = e.sideCar,
    r = h_(e, ["sideCar"]);
  if (!a) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var i = a.read();
  if (!i) throw new Error("Sidecar medium not found");
  return _.createElement(i, Fa({}, r));
};
m_.isSideCarExport = !0;
function m2(e, a) {
  return (e.useMedium(a), m_);
}
var p_ = h2(),
  Dd = function () {},
  Qu = _.forwardRef(function (e, a) {
    var r = _.useRef(null),
      i = _.useState({ onScrollCapture: Dd, onWheelCapture: Dd, onTouchMoveCapture: Dd }),
      s = i[0],
      u = i[1],
      c = e.forwardProps,
      h = e.children,
      p = e.className,
      m = e.removeScrollBar,
      y = e.enabled,
      v = e.shards,
      S = e.sideCar,
      E = e.noRelative,
      w = e.noIsolation,
      z = e.inert,
      R = e.allowPinchZoom,
      j = e.as,
      k = j === void 0 ? "div" : j,
      F = e.gapMode,
      $ = h_(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      G = S,
      he = c2([r, a]),
      ce = Fa(Fa({}, $), s);
    return _.createElement(
      _.Fragment,
      null,
      y &&
        _.createElement(G, {
          sideCar: p_,
          removeScrollBar: m,
          shards: v,
          noRelative: E,
          noIsolation: w,
          inert: z,
          setCallbacks: u,
          allowPinchZoom: !!R,
          lockRef: r,
          gapMode: F,
        }),
      c
        ? _.cloneElement(_.Children.only(h), Fa(Fa({}, ce), { ref: he }))
        : _.createElement(k, Fa({}, ce, { className: p, ref: he }), h),
    );
  });
Qu.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
Qu.classNames = { fullWidth: Au, zeroRight: Tu };
var p2 = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function v2() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var a = p2();
  return (a && e.setAttribute("nonce", a), e);
}
function g2(e, a) {
  e.styleSheet ? (e.styleSheet.cssText = a) : e.appendChild(document.createTextNode(a));
}
function y2(e) {
  var a = document.head || document.getElementsByTagName("head")[0];
  a.appendChild(e);
}
var b2 = function () {
    var e = 0,
      a = null;
    return {
      add: function (r) {
        (e == 0 && (a = v2()) && (g2(a, r), y2(a)), e++);
      },
      remove: function () {
        (e--, !e && a && (a.parentNode && a.parentNode.removeChild(a), (a = null)));
      },
    };
  },
  _2 = function () {
    var e = b2();
    return function (a, r) {
      _.useEffect(
        function () {
          return (
            e.add(a),
            function () {
              e.remove();
            }
          );
        },
        [a && r],
      );
    };
  },
  v_ = function () {
    var e = _2(),
      a = function (r) {
        var i = r.styles,
          s = r.dynamic;
        return (e(i, s), null);
      };
    return a;
  },
  S2 = { left: 0, top: 0, right: 0, gap: 0 },
  Md = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  E2 = function (e) {
    var a = window.getComputedStyle(document.body),
      r = a[e === "padding" ? "paddingLeft" : "marginLeft"],
      i = a[e === "padding" ? "paddingTop" : "marginTop"],
      s = a[e === "padding" ? "paddingRight" : "marginRight"];
    return [Md(r), Md(i), Md(s)];
  },
  w2 = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return S2;
    var a = E2(e),
      r = document.documentElement.clientWidth,
      i = window.innerWidth;
    return { left: a[0], top: a[1], right: a[2], gap: Math.max(0, i - r + a[2] - a[0]) };
  },
  x2 = v_(),
  _i = "data-scroll-locked",
  R2 = function (e, a, r, i) {
    var s = e.left,
      u = e.top,
      c = e.right,
      h = e.gap;
    return (
      r === void 0 && (r = "margin"),
      `
  .`
        .concat(
          i2,
          ` {
   overflow: hidden `,
        )
        .concat(
          i,
          `;
   padding-right: `,
        )
        .concat(h, "px ")
        .concat(
          i,
          `;
  }
  body[`,
        )
        .concat(
          _i,
          `] {
    overflow: hidden `,
        )
        .concat(
          i,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            a && "position: relative ".concat(i, ";"),
            r === "margin" &&
              `
    padding-left: `
                .concat(
                  s,
                  `px;
    padding-top: `,
                )
                .concat(
                  u,
                  `px;
    padding-right: `,
                )
                .concat(
                  c,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(h, "px ")
                .concat(
                  i,
                  `;
    `,
                ),
            r === "padding" && "padding-right: ".concat(h, "px ").concat(i, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`,
        )
        .concat(
          Tu,
          ` {
    right: `,
        )
        .concat(h, "px ")
        .concat(
          i,
          `;
  }
  
  .`,
        )
        .concat(
          Au,
          ` {
    margin-right: `,
        )
        .concat(h, "px ")
        .concat(
          i,
          `;
  }
  
  .`,
        )
        .concat(Tu, " .")
        .concat(
          Tu,
          ` {
    right: 0 `,
        )
        .concat(
          i,
          `;
  }
  
  .`,
        )
        .concat(Au, " .")
        .concat(
          Au,
          ` {
    margin-right: 0 `,
        )
        .concat(
          i,
          `;
  }
  
  body[`,
        )
        .concat(
          _i,
          `] {
    `,
        )
        .concat(o2, ": ")
        .concat(
          h,
          `px;
  }
`,
        )
    );
  },
  Fy = function () {
    var e = parseInt(document.body.getAttribute(_i) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  z2 = function () {
    _.useEffect(function () {
      return (
        document.body.setAttribute(_i, (Fy() + 1).toString()),
        function () {
          var e = Fy() - 1;
          e <= 0 ? document.body.removeAttribute(_i) : document.body.setAttribute(_i, e.toString());
        }
      );
    }, []);
  },
  T2 = function (e) {
    var a = e.noRelative,
      r = e.noImportant,
      i = e.gapMode,
      s = i === void 0 ? "margin" : i;
    z2();
    var u = _.useMemo(
      function () {
        return w2(s);
      },
      [s],
    );
    return _.createElement(x2, { styles: R2(u, !a, s, r ? "" : "!important") });
  },
  Jd = !1;
if (typeof window < "u")
  try {
    var fu = Object.defineProperty({}, "passive", {
      get: function () {
        return ((Jd = !0), !0);
      },
    });
    (window.addEventListener("test", fu, fu), window.removeEventListener("test", fu, fu));
  } catch {
    Jd = !1;
  }
var ci = Jd ? { passive: !1 } : !1,
  A2 = function (e) {
    return e.tagName === "TEXTAREA";
  },
  g_ = function (e, a) {
    if (!(e instanceof Element)) return !1;
    var r = window.getComputedStyle(e);
    return r[a] !== "hidden" && !(r.overflowY === r.overflowX && !A2(e) && r[a] === "visible");
  },
  O2 = function (e) {
    return g_(e, "overflowY");
  },
  C2 = function (e) {
    return g_(e, "overflowX");
  },
  qy = function (e, a) {
    var r = a.ownerDocument,
      i = a;
    do {
      typeof ShadowRoot < "u" && i instanceof ShadowRoot && (i = i.host);
      var s = y_(e, i);
      if (s) {
        var u = b_(e, i),
          c = u[1],
          h = u[2];
        if (c > h) return !0;
      }
      i = i.parentNode;
    } while (i && i !== r.body);
    return !1;
  },
  D2 = function (e) {
    var a = e.scrollTop,
      r = e.scrollHeight,
      i = e.clientHeight;
    return [a, r, i];
  },
  M2 = function (e) {
    var a = e.scrollLeft,
      r = e.scrollWidth,
      i = e.clientWidth;
    return [a, r, i];
  },
  y_ = function (e, a) {
    return e === "v" ? O2(a) : C2(a);
  },
  b_ = function (e, a) {
    return e === "v" ? D2(a) : M2(a);
  },
  N2 = function (e, a) {
    return e === "h" && a === "rtl" ? -1 : 1;
  },
  k2 = function (e, a, r, i, s) {
    var u = N2(e, window.getComputedStyle(a).direction),
      c = u * i,
      h = r.target,
      p = a.contains(h),
      m = !1,
      y = c > 0,
      v = 0,
      S = 0;
    do {
      if (!h) break;
      var E = b_(e, h),
        w = E[0],
        z = E[1],
        R = E[2],
        j = z - R - u * w;
      (w || j) && y_(e, h) && ((v += j), (S += w));
      var k = h.parentNode;
      h = k && k.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? k.host : k;
    } while ((!p && h !== document.body) || (p && (a.contains(h) || a === h)));
    return (((y && Math.abs(v) < 1) || (!y && Math.abs(S) < 1)) && (m = !0), m);
  },
  du = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  Gy = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Py = function (e) {
    return e && "current" in e ? e.current : e;
  },
  L2 = function (e, a) {
    return e[0] === a[0] && e[1] === a[1];
  },
  U2 = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      );
  },
  j2 = 0,
  fi = [];
function V2(e) {
  var a = _.useRef([]),
    r = _.useRef([0, 0]),
    i = _.useRef(),
    s = _.useState(j2++)[0],
    u = _.useState(v_)[0],
    c = _.useRef(e);
  (_.useEffect(
    function () {
      c.current = e;
    },
    [e],
  ),
    _.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(s));
          var z = l2([e.lockRef.current], (e.shards || []).map(Py), !0).filter(Boolean);
          return (
            z.forEach(function (R) {
              return R.classList.add("allow-interactivity-".concat(s));
            }),
            function () {
              (document.body.classList.remove("block-interactivity-".concat(s)),
                z.forEach(function (R) {
                  return R.classList.remove("allow-interactivity-".concat(s));
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var h = _.useCallback(function (z, R) {
      if (("touches" in z && z.touches.length === 2) || (z.type === "wheel" && z.ctrlKey))
        return !c.current.allowPinchZoom;
      var j = du(z),
        k = r.current,
        F = "deltaX" in z ? z.deltaX : k[0] - j[0],
        $ = "deltaY" in z ? z.deltaY : k[1] - j[1],
        G,
        he = z.target,
        ce = Math.abs(F) > Math.abs($) ? "h" : "v";
      if ("touches" in z && ce === "h" && he.type === "range") return !1;
      var T = window.getSelection(),
        me = T && T.anchorNode,
        Oe = me ? me === he || me.contains(he) : !1;
      if (Oe) return !1;
      var Be = qy(ce, he);
      if (!Be) return !0;
      if ((Be ? (G = ce) : ((G = ce === "v" ? "h" : "v"), (Be = qy(ce, he))), !Be)) return !1;
      if ((!i.current && "changedTouches" in z && (F || $) && (i.current = G), !G)) return !0;
      var fe = i.current || G;
      return k2(fe, R, z, fe === "h" ? F : $);
    }, []),
    p = _.useCallback(function (z) {
      var R = z;
      if (!(!fi.length || fi[fi.length - 1] !== u)) {
        var j = "deltaY" in R ? Gy(R) : du(R),
          k = a.current.filter(function (G) {
            return (
              G.name === R.type &&
              (G.target === R.target || R.target === G.shadowParent) &&
              L2(G.delta, j)
            );
          })[0];
        if (k && k.should) {
          R.cancelable && R.preventDefault();
          return;
        }
        if (!k) {
          var F = (c.current.shards || [])
              .map(Py)
              .filter(Boolean)
              .filter(function (G) {
                return G.contains(R.target);
              }),
            $ = F.length > 0 ? h(R, F[0]) : !c.current.noIsolation;
          $ && R.cancelable && R.preventDefault();
        }
      }
    }, []),
    m = _.useCallback(function (z, R, j, k) {
      var F = { name: z, delta: R, target: j, should: k, shadowParent: B2(j) };
      (a.current.push(F),
        setTimeout(function () {
          a.current = a.current.filter(function ($) {
            return $ !== F;
          });
        }, 1));
    }, []),
    y = _.useCallback(function (z) {
      ((r.current = du(z)), (i.current = void 0));
    }, []),
    v = _.useCallback(function (z) {
      m(z.type, Gy(z), z.target, h(z, e.lockRef.current));
    }, []),
    S = _.useCallback(function (z) {
      m(z.type, du(z), z.target, h(z, e.lockRef.current));
    }, []);
  _.useEffect(function () {
    return (
      fi.push(u),
      e.setCallbacks({ onScrollCapture: v, onWheelCapture: v, onTouchMoveCapture: S }),
      document.addEventListener("wheel", p, ci),
      document.addEventListener("touchmove", p, ci),
      document.addEventListener("touchstart", y, ci),
      function () {
        ((fi = fi.filter(function (z) {
          return z !== u;
        })),
          document.removeEventListener("wheel", p, ci),
          document.removeEventListener("touchmove", p, ci),
          document.removeEventListener("touchstart", y, ci));
      }
    );
  }, []);
  var E = e.removeScrollBar,
    w = e.inert;
  return _.createElement(
    _.Fragment,
    null,
    w ? _.createElement(u, { styles: U2(s) }) : null,
    E ? _.createElement(T2, { noRelative: e.noRelative, gapMode: e.gapMode }) : null,
  );
}
function B2(e) {
  for (var a = null; e !== null; )
    (e instanceof ShadowRoot && ((a = e.host), (e = e.host)), (e = e.parentNode));
  return a;
}
const H2 = m2(p_, V2);
var __ = _.forwardRef(function (e, a) {
  return _.createElement(Qu, Fa({}, e, { ref: a, sideCar: H2 }));
});
__.classNames = Qu.classNames;
var Z2 = function (e) {
    if (typeof document > "u") return null;
    var a = Array.isArray(e) ? e[0] : e;
    return a.ownerDocument.body;
  },
  di = new WeakMap(),
  hu = new WeakMap(),
  mu = {},
  Nd = 0,
  S_ = function (e) {
    return e && (e.host || S_(e.parentNode));
  },
  $2 = function (e, a) {
    return a
      .map(function (r) {
        if (e.contains(r)) return r;
        var i = S_(r);
        return i && e.contains(i)
          ? i
          : (console.error("aria-hidden", r, "in not contained inside", e, ". Doing nothing"),
            null);
      })
      .filter(function (r) {
        return !!r;
      });
  },
  Y2 = function (e, a, r, i) {
    var s = $2(a, Array.isArray(e) ? e : [e]);
    mu[r] || (mu[r] = new WeakMap());
    var u = mu[r],
      c = [],
      h = new Set(),
      p = new Set(s),
      m = function (v) {
        !v || h.has(v) || (h.add(v), m(v.parentNode));
      };
    s.forEach(m);
    var y = function (v) {
      !v ||
        p.has(v) ||
        Array.prototype.forEach.call(v.children, function (S) {
          if (h.has(S)) y(S);
          else
            try {
              var E = S.getAttribute(i),
                w = E !== null && E !== "false",
                z = (di.get(S) || 0) + 1,
                R = (u.get(S) || 0) + 1;
              (di.set(S, z),
                u.set(S, R),
                c.push(S),
                z === 1 && w && hu.set(S, !0),
                R === 1 && S.setAttribute(r, "true"),
                w || S.setAttribute(i, "true"));
            } catch (j) {
              console.error("aria-hidden: cannot operate on ", S, j);
            }
        });
    };
    return (
      y(a),
      h.clear(),
      Nd++,
      function () {
        (c.forEach(function (v) {
          var S = di.get(v) - 1,
            E = u.get(v) - 1;
          (di.set(v, S),
            u.set(v, E),
            S || (hu.has(v) || v.removeAttribute(i), hu.delete(v)),
            E || v.removeAttribute(r));
        }),
          Nd--,
          Nd || ((di = new WeakMap()), (di = new WeakMap()), (hu = new WeakMap()), (mu = {})));
      }
    );
  },
  F2 = function (e, a, r) {
    r === void 0 && (r = "data-aria-hidden");
    var i = Array.from(Array.isArray(e) ? e : [e]),
      s = Z2(e);
    return s
      ? (i.push.apply(i, Array.from(s.querySelectorAll("[aria-live], script"))),
        Y2(i, s, r, "aria-hidden"))
      : function () {
          return null;
        };
  },
  Ku = "Dialog",
  [E_] = r_(Ku),
  [q2, Da] = E_(Ku),
  w_ = (e) => {
    const {
        __scopeDialog: a,
        children: r,
        open: i,
        defaultOpen: s,
        onOpenChange: u,
        modal: c = !0,
      } = e,
      h = _.useRef(null),
      p = _.useRef(null),
      [m, y] = l_({ prop: i, defaultProp: s ?? !1, onChange: u, caller: Ku });
    return ee.jsx(q2, {
      scope: a,
      triggerRef: h,
      contentRef: p,
      contentId: zu(),
      titleId: zu(),
      descriptionId: zu(),
      open: m,
      onOpenChange: y,
      onOpenToggle: _.useCallback(() => y((v) => !v), [y]),
      modal: c,
      children: r,
    });
  };
w_.displayName = Ku;
var x_ = "DialogTrigger",
  G2 = _.forwardRef((e, a) => {
    const { __scopeDialog: r, ...i } = e,
      s = Da(x_, r),
      u = Qr(a, s.triggerRef);
    return ee.jsx(ra.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": s.open,
      "aria-controls": s.open ? s.contentId : void 0,
      "data-state": Lh(s.open),
      ...i,
      ref: u,
      onClick: pr(e.onClick, s.onOpenToggle),
    });
  });
G2.displayName = x_;
var kh = "DialogPortal",
  [P2, R_] = E_(kh, { forceMount: void 0 }),
  z_ = (e) => {
    const { __scopeDialog: a, forceMount: r, children: i, container: s } = e,
      u = Da(kh, a);
    return ee.jsx(P2, {
      scope: a,
      forceMount: r,
      children: _.Children.map(i, (c) =>
        ee.jsx($o, {
          present: r || u.open,
          children: ee.jsx(d_, { asChild: !0, container: s, children: c }),
        }),
      ),
    });
  };
z_.displayName = kh;
var Nu = "DialogOverlay",
  T_ = _.forwardRef((e, a) => {
    const r = R_(Nu, e.__scopeDialog),
      { forceMount: i = r.forceMount, ...s } = e,
      u = Da(Nu, e.__scopeDialog);
    return u.modal
      ? ee.jsx($o, { present: i || u.open, children: ee.jsx(I2, { ...s, ref: a }) })
      : null;
  });
T_.displayName = Nu;
var X2 = Mh("DialogOverlay.RemoveScroll"),
  I2 = _.forwardRef((e, a) => {
    const { __scopeDialog: r, ...i } = e,
      s = Da(Nu, r),
      u = YT(),
      c = Qr(a, u);
    return ee.jsx(__, {
      as: X2,
      allowPinchZoom: !0,
      shards: [s.contentRef],
      children: ee.jsx(ra.div, {
        "data-state": Lh(s.open),
        ...i,
        ref: c,
        style: { pointerEvents: "auto", ...i.style },
      }),
    });
  }),
  xi = "DialogContent",
  A_ = _.forwardRef((e, a) => {
    const r = R_(xi, e.__scopeDialog),
      { forceMount: i = r.forceMount, ...s } = e,
      u = Da(xi, e.__scopeDialog);
    return ee.jsx($o, {
      present: i || u.open,
      children: u.modal ? ee.jsx(Q2, { ...s, ref: a }) : ee.jsx(K2, { ...s, ref: a }),
    });
  });
A_.displayName = xi;
var Q2 = _.forwardRef((e, a) => {
    const r = Da(xi, e.__scopeDialog),
      i = _.useRef(null),
      s = Qr(a, r.contentRef, i);
    return (
      _.useEffect(() => {
        const u = i.current;
        if (u) return F2(u);
      }, []),
      ee.jsx(O_, {
        ...e,
        ref: s,
        trapFocus: r.open,
        disableOutsidePointerEvents: r.open,
        onCloseAutoFocus: pr(e.onCloseAutoFocus, (u) => {
          (u.preventDefault(), r.triggerRef.current?.focus());
        }),
        onPointerDownOutside: pr(e.onPointerDownOutside, (u) => {
          const c = u.detail.originalEvent,
            h = c.button === 0 && c.ctrlKey === !0;
          (c.button === 2 || h) && u.preventDefault();
        }),
        onFocusOutside: pr(e.onFocusOutside, (u) => u.preventDefault()),
      })
    );
  }),
  K2 = _.forwardRef((e, a) => {
    const r = Da(xi, e.__scopeDialog),
      i = _.useRef(!1),
      s = _.useRef(!1);
    return ee.jsx(O_, {
      ...e,
      ref: a,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (u) => {
        (e.onCloseAutoFocus?.(u),
          u.defaultPrevented || (i.current || r.triggerRef.current?.focus(), u.preventDefault()),
          (i.current = !1),
          (s.current = !1));
      },
      onInteractOutside: (u) => {
        (e.onInteractOutside?.(u),
          u.defaultPrevented ||
            ((i.current = !0), u.detail.originalEvent.type === "pointerdown" && (s.current = !0)));
        const c = u.target;
        (r.triggerRef.current?.contains(c) && u.preventDefault(),
          u.detail.originalEvent.type === "focusin" && s.current && u.preventDefault());
      },
    });
  }),
  O_ = _.forwardRef((e, a) => {
    const { __scopeDialog: r, trapFocus: i, onOpenAutoFocus: s, onCloseAutoFocus: u, ...c } = e,
      h = Da(xi, r);
    return (
      r2(),
      ee.jsx(ee.Fragment, {
        children: ee.jsx(c_, {
          asChild: !0,
          loop: !0,
          trapped: i,
          onMountAutoFocus: s,
          onUnmountAutoFocus: u,
          children: ee.jsx(s_, {
            role: "dialog",
            id: h.contentId,
            "aria-describedby": h.descriptionId,
            "aria-labelledby": h.titleId,
            "data-state": Lh(h.open),
            ...c,
            ref: a,
            deferPointerDownOutside: !0,
            onDismiss: () => h.onOpenChange(!1),
          }),
        }),
      })
    );
  }),
  C_ = "DialogTitle",
  D_ = _.forwardRef((e, a) => {
    const { __scopeDialog: r, ...i } = e,
      s = Da(C_, r);
    return ee.jsx(ra.h2, { id: s.titleId, ...i, ref: a });
  });
D_.displayName = C_;
var M_ = "DialogDescription",
  N_ = _.forwardRef((e, a) => {
    const { __scopeDialog: r, ...i } = e,
      s = Da(M_, r);
    return ee.jsx(ra.p, { id: s.descriptionId, ...i, ref: a });
  });
N_.displayName = M_;
var k_ = "DialogClose",
  L_ = _.forwardRef((e, a) => {
    const { __scopeDialog: r, ...i } = e,
      s = Da(k_, r);
    return ee.jsx(ra.button, {
      type: "button",
      ...i,
      ref: a,
      onClick: pr(e.onClick, () => s.onOpenChange(!1)),
    });
  });
L_.displayName = k_;
function Lh(e) {
  return e ? "open" : "closed";
}
function J2({ ...e }) {
  return ee.jsx(w_, { "data-slot": "dialog", ...e });
}
function W2({ ...e }) {
  return ee.jsx(z_, { "data-slot": "dialog-portal", ...e });
}
function eA({ className: e, ...a }) {
  return ee.jsx(T_, {
    "data-slot": "dialog-overlay",
    className: Pt(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
      e,
    ),
    ...a,
  });
}
function tA({ className: e, children: a, showCloseButton: r = !0, ...i }) {
  return ee.jsxs(W2, {
    "data-slot": "dialog-portal",
    children: [
      ee.jsx(eA, {}),
      ee.jsx("div", {
        className: "pointer-events-none fixed inset-0 z-50 grid place-items-center",
        children: ee.jsxs(A_, {
          "data-slot": "dialog-content",
          className: Pt(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 pointer-events-auto relative grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
            e,
          ),
          ...i,
          children: [
            a,
            r &&
              ee.jsxs(L_, {
                "data-slot": "dialog-close",
                className:
                  "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                children: [
                  ee.jsx(WR, {}),
                  ee.jsx("span", { className: "sr-only", children: "Close" }),
                ],
              }),
          ],
        }),
      }),
    ],
  });
}
function nA({ className: e, ...a }) {
  return ee.jsx("div", {
    "data-slot": "dialog-header",
    className: Pt("flex flex-col gap-2 text-center sm:text-left", e),
    ...a,
  });
}
function r3({ className: e, ...a }) {
  return ee.jsx("div", {
    "data-slot": "dialog-footer",
    className: Pt("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", e),
    ...a,
  });
}
function aA({ className: e, ...a }) {
  return ee.jsx(D_, {
    "data-slot": "dialog-title",
    className: Pt("text-lg leading-none font-semibold", e),
    ...a,
  });
}
function rA({ className: e, ...a }) {
  return ee.jsx(N_, {
    "data-slot": "dialog-description",
    className: Pt("text-muted-foreground text-sm", e),
    ...a,
  });
}
var Xy;
function ne(e, a, r) {
  function i(h, p) {
    if (
      (h._zod ||
        Object.defineProperty(h, "_zod", {
          value: { def: p, constr: c, traits: new Set() },
          enumerable: !1,
        }),
      h._zod.traits.has(e))
    )
      return;
    (h._zod.traits.add(e), a(h, p));
    const m = c.prototype,
      y = Object.keys(m);
    for (let v = 0; v < y.length; v++) {
      const S = y[v];
      S in h || (h[S] = m[S].bind(h));
    }
  }
  const s = r?.Parent ?? Object;
  class u extends s {}
  Object.defineProperty(u, "name", { value: e });
  function c(h) {
    var p;
    const m = r?.Parent ? new u() : this;
    (i(m, h), (p = m._zod).deferred ?? (p.deferred = []));
    for (const y of m._zod.deferred) y();
    return m;
  }
  return (
    Object.defineProperty(c, "init", { value: i }),
    Object.defineProperty(c, Symbol.hasInstance, {
      value: (h) => (r?.Parent && h instanceof r.Parent ? !0 : h?._zod?.traits?.has(e)),
    }),
    Object.defineProperty(c, "name", { value: e }),
    c
  );
}
class Si extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class U_ extends Error {
  constructor(a) {
    (super(`Encountered unidirectional transform during encode: ${a}`),
      (this.name = "ZodEncodeError"));
  }
}
(Xy = globalThis).__zod_globalConfig ?? (Xy.__zod_globalConfig = {});
const Uh = globalThis.__zod_globalConfig;
function _l(e) {
  return Uh;
}
function j_(e) {
  const a = Object.values(e).filter((i) => typeof i == "number");
  return Object.entries(e)
    .filter(([i, s]) => a.indexOf(+i) === -1)
    .map(([i, s]) => s);
}
function Wd(e, a) {
  return typeof a == "bigint" ? a.toString() : a;
}
function jh(e) {
  return {
    get value() {
      {
        const a = e();
        return (Object.defineProperty(this, "value", { value: a }), a);
      }
    },
  };
}
function Vh(e) {
  return e == null;
}
function Bh(e) {
  const a = e.startsWith("^") ? 1 : 0,
    r = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(a, r);
}
function lA(e, a) {
  const r = e / a,
    i = Math.round(r),
    s = Number.EPSILON * Math.max(Math.abs(r), 1);
  return Math.abs(r - i) < s ? 0 : r - i;
}
const Iy = Symbol("evaluating");
function _t(e, a, r) {
  let i;
  Object.defineProperty(e, a, {
    get() {
      if (i !== Iy) return (i === void 0 && ((i = Iy), (i = r())), i);
    },
    set(s) {
      Object.defineProperty(e, a, { value: s });
    },
    configurable: !0,
  });
}
function Rl(e, a, r) {
  Object.defineProperty(e, a, { value: r, writable: !0, enumerable: !0, configurable: !0 });
}
function Kr(...e) {
  const a = {};
  for (const r of e) {
    const i = Object.getOwnPropertyDescriptors(r);
    Object.assign(a, i);
  }
  return Object.defineProperties({}, a);
}
function Qy(e) {
  return JSON.stringify(e);
}
function iA(e) {
  return e
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
const V_ = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function ku(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const oA = jh(() => {
  if (Uh.jitless || (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")))
    return !1;
  try {
    const e = Function;
    return (new e(""), !0);
  } catch {
    return !1;
  }
});
function ko(e) {
  if (ku(e) === !1) return !1;
  const a = e.constructor;
  if (a === void 0 || typeof a != "function") return !0;
  const r = a.prototype;
  return !(ku(r) === !1 || Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1);
}
function B_(e) {
  return ko(e)
    ? { ...e }
    : Array.isArray(e)
      ? [...e]
      : e instanceof Map
        ? new Map(e)
        : e instanceof Set
          ? new Set(e)
          : e;
}
const sA = new Set(["string", "number", "symbol"]);
function Ri(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Jr(e, a, r) {
  const i = new e._zod.constr(a ?? e._zod.def);
  return ((!a || r?.parent) && (i._zod.parent = e), i);
}
function Le(e) {
  const a = e;
  if (!a) return {};
  if (typeof a == "string") return { error: () => a };
  if (a?.message !== void 0) {
    if (a?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
    a.error = a.message;
  }
  return (delete a.message, typeof a.error == "string" ? { ...a, error: () => a.error } : a);
}
function uA(e) {
  return Object.keys(e).filter(
    (a) => e[a]._zod.optin === "optional" && e[a]._zod.optout === "optional",
  );
}
const cA = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
function fA(e, a) {
  const r = e._zod.def,
    i = r.checks;
  if (i && i.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const u = Kr(e._zod.def, {
    get shape() {
      const c = {};
      for (const h in a) {
        if (!(h in r.shape)) throw new Error(`Unrecognized key: "${h}"`);
        a[h] && (c[h] = r.shape[h]);
      }
      return (Rl(this, "shape", c), c);
    },
    checks: [],
  });
  return Jr(e, u);
}
function dA(e, a) {
  const r = e._zod.def,
    i = r.checks;
  if (i && i.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const u = Kr(e._zod.def, {
    get shape() {
      const c = { ...e._zod.def.shape };
      for (const h in a) {
        if (!(h in r.shape)) throw new Error(`Unrecognized key: "${h}"`);
        a[h] && delete c[h];
      }
      return (Rl(this, "shape", c), c);
    },
    checks: [],
  });
  return Jr(e, u);
}
function hA(e, a) {
  if (!ko(a)) throw new Error("Invalid input to extend: expected a plain object");
  const r = e._zod.def.checks;
  if (r && r.length > 0) {
    const u = e._zod.def.shape;
    for (const c in a)
      if (Object.getOwnPropertyDescriptor(u, c) !== void 0)
        throw new Error(
          "Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.",
        );
  }
  const s = Kr(e._zod.def, {
    get shape() {
      const u = { ...e._zod.def.shape, ...a };
      return (Rl(this, "shape", u), u);
    },
  });
  return Jr(e, s);
}
function mA(e, a) {
  if (!ko(a)) throw new Error("Invalid input to safeExtend: expected a plain object");
  const r = Kr(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape, ...a };
      return (Rl(this, "shape", i), i);
    },
  });
  return Jr(e, r);
}
function pA(e, a) {
  if (e._zod.def.checks?.length)
    throw new Error(
      ".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.",
    );
  const r = Kr(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape, ...a._zod.def.shape };
      return (Rl(this, "shape", i), i);
    },
    get catchall() {
      return a._zod.def.catchall;
    },
    checks: a._zod.def.checks ?? [],
  });
  return Jr(e, r);
}
function vA(e, a, r) {
  const s = a._zod.def.checks;
  if (s && s.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const c = Kr(a._zod.def, {
    get shape() {
      const h = a._zod.def.shape,
        p = { ...h };
      if (r)
        for (const m in r) {
          if (!(m in h)) throw new Error(`Unrecognized key: "${m}"`);
          r[m] && (p[m] = e ? new e({ type: "optional", innerType: h[m] }) : h[m]);
        }
      else for (const m in h) p[m] = e ? new e({ type: "optional", innerType: h[m] }) : h[m];
      return (Rl(this, "shape", p), p);
    },
    checks: [],
  });
  return Jr(a, c);
}
function gA(e, a, r) {
  const i = Kr(a._zod.def, {
    get shape() {
      const s = a._zod.def.shape,
        u = { ...s };
      if (r)
        for (const c in r) {
          if (!(c in u)) throw new Error(`Unrecognized key: "${c}"`);
          r[c] && (u[c] = new e({ type: "nonoptional", innerType: s[c] }));
        }
      else for (const c in s) u[c] = new e({ type: "nonoptional", innerType: s[c] });
      return (Rl(this, "shape", u), u);
    },
  });
  return Jr(a, i);
}
function yi(e, a = 0) {
  if (e.aborted === !0) return !0;
  for (let r = a; r < e.issues.length; r++) if (e.issues[r]?.continue !== !0) return !0;
  return !1;
}
function yA(e, a = 0) {
  if (e.aborted === !0) return !0;
  for (let r = a; r < e.issues.length; r++) if (e.issues[r]?.continue === !1) return !0;
  return !1;
}
function H_(e, a) {
  return a.map((r) => {
    var i;
    return ((i = r).path ?? (i.path = []), r.path.unshift(e), r);
  });
}
function pu(e) {
  return typeof e == "string" ? e : e?.message;
}
function Sl(e, a, r) {
  const i = e.message
      ? e.message
      : (pu(e.inst?._zod.def?.error?.(e)) ??
        pu(a?.error?.(e)) ??
        pu(r.customError?.(e)) ??
        pu(r.localeError?.(e)) ??
        "Invalid input"),
    { inst: s, continue: u, input: c, ...h } = e;
  return (h.path ?? (h.path = []), (h.message = i), a?.reportInput && (h.input = c), h);
}
function Hh(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Lo(...e) {
  const [a, r, i] = e;
  return typeof a == "string" ? { message: a, code: "custom", input: r, inst: i } : { ...a };
}
const Z_ = (e, a) => {
    ((e.name = "$ZodError"),
      Object.defineProperty(e, "_zod", { value: e._zod, enumerable: !1 }),
      Object.defineProperty(e, "issues", { value: a, enumerable: !1 }),
      (e.message = JSON.stringify(a, Wd, 2)),
      Object.defineProperty(e, "toString", { value: () => e.message, enumerable: !1 }));
  },
  Zh = ne("$ZodError", Z_),
  Ju = ne("$ZodError", Z_, { Parent: Error });
function bA(e, a = (r) => r.message) {
  const r = {},
    i = [];
  for (const s of e.issues)
    s.path.length > 0
      ? ((r[s.path[0]] = r[s.path[0]] || []), r[s.path[0]].push(a(s)))
      : i.push(a(s));
  return { formErrors: i, fieldErrors: r };
}
function _A(e, a = (r) => r.message) {
  const r = { _errors: [] },
    i = (s, u = []) => {
      for (const c of s.issues)
        if (c.code === "invalid_union" && c.errors.length)
          c.errors.map((h) => i({ issues: h }, [...u, ...c.path]));
        else if (c.code === "invalid_key") i({ issues: c.issues }, [...u, ...c.path]);
        else if (c.code === "invalid_element") i({ issues: c.issues }, [...u, ...c.path]);
        else {
          const h = [...u, ...c.path];
          if (h.length === 0) r._errors.push(a(c));
          else {
            let p = r,
              m = 0;
            for (; m < h.length; ) {
              const y = h[m];
              (m === h.length - 1
                ? ((p[y] = p[y] || { _errors: [] }), p[y]._errors.push(a(c)))
                : (p[y] = p[y] || { _errors: [] }),
                (p = p[y]),
                m++);
            }
          }
        }
    };
  return (i(e), r);
}
const Wu = (e) => (a, r, i, s) => {
    const u = i ? { ...i, async: !1 } : { async: !1 },
      c = a._zod.run({ value: r, issues: [] }, u);
    if (c instanceof Promise) throw new Si();
    if (c.issues.length) {
      const h = new (s?.Err ?? e)(c.issues.map((p) => Sl(p, u, _l())));
      throw (V_(h, s?.callee), h);
    }
    return c.value;
  },
  SA = Wu(Ju),
  ec = (e) => async (a, r, i, s) => {
    const u = i ? { ...i, async: !0 } : { async: !0 };
    let c = a._zod.run({ value: r, issues: [] }, u);
    if ((c instanceof Promise && (c = await c), c.issues.length)) {
      const h = new (s?.Err ?? e)(c.issues.map((p) => Sl(p, u, _l())));
      throw (V_(h, s?.callee), h);
    }
    return c.value;
  },
  EA = ec(Ju),
  tc = (e) => (a, r, i) => {
    const s = i ? { ...i, async: !1 } : { async: !1 },
      u = a._zod.run({ value: r, issues: [] }, s);
    if (u instanceof Promise) throw new Si();
    return u.issues.length
      ? { success: !1, error: new (e ?? Zh)(u.issues.map((c) => Sl(c, s, _l()))) }
      : { success: !0, data: u.value };
  },
  wA = tc(Ju),
  nc = (e) => async (a, r, i) => {
    const s = i ? { ...i, async: !0 } : { async: !0 };
    let u = a._zod.run({ value: r, issues: [] }, s);
    return (
      u instanceof Promise && (u = await u),
      u.issues.length
        ? { success: !1, error: new e(u.issues.map((c) => Sl(c, s, _l()))) }
        : { success: !0, data: u.value }
    );
  },
  xA = nc(Ju),
  RA = (e) => (a, r, i) => {
    const s = i ? { ...i, direction: "backward" } : { direction: "backward" };
    return Wu(e)(a, r, s);
  },
  zA = (e) => (a, r, i) => Wu(e)(a, r, i),
  TA = (e) => async (a, r, i) => {
    const s = i ? { ...i, direction: "backward" } : { direction: "backward" };
    return ec(e)(a, r, s);
  },
  AA = (e) => async (a, r, i) => ec(e)(a, r, i),
  OA = (e) => (a, r, i) => {
    const s = i ? { ...i, direction: "backward" } : { direction: "backward" };
    return tc(e)(a, r, s);
  },
  CA = (e) => (a, r, i) => tc(e)(a, r, i),
  DA = (e) => async (a, r, i) => {
    const s = i ? { ...i, direction: "backward" } : { direction: "backward" };
    return nc(e)(a, r, s);
  },
  MA = (e) => async (a, r, i) => nc(e)(a, r, i),
  NA = /^[cC][0-9a-z]{6,}$/,
  kA = /^[0-9a-z]+$/,
  LA = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  UA = /^[0-9a-vA-V]{20}$/,
  jA = /^[A-Za-z0-9]{27}$/,
  VA = /^[a-zA-Z0-9_-]{21}$/,
  BA =
    /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  HA = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  Ky = (e) =>
    e
      ? new RegExp(
          `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
        )
      : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
  ZA =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
  $A = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function YA() {
  return new RegExp($A, "u");
}
const FA =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  qA =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
  GA =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  PA =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  XA = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  $_ = /^[A-Za-z0-9_-]*$/,
  IA = /^https?$/,
  QA = /^\+[1-9]\d{6,14}$/,
  Y_ =
    "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",
  KA = new RegExp(`^${Y_}$`);
function F_(e) {
  const a = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number"
    ? e.precision === -1
      ? `${a}`
      : e.precision === 0
        ? `${a}:[0-5]\\d`
        : `${a}:[0-5]\\d\\.\\d{${e.precision}}`
    : `${a}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function JA(e) {
  return new RegExp(`^${F_(e)}$`);
}
function WA(e) {
  const a = F_({ precision: e.precision }),
    r = ["Z"];
  (e.local && r.push(""), e.offset && r.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)"));
  const i = `${a}(?:${r.join("|")})`;
  return new RegExp(`^${Y_}T(?:${i})$`);
}
const eO = (e) => {
    const a = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
    return new RegExp(`^${a}$`);
  },
  tO = /^-?\d+$/,
  nO = /^-?\d+(?:\.\d+)?$/,
  aO = /^(?:true|false)$/i,
  rO = /^[^A-Z]*$/,
  lO = /^[^a-z]*$/,
  $n = ne("$ZodCheck", (e, a) => {
    var r;
    (e._zod ?? (e._zod = {}), (e._zod.def = a), (r = e._zod).onattach ?? (r.onattach = []));
  }),
  q_ = { number: "number", bigint: "bigint", object: "date" },
  G_ = ne("$ZodCheckLessThan", (e, a) => {
    $n.init(e, a);
    const r = q_[typeof a.value];
    (e._zod.onattach.push((i) => {
      const s = i._zod.bag,
        u = (a.inclusive ? s.maximum : s.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
      a.value < u && (a.inclusive ? (s.maximum = a.value) : (s.exclusiveMaximum = a.value));
    }),
      (e._zod.check = (i) => {
        (a.inclusive ? i.value <= a.value : i.value < a.value) ||
          i.issues.push({
            origin: r,
            code: "too_big",
            maximum: typeof a.value == "object" ? a.value.getTime() : a.value,
            input: i.value,
            inclusive: a.inclusive,
            inst: e,
            continue: !a.abort,
          });
      }));
  }),
  P_ = ne("$ZodCheckGreaterThan", (e, a) => {
    $n.init(e, a);
    const r = q_[typeof a.value];
    (e._zod.onattach.push((i) => {
      const s = i._zod.bag,
        u = (a.inclusive ? s.minimum : s.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
      a.value > u && (a.inclusive ? (s.minimum = a.value) : (s.exclusiveMinimum = a.value));
    }),
      (e._zod.check = (i) => {
        (a.inclusive ? i.value >= a.value : i.value > a.value) ||
          i.issues.push({
            origin: r,
            code: "too_small",
            minimum: typeof a.value == "object" ? a.value.getTime() : a.value,
            input: i.value,
            inclusive: a.inclusive,
            inst: e,
            continue: !a.abort,
          });
      }));
  }),
  iO = ne("$ZodCheckMultipleOf", (e, a) => {
    ($n.init(e, a),
      e._zod.onattach.push((r) => {
        var i;
        (i = r._zod.bag).multipleOf ?? (i.multipleOf = a.value);
      }),
      (e._zod.check = (r) => {
        if (typeof r.value != typeof a.value)
          throw new Error("Cannot mix number and bigint in multiple_of check.");
        (typeof r.value == "bigint"
          ? r.value % a.value === BigInt(0)
          : lA(r.value, a.value) === 0) ||
          r.issues.push({
            origin: typeof r.value,
            code: "not_multiple_of",
            divisor: a.value,
            input: r.value,
            inst: e,
            continue: !a.abort,
          });
      }));
  }),
  oO = ne("$ZodCheckNumberFormat", (e, a) => {
    ($n.init(e, a), (a.format = a.format || "float64"));
    const r = a.format?.includes("int"),
      i = r ? "int" : "number",
      [s, u] = cA[a.format];
    (e._zod.onattach.push((c) => {
      const h = c._zod.bag;
      ((h.format = a.format), (h.minimum = s), (h.maximum = u), r && (h.pattern = tO));
    }),
      (e._zod.check = (c) => {
        const h = c.value;
        if (r) {
          if (!Number.isInteger(h)) {
            c.issues.push({
              expected: i,
              format: a.format,
              code: "invalid_type",
              continue: !1,
              input: h,
              inst: e,
            });
            return;
          }
          if (!Number.isSafeInteger(h)) {
            h > 0
              ? c.issues.push({
                  input: h,
                  code: "too_big",
                  maximum: Number.MAX_SAFE_INTEGER,
                  note: "Integers must be within the safe integer range.",
                  inst: e,
                  origin: i,
                  inclusive: !0,
                  continue: !a.abort,
                })
              : c.issues.push({
                  input: h,
                  code: "too_small",
                  minimum: Number.MIN_SAFE_INTEGER,
                  note: "Integers must be within the safe integer range.",
                  inst: e,
                  origin: i,
                  inclusive: !0,
                  continue: !a.abort,
                });
            return;
          }
        }
        (h < s &&
          c.issues.push({
            origin: "number",
            input: h,
            code: "too_small",
            minimum: s,
            inclusive: !0,
            inst: e,
            continue: !a.abort,
          }),
          h > u &&
            c.issues.push({
              origin: "number",
              input: h,
              code: "too_big",
              maximum: u,
              inclusive: !0,
              inst: e,
              continue: !a.abort,
            }));
      }));
  }),
  sO = ne("$ZodCheckMaxLength", (e, a) => {
    var r;
    ($n.init(e, a),
      (r = e._zod.def).when ??
        (r.when = (i) => {
          const s = i.value;
          return !Vh(s) && s.length !== void 0;
        }),
      e._zod.onattach.push((i) => {
        const s = i._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        a.maximum < s && (i._zod.bag.maximum = a.maximum);
      }),
      (e._zod.check = (i) => {
        const s = i.value;
        if (s.length <= a.maximum) return;
        const c = Hh(s);
        i.issues.push({
          origin: c,
          code: "too_big",
          maximum: a.maximum,
          inclusive: !0,
          input: s,
          inst: e,
          continue: !a.abort,
        });
      }));
  }),
  uO = ne("$ZodCheckMinLength", (e, a) => {
    var r;
    ($n.init(e, a),
      (r = e._zod.def).when ??
        (r.when = (i) => {
          const s = i.value;
          return !Vh(s) && s.length !== void 0;
        }),
      e._zod.onattach.push((i) => {
        const s = i._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        a.minimum > s && (i._zod.bag.minimum = a.minimum);
      }),
      (e._zod.check = (i) => {
        const s = i.value;
        if (s.length >= a.minimum) return;
        const c = Hh(s);
        i.issues.push({
          origin: c,
          code: "too_small",
          minimum: a.minimum,
          inclusive: !0,
          input: s,
          inst: e,
          continue: !a.abort,
        });
      }));
  }),
  cO = ne("$ZodCheckLengthEquals", (e, a) => {
    var r;
    ($n.init(e, a),
      (r = e._zod.def).when ??
        (r.when = (i) => {
          const s = i.value;
          return !Vh(s) && s.length !== void 0;
        }),
      e._zod.onattach.push((i) => {
        const s = i._zod.bag;
        ((s.minimum = a.length), (s.maximum = a.length), (s.length = a.length));
      }),
      (e._zod.check = (i) => {
        const s = i.value,
          u = s.length;
        if (u === a.length) return;
        const c = Hh(s),
          h = u > a.length;
        i.issues.push({
          origin: c,
          ...(h
            ? { code: "too_big", maximum: a.length }
            : { code: "too_small", minimum: a.length }),
          inclusive: !0,
          exact: !0,
          input: i.value,
          inst: e,
          continue: !a.abort,
        });
      }));
  }),
  ac = ne("$ZodCheckStringFormat", (e, a) => {
    var r, i;
    ($n.init(e, a),
      e._zod.onattach.push((s) => {
        const u = s._zod.bag;
        ((u.format = a.format),
          a.pattern && (u.patterns ?? (u.patterns = new Set()), u.patterns.add(a.pattern)));
      }),
      a.pattern
        ? ((r = e._zod).check ??
          (r.check = (s) => {
            ((a.pattern.lastIndex = 0),
              !a.pattern.test(s.value) &&
                s.issues.push({
                  origin: "string",
                  code: "invalid_format",
                  format: a.format,
                  input: s.value,
                  ...(a.pattern ? { pattern: a.pattern.toString() } : {}),
                  inst: e,
                  continue: !a.abort,
                }));
          }))
        : ((i = e._zod).check ?? (i.check = () => {})));
  }),
  fO = ne("$ZodCheckRegex", (e, a) => {
    (ac.init(e, a),
      (e._zod.check = (r) => {
        ((a.pattern.lastIndex = 0),
          !a.pattern.test(r.value) &&
            r.issues.push({
              origin: "string",
              code: "invalid_format",
              format: "regex",
              input: r.value,
              pattern: a.pattern.toString(),
              inst: e,
              continue: !a.abort,
            }));
      }));
  }),
  dO = ne("$ZodCheckLowerCase", (e, a) => {
    (a.pattern ?? (a.pattern = rO), ac.init(e, a));
  }),
  hO = ne("$ZodCheckUpperCase", (e, a) => {
    (a.pattern ?? (a.pattern = lO), ac.init(e, a));
  }),
  mO = ne("$ZodCheckIncludes", (e, a) => {
    $n.init(e, a);
    const r = Ri(a.includes),
      i = new RegExp(typeof a.position == "number" ? `^.{${a.position}}${r}` : r);
    ((a.pattern = i),
      e._zod.onattach.push((s) => {
        const u = s._zod.bag;
        (u.patterns ?? (u.patterns = new Set()), u.patterns.add(i));
      }),
      (e._zod.check = (s) => {
        s.value.includes(a.includes, a.position) ||
          s.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "includes",
            includes: a.includes,
            input: s.value,
            inst: e,
            continue: !a.abort,
          });
      }));
  }),
  pO = ne("$ZodCheckStartsWith", (e, a) => {
    $n.init(e, a);
    const r = new RegExp(`^${Ri(a.prefix)}.*`);
    (a.pattern ?? (a.pattern = r),
      e._zod.onattach.push((i) => {
        const s = i._zod.bag;
        (s.patterns ?? (s.patterns = new Set()), s.patterns.add(r));
      }),
      (e._zod.check = (i) => {
        i.value.startsWith(a.prefix) ||
          i.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "starts_with",
            prefix: a.prefix,
            input: i.value,
            inst: e,
            continue: !a.abort,
          });
      }));
  }),
  vO = ne("$ZodCheckEndsWith", (e, a) => {
    $n.init(e, a);
    const r = new RegExp(`.*${Ri(a.suffix)}$`);
    (a.pattern ?? (a.pattern = r),
      e._zod.onattach.push((i) => {
        const s = i._zod.bag;
        (s.patterns ?? (s.patterns = new Set()), s.patterns.add(r));
      }),
      (e._zod.check = (i) => {
        i.value.endsWith(a.suffix) ||
          i.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "ends_with",
            suffix: a.suffix,
            input: i.value,
            inst: e,
            continue: !a.abort,
          });
      }));
  }),
  gO = ne("$ZodCheckOverwrite", (e, a) => {
    ($n.init(e, a),
      (e._zod.check = (r) => {
        r.value = a.tx(r.value);
      }));
  });
class yO {
  constructor(a = []) {
    ((this.content = []), (this.indent = 0), this && (this.args = a));
  }
  indented(a) {
    ((this.indent += 1), a(this), (this.indent -= 1));
  }
  write(a) {
    if (typeof a == "function") {
      (a(this, { execution: "sync" }), a(this, { execution: "async" }));
      return;
    }
    const i = a
        .split(`
`)
        .filter((c) => c),
      s = Math.min(...i.map((c) => c.length - c.trimStart().length)),
      u = i.map((c) => c.slice(s)).map((c) => " ".repeat(this.indent * 2) + c);
    for (const c of u) this.content.push(c);
  }
  compile() {
    const a = Function,
      r = this?.args,
      s = [...(this?.content ?? [""]).map((u) => `  ${u}`)];
    return new a(
      ...r,
      s.join(`
`),
    );
  }
}
const bO = { major: 4, minor: 4, patch: 3 },
  $t = ne("$ZodType", (e, a) => {
    var r;
    (e ?? (e = {}), (e._zod.def = a), (e._zod.bag = e._zod.bag || {}), (e._zod.version = bO));
    const i = [...(e._zod.def.checks ?? [])];
    e._zod.traits.has("$ZodCheck") && i.unshift(e);
    for (const s of i) for (const u of s._zod.onattach) u(e);
    if (i.length === 0)
      ((r = e._zod).deferred ?? (r.deferred = []),
        e._zod.deferred?.push(() => {
          e._zod.run = e._zod.parse;
        }));
    else {
      const s = (c, h, p) => {
          let m = yi(c),
            y;
          for (const v of h) {
            if (v._zod.def.when) {
              if (yA(c) || !v._zod.def.when(c)) continue;
            } else if (m) continue;
            const S = c.issues.length,
              E = v._zod.check(c);
            if (E instanceof Promise && p?.async === !1) throw new Si();
            if (y || E instanceof Promise)
              y = (y ?? Promise.resolve()).then(async () => {
                (await E, c.issues.length !== S && (m || (m = yi(c, S))));
              });
            else {
              if (c.issues.length === S) continue;
              m || (m = yi(c, S));
            }
          }
          return y ? y.then(() => c) : c;
        },
        u = (c, h, p) => {
          if (yi(c)) return ((c.aborted = !0), c);
          const m = s(h, i, p);
          if (m instanceof Promise) {
            if (p.async === !1) throw new Si();
            return m.then((y) => e._zod.parse(y, p));
          }
          return e._zod.parse(m, p);
        };
      e._zod.run = (c, h) => {
        if (h.skipChecks) return e._zod.parse(c, h);
        if (h.direction === "backward") {
          const m = e._zod.parse({ value: c.value, issues: [] }, { ...h, skipChecks: !0 });
          return m instanceof Promise ? m.then((y) => u(y, c, h)) : u(m, c, h);
        }
        const p = e._zod.parse(c, h);
        if (p instanceof Promise) {
          if (h.async === !1) throw new Si();
          return p.then((m) => s(m, i, h));
        }
        return s(p, i, h);
      };
    }
    _t(e, "~standard", () => ({
      validate: (s) => {
        try {
          const u = wA(e, s);
          return u.success ? { value: u.data } : { issues: u.error?.issues };
        } catch {
          return xA(e, s).then((c) =>
            c.success ? { value: c.data } : { issues: c.error?.issues },
          );
        }
      },
      vendor: "zod",
      version: 1,
    }));
  }),
  $h = ne("$ZodString", (e, a) => {
    ($t.init(e, a),
      (e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? eO(e._zod.bag)),
      (e._zod.parse = (r, i) => {
        if (a.coerce)
          try {
            r.value = String(r.value);
          } catch {}
        return (
          typeof r.value == "string" ||
            r.issues.push({ expected: "string", code: "invalid_type", input: r.value, inst: e }),
          r
        );
      }));
  }),
  Mt = ne("$ZodStringFormat", (e, a) => {
    (ac.init(e, a), $h.init(e, a));
  }),
  _O = ne("$ZodGUID", (e, a) => {
    (a.pattern ?? (a.pattern = HA), Mt.init(e, a));
  }),
  SO = ne("$ZodUUID", (e, a) => {
    if (a.version) {
      const i = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[a.version];
      if (i === void 0) throw new Error(`Invalid UUID version: "${a.version}"`);
      a.pattern ?? (a.pattern = Ky(i));
    } else a.pattern ?? (a.pattern = Ky());
    Mt.init(e, a);
  }),
  EO = ne("$ZodEmail", (e, a) => {
    (a.pattern ?? (a.pattern = ZA), Mt.init(e, a));
  }),
  wO = ne("$ZodURL", (e, a) => {
    (Mt.init(e, a),
      (e._zod.check = (r) => {
        try {
          const i = r.value.trim();
          if (!a.normalize && a.protocol?.source === IA.source && !/^https?:\/\//i.test(i)) {
            r.issues.push({
              code: "invalid_format",
              format: "url",
              note: "Invalid URL format",
              input: r.value,
              inst: e,
              continue: !a.abort,
            });
            return;
          }
          const s = new URL(i);
          (a.hostname &&
            ((a.hostname.lastIndex = 0),
            a.hostname.test(s.hostname) ||
              r.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid hostname",
                pattern: a.hostname.source,
                input: r.value,
                inst: e,
                continue: !a.abort,
              })),
            a.protocol &&
              ((a.protocol.lastIndex = 0),
              a.protocol.test(s.protocol.endsWith(":") ? s.protocol.slice(0, -1) : s.protocol) ||
                r.issues.push({
                  code: "invalid_format",
                  format: "url",
                  note: "Invalid protocol",
                  pattern: a.protocol.source,
                  input: r.value,
                  inst: e,
                  continue: !a.abort,
                })),
            a.normalize ? (r.value = s.href) : (r.value = i));
          return;
        } catch {
          r.issues.push({
            code: "invalid_format",
            format: "url",
            input: r.value,
            inst: e,
            continue: !a.abort,
          });
        }
      }));
  }),
  xO = ne("$ZodEmoji", (e, a) => {
    (a.pattern ?? (a.pattern = YA()), Mt.init(e, a));
  }),
  RO = ne("$ZodNanoID", (e, a) => {
    (a.pattern ?? (a.pattern = VA), Mt.init(e, a));
  }),
  zO = ne("$ZodCUID", (e, a) => {
    (a.pattern ?? (a.pattern = NA), Mt.init(e, a));
  }),
  TO = ne("$ZodCUID2", (e, a) => {
    (a.pattern ?? (a.pattern = kA), Mt.init(e, a));
  }),
  AO = ne("$ZodULID", (e, a) => {
    (a.pattern ?? (a.pattern = LA), Mt.init(e, a));
  }),
  OO = ne("$ZodXID", (e, a) => {
    (a.pattern ?? (a.pattern = UA), Mt.init(e, a));
  }),
  CO = ne("$ZodKSUID", (e, a) => {
    (a.pattern ?? (a.pattern = jA), Mt.init(e, a));
  }),
  DO = ne("$ZodISODateTime", (e, a) => {
    (a.pattern ?? (a.pattern = WA(a)), Mt.init(e, a));
  }),
  MO = ne("$ZodISODate", (e, a) => {
    (a.pattern ?? (a.pattern = KA), Mt.init(e, a));
  }),
  NO = ne("$ZodISOTime", (e, a) => {
    (a.pattern ?? (a.pattern = JA(a)), Mt.init(e, a));
  }),
  kO = ne("$ZodISODuration", (e, a) => {
    (a.pattern ?? (a.pattern = BA), Mt.init(e, a));
  }),
  LO = ne("$ZodIPv4", (e, a) => {
    (a.pattern ?? (a.pattern = FA), Mt.init(e, a), (e._zod.bag.format = "ipv4"));
  }),
  UO = ne("$ZodIPv6", (e, a) => {
    (a.pattern ?? (a.pattern = qA),
      Mt.init(e, a),
      (e._zod.bag.format = "ipv6"),
      (e._zod.check = (r) => {
        try {
          new URL(`http://[${r.value}]`);
        } catch {
          r.issues.push({
            code: "invalid_format",
            format: "ipv6",
            input: r.value,
            inst: e,
            continue: !a.abort,
          });
        }
      }));
  }),
  jO = ne("$ZodCIDRv4", (e, a) => {
    (a.pattern ?? (a.pattern = GA), Mt.init(e, a));
  }),
  VO = ne("$ZodCIDRv6", (e, a) => {
    (a.pattern ?? (a.pattern = PA),
      Mt.init(e, a),
      (e._zod.check = (r) => {
        const i = r.value.split("/");
        try {
          if (i.length !== 2) throw new Error();
          const [s, u] = i;
          if (!u) throw new Error();
          const c = Number(u);
          if (`${c}` !== u) throw new Error();
          if (c < 0 || c > 128) throw new Error();
          new URL(`http://[${s}]`);
        } catch {
          r.issues.push({
            code: "invalid_format",
            format: "cidrv6",
            input: r.value,
            inst: e,
            continue: !a.abort,
          });
        }
      }));
  });
function X_(e) {
  if (e === "") return !0;
  if (/\s/.test(e) || e.length % 4 !== 0) return !1;
  try {
    return (atob(e), !0);
  } catch {
    return !1;
  }
}
const BO = ne("$ZodBase64", (e, a) => {
  (a.pattern ?? (a.pattern = XA),
    Mt.init(e, a),
    (e._zod.bag.contentEncoding = "base64"),
    (e._zod.check = (r) => {
      X_(r.value) ||
        r.issues.push({
          code: "invalid_format",
          format: "base64",
          input: r.value,
          inst: e,
          continue: !a.abort,
        });
    }));
});
function HO(e) {
  if (!$_.test(e)) return !1;
  const a = e.replace(/[-_]/g, (i) => (i === "-" ? "+" : "/")),
    r = a.padEnd(Math.ceil(a.length / 4) * 4, "=");
  return X_(r);
}
const ZO = ne("$ZodBase64URL", (e, a) => {
    (a.pattern ?? (a.pattern = $_),
      Mt.init(e, a),
      (e._zod.bag.contentEncoding = "base64url"),
      (e._zod.check = (r) => {
        HO(r.value) ||
          r.issues.push({
            code: "invalid_format",
            format: "base64url",
            input: r.value,
            inst: e,
            continue: !a.abort,
          });
      }));
  }),
  $O = ne("$ZodE164", (e, a) => {
    (a.pattern ?? (a.pattern = QA), Mt.init(e, a));
  });
function YO(e, a = null) {
  try {
    const r = e.split(".");
    if (r.length !== 3) return !1;
    const [i] = r;
    if (!i) return !1;
    const s = JSON.parse(atob(i));
    return !(("typ" in s && s?.typ !== "JWT") || !s.alg || (a && (!("alg" in s) || s.alg !== a)));
  } catch {
    return !1;
  }
}
const FO = ne("$ZodJWT", (e, a) => {
    (Mt.init(e, a),
      (e._zod.check = (r) => {
        YO(r.value, a.alg) ||
          r.issues.push({
            code: "invalid_format",
            format: "jwt",
            input: r.value,
            inst: e,
            continue: !a.abort,
          });
      }));
  }),
  I_ = ne("$ZodNumber", (e, a) => {
    ($t.init(e, a),
      (e._zod.pattern = e._zod.bag.pattern ?? nO),
      (e._zod.parse = (r, i) => {
        if (a.coerce)
          try {
            r.value = Number(r.value);
          } catch {}
        const s = r.value;
        if (typeof s == "number" && !Number.isNaN(s) && Number.isFinite(s)) return r;
        const u =
          typeof s == "number"
            ? Number.isNaN(s)
              ? "NaN"
              : Number.isFinite(s)
                ? void 0
                : "Infinity"
            : void 0;
        return (
          r.issues.push({
            expected: "number",
            code: "invalid_type",
            input: s,
            inst: e,
            ...(u ? { received: u } : {}),
          }),
          r
        );
      }));
  }),
  qO = ne("$ZodNumberFormat", (e, a) => {
    (oO.init(e, a), I_.init(e, a));
  }),
  GO = ne("$ZodBoolean", (e, a) => {
    ($t.init(e, a),
      (e._zod.pattern = aO),
      (e._zod.parse = (r, i) => {
        if (a.coerce)
          try {
            r.value = !!r.value;
          } catch {}
        const s = r.value;
        return (
          typeof s == "boolean" ||
            r.issues.push({ expected: "boolean", code: "invalid_type", input: s, inst: e }),
          r
        );
      }));
  }),
  PO = ne("$ZodUnknown", (e, a) => {
    ($t.init(e, a), (e._zod.parse = (r) => r));
  }),
  XO = ne("$ZodNever", (e, a) => {
    ($t.init(e, a),
      (e._zod.parse = (r, i) => (
        r.issues.push({ expected: "never", code: "invalid_type", input: r.value, inst: e }),
        r
      )));
  });
function Jy(e, a, r) {
  (e.issues.length && a.issues.push(...H_(r, e.issues)), (a.value[r] = e.value));
}
const IO = ne("$ZodArray", (e, a) => {
  ($t.init(e, a),
    (e._zod.parse = (r, i) => {
      const s = r.value;
      if (!Array.isArray(s))
        return (r.issues.push({ expected: "array", code: "invalid_type", input: s, inst: e }), r);
      r.value = Array(s.length);
      const u = [];
      for (let c = 0; c < s.length; c++) {
        const h = s[c],
          p = a.element._zod.run({ value: h, issues: [] }, i);
        p instanceof Promise ? u.push(p.then((m) => Jy(m, r, c))) : Jy(p, r, c);
      }
      return u.length ? Promise.all(u).then(() => r) : r;
    }));
});
function Lu(e, a, r, i, s, u) {
  const c = r in i;
  if (e.issues.length) {
    if (s && u && !c) return;
    a.issues.push(...H_(r, e.issues));
  }
  if (!c && !s) {
    e.issues.length ||
      a.issues.push({ code: "invalid_type", expected: "nonoptional", input: void 0, path: [r] });
    return;
  }
  e.value === void 0 ? c && (a.value[r] = void 0) : (a.value[r] = e.value);
}
function Q_(e) {
  const a = Object.keys(e.shape);
  for (const i of a)
    if (!e.shape?.[i]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${i}": expected a Zod schema`);
  const r = uA(e.shape);
  return { ...e, keys: a, keySet: new Set(a), numKeys: a.length, optionalKeys: new Set(r) };
}
function K_(e, a, r, i, s, u) {
  const c = [],
    h = s.keySet,
    p = s.catchall._zod,
    m = p.def.type,
    y = p.optin === "optional",
    v = p.optout === "optional";
  for (const S in a) {
    if (S === "__proto__" || h.has(S)) continue;
    if (m === "never") {
      c.push(S);
      continue;
    }
    const E = p.run({ value: a[S], issues: [] }, i);
    E instanceof Promise ? e.push(E.then((w) => Lu(w, r, S, a, y, v))) : Lu(E, r, S, a, y, v);
  }
  return (
    c.length && r.issues.push({ code: "unrecognized_keys", keys: c, input: a, inst: u }),
    e.length ? Promise.all(e).then(() => r) : r
  );
}
const QO = ne("$ZodObject", (e, a) => {
    if (($t.init(e, a), !Object.getOwnPropertyDescriptor(a, "shape")?.get)) {
      const h = a.shape;
      Object.defineProperty(a, "shape", {
        get: () => {
          const p = { ...h };
          return (Object.defineProperty(a, "shape", { value: p }), p);
        },
      });
    }
    const i = jh(() => Q_(a));
    _t(e._zod, "propValues", () => {
      const h = a.shape,
        p = {};
      for (const m in h) {
        const y = h[m]._zod;
        if (y.values) {
          p[m] ?? (p[m] = new Set());
          for (const v of y.values) p[m].add(v);
        }
      }
      return p;
    });
    const s = ku,
      u = a.catchall;
    let c;
    e._zod.parse = (h, p) => {
      c ?? (c = i.value);
      const m = h.value;
      if (!s(m))
        return (h.issues.push({ expected: "object", code: "invalid_type", input: m, inst: e }), h);
      h.value = {};
      const y = [],
        v = c.shape;
      for (const S of c.keys) {
        const E = v[S],
          w = E._zod.optin === "optional",
          z = E._zod.optout === "optional",
          R = E._zod.run({ value: m[S], issues: [] }, p);
        R instanceof Promise ? y.push(R.then((j) => Lu(j, h, S, m, w, z))) : Lu(R, h, S, m, w, z);
      }
      return u ? K_(y, m, h, p, i.value, e) : y.length ? Promise.all(y).then(() => h) : h;
    };
  }),
  KO = ne("$ZodObjectJIT", (e, a) => {
    QO.init(e, a);
    const r = e._zod.parse,
      i = jh(() => Q_(a)),
      s = (S) => {
        const E = new yO(["shape", "payload", "ctx"]),
          w = i.value,
          z = (F) => {
            const $ = Qy(F);
            return `shape[${$}]._zod.run({ value: input[${$}], issues: [] }, ctx)`;
          };
        E.write("const input = payload.value;");
        const R = Object.create(null);
        let j = 0;
        for (const F of w.keys) R[F] = `key_${j++}`;
        E.write("const newResult = {};");
        for (const F of w.keys) {
          const $ = R[F],
            G = Qy(F),
            he = S[F],
            ce = he?._zod?.optin === "optional",
            T = he?._zod?.optout === "optional";
          (E.write(`const ${$} = ${z(F)};`),
            ce && T
              ? E.write(`
        if (${$}.issues.length) {
          if (${G} in input) {
            payload.issues = payload.issues.concat(${$}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${G}, ...iss.path] : [${G}]
            })));
          }
        }
        
        if (${$}.value === undefined) {
          if (${G} in input) {
            newResult[${G}] = undefined;
          }
        } else {
          newResult[${G}] = ${$}.value;
        }
        
      `)
              : ce
                ? E.write(`
        if (${$}.issues.length) {
          payload.issues = payload.issues.concat(${$}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${G}, ...iss.path] : [${G}]
          })));
        }
        
        if (${$}.value === undefined) {
          if (${G} in input) {
            newResult[${G}] = undefined;
          }
        } else {
          newResult[${G}] = ${$}.value;
        }
        
      `)
                : E.write(`
        const ${$}_present = ${G} in input;
        if (${$}.issues.length) {
          payload.issues = payload.issues.concat(${$}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${G}, ...iss.path] : [${G}]
          })));
        }
        if (!${$}_present && !${$}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${G}]
          });
        }

        if (${$}_present) {
          if (${$}.value === undefined) {
            newResult[${G}] = undefined;
          } else {
            newResult[${G}] = ${$}.value;
          }
        }

      `));
        }
        (E.write("payload.value = newResult;"), E.write("return payload;"));
        const k = E.compile();
        return (F, $) => k(S, F, $);
      };
    let u;
    const c = ku,
      h = !Uh.jitless,
      m = h && oA.value,
      y = a.catchall;
    let v;
    e._zod.parse = (S, E) => {
      v ?? (v = i.value);
      const w = S.value;
      return c(w)
        ? h && m && E?.async === !1 && E.jitless !== !0
          ? (u || (u = s(a.shape)), (S = u(S, E)), y ? K_([], w, S, E, v, e) : S)
          : r(S, E)
        : (S.issues.push({ expected: "object", code: "invalid_type", input: w, inst: e }), S);
    };
  });
function Wy(e, a, r, i) {
  for (const u of e) if (u.issues.length === 0) return ((a.value = u.value), a);
  const s = e.filter((u) => !yi(u));
  return s.length === 1
    ? ((a.value = s[0].value), s[0])
    : (a.issues.push({
        code: "invalid_union",
        input: a.value,
        inst: r,
        errors: e.map((u) => u.issues.map((c) => Sl(c, i, _l()))),
      }),
      a);
}
const JO = ne("$ZodUnion", (e, a) => {
    ($t.init(e, a),
      _t(e._zod, "optin", () =>
        a.options.some((i) => i._zod.optin === "optional") ? "optional" : void 0,
      ),
      _t(e._zod, "optout", () =>
        a.options.some((i) => i._zod.optout === "optional") ? "optional" : void 0,
      ),
      _t(e._zod, "values", () => {
        if (a.options.every((i) => i._zod.values))
          return new Set(a.options.flatMap((i) => Array.from(i._zod.values)));
      }),
      _t(e._zod, "pattern", () => {
        if (a.options.every((i) => i._zod.pattern)) {
          const i = a.options.map((s) => s._zod.pattern);
          return new RegExp(`^(${i.map((s) => Bh(s.source)).join("|")})$`);
        }
      }));
    const r = a.options.length === 1 ? a.options[0]._zod.run : null;
    e._zod.parse = (i, s) => {
      if (r) return r(i, s);
      let u = !1;
      const c = [];
      for (const h of a.options) {
        const p = h._zod.run({ value: i.value, issues: [] }, s);
        if (p instanceof Promise) (c.push(p), (u = !0));
        else {
          if (p.issues.length === 0) return p;
          c.push(p);
        }
      }
      return u ? Promise.all(c).then((h) => Wy(h, i, e, s)) : Wy(c, i, e, s);
    };
  }),
  WO = ne("$ZodIntersection", (e, a) => {
    ($t.init(e, a),
      (e._zod.parse = (r, i) => {
        const s = r.value,
          u = a.left._zod.run({ value: s, issues: [] }, i),
          c = a.right._zod.run({ value: s, issues: [] }, i);
        return u instanceof Promise || c instanceof Promise
          ? Promise.all([u, c]).then(([p, m]) => eb(r, p, m))
          : eb(r, u, c);
      }));
  });
function eh(e, a) {
  if (e === a) return { valid: !0, data: e };
  if (e instanceof Date && a instanceof Date && +e == +a) return { valid: !0, data: e };
  if (ko(e) && ko(a)) {
    const r = Object.keys(a),
      i = Object.keys(e).filter((u) => r.indexOf(u) !== -1),
      s = { ...e, ...a };
    for (const u of i) {
      const c = eh(e[u], a[u]);
      if (!c.valid) return { valid: !1, mergeErrorPath: [u, ...c.mergeErrorPath] };
      s[u] = c.data;
    }
    return { valid: !0, data: s };
  }
  if (Array.isArray(e) && Array.isArray(a)) {
    if (e.length !== a.length) return { valid: !1, mergeErrorPath: [] };
    const r = [];
    for (let i = 0; i < e.length; i++) {
      const s = e[i],
        u = a[i],
        c = eh(s, u);
      if (!c.valid) return { valid: !1, mergeErrorPath: [i, ...c.mergeErrorPath] };
      r.push(c.data);
    }
    return { valid: !0, data: r };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function eb(e, a, r) {
  const i = new Map();
  let s;
  for (const h of a.issues)
    if (h.code === "unrecognized_keys") {
      s ?? (s = h);
      for (const p of h.keys) (i.has(p) || i.set(p, {}), (i.get(p).l = !0));
    } else e.issues.push(h);
  for (const h of r.issues)
    if (h.code === "unrecognized_keys")
      for (const p of h.keys) (i.has(p) || i.set(p, {}), (i.get(p).r = !0));
    else e.issues.push(h);
  const u = [...i].filter(([, h]) => h.l && h.r).map(([h]) => h);
  if ((u.length && s && e.issues.push({ ...s, keys: u }), yi(e))) return e;
  const c = eh(a.value, r.value);
  if (!c.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
  return ((e.value = c.data), e);
}
const eC = ne("$ZodEnum", (e, a) => {
    $t.init(e, a);
    const r = j_(a.entries),
      i = new Set(r);
    ((e._zod.values = i),
      (e._zod.pattern = new RegExp(
        `^(${r
          .filter((s) => sA.has(typeof s))
          .map((s) => (typeof s == "string" ? Ri(s) : s.toString()))
          .join("|")})$`,
      )),
      (e._zod.parse = (s, u) => {
        const c = s.value;
        return (
          i.has(c) || s.issues.push({ code: "invalid_value", values: r, input: c, inst: e }), s
        );
      }));
  }),
  tC = ne("$ZodLiteral", (e, a) => {
    if (($t.init(e, a), a.values.length === 0))
      throw new Error("Cannot create literal schema with no valid values");
    const r = new Set(a.values);
    ((e._zod.values = r),
      (e._zod.pattern = new RegExp(
        `^(${a.values.map((i) => (typeof i == "string" ? Ri(i) : i ? Ri(i.toString()) : String(i))).join("|")})$`,
      )),
      (e._zod.parse = (i, s) => {
        const u = i.value;
        return (
          r.has(u) || i.issues.push({ code: "invalid_value", values: a.values, input: u, inst: e }),
          i
        );
      }));
  }),
  nC = ne("$ZodTransform", (e, a) => {
    ($t.init(e, a),
      (e._zod.optin = "optional"),
      (e._zod.parse = (r, i) => {
        if (i.direction === "backward") throw new U_(e.constructor.name);
        const s = a.transform(r.value, r);
        if (i.async)
          return (s instanceof Promise ? s : Promise.resolve(s)).then(
            (c) => ((r.value = c), (r.fallback = !0), r),
          );
        if (s instanceof Promise) throw new Si();
        return ((r.value = s), (r.fallback = !0), r);
      }));
  });
function tb(e, a) {
  return a === void 0 && (e.issues.length || e.fallback) ? { issues: [], value: void 0 } : e;
}
const J_ = ne("$ZodOptional", (e, a) => {
    ($t.init(e, a),
      (e._zod.optin = "optional"),
      (e._zod.optout = "optional"),
      _t(e._zod, "values", () =>
        a.innerType._zod.values ? new Set([...a.innerType._zod.values, void 0]) : void 0,
      ),
      _t(e._zod, "pattern", () => {
        const r = a.innerType._zod.pattern;
        return r ? new RegExp(`^(${Bh(r.source)})?$`) : void 0;
      }),
      (e._zod.parse = (r, i) => {
        if (a.innerType._zod.optin === "optional") {
          const s = r.value,
            u = a.innerType._zod.run(r, i);
          return u instanceof Promise ? u.then((c) => tb(c, s)) : tb(u, s);
        }
        return r.value === void 0 ? r : a.innerType._zod.run(r, i);
      }));
  }),
  aC = ne("$ZodExactOptional", (e, a) => {
    (J_.init(e, a),
      _t(e._zod, "values", () => a.innerType._zod.values),
      _t(e._zod, "pattern", () => a.innerType._zod.pattern),
      (e._zod.parse = (r, i) => a.innerType._zod.run(r, i)));
  }),
  rC = ne("$ZodNullable", (e, a) => {
    ($t.init(e, a),
      _t(e._zod, "optin", () => a.innerType._zod.optin),
      _t(e._zod, "optout", () => a.innerType._zod.optout),
      _t(e._zod, "pattern", () => {
        const r = a.innerType._zod.pattern;
        return r ? new RegExp(`^(${Bh(r.source)}|null)$`) : void 0;
      }),
      _t(e._zod, "values", () =>
        a.innerType._zod.values ? new Set([...a.innerType._zod.values, null]) : void 0,
      ),
      (e._zod.parse = (r, i) => (r.value === null ? r : a.innerType._zod.run(r, i))));
  }),
  lC = ne("$ZodDefault", (e, a) => {
    ($t.init(e, a),
      (e._zod.optin = "optional"),
      _t(e._zod, "values", () => a.innerType._zod.values),
      (e._zod.parse = (r, i) => {
        if (i.direction === "backward") return a.innerType._zod.run(r, i);
        if (r.value === void 0) return ((r.value = a.defaultValue), r);
        const s = a.innerType._zod.run(r, i);
        return s instanceof Promise ? s.then((u) => nb(u, a)) : nb(s, a);
      }));
  });
function nb(e, a) {
  return (e.value === void 0 && (e.value = a.defaultValue), e);
}
const iC = ne("$ZodPrefault", (e, a) => {
    ($t.init(e, a),
      (e._zod.optin = "optional"),
      _t(e._zod, "values", () => a.innerType._zod.values),
      (e._zod.parse = (r, i) => (
        i.direction === "backward" || (r.value === void 0 && (r.value = a.defaultValue)),
        a.innerType._zod.run(r, i)
      )));
  }),
  oC = ne("$ZodNonOptional", (e, a) => {
    ($t.init(e, a),
      _t(e._zod, "values", () => {
        const r = a.innerType._zod.values;
        return r ? new Set([...r].filter((i) => i !== void 0)) : void 0;
      }),
      (e._zod.parse = (r, i) => {
        const s = a.innerType._zod.run(r, i);
        return s instanceof Promise ? s.then((u) => ab(u, e)) : ab(s, e);
      }));
  });
function ab(e, a) {
  return (
    !e.issues.length &&
      e.value === void 0 &&
      e.issues.push({ code: "invalid_type", expected: "nonoptional", input: e.value, inst: a }),
    e
  );
}
const sC = ne("$ZodCatch", (e, a) => {
    ($t.init(e, a),
      (e._zod.optin = "optional"),
      _t(e._zod, "optout", () => a.innerType._zod.optout),
      _t(e._zod, "values", () => a.innerType._zod.values),
      (e._zod.parse = (r, i) => {
        if (i.direction === "backward") return a.innerType._zod.run(r, i);
        const s = a.innerType._zod.run(r, i);
        return s instanceof Promise
          ? s.then(
              (u) => (
                (r.value = u.value),
                u.issues.length &&
                  ((r.value = a.catchValue({
                    ...r,
                    error: { issues: u.issues.map((c) => Sl(c, i, _l())) },
                    input: r.value,
                  })),
                  (r.issues = []),
                  (r.fallback = !0)),
                r
              ),
            )
          : ((r.value = s.value),
            s.issues.length &&
              ((r.value = a.catchValue({
                ...r,
                error: { issues: s.issues.map((u) => Sl(u, i, _l())) },
                input: r.value,
              })),
              (r.issues = []),
              (r.fallback = !0)),
            r);
      }));
  }),
  uC = ne("$ZodPipe", (e, a) => {
    ($t.init(e, a),
      _t(e._zod, "values", () => a.in._zod.values),
      _t(e._zod, "optin", () => a.in._zod.optin),
      _t(e._zod, "optout", () => a.out._zod.optout),
      _t(e._zod, "propValues", () => a.in._zod.propValues),
      (e._zod.parse = (r, i) => {
        if (i.direction === "backward") {
          const u = a.out._zod.run(r, i);
          return u instanceof Promise ? u.then((c) => vu(c, a.in, i)) : vu(u, a.in, i);
        }
        const s = a.in._zod.run(r, i);
        return s instanceof Promise ? s.then((u) => vu(u, a.out, i)) : vu(s, a.out, i);
      }));
  });
function vu(e, a, r) {
  return e.issues.length
    ? ((e.aborted = !0), e)
    : a._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, r);
}
const cC = ne("$ZodReadonly", (e, a) => {
  ($t.init(e, a),
    _t(e._zod, "propValues", () => a.innerType._zod.propValues),
    _t(e._zod, "values", () => a.innerType._zod.values),
    _t(e._zod, "optin", () => a.innerType?._zod?.optin),
    _t(e._zod, "optout", () => a.innerType?._zod?.optout),
    (e._zod.parse = (r, i) => {
      if (i.direction === "backward") return a.innerType._zod.run(r, i);
      const s = a.innerType._zod.run(r, i);
      return s instanceof Promise ? s.then(rb) : rb(s);
    }));
});
function rb(e) {
  return ((e.value = Object.freeze(e.value)), e);
}
const fC = ne("$ZodCustom", (e, a) => {
  ($n.init(e, a),
    $t.init(e, a),
    (e._zod.parse = (r, i) => r),
    (e._zod.check = (r) => {
      const i = r.value,
        s = a.fn(i);
      if (s instanceof Promise) return s.then((u) => lb(u, r, i, e));
      lb(s, r, i, e);
    }));
});
function lb(e, a, r, i) {
  if (!e) {
    const s = {
      code: "custom",
      input: r,
      inst: i,
      path: [...(i._zod.def.path ?? [])],
      continue: !i._zod.def.abort,
    };
    (i._zod.def.params && (s.params = i._zod.def.params), a.issues.push(Lo(s)));
  }
}
var ib;
class dC {
  constructor() {
    ((this._map = new WeakMap()), (this._idmap = new Map()));
  }
  add(a, ...r) {
    const i = r[0];
    return (
      this._map.set(a, i), i && typeof i == "object" && "id" in i && this._idmap.set(i.id, a), this
    );
  }
  clear() {
    return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
  }
  remove(a) {
    const r = this._map.get(a);
    return (
      r && typeof r == "object" && "id" in r && this._idmap.delete(r.id), this._map.delete(a), this
    );
  }
  get(a) {
    const r = a._zod.parent;
    if (r) {
      const i = { ...(this.get(r) ?? {}) };
      delete i.id;
      const s = { ...i, ...this._map.get(a) };
      return Object.keys(s).length ? s : void 0;
    }
    return this._map.get(a);
  }
  has(a) {
    return this._map.has(a);
  }
}
function hC() {
  return new dC();
}
(ib = globalThis).__zod_globalRegistry ?? (ib.__zod_globalRegistry = hC());
const To = globalThis.__zod_globalRegistry;
function mC(e, a) {
  return new e({ type: "string", ...Le(a) });
}
function pC(e, a) {
  return new e({ type: "string", format: "email", check: "string_format", abort: !1, ...Le(a) });
}
function ob(e, a) {
  return new e({ type: "string", format: "guid", check: "string_format", abort: !1, ...Le(a) });
}
function vC(e, a) {
  return new e({ type: "string", format: "uuid", check: "string_format", abort: !1, ...Le(a) });
}
function gC(e, a) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...Le(a),
  });
}
function yC(e, a) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...Le(a),
  });
}
function bC(e, a) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...Le(a),
  });
}
function _C(e, a) {
  return new e({ type: "string", format: "url", check: "string_format", abort: !1, ...Le(a) });
}
function SC(e, a) {
  return new e({ type: "string", format: "emoji", check: "string_format", abort: !1, ...Le(a) });
}
function EC(e, a) {
  return new e({ type: "string", format: "nanoid", check: "string_format", abort: !1, ...Le(a) });
}
function wC(e, a) {
  return new e({ type: "string", format: "cuid", check: "string_format", abort: !1, ...Le(a) });
}
function xC(e, a) {
  return new e({ type: "string", format: "cuid2", check: "string_format", abort: !1, ...Le(a) });
}
function RC(e, a) {
  return new e({ type: "string", format: "ulid", check: "string_format", abort: !1, ...Le(a) });
}
function zC(e, a) {
  return new e({ type: "string", format: "xid", check: "string_format", abort: !1, ...Le(a) });
}
function TC(e, a) {
  return new e({ type: "string", format: "ksuid", check: "string_format", abort: !1, ...Le(a) });
}
function AC(e, a) {
  return new e({ type: "string", format: "ipv4", check: "string_format", abort: !1, ...Le(a) });
}
function OC(e, a) {
  return new e({ type: "string", format: "ipv6", check: "string_format", abort: !1, ...Le(a) });
}
function CC(e, a) {
  return new e({ type: "string", format: "cidrv4", check: "string_format", abort: !1, ...Le(a) });
}
function DC(e, a) {
  return new e({ type: "string", format: "cidrv6", check: "string_format", abort: !1, ...Le(a) });
}
function MC(e, a) {
  return new e({ type: "string", format: "base64", check: "string_format", abort: !1, ...Le(a) });
}
function NC(e, a) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...Le(a),
  });
}
function kC(e, a) {
  return new e({ type: "string", format: "e164", check: "string_format", abort: !1, ...Le(a) });
}
function LC(e, a) {
  return new e({ type: "string", format: "jwt", check: "string_format", abort: !1, ...Le(a) });
}
function UC(e, a) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...Le(a),
  });
}
function jC(e, a) {
  return new e({ type: "string", format: "date", check: "string_format", ...Le(a) });
}
function VC(e, a) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...Le(a),
  });
}
function BC(e, a) {
  return new e({ type: "string", format: "duration", check: "string_format", ...Le(a) });
}
function HC(e, a) {
  return new e({ type: "number", checks: [], ...Le(a) });
}
function ZC(e, a) {
  return new e({ type: "number", check: "number_format", abort: !1, format: "safeint", ...Le(a) });
}
function $C(e, a) {
  return new e({ type: "boolean", ...Le(a) });
}
function YC(e) {
  return new e({ type: "unknown" });
}
function FC(e, a) {
  return new e({ type: "never", ...Le(a) });
}
function sb(e, a) {
  return new G_({ check: "less_than", ...Le(a), value: e, inclusive: !1 });
}
function kd(e, a) {
  return new G_({ check: "less_than", ...Le(a), value: e, inclusive: !0 });
}
function ub(e, a) {
  return new P_({ check: "greater_than", ...Le(a), value: e, inclusive: !1 });
}
function Ld(e, a) {
  return new P_({ check: "greater_than", ...Le(a), value: e, inclusive: !0 });
}
function cb(e, a) {
  return new iO({ check: "multiple_of", ...Le(a), value: e });
}
function W_(e, a) {
  return new sO({ check: "max_length", ...Le(a), maximum: e });
}
function Uu(e, a) {
  return new uO({ check: "min_length", ...Le(a), minimum: e });
}
function eS(e, a) {
  return new cO({ check: "length_equals", ...Le(a), length: e });
}
function qC(e, a) {
  return new fO({ check: "string_format", format: "regex", ...Le(a), pattern: e });
}
function GC(e) {
  return new dO({ check: "string_format", format: "lowercase", ...Le(e) });
}
function PC(e) {
  return new hO({ check: "string_format", format: "uppercase", ...Le(e) });
}
function XC(e, a) {
  return new mO({ check: "string_format", format: "includes", ...Le(a), includes: e });
}
function IC(e, a) {
  return new pO({ check: "string_format", format: "starts_with", ...Le(a), prefix: e });
}
function QC(e, a) {
  return new vO({ check: "string_format", format: "ends_with", ...Le(a), suffix: e });
}
function Ai(e) {
  return new gO({ check: "overwrite", tx: e });
}
function KC(e) {
  return Ai((a) => a.normalize(e));
}
function JC() {
  return Ai((e) => e.trim());
}
function WC() {
  return Ai((e) => e.toLowerCase());
}
function eD() {
  return Ai((e) => e.toUpperCase());
}
function tD() {
  return Ai((e) => iA(e));
}
function nD(e, a, r) {
  return new e({ type: "array", element: a, ...Le(r) });
}
function aD(e, a, r) {
  return new e({ type: "custom", check: "custom", fn: a, ...Le(r) });
}
function rD(e, a) {
  const r = lD(
    (i) => (
      (i.addIssue = (s) => {
        if (typeof s == "string") i.issues.push(Lo(s, i.value, r._zod.def));
        else {
          const u = s;
          (u.fatal && (u.continue = !1),
            u.code ?? (u.code = "custom"),
            u.input ?? (u.input = i.value),
            u.inst ?? (u.inst = r),
            u.continue ?? (u.continue = !r._zod.def.abort),
            i.issues.push(Lo(u)));
        }
      }),
      e(i.value, i)
    ),
    a,
  );
  return r;
}
function lD(e, a) {
  const r = new $n({ check: "custom", ...Le(a) });
  return ((r._zod.check = e), r);
}
function tS(e) {
  let a = e?.target ?? "draft-2020-12";
  return (
    a === "draft-4" && (a = "draft-04"),
    a === "draft-7" && (a = "draft-07"),
    {
      processors: e.processors ?? {},
      metadataRegistry: e?.metadata ?? To,
      target: a,
      unrepresentable: e?.unrepresentable ?? "throw",
      override: e?.override ?? (() => {}),
      io: e?.io ?? "output",
      counter: 0,
      seen: new Map(),
      cycles: e?.cycles ?? "ref",
      reused: e?.reused ?? "inline",
      external: e?.external ?? void 0,
    }
  );
}
function Sn(e, a, r = { path: [], schemaPath: [] }) {
  var i;
  const s = e._zod.def,
    u = a.seen.get(e);
  if (u) return (u.count++, r.schemaPath.includes(e) && (u.cycle = r.path), u.schema);
  const c = { schema: {}, count: 1, cycle: void 0, path: r.path };
  a.seen.set(e, c);
  const h = e._zod.toJSONSchema?.();
  if (h) c.schema = h;
  else {
    const y = { ...r, schemaPath: [...r.schemaPath, e], path: r.path };
    if (e._zod.processJSONSchema) e._zod.processJSONSchema(a, c.schema, y);
    else {
      const S = c.schema,
        E = a.processors[s.type];
      if (!E) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${s.type}`);
      E(e, a, S, y);
    }
    const v = e._zod.parent;
    v && (c.ref || (c.ref = v), Sn(v, a, y), (a.seen.get(v).isParent = !0));
  }
  const p = a.metadataRegistry.get(e);
  return (
    p && Object.assign(c.schema, p),
    a.io === "input" && Dn(e) && (delete c.schema.examples, delete c.schema.default),
    a.io === "input" &&
      "_prefault" in c.schema &&
      ((i = c.schema).default ?? (i.default = c.schema._prefault)),
    delete c.schema._prefault,
    a.seen.get(e).schema
  );
}
function nS(e, a) {
  const r = e.seen.get(a);
  if (!r) throw new Error("Unprocessed schema. This is a bug in Zod.");
  const i = new Map();
  for (const c of e.seen.entries()) {
    const h = e.metadataRegistry.get(c[0])?.id;
    if (h) {
      const p = i.get(h);
      if (p && p !== c[0])
        throw new Error(
          `Duplicate schema id "${h}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
        );
      i.set(h, c[0]);
    }
  }
  const s = (c) => {
      const h = e.target === "draft-2020-12" ? "$defs" : "definitions";
      if (e.external) {
        const v = e.external.registry.get(c[0])?.id,
          S = e.external.uri ?? ((w) => w);
        if (v) return { ref: S(v) };
        const E = c[1].defId ?? c[1].schema.id ?? `schema${e.counter++}`;
        return ((c[1].defId = E), { defId: E, ref: `${S("__shared")}#/${h}/${E}` });
      }
      if (c[1] === r) return { ref: "#" };
      const m = `#/${h}/`,
        y = c[1].schema.id ?? `__schema${e.counter++}`;
      return { defId: y, ref: m + y };
    },
    u = (c) => {
      if (c[1].schema.$ref) return;
      const h = c[1],
        { ref: p, defId: m } = s(c);
      ((h.def = { ...h.schema }), m && (h.defId = m));
      const y = h.schema;
      for (const v in y) delete y[v];
      y.$ref = p;
    };
  if (e.cycles === "throw")
    for (const c of e.seen.entries()) {
      const h = c[1];
      if (h.cycle)
        throw new Error(`Cycle detected: #/${h.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const c of e.seen.entries()) {
    const h = c[1];
    if (a === c[0]) {
      u(c);
      continue;
    }
    if (e.external) {
      const m = e.external.registry.get(c[0])?.id;
      if (a !== c[0] && m) {
        u(c);
        continue;
      }
    }
    if (e.metadataRegistry.get(c[0])?.id) {
      u(c);
      continue;
    }
    if (h.cycle) {
      u(c);
      continue;
    }
    if (h.count > 1 && e.reused === "ref") {
      u(c);
      continue;
    }
  }
}
function aS(e, a) {
  const r = e.seen.get(a);
  if (!r) throw new Error("Unprocessed schema. This is a bug in Zod.");
  const i = (h) => {
    const p = e.seen.get(h);
    if (p.ref === null) return;
    const m = p.def ?? p.schema,
      y = { ...m },
      v = p.ref;
    if (((p.ref = null), v)) {
      i(v);
      const E = e.seen.get(v),
        w = E.schema;
      if (
        (w.$ref &&
        (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0")
          ? ((m.allOf = m.allOf ?? []), m.allOf.push(w))
          : Object.assign(m, w),
        Object.assign(m, y),
        h._zod.parent === v)
      )
        for (const R in m) R === "$ref" || R === "allOf" || R in y || delete m[R];
      if (w.$ref && E.def)
        for (const R in m)
          R === "$ref" ||
            R === "allOf" ||
            (R in E.def && JSON.stringify(m[R]) === JSON.stringify(E.def[R]) && delete m[R]);
    }
    const S = h._zod.parent;
    if (S && S !== v) {
      i(S);
      const E = e.seen.get(S);
      if (E?.schema.$ref && ((m.$ref = E.schema.$ref), E.def))
        for (const w in m)
          w === "$ref" ||
            w === "allOf" ||
            (w in E.def && JSON.stringify(m[w]) === JSON.stringify(E.def[w]) && delete m[w]);
    }
    e.override({ zodSchema: h, jsonSchema: m, path: p.path ?? [] });
  };
  for (const h of [...e.seen.entries()].reverse()) i(h[0]);
  const s = {};
  if (
    (e.target === "draft-2020-12"
      ? (s.$schema = "https://json-schema.org/draft/2020-12/schema")
      : e.target === "draft-07"
        ? (s.$schema = "http://json-schema.org/draft-07/schema#")
        : e.target === "draft-04"
          ? (s.$schema = "http://json-schema.org/draft-04/schema#")
          : e.target,
    e.external?.uri)
  ) {
    const h = e.external.registry.get(a)?.id;
    if (!h) throw new Error("Schema is missing an `id` property");
    s.$id = e.external.uri(h);
  }
  Object.assign(s, r.def ?? r.schema);
  const u = e.metadataRegistry.get(a)?.id;
  u !== void 0 && s.id === u && delete s.id;
  const c = e.external?.defs ?? {};
  for (const h of e.seen.entries()) {
    const p = h[1];
    p.def && p.defId && (p.def.id === p.defId && delete p.def.id, (c[p.defId] = p.def));
  }
  e.external ||
    (Object.keys(c).length > 0 &&
      (e.target === "draft-2020-12" ? (s.$defs = c) : (s.definitions = c)));
  try {
    const h = JSON.parse(JSON.stringify(s));
    return (
      Object.defineProperty(h, "~standard", {
        value: {
          ...a["~standard"],
          jsonSchema: {
            input: ju(a, "input", e.processors),
            output: ju(a, "output", e.processors),
          },
        },
        enumerable: !1,
        writable: !1,
      }),
      h
    );
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function Dn(e, a) {
  const r = a ?? { seen: new Set() };
  if (r.seen.has(e)) return !1;
  r.seen.add(e);
  const i = e._zod.def;
  if (i.type === "transform") return !0;
  if (i.type === "array") return Dn(i.element, r);
  if (i.type === "set") return Dn(i.valueType, r);
  if (i.type === "lazy") return Dn(i.getter(), r);
  if (
    i.type === "promise" ||
    i.type === "optional" ||
    i.type === "nonoptional" ||
    i.type === "nullable" ||
    i.type === "readonly" ||
    i.type === "default" ||
    i.type === "prefault"
  )
    return Dn(i.innerType, r);
  if (i.type === "intersection") return Dn(i.left, r) || Dn(i.right, r);
  if (i.type === "record" || i.type === "map") return Dn(i.keyType, r) || Dn(i.valueType, r);
  if (i.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Dn(i.in, r) || Dn(i.out, r);
  if (i.type === "object") {
    for (const s in i.shape) if (Dn(i.shape[s], r)) return !0;
    return !1;
  }
  if (i.type === "union") {
    for (const s of i.options) if (Dn(s, r)) return !0;
    return !1;
  }
  if (i.type === "tuple") {
    for (const s of i.items) if (Dn(s, r)) return !0;
    return !!(i.rest && Dn(i.rest, r));
  }
  return !1;
}
const iD =
    (e, a = {}) =>
    (r) => {
      const i = tS({ ...r, processors: a });
      return (Sn(e, i), nS(i, e), aS(i, e));
    },
  ju =
    (e, a, r = {}) =>
    (i) => {
      const { libraryOptions: s, target: u } = i ?? {},
        c = tS({ ...(s ?? {}), target: u, io: a, processors: r });
      return (Sn(e, c), nS(c, e), aS(c, e));
    },
  oD = { guid: "uuid", url: "uri", datetime: "date-time", json_string: "json-string", regex: "" },
  sD = (e, a, r, i) => {
    const s = r;
    s.type = "string";
    const { minimum: u, maximum: c, format: h, patterns: p, contentEncoding: m } = e._zod.bag;
    if (
      (typeof u == "number" && (s.minLength = u),
      typeof c == "number" && (s.maxLength = c),
      h &&
        ((s.format = oD[h] ?? h),
        s.format === "" && delete s.format,
        h === "time" && delete s.format),
      m && (s.contentEncoding = m),
      p && p.size > 0)
    ) {
      const y = [...p];
      y.length === 1
        ? (s.pattern = y[0].source)
        : y.length > 1 &&
          (s.allOf = [
            ...y.map((v) => ({
              ...(a.target === "draft-07" || a.target === "draft-04" || a.target === "openapi-3.0"
                ? { type: "string" }
                : {}),
              pattern: v.source,
            })),
          ]);
    }
  },
  uD = (e, a, r, i) => {
    const s = r,
      {
        minimum: u,
        maximum: c,
        format: h,
        multipleOf: p,
        exclusiveMaximum: m,
        exclusiveMinimum: y,
      } = e._zod.bag;
    typeof h == "string" && h.includes("int") ? (s.type = "integer") : (s.type = "number");
    const v = typeof y == "number" && y >= (u ?? Number.NEGATIVE_INFINITY),
      S = typeof m == "number" && m <= (c ?? Number.POSITIVE_INFINITY),
      E = a.target === "draft-04" || a.target === "openapi-3.0";
    (v
      ? E
        ? ((s.minimum = y), (s.exclusiveMinimum = !0))
        : (s.exclusiveMinimum = y)
      : typeof u == "number" && (s.minimum = u),
      S
        ? E
          ? ((s.maximum = m), (s.exclusiveMaximum = !0))
          : (s.exclusiveMaximum = m)
        : typeof c == "number" && (s.maximum = c),
      typeof p == "number" && (s.multipleOf = p));
  },
  cD = (e, a, r, i) => {
    r.type = "boolean";
  },
  fD = (e, a, r, i) => {
    r.not = {};
  },
  dD = (e, a, r, i) => {},
  hD = (e, a, r, i) => {
    const s = e._zod.def,
      u = j_(s.entries);
    (u.every((c) => typeof c == "number") && (r.type = "number"),
      u.every((c) => typeof c == "string") && (r.type = "string"),
      (r.enum = u));
  },
  mD = (e, a, r, i) => {
    const s = e._zod.def,
      u = [];
    for (const c of s.values)
      if (c === void 0) {
        if (a.unrepresentable === "throw")
          throw new Error("Literal `undefined` cannot be represented in JSON Schema");
      } else if (typeof c == "bigint") {
        if (a.unrepresentable === "throw")
          throw new Error("BigInt literals cannot be represented in JSON Schema");
        u.push(Number(c));
      } else u.push(c);
    if (u.length !== 0)
      if (u.length === 1) {
        const c = u[0];
        ((r.type = c === null ? "null" : typeof c),
          a.target === "draft-04" || a.target === "openapi-3.0" ? (r.enum = [c]) : (r.const = c));
      } else
        (u.every((c) => typeof c == "number") && (r.type = "number"),
          u.every((c) => typeof c == "string") && (r.type = "string"),
          u.every((c) => typeof c == "boolean") && (r.type = "boolean"),
          u.every((c) => c === null) && (r.type = "null"),
          (r.enum = u));
  },
  pD = (e, a, r, i) => {
    if (a.unrepresentable === "throw")
      throw new Error("Custom types cannot be represented in JSON Schema");
  },
  vD = (e, a, r, i) => {
    if (a.unrepresentable === "throw")
      throw new Error("Transforms cannot be represented in JSON Schema");
  },
  gD = (e, a, r, i) => {
    const s = r,
      u = e._zod.def,
      { minimum: c, maximum: h } = e._zod.bag;
    (typeof c == "number" && (s.minItems = c),
      typeof h == "number" && (s.maxItems = h),
      (s.type = "array"),
      (s.items = Sn(u.element, a, { ...i, path: [...i.path, "items"] })));
  },
  yD = (e, a, r, i) => {
    const s = r,
      u = e._zod.def;
    ((s.type = "object"), (s.properties = {}));
    const c = u.shape;
    for (const m in c) s.properties[m] = Sn(c[m], a, { ...i, path: [...i.path, "properties", m] });
    const h = new Set(Object.keys(c)),
      p = new Set(
        [...h].filter((m) => {
          const y = u.shape[m]._zod;
          return a.io === "input" ? y.optin === void 0 : y.optout === void 0;
        }),
      );
    (p.size > 0 && (s.required = Array.from(p)),
      u.catchall?._zod.def.type === "never"
        ? (s.additionalProperties = !1)
        : u.catchall
          ? u.catchall &&
            (s.additionalProperties = Sn(u.catchall, a, {
              ...i,
              path: [...i.path, "additionalProperties"],
            }))
          : a.io === "output" && (s.additionalProperties = !1));
  },
  bD = (e, a, r, i) => {
    const s = e._zod.def,
      u = s.inclusive === !1,
      c = s.options.map((h, p) => Sn(h, a, { ...i, path: [...i.path, u ? "oneOf" : "anyOf", p] }));
    u ? (r.oneOf = c) : (r.anyOf = c);
  },
  _D = (e, a, r, i) => {
    const s = e._zod.def,
      u = Sn(s.left, a, { ...i, path: [...i.path, "allOf", 0] }),
      c = Sn(s.right, a, { ...i, path: [...i.path, "allOf", 1] }),
      h = (m) => "allOf" in m && Object.keys(m).length === 1,
      p = [...(h(u) ? u.allOf : [u]), ...(h(c) ? c.allOf : [c])];
    r.allOf = p;
  },
  SD = (e, a, r, i) => {
    const s = e._zod.def,
      u = Sn(s.innerType, a, i),
      c = a.seen.get(e);
    a.target === "openapi-3.0"
      ? ((c.ref = s.innerType), (r.nullable = !0))
      : (r.anyOf = [u, { type: "null" }]);
  },
  ED = (e, a, r, i) => {
    const s = e._zod.def;
    Sn(s.innerType, a, i);
    const u = a.seen.get(e);
    u.ref = s.innerType;
  },
  wD = (e, a, r, i) => {
    const s = e._zod.def;
    Sn(s.innerType, a, i);
    const u = a.seen.get(e);
    ((u.ref = s.innerType), (r.default = JSON.parse(JSON.stringify(s.defaultValue))));
  },
  xD = (e, a, r, i) => {
    const s = e._zod.def;
    Sn(s.innerType, a, i);
    const u = a.seen.get(e);
    ((u.ref = s.innerType),
      a.io === "input" && (r._prefault = JSON.parse(JSON.stringify(s.defaultValue))));
  },
  RD = (e, a, r, i) => {
    const s = e._zod.def;
    Sn(s.innerType, a, i);
    const u = a.seen.get(e);
    u.ref = s.innerType;
    let c;
    try {
      c = s.catchValue(void 0);
    } catch {
      throw new Error("Dynamic catch values are not supported in JSON Schema");
    }
    r.default = c;
  },
  zD = (e, a, r, i) => {
    const s = e._zod.def,
      u = s.in._zod.traits.has("$ZodTransform"),
      c = a.io === "input" ? (u ? s.out : s.in) : s.out;
    Sn(c, a, i);
    const h = a.seen.get(e);
    h.ref = c;
  },
  TD = (e, a, r, i) => {
    const s = e._zod.def;
    Sn(s.innerType, a, i);
    const u = a.seen.get(e);
    ((u.ref = s.innerType), (r.readOnly = !0));
  },
  rS = (e, a, r, i) => {
    const s = e._zod.def;
    Sn(s.innerType, a, i);
    const u = a.seen.get(e);
    u.ref = s.innerType;
  },
  AD = ne("ZodISODateTime", (e, a) => {
    (DO.init(e, a), Lt.init(e, a));
  });
function OD(e) {
  return UC(AD, e);
}
const CD = ne("ZodISODate", (e, a) => {
  (MO.init(e, a), Lt.init(e, a));
});
function DD(e) {
  return jC(CD, e);
}
const MD = ne("ZodISOTime", (e, a) => {
  (NO.init(e, a), Lt.init(e, a));
});
function ND(e) {
  return VC(MD, e);
}
const kD = ne("ZodISODuration", (e, a) => {
  (kO.init(e, a), Lt.init(e, a));
});
function LD(e) {
  return BC(kD, e);
}
const UD = (e, a) => {
    (Zh.init(e, a),
      (e.name = "ZodError"),
      Object.defineProperties(e, {
        format: { value: (r) => _A(e, r) },
        flatten: { value: (r) => bA(e, r) },
        addIssue: {
          value: (r) => {
            (e.issues.push(r), (e.message = JSON.stringify(e.issues, Wd, 2)));
          },
        },
        addIssues: {
          value: (r) => {
            (e.issues.push(...r), (e.message = JSON.stringify(e.issues, Wd, 2)));
          },
        },
        isEmpty: {
          get() {
            return e.issues.length === 0;
          },
        },
      }));
  },
  _a = ne("ZodError", UD, { Parent: Error }),
  jD = Wu(_a),
  VD = ec(_a),
  BD = tc(_a),
  HD = nc(_a),
  ZD = RA(_a),
  $D = zA(_a),
  YD = TA(_a),
  FD = AA(_a),
  qD = OA(_a),
  GD = CA(_a),
  PD = DA(_a),
  XD = MA(_a),
  fb = new WeakMap();
function Yo(e, a, r) {
  const i = Object.getPrototypeOf(e);
  let s = fb.get(i);
  if ((s || ((s = new Set()), fb.set(i, s)), !s.has(a))) {
    s.add(a);
    for (const u in r) {
      const c = r[u];
      Object.defineProperty(i, u, {
        configurable: !0,
        enumerable: !1,
        get() {
          const h = c.bind(this);
          return (
            Object.defineProperty(this, u, {
              configurable: !0,
              writable: !0,
              enumerable: !0,
              value: h,
            }),
            h
          );
        },
        set(h) {
          Object.defineProperty(this, u, {
            configurable: !0,
            writable: !0,
            enumerable: !0,
            value: h,
          });
        },
      });
    }
  }
}
const Yt = ne(
    "ZodType",
    (e, a) => (
      $t.init(e, a),
      Object.assign(e["~standard"], {
        jsonSchema: { input: ju(e, "input"), output: ju(e, "output") },
      }),
      (e.toJSONSchema = iD(e, {})),
      (e.def = a),
      (e.type = a.type),
      Object.defineProperty(e, "_def", { value: a }),
      (e.parse = (r, i) => jD(e, r, i, { callee: e.parse })),
      (e.safeParse = (r, i) => BD(e, r, i)),
      (e.parseAsync = async (r, i) => VD(e, r, i, { callee: e.parseAsync })),
      (e.safeParseAsync = async (r, i) => HD(e, r, i)),
      (e.spa = e.safeParseAsync),
      (e.encode = (r, i) => ZD(e, r, i)),
      (e.decode = (r, i) => $D(e, r, i)),
      (e.encodeAsync = async (r, i) => YD(e, r, i)),
      (e.decodeAsync = async (r, i) => FD(e, r, i)),
      (e.safeEncode = (r, i) => qD(e, r, i)),
      (e.safeDecode = (r, i) => GD(e, r, i)),
      (e.safeEncodeAsync = async (r, i) => PD(e, r, i)),
      (e.safeDecodeAsync = async (r, i) => XD(e, r, i)),
      Yo(e, "ZodType", {
        check(...r) {
          const i = this.def;
          return this.clone(
            Kr(i, {
              checks: [
                ...(i.checks ?? []),
                ...r.map((s) =>
                  typeof s == "function"
                    ? { _zod: { check: s, def: { check: "custom" }, onattach: [] } }
                    : s,
                ),
              ],
            }),
            { parent: !0 },
          );
        },
        with(...r) {
          return this.check(...r);
        },
        clone(r, i) {
          return Jr(this, r, i);
        },
        brand() {
          return this;
        },
        register(r, i) {
          return (r.add(this, i), this);
        },
        refine(r, i) {
          return this.check(FM(r, i));
        },
        superRefine(r, i) {
          return this.check(qM(r, i));
        },
        overwrite(r) {
          return this.check(Ai(r));
        },
        optional() {
          return vb(this);
        },
        exactOptional() {
          return DM(this);
        },
        nullable() {
          return gb(this);
        },
        nullish() {
          return vb(gb(this));
        },
        nonoptional(r) {
          return jM(this, r);
        },
        array() {
          return bM(this);
        },
        or(r) {
          return wM([this, r]);
        },
        and(r) {
          return RM(this, r);
        },
        transform(r) {
          return yb(this, OM(r));
        },
        default(r) {
          return kM(this, r);
        },
        prefault(r) {
          return UM(this, r);
        },
        catch(r) {
          return BM(this, r);
        },
        pipe(r) {
          return yb(this, r);
        },
        readonly() {
          return $M(this);
        },
        describe(r) {
          const i = this.clone();
          return (To.add(i, { description: r }), i);
        },
        meta(...r) {
          if (r.length === 0) return To.get(this);
          const i = this.clone();
          return (To.add(i, r[0]), i);
        },
        isOptional() {
          return this.safeParse(void 0).success;
        },
        isNullable() {
          return this.safeParse(null).success;
        },
        apply(r) {
          return r(this);
        },
      }),
      Object.defineProperty(e, "description", {
        get() {
          return To.get(e)?.description;
        },
        configurable: !0,
      }),
      e
    ),
  ),
  lS = ne("_ZodString", (e, a) => {
    ($h.init(e, a), Yt.init(e, a), (e._zod.processJSONSchema = (i, s, u) => sD(e, i, s)));
    const r = e._zod.bag;
    ((e.format = r.format ?? null),
      (e.minLength = r.minimum ?? null),
      (e.maxLength = r.maximum ?? null),
      Yo(e, "_ZodString", {
        regex(...i) {
          return this.check(qC(...i));
        },
        includes(...i) {
          return this.check(XC(...i));
        },
        startsWith(...i) {
          return this.check(IC(...i));
        },
        endsWith(...i) {
          return this.check(QC(...i));
        },
        min(...i) {
          return this.check(Uu(...i));
        },
        max(...i) {
          return this.check(W_(...i));
        },
        length(...i) {
          return this.check(eS(...i));
        },
        nonempty(...i) {
          return this.check(Uu(1, ...i));
        },
        lowercase(i) {
          return this.check(GC(i));
        },
        uppercase(i) {
          return this.check(PC(i));
        },
        trim() {
          return this.check(JC());
        },
        normalize(...i) {
          return this.check(KC(...i));
        },
        toLowerCase() {
          return this.check(WC());
        },
        toUpperCase() {
          return this.check(eD());
        },
        slugify() {
          return this.check(tD());
        },
      }));
  }),
  ID = ne("ZodString", (e, a) => {
    ($h.init(e, a),
      lS.init(e, a),
      (e.email = (r) => e.check(pC(QD, r))),
      (e.url = (r) => e.check(_C(KD, r))),
      (e.jwt = (r) => e.check(LC(dM, r))),
      (e.emoji = (r) => e.check(SC(JD, r))),
      (e.guid = (r) => e.check(ob(hb, r))),
      (e.uuid = (r) => e.check(vC(gu, r))),
      (e.uuidv4 = (r) => e.check(gC(gu, r))),
      (e.uuidv6 = (r) => e.check(yC(gu, r))),
      (e.uuidv7 = (r) => e.check(bC(gu, r))),
      (e.nanoid = (r) => e.check(EC(WD, r))),
      (e.guid = (r) => e.check(ob(hb, r))),
      (e.cuid = (r) => e.check(wC(eM, r))),
      (e.cuid2 = (r) => e.check(xC(tM, r))),
      (e.ulid = (r) => e.check(RC(nM, r))),
      (e.base64 = (r) => e.check(MC(uM, r))),
      (e.base64url = (r) => e.check(NC(cM, r))),
      (e.xid = (r) => e.check(zC(aM, r))),
      (e.ksuid = (r) => e.check(TC(rM, r))),
      (e.ipv4 = (r) => e.check(AC(lM, r))),
      (e.ipv6 = (r) => e.check(OC(iM, r))),
      (e.cidrv4 = (r) => e.check(CC(oM, r))),
      (e.cidrv6 = (r) => e.check(DC(sM, r))),
      (e.e164 = (r) => e.check(kC(fM, r))),
      (e.datetime = (r) => e.check(OD(r))),
      (e.date = (r) => e.check(DD(r))),
      (e.time = (r) => e.check(ND(r))),
      (e.duration = (r) => e.check(LD(r))));
  });
function db(e) {
  return mC(ID, e);
}
const Lt = ne("ZodStringFormat", (e, a) => {
    (Mt.init(e, a), lS.init(e, a));
  }),
  QD = ne("ZodEmail", (e, a) => {
    (EO.init(e, a), Lt.init(e, a));
  }),
  hb = ne("ZodGUID", (e, a) => {
    (_O.init(e, a), Lt.init(e, a));
  }),
  gu = ne("ZodUUID", (e, a) => {
    (SO.init(e, a), Lt.init(e, a));
  }),
  KD = ne("ZodURL", (e, a) => {
    (wO.init(e, a), Lt.init(e, a));
  }),
  JD = ne("ZodEmoji", (e, a) => {
    (xO.init(e, a), Lt.init(e, a));
  }),
  WD = ne("ZodNanoID", (e, a) => {
    (RO.init(e, a), Lt.init(e, a));
  }),
  eM = ne("ZodCUID", (e, a) => {
    (zO.init(e, a), Lt.init(e, a));
  }),
  tM = ne("ZodCUID2", (e, a) => {
    (TO.init(e, a), Lt.init(e, a));
  }),
  nM = ne("ZodULID", (e, a) => {
    (AO.init(e, a), Lt.init(e, a));
  }),
  aM = ne("ZodXID", (e, a) => {
    (OO.init(e, a), Lt.init(e, a));
  }),
  rM = ne("ZodKSUID", (e, a) => {
    (CO.init(e, a), Lt.init(e, a));
  }),
  lM = ne("ZodIPv4", (e, a) => {
    (LO.init(e, a), Lt.init(e, a));
  }),
  iM = ne("ZodIPv6", (e, a) => {
    (UO.init(e, a), Lt.init(e, a));
  }),
  oM = ne("ZodCIDRv4", (e, a) => {
    (jO.init(e, a), Lt.init(e, a));
  }),
  sM = ne("ZodCIDRv6", (e, a) => {
    (VO.init(e, a), Lt.init(e, a));
  }),
  uM = ne("ZodBase64", (e, a) => {
    (BO.init(e, a), Lt.init(e, a));
  }),
  cM = ne("ZodBase64URL", (e, a) => {
    (ZO.init(e, a), Lt.init(e, a));
  }),
  fM = ne("ZodE164", (e, a) => {
    ($O.init(e, a), Lt.init(e, a));
  }),
  dM = ne("ZodJWT", (e, a) => {
    (FO.init(e, a), Lt.init(e, a));
  }),
  iS = ne("ZodNumber", (e, a) => {
    (I_.init(e, a),
      Yt.init(e, a),
      (e._zod.processJSONSchema = (i, s, u) => uD(e, i, s)),
      Yo(e, "ZodNumber", {
        gt(i, s) {
          return this.check(ub(i, s));
        },
        gte(i, s) {
          return this.check(Ld(i, s));
        },
        min(i, s) {
          return this.check(Ld(i, s));
        },
        lt(i, s) {
          return this.check(sb(i, s));
        },
        lte(i, s) {
          return this.check(kd(i, s));
        },
        max(i, s) {
          return this.check(kd(i, s));
        },
        int(i) {
          return this.check(mb(i));
        },
        safe(i) {
          return this.check(mb(i));
        },
        positive(i) {
          return this.check(ub(0, i));
        },
        nonnegative(i) {
          return this.check(Ld(0, i));
        },
        negative(i) {
          return this.check(sb(0, i));
        },
        nonpositive(i) {
          return this.check(kd(0, i));
        },
        multipleOf(i, s) {
          return this.check(cb(i, s));
        },
        step(i, s) {
          return this.check(cb(i, s));
        },
        finite() {
          return this;
        },
      }));
    const r = e._zod.bag;
    ((e.minValue =
      Math.max(
        r.minimum ?? Number.NEGATIVE_INFINITY,
        r.exclusiveMinimum ?? Number.NEGATIVE_INFINITY,
      ) ?? null),
      (e.maxValue =
        Math.min(
          r.maximum ?? Number.POSITIVE_INFINITY,
          r.exclusiveMaximum ?? Number.POSITIVE_INFINITY,
        ) ?? null),
      (e.isInt = (r.format ?? "").includes("int") || Number.isSafeInteger(r.multipleOf ?? 0.5)),
      (e.isFinite = !0),
      (e.format = r.format ?? null));
  });
function l3(e) {
  return HC(iS, e);
}
const hM = ne("ZodNumberFormat", (e, a) => {
  (qO.init(e, a), iS.init(e, a));
});
function mb(e) {
  return ZC(hM, e);
}
const mM = ne("ZodBoolean", (e, a) => {
  (GO.init(e, a), Yt.init(e, a), (e._zod.processJSONSchema = (r, i, s) => cD(e, r, i)));
});
function i3(e) {
  return $C(mM, e);
}
const pM = ne("ZodUnknown", (e, a) => {
  (PO.init(e, a), Yt.init(e, a), (e._zod.processJSONSchema = (r, i, s) => dD()));
});
function pb() {
  return YC(pM);
}
const vM = ne("ZodNever", (e, a) => {
  (XO.init(e, a), Yt.init(e, a), (e._zod.processJSONSchema = (r, i, s) => fD(e, r, i)));
});
function gM(e) {
  return FC(vM, e);
}
const yM = ne("ZodArray", (e, a) => {
  (IO.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => gD(e, r, i, s)),
    (e.element = a.element),
    Yo(e, "ZodArray", {
      min(r, i) {
        return this.check(Uu(r, i));
      },
      nonempty(r) {
        return this.check(Uu(1, r));
      },
      max(r, i) {
        return this.check(W_(r, i));
      },
      length(r, i) {
        return this.check(eS(r, i));
      },
      unwrap() {
        return this.element;
      },
    }));
});
function bM(e, a) {
  return nD(yM, e, a);
}
const _M = ne("ZodObject", (e, a) => {
  (KO.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => yD(e, r, i, s)),
    _t(e, "shape", () => a.shape),
    Yo(e, "ZodObject", {
      keyof() {
        return zM(Object.keys(this._zod.def.shape));
      },
      catchall(r) {
        return this.clone({ ...this._zod.def, catchall: r });
      },
      passthrough() {
        return this.clone({ ...this._zod.def, catchall: pb() });
      },
      loose() {
        return this.clone({ ...this._zod.def, catchall: pb() });
      },
      strict() {
        return this.clone({ ...this._zod.def, catchall: gM() });
      },
      strip() {
        return this.clone({ ...this._zod.def, catchall: void 0 });
      },
      extend(r) {
        return hA(this, r);
      },
      safeExtend(r) {
        return mA(this, r);
      },
      merge(r) {
        return pA(this, r);
      },
      pick(r) {
        return fA(this, r);
      },
      omit(r) {
        return dA(this, r);
      },
      partial(...r) {
        return vA(oS, this, r[0]);
      },
      required(...r) {
        return gA(sS, this, r[0]);
      },
    }));
});
function SM(e, a) {
  const r = { type: "object", shape: e ?? {}, ...Le(a) };
  return new _M(r);
}
const EM = ne("ZodUnion", (e, a) => {
  (JO.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => bD(e, r, i, s)),
    (e.options = a.options));
});
function wM(e, a) {
  return new EM({ type: "union", options: e, ...Le(a) });
}
const xM = ne("ZodIntersection", (e, a) => {
  (WO.init(e, a), Yt.init(e, a), (e._zod.processJSONSchema = (r, i, s) => _D(e, r, i, s)));
});
function RM(e, a) {
  return new xM({ type: "intersection", left: e, right: a });
}
const th = ne("ZodEnum", (e, a) => {
  (eC.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (i, s, u) => hD(e, i, s)),
    (e.enum = a.entries),
    (e.options = Object.values(a.entries)));
  const r = new Set(Object.keys(a.entries));
  ((e.extract = (i, s) => {
    const u = {};
    for (const c of i)
      if (r.has(c)) u[c] = a.entries[c];
      else throw new Error(`Key ${c} not found in enum`);
    return new th({ ...a, checks: [], ...Le(s), entries: u });
  }),
    (e.exclude = (i, s) => {
      const u = { ...a.entries };
      for (const c of i)
        if (r.has(c)) delete u[c];
        else throw new Error(`Key ${c} not found in enum`);
      return new th({ ...a, checks: [], ...Le(s), entries: u });
    }));
});
function zM(e, a) {
  const r = Array.isArray(e) ? Object.fromEntries(e.map((i) => [i, i])) : e;
  return new th({ type: "enum", entries: r, ...Le(a) });
}
const TM = ne("ZodLiteral", (e, a) => {
  (tC.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => mD(e, r, i)),
    (e.values = new Set(a.values)),
    Object.defineProperty(e, "value", {
      get() {
        if (a.values.length > 1)
          throw new Error(
            "This schema contains multiple valid literal values. Use `.values` instead.",
          );
        return a.values[0];
      },
    }));
});
function o3(e, a) {
  return new TM({ type: "literal", values: Array.isArray(e) ? e : [e], ...Le(a) });
}
const AM = ne("ZodTransform", (e, a) => {
  (nC.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => vD(e, r)),
    (e._zod.parse = (r, i) => {
      if (i.direction === "backward") throw new U_(e.constructor.name);
      r.addIssue = (u) => {
        if (typeof u == "string") r.issues.push(Lo(u, r.value, a));
        else {
          const c = u;
          (c.fatal && (c.continue = !1),
            c.code ?? (c.code = "custom"),
            c.input ?? (c.input = r.value),
            c.inst ?? (c.inst = e),
            r.issues.push(Lo(c)));
        }
      };
      const s = a.transform(r.value, r);
      return s instanceof Promise
        ? s.then((u) => ((r.value = u), (r.fallback = !0), r))
        : ((r.value = s), (r.fallback = !0), r);
    }));
});
function OM(e) {
  return new AM({ type: "transform", transform: e });
}
const oS = ne("ZodOptional", (e, a) => {
  (J_.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => rS(e, r, i, s)),
    (e.unwrap = () => e._zod.def.innerType));
});
function vb(e) {
  return new oS({ type: "optional", innerType: e });
}
const CM = ne("ZodExactOptional", (e, a) => {
  (aC.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => rS(e, r, i, s)),
    (e.unwrap = () => e._zod.def.innerType));
});
function DM(e) {
  return new CM({ type: "optional", innerType: e });
}
const MM = ne("ZodNullable", (e, a) => {
  (rC.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => SD(e, r, i, s)),
    (e.unwrap = () => e._zod.def.innerType));
});
function gb(e) {
  return new MM({ type: "nullable", innerType: e });
}
const NM = ne("ZodDefault", (e, a) => {
  (lC.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => wD(e, r, i, s)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeDefault = e.unwrap));
});
function kM(e, a) {
  return new NM({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof a == "function" ? a() : B_(a);
    },
  });
}
const LM = ne("ZodPrefault", (e, a) => {
  (iC.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => xD(e, r, i, s)),
    (e.unwrap = () => e._zod.def.innerType));
});
function UM(e, a) {
  return new LM({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof a == "function" ? a() : B_(a);
    },
  });
}
const sS = ne("ZodNonOptional", (e, a) => {
  (oC.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => ED(e, r, i, s)),
    (e.unwrap = () => e._zod.def.innerType));
});
function jM(e, a) {
  return new sS({ type: "nonoptional", innerType: e, ...Le(a) });
}
const VM = ne("ZodCatch", (e, a) => {
  (sC.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => RD(e, r, i, s)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeCatch = e.unwrap));
});
function BM(e, a) {
  return new VM({ type: "catch", innerType: e, catchValue: typeof a == "function" ? a : () => a });
}
const HM = ne("ZodPipe", (e, a) => {
  (uC.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => zD(e, r, i, s)),
    (e.in = a.in),
    (e.out = a.out));
});
function yb(e, a) {
  return new HM({ type: "pipe", in: e, out: a });
}
const ZM = ne("ZodReadonly", (e, a) => {
  (cC.init(e, a),
    Yt.init(e, a),
    (e._zod.processJSONSchema = (r, i, s) => TD(e, r, i, s)),
    (e.unwrap = () => e._zod.def.innerType));
});
function $M(e) {
  return new ZM({ type: "readonly", innerType: e });
}
const YM = ne("ZodCustom", (e, a) => {
  (fC.init(e, a), Yt.init(e, a), (e._zod.processJSONSchema = (r, i, s) => pD(e, r)));
});
function FM(e, a = {}) {
  return aD(YM, e, a);
}
function qM(e, a) {
  return rD(e, a);
}
var Fo = (e) => e.type === "checkbox",
  bl = (e) => e instanceof Date,
  _n = (e) => e == null;
const uS = (e) => typeof e == "object";
var kt = (e) => !_n(e) && !Array.isArray(e) && uS(e) && !bl(e),
  nh = (e) => (kt(e) && e.target ? (Fo(e.target) ? e.target.checked : e.target.value) : e),
  cS = (e, a) =>
    a.split(".").some((r, i, s) => !isNaN(Number(r)) && e.has(s.slice(0, i).join("."))),
  fS = (e) => {
    const a = e.constructor && e.constructor.prototype;
    return kt(a) && a.hasOwnProperty("isPrototypeOf");
  },
  rc = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function Zt(e) {
  if (e instanceof Date) return new Date(e);
  const a = typeof FileList < "u" && e instanceof FileList;
  if (rc && (e instanceof Blob || a)) return e;
  const r = Array.isArray(e);
  if (!r && !(kt(e) && fS(e))) return e;
  const i = r ? [] : Object.create(Object.getPrototypeOf(e));
  for (const s in e) Object.prototype.hasOwnProperty.call(e, s) && (i[s] = Zt(e[s]));
  return i;
}
const Gr = {
    BLUR: "blur",
    FOCUS_OUT: "focusout",
    CHANGE: "change",
    SUBMIT: "submit",
    TRIGGER: "trigger",
    VALID: "valid",
  },
  Ca = {
    onBlur: "onBlur",
    onChange: "onChange",
    onSubmit: "onSubmit",
    onTouched: "onTouched",
    all: "all",
  },
  Oa = {
    max: "max",
    min: "min",
    maxLength: "maxLength",
    minLength: "minLength",
    pattern: "pattern",
    required: "required",
    validate: "validate",
  },
  dS = "root",
  hS = ["__proto__", "constructor", "prototype"],
  GM = /^\w*$/;
var qo = (e) => GM.test(e),
  Rt = (e) => e === void 0;
const PM = /[.[\]'"]/;
var lc = (e) => e.split(PM).filter(Boolean),
  ye = (e, a, r) => {
    if (!a || !kt(e)) return r;
    const i = qo(a) ? [a] : lc(a);
    if (i.some((u) => hS.includes(u))) return r;
    const s = i.reduce((u, c) => (_n(u) ? void 0 : u[c]), e);
    return Rt(s) || s === e ? (Rt(e[a]) ? r : e[a]) : s;
  },
  ta = (e) => typeof e == "boolean",
  Rn = (e) => typeof e == "function",
  dt = (e, a, r) => {
    let i = -1;
    const s = qo(a) ? [a] : lc(a),
      u = s.length,
      c = u - 1;
    for (; ++i < u; ) {
      const h = s[i];
      let p = r;
      if (i !== c) {
        const m = e[h];
        p = kt(m) || Array.isArray(m) ? m : isNaN(+s[i + 1]) ? {} : [];
      }
      if (hS.includes(h)) return;
      ((e[h] = p), (e = e[h]));
    }
  };
const Yh = K.createContext(null);
Yh.displayName = "HookFormControlContext";
const Fh = () => K.useContext(Yh);
var mS = (e, a, r, i = !0) => {
  const s = {};
  for (const u in e)
    Object.defineProperty(s, u, {
      get: () => {
        const c = u;
        return (
          a._proxyFormState[c] !== Ca.all && (a._proxyFormState[c] = !i || Ca.all),
          r && (r[c] = !0),
          e[c]
        );
      },
    });
  return s;
};
const qh = rc ? K.useLayoutEffect : K.useEffect;
function pS(e) {
  const a = Fh(),
    { control: r = a, disabled: i, name: s, exact: u } = e || {},
    [c, h] = K.useState(() => ({ ...r._formState, defaultValues: r._defaultValues })),
    p = K.useRef({
      isDirty: !1,
      isLoading: !1,
      dirtyFields: !1,
      touchedFields: !1,
      validatingFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    });
  return (
    qh(
      () =>
        r._subscribe({
          name: s,
          formState: p.current,
          exact: u,
          callback: (m) => {
            !i && h({ ...r._formState, ...m, defaultValues: r._defaultValues });
          },
        }),
      [s, i, u],
    ),
    K.useEffect(() => {
      p.current.isValid && r._setValid(!0);
    }, [r]),
    K.useMemo(() => mS(c, r, p.current, !1), [c, r])
  );
}
var zn = (e) => typeof e == "string",
  ah = (e, a, r, i, s) =>
    zn(e)
      ? (i && a.watch.add(e), ye(r, e, s))
      : Array.isArray(e)
        ? e.map((u) => (i && a.watch.add(u), ye(r, u)))
        : (i && (a.watchAll = !0), r),
  rh = (e) => _n(e) || !uS(e);
const bb = (e, a) => a.length === 0 && !Array.isArray(e) && !fS(e);
function na(e, a, r = new WeakMap()) {
  if (e === a) return !0;
  if (rh(e) || rh(a)) return Object.is(e, a);
  if (bl(e) && bl(a)) return Object.is(e.getTime(), a.getTime());
  const i = Object.keys(e),
    s = Object.keys(a);
  if (i.length !== s.length) return !1;
  if (bb(e, i) || bb(a, s)) return Object.is(e, a);
  if (!i.length && Array.isArray(e) !== Array.isArray(a)) return !1;
  const u = r.get(e);
  if (u && u.has(a)) return !0;
  if (u) u.add(a);
  else {
    const c = new WeakSet();
    (c.add(a), r.set(e, c));
  }
  for (const c of i) {
    const h = e[c];
    if (!(c in a)) return !1;
    if (c !== "ref") {
      const p = a[c];
      if (
        (bl(h) && bl(p)) || ((kt(h) || Array.isArray(h)) && (kt(p) || Array.isArray(p)))
          ? !na(h, p, r)
          : !Object.is(h, p)
      )
        return !1;
    }
  }
  return !0;
}
function XM(e) {
  const a = Fh(),
    { control: r = a, name: i, defaultValue: s, disabled: u, exact: c, compute: h } = e || {},
    p = K.useRef(s),
    m = K.useRef(h),
    y = K.useRef(void 0),
    v = K.useRef(r),
    S = K.useRef(i);
  m.current = h;
  const [E, w] = K.useState(() => {
      const $ = r._getWatch(i, p.current);
      return m.current ? m.current($) : $;
    }),
    z = K.useCallback(
      ($) => {
        const G = ah(i, r._names, $ || r._formValues, !1, p.current);
        return m.current ? m.current(G) : G;
      },
      [r._formValues, r._names, i],
    ),
    R = K.useCallback(
      ($) => {
        if (!u) {
          const G = ah(i, r._names, $ || r._formValues, !1, p.current);
          if (m.current) {
            const he = m.current(G);
            na(he, y.current) || (w(he), (y.current = he));
          } else w(G);
        }
      },
      [r._formValues, r._names, u, i],
    );
  (qh(
    () => (
      (v.current !== r || !na(S.current, i)) && ((v.current = r), (S.current = i), R()),
      r._subscribe({
        name: i,
        formState: { values: !0 },
        exact: c,
        callback: ($) => {
          R($.values);
        },
      })
    ),
    [r, c, i, R],
  ),
    K.useEffect(() => r._removeUnmounted()));
  const j = v.current !== r,
    k = S.current,
    F = K.useMemo(() => {
      if (u) return null;
      const $ = !j && !na(k, i);
      return j || $ ? z() : null;
    }, [u, j, i, k, z]);
  return F !== null ? F : E;
}
function IM(e) {
  const a = Fh(),
    {
      name: r,
      disabled: i,
      control: s = a,
      shouldUnregister: u,
      defaultValue: c,
      exact: h = !0,
    } = e,
    p = cS(s._names.array, r),
    m = K.useMemo(() => ye(s._formValues, r, ye(s._defaultValues, r, c)), [s, r, c]),
    y = XM({ control: s, name: r, defaultValue: m, exact: h }),
    v = pS({ control: s, name: r, exact: h }),
    S = K.useRef(e),
    E = K.useRef(null),
    w = K.useRef(
      s.register(r, { ...e.rules, value: y, ...(ta(e.disabled) ? { disabled: e.disabled } : {}) }),
    );
  S.current = e;
  const z = K.useMemo(
      () =>
        Object.defineProperties(
          {},
          {
            invalid: { enumerable: !0, get: () => !!ye(v.errors, r) },
            isDirty: { enumerable: !0, get: () => !!ye(v.dirtyFields, r) },
            isTouched: { enumerable: !0, get: () => !!ye(v.touchedFields, r) },
            isValidating: { enumerable: !0, get: () => !!ye(v.validatingFields, r) },
            error: { enumerable: !0, get: () => ye(v.errors, r) },
          },
        ),
      [v, r],
    ),
    R = K.useCallback(
      ($) => {
        const G = nh($);
        return (
          ye(s._fields, r) || (w.current = s.register(r, { ...S.current.rules, value: G })),
          w.current.onChange({ target: { value: nh($), name: r }, type: Gr.CHANGE })
        );
      },
      [r, s],
    ),
    j = K.useCallback(
      () => w.current.onBlur({ target: { value: ye(s._formValues, r), name: r }, type: Gr.BLUR }),
      [r, s._formValues],
    ),
    k = K.useCallback(
      ($) => {
        $ &&
          (E.current = {
            focus: () => Rn($.focus) && $.focus(),
            select: () => Rn($.select) && $.select(),
            setCustomValidity: (he) => Rn($.setCustomValidity) && $.setCustomValidity(he),
            reportValidity: () => Rn($.reportValidity) && $.reportValidity(),
          });
        const G = ye(s._fields, r);
        G && G._f && $ && (G._f.ref = E.current);
      },
      [s._fields, r],
    ),
    F = K.useMemo(
      () => ({
        name: r,
        value: y,
        ...(ta(i) || v.disabled ? { disabled: v.disabled || i } : {}),
        onChange: R,
        onBlur: j,
        ref: k,
      }),
      [r, i, v.disabled, R, j, k, y],
    );
  return (
    K.useEffect(() => {
      const $ = s._options.shouldUnregister || u;
      s.register(r, {
        ...S.current.rules,
        ...(ta(S.current.disabled) ? { disabled: S.current.disabled } : {}),
      });
      const G = (he, ce) => {
        const T = ye(s._fields, he);
        T && T._f && (T._f.mount = ce);
      };
      if ((G(r, !0), $)) {
        const he = Zt(
          ye(
            u ? s._defaultValues : s._options.values || s._defaultValues,
            r,
            ye(s._options.defaultValues, r, S.current.defaultValue),
          ),
        );
        (dt(s._defaultValues, r, he), Rt(ye(s._formValues, r)) && dt(s._formValues, r, he));
      }
      if ((!p && s.register(r), E.current)) {
        const he = ye(s._fields, r);
        he && he._f && (he._f.ref = E.current);
      }
      return () => {
        (p ? $ && !s._state.action : $) ? s.unregister(r) : G(r, !1);
      };
    }, [r, s, p, u]),
    K.useEffect(() => {
      s._setDisabledField({ disabled: i, name: r });
    }, [i, r, s]),
    K.useMemo(() => ({ field: F, formState: v, fieldState: z }), [F, v, z])
  );
}
const QM = (e) => e.render(IM(e)),
  Gh = K.createContext(null);
Gh.displayName = "HookFormContext";
const KM = () => K.useContext(Gh),
  JM = ({
    children: e,
    watch: a,
    getValues: r,
    getFieldState: i,
    setError: s,
    clearErrors: u,
    setValue: c,
    setValues: h,
    trigger: p,
    formState: m,
    resetField: y,
    reset: v,
    handleSubmit: S,
    unregister: E,
    control: w,
    register: z,
    setFocus: R,
    subscribe: j,
  }) => {
    const k = K.useMemo(
      () => ({
        watch: a,
        getValues: r,
        getFieldState: i,
        setError: s,
        clearErrors: u,
        setValue: c,
        setValues: h,
        trigger: p,
        formState: m,
        resetField: y,
        reset: v,
        handleSubmit: S,
        unregister: E,
        control: w,
        register: z,
        setFocus: R,
        subscribe: j,
      }),
      [u, w, m, i, r, S, z, v, y, s, R, c, h, j, p, E, a],
    );
    return K.createElement(
      Gh.Provider,
      { value: k },
      K.createElement(Yh.Provider, { value: k.control }, e),
    );
  };
var Ph = (e, a, r, i, s) =>
    a ? { ...r[e], types: { ...(r[e] && r[e].types ? r[e].types : {}), [i]: s || !0 } } : {},
  vS = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
  Ou = (e) => (Array.isArray(e) ? e : [e]),
  _b = () => {
    let e = [];
    return {
      get observers() {
        return e;
      },
      next: (s) => {
        for (const u of e) u.next && u.next(s);
      },
      subscribe: (s) => (
        e.push(s),
        {
          unsubscribe: () => {
            e = e.filter((u) => u !== s);
          },
        }
      ),
      unsubscribe: () => {
        e = [];
      },
    };
  };
function gS(e, a) {
  const r = {};
  for (const i in e)
    if (e.hasOwnProperty(i)) {
      const s = e[i],
        u = a[i];
      if (s && kt(s) && u) {
        const c = gS(s, u);
        kt(c) && (r[i] = c);
      } else e[i] && (r[i] = u);
    }
  return r;
}
var bn = (e) => kt(e) && !Object.keys(e).length,
  Xh = (e) => e.type === "file",
  Vu = (e) => {
    if (!rc) return !1;
    const a = e ? e.ownerDocument : 0;
    return e instanceof (a && a.defaultView ? a.defaultView.HTMLElement : HTMLElement);
  },
  yS = (e) => e.type === "select-multiple",
  Ih = (e) => e.type === "radio",
  WM = (e) => Ih(e) || Fo(e),
  Ud = (e) => Vu(e) && e.isConnected;
function eN(e, a) {
  const r = a.slice(0, -1).length;
  let i = 0;
  for (; i < r; ) {
    if (_n(e)) {
      e = void 0;
      break;
    }
    ((e = e[a[i]]), i++);
  }
  return e;
}
function tN(e) {
  for (const a in e) if (e.hasOwnProperty(a) && !Rt(e[a])) return !1;
  return !0;
}
function tn(e, a) {
  if (zn(a) && Object.prototype.hasOwnProperty.call(e, a)) return (delete e[a], e);
  const r = Array.isArray(a) ? a : qo(a) ? [a] : lc(a),
    i = r.length === 1 ? e : eN(e, r),
    s = r.length - 1,
    u = r[s];
  return (
    i && delete i[u],
    s !== 0 && ((kt(i) && bn(i)) || (Array.isArray(i) && tN(i))) && tn(e, r.slice(0, -1)),
    e
  );
}
var nN = (e) => {
  for (const a in e) if (Rn(e[a])) return !0;
  return !1;
};
function bS(e) {
  return Array.isArray(e) || (kt(e) && !nN(e));
}
function lh(e, a = {}) {
  for (const r in e) {
    const i = e[r];
    bS(i) ? ((a[r] = Array.isArray(i) ? [] : {}), lh(i, a[r])) : Rt(i) || (a[r] = !0);
  }
  return a;
}
function ih(e) {
  if (e !== !1) {
    if (e === !0) return !0;
    if (Array.isArray(e)) {
      const a = e.map((r) => ih(r));
      return a.some((r) => r !== void 0) ? a : void 0;
    }
    if (kt(e)) {
      const a = {};
      for (const r in e) {
        const i = ih(e[r]);
        Rt(i) || (a[r] = i);
      }
      return Object.keys(a).length ? a : void 0;
    }
  }
}
function gl(e, a, r) {
  r || (r = lh(a));
  for (const i in e) {
    const s = e[i];
    if (bS(s))
      Rt(a) || rh(r[i])
        ? (r[i] = lh(s, Array.isArray(s) ? [] : {}))
        : gl(s, _n(a) ? {} : a[i], r[i]);
    else {
      const u = a[i];
      r[i] = !na(s, u);
    }
  }
  return ih(r) || {};
}
const Sb = { value: !1, isValid: !1 },
  Eb = { value: !0, isValid: !0 };
var _S = (e) => {
    if (Array.isArray(e)) {
      if (e.length > 1) {
        const a = e.filter((r) => r && r.checked && !r.disabled).map((r) => r.value);
        return { value: a, isValid: !!a.length };
      }
      return e[0].checked && !e[0].disabled
        ? e[0].attributes && !Rt(e[0].attributes.value)
          ? Rt(e[0].value) || e[0].value === ""
            ? Eb
            : { value: e[0].value, isValid: !0 }
          : Eb
        : Sb;
    }
    return Sb;
  },
  SS = (e, { valueAsNumber: a, valueAsDate: r, setValueAs: i }) =>
    Rt(e) ? e : a ? (e === "" ? NaN : e && +e) : r && zn(e) ? new Date(e) : i ? i(e) : e;
const wb = { isValid: !1, value: null };
var ES = (e) =>
  Array.isArray(e)
    ? e.reduce((a, r) => (r && r.checked && !r.disabled ? { isValid: !0, value: r.value } : a), wb)
    : wb;
function xb(e) {
  const a = e.ref;
  return Xh(a)
    ? a.files
    : Ih(a)
      ? ES(e.refs).value
      : yS(a)
        ? [...a.selectedOptions].map(({ value: r }) => r)
        : Fo(a)
          ? _S(e.refs).value
          : SS(Rt(a.value) ? e.ref.value : a.value, e);
}
var aN = (e, a, r, i) => {
    const s = {};
    for (const u of e) {
      const c = ye(a, u);
      c && dt(s, u, c._f);
    }
    return { criteriaMode: r, names: [...e], fields: s, shouldUseNativeValidation: i };
  },
  Bu = (e) => e instanceof RegExp,
  xo = (e) => (Rt(e) ? e : Bu(e) ? e.source : kt(e) ? (Bu(e.value) ? e.value.source : e.value) : e),
  yu = (e) => ({
    isOnSubmit: !e || e === Ca.onSubmit,
    isOnBlur: e === Ca.onBlur,
    isOnChange: e === Ca.onChange,
    isOnAll: e === Ca.all,
    isOnTouch: e === Ca.onTouched,
  });
const Rb = "AsyncFunction";
var rN = (e) => {
    if (!e || !e.validate) return !1;
    if (Rn(e.validate)) return e.validate.constructor.name === Rb;
    if (kt(e.validate)) {
      for (const a in e.validate) if (e.validate[a].constructor.name === Rb) return !0;
    }
    return !1;
  },
  lN = (e) =>
    e.mount &&
    (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate),
  jd = (e, a, r) => {
    if (r) return !1;
    if (a.watchAll || a.watch.has(e)) return !0;
    for (const i of a.watch) if (e.startsWith(i) && e.charAt(i.length) === ".") return !0;
    return !1;
  };
const Oo = (e, a, r, i) => {
  for (const s of r || Object.keys(e)) {
    const u = ye(e, s);
    if (u) {
      const { _f: c, ...h } = u;
      if (c) {
        if (c.refs && c.refs[0] && a(c.refs[0], s) && !i) return !0;
        if (c.ref && a(c.ref, c.name) && !i) return !0;
        if (Oo(h, a)) break;
      } else if (kt(h) && Oo(h, a)) break;
    }
  }
};
function zb(e, a, r) {
  const i = ye(e, r);
  if (i || qo(r)) return { error: i, name: r };
  const s = r.split(".");
  for (; s.length; ) {
    const u = s.join("."),
      c = ye(a, u),
      h = ye(e, u);
    if (c && !Array.isArray(c) && r !== u) return { name: r };
    if (h && h.type) return { name: u, error: h };
    if (h && h.root && h.root.type) return { name: `${u}.root`, error: h.root };
    s.pop();
  }
  return { name: r };
}
var iN = (e, a, r, i) => {
    r(e);
    const { name: s, ...u } = e,
      c = Object.keys(u);
    return (
      !c.length ||
      (i && c.length >= Object.keys(a).length) ||
      c.find((h) => a[h] === (!i || Ca.all))
    );
  },
  oN = (e, a, r) =>
    !e ||
    !a ||
    e === a ||
    Ou(e).some((i) => i && (r ? i === a : i.startsWith(a) || a.startsWith(i))),
  sN = (e, a, r, i, s) =>
    s.isOnAll
      ? !1
      : !r && s.isOnTouch
        ? !(a || e)
        : (r ? i.isOnBlur : s.isOnBlur)
          ? !e
          : (r ? i.isOnChange : s.isOnChange)
            ? e
            : !0,
  uN = (e, a) => !vS(ye(e, a)).length && tn(e, a),
  Tb = (e, a, r) => {
    const i = ye(e, r),
      s = Array.isArray(i) ? i : [];
    return (dt(s, dS, a[r]), dt(e, r, s), e);
  };
function Ab(e, a, r = "validate") {
  if (zn(e) || (Array.isArray(e) && e.every(zn)) || (ta(e) && !e))
    return { type: r, message: zn(e) ? e : "", ref: a };
}
var hi = (e) => (kt(e) && !Bu(e) ? e : { value: e, message: "" }),
  Ob = async (e, a, r, i, s, u) => {
    const {
        ref: c,
        refs: h,
        required: p,
        maxLength: m,
        minLength: y,
        min: v,
        max: S,
        pattern: E,
        validate: w,
        name: z,
        valueAsNumber: R,
        mount: j,
      } = e._f,
      k = ye(r, z);
    if (!j || a.has(z)) return {};
    const F = h ? h[0] : c,
      $ = (fe) => {
        if (s && F.reportValidity) {
          const be = ta(fe) ? "" : fe || "";
          (h ? h.forEach((ze) => ze.setCustomValidity(be)) : F.setCustomValidity(be),
            F.reportValidity());
        }
      },
      G = {},
      he = Ih(c),
      ce = Fo(c),
      T = he || ce,
      me =
        ((R || Xh(c)) && Rt(c.value) && Rt(k)) ||
        (Vu(c) && c.value === "") ||
        k === "" ||
        (Array.isArray(k) && !k.length),
      Oe = Ph.bind(null, z, i, G),
      Be = (fe, be, ze, xe = Oa.maxLength, D = Oa.minLength) => {
        const X = fe ? be : ze;
        G[z] = { type: fe ? xe : D, message: X, ref: c, ...Oe(fe ? xe : D, X) };
      };
    if (
      u
        ? !Array.isArray(k) || !k.length
        : p &&
          ((!T && (me || _n(k))) ||
            (ta(k) && !k) ||
            (ce && !_S(h).isValid) ||
            (he && !ES(h).isValid))
    ) {
      const { value: fe, message: be } = zn(p) ? { value: !!p, message: p } : hi(p);
      if (fe && ((G[z] = { type: Oa.required, message: be, ref: F, ...Oe(Oa.required, be) }), !i))
        return ($(be), G);
    }
    if (!me && (!_n(v) || !_n(S))) {
      let fe, be;
      const ze = hi(S),
        xe = hi(v);
      if (!_n(k) && !isNaN(k)) {
        const D = c.valueAsNumber || (k && +k);
        (_n(ze.value) || (fe = D > ze.value), _n(xe.value) || (be = D < xe.value));
      } else {
        const D = c.valueAsDate || new Date(k),
          X = (Q) => new Date(new Date().toDateString() + " " + Q),
          pe = c.type == "time",
          ge = c.type == "week";
        (zn(ze.value) &&
          k &&
          (fe = pe ? X(k) > X(ze.value) : ge ? k > ze.value : D > new Date(ze.value)),
          zn(xe.value) &&
            k &&
            (be = pe ? X(k) < X(xe.value) : ge ? k < xe.value : D < new Date(xe.value)));
      }
      if ((fe || be) && (Be(!!fe, ze.message, xe.message, Oa.max, Oa.min), !i))
        return ($(G[z].message), G);
    }
    if ((m || y) && !me && (zn(k) || (u && Array.isArray(k)))) {
      const fe = hi(m),
        be = hi(y),
        ze = !_n(fe.value) && k.length > +fe.value,
        xe = !_n(be.value) && k.length < +be.value;
      if ((ze || xe) && (Be(ze, fe.message, be.message), !i)) return ($(G[z].message), G);
    }
    if (E && !me && zn(k)) {
      const { value: fe, message: be } = hi(E);
      if (
        Bu(fe) &&
        !k.match(fe) &&
        ((G[z] = { type: Oa.pattern, message: be, ref: c, ...Oe(Oa.pattern, be) }), !i)
      )
        return ($(be), G);
    }
    if (w) {
      if (Rn(w)) {
        const fe = await w(k, r),
          be = Ab(fe, F);
        if (be && ((G[z] = { ...be, ...Oe(Oa.validate, be.message) }), !i))
          return ($(be.message), G);
      } else if (kt(w)) {
        let fe = {};
        for (const be in w) {
          if (!bn(fe) && !i) break;
          const ze = Ab(await w[be](k, r), F, be);
          ze && ((fe = { ...ze, ...Oe(be, ze.message) }), $(ze.message), i && (G[z] = fe));
        }
        if (!bn(fe) && ((G[z] = { ref: F, ...fe }), !i)) return G;
      }
    }
    return ($(!0), G);
  };
const cN = { mode: Ca.onSubmit, reValidateMode: Ca.onChange, shouldFocusError: !0 },
  Vd = "form",
  wS = {
    submitCount: 0,
    isDirty: !1,
    isReady: !1,
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
  };
function fN(e = {}) {
  let a = { ...cN, ...e },
    r = {
      ...Zt(wS),
      isLoading: Rn(a.defaultValues),
      errors: a.errors || {},
      disabled: a.disabled || !1,
    },
    i = {},
    s = kt(a.defaultValues) || kt(a.values) ? Zt(a.defaultValues || a.values) || {} : {},
    u = a.shouldUnregister ? {} : Zt(s),
    c = { action: !1, mount: !1, watch: !1, keepIsValid: !1 },
    h = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
      registerName: new Set(),
    },
    p,
    m = 0,
    y = 0,
    v = yu(a.mode),
    S = yu(a.reValidateMode);
  const E = {
      isDirty: !1,
      dirtyFields: !1,
      validatingFields: !1,
      touchedFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    },
    w = { ...E };
  let z = { ...w };
  const R = { array: _b(), state: _b() },
    j = a.criteriaMode === Ca.all,
    k = (x) => (L) => {
      (clearTimeout(m), (m = setTimeout(x, L)));
    },
    F = async (x) => {
      if (!c.keepIsValid && !a.disabled && (w.isValid || z.isValid || x)) {
        let L;
        (a.resolver
          ? ((L = bn((await be()).errors)), $())
          : (L = await D({ fields: i, onlyCheckValid: !0, eventType: Gr.VALID })),
          L !== r.isValid && R.state.next({ isValid: L }));
      }
    },
    $ = (x, L) => {
      !a.disabled &&
        (w.isValidating || w.validatingFields || z.isValidating || z.validatingFields) &&
        ((x || Array.from(h.mount)).forEach((V) => {
          V && (L ? dt(r.validatingFields, V, L) : tn(r.validatingFields, V));
        }),
        R.state.next({
          validatingFields: r.validatingFields,
          isValidating: !bn(r.validatingFields),
        }));
    },
    G = () => {
      r.dirtyFields = gl(s, u);
    },
    he = (x, L = [], V, le, oe = !0, de = !0) => {
      if (le && V && !a.disabled) {
        if (((c.action = !0), de && Array.isArray(ye(i, x)))) {
          const ue = V(ye(i, x), le.argA, le.argB);
          oe && dt(i, x, ue);
        }
        if (de && Array.isArray(ye(r.errors, x))) {
          const ue = V(ye(r.errors, x), le.argA, le.argB);
          (oe && dt(r.errors, x, ue), uN(r.errors, x));
        }
        if ((w.touchedFields || z.touchedFields) && de && Array.isArray(ye(r.touchedFields, x))) {
          const ue = V(ye(r.touchedFields, x), le.argA, le.argB);
          oe && dt(r.touchedFields, x, ue);
        }
        ((w.dirtyFields || z.dirtyFields) && G(),
          R.state.next({
            name: x,
            isDirty: pe(x, L),
            dirtyFields: r.dirtyFields,
            errors: r.errors,
            isValid: r.isValid,
          }));
      } else dt(u, x, L);
    },
    ce = (x, L) => {
      (dt(r.errors, x, L), (r.errors = { ...r.errors }), R.state.next({ errors: r.errors }));
    },
    T = (x) => {
      ((r.errors = x), R.state.next({ errors: r.errors, isValid: !1 }));
    },
    me = (x) => {
      const L = qo(x) ? [x] : lc(x);
      let V = u,
        le = s;
      for (let oe = 0; oe < L.length - 1; oe++) {
        const de = L[oe];
        if (((V = _n(V) ? V : V[de]), (le = _n(le) ? le : le[de]), V === null && le !== null))
          return !0;
      }
      return !1;
    },
    Oe = (x, L, V, le) => {
      const oe = ye(i, x);
      if (oe) {
        if (me(x)) return;
        const de = Rt(ye(u, x)),
          ue = ye(u, x, Rt(V) ? ye(s, x) : V);
        (Rt(ue) || (le && le.defaultChecked) || L ? dt(u, x, L ? ue : xb(oe._f)) : O(x, ue),
          c.mount &&
            !c.action &&
            (F(),
            de &&
              r.isDirty &&
              (w.isDirty || z.isDirty) &&
              (pe() || ((r.isDirty = !1), R.state.next({ ...r }))),
            e.shouldUnregister && de && !Rt(ye(u, x)) && jd(x, h) && (c.watch = !0)));
      }
    },
    Be = (x, L, V, le, oe) => {
      let de = !1,
        ue = !1;
      const _e = { name: x };
      if (!a.disabled) {
        if (!V || le) {
          const Ve = na(ye(s, x), L);
          ((w.isDirty || z.isDirty) &&
            ((ue = r.isDirty), (r.isDirty = _e.isDirty = !Ve || pe()), (de = ue !== _e.isDirty)),
            (ue = !!ye(r.dirtyFields, x)),
            Ve !== r.isDirty
              ? (r.dirtyFields = gl(s, u))
              : Ve
                ? tn(r.dirtyFields, x)
                : dt(r.dirtyFields, x, !0),
            (_e.dirtyFields = r.dirtyFields),
            (de = de || ((w.dirtyFields || z.dirtyFields) && ue !== !Ve)));
        }
        if (V) {
          const Ve = ye(r.touchedFields, x);
          Ve ||
            (dt(r.touchedFields, x, V),
            (_e.touchedFields = r.touchedFields),
            (de = de || ((w.touchedFields || z.touchedFields) && Ve !== V)));
        }
        de && oe && R.state.next(_e);
      }
      return de ? _e : {};
    },
    fe = (x, L, V, le) => {
      const oe = ye(r.errors, x),
        de = (w.isValid || z.isValid) && ta(L) && r.isValid !== L;
      if (
        (a.delayError && V
          ? ((p = k(() => ce(x, V))), p(a.delayError))
          : (clearTimeout(m),
            (p = null),
            V ? dt(r.errors, x, V) : tn(r.errors, x),
            (r.errors = { ...r.errors })),
        (V ? !na(oe, V) : oe) || !bn(le) || de)
      ) {
        const ue = { ...le, ...(de && ta(L) ? { isValid: L } : {}), errors: r.errors, name: x };
        ((r = { ...r, ...ue }), R.state.next(ue));
      }
    },
    be = async (x) => (
      $(x, !0),
      await a.resolver(
        u,
        a.context,
        aN(x || h.mount, i, a.criteriaMode, a.shouldUseNativeValidation),
      )
    ),
    ze = async (x) => {
      const { errors: L } = await be(x);
      if (($(x), x)) {
        for (const V of x) {
          const le = ye(L, V);
          le
            ? h.array.has(V) && kt(le) && !Object.keys(le).some((oe) => !Number.isNaN(Number(oe)))
              ? Tb(r.errors, { [V]: le }, V)
              : dt(r.errors, V, le)
            : tn(r.errors, V);
        }
        r.errors = { ...r.errors };
      } else r.errors = L;
      return L;
    },
    xe = async ({ name: x, eventType: L }) => {
      if (e.validate) {
        const V = await e.validate({ formValues: u, formState: r, name: x, eventType: L });
        if (kt(V))
          for (const le in V) {
            const oe = V[le];
            oe &&
              Ut(`${Vd}.${le}`, {
                message: zn(oe.message) ? oe.message : "",
                type: oe.type || Oa.validate,
              });
          }
        else zn(V) || !V ? Ut(Vd, { message: V || "", type: Oa.validate }) : an(Vd);
        return V;
      }
      return !0;
    },
    D = async ({
      fields: x,
      onlyCheckValid: L,
      name: V,
      eventType: le,
      context: oe = { valid: !0, runRootValidation: !1 },
    }) => {
      if (
        e.validate &&
        ((oe.runRootValidation = !0),
        !(await xe({ name: V, eventType: le })) && ((oe.valid = !1), L))
      )
        return oe.valid;
      for (const de in x) {
        const ue = x[de];
        if (ue) {
          const { _f: _e, ...Ve } = ue;
          if (_e) {
            const Je = h.array.has(_e.name),
              Nt = ue._f && rN(ue._f),
              dn = w.validatingFields || w.isValidating || z.validatingFields || z.isValidating;
            Nt && dn && $([_e.name], !0);
            const It = await Ob(ue, h.disabled, u, j, a.shouldUseNativeValidation && !L, Je);
            if (
              (Nt && dn && $([_e.name]),
              (It[_e.name] && ((oe.valid = !1), L)) ||
                (!L &&
                  (ye(It, _e.name)
                    ? Je
                      ? Tb(r.errors, It, _e.name)
                      : dt(r.errors, _e.name, It[_e.name])
                    : tn(r.errors, _e.name)),
                e.shouldUseNativeValidation && It[_e.name]))
            )
              break;
          }
          !bn(Ve) &&
            (await D({ context: oe, onlyCheckValid: L, fields: Ve, name: de, eventType: le }));
        }
      }
      return oe.valid;
    },
    X = () => {
      for (const x of h.unMount) {
        const L = ye(i, x);
        L && (L._f.refs ? L._f.refs.every((V) => !Ud(V)) : !Ud(L._f.ref)) && la(x);
      }
      h.unMount = new Set();
    },
    pe = (x, L) => !a.disabled && (x && L && dt(u, x, L), !na(c.mount ? u : s, s)),
    ge = (x, L, V) => ah(x, h, { ...(c.mount ? u : Rt(L) ? s : zn(x) ? { [x]: L } : L) }, V, L),
    Q = (x) => vS(ye(c.mount ? u : s, x, a.shouldUnregister ? ye(s, x, []) : [])),
    O = (x, L, V = {}, le = !1, oe = !1) => {
      const de = ye(i, x);
      let ue = L;
      if (de) {
        const _e = de._f;
        _e &&
          (!_e.disabled && dt(u, x, SS(L, _e)),
          (ue = Vu(_e.ref) && _n(L) ? "" : L),
          yS(_e.ref)
            ? [..._e.ref.options].forEach((Ve) => (Ve.selected = ue.includes(Ve.value)))
            : _e.refs
              ? Fo(_e.ref)
                ? _e.refs.forEach((Ve) => {
                    (!Ve.defaultChecked || !Ve.disabled) &&
                      (Array.isArray(ue)
                        ? (Ve.checked = !!ue.find((Je) => Je === Ve.value))
                        : (Ve.checked = ue === Ve.value || !!ue));
                  })
                : _e.refs.forEach((Ve) => (Ve.checked = Ve.value === ue))
              : Xh(_e.ref)
                ? (_e.ref.value = "")
                : ((_e.ref.value = ue),
                  !_e.ref.type && !oe && R.state.next({ name: x, values: le ? u : Zt(u) })));
      }
      ((V.shouldDirty || V.shouldTouch) && Be(x, ue, V.shouldTouch, V.shouldDirty, !oe),
        V.shouldValidate && He(x));
    },
    I = (x, L, V, le = !1, oe = !1) => {
      for (const de in L) {
        if (!L.hasOwnProperty(de)) return;
        const ue = L[de],
          _e = x + "." + de,
          Ve = ye(i, _e);
        (h.array.has(x) || kt(ue) || (Ve && !Ve._f)) && !bl(ue)
          ? I(_e, ue, V, le, oe)
          : O(_e, ue, V, le, oe);
      }
    },
    q = (x, L, V, le, oe = !1) => {
      const de = ye(i, x),
        ue = h.array.has(x),
        _e = le ? L : Zt(L),
        Ve = ye(u, x),
        Je = na(Ve, _e);
      if ((Je || dt(u, x, _e), ue))
        (R.array.next({ name: x, values: le ? u : Zt(u) }),
          (w.isDirty || w.dirtyFields || z.isDirty || z.dirtyFields) &&
            V.shouldDirty &&
            (G(), oe || R.state.next({ name: x, dirtyFields: r.dirtyFields, isDirty: pe(x, _e) })));
      else {
        const Nt = (Array.isArray(_e) && !_e.length) || bn(_e);
        !de || de._f || _n(_e) || Nt ? O(x, _e, V, le, oe) : I(x, _e, V, le, oe);
      }
      if (!Je && !oe) {
        const Nt = jd(x, h),
          dn = le ? u : Zt(u);
        R.state.next({ ...(Nt && r), name: c.mount || Nt ? x : void 0, values: dn });
      }
    },
    J = (x, L, V = {}) => q(x, L, V, !1),
    ie = (x, L = {}) => {
      const V = Rn(x) ? x(u) : x;
      if (!na(u, V)) {
        u = { ...u, ...V };
        for (const le of h.mount) q(le, ye(V, le), L, !0, !0);
        (R.state.next({ ...r, name: void 0, type: void 0, ...(y ? { values: u } : {}) }),
          L.shouldValidate && F());
      }
    },
    ve = async (x) => {
      c.mount = !0;
      const L = x.target;
      let V = L.name,
        le = !0;
      const oe = ye(i, V),
        de = (ue) => {
          le = Number.isNaN(ue) || (bl(ue) && isNaN(ue.getTime())) || na(ue, ye(u, V, ue));
        };
      if (oe) {
        let ue, _e;
        const Ve = L.type ? xb(oe._f) : nh(x),
          Je = x.type === Gr.BLUR || x.type === Gr.FOCUS_OUT,
          Nt = !lN(oe._f) && !e.validate && !a.resolver && !ye(r.errors, V) && !oe._f.deps,
          dn = Nt || sN(Je, ye(r.touchedFields, V), r.isSubmitted, S, v),
          It = jd(V, h, Je);
        (dt(u, V, Ve),
          Je
            ? (!L || !L.readOnly) && (oe._f.onBlur && oe._f.onBlur(x), p && p(0))
            : oe._f.onChange && oe._f.onChange(x));
        const Qt = Be(V, Ve, Je),
          $e = !bn(Qt) || It;
        if ((!Je && R.state.next({ name: V, type: x.type, ...(y ? { values: Zt(u) } : {}) }), dn))
          return (
            (!Nt || !r.isValid) &&
              (w.isValid || z.isValid) &&
              (a.mode === "onBlur" ? Je && F() : Je || F()),
            $e && R.state.next({ name: V, ...(It ? {} : Qt) })
          );
        if (
          (!a.resolver && e.validate && (await xe({ name: V, eventType: x.type })),
          !Je && It && R.state.next({ ...r }),
          a.resolver)
        ) {
          const { errors: ct } = await be([V]);
          if (($([V]), de(Ve), !le)) {
            !bn(Qt) && R.state.next(Qt);
            return;
          }
          const jt = zb(r.errors, i, V),
            Vt = zb(ct, i, jt.name || V);
          ((ue = Vt.error), (V = Vt.name), (_e = bn(ct)));
        } else
          ($([V], !0),
            (ue = (await Ob(oe, h.disabled, u, j, a.shouldUseNativeValidation))[V]),
            $([V]),
            de(Ve),
            le &&
              (ue
                ? (_e = !1)
                : (w.isValid || z.isValid) &&
                  (_e = await D({ fields: i, onlyCheckValid: !0, name: V, eventType: x.type }))));
        le &&
          (oe._f.deps && (!Array.isArray(oe._f.deps) || oe._f.deps.length > 0) && He(oe._f.deps),
          fe(V, _e, ue, Qt));
      }
    },
    Me = (x, L) => {
      if (ye(r.errors, L) && x.focus) return (x.focus(), 1);
    },
    He = async (x, L = {}) => {
      let V, le;
      const oe = Ou(x);
      if (a.resolver) {
        const de = await ze(Rt(x) ? x : oe);
        ((V = bn(de)), (le = x ? !oe.some((ue) => ye(de, ue)) : V));
      } else
        x
          ? ((le = (
              await Promise.all(
                oe.map(async (de) => {
                  const ue = ye(i, de);
                  return await D({
                    fields: ue && ue._f ? { [de]: ue } : ue,
                    eventType: Gr.TRIGGER,
                  });
                }),
              )
            ).every(Boolean)),
            !(!le && !r.isValid) && F())
          : (le = V = await D({ fields: i, name: x, eventType: Gr.TRIGGER }));
      return (
        R.state.next({
          ...(!zn(x) || ((w.isValid || z.isValid) && V !== r.isValid) ? {} : { name: x }),
          ...(a.resolver || !x ? { isValid: V } : {}),
          errors: r.errors,
        }),
        L.shouldFocus && !le && Oo(i, Me, x ? oe : h.mount),
        le
      );
    },
    Ne = (x, L) => {
      let V = { ...(c.mount ? u : s) };
      return (
        L && (V = gS(L.dirtyFields ? r.dirtyFields : r.touchedFields, V)),
        Rt(x) ? V : zn(x) ? ye(V, x) : x.map((le) => ye(V, le))
      );
    },
    un = (x, L) => ({
      invalid: !!ye((L || r).errors, x),
      isDirty: !!ye((L || r).dirtyFields, x),
      error: ye((L || r).errors, x),
      isValidating: !!ye(r.validatingFields, x),
      isTouched: !!ye((L || r).touchedFields, x),
    }),
    an = (x) => {
      const L = x ? Ou(x) : void 0;
      (L?.forEach((V) => tn(r.errors, V)),
        L
          ? L.forEach((V) => {
              R.state.next({ name: V, errors: r.errors });
            })
          : R.state.next({ errors: {} }));
    },
    Ut = (x, L, V) => {
      const le = (ye(i, x, { _f: {} })._f || {}).ref,
        oe = ye(r.errors, x) || {},
        { ref: de, message: ue, type: _e, ...Ve } = oe;
      (dt(r.errors, x, { ...Ve, ...L, ref: le }),
        R.state.next({ name: x, errors: r.errors, isValid: !1 }),
        V && V.shouldFocus && le && le.focus && le.focus());
    },
    St = (x, L) => {
      if (Rn(x)) {
        y++;
        const { unsubscribe: V } = R.state.subscribe({
          next: (oe) => "values" in oe && x(oe.values || ge(void 0, L), oe),
        });
        let le = !1;
        return {
          unsubscribe: () => {
            le || ((le = !0), y--, V());
          },
        };
      }
      return ge(x, L, !0);
    },
    xt = (x) => {
      var L;
      const V = !!(!((L = x.formState) === null || L === void 0) && L.values);
      V && y++;
      const { unsubscribe: le } = R.state.subscribe({
        next: (de) => {
          if (oN(x.name, de.name, x.exact) && iN(de, x.formState || w, Tn, x.reRenderRoot)) {
            const ue = { ...u };
            x.callback({ values: ue, ...r, ...de, defaultValues: s });
          }
        },
      });
      if (!V) return le;
      let oe = !1;
      return () => {
        oe || ((oe = !0), y--, le());
      };
    },
    Ma = (x) => (
      (c.mount = !0),
      (z = { ...z, ...x.formState }),
      xt({ ...x, formState: { ...E, ...x.formState } })
    ),
    la = (x, L = {}) => {
      for (const V of x ? Ou(x) : h.mount)
        (h.mount.delete(V),
          h.array.delete(V),
          L.keepValue || (tn(i, V), tn(u, V)),
          !L.keepError && tn(r.errors, V),
          !L.keepDirty && tn(r.dirtyFields, V),
          !L.keepTouched && tn(r.touchedFields, V),
          !L.keepIsValidating && tn(r.validatingFields, V),
          !a.shouldUnregister && !L.keepDefaultValue && tn(s, V));
      (R.state.next({ values: Zt(u) }),
        R.state.next({ ...r, ...(L.keepDirty ? { isDirty: pe() } : {}) }),
        !L.keepIsValid && F());
    },
    cn = ({ disabled: x, name: L }) => {
      if ((ta(x) && c.mount) || x || h.disabled.has(L)) {
        const oe = h.disabled.has(L) !== !!x;
        (x ? h.disabled.add(L) : h.disabled.delete(L), oe && c.mount && !c.action && F());
      }
    },
    Sa = (x, L = {}) => {
      let V = ye(i, x);
      const le = ta(L.disabled) || ta(a.disabled),
        oe = !h.registerName.has(x) && V && V._f && !V._f.mount;
      return (
        dt(i, x, {
          ...(V || {}),
          _f: { ...(V && V._f ? V._f : { ref: { name: x } }), name: x, mount: !0, ...L },
        }),
        h.mount.add(x),
        V && !oe
          ? cn({ disabled: ta(L.disabled) ? L.disabled : a.disabled, name: x })
          : Oe(x, !0, L.value),
        {
          ...(le ? { disabled: L.disabled || a.disabled } : {}),
          ...(a.progressive
            ? {
                required: !!L.required,
                min: xo(L.min),
                max: xo(L.max),
                minLength: xo(L.minLength),
                maxLength: xo(L.maxLength),
                pattern: xo(L.pattern),
              }
            : {}),
          name: x,
          onChange: ve,
          onBlur: ve,
          ref: (de) => {
            if (de) {
              (h.registerName.add(x), Sa(x, L), h.registerName.delete(x), (V = ye(i, x)));
              const ue =
                  (Rt(de.value) &&
                    de.querySelectorAll &&
                    de.querySelectorAll("input,select,textarea")[0]) ||
                  de,
                _e = WM(ue),
                Ve = V._f.refs || [];
              if (_e ? Ve.find((Je) => Je === ue) : ue === V._f.ref) return;
              (dt(i, x, {
                _f: {
                  ...V._f,
                  ...(_e
                    ? {
                        refs: [...Ve.filter(Ud), ue, ...(Array.isArray(ye(s, x)) ? [{}] : [])],
                        ref: { type: ue.type, name: x },
                      }
                    : { ref: ue }),
                },
              }),
                Oe(x, !1, void 0, ue));
            } else
              ((V = ye(i, x, {})),
                V._f && (V._f.mount = !1),
                (a.shouldUnregister || L.shouldUnregister) &&
                  !(cS(h.array, x) && c.action) &&
                  h.unMount.add(x));
          },
        }
      );
    },
    rn = () => a.shouldFocusError && !a.shouldUseNativeValidation && Oo(i, Me, h.mount),
    Na = (x) => {
      ta(x) &&
        (R.state.next({ disabled: x }),
        Oo(
          i,
          (L, V) => {
            const le = ye(i, V);
            le &&
              ((L.disabled = le._f.disabled || x),
              Array.isArray(le._f.refs) &&
                le._f.refs.forEach((oe) => {
                  oe.disabled = le._f.disabled || x;
                }));
          },
          0,
          !1,
        ));
    },
    ka = (x, L) => async (V) => {
      let le;
      V && (V.preventDefault && V.preventDefault(), V.persist && V.persist());
      let oe = Zt(u);
      if ((R.state.next({ isSubmitting: !0 }), a.resolver)) {
        const { errors: de, values: ue } = await be();
        ($(), (r.errors = de), (oe = Zt(ue)));
      } else await D({ fields: i, eventType: Gr.SUBMIT });
      if (h.disabled.size) for (const de of h.disabled) tn(oe, de);
      if ((tn(r.errors, dS), bn(r.errors))) {
        R.state.next({ errors: {} });
        try {
          await x(oe, V);
        } catch (de) {
          le = de;
        }
      } else (L && (await L({ ...r.errors }, V)), rn(), setTimeout(rn));
      if (
        (R.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: bn(r.errors) && !le,
          submitCount: r.submitCount + 1,
          errors: r.errors,
        }),
        le)
      )
        throw le;
    },
    ln = (x, L = {}) => {
      ye(i, x) &&
        (Rt(L.defaultValue)
          ? J(x, Zt(ye(s, x)))
          : (J(x, L.defaultValue), dt(s, x, Zt(L.defaultValue))),
        L.keepTouched || tn(r.touchedFields, x),
        L.keepDirty ||
          (tn(r.dirtyFields, x), (r.isDirty = L.defaultValue ? pe(x, Zt(ye(s, x))) : pe())),
        L.keepError || (tn(r.errors, x), w.isValid && F()),
        R.state.next({ ...r }));
    },
    Yn = (x, L = {}) => {
      const V = x ? Zt(x) : s,
        le = Zt(V),
        oe = bn(x),
        de = le;
      if ((L.keepDefaultValues || (s = V), !L.keepValues)) {
        if (L.keepDirtyValues) {
          const ue = new Set([...h.mount, ...Object.keys(gl(s, u))]);
          for (const _e of Array.from(ue)) {
            const Ve = ye(r.dirtyFields, _e),
              Je = ye(u, _e),
              Nt = ye(de, _e);
            Ve && !Rt(Je) ? dt(de, _e, Je) : !Ve && !Rt(Nt) && J(_e, Nt);
          }
        } else {
          if (rc && Rt(x))
            for (const ue of h.mount) {
              const _e = ye(i, ue);
              if (_e && _e._f) {
                const Ve = Array.isArray(_e._f.refs) ? _e._f.refs[0] : _e._f.ref;
                if (Vu(Ve)) {
                  const Je = Ve.closest("form");
                  if (Je) {
                    Je.reset();
                    break;
                  }
                }
              }
            }
          if (L.keepFieldsRef) for (const ue of h.mount) J(ue, ye(de, ue));
          else i = {};
        }
        if (a.shouldUnregister) {
          if (((u = L.keepDefaultValues ? Zt(s) : {}), L.keepFieldsRef))
            for (const ue of h.mount) dt(u, ue, ye(de, ue));
        } else u = Zt(de);
        (R.array.next({ values: { ...de } }), R.state.next({ values: { ...de } }));
      }
      ((h = {
        mount: L.keepDirtyValues ? h.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        registerName: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: "",
      }),
        (c.mount =
          !w.isValid || !!L.keepIsValid || !!L.keepDirtyValues || (!a.shouldUnregister && !bn(de))),
        (c.watch = !!a.shouldUnregister),
        (c.keepIsValid = !!L.keepIsValid),
        (c.action = !1),
        L.keepErrors || (r.errors = {}),
        R.state.next({
          submitCount: L.keepSubmitCount ? r.submitCount : 0,
          isDirty: oe
            ? !1
            : L.keepDirty
              ? r.isDirty
              : L.keepValues
                ? pe()
                : !!(L.keepDefaultValues && !na(x, s)),
          isSubmitted: L.keepIsSubmitted ? r.isSubmitted : !1,
          dirtyFields: oe
            ? {}
            : L.keepDirtyValues
              ? L.keepDefaultValues && u
                ? gl(s, u)
                : r.dirtyFields
              : L.keepDefaultValues && x
                ? gl(s, x)
                : L.keepDirty
                  ? r.dirtyFields
                  : {},
          touchedFields: L.keepTouched ? r.touchedFields : {},
          errors: L.keepErrors ? r.errors : {},
          isSubmitSuccessful: L.keepIsSubmitSuccessful ? r.isSubmitSuccessful : !1,
          isSubmitting: !1,
          defaultValues: s,
        }));
    },
    Xt = (x, L) => Yn(Rn(x) ? x(u) : x, { ...a.resetOptions, ...L }),
    Fn = (x, L = {}) => {
      const V = ye(i, x),
        le = V && V._f;
      if (le) {
        const oe = le.refs ? le.refs[0] : le.ref;
        oe.focus &&
          setTimeout(() => {
            (oe.focus(), L.shouldSelect && Rn(oe.select) && oe.select());
          });
      }
    },
    Tn = (x) => {
      r = { ...r, ...x };
    },
    fn = {
      control: {
        register: Sa,
        unregister: la,
        getFieldState: un,
        handleSubmit: ka,
        setError: Ut,
        _subscribe: xt,
        _runSchema: be,
        _updateIsValidating: $,
        _focusError: rn,
        _getWatch: ge,
        _getDirty: pe,
        _setValid: F,
        _setFieldArray: he,
        _setDisabledField: cn,
        _setErrors: T,
        _getFieldArray: Q,
        _reset: Yn,
        _resetDefaultValues: () =>
          Rn(a.defaultValues) &&
          a.defaultValues().then((x) => {
            (Xt(x, a.resetOptions), R.state.next({ isLoading: !1 }));
          }),
        _removeUnmounted: X,
        _disableForm: Na,
        _subjects: R,
        _proxyFormState: w,
        get _fields() {
          return i;
        },
        get _formValues() {
          return u;
        },
        get _state() {
          return c;
        },
        set _state(x) {
          c = x;
        },
        get _defaultValues() {
          return s;
        },
        get _names() {
          return h;
        },
        set _names(x) {
          h = x;
        },
        get _formState() {
          return r;
        },
        get _options() {
          return a;
        },
        set _options(x) {
          ((a = { ...a, ...x }), (v = yu(a.mode)), (S = yu(a.reValidateMode)));
        },
      },
      subscribe: Ma,
      trigger: He,
      register: Sa,
      handleSubmit: ka,
      watch: St,
      setValue: J,
      setValues: ie,
      getValues: Ne,
      reset: Xt,
      resetField: ln,
      resetDefaultValues: (x, L = {}) => {
        if (((s = Zt(x)), !L.keepDirty)) {
          const V = gl(s, u);
          ((r.dirtyFields = V), (r.isDirty = !bn(V)));
        }
        (L.keepIsValid || F(), R.state.next({ ...r, defaultValues: s }));
      },
      clearErrors: an,
      unregister: la,
      setError: Ut,
      setFocus: Fn,
      getFieldState: un,
    };
  return { ...fn, formControl: fn };
}
function dN(e = {}) {
  const a = K.useRef(void 0),
    r = K.useRef(void 0),
    i = K.useRef(e.formControl),
    [s, u] = K.useState(() => ({
      ...Zt(wS),
      isLoading: Rn(e.defaultValues),
      errors: e.errors || {},
      disabled: e.disabled || !1,
      defaultValues: Rn(e.defaultValues) ? void 0 : e.defaultValues,
    }));
  if (!a.current || (e.formControl && i.current !== e.formControl))
    if (((i.current = e.formControl), e.formControl))
      ((a.current = { ...e.formControl, formState: s }),
        e.defaultValues &&
          !Rn(e.defaultValues) &&
          e.formControl.reset(e.defaultValues, e.resetOptions));
    else {
      const { formControl: h, ...p } = fN(e);
      a.current = { ...p, formState: s };
    }
  const c = a.current.control;
  return (
    (c._options = e),
    qh(() => {
      const h = c._subscribe({
        formState: c._proxyFormState,
        callback: () => u({ ...c._formState, defaultValues: c._defaultValues }),
        reRenderRoot: !0,
      });
      return (u((p) => ({ ...p, isReady: !0 })), (c._formState.isReady = !0), h);
    }, [c]),
    K.useEffect(() => c._disableForm(e.disabled), [c, e.disabled]),
    K.useEffect(() => {
      (e.mode && (c._options.mode = e.mode),
        e.reValidateMode && (c._options.reValidateMode = e.reValidateMode));
    }, [c, e.mode, e.reValidateMode]),
    K.useEffect(() => {
      e.errors && (c._setErrors(e.errors), c._focusError());
    }, [c, e.errors]),
    K.useEffect(() => {
      e.shouldUnregister && c._subjects.state.next({ values: c._getWatch() });
    }, [c, e.shouldUnregister]),
    K.useEffect(() => {
      if (c._proxyFormState.isDirty) {
        const h = c._getDirty();
        h !== s.isDirty && c._subjects.state.next({ isDirty: h });
      }
    }, [c, s.isDirty]),
    K.useEffect(() => {
      var h;
      e.values && !na(e.values, r.current)
        ? (c._reset(e.values, { keepFieldsRef: !0, ...c._options.resetOptions }),
          (!((h = c._options.resetOptions) === null || h === void 0) && h.keepIsValid) ||
            c._setValid(),
          (r.current = e.values),
          u((p) => ({ ...p })))
        : c._resetDefaultValues();
    }, [c, e.values]),
    K.useEffect(() => {
      (c._state.mount || (c._setValid(), (c._state.mount = !0)),
        c._state.watch && ((c._state.watch = !1), c._subjects.state.next({ ...c._formState })),
        c._removeUnmounted());
    }),
    (a.current.formState = K.useMemo(() => mS(s, c), [c, s])),
    a.current
  );
}
const Cb = (e, a, r) => {
    if (e && "reportValidity" in e) {
      const i = ye(r, a);
      (e.setCustomValidity((i && i.message) || ""), e.reportValidity());
    }
  },
  oh = (e, a) => {
    for (const r in a.fields) {
      const i = a.fields[r];
      i && i.ref && "reportValidity" in i.ref
        ? Cb(i.ref, r, e)
        : i && i.refs && i.refs.forEach((s) => Cb(s, r, e));
    }
  },
  Db = (e, a) => {
    a.shouldUseNativeValidation && oh(e, a);
    const r = {};
    for (const i in e) {
      const s = ye(a.fields, i),
        u = Object.assign(e[i] || {}, { ref: s && s.ref });
      if (hN(a.names || Object.keys(e), i)) {
        const c = Object.assign({}, ye(r, i));
        (dt(c, "root", u), dt(r, i, c));
      } else dt(r, i, u);
    }
    return r;
  },
  hN = (e, a) => {
    const r = Mb(a).replace(/[.*+?^${}()|\\]/g, "\\$&");
    return e.some((i) => Mb(i).match(`^${r}\\.\\d+`));
  };
function Mb(e) {
  return e.replace(/[\[\]]/g, "");
}
function sh() {
  return (
    (sh = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var a = 1; a < arguments.length; a++) {
            var r = arguments[a];
            for (var i in r) ({}).hasOwnProperty.call(r, i) && (e[i] = r[i]);
          }
          return e;
        }),
    sh.apply(null, arguments)
  );
}
function Nb(e, a) {
  try {
    var r = e();
  } catch (i) {
    return a(i);
  }
  return r && r.then ? r.then(void 0, a) : r;
}
function mN(e, a) {
  for (var r = {}; e.length; ) {
    var i = e[0],
      s = i.code,
      u = i.message,
      c = i.path.join(".");
    if (!r[c])
      if ("unionErrors" in i) {
        var h = i.unionErrors[0].errors[0];
        r[c] = { message: h.message, type: h.code };
      } else r[c] = { message: u, type: s };
    if (
      ("unionErrors" in i &&
        i.unionErrors.forEach(function (y) {
          return y.errors.forEach(function (v) {
            return e.push(v);
          });
        }),
      a)
    ) {
      var p = r[c].types,
        m = p && p[i.code];
      r[c] = Ph(c, a, r, s, m ? [].concat(m, i.message) : i.message);
    }
    e.shift();
  }
  return r;
}
function pN(e, a) {
  for (
    var r = {},
      i = function () {
        var s = e[0],
          u = s.code,
          c = s.message,
          h = s.path.join(".");
        if (!r[h])
          if (s.code === "invalid_union" && s.errors.length > 0) {
            var p = s.errors[0][0];
            r[h] = { message: p.message, type: p.code };
          } else r[h] = { message: c, type: u };
        if (
          (s.code === "invalid_union" &&
            s.errors.forEach(function (v) {
              return v.forEach(function (S) {
                return e.push(sh({}, S, { path: [].concat(s.path, S.path) }));
              });
            }),
          a)
        ) {
          var m = r[h].types,
            y = m && m[s.code];
          r[h] = Ph(h, a, r, u, y ? [].concat(y, s.message) : s.message);
        }
        e.shift();
      };
    e.length;
  )
    i();
  return r;
}
function vN(e, a, r) {
  if (
    (r === void 0 && (r = {}),
    (function (i) {
      return "_def" in i && typeof i._def == "object" && "typeName" in i._def;
    })(e))
  )
    return function (i, s, u) {
      try {
        return Promise.resolve(
          Nb(
            function () {
              return Promise.resolve(e[r.mode === "sync" ? "parse" : "parseAsync"](i, a)).then(
                function (c) {
                  return (
                    u.shouldUseNativeValidation && oh({}, u),
                    { errors: {}, values: r.raw ? Object.assign({}, i) : c }
                  );
                },
              );
            },
            function (c) {
              if (
                (function (h) {
                  return Array.isArray(h?.issues);
                })(c)
              )
                return {
                  values: {},
                  errors: Db(
                    mN(c.errors, !u.shouldUseNativeValidation && u.criteriaMode === "all"),
                    u,
                  ),
                };
              throw c;
            },
          ),
        );
      } catch (c) {
        return Promise.reject(c);
      }
    };
  if (
    (function (i) {
      return "_zod" in i && typeof i._zod == "object";
    })(e)
  )
    return function (i, s, u) {
      try {
        return Promise.resolve(
          Nb(
            function () {
              return Promise.resolve((r.mode === "sync" ? SA : EA)(e, i, a)).then(function (c) {
                return (
                  u.shouldUseNativeValidation && oh({}, u),
                  { errors: {}, values: r.raw ? Object.assign({}, i) : c }
                );
              });
            },
            function (c) {
              if (
                (function (h) {
                  return h instanceof Zh;
                })(c)
              )
                return {
                  values: {},
                  errors: Db(
                    pN(c.issues, !u.shouldUseNativeValidation && u.criteriaMode === "all"),
                    u,
                  ),
                };
              throw c;
            },
          ),
        );
      } catch (c) {
        return Promise.reject(c);
      }
    };
  throw new Error("Invalid input: not a Zod schema");
}
const gN = "modulepreload",
  yN = function (e) {
    return "/" + e;
  },
  kb = {},
  Ct = function (a, r, i) {
    let s = Promise.resolve();
    if (r && r.length > 0) {
      let p = function (m) {
        return Promise.all(
          m.map((y) =>
            Promise.resolve(y).then(
              (v) => ({ status: "fulfilled", value: v }),
              (v) => ({ status: "rejected", reason: v }),
            ),
          ),
        );
      };
      document.getElementsByTagName("link");
      const c = document.querySelector("meta[property=csp-nonce]"),
        h = c?.nonce || c?.getAttribute("nonce");
      s = p(
        r.map((m) => {
          if (((m = yN(m)), m in kb)) return;
          kb[m] = !0;
          const y = m.endsWith(".css"),
            v = y ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${m}"]${v}`)) return;
          const S = document.createElement("link");
          if (
            ((S.rel = y ? "stylesheet" : gN),
            y || (S.as = "script"),
            (S.crossOrigin = ""),
            (S.href = m),
            h && S.setAttribute("nonce", h),
            document.head.appendChild(S),
            y)
          )
            return new Promise((E, w) => {
              (S.addEventListener("load", E),
                S.addEventListener("error", () => w(new Error(`Unable to preload CSS for ${m}`))));
            });
        }),
      );
    }
    function u(c) {
      const h = new Event("vite:preloadError", { cancelable: !0 });
      if (((h.payload = c), window.dispatchEvent(h), !h.defaultPrevented)) throw c;
    }
    return s.then((c) => {
      for (const h of c || []) h.status === "rejected" && u(h.reason);
      return a().catch(u);
    });
  };
function bN(e) {
  return (
    e instanceof Uint8Array ||
    (ArrayBuffer.isView(e) &&
      e.constructor.name === "Uint8Array" &&
      "BYTES_PER_ELEMENT" in e &&
      e.BYTES_PER_ELEMENT === 1)
  );
}
function Qh(e, a, r = "") {
  const i = bN(e),
    s = e?.length;
  if (!i || a !== void 0) {
    const c = r && `"${r}" `,
      h = "",
      p = i ? `length=${s}` : `type=${typeof e}`,
      m = c + "expected Uint8Array" + h + ", got " + p;
    throw i ? new RangeError(m) : new TypeError(m);
  }
  return e;
}
function Lb(e, a = !0) {
  if (e.destroyed) throw new Error("Hash instance has been destroyed");
  if (a && e.finished) throw new Error("Hash#digest() has already been called");
}
function _N(e, a) {
  Qh(e, void 0, "digestInto() output");
  const r = a.outputLen;
  if (e.length < r) throw new RangeError('"digestInto() output" expected to be of length >=' + r);
}
function uh(...e) {
  for (let a = 0; a < e.length; a++) e[a].fill(0);
}
function Bd(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function $a(e, a) {
  return (e << (32 - a)) | (e >>> a);
}
const SN =
    typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function",
  EN = Array.from({ length: 256 }, (e, a) => a.toString(16).padStart(2, "0"));
function Hu(e) {
  if ((Qh(e), SN)) return e.toHex();
  let a = "";
  for (let r = 0; r < e.length; r++) a += EN[e[r]];
  return a;
}
function wN(e, a = {}) {
  const r = (s, u) => e(u).update(s).digest(),
    i = e(void 0);
  return (
    (r.outputLen = i.outputLen),
    (r.blockLen = i.blockLen),
    (r.canXOF = i.canXOF),
    (r.create = (s) => e(s)),
    Object.assign(r, a),
    Object.freeze(r)
  );
}
const xN = (e) => ({ oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, e]) });
function RN(e, a, r) {
  return (e & a) ^ (~e & r);
}
function zN(e, a, r) {
  return (e & a) ^ (e & r) ^ (a & r);
}
class TN {
  blockLen;
  outputLen;
  canXOF = !1;
  padOffset;
  isLE;
  buffer;
  view;
  finished = !1;
  length = 0;
  pos = 0;
  destroyed = !1;
  constructor(a, r, i, s) {
    ((this.blockLen = a),
      (this.outputLen = r),
      (this.padOffset = i),
      (this.isLE = s),
      (this.buffer = new Uint8Array(a)),
      (this.view = Bd(this.buffer)));
  }
  update(a) {
    (Lb(this), Qh(a));
    const { view: r, buffer: i, blockLen: s } = this,
      u = a.length;
    for (let c = 0; c < u; ) {
      const h = Math.min(s - this.pos, u - c);
      if (h === s) {
        const p = Bd(a);
        for (; s <= u - c; c += s) this.process(p, c);
        continue;
      }
      (i.set(a.subarray(c, c + h), this.pos),
        (this.pos += h),
        (c += h),
        this.pos === s && (this.process(r, 0), (this.pos = 0)));
    }
    return ((this.length += a.length), this.roundClean(), this);
  }
  digestInto(a) {
    (Lb(this), _N(a, this), (this.finished = !0));
    const { buffer: r, view: i, blockLen: s, isLE: u } = this;
    let { pos: c } = this;
    ((r[c++] = 128),
      uh(this.buffer.subarray(c)),
      this.padOffset > s - c && (this.process(i, 0), (c = 0)));
    for (let v = c; v < s; v++) r[v] = 0;
    (i.setBigUint64(s - 8, BigInt(this.length * 8), u), this.process(i, 0));
    const h = Bd(a),
      p = this.outputLen;
    if (p % 4) throw new Error("_sha2: outputLen must be aligned to 32bit");
    const m = p / 4,
      y = this.get();
    if (m > y.length) throw new Error("_sha2: outputLen bigger than state");
    for (let v = 0; v < m; v++) h.setUint32(4 * v, y[v], u);
  }
  digest() {
    const { buffer: a, outputLen: r } = this;
    this.digestInto(a);
    const i = a.slice(0, r);
    return (this.destroy(), i);
  }
  _cloneInto(a) {
    ((a ||= new this.constructor()), a.set(...this.get()));
    const { blockLen: r, buffer: i, length: s, finished: u, destroyed: c, pos: h } = this;
    return (
      (a.destroyed = c), (a.finished = u), (a.length = s), (a.pos = h), s % r && a.buffer.set(i), a
    );
  }
  clone() {
    return this._cloneInto();
  }
}
const $r = Uint32Array.from([
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225,
  ]),
  AN = Uint32Array.from([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221,
    3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580,
    3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895,
    666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037,
    2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
    1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298,
  ]),
  Yr = new Uint32Array(64);
class ON extends TN {
  constructor(a) {
    super(64, a, 8, !1);
  }
  get() {
    const { A: a, B: r, C: i, D: s, E: u, F: c, G: h, H: p } = this;
    return [a, r, i, s, u, c, h, p];
  }
  set(a, r, i, s, u, c, h, p) {
    ((this.A = a | 0),
      (this.B = r | 0),
      (this.C = i | 0),
      (this.D = s | 0),
      (this.E = u | 0),
      (this.F = c | 0),
      (this.G = h | 0),
      (this.H = p | 0));
  }
  process(a, r) {
    for (let v = 0; v < 16; v++, r += 4) Yr[v] = a.getUint32(r, !1);
    for (let v = 16; v < 64; v++) {
      const S = Yr[v - 15],
        E = Yr[v - 2],
        w = $a(S, 7) ^ $a(S, 18) ^ (S >>> 3),
        z = $a(E, 17) ^ $a(E, 19) ^ (E >>> 10);
      Yr[v] = (z + Yr[v - 7] + w + Yr[v - 16]) | 0;
    }
    let { A: i, B: s, C: u, D: c, E: h, F: p, G: m, H: y } = this;
    for (let v = 0; v < 64; v++) {
      const S = $a(h, 6) ^ $a(h, 11) ^ $a(h, 25),
        E = (y + S + RN(h, p, m) + AN[v] + Yr[v]) | 0,
        z = (($a(i, 2) ^ $a(i, 13) ^ $a(i, 22)) + zN(i, s, u)) | 0;
      ((y = m), (m = p), (p = h), (h = (c + E) | 0), (c = u), (u = s), (s = i), (i = (E + z) | 0));
    }
    ((i = (i + this.A) | 0),
      (s = (s + this.B) | 0),
      (u = (u + this.C) | 0),
      (c = (c + this.D) | 0),
      (h = (h + this.E) | 0),
      (p = (p + this.F) | 0),
      (m = (m + this.G) | 0),
      (y = (y + this.H) | 0),
      this.set(i, s, u, c, h, p, m, y));
  }
  roundClean() {
    uh(Yr);
  }
  destroy() {
    ((this.destroyed = !0), this.set(0, 0, 0, 0, 0, 0, 0, 0), uh(this.buffer));
  }
}
class CN extends ON {
  A = $r[0] | 0;
  B = $r[1] | 0;
  C = $r[2] | 0;
  D = $r[3] | 0;
  E = $r[4] | 0;
  F = $r[5] | 0;
  G = $r[6] | 0;
  H = $r[7] | 0;
  constructor() {
    super(32);
  }
}
const Zu = wN(() => new CN(), xN(1)),
  DN = "ultron-anti-abuse-v1",
  MN = 13,
  NN = 2048,
  ch = new TextEncoder(),
  kN = Hu(Zu(new Uint8Array(0)));
function LN(e) {
  let a = 0;
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    if (i === 0) {
      a += 8;
      continue;
    }
    let s = 128;
    for (; s > 0 && (i & s) === 0; ) (a++, (s >>= 1));
    break;
  }
  return a;
}
function UN() {
  const e = new Uint8Array(16);
  return (crypto.getRandomValues(e), Hu(e));
}
function xS(e) {
  return e ? e.startsWith("application/json") || e.startsWith("text/") : !0;
}
async function jN(e) {
  for (let a = 0; ; ) {
    const r = a + NN;
    for (; a < r; a++) if (LN(Zu(ch.encode(e + a))) >= MN) return String(a);
    await new Promise((i) => setTimeout(i));
  }
}
async function RS(e, a, r, i) {
  const s = new URL(a, location.origin),
    u = String(Date.now()),
    c = UN(),
    h = r === null ? kN : Hu(Zu(ch.encode(r))),
    p = [e.toUpperCase(), s.pathname + s.search, h, u, c, navigator.userAgent, DN].join(`
`),
    m = Hu(Zu(ch.encode(p)));
  (i.set("X-Ts", u), i.set("X-Nonce", c), i.set("X-Sig", m), i.set("X-Proof", await jN(m)));
}
const VN = {
  async onRequest({ request: e }) {
    const a = xS(e.headers.get("content-type")) ? await e.clone().text() : null;
    return (await RS(e.method, e.url, a, e.headers), e);
  },
};
async function BN(e, a = {}) {
  const r = new Headers(a.headers),
    i = typeof a.body == "string" ? a.body : null,
    s = xS(r.get("content-type")) ? (i ?? "") : null;
  return (await RS(a.method ?? "GET", e, s, r), fetch(e, { ...a, headers: r }));
}
let Uo = null;
const fh = new Set(),
  zS = new Set(["captcha_required", "captcha_invalid"]);
function HN(e) {
  Uo = e;
}
function Co() {
  Uo = null;
}
function TS(e) {
  return (fh.add(e), () => fh.delete(e));
}
function ZN(e) {
  if (!e || typeof e != "object") return !1;
  const { errorCode: a } = e;
  return typeof a == "string" && zS.has(a);
}
function $N() {
  const [e, a] = _.useState("pending"),
    [r, i] = _.useState("");
  _.useEffect(
    () =>
      TS((v) => {
        (a("pending"), i(v === "invalid" ? "安全检查已失效，请重新完成检查" : ""));
      }),
    [],
  );
  const s = _.useCallback(() => {
      (a("solved"), i(""));
    }, []),
    u = _.useCallback(() => {
      (a("pending"), i(""));
    }, []),
    c = _.useCallback(() => {
      (Co(), a("error"));
    }, []),
    h = _.useCallback(() => (e === "solved" ? !0 : (i("请先完成安全检查"), !1)), [e]),
    p = _.useCallback(() => {
      (Co(), a("pending"), i(""));
    }, []),
    m = _.useCallback(() => {
      (a("pending"), i("安全检查已失效，请重新完成检查"));
    }, []),
    y = _.useCallback(() => {
      (Co(), a("pending"), i(""));
    }, []);
  return {
    status: e,
    formError: r,
    onSolve: s,
    onReset: u,
    onError: c,
    ensureSolved: h,
    clearAfterSuccess: p,
    markInvalid: m,
    discard: y,
  };
}
function Ub(e, a) {
  if (Uo === a) {
    Co();
    for (const r of fh)
      try {
        r(e);
      } catch (i) {
        console.error("Captcha reset listener failed", i);
      }
  }
}
async function YN(e) {
  try {
    const a = await e.clone().json();
    return typeof a.errorCode == "string" ? a.errorCode : void 0;
  } catch {
    return;
  }
}
const FN = {
    async onRequest({ request: e }) {
      return (Uo && e.headers.set("X-Captcha", Uo), e);
    },
    async onResponse({ request: e, response: a }) {
      const r = e.headers.get("X-Captcha");
      if (!r) return a;
      if (a.headers.get("X-Captcha-Consumed") === "1") Ub("consumed", r);
      else if (a.status === 428) {
        const i = await YN(a);
        i && zS.has(i) && Ub("invalid", r);
      }
      return a;
    },
  },
  AS = [
    "data-cap-i18n-initial-state",
    "data-cap-i18n-verifying-label",
    "data-cap-i18n-solved-label",
    "data-cap-i18n-error-label",
    "data-cap-i18n-group-aria-label",
    "data-cap-i18n-verify-aria-label",
    "data-cap-i18n-verifying-aria-label",
    "data-cap-i18n-verified-aria-label",
    "data-cap-i18n-error-aria-label",
    "data-cap-i18n-required-label",
  ],
  qN = AS.join(",");
function jb(e) {
  const a = e.dataset.state,
    r =
      a === "solved"
        ? "solved-label"
        : a === "verifying"
          ? "verifying-label"
          : a === "error"
            ? "error-label"
            : "initial-state",
    i = e.getAttribute(`data-cap-i18n-${r}`);
  if (i) {
    const c = e;
    if (typeof c.animateLabel == "function") c.animateLabel(i);
    else {
      const h = e.shadowRoot?.querySelector(".label.active");
      h && (h.textContent = i);
    }
  }
  const s =
      a === "solved"
        ? "verified-aria-label"
        : a === "verifying"
          ? "verifying-aria-label"
          : a === "error"
            ? "error-aria-label"
            : "verify-aria-label",
    u = e.getAttribute(`data-cap-i18n-${s}`);
  u && e.shadowRoot?.querySelector(".captcha-trigger")?.setAttribute("aria-label", u);
}
let bu = null;
function Vb() {
  return (
    bu ||
      ((window.CAP_CUSTOM_WASM_URL = "/captcha/cap_wasm_bg.wasm"),
      (window.CAP_PAKO_URL = "/captcha/pako_inflate.min.js"),
      (window.CAP_SILENT = !0),
      (window.CAP_CUSTOM_FETCH = (e, a) => BN(e instanceof Request ? e.url : String(e), a)),
      (bu = Ct(() => import("./cap-widget-fjxVM8lI.js"), []).catch((e) => {
        throw ((bu = null), e);
      }))),
    bu
  );
}
async function GN() {
  try {
    return await Vb();
  } catch {
    return (await new Promise((e) => window.setTimeout(e, 500)), Vb());
  }
}
function PN(e) {
  return {
    isCap: !1,
    code: "widget_load_failed",
    message: e instanceof Error ? e.message : "安全检查组件加载失败",
  };
}
function XN({
  className: e,
  size: a = "md",
  required: r = !1,
  onSolve: i,
  onReset: s,
  onError: u,
}) {
  const c = _.useRef(null);
  return (
    _.useEffect(() => {
      const h = c.current;
      if (!h) return;
      let p = !0;
      const m = (j) => {
          h.shadowRoot?.querySelector(".captcha-trigger")?.setAttribute("aria-disabled", String(j));
        },
        y = (j) => {
          (HN(j.detail.token), m(!0), (h.dataset.state = "solved"), i?.(j.detail.token));
        },
        v = (j) => {
          (m(!1),
            (h.dataset.state = "error"),
            j.detail.code === "instr_blocked" &&
              (h.shadowRoot?.querySelector(".cap-troubleshoot-link")?.remove(),
              h.shadowRoot?.querySelector(".captcha")?.classList.remove("has-troubleshoot")),
            u?.(j.detail));
        },
        S = (j) => {
          (Co(),
            h.shadowRoot
              ?.querySelector(".captcha-trigger")
              ?.setAttribute(
                "aria-label",
                h.getAttribute("data-cap-i18n-verify-aria-label") ?? "点击开始安全检查",
              ),
            m(!1),
            delete h.dataset.state,
            s?.());
        },
        E = (j) => {
          ((h.dataset.progress = String(j.detail.progress)),
            (h.dataset.state = "verifying"),
            m(!0));
        };
      (h.addEventListener("solve", y),
        h.addEventListener("error", v),
        h.addEventListener("reset", S),
        h.addEventListener("progress", E));
      let w = 0;
      const z = new MutationObserver(() => {
        (w && cancelAnimationFrame(w),
          (w = requestAnimationFrame(() => {
            ((w = 0), p && jb(h));
          })));
      });
      z.observe(h, { attributes: !0, attributeFilter: [...AS] });
      const R = TS(() => {
        if (typeof h.reset == "function") {
          h.reset();
          return;
        }
        customElements.whenDefined("cap-widget").then(() => {
          p && h.reset();
        });
      });
      return (
        GN()
          .then(() => {
            p && (m(!1), jb(h));
          })
          .catch((j) => {
            p && u?.(PN(j));
          }),
        () => {
          ((p = !1),
            w && cancelAnimationFrame(w),
            z.disconnect(),
            R(),
            h.removeEventListener("solve", y),
            h.removeEventListener("error", v),
            h.removeEventListener("reset", S),
            h.removeEventListener("progress", E));
        }
      );
    }, [u, s, i]),
    ee.jsx("cap-widget", {
      ref: c,
      className: Pt("cap-widget", e),
      "data-size": a,
      "data-cap-api-endpoint": "/_api/captcha/",
      "data-cap-lang": "zh-cn",
      "data-cap-i18n-initial-state": "请确认您是真实访客",
      "data-cap-i18n-verifying-label": "正在检查…",
      "data-cap-i18n-solved-label": "已通过安全检查",
      "data-cap-i18n-error-label": "检查失败，请重试",
      "data-cap-i18n-group-aria-label": "安全检查",
      "data-cap-i18n-verify-aria-label": "点击开始安全检查",
      "data-cap-i18n-verifying-aria-label": "正在进行安全检查，请稍候",
      "data-cap-i18n-verified-aria-label": "安全检查已通过，您可以继续",
      "data-cap-i18n-error-aria-label": "检查失败，请重试",
      "data-cap-i18n-required-label": "请先完成安全检查",
      "data-ut-i18n-attrs": qN,
      required: r,
    })
  );
}
function IN({ gate: e, className: a }) {
  return ee.jsxs("div", {
    className: Pt("space-y-2", a),
    children: [
      ee.jsx(XN, { required: !0, onSolve: e.onSolve, onReset: e.onReset, onError: e.onError }),
      e.formError
        ? ee.jsx("p", {
            role: "alert",
            className: "text-destructive text-sm",
            children: e.formError,
          })
        : null,
    ],
  });
}
const QN = /\{[^{}]+\}/g,
  KN = () =>
    typeof process == "object" &&
    Number.parseInt(process?.versions?.node?.substring(0, 2)) >= 18 &&
    process.versions.undici;
function JN() {
  return Math.random().toString(36).slice(2, 11);
}
function WN(e) {
  let {
    baseUrl: a = "",
    Request: r = globalThis.Request,
    fetch: i = globalThis.fetch,
    querySerializer: s,
    bodySerializer: u,
    pathSerializer: c,
    headers: h,
    requestInitExt: p = void 0,
    ...m
  } = { ...e };
  ((p = KN() ? p : void 0), (a = Zb(a)));
  const y = [];
  async function v(S, E) {
    const {
      baseUrl: w,
      fetch: z = i,
      Request: R = r,
      headers: j,
      params: k = {},
      parseAs: F = "json",
      querySerializer: $,
      bodySerializer: G = u ?? t4,
      pathSerializer: he,
      body: ce,
      middleware: T = [],
      ...me
    } = E || {};
    let Oe = a;
    w && (Oe = Zb(w) ?? a);
    let Be = typeof s == "function" ? s : Bb(s);
    $ && (Be = typeof $ == "function" ? $ : Bb({ ...(typeof s == "object" ? s : {}), ...$ }));
    const fe = he || c || e4,
      be = ce === void 0 ? void 0 : G(ce, Hb(h, j, k.header)),
      ze = Hb(
        be === void 0 || be instanceof FormData ? {} : { "Content-Type": "application/json" },
        h,
        j,
        k.header,
      ),
      xe = [...y, ...T],
      D = { redirect: "follow", ...m, ...me, body: be, headers: ze };
    let X,
      pe,
      ge = new R(n4(S, { baseUrl: Oe, params: k, querySerializer: Be, pathSerializer: fe }), D),
      Q;
    for (const q in me) q in ge || (ge[q] = me[q]);
    if (xe.length) {
      ((X = JN()),
        (pe = Object.freeze({
          baseUrl: Oe,
          fetch: z,
          parseAs: F,
          querySerializer: Be,
          bodySerializer: G,
          pathSerializer: fe,
        })));
      for (const q of xe)
        if (q && typeof q == "object" && typeof q.onRequest == "function") {
          const J = await q.onRequest({
            request: ge,
            schemaPath: S,
            params: k,
            options: pe,
            id: X,
          });
          if (J)
            if (J instanceof R) ge = J;
            else if (J instanceof Response) {
              Q = J;
              break;
            } else
              throw new Error(
                "onRequest: must return new Request() or Response() when modifying the request",
              );
        }
    }
    if (!Q) {
      try {
        Q = await z(ge, p);
      } catch (q) {
        let J = q;
        if (xe.length)
          for (let ie = xe.length - 1; ie >= 0; ie--) {
            const ve = xe[ie];
            if (ve && typeof ve == "object" && typeof ve.onError == "function") {
              const Me = await ve.onError({
                request: ge,
                error: J,
                schemaPath: S,
                params: k,
                options: pe,
                id: X,
              });
              if (Me) {
                if (Me instanceof Response) {
                  ((J = void 0), (Q = Me));
                  break;
                }
                if (Me instanceof Error) {
                  J = Me;
                  continue;
                }
                throw new Error("onError: must return new Response() or instance of Error");
              }
            }
          }
        if (J) throw J;
      }
      if (xe.length)
        for (let q = xe.length - 1; q >= 0; q--) {
          const J = xe[q];
          if (J && typeof J == "object" && typeof J.onResponse == "function") {
            const ie = await J.onResponse({
              request: ge,
              response: Q,
              schemaPath: S,
              params: k,
              options: pe,
              id: X,
            });
            if (ie) {
              if (!(ie instanceof Response))
                throw new Error(
                  "onResponse: must return new Response() when modifying the response",
                );
              Q = ie;
            }
          }
        }
    }
    const O = Q.headers.get("Content-Length");
    if (
      Q.status === 204 ||
      ge.method === "HEAD" ||
      (O === "0" && !Q.headers.get("Transfer-Encoding")?.includes("chunked"))
    )
      return Q.ok ? { data: void 0, response: Q } : { error: void 0, response: Q };
    if (Q.ok)
      return {
        data: await (async () => {
          if (F === "stream") return Q.body;
          if (F === "json" && !O) {
            const J = await Q.text();
            return J ? JSON.parse(J) : void 0;
          }
          return await Q[F]();
        })(),
        response: Q,
      };
    let I = await Q.text();
    try {
      I = JSON.parse(I);
    } catch {}
    return { error: I, response: Q };
  }
  return {
    request(S, E, w) {
      return v(E, { ...w, method: S.toUpperCase() });
    },
    GET(S, E) {
      return v(S, { ...E, method: "GET" });
    },
    PUT(S, E) {
      return v(S, { ...E, method: "PUT" });
    },
    POST(S, E) {
      return v(S, { ...E, method: "POST" });
    },
    DELETE(S, E) {
      return v(S, { ...E, method: "DELETE" });
    },
    OPTIONS(S, E) {
      return v(S, { ...E, method: "OPTIONS" });
    },
    HEAD(S, E) {
      return v(S, { ...E, method: "HEAD" });
    },
    PATCH(S, E) {
      return v(S, { ...E, method: "PATCH" });
    },
    TRACE(S, E) {
      return v(S, { ...E, method: "TRACE" });
    },
    use(...S) {
      for (const E of S)
        if (E) {
          if (typeof E != "object" || !("onRequest" in E || "onResponse" in E || "onError" in E))
            throw new Error(
              "Middleware must be an object with one of `onRequest()`, `onResponse() or `onError()`",
            );
          y.push(E);
        }
    },
    eject(...S) {
      for (const E of S) {
        const w = y.indexOf(E);
        w !== -1 && y.splice(w, 1);
      }
    },
  };
}
function ic(e, a, r) {
  if (a == null) return "";
  if (typeof a == "object")
    throw new Error(
      "Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.",
    );
  return `${e}=${r?.allowReserved === !0 ? a : encodeURIComponent(a)}`;
}
function OS(e, a, r) {
  if (!a || typeof a != "object") return "";
  const i = [],
    s = { simple: ",", label: ".", matrix: ";" }[r.style] || "&";
  if (r.style !== "deepObject" && r.explode === !1) {
    for (const h in a) i.push(h, r.allowReserved === !0 ? a[h] : encodeURIComponent(a[h]));
    const c = i.join(",");
    switch (r.style) {
      case "form":
        return `${e}=${c}`;
      case "label":
        return `.${c}`;
      case "matrix":
        return `;${e}=${c}`;
      default:
        return c;
    }
  }
  for (const c in a) {
    const h = r.style === "deepObject" ? `${e}[${c}]` : c;
    i.push(ic(h, a[c], r));
  }
  const u = i.join(s);
  return r.style === "label" || r.style === "matrix" ? `${s}${u}` : u;
}
function CS(e, a, r) {
  if (!Array.isArray(a)) return "";
  if (r.explode === !1) {
    const u = { form: ",", spaceDelimited: "%20", pipeDelimited: "|" }[r.style] || ",",
      c = (r.allowReserved === !0 ? a : a.map((h) => encodeURIComponent(h))).join(u);
    switch (r.style) {
      case "simple":
        return c;
      case "label":
        return `.${c}`;
      case "matrix":
        return `;${e}=${c}`;
      default:
        return `${e}=${c}`;
    }
  }
  const i = { simple: ",", label: ".", matrix: ";" }[r.style] || "&",
    s = [];
  for (const u of a)
    r.style === "simple" || r.style === "label"
      ? s.push(r.allowReserved === !0 ? u : encodeURIComponent(u))
      : s.push(ic(e, u, r));
  return r.style === "label" || r.style === "matrix" ? `${i}${s.join(i)}` : s.join(i);
}
function Bb(e) {
  return function (r) {
    const i = [];
    if (r && typeof r == "object")
      for (const s in r) {
        const u = r[s];
        if (u != null) {
          if (Array.isArray(u)) {
            if (u.length === 0) continue;
            i.push(
              CS(s, u, {
                style: "form",
                explode: !0,
                ...e?.array,
                allowReserved: e?.allowReserved || !1,
              }),
            );
            continue;
          }
          if (typeof u == "object") {
            i.push(
              OS(s, u, {
                style: "deepObject",
                explode: !0,
                ...e?.object,
                allowReserved: e?.allowReserved || !1,
              }),
            );
            continue;
          }
          i.push(ic(s, u, e));
        }
      }
    return i.join("&");
  };
}
function e4(e, a) {
  let r = e;
  for (const i of e.match(QN) ?? []) {
    let s = i.substring(1, i.length - 1),
      u = !1,
      c = "simple";
    if (
      (s.endsWith("*") && ((u = !0), (s = s.substring(0, s.length - 1))),
      s.startsWith(".")
        ? ((c = "label"), (s = s.substring(1)))
        : s.startsWith(";") && ((c = "matrix"), (s = s.substring(1))),
      !a || a[s] === void 0 || a[s] === null)
    )
      continue;
    const h = a[s];
    if (Array.isArray(h)) {
      r = r.replace(i, CS(s, h, { style: c, explode: u }));
      continue;
    }
    if (typeof h == "object") {
      r = r.replace(i, OS(s, h, { style: c, explode: u }));
      continue;
    }
    if (c === "matrix") {
      r = r.replace(i, `;${ic(s, h)}`);
      continue;
    }
    r = r.replace(i, c === "label" ? `.${encodeURIComponent(h)}` : encodeURIComponent(h));
  }
  return r;
}
function t4(e, a) {
  return e instanceof FormData
    ? e
    : a &&
        (a.get instanceof Function
          ? (a.get("Content-Type") ?? a.get("content-type"))
          : (a["Content-Type"] ?? a["content-type"])) === "application/x-www-form-urlencoded"
      ? new URLSearchParams(e).toString()
      : JSON.stringify(e);
}
function n4(e, a) {
  let r = `${a.baseUrl}${e}`;
  a.params?.path && (r = a.pathSerializer(r, a.params.path));
  let i = a.querySerializer(a.params.query ?? {});
  return (i.startsWith("?") && (i = i.substring(1)), i && (r += `?${i}`), r);
}
function Hb(...e) {
  const a = new Headers();
  for (const r of e) {
    if (!r || typeof r != "object") continue;
    const i = r instanceof Headers ? r.entries() : Object.entries(r);
    for (const [s, u] of i)
      if (u === null) a.delete(s);
      else if (Array.isArray(u)) for (const c of u) a.append(s, c);
      else u !== void 0 && a.set(s, u);
  }
  return a;
}
function Zb(e) {
  return e.endsWith("/") ? e.substring(0, e.length - 1) : e;
}
const $b = (e) => {
    let a;
    const r = new Set(),
      i = (m, y) => {
        const v = typeof m == "function" ? m(a) : m;
        if (!Object.is(v, a)) {
          const S = a;
          ((a = (y ?? (typeof v != "object" || v === null)) ? v : Object.assign({}, a, v)),
            r.forEach((E) => E(a, S)));
        }
      },
      s = () => a,
      h = {
        setState: i,
        getState: s,
        getInitialState: () => p,
        subscribe: (m) => (r.add(m), () => r.delete(m)),
      },
      p = (a = e(i, s, h));
    return h;
  },
  a4 = (e) => (e ? $b(e) : $b),
  r4 = (e) => e;
function l4(e, a = r4) {
  const r = K.useSyncExternalStore(
    e.subscribe,
    K.useCallback(() => a(e.getState()), [e, a]),
    K.useCallback(() => a(e.getInitialState()), [e, a]),
  );
  return (K.useDebugValue(r), r);
}
const Yb = (e) => {
    const a = a4(e),
      r = (i) => l4(a, i);
    return (Object.assign(r, a), r);
  },
  DS = (e) => (e ? Yb(e) : Yb),
  dh = DS((e) => ({ expired: !1, setExpired: (a) => e({ expired: a }) })),
  Kh = "admin_token",
  MS = () => localStorage.getItem(Kh),
  i4 = (e) => localStorage.setItem(Kh, e),
  NS = () => localStorage.removeItem(Kh),
  o4 = new Set(["admin_unauthorized", "admin_token_expired"]),
  s4 = "ultron:admin-session-expired";
async function u4(e) {
  try {
    return (await e.clone().json()).errorCode;
  } catch {
    return;
  }
}
function c4() {
  return window.parent === window
    ? !1
    : (window.parent.postMessage(
        { type: s4, redirectPath: `${location.pathname}${location.search}` },
        "*",
      ),
      !0);
}
const f4 = {
    async onRequest({ request: e }) {
      const a = MS();
      return (a && e.headers.set("Authorization", `Bearer ${a}`), e);
    },
    async onResponse({ response: e }) {
      if (e.status === 401) {
        const a = await u4(e);
        if (a && o4.has(a)) {
          if ((NS(), location.pathname.endsWith("/sign-in") || c4())) return e;
          dh.getState().setExpired(!0);
        }
      }
      return e;
    },
  },
  oc = WN({ baseUrl: "/_api" });
oc.use(f4);
oc.use(VN);
oc.use(FN);
const Fb = 200;
function _u(e) {
  const a = e
    .split(
      `
`,
      1,
    )[0]
    .trim();
  return a.length > Fb ? `${a.slice(0, Fb)}…` : a;
}
function d4(e) {
  if (!(!e || typeof e != "object")) {
    for (const a of Object.values(e))
      if (Array.isArray(a) && typeof a[0] == "string" && a[0]) return a[0];
  }
}
function h4(e, a) {
  if (e && typeof e == "object") {
    const r = e;
    if (typeof r.detail == "string" && r.detail) return _u(r.detail);
    const i = d4(r.errors);
    if (i) return _u(i);
    if (typeof r.title == "string" && r.title) return _u(r.title);
  }
  return e instanceof Error && e.message ? _u(e.message) : a;
}
function m4(e, a) {
  const r = h4(e, a);
  return (vz.error(r), r);
}
const p4 = DS((e, a) => ({
    accessToken: MS() ?? "",
    setAccessToken: (r) => {
      (i4(r), e({ accessToken: r }));
    },
    reset: () => {
      (NS(), e({ accessToken: "" }));
    },
    isAuthenticated: () => !!a().accessToken,
  })),
  qb = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  Gb = Y0,
  v4 = (e, a) => (r) => {
    var i;
    if (a?.variants == null) return Gb(e, r?.class, r?.className);
    const { variants: s, defaultVariants: u } = a,
      c = Object.keys(s).map((m) => {
        const y = r?.[m],
          v = u?.[m];
        if (y === null) return null;
        const S = qb(y) || qb(v);
        return s[m][S];
      }),
      h =
        r &&
        Object.entries(r).reduce((m, y) => {
          let [v, S] = y;
          return (S === void 0 || (m[v] = S), m);
        }, {}),
      p =
        a == null || (i = a.compoundVariants) === null || i === void 0
          ? void 0
          : i.reduce((m, y) => {
              let { class: v, className: S, ...E } = y;
              return Object.entries(E).every((w) => {
                let [z, R] = w;
                return Array.isArray(R) ? R.includes({ ...u, ...h }[z]) : { ...u, ...h }[z] === R;
              })
                ? [...m, v, S]
                : m;
            }, []);
    return Gb(e, c, p, r?.class, r?.className);
  },
  g4 = v4(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
          outline: "border border-current/30 bg-transparent text-current hover:bg-current/10",
          inverseOutline:
            "border border-current/30 bg-transparent text-current hover:bg-current/10",
          secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-9 px-4 py-2 has-[>svg]:px-3",
          sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
          lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
          icon: "size-9",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  );
function hh({ className: e, variant: a, size: r, asChild: i = !1, ...s }) {
  const u = i ? i_ : "button";
  return ee.jsx(u, { "data-slot": "button", className: Pt(g4({ variant: a, size: r }), e), ...s });
}
function Pb({ className: e, type: a, ...r }) {
  return ee.jsx("input", {
    type: a,
    "data-slot": "input",
    className: Pt(
      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      e,
    ),
    ...r,
  });
}
var y4 = "Label",
  kS = _.forwardRef((e, a) =>
    ee.jsx(ra.label, {
      ...e,
      ref: a,
      onMouseDown: (r) => {
        r.target.closest("button, input, select, textarea") ||
          (e.onMouseDown?.(r), !r.defaultPrevented && r.detail > 1 && r.preventDefault());
      },
    }),
  );
kS.displayName = y4;
var b4 = kS;
function _4({ className: e, ...a }) {
  return ee.jsx(b4, {
    "data-slot": "label",
    className: Pt(
      "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      e,
    ),
    ...a,
  });
}
const S4 = JM,
  LS = _.createContext({}),
  Xb = ({ ...e }) =>
    ee.jsx(LS.Provider, { value: { name: e.name }, children: ee.jsx(QM, { ...e }) }),
  sc = () => {
    const e = _.useContext(LS),
      a = _.useContext(US),
      { getFieldState: r } = KM(),
      i = pS({ name: e.name }),
      s = r(e.name, i);
    if (!e) throw new Error("useFormField should be used within <FormField>");
    const { id: u } = a;
    return {
      id: u,
      name: e.name,
      formItemId: `${u}-form-item`,
      formDescriptionId: `${u}-form-item-description`,
      formMessageId: `${u}-form-item-message`,
      ...s,
    };
  },
  US = _.createContext({});
function Ib({ className: e, ...a }) {
  const r = _.useId();
  return ee.jsx(US.Provider, {
    value: { id: r },
    children: ee.jsx("div", { "data-slot": "form-item", className: Pt("grid gap-2", e), ...a }),
  });
}
function Qb({ className: e, ...a }) {
  const { error: r, formItemId: i } = sc();
  return ee.jsx(_4, {
    "data-slot": "form-label",
    "data-error": !!r,
    className: Pt("data-[error=true]:text-destructive", e),
    htmlFor: i,
    ...a,
  });
}
function Kb({ ...e }) {
  const { error: a, formItemId: r, formDescriptionId: i, formMessageId: s } = sc();
  return ee.jsx(i_, {
    "data-slot": "form-control",
    id: r,
    "aria-describedby": a ? `${i} ${s}` : `${i}`,
    "aria-invalid": !!a,
    ...e,
  });
}
function s3({ className: e, ...a }) {
  const { formDescriptionId: r } = sc();
  return ee.jsx("p", {
    "data-slot": "form-description",
    id: r,
    className: Pt("text-muted-foreground text-sm", e),
    ...a,
  });
}
function Jb({ className: e, ...a }) {
  const { error: r, formMessageId: i } = sc(),
    s = r ? String(r?.message ?? "") : a.children;
  return s
    ? ee.jsx("p", {
        "data-slot": "form-message",
        id: i,
        className: Pt("text-destructive text-sm", e),
        ...a,
        children: s,
      })
    : null;
}
const E4 = SM({ username: db().min(1, "请输入用户名"), password: db().min(1, "请输入密码") });
function w4({ onSuccess: e }) {
  const [a, r] = _.useState(!1),
    i = $N(),
    s = Ho(),
    u = p4((m) => m.setAccessToken),
    c = dN({ resolver: vN(E4), defaultValues: { username: "", password: "" } });
  async function h(m) {
    if (!i.ensureSolved()) return;
    r(!0);
    const { data: y, error: v } = await oc.POST("/admin/login", { body: m });
    if ((r(!1), v || !y)) {
      ZN(v) ? i.markInvalid() : m4(v, "用户名或密码错误");
      return;
    }
    (i.clearAfterSuccess(), u(y.token), e ? e() : s("/dashboard/articles", { replace: !0 }));
  }
  const p = a ? "登录中…" : "登录";
  return ee.jsx(S4, {
    ...c,
    children: ee.jsxs("form", {
      onSubmit: c.handleSubmit(h),
      className: "grid gap-4",
      children: [
        ee.jsx(Xb, {
          control: c.control,
          name: "username",
          render: ({ field: m }) =>
            ee.jsxs(Ib, {
              children: [
                ee.jsx(Qb, { children: "用户名" }),
                ee.jsx(Kb, {
                  children: ee.jsx(Pb, {
                    placeholder: "请输入用户名",
                    autoComplete: "username",
                    ...m,
                  }),
                }),
                ee.jsx(Jb, {}),
              ],
            }),
        }),
        ee.jsx(Xb, {
          control: c.control,
          name: "password",
          render: ({ field: m }) =>
            ee.jsxs(Ib, {
              children: [
                ee.jsx(Qb, { children: "密码" }),
                ee.jsx(Kb, {
                  children: ee.jsx(Pb, {
                    type: "password",
                    placeholder: "********",
                    autoComplete: "current-password",
                    ...m,
                  }),
                }),
                ee.jsx(Jb, {}),
              ],
            }),
        }),
        ee.jsx(IN, { gate: i }),
        ee.jsx(hh, {
          type: "submit",
          className: "w-full cursor-pointer",
          disabled: a || i.status !== "solved",
          children: p,
        }),
      ],
    }),
  });
}
function x4() {
  const e = dh((r) => r.expired),
    a = dh((r) => r.setExpired);
  return ee.jsx(J2, {
    open: e,
    children: ee.jsxs(tA, {
      showCloseButton: !1,
      onInteractOutside: (r) => r.preventDefault(),
      onEscapeKeyDown: (r) => r.preventDefault(),
      className: "sm:max-w-sm",
      children: [
        ee.jsxs(nA, {
          children: [
            ee.jsx(aA, { children: "登录已过期" }),
            ee.jsx(rA, { children: "登录状态已失效，请重新登录以继续操作。" }),
          ],
        }),
        ee.jsx(w4, { onSuccess: () => a(!1) }),
      ],
    }),
  });
}
const Hd = { name: "FENCHEM 泛成" };
let jS;
function R4(e) {
  const a = e?.trim();
  return !a || a === Hd.name ? Hd.name : `${a} - ${Hd.name}`;
}
function z4() {
  document.title = R4(jS);
}
function T4(e) {
  ((jS = e?.trim() || void 0), z4());
}
function A4() {
  const e = zh();
  return (
    _.useEffect(() => {
      const a = e
        .map((r) => r.handle?.title)
        .filter((r) => !!r)
        .at(-1);
      T4(a);
    }, [e]),
    ee.jsxs(ee.Fragment, {
      children: [ee.jsx(B0, {}), ee.jsx(Yx, {}), ee.jsx(x4, {}), ee.jsx(bT, {})],
    })
  );
}
var uc = "Collapsible",
  [O4] = r_(uc),
  [C4, Jh] = O4(uc),
  VS = _.forwardRef((e, a) => {
    const {
        __scopeCollapsible: r,
        open: i,
        defaultOpen: s,
        disabled: u,
        onOpenChange: c,
        ...h
      } = e,
      [p, m] = l_({ prop: i, defaultProp: s ?? !1, onChange: c, caller: uc });
    return ee.jsx(C4, {
      scope: r,
      disabled: u,
      contentId: zu(),
      open: p,
      onOpenToggle: _.useCallback(() => m((y) => !y), [m]),
      children: ee.jsx(ra.div, {
        "data-state": em(p),
        "data-disabled": u ? "" : void 0,
        ...h,
        ref: a,
      }),
    });
  });
VS.displayName = uc;
var BS = "CollapsibleTrigger",
  HS = _.forwardRef((e, a) => {
    const { __scopeCollapsible: r, ...i } = e,
      s = Jh(BS, r);
    return ee.jsx(ra.button, {
      type: "button",
      "aria-controls": s.open ? s.contentId : void 0,
      "aria-expanded": s.open || !1,
      "data-state": em(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      disabled: s.disabled,
      ...i,
      ref: a,
      onClick: pr(e.onClick, s.onOpenToggle),
    });
  });
HS.displayName = BS;
var Wh = "CollapsibleContent",
  ZS = _.forwardRef((e, a) => {
    const { forceMount: r, ...i } = e,
      s = Jh(Wh, e.__scopeCollapsible);
    return ee.jsx($o, {
      present: r || s.open,
      children: ({ present: u }) => ee.jsx(D4, { ...i, ref: a, present: u }),
    });
  });
ZS.displayName = Wh;
var D4 = _.forwardRef((e, a) => {
  const { __scopeCollapsible: r, present: i, children: s, ...u } = e,
    c = Jh(Wh, r),
    [h, p] = _.useState(i),
    m = _.useRef(null),
    y = Qr(a, m),
    v = _.useRef(0),
    S = v.current,
    E = _.useRef(0),
    w = E.current,
    z = c.open || h,
    R = _.useRef(z),
    j = _.useRef(void 0);
  return (
    _.useEffect(() => {
      const k = requestAnimationFrame(() => (R.current = !1));
      return () => cancelAnimationFrame(k);
    }, []),
    wi(() => {
      const k = m.current;
      if (k) {
        ((j.current = j.current || {
          transitionDuration: k.style.transitionDuration,
          animationName: k.style.animationName,
        }),
          (k.style.transitionDuration = "0s"),
          (k.style.animationName = "none"));
        const F = k.getBoundingClientRect();
        ((v.current = F.height),
          (E.current = F.width),
          R.current ||
            ((k.style.transitionDuration = j.current.transitionDuration),
            (k.style.animationName = j.current.animationName)),
          p(i));
      }
    }, [c.open, i]),
    ee.jsx(ra.div, {
      "data-state": em(c.open),
      "data-disabled": c.disabled ? "" : void 0,
      id: c.contentId,
      hidden: !z,
      ...u,
      ref: y,
      style: {
        "--radix-collapsible-content-height": S ? `${S}px` : void 0,
        "--radix-collapsible-content-width": w ? `${w}px` : void 0,
        ...e.style,
      },
      children: z && s,
    })
  );
});
function em(e) {
  return e ? "open" : "closed";
}
var M4 = VS;
function N4({ ...e }) {
  return ee.jsx(M4, { "data-slot": "collapsible", ...e });
}
function k4({ ...e }) {
  return ee.jsx(HS, { "data-slot": "collapsible-trigger", ...e });
}
function L4({ ...e }) {
  return ee.jsx(ZS, { "data-slot": "collapsible-content", ...e });
}
function U4(e) {
  return Ei(e)
    ? {
        kind: "route",
        message:
          typeof e.data == "string" && e.data.trim() ? e.data : e.statusText || `HTTP ${e.status}`,
        status: e.status,
        statusText: e.statusText,
      }
    : e instanceof Error
      ? {
          kind: j4(e.message) ? "chunkLoad" : "route",
          message: e.message || e.name,
          stack: e.stack,
        }
      : { kind: "route", message: String(e) };
}
function j4(e) {
  return (
    e.includes("Failed to fetch dynamically imported module") ||
    e.includes("Importing a module script failed")
  );
}
function V4() {
  const e = L0(),
    a = Ho(),
    { pathname: r } = Zn(),
    i = U4(e);
  return ee.jsx(B4, { parsed: i, onHome: () => a("/") });
}
function B4({ parsed: e, onHome: a }) {
  const [r, i] = _.useState(!1);
  return ee.jsx("div", {
    className:
      "mx-auto flex min-h-dvh flex-col items-center justify-center gap-8 p-8 md:gap-12 md:p-16",
    children: ee.jsxs("div", {
      className: "w-full max-w-xl text-center",
      children: [
        ee.jsx("h2", { className: "mb-3 text-2xl font-semibold", children: "页面出了点问题" }),
        ee.jsx("p", {
          className: "text-muted-foreground",
          children: "抱歉给您带来不便。你可以刷新后再试，或先回到首页继续浏览。",
        }),
        ee.jsxs("div", {
          className: "mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8",
          children: [
            ee.jsx(hh, {
              className: "cursor-pointer",
              onClick: () => window.location.reload(),
              children: "刷新重试",
            }),
            ee.jsx(hh, {
              variant: "outline",
              className: "cursor-pointer",
              onClick: a,
              children: "返回首页",
            }),
          ],
        }),
        ee.jsxs(N4, {
          open: r,
          onOpenChange: i,
          className: "mt-8 text-left",
          children: [
            ee.jsx(k4, {
              asChild: !0,
              children: ee.jsxs("button", {
                type: "button",
                className:
                  "text-muted-foreground hover:text-foreground mx-auto flex cursor-pointer items-center gap-1 text-sm",
                children: [
                  ee.jsx(ZR, { className: Pt("size-4 transition-transform", r && "rotate-180") }),
                  "查看技术详情",
                ],
              }),
            }),
            ee.jsx(L4, {
              children: ee.jsx("pre", {
                className:
                  "mt-3 max-h-48 overflow-auto rounded-lg border bg-muted/40 p-4 text-xs break-all whitespace-pre-wrap",
                children: e.message,
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
function H4({ className: e, size: a = "md" }) {
  const r = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
  return ee.jsx("div", {
    className: "flex items-center justify-center min-h-[200px]",
    children: ee.jsx("div", {
      className: Pt("animate-spin rounded-full border-b-2 border-primary", r[a], e),
    }),
  });
}
const nn = (e) => async () => ({ Component: (await e()).default }),
  Zd = (e, a) => async () => ({ Component: (await e())[a] }),
  Z4 = [
    {
      path: "articles",
      lazy: nn(() =>
        Ct(
          () => import("./admin-articles-page-Cl2VzOax.js"),
          __vite__mapDeps([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
          ]),
        ),
      ),
      handle: { title: "文章管理" },
    },
  ],
  $4 = [
    {
      path: "products",
      lazy: nn(() =>
        Ct(
          () => import("./admin-products-page-CxGSI2Nv.js"),
          __vite__mapDeps([
            23, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 22, 25,
            26,
          ]),
        ),
      ),
      handle: { title: "产品管理" },
    },
  ],
  Y4 = [
    {
      path: "orders",
      lazy: nn(() =>
        Ct(
          () => import("./admin-orders-page-B03feuA4.js"),
          __vite__mapDeps([27, 25, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 21, 13, 14, 15, 28, 22, 18]),
        ),
      ),
      handle: { title: "订单管理" },
    },
    {
      path: "orders/:id",
      lazy: nn(() =>
        Ct(
          () => import("./admin-order-detail-page-DVwDE6aC.js"),
          __vite__mapDeps([29, 3, 4, 5, 6, 7, 8, 28, 22, 18, 14, 15, 9, 24, 25, 30, 11, 17]),
        ),
      ),
      handle: { title: "订单详情" },
    },
  ],
  F4 = [
    {
      path: "members",
      lazy: nn(() =>
        Ct(
          () => import("./admin-members-page-DWRpK1vz.js"),
          __vite__mapDeps([31, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 21, 13, 14, 15]),
        ),
      ),
      handle: { title: "会员管理" },
    },
  ],
  q4 = [
    {
      path: "reviews",
      lazy: nn(() =>
        Ct(
          () => import("./admin-reviews-page-C67s4dcT.js"),
          __vite__mapDeps([32, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 21, 13, 14, 15, 16, 26, 22, 18]),
        ),
      ),
      handle: { title: "评价管理" },
    },
  ],
  G4 = [
    {
      path: "form-submissions",
      lazy: nn(() =>
        Ct(
          () => import("./admin-form-submissions-page-C6b3TroK.js"),
          __vite__mapDeps([33, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 21, 16, 15, 22]),
        ),
      ),
      handle: { title: "留言信息" },
    },
  ],
  P4 = [
    {
      path: "/",
      lazy: Zd(
        () =>
          Ct(
            () => import("./public-layout-DOtA4w_f.js"),
            __vite__mapDeps([34, 5, 6, 7, 9, 10, 35, 22]),
          ),
        "PublicLayout",
      ),
      children: [
        {
          index: !0,
          lazy: nn(() => Ct(() => import("./home-page-sr417Htn.js"), __vite__mapDeps([36, 37]))),
          handle: { seo: !0, title: "首页" },
        },
      ],
    },
    {
      path: "/dashboard",
      lazy: Zd(
        () =>
          Ct(
            () => import("./admin-layout-D3WjUxhk.js").then((e) => e.d),
            __vite__mapDeps([3, 4, 5, 6, 7, 8]),
          ),
        "AdminLayout",
      ),
      handle: { seoExempt: !0 },
      children: [
        { index: !0, element: ee.jsx($x, { to: "/dashboard/articles", replace: !0 }) },
        ...Z4,
        ...$4,
        ...Y4,
        ...F4,
        ...q4,
        ...G4,
        {
          path: "api-docs",
          lazy: nn(() =>
            Ct(
              () => import("./admin-api-docs-page-DrqpkLrD.js"),
              __vite__mapDeps([38, 3, 4, 5, 6, 7, 8]),
            ),
          ),
          handle: { title: "API 文档" },
        },
        {
          path: "platform/:capabilityId",
          lazy: Zd(
            () => Ct(() => import("./platform-embed-page-CUDD_SCF.js"), __vite__mapDeps([39, 19])),
            "PlatformEmbedPage",
          ),
          handle: { title: "平台能力" },
        },
      ],
    },
    {
      path: "/auth",
      handle: { seoExempt: !0 },
      children: [
        {
          path: "sign-in",
          lazy: nn(() => Ct(() => import("./page-BsICXRkc.js"), __vite__mapDeps([40, 4, 30]))),
          handle: { title: "管理后台登录" },
        },
        {
          path: "admin-sso",
          lazy: nn(() =>
            Ct(
              () => import("./admin-encrypted-login-page-Dlm52NYZ.js"),
              __vite__mapDeps([41, 8, 4, 30]),
            ),
          ),
          handle: { title: "正在登录" },
        },
        {
          path: "member",
          lazy: nn(() =>
            Ct(
              () => import("./member-auth-page-CrUXTEiE.js"),
              __vite__mapDeps([42, 4, 22, 35, 6, 30]),
            ),
          ),
          handle: { title: "会员登录" },
        },
        {
          path: "sign-up",
          lazy: nn(() =>
            Ct(() => import("./page-xTy00aQa.js"), __vite__mapDeps([43, 30, 15, 7, 9, 4])),
          ),
          handle: { title: "创建账户" },
        },
        {
          path: "forgot-password",
          lazy: nn(() => Ct(() => import("./page-0qSxTv7e.js"), __vite__mapDeps([44, 30, 4]))),
          handle: { title: "忘记密码" },
        },
      ],
    },
    {
      path: "/errors",
      handle: { seoExempt: !0 },
      children: [
        {
          path: "unauthorized",
          lazy: nn(() => Ct(() => import("./page-DMVmZKoW.js"), __vite__mapDeps([45, 46]))),
          handle: { title: "未授权" },
        },
        {
          path: "forbidden",
          lazy: nn(() => Ct(() => import("./page-DsOdI7r-.js"), __vite__mapDeps([47, 46]))),
          handle: { title: "禁止访问" },
        },
        {
          path: "not-found",
          lazy: nn(() => Ct(() => import("./page-BX1W3AjW.js"), __vite__mapDeps([48, 46]))),
          handle: { title: "页面未找到" },
        },
        {
          path: "internal-server-error",
          lazy: nn(() => Ct(() => import("./page-CYzN6hCD.js"), __vite__mapDeps([49, 46]))),
          handle: { title: "服务器内部错误" },
        },
        {
          path: "under-maintenance",
          lazy: nn(() => Ct(() => import("./page-BBKr9xnR.js"), __vite__mapDeps([50, 46]))),
          handle: { title: "系统维护中" },
        },
      ],
    },
    {
      path: "*",
      lazy: nn(() => Ct(() => import("./page-BX1W3AjW.js"), __vite__mapDeps([48, 46]))),
      handle: { seoExempt: !0, title: "页面未找到" },
    },
  ],
  X4 = () => {
    {
      console.log("GTM not initialized - VITE_GTM_ID environment variable not set");
      return;
    }
  },
  I4 = "https://ultron-agent.wanwang.xin/ultron-loader.js?appId=3d9c1fc6e75a",
  Q4 = () => {
    if (document.querySelector('script[src*="ultron-loader"]')) return;
    const e = document.createElement("script");
    ((e.src = I4), (e.async = !0), document.head.appendChild(e));
  },
  Wb = "data-ultron-suspended";
let Su = 0;
const u3 = () => {
    _.useLayoutEffect(
      () => (
        (Su += 1),
        Su === 1 && document.documentElement.setAttribute(Wb, ""),
        () => {
          ((Su -= 1), Su === 0 && document.documentElement.removeAttribute(Wb));
        }
      ),
      [],
    );
  },
  K4 = "",
  J4 = gR(
    [
      {
        element: ee.jsx(A4, {}),
        hydrateFallbackElement: ee.jsx(H4, {}),
        children: [{ errorElement: ee.jsx(V4, {}), children: P4 }],
      },
    ],
    { basename: K4 },
  );
function W4() {
  return (
    _.useEffect(() => {
      (X4(), Q4());
    }, []),
    ee.jsx("div", {
      className: "font-sans antialiased",
      children: ee.jsx(kR, { children: ee.jsx(MR, { router: J4 }) }),
    })
  );
}
nw.createRoot(document.getElementById("root")).render(
  ee.jsx(_.StrictMode, { children: ee.jsx(W4, {}) }),
);
export {
  qR as $,
  w4 as A,
  hh as B,
  Ib as C,
  Qb as D,
  Kb as E,
  S4 as F,
  Jb as G,
  m4 as H,
  Pb as I,
  ZN as J,
  IN as K,
  KR as L,
  DS as M,
  _R as N,
  Yx as O,
  ra as P,
  i3 as Q,
  _4 as R,
  oc as S,
  bM as T,
  l3 as U,
  s3 as V,
  vz as W,
  WR as X,
  K as Y,
  Iu as Z,
  zM as _,
  Pt as a,
  PR as a0,
  Qr as a1,
  J2 as a2,
  tA as a3,
  nA as a4,
  aA as a5,
  rA as a6,
  r3 as a7,
  d_ as a8,
  F2 as a9,
  z_ as aA,
  T_ as aB,
  UT as aC,
  _T as aD,
  __ as aa,
  Mh as ab,
  r2 as ac,
  c_ as ad,
  s_ as ae,
  ZR as af,
  v4 as ag,
  wi as ah,
  No as ai,
  i_ as aj,
  o3 as ak,
  WN as al,
  VN as am,
  FN as an,
  $x as ao,
  a3 as ap,
  N4 as aq,
  k4 as ar,
  L4 as as,
  NR as at,
  w_ as au,
  G2 as av,
  A_ as aw,
  L_ as ax,
  D_ as ay,
  N_ as az,
  V0 as b,
  wl as c,
  t3 as d,
  e3 as e,
  u3 as f,
  n3 as g,
  Ho as h,
  p4 as i,
  ee as j,
  MS as k,
  h4 as l,
  l_ as m,
  zu as n,
  pr as o,
  $o as p,
  r_ as q,
  _ as r,
  Hd as s,
  $N as t,
  Zn as u,
  dN as v,
  vN as w,
  SM as x,
  db as y,
  Xb as z,
};
