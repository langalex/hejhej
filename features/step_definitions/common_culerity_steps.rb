require 'culerity'

class Symbol
  def to_proc
    Proc.new{|object| object.send(self)}
  end
end

Before do
  $server ||= Culerity::run_server
  $browser = Culerity::RemoteBrowserProxy.new $server, {:browser => :firefox, :javascript_exceptions => true, :resynchronize => true, :status_code_exceptions => true}
  $browser.log_level = :warning
  @host = 'http://localhost:5984'
end

at_exit do
  $browser.exit if $browser
  $server.close if $server
end

When /I press "(.*)"/ do |button|
  button = [$browser.button(:text, button), $browser.button(:id, button)].find(&:exist?)
  button.click
  assert_successful_response
end

When /I click "(.*)"/ do |link|
  When "I follow \"#{link}\""
end

When /I follow "(.*)"/ do |link|
  _link = [[:text, /^#{Regexp.escape(link)}$/], [:id, link], [:title, link]].map{|args| $browser.link(*args)}.find{|__link| __link.exist?}
  raise "link \"#{link}\" not found" unless _link
  _link.click
  $browser.wait
  assert_successful_response
end

When /I follow \/(.*)\// do |link|
  $browser.link(:text, /#{link}/).click
  $browser.wait
  assert_successful_response
end


When /I fill in "(.*)" with "(.*)"/ do |field, value|
  find_by_label_or_id(:text_field, field).set value
end

When /I attach "(.*)" to "(.*)"/ do |value, field|
  $browser.file_field(:id, find_label(field).for).set(value)
end

When /I check "(.*)"/ do |field|
  find_by_label_or_id(:check_box, field).set true
end

def find_by_label_or_id(element, field)
  begin
    $browser.send(element, :id, find_label(/#{field}/).for)
  rescue #Celerity::Exception::UnknownObjectException
    $browser.send element, :id, field
  end
end

When /^I uncheck "(.*)"$/ do |field|
  $browser.check_box(:id, find_label(field).for).set(false)
end

When /^I select "([^"]+)" from "([^"]+)"$/ do |value, field|
  find_by_label_or_id(:select_list, field).select value
end

When /^I select "([^"]+)"$/ do |value|
  $browser.option(:text => value).select
end


When /I choose "(.*)"/ do |field|
  $browser.radio(:id, find_label(field).for).set(true)
end

When /I go to the (.+)/ do |path|
  $browser.goto @host + path_to(path)
  assert_successful_response
end

When /I wait for the AJAX call to finish/ do
  $browser.wait
end

When /^I visit "([^"]+)"$/ do |url|
  $browser.goto @host + url
end

Then /I should see "(.*)"/ do |text|
  # if we simply check for the browser.html content we don't find content that has been added dynamically, e.g. after an ajax call
  div = $browser.div(:text, /#{Regexp.escape text}/)
  begin
    div.html
  rescue
    #puts $browser.html
    raise("div with '#{text}' not found")
  end
end

Then /I should see the text "(.*)"/ do |text|
  $browser.html.should include(text)
end

Then /I should not see the text "(.*)"/ do |text|
  $browser.html.should_not include(text)
end

Then /I should not see "(.*)"/ do |text|
  div = $browser.div(:text, /#{text}/).html rescue nil
  div.should be_nil
end

Then /I should see no link "([^"]+)"/ do |text|
  $browser.link(:text => text).should_not exist
end

Then /I should not find the page "([^"]+)"/ do |url|
  no_exception = false
  begin
    $browser.goto @host + url
    no_exception = true
  rescue => e
    e.message.should =~ /404/
  end
  no_exception.should be_false
end

Then /^"([^\"]*)" should be chosen$/ do |field|
  find_by_label_or_id(:radio, field).should be_checked
end

Then /^"([^\"]*)" should be checked$/ do |field|
  find_by_label_or_id(:check_box, field).should be_checked
end

Then /^"([^\"]*)" should not be checked$/ do |field|
  find_by_label_or_id(:check_box, field).should_not be_checked
end

Then /^"([^\"]*)" should be selected$/ do |selection|
  $browser.option(:text => selection).should be_selected
end

When 'show response' do
  p $browser.url
  tmp_file = '/tmp/culerity_results.html'
  FileUtils.rm_f tmp_file
  File.open(tmp_file, 'w') do |f|
    f << $browser.html
  end
  `open #{tmp_file}`
end


def find_label(text)
  $browser.label :text, text
end

def open_response_in_browser
  tmp = Tempfile.new 'culerity_results'
  tmp << $browser.html
  tmp.close
  `open -a /Applications/Safari.app #{tmp.path}`
end

def assert_successful_response
  status = $browser.page.web_response.status_code
  if(status == 302 || status == 301)
    location = $browser.page.web_response.get_response_header_value('Location')
    puts "Being redirected to #{location}"
    $browser.goto location
    assert_successful_response
  elsif status != 200
    open_response_in_browser
    raise "Brower returned Response Code #{$browser.page.web_response.status_code}"
  end
end