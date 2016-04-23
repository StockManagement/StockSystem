var globalModule = (function() {
	// ---------------- growl private variables ---------------------- //
	var growlSuccessClass = "growl-success";
	var growlErrorClass = "growl-error";
	var growlWarningClass = "growl-warning";
	var growlInfoClass = "growl-Info";
	var growlWidgetVar = "growl";

	// ---------------- End growl private variables ---------------------- //
	
	
	
	function setGrowlSuccessMessage(summary, detail){
		resetClass(growlWidgetVar,growlSuccessClass, growlErrorClass, growlWarningClass);
		setGrowlMessage(growlWidgetVar, summary, detail, "info");
		addClass(growlWidgetVar, growlSuccessClass);
	}
	
	function setGrowlWarningMessage(summary, detail){
		resetClass(growlWidgetVar,growlSuccessClass, growlErrorClass, growlWarningClass);
		setGrowlMessage(growlWidgetVar, summary, detail, "warn");
		addClass(growlWidgetVar, growlWarningClass);
	}
	
	function setGrowlErrorMessage(summary, detail){
		resetClass(growlWidgetVar,growlSuccessClass, growlErrorClass, growlWarningClass);
		setGrowlMessage(growlWidgetVar, summary, detail, "error");
		addClass(growlWidgetVar, growlErrorClass);
	}
	
	
	function addClass(widgetVar, classToAdd){
		if(!PF(widgetVar)) return;
		var children = PF(widgetVar).jq && PF(widgetVar).jq.children()? PF(widgetVar).jq.children() : null;
		if(children == null) return;
		var index = children.length -1;
		$(children[index]).addClass(classToAdd);
		
	}

	
	function resetClass(widgetVar, successClass, errorClass, warningClass){
//		if(!PF(widgetVar)) return;
//		if(successClass && PF(widgetVar).jq.hasClass(successClass))
//			PF(widgetVar).jq.removeClass(successClass);
//		if(errorClass && PF(widgetVar).jq.hasClass(errorClass))
//			PF(widgetVar).jq.removeClass(errorClass);
//		if(warningClass && PF(widgetVar).jq.hasClass(warningClass))
//			PF(widgetVar).jq.removeClass(warningClass);
	}
	
	// private function
	function setGrowlMessage(widgetVar, summary, detail, severity){
		if(PF(widgetVar)){
			PF(widgetVar).renderMessage({"summary":summary,
	            "detail": detail,
	            "severity":severity});
		}
	}
	

	return {
		setGrowlErrorMessage: setGrowlErrorMessage,
		setGrowlSuccessMessage: setGrowlSuccessMessage,
		setGrowlWarningMessage: setGrowlWarningMessage
	};
})();
