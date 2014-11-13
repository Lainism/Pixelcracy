define(['tool'],function(Tool){

        function Pen(user_state){
	    pen = new Tool(user_state);
	    pen.name = "pen";

	    pen.paint = function(x, y, dragging) {
			var layer = user_state.get_drawing_layer();
			layer.draw_pixel(x,y,user_state.active_color);
		};

        return pen
	}
	return Pen;
});

