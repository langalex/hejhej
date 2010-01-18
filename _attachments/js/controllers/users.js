Users = function(sammy) { with(sammy) {
  get('#/users/new', function() {
    this.partial('./templates/users/new.mustache');
  });
  
  get('#/account', function() {
    var context = this;
    this.current_user(function(user) {
      var view = {name: user.name};
      context.partial('./templates/account/show.mustache', view);
    });
  });
  
  post('#/users', function() {
    var context = this;
    var user = new User(this.params);

    if(user.valid()) {
			var users_db = $.couch.db('_users');
      users_db.saveDoc(user.to_json(), {
        success: function(res) {
          trigger('notice', {message: 'User saved'});
					context.set_current_user(user, context.params['password']);
          context.redirect('#/account');
        },
        error: function(response_code, res) {
          trigger('error', {message: 'Error saving User: ' + res});
        }
      });
    } else {
      trigger('error', {message: user.errors.join(", ")});
    };
  });
}};