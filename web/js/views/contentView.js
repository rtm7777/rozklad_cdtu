import config from "../config/config";
import groupTemplate from '../templates/group.html';
import taskTemplate from '../templates/task.html';

let $contentDiv = $("#schedule_container");
let $taskDiv = $("#tasks_container");

export default {
	addGroup(group) {
		$contentDiv.append(groupTemplate({
			group  : group.shortName,
			groupId: group.id,
			days   : config.days,
			pairs  : config.pairs
		}));
	},

	addTask(task) {
		$taskDiv.append(taskTemplate({
			id      : task.id,
			subject : task.subject,
			type    : task.type,
			progress: task.progress
		}));
	},

	setPair(pair) {
		$(`#${pair.id}`).html(`<div class='admin-sub'>${pair.subject}</div><hr class='admin-sub-separator'><div class='admin-sub'></div>`);
	},

	setDropdownValue($dropdown, $element) {
		$dropdown
			.html(`${$element.text()} <span class="caret"></span>`)
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
