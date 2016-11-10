ProKeys.Views.About = Backbone.CompositeView.extend({
	template: JST['about'],

	initialize: function () {
		$(document).unbind('keypress');
		$(document).unbind('keyup');
	},

	render: function () {
		var content = this.template({});
		this.$el.html(content);
		return this;
	},
});