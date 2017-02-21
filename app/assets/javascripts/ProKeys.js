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

  $(document).on("click", ".close", function () {
    $(".modal").css("display", "none")
  })

  $(window).on("click", function(event) {
    if (event.target.className == "modal") {
      $(".modal").css("display", "none")
    }
  })

  $("nav #right li").on("click", function () {
    $("#toggle")[0].checked = false;
  })

  $("nav #left li").on("click", function () {
    $("#toggle")[0].checked = false;
  })

  $(document).on('click',".closeFlash", function(e) {
    $(e.target.parentElement).remove()
  })
});