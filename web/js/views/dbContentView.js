define(['jquery',
		'underscore',
		'../config/config',
		'text!templates/dbItems.html',
		'text!templates/emptyDBItems.html',
], function($, _, config, dbItemsTemplate, emptyItemTemplate) {
	return {
		setActiveCategory: function($category) {
			$("#database_categories a").removeClass("active");
			$category.addClass("active");
		},

		addItems: function(data, category) {
			$("#database_container").append(_.template(dbItemsTemplate, {
				config: config,
				data: data,
				category: category
			}));
		},

		showDBContent: function() {
			$("#content_loader").addClass("hide");
			$("#database_container").removeClass("hide");
		},

		hideDBContent: function() {
			$("#database_container").addClass("hide");
			$("#content_loader").removeClass("hide");
		},

		addEmptyField: function(category) {
			console.log(category);
			$("#database_container tbody").prepend(_.template(emptyItemTemplate, {
				category: category
			}));
		}
	};
});
