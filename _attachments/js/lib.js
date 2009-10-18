Array.prototype.flatten = function() {
  return this.reduce(function(res, el) {
    if(el.constructor == Array) {
      el.forEach(function(sub_el) {
        res.push(sub_el);
      })
    } else {
      res.push(el);
    }
    return res;
  }, []);
}

Array.prototype.reject = function(fun) {
  return this.reduce(function(res, el) {
    if(!fun(el)) {
      res.push(el);
    };
    return res;
  }, []);
}

Array.prototype.compact = function() {
  return this.reduce(function(res, el) {
    if(el !== null) {
      res.push(el);
    };
    return res;
  }, [])
}

String.prototype.reverse = function() {
  var reversed = [];
  for(var i = 0; i < this.length; i++) {
    reversed[this.length - i - 1] = this[i];
  }
  return reversed.join('');
}