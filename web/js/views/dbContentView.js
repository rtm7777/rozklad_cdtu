define(['jquery',
		'underscore',
		'../config/config',
		'text!templates/dbItems.html',
		'text!templates/db/audience.html',
		'text!templates/db/department.html',
		'text!templates/db/faculty.html',
		'text!templates/db/group.html',
		'text!templates/db/housing.html',
		'text!templates/db/subject.html',
		'text!templates/db/teacher.html',
], function($, _, config, dbItemsTemplate, audienceTmp, departmentTmp, facultyTmp, groupTmp, housingTmp, subjectTmp, teacherTmp) {
	var templates = {
		audience: audienceTmp,
		department: departmentTmp,
		faculty: facultyTmp,
		group: groupTmp,
		housing: housingTmp,
		subject: subjectTmp,
		teacher: teacherTmp
	};
	var dbContainer = $("#database_container");

	return {

		setActiveCategory: function($category) {
			$("#database_categories a").removeClass("active");
			$category.addClass("active");
		},

		addItems: function(data, category) {
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

		showDBContent: function() {
			$("#content_loader").addClass("hide");
			dbContainer.removeClass("hide");
		},

		hideDBContent: function() {
			dbContainer.addClass("hide");
			$("#content_loader").removeClass("hide");
		},

		addEmptyField: function(category) {
			dbContainer.find("tbody").prepend(_.template(templates[category], {}));
		}
	};
});
