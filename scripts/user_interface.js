define(['pen', 'zoom', 'jquery','utility'],function(Pen, Zoom, $, Util) {
	return {
		init: function(user_state){

			var set_tool = function(tool){
			    console.log("now using tool: " + tool.name);
			    user_state.active_tool = new tool(user_state);
			};

			var toolbar = document.getElementById("toolbar");
			var pic = user_state.get_picture();

			var penbutton = document.getElementById("pen");
			penbutton.setAttribute("type", "button");
			penbutton.setAttribute("value", "Pen");
			penbutton.setAttribute("name", "penbutton");

			var zoombutton = document.createElement("input");
			zoombutton.setAttribute("type", "button");
			zoombutton.setAttribute("value", "Zoom");
			zoombutton.setAttribute("name", "zoombutton");
			toolbar.appendChild(zoombutton);

			var panbutton = document.createElement("input");
			panbutton.setAttribute("type", "button");
			panbutton.setAttribute("value", "Move");
			panbutton.setAttribute("name", "panbutton");
			toolbar.appendChild(panbutton);

			var redbutton = document.getElementById("red");
			redbutton.setAttribute("type", "number");
			redbutton.setAttribute("value", "" + Util.to_rgb(user_state.active_color).r);
			redbutton.setAttribute("name", "red");
			redbutton.setAttribute("min", "0");
			redbutton.setAttribute("max", "255");
			redbutton.style.borderStyle="solid";
			redbutton.style.borderColor="red";

			var greenbutton = document.getElementById("green");
			greenbutton.setAttribute("type", "number");
			greenbutton.setAttribute("value", "" + Util.to_rgb(user_state.active_color).g);
			greenbutton.setAttribute("name", "green");
			greenbutton.setAttribute("min", "0");
			greenbutton.setAttribute("max", "255");
			greenbutton.style.borderStyle="solid";
			greenbutton.style.borderColor="green";

			var bluebutton = document.getElementById("blue");
			bluebutton.setAttribute("type", "number");
			bluebutton.setAttribute("value", "" + Util.to_rgb(user_state.active_color).b);
			bluebutton.setAttribute("name", "blue");
			bluebutton.setAttribute("min", "0");
			bluebutton.setAttribute("max", "255");
			bluebutton.style.borderStyle="solid";
			bluebutton.style.borderColor="blue";

			var colorbutton = document.getElementById("color");
			colorbutton.setAttribute("type", "color");
			colorbutton.setAttribute("value", user_state.active_color);
			colorbutton.setAttribute("name", "new_color");

			var undobutton = document.getElementById("undo");
			undobutton.setAttribute("type", "button");
			undobutton.setAttribute("value", "Undo");
			undobutton.setAttribute("name", "undobutton");

			var color_change = function(event) {
				var r = $("#red").val();
				var g = $("#green").val();
				var b = $("#blue").val();

				console.log("r: " + r + " g: " + g + " b: " + b + " hex: " + pic.to_hex(r, g, b));
				pic.set_rgb(r, g, b);
				colorbutton.setAttribute("value", pic.to_hex(r, g, b));
			};

			var color_picker_change = function(event) {
				var c = $("#color").val();
				var rgb = Util.to_rgb(c);
				console.log(c);

				pic.set_hex(c);
				redbutton.value = rgb.r;
				greenbutton.value = rgb.g;
				bluebutton.value = rgb.b;
			};

			var zoomtoolchange = function(event) {
				set_tool(Zoom);
			}

			var pantoolchange = function(event) {
				//set_tool(Pan);
			};

			penbutton.addEventListener("click", function(event) {
				set_tool(Pen);
			});

			zoombutton.addEventListener("click", function(event) {
				set_tool(Zoom);
			});

			panbutton.addEventListener("click", function(event) {
				set_tool(Pan);
			});

			undobutton.addEventListener("click", function(event) {
				user_state.active_picture.undo();
			});

			redbutton.addEventListener("change", color_change);
			greenbutton.addEventListener("change", color_change);
			bluebutton.addEventListener("change", color_change);
			colorbutton.addEventListener("change", color_picker_change);

			console.log("UI LOADED");
		}
	}
});
