define(function(){

	function Tool(user_state){
                console.log("NEW TOOL SELECTED");
		var size = 1;
		var transparency = 0;
		
		change_size = function(new_size) {
			active_size = size;
		};

		change_transparency = function(new_percentage) {
		//transparency can't be changed if there is no alpha channel
			if (user.get_alpha() == 1) {
				transparency = new_percentage;
			}
		};
	};
	return Tool;
});
