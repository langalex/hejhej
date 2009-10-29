TranslationView = function(translation) {
  this.translation = translation;
}

TranslationView.prototype = {
  _id: function() {
    return this.translation._id;
  },
  name: function() {
    return this.translation.name;
  },
  description: function() {
    return this.translation.description;
  },
  terms: function() {
    var index = -1;
    return this.translation.terms.map(function(term) {
      index += 1;
      return {term: term, index: index};
    }).sort(function() {return(Math.round(Math.random() * 2) - 1)});
  }
}

