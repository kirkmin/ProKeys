_.extend(Backbone.View.prototype, {

	loopNote: function (num) {
		var rand = Math.round(Math.random() * 3500);
			that = this
		setTimeout(function() {
			that.createNote(num);
			that.loopNote(num);  
		}, rand);
	},

	createNote: function (num) {
		var top = Math.floor(Math.random() * 50),
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