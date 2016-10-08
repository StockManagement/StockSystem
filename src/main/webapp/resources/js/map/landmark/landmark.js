var landmarkModule = function() {
	self = this;
	isActiveAddLandmark = false;
	

	// TODO: take parameter from user json
	var createLandmarkStyle = function(){
		var styler = new stylerModule();
		var imageStyle = styler.createImage(styler.default_image_options);
		var opt_options = {image: imageStyle };
		var style = styler.createStyle(opt_options); 
		return style;
	}
	
	
	var init = function(){
		// when clicking add feature button  registerDropdownChangeEvent  
//		onAddLandmarkClick();
		$("#iconAddlandmark").click(function(){ 
//			editFeatureStyleModule.onDrpChangeCallback = "landmarkModule.registerSelectLandmarkIcon";
			editFeatureStyleModule.registerDropdownChangeEvent();
		})
	}
	
	function getFeatureByCoordinates(x, y){
		var landmarkLayer = mapControlVariablesModule.getLandmarkLayer();
		return mapControlModule.getFeatureByCoordinates(landmarkLayer, x, y);
	}
	
	function onAddLandmarkClick(){
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
	
	
	function registerSelectLandmarkIcon(){
		$(".symb").off('click');
		$(".symb").click(function(){
//			var symbol = $(".btn.ui-selectee")[0].src;
			var symbol = $(this)[0].src;
			$("#frm-add-new-client\\:addUser-selectedIcon").val(symbol);
			$(".ui-selectee").find('.btn-success').removeClass('btn-success');	
			$(this).addClass('btn-success');
			
			// get last added feature 
			var feature = eventMapControlModule.lastAddedFeature;
			// create a new style for the feature based on the selected icon
			var styler = new stylerModule();
			var imageOption = styler.default_image_options;
		    imageOption.src = symbol;
			var imageStyle = styler.createImage(imageOption);
			var opt_options = {image: imageStyle };
			var style = styler.createStyle(opt_options);
			feature.setStyle(style);
			// remove and re-add feature to the source 
			var source = mapControlVariablesModule.getLandmarkLayer().getSource();
			source.removeFeature(feature);
			source.addFeature(feature);
			
		})
		
	}
	
	return {
		init: init,
		createLandmarkStyle: createLandmarkStyle,
		getFeatureByCoordinates: getFeatureByCoordinates,
		onAddLandmarkClick: onAddLandmarkClick,
		registerSelectLandmarkIcon: registerSelectLandmarkIcon
	}
}();