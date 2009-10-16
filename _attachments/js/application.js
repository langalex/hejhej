var couchapp = null;
$.CouchApp(function(app) {
  couchapp = app;
});
var content = $('#content');


var sammy = $.sammy(function() { with(this) {
  element_selector = '#content';
  
  get('#/new_text', function() { with(this) {
    partial('./templates/texts/new.html.erb');
  }});
  
  get('#/add_gap', function() {
    this.partial('./templates/texts/_gap.html.erb', function(_html) {
      var html = $(_html);
      var count = $(element_selector + ' input.gap').length;
      html.find('p:first input').attr('id', 'gap' + count);
      html.find('p:first label').attr('for', 'gap' + count);
      html.find('p:eq(1) input').attr('id', 'text' + (count + 1));
      html.find('p:eq(1) label').attr('for', 'text' + (count + 1));
      $(element_selector + ' form p.submit').before(html.html());
    });
  });
  
  post('#/pages', function() {
    
  });
  
  before(function() {
    $('#error').html('').hide();
    $('#notice').html('').hide();
  })
  
  bind('error', function(e, data) { with(this) {
    $('#error').html(data.message).show();
  }});
  
  bind('notice', function(e, data) { with(this) {
    $('#notice').html(data.message).show();
  }});
}});

$(function() {
  sammy.run('#/');

  // this is a hack, without this cucumber/culerity doesn't recognize the changed hash
  $('a').live('click', function() {
    var hash = $(this).attr('href').match(/#.+/)[0];
    if(hash) {
      sammy.runRoute('get', hash);
    };
    return false;
  });
});
