$(function() {
	mapControlModule.init();
});

var mapControlVariablesModule = function() {
	var self = this;
	var olMap;
	var fpControl;
	var landmarkSource;
	var landmarkLayer;
	var usersLayer;
	var zoomLevel;
	var center;

	// --------------- getters and setters ------------- //
	function setGoogleLayer(googleLayer) {
		return self.googleLayer = googleLayer;
	}
	function getGoogleLayer() {
		return self.googleLayer;
	}
	function setOsmLayer(osmLayer) {
		return self.osmLayer = osmLayer;
	}
	function getOsmLayer() {
		return self.osmLayer;
	}
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
	function setLandmarkLayer(landmarkLayer) {
		self.landmarkLayer = landmarkLayer;
	}

	function getUsersLayer() {
		return self.usersLayer;
	}
	function setUsersLayer(usersLayer) {
		self.usersLayer = usersLayer;
	}
	// --------------End getters and setters ------------- //

	return {
		getOlMap : getOlMap,
		setOlMap : setOlMap,
		setGoogleLayer : setGoogleLayer,
		getGoogleLayer : getGoogleLayer,
		getOsmLayer : getOsmLayer,
		setOsmLayer : setOsmLayer,
		getCenter : getCenter,
		setCenter : setCenter,
		getFpControl : getFpControl,
		setFpControl : setFpControl,
		getLandmarkSource : getLandmarkSource,
		setLandmarkSource : setLandmarkSource,
		getLandmarkLayer : getLandmarkLayer,
		setLandmarkLayer : setLandmarkLayer,
		getUsersLayer : getUsersLayer,
		setUsersLayer : setUsersLayer,
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

	// ----------------------- Map Initialization -------------------- //
	function init() {
		setMapHeight();
		// open layer view is the map used to draw our points and polygons
		openLayersView = new ol.View({
			center : ol.proj.transform([ 35, 33 ], 'EPSG:4326', 'EPSG:3857'),
			zoom : 8,
			// Do NOT go beyond the 22 zoom levels of Google Maps
			maxZoom : maxZoom,
			minZoom : minZoom
		});
		var googleLayer = new olgm.layer.Google();
		var osmLayer = new ol.layer.Tile({
			source : new ol.source.OSM(),
			visible : false
		});
		mapControlVariablesModule.setGoogleLayer(googleLayer);
		mapControlVariablesModule.setOsmLayer(osmLayer);

		// Initialize open layer map
		var map = new ol.Map({
			// use OL3-Google-Maps recommended default interactions
			interactions : olgm.interaction.defaults(),
			controls : ol.control.defaults().extend(
					[ new ol.control.ZoomSlider() ]),
			layers : [ googleLayer, osmLayer ],
			target : 'map',
			view : openLayersView
		});

		mapControlVariablesModule.setOlMap(map);
		var olGM = new olgm.OLGoogleMaps({

			map : map,
			mapIconOptions : {
				useCanvas : false
			}
		}); // map is the ol.Map instance

		olGM.activate();
		eventMapControlModule.init();
		initLandmarkLayer();
		initUsersLayer();
		//showOsmLayer();
	}
	function showOsmLayer() {
		googleLayer.setVisible(false);
		osmLayer.setVisible(true);
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
	function setMapHeight() {
		var footerHeight = $("#footer").height();
		var mapHeight = $(window).height() - 110;
		// var mapWidth = $(window).width();

		$("#map").height(mapHeight);

	}

	// ------------------End Map Initialization -------------------- //

	// Layers Initialization---------------------------------------//
	function initLandmarkLayer() {

		var source = new ol.source.Vector({
			wrapX : false
		});

		var vectorlayer = new ol.layer.Vector({
			source : source,

		});

		mapControlVariablesModule.setLandmarkSource(source);
		mapControlVariablesModule.setLandmarkLayer(vectorlayer);
		mapControlVariablesModule.getOlMap().addLayer(vectorlayer);

	}

	function initUsersLayer() {

		var source = new ol.source.Vector({
			wrapX : false
		});

		var vectorlayer = new ol.layer.Vector({
			source : source,
		});

		mapControlVariablesModule.setUsersLayer(vectorlayer);
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

	function scrollToMap() {
		var headerHeight = $("#googleMap").offset().top;
		$('html,body').animate({
			scrollTop : headerHeight
		}, 1000);
	}

	/***************************************************************************
	 * @param x
	 * @param y
	 * @param style
	 * @param layer
	 */
	function addPointToLayer(layer, x, y, style) {
		// -10
		// -25
		if (layer == 'undefined')
			return;
		var source = layer.getSource();
		var thing = new ol.geom.Point(ol.proj.transform([ x, y ], EPSG_4326,
				EPSG_3857));
		var featurething = new ol.Feature({
			name : "Thing",
			geometry : thing,
		});
		if (featurething)
			featurething.setStyle(style);

		source.addFeature(featurething);
	}

	function computeFeatureStyle(json) {
		return new ol.style.Style({
			image : new ol.style.Circle({
				radius : json.radius || 30,
				fill : new ol.style.Fill({
					color : json.color || 'rgba(100,50,200,0.5)'
				}),
				stroke : new ol.style.Stroke({
					color : json.strokeColor || 'rgba(120,30,100,0.8)',
					width : json.strokeWidth || 3
				})
			}),
			text : new ol.style.Text(
					{
						font : json.font || '12px helvetica,sans-serif',
						text : json.text || 'label',// || feature.get('name'),
						rotation : json.rotation || 360 * Math.random()
								* Math.PI / 180,
						fill : new ol.style.Fill({
							color : json.textColor || '#000'
						}),
						stroke : new ol.style.Stroke({
							color : json.textStrokeColor || '#fff',
							width : json.textStrokeWidth || 2
						})
					})
		});
	}

	function refreshMapLayers() {
		mapControlVariablesModule.getOlMap().getLayers().forEach(function(e) {
			if (e.getSource().updateParams) {
				e.getSource().updateParams({
					time_ : (new Date()).getTime()
				});
			}
		});
	}

	return {
		init : init,

		addPointToLayer : addPointToLayer,
		refreshMapLayers : refreshMapLayers,
		computeFeatureStyle : computeFeatureStyle,

		// ----------- testing functions -------- //
		getJsonStyleForTest : getJsonStyleForTest,
		createFeaturesForTest : createFeaturesForTest,
	}

	// ------------------- unit test ------------ //
	function getJsonStyleForTest() {
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

	function createFeaturesForTest(withStyle) {
		var source = mapControlVariablesModule.getLandmarkSource();
		withStyle = typeof (withStyle) == "undefined" ? true : withStyle;
		// Crate a style instance given feature's properties name and radius.
		function computeFeatureStyleLocal(feature) {
			return new ol.style.Style({
				image : new ol.style.Circle({
					radius : feature.get('radius'),
					fill : new ol.style.Fill({
						color : 'rgba(100,50,200,0.5)'
					}),
					stroke : new ol.style.Stroke({
						color : 'rgba(120,30,100,0.8)',
						width : 3
					})
				}),
				text : new ol.style.Text({
					font : '12px helvetica,sans-serif',
					text : feature.get('name'),
					rotation : 360 * rnd * Math.PI / 180,
					fill : new ol.style.Fill({
						color : '#000'
					}),
					stroke : new ol.style.Stroke({
						color : '#fff',
						width : 2
					})
				})
			});
		}

		var i, lat, lon, geom, feature, features = [], style, rnd;
		for (i = 0; i < 2; i++) {
			lat = -10 - i * 2;
			lon = -25 - i * 2;

			geom = new ol.geom.Point(ol.proj.transform([ lon, lat ],
					'EPSG:4326', 'EPSG:3857'));

			rnd = Math.random();
			feature = new ol.Feature({
				geometry : geom,
				radius : rnd * 30,
				name : 'feature [' + i + ']'
			});
			features.push(feature);

			var json = getJsonStyleForTest();
			style = computeFeatureStyle(json);
			feature.setStyle(style);
			// source.addFeature(feature);
		}
		return features;
	}

	// var json = mapControlModule.getJsonStyleForTest();
	// var features = mapControlModule.createFeaturesForTest();
	// var feature = features[0];
	// var source = mapControlVariablesModule.getLandmarkSource();
	// var style = mapControlModule.computeFeatureStyle(json);
	// source.addFeature(feature);
}();
