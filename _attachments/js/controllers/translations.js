Translations = function(sammy) { with(sammy) {
  
  helpers({
    add_term: function(app) {
      app.partial('./templates/translations/_term.mustache', {index: $(app.element_selector).find('input.term').length}, function(html) {
        $(app.element_selector).find('#terms').append(html);
      });
    }
  });
  
  get('#/translations/new', function() {
    this.partial('./templates/translations/new.mustache');
    this.add_term(this);
  });
  
  get('#/translations/add_term', function() {
    this.add_term(this);
  });
  
  get('#/translations/:id', function() {
    this.load_object('Translation', this.params);
  });
  
  get('#/translations', function() {
    this.list_objects('Translation', 'translations', this.params);
  });
  
  post('#/translations/:id/completions', function() {
    var context = this;
    var answers = parseAnswers(this.params)
    
    couchapp.db.openDoc(this.params['id'], {
      success: function(doc) {
        var translation = new Translation(doc);
        trigger('notice', {message: 'You got ' + translation.correct_answers_count(answers) + ' out of ' + translation.terms.length + ' right.'});
        context.mark_false_answers(translation.correct_answers(answers), '#translation{{i}}');
        $('#submit').hide();
      }
    });
    return false;
    
    function parseAnswers(params) {
      var answers = [];
      for(var name in context.params) {
       if(name.match(/answers\[\d+\]/)) {
         var index = parseInt(name.match(/\[(\d+)\]/)[1]);
         answers[index] = context.params[name];
       } 
      };
      return answers;
    }
  });
  
  post('#/translations', function() {
    return this.create_object('Translation', this.params);
  });
  
  
}};