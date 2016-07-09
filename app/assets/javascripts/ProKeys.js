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
});


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
      num = Math.floor(Math.random() * 5) + 1
  $note = $( '<img />', {
    class: 'note',
    src: "assets/note" + num + ".png",
    style: "left:" + left + "%; top:" + top + "%;"
  });
  var name = "#notes" + num
  $(name).append( $note );
  animateNote();
};

function loopNote(num) {
    var rand = Math.round(Math.random() * 2000);
    setTimeout(function() {
      createNote(num);
      loopNote(num);  
    }, rand);
};


