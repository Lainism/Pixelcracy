define(['pen'],function(Pen) {
    return {
        init: function(user_state){
            var ctx = document.getElementById("canvas");
            ctx.width = window.innerWidth;
            ctx.height = window.innerHeight;
            
            var set_tool = function(tool){
                console.log("using a pen");
                user_state.active_tool = new tool(user_state);
            };
            
            var toolbar = document.getElementById("toolbar");
            var penbutton = document.createElement("input");
            penbutton.setAttribute("type", "button");
            penbutton.setAttribute("value", "Pen");
            penbutton.setAttribute("name", "penbutton");
            toolbar.appendChild(penbutton);
            
            toolbar.addEventListener("click", function(event) {
                set_tool(Pen);
            });


            
            console.log("UI LOADED");
        }
    }
});
