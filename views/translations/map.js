function(doc) {
  if(doc['type'] == 'Translation') {
    emit(doc['name'], null);
  };
};