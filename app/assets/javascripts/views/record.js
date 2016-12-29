ProKeys.Views.Record = Backbone.CompositeView.extend({
	template: JST['record'],

	initialize: function () {
	},

	render: function () {
		var content = this.template({});
		this.$el.html(content);
		return this;
	},
});