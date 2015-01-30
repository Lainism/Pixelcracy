define(['tools/tool'],function(Tool){

	function Pan(user_state){
		/* Pan allows dragging the image to show more area */

		pan = new Tool(user_state);
		pan.name = "pan";
		var ctx = document.getElementById("canvas").getContext("2d");

		// Panning happens in this function
		// Overriding the function in Tool
		pan.paint = function(x, y, dragging) {
			//how to pan
		}

		return pan
	}

	return Pan;
});

