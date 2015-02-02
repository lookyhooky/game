//
// app.map module

app.map = (function($) {

  // private properties
  var configMap,
      cube,
      hexGrid;

  configMap = {
    cellSize: 60
  }

  cube = function(q, r) {
    var z = r;
    var x = q;
    var y = q + r;
    return {x: x, y: y, z: z};
  }

  hexGrid = function(max_y) {
    // uses cubic coordinates, returns a Graph of Nodes using axial coordinates
    var diameter = max_y * 2;  // excluding 0,0
    var current_x = null;      // axial q
    var current_z = null;      // axial r
    var current_y = null;      // not returned for axial coordinates

    for (var x = 0; x <= diameter; x++) {
      for (var z = 0; z <= diameter; z++) {
        current_x = x - max_y;
        current_z = z - max_y;
        current_y = Math.abs(cube(current_x, current_z).y);

        if (current_y <= max_y)
          app.grid.addCell(current_x,current_z);
        else
          continue;
      }
    }
  }

  // public properties
  var origin,
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

    // need better way
    app.grid.getElement().setAttribute('transform',
                                       'translate(' + origin.x + ',' + origin.y + ')');
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
    
    app.grid.getElement().setAttribute('transform',
                                       'translate(' + x + ',' + y + ')');
  }

  
  initModule = function( container ) {
    var shellSize;
    shellSize = app.shell.getSize();
    
    setOrigin(shellSize.width / 2, shellSize.height / 2 );

    hexGrid(2);
    container.appendChild(app.grid.getElement());
    
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
