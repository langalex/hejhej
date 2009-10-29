Feature: Solve translation
  In order to learn grammar or words
  As a learner
  I want to sole a translation task
  
  Scenario: solve a translation
    Given a translation "basic swedish" with the terms "i/jag|you/du"
    When I go to the start page
      And I follow "Translations"
      And I follow "basic swedish"
      And I fill in "i" with "jag"
      And I fill in "you" with "du"
      And I press "Done"
    Then I should see "You got 2 out of 2 right"
      

  Scenario: fail to completely solve a translation
    Given a translation "basic swedish" with the terms "i/jag|you/du"
    When I go to the start page
      And I follow "Translations"
      And I follow "basic swedish"
      And I fill in "i" with "jag"
      And I press "Done"
    Then I should see "You got 1 out of 2 right"
      And "translation0" should not have the class "error"
      And "translation1" should have the class "error"
      And I should see "du"