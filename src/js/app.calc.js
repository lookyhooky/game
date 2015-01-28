//
// app.calc module
//
// I think to be the most flexible all shapes should be calculated
// on a scale of ten, which can be multiplied by the main app

app.calc = (function($) {

  var scale = 10;
  
  var isoPoly = function(sides, offset) {

    var vertices = [];
    
    var angle = null;
    var offset = offset || 0;

    for (var i = 0; i < sides; i++) {
      angle = 2 * Math.PI / sides * i + offset;
      vertices.push((scale * Math.cos(angle)),
                    (scale * Math.sin(angle)));
    }
    
    return vertices;
  }

  var isoHexDimensions = function(pointy_p) {
    var res = {};

    if (pointy_p) {
      res.height = scale * 2;
      res.vert = res.height * 3/4;
      res.width = ( Math.sqrt(3)/2 ) * res.height;
      res.horiz = res.width;
    } else {
      res.width = scale * 2;
      res.horiz = res.width * 3/4;
      res.height = ( Math.sqrt(3)/2 ) * res.width;
      res.vert = res.height;
    }

    return res;
  }
  
  var configMap = {}

  var initModule = function( $container ) {

  };

  return {
    initModule : initModule,
    isoPoly : isoPoly,
    isoHexDimensions : isoHexDimensions
  };
}(jQuery));

// Poly.prototype.getVertex = function(index) {
//   var current = index * 2;   // grab vertices in pairs
//   return [ this.vertices[current], this.vertices[current + 1] ];
// }
