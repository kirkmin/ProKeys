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
  loopNote(1);
  loopNote(2);
  loopNote(3);
  // window.addEventListener("keypress", soundOn1(event), false);
  // window.addEventListener("Keyup", soundOff1(event), false);
});
var audio = new Audio('assets/sound.wav');
$(window).keydown(function (e) {
  soundOn1(e, audio);
})

$(window).keyup(function (e) {
  soundOff1(e, audio);
})

function animateNote() {
  var height = $note.height() * 2,
      width = $note.width() * 2
 $(".note").animate(
    {
      height: height,
      width: width,
      opacity: 0,
    },
    1200,
    function() { $(this).remove(); }
  )
};

function createNote(num) {
  var top = Math.floor(Math.random() * 75),
      left = Math.floor(Math.random() * 87),
      number = Math.floor(Math.random() * 6) + 1
  $note = $( '<img />', {
    class: 'note',
    src: "assets/note" + number + ".png",
    style: "left:" + left + "%; top:" + top + "%;"
  });
  var name = "#notes" + num
  $(name).append( $note );
  animateNote();
};

function loopNote(num) {
    var rand = Math.round(Math.random() * 3500);
    setTimeout(function() {
      createNote(num);
      loopNote(num);  
    }, rand);
};

function soundOn1(event, audio) {
  if (event.keyCode == 65) {
    audio.play();
  }
};

function soundOff1(e, audio) {
    if (event.keyCode == 65) {
    audio.pause();
  }
};