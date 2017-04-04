ProKeys.Views.Account = Backbone.CompositeView.extend({
	template: JST['account'],
	className: "margin",

	events: {
		"click .keysetitem" : "keysetItemModal",
		"click #customize" : "customize",
		"click #edit" : "edit",
		"click #delete" : "delete",
		"click #newKeyset" : "newKeysetModal",
		"click #newKeysetSubmit" : "createNewKeyset"
	},

	initialize: function () {
		this.listenTo(this.collection, 'sync add remove', this.render)
	},

	keysetItemModal: function (e) {
		var title = $(e.currentTarget).find("h2").text()
		var id = $(e.currentTarget).find(".keysetBoard").data("keyset-id")
		this.keyset = this.collection.get(id)
		var height = $("html").height();
		$("#editKeysetTitle").val(title)
		$("#keysetItemModal").find("h2").text("Edit: " + title)
		$("#keysetItemModal").data("keyset-id", id)
		$("#keysetItemModal").css({"display" : "block", "height" : height})
	},

	customize: function (e) {
		var id = $("#keysetItemModal").data("keyset-id")
		Backbone.history.navigate('customize/' + id, {trigger:true});
	},


	edit: function (e) {
		this.keyset.save({
				title: $("#editKeysetTitle").val()
			}, {
				success: function (model) {
					ProKeys.flashOut($('<div class="flashSuccess"><button class="closeFlash">&times;</button>Successfully edited ' + model.attributes.title + '!</div>'))
				}, error: function (model, response) {
					ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>'+ response.responseJSON[0] +'</div>'))
				}
		})
	},

	delete: function (e) {
		var result = confirm("Are you sure you want to delete the keyset " + this.keyset.attributes.title)
		if (result) {
			this.keyset.destroy({
				success: function () {
					ProKeys.flashOut($('<div class="flashSuccess"><button class="closeFlash">&times;</button>Delete Successful!</div>'))
				}, error: function (model, response) {
					ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>'+ response.responseJSON[0] +'</div>'))
				}
			});
		}
	},

	createNewKeyset: function (e) {4
		event.preventDefault();
		this.collection.create({
				title: $("#newKeysetTitle").val()
			}, { wait: true,
				success: function (model) {
					ProKeys.flashOut($('<div class="flashSuccess"><button class="closeFlash">&times;</button>Created new keyset ' + model.attributes.title +'!</div>'))
				}, error: function (model, response) {
					ProKeys.flashOut($('<div class="flashAlert"><button class="closeFlash">&times;</button>'+ response.responseJSON[0] +'</div>'))
				}
			}
		)
		$("#newKeysetModal").css("display", "none")
	},

	newKeysetModal: function () {
		var height = $("html").height();
		$("#newKeysetModal").css({"display" : "block", "height" : height})
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