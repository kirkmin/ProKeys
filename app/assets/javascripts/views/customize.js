ProKeys.Views.Customize = Backbone.CompositeView.extend({
	template: JST['customize'],

	events: {
		"click #keysets li" : "setKeyset"
	},

	initialize: function () {
		this.keyboard = new ProKeys.Views.Keyboard()
		this.piano = new ProKeys.Views.Piano()
		$(document).on('mousedown', _.bind(this.getPiano, this));
		$(document).on('mousemove', _.bind(this.moveNote, this));
		$(document).on('mouseup', _.bind(this.setKeyboard, this));
		this.listenTo(this.collection, 'sync', this.render)
		this.listenTo(this.collection, 'sync', this.setKeyset)
	},

	renderScrollers: function () {
		this.addSubview("#keyboard", this.keyboard)
		this.addSubview("#piano", this.piano)
		this.$('.scroller').perfectScrollbar()
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
			this.note.innerHTML = note.innerHTML
			document.body.appendChild(this.note);
		}
	},

	setKeyset: function (e) {
		var model = this.collection.get($(e.currentTarget).data("keyset-id")) || this.collection.first()
		this.keyboard.setNewKey(model)
	},

	render: function () {
		var content = this.template({
			keysets: this.collection
		});
		this.$el.html(content);
		this.renderScrollers();
		return this;
	},

	remove: function (e) {
		$(document).unbind('mousemove');
	    $(document).unbind('mousedown');
	    $(document).unbind('mouseup');
	    Backbone.View.prototype.remove.call(this);
	}
});