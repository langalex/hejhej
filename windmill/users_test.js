// doesnt work, we don't know why
// var test_sign_up = function() {
//  var client = windmill.jsTest.actions;
//  client.open({url: 'http://localhost:5985/hejhej_test/_design/hejhej/index.html'});
//  client.click({link: 'Sign Up'});
//  client.waits.forPageLoad({timeout: 10000});
//  client.type({text: 'uwe', id: 'name'});
//  client.type({text: 'test', id: 'password'});
//  client.type({text: 'test', id: 'password_confirmation'});
//  client.click({value: 'Sign Up'})
//  client.waits.forPageLoad({timeout: 10000});
//  client.asserts.assertText({xpath: '//h1', validator: 'Welcome uwe'});
// };

var test_users = new function() {
  this.delete_objects = function() {
    var db = new CouchDB(this.db);
    db.allDocs()['rows'].forEach(function(row) {
      if(!row['id'].match(/^_design/)) {
        db.deleteDoc(row);
      };
    });
  };
  
  this.delete_user = function(name) {
    var db = new CouchDB('_users');
    var user = db.open('org.couchdb.user:' + name);
    if(user) {
      CouchDB.login(this.admin, this.password);
      db.deleteDoc(user);
      CouchDB.logout();
    };
  };
  
  this.setup = function() {
    this.db = 'hejhej_test';
    this.admin = 'alex';
    this.password = 'test';
    this.delete_objects();
    this.delete_user('uwe');
  };

  this.test_signup = [
    {"params": {"url": "http://localhost:5985/hejhej_test/_design/hejhej/index.html"}, "method": "open"},
    {"params": {"link": "Sign Up"}, "method": "click"},
    {"params": {"timeout": 10000}, "method": "waits.forPageLoad"},
    {"params": {"text": "uwe", "id": "name"}, "method": "type"},
    {"params": {"text": "test", "id": "password"}, "method": "type"},
    {"params": {"text": "test", "id": "password_confirmation"}, "method": "type"},
    {"params": {"value": "Sign Up"}, "method": "click"},
    {"params": {"timeout": 10000}, "method": "waits.forPageLoad"},
    {"params": {"xpath": "//h1", "validator": "Welcome uwe"}, "method": "asserts.assertText"}
  ];
};

