ProKeys.Collections.Recordings = Backbone.Collection.extend({
  model: ProKeys.Models.Recording,
  url: 'api/recordings',

  getOrFetch: function (id) {
    var recording = this.get(id);

    if (!recording) {
      recording = new ProKeys.Models.Recording({ id: id });
      recording.fetch({
        success: function () {
          this.add(recording);
        }.bind(this)
      });
    } else {
      recording.fetch();
    }

    return recording;
  }
});

ProKeys.Collections.recordings = new ProKeys.Collections.Recordings()