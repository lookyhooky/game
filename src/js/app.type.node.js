//
// app.type.Node module
//

app.type.Node = (function() {

  // private properties

  var configMap = {};

  var hexDimentions = app.calc.isoHexDimensions(true);
  var horiz = hexDimentions.horiz * app.scale;
  var vert = hexDimentions.vert * app.scale;

  // public properties

  function Node(q, r) {

    this.q = q;
    this.r = r;

    this.x = 0;
    this.y = 0;

    this.x = this.q * horiz + this.r * horiz / 2 + app.map.origin.x;
    this.y = this.r * vert + app.map.origin.y; /// using temp var map.origin ****

    this.vertices = app.calc.isoPoly(6, Math.PI / 6);

    this.coords = [];

    // this is a botch job
    for (var i = 0; i < this.vertices.length; i++) {
      if (i % 2 == 0) // this.points[i] is x
        this.coords[i] = this.vertices[i] * app.scale + this.x;
      else
        this.coords[i] = this.vertices[i] * app.scale + this.y;
    }

    this.init();
  }

  Node.prototype.getVertex = function(index) {
    var current = index * 2;   // grab vertices in pairs
    return [ this.coords[current], this.coords[current + 1] ];
  }

  Node.prototype.init = function() {
    
    this.el = document.createElementNS('http://www.w3.org/2000/svg',
                                       'g');
    this.polyEl = document.createElementNS('http://www.w3.org/2000/svg',
                                           'polygon');
    this.textEl = document.createElementNS('http://www.w3.org/2000/svg',
                                           'text');
    this.svg = {};
    this.svg.points = "";

    this.text = {};
    this.text.x = this.x;
    this.text.y = this.y;
    this.text.textContent = this.q + ',' + this.r;

    this.polyEl.className.baseVal = "hexagon";

    var current = 0;

    for (var i = 0; i < 6; i++) {

      current = this.getVertex(i);

      if (i != 0)
        // add a space between the vertices
        this.svg.points = this.svg.points + " ";
      this.svg.points = this.svg.points + current[0] + "," + current[1];
    }

    this.polyEl.setAttribute('points', this.svg.points);

    this.textEl.setAttribute('x', this.text.x);
    this.textEl.setAttribute('y', this.text.y + 4);
    this.textEl.setAttribute('style', "text-anchor: middle;font-size:12px")
    this.textEl.textContent = this.text.textContent;

    this.el.appendChild(this.polyEl);
    this.el.appendChild(this.textEl);

    this.el.setAttribute('id', this.q + ',' + this.r);
  }

  return Node;

}());
