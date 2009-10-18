Given /^a user "([^\"]*)" with the password "([^\"]*)"$/ do |username, password|
  RestClient.put "#{host}/#{database}/#{username}", {:encrypted_password => password.reverse}.to_json
end
