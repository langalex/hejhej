describe "User"
  describe "valid"
    it "should be valid with username and matching password"
      var user = new User({username: 'alex', password: 'test', password_confirmation: 'test'});
      user.valid().should.be_true;
    end
  end
end