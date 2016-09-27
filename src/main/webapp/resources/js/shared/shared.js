var sharedModule = function() {
	
	function createSearchFilter(){
		var $el = $('*[data-filter="true"]');
		var inputSelector = $el.attr("data-input");
		
		$(inputSelector).on('keyup', function () {
		    var value = this.value;
		    $el.find('li').hide().each(function () {
		        if ($(this).text().search(value) > -1) {
		            $(this).prevAll('.header').first().add(this).show();
		        }
		    });
		});
	}
	
	return{
		createSearchFilter: createSearchFilter
	}
	
}();