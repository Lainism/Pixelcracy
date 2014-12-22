define(['tools/tool'],function(Tool){

        function Pen(user_state){
        /* Pen describes the functionality of the pen tool */

        // Defining the superclass
	    pen = new Tool(user_state);
	    pen.set_name("pen");

	    // Overriding the function in Tool
	    pen.paint = function(x0, x1, y0, y1, dragging) {
			var layer = user_state.get_drawing_layer();
			user_state.get_picture().get_context().globalAlpha = layer.opacity / 100.0;
			Util.bresenham(layer,x0,x1,y0,y1,user_state.active_color, true);
		};

        return pen
	}
	return Pen;
});
