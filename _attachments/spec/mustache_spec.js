describe "Mustache"
  it "should enumerate over an array"
    Mustache.render("{{#list}}{{ . }}{{/list}}", {list: [1, 2, 3]}).should.equal("123")
  end
end