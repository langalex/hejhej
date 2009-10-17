require 'restclient'
require 'json'

Given /^a cloze "([^\"]*)" with the text "([^\"]*)"$/ do |name, text|
  When "I go to the start page"
  And 'I follow "Clozes"'
  And 'I follow "New Cloze"'
  And "I fill in \"Name\" with \"#{name}\""
  And "I fill in \"Text\" with \"#{text}\""
  And 'I press "Save"'
end

Before do
  RestClient.delete "#{host}/#{database}" rescue nil
  RestClient.put "#{host}/#{database}", ""
  system "couchapp push"
end