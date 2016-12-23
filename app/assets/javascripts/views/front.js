ProKeys.Views.Front = Backbone.CompositeView.extend({
	template: JST['front'],

	initialize: function () {
		this.makeAudio();
	    $(document).on('keydown', _.bind(this.soundOn, this));
	    $(document).on('keyup', _.bind(this.soundOff, this));
	},

	render: function () {
		var content = this.template({});
		this.$el.html(content);
		this.startAnimation();
		return this;
	},

	makeAudio: function () {
		var that = this;
		this.audios = {}
		_.each(that.defaultKeys, function (value, key) {
			that.audios[key] = new Audio('../assets/notes/' + value + '.mp3')
		})
	},

	soundOn: function (event) {
		var audio = this.audios[event.keyCode]
		this.keyCode = event.keyCode
		if (audio && !$(audio).data("playing")) {
			audio.play().catch(function (e) {
				console.log("caught error but hopefully resolved by my haxor ways")
				this.audios[this.keyCode].pause()
				this.audios[this.keyCode] = new Audio('../assets/notes/' + this.defaultKeys[this.keyCode] + '.mp3')
			}.bind(this));
			$(audio).data("playing", true)
		}
	},

	soundOff: function (event) {
		var audio = this.audios[event.keyCode]
		if (audio && $(audio).data("playing")) {
			audio.pause();
			audio.currentTime = 0;
			$(audio).data("playing", false)
		}
	},
});