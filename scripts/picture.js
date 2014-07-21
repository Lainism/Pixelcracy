define(['layer'], function(Layer) {

	function Picture(width, height){
	    this.size = [width, height];
	    this.layers = [];

	    for (i = 0; i < 5; i++) {
	        this.layers.push(new Layer(width,height));
	    }
        }
	return Picture;
});
