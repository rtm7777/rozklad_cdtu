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

	return {
		setActiveCategory: setActiveCategory
	};
});