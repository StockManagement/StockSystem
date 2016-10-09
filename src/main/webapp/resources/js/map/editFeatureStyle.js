var editFeatureStyleModule = function() {
	var onDrpChangeCallback = "";
	
	registerDropdownChangeEvent = function(){
		if( this.onDrpChangeCallback != undefined && this.onDrpChangeCallback.length > 0){
			sharedModule.executeFunctionByName(this.onDrpChangeCallback);
		}
	}
	
	closeEditFeatureStyleModal = function(){
		sharedModule.closeModal('#featureStyleModal');
		$(".symb").off('click');
	}
	
	return{
		onDrpChangeCallback: onDrpChangeCallback,
		closeEditFeatureStyleModal: closeEditFeatureStyleModal,
		registerDropdownChangeEvent: registerDropdownChangeEvent
	}	
}();