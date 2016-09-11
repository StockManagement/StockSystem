var eventMapControlModule = function() {

	var element = document.getElementById('popup');
	var popup = new ol.Overlay({
		element : element,
		positioning : 'bottom-center',
		stopEvent : false
	});
	var draw;
	var onMapClickEvent;
	var onMouseMove;
	function init() {
		initFeaturePopup();
	}
	function initFeaturePopup() {

		mapControlVariablesModule.getOlMap().addOverlay(popup);
		// display popup on click
		onMapClickEvent=mapControlVariablesModule.getOlMap().on('click', onMapClick);
		// change mouse cursor when over marker
		onMouseMove=$(mapControlVariablesModule.getOlMap().getViewport()).on('mousemove',onMouseMove);
	}

	function onMapClick(evt) {

		var feature = mapControlVariablesModule.getOlMap()
				.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
					return feature;
				});
		if (feature) {
			var geometry = feature.getGeometry();
			var coord = geometry.getCoordinates();
			popup.setPosition(coord);
			$(element).popover({
				'placement' : 'top',
				'html' : true,
				'content' : feature.attributes['name']
			});
			$(element).popover('show');
		} else {
			$(element).popover('destroy');
		}
	}

	function onMouseMove(e) {
		var pixel = mapControlVariablesModule.getOlMap().getEventPixel(
				e.originalEvent);
		var hit = mapControlVariablesModule.getOlMap().forEachFeatureAtPixel(
				pixel, function(feature, layer) {
					return true;
				});
		if (hit) {
			mapControlVariablesModule.getOlMap().getTarget().style.cursor = 'pointer';
		} else {
			mapControlVariablesModule.getOlMap().getTarget().style.cursor = '';
		}

	}

	// ----map interaction ---------
	function addDrawInteraction() {
		// var value = 'Polygon';
		// var value = 'LineString';
		var type = 'Point';
		draw = new ol.interaction.Draw({
			source : mapControlVariablesModule.getLandmarkSource(),
			type : type,

		});
		mapControlVariablesModule.getOlMap().unByKey(onMapClickEvent);
		mapControlVariablesModule.getOlMap().addInteraction(draw);
		// Add Event Ondraw End
		draw.on('drawend', onDrawEnd, this);

	}
	function onDrawEnd(evt) {
		console.log(evt.feature);
		setFeatureStyle(evt.feature);
		// var parser = new ol.format.GeoJSON();
		// var features = source.getFeatures();

		// var featuresGeoJSON = parser.writeFeatures(features);
		// $.ajax({
		// url: '/features.geojson',
		// type: 'POST',
		// data: featuresGeoJSON
		// }).then(function(response) {
		// console.log(response);
		// });
	}
	function setFeatureStyle(feature) {

		var iconStyle = new ol.style.Style(
				{
					image : new ol.style.Icon(
							/** @type {olx.style.IconOptions} */
							({
								anchor : [ 0.5, 46 ],
								anchorXUnits : 'fraction',
								anchorYUnits : 'pixels',
								opacity : 0.75,
								src : 'http://localhost:8080/Stock/resources/img/landmarks/icon-gasstation.png'
							}))
				});
		feature.attributes = {
			"name" : "station1",
			"id" : "1"
		};
		feature.setStyle(iconStyle);
	}
	function removeDrawInteraction() {
		mapControlVariablesModule.getOlMap().removeInteraction(draw);
		// display popup on click
		onMapClickEvent=mapControlVariablesModule.getOlMap().on('click', onMapClick);
	}
	// ------End Map Interaction-------------
	return {
		init : init,
		addDrawInteraction : addDrawInteraction,
		removeDrawInteraction : removeDrawInteraction,
	}

}();