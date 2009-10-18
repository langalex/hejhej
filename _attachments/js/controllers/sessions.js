Sessions = function(sammy) { with(sammy) {
  
  helpers({
    set_current_user: function(user) {
      Sessions._current_user = user;
      document.cookie = "hejhej_username=" +  user.username();
    },
    current_user: function(callback) {
      if(!Sessions._current_user) {
        curren_user_from_cookie(callback);
      } else {
        callback(Sessions._current_user);
      };
      
      function curren_user_from_cookie(callback) {
        var match = document.cookie.match(/hejhej_username=([^;]+);?/);
        if(match) {
          couchapp.db.openDoc(match[1], {
           success: function(doc) {
             Sessions._current_user = new User(doc);
             callback(Sessions._current_user);
           },
           error: function() {}
         });
        };
      }
    }
  });
  
  get('#/sessions/new', function() {
    this.partial('./templates/sessions/new.mustache');
  });

  post('#/sessions', function() { with(this) {
    var context = this;
    couchapp.db.openDoc(params['username'], {
     success: function(doc) {
       var user = new User(doc);
       if(user.password_correct(context.params['password'])) {
         context.set_current_user(user);
         redirect('#/account');
       } else {
         trigger('error', {message: 'Sorry your password is not correct'});
       }
     },
     error: function() {
       trigger('error', {message: 'User not found.'});
     }
    });
  }});
  
}};