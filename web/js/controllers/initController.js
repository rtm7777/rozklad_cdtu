define(['jquery',
		"../views/contentView",
		'../config/messages',
],function($, contentView, messages) {
	$("#faculty_sel .dropdown-menu a").on("click", function() {
		$("#faculty_sel .dropdown-toggle")
			.html($(this).text() + ' <span class="caret"></span>')
			.attr("data-faculty-id", $(this).attr("data-faculty-id"));

		getFacultyGroups($(this).attr("data-faculty-id"), $("#year_sel a.dropdown-toggle").attr("data-year"));
	});

	$("#year_sel .dropdown-menu a").on("click", function() {
		$("#year_sel .dropdown-toggle")
			.html($(this).text() + ' Курс <span class="caret"></span>')
			.attr("data-year", $(this).attr("data-year"));

		getFacultyGroups($("#faculty_sel a.dropdown-toggle").attr("data-faculty-id"), $(this).attr("data-year"));
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
				// contentView.loadGroupsSchedule(data);
			} else {
				contentView.hideScheduleContent();
				contentView.setLoaderMessage(messages.noGroupsFound);
			}
		})
		.fail(function() {
			contentView.hideScheduleContent();
			contentView.setLoaderMessage(messages.loadErr);
		})
		.always(function() {

		});
	}
});