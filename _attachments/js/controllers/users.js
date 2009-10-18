Users = function(sammy) { with(sammy) {
  
  helpers({
    set_current_user: function(user) {
      Users._current_user = user;
    },
    current_user: function() {
      return Users._current_user;
    }
  })
  
  get('#/users/new', function() {
    this.partial('./templates/users/new.mustache');
  });
  
  get('#/account', function() {
    var view = {username: this.current_user().username()};
    this.partial('./templates/account/show.mustache', view);
  });
  
  post('#/users', function() {
    var context = this;
    return this.create_object('User', this.params, {redirect: '#/account', success: function(user) {
      context.set_current_user(user);
    }});
  });
  
}};