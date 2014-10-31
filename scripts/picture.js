define(['layer'], function(Layer) {

	function Picture(width, height, user_state){

		var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var w = width;
        var h = height;

		this.get_current_image = function () {
			var data = canvas.toDataURL();
			var ni = new Image();
			ni.onload = function(){
				context.drawImage(ni,0,0);
			}
			ni.src = data;

			return ni;
		}

	    this.size = [width, height];
	    this.layers = [];
        this.history = [];
        this.img = this.get_current_image();

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

        var component_to_hex = function(c) {
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

		var u = user_state;

		//Tool should draw to the canvas within its class
		//This is merely a temporary solution
		//Maybe we could handle each stroke as an event that would be sent here?
		//Would help making undo
		this.add_stroke = function(x, y, dragging) {

                        if (!dragging){this.push_history();}
			clickX.push(x);
			clickY.push(y);
			clickDrag.push(dragging);

			var i= clickX.length-1;		
			context.beginPath();
			if(clickDrag[i] && i){
			  context.moveTo(clickX[i-1], clickY[i-1]);
			 }else{
			   context.moveTo(clickX[i]-1, clickY[i]);
			 }
			context.lineTo(clickX[i], clickY[i]);
			context.closePath();
			context.stroke();
		};

		this.push_history = function() {
                        canvas = document.getElementById("canvas");
                        context = canvas.getContext("2d");

			w = parseInt(canvas.width);
			h = parseInt(canvas.height);
			data = context.getImageData(0,0,w,h);
                        this.history.push(data);
		};

        this.undo = function() {

            canvas = document.getElementById("canvas");
            context = canvas.getContext("2d");
            if (this.history.length==0) {return}
            context.putImageData(this.history.pop(),0,0);

        };

		this.redraw = function() {
			this.img = this.get_current_image();
			context.clearRect(0, 0, w, h);
			//console.log(w + " = " + context.width + ", " + h + " = " + context.height);
			context.drawImage(this.img, user_state.zoomx, user_state.zoomy, user_state.panx*user_state.zoom, user_state.pany*user_state.zoom);
			//context.drawImage(this.img,0,0);
			console.log(user_state.zoomx + " " + user_state.zoomy +" "+ user_state.panx*user_state.zoom +" "+ user_state.pany*user_state.zoom);
		};

        }
	return Picture;
});
