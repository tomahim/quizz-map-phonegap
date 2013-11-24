'use strict';

/* Controllers */

app.controller('AppCtrl', function($scope) {

    console.log('App ok');

	$scope.init = function() {

        console.log('init');

		var defaultCenter = {
		            lat: 49.66762782262192,
		            lng: 7.294921874999999,
		            zoom: 3
		        };

		var myStyle = {
		    "color": "#FF1CAE",
		    "weight": 0.2,
		    "opacity": 12
		};

		var myLines = {"type":"FeatureCollection",
		                "features":
                  [
                    {"type":"Feature",
                    "geometry":
                        {"type":"MultiPolygon",
                         "coordinates":
                            [
                                [[[9.45,42.68],[9.18,41.36],[8.58,42.38],[9.35,43],[9.45,42.68]]],[[[2.54,51.09],[4.15,49.98],[4.83,50.17],[5.81,49.55],[6.36,49.46],[8.23,48.96],[7.59,47.58],[6.99,47.5],[5.97,46.21],[6.79,46.43],[7.04,45.93],[7.13,45.26],[6.62,45.11],[6.98,44.28],[7.66,44.17],[7.53,43.79],[7.44,43.76],[7.42,43.77],[7.39,43.73],[6.17,43.05],[3.96,43.54],[3.08,43.07],[3.18,42.44],[1.72,42.51],[1.78,42.57],[1.45,42.6],[-1.78,43.36],[-1.04,44.68],[-1.25,44.66],[-1.08,45.56],[-0.54,44.9],[-0.78,45.46],[-1.24,45.7],[-1.11,46.32],[-2.13,46.84],[-2.13,47.28],[-1.73,47.21],[-4.37,47.8],[-4.73,48.04],[-4.19,48.3],[-4.78,48.51],[-1.37,48.64],[-1.94,49.72],[0.42,49.45],[0.07,49.53],[1.46,50.12],[1.63,50.88],[2.54,51.09]]]
                            ]
                        },
                          "properties":{"name":"France"},
                        "id":"FR"
                    }
                ]
            };

			$scope.geoJson = {data : myLines, style : myStyle};

		    angular.extend($scope, {
			       center: defaultCenter || city,
			        defaults: {
			            scrollWheelZoom: false
			        },
                                   	
                layers: {
                    baselayers : {
                        mapQuestAerial : {
                        	name: 'Map Quest Aerial',
                            type: 'xyz',
                            url: 'http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['otile1', 'otile2', 'otile3', 'otile4'],
                                continuousWorld: true
                            }
                        },
                        osm : {
                            name: 'OpenStreetMap',
                            type: 'xyz',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                continuousWorld: true
                            }
                        },
                        cycle: {
                            name: 'OpenCycleMap',
                            type: 'xyz',
                            url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                attribution: '&copy; <a href="http://www.opencyclemap.org/copyright">OpenCycleMap</a> contributors - &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                continuousWorld: true
                            }
                        },
                        /*cloudmade1: {
                            name: 'Cloudmade Night Commander',
                            type: 'xyz',
                            url: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
                            layerParams: {
                                key: '007b9471b4c74da4a6ec7ff43552b16f',
                                styleId: 999
                            },
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                continuousWorld: true
                            }
                        },
                        cloudmade2: {
                            name: 'Cloudmade Tourist',
                            type: 'xyz',
                            url: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
                            layerParams: {
                                key: '007b9471b4c74da4a6ec7ff43552b16f',
                                styleId: 7
                            },
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                continuousWorld: true
                            }
                        },*/
                        toner : {
                            name: 'Toner',
                            type: 'xyz',
                            url: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                continuousWorld: true
                            }
                        },
                        watercolor : {
 							name: 'Watercolor',
                            type: 'xyz',
                            url: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                continuousWorld: true
                            }
                        },
                        mapQuest : {
                        	name: 'Map Quest',
                            type: 'xyz',
                            url: 'http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['otile1', 'otile2', 'otile3', 'otile4'],
                                continuousWorld: true
                            }
                        },
                    },
                    overlays : {
					    hillshade: {
					        name: 'Hillshade Europa',
					        type: 'wms',
					        url: 'http://129.206.228.72/cached/hillshade',
					        layerOptions: {
					            layers: 'europe_wms:hs_srtm_europa',
					            format: 'image/png',
					            opacity: 0.25,
					            attribution: 'Hillshade layer by GIScience http://www.osm-wms.de',
					            crs: L.CRS.EPSG900913
					        }
					    },
					    fire: {
					        name: 'OpenFireMap',
					        type: 'xyz',
					        url: 'http://openfiremap.org/hytiles/{z}/{x}/{y}.png',
					        layerOptions: {
					            attribution: '© OpenFireMap contributors - © OpenStreetMap contributors',
					            continuousWorld: true
					        },
					    }
					    /*,cities : {
					    	name : 'Cities',
					    	type : 'group',
					    	visible : true
					   	}*/
					}
                },
				markers: {
                  marker1 : { lat : 41.3423276, lng : -5.141227900000001, message : "test"}, 
                  marker2 : { lat : 51.0889618, lng : -19.120135599999998, message : "test"},
                  marker3 : { lat : 51.0889618, lng : 9.560067799999999, message : "test"}, 
                  marker4 : { lat : 41.3423276, lng : 13.978907699999997, message : "test"}, 
                  marker12 : { lat : 41.3423276, lng : -5.141227900000001, message : "test"}
                }
		  	});

			//$scope.tiles.url = "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png";
		    //$scope.tiles.url = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"; 

	};
});