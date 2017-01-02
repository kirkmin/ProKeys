ProKeys.Views.Customize = Backbone.CompositeView.extend({
	template: JST['customize'],

	events: {
		"mouseup #keyboard label" : "getKeyboard",
		"mousedown #piano label" : "setPiano",
		"click #keysets li" : "setKeyset"
	},

	initialize: function () {
		this.keyboard = new ProKeys.Views.Keyboard()
		this.piano = new ProKeys.Views.Piano()
		this.listenTo(this.collection, 'sync', this.render)
		this.listenTo(this.collection, 'sync', this.setKeyset)
	},

	addKeyboard: function () {
		this.addSubview("#keyboard", this.keyboard)
	},

	addPiano: function () {
		this.addSubview("#piano", this.piano)
	},

	renderScrollers: function () {
		this.addKeyboard()
		this.addPiano()
		this.$('.scroller').perfectScrollbar()
	},

	getKeyboard: function (e) {
		debugger
	},

	setPiano: function (e) {
		debugger
	},

	setKeyset: function (e) {
		var model = this.collection.get($(e.currentTarget).data("keyset-id")) || this.collection.first()
		this.keyboard.setNewKey(model)
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