ProKeys.Views.Record = Backbone.CompositeView.extend({
	template: JST['record'],
	className: "margin",


	initialize: function () {
	},

	render: function () {
		var content = this.template({});
		this.$el.html(content);
		return this;
	},
});