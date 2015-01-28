var s = $("#surface");

function Poly(size, sides, x, y, offset) {
  // Poly constructor
  this.size = size;
  this.sides = sides;
  this.center = {x: x, y: y};
  this.offset = offset || 0;   // radians
  this.vertices = [];

  this.plot();
}

Poly.prototype.plot = function() {
  // plot the vertices of the polygon
  var angle = null;

  for (var i = 0; i < this.sides; i++) {
    angle = 2 * Math.PI / this.sides * i + this.offset;
    this.vertices.push((this.size * Math.cos(angle) + this.center.x),
                       (this.size * Math.sin(angle) + this.center.y));
  }
}

Poly.prototype.getVertex = function(index) {
  var current = index * 2;   // grab vertices in pairs
  return [ this.vertices[current], this.vertices[current + 1] ];
}

function calcHexDimensions(scale, pointy_p) {

  var res = {};

  if (pointy_p) {
    res.height = scale * 2;
    res.vert = res.height * 3/4;
    res.width = ( Math.sqrt(3)/2 ) * res.height;
    res.horiz = res.width;
  } else {
    res.width = scale * 2;
    res.horiz = res.width * 3/4;
    res.height = ( Math.sqrt(3)/2 ) * res.width;
    res.vert = res.height;
  }

  return res;
}

function Graph(x, y) {
  // 'origin' the center point of q:0,r:0
  // I want this function to take a map object and draw them by finding the
  // neighbors.

  var origin = {x: x, y: y}
  
  this.nodes = {};

  this.el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
  var scale = 35;
  var vert = calcHexDimensions(scale, true).vert;
  var horiz = calcHexDimensions(scale, true).horiz;

  var neighbors = [
    [1,0],[1,-1],[0,-1],
    [-1,0],[-1,1],[0,1]
  ];

  this.hasNeigbors= function(q, r) {
    var res = {};
    for (var i = 0; i < neighbors.length; i++) {
      console.log(neighbors[i][0], neighbors[i][1])
      if (this.nodes[[q+neighbors[i][0],r+neighbors[i][1]]])
        res[[q+neighbors[i][0],r+neighbors[i][1]]] = true;
      else
        res[[q+neighbors[i][0],r+neighbors[i][1]]] = false;
      
    }
    return res;
  }

  var Node = function(q,r) {
    // A hexagon node of a graph
    var x = y = null;    
    if (q % 2 == 0)
      x = q * horiz + origin.x;
    else
      x = q * horiz + origin.x + horiz / 2;
    y = r * vert + origin.y;

    Poly.call(this, scale, 6, x, y, Math.PI / 6)
    this.init();
  }

  Node.prototype = Object.create(Poly.prototype, {
    construtor: {
      configurable: true,
      enumerable: true,
      value: Node,
      writeable: true
    }
  });

  Node.prototype.init = function() {
    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    this.svg = {};
    this.svg.points = "";
    this.el.className.baseVal = "hexagon";
    
    var current = 0;

    for (var i = 0; i < this.sides; i++) {

      current = this.getVertex(i);

      if (i != 0)
        // add a space between the vertices
        this.svg.points = this.svg.points + " ";
      this.svg.points = this.svg.points + current[0] + "," + current[1];
    }

    this.el.setAttribute('points', this.svg.points);
  }
  
  this.nodes["0,0"] = new Node(0,0);
  this.nodes["0,1"] = new Node(0,1);
  this.nodes["-1,1"] = new Node(-1,1);
  this.nodes["-1,-1"] = new Node(-1,-1);
  this.nodes["0,-1"] = new Node(0,-1);

  for (var node in this.nodes) {
    this.el.appendChild(this.nodes[node].el);
  }
  // for (var i = 0; i < q; i++) {

  //   for (var j = 0; j < r; j++) {

  //   }
  // }

  s.append(this.el);
}

function drawGrid(color, stepx, stepy) {
  var strokeStyle = color;
  var w = 1;

  for (var i = stepx; i < 640; i += stepx) {

    var xline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xline.setAttribute('x1', i);
    xline.setAttribute('y1', 0);
    xline.setAttribute('x2', i);
    xline.setAttribute('y2', 480);
    xline.setAttribute('stroke', color);
    xline.setAttribute('stroke-width', w);

    surface.appendChild(xline);

  }

  for (var i = stepy; i < 480; i += stepy) {

    var yline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yline.setAttribute('x1', 0);
    yline.setAttribute('y1', i);
    yline.setAttribute('x2', 640);
    yline.setAttribute('y2', i);
    yline.setAttribute('stroke', color);
    yline.setAttribute('stroke-width', w);

    surface.appendChild(yline);
  }
}

function simpleGrid() {
  drawGrid('lightgray', 10, 10);
}
