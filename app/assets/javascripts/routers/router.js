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

  customize: function () {
    var keysets = new ProKeys.Collections.Keysets()
    keysets.fetch();

    var view = new ProKeys.Views.Customize({
      collection: keysets
    });

    this._swapView(view);
  },

  record: function () {

    var view = new ProKeys.Views.Record();

    this._swapView(view);
  },

  account: function () {

    var view = new ProKeys.Views.Account();

    this._swapView(view);
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