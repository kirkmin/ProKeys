ProKeys.Views.PostIndex = Backbone.CompositeView.extend({
	template: JST['post_index'],

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