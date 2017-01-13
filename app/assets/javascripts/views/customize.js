ProKeys.Views.Customize = Backbone.CompositeView.extend({
	template: JST['customize'],

	events: {
		"click .keysetitem" : "setKeyset",
		"click #save" : "saveKeyset",
	},

	initialize: function () {
		this.keyboard = new ProKeys.Views.Keyboard()
		this.piano = new ProKeys.Views.Piano()
		this.addSubview("#keyboard", this.keyboard)
		this.addSubview("#piano", this.piano)
		$(document).on('mousedown', _.bind(this.getPiano, this));
		$(document).on('mousemove', _.bind(this.moveNote, this));
		$(document).on('mouseup', _.bind(this.setKeyboard, this));
		this.listenTo(this.collection, 'sync', this.render)
		this.listenTo(this.collection, 'sync', this.setKeyset)
	},

	saveKeyset: function (e) {
		e.preventDefault();
		var that = this;
		if (this.model) {
			var attrs = this.keyboard.getKeyset()
			this.model.save(attrs, {
				success: function () {
					that.keyboard.setNewKey(that.model)
					$("#keysetTitle").text(that.model.attributes.title)
				}, error: function (e) {
					$("#error_grid").prepend('<div class="flashAlert"><button class="closeFlash">&times;</button>Unable to save. Found unacceptable value for note.</div>')
				}
			})
		}
	},

	saveNewKeyset: function () {

	},

	setKeyboard: function (e) {
		if (this.note && !this.note.length) {
			if ($.contains($("#keyboard")[0], e.target)) {
				this.keyboard.setNewNote(this.note, $(e.target).find("span")[0] || $(e.target)[0])
			}
			document.body.removeChild(this.note);
			this.note = null
		};
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
			this.note = document.createElement("span")
			this.note.id = "draggable"
		    this.note.style.top = (e.clientY - 15) + 'px';
		    this.note.style.left = (e.clientX - 15) + 'px';
			this.note.innerHTML = note.innerHTML
			document.body.appendChild(this.note);
		}
	},

	setKeyset: function (e) {
		this.model = this.collection.get($(e.currentTarget).find(".keysetBoard").data("keyset-id")) || this.collection.first()
		if (this.model) {
			this.keyboard.setNewKey(this.model)
			$("#keysetTitle").text(this.model.attributes.title)
		}
	},

	addKeysetItem: function (keyset) {
		var view = new ProKeys.Views.KeysetItem({
			model: keyset,
		});
		this.addSubview("#keysets", view)
	},

	addKeysetItems: function () {
		var that = this
		this.collection.each(function (keyset) {
			that.addKeysetItem(keyset)
		});
	},

	render: function () {
		var content = this.template({
			keysets: this.collection
		});
		this.$el.html(content);
		this.addKeysetItems()
		this.attachSubviews();
		this.$('.scroller').perfectScrollbar();
		return this;
	},

	remove: function (e) {
		$(document).unbind('mousemove');
	    $(document).unbind('mousedown');
	    $(document).unbind('mouseup');
	    Backbone.View.prototype.remove.call(this);
	}
});