define(['utility'], function(Util) {

	function Layer(picture,width, height){
		/* Layer describes a single layer the picture consists of and draws it to the screen */

		this.size = [width, height];
		this.parentpicture = picture;
		this.cached = true;
		this.opacity = 100;
		
		// cachedcanvas/cachedcontext saves the rendered bitmap for this layer
		this.cachedcanvas = document.createElement('canvas');
		this.cachedcontext = this.cachedcanvas.getContext("2d");
		this.cachedcanvas.width = width;
		this.cachedcanvas.height = height;

		// Creating an empty two-dimensional matrix
		this.pixelarray = new Array(width);
		for (var i = 0; i < width; i++) {
			this.pixelarray[i] = new Array(height);
			for (var j = 0; j < height; j++) {
				this.pixelarray[i][j] = -1;
			}
		}

		this.redraw = function(context) {
			// Return if catched
			if (this.cached) {
				context.globalAlpha = this.opacity / 100.0;
				context.drawImage(this.cachedcanvas,0,0);
				context.globalAlpha = 1;
				return;
			}

			minx=0;
			miny=0;
			maxx=width;
			maxy=height;
			this.cachedcontext.clearRect ( 0 , 0 , this.cachedcanvas.width, this.cachedcanvas.height );

			
			// Drawing the pixels from the matrix to the context
			for (var i = minx; i < maxx; i++) {
				for (var j = miny; j < maxy; j++) {
					var color = this.pixelarray[i][j];
					// Draw the pixel if it's not -1
					if ((color != -1) && (0<=i && i<=width) && (0<=j && j<=height)){
						Util.draw_pixel_to_context(this.cachedcontext,i,j,color);
					}
					
				}
			}

			this.cached = true;
			

			// Draw the cached image to the screen context
			context.globalAlpha = this.opacity / 100.0;
			context.drawImage(this.cachedcanvas,0,0);
			context.globalAlpha = 1;

		};

		console.log("New layer created!");
		}
	return Layer;
});
