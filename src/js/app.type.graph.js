//
// app.type.Graph module
//

app.type.Graph = (function() {

  // private properties

  var configMap = {}

  // public properties

  function Graph() {
    // 'origin' the center point of q:0,r:0

    this.nodes = {};

    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    var neighbors = [
      [1,0],[1,-1],[0,-1],
      [-1,0],[-1,1],[0,1]
    ];

    this.hasNeigbors= function(q, r) {
      // need to clean this up to be more readable ***
      // but at the moment it works. It returns an map of true or false values
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

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        this.nodes[[i,j]] = new app.type.Node(i,j);
        this.nodes[[-i,-j]] = new app.type.Node(-i,-j);
        this.nodes[[i,-j]] = new app.type.Node(i,-j);
        this.nodes[[-i,j]] = new app.type.Node(-i,j)
      }
    }

    for (var node in this.nodes) {
      this.el.appendChild(this.nodes[node].el);
    }

  }

  return Graph;

}());

// Poly.prototype.getVertex = function(index) {
//   var current = index * 2;   // grab vertices in pairs
//   return [ this.vertices[current], this.vertices[current + 1] ];
// }
