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
    'account' : 'account',
    'posts/index' : 'postIndex'
  },

  front: function () {

    var view = new ProKeys.Views.Front();

    this._swapView(view);
  },

  about: function () {

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

  record: function () {
    $.ajax("session", {
      type: "get",
      success: function (data) {
        if (data) {
          var view = new ProKeys.Views.Record();

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
          keysets.fetch();

          var view = new ProKeys.Views.Account({
            collection: keysets
          });

          this._swapView(view);
        } else {
          ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>Please Log In to access this Page</div>'))
          window.history.back()
        }
      }.bind(this)
    })
  },

  postIndex: function () {
    var view = new ProKeys.Views.PostIndex();

    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});