//
// app.events module
//

app.events = (function($) {

  var mouse = { x: 0, y: 0,
                offsetX: 0,
                offsetY: 0,
                down: false,
                drag: false};
  
  var initModule = function( container ) {

    window.addEventListener("resize", function() {
      var width = window.innerWidth;
      var height = window.innerHeight;

      app.shell.setSize(width, height);
      // app.map.setOrigin(width / 2, height / 2);
    });

    window.addEventListener("keyup", function(e) {
      console.log(String.fromCharCode(e.which), e.which);
    });

    container.addEventListener('mousemove', function(e) {
      if (mouse.down == true)
        mouse.drag = true;
      if (mouse.drag == true) {
        mouse.offsetX = e.clientX - mouse.x;
        mouse.offsetY = e.clientY - mouse.y;
        app.map.setOffset(mouse.offsetX, mouse.offsetY);
      }
      e.preventDefault();
    }, false);
    
    container.addEventListener('mousedown', function(e) {
      mouse.down = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      e.preventDefault();
    }, false);

    container.addEventListener('mouseup', function(e) {
      var mapOrigin;
      if (mouse.drag == true) {
        mapOrigin = app.map.getOrigin();
        app.map.setOrigin(mapOrigin.x + mouse.offsetX,
                          mapOrigin.y + mouse.offsetY);
      }
      mouse.down = false;
      mouse.drag = false;
      e.preventDefault();
    }, false);
  }
  
  return {
    initModule : initModule
  };
  
})(jQuery)
