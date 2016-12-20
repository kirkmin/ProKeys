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
  // Parallax
  $("body").mousemove(function(e){
    var amountMovedX = (e.pageX * -1 / 30);
    var amountMovedY = (e.pageY * -1 / 30);
    $(this).css('background-position', amountMovedX + 'px ' + amountMovedY + 'px');
  });

  // Modal logic
  $("#nav_grid").on("click", "#logInLink", function() {
    $("#logInModal").css("display", "block")
    $("#toggle")[0].checked = false
  })

  $("#nav_grid").on("click", "#signUpLink", function() {
      $("#signUpModal").css("display", "block")
    $("#toggle")[0].checked = false
  })

  $("#nav_grid").on("click", ".close", function () {
    $("#logInModal").css("display", "none")
    $("#signUpModal").css("display", "none")
  })

  $(window).on("click", function(event) {
      if (event.target == $("#logInModal")[0]) {
        $("#logInModal").css("display", "none")
      } else if (event.target == $("#signUpModal")[0]) {
        $("#signUpModal").css("display", "none")
      }
  })

  $("nav #right li").on("click", function () {
    $("#toggle")[0].checked = false;
  })
});