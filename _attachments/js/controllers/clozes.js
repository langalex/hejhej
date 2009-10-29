Clozes = function(sammy) { with(sammy) {
  get('#/clozes/new', function() { with(this) {
    partial('./templates/clozes/new.mustache');
  }});
  
  get('#/clozes/:id', function() { with(this) {
    load_object('Cloze', params);
  }});
  
  post('#/clozes/:id/completions', function() { with(this) {
    var context = this;
    
    couchapp.db.openDoc(params['id'], {
      success: function(doc) {
        var cloze = new Cloze(doc);
        trigger('notice', {message: 'You got ' + cloze.correct_answers_count(context.params['answers']) + ' out of ' + cloze.blanks.length + ' right.'});
        context.mark_false_answers(cloze.correct_answers(context.params['answers']), '#blank{{i}}');
        $('#submit').hide();
      }
    });
    return false;
  }});
  
  get('#/clozes', function() {
    this.list_objects('Cloze', 'clozes', this.params);
  });
  
  post('#/clozes', function() { with(this) {
    return create_object('Cloze', params);
  }});
  
}};