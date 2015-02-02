//
// app.util.js
//

app.util = (function() {

  // public properties
  var Color;

  Color = function(h, s, l) {

    // private Color properties
    var hue,
        saturation,
        lightness,
        alpha;

    hue = h;
    saturation = s;
    lightness = l;

    // public Color properties
    var get,
        set,
        stringify;
    
    get = function(property) {
      switch (property) {
      case "h":
        return hue;
        break;
      case "s":
        return saturation;
        break;
      case "l":
        return lightness;
        break;
      default:
        console.log("Color.get() cannot get that.");
        return false;
      }
    };

    set = function(property, value) {
      switch (property) {
      case "h":
        hue = value;
        break;
      case "s":
        saturation = value;
        break;
      case "l":
        lightness = value;
        break;
      default:
        console.log("Color.set() cannot set that.");
      }
    };

    stringify = function(){
      var s = saturation * 100;
      var l = lightness * 100;
      return 'hsl(' + hue + ',' + s + '%,' + l + '%)';
    };
    
    return {
      get : get,
      set : set,
      stringify :  stringify
    };
  }
  
  return {
    Color : Color
  }
}())
