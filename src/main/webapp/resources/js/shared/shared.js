var sharedModule = function() {
	
	function createSearchFilter(){
		var $el = $('*[data-filter="true"]');
		var inputSelector = $el.attr("data-input");
		
		$(inputSelector).on('keyup', function () {
		    var value = this.value.toLowerCase();
		    $el.find('li').hide().each(function () {
		        if ($(this).text().toLowerCase().search(value) > -1) {
		            $(this).prevAll('.header').first().add(this).show();
		        }
		    });
		});
	}
	
	function loadModal(jModalSelector, jSelectorModalHeader ){
		jSelectorModalHeader == undefined? ".modal-header" : jSelectorModalHeader;
		   $(jModalSelector).modal({ keyboard: false,
               show: true
			});
//			// Jquery draggable
//			$(jModalSelector).draggable({
//				handle: jSelectorModalHeader
//			});
	}
	
	function closeModal(jModalSelector){
		$(jModalSelector).modal('hide');
	}
	
	return{
		createSearchFilter: createSearchFilter,
		loadModal: loadModal,
		closeModal: closeModal
	}
	
}();