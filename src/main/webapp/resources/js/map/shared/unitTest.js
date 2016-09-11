// -------------------- testing mapControl.js ------------------ //
function testAddPointToLayer(){
	var styler = new stylerModule();
	var pointOption = styler.default_point_options;
	var pointStyle = styler.createPoint(pointOption);
	var opt_options = {image: pointStyle};
	var style = styler.createStyle(opt_options); 
	
	var landmarkLayer = mapControlVariablesModule.getLandmarkLayer();
	mapControlModule.addPointToLayer(landmarkLayer, -10, -25, style);
}
// ------------------ END testing mapControl.js ------------------ //

// -------------------- testing styler.js ------------------------ //
function testDefaultPoint(){
	var styler = new stylerModule();
	var pointOption = styler.default_point_options;
	var pointStyle = styler.createPoint(pointOption);
	var opt_options = {image: pointStyle};
	var style = styler.createStyle(opt_options); 
	
//	var style = styler.test();
	var features = mapControlModule.createFeaturesForTest();
	var feature = features[0];
	feature.setStyle(style);
	var source = mapControlVariablesModule.getLandmarkSource();
	source.addFeature(feature);
}

function testDefaultText(){
	var styler = new stylerModule();
	
	var pointOption = styler.default_point_options;
	var pointStyle = styler.createPoint(pointOption);
	
	var textOption = styler.default_text_options;
	var textStyle = styler.createText(textOption);
	
	var opt_options = {text: textStyle};
	var textOnlyStyle = styler.createStyle(opt_options); 
//	var style = styler.test();
	var features = mapControlModule.createFeaturesForTest();
	var feature = features[0];
	feature.setStyle(textOnlyStyle);

	var source = mapControlVariablesModule.getLandmarkSource();
	source.addFeature(feature);
	
}

function testDefaultImage(){
	var styler = new stylerModule();
	var imageOption = styler.default_image_options;
	var imageStyle = styler.createImage(imageOption);
	var opt_options = {image: imageStyle };
	var style = styler.createStyle(opt_options); 
	
//	var style = styler.test();
	var features = mapControlModule.createFeaturesForTest();
	var feature = features[0];
	feature.setStyle(style);
	var source = mapControlVariablesModule.getLandmarkSource();
	source.addFeature(feature);
}

//------------------ END testing styler.js ------------------------ //

//-------------------- testing user.js ------------------------ //
function testAddUsersToMap(){
	var landmarkLayer = mapControlVariablesModule.getLandmarkLayer();
	var users = userModule.getUsers();
	userModule.addUsersToLayer(users, landmarkLayer);
}
//------------------ END testing user.js ------------------------ //