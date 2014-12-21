define(['utility'], function(Util) {

	function UndoHistory(picture){
        this.history = [];
        this.future = [];
    	this.w = picture.size[0];
    	this.h = picture.size[1];

        this.push = function(layer){
        	this.history[this.history.length] = new Memento(layer,0,0,this.w,this.h);
        	console.log("pushed, history len: " + this.history.length)
        	this.future = [];
        };
        this.undo = function(){
        	console.log("Undo");
        	if (this.history.length<1){return;}

        	/*get the version to be applied from history*/
        	var version = this.history.pop();
        	var layer = version.layer;

        	/*copy the current state into the future (in case theres a redo)*/
        	this.future[this.future.length] = new Memento(layer,0,0,this.w,this.h);

        	/*apply the undo*/
        	version.apply();
        };
        this.redo = function(){
        	console.log("Redo");
        	if (this.future.length<1){return;}

        	/*get the version to be applied from the future*/
        	var version = this.future.pop();
        	var layer = version.layer;

        	/*copy the current state into the history (in case theres an undo)*/
        	this.history[this.history.length] = new Memento(layer,0,0,this.w,this.h);
        	
        	/*apply the redo*/
        	version.apply();
        };
	}
	function Memento(layer){
		/*contains a saved version of a rectangular area of a picture*/
		this.layer = layer
		this.width = layer.parentpicture.size[0]
		this.height = layer.parentpicture.size[1]

        this.pixelarray = new Array(this.width);

        /*when created, remember a certain area*/
        for (var i = 0; i < this.width; i++) {
            this.pixelarray[i] = new Array(this.height);
            for (var j = 0; j < this.height; j++) {
                if (typeof layer.pixelarray[i][j] !== undefined) {
                	this.pixelarray[i][j] = layer.pixelarray[i][j];
                } else {
                    this.pixelarray[i][j] = -1;
                }
            }
        }

        this.apply = function(){
        	for (var i = 0; i < this.width; i++) {
 	            for (var j = 0; j < this.height; j++) {
	            	layer.pixelarray[i][j] = this.pixelarray[i][j];
	            }
        	}

            console.log(layer.pixelarray[2][3])

        	layer.cached = false;
        	layer.parentpicture.redraw();
		}
	}
	return UndoHistory;
});