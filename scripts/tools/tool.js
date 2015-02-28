define(['user_state', 'picture', 'jquery'], function(UserState, Picture, $){

	function Tool(user_state, current_layer){
		/* Tool describes the common features all the tools have */
				console.log("NEW TOOL SELECTED");
		name = "default";
		layer = current_layer;
		size = 1;
		transparency = 0;

		// Getters
		this.get_name = function(){ return name; };
		
		// Setters
		this.set_name = function(new_name) { name = new_name; };
		this.set_size = function(new_size) { active_size = size; };
		this.set_transparency = function(new_percentage) {
			// Transparency can't be changed if there is no alpha channel
			if (user.get_alpha() == 1) {
				transparency = new_percentage;
			}
		};

		// Changes the layer that's being drawn on to the currently active one
		this.update_layer = function() { layer = user_state.get_drawing_layer(); }

		// Dummy functions that the subclasses will override
		this.paint = function(x0, x1, y0, y1, dragging) {};
		this.right_click = function(x, y, dragging) {};
		this.on_begin_drawing = function() {
			user_state.get_picture().push_history();
		}

	};
	return Tool;
});
