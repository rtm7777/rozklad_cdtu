define(['jquery',
		'../views/dbContentView',
],function($, dbView) {
	$("#add_db").on("click", function() {
		var category = $("#database_categories .active").attr("data-category");
		dbView.addEmptyField(category);
	});

});