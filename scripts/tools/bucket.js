define(['tools/tool'],function(Tool){

	function Bucket(user_state){
		/* Bucket tool allows filling in the large areas of the same color */

		pen = new Tool(user_state);
		pen.name = "bucket";

		// Filling happens here
		// Overriding the function in Tool
		pen.paint = function(oldx,x, oldy,y, dragging) {
			if (dragging) {return};
			var layer = user_state.get_drawing_layer();
			Util.draw_flood_fill(layer,x,y,user_state.active_color,true);
		};

		return pen
	}
	return Bucket;
});

