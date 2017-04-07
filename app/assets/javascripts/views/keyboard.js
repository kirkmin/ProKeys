ProKeys.Views.Keyboard = Backbone.View.extend({
	template: JST['keyboard'],

	render: function () {
		var content = this.template()
		this.$el.html(content)
		return this;
	},

	setNewKey: function (model) {
		debugger
		var that = this;
		this.audios = {}
		_.each(model.attributes, function (value, key) {
			if (value && $("#" + key).length) {
				that.audios[key] = new Audio(that.soundPath[value])
				$(that.audios[key]).data("playing", false)
				$("#" + key + "+ label .hover").text(value.replace("b", "♭"))
			} else if ($("#" + key).length) {
				$("#" + key + "+ label .hover").text("")
			}
		})
	},

	setNewNote: function (note, key, view) {
		if (!$(key).hasClass("unused")) {
			var keyString = this.symbols[key.innerHTML] || key.innerHTML
			var noteString = note.innerHTML.replace("♭", "b")
			$("#" + keyString + "+ label .hover").text(note.innerHTML)
			view.audios[keyString] = new Audio(this.soundPath[noteString])
			$(view.audios[keyString]).data("playing", false)
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