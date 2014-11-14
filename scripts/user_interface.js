define(['pen', 'zoom', 'pan', 'jquery'],function(Pen, Zoom, Pan, $) {
	return {
		init: function(user_state){
			/* User interface manages the elements and draws them to the screen */

			var toolbar = document.getElementById("toolbar");
			var pic = user_state.get_picture();

			//Initializing the buttons and their variables
			var penbutton = document.createElement("input");
			penbutton.setAttribute("type", "button");
			penbutton.setAttribute("value", "Pen");
			penbutton.setAttribute("id", "penbutton");

			var redbutton = document.createElement("input");
			redbutton.setAttribute("type", "number");
			redbutton.setAttribute("value", "" + pic.to_rgb(user_state.active_color).r);
			redbutton.setAttribute("id", "red");
			redbutton.setAttribute("min", "0");
			redbutton.setAttribute("max", "255");
			redbutton.style.borderStyle="solid";
			redbutton.style.borderColor="red";

			var greenbutton = document.createElement("input");
			greenbutton.setAttribute("type", "number");
			greenbutton.setAttribute("value", "" + pic.to_rgb(user_state.active_color).g);
			greenbutton.setAttribute("id", "green");
			greenbutton.setAttribute("min", "0");
			greenbutton.setAttribute("max", "255");
			greenbutton.style.borderStyle="solid";
			greenbutton.style.borderColor="green";

			var bluebutton = document.createElement("input");
			bluebutton.setAttribute("type", "number");
			bluebutton.setAttribute("value", "" + pic.to_rgb(user_state.active_color).b);
			bluebutton.setAttribute("id", "blue");
			bluebutton.setAttribute("min", "0");
			bluebutton.setAttribute("max", "255");
			bluebutton.style.borderStyle="solid";
			bluebutton.style.borderColor="blue";

			var colorbutton = document.createElement("input");
			colorbutton.setAttribute("type", "color");
			colorbutton.setAttribute("value", user_state.active_color);
			colorbutton.setAttribute("id", "color");

			var undobutton = document.createElement("input");
			undobutton.setAttribute("type", "button");
			undobutton.setAttribute("value", "Undo");
			undobutton.setAttribute("id", "undobutton");

			var zoombutton = document.createElement("input");
			zoombutton.setAttribute("type", "button");
			zoombutton.setAttribute("value", "Zoom");
			zoombutton.setAttribute("id", "zoombutton");

			var panbutton = document.createElement("input");
			panbutton.setAttribute("type", "button");
			panbutton.setAttribute("value", "Move");
			panbutton.setAttribute("id", "panbutton");


			//Adding the buttons to the toolbar
			toolbar.appendChild(penbutton);
			toolbar.appendChild(redbutton);
			toolbar.appendChild(greenbutton);
			toolbar.appendChild(bluebutton);
			toolbar.appendChild(colorbutton);
			toolbar.appendChild(undobutton);
			toolbar.appendChild(zoombutton);
			toolbar.appendChild(panbutton);

			//Changing color by using the color sliders
			var color_change = function(event) {
				var r = $("#red").val();
				var g = $("#green").val();
				var b = $("#blue").val();

				console.log("r: " + r + " g: " + g + " b: " + b + " hex: " + pic.to_hex(r, g, b));
				pic.set_rgb(r, g, b);
				colorbutton.setAttribute("value", pic.to_hex(r, g, b));
			};

			//Changing color by using the color button
			var color_picker_change = function(event) {
				var c = $("#color").val();
				var rgb = pic.to_rgb(c);
				console.log(c);

				pic.set_hex(c);
				redbutton.value = rgb.r;
				greenbutton.value = rgb.g;
				bluebutton.value = rgb.b;
			};

			//General function for switching tools
			var set_tool = function(tool){
				console.log("now using tool: " + tool.name);
				user_state.active_tool = new tool(user_state);
			};

			//Creating the event listeners for the buttons
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

			//Add the created listeners to their respective buttons
			redbutton.addEventListener("change", color_change);
			greenbutton.addEventListener("change", color_change);
			bluebutton.addEventListener("change", color_change);
			colorbutton.addEventListener("change", color_picker_change);

			console.log("UI LOADED");
		}
	}
});
