define(['jquery',
		'../services/localStorage',
		'../views/dbContentView',
		'../config/messages',
],function($, storage, dbView, messages) {
	if ($("#page").data("id") == "database") {
		var storageCategory = storage.getValue("category");
		if (storageCategory) {
			// getCategory(storageCategory);
			dbView.setActiveCategory($("#database_categories a[data-category='" + storageCategory + "']"));
		}
	}

	$("#database_categories a").on("click", function(e) {
		e.preventDefault();
		dbView.setActiveCategory($(this));
		storage.saveValue("category", $(this).data("category"));
		getCategory($(this).data("category"));
	});

	function getCategory(category) {
		$.post('/get_category',
			{
				category: category
			})
		.done(function(data) {
			dbView.showDBContent();
			for (var item in data) {
				dbView.addRow(item);
			}
		})
		.fail(function() {
			dbView.hideDBContent();
		});
	}

});
