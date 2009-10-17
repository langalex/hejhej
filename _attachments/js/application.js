var couchapp = null;
$.CouchApp(function(app) {
  couchapp = app;
});
var content = $('#content');


var sammy = new Sammy.Application(function() { with(this) {
  element_selector = '#content';
  use(Sammy.Template);
  
  get('#/clozes/new', function() { with(this) {
    partial('./templates/clozes/new.template');
  }});
  
  get('#/clozes/:id', function() { with(this) {
    var context = this;
    couchapp.db.openDoc(params['id'], {
      success: function(doc) {
        context.cloze = Cloze.init(doc);
        context.partial('./templates/clozes/show.template', function(html) {
          content.html(html);
          this.each(context.cloze.texts_and_blanks(), function(i, text_or_blank) {
            if(text_or_blank.text) {
              content.find('#cloze').append('<span class="text">' + text_or_blank.text + '</span>');
            } else if(text_or_blank.blank) {
              content.find('#words').append($('<li>' + text_or_blank.blank + '</li>'));
              content.find('#cloze').append($('<span class="blank"><input type="text" class="blank" name="answers" id="blank' + $('#content #cloze input.blank').length + '"/></span>'));
            }
          });
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
        var cloze = Cloze.init(doc);
        if(cloze.correct_answers(context.params['answers'])) {
          trigger('notice', {message: 'You got ' + cloze.blanks.length + ' out of ' + cloze.blanks.length + ' right.'});
        } else {
          trigger('notice', {message: 'Try again.'});
        };
      }
    });
    return false;
  }});
  
  get('#/clozes', function() {
    var context = this;
    couchapp.design.view("clozes", {
       include_docs: true,
       success: function(json) {
         context.partial('./templates/clozes/index.template', function(html) {
           content.html(html);
           this.each(json['rows'], function(i, cloze) {
             this.partial('./templates/clozes/_cloze.template', {cloze: cloze.doc}, function(cloze_html) {
               $(cloze_html).appendTo('#all_clozes');
             });
           });
         });
       }
     });
  });
  
  post('#/clozes', function() { with(this) {
    var page = Cloze.init(params);
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
