ProKeys.Views.Record = Backbone.CompositeView.extend({
	template: JST['record'],
	className: "margin",


	initialize: function () {
		this.keyboard = new ProKeys.Views.Keyboard()
		this.addSubview("#keyboard", this.keyboard)
		this.listenTo(this.collection, 'sync', this.render)
		this.listenTo(this.model, 'sync', this.render)
		this.listenTo(this.model, 'sync', this.keyboard.setNewKey)
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
			keyset: this.model
		});
		this.$el.html(content);
		// this.attachSubviews();
		this.addKeysetItems();
		this.$('.scroller').perfectScrollbar();
		return this;
	},
});