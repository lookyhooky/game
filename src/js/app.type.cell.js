//
// app.type.Cell module
//

app.type.Cell = (function() {

  // private properties
  var configMap = {};   // would like to come up with different solution
  var hexAttr = app.calc.isoHexDimensions(app.map.cellSize, true);
  var vertices = app.calc.isoPoly(app.map.cellSize, 6);

  // public properties
  function Cell(q, r) {

    this.q = q;
    this.r = r;
    this.el = app.draw.svg('g', {class: "cellGroup"});

    var origin,
        coords,
        svgPath,
        textContent,
        pathElement,
        textElement;

    // calculate the origin of the Cell based on (q,r)
    origin = app.calc.isoHexOrigin(q, r, hexAttr.horiz, hexAttr.vert);

    // calculate the coords of each vertex based on origin
    coords = app.calc.translateVertices(vertices, origin.x, origin.y)

    // create a svgPath string from the vertices
    svgPath = app.draw.verticesToSvgPath(coords);

    textContent = this.q + ',' + this.r;

    pathElement = app.draw.svg('path', {class: 'cell',
                                        d: svgPath});

    textElement = app.draw.svg('text', {x: origin.x,
                                        y: origin.y + 3,
                                        style: "text-anchor: middle;font-size:12px",
                                        textContent: textContent});

    this.el.addEventListener('mouseover', function() {
      pathElement.setAttribute('style', 'fill:salmon');
    });

    this.el.addEventListener('mouseout', function() {
      pathElement.setAttribute('style', '');
    });

    this.el.addEventListener('mousedown', function() {
      pathElement.setAttribute('style', 'fill:white');
    });

    this.el.addEventListener('mouseup', function() {
      pathElement.setAttribute('style', 'fill:salmon');
    });
    
    this.el.appendChild(pathElement);
    this.el.appendChild(textElement);
  }

  return Cell
;

}());
