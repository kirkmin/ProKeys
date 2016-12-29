ProKeys.Views.Piano = Backbone.View.extend({
	template: JST['piano'],

	initialize: function () {

	},

	render: function () {
		var content = this.template()
		this.$el.html(content)
		return this;
	}
})