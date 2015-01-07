define(['jquery',
		'underscore',
		'../config/config',
		'text!templates/dbItems.html',
		'text!templates/db/audiences.html',
		'text!templates/db/departments.html',
		'text!templates/db/faculties.html',
		'text!templates/db/groups.html',
		'text!templates/db/housings.html',
		'text!templates/db/subjects.html',
		'text!templates/db/teachers.html',
], ($, _, config, dbItemsTemplate, audienceTmp, departmentTmp, facultyTmp, groupTmp, housingTmp, subjectTmp, teacherTmp) => {
	var templates = {
		audiences: audienceTmp,
		departments: departmentTmp,
		faculties: facultyTmp,
		groups: groupTmp,
		housings: housingTmp,
		subjects: subjectTmp,
		teachers: teacherTmp
	};
	var dbContainer = $("#database_container");

	return {

		setActiveCategory($category) {
			$("#database_categories a").removeClass("active");
			$category.addClass("active");
		},

		addItems(data, category) {
			dbContainer.append(_.template(dbItemsTemplate, {
				category: category,
				config: config
			}));
			for (var item in data.items) {
				dbContainer.find("tbody").append(_.template(templates[category], {
					item: data.items[item]
				}));
			}
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
