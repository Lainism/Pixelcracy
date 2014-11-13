define([], function() {

	function Layer(width, height){
	    this.size = [width, height];
        this.pixelarray = new Array(width);
        
        for (var i = 0; i < width; i++) {
            this.pixelarray[i] = new Array(height);
        }

        this.redraw = function(context) {
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
                            context.fillStyle = color;
                            context.beginPath();
                            context.rect(i, j, i+1, j+1);
                            context.closePath();
                            context.fill()
                            
                        }
                    }
                }
            }
        };

        console.log("New layer created!");
        }
	return Layer;
});
