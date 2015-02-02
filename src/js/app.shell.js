//
// app.shell module

app.shell = (function($) {

  // private properties
  var configMap = {

  }

  // public properties
  var width,
      height,
      surface,
      getSize,
      setSize,
      initModule;

  width = null;
  height = null;

  getSize = function() {
    return {width: width, height: height};
  }

  setSize = function(updateWidth, updateHeight) {
    width = updateWidth;
    height = updateHeight;

    surface.setAttribute('width', width);
    surface.setAttribute('height', height);
  };

  initModule = function( container ) {

    width = window.innerWidth;
    height = window.innerHeight;
    
    surface = app.draw.svg('svg', {id: 'surface',
                                   width: width,
                                   height: height});
    
    container.appendChild(surface);

    // initialize modules
    app.grid.initModule();
    app.map.initModule(surface);
    app.events.initModule(surface);

  };

  return {
    initModule : initModule,
    getSize : getSize,
    setSize : setSize
  };
  
}(jQuery));
