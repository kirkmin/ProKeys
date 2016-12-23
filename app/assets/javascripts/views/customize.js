ProKeys.Views.Customize = Backbone.CompositeView.extend({
	template: JST['customize'],

	initialize: function () {
		$(document).unbind('keydown');
		$(document).unbind('keyup');
	},

	render: function () {
		var content = this.template({});
		this.$el.html(content);
		return this;
	},
});