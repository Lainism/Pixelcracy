define([], function() {
    return Util;
});

Util = {

    //data translation

	to_rgb: function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
        } : null;
    },
    to_hex: function(r, g, b) {
	    return "#" + Util.component_to_hex(r) + Util.component_to_hex(g) + Util.component_to_hex(b);
	},
    component_to_hex: function(c) {
        var hex = parseInt(c).toString(16);

        return hex.length == 1 ? "0" + hex : hex;
    },

    //elementary drawing stuff of individual pixels

    draw_pixel_to_context: function(context,x,y,color) {
        context.fillStyle = color;
        context.beginPath();
        context.rect(x, y, 1, 1);
        context.closePath();
        context.fill();
    },
    draw_pixel_to_layer: function(layer,x,y,color) {
        layer.pixelarray[x][y] = color;
        Util.draw_pixel_to_context(layer.cachedcontext,x,y,color);

        layer.parentpicture.redraw();
    },

    //the more advanced drawing stuff
    //use draw_pixel_to_layer as the elementary operation
    /*

    */
};

