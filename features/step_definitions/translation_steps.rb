Given /^a translation "([^\"]*)" with the terms "([^\"]*)"$/ do |name, terms|
  When 'I go to the start page'
  And 'I follow "Translations"'
  And 'I follow "New Translation"'
  And "I fill in \"Name\" with \"#{name}\""
  i = 0
  terms.split('|').map{|pair| pair.split('/')}.each do |term, translation|
    And "I fill in \"term#{i}\" with \"#{term}\""
    And "I fill in \"translation#{i}\" with \"#{translation}\""
    And "I click \"Add Translation\""
    i += 1
  end
  And 'I press "Save"'
end
