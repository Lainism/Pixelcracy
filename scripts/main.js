/* Setting up require.js */
requirejs.config({
	"paths": {
	  "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min"
	}
});

require(['user_state','user_interface','input'], function(UserState, UserInterface,InputHandler) {
	/* Main is used only for setting up the app */
	
	document.getElementById("canvas").style.borderStyle="solid";
	var state = new UserState();
	UserInterface.init(state);
	InputHandler(state);

	state.active_picture.redraw();
});
