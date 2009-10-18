Users = function(sammy) { with(sammy) {
  get('#/users/new', function() {
    this.partial('./templates/users/new.mustache');
  });
  
  get('#/account', function() {
    var context = this;
    this.current_user(function(user) {
      var view = {username: user.username()};
      context.partial('./templates/account/show.mustache', view);
    });
  });
  
  post('#/users', function() {
    var context = this;
    return this.create_object('User', this.params, {redirect: '#/account', success: function(user) {
      context.set_current_user(user);
    }});
  });
  
}};