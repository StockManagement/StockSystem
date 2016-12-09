var eventMapControlModule = function () {
    var lastAddedFeature;
    var GEOMETRY_TYPE = {
        POINT: "Point",
        LINE: "LineString",
        POLYGON: "Polygon"
    };

    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    var overlay = new ol.Overlay({
        element: container,
        positioning: 'bottom-center',
        stopEvent: false
    });
    var draw;
    var onMapClickEvent;
    var onMouseMove;
    function init() {
        initFeaturePopup();
    }
    function initFeaturePopup() {

        mapControlVariablesModule.getOlMap().addOverlay(overlay);
        // display popup on click
        onMapClickEvent = mapControlVariablesModule.getOlMap().on('click', onMapClick);
        // change mouse cursor when over marker
        onMouseMove = $(mapControlVariablesModule.getOlMap().getViewport()).on('mousemove', onMouseMove);
        closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };

    }
 
    function onMapClick(evt) {

        var feature = mapControlVariablesModule.getOlMap()
                .forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                  
                    return feature;
                });
//        if (feature) {
//            var geometry = feature.getGeometry();
//            var coord = geometry.getCoordinates();
//            overlay.setPosition(coord);
//            content.innerHTML = feature.get('name');
//
//        }
    }

    function onMouseMove(e) {
        var pixel = mapControlVariablesModule.getOlMap().getEventPixel(
                e.originalEvent);
        var hit = mapControlVariablesModule.getOlMap().forEachFeatureAtPixel(
                pixel, function (feature, layer) {
                    return true;
                });
        if (hit) {
            //mapControlVariablesModule.getOlMap().getTarget().style.cursor = 'pointer';
        } else {
            //mapControlVariablesModule.getOlMap().getTarget().style.cursor = '';
        }

    }

    // ----map interaction ---------
//	function addLandmarkDrawInteraction() {
//		// var value = 'Polygon';
//		// var value = 'LineString';
//		var type = 'Point';
//		draw = new ol.interaction.Draw({
//			source : mapControlVariablesModule.getLandmarkSource(),
//			type : type,
//		});
//		
//		mapControlVariablesModule.getOlMap().unByKey(onMapClickEvent);
//		mapControlVariablesModule.getOlMap().addInteraction(draw);
//		// Add Event Ondraw End
//		draw.on('drawend', onDrawEnd, this);
//	}
//	
    function onDrawEnd(evt) {
        console.log(evt.feature);
        setFeatureStyle(evt.feature);
    }
//	
//	function setFeatureStyle(feature) {
//
//		var iconStyle = new ol.style.Style(
//				{
//					image : new ol.style.Icon(
//							/** @type {olx.style.IconOptions} */
//							({
//								anchor : [ 0.5, 46 ],
//								anchorXUnits : 'fraction',
//								anchorYUnits : 'pixels',
//								opacity : 0.75,
//								src : 'http://localhost:8080/Stock/resources/img/landmarks/icon-gasstation.png'
//							}))
//				});
//		feature.attributes = {
//			"name" : "station1",
//			"id" : "1"
//		};
//		feature.setStyle(iconStyle);
//	}

    function removeDrawInteraction() {
        mapControlVariablesModule.getOlMap().removeInteraction(draw);
        // display popup on click
        onMapClickEvent = mapControlVariablesModule.getOlMap().on('click', onMapClick);
    }

    // -------------------------------------------------------------------------------------------------- //
    // create by @mmonzer
    /***
     * @param layer 
     * @param geometryType should be a GEOMETRY_TYPE
     * @param drawEndCallback
     */
    function addDrawInteraction(layer, gometryType, drawEndCallback) {
        if (layer == undefined || gometryType == undefined) {
            console.log('layer or geometry is not defined')
            return;
        }
        var type = gometryType;
        var source = layer.getSource();
        var map = mapControlVariablesModule.getOlMap();

        draw = new ol.interaction.Draw({
            source: source,
            type: type,
        });

        // remote		
        map.unByKey(onMapClickEvent);
        map.addInteraction(draw);

        // Add Event Ondraw End
        var onDrawEnd = eval(drawEndCallback);
        draw.on('drawend', onDrawEnd, this);
    }

    /***
     * 
     * @param evt
     * function called (by addDrawInteraction) when geometry is drawn on the map
     * @action1: get last added feature
     * @action2: load editFeatureStyle modal
     * @action3: remove map interaction
     * @action4: set added point coordinates in frm-add-new-client
     * @action5: set the function that should be called when clicking on editFeaturestyle icons or when changing dropDown Value
     */
    function onUserDrawEnd(evt) {
        // get style from input
        var src = $("#frm-add-new-client\\:addUser-selectedIcon").val();
        var style = new stylerModule().createQuickImageStyle(src);
        evt.feature.setStyle(style);
        this.lastAddedFeature = evt.feature;

        // load modal
        sharedModule.loadModal('#featureStyleModal', '.modal-header');
        editFeatureStyleModule.onDrpChangeCallback = "userModule.registerSelectUserIcon";
        editFeatureStyleModule.registerDropdownChangeEvent();

        mapControlVariablesModule.getOlMap().removeInteraction(draw);
        // display popup on click
        onMapClickEvent = mapControlVariablesModule.getOlMap().on('click', onMapClick);
        var coordinates = evt.feature.getGeometry().getCoordinates();
        coordinates = ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');
        $("#frm-add-new-client\\:addUser-userPositionX").val(coordinates[0]);
        $("#frm-add-new-client\\:addUser-userPositionY").val(coordinates[1]);

        // add one point only
        userModule.onAddUserClick();
    }

    function onLandmarkDrawEnd(evt) {
        // get style from input
        var src = $("#frm-add-landmark\\:addLandmark-selectedIcon").val();
        var style = new stylerModule().createQuickImageStyle(src);
        evt.feature.setStyle(style);
        this.lastAddedFeature = evt.feature;

        // load modal
        sharedModule.loadModal('#featureStyleModal', '.modal-header');
        editFeatureStyleModule.onDrpChangeCallback = "landmarkModule.registerSelectLandmarkIcon";
        editFeatureStyleModule.registerDropdownChangeEvent();

        mapControlVariablesModule.getOlMap().removeInteraction(draw);
        // display popup on click
        onMapClickEvent = mapControlVariablesModule.getOlMap().on('click', onMapClick);
        var coordinates = evt.feature.getGeometry().getCoordinates();
        coordinates = ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326');
        $("#frm-add-new-landmark\\:addLandmark-landmarkPositionX").val(coordinates[0]);
        $("#frm-add-new-landmark\\:addLandmark-landmarkPositionY").val(coordinates[1]);

        // off add landmark button
        landmarkModule.onAddLandmarkClick();
    }
    // ------End Map Interaction-------------
    return {
        init: init,
        removeDrawInteraction: removeDrawInteraction,
        GEOMETRY_TYPE: GEOMETRY_TYPE,
        addDrawInteraction: addDrawInteraction,
        onUserDrawEnd: onUserDrawEnd,
        lastAddedFeature: lastAddedFeature
    }

}();