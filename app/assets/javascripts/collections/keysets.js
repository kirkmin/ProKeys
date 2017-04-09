ProKeys.Collections.Keysets = Backbone.Collection.extend({
  model: ProKeys.Models.Keyset,
  url: 'api/keysets',

  getOrFetch: function (id) {
    var keyset = this.get(id);

    if (!keyset) {
      keyset = new ProKeys.Models.Keyset({ id: id });
      keyset.fetch({
        success: function () {
          this.add(keyset);
        }.bind(this)
      });
    } else {
      keyset.fetch();
    }

    return keyset;
  },

  getFirst: function () {
    var keyset = this.last()

    if(!keyset) {
      keyset = new ProKeys.Models.Keyset({ id: "first" })
      keyset.fetch({
        success: function () {
          this.add(keyset);
        }.bind(this)
      });
    } else {
      keyset.fetch();
    }

    return keyset;
  }
});

ProKeys.Collections.keysets = new ProKeys.Collections.Keysets()