//
// app module ** depends on dice module

var app = (function($) {

  var configMap = {}

  // public properties
  var type = {}; // a map of constructors
  var scale = 3.5;
  
  var initModule = function( $container ) {
    app.shell.initModule( $container );
  };

  return {
    initModule : initModule,
    type : type,
    scale : scale
  };
  
}(jQuery));
