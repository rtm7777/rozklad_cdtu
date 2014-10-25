define(['jquery',
		'../services/localStorage',
		'../views/dbContentView',
		'../config/messages',
],function($, dbView, messages) {
	$("#database_categories a").on("click", function(e) {
		e.preventDefault();
		dbView.setActiveCategory(this);

		getCategory($(this).attr("data-faculty-id"), $("#year_sel a.dropdown-toggle").attr("data-year"));
	});
});
