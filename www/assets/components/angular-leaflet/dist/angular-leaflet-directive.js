/*! angular-leaflet-directive 30-10-2013 */
var leafletDirective = angular.module("leaflet-directive", []);
leafletDirective.directive("leaflet", ["$http", "$log", "$parse", "$rootScope",
    function (a, b, c, d) {
        var e = {
            maxZoom: 14,
            minZoom: 1,
            doubleClickZoom: !0,
            scrollWheelZoom: !0,
            keyboard: !0,
            dragging: !0,
            zoomControl: !0,
            attributionControl: !0,
            zoomsliderControl: !1,
            controlLayersPosition: "topright",
            tileLayer: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            tileLayerOptions: {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            },
            icon: {
                url: "http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon.png",
                retinaUrl: "http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-icon-2x.png",
                size: [25, 41],
                anchor: [12, 40],
                popup: [0, -40],
                shadow: {
                    url: "http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-shadow.png",
                    retinaUrl: "http://cdn.leafletjs.com/leaflet-0.6.4/images/marker-shadow.png",
                    size: [41, 41],
                    anchor: [12, 40]
                }
            },
            path: {
                weight: 10,
                opacity: 1,
                color: "#0000ff"
            },
            center: {
                lat: 0,
                lng: 0,
                zoom: 1
            }
        }, f = L.Icon.extend({
                options: {
                    iconUrl: e.icon.url,
                    iconRetinaUrl: e.icon.retinaUrl,
                    iconSize: e.icon.size,
                    iconAnchor: e.icon.anchor,
                    popupAnchor: e.icon.popup,
                    shadowUrl: e.icon.shadow.url,
                    shadowRetinaUrl: e.icon.shadow.retinaUrl,
                    shadowSize: e.icon.shadow.size,
                    shadowAnchor: e.icon.shadow.anchor
                }
            }),
            g = {
                AwesomeMarkersPlugin: {
                    isLoaded: function () {
                        return void 0 !== L.AwesomeMarkers ? void 0 !== L.AwesomeMarkers.Icon : !1
                    },
                    is: function (a) {
                        return this.isLoaded() ? a instanceof L.AwesomeMarkers.Icon : !1
                    },
                    equal: function (a, c) {
                        return this.isLoaded ? this.is(a) && this.is(c) ? a.options.icon === c.options.icon && a.options.iconColor === c.options.iconColor && a.options.color === c.options.color && a.options.iconSize[0] === c.options.iconSize[0] && a.options.iconSize[1] === c.options.iconSize[1] && a.options.iconAnchor[0] === c.options.iconAnchor[0] && a.options.iconAnchor[1] === c.options.iconAnchor[1] && a.options.popupAnchor[0] === c.options.popupAnchor[0] && a.options.popupAnchor[1] === c.options.popupAnchor[1] && a.options.shadowAnchor[0] === c.options.shadowAnchor[0] && a.options.shadowAnchor[1] === c.options.shadowAnchor[1] && a.options.shadowSize[0] === c.options.shadowSize[0] && a.options.shadowSize[1] === c.options.shadowSize[1] : !1 : (b.error("[AngularJS - Leaflet] AwesomeMarkers Plugin not Loaded"), !1)
                    }
                },
                MarkerClusterPlugin: {
                    isLoaded: function () {
                        return void 0 !== L.MarkerClusterGroup
                    },
                    is: function (a) {
                        return this.isLoaded() ? a instanceof L.MarkerClusterGroup : !1
                    }
                },
                GoogleLayerPlugin: {
                    isLoaded: function () {
                        return void 0 !== L.Google
                    },
                    is: function (a) {
                        return this.isLoaded() ? a instanceof L.Google : !1
                    }
                },
                BingLayerPlugin: {
                    isLoaded: function () {
                        return void 0 !== L.BingLayer
                    },
                    is: function (a) {
                        return this.isLoaded() ? a instanceof L.BingLayer : !1
                    }
                },
                Leaflet: {
                    DivIcon: {
                        is: function (a) {
                            return a instanceof L.DivIcon
                        },
                        equal: function (a, b) {
                            return this.is(a) && this.is(b) ? a.options.html === b.options.html && a.options.iconSize[0] === b.options.iconSize[0] && a.options.iconSize[1] === b.options.iconSize[1] && a.options.iconAnchor[0] === b.options.iconAnchor[0] && a.options.iconAnchor[1] === b.options.iconAnchor[1] : !1
                        }
                    },
                    Icon: {
                        is: function (a) {
                            return a instanceof L.Icon
                        },
                        equal: function (a, b) {
                            return this.is(a) && this.is(b) ? a.options.iconUrl === b.options.iconUrl && a.options.iconRetinaUrl === b.options.iconRetinaUrl && a.options.iconSize[0] === b.options.iconSize[0] && a.options.iconSize[1] === b.options.iconSize[1] && a.options.iconAnchor[0] === b.options.iconAnchor[0] && a.options.iconAnchor[1] === b.options.iconAnchor[1] && a.options.shadowUrl === b.options.shadowUrl && a.options.shadowRetinaUrl === b.options.shadowRetinaUrl && a.options.shadowSize[0] === b.options.shadowSize[0] && a.options.shadowSize[1] === b.options.shadowSize[1] && a.options.shadowAnchor[0] === b.options.shadowAnchor[0] && a.options.shadowAnchor[1] === b.options.shadowAnchor[1] && a.options.popupAnchor[0] === b.options.popupAnchor[0] && a.options.popupAnchor[1] === b.options.popupAnchor[1] : !1
                        }
                    }
                }
            }, h = 'Add testing="testing" to <leaflet> tag to inspect this object';
        return {
            restrict: "E",
            replace: !0,
            transclude: false,
            scope: {
                center: "=center",
                maxBounds: "=maxbounds",
                bounds: "=bounds",
                marker: "=marker",
                markers: "=markers",
                legend: "=legend",
                geojson: "=geojson",
                defaults: "=defaults",
                paths: "=paths",
                tiles: "=tiles",
                events: "=events",
                layers: "=layers",
                customControls: "=customControls",
                leafletMap: "=leafletmap",
                eventBroadcast: "=eventBroadcast"
            },
            template: '<div class="angular-leaflet-map"></div>',
            link: function (a, i, j) {
                function k() {
                    a.maxBounds && (a.leaflet.minZoom = void 0)
                }

                function l() {
                    var b = a.$root.$$phase;
                    return !("$apply" === b || "$digest" === b)
                }

                function m(b) {
                    l() ? a.$apply(b) : a.$eval(b)
                }

                function n() {
                    function c(a, b) {
                        return function (c) {
                            var e = "leafletDirectiveMap." + a;
                            m(function (a) {
                                "emit" === b ? a.$emit(e, {
                                    leafletEvent: c
                                }) : "broadcast" === b && d.$broadcast(e, {
                                    leafletEvent: c
                                })
                            })
                        }
                    }
                    var e, f, g = ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "contextmenu", "focus", "blur", "preclick", "load", "unload", "viewreset", "movestart", "move", "moveend", "dragstart", "drag", "dragend", "zoomstart", "zoomend", "zoomlevelschange", "resize", "autopanstart", "layeradd", "layerremove", "baselayerchange", "overlayadd", "overlayremove", "locationfound", "locationerror", "popupopen", "popupclose"],
                        h = [],
                        i = "broadcast";
                    if (void 0 === a.eventBroadcast || null === a.eventBroadcast) h = g;
                    else if ("object" != typeof a.eventBroadcast) b.warn("[AngularJS - Leaflet] event-broadcast must be an object check your model.");
                    else if (void 0 === a.eventBroadcast.map || null === a.eventBroadcast.map) h = g;
                    else if ("object" != typeof a.eventBroadcast.map) b.warn("[AngularJS - Leaflet] event-broadcast.map must be an object check your model.");
                    else {
                        void 0 !== a.eventBroadcast.map.logic && null !== a.eventBroadcast.map.logic && ("emit" !== a.eventBroadcast.map.logic && "broadcast" !== a.eventBroadcast.map.logic ? b.warn("[AngularJS - Leaflet] Available event propagation logic are: 'emit' or 'broadcast'.") : "emit" === a.eventBroadcast.map.logic && (i = "emit"));
                        var j = !1,
                            k = !1;
                        if (void 0 !== a.eventBroadcast.map.enable && null !== a.eventBroadcast.map.enable && "object" == typeof a.eventBroadcast.map.enable && (j = !0), void 0 !== a.eventBroadcast.map.disable && null !== a.eventBroadcast.map.disable && "object" == typeof a.eventBroadcast.map.disable && (k = !0), j && k) b.warn("[AngularJS - Leaflet] can not enable and disable events at the time");
                        else if (j || k)
                            if (j)
                                for (e = 0; e < a.eventBroadcast.map.enable.length; e++) f = a.eventBroadcast.map.enable[e], -1 !== h.indexOf(f) ? b.warn("[AngularJS - Leaflet] This event " + f + " is already enabled") : -1 === g.indexOf(f) ? b.warn("[AngularJS - Leaflet] This event " + f + " does not exist") : h.push(f);
                            else
                                for (h = g, e = 0; e < a.eventBroadcast.map.disable.length; e++) {
                                    f = a.eventBroadcast.map.disable[e];
                                    var l = h.indexOf(f); - 1 === l ? b.warn("[AngularJS - Leaflet] This event " + f + " does not exist or has been already disabled") : h.splice(l, 1)
                                } else b.warn("[AngularJS - Leaflet] must enable or disable events")
                    }
                    for (e = 0; e < h.length; e++) f = h[e], S.on(f, c(f, i), {
                        eventName: f
                    })
                }

                function o() {
                    if ("object" != typeof a.events) return !1;
                    for (var b in a.events) S.on(b, a.events[b])
                }

                function p() {
                    if (void 0 === a.layers || null === a.layers) x();
                    else {
                        if (void 0 === a.layers.baselayers || null === a.layers.baselayers || "object" != typeof a.layers.baselayers) return b.error("[AngularJS - Leaflet] At least one baselayer has to be defined"), a.leaflet.layers = j.testing ? T : h, void 0;
                        if (Object.keys(a.layers.baselayers).length <= 0) return b.error("[AngularJS - Leaflet] At least one baselayer has to be defined"), a.leaflet.layers = j.testing ? T : h, void 0;
                        T = {}, T.baselayers = {}, T.controls = {}, T.controls.layers = new L.control.layers, a.defaults && a.defaults.controlLayersPosition && T.controls.layers.setPosition(a.defaults.controlLayersPosition), T.controls.layers.addTo(S);
                        var c = !1;
                        for (var d in a.layers.baselayers) {
                            var e = q(a.layers.baselayers[d]);
                            null !== e && (T.baselayers[d] = e, a.layers.baselayers[d].top === !0 && (S.addLayer(T.baselayers[d]), c = !0), T.controls.layers.addBaseLayer(T.baselayers[d], a.layers.baselayers[d].name))
                        }!c && Object.keys(T.baselayers).length > 0 && S.addLayer(T.baselayers[Object.keys(a.layers.baselayers)[0]]), T.overlays = {};
                        for (d in a.layers.overlays) {
                            var f = q(a.layers.overlays[d]);
                            null !== f && (T.overlays[d] = f, a.layers.overlays[d].visible === !0 && S.addLayer(T.overlays[d]), T.controls.layers.addOverlay(T.overlays[d], a.layers.overlays[d].name))
                        }
                        a.$watch("layers.baselayers", function (c) {
                            for (var d in T.baselayers) void 0 === c[d] && (T.controls.layers.removeLayer(T.baselayers[d]), S.hasLayer(T.baselayers[d]) && S.removeLayer(T.baselayers[d]), delete T.baselayers[d]);
                            for (var e in c)
                                if (void 0 === T.baselayers[e]) {
                                    var f = q(c[e]);
                                    null !== f && (T.baselayers[e] = f, c[e].top === !0 && S.addLayer(T.baselayers[e]), T.controls.layers.addBaseLayer(T.baselayers[e], c[e].name))
                                }
                            if (Object.keys(T.baselayers).length <= 0) b.error("[AngularJS - Leaflet] At least one baselayer has to be defined");
                            else {
                                var g = !1;
                                for (var h in T.baselayers)
                                    if (S.hasLayer(T.baselayers[h])) {
                                        g = !0;
                                        break
                                    }
                                g || S.addLayer(T.baselayers[Object.keys(a.layers.baselayers)[0]])
                            }
                        }, !0), a.$watch("layers.overlays", function (a) {
                            for (var b in T.overlays) void 0 === a[b] && (T.controls.layers.removeLayer(T.overlays[b]), S.hasLayer(T.overlays[b]) && S.removeLayer(T.overlays[b]), delete T.overlays[b]);
                            for (var c in a)
                                if (void 0 === T.overlays[c]) {
                                    var d = q(a[c]);
                                    null !== d && (T.overlays[c] = d, T.controls.layers.addOverlay(T.overlays[c], a[c].name), a[c].visible === !0 && S.addLayer(T.overlays[c]))
                                }
                        }, !0)
                    }
                    a.leaflet.layers = j.testing ? T : h
                }

                function q(a) {
                    if (void 0 === a.type || null === a.type || "string" != typeof a.type) return b.error("[AngularJS - Leaflet] A base layer must have a type"), null;
                    if ("xyz" !== a.type && "wms" !== a.type && "group" !== a.type && "markercluster" !== a.type && "google" !== a.type && "bing" !== a.type) return b.error('[AngularJS - Leaflet] A layer must have a valid type: "xyz, wms, group, google"'), null;
                    if (!("xyz" !== a.type && "wms" !== a.type || void 0 !== a.url && null !== a.url && "string" == typeof a.url)) return b.error("[AngularJS - Leaflet] A base layer must have an url"), null;
                    if (void 0 === a.name || null === a.name || "string" != typeof a.name) return b.error("[AngularJS - Leaflet] A base layer must have a name"), null;
                    (void 0 === a.layerParams || null === a.layerParams || "object" != typeof a.layerParams) && (a.layerParams = {}), (void 0 === a.layerOptions || null === a.layerOptions || "object" != typeof a.layerOptions) && (a.layerOptions = {});
                    var c = null;
                    for (var d in a.layerParams) a.layerOptions[d] = a.layerParams[d];
                    switch (a.type) {
                    case "xyz":
                        c = r(a.url, a.layerOptions);
                        break;
                    case "wms":
                        c = s(a.url, a.layerOptions);
                        break;
                    case "group":
                        c = t();
                        break;
                    case "markercluster":
                        c = u(a.layerOptions);
                        break;
                    case "google":
                        c = v(a.layerType, a.layerOptions);
                        break;
                    case "bing":
                        c = w(a.bingKey, a.layerOptions);
                        break;
                    default:
                        c = null
                    }
                    return c
                }

                function r(a, b) {
                    var c = L.tileLayer(a, b);
                    return c
                }

                function s(a, b) {
                    var c = L.tileLayer.wms(a, b);
                    return c
                }

                function t() {
                    var a = L.layerGroup();
                    return a
                }

                function u(a) {
                    if (g.MarkerClusterPlugin.isLoaded()) {
                        var b = new L.MarkerClusterGroup(a);
                        return b
                    }
                    return null
                }

                function v(a, b) {
                    if (a = a || "SATELLITE", g.GoogleLayerPlugin.isLoaded()) {
                        var c = new L.Google(a, b);
                        return c
                    }
                    return null
                }

                function w(a, b) {
                    if (g.BingLayerPlugin.isLoaded()) {
                        var c = new L.BingLayer(a, b);
                        return c
                    }
                    return null
                }

                function x() {
                    var b, c;
                    if (a.leaflet.tileLayer = j.defaults && a.defaults && a.defaults.tileLayer ? a.defaults.tileLayer : e.tileLayer, a.defaults && a.defaults.tileLayerOptions)
                        for (c in a.defaults.tileLayerOptions) e.tileLayerOptions[c] = a.defaults.tileLayerOptions[c];
                    if (j.tiles) {
                        if (a.tiles && a.tiles.url && (a.leaflet.tileLayer = a.tiles.url), a.tiles && a.tiles.options)
                            for (c in a.tiles.options) e.tileLayerOptions[c] = a.tiles.options[c];
                        a.$watch("tiles.url", function (a) {
                            a && b.setUrl(a)
                        })
                    }
                    b = L.tileLayer(a.leaflet.tileLayer, e.tileLayerOptions), b.addTo(S), a.leaflet.tileLayerObj = j.testing ? b : h
                }

                function y() {
                    if (a.legend)
                        if (a.legend.colors && a.legend.labels && a.legend.colors.length === a.legend.labels.length) {
                            var c = a.legendClass ? a.legendClass : "legend",
                                d = a.legend.position || "bottomright",
                                e = L.control({
                                    position: d
                                });
                            e.onAdd = function () {
                                for (var b = L.DomUtil.create("div", c), d = 0; d < a.legend.colors.length; d++) b.innerHTML += '<div><i style="background:' + a.legend.colors[d] + '"></i>' + a.legend.labels[d] + "</div>";
                                return b
                            }, e.addTo(S)
                        } else b.warn("[AngularJS - Leaflet] legend.colors and legend.labels must be set.")
                }

                function z() {
                    a.maxBounds && a.maxBounds.southWest && a.maxBounds.southWest.lat && a.maxBounds.southWest.lng && a.maxBounds.northEast && a.maxBounds.northEast.lat && a.maxBounds.northEast.lng && a.$watch("maxBounds", function (a) {
                        a.southWest && a.northEast && a.southWest.lat && a.southWest.lng && a.northEast.lat && a.northEast.lng && S.setMaxBounds(new L.LatLngBounds(new L.LatLng(a.southWest.lat, a.southWest.lng), new L.LatLng(a.northEast.lat, a.northEast.lng)))
                    })
                }

                function A(a) {
                    var b = a.southWest,
                        c = a.northEast;
                    return a && b && c && b.lat && b.lng && c.lat && c.lng
                }

                function B(a) {
                    if (A(a)) {
                        var b = a.southWest,
                            c = a.northEast,
                            d = new L.LatLngBounds(new L.LatLng(b.lat, b.lng), new L.LatLng(c.lat, c.lng));
                        S.getBounds().equals(d) || S.fitBounds(d)
                    }
                }

                function C() {
                    a.bounds && a.$watch("bounds", function (a) {
                        B(a)
                    }, !0)
                }

                function D() {
                    if (a.bounds) {
                        var b = S.getBounds(),
                            c = b.getSouthWest(),
                            d = b.getNorthEast();
                        a.bounds = {
                            southWest: {
                                lat: c.lat,
                                lng: c.lng
                            },
                            northEast: {
                                lat: d.lat,
                                lng: d.lng
                            }
                        }
                    }
                }

                function E() {
                    if (!a.center) return b.warn("[AngularJS - Leaflet] 'center' is undefined in the current scope, did you forget to initialize it?"), S.setView([e.center.lat, e.center.lng], e.center.zoom), D(), void 0;
                    void 0 !== a.center.lat && null !== a.center.lat && "number" == typeof a.center.lat && void 0 !== a.center.lng && null !== a.center.lng && "number" == typeof a.center.lng && void 0 !== a.center.zoom && null !== a.center.zoom && "number" == typeof a.center.zoom ? (S.setView([a.center.lat, a.center.lng], a.center.zoom), D()) : j.center.autoDiscover === !0 ? S.locate({
                        setView: !0,
                        maxZoom: a.leaflet.maxZoom
                    }) : (b.warn("[AngularJS - Leaflet] 'center' is incorrect"), S.setView([e.center.lat, e.center.lng], e.center.zoom), D());
                    var d = {
                        lat: c("center.lat"),
                        lng: c("center.lng"),
                        zoom: c("center.zoom")
                    }, f = !1;
                    a.$watch("center", function (c, d) {
                        return c ? (f || d && (void 0 !== c.lat && null !== c.lat && "number" == typeof c.lat && void 0 !== c.lng && null !== c.lng && "number" == typeof c.lng && void 0 !== c.zoom && null !== c.zoom && "number" == typeof c.zoom ? void 0 !== d.lat && null !== d.lat && "number" == typeof d.lat && void 0 !== d.lng && null !== d.lng && "number" == typeof d.lng && void 0 !== d.zoom && null !== d.zoom && "number" == typeof d.zoom ? (c.lat !== d.lat || c.lng !== d.lng || c.zoom !== d.zoom) && (S.setView([c.lat, c.lng], c.zoom), D()) : (S.setView([c.lat, c.lng], c.zoom), D()) : c.autoDiscover === !0 && d.autoDiscover !== !0 ? S.locate({
                            setView: !0,
                            maxZoom: a.leaflet.maxZoom
                        }) : (void 0 === c.autoDiscover || null === c.autoDiscover) && (b.warn("[AngularJS - Leaflet] 'center' is incorrect"), S.setView([e.center.lat, e.center.lng], e.center.zoom))), void 0) : (b.warn("[AngularJS - Leaflet] 'center' have been removed?"), S.setView([e.center.lat, e.center.lng], e.center.zoom), void 0)
                    }, !0), S.on("movestart", function () {
                        f = !0
                    }), S.on("moveend", function () {
                        f = !1, m(function (a) {
                            d && (d.lat.assign(a, S.getCenter().lat), d.lng.assign(a, S.getCenter().lng), d.zoom.assign(a, S.getZoom())), D()
                        })
                    })
                }

                function F() {
                    a.$watch("geojson", function (b) {
                        if (b && (a.leaflet.geojson && S.removeLayer(a.leaflet.geojson), b.hasOwnProperty("data"))) {
                            var c = a.geojson.resetStyleOnMouseout;
                            a.leaflet.geojson = L.geoJson(a.geojson.data, {
                                style: a.geojson.style,
                                onEachFeature: function (e, f) {
                                    f.on({
                                        mouseover: function (a) {
                                            m(function () {
                                                b.selected = e, d.$broadcast("leafletDirectiveMap.geojsonMouseover", a)
                                            })
                                        },
                                        mouseout: function (e) {
                                            c && a.leaflet.geojson.resetStyle(e.target), m(function () {
                                                b.selected = void 0, d.$broadcast("leafletDirectiveMap.geojsonMouseout", e)
                                            })
                                        },
                                        click: function (a) {
                                            m(function () {
                                                d.$broadcast("leafletDirectiveMap.geojsonClick", b.selected, a)
                                            })
                                        }
                                    })
                                }
                            }).addTo(S)
                        }
                    })
                }

                function G() {
                    var b;
                    a.marker && (b = I("marker", a.marker, S), a.leaflet.marker = j.testing ? b : h, b.on("click", function () {
                        m(function () {
                            d.$broadcast("leafletDirectiveMainMarkerClick")
                        })
                    }))
                }

                function H() {
                    var b = {};
                    if (a.markers) {
                        for (var c in a.markers) {
                            var d = I("markers." + c, a.markers[c], S);
                            null !== d && (b[c] = d)
                        }
                        a.$watch("markers", function (c) {
                            for (var d in b)
                                if (void 0 === c[d]) {
                                    if (b[d].closePopup(), void 0 !== T && null !== T && void 0 !== T.overlays)
                                        for (var e in T.overlays) T.overlays[e] instanceof L.LayerGroup && T.overlays[e].hasLayer(b[d]) && T.overlays[e].removeLayer(b[d]);
                                    S.removeLayer(b[d]), delete b[d]
                                }
                            for (var f in c)
                                if (void 0 === b[f]) {
                                    var g = I("markers." + f, a.markers[f], S);
                                    null !== g && (b[f] = g)
                                }
                        }, !0), a.leaflet.markers = j.testing ? b : h
                    }
                }

                function I(c, e, h) {
                    function i(a, b) {
                        return function (f) {
                            var g = "leafletDirectiveMarker." + a,
                                h = c.replace("markers.", "");
                            "click" === a ? m(function () {
                                d.$broadcast("leafletDirectiveMarkersClick", h)
                            }) : "dragend" === a && (m(function () {
                                e.lat = j.getLatLng().lat, e.lng = j.getLatLng().lng
                            }), e.message && e.focus === !0 && j.openPopup()), m(function (a) {
                                "emit" === b ? a.$emit(g, {
                                    markerName: h,
                                    leafletEvent: f
                                }) : d.$broadcast(g, {
                                    markerName: h,
                                    leafletEvent: f
                                })
                            })
                        }
                    }
                    var j = J(e);
                    if (void 0 === e.layer) h.addLayer(j), e.focus === !0 && j.openPopup();
                    else {
                        if ("string" != typeof e.layer) return b.error("[AngularJS - Leaflet] A layername must be a string"), null;
                        if (null === T) return b.error("[AngularJS - Leaflet] You must add layers to the directive if used in a marker"), null;
                        if (null === T.overlays || void 0 === T.overlays) return b.error("[AngularJS - Leaflet] You must add layers overlays to the directive if used in a marker"), null;
                        if (void 0 === T.overlays[e.layer] && null === T.overlays[e.layer]) return b.error("[AngularJS - Leaflet] You must use a name of an existing layer"), null;
                        var k = T.overlays[e.layer];
                        if (!(k instanceof L.LayerGroup)) return b.error('[AngularJS - Leaflet] A marker can only be added to a layer of type "group"'), null;
                        k.addLayer(j), h.hasLayer(j) && e.focus === !0 && j.openPopup()
                    }
                    var l, n, o = ["click", "dblclick", "mousedown", "mouseover", "mouseout", "contextmenu", "dragstart", "drag", "dragend", "move", "remove", "popupopen", "popupclose"],
                        p = [],
                        q = "broadcast";
                    if (void 0 === a.eventBroadcast || null === a.eventBroadcast) p = o;
                    else if ("object" != typeof a.eventBroadcast) b.warn("[AngularJS - Leaflet] event-broadcast must be an object check your model.");
                    else if (void 0 === a.eventBroadcast.marker || null === a.eventBroadcast.marker) p = o;
                    else if ("object" != typeof a.eventBroadcast.marker) b.warn("[AngularJS - Leaflet] event-broadcast.marker must be an object check your model.");
                    else {
                        void 0 !== a.eventBroadcast.marker.logic && null !== a.eventBroadcast.marker.logic && ("emit" !== a.eventBroadcast.marker.logic && "broadcast" !== a.eventBroadcast.marker.logic ? b.warn("[AngularJS - Leaflet] Available event propagation logic are: 'emit' or 'broadcast'.") : "emit" === a.eventBroadcast.marker.logic && (q = "emit"));
                        var r = !1,
                            s = !1;
                        if (void 0 !== a.eventBroadcast.marker.enable && null !== a.eventBroadcast.marker.enable && "object" == typeof a.eventBroadcast.marker.enable && (r = !0), void 0 !== a.eventBroadcast.marker.disable && null !== a.eventBroadcast.marker.disable && "object" == typeof a.eventBroadcast.marker.disable && (s = !0), r && s) b.warn("[AngularJS - Leaflet] can not enable and disable events at the same time");
                        else if (r || s)
                            if (r)
                                for (l = 0; l < a.eventBroadcast.marker.enable.length; l++) n = a.eventBroadcast.marker.enable[l], -1 !== p.indexOf(n) ? b.warn("[AngularJS - Leaflet] This event " + n + " is already enabled") : -1 === o.indexOf(n) ? b.warn("[AngularJS - Leaflet] This event " + n + " does not exist") : p.push(n);
                            else
                                for (p = o, l = 0; l < a.eventBroadcast.marker.disable.length; l++) {
                                    n = a.eventBroadcast.marker.disable[l];
                                    var t = p.indexOf(n); - 1 === t ? b.warn("[AngularJS - Leaflet] This event " + n + " does not exist or has been already disabled") : p.splice(t, 1)
                                } else b.warn("[AngularJS - Leaflet] must enable or disable events")
                    }
                    for (l = 0; l < p.length; l++) n = p[l], j.on(n, i(n, q), {
                        eventName: n,
                        scope_watch_name: c
                    });
                    var u = a.$watch(c, function (a, c) {
                        if (!a) {
                            if (j.closePopup(), void 0 !== T && null !== T && void 0 !== T.overlays)
                                for (var d in T.overlays) T.overlays[d] instanceof L.LayerGroup && T.overlays[d].hasLayer(j) && T.overlays[d].removeLayer(j);
                            return h.removeLayer(j), u(), void 0
                        }
                        if (c) {
                            if (void 0 === a.layer || null === a.layer || "string" != typeof a.layer) void 0 !== c.layer && null !== c.layer && "string" == typeof c.layer && (void 0 !== T.overlays[c.layer] && T.overlays[c.layer].hasLayer(j) && (T.overlays[c.layer].removeLayer(j), j.closePopup()), h.hasLayer(j) || h.addLayer(j));
                            else if (void 0 === c.layer || null === c.layer || c.layer !== a.layer)
                                if ("string" == typeof c.layer && void 0 !== T.overlays[c.layer] && T.overlays[c.layer].hasLayer(j) && T.overlays[c.layer].removeLayer(j), j.closePopup(), h.hasLayer(j) && h.removeLayer(j), void 0 !== T.overlays[a.layer]) {
                                    var e = T.overlays[a.layer];
                                    e instanceof L.LayerGroup ? (e.addLayer(j), h.hasLayer(j) && a.focus === !0 && j.openPopup()) : b.error('[AngularJS - Leaflet] A marker can only be added to a layer of type "group"')
                                } else b.error("[AngularJS - Leaflet] You must use a name of an existing layer");
                            if (void 0 === a.draggable || null === a.draggable || a.draggable !== !0 ? void 0 !== c.draggable && null !== c.draggable && c.draggable === !0 && j.dragging && j.dragging.disable() : (void 0 === c.draggable || null === c.draggable || c.draggable !== !0) && (j.dragging ? j.dragging.enable() : L.Handler.MarkerDrag && (j.dragging = new L.Handler.MarkerDrag(j), j.options.draggable = !0, j.dragging.enable())), void 0 === a.icon || null === a.icon || "object" != typeof a.icon) void 0 !== c.icon && null !== c.icon && "object" == typeof c.icon && (j.setIcon(new f), j.closePopup(), j.unbindPopup(), void 0 !== a.message && null !== a.message && "string" == typeof a.message && "" !== a.message && j.bindPopup(a.message));
                            else if (void 0 === c.icon || null === c.icon || "object" != typeof c.icon) {
                                var i = !1;
                                j.dragging && (i = j.dragging.enabled()), g.AwesomeMarkersPlugin.is(a.icon) ? j.setIcon(a.icon) : g.Leaflet.DivIcon.is(a.icon) || g.Leaflet.Icon.is(a.icon) ? j.setIcon(a.icon) : j.setIcon(new f(a.icon)), i && j.dragging.enable(), j.closePopup(), j.unbindPopup(), void 0 !== a.message && null !== a.message && "string" == typeof a.message && "" !== a.message && j.bindPopup(a.message)
                            } else if (g.AwesomeMarkersPlugin.is(a.icon)) {
                                if (!g.AwesomeMarkersPlugin.equal(a.icon, c.icon)) {
                                    var k = !1;
                                    j.dragging && (k = j.dragging.enabled()), j.setIcon(a.icon), k && j.dragging.enable(), j.closePopup(), j.unbindPopup(), void 0 !== a.message && null !== a.message && "string" == typeof a.message && "" !== a.message && j.bindPopup(a.message)
                                }
                            } else if (g.Leaflet.DivIcon.is(a.icon)) {
                                if (!g.Leaflet.DivIcon.equal(a.icon, c.icon)) {
                                    var l = !1;
                                    j.dragging && (l = j.dragging.enabled()), j.setIcon(a.icon), l && j.dragging.enable(), j.closePopup(), j.unbindPopup(), void 0 !== a.message && null !== a.message && "string" == typeof a.message && "" !== a.message && j.bindPopup(a.message)
                                }
                            } else if (g.Leaflet.Icon.is(a.icon)) {
                                if (!g.Leaflet.Icon.equal(a.icon, c.icon)) {
                                    var m = !1;
                                    j.dragging && (m = j.dragging.enabled()), j.setIcon(a.icon), m && j.dragging.enable(), j.closePopup(), j.unbindPopup(), void 0 !== a.message && null !== a.message && "string" == typeof a.message && "" !== a.message && j.bindPopup(a.message)
                                }
                            } else if (JSON.stringify(a.icon) !== JSON.stringify(c.icon)) {
                                var n = !1;
                                j.dragging && (n = j.dragging.enabled()), j.setIcon(new f(a.icon)), n && j.dragging.enable(), j.closePopup(), j.unbindPopup(), void 0 !== a.message && null !== a.message && "string" == typeof a.message && "" !== a.message && j.bindPopup(a.message)
                            }
                            if (void 0 === a.message || null === a.message || "string" != typeof a.message || "" === a.message ? void 0 !== c.message && null !== c.message && "string" == typeof c.message && "" !== c.message && (j.closePopup(), j.unbindPopup()) : void 0 === c.message || null === c.message || "string" != typeof c.message || "" === c.message ? (j.bindPopup(a.message), a.focus === !0 && j.openPopup()) : a.message !== c.message && j.setPopupContent(a.message), void 0 === a.focus || null === a.focus || a.focus !== !0 ? void 0 !== c.focus && null !== c.focus && c.focus === !0 && j.closePopup() : (void 0 === c.focus || null === c.focus || c.focus !== !0) && j.openPopup(), void 0 === a.lat || null === a.lat || isNaN(a.lat) || "number" != typeof a.lat || void 0 === a.lng || null === a.lng || isNaN(a.lng) || "number" != typeof a.lng) {
                                if (b.warn("There are problems with lat-lng data, please verify your marker model"), null !== T && void 0 !== T.overlays && null !== T.overlays)
                                    for (var o in T.overlays)(T.overlays[o] instanceof L.LayerGroup || g.MarkerClusterPlugin.is(T.overlays[o])) && T.overlays[o].hasLayer(j) && T.overlays[o].removeLayer(j);
                                h.removeLayer(j)
                            } else {
                                var p = j.getLatLng();
                                if (p.lat !== a.lat || p.lng !== a.lng) {
                                    var q = !1;
                                    void 0 !== a.layer && null !== a.layer && "string" == typeof a.layer && g.MarkerClusterPlugin.is(T.overlays[a.layer]) && (T.overlays[a.layer].removeLayer(j), q = !0), j.setLatLng([a.lat, a.lng]), q && T.overlays[a.layer].addLayer(j)
                                }
                            }
                        }
                    }, !0);
                    return j
                }

                function J(a) {
                    var b = null;
                    b = a.icon ? a.icon : new f;
                    var c = {
                        icon: b,
                        draggable: a.draggable ? !0 : !1
                    };
                    a.title && (c.title = a.title);
                    var d = new L.marker(a, c);
                    return a.message && d.bindPopup(a.message), d
                }

                function K() {
                    var c = {};
                    if (a.leaflet.paths = j.testing ? c : h, a.paths) {
                        b.warn("[AngularJS - Leaflet] Creating polylines and adding them to the map will break the directive's scope's inspection in AngularJS Batarang");
                        for (var d in a.paths) c[d] = M(d, a.paths[d], S);
                        a.$watch("paths", function (a) {
                            for (var b in a) void 0 === c[b] && (c[b] = M(b, a[b], S));
                            for (var d in c) void 0 === a[d] && delete c[d]
                        }, !0)
                    }
                }

                function M(b, c, d) {
                    function f(a, b) {
                        if (void 0 !== a.latlngs && (void 0 === b || a.latlngs !== b.latlngs)) switch (a.type) {
                            default:
                        case "polyline":
                        case "polygon":
                            g.setLatLngs(O(a.latlngs));
                            break;
                        case "multiPolyline":
                        case "multiPolygon":
                            g.setLatLngs(P(a.latlngs));
                            break;
                        case "rectangle":
                            g.setBounds(new L.LatLngBounds(O(a.latlngs)));
                            break;
                        case "circle":
                        case "circleMarker":
                            g.setLatLng(N(a.latlngs)), void 0 === a.radius || void 0 !== b && a.radius === b.radius || g.setRadius(a.radius)
                        }
                        void 0 === a.weight || void 0 !== b && a.weight === b.weight || g.setStyle({
                            weight: a.weight
                        }), void 0 === a.color || void 0 !== b && a.color === b.color || g.setStyle({
                            color: a.color
                        }), void 0 === a.opacity || void 0 !== b && a.opacity === b.opacity || g.setStyle({
                            opacity: a.opacity
                        })
                    }
                    var g, h = {
                            weight: e.path.weight,
                            color: e.path.color,
                            opacity: e.path.opacity
                        };
                    switch (void 0 !== c.stroke && (h.stroke = c.stroke), void 0 !== c.fill && (h.fill = c.fill), void 0 !== c.fillColor && (h.fillColor = c.fillColor), void 0 !== c.fillOpacity && (h.fillOpacity = c.fillOpacity), void 0 !== c.smoothFactor && (h.smoothFactor = c.smoothFactor), void 0 !== c.noClip && (h.noClip = c.noClip), void 0 === c.type && (c.type = "polyline"), c.type) {
                        default:
                    case "polyline":
                        g = new L.Polyline([], h);
                        break;
                    case "multiPolyline":
                        g = new L.multiPolyline([
                            [
                                [0, 0],
                                [1, 1]
                            ]
                        ], h);
                        break;
                    case "polygon":
                        g = new L.Polygon([], h);
                        break;
                    case "multiPolygon":
                        g = new L.MultiPolygon([
                            [
                                [0, 0],
                                [1, 1],
                                [0, 1]
                            ]
                        ], h);
                        break;
                    case "rectangle":
                        g = new L.Rectangle([
                            [0, 0],
                            [1, 1]
                        ], h);
                        break;
                    case "circle":
                        g = new L.Circle([0, 0], 1, h);
                        break;
                    case "circleMarker":
                        g = new L.CircleMarker([0, 0], h)
                    }
                    f(c), d.addLayer(g);
                    var i = a.$watch("paths." + b, function (a, b) {
                        return a ? (f(a, b), void 0) : (d.removeLayer(g), i(), void 0)
                    }, !0);
                    return g
                }

                function N(a) {
                    return new L.LatLng(a.lat, a.lng)
                }

                function O(a) {
                    return a.filter(function (a) {
                        return !!a.lat && !! a.lng
                    }).map(function (a) {
                        return new L.LatLng(a.lat, a.lng)
                    })
                }

                function P(a) {
                    return a.map(function (a) {
                        return O(a)
                    })
                }

                function Q() {
                    S.zoomControl && a.defaults && a.defaults.zoomControlPosition && S.zoomControl.setPosition(a.defaults.zoomControlPosition), S.zoomControl && a.defaults && a.defaults.zoomControl === !1 && S.zoomControl.removeFrom(S), S.zoomsliderControl && a.defaults && !a.defaults.zoomsliderControl && S.zoomsliderControl.removeFrom(S)
                }

                function R() {
                    if (a.customControls)
                        for (var b = 0, c = a.customControls.length; c > b; b++) S.addControl(a.customControls[b])
                }
                j.width && (isNaN(j.width) ? i.css("width", j.width) : i.css("width", j.width + "px")), j.height && (isNaN(j.height) ? i.css("height", j.height) : i.css("height", j.height + "px")), a.leaflet = {}, a.leaflet.maxZoom = j.defaults && a.defaults && a.defaults.maxZoom ? parseInt(a.defaults.maxZoom, 10) : e.maxZoom, a.leaflet.minZoom = j.defaults && a.defaults && a.defaults.minZoom ? parseInt(a.defaults.minZoom, 10) : e.minZoom, a.leaflet.doubleClickZoom = j.defaults && a.defaults && "boolean" == typeof a.defaults.doubleClickZoom ? a.defaults.doubleClickZoom : e.doubleClickZoom, a.leaflet.scrollWheelZoom = j.defaults && a.defaults && "boolean" == typeof a.defaults.scrollWheelZoom ? a.defaults.scrollWheelZoom : e.scrollWheelZoom, a.leaflet.keyboard = j.defaults && a.defaults && "boolean" == typeof a.defaults.keyboard ? a.defaults.keyboard : e.keyboard, a.leaflet.dragging = j.defaults && a.defaults && "boolean" == typeof a.defaults.dragging ? a.defaults.dragging : e.dragging, a.leaflet.attributionControl = j.defaults && a.defaults && "boolean" == typeof a.defaults.attributionControl ? a.defaults.attributionControl : e.attributionControl, k();
                var S = new L.Map(i[0], {
                    maxZoom: a.leaflet.maxZoom,
                    minZoom: a.leaflet.minZoom,
                    doubleClickZoom: a.leaflet.doubleClickZoom,
                    scrollWheelZoom: a.leaflet.scrollWheelZoom,
                    keyboard: a.leaflet.keyboard,
                    dragging: a.leaflet.dragging,
                    attributionControl: a.leaflet.attributionControl
                }),
                    T = null;
                a.leaflet.map = j.testing ? S : h, j.leafletmap && (a.leafletMap = j.leafletmap ? S : h), o(), n(), Q(), y(), R(), p(), E(), z(), C(), G(), H(), K(), F(), a.$on("leafletDirectiveSetMap", function (a, b) {
                    var c = b.shift();
                    S[c].apply(S, b)
                })
            }
        }
    }
]);