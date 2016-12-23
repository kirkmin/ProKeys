ProKeys.Views.Record = Backbone.CompositeView.extend({
	template: JST['record'],

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