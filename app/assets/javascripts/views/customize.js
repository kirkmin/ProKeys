ProKeys.Views.Customize = Backbone.CompositeView.extend({
	template: JST['customize'],

	events: {
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
		this.listenTo(this.model, 'sync', this.keyboard.setNewKey)
		this.listenTo(this.model, 'sync', this.render)
	},

	saveKeyset: function (e) {
		e.preventDefault();
		var that = this;
		var attrs = this.keyboard.getKeyset()
		this.model.save(attrs, {
			success: function () {
				that.keyboard.setNewKey(that.model)
				$("#error_grid").prepend('<div class="flashSuccess"><button class="closeFlash">&times;</button>Save successful!</div>')
			}, error: function (model, response) {
				$("#error_grid").prepend('<div class="flashAlert"><button class="closeFlash">&times;</button>Unable to save. Found unacceptable value for note.</div>')
			}
		})
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

	render: function () {
		var content = this.template({
			keyset: this.model
		});
		this.$el.html(content);
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