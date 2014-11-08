define(['jquery',
		'underscore',
		'../config/config',
		'text!templates/group.html',
		'text!templates/task.html'
], function($, _, config, groupTemplate, taskTemplate) {

	var $contentDiv = $("#schedule_container");
	var $taskDiv = $("#tasks_container");

	function addGroup(group) {
		$contentDiv.append(_.template(groupTemplate, {
			group  : group.shortName,
			groupId: group.id,
			days   : config.days,
			pairs  : config.pairs
		}));
	}

	function addTask(task) {
		$taskDiv.append(_.template(taskTemplate, {
			id      : task.id,
			subject : task.subject,
			type    : task.type,
			progress: task.progress
		}));
	}

	function setPair(pair) {
		$("#" + pair.id).html("<div class='admin-sub'>" + pair.subject +"</div><hr class='admin-sub-separator'><div class='admin-sub'></div>");
	}

	function setDropdownValue($dropdown, $element) {
		$dropdown
			.html($element.text() + ' <span class="caret"></span>')
			.attr("data-filter-id", $element.attr("data-filter-id"));
	}

	function showScheduleContent() {
		$("#content_loader").addClass("hide");
		$("#day_table_col, #pair_table_col, #schedule_container").removeClass("hide");
	}

	function hideScheduleContent() {
		$("#content_loader").removeClass("hide");
		$("#day_table_col, #pair_table_col, #schedule_container").addClass("hide");
	}

	function setLoaderMessage(message) {
		$("#content_loader").text(message);
	}

	function showTasksContent() {
		$("#tasks_loader").addClass("hide");
		$("#tasks_container").removeClass("hide");
	}

	function hideTasksContent() {
		$("#tasks_container").addClass("hide");
		$("#tasks_loader").removeClass("hide");
	}

	function setTasksMessage(message) {
		$("#tasks_loader p").text(message);
	}

	return {
		addGroup           : addGroup,
		addTask            : addTask,
		setPair            : setPair,
		setDropdownValue   : setDropdownValue,
		showScheduleContent: showScheduleContent,
		hideScheduleContent: hideScheduleContent,
		setLoaderMessage   : setLoaderMessage,
		showTasksContent   : showTasksContent,
		hideTasksContent   : hideTasksContent,
		setTasksMessage    : setTasksMessage
	};

});