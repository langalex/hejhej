describe "TranslationView"
  describe "terms"
    before
      math_round = Math.round;
      Math.round = function() {return 1};
    end
    
    after
      Math.round = math_round;
    end
    
    it "should return all terms with indexes"
      var translation = {terms: ['i', 'you', 'he']};
      
      var view = new TranslationView(translation);
      view.terms().should.eql([{term: 'i', index: 0}, {term: 'you', index: 1}, {term: 'he', index: 2}])
    end
  end
end