define(['jquery',
		'underscore',
		'../config/config',
		'text!templates/group.html',
		'text!templates/task.html'
], function($, _, config, groupTemplate, taskTemplate) {
	function setActiveCategory($category) {
		$("#database_categories a").removeClass("active");
		$category.addClass("active");
	}

	function addRow(item) {
		$("#database_container").append(item);
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
		addRow           : addRow,
		showDBContent  : showDBContent,
		hideDBContent  : hideDBContent
	};
});