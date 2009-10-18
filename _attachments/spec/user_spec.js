describe "User"
  describe "valid"
    it "should be valid with username and matching password"
      var user = new User({username: 'alex', password: 'test', password_confirmation: 'test'});
      user.valid().should.be_true;
    end
  end
  
  describe "password correct"
    before
      var encrypted_password = new User({password: 'foobar'}).to_json().encrypted_password;
      user = new User({encrypted_password: encrypted_password});
    end
    
    it "should return true if the given password matches the user password"
      user.password_correct('foobar').should.be_true
    end
    
    it "should return false if the password is wrong"
      user.password_correct('fuubar').should.be_false
    end
  end
end