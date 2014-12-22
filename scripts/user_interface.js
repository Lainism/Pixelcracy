define(['tools/pen','tools/bucket','tools/zoom', 'jquery','utility'],function(Pen, Bucket, Zoom, $, Util) {
	return {
		init: function(user_state){
			/*
			*  This file defines an UI for the tools in the toolbar and their inputs.
			*  For the interaction with the canvas, see input.js
			*/

			var toolbar = document.getElementById("toolbar");
			var pic = user_state.get_picture();

			// Defining the buttons and the input fields on the toolbar

			var penbutton = document.getElementById("pen");
			penbutton.setAttribute("type", "button");
			penbutton.setAttribute("value", "Pen");
			penbutton.setAttribute("name", "penbutton");

			var bucketbutton = document.getElementById("bucket");
			bucketbutton.setAttribute("type", "button");
			bucketbutton.setAttribute("value", "Bucket");
			bucketbutton.setAttribute("name", "bucketbutton");

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

			var redobutton = document.getElementById("redo");
			redobutton.setAttribute("type", "button");
			redobutton.setAttribute("value", "Redo");
			redobutton.setAttribute("name", "redobutton");

			// Layer select

			var layer_number = user_state.layer_count;
			var layermenu = document.getElementById("layers");

			for (var i = 0; i < layer_number; i++) {
				var layeroption = document.createElement("OPTION");
				layeroption.setAttribute("value", i.toString());
				var optionText = document.createTextNode("Layer " + i.toString());
				layeroption.appendChild(optionText);
				layermenu.appendChild(layeroption);
			}

			// Layer options
			var lrenamebutton = document.getElementById("lrename");
			lrenamebutton.setAttribute("type", "button");
			lrenamebutton.setAttribute("value", "Rename");
			lrenamebutton.setAttribute("name", "lrename");

			var lmoveupbutton = document.getElementById("lmoveup");
			lmoveupbutton.setAttribute("type", "button");
			lmoveupbutton.setAttribute("value", "Move up");
			lmoveupbutton.setAttribute("name", "lmoveup");

			var lmovedownbutton = document.getElementById("lmovedown");
			lmovedownbutton.setAttribute("type", "button");
			lmovedownbutton.setAttribute("value", "Move down");
			lmovedownbutton.setAttribute("name", "lmovedown");

			var lopacitybutton = document.getElementById("lopacity");
			lopacitybutton.setAttribute("type", "number");
			lopacitybutton.setAttribute("value", "" + pic.layers[user_state.active_layer].opacity);
			lopacitybutton.setAttribute("name", "lopacity");
			lopacitybutton.setAttribute("min", "0");
			lopacitybutton.setAttribute("max", "100");

			// Helper function to changing the tools

			var set_tool = function(tool){
			    console.log("now using tool: " + tool.name);
			    user_state.active_tool = new tool(user_state);
			};

			//Changing layer

			var layer_change = function(event) {
				var opacity = pic.layers[user_state.active_layer].opacity;
				user_state.active_layer = layermenu.selectedIndex;
				lopacitybutton.value = opacity;
			}

			// Renaming layer

			var layer_rename = function(event) {
				var poprename = prompt("Rename the layer as...","");
				if (poprename != null) {
					layermenu.options[layermenu.selectedIndex].text = poprename;
				}
			}

			// Moving layer compared to the other layers

			var layer_move = function(direction) {
				var layer_list = pic.layers;
				var i = layermenu.selectedIndex;
				var current_layer = layer_list[i];
				var current_option = layermenu.options[i];

				// Return if index is out of bounds
				if ((i == 0 && direction < 0) || (i == (user_state.layer_count - 1) && direction > 0)) { return; }

				layer_list[i] = layer_list[i + direction];
				layer_list[i + direction] = current_layer;

				var options = $('#layers option');
				if (direction > 0) {
					$( options[ i ] ).insertAfter( $( options[ (i + direction) ] ) );
				} else {
					$( options[ i ] ).insertBefore( $( options[ (i + direction) ] ) );
				}

				user_state.active_layer = layermenu.selectedIndex;

				pic.redraw();
			}

			// Changing layer opacity

			var layer_opacity_change = function(event) {
				var o = $("#lopacity").val();
				user_state.get_picture().layers[user_state.active_layer].opacity = o;
				pic.redraw();
			}

			// Changing the color by using the rgb input fields

			var color_change = function(event) {
				var r = $("#red").val();
				var g = $("#green").val();
				var b = $("#blue").val();

				console.log("r: " + r + " g: " + g + " b: " + b + " hex: " + Util.to_hex(r, g, b));
				user_state.set_rgb(r, g, b);
				colorbutton.setAttribute("value", Util.to_hex(r, g, b));
			};

			// Changing the color by using the color picker button

			var color_picker_change = function(event) {
				var c = $("#color").val();
				var rgb = Util.to_rgb(c);
				console.log(c);

				user_state.set_hex(c);
				redbutton.value = rgb.r;
				greenbutton.value = rgb.g;
				bluebutton.value = rgb.b;
			};

			// Changing to another tool

			var zoomtoolchange = function(event) {
				set_tool(Zoom);
			}

			var pantoolchange = function(event) {
				//set_tool(Pan);
			};

			// Adding event listeners to the buttons

			penbutton.addEventListener("click", function(event) { set_tool(Pen); });
			bucketbutton.addEventListener("click", function(event) { set_tool(Bucket); });
			zoombutton.addEventListener("click", function(event) { set_tool(Zoom); });
			panbutton.addEventListener("click", function(event) { set_tool(Pan); });
			undobutton.addEventListener("click", function(event) { user_state.active_picture.undo(); });
			redobutton.addEventListener("click", function(event) { user_state.active_picture.redo(); });
			redbutton.addEventListener("change", color_change);
			greenbutton.addEventListener("change", color_change);
			bluebutton.addEventListener("change", color_change);
			colorbutton.addEventListener("change", color_picker_change);
			layermenu.addEventListener("change", layer_change);
			lrenamebutton.addEventListener("click", layer_rename);
			lmoveupbutton.addEventListener("click", function(event) { layer_move(1); });
			lmovedownbutton.addEventListener("click", function(event) { layer_move(-1); });
			lopacitybutton.addEventListener("change", layer_opacity_change);

			console.log("UI LOADED");
		}
	}
});
