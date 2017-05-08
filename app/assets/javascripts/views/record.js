ProKeys.Views.Record = Backbone.CompositeView.extend({
	template: JST['record'],

	events: {
		"click .keysetitem" : "setKeyset",
		"click #recButton" : "triggerRecord",
		"click #recSave" : "recordModal",
		"click #createRecording" : "createRecording",
		"click #playRecording" : "playRecording"
	},


	initialize: function () {
		this.currentlyRecording = false
		this.keyboard = new ProKeys.Views.Keyboard()
		this.listeners()
		this.timeouts = []
		this.listenTo(this.collection, 'sync', this.render)
		this.listenTo(this.model, 'sync', this.render)
		this.listenTo(this.model, 'sync', this.keyboard.setNewKey)
		$(document).on("modal-close", _.bind(this.turnOffRecording, this))
		$(document).on("modal-close", _.bind(this.listeners, this))
	},

	turnOffRecording: function () {
		var that = this;
		_.each(that.timeouts, function (timeout) {
			clearTimeout(timeout)
		})
		this.timeouts = []
		this.listeners()
	},

	listeners: function () {
		$(document).on('keydown', _.bind(this.keyDown, this));
	    $(document).on('keyup', _.bind(this.keyUp, this));
	},

	playRecording: function () {
		var that = this;
		_.each(that.recording, function (note) {
			var attr = note.split(", "),
				audio = that.audios[that.reverseObject[attr[0]]]
			that.timeouts.push(
				setTimeout(function () {
					audio.play()
					setTimeout(function () {
						audio.pause()
						audio.currentTime = 0
					}, attr[2])
				}, attr[1])
			)
		})
	},

	makeReverseObject: function () {
		this.reverseObject = {}
		var that = this
		_.each(this.model.attributes, function (value, key) {
			that.reverseObject[value] = key
		})
	},

	recordModal: function () {
		if (this.currentlyRecording == true) {
			this.triggerRecord()
		}
		if (this.recording == undefined || this.recording.length == 0 ) {
			ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>There are no notes to record.</div>'))
		} else {
			$("#saveRecording").css("display" , "block")
			$("body").css("overflow", "hidden")
			this.makeReverseObject()
			ProKeys._documentUnbind()
		}
	},

	createRecording: function (e) {
		e.preventDefault();
		var title = $("#newRecordingTitle").val(),
			duration = this.endTime.getTime() - this.startTime.getTime(),
			that = this
		ProKeys.Collections.recordings.create({
				title: title,
				duration: duration,
				notes_array: that.recording
			}, { wait: true,
				success: function (model) {
					ProKeys.flashOut($('<div class="flashSuccess"><button class="closeFlash">&times;</button>Successfully created recording!</div>'))
				},
				error: function (model, response) {
					ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>Could not save recording.</div>'))
				}
			}
		)
	},

	triggerRecord: function () {
		var that = this
		if (this.currentlyRecording) {
			//stop recording
			window.clearTimeout(this.timer)
			this.currentlyRecording = false
			this.endTime = new Date()
			$('#recButton').removeClass("Rec");
			$('#recButton').addClass("notRec");
		} else {
			//start recording
			this.timer = window.setTimeout( function () {
				if (that.currentlyRecording) {that.triggerRecord()}
				}, 180000)
			this.recording = []
			this.notes = {}
			this.currentlyRecording = true
			this.startTime = new Date()
			$('#recButton').removeClass("notRec");
			$('#recButton').addClass("Rec");
		}
	},

	keyDown: function (event) {
		var audio = this.audios[this.symbols[this.keyCodes[event.keyCode]] || this.keyCodes[event.keyCode]]
		if (audio && !$(audio).data("playing") && this.currentlyRecording) {
			var now = new Date()
			var note = this.model.attributes[this.keyCodes[event.keyCode]]
			this.notes[note] = now.getTime() - this.startTime.getTime()
		}
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
		if (audio && $(audio).data("playing") && this.currentlyRecording) {
			var now = new Date()
			var note = this.model.attributes[this.keyCodes[event.keyCode]]
			var duration = now.getTime() - this.startTime.getTime() - this.notes[note]
			this.recording.push(note + ", " + this.notes[note] + ", " + duration)
		}
		if (audio && $(audio).data("playing")) {
			audio.pause()
			audio.currentTime = 0;
			$(audio).data("playing", false)
		}
	},

	setKeyset: function (e) {
		this.model = this.collection.get($(e.currentTarget).find(".keysetBoard").data("keyset-id"))
		this.keyboard.setNewKey.call(this, this.model)
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
		this.addKeysetItems();
		this.$('.scroller').perfectScrollbar();
		return this;
	},
});

_.extend(ProKeys.Views.Record.prototype, ProKeys.Utils.SoundObjects);