$(function() {
	mapControlModule.init();
});

var mapControlVariablesModule = function() {
	var self = this;
	var googleMap;
	var olMap;
	var fpControl;
	var landmarkSource;
	var landmarkLayer;

	var zoomLevel;
	var center;

	// --------------- getters and setters ------------- //
	function getOlMap() {
		return self.olMap;
	}
	function setOlMap(olMap) {
		self.olMap = olMap;
	}

	function setZoomLevel(zoomLevel) {
		this.zoomLevel = zoomLevel;
	}
	function getZoomLevel() {
		return this.zoomLevel;
	}

	function setCenter(center) {
		this.center = center;
	}
	function getCenter() {
		return this.center;
	}

	function getFpControl() {
		return self.fpControl;
	}
	function setFpControl(fpControl) {
		self.fpControl = fpControl;
	}

	function getLandmarkSource() {
		return self.landmarkSource;
	}
	function setLandmarkSource(landmarkSource) {
		self.landmarkSource = landmarkSource;
	}

	function getLandmarkLayer() {
		return self.landmarkLayer;
	}
	function setlandmarkLayer(landmarkSource) {
		self.landmarkLayer = landmarkLayer;
	}
	// --------------End getters and setters ------------- //

	return {
		getOlMap : getOlMap,
		setOlMap : setOlMap,
		getZoomLevel : getZoomLevel,
		setZoomLevel : setZoomLevel,
		getCenter : getCenter,
		setCenter : setCenter,
		getFpControl : getFpControl,
		setFpControl : setFpControl,
		getLandmarkSource : getLandmarkSource,
		setLandmarkSource : setLandmarkSource,
		getLandmarkLayer : getLandmarkLayer,
		setlandmarkLayer : setlandmarkLayer
	}
}();

