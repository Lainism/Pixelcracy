define(['jquery'],function($) {
	function InputHandler(user_state){
		this.paint = false

		var state = user_state;
		$('#canvas').mousedown(function(e){
			this.paint = true;
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;
			state.active_tool.paint(x,y);
		});

		$('#canvas').mousemove(function(e){
			if(this.paint){
				var x = e.pageX - this.offsetLeft;
				var y = e.pageY - this.offsetTop;
				state.active_tool.paint(x,y,true);
			}
		});

		$('#canvas').mouseup(function(e){
			this.paint = false;
		});

		$('#canvas').mouseleave(function(e){
			this.paint = false;
		});
/*
		$('#canvas').contextmenu(function(e){
			state.active_tool.right_click();
		});*/
	}
	return InputHandler;
});
