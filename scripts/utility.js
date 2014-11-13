define([], function() {

    return {
		to_rgb: function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
            } : null;
        },
        to_hex: function(r, g, b) {
		    return "#" + component_to_hex(r) + component_to_hex(g) + component_to_hex(b);
		},
        component_to_hex: function(c) {
		    var hex = parseInt(c).toString(16);

		    return hex.length == 1 ? "0" + hex : hex;
		},
        draw_pixel: function(context,color,x,y) {
            context.fillStyle = color;
            context.beginPath();
            context.rect(x, y, 1, 1);
            context.closePath();
            context.fill();
        },




    };
	
});
