(function () {
  "use strict";
  var nu = { exports: {} },
    ui = {};
  /**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Yc;
  function N0() {
    if (Yc) return ui;
    Yc = 1;
    var a = Symbol.for("react.transitional.element"),
      l = Symbol.for("react.fragment");
    function u(o, c, d) {
      var h = null;
      if (
        (d !== void 0 && (h = "" + d),
        c.key !== void 0 && (h = "" + c.key),
        "key" in c)
      ) {
        d = {};
        for (var g in c) g !== "key" && (d[g] = c[g]);
      } else d = c;
      return (
        (c = d.ref),
        { $$typeof: a, type: o, key: h, ref: c !== void 0 ? c : null, props: d }
      );
    }
    return (ui.Fragment = l), (ui.jsx = u), (ui.jsxs = u), ui;
  }
  var Gc;
  function L0() {
    return Gc || ((Gc = 1), (nu.exports = N0())), nu.exports;
  }
  var B = L0(),
    au = { exports: {} },
    oi = {},
    iu = { exports: {} },
    lu = {};
  /**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Xc;
  function H0() {
    return (
      Xc ||
        ((Xc = 1),
        (function (a) {
          function l(z, N) {
            var J = z.length;
            z.push(N);
            t: for (; 0 < J; ) {
              var ot = (J - 1) >>> 1,
                S = z[ot];
              if (0 < c(S, N)) (z[ot] = N), (z[J] = S), (J = ot);
              else break t;
            }
          }
          function u(z) {
            return z.length === 0 ? null : z[0];
          }
          function o(z) {
            if (z.length === 0) return null;
            var N = z[0],
              J = z.pop();
            if (J !== N) {
              z[0] = J;
              t: for (var ot = 0, S = z.length, O = S >>> 1; ot < O; ) {
                var H = 2 * (ot + 1) - 1,
                  X = z[H],
                  $ = H + 1,
                  mt = z[$];
                if (0 > c(X, J))
                  $ < S && 0 > c(mt, X)
                    ? ((z[ot] = mt), (z[$] = J), (ot = $))
                    : ((z[ot] = X), (z[H] = J), (ot = H));
                else if ($ < S && 0 > c(mt, J))
                  (z[ot] = mt), (z[$] = J), (ot = $);
                else break t;
              }
            }
            return N;
          }
          function c(z, N) {
            var J = z.sortIndex - N.sortIndex;
            return J !== 0 ? J : z.id - N.id;
          }
          if (
            ((a.unstable_now = void 0),
            typeof performance == "object" &&
              typeof performance.now == "function")
          ) {
            var d = performance;
            a.unstable_now = function () {
              return d.now();
            };
          } else {
            var h = Date,
              g = h.now();
            a.unstable_now = function () {
              return h.now() - g;
            };
          }
          var p = [],
            m = [],
            v = 1,
            T = null,
            x = 3,
            V = !1,
            w = !1,
            G = !1,
            Q = !1,
            Z = typeof setTimeout == "function" ? setTimeout : null,
            K = typeof clearTimeout == "function" ? clearTimeout : null,
            Y = typeof setImmediate < "u" ? setImmediate : null;
          function I(z) {
            for (var N = u(m); N !== null; ) {
              if (N.callback === null) o(m);
              else if (N.startTime <= z)
                o(m), (N.sortIndex = N.expirationTime), l(p, N);
              else break;
              N = u(m);
            }
          }
          function q(z) {
            if (((G = !1), I(z), !w))
              if (u(p) !== null) (w = !0), k || ((k = !0), Ct());
              else {
                var N = u(m);
                N !== null && Dt(q, N.startTime - z);
              }
          }
          var k = !1,
            tt = -1,
            F = 5,
            ut = -1;
          function St() {
            return Q ? !0 : !(a.unstable_now() - ut < F);
          }
          function Et() {
            if (((Q = !1), k)) {
              var z = a.unstable_now();
              ut = z;
              var N = !0;
              try {
                t: {
                  (w = !1), G && ((G = !1), K(tt), (tt = -1)), (V = !0);
                  var J = x;
                  try {
                    e: {
                      for (
                        I(z), T = u(p);
                        T !== null && !(T.expirationTime > z && St());

                      ) {
                        var ot = T.callback;
                        if (typeof ot == "function") {
                          (T.callback = null), (x = T.priorityLevel);
                          var S = ot(T.expirationTime <= z);
                          if (
                            ((z = a.unstable_now()), typeof S == "function")
                          ) {
                            (T.callback = S), I(z), (N = !0);
                            break e;
                          }
                          T === u(p) && o(p), I(z);
                        } else o(p);
                        T = u(p);
                      }
                      if (T !== null) N = !0;
                      else {
                        var O = u(m);
                        O !== null && Dt(q, O.startTime - z), (N = !1);
                      }
                    }
                    break t;
                  } finally {
                    (T = null), (x = J), (V = !1);
                  }
                  N = void 0;
                }
              } finally {
                N ? Ct() : (k = !1);
              }
            }
          }
          var Ct;
          if (typeof Y == "function")
            Ct = function () {
              Y(Et);
            };
          else if (typeof MessageChannel < "u") {
            var De = new MessageChannel(),
              ue = De.port2;
            (De.port1.onmessage = Et),
              (Ct = function () {
                ue.postMessage(null);
              });
          } else
            Ct = function () {
              Z(Et, 0);
            };
          function Dt(z, N) {
            tt = Z(function () {
              z(a.unstable_now());
            }, N);
          }
          (a.unstable_IdlePriority = 5),
            (a.unstable_ImmediatePriority = 1),
            (a.unstable_LowPriority = 4),
            (a.unstable_NormalPriority = 3),
            (a.unstable_Profiling = null),
            (a.unstable_UserBlockingPriority = 2),
            (a.unstable_cancelCallback = function (z) {
              z.callback = null;
            }),
            (a.unstable_forceFrameRate = function (z) {
              0 > z || 125 < z
                ? console.error(
                    "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                  )
                : (F = 0 < z ? Math.floor(1e3 / z) : 5);
            }),
            (a.unstable_getCurrentPriorityLevel = function () {
              return x;
            }),
            (a.unstable_next = function (z) {
              switch (x) {
                case 1:
                case 2:
                case 3:
                  var N = 3;
                  break;
                default:
                  N = x;
              }
              var J = x;
              x = N;
              try {
                return z();
              } finally {
                x = J;
              }
            }),
            (a.unstable_requestPaint = function () {
              Q = !0;
            }),
            (a.unstable_runWithPriority = function (z, N) {
              switch (z) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                  break;
                default:
                  z = 3;
              }
              var J = x;
              x = z;
              try {
                return N();
              } finally {
                x = J;
              }
            }),
            (a.unstable_scheduleCallback = function (z, N, J) {
              var ot = a.unstable_now();
              switch (
                (typeof J == "object" && J !== null
                  ? ((J = J.delay),
                    (J = typeof J == "number" && 0 < J ? ot + J : ot))
                  : (J = ot),
                z)
              ) {
                case 1:
                  var S = -1;
                  break;
                case 2:
                  S = 250;
                  break;
                case 5:
                  S = 1073741823;
                  break;
                case 4:
                  S = 1e4;
                  break;
                default:
                  S = 5e3;
              }
              return (
                (S = J + S),
                (z = {
                  id: v++,
                  callback: N,
                  priorityLevel: z,
                  startTime: J,
                  expirationTime: S,
                  sortIndex: -1,
                }),
                J > ot
                  ? ((z.sortIndex = J),
                    l(m, z),
                    u(p) === null &&
                      z === u(m) &&
                      (G ? (K(tt), (tt = -1)) : (G = !0), Dt(q, J - ot)))
                  : ((z.sortIndex = S),
                    l(p, z),
                    w || V || ((w = !0), k || ((k = !0), Ct()))),
                z
              );
            }),
            (a.unstable_shouldYield = St),
            (a.unstable_wrapCallback = function (z) {
              var N = x;
              return function () {
                var J = x;
                x = N;
                try {
                  return z.apply(this, arguments);
                } finally {
                  x = J;
                }
              };
            });
        })(lu)),
      lu
    );
  }
  var Zc;
  function q0() {
    return Zc || ((Zc = 1), (iu.exports = H0())), iu.exports;
  }
  var su = { exports: {} },
    st = {};
  /**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Qc;
  function Y0() {
    if (Qc) return st;
    Qc = 1;
    var a = Symbol.for("react.transitional.element"),
      l = Symbol.for("react.portal"),
      u = Symbol.for("react.fragment"),
      o = Symbol.for("react.strict_mode"),
      c = Symbol.for("react.profiler"),
      d = Symbol.for("react.consumer"),
      h = Symbol.for("react.context"),
      g = Symbol.for("react.forward_ref"),
      p = Symbol.for("react.suspense"),
      m = Symbol.for("react.memo"),
      v = Symbol.for("react.lazy"),
      T = Symbol.iterator;
    function x(S) {
      return S === null || typeof S != "object"
        ? null
        : ((S = (T && S[T]) || S["@@iterator"]),
          typeof S == "function" ? S : null);
    }
    var V = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      w = Object.assign,
      G = {};
    function Q(S, O, H) {
      (this.props = S),
        (this.context = O),
        (this.refs = G),
        (this.updater = H || V);
    }
    (Q.prototype.isReactComponent = {}),
      (Q.prototype.setState = function (S, O) {
        if (typeof S != "object" && typeof S != "function" && S != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, S, O, "setState");
      }),
      (Q.prototype.forceUpdate = function (S) {
        this.updater.enqueueForceUpdate(this, S, "forceUpdate");
      });
    function Z() {}
    Z.prototype = Q.prototype;
    function K(S, O, H) {
      (this.props = S),
        (this.context = O),
        (this.refs = G),
        (this.updater = H || V);
    }
    var Y = (K.prototype = new Z());
    (Y.constructor = K), w(Y, Q.prototype), (Y.isPureReactComponent = !0);
    var I = Array.isArray,
      q = { H: null, A: null, T: null, S: null, V: null },
      k = Object.prototype.hasOwnProperty;
    function tt(S, O, H, X, $, mt) {
      return (
        (H = mt.ref),
        {
          $$typeof: a,
          type: S,
          key: O,
          ref: H !== void 0 ? H : null,
          props: mt,
        }
      );
    }
    function F(S, O) {
      return tt(S.type, O, void 0, void 0, void 0, S.props);
    }
    function ut(S) {
      return typeof S == "object" && S !== null && S.$$typeof === a;
    }
    function St(S) {
      var O = { "=": "=0", ":": "=2" };
      return (
        "$" +
        S.replace(/[=:]/g, function (H) {
          return O[H];
        })
      );
    }
    var Et = /\/+/g;
    function Ct(S, O) {
      return typeof S == "object" && S !== null && S.key != null
        ? St("" + S.key)
        : O.toString(36);
    }
    function De() {}
    function ue(S) {
      switch (S.status) {
        case "fulfilled":
          return S.value;
        case "rejected":
          throw S.reason;
        default:
          switch (
            (typeof S.status == "string"
              ? S.then(De, De)
              : ((S.status = "pending"),
                S.then(
                  function (O) {
                    S.status === "pending" &&
                      ((S.status = "fulfilled"), (S.value = O));
                  },
                  function (O) {
                    S.status === "pending" &&
                      ((S.status = "rejected"), (S.reason = O));
                  }
                )),
            S.status)
          ) {
            case "fulfilled":
              return S.value;
            case "rejected":
              throw S.reason;
          }
      }
      throw S;
    }
    function Dt(S, O, H, X, $) {
      var mt = typeof S;
      (mt === "undefined" || mt === "boolean") && (S = null);
      var lt = !1;
      if (S === null) lt = !0;
      else
        switch (mt) {
          case "bigint":
          case "string":
          case "number":
            lt = !0;
            break;
          case "object":
            switch (S.$$typeof) {
              case a:
              case l:
                lt = !0;
                break;
              case v:
                return (lt = S._init), Dt(lt(S._payload), O, H, X, $);
            }
        }
      if (lt)
        return (
          ($ = $(S)),
          (lt = X === "" ? "." + Ct(S, 0) : X),
          I($)
            ? ((H = ""),
              lt != null && (H = lt.replace(Et, "$&/") + "/"),
              Dt($, O, H, "", function (gn) {
                return gn;
              }))
            : $ != null &&
              (ut($) &&
                ($ = F(
                  $,
                  H +
                    ($.key == null || (S && S.key === $.key)
                      ? ""
                      : ("" + $.key).replace(Et, "$&/") + "/") +
                    lt
                )),
              O.push($)),
          1
        );
      lt = 0;
      var de = X === "" ? "." : X + ":";
      if (I(S))
        for (var Ot = 0; Ot < S.length; Ot++)
          (X = S[Ot]), (mt = de + Ct(X, Ot)), (lt += Dt(X, O, H, mt, $));
      else if (((Ot = x(S)), typeof Ot == "function"))
        for (S = Ot.call(S), Ot = 0; !(X = S.next()).done; )
          (X = X.value), (mt = de + Ct(X, Ot++)), (lt += Dt(X, O, H, mt, $));
      else if (mt === "object") {
        if (typeof S.then == "function") return Dt(ue(S), O, H, X, $);
        throw (
          ((O = String(S)),
          Error(
            "Objects are not valid as a React child (found: " +
              (O === "[object Object]"
                ? "object with keys {" + Object.keys(S).join(", ") + "}"
                : O) +
              "). If you meant to render a collection of children, use an array instead."
          ))
        );
      }
      return lt;
    }
    function z(S, O, H) {
      if (S == null) return S;
      var X = [],
        $ = 0;
      return (
        Dt(S, X, "", "", function (mt) {
          return O.call(H, mt, $++);
        }),
        X
      );
    }
    function N(S) {
      if (S._status === -1) {
        var O = S._result;
        (O = O()),
          O.then(
            function (H) {
              (S._status === 0 || S._status === -1) &&
                ((S._status = 1), (S._result = H));
            },
            function (H) {
              (S._status === 0 || S._status === -1) &&
                ((S._status = 2), (S._result = H));
            }
          ),
          S._status === -1 && ((S._status = 0), (S._result = O));
      }
      if (S._status === 1) return S._result.default;
      throw S._result;
    }
    var J =
      typeof reportError == "function"
        ? reportError
        : function (S) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var O = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof S == "object" &&
                  S !== null &&
                  typeof S.message == "string"
                    ? String(S.message)
                    : String(S),
                error: S,
              });
              if (!window.dispatchEvent(O)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", S);
              return;
            }
            console.error(S);
          };
    function ot() {}
    return (
      (st.Children = {
        map: z,
        forEach: function (S, O, H) {
          z(
            S,
            function () {
              O.apply(this, arguments);
            },
            H
          );
        },
        count: function (S) {
          var O = 0;
          return (
            z(S, function () {
              O++;
            }),
            O
          );
        },
        toArray: function (S) {
          return (
            z(S, function (O) {
              return O;
            }) || []
          );
        },
        only: function (S) {
          if (!ut(S))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return S;
        },
      }),
      (st.Component = Q),
      (st.Fragment = u),
      (st.Profiler = c),
      (st.PureComponent = K),
      (st.StrictMode = o),
      (st.Suspense = p),
      (st.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = q),
      (st.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (S) {
          return q.H.useMemoCache(S);
        },
      }),
      (st.cache = function (S) {
        return function () {
          return S.apply(null, arguments);
        };
      }),
      (st.cloneElement = function (S, O, H) {
        if (S == null)
          throw Error(
            "The argument must be a React element, but you passed " + S + "."
          );
        var X = w({}, S.props),
          $ = S.key,
          mt = void 0;
        if (O != null)
          for (lt in (O.ref !== void 0 && (mt = void 0),
          O.key !== void 0 && ($ = "" + O.key),
          O))
            !k.call(O, lt) ||
              lt === "key" ||
              lt === "__self" ||
              lt === "__source" ||
              (lt === "ref" && O.ref === void 0) ||
              (X[lt] = O[lt]);
        var lt = arguments.length - 2;
        if (lt === 1) X.children = H;
        else if (1 < lt) {
          for (var de = Array(lt), Ot = 0; Ot < lt; Ot++)
            de[Ot] = arguments[Ot + 2];
          X.children = de;
        }
        return tt(S.type, $, void 0, void 0, mt, X);
      }),
      (st.createContext = function (S) {
        return (
          (S = {
            $$typeof: h,
            _currentValue: S,
            _currentValue2: S,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }),
          (S.Provider = S),
          (S.Consumer = { $$typeof: d, _context: S }),
          S
        );
      }),
      (st.createElement = function (S, O, H) {
        var X,
          $ = {},
          mt = null;
        if (O != null)
          for (X in (O.key !== void 0 && (mt = "" + O.key), O))
            k.call(O, X) &&
              X !== "key" &&
              X !== "__self" &&
              X !== "__source" &&
              ($[X] = O[X]);
        var lt = arguments.length - 2;
        if (lt === 1) $.children = H;
        else if (1 < lt) {
          for (var de = Array(lt), Ot = 0; Ot < lt; Ot++)
            de[Ot] = arguments[Ot + 2];
          $.children = de;
        }
        if (S && S.defaultProps)
          for (X in ((lt = S.defaultProps), lt))
            $[X] === void 0 && ($[X] = lt[X]);
        return tt(S, mt, void 0, void 0, null, $);
      }),
      (st.createRef = function () {
        return { current: null };
      }),
      (st.forwardRef = function (S) {
        return { $$typeof: g, render: S };
      }),
      (st.isValidElement = ut),
      (st.lazy = function (S) {
        return { $$typeof: v, _payload: { _status: -1, _result: S }, _init: N };
      }),
      (st.memo = function (S, O) {
        return { $$typeof: m, type: S, compare: O === void 0 ? null : O };
      }),
      (st.startTransition = function (S) {
        var O = q.T,
          H = {};
        q.T = H;
        try {
          var X = S(),
            $ = q.S;
          $ !== null && $(H, X),
            typeof X == "object" &&
              X !== null &&
              typeof X.then == "function" &&
              X.then(ot, J);
        } catch (mt) {
          J(mt);
        } finally {
          q.T = O;
        }
      }),
      (st.unstable_useCacheRefresh = function () {
        return q.H.useCacheRefresh();
      }),
      (st.use = function (S) {
        return q.H.use(S);
      }),
      (st.useActionState = function (S, O, H) {
        return q.H.useActionState(S, O, H);
      }),
      (st.useCallback = function (S, O) {
        return q.H.useCallback(S, O);
      }),
      (st.useContext = function (S) {
        return q.H.useContext(S);
      }),
      (st.useDebugValue = function () {}),
      (st.useDeferredValue = function (S, O) {
        return q.H.useDeferredValue(S, O);
      }),
      (st.useEffect = function (S, O, H) {
        var X = q.H;
        if (typeof H == "function")
          throw Error(
            "useEffect CRUD overload is not enabled in this build of React."
          );
        return X.useEffect(S, O);
      }),
      (st.useId = function () {
        return q.H.useId();
      }),
      (st.useImperativeHandle = function (S, O, H) {
        return q.H.useImperativeHandle(S, O, H);
      }),
      (st.useInsertionEffect = function (S, O) {
        return q.H.useInsertionEffect(S, O);
      }),
      (st.useLayoutEffect = function (S, O) {
        return q.H.useLayoutEffect(S, O);
      }),
      (st.useMemo = function (S, O) {
        return q.H.useMemo(S, O);
      }),
      (st.useOptimistic = function (S, O) {
        return q.H.useOptimistic(S, O);
      }),
      (st.useReducer = function (S, O, H) {
        return q.H.useReducer(S, O, H);
      }),
      (st.useRef = function (S) {
        return q.H.useRef(S);
      }),
      (st.useState = function (S) {
        return q.H.useState(S);
      }),
      (st.useSyncExternalStore = function (S, O, H) {
        return q.H.useSyncExternalStore(S, O, H);
      }),
      (st.useTransition = function () {
        return q.H.useTransition();
      }),
      (st.version = "19.1.0"),
      st
    );
  }
  var Kc;
  function uu() {
    return Kc || ((Kc = 1), (su.exports = Y0())), su.exports;
  }
  var ou = { exports: {} },
    Wt = {};
  /**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var kc;
  function G0() {
    if (kc) return Wt;
    kc = 1;
    var a = uu();
    function l(p) {
      var m = "https://react.dev/errors/" + p;
      if (1 < arguments.length) {
        m += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var v = 2; v < arguments.length; v++)
          m += "&args[]=" + encodeURIComponent(arguments[v]);
      }
      return (
        "Minified React error #" +
        p +
        "; visit " +
        m +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function u() {}
    var o = {
        d: {
          f: u,
          r: function () {
            throw Error(l(522));
          },
          D: u,
          C: u,
          L: u,
          m: u,
          X: u,
          S: u,
          M: u,
        },
        p: 0,
        findDOMNode: null,
      },
      c = Symbol.for("react.portal");
    function d(p, m, v) {
      var T =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: c,
        key: T == null ? null : "" + T,
        children: p,
        containerInfo: m,
        implementation: v,
      };
    }
    var h = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function g(p, m) {
      if (p === "font") return "";
      if (typeof m == "string") return m === "use-credentials" ? m : "";
    }
    return (
      (Wt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
      (Wt.createPortal = function (p, m) {
        var v =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
          throw Error(l(299));
        return d(p, m, null, v);
      }),
      (Wt.flushSync = function (p) {
        var m = h.T,
          v = o.p;
        try {
          if (((h.T = null), (o.p = 2), p)) return p();
        } finally {
          (h.T = m), (o.p = v), o.d.f();
        }
      }),
      (Wt.preconnect = function (p, m) {
        typeof p == "string" &&
          (m
            ? ((m = m.crossOrigin),
              (m =
                typeof m == "string"
                  ? m === "use-credentials"
                    ? m
                    : ""
                  : void 0))
            : (m = null),
          o.d.C(p, m));
      }),
      (Wt.prefetchDNS = function (p) {
        typeof p == "string" && o.d.D(p);
      }),
      (Wt.preinit = function (p, m) {
        if (typeof p == "string" && m && typeof m.as == "string") {
          var v = m.as,
            T = g(v, m.crossOrigin),
            x = typeof m.integrity == "string" ? m.integrity : void 0,
            V = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
          v === "style"
            ? o.d.S(
                p,
                typeof m.precedence == "string" ? m.precedence : void 0,
                { crossOrigin: T, integrity: x, fetchPriority: V }
              )
            : v === "script" &&
              o.d.X(p, {
                crossOrigin: T,
                integrity: x,
                fetchPriority: V,
                nonce: typeof m.nonce == "string" ? m.nonce : void 0,
              });
        }
      }),
      (Wt.preinitModule = function (p, m) {
        if (typeof p == "string")
          if (typeof m == "object" && m !== null) {
            if (m.as == null || m.as === "script") {
              var v = g(m.as, m.crossOrigin);
              o.d.M(p, {
                crossOrigin: v,
                integrity:
                  typeof m.integrity == "string" ? m.integrity : void 0,
                nonce: typeof m.nonce == "string" ? m.nonce : void 0,
              });
            }
          } else m == null && o.d.M(p);
      }),
      (Wt.preload = function (p, m) {
        if (
          typeof p == "string" &&
          typeof m == "object" &&
          m !== null &&
          typeof m.as == "string"
        ) {
          var v = m.as,
            T = g(v, m.crossOrigin);
          o.d.L(p, v, {
            crossOrigin: T,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            type: typeof m.type == "string" ? m.type : void 0,
            fetchPriority:
              typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
            referrerPolicy:
              typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
            imageSrcSet:
              typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
            imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
            media: typeof m.media == "string" ? m.media : void 0,
          });
        }
      }),
      (Wt.preloadModule = function (p, m) {
        if (typeof p == "string")
          if (m) {
            var v = g(m.as, m.crossOrigin);
            o.d.m(p, {
              as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
              crossOrigin: v,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            });
          } else o.d.m(p);
      }),
      (Wt.requestFormReset = function (p) {
        o.d.r(p);
      }),
      (Wt.unstable_batchedUpdates = function (p, m) {
        return p(m);
      }),
      (Wt.useFormState = function (p, m, v) {
        return h.H.useFormState(p, m, v);
      }),
      (Wt.useFormStatus = function () {
        return h.H.useHostTransitionStatus();
      }),
      (Wt.version = "19.1.0"),
      Wt
    );
  }
  var Jc;
  function X0() {
    if (Jc) return ou.exports;
    Jc = 1;
    function a() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
        } catch (l) {
          console.error(l);
        }
    }
    return a(), (ou.exports = G0()), ou.exports;
  }
  /**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Pc;
  function Z0() {
    if (Pc) return oi;
    Pc = 1;
    var a = q0(),
      l = uu(),
      u = X0();
    function o(t) {
      var e = "https://react.dev/errors/" + t;
      if (1 < arguments.length) {
        e += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          e += "&args[]=" + encodeURIComponent(arguments[n]);
      }
      return (
        "Minified React error #" +
        t +
        "; visit " +
        e +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function c(t) {
      return !(
        !t ||
        (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)
      );
    }
    function d(t) {
      var e = t,
        n = t;
      if (t.alternate) for (; e.return; ) e = e.return;
      else {
        t = e;
        do (e = t), (e.flags & 4098) !== 0 && (n = e.return), (t = e.return);
        while (t);
      }
      return e.tag === 3 ? n : null;
    }
    function h(t) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (
          (e === null &&
            ((t = t.alternate), t !== null && (e = t.memoizedState)),
          e !== null)
        )
          return e.dehydrated;
      }
      return null;
    }
    function g(t) {
      if (d(t) !== t) throw Error(o(188));
    }
    function p(t) {
      var e = t.alternate;
      if (!e) {
        if (((e = d(t)), e === null)) throw Error(o(188));
        return e !== t ? null : t;
      }
      for (var n = t, i = e; ; ) {
        var s = n.return;
        if (s === null) break;
        var r = s.alternate;
        if (r === null) {
          if (((i = s.return), i !== null)) {
            n = i;
            continue;
          }
          break;
        }
        if (s.child === r.child) {
          for (r = s.child; r; ) {
            if (r === n) return g(s), t;
            if (r === i) return g(s), e;
            r = r.sibling;
          }
          throw Error(o(188));
        }
        if (n.return !== i.return) (n = s), (i = r);
        else {
          for (var f = !1, y = s.child; y; ) {
            if (y === n) {
              (f = !0), (n = s), (i = r);
              break;
            }
            if (y === i) {
              (f = !0), (i = s), (n = r);
              break;
            }
            y = y.sibling;
          }
          if (!f) {
            for (y = r.child; y; ) {
              if (y === n) {
                (f = !0), (n = r), (i = s);
                break;
              }
              if (y === i) {
                (f = !0), (i = r), (n = s);
                break;
              }
              y = y.sibling;
            }
            if (!f) throw Error(o(189));
          }
        }
        if (n.alternate !== i) throw Error(o(190));
      }
      if (n.tag !== 3) throw Error(o(188));
      return n.stateNode.current === n ? t : e;
    }
    function m(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6) return t;
      for (t = t.child; t !== null; ) {
        if (((e = m(t)), e !== null)) return e;
        t = t.sibling;
      }
      return null;
    }
    var v = Object.assign,
      T = Symbol.for("react.element"),
      x = Symbol.for("react.transitional.element"),
      V = Symbol.for("react.portal"),
      w = Symbol.for("react.fragment"),
      G = Symbol.for("react.strict_mode"),
      Q = Symbol.for("react.profiler"),
      Z = Symbol.for("react.provider"),
      K = Symbol.for("react.consumer"),
      Y = Symbol.for("react.context"),
      I = Symbol.for("react.forward_ref"),
      q = Symbol.for("react.suspense"),
      k = Symbol.for("react.suspense_list"),
      tt = Symbol.for("react.memo"),
      F = Symbol.for("react.lazy"),
      ut = Symbol.for("react.activity"),
      St = Symbol.for("react.memo_cache_sentinel"),
      Et = Symbol.iterator;
    function Ct(t) {
      return t === null || typeof t != "object"
        ? null
        : ((t = (Et && t[Et]) || t["@@iterator"]),
          typeof t == "function" ? t : null);
    }
    var De = Symbol.for("react.client.reference");
    function ue(t) {
      if (t == null) return null;
      if (typeof t == "function")
        return t.$$typeof === De ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case w:
          return "Fragment";
        case Q:
          return "Profiler";
        case G:
          return "StrictMode";
        case q:
          return "Suspense";
        case k:
          return "SuspenseList";
        case ut:
          return "Activity";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case V:
            return "Portal";
          case Y:
            return (t.displayName || "Context") + ".Provider";
          case K:
            return (t._context.displayName || "Context") + ".Consumer";
          case I:
            var e = t.render;
            return (
              (t = t.displayName),
              t ||
                ((t = e.displayName || e.name || ""),
                (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
              t
            );
          case tt:
            return (
              (e = t.displayName || null), e !== null ? e : ue(t.type) || "Memo"
            );
          case F:
            (e = t._payload), (t = t._init);
            try {
              return ue(t(e));
            } catch {}
        }
      return null;
    }
    var Dt = Array.isArray,
      z = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      N = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      J = { pending: !1, data: null, method: null, action: null },
      ot = [],
      S = -1;
    function O(t) {
      return { current: t };
    }
    function H(t) {
      0 > S || ((t.current = ot[S]), (ot[S] = null), S--);
    }
    function X(t, e) {
      S++, (ot[S] = t.current), (t.current = e);
    }
    var $ = O(null),
      mt = O(null),
      lt = O(null),
      de = O(null);
    function Ot(t, e) {
      switch ((X(lt, e), X(mt, t), X($, null), e.nodeType)) {
        case 9:
        case 11:
          t = (t = e.documentElement) && (t = t.namespaceURI) ? f0(t) : 0;
          break;
        default:
          if (((t = e.tagName), (e = e.namespaceURI)))
            (e = f0(e)), (t = h0(e, t));
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
      H($), X($, t);
    }
    function gn() {
      H($), H(mt), H(lt);
    }
    function Do(t) {
      t.memoizedState !== null && X(de, t);
      var e = $.current,
        n = h0(e, t.type);
      e !== n && (X(mt, t), X($, n));
    }
    function Yl(t) {
      mt.current === t && (H($), H(mt)),
        de.current === t && (H(de), (Sl._currentValue = J));
    }
    var Ro = Object.prototype.hasOwnProperty,
      Co = a.unstable_scheduleCallback,
      Oo = a.unstable_cancelCallback,
      Jb = a.unstable_shouldYield,
      Pb = a.unstable_requestPaint,
      Xe = a.unstable_now,
      Fb = a.unstable_getCurrentPriorityLevel,
      Qd = a.unstable_ImmediatePriority,
      Kd = a.unstable_UserBlockingPriority,
      Gl = a.unstable_NormalPriority,
      $b = a.unstable_LowPriority,
      kd = a.unstable_IdlePriority,
      Wb = a.log,
      Ib = a.unstable_setDisableYieldValue,
      Ri = null,
      me = null;
    function vn(t) {
      if (
        (typeof Wb == "function" && Ib(t),
        me && typeof me.setStrictMode == "function")
      )
        try {
          me.setStrictMode(Ri, t);
        } catch {}
    }
    var pe = Math.clz32 ? Math.clz32 : nT,
      tT = Math.log,
      eT = Math.LN2;
    function nT(t) {
      return (t >>>= 0), t === 0 ? 32 : (31 - ((tT(t) / eT) | 0)) | 0;
    }
    var Xl = 256,
      Zl = 4194304;
    function Jn(t) {
      var e = t & 42;
      if (e !== 0) return e;
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
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t & 4194048;
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
    function Ql(t, e, n) {
      var i = t.pendingLanes;
      if (i === 0) return 0;
      var s = 0,
        r = t.suspendedLanes,
        f = t.pingedLanes;
      t = t.warmLanes;
      var y = i & 134217727;
      return (
        y !== 0
          ? ((i = y & ~r),
            i !== 0
              ? (s = Jn(i))
              : ((f &= y),
                f !== 0
                  ? (s = Jn(f))
                  : n || ((n = y & ~t), n !== 0 && (s = Jn(n)))))
          : ((y = i & ~r),
            y !== 0
              ? (s = Jn(y))
              : f !== 0
              ? (s = Jn(f))
              : n || ((n = i & ~t), n !== 0 && (s = Jn(n)))),
        s === 0
          ? 0
          : e !== 0 &&
            e !== s &&
            (e & r) === 0 &&
            ((r = s & -s),
            (n = e & -e),
            r >= n || (r === 32 && (n & 4194048) !== 0))
          ? e
          : s
      );
    }
    function Ci(t, e) {
      return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
    }
    function aT(t, e) {
      switch (t) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return e + 250;
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
          return e + 5e3;
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
    function Jd() {
      var t = Xl;
      return (Xl <<= 1), (Xl & 4194048) === 0 && (Xl = 256), t;
    }
    function Pd() {
      var t = Zl;
      return (Zl <<= 1), (Zl & 62914560) === 0 && (Zl = 4194304), t;
    }
    function zo(t) {
      for (var e = [], n = 0; 31 > n; n++) e.push(t);
      return e;
    }
    function Oi(t, e) {
      (t.pendingLanes |= e),
        e !== 268435456 &&
          ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0));
    }
    function iT(t, e, n, i, s, r) {
      var f = t.pendingLanes;
      (t.pendingLanes = n),
        (t.suspendedLanes = 0),
        (t.pingedLanes = 0),
        (t.warmLanes = 0),
        (t.expiredLanes &= n),
        (t.entangledLanes &= n),
        (t.errorRecoveryDisabledLanes &= n),
        (t.shellSuspendCounter = 0);
      var y = t.entanglements,
        b = t.expirationTimes,
        D = t.hiddenUpdates;
      for (n = f & ~n; 0 < n; ) {
        var _ = 31 - pe(n),
          j = 1 << _;
        (y[_] = 0), (b[_] = -1);
        var R = D[_];
        if (R !== null)
          for (D[_] = null, _ = 0; _ < R.length; _++) {
            var C = R[_];
            C !== null && (C.lane &= -536870913);
          }
        n &= ~j;
      }
      i !== 0 && Fd(t, i, 0),
        r !== 0 &&
          s === 0 &&
          t.tag !== 0 &&
          (t.suspendedLanes |= r & ~(f & ~e));
    }
    function Fd(t, e, n) {
      (t.pendingLanes |= e), (t.suspendedLanes &= ~e);
      var i = 31 - pe(e);
      (t.entangledLanes |= e),
        (t.entanglements[i] = t.entanglements[i] | 1073741824 | (n & 4194090));
    }
    function $d(t, e) {
      var n = (t.entangledLanes |= e);
      for (t = t.entanglements; n; ) {
        var i = 31 - pe(n),
          s = 1 << i;
        (s & e) | (t[i] & e) && (t[i] |= e), (n &= ~s);
      }
    }
    function Vo(t) {
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
    function _o(t) {
      return (
        (t &= -t),
        2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
      );
    }
    function Wd() {
      var t = N.p;
      return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : V0(t.type));
    }
    function lT(t, e) {
      var n = N.p;
      try {
        return (N.p = t), e();
      } finally {
        N.p = n;
      }
    }
    var Sn = Math.random().toString(36).slice(2),
      ee = "__reactFiber$" + Sn,
      oe = "__reactProps$" + Sn,
      xa = "__reactContainer$" + Sn,
      Uo = "__reactEvents$" + Sn,
      sT = "__reactListeners$" + Sn,
      uT = "__reactHandles$" + Sn,
      Id = "__reactResources$" + Sn,
      zi = "__reactMarker$" + Sn;
    function wo(t) {
      delete t[ee], delete t[oe], delete t[Uo], delete t[sT], delete t[uT];
    }
    function Aa(t) {
      var e = t[ee];
      if (e) return e;
      for (var n = t.parentNode; n; ) {
        if ((e = n[xa] || n[ee])) {
          if (
            ((n = e.alternate),
            e.child !== null || (n !== null && n.child !== null))
          )
            for (t = y0(t); t !== null; ) {
              if ((n = t[ee])) return n;
              t = y0(t);
            }
          return e;
        }
        (t = n), (n = t.parentNode);
      }
      return null;
    }
    function Ea(t) {
      if ((t = t[ee] || t[xa])) {
        var e = t.tag;
        if (e === 5 || e === 6 || e === 13 || e === 26 || e === 27 || e === 3)
          return t;
      }
      return null;
    }
    function Vi(t) {
      var e = t.tag;
      if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
      throw Error(o(33));
    }
    function Ma(t) {
      var e = t[Id];
      return (
        e ||
          (e = t[Id] =
            { hoistableStyles: new Map(), hoistableScripts: new Map() }),
        e
      );
    }
    function Zt(t) {
      t[zi] = !0;
    }
    var tm = new Set(),
      em = {};
    function Pn(t, e) {
      Da(t, e), Da(t + "Capture", e);
    }
    function Da(t, e) {
      for (em[t] = e, t = 0; t < e.length; t++) tm.add(e[t]);
    }
    var oT = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      nm = {},
      am = {};
    function rT(t) {
      return Ro.call(am, t)
        ? !0
        : Ro.call(nm, t)
        ? !1
        : oT.test(t)
        ? (am[t] = !0)
        : ((nm[t] = !0), !1);
    }
    function Kl(t, e, n) {
      if (rT(e))
        if (n === null) t.removeAttribute(e);
        else {
          switch (typeof n) {
            case "undefined":
            case "function":
            case "symbol":
              t.removeAttribute(e);
              return;
            case "boolean":
              var i = e.toLowerCase().slice(0, 5);
              if (i !== "data-" && i !== "aria-") {
                t.removeAttribute(e);
                return;
              }
          }
          t.setAttribute(e, "" + n);
        }
    }
    function kl(t, e, n) {
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(e);
            return;
        }
        t.setAttribute(e, "" + n);
      }
    }
    function $e(t, e, n, i) {
      if (i === null) t.removeAttribute(n);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            t.removeAttribute(n);
            return;
        }
        t.setAttributeNS(e, n, "" + i);
      }
    }
    var jo, im;
    function Ra(t) {
      if (jo === void 0)
        try {
          throw Error();
        } catch (n) {
          var e = n.stack.trim().match(/\n( *(at )?)/);
          (jo = (e && e[1]) || ""),
            (im =
              -1 <
              n.stack.indexOf(`
    at`)
                ? " (<anonymous>)"
                : -1 < n.stack.indexOf("@")
                ? "@unknown:0:0"
                : "");
        }
      return (
        `
` +
        jo +
        t +
        im
      );
    }
    var Bo = !1;
    function No(t, e) {
      if (!t || Bo) return "";
      Bo = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var i = {
          DetermineComponentFrameRoot: function () {
            try {
              if (e) {
                var j = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(j.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(j, []);
                  } catch (C) {
                    var R = C;
                  }
                  Reflect.construct(t, [], j);
                } else {
                  try {
                    j.call();
                  } catch (C) {
                    R = C;
                  }
                  t.call(j.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (C) {
                  R = C;
                }
                (j = t()) &&
                  typeof j.catch == "function" &&
                  j.catch(function () {});
              }
            } catch (C) {
              if (C && R && typeof C.stack == "string")
                return [C.stack, R.stack];
            }
            return [null, null];
          },
        };
        i.DetermineComponentFrameRoot.displayName =
          "DetermineComponentFrameRoot";
        var s = Object.getOwnPropertyDescriptor(
          i.DetermineComponentFrameRoot,
          "name"
        );
        s &&
          s.configurable &&
          Object.defineProperty(i.DetermineComponentFrameRoot, "name", {
            value: "DetermineComponentFrameRoot",
          });
        var r = i.DetermineComponentFrameRoot(),
          f = r[0],
          y = r[1];
        if (f && y) {
          var b = f.split(`
`),
            D = y.split(`
`);
          for (
            s = i = 0;
            i < b.length && !b[i].includes("DetermineComponentFrameRoot");

          )
            i++;
          for (
            ;
            s < D.length && !D[s].includes("DetermineComponentFrameRoot");

          )
            s++;
          if (i === b.length || s === D.length)
            for (
              i = b.length - 1, s = D.length - 1;
              1 <= i && 0 <= s && b[i] !== D[s];

            )
              s--;
          for (; 1 <= i && 0 <= s; i--, s--)
            if (b[i] !== D[s]) {
              if (i !== 1 || s !== 1)
                do
                  if ((i--, s--, 0 > s || b[i] !== D[s])) {
                    var _ =
                      `
` + b[i].replace(" at new ", " at ");
                    return (
                      t.displayName &&
                        _.includes("<anonymous>") &&
                        (_ = _.replace("<anonymous>", t.displayName)),
                      _
                    );
                  }
                while (1 <= i && 0 <= s);
              break;
            }
        }
      } finally {
        (Bo = !1), (Error.prepareStackTrace = n);
      }
      return (n = t ? t.displayName || t.name : "") ? Ra(n) : "";
    }
    function cT(t) {
      switch (t.tag) {
        case 26:
        case 27:
        case 5:
          return Ra(t.type);
        case 16:
          return Ra("Lazy");
        case 13:
          return Ra("Suspense");
        case 19:
          return Ra("SuspenseList");
        case 0:
        case 15:
          return No(t.type, !1);
        case 11:
          return No(t.type.render, !1);
        case 1:
          return No(t.type, !0);
        case 31:
          return Ra("Activity");
        default:
          return "";
      }
    }
    function lm(t) {
      try {
        var e = "";
        do (e += cT(t)), (t = t.return);
        while (t);
        return e;
      } catch (n) {
        return (
          `
Error generating stack: ` +
          n.message +
          `
` +
          n.stack
        );
      }
    }
    function Re(t) {
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
    function sm(t) {
      var e = t.type;
      return (
        (t = t.nodeName) &&
        t.toLowerCase() === "input" &&
        (e === "checkbox" || e === "radio")
      );
    }
    function fT(t) {
      var e = sm(t) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e),
        i = "" + t[e];
      if (
        !t.hasOwnProperty(e) &&
        typeof n < "u" &&
        typeof n.get == "function" &&
        typeof n.set == "function"
      ) {
        var s = n.get,
          r = n.set;
        return (
          Object.defineProperty(t, e, {
            configurable: !0,
            get: function () {
              return s.call(this);
            },
            set: function (f) {
              (i = "" + f), r.call(this, f);
            },
          }),
          Object.defineProperty(t, e, { enumerable: n.enumerable }),
          {
            getValue: function () {
              return i;
            },
            setValue: function (f) {
              i = "" + f;
            },
            stopTracking: function () {
              (t._valueTracker = null), delete t[e];
            },
          }
        );
      }
    }
    function Jl(t) {
      t._valueTracker || (t._valueTracker = fT(t));
    }
    function um(t) {
      if (!t) return !1;
      var e = t._valueTracker;
      if (!e) return !0;
      var n = e.getValue(),
        i = "";
      return (
        t && (i = sm(t) ? (t.checked ? "true" : "false") : t.value),
        (t = i),
        t !== n ? (e.setValue(t), !0) : !1
      );
    }
    function Pl(t) {
      if (
        ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
      )
        return null;
      try {
        return t.activeElement || t.body;
      } catch {
        return t.body;
      }
    }
    var hT = /[\n"\\]/g;
    function Ce(t) {
      return t.replace(hT, function (e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      });
    }
    function Lo(t, e, n, i, s, r, f, y) {
      (t.name = ""),
        f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean"
          ? (t.type = f)
          : t.removeAttribute("type"),
        e != null
          ? f === "number"
            ? ((e === 0 && t.value === "") || t.value != e) &&
              (t.value = "" + Re(e))
            : t.value !== "" + Re(e) && (t.value = "" + Re(e))
          : (f !== "submit" && f !== "reset") || t.removeAttribute("value"),
        e != null
          ? Ho(t, f, Re(e))
          : n != null
          ? Ho(t, f, Re(n))
          : i != null && t.removeAttribute("value"),
        s == null && r != null && (t.defaultChecked = !!r),
        s != null &&
          (t.checked = s && typeof s != "function" && typeof s != "symbol"),
        y != null &&
        typeof y != "function" &&
        typeof y != "symbol" &&
        typeof y != "boolean"
          ? (t.name = "" + Re(y))
          : t.removeAttribute("name");
    }
    function om(t, e, n, i, s, r, f, y) {
      if (
        (r != null &&
          typeof r != "function" &&
          typeof r != "symbol" &&
          typeof r != "boolean" &&
          (t.type = r),
        e != null || n != null)
      ) {
        if (!((r !== "submit" && r !== "reset") || e != null)) return;
        (n = n != null ? "" + Re(n) : ""),
          (e = e != null ? "" + Re(e) : n),
          y || e === t.value || (t.value = e),
          (t.defaultValue = e);
      }
      (i = i ?? s),
        (i = typeof i != "function" && typeof i != "symbol" && !!i),
        (t.checked = y ? t.checked : !!i),
        (t.defaultChecked = !!i),
        f != null &&
          typeof f != "function" &&
          typeof f != "symbol" &&
          typeof f != "boolean" &&
          (t.name = f);
    }
    function Ho(t, e, n) {
      (e === "number" && Pl(t.ownerDocument) === t) ||
        t.defaultValue === "" + n ||
        (t.defaultValue = "" + n);
    }
    function Ca(t, e, n, i) {
      if (((t = t.options), e)) {
        e = {};
        for (var s = 0; s < n.length; s++) e["$" + n[s]] = !0;
        for (n = 0; n < t.length; n++)
          (s = e.hasOwnProperty("$" + t[n].value)),
            t[n].selected !== s && (t[n].selected = s),
            s && i && (t[n].defaultSelected = !0);
      } else {
        for (n = "" + Re(n), e = null, s = 0; s < t.length; s++) {
          if (t[s].value === n) {
            (t[s].selected = !0), i && (t[s].defaultSelected = !0);
            return;
          }
          e !== null || t[s].disabled || (e = t[s]);
        }
        e !== null && (e.selected = !0);
      }
    }
    function rm(t, e, n) {
      if (
        e != null &&
        ((e = "" + Re(e)), e !== t.value && (t.value = e), n == null)
      ) {
        t.defaultValue !== e && (t.defaultValue = e);
        return;
      }
      t.defaultValue = n != null ? "" + Re(n) : "";
    }
    function cm(t, e, n, i) {
      if (e == null) {
        if (i != null) {
          if (n != null) throw Error(o(92));
          if (Dt(i)) {
            if (1 < i.length) throw Error(o(93));
            i = i[0];
          }
          n = i;
        }
        n == null && (n = ""), (e = n);
      }
      (n = Re(e)),
        (t.defaultValue = n),
        (i = t.textContent),
        i === n && i !== "" && i !== null && (t.value = i);
    }
    function Oa(t, e) {
      if (e) {
        var n = t.firstChild;
        if (n && n === t.lastChild && n.nodeType === 3) {
          n.nodeValue = e;
          return;
        }
      }
      t.textContent = e;
    }
    var dT = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    );
    function fm(t, e, n) {
      var i = e.indexOf("--") === 0;
      n == null || typeof n == "boolean" || n === ""
        ? i
          ? t.setProperty(e, "")
          : e === "float"
          ? (t.cssFloat = "")
          : (t[e] = "")
        : i
        ? t.setProperty(e, n)
        : typeof n != "number" || n === 0 || dT.has(e)
        ? e === "float"
          ? (t.cssFloat = n)
          : (t[e] = ("" + n).trim())
        : (t[e] = n + "px");
    }
    function hm(t, e, n) {
      if (e != null && typeof e != "object") throw Error(o(62));
      if (((t = t.style), n != null)) {
        for (var i in n)
          !n.hasOwnProperty(i) ||
            (e != null && e.hasOwnProperty(i)) ||
            (i.indexOf("--") === 0
              ? t.setProperty(i, "")
              : i === "float"
              ? (t.cssFloat = "")
              : (t[i] = ""));
        for (var s in e)
          (i = e[s]), e.hasOwnProperty(s) && n[s] !== i && fm(t, s, i);
      } else for (var r in e) e.hasOwnProperty(r) && fm(t, r, e[r]);
    }
    function qo(t) {
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
    var mT = new Map([
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
      pT =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function Fl(t) {
      return pT.test("" + t)
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : t;
    }
    var Yo = null;
    function Go(t) {
      return (
        (t = t.target || t.srcElement || window),
        t.correspondingUseElement && (t = t.correspondingUseElement),
        t.nodeType === 3 ? t.parentNode : t
      );
    }
    var za = null,
      Va = null;
    function dm(t) {
      var e = Ea(t);
      if (e && (t = e.stateNode)) {
        var n = t[oe] || null;
        t: switch (((t = e.stateNode), e.type)) {
          case "input":
            if (
              (Lo(
                t,
                n.value,
                n.defaultValue,
                n.defaultValue,
                n.checked,
                n.defaultChecked,
                n.type,
                n.name
              ),
              (e = n.name),
              n.type === "radio" && e != null)
            ) {
              for (n = t; n.parentNode; ) n = n.parentNode;
              for (
                n = n.querySelectorAll(
                  'input[name="' + Ce("" + e) + '"][type="radio"]'
                ),
                  e = 0;
                e < n.length;
                e++
              ) {
                var i = n[e];
                if (i !== t && i.form === t.form) {
                  var s = i[oe] || null;
                  if (!s) throw Error(o(90));
                  Lo(
                    i,
                    s.value,
                    s.defaultValue,
                    s.defaultValue,
                    s.checked,
                    s.defaultChecked,
                    s.type,
                    s.name
                  );
                }
              }
              for (e = 0; e < n.length; e++)
                (i = n[e]), i.form === t.form && um(i);
            }
            break t;
          case "textarea":
            rm(t, n.value, n.defaultValue);
            break t;
          case "select":
            (e = n.value), e != null && Ca(t, !!n.multiple, e, !1);
        }
      }
    }
    var Xo = !1;
    function mm(t, e, n) {
      if (Xo) return t(e, n);
      Xo = !0;
      try {
        var i = t(e);
        return i;
      } finally {
        if (
          ((Xo = !1),
          (za !== null || Va !== null) &&
            (js(), za && ((e = za), (t = Va), (Va = za = null), dm(e), t)))
        )
          for (e = 0; e < t.length; e++) dm(t[e]);
      }
    }
    function _i(t, e) {
      var n = t.stateNode;
      if (n === null) return null;
      var i = n[oe] || null;
      if (i === null) return null;
      n = i[e];
      t: switch (e) {
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
          (i = !i.disabled) ||
            ((t = t.type),
            (i = !(
              t === "button" ||
              t === "input" ||
              t === "select" ||
              t === "textarea"
            ))),
            (t = !i);
          break t;
        default:
          t = !1;
      }
      if (t) return null;
      if (n && typeof n != "function") throw Error(o(231, e, typeof n));
      return n;
    }
    var We = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
      ),
      Zo = !1;
    if (We)
      try {
        var Ui = {};
        Object.defineProperty(Ui, "passive", {
          get: function () {
            Zo = !0;
          },
        }),
          window.addEventListener("test", Ui, Ui),
          window.removeEventListener("test", Ui, Ui);
      } catch {
        Zo = !1;
      }
    var bn = null,
      Qo = null,
      $l = null;
    function pm() {
      if ($l) return $l;
      var t,
        e = Qo,
        n = e.length,
        i,
        s = "value" in bn ? bn.value : bn.textContent,
        r = s.length;
      for (t = 0; t < n && e[t] === s[t]; t++);
      var f = n - t;
      for (i = 1; i <= f && e[n - i] === s[r - i]; i++);
      return ($l = s.slice(t, 1 < i ? 1 - i : void 0));
    }
    function Wl(t) {
      var e = t.keyCode;
      return (
        "charCode" in t
          ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
          : (t = e),
        t === 10 && (t = 13),
        32 <= t || t === 13 ? t : 0
      );
    }
    function Il() {
      return !0;
    }
    function ym() {
      return !1;
    }
    function re(t) {
      function e(n, i, s, r, f) {
        (this._reactName = n),
          (this._targetInst = s),
          (this.type = i),
          (this.nativeEvent = r),
          (this.target = f),
          (this.currentTarget = null);
        for (var y in t)
          t.hasOwnProperty(y) && ((n = t[y]), (this[y] = n ? n(r) : r[y]));
        return (
          (this.isDefaultPrevented = (
            r.defaultPrevented != null
              ? r.defaultPrevented
              : r.returnValue === !1
          )
            ? Il
            : ym),
          (this.isPropagationStopped = ym),
          this
        );
      }
      return (
        v(e.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n &&
              (n.preventDefault
                ? n.preventDefault()
                : typeof n.returnValue != "unknown" && (n.returnValue = !1),
              (this.isDefaultPrevented = Il));
          },
          stopPropagation: function () {
            var n = this.nativeEvent;
            n &&
              (n.stopPropagation
                ? n.stopPropagation()
                : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
              (this.isPropagationStopped = Il));
          },
          persist: function () {},
          isPersistent: Il,
        }),
        e
      );
    }
    var Fn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (t) {
          return t.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      ts = re(Fn),
      wi = v({}, Fn, { view: 0, detail: 0 }),
      yT = re(wi),
      Ko,
      ko,
      ji,
      es = v({}, wi, {
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
        getModifierState: Po,
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
            : (t !== ji &&
                (ji && t.type === "mousemove"
                  ? ((Ko = t.screenX - ji.screenX),
                    (ko = t.screenY - ji.screenY))
                  : (ko = Ko = 0),
                (ji = t)),
              Ko);
        },
        movementY: function (t) {
          return "movementY" in t ? t.movementY : ko;
        },
      }),
      gm = re(es),
      gT = v({}, es, { dataTransfer: 0 }),
      vT = re(gT),
      ST = v({}, wi, { relatedTarget: 0 }),
      Jo = re(ST),
      bT = v({}, Fn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      TT = re(bT),
      xT = v({}, Fn, {
        clipboardData: function (t) {
          return "clipboardData" in t ? t.clipboardData : window.clipboardData;
        },
      }),
      AT = re(xT),
      ET = v({}, Fn, { data: 0 }),
      vm = re(ET),
      MT = {
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
      DT = {
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
      RT = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function CT(t) {
      var e = this.nativeEvent;
      return e.getModifierState
        ? e.getModifierState(t)
        : (t = RT[t])
        ? !!e[t]
        : !1;
    }
    function Po() {
      return CT;
    }
    var OT = v({}, wi, {
        key: function (t) {
          if (t.key) {
            var e = MT[t.key] || t.key;
            if (e !== "Unidentified") return e;
          }
          return t.type === "keypress"
            ? ((t = Wl(t)), t === 13 ? "Enter" : String.fromCharCode(t))
            : t.type === "keydown" || t.type === "keyup"
            ? DT[t.keyCode] || "Unidentified"
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
        getModifierState: Po,
        charCode: function (t) {
          return t.type === "keypress" ? Wl(t) : 0;
        },
        keyCode: function (t) {
          return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
        },
        which: function (t) {
          return t.type === "keypress"
            ? Wl(t)
            : t.type === "keydown" || t.type === "keyup"
            ? t.keyCode
            : 0;
        },
      }),
      zT = re(OT),
      VT = v({}, es, {
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
      Sm = re(VT),
      _T = v({}, wi, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Po,
      }),
      UT = re(_T),
      wT = v({}, Fn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      jT = re(wT),
      BT = v({}, es, {
        deltaX: function (t) {
          return "deltaX" in t
            ? t.deltaX
            : "wheelDeltaX" in t
            ? -t.wheelDeltaX
            : 0;
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
      NT = re(BT),
      LT = v({}, Fn, { newState: 0, oldState: 0 }),
      HT = re(LT),
      qT = [9, 13, 27, 32],
      Fo = We && "CompositionEvent" in window,
      Bi = null;
    We && "documentMode" in document && (Bi = document.documentMode);
    var YT = We && "TextEvent" in window && !Bi,
      bm = We && (!Fo || (Bi && 8 < Bi && 11 >= Bi)),
      Tm = " ",
      xm = !1;
    function Am(t, e) {
      switch (t) {
        case "keyup":
          return qT.indexOf(e.keyCode) !== -1;
        case "keydown":
          return e.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Em(t) {
      return (
        (t = t.detail), typeof t == "object" && "data" in t ? t.data : null
      );
    }
    var _a = !1;
    function GT(t, e) {
      switch (t) {
        case "compositionend":
          return Em(e);
        case "keypress":
          return e.which !== 32 ? null : ((xm = !0), Tm);
        case "textInput":
          return (t = e.data), t === Tm && xm ? null : t;
        default:
          return null;
      }
    }
    function XT(t, e) {
      if (_a)
        return t === "compositionend" || (!Fo && Am(t, e))
          ? ((t = pm()), ($l = Qo = bn = null), (_a = !1), t)
          : null;
      switch (t) {
        case "paste":
          return null;
        case "keypress":
          if (
            !(e.ctrlKey || e.altKey || e.metaKey) ||
            (e.ctrlKey && e.altKey)
          ) {
            if (e.char && 1 < e.char.length) return e.char;
            if (e.which) return String.fromCharCode(e.which);
          }
          return null;
        case "compositionend":
          return bm && e.locale !== "ko" ? null : e.data;
        default:
          return null;
      }
    }
    var ZT = {
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
    function Mm(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return e === "input" ? !!ZT[t.type] : e === "textarea";
    }
    function Dm(t, e, n, i) {
      za ? (Va ? Va.push(i) : (Va = [i])) : (za = i),
        (e = Ys(e, "onChange")),
        0 < e.length &&
          ((n = new ts("onChange", "change", null, n, i)),
          t.push({ event: n, listeners: e }));
    }
    var Ni = null,
      Li = null;
    function QT(t) {
      s0(t, 0);
    }
    function ns(t) {
      var e = Vi(t);
      if (um(e)) return t;
    }
    function Rm(t, e) {
      if (t === "change") return e;
    }
    var Cm = !1;
    if (We) {
      var $o;
      if (We) {
        var Wo = "oninput" in document;
        if (!Wo) {
          var Om = document.createElement("div");
          Om.setAttribute("oninput", "return;"),
            (Wo = typeof Om.oninput == "function");
        }
        $o = Wo;
      } else $o = !1;
      Cm = $o && (!document.documentMode || 9 < document.documentMode);
    }
    function zm() {
      Ni && (Ni.detachEvent("onpropertychange", Vm), (Li = Ni = null));
    }
    function Vm(t) {
      if (t.propertyName === "value" && ns(Li)) {
        var e = [];
        Dm(e, Li, t, Go(t)), mm(QT, e);
      }
    }
    function KT(t, e, n) {
      t === "focusin"
        ? (zm(), (Ni = e), (Li = n), Ni.attachEvent("onpropertychange", Vm))
        : t === "focusout" && zm();
    }
    function kT(t) {
      if (t === "selectionchange" || t === "keyup" || t === "keydown")
        return ns(Li);
    }
    function JT(t, e) {
      if (t === "click") return ns(e);
    }
    function PT(t, e) {
      if (t === "input" || t === "change") return ns(e);
    }
    function FT(t, e) {
      return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
    }
    var ye = typeof Object.is == "function" ? Object.is : FT;
    function Hi(t, e) {
      if (ye(t, e)) return !0;
      if (
        typeof t != "object" ||
        t === null ||
        typeof e != "object" ||
        e === null
      )
        return !1;
      var n = Object.keys(t),
        i = Object.keys(e);
      if (n.length !== i.length) return !1;
      for (i = 0; i < n.length; i++) {
        var s = n[i];
        if (!Ro.call(e, s) || !ye(t[s], e[s])) return !1;
      }
      return !0;
    }
    function _m(t) {
      for (; t && t.firstChild; ) t = t.firstChild;
      return t;
    }
    function Um(t, e) {
      var n = _m(t);
      t = 0;
      for (var i; n; ) {
        if (n.nodeType === 3) {
          if (((i = t + n.textContent.length), t <= e && i >= e))
            return { node: n, offset: e - t };
          t = i;
        }
        t: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break t;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = _m(n);
      }
    }
    function wm(t, e) {
      return t && e
        ? t === e
          ? !0
          : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
          ? wm(t, e.parentNode)
          : "contains" in t
          ? t.contains(e)
          : t.compareDocumentPosition
          ? !!(t.compareDocumentPosition(e) & 16)
          : !1
        : !1;
    }
    function jm(t) {
      t =
        t != null &&
        t.ownerDocument != null &&
        t.ownerDocument.defaultView != null
          ? t.ownerDocument.defaultView
          : window;
      for (var e = Pl(t.document); e instanceof t.HTMLIFrameElement; ) {
        try {
          var n = typeof e.contentWindow.location.href == "string";
        } catch {
          n = !1;
        }
        if (n) t = e.contentWindow;
        else break;
        e = Pl(t.document);
      }
      return e;
    }
    function Io(t) {
      var e = t && t.nodeName && t.nodeName.toLowerCase();
      return (
        e &&
        ((e === "input" &&
          (t.type === "text" ||
            t.type === "search" ||
            t.type === "tel" ||
            t.type === "url" ||
            t.type === "password")) ||
          e === "textarea" ||
          t.contentEditable === "true")
      );
    }
    var $T = We && "documentMode" in document && 11 >= document.documentMode,
      Ua = null,
      tr = null,
      qi = null,
      er = !1;
    function Bm(t, e, n) {
      var i =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      er ||
        Ua == null ||
        Ua !== Pl(i) ||
        ((i = Ua),
        "selectionStart" in i && Io(i)
          ? (i = { start: i.selectionStart, end: i.selectionEnd })
          : ((i = (
              (i.ownerDocument && i.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (i = {
              anchorNode: i.anchorNode,
              anchorOffset: i.anchorOffset,
              focusNode: i.focusNode,
              focusOffset: i.focusOffset,
            })),
        (qi && Hi(qi, i)) ||
          ((qi = i),
          (i = Ys(tr, "onSelect")),
          0 < i.length &&
            ((e = new ts("onSelect", "select", null, e, n)),
            t.push({ event: e, listeners: i }),
            (e.target = Ua))));
    }
    function $n(t, e) {
      var n = {};
      return (
        (n[t.toLowerCase()] = e.toLowerCase()),
        (n["Webkit" + t] = "webkit" + e),
        (n["Moz" + t] = "moz" + e),
        n
      );
    }
    var wa = {
        animationend: $n("Animation", "AnimationEnd"),
        animationiteration: $n("Animation", "AnimationIteration"),
        animationstart: $n("Animation", "AnimationStart"),
        transitionrun: $n("Transition", "TransitionRun"),
        transitionstart: $n("Transition", "TransitionStart"),
        transitioncancel: $n("Transition", "TransitionCancel"),
        transitionend: $n("Transition", "TransitionEnd"),
      },
      nr = {},
      Nm = {};
    We &&
      ((Nm = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete wa.animationend.animation,
        delete wa.animationiteration.animation,
        delete wa.animationstart.animation),
      "TransitionEvent" in window || delete wa.transitionend.transition);
    function Wn(t) {
      if (nr[t]) return nr[t];
      if (!wa[t]) return t;
      var e = wa[t],
        n;
      for (n in e) if (e.hasOwnProperty(n) && n in Nm) return (nr[t] = e[n]);
      return t;
    }
    var Lm = Wn("animationend"),
      Hm = Wn("animationiteration"),
      qm = Wn("animationstart"),
      WT = Wn("transitionrun"),
      IT = Wn("transitionstart"),
      tx = Wn("transitioncancel"),
      Ym = Wn("transitionend"),
      Gm = new Map(),
      ar =
        "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
          " "
        );
    ar.push("scrollEnd");
    function Ne(t, e) {
      Gm.set(t, e), Pn(e, [t]);
    }
    var Xm = new WeakMap();
    function Oe(t, e) {
      if (typeof t == "object" && t !== null) {
        var n = Xm.get(t);
        return n !== void 0
          ? n
          : ((e = { value: t, source: e, stack: lm(e) }), Xm.set(t, e), e);
      }
      return { value: t, source: e, stack: lm(e) };
    }
    var ze = [],
      ja = 0,
      ir = 0;
    function as() {
      for (var t = ja, e = (ir = ja = 0); e < t; ) {
        var n = ze[e];
        ze[e++] = null;
        var i = ze[e];
        ze[e++] = null;
        var s = ze[e];
        ze[e++] = null;
        var r = ze[e];
        if (((ze[e++] = null), i !== null && s !== null)) {
          var f = i.pending;
          f === null ? (s.next = s) : ((s.next = f.next), (f.next = s)),
            (i.pending = s);
        }
        r !== 0 && Zm(n, s, r);
      }
    }
    function is(t, e, n, i) {
      (ze[ja++] = t),
        (ze[ja++] = e),
        (ze[ja++] = n),
        (ze[ja++] = i),
        (ir |= i),
        (t.lanes |= i),
        (t = t.alternate),
        t !== null && (t.lanes |= i);
    }
    function lr(t, e, n, i) {
      return is(t, e, n, i), ls(t);
    }
    function Ba(t, e) {
      return is(t, null, null, e), ls(t);
    }
    function Zm(t, e, n) {
      t.lanes |= n;
      var i = t.alternate;
      i !== null && (i.lanes |= n);
      for (var s = !1, r = t.return; r !== null; )
        (r.childLanes |= n),
          (i = r.alternate),
          i !== null && (i.childLanes |= n),
          r.tag === 22 &&
            ((t = r.stateNode), t === null || t._visibility & 1 || (s = !0)),
          (t = r),
          (r = r.return);
      return t.tag === 3
        ? ((r = t.stateNode),
          s &&
            e !== null &&
            ((s = 31 - pe(n)),
            (t = r.hiddenUpdates),
            (i = t[s]),
            i === null ? (t[s] = [e]) : i.push(e),
            (e.lane = n | 536870912)),
          r)
        : null;
    }
    function ls(t) {
      if (50 < fl) throw ((fl = 0), (fc = null), Error(o(185)));
      for (var e = t.return; e !== null; ) (t = e), (e = t.return);
      return t.tag === 3 ? t.stateNode : null;
    }
    var Na = {};
    function ex(t, e, n, i) {
      (this.tag = t),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.refCleanup = this.ref = null),
        (this.pendingProps = e),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = i),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
    }
    function ge(t, e, n, i) {
      return new ex(t, e, n, i);
    }
    function sr(t) {
      return (t = t.prototype), !(!t || !t.isReactComponent);
    }
    function Ie(t, e) {
      var n = t.alternate;
      return (
        n === null
          ? ((n = ge(t.tag, e, t.key, t.mode)),
            (n.elementType = t.elementType),
            (n.type = t.type),
            (n.stateNode = t.stateNode),
            (n.alternate = t),
            (t.alternate = n))
          : ((n.pendingProps = e),
            (n.type = t.type),
            (n.flags = 0),
            (n.subtreeFlags = 0),
            (n.deletions = null)),
        (n.flags = t.flags & 65011712),
        (n.childLanes = t.childLanes),
        (n.lanes = t.lanes),
        (n.child = t.child),
        (n.memoizedProps = t.memoizedProps),
        (n.memoizedState = t.memoizedState),
        (n.updateQueue = t.updateQueue),
        (e = t.dependencies),
        (n.dependencies =
          e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
        (n.sibling = t.sibling),
        (n.index = t.index),
        (n.ref = t.ref),
        (n.refCleanup = t.refCleanup),
        n
      );
    }
    function Qm(t, e) {
      t.flags &= 65011714;
      var n = t.alternate;
      return (
        n === null
          ? ((t.childLanes = 0),
            (t.lanes = e),
            (t.child = null),
            (t.subtreeFlags = 0),
            (t.memoizedProps = null),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.dependencies = null),
            (t.stateNode = null))
          : ((t.childLanes = n.childLanes),
            (t.lanes = n.lanes),
            (t.child = n.child),
            (t.subtreeFlags = 0),
            (t.deletions = null),
            (t.memoizedProps = n.memoizedProps),
            (t.memoizedState = n.memoizedState),
            (t.updateQueue = n.updateQueue),
            (t.type = n.type),
            (e = n.dependencies),
            (t.dependencies =
              e === null
                ? null
                : { lanes: e.lanes, firstContext: e.firstContext })),
        t
      );
    }
    function ss(t, e, n, i, s, r) {
      var f = 0;
      if (((i = t), typeof t == "function")) sr(t) && (f = 1);
      else if (typeof t == "string")
        f = a2(t, n, $.current)
          ? 26
          : t === "html" || t === "head" || t === "body"
          ? 27
          : 5;
      else
        t: switch (t) {
          case ut:
            return (
              (t = ge(31, n, e, s)), (t.elementType = ut), (t.lanes = r), t
            );
          case w:
            return In(n.children, s, r, e);
          case G:
            (f = 8), (s |= 24);
            break;
          case Q:
            return (
              (t = ge(12, n, e, s | 2)), (t.elementType = Q), (t.lanes = r), t
            );
          case q:
            return (t = ge(13, n, e, s)), (t.elementType = q), (t.lanes = r), t;
          case k:
            return (t = ge(19, n, e, s)), (t.elementType = k), (t.lanes = r), t;
          default:
            if (typeof t == "object" && t !== null)
              switch (t.$$typeof) {
                case Z:
                case Y:
                  f = 10;
                  break t;
                case K:
                  f = 9;
                  break t;
                case I:
                  f = 11;
                  break t;
                case tt:
                  f = 14;
                  break t;
                case F:
                  (f = 16), (i = null);
                  break t;
              }
            (f = 29),
              (n = Error(o(130, t === null ? "null" : typeof t, ""))),
              (i = null);
        }
      return (
        (e = ge(f, n, e, s)),
        (e.elementType = t),
        (e.type = i),
        (e.lanes = r),
        e
      );
    }
    function In(t, e, n, i) {
      return (t = ge(7, t, i, e)), (t.lanes = n), t;
    }
    function ur(t, e, n) {
      return (t = ge(6, t, null, e)), (t.lanes = n), t;
    }
    function or(t, e, n) {
      return (
        (e = ge(4, t.children !== null ? t.children : [], t.key, e)),
        (e.lanes = n),
        (e.stateNode = {
          containerInfo: t.containerInfo,
          pendingChildren: null,
          implementation: t.implementation,
        }),
        e
      );
    }
    var La = [],
      Ha = 0,
      us = null,
      os = 0,
      Ve = [],
      _e = 0,
      ta = null,
      tn = 1,
      en = "";
    function ea(t, e) {
      (La[Ha++] = os), (La[Ha++] = us), (us = t), (os = e);
    }
    function Km(t, e, n) {
      (Ve[_e++] = tn), (Ve[_e++] = en), (Ve[_e++] = ta), (ta = t);
      var i = tn;
      t = en;
      var s = 32 - pe(i) - 1;
      (i &= ~(1 << s)), (n += 1);
      var r = 32 - pe(e) + s;
      if (30 < r) {
        var f = s - (s % 5);
        (r = (i & ((1 << f) - 1)).toString(32)),
          (i >>= f),
          (s -= f),
          (tn = (1 << (32 - pe(e) + s)) | (n << s) | i),
          (en = r + t);
      } else (tn = (1 << r) | (n << s) | i), (en = t);
    }
    function rr(t) {
      t.return !== null && (ea(t, 1), Km(t, 1, 0));
    }
    function cr(t) {
      for (; t === us; )
        (us = La[--Ha]), (La[Ha] = null), (os = La[--Ha]), (La[Ha] = null);
      for (; t === ta; )
        (ta = Ve[--_e]),
          (Ve[_e] = null),
          (en = Ve[--_e]),
          (Ve[_e] = null),
          (tn = Ve[--_e]),
          (Ve[_e] = null);
    }
    var ie = null,
      wt = null,
      yt = !1,
      na = null,
      Ze = !1,
      fr = Error(o(519));
    function aa(t) {
      var e = Error(o(418, ""));
      throw (Xi(Oe(e, t)), fr);
    }
    function km(t) {
      var e = t.stateNode,
        n = t.type,
        i = t.memoizedProps;
      switch (((e[ee] = t), (e[oe] = i), n)) {
        case "dialog":
          ht("cancel", e), ht("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          ht("load", e);
          break;
        case "video":
        case "audio":
          for (n = 0; n < dl.length; n++) ht(dl[n], e);
          break;
        case "source":
          ht("error", e);
          break;
        case "img":
        case "image":
        case "link":
          ht("error", e), ht("load", e);
          break;
        case "details":
          ht("toggle", e);
          break;
        case "input":
          ht("invalid", e),
            om(
              e,
              i.value,
              i.defaultValue,
              i.checked,
              i.defaultChecked,
              i.type,
              i.name,
              !0
            ),
            Jl(e);
          break;
        case "select":
          ht("invalid", e);
          break;
        case "textarea":
          ht("invalid", e), cm(e, i.value, i.defaultValue, i.children), Jl(e);
      }
      (n = i.children),
        (typeof n != "string" &&
          typeof n != "number" &&
          typeof n != "bigint") ||
        e.textContent === "" + n ||
        i.suppressHydrationWarning === !0 ||
        c0(e.textContent, n)
          ? (i.popover != null && (ht("beforetoggle", e), ht("toggle", e)),
            i.onScroll != null && ht("scroll", e),
            i.onScrollEnd != null && ht("scrollend", e),
            i.onClick != null && (e.onclick = Gs),
            (e = !0))
          : (e = !1),
        e || aa(t);
    }
    function Jm(t) {
      for (ie = t.return; ie; )
        switch (ie.tag) {
          case 5:
          case 13:
            Ze = !1;
            return;
          case 27:
          case 3:
            Ze = !0;
            return;
          default:
            ie = ie.return;
        }
    }
    function Yi(t) {
      if (t !== ie) return !1;
      if (!yt) return Jm(t), (yt = !0), !1;
      var e = t.tag,
        n;
      if (
        ((n = e !== 3 && e !== 27) &&
          ((n = e === 5) &&
            ((n = t.type),
            (n =
              !(n !== "form" && n !== "button") ||
              Rc(t.type, t.memoizedProps))),
          (n = !n)),
        n && wt && aa(t),
        Jm(t),
        e === 13)
      ) {
        if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
          throw Error(o(317));
        t: {
          for (t = t.nextSibling, e = 0; t; ) {
            if (t.nodeType === 8)
              if (((n = t.data), n === "/$")) {
                if (e === 0) {
                  wt = He(t.nextSibling);
                  break t;
                }
                e--;
              } else (n !== "$" && n !== "$!" && n !== "$?") || e++;
            t = t.nextSibling;
          }
          wt = null;
        }
      } else
        e === 27
          ? ((e = wt),
            Bn(t.type) ? ((t = Vc), (Vc = null), (wt = t)) : (wt = e))
          : (wt = ie ? He(t.stateNode.nextSibling) : null);
      return !0;
    }
    function Gi() {
      (wt = ie = null), (yt = !1);
    }
    function Pm() {
      var t = na;
      return (
        t !== null &&
          (he === null ? (he = t) : he.push.apply(he, t), (na = null)),
        t
      );
    }
    function Xi(t) {
      na === null ? (na = [t]) : na.push(t);
    }
    var hr = O(null),
      ia = null,
      nn = null;
    function Tn(t, e, n) {
      X(hr, e._currentValue), (e._currentValue = n);
    }
    function an(t) {
      (t._currentValue = hr.current), H(hr);
    }
    function dr(t, e, n) {
      for (; t !== null; ) {
        var i = t.alternate;
        if (
          ((t.childLanes & e) !== e
            ? ((t.childLanes |= e), i !== null && (i.childLanes |= e))
            : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e),
          t === n)
        )
          break;
        t = t.return;
      }
    }
    function mr(t, e, n, i) {
      var s = t.child;
      for (s !== null && (s.return = t); s !== null; ) {
        var r = s.dependencies;
        if (r !== null) {
          var f = s.child;
          r = r.firstContext;
          t: for (; r !== null; ) {
            var y = r;
            r = s;
            for (var b = 0; b < e.length; b++)
              if (y.context === e[b]) {
                (r.lanes |= n),
                  (y = r.alternate),
                  y !== null && (y.lanes |= n),
                  dr(r.return, n, t),
                  i || (f = null);
                break t;
              }
            r = y.next;
          }
        } else if (s.tag === 18) {
          if (((f = s.return), f === null)) throw Error(o(341));
          (f.lanes |= n),
            (r = f.alternate),
            r !== null && (r.lanes |= n),
            dr(f, n, t),
            (f = null);
        } else f = s.child;
        if (f !== null) f.return = s;
        else
          for (f = s; f !== null; ) {
            if (f === t) {
              f = null;
              break;
            }
            if (((s = f.sibling), s !== null)) {
              (s.return = f.return), (f = s);
              break;
            }
            f = f.return;
          }
        s = f;
      }
    }
    function Zi(t, e, n, i) {
      t = null;
      for (var s = e, r = !1; s !== null; ) {
        if (!r) {
          if ((s.flags & 524288) !== 0) r = !0;
          else if ((s.flags & 262144) !== 0) break;
        }
        if (s.tag === 10) {
          var f = s.alternate;
          if (f === null) throw Error(o(387));
          if (((f = f.memoizedProps), f !== null)) {
            var y = s.type;
            ye(s.pendingProps.value, f.value) ||
              (t !== null ? t.push(y) : (t = [y]));
          }
        } else if (s === de.current) {
          if (((f = s.alternate), f === null)) throw Error(o(387));
          f.memoizedState.memoizedState !== s.memoizedState.memoizedState &&
            (t !== null ? t.push(Sl) : (t = [Sl]));
        }
        s = s.return;
      }
      t !== null && mr(e, t, n, i), (e.flags |= 262144);
    }
    function rs(t) {
      for (t = t.firstContext; t !== null; ) {
        if (!ye(t.context._currentValue, t.memoizedValue)) return !0;
        t = t.next;
      }
      return !1;
    }
    function la(t) {
      (ia = t),
        (nn = null),
        (t = t.dependencies),
        t !== null && (t.firstContext = null);
    }
    function ne(t) {
      return Fm(ia, t);
    }
    function cs(t, e) {
      return ia === null && la(t), Fm(t, e);
    }
    function Fm(t, e) {
      var n = e._currentValue;
      if (((e = { context: e, memoizedValue: n, next: null }), nn === null)) {
        if (t === null) throw Error(o(308));
        (nn = e),
          (t.dependencies = { lanes: 0, firstContext: e }),
          (t.flags |= 524288);
      } else nn = nn.next = e;
      return n;
    }
    var nx =
        typeof AbortController < "u"
          ? AbortController
          : function () {
              var t = [],
                e = (this.signal = {
                  aborted: !1,
                  addEventListener: function (n, i) {
                    t.push(i);
                  },
                });
              this.abort = function () {
                (e.aborted = !0),
                  t.forEach(function (n) {
                    return n();
                  });
              };
            },
      ax = a.unstable_scheduleCallback,
      ix = a.unstable_NormalPriority,
      Gt = {
        $$typeof: Y,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function pr() {
      return { controller: new nx(), data: new Map(), refCount: 0 };
    }
    function Qi(t) {
      t.refCount--,
        t.refCount === 0 &&
          ax(ix, function () {
            t.controller.abort();
          });
    }
    var Ki = null,
      yr = 0,
      qa = 0,
      Ya = null;
    function lx(t, e) {
      if (Ki === null) {
        var n = (Ki = []);
        (yr = 0),
          (qa = vc()),
          (Ya = {
            status: "pending",
            value: void 0,
            then: function (i) {
              n.push(i);
            },
          });
      }
      return yr++, e.then($m, $m), e;
    }
    function $m() {
      if (--yr === 0 && Ki !== null) {
        Ya !== null && (Ya.status = "fulfilled");
        var t = Ki;
        (Ki = null), (qa = 0), (Ya = null);
        for (var e = 0; e < t.length; e++) (0, t[e])();
      }
    }
    function sx(t, e) {
      var n = [],
        i = {
          status: "pending",
          value: null,
          reason: null,
          then: function (s) {
            n.push(s);
          },
        };
      return (
        t.then(
          function () {
            (i.status = "fulfilled"), (i.value = e);
            for (var s = 0; s < n.length; s++) (0, n[s])(e);
          },
          function (s) {
            for (i.status = "rejected", i.reason = s, s = 0; s < n.length; s++)
              (0, n[s])(void 0);
          }
        ),
        i
      );
    }
    var Wm = z.S;
    z.S = function (t, e) {
      typeof e == "object" &&
        e !== null &&
        typeof e.then == "function" &&
        lx(t, e),
        Wm !== null && Wm(t, e);
    };
    var sa = O(null);
    function gr() {
      var t = sa.current;
      return t !== null ? t : Mt.pooledCache;
    }
    function fs(t, e) {
      e === null ? X(sa, sa.current) : X(sa, e.pool);
    }
    function Im() {
      var t = gr();
      return t === null ? null : { parent: Gt._currentValue, pool: t };
    }
    var ki = Error(o(460)),
      tp = Error(o(474)),
      hs = Error(o(542)),
      vr = { then: function () {} };
    function ep(t) {
      return (t = t.status), t === "fulfilled" || t === "rejected";
    }
    function ds() {}
    function np(t, e, n) {
      switch (
        ((n = t[n]),
        n === void 0 ? t.push(e) : n !== e && (e.then(ds, ds), (e = n)),
        e.status)
      ) {
        case "fulfilled":
          return e.value;
        case "rejected":
          throw ((t = e.reason), ip(t), t);
        default:
          if (typeof e.status == "string") e.then(ds, ds);
          else {
            if (((t = Mt), t !== null && 100 < t.shellSuspendCounter))
              throw Error(o(482));
            (t = e),
              (t.status = "pending"),
              t.then(
                function (i) {
                  if (e.status === "pending") {
                    var s = e;
                    (s.status = "fulfilled"), (s.value = i);
                  }
                },
                function (i) {
                  if (e.status === "pending") {
                    var s = e;
                    (s.status = "rejected"), (s.reason = i);
                  }
                }
              );
          }
          switch (e.status) {
            case "fulfilled":
              return e.value;
            case "rejected":
              throw ((t = e.reason), ip(t), t);
          }
          throw ((Ji = e), ki);
      }
    }
    var Ji = null;
    function ap() {
      if (Ji === null) throw Error(o(459));
      var t = Ji;
      return (Ji = null), t;
    }
    function ip(t) {
      if (t === ki || t === hs) throw Error(o(483));
    }
    var xn = !1;
    function Sr(t) {
      t.updateQueue = {
        baseState: t.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function br(t, e) {
      (t = t.updateQueue),
        e.updateQueue === t &&
          (e.updateQueue = {
            baseState: t.baseState,
            firstBaseUpdate: t.firstBaseUpdate,
            lastBaseUpdate: t.lastBaseUpdate,
            shared: t.shared,
            callbacks: null,
          });
    }
    function An(t) {
      return { lane: t, tag: 0, payload: null, callback: null, next: null };
    }
    function En(t, e, n) {
      var i = t.updateQueue;
      if (i === null) return null;
      if (((i = i.shared), (gt & 2) !== 0)) {
        var s = i.pending;
        return (
          s === null ? (e.next = e) : ((e.next = s.next), (s.next = e)),
          (i.pending = e),
          (e = ls(t)),
          Zm(t, null, n),
          e
        );
      }
      return is(t, i, e, n), ls(t);
    }
    function Pi(t, e, n) {
      if (
        ((e = e.updateQueue),
        e !== null && ((e = e.shared), (n & 4194048) !== 0))
      ) {
        var i = e.lanes;
        (i &= t.pendingLanes), (n |= i), (e.lanes = n), $d(t, n);
      }
    }
    function Tr(t, e) {
      var n = t.updateQueue,
        i = t.alternate;
      if (i !== null && ((i = i.updateQueue), n === i)) {
        var s = null,
          r = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
          do {
            var f = {
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: null,
              next: null,
            };
            r === null ? (s = r = f) : (r = r.next = f), (n = n.next);
          } while (n !== null);
          r === null ? (s = r = e) : (r = r.next = e);
        } else s = r = e;
        (n = {
          baseState: i.baseState,
          firstBaseUpdate: s,
          lastBaseUpdate: r,
          shared: i.shared,
          callbacks: i.callbacks,
        }),
          (t.updateQueue = n);
        return;
      }
      (t = n.lastBaseUpdate),
        t === null ? (n.firstBaseUpdate = e) : (t.next = e),
        (n.lastBaseUpdate = e);
    }
    var xr = !1;
    function Fi() {
      if (xr) {
        var t = Ya;
        if (t !== null) throw t;
      }
    }
    function $i(t, e, n, i) {
      xr = !1;
      var s = t.updateQueue;
      xn = !1;
      var r = s.firstBaseUpdate,
        f = s.lastBaseUpdate,
        y = s.shared.pending;
      if (y !== null) {
        s.shared.pending = null;
        var b = y,
          D = b.next;
        (b.next = null), f === null ? (r = D) : (f.next = D), (f = b);
        var _ = t.alternate;
        _ !== null &&
          ((_ = _.updateQueue),
          (y = _.lastBaseUpdate),
          y !== f &&
            (y === null ? (_.firstBaseUpdate = D) : (y.next = D),
            (_.lastBaseUpdate = b)));
      }
      if (r !== null) {
        var j = s.baseState;
        (f = 0), (_ = D = b = null), (y = r);
        do {
          var R = y.lane & -536870913,
            C = R !== y.lane;
          if (C ? (dt & R) === R : (i & R) === R) {
            R !== 0 && R === qa && (xr = !0),
              _ !== null &&
                (_ = _.next =
                  {
                    lane: 0,
                    tag: y.tag,
                    payload: y.payload,
                    callback: null,
                    next: null,
                  });
            t: {
              var it = t,
                et = y;
              R = e;
              var xt = n;
              switch (et.tag) {
                case 1:
                  if (((it = et.payload), typeof it == "function")) {
                    j = it.call(xt, j, R);
                    break t;
                  }
                  j = it;
                  break t;
                case 3:
                  it.flags = (it.flags & -65537) | 128;
                case 0:
                  if (
                    ((it = et.payload),
                    (R = typeof it == "function" ? it.call(xt, j, R) : it),
                    R == null)
                  )
                    break t;
                  j = v({}, j, R);
                  break t;
                case 2:
                  xn = !0;
              }
            }
            (R = y.callback),
              R !== null &&
                ((t.flags |= 64),
                C && (t.flags |= 8192),
                (C = s.callbacks),
                C === null ? (s.callbacks = [R]) : C.push(R));
          } else
            (C = {
              lane: R,
              tag: y.tag,
              payload: y.payload,
              callback: y.callback,
              next: null,
            }),
              _ === null ? ((D = _ = C), (b = j)) : (_ = _.next = C),
              (f |= R);
          if (((y = y.next), y === null)) {
            if (((y = s.shared.pending), y === null)) break;
            (C = y),
              (y = C.next),
              (C.next = null),
              (s.lastBaseUpdate = C),
              (s.shared.pending = null);
          }
        } while (!0);
        _ === null && (b = j),
          (s.baseState = b),
          (s.firstBaseUpdate = D),
          (s.lastBaseUpdate = _),
          r === null && (s.shared.lanes = 0),
          (_n |= f),
          (t.lanes = f),
          (t.memoizedState = j);
      }
    }
    function lp(t, e) {
      if (typeof t != "function") throw Error(o(191, t));
      t.call(e);
    }
    function sp(t, e) {
      var n = t.callbacks;
      if (n !== null)
        for (t.callbacks = null, t = 0; t < n.length; t++) lp(n[t], e);
    }
    var Ga = O(null),
      ms = O(0);
    function up(t, e) {
      (t = fn), X(ms, t), X(Ga, e), (fn = t | e.baseLanes);
    }
    function Ar() {
      X(ms, fn), X(Ga, Ga.current);
    }
    function Er() {
      (fn = ms.current), H(Ga), H(ms);
    }
    var Mn = 0,
      rt = null,
      bt = null,
      qt = null,
      ps = !1,
      Xa = !1,
      ua = !1,
      ys = 0,
      Wi = 0,
      Za = null,
      ux = 0;
    function Nt() {
      throw Error(o(321));
    }
    function Mr(t, e) {
      if (e === null) return !1;
      for (var n = 0; n < e.length && n < t.length; n++)
        if (!ye(t[n], e[n])) return !1;
      return !0;
    }
    function Dr(t, e, n, i, s, r) {
      return (
        (Mn = r),
        (rt = e),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.lanes = 0),
        (z.H = t === null || t.memoizedState === null ? Zp : Qp),
        (ua = !1),
        (r = n(i, s)),
        (ua = !1),
        Xa && (r = rp(e, n, i, s)),
        op(t),
        r
      );
    }
    function op(t) {
      z.H = xs;
      var e = bt !== null && bt.next !== null;
      if (
        ((Mn = 0), (qt = bt = rt = null), (ps = !1), (Wi = 0), (Za = null), e)
      )
        throw Error(o(300));
      t === null ||
        Qt ||
        ((t = t.dependencies), t !== null && rs(t) && (Qt = !0));
    }
    function rp(t, e, n, i) {
      rt = t;
      var s = 0;
      do {
        if ((Xa && (Za = null), (Wi = 0), (Xa = !1), 25 <= s))
          throw Error(o(301));
        if (((s += 1), (qt = bt = null), t.updateQueue != null)) {
          var r = t.updateQueue;
          (r.lastEffect = null),
            (r.events = null),
            (r.stores = null),
            r.memoCache != null && (r.memoCache.index = 0);
        }
        (z.H = mx), (r = e(n, i));
      } while (Xa);
      return r;
    }
    function ox() {
      var t = z.H,
        e = t.useState()[0];
      return (
        (e = typeof e.then == "function" ? Ii(e) : e),
        (t = t.useState()[0]),
        (bt !== null ? bt.memoizedState : null) !== t && (rt.flags |= 1024),
        e
      );
    }
    function Rr() {
      var t = ys !== 0;
      return (ys = 0), t;
    }
    function Cr(t, e, n) {
      (e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~n);
    }
    function Or(t) {
      if (ps) {
        for (t = t.memoizedState; t !== null; ) {
          var e = t.queue;
          e !== null && (e.pending = null), (t = t.next);
        }
        ps = !1;
      }
      (Mn = 0), (qt = bt = rt = null), (Xa = !1), (Wi = ys = 0), (Za = null);
    }
    function ce() {
      var t = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return qt === null ? (rt.memoizedState = qt = t) : (qt = qt.next = t), qt;
    }
    function Yt() {
      if (bt === null) {
        var t = rt.alternate;
        t = t !== null ? t.memoizedState : null;
      } else t = bt.next;
      var e = qt === null ? rt.memoizedState : qt.next;
      if (e !== null) (qt = e), (bt = t);
      else {
        if (t === null)
          throw rt.alternate === null ? Error(o(467)) : Error(o(310));
        (bt = t),
          (t = {
            memoizedState: bt.memoizedState,
            baseState: bt.baseState,
            baseQueue: bt.baseQueue,
            queue: bt.queue,
            next: null,
          }),
          qt === null ? (rt.memoizedState = qt = t) : (qt = qt.next = t);
      }
      return qt;
    }
    function zr() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function Ii(t) {
      var e = Wi;
      return (
        (Wi += 1),
        Za === null && (Za = []),
        (t = np(Za, t, e)),
        (e = rt),
        (qt === null ? e.memoizedState : qt.next) === null &&
          ((e = e.alternate),
          (z.H = e === null || e.memoizedState === null ? Zp : Qp)),
        t
      );
    }
    function gs(t) {
      if (t !== null && typeof t == "object") {
        if (typeof t.then == "function") return Ii(t);
        if (t.$$typeof === Y) return ne(t);
      }
      throw Error(o(438, String(t)));
    }
    function Vr(t) {
      var e = null,
        n = rt.updateQueue;
      if ((n !== null && (e = n.memoCache), e == null)) {
        var i = rt.alternate;
        i !== null &&
          ((i = i.updateQueue),
          i !== null &&
            ((i = i.memoCache),
            i != null &&
              (e = {
                data: i.data.map(function (s) {
                  return s.slice();
                }),
                index: 0,
              })));
      }
      if (
        (e == null && (e = { data: [], index: 0 }),
        n === null && ((n = zr()), (rt.updateQueue = n)),
        (n.memoCache = e),
        (n = e.data[e.index]),
        n === void 0)
      )
        for (n = e.data[e.index] = Array(t), i = 0; i < t; i++) n[i] = St;
      return e.index++, n;
    }
    function ln(t, e) {
      return typeof e == "function" ? e(t) : e;
    }
    function vs(t) {
      var e = Yt();
      return _r(e, bt, t);
    }
    function _r(t, e, n) {
      var i = t.queue;
      if (i === null) throw Error(o(311));
      i.lastRenderedReducer = n;
      var s = t.baseQueue,
        r = i.pending;
      if (r !== null) {
        if (s !== null) {
          var f = s.next;
          (s.next = r.next), (r.next = f);
        }
        (e.baseQueue = s = r), (i.pending = null);
      }
      if (((r = t.baseState), s === null)) t.memoizedState = r;
      else {
        e = s.next;
        var y = (f = null),
          b = null,
          D = e,
          _ = !1;
        do {
          var j = D.lane & -536870913;
          if (j !== D.lane ? (dt & j) === j : (Mn & j) === j) {
            var R = D.revertLane;
            if (R === 0)
              b !== null &&
                (b = b.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    action: D.action,
                    hasEagerState: D.hasEagerState,
                    eagerState: D.eagerState,
                    next: null,
                  }),
                j === qa && (_ = !0);
            else if ((Mn & R) === R) {
              (D = D.next), R === qa && (_ = !0);
              continue;
            } else
              (j = {
                lane: 0,
                revertLane: D.revertLane,
                action: D.action,
                hasEagerState: D.hasEagerState,
                eagerState: D.eagerState,
                next: null,
              }),
                b === null ? ((y = b = j), (f = r)) : (b = b.next = j),
                (rt.lanes |= R),
                (_n |= R);
            (j = D.action),
              ua && n(r, j),
              (r = D.hasEagerState ? D.eagerState : n(r, j));
          } else
            (R = {
              lane: j,
              revertLane: D.revertLane,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null,
            }),
              b === null ? ((y = b = R), (f = r)) : (b = b.next = R),
              (rt.lanes |= j),
              (_n |= j);
          D = D.next;
        } while (D !== null && D !== e);
        if (
          (b === null ? (f = r) : (b.next = y),
          !ye(r, t.memoizedState) && ((Qt = !0), _ && ((n = Ya), n !== null)))
        )
          throw n;
        (t.memoizedState = r),
          (t.baseState = f),
          (t.baseQueue = b),
          (i.lastRenderedState = r);
      }
      return s === null && (i.lanes = 0), [t.memoizedState, i.dispatch];
    }
    function Ur(t) {
      var e = Yt(),
        n = e.queue;
      if (n === null) throw Error(o(311));
      n.lastRenderedReducer = t;
      var i = n.dispatch,
        s = n.pending,
        r = e.memoizedState;
      if (s !== null) {
        n.pending = null;
        var f = (s = s.next);
        do (r = t(r, f.action)), (f = f.next);
        while (f !== s);
        ye(r, e.memoizedState) || (Qt = !0),
          (e.memoizedState = r),
          e.baseQueue === null && (e.baseState = r),
          (n.lastRenderedState = r);
      }
      return [r, i];
    }
    function cp(t, e, n) {
      var i = rt,
        s = Yt(),
        r = yt;
      if (r) {
        if (n === void 0) throw Error(o(407));
        n = n();
      } else n = e();
      var f = !ye((bt || s).memoizedState, n);
      f && ((s.memoizedState = n), (Qt = !0)), (s = s.queue);
      var y = dp.bind(null, i, s, t);
      if (
        (tl(2048, 8, y, [t]),
        s.getSnapshot !== e || f || (qt !== null && qt.memoizedState.tag & 1))
      ) {
        if (
          ((i.flags |= 2048),
          Qa(9, Ss(), hp.bind(null, i, s, n, e), null),
          Mt === null)
        )
          throw Error(o(349));
        r || (Mn & 124) !== 0 || fp(i, e, n);
      }
      return n;
    }
    function fp(t, e, n) {
      (t.flags |= 16384),
        (t = { getSnapshot: e, value: n }),
        (e = rt.updateQueue),
        e === null
          ? ((e = zr()), (rt.updateQueue = e), (e.stores = [t]))
          : ((n = e.stores), n === null ? (e.stores = [t]) : n.push(t));
    }
    function hp(t, e, n, i) {
      (e.value = n), (e.getSnapshot = i), mp(e) && pp(t);
    }
    function dp(t, e, n) {
      return n(function () {
        mp(e) && pp(t);
      });
    }
    function mp(t) {
      var e = t.getSnapshot;
      t = t.value;
      try {
        var n = e();
        return !ye(t, n);
      } catch {
        return !0;
      }
    }
    function pp(t) {
      var e = Ba(t, 2);
      e !== null && xe(e, t, 2);
    }
    function wr(t) {
      var e = ce();
      if (typeof t == "function") {
        var n = t;
        if (((t = n()), ua)) {
          vn(!0);
          try {
            n();
          } finally {
            vn(!1);
          }
        }
      }
      return (
        (e.memoizedState = e.baseState = t),
        (e.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ln,
          lastRenderedState: t,
        }),
        e
      );
    }
    function yp(t, e, n, i) {
      return (t.baseState = n), _r(t, bt, typeof i == "function" ? i : ln);
    }
    function rx(t, e, n, i, s) {
      if (Ts(t)) throw Error(o(485));
      if (((t = e.action), t !== null)) {
        var r = {
          payload: s,
          action: t,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function (f) {
            r.listeners.push(f);
          },
        };
        z.T !== null ? n(!0) : (r.isTransition = !1),
          i(r),
          (n = e.pending),
          n === null
            ? ((r.next = e.pending = r), gp(e, r))
            : ((r.next = n.next), (e.pending = n.next = r));
      }
    }
    function gp(t, e) {
      var n = e.action,
        i = e.payload,
        s = t.state;
      if (e.isTransition) {
        var r = z.T,
          f = {};
        z.T = f;
        try {
          var y = n(s, i),
            b = z.S;
          b !== null && b(f, y), vp(t, e, y);
        } catch (D) {
          jr(t, e, D);
        } finally {
          z.T = r;
        }
      } else
        try {
          (r = n(s, i)), vp(t, e, r);
        } catch (D) {
          jr(t, e, D);
        }
    }
    function vp(t, e, n) {
      n !== null && typeof n == "object" && typeof n.then == "function"
        ? n.then(
            function (i) {
              Sp(t, e, i);
            },
            function (i) {
              return jr(t, e, i);
            }
          )
        : Sp(t, e, n);
    }
    function Sp(t, e, n) {
      (e.status = "fulfilled"),
        (e.value = n),
        bp(e),
        (t.state = n),
        (e = t.pending),
        e !== null &&
          ((n = e.next),
          n === e
            ? (t.pending = null)
            : ((n = n.next), (e.next = n), gp(t, n)));
    }
    function jr(t, e, n) {
      var i = t.pending;
      if (((t.pending = null), i !== null)) {
        i = i.next;
        do (e.status = "rejected"), (e.reason = n), bp(e), (e = e.next);
        while (e !== i);
      }
      t.action = null;
    }
    function bp(t) {
      t = t.listeners;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
    function Tp(t, e) {
      return e;
    }
    function xp(t, e) {
      if (yt) {
        var n = Mt.formState;
        if (n !== null) {
          t: {
            var i = rt;
            if (yt) {
              if (wt) {
                e: {
                  for (var s = wt, r = Ze; s.nodeType !== 8; ) {
                    if (!r) {
                      s = null;
                      break e;
                    }
                    if (((s = He(s.nextSibling)), s === null)) {
                      s = null;
                      break e;
                    }
                  }
                  (r = s.data), (s = r === "F!" || r === "F" ? s : null);
                }
                if (s) {
                  (wt = He(s.nextSibling)), (i = s.data === "F!");
                  break t;
                }
              }
              aa(i);
            }
            i = !1;
          }
          i && (e = n[0]);
        }
      }
      return (
        (n = ce()),
        (n.memoizedState = n.baseState = e),
        (i = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Tp,
          lastRenderedState: e,
        }),
        (n.queue = i),
        (n = Yp.bind(null, rt, i)),
        (i.dispatch = n),
        (i = wr(!1)),
        (r = qr.bind(null, rt, !1, i.queue)),
        (i = ce()),
        (s = { state: e, dispatch: null, action: t, pending: null }),
        (i.queue = s),
        (n = rx.bind(null, rt, s, r, n)),
        (s.dispatch = n),
        (i.memoizedState = t),
        [e, n, !1]
      );
    }
    function Ap(t) {
      var e = Yt();
      return Ep(e, bt, t);
    }
    function Ep(t, e, n) {
      if (
        ((e = _r(t, e, Tp)[0]),
        (t = vs(ln)[0]),
        typeof e == "object" && e !== null && typeof e.then == "function")
      )
        try {
          var i = Ii(e);
        } catch (f) {
          throw f === ki ? hs : f;
        }
      else i = e;
      e = Yt();
      var s = e.queue,
        r = s.dispatch;
      return (
        n !== e.memoizedState &&
          ((rt.flags |= 2048), Qa(9, Ss(), cx.bind(null, s, n), null)),
        [i, r, t]
      );
    }
    function cx(t, e) {
      t.action = e;
    }
    function Mp(t) {
      var e = Yt(),
        n = bt;
      if (n !== null) return Ep(e, n, t);
      Yt(), (e = e.memoizedState), (n = Yt());
      var i = n.queue.dispatch;
      return (n.memoizedState = t), [e, i, !1];
    }
    function Qa(t, e, n, i) {
      return (
        (t = { tag: t, create: n, deps: i, inst: e, next: null }),
        (e = rt.updateQueue),
        e === null && ((e = zr()), (rt.updateQueue = e)),
        (n = e.lastEffect),
        n === null
          ? (e.lastEffect = t.next = t)
          : ((i = n.next), (n.next = t), (t.next = i), (e.lastEffect = t)),
        t
      );
    }
    function Ss() {
      return { destroy: void 0, resource: void 0 };
    }
    function Dp() {
      return Yt().memoizedState;
    }
    function bs(t, e, n, i) {
      var s = ce();
      (i = i === void 0 ? null : i),
        (rt.flags |= t),
        (s.memoizedState = Qa(1 | e, Ss(), n, i));
    }
    function tl(t, e, n, i) {
      var s = Yt();
      i = i === void 0 ? null : i;
      var r = s.memoizedState.inst;
      bt !== null && i !== null && Mr(i, bt.memoizedState.deps)
        ? (s.memoizedState = Qa(e, r, n, i))
        : ((rt.flags |= t), (s.memoizedState = Qa(1 | e, r, n, i)));
    }
    function Rp(t, e) {
      bs(8390656, 8, t, e);
    }
    function Cp(t, e) {
      tl(2048, 8, t, e);
    }
    function Op(t, e) {
      return tl(4, 2, t, e);
    }
    function zp(t, e) {
      return tl(4, 4, t, e);
    }
    function Vp(t, e) {
      if (typeof e == "function") {
        t = t();
        var n = e(t);
        return function () {
          typeof n == "function" ? n() : e(null);
        };
      }
      if (e != null)
        return (
          (t = t()),
          (e.current = t),
          function () {
            e.current = null;
          }
        );
    }
    function _p(t, e, n) {
      (n = n != null ? n.concat([t]) : null), tl(4, 4, Vp.bind(null, e, t), n);
    }
    function Br() {}
    function Up(t, e) {
      var n = Yt();
      e = e === void 0 ? null : e;
      var i = n.memoizedState;
      return e !== null && Mr(e, i[1]) ? i[0] : ((n.memoizedState = [t, e]), t);
    }
    function wp(t, e) {
      var n = Yt();
      e = e === void 0 ? null : e;
      var i = n.memoizedState;
      if (e !== null && Mr(e, i[1])) return i[0];
      if (((i = t()), ua)) {
        vn(!0);
        try {
          t();
        } finally {
          vn(!1);
        }
      }
      return (n.memoizedState = [i, e]), i;
    }
    function Nr(t, e, n) {
      return n === void 0 || (Mn & 1073741824) !== 0
        ? (t.memoizedState = e)
        : ((t.memoizedState = n), (t = Ny()), (rt.lanes |= t), (_n |= t), n);
    }
    function jp(t, e, n, i) {
      return ye(n, e)
        ? n
        : Ga.current !== null
        ? ((t = Nr(t, n, i)), ye(t, e) || (Qt = !0), t)
        : (Mn & 42) === 0
        ? ((Qt = !0), (t.memoizedState = n))
        : ((t = Ny()), (rt.lanes |= t), (_n |= t), e);
    }
    function Bp(t, e, n, i, s) {
      var r = N.p;
      N.p = r !== 0 && 8 > r ? r : 8;
      var f = z.T,
        y = {};
      (z.T = y), qr(t, !1, e, n);
      try {
        var b = s(),
          D = z.S;
        if (
          (D !== null && D(y, b),
          b !== null && typeof b == "object" && typeof b.then == "function")
        ) {
          var _ = sx(b, i);
          el(t, e, _, Te(t));
        } else el(t, e, i, Te(t));
      } catch (j) {
        el(t, e, { then: function () {}, status: "rejected", reason: j }, Te());
      } finally {
        (N.p = r), (z.T = f);
      }
    }
    function fx() {}
    function Lr(t, e, n, i) {
      if (t.tag !== 5) throw Error(o(476));
      var s = Np(t).queue;
      Bp(
        t,
        s,
        e,
        J,
        n === null
          ? fx
          : function () {
              return Lp(t), n(i);
            }
      );
    }
    function Np(t) {
      var e = t.memoizedState;
      if (e !== null) return e;
      e = {
        memoizedState: J,
        baseState: J,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ln,
          lastRenderedState: J,
        },
        next: null,
      };
      var n = {};
      return (
        (e.next = {
          memoizedState: n,
          baseState: n,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: ln,
            lastRenderedState: n,
          },
          next: null,
        }),
        (t.memoizedState = e),
        (t = t.alternate),
        t !== null && (t.memoizedState = e),
        e
      );
    }
    function Lp(t) {
      var e = Np(t).next.queue;
      el(t, e, {}, Te());
    }
    function Hr() {
      return ne(Sl);
    }
    function Hp() {
      return Yt().memoizedState;
    }
    function qp() {
      return Yt().memoizedState;
    }
    function hx(t) {
      for (var e = t.return; e !== null; ) {
        switch (e.tag) {
          case 24:
          case 3:
            var n = Te();
            t = An(n);
            var i = En(e, t, n);
            i !== null && (xe(i, e, n), Pi(i, e, n)),
              (e = { cache: pr() }),
              (t.payload = e);
            return;
        }
        e = e.return;
      }
    }
    function dx(t, e, n) {
      var i = Te();
      (n = {
        lane: i,
        revertLane: 0,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
        Ts(t)
          ? Gp(e, n)
          : ((n = lr(t, e, n, i)), n !== null && (xe(n, t, i), Xp(n, e, i)));
    }
    function Yp(t, e, n) {
      var i = Te();
      el(t, e, n, i);
    }
    function el(t, e, n, i) {
      var s = {
        lane: i,
        revertLane: 0,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if (Ts(t)) Gp(e, s);
      else {
        var r = t.alternate;
        if (
          t.lanes === 0 &&
          (r === null || r.lanes === 0) &&
          ((r = e.lastRenderedReducer), r !== null)
        )
          try {
            var f = e.lastRenderedState,
              y = r(f, n);
            if (((s.hasEagerState = !0), (s.eagerState = y), ye(y, f)))
              return is(t, e, s, 0), Mt === null && as(), !1;
          } catch {
          } finally {
          }
        if (((n = lr(t, e, s, i)), n !== null))
          return xe(n, t, i), Xp(n, e, i), !0;
      }
      return !1;
    }
    function qr(t, e, n, i) {
      if (
        ((i = {
          lane: 2,
          revertLane: vc(),
          action: i,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        Ts(t))
      ) {
        if (e) throw Error(o(479));
      } else (e = lr(t, n, i, 2)), e !== null && xe(e, t, 2);
    }
    function Ts(t) {
      var e = t.alternate;
      return t === rt || (e !== null && e === rt);
    }
    function Gp(t, e) {
      Xa = ps = !0;
      var n = t.pending;
      n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
        (t.pending = e);
    }
    function Xp(t, e, n) {
      if ((n & 4194048) !== 0) {
        var i = e.lanes;
        (i &= t.pendingLanes), (n |= i), (e.lanes = n), $d(t, n);
      }
    }
    var xs = {
        readContext: ne,
        use: gs,
        useCallback: Nt,
        useContext: Nt,
        useEffect: Nt,
        useImperativeHandle: Nt,
        useLayoutEffect: Nt,
        useInsertionEffect: Nt,
        useMemo: Nt,
        useReducer: Nt,
        useRef: Nt,
        useState: Nt,
        useDebugValue: Nt,
        useDeferredValue: Nt,
        useTransition: Nt,
        useSyncExternalStore: Nt,
        useId: Nt,
        useHostTransitionStatus: Nt,
        useFormState: Nt,
        useActionState: Nt,
        useOptimistic: Nt,
        useMemoCache: Nt,
        useCacheRefresh: Nt,
      },
      Zp = {
        readContext: ne,
        use: gs,
        useCallback: function (t, e) {
          return (ce().memoizedState = [t, e === void 0 ? null : e]), t;
        },
        useContext: ne,
        useEffect: Rp,
        useImperativeHandle: function (t, e, n) {
          (n = n != null ? n.concat([t]) : null),
            bs(4194308, 4, Vp.bind(null, e, t), n);
        },
        useLayoutEffect: function (t, e) {
          return bs(4194308, 4, t, e);
        },
        useInsertionEffect: function (t, e) {
          bs(4, 2, t, e);
        },
        useMemo: function (t, e) {
          var n = ce();
          e = e === void 0 ? null : e;
          var i = t();
          if (ua) {
            vn(!0);
            try {
              t();
            } finally {
              vn(!1);
            }
          }
          return (n.memoizedState = [i, e]), i;
        },
        useReducer: function (t, e, n) {
          var i = ce();
          if (n !== void 0) {
            var s = n(e);
            if (ua) {
              vn(!0);
              try {
                n(e);
              } finally {
                vn(!1);
              }
            }
          } else s = e;
          return (
            (i.memoizedState = i.baseState = s),
            (t = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: t,
              lastRenderedState: s,
            }),
            (i.queue = t),
            (t = t.dispatch = dx.bind(null, rt, t)),
            [i.memoizedState, t]
          );
        },
        useRef: function (t) {
          var e = ce();
          return (t = { current: t }), (e.memoizedState = t);
        },
        useState: function (t) {
          t = wr(t);
          var e = t.queue,
            n = Yp.bind(null, rt, e);
          return (e.dispatch = n), [t.memoizedState, n];
        },
        useDebugValue: Br,
        useDeferredValue: function (t, e) {
          var n = ce();
          return Nr(n, t, e);
        },
        useTransition: function () {
          var t = wr(!1);
          return (
            (t = Bp.bind(null, rt, t.queue, !0, !1)),
            (ce().memoizedState = t),
            [!1, t]
          );
        },
        useSyncExternalStore: function (t, e, n) {
          var i = rt,
            s = ce();
          if (yt) {
            if (n === void 0) throw Error(o(407));
            n = n();
          } else {
            if (((n = e()), Mt === null)) throw Error(o(349));
            (dt & 124) !== 0 || fp(i, e, n);
          }
          s.memoizedState = n;
          var r = { value: n, getSnapshot: e };
          return (
            (s.queue = r),
            Rp(dp.bind(null, i, r, t), [t]),
            (i.flags |= 2048),
            Qa(9, Ss(), hp.bind(null, i, r, n, e), null),
            n
          );
        },
        useId: function () {
          var t = ce(),
            e = Mt.identifierPrefix;
          if (yt) {
            var n = en,
              i = tn;
            (n = (i & ~(1 << (32 - pe(i) - 1))).toString(32) + n),
              (e = "«" + e + "R" + n),
              (n = ys++),
              0 < n && (e += "H" + n.toString(32)),
              (e += "»");
          } else (n = ux++), (e = "«" + e + "r" + n.toString(32) + "»");
          return (t.memoizedState = e);
        },
        useHostTransitionStatus: Hr,
        useFormState: xp,
        useActionState: xp,
        useOptimistic: function (t) {
          var e = ce();
          e.memoizedState = e.baseState = t;
          var n = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null,
          };
          return (
            (e.queue = n),
            (e = qr.bind(null, rt, !0, n)),
            (n.dispatch = e),
            [t, e]
          );
        },
        useMemoCache: Vr,
        useCacheRefresh: function () {
          return (ce().memoizedState = hx.bind(null, rt));
        },
      },
      Qp = {
        readContext: ne,
        use: gs,
        useCallback: Up,
        useContext: ne,
        useEffect: Cp,
        useImperativeHandle: _p,
        useInsertionEffect: Op,
        useLayoutEffect: zp,
        useMemo: wp,
        useReducer: vs,
        useRef: Dp,
        useState: function () {
          return vs(ln);
        },
        useDebugValue: Br,
        useDeferredValue: function (t, e) {
          var n = Yt();
          return jp(n, bt.memoizedState, t, e);
        },
        useTransition: function () {
          var t = vs(ln)[0],
            e = Yt().memoizedState;
          return [typeof t == "boolean" ? t : Ii(t), e];
        },
        useSyncExternalStore: cp,
        useId: Hp,
        useHostTransitionStatus: Hr,
        useFormState: Ap,
        useActionState: Ap,
        useOptimistic: function (t, e) {
          var n = Yt();
          return yp(n, bt, t, e);
        },
        useMemoCache: Vr,
        useCacheRefresh: qp,
      },
      mx = {
        readContext: ne,
        use: gs,
        useCallback: Up,
        useContext: ne,
        useEffect: Cp,
        useImperativeHandle: _p,
        useInsertionEffect: Op,
        useLayoutEffect: zp,
        useMemo: wp,
        useReducer: Ur,
        useRef: Dp,
        useState: function () {
          return Ur(ln);
        },
        useDebugValue: Br,
        useDeferredValue: function (t, e) {
          var n = Yt();
          return bt === null ? Nr(n, t, e) : jp(n, bt.memoizedState, t, e);
        },
        useTransition: function () {
          var t = Ur(ln)[0],
            e = Yt().memoizedState;
          return [typeof t == "boolean" ? t : Ii(t), e];
        },
        useSyncExternalStore: cp,
        useId: Hp,
        useHostTransitionStatus: Hr,
        useFormState: Mp,
        useActionState: Mp,
        useOptimistic: function (t, e) {
          var n = Yt();
          return bt !== null
            ? yp(n, bt, t, e)
            : ((n.baseState = t), [t, n.queue.dispatch]);
        },
        useMemoCache: Vr,
        useCacheRefresh: qp,
      },
      Ka = null,
      nl = 0;
    function As(t) {
      var e = nl;
      return (nl += 1), Ka === null && (Ka = []), np(Ka, t, e);
    }
    function al(t, e) {
      (e = e.props.ref), (t.ref = e !== void 0 ? e : null);
    }
    function Es(t, e) {
      throw e.$$typeof === T
        ? Error(o(525))
        : ((t = Object.prototype.toString.call(e)),
          Error(
            o(
              31,
              t === "[object Object]"
                ? "object with keys {" + Object.keys(e).join(", ") + "}"
                : t
            )
          ));
    }
    function Kp(t) {
      var e = t._init;
      return e(t._payload);
    }
    function kp(t) {
      function e(E, A) {
        if (t) {
          var M = E.deletions;
          M === null ? ((E.deletions = [A]), (E.flags |= 16)) : M.push(A);
        }
      }
      function n(E, A) {
        if (!t) return null;
        for (; A !== null; ) e(E, A), (A = A.sibling);
        return null;
      }
      function i(E) {
        for (var A = new Map(); E !== null; )
          E.key !== null ? A.set(E.key, E) : A.set(E.index, E), (E = E.sibling);
        return A;
      }
      function s(E, A) {
        return (E = Ie(E, A)), (E.index = 0), (E.sibling = null), E;
      }
      function r(E, A, M) {
        return (
          (E.index = M),
          t
            ? ((M = E.alternate),
              M !== null
                ? ((M = M.index), M < A ? ((E.flags |= 67108866), A) : M)
                : ((E.flags |= 67108866), A))
            : ((E.flags |= 1048576), A)
        );
      }
      function f(E) {
        return t && E.alternate === null && (E.flags |= 67108866), E;
      }
      function y(E, A, M, U) {
        return A === null || A.tag !== 6
          ? ((A = ur(M, E.mode, U)), (A.return = E), A)
          : ((A = s(A, M)), (A.return = E), A);
      }
      function b(E, A, M, U) {
        var P = M.type;
        return P === w
          ? _(E, A, M.props.children, U, M.key)
          : A !== null &&
            (A.elementType === P ||
              (typeof P == "object" &&
                P !== null &&
                P.$$typeof === F &&
                Kp(P) === A.type))
          ? ((A = s(A, M.props)), al(A, M), (A.return = E), A)
          : ((A = ss(M.type, M.key, M.props, null, E.mode, U)),
            al(A, M),
            (A.return = E),
            A);
      }
      function D(E, A, M, U) {
        return A === null ||
          A.tag !== 4 ||
          A.stateNode.containerInfo !== M.containerInfo ||
          A.stateNode.implementation !== M.implementation
          ? ((A = or(M, E.mode, U)), (A.return = E), A)
          : ((A = s(A, M.children || [])), (A.return = E), A);
      }
      function _(E, A, M, U, P) {
        return A === null || A.tag !== 7
          ? ((A = In(M, E.mode, U, P)), (A.return = E), A)
          : ((A = s(A, M)), (A.return = E), A);
      }
      function j(E, A, M) {
        if (
          (typeof A == "string" && A !== "") ||
          typeof A == "number" ||
          typeof A == "bigint"
        )
          return (A = ur("" + A, E.mode, M)), (A.return = E), A;
        if (typeof A == "object" && A !== null) {
          switch (A.$$typeof) {
            case x:
              return (
                (M = ss(A.type, A.key, A.props, null, E.mode, M)),
                al(M, A),
                (M.return = E),
                M
              );
            case V:
              return (A = or(A, E.mode, M)), (A.return = E), A;
            case F:
              var U = A._init;
              return (A = U(A._payload)), j(E, A, M);
          }
          if (Dt(A) || Ct(A))
            return (A = In(A, E.mode, M, null)), (A.return = E), A;
          if (typeof A.then == "function") return j(E, As(A), M);
          if (A.$$typeof === Y) return j(E, cs(E, A), M);
          Es(E, A);
        }
        return null;
      }
      function R(E, A, M, U) {
        var P = A !== null ? A.key : null;
        if (
          (typeof M == "string" && M !== "") ||
          typeof M == "number" ||
          typeof M == "bigint"
        )
          return P !== null ? null : y(E, A, "" + M, U);
        if (typeof M == "object" && M !== null) {
          switch (M.$$typeof) {
            case x:
              return M.key === P ? b(E, A, M, U) : null;
            case V:
              return M.key === P ? D(E, A, M, U) : null;
            case F:
              return (P = M._init), (M = P(M._payload)), R(E, A, M, U);
          }
          if (Dt(M) || Ct(M)) return P !== null ? null : _(E, A, M, U, null);
          if (typeof M.then == "function") return R(E, A, As(M), U);
          if (M.$$typeof === Y) return R(E, A, cs(E, M), U);
          Es(E, M);
        }
        return null;
      }
      function C(E, A, M, U, P) {
        if (
          (typeof U == "string" && U !== "") ||
          typeof U == "number" ||
          typeof U == "bigint"
        )
          return (E = E.get(M) || null), y(A, E, "" + U, P);
        if (typeof U == "object" && U !== null) {
          switch (U.$$typeof) {
            case x:
              return (
                (E = E.get(U.key === null ? M : U.key) || null), b(A, E, U, P)
              );
            case V:
              return (
                (E = E.get(U.key === null ? M : U.key) || null), D(A, E, U, P)
              );
            case F:
              var ct = U._init;
              return (U = ct(U._payload)), C(E, A, M, U, P);
          }
          if (Dt(U) || Ct(U))
            return (E = E.get(M) || null), _(A, E, U, P, null);
          if (typeof U.then == "function") return C(E, A, M, As(U), P);
          if (U.$$typeof === Y) return C(E, A, M, cs(A, U), P);
          Es(A, U);
        }
        return null;
      }
      function it(E, A, M, U) {
        for (
          var P = null, ct = null, W = A, nt = (A = 0), kt = null;
          W !== null && nt < M.length;
          nt++
        ) {
          W.index > nt ? ((kt = W), (W = null)) : (kt = W.sibling);
          var pt = R(E, W, M[nt], U);
          if (pt === null) {
            W === null && (W = kt);
            break;
          }
          t && W && pt.alternate === null && e(E, W),
            (A = r(pt, A, nt)),
            ct === null ? (P = pt) : (ct.sibling = pt),
            (ct = pt),
            (W = kt);
        }
        if (nt === M.length) return n(E, W), yt && ea(E, nt), P;
        if (W === null) {
          for (; nt < M.length; nt++)
            (W = j(E, M[nt], U)),
              W !== null &&
                ((A = r(W, A, nt)),
                ct === null ? (P = W) : (ct.sibling = W),
                (ct = W));
          return yt && ea(E, nt), P;
        }
        for (W = i(W); nt < M.length; nt++)
          (kt = C(W, E, nt, M[nt], U)),
            kt !== null &&
              (t &&
                kt.alternate !== null &&
                W.delete(kt.key === null ? nt : kt.key),
              (A = r(kt, A, nt)),
              ct === null ? (P = kt) : (ct.sibling = kt),
              (ct = kt));
        return (
          t &&
            W.forEach(function (Yn) {
              return e(E, Yn);
            }),
          yt && ea(E, nt),
          P
        );
      }
      function et(E, A, M, U) {
        if (M == null) throw Error(o(151));
        for (
          var P = null,
            ct = null,
            W = A,
            nt = (A = 0),
            kt = null,
            pt = M.next();
          W !== null && !pt.done;
          nt++, pt = M.next()
        ) {
          W.index > nt ? ((kt = W), (W = null)) : (kt = W.sibling);
          var Yn = R(E, W, pt.value, U);
          if (Yn === null) {
            W === null && (W = kt);
            break;
          }
          t && W && Yn.alternate === null && e(E, W),
            (A = r(Yn, A, nt)),
            ct === null ? (P = Yn) : (ct.sibling = Yn),
            (ct = Yn),
            (W = kt);
        }
        if (pt.done) return n(E, W), yt && ea(E, nt), P;
        if (W === null) {
          for (; !pt.done; nt++, pt = M.next())
            (pt = j(E, pt.value, U)),
              pt !== null &&
                ((A = r(pt, A, nt)),
                ct === null ? (P = pt) : (ct.sibling = pt),
                (ct = pt));
          return yt && ea(E, nt), P;
        }
        for (W = i(W); !pt.done; nt++, pt = M.next())
          (pt = C(W, E, nt, pt.value, U)),
            pt !== null &&
              (t &&
                pt.alternate !== null &&
                W.delete(pt.key === null ? nt : pt.key),
              (A = r(pt, A, nt)),
              ct === null ? (P = pt) : (ct.sibling = pt),
              (ct = pt));
        return (
          t &&
            W.forEach(function (p2) {
              return e(E, p2);
            }),
          yt && ea(E, nt),
          P
        );
      }
      function xt(E, A, M, U) {
        if (
          (typeof M == "object" &&
            M !== null &&
            M.type === w &&
            M.key === null &&
            (M = M.props.children),
          typeof M == "object" && M !== null)
        ) {
          switch (M.$$typeof) {
            case x:
              t: {
                for (var P = M.key; A !== null; ) {
                  if (A.key === P) {
                    if (((P = M.type), P === w)) {
                      if (A.tag === 7) {
                        n(E, A.sibling),
                          (U = s(A, M.props.children)),
                          (U.return = E),
                          (E = U);
                        break t;
                      }
                    } else if (
                      A.elementType === P ||
                      (typeof P == "object" &&
                        P !== null &&
                        P.$$typeof === F &&
                        Kp(P) === A.type)
                    ) {
                      n(E, A.sibling),
                        (U = s(A, M.props)),
                        al(U, M),
                        (U.return = E),
                        (E = U);
                      break t;
                    }
                    n(E, A);
                    break;
                  } else e(E, A);
                  A = A.sibling;
                }
                M.type === w
                  ? ((U = In(M.props.children, E.mode, U, M.key)),
                    (U.return = E),
                    (E = U))
                  : ((U = ss(M.type, M.key, M.props, null, E.mode, U)),
                    al(U, M),
                    (U.return = E),
                    (E = U));
              }
              return f(E);
            case V:
              t: {
                for (P = M.key; A !== null; ) {
                  if (A.key === P)
                    if (
                      A.tag === 4 &&
                      A.stateNode.containerInfo === M.containerInfo &&
                      A.stateNode.implementation === M.implementation
                    ) {
                      n(E, A.sibling),
                        (U = s(A, M.children || [])),
                        (U.return = E),
                        (E = U);
                      break t;
                    } else {
                      n(E, A);
                      break;
                    }
                  else e(E, A);
                  A = A.sibling;
                }
                (U = or(M, E.mode, U)), (U.return = E), (E = U);
              }
              return f(E);
            case F:
              return (P = M._init), (M = P(M._payload)), xt(E, A, M, U);
          }
          if (Dt(M)) return it(E, A, M, U);
          if (Ct(M)) {
            if (((P = Ct(M)), typeof P != "function")) throw Error(o(150));
            return (M = P.call(M)), et(E, A, M, U);
          }
          if (typeof M.then == "function") return xt(E, A, As(M), U);
          if (M.$$typeof === Y) return xt(E, A, cs(E, M), U);
          Es(E, M);
        }
        return (typeof M == "string" && M !== "") ||
          typeof M == "number" ||
          typeof M == "bigint"
          ? ((M = "" + M),
            A !== null && A.tag === 6
              ? (n(E, A.sibling), (U = s(A, M)), (U.return = E), (E = U))
              : (n(E, A), (U = ur(M, E.mode, U)), (U.return = E), (E = U)),
            f(E))
          : n(E, A);
      }
      return function (E, A, M, U) {
        try {
          nl = 0;
          var P = xt(E, A, M, U);
          return (Ka = null), P;
        } catch (W) {
          if (W === ki || W === hs) throw W;
          var ct = ge(29, W, null, E.mode);
          return (ct.lanes = U), (ct.return = E), ct;
        } finally {
        }
      };
    }
    var ka = kp(!0),
      Jp = kp(!1),
      Ue = O(null),
      Qe = null;
    function Dn(t) {
      var e = t.alternate;
      X(Xt, Xt.current & 1),
        X(Ue, t),
        Qe === null &&
          (e === null || Ga.current !== null || e.memoizedState !== null) &&
          (Qe = t);
    }
    function Pp(t) {
      if (t.tag === 22) {
        if ((X(Xt, Xt.current), X(Ue, t), Qe === null)) {
          var e = t.alternate;
          e !== null && e.memoizedState !== null && (Qe = t);
        }
      } else Rn();
    }
    function Rn() {
      X(Xt, Xt.current), X(Ue, Ue.current);
    }
    function sn(t) {
      H(Ue), Qe === t && (Qe = null), H(Xt);
    }
    var Xt = O(0);
    function Ms(t) {
      for (var e = t; e !== null; ) {
        if (e.tag === 13) {
          var n = e.memoizedState;
          if (
            n !== null &&
            ((n = n.dehydrated), n === null || n.data === "$?" || zc(n))
          )
            return e;
        } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
          if ((e.flags & 128) !== 0) return e;
        } else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return null;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
      return null;
    }
    function Yr(t, e, n, i) {
      (e = t.memoizedState),
        (n = n(i, e)),
        (n = n == null ? e : v({}, e, n)),
        (t.memoizedState = n),
        t.lanes === 0 && (t.updateQueue.baseState = n);
    }
    var Gr = {
      enqueueSetState: function (t, e, n) {
        t = t._reactInternals;
        var i = Te(),
          s = An(i);
        (s.payload = e),
          n != null && (s.callback = n),
          (e = En(t, s, i)),
          e !== null && (xe(e, t, i), Pi(e, t, i));
      },
      enqueueReplaceState: function (t, e, n) {
        t = t._reactInternals;
        var i = Te(),
          s = An(i);
        (s.tag = 1),
          (s.payload = e),
          n != null && (s.callback = n),
          (e = En(t, s, i)),
          e !== null && (xe(e, t, i), Pi(e, t, i));
      },
      enqueueForceUpdate: function (t, e) {
        t = t._reactInternals;
        var n = Te(),
          i = An(n);
        (i.tag = 2),
          e != null && (i.callback = e),
          (e = En(t, i, n)),
          e !== null && (xe(e, t, n), Pi(e, t, n));
      },
    };
    function Fp(t, e, n, i, s, r, f) {
      return (
        (t = t.stateNode),
        typeof t.shouldComponentUpdate == "function"
          ? t.shouldComponentUpdate(i, r, f)
          : e.prototype && e.prototype.isPureReactComponent
          ? !Hi(n, i) || !Hi(s, r)
          : !0
      );
    }
    function $p(t, e, n, i) {
      (t = e.state),
        typeof e.componentWillReceiveProps == "function" &&
          e.componentWillReceiveProps(n, i),
        typeof e.UNSAFE_componentWillReceiveProps == "function" &&
          e.UNSAFE_componentWillReceiveProps(n, i),
        e.state !== t && Gr.enqueueReplaceState(e, e.state, null);
    }
    function oa(t, e) {
      var n = e;
      if ("ref" in e) {
        n = {};
        for (var i in e) i !== "ref" && (n[i] = e[i]);
      }
      if ((t = t.defaultProps)) {
        n === e && (n = v({}, n));
        for (var s in t) n[s] === void 0 && (n[s] = t[s]);
      }
      return n;
    }
    var Ds =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var e = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" &&
                  t !== null &&
                  typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          };
    function Wp(t) {
      Ds(t);
    }
    function Ip(t) {
      console.error(t);
    }
    function ty(t) {
      Ds(t);
    }
    function Rs(t, e) {
      try {
        var n = t.onUncaughtError;
        n(e.value, { componentStack: e.stack });
      } catch (i) {
        setTimeout(function () {
          throw i;
        });
      }
    }
    function ey(t, e, n) {
      try {
        var i = t.onCaughtError;
        i(n.value, {
          componentStack: n.stack,
          errorBoundary: e.tag === 1 ? e.stateNode : null,
        });
      } catch (s) {
        setTimeout(function () {
          throw s;
        });
      }
    }
    function Xr(t, e, n) {
      return (
        (n = An(n)),
        (n.tag = 3),
        (n.payload = { element: null }),
        (n.callback = function () {
          Rs(t, e);
        }),
        n
      );
    }
    function ny(t) {
      return (t = An(t)), (t.tag = 3), t;
    }
    function ay(t, e, n, i) {
      var s = n.type.getDerivedStateFromError;
      if (typeof s == "function") {
        var r = i.value;
        (t.payload = function () {
          return s(r);
        }),
          (t.callback = function () {
            ey(e, n, i);
          });
      }
      var f = n.stateNode;
      f !== null &&
        typeof f.componentDidCatch == "function" &&
        (t.callback = function () {
          ey(e, n, i),
            typeof s != "function" &&
              (Un === null ? (Un = new Set([this])) : Un.add(this));
          var y = i.stack;
          this.componentDidCatch(i.value, {
            componentStack: y !== null ? y : "",
          });
        });
    }
    function px(t, e, n, i, s) {
      if (
        ((n.flags |= 32768),
        i !== null && typeof i == "object" && typeof i.then == "function")
      ) {
        if (
          ((e = n.alternate),
          e !== null && Zi(e, n, s, !0),
          (n = Ue.current),
          n !== null)
        ) {
          switch (n.tag) {
            case 13:
              return (
                Qe === null
                  ? dc()
                  : n.alternate === null && jt === 0 && (jt = 3),
                (n.flags &= -257),
                (n.flags |= 65536),
                (n.lanes = s),
                i === vr
                  ? (n.flags |= 16384)
                  : ((e = n.updateQueue),
                    e === null ? (n.updateQueue = new Set([i])) : e.add(i),
                    pc(t, i, s)),
                !1
              );
            case 22:
              return (
                (n.flags |= 65536),
                i === vr
                  ? (n.flags |= 16384)
                  : ((e = n.updateQueue),
                    e === null
                      ? ((e = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([i]),
                        }),
                        (n.updateQueue = e))
                      : ((n = e.retryQueue),
                        n === null ? (e.retryQueue = new Set([i])) : n.add(i)),
                    pc(t, i, s)),
                !1
              );
          }
          throw Error(o(435, n.tag));
        }
        return pc(t, i, s), dc(), !1;
      }
      if (yt)
        return (
          (e = Ue.current),
          e !== null
            ? ((e.flags & 65536) === 0 && (e.flags |= 256),
              (e.flags |= 65536),
              (e.lanes = s),
              i !== fr && ((t = Error(o(422), { cause: i })), Xi(Oe(t, n))))
            : (i !== fr && ((e = Error(o(423), { cause: i })), Xi(Oe(e, n))),
              (t = t.current.alternate),
              (t.flags |= 65536),
              (s &= -s),
              (t.lanes |= s),
              (i = Oe(i, n)),
              (s = Xr(t.stateNode, i, s)),
              Tr(t, s),
              jt !== 4 && (jt = 2)),
          !1
        );
      var r = Error(o(520), { cause: i });
      if (
        ((r = Oe(r, n)),
        cl === null ? (cl = [r]) : cl.push(r),
        jt !== 4 && (jt = 2),
        e === null)
      )
        return !0;
      (i = Oe(i, n)), (n = e);
      do {
        switch (n.tag) {
          case 3:
            return (
              (n.flags |= 65536),
              (t = s & -s),
              (n.lanes |= t),
              (t = Xr(n.stateNode, i, t)),
              Tr(n, t),
              !1
            );
          case 1:
            if (
              ((e = n.type),
              (r = n.stateNode),
              (n.flags & 128) === 0 &&
                (typeof e.getDerivedStateFromError == "function" ||
                  (r !== null &&
                    typeof r.componentDidCatch == "function" &&
                    (Un === null || !Un.has(r)))))
            )
              return (
                (n.flags |= 65536),
                (s &= -s),
                (n.lanes |= s),
                (s = ny(s)),
                ay(s, t, n, i),
                Tr(n, s),
                !1
              );
        }
        n = n.return;
      } while (n !== null);
      return !1;
    }
    var iy = Error(o(461)),
      Qt = !1;
    function Pt(t, e, n, i) {
      e.child = t === null ? Jp(e, null, n, i) : ka(e, t.child, n, i);
    }
    function ly(t, e, n, i, s) {
      n = n.render;
      var r = e.ref;
      if ("ref" in i) {
        var f = {};
        for (var y in i) y !== "ref" && (f[y] = i[y]);
      } else f = i;
      return (
        la(e),
        (i = Dr(t, e, n, f, r, s)),
        (y = Rr()),
        t !== null && !Qt
          ? (Cr(t, e, s), un(t, e, s))
          : (yt && y && rr(e), (e.flags |= 1), Pt(t, e, i, s), e.child)
      );
    }
    function sy(t, e, n, i, s) {
      if (t === null) {
        var r = n.type;
        return typeof r == "function" &&
          !sr(r) &&
          r.defaultProps === void 0 &&
          n.compare === null
          ? ((e.tag = 15), (e.type = r), uy(t, e, r, i, s))
          : ((t = ss(n.type, null, i, e, e.mode, s)),
            (t.ref = e.ref),
            (t.return = e),
            (e.child = t));
      }
      if (((r = t.child), !$r(t, s))) {
        var f = r.memoizedProps;
        if (
          ((n = n.compare),
          (n = n !== null ? n : Hi),
          n(f, i) && t.ref === e.ref)
        )
          return un(t, e, s);
      }
      return (
        (e.flags |= 1),
        (t = Ie(r, i)),
        (t.ref = e.ref),
        (t.return = e),
        (e.child = t)
      );
    }
    function uy(t, e, n, i, s) {
      if (t !== null) {
        var r = t.memoizedProps;
        if (Hi(r, i) && t.ref === e.ref)
          if (((Qt = !1), (e.pendingProps = i = r), $r(t, s)))
            (t.flags & 131072) !== 0 && (Qt = !0);
          else return (e.lanes = t.lanes), un(t, e, s);
      }
      return Zr(t, e, n, i, s);
    }
    function oy(t, e, n) {
      var i = e.pendingProps,
        s = i.children,
        r = t !== null ? t.memoizedState : null;
      if (i.mode === "hidden") {
        if ((e.flags & 128) !== 0) {
          if (((i = r !== null ? r.baseLanes | n : n), t !== null)) {
            for (s = e.child = t.child, r = 0; s !== null; )
              (r = r | s.lanes | s.childLanes), (s = s.sibling);
            e.childLanes = r & ~i;
          } else (e.childLanes = 0), (e.child = null);
          return ry(t, e, i, n);
        }
        if ((n & 536870912) !== 0)
          (e.memoizedState = { baseLanes: 0, cachePool: null }),
            t !== null && fs(e, r !== null ? r.cachePool : null),
            r !== null ? up(e, r) : Ar(),
            Pp(e);
        else
          return (
            (e.lanes = e.childLanes = 536870912),
            ry(t, e, r !== null ? r.baseLanes | n : n, n)
          );
      } else
        r !== null
          ? (fs(e, r.cachePool), up(e, r), Rn(), (e.memoizedState = null))
          : (t !== null && fs(e, null), Ar(), Rn());
      return Pt(t, e, s, n), e.child;
    }
    function ry(t, e, n, i) {
      var s = gr();
      return (
        (s = s === null ? null : { parent: Gt._currentValue, pool: s }),
        (e.memoizedState = { baseLanes: n, cachePool: s }),
        t !== null && fs(e, null),
        Ar(),
        Pp(e),
        t !== null && Zi(t, e, i, !0),
        null
      );
    }
    function Cs(t, e) {
      var n = e.ref;
      if (n === null) t !== null && t.ref !== null && (e.flags |= 4194816);
      else {
        if (typeof n != "function" && typeof n != "object") throw Error(o(284));
        (t === null || t.ref !== n) && (e.flags |= 4194816);
      }
    }
    function Zr(t, e, n, i, s) {
      return (
        la(e),
        (n = Dr(t, e, n, i, void 0, s)),
        (i = Rr()),
        t !== null && !Qt
          ? (Cr(t, e, s), un(t, e, s))
          : (yt && i && rr(e), (e.flags |= 1), Pt(t, e, n, s), e.child)
      );
    }
    function cy(t, e, n, i, s, r) {
      return (
        la(e),
        (e.updateQueue = null),
        (n = rp(e, i, n, s)),
        op(t),
        (i = Rr()),
        t !== null && !Qt
          ? (Cr(t, e, r), un(t, e, r))
          : (yt && i && rr(e), (e.flags |= 1), Pt(t, e, n, r), e.child)
      );
    }
    function fy(t, e, n, i, s) {
      if ((la(e), e.stateNode === null)) {
        var r = Na,
          f = n.contextType;
        typeof f == "object" && f !== null && (r = ne(f)),
          (r = new n(i, r)),
          (e.memoizedState =
            r.state !== null && r.state !== void 0 ? r.state : null),
          (r.updater = Gr),
          (e.stateNode = r),
          (r._reactInternals = e),
          (r = e.stateNode),
          (r.props = i),
          (r.state = e.memoizedState),
          (r.refs = {}),
          Sr(e),
          (f = n.contextType),
          (r.context = typeof f == "object" && f !== null ? ne(f) : Na),
          (r.state = e.memoizedState),
          (f = n.getDerivedStateFromProps),
          typeof f == "function" &&
            (Yr(e, n, f, i), (r.state = e.memoizedState)),
          typeof n.getDerivedStateFromProps == "function" ||
            typeof r.getSnapshotBeforeUpdate == "function" ||
            (typeof r.UNSAFE_componentWillMount != "function" &&
              typeof r.componentWillMount != "function") ||
            ((f = r.state),
            typeof r.componentWillMount == "function" && r.componentWillMount(),
            typeof r.UNSAFE_componentWillMount == "function" &&
              r.UNSAFE_componentWillMount(),
            f !== r.state && Gr.enqueueReplaceState(r, r.state, null),
            $i(e, i, r, s),
            Fi(),
            (r.state = e.memoizedState)),
          typeof r.componentDidMount == "function" && (e.flags |= 4194308),
          (i = !0);
      } else if (t === null) {
        r = e.stateNode;
        var y = e.memoizedProps,
          b = oa(n, y);
        r.props = b;
        var D = r.context,
          _ = n.contextType;
        (f = Na), typeof _ == "object" && _ !== null && (f = ne(_));
        var j = n.getDerivedStateFromProps;
        (_ =
          typeof j == "function" ||
          typeof r.getSnapshotBeforeUpdate == "function"),
          (y = e.pendingProps !== y),
          _ ||
            (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
              typeof r.componentWillReceiveProps != "function") ||
            ((y || D !== f) && $p(e, r, i, f)),
          (xn = !1);
        var R = e.memoizedState;
        (r.state = R),
          $i(e, i, r, s),
          Fi(),
          (D = e.memoizedState),
          y || R !== D || xn
            ? (typeof j == "function" &&
                (Yr(e, n, j, i), (D = e.memoizedState)),
              (b = xn || Fp(e, n, b, i, R, D, f))
                ? (_ ||
                    (typeof r.UNSAFE_componentWillMount != "function" &&
                      typeof r.componentWillMount != "function") ||
                    (typeof r.componentWillMount == "function" &&
                      r.componentWillMount(),
                    typeof r.UNSAFE_componentWillMount == "function" &&
                      r.UNSAFE_componentWillMount()),
                  typeof r.componentDidMount == "function" &&
                    (e.flags |= 4194308))
                : (typeof r.componentDidMount == "function" &&
                    (e.flags |= 4194308),
                  (e.memoizedProps = i),
                  (e.memoizedState = D)),
              (r.props = i),
              (r.state = D),
              (r.context = f),
              (i = b))
            : (typeof r.componentDidMount == "function" && (e.flags |= 4194308),
              (i = !1));
      } else {
        (r = e.stateNode),
          br(t, e),
          (f = e.memoizedProps),
          (_ = oa(n, f)),
          (r.props = _),
          (j = e.pendingProps),
          (R = r.context),
          (D = n.contextType),
          (b = Na),
          typeof D == "object" && D !== null && (b = ne(D)),
          (y = n.getDerivedStateFromProps),
          (D =
            typeof y == "function" ||
            typeof r.getSnapshotBeforeUpdate == "function") ||
            (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
              typeof r.componentWillReceiveProps != "function") ||
            ((f !== j || R !== b) && $p(e, r, i, b)),
          (xn = !1),
          (R = e.memoizedState),
          (r.state = R),
          $i(e, i, r, s),
          Fi();
        var C = e.memoizedState;
        f !== j ||
        R !== C ||
        xn ||
        (t !== null && t.dependencies !== null && rs(t.dependencies))
          ? (typeof y == "function" && (Yr(e, n, y, i), (C = e.memoizedState)),
            (_ =
              xn ||
              Fp(e, n, _, i, R, C, b) ||
              (t !== null && t.dependencies !== null && rs(t.dependencies)))
              ? (D ||
                  (typeof r.UNSAFE_componentWillUpdate != "function" &&
                    typeof r.componentWillUpdate != "function") ||
                  (typeof r.componentWillUpdate == "function" &&
                    r.componentWillUpdate(i, C, b),
                  typeof r.UNSAFE_componentWillUpdate == "function" &&
                    r.UNSAFE_componentWillUpdate(i, C, b)),
                typeof r.componentDidUpdate == "function" && (e.flags |= 4),
                typeof r.getSnapshotBeforeUpdate == "function" &&
                  (e.flags |= 1024))
              : (typeof r.componentDidUpdate != "function" ||
                  (f === t.memoizedProps && R === t.memoizedState) ||
                  (e.flags |= 4),
                typeof r.getSnapshotBeforeUpdate != "function" ||
                  (f === t.memoizedProps && R === t.memoizedState) ||
                  (e.flags |= 1024),
                (e.memoizedProps = i),
                (e.memoizedState = C)),
            (r.props = i),
            (r.state = C),
            (r.context = b),
            (i = _))
          : (typeof r.componentDidUpdate != "function" ||
              (f === t.memoizedProps && R === t.memoizedState) ||
              (e.flags |= 4),
            typeof r.getSnapshotBeforeUpdate != "function" ||
              (f === t.memoizedProps && R === t.memoizedState) ||
              (e.flags |= 1024),
            (i = !1));
      }
      return (
        (r = i),
        Cs(t, e),
        (i = (e.flags & 128) !== 0),
        r || i
          ? ((r = e.stateNode),
            (n =
              i && typeof n.getDerivedStateFromError != "function"
                ? null
                : r.render()),
            (e.flags |= 1),
            t !== null && i
              ? ((e.child = ka(e, t.child, null, s)),
                (e.child = ka(e, null, n, s)))
              : Pt(t, e, n, s),
            (e.memoizedState = r.state),
            (t = e.child))
          : (t = un(t, e, s)),
        t
      );
    }
    function hy(t, e, n, i) {
      return Gi(), (e.flags |= 256), Pt(t, e, n, i), e.child;
    }
    var Qr = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null,
    };
    function Kr(t) {
      return { baseLanes: t, cachePool: Im() };
    }
    function kr(t, e, n) {
      return (t = t !== null ? t.childLanes & ~n : 0), e && (t |= we), t;
    }
    function dy(t, e, n) {
      var i = e.pendingProps,
        s = !1,
        r = (e.flags & 128) !== 0,
        f;
      if (
        ((f = r) ||
          (f =
            t !== null && t.memoizedState === null
              ? !1
              : (Xt.current & 2) !== 0),
        f && ((s = !0), (e.flags &= -129)),
        (f = (e.flags & 32) !== 0),
        (e.flags &= -33),
        t === null)
      ) {
        if (yt) {
          if ((s ? Dn(e) : Rn(), yt)) {
            var y = wt,
              b;
            if ((b = y)) {
              t: {
                for (b = y, y = Ze; b.nodeType !== 8; ) {
                  if (!y) {
                    y = null;
                    break t;
                  }
                  if (((b = He(b.nextSibling)), b === null)) {
                    y = null;
                    break t;
                  }
                }
                y = b;
              }
              y !== null
                ? ((e.memoizedState = {
                    dehydrated: y,
                    treeContext: ta !== null ? { id: tn, overflow: en } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (b = ge(18, null, null, 0)),
                  (b.stateNode = y),
                  (b.return = e),
                  (e.child = b),
                  (ie = e),
                  (wt = null),
                  (b = !0))
                : (b = !1);
            }
            b || aa(e);
          }
          if (
            ((y = e.memoizedState),
            y !== null && ((y = y.dehydrated), y !== null))
          )
            return zc(y) ? (e.lanes = 32) : (e.lanes = 536870912), null;
          sn(e);
        }
        return (
          (y = i.children),
          (i = i.fallback),
          s
            ? (Rn(),
              (s = e.mode),
              (y = Os({ mode: "hidden", children: y }, s)),
              (i = In(i, s, n, null)),
              (y.return = e),
              (i.return = e),
              (y.sibling = i),
              (e.child = y),
              (s = e.child),
              (s.memoizedState = Kr(n)),
              (s.childLanes = kr(t, f, n)),
              (e.memoizedState = Qr),
              i)
            : (Dn(e), Jr(e, y))
        );
      }
      if (
        ((b = t.memoizedState), b !== null && ((y = b.dehydrated), y !== null))
      ) {
        if (r)
          e.flags & 256
            ? (Dn(e), (e.flags &= -257), (e = Pr(t, e, n)))
            : e.memoizedState !== null
            ? (Rn(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (Rn(),
              (s = i.fallback),
              (y = e.mode),
              (i = Os({ mode: "visible", children: i.children }, y)),
              (s = In(s, y, n, null)),
              (s.flags |= 2),
              (i.return = e),
              (s.return = e),
              (i.sibling = s),
              (e.child = i),
              ka(e, t.child, null, n),
              (i = e.child),
              (i.memoizedState = Kr(n)),
              (i.childLanes = kr(t, f, n)),
              (e.memoizedState = Qr),
              (e = s));
        else if ((Dn(e), zc(y))) {
          if (((f = y.nextSibling && y.nextSibling.dataset), f)) var D = f.dgst;
          (f = D),
            (i = Error(o(419))),
            (i.stack = ""),
            (i.digest = f),
            Xi({ value: i, source: null, stack: null }),
            (e = Pr(t, e, n));
        } else if (
          (Qt || Zi(t, e, n, !1), (f = (n & t.childLanes) !== 0), Qt || f)
        ) {
          if (
            ((f = Mt),
            f !== null &&
              ((i = n & -n),
              (i = (i & 42) !== 0 ? 1 : Vo(i)),
              (i = (i & (f.suspendedLanes | n)) !== 0 ? 0 : i),
              i !== 0 && i !== b.retryLane))
          )
            throw ((b.retryLane = i), Ba(t, i), xe(f, t, i), iy);
          y.data === "$?" || dc(), (e = Pr(t, e, n));
        } else
          y.data === "$?"
            ? ((e.flags |= 192), (e.child = t.child), (e = null))
            : ((t = b.treeContext),
              (wt = He(y.nextSibling)),
              (ie = e),
              (yt = !0),
              (na = null),
              (Ze = !1),
              t !== null &&
                ((Ve[_e++] = tn),
                (Ve[_e++] = en),
                (Ve[_e++] = ta),
                (tn = t.id),
                (en = t.overflow),
                (ta = e)),
              (e = Jr(e, i.children)),
              (e.flags |= 4096));
        return e;
      }
      return s
        ? (Rn(),
          (s = i.fallback),
          (y = e.mode),
          (b = t.child),
          (D = b.sibling),
          (i = Ie(b, { mode: "hidden", children: i.children })),
          (i.subtreeFlags = b.subtreeFlags & 65011712),
          D !== null
            ? (s = Ie(D, s))
            : ((s = In(s, y, n, null)), (s.flags |= 2)),
          (s.return = e),
          (i.return = e),
          (i.sibling = s),
          (e.child = i),
          (i = s),
          (s = e.child),
          (y = t.child.memoizedState),
          y === null
            ? (y = Kr(n))
            : ((b = y.cachePool),
              b !== null
                ? ((D = Gt._currentValue),
                  (b = b.parent !== D ? { parent: D, pool: D } : b))
                : (b = Im()),
              (y = { baseLanes: y.baseLanes | n, cachePool: b })),
          (s.memoizedState = y),
          (s.childLanes = kr(t, f, n)),
          (e.memoizedState = Qr),
          i)
        : (Dn(e),
          (n = t.child),
          (t = n.sibling),
          (n = Ie(n, { mode: "visible", children: i.children })),
          (n.return = e),
          (n.sibling = null),
          t !== null &&
            ((f = e.deletions),
            f === null ? ((e.deletions = [t]), (e.flags |= 16)) : f.push(t)),
          (e.child = n),
          (e.memoizedState = null),
          n);
    }
    function Jr(t, e) {
      return (
        (e = Os({ mode: "visible", children: e }, t.mode)),
        (e.return = t),
        (t.child = e)
      );
    }
    function Os(t, e) {
      return (
        (t = ge(22, t, null, e)),
        (t.lanes = 0),
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
        t
      );
    }
    function Pr(t, e, n) {
      return (
        ka(e, t.child, null, n),
        (t = Jr(e, e.pendingProps.children)),
        (t.flags |= 2),
        (e.memoizedState = null),
        t
      );
    }
    function my(t, e, n) {
      t.lanes |= e;
      var i = t.alternate;
      i !== null && (i.lanes |= e), dr(t.return, e, n);
    }
    function Fr(t, e, n, i, s) {
      var r = t.memoizedState;
      r === null
        ? (t.memoizedState = {
            isBackwards: e,
            rendering: null,
            renderingStartTime: 0,
            last: i,
            tail: n,
            tailMode: s,
          })
        : ((r.isBackwards = e),
          (r.rendering = null),
          (r.renderingStartTime = 0),
          (r.last = i),
          (r.tail = n),
          (r.tailMode = s));
    }
    function py(t, e, n) {
      var i = e.pendingProps,
        s = i.revealOrder,
        r = i.tail;
      if ((Pt(t, e, i.children, n), (i = Xt.current), (i & 2) !== 0))
        (i = (i & 1) | 2), (e.flags |= 128);
      else {
        if (t !== null && (t.flags & 128) !== 0)
          t: for (t = e.child; t !== null; ) {
            if (t.tag === 13) t.memoizedState !== null && my(t, n, e);
            else if (t.tag === 19) my(t, n, e);
            else if (t.child !== null) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break t;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break t;
              t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
          }
        i &= 1;
      }
      switch ((X(Xt, i), s)) {
        case "forwards":
          for (n = e.child, s = null; n !== null; )
            (t = n.alternate),
              t !== null && Ms(t) === null && (s = n),
              (n = n.sibling);
          (n = s),
            n === null
              ? ((s = e.child), (e.child = null))
              : ((s = n.sibling), (n.sibling = null)),
            Fr(e, !1, s, n, r);
          break;
        case "backwards":
          for (n = null, s = e.child, e.child = null; s !== null; ) {
            if (((t = s.alternate), t !== null && Ms(t) === null)) {
              e.child = s;
              break;
            }
            (t = s.sibling), (s.sibling = n), (n = s), (s = t);
          }
          Fr(e, !0, n, null, r);
          break;
        case "together":
          Fr(e, !1, null, null, void 0);
          break;
        default:
          e.memoizedState = null;
      }
      return e.child;
    }
    function un(t, e, n) {
      if (
        (t !== null && (e.dependencies = t.dependencies),
        (_n |= e.lanes),
        (n & e.childLanes) === 0)
      )
        if (t !== null) {
          if ((Zi(t, e, n, !1), (n & e.childLanes) === 0)) return null;
        } else return null;
      if (t !== null && e.child !== t.child) throw Error(o(153));
      if (e.child !== null) {
        for (
          t = e.child, n = Ie(t, t.pendingProps), e.child = n, n.return = e;
          t.sibling !== null;

        )
          (t = t.sibling),
            (n = n.sibling = Ie(t, t.pendingProps)),
            (n.return = e);
        n.sibling = null;
      }
      return e.child;
    }
    function $r(t, e) {
      return (t.lanes & e) !== 0
        ? !0
        : ((t = t.dependencies), !!(t !== null && rs(t)));
    }
    function yx(t, e, n) {
      switch (e.tag) {
        case 3:
          Ot(e, e.stateNode.containerInfo),
            Tn(e, Gt, t.memoizedState.cache),
            Gi();
          break;
        case 27:
        case 5:
          Do(e);
          break;
        case 4:
          Ot(e, e.stateNode.containerInfo);
          break;
        case 10:
          Tn(e, e.type, e.memoizedProps.value);
          break;
        case 13:
          var i = e.memoizedState;
          if (i !== null)
            return i.dehydrated !== null
              ? (Dn(e), (e.flags |= 128), null)
              : (n & e.child.childLanes) !== 0
              ? dy(t, e, n)
              : (Dn(e), (t = un(t, e, n)), t !== null ? t.sibling : null);
          Dn(e);
          break;
        case 19:
          var s = (t.flags & 128) !== 0;
          if (
            ((i = (n & e.childLanes) !== 0),
            i || (Zi(t, e, n, !1), (i = (n & e.childLanes) !== 0)),
            s)
          ) {
            if (i) return py(t, e, n);
            e.flags |= 128;
          }
          if (
            ((s = e.memoizedState),
            s !== null &&
              ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
            X(Xt, Xt.current),
            i)
          )
            break;
          return null;
        case 22:
        case 23:
          return (e.lanes = 0), oy(t, e, n);
        case 24:
          Tn(e, Gt, t.memoizedState.cache);
      }
      return un(t, e, n);
    }
    function yy(t, e, n) {
      if (t !== null)
        if (t.memoizedProps !== e.pendingProps) Qt = !0;
        else {
          if (!$r(t, n) && (e.flags & 128) === 0) return (Qt = !1), yx(t, e, n);
          Qt = (t.flags & 131072) !== 0;
        }
      else (Qt = !1), yt && (e.flags & 1048576) !== 0 && Km(e, os, e.index);
      switch (((e.lanes = 0), e.tag)) {
        case 16:
          t: {
            t = e.pendingProps;
            var i = e.elementType,
              s = i._init;
            if (((i = s(i._payload)), (e.type = i), typeof i == "function"))
              sr(i)
                ? ((t = oa(i, t)), (e.tag = 1), (e = fy(null, e, i, t, n)))
                : ((e.tag = 0), (e = Zr(null, e, i, t, n)));
            else {
              if (i != null) {
                if (((s = i.$$typeof), s === I)) {
                  (e.tag = 11), (e = ly(null, e, i, t, n));
                  break t;
                } else if (s === tt) {
                  (e.tag = 14), (e = sy(null, e, i, t, n));
                  break t;
                }
              }
              throw ((e = ue(i) || i), Error(o(306, e, "")));
            }
          }
          return e;
        case 0:
          return Zr(t, e, e.type, e.pendingProps, n);
        case 1:
          return (i = e.type), (s = oa(i, e.pendingProps)), fy(t, e, i, s, n);
        case 3:
          t: {
            if ((Ot(e, e.stateNode.containerInfo), t === null))
              throw Error(o(387));
            i = e.pendingProps;
            var r = e.memoizedState;
            (s = r.element), br(t, e), $i(e, i, null, n);
            var f = e.memoizedState;
            if (
              ((i = f.cache),
              Tn(e, Gt, i),
              i !== r.cache && mr(e, [Gt], n, !0),
              Fi(),
              (i = f.element),
              r.isDehydrated)
            )
              if (
                ((r = { element: i, isDehydrated: !1, cache: f.cache }),
                (e.updateQueue.baseState = r),
                (e.memoizedState = r),
                e.flags & 256)
              ) {
                e = hy(t, e, i, n);
                break t;
              } else if (i !== s) {
                (s = Oe(Error(o(424)), e)), Xi(s), (e = hy(t, e, i, n));
                break t;
              } else {
                switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                  case 9:
                    t = t.body;
                    break;
                  default:
                    t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
                }
                for (
                  wt = He(t.firstChild),
                    ie = e,
                    yt = !0,
                    na = null,
                    Ze = !0,
                    n = Jp(e, null, i, n),
                    e.child = n;
                  n;

                )
                  (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
              }
            else {
              if ((Gi(), i === s)) {
                e = un(t, e, n);
                break t;
              }
              Pt(t, e, i, n);
            }
            e = e.child;
          }
          return e;
        case 26:
          return (
            Cs(t, e),
            t === null
              ? (n = b0(e.type, null, e.pendingProps, null))
                ? (e.memoizedState = n)
                : yt ||
                  ((n = e.type),
                  (t = e.pendingProps),
                  (i = Xs(lt.current).createElement(n)),
                  (i[ee] = e),
                  (i[oe] = t),
                  $t(i, n, t),
                  Zt(i),
                  (e.stateNode = i))
              : (e.memoizedState = b0(
                  e.type,
                  t.memoizedProps,
                  e.pendingProps,
                  t.memoizedState
                )),
            null
          );
        case 27:
          return (
            Do(e),
            t === null &&
              yt &&
              ((i = e.stateNode = g0(e.type, e.pendingProps, lt.current)),
              (ie = e),
              (Ze = !0),
              (s = wt),
              Bn(e.type) ? ((Vc = s), (wt = He(i.firstChild))) : (wt = s)),
            Pt(t, e, e.pendingProps.children, n),
            Cs(t, e),
            t === null && (e.flags |= 4194304),
            e.child
          );
        case 5:
          return (
            t === null &&
              yt &&
              ((s = i = wt) &&
                ((i = Zx(i, e.type, e.pendingProps, Ze)),
                i !== null
                  ? ((e.stateNode = i),
                    (ie = e),
                    (wt = He(i.firstChild)),
                    (Ze = !1),
                    (s = !0))
                  : (s = !1)),
              s || aa(e)),
            Do(e),
            (s = e.type),
            (r = e.pendingProps),
            (f = t !== null ? t.memoizedProps : null),
            (i = r.children),
            Rc(s, r) ? (i = null) : f !== null && Rc(s, f) && (e.flags |= 32),
            e.memoizedState !== null &&
              ((s = Dr(t, e, ox, null, null, n)), (Sl._currentValue = s)),
            Cs(t, e),
            Pt(t, e, i, n),
            e.child
          );
        case 6:
          return (
            t === null &&
              yt &&
              ((t = n = wt) &&
                ((n = Qx(n, e.pendingProps, Ze)),
                n !== null
                  ? ((e.stateNode = n), (ie = e), (wt = null), (t = !0))
                  : (t = !1)),
              t || aa(e)),
            null
          );
        case 13:
          return dy(t, e, n);
        case 4:
          return (
            Ot(e, e.stateNode.containerInfo),
            (i = e.pendingProps),
            t === null ? (e.child = ka(e, null, i, n)) : Pt(t, e, i, n),
            e.child
          );
        case 11:
          return ly(t, e, e.type, e.pendingProps, n);
        case 7:
          return Pt(t, e, e.pendingProps, n), e.child;
        case 8:
          return Pt(t, e, e.pendingProps.children, n), e.child;
        case 12:
          return Pt(t, e, e.pendingProps.children, n), e.child;
        case 10:
          return (
            (i = e.pendingProps),
            Tn(e, e.type, i.value),
            Pt(t, e, i.children, n),
            e.child
          );
        case 9:
          return (
            (s = e.type._context),
            (i = e.pendingProps.children),
            la(e),
            (s = ne(s)),
            (i = i(s)),
            (e.flags |= 1),
            Pt(t, e, i, n),
            e.child
          );
        case 14:
          return sy(t, e, e.type, e.pendingProps, n);
        case 15:
          return uy(t, e, e.type, e.pendingProps, n);
        case 19:
          return py(t, e, n);
        case 31:
          return (
            (i = e.pendingProps),
            (n = e.mode),
            (i = { mode: i.mode, children: i.children }),
            t === null
              ? ((n = Os(i, n)),
                (n.ref = e.ref),
                (e.child = n),
                (n.return = e),
                (e = n))
              : ((n = Ie(t.child, i)),
                (n.ref = e.ref),
                (e.child = n),
                (n.return = e),
                (e = n)),
            e
          );
        case 22:
          return oy(t, e, n);
        case 24:
          return (
            la(e),
            (i = ne(Gt)),
            t === null
              ? ((s = gr()),
                s === null &&
                  ((s = Mt),
                  (r = pr()),
                  (s.pooledCache = r),
                  r.refCount++,
                  r !== null && (s.pooledCacheLanes |= n),
                  (s = r)),
                (e.memoizedState = { parent: i, cache: s }),
                Sr(e),
                Tn(e, Gt, s))
              : ((t.lanes & n) !== 0 && (br(t, e), $i(e, null, null, n), Fi()),
                (s = t.memoizedState),
                (r = e.memoizedState),
                s.parent !== i
                  ? ((s = { parent: i, cache: i }),
                    (e.memoizedState = s),
                    e.lanes === 0 &&
                      (e.memoizedState = e.updateQueue.baseState = s),
                    Tn(e, Gt, i))
                  : ((i = r.cache),
                    Tn(e, Gt, i),
                    i !== s.cache && mr(e, [Gt], n, !0))),
            Pt(t, e, e.pendingProps.children, n),
            e.child
          );
        case 29:
          throw e.pendingProps;
      }
      throw Error(o(156, e.tag));
    }
    function on(t) {
      t.flags |= 4;
    }
    function gy(t, e) {
      if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
        t.flags &= -16777217;
      else if (((t.flags |= 16777216), !M0(e))) {
        if (
          ((e = Ue.current),
          e !== null &&
            ((dt & 4194048) === dt
              ? Qe !== null
              : ((dt & 62914560) !== dt && (dt & 536870912) === 0) || e !== Qe))
        )
          throw ((Ji = vr), tp);
        t.flags |= 8192;
      }
    }
    function zs(t, e) {
      e !== null && (t.flags |= 4),
        t.flags & 16384 &&
          ((e = t.tag !== 22 ? Pd() : 536870912), (t.lanes |= e), ($a |= e));
    }
    function il(t, e) {
      if (!yt)
        switch (t.tailMode) {
          case "hidden":
            e = t.tail;
            for (var n = null; e !== null; )
              e.alternate !== null && (n = e), (e = e.sibling);
            n === null ? (t.tail = null) : (n.sibling = null);
            break;
          case "collapsed":
            n = t.tail;
            for (var i = null; n !== null; )
              n.alternate !== null && (i = n), (n = n.sibling);
            i === null
              ? e || t.tail === null
                ? (t.tail = null)
                : (t.tail.sibling = null)
              : (i.sibling = null);
        }
    }
    function _t(t) {
      var e = t.alternate !== null && t.alternate.child === t.child,
        n = 0,
        i = 0;
      if (e)
        for (var s = t.child; s !== null; )
          (n |= s.lanes | s.childLanes),
            (i |= s.subtreeFlags & 65011712),
            (i |= s.flags & 65011712),
            (s.return = t),
            (s = s.sibling);
      else
        for (s = t.child; s !== null; )
          (n |= s.lanes | s.childLanes),
            (i |= s.subtreeFlags),
            (i |= s.flags),
            (s.return = t),
            (s = s.sibling);
      return (t.subtreeFlags |= i), (t.childLanes = n), e;
    }
    function gx(t, e, n) {
      var i = e.pendingProps;
      switch ((cr(e), e.tag)) {
        case 31:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return _t(e), null;
        case 1:
          return _t(e), null;
        case 3:
          return (
            (n = e.stateNode),
            (i = null),
            t !== null && (i = t.memoizedState.cache),
            e.memoizedState.cache !== i && (e.flags |= 2048),
            an(Gt),
            gn(),
            n.pendingContext &&
              ((n.context = n.pendingContext), (n.pendingContext = null)),
            (t === null || t.child === null) &&
              (Yi(e)
                ? on(e)
                : t === null ||
                  (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                  ((e.flags |= 1024), Pm())),
            _t(e),
            null
          );
        case 26:
          return (
            (n = e.memoizedState),
            t === null
              ? (on(e),
                n !== null
                  ? (_t(e), gy(e, n))
                  : (_t(e), (e.flags &= -16777217)))
              : n
              ? n !== t.memoizedState
                ? (on(e), _t(e), gy(e, n))
                : (_t(e), (e.flags &= -16777217))
              : (t.memoizedProps !== i && on(e), _t(e), (e.flags &= -16777217)),
            null
          );
        case 27:
          Yl(e), (n = lt.current);
          var s = e.type;
          if (t !== null && e.stateNode != null) t.memoizedProps !== i && on(e);
          else {
            if (!i) {
              if (e.stateNode === null) throw Error(o(166));
              return _t(e), null;
            }
            (t = $.current),
              Yi(e) ? km(e) : ((t = g0(s, i, n)), (e.stateNode = t), on(e));
          }
          return _t(e), null;
        case 5:
          if ((Yl(e), (n = e.type), t !== null && e.stateNode != null))
            t.memoizedProps !== i && on(e);
          else {
            if (!i) {
              if (e.stateNode === null) throw Error(o(166));
              return _t(e), null;
            }
            if (((t = $.current), Yi(e))) km(e);
            else {
              switch (((s = Xs(lt.current)), t)) {
                case 1:
                  t = s.createElementNS("http://www.w3.org/2000/svg", n);
                  break;
                case 2:
                  t = s.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    n
                  );
                  break;
                default:
                  switch (n) {
                    case "svg":
                      t = s.createElementNS("http://www.w3.org/2000/svg", n);
                      break;
                    case "math":
                      t = s.createElementNS(
                        "http://www.w3.org/1998/Math/MathML",
                        n
                      );
                      break;
                    case "script":
                      (t = s.createElement("div")),
                        (t.innerHTML = "<script></script>"),
                        (t = t.removeChild(t.firstChild));
                      break;
                    case "select":
                      (t =
                        typeof i.is == "string"
                          ? s.createElement("select", { is: i.is })
                          : s.createElement("select")),
                        i.multiple
                          ? (t.multiple = !0)
                          : i.size && (t.size = i.size);
                      break;
                    default:
                      t =
                        typeof i.is == "string"
                          ? s.createElement(n, { is: i.is })
                          : s.createElement(n);
                  }
              }
              (t[ee] = e), (t[oe] = i);
              t: for (s = e.child; s !== null; ) {
                if (s.tag === 5 || s.tag === 6) t.appendChild(s.stateNode);
                else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                  (s.child.return = s), (s = s.child);
                  continue;
                }
                if (s === e) break t;
                for (; s.sibling === null; ) {
                  if (s.return === null || s.return === e) break t;
                  s = s.return;
                }
                (s.sibling.return = s.return), (s = s.sibling);
              }
              e.stateNode = t;
              t: switch (($t(t, n, i), n)) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  t = !!i.autoFocus;
                  break t;
                case "img":
                  t = !0;
                  break t;
                default:
                  t = !1;
              }
              t && on(e);
            }
          }
          return _t(e), (e.flags &= -16777217), null;
        case 6:
          if (t && e.stateNode != null) t.memoizedProps !== i && on(e);
          else {
            if (typeof i != "string" && e.stateNode === null)
              throw Error(o(166));
            if (((t = lt.current), Yi(e))) {
              if (
                ((t = e.stateNode),
                (n = e.memoizedProps),
                (i = null),
                (s = ie),
                s !== null)
              )
                switch (s.tag) {
                  case 27:
                  case 5:
                    i = s.memoizedProps;
                }
              (t[ee] = e),
                (t = !!(
                  t.nodeValue === n ||
                  (i !== null && i.suppressHydrationWarning === !0) ||
                  c0(t.nodeValue, n)
                )),
                t || aa(e);
            } else
              (t = Xs(t).createTextNode(i)), (t[ee] = e), (e.stateNode = t);
          }
          return _t(e), null;
        case 13:
          if (
            ((i = e.memoizedState),
            t === null ||
              (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
          ) {
            if (((s = Yi(e)), i !== null && i.dehydrated !== null)) {
              if (t === null) {
                if (!s) throw Error(o(318));
                if (
                  ((s = e.memoizedState),
                  (s = s !== null ? s.dehydrated : null),
                  !s)
                )
                  throw Error(o(317));
                s[ee] = e;
              } else
                Gi(),
                  (e.flags & 128) === 0 && (e.memoizedState = null),
                  (e.flags |= 4);
              _t(e), (s = !1);
            } else
              (s = Pm()),
                t !== null &&
                  t.memoizedState !== null &&
                  (t.memoizedState.hydrationErrors = s),
                (s = !0);
            if (!s) return e.flags & 256 ? (sn(e), e) : (sn(e), null);
          }
          if ((sn(e), (e.flags & 128) !== 0)) return (e.lanes = n), e;
          if (
            ((n = i !== null), (t = t !== null && t.memoizedState !== null), n)
          ) {
            (i = e.child),
              (s = null),
              i.alternate !== null &&
                i.alternate.memoizedState !== null &&
                i.alternate.memoizedState.cachePool !== null &&
                (s = i.alternate.memoizedState.cachePool.pool);
            var r = null;
            i.memoizedState !== null &&
              i.memoizedState.cachePool !== null &&
              (r = i.memoizedState.cachePool.pool),
              r !== s && (i.flags |= 2048);
          }
          return (
            n !== t && n && (e.child.flags |= 8192),
            zs(e, e.updateQueue),
            _t(e),
            null
          );
        case 4:
          return gn(), t === null && xc(e.stateNode.containerInfo), _t(e), null;
        case 10:
          return an(e.type), _t(e), null;
        case 19:
          if ((H(Xt), (s = e.memoizedState), s === null)) return _t(e), null;
          if (((i = (e.flags & 128) !== 0), (r = s.rendering), r === null))
            if (i) il(s, !1);
            else {
              if (jt !== 0 || (t !== null && (t.flags & 128) !== 0))
                for (t = e.child; t !== null; ) {
                  if (((r = Ms(t)), r !== null)) {
                    for (
                      e.flags |= 128,
                        il(s, !1),
                        t = r.updateQueue,
                        e.updateQueue = t,
                        zs(e, t),
                        e.subtreeFlags = 0,
                        t = n,
                        n = e.child;
                      n !== null;

                    )
                      Qm(n, t), (n = n.sibling);
                    return X(Xt, (Xt.current & 1) | 2), e.child;
                  }
                  t = t.sibling;
                }
              s.tail !== null &&
                Xe() > Us &&
                ((e.flags |= 128), (i = !0), il(s, !1), (e.lanes = 4194304));
            }
          else {
            if (!i)
              if (((t = Ms(r)), t !== null)) {
                if (
                  ((e.flags |= 128),
                  (i = !0),
                  (t = t.updateQueue),
                  (e.updateQueue = t),
                  zs(e, t),
                  il(s, !0),
                  s.tail === null &&
                    s.tailMode === "hidden" &&
                    !r.alternate &&
                    !yt)
                )
                  return _t(e), null;
              } else
                2 * Xe() - s.renderingStartTime > Us &&
                  n !== 536870912 &&
                  ((e.flags |= 128), (i = !0), il(s, !1), (e.lanes = 4194304));
            s.isBackwards
              ? ((r.sibling = e.child), (e.child = r))
              : ((t = s.last),
                t !== null ? (t.sibling = r) : (e.child = r),
                (s.last = r));
          }
          return s.tail !== null
            ? ((e = s.tail),
              (s.rendering = e),
              (s.tail = e.sibling),
              (s.renderingStartTime = Xe()),
              (e.sibling = null),
              (t = Xt.current),
              X(Xt, i ? (t & 1) | 2 : t & 1),
              e)
            : (_t(e), null);
        case 22:
        case 23:
          return (
            sn(e),
            Er(),
            (i = e.memoizedState !== null),
            t !== null
              ? (t.memoizedState !== null) !== i && (e.flags |= 8192)
              : i && (e.flags |= 8192),
            i
              ? (n & 536870912) !== 0 &&
                (e.flags & 128) === 0 &&
                (_t(e), e.subtreeFlags & 6 && (e.flags |= 8192))
              : _t(e),
            (n = e.updateQueue),
            n !== null && zs(e, n.retryQueue),
            (n = null),
            t !== null &&
              t.memoizedState !== null &&
              t.memoizedState.cachePool !== null &&
              (n = t.memoizedState.cachePool.pool),
            (i = null),
            e.memoizedState !== null &&
              e.memoizedState.cachePool !== null &&
              (i = e.memoizedState.cachePool.pool),
            i !== n && (e.flags |= 2048),
            t !== null && H(sa),
            null
          );
        case 24:
          return (
            (n = null),
            t !== null && (n = t.memoizedState.cache),
            e.memoizedState.cache !== n && (e.flags |= 2048),
            an(Gt),
            _t(e),
            null
          );
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(o(156, e.tag));
    }
    function vx(t, e) {
      switch ((cr(e), e.tag)) {
        case 1:
          return (
            (t = e.flags),
            t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
          );
        case 3:
          return (
            an(Gt),
            gn(),
            (t = e.flags),
            (t & 65536) !== 0 && (t & 128) === 0
              ? ((e.flags = (t & -65537) | 128), e)
              : null
          );
        case 26:
        case 27:
        case 5:
          return Yl(e), null;
        case 13:
          if (
            (sn(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)
          ) {
            if (e.alternate === null) throw Error(o(340));
            Gi();
          }
          return (
            (t = e.flags),
            t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
          );
        case 19:
          return H(Xt), null;
        case 4:
          return gn(), null;
        case 10:
          return an(e.type), null;
        case 22:
        case 23:
          return (
            sn(e),
            Er(),
            t !== null && H(sa),
            (t = e.flags),
            t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
          );
        case 24:
          return an(Gt), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function vy(t, e) {
      switch ((cr(e), e.tag)) {
        case 3:
          an(Gt), gn();
          break;
        case 26:
        case 27:
        case 5:
          Yl(e);
          break;
        case 4:
          gn();
          break;
        case 13:
          sn(e);
          break;
        case 19:
          H(Xt);
          break;
        case 10:
          an(e.type);
          break;
        case 22:
        case 23:
          sn(e), Er(), t !== null && H(sa);
          break;
        case 24:
          an(Gt);
      }
    }
    function ll(t, e) {
      try {
        var n = e.updateQueue,
          i = n !== null ? n.lastEffect : null;
        if (i !== null) {
          var s = i.next;
          n = s;
          do {
            if ((n.tag & t) === t) {
              i = void 0;
              var r = n.create,
                f = n.inst;
              (i = r()), (f.destroy = i);
            }
            n = n.next;
          } while (n !== s);
        }
      } catch (y) {
        At(e, e.return, y);
      }
    }
    function Cn(t, e, n) {
      try {
        var i = e.updateQueue,
          s = i !== null ? i.lastEffect : null;
        if (s !== null) {
          var r = s.next;
          i = r;
          do {
            if ((i.tag & t) === t) {
              var f = i.inst,
                y = f.destroy;
              if (y !== void 0) {
                (f.destroy = void 0), (s = e);
                var b = n,
                  D = y;
                try {
                  D();
                } catch (_) {
                  At(s, b, _);
                }
              }
            }
            i = i.next;
          } while (i !== r);
        }
      } catch (_) {
        At(e, e.return, _);
      }
    }
    function Sy(t) {
      var e = t.updateQueue;
      if (e !== null) {
        var n = t.stateNode;
        try {
          sp(e, n);
        } catch (i) {
          At(t, t.return, i);
        }
      }
    }
    function by(t, e, n) {
      (n.props = oa(t.type, t.memoizedProps)), (n.state = t.memoizedState);
      try {
        n.componentWillUnmount();
      } catch (i) {
        At(t, e, i);
      }
    }
    function sl(t, e) {
      try {
        var n = t.ref;
        if (n !== null) {
          switch (t.tag) {
            case 26:
            case 27:
            case 5:
              var i = t.stateNode;
              break;
            case 30:
              i = t.stateNode;
              break;
            default:
              i = t.stateNode;
          }
          typeof n == "function" ? (t.refCleanup = n(i)) : (n.current = i);
        }
      } catch (s) {
        At(t, e, s);
      }
    }
    function Ke(t, e) {
      var n = t.ref,
        i = t.refCleanup;
      if (n !== null)
        if (typeof i == "function")
          try {
            i();
          } catch (s) {
            At(t, e, s);
          } finally {
            (t.refCleanup = null),
              (t = t.alternate),
              t != null && (t.refCleanup = null);
          }
        else if (typeof n == "function")
          try {
            n(null);
          } catch (s) {
            At(t, e, s);
          }
        else n.current = null;
    }
    function Ty(t) {
      var e = t.type,
        n = t.memoizedProps,
        i = t.stateNode;
      try {
        t: switch (e) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            n.autoFocus && i.focus();
            break t;
          case "img":
            n.src ? (i.src = n.src) : n.srcSet && (i.srcset = n.srcSet);
        }
      } catch (s) {
        At(t, t.return, s);
      }
    }
    function Wr(t, e, n) {
      try {
        var i = t.stateNode;
        Hx(i, t.type, n, e), (i[oe] = e);
      } catch (s) {
        At(t, t.return, s);
      }
    }
    function xy(t) {
      return (
        t.tag === 5 ||
        t.tag === 3 ||
        t.tag === 26 ||
        (t.tag === 27 && Bn(t.type)) ||
        t.tag === 4
      );
    }
    function Ir(t) {
      t: for (;;) {
        for (; t.sibling === null; ) {
          if (t.return === null || xy(t.return)) return null;
          t = t.return;
        }
        for (
          t.sibling.return = t.return, t = t.sibling;
          t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

        ) {
          if (
            (t.tag === 27 && Bn(t.type)) ||
            t.flags & 2 ||
            t.child === null ||
            t.tag === 4
          )
            continue t;
          (t.child.return = t), (t = t.child);
        }
        if (!(t.flags & 2)) return t.stateNode;
      }
    }
    function tc(t, e, n) {
      var i = t.tag;
      if (i === 5 || i === 6)
        (t = t.stateNode),
          e
            ? (n.nodeType === 9
                ? n.body
                : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n
              ).insertBefore(t, e)
            : ((e =
                n.nodeType === 9
                  ? n.body
                  : n.nodeName === "HTML"
                  ? n.ownerDocument.body
                  : n),
              e.appendChild(t),
              (n = n._reactRootContainer),
              n != null || e.onclick !== null || (e.onclick = Gs));
      else if (
        i !== 4 &&
        (i === 27 && Bn(t.type) && ((n = t.stateNode), (e = null)),
        (t = t.child),
        t !== null)
      )
        for (tc(t, e, n), t = t.sibling; t !== null; )
          tc(t, e, n), (t = t.sibling);
    }
    function Vs(t, e, n) {
      var i = t.tag;
      if (i === 5 || i === 6)
        (t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t);
      else if (
        i !== 4 &&
        (i === 27 && Bn(t.type) && (n = t.stateNode), (t = t.child), t !== null)
      )
        for (Vs(t, e, n), t = t.sibling; t !== null; )
          Vs(t, e, n), (t = t.sibling);
    }
    function Ay(t) {
      var e = t.stateNode,
        n = t.memoizedProps;
      try {
        for (var i = t.type, s = e.attributes; s.length; )
          e.removeAttributeNode(s[0]);
        $t(e, i, n), (e[ee] = t), (e[oe] = n);
      } catch (r) {
        At(t, t.return, r);
      }
    }
    var rn = !1,
      Lt = !1,
      ec = !1,
      Ey = typeof WeakSet == "function" ? WeakSet : Set,
      Kt = null;
    function Sx(t, e) {
      if (((t = t.containerInfo), (Mc = Ps), (t = jm(t)), Io(t))) {
        if ("selectionStart" in t)
          var n = { start: t.selectionStart, end: t.selectionEnd };
        else
          t: {
            n = ((n = t.ownerDocument) && n.defaultView) || window;
            var i = n.getSelection && n.getSelection();
            if (i && i.rangeCount !== 0) {
              n = i.anchorNode;
              var s = i.anchorOffset,
                r = i.focusNode;
              i = i.focusOffset;
              try {
                n.nodeType, r.nodeType;
              } catch {
                n = null;
                break t;
              }
              var f = 0,
                y = -1,
                b = -1,
                D = 0,
                _ = 0,
                j = t,
                R = null;
              e: for (;;) {
                for (
                  var C;
                  j !== n || (s !== 0 && j.nodeType !== 3) || (y = f + s),
                    j !== r || (i !== 0 && j.nodeType !== 3) || (b = f + i),
                    j.nodeType === 3 && (f += j.nodeValue.length),
                    (C = j.firstChild) !== null;

                )
                  (R = j), (j = C);
                for (;;) {
                  if (j === t) break e;
                  if (
                    (R === n && ++D === s && (y = f),
                    R === r && ++_ === i && (b = f),
                    (C = j.nextSibling) !== null)
                  )
                    break;
                  (j = R), (R = j.parentNode);
                }
                j = C;
              }
              n = y === -1 || b === -1 ? null : { start: y, end: b };
            } else n = null;
          }
        n = n || { start: 0, end: 0 };
      } else n = null;
      for (
        Dc = { focusedElem: t, selectionRange: n }, Ps = !1, Kt = e;
        Kt !== null;

      )
        if (
          ((e = Kt), (t = e.child), (e.subtreeFlags & 1024) !== 0 && t !== null)
        )
          (t.return = e), (Kt = t);
        else
          for (; Kt !== null; ) {
            switch (((e = Kt), (r = e.alternate), (t = e.flags), e.tag)) {
              case 0:
                break;
              case 11:
              case 15:
                break;
              case 1:
                if ((t & 1024) !== 0 && r !== null) {
                  (t = void 0),
                    (n = e),
                    (s = r.memoizedProps),
                    (r = r.memoizedState),
                    (i = n.stateNode);
                  try {
                    var it = oa(n.type, s, n.elementType === n.type);
                    (t = i.getSnapshotBeforeUpdate(it, r)),
                      (i.__reactInternalSnapshotBeforeUpdate = t);
                  } catch (et) {
                    At(n, n.return, et);
                  }
                }
                break;
              case 3:
                if ((t & 1024) !== 0) {
                  if (
                    ((t = e.stateNode.containerInfo), (n = t.nodeType), n === 9)
                  )
                    Oc(t);
                  else if (n === 1)
                    switch (t.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        Oc(t);
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
                if ((t & 1024) !== 0) throw Error(o(163));
            }
            if (((t = e.sibling), t !== null)) {
              (t.return = e.return), (Kt = t);
              break;
            }
            Kt = e.return;
          }
    }
    function My(t, e, n) {
      var i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          On(t, n), i & 4 && ll(5, n);
          break;
        case 1:
          if ((On(t, n), i & 4))
            if (((t = n.stateNode), e === null))
              try {
                t.componentDidMount();
              } catch (f) {
                At(n, n.return, f);
              }
            else {
              var s = oa(n.type, e.memoizedProps);
              e = e.memoizedState;
              try {
                t.componentDidUpdate(
                  s,
                  e,
                  t.__reactInternalSnapshotBeforeUpdate
                );
              } catch (f) {
                At(n, n.return, f);
              }
            }
          i & 64 && Sy(n), i & 512 && sl(n, n.return);
          break;
        case 3:
          if ((On(t, n), i & 64 && ((t = n.updateQueue), t !== null))) {
            if (((e = null), n.child !== null))
              switch (n.child.tag) {
                case 27:
                case 5:
                  e = n.child.stateNode;
                  break;
                case 1:
                  e = n.child.stateNode;
              }
            try {
              sp(t, e);
            } catch (f) {
              At(n, n.return, f);
            }
          }
          break;
        case 27:
          e === null && i & 4 && Ay(n);
        case 26:
        case 5:
          On(t, n), e === null && i & 4 && Ty(n), i & 512 && sl(n, n.return);
          break;
        case 12:
          On(t, n);
          break;
        case 13:
          On(t, n),
            i & 4 && Cy(t, n),
            i & 64 &&
              ((t = n.memoizedState),
              t !== null &&
                ((t = t.dehydrated),
                t !== null && ((n = Cx.bind(null, n)), Kx(t, n))));
          break;
        case 22:
          if (((i = n.memoizedState !== null || rn), !i)) {
            (e = (e !== null && e.memoizedState !== null) || Lt), (s = rn);
            var r = Lt;
            (rn = i),
              (Lt = e) && !r
                ? zn(t, n, (n.subtreeFlags & 8772) !== 0)
                : On(t, n),
              (rn = s),
              (Lt = r);
          }
          break;
        case 30:
          break;
        default:
          On(t, n);
      }
    }
    function Dy(t) {
      var e = t.alternate;
      e !== null && ((t.alternate = null), Dy(e)),
        (t.child = null),
        (t.deletions = null),
        (t.sibling = null),
        t.tag === 5 && ((e = t.stateNode), e !== null && wo(e)),
        (t.stateNode = null),
        (t.return = null),
        (t.dependencies = null),
        (t.memoizedProps = null),
        (t.memoizedState = null),
        (t.pendingProps = null),
        (t.stateNode = null),
        (t.updateQueue = null);
    }
    var zt = null,
      fe = !1;
    function cn(t, e, n) {
      for (n = n.child; n !== null; ) Ry(t, e, n), (n = n.sibling);
    }
    function Ry(t, e, n) {
      if (me && typeof me.onCommitFiberUnmount == "function")
        try {
          me.onCommitFiberUnmount(Ri, n);
        } catch {}
      switch (n.tag) {
        case 26:
          Lt || Ke(n, e),
            cn(t, e, n),
            n.memoizedState
              ? n.memoizedState.count--
              : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n));
          break;
        case 27:
          Lt || Ke(n, e);
          var i = zt,
            s = fe;
          Bn(n.type) && ((zt = n.stateNode), (fe = !1)),
            cn(t, e, n),
            pl(n.stateNode),
            (zt = i),
            (fe = s);
          break;
        case 5:
          Lt || Ke(n, e);
        case 6:
          if (
            ((i = zt),
            (s = fe),
            (zt = null),
            cn(t, e, n),
            (zt = i),
            (fe = s),
            zt !== null)
          )
            if (fe)
              try {
                (zt.nodeType === 9
                  ? zt.body
                  : zt.nodeName === "HTML"
                  ? zt.ownerDocument.body
                  : zt
                ).removeChild(n.stateNode);
              } catch (r) {
                At(n, e, r);
              }
            else
              try {
                zt.removeChild(n.stateNode);
              } catch (r) {
                At(n, e, r);
              }
          break;
        case 18:
          zt !== null &&
            (fe
              ? ((t = zt),
                p0(
                  t.nodeType === 9
                    ? t.body
                    : t.nodeName === "HTML"
                    ? t.ownerDocument.body
                    : t,
                  n.stateNode
                ),
                Al(t))
              : p0(zt, n.stateNode));
          break;
        case 4:
          (i = zt),
            (s = fe),
            (zt = n.stateNode.containerInfo),
            (fe = !0),
            cn(t, e, n),
            (zt = i),
            (fe = s);
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Lt || Cn(2, n, e), Lt || Cn(4, n, e), cn(t, e, n);
          break;
        case 1:
          Lt ||
            (Ke(n, e),
            (i = n.stateNode),
            typeof i.componentWillUnmount == "function" && by(n, e, i)),
            cn(t, e, n);
          break;
        case 21:
          cn(t, e, n);
          break;
        case 22:
          (Lt = (i = Lt) || n.memoizedState !== null), cn(t, e, n), (Lt = i);
          break;
        default:
          cn(t, e, n);
      }
    }
    function Cy(t, e) {
      if (
        e.memoizedState === null &&
        ((t = e.alternate),
        t !== null &&
          ((t = t.memoizedState),
          t !== null && ((t = t.dehydrated), t !== null)))
      )
        try {
          Al(t);
        } catch (n) {
          At(e, e.return, n);
        }
    }
    function bx(t) {
      switch (t.tag) {
        case 13:
        case 19:
          var e = t.stateNode;
          return e === null && (e = t.stateNode = new Ey()), e;
        case 22:
          return (
            (t = t.stateNode),
            (e = t._retryCache),
            e === null && (e = t._retryCache = new Ey()),
            e
          );
        default:
          throw Error(o(435, t.tag));
      }
    }
    function nc(t, e) {
      var n = bx(t);
      e.forEach(function (i) {
        var s = Ox.bind(null, t, i);
        n.has(i) || (n.add(i), i.then(s, s));
      });
    }
    function ve(t, e) {
      var n = e.deletions;
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var s = n[i],
            r = t,
            f = e,
            y = f;
          t: for (; y !== null; ) {
            switch (y.tag) {
              case 27:
                if (Bn(y.type)) {
                  (zt = y.stateNode), (fe = !1);
                  break t;
                }
                break;
              case 5:
                (zt = y.stateNode), (fe = !1);
                break t;
              case 3:
              case 4:
                (zt = y.stateNode.containerInfo), (fe = !0);
                break t;
            }
            y = y.return;
          }
          if (zt === null) throw Error(o(160));
          Ry(r, f, s),
            (zt = null),
            (fe = !1),
            (r = s.alternate),
            r !== null && (r.return = null),
            (s.return = null);
        }
      if (e.subtreeFlags & 13878)
        for (e = e.child; e !== null; ) Oy(e, t), (e = e.sibling);
    }
    var Le = null;
    function Oy(t, e) {
      var n = t.alternate,
        i = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ve(e, t),
            Se(t),
            i & 4 && (Cn(3, t, t.return), ll(3, t), Cn(5, t, t.return));
          break;
        case 1:
          ve(e, t),
            Se(t),
            i & 512 && (Lt || n === null || Ke(n, n.return)),
            i & 64 &&
              rn &&
              ((t = t.updateQueue),
              t !== null &&
                ((i = t.callbacks),
                i !== null &&
                  ((n = t.shared.hiddenCallbacks),
                  (t.shared.hiddenCallbacks = n === null ? i : n.concat(i)))));
          break;
        case 26:
          var s = Le;
          if (
            (ve(e, t),
            Se(t),
            i & 512 && (Lt || n === null || Ke(n, n.return)),
            i & 4)
          ) {
            var r = n !== null ? n.memoizedState : null;
            if (((i = t.memoizedState), n === null))
              if (i === null)
                if (t.stateNode === null) {
                  t: {
                    (i = t.type),
                      (n = t.memoizedProps),
                      (s = s.ownerDocument || s);
                    e: switch (i) {
                      case "title":
                        (r = s.getElementsByTagName("title")[0]),
                          (!r ||
                            r[zi] ||
                            r[ee] ||
                            r.namespaceURI === "http://www.w3.org/2000/svg" ||
                            r.hasAttribute("itemprop")) &&
                            ((r = s.createElement(i)),
                            s.head.insertBefore(
                              r,
                              s.querySelector("head > title")
                            )),
                          $t(r, i, n),
                          (r[ee] = t),
                          Zt(r),
                          (i = r);
                        break t;
                      case "link":
                        var f = A0("link", "href", s).get(i + (n.href || ""));
                        if (f) {
                          for (var y = 0; y < f.length; y++)
                            if (
                              ((r = f[y]),
                              r.getAttribute("href") ===
                                (n.href == null || n.href === ""
                                  ? null
                                  : n.href) &&
                                r.getAttribute("rel") ===
                                  (n.rel == null ? null : n.rel) &&
                                r.getAttribute("title") ===
                                  (n.title == null ? null : n.title) &&
                                r.getAttribute("crossorigin") ===
                                  (n.crossOrigin == null
                                    ? null
                                    : n.crossOrigin))
                            ) {
                              f.splice(y, 1);
                              break e;
                            }
                        }
                        (r = s.createElement(i)),
                          $t(r, i, n),
                          s.head.appendChild(r);
                        break;
                      case "meta":
                        if (
                          (f = A0("meta", "content", s).get(
                            i + (n.content || "")
                          ))
                        ) {
                          for (y = 0; y < f.length; y++)
                            if (
                              ((r = f[y]),
                              r.getAttribute("content") ===
                                (n.content == null ? null : "" + n.content) &&
                                r.getAttribute("name") ===
                                  (n.name == null ? null : n.name) &&
                                r.getAttribute("property") ===
                                  (n.property == null ? null : n.property) &&
                                r.getAttribute("http-equiv") ===
                                  (n.httpEquiv == null ? null : n.httpEquiv) &&
                                r.getAttribute("charset") ===
                                  (n.charSet == null ? null : n.charSet))
                            ) {
                              f.splice(y, 1);
                              break e;
                            }
                        }
                        (r = s.createElement(i)),
                          $t(r, i, n),
                          s.head.appendChild(r);
                        break;
                      default:
                        throw Error(o(468, i));
                    }
                    (r[ee] = t), Zt(r), (i = r);
                  }
                  t.stateNode = i;
                } else E0(s, t.type, t.stateNode);
              else t.stateNode = x0(s, i, t.memoizedProps);
            else
              r !== i
                ? (r === null
                    ? n.stateNode !== null &&
                      ((n = n.stateNode), n.parentNode.removeChild(n))
                    : r.count--,
                  i === null
                    ? E0(s, t.type, t.stateNode)
                    : x0(s, i, t.memoizedProps))
                : i === null &&
                  t.stateNode !== null &&
                  Wr(t, t.memoizedProps, n.memoizedProps);
          }
          break;
        case 27:
          ve(e, t),
            Se(t),
            i & 512 && (Lt || n === null || Ke(n, n.return)),
            n !== null && i & 4 && Wr(t, t.memoizedProps, n.memoizedProps);
          break;
        case 5:
          if (
            (ve(e, t),
            Se(t),
            i & 512 && (Lt || n === null || Ke(n, n.return)),
            t.flags & 32)
          ) {
            s = t.stateNode;
            try {
              Oa(s, "");
            } catch (C) {
              At(t, t.return, C);
            }
          }
          i & 4 &&
            t.stateNode != null &&
            ((s = t.memoizedProps), Wr(t, s, n !== null ? n.memoizedProps : s)),
            i & 1024 && (ec = !0);
          break;
        case 6:
          if ((ve(e, t), Se(t), i & 4)) {
            if (t.stateNode === null) throw Error(o(162));
            (i = t.memoizedProps), (n = t.stateNode);
            try {
              n.nodeValue = i;
            } catch (C) {
              At(t, t.return, C);
            }
          }
          break;
        case 3:
          if (
            ((Ks = null),
            (s = Le),
            (Le = Zs(e.containerInfo)),
            ve(e, t),
            (Le = s),
            Se(t),
            i & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              Al(e.containerInfo);
            } catch (C) {
              At(t, t.return, C);
            }
          ec && ((ec = !1), zy(t));
          break;
        case 4:
          (i = Le),
            (Le = Zs(t.stateNode.containerInfo)),
            ve(e, t),
            Se(t),
            (Le = i);
          break;
        case 12:
          ve(e, t), Se(t);
          break;
        case 13:
          ve(e, t),
            Se(t),
            t.child.flags & 8192 &&
              (t.memoizedState !== null) !=
                (n !== null && n.memoizedState !== null) &&
              (oc = Xe()),
            i & 4 &&
              ((i = t.updateQueue),
              i !== null && ((t.updateQueue = null), nc(t, i)));
          break;
        case 22:
          s = t.memoizedState !== null;
          var b = n !== null && n.memoizedState !== null,
            D = rn,
            _ = Lt;
          if (
            ((rn = D || s),
            (Lt = _ || b),
            ve(e, t),
            (Lt = _),
            (rn = D),
            Se(t),
            i & 8192)
          )
            t: for (
              e = t.stateNode,
                e._visibility = s ? e._visibility & -2 : e._visibility | 1,
                s && (n === null || b || rn || Lt || ra(t)),
                n = null,
                e = t;
              ;

            ) {
              if (e.tag === 5 || e.tag === 26) {
                if (n === null) {
                  b = n = e;
                  try {
                    if (((r = b.stateNode), s))
                      (f = r.style),
                        typeof f.setProperty == "function"
                          ? f.setProperty("display", "none", "important")
                          : (f.display = "none");
                    else {
                      y = b.stateNode;
                      var j = b.memoizedProps.style,
                        R =
                          j != null && j.hasOwnProperty("display")
                            ? j.display
                            : null;
                      y.style.display =
                        R == null || typeof R == "boolean"
                          ? ""
                          : ("" + R).trim();
                    }
                  } catch (C) {
                    At(b, b.return, C);
                  }
                }
              } else if (e.tag === 6) {
                if (n === null) {
                  b = e;
                  try {
                    b.stateNode.nodeValue = s ? "" : b.memoizedProps;
                  } catch (C) {
                    At(b, b.return, C);
                  }
                }
              } else if (
                ((e.tag !== 22 && e.tag !== 23) ||
                  e.memoizedState === null ||
                  e === t) &&
                e.child !== null
              ) {
                (e.child.return = e), (e = e.child);
                continue;
              }
              if (e === t) break t;
              for (; e.sibling === null; ) {
                if (e.return === null || e.return === t) break t;
                n === e && (n = null), (e = e.return);
              }
              n === e && (n = null),
                (e.sibling.return = e.return),
                (e = e.sibling);
            }
          i & 4 &&
            ((i = t.updateQueue),
            i !== null &&
              ((n = i.retryQueue),
              n !== null && ((i.retryQueue = null), nc(t, n))));
          break;
        case 19:
          ve(e, t),
            Se(t),
            i & 4 &&
              ((i = t.updateQueue),
              i !== null && ((t.updateQueue = null), nc(t, i)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          ve(e, t), Se(t);
      }
    }
    function Se(t) {
      var e = t.flags;
      if (e & 2) {
        try {
          for (var n, i = t.return; i !== null; ) {
            if (xy(i)) {
              n = i;
              break;
            }
            i = i.return;
          }
          if (n == null) throw Error(o(160));
          switch (n.tag) {
            case 27:
              var s = n.stateNode,
                r = Ir(t);
              Vs(t, r, s);
              break;
            case 5:
              var f = n.stateNode;
              n.flags & 32 && (Oa(f, ""), (n.flags &= -33));
              var y = Ir(t);
              Vs(t, y, f);
              break;
            case 3:
            case 4:
              var b = n.stateNode.containerInfo,
                D = Ir(t);
              tc(t, D, b);
              break;
            default:
              throw Error(o(161));
          }
        } catch (_) {
          At(t, t.return, _);
        }
        t.flags &= -3;
      }
      e & 4096 && (t.flags &= -4097);
    }
    function zy(t) {
      if (t.subtreeFlags & 1024)
        for (t = t.child; t !== null; ) {
          var e = t;
          zy(e),
            e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
            (t = t.sibling);
        }
    }
    function On(t, e) {
      if (e.subtreeFlags & 8772)
        for (e = e.child; e !== null; ) My(t, e.alternate, e), (e = e.sibling);
    }
    function ra(t) {
      for (t = t.child; t !== null; ) {
        var e = t;
        switch (e.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            Cn(4, e, e.return), ra(e);
            break;
          case 1:
            Ke(e, e.return);
            var n = e.stateNode;
            typeof n.componentWillUnmount == "function" && by(e, e.return, n),
              ra(e);
            break;
          case 27:
            pl(e.stateNode);
          case 26:
          case 5:
            Ke(e, e.return), ra(e);
            break;
          case 22:
            e.memoizedState === null && ra(e);
            break;
          case 30:
            ra(e);
            break;
          default:
            ra(e);
        }
        t = t.sibling;
      }
    }
    function zn(t, e, n) {
      for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
        var i = e.alternate,
          s = t,
          r = e,
          f = r.flags;
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            zn(s, r, n), ll(4, r);
            break;
          case 1:
            if (
              (zn(s, r, n),
              (i = r),
              (s = i.stateNode),
              typeof s.componentDidMount == "function")
            )
              try {
                s.componentDidMount();
              } catch (D) {
                At(i, i.return, D);
              }
            if (((i = r), (s = i.updateQueue), s !== null)) {
              var y = i.stateNode;
              try {
                var b = s.shared.hiddenCallbacks;
                if (b !== null)
                  for (
                    s.shared.hiddenCallbacks = null, s = 0;
                    s < b.length;
                    s++
                  )
                    lp(b[s], y);
              } catch (D) {
                At(i, i.return, D);
              }
            }
            n && f & 64 && Sy(r), sl(r, r.return);
            break;
          case 27:
            Ay(r);
          case 26:
          case 5:
            zn(s, r, n), n && i === null && f & 4 && Ty(r), sl(r, r.return);
            break;
          case 12:
            zn(s, r, n);
            break;
          case 13:
            zn(s, r, n), n && f & 4 && Cy(s, r);
            break;
          case 22:
            r.memoizedState === null && zn(s, r, n), sl(r, r.return);
            break;
          case 30:
            break;
          default:
            zn(s, r, n);
        }
        e = e.sibling;
      }
    }
    function ac(t, e) {
      var n = null;
      t !== null &&
        t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (n = t.memoizedState.cachePool.pool),
        (t = null),
        e.memoizedState !== null &&
          e.memoizedState.cachePool !== null &&
          (t = e.memoizedState.cachePool.pool),
        t !== n && (t != null && t.refCount++, n != null && Qi(n));
    }
    function ic(t, e) {
      (t = null),
        e.alternate !== null && (t = e.alternate.memoizedState.cache),
        (e = e.memoizedState.cache),
        e !== t && (e.refCount++, t != null && Qi(t));
    }
    function ke(t, e, n, i) {
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; ) Vy(t, e, n, i), (e = e.sibling);
    }
    function Vy(t, e, n, i) {
      var s = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          ke(t, e, n, i), s & 2048 && ll(9, e);
          break;
        case 1:
          ke(t, e, n, i);
          break;
        case 3:
          ke(t, e, n, i),
            s & 2048 &&
              ((t = null),
              e.alternate !== null && (t = e.alternate.memoizedState.cache),
              (e = e.memoizedState.cache),
              e !== t && (e.refCount++, t != null && Qi(t)));
          break;
        case 12:
          if (s & 2048) {
            ke(t, e, n, i), (t = e.stateNode);
            try {
              var r = e.memoizedProps,
                f = r.id,
                y = r.onPostCommit;
              typeof y == "function" &&
                y(
                  f,
                  e.alternate === null ? "mount" : "update",
                  t.passiveEffectDuration,
                  -0
                );
            } catch (b) {
              At(e, e.return, b);
            }
          } else ke(t, e, n, i);
          break;
        case 13:
          ke(t, e, n, i);
          break;
        case 23:
          break;
        case 22:
          (r = e.stateNode),
            (f = e.alternate),
            e.memoizedState !== null
              ? r._visibility & 2
                ? ke(t, e, n, i)
                : ul(t, e)
              : r._visibility & 2
              ? ke(t, e, n, i)
              : ((r._visibility |= 2),
                Ja(t, e, n, i, (e.subtreeFlags & 10256) !== 0)),
            s & 2048 && ac(f, e);
          break;
        case 24:
          ke(t, e, n, i), s & 2048 && ic(e.alternate, e);
          break;
        default:
          ke(t, e, n, i);
      }
    }
    function Ja(t, e, n, i, s) {
      for (s = s && (e.subtreeFlags & 10256) !== 0, e = e.child; e !== null; ) {
        var r = t,
          f = e,
          y = n,
          b = i,
          D = f.flags;
        switch (f.tag) {
          case 0:
          case 11:
          case 15:
            Ja(r, f, y, b, s), ll(8, f);
            break;
          case 23:
            break;
          case 22:
            var _ = f.stateNode;
            f.memoizedState !== null
              ? _._visibility & 2
                ? Ja(r, f, y, b, s)
                : ul(r, f)
              : ((_._visibility |= 2), Ja(r, f, y, b, s)),
              s && D & 2048 && ac(f.alternate, f);
            break;
          case 24:
            Ja(r, f, y, b, s), s && D & 2048 && ic(f.alternate, f);
            break;
          default:
            Ja(r, f, y, b, s);
        }
        e = e.sibling;
      }
    }
    function ul(t, e) {
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; ) {
          var n = t,
            i = e,
            s = i.flags;
          switch (i.tag) {
            case 22:
              ul(n, i), s & 2048 && ac(i.alternate, i);
              break;
            case 24:
              ul(n, i), s & 2048 && ic(i.alternate, i);
              break;
            default:
              ul(n, i);
          }
          e = e.sibling;
        }
    }
    var ol = 8192;
    function Pa(t) {
      if (t.subtreeFlags & ol)
        for (t = t.child; t !== null; ) _y(t), (t = t.sibling);
    }
    function _y(t) {
      switch (t.tag) {
        case 26:
          Pa(t),
            t.flags & ol &&
              t.memoizedState !== null &&
              l2(Le, t.memoizedState, t.memoizedProps);
          break;
        case 5:
          Pa(t);
          break;
        case 3:
        case 4:
          var e = Le;
          (Le = Zs(t.stateNode.containerInfo)), Pa(t), (Le = e);
          break;
        case 22:
          t.memoizedState === null &&
            ((e = t.alternate),
            e !== null && e.memoizedState !== null
              ? ((e = ol), (ol = 16777216), Pa(t), (ol = e))
              : Pa(t));
          break;
        default:
          Pa(t);
      }
    }
    function Uy(t) {
      var e = t.alternate;
      if (e !== null && ((t = e.child), t !== null)) {
        e.child = null;
        do (e = t.sibling), (t.sibling = null), (t = e);
        while (t !== null);
      }
    }
    function rl(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null)
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            (Kt = i), jy(i, t);
          }
        Uy(t);
      }
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) wy(t), (t = t.sibling);
    }
    function wy(t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          rl(t), t.flags & 2048 && Cn(9, t, t.return);
          break;
        case 3:
          rl(t);
          break;
        case 12:
          rl(t);
          break;
        case 22:
          var e = t.stateNode;
          t.memoizedState !== null &&
          e._visibility & 2 &&
          (t.return === null || t.return.tag !== 13)
            ? ((e._visibility &= -3), _s(t))
            : rl(t);
          break;
        default:
          rl(t);
      }
    }
    function _s(t) {
      var e = t.deletions;
      if ((t.flags & 16) !== 0) {
        if (e !== null)
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            (Kt = i), jy(i, t);
          }
        Uy(t);
      }
      for (t = t.child; t !== null; ) {
        switch (((e = t), e.tag)) {
          case 0:
          case 11:
          case 15:
            Cn(8, e, e.return), _s(e);
            break;
          case 22:
            (n = e.stateNode),
              n._visibility & 2 && ((n._visibility &= -3), _s(e));
            break;
          default:
            _s(e);
        }
        t = t.sibling;
      }
    }
    function jy(t, e) {
      for (; Kt !== null; ) {
        var n = Kt;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Cn(8, n, e);
            break;
          case 23:
          case 22:
            if (
              n.memoizedState !== null &&
              n.memoizedState.cachePool !== null
            ) {
              var i = n.memoizedState.cachePool.pool;
              i != null && i.refCount++;
            }
            break;
          case 24:
            Qi(n.memoizedState.cache);
        }
        if (((i = n.child), i !== null)) (i.return = n), (Kt = i);
        else
          t: for (n = t; Kt !== null; ) {
            i = Kt;
            var s = i.sibling,
              r = i.return;
            if ((Dy(i), i === n)) {
              Kt = null;
              break t;
            }
            if (s !== null) {
              (s.return = r), (Kt = s);
              break t;
            }
            Kt = r;
          }
      }
    }
    var Tx = {
        getCacheForType: function (t) {
          var e = ne(Gt),
            n = e.data.get(t);
          return n === void 0 && ((n = t()), e.data.set(t, n)), n;
        },
      },
      xx = typeof WeakMap == "function" ? WeakMap : Map,
      gt = 0,
      Mt = null,
      ft = null,
      dt = 0,
      vt = 0,
      be = null,
      Vn = !1,
      Fa = !1,
      lc = !1,
      fn = 0,
      jt = 0,
      _n = 0,
      ca = 0,
      sc = 0,
      we = 0,
      $a = 0,
      cl = null,
      he = null,
      uc = !1,
      oc = 0,
      Us = 1 / 0,
      ws = null,
      Un = null,
      Ft = 0,
      wn = null,
      Wa = null,
      Ia = 0,
      rc = 0,
      cc = null,
      By = null,
      fl = 0,
      fc = null;
    function Te() {
      if ((gt & 2) !== 0 && dt !== 0) return dt & -dt;
      if (z.T !== null) {
        var t = qa;
        return t !== 0 ? t : vc();
      }
      return Wd();
    }
    function Ny() {
      we === 0 && (we = (dt & 536870912) === 0 || yt ? Jd() : 536870912);
      var t = Ue.current;
      return t !== null && (t.flags |= 32), we;
    }
    function xe(t, e, n) {
      ((t === Mt && (vt === 2 || vt === 9)) ||
        t.cancelPendingCommit !== null) &&
        (ti(t, 0), jn(t, dt, we, !1)),
        Oi(t, n),
        ((gt & 2) === 0 || t !== Mt) &&
          (t === Mt &&
            ((gt & 2) === 0 && (ca |= n), jt === 4 && jn(t, dt, we, !1)),
          Je(t));
    }
    function Ly(t, e, n) {
      if ((gt & 6) !== 0) throw Error(o(327));
      var i = (!n && (e & 124) === 0 && (e & t.expiredLanes) === 0) || Ci(t, e),
        s = i ? Mx(t, e) : mc(t, e, !0),
        r = i;
      do {
        if (s === 0) {
          Fa && !i && jn(t, e, 0, !1);
          break;
        } else {
          if (((n = t.current.alternate), r && !Ax(n))) {
            (s = mc(t, e, !1)), (r = !1);
            continue;
          }
          if (s === 2) {
            if (((r = e), t.errorRecoveryDisabledLanes & r)) var f = 0;
            else
              (f = t.pendingLanes & -536870913),
                (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0);
            if (f !== 0) {
              e = f;
              t: {
                var y = t;
                s = cl;
                var b = y.current.memoizedState.isDehydrated;
                if (
                  (b && (ti(y, f).flags |= 256), (f = mc(y, f, !1)), f !== 2)
                ) {
                  if (lc && !b) {
                    (y.errorRecoveryDisabledLanes |= r), (ca |= r), (s = 4);
                    break t;
                  }
                  (r = he),
                    (he = s),
                    r !== null &&
                      (he === null ? (he = r) : he.push.apply(he, r));
                }
                s = f;
              }
              if (((r = !1), s !== 2)) continue;
            }
          }
          if (s === 1) {
            ti(t, 0), jn(t, e, 0, !0);
            break;
          }
          t: {
            switch (((i = t), (r = s), r)) {
              case 0:
              case 1:
                throw Error(o(345));
              case 4:
                if ((e & 4194048) !== e) break;
              case 6:
                jn(i, e, we, !Vn);
                break t;
              case 2:
                he = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(o(329));
            }
            if ((e & 62914560) === e && ((s = oc + 300 - Xe()), 10 < s)) {
              if ((jn(i, e, we, !Vn), Ql(i, 0, !0) !== 0)) break t;
              i.timeoutHandle = d0(
                Hy.bind(null, i, n, he, ws, uc, e, we, ca, $a, Vn, r, 2, -0, 0),
                s
              );
              break t;
            }
            Hy(i, n, he, ws, uc, e, we, ca, $a, Vn, r, 0, -0, 0);
          }
        }
        break;
      } while (!0);
      Je(t);
    }
    function Hy(t, e, n, i, s, r, f, y, b, D, _, j, R, C) {
      if (
        ((t.timeoutHandle = -1),
        (j = e.subtreeFlags),
        (j & 8192 || (j & 16785408) === 16785408) &&
          ((vl = { stylesheets: null, count: 0, unsuspend: i2 }),
          _y(e),
          (j = s2()),
          j !== null))
      ) {
        (t.cancelPendingCommit = j(
          Ky.bind(null, t, e, r, n, i, s, f, y, b, _, 1, R, C)
        )),
          jn(t, r, f, !D);
        return;
      }
      Ky(t, e, r, n, i, s, f, y, b);
    }
    function Ax(t) {
      for (var e = t; ; ) {
        var n = e.tag;
        if (
          (n === 0 || n === 11 || n === 15) &&
          e.flags & 16384 &&
          ((n = e.updateQueue), n !== null && ((n = n.stores), n !== null))
        )
          for (var i = 0; i < n.length; i++) {
            var s = n[i],
              r = s.getSnapshot;
            s = s.value;
            try {
              if (!ye(r(), s)) return !1;
            } catch {
              return !1;
            }
          }
        if (((n = e.child), e.subtreeFlags & 16384 && n !== null))
          (n.return = e), (e = n);
        else {
          if (e === t) break;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) return !0;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      }
      return !0;
    }
    function jn(t, e, n, i) {
      (e &= ~sc),
        (e &= ~ca),
        (t.suspendedLanes |= e),
        (t.pingedLanes &= ~e),
        i && (t.warmLanes |= e),
        (i = t.expirationTimes);
      for (var s = e; 0 < s; ) {
        var r = 31 - pe(s),
          f = 1 << r;
        (i[r] = -1), (s &= ~f);
      }
      n !== 0 && Fd(t, n, e);
    }
    function js() {
      return (gt & 6) === 0 ? (hl(0), !1) : !0;
    }
    function hc() {
      if (ft !== null) {
        if (vt === 0) var t = ft.return;
        else (t = ft), (nn = ia = null), Or(t), (Ka = null), (nl = 0), (t = ft);
        for (; t !== null; ) vy(t.alternate, t), (t = t.return);
        ft = null;
      }
    }
    function ti(t, e) {
      var n = t.timeoutHandle;
      n !== -1 && ((t.timeoutHandle = -1), Yx(n)),
        (n = t.cancelPendingCommit),
        n !== null && ((t.cancelPendingCommit = null), n()),
        hc(),
        (Mt = t),
        (ft = n = Ie(t.current, null)),
        (dt = e),
        (vt = 0),
        (be = null),
        (Vn = !1),
        (Fa = Ci(t, e)),
        (lc = !1),
        ($a = we = sc = ca = _n = jt = 0),
        (he = cl = null),
        (uc = !1),
        (e & 8) !== 0 && (e |= e & 32);
      var i = t.entangledLanes;
      if (i !== 0)
        for (t = t.entanglements, i &= e; 0 < i; ) {
          var s = 31 - pe(i),
            r = 1 << s;
          (e |= t[s]), (i &= ~r);
        }
      return (fn = e), as(), n;
    }
    function qy(t, e) {
      (rt = null),
        (z.H = xs),
        e === ki || e === hs
          ? ((e = ap()), (vt = 3))
          : e === tp
          ? ((e = ap()), (vt = 4))
          : (vt =
              e === iy
                ? 8
                : e !== null &&
                  typeof e == "object" &&
                  typeof e.then == "function"
                ? 6
                : 1),
        (be = e),
        ft === null && ((jt = 1), Rs(t, Oe(e, t.current)));
    }
    function Yy() {
      var t = z.H;
      return (z.H = xs), t === null ? xs : t;
    }
    function Gy() {
      var t = z.A;
      return (z.A = Tx), t;
    }
    function dc() {
      (jt = 4),
        Vn || ((dt & 4194048) !== dt && Ue.current !== null) || (Fa = !0),
        ((_n & 134217727) === 0 && (ca & 134217727) === 0) ||
          Mt === null ||
          jn(Mt, dt, we, !1);
    }
    function mc(t, e, n) {
      var i = gt;
      gt |= 2;
      var s = Yy(),
        r = Gy();
      (Mt !== t || dt !== e) && ((ws = null), ti(t, e)), (e = !1);
      var f = jt;
      t: do
        try {
          if (vt !== 0 && ft !== null) {
            var y = ft,
              b = be;
            switch (vt) {
              case 8:
                hc(), (f = 6);
                break t;
              case 3:
              case 2:
              case 9:
              case 6:
                Ue.current === null && (e = !0);
                var D = vt;
                if (((vt = 0), (be = null), ei(t, y, b, D), n && Fa)) {
                  f = 0;
                  break t;
                }
                break;
              default:
                (D = vt), (vt = 0), (be = null), ei(t, y, b, D);
            }
          }
          Ex(), (f = jt);
          break;
        } catch (_) {
          qy(t, _);
        }
      while (!0);
      return (
        e && t.shellSuspendCounter++,
        (nn = ia = null),
        (gt = i),
        (z.H = s),
        (z.A = r),
        ft === null && ((Mt = null), (dt = 0), as()),
        f
      );
    }
    function Ex() {
      for (; ft !== null; ) Xy(ft);
    }
    function Mx(t, e) {
      var n = gt;
      gt |= 2;
      var i = Yy(),
        s = Gy();
      Mt !== t || dt !== e
        ? ((ws = null), (Us = Xe() + 500), ti(t, e))
        : (Fa = Ci(t, e));
      t: do
        try {
          if (vt !== 0 && ft !== null) {
            e = ft;
            var r = be;
            e: switch (vt) {
              case 1:
                (vt = 0), (be = null), ei(t, e, r, 1);
                break;
              case 2:
              case 9:
                if (ep(r)) {
                  (vt = 0), (be = null), Zy(e);
                  break;
                }
                (e = function () {
                  (vt !== 2 && vt !== 9) || Mt !== t || (vt = 7), Je(t);
                }),
                  r.then(e, e);
                break t;
              case 3:
                vt = 7;
                break t;
              case 4:
                vt = 5;
                break t;
              case 7:
                ep(r)
                  ? ((vt = 0), (be = null), Zy(e))
                  : ((vt = 0), (be = null), ei(t, e, r, 7));
                break;
              case 5:
                var f = null;
                switch (ft.tag) {
                  case 26:
                    f = ft.memoizedState;
                  case 5:
                  case 27:
                    var y = ft;
                    if (!f || M0(f)) {
                      (vt = 0), (be = null);
                      var b = y.sibling;
                      if (b !== null) ft = b;
                      else {
                        var D = y.return;
                        D !== null ? ((ft = D), Bs(D)) : (ft = null);
                      }
                      break e;
                    }
                }
                (vt = 0), (be = null), ei(t, e, r, 5);
                break;
              case 6:
                (vt = 0), (be = null), ei(t, e, r, 6);
                break;
              case 8:
                hc(), (jt = 6);
                break t;
              default:
                throw Error(o(462));
            }
          }
          Dx();
          break;
        } catch (_) {
          qy(t, _);
        }
      while (!0);
      return (
        (nn = ia = null),
        (z.H = i),
        (z.A = s),
        (gt = n),
        ft !== null ? 0 : ((Mt = null), (dt = 0), as(), jt)
      );
    }
    function Dx() {
      for (; ft !== null && !Jb(); ) Xy(ft);
    }
    function Xy(t) {
      var e = yy(t.alternate, t, fn);
      (t.memoizedProps = t.pendingProps), e === null ? Bs(t) : (ft = e);
    }
    function Zy(t) {
      var e = t,
        n = e.alternate;
      switch (e.tag) {
        case 15:
        case 0:
          e = cy(n, e, e.pendingProps, e.type, void 0, dt);
          break;
        case 11:
          e = cy(n, e, e.pendingProps, e.type.render, e.ref, dt);
          break;
        case 5:
          Or(e);
        default:
          vy(n, e), (e = ft = Qm(e, fn)), (e = yy(n, e, fn));
      }
      (t.memoizedProps = t.pendingProps), e === null ? Bs(t) : (ft = e);
    }
    function ei(t, e, n, i) {
      (nn = ia = null), Or(e), (Ka = null), (nl = 0);
      var s = e.return;
      try {
        if (px(t, s, e, n, dt)) {
          (jt = 1), Rs(t, Oe(n, t.current)), (ft = null);
          return;
        }
      } catch (r) {
        if (s !== null) throw ((ft = s), r);
        (jt = 1), Rs(t, Oe(n, t.current)), (ft = null);
        return;
      }
      e.flags & 32768
        ? (yt || i === 1
            ? (t = !0)
            : Fa || (dt & 536870912) !== 0
            ? (t = !1)
            : ((Vn = t = !0),
              (i === 2 || i === 9 || i === 3 || i === 6) &&
                ((i = Ue.current),
                i !== null && i.tag === 13 && (i.flags |= 16384))),
          Qy(e, t))
        : Bs(e);
    }
    function Bs(t) {
      var e = t;
      do {
        if ((e.flags & 32768) !== 0) {
          Qy(e, Vn);
          return;
        }
        t = e.return;
        var n = gx(e.alternate, e, fn);
        if (n !== null) {
          ft = n;
          return;
        }
        if (((e = e.sibling), e !== null)) {
          ft = e;
          return;
        }
        ft = e = t;
      } while (e !== null);
      jt === 0 && (jt = 5);
    }
    function Qy(t, e) {
      do {
        var n = vx(t.alternate, t);
        if (n !== null) {
          (n.flags &= 32767), (ft = n);
          return;
        }
        if (
          ((n = t.return),
          n !== null &&
            ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
          !e && ((t = t.sibling), t !== null))
        ) {
          ft = t;
          return;
        }
        ft = t = n;
      } while (t !== null);
      (jt = 6), (ft = null);
    }
    function Ky(t, e, n, i, s, r, f, y, b) {
      t.cancelPendingCommit = null;
      do Ns();
      while (Ft !== 0);
      if ((gt & 6) !== 0) throw Error(o(327));
      if (e !== null) {
        if (e === t.current) throw Error(o(177));
        if (
          ((r = e.lanes | e.childLanes),
          (r |= ir),
          iT(t, n, r, f, y, b),
          t === Mt && ((ft = Mt = null), (dt = 0)),
          (Wa = e),
          (wn = t),
          (Ia = n),
          (rc = r),
          (cc = s),
          (By = i),
          (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
            ? ((t.callbackNode = null),
              (t.callbackPriority = 0),
              zx(Gl, function () {
                return $y(), null;
              }))
            : ((t.callbackNode = null), (t.callbackPriority = 0)),
          (i = (e.flags & 13878) !== 0),
          (e.subtreeFlags & 13878) !== 0 || i)
        ) {
          (i = z.T), (z.T = null), (s = N.p), (N.p = 2), (f = gt), (gt |= 4);
          try {
            Sx(t, e, n);
          } finally {
            (gt = f), (N.p = s), (z.T = i);
          }
        }
        (Ft = 1), ky(), Jy(), Py();
      }
    }
    function ky() {
      if (Ft === 1) {
        Ft = 0;
        var t = wn,
          e = Wa,
          n = (e.flags & 13878) !== 0;
        if ((e.subtreeFlags & 13878) !== 0 || n) {
          (n = z.T), (z.T = null);
          var i = N.p;
          N.p = 2;
          var s = gt;
          gt |= 4;
          try {
            Oy(e, t);
            var r = Dc,
              f = jm(t.containerInfo),
              y = r.focusedElem,
              b = r.selectionRange;
            if (
              f !== y &&
              y &&
              y.ownerDocument &&
              wm(y.ownerDocument.documentElement, y)
            ) {
              if (b !== null && Io(y)) {
                var D = b.start,
                  _ = b.end;
                if ((_ === void 0 && (_ = D), "selectionStart" in y))
                  (y.selectionStart = D),
                    (y.selectionEnd = Math.min(_, y.value.length));
                else {
                  var j = y.ownerDocument || document,
                    R = (j && j.defaultView) || window;
                  if (R.getSelection) {
                    var C = R.getSelection(),
                      it = y.textContent.length,
                      et = Math.min(b.start, it),
                      xt = b.end === void 0 ? et : Math.min(b.end, it);
                    !C.extend && et > xt && ((f = xt), (xt = et), (et = f));
                    var E = Um(y, et),
                      A = Um(y, xt);
                    if (
                      E &&
                      A &&
                      (C.rangeCount !== 1 ||
                        C.anchorNode !== E.node ||
                        C.anchorOffset !== E.offset ||
                        C.focusNode !== A.node ||
                        C.focusOffset !== A.offset)
                    ) {
                      var M = j.createRange();
                      M.setStart(E.node, E.offset),
                        C.removeAllRanges(),
                        et > xt
                          ? (C.addRange(M), C.extend(A.node, A.offset))
                          : (M.setEnd(A.node, A.offset), C.addRange(M));
                    }
                  }
                }
              }
              for (j = [], C = y; (C = C.parentNode); )
                C.nodeType === 1 &&
                  j.push({ element: C, left: C.scrollLeft, top: C.scrollTop });
              for (
                typeof y.focus == "function" && y.focus(), y = 0;
                y < j.length;
                y++
              ) {
                var U = j[y];
                (U.element.scrollLeft = U.left), (U.element.scrollTop = U.top);
              }
            }
            (Ps = !!Mc), (Dc = Mc = null);
          } finally {
            (gt = s), (N.p = i), (z.T = n);
          }
        }
        (t.current = e), (Ft = 2);
      }
    }
    function Jy() {
      if (Ft === 2) {
        Ft = 0;
        var t = wn,
          e = Wa,
          n = (e.flags & 8772) !== 0;
        if ((e.subtreeFlags & 8772) !== 0 || n) {
          (n = z.T), (z.T = null);
          var i = N.p;
          N.p = 2;
          var s = gt;
          gt |= 4;
          try {
            My(t, e.alternate, e);
          } finally {
            (gt = s), (N.p = i), (z.T = n);
          }
        }
        Ft = 3;
      }
    }
    function Py() {
      if (Ft === 4 || Ft === 3) {
        (Ft = 0), Pb();
        var t = wn,
          e = Wa,
          n = Ia,
          i = By;
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? (Ft = 5)
          : ((Ft = 0), (Wa = wn = null), Fy(t, t.pendingLanes));
        var s = t.pendingLanes;
        if (
          (s === 0 && (Un = null),
          _o(n),
          (e = e.stateNode),
          me && typeof me.onCommitFiberRoot == "function")
        )
          try {
            me.onCommitFiberRoot(
              Ri,
              e,
              void 0,
              (e.current.flags & 128) === 128
            );
          } catch {}
        if (i !== null) {
          (e = z.T), (s = N.p), (N.p = 2), (z.T = null);
          try {
            for (var r = t.onRecoverableError, f = 0; f < i.length; f++) {
              var y = i[f];
              r(y.value, { componentStack: y.stack });
            }
          } finally {
            (z.T = e), (N.p = s);
          }
        }
        (Ia & 3) !== 0 && Ns(),
          Je(t),
          (s = t.pendingLanes),
          (n & 4194090) !== 0 && (s & 42) !== 0
            ? t === fc
              ? fl++
              : ((fl = 0), (fc = t))
            : (fl = 0),
          hl(0);
      }
    }
    function Fy(t, e) {
      (t.pooledCacheLanes &= e) === 0 &&
        ((e = t.pooledCache), e != null && ((t.pooledCache = null), Qi(e)));
    }
    function Ns(t) {
      return ky(), Jy(), Py(), $y();
    }
    function $y() {
      if (Ft !== 5) return !1;
      var t = wn,
        e = rc;
      rc = 0;
      var n = _o(Ia),
        i = z.T,
        s = N.p;
      try {
        (N.p = 32 > n ? 32 : n), (z.T = null), (n = cc), (cc = null);
        var r = wn,
          f = Ia;
        if (((Ft = 0), (Wa = wn = null), (Ia = 0), (gt & 6) !== 0))
          throw Error(o(331));
        var y = gt;
        if (
          ((gt |= 4),
          wy(r.current),
          Vy(r, r.current, f, n),
          (gt = y),
          hl(0, !1),
          me && typeof me.onPostCommitFiberRoot == "function")
        )
          try {
            me.onPostCommitFiberRoot(Ri, r);
          } catch {}
        return !0;
      } finally {
        (N.p = s), (z.T = i), Fy(t, e);
      }
    }
    function Wy(t, e, n) {
      (e = Oe(n, e)),
        (e = Xr(t.stateNode, e, 2)),
        (t = En(t, e, 2)),
        t !== null && (Oi(t, 2), Je(t));
    }
    function At(t, e, n) {
      if (t.tag === 3) Wy(t, t, n);
      else
        for (; e !== null; ) {
          if (e.tag === 3) {
            Wy(e, t, n);
            break;
          } else if (e.tag === 1) {
            var i = e.stateNode;
            if (
              typeof e.type.getDerivedStateFromError == "function" ||
              (typeof i.componentDidCatch == "function" &&
                (Un === null || !Un.has(i)))
            ) {
              (t = Oe(n, t)),
                (n = ny(2)),
                (i = En(e, n, 2)),
                i !== null && (ay(n, i, e, t), Oi(i, 2), Je(i));
              break;
            }
          }
          e = e.return;
        }
    }
    function pc(t, e, n) {
      var i = t.pingCache;
      if (i === null) {
        i = t.pingCache = new xx();
        var s = new Set();
        i.set(e, s);
      } else (s = i.get(e)), s === void 0 && ((s = new Set()), i.set(e, s));
      s.has(n) ||
        ((lc = !0), s.add(n), (t = Rx.bind(null, t, e, n)), e.then(t, t));
    }
    function Rx(t, e, n) {
      var i = t.pingCache;
      i !== null && i.delete(e),
        (t.pingedLanes |= t.suspendedLanes & n),
        (t.warmLanes &= ~n),
        Mt === t &&
          (dt & n) === n &&
          (jt === 4 || (jt === 3 && (dt & 62914560) === dt && 300 > Xe() - oc)
            ? (gt & 2) === 0 && ti(t, 0)
            : (sc |= n),
          $a === dt && ($a = 0)),
        Je(t);
    }
    function Iy(t, e) {
      e === 0 && (e = Pd()), (t = Ba(t, e)), t !== null && (Oi(t, e), Je(t));
    }
    function Cx(t) {
      var e = t.memoizedState,
        n = 0;
      e !== null && (n = e.retryLane), Iy(t, n);
    }
    function Ox(t, e) {
      var n = 0;
      switch (t.tag) {
        case 13:
          var i = t.stateNode,
            s = t.memoizedState;
          s !== null && (n = s.retryLane);
          break;
        case 19:
          i = t.stateNode;
          break;
        case 22:
          i = t.stateNode._retryCache;
          break;
        default:
          throw Error(o(314));
      }
      i !== null && i.delete(e), Iy(t, n);
    }
    function zx(t, e) {
      return Co(t, e);
    }
    var Ls = null,
      ni = null,
      yc = !1,
      Hs = !1,
      gc = !1,
      fa = 0;
    function Je(t) {
      t !== ni &&
        t.next === null &&
        (ni === null ? (Ls = ni = t) : (ni = ni.next = t)),
        (Hs = !0),
        yc || ((yc = !0), _x());
    }
    function hl(t, e) {
      if (!gc && Hs) {
        gc = !0;
        do
          for (var n = !1, i = Ls; i !== null; ) {
            if (t !== 0) {
              var s = i.pendingLanes;
              if (s === 0) var r = 0;
              else {
                var f = i.suspendedLanes,
                  y = i.pingedLanes;
                (r = (1 << (31 - pe(42 | t) + 1)) - 1),
                  (r &= s & ~(f & ~y)),
                  (r = r & 201326741 ? (r & 201326741) | 1 : r ? r | 2 : 0);
              }
              r !== 0 && ((n = !0), a0(i, r));
            } else
              (r = dt),
                (r = Ql(
                  i,
                  i === Mt ? r : 0,
                  i.cancelPendingCommit !== null || i.timeoutHandle !== -1
                )),
                (r & 3) === 0 || Ci(i, r) || ((n = !0), a0(i, r));
            i = i.next;
          }
        while (n);
        gc = !1;
      }
    }
    function Vx() {
      t0();
    }
    function t0() {
      Hs = yc = !1;
      var t = 0;
      fa !== 0 && (qx() && (t = fa), (fa = 0));
      for (var e = Xe(), n = null, i = Ls; i !== null; ) {
        var s = i.next,
          r = e0(i, e);
        r === 0
          ? ((i.next = null),
            n === null ? (Ls = s) : (n.next = s),
            s === null && (ni = n))
          : ((n = i), (t !== 0 || (r & 3) !== 0) && (Hs = !0)),
          (i = s);
      }
      hl(t);
    }
    function e0(t, e) {
      for (
        var n = t.suspendedLanes,
          i = t.pingedLanes,
          s = t.expirationTimes,
          r = t.pendingLanes & -62914561;
        0 < r;

      ) {
        var f = 31 - pe(r),
          y = 1 << f,
          b = s[f];
        b === -1
          ? ((y & n) === 0 || (y & i) !== 0) && (s[f] = aT(y, e))
          : b <= e && (t.expiredLanes |= y),
          (r &= ~y);
      }
      if (
        ((e = Mt),
        (n = dt),
        (n = Ql(
          t,
          t === e ? n : 0,
          t.cancelPendingCommit !== null || t.timeoutHandle !== -1
        )),
        (i = t.callbackNode),
        n === 0 ||
          (t === e && (vt === 2 || vt === 9)) ||
          t.cancelPendingCommit !== null)
      )
        return (
          i !== null && i !== null && Oo(i),
          (t.callbackNode = null),
          (t.callbackPriority = 0)
        );
      if ((n & 3) === 0 || Ci(t, n)) {
        if (((e = n & -n), e === t.callbackPriority)) return e;
        switch ((i !== null && Oo(i), _o(n))) {
          case 2:
          case 8:
            n = Kd;
            break;
          case 32:
            n = Gl;
            break;
          case 268435456:
            n = kd;
            break;
          default:
            n = Gl;
        }
        return (
          (i = n0.bind(null, t)),
          (n = Co(n, i)),
          (t.callbackPriority = e),
          (t.callbackNode = n),
          e
        );
      }
      return (
        i !== null && i !== null && Oo(i),
        (t.callbackPriority = 2),
        (t.callbackNode = null),
        2
      );
    }
    function n0(t, e) {
      if (Ft !== 0 && Ft !== 5)
        return (t.callbackNode = null), (t.callbackPriority = 0), null;
      var n = t.callbackNode;
      if (Ns() && t.callbackNode !== n) return null;
      var i = dt;
      return (
        (i = Ql(
          t,
          t === Mt ? i : 0,
          t.cancelPendingCommit !== null || t.timeoutHandle !== -1
        )),
        i === 0
          ? null
          : (Ly(t, i, e),
            e0(t, Xe()),
            t.callbackNode != null && t.callbackNode === n
              ? n0.bind(null, t)
              : null)
      );
    }
    function a0(t, e) {
      if (Ns()) return null;
      Ly(t, e, !0);
    }
    function _x() {
      Gx(function () {
        (gt & 6) !== 0 ? Co(Qd, Vx) : t0();
      });
    }
    function vc() {
      return fa === 0 && (fa = Jd()), fa;
    }
    function i0(t) {
      return t == null || typeof t == "symbol" || typeof t == "boolean"
        ? null
        : typeof t == "function"
        ? t
        : Fl("" + t);
    }
    function l0(t, e) {
      var n = e.ownerDocument.createElement("input");
      return (
        (n.name = e.name),
        (n.value = e.value),
        t.id && n.setAttribute("form", t.id),
        e.parentNode.insertBefore(n, e),
        (t = new FormData(t)),
        n.parentNode.removeChild(n),
        t
      );
    }
    function Ux(t, e, n, i, s) {
      if (e === "submit" && n && n.stateNode === s) {
        var r = i0((s[oe] || null).action),
          f = i.submitter;
        f &&
          ((e = (e = f[oe] || null)
            ? i0(e.formAction)
            : f.getAttribute("formAction")),
          e !== null && ((r = e), (f = null)));
        var y = new ts("action", "action", null, i, s);
        t.push({
          event: y,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (i.defaultPrevented) {
                  if (fa !== 0) {
                    var b = f ? l0(s, f) : new FormData(s);
                    Lr(
                      n,
                      { pending: !0, data: b, method: s.method, action: r },
                      null,
                      b
                    );
                  }
                } else
                  typeof r == "function" &&
                    (y.preventDefault(),
                    (b = f ? l0(s, f) : new FormData(s)),
                    Lr(
                      n,
                      { pending: !0, data: b, method: s.method, action: r },
                      r,
                      b
                    ));
              },
              currentTarget: s,
            },
          ],
        });
      }
    }
    for (var Sc = 0; Sc < ar.length; Sc++) {
      var bc = ar[Sc],
        wx = bc.toLowerCase(),
        jx = bc[0].toUpperCase() + bc.slice(1);
      Ne(wx, "on" + jx);
    }
    Ne(Lm, "onAnimationEnd"),
      Ne(Hm, "onAnimationIteration"),
      Ne(qm, "onAnimationStart"),
      Ne("dblclick", "onDoubleClick"),
      Ne("focusin", "onFocus"),
      Ne("focusout", "onBlur"),
      Ne(WT, "onTransitionRun"),
      Ne(IT, "onTransitionStart"),
      Ne(tx, "onTransitionCancel"),
      Ne(Ym, "onTransitionEnd"),
      Da("onMouseEnter", ["mouseout", "mouseover"]),
      Da("onMouseLeave", ["mouseout", "mouseover"]),
      Da("onPointerEnter", ["pointerout", "pointerover"]),
      Da("onPointerLeave", ["pointerout", "pointerover"]),
      Pn(
        "onChange",
        "change click focusin focusout input keydown keyup selectionchange".split(
          " "
        )
      ),
      Pn(
        "onSelect",
        "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
          " "
        )
      ),
      Pn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
      Pn(
        "onCompositionEnd",
        "compositionend focusout keydown keypress keyup mousedown".split(" ")
      ),
      Pn(
        "onCompositionStart",
        "compositionstart focusout keydown keypress keyup mousedown".split(" ")
      ),
      Pn(
        "onCompositionUpdate",
        "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
      );
    var dl =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        ),
      Bx = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle"
          .split(" ")
          .concat(dl)
      );
    function s0(t, e) {
      e = (e & 4) !== 0;
      for (var n = 0; n < t.length; n++) {
        var i = t[n],
          s = i.event;
        i = i.listeners;
        t: {
          var r = void 0;
          if (e)
            for (var f = i.length - 1; 0 <= f; f--) {
              var y = i[f],
                b = y.instance,
                D = y.currentTarget;
              if (((y = y.listener), b !== r && s.isPropagationStopped()))
                break t;
              (r = y), (s.currentTarget = D);
              try {
                r(s);
              } catch (_) {
                Ds(_);
              }
              (s.currentTarget = null), (r = b);
            }
          else
            for (f = 0; f < i.length; f++) {
              if (
                ((y = i[f]),
                (b = y.instance),
                (D = y.currentTarget),
                (y = y.listener),
                b !== r && s.isPropagationStopped())
              )
                break t;
              (r = y), (s.currentTarget = D);
              try {
                r(s);
              } catch (_) {
                Ds(_);
              }
              (s.currentTarget = null), (r = b);
            }
        }
      }
    }
    function ht(t, e) {
      var n = e[Uo];
      n === void 0 && (n = e[Uo] = new Set());
      var i = t + "__bubble";
      n.has(i) || (u0(e, t, 2, !1), n.add(i));
    }
    function Tc(t, e, n) {
      var i = 0;
      e && (i |= 4), u0(n, t, i, e);
    }
    var qs = "_reactListening" + Math.random().toString(36).slice(2);
    function xc(t) {
      if (!t[qs]) {
        (t[qs] = !0),
          tm.forEach(function (n) {
            n !== "selectionchange" &&
              (Bx.has(n) || Tc(n, !1, t), Tc(n, !0, t));
          });
        var e = t.nodeType === 9 ? t : t.ownerDocument;
        e === null || e[qs] || ((e[qs] = !0), Tc("selectionchange", !1, e));
      }
    }
    function u0(t, e, n, i) {
      switch (V0(e)) {
        case 2:
          var s = r2;
          break;
        case 8:
          s = c2;
          break;
        default:
          s = Bc;
      }
      (n = s.bind(null, e, n, t)),
        (s = void 0),
        !Zo ||
          (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
          (s = !0),
        i
          ? s !== void 0
            ? t.addEventListener(e, n, { capture: !0, passive: s })
            : t.addEventListener(e, n, !0)
          : s !== void 0
          ? t.addEventListener(e, n, { passive: s })
          : t.addEventListener(e, n, !1);
    }
    function Ac(t, e, n, i, s) {
      var r = i;
      if ((e & 1) === 0 && (e & 2) === 0 && i !== null)
        t: for (;;) {
          if (i === null) return;
          var f = i.tag;
          if (f === 3 || f === 4) {
            var y = i.stateNode.containerInfo;
            if (y === s) break;
            if (f === 4)
              for (f = i.return; f !== null; ) {
                var b = f.tag;
                if ((b === 3 || b === 4) && f.stateNode.containerInfo === s)
                  return;
                f = f.return;
              }
            for (; y !== null; ) {
              if (((f = Aa(y)), f === null)) return;
              if (((b = f.tag), b === 5 || b === 6 || b === 26 || b === 27)) {
                i = r = f;
                continue t;
              }
              y = y.parentNode;
            }
          }
          i = i.return;
        }
      mm(function () {
        var D = r,
          _ = Go(n),
          j = [];
        t: {
          var R = Gm.get(t);
          if (R !== void 0) {
            var C = ts,
              it = t;
            switch (t) {
              case "keypress":
                if (Wl(n) === 0) break t;
              case "keydown":
              case "keyup":
                C = zT;
                break;
              case "focusin":
                (it = "focus"), (C = Jo);
                break;
              case "focusout":
                (it = "blur"), (C = Jo);
                break;
              case "beforeblur":
              case "afterblur":
                C = Jo;
                break;
              case "click":
                if (n.button === 2) break t;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                C = gm;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                C = vT;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                C = UT;
                break;
              case Lm:
              case Hm:
              case qm:
                C = TT;
                break;
              case Ym:
                C = jT;
                break;
              case "scroll":
              case "scrollend":
                C = yT;
                break;
              case "wheel":
                C = NT;
                break;
              case "copy":
              case "cut":
              case "paste":
                C = AT;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                C = Sm;
                break;
              case "toggle":
              case "beforetoggle":
                C = HT;
            }
            var et = (e & 4) !== 0,
              xt = !et && (t === "scroll" || t === "scrollend"),
              E = et ? (R !== null ? R + "Capture" : null) : R;
            et = [];
            for (var A = D, M; A !== null; ) {
              var U = A;
              if (
                ((M = U.stateNode),
                (U = U.tag),
                (U !== 5 && U !== 26 && U !== 27) ||
                  M === null ||
                  E === null ||
                  ((U = _i(A, E)), U != null && et.push(ml(A, U, M))),
                xt)
              )
                break;
              A = A.return;
            }
            0 < et.length &&
              ((R = new C(R, it, null, n, _)),
              j.push({ event: R, listeners: et }));
          }
        }
        if ((e & 7) === 0) {
          t: {
            if (
              ((R = t === "mouseover" || t === "pointerover"),
              (C = t === "mouseout" || t === "pointerout"),
              R &&
                n !== Yo &&
                (it = n.relatedTarget || n.fromElement) &&
                (Aa(it) || it[xa]))
            )
              break t;
            if (
              (C || R) &&
              ((R =
                _.window === _
                  ? _
                  : (R = _.ownerDocument)
                  ? R.defaultView || R.parentWindow
                  : window),
              C
                ? ((it = n.relatedTarget || n.toElement),
                  (C = D),
                  (it = it ? Aa(it) : null),
                  it !== null &&
                    ((xt = d(it)),
                    (et = it.tag),
                    it !== xt || (et !== 5 && et !== 27 && et !== 6)) &&
                    (it = null))
                : ((C = null), (it = D)),
              C !== it)
            ) {
              if (
                ((et = gm),
                (U = "onMouseLeave"),
                (E = "onMouseEnter"),
                (A = "mouse"),
                (t === "pointerout" || t === "pointerover") &&
                  ((et = Sm),
                  (U = "onPointerLeave"),
                  (E = "onPointerEnter"),
                  (A = "pointer")),
                (xt = C == null ? R : Vi(C)),
                (M = it == null ? R : Vi(it)),
                (R = new et(U, A + "leave", C, n, _)),
                (R.target = xt),
                (R.relatedTarget = M),
                (U = null),
                Aa(_) === D &&
                  ((et = new et(E, A + "enter", it, n, _)),
                  (et.target = M),
                  (et.relatedTarget = xt),
                  (U = et)),
                (xt = U),
                C && it)
              )
                e: {
                  for (et = C, E = it, A = 0, M = et; M; M = ai(M)) A++;
                  for (M = 0, U = E; U; U = ai(U)) M++;
                  for (; 0 < A - M; ) (et = ai(et)), A--;
                  for (; 0 < M - A; ) (E = ai(E)), M--;
                  for (; A--; ) {
                    if (et === E || (E !== null && et === E.alternate)) break e;
                    (et = ai(et)), (E = ai(E));
                  }
                  et = null;
                }
              else et = null;
              C !== null && o0(j, R, C, et, !1),
                it !== null && xt !== null && o0(j, xt, it, et, !0);
            }
          }
          t: {
            if (
              ((R = D ? Vi(D) : window),
              (C = R.nodeName && R.nodeName.toLowerCase()),
              C === "select" || (C === "input" && R.type === "file"))
            )
              var P = Rm;
            else if (Mm(R))
              if (Cm) P = PT;
              else {
                P = kT;
                var ct = KT;
              }
            else
              (C = R.nodeName),
                !C ||
                C.toLowerCase() !== "input" ||
                (R.type !== "checkbox" && R.type !== "radio")
                  ? D && qo(D.elementType) && (P = Rm)
                  : (P = JT);
            if (P && (P = P(t, D))) {
              Dm(j, P, n, _);
              break t;
            }
            ct && ct(t, R, D),
              t === "focusout" &&
                D &&
                R.type === "number" &&
                D.memoizedProps.value != null &&
                Ho(R, "number", R.value);
          }
          switch (((ct = D ? Vi(D) : window), t)) {
            case "focusin":
              (Mm(ct) || ct.contentEditable === "true") &&
                ((Ua = ct), (tr = D), (qi = null));
              break;
            case "focusout":
              qi = tr = Ua = null;
              break;
            case "mousedown":
              er = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              (er = !1), Bm(j, n, _);
              break;
            case "selectionchange":
              if ($T) break;
            case "keydown":
            case "keyup":
              Bm(j, n, _);
          }
          var W;
          if (Fo)
            t: {
              switch (t) {
                case "compositionstart":
                  var nt = "onCompositionStart";
                  break t;
                case "compositionend":
                  nt = "onCompositionEnd";
                  break t;
                case "compositionupdate":
                  nt = "onCompositionUpdate";
                  break t;
              }
              nt = void 0;
            }
          else
            _a
              ? Am(t, n) && (nt = "onCompositionEnd")
              : t === "keydown" &&
                n.keyCode === 229 &&
                (nt = "onCompositionStart");
          nt &&
            (bm &&
              n.locale !== "ko" &&
              (_a || nt !== "onCompositionStart"
                ? nt === "onCompositionEnd" && _a && (W = pm())
                : ((bn = _),
                  (Qo = "value" in bn ? bn.value : bn.textContent),
                  (_a = !0))),
            (ct = Ys(D, nt)),
            0 < ct.length &&
              ((nt = new vm(nt, t, null, n, _)),
              j.push({ event: nt, listeners: ct }),
              W ? (nt.data = W) : ((W = Em(n)), W !== null && (nt.data = W)))),
            (W = YT ? GT(t, n) : XT(t, n)) &&
              ((nt = Ys(D, "onBeforeInput")),
              0 < nt.length &&
                ((ct = new vm("onBeforeInput", "beforeinput", null, n, _)),
                j.push({ event: ct, listeners: nt }),
                (ct.data = W))),
            Ux(j, t, D, n, _);
        }
        s0(j, e);
      });
    }
    function ml(t, e, n) {
      return { instance: t, listener: e, currentTarget: n };
    }
    function Ys(t, e) {
      for (var n = e + "Capture", i = []; t !== null; ) {
        var s = t,
          r = s.stateNode;
        if (
          ((s = s.tag),
          (s !== 5 && s !== 26 && s !== 27) ||
            r === null ||
            ((s = _i(t, n)),
            s != null && i.unshift(ml(t, s, r)),
            (s = _i(t, e)),
            s != null && i.push(ml(t, s, r))),
          t.tag === 3)
        )
          return i;
        t = t.return;
      }
      return [];
    }
    function ai(t) {
      if (t === null) return null;
      do t = t.return;
      while (t && t.tag !== 5 && t.tag !== 27);
      return t || null;
    }
    function o0(t, e, n, i, s) {
      for (var r = e._reactName, f = []; n !== null && n !== i; ) {
        var y = n,
          b = y.alternate,
          D = y.stateNode;
        if (((y = y.tag), b !== null && b === i)) break;
        (y !== 5 && y !== 26 && y !== 27) ||
          D === null ||
          ((b = D),
          s
            ? ((D = _i(n, r)), D != null && f.unshift(ml(n, D, b)))
            : s || ((D = _i(n, r)), D != null && f.push(ml(n, D, b)))),
          (n = n.return);
      }
      f.length !== 0 && t.push({ event: e, listeners: f });
    }
    var Nx = /\r\n?/g,
      Lx = /\u0000|\uFFFD/g;
    function r0(t) {
      return (typeof t == "string" ? t : "" + t)
        .replace(
          Nx,
          `
`
        )
        .replace(Lx, "");
    }
    function c0(t, e) {
      return (e = r0(e)), r0(t) === e;
    }
    function Gs() {}
    function Tt(t, e, n, i, s, r) {
      switch (n) {
        case "children":
          typeof i == "string"
            ? e === "body" || (e === "textarea" && i === "") || Oa(t, i)
            : (typeof i == "number" || typeof i == "bigint") &&
              e !== "body" &&
              Oa(t, "" + i);
          break;
        case "className":
          kl(t, "class", i);
          break;
        case "tabIndex":
          kl(t, "tabindex", i);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          kl(t, n, i);
          break;
        case "style":
          hm(t, i, r);
          break;
        case "data":
          if (e !== "object") {
            kl(t, "data", i);
            break;
          }
        case "src":
        case "href":
          if (i === "" && (e !== "a" || n !== "href")) {
            t.removeAttribute(n);
            break;
          }
          if (
            i == null ||
            typeof i == "function" ||
            typeof i == "symbol" ||
            typeof i == "boolean"
          ) {
            t.removeAttribute(n);
            break;
          }
          (i = Fl("" + i)), t.setAttribute(n, i);
          break;
        case "action":
        case "formAction":
          if (typeof i == "function") {
            t.setAttribute(
              n,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            typeof r == "function" &&
              (n === "formAction"
                ? (e !== "input" && Tt(t, e, "name", s.name, s, null),
                  Tt(t, e, "formEncType", s.formEncType, s, null),
                  Tt(t, e, "formMethod", s.formMethod, s, null),
                  Tt(t, e, "formTarget", s.formTarget, s, null))
                : (Tt(t, e, "encType", s.encType, s, null),
                  Tt(t, e, "method", s.method, s, null),
                  Tt(t, e, "target", s.target, s, null)));
          if (i == null || typeof i == "symbol" || typeof i == "boolean") {
            t.removeAttribute(n);
            break;
          }
          (i = Fl("" + i)), t.setAttribute(n, i);
          break;
        case "onClick":
          i != null && (t.onclick = Gs);
          break;
        case "onScroll":
          i != null && ht("scroll", t);
          break;
        case "onScrollEnd":
          i != null && ht("scrollend", t);
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i)) throw Error(o(61));
            if (((n = i.__html), n != null)) {
              if (s.children != null) throw Error(o(60));
              t.innerHTML = n;
            }
          }
          break;
        case "multiple":
          t.multiple = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "muted":
          t.muted = i && typeof i != "function" && typeof i != "symbol";
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
          if (
            i == null ||
            typeof i == "function" ||
            typeof i == "boolean" ||
            typeof i == "symbol"
          ) {
            t.removeAttribute("xlink:href");
            break;
          }
          (n = Fl("" + i)),
            t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          i != null && typeof i != "function" && typeof i != "symbol"
            ? t.setAttribute(n, "" + i)
            : t.removeAttribute(n);
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
          i && typeof i != "function" && typeof i != "symbol"
            ? t.setAttribute(n, "")
            : t.removeAttribute(n);
          break;
        case "capture":
        case "download":
          i === !0
            ? t.setAttribute(n, "")
            : i !== !1 &&
              i != null &&
              typeof i != "function" &&
              typeof i != "symbol"
            ? t.setAttribute(n, i)
            : t.removeAttribute(n);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          i != null &&
          typeof i != "function" &&
          typeof i != "symbol" &&
          !isNaN(i) &&
          1 <= i
            ? t.setAttribute(n, i)
            : t.removeAttribute(n);
          break;
        case "rowSpan":
        case "start":
          i == null ||
          typeof i == "function" ||
          typeof i == "symbol" ||
          isNaN(i)
            ? t.removeAttribute(n)
            : t.setAttribute(n, i);
          break;
        case "popover":
          ht("beforetoggle", t), ht("toggle", t), Kl(t, "popover", i);
          break;
        case "xlinkActuate":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:actuate", i);
          break;
        case "xlinkArcrole":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", i);
          break;
        case "xlinkRole":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:role", i);
          break;
        case "xlinkShow":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:show", i);
          break;
        case "xlinkTitle":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:title", i);
          break;
        case "xlinkType":
          $e(t, "http://www.w3.org/1999/xlink", "xlink:type", i);
          break;
        case "xmlBase":
          $e(t, "http://www.w3.org/XML/1998/namespace", "xml:base", i);
          break;
        case "xmlLang":
          $e(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", i);
          break;
        case "xmlSpace":
          $e(t, "http://www.w3.org/XML/1998/namespace", "xml:space", i);
          break;
        case "is":
          Kl(t, "is", i);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < n.length) ||
            (n[0] !== "o" && n[0] !== "O") ||
            (n[1] !== "n" && n[1] !== "N")) &&
            ((n = mT.get(n) || n), Kl(t, n, i));
      }
    }
    function Ec(t, e, n, i, s, r) {
      switch (n) {
        case "style":
          hm(t, i, r);
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i)) throw Error(o(61));
            if (((n = i.__html), n != null)) {
              if (s.children != null) throw Error(o(60));
              t.innerHTML = n;
            }
          }
          break;
        case "children":
          typeof i == "string"
            ? Oa(t, i)
            : (typeof i == "number" || typeof i == "bigint") && Oa(t, "" + i);
          break;
        case "onScroll":
          i != null && ht("scroll", t);
          break;
        case "onScrollEnd":
          i != null && ht("scrollend", t);
          break;
        case "onClick":
          i != null && (t.onclick = Gs);
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
          if (!em.hasOwnProperty(n))
            t: {
              if (
                n[0] === "o" &&
                n[1] === "n" &&
                ((s = n.endsWith("Capture")),
                (e = n.slice(2, s ? n.length - 7 : void 0)),
                (r = t[oe] || null),
                (r = r != null ? r[n] : null),
                typeof r == "function" && t.removeEventListener(e, r, s),
                typeof i == "function")
              ) {
                typeof r != "function" &&
                  r !== null &&
                  (n in t
                    ? (t[n] = null)
                    : t.hasAttribute(n) && t.removeAttribute(n)),
                  t.addEventListener(e, i, s);
                break t;
              }
              n in t
                ? (t[n] = i)
                : i === !0
                ? t.setAttribute(n, "")
                : Kl(t, n, i);
            }
      }
    }
    function $t(t, e, n) {
      switch (e) {
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
          ht("error", t), ht("load", t);
          var i = !1,
            s = !1,
            r;
          for (r in n)
            if (n.hasOwnProperty(r)) {
              var f = n[r];
              if (f != null)
                switch (r) {
                  case "src":
                    i = !0;
                    break;
                  case "srcSet":
                    s = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(o(137, e));
                  default:
                    Tt(t, e, r, f, n, null);
                }
            }
          s && Tt(t, e, "srcSet", n.srcSet, n, null),
            i && Tt(t, e, "src", n.src, n, null);
          return;
        case "input":
          ht("invalid", t);
          var y = (r = f = s = null),
            b = null,
            D = null;
          for (i in n)
            if (n.hasOwnProperty(i)) {
              var _ = n[i];
              if (_ != null)
                switch (i) {
                  case "name":
                    s = _;
                    break;
                  case "type":
                    f = _;
                    break;
                  case "checked":
                    b = _;
                    break;
                  case "defaultChecked":
                    D = _;
                    break;
                  case "value":
                    r = _;
                    break;
                  case "defaultValue":
                    y = _;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (_ != null) throw Error(o(137, e));
                    break;
                  default:
                    Tt(t, e, i, _, n, null);
                }
            }
          om(t, r, y, b, D, f, s, !1), Jl(t);
          return;
        case "select":
          ht("invalid", t), (i = f = r = null);
          for (s in n)
            if (n.hasOwnProperty(s) && ((y = n[s]), y != null))
              switch (s) {
                case "value":
                  r = y;
                  break;
                case "defaultValue":
                  f = y;
                  break;
                case "multiple":
                  i = y;
                default:
                  Tt(t, e, s, y, n, null);
              }
          (e = r),
            (n = f),
            (t.multiple = !!i),
            e != null ? Ca(t, !!i, e, !1) : n != null && Ca(t, !!i, n, !0);
          return;
        case "textarea":
          ht("invalid", t), (r = s = i = null);
          for (f in n)
            if (n.hasOwnProperty(f) && ((y = n[f]), y != null))
              switch (f) {
                case "value":
                  i = y;
                  break;
                case "defaultValue":
                  s = y;
                  break;
                case "children":
                  r = y;
                  break;
                case "dangerouslySetInnerHTML":
                  if (y != null) throw Error(o(91));
                  break;
                default:
                  Tt(t, e, f, y, n, null);
              }
          cm(t, i, s, r), Jl(t);
          return;
        case "option":
          for (b in n)
            if (n.hasOwnProperty(b) && ((i = n[b]), i != null))
              switch (b) {
                case "selected":
                  t.selected =
                    i && typeof i != "function" && typeof i != "symbol";
                  break;
                default:
                  Tt(t, e, b, i, n, null);
              }
          return;
        case "dialog":
          ht("beforetoggle", t),
            ht("toggle", t),
            ht("cancel", t),
            ht("close", t);
          break;
        case "iframe":
        case "object":
          ht("load", t);
          break;
        case "video":
        case "audio":
          for (i = 0; i < dl.length; i++) ht(dl[i], t);
          break;
        case "image":
          ht("error", t), ht("load", t);
          break;
        case "details":
          ht("toggle", t);
          break;
        case "embed":
        case "source":
        case "link":
          ht("error", t), ht("load", t);
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
          for (D in n)
            if (n.hasOwnProperty(D) && ((i = n[D]), i != null))
              switch (D) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, e));
                default:
                  Tt(t, e, D, i, n, null);
              }
          return;
        default:
          if (qo(e)) {
            for (_ in n)
              n.hasOwnProperty(_) &&
                ((i = n[_]), i !== void 0 && Ec(t, e, _, i, n, void 0));
            return;
          }
      }
      for (y in n)
        n.hasOwnProperty(y) &&
          ((i = n[y]), i != null && Tt(t, e, y, i, n, null));
    }
    function Hx(t, e, n, i) {
      switch (e) {
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
          var s = null,
            r = null,
            f = null,
            y = null,
            b = null,
            D = null,
            _ = null;
          for (C in n) {
            var j = n[C];
            if (n.hasOwnProperty(C) && j != null)
              switch (C) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  b = j;
                default:
                  i.hasOwnProperty(C) || Tt(t, e, C, null, i, j);
              }
          }
          for (var R in i) {
            var C = i[R];
            if (((j = n[R]), i.hasOwnProperty(R) && (C != null || j != null)))
              switch (R) {
                case "type":
                  r = C;
                  break;
                case "name":
                  s = C;
                  break;
                case "checked":
                  D = C;
                  break;
                case "defaultChecked":
                  _ = C;
                  break;
                case "value":
                  f = C;
                  break;
                case "defaultValue":
                  y = C;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (C != null) throw Error(o(137, e));
                  break;
                default:
                  C !== j && Tt(t, e, R, C, i, j);
              }
          }
          Lo(t, f, y, b, D, _, r, s);
          return;
        case "select":
          C = f = y = R = null;
          for (r in n)
            if (((b = n[r]), n.hasOwnProperty(r) && b != null))
              switch (r) {
                case "value":
                  break;
                case "multiple":
                  C = b;
                default:
                  i.hasOwnProperty(r) || Tt(t, e, r, null, i, b);
              }
          for (s in i)
            if (
              ((r = i[s]),
              (b = n[s]),
              i.hasOwnProperty(s) && (r != null || b != null))
            )
              switch (s) {
                case "value":
                  R = r;
                  break;
                case "defaultValue":
                  y = r;
                  break;
                case "multiple":
                  f = r;
                default:
                  r !== b && Tt(t, e, s, r, i, b);
              }
          (e = y),
            (n = f),
            (i = C),
            R != null
              ? Ca(t, !!n, R, !1)
              : !!i != !!n &&
                (e != null ? Ca(t, !!n, e, !0) : Ca(t, !!n, n ? [] : "", !1));
          return;
        case "textarea":
          C = R = null;
          for (y in n)
            if (
              ((s = n[y]),
              n.hasOwnProperty(y) && s != null && !i.hasOwnProperty(y))
            )
              switch (y) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  Tt(t, e, y, null, i, s);
              }
          for (f in i)
            if (
              ((s = i[f]),
              (r = n[f]),
              i.hasOwnProperty(f) && (s != null || r != null))
            )
              switch (f) {
                case "value":
                  R = s;
                  break;
                case "defaultValue":
                  C = s;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (s != null) throw Error(o(91));
                  break;
                default:
                  s !== r && Tt(t, e, f, s, i, r);
              }
          rm(t, R, C);
          return;
        case "option":
          for (var it in n)
            if (
              ((R = n[it]),
              n.hasOwnProperty(it) && R != null && !i.hasOwnProperty(it))
            )
              switch (it) {
                case "selected":
                  t.selected = !1;
                  break;
                default:
                  Tt(t, e, it, null, i, R);
              }
          for (b in i)
            if (
              ((R = i[b]),
              (C = n[b]),
              i.hasOwnProperty(b) && R !== C && (R != null || C != null))
            )
              switch (b) {
                case "selected":
                  t.selected =
                    R && typeof R != "function" && typeof R != "symbol";
                  break;
                default:
                  Tt(t, e, b, R, i, C);
              }
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
          for (var et in n)
            (R = n[et]),
              n.hasOwnProperty(et) &&
                R != null &&
                !i.hasOwnProperty(et) &&
                Tt(t, e, et, null, i, R);
          for (D in i)
            if (
              ((R = i[D]),
              (C = n[D]),
              i.hasOwnProperty(D) && R !== C && (R != null || C != null))
            )
              switch (D) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (R != null) throw Error(o(137, e));
                  break;
                default:
                  Tt(t, e, D, R, i, C);
              }
          return;
        default:
          if (qo(e)) {
            for (var xt in n)
              (R = n[xt]),
                n.hasOwnProperty(xt) &&
                  R !== void 0 &&
                  !i.hasOwnProperty(xt) &&
                  Ec(t, e, xt, void 0, i, R);
            for (_ in i)
              (R = i[_]),
                (C = n[_]),
                !i.hasOwnProperty(_) ||
                  R === C ||
                  (R === void 0 && C === void 0) ||
                  Ec(t, e, _, R, i, C);
            return;
          }
      }
      for (var E in n)
        (R = n[E]),
          n.hasOwnProperty(E) &&
            R != null &&
            !i.hasOwnProperty(E) &&
            Tt(t, e, E, null, i, R);
      for (j in i)
        (R = i[j]),
          (C = n[j]),
          !i.hasOwnProperty(j) ||
            R === C ||
            (R == null && C == null) ||
            Tt(t, e, j, R, i, C);
    }
    var Mc = null,
      Dc = null;
    function Xs(t) {
      return t.nodeType === 9 ? t : t.ownerDocument;
    }
    function f0(t) {
      switch (t) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function h0(t, e) {
      if (t === 0)
        switch (e) {
          case "svg":
            return 1;
          case "math":
            return 2;
          default:
            return 0;
        }
      return t === 1 && e === "foreignObject" ? 0 : t;
    }
    function Rc(t, e) {
      return (
        t === "textarea" ||
        t === "noscript" ||
        typeof e.children == "string" ||
        typeof e.children == "number" ||
        typeof e.children == "bigint" ||
        (typeof e.dangerouslySetInnerHTML == "object" &&
          e.dangerouslySetInnerHTML !== null &&
          e.dangerouslySetInnerHTML.__html != null)
      );
    }
    var Cc = null;
    function qx() {
      var t = window.event;
      return t && t.type === "popstate"
        ? t === Cc
          ? !1
          : ((Cc = t), !0)
        : ((Cc = null), !1);
    }
    var d0 = typeof setTimeout == "function" ? setTimeout : void 0,
      Yx = typeof clearTimeout == "function" ? clearTimeout : void 0,
      m0 = typeof Promise == "function" ? Promise : void 0,
      Gx =
        typeof queueMicrotask == "function"
          ? queueMicrotask
          : typeof m0 < "u"
          ? function (t) {
              return m0.resolve(null).then(t).catch(Xx);
            }
          : d0;
    function Xx(t) {
      setTimeout(function () {
        throw t;
      });
    }
    function Bn(t) {
      return t === "head";
    }
    function p0(t, e) {
      var n = e,
        i = 0,
        s = 0;
      do {
        var r = n.nextSibling;
        if ((t.removeChild(n), r && r.nodeType === 8))
          if (((n = r.data), n === "/$")) {
            if (0 < i && 8 > i) {
              n = i;
              var f = t.ownerDocument;
              if ((n & 1 && pl(f.documentElement), n & 2 && pl(f.body), n & 4))
                for (n = f.head, pl(n), f = n.firstChild; f; ) {
                  var y = f.nextSibling,
                    b = f.nodeName;
                  f[zi] ||
                    b === "SCRIPT" ||
                    b === "STYLE" ||
                    (b === "LINK" && f.rel.toLowerCase() === "stylesheet") ||
                    n.removeChild(f),
                    (f = y);
                }
            }
            if (s === 0) {
              t.removeChild(r), Al(e);
              return;
            }
            s--;
          } else
            n === "$" || n === "$?" || n === "$!"
              ? s++
              : (i = n.charCodeAt(0) - 48);
        else i = 0;
        n = r;
      } while (n);
      Al(e);
    }
    function Oc(t) {
      var e = t.firstChild;
      for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
        var n = e;
        switch (((e = e.nextSibling), n.nodeName)) {
          case "HTML":
          case "HEAD":
          case "BODY":
            Oc(n), wo(n);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (n.rel.toLowerCase() === "stylesheet") continue;
        }
        t.removeChild(n);
      }
    }
    function Zx(t, e, n, i) {
      for (; t.nodeType === 1; ) {
        var s = n;
        if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
          if (!i && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
        } else if (i) {
          if (!t[zi])
            switch (e) {
              case "meta":
                if (!t.hasAttribute("itemprop")) break;
                return t;
              case "link":
                if (
                  ((r = t.getAttribute("rel")),
                  r === "stylesheet" && t.hasAttribute("data-precedence"))
                )
                  break;
                if (
                  r !== s.rel ||
                  t.getAttribute("href") !==
                    (s.href == null || s.href === "" ? null : s.href) ||
                  t.getAttribute("crossorigin") !==
                    (s.crossOrigin == null ? null : s.crossOrigin) ||
                  t.getAttribute("title") !== (s.title == null ? null : s.title)
                )
                  break;
                return t;
              case "style":
                if (t.hasAttribute("data-precedence")) break;
                return t;
              case "script":
                if (
                  ((r = t.getAttribute("src")),
                  (r !== (s.src == null ? null : s.src) ||
                    t.getAttribute("type") !==
                      (s.type == null ? null : s.type) ||
                    t.getAttribute("crossorigin") !==
                      (s.crossOrigin == null ? null : s.crossOrigin)) &&
                    r &&
                    t.hasAttribute("async") &&
                    !t.hasAttribute("itemprop"))
                )
                  break;
                return t;
              default:
                return t;
            }
        } else if (e === "input" && t.type === "hidden") {
          var r = s.name == null ? null : "" + s.name;
          if (s.type === "hidden" && t.getAttribute("name") === r) return t;
        } else return t;
        if (((t = He(t.nextSibling)), t === null)) break;
      }
      return null;
    }
    function Qx(t, e, n) {
      if (e === "") return null;
      for (; t.nodeType !== 3; )
        if (
          ((t.nodeType !== 1 ||
            t.nodeName !== "INPUT" ||
            t.type !== "hidden") &&
            !n) ||
          ((t = He(t.nextSibling)), t === null)
        )
          return null;
      return t;
    }
    function zc(t) {
      return (
        t.data === "$!" ||
        (t.data === "$?" && t.ownerDocument.readyState === "complete")
      );
    }
    function Kx(t, e) {
      var n = t.ownerDocument;
      if (t.data !== "$?" || n.readyState === "complete") e();
      else {
        var i = function () {
          e(), n.removeEventListener("DOMContentLoaded", i);
        };
        n.addEventListener("DOMContentLoaded", i), (t._reactRetry = i);
      }
    }
    function He(t) {
      for (; t != null; t = t.nextSibling) {
        var e = t.nodeType;
        if (e === 1 || e === 3) break;
        if (e === 8) {
          if (
            ((e = t.data),
            e === "$" || e === "$!" || e === "$?" || e === "F!" || e === "F")
          )
            break;
          if (e === "/$") return null;
        }
      }
      return t;
    }
    var Vc = null;
    function y0(t) {
      t = t.previousSibling;
      for (var e = 0; t; ) {
        if (t.nodeType === 8) {
          var n = t.data;
          if (n === "$" || n === "$!" || n === "$?") {
            if (e === 0) return t;
            e--;
          } else n === "/$" && e++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function g0(t, e, n) {
      switch (((e = Xs(n)), t)) {
        case "html":
          if (((t = e.documentElement), !t)) throw Error(o(452));
          return t;
        case "head":
          if (((t = e.head), !t)) throw Error(o(453));
          return t;
        case "body":
          if (((t = e.body), !t)) throw Error(o(454));
          return t;
        default:
          throw Error(o(451));
      }
    }
    function pl(t) {
      for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
      wo(t);
    }
    var je = new Map(),
      v0 = new Set();
    function Zs(t) {
      return typeof t.getRootNode == "function"
        ? t.getRootNode()
        : t.nodeType === 9
        ? t
        : t.ownerDocument;
    }
    var hn = N.d;
    N.d = { f: kx, r: Jx, D: Px, C: Fx, L: $x, m: Wx, X: t2, S: Ix, M: e2 };
    function kx() {
      var t = hn.f(),
        e = js();
      return t || e;
    }
    function Jx(t) {
      var e = Ea(t);
      e !== null && e.tag === 5 && e.type === "form" ? Lp(e) : hn.r(t);
    }
    var ii = typeof document > "u" ? null : document;
    function S0(t, e, n) {
      var i = ii;
      if (i && typeof e == "string" && e) {
        var s = Ce(e);
        (s = 'link[rel="' + t + '"][href="' + s + '"]'),
          typeof n == "string" && (s += '[crossorigin="' + n + '"]'),
          v0.has(s) ||
            (v0.add(s),
            (t = { rel: t, crossOrigin: n, href: e }),
            i.querySelector(s) === null &&
              ((e = i.createElement("link")),
              $t(e, "link", t),
              Zt(e),
              i.head.appendChild(e)));
      }
    }
    function Px(t) {
      hn.D(t), S0("dns-prefetch", t, null);
    }
    function Fx(t, e) {
      hn.C(t, e), S0("preconnect", t, e);
    }
    function $x(t, e, n) {
      hn.L(t, e, n);
      var i = ii;
      if (i && t && e) {
        var s = 'link[rel="preload"][as="' + Ce(e) + '"]';
        e === "image" && n && n.imageSrcSet
          ? ((s += '[imagesrcset="' + Ce(n.imageSrcSet) + '"]'),
            typeof n.imageSizes == "string" &&
              (s += '[imagesizes="' + Ce(n.imageSizes) + '"]'))
          : (s += '[href="' + Ce(t) + '"]');
        var r = s;
        switch (e) {
          case "style":
            r = li(t);
            break;
          case "script":
            r = si(t);
        }
        je.has(r) ||
          ((t = v(
            {
              rel: "preload",
              href: e === "image" && n && n.imageSrcSet ? void 0 : t,
              as: e,
            },
            n
          )),
          je.set(r, t),
          i.querySelector(s) !== null ||
            (e === "style" && i.querySelector(yl(r))) ||
            (e === "script" && i.querySelector(gl(r))) ||
            ((e = i.createElement("link")),
            $t(e, "link", t),
            Zt(e),
            i.head.appendChild(e)));
      }
    }
    function Wx(t, e) {
      hn.m(t, e);
      var n = ii;
      if (n && t) {
        var i = e && typeof e.as == "string" ? e.as : "script",
          s =
            'link[rel="modulepreload"][as="' +
            Ce(i) +
            '"][href="' +
            Ce(t) +
            '"]',
          r = s;
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            r = si(t);
        }
        if (
          !je.has(r) &&
          ((t = v({ rel: "modulepreload", href: t }, e)),
          je.set(r, t),
          n.querySelector(s) === null)
        ) {
          switch (i) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (n.querySelector(gl(r))) return;
          }
          (i = n.createElement("link")),
            $t(i, "link", t),
            Zt(i),
            n.head.appendChild(i);
        }
      }
    }
    function Ix(t, e, n) {
      hn.S(t, e, n);
      var i = ii;
      if (i && t) {
        var s = Ma(i).hoistableStyles,
          r = li(t);
        e = e || "default";
        var f = s.get(r);
        if (!f) {
          var y = { loading: 0, preload: null };
          if ((f = i.querySelector(yl(r)))) y.loading = 5;
          else {
            (t = v({ rel: "stylesheet", href: t, "data-precedence": e }, n)),
              (n = je.get(r)) && _c(t, n);
            var b = (f = i.createElement("link"));
            Zt(b),
              $t(b, "link", t),
              (b._p = new Promise(function (D, _) {
                (b.onload = D), (b.onerror = _);
              })),
              b.addEventListener("load", function () {
                y.loading |= 1;
              }),
              b.addEventListener("error", function () {
                y.loading |= 2;
              }),
              (y.loading |= 4),
              Qs(f, e, i);
          }
          (f = { type: "stylesheet", instance: f, count: 1, state: y }),
            s.set(r, f);
        }
      }
    }
    function t2(t, e) {
      hn.X(t, e);
      var n = ii;
      if (n && t) {
        var i = Ma(n).hoistableScripts,
          s = si(t),
          r = i.get(s);
        r ||
          ((r = n.querySelector(gl(s))),
          r ||
            ((t = v({ src: t, async: !0 }, e)),
            (e = je.get(s)) && Uc(t, e),
            (r = n.createElement("script")),
            Zt(r),
            $t(r, "link", t),
            n.head.appendChild(r)),
          (r = { type: "script", instance: r, count: 1, state: null }),
          i.set(s, r));
      }
    }
    function e2(t, e) {
      hn.M(t, e);
      var n = ii;
      if (n && t) {
        var i = Ma(n).hoistableScripts,
          s = si(t),
          r = i.get(s);
        r ||
          ((r = n.querySelector(gl(s))),
          r ||
            ((t = v({ src: t, async: !0, type: "module" }, e)),
            (e = je.get(s)) && Uc(t, e),
            (r = n.createElement("script")),
            Zt(r),
            $t(r, "link", t),
            n.head.appendChild(r)),
          (r = { type: "script", instance: r, count: 1, state: null }),
          i.set(s, r));
      }
    }
    function b0(t, e, n, i) {
      var s = (s = lt.current) ? Zs(s) : null;
      if (!s) throw Error(o(446));
      switch (t) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof n.precedence == "string" && typeof n.href == "string"
            ? ((e = li(n.href)),
              (n = Ma(s).hoistableStyles),
              (i = n.get(e)),
              i ||
                ((i = { type: "style", instance: null, count: 0, state: null }),
                n.set(e, i)),
              i)
            : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (
            n.rel === "stylesheet" &&
            typeof n.href == "string" &&
            typeof n.precedence == "string"
          ) {
            t = li(n.href);
            var r = Ma(s).hoistableStyles,
              f = r.get(t);
            if (
              (f ||
                ((s = s.ownerDocument || s),
                (f = {
                  type: "stylesheet",
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                r.set(t, f),
                (r = s.querySelector(yl(t))) &&
                  !r._p &&
                  ((f.instance = r), (f.state.loading = 5)),
                je.has(t) ||
                  ((n = {
                    rel: "preload",
                    as: "style",
                    href: n.href,
                    crossOrigin: n.crossOrigin,
                    integrity: n.integrity,
                    media: n.media,
                    hrefLang: n.hrefLang,
                    referrerPolicy: n.referrerPolicy,
                  }),
                  je.set(t, n),
                  r || n2(s, t, n, f.state))),
              e && i === null)
            )
              throw Error(o(528, ""));
            return f;
          }
          if (e && i !== null) throw Error(o(529, ""));
          return null;
        case "script":
          return (
            (e = n.async),
            (n = n.src),
            typeof n == "string" &&
            e &&
            typeof e != "function" &&
            typeof e != "symbol"
              ? ((e = si(n)),
                (n = Ma(s).hoistableScripts),
                (i = n.get(e)),
                i ||
                  ((i = {
                    type: "script",
                    instance: null,
                    count: 0,
                    state: null,
                  }),
                  n.set(e, i)),
                i)
              : { type: "void", instance: null, count: 0, state: null }
          );
        default:
          throw Error(o(444, t));
      }
    }
    function li(t) {
      return 'href="' + Ce(t) + '"';
    }
    function yl(t) {
      return 'link[rel="stylesheet"][' + t + "]";
    }
    function T0(t) {
      return v({}, t, { "data-precedence": t.precedence, precedence: null });
    }
    function n2(t, e, n, i) {
      t.querySelector('link[rel="preload"][as="style"][' + e + "]")
        ? (i.loading = 1)
        : ((e = t.createElement("link")),
          (i.preload = e),
          e.addEventListener("load", function () {
            return (i.loading |= 1);
          }),
          e.addEventListener("error", function () {
            return (i.loading |= 2);
          }),
          $t(e, "link", n),
          Zt(e),
          t.head.appendChild(e));
    }
    function si(t) {
      return '[src="' + Ce(t) + '"]';
    }
    function gl(t) {
      return "script[async]" + t;
    }
    function x0(t, e, n) {
      if ((e.count++, e.instance === null))
        switch (e.type) {
          case "style":
            var i = t.querySelector('style[data-href~="' + Ce(n.href) + '"]');
            if (i) return (e.instance = i), Zt(i), i;
            var s = v({}, n, {
              "data-href": n.href,
              "data-precedence": n.precedence,
              href: null,
              precedence: null,
            });
            return (
              (i = (t.ownerDocument || t).createElement("style")),
              Zt(i),
              $t(i, "style", s),
              Qs(i, n.precedence, t),
              (e.instance = i)
            );
          case "stylesheet":
            s = li(n.href);
            var r = t.querySelector(yl(s));
            if (r) return (e.state.loading |= 4), (e.instance = r), Zt(r), r;
            (i = T0(n)),
              (s = je.get(s)) && _c(i, s),
              (r = (t.ownerDocument || t).createElement("link")),
              Zt(r);
            var f = r;
            return (
              (f._p = new Promise(function (y, b) {
                (f.onload = y), (f.onerror = b);
              })),
              $t(r, "link", i),
              (e.state.loading |= 4),
              Qs(r, n.precedence, t),
              (e.instance = r)
            );
          case "script":
            return (
              (r = si(n.src)),
              (s = t.querySelector(gl(r)))
                ? ((e.instance = s), Zt(s), s)
                : ((i = n),
                  (s = je.get(r)) && ((i = v({}, n)), Uc(i, s)),
                  (t = t.ownerDocument || t),
                  (s = t.createElement("script")),
                  Zt(s),
                  $t(s, "link", i),
                  t.head.appendChild(s),
                  (e.instance = s))
            );
          case "void":
            return null;
          default:
            throw Error(o(443, e.type));
        }
      else
        e.type === "stylesheet" &&
          (e.state.loading & 4) === 0 &&
          ((i = e.instance), (e.state.loading |= 4), Qs(i, n.precedence, t));
      return e.instance;
    }
    function Qs(t, e, n) {
      for (
        var i = n.querySelectorAll(
            'link[rel="stylesheet"][data-precedence],style[data-precedence]'
          ),
          s = i.length ? i[i.length - 1] : null,
          r = s,
          f = 0;
        f < i.length;
        f++
      ) {
        var y = i[f];
        if (y.dataset.precedence === e) r = y;
        else if (r !== s) break;
      }
      r
        ? r.parentNode.insertBefore(t, r.nextSibling)
        : ((e = n.nodeType === 9 ? n.head : n),
          e.insertBefore(t, e.firstChild));
    }
    function _c(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
        t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
        t.title == null && (t.title = e.title);
    }
    function Uc(t, e) {
      t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
        t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
        t.integrity == null && (t.integrity = e.integrity);
    }
    var Ks = null;
    function A0(t, e, n) {
      if (Ks === null) {
        var i = new Map(),
          s = (Ks = new Map());
        s.set(n, i);
      } else (s = Ks), (i = s.get(n)), i || ((i = new Map()), s.set(n, i));
      if (i.has(t)) return i;
      for (
        i.set(t, null), n = n.getElementsByTagName(t), s = 0;
        s < n.length;
        s++
      ) {
        var r = n[s];
        if (
          !(
            r[zi] ||
            r[ee] ||
            (t === "link" && r.getAttribute("rel") === "stylesheet")
          ) &&
          r.namespaceURI !== "http://www.w3.org/2000/svg"
        ) {
          var f = r.getAttribute(e) || "";
          f = t + f;
          var y = i.get(f);
          y ? y.push(r) : i.set(f, [r]);
        }
      }
      return i;
    }
    function E0(t, e, n) {
      (t = t.ownerDocument || t),
        t.head.insertBefore(
          n,
          e === "title" ? t.querySelector("head > title") : null
        );
    }
    function a2(t, e, n) {
      if (n === 1 || e.itemProp != null) return !1;
      switch (t) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (
            typeof e.precedence != "string" ||
            typeof e.href != "string" ||
            e.href === ""
          )
            break;
          return !0;
        case "link":
          if (
            typeof e.rel != "string" ||
            typeof e.href != "string" ||
            e.href === "" ||
            e.onLoad ||
            e.onError
          )
            break;
          switch (e.rel) {
            case "stylesheet":
              return (
                (t = e.disabled), typeof e.precedence == "string" && t == null
              );
            default:
              return !0;
          }
        case "script":
          if (
            e.async &&
            typeof e.async != "function" &&
            typeof e.async != "symbol" &&
            !e.onLoad &&
            !e.onError &&
            e.src &&
            typeof e.src == "string"
          )
            return !0;
      }
      return !1;
    }
    function M0(t) {
      return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
    }
    var vl = null;
    function i2() {}
    function l2(t, e, n) {
      if (vl === null) throw Error(o(475));
      var i = vl;
      if (
        e.type === "stylesheet" &&
        (typeof n.media != "string" || matchMedia(n.media).matches !== !1) &&
        (e.state.loading & 4) === 0
      ) {
        if (e.instance === null) {
          var s = li(n.href),
            r = t.querySelector(yl(s));
          if (r) {
            (t = r._p),
              t !== null &&
                typeof t == "object" &&
                typeof t.then == "function" &&
                (i.count++, (i = ks.bind(i)), t.then(i, i)),
              (e.state.loading |= 4),
              (e.instance = r),
              Zt(r);
            return;
          }
          (r = t.ownerDocument || t),
            (n = T0(n)),
            (s = je.get(s)) && _c(n, s),
            (r = r.createElement("link")),
            Zt(r);
          var f = r;
          (f._p = new Promise(function (y, b) {
            (f.onload = y), (f.onerror = b);
          })),
            $t(r, "link", n),
            (e.instance = r);
        }
        i.stylesheets === null && (i.stylesheets = new Map()),
          i.stylesheets.set(e, t),
          (t = e.state.preload) &&
            (e.state.loading & 3) === 0 &&
            (i.count++,
            (e = ks.bind(i)),
            t.addEventListener("load", e),
            t.addEventListener("error", e));
      }
    }
    function s2() {
      if (vl === null) throw Error(o(475));
      var t = vl;
      return (
        t.stylesheets && t.count === 0 && wc(t, t.stylesheets),
        0 < t.count
          ? function (e) {
              var n = setTimeout(function () {
                if ((t.stylesheets && wc(t, t.stylesheets), t.unsuspend)) {
                  var i = t.unsuspend;
                  (t.unsuspend = null), i();
                }
              }, 6e4);
              return (
                (t.unsuspend = e),
                function () {
                  (t.unsuspend = null), clearTimeout(n);
                }
              );
            }
          : null
      );
    }
    function ks() {
      if ((this.count--, this.count === 0)) {
        if (this.stylesheets) wc(this, this.stylesheets);
        else if (this.unsuspend) {
          var t = this.unsuspend;
          (this.unsuspend = null), t();
        }
      }
    }
    var Js = null;
    function wc(t, e) {
      (t.stylesheets = null),
        t.unsuspend !== null &&
          (t.count++,
          (Js = new Map()),
          e.forEach(u2, t),
          (Js = null),
          ks.call(t));
    }
    function u2(t, e) {
      if (!(e.state.loading & 4)) {
        var n = Js.get(t);
        if (n) var i = n.get(null);
        else {
          (n = new Map()), Js.set(t, n);
          for (
            var s = t.querySelectorAll(
                "link[data-precedence],style[data-precedence]"
              ),
              r = 0;
            r < s.length;
            r++
          ) {
            var f = s[r];
            (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") &&
              (n.set(f.dataset.precedence, f), (i = f));
          }
          i && n.set(null, i);
        }
        (s = e.instance),
          (f = s.getAttribute("data-precedence")),
          (r = n.get(f) || i),
          r === i && n.set(null, s),
          n.set(f, s),
          this.count++,
          (i = ks.bind(this)),
          s.addEventListener("load", i),
          s.addEventListener("error", i),
          r
            ? r.parentNode.insertBefore(s, r.nextSibling)
            : ((t = t.nodeType === 9 ? t.head : t),
              t.insertBefore(s, t.firstChild)),
          (e.state.loading |= 4);
      }
    }
    var Sl = {
      $$typeof: Y,
      Provider: null,
      Consumer: null,
      _currentValue: J,
      _currentValue2: J,
      _threadCount: 0,
    };
    function o2(t, e, n, i, s, r, f, y) {
      (this.tag = 1),
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
        (this.expirationTimes = zo(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = zo(0)),
        (this.hiddenUpdates = zo(null)),
        (this.identifierPrefix = i),
        (this.onUncaughtError = s),
        (this.onCaughtError = r),
        (this.onRecoverableError = f),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = y),
        (this.incompleteTransitions = new Map());
    }
    function D0(t, e, n, i, s, r, f, y, b, D, _, j) {
      return (
        (t = new o2(t, e, n, f, y, b, D, j)),
        (e = 1),
        r === !0 && (e |= 24),
        (r = ge(3, null, null, e)),
        (t.current = r),
        (r.stateNode = t),
        (e = pr()),
        e.refCount++,
        (t.pooledCache = e),
        e.refCount++,
        (r.memoizedState = { element: i, isDehydrated: n, cache: e }),
        Sr(r),
        t
      );
    }
    function R0(t) {
      return t ? ((t = Na), t) : Na;
    }
    function C0(t, e, n, i, s, r) {
      (s = R0(s)),
        i.context === null ? (i.context = s) : (i.pendingContext = s),
        (i = An(e)),
        (i.payload = { element: n }),
        (r = r === void 0 ? null : r),
        r !== null && (i.callback = r),
        (n = En(t, i, e)),
        n !== null && (xe(n, t, e), Pi(n, t, e));
    }
    function O0(t, e) {
      if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
        var n = t.retryLane;
        t.retryLane = n !== 0 && n < e ? n : e;
      }
    }
    function jc(t, e) {
      O0(t, e), (t = t.alternate) && O0(t, e);
    }
    function z0(t) {
      if (t.tag === 13) {
        var e = Ba(t, 67108864);
        e !== null && xe(e, t, 67108864), jc(t, 67108864);
      }
    }
    var Ps = !0;
    function r2(t, e, n, i) {
      var s = z.T;
      z.T = null;
      var r = N.p;
      try {
        (N.p = 2), Bc(t, e, n, i);
      } finally {
        (N.p = r), (z.T = s);
      }
    }
    function c2(t, e, n, i) {
      var s = z.T;
      z.T = null;
      var r = N.p;
      try {
        (N.p = 8), Bc(t, e, n, i);
      } finally {
        (N.p = r), (z.T = s);
      }
    }
    function Bc(t, e, n, i) {
      if (Ps) {
        var s = Nc(i);
        if (s === null) Ac(t, e, i, Fs, n), _0(t, i);
        else if (h2(s, t, e, n, i)) i.stopPropagation();
        else if ((_0(t, i), e & 4 && -1 < f2.indexOf(t))) {
          for (; s !== null; ) {
            var r = Ea(s);
            if (r !== null)
              switch (r.tag) {
                case 3:
                  if (
                    ((r = r.stateNode), r.current.memoizedState.isDehydrated)
                  ) {
                    var f = Jn(r.pendingLanes);
                    if (f !== 0) {
                      var y = r;
                      for (y.pendingLanes |= 2, y.entangledLanes |= 2; f; ) {
                        var b = 1 << (31 - pe(f));
                        (y.entanglements[1] |= b), (f &= ~b);
                      }
                      Je(r), (gt & 6) === 0 && ((Us = Xe() + 500), hl(0));
                    }
                  }
                  break;
                case 13:
                  (y = Ba(r, 2)), y !== null && xe(y, r, 2), js(), jc(r, 2);
              }
            if (((r = Nc(i)), r === null && Ac(t, e, i, Fs, n), r === s)) break;
            s = r;
          }
          s !== null && i.stopPropagation();
        } else Ac(t, e, i, null, n);
      }
    }
    function Nc(t) {
      return (t = Go(t)), Lc(t);
    }
    var Fs = null;
    function Lc(t) {
      if (((Fs = null), (t = Aa(t)), t !== null)) {
        var e = d(t);
        if (e === null) t = null;
        else {
          var n = e.tag;
          if (n === 13) {
            if (((t = h(e)), t !== null)) return t;
            t = null;
          } else if (n === 3) {
            if (e.stateNode.current.memoizedState.isDehydrated)
              return e.tag === 3 ? e.stateNode.containerInfo : null;
            t = null;
          } else e !== t && (t = null);
        }
      }
      return (Fs = t), null;
    }
    function V0(t) {
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
          switch (Fb()) {
            case Qd:
              return 2;
            case Kd:
              return 8;
            case Gl:
            case $b:
              return 32;
            case kd:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var Hc = !1,
      Nn = null,
      Ln = null,
      Hn = null,
      bl = new Map(),
      Tl = new Map(),
      qn = [],
      f2 =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
          " "
        );
    function _0(t, e) {
      switch (t) {
        case "focusin":
        case "focusout":
          Nn = null;
          break;
        case "dragenter":
        case "dragleave":
          Ln = null;
          break;
        case "mouseover":
        case "mouseout":
          Hn = null;
          break;
        case "pointerover":
        case "pointerout":
          bl.delete(e.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Tl.delete(e.pointerId);
      }
    }
    function xl(t, e, n, i, s, r) {
      return t === null || t.nativeEvent !== r
        ? ((t = {
            blockedOn: e,
            domEventName: n,
            eventSystemFlags: i,
            nativeEvent: r,
            targetContainers: [s],
          }),
          e !== null && ((e = Ea(e)), e !== null && z0(e)),
          t)
        : ((t.eventSystemFlags |= i),
          (e = t.targetContainers),
          s !== null && e.indexOf(s) === -1 && e.push(s),
          t);
    }
    function h2(t, e, n, i, s) {
      switch (e) {
        case "focusin":
          return (Nn = xl(Nn, t, e, n, i, s)), !0;
        case "dragenter":
          return (Ln = xl(Ln, t, e, n, i, s)), !0;
        case "mouseover":
          return (Hn = xl(Hn, t, e, n, i, s)), !0;
        case "pointerover":
          var r = s.pointerId;
          return bl.set(r, xl(bl.get(r) || null, t, e, n, i, s)), !0;
        case "gotpointercapture":
          return (
            (r = s.pointerId),
            Tl.set(r, xl(Tl.get(r) || null, t, e, n, i, s)),
            !0
          );
      }
      return !1;
    }
    function U0(t) {
      var e = Aa(t.target);
      if (e !== null) {
        var n = d(e);
        if (n !== null) {
          if (((e = n.tag), e === 13)) {
            if (((e = h(n)), e !== null)) {
              (t.blockedOn = e),
                lT(t.priority, function () {
                  if (n.tag === 13) {
                    var i = Te();
                    i = Vo(i);
                    var s = Ba(n, i);
                    s !== null && xe(s, n, i), jc(n, i);
                  }
                });
              return;
            }
          } else if (
            e === 3 &&
            n.stateNode.current.memoizedState.isDehydrated
          ) {
            t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      t.blockedOn = null;
    }
    function $s(t) {
      if (t.blockedOn !== null) return !1;
      for (var e = t.targetContainers; 0 < e.length; ) {
        var n = Nc(t.nativeEvent);
        if (n === null) {
          n = t.nativeEvent;
          var i = new n.constructor(n.type, n);
          (Yo = i), n.target.dispatchEvent(i), (Yo = null);
        } else return (e = Ea(n)), e !== null && z0(e), (t.blockedOn = n), !1;
        e.shift();
      }
      return !0;
    }
    function w0(t, e, n) {
      $s(t) && n.delete(e);
    }
    function d2() {
      (Hc = !1),
        Nn !== null && $s(Nn) && (Nn = null),
        Ln !== null && $s(Ln) && (Ln = null),
        Hn !== null && $s(Hn) && (Hn = null),
        bl.forEach(w0),
        Tl.forEach(w0);
    }
    function Ws(t, e) {
      t.blockedOn === e &&
        ((t.blockedOn = null),
        Hc ||
          ((Hc = !0),
          a.unstable_scheduleCallback(a.unstable_NormalPriority, d2)));
    }
    var Is = null;
    function j0(t) {
      Is !== t &&
        ((Is = t),
        a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
          Is === t && (Is = null);
          for (var e = 0; e < t.length; e += 3) {
            var n = t[e],
              i = t[e + 1],
              s = t[e + 2];
            if (typeof i != "function") {
              if (Lc(i || n) === null) continue;
              break;
            }
            var r = Ea(n);
            r !== null &&
              (t.splice(e, 3),
              (e -= 3),
              Lr(
                r,
                { pending: !0, data: s, method: n.method, action: i },
                i,
                s
              ));
          }
        }));
    }
    function Al(t) {
      function e(b) {
        return Ws(b, t);
      }
      Nn !== null && Ws(Nn, t),
        Ln !== null && Ws(Ln, t),
        Hn !== null && Ws(Hn, t),
        bl.forEach(e),
        Tl.forEach(e);
      for (var n = 0; n < qn.length; n++) {
        var i = qn[n];
        i.blockedOn === t && (i.blockedOn = null);
      }
      for (; 0 < qn.length && ((n = qn[0]), n.blockedOn === null); )
        U0(n), n.blockedOn === null && qn.shift();
      if (((n = (t.ownerDocument || t).$$reactFormReplay), n != null))
        for (i = 0; i < n.length; i += 3) {
          var s = n[i],
            r = n[i + 1],
            f = s[oe] || null;
          if (typeof r == "function") f || j0(n);
          else if (f) {
            var y = null;
            if (r && r.hasAttribute("formAction")) {
              if (((s = r), (f = r[oe] || null))) y = f.formAction;
              else if (Lc(s) !== null) continue;
            } else y = f.action;
            typeof y == "function"
              ? (n[i + 1] = y)
              : (n.splice(i, 3), (i -= 3)),
              j0(n);
          }
        }
    }
    function qc(t) {
      this._internalRoot = t;
    }
    (tu.prototype.render = qc.prototype.render =
      function (t) {
        var e = this._internalRoot;
        if (e === null) throw Error(o(409));
        var n = e.current,
          i = Te();
        C0(n, i, t, e, null, null);
      }),
      (tu.prototype.unmount = qc.prototype.unmount =
        function () {
          var t = this._internalRoot;
          if (t !== null) {
            this._internalRoot = null;
            var e = t.containerInfo;
            C0(t.current, 2, null, t, null, null), js(), (e[xa] = null);
          }
        });
    function tu(t) {
      this._internalRoot = t;
    }
    tu.prototype.unstable_scheduleHydration = function (t) {
      if (t) {
        var e = Wd();
        t = { blockedOn: null, target: t, priority: e };
        for (var n = 0; n < qn.length && e !== 0 && e < qn[n].priority; n++);
        qn.splice(n, 0, t), n === 0 && U0(t);
      }
    };
    var B0 = l.version;
    if (B0 !== "19.1.0") throw Error(o(527, B0, "19.1.0"));
    N.findDOMNode = function (t) {
      var e = t._reactInternals;
      if (e === void 0)
        throw typeof t.render == "function"
          ? Error(o(188))
          : ((t = Object.keys(t).join(",")), Error(o(268, t)));
      return (
        (t = p(e)),
        (t = t !== null ? m(t) : null),
        (t = t === null ? null : t.stateNode),
        t
      );
    };
    var m2 = {
      bundleType: 0,
      version: "19.1.0",
      rendererPackageName: "react-dom",
      currentDispatcherRef: z,
      reconcilerVersion: "19.1.0",
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var eu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!eu.isDisabled && eu.supportsFiber)
        try {
          (Ri = eu.inject(m2)), (me = eu);
        } catch {}
    }
    return (
      (oi.createRoot = function (t, e) {
        if (!c(t)) throw Error(o(299));
        var n = !1,
          i = "",
          s = Wp,
          r = Ip,
          f = ty,
          y = null;
        return (
          e != null &&
            (e.unstable_strictMode === !0 && (n = !0),
            e.identifierPrefix !== void 0 && (i = e.identifierPrefix),
            e.onUncaughtError !== void 0 && (s = e.onUncaughtError),
            e.onCaughtError !== void 0 && (r = e.onCaughtError),
            e.onRecoverableError !== void 0 && (f = e.onRecoverableError),
            e.unstable_transitionCallbacks !== void 0 &&
              (y = e.unstable_transitionCallbacks)),
          (e = D0(t, 1, !1, null, null, n, i, s, r, f, y, null)),
          (t[xa] = e.current),
          xc(t),
          new qc(e)
        );
      }),
      (oi.hydrateRoot = function (t, e, n) {
        if (!c(t)) throw Error(o(299));
        var i = !1,
          s = "",
          r = Wp,
          f = Ip,
          y = ty,
          b = null,
          D = null;
        return (
          n != null &&
            (n.unstable_strictMode === !0 && (i = !0),
            n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
            n.onUncaughtError !== void 0 && (r = n.onUncaughtError),
            n.onCaughtError !== void 0 && (f = n.onCaughtError),
            n.onRecoverableError !== void 0 && (y = n.onRecoverableError),
            n.unstable_transitionCallbacks !== void 0 &&
              (b = n.unstable_transitionCallbacks),
            n.formState !== void 0 && (D = n.formState)),
          (e = D0(t, 1, !0, e, n ?? null, i, s, r, f, y, b, D)),
          (e.context = R0(null)),
          (n = e.current),
          (i = Te()),
          (i = Vo(i)),
          (s = An(i)),
          (s.callback = null),
          En(n, s, i),
          (n = i),
          (e.current.lanes = n),
          Oi(e, n),
          Je(e),
          (t[xa] = e.current),
          xc(t),
          new tu(e)
        );
      }),
      (oi.version = "19.1.0"),
      oi
    );
  }
  var Fc;
  function Q0() {
    if (Fc) return au.exports;
    Fc = 1;
    function a() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
        } catch (l) {
          console.error(l);
        }
    }
    return a(), (au.exports = Z0()), au.exports;
  }
  var K0 = Q0(),
    L = uu();
  const ru = L.createContext({});
  function cu(a) {
    const l = L.useRef(null);
    return l.current === null && (l.current = a()), l.current;
  }
  const fu = typeof window < "u",
    $c = fu ? L.useLayoutEffect : L.useEffect,
    El = L.createContext(null);
  function hu(a, l) {
    a.indexOf(l) === -1 && a.push(l);
  }
  function du(a, l) {
    const u = a.indexOf(l);
    u > -1 && a.splice(u, 1);
  }
  const Pe = (a, l, u) => (u > l ? l : u < a ? a : u);
  let mu = () => {};
  const Fe = {},
    Wc = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a);
  function Ic(a) {
    return typeof a == "object" && a !== null;
  }
  const tf = (a) => /^0[^.\s]+$/u.test(a);
  function pu(a) {
    let l;
    return () => (l === void 0 && (l = a()), l);
  }
  const Ae = (a) => a,
    k0 = (a, l) => (u) => l(a(u)),
    ri = (...a) => a.reduce(k0),
    ci = (a, l, u) => {
      const o = l - a;
      return o === 0 ? 1 : (u - a) / o;
    };
  class yu {
    constructor() {
      this.subscriptions = [];
    }
    add(l) {
      return hu(this.subscriptions, l), () => du(this.subscriptions, l);
    }
    notify(l, u, o) {
      const c = this.subscriptions.length;
      if (c)
        if (c === 1) this.subscriptions[0](l, u, o);
        else
          for (let d = 0; d < c; d++) {
            const h = this.subscriptions[d];
            h && h(l, u, o);
          }
    }
    getSize() {
      return this.subscriptions.length;
    }
    clear() {
      this.subscriptions.length = 0;
    }
  }
  const qe = (a) => a * 1e3,
    Ye = (a) => a / 1e3;
  function ef(a, l) {
    return l ? a * (1e3 / l) : 0;
  }
  const nf = (a, l, u) =>
      (((1 - 3 * u + 3 * l) * a + (3 * u - 6 * l)) * a + 3 * l) * a,
    J0 = 1e-7,
    P0 = 12;
  function F0(a, l, u, o, c) {
    let d,
      h,
      g = 0;
    do (h = l + (u - l) / 2), (d = nf(h, o, c) - a), d > 0 ? (u = h) : (l = h);
    while (Math.abs(d) > J0 && ++g < P0);
    return h;
  }
  function fi(a, l, u, o) {
    if (a === l && u === o) return Ae;
    const c = (d) => F0(d, 0, 1, a, u);
    return (d) => (d === 0 || d === 1 ? d : nf(c(d), l, o));
  }
  const af = (a) => (l) => l <= 0.5 ? a(2 * l) / 2 : (2 - a(2 * (1 - l))) / 2,
    lf = (a) => (l) => 1 - a(1 - l),
    sf = fi(0.33, 1.53, 0.69, 0.99),
    gu = lf(sf),
    uf = af(gu),
    of = (a) =>
      (a *= 2) < 1 ? 0.5 * gu(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))),
    vu = (a) => 1 - Math.sin(Math.acos(a)),
    rf = lf(vu),
    cf = af(vu),
    $0 = fi(0.42, 0, 1, 1),
    W0 = fi(0, 0, 0.58, 1),
    ff = fi(0.42, 0, 0.58, 1),
    I0 = (a) => Array.isArray(a) && typeof a[0] != "number",
    hf = (a) => Array.isArray(a) && typeof a[0] == "number",
    tg = {
      linear: Ae,
      easeIn: $0,
      easeInOut: ff,
      easeOut: W0,
      circIn: vu,
      circInOut: cf,
      circOut: rf,
      backIn: gu,
      backInOut: uf,
      backOut: sf,
      anticipate: of,
    },
    eg = (a) => typeof a == "string",
    df = (a) => {
      if (hf(a)) {
        mu(a.length === 4);
        const [l, u, o, c] = a;
        return fi(l, u, o, c);
      } else if (eg(a)) return tg[a];
      return a;
    },
    Ml = [
      "setup",
      "read",
      "resolveKeyframes",
      "preUpdate",
      "update",
      "preRender",
      "render",
      "postRender",
    ],
    mf = { value: null };
  function ng(a, l) {
    let u = new Set(),
      o = new Set(),
      c = !1,
      d = !1;
    const h = new WeakSet();
    let g = { delta: 0, timestamp: 0, isProcessing: !1 },
      p = 0;
    function m(T) {
      h.has(T) && (v.schedule(T), a()), p++, T(g);
    }
    const v = {
      schedule: (T, x = !1, V = !1) => {
        const G = V && c ? u : o;
        return x && h.add(T), G.has(T) || G.add(T), T;
      },
      cancel: (T) => {
        o.delete(T), h.delete(T);
      },
      process: (T) => {
        if (((g = T), c)) {
          d = !0;
          return;
        }
        (c = !0),
          ([u, o] = [o, u]),
          u.forEach(m),
          l && mf.value && mf.value.frameloop[l].push(p),
          (p = 0),
          u.clear(),
          (c = !1),
          d && ((d = !1), v.process(T));
      },
    };
    return v;
  }
  const ag = 40;
  function pf(a, l) {
    let u = !1,
      o = !0;
    const c = { delta: 0, timestamp: 0, isProcessing: !1 },
      d = () => (u = !0),
      h = Ml.reduce((Y, I) => ((Y[I] = ng(d, l ? I : void 0)), Y), {}),
      {
        setup: g,
        read: p,
        resolveKeyframes: m,
        preUpdate: v,
        update: T,
        preRender: x,
        render: V,
        postRender: w,
      } = h,
      G = () => {
        const Y = Fe.useManualTiming ? c.timestamp : performance.now();
        (u = !1),
          Fe.useManualTiming ||
            (c.delta = o
              ? 1e3 / 60
              : Math.max(Math.min(Y - c.timestamp, ag), 1)),
          (c.timestamp = Y),
          (c.isProcessing = !0),
          g.process(c),
          p.process(c),
          m.process(c),
          v.process(c),
          T.process(c),
          x.process(c),
          V.process(c),
          w.process(c),
          (c.isProcessing = !1),
          u && l && ((o = !1), a(G));
      },
      Q = () => {
        (u = !0), (o = !0), c.isProcessing || a(G);
      };
    return {
      schedule: Ml.reduce((Y, I) => {
        const q = h[I];
        return (
          (Y[I] = (k, tt = !1, F = !1) => (u || Q(), q.schedule(k, tt, F))), Y
        );
      }, {}),
      cancel: (Y) => {
        for (let I = 0; I < Ml.length; I++) h[Ml[I]].cancel(Y);
      },
      state: c,
      steps: h,
    };
  }
  const {
    schedule: Rt,
    cancel: dn,
    state: Jt,
    steps: Su,
  } = pf(typeof requestAnimationFrame < "u" ? requestAnimationFrame : Ae, !0);
  let Dl;
  function ig() {
    Dl = void 0;
  }
  const le = {
      now: () => (
        Dl === void 0 &&
          le.set(
            Jt.isProcessing || Fe.useManualTiming
              ? Jt.timestamp
              : performance.now()
          ),
        Dl
      ),
      set: (a) => {
        (Dl = a), queueMicrotask(ig);
      },
    },
    yf = (a) => (l) => typeof l == "string" && l.startsWith(a),
    bu = yf("--"),
    lg = yf("var(--"),
    Tu = (a) => (lg(a) ? sg.test(a.split("/*")[0].trim()) : !1),
    sg =
      /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
    ha = {
      test: (a) => typeof a == "number",
      parse: parseFloat,
      transform: (a) => a,
    },
    hi = { ...ha, transform: (a) => Pe(0, 1, a) },
    Rl = { ...ha, default: 1 },
    di = (a) => Math.round(a * 1e5) / 1e5,
    xu = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
  function ug(a) {
    return a == null;
  }
  const og =
      /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
    Au = (a, l) => (u) =>
      !!(
        (typeof u == "string" && og.test(u) && u.startsWith(a)) ||
        (l && !ug(u) && Object.prototype.hasOwnProperty.call(u, l))
      ),
    gf = (a, l, u) => (o) => {
      if (typeof o != "string") return o;
      const [c, d, h, g] = o.match(xu);
      return {
        [a]: parseFloat(c),
        [l]: parseFloat(d),
        [u]: parseFloat(h),
        alpha: g !== void 0 ? parseFloat(g) : 1,
      };
    },
    rg = (a) => Pe(0, 255, a),
    Eu = { ...ha, transform: (a) => Math.round(rg(a)) },
    Gn = {
      test: Au("rgb", "red"),
      parse: gf("red", "green", "blue"),
      transform: ({ red: a, green: l, blue: u, alpha: o = 1 }) =>
        "rgba(" +
        Eu.transform(a) +
        ", " +
        Eu.transform(l) +
        ", " +
        Eu.transform(u) +
        ", " +
        di(hi.transform(o)) +
        ")",
    };
  function cg(a) {
    let l = "",
      u = "",
      o = "",
      c = "";
    return (
      a.length > 5
        ? ((l = a.substring(1, 3)),
          (u = a.substring(3, 5)),
          (o = a.substring(5, 7)),
          (c = a.substring(7, 9)))
        : ((l = a.substring(1, 2)),
          (u = a.substring(2, 3)),
          (o = a.substring(3, 4)),
          (c = a.substring(4, 5)),
          (l += l),
          (u += u),
          (o += o),
          (c += c)),
      {
        red: parseInt(l, 16),
        green: parseInt(u, 16),
        blue: parseInt(o, 16),
        alpha: c ? parseInt(c, 16) / 255 : 1,
      }
    );
  }
  const Mu = { test: Au("#"), parse: cg, transform: Gn.transform },
    mi = (a) => ({
      test: (l) =>
        typeof l == "string" && l.endsWith(a) && l.split(" ").length === 1,
      parse: parseFloat,
      transform: (l) => `${l}${a}`,
    }),
    mn = mi("deg"),
    Ge = mi("%"),
    at = mi("px"),
    fg = mi("vh"),
    hg = mi("vw"),
    vf = {
      ...Ge,
      parse: (a) => Ge.parse(a) / 100,
      transform: (a) => Ge.transform(a * 100),
    },
    da = {
      test: Au("hsl", "hue"),
      parse: gf("hue", "saturation", "lightness"),
      transform: ({ hue: a, saturation: l, lightness: u, alpha: o = 1 }) =>
        "hsla(" +
        Math.round(a) +
        ", " +
        Ge.transform(di(l)) +
        ", " +
        Ge.transform(di(u)) +
        ", " +
        di(hi.transform(o)) +
        ")",
    },
    Ht = {
      test: (a) => Gn.test(a) || Mu.test(a) || da.test(a),
      parse: (a) =>
        Gn.test(a) ? Gn.parse(a) : da.test(a) ? da.parse(a) : Mu.parse(a),
      transform: (a) =>
        typeof a == "string"
          ? a
          : a.hasOwnProperty("red")
          ? Gn.transform(a)
          : da.transform(a),
      getAnimatableNone: (a) => {
        const l = Ht.parse(a);
        return (l.alpha = 0), Ht.transform(l);
      },
    },
    dg =
      /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
  function mg(a) {
    return (
      isNaN(a) &&
      typeof a == "string" &&
      (a.match(xu)?.length || 0) + (a.match(dg)?.length || 0) > 0
    );
  }
  const Sf = "number",
    bf = "color",
    pg = "var",
    yg = "var(",
    Tf = "${}",
    gg =
      /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
  function pi(a) {
    const l = a.toString(),
      u = [],
      o = { color: [], number: [], var: [] },
      c = [];
    let d = 0;
    const g = l
      .replace(
        gg,
        (p) => (
          Ht.test(p)
            ? (o.color.push(d), c.push(bf), u.push(Ht.parse(p)))
            : p.startsWith(yg)
            ? (o.var.push(d), c.push(pg), u.push(p))
            : (o.number.push(d), c.push(Sf), u.push(parseFloat(p))),
          ++d,
          Tf
        )
      )
      .split(Tf);
    return { values: u, split: g, indexes: o, types: c };
  }
  function xf(a) {
    return pi(a).values;
  }
  function Af(a) {
    const { split: l, types: u } = pi(a),
      o = l.length;
    return (c) => {
      let d = "";
      for (let h = 0; h < o; h++)
        if (((d += l[h]), c[h] !== void 0)) {
          const g = u[h];
          g === Sf
            ? (d += di(c[h]))
            : g === bf
            ? (d += Ht.transform(c[h]))
            : (d += c[h]);
        }
      return d;
    };
  }
  const vg = (a) =>
    typeof a == "number" ? 0 : Ht.test(a) ? Ht.getAnimatableNone(a) : a;
  function Sg(a) {
    const l = xf(a);
    return Af(a)(l.map(vg));
  }
  const pn = {
    test: mg,
    parse: xf,
    createTransformer: Af,
    getAnimatableNone: Sg,
  };
  function Du(a, l, u) {
    return (
      u < 0 && (u += 1),
      u > 1 && (u -= 1),
      u < 1 / 6
        ? a + (l - a) * 6 * u
        : u < 1 / 2
        ? l
        : u < 2 / 3
        ? a + (l - a) * (2 / 3 - u) * 6
        : a
    );
  }
  function bg({ hue: a, saturation: l, lightness: u, alpha: o }) {
    (a /= 360), (l /= 100), (u /= 100);
    let c = 0,
      d = 0,
      h = 0;
    if (!l) c = d = h = u;
    else {
      const g = u < 0.5 ? u * (1 + l) : u + l - u * l,
        p = 2 * u - g;
      (c = Du(p, g, a + 1 / 3)), (d = Du(p, g, a)), (h = Du(p, g, a - 1 / 3));
    }
    return {
      red: Math.round(c * 255),
      green: Math.round(d * 255),
      blue: Math.round(h * 255),
      alpha: o,
    };
  }
  function Cl(a, l) {
    return (u) => (u > 0 ? l : a);
  }
  const Vt = (a, l, u) => a + (l - a) * u,
    Ru = (a, l, u) => {
      const o = a * a,
        c = u * (l * l - o) + o;
      return c < 0 ? 0 : Math.sqrt(c);
    },
    Tg = [Mu, Gn, da],
    xg = (a) => Tg.find((l) => l.test(a));
  function Ef(a) {
    const l = xg(a);
    if (!l) return !1;
    let u = l.parse(a);
    return l === da && (u = bg(u)), u;
  }
  const Mf = (a, l) => {
      const u = Ef(a),
        o = Ef(l);
      if (!u || !o) return Cl(a, l);
      const c = { ...u };
      return (d) => (
        (c.red = Ru(u.red, o.red, d)),
        (c.green = Ru(u.green, o.green, d)),
        (c.blue = Ru(u.blue, o.blue, d)),
        (c.alpha = Vt(u.alpha, o.alpha, d)),
        Gn.transform(c)
      );
    },
    Cu = new Set(["none", "hidden"]);
  function Ag(a, l) {
    return Cu.has(a) ? (u) => (u <= 0 ? a : l) : (u) => (u >= 1 ? l : a);
  }
  function Eg(a, l) {
    return (u) => Vt(a, l, u);
  }
  function Ou(a) {
    return typeof a == "number"
      ? Eg
      : typeof a == "string"
      ? Tu(a)
        ? Cl
        : Ht.test(a)
        ? Mf
        : Rg
      : Array.isArray(a)
      ? Df
      : typeof a == "object"
      ? Ht.test(a)
        ? Mf
        : Mg
      : Cl;
  }
  function Df(a, l) {
    const u = [...a],
      o = u.length,
      c = a.map((d, h) => Ou(d)(d, l[h]));
    return (d) => {
      for (let h = 0; h < o; h++) u[h] = c[h](d);
      return u;
    };
  }
  function Mg(a, l) {
    const u = { ...a, ...l },
      o = {};
    for (const c in u)
      a[c] !== void 0 && l[c] !== void 0 && (o[c] = Ou(a[c])(a[c], l[c]));
    return (c) => {
      for (const d in o) u[d] = o[d](c);
      return u;
    };
  }
  function Dg(a, l) {
    const u = [],
      o = { color: 0, var: 0, number: 0 };
    for (let c = 0; c < l.values.length; c++) {
      const d = l.types[c],
        h = a.indexes[d][o[d]],
        g = a.values[h] ?? 0;
      (u[c] = g), o[d]++;
    }
    return u;
  }
  const Rg = (a, l) => {
    const u = pn.createTransformer(l),
      o = pi(a),
      c = pi(l);
    return o.indexes.var.length === c.indexes.var.length &&
      o.indexes.color.length === c.indexes.color.length &&
      o.indexes.number.length >= c.indexes.number.length
      ? (Cu.has(a) && !c.values.length) || (Cu.has(l) && !o.values.length)
        ? Ag(a, l)
        : ri(Df(Dg(o, c), c.values), u)
      : Cl(a, l);
  };
  function Rf(a, l, u) {
    return typeof a == "number" && typeof l == "number" && typeof u == "number"
      ? Vt(a, l, u)
      : Ou(a)(a, l);
  }
  const Cg = (a) => {
      const l = ({ timestamp: u }) => a(u);
      return {
        start: (u = !0) => Rt.update(l, u),
        stop: () => dn(l),
        now: () => (Jt.isProcessing ? Jt.timestamp : le.now()),
      };
    },
    Cf = (a, l, u = 10) => {
      let o = "";
      const c = Math.max(Math.round(l / u), 2);
      for (let d = 0; d < c; d++)
        o += Math.round(a(d / (c - 1)) * 1e4) / 1e4 + ", ";
      return `linear(${o.substring(0, o.length - 2)})`;
    },
    Ol = 2e4;
  function zu(a) {
    let l = 0;
    const u = 50;
    let o = a.next(l);
    for (; !o.done && l < Ol; ) (l += u), (o = a.next(l));
    return l >= Ol ? 1 / 0 : l;
  }
  function Og(a, l = 100, u) {
    const o = u({ ...a, keyframes: [0, l] }),
      c = Math.min(zu(o), Ol);
    return {
      type: "keyframes",
      ease: (d) => o.next(c * d).value / l,
      duration: Ye(c),
    };
  }
  const zg = 5;
  function Of(a, l, u) {
    const o = Math.max(l - zg, 0);
    return ef(u - a(o), l - o);
  }
  const Ut = {
      stiffness: 100,
      damping: 10,
      mass: 1,
      velocity: 0,
      duration: 800,
      bounce: 0.3,
      visualDuration: 0.3,
      restSpeed: { granular: 0.01, default: 2 },
      restDelta: { granular: 0.005, default: 0.5 },
      minDuration: 0.01,
      maxDuration: 10,
      minDamping: 0.05,
      maxDamping: 1,
    },
    Vu = 0.001;
  function Vg({
    duration: a = Ut.duration,
    bounce: l = Ut.bounce,
    velocity: u = Ut.velocity,
    mass: o = Ut.mass,
  }) {
    let c,
      d,
      h = 1 - l;
    (h = Pe(Ut.minDamping, Ut.maxDamping, h)),
      (a = Pe(Ut.minDuration, Ut.maxDuration, Ye(a))),
      h < 1
        ? ((c = (m) => {
            const v = m * h,
              T = v * a,
              x = v - u,
              V = _u(m, h),
              w = Math.exp(-T);
            return Vu - (x / V) * w;
          }),
          (d = (m) => {
            const T = m * h * a,
              x = T * u + u,
              V = Math.pow(h, 2) * Math.pow(m, 2) * a,
              w = Math.exp(-T),
              G = _u(Math.pow(m, 2), h);
            return ((-c(m) + Vu > 0 ? -1 : 1) * ((x - V) * w)) / G;
          }))
        : ((c = (m) => {
            const v = Math.exp(-m * a),
              T = (m - u) * a + 1;
            return -Vu + v * T;
          }),
          (d = (m) => {
            const v = Math.exp(-m * a),
              T = (u - m) * (a * a);
            return v * T;
          }));
    const g = 5 / a,
      p = Ug(c, d, g);
    if (((a = qe(a)), isNaN(p)))
      return { stiffness: Ut.stiffness, damping: Ut.damping, duration: a };
    {
      const m = Math.pow(p, 2) * o;
      return { stiffness: m, damping: h * 2 * Math.sqrt(o * m), duration: a };
    }
  }
  const _g = 12;
  function Ug(a, l, u) {
    let o = u;
    for (let c = 1; c < _g; c++) o = o - a(o) / l(o);
    return o;
  }
  function _u(a, l) {
    return a * Math.sqrt(1 - l * l);
  }
  const wg = ["duration", "bounce"],
    jg = ["stiffness", "damping", "mass"];
  function zf(a, l) {
    return l.some((u) => a[u] !== void 0);
  }
  function Bg(a) {
    let l = {
      velocity: Ut.velocity,
      stiffness: Ut.stiffness,
      damping: Ut.damping,
      mass: Ut.mass,
      isResolvedFromDuration: !1,
      ...a,
    };
    if (!zf(a, jg) && zf(a, wg))
      if (a.visualDuration) {
        const u = a.visualDuration,
          o = (2 * Math.PI) / (u * 1.2),
          c = o * o,
          d = 2 * Pe(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(c);
        l = { ...l, mass: Ut.mass, stiffness: c, damping: d };
      } else {
        const u = Vg(a);
        (l = { ...l, ...u, mass: Ut.mass }), (l.isResolvedFromDuration = !0);
      }
    return l;
  }
  function zl(a = Ut.visualDuration, l = Ut.bounce) {
    const u =
      typeof a != "object"
        ? { visualDuration: a, keyframes: [0, 1], bounce: l }
        : a;
    let { restSpeed: o, restDelta: c } = u;
    const d = u.keyframes[0],
      h = u.keyframes[u.keyframes.length - 1],
      g = { done: !1, value: d },
      {
        stiffness: p,
        damping: m,
        mass: v,
        duration: T,
        velocity: x,
        isResolvedFromDuration: V,
      } = Bg({ ...u, velocity: -Ye(u.velocity || 0) }),
      w = x || 0,
      G = m / (2 * Math.sqrt(p * v)),
      Q = h - d,
      Z = Ye(Math.sqrt(p / v)),
      K = Math.abs(Q) < 5;
    o || (o = K ? Ut.restSpeed.granular : Ut.restSpeed.default),
      c || (c = K ? Ut.restDelta.granular : Ut.restDelta.default);
    let Y;
    if (G < 1) {
      const q = _u(Z, G);
      Y = (k) => {
        const tt = Math.exp(-G * Z * k);
        return (
          h -
          tt * (((w + G * Z * Q) / q) * Math.sin(q * k) + Q * Math.cos(q * k))
        );
      };
    } else if (G === 1) Y = (q) => h - Math.exp(-Z * q) * (Q + (w + Z * Q) * q);
    else {
      const q = Z * Math.sqrt(G * G - 1);
      Y = (k) => {
        const tt = Math.exp(-G * Z * k),
          F = Math.min(q * k, 300);
        return (
          h - (tt * ((w + G * Z * Q) * Math.sinh(F) + q * Q * Math.cosh(F))) / q
        );
      };
    }
    const I = {
      calculatedDuration: (V && T) || null,
      next: (q) => {
        const k = Y(q);
        if (V) g.done = q >= T;
        else {
          let tt = q === 0 ? w : 0;
          G < 1 && (tt = q === 0 ? qe(w) : Of(Y, q, k));
          const F = Math.abs(tt) <= o,
            ut = Math.abs(h - k) <= c;
          g.done = F && ut;
        }
        return (g.value = g.done ? h : k), g;
      },
      toString: () => {
        const q = Math.min(zu(I), Ol),
          k = Cf((tt) => I.next(q * tt).value, q, 30);
        return q + "ms " + k;
      },
      toTransition: () => {},
    };
    return I;
  }
  zl.applyToOptions = (a) => {
    const l = Og(a, 100, zl);
    return (
      (a.ease = l.ease),
      (a.duration = qe(l.duration)),
      (a.type = "keyframes"),
      a
    );
  };
  function Uu({
    keyframes: a,
    velocity: l = 0,
    power: u = 0.8,
    timeConstant: o = 325,
    bounceDamping: c = 10,
    bounceStiffness: d = 500,
    modifyTarget: h,
    min: g,
    max: p,
    restDelta: m = 0.5,
    restSpeed: v,
  }) {
    const T = a[0],
      x = { done: !1, value: T },
      V = (F) => (g !== void 0 && F < g) || (p !== void 0 && F > p),
      w = (F) =>
        g === void 0
          ? p
          : p === void 0 || Math.abs(g - F) < Math.abs(p - F)
          ? g
          : p;
    let G = u * l;
    const Q = T + G,
      Z = h === void 0 ? Q : h(Q);
    Z !== Q && (G = Z - T);
    const K = (F) => -G * Math.exp(-F / o),
      Y = (F) => Z + K(F),
      I = (F) => {
        const ut = K(F),
          St = Y(F);
        (x.done = Math.abs(ut) <= m), (x.value = x.done ? Z : St);
      };
    let q, k;
    const tt = (F) => {
      V(x.value) &&
        ((q = F),
        (k = zl({
          keyframes: [x.value, w(x.value)],
          velocity: Of(Y, F, x.value),
          damping: c,
          stiffness: d,
          restDelta: m,
          restSpeed: v,
        })));
    };
    return (
      tt(0),
      {
        calculatedDuration: null,
        next: (F) => {
          let ut = !1;
          return (
            !k && q === void 0 && ((ut = !0), I(F), tt(F)),
            q !== void 0 && F >= q ? k.next(F - q) : (!ut && I(F), x)
          );
        },
      }
    );
  }
  function Ng(a, l, u) {
    const o = [],
      c = u || Fe.mix || Rf,
      d = a.length - 1;
    for (let h = 0; h < d; h++) {
      let g = c(a[h], a[h + 1]);
      if (l) {
        const p = Array.isArray(l) ? l[h] || Ae : l;
        g = ri(p, g);
      }
      o.push(g);
    }
    return o;
  }
  function Lg(a, l, { clamp: u = !0, ease: o, mixer: c } = {}) {
    const d = a.length;
    if ((mu(d === l.length), d === 1)) return () => l[0];
    if (d === 2 && l[0] === l[1]) return () => l[1];
    const h = a[0] === a[1];
    a[0] > a[d - 1] && ((a = [...a].reverse()), (l = [...l].reverse()));
    const g = Ng(l, o, c),
      p = g.length,
      m = (v) => {
        if (h && v < a[0]) return l[0];
        let T = 0;
        if (p > 1) for (; T < a.length - 2 && !(v < a[T + 1]); T++);
        const x = ci(a[T], a[T + 1], v);
        return g[T](x);
      };
    return u ? (v) => m(Pe(a[0], a[d - 1], v)) : m;
  }
  function Hg(a, l) {
    const u = a[a.length - 1];
    for (let o = 1; o <= l; o++) {
      const c = ci(0, l, o);
      a.push(Vt(u, 1, c));
    }
  }
  function qg(a) {
    const l = [0];
    return Hg(l, a.length - 1), l;
  }
  function Yg(a, l) {
    return a.map((u) => u * l);
  }
  function Gg(a, l) {
    return a.map(() => l || ff).splice(0, a.length - 1);
  }
  function yi({
    duration: a = 300,
    keyframes: l,
    times: u,
    ease: o = "easeInOut",
  }) {
    const c = I0(o) ? o.map(df) : df(o),
      d = { done: !1, value: l[0] },
      h = Yg(u && u.length === l.length ? u : qg(l), a),
      g = Lg(h, l, { ease: Array.isArray(c) ? c : Gg(l, c) });
    return {
      calculatedDuration: a,
      next: (p) => ((d.value = g(p)), (d.done = p >= a), d),
    };
  }
  const Xg = (a) => a !== null;
  function wu(a, { repeat: l, repeatType: u = "loop" }, o, c = 1) {
    const d = a.filter(Xg),
      g = c < 0 || (l && u !== "loop" && l % 2 === 1) ? 0 : d.length - 1;
    return !g || o === void 0 ? d[g] : o;
  }
  const Zg = { decay: Uu, inertia: Uu, tween: yi, keyframes: yi, spring: zl };
  function Vf(a) {
    typeof a.type == "string" && (a.type = Zg[a.type]);
  }
  class ju {
    constructor() {
      this.updateFinished();
    }
    get finished() {
      return this._finished;
    }
    updateFinished() {
      this._finished = new Promise((l) => {
        this.resolve = l;
      });
    }
    notifyFinished() {
      this.resolve();
    }
    then(l, u) {
      return this.finished.then(l, u);
    }
  }
  const Qg = (a) => a / 100;
  class Bu extends ju {
    constructor(l) {
      super(),
        (this.state = "idle"),
        (this.startTime = null),
        (this.isStopped = !1),
        (this.currentTime = 0),
        (this.holdTime = null),
        (this.playbackSpeed = 1),
        (this.stop = () => {
          const { motionValue: u } = this.options;
          u && u.updatedAt !== le.now() && this.tick(le.now()),
            (this.isStopped = !0),
            this.state !== "idle" && (this.teardown(), this.options.onStop?.());
        }),
        (this.options = l),
        this.initAnimation(),
        this.play(),
        l.autoplay === !1 && this.pause();
    }
    initAnimation() {
      const { options: l } = this;
      Vf(l);
      const {
        type: u = yi,
        repeat: o = 0,
        repeatDelay: c = 0,
        repeatType: d,
        velocity: h = 0,
      } = l;
      let { keyframes: g } = l;
      const p = u || yi;
      p !== yi &&
        typeof g[0] != "number" &&
        ((this.mixKeyframes = ri(Qg, Rf(g[0], g[1]))), (g = [0, 100]));
      const m = p({ ...l, keyframes: g });
      d === "mirror" &&
        (this.mirroredGenerator = p({
          ...l,
          keyframes: [...g].reverse(),
          velocity: -h,
        })),
        m.calculatedDuration === null && (m.calculatedDuration = zu(m));
      const { calculatedDuration: v } = m;
      (this.calculatedDuration = v),
        (this.resolvedDuration = v + c),
        (this.totalDuration = this.resolvedDuration * (o + 1) - c),
        (this.generator = m);
    }
    updateTime(l) {
      const u = Math.round(l - this.startTime) * this.playbackSpeed;
      this.holdTime !== null
        ? (this.currentTime = this.holdTime)
        : (this.currentTime = u);
    }
    tick(l, u = !1) {
      const {
        generator: o,
        totalDuration: c,
        mixKeyframes: d,
        mirroredGenerator: h,
        resolvedDuration: g,
        calculatedDuration: p,
      } = this;
      if (this.startTime === null) return o.next(0);
      const {
        delay: m = 0,
        keyframes: v,
        repeat: T,
        repeatType: x,
        repeatDelay: V,
        type: w,
        onUpdate: G,
        finalKeyframe: Q,
      } = this.options;
      this.speed > 0
        ? (this.startTime = Math.min(this.startTime, l))
        : this.speed < 0 &&
          (this.startTime = Math.min(l - c / this.speed, this.startTime)),
        u ? (this.currentTime = l) : this.updateTime(l);
      const Z = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1),
        K = this.playbackSpeed >= 0 ? Z < 0 : Z > c;
      (this.currentTime = Math.max(Z, 0)),
        this.state === "finished" &&
          this.holdTime === null &&
          (this.currentTime = c);
      let Y = this.currentTime,
        I = o;
      if (T) {
        const F = Math.min(this.currentTime, c) / g;
        let ut = Math.floor(F),
          St = F % 1;
        !St && F >= 1 && (St = 1),
          St === 1 && ut--,
          (ut = Math.min(ut, T + 1)),
          !!(ut % 2) &&
            (x === "reverse"
              ? ((St = 1 - St), V && (St -= V / g))
              : x === "mirror" && (I = h)),
          (Y = Pe(0, 1, St) * g);
      }
      const q = K ? { done: !1, value: v[0] } : I.next(Y);
      d && (q.value = d(q.value));
      let { done: k } = q;
      !K &&
        p !== null &&
        (k =
          this.playbackSpeed >= 0
            ? this.currentTime >= c
            : this.currentTime <= 0);
      const tt =
        this.holdTime === null &&
        (this.state === "finished" || (this.state === "running" && k));
      return (
        tt && w !== Uu && (q.value = wu(v, this.options, Q, this.speed)),
        G && G(q.value),
        tt && this.finish(),
        q
      );
    }
    then(l, u) {
      return this.finished.then(l, u);
    }
    get duration() {
      return Ye(this.calculatedDuration);
    }
    get time() {
      return Ye(this.currentTime);
    }
    set time(l) {
      (l = qe(l)),
        (this.currentTime = l),
        this.startTime === null ||
        this.holdTime !== null ||
        this.playbackSpeed === 0
          ? (this.holdTime = l)
          : this.driver &&
            (this.startTime = this.driver.now() - l / this.playbackSpeed),
        this.driver?.start(!1);
    }
    get speed() {
      return this.playbackSpeed;
    }
    set speed(l) {
      this.updateTime(le.now());
      const u = this.playbackSpeed !== l;
      (this.playbackSpeed = l), u && (this.time = Ye(this.currentTime));
    }
    play() {
      if (this.isStopped) return;
      const { driver: l = Cg, startTime: u } = this.options;
      this.driver || (this.driver = l((c) => this.tick(c))),
        this.options.onPlay?.();
      const o = this.driver.now();
      this.state === "finished"
        ? (this.updateFinished(), (this.startTime = o))
        : this.holdTime !== null
        ? (this.startTime = o - this.holdTime)
        : this.startTime || (this.startTime = u ?? o),
        this.state === "finished" &&
          this.speed < 0 &&
          (this.startTime += this.calculatedDuration),
        (this.holdTime = null),
        (this.state = "running"),
        this.driver.start();
    }
    pause() {
      (this.state = "paused"),
        this.updateTime(le.now()),
        (this.holdTime = this.currentTime);
    }
    complete() {
      this.state !== "running" && this.play(),
        (this.state = "finished"),
        (this.holdTime = null);
    }
    finish() {
      this.notifyFinished(),
        this.teardown(),
        (this.state = "finished"),
        this.options.onComplete?.();
    }
    cancel() {
      (this.holdTime = null),
        (this.startTime = 0),
        this.tick(0),
        this.teardown(),
        this.options.onCancel?.();
    }
    teardown() {
      (this.state = "idle"),
        this.stopDriver(),
        (this.startTime = this.holdTime = null);
    }
    stopDriver() {
      this.driver && (this.driver.stop(), (this.driver = void 0));
    }
    sample(l) {
      return (this.startTime = 0), this.tick(l, !0);
    }
    attachTimeline(l) {
      return (
        this.options.allowFlatten &&
          ((this.options.type = "keyframes"),
          (this.options.ease = "linear"),
          this.initAnimation()),
        this.driver?.stop(),
        l.observe(this)
      );
    }
  }
  function Kg(a) {
    for (let l = 1; l < a.length; l++) a[l] ?? (a[l] = a[l - 1]);
  }
  const Xn = (a) => (a * 180) / Math.PI,
    Nu = (a) => {
      const l = Xn(Math.atan2(a[1], a[0]));
      return Lu(l);
    },
    kg = {
      x: 4,
      y: 5,
      translateX: 4,
      translateY: 5,
      scaleX: 0,
      scaleY: 3,
      scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
      rotate: Nu,
      rotateZ: Nu,
      skewX: (a) => Xn(Math.atan(a[1])),
      skewY: (a) => Xn(Math.atan(a[2])),
      skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2,
    },
    Lu = (a) => ((a = a % 360), a < 0 && (a += 360), a),
    _f = Nu,
    Uf = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]),
    wf = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]),
    Jg = {
      x: 12,
      y: 13,
      z: 14,
      translateX: 12,
      translateY: 13,
      translateZ: 14,
      scaleX: Uf,
      scaleY: wf,
      scale: (a) => (Uf(a) + wf(a)) / 2,
      rotateX: (a) => Lu(Xn(Math.atan2(a[6], a[5]))),
      rotateY: (a) => Lu(Xn(Math.atan2(-a[2], a[0]))),
      rotateZ: _f,
      rotate: _f,
      skewX: (a) => Xn(Math.atan(a[4])),
      skewY: (a) => Xn(Math.atan(a[1])),
      skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2,
    };
  function Hu(a) {
    return a.includes("scale") ? 1 : 0;
  }
  function qu(a, l) {
    if (!a || a === "none") return Hu(l);
    const u = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let o, c;
    if (u) (o = Jg), (c = u);
    else {
      const g = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
      (o = kg), (c = g);
    }
    if (!c) return Hu(l);
    const d = o[l],
      h = c[1].split(",").map(Fg);
    return typeof d == "function" ? d(h) : h[d];
  }
  const Pg = (a, l) => {
    const { transform: u = "none" } = getComputedStyle(a);
    return qu(u, l);
  };
  function Fg(a) {
    return parseFloat(a.trim());
  }
  const ma = [
      "transformPerspective",
      "x",
      "y",
      "z",
      "translateX",
      "translateY",
      "translateZ",
      "scale",
      "scaleX",
      "scaleY",
      "rotate",
      "rotateX",
      "rotateY",
      "rotateZ",
      "skew",
      "skewX",
      "skewY",
    ],
    pa = new Set(ma),
    jf = (a) => a === ha || a === at,
    $g = new Set(["x", "y", "z"]),
    Wg = ma.filter((a) => !$g.has(a));
  function Ig(a) {
    const l = [];
    return (
      Wg.forEach((u) => {
        const o = a.getValue(u);
        o !== void 0 &&
          (l.push([u, o.get()]), o.set(u.startsWith("scale") ? 1 : 0));
      }),
      l
    );
  }
  const Zn = {
    width: ({ x: a }, { paddingLeft: l = "0", paddingRight: u = "0" }) =>
      a.max - a.min - parseFloat(l) - parseFloat(u),
    height: ({ y: a }, { paddingTop: l = "0", paddingBottom: u = "0" }) =>
      a.max - a.min - parseFloat(l) - parseFloat(u),
    top: (a, { top: l }) => parseFloat(l),
    left: (a, { left: l }) => parseFloat(l),
    bottom: ({ y: a }, { top: l }) => parseFloat(l) + (a.max - a.min),
    right: ({ x: a }, { left: l }) => parseFloat(l) + (a.max - a.min),
    x: (a, { transform: l }) => qu(l, "x"),
    y: (a, { transform: l }) => qu(l, "y"),
  };
  (Zn.translateX = Zn.x), (Zn.translateY = Zn.y);
  const Qn = new Set();
  let Yu = !1,
    Gu = !1,
    Xu = !1;
  function Bf() {
    if (Gu) {
      const a = Array.from(Qn).filter((o) => o.needsMeasurement),
        l = new Set(a.map((o) => o.element)),
        u = new Map();
      l.forEach((o) => {
        const c = Ig(o);
        c.length && (u.set(o, c), o.render());
      }),
        a.forEach((o) => o.measureInitialState()),
        l.forEach((o) => {
          o.render();
          const c = u.get(o);
          c &&
            c.forEach(([d, h]) => {
              o.getValue(d)?.set(h);
            });
        }),
        a.forEach((o) => o.measureEndState()),
        a.forEach((o) => {
          o.suspendedScrollY !== void 0 &&
            window.scrollTo(0, o.suspendedScrollY);
        });
    }
    (Gu = !1), (Yu = !1), Qn.forEach((a) => a.complete(Xu)), Qn.clear();
  }
  function Nf() {
    Qn.forEach((a) => {
      a.readKeyframes(), a.needsMeasurement && (Gu = !0);
    });
  }
  function tv() {
    (Xu = !0), Nf(), Bf(), (Xu = !1);
  }
  class Zu {
    constructor(l, u, o, c, d, h = !1) {
      (this.state = "pending"),
        (this.isAsync = !1),
        (this.needsMeasurement = !1),
        (this.unresolvedKeyframes = [...l]),
        (this.onComplete = u),
        (this.name = o),
        (this.motionValue = c),
        (this.element = d),
        (this.isAsync = h);
    }
    scheduleResolve() {
      (this.state = "scheduled"),
        this.isAsync
          ? (Qn.add(this),
            Yu || ((Yu = !0), Rt.read(Nf), Rt.resolveKeyframes(Bf)))
          : (this.readKeyframes(), this.complete());
    }
    readKeyframes() {
      const {
        unresolvedKeyframes: l,
        name: u,
        element: o,
        motionValue: c,
      } = this;
      if (l[0] === null) {
        const d = c?.get(),
          h = l[l.length - 1];
        if (d !== void 0) l[0] = d;
        else if (o && u) {
          const g = o.readValue(u, h);
          g != null && (l[0] = g);
        }
        l[0] === void 0 && (l[0] = h), c && d === void 0 && c.set(l[0]);
      }
      Kg(l);
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(l = !1) {
      (this.state = "complete"),
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, l),
        Qn.delete(this);
    }
    cancel() {
      this.state === "scheduled" && (Qn.delete(this), (this.state = "pending"));
    }
    resume() {
      this.state === "pending" && this.scheduleResolve();
    }
  }
  const ev = (a) => a.startsWith("--");
  function nv(a, l, u) {
    ev(l) ? a.style.setProperty(l, u) : (a.style[l] = u);
  }
  const av = pu(() => window.ScrollTimeline !== void 0),
    iv = {};
  function lv(a, l) {
    const u = pu(a);
    return () => iv[l] ?? u();
  }
  const Lf = lv(() => {
      try {
        document
          .createElement("div")
          .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
      } catch {
        return !1;
      }
      return !0;
    }, "linearEasing"),
    gi = ([a, l, u, o]) => `cubic-bezier(${a}, ${l}, ${u}, ${o})`,
    Hf = {
      linear: "linear",
      ease: "ease",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
      circIn: gi([0, 0.65, 0.55, 1]),
      circOut: gi([0.55, 0, 1, 0.45]),
      backIn: gi([0.31, 0.01, 0.66, -0.59]),
      backOut: gi([0.33, 1.53, 0.69, 0.99]),
    };
  function qf(a, l) {
    if (a)
      return typeof a == "function"
        ? Lf()
          ? Cf(a, l)
          : "ease-out"
        : hf(a)
        ? gi(a)
        : Array.isArray(a)
        ? a.map((u) => qf(u, l) || Hf.easeOut)
        : Hf[a];
  }
  function sv(
    a,
    l,
    u,
    {
      delay: o = 0,
      duration: c = 300,
      repeat: d = 0,
      repeatType: h = "loop",
      ease: g = "easeOut",
      times: p,
    } = {},
    m = void 0
  ) {
    const v = { [l]: u };
    p && (v.offset = p);
    const T = qf(g, c);
    Array.isArray(T) && (v.easing = T);
    const x = {
      delay: o,
      duration: c,
      easing: Array.isArray(T) ? "linear" : T,
      fill: "both",
      iterations: d + 1,
      direction: h === "reverse" ? "alternate" : "normal",
    };
    return m && (x.pseudoElement = m), a.animate(v, x);
  }
  function Yf(a) {
    return typeof a == "function" && "applyToOptions" in a;
  }
  function uv({ type: a, ...l }) {
    return Yf(a) && Lf()
      ? a.applyToOptions(l)
      : (l.duration ?? (l.duration = 300), l.ease ?? (l.ease = "easeOut"), l);
  }
  class ov extends ju {
    constructor(l) {
      if ((super(), (this.finishedTime = null), (this.isStopped = !1), !l))
        return;
      const {
        element: u,
        name: o,
        keyframes: c,
        pseudoElement: d,
        allowFlatten: h = !1,
        finalKeyframe: g,
        onComplete: p,
      } = l;
      (this.isPseudoElement = !!d),
        (this.allowFlatten = h),
        (this.options = l),
        mu(typeof l.type != "string");
      const m = uv(l);
      (this.animation = sv(u, o, c, m, d)),
        m.autoplay === !1 && this.animation.pause(),
        (this.animation.onfinish = () => {
          if (((this.finishedTime = this.time), !d)) {
            const v = wu(c, this.options, g, this.speed);
            this.updateMotionValue ? this.updateMotionValue(v) : nv(u, o, v),
              this.animation.cancel();
          }
          p?.(), this.notifyFinished();
        });
    }
    play() {
      this.isStopped ||
        (this.animation.play(),
        this.state === "finished" && this.updateFinished());
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.finish?.();
    }
    cancel() {
      try {
        this.animation.cancel();
      } catch {}
    }
    stop() {
      if (this.isStopped) return;
      this.isStopped = !0;
      const { state: l } = this;
      l === "idle" ||
        l === "finished" ||
        (this.updateMotionValue
          ? this.updateMotionValue()
          : this.commitStyles(),
        this.isPseudoElement || this.cancel());
    }
    commitStyles() {
      this.isPseudoElement || this.animation.commitStyles?.();
    }
    get duration() {
      const l = this.animation.effect?.getComputedTiming?.().duration || 0;
      return Ye(Number(l));
    }
    get time() {
      return Ye(Number(this.animation.currentTime) || 0);
    }
    set time(l) {
      (this.finishedTime = null), (this.animation.currentTime = qe(l));
    }
    get speed() {
      return this.animation.playbackRate;
    }
    set speed(l) {
      l < 0 && (this.finishedTime = null), (this.animation.playbackRate = l);
    }
    get state() {
      return this.finishedTime !== null ? "finished" : this.animation.playState;
    }
    get startTime() {
      return Number(this.animation.startTime);
    }
    set startTime(l) {
      this.animation.startTime = l;
    }
    attachTimeline({ timeline: l, observe: u }) {
      return (
        this.allowFlatten &&
          this.animation.effect?.updateTiming({ easing: "linear" }),
        (this.animation.onfinish = null),
        l && av() ? ((this.animation.timeline = l), Ae) : u(this)
      );
    }
  }
  const Gf = { anticipate: of, backInOut: uf, circInOut: cf };
  function rv(a) {
    return a in Gf;
  }
  function cv(a) {
    typeof a.ease == "string" && rv(a.ease) && (a.ease = Gf[a.ease]);
  }
  const Xf = 10;
  class fv extends ov {
    constructor(l) {
      cv(l),
        Vf(l),
        super(l),
        l.startTime && (this.startTime = l.startTime),
        (this.options = l);
    }
    updateMotionValue(l) {
      const {
        motionValue: u,
        onUpdate: o,
        onComplete: c,
        element: d,
        ...h
      } = this.options;
      if (!u) return;
      if (l !== void 0) {
        u.set(l);
        return;
      }
      const g = new Bu({ ...h, autoplay: !1 }),
        p = qe(this.finishedTime ?? this.time);
      u.setWithVelocity(g.sample(p - Xf).value, g.sample(p).value, Xf),
        g.stop();
    }
  }
  const Zf = (a, l) =>
    l === "zIndex"
      ? !1
      : !!(
          typeof a == "number" ||
          Array.isArray(a) ||
          (typeof a == "string" &&
            (pn.test(a) || a === "0") &&
            !a.startsWith("url("))
        );
  function hv(a) {
    const l = a[0];
    if (a.length === 1) return !0;
    for (let u = 0; u < a.length; u++) if (a[u] !== l) return !0;
  }
  function dv(a, l, u, o) {
    const c = a[0];
    if (c === null) return !1;
    if (l === "display" || l === "visibility") return !0;
    const d = a[a.length - 1],
      h = Zf(c, l),
      g = Zf(d, l);
    return !h || !g ? !1 : hv(a) || ((u === "spring" || Yf(u)) && o);
  }
  function Qu(a) {
    return Ic(a) && "offsetHeight" in a;
  }
  const mv = new Set(["opacity", "clipPath", "filter", "transform"]),
    pv = pu(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
  function yv(a) {
    const {
      motionValue: l,
      name: u,
      repeatDelay: o,
      repeatType: c,
      damping: d,
      type: h,
    } = a;
    if (!Qu(l?.owner?.current)) return !1;
    const { onUpdate: g, transformTemplate: p } = l.owner.getProps();
    return (
      pv() &&
      u &&
      mv.has(u) &&
      (u !== "transform" || !p) &&
      !g &&
      !o &&
      c !== "mirror" &&
      d !== 0 &&
      h !== "inertia"
    );
  }
  const gv = 40;
  class vv extends ju {
    constructor({
      autoplay: l = !0,
      delay: u = 0,
      type: o = "keyframes",
      repeat: c = 0,
      repeatDelay: d = 0,
      repeatType: h = "loop",
      keyframes: g,
      name: p,
      motionValue: m,
      element: v,
      ...T
    }) {
      super(),
        (this.stop = () => {
          this._animation && (this._animation.stop(), this.stopTimeline?.()),
            this.keyframeResolver?.cancel();
        }),
        (this.createdAt = le.now());
      const x = {
          autoplay: l,
          delay: u,
          type: o,
          repeat: c,
          repeatDelay: d,
          repeatType: h,
          name: p,
          motionValue: m,
          element: v,
          ...T,
        },
        V = v?.KeyframeResolver || Zu;
      (this.keyframeResolver = new V(
        g,
        (w, G, Q) => this.onKeyframesResolved(w, G, x, !Q),
        p,
        m,
        v
      )),
        this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(l, u, o, c) {
      this.keyframeResolver = void 0;
      const {
        name: d,
        type: h,
        velocity: g,
        delay: p,
        isHandoff: m,
        onUpdate: v,
      } = o;
      (this.resolvedAt = le.now()),
        dv(l, d, h, g) ||
          ((Fe.instantAnimations || !p) && v?.(wu(l, o, u)),
          (l[0] = l[l.length - 1]),
          (o.duration = 0),
          (o.repeat = 0));
      const x = {
          startTime: c
            ? this.resolvedAt
              ? this.resolvedAt - this.createdAt > gv
                ? this.resolvedAt
                : this.createdAt
              : this.createdAt
            : void 0,
          finalKeyframe: u,
          ...o,
          keyframes: l,
        },
        V =
          !m && yv(x)
            ? new fv({ ...x, element: x.motionValue.owner.current })
            : new Bu(x);
      V.finished.then(() => this.notifyFinished()).catch(Ae),
        this.pendingTimeline &&
          ((this.stopTimeline = V.attachTimeline(this.pendingTimeline)),
          (this.pendingTimeline = void 0)),
        (this._animation = V);
    }
    get finished() {
      return this._animation ? this.animation.finished : this._finished;
    }
    then(l, u) {
      return this.finished.finally(l).then(() => {});
    }
    get animation() {
      return (
        this._animation || (this.keyframeResolver?.resume(), tv()),
        this._animation
      );
    }
    get duration() {
      return this.animation.duration;
    }
    get time() {
      return this.animation.time;
    }
    set time(l) {
      this.animation.time = l;
    }
    get speed() {
      return this.animation.speed;
    }
    get state() {
      return this.animation.state;
    }
    set speed(l) {
      this.animation.speed = l;
    }
    get startTime() {
      return this.animation.startTime;
    }
    attachTimeline(l) {
      return (
        this._animation
          ? (this.stopTimeline = this.animation.attachTimeline(l))
          : (this.pendingTimeline = l),
        () => this.stop()
      );
    }
    play() {
      this.animation.play();
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.complete();
    }
    cancel() {
      this._animation && this.animation.cancel(),
        this.keyframeResolver?.cancel();
    }
  }
  const Sv = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
  function bv(a) {
    const l = Sv.exec(a);
    if (!l) return [,];
    const [, u, o, c] = l;
    return [`--${u ?? o}`, c];
  }
  function Qf(a, l, u = 1) {
    const [o, c] = bv(a);
    if (!o) return;
    const d = window.getComputedStyle(l).getPropertyValue(o);
    if (d) {
      const h = d.trim();
      return Wc(h) ? parseFloat(h) : h;
    }
    return Tu(c) ? Qf(c, l, u + 1) : c;
  }
  function Ku(a, l) {
    return a?.[l] ?? a?.default ?? a;
  }
  const Kf = new Set([
      "width",
      "height",
      "top",
      "left",
      "right",
      "bottom",
      ...ma,
    ]),
    Tv = { test: (a) => a === "auto", parse: (a) => a },
    kf = (a) => (l) => l.test(a),
    Jf = [ha, at, Ge, mn, hg, fg, Tv],
    Pf = (a) => Jf.find(kf(a));
  function xv(a) {
    return typeof a == "number"
      ? a === 0
      : a !== null
      ? a === "none" || a === "0" || tf(a)
      : !0;
  }
  const Av = new Set(["brightness", "contrast", "saturate", "opacity"]);
  function Ev(a) {
    const [l, u] = a.slice(0, -1).split("(");
    if (l === "drop-shadow") return a;
    const [o] = u.match(xu) || [];
    if (!o) return a;
    const c = u.replace(o, "");
    let d = Av.has(l) ? 1 : 0;
    return o !== u && (d *= 100), l + "(" + d + c + ")";
  }
  const Mv = /\b([a-z-]*)\(.*?\)/gu,
    ku = {
      ...pn,
      getAnimatableNone: (a) => {
        const l = a.match(Mv);
        return l ? l.map(Ev).join(" ") : a;
      },
    },
    Ff = { ...ha, transform: Math.round },
    Ju = {
      borderWidth: at,
      borderTopWidth: at,
      borderRightWidth: at,
      borderBottomWidth: at,
      borderLeftWidth: at,
      borderRadius: at,
      radius: at,
      borderTopLeftRadius: at,
      borderTopRightRadius: at,
      borderBottomRightRadius: at,
      borderBottomLeftRadius: at,
      width: at,
      maxWidth: at,
      height: at,
      maxHeight: at,
      top: at,
      right: at,
      bottom: at,
      left: at,
      padding: at,
      paddingTop: at,
      paddingRight: at,
      paddingBottom: at,
      paddingLeft: at,
      margin: at,
      marginTop: at,
      marginRight: at,
      marginBottom: at,
      marginLeft: at,
      backgroundPositionX: at,
      backgroundPositionY: at,
      ...{
        rotate: mn,
        rotateX: mn,
        rotateY: mn,
        rotateZ: mn,
        scale: Rl,
        scaleX: Rl,
        scaleY: Rl,
        scaleZ: Rl,
        skew: mn,
        skewX: mn,
        skewY: mn,
        distance: at,
        translateX: at,
        translateY: at,
        translateZ: at,
        x: at,
        y: at,
        z: at,
        perspective: at,
        transformPerspective: at,
        opacity: hi,
        originX: vf,
        originY: vf,
        originZ: at,
      },
      zIndex: Ff,
      fillOpacity: hi,
      strokeOpacity: hi,
      numOctaves: Ff,
    },
    Dv = {
      ...Ju,
      color: Ht,
      backgroundColor: Ht,
      outlineColor: Ht,
      fill: Ht,
      stroke: Ht,
      borderColor: Ht,
      borderTopColor: Ht,
      borderRightColor: Ht,
      borderBottomColor: Ht,
      borderLeftColor: Ht,
      filter: ku,
      WebkitFilter: ku,
    },
    $f = (a) => Dv[a];
  function Wf(a, l) {
    let u = $f(a);
    return (
      u !== ku && (u = pn),
      u.getAnimatableNone ? u.getAnimatableNone(l) : void 0
    );
  }
  const Rv = new Set(["auto", "none", "0"]);
  function Cv(a, l, u) {
    let o = 0,
      c;
    for (; o < a.length && !c; ) {
      const d = a[o];
      typeof d == "string" && !Rv.has(d) && pi(d).values.length && (c = a[o]),
        o++;
    }
    if (c && u) for (const d of l) a[d] = Wf(u, c);
  }
  class Ov extends Zu {
    constructor(l, u, o, c, d) {
      super(l, u, o, c, d, !0);
    }
    readKeyframes() {
      const { unresolvedKeyframes: l, element: u, name: o } = this;
      if (!u || !u.current) return;
      super.readKeyframes();
      for (let p = 0; p < l.length; p++) {
        let m = l[p];
        if (typeof m == "string" && ((m = m.trim()), Tu(m))) {
          const v = Qf(m, u.current);
          v !== void 0 && (l[p] = v),
            p === l.length - 1 && (this.finalKeyframe = m);
        }
      }
      if ((this.resolveNoneKeyframes(), !Kf.has(o) || l.length !== 2)) return;
      const [c, d] = l,
        h = Pf(c),
        g = Pf(d);
      if (h !== g)
        if (jf(h) && jf(g))
          for (let p = 0; p < l.length; p++) {
            const m = l[p];
            typeof m == "string" && (l[p] = parseFloat(m));
          }
        else Zn[o] && (this.needsMeasurement = !0);
    }
    resolveNoneKeyframes() {
      const { unresolvedKeyframes: l, name: u } = this,
        o = [];
      for (let c = 0; c < l.length; c++)
        (l[c] === null || xv(l[c])) && o.push(c);
      o.length && Cv(l, o, u);
    }
    measureInitialState() {
      const { element: l, unresolvedKeyframes: u, name: o } = this;
      if (!l || !l.current) return;
      o === "height" && (this.suspendedScrollY = window.pageYOffset),
        (this.measuredOrigin = Zn[o](
          l.measureViewportBox(),
          window.getComputedStyle(l.current)
        )),
        (u[0] = this.measuredOrigin);
      const c = u[u.length - 1];
      c !== void 0 && l.getValue(o, c).jump(c, !1);
    }
    measureEndState() {
      const { element: l, name: u, unresolvedKeyframes: o } = this;
      if (!l || !l.current) return;
      const c = l.getValue(u);
      c && c.jump(this.measuredOrigin, !1);
      const d = o.length - 1,
        h = o[d];
      (o[d] = Zn[u](
        l.measureViewportBox(),
        window.getComputedStyle(l.current)
      )),
        h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h),
        this.removedTransforms?.length &&
          this.removedTransforms.forEach(([g, p]) => {
            l.getValue(g).set(p);
          }),
        this.resolveNoneKeyframes();
    }
  }
  function zv(a, l, u) {
    if (a instanceof EventTarget) return [a];
    if (typeof a == "string") {
      let o = document;
      const c = u?.[a] ?? o.querySelectorAll(a);
      return c ? Array.from(c) : [];
    }
    return Array.from(a);
  }
  const If = (a, l) => (l && typeof a == "number" ? l.transform(a) : a),
    th = 30,
    Vv = (a) => !isNaN(parseFloat(a));
  class _v {
    constructor(l, u = {}) {
      (this.canTrackVelocity = null),
        (this.events = {}),
        (this.updateAndNotify = (o, c = !0) => {
          const d = le.now();
          if (
            (this.updatedAt !== d && this.setPrevFrameValue(),
            (this.prev = this.current),
            this.setCurrent(o),
            this.current !== this.prev &&
              (this.events.change?.notify(this.current), this.dependents))
          )
            for (const h of this.dependents) h.dirty();
          c && this.events.renderRequest?.notify(this.current);
        }),
        (this.hasAnimated = !1),
        this.setCurrent(l),
        (this.owner = u.owner);
    }
    setCurrent(l) {
      (this.current = l),
        (this.updatedAt = le.now()),
        this.canTrackVelocity === null &&
          l !== void 0 &&
          (this.canTrackVelocity = Vv(this.current));
    }
    setPrevFrameValue(l = this.current) {
      (this.prevFrameValue = l), (this.prevUpdatedAt = this.updatedAt);
    }
    onChange(l) {
      return this.on("change", l);
    }
    on(l, u) {
      this.events[l] || (this.events[l] = new yu());
      const o = this.events[l].add(u);
      return l === "change"
        ? () => {
            o(),
              Rt.read(() => {
                this.events.change.getSize() || this.stop();
              });
          }
        : o;
    }
    clearListeners() {
      for (const l in this.events) this.events[l].clear();
    }
    attach(l, u) {
      (this.passiveEffect = l), (this.stopPassiveEffect = u);
    }
    set(l, u = !0) {
      !u || !this.passiveEffect
        ? this.updateAndNotify(l, u)
        : this.passiveEffect(l, this.updateAndNotify);
    }
    setWithVelocity(l, u, o) {
      this.set(u),
        (this.prev = void 0),
        (this.prevFrameValue = l),
        (this.prevUpdatedAt = this.updatedAt - o);
    }
    jump(l, u = !0) {
      this.updateAndNotify(l),
        (this.prev = l),
        (this.prevUpdatedAt = this.prevFrameValue = void 0),
        u && this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect();
    }
    dirty() {
      this.events.change?.notify(this.current);
    }
    addDependent(l) {
      this.dependents || (this.dependents = new Set()), this.dependents.add(l);
    }
    removeDependent(l) {
      this.dependents && this.dependents.delete(l);
    }
    get() {
      return this.current;
    }
    getPrevious() {
      return this.prev;
    }
    getVelocity() {
      const l = le.now();
      if (
        !this.canTrackVelocity ||
        this.prevFrameValue === void 0 ||
        l - this.updatedAt > th
      )
        return 0;
      const u = Math.min(this.updatedAt - this.prevUpdatedAt, th);
      return ef(parseFloat(this.current) - parseFloat(this.prevFrameValue), u);
    }
    start(l) {
      return (
        this.stop(),
        new Promise((u) => {
          (this.hasAnimated = !0),
            (this.animation = l(u)),
            this.events.animationStart && this.events.animationStart.notify();
        }).then(() => {
          this.events.animationComplete &&
            this.events.animationComplete.notify(),
            this.clearAnimation();
        })
      );
    }
    stop() {
      this.animation &&
        (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation();
    }
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
    destroy() {
      this.dependents?.clear(),
        this.events.destroy?.notify(),
        this.clearListeners(),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect();
    }
  }
  function ya(a, l) {
    return new _v(a, l);
  }
  const { schedule: Pu } = pf(queueMicrotask, !1),
    Be = { x: !1, y: !1 };
  function eh() {
    return Be.x || Be.y;
  }
  function Uv(a) {
    return a === "x" || a === "y"
      ? Be[a]
        ? null
        : ((Be[a] = !0),
          () => {
            Be[a] = !1;
          })
      : Be.x || Be.y
      ? null
      : ((Be.x = Be.y = !0),
        () => {
          Be.x = Be.y = !1;
        });
  }
  function nh(a, l) {
    const u = zv(a),
      o = new AbortController(),
      c = { passive: !0, ...l, signal: o.signal };
    return [u, c, () => o.abort()];
  }
  function ah(a) {
    return !(a.pointerType === "touch" || eh());
  }
  function wv(a, l, u = {}) {
    const [o, c, d] = nh(a, u),
      h = (g) => {
        if (!ah(g)) return;
        const { target: p } = g,
          m = l(p, g);
        if (typeof m != "function" || !p) return;
        const v = (T) => {
          ah(T) && (m(T), p.removeEventListener("pointerleave", v));
        };
        p.addEventListener("pointerleave", v, c);
      };
    return (
      o.forEach((g) => {
        g.addEventListener("pointerenter", h, c);
      }),
      d
    );
  }
  const ih = (a, l) => (l ? (a === l ? !0 : ih(a, l.parentElement)) : !1),
    Fu = (a) =>
      a.pointerType === "mouse"
        ? typeof a.button != "number" || a.button <= 0
        : a.isPrimary !== !1,
    jv = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
  function Bv(a) {
    return jv.has(a.tagName) || a.tabIndex !== -1;
  }
  const Vl = new WeakSet();
  function lh(a) {
    return (l) => {
      l.key === "Enter" && a(l);
    };
  }
  function $u(a, l) {
    a.dispatchEvent(
      new PointerEvent("pointer" + l, { isPrimary: !0, bubbles: !0 })
    );
  }
  const Nv = (a, l) => {
    const u = a.currentTarget;
    if (!u) return;
    const o = lh(() => {
      if (Vl.has(u)) return;
      $u(u, "down");
      const c = lh(() => {
          $u(u, "up");
        }),
        d = () => $u(u, "cancel");
      u.addEventListener("keyup", c, l), u.addEventListener("blur", d, l);
    });
    u.addEventListener("keydown", o, l),
      u.addEventListener("blur", () => u.removeEventListener("keydown", o), l);
  };
  function sh(a) {
    return Fu(a) && !eh();
  }
  function Lv(a, l, u = {}) {
    const [o, c, d] = nh(a, u),
      h = (g) => {
        const p = g.currentTarget;
        if (!sh(g)) return;
        Vl.add(p);
        const m = l(p, g),
          v = (V, w) => {
            window.removeEventListener("pointerup", T),
              window.removeEventListener("pointercancel", x),
              Vl.has(p) && Vl.delete(p),
              sh(V) && typeof m == "function" && m(V, { success: w });
          },
          T = (V) => {
            v(
              V,
              p === window ||
                p === document ||
                u.useGlobalTarget ||
                ih(p, V.target)
            );
          },
          x = (V) => {
            v(V, !1);
          };
        window.addEventListener("pointerup", T, c),
          window.addEventListener("pointercancel", x, c);
      };
    return (
      o.forEach((g) => {
        (u.useGlobalTarget ? window : g).addEventListener("pointerdown", h, c),
          Qu(g) &&
            (g.addEventListener("focus", (m) => Nv(m, c)),
            !Bv(g) && !g.hasAttribute("tabindex") && (g.tabIndex = 0));
      }),
      d
    );
  }
  function uh(a) {
    return Ic(a) && "ownerSVGElement" in a;
  }
  function Hv(a) {
    return uh(a) && a.tagName === "svg";
  }
  const It = (a) => !!(a && a.getVelocity),
    qv = [...Jf, Ht, pn],
    Yv = (a) => qv.find(kf(a)),
    Wu = L.createContext({
      transformPagePoint: (a) => a,
      isStatic: !1,
      reducedMotion: "never",
    });
  class Gv extends L.Component {
    getSnapshotBeforeUpdate(l) {
      const u = this.props.childRef.current;
      if (u && l.isPresent && !this.props.isPresent) {
        const o = u.offsetParent,
          c = (Qu(o) && o.offsetWidth) || 0,
          d = this.props.sizeRef.current;
        (d.height = u.offsetHeight || 0),
          (d.width = u.offsetWidth || 0),
          (d.top = u.offsetTop),
          (d.left = u.offsetLeft),
          (d.right = c - d.width - d.left);
      }
      return null;
    }
    componentDidUpdate() {}
    render() {
      return this.props.children;
    }
  }
  function Xv({ children: a, isPresent: l, anchorX: u, root: o }) {
    const c = L.useId(),
      d = L.useRef(null),
      h = L.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0 }),
      { nonce: g } = L.useContext(Wu);
    return (
      L.useInsertionEffect(() => {
        const { width: p, height: m, top: v, left: T, right: x } = h.current;
        if (l || !d.current || !p || !m) return;
        const V = u === "left" ? `left: ${T}` : `right: ${x}`;
        d.current.dataset.motionPopId = c;
        const w = document.createElement("style");
        g && (w.nonce = g);
        const G = o ?? document.head;
        return (
          G.appendChild(w),
          w.sheet &&
            w.sheet.insertRule(`
          [data-motion-pop-id="${c}"] {
            position: absolute !important;
            width: ${p}px !important;
            height: ${m}px !important;
            ${V}px !important;
            top: ${v}px !important;
          }
        `),
          () => {
            G.removeChild(w), G.contains(w) && G.removeChild(w);
          }
        );
      }, [l]),
      B.jsx(Gv, {
        isPresent: l,
        childRef: d,
        sizeRef: h,
        children: L.cloneElement(a, { ref: d }),
      })
    );
  }
  const Zv = ({
    children: a,
    initial: l,
    isPresent: u,
    onExitComplete: o,
    custom: c,
    presenceAffectsLayout: d,
    mode: h,
    anchorX: g,
    root: p,
  }) => {
    const m = cu(Qv),
      v = L.useId();
    let T = !0,
      x = L.useMemo(
        () => (
          (T = !1),
          {
            id: v,
            initial: l,
            isPresent: u,
            custom: c,
            onExitComplete: (V) => {
              m.set(V, !0);
              for (const w of m.values()) if (!w) return;
              o && o();
            },
            register: (V) => (m.set(V, !1), () => m.delete(V)),
          }
        ),
        [u, m, o]
      );
    return (
      d && T && (x = { ...x }),
      L.useMemo(() => {
        m.forEach((V, w) => m.set(w, !1));
      }, [u]),
      L.useEffect(() => {
        !u && !m.size && o && o();
      }, [u]),
      h === "popLayout" &&
        (a = B.jsx(Xv, { isPresent: u, anchorX: g, root: p, children: a })),
      B.jsx(El.Provider, { value: x, children: a })
    );
  };
  function Qv() {
    return new Map();
  }
  function oh(a = !0) {
    const l = L.useContext(El);
    if (l === null) return [!0, null];
    const { isPresent: u, onExitComplete: o, register: c } = l,
      d = L.useId();
    L.useEffect(() => {
      if (a) return c(d);
    }, [a]);
    const h = L.useCallback(() => a && o && o(d), [d, o, a]);
    return !u && o ? [!1, h] : [!0];
  }
  const _l = (a) => a.key || "";
  function rh(a) {
    const l = [];
    return (
      L.Children.forEach(a, (u) => {
        L.isValidElement(u) && l.push(u);
      }),
      l
    );
  }
  const Iu = ({
      children: a,
      custom: l,
      initial: u = !0,
      onExitComplete: o,
      presenceAffectsLayout: c = !0,
      mode: d = "sync",
      propagate: h = !1,
      anchorX: g = "left",
      root: p,
    }) => {
      const [m, v] = oh(h),
        T = L.useMemo(() => rh(a), [a]),
        x = h && !m ? [] : T.map(_l),
        V = L.useRef(!0),
        w = L.useRef(T),
        G = cu(() => new Map()),
        [Q, Z] = L.useState(T),
        [K, Y] = L.useState(T);
      $c(() => {
        (V.current = !1), (w.current = T);
        for (let k = 0; k < K.length; k++) {
          const tt = _l(K[k]);
          x.includes(tt) ? G.delete(tt) : G.get(tt) !== !0 && G.set(tt, !1);
        }
      }, [K, x.length, x.join("-")]);
      const I = [];
      if (T !== Q) {
        let k = [...T];
        for (let tt = 0; tt < K.length; tt++) {
          const F = K[tt],
            ut = _l(F);
          x.includes(ut) || (k.splice(tt, 0, F), I.push(F));
        }
        return d === "wait" && I.length && (k = I), Y(rh(k)), Z(T), null;
      }
      const { forceRender: q } = L.useContext(ru);
      return B.jsx(B.Fragment, {
        children: K.map((k) => {
          const tt = _l(k),
            F = h && !m ? !1 : T === K || x.includes(tt),
            ut = () => {
              if (G.has(tt)) G.set(tt, !0);
              else return;
              let St = !0;
              G.forEach((Et) => {
                Et || (St = !1);
              }),
                St && (q?.(), Y(w.current), h && v?.(), o && o());
            };
          return B.jsx(
            Zv,
            {
              isPresent: F,
              initial: !V.current || u ? void 0 : !1,
              custom: l,
              presenceAffectsLayout: c,
              mode: d,
              root: p,
              onExitComplete: F ? void 0 : ut,
              anchorX: g,
              children: k,
            },
            tt
          );
        }),
      });
    },
    ch = L.createContext({ strict: !1 }),
    fh = {
      animation: [
        "animate",
        "variants",
        "whileHover",
        "whileTap",
        "exit",
        "whileInView",
        "whileFocus",
        "whileDrag",
      ],
      exit: ["exit"],
      drag: ["drag", "dragControls"],
      focus: ["whileFocus"],
      hover: ["whileHover", "onHoverStart", "onHoverEnd"],
      tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
      pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
      inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
      layout: ["layout", "layoutId"],
    },
    ga = {};
  for (const a in fh) ga[a] = { isEnabled: (l) => fh[a].some((u) => !!l[u]) };
  function Kv(a) {
    for (const l in a) ga[l] = { ...ga[l], ...a[l] };
  }
  const kv = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "ignoreStrict",
    "viewport",
  ]);
  function Ul(a) {
    return (
      a.startsWith("while") ||
      (a.startsWith("drag") && a !== "draggable") ||
      a.startsWith("layout") ||
      a.startsWith("onTap") ||
      a.startsWith("onPan") ||
      a.startsWith("onLayout") ||
      kv.has(a)
    );
  }
  let hh = (a) => !Ul(a);
  function Jv(a) {
    typeof a == "function" &&
      (hh = (l) => (l.startsWith("on") ? !Ul(l) : a(l)));
  }
  try {
    Jv(require("@emotion/is-prop-valid").default);
  } catch {}
  function Pv(a, l, u) {
    const o = {};
    for (const c in a)
      (c === "values" && typeof a.values == "object") ||
        ((hh(c) ||
          (u === !0 && Ul(c)) ||
          (!l && !Ul(c)) ||
          (a.draggable && c.startsWith("onDrag"))) &&
          (o[c] = a[c]));
    return o;
  }
  function Fv(a) {
    if (typeof Proxy > "u") return a;
    const l = new Map(),
      u = (...o) => a(...o);
    return new Proxy(u, {
      get: (o, c) =>
        c === "create" ? a : (l.has(c) || l.set(c, a(c)), l.get(c)),
    });
  }
  const wl = L.createContext({});
  function jl(a) {
    return a !== null && typeof a == "object" && typeof a.start == "function";
  }
  function vi(a) {
    return typeof a == "string" || Array.isArray(a);
  }
  const to = [
      "animate",
      "whileInView",
      "whileFocus",
      "whileHover",
      "whileTap",
      "whileDrag",
      "exit",
    ],
    eo = ["initial", ...to];
  function Bl(a) {
    return jl(a.animate) || eo.some((l) => vi(a[l]));
  }
  function dh(a) {
    return !!(Bl(a) || a.variants);
  }
  function $v(a, l) {
    if (Bl(a)) {
      const { initial: u, animate: o } = a;
      return {
        initial: u === !1 || vi(u) ? u : void 0,
        animate: vi(o) ? o : void 0,
      };
    }
    return a.inherit !== !1 ? l : {};
  }
  function Wv(a) {
    const { initial: l, animate: u } = $v(a, L.useContext(wl));
    return L.useMemo(() => ({ initial: l, animate: u }), [mh(l), mh(u)]);
  }
  function mh(a) {
    return Array.isArray(a) ? a.join(" ") : a;
  }
  const Iv = Symbol.for("motionComponentSymbol");
  function va(a) {
    return (
      a &&
      typeof a == "object" &&
      Object.prototype.hasOwnProperty.call(a, "current")
    );
  }
  function t1(a, l, u) {
    return L.useCallback(
      (o) => {
        o && a.onMount && a.onMount(o),
          l && (o ? l.mount(o) : l.unmount()),
          u && (typeof u == "function" ? u(o) : va(u) && (u.current = o));
      },
      [l]
    );
  }
  const no = (a) => a.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
    ph = "data-" + no("framerAppearId"),
    yh = L.createContext({});
  function e1(a, l, u, o, c) {
    const { visualElement: d } = L.useContext(wl),
      h = L.useContext(ch),
      g = L.useContext(El),
      p = L.useContext(Wu).reducedMotion,
      m = L.useRef(null);
    (o = o || h.renderer),
      !m.current &&
        o &&
        (m.current = o(a, {
          visualState: l,
          parent: d,
          props: u,
          presenceContext: g,
          blockInitialAnimation: g ? g.initial === !1 : !1,
          reducedMotionConfig: p,
        }));
    const v = m.current,
      T = L.useContext(yh);
    v &&
      !v.projection &&
      c &&
      (v.type === "html" || v.type === "svg") &&
      n1(m.current, u, c, T);
    const x = L.useRef(!1);
    L.useInsertionEffect(() => {
      v && x.current && v.update(u, g);
    });
    const V = u[ph],
      w = L.useRef(
        !!V &&
          !window.MotionHandoffIsComplete?.(V) &&
          window.MotionHasOptimisedAnimation?.(V)
      );
    return (
      $c(() => {
        v &&
          ((x.current = !0),
          (window.MotionIsMounted = !0),
          v.updateFeatures(),
          Pu.render(v.render),
          w.current && v.animationState && v.animationState.animateChanges());
      }),
      L.useEffect(() => {
        v &&
          (!w.current && v.animationState && v.animationState.animateChanges(),
          w.current &&
            (queueMicrotask(() => {
              window.MotionHandoffMarkAsComplete?.(V);
            }),
            (w.current = !1)));
      }),
      v
    );
  }
  function n1(a, l, u, o) {
    const {
      layoutId: c,
      layout: d,
      drag: h,
      dragConstraints: g,
      layoutScroll: p,
      layoutRoot: m,
      layoutCrossfade: v,
    } = l;
    (a.projection = new u(
      a.latestValues,
      l["data-framer-portal-id"] ? void 0 : gh(a.parent)
    )),
      a.projection.setOptions({
        layoutId: c,
        layout: d,
        alwaysMeasureLayout: !!h || (g && va(g)),
        visualElement: a,
        animationType: typeof d == "string" ? d : "both",
        initialPromotionConfig: o,
        crossfade: v,
        layoutScroll: p,
        layoutRoot: m,
      });
  }
  function gh(a) {
    if (a)
      return a.options.allowProjection !== !1 ? a.projection : gh(a.parent);
  }
  function a1({
    preloadedFeatures: a,
    createVisualElement: l,
    useRender: u,
    useVisualState: o,
    Component: c,
  }) {
    a && Kv(a);
    function d(g, p) {
      let m;
      const v = { ...L.useContext(Wu), ...g, layoutId: i1(g) },
        { isStatic: T } = v,
        x = Wv(g),
        V = o(g, T);
      if (!T && fu) {
        l1();
        const w = s1(v);
        (m = w.MeasureLayout),
          (x.visualElement = e1(c, V, v, l, w.ProjectionNode));
      }
      return B.jsxs(wl.Provider, {
        value: x,
        children: [
          m && x.visualElement
            ? B.jsx(m, { visualElement: x.visualElement, ...v })
            : null,
          u(c, g, t1(V, x.visualElement, p), V, T, x.visualElement),
        ],
      });
    }
    d.displayName = `motion.${
      typeof c == "string" ? c : `create(${c.displayName ?? c.name ?? ""})`
    }`;
    const h = L.forwardRef(d);
    return (h[Iv] = c), h;
  }
  function i1({ layoutId: a }) {
    const l = L.useContext(ru).id;
    return l && a !== void 0 ? l + "-" + a : a;
  }
  function l1(a, l) {
    L.useContext(ch).strict;
  }
  function s1(a) {
    const { drag: l, layout: u } = ga;
    if (!l && !u) return {};
    const o = { ...l, ...u };
    return {
      MeasureLayout:
        l?.isEnabled(a) || u?.isEnabled(a) ? o.MeasureLayout : void 0,
      ProjectionNode: o.ProjectionNode,
    };
  }
  const Si = {};
  function u1(a) {
    for (const l in a) (Si[l] = a[l]), bu(l) && (Si[l].isCSSVariable = !0);
  }
  function vh(a, { layout: l, layoutId: u }) {
    return (
      pa.has(a) ||
      a.startsWith("origin") ||
      ((l || u !== void 0) && (!!Si[a] || a === "opacity"))
    );
  }
  const o1 = {
      x: "translateX",
      y: "translateY",
      z: "translateZ",
      transformPerspective: "perspective",
    },
    r1 = ma.length;
  function c1(a, l, u) {
    let o = "",
      c = !0;
    for (let d = 0; d < r1; d++) {
      const h = ma[d],
        g = a[h];
      if (g === void 0) continue;
      let p = !0;
      if (
        (typeof g == "number"
          ? (p = g === (h.startsWith("scale") ? 1 : 0))
          : (p = parseFloat(g) === 0),
        !p || u)
      ) {
        const m = If(g, Ju[h]);
        if (!p) {
          c = !1;
          const v = o1[h] || h;
          o += `${v}(${m}) `;
        }
        u && (l[h] = m);
      }
    }
    return (o = o.trim()), u ? (o = u(l, c ? "" : o)) : c && (o = "none"), o;
  }
  function ao(a, l, u) {
    const { style: o, vars: c, transformOrigin: d } = a;
    let h = !1,
      g = !1;
    for (const p in l) {
      const m = l[p];
      if (pa.has(p)) {
        h = !0;
        continue;
      } else if (bu(p)) {
        c[p] = m;
        continue;
      } else {
        const v = If(m, Ju[p]);
        p.startsWith("origin") ? ((g = !0), (d[p] = v)) : (o[p] = v);
      }
    }
    if (
      (l.transform ||
        (h || u
          ? (o.transform = c1(l, a.transform, u))
          : o.transform && (o.transform = "none")),
      g)
    ) {
      const { originX: p = "50%", originY: m = "50%", originZ: v = 0 } = d;
      o.transformOrigin = `${p} ${m} ${v}`;
    }
  }
  const io = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {},
  });
  function Sh(a, l, u) {
    for (const o in l) !It(l[o]) && !vh(o, u) && (a[o] = l[o]);
  }
  function f1({ transformTemplate: a }, l) {
    return L.useMemo(() => {
      const u = io();
      return ao(u, l, a), Object.assign({}, u.vars, u.style);
    }, [l]);
  }
  function h1(a, l) {
    const u = a.style || {},
      o = {};
    return Sh(o, u, a), Object.assign(o, f1(a, l)), o;
  }
  function d1(a, l) {
    const u = {},
      o = h1(a, l);
    return (
      a.drag &&
        a.dragListener !== !1 &&
        ((u.draggable = !1),
        (o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = "none"),
        (o.touchAction =
          a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`)),
      a.tabIndex === void 0 &&
        (a.onTap || a.onTapStart || a.whileTap) &&
        (u.tabIndex = 0),
      (u.style = o),
      u
    );
  }
  const m1 = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
    p1 = { offset: "strokeDashoffset", array: "strokeDasharray" };
  function y1(a, l, u = 1, o = 0, c = !0) {
    a.pathLength = 1;
    const d = c ? m1 : p1;
    a[d.offset] = at.transform(-o);
    const h = at.transform(l),
      g = at.transform(u);
    a[d.array] = `${h} ${g}`;
  }
  function bh(
    a,
    {
      attrX: l,
      attrY: u,
      attrScale: o,
      pathLength: c,
      pathSpacing: d = 1,
      pathOffset: h = 0,
      ...g
    },
    p,
    m,
    v
  ) {
    if ((ao(a, g, m), p)) {
      a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
      return;
    }
    (a.attrs = a.style), (a.style = {});
    const { attrs: T, style: x } = a;
    T.transform && ((x.transform = T.transform), delete T.transform),
      (x.transform || T.transformOrigin) &&
        ((x.transformOrigin = T.transformOrigin ?? "50% 50%"),
        delete T.transformOrigin),
      x.transform &&
        ((x.transformBox = v?.transformBox ?? "fill-box"),
        delete T.transformBox),
      l !== void 0 && (T.x = l),
      u !== void 0 && (T.y = u),
      o !== void 0 && (T.scale = o),
      c !== void 0 && y1(T, c, d, h, !1);
  }
  const Th = () => ({ ...io(), attrs: {} }),
    xh = (a) => typeof a == "string" && a.toLowerCase() === "svg";
  function g1(a, l, u, o) {
    const c = L.useMemo(() => {
      const d = Th();
      return (
        bh(d, l, xh(o), a.transformTemplate, a.style),
        { ...d.attrs, style: { ...d.style } }
      );
    }, [l]);
    if (a.style) {
      const d = {};
      Sh(d, a.style, a), (c.style = { ...d, ...c.style });
    }
    return c;
  }
  const v1 = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "switch",
    "symbol",
    "svg",
    "text",
    "tspan",
    "use",
    "view",
  ];
  function lo(a) {
    return typeof a != "string" || a.includes("-")
      ? !1
      : !!(v1.indexOf(a) > -1 || /[A-Z]/u.test(a));
  }
  function S1(a = !1) {
    return (u, o, c, { latestValues: d }, h) => {
      const p = (lo(u) ? g1 : d1)(o, d, h, u),
        m = Pv(o, typeof u == "string", a),
        v = u !== L.Fragment ? { ...m, ...p, ref: c } : {},
        { children: T } = o,
        x = L.useMemo(() => (It(T) ? T.get() : T), [T]);
      return L.createElement(u, { ...v, children: x });
    };
  }
  function Ah(a) {
    const l = [{}, {}];
    return (
      a?.values.forEach((u, o) => {
        (l[0][o] = u.get()), (l[1][o] = u.getVelocity());
      }),
      l
    );
  }
  function so(a, l, u, o) {
    if (typeof l == "function") {
      const [c, d] = Ah(o);
      l = l(u !== void 0 ? u : a.custom, c, d);
    }
    if (
      (typeof l == "string" && (l = a.variants && a.variants[l]),
      typeof l == "function")
    ) {
      const [c, d] = Ah(o);
      l = l(u !== void 0 ? u : a.custom, c, d);
    }
    return l;
  }
  function Nl(a) {
    return It(a) ? a.get() : a;
  }
  function b1(
    { scrapeMotionValuesFromProps: a, createRenderState: l },
    u,
    o,
    c
  ) {
    return { latestValues: T1(u, o, c, a), renderState: l() };
  }
  const Eh = (a) => (l, u) => {
    const o = L.useContext(wl),
      c = L.useContext(El),
      d = () => b1(a, l, o, c);
    return u ? d() : cu(d);
  };
  function T1(a, l, u, o) {
    const c = {},
      d = o(a, {});
    for (const x in d) c[x] = Nl(d[x]);
    let { initial: h, animate: g } = a;
    const p = Bl(a),
      m = dh(a);
    l &&
      m &&
      !p &&
      a.inherit !== !1 &&
      (h === void 0 && (h = l.initial), g === void 0 && (g = l.animate));
    let v = u ? u.initial === !1 : !1;
    v = v || h === !1;
    const T = v ? g : h;
    if (T && typeof T != "boolean" && !jl(T)) {
      const x = Array.isArray(T) ? T : [T];
      for (let V = 0; V < x.length; V++) {
        const w = so(a, x[V]);
        if (w) {
          const { transitionEnd: G, transition: Q, ...Z } = w;
          for (const K in Z) {
            let Y = Z[K];
            if (Array.isArray(Y)) {
              const I = v ? Y.length - 1 : 0;
              Y = Y[I];
            }
            Y !== null && (c[K] = Y);
          }
          for (const K in G) c[K] = G[K];
        }
      }
    }
    return c;
  }
  function uo(a, l, u) {
    const { style: o } = a,
      c = {};
    for (const d in o)
      (It(o[d]) ||
        (l.style && It(l.style[d])) ||
        vh(d, a) ||
        u?.getValue(d)?.liveStyle !== void 0) &&
        (c[d] = o[d]);
    return c;
  }
  const x1 = {
    useVisualState: Eh({
      scrapeMotionValuesFromProps: uo,
      createRenderState: io,
    }),
  };
  function Mh(a, l, u) {
    const o = uo(a, l, u);
    for (const c in a)
      if (It(a[c]) || It(l[c])) {
        const d =
          ma.indexOf(c) !== -1
            ? "attr" + c.charAt(0).toUpperCase() + c.substring(1)
            : c;
        o[d] = a[c];
      }
    return o;
  }
  const A1 = {
    useVisualState: Eh({
      scrapeMotionValuesFromProps: Mh,
      createRenderState: Th,
    }),
  };
  function E1(a, l) {
    return function (
      o,
      { forwardMotionProps: c } = { forwardMotionProps: !1 }
    ) {
      const h = {
        ...(lo(o) ? A1 : x1),
        preloadedFeatures: a,
        useRender: S1(c),
        createVisualElement: l,
        Component: o,
      };
      return a1(h);
    };
  }
  function bi(a, l, u) {
    const o = a.getProps();
    return so(o, l, u !== void 0 ? u : o.custom, a);
  }
  const oo = (a) => Array.isArray(a);
  function M1(a, l, u) {
    a.hasValue(l) ? a.getValue(l).set(u) : a.addValue(l, ya(u));
  }
  function D1(a) {
    return oo(a) ? a[a.length - 1] || 0 : a;
  }
  function R1(a, l) {
    const u = bi(a, l);
    let { transitionEnd: o = {}, transition: c = {}, ...d } = u || {};
    d = { ...d, ...o };
    for (const h in d) {
      const g = D1(d[h]);
      M1(a, h, g);
    }
  }
  function C1(a) {
    return !!(It(a) && a.add);
  }
  function ro(a, l) {
    const u = a.getValue("willChange");
    if (C1(u)) return u.add(l);
    if (!u && Fe.WillChange) {
      const o = new Fe.WillChange("auto");
      a.addValue("willChange", o), o.add(l);
    }
  }
  function Dh(a) {
    return a.props[ph];
  }
  const O1 = (a) => a !== null;
  function z1(a, { repeat: l, repeatType: u = "loop" }, o) {
    const c = a.filter(O1),
      d = l && u !== "loop" && l % 2 === 1 ? 0 : c.length - 1;
    return c[d];
  }
  const V1 = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
    _1 = (a) => ({
      type: "spring",
      stiffness: 550,
      damping: a === 0 ? 2 * Math.sqrt(550) : 30,
      restSpeed: 10,
    }),
    U1 = { type: "keyframes", duration: 0.8 },
    w1 = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
    j1 = (a, { keyframes: l }) =>
      l.length > 2
        ? U1
        : pa.has(a)
        ? a.startsWith("scale")
          ? _1(l[1])
          : V1
        : w1;
  function B1({
    when: a,
    delay: l,
    delayChildren: u,
    staggerChildren: o,
    staggerDirection: c,
    repeat: d,
    repeatType: h,
    repeatDelay: g,
    from: p,
    elapsed: m,
    ...v
  }) {
    return !!Object.keys(v).length;
  }
  const co =
    (a, l, u, o = {}, c, d) =>
    (h) => {
      const g = Ku(o, a) || {},
        p = g.delay || o.delay || 0;
      let { elapsed: m = 0 } = o;
      m = m - qe(p);
      const v = {
        keyframes: Array.isArray(u) ? u : [null, u],
        ease: "easeOut",
        velocity: l.getVelocity(),
        ...g,
        delay: -m,
        onUpdate: (x) => {
          l.set(x), g.onUpdate && g.onUpdate(x);
        },
        onComplete: () => {
          h(), g.onComplete && g.onComplete();
        },
        name: a,
        motionValue: l,
        element: d ? void 0 : c,
      };
      B1(g) || Object.assign(v, j1(a, v)),
        v.duration && (v.duration = qe(v.duration)),
        v.repeatDelay && (v.repeatDelay = qe(v.repeatDelay)),
        v.from !== void 0 && (v.keyframes[0] = v.from);
      let T = !1;
      if (
        ((v.type === !1 || (v.duration === 0 && !v.repeatDelay)) &&
          ((v.duration = 0), v.delay === 0 && (T = !0)),
        (Fe.instantAnimations || Fe.skipAnimations) &&
          ((T = !0), (v.duration = 0), (v.delay = 0)),
        (v.allowFlatten = !g.type && !g.ease),
        T && !d && l.get() !== void 0)
      ) {
        const x = z1(v.keyframes, g);
        if (x !== void 0) {
          Rt.update(() => {
            v.onUpdate(x), v.onComplete();
          });
          return;
        }
      }
      return g.isSync ? new Bu(v) : new vv(v);
    };
  function N1({ protectedKeys: a, needsAnimating: l }, u) {
    const o = a.hasOwnProperty(u) && l[u] !== !0;
    return (l[u] = !1), o;
  }
  function Rh(a, l, { delay: u = 0, transitionOverride: o, type: c } = {}) {
    let {
      transition: d = a.getDefaultTransition(),
      transitionEnd: h,
      ...g
    } = l;
    o && (d = o);
    const p = [],
      m = c && a.animationState && a.animationState.getState()[c];
    for (const v in g) {
      const T = a.getValue(v, a.latestValues[v] ?? null),
        x = g[v];
      if (x === void 0 || (m && N1(m, v))) continue;
      const V = { delay: u, ...Ku(d || {}, v) },
        w = T.get();
      if (
        w !== void 0 &&
        !T.isAnimating &&
        !Array.isArray(x) &&
        x === w &&
        !V.velocity
      )
        continue;
      let G = !1;
      if (window.MotionHandoffAnimation) {
        const Z = Dh(a);
        if (Z) {
          const K = window.MotionHandoffAnimation(Z, v, Rt);
          K !== null && ((V.startTime = K), (G = !0));
        }
      }
      ro(a, v),
        T.start(
          co(
            v,
            T,
            x,
            a.shouldReduceMotion && Kf.has(v) ? { type: !1 } : V,
            a,
            G
          )
        );
      const Q = T.animation;
      Q && p.push(Q);
    }
    return (
      h &&
        Promise.all(p).then(() => {
          Rt.update(() => {
            h && R1(a, h);
          });
        }),
      p
    );
  }
  function fo(a, l, u = {}) {
    const o = bi(a, l, u.type === "exit" ? a.presenceContext?.custom : void 0);
    let { transition: c = a.getDefaultTransition() || {} } = o || {};
    u.transitionOverride && (c = u.transitionOverride);
    const d = o ? () => Promise.all(Rh(a, o, u)) : () => Promise.resolve(),
      h =
        a.variantChildren && a.variantChildren.size
          ? (p = 0) => {
              const {
                delayChildren: m = 0,
                staggerChildren: v,
                staggerDirection: T,
              } = c;
              return L1(a, l, p, m, v, T, u);
            }
          : () => Promise.resolve(),
      { when: g } = c;
    if (g) {
      const [p, m] = g === "beforeChildren" ? [d, h] : [h, d];
      return p().then(() => m());
    } else return Promise.all([d(), h(u.delay)]);
  }
  function L1(a, l, u = 0, o = 0, c = 0, d = 1, h) {
    const g = [],
      p = a.variantChildren.size,
      m = (p - 1) * c,
      v = typeof o == "function",
      T = v
        ? (x) => o(x, p)
        : d === 1
        ? (x = 0) => x * c
        : (x = 0) => m - x * c;
    return (
      Array.from(a.variantChildren)
        .sort(H1)
        .forEach((x, V) => {
          x.notify("AnimationStart", l),
            g.push(
              fo(x, l, { ...h, delay: u + (v ? 0 : o) + T(V) }).then(() =>
                x.notify("AnimationComplete", l)
              )
            );
        }),
      Promise.all(g)
    );
  }
  function H1(a, l) {
    return a.sortNodePosition(l);
  }
  function q1(a, l, u = {}) {
    a.notify("AnimationStart", l);
    let o;
    if (Array.isArray(l)) {
      const c = l.map((d) => fo(a, d, u));
      o = Promise.all(c);
    } else if (typeof l == "string") o = fo(a, l, u);
    else {
      const c = typeof l == "function" ? bi(a, l, u.custom) : l;
      o = Promise.all(Rh(a, c, u));
    }
    return o.then(() => {
      a.notify("AnimationComplete", l);
    });
  }
  function Ch(a, l) {
    if (!Array.isArray(l)) return !1;
    const u = l.length;
    if (u !== a.length) return !1;
    for (let o = 0; o < u; o++) if (l[o] !== a[o]) return !1;
    return !0;
  }
  const Y1 = eo.length;
  function Oh(a) {
    if (!a) return;
    if (!a.isControllingVariants) {
      const u = a.parent ? Oh(a.parent) || {} : {};
      return a.props.initial !== void 0 && (u.initial = a.props.initial), u;
    }
    const l = {};
    for (let u = 0; u < Y1; u++) {
      const o = eo[u],
        c = a.props[o];
      (vi(c) || c === !1) && (l[o] = c);
    }
    return l;
  }
  const G1 = [...to].reverse(),
    X1 = to.length;
  function Z1(a) {
    return (l) =>
      Promise.all(l.map(({ animation: u, options: o }) => q1(a, u, o)));
  }
  function Q1(a) {
    let l = Z1(a),
      u = zh(),
      o = !0;
    const c = (p) => (m, v) => {
      const T = bi(a, v, p === "exit" ? a.presenceContext?.custom : void 0);
      if (T) {
        const { transition: x, transitionEnd: V, ...w } = T;
        m = { ...m, ...w, ...V };
      }
      return m;
    };
    function d(p) {
      l = p(a);
    }
    function h(p) {
      const { props: m } = a,
        v = Oh(a.parent) || {},
        T = [],
        x = new Set();
      let V = {},
        w = 1 / 0;
      for (let Q = 0; Q < X1; Q++) {
        const Z = G1[Q],
          K = u[Z],
          Y = m[Z] !== void 0 ? m[Z] : v[Z],
          I = vi(Y),
          q = Z === p ? K.isActive : null;
        q === !1 && (w = Q);
        let k = Y === v[Z] && Y !== m[Z] && I;
        if (
          (k && o && a.manuallyAnimateOnMount && (k = !1),
          (K.protectedKeys = { ...V }),
          (!K.isActive && q === null) ||
            (!Y && !K.prevProp) ||
            jl(Y) ||
            typeof Y == "boolean")
        )
          continue;
        const tt = K1(K.prevProp, Y);
        let F = tt || (Z === p && K.isActive && !k && I) || (Q > w && I),
          ut = !1;
        const St = Array.isArray(Y) ? Y : [Y];
        let Et = St.reduce(c(Z), {});
        q === !1 && (Et = {});
        const { prevResolvedValues: Ct = {} } = K,
          De = { ...Ct, ...Et },
          ue = (N) => {
            (F = !0),
              x.has(N) && ((ut = !0), x.delete(N)),
              (K.needsAnimating[N] = !0);
            const J = a.getValue(N);
            J && (J.liveStyle = !1);
          };
        for (const N in De) {
          const J = Et[N],
            ot = Ct[N];
          if (V.hasOwnProperty(N)) continue;
          let S = !1;
          oo(J) && oo(ot) ? (S = !Ch(J, ot)) : (S = J !== ot),
            S
              ? J != null
                ? ue(N)
                : x.add(N)
              : J !== void 0 && x.has(N)
              ? ue(N)
              : (K.protectedKeys[N] = !0);
        }
        (K.prevProp = Y),
          (K.prevResolvedValues = Et),
          K.isActive && (V = { ...V, ...Et }),
          o && a.blockInitialAnimation && (F = !1),
          F &&
            (!(k && tt) || ut) &&
            T.push(...St.map((N) => ({ animation: N, options: { type: Z } })));
      }
      if (x.size) {
        const Q = {};
        if (typeof m.initial != "boolean") {
          const Z = bi(a, Array.isArray(m.initial) ? m.initial[0] : m.initial);
          Z && Z.transition && (Q.transition = Z.transition);
        }
        x.forEach((Z) => {
          const K = a.getBaseTarget(Z),
            Y = a.getValue(Z);
          Y && (Y.liveStyle = !0), (Q[Z] = K ?? null);
        }),
          T.push({ animation: Q });
      }
      let G = !!T.length;
      return (
        o &&
          (m.initial === !1 || m.initial === m.animate) &&
          !a.manuallyAnimateOnMount &&
          (G = !1),
        (o = !1),
        G ? l(T) : Promise.resolve()
      );
    }
    function g(p, m) {
      if (u[p].isActive === m) return Promise.resolve();
      a.variantChildren?.forEach((T) => T.animationState?.setActive(p, m)),
        (u[p].isActive = m);
      const v = h(p);
      for (const T in u) u[T].protectedKeys = {};
      return v;
    }
    return {
      animateChanges: h,
      setActive: g,
      setAnimateFunction: d,
      getState: () => u,
      reset: () => {
        (u = zh()), (o = !0);
      },
    };
  }
  function K1(a, l) {
    return typeof l == "string" ? l !== a : Array.isArray(l) ? !Ch(l, a) : !1;
  }
  function Kn(a = !1) {
    return {
      isActive: a,
      protectedKeys: {},
      needsAnimating: {},
      prevResolvedValues: {},
    };
  }
  function zh() {
    return {
      animate: Kn(!0),
      whileInView: Kn(),
      whileHover: Kn(),
      whileTap: Kn(),
      whileDrag: Kn(),
      whileFocus: Kn(),
      exit: Kn(),
    };
  }
  class yn {
    constructor(l) {
      (this.isMounted = !1), (this.node = l);
    }
    update() {}
  }
  class k1 extends yn {
    constructor(l) {
      super(l), l.animationState || (l.animationState = Q1(l));
    }
    updateAnimationControlsSubscription() {
      const { animate: l } = this.node.getProps();
      jl(l) && (this.unmountControls = l.subscribe(this.node));
    }
    mount() {
      this.updateAnimationControlsSubscription();
    }
    update() {
      const { animate: l } = this.node.getProps(),
        { animate: u } = this.node.prevProps || {};
      l !== u && this.updateAnimationControlsSubscription();
    }
    unmount() {
      this.node.animationState.reset(), this.unmountControls?.();
    }
  }
  let J1 = 0;
  class P1 extends yn {
    constructor() {
      super(...arguments), (this.id = J1++);
    }
    update() {
      if (!this.node.presenceContext) return;
      const { isPresent: l, onExitComplete: u } = this.node.presenceContext,
        { isPresent: o } = this.node.prevPresenceContext || {};
      if (!this.node.animationState || l === o) return;
      const c = this.node.animationState.setActive("exit", !l);
      u &&
        !l &&
        c.then(() => {
          u(this.id);
        });
    }
    mount() {
      const { register: l, onExitComplete: u } =
        this.node.presenceContext || {};
      u && u(this.id), l && (this.unmount = l(this.id));
    }
    unmount() {}
  }
  const F1 = { animation: { Feature: k1 }, exit: { Feature: P1 } };
  function Ti(a, l, u, o = { passive: !0 }) {
    return a.addEventListener(l, u, o), () => a.removeEventListener(l, u);
  }
  function xi(a) {
    return { point: { x: a.pageX, y: a.pageY } };
  }
  const $1 = (a) => (l) => Fu(l) && a(l, xi(l));
  function Ai(a, l, u, o) {
    return Ti(a, l, $1(u), o);
  }
  function Vh({ top: a, left: l, right: u, bottom: o }) {
    return { x: { min: l, max: u }, y: { min: a, max: o } };
  }
  function W1({ x: a, y: l }) {
    return { top: l.min, right: a.max, bottom: l.max, left: a.min };
  }
  function I1(a, l) {
    if (!l) return a;
    const u = l({ x: a.left, y: a.top }),
      o = l({ x: a.right, y: a.bottom });
    return { top: u.y, left: u.x, bottom: o.y, right: o.x };
  }
  const _h = 1e-4,
    tS = 1 - _h,
    eS = 1 + _h,
    Uh = 0.01,
    nS = 0 - Uh,
    aS = 0 + Uh;
  function ae(a) {
    return a.max - a.min;
  }
  function iS(a, l, u) {
    return Math.abs(a - l) <= u;
  }
  function wh(a, l, u, o = 0.5) {
    (a.origin = o),
      (a.originPoint = Vt(l.min, l.max, a.origin)),
      (a.scale = ae(u) / ae(l)),
      (a.translate = Vt(u.min, u.max, a.origin) - a.originPoint),
      ((a.scale >= tS && a.scale <= eS) || isNaN(a.scale)) && (a.scale = 1),
      ((a.translate >= nS && a.translate <= aS) || isNaN(a.translate)) &&
        (a.translate = 0);
  }
  function Ei(a, l, u, o) {
    wh(a.x, l.x, u.x, o ? o.originX : void 0),
      wh(a.y, l.y, u.y, o ? o.originY : void 0);
  }
  function jh(a, l, u) {
    (a.min = u.min + l.min), (a.max = a.min + ae(l));
  }
  function lS(a, l, u) {
    jh(a.x, l.x, u.x), jh(a.y, l.y, u.y);
  }
  function Bh(a, l, u) {
    (a.min = l.min - u.min), (a.max = a.min + ae(l));
  }
  function Mi(a, l, u) {
    Bh(a.x, l.x, u.x), Bh(a.y, l.y, u.y);
  }
  const Nh = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
    Sa = () => ({ x: Nh(), y: Nh() }),
    Lh = () => ({ min: 0, max: 0 }),
    Bt = () => ({ x: Lh(), y: Lh() });
  function Ee(a) {
    return [a("x"), a("y")];
  }
  function ho(a) {
    return a === void 0 || a === 1;
  }
  function mo({ scale: a, scaleX: l, scaleY: u }) {
    return !ho(a) || !ho(l) || !ho(u);
  }
  function kn(a) {
    return (
      mo(a) ||
      Hh(a) ||
      a.z ||
      a.rotate ||
      a.rotateX ||
      a.rotateY ||
      a.skewX ||
      a.skewY
    );
  }
  function Hh(a) {
    return qh(a.x) || qh(a.y);
  }
  function qh(a) {
    return a && a !== "0%";
  }
  function Ll(a, l, u) {
    const o = a - u,
      c = l * o;
    return u + c;
  }
  function Yh(a, l, u, o, c) {
    return c !== void 0 && (a = Ll(a, c, o)), Ll(a, u, o) + l;
  }
  function po(a, l = 0, u = 1, o, c) {
    (a.min = Yh(a.min, l, u, o, c)), (a.max = Yh(a.max, l, u, o, c));
  }
  function Gh(a, { x: l, y: u }) {
    po(a.x, l.translate, l.scale, l.originPoint),
      po(a.y, u.translate, u.scale, u.originPoint);
  }
  const Xh = 0.999999999999,
    Zh = 1.0000000000001;
  function sS(a, l, u, o = !1) {
    const c = u.length;
    if (!c) return;
    l.x = l.y = 1;
    let d, h;
    for (let g = 0; g < c; g++) {
      (d = u[g]), (h = d.projectionDelta);
      const { visualElement: p } = d.options;
      (p && p.props.style && p.props.style.display === "contents") ||
        (o &&
          d.options.layoutScroll &&
          d.scroll &&
          d !== d.root &&
          Ta(a, { x: -d.scroll.offset.x, y: -d.scroll.offset.y }),
        h && ((l.x *= h.x.scale), (l.y *= h.y.scale), Gh(a, h)),
        o && kn(d.latestValues) && Ta(a, d.latestValues));
    }
    l.x < Zh && l.x > Xh && (l.x = 1), l.y < Zh && l.y > Xh && (l.y = 1);
  }
  function ba(a, l) {
    (a.min = a.min + l), (a.max = a.max + l);
  }
  function Qh(a, l, u, o, c = 0.5) {
    const d = Vt(a.min, a.max, c);
    po(a, l, u, d, o);
  }
  function Ta(a, l) {
    Qh(a.x, l.x, l.scaleX, l.scale, l.originX),
      Qh(a.y, l.y, l.scaleY, l.scale, l.originY);
  }
  function Kh(a, l) {
    return Vh(I1(a.getBoundingClientRect(), l));
  }
  function uS(a, l, u) {
    const o = Kh(a, u),
      { scroll: c } = l;
    return c && (ba(o.x, c.offset.x), ba(o.y, c.offset.y)), o;
  }
  const kh = ({ current: a }) => (a ? a.ownerDocument.defaultView : null),
    Jh = (a, l) => Math.abs(a - l);
  function oS(a, l) {
    const u = Jh(a.x, l.x),
      o = Jh(a.y, l.y);
    return Math.sqrt(u ** 2 + o ** 2);
  }
  class Ph {
    constructor(
      l,
      u,
      {
        transformPagePoint: o,
        contextWindow: c = window,
        dragSnapToOrigin: d = !1,
        distanceThreshold: h = 3,
      } = {}
    ) {
      if (
        ((this.startEvent = null),
        (this.lastMoveEvent = null),
        (this.lastMoveEventInfo = null),
        (this.handlers = {}),
        (this.contextWindow = window),
        (this.updatePoint = () => {
          if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
          const x = go(this.lastMoveEventInfo, this.history),
            V = this.startEvent !== null,
            w = oS(x.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
          if (!V && !w) return;
          const { point: G } = x,
            { timestamp: Q } = Jt;
          this.history.push({ ...G, timestamp: Q });
          const { onStart: Z, onMove: K } = this.handlers;
          V ||
            (Z && Z(this.lastMoveEvent, x),
            (this.startEvent = this.lastMoveEvent)),
            K && K(this.lastMoveEvent, x);
        }),
        (this.handlePointerMove = (x, V) => {
          (this.lastMoveEvent = x),
            (this.lastMoveEventInfo = yo(V, this.transformPagePoint)),
            Rt.update(this.updatePoint, !0);
        }),
        (this.handlePointerUp = (x, V) => {
          this.end();
          const {
            onEnd: w,
            onSessionEnd: G,
            resumeAnimation: Q,
          } = this.handlers;
          if (
            (this.dragSnapToOrigin && Q && Q(),
            !(this.lastMoveEvent && this.lastMoveEventInfo))
          )
            return;
          const Z = go(
            x.type === "pointercancel"
              ? this.lastMoveEventInfo
              : yo(V, this.transformPagePoint),
            this.history
          );
          this.startEvent && w && w(x, Z), G && G(x, Z);
        }),
        !Fu(l))
      )
        return;
      (this.dragSnapToOrigin = d),
        (this.handlers = u),
        (this.transformPagePoint = o),
        (this.distanceThreshold = h),
        (this.contextWindow = c || window);
      const g = xi(l),
        p = yo(g, this.transformPagePoint),
        { point: m } = p,
        { timestamp: v } = Jt;
      this.history = [{ ...m, timestamp: v }];
      const { onSessionStart: T } = u;
      T && T(l, go(p, this.history)),
        (this.removeListeners = ri(
          Ai(this.contextWindow, "pointermove", this.handlePointerMove),
          Ai(this.contextWindow, "pointerup", this.handlePointerUp),
          Ai(this.contextWindow, "pointercancel", this.handlePointerUp)
        ));
    }
    updateHandlers(l) {
      this.handlers = l;
    }
    end() {
      this.removeListeners && this.removeListeners(), dn(this.updatePoint);
    }
  }
  function yo(a, l) {
    return l ? { point: l(a.point) } : a;
  }
  function Fh(a, l) {
    return { x: a.x - l.x, y: a.y - l.y };
  }
  function go({ point: a }, l) {
    return {
      point: a,
      delta: Fh(a, $h(l)),
      offset: Fh(a, rS(l)),
      velocity: cS(l, 0.1),
    };
  }
  function rS(a) {
    return a[0];
  }
  function $h(a) {
    return a[a.length - 1];
  }
  function cS(a, l) {
    if (a.length < 2) return { x: 0, y: 0 };
    let u = a.length - 1,
      o = null;
    const c = $h(a);
    for (; u >= 0 && ((o = a[u]), !(c.timestamp - o.timestamp > qe(l))); ) u--;
    if (!o) return { x: 0, y: 0 };
    const d = Ye(c.timestamp - o.timestamp);
    if (d === 0) return { x: 0, y: 0 };
    const h = { x: (c.x - o.x) / d, y: (c.y - o.y) / d };
    return h.x === 1 / 0 && (h.x = 0), h.y === 1 / 0 && (h.y = 0), h;
  }
  function fS(a, { min: l, max: u }, o) {
    return (
      l !== void 0 && a < l
        ? (a = o ? Vt(l, a, o.min) : Math.max(a, l))
        : u !== void 0 && a > u && (a = o ? Vt(u, a, o.max) : Math.min(a, u)),
      a
    );
  }
  function Wh(a, l, u) {
    return {
      min: l !== void 0 ? a.min + l : void 0,
      max: u !== void 0 ? a.max + u - (a.max - a.min) : void 0,
    };
  }
  function hS(a, { top: l, left: u, bottom: o, right: c }) {
    return { x: Wh(a.x, u, c), y: Wh(a.y, l, o) };
  }
  function Ih(a, l) {
    let u = l.min - a.min,
      o = l.max - a.max;
    return (
      l.max - l.min < a.max - a.min && ([u, o] = [o, u]), { min: u, max: o }
    );
  }
  function dS(a, l) {
    return { x: Ih(a.x, l.x), y: Ih(a.y, l.y) };
  }
  function mS(a, l) {
    let u = 0.5;
    const o = ae(a),
      c = ae(l);
    return (
      c > o
        ? (u = ci(l.min, l.max - o, a.min))
        : o > c && (u = ci(a.min, a.max - c, l.min)),
      Pe(0, 1, u)
    );
  }
  function pS(a, l) {
    const u = {};
    return (
      l.min !== void 0 && (u.min = l.min - a.min),
      l.max !== void 0 && (u.max = l.max - a.min),
      u
    );
  }
  const vo = 0.35;
  function yS(a = vo) {
    return (
      a === !1 ? (a = 0) : a === !0 && (a = vo),
      { x: td(a, "left", "right"), y: td(a, "top", "bottom") }
    );
  }
  function td(a, l, u) {
    return { min: ed(a, l), max: ed(a, u) };
  }
  function ed(a, l) {
    return typeof a == "number" ? a : a[l] || 0;
  }
  const gS = new WeakMap();
  class vS {
    constructor(l) {
      (this.openDragLock = null),
        (this.isDragging = !1),
        (this.currentDirection = null),
        (this.originPoint = { x: 0, y: 0 }),
        (this.constraints = !1),
        (this.hasMutatedConstraints = !1),
        (this.elastic = Bt()),
        (this.visualElement = l);
    }
    start(l, { snapToCursor: u = !1, distanceThreshold: o } = {}) {
      const { presenceContext: c } = this.visualElement;
      if (c && c.isPresent === !1) return;
      const d = (T) => {
          const { dragSnapToOrigin: x } = this.getProps();
          x ? this.pauseAnimation() : this.stopAnimation(),
            u && this.snapToCursor(xi(T).point);
        },
        h = (T, x) => {
          const {
            drag: V,
            dragPropagation: w,
            onDragStart: G,
          } = this.getProps();
          if (
            V &&
            !w &&
            (this.openDragLock && this.openDragLock(),
            (this.openDragLock = Uv(V)),
            !this.openDragLock)
          )
            return;
          (this.isDragging = !0),
            (this.currentDirection = null),
            this.resolveConstraints(),
            this.visualElement.projection &&
              ((this.visualElement.projection.isAnimationBlocked = !0),
              (this.visualElement.projection.target = void 0)),
            Ee((Z) => {
              let K = this.getAxisMotionValue(Z).get() || 0;
              if (Ge.test(K)) {
                const { projection: Y } = this.visualElement;
                if (Y && Y.layout) {
                  const I = Y.layout.layoutBox[Z];
                  I && (K = ae(I) * (parseFloat(K) / 100));
                }
              }
              this.originPoint[Z] = K;
            }),
            G && Rt.postRender(() => G(T, x)),
            ro(this.visualElement, "transform");
          const { animationState: Q } = this.visualElement;
          Q && Q.setActive("whileDrag", !0);
        },
        g = (T, x) => {
          const {
            dragPropagation: V,
            dragDirectionLock: w,
            onDirectionLock: G,
            onDrag: Q,
          } = this.getProps();
          if (!V && !this.openDragLock) return;
          const { offset: Z } = x;
          if (w && this.currentDirection === null) {
            (this.currentDirection = SS(Z)),
              this.currentDirection !== null && G && G(this.currentDirection);
            return;
          }
          this.updateAxis("x", x.point, Z),
            this.updateAxis("y", x.point, Z),
            this.visualElement.render(),
            Q && Q(T, x);
        },
        p = (T, x) => this.stop(T, x),
        m = () =>
          Ee(
            (T) =>
              this.getAnimationState(T) === "paused" &&
              this.getAxisMotionValue(T).animation?.play()
          ),
        { dragSnapToOrigin: v } = this.getProps();
      this.panSession = new Ph(
        l,
        {
          onSessionStart: d,
          onStart: h,
          onMove: g,
          onSessionEnd: p,
          resumeAnimation: m,
        },
        {
          transformPagePoint: this.visualElement.getTransformPagePoint(),
          dragSnapToOrigin: v,
          distanceThreshold: o,
          contextWindow: kh(this.visualElement),
        }
      );
    }
    stop(l, u) {
      const o = this.isDragging;
      if ((this.cancel(), !o)) return;
      const { velocity: c } = u;
      this.startAnimation(c);
      const { onDragEnd: d } = this.getProps();
      d && Rt.postRender(() => d(l, u));
    }
    cancel() {
      this.isDragging = !1;
      const { projection: l, animationState: u } = this.visualElement;
      l && (l.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        (this.panSession = void 0);
      const { dragPropagation: o } = this.getProps();
      !o &&
        this.openDragLock &&
        (this.openDragLock(), (this.openDragLock = null)),
        u && u.setActive("whileDrag", !1);
    }
    updateAxis(l, u, o) {
      const { drag: c } = this.getProps();
      if (!o || !Hl(l, c, this.currentDirection)) return;
      const d = this.getAxisMotionValue(l);
      let h = this.originPoint[l] + o[l];
      this.constraints &&
        this.constraints[l] &&
        (h = fS(h, this.constraints[l], this.elastic[l])),
        d.set(h);
    }
    resolveConstraints() {
      const { dragConstraints: l, dragElastic: u } = this.getProps(),
        o =
          this.visualElement.projection && !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(!1)
            : this.visualElement.projection?.layout,
        c = this.constraints;
      l && va(l)
        ? this.constraints || (this.constraints = this.resolveRefConstraints())
        : l && o
        ? (this.constraints = hS(o.layoutBox, l))
        : (this.constraints = !1),
        (this.elastic = yS(u)),
        c !== this.constraints &&
          o &&
          this.constraints &&
          !this.hasMutatedConstraints &&
          Ee((d) => {
            this.constraints !== !1 &&
              this.getAxisMotionValue(d) &&
              (this.constraints[d] = pS(o.layoutBox[d], this.constraints[d]));
          });
    }
    resolveRefConstraints() {
      const { dragConstraints: l, onMeasureDragConstraints: u } =
        this.getProps();
      if (!l || !va(l)) return !1;
      const o = l.current,
        { projection: c } = this.visualElement;
      if (!c || !c.layout) return !1;
      const d = uS(o, c.root, this.visualElement.getTransformPagePoint());
      let h = dS(c.layout.layoutBox, d);
      if (u) {
        const g = u(W1(h));
        (this.hasMutatedConstraints = !!g), g && (h = Vh(g));
      }
      return h;
    }
    startAnimation(l) {
      const {
          drag: u,
          dragMomentum: o,
          dragElastic: c,
          dragTransition: d,
          dragSnapToOrigin: h,
          onDragTransitionEnd: g,
        } = this.getProps(),
        p = this.constraints || {},
        m = Ee((v) => {
          if (!Hl(v, u, this.currentDirection)) return;
          let T = (p && p[v]) || {};
          h && (T = { min: 0, max: 0 });
          const x = c ? 200 : 1e6,
            V = c ? 40 : 1e7,
            w = {
              type: "inertia",
              velocity: o ? l[v] : 0,
              bounceStiffness: x,
              bounceDamping: V,
              timeConstant: 750,
              restDelta: 1,
              restSpeed: 10,
              ...d,
              ...T,
            };
          return this.startAxisValueAnimation(v, w);
        });
      return Promise.all(m).then(g);
    }
    startAxisValueAnimation(l, u) {
      const o = this.getAxisMotionValue(l);
      return (
        ro(this.visualElement, l),
        o.start(co(l, o, 0, u, this.visualElement, !1))
      );
    }
    stopAnimation() {
      Ee((l) => this.getAxisMotionValue(l).stop());
    }
    pauseAnimation() {
      Ee((l) => this.getAxisMotionValue(l).animation?.pause());
    }
    getAnimationState(l) {
      return this.getAxisMotionValue(l).animation?.state;
    }
    getAxisMotionValue(l) {
      const u = `_drag${l.toUpperCase()}`,
        o = this.visualElement.getProps(),
        c = o[u];
      return (
        c ||
        this.visualElement.getValue(l, (o.initial ? o.initial[l] : void 0) || 0)
      );
    }
    snapToCursor(l) {
      Ee((u) => {
        const { drag: o } = this.getProps();
        if (!Hl(u, o, this.currentDirection)) return;
        const { projection: c } = this.visualElement,
          d = this.getAxisMotionValue(u);
        if (c && c.layout) {
          const { min: h, max: g } = c.layout.layoutBox[u];
          d.set(l[u] - Vt(h, g, 0.5));
        }
      });
    }
    scalePositionWithinConstraints() {
      if (!this.visualElement.current) return;
      const { drag: l, dragConstraints: u } = this.getProps(),
        { projection: o } = this.visualElement;
      if (!va(u) || !o || !this.constraints) return;
      this.stopAnimation();
      const c = { x: 0, y: 0 };
      Ee((h) => {
        const g = this.getAxisMotionValue(h);
        if (g && this.constraints !== !1) {
          const p = g.get();
          c[h] = mS({ min: p, max: p }, this.constraints[h]);
        }
      });
      const { transformTemplate: d } = this.visualElement.getProps();
      (this.visualElement.current.style.transform = d ? d({}, "") : "none"),
        o.root && o.root.updateScroll(),
        o.updateLayout(),
        this.resolveConstraints(),
        Ee((h) => {
          if (!Hl(h, l, null)) return;
          const g = this.getAxisMotionValue(h),
            { min: p, max: m } = this.constraints[h];
          g.set(Vt(p, m, c[h]));
        });
    }
    addListeners() {
      if (!this.visualElement.current) return;
      gS.set(this.visualElement, this);
      const l = this.visualElement.current,
        u = Ai(l, "pointerdown", (p) => {
          const { drag: m, dragListener: v = !0 } = this.getProps();
          m && v && this.start(p);
        }),
        o = () => {
          const { dragConstraints: p } = this.getProps();
          va(p) &&
            p.current &&
            (this.constraints = this.resolveRefConstraints());
        },
        { projection: c } = this.visualElement,
        d = c.addEventListener("measure", o);
      c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()),
        Rt.read(o);
      const h = Ti(window, "resize", () =>
          this.scalePositionWithinConstraints()
        ),
        g = c.addEventListener(
          "didUpdate",
          ({ delta: p, hasLayoutChanged: m }) => {
            this.isDragging &&
              m &&
              (Ee((v) => {
                const T = this.getAxisMotionValue(v);
                T &&
                  ((this.originPoint[v] += p[v].translate),
                  T.set(T.get() + p[v].translate));
              }),
              this.visualElement.render());
          }
        );
      return () => {
        h(), u(), d(), g && g();
      };
    }
    getProps() {
      const l = this.visualElement.getProps(),
        {
          drag: u = !1,
          dragDirectionLock: o = !1,
          dragPropagation: c = !1,
          dragConstraints: d = !1,
          dragElastic: h = vo,
          dragMomentum: g = !0,
        } = l;
      return {
        ...l,
        drag: u,
        dragDirectionLock: o,
        dragPropagation: c,
        dragConstraints: d,
        dragElastic: h,
        dragMomentum: g,
      };
    }
  }
  function Hl(a, l, u) {
    return (l === !0 || l === a) && (u === null || u === a);
  }
  function SS(a, l = 10) {
    let u = null;
    return Math.abs(a.y) > l ? (u = "y") : Math.abs(a.x) > l && (u = "x"), u;
  }
  class bS extends yn {
    constructor(l) {
      super(l),
        (this.removeGroupControls = Ae),
        (this.removeListeners = Ae),
        (this.controls = new vS(l));
    }
    mount() {
      const { dragControls: l } = this.node.getProps();
      l && (this.removeGroupControls = l.subscribe(this.controls)),
        (this.removeListeners = this.controls.addListeners() || Ae);
    }
    unmount() {
      this.removeGroupControls(), this.removeListeners();
    }
  }
  const nd = (a) => (l, u) => {
    a && Rt.postRender(() => a(l, u));
  };
  class TS extends yn {
    constructor() {
      super(...arguments), (this.removePointerDownListener = Ae);
    }
    onPointerDown(l) {
      this.session = new Ph(l, this.createPanHandlers(), {
        transformPagePoint: this.node.getTransformPagePoint(),
        contextWindow: kh(this.node),
      });
    }
    createPanHandlers() {
      const {
        onPanSessionStart: l,
        onPanStart: u,
        onPan: o,
        onPanEnd: c,
      } = this.node.getProps();
      return {
        onSessionStart: nd(l),
        onStart: nd(u),
        onMove: o,
        onEnd: (d, h) => {
          delete this.session, c && Rt.postRender(() => c(d, h));
        },
      };
    }
    mount() {
      this.removePointerDownListener = Ai(
        this.node.current,
        "pointerdown",
        (l) => this.onPointerDown(l)
      );
    }
    update() {
      this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
      this.removePointerDownListener(), this.session && this.session.end();
    }
  }
  const ql = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
  function ad(a, l) {
    return l.max === l.min ? 0 : (a / (l.max - l.min)) * 100;
  }
  const Di = {
      correct: (a, l) => {
        if (!l.target) return a;
        if (typeof a == "string")
          if (at.test(a)) a = parseFloat(a);
          else return a;
        const u = ad(a, l.target.x),
          o = ad(a, l.target.y);
        return `${u}% ${o}%`;
      },
    },
    xS = {
      correct: (a, { treeScale: l, projectionDelta: u }) => {
        const o = a,
          c = pn.parse(a);
        if (c.length > 5) return o;
        const d = pn.createTransformer(a),
          h = typeof c[0] != "number" ? 1 : 0,
          g = u.x.scale * l.x,
          p = u.y.scale * l.y;
        (c[0 + h] /= g), (c[1 + h] /= p);
        const m = Vt(g, p, 0.5);
        return (
          typeof c[2 + h] == "number" && (c[2 + h] /= m),
          typeof c[3 + h] == "number" && (c[3 + h] /= m),
          d(c)
        );
      },
    };
  let id = !1;
  class AS extends L.Component {
    componentDidMount() {
      const {
          visualElement: l,
          layoutGroup: u,
          switchLayoutGroup: o,
          layoutId: c,
        } = this.props,
        { projection: d } = l;
      u1(ES),
        d &&
          (u.group && u.group.add(d),
          o && o.register && c && o.register(d),
          id && d.root.didUpdate(),
          d.addEventListener("animationComplete", () => {
            this.safeToRemove();
          }),
          d.setOptions({
            ...d.options,
            onExitComplete: () => this.safeToRemove(),
          })),
        (ql.hasEverUpdated = !0);
    }
    getSnapshotBeforeUpdate(l) {
      const {
          layoutDependency: u,
          visualElement: o,
          drag: c,
          isPresent: d,
        } = this.props,
        { projection: h } = o;
      return (
        h &&
          ((h.isPresent = d),
          (id = !0),
          c || l.layoutDependency !== u || u === void 0 || l.isPresent !== d
            ? h.willUpdate()
            : this.safeToRemove(),
          l.isPresent !== d &&
            (d
              ? h.promote()
              : h.relegate() ||
                Rt.postRender(() => {
                  const g = h.getStack();
                  (!g || !g.members.length) && this.safeToRemove();
                }))),
        null
      );
    }
    componentDidUpdate() {
      const { projection: l } = this.props.visualElement;
      l &&
        (l.root.didUpdate(),
        Pu.postRender(() => {
          !l.currentAnimation && l.isLead() && this.safeToRemove();
        }));
    }
    componentWillUnmount() {
      const {
          visualElement: l,
          layoutGroup: u,
          switchLayoutGroup: o,
        } = this.props,
        { projection: c } = l;
      c &&
        (c.scheduleCheckAfterUnmount(),
        u && u.group && u.group.remove(c),
        o && o.deregister && o.deregister(c));
    }
    safeToRemove() {
      const { safeToRemove: l } = this.props;
      l && l();
    }
    render() {
      return null;
    }
  }
  function ld(a) {
    const [l, u] = oh(),
      o = L.useContext(ru);
    return B.jsx(AS, {
      ...a,
      layoutGroup: o,
      switchLayoutGroup: L.useContext(yh),
      isPresent: l,
      safeToRemove: u,
    });
  }
  const ES = {
    borderRadius: {
      ...Di,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
    },
    borderTopLeftRadius: Di,
    borderTopRightRadius: Di,
    borderBottomLeftRadius: Di,
    borderBottomRightRadius: Di,
    boxShadow: xS,
  };
  function MS(a, l, u) {
    const o = It(a) ? a : ya(a);
    return o.start(co("", o, l, u)), o.animation;
  }
  const DS = (a, l) => a.depth - l.depth;
  class RS {
    constructor() {
      (this.children = []), (this.isDirty = !1);
    }
    add(l) {
      hu(this.children, l), (this.isDirty = !0);
    }
    remove(l) {
      du(this.children, l), (this.isDirty = !0);
    }
    forEach(l) {
      this.isDirty && this.children.sort(DS),
        (this.isDirty = !1),
        this.children.forEach(l);
    }
  }
  function CS(a, l) {
    const u = le.now(),
      o = ({ timestamp: c }) => {
        const d = c - u;
        d >= l && (dn(o), a(d - l));
      };
    return Rt.setup(o, !0), () => dn(o);
  }
  const sd = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
    OS = sd.length,
    ud = (a) => (typeof a == "string" ? parseFloat(a) : a),
    od = (a) => typeof a == "number" || at.test(a);
  function zS(a, l, u, o, c, d) {
    c
      ? ((a.opacity = Vt(0, u.opacity ?? 1, VS(o))),
        (a.opacityExit = Vt(l.opacity ?? 1, 0, _S(o))))
      : d && (a.opacity = Vt(l.opacity ?? 1, u.opacity ?? 1, o));
    for (let h = 0; h < OS; h++) {
      const g = `border${sd[h]}Radius`;
      let p = rd(l, g),
        m = rd(u, g);
      if (p === void 0 && m === void 0) continue;
      p || (p = 0),
        m || (m = 0),
        p === 0 || m === 0 || od(p) === od(m)
          ? ((a[g] = Math.max(Vt(ud(p), ud(m), o), 0)),
            (Ge.test(m) || Ge.test(p)) && (a[g] += "%"))
          : (a[g] = m);
    }
    (l.rotate || u.rotate) && (a.rotate = Vt(l.rotate || 0, u.rotate || 0, o));
  }
  function rd(a, l) {
    return a[l] !== void 0 ? a[l] : a.borderRadius;
  }
  const VS = cd(0, 0.5, rf),
    _S = cd(0.5, 0.95, Ae);
  function cd(a, l, u) {
    return (o) => (o < a ? 0 : o > l ? 1 : u(ci(a, l, o)));
  }
  function fd(a, l) {
    (a.min = l.min), (a.max = l.max);
  }
  function Me(a, l) {
    fd(a.x, l.x), fd(a.y, l.y);
  }
  function hd(a, l) {
    (a.translate = l.translate),
      (a.scale = l.scale),
      (a.originPoint = l.originPoint),
      (a.origin = l.origin);
  }
  function dd(a, l, u, o, c) {
    return (
      (a -= l), (a = Ll(a, 1 / u, o)), c !== void 0 && (a = Ll(a, 1 / c, o)), a
    );
  }
  function US(a, l = 0, u = 1, o = 0.5, c, d = a, h = a) {
    if (
      (Ge.test(l) &&
        ((l = parseFloat(l)), (l = Vt(h.min, h.max, l / 100) - h.min)),
      typeof l != "number")
    )
      return;
    let g = Vt(d.min, d.max, o);
    a === d && (g -= l),
      (a.min = dd(a.min, l, u, g, c)),
      (a.max = dd(a.max, l, u, g, c));
  }
  function md(a, l, [u, o, c], d, h) {
    US(a, l[u], l[o], l[c], l.scale, d, h);
  }
  const wS = ["x", "scaleX", "originX"],
    jS = ["y", "scaleY", "originY"];
  function pd(a, l, u, o) {
    md(a.x, l, wS, u ? u.x : void 0, o ? o.x : void 0),
      md(a.y, l, jS, u ? u.y : void 0, o ? o.y : void 0);
  }
  function yd(a) {
    return a.translate === 0 && a.scale === 1;
  }
  function gd(a) {
    return yd(a.x) && yd(a.y);
  }
  function vd(a, l) {
    return a.min === l.min && a.max === l.max;
  }
  function BS(a, l) {
    return vd(a.x, l.x) && vd(a.y, l.y);
  }
  function Sd(a, l) {
    return (
      Math.round(a.min) === Math.round(l.min) &&
      Math.round(a.max) === Math.round(l.max)
    );
  }
  function bd(a, l) {
    return Sd(a.x, l.x) && Sd(a.y, l.y);
  }
  function Td(a) {
    return ae(a.x) / ae(a.y);
  }
  function xd(a, l) {
    return (
      a.translate === l.translate &&
      a.scale === l.scale &&
      a.originPoint === l.originPoint
    );
  }
  class NS {
    constructor() {
      this.members = [];
    }
    add(l) {
      hu(this.members, l), l.scheduleRender();
    }
    remove(l) {
      if (
        (du(this.members, l),
        l === this.prevLead && (this.prevLead = void 0),
        l === this.lead)
      ) {
        const u = this.members[this.members.length - 1];
        u && this.promote(u);
      }
    }
    relegate(l) {
      const u = this.members.findIndex((c) => l === c);
      if (u === 0) return !1;
      let o;
      for (let c = u; c >= 0; c--) {
        const d = this.members[c];
        if (d.isPresent !== !1) {
          o = d;
          break;
        }
      }
      return o ? (this.promote(o), !0) : !1;
    }
    promote(l, u) {
      const o = this.lead;
      if (l !== o && ((this.prevLead = o), (this.lead = l), l.show(), o)) {
        o.instance && o.scheduleRender(),
          l.scheduleRender(),
          (l.resumeFrom = o),
          u && (l.resumeFrom.preserveOpacity = !0),
          o.snapshot &&
            ((l.snapshot = o.snapshot),
            (l.snapshot.latestValues = o.animationValues || o.latestValues)),
          l.root && l.root.isUpdating && (l.isLayoutDirty = !0);
        const { crossfade: c } = l.options;
        c === !1 && o.hide();
      }
    }
    exitAnimationComplete() {
      this.members.forEach((l) => {
        const { options: u, resumingFrom: o } = l;
        u.onExitComplete && u.onExitComplete(),
          o && o.options.onExitComplete && o.options.onExitComplete();
      });
    }
    scheduleRender() {
      this.members.forEach((l) => {
        l.instance && l.scheduleRender(!1);
      });
    }
    removeLeadSnapshot() {
      this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
    }
  }
  function LS(a, l, u) {
    let o = "";
    const c = a.x.translate / l.x,
      d = a.y.translate / l.y,
      h = u?.z || 0;
    if (
      ((c || d || h) && (o = `translate3d(${c}px, ${d}px, ${h}px) `),
      (l.x !== 1 || l.y !== 1) && (o += `scale(${1 / l.x}, ${1 / l.y}) `),
      u)
    ) {
      const {
        transformPerspective: m,
        rotate: v,
        rotateX: T,
        rotateY: x,
        skewX: V,
        skewY: w,
      } = u;
      m && (o = `perspective(${m}px) ${o}`),
        v && (o += `rotate(${v}deg) `),
        T && (o += `rotateX(${T}deg) `),
        x && (o += `rotateY(${x}deg) `),
        V && (o += `skewX(${V}deg) `),
        w && (o += `skewY(${w}deg) `);
    }
    const g = a.x.scale * l.x,
      p = a.y.scale * l.y;
    return (g !== 1 || p !== 1) && (o += `scale(${g}, ${p})`), o || "none";
  }
  const So = ["", "X", "Y", "Z"],
    HS = 1e3;
  let qS = 0;
  function bo(a, l, u, o) {
    const { latestValues: c } = l;
    c[a] && ((u[a] = c[a]), l.setStaticValue(a, 0), o && (o[a] = 0));
  }
  function Ad(a) {
    if (((a.hasCheckedOptimisedAppear = !0), a.root === a)) return;
    const { visualElement: l } = a.options;
    if (!l) return;
    const u = Dh(l);
    if (window.MotionHasOptimisedAnimation(u, "transform")) {
      const { layout: c, layoutId: d } = a.options;
      window.MotionCancelOptimisedAnimation(u, "transform", Rt, !(c || d));
    }
    const { parent: o } = a;
    o && !o.hasCheckedOptimisedAppear && Ad(o);
  }
  function Ed({
    attachResizeListener: a,
    defaultParent: l,
    measureScroll: u,
    checkIsScrollRoot: o,
    resetTransform: c,
  }) {
    return class {
      constructor(h = {}, g = l?.()) {
        (this.id = qS++),
          (this.animationId = 0),
          (this.animationCommitId = 0),
          (this.children = new Set()),
          (this.options = {}),
          (this.isTreeAnimating = !1),
          (this.isAnimationBlocked = !1),
          (this.isLayoutDirty = !1),
          (this.isProjectionDirty = !1),
          (this.isSharedProjectionDirty = !1),
          (this.isTransformDirty = !1),
          (this.updateManuallyBlocked = !1),
          (this.updateBlockedByResize = !1),
          (this.isUpdating = !1),
          (this.isSVG = !1),
          (this.needsReset = !1),
          (this.shouldResetTransform = !1),
          (this.hasCheckedOptimisedAppear = !1),
          (this.treeScale = { x: 1, y: 1 }),
          (this.eventHandlers = new Map()),
          (this.hasTreeAnimated = !1),
          (this.updateScheduled = !1),
          (this.scheduleUpdate = () => this.update()),
          (this.projectionUpdateScheduled = !1),
          (this.checkUpdateFailed = () => {
            this.isUpdating &&
              ((this.isUpdating = !1), this.clearAllSnapshots());
          }),
          (this.updateProjection = () => {
            (this.projectionUpdateScheduled = !1),
              this.nodes.forEach(XS),
              this.nodes.forEach(kS),
              this.nodes.forEach(JS),
              this.nodes.forEach(ZS);
          }),
          (this.resolvedRelativeTargetAt = 0),
          (this.hasProjected = !1),
          (this.isVisible = !0),
          (this.animationProgress = 0),
          (this.sharedNodes = new Map()),
          (this.latestValues = h),
          (this.root = g ? g.root || g : this),
          (this.path = g ? [...g.path, g] : []),
          (this.parent = g),
          (this.depth = g ? g.depth + 1 : 0);
        for (let p = 0; p < this.path.length; p++)
          this.path[p].shouldResetTransform = !0;
        this.root === this && (this.nodes = new RS());
      }
      addEventListener(h, g) {
        return (
          this.eventHandlers.has(h) || this.eventHandlers.set(h, new yu()),
          this.eventHandlers.get(h).add(g)
        );
      }
      notifyListeners(h, ...g) {
        const p = this.eventHandlers.get(h);
        p && p.notify(...g);
      }
      hasListeners(h) {
        return this.eventHandlers.has(h);
      }
      mount(h) {
        if (this.instance) return;
        (this.isSVG = uh(h) && !Hv(h)), (this.instance = h);
        const { layoutId: g, layout: p, visualElement: m } = this.options;
        if (
          (m && !m.current && m.mount(h),
          this.root.nodes.add(this),
          this.parent && this.parent.children.add(this),
          this.root.hasTreeAnimated && (p || g) && (this.isLayoutDirty = !0),
          a)
        ) {
          let v,
            T = 0;
          const x = () => (this.root.updateBlockedByResize = !1);
          Rt.read(() => {
            T = window.innerWidth;
          }),
            a(h, () => {
              const V = window.innerWidth;
              V !== T &&
                ((T = V),
                (this.root.updateBlockedByResize = !0),
                v && v(),
                (v = CS(x, 250)),
                ql.hasAnimatedSinceResize &&
                  ((ql.hasAnimatedSinceResize = !1), this.nodes.forEach(Rd)));
            });
        }
        g && this.root.registerSharedNode(g, this),
          this.options.animate !== !1 &&
            m &&
            (g || p) &&
            this.addEventListener(
              "didUpdate",
              ({
                delta: v,
                hasLayoutChanged: T,
                hasRelativeLayoutChanged: x,
                layout: V,
              }) => {
                if (this.isTreeAnimationBlocked()) {
                  (this.target = void 0), (this.relativeTarget = void 0);
                  return;
                }
                const w =
                    this.options.transition || m.getDefaultTransition() || IS,
                  { onLayoutAnimationStart: G, onLayoutAnimationComplete: Q } =
                    m.getProps(),
                  Z = !this.targetLayout || !bd(this.targetLayout, V),
                  K = !T && x;
                if (
                  this.options.layoutRoot ||
                  this.resumeFrom ||
                  K ||
                  (T && (Z || !this.currentAnimation))
                ) {
                  this.resumeFrom &&
                    ((this.resumingFrom = this.resumeFrom),
                    (this.resumingFrom.resumingFrom = void 0));
                  const Y = { ...Ku(w, "layout"), onPlay: G, onComplete: Q };
                  (m.shouldReduceMotion || this.options.layoutRoot) &&
                    ((Y.delay = 0), (Y.type = !1)),
                    this.startAnimation(Y),
                    this.setAnimationOrigin(v, K);
                } else
                  T || Rd(this),
                    this.isLead() &&
                      this.options.onExitComplete &&
                      this.options.onExitComplete();
                this.targetLayout = V;
              }
            );
      }
      unmount() {
        this.options.layoutId && this.willUpdate(),
          this.root.nodes.remove(this);
        const h = this.getStack();
        h && h.remove(this),
          this.parent && this.parent.children.delete(this),
          (this.instance = void 0),
          this.eventHandlers.clear(),
          dn(this.updateProjection);
      }
      blockUpdate() {
        this.updateManuallyBlocked = !0;
      }
      unblockUpdate() {
        this.updateManuallyBlocked = !1;
      }
      isUpdateBlocked() {
        return this.updateManuallyBlocked || this.updateBlockedByResize;
      }
      isTreeAnimationBlocked() {
        return (
          this.isAnimationBlocked ||
          (this.parent && this.parent.isTreeAnimationBlocked()) ||
          !1
        );
      }
      startUpdate() {
        this.isUpdateBlocked() ||
          ((this.isUpdating = !0),
          this.nodes && this.nodes.forEach(PS),
          this.animationId++);
      }
      getTransformTemplate() {
        const { visualElement: h } = this.options;
        return h && h.getProps().transformTemplate;
      }
      willUpdate(h = !0) {
        if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
          this.options.onExitComplete && this.options.onExitComplete();
          return;
        }
        if (
          (window.MotionCancelOptimisedAnimation &&
            !this.hasCheckedOptimisedAppear &&
            Ad(this),
          !this.root.isUpdating && this.root.startUpdate(),
          this.isLayoutDirty)
        )
          return;
        this.isLayoutDirty = !0;
        for (let v = 0; v < this.path.length; v++) {
          const T = this.path[v];
          (T.shouldResetTransform = !0),
            T.updateScroll("snapshot"),
            T.options.layoutRoot && T.willUpdate(!1);
        }
        const { layoutId: g, layout: p } = this.options;
        if (g === void 0 && !p) return;
        const m = this.getTransformTemplate();
        (this.prevTransformTemplateValue = m
          ? m(this.latestValues, "")
          : void 0),
          this.updateSnapshot(),
          h && this.notifyListeners("willUpdate");
      }
      update() {
        if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
          this.unblockUpdate(),
            this.clearAllSnapshots(),
            this.nodes.forEach(Md);
          return;
        }
        if (this.animationId <= this.animationCommitId) {
          this.nodes.forEach(Dd);
          return;
        }
        (this.animationCommitId = this.animationId),
          this.isUpdating
            ? ((this.isUpdating = !1),
              this.nodes.forEach(KS),
              this.nodes.forEach(YS),
              this.nodes.forEach(GS))
            : this.nodes.forEach(Dd),
          this.clearAllSnapshots();
        const g = le.now();
        (Jt.delta = Pe(0, 1e3 / 60, g - Jt.timestamp)),
          (Jt.timestamp = g),
          (Jt.isProcessing = !0),
          Su.update.process(Jt),
          Su.preRender.process(Jt),
          Su.render.process(Jt),
          (Jt.isProcessing = !1);
      }
      didUpdate() {
        this.updateScheduled ||
          ((this.updateScheduled = !0), Pu.read(this.scheduleUpdate));
      }
      clearAllSnapshots() {
        this.nodes.forEach(QS), this.sharedNodes.forEach(FS);
      }
      scheduleUpdateProjection() {
        this.projectionUpdateScheduled ||
          ((this.projectionUpdateScheduled = !0),
          Rt.preRender(this.updateProjection, !1, !0));
      }
      scheduleCheckAfterUnmount() {
        Rt.postRender(() => {
          this.isLayoutDirty
            ? this.root.didUpdate()
            : this.root.checkUpdateFailed();
        });
      }
      updateSnapshot() {
        this.snapshot ||
          !this.instance ||
          ((this.snapshot = this.measure()),
          this.snapshot &&
            !ae(this.snapshot.measuredBox.x) &&
            !ae(this.snapshot.measuredBox.y) &&
            (this.snapshot = void 0));
      }
      updateLayout() {
        if (
          !this.instance ||
          (this.updateScroll(),
          !(this.options.alwaysMeasureLayout && this.isLead()) &&
            !this.isLayoutDirty)
        )
          return;
        if (this.resumeFrom && !this.resumeFrom.instance)
          for (let p = 0; p < this.path.length; p++)
            this.path[p].updateScroll();
        const h = this.layout;
        (this.layout = this.measure(!1)),
          (this.layoutCorrected = Bt()),
          (this.isLayoutDirty = !1),
          (this.projectionDelta = void 0),
          this.notifyListeners("measure", this.layout.layoutBox);
        const { visualElement: g } = this.options;
        g &&
          g.notify(
            "LayoutMeasure",
            this.layout.layoutBox,
            h ? h.layoutBox : void 0
          );
      }
      updateScroll(h = "measure") {
        let g = !!(this.options.layoutScroll && this.instance);
        if (
          (this.scroll &&
            this.scroll.animationId === this.root.animationId &&
            this.scroll.phase === h &&
            (g = !1),
          g && this.instance)
        ) {
          const p = o(this.instance);
          this.scroll = {
            animationId: this.root.animationId,
            phase: h,
            isRoot: p,
            offset: u(this.instance),
            wasRoot: this.scroll ? this.scroll.isRoot : p,
          };
        }
      }
      resetTransform() {
        if (!c) return;
        const h =
            this.isLayoutDirty ||
            this.shouldResetTransform ||
            this.options.alwaysMeasureLayout,
          g = this.projectionDelta && !gd(this.projectionDelta),
          p = this.getTransformTemplate(),
          m = p ? p(this.latestValues, "") : void 0,
          v = m !== this.prevTransformTemplateValue;
        h &&
          this.instance &&
          (g || kn(this.latestValues) || v) &&
          (c(this.instance, m),
          (this.shouldResetTransform = !1),
          this.scheduleRender());
      }
      measure(h = !0) {
        const g = this.measurePageBox();
        let p = this.removeElementScroll(g);
        return (
          h && (p = this.removeTransform(p)),
          tb(p),
          {
            animationId: this.root.animationId,
            measuredBox: g,
            layoutBox: p,
            latestValues: {},
            source: this.id,
          }
        );
      }
      measurePageBox() {
        const { visualElement: h } = this.options;
        if (!h) return Bt();
        const g = h.measureViewportBox();
        if (!(this.scroll?.wasRoot || this.path.some(eb))) {
          const { scroll: m } = this.root;
          m && (ba(g.x, m.offset.x), ba(g.y, m.offset.y));
        }
        return g;
      }
      removeElementScroll(h) {
        const g = Bt();
        if ((Me(g, h), this.scroll?.wasRoot)) return g;
        for (let p = 0; p < this.path.length; p++) {
          const m = this.path[p],
            { scroll: v, options: T } = m;
          m !== this.root &&
            v &&
            T.layoutScroll &&
            (v.wasRoot && Me(g, h), ba(g.x, v.offset.x), ba(g.y, v.offset.y));
        }
        return g;
      }
      applyTransform(h, g = !1) {
        const p = Bt();
        Me(p, h);
        for (let m = 0; m < this.path.length; m++) {
          const v = this.path[m];
          !g &&
            v.options.layoutScroll &&
            v.scroll &&
            v !== v.root &&
            Ta(p, { x: -v.scroll.offset.x, y: -v.scroll.offset.y }),
            kn(v.latestValues) && Ta(p, v.latestValues);
        }
        return kn(this.latestValues) && Ta(p, this.latestValues), p;
      }
      removeTransform(h) {
        const g = Bt();
        Me(g, h);
        for (let p = 0; p < this.path.length; p++) {
          const m = this.path[p];
          if (!m.instance || !kn(m.latestValues)) continue;
          mo(m.latestValues) && m.updateSnapshot();
          const v = Bt(),
            T = m.measurePageBox();
          Me(v, T),
            pd(
              g,
              m.latestValues,
              m.snapshot ? m.snapshot.layoutBox : void 0,
              v
            );
        }
        return kn(this.latestValues) && pd(g, this.latestValues), g;
      }
      setTargetDelta(h) {
        (this.targetDelta = h),
          this.root.scheduleUpdateProjection(),
          (this.isProjectionDirty = !0);
      }
      setOptions(h) {
        this.options = {
          ...this.options,
          ...h,
          crossfade: h.crossfade !== void 0 ? h.crossfade : !0,
        };
      }
      clearMeasurements() {
        (this.scroll = void 0),
          (this.layout = void 0),
          (this.snapshot = void 0),
          (this.prevTransformTemplateValue = void 0),
          (this.targetDelta = void 0),
          (this.target = void 0),
          (this.isLayoutDirty = !1);
      }
      forceRelativeParentToResolveTarget() {
        this.relativeParent &&
          this.relativeParent.resolvedRelativeTargetAt !== Jt.timestamp &&
          this.relativeParent.resolveTargetDelta(!0);
      }
      resolveTargetDelta(h = !1) {
        const g = this.getLead();
        this.isProjectionDirty ||
          (this.isProjectionDirty = g.isProjectionDirty),
          this.isTransformDirty || (this.isTransformDirty = g.isTransformDirty),
          this.isSharedProjectionDirty ||
            (this.isSharedProjectionDirty = g.isSharedProjectionDirty);
        const p = !!this.resumingFrom || this !== g;
        if (
          !(
            h ||
            (p && this.isSharedProjectionDirty) ||
            this.isProjectionDirty ||
            this.parent?.isProjectionDirty ||
            this.attemptToResolveRelativeTarget ||
            this.root.updateBlockedByResize
          )
        )
          return;
        const { layout: v, layoutId: T } = this.options;
        if (!(!this.layout || !(v || T))) {
          if (
            ((this.resolvedRelativeTargetAt = Jt.timestamp),
            !this.targetDelta && !this.relativeTarget)
          ) {
            const x = this.getClosestProjectingParent();
            x && x.layout && this.animationProgress !== 1
              ? ((this.relativeParent = x),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = Bt()),
                (this.relativeTargetOrigin = Bt()),
                Mi(
                  this.relativeTargetOrigin,
                  this.layout.layoutBox,
                  x.layout.layoutBox
                ),
                Me(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          if (
            !(!this.relativeTarget && !this.targetDelta) &&
            (this.target ||
              ((this.target = Bt()), (this.targetWithTransforms = Bt())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                lS(
                  this.target,
                  this.relativeTarget,
                  this.relativeParent.target
                ))
              : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : Me(this.target, this.layout.layoutBox),
                Gh(this.target, this.targetDelta))
              : Me(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            const x = this.getClosestProjectingParent();
            x &&
            !!x.resumingFrom == !!this.resumingFrom &&
            !x.options.layoutScroll &&
            x.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = x),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = Bt()),
                (this.relativeTargetOrigin = Bt()),
                Mi(this.relativeTargetOrigin, this.target, x.target),
                Me(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
        }
      }
      getClosestProjectingParent() {
        if (
          !(
            !this.parent ||
            mo(this.parent.latestValues) ||
            Hh(this.parent.latestValues)
          )
        )
          return this.parent.isProjecting()
            ? this.parent
            : this.parent.getClosestProjectingParent();
      }
      isProjecting() {
        return !!(
          (this.relativeTarget ||
            this.targetDelta ||
            this.options.layoutRoot) &&
          this.layout
        );
      }
      calcProjection() {
        const h = this.getLead(),
          g = !!this.resumingFrom || this !== h;
        let p = !0;
        if (
          ((this.isProjectionDirty || this.parent?.isProjectionDirty) &&
            (p = !1),
          g &&
            (this.isSharedProjectionDirty || this.isTransformDirty) &&
            (p = !1),
          this.resolvedRelativeTargetAt === Jt.timestamp && (p = !1),
          p)
        )
          return;
        const { layout: m, layoutId: v } = this.options;
        if (
          ((this.isTreeAnimating = !!(
            (this.parent && this.parent.isTreeAnimating) ||
            this.currentAnimation ||
            this.pendingAnimation
          )),
          this.isTreeAnimating ||
            (this.targetDelta = this.relativeTarget = void 0),
          !this.layout || !(m || v))
        )
          return;
        Me(this.layoutCorrected, this.layout.layoutBox);
        const T = this.treeScale.x,
          x = this.treeScale.y;
        sS(this.layoutCorrected, this.treeScale, this.path, g),
          h.layout &&
            !h.target &&
            (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
            ((h.target = h.layout.layoutBox), (h.targetWithTransforms = Bt()));
        const { target: V } = h;
        if (!V) {
          this.prevProjectionDelta &&
            (this.createProjectionDeltas(), this.scheduleRender());
          return;
        }
        !this.projectionDelta || !this.prevProjectionDelta
          ? this.createProjectionDeltas()
          : (hd(this.prevProjectionDelta.x, this.projectionDelta.x),
            hd(this.prevProjectionDelta.y, this.projectionDelta.y)),
          Ei(this.projectionDelta, this.layoutCorrected, V, this.latestValues),
          (this.treeScale.x !== T ||
            this.treeScale.y !== x ||
            !xd(this.projectionDelta.x, this.prevProjectionDelta.x) ||
            !xd(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
            ((this.hasProjected = !0),
            this.scheduleRender(),
            this.notifyListeners("projectionUpdate", V));
      }
      hide() {
        this.isVisible = !1;
      }
      show() {
        this.isVisible = !0;
      }
      scheduleRender(h = !0) {
        if ((this.options.visualElement?.scheduleRender(), h)) {
          const g = this.getStack();
          g && g.scheduleRender();
        }
        this.resumingFrom &&
          !this.resumingFrom.instance &&
          (this.resumingFrom = void 0);
      }
      createProjectionDeltas() {
        (this.prevProjectionDelta = Sa()),
          (this.projectionDelta = Sa()),
          (this.projectionDeltaWithTransform = Sa());
      }
      setAnimationOrigin(h, g = !1) {
        const p = this.snapshot,
          m = p ? p.latestValues : {},
          v = { ...this.latestValues },
          T = Sa();
        (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
          (this.relativeTarget = this.relativeTargetOrigin = void 0),
          (this.attemptToResolveRelativeTarget = !g);
        const x = Bt(),
          V = p ? p.source : void 0,
          w = this.layout ? this.layout.source : void 0,
          G = V !== w,
          Q = this.getStack(),
          Z = !Q || Q.members.length <= 1,
          K = !!(
            G &&
            !Z &&
            this.options.crossfade === !0 &&
            !this.path.some(WS)
          );
        this.animationProgress = 0;
        let Y;
        (this.mixTargetDelta = (I) => {
          const q = I / 1e3;
          Cd(T.x, h.x, q),
            Cd(T.y, h.y, q),
            this.setTargetDelta(T),
            this.relativeTarget &&
              this.relativeTargetOrigin &&
              this.layout &&
              this.relativeParent &&
              this.relativeParent.layout &&
              (Mi(
                x,
                this.layout.layoutBox,
                this.relativeParent.layout.layoutBox
              ),
              $S(this.relativeTarget, this.relativeTargetOrigin, x, q),
              Y && BS(this.relativeTarget, Y) && (this.isProjectionDirty = !1),
              Y || (Y = Bt()),
              Me(Y, this.relativeTarget)),
            G &&
              ((this.animationValues = v),
              zS(v, m, this.latestValues, q, K, Z)),
            this.root.scheduleUpdateProjection(),
            this.scheduleRender(),
            (this.animationProgress = q);
        }),
          this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
      }
      startAnimation(h) {
        this.notifyListeners("animationStart"),
          this.currentAnimation?.stop(),
          this.resumingFrom?.currentAnimation?.stop(),
          this.pendingAnimation &&
            (dn(this.pendingAnimation), (this.pendingAnimation = void 0)),
          (this.pendingAnimation = Rt.update(() => {
            (ql.hasAnimatedSinceResize = !0),
              this.motionValue || (this.motionValue = ya(0)),
              (this.currentAnimation = MS(this.motionValue, [0, 1e3], {
                ...h,
                velocity: 0,
                isSync: !0,
                onUpdate: (g) => {
                  this.mixTargetDelta(g), h.onUpdate && h.onUpdate(g);
                },
                onStop: () => {},
                onComplete: () => {
                  h.onComplete && h.onComplete(), this.completeAnimation();
                },
              })),
              this.resumingFrom &&
                (this.resumingFrom.currentAnimation = this.currentAnimation),
              (this.pendingAnimation = void 0);
          }));
      }
      completeAnimation() {
        this.resumingFrom &&
          ((this.resumingFrom.currentAnimation = void 0),
          (this.resumingFrom.preserveOpacity = void 0));
        const h = this.getStack();
        h && h.exitAnimationComplete(),
          (this.resumingFrom =
            this.currentAnimation =
            this.animationValues =
              void 0),
          this.notifyListeners("animationComplete");
      }
      finishAnimation() {
        this.currentAnimation &&
          (this.mixTargetDelta && this.mixTargetDelta(HS),
          this.currentAnimation.stop()),
          this.completeAnimation();
      }
      applyTransformsToTarget() {
        const h = this.getLead();
        let {
          targetWithTransforms: g,
          target: p,
          layout: m,
          latestValues: v,
        } = h;
        if (!(!g || !p || !m)) {
          if (
            this !== h &&
            this.layout &&
            m &&
            Ud(this.options.animationType, this.layout.layoutBox, m.layoutBox)
          ) {
            p = this.target || Bt();
            const T = ae(this.layout.layoutBox.x);
            (p.x.min = h.target.x.min), (p.x.max = p.x.min + T);
            const x = ae(this.layout.layoutBox.y);
            (p.y.min = h.target.y.min), (p.y.max = p.y.min + x);
          }
          Me(g, p),
            Ta(g, v),
            Ei(this.projectionDeltaWithTransform, this.layoutCorrected, g, v);
        }
      }
      registerSharedNode(h, g) {
        this.sharedNodes.has(h) || this.sharedNodes.set(h, new NS()),
          this.sharedNodes.get(h).add(g);
        const m = g.options.initialPromotionConfig;
        g.promote({
          transition: m ? m.transition : void 0,
          preserveFollowOpacity:
            m && m.shouldPreserveFollowOpacity
              ? m.shouldPreserveFollowOpacity(g)
              : void 0,
        });
      }
      isLead() {
        const h = this.getStack();
        return h ? h.lead === this : !0;
      }
      getLead() {
        const { layoutId: h } = this.options;
        return h ? this.getStack()?.lead || this : this;
      }
      getPrevLead() {
        const { layoutId: h } = this.options;
        return h ? this.getStack()?.prevLead : void 0;
      }
      getStack() {
        const { layoutId: h } = this.options;
        if (h) return this.root.sharedNodes.get(h);
      }
      promote({ needsReset: h, transition: g, preserveFollowOpacity: p } = {}) {
        const m = this.getStack();
        m && m.promote(this, p),
          h && ((this.projectionDelta = void 0), (this.needsReset = !0)),
          g && this.setOptions({ transition: g });
      }
      relegate() {
        const h = this.getStack();
        return h ? h.relegate(this) : !1;
      }
      resetSkewAndRotation() {
        const { visualElement: h } = this.options;
        if (!h) return;
        let g = !1;
        const { latestValues: p } = h;
        if (
          ((p.z ||
            p.rotate ||
            p.rotateX ||
            p.rotateY ||
            p.rotateZ ||
            p.skewX ||
            p.skewY) &&
            (g = !0),
          !g)
        )
          return;
        const m = {};
        p.z && bo("z", h, m, this.animationValues);
        for (let v = 0; v < So.length; v++)
          bo(`rotate${So[v]}`, h, m, this.animationValues),
            bo(`skew${So[v]}`, h, m, this.animationValues);
        h.render();
        for (const v in m)
          h.setStaticValue(v, m[v]),
            this.animationValues && (this.animationValues[v] = m[v]);
        h.scheduleRender();
      }
      applyProjectionStyles(h, g) {
        if (!this.instance || this.isSVG) return;
        if (!this.isVisible) {
          h.visibility = "hidden";
          return;
        }
        const p = this.getTransformTemplate();
        if (this.needsReset) {
          (this.needsReset = !1),
            (h.visibility = ""),
            (h.opacity = ""),
            (h.pointerEvents = Nl(g?.pointerEvents) || ""),
            (h.transform = p ? p(this.latestValues, "") : "none");
          return;
        }
        const m = this.getLead();
        if (!this.projectionDelta || !this.layout || !m.target) {
          this.options.layoutId &&
            ((h.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (h.pointerEvents = Nl(g?.pointerEvents) || "")),
            this.hasProjected &&
              !kn(this.latestValues) &&
              ((h.transform = p ? p({}, "") : "none"),
              (this.hasProjected = !1));
          return;
        }
        h.visibility = "";
        const v = m.animationValues || m.latestValues;
        this.applyTransformsToTarget();
        let T = LS(this.projectionDeltaWithTransform, this.treeScale, v);
        p && (T = p(v, T)), (h.transform = T);
        const { x, y: V } = this.projectionDelta;
        (h.transformOrigin = `${x.origin * 100}% ${V.origin * 100}% 0`),
          m.animationValues
            ? (h.opacity =
                m === this
                  ? v.opacity ?? this.latestValues.opacity ?? 1
                  : this.preserveOpacity
                  ? this.latestValues.opacity
                  : v.opacityExit)
            : (h.opacity =
                m === this
                  ? v.opacity !== void 0
                    ? v.opacity
                    : ""
                  : v.opacityExit !== void 0
                  ? v.opacityExit
                  : 0);
        for (const w in Si) {
          if (v[w] === void 0) continue;
          const { correct: G, applyTo: Q, isCSSVariable: Z } = Si[w],
            K = T === "none" ? v[w] : G(v[w], m);
          if (Q) {
            const Y = Q.length;
            for (let I = 0; I < Y; I++) h[Q[I]] = K;
          } else
            Z
              ? (this.options.visualElement.renderState.vars[w] = K)
              : (h[w] = K);
        }
        this.options.layoutId &&
          (h.pointerEvents = m === this ? Nl(g?.pointerEvents) || "" : "none");
      }
      clearSnapshot() {
        this.resumeFrom = this.snapshot = void 0;
      }
      resetTree() {
        this.root.nodes.forEach((h) => h.currentAnimation?.stop()),
          this.root.nodes.forEach(Md),
          this.root.sharedNodes.clear();
      }
    };
  }
  function YS(a) {
    a.updateLayout();
  }
  function GS(a) {
    const l = a.resumeFrom?.snapshot || a.snapshot;
    if (a.isLead() && a.layout && l && a.hasListeners("didUpdate")) {
      const { layoutBox: u, measuredBox: o } = a.layout,
        { animationType: c } = a.options,
        d = l.source !== a.layout.source;
      c === "size"
        ? Ee((v) => {
            const T = d ? l.measuredBox[v] : l.layoutBox[v],
              x = ae(T);
            (T.min = u[v].min), (T.max = T.min + x);
          })
        : Ud(c, l.layoutBox, u) &&
          Ee((v) => {
            const T = d ? l.measuredBox[v] : l.layoutBox[v],
              x = ae(u[v]);
            (T.max = T.min + x),
              a.relativeTarget &&
                !a.currentAnimation &&
                ((a.isProjectionDirty = !0),
                (a.relativeTarget[v].max = a.relativeTarget[v].min + x));
          });
      const h = Sa();
      Ei(h, u, l.layoutBox);
      const g = Sa();
      d ? Ei(g, a.applyTransform(o, !0), l.measuredBox) : Ei(g, u, l.layoutBox);
      const p = !gd(h);
      let m = !1;
      if (!a.resumeFrom) {
        const v = a.getClosestProjectingParent();
        if (v && !v.resumeFrom) {
          const { snapshot: T, layout: x } = v;
          if (T && x) {
            const V = Bt();
            Mi(V, l.layoutBox, T.layoutBox);
            const w = Bt();
            Mi(w, u, x.layoutBox),
              bd(V, w) || (m = !0),
              v.options.layoutRoot &&
                ((a.relativeTarget = w),
                (a.relativeTargetOrigin = V),
                (a.relativeParent = v));
          }
        }
      }
      a.notifyListeners("didUpdate", {
        layout: u,
        snapshot: l,
        delta: g,
        layoutDelta: h,
        hasLayoutChanged: p,
        hasRelativeLayoutChanged: m,
      });
    } else if (a.isLead()) {
      const { onExitComplete: u } = a.options;
      u && u();
    }
    a.options.transition = void 0;
  }
  function XS(a) {
    a.parent &&
      (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty),
      a.isSharedProjectionDirty ||
        (a.isSharedProjectionDirty = !!(
          a.isProjectionDirty ||
          a.parent.isProjectionDirty ||
          a.parent.isSharedProjectionDirty
        )),
      a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
  }
  function ZS(a) {
    a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
  }
  function QS(a) {
    a.clearSnapshot();
  }
  function Md(a) {
    a.clearMeasurements();
  }
  function Dd(a) {
    a.isLayoutDirty = !1;
  }
  function KS(a) {
    const { visualElement: l } = a.options;
    l && l.getProps().onBeforeLayoutMeasure && l.notify("BeforeLayoutMeasure"),
      a.resetTransform();
  }
  function Rd(a) {
    a.finishAnimation(),
      (a.targetDelta = a.relativeTarget = a.target = void 0),
      (a.isProjectionDirty = !0);
  }
  function kS(a) {
    a.resolveTargetDelta();
  }
  function JS(a) {
    a.calcProjection();
  }
  function PS(a) {
    a.resetSkewAndRotation();
  }
  function FS(a) {
    a.removeLeadSnapshot();
  }
  function Cd(a, l, u) {
    (a.translate = Vt(l.translate, 0, u)),
      (a.scale = Vt(l.scale, 1, u)),
      (a.origin = l.origin),
      (a.originPoint = l.originPoint);
  }
  function Od(a, l, u, o) {
    (a.min = Vt(l.min, u.min, o)), (a.max = Vt(l.max, u.max, o));
  }
  function $S(a, l, u, o) {
    Od(a.x, l.x, u.x, o), Od(a.y, l.y, u.y, o);
  }
  function WS(a) {
    return a.animationValues && a.animationValues.opacityExit !== void 0;
  }
  const IS = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
    zd = (a) =>
      typeof navigator < "u" &&
      navigator.userAgent &&
      navigator.userAgent.toLowerCase().includes(a),
    Vd = zd("applewebkit/") && !zd("chrome/") ? Math.round : Ae;
  function _d(a) {
    (a.min = Vd(a.min)), (a.max = Vd(a.max));
  }
  function tb(a) {
    _d(a.x), _d(a.y);
  }
  function Ud(a, l, u) {
    return (
      a === "position" || (a === "preserve-aspect" && !iS(Td(l), Td(u), 0.2))
    );
  }
  function eb(a) {
    return a !== a.root && a.scroll?.wasRoot;
  }
  const nb = Ed({
      attachResizeListener: (a, l) => Ti(a, "resize", l),
      measureScroll: () => ({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop,
      }),
      checkIsScrollRoot: () => !0,
    }),
    To = { current: void 0 },
    wd = Ed({
      measureScroll: (a) => ({ x: a.scrollLeft, y: a.scrollTop }),
      defaultParent: () => {
        if (!To.current) {
          const a = new nb({});
          a.mount(window), a.setOptions({ layoutScroll: !0 }), (To.current = a);
        }
        return To.current;
      },
      resetTransform: (a, l) => {
        a.style.transform = l !== void 0 ? l : "none";
      },
      checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed",
    }),
    ab = {
      pan: { Feature: TS },
      drag: { Feature: bS, ProjectionNode: wd, MeasureLayout: ld },
    };
  function jd(a, l, u) {
    const { props: o } = a;
    a.animationState &&
      o.whileHover &&
      a.animationState.setActive("whileHover", u === "Start");
    const c = "onHover" + u,
      d = o[c];
    d && Rt.postRender(() => d(l, xi(l)));
  }
  class ib extends yn {
    mount() {
      const { current: l } = this.node;
      l &&
        (this.unmount = wv(
          l,
          (u, o) => (jd(this.node, o, "Start"), (c) => jd(this.node, c, "End"))
        ));
    }
    unmount() {}
  }
  class lb extends yn {
    constructor() {
      super(...arguments), (this.isActive = !1);
    }
    onFocus() {
      let l = !1;
      try {
        l = this.node.current.matches(":focus-visible");
      } catch {
        l = !0;
      }
      !l ||
        !this.node.animationState ||
        (this.node.animationState.setActive("whileFocus", !0),
        (this.isActive = !0));
    }
    onBlur() {
      !this.isActive ||
        !this.node.animationState ||
        (this.node.animationState.setActive("whileFocus", !1),
        (this.isActive = !1));
    }
    mount() {
      this.unmount = ri(
        Ti(this.node.current, "focus", () => this.onFocus()),
        Ti(this.node.current, "blur", () => this.onBlur())
      );
    }
    unmount() {}
  }
  function Bd(a, l, u) {
    const { props: o } = a;
    if (a.current instanceof HTMLButtonElement && a.current.disabled) return;
    a.animationState &&
      o.whileTap &&
      a.animationState.setActive("whileTap", u === "Start");
    const c = "onTap" + (u === "End" ? "" : u),
      d = o[c];
    d && Rt.postRender(() => d(l, xi(l)));
  }
  class sb extends yn {
    mount() {
      const { current: l } = this.node;
      l &&
        (this.unmount = Lv(
          l,
          (u, o) => (
            Bd(this.node, o, "Start"),
            (c, { success: d }) => Bd(this.node, c, d ? "End" : "Cancel")
          ),
          { useGlobalTarget: this.node.props.globalTapTarget }
        ));
    }
    unmount() {}
  }
  const xo = new WeakMap(),
    Ao = new WeakMap(),
    ub = (a) => {
      const l = xo.get(a.target);
      l && l(a);
    },
    ob = (a) => {
      a.forEach(ub);
    };
  function rb({ root: a, ...l }) {
    const u = a || document;
    Ao.has(u) || Ao.set(u, {});
    const o = Ao.get(u),
      c = JSON.stringify(l);
    return (
      o[c] || (o[c] = new IntersectionObserver(ob, { root: a, ...l })), o[c]
    );
  }
  function cb(a, l, u) {
    const o = rb(l);
    return (
      xo.set(a, u),
      o.observe(a),
      () => {
        xo.delete(a), o.unobserve(a);
      }
    );
  }
  const fb = { some: 0, all: 1 };
  class hb extends yn {
    constructor() {
      super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
    }
    startObserver() {
      this.unmount();
      const { viewport: l = {} } = this.node.getProps(),
        { root: u, margin: o, amount: c = "some", once: d } = l,
        h = {
          root: u ? u.current : void 0,
          rootMargin: o,
          threshold: typeof c == "number" ? c : fb[c],
        },
        g = (p) => {
          const { isIntersecting: m } = p;
          if (
            this.isInView === m ||
            ((this.isInView = m), d && !m && this.hasEnteredView)
          )
            return;
          m && (this.hasEnteredView = !0),
            this.node.animationState &&
              this.node.animationState.setActive("whileInView", m);
          const { onViewportEnter: v, onViewportLeave: T } =
              this.node.getProps(),
            x = m ? v : T;
          x && x(p);
        };
      return cb(this.node.current, h, g);
    }
    mount() {
      this.startObserver();
    }
    update() {
      if (typeof IntersectionObserver > "u") return;
      const { props: l, prevProps: u } = this.node;
      ["amount", "margin", "root"].some(db(l, u)) && this.startObserver();
    }
    unmount() {}
  }
  function db({ viewport: a = {} }, { viewport: l = {} } = {}) {
    return (u) => a[u] !== l[u];
  }
  const mb = {
      inView: { Feature: hb },
      tap: { Feature: sb },
      focus: { Feature: lb },
      hover: { Feature: ib },
    },
    pb = { layout: { ProjectionNode: wd, MeasureLayout: ld } },
    Eo = { current: null },
    Nd = { current: !1 };
  function yb() {
    if (((Nd.current = !0), !!fu))
      if (window.matchMedia) {
        const a = window.matchMedia("(prefers-reduced-motion)"),
          l = () => (Eo.current = a.matches);
        a.addEventListener("change", l), l();
      } else Eo.current = !1;
  }
  const gb = new WeakMap();
  function vb(a, l, u) {
    for (const o in l) {
      const c = l[o],
        d = u[o];
      if (It(c)) a.addValue(o, c);
      else if (It(d)) a.addValue(o, ya(c, { owner: a }));
      else if (d !== c)
        if (a.hasValue(o)) {
          const h = a.getValue(o);
          h.liveStyle === !0 ? h.jump(c) : h.hasAnimated || h.set(c);
        } else {
          const h = a.getStaticValue(o);
          a.addValue(o, ya(h !== void 0 ? h : c, { owner: a }));
        }
    }
    for (const o in u) l[o] === void 0 && a.removeValue(o);
    return l;
  }
  const Ld = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete",
  ];
  class Sb {
    scrapeMotionValuesFromProps(l, u, o) {
      return {};
    }
    constructor(
      {
        parent: l,
        props: u,
        presenceContext: o,
        reducedMotionConfig: c,
        blockInitialAnimation: d,
        visualState: h,
      },
      g = {}
    ) {
      (this.current = null),
        (this.children = new Set()),
        (this.isVariantNode = !1),
        (this.isControllingVariants = !1),
        (this.shouldReduceMotion = null),
        (this.values = new Map()),
        (this.KeyframeResolver = Zu),
        (this.features = {}),
        (this.valueSubscriptions = new Map()),
        (this.prevMotionValues = {}),
        (this.events = {}),
        (this.propEventSubscriptions = {}),
        (this.notifyUpdate = () => this.notify("Update", this.latestValues)),
        (this.render = () => {
          this.current &&
            (this.triggerBuild(),
            this.renderInstance(
              this.current,
              this.renderState,
              this.props.style,
              this.projection
            ));
        }),
        (this.renderScheduledAt = 0),
        (this.scheduleRender = () => {
          const x = le.now();
          this.renderScheduledAt < x &&
            ((this.renderScheduledAt = x), Rt.render(this.render, !1, !0));
        });
      const { latestValues: p, renderState: m } = h;
      (this.latestValues = p),
        (this.baseTarget = { ...p }),
        (this.initialValues = u.initial ? { ...p } : {}),
        (this.renderState = m),
        (this.parent = l),
        (this.props = u),
        (this.presenceContext = o),
        (this.depth = l ? l.depth + 1 : 0),
        (this.reducedMotionConfig = c),
        (this.options = g),
        (this.blockInitialAnimation = !!d),
        (this.isControllingVariants = Bl(u)),
        (this.isVariantNode = dh(u)),
        this.isVariantNode && (this.variantChildren = new Set()),
        (this.manuallyAnimateOnMount = !!(l && l.current));
      const { willChange: v, ...T } = this.scrapeMotionValuesFromProps(
        u,
        {},
        this
      );
      for (const x in T) {
        const V = T[x];
        p[x] !== void 0 && It(V) && V.set(p[x], !1);
      }
    }
    mount(l) {
      (this.current = l),
        gb.set(l, this),
        this.projection &&
          !this.projection.instance &&
          this.projection.mount(l),
        this.parent &&
          this.isVariantNode &&
          !this.isControllingVariants &&
          (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach((u, o) => this.bindToMotionValue(o, u)),
        Nd.current || yb(),
        (this.shouldReduceMotion =
          this.reducedMotionConfig === "never"
            ? !1
            : this.reducedMotionConfig === "always"
            ? !0
            : Eo.current),
        this.parent && this.parent.children.add(this),
        this.update(this.props, this.presenceContext);
    }
    unmount() {
      this.projection && this.projection.unmount(),
        dn(this.notifyUpdate),
        dn(this.render),
        this.valueSubscriptions.forEach((l) => l()),
        this.valueSubscriptions.clear(),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent && this.parent.children.delete(this);
      for (const l in this.events) this.events[l].clear();
      for (const l in this.features) {
        const u = this.features[l];
        u && (u.unmount(), (u.isMounted = !1));
      }
      this.current = null;
    }
    bindToMotionValue(l, u) {
      this.valueSubscriptions.has(l) && this.valueSubscriptions.get(l)();
      const o = pa.has(l);
      o && this.onBindTransform && this.onBindTransform();
      const c = u.on("change", (g) => {
          (this.latestValues[l] = g),
            this.props.onUpdate && Rt.preRender(this.notifyUpdate),
            o && this.projection && (this.projection.isTransformDirty = !0);
        }),
        d = u.on("renderRequest", this.scheduleRender);
      let h;
      window.MotionCheckAppearSync &&
        (h = window.MotionCheckAppearSync(this, l, u)),
        this.valueSubscriptions.set(l, () => {
          c(), d(), h && h(), u.owner && u.stop();
        });
    }
    sortNodePosition(l) {
      return !this.current ||
        !this.sortInstanceNodePosition ||
        this.type !== l.type
        ? 0
        : this.sortInstanceNodePosition(this.current, l.current);
    }
    updateFeatures() {
      let l = "animation";
      for (l in ga) {
        const u = ga[l];
        if (!u) continue;
        const { isEnabled: o, Feature: c } = u;
        if (
          (!this.features[l] &&
            c &&
            o(this.props) &&
            (this.features[l] = new c(this)),
          this.features[l])
        ) {
          const d = this.features[l];
          d.isMounted ? d.update() : (d.mount(), (d.isMounted = !0));
        }
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.props);
    }
    measureViewportBox() {
      return this.current
        ? this.measureInstanceViewportBox(this.current, this.props)
        : Bt();
    }
    getStaticValue(l) {
      return this.latestValues[l];
    }
    setStaticValue(l, u) {
      this.latestValues[l] = u;
    }
    update(l, u) {
      (l.transformTemplate || this.props.transformTemplate) &&
        this.scheduleRender(),
        (this.prevProps = this.props),
        (this.props = l),
        (this.prevPresenceContext = this.presenceContext),
        (this.presenceContext = u);
      for (let o = 0; o < Ld.length; o++) {
        const c = Ld[o];
        this.propEventSubscriptions[c] &&
          (this.propEventSubscriptions[c](),
          delete this.propEventSubscriptions[c]);
        const d = "on" + c,
          h = l[d];
        h && (this.propEventSubscriptions[c] = this.on(c, h));
      }
      (this.prevMotionValues = vb(
        this,
        this.scrapeMotionValuesFromProps(l, this.prevProps, this),
        this.prevMotionValues
      )),
        this.handleChildMotionValue && this.handleChildMotionValue();
    }
    getProps() {
      return this.props;
    }
    getVariant(l) {
      return this.props.variants ? this.props.variants[l] : void 0;
    }
    getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
      return this.isVariantNode
        ? this
        : this.parent
        ? this.parent.getClosestVariantNode()
        : void 0;
    }
    addVariantChild(l) {
      const u = this.getClosestVariantNode();
      if (u)
        return (
          u.variantChildren && u.variantChildren.add(l),
          () => u.variantChildren.delete(l)
        );
    }
    addValue(l, u) {
      const o = this.values.get(l);
      u !== o &&
        (o && this.removeValue(l),
        this.bindToMotionValue(l, u),
        this.values.set(l, u),
        (this.latestValues[l] = u.get()));
    }
    removeValue(l) {
      this.values.delete(l);
      const u = this.valueSubscriptions.get(l);
      u && (u(), this.valueSubscriptions.delete(l)),
        delete this.latestValues[l],
        this.removeValueFromRenderState(l, this.renderState);
    }
    hasValue(l) {
      return this.values.has(l);
    }
    getValue(l, u) {
      if (this.props.values && this.props.values[l])
        return this.props.values[l];
      let o = this.values.get(l);
      return (
        o === void 0 &&
          u !== void 0 &&
          ((o = ya(u === null ? void 0 : u, { owner: this })),
          this.addValue(l, o)),
        o
      );
    }
    readValue(l, u) {
      let o =
        this.latestValues[l] !== void 0 || !this.current
          ? this.latestValues[l]
          : this.getBaseTargetFromProps(this.props, l) ??
            this.readValueFromInstance(this.current, l, this.options);
      return (
        o != null &&
          (typeof o == "string" && (Wc(o) || tf(o))
            ? (o = parseFloat(o))
            : !Yv(o) && pn.test(u) && (o = Wf(l, u)),
          this.setBaseTarget(l, It(o) ? o.get() : o)),
        It(o) ? o.get() : o
      );
    }
    setBaseTarget(l, u) {
      this.baseTarget[l] = u;
    }
    getBaseTarget(l) {
      const { initial: u } = this.props;
      let o;
      if (typeof u == "string" || typeof u == "object") {
        const d = so(this.props, u, this.presenceContext?.custom);
        d && (o = d[l]);
      }
      if (u && o !== void 0) return o;
      const c = this.getBaseTargetFromProps(this.props, l);
      return c !== void 0 && !It(c)
        ? c
        : this.initialValues[l] !== void 0 && o === void 0
        ? void 0
        : this.baseTarget[l];
    }
    on(l, u) {
      return (
        this.events[l] || (this.events[l] = new yu()), this.events[l].add(u)
      );
    }
    notify(l, ...u) {
      this.events[l] && this.events[l].notify(...u);
    }
  }
  class Hd extends Sb {
    constructor() {
      super(...arguments), (this.KeyframeResolver = Ov);
    }
    sortInstanceNodePosition(l, u) {
      return l.compareDocumentPosition(u) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(l, u) {
      return l.style ? l.style[u] : void 0;
    }
    removeValueFromRenderState(l, { vars: u, style: o }) {
      delete u[l], delete o[l];
    }
    handleChildMotionValue() {
      this.childSubscription &&
        (this.childSubscription(), delete this.childSubscription);
      const { children: l } = this.props;
      It(l) &&
        (this.childSubscription = l.on("change", (u) => {
          this.current && (this.current.textContent = `${u}`);
        }));
    }
  }
  function qd(a, { style: l, vars: u }, o, c) {
    const d = a.style;
    let h;
    for (h in l) d[h] = l[h];
    c?.applyProjectionStyles(d, o);
    for (h in u) d.setProperty(h, u[h]);
  }
  function bb(a) {
    return window.getComputedStyle(a);
  }
  class Tb extends Hd {
    constructor() {
      super(...arguments), (this.type = "html"), (this.renderInstance = qd);
    }
    readValueFromInstance(l, u) {
      if (pa.has(u)) return this.projection?.isProjecting ? Hu(u) : Pg(l, u);
      {
        const o = bb(l),
          c = (bu(u) ? o.getPropertyValue(u) : o[u]) || 0;
        return typeof c == "string" ? c.trim() : c;
      }
    }
    measureInstanceViewportBox(l, { transformPagePoint: u }) {
      return Kh(l, u);
    }
    build(l, u, o) {
      ao(l, u, o.transformTemplate);
    }
    scrapeMotionValuesFromProps(l, u, o) {
      return uo(l, u, o);
    }
  }
  const Yd = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust",
  ]);
  function xb(a, l, u, o) {
    qd(a, l, void 0, o);
    for (const c in l.attrs) a.setAttribute(Yd.has(c) ? c : no(c), l.attrs[c]);
  }
  class Ab extends Hd {
    constructor() {
      super(...arguments),
        (this.type = "svg"),
        (this.isSVGTag = !1),
        (this.measureInstanceViewportBox = Bt);
    }
    getBaseTargetFromProps(l, u) {
      return l[u];
    }
    readValueFromInstance(l, u) {
      if (pa.has(u)) {
        const o = $f(u);
        return (o && o.default) || 0;
      }
      return (u = Yd.has(u) ? u : no(u)), l.getAttribute(u);
    }
    scrapeMotionValuesFromProps(l, u, o) {
      return Mh(l, u, o);
    }
    build(l, u, o) {
      bh(l, u, this.isSVGTag, o.transformTemplate, o.style);
    }
    renderInstance(l, u, o, c) {
      xb(l, u, o, c);
    }
    mount(l) {
      (this.isSVGTag = xh(l.tagName)), super.mount(l);
    }
  }
  const Eb = (a, l) =>
      lo(a) ? new Ab(l) : new Tb(l, { allowProjection: a !== L.Fragment }),
    Mb = E1({ ...F1, ...mb, ...ab, ...pb }, Eb),
    te = Fv(Mb);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Db = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
    Rb = (a) =>
      a.replace(/^([A-Z])|[\s-_]+(\w)/g, (l, u, o) =>
        o ? o.toUpperCase() : u.toLowerCase()
      ),
    Gd = (a) => {
      const l = Rb(a);
      return l.charAt(0).toUpperCase() + l.slice(1);
    },
    Xd = (...a) =>
      a
        .filter((l, u, o) => !!l && l.trim() !== "" && o.indexOf(l) === u)
        .join(" ")
        .trim(),
    Cb = (a) => {
      for (const l in a)
        if (l.startsWith("aria-") || l === "role" || l === "title") return !0;
    };
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ var Ob = {
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
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const zb = L.forwardRef(
    (
      {
        color: a = "currentColor",
        size: l = 24,
        strokeWidth: u = 2,
        absoluteStrokeWidth: o,
        className: c = "",
        children: d,
        iconNode: h,
        ...g
      },
      p
    ) =>
      L.createElement(
        "svg",
        {
          ref: p,
          ...Ob,
          width: l,
          height: l,
          stroke: a,
          strokeWidth: o ? (Number(u) * 24) / Number(l) : u,
          className: Xd("lucide", c),
          ...(!d && !Cb(g) && { "aria-hidden": "true" }),
          ...g,
        },
        [
          ...h.map(([m, v]) => L.createElement(m, v)),
          ...(Array.isArray(d) ? d : [d]),
        ]
      )
  );
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const se = (a, l) => {
    const u = L.forwardRef(({ className: o, ...c }, d) =>
      L.createElement(zb, {
        ref: d,
        iconNode: l,
        className: Xd(`lucide-${Db(Gd(a))}`, `lucide-${a}`, o),
        ...c,
      })
    );
    return (u.displayName = Gd(a)), u;
  };
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Mo = se("bot", [
    ["path", { d: "M12 8V4H8", key: "hb8ula" }],
    [
      "rect",
      { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" },
    ],
    ["path", { d: "M2 14h2", key: "vft8re" }],
    ["path", { d: "M20 14h2", key: "4cs60a" }],
    ["path", { d: "M15 13v2", key: "1xurst" }],
    ["path", { d: "M9 13v2", key: "rq6x2g" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Vb = se("loader-circle", [
    ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const _b = se("maximize-2", [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "m21 3-7 7", key: "1l2asr" }],
    ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
    ["path", { d: "M9 21H3v-6", key: "wtvkvv" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Zd = se("message-circle", [
    ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Ub = se("mic", [
    ["path", { d: "M12 19v3", key: "npa21l" }],
    ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
    [
      "rect",
      { x: "9", y: "2", width: "6", height: "13", rx: "3", key: "s6n7sd" },
    ],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const wb = se("minimize-2", [
    ["path", { d: "m14 10 7-7", key: "oa77jy" }],
    ["path", { d: "M20 10h-6V4", key: "mjg0md" }],
    ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
    ["path", { d: "M4 14h6v6", key: "rmj7iw" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const jb = se("send", [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3",
      },
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Bb = se("trash-2", [
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
    ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
    ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Nb = se("user", [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Lb = se("volume-2", [
    [
      "path",
      {
        d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
        key: "uqj9uw",
      },
    ],
    ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
    ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Hb = se("volume-x", [
    [
      "path",
      {
        d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
        key: "uqj9uw",
      },
    ],
    ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
    ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const qb = se("wifi-off", [
    ["path", { d: "M12 20h.01", key: "zekei9" }],
    ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
    ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
    ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
    ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
    ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
    ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Yb = se("wifi", [
    ["path", { d: "M12 20h.01", key: "zekei9" }],
    ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
    ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
    ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ]);
  /**
   * @license lucide-react v0.525.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */ const Gb = se("x", [
      ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
      ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
    ]),
    Xb = "http://localhost:8000/api/voice/token",
    Zb = ({
      setMessages: a,
      shouldStartCall: l,
      setShouldStartCall: u,
      setGenerating: o,
      prompt: c,
    }) => {
      const d = L.useRef(null),
        h = L.useRef(null),
        g = L.useRef(null),
        p = L.useRef(null),
        m = L.useRef(null),
        v = L.useRef(null),
        T = L.useRef(""),
        [x, V] = L.useState(!1),
        [w, G] = L.useState(!1);
      L.useEffect(() => {
        const k = document.createElement("style");
        return (
          (k.innerHTML = `
      @keyframes voice-pulse {
        0%, 100% { transform: scaleY(0.3); opacity: 0.3; }
        50%      { transform: scaleY(1);   opacity: 1;   }
      }
    `),
          document.head.appendChild(k),
          () => {
            document.head.removeChild(k);
          }
        );
      }, []);
      const Q = async () => {
          o(!1),
            V(!1),
            u(!1),
            h.current &&
              (h.current.getSenders().forEach((k) => k.track?.stop()),
              h.current.close(),
              (h.current = null)),
            d.current?.readyState === "open" && d.current.close(),
            g.current &&
              (g.current.getTracks().forEach((k) => k.stop()),
              (g.current = null)),
            p.current &&
              (p.current.pause(),
              (p.current.currentTime = 0),
              (p.current.srcObject = null)),
            v.current && (v.current.disconnect(), (v.current = null)),
            await m.current?.close(),
            (m.current = null),
            G(!1);
        },
        Z = async () => {
          try {
            o(!0);
            const k = await fetch(Xb, { method: "GET" }),
              { client_secret: tt } = await k.json(),
              F = tt.value,
              ut = new RTCPeerConnection();
            (h.current = ut),
              (g.current = await navigator.mediaDevices.getUserMedia({
                audio: !0,
              }));
            const [St] = g.current.getTracks();
            ut.addTrack(St);
            const Et = ut.createDataChannel("oai-events");
            (d.current = Et),
              (Et.onopen = () => {
                const Dt = {
                  type: "session.update",
                  session: {
                    instructions: `Speak in a warm, clear and strong Indian accent. Keep conversation friendly and educational.


+${c}`,
                    input_audio_transcription: { model: "whisper-1" },
                  },
                };
                Et.send(JSON.stringify(Dt));
              }),
              (Et.onmessage = (Dt) => {
                const z = JSON.parse(Dt.data),
                  { type: N, transcript: J, text: ot, delta: S } = z;
                if (
                  N === "conversation.item.input_audio_transcription.completed"
                ) {
                  const O = J || ot;
                  O &&
                    a({
                      id: Date.now().toString(),
                      content: O,
                      sender: "user",
                      timestamp: new Date(),
                    });
                }
                if (
                  (N === "response.audio_transcript.delta" && (T.current += S),
                  N === "response.audio_transcript.done")
                ) {
                  const O = T.current.trim();
                  O &&
                    a({
                      id: (Date.now() + 1).toString(),
                      content: O,
                      sender: "bot",
                      timestamp: new Date(),
                    }),
                    (T.current = "");
                }
              }),
              (ut.ontrack = (Dt) => {
                const z = Dt.streams[0];
                if (p.current) {
                  (p.current.srcObject = z), (p.current.volume = 1);
                  const H = p.current.play();
                  H !== void 0 &&
                    H.catch((X) => {
                      console.error("Audio playback error:", X),
                        m.current?.state === "suspended" && m.current.resume();
                    });
                }
                const N = new AudioContext();
                m.current = N;
                const J = N.createMediaStreamSource(z);
                v.current = J;
                const ot = N.createAnalyser();
                (ot.fftSize = 512), J.connect(ot);
                const S = new Uint8Array(ot.frequencyBinCount),
                  O = setInterval(() => {
                    ot.getByteFrequencyData(S);
                    const H = S.reduce((X, $) => X + $, 0) / S.length;
                    V(H > 10);
                  }, 300);
                z.getTracks().forEach((H) =>
                  H.addEventListener("ended", () => {
                    clearInterval(O), V(!1);
                  })
                );
              });
            const Ct = await ut.createOffer();
            await ut.setLocalDescription(Ct);
            const ue = {
              type: "answer",
              sdp: await (
                await fetch(
                  "https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17",
                  {
                    method: "POST",
                    body: Ct.sdp,
                    headers: {
                      Authorization: `Bearer ${F}`,
                      "Content-Type": "application/sdp",
                    },
                  }
                )
              ).text(),
            };
            await ut.setRemoteDescription(ue), G(!0), o(!1);
          } catch (k) {
            console.error("Start call error:", k), o(!1), Q();
          }
        };
      L.useEffect(
        () => (
          l && !w && Z(),
          !l && w && Q(),
          () => {
            Q();
          }
        ),
        [l]
      );
      const K = {
          border: "none",
          borderRadius: "50%",
          padding: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s",
          backgroundColor: w ? "#C70039" : "#228B22",
          opacity: w ? "0.75" : "1",
        },
        Y = { height: "1.5rem", width: "1.5rem", color: "#ffffff" },
        I = {
          display: "flex",
          alignItems: "flex-end",
          gap: "0.25rem",
          height: "1.5rem",
        },
        q = {
          width: "3px",
          height: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: "2px",
          animation: "voice-pulse 1s infinite ease-in-out",
        };
      return B.jsxs(B.Fragment, {
        children: [
          B.jsx("button", {
            onClick: () => (w ? Q() : u(!0)),
            style: K,
            children:
              w && x
                ? B.jsx("div", {
                    style: I,
                    children: [0, 1, 2, 3].map((k) =>
                      B.jsx(
                        "div",
                        { style: { ...q, animationDelay: `${k * 0.15}s` } },
                        k
                      )
                    ),
                  })
                : B.jsx(Ub, { style: Y }),
          }),
          B.jsx("audio", {
            ref: p,
            autoPlay: !0,
            playsInline: !0,
            controls: !1,
            style: { display: "none" },
          }),
        ],
      });
    },
    Qb = "http://localhost:8000/api/theme/6843f2fbae76a4ebf974c3",
    Kb = "http://localhost:8000/api/chat";
  function kb() {
    const [a, l] = L.useState(null),
      [u, o] = L.useState([]),
      [c, d] = L.useState(""),
      [h, g] = L.useState(!1),
      [p, m] = L.useState(!1),
      [v, T] = L.useState(!1),
      [x, V] = L.useState(!0),
      [w, G] = L.useState(!0),
      [Q, Z] = L.useState(0),
      [K, Y] = L.useState(null),
      [I, q] = L.useState(null),
      [k, tt] = L.useState(!1),
      F = L.useRef(null),
      ut = L.useRef(null),
      St = L.useRef(null);
    window.addEventListener("storage", (S) => {
      if (S.key === "theme") {
        const O = JSON.parse(S.newValue);
        l(O);
      }
    }),
      L.useEffect(() => {
        const S = localStorage.getItem("chatSessionId"),
          O = localStorage.getItem("chatUserId");
        if (S && O) Y(S), q(O);
        else {
          const H = "session_" + Date.now(),
            X = "user_" + Date.now();
          Y(H),
            q(X),
            localStorage.setItem("chatSessionId", H),
            localStorage.setItem("chatUserId", X);
        }
        fetch(Qb)
          .then((H) => H.json())
          .then((H) => {
            l(H), localStorage.setItem("theme", JSON.stringify(H));
          })
          .catch(() => {
            const H = localStorage.getItem("theme");
            H && l(JSON.parse(H));
          });
      }, []),
      L.useEffect(() => {
        p &&
          !v &&
          F.current &&
          F.current.scrollIntoView({ behavior: "smooth" });
      }, [u, p, v, h]),
      L.useEffect(() => {
        p && !v && St.current && setTimeout(() => St.current?.focus(), 100);
      }, [p, v]),
      L.useEffect(() => {
        !p &&
          u.length > 0 &&
          u[u.length - 1].sender === "bot" &&
          Z((O) => O + 1);
      }, [u, p]);
    const Et = async () => {
        if (!c.trim()) return;
        const S = {
          id: Date.now().toString(),
          content: c,
          sender: "user",
          timestamp: new Date(),
        };
        o((O) => [...O, S]), d(""), g(!0);
        try {
          const O = await fetch(Kb, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [...u, S].map(($) => ({
                role: $.sender === "user" ? "user" : "assistant",
                content: $.content,
              })),
              sessionId: K,
              userId: I,
              prompt: a?.prompt,
            }),
          });
          if (!O.ok) throw new Error("Failed to get response");
          const H = await O.json(),
            X = {
              id: (Date.now() + 1).toString(),
              content:
                H.response || "I'm sorry, I couldn't process your request.",
              sender: "bot",
              timestamp: new Date(),
            };
          o(($) => [...$, X]), a?.soundEnabled && w && Ct(), V(!0);
        } catch (O) {
          console.error("Chat error:", O), V(!1);
          const H = {
            id: (Date.now() + 1).toString(),
            content: "Sorry, there was an error. Please try again.",
            sender: "bot",
            timestamp: new Date(),
          };
          o((X) => [...X, H]);
        } finally {
          g(!1);
        }
      },
      Ct = () => {
        ut.current && ut.current.play().catch(() => {});
      },
      De = (S) => {
        S.key === "Enter" && !S.shiftKey && (S.preventDefault(), Et());
      },
      ue = () => {
        m(!p), p || (Z(0), T(!1));
      },
      Dt = () => {
        o([]);
      },
      z = (S) =>
        new Date(S).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      N = () => {
        if (!a)
          return {
            position: "fixed",
            bottom: "16px",
            right: "16px",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          };
        const { position: S } = a,
          O = { position: "fixed", zIndex: 50, display: "flex" };
        switch (S) {
          case "bottom-right":
            return {
              ...O,
              bottom: "16px",
              right: "16px",
              flexDirection: "column",
              alignItems: "flex-end",
            };
          case "bottom-left":
            return {
              ...O,
              bottom: "16px",
              left: "16px",
              flexDirection: "column",
              alignItems: "flex-start",
            };
          case "top-right":
            return {
              ...O,
              top: "16px",
              right: "16px",
              flexDirection: "column-reverse",
              alignItems: "flex-end",
            };
          case "top-left":
            return {
              ...O,
              top: "16px",
              left: "16px",
              flexDirection: "column-reverse",
              alignItems: "flex-start",
            };
          default:
            return {
              ...O,
              bottom: "16px",
              right: "16px",
              flexDirection: "column",
              alignItems: "flex-end",
            };
        }
      },
      J = () => {
        if (!a) return { marginTop: "16px" };
        const { position: S } = a;
        return S.startsWith("top")
          ? { marginBottom: "16px" }
          : { marginTop: "16px" };
      },
      ot = () =>
        B.jsxs("div", {
          style: { display: "inline-flex", alignItems: "center" },
          children: [
            [0, 1, 2].map((S) =>
              B.jsx(
                "span",
                {
                  style: {
                    height: "6px",
                    width: "6px",
                    backgroundColor: "currentColor",
                    borderRadius: "50%",
                    display: "inline-block",
                    margin: "0 1px",
                    opacity: 0.4,
                    animation: "typing 1.4s infinite ease-in-out",
                    animationDelay:
                      S === 0 ? "-0.32s" : S === 1 ? "-0.16s" : "0s",
                  },
                },
                S
              )
            ),
            B.jsx("style", {
              children: `
          @keyframes typing {
            0%, 80%, 100% {
              transform: scale(0.8);
              opacity: 0.4;
            }
            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `,
            }),
          ],
        });
    return a
      ? B.jsxs("div", {
          style: { fontFamily: "system-ui, -apple-system, sans-serif" },
          children: [
            B.jsx("style", {
              children: `
          :root { --chat-primary: ${a.primaryColor}; }
          .chat-messages { scrollbar-width: thin; scrollbar-color: var(--chat-primary) transparent; }
          .chat-messages::-webkit-scrollbar { width: 0px; height: 5px; }
          .chat-messages::-webkit-scrollbar-track { background: transparent !important; }
          .chat-messages::-webkit-scrollbar-thumb {
            background-color: var(--chat-primary);
            background-image: linear-gradient(#030712, #111827, #030712);
            border-radius: 100px;
          }
        `,
            }),
            B.jsx("audio", {
              ref: ut,
              preload: "auto",
              src: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSR+zPLNeSsFJnzH7+KSQQATN7rt5pyOHw5Cgt/tzVorBzl+x+zfkzoEL3TE89uEQA4AAAAAaGVhZA==",
            }),
            B.jsxs("div", {
              style: N(),
              children: [
                B.jsxs(te.button, {
                  initial: { scale: 0.8, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  onClick: ue,
                  style: {
                    position: "relative",
                    backgroundColor: a.primaryColor,
                    borderRadius: a.borderRadius,
                    boxShadow: `0 8px 32px ${a.shadowColor}`,
                    border: "none",
                    cursor: "pointer",
                    width: "56px",
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    overflow: "hidden",
                  },
                  "aria-label": p ? "Close chat" : "Open chat",
                  children: [
                    B.jsx(te.div, {
                      style: {
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.2), transparent)",
                        borderRadius: a.borderRadius,
                      },
                      animate: { opacity: p ? 0 : [0.2, 0.4, 0.2] },
                      transition: {
                        duration: 2,
                        repeat: 1 / 0,
                        ease: "easeInOut",
                      },
                    }),
                    B.jsx(Iu, {
                      mode: "wait",
                      children: p
                        ? B.jsx(
                            te.div,
                            {
                              initial: { rotate: -90, scale: 0 },
                              animate: { rotate: 0, scale: 1 },
                              exit: { rotate: 90, scale: 0 },
                              transition: { duration: 0.2 },
                              children: B.jsx(Gb, { size: 24 }),
                            },
                            "close"
                          )
                        : B.jsxs(
                            te.div,
                            {
                              initial: { rotate: 90, scale: 0 },
                              animate: { rotate: 0, scale: 1 },
                              exit: { rotate: -90, scale: 0 },
                              transition: { duration: 0.2 },
                              style: { position: "relative" },
                              children: [
                                B.jsx(Zd, { size: 24 }),
                                Q > 0 &&
                                  B.jsxs(te.div, {
                                    initial: { scale: 0 },
                                    animate: { scale: 1 },
                                    style: {
                                      position: "absolute",
                                      top: "-4px",
                                      right: "-4px",
                                      width: "20px",
                                      height: "20px",
                                      backgroundColor: "#ef4444",
                                      borderRadius: "50%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                      color: "white",
                                      animation: "bounce 0.5s ease-in-out",
                                    },
                                    children: [
                                      Q > 9 ? "9+" : Q,
                                      B.jsx("style", {
                                        children: `
                        @keyframes bounce {
                          0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
                          40%, 43% { transform: translate3d(0, -8px, 0); }
                          70% { transform: translate3d(0, -4px, 0); }
                          90% { transform: translate3d(0, -2px, 0); }
                        }
                      `,
                                      }),
                                    ],
                                  }),
                              ],
                            },
                            "chat"
                          ),
                    }),
                  ],
                }),
                B.jsx(Iu, {
                  children:
                    p &&
                    B.jsxs(te.div, {
                      initial: {
                        opacity: 0,
                        scale: 0.8,
                        y: a.position.startsWith("top") ? -20 : 20,
                      },
                      animate: { opacity: 1, scale: 1, y: 0 },
                      exit: {
                        opacity: 0,
                        scale: 0.8,
                        y: a.position.startsWith("top") ? -20 : 20,
                      },
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      },
                      style: {
                        backgroundColor: a.backgroundColor,
                        borderRadius: a.borderRadius,
                        width: "min(380px, 90vw)",
                        height: v ? "60px" : "min(600px, 80vh)",
                        maxHeight: v ? "60px" : "600px",
                        border: `1px solid ${a.primaryColor}20`,
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        overflow: "hidden",
                        ...J(),
                      },
                      children: [
                        B.jsxs(te.div, {
                          initial: { y: -20, opacity: 0 },
                          animate: { y: 0, opacity: 1 },
                          transition: { delay: 0.1 },
                          style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "16px",
                            borderBottom: `1px solid ${a.primaryColor}15`,
                            backgroundColor: a.headerFooterBgColor,
                            borderTopLeftRadius: a.borderRadius,
                            borderTopRightRadius: a.borderRadius,
                          },
                          children: [
                            B.jsxs("div", {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              },
                              children: [
                                B.jsxs("div", {
                                  style: { position: "relative" },
                                  children: [
                                    B.jsx("img", {
                                      src: a.companyLogo,
                                      alt: "",
                                      style: {
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        padding: "5px",
                                        border: `2px solid ${a.primaryColor}30`,
                                      },
                                    }),
                                    B.jsx(te.div, {
                                      animate: {
                                        scale: x ? [1, 1.2, 1] : 1,
                                        opacity: x ? [0.7, 1, 0.7] : 0.3,
                                      },
                                      transition: {
                                        duration: 2,
                                        repeat: x ? 1 / 0 : 0,
                                      },
                                      style: {
                                        position: "absolute",
                                        bottom: "-2px",
                                        right: "-2px",
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        backgroundColor: x
                                          ? "#10b981"
                                          : "#ef4444",
                                      },
                                    }),
                                  ],
                                }),
                                B.jsxs("div", {
                                  children: [
                                    B.jsx("h3", {
                                      style: {
                                        fontWeight: 600,
                                        fontSize: a.fontSize,
                                        color: a.textColor,
                                        margin: 0,
                                      },
                                      children: a.companyName,
                                    }),
                                    B.jsx("div", {
                                      style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        fontSize: "12px",
                                        opacity: 0.75,
                                        color: a.textColor,
                                      },
                                      children: x
                                        ? B.jsxs(B.Fragment, {
                                            children: [
                                              B.jsx(Yb, { size: 12 }),
                                              B.jsx("span", {
                                                children: "Online",
                                              }),
                                            ],
                                          })
                                        : B.jsxs(B.Fragment, {
                                            children: [
                                              B.jsx(qb, { size: 12 }),
                                              B.jsx("span", {
                                                children: "Reconnecting...",
                                              }),
                                            ],
                                          }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            B.jsxs("div", {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              },
                              children: [
                                B.jsx(te.button, {
                                  whileHover: { scale: 1.1 },
                                  whileTap: { scale: 0.9 },
                                  onClick: () => T(!v),
                                  style: {
                                    padding: "6px",
                                    borderRadius: "50%",
                                    backgroundColor: `${a.textColor}10`,
                                    color: a.textColor,
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  },
                                  title: v ? "Maximize" : "Minimize",
                                  children: v
                                    ? B.jsx(_b, { size: 14 })
                                    : B.jsx(wb, { size: 14 }),
                                }),
                                a.soundEnabled &&
                                  B.jsx(te.button, {
                                    whileHover: { scale: 1.1 },
                                    whileTap: { scale: 0.9 },
                                    onClick: () => G(!w),
                                    style: {
                                      padding: "6px",
                                      borderRadius: "50%",
                                      backgroundColor: w
                                        ? `${a.primaryColor}20`
                                        : `${a.textColor}10`,
                                      color: w ? a.primaryColor : a.textColor,
                                      border: "none",
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    },
                                    title: w ? "Disable sound" : "Enable sound",
                                    children: w
                                      ? B.jsx(Lb, { size: 14 })
                                      : B.jsx(Hb, { size: 14 }),
                                  }),
                                B.jsx(te.button, {
                                  whileHover: { scale: 1.1 },
                                  whileTap: { scale: 0.9 },
                                  onClick: Dt,
                                  style: {
                                    padding: "6px",
                                    borderRadius: "50%",
                                    backgroundColor: `${a.textColor}10`,
                                    color: a.textColor,
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  },
                                  title: "Clear chat",
                                  children: B.jsx(Bb, { size: 14 }),
                                }),
                              ],
                            }),
                          ],
                        }),
                        !v &&
                          B.jsxs(B.Fragment, {
                            children: [
                              B.jsx("div", {
                                className: "chat-messages",
                                style: {
                                  flex: 1,
                                  overflowY: "auto",
                                  padding: "16px",
                                  backgroundColor: a.backgroundColor,
                                  maxHeight: "calc(100% - 140px)",
                                },
                                children: B.jsxs("div", {
                                  style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "16px",
                                  },
                                  children: [
                                    B.jsxs(Iu, {
                                      children: [
                                        u.length === 0 &&
                                          B.jsxs(te.div, {
                                            initial: { opacity: 0, y: 20 },
                                            animate: { opacity: 1, y: 0 },
                                            style: {
                                              textAlign: "center",
                                              padding: "32px 0",
                                            },
                                            children: [
                                              B.jsx("div", {
                                                style: {
                                                  width: "64px",
                                                  height: "64px",
                                                  margin: "0 auto 16px",
                                                  borderRadius: "50%",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  backgroundColor: `${a.primaryColor}15`,
                                                  color: a.primaryColor,
                                                },
                                                children: B.jsx(Mo, {
                                                  size: 32,
                                                }),
                                              }),
                                              B.jsx("p", {
                                                style: {
                                                  fontSize: "14px",
                                                  opacity: 0.75,
                                                  color: a.textColor,
                                                  margin: 0,
                                                },
                                                children:
                                                  "Hi! I'm here to help you. Start a conversation!",
                                              }),
                                            ],
                                          }),
                                        u.map((S, O) =>
                                          B.jsx(
                                            te.div,
                                            {
                                              initial: {
                                                opacity: 0,
                                                y: 20,
                                                scale: 0.95,
                                              },
                                              animate: {
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                              },
                                              exit: {
                                                opacity: 0,
                                                y: -20,
                                                scale: 0.95,
                                              },
                                              transition: {
                                                duration: 0.3,
                                                delay: O * 0.05,
                                              },
                                              style: {
                                                display: "flex",
                                                justifyContent:
                                                  S.sender === "user"
                                                    ? "flex-end"
                                                    : "flex-start",
                                              },
                                              children: B.jsxs("div", {
                                                style: {
                                                  display: "flex",
                                                  alignItems: "flex-end",
                                                  gap: "8px",
                                                  maxWidth: "85%",
                                                  flexDirection:
                                                    S.sender === "user"
                                                      ? "row-reverse"
                                                      : "row",
                                                },
                                                children: [
                                                  B.jsx("div", {
                                                    style: {
                                                      width: "24px",
                                                      height: "24px",
                                                      borderRadius: "50%",
                                                      display: "flex",
                                                      alignItems: "center",
                                                      justifyContent: "center",
                                                      flexShrink: 0,
                                                      backgroundColor:
                                                        S.sender === "user"
                                                          ? a.userMessageBgColor
                                                          : a.primaryColor,
                                                      color: "white",
                                                    },
                                                    children:
                                                      S.sender === "user"
                                                        ? B.jsx(Nb, {
                                                            size: 12,
                                                          })
                                                        : B.jsx(Mo, {
                                                            size: 12,
                                                          }),
                                                  }),
                                                  B.jsxs("div", {
                                                    style: {
                                                      padding: "12px",
                                                      backgroundColor:
                                                        S.sender === "user"
                                                          ? a.userMessageBgColor
                                                          : a.aiMessageBgColor,
                                                      color:
                                                        S.sender === "user"
                                                          ? "white"
                                                          : a.textColor,
                                                      borderRadius:
                                                        a.borderRadius,
                                                      fontSize: a.fontSize,
                                                    },
                                                    children: [
                                                      B.jsx("p", {
                                                        style: {
                                                          margin: 0,
                                                          lineHeight: 1.5,
                                                          wordBreak:
                                                            "break-word",
                                                        },
                                                        children: S.content,
                                                      }),
                                                      B.jsx("p", {
                                                        style: {
                                                          fontSize: "12px",
                                                          marginTop: "4px",
                                                          marginBottom: 0,
                                                          opacity: 0.75,
                                                          color:
                                                            S.sender === "user"
                                                              ? "rgba(255,255,255,0.8)"
                                                              : `${a.textColor}80`,
                                                        },
                                                        children: z(
                                                          S.timestamp
                                                        ),
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            },
                                            S.id
                                          )
                                        ),
                                      ],
                                    }),
                                    h &&
                                      B.jsxs(te.div, {
                                        initial: { opacity: 0, y: 10 },
                                        animate: { opacity: 1, y: 0 },
                                        style: {
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "8px",
                                        },
                                        children: [
                                          B.jsx("div", {
                                            style: {
                                              width: "24px",
                                              height: "24px",
                                              borderRadius: "50%",
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              backgroundColor: a.primaryColor,
                                              color: "white",
                                            },
                                            children: B.jsx(Mo, { size: 12 }),
                                          }),
                                          B.jsxs("div", {
                                            style: {
                                              padding: "12px",
                                              backgroundColor:
                                                a.aiMessageBgColor,
                                              borderRadius: a.borderRadius,
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "8px",
                                            },
                                            children: [
                                              B.jsx(ot, {}),
                                              B.jsxs("span", {
                                                style: {
                                                  fontSize: "14px",
                                                  color: a.textColor,
                                                  marginLeft: "8px",
                                                },
                                                children: [
                                                  a.companyName,
                                                  " is typing...",
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    B.jsx("div", { ref: F }),
                                  ],
                                }),
                              }),
                              B.jsx(te.div, {
                                initial: { y: 20, opacity: 0 },
                                animate: { y: 0, opacity: 1 },
                                transition: { delay: 0.2 },
                                style: {
                                  padding: "16px",
                                  borderTop: `1px solid ${a.primaryColor}15`,
                                  backgroundColor: a.inputContainerBgColor,
                                },
                                children: B.jsx("div", {
                                  style: {
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "8px",
                                  },
                                  children: B.jsxs("div", {
                                    style: {
                                      position: "relative",
                                      flex: 1,
                                      display: "flex",
                                      alignItems: "center",
                                    },
                                    children: [
                                      B.jsx("input", {
                                        ref: St,
                                        value: c,
                                        onChange: (S) => d(S.target.value),
                                        onKeyPress: De,
                                        placeholder: `Message ${a.companyName}...`,
                                        disabled: h,
                                        style: {
                                          width: "100%",
                                          padding: "12px 48px 12px 48px",
                                          borderRadius: a.borderRadius,
                                          border: `1px solid ${a.primaryColor}20`,
                                          outline: "none",
                                          resize: "none",
                                          backgroundColor: a.backgroundColor,
                                          color: a.textColor,
                                          fontSize: a.fontSize,
                                          transition: "all 0.2s ease",
                                          boxShadow: "none",
                                        },
                                        onFocus: (S) => {
                                          S.target.style.boxShadow = `0 0 0 2px ${a.primaryColor}30`;
                                        },
                                        onBlur: (S) => {
                                          S.target.style.boxShadow = "none";
                                        },
                                      }),
                                      a.voiceEnabled &&
                                        B.jsx("div", {
                                          style: {
                                            position: "absolute",
                                            right: "45px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            zIndex: 1,
                                          },
                                          children: B.jsx(Zb, {
                                            messages: u,
                                            setMessages: (S) =>
                                              o((O) => [...O, S]),
                                            shouldStartCall: k,
                                            setShouldStartCall: tt,
                                            setGenerating: g,
                                            prompt: a.prompt || "",
                                          }),
                                        }),
                                      B.jsxs("div", {
                                        onClick: Et,
                                        disabled: !c.trim() || h,
                                        style: {
                                          position: "absolute",
                                          right: "8px",
                                          top: "6px",
                                          padding: "8px",
                                          borderRadius: "50%",
                                          border: "none",
                                          backgroundColor: a.primaryColor,
                                          color: "white",
                                          cursor:
                                            !c.trim() || h
                                              ? "not-allowed"
                                              : "pointer",
                                          opacity: !c.trim() || h ? 0.5 : 1,
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          transition: "all 0.2s ease",
                                        },
                                        title: "Send message",
                                        children: [
                                          h
                                            ? B.jsx(Vb, {
                                                size: 18,
                                                style: {
                                                  animation:
                                                    "spin 1s linear infinite",
                                                },
                                              })
                                            : B.jsx(jb, { size: 18 }),
                                          B.jsx("style", {
                                            children: `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          }),
                        B.jsx(te.div, {
                          initial: { opacity: 0 },
                          animate: { opacity: 1 },
                          transition: { delay: 0.3 },
                          style: {
                            padding: "8px 16px",
                            textAlign: "center",
                            borderTop: `1px solid ${a.primaryColor}15`,
                            backgroundColor: a.headerFooterBgColor,
                            borderBottomLeftRadius: a.borderRadius,
                            borderBottomRightRadius: a.borderRadius,
                          },
                          children: B.jsxs("div", {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                              fontSize: "12px",
                              opacity: 0.75,
                              color: a.textColor,
                            },
                            children: [
                              B.jsx("img", {
                                src: a.footerLogo || a.companyLogo,
                                alt: "",
                                style: {
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "50%",
                                },
                              }),
                              B.jsxs("span", {
                                children: ["Powered by ", a.companyName],
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                }),
              ],
            }),
          ],
        })
      : B.jsx("div", {
          style: {
            position: "fixed",
            bottom: "16px",
            right: "16px",
            zIndex: 50,
          },
          children: B.jsxs("div", {
            style: {
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#3B82F6",
              background:
                "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
              backgroundSize: "200px 100%",
              animation: "shimmer 1.5s infinite",
            },
            children: [
              B.jsx(Zd, { size: 24, color: "white" }),
              B.jsx("style", {
                children: `
              @keyframes shimmer {
                0% { background-position: -200px 0; }
                100% { background-position: calc(200px + 100%) 0; }
              }
            `,
              }),
            ],
          }),
        });
  }
  window.ChatBotWidget = {
    mount: (a = "body") => {
      const l = document.createElement("div");
      (l.id = "chat-bot-widget-root"),
        document.querySelector(a)?.appendChild(l),
        K0.createRoot(l).render(B.jsx(kb, {}));
    },
  };
})();
