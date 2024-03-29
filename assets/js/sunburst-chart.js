// Version 1.3.1 sunburst-chart - https://github.com/vasturiano/sunburst-chart
! function(t, n) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t.Sunburst = n()
}(this, function() {
    "use strict";
    var r = "http://www.w3.org/1999/xhtml",
        i = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: r,
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        };

    function o(t) {
        var n = t += "",
            e = n.indexOf(":");
        return 0 <= e && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)), i.hasOwnProperty(n) ? {
            space: i[n],
            local: t
        } : t
    }

    function u(t) {
        var n = o(t);
        return (n.local ? function(t) {
            return function() {
                return this.ownerDocument.createElementNS(t.space, t.local)
            }
        } : function(e) {
            return function() {
                var t = this.ownerDocument,
                    n = this.namespaceURI;
                return n === r && t.documentElement.namespaceURI === r ? t.createElement(e) : t.createElementNS(n, e)
            }
        })(n)
    }

    function n() {}

    function p(t) {
        return null == t ? n : function() {
            return this.querySelector(t)
        }
    }

    function e() {
        return []
    }

    function v(t) {
        return null == t ? e : function() {
            return this.querySelectorAll(t)
        }
    }
    var t = function(t) {
        return function() {
            return this.matches(t)
        }
    };
    if ("undefined" != typeof document) {
        var a = document.documentElement;
        if (!a.matches) {
            var s = a.webkitMatchesSelector || a.msMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector;
            t = function(t) {
                return function() {
                    return s.call(this, t)
                }
            }
        }
    }
    var l = t;

    function c(t) {
        return new Array(t.length)
    }

    function d(t, n) {
        this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n
    }
    d.prototype = {
        constructor: d,
        appendChild: function(t) {
            return this._parent.insertBefore(t, this._next)
        },
        insertBefore: function(t, n) {
            return this._parent.insertBefore(t, n)
        },
        querySelector: function(t) {
            return this._parent.querySelector(t)
        },
        querySelectorAll: function(t) {
            return this._parent.querySelectorAll(t)
        }
    };
    var g = "$";

    function M(t, n, e, r, i, o) {
        for (var u, a = 0, s = n.length, c = o.length; a < c; ++a)(u = n[a]) ? (u.__data__ = o[a], r[a] = u) : e[a] = new d(t, o[a]);
        for (; a < s; ++a)(u = n[a]) && (i[a] = u)
    }

    function b(t, n, e, r, i, o, u) {
        var a, s, c, l = {},
            f = n.length,
            h = o.length,
            p = new Array(f);
        for (a = 0; a < f; ++a)(s = n[a]) && (p[a] = c = g + u.call(s, s.__data__, a, n), c in l ? i[a] = s : l[c] = s);
        for (a = 0; a < h; ++a)(s = l[c = g + u.call(t, o[a], a, o)]) ? ((r[a] = s).__data__ = o[a], l[c] = null) : e[a] = new d(t, o[a]);
        for (a = 0; a < f; ++a)(s = n[a]) && l[p[a]] === s && (i[a] = s)
    }

    function f(t, n) {
        return t < n ? -1 : n < t ? 1 : n <= t ? 0 : NaN
    }

    function h(t) {
        return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
    }

    function x(t, n) {
        return t.style.getPropertyValue(n) || h(t).getComputedStyle(t, null).getPropertyValue(n)
    }

    function y(t) {
        return t.trim().split(/^|\s+/)
    }

    function m(t) {
        return t.classList || new _(t)
    }

    function _(t) {
        this._node = t, this._names = y(t.getAttribute("class") || "")
    }

    function w(t, n) {
        for (var e = m(t), r = -1, i = n.length; ++r < i;) e.add(n[r])
    }

    function T(t, n) {
        for (var e = m(t), r = -1, i = n.length; ++r < i;) e.remove(n[r])
    }

    function C() {
        this.textContent = ""
    }

    function A() {
        this.innerHTML = ""
    }

    function N() {
        this.nextSibling && this.parentNode.appendChild(this)
    }

    function S() {
        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
    }

    function k() {
        return null
    }

    function D() {
        var t = this.parentNode;
        t && t.removeChild(this)
    }

    function U() {
        return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling)
    }

    function E() {
        return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling)
    }
    _.prototype = {
        add: function(t) {
            this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")))
        },
        remove: function(t) {
            var n = this._names.indexOf(t);
            0 <= n && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")))
        },
        contains: function(t) {
            return 0 <= this._names.indexOf(t)
        }
    };
    var P = {},
        F = null;
    "undefined" != typeof document && ("onmouseenter" in document.documentElement || (P = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }));

    function O(e, t, n) {
        return e = Y(e, t, n),
            function(t) {
                var n = t.relatedTarget;
                n && (n === this || 8 & n.compareDocumentPosition(this)) || e.call(this, t)
            }
    }

    function Y(e, r, i) {
        return function(t) {
            var n = F;
            F = t;
            try {
                e.call(this, this.__data__, r, i)
            } finally {
                F = n
            }
        }
    }

    function j(o) {
        return function() {
            var t = this.__on;
            if (t) {
                for (var n, e = 0, r = -1, i = t.length; e < i; ++e) n = t[e], o.type && n.type !== o.type || n.name !== o.name ? t[++r] = n : this.removeEventListener(n.type, n.listener, n.capture);
                ++r ? t.length = r : delete this.__on
            }
        }
    }

    function L(s, c, l) {
        var f = P.hasOwnProperty(s.type) ? O : Y;
        return function(t, n, e) {
            var r, i = this.__on,
                o = f(c, n, e);
            if (i)
                for (var u = 0, a = i.length; u < a; ++u)
                    if ((r = i[u]).type === s.type && r.name === s.name) return this.removeEventListener(r.type, r.listener, r.capture), this.addEventListener(r.type, r.listener = o, r.capture = l), void(r.value = c);
            this.addEventListener(s.type, o, l), r = {
                type: s.type,
                name: s.name,
                value: c,
                listener: o,
                capture: l
            }, i ? i.push(r) : this.__on = [r]
        }
    }

    function z(t, n, e) {
        var r = h(t),
            i = r.CustomEvent;
        "function" == typeof i ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i)
    }
    var H = [null];

    function I(t, n) {
        this._groups = t, this._parents = n
    }

    function q() {
        return new I([
            [document.documentElement]
        ], H)
    }

    function X(t) {
        return "string" == typeof t ? new I([
            [document.querySelector(t)]
        ], [document.documentElement]) : new I([
            [t]
        ], H)
    }

    function R(t, n) {
        return t < n ? -1 : n < t ? 1 : n <= t ? 0 : NaN
    }
    I.prototype = q.prototype = {
        constructor: I,
        select: function(t) {
            "function" != typeof t && (t = p(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
                for (var o, u, a = n[i], s = a.length, c = r[i] = new Array(s), l = 0; l < s; ++l)(o = a[l]) && (u = t.call(o, o.__data__, l, a)) && ("__data__" in o && (u.__data__ = o.__data__), c[l] = u);
            return new I(r, this._parents)
        },
        selectAll: function(t) {
            "function" != typeof t && (t = v(t));
            for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
                for (var u, a = n[o], s = a.length, c = 0; c < s; ++c)(u = a[c]) && (r.push(t.call(u, u.__data__, c, a)), i.push(u));
            return new I(r, i)
        },
        filter: function(t) {
            "function" != typeof t && (t = l(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
                for (var o, u = n[i], a = u.length, s = r[i] = [], c = 0; c < a; ++c)(o = u[c]) && t.call(o, o.__data__, c, u) && s.push(o);
            return new I(r, this._parents)
        },
        data: function(t, n) {
            if (!t) return d = new Array(this.size()), l = -1, this.each(function(t) {
                d[++l] = t
            }), d;
            var e, r = n ? b : M,
                i = this._parents,
                o = this._groups;
            "function" != typeof t && (e = t, t = function() {
                return e
            });
            for (var u = o.length, a = new Array(u), s = new Array(u), c = new Array(u), l = 0; l < u; ++l) {
                var f = i[l],
                    h = o[l],
                    p = h.length,
                    d = t.call(f, f && f.__data__, l, i),
                    g = d.length,
                    y = s[l] = new Array(g),
                    v = a[l] = new Array(g);
                r(f, h, y, v, c[l] = new Array(p), d, n);
                for (var m, _, w = 0, x = 0; w < g; ++w)
                    if (m = y[w]) {
                        for (x <= w && (x = w + 1); !(_ = v[x]) && ++x < g;);
                        m._next = _ || null
                    }
            }
            return (a = new I(a, i))._enter = s, a._exit = c, a
        },
        enter: function() {
            return new I(this._enter || this._groups.map(c), this._parents)
        },
        exit: function() {
            return new I(this._exit || this._groups.map(c), this._parents)
        },
        merge: function(t) {
            for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
                for (var s, c = n[a], l = e[a], f = c.length, h = u[a] = new Array(f), p = 0; p < f; ++p)(s = c[p] || l[p]) && (h[p] = s);
            for (; a < r; ++a) u[a] = n[a];
            return new I(u, this._parents)
        },
        order: function() {
            for (var t = this._groups, n = -1, e = t.length; ++n < e;)
                for (var r, i = t[n], o = i.length - 1, u = i[o]; 0 <= --o;)(r = i[o]) && (u && u !== r.nextSibling && u.parentNode.insertBefore(r, u), u = r);
            return this
        },
        sort: function(e) {
            function t(t, n) {
                return t && n ? e(t.__data__, n.__data__) : !t - !n
            }
            e || (e = f);
            for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
                for (var u, a = n[o], s = a.length, c = i[o] = new Array(s), l = 0; l < s; ++l)(u = a[l]) && (c[l] = u);
                c.sort(t)
            }
            return new I(i, this._parents).order()
        },
        call: function() {
            var t = arguments[0];
            return arguments[0] = this, t.apply(null, arguments), this
        },
        nodes: function() {
            var t = new Array(this.size()),
                n = -1;
            return this.each(function() {
                t[++n] = this
            }), t
        },
        node: function() {
            for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
                for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
                    var u = r[i];
                    if (u) return u
                }
            return null
        },
        size: function() {
            var t = 0;
            return this.each(function() {
                ++t
            }), t
        },
        empty: function() {
            return !this.node()
        },
        each: function(t) {
            for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
                for (var i, o = n[e], u = 0, a = o.length; u < a; ++u)(i = o[u]) && t.call(i, i.__data__, u, o);
            return this
        },
        attr: function(t, n) {
            var e = o(t);
            if (arguments.length < 2) {
                var r = this.node();
                return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e)
            }
            return this.each((null == n ? e.local ? function(t) {
                return function() {
                    this.removeAttributeNS(t.space, t.local)
                }
            } : function(t) {
                return function() {
                    this.removeAttribute(t)
                }
            } : "function" == typeof n ? e.local ? function(n, e) {
                return function() {
                    var t = e.apply(this, arguments);
                    null == t ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, t)
                }
            } : function(n, e) {
                return function() {
                    var t = e.apply(this, arguments);
                    null == t ? this.removeAttribute(n) : this.setAttribute(n, t)
                }
            } : e.local ? function(t, n) {
                return function() {
                    this.setAttributeNS(t.space, t.local, n)
                }
            } : function(t, n) {
                return function() {
                    this.setAttribute(t, n)
                }
            })(e, n))
        },
        style: function(t, n, e) {
            return 1 < arguments.length ? this.each((null == n ? function(t) {
                return function() {
                    this.style.removeProperty(t)
                }
            } : "function" == typeof n ? function(n, e, r) {
                return function() {
                    var t = e.apply(this, arguments);
                    null == t ? this.style.removeProperty(n) : this.style.setProperty(n, t, r)
                }
            } : function(t, n, e) {
                return function() {
                    this.style.setProperty(t, n, e)
                }
            })(t, n, null == e ? "" : e)) : x(this.node(), t)
        },
        property: function(t, n) {
            return 1 < arguments.length ? this.each((null == n ? function(t) {
                return function() {
                    delete this[t]
                }
            } : "function" == typeof n ? function(n, e) {
                return function() {
                    var t = e.apply(this, arguments);
                    null == t ? delete this[n] : this[n] = t
                }
            } : function(t, n) {
                return function() {
                    this[t] = n
                }
            })(t, n)) : this.node()[t]
        },
        classed: function(t, n) {
            var e = y(t + "");
            if (arguments.length < 2) {
                for (var r = m(this.node()), i = -1, o = e.length; ++i < o;)
                    if (!r.contains(e[i])) return !1;
                return !0
            }
            return this.each(("function" == typeof n ? function(t, n) {
                return function() {
                    (n.apply(this, arguments) ? w : T)(this, t)
                }
            } : n ? function(t) {
                return function() {
                    w(this, t)
                }
            } : function(t) {
                return function() {
                    T(this, t)
                }
            })(e, n))
        },
        text: function(t) {
            return arguments.length ? this.each(null == t ? C : ("function" == typeof t ? function(n) {
                return function() {
                    var t = n.apply(this, arguments);
                    this.textContent = null == t ? "" : t
                }
            } : function(t) {
                return function() {
                    this.textContent = t
                }
            })(t)) : this.node().textContent
        },
        html: function(t) {
            return arguments.length ? this.each(null == t ? A : ("function" == typeof t ? function(n) {
                return function() {
                    var t = n.apply(this, arguments);
                    this.innerHTML = null == t ? "" : t
                }
            } : function(t) {
                return function() {
                    this.innerHTML = t
                }
            })(t)) : this.node().innerHTML
        },
        raise: function() {
            return this.each(N)
        },
        lower: function() {
            return this.each(S)
        },
        append: function(t) {
            var n = "function" == typeof t ? t : u(t);
            return this.select(function() {
                return this.appendChild(n.apply(this, arguments))
            })
        },
        insert: function(t, n) {
            var e = "function" == typeof t ? t : u(t),
                r = null == n ? k : "function" == typeof n ? n : p(n);
            return this.select(function() {
                return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null)
            })
        },
        remove: function() {
            return this.each(D)
        },
        clone: function(t) {
            return this.select(t ? E : U)
        },
        datum: function(t) {
            return arguments.length ? this.property("__data__", t) : this.node().__data__
        },
        on: function(t, n, e) {
            var r, i, o = (t + "").trim().split(/^|\s+/).map(function(t) {
                    var n = "",
                        e = t.indexOf(".");
                    return 0 <= e && (n = t.slice(e + 1), t = t.slice(0, e)), {
                        type: t,
                        name: n
                    }
                }),
                u = o.length;
            if (!(arguments.length < 2)) {
                for (a = n ? L : j, null == e && (e = !1), r = 0; r < u; ++r) this.each(a(o[r], n, e));
                return this
            }
            var a = this.node().__on;
            if (a)
                for (var s, c = 0, l = a.length; c < l; ++c)
                    for (r = 0, s = a[c]; r < u; ++r)
                        if ((i = o[r]).type === s.type && i.name === s.name) return s.value
        },
        dispatch: function(t, n) {
            return this.each(("function" == typeof n ? function(t, n) {
                return function() {
                    return z(this, t, n.apply(this, arguments))
                }
            } : function(t, n) {
                return function() {
                    return z(this, t, n)
                }
            })(t, n))
        }
    };
    var B, V, $ = (1 === (B = R).length && (V = B, B = function(t, n) {
            return R(V(t), n)
        }), {
            left: function(t, n, e, r) {
                for (null == e && (e = 0), null == r && (r = t.length); e < r;) {
                    var i = e + r >>> 1;
                    B(t[i], n) < 0 ? e = i + 1 : r = i
                }
                return e
            },
            right: function(t, n, e, r) {
                for (null == e && (e = 0), null == r && (r = t.length); e < r;) {
                    var i = e + r >>> 1;
                    0 < B(t[i], n) ? r = i : e = i + 1
                }
                return e
            }
        }).right,
        Z = Math.sqrt(50),
        W = Math.sqrt(10),
        Q = Math.sqrt(2);

    function J(t, n, e) {
        var r = (n - t) / Math.max(0, e),
            i = Math.floor(Math.log(r) / Math.LN10),
            o = r / Math.pow(10, i);
        return 0 <= i ? (Z <= o ? 10 : W <= o ? 5 : Q <= o ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (Z <= o ? 10 : W <= o ? 5 : Q <= o ? 2 : 1)
    }
    var G = "$";

    function K() {}

    function tt(t, n) {
        var e = new K;
        if (t instanceof K) t.each(function(t, n) {
            e.set(n, t)
        });
        else if (Array.isArray(t)) {
            var r, i = -1,
                o = t.length;
            if (null == n)
                for (; ++i < o;) e.set(i, t[i]);
            else
                for (; ++i < o;) e.set(n(r = t[i], i, t), r)
        } else if (t)
            for (var u in t) e.set(u, t[u]);
        return e
    }

    function nt() {}
    K.prototype = tt.prototype = {
        constructor: K,
        has: function(t) {
            return G + t in this
        },
        get: function(t) {
            return this[G + t]
        },
        set: function(t, n) {
            return this[G + t] = n, this
        },
        remove: function(t) {
            var n = G + t;
            return n in this && delete this[n]
        },
        clear: function() {
            for (var t in this) t[0] === G && delete this[t]
        },
        keys: function() {
            var t = [];
            for (var n in this) n[0] === G && t.push(n.slice(1));
            return t
        },
        values: function() {
            var t = [];
            for (var n in this) n[0] === G && t.push(this[n]);
            return t
        },
        entries: function() {
            var t = [];
            for (var n in this) n[0] === G && t.push({
                key: n.slice(1),
                value: this[n]
            });
            return t
        },
        size: function() {
            var t = 0;
            for (var n in this) n[0] === G && ++t;
            return t
        },
        empty: function() {
            for (var t in this)
                if (t[0] === G) return !1;
            return !0
        },
        each: function(t) {
            for (var n in this) n[0] === G && t(this[n], n.slice(1), this)
        }
    };
    var et = tt.prototype;
    nt.prototype = function(t, n) {
        var e = new nt;
        if (t instanceof nt) t.each(function(t) {
            e.add(t)
        });
        else if (t) {
            var r = -1,
                i = t.length;
            if (null == n)
                for (; ++r < i;) e.add(t[r]);
            else
                for (; ++r < i;) e.add(n(t[r], r, t))
        }
        return e
    }.prototype = {
        constructor: nt,
        has: et.has,
        add: function(t) {
            return this[G + (t += "")] = t, this
        },
        remove: et.remove,
        clear: et.clear,
        values: et.keys,
        size: et.size,
        empty: et.empty,
        each: et.each
    };
    var rt = Array.prototype,
        it = rt.map,
        ot = rt.slice;

    function ut(t, n, e) {
        t.prototype = n.prototype = e, e.constructor = t
    }

    function at(t, n) {
        var e = Object.create(t.prototype);
        for (var r in n) e[r] = n[r];
        return e
    }

    function st() {}
    var ct = 1 / .7,
        lt = "\\s*([+-]?\\d+)\\s*",
        ft = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        ht = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        pt = /^#([0-9a-f]{3})$/,
        dt = /^#([0-9a-f]{6})$/,
        gt = new RegExp("^rgb\\(" + [lt, lt, lt] + "\\)$"),
        yt = new RegExp("^rgb\\(" + [ht, ht, ht] + "\\)$"),
        vt = new RegExp("^rgba\\(" + [lt, lt, lt, ft] + "\\)$"),
        mt = new RegExp("^rgba\\(" + [ht, ht, ht, ft] + "\\)$"),
        _t = new RegExp("^hsl\\(" + [ft, ht, ht] + "\\)$"),
        wt = new RegExp("^hsla\\(" + [ft, ht, ht, ft] + "\\)$"),
        xt = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        };

    function Mt(t) {
        var n;
        return t = (t + "").trim().toLowerCase(), (n = pt.exec(t)) ? new Nt((n = parseInt(n[1], 16)) >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1) : (n = dt.exec(t)) ? bt(parseInt(n[1], 16)) : (n = gt.exec(t)) ? new Nt(n[1], n[2], n[3], 1) : (n = yt.exec(t)) ? new Nt(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = vt.exec(t)) ? Tt(n[1], n[2], n[3], n[4]) : (n = mt.exec(t)) ? Tt(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = _t.exec(t)) ? kt(n[1], n[2] / 100, n[3] / 100, 1) : (n = wt.exec(t)) ? kt(n[1], n[2] / 100, n[3] / 100, n[4]) : xt.hasOwnProperty(t) ? bt(xt[t]) : "transparent" === t ? new Nt(NaN, NaN, NaN, 0) : null
    }

    function bt(t) {
        return new Nt(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
    }

    function Tt(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new Nt(t, n, e, r)
    }

    function Ct(t) {
        return t instanceof st || (t = Mt(t)), t ? new Nt((t = t.rgb()).r, t.g, t.b, t.opacity) : new Nt
    }

    function At(t, n, e, r) {
        return 1 === arguments.length ? Ct(t) : new Nt(t, n, e, null == r ? 1 : r)
    }

    function Nt(t, n, e, r) {
        this.r = +t, this.g = +n, this.b = +e, this.opacity = +r
    }

    function St(t) {
        return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? "0" : "") + t.toString(16)
    }

    function kt(t, n, e, r) {
        return r <= 0 ? t = n = e = NaN : e <= 0 || 1 <= e ? t = n = NaN : n <= 0 && (t = NaN), new Dt(t, n, e, r)
    }

    function Dt(t, n, e, r) {
        this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
    }

    function Ut(t, n, e) {
        return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n)
    }
    ut(st, Mt, {
        displayable: function() {
            return this.rgb().displayable()
        },
        hex: function() {
            return this.rgb().hex()
        },
        toString: function() {
            return this.rgb() + ""
        }
    }), ut(Nt, At, at(st, {
        brighter: function(t) {
            return t = null == t ? ct : Math.pow(ct, t), new Nt(this.r * t, this.g * t, this.b * t, this.opacity)
        },
        darker: function(t) {
            return t = null == t ? .7 : Math.pow(.7, t), new Nt(this.r * t, this.g * t, this.b * t, this.opacity)
        },
        rgb: function() {
            return this
        },
        displayable: function() {
            return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1
        },
        hex: function() {
            return "#" + St(this.r) + St(this.g) + St(this.b)
        },
        toString: function() {
            var t = this.opacity;
            return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
        }
    })), ut(Dt, function(t, n, e, r) {
        return 1 === arguments.length ? function(t) {
            if (t instanceof Dt) return new Dt(t.h, t.s, t.l, t.opacity);
            if (t instanceof st || (t = Mt(t)), !t) return new Dt;
            if (t instanceof Dt) return t;
            var n = (t = t.rgb()).r / 255,
                e = t.g / 255,
                r = t.b / 255,
                i = Math.min(n, e, r),
                o = Math.max(n, e, r),
                u = NaN,
                a = o - i,
                s = (o + i) / 2;
            return a ? (u = n === o ? (e - r) / a + 6 * (e < r) : e === o ? (r - n) / a + 2 : (n - e) / a + 4, a /= s < .5 ? o + i : 2 - o - i, u *= 60) : a = 0 < s && s < 1 ? 0 : u, new Dt(u, a, s, t.opacity)
        }(t) : new Dt(t, n, e, null == r ? 1 : r)
    }, at(st, {
        brighter: function(t) {
            return t = null == t ? ct : Math.pow(ct, t), new Dt(this.h, this.s, this.l * t, this.opacity)
        },
        darker: function(t) {
            return t = null == t ? .7 : Math.pow(.7, t), new Dt(this.h, this.s, this.l * t, this.opacity)
        },
        rgb: function() {
            var t = this.h % 360 + 360 * (this.h < 0),
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < .5 ? e : 1 - e) * n,
                i = 2 * e - r;
            return new Nt(Ut(240 <= t ? t - 240 : t + 120, i, r), Ut(t, i, r), Ut(t < 120 ? t + 240 : t - 120, i, r), this.opacity)
        },
        displayable: function() {
            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
        }
    }));
    var Et = Math.PI / 180,
        Pt = 180 / Math.PI,
        Ft = .96422,
        Ot = 1,
        Yt = .82521,
        jt = 4 / 29,
        Lt = 6 / 29,
        zt = 3 * Lt * Lt,
        Ht = Lt * Lt * Lt;

    function It(t) {
        if (t instanceof qt) return new qt(t.l, t.a, t.b, t.opacity);
        if (t instanceof $t) {
            if (isNaN(t.h)) return new qt(t.l, 0, 0, t.opacity);
            var n = t.h * Et;
            return new qt(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity)
        }
        t instanceof Nt || (t = Ct(t));
        var e, r, i = Vt(t.r),
            o = Vt(t.g),
            u = Vt(t.b),
            a = Xt((.2225045 * i + .7168786 * o + .0606169 * u) / Ot);
        return i === o && o === u ? e = r = a : (e = Xt((.4360747 * i + .3850649 * o + .1430804 * u) / Ft), r = Xt((.0139322 * i + .0971045 * o + .7141733 * u) / Yt)), new qt(116 * a - 16, 500 * (e - a), 200 * (a - r), t.opacity)
    }

    function qt(t, n, e, r) {
        this.l = +t, this.a = +n, this.b = +e, this.opacity = +r
    }

    function Xt(t) {
        return Ht < t ? Math.pow(t, 1 / 3) : t / zt + jt
    }

    function Rt(t) {
        return Lt < t ? t * t * t : zt * (t - jt)
    }

    function Bt(t) {
        return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055)
    }

    function Vt(t) {
        return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
    }

    function $t(t, n, e, r) {
        this.h = +t, this.c = +n, this.l = +e, this.opacity = +r
    }
    ut(qt, function(t, n, e, r) {
        return 1 === arguments.length ? It(t) : new qt(t, n, e, null == r ? 1 : r)
    }, at(st, {
        brighter: function(t) {
            return new qt(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
        },
        darker: function(t) {
            return new qt(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
        },
        rgb: function() {
            var t = (this.l + 16) / 116,
                n = isNaN(this.a) ? t : t + this.a / 500,
                e = isNaN(this.b) ? t : t - this.b / 200;
            return new Nt(Bt(3.1338561 * (n = Ft * Rt(n)) - 1.6168667 * (t = Ot * Rt(t)) - .4906146 * (e = Yt * Rt(e))), Bt(-.9787684 * n + 1.9161415 * t + .033454 * e), Bt(.0719453 * n - .2289914 * t + 1.4052427 * e), this.opacity)
        }
    })), ut($t, function(t, n, e, r) {
        return 1 === arguments.length ? function(t) {
            if (t instanceof $t) return new $t(t.h, t.c, t.l, t.opacity);
            if (t instanceof qt || (t = It(t)), 0 === t.a && 0 === t.b) return new $t(NaN, 0, t.l, t.opacity);
            var n = Math.atan2(t.b, t.a) * Pt;
            return new $t(n < 0 ? n + 360 : n, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity)
        }(t) : new $t(t, n, e, null == r ? 1 : r)
    }, at(st, {
        brighter: function(t) {
            return new $t(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity)
        },
        darker: function(t) {
            return new $t(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity)
        },
        rgb: function() {
            return It(this).rgb()
        }
    }));
    var Zt = 1.78277,
        Wt = -.29227,
        Qt = -.90649,
        Jt = 1.97294,
        Gt = Jt * Qt,
        Kt = Jt * Zt,
        tn = Zt * Wt - -.14861 * Qt;

    function nn(t, n, e, r) {
        this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
    }

    function en(t) {
        return function() {
            return t
        }
    }

    function rn(o) {
        return 1 == (o = +o) ? on : function(t, n) {
            return n - t ? (e = t, r = n, i = o, e = Math.pow(e, i), r = Math.pow(r, i) - e, i = 1 / i, function(t) {
                return Math.pow(e + t * r, i)
            }) : en(isNaN(t) ? n : t);
            var e, r, i
        }
    }

    function on(t, n) {
        var e, r, i = n - t;
        return i ? (e = t, r = i, function(t) {
            return e + t * r
        }) : en(isNaN(t) ? n : t)
    }
    ut(nn, function(t, n, e, r) {
        return 1 === arguments.length ? function(t) {
            if (t instanceof nn) return new nn(t.h, t.s, t.l, t.opacity);
            t instanceof Nt || (t = Ct(t));
            var n = t.r / 255,
                e = t.g / 255,
                r = t.b / 255,
                i = (tn * r + Gt * n - Kt * e) / (tn + Gt - Kt),
                o = r - i,
                u = (Jt * (e - i) - Wt * o) / Qt,
                a = Math.sqrt(u * u + o * o) / (Jt * i * (1 - i)),
                s = a ? Math.atan2(u, o) * Pt - 120 : NaN;
            return new nn(s < 0 ? s + 360 : s, a, i, t.opacity)
        }(t) : new nn(t, n, e, null == r ? 1 : r)
    }, at(st, {
        brighter: function(t) {
            return t = null == t ? ct : Math.pow(ct, t), new nn(this.h, this.s, this.l * t, this.opacity)
        },
        darker: function(t) {
            return t = null == t ? .7 : Math.pow(.7, t), new nn(this.h, this.s, this.l * t, this.opacity)
        },
        rgb: function() {
            var t = isNaN(this.h) ? 0 : (this.h + 120) * Et,
                n = +this.l,
                e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
                r = Math.cos(t),
                i = Math.sin(t);
            return new Nt(255 * (n + e * (-.14861 * r + Zt * i)), 255 * (n + e * (Wt * r + Qt * i)), 255 * (n + e * (Jt * r)), this.opacity)
        }
    }));
    var un = function t(n) {
        var u = rn(n);

        function e(n, t) {
            var e = u((n = At(n)).r, (t = At(t)).r),
                r = u(n.g, t.g),
                i = u(n.b, t.b),
                o = on(n.opacity, t.opacity);
            return function(t) {
                return n.r = e(t), n.g = r(t), n.b = i(t), n.opacity = o(t), n + ""
            }
        }
        return e.gamma = t, e
    }(1);

    function an(n, e) {
        return e -= n = +n,
            function(t) {
                return n + e * t
            }
    }
    var sn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        cn = new RegExp(sn.source, "g");

    function ln(t, r) {
        var n, e, i, o, u, a = sn.lastIndex = cn.lastIndex = 0,
            s = -1,
            c = [],
            l = [];
        for (t += "", r += "";
            (n = sn.exec(t)) && (e = cn.exec(r));)(i = e.index) > a && (i = r.slice(a, i), c[s] ? c[s] += i : c[++s] = i), (n = n[0]) === (e = e[0]) ? c[s] ? c[s] += e : c[++s] = e : (c[++s] = null, l.push({
            i: s,
            x: an(n, e)
        })), a = cn.lastIndex;
        return a < r.length && (i = r.slice(a), c[s] ? c[s] += i : c[++s] = i), c.length < 2 ? l[0] ? (u = l[0].x, function(t) {
            return u(t) + ""
        }) : (o = r, function() {
            return o
        }) : (r = l.length, function(t) {
            for (var n, e = 0; e < r; ++e) c[(n = l[e]).i] = n.x(t);
            return c.join("")
        })
    }

    function fn(t, n) {
        var e, r = typeof n;
        return null == n || "boolean" === r ? en(n) : ("number" === r ? an : "string" === r ? (e = Mt(n)) ? (n = e, un) : ln : n instanceof Mt ? un : n instanceof Date ? function(n, e) {
            var r = new Date;
            return e -= n = +n,
                function(t) {
                    return r.setTime(n + e * t), r
                }
        } : Array.isArray(n) ? function(t, n) {
            var e, r = n ? n.length : 0,
                i = t ? Math.min(r, t.length) : 0,
                o = new Array(i),
                u = new Array(r);
            for (e = 0; e < i; ++e) o[e] = fn(t[e], n[e]);
            for (; e < r; ++e) u[e] = n[e];
            return function(t) {
                for (e = 0; e < i; ++e) u[e] = o[e](t);
                return u
            }
        } : "function" != typeof n.valueOf && "function" != typeof n.toString || isNaN(n) ? function(t, n) {
            var e, r = {},
                i = {};
            for (e in null !== t && "object" == typeof t || (t = {}), null !== n && "object" == typeof n || (n = {}), n) e in t ? r[e] = fn(t[e], n[e]) : i[e] = n[e];
            return function(t) {
                for (e in r) i[e] = r[e](t);
                return i
            }
        } : an)(t, n)
    }

    function hn(n, e) {
        return e -= n = +n,
            function(t) {
                return Math.round(n + e * t)
            }
    }
    var pn, dn, gn, yn, vn = 180 / Math.PI,
        mn = {
            translateX: 0,
            translateY: 0,
            rotate: 0,
            skewX: 0,
            scaleX: 1,
            scaleY: 1
        };

    function _n(t, n, e, r, i, o) {
        var u, a, s;
        return (u = Math.sqrt(t * t + n * n)) && (t /= u, n /= u), (s = t * e + n * r) && (e -= t * s, r -= n * s), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, s /= a), t * r < n * e && (t = -t, n = -n, s = -s, u = -u), {
            translateX: i,
            translateY: o,
            rotate: Math.atan2(n, t) * vn,
            skewX: Math.atan(s) * vn,
            scaleX: u,
            scaleY: a
        }
    }

    function wn(h, p, d, g) {
        function y(t) {
            return t.length ? t.pop() + " " : ""
        }
        return function(t, n) {
            var e, r, i, o, u, a, s, c, l = [],
                f = [];
            return t = h(t), n = h(n),
                function(t, n, e, r, i, o) {
                    if (t !== e || n !== r) {
                        var u = i.push("translate(", null, p, null, d);
                        o.push({
                            i: u - 4,
                            x: an(t, e)
                        }, {
                            i: u - 2,
                            x: an(n, r)
                        })
                    } else(e || r) && i.push("translate(" + e + p + r + d)
                }(t.translateX, t.translateY, n.translateX, n.translateY, l, f), e = t.rotate, r = n.rotate, i = l, o = f, e !== r ? (180 < e - r ? r += 360 : 180 < r - e && (e += 360), o.push({
                    i: i.push(y(i) + "rotate(", null, g) - 2,
                    x: an(e, r)
                })) : r && i.push(y(i) + "rotate(" + r + g), u = t.skewX, a = n.skewX, s = l, c = f, u !== a ? c.push({
                    i: s.push(y(s) + "skewX(", null, g) - 2,
                    x: an(u, a)
                }) : a && s.push(y(s) + "skewX(" + a + g),
                function(t, n, e, r, i, o) {
                    if (t !== e || n !== r) {
                        var u = i.push(y(i) + "scale(", null, ",", null, ")");
                        o.push({
                            i: u - 4,
                            x: an(t, e)
                        }, {
                            i: u - 2,
                            x: an(n, r)
                        })
                    } else 1 === e && 1 === r || i.push(y(i) + "scale(" + e + "," + r + ")")
                }(t.scaleX, t.scaleY, n.scaleX, n.scaleY, l, f), t = n = null,
                function(t) {
                    for (var n, e = -1, r = f.length; ++e < r;) l[(n = f[e]).i] = n.x(t);
                    return l.join("")
                }
        }
    }
    var xn = wn(function(t) {
            return "none" === t ? mn : (pn || (pn = document.createElement("DIV"), dn = document.documentElement, gn = document.defaultView), pn.style.transform = t, t = gn.getComputedStyle(dn.appendChild(pn), null).getPropertyValue("transform"), dn.removeChild(pn), _n(+(t = t.slice(7, -1).split(","))[0], +t[1], +t[2], +t[3], +t[4], +t[5]))
        }, "px, ", "px)", "deg)"),
        Mn = wn(function(t) {
            return null == t ? mn : (yn || (yn = document.createElementNS("http://www.w3.org/2000/svg", "g")), yn.setAttribute("transform", t), (t = yn.transform.baseVal.consolidate()) ? _n((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f) : mn)
        }, ", ", ")", ")");
    Math.SQRT2;

    function bn(t) {
        return function() {
            return t
        }
    }

    function Tn(t) {
        return +t
    }
    var Cn = [0, 1];

    function An(n, e) {
        return (e -= n = +n) ? function(t) {
            return (t - n) / e
        } : bn(e)
    }

    function Nn(t, n, e, r) {
        var i = t[0],
            o = t[1],
            u = n[0],
            a = n[1];
        return o < i ? (i = e(o, i), u = r(a, u)) : (i = e(i, o), u = r(u, a)),
            function(t) {
                return u(i(t))
            }
    }

    function Sn(e, t, n, r) {
        var i = Math.min(e.length, t.length) - 1,
            o = new Array(i),
            u = new Array(i),
            a = -1;
        for (e[i] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++a < i;) o[a] = n(e[a], e[a + 1]), u[a] = r(t[a], t[a + 1]);
        return function(t) {
            var n = $(e, t, 1, i) - 1;
            return u[n](o[n](t))
        }
    }

    function kn(t, n) {
        return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())
    }

    function Dn(n, e) {
        var r, o, u, a = Cn,
            s = Cn,
            c = fn,
            l = !1;

        function i() {
            return r = 2 < Math.min(a.length, s.length) ? Sn : Nn, o = u = null, t
        }

        function t(t) {
            return (o || (o = r(a, s, l ? (i = n, function(n, e) {
                var r = i(n = +n, e = +e);
                return function(t) {
                    return t <= n ? 0 : e <= t ? 1 : r(t)
                }
            }) : n, c)))(+t);
            var i
        }
        return t.invert = function(t) {
            return (u || (u = r(s, a, An, l ? (i = e, function(n, e) {
                var r = i(n = +n, e = +e);
                return function(t) {
                    return t <= 0 ? n : 1 <= t ? e : r(t)
                }
            }) : e)))(+t);
            var i
        }, t.domain = function(t) {
            return arguments.length ? (a = it.call(t, Tn), i()) : a.slice()
        }, t.range = function(t) {
            return arguments.length ? (s = ot.call(t), i()) : s.slice()
        }, t.rangeRound = function(t) {
            return s = ot.call(t), c = hn, i()
        }, t.clamp = function(t) {
            return arguments.length ? (l = !!t, i()) : l
        }, t.interpolate = function(t) {
            return arguments.length ? (c = t, i()) : c
        }, i()
    }

    function Un(t, n) {
        if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0) return null;
        var e, r = t.slice(0, e);
        return [1 < r.length ? r[0] + r.slice(2) : r, +t.slice(e + 1)]
    }

    function En(t) {
        return (t = Un(Math.abs(t))) ? t[1] : NaN
    }
    var Pn, Fn = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

    function On(t) {
        return new Yn(t)
    }

    function Yn(t) {
        if (!(n = Fn.exec(t))) throw new Error("invalid format: " + t);
        var n;
        this.fill = n[1] || " ", this.align = n[2] || ">", this.sign = n[3] || "-", this.symbol = n[4] || "", this.zero = !!n[5], this.width = n[6] && +n[6], this.comma = !!n[7], this.precision = n[8] && +n[8].slice(1), this.trim = !!n[9], this.type = n[10] || ""
    }

    function jn(t, n) {
        var e = Un(t, n);
        if (!e) return t + "";
        var r = e[0],
            i = e[1];
        return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
    }
    On.prototype = Yn.prototype, Yn.prototype.toString = function() {
        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type
    };
    var Ln = {
        "%": function(t, n) {
            return (100 * t).toFixed(n)
        },
        b: function(t) {
            return Math.round(t).toString(2)
        },
        c: function(t) {
            return t + ""
        },
        d: function(t) {
            return Math.round(t).toString(10)
        },
        e: function(t, n) {
            return t.toExponential(n)
        },
        f: function(t, n) {
            return t.toFixed(n)
        },
        g: function(t, n) {
            return t.toPrecision(n)
        },
        o: function(t) {
            return Math.round(t).toString(8)
        },
        p: function(t, n) {
            return jn(100 * t, n)
        },
        r: jn,
        s: function(t, n) {
            var e = Un(t, n);
            if (!e) return t + "";
            var r = e[0],
                i = e[1],
                o = i - (Pn = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
                u = r.length;
            return o === u ? r : u < o ? r + new Array(o - u + 1).join("0") : 0 < o ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + Un(t, Math.max(0, n + o - 1))[0]
        },
        X: function(t) {
            return Math.round(t).toString(16).toUpperCase()
        },
        x: function(t) {
            return Math.round(t).toString(16)
        }
    };

    function zn(t) {
        return t
    }
    var Hn, In, qn, Xn = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

    function Rn(t) {
        var n, a, s, M = t.grouping && t.thousands ? (a = t.grouping, s = t.thousands, function(t, n) {
                for (var e = t.length, r = [], i = 0, o = a[0], u = 0; 0 < e && 0 < o && (n < u + o + 1 && (o = Math.max(1, n - u)), r.push(t.substring(e -= o, e + o)), !((u += o + 1) > n));) o = a[i = (i + 1) % a.length];
                return r.reverse().join(s)
            }) : zn,
            r = t.currency,
            b = t.decimal,
            T = t.numerals ? (n = t.numerals, function(t) {
                return t.replace(/[0-9]/g, function(t) {
                    return n[+t]
                })
            }) : zn,
            i = t.percent || "%";

        function u(t) {
            var c = (t = On(t)).fill,
                l = t.align,
                f = t.sign,
                n = t.symbol,
                h = t.zero,
                p = t.width,
                d = t.comma,
                g = t.precision,
                y = t.trim,
                v = t.type;
            "n" === v ? (d = !0, v = "g") : Ln[v] || (null == g && (g = 12), y = !0, v = "g"), (h || "0" === c && "=" === l) && (h = !0, c = "0", l = "=");
            var m = "$" === n ? r[0] : "#" === n && /[boxX]/.test(v) ? "0" + v.toLowerCase() : "",
                _ = "$" === n ? r[1] : /[%p]/.test(v) ? i : "",
                w = Ln[v],
                x = /[defgprs%]/.test(v);

            function e(t) {
                var n, e, r, i = m,
                    o = _;
                if ("c" === v) o = w(t) + o, t = "";
                else {
                    var u = (t = +t) < 0;
                    if (t = w(Math.abs(t), g), y && (t = function(t) {
                            t: for (var n, e = t.length, r = 1, i = -1; r < e; ++r) switch (t[r]) {
                                case ".":
                                    i = n = r;
                                    break;
                                case "0":
                                    0 === i && (i = r), n = r;
                                    break;
                                default:
                                    if (0 < i) {
                                        if (!+t[r]) break t;
                                        i = 0
                                    }
                            }
                            return 0 < i ? t.slice(0, i) + t.slice(n + 1) : t
                        }(t)), u && 0 == +t && (u = !1), i = (u ? "(" === f ? f : "-" : "-" === f || "(" === f ? "" : f) + i, o = ("s" === v ? Xn[8 + Pn / 3] : "") + o + (u && "(" === f ? ")" : ""), x)
                        for (n = -1, e = t.length; ++n < e;)
                            if ((r = t.charCodeAt(n)) < 48 || 57 < r) {
                                o = (46 === r ? b + t.slice(n + 1) : t.slice(n)) + o, t = t.slice(0, n);
                                break
                            }
                }
                d && !h && (t = M(t, 1 / 0));
                var a = i.length + t.length + o.length,
                    s = a < p ? new Array(p - a + 1).join(c) : "";
                switch (d && h && (t = M(s + t, s.length ? p - o.length : 1 / 0), s = ""), l) {
                    case "<":
                        t = i + t + o + s;
                        break;
                    case "=":
                        t = i + s + t + o;
                        break;
                    case "^":
                        t = s.slice(0, a = s.length >> 1) + i + t + o + s.slice(a);
                        break;
                    default:
                        t = s + i + t + o
                }
                return T(t)
            }
            return g = null == g ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, g)) : Math.max(0, Math.min(20, g)), e.toString = function() {
                return t + ""
            }, e
        }
        return {
            format: u,
            formatPrefix: function(t, n) {
                var e = u(((t = On(t)).type = "f", t)),
                    r = 3 * Math.max(-8, Math.min(8, Math.floor(En(n) / 3))),
                    i = Math.pow(10, -r),
                    o = Xn[8 + r / 3];
                return function(t) {
                    return e(i * t) + o
                }
            }
        }
    }

    function Bn(t, n, e) {
        var r, i, o, u, a, s, c, l, f, h, p, d, g = t[0],
            y = t[t.length - 1],
            v = (i = g, o = y, u = null == n ? 10 : n, a = Math.abs(o - i) / Math.max(0, u), s = Math.pow(10, Math.floor(Math.log(a) / Math.LN10)), Z <= (c = a / s) ? s *= 10 : W <= c ? s *= 5 : Q <= c && (s *= 2), o < i ? -s : s);
        switch ((e = On(null == e ? ",f" : e)).type) {
            case "s":
                var m = Math.max(Math.abs(g), Math.abs(y));
                return null != e.precision || isNaN((p = v, d = m, r = Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(En(d) / 3))) - En(Math.abs(p))))) || (e.precision = r), qn(e, m);
            case "":
            case "e":
            case "g":
            case "p":
            case "r":
                null != e.precision || isNaN((f = v, h = Math.max(Math.abs(g), Math.abs(y)), f = Math.abs(f), h = Math.abs(h) - f, r = Math.max(0, En(h) - En(f)) + 1)) || (e.precision = r - ("e" === e.type));
                break;
            case "f":
            case "%":
                null != e.precision || isNaN((l = v, r = Math.max(0, -En(Math.abs(l))))) || (e.precision = r - 2 * ("%" === e.type))
        }
        return In(e)
    }

    function Vn(a) {
        var s = a.domain;
        return a.ticks = function(t) {
            var n = s();
            return function(t, n, e) {
                var r, i, o, u, a = -1;
                if (e = +e, (t = +t) == (n = +n) && 0 < e) return [t];
                if ((r = n < t) && (i = t, t = n, n = i), 0 === (u = J(t, n, e)) || !isFinite(u)) return [];
                if (0 < u)
                    for (t = Math.ceil(t / u), n = Math.floor(n / u), o = new Array(i = Math.ceil(n - t + 1)); ++a < i;) o[a] = (t + a) * u;
                else
                    for (t = Math.floor(t * u), n = Math.ceil(n * u), o = new Array(i = Math.ceil(t - n + 1)); ++a < i;) o[a] = (t - a) / u;
                return r && o.reverse(), o
            }(n[0], n[n.length - 1], null == t ? 10 : t)
        }, a.tickFormat = function(t, n) {
            return Bn(s(), t, n)
        }, a.nice = function(t) {
            null == t && (t = 10);
            var n, e = s(),
                r = 0,
                i = e.length - 1,
                o = e[r],
                u = e[i];
            return u < o && (n = o, o = u, u = n, n = r, r = i, i = n), 0 < (n = J(o, u, t)) ? n = J(o = Math.floor(o / n) * n, u = Math.ceil(u / n) * n, t) : n < 0 && (n = J(o = Math.ceil(o * n) / n, u = Math.floor(u * n) / n, t)), 0 < n ? (e[r] = Math.floor(o / n) * n, e[i] = Math.ceil(u / n) * n, s(e)) : n < 0 && (e[r] = Math.ceil(o * n) / n, e[i] = Math.floor(u * n) / n, s(e)), a
        }, a
    }

    function $n(t, n) {
        return t < 0 ? -Math.pow(-t, n) : Math.pow(t, n)
    }

    function Zn() {
        return function t() {
            var r = 1,
                n = Dn(function(n, e) {
                    return (e = $n(e, r) - (n = $n(n, r))) ? function(t) {
                        return ($n(t, r) - n) / e
                    } : bn(e)
                }, function(n, e) {
                    return e = $n(e, r) - (n = $n(n, r)),
                        function(t) {
                            return $n(n + e * t, 1 / r)
                        }
                }),
                e = n.domain;
            return n.exponent = function(t) {
                return arguments.length ? (r = +t, e(e())) : r
            }, n.copy = function() {
                return kn(n, t().exponent(r))
            }, Vn(n)
        }().exponent(.5)
    }
    Hn = Rn({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["$", ""]
    }), In = Hn.format, qn = Hn.formatPrefix;
    var Wn = new Date,
        Qn = new Date;

    function Jn(o, u, e, r) {
        function a(t) {
            return o(t = new Date(+t)), t
        }
        return (a.floor = a).ceil = function(t) {
            return o(t = new Date(t - 1)), u(t, 1), o(t), t
        }, a.round = function(t) {
            var n = a(t),
                e = a.ceil(t);
            return t - n < e - t ? n : e
        }, a.offset = function(t, n) {
            return u(t = new Date(+t), null == n ? 1 : Math.floor(n)), t
        }, a.range = function(t, n, e) {
            var r, i = [];
            if (t = a.ceil(t), e = null == e ? 1 : Math.floor(e), !(t < n && 0 < e)) return i;
            for (; i.push(r = new Date(+t)), u(t, e), o(t), r < t && t < n;);
            return i
        }, a.filter = function(e) {
            return Jn(function(t) {
                if (t <= t)
                    for (; o(t), !e(t);) t.setTime(t - 1)
            }, function(t, n) {
                if (t <= t)
                    if (n < 0)
                        for (; ++n <= 0;)
                            for (; u(t, -1), !e(t););
                    else
                        for (; 0 <= --n;)
                            for (; u(t, 1), !e(t););
            })
        }, e && (a.count = function(t, n) {
            return Wn.setTime(+t), Qn.setTime(+n), o(Wn), o(Qn), Math.floor(e(Wn, Qn))
        }, a.every = function(n) {
            return n = Math.floor(n), isFinite(n) && 0 < n ? 1 < n ? a.filter(r ? function(t) {
                return r(t) % n == 0
            } : function(t) {
                return a.count(0, t) % n == 0
            }) : a : null
        }), a
    }
    var Gn = Jn(function() {}, function(t, n) {
        t.setTime(+t + n)
    }, function(t, n) {
        return n - t
    });
    Gn.every = function(e) {
        return e = Math.floor(e), isFinite(e) && 0 < e ? 1 < e ? Jn(function(t) {
            t.setTime(Math.floor(t / e) * e)
        }, function(t, n) {
            t.setTime(+t + n * e)
        }, function(t, n) {
            return (n - t) / e
        }) : Gn : null
    };
    var Kn = 6e4,
        te = 36e5,
        ne = (Jn(function(t) {
            t.setTime(1e3 * Math.floor(t / 1e3))
        }, function(t, n) {
            t.setTime(+t + 1e3 * n)
        }, function(t, n) {
            return (n - t) / 1e3
        }, function(t) {
            return t.getUTCSeconds()
        }), Jn(function(t) {
            t.setTime(Math.floor(t / Kn) * Kn)
        }, function(t, n) {
            t.setTime(+t + n * Kn)
        }, function(t, n) {
            return (n - t) / Kn
        }, function(t) {
            return t.getMinutes()
        }), Jn(function(t) {
            var n = t.getTimezoneOffset() * Kn % te;
            n < 0 && (n += te), t.setTime(Math.floor((+t - n) / te) * te + n)
        }, function(t, n) {
            t.setTime(+t + n * te)
        }, function(t, n) {
            return (n - t) / te
        }, function(t) {
            return t.getHours()
        }), Jn(function(t) {
            t.setHours(0, 0, 0, 0)
        }, function(t, n) {
            t.setDate(t.getDate() + n)
        }, function(t, n) {
            return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * Kn) / 864e5
        }, function(t) {
            return t.getDate() - 1
        }));

    function ee(n) {
        return Jn(function(t) {
            t.setDate(t.getDate() - (t.getDay() + 7 - n) % 7), t.setHours(0, 0, 0, 0)
        }, function(t, n) {
            t.setDate(t.getDate() + 7 * n)
        }, function(t, n) {
            return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * Kn) / 6048e5
        })
    }
    var re = ee(0),
        ie = ee(1),
        oe = (ee(2), ee(3), ee(4)),
        ue = (ee(5), ee(6), Jn(function(t) {
            t.setDate(1), t.setHours(0, 0, 0, 0)
        }, function(t, n) {
            t.setMonth(t.getMonth() + n)
        }, function(t, n) {
            return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear())
        }, function(t) {
            return t.getMonth()
        }), Jn(function(t) {
            t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
        }, function(t, n) {
            t.setFullYear(t.getFullYear() + n)
        }, function(t, n) {
            return n.getFullYear() - t.getFullYear()
        }, function(t) {
            return t.getFullYear()
        }));
    ue.every = function(e) {
        return isFinite(e = Math.floor(e)) && 0 < e ? Jn(function(t) {
            t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
        }, function(t, n) {
            t.setFullYear(t.getFullYear() + n * e)
        }) : null
    };
    Jn(function(t) {
        t.setUTCSeconds(0, 0)
    }, function(t, n) {
        t.setTime(+t + n * Kn)
    }, function(t, n) {
        return (n - t) / Kn
    }, function(t) {
        return t.getUTCMinutes()
    }), Jn(function(t) {
        t.setUTCMinutes(0, 0, 0)
    }, function(t, n) {
        t.setTime(+t + n * te)
    }, function(t, n) {
        return (n - t) / te
    }, function(t) {
        return t.getUTCHours()
    });
    var ae = Jn(function(t) {
        t.setUTCHours(0, 0, 0, 0)
    }, function(t, n) {
        t.setUTCDate(t.getUTCDate() + n)
    }, function(t, n) {
        return (n - t) / 864e5
    }, function(t) {
        return t.getUTCDate() - 1
    });

    function se(n) {
        return Jn(function(t) {
            t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - n) % 7), t.setUTCHours(0, 0, 0, 0)
        }, function(t, n) {
            t.setUTCDate(t.getUTCDate() + 7 * n)
        }, function(t, n) {
            return (n - t) / 6048e5
        })
    }
    var ce = se(0),
        le = se(1),
        fe = (se(2), se(3), se(4)),
        he = (se(5), se(6), Jn(function(t) {
            t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
        }, function(t, n) {
            t.setUTCMonth(t.getUTCMonth() + n)
        }, function(t, n) {
            return n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() - t.getUTCFullYear())
        }, function(t) {
            return t.getUTCMonth()
        }), Jn(function(t) {
            t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
        }, function(t, n) {
            t.setUTCFullYear(t.getUTCFullYear() + n)
        }, function(t, n) {
            return n.getUTCFullYear() - t.getUTCFullYear()
        }, function(t) {
            return t.getUTCFullYear()
        }));

    function pe(t) {
        if (0 <= t.y && t.y < 100) {
            var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
            return n.setFullYear(t.y), n
        }
        return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
    }

    function de(t) {
        if (0 <= t.y && t.y < 100) {
            var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
            return n.setUTCFullYear(t.y), n
        }
        return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
    }

    function ge(t) {
        return {
            y: t,
            m: 0,
            d: 1,
            H: 0,
            M: 0,
            S: 0,
            L: 0
        }
    }
    he.every = function(e) {
        return isFinite(e = Math.floor(e)) && 0 < e ? Jn(function(t) {
            t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
        }, function(t, n) {
            t.setUTCFullYear(t.getUTCFullYear() + n * e)
        }) : null
    };
    var ye, ve, me, _e = {
            "-": "",
            _: " ",
            0: "0"
        },
        we = /^\s*\d+/,
        xe = /^%/,
        Me = /[\\^$*+?|[\]().{}]/g;

    function be(t, n, e) {
        var r = t < 0 ? "-" : "",
            i = (r ? -t : t) + "",
            o = i.length;
        return r + (o < e ? new Array(e - o + 1).join(n) + i : i)
    }

    function Te(t) {
        return t.replace(Me, "\\$&")
    }

    function Ce(t) {
        return new RegExp("^(?:" + t.map(Te).join("|") + ")", "i")
    }

    function Ae(t) {
        for (var n = {}, e = -1, r = t.length; ++e < r;) n[t[e].toLowerCase()] = e;
        return n
    }

    function Ne(t, n, e) {
        var r = we.exec(n.slice(e, e + 1));
        return r ? (t.w = +r[0], e + r[0].length) : -1
    }

    function Se(t, n, e) {
        var r = we.exec(n.slice(e, e + 1));
        return r ? (t.u = +r[0], e + r[0].length) : -1
    }

    function ke(t, n, e) {
        var r = we.exec(n.slice(e, e + 2));
        return r ? (t.U = +r[0], e + r[0].length) : -1
    }

    function De(t, n, e) {
        var r = we.exec(n.slice(e, e + 2));
        return r ? (t.V = +r[0], e + r[0].length) : -1
    }

    function Ue(t, n, e) {
        var r = we.exec(n.slice(e, e + 2));
        return r ? (t.W = +r[0], e + r[0].length) : -1
    }

    function Ee(t, n, e) {
        var r = we.exec(n.slice(e, e + 4));
        return r ? (t.y = +r[0], e + r[0].length) : -1
    }

    function Pe(t, n, e) {
        var r = we.exec(n.slice(e, e + 2));
        return r ? (t.y = +r[0] + (68 < +r[0] ? 1900 : 2e3), e + r[0].length) : -1
    }

    function Fe(t, n, e) {
        var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e, e + 6));
        return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), e + r[0].length) : -1
    }

    function Oe(t, n, e) {
        var r = we.exec(n.slice(e, e + 2));
        return r ? (t.m = r[0] - 1, e + r[0].length) : -1
    }

    function Ye(t, n, e) {
        var r = we.exec(n.slice(e, e + 2));
        return r ? (t.d = +r[0], e + r[0].length) : -1
    }

    function je(t, n, e) {
        var r = we.exec(n.slice(e, e + 3));
        return r ? (t.m = 0, t.d = +r[0], e + r[0].length) : -1
    }

    function Le(t, n, e) {
        var r = we.exec(n.slice(e, e + 2));
        return r ? (t.H = +r[0], e + r[0].length) : -1
    }

    function ze(t, n, e) {
        var r = we.exec(n.slice(e, e + 2));
        return r ? (t.M = +r[0], e + r[0].length) : -1
    }

    function He(t, n, e) {
        var r = we.exec(n.slice(e, e + 2));
        return r ? (t.S = +r[0], e + r[0].length) : -1
    }

    function Ie(t, n, e) {
        var r = we.exec(n.slice(e, e + 3));
        return r ? (t.L = +r[0], e + r[0].length) : -1
    }

    function qe(t, n, e) {
        var r = we.exec(n.slice(e, e + 6));
        return r ? (t.L = Math.floor(r[0] / 1e3), e + r[0].length) : -1
    }

    function Xe(t, n, e) {
        var r = xe.exec(n.slice(e, e + 1));
        return r ? e + r[0].length : -1
    }

    function Re(t, n, e) {
        var r = we.exec(n.slice(e));
        return r ? (t.Q = +r[0], e + r[0].length) : -1
    }

    function Be(t, n, e) {
        var r = we.exec(n.slice(e));
        return r ? (t.Q = 1e3 * +r[0], e + r[0].length) : -1
    }

    function Ve(t, n) {
        return be(t.getDate(), n, 2)
    }

    function $e(t, n) {
        return be(t.getHours(), n, 2)
    }

    function Ze(t, n) {
        return be(t.getHours() % 12 || 12, n, 2)
    }

    function We(t, n) {
        return be(1 + ne.count(ue(t), t), n, 3)
    }

    function Qe(t, n) {
        return be(t.getMilliseconds(), n, 3)
    }

    function Je(t, n) {
        return Qe(t, n) + "000"
    }

    function Ge(t, n) {
        return be(t.getMonth() + 1, n, 2)
    }

    function Ke(t, n) {
        return be(t.getMinutes(), n, 2)
    }

    function tr(t, n) {
        return be(t.getSeconds(), n, 2)
    }

    function nr(t) {
        var n = t.getDay();
        return 0 === n ? 7 : n
    }

    function er(t, n) {
        return be(re.count(ue(t), t), n, 2)
    }

    function rr(t, n) {
        var e = t.getDay();
        return t = 4 <= e || 0 === e ? oe(t) : oe.ceil(t), be(oe.count(ue(t), t) + (4 === ue(t).getDay()), n, 2)
    }

    function ir(t) {
        return t.getDay()
    }

    function or(t, n) {
        return be(ie.count(ue(t), t), n, 2)
    }

    function ur(t, n) {
        return be(t.getFullYear() % 100, n, 2)
    }

    function ar(t, n) {
        return be(t.getFullYear() % 1e4, n, 4)
    }

    function sr(t) {
        var n = t.getTimezoneOffset();
        return (0 < n ? "-" : (n *= -1, "+")) + be(n / 60 | 0, "0", 2) + be(n % 60, "0", 2)
    }

    function cr(t, n) {
        return be(t.getUTCDate(), n, 2)
    }

    function lr(t, n) {
        return be(t.getUTCHours(), n, 2)
    }

    function fr(t, n) {
        return be(t.getUTCHours() % 12 || 12, n, 2)
    }

    function hr(t, n) {
        return be(1 + ae.count(he(t), t), n, 3)
    }

    function pr(t, n) {
        return be(t.getUTCMilliseconds(), n, 3)
    }

    function dr(t, n) {
        return pr(t, n) + "000"
    }

    function gr(t, n) {
        return be(t.getUTCMonth() + 1, n, 2)
    }

    function yr(t, n) {
        return be(t.getUTCMinutes(), n, 2)
    }

    function vr(t, n) {
        return be(t.getUTCSeconds(), n, 2)
    }

    function mr(t) {
        var n = t.getUTCDay();
        return 0 === n ? 7 : n
    }

    function _r(t, n) {
        return be(ce.count(he(t), t), n, 2)
    }

    function wr(t, n) {
        var e = t.getUTCDay();
        return t = 4 <= e || 0 === e ? fe(t) : fe.ceil(t), be(fe.count(he(t), t) + (4 === he(t).getUTCDay()), n, 2)
    }

    function xr(t) {
        return t.getUTCDay()
    }

    function Mr(t, n) {
        return be(le.count(he(t), t), n, 2)
    }

    function br(t, n) {
        return be(t.getUTCFullYear() % 100, n, 2)
    }

    function Tr(t, n) {
        return be(t.getUTCFullYear() % 1e4, n, 4)
    }

    function Cr() {
        return "+0000"
    }

    function Ar() {
        return "%"
    }

    function Nr(t) {
        return +t
    }

    function Sr(t) {
        return Math.floor(+t / 1e3)
    }
    ye = function(t) {
        var r = t.dateTime,
            i = t.date,
            o = t.time,
            n = t.periods,
            e = t.days,
            u = t.shortDays,
            a = t.months,
            s = t.shortMonths,
            c = Ce(n),
            l = Ae(n),
            f = Ce(e),
            h = Ae(e),
            p = Ce(u),
            d = Ae(u),
            g = Ce(a),
            y = Ae(a),
            v = Ce(s),
            m = Ae(s),
            _ = {
                a: function(t) {
                    return u[t.getDay()]
                },
                A: function(t) {
                    return e[t.getDay()]
                },
                b: function(t) {
                    return s[t.getMonth()]
                },
                B: function(t) {
                    return a[t.getMonth()]
                },
                c: null,
                d: Ve,
                e: Ve,
                f: Je,
                H: $e,
                I: Ze,
                j: We,
                L: Qe,
                m: Ge,
                M: Ke,
                p: function(t) {
                    return n[+(12 <= t.getHours())]
                },
                Q: Nr,
                s: Sr,
                S: tr,
                u: nr,
                U: er,
                V: rr,
                w: ir,
                W: or,
                x: null,
                X: null,
                y: ur,
                Y: ar,
                Z: sr,
                "%": Ar
            },
            w = {
                a: function(t) {
                    return u[t.getUTCDay()]
                },
                A: function(t) {
                    return e[t.getUTCDay()]
                },
                b: function(t) {
                    return s[t.getUTCMonth()]
                },
                B: function(t) {
                    return a[t.getUTCMonth()]
                },
                c: null,
                d: cr,
                e: cr,
                f: dr,
                H: lr,
                I: fr,
                j: hr,
                L: pr,
                m: gr,
                M: yr,
                p: function(t) {
                    return n[+(12 <= t.getUTCHours())]
                },
                Q: Nr,
                s: Sr,
                S: vr,
                u: mr,
                U: _r,
                V: wr,
                w: xr,
                W: Mr,
                x: null,
                X: null,
                y: br,
                Y: Tr,
                Z: Cr,
                "%": Ar
            },
            x = {
                a: function(t, n, e) {
                    var r = p.exec(n.slice(e));
                    return r ? (t.w = d[r[0].toLowerCase()], e + r[0].length) : -1
                },
                A: function(t, n, e) {
                    var r = f.exec(n.slice(e));
                    return r ? (t.w = h[r[0].toLowerCase()], e + r[0].length) : -1
                },
                b: function(t, n, e) {
                    var r = v.exec(n.slice(e));
                    return r ? (t.m = m[r[0].toLowerCase()], e + r[0].length) : -1
                },
                B: function(t, n, e) {
                    var r = g.exec(n.slice(e));
                    return r ? (t.m = y[r[0].toLowerCase()], e + r[0].length) : -1
                },
                c: function(t, n, e) {
                    return T(t, r, n, e)
                },
                d: Ye,
                e: Ye,
                f: qe,
                H: Le,
                I: Le,
                j: je,
                L: Ie,
                m: Oe,
                M: ze,
                p: function(t, n, e) {
                    var r = c.exec(n.slice(e));
                    return r ? (t.p = l[r[0].toLowerCase()], e + r[0].length) : -1
                },
                Q: Re,
                s: Be,
                S: He,
                u: Se,
                U: ke,
                V: De,
                w: Ne,
                W: Ue,
                x: function(t, n, e) {
                    return T(t, i, n, e)
                },
                X: function(t, n, e) {
                    return T(t, o, n, e)
                },
                y: Pe,
                Y: Ee,
                Z: Fe,
                "%": Xe
            };

        function M(s, c) {
            return function(t) {
                var n, e, r, i = [],
                    o = -1,
                    u = 0,
                    a = s.length;
                for (t instanceof Date || (t = new Date(+t)); ++o < a;) 37 === s.charCodeAt(o) && (i.push(s.slice(u, o)), null != (e = _e[n = s.charAt(++o)]) ? n = s.charAt(++o) : e = "e" === n ? " " : "0", (r = c[n]) && (n = r(t, e)), i.push(n), u = o + 1);
                return i.push(s.slice(u, o)), i.join("")
            }
        }

        function b(i, o) {
            return function(t) {
                var n, e, r = ge(1900);
                if (T(r, i, t += "", 0) != t.length) return null;
                if ("Q" in r) return new Date(r.Q);
                if ("p" in r && (r.H = r.H % 12 + 12 * r.p), "V" in r) {
                    if (r.V < 1 || 53 < r.V) return null;
                    "w" in r || (r.w = 1), "Z" in r ? (n = 4 < (e = (n = de(ge(r.y))).getUTCDay()) || 0 === e ? le.ceil(n) : le(n), n = ae.offset(n, 7 * (r.V - 1)), r.y = n.getUTCFullYear(), r.m = n.getUTCMonth(), r.d = n.getUTCDate() + (r.w + 6) % 7) : (n = 4 < (e = (n = o(ge(r.y))).getDay()) || 0 === e ? ie.ceil(n) : ie(n), n = ne.offset(n, 7 * (r.V - 1)), r.y = n.getFullYear(), r.m = n.getMonth(), r.d = n.getDate() + (r.w + 6) % 7)
                } else("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : "W" in r ? 1 : 0), e = "Z" in r ? de(ge(r.y)).getUTCDay() : o(ge(r.y)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + 7 * r.W - (e + 5) % 7 : r.w + 7 * r.U - (e + 6) % 7);
                return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, de(r)) : o(r)
            }
        }

        function T(t, n, e, r) {
            for (var i, o, u = 0, a = n.length, s = e.length; u < a;) {
                if (s <= r) return -1;
                if (37 === (i = n.charCodeAt(u++))) {
                    if (i = n.charAt(u++), !(o = x[i in _e ? n.charAt(u++) : i]) || (r = o(t, e, r)) < 0) return -1
                } else if (i != e.charCodeAt(r++)) return -1
            }
            return r
        }
        return _.x = M(i, _), _.X = M(o, _), _.c = M(r, _), w.x = M(i, w), w.X = M(o, w), w.c = M(r, w), {
            format: function(t) {
                var n = M(t += "", _);
                return n.toString = function() {
                    return t
                }, n
            },
            parse: function(t) {
                var n = b(t += "", pe);
                return n.toString = function() {
                    return t
                }, n
            },
            utcFormat: function(t) {
                var n = M(t += "", w);
                return n.toString = function() {
                    return t
                }, n
            },
            utcParse: function(t) {
                var n = b(t, de);
                return n.toString = function() {
                    return t
                }, n
            }
        }
    }({
        dateTime: "%x, %X",
        date: "%-m/%-d/%Y",
        time: "%-I:%M:%S %p",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }), ye.format, ye.parse, ve = ye.utcFormat, me = ye.utcParse;
    var kr = "%Y-%m-%dT%H:%M:%S.%LZ";
    Date.prototype.toISOString || ve(kr); + new Date("2000-01-01T00:00:00.000Z") || me(kr);

    function Dr(t) {
        var n = 0,
            e = t.children,
            r = e && e.length;
        if (r)
            for (; 0 <= --r;) n += e[r].value;
        else n = 1;
        t.value = n
    }

    function Ur(t, n) {
        var e, r, i, o, u, a = new Or(t),
            s = +t.value && (a.value = t.value),
            c = [a];
        for (null == n && (n = Er); e = c.pop();)
            if (s && (e.value = +e.data.value), (i = n(e.data)) && (u = i.length))
                for (e.children = new Array(u), o = u - 1; 0 <= o; --o) c.push(r = e.children[o] = new Or(i[o])), r.parent = e, r.depth = e.depth + 1;
        return a.eachBefore(Fr)
    }

    function Er(t) {
        return t.children
    }

    function Pr(t) {
        t.data = t.data.data
    }

    function Fr(t) {
        for (var n = 0; t.height = n, (t = t.parent) && t.height < ++n;);
    }

    function Or(t) {
        this.data = t, this.depth = this.height = 0, this.parent = null
    }

    function Yr(t) {
        t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1)
    }

    function jr() {
        var e = 1,
            r = 1,
            a = 0,
            i = !1;

        function n(t) {
            var o, u, n = t.height + 1;
            return t.x0 = t.y0 = a, t.x1 = e, t.y1 = r / n, t.eachBefore((o = r, u = n, function(t) {
                t.children && function(t, n, e, r, i) {
                    for (var o, u = t.children, a = -1, s = u.length, c = t.value && (r - n) / t.value; ++a < s;)(o = u[a]).y0 = e, o.y1 = i, o.x0 = n, o.x1 = n += o.value * c
                }(t, t.x0, o * (t.depth + 1) / u, t.x1, o * (t.depth + 2) / u);
                var n = t.x0,
                    e = t.y0,
                    r = t.x1 - a,
                    i = t.y1 - a;
                r < n && (n = r = (n + r) / 2), i < e && (e = i = (e + i) / 2), t.x0 = n, t.y0 = e, t.x1 = r, t.y1 = i
            })), i && t.eachBefore(Yr), t
        }
        return n.round = function(t) {
            return arguments.length ? (i = !!t, n) : i
        }, n.size = function(t) {
            return arguments.length ? (e = +t[0], r = +t[1], n) : [e, r]
        }, n.padding = function(t) {
            return arguments.length ? (a = +t, n) : a
        }, n
    }
    Or.prototype = Ur.prototype = {
        constructor: Or,
        count: function() {
            return this.eachAfter(Dr)
        },
        each: function(t) {
            var n, e, r, i, o = this,
                u = [o];
            do {
                for (n = u.reverse(), u = []; o = n.pop();)
                    if (t(o), e = o.children)
                        for (r = 0, i = e.length; r < i; ++r) u.push(e[r])
            } while (u.length);
            return this
        },
        eachAfter: function(t) {
            for (var n, e, r, i = this, o = [i], u = []; i = o.pop();)
                if (u.push(i), n = i.children)
                    for (e = 0, r = n.length; e < r; ++e) o.push(n[e]);
            for (; i = u.pop();) t(i);
            return this
        },
        eachBefore: function(t) {
            for (var n, e, r = this, i = [r]; r = i.pop();)
                if (t(r), n = r.children)
                    for (e = n.length - 1; 0 <= e; --e) i.push(n[e]);
            return this
        },
        sum: function(i) {
            return this.eachAfter(function(t) {
                for (var n = +i(t.data) || 0, e = t.children, r = e && e.length; 0 <= --r;) n += e[r].value;
                t.value = n
            })
        },
        sort: function(n) {
            return this.eachBefore(function(t) {
                t.children && t.children.sort(n)
            })
        },
        path: function(t) {
            for (var n = this, e = function(t, n) {
                    if (t === n) return t;
                    var e = t.ancestors(),
                        r = n.ancestors(),
                        i = null;
                    for (t = e.pop(), n = r.pop(); t === n;) i = t, t = e.pop(), n = r.pop();
                    return i
                }(n, t), r = [n]; n !== e;) n = n.parent, r.push(n);
            for (var i = r.length; t !== e;) r.splice(i, 0, t), t = t.parent;
            return r
        },
        ancestors: function() {
            for (var t = this, n = [t]; t = t.parent;) n.push(t);
            return n
        },
        descendants: function() {
            var n = [];
            return this.each(function(t) {
                n.push(t)
            }), n
        },
        leaves: function() {
            var n = [];
            return this.eachBefore(function(t) {
                t.children || n.push(t)
            }), n
        },
        links: function() {
            var n = this,
                e = [];
            return n.each(function(t) {
                t !== n && e.push({
                    source: t.parent,
                    target: t
                })
            }), e
        },
        copy: function() {
            return Ur(this).eachBefore(Pr)
        }
    };
    var Lr = Math.PI,
        zr = 2 * Lr,
        Hr = 1e-6,
        Ir = zr - Hr;

    function qr() {
        this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""
    }

    function Xr() {
        return new qr
    }

    function Rr(t) {
        return function() {
            return t
        }
    }
    qr.prototype = Xr.prototype = {
        constructor: qr,
        moveTo: function(t, n) {
            this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n)
        },
        closePath: function() {
            null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z")
        },
        lineTo: function(t, n) {
            this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n)
        },
        quadraticCurveTo: function(t, n, e, r) {
            this._ += "Q" + +t + "," + +n + "," + (this._x1 = +e) + "," + (this._y1 = +r)
        },
        bezierCurveTo: function(t, n, e, r, i, o) {
            this._ += "C" + +t + "," + +n + "," + +e + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +o)
        },
        arcTo: function(t, n, e, r, i) {
            t = +t, n = +n, e = +e, r = +r, i = +i;
            var o = this._x1,
                u = this._y1,
                a = e - t,
                s = r - n,
                c = o - t,
                l = u - n,
                f = c * c + l * l;
            if (i < 0) throw new Error("negative radius: " + i);
            if (null === this._x1) this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
            else if (Hr < f)
                if (Math.abs(l * a - s * c) > Hr && i) {
                    var h = e - o,
                        p = r - u,
                        d = a * a + s * s,
                        g = h * h + p * p,
                        y = Math.sqrt(d),
                        v = Math.sqrt(f),
                        m = i * Math.tan((Lr - Math.acos((d + f - g) / (2 * y * v))) / 2),
                        _ = m / v,
                        w = m / y;
                    Math.abs(_ - 1) > Hr && (this._ += "L" + (t + _ * c) + "," + (n + _ * l)), this._ += "A" + i + "," + i + ",0,0," + +(c * p < l * h) + "," + (this._x1 = t + w * a) + "," + (this._y1 = n + w * s)
                } else this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
            else;
        },
        arc: function(t, n, e, r, i, o) {
            t = +t, n = +n;
            var u = (e = +e) * Math.cos(r),
                a = e * Math.sin(r),
                s = t + u,
                c = n + a,
                l = 1 ^ o,
                f = o ? r - i : i - r;
            if (e < 0) throw new Error("negative radius: " + e);
            null === this._x1 ? this._ += "M" + s + "," + c : (Math.abs(this._x1 - s) > Hr || Math.abs(this._y1 - c) > Hr) && (this._ += "L" + s + "," + c), e && (f < 0 && (f = f % zr + zr), Ir < f ? this._ += "A" + e + "," + e + ",0,1," + l + "," + (t - u) + "," + (n - a) + "A" + e + "," + e + ",0,1," + l + "," + (this._x1 = s) + "," + (this._y1 = c) : Hr < f && (this._ += "A" + e + "," + e + ",0," + +(Lr <= f) + "," + l + "," + (this._x1 = t + e * Math.cos(i)) + "," + (this._y1 = n + e * Math.sin(i))))
        },
        rect: function(t, n, e, r) {
            this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n) + "h" + +e + "v" + +r + "h" + -e + "Z"
        },
        toString: function() {
            return this._
        }
    };
    var Br = Math.abs,
        Vr = Math.atan2,
        $r = Math.cos,
        Zr = Math.max,
        Wr = Math.min,
        Qr = Math.sin,
        Jr = Math.sqrt,
        Gr = 1e-12,
        Kr = Math.PI,
        ti = Kr / 2,
        ni = 2 * Kr;

    function ei(t) {
        return 1 <= t ? ti : t <= -1 ? -ti : Math.asin(t)
    }

    function ri(t) {
        return t.innerRadius
    }

    function ii(t) {
        return t.outerRadius
    }

    function oi(t) {
        return t.startAngle
    }

    function ui(t) {
        return t.endAngle
    }

    function ai(t) {
        return t && t.padAngle
    }

    function si(t, n, e, r, i, o, u) {
        var a = t - e,
            s = n - r,
            c = (u ? o : -o) / Jr(a * a + s * s),
            l = c * s,
            f = -c * a,
            h = t + l,
            p = n + f,
            d = e + l,
            g = r + f,
            y = (h + d) / 2,
            v = (p + g) / 2,
            m = d - h,
            _ = g - p,
            w = m * m + _ * _,
            x = i - o,
            M = h * g - d * p,
            b = (_ < 0 ? -1 : 1) * Jr(Zr(0, x * x * w - M * M)),
            T = (M * _ - m * b) / w,
            C = (-M * m - _ * b) / w,
            A = (M * _ + m * b) / w,
            N = (-M * m + _ * b) / w,
            S = T - y,
            k = C - v,
            D = A - y,
            U = N - v;
        return D * D + U * U < S * S + k * k && (T = A, C = N), {
            cx: T,
            cy: C,
            x01: -l,
            y01: -f,
            x11: T * (i / x - 1),
            y11: C * (i / x - 1)
        }
    }

    function ci() {
        var Z = ri,
            W = ii,
            Q = Rr(0),
            J = null,
            G = oi,
            K = ui,
            tt = ai,
            nt = null;

        function n() {
            var t, n, e, r, i, o, u, a, s, c, l, f, h = +Z.apply(this, arguments),
                p = +W.apply(this, arguments),
                d = G.apply(this, arguments) - ti,
                g = K.apply(this, arguments) - ti,
                y = Br(g - d),
                v = d < g;
            if (nt || (nt = t = Xr()), p < h && (n = p, p = h, h = n), Gr < p)
                if (ni - Gr < y) nt.moveTo(p * $r(d), p * Qr(d)), nt.arc(0, 0, p, d, g, !v), Gr < h && (nt.moveTo(h * $r(g), h * Qr(g)), nt.arc(0, 0, h, g, d, v));
                else {
                    var m, _, w = d,
                        x = g,
                        M = d,
                        b = g,
                        T = y,
                        C = y,
                        A = tt.apply(this, arguments) / 2,
                        N = Gr < A && (J ? +J.apply(this, arguments) : Jr(h * h + p * p)),
                        S = Wr(Br(p - h) / 2, +Q.apply(this, arguments)),
                        k = S,
                        D = S;
                    if (Gr < N) {
                        var U = ei(N / h * Qr(A)),
                            E = ei(N / p * Qr(A));
                        (T -= 2 * U) > Gr ? (M += U *= v ? 1 : -1, b -= U) : (T = 0, M = b = (d + g) / 2), (C -= 2 * E) > Gr ? (w += E *= v ? 1 : -1, x -= E) : (C = 0, w = x = (d + g) / 2)
                    }
                    var P = p * $r(w),
                        F = p * Qr(w),
                        O = h * $r(b),
                        Y = h * Qr(b);
                    if (Gr < S) {
                        var j = p * $r(x),
                            L = p * Qr(x),
                            z = h * $r(M),
                            H = h * Qr(M);
                        if (y < Kr) {
                            var I = Gr < T ? [(r = P) + (f = ((c = O - (o = j)) * ((i = F) - (u = L)) - (l = Y - u) * (r - o)) / (l * (a = z - r) - c * (s = H - i))) * a, i + f * s] : [O, Y],
                                q = P - I[0],
                                X = F - I[1],
                                R = j - I[0],
                                B = L - I[1],
                                V = 1 / Qr((1 < (e = (q * R + X * B) / (Jr(q * q + X * X) * Jr(R * R + B * B))) ? 0 : e < -1 ? Kr : Math.acos(e)) / 2),
                                $ = Jr(I[0] * I[0] + I[1] * I[1]);
                            k = Wr(S, (h - $) / (V - 1)), D = Wr(S, (p - $) / (V + 1))
                        }
                    }
                    Gr < C ? Gr < D ? (m = si(z, H, P, F, p, D, v), _ = si(j, L, O, Y, p, D, v), nt.moveTo(m.cx + m.x01, m.cy + m.y01), D < S ? nt.arc(m.cx, m.cy, D, Vr(m.y01, m.x01), Vr(_.y01, _.x01), !v) : (nt.arc(m.cx, m.cy, D, Vr(m.y01, m.x01), Vr(m.y11, m.x11), !v), nt.arc(0, 0, p, Vr(m.cy + m.y11, m.cx + m.x11), Vr(_.cy + _.y11, _.cx + _.x11), !v), nt.arc(_.cx, _.cy, D, Vr(_.y11, _.x11), Vr(_.y01, _.x01), !v))) : (nt.moveTo(P, F), nt.arc(0, 0, p, w, x, !v)) : nt.moveTo(P, F), Gr < h && Gr < T ? Gr < k ? (m = si(O, Y, j, L, h, -k, v), _ = si(P, F, z, H, h, -k, v), nt.lineTo(m.cx + m.x01, m.cy + m.y01), k < S ? nt.arc(m.cx, m.cy, k, Vr(m.y01, m.x01), Vr(_.y01, _.x01), !v) : (nt.arc(m.cx, m.cy, k, Vr(m.y01, m.x01), Vr(m.y11, m.x11), !v), nt.arc(0, 0, h, Vr(m.cy + m.y11, m.cx + m.x11), Vr(_.cy + _.y11, _.cx + _.x11), v), nt.arc(_.cx, _.cy, k, Vr(_.y11, _.x11), Vr(_.y01, _.x01), !v))) : nt.arc(0, 0, h, b, M, v) : nt.lineTo(O, Y)
                } else nt.moveTo(0, 0);
            if (nt.closePath(), t) return nt = null, t + "" || null
        }
        return n.centroid = function() {
            var t = (+Z.apply(this, arguments) + +W.apply(this, arguments)) / 2,
                n = (+G.apply(this, arguments) + +K.apply(this, arguments)) / 2 - Kr / 2;
            return [$r(n) * t, Qr(n) * t]
        }, n.innerRadius = function(t) {
            return arguments.length ? (Z = "function" == typeof t ? t : Rr(+t), n) : Z
        }, n.outerRadius = function(t) {
            return arguments.length ? (W = "function" == typeof t ? t : Rr(+t), n) : W
        }, n.cornerRadius = function(t) {
            return arguments.length ? (Q = "function" == typeof t ? t : Rr(+t), n) : Q
        }, n.padRadius = function(t) {
            return arguments.length ? (J = null == t ? null : "function" == typeof t ? t : Rr(+t), n) : J
        }, n.startAngle = function(t) {
            return arguments.length ? (G = "function" == typeof t ? t : Rr(+t), n) : G
        }, n.endAngle = function(t) {
            return arguments.length ? (K = "function" == typeof t ? t : Rr(+t), n) : K
        }, n.padAngle = function(t) {
            return arguments.length ? (tt = "function" == typeof t ? t : Rr(+t), n) : tt
        }, n.context = function(t) {
            return arguments.length ? (nt = null == t ? null : t, n) : nt
        }, n
    }

    function li(t) {
        return t < 0 ? -1 : 1
    }

    function fi(t, n, e) {
        var r = t._x1 - t._x0,
            i = n - t._x1,
            o = (t._y1 - t._y0) / (r || i < 0 && -0),
            u = (e - t._y1) / (i || r < 0 && -0),
            a = (o * i + u * r) / (r + i);
        return (li(o) + li(u)) * Math.min(Math.abs(o), Math.abs(u), .5 * Math.abs(a)) || 0
    }

    function hi(t, n) {
        var e = t._x1 - t._x0;
        return e ? (3 * (t._y1 - t._y0) / e - n) / 2 : n
    }

    function pi(t, n, e) {
        var r = t._x0,
            i = t._y0,
            o = t._x1,
            u = t._y1,
            a = (o - r) / 3;
        t._context.bezierCurveTo(r + a, i + a * n, o - a, u - a * e, o, u)
    }

    function di(t) {
        this._context = t
    }

    function gi(t) {
        this._context = t
    }
    di.prototype = {
        areaStart: function() {
            this._line = 0
        },
        areaEnd: function() {
            this._line = NaN
        },
        lineStart: function() {
            this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0
        },
        lineEnd: function() {
            switch (this._point) {
                case 2:
                    this._context.lineTo(this._x1, this._y1);
                    break;
                case 3:
                    pi(this, this._t0, hi(this, this._t0))
            }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
        },
        point: function(t, n) {
            var e = NaN;
            if (n = +n, (t = +t) !== this._x1 || n !== this._y1) {
                switch (this._point) {
                    case 0:
                        this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                        break;
                    case 1:
                        this._point = 2;
                        break;
                    case 2:
                        this._point = 3, pi(this, hi(this, e = fi(this, t, n)), e);
                        break;
                    default:
                        pi(this, this._t0, e = fi(this, t, n))
                }
                this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n, this._t0 = e
            }
        }
    }, (function(t) {
        this._context = new gi(t)
    }.prototype = Object.create(di.prototype)).point = function(t, n) {
        di.prototype.point.call(this, n, t)
    }, gi.prototype = {
        moveTo: function(t, n) {
            this._context.moveTo(n, t)
        },
        closePath: function() {
            this._context.closePath()
        },
        lineTo: function(t, n) {
            this._context.lineTo(n, t)
        },
        bezierCurveTo: function(t, n, e, r, i, o) {
            this._context.bezierCurveTo(n, t, r, e, o, i)
        }
    };
    var yi = {
        value: function() {}
    };

    function vi() {
        for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
            if (!(t = arguments[n] + "") || t in r) throw new Error("illegal type: " + t);
            r[t] = []
        }
        return new mi(r)
    }

    function mi(t) {
        this._ = t
    }

    function _i(t, n) {
        for (var e, r = 0, i = t.length; r < i; ++r)
            if ((e = t[r]).name === n) return e.value
    }

    function wi(t, n, e) {
        for (var r = 0, i = t.length; r < i; ++r)
            if (t[r].name === n) {
                t[r] = yi, t = t.slice(0, r).concat(t.slice(r + 1));
                break
            }
        return null != e && t.push({
            name: n,
            value: e
        }), t
    }
    mi.prototype = vi.prototype = {
        constructor: mi,
        on: function(t, n) {
            var e, r, i = this._,
                o = (r = i, (t + "").trim().split(/^|\s+/).map(function(t) {
                    var n = "",
                        e = t.indexOf(".");
                    if (0 <= e && (n = t.slice(e + 1), t = t.slice(0, e)), t && !r.hasOwnProperty(t)) throw new Error("unknown type: " + t);
                    return {
                        type: t,
                        name: n
                    }
                })),
                u = -1,
                a = o.length;
            if (!(arguments.length < 2)) {
                if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);
                for (; ++u < a;)
                    if (e = (t = o[u]).type) i[e] = wi(i[e], t.name, n);
                    else if (null == n)
                    for (e in i) i[e] = wi(i[e], t.name, null);
                return this
            }
            for (; ++u < a;)
                if ((e = (t = o[u]).type) && (e = _i(i[e], t.name))) return e
        },
        copy: function() {
            var t = {},
                n = this._;
            for (var e in n) t[e] = n[e].slice();
            return new mi(t)
        },
        call: function(t, n) {
            if (0 < (e = arguments.length - 2))
                for (var e, r, i = new Array(e), o = 0; o < e; ++o) i[o] = arguments[o + 2];
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (o = 0, e = (r = this._[t]).length; o < e; ++o) r[o].value.apply(n, i)
        },
        apply: function(t, n, e) {
            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
            for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(n, e)
        }
    };
    var xi, Mi, bi = 0,
        Ti = 0,
        Ci = 0,
        Ai = 1e3,
        Ni = 0,
        Si = 0,
        ki = 0,
        Di = "object" == typeof performance && performance.now ? performance : Date,
        Ui = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
            setTimeout(t, 17)
        };

    function Ei() {
        return Si || (Ui(Pi), Si = Di.now() + ki)
    }

    function Pi() {
        Si = 0
    }

    function Fi() {
        this._call = this._time = this._next = null
    }

    function Oi(t, n, e) {
        var r = new Fi;
        return r.restart(t, n, e), r
    }

    function Yi() {
        Si = (Ni = Di.now()) + ki, bi = Ti = 0;
        try {
            ! function() {
                Ei(), ++bi;
                for (var t, n = xi; n;) 0 <= (t = Si - n._time) && n._call.call(null, t), n = n._next;
                --bi
            }()
        } finally {
            bi = 0,
                function() {
                    var t, n, e = xi,
                        r = 1 / 0;
                    for (; e;) e._call ? (r > e._time && (r = e._time), e = (t = e)._next) : (n = e._next, e._next = null, e = t ? t._next = n : xi = n);
                    Mi = t, Li(r)
                }(), Si = 0
        }
    }

    function ji() {
        var t = Di.now(),
            n = t - Ni;
        Ai < n && (ki -= n, Ni = t)
    }

    function Li(t) {
        bi || (Ti && (Ti = clearTimeout(Ti)), 24 < t - Si ? (t < 1 / 0 && (Ti = setTimeout(Yi, t - Di.now() - ki)), Ci && (Ci = clearInterval(Ci))) : (Ci || (Ni = Di.now(), Ci = setInterval(ji, Ai)), bi = 1, Ui(Yi)))
    }

    function zi(n, e, t) {
        var r = new Fi;
        return e = null == e ? 0 : +e, r.restart(function(t) {
            r.stop(), n(t + e)
        }, e, t), r
    }
    Fi.prototype = Oi.prototype = {
        constructor: Fi,
        restart: function(t, n, e) {
            if ("function" != typeof t) throw new TypeError("callback is not a function");
            e = (null == e ? Ei() : +e) + (null == n ? 0 : +n), this._next || Mi === this || (Mi ? Mi._next = this : xi = this, Mi = this), this._call = t, this._time = e, Li()
        },
        stop: function() {
            this._call && (this._call = null, this._time = 1 / 0, Li())
        }
    };
    var Hi = vi("start", "end", "interrupt"),
        Ii = [],
        qi = 0,
        Xi = 1,
        Ri = 2,
        Bi = 3,
        Vi = 4,
        $i = 5,
        Zi = 6;

    function Wi(t, n, e, r, i, o) {
        var u = t.__transition;
        if (u) {
            if (e in u) return
        } else t.__transition = {};
        ! function(o, u, a) {
            var s, c = o.__transition;

            function l(t) {
                var n, e, r, i;
                if (a.state !== Xi) return h();
                for (n in c)
                    if ((i = c[n]).name === a.name) {
                        if (i.state === Bi) return zi(l);
                        i.state === Vi ? (i.state = Zi, i.timer.stop(), i.on.call("interrupt", o, o.__data__, i.index, i.group), delete c[n]) : +n < u && (i.state = Zi, i.timer.stop(), delete c[n])
                    }
                if (zi(function() {
                        a.state === Bi && (a.state = Vi, a.timer.restart(f, a.delay, a.time), f(t))
                    }), a.state = Ri, a.on.call("start", o, o.__data__, a.index, a.group), a.state === Ri) {
                    for (a.state = Bi, s = new Array(r = a.tween.length), n = 0, e = -1; n < r; ++n)(i = a.tween[n].value.call(o, o.__data__, a.index, a.group)) && (s[++e] = i);
                    s.length = e + 1
                }
            }

            function f(t) {
                for (var n = t < a.duration ? a.ease.call(null, t / a.duration) : (a.timer.restart(h), a.state = $i, 1), e = -1, r = s.length; ++e < r;) s[e].call(null, n);
                a.state === $i && (a.on.call("end", o, o.__data__, a.index, a.group), h())
            }

            function h() {
                for (var t in a.state = Zi, a.timer.stop(), delete c[u], c) return;
                delete o.__transition
            }(c[u] = a).timer = Oi(function(t) {
                a.state = Xi, a.timer.restart(l, a.delay, a.time), a.delay <= t && l(t - a.delay)
            }, 0, a.time)
        }(t, e, {
            name: n,
            index: r,
            group: i,
            on: Hi,
            tween: Ii,
            time: o.time,
            delay: o.delay,
            duration: o.duration,
            ease: o.ease,
            timer: null,
            state: qi
        })
    }

    function Qi(t, n) {
        var e = Gi(t, n);
        if (e.state > qi) throw new Error("too late; already scheduled");
        return e
    }

    function Ji(t, n) {
        var e = Gi(t, n);
        if (e.state > Ri) throw new Error("too late; already started");
        return e
    }

    function Gi(t, n) {
        var e = t.__transition;
        if (!e || !(e = e[n])) throw new Error("transition not found");
        return e
    }

    function Ki(t, n, e) {
        var r = t._id;
        return t.each(function() {
                var t = Ji(this, r);
                (t.value || (t.value = {}))[n] = e.apply(this, arguments)
            }),
            function(t) {
                return Gi(t, r).value[n]
            }
    }

    function to(t, n) {
        var e;
        return ("number" == typeof n ? an : n instanceof Mt ? un : (e = Mt(n)) ? (n = e, un) : ln)(t, n)
    }
    var no = q.prototype.constructor;
    var eo = 0;

    function ro(t, n, e, r) {
        this._groups = t, this._parents = n, this._name = e, this._id = r
    }

    function io(t) {
        return q().transition(t)
    }

    function oo() {
        return ++eo
    }
    var uo = q.prototype;
    ro.prototype = io.prototype = {
        constructor: ro,
        select: function(t) {
            var n = this._name,
                e = this._id;
            "function" != typeof t && (t = p(t));
            for (var r = this._groups, i = r.length, o = new Array(i), u = 0; u < i; ++u)
                for (var a, s, c = r[u], l = c.length, f = o[u] = new Array(l), h = 0; h < l; ++h)(a = c[h]) && (s = t.call(a, a.__data__, h, c)) && ("__data__" in a && (s.__data__ = a.__data__), f[h] = s, Wi(f[h], n, e, h, f, Gi(a, e)));
            return new ro(o, this._parents, n, e)
        },
        selectAll: function(t) {
            var n = this._name,
                e = this._id;
            "function" != typeof t && (t = v(t));
            for (var r = this._groups, i = r.length, o = [], u = [], a = 0; a < i; ++a)
                for (var s, c = r[a], l = c.length, f = 0; f < l; ++f)
                    if (s = c[f]) {
                        for (var h, p = t.call(s, s.__data__, f, c), d = Gi(s, e), g = 0, y = p.length; g < y; ++g)(h = p[g]) && Wi(h, n, e, g, p, d);
                        o.push(p), u.push(s)
                    }
            return new ro(o, u, n, e)
        },
        filter: function(t) {
            "function" != typeof t && (t = l(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
                for (var o, u = n[i], a = u.length, s = r[i] = [], c = 0; c < a; ++c)(o = u[c]) && t.call(o, o.__data__, c, u) && s.push(o);
            return new ro(r, this._parents, this._name, this._id)
        },
        merge: function(t) {
            if (t._id !== this._id) throw new Error;
            for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
                for (var s, c = n[a], l = e[a], f = c.length, h = u[a] = new Array(f), p = 0; p < f; ++p)(s = c[p] || l[p]) && (h[p] = s);
            for (; a < r; ++a) u[a] = n[a];
            return new ro(u, this._parents, this._name, this._id)
        },
        selection: function() {
            return new no(this._groups, this._parents)
        },
        transition: function() {
            for (var t = this._name, n = this._id, e = oo(), r = this._groups, i = r.length, o = 0; o < i; ++o)
                for (var u, a = r[o], s = a.length, c = 0; c < s; ++c)
                    if (u = a[c]) {
                        var l = Gi(u, n);
                        Wi(u, t, e, c, a, {
                            time: l.time + l.delay + l.duration,
                            delay: 0,
                            duration: l.duration,
                            ease: l.ease
                        })
                    }
            return new ro(r, this._parents, t, e)
        },
        call: uo.call,
        nodes: uo.nodes,
        node: uo.node,
        size: uo.size,
        empty: uo.empty,
        each: uo.each,
        on: function(t, n) {
            var e, r, i, o, u, a, s = this._id;
            return arguments.length < 2 ? Gi(this.node(), s).on.on(t) : this.each((e = s, i = n, a = ((r = t) + "").trim().split(/^|\s+/).every(function(t) {
                var n = t.indexOf(".");
                return 0 <= n && (t = t.slice(0, n)), !t || "start" === t
            }) ? Qi : Ji, function() {
                var t = a(this, e),
                    n = t.on;
                n !== o && (u = (o = n).copy()).on(r, i), t.on = u
            }))
        },
        attr: function(t, n) {
            var e = o(t),
                r = "transform" === e ? Mn : to;
            return this.attrTween(t, "function" == typeof n ? (e.local ? function(e, r, i) {
                var o, u, a;
                return function() {
                    var t, n = i(this);
                    if (null != n) return (t = this.getAttributeNS(e.space, e.local)) === n ? null : t === o && n === u ? a : a = r(o = t, u = n);
                    this.removeAttributeNS(e.space, e.local)
                }
            } : function(e, r, i) {
                var o, u, a;
                return function() {
                    var t, n = i(this);
                    if (null != n) return (t = this.getAttribute(e)) === n ? null : t === o && n === u ? a : a = r(o = t, u = n);
                    this.removeAttribute(e)
                }
            })(e, r, Ki(this, "attr." + t, n)) : null == n ? (e.local ? function(t) {
                return function() {
                    this.removeAttributeNS(t.space, t.local)
                }
            } : function(t) {
                return function() {
                    this.removeAttribute(t)
                }
            })(e) : (e.local ? function(n, e, r) {
                var i, o;
                return function() {
                    var t = this.getAttributeNS(n.space, n.local);
                    return t === r ? null : t === i ? o : o = e(i = t, r)
                }
            } : function(n, e, r) {
                var i, o;
                return function() {
                    var t = this.getAttribute(n);
                    return t === r ? null : t === i ? o : o = e(i = t, r)
                }
            })(e, r, n + ""))
        },
        attrTween: function(t, n) {
            var e = "attr." + t;
            if (arguments.length < 2) return (e = this.tween(e)) && e._value;
            if (null == n) return this.tween(e, null);
            if ("function" != typeof n) throw new Error;
            var r = o(t);
            return this.tween(e, (r.local ? function(r, t) {
                function n() {
                    var n = this,
                        e = t.apply(n, arguments);
                    return e && function(t) {
                        n.setAttributeNS(r.space, r.local, e(t))
                    }
                }
                return n._value = t, n
            } : function(r, t) {
                function n() {
                    var n = this,
                        e = t.apply(n, arguments);
                    return e && function(t) {
                        n.setAttribute(r, e(t))
                    }
                }
                return n._value = t, n
            })(r, n))
        },
        style: function(t, n, e) {
            var r, i, o, u, a, s, c, l, f, h, p, d, g, y, v, m, _, w = "transform" == (t += "") ? xn : to;
            return null == n ? this.styleTween(t, (g = t, y = w, function() {
                var t = x(this, g),
                    n = (this.style.removeProperty(g), x(this, g));
                return t === n ? null : t === v && n === m ? _ : _ = y(v = t, m = n)
            })).on("end.style." + t, (d = t, function() {
                this.style.removeProperty(d)
            })) : this.styleTween(t, "function" == typeof n ? (c = w, l = Ki(this, "style." + (s = t), n), function() {
                var t = x(this, s),
                    n = l(this);
                return null == n && (this.style.removeProperty(s), n = x(this, s)), t === n ? null : t === f && n === h ? p : p = c(f = t, h = n)
            }) : (r = t, i = w, o = n + "", function() {
                var t = x(this, r);
                return t === o ? null : t === u ? a : a = i(u = t, o)
            }), e)
        },
        styleTween: function(t, n, e) {
            var r = "style." + (t += "");
            if (arguments.length < 2) return (r = this.tween(r)) && r._value;
            if (null == n) return this.tween(r, null);
            if ("function" != typeof n) throw new Error;
            return this.tween(r, function(r, t, i) {
                function n() {
                    var n = this,
                        e = t.apply(n, arguments);
                    return e && function(t) {
                        n.style.setProperty(r, e(t), i)
                    }
                }
                return n._value = t, n
            }(t, n, null == e ? "" : e))
        },
        text: function(t) {
            return this.tween("text", "function" == typeof t ? (e = Ki(this, "text", t), function() {
                var t = e(this);
                this.textContent = null == t ? "" : t
            }) : (n = null == t ? "" : t + "", function() {
                this.textContent = n
            }));
            var n, e
        },
        remove: function() {
            return this.on("end.remove", (e = this._id, function() {
                var t = this.parentNode;
                for (var n in this.__transition)
                    if (+n !== e) return;
                t && t.removeChild(this)
            }));
            var e
        },
        tween: function(t, n) {
            var e = this._id;
            if (t += "", arguments.length < 2) {
                for (var r, i = Gi(this.node(), e).tween, o = 0, u = i.length; o < u; ++o)
                    if ((r = i[o]).name === t) return r.value;
                return null
            }
            return this.each((null == n ? function(i, o) {
                var u, a;
                return function() {
                    var t = Ji(this, i),
                        n = t.tween;
                    if (n !== u)
                        for (var e = 0, r = (a = u = n).length; e < r; ++e)
                            if (a[e].name === o) {
                                (a = a.slice()).splice(e, 1);
                                break
                            }
                    t.tween = a
                }
            } : function(o, u, a) {
                var s, c;
                if ("function" != typeof a) throw new Error;
                return function() {
                    var t = Ji(this, o),
                        n = t.tween;
                    if (n !== s) {
                        c = (s = n).slice();
                        for (var e = {
                                name: u,
                                value: a
                            }, r = 0, i = c.length; r < i; ++r)
                            if (c[r].name === u) {
                                c[r] = e;
                                break
                            }
                        r === i && c.push(e)
                    }
                    t.tween = c
                }
            })(e, t, n))
        },
        delay: function(t) {
            var n = this._id;
            return arguments.length ? this.each(("function" == typeof t ? function(t, n) {
                return function() {
                    Qi(this, t).delay = +n.apply(this, arguments)
                }
            } : function(t, n) {
                return n = +n,
                    function() {
                        Qi(this, t).delay = n
                    }
            })(n, t)) : Gi(this.node(), n).delay
        },
        duration: function(t) {
            var n = this._id;
            return arguments.length ? this.each(("function" == typeof t ? function(t, n) {
                return function() {
                    Ji(this, t).duration = +n.apply(this, arguments)
                }
            } : function(t, n) {
                return n = +n,
                    function() {
                        Ji(this, t).duration = n
                    }
            })(n, t)) : Gi(this.node(), n).duration
        },
        ease: function(t) {
            var n = this._id;
            return arguments.length ? this.each(function(t, n) {
                if ("function" != typeof n) throw new Error;
                return function() {
                    Ji(this, t).ease = n
                }
            }(n, t)) : Gi(this.node(), n).ease
        }
    };
    Math.PI, Math.PI;
    var ao = {
        time: null,
        delay: 0,
        duration: 250,
        ease: function(t) {
            return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
        }
    };

    function so(t, n) {
        for (var e; !(e = t.__transition) || !(e = e[n]);)
            if (!(t = t.parentNode)) return ao.time = Ei(), ao;
        return e
    }
    q.prototype.interrupt = function(t) {
        return this.each(function() {
            ! function(t, n) {
                var e, r, i, o = t.__transition,
                    u = !0;
                if (o) {
                    for (i in n = null == n ? null : n + "", o)(e = o[i]).name === n ? (r = e.state > Ri && e.state < $i, e.state = Zi, e.timer.stop(), r && e.on.call("interrupt", t, t.__data__, e.index, e.group), delete o[i]) : u = !1;
                    u && delete t.__transition
                }
            }(this, t)
        })
    }, q.prototype.transition = function(t) {
        var n, e;
        t instanceof ro ? (n = t._id, t = t._name) : (n = oo(), (e = ao).time = Ei(), t = null == t ? null : t + "");
        for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
            for (var u, a = r[o], s = a.length, c = 0; c < s; ++c)(u = a[c]) && Wi(u, t, n, c, a, e || so(u, n));
        return new ro(r, this._parents, t, n)
    };
    "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;

    function co(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
    }

    function lo(t, n) {
        return t(n = {
            exports: {}
        }, n.exports), n.exports
    }
    var fo = lo(function(t, n) {
            "undefined" != typeof self && self, t.exports = function(e) {
                var r = {};

                function i(t) {
                    if (r[t]) return r[t].exports;
                    var n = r[t] = {
                        i: t,
                        l: !1,
                        exports: {}
                    };
                    return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports
                }
                return i.m = e, i.c = r, i.d = function(t, n, e) {
                    i.o(t, n) || Object.defineProperty(t, n, {
                        configurable: !1,
                        enumerable: !0,
                        get: e
                    })
                }, i.n = function(t) {
                    var n = t && t.__esModule ? function() {
                        return t.default
                    } : function() {
                        return t
                    };
                    return i.d(n, "a", n), n
                }, i.o = function(t, n) {
                    return Object.prototype.hasOwnProperty.call(t, n)
                }, i.p = "", i(i.s = 0)
            }([function(t, n, e) {
                var r, i, o, u;
                u = function(t, n, e) {
                    Object.defineProperty(n, "__esModule", {
                        value: !0
                    }), n.default = function(t) {
                        var n = t.stateInit,
                            r = void 0 === n ? function() {
                                return {}
                            } : n,
                            e = t.props,
                            i = void 0 === e ? {} : e,
                            o = t.methods,
                            a = void 0 === o ? {} : o,
                            u = t.aliases,
                            s = void 0 === u ? {} : u,
                            c = t.init,
                            l = void 0 === c ? function() {} : c,
                            f = t.update,
                            h = void 0 === f ? function() {} : f,
                            p = Object.keys(i).map(function(t) {
                                return new y(t, i[t])
                            });
                        return function() {
                            var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                                o = Object.assign({}, r instanceof Function ? r() : r, {
                                    initialised: !1
                                });

                            function u(t) {
                                return e(t, n), i(), u
                            }
                            var e = function(t, n) {
                                    l.call(u, t, o, n), o.initialised = !0
                                },
                                i = (0, d.default)(function() {
                                    o.initialised && h.call(u, o)
                                }, 1);
                            return p.forEach(function(t) {
                                u[t.name] = function(n) {
                                    var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                                        r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : function(t, n) {};
                                    return function(t) {
                                        return arguments.length ? (o[n] = t, r.call(u, t, o), e && i(), u) : o[n]
                                    }
                                }(t.name, t.triggerUpdate, t.onChange)
                            }), Object.keys(a).forEach(function(i) {
                                u[i] = function() {
                                    for (var t, n = arguments.length, e = Array(n), r = 0; r < n; r++) e[r] = arguments[r];
                                    return (t = a[i]).call.apply(t, [u, o].concat(e))
                                }
                            }), Object.entries(s).forEach(function(t) {
                                var n = g(t, 2),
                                    e = n[0],
                                    r = n[1];
                                return u[e] = u[r]
                            }), u.resetProps = function() {
                                return p.forEach(function(t) {
                                    u[t.name](t.defaultVal)
                                }), u
                            }, u.resetProps(), o._rerender = i, u
                        }
                    };
                    var r, d = (r = e) && r.__esModule ? r : {
                            default: r
                        },
                        g = function(t, n) {
                            if (Array.isArray(t)) return t;
                            if (Symbol.iterator in Object(t)) return function(t, n) {
                                var e = [],
                                    r = !0,
                                    i = !1,
                                    o = void 0;
                                try {
                                    for (var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (e.push(u.value), !n || e.length !== n); r = !0);
                                } catch (t) {
                                    i = !0, o = t
                                } finally {
                                    try {
                                        !r && a.return && a.return()
                                    } finally {
                                        if (i) throw o
                                    }
                                }
                                return e
                            }(t, n);
                            throw new TypeError("Invalid attempt to destructure non-iterable instance")
                        },
                        y = function t(n, e) {
                            var r = e.default,
                                i = void 0 === r ? null : r,
                                o = e.triggerUpdate,
                                u = void 0 === o || o,
                                a = e.onChange,
                                s = void 0 === a ? function(t, n) {} : a;
                            ! function(t, n) {
                                if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function")
                            }(this, t), this.name = n, this.defaultVal = i, this.triggerUpdate = u, this.onChange = s
                        };
                    t.exports = n.default
                }, i = [t, n, e(1)], void 0 === (o = "function" == typeof(r = u) ? r.apply(n, i) : r) || (t.exports = o)
            }, function(t, n) {
                t.exports = function(n, e, r) {
                    var i, o, u, a, s;

                    function c() {
                        var t = Date.now() - a;
                        t < e && 0 <= t ? i = setTimeout(c, e - t) : (i = null, r || (s = n.apply(u, o), u = o = null))
                    }
                    null == e && (e = 100);
                    var t = function() {
                        u = this, o = arguments, a = Date.now();
                        var t = r && !i;
                        return i || (i = setTimeout(c, e)), t && (s = n.apply(u, o), u = o = null), s
                    };
                    return t.clear = function() {
                        i && (clearTimeout(i), i = null)
                    }, t.flush = function() {
                        i && (s = n.apply(u, o), u = o = null, clearTimeout(i), i = null)
                    }, t
                }
            }])
        }),
        ho = co(fo),
        po = (fo.Kapsule, lo(function(t, n) {
            t.exports = function(e) {
                function r(t) {
                    if (i[t]) return i[t].exports;
                    var n = i[t] = {
                        i: t,
                        l: !1,
                        exports: {}
                    };
                    return e[t].call(n.exports, n, n.exports, r), n.l = !0, n.exports
                }
                var i = {};
                return r.m = e, r.c = i, r.d = function(t, n, e) {
                    r.o(t, n) || Object.defineProperty(t, n, {
                        configurable: !1,
                        enumerable: !0,
                        get: e
                    })
                }, r.n = function(t) {
                    var n = t && t.__esModule ? function() {
                        return t.default
                    } : function() {
                        return t
                    };
                    return r.d(n, "a", n), n
                }, r.o = function(t, n) {
                    return Object.prototype.hasOwnProperty.call(t, n)
                }, r.p = "", r(r.s = 0)
            }([function(t, n, e) {
                var r, i, o;
                i = [t, n], void 0 !== (o = "function" == typeof(r = function(t, n) {
                    Object.defineProperty(n, "__esModule", {
                        value: !0
                    }), n.default = function(n) {
                        return n instanceof Function ? n : "string" == typeof n ? function(t) {
                            return t[n]
                        } : function(t) {
                            return n
                        }
                    }, t.exports = n.default
                }) ? r.apply(n, i) : r) && (t.exports = o)
            }])
        })),
        go = co(po);
    po.accessorFn;
    ! function(t, n) {
        void 0 === n && (n = {});
        var e = n.insertAt;
        if (t && "undefined" != typeof document) {
            var r = document.head || document.getElementsByTagName("head")[0],
                i = document.createElement("style");
            i.type = "text/css", "top" === e && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t))
        }
    }(".sunburst-viz .slice path {\n  cursor: pointer;\n}\n\n.sunburst-viz text {\n  font-family: Sans-serif;\n  font-size: 12px;\n  dominant-baseline: middle;\n  text-anchor: middle;\n  pointer-events: none;\n  fill: #222;\n}\n\n.sunburst-viz text .text-contour {\n  fill: none;\n  stroke: white;\n  stroke-width: 5;\n  stroke-linejoin: 'round';\n}\n\n.sunburst-viz .main-arc {\n  stroke: white;\n  stroke-width: 1px;\n  transition: opacity .4s;\n}\n\n.sunburst-viz .main-arc:hover {\n  opacity: 0.85;\n  transition: opacity .05s;\n}\n\n.sunburst-viz .hidden-arc {\n  fill: none;\n}\n\n.sunburst-tooltip {\n  display: none;\n  position: absolute;\n  max-width: 320px;\n  margin-top: 20px;\n  margin-left: 8px;\n  padding: 5px;\n  border-radius: 3px;\n  font: 12px sans-serif;\n  color: #eee;\n  background: rgba(0,0,0,0.65);\n  pointer-events: none;\n}\n\n.sunburst-tooltip .tooltip-title {\n  font-weight: bold;\n  text-align: center;\n}\n");
    return ho({
        props: {
            width: {
                default: window.innerWidth
            },
            height: {
                default: window.innerHeight
            },
            data: {
                onChange: function() {
                    this._parseData()
                }
            },
            children: {
                default: "children",
                onChange: function() {
                    this._parseData()
                }
            },
            sort: {
                onChange: function() {
                    this._parseData()
                }
            },
            label: {
                default: function(t) {
                    return t.name
                }
            },
            size: {
                default: "value",
                onChange: function() {
                    this._parseData()
                }
            },
            color: {
                default: function(t) {
                    return "lightgrey"
                }
            },
            minSliceAngle: {
                default: .2
            },
            showLabels: {
                default: !0
            },
            tooltipContent: {
                default: function(t) {
                    return ""
                },
                triggerUpdate: !1
            },
            focusOnNode: {
                onChange: function(t, r) {
                    t && r.initialised && function n(e) {
                        r.svg.selectAll(".slice").filter(function(t) {
                            return t === e
                        }).each(function(t) {
                            this.parentNode.appendChild(this), t.parent && n(t.parent)
                        })
                    }(t.__dataNode)
                }
            },
            onNodeClick: {
                triggerUpdate: !1
            }
        },
        methods: {
            _parseData: function(t) {
                if (t.data) {
                    var n = Ur(t.data, go(t.children)).sum(go(t.size));
                    t.sort && n.sort(t.sort), jr().padding(0)(n), n.descendants().forEach(function(t, n) {
                        t.id = n, t.data.__dataNode = t
                    }), t.layoutData = n.descendants().slice(1)
                }
            }
        },
        init: function(t, n) {
            var e = this;
            n.chartId = Math.round(1e12 * Math.random()), n.radiusScale = Zn(), n.angleScale = function t() {
                var n = Dn(An, an);
                return n.copy = function() {
                    return kn(n, t())
                }, Vn(n)
            }().domain([0, 10]).range([0, 2 * Math.PI]).clamp(!0), n.arc = ci().startAngle(function(t) {
                return n.angleScale(t.x0)
            }).endAngle(function(t) {
                return n.angleScale(t.x1)
            }).innerRadius(function(t) {
                return Math.max(0, n.radiusScale(t.y0))
            }).outerRadius(function(t) {
                return Math.max(0, n.radiusScale(t.y1))
            });
            var r = X(t).append("div").attr("class", "sunburst-viz");
            n.svg = r.append("svg"), n.canvas = n.svg.append("g"), n.tooltip = X("body").append("div").attr("class", "sunburst-tooltip"), t.addEventListener("DOMNodeRemoved", function(t) {
                t.target === this && n.tooltip.remove()
            }), n.canvas.on("mousemove", function() {
                n.tooltip.style("left", F.pageX + "px").style("top", F.pageY + "px")
            }), n.svg.on("click", function() {
                return e.focusOnNode(null)
            })
        },
        update: function(a) {
            var n = this,
                t = Math.min(a.width, a.height) / 2;
            if (a.radiusScale.range([.1 * t, t]), a.svg.style("width", a.width + "px").style("height", a.height + "px").attr("viewBox", -a.width / 2 + " " + -a.height / 2 + " " + a.width + " " + a.height), a.layoutData) {
                var r = a.focusOnNode && a.focusOnNode.__dataNode || {
                        x0: 0,
                        x1: 1,
                        y0: 0,
                        y1: 1
                    },
                    e = a.canvas.selectAll(".slice").data(a.layoutData.filter(function(t) {
                        return t.x1 >= r.x0 && t.x0 <= r.x1 && (t.x1 - t.x0) / (r.x1 - r.x0) > a.minSliceAngle / 360
                    }), function(t) {
                        return t.id
                    }),
                    i = go(a.label),
                    o = go(a.color),
                    u = io().duration(750);
                a.svg.transition(u).tween("scale", function() {
                    var n = fn(a.angleScale.domain(), [r.x0, r.x1]),
                        e = fn(a.radiusScale.domain(), [r.y0, 1]);
                    return function(t) {
                        a.angleScale.domain(n(t)), a.radiusScale.domain(e(t))
                    }
                });
                var s = e.exit().transition(u).style("opacity", 0).remove();
                s.select("path.main-arc").attrTween("d", function(t) {
                    return function() {
                        return a.arc(t)
                    }
                }), s.select("path.hidden-arc").attrTween("d", function(t) {
                    return function() {
                        return h(t)
                    }
                });
                var c = e.enter().append("g").attr("class", "slice").style("opacity", 0).on("click", function(t) {
                    F.stopPropagation(), (a.onNodeClick || n.focusOnNode)(t.data)
                }).on("mouseover", function(t) {
                    a.tooltip.style("display", "inline"), a.tooltip.html('<div class="tooltip-title">' + function(t) {
                        var n = [],
                            e = t;
                        for (; e;) n.unshift(e), e = e.parent;
                        return n
                    }(t).map(function(t) {
                        return i(t.data)
                    }).join(" > ") + "</div>" + a.tooltipContent(t.data, t))
                }).on("mouseout", function() {
                    a.tooltip.style("display", "none")
                });
                c.append("path").attr("class", "main-arc").style("fill", function(t) {
                    return o(t.data, t.parent)
                }), c.append("path").attr("class", "hidden-arc").attr("id", function(t) {
                    return "hidden-arc-" + a.chartId + "-" + t.id
                });
                var l = c.append("text").attr("class", "path-label");
                l.append("textPath").attr("class", "text-contour").attr("startOffset", "50%").attr("xlink:href", function(t) {
                    return "#hidden-arc-" + a.chartId + "-" + t.id
                }), l.append("textPath").attr("class", "text-stroke").attr("startOffset", "50%").attr("xlink:href", function(t) {
                    return "#hidden-arc-" + a.chartId + "-" + t.id
                });
                var f = e.merge(c);
                f.style("opacity", 1), f.select("path.main-arc").transition(u).attrTween("d", function(t) {
                    return function() {
                        return a.arc(t)
                    }
                }).style("fill", function(t) {
                    return o(t.data, t.parent)
                }), f.select("path.hidden-arc").transition(u).attrTween("d", function(t) {
                    return function() {
                        return h(t)
                    }
                }), f.select(".path-label").transition(u).styleTween("display", function(r) {
                    return function() {
                        return a.showLabels && (t = r, n = a.angleScale(t.x1) - a.angleScale(t.x0), e = Math.max(0, (a.radiusScale(t.y0) + a.radiusScale(t.y1)) / 2) * n, 6 * i(t.data).toString().length < e) ? null : "none";
                        var t, n, e
                    }
                }), f.selectAll("text.path-label").select("textPath.text-contour"), f.selectAll("text.path-label").select("textPath.text-stroke"), f.selectAll("text.path-label").selectAll("textPath").text(function(t) {
                    return i(t.data)
                })
            }

            function h(t) {
                var n = Math.PI / 2,
                    e = [a.angleScale(t.x0) - n, a.angleScale(t.x1) - n],
                    r = Math.max(0, (a.radiusScale(t.y0) + a.radiusScale(t.y1)) / 2);
                if (!(r && e[1] - e[0])) return "";
                var i = (e[1] + e[0]) / 2,
                    o = 0 < i && i < Math.PI;
                o && e.reverse();
                var u = Xr();
                return u.arc(0, 0, r, e[0], e[1], o), u.toString()
            }
        }
    })
});