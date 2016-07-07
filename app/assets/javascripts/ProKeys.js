window.ProKeys = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    var $root = $('#main');
    this.currentUserId = $root.data('current-user');
    new ProKeys.Routers.Router();
    Backbone.history.start();
  },
};

$(document).ready(function(){
   $(".bg").interactive_bg();
   $("#btns").interactive_bg({
     strength: 10,
     scale: 0,
     contain: false,
     wrapContent: true
   });
});

$(window).resize(function() {
  $(".wrapper > .ibg-bg").css({
    width: $(window).outerWidth(),
    height: $(window).outerHeight()
  })
})