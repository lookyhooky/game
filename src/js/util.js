function forEach(array, func) {
  for (var i = 0; i < array.length; i++)
    func(array[i]);
}

function unless(test, func) {
  if (!test) func();
}

function repeat(times, func) {
  for (var i = 0; i < times; i++) func(i);
}

// filter, map, reduce are all standard Array methods
// these are just for practice and trying to understand
// functional programming
function filter(array, test) {
  var passed = [];
  array.forEach(function(item){
    if (test(item))
      passed.push(item);
  });
  return passed;
}

function map(array, transform) {
  var mapped = [];
  array.forEach(function(item) {
    mapped.push(transform(item));
  });
  return mapped;
}

function reduce(array, combine, start) {
  var current = start;
  array.forEach(function(item) {
    current = combine(current, item);
  });
  return current;
}

function add(a, b) {
  return a + b;
}

function sum(array) {
  // accepts numbers as either an array or arguments
  var sum = 0;
  if (typeof array == "object") {
    array.forEach(function(n) {
      sum += n;
    });
  } else {
    for (var i = 0; i < arguments.length; i++)
      sum += arguments[i];
  }
  return sum;
}

function range(start, end, step) {
  // start and end required, step defaults to 1 if not provided
  var array = [];
  if (step == undefined) step = 1;
  if (step > 0) {
    for (var i = start; i <= end; i += step)
      array.push(i);
  } else {
    for (var i = start; i >= end; i += step)
      array.push(i);
  }
  return array;
}

function cons(head, tail) {
  return [head, tail];
}

function head(list) {
  return list[0];
}

function tail(list) {
  return list.slice(1);
}

function nth(index, list) {
  var result = 0;
  return result;
}

function list() {
  var list = null;
  for (var i = arguments.length; i >= 0; i--)
    list = [arguments[i], list];
  return list;
}

