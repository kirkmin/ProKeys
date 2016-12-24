ProKeys.Views.Front = Backbone.CompositeView.extend({
	template: JST['front'],

	initialize: function () {
		this.makeAudio();
	    $(document).on('keydown', _.bind(this.soundOn, this));
	    $(document).on('keyup', _.bind(this.soundOff, this));
	    $(this).on("DOMException", function (e, code) {
	    	this.audios[code] = this.audios[code] || new Audio('../assets/notes/' + this.defaultKeys[code] + '.mp3')
	    	this.audios[code].pause()
	    	$(this.audios[code]).data("playing", false)
	    })
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
			$(that.audios[key]).data("playing", false)
		})
	},

	soundOn: function (event) {
		var audio = this.audios[event.keyCode]
		if (audio && !$(audio).data("playing")) {
			$(audio).data("playing", true)
			audio.play().catch(function (e) {
				console.log("Caught Chrome error DOMException")
				this.audios[e.keyCode] = new Audio('../assets/notes/' + this.defaultKeys[e.keyCode] + '.mp3')
				$(this).trigger("DOMException", [e.keyCode]) // insure that there is audio & is ready to play on next press...
			}.bind(this, event));
		}
	},

	soundOff: function (event) {
		var audio = this.audios[event.keyCode]
		if (audio && $(audio).data("playing")) {
			audio.pause()
			audio.currentTime = 0;
			$(audio).data("playing", false)
		} else if (audio && !$(audio).data("playing")) {
			debugger
			$(audio).data("playing", false)
		}
	},
});