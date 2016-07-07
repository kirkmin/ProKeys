ProKeys.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    // var dropDownView = new ProKeys.Views.DropDownView({
    //   collection: ProKeys.Collections.boards
    // });
    // $('#add-dropdown').append(dropDownView.render().$el);
    this.$rootEl = $('#main');
  },

  routes: {
    '': 'index'
  },

  index: function () {

    var view = new ProKeys.Views.Index();

    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});