// Knockout Mapping plugin v1.0
// (c) 2011 Steven Sanderson, Roy Jacobs - http://knockoutjs.com/
// License: Ms-Pl (http://www.opensource.org/licenses/ms-pl.html)

ko.exportSymbol = function (i, p) {
    for (var j = i.split("."), r = window, k = 0; k < j.length - 1; k++)r = r[j[k]];
    r[j[j.length - 1]] = p
};
ko.exportProperty = function (i, p, j) {
    i[p] = j
};
(function () {
    function i(a, c) {
        for (var b in c)c.hasOwnProperty(b) && c[b] && (a[b] = c[b])
    }

    function p(a, c) {
        var b = {};
        i(b, a);
        i(b, c);
        return b
    }

    function j(a) {
        if (a && typeof a === "object" && a.constructor == (new Date).constructor)return"date";
        return typeof a
    }

    function r() {
        ko.dependentObservable = function (a, c, b) {
            b = b || {};
            b.deferEvaluation = !0;
            a = new v(a, c, b);
            a.__ko_proto__ = v;
            return a
        }
    }

    function k(a, c, b, d, e, g) {
        var l = ko.utils.unwrapObservable(c)instanceof Array;
        if (ko.mapping.isMapped(a))var h = ko.utils.unwrapObservable(a)[m], b =
            p(h, b);
        d = d || new x;
        if (d.get(c))return a;
        e = e || "";
        if (l) {
            var g = [], f = function (a) {
                return a
            };
            if (b[e] && b[e].key)f = b[e].key;
            if (!ko.isObservable(a))a = ko.observableArray([]), a.mappedRemove = function (b) {
                var c = typeof b == "function" ? b : function (a) {
                    return a === f(b)
                };
                return a.remove(function (a) {
                    return c(f(a))
                })
            }, a.mappedRemoveAll = function (b) {
                var c = s(b, f);
                return a.remove(function (a) {
                    return ko.utils.arrayIndexOf(c, f(a)) != -1
                })
            }, a.mappedDestroy = function (b) {
                var c = typeof b == "function" ? b : function (a) {
                    return a === f(b)
                };
                return a.destroy(function (a) {
                    return c(f(a))
                })
            },
                a.mappedDestroyAll = function (b) {
                    var c = s(b, f);
                    return a.destroy(function (a) {
                        return ko.utils.arrayIndexOf(c, f(a)) != -1
                    })
                }, a.mappedIndexOf = function (b) {
                var c = s(a(), f), b = f(b);
                return ko.utils.arrayIndexOf(c, b)
            };
            for (var l = s(ko.utils.unwrapObservable(a), f).sort(), h = s(c, f).sort(), l = ko.utils.compareArrays(l, h), h = [], i = 0, u = l.length; i < u; i++) {
                var q = l[i], n;
                switch (q.status) {
                    case "added":
                        var o = t(ko.utils.unwrapObservable(c), q.value, f);
                        n = ko.utils.unwrapObservable(k(void 0, o, b, d, e, a));
                        o = ko.utils.arrayIndexOf(ko.utils.unwrapObservable(c),
                            o);
                        h[o] = n;
                        break;
                    case "retained":
                        o = t(ko.utils.unwrapObservable(c), q.value, f);
                        n = t(a, q.value, f);
                        k(n, o, b, d, e, a);
                        o = ko.utils.arrayIndexOf(ko.utils.unwrapObservable(c), o);
                        h[o] = n;
                        break;
                    case "deleted":
                        n = t(a, q.value, f)
                }
                g.push({event: q.status, item: n})
            }
            a(h);
            b[e] && b[e].arrayChanged && ko.utils.arrayForEach(g, function (a) {
                b[e].arrayChanged(a.event, a.item)
            })
        } else if (w(c)) {
            if (!a)if (b[e] && b[e].create instanceof Function)return r(), n = b[e].create({data: c, parent: g}), ko.dependentObservable = v, n; else a = {};
            d.save(c, a);
            y(c,
                function (f) {
                    var l = d.get(c[f]);
                    a[f] = l ? l : k(a[f], c[f], b, d, f, a);
                    b.mappedProperties[z(e, c, f)] = !0
                })
        } else switch (j(c)) {
            case "function":
                a = c;
                break;
            default:
                ko.isWriteableObservable(a) ? a(ko.utils.unwrapObservable(c)) : a = ko.observable(ko.utils.unwrapObservable(c))
        }
        return a
    }

    function u(a, c) {
        var b;
        c && (b = c(a));
        b || (b = a);
        return ko.utils.unwrapObservable(b)
    }

    function t(a, c, b) {
        a = ko.utils.arrayFilter(ko.utils.unwrapObservable(a), function (a) {
            return u(a, b) == c
        });
        if (a.length == 0)throw Error("When calling ko.update*, the key '" +
            c + "' was not found!");
        if (a.length > 1 && w(a[0]))throw Error("When calling ko.update*, the key '" + c + "' was not unique!");
        return a[0]
    }

    function s(a, c) {
        return ko.utils.arrayMap(ko.utils.unwrapObservable(a), function (a) {
            return c ? u(a, c) : a
        })
    }

    function y(a, c) {
        if (a instanceof Array)for (var b = 0; b < a.length; b++)c(b); else for (b in a)c(b)
    }

    function w(a) {
        return j(a) == "object" && a !== null && a !== void 0
    }

    function z(a, c, b) {
        var d = a || "";
        c instanceof Array ? a && (d += "[" + b + "]") : (a && (d += "."), d += b);
        return d
    }

    function x() {
        var a = [], c = [];
        this.save = function (b, d) {
            var e = ko.utils.arrayIndexOf(a, b);
            e >= 0 ? c[e] = d : (a.push(b), c.push(d))
        };
        this.get = function (b) {
            b = ko.utils.arrayIndexOf(a, b);
            return b >= 0 ? c[b] : void 0
        }
    }

    ko.mapping = {};
    var m = "__ko_mapping__", v = ko.dependentObservable, g;
    ko.mapping.fromJS = function (a, c, b) {
        if (arguments.length == 0)throw Error("When calling ko.fromJS, pass the object you want to convert.");
        var d;
        d = c || {};
        if (d.create instanceof Function || d.key instanceof Function || d.arrayChanged instanceof Function)d = {"": d};
        d.mappedProperties =
        {};
        c = d;
        d = k(b, a, c);
        d[m] = p(d[m], c);
        return d
    };
    ko.mapping.fromJSON = function (a, c) {
        var b = ko.utils.parseJson(a);
        return ko.mapping.fromJS(b, c)
    };
    ko.mapping.isMapped = function (a) {
        return(a = ko.utils.unwrapObservable(a)) && a[m]
    };
    ko.mapping.updateFromJS = function (a, c) {
        if (arguments.length < 2)throw Error("When calling ko.updateFromJS, pass: the object to update and the object you want to update from.");
        if (!a)throw Error("The object is undefined.");
        if (!a[m])throw Error("The object you are trying to update was not created by a 'fromJS' or 'fromJSON' mapping.");
        return k(a, c, a[m])
    };
    ko.mapping.updateFromJSON = function (a, c, b) {
        c = ko.utils.parseJson(c);
        return ko.mapping.updateFromJS(a, c, b)
    };
    ko.mapping.toJS = function (a, c) {
        g || ko.mapping.resetDefaultOptions();
        if (arguments.length == 0)throw Error("When calling ko.mapping.toJS, pass the object you want to convert.");
        if (!(g.ignore instanceof Array))throw Error("ko.mapping.defaultOptions().ignore should be an array.");
        if (!(g.include instanceof Array))throw Error("ko.mapping.defaultOptions().include should be an array.");
        c = c || {};
        if (!(c.ignore instanceof Array))c.ignore = [c.ignore];
        c.ignore = c.ignore.concat(g.ignore);
        if (!(c.include instanceof Array))c.include = [c.include];
        c.include = c.include.concat(g.include);
        return ko.mapping.visitModel(a, function (a) {
            return ko.utils.unwrapObservable(a)
        }, c)
    };
    ko.mapping.toJSON = function (a, c) {
        var b = ko.mapping.toJS(a, c);
        return ko.utils.stringifyJson(b)
    };
    ko.mapping.defaultOptions = function () {
        if (arguments.length > 0)g = arguments[0]; else return g
    };
    ko.mapping.resetDefaultOptions = function () {
        g = {include: ["_destroy"],
            ignore: []}
    };
    ko.mapping.visitModel = function (a, c, b) {
        b = b || {};
        b.visitedObjects = b.visitedObjects || new x;
        var d, e = ko.utils.unwrapObservable(a);
        if (w(e))c(a, b.parentName), d = e instanceof Array ? [] : {}; else return c(a, b.parentName);
        b.visitedObjects.save(a, d);
        var g = b.parentName;
        y(e, function (a) {
            if (!(b.ignore && ko.utils.arrayIndexOf(b.ignore, a) != -1)) {
                var h = e[a];
                b.parentName = z(g, e, a);
                if (!(b.include && ko.utils.arrayIndexOf(b.include, a) === -1) || !e[m] || !e[m].mappedProperties || e[m].mappedProperties[a] || e instanceof Array)switch (j(ko.utils.unwrapObservable(h))) {
                    case "object":
                    case "undefined":
                        var f =
                            b.visitedObjects.get(h);
                        d[a] = f !== void 0 ? f : ko.mapping.visitModel(h, c, b);
                        break;
                    default:
                        d[a] = c(h, b.parentName)
                }
            }
        });
        return d
    };
    ko.exportSymbol("ko.mapping", ko.mapping);
    ko.exportSymbol("ko.mapping.fromJS", ko.mapping.fromJS);
    ko.exportSymbol("ko.mapping.fromJSON", ko.mapping.fromJSON);
    ko.exportSymbol("ko.mapping.isMapped", ko.mapping.isMapped);
    ko.exportSymbol("ko.mapping.defaultOptions", ko.mapping.defaultOptions);
    ko.exportSymbol("ko.mapping.toJS", ko.mapping.toJS);
    ko.exportSymbol("ko.mapping.toJSON", ko.mapping.toJSON);
    ko.exportSymbol("ko.mapping.updateFromJS", ko.mapping.updateFromJS);
    ko.exportSymbol("ko.mapping.updateFromJSON", ko.mapping.updateFromJSON);
    ko.exportSymbol("ko.mapping.visitModel", ko.mapping.visitModel)
})();
