//
// app.shell module

app.shell = (function($) {

  var configMap = {
    width: 640,
    height: 480
  }

  // public properties
  
  var surface = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); 

  surface.setAttribute('id', 'surface');
  surface.setAttribute('width', configMap.width);
  surface.setAttribute('height', configMap.height);
  
  var initModule = function( $container ) {
    $container.append(surface);
    
    app.surface = $(surface);

    app.map.initModule(app.surface);
  };

  return {
    initModule : initModule
  };
  
}(jQuery));
