define(['tool'],function(Tool){

		function Pen(user_state){
		pen = new Tool(user_state);
		pen.name = "pen";

		var context = document.getElementById("canvas").getContext("2d");
		context.lineJoin = "round";
		context.lineWidth = 5;
		context.strokeStyle = user_state.active_color;

		pen.paint = function(x, y, dragging) {
			var picture = user_state.active_picture;
			picture.add_stroke(x, y, dragging);
		};

		return pen
	}
	return Pen;
});

