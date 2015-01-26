function draw(svg) {
  svg.setAttribute("d","M 0 0 L 100 100");
  svg.style.stroke = "#000";
  svg.stokeWidth = "2px";
}

function makeLine(x1, y1, x2, y2, color, w) {
  var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', color);
  line.setAttribute('stroke-width', w);
  return line;
}

function makeCircle(cx, cy, r, fill){
  var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', cx);
  circle.setAttribute('cy', cy);
  circle.setAttribute('r', r);
  circle.setAttribute('fill', fill);
  return circle;
}

function Poly(size, sides, x, y, offset) {
  this.size = size;
  this.sides = sides;
  this.center = {x: x, y: y};         // point
  this.offset = offset || 0;         // radians
  this.vertices = [];
  
  this.fill = rgb(245,245,245);
  this.stroke = rgb(10,10,10);

  this.plot();
  this.draw();
}

Poly.prototype.plot = function() {
  var angle = null;
  
  for (var i = 0; i < this.sides; i++) {
    angle = 2 * Math.PI / this.sides * i + this.offset;
    this.vertices.push((this.size * Math.cos(angle) + this.center.x),
                       (this.size * Math.sin(angle) + this.center.y));
  }  
}

Poly.prototype.draw = function() {

  this.el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

  var style = "fill:lightgray;stroke:black;stroke-width:1"
  var points = "";
  var current = 0;
  
  for (var i = 0; i < this.sides; i++) {
    
    current = this.getVertex(i);
    
    if (i != 0)
      points = points + " "   // add a space between the vertices
    points = points + current[0] + "," + current[1];
  }
  
  this.el.setAttribute('points', points);
  this.el.setAttribute('style', style)
  this.el.className.baseVal = "hexagon";
  
  svg.appendChild(this.el);
}

Poly.prototype.getVertex = function(index) {
  var current = index * 2;   // grab vertices in pairs
  return [ this.vertices[current], this.vertices[current + 1] ];
}

function calcHexDimensions(size, pointy_p) {
  var res = {};

  res.size = size;
  
  if (pointy_p) {
    res.height = size * 2;
    res.vert = res.height * 3/4;
    res.width = ( Math.sqrt(3)/2 ) * res.height;
    res.horiz = res.width;
  } else {
    res.width = size * 2;
    res.horiz = res.width * 3/4;
    res.height = ( Math.sqrt(3)/2 ) * res.width;
    res.vert = res.height;
  }

  return res;
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

    svg.appendChild(xline);
    
  }

  for (var i = stepy; i < 480; i += stepy) {
    
    var yline = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yline.setAttribute('x1', 0);
    yline.setAttribute('y1', i);
    yline.setAttribute('x2', 640);
    yline.setAttribute('y2', i);
    yline.setAttribute('stroke', color);
    yline.setAttribute('stroke-width', w);

    svg.appendChild(yline);
  }
}

function simpleGrid() {
  drawGrid(context, 'darkgray', 10, 10);
}

function clear() {
  context.clearRect(0,0,canvas.width,canvas.height);
}

