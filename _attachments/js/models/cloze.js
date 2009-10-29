Cloze = function(attributes) {
  var that = this;
  this._id = attributes._id;
  this._rev = attributes._rev;
  this['name'] = attributes['name'];
  this['texts'] = attributes['texts'];
  this['blanks'] = attributes['blanks'];
  if(attributes['text']) {
    this['texts'] = [];
    this['blanks'] = [];
    attributes['text'].split(/[\]\[]+/).forEach(function(token, i) {
      var trimmed = token.replace(/^\s+|\s+$/g, '');
      if(i % 2 == 0) {
        that['texts'].push(trimmed);
      } else {
        that['blanks'].push(trimmed);
      }
    });
  };
  this.created_at = attributes.created_at || Date();
};

Cloze.prototype = {
  errors: [],
  valid: function() {
    this.errors = [];
    if(!this['name'] || this['name'].length == 0) {
      this.errors.push("Name can't be blank");
    }
    if(!this['texts'] || this['texts'].length == 0) {
      this.errors.push("Text can't be blank");
    }
    if(!this['blanks'] || this['blanks'].length == 0) {
      this.errors.push("You need at least one blank");
    }
    return this.errors.length == 0;
  },
  texts_and_blanks: function() {
    var that = this;
    return(this['texts'].reduce(function(res, text, i) {
      res.push({text: text});
      if(that.blanks[i]) {
        res.push({blank: that.blanks[i]});
      };
      return(res);
    }, []));
  },
  correct_answers: function(answers) {
    var _answers = [answers].flatten()
    return this.blanks.map(function(blank, i) {
      if(_answers[i] == blank) {
        return {correct: true};
      } else {
        return {correct: false, correct_answer: blank};
      };
    });
  },
  correct_answers_count: function(answers) {
    return this.correct_answers(answers).select(function(answer) {return(answer.correct)}).length;
  },
  to_json: function() {
    return {
      name: this['name'],
      texts: this['texts'],
      blanks: this['blanks'],
      created_at: this.created_at,
      type: 'Cloze',
      _id: this._id,
      _rev: this._rev
    }
  }
};
