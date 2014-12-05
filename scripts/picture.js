define(['layer','utility'], function(Layer,Util) {

	function Picture(width, height, user_state){
		/* Picture draws the image on-screen */

		var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var w = width;
        var h = height;
		var u = user_state;

	    this.size = [width, height];
	    this.layers = [];
        this.history = [];

        // Creating the empty default layers
	    for (i = 0; i < 5; i++) {
	        this.layers.push(new Layer(this,width,height));
	    }

        /* This is the image used for testing */

        // Filling the canvas with 
        for (i = 0; i < width; i++) {
            for (j = 0; j < height; j++) {
                this.layers[0].pixelarray[i][j] = '#FF0000';
            }
        }
        this.layers[0].cached = false;

        // Drawing a yellow rectangle to an upper layer
        for (i = 40; i < 100; i++) {
            for (j = 20; j < 50; j++) {
                this.layers[1].pixelarray[i][j] = '#FFFF00';
            }
        }
        this.layers[1].cached = false;

        // Drawing a white circle
        Util.draw_circle(this.layers[2],200,200,200,'#F0F0F0');

        // Function managing the history
		this.push_history = function() {
            //needs to be reimplemented for pixelarrays
            //this.history.push(data);
		};

		// Function returning the state of image from history
        this.undo = function() {
            //needs to be reimplemented for pixelarrays
            //if (this.history.length==0) {return}
            //context.putImageData(this.history.pop(),0,0);

        };
        
        // Function returning the state of image after undo
        this.redo = function() {
        	// TODO Redo
        }

        // Function all the layers on screen in order
		this.redraw = function() {
			// TODO Redraw only the changed parts
			for (i = 0; i < this.layers.length; i++) {
                this.layers[i].redraw(context);
	        }
		};

        }
	return Picture;
});
