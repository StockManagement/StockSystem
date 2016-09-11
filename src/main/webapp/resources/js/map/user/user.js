var userModule = function() {
	self = this;
	var defaultUser = function(){
		return {
			location:{
				x : -10,
				y : -25 
			},
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
		// add default user to users
//		users.push(defaultUser);
		return users;
	}
	
	/***
	 * user should have a location with x and y
	 * @param user
	 * @returns {Boolean}
	 */
	isValidUser = function(user){
		if(user == 'undefined' || user.location == 'undefined' || user.location.x == 'undefined' || user.location.y == 'undefined') return false;
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
		if (! isValidUser(user) || layer== 'undefined') return;
		// ensure user style not null
		if(user.style == 'undefined' || user.style == null) user.style = styler.defaultStyle();
		mapControlModule.addPointToLayer(usersLayer, user.location.x, user.location.y, user.style);
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
	
	return {
		defaultUser: defaultUser,
		createUserStyle: createUserStyle,
		getUsers: getUsers,
		isValidUser: isValidUser,
		addUserToLayer: addUserToLayer,
		addUsersToLayer: addUsersToLayer
	}
}();