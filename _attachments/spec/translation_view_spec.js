describe "TranslationView"
  describe "terms"
    it "should return all terms with indexes"
      var translation = {terms: ['i', 'you', 'he']};
      var view = new TranslationView(translation);
      view.terms().should.eql([{term: 'i', index: 0}, {term: 'you', index: 1}, {term: 'he', index: 2}])
    end
  end
end