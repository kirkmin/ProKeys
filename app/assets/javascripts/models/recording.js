ProKeys.Models.Recording = Backbone.Model.extend({
  urlRoot: 'api/recordings',

  notes: function () {
    if (!this._notes) {
      this._notes = new ProKeys.Collections.Notes([], { recording: this });
    }

    return this._notes;
  },

  parse: function (response) {
    if (response.notes) {
      this.notes().set(response.notes, { parse: true });
      delete response.notes;
    }

    return response;
  }
});