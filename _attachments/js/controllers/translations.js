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
  
  post('#/translations', function() {
    return this.create_object('Translation', this.params);
  });
  
}};