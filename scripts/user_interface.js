define(['pen'],function(Pen) {
    return {
        init: function(user_state){
            var ctx = document.getElementById("canvas");
            ctx.width = window.innerWidth/2;
            ctx.height = window.innerHeight/2;
            
            var toolbar = document.getElementById("toolbar");
            var pic = user_state.get_picture();
            ctx.strokeStyle = pic.color;

            var penbutton = document.createElement("input");
            penbutton.setAttribute("type", "button");
            penbutton.setAttribute("value", "Pen");
            penbutton.setAttribute("name", "penbutton");
            toolbar.appendChild(penbutton);

            var redbutton = document.createElement("input");
            redbutton.setAttribute("type", "number");
            redbutton.setAttribute("value", "" + pic.to_rgb(ctx.strokeStyle).r);
            redbutton.setAttribute("name", "red");
            redbutton.setAttribute("min", "0");
            redbutton.setAttribute("max", "255");
            toolbar.appendChild(redbutton);

            var greenbutton = document.createElement("input");
            greenbutton.setAttribute("type", "number");
            greenbutton.setAttribute("value", "" + pic.to_rgb(ctx.strokeStyle).g);
            greenbutton.setAttribute("name", "green");
            greenbutton.setAttribute("min", "0");
            greenbutton.setAttribute("max", "255");
            toolbar.appendChild(greenbutton);

            var bluebutton = document.createElement("input");
            bluebutton.setAttribute("type", "number");
            bluebutton.setAttribute("value", "" + pic.to_rgb(ctx.strokeStyle).b);
            bluebutton.setAttribute("name", "blue");
            bluebutton.setAttribute("min", "0");
            bluebutton.setAttribute("max", "255");
            toolbar.appendChild(bluebutton);

            var colorbutton = document.createElement("input");
            colorbutton.setAttribute("type", "color");
            colorbutton.setAttribute("value", ctx.strokeStyle);
            colorbutton.setAttribute("name", "new_color");
            toolbar.appendChild(colorbutton);


            var set_tool = function(tool){
                console.log("using a pen");
                user_state.active_tool = new tool(user_state);
            };

            var color_change = function(event) {
                var r = redbutton.getAttribute("value");
                var g = greenbutton.getAttribute("value");
                var b = bluebutton.getAttribute("value");

                console.log("r: " + r + " g: " + g + " b: " + b);
                pic.set_rgb(r, g, b);
                colorbutton.setAttribute("value", pic.to_hex(r, g, b));
            };

            var color_picker_change = function(event) {
                var c = colorbutton.getAttribute("value");
                var rgb = pic.to_rgb(c);
                console.log(c);

                pic.set_hex(c);
                redbutton.setAttribute("value", "" + rgb.r);
                greenbutton.setAttribute("value", "" + rgb.g);
                bluebutton.setAttribute("value", "" + rgb.b);
            };

            penbutton.addEventListener("click", function(event) {
                set_tool(Pen);
            });

            redbutton.addEventListener("change", color_change);
            greenbutton.addEventListener("change", color_change);
            bluebutton.addEventListener("change", color_change);
            colorbutton.addEventListener("change", color_picker_change);
            
            console.log("UI LOADED");
        }
    }
});
