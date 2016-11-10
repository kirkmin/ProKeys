ProKeys.Views.Index = Backbone.CompositeView.extend({
	template: JST['index'],

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
			that.audios[that.keyCodes[key]] = new Audio('../assets/notes/' + value + ".mp3")
		})
	},

	soundOn: function (event) {
		this.audios[event.keyCode].play();
	},

	soundOff: function (event) {
		this.audios[event.keyCode].pause();
		this.audios[event.keyCode].currentTime = 0;
	},
});