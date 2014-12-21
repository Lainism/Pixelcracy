define(['utility'], function(Util) {

	function UndoHistory(picture){
        this.history = [];
        this.future = [];
    	this.w = picture.size[0];
    	this.h = picture.size[1];

        this.push = function(){
        	this.history[this.history.length] = new Memento(picture);
        	console.log("pushed, history len: " + this.history.length)
        	this.future = [];
        };
        this.undo = function(){
        	console.log("Undo");
        	if (this.history.length<1){return;}

        	/*get the version to be applied from history*/
        	var version = this.history.pop();

        	/*copy the current state into the future (in case theres a redo)*/
        	this.future[this.future.length] = new Memento(picture);

        	/*apply the undo*/
        	version.apply();
        };
        this.redo = function(){
        	console.log("Redo");
        	if (this.future.length<1){return;}

        	/*get the version to be applied from the future*/
        	var version = this.future.pop();

        	/*copy the current state into the history (in case theres an undo)*/
        	this.history[this.history.length] = new Memento(picture);
        	
        	/*apply the redo*/
        	version.apply();
        };
	}
	function Memento(picture){
		this.width = picture.size[0]
		this.height = picture.size[1]

        this.layers = [];

        /*when created, remember a certain area*/
        for (var k = 0; k < picture.layers.length; k++) {
        	this.layers[k] = [];
	        for (var i = 0; i < this.width; i++) {
	            this.layers[k][i] = new Array(this.height);
	            for (var j = 0; j < this.height; j++) {
	                this.layers[k][i][j] = picture.layers[k].pixelarray[i][j];
	            }
	        }
        }

        this.apply = function(){
	        for (var k = 0; k < this.layers.length; k++){
	        	for (var i = 0; i < this.width; i++) {
	 	            for (var j = 0; j < this.height; j++) {
		            	picture.layers[k].pixelarray[i][j] = this.layers[k][i][j];
		            }
	        	}
	        	picture.layers[k].cached = false;
	        }


    
        	picture.redraw();
		}
	}
	return UndoHistory;
});