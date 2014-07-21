define(function (require, user_state, active_frame) {
	var user = user_state;
	var frame = active_frame;

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
});