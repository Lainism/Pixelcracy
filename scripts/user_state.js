define(['tool','picture', 'pen'], function(Tool, Picture, Pen){

        function UserState(){
	        var canvas = document.getElementById("canvas");
	        var ctx = canvas.getContext("2d");
        	var x = parseInt(window.innerWidth/2);
        	var y = parseInt(window.innerHeight/2);
        	canvas.width = x;
        	canvas.height = y;

	        this.active_tool = new Pen(this);
	        console.log(this.active_tool.get_name());
	        this.active_color = "#df4b26";
	        this.zoomx = 0;
	        this.zoomy = 0;
	        this.active_layout = "default";

	        this.alpha = 1;
	        this.zoom = 1;

	        console.log(x + " " + y);
	        this.active_picture = new Picture(x,y, this);
	        ctx.strokeStyle = this.active_color;
	        this.panx = x;
	        this.pany = y;

	        this.get_alpha = function() { return this.alpha; };
	        this.get_picture = function() { return this.active_picture; };
        
        }

        return UserState;
});
