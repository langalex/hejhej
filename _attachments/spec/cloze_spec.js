describe 'Cloze'
  before_each
    cloze = new Cloze({texts: ['hello', 'world', 'there'], blanks: ['dear', 'out']});
  end
  
  describe 'texts_and_blanks'
    it 'should return the texts and blanks interweaved'
      cloze.texts_and_blanks().should.eql [{text: 'hello'}, {blank: 'dear'}, {text: 'world'}, {blank: 'out'}, {text: 'there'}]
    end
  end
  
  describe 'init with texts string'
    it "should parse the text and blank parts from the text"
      cloze = new Cloze({text: "hello [dear] world [out] there"})
      cloze.texts.should.eql ['hello', 'world', 'there']
      cloze.blanks.should.eql ['dear', 'out']
    end
  end
  
  describe "correct answers"
    it "should return the correct answers and nil for incorrect answers"
      cloze.correct_answers(['dear', 'in']).should.eql ['dear', null]
    end
    
    it "should work if there is only one blank"
      cloze = new Cloze({texts: ['hello', 'world'], blanks: ['dear']});
      cloze.correct_answers('dear').should.eql ['dear']
    end
  end
  
  describe "correct answers_count"
    it "should return the no. of correct answers"
      cloze.correct_answers_count(['dear', 'in']).should.eql 1
    end
    
    it "should work if there is only one blank"
      cloze = new Cloze({texts: ['hello', 'world'], blanks: ['dear']});
      cloze.correct_answers_count('dear').should.eql 1
    end
    
  end
end