define(['jquery',
		'underscore',
		'../config/config',
		'text!templates/group.html',
		'text!templates/task.html'
], function($, _, config, groupTemplate, taskTemplate) {

	var $contentDiv = $("#schedule_container");
	var $taskDiv = $("#tasks_container");

	return {
		addGroup(group) {
			$contentDiv.append(_.template(groupTemplate, {
				group  : group.shortName,
				groupId: group.id,
				days   : config.days,
				pairs  : config.pairs
			}));
		},

		addTask(task) {
			$taskDiv.append(_.template(taskTemplate, {
				id      : task.id,
				subject : task.subject,
				type    : task.type,
				progress: task.progress
			}));
		},

		setPair(pair) {
			$("#" + pair.id).html("<div class='admin-sub'>" + pair.subject +"</div><hr class='admin-sub-separator'><div class='admin-sub'></div>");
		},

		setDropdownValue($dropdown, $element) {
			$dropdown
				.html($element.text() + ' <span class="caret"></span>')
				.attr("data-filter-id", $element.attr("data-filter-id"));
		},

		showScheduleContent() {
			$("#content_loader").addClass("hide");
			$("#day_table_col, #pair_table_col, #schedule_container").removeClass("hide");
		},

		hideScheduleContent() {
			$("#content_loader").removeClass("hide");
			$("#day_table_col, #pair_table_col, #schedule_container").addClass("hide");
		},

		setLoaderMessage(message) {
			$("#content_loader").text(message);
		},

		showTasksContent() {
			$("#tasks_loader").addClass("hide");
			$("#tasks_container").removeClass("hide");
		},

		hideTasksContent() {
			$("#tasks_container").addClass("hide");
			$("#tasks_loader").removeClass("hide");
		},

		setTasksMessage(message) {
			$("#tasks_loader p").text(message);
		}
	};
});
