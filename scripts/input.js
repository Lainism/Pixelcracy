define(['jquery'],function($) {

	function InputHandler(user_state){
		/* InputHandler links the user interactions on canvas to the program */

        this.paint = false
        var state = user_state;
        var oldX = -1;
        var oldY = -1;

        // When the mouse is first pressed down 
		$('#canvas').mousedown(function(e){
			if (this.paint == true) { return; }

			// Paint the current pixel
			oldX = e.pageX - this.offsetLeft;
            oldY = e.pageY - this.offsetTop;
        	state.active_tool.paint(oldX,oldX,oldY,oldY,this.paint);
			this.paint = true;         
		});

		// Paint line when the mouse is dragged
		$('#canvas').mousemove(function(e){
			if(!this.paint){ return; }

			// Paint the line between old and new positions
		    var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
			state.active_tool.paint(oldX,x,oldY,y,this.paint);

			// x and y stop being new
			oldX = x;
			oldY = y;
		});

		// Stop painting when the mouse stops being pressed
		$('#canvas').mouseup(function(e){
			this.paint = false;
		});

		// Stop painting when the mouse leaves the canvas
		$('#canvas').mouseleave(function(e){
			this.paint = false;
		});
/*
		// Overriding the standard HTML context menu
		$('#canvas').contextmenu(function(e){
			state.active_tool.right_click();
		});*/
    }
    return InputHandler;
});
