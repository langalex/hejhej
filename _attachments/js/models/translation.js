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

Translation = function(attributes) {
  this._id = attributes._id;
  this._rev = attributes._rev;
  this.name = attributes.name;
  this.description = attributes.description;
  this.terms = [attributes.terms].flatten();
  this.translations = [attributes.translations].flatten();
  this.created_at = attributes.created_at || Date();
}
Translation.prototype = {
  errors: [],
  
  valid: function() {
    this.errors = [];
    if(!this['name'] || this['name'].length == 0) {
      this.errors.push("Name can't be blank");
    }
    return this.errors.length == 0;
  },
  to_json: function() {
    return {
      name: this.name,
      description: this.description,
      terms: this['terms'],
      translations: this['translations'],
      created_at: this.created_at,
      type: 'Translation',
      _id: this._id,
      _rev: this._rev
    }
  }
  
}