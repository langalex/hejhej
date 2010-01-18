Given /^a user "([^\"]*)" with the password "([^\"]*)"$/ do |username, password|
  RestClient.put "#{host}/#{database}/#{username}", {:encrypted_password => password.reverse}.to_json
  
  # When 'I go to the start page'
  # And 'I follow "Sign Up"'
  # And %Q{I fill in "Username" with "#{username}"}
  # And %Q{I fill in "Password" with "#{password}"}
  # And %Q{I fill in "Password Confirmation" with "#{password}"}
  # And 'I press "Sign Up"'
end
