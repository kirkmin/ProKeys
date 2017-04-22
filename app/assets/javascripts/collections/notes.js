ProKeys.Collections.Notes = Backbone.Collection.extend({
  model: ProKeys.Models.Note,
  url: 'api/notes',

  initialize: function (models, options) {
    this.recording = options.recording;
  }
});
