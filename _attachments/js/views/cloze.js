ClozeView = function(cloze) {
  this.cloze = cloze;
}

ClozeView.prototype = {
  _id: function() {
    return this.cloze._id;
  },
  name: function() {
    return this.cloze.name;
  },
  random_blanks: function() {
    return this.cloze.blanks.sort(function() {
      return Math.round((Math.random() * 2) - 1);
    });
  },
  texts_and_blanks: function() {
    return this.cloze.texts_and_blanks().map(function(text_or_blank) {
      return{text: text_or_blank.text || null, blank: text_or_blank.blank || null};
    });
  }
}

