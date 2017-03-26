ProKeys.Views.About = Backbone.CompositeView.extend({
	template: JST['about'],


	initialize: function () {
	},

	render: function () {
		var content = this.template({});
		this.$el.html(content);
		this.startAnimation();
		return this;
	},
});

_.extend(ProKeys.Views.About.prototype, ProKeys.Utils.noteAnimation);