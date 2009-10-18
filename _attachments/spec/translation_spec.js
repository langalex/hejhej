describe 'Translation'
  describe "new"
    it "should convert a single term/translation into an array"
      var translation = new Translation({terms: 'you', translations: 'han'});
      translation.terms.length.should.equal 1
      translation.terms[0].should.equal('you');
      translation.translations.length.should.equal 1
      translation.translations[0].should.equal('han');
    end
    
    it "should not wrap an array of terms/translations into another array"
      var translation = new Translation({terms: ['you'], translations: ['han']});
      translation.terms.length.should.equal 1
      translation.terms[0].should.equal('you');
      translation.translations.length.should.equal 1
      translation.translations[0].should.equal('han');
    end
    
    it "should remove blank terms/translations"
      var translation = new Translation({terms: ['you', ''], translations: ['han', '']});
      translation.terms.length.should.equal 1
      translation.terms[0].should.equal('you');
      translation.translations.length.should.equal 1
      translation.translations[0].should.equal('han');
    end
  end
  
  describe "correct_answers"
    before
      translation = new Translation({translations: ['jag', 'du', 'han'], terms: []})
    end
    
    it "should return the correct answers and nil for incorrect answers"
      translation.correct_answers(['jag', 'x', 'han']).should.eql(['jag', null, 'han'])
    end
    
    it "should work if there is only one answer"
      translation.correct_answers('jag').should.eql(['jag', null, null]);
    end
  end
  
  describe "correct answers_count"
    before
      translation = new Translation({translations: ['jag', 'du', 'han'], terms: []})
    end
  
    it "should return the no. of correct answers"
      translation.correct_answers_count(['jag', 'x', 'han']).should.equal 2
    end
    
    it "should work if there is only one blank"
      translation.correct_answers_count('jag').should.equal 1
    end
  end
  
end