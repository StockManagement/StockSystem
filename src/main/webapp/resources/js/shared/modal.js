var modalModule = (function() {

	// Handle AJAX form Request (begin, complete & success)
	function onEventHandler(data) {
		if (data.status == "begin") {
//			loaderModule.showFullPageLoader();
		}
		if (data.status == "success") {
//			$('.modalDialog').foundation('reveal', 'open');
//			attachClickEvent('.close-reveal-modal');
//			attachClickEvent('.reveal-modal-bg');
			PF('dlg2').show();
//			loaderModule.hideFullPageLoader();
		}

	}
	
	function onErrorHandler(){
		loaderModule.hideFullPageLoader();
	}

	function attachClickEvent(item) {
		$(item).off('click').on('click', function() {
			closeModal();
		});
	}

	function showModal(){
		if(PF('dlg2'))
			PF('dlg2').show();
	}
	
	// closes the modal
	function closeModal() {
		if(PF('dlg2'))
			PF('dlg2').hide();
	}

	return {
		onEventHandler : onEventHandler,
		onErrorHandler : onErrorHandler,
		attachClickEvent : attachClickEvent,
		showModal : showModal,
		closeModal : closeModal
	};
})();
