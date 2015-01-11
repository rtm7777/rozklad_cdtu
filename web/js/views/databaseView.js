define(['jquery',
		'underscore',
		'../config/config',
		'react',
		'jsx!../components/database'
], ($, _, config, React, DataBase) => {

	var dbContainer = $("#database_container");

	return {

		setActiveCategory($category) {
			$("#database_categories a").removeClass("active");
			$category.addClass("active");
		},

		addItems(data, category) {
			React.render(
				<DataBase categoryFields={config.database[category].fields} />,
				$("#database")[0]
			);
		},

		showDBContent() {
			$("#content_loader").addClass("hide");
			dbContainer.removeClass("hide");
		},

		hideDBContent() {
			dbContainer.addClass("hide");
			$("#content_loader").removeClass("hide");
		},

		addEmptyField(category) {
			dbContainer.find("tbody").prepend(_.template(templates[category], {}));
		}
	};
});
