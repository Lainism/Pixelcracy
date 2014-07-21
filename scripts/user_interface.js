define(function() {
    return {
        init: function(){
            var ctx = document.getElementById("canvas");
            ctx.width = window.innerWidth;
            ctx.height = window.innerHeight;
            console.log("UI LOADED");
        }
    }
});
