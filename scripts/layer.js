define(['utility'], function(Util) {

	function Layer(picture,width, height){
	    this.size = [width, height];
        this.parentpicture = picture;

        this.cached = true;
        
        //cachedcanvas/cachedcontext saves the rendered bitmap for this layer
        this.cachedcanvas = document.createElement('canvas');
        this.cachedcontext = this.cachedcanvas.getContext("2d");
        this.cachedcanvas.width = width;
        this.cachedcanvas.height = height;

        this.pixelarray = new Array(width);
        for (var i = 0; i < width; i++) {
            this.pixelarray[i] = new Array(height);}

        this.redraw = function(context) {
            if (!this.cached) {
                minx=0;
                maxx=width;
                miny=0;
                maxy=height;

                for (var i = minx; i < maxx; i++) {
                    for (var j = miny; j < maxy; j++) {
                        var color = this.pixelarray[i][j];
                        //draw the pixel if it is defined
                        if (typeof color !== 'undefined') {
                            if ((0<=i && i<=width) && (0<=j && j<=height)){
                                Util.draw_pixel_to_context(this.cachedcontext,i,j,color);
                            }
                        }
                    }
                }
                this.cached = true;
            }
            //draw the cached image to the screen context
            context.drawImage(this.cachedcanvas,0,0);
        };

        console.log("New layer created!");
        }
	return Layer;
});
