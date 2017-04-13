ProKeys.Views.Record = Backbone.CompositeView.extend({
	template: JST['record'],

	events: {
		"click .keysetitem" : "setKeyset",
		"click #recButton" : "triggerRecord"
	},


	initialize: function () {
		this.recording = false
		$('#recButton').addClass("notRec");
		this.keyboard = new ProKeys.Views.Keyboard()
	    $(document).on('keydown', _.bind(this.keyDown, this));
	    $(document).on('keyup', _.bind(this.keyUp, this));
		this.listenTo(this.collection, 'sync', this.render)
		this.listenTo(this.model, 'sync', this.render)
		this.listenTo(this.model, 'sync', this.keyboard.setNewKey)
	},

	triggerRecord: function () {
		if (this.recording) {
			//stop recording
			$('#recButton').removeClass("Rec");
			$('#recButton').addClass("notRec");
			this.recording = false
		} else {
			//start recording
			$('#recButton').removeClass("notRec");
			$('#recButton').addClass("Rec");
			this.recording = true
		}
	},

	keyDown: function (event) {
		var audio = this.audios[this.symbols[this.keyCodes[event.keyCode]] || this.keyCodes[event.keyCode]]
		if (audio && !$(audio).data("playing")) {
			$(audio).data("playing", true)
			audio.play().catch(function (e) {
				console.log("Caught Chrome error DOMException")
				this.audios[e.keyCode] = new Audio(this.soundPath[this.defaultKeys[e.keyCode]])
			}.bind(this, event));
		}
	},

	keyUp: function (event) {
		var audio = this.audios[this.symbols[this.keyCodes[event.keyCode]] || this.keyCodes[event.keyCode]]
		if (audio && $(audio).data("playing")) {
			audio.pause()
			audio.currentTime = 0;
			$(audio).data("playing", false)
		}
	},

	setKeyset: function (e) {
		this.model = this.collection.get($(e.currentTarget).find(".keysetBoard").data("keyset-id"))
		this.keyboard.setNewKey.call(this, this.model)
		debugger
		this.render()
	},

	addKeysetItem: function (keyset) {
		var view = new ProKeys.Views.KeysetItem({
			model: keyset,
		});
		this.addSubview(".keysets", view)
	},

	addKeysetItems: function () {
		var that = this
		this.removeSubviews(".keysets")
		this.collection.each(function (keyset) {
			that.addKeysetItem(keyset)
		});
	},

	render: function () {
		var content = this.template({
			keyset: this.model
		});
		this.$el.html(content);
		// this.attachSubviews();
		this.addKeysetItems();
		this.$('.scroller').perfectScrollbar();
		return this;
	},
});

_.extend(ProKeys.Views.Record.prototype, ProKeys.Utils.SoundObjects);