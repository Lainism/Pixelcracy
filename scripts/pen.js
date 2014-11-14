define(['tool'],function(Tool){

        function Pen(user_state){
	    pen = new Tool(user_state);
	    pen.name = "pen";

	    pen.paint = function(x, y, dragging) {
			var layer = user_state.get_drawing_layer();
			Util.draw_pixel_to_layer(layer,x,y,user_state.active_color,true);
		};

        return pen
	}
	return Pen;
});

