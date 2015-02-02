//
// app.type.Grid module
//

app.type.Grid = (function() {

  // private properties
  var configMap = {}

  // public properties
  function Grid(max_y) {

    this.cells = {};

    this.el = app.draw.svg('g', {id: 'grid'});
    
    this.hasNeigbors= function(q, r) {
      // need to clean this up to be more readable ***
      // but at the moment it works. It returns an map of true or false values
      var res = {};

      var n = [                 //neighbors
        [1,0],[1,-1],[0,-1],
        [-1,0],[-1,1],[0,1]
      ];
      
      for (var i = 0; i < n.length; i++) {
        if (this.cells[[q+n[i][0],r+n[i][1]]])
          res[[q+n[i][0],r+n[i][1]]] = true;
        else
          res[[q+n[i][0],r+n[i][1]]] = false;
      }
      
      return res;
    }

    function cube(q, r) {
      var z = r;
      var x = q;
      var y = q + r;
      return {x: x, y: y, z: z};
    }

    function hexGrid(max_y) {
      // uses cubic coordinates, returns a Graph of Nodes using axial coordinates
      var grid = {};
      
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
            grid[[current_x,current_z]] = new app.type.Cell(current_x,current_z);
          else
            continue;
        }
      }
      return grid;
    }

    this.cells = hexGrid(max_y);
    
    for (var cell in this.cells) {
      this.el.appendChild(this.cells[cell].el);
    }
  }

  return Grid;

}());
