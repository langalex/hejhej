Translation = function(attributes) {
  this._id = attributes._id;
  this._rev = attributes._rev;
  this.name = attributes.name;
  this.description = attributes.description;
  this.terms = [attributes.terms].flatten().reject(function(term) {return term.length == 0});
  this.translations = [attributes.translations].flatten().reject(function(term) {return term.length == 0});
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
  
  correct_answers: function(answers) {
    var _answers = [answers].flatten()
    return this.translations.map(function(translation, i) {
      if(translation == _answers[i]) {
        return translation;
      } else {
        return null;
      };
    });
  },
  
  correct_answers_count: function(answers) {
    return this.correct_answers(answers).compact().length;
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