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
        $(element_selector).find('.blank').removeClass('error');
        cloze.correct_answers(params['answers']).forEach(function(answer, i) {
          if(answer === null) {
            $(element_selector).find('.blank:eq(' + i + ')').addClass('error');
          };
        });
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