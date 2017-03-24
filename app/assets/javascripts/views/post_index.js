ProKeys.Views.PostIndex = Backbone.CompositeView.extend({
	template: JST['post_index'],
	className: "margin",


	initialize: function () {
	},

	render: function () {
		var content = this.template({});
		this.$el.html(content);
		return this;
	},
});