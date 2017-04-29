ProKeys.currentUserId = null
$(document).trigger('log-out');
$("#nav_grid").html("<%= escape_javascript(render partial: 'layouts/navbar') %>");
$("body").css("overflow", "scroll")
Backbone.history.navigate("", {trigger: true})