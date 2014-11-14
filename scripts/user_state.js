define(['tool','picture', 'pen'], function(Tool, Picture, Pen){

		function UserState(){
			/* UserState stores information about the user related variables. */

			//Retrieving the canvas image will be drawn on
			var canvas = document.getElementById("canvas");
			var ctx = canvas.getContext("2d");

			//Width and height of the picture
			this.w = parseInt(window.innerWidth/2);
			this.h = parseInt(window.innerHeight/2);

			//Brush opacity, zoom rate and the current offset of image pan
			this.alpha = 1;
			this.zoom = 1;
			this.panx = 0;
			this.pany = 0;

			//Setting the active variables
			this.active_picture = new Picture(this.w,this.h, this);
			this.active_tool = new Pen(this);
			this.active_color = "#df4b26";
			this.active_layout = "default";

			//Setting the selected brush color to the canvas
			ctx.strokeStyle = this.active_color;

			//Setting the canvas size
			canvas.width = this.w;
			canvas.height = this.h;

			//Getters
			this.get_alpha = function() { return this.alpha; };
			this.get_picture = function() { return this.active_picture; };
		
		}

		return UserState;
});
