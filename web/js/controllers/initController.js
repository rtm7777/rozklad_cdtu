define(['jquery',
		'../services/localStorage',
		'../views/contentView',
		'../config/messages',
],function($, storage, contentView, messages) {
	$("#faculty_sel .dropdown-menu a").on("click", function() {
		$("#faculty_sel .dropdown-toggle")
			.html($(this).text() + ' <span class="caret"></span>')
			.attr("data-faculty-id", $(this).data("faculty-id"));

		getFacultyGroups($(this).data("faculty-id"), $("#year_sel a.dropdown-toggle").data("year"));
	});

	$("#year_sel .dropdown-menu a").on("click", function() {
		$("#year_sel .dropdown-toggle")
			.html($(this).text() + '<span class="caret"></span>')
			.attr("data-year", $(this).data("year"));

		getFacultyGroups($("#faculty_sel a.dropdown-toggle").data("faculty-id"), $(this).data("year"));
	});

	function getFacultyGroups(faculty, year) {
		$.post('/get_faculty_groups',
			{
				faculty_id: faculty,
				year: year
			})
		.done(function(data){
			if (data) {
				$("#schedule_container").html("");
				contentView.showScheduleContent();
				for (var group in data) {
					contentView.addGroup(data[group]);
				}
				getFacultySchedule(faculty, year);
				getFacultyTasks(faculty, year);
			} else {
				contentView.hideScheduleContent();
				contentView.setLoaderMessage(messages.noGroupsFound);
				contentView.hideTasksContent();
				contentView.setTasksMessage(messages.noTasksFound);
			}
			storage.saveValue("faculty", faculty);
			storage.saveValue("year", year);
		})
		.fail(function() {
			contentView.hideScheduleContent();
			contentView.setLoaderMessage(messages.loadErr);
		})
		.always(function() {

		});
	}

	function getFacultySchedule(faculty, year) {
		$.post('/get_faculty_schedule',
			{
				faculty_id: faculty,
				year: year
			})
		.done(function(data) {
			for (var pair in data) {
				contentView.setPair(data[pair]);
			}
		})
		.fail(function() {

		});
	}

	function getFacultyTasks(faculty, year) {
		$.post('/get_faculty_tasks',
			{
				faculty_id: faculty,
				year: year
			})
		.done(function(data) {
			if (data) {
				$("#tasks_container").html("");
				contentView.showTasksContent();
				for (var task in data) {
					contentView.addTask(data[task]);
				}
			} else {
				contentView.hideTasksContent();
				contentView.setTasksMessage(messages.noTasksFound);
			}
		})
		.fail(function() {
			contentView.hideTasksContent();
			contentView.setTasksMessage(messages.loadErr);
		});
	}
});
