var globalModule = (function() {
	// ---------------- growl private variables ---------------------- //
	var growlSuccessClass = "growl-success";
	var growlErrorClass = "growl-error";
	var growlWarningClass = "growl-warning";
	var growlInfoClass = "growl-Info";
	var growlWidgetVar = "growl";

	// ---------------- End growl private variables ---------------------- //

	// ------------------------------------------- //
	var defaultServerPath;
	function getDefaultServerPath() {
		return this.defaultServerPath;
	}
	function setDefaultServerPath(defaultServerPath) {

		this.defaultServerPath = defaultServerPath;
	}
        var userTrackingRestUrl;
	function getUserTrackingRestUrl() {
		return this.userTrackingRestUrl;
	}
	function setUserTrackingRestUrl(userTrackingRestUrl) {

		this.userTrackingRestUrl = userTrackingRestUrl;
	}
	// 
	// ------------------------------------------- //

	function setGrowlSuccessMessage(summary, detail) {
		resetClass(growlWidgetVar, growlSuccessClass, growlErrorClass,
				growlWarningClass);
		setGrowlMessage(growlWidgetVar, summary, detail, "info");
		addClass(growlWidgetVar, growlSuccessClass);
	}

	function setGrowlWarningMessage(summary, detail) {
		resetClass(growlWidgetVar, growlSuccessClass, growlErrorClass,
				growlWarningClass);
		setGrowlMessage(growlWidgetVar, summary, detail, "warn");
		addClass(growlWidgetVar, growlWarningClass);
	}

	function setGrowlErrorMessage(summary, detail) {
		resetClass(growlWidgetVar, growlSuccessClass, growlErrorClass,
				growlWarningClass);
		setGrowlMessage(growlWidgetVar, summary, detail, "error");
		addClass(growlWidgetVar, growlErrorClass);
	}

	function addClass(widgetVar, classToAdd) {
		if (!PF(widgetVar))
			return;
		var children = PF(widgetVar).jq && PF(widgetVar).jq.children() ? PF(widgetVar).jq
				.children()
				: null;
		if (children == null)
			return;
		var index = children.length - 1;
		$(children[index]).addClass(classToAdd);

	}

	function resetClass(widgetVar, successClass, errorClass, warningClass) {
		// if(!PF(widgetVar)) return;
		// if(successClass && PF(widgetVar).jq.hasClass(successClass))
		// PF(widgetVar).jq.removeClass(successClass);
		// if(errorClass && PF(widgetVar).jq.hasClass(errorClass))
		// PF(widgetVar).jq.removeClass(errorClass);
		// if(warningClass && PF(widgetVar).jq.hasClass(warningClass))
		// PF(widgetVar).jq.removeClass(warningClass);
	}

	// private function
	function setGrowlMessage(widgetVar, summary, detail, severity) {
		if (PF(widgetVar)) {
			PF(widgetVar).renderMessage({
				"summary" : summary,
				"detail" : detail,
				"severity" : severity
			});
		}
	}

	return {
		setGrowlErrorMessage : setGrowlErrorMessage,
		setGrowlSuccessMessage : setGrowlSuccessMessage,
		setGrowlWarningMessage : setGrowlWarningMessage,
		getDefaultServerPath : getDefaultServerPath,
		setDefaultServerPath : setDefaultServerPath,
                setUserTrackingRestUrl:setUserTrackingRestUrl,
                getUserTrackingRestUrl:getUserTrackingRestUrl

	};
})();

String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];
    
    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
 return theString;
};
   