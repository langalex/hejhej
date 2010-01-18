User = function(attributes) {
  this._id = attributes._id || 'org.couchdb.user:' + attributes.name;
  this._rev = attributes._rev;
	this.name = attributes.name;
  this.password = attributes.password;
  this.password_confirmation = attributes.password_confirmation;
}

User.prototype = {
  password_correct: function(password) {
    // XXX
  },
  valid: function() {
    this.errors = [];
    if(!this._id) {
      this.errors.push("You need to enter a username");
    };
    if(!this.password) {
      this.errors.push("You need to enter a password.");
    };
    if(this.password_confirmation != undefined && this.password != this.password_confirmation) {
      this.errors.push('Password Confirmation does not match.');
    }
    return this.errors.length === 0;
  },
  username: function() {
    return this._id;
  },
  to_json: function() {
    var json = {
      _id: this._id,
      _rev: this._rev,
			name: this.name
    };
		return CouchDB.prepareUserDoc(json, this.password);
  }
};