//
// app.draw module
//
// I think to be the most flexible all shapes should be calculated
// on a scale of ten, which can be multiplied by the main app

app.draw = (function($) {

  var configMap = {}

  var initModule = function( $container ) {

  };

  return {
    initModule : initModule
  };
}(jQuery));

// Poly.prototype.getVertex = function(index) {
//   var current = index * 2;   // grab vertices in pairs
//   return [ this.vertices[current], this.vertices[current + 1] ];
// }
