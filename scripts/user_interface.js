console.log("user interface module loaded");

define(function (require) {
	var user_state = require('./user_state');
	console.log(user_state.get_active_tool());
});
