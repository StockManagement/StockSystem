$(function() {
	// mapControlVariablesModule.getOlMap().addLayer(self.vector);
});

var landmarkControl = function() {
	var self = this;
	var isActiveAddLandmark = false;
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
		eventMapControlModule.addDrawInteraction();

	}
	function deactivateAddLandmark() {
		self.isActiveAddLandmark = false;
		$('#a-Addlandmark').removeClass("selected");
		$('#iconAddlandmark').removeClass("bg-blue");
		$('#iconAddlandmark').addClass("bg-green");
		eventMapControlModule.removeDrawInteraction();
	}



	return {
		getIsActiveAddLandmark : getIsActiveAddLandmark,
		setIsActiveAddLandmark : setIsActiveAddLandmark,
		addLandmarkOnClick : addLandmarkOnClick,

	}
}();
