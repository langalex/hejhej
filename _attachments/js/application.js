var couchapp = null;
$.CouchApp(function(app) {
  couchapp = app;
});
var content = $('#content');

var sammy = new Sammy.Application(function() { with(this) {
  element_selector = '#content';
  use(Sammy.Mustache);
  
  get('#/clozes/new', function() { with(this) {
    partial('./templates/clozes/new.mustache');
  }});
  
  get('#/clozes/:id', function() { with(this) {
    var context = this;
    couchapp.db.openDoc(params['id'], {
      success: function(doc) {
        var view = new ClozeView(new Cloze(doc));
        context.partial('./templates/clozes/show.mustache', view, function(html) {
          var dom = $(html);
          dom.find('input.blank').each(function(i) {
            $(this).attr('id', 'blank' + i);
          });
          $(element_selector).html(dom);
          
        });
      },
      error: function() {
        context.notFound();
      }
    });
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
    var context = this;
    couchapp.design.view("clozes", {
       include_docs: true,
       success: function(json) {
         context.partial('./templates/clozes/index.mustache', {clozes: json['rows'].map(function(row) {return row.doc})});
       }
     });
  });
  
  post('#/clozes', function() { with(this) {
    var page = new Cloze(params);
    if(page.valid()) {
      couchapp.db.saveDoc(page.to_json(), {
        success: function(res) {
          trigger('notice', {message: 'Page Saved'});
          redirect('#/pages/' + res.id)
        },
        error: function(response_code, res) {
          trigger('error', {message: 'Error saving page: ' + res});
        }
      });
    } else {
      trigger('error', {message: page.errors.join(", ")});
    };
    return false;
  }});
  
  before(function() {
    $('#error').html('').hide();
    $('#notice').html('').hide();
  })
  
  bind('error', function(e, data) { with(this) {
    $('#error').html(data.message).show().css('background', 'red');
    window.setTimeout(function() {
      $('#error').css('background', 'none');
    }, 1000);
    
  }});
  
  bind('notice', function(e, data) { with(this) {
    $('#notice').html(data.message).show().css('background', 'green');
    window.setTimeout(function() {
      $('#notice').css('background', 'none');
    }, 1000);
  }});
}});

$(function() {
  sammy.run('#/');

  // without this hack cucumber/culerity doesn't recognize the changed hash
  $('a').live('click', function() {
    var hash = $(this).attr('href').match(/#.+/)[0];
    if(hash) {
      sammy.runRoute('get', hash);
    };
    return false;
  });
});
