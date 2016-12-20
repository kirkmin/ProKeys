window.ProKeys = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    var $root = $('#main');
    new ProKeys.Routers.Router();
    Backbone.history.start();
  },
};

$(document).ready(function(){
  $("body").mousemove(function(e){
    var amountMovedX = (e.pageX * -1 / 30);
    var amountMovedY = (e.pageY * -1 / 30);
    $(this).css('background-position', amountMovedX + 'px ' + amountMovedY + 'px');
  });
});