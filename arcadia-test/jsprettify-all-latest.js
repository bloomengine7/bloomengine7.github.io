(function () {
    var j, n = this;

    function o() {}

    function p(a) {
        var b = typeof a;
        if (b == "object") if (a) {
            if (a instanceof Array || !(a instanceof Object) && Object.prototype.toString.call(a) == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice")) return "array";
            if (!(a instanceof Object) && (Object.prototype.toString.call(a) == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call"))) return "function"
        } else return "null";
        else if (b == "function" && typeof a.call == "undefined") return "object";
        return b
    }
    function aa(a) {
        var b = p(a);
        return b == "array" || b == "object" && typeof a.length == "number"
    }
    function s(a) {
        if (a.hasOwnProperty && a.hasOwnProperty(t)) return a[t];
        a[t] || (a[t] = ++ba);
        return a[t]
    }
    var t = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36),
        ba = 0,
        ca = Date.now ||
    function () {
        return +new Date
    };

    function u(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.L = b.prototype;
        a.prototype = new c
    };
    var v = Array.prototype,
        w = v.indexOf ?
    function (a, b, c) {
        return v.indexOf.call(a, b, c)
    } : function (a, b, c) {
        c = c == null ? 0 : c < 0 ? Math.max(0, a.length + c) : c;
        if (typeof a == "string") {
            if (typeof b != "string" || b.length != 1) return -1;
            return a.indexOf(b, c)
        }
        for (c = c; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1
    }, da = v.forEach ?
    function (a, b, c) {
        v.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, f = typeof a == "string" ? a.split("") : a, e = 0; e < d; e++) e in f && b.call(c, f[e], e, a)
    };

    function x(a, b) {
        for (var c = 0, d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = String(b).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(d.length, f.length), g = 0; c == 0 && g < e; g++) {
            var h = d[g] || "",
                i = f[g] || "",
                k = new RegExp("(\\d*)(\\D*)", "g"),
                r = new RegExp("(\\d*)(\\D*)", "g");
            do {
                var m = k.exec(h) || ["", "", ""],
                    l = r.exec(i) || ["", "", ""];
                if (m[0].length == 0 && l[0].length == 0) break;
                c = y(m[1].length == 0 ? 0 : parseInt(m[1], 10), l[1].length == 0 ? 0 : parseInt(l[1], 10)) || y(m[2].length == 0, l[2].length == 0) || y(m[2], l[2])
            } while (c == 0)
        }
        return c
    }
    function y(a, b) {
        if (a < b) return -1;
        else if (a > b) return 1;
        return 0
    };
    var z, A, B, C;

    function ea() {
        return n.navigator ? n.navigator.userAgent : null
    }
    C = B = A = z = false;
    var D;
    if (D = ea()) {
        var fa = n.navigator;
        z = D.indexOf("Opera") == 0;
        A = !z && D.indexOf("MSIE") != -1;
        B = !z && D.indexOf("WebKit") != -1;
        C = !z && !B && fa.product == "Gecko"
    }
    var ga = z,
        E = A,
        ha = C,
        ia = B,
        ja = n.navigator,
        ka = (ja && ja.platform || "").indexOf("Mac") != -1,
        F, G = "",
        H;
    if (ga && n.opera) {
        var la = n.opera.version;
        G = typeof la == "function" ? la() : la
    } else {
        if (ha) H = /rv\:([^\);]+)(\)|;)/;
        else if (E) H = /MSIE\s+([^\);]+)(\)|;)/;
        else if (ia) H = /WebKit\/(\S+)/;
        if (H) {
            var ma = H.exec(ea());
            G = ma ? ma[1] : ""
        }
    }
    F = G;
    var I = {};

    function na(a, b, c, d) {
        d = d || a;
        b = b && b != "*" ? b.toUpperCase() : "";
        if (d.querySelectorAll && (b || c) && (!ia || a.compatMode == "CSS1Compat" || I["528"] || (I["528"] = x(F, "528") >= 0))) return d.querySelectorAll(b + (c ? "." + c : ""));
        if (c && d.getElementsByClassName) {
            a = d.getElementsByClassName(c);
            if (b) {
                d = {};
                for (var f = 0, e = 0, g; g = a[e]; e++) if (b == g.nodeName) d[f++] = g;
                d.length = f;
                return d
            } else return a
        }
        a = d.getElementsByTagName(b || "*");
        if (c) {
            d = {};
            for (e = f = 0; g = a[e]; e++) {
                b = g.className;
                if (typeof b.split == "function" && w(b.split(/\s+/), c) >= 0) d[f++] = g
            }
            d.length = f;
            return d
        } else return a
    }
    function oa(a, b) {
        var c = [];
        pa(a, b, c, false);
        return c
    }
    function pa(a, b, c, d) {
        if (a != null) for (var f = 0, e; e = a.childNodes[f]; f++) {
            if (b(e)) {
                c.push(e);
                if (d) return true
            }
            if (pa(e, b, c, d)) return true
        }
        return false
    };

    function J(a) {
        var b = new RegExp("(^|[\\(\\s\"-])'([\\s\\S]*?)'($|[\\)\\s\".,;:?!-])", "g"),
            c;
        do {
            c = a;
            a = a.replace(b, "$1\u2018$2\u2019$3")
        } while (c != a);
        c = [{
            g: "\\.\\.\\.",
            replace: "\u2026"
        }, {
            g: "'",
            replace: "\u2019"
        }, {
            g: '"($|[\\)\\s/.,;:?!\\u2019])',
            replace: "\u201d$1"
        }, {
            g: '(^|[\\(\\s-/\\u2018])"',
            replace: "$1\u201c"
        }, {
            g: "---",
            replace: "\u2014"
        }, {
            g: "--",
            replace: "\u2013"
        }];
        for (var d = 0, f = c.length; d < f; ++d) {
            var e = c[d];
            b = new RegExp(e.g, "g");
            a = a.replace(b, e.replace)
        }
        return a
    };

    function K(a, b) {
        var c = b || {},
            d = c.uglyTags || [];
        c = c.uglyClass || "";
        if (a == null) return null;
        if (a.nodeType == 3) a.data = J(a.data);
        else if (!(w(d, a.nodeName.toLowerCase()) >= 0) && !(a.className && a.className == c)) {
            d = a.childNodes;
            for (c = 0; c < d.length; c++) {
                var f = K(d[c], b),
                    e = d[c],
                    g = e.parentNode;
                g && g.replaceChild(f, e)
            }
        }
        return a
    };

    function qa() {
        for (var a = na(document, null, "prettify", void 0), b = {
            uglyTags: ["code", "kbd", "pre", "script"],
            uglyClass: "keepugly"
        }, c = 0; c < a.length; c++) K(a[c], b)
    };

    function L() {}
    L.prototype.w = false;
    L.prototype.k = function () {
        if (!this.w) {
            this.w = true;
            this.f()
        }
    };
    L.prototype.f = function () {};

    function M(a, b) {
        this.type = a;
        this.currentTarget = this.target = b
    }
    u(M, L);
    M.prototype.f = function () {
        delete this.type;
        delete this.target;
        delete this.currentTarget
    };
    M.prototype.r = false;
    M.prototype.T = true;

    function N(a, b) {
        a && this.l(a, b)
    }
    u(N, M);
    j = N.prototype;
    j.target = null;
    j.relatedTarget = null;
    j.offsetX = 0;
    j.offsetY = 0;
    j.clientX = 0;
    j.clientY = 0;
    j.screenX = 0;
    j.screenY = 0;
    j.button = 0;
    j.keyCode = 0;
    j.charCode = 0;
    j.ctrlKey = false;
    j.altKey = false;
    j.shiftKey = false;
    j.metaKey = false;
    j.S = false;
    j.A = null;
    j.l = function (a, b) {
        var c = this.type = a.type;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (ha) try {
                d = d.nodeName && d
            } catch (f) {
                d = null
            }
        } else if (c == "mouseover") d = a.fromElement;
        else if (c == "mouseout") d = a.toElement;
        this.relatedTarget = d;
        this.offsetX = a.offsetX !== undefined ? a.offsetX : a.layerX;
        this.offsetY = a.offsetY !== undefined ? a.offsetY : a.layerY;
        this.clientX = a.clientX !== undefined ? a.clientX : a.pageX;
        this.clientY = a.clientY !== undefined ? a.clientY : a.pageY;
        this.screenX = a.screenX || 0;
        this.screenY = a.screenY || 0;
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || (c == "keypress" ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.S = ka ? a.metaKey : a.ctrlKey;
        this.A = a;
        delete this.T;
        delete this.r
    };
    E && (I["8"] || (I["8"] = x(F, "8") >= 0));
    N.prototype.f = function () {
        N.L.f.call(this);
        this.relatedTarget = this.currentTarget = this.target = this.A = null
    };

    function ra() {}
    var sa = 0;
    j = ra.prototype;
    j.key = 0;
    j.i = false;
    j.t = false;
    j.l = function (a, b, c, d, f, e) {
        if (p(a) == "function") this.F = true;
        else if (a && a.handleEvent && p(a.handleEvent) == "function") this.F = false;
        else throw Error("Invalid listener argument");
        this.m = a;
        this.J = b;
        this.src = c;
        this.type = d;
        this.capture = !! f;
        this.C = e;
        this.t = false;
        this.key = ++sa;
        this.i = false
    };
    j.handleEvent = function (a) {
        if (this.F) return this.m.call(this.C || this.src, a);
        return this.m.handleEvent.call(this.m, a)
    };

    function O(a, b) {
        this.G = b;
        this.d = [];
        if (a > this.G) throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
        for (var c = 0; c < a; c++) this.d.push(this.j())
    }
    u(O, L);
    O.prototype.c = null;
    O.prototype.v = null;

    function P(a) {
        if (a.d.length) return a.d.pop();
        return a.j()
    }
    function Q(a, b) {
        a.d.length < a.G ? a.d.push(b) : a.p(b)
    }
    O.prototype.j = function () {
        return this.c ? this.c() : {}
    };
    O.prototype.p = function (a) {
        if (this.v) this.v(a);
        else if (p(a.k) == "function") a.k();
        else for (var b in a) delete a[b]
    };
    O.prototype.f = function () {
        O.L.f.call(this);
        for (var a = this.d; a.length;) this.p(a.pop());
        delete this.d
    };
    var ta;
    var ua = (ta = "ScriptEngine" in n && n.ScriptEngine() == "JScript") ? n.ScriptEngineMajorVersion() + "." + n.ScriptEngineMinorVersion() + "." + n.ScriptEngineBuildVersion() : "0";
    var R, S, T, U, va, wa, xa, ya, za, Aa, Ba;
    (function () {
        function a() {
            return {
                b: 0,
                h: 0
            }
        }
        function b() {
            return []
        }
        function c() {
            function l(q) {
                return g.call(l.src, l.key, q)
            }
            return l
        }
        function d() {
            return new ra
        }
        function f() {
            return new N
        }
        var e = ta && !(x(ua, "5.7") >= 0),
            g;
        wa = function (l) {
            g = l
        };
        if (e) {
            R = function () {
                return P(h)
            };
            S = function (l) {
                Q(h, l)
            };
            T = function () {
                return P(i)
            };
            U = function (l) {
                Q(i, l)
            };
            va = function () {
                return P(k)
            };
            xa = function () {
                Q(k, c())
            };
            ya = function () {
                return P(r)
            };
            za = function (l) {
                Q(r, l)
            };
            Aa = function () {
                return P(m)
            };
            Ba = function (l) {
                Q(m, l)
            };
            var h = new O(0, 600);
            h.c = a;
            var i = new O(0, 600);
            i.c = b;
            var k = new O(0, 600);
            k.c = c;
            var r = new O(0, 600);
            r.c = d;
            var m = new O(0, 600);
            m.c = f
        } else {
            R = a;
            S = o;
            T = b;
            U = o;
            va = c;
            xa = o;
            ya = d;
            za = o;
            Aa = f;
            Ba = o
        }
    })();
    var V = {},
        W = {},
        X = {},
        Ca = {};

    function Da(a, b, c, d, f) {
        if (b) if (p(b) == "array") {
            for (var e = 0; e < b.length; e++) Da(a, b[e], c, d, f);
            return null
        } else {
            d = !! d;
            var g = W;
            b in g || (g[b] = R());
            g = g[b];
            if (!(d in g)) {
                g[d] = R();
                g.b++
            }
            g = g[d];
            var h = s(a),
                i;
            g.h++;
            if (g[h]) {
                i = g[h];
                for (e = 0; e < i.length; e++) {
                    g = i[e];
                    if (g.m == c && g.C == f) {
                        if (g.i) break;
                        return i[e].key
                    }
                }
            } else {
                i = g[h] = T();
                g.b++
            }
            e = va();
            e.src = a;
            g = ya();
            g.l(c, e, a, b, d, f);
            c = g.key;
            e.key = c;
            i.push(g);
            V[c] = g;
            X[h] || (X[h] = T());
            X[h].push(g);
            if (a.addEventListener) {
                if (a == n || !a.P) a.addEventListener(b, e, d)
            } else a.attachEvent(Ea(b), e);
            return c
        } else throw Error("Invalid event type");
    }
    function Fa(a, b, c, d) {
        if (!d.n) if (d.H) {
            for (var f = 0, e = 0; f < d.length; f++) if (d[f].i) {
                var g = d[f].J;
                g.src = null;
                xa(g);
                za(d[f])
            } else {
                if (f != e) d[e] = d[f];
                e++
            }
            d.length = e;
            d.H = false;
            if (e == 0) {
                U(d);
                delete W[a][b][c];
                W[a][b].b--;
                if (W[a][b].b == 0) {
                    S(W[a][b]);
                    delete W[a][b];
                    W[a].b--
                }
                if (W[a].b == 0) {
                    S(W[a]);
                    delete W[a]
                }
            }
        }
    }
    function Ea(a) {
        if (a in Ca) return Ca[a];
        return Ca[a] = "on" + a
    }

    function Ga(a, b, c, d, f) {
        var e = 1;
        b = s(b);
        if (a[b]) {
            a.h--;
            a = a[b];
            if (a.n) a.n++;
            else a.n = 1;
            try {
                for (var g = a.length, h = 0; h < g; h++) {
                    var i = a[h];
                    if (i && !i.i) e &= Ha(i, f) !== false
                }
            } finally {
                a.n--;
                Fa(c, d, b, a)
            }
        }
        return Boolean(e)
    }

    function Ha(a, b) {
        var c = a.handleEvent(b);
        if (a.t) {
            var d = a.key;
            if (V[d]) {
                var f = V[d];
                if (!f.i) {
                    var e = f.src,
                        g = f.type,
                        h = f.J,
                        i = f.capture;
                    if (e.removeEventListener) {
                        if (e == n || !e.P) e.removeEventListener(g, h, i)
                    } else e.detachEvent && e.detachEvent(Ea(g), h);
                    e = s(e);
                    h = W[g][i][e];
                    if (X[e]) {
                        var k = X[e],
                            r = w(k, f);
                        r >= 0 && v.splice.call(k, r, 1);
                        k.length == 0 && delete X[e]
                    }
                    f.i = true;
                    h.H = true;
                    Fa(g, i, e, h);
                    delete V[d]
                }
            }
        }
        return c
    }
    wa(function (a, b) {
        if (!V[a]) return true;
        var c = V[a],
            d = c.type,
            f = W;
        if (!(d in f)) return true;
        f = f[d];
        var e, g;
        if (E) {
            var h;
            if (!(h = b)) a: {
                h = "window.event".split(".");
                for (var i = n; e = h.shift();) if (i[e]) i = i[e];
                else {
                    h = null;
                    break a
                }
                h = i
            }
            e = h;
            h = true in f;
            i = false in f;
            if (h) {
                if (e.keyCode < 0 || e.returnValue != undefined) return true;
                a: {
                    var k = false;
                    if (e.keyCode == 0) try {
                        e.keyCode = -1;
                        break a
                    } catch (r) {
                        k = true
                    }
                    if (k || e.returnValue == undefined) e.returnValue = true
                }
            }
            k = Aa();
            k.l(e, this);
            e = true;
            try {
                if (h) {
                    for (var m = T(), l = k.currentTarget; l; l = l.parentNode) m.push(l);
                    g = f[true];
                    g.h = g.b;
                    for (var q = m.length - 1; !k.r && q >= 0 && g.h; q--) {
                        k.currentTarget = m[q];
                        e &= Ga(g, m[q], d, true, k)
                    }
                    if (i) {
                        g = f[false];
                        g.h = g.b;
                        for (q = 0; !k.r && q < m.length && g.h; q++) {
                            k.currentTarget = m[q];
                            e &= Ga(g, m[q], d, false, k)
                        }
                    }
                } else e = Ha(c, k)
            } finally {
                if (m) {
                    m.length = 0;
                    U(m)
                }
                k.k();
                Ba(k)
            }
            return e
        }
        d = new N(b, this);
        try {
            e = Ha(c, d)
        } finally {
            d.k()
        }
        return e
    });
    var Y = "StopIteration" in n ? n.StopIteration : Error("StopIteration");

    function Z() {}
    Z.prototype.next = function () {
        throw Y;
    };
    Z.prototype.o = function () {
        return this
    };

    function Ia(a) {
        if (a instanceof Z) return a;
        if (typeof a.o == "function") return a.o(false);
        if (aa(a)) {
            var b = 0,
                c = new Z;
            c.next = function () {
                for (;;) {
                    if (b >= a.length) throw Y;
                    if (b in a) return a[b++];
                    else b++
                }
            };
            return c
        }
        throw Error("Not implemented");
    }

    function Ja(a, b, c) {
        if (aa(a)) try {
            da(a, b, c)
        } catch (d) {
            if (d !== Y) throw d;
        } else {
            a = Ia(a);
            try {
                for (;;) b.call(c, a.next(), undefined, a)
            } catch (f) {
                if (f !== Y) throw f;
            }
        }
    };

    function $(a) {
        this.e = {};
        this.a = [];
        var b = arguments.length;
        if (b > 1) {
            if (b % 2) throw Error("Uneven number of arguments");
            for (var c = 0; c < b; c += 2) Ka(this, arguments[c], arguments[c + 1])
        } else if (a) {
            var d;
            if (a instanceof $) {
                c = La(a);
                Ma(a);
                d = [];
                for (b = 0; b < a.a.length; b++) d.push(a.e[a.a[b]]);
                d = d
            } else {
                b = [];
                var f = 0;
                for (c in a) b[f++] = c;
                c = b;
                b = [];
                f = 0;
                for (d in a) b[f++] = a[d];
                d = b
            }
            for (b = 0; b < c.length; b++) Ka(this, c[b], d[b])
        }
    }
    $.prototype.b = 0;
    $.prototype.s = 0;

    function La(a) {
        Ma(a);
        return a.a.concat()
    }

    function Ma(a) {
        if (a.b != a.a.length) {
            for (var b = 0, c = 0; b < a.a.length;) {
                var d = a.a[b];
                if (Object.prototype.hasOwnProperty.call(a.e, d)) a.a[c++] = d;
                b++
            }
            a.a.length = c
        }
        if (a.b != a.a.length) {
            var f = {};
            for (c = b = 0; b < a.a.length;) {
                d = a.a[b];
                if (!Object.prototype.hasOwnProperty.call(f, d)) {
                    a.a[c++] = d;
                    f[d] = 1
                }
                b++
            }
            a.a.length = c
        }
    }
    function Na(a, b, c) {
        if (Object.prototype.hasOwnProperty.call(a.e, b)) return a.e[b];
        return c
    }
    function Ka(a, b, c) {
        if (!Object.prototype.hasOwnProperty.call(a.e, b)) {
            a.b++;
            a.a.push(b);
            a.s++
        }
        a.e[b] = c
    }
    $.prototype.o = function (a) {
        Ma(this);
        var b = 0,
            c = this.a,
            d = this.e,
            f = this.s,
            e = this,
            g = new Z;
        g.next = function () {
            for (;;) {
                if (f != e.s) throw Error("The map has changed since the iterator was created");
                if (b >= c.length) throw Y;
                var h = c[b++];
                return a ? h : d[h]
            }
        };
        return g
    };

    function Oa() {
        this.B = [];
        this.I = new $;
        this.Z = this.$ = this.aa = this.U = 0;
        this.K = new $;
        this.O = this.Y = 0;
        this.R = 1;
        this.Q = new O(0, 4E3);
        this.Q.j = function () {
            return new Pa
        };
        this.V = new O(0, 50);
        this.V.j = function () {
            return new Qa
        };
        var a = this;
        this.D = new O(0, 2E3);
        this.D.j = function () {
            return String(a.R++)
        };
        this.D.p = function () {};
        this.ba = 3
    }
    function Qa() {
        this.M = this.W = this.u = 0
    }
    Qa.prototype.toString = function () {
        var a = [];
        a.push(this.type, " ", this.u, " (", Math.round(this.W * 10) / 10, " ms)");
        this.M && a.push(" [VarAlloc = ", this.M, "]");
        return a.join("")
    };

    function Pa() {}
    function Ra(a, b, c, d) {
        var f = [];
        c == -1 ? f.push("    ") : f.push(Sa(a.z - c));
        f.push(" ", Ta(a.z - b));
        if (a.q == 0) f.push(" Start        ");
        else if (a.q == 1) {
            f.push(" Done ");
            f.push(Sa(a.ca - a.startTime), " ms ")
        } else f.push(" Comment      ");
        f.push(d, a);
        a.X > 0 && f.push("[VarAlloc ", a.X, "] ");
        return f.join("")
    }
    Pa.prototype.toString = function () {
        return this.type == null ? this.N : "[" + this.type + "] " + this.N
    };
    Oa.prototype.toString = function () {
        for (var a = [], b = -1, c = [], d = 0; d < this.B.length; d++) {
            var f = this.B[d];
            f.q == 1 && c.pop();
            a.push(" ", Ra(f, this.U, b, c.join("")));
            b = f.z;
            a.push("\n");
            f.q == 0 && c.push("|  ")
        }
        if (this.I.b != 0) {
            var e = ca();
            a.push(" Unstopped timers:\n");
            Ja(this.I, function (g) {
                a.push("  ", g, " (", e - g.startTime, " ms, started at ", Ta(g.startTime), ")\n")
            })
        }
        b = La(this.K);
        for (d = 0; d < b.length; d++) {
            c = Na(this.K, b[d]);
            c.u > 1 && a.push(" TOTAL ", c, "\n")
        }
        a.push("Total tracers created ", this.Y, "\n", "Total comments created ", this.O, "\n", "Overhead start: ", this.aa, " ms\n", "Overhead end: ", this.$, " ms\n", "Overhead comment: ", this.Z, " ms\n");
        return a.join("")
    };

    function Sa(a) {
        a = Math.round(a);
        var b = "";
        if (a < 1E3) b = " ";
        if (a < 100) b = "  ";
        if (a < 10) b = "   ";
        return b + a
    }
    function Ta(a) {
        a = Math.round(a);
        return String(100 + a / 1E3 % 60).substring(1, 3) + "." + String(1E3 + a % 1E3).substring(1, 4)
    }
    new Oa;
    new O(0, 100);
    window.jsprettify = {
        prettify: qa,
        prettifyHtml: K,
        prettifyStr: J,
        prettifyTextInputs: function () {
            for (var a = na(document, "textarea", void 0, void 0), b = 0, c = a.length; b < c; ++b) {
                var d = a[b];
                d.value = J(d.value)
            }
            a = na(document, "input", void 0, void 0);
            b = 0;
            for (c = a.length; b < c; ++b) {
                d = a[b];
                if (d.type == "text") d.value = J(d.value)
            }
            a = oa(document.body, function (f) {
                return f.contentEditable == "true"
            });
            b = 0;
            for (c = a.length; b < c; ++b) K(a[b])
        },
        run: function () {
            Da(window, "load", function () {
                qa()
            })
        }
    };
    for (var Ua in window.jsprettify) window[Ua] = function () {
        alert("WARNING: this page is calling jsprettify in a deprecated manner. The correct, current way to call jsprettify is through window.jsprettify.*, not window.*. Sorry for the inconvenience.");
        window.jsprettify[Ua]()
    };
    window.prettifyTextInputs = function () {
        alert("You appear to be using an out-of-date version of the jsprettify bookmarklet. It may go away at some point. Meanwhile, go to http://code.google.com/p/jsprettify/wiki/MakingInputsPretty to get the updated bookmarklet.")
    };
})()