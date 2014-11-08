define(['tool','picture', 'pen'], function(Tool, Picture, Pen){

        function UserState(){
	        var canvas = document.getElementById("canvas");
	        var ctx = canvas.getContext("2d");
        	this.w = parseInt(window.innerWidth/2);
        	this.h = parseInt(window.innerHeight/2);
        	canvas.width = this.w;
        	canvas.height = this.h;

	        this.active_tool = new Pen(this);
	        console.log(this.active_tool.get_name());
	        this.active_color = "#df4b26";
	        this.active_layout = "default";

	        this.alpha = 1;
	        this.zoom = 1;

	        console.log(this.w + " " + this.h);
	        this.active_picture = new Picture(this.w,this.h, this);
	        ctx.strokeStyle = this.active_color;
	        this.panx = 0;
	        this.pany = 0;

	        this.get_alpha = function() { return this.alpha; };
	        this.get_picture = function() { return this.active_picture; };
        
        }

        return UserState;
});
