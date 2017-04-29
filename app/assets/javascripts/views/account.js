ProKeys.Views.Account = Backbone.CompositeView.extend({
	template: JST['account'],

	events: {
		"click .keysetitem" : "keysetItemModal",
		"click #customizeKeyset" : "customizeKeyset",
		"click #editKeyset" : "editKeyset",
		"click #deleteKeyset" : "deleteKeyset",
		"click #newKeyset" : "newKeysetModal",
		"click #newKeysetSubmit" : "createNewKeyset",
		"click .recordingitem" : "recordingModal",
		"click #editRecording" : "editRecording",
		"click #deleteRecording" : "deleteRecording",
		"click #playRecording" : "playRecording"
	},

	initialize: function (options) {
		this.recordings = options.recordings
		this.listenTo(this.recordings, 'sync remove', this.render)
		this.listenTo(this.collection, 'sync add remove', this.render)
	},

	playRecording: function (e) {
		var that = this;
		_.each(that.recording.notes().models, function (note) {
			var attr = note.attributes,
				audio = that.audios[attr.pitch]
			setTimeout(function () {
				audio.play()
				setTimeout(function () {
					audio.pause()
					audio.currentTime = 0
				}, attr.duration)
			}, attr.start)
		})
	},

	makeAudio: function () {
		var that = this;
		this.audios = {}
		_.each(that.recording.notes().models, function (note) {
			if (!that.audios[note.attributes.pitch]) {that.audios[note.attributes.pitch] = new Audio(that.soundPath[note.attributes.pitch])}
		})
	},

	recordingModal: function (e) {
		var title = $(e.currentTarget).find("h3").text()
		var id = $(e.currentTarget).find(".recordingBoard").data("recording-id")
		var that = this
		this.recording = new ProKeys.Models.Recording({ id: id })
		this.recording.fetch({
			success: function () {
				$("#editRecordingTitle").val(title)
				$("#recordingItemModal").find("h2").text("Edit: " + title)
				$("#recordingItemModal").css("display" , "block")
				$("body").css("overflow", "hidden")
				that.makeAudio()
			}
		})
	},

	keysetItemModal: function (e) {
		var title = $(e.currentTarget).find("h3").text()
		var id = $(e.currentTarget).find(".keysetBoard").data("keyset-id")
		this.keyset = this.collection.get(id)
		$("#editKeysetTitle").val(title)
		$("#keysetItemModal").find("h2").text("Edit: " + title)
		$("#keysetItemModal").css("display" , "block")
		$("body").css("overflow", "hidden")
	},

	customizeKeyset: function (e) {
		var id = this.keyset.attributes.id
		$("body").css("overflow", "scroll")
		Backbone.history.navigate('customize/' + id, {trigger:true});
	},


	editKeyset: function (e) {
		this.keyset.save({
			title: $("#editKeysetTitle").val()
		}, {
			success: function (model) {
				ProKeys.flashOut($('<div class="flashSuccess"><button class="closeFlash">&times;</button>Successfully edited ' + model.attributes.title + '!</div>'))
			}, error: function (model, response) {
				if (response.responseJSON[0]) {
					ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>'+ response.responseJSON[0] +'</div>'))
				} else {
					ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>No change has been detected</div>'))
				}
			}
		})
		$("body").css("overflow", "scroll")
	},

	editRecording: function (e) {
		this.recording.save({
			title: $("#editRecordingTitle").val()
		}, {
			success: function (model) {
				ProKeys.flashOut($('<div class="flashSuccess"><button class="closeFlash">&times;</button>Successfully edited ' + model.attributes.title + '!</div>'))
			}, error: function (model, response) {
				if (response.responseJSON[0]) {
					ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>'+ response.responseJSON[0] +'</div>'))
				} else {
					ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>No change has been detected</div>'))
				}
			}
		})
		$("body").css("overflow", "scroll")
	},

	deleteKeyset: function (e) {
		var result = confirm("Are you sure you want to delete the keyset " + this.keyset.attributes.title)
		if (result) {
			this.keyset.destroy({
				success: function () {
					ProKeys.flashOut($('<div class="flashSuccess"><button class="closeFlash">&times;</button>Delete Successful!</div>'))
				}, error: function (model, response) {
					if (response.responseJSON[0]) {
						ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>'+ response.responseJSON[0] +'</div>'))
					} else {
						ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>Could Not Delete Keyset</div>'))
					}
				}
			});
		}
		$("body").css("overflow", "scroll")
	},

	deleteRecording: function (e) {
		var result = confirm("Are you sure you want to delete the recording " + this.recording.attributes.title)
		if (result) {
			this.recording.destroy({
				success: function () {
					ProKeys.flashOut($('<div class="flashSuccess"><button class="closeFlash">&times;</button>Delete Successful!</div>'))
				}, error: function (model, response) {
					if (response.responseJSON[0]) {
						ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>'+ response.responseJSON[0] +'</div>'))
					} else {
						ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>Could Not Delete Recording</div>'))
					}
				}
			});
		}
		$("body").css("overflow", "scroll")
	},

	createNewKeyset: function (e) {4
		event.preventDefault();
		this.collection.create({
				title: $("#newKeysetTitle").val()
			}, { wait: true,
				success: function (model) {
					ProKeys.flashOut($('<div class="flashSuccess"><button class="closeFlash">&times;</button>Created new keyset ' + model.attributes.title +'!</div>'))
				}, error: function (model, response) {
					ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>'+ response.responseJSON[0] +'</div>'))
				}
			}
		)
		$("#newKeysetModal").css("display", "none")
		$("body").css("overflow", "scroll")
	},

	newKeysetModal: function () {
		$("#newKeysetModal").css("display", "block")
		$("body").css("overflow", "hidden")
	},

	addKeysetItem: function (keyset) {
		var view = new ProKeys.Views.KeysetItem({
			model: keyset,
		});
		this.addSubview(".keysets", view)
	},

	addRecording: function (recording) {
		var view = new ProKeys.Views.RecordingItem({
			model: recording,
		})
		this.addSubview(".recordings", view)
	},

	addItems: function () {
		var that = this
		this.removeSubviews(".keysets")
		this.removeSubviews(".recordings")
		this.collection.each(function (keyset) {
			that.addKeysetItem(keyset)
		});
		this.recordings.each(function (recording) {
			that.addRecording(recording)
		})
	},

	render: function () {
		var content = this.template({
			keysets: this.collection
		});
		this.$el.html(content);
		this.addItems();
		this.attachSubviews();
		this.$('.scroller').perfectScrollbar();
		return this;
	},
});

_.extend(ProKeys.Views.Account.prototype, ProKeys.Utils.SoundObjects);