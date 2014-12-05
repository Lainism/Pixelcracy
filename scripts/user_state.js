define(['tools/tool','picture', 'tools/pen', 'utility'], function(Tool, Picture, Pen, Util){

        function UserState(){
	        var canvas = document.getElementById("canvas");
	        var ctx = canvas.getContext("2d");
        	this.w = parseInt(window.innerWidth/2);
        	this.h = parseInt(window.innerHeight/2);
        	canvas.width = this.w;
        	canvas.height = this.h;

        	//values related to the picture
	        this.active_picture = new Picture(this.w,this.h, this);
	        this.active_layout = "default";
			this.active_layer = 0;
	        this.zoom = 1;
	        this.panx = 0;
	        this.pany = 0;

	        //values related to drawing
	        this.active_tool = new Pen(this);
	        	console.log(this.active_tool.get_name());
	        this.active_color = "#df4b26";
	        	console.log(this.w + " " + this.h);
	        this.alpha = 1;
	        ctx.strokeStyle = this.active_color;

	        this.get_alpha = function() { return this.alpha; };
	        this.get_picture = function() { return this.active_picture; };
            this.get_drawing_layer = function() {return this.active_picture.layers[this.active_layer]};

    		this.set_rgb = function(r, g, b) {
			    this.active_color = Util.to_hex(r, g, b);
		    };

		    this.set_hex = function(hex) {
			    this.active_color = hex;
		    };


        }

        return UserState;
});
