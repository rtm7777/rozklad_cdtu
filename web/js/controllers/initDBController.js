define(['jquery',
		'../config/config',
		'../services/localStorage',
		'../views/dbContentView',
		'../config/messages',
], ($, config, storage, dbView, messages) => {
	if ($("#page").data("id") == "database") {
		var storageCategory = storage.getValue("category");
		if (storageCategory) {
			getCategory(storageCategory);
			dbView.setActiveCategory($("#database_categories a[data-category='" + storageCategory + "']"));
		}
	}

	$("#database_categories a").on("click", (e) => {
		e.preventDefault();
		dbView.setActiveCategory($(this));
		storage.saveValue("category", $(this).data("category"));
		getCategory($(this).data("category"));
	});

	function getCategory(category) {
		$.post('/get_category',
			{
				category: category,
				subCategories: config.database[category].filters
			})
		.done((data) => {
			dbView.showDBContent();
			if (data) {
				$("#database_container").html("");
				dbView.addItems(data, category);
				$(".popove").popover();
			}
		})
		.fail(() => {
			dbView.hideDBContent();
		});
	}

});
