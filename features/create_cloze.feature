Feature: Text with blanks
  In order to allow people to learn by dragging words into blanks
  As a teacher
  I want to create a text with blanks
  
  Scenario: create text with blanks
    When I go to the start page
      And I follow "New Cloze"
      And I fill in "Name" with "railscamp"
      And I fill in "Text" with "i am [at] [the] railscamp uk."
      And I press "Save"
      And I follow "Clozes"
      And I follow "railscamp"
    Then I should see /i am.*railscamp uk/
      And I should see "at"
      And I should see "the"