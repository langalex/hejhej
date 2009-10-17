describe 'Cloze'
  before_each
    cloze = Cloze.init({texts: ['hello', 'world', 'there'], blanks: ['dear', 'out']})
  end
  
  describe 'texts_and_blanks'
    it 'should return the texts and blanks interweaved'
      cloze.texts_and_blanks().should.eql [{text: 'hello'}, {blank: 'dear'}, {text: 'world'}, {blank: 'out'}, {text: 'there'}]
    end
  end
  
  describe 'correct_answers'
    it 'should return true if all answers match the blanks'
      cloze.correct_answers(['dear', 'out']).should.be_true
    end
    
    it 'shuld return false as soon as one does not match'
      cloze.correct_answers(['out', 'dear']).should.be_false
    end
  end
  
  describe 'init with texts string'
    it "should parse the text and blank parts from the text"
      cloze = Cloze.init({text: "hello [dear] world [out] there"});
      cloze.texts.should.eql ['hello', 'world', 'there']
      cloze.blanks.should.eql ['dear', 'out']
    end
  end

end