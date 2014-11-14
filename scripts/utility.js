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
    draw_pixel_to_layer: function(layer,x,y,color,redraw_after) {
        if (x<0 || x>=layer.size[0]){return;}
        if (y<0 || y>=layer.size[1]){return;}
        layer.pixelarray[x][y] = color;
        Util.draw_pixel_to_context(layer.cachedcontext,x,y,color);

        if (redraw_after){layer.parentpicture.redraw();}
    },

    //the more advanced drawing stuff
    //use draw_pixel_to_layer as the elementary operation

    draw_circle: function(layer,x,y,r,color,redraw_after) {
        //midpoint circle algorithm
        var xx = r;
        var yy = 0;
        var x0 = x;
        var y0 = y;
        var rError = 1-r;

        while (xx >= yy) {
            Util.draw_pixel_to_layer(layer, xx+x0, yy+y0,color,false);
            Util.draw_pixel_to_layer(layer,-xx+x0, yy+y0,color,false);
            Util.draw_pixel_to_layer(layer, xx+x0,-yy+y0,color,false);
            Util.draw_pixel_to_layer(layer,-xx+x0,-yy+y0,color,false);
            Util.draw_pixel_to_layer(layer, yy+x0, xx+y0,color,false);
            Util.draw_pixel_to_layer(layer,-yy+x0, xx+y0,color,false);
            Util.draw_pixel_to_layer(layer, yy+x0,-xx+y0,color,false);
            Util.draw_pixel_to_layer(layer,-yy+x0,-xx+y0,color,false);
            yy += 1;
            if (rError < 0) {
                rError += 2*yy + 1;
            } else {
                xx -= 1;
                rError += 2*(yy - xx + 1);
            }
        }
        if (redraw_after) {layer.parentpicture.redraw();}
    },

};

