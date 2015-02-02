//
// app.type.grid module
//

app.grid = (function() {

  // private properties
  var configMap,
      cells,
      gridElement,
      cube;

  configMap = {
    dimensions: null,
    vertices: null
  };
  
  cells = {};

  gridElement = app.draw.svg('g', {id: 'grid'});

  cube = function(q, r) {
      var z = r;
      var x = q;
      var y = q + r;
      return {x: x, y: y, z: z};
  }
  
  // private constructors
  var Cell;
  
  Cell = function(q, r) {

    this.q = q;
    this.r = r;
    
    // private properties of Cell
    var cellElement,
        origin,
        coords,
        svgPath,
        fillColor,
        strokeColor,
        mouseOver,
        textContent,
        pathElement,
        textElement;

    cellElement = app.draw.svg('g', {class: "cellGroup"});
    
    // calculate the origin of the Cell based on (q,r)
    origin = app.calc.isoHexOrigin(q, r,
                                   configMap.dimensions.horiz,
                                   configMap.dimensions.vert);

    // calculate the coords of each vertex based on origin
    coords = app.calc.translateVertices(configMap.vertices, origin.x, origin.y)

    // create a svgPath string from the vertices
    svgPath = app.draw.verticesToSvgPath(coords);

    fillColor = new app.util.Color(200,.5,.75);
    strokeColor = new app.util.Color(0,0,0);
    
    textContent = this.q + ',' + this.r;

    pathElement = app.draw.svg('path', {class: 'cellsss',
                                        d: svgPath,
                                        fill: fillColor.stringify(),
                                        stroke: strokeColor.stringify()});

    textElement = app.draw.svg('text', {x: origin.x,
                                        y: origin.y + 3,
                                        style: "text-anchor: middle;font-size:12px",
                                        textContent: textContent});

    // Cell events
    cellElement.addEventListener('mouseover', function() {
      mouseOver = true;
      var base = fillColor.get('l');
      var goal = .65;
      
      var adjustColor = function() {
        if (base <= goal || mouseOver == false)
          clearInterval(interval);
        base = base - .01
        fillColor.set('l', base);
        pathElement.setAttribute('fill', fillColor.stringify());
      };
      
      var interval = setInterval(adjustColor, 50);
    });

    cellElement.addEventListener('mouseout', function() {
      mouseOver = false;
      var base = fillColor.get('l');
      var goal = .75;
      
      var adjustColor = function() {
        if (base >= goal)
          clearInterval(interval);
        base = base + .01
        fillColor.set('l', base);
        pathElement.setAttribute('fill', fillColor.stringify());
      };
      
      var interval = setInterval(adjustColor, 50);
    });

    cellElement.addEventListener('mousedown', function() {
      // pathElement.setAttribute('style', 'fill:white');
    });

    cellElement.addEventListener('mouseup', function() {
      // pathElement.setAttribute('style', 'fill:salmon');
    });
    
    cellElement.appendChild(pathElement);
    cellElement.appendChild(textElement);

    // public properties of Cell
    var getElement;

    getElement = function() {
      return cellElement;
    };

    return {
      getElement : getElement
    }
  }
  
  // public properties of grid
  var addCell,
      removeCell,
      hasNeigbors,
      getElement,
      initModule;

  addCell = function(q, r) {
    if (cells[[q,r]] == null) {
      cells[[q,r]] = new Cell(q, r);
      gridElement.appendChild(cells[[q,r]].getElement());
    } else {
      console.log('Cannot addCell() to grid if cells[[q,r]] exists');
    }
  };

  removeCell = function(q, r) {
    // will use element.removeChild(child)
    if (cells[[q,r]] != null) {
      gridElement.removeChild(cells[[q,r]].getElement());
      delete cells[[q,r]];
    } else {
      console.log('Cannot removeCell() from grid if cells[[q,r]] does not exists');
    }
  };
  
  hasNeigbors = function(q, r) {
    // need to clean this up to be more readable ***
    var res = {};

    var n = [   //neighbors
      [1,0],[1,-1],[0,-1],
      [-1,0],[-1,1],[0,1]
    ];
    
    for (var i = 0; i < n.length; i++) {
      if (cells[[q+n[i][0],r+n[i][1]]])
        res[[q+n[i][0],r+n[i][1]]] = true;
      else
        res[[q+n[i][0],r+n[i][1]]] = false;
    }
    
    return res;
  };

  getElement = function() {
    return gridElement;
  };

  initModule = function() {
    configMap.dimensions = app.calc.isoHexDimensions(app.map.cellSize, true);
    configMap.vertices = app.calc.isoPoly(app.map.cellSize, 6);
  }

  return {
    addCell : addCell,
    removeCell : removeCell,
    hasNeigbors : hasNeigbors,
    getElement : getElement,
    initModule : initModule
  };

}());
