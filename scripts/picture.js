define(['layer'], function(Layer) {

	function Picture(width, height, user_state){
		/* Picture is the representation of the image drawn on the canvas */

		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");

		var w = width;
		var h = height;
		var u = user_state;

		//Creating an array of drawn strokes
		var strokeX = new Array();
		var strokeY = new Array();
		var strokeDrag = new Array();

		this.size = [w, h];
		this.layers = [];
		this.history = [];

		//Create layers the image consists of
		for (i = 0; i < 5; i++) {
			this.layers.push(new Layer(width,height));
		}

		//Retrieves a representation of the image in a single layer
		this.get_current_image = function () {
			var data = canvas.toDataURL();
			var ni = new Image();
			ni.onload = function(){
				context.drawImage(ni,0,0);
			}
			ni.src = data;

			return ni;
		}

		this.img = this.get_current_image();

		//Converts a hexadecimal color to rgb
		this.to_rgb = function (hex) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
				return result ? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
			} : null;
		};

		//Converts a single color component to hexadecimal
		var component_to_hex = function(c) {
			var hex = parseInt(c).toString(16);

			return hex.length == 1 ? "0" + hex : hex;
		};
		
		//Converts an rgb color to hexadecimal
		this.to_hex = function(r, g, b) {
			return "#" + component_to_hex(r) + component_to_hex(g) + component_to_hex(b);
		};

		//Setters
		this.set_rgb = function(r, g, b) {
			u.active_color = this.to_hex(r, g, b);
		};

		this.set_hex = function(hex) {
			u.active_color = hex;
		};

		//Other functions
		this.add_stroke = function(x, y, dragging) {

						if (!dragging){this.push_history();}
			strokeX.push(x);
			strokeY.push(y);
			strokeDrag.push(dragging);
			context.strokeStyle=u.active_color;

			var i= strokeX.length-1;		
			context.beginPath();
			if(strokeDrag[i] && i){
			  context.moveTo(strokeX[i-1], strokeY[i-1]);
			 }else{
			   context.moveTo(strokeX[i]-1, strokeY[i]);
			 }
			context.lineTo(strokeX[i], strokeY[i]);
			context.closePath();
			context.stroke();
			this.img = this.get_current_image();
		};

		this.push_history = function() {

			w = parseInt(canvas.width);
			h = parseInt(canvas.height);
			data = context.getImageData(0,0,w,h);
						this.history.push(data);
		};

		this.undo = function() {

			if (this.history.length==0) {return}
			context.putImageData(this.history.pop(),0,0);

		};

		this.redraw = function() {
			context.fillStyle = "white";
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.drawImage(this.img, u.panx, u.pany, u.zoom*u.w, u.zoom*u.h);
		};

		}
	return Picture;
});
