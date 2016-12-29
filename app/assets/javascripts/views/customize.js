ProKeys.Views.Customize = Backbone.CompositeView.extend({
	template: JST['customize'],

	initialize: function () {
		this.listenTo(this.collection, 'sync', this.render)
	},

	addKeyboard: function () {
		var view = new ProKeys.Views.Keyboard()
		this.addSubview("#keyboard", view)
	},

	addPiano: function () {
		var view = new ProKeys.Views.Piano()
		this.addSubview("#piano", view)
	},

	renderScrollers: function () {
		this.addKeyboard()
		this.addPiano()
		this.$('.scroller').perfectScrollbar()
	},

	render: function () {
		var content = this.template({
			keysets: this.collection
		});
		this.$el.html(content);
		this.renderScrollers();
		return this;
	},
});