ProKeys.Views.Account = Backbone.CompositeView.extend({
	template: JST['account'],

	initialize: function () {
		this.listenTo(this.collection, 'sync', this.render)
	},

	addKeysetItem: function (keyset) {
		var view = new ProKeys.Views.KeysetItem({
			model: keyset,
		});
		this.addSubview(".keysets", view)
	},

	addKeysetItems: function () {
		var that = this
		this.removeSubviews(".keysets")
		this.collection.each(function (keyset) {
			that.addKeysetItem(keyset)
		});
	},

	render: function () {
		var content = this.template({
			keysets: this.collection
		});
		this.$el.html(content);
		this.addKeysetItems();
		this.attachSubviews();
		this.$('.scroller').perfectScrollbar();
		return this;
	},
});