ProKeys.Views.Keyboard = Backbone.View.extend({
	template: JST['keyboard'],

	render: function () {
		var content = this.template()
		this.$el.html(content)
		return this;
	},

	setNewKey: function (model) {
		_.each(model.attributes, function (value, key) {
			if (value && $("#" + key).length) {
				$("#" + key + "+ label .hover").text(value.replace("b", "♭"))
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
		var that = this;
		_.each($("#keyboard label:not(.unused)"), function (label) {
			if ($(label).find(".hover").text() != "") {
				var not = that.symbols[$(label).find(".not").text()] || $(label).find(".not").text()
				attrs[not] = $(label).find(".hover").text().replace("♭", "b")
			}
		})
		return attrs
	}
});
_.extend(ProKeys.Views.Keyboard.prototype, ProKeys.Utils.SoundObjects);