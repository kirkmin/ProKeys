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
  },

  notes: function () {
    if (!this._notes) {
      this._notes = new ProKeys.Collections.Notes([], { recording: this });
    }
    return this._notes;
  },

  parse: function (resp) {
    if (resp.notes) {
      this.notes().set(resp.notes);
      delete resp.notes;
    }
    return resp;
  }
});

ProKeys.Collections.recordings = new ProKeys.Collections.Recordings()