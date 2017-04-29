ProKeys.Views.RecordingItem = Backbone.View.extend({
	template: JST['recordingitem'],

	className: "recordingitem Btn",

	render: function () {
		var content = this.template({
			recording: this.model
		});
		this.$el.html(content);
		return this;
	},
});