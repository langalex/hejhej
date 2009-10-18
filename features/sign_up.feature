Feature: Sign up
  In order to have access to my test results
  As a learner
  I want to sign up 

  Scenario: sign up
    When I go to the start page
      And I follow "Sign Up"
      And I fill in "Username" with "alex"
      And I fill in "Password" with "test"
      And I fill in "Password Confirmation" with "test"
      And I press "Sign Up"
    Then this is pending because htmlunit crashed when putting json to create the user with "java.lang.IllegalArgumentException: The content cannot be null"
    Then I should see "Welcome alex"