var userModule = function() {
	self = this;
	isActiveAddUser = false;
	
	var defaultUser = function(){
		return {
			x : -10,
			y : -25, 
			name: 'default user',
			style: createUserStyle()
		};
	} 
	
	// TODO: take parameter from user json
	var createUserStyle = function(){
		var styler = new stylerModule();
		var imageStyle = styler.createImage(styler.default_image_options);
		var opt_options = {image: imageStyle };
		var style = styler.createStyle(opt_options); 
		return style;
	}
	
	/***
	 * function to simulate a service that get a list of users from database
	 * @returns {Array}
	 */
	// TODO: get users from rest service
	var getUsers = function(){
		var users = [];
		var userTestCount = 50;
		for(var i=0; i<userTestCount; i++){
			var user = {
					location:{
						x : -10 + i*2,
						y : -10 + i*2
					},
					name: user + i,
					style: createUserStyle()
			};
			users.push(user);
		}
		return users;
	}
	
	/***
	 * user should have a location with x and y
	 * @param user
	 * @returns {Boolean}
	 */
	isValidUser = function(user){
		if(user == null || user.x == null || user.y == null) return false;
		return true;
	}
	
	/***
	 * this function is based on mapControlModule().addPointToLayer
	 * @param user
	 * @param layer: a vector layer 
	 */
	// TODO: create a layer for users
	var addUserToLayer = function(user, layer){
		var styler = new stylerModule();
		var usersLayer = mapControlVariablesModule.getUsersLayer();
		if (!isValidUser(user) || layer== 'undefined') return;
		// ensure user style not null
		if(user.style == 'undefined' || user.style == null) {
			var pointOption = styler.default_image_options;
			if(user.img != undefined && user.img.length > 0)
				pointOption.src = user.img;
			var pointStyle = styler.createImage(pointOption);
			var opt_options = {image: pointStyle};
			var style = styler.createStyle(opt_options); 
			user.style = style;
		}
		mapControlModule.addPointToLayer(usersLayer, user.x, user.y, user.style);
	}
	
	/***
	 * @param users: array of users
	 * @param layer: a vector layer
	 */
	var addUsersToLayer = function(users, layer){
		// users & layer not null
		if(users == 'undefined' || layer == 'undefined') return;
		// users is an array
		if(Object.prototype.toString.call( users ) !== '[object Array]')
			users = [user];
		for(var i=0; i<users.length; i++)
			addUserToLayer(users[i], layer);
	}
	
	var init = function(){
		var usersStr = $('#usersHidden').val();
		var users = JSON.parse(usersStr);
		var layer = mapControlVariablesModule.getLandmarkLayer();
		addUsersToLayer(users, layer);
		// show / hide add client form
		//hideShowUserForm();
		// when clicking add feature button  registerDropdownChangeEvent  
		$("#a-addUser").click(function(){ 
//			editFeatureStyleModule.onDrpChangeCallback= "userModule.registerSelectUserIcon";
			editFeatureStyleModule.registerDropdownChangeEvent();
		})
	}
	
	function getFeatureByCoordinates(x, y){
		var userLayer = mapControlVariablesModule.getUsersLayer();
		return mapControlModule.getFeatureByCoordinates(userLayer, x, y);
	}
	
	function onAddUserClick(){
		if (!self.isActiveAddUser) {
			self.isActiveAddUser = true;
			$('#a-addUser').addClass("selected");
			$('#iconAddUser').removeClass("bg-green");
			$('#iconAddUser').addClass("bg-blue");
			
			var userLayer = mapControlVariablesModule.getUsersLayer();
			var geometryType = eventMapControlModule.GEOMETRY_TYPE.POINT;
			var drawEndCallback = 'onUserDrawEnd';
			eventMapControlModule.addDrawInteraction(userLayer, geometryType, drawEndCallback);
			registerSelectUserIcon();
		} else {
			self.isActiveAddUser = false;
			$('#a-addUser').removeClass("selected");
			$('#iconAddUser').removeClass("bg-blue");
			$('#iconAddUser').addClass("bg-green");
			eventMapControlModule.removeDrawInteraction();
		}
	}
	
	// hide / show create client form	
	function hideShowUserForm(){
			if( $("#frm-add-new-client").hasClass("collapse in") ){
				$("#frm-add-new-client").collapse('hide');
				$(".user-search-title").addClass('border-top');
			} else{
				$(".user-search-title").removeClass('border-top');
				$("#frm-add-new-client").collapse('show');
			}
	}
	
	function registerSelectUserIcon(){
		$(".symb").off('click');
		$(".symb").click(function(){
//			var symbol = $(".btn.ui-selectee")[0].src;
			var symbol = $(this)[0].src;
			$("#frm-add-new-client\\:addUser-selectedIcon").val(symbol);
			$(".ui-selectee").find('.btn-success').removeClass('btn-success');	
			$(this).addClass('btn-success');
			
			// get last added feature 
			var feature = eventMapControlModule.lastAddedFeature;
			// create a new style for the feature based on the selected icon
			var styler = new stylerModule();
			var imageOption = styler.default_image_options;
		    imageOption.src = symbol;
			var imageStyle = styler.createImage(imageOption);
			var opt_options = {image: imageStyle };
			var style = styler.createStyle(opt_options);
			feature.setStyle(style);
			// remove and re-add feature to the source 
			var source = mapControlVariablesModule.getUsersLayer().getSource();
			source.removeFeature(feature);
			source.addFeature(feature);
			
//			feature.setStyle();
		})
		
	}
	
	return {
		defaultUser: defaultUser,
		hideShowUserForm: hideShowUserForm,
		createUserStyle: createUserStyle,
		getUsers: getUsers,
		isValidUser: isValidUser,
		addUserToLayer: addUserToLayer,
		addUsersToLayer: addUsersToLayer,
		init: init,
		getFeatureByCoordinates: getFeatureByCoordinates,
		onAddUserClick: onAddUserClick,
		registerSelectUserIcon: registerSelectUserIcon
	}
}();