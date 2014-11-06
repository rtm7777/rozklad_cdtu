define(['jquery',
		'underscore',
		'../config/config',
		'text!templates/dbItems.html',
], function($, _, config, dbItemsTemplate) {
	function setActiveCategory($category) {
		$("#database_categories a").removeClass("active");
		$category.addClass("active");
	}

	function addItems(data, category) {
		var cols = config.database[category];
		console.log(cols);
		$("#database_container").append(_.template(dbItemsTemplate, {
			cols : cols,
			data: data
		}));

	}

	function showDBContent() {
		$("#content_loader").addClass("hide");
		$("#database_container").removeClass("hide");
	}

	function hideDBContent() {
		$("#database_container").addClass("hide");
		$("#content_loader").removeClass("hide");
	}

	return {
		setActiveCategory: setActiveCategory,
		addItems         : addItems,
		showDBContent    : showDBContent,
		hideDBContent    : hideDBContent
	};
});