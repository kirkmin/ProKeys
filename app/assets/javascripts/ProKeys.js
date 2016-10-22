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
  $(".bg").mousemove(function(e){
    var amountMovedX = (e.pageX * -1 / 30);
    var amountMovedY = (e.pageY * -1 / 30);
    $(this).css('background-position', amountMovedX + 'px ' + amountMovedY + 'px');
  });
});

// var audio = new Audio('assets/sound.wav');
// $(window).keydown(function (e) {
//   soundOn1(e, audio);
// })

// $(window).keyup(function (e) {
//   soundOff1(e, audio);
// })

// function soundOn1(event, audio) {
//   if (event.keyCode == 65) {
//     // audio.currentTime = 0
//     audio.play();
//   }
// };

// function soundOff1(e, audio) {
//     if (event.keyCode == 65) {
//       audio.currentTime = 0
//       audio.pause();
//   }
// };