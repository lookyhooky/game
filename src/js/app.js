//
// app module

var app = (function($) {

  var configMap = {}

  // public properties
  var scale = 4.5;
  
  var initModule = function( container ) {
    
    app.shell.initModule( container );
    
  };

  return {
    initModule : initModule,
    scale : scale
  };
  
}(jQuery));
