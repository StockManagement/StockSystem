$(function() {
	mapControlModule.init();
});

var mapControlVariablesModule = function(){
	var self = this;
	var googleMap;
	var olMap;
	var zoomLevel;
	var center;
	
	// --------------- getters and setters ------------- //
	function getGoogleMap(){return self.googleMap; }
	function setGoogleMap(googleMap){self.googleMap = googleMap; }
	
	function getOlMap(){return self.olMap;}
	function setOlMap(olMap){self.olMap = olMap;}
	
	function setZoomLevel(zoomLevel) {this.zoomLevel = zoomLevel;}
	function getZoomLevel(zoomLevel) {return this.zoomLevel;}
	
	function setCenter(center) {this.center = center;}
	function getCenter() {return this.center;}
	// --------------End getters and setters ------------- //
	
	return {
		getGoogleMap: getGoogleMap,
		setGoogleMap: setGoogleMap,
		getOlMap: getOlMap,
		setOlMap: setOlMap,
		getZoomLevel: getZoomLevel,
		setZoomLevel: setZoomLevel,
		getCenter: getCenter,
		setCenter: setCenter,
	}
}();

var mapControlModule = function(){
	var featureOverlay;
	var modifyInteraction;
	var drawInteraction;
	var lastFeatureAdded = null;
	var clickEventKey = null;
	var endDrawEventKey = null;

	var EPSG_3857 = 'EPSG:3857';
	var EPSG_4326 = 'EPSG:4326';
	// ------------------------------------------- //
	var maxZoom = 21;
	var minZoom = 3;
	var heatMapInterval;
	var animatedMapInterval;
	var googleMapOptions = {
			disableDefaultUI : true,
			keyboardShortcuts : false,
			draggable : false,
			disableDoubleClickZoom : true,
			scrollwheel : false,
			streetViewControl : false,
//			center: {lat: -34.397, lng: 150.644},
//			zoom: 8
		};
	var googleMapDiv = null;
	var openLayersView = null;
	//------------------------------------------- //

	
	function init(){
		google.maps.event.addDomListener(window, 'load', initMap);
		setMapHeight();
	}
	
	function initMap(){
		//Initialize the google base map
		var googleMapDiv = document.getElementById('googleMap');
		var googleMap = new google.maps.Map(googleMapDiv, googleMapOptions);
		mapControlVariablesModule.setGoogleMap(googleMap);
		
		//open layer view is the map used to draw our points and polygons
		openLayersView = new ol.View({
			// Do NOT go beyond the 22 zoom levels of Google Maps
			maxZoom : maxZoom,
			minZoom : minZoom
		});

		//Initialize open layer map
		openLayersMapDiv = document.getElementById('openLayersMap');
		var map = new ol.Map({
			controls : ol.control.defaults({ attribution: false }).extend(
					[ new ol.control.ScaleLine({
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
		
		registerMapEvents(googleMap, map);
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
		
		// create a relation between google map and open layer map
		openLayersMapDiv.parentNode.removeChild(openLayersMapDiv);
		googleMap.controls[google.maps.ControlPosition.TOP_LEFT]
				.push(openLayersMapDiv);
		
//		scrollToMap();
	}
	
	function registerMapEvents(googleMap, openLayerMap) {
		google.maps.event.addListener(googleMap, 'idle', googleIdleEventListener);

		openLayersView.on('change:center', onViewCenterChange);
		openLayersView.on('change:resolution', onViewResolutionChange);

//		clickEventKey = openLayerMap.on(
//				'click', onMapClickEventHandler);
//
//		// Add a click handler to hide the pop up.
//		popup_closer.onclick = function() {
//			popup_container.style.display = 'none';
//			popup_closer.blur();
//			return false;
//		};
	}
	
	// ---------------------------------------------------- //
	// ---------------- onViewCenterChange ---------------- //
	function onViewCenterChange() {
		var center = ol.proj.transform(openLayersView.getCenter(), EPSG_3857,
				EPSG_4326);
		// mapControlVariablesModule.getGoogleMap().panTo(new
		// google.maps.LatLng(center[1], center[0]));
		mapControlVariablesModule.getGoogleMap().setCenter(
				new google.maps.LatLng(center[1], center[0]));
	}
	// ------------------------------------------------------ //
	// ---------------- onViewResolutionChange -------------- //
	function onViewResolutionChange() {
		mapControlVariablesModule.getGoogleMap().setZoom(
				openLayersView.getZoom());
	}
	// ------------------------------------------------------ //
	// ---------------- googleIdleEventListener --------------- //
	function googleIdleEventListener(googleMap) {
//		if (!isPageLoad
//				&& !mapControlVariablesModule.getIsVisualizationInViewMode()) {
//			var bounds = googleMap.getBounds();
//			var center = bounds.getCenter();
//			var zoomLevel = googleMap.getZoom();
//			$("#mapControlForm\\:selectedCenter").val(center.lng() + ',' + center.lat());
//			$("#mapControlForm\\:selectedZoomLevel").val(zoomLevel);
//			// Call the Remote Command By Name
//			updateCenterAndZoomLevelRemoteCommand();
//		}
	}
	// ----------------------------------------------------- //
	
	
	function setMapHeight(){
		var mapOffset = $("#googleMap").offset(); //$(".main-header").outerHeight();
		var mapHeight = $(window).height() - mapOffset.top;
		var mapWidth = $(window).width() - mapOffset.left;
		$("#googleMap").parent().height(mapHeight);
		$("#googleMap").parent().width(mapWidth-3) ;
		
	}
	
	function scrollToMap(){
		var headerHeight = $("#googleMap").offset().top;
		$('html,body').animate({scrollTop: headerHeight}, 1000);
	}
	return {
		init: init
	}
	
}();