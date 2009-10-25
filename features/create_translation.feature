Feature: Create translation
  In order to enable learners to train vocabulary
  As a teachers
  I want to create a translation assignment
  
  Scenario: create translation
    When I go to the start page
      And I follow "Translations"
      And I follow "New Translation"
      And I fill in "Name" with "Basic Swedish"
      And I fill in "Description" with "Do this first"
      And I fill in "Term" with "house"
      And I fill in "Translation" with "hus"
      And I click "Add Translation"
      And I fill in "term1" with "you"
      And I fill in "translation1" with "du"
      And I press "Save"
      And I follow "Translations"
      And I follow "Basic Swedish"
    Then I should see "Do this first"
      And I should see "house"
      And I should see "you"
      And I should not see "hus"
      And I should not see "du"