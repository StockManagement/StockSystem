$(function() {
	
});

var LayerControl = function(){
	var self = this;
	var layer;
	var source;
	var style;

	// --------------- getters and setters ------------- //
	function getLayer(){return self.layer;}
	function setLayer(layer){self.layer = layer;}
	
	function getSourcel() {return self.source;}
	function setSource(source) {self.source = source;}
	
	
	function getStyle() {return self.style;}
	function setStyle() {self.style = style;}
	// --------------End getters and setters ------------- //
	
	function initLayer(layer,source ,style){
		self.setLayer(layer);
		self.setSource(source);
		self.setStyle(setStyle);
		
	}
	return {
		getLayer: getLayer,
		setLayer: setLayer,
		getSourcel: getSourcel,
		setSource: setSource,
		getStyle: getStyle,
		setStyle: setStyle,
	}
}();
