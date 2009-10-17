Sammy.Mustache = function(app) {
  app.helpers({
    mustache: function(template, data) {
      return Mustache.render(template, data);
    }
  })
};