var mapControlModule = function() {
	var featureOverlay;
	var modifyInteraction;
	var drawInteraction;
	var lastFeatureAdded = null;
	var clickEventKey = null;
	var endDrawEventKey = null;

	var EPSG_3857 = 'EPSG:3857';
	var EPSG_4326 = 'EPSG:4326';
	var maxZoom = 21;
	var minZoom = 3;
	var heatMapInterval;
	var animatedMapInterval;

	var openLayersView = null;
	var googleMapDiv = null;
	var googleMapOptions = {
		disableDefaultUI : true,
		keyboardShortcuts : false,
		draggable : false,
		disableDoubleClickZoom : true,
		scrollwheel : false,
		streetViewControl : false,
	};

	// ----------------------- Map Initialization -------------------- //
	function init() {
		// open layer view is the map used to draw our points and polygons
		openLayersView = new ol.View({
			// Do NOT go beyond the 22 zoom levels of Google Maps
			maxZoom : maxZoom,
			minZoom : minZoom
		});

		// Initialize open layer map
		openLayersMapDiv = document.getElementById('openLayersMap');
		var map = new ol.Map({
			funct : ol.control.defaults({
				attribution : false
			}).extend([ new ol.control.ScaleLine({
				unit : 'degrees',
			}) ]),
			interactions : ol.interaction.defaults({
				altShiftDragRotate : false,
				dragPan : false,
				rotate : false,
				pinchRotate : false,
				mouseWheelZoom : false,
				pinchZoom : true
			}).extend([ new ol.interaction.DragPan({
				kinetic : null
			}) ]),
			target : openLayersMapDiv,
			view : openLayersView
		});
		mapControlVariablesModule.setOlMap(map);
		eventMapControlModule.init();
		initLandmarkLayer();
//		createFeaturesForTest();
		googleMapModule.init('googleMap', 'openLayersMap', openLayersView,
				olMap, setMapHeight);

	}

	function setMapZoomAndCenter() {
		if (mapControlVariablesModule.getCenter() != null
				&& mapControlVariablesModule.getCenter() != undefined
				&& mapControlVariablesModule.getCenter() != ""
				&& mapControlVariablesModule.getZoomLevel() != null
				&& mapControlVariablesModule.getZoomLevel() != undefined
				&& mapControlVariablesModule.getZoomLevel() != "") {

			var centerArray = [
					parseFloat(mapControlVariablesModule.getCenter().split(',')[0]),
					parseFloat(mapControlVariablesModule.getCenter().split(',')[1]) ];
			// Set The View Center
			var transform = ol.proj
					.transform(centerArray, EPSG_4326, EPSG_3857);
			openLayersView.setCenter(transform);
			// Set The View Zoom Level
			openLayersView.setZoom(mapControlVariablesModule.getZoomLevel());
		} else {
			openLayersView.setCenter([ 0, 0 ]);
			openLayersView.setZoom(minZoom);
		}
	}

	// ------------------End Map Initialization -------------------- //

	// Layers Initialization---------------------------------------//
	function initLandmarkLayer() {

		var source = new ol.source.Vector({
			wrapX : false
		});

		var vectorlayer = new ol.layer.Vector({
			source : source,
//			style : new ol.style.Style({
//				fill : new ol.style.Fill({
//					color : 'rgba(255, 255, 255, 0.2)'
//				}),
//				stroke : new ol.style.Stroke({
//					color : '#ffcc33',
//					width : 2
//				}),
//				image : new ol.style.Circle({
//					radius : 7,
//					fill : new ol.style.Fill({
//						color : '#ffcc33'
//					})
//				})
//			})
//			style: (function() {
//			    var style = new ol.style.Style({
//			      image: new ol.style.Icon({
//			        scale: 0.04,
//			        src: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Circle-style-warning.svg/1024px-Circle-style-warning.svg.png'
//			      }),
//			      text: new ol.style.Text({
//			        text: 'Hello',
//			        scale: 1.3,
//			        fill: new ol.style.Fill({
//			          color: '#000000'
//			        }),
//			        stroke: new ol.style.Stroke({
//			          color: '#FFFF99',
//			          width: 3.5
//			        })
//			      })
//			    });
//			    var styles = [style];
//			    return function(feature, resolution) {
////			      style.getText().setText(feature.get("name"));
//			    	if(feature.get('style')) {
//			    		var featureStyle = feature.get('style');
//			    		return [featureStyle];
//			    	}
//			    	return styles;  
//			    };
//			  })()
		});

		mapControlVariablesModule.setLandmarkSource(source);
		mapControlVariablesModule.setlandmarkLayer(vectorlayer);
		mapControlVariablesModule.getOlMap().addLayer(vectorlayer);

	}

	// ------------------End Layers Initializations------------------//

	// ---------------------- Map Utilities -------------------------- //
	function zoomToVectorExtent(vectorLayer) {
		var olMap = mapControlVariablesModule.getOlMap();
		var view = olMap.getView();
		var extent = vectorLayer.getSource().getExtent();
		view.fitExtent(extent);
	}

	// ---------------- End Map Utilities --------------------------- //

	// --------------------- page functions --------------- //
	function setMapHeight() {
		// var mapOffset = $("#googleMap").offset();
		// //$(".main-header").outerHeight();
		// var mapHeight = $(window).height() - mapOffset.top;
		// var mapWidth = $(window).width() - mapOffset.left;
		// $("#googleMap").parent().height(mapHeight);
		// $("#googleMap").parent().width(mapWidth-3) ;

	}

	function scrollToMap() {
		var headerHeight = $("#googleMap").offset().top;
		$('html,body').animate({
			scrollTop : headerHeight
		}, 1000);
	}

	// --------------- END page sunctions ------------ //

	// function getFeaturesService(){
	// var iconFeatures=[];
	//
	// var iconFeature = new ol.Feature({
	// geometry: new ol.geom.Point(ol.proj.transform([-72.0704, 46.678],
	// 'EPSG:4326',
	// 'EPSG:3857')),
	// name: 'Null Island',
	// population: 4000,
	// rainfall: 500
	// });
	//
	// var iconFeature1 = new ol.Feature({
	// geometry: new ol.geom.Point(ol.proj.transform([-73.1234, 45.678],
	// 'EPSG:4326',
	// 'EPSG:3857')),
	// name: 'Null Island Two',
	// population: 4001,
	// rainfall: 501
	// });
	//
	// iconFeatures.push(iconFeature);
	// iconFeatures.push(iconFeature1);
	//
	// var vectorSource = new ol.source.Vector({
	// features: iconFeatures //add an array of features
	// });
	//
	// var iconStyle = new ol.style.Style({
	// image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	// anchor: [0.5, 46],
	// anchorXUnits: 'fraction',
	// anchorYUnits: 'pixels',
	// opacity: 0.75,
	// src: 'img/icon-red.png'
	// }))
	// });
	//
	// var vectorLayer = new ol.layer.Vector({
	// source: vectorSource,
	// style: iconStyle
	// });
	//		
	// mapControlVariablesModule.getOlMap().addLayer(vectorLayer);
	// zoomToVectorExtent(vectorLayer);
	// }
	//	
	
	function addPointToLayer(x, y, style){
		// -10
		// -25
		var source = mapControlVariablesModule.getLandmarkSource();
		var thing = new ol.geom.Point( 
			    ol.proj.transform([x,y], EPSG_4326, EPSG_3857)
			);  
			var featurething = new ol.Feature({
			    name: "Thing",
			    geometry: thing,
			});
			if(featurething)
				featurething.setStyle(style);
			
			landmarkSource.addFeature( featurething );
	}
	
	function computeFeatureStyle(json) {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: json.radius || 30,
                fill: new ol.style.Fill({
                    color: json.color || 'rgba(100,50,200,0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: json.strokeColor ||'rgba(120,30,100,0.8)',
                    width: json.strokeWidth || 3
                })
            }),
            text: new ol.style.Text({
                font: json.font || '12px helvetica,sans-serif',
                text: json.text || 'label' ,//|| feature.get('name'),
                rotation: json.rotation || 360 * Math.random()* Math.PI / 180,
                fill: new ol.style.Fill({
                    color: json.textColor || '#000'
                }),
                stroke: new ol.style.Stroke({
                    color: json.textStrokeColor || '#fff',
                    width: json.textStrokeWidth || 2
                })
            })
        });
    }
	
	function refreshMapLayers() {
		mapControlVariablesModule.getOlMap().getLayers().forEach(
				function(e) {
					if (e.getSource().updateParams) {
						e.getSource().updateParams({
							time_ : (new Date()).getTime()
						});
					}
				});
	}

	return {
		init : init,
		zoomToVectorExtent : zoomToVectorExtent,
		setMapZoomAndCenter : setMapZoomAndCenter,
		addPointToLayer: addPointToLayer,
		refreshMapLayers: refreshMapLayers,
		computeFeatureStyle: computeFeatureStyle,
		
		// ----------- testing functions -------- //
		getJsonStyleForTest: getJsonStyleForTest,
		createFeaturesForTest: createFeaturesForTest,
	}
	
	
	// ------------------- unit test ------------ //
	function getJsonStyleForTest(){
		var json = {};
	    json.radius = 15;
		json.color = 'rgba( 50, 50, 200, 0.5)';
		json.strokeColor = 'rgba(120,30,100,0.8)';
		json.strokeWidth = 3;
		json.font = '12px helvetica,sans-serif';
		json.text = 'test';
		json.textColor = "#000";
		json.textStrokeWidth = 1;
		return json;
	}
	
	function createFeaturesForTest(withStyle){
		var source = mapControlVariablesModule.getLandmarkSource();
		withStyle = typeof(withStyle) == "undefined"? true :withStyle ;
		 // Crate a style instance given feature's properties name and radius.
        function computeFeatureStyleLocal(feature) {
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: feature.get('radius'),
                    fill: new ol.style.Fill({
                        color: 'rgba(100,50,200,0.5)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(120,30,100,0.8)',
                        width: 3
                    })
                }),
                text: new ol.style.Text({
                    font: '12px helvetica,sans-serif',
                    text: feature.get('name'),
                    rotation: 360 * rnd * Math.PI / 180,
                    fill: new ol.style.Fill({
                        color: '#000'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#fff',
                        width: 2
                    })
                })
            });
        }

        
		 var i, lat, lon, geom, feature, features = [], style, rnd;
         for(i=0; i< 2; i++) {
             lat = -10 - i *2;
             lon = -25 - i *2;

             geom = new ol.geom.Point(
                 ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857')
             );

             rnd = Math.random();
             feature = new ol.Feature({
                 geometry: geom,
                 radius: rnd * 30,
                 name: 'feature [' + i + ']' 
             });
             features.push(feature);
             
             var json = getJsonStyleForTest();
             style = computeFeatureStyle(json);
             feature.setStyle(style);
//             source.addFeature(feature);
         }
         return features;
	}
	
//	var json = mapControlModule.getJsonStyleForTest();
//	var features = mapControlModule.createFeaturesForTest();
//	var feature = features[0];
//	var source = mapControlVariablesModule.getLandmarkSource();
//	var style = mapControlModule.computeFeatureStyle(json);
//	source.addFeature(feature);
}();
