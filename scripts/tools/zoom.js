define(['tools/tool'],function(Tool){

        function Zoom(user_state){
	    zoom = new Tool(user_state);
	    zoom.name = "zoom";
	    var ctx = document.getElementById("canvas").getContext("2d");

	    zoom.paint = function(x, y, dragging) {

	    	if (dragging) {return};

	    	//Zoom in
	    	user_state.panx = x;
	    	user_state.pany = y;
	    	user_state.zoom *= 2;
	    	user_state.get_picture().redraw();

	    	//console.log("x: " + user_state.zoomx + " y: " + user_state.zoomy + " scale: " + user_state.zoomscale);
	    };

	    zoom.right_click = function(x, y) {
	    	//Zoom out
	    	user_state.panx = x;
	    	user_state.pany = y;
	    	user_state.zoom *= 0.5;
	    	user_state.get_picture().redraw();
	    };

        return zoom
	}
	return Zoom;
});

