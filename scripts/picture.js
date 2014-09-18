define(['layer'], function(Layer) {

	function Picture(width, height, user_state){
	    this.size = [width, height];
	    this.layers = [];

	    for (i = 0; i < 5; i++) {
	        this.layers.push(new Layer(width,height));
	    }

		var clickX = new Array();
		var clickY = new Array();
		var clickDrag = new Array();

		this.to_rgb = function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
            } : null;
        };

        component_to_hex = function(c) {
		    var hex = parseInt(c).toString(16);

		    return hex.length == 1 ? "0" + hex : hex;
		};
		
		this.to_hex = function(r, g, b) {
		    return "#" + component_to_hex(r) + component_to_hex(g) + component_to_hex(b);
		};

		this.set_rgb = function(r, g, b) {
			user_state.active_color = this.to_hex(r, g, b);
		};

		this.set_hex = function(hex) {
			user_state.active_color = hex;
		};

		//Tool should draw to the canvas within its class
		//This is merely a temporary solution
		//Maybe we could handle each stroke as an event that would be sent here?
		//Would help making undo
		this.add_stroke = function(x, y, dragging) {
			clickX.push(x);
			clickY.push(y);
			clickDrag.push(dragging);
		};

        this.undo = function() {
            while(clickDrag[clickDrag.length-1]) {
                clickDrag.pop();
                clickX.pop();
                clickY.pop();
            }
            clickDrag.pop();
            clickX.pop();
            clickY.pop();
            this.redraw();
        };

		this.redraw = function() {
            context = document.getElementById("canvas").getContext("2d");

			context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

			context.strokeStyle = user_state.active_color;
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
