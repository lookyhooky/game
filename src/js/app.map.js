//
// app.map module

app.map = (function($) {
  
  var configMap = {
    cellSize: 60
  }

  // public properties
  var grid,
      origin,
      offset,
      getOrigin,
      setOrigin,
      getOffset,
      setOffset,
      initModule;

  origin = { x: 0, y: 0 };
  offset = { x: 0, y: 0 };
  
  getOrigin = function() {
    return origin;
  };

  setOrigin = function(originX, originY) {
    
    origin.x = originX;
    origin.y = originY;
    
    grid.el.setAttribute('transform', 'translate(' + origin.x + ',' + origin.y + ')');
  }

  getOffset = function() {
    return offset;
  }
  
  setOffset = function(offsetX, offsetY) {
    var x, y;

    offset.x = offsetX;
    offset.y = offsetY;

    x = origin.x + offset.x;
    y = origin.y + offset.y;
    
    grid.el.setAttribute('transform',
                         'translate(' + x + ',' + y + ')');
  }
  
  initModule = function( container ) {
    var shellSize;
    shellSize = app.shell.getSize();
    
    grid = new app.type.Grid(3);
    
    setOrigin(shellSize.width / 2, shellSize.height / 2 );
    
    container.appendChild(grid.el);
    
  };

  return {
    initModule : initModule,
    getOrigin : getOrigin,
    setOrigin : setOrigin,
    setOffset : setOffset,
    getOffset : getOffset,
    cellSize : configMap.cellSize
  };
  
}(jQuery));
