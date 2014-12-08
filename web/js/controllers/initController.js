define(['jquery',
		'../services/localStorage',
		'../views/contentView',
		'../config/messages',
],function($, storage, contentView, messages) {
	if ($("#page").data("id") == "schedule") {
		var storageFaculty = storage.getValue("faculty");
		var storageYear = storage.getValue("year");
		if (storageFaculty && storageYear) {
			getFacultyGroups(storageFaculty, storageYear);
			contentView.setDropdownValue($("#faculty_sel .dropdown-toggle"), $("#faculty_sel .dropdown-menu a[data-filter-id='" + storageFaculty + "']"));
			contentView.setDropdownValue($("#year_sel .dropdown-toggle"), $("#year_sel .dropdown-menu a[data-filter-id='" + storageYear + "']"));
		}
	}

	$("#faculty_sel .dropdown-menu a").on("click", function() {
		contentView.setDropdownValue($("#faculty_sel .dropdown-toggle"), $(this));
		getFacultyGroups($(this).attr("data-filter-id"), $("#year_sel a.dropdown-toggle").attr("data-filter-id"));
	});

	$("#year_sel .dropdown-menu a").on("click", function() {
		contentView.setDropdownValue($("#year_sel .dropdown-toggle"), $(this));
		getFacultyGroups($("#faculty_sel a.dropdown-toggle").attr("data-filter-id"), $(this).attr("data-filter-id"));
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

	$(document).on('click', function (e) {
		$('[data-toggle="popover"]').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				$(this).popover('hide');
			}
		});
	});
});
