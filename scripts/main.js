//Initializing require.js
requirejs.config({
	"paths": {
	  "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min"
	}
});

require(['user_state','user_interface','input'], function(UserState, UserInterface,InputHandler) {
	//Main is only for initialization
	var state = new UserState();
	UserInterface.init(state);
	InputHandler(state);
});

