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

  //flash auto disappear
  flashOut : function ($flash) {
    $("#error_grid").prepend($flash)
    setTimeout( 
      function() {         
        $flash.fadeTo("slow", 0.00, function(){ //fade
          $(this).slideUp("slow", function() { //slide up
            $(this).remove(); //then remove from the DOM
          });
      }); }
      , 10000
    );
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
    var height = $("html").height();
    $("#logInModal").css({"display" : "block", "height" : height})
    $("#toggle")[0].checked = false
  })

  $("#nav_grid").on("click", "#signUpLink", function() {
    var height = $("html").height();
    $("#signUpModal").css({"display" : "block", "height" : height})
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