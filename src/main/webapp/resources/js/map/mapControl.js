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
	var usersLayer;
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
	function setLandmarkLayer(landmarkLayer) {
		self.landmarkLayer = landmarkLayer;
	}
	
	function getUsersLayer(){
		return self.usersLayer;
	}
	function setUsersLayer(usersLayer){
		self.usersLayer = usersLayer;
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
		setLandmarkLayer : setLandmarkLayer, 
		getUsersLayer: getUsersLayer,
		setUsersLayer: setUsersLayer,
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
		initUsersLayer();
//		createFeaturesForTest();
		googleMapModule.init('googleMap', 'openLayersMap', openLayersView,
				olMap, setMapHeight);
		userModule.init();
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
		//	wrapX : false
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
	function setMapHeight() {
		var mapOffset = $("#googleMap").offset();
		//$(".main-header").outerHeight();
		var mapHeight = $(window).height() - mapOffset.top;
		var mapWidth = $(window).width() - mapOffset.left;
		 
		 $("#map").height(mapHeight);
		 $("#googleMap").height(mapHeight);
		 $("#openLayersMap").height(mapHeight);
		

	}

	function scrollToMap() {
		var headerHeight = $("#googleMap").offset().top;
		$('html,body').animate({
			scrollTop : headerHeight
		}, 1000);
	}

	// --------------- END page sunctions ------------ //


	
	/***
	 * @param x
	 * @param y
	 * @param style
	 * @param layer
	 */
	function addPointToLayer(layer, x, y, style){
		// -10
		// -25
		if(layer == 'undefined') return;
		var source = layer.getSource();
		var thing = new ol.geom.Point( 
			    ol.proj.transform([x,y], EPSG_4326, EPSG_3857)
			);  
			var featurething = new ol.Feature({
			    name: "Thing",
			    featureCoordinates: {x: x, y: y},
			    geometry: thing,
			});
			if(featurething)
				featurething.setStyle(style);
			
			source.addFeature( featurething );
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
	
	function zoomToLocation(x,  y){
		if(x!=undefined && y!=undefined)
			mapControlVariablesModule.getOlMap().getView().setCenter([x,y]);
	}
	
	function getFeatureByCoordinates(layer, x, y){
		var features = layer.getSource().getFeatures();
		for(var i=0; i< features.length; i++){
			var featureCoordinate = features[i].get('featureCoordinates');
			if(featureCoordinate != undefined && featureCoordinate.x != undefined && featureCoordinate.y != undefined
					&& featureCoordinate.x == x && featureCoordinate.y == y)
				return features[i];
		}
	}
	
	function animateFeature(feature){
		var interval = window.setInterval(function(){
		    animate(feature);
		},80);

	}
	
	function animate(feature)
	{
		if(feature.data == undefined || feature.data.size == undefined)
			feature.data = {size: 10};
		
	    feature.data.size += 1;

	    feature.style = {
	        pointRadius: feature.data.size,  // I will change only the size of the feature
	        fillColor: "#ffcc66",
	        fillOpacity: 0,
	        strokeColor: "#ff9933",
	        strokeWidth: 2,
	        graphicZIndex: 1
	    };

	   feature.layer.redraw();

	    if(feature.data.size == 30){
	        console.info(interval);
	        window.clearInterval(interval);
	    }
	}

	return {
		init : init,
		zoomToVectorExtent : zoomToVectorExtent,
		setMapZoomAndCenter : setMapZoomAndCenter,
		addPointToLayer: addPointToLayer,
		refreshMapLayers: refreshMapLayers,
		computeFeatureStyle: computeFeatureStyle,	
		zoomToLocation: zoomToLocation,
		getFeatureByCoordinates: getFeatureByCoordinates,
		animateFeature: animateFeature
	}
	
}();
