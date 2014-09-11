define(['user_state', 'picture', 'jquery'], function(UserState, Picture, $){

	function Tool(user_state){
                console.log("NEW TOOL SELECTED");
		this.size = 1;
		this.transparency = 0;
		this.paint = false;
        this.name = "default";
        this.get_name = function(){ return this.name};
		
		this.change_size = function(new_size) {
			active_size = size;
		};

		this.change_transparency = function(new_percentage) {
		//transparency can't be changed if there is no alpha channel
			if (user.get_alpha() == 1) {
				transparency = new_percentage;
			}
		};

		this.addClick = function(x, y, dragging) {
			var picture = user_state.active_picture;
			picture.add_stroke(x, y, dragging);
            picture.redraw();
		};

		//drawing events
		//tools override the two first of these
        var tool = this;
		$('#canvas').mousedown(function(e){
			var mouseX = e.pageX - this.offsetLeft;
			var mouseY = e.pageY - this.offsetTop;

			paint = true;

			tool.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		});

		$('#canvas').mousemove(function(e){
			if(paint){
				tool.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
  }
		});

		$('#canvas').mouseup(function(e){
			paint = false;
		});

		$('#canvas').mouseleave(function(e){
			paint = false;
		});

	};
	return Tool;
});
