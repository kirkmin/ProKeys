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
			that.audios[key] = new Audio(that.soundPath[value])
			$(that.audios[key]).data("playing", false)
		})
	},

	soundOn: function (event) {
		var audio = this.audios[event.keyCode]
		if (audio && !$(audio).data("playing")) {
			$(audio).data("playing", true)
			audio.play().catch(function (e) {
				console.log("Caught Chrome error DOMException")
				this.audios[e.keyCode] = new Audio(this.soundPath[this.defaultKeys[e.keyCode]])
			}.bind(this, event));
		}
	},

	soundOff: function (event) {
		var audio = this.audios[event.keyCode]
		if (audio && $(audio).data("playing")) {
			audio.pause()
			audio.currentTime = 0;
			$(audio).data("playing", false)
		}
	},

	remove: function (e) {
	    $(document).unbind('keydown');
	    $(document).unbind('keyup');
	    Backbone.View.prototype.remove.call(this);
	}
});

_.extend(ProKeys.Views.Front.prototype, ProKeys.Utils.SoundObjects);
_.extend(ProKeys.Views.Front.prototype, ProKeys.Utils.noteAnimation);