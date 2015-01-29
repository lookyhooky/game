//
// app.type.Graph module
//

app.type.Graph = (function() {

  // private properties

  var configMap = {}

  // public properties

  function Graph() {

    this.nodes = {};

    this.el = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.el.setAttribute('id', 'graph');
    
    var neighbors = [
      [1,0],[1,-1],[0,-1],
      [-1,0],[-1,1],[0,1]
    ];

    this.hasNeigbors= function(q, r) {
      // need to clean this up to be more readable ***
      // but at the moment it works. It returns an map of true or false values
      var res = {};
      for (var i = 0; i < neighbors.length; i++) {
        if (this.nodes[[q+neighbors[i][0],r+neighbors[i][1]]])
          res[[q+neighbors[i][0],r+neighbors[i][1]]] = true;
        else
          res[[q+neighbors[i][0],r+neighbors[i][1]]] = false;
      }
      return res;
    }

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
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
