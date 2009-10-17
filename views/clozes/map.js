function(doc) {
  if(doc['type'] == 'Cloze') {
    emit(doc['name'], null);
  };
};