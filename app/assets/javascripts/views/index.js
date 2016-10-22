ProKeys.Views.Index = Backbone.CompositeView.extend({
	template: JST['index'],

	initialize: function () {
		this.audio = new Audio('../assets/sound.wav');
	    $(document).on('keydown', _.bind(this.soundOn, this));
	    $(document).on('keyup', _.bind(this.soundOff, this));
	},

	render: function () {
		var content = this.template({});
		this.$el.html(content);
		this.startAnimation();
		return this;
	},

	click: function () {
		console.log("CLICKED")
	},

	soundOn: function (event) {
		if (event.keyCode == 65) {
			this.audio.play();
		}
	},

	soundOff: function (event) {
		if (event.keyCode == 65) {
			this.audio.pause();
			this.audio.currentTime = 0
		}
	},

	loopNote: function (num) {
		var rand = Math.round(Math.random() * 3500);
			that = this
		setTimeout(function() {
			that.createNote(num);
			that.loopNote(num);  
		}, rand);
	},

	createNote: function (num) {
		var top = Math.floor(Math.random() * 75),
			left = Math.floor(Math.random() * 87),
			number = Math.floor(Math.random() * 6) + 1
		$note = $( '<img />', {
			class: 'note',
			src: "assets/note" + number + ".png",
			style: "left:" + left + "%; top:" + top + "%;",
			draggable: false
		});
		var name = "#notes" + num
		$(name).append( $note );
		this.animateNote();
	},

	animateNote: function () {
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
	},

	startAnimation: _.once(function () {
		this.loopNote(1);
		this.loopNote(2);
		this.loopNote(3);
	}),
});