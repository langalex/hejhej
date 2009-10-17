describe "Mustache"
  describe "to_html"
    it "should enumerate over an array"
      Mustache.to_html("{{#list}}{{ . }}{{/list}}", {list: [1, 2, 3]}).should.equal("123")
    end
    
    it "should not give access to variables from a previous run"
      Mustache.to_html("{{#list}}{{x}}{{/list}}", {list: [{x: 1}]})
      -{ Mustache.to_html("{{x}}", {}) }.should.throw_error 'Can\'t find x in [object Object]'
    end
  end
  
  it "should not give access to private methods"
    Mustache.render.should_equal undefined
  end
  
end

