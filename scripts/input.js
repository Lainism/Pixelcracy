define(['jquery'],function($) {
	function InputHandler(user_state){
        this.paint = false
        var state = user_state;
        var oldX = -1;
        var oldY = -1;

		$('#canvas').mousedown(function(e){
			var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            if (this.paint != true) {
            	oldX = x;
            	oldY = y;
            	this.paint = true;
            }
			state.active_tool.paint(x,x,y,y);
		});

		$('#canvas').mousemove(function(e){
			if(this.paint){
			    var x = e.pageX - this.offsetLeft;
                var y = e.pageY - this.offsetTop;
				state.active_tool.paint(oldX,x,oldY,y,true);
				oldX = x;
				oldY = y;
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
