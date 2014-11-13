define(['layer'], function(Layer) {

	function Picture(width, height, user_state){

		var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var w = width;
        var h = height;
		var u = user_state;

	    this.size = [width, height];
	    this.layers = [];
        this.history = [];

	    for (i = 0; i < 5; i++) {
	        this.layers.push(new Layer(width,height));
	    }

        //test image

        for (i = 0; i < width; i++) {
            for (j = 0; j < height; j++) {
                this.layers[0].pixelarray[i][j] = '#FF0000';
            }
        }


        for (i = 0; i < 40; i++) {
            for (j = 0; j < 20; j++) {
                this.layers[1].pixelarray[i][j] = '#FFFF00';
            }
        }

        /*
		var clickX = new Array();
		var clickY = new Array();
		var clickDrag = new Array();

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


		this.add_stroke = function(x, y, dragging) {

                        if (!dragging){this.push_history();}
			clickX.push(x);
			clickY.push(y);
			clickDrag.push(dragging);
            context.strokeStyle=u.active_color;

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
        */

		this.redraw = function() {
			for (i = 0; i < this.layers.length; i++) {
                this.layers[i].redraw(context);
	        }
		};

        }
	return Picture;
});
