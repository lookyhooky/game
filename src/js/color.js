function toHex(decimal) {
  var res = decimal.toString(16);
  if (res.length == 1)
    res = "0" + res;
  return res;
}

function toDecimal(hex) {
  return parseInt(hex, 16);
}

function rgb(red, green, blue) {
  return "rgb(" + red + "," + green + "," + blue + ")";
}

function rgba(red, green, blue, alpha) {
  return "rgb(" + red + "," + green + "," + blue + "," + alpha + ")";
}

function hsl(hue, saturation, lightness) {
  return "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
}

function hsla(hue, saturation, lightness, alpha) {
  return "hsla(" + hue + "," + saturation + "%," + lightness + "%," + alpha +  ")";
}

function rgbToHex(r, b, g) {
  return "#" + toHex(r) + toHex(b) + toHex(g);
}

function randomColor() {
  function rand255 () {
    return Math.floor(Math.random() * 225);
  }
  return rgb(rand255(),rand255(),rand255())
}
// function hslToRgb(h, s, l) {
//   var C = (1 - Math.abs(2 * l - 1)) * s;
//   var X = C * (1 - Math.abs((h / 60) % 2 - 1));
//   var m = l - C/2;

//   var r = g = b = null;

//   if (h >= 0 && h < 60) {
//     r = C;
//     g = X;
//     b = 0;
//   }

//   return { r: r + m, g: g + m, b: b + m };
  
// }
