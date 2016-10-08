var stylerModule = function() {
	// -------------------  default styles -------------------- //
	/***
	 * default style will be used when no style is provided
	 */
	this.defaultStyle = new ol.style.Style({
        fill: new ol.style.Fill({
          color: [0, 255, 255, 1]
        }),
        stroke: new ol.style.Stroke({
          color: [127,127,127,1.0],
          width: 1,
          lineJoin: 'round'
        })
      });
	
	this.default_point_options = {
			radius: 30,
			fillColor:  'rgba(200,150,200,0.5)',
			strokeColor: 'rgba(120,30,100,0.8)',
            strokeWidth: 3
	}
	
	this.default_image_options = {
			anchor: [0.5, 46],
		    size: [32, 48],
	        offset: [52, 0],
	        opacity: 1,
	        scale: 0.25,
	        src: '../../resources/img/landmarks/dots.png'
	}
	
	this.default_text_options = {
			font: '12px helvetica,sans-serif',
            text: 'defaultText',
            rotation: 360 * Math.random() * Math.PI / 180,
            fillColor: '#000',
            strokeColor: '#fff',
            strokeWidth: 2
	}
	
	// ---------------- END  default styles -------------------- //
	
	
	// -------------------  basic functions -------------------- //
	
	/***
	 * @opt_options: a json object
	 * check default_point_options for example of opt_options
	 */
	this.createPoint = function (opt_options){
		 return new ol.style.Circle({
             radius: opt_options.radius || this.default_point_options.radius,
             fill: new ol.style.Fill({
                 color: opt_options.fillColor || this.default_point_options.fillColor
             }),
             stroke: new ol.style.Stroke({
                 color: opt_options.strokeColor || this.default_point_options.strokeColor,
                 width: opt_options.strokeWidth || this.default_point_options.strokeWidth,
             })
		 });
	}
     
	/***
	 * @opt_options: a json object
	 * check default_image_options for example of opt_options
	 */
	this.createImage = function (opt_options){
		return new ol.style.Icon({
			    	anchor: opt_options.anchor || default_image_options.anchor,
		        size: opt_options.size || default_image_options.size,
		        anchorXUnits: 'pixels',
		        anchorYUnits: 'pixels',
		        opacity: opt_options.opacity || default_image_options.opacity,
			    src: opt_options.src || default_image_options.src
	        });
	}
	
	/***
	 * a quick method to create an image style using an image src
	 * @param @optional src: image source 
	 */
	this.createQuickImageStyle = function(src){
		var imageOption = this.default_image_options;
		imageOption.src = $("#frm-add-new-client\\:addUser-selectedIcon").val() || this.default_image_options.src;
		var imageStyle = this.createImage(imageOption);
		var opt_options = {image: imageStyle };
		return  this.createStyle(opt_options);	
	}
	
	
	/***
	 * @opt_options: a json object
	 * check default_text_options for example of opt_options
	 */

	this.createText = function (opt_options){
		 return new ol.style.Text({
             font: opt_options.font || default_text_options.font,
             text: opt_options.text || default_text_options.text,
             rotation: opt_options.rotation || default_text_options.rotation,
             fill: new ol.style.Fill({
                 color: opt_options.fillColor || default_text_options.fillColor
             }),
             stroke: new ol.style.Stroke({
                 color: opt_options.strokeColor || default_text_options.strokeColor,
                 width: opt_options.strokeWidth || default_text_options.strokeWidth
             })
         });
	}
	
	/***
	 * 	    @return a new style of tyle ol.style.Style
	 * 		@opt_options : style options
	 * 	
	 *		Name					Type																									
	 *		geometry				undefined | string | ol.geom.Geometry | ol.StyleGeometryFunction	
	 *		fill						ol.style.Fill | undefined	
	 *		image					ol.style.Image | undefined	
	 *		stroke					ol.style.Stroke | undefined
	 *		text						ol.style.Text | undefined	
	 *		zIndex					number | undefined	
	 *		reference: openLayers3 documentation
	 */   
	this.createStyle = function (opt_options){
		return new ol.style.Style(opt_options);
	}
	

	
	
	// ----------------- END basic functions -------------------- //
};