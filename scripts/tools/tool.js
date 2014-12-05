define(['user_state', 'picture', 'jquery'], function(UserState, Picture, $){

	function Tool(user_state, layer){
                console.log("NEW TOOL SELECTED");
		this.size = 1;
		this.transparency = 0;
        this.name = "default";
        this.layer = layer;

        this.get_name = function(){ return this.name};
		
		this.change_size = function(new_size) {
			active_size = size;
		};

		this.change_transparency = function(new_percentage) {
		//transparency can't be changed if there is no alpha channel
			if (user.get_alpha() == 1) {
				transparency = new_percentage;
			}
		};

		this.update_layer = function() {
			this.layer = user_state.get_drawing_layer();
		}

		this.paint = function(x, y, dragging) {
			//Tool specific override
		};

		this.right_click = function(x, y, dragging) {
			//Tool specific override
		};

	};
	return Tool;
});
