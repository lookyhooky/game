// line.js
// depends on point.js

function Line(point_a, point_b) {

  this.points = [];
  this.points.push(point_a, point_b);
  this.m = slope(point_a, point_b);
  this.b = null;   // y-intercept
  this.a = null;   // x-intercept
  
  if (this.m != 0) {
    this.b = yIntercept(point_a, this.m);
    this.a = xIntercept(this.m, this.b);
  } else if (point_a.x == point_b.x) {
    this.a = point_a.x;   // this seems too simple
  } else if (point_a.y == point_b.y) {
    this.b = yIntercept(point_a, this.m);
  }
  
  function slope(point_a, point_b) {
    var delta = {};
    delta.y = point_b.y - point_a.y;   // rise
    delta.x = point_b.x - point_a.x;   // run

    var value = null;   // the slope
    
    if (delta.y == 0) {
      value = 0;
    } else if (delta.x == 0) {
      value = 0;
    } else  {
      value = delta.y / delta.x;
    }

    return value;
  }

  function yIntercept(point, m) {
    // y-intercept = (0,y)
    return point.y - ( m * point.x );
  }

  function xIntercept(m, b) {
    // x-intercept = (x,0)
    return -b / m;
  }  
}

Line.prototype.f = function(x) {
  // f(x) -- slope intercept form
  // y = mx + b
  if (this.b == null)
    return null;   // y is not a function of a vertical line
  else
    return this.m * x + this.b;
}

Line.prototype.intersect = function(line){
  // plug the f(x) function for 'line' into current line's f(x)
  var x = null;
  var y = null;

  // mx + b = mx + b  solve for x
  x = (this.b - line.b) / line.m - this.m;
  y = this.f(x);

  return new Point(x,y);
}

Line.prototype.draw = function() {
  var line = drawLine(this.points[0].x, this.points[0].y,
                      this.points[1].x, this.points[1].y, "#000", 2);
  svg.appendChild(line);
}
Line.prototype.print = function() {
  console.log("m:", this.m, "b:", this.b, "a:", this.a);
}

// pointSlope -- requires `m' and `point'
// y - point.y = m(x - point.x)
