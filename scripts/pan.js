define(['tool'],function(Tool){

		function Pan(user_state){
		pan = new Tool(user_state);
		pan.name = "pan";
		var ctx = document.getElementById("canvas").getContext("2d");

		pan.paint = function(x, y, dragging) {
			//how to pan
		}

		return pan
	}

	return Pan;
});

