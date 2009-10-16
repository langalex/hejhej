Feature: Text with gaps
  In order to allow people to learn by dragging words into gaps
  As a teacher
  I want to create a text with gaps
  
  Scenario: create text with gaps
    When I go to the start page
      And I follow "New Text"
      And I fill in "Text" with "i am"
      And I click "Add Gap"
      And I fill in "gap0" with "at"
      And I click "Add Gap"
      And I click "Add Gap"
      
      And I fill in "gap1" with "the"
      And I fill in "text2" with "railscamp uk."
      And I press "Save"