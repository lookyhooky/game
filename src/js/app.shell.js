//
// app.shell module

app.shell = (function($) {

  var configMap = {
    width: 800,
    height: 600
  }

  // public properties
  
  var surface = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); 

  surface.setAttribute('id', 'surface');
  surface.setAttribute('width', configMap.width);
  surface.setAttribute('height', configMap.height);
  
  var initModule = function( container ) {
    container.appendChild(surface);
    app.map.initModule(surface);
  };

  return {
    initModule : initModule
  };
  
}(jQuery));
