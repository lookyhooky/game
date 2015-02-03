//
// app.calc module
//
// I think to be the most flexible all shapes should be calculated
// on a scale of ten, which can be multiplied by the main app

app.calc = (function($) {

  var isoPoly = function(radius, sides, offset) {

    var vertices = [];

    var angle = null;

    for (var i = 0; i < sides; i++) {
      angle = 2 * Math.PI / sides * i + (offset || Math.PI / sides);
      vertices.push((radius * Math.cos(angle)),
                    (radius * Math.sin(angle)));
    }

    return vertices;
  }

  var isoHexDimensions = function(radius, pointy_p) {
    var res = {};

    if (pointy_p) {
      res.height = radius * 2;
      res.vert = res.height * 3/4;
      res.width = ( Math.sqrt(3)/2 ) * res.height;
      res.horiz = res.width;
    } else {
      res.width = radius * 2;
      res.horiz = res.width * 3/4;
      res.height = ( Math.sqrt(3)/2 ) * res.width;
      res.vert = res.height;
    }

    return res;
  }

  var isoHexOrigin = function(q, r, horiz, vert) {
      return {
        x: q * horiz + r * horiz / 2,
        y: r * vert
      }
  };

  var mapVertices = function(array, func) {
    // pass func (x,y) pairs, it returns an array [x,y] to current;
    var res = [];
    var x = null;
    var y = null;
    
    for (var i = 0; i < array.length; i += 2) {
      x = array[i];
      y = array[i+1];
      res = res.concat( func(x, y) );
    }
    
    return res;
  };

  var reduceVertices = function(array, memo, func) {
    // pass func (x,y) pairs, memo and index
    var x = null;
    var y = null;

    for (var i = 0; i < array.length; i += 2) {
      x = array[i];
      y = array[i+1];
      memo = func(memo, x, y, i);
    }

    return memo;
  }

  var translateVertices = function(array, x, y) {
    return mapVertices(array, function(current_x, current_y) {
      return [current_x + x, current_y + y];
    });
  }

  var scaleVertices = function(array, scale) {
    return mapVertices(array, function(current_x, current_y) {
      return [current_x * scale, current_y * scale];
    });
  }

  var initModule = function( $container ) {

  };

  return {
    initModule : initModule,
    isoPoly : isoPoly,
    isoHexDimensions : isoHexDimensions,
    isoHexOrigin : isoHexOrigin,
    mapVertices : mapVertices,
    reduceVertices : reduceVertices,
    translateVertices : translateVertices,
    scaleVertices : scaleVertices
  };
  
}(jQuery));
