define(['jquery',
		'underscore',
		'../config/config',
		'text!templates/group.html',
		'text!templates/task.html'
], function($, _, config, groupTemplate, taskTemplate) {

	var $contentDiv = $("#schedule_container");
	var $taskDiv = $("#tasks_container");

	return {
		addGroup: function(group) {
			$contentDiv.append(_.template(groupTemplate, {
				group  : group.shortName,
				groupId: group.id,
				days   : config.days,
				pairs  : config.pairs
			}));
		},

		addTask: function(task) {
			$taskDiv.append(_.template(taskTemplate, {
				id      : task.id,
				subject : task.subject,
				type    : task.type,
				progress: task.progress
			}));
		},

		setPair: function(pair) {
			$("#" + pair.id).html("<div class='admin-sub'>" + pair.subject +"</div><hr class='admin-sub-separator'><div class='admin-sub'></div>");
		},

		setDropdownValue: function($dropdown, $element) {
			$dropdown
				.html($element.text() + ' <span class="caret"></span>')
				.attr("data-filter-id", $element.attr("data-filter-id"));
		},

		showScheduleContent: function() {
			$("#content_loader").addClass("hide");
			$("#day_table_col, #pair_table_col, #schedule_container").removeClass("hide");
		},

		hideScheduleContent: function() {
			$("#content_loader").removeClass("hide");
			$("#day_table_col, #pair_table_col, #schedule_container").addClass("hide");
		},

		setLoaderMessage: function(message) {
			$("#content_loader").text(message);
		},

		showTasksContent: function() {
			$("#tasks_loader").addClass("hide");
			$("#tasks_container").removeClass("hide");
		},

		hideTasksContent: function() {
			$("#tasks_container").addClass("hide");
			$("#tasks_loader").removeClass("hide");
		},

		setTasksMessage: function(message) {
			$("#tasks_loader p").text(message);
		}
	};
});
