define(['tool'],function(Tool){

        function Pen(user_state){
	    pen = new Tool(user_state);
	    pen.name = "pen";
            return pen
	}
	return Pen;
});

