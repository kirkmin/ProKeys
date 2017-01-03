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
		console.log("set " + note.innerHTML + " at key " + key.innerHTML)
	}
})