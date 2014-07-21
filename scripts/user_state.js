define(['tool','picture', 'pen'], function(Tool, Picture, Pen){

        function UserState(){
	    this.active_tool = new Pen(this);
	    console.log(this.active_tool.get_name());
	    this.active_color = "#000000";
	    this.active_layout = "default";

	    this.alpha = 1;

	    this.active_picture = new Picture(800,600);

	    this.get_alpha = function() { return this.alpha; };
        }
        return UserState;
});
