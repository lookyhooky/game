//
// app.map module

app.map = (function($) {
  
  var configMap = {
    width: 640,
    height: 480
  }

  // public properties

  var origin = { x: configMap.width / 2, y: configMap.height / 2 };

  var initModule = function( container ) {
    this.graph = new app.type.Graph();
    container.appendChild(this.graph.el);
  };

  return {
    initModule : initModule,
    origin: origin
  };
  
}(jQuery));
