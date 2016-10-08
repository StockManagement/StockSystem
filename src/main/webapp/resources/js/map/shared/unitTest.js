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
	var features = createFeaturesForTest();
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
	var features = createFeaturesForTest();
	var feature = features[0];
	feature.setStyle(textOnlyStyle);

	var source = mapControlVariablesModule.getLandmarkSource();
	source.addFeature(feature);
	
}

function getJsonStyleForTest(){
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

function testDefaultImage(){
	var styler = new stylerModule();
	var imageOption = styler.default_image_options;
	var imageStyle = styler.createImage(imageOption);
	var opt_options = {image: imageStyle };
	var style = styler.createStyle(opt_options); 
	
//	var style = styler.test();
	var features = createFeaturesForTest();
	
	var feature = features[0];
//	var iconStyle = new ol.style.Style({
//		  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
//		    anchor: [0.5, 46],
//		    anchorXUnits: 'fraction',
//		    anchorYUnits: 'pixels',
//		    opacity: 0.75,
//		    src: 'http://localhost:8080/Stock/resources/img/images/testFolder/boom.png'
//		  }))
//		});
	feature.setStyle(style);
	var source = mapControlVariablesModule.getLandmarkSource();
	source.addFeature(feature);
	
}

function createFeaturesForTest(withStyle){
	var source = mapControlVariablesModule.getLandmarkSource();
	withStyle = typeof(withStyle) == "undefined"? true :withStyle ;
	 // Crate a style instance given feature's properties name and radius.
    function computeFeatureStyleLocal(feature) {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: feature.get('radius'),
                fill: new ol.style.Fill({
                    color: 'rgba(100,50,200,0.5)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(120,30,100,0.8)',
                    width: 3
                })
            }),
            text: new ol.style.Text({
                font: '12px helvetica,sans-serif',
                text: feature.get('name'),
                rotation: 360 * rnd * Math.PI / 180,
                fill: new ol.style.Fill({
                    color: '#000'
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        });
    }

    
	 var i, lat, lon, geom, feature, features = [], style, rnd;
     for(i=0; i< 2; i++) {
         lat = -10 - i *2;
         lon = -25 - i *2;

         geom = new ol.geom.Point(
             ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857')
         );

         rnd = Math.random();
         feature = new ol.Feature({
             geometry: geom,
             radius: rnd * 30,
             name: 'feature [' + i + ']' 
         });
         features.push(feature);
         
         var json = getJsonStyleForTest();
         style = computeFeatureStyle(json);
         feature.setStyle(style);
//         source.addFeature(feature);
     }
     return features;
}

//------------------ END testing styler.js ------------------------ //

//-------------------- testing user.js ------------------------ //
function testAddUsersToMap(){
	var landmarkLayer = mapControlVariablesModule.getLandmarkLayer();
	var users = userModule.getUsers();
	userModule.addUsersToLayer(users, landmarkLayer);
}
//------------------ END testing user.js ------------------------ //


//------------------ testing featureanimation ------------------------ //
function testFeatureAnimation(){
	var userLayer = mapControlVariablesModule.getUsersLayer();
	var feature = mapControlModule.getFeatureByCoordinates(userLayer, -10, -25);

	function animate(layer, f){	// Remove feature
		layer.getSource().removeFeature(f);
		// Show animation
		layer.animateFeature (f, 
			[	new ol.featureAnimation["Fade"](
				{	speed: Number($("#speed").val()), 
					duration: Number(1000-$("#speed").val()*300),
					side: $("#side").prop('checked'),
					revers: true 
				})
			]);
	}
	
	animate(userLayer, feature);
}



