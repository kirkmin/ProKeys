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
    var amountMovedX = (e.pageX * -1 / 10);
    var amountMovedY = (e.pageY * -1 / 10);
    $(this).css('background-position', amountMovedX + 'px ' + amountMovedY + 'px');
  });
  loopNote();
});


function animateNote() {
 $( ".note" ).animate(
    {
      height: 100,
      width: 100,
      opacity: 0,
    },
    1500,
    function() { $(this).remove(); }
  )
};

function createNote() {
  $note = $( '<img />', {
    class: 'note',
    src: "assets/eighth.png",
    height: '50',
    width: '50'
  });
  $(".notes").append( $note );
};

function loopNote() {
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    setTimeout(function() {
            createNote();
            animateNote();
            loopNote();  
    }, rand);
};


