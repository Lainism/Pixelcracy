define(['user_state', 'picture', 'jquery'], function(UserState, Picture, $){

	function Tool(user_state){
		/* General class for all the tools */

		//Variables all the tools have
		this.name = "default";
		this.size = 1;
		this.transparency = 0;

		console.log("NEW TOOL SELECTED");

		//Getters
		this.get_name = function(){ return this.name};
		
		//Setters
		this.set_size = function(new_size) {
			active_size = size;
		};

		this.set_transparency = function(new_percentage) {
		//Transparency can't be changed if there is no alpha channel
			if (user.get_alpha() == 1) {
				transparency = new_percentage;
			}
		};

		//Other functions
		this.paint = function(x, y, dragging) {
			//Subclasses will override this
		};

		this.right_click = function(x, y, dragging) {
			//Subclasses will override this
		};

	};
	return Tool;
});
