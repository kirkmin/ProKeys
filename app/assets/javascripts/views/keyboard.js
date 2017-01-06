ProKeys.Views.Keyboard = Backbone.View.extend({
	template: JST['keyboard'],

	initialize: function () {
	},

	render: function () {
		var content = this.template({
			model: this.model
		})
		this.$el.html(content)
		return this;
	},

	setNewKey: function (model) {
		this.model = model
		_.each(this.model.attributes, function (value, key) {
			if (value && $("#" + key).length) {
				$("#" + key + "+ label .hover").text(value)
			} else if ($("#" + key).length) {
				$("#" + key + "+ label .hover").text("")
			}
		})
	},

	setNewNote: function (note, key) {
		if (!$(key).hasClass("unused")) {
			var keyString = this.symbols[key.innerHTML] || key.innerHTML
			$("#" + keyString + "+ label .hover").text(note.innerHTML)
		}
	},

	getKeyset: function () {
		var attrs = {};
		_.each($("#keyboard label:not(.unused)"), function (label) {
			if ($(label).find(".hover").text() != "") {
				attrs[$(label).find(".not").text()] = $(label).find(".hover").text()
			}
		})
		return attrs
	}
});
_.extend(ProKeys.Views.Keyboard.prototype, ProKeys.Utils.SoundObjects);