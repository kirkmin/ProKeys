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

  _documentUnbind: function () {
    $(document).off('mousedown');
    $(document).off('mousemove');
    $(document).off('mouseup');
    $(document).off('keydown');
    $(document).off('keyup');
  }
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
    $("body").css("overflow", "hidden")
    $("#toggle")[0].checked = false
    ProKeys._documentUnbind()
  })

  $("#nav_grid").on("click", "#signUpLink", function() {
    $("#signUpModal").css("display", "block")
    $("body").css("overflow", "hidden")
    $("#toggle")[0].checked = false
    ProKeys._documentUnbind()
  })

  $(document).on("click", ".close", function () {
    $(".modal").css("display", "none")
    $("body").css("overflow", "scroll")
    $(document).trigger('modal-close');
  })

  $(window).on("click", function(event) {
    if (event.target.className == "modal") {
      $(".modal").css("display", "none")
      $("body").css("overflow", "scroll")
      $(document).trigger('modal-close');
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