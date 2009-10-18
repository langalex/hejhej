describe 'ClozeView'
  describe "texts_and_blanks"
    it "should return pairs with blank and text"
      var cloze = {texts_and_blanks: function() {
        return [{text: 'text'}, {blank: 'blank'}];
      }};
      var view = new ClozeView(cloze);
      view.texts_and_blanks().map(function(obj) {return({text: obj.text, blank: obj.blank})}).should.eql([{text: 'text', blank: null}, {blank: 'blank', text: null}]);
    end
    
    it "should add indexes to the blanks"
      var cloze = {texts_and_blanks: function() {
        return [{blank: 'text'}, {blank: 'blank'}, {blank: 'blah'}];
      }};
      var view = new ClozeView(cloze);
      view.texts_and_blanks().map(function(obj) {return obj['index']}).should.eql([0, 1, 2]);
    end
  end
end