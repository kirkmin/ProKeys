ProKeys.Views.KeysetItem = Backbone.View.extend({
	template: JST['keysetitem'],

	className: "keysetitem",

	render: function () {
		var content = this.template({
			keyset: this.model
		});
		this.$el.html(content);
		return this;
	},
});