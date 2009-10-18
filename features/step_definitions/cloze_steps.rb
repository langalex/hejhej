Given /^a cloze "([^\"]*)" with the text "([^\"]*)"$/ do |name, text|
  When "I go to the start page"
  And 'I follow "Clozes"'
  And 'I follow "New Cloze"'
  And "I fill in \"Name\" with \"#{name}\""
  And "I fill in \"Text\" with \"#{text}\""
  And 'I press "Save"'
end

Then /^"([^\"]*)" should have the class "([^\"]*)"$/ do |element_id, css_class|
  $browser.text_field(:id, element_id).attribute_value(:class).should include(css_class)
end

Then /^"([^\"]*)" should not have the class "([^\"]*)"$/ do |element_id, css_class|
  $browser.text_field(:id, element_id).attribute_value(:class).should_not include(css_class)
end
