var landmarkModule = function () {
    self = this;
    isActiveAddLandmark = false;


    // TODO: take parameter from user json
    var createLandmarkStyle = function () {
        var styler = new stylerModule();
        var imageStyle = styler.createImage(styler.default_image_options);
        var opt_options = {image: imageStyle};
        var style = styler.createStyle(opt_options);
        return style;
    }


    var init = function () {
        // when clicking add feature button  registerDropdownChangeEvent  
//		onAddLandmarkClick();

        
        $("#iconAddlandmark").click(function () {
//			editFeatureStyleModule.onDrpChangeCallback = "landmarkModule.registerSelectLandmarkIcon";
            editFeatureStyleModule.registerDropdownChangeEvent();
        })
        
        var landmarksStr = $('#landmarksHidden').val();
        var landmarks = JSON.parse(landmarksStr);
        var landmarkLayer = mapControlVariablesModule.getLandmarkLayer(); 
        addLandmarksToLayer(landmarks,landmarkLayer);
    }

    function getFeatureByCoordinates(x, y) {
        var landmarkLayer = mapControlVariablesModule.getLandmarkLayer();
        return mapControlModule.getFeatureByCoordinates(landmarkLayer, x, y);
    }

    function onAddLandmarkClick() {
        if (!self.isActiveAddLandmark) {
            self.isActiveAddLandmark = true;
            $('#a-addUser').addClass("selected");
            $('#iconAddUser').removeClass("bg-green");
            $('#iconAddUser').addClass("bg-blue");

            var landmarkLayer = mapControlVariablesModule.getLandmarkLayer();
            var geometryType = eventMapControlModule.GEOMETRY_TYPE.POINT;
            var drawEndCallback = 'onLandmarkDrawEnd';
            eventMapControlModule.addDrawInteraction(landmarkLayer, geometryType, drawEndCallback);
            registerSelectLandmarkIcon();
        } else {
            self.isActiveAddLandmark = false;
            $('#a-addUser').removeClass("selected");
            $('#iconAddUser').removeClass("bg-blue");
            $('#iconAddUser').addClass("bg-green");
            eventMapControlModule.removeDrawInteraction();
        }
    }


    function registerSelectLandmarkIcon() {
        $(".symb").off('click');
        $(".symb").click(function () {
//			var symbol = $(".btn.ui-selectee")[0].src;
            var symbol = $(this)[0].src;
            $("#frm-add-new-landmark\\:addLandmark-selectedIcon").val(symbol);
            $(".ui-selectee").find('.btn-success').removeClass('btn-success');
            $(this).addClass('btn-success');

            // get last added feature 
            var feature = eventMapControlModule.lastAddedFeature;
            // create a new style for the feature based on the selected icon
            var styler = new stylerModule();
            var imageOption = styler.default_image_options;
            imageOption.src = symbol;
            var imageStyle = styler.createImage(imageOption);
            var opt_options = {image: imageStyle};
            var style = styler.createStyle(opt_options);
            feature.setStyle(style);
            // remove and re-add feature to the source 
            var source = mapControlVariablesModule.getLandmarkLayer().getSource();
            source.removeFeature(feature);
            source.addFeature(feature);

        })

    }

    // hide / show create client form	
    function hideShowAddlandmarkForm() {
        if ($("#frm-add-new-landmark").hasClass("collapse in")) {
            $("#frm-add-new-landmark").collapse('hide');
            $(".user-search-title").addClass('border-top');
        } else {
            $(".user-search-title").removeClass('border-top');
            $("#frm-add-new-landmark").collapse('show');
        }
    }
    
    var isValidlandMark = function (landmark) {
        if (landmark === null || landmark.x === null || landmark.y === null)
            return false;
        return true;
    };
    
    var addlandmarkToLayer = function (landMark, layer) {
        var styler = new stylerModule();       
        if (!isValidlandMark(landMark) || layer == 'undefined')
            return;
        // ensure user style not null
        if (landMark.style != 'undefined' || landMark.style != null) {
            var pointOption = styler.default_image_options;
            if (landMark.img != undefined && landMark.img.length > 0)
                pointOption.src = globalModule.getDefaultServerPath() + landMark.img;
            var pointStyle = styler.createImage(pointOption);
            var opt_options = {image: pointStyle};
            var style = styler.createStyle(opt_options);
            landMark.style = style;
        }
        mapControlModule.addPointToLayer(layer, landMark.x, landMark.y, landMark.style,landMark.name);
    };

    /***
     * @param users: array of users
     * @param layer: a vector layer
     */
    var addLandmarksToLayer = function (landmarks, layer) {
        // users & layer not null
        if (landmarks == 'undefined' || layer == 'undefined')
            return;
        // users is an array
        if (Object.prototype.toString.call(landmarks) !== '[object Array]')
            landmarks = [landmark];
        for (var i = 0; i < landmarks.length; i++)
            addlandmarkToLayer(landmarks[i], layer);
    }

    function toggle(title) {

        if (title == "Landmarks") {
            var visibilityL = mapControlVariablesModule.getLandmarkLayer().getVisible();
            mapControlVariablesModule.getLandmarkLayer().setVisible(!visibilityL);
        
        }

    }

    return {
        init: init,
        createLandmarkStyle: createLandmarkStyle,
        getFeatureByCoordinates: getFeatureByCoordinates,
        onAddLandmarkClick: onAddLandmarkClick,
        registerSelectLandmarkIcon: registerSelectLandmarkIcon,
        hideShowAddlandmarkForm: hideShowAddlandmarkForm,
        toggle:toggle
    }
}();