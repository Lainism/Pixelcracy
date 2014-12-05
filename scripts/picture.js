define(['layer','utility'], function(Layer,Util) {

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
	        this.layers.push(new Layer(this,width,height));
	    }

        //test image

        for (i = 0; i < width; i++) {
            for (j = 0; j < height; j++) {
                this.layers[0].pixelarray[i][j] = '#FF0000';
            }
        }
        this.layers[0].cached = false;


        for (i = 40; i < 100; i++) {
            for (j = 20; j < 50; j++) {
                this.layers[1].pixelarray[i][j] = '#FFFF00';
            }
        }
        this.layers[1].cached = false;

        Util.draw_circle(this.layers[2],200,200,200,'#F0F0F0');

		this.push_history = function() {
            //needs to be reimplemented for pixelarrays
            //this.history.push(data);
		};

        this.undo = function() {
            //needs to be reimplemented for pixelarrays
            //if (this.history.length==0) {return}
            //context.putImageData(this.history.pop(),0,0);

        };
        

		this.redraw = function() {
			for (i = 0; i < this.layers.length; i++) {
                this.layers[i].redraw(context);
	        }
		};

        }
	return Picture;
});
