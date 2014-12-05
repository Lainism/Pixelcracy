define(['tools/tool'],function(Tool){

        function Pen(user_state){
	    pen = new Tool(user_state);
	    pen.name = "pen";

	    pen.paint = function(x0, x1, y0, y1, dragging) {
			var layer = user_state.get_drawing_layer();
			//Util.draw_pixel_to_layer(layer,x1,y1,user_state.active_color,true);
			Util.bresenham(layer,x0,x1,y0,y1,user_state.active_color, true);
		};

        return pen
	}
	return Pen;
});

