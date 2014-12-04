define(['tools/tool'],function(Tool){

        function Bucket(user_state){
	    pen = new Tool(user_state);
	    pen.name = "bucket";

	    pen.paint = function(x, y, dragging) {
			var layer = user_state.get_drawing_layer();
			Util.draw_flood_fill(layer,x,y,user_state.active_color,true);
		};

        return pen
	}
	return Bucket;
});

