//
// app module

var app = (function($) {

  // private properties
  var configMap = {}

  // public properties
  var initModule = function( container ) {
    
    app.shell.initModule( container );
    
  };

  return {
    initModule : initModule
  };
  
}(jQuery));
