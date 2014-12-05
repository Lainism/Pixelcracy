define(['tools/tool'],function(Tool){

	function Zoom(user_state){
		/* Zoom shows the image from closer or further away */

	    zoom = new Tool(user_state);
	    zoom.name = "zoom";
	    var ctx = document.getElementById("canvas").getContext("2d");

	    // Zoom in
	    // Overriding the function in Tool
	    zoom.paint = function(x0, x1, y0, y1, dragging) {
	    	if (dragging) {return};

	    	//Zoom in
	    	user_state.panx = x1;
	    	user_state.pany = y1;
	    	user_state.zoom *= 2;
	    	user_state.get_picture().redraw();

	    	//console.log("x: " + user_state.zoomx + " y: " + user_state.zoomy + " scale: " + user_state.zoomscale);
	    };

	    // Zoom out
	    // Overriding the function in Tool
	    zoom.right_click = function(x, y) {
	    	user_state.panx = x;
	    	user_state.pany = y;
	    	user_state.zoom *= 0.5;
	    	user_state.get_picture().redraw();
	    };

        return zoom
	}
	return Zoom;
});

