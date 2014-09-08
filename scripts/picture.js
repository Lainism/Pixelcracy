define(['layer'], function(Layer) {

	function Picture(width, height){
	    this.size = [width, height];
	    this.layers = [];

	    for (i = 0; i < 5; i++) {
	        this.layers.push(new Layer(width,height));
	    }

		var clickX = new Array();
		var clickY = new Array();
		var clickDrag = new Array();

		//Tool should draw to the canvas within its class
		//This is merely a temporary solution
		//Maybe we could handle each stroke as an event that would be sent here?
		//Would help making undo
		this.add_stroke = function(x, y, dragging) {
			clickX.push(x);
			clickY.push(y);
			clickDrag.push(dragging);
		};

		this.redraw = function() {
			context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

			context.strokeStyle = "#df4b26";
			context.lineJoin = "round";
			context.lineWidth = 5;
					
			for(var i=0; i < clickX.length; i++) {		
			context.beginPath();
			if(clickDrag[i] && i){
			  context.moveTo(clickX[i-1], clickY[i-1]);
			 }else{
			   context.moveTo(clickX[i]-1, clickY[i]);
			 }
			 context.lineTo(clickX[i], clickY[i]);
			 context.closePath();
			 context.stroke();
			}
		};

        }
	return Picture;
});
