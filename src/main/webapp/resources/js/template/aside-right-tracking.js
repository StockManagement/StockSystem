$(function() {
	// mapControlVariablesModule.getOlMap().addLayer(self.vector);
});

var landmarkControl = function() {
	var self = this;
	var isActiveAddLandmark = false;
	var draw;
	// --------------- getters and setters ------------- //
	function getIsActiveAddLandmark() {
		return self.isActiveAddLandmark;
	}
	function setIsActiveAddLandmark(isActiveAddLandmark) {
		self.isActiveAddLandmark = isActiveAddLandmark;
	}

	function addLandmarkOnClick() {
		if (self.isActiveAddLandmark) {
			deactivateAddLandmark();
		} else {
			activateAddLandmark();
		}

	}
	function activateAddLandmark() {

		self.isActiveAddLandmark = true;
		$('#a-Addlandmark').addClass("selected");
		$('#iconAddlandmark').removeClass("bg-green");
		$('#iconAddlandmark').addClass("bg-blue");
		addInteraction();

	}
	function deactivateAddLandmark() {
		self.isActiveAddLandmark = false;
		$('#a-Addlandmark').removeClass("selected");
		$('#iconAddlandmark').removeClass("bg-blue");
		$('#iconAddlandmark').addClass("bg-green");
		removeInteraction();
	}

	function addInteraction() {
		//var value = 'Polygon';
		//var value = 'LineString';
		var type = 'Point';
		draw = new ol.interaction.Draw({
			source : mapControlVariablesModule.getLandmarkSource(),
			type : type,

		});
		mapControlVariablesModule.getOlMap().addInteraction(draw);
        //Add Event Ondraw End
		draw.on('drawend', onDrawEnd, this);

	}
	function onDrawEnd(evt) {
		console.log(evt.feature);
		setFeatureStyle(evt.feature);
		// var parser = new ol.format.GeoJSON();
		// var features = source.getFeatures();

		//		 var featuresGeoJSON = parser.writeFeatures(features);
		//		 $.ajax({
		//		 url: '/features.geojson',
		//		type: 'POST',
		//	     data: featuresGeoJSON
		//		 }).then(function(response) {
		//		 console.log(response);
		//		 });
	}
	function setFeatureStyle(feature){

		var iconStyle = new ol.style.Style({
		  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		    anchor: [0.5, 46],
		    anchorXUnits: 'fraction',
		    anchorYUnits: 'pixels',
		    opacity: 0.75,
		    src: 'http://localhost:8080/Stock/resources/img/landmarks/icon-gasstation.png'
		  }))
		});

		feature.setStyle(iconStyle);
	}
	function removeInteraction() {
		mapControlVariablesModule.getOlMap().removeInteraction(draw);
	}

	return {
		getIsActiveAddLandmark : getIsActiveAddLandmark,
		setIsActiveAddLandmark : setIsActiveAddLandmark,
		addLandmarkOnClick : addLandmarkOnClick,

	}
}();
