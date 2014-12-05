/*
*  Util defines a list of helper functions,
*  most of them having to do with the low level implementation
*/

define([], function() {
    return Util;
});

Util = {

    // Translating the colors from hex to rgb and rgb to hex
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

    // Drawing invidual pixels from layers to the context
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

    // Bresenham's line algorithm to connect the dots to lines
    bresenham: function(layer, x0, x1, y0, y1, color, redraw_after) {
        var x = x0;
        var y = y0;
        var deltax = Math.abs(x1 - x0);
        var deltay = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = deltax - deltay;

        //draw the initial point
        Util.draw_pixel_to_layer(layer, x, y, color, false);

        //given values must be integers or this comparison might fail
        while (!((x == x1) && (y == y1))) {
            var e2 = err << 1;
            if (e2 > -deltay) {
                err -= deltay;
                x+= sx;
            } else if (e2 < deltax) {
                err += deltax;
                y += sy;
            }

            //draw the pixel
            Util.draw_pixel_to_layer(layer, x, y, color, false);
        }

        //set line for redraw
        if (redraw_after) {layer.parentpicture.redraw();}
    },

    // Various tool implementations
    draw_circle: function(layer,x,y,r,color,redraw_after) {
        // Using midpoint circle algorithm
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
    draw_flood_fill: function(layer,x,y,color,redraw_after) {
        pixelstack = [[x,y]]
        source_color = layer.pixelarray[x][y];
        while (pixelstack.length != 0){
            var p = pixelstack.pop();
            var x = p[0];
            var y = p[1];

            if (x<0 || x>=layer.size[0]){continue;}
            if (y<0 || y>=layer.size[1]){continue;}
            if (layer.pixelarray[x][y] != source_color) {continue;};

            layer.pixelarray[x][y] = color;
            pixelstack.push([x,y+1])
            pixelstack.push([x+1,y])
            pixelstack.push([x,y-1])
            pixelstack.push([x-1,y])
        }
        layer.cached = false;
        if (redraw_after) {layer.parentpicture.redraw();}
    }
};

