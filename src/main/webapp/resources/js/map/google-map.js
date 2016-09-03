var googleMapModule = function(){
	var self = this;
	
	var EPSG_3857 = 'EPSG:3857';
	var EPSG_4326 = 'EPSG:4326'; 
	
	var olDivId;
	var googleMapDivId;
	
	var olMap;
	var googleMap;
	var openLayersView = null;
	
	// function to be called when google map initialization finishes
	var callback;
	
	var googleMapOptions = {
			disableDefaultUI : true,
			keyboardShortcuts : false,
			draggable : false,
			disableDoubleClickZoom : true,
			scrollwheel : false,
			streetViewControl : false,
		};
	
	//----------------------- Map Initialization -------------------- //
	function init(googleMapDivId, olDivId, openLayersView, olMap, callback){
		self.googleMapDivId = googleMapDivId;
		self.olDivId = olDivId;
		self.openLayersView = openLayersView;
		self.olMap = olMap;
		self.callback= callback;
		google.maps.event.addDomListener(window, 'load', initMap);
	}
	
	function initMap(){
		//Initialize the google base map
		openLayersMapDiv = document.getElementById(self.olDivId);
		var googleMapDiv = document.getElementById(self.googleMapDivId);
		self.googleMap = new google.maps.Map(googleMapDiv, self.googleMapOptions);
		
		registerMapEvents(self.googleMap, self.olMap);
		
		mapControlModule.setMapZoomAndCenter();
		// create a relation between google map and open layer map
		openLayersMapDiv.parentNode.removeChild(self.openLayersMapDiv);
		self.googleMap.controls[google.maps.ControlPosition.TOP_LEFT]
				.push(self.openLayersMapDiv);
		
		if(self.callback) self.callback();
	}
	
	//------------------End Map Initialization -------------------- //
	
	
	// ------------------- Map Events --------------- //
	function registerMapEvents(googleMap, openLayerMap) {
		self.openLayersView.on('change:center', onViewCenterChange);
		self.openLayersView.on('change:resolution', onViewResolutionChange);
	}
	

	function onViewCenterChange() {
		var center = ol.proj.transform(self.openLayersView.getCenter(), EPSG_3857, EPSG_4326);
		self.googleMap.setCenter(
				new google.maps.LatLng(center[1], center[0]));
	}

	function onViewResolutionChange() {
		self.googleMap.setZoom(
				self.openLayersView.getZoom());
	}
	
	// -------------------- END Map Events--------------------------------- //
	
	return {
		init: init,
	}
	
}();
