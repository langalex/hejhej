Feature: Solve cloze
  In order to learn the grammar
  As a learner
  I want to solve a cloze
  
  Scenario: solve cloze
    Given a cloze "railscamp" with the text "i am [here] at [railscamp] UK"
    When I follow "Clozes"
      And I follow "railscamp"
      And I fill in "blank0" with "here"
      And I fill in "blank1" with "railscamp"
      And I press "Done"
    Then I should see "You got 2 out of 2 right."