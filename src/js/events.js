function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();

  return {
    x: (x - bbox.left) * (canvas.width / bbox.width),
    y: (y - bbox.top) * (canvas.height / bbox.height)
  }
}

// canvas.addEventListener('mousedown', function(e) {
//   // var loc = windowToCanvas(canvas, e.clientX, e.clientY);

//   e.preventDefault();
  
// });

window.addEventListener("keyup", function(e) {
  console.log(String.fromCharCode(e.which), e.which);
});
