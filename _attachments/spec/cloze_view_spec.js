describe 'ClozeView'
  describe "texts_and_blanks"
    it "should return pairs with blank and text"
      var cloze = {texts_and_blanks: function() {
        return [{text: 'text'}, {blank: 'blank'}];
      }};
      var view = new ClozeView(cloze);
      view.texts_and_blanks().should.eql([{text: 'text', blank: null}, {blank: 'blank', text: null}]);
    end
  end
end