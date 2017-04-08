ProKeys.Views.Customize = Backbone.CompositeView.extend({
	template: JST['customize'],

	events: {
		"click #save" : "saveKeyset",
		"click .keysetitem" : "setKeyset"
	},

	initialize: function () {
		this.keyboard = new ProKeys.Views.Keyboard()
		this.piano = new ProKeys.Views.Piano()
		this.addSubview("#keyboard", this.keyboard)
		this.addSubview("#piano", this.piano)
		$(document).on('mousedown', _.bind(this.getPiano, this));
		$(document).on('mousemove', _.bind(this.moveNote, this));
		$(document).on('mouseup', _.bind(this.setKeyboard, this));
	    $(document).on('keydown', _.bind(this.soundOn, this));
	    $(document).on('keyup', _.bind(this.soundOff, this));
		this.listenTo(this.collection, 'sync', this.render)
		this.listenTo(this.model, 'sync', this.render)
		this.listenTo(this.model, 'sync', this.keyboard.setNewKey)
	},

	soundOn: function (event) {
		var audio = this.audios[this.symbols[this.keyCodes[event.keyCode]] || this.keyCodes[event.keyCode]]
		if (audio && !$(audio).data("playing")) {
			$(audio).data("playing", true)
			audio.play().catch(function (e) {
				console.log("Caught Chrome error DOMException")
				this.audios[e.keyCode] = new Audio(this.soundPath[this.defaultKeys[e.keyCode]])
			}.bind(this, event));
		} else if (event.keyCode == 16) {
			$("#keyboard label .hover").addClass("active")
			$("#keyboard label .not").addClass("active")
		}
	},

	soundOff: function (event) {
		var audio = this.audios[this.symbols[this.keyCodes[event.keyCode]] || this.keyCodes[event.keyCode]]
		if (audio && $(audio).data("playing")) {
			audio.pause()
			audio.currentTime = 0;
			$(audio).data("playing", false)
		} else if (event.keyCode == 16) {
			$("#keyboard label .hover").removeClass("active")
			$("#keyboard label .not").removeClass("active")
		}
	},

	saveKeyset: function (e) {
		e.preventDefault();
		var that = this;
		var attrs = this.keyboard.getKeyset()
		this.model.save(attrs, {
			success: function () {
				ProKeys.flashOut($('<div class="flashSuccess"><button class="closeFlash">&times;</button>Save successful!</div>'))
			}, error: function (model, response) {
				ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>Unable to save. Found unacceptable value for note.</div>'))
			}
		})
	},

	setKeyboard: function (e) {
		if (this.note && !this.note.length) {
			if ($.contains($("#keyboard")[0], e.target)) {
				this.keyboard.setNewNote(this.note, $(e.target).find("span")[0] || $(e.target)[0], this)
			}
			document.body.removeChild(this.note);
			this.note = null
		}
		if (this.audio) {
			this.audio.pause();
			this.audio = null
		}
	},

	moveNote: function (e) {
		if (this.note && !this.note.length) {
		    this.note.style.top = (e.clientY - 15) + 'px';
		    this.note.style.left = (e.clientX - 15) + 'px';
		}
	},

	getPiano: function (e) {
		if ($.contains($("#piano")[0], e.target)) {
			var note = $(e.target).find("span")[0] || $(e.target)[0]
			this.audio = new Audio(this.soundPath[note.innerHTML.replace("♭","b")])
			this.audio.play()
			if (this.note) { document.body.removeChild(this.note) }
			this.note = document.createElement("span")
			this.note.id = "draggable"
		    this.note.style.top = (e.clientY - 15) + 'px';
		    this.note.style.left = (e.clientX - 15) + 'px';
			this.note.innerHTML = note.innerHTML
			document.body.appendChild(this.note);
		} else if ($.contains($("#keyboard")[0], e.target)) {
			var note = $(e.target).closest("label")[0].htmlFor
			this.audio = this.audios[note]
			if (this.audio) { this.audio.play() }
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
		this.attachSubviews();
		this.addKeysetItems();
		this.$('.scroller').perfectScrollbar();
		return this;
	},

	remove: function (e) {
		$(document).unbind('mousemove');
	    $(document).unbind('mousedown');
	    $(document).unbind('mouseup');
	    $(document).unbind('keydown');
	    $(document).unbind('keyup');
	    Backbone.View.prototype.remove.call(this);
	}
});

_.extend(ProKeys.Views.Customize.prototype, ProKeys.Utils.SoundObjects);