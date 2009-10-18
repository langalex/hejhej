describe 'Translation'
  describe "new"
    it "should convert a single term/translation into an array"
      var translation = new Translation({terms: 'you', translations: 'han'});
      translation.terms.length.should == 1
      translation.terms[0].should.equal('you');
      translation.translations.length.should == 1
      translation.translations[0].should.equal('han');
    end
    
    it "should not wrap an array of terms/translations into another array"
      var translation = new Translation({terms: ['you'], translations: ['han']});
      translation.terms.length.should == 1
      translation.terms[0].should.equal('you');
      translation.translations.length.should == 1
      translation.translations[0].should.equal('han');
    end
  end
end