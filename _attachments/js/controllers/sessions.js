Sessions = function(sammy) { with(sammy) {
  
  helpers({
    set_current_user: function(user, password) {
      var res = CouchDB.login(user.name, password);
			return !res.error;
    },
    current_user: function(callback) {
			var session = CouchDB.session();
			var username = session.userCtx && session.userCtx.name;
			if(username) {
				$.couch.db('_users').openDoc(CouchDB.user_prefix + username, {
					success: function(doc) {
						callback(new User(doc));
					},
					error: function() {}
				});
			}
    }
  });
  
  get('#/sessions/new', function() {
    this.partial('./templates/sessions/new.mustache');
  });

	get('#/log_out', function() { with(this) {
		CouchDB.logout();
		redirect('index.html');
	}});

  post('#/sessions', function() { with(this) {
	  if(set_current_user(new User({name: params['name']}), params['password'])) {
	    redirect('#/account');
	  } else {
	    trigger('error', {message: 'Sorry your username/password is not correct'});
	  };
  }});
  
}};