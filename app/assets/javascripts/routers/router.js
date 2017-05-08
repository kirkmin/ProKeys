ProKeys.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    // var dropDownView = new ProKeys.Views.DropDownView({
    //   collection: ProKeys.Collections.boards
    // });
    // $('#add-dropdown').append(dropDownView.render().$el);
    this.$rootEl = $('#main');
  },

  routes: {
    '': 'front',
    'about' : 'about',
    'customize/:id' : 'customize',
    'customize' : 'customize',
    'record' : 'record',
    'record/:id' : 'record',
    'account' : 'account',
    'posts/index' : 'postIndex'
  },

  front: function () {
    ProKeys._documentUnbind()
    var view = new ProKeys.Views.Front();

    this._swapView(view);
  },

  about: function () {
    ProKeys._documentUnbind()
    var view = new ProKeys.Views.About();

    this._swapView(view);
  },

  customize: function (id) {
    $.ajax("session", {
      type: "get",
      success: function (data) {
        if (data) {
          var keysets = ProKeys.Collections.keysets
          var keyset = id ? keysets.getOrFetch(id) : keysets.getFirst()
          keysets.fetch();

          ProKeys._documentUnbind()
          var view = new ProKeys.Views.Customize({
            collection: keysets,
            model: keyset
          });

          this._swapView(view);
        } else {
          ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>Please Log In to access this Page</div>'))
          window.history.back()
        }
      }.bind(this)
    })
  },

  record: function (id) {
    $.ajax("session", {
      type: "get",
      success: function (data) {
        if (data) {
          var keysets = ProKeys.Collections.keysets
          var keyset = id ? keysets.getOrFetch(id) : keysets.getFirst()
          keysets.fetch();

          ProKeys._documentUnbind()
          var view = new ProKeys.Views.Record({
            collection: keysets,
            model: keyset
          });

          this._swapView(view);
        } else {
          ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>Please Log In to access this Page</div>'))
          window.history.back()
        }
      }.bind(this)
    })
  },

  account: function () {
    $.ajax("session", {
      type: "get",
      success: function (data) {
        if (data) {
          var keysets = ProKeys.Collections.keysets
          var recordings = ProKeys.Collections.recordings
          keysets.fetch();
          recordings.fetch();

          ProKeys._documentUnbind()
          var view = new ProKeys.Views.Account({
            collection: keysets,
            recordings: recordings
          });
          view.recordings = recordings

          this._swapView(view);
        } else {
          ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>Please Log In to access this Page</div>'))
          window.history.back()
        }
      }.bind(this)
    })
  },

  postIndex: function () {
    ProKeys._documentUnbind()
    var view = new ProKeys.Views.PostIndex();

    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  },
});

_.extend(ProKeys.Routers.Router.prototype, ProKeys.Utils.listeners);