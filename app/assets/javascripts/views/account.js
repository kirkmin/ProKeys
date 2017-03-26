ProKeys.Views.Account = Backbone.CompositeView.extend({
	template: JST['account'],
	className: "margin",

	events: {
		"click .keysetitem" : "keysetItemModal",
		"click .customize" : "customize",
		"click #newKeyset" : "newKeysetModal",
		"click #newKeysetSubmit" : "createNewKeyset"
	},

	initialize: function () {
		this.listenTo(this.collection, 'sync add', this.render)
	},

	keysetItemModal: function (e) {
		var title = $(e.currentTarget).find("h2").text()
		var id = $(e.currentTarget).find(".keysetBoard").data("keyset-id")
		$("#keysetItemModal").find("h2").text("Edit: " + title)
		$("#keysetItemModal").data("keyset-id", id)
		$("#keysetItemModal").css("display", "block")
	},

	customize: function (e) {
		var id = $("#keysetItemModal").data("keyset-id")
		Backbone.history.navigate('customize/' + id, {trigger:true});
	},

	createNewKeyset: function (e) {4
		event.preventDefault();
		this.collection.create({
				title: $("#keysetTitle").val()
			}, { wait: true,
				error: function (model, response) {
					$("#error_grid").prepend('<div class="flashAlert"><button class="closeFlash">&times;</button>'+ response.responseJSON[0] +'</div>')
				}
			}
		)
		$("#newKeysetModal").css("display", "none")
	},

	newKeysetModal: function () {
		$("#newKeysetModal").css("display", "block")
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