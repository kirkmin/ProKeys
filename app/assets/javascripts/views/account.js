ProKeys.Views.Account = Backbone.CompositeView.extend({
	template: JST['account'],

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