User = function(attributes) {
  this._id = attributes._id || attributes.username;
  this._rev = attributes._rev;
  this.password = attributes.password;
  this.password_confirmation = attributes.password_confirmation;
  this.encrypted_password = attributes.encrypted_password;
}

User.prototype = {
  password_correct: function(password) {
    return this.encrypt(password) == this.encrypted_password;
  },
  encrypt: function(string) {
    return string.reverse(); // TODO replace with something more secure
  },
  valid: function() {
    this.errors = [];
    if(!this._id) {
      this.errors.push("You need to enter a username");
    };
    if(!this.encrypted_password && !this.password) {
      this.errors.push("You need to enter a password.");
    };
    if(this.password && this.password != this.password_confirmation) {
      this.errors.push('Password Confirmation does not match.');
    }
    return this.errors.length === 0;
  },
  username: function() {
    return this._id;
  },
  to_json: function() {
    return {
      _id: this._id,
      _rev: this._rev,
      encrypted_password: this.encrypted_password || this.encrypt(this.password)
    };
  }
};