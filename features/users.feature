Feature: users
  In order to have access to my test results
  As a learner
  I want to become a registered user

  Scenario: sign up
    When I go to the start page
      And I follow "Sign Up"
      And I fill in "Username" with "alex"
      And I fill in "Password" with "test"
      And I fill in "Password Confirmation" with "test"
      And I press "Sign Up"
    Then this is pending because htmlunit crashed when putting json to create the user with "java.lang.IllegalArgumentException: The content cannot be null"
    Then I should see "Welcome alex"

  Scenario: fail to sign up
    When I go to the start page
      And I follow "Sign Up"
      And I fill in "Username" with "alex"
      And I fill in "Password" with "test"
      And I press "Sign Up"
    Then I should see "Password Confirmation does not match"

  Scenario: log in
    Given a user "alex" with the password "foobar"
    When I go to the start page
      And I follow "Log In"
      And I fill in "Username" with "alex"
      And I fill in "Password" with "foobar"
      And I press "Log In"
    Then I should see "Welcome alex"
      And I should not see "Log In"
      And I should not see "Sign Up"
      And I should see "Account"
  
  Scenario: fail to log in
    Given a user "alex" with the password "foobar"
    When I go to the start page
      And I follow "Log In"
      And I fill in "Username" with "alex"
      And I fill in "Password" with "wrong"
      And I press "Log In"
    Then I should not see "Welcome alex"
      And I should see "Sorry your password is not correct"
      And I should see "Log In"
      And I should see "Sign Up"
    
  Scenario: stay logged in after page refresh
    Given a user "alex" with the password "foobar"
    When I go to the start page
      And I follow "Log In"
      And I fill in "Username" with "alex"
      And I fill in "Password" with "foobar"
      And I press "Log In"
    Then I should see "Welcome alex"
    When I go to the start page
      And I follow "Account"
    Then I should see "Welcome alex"
    
    