//
// app.events module
//

app.events = (function($) {

  // app.addEventListener('mousedown', function(e) {
    
  //   e.preventDefault();

  // });

  window.addEventListener("keyup", function(e) {
    console.log(String.fromCharCode(e.which), e.which);
  });

  return null;
  
})(jQuery)
