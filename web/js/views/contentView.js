define(['jquery',
		'underscore',
		'../config/config',
		'text!templates/group.html'
], function($, _, config, groupTemplate) {

	var $contentDiv = $(".schedule-container");

	function addGroup(group) {
		$contentDiv.append(_.template(groupTemplate, {
			group: group.ShortName,
			days: config.days,
			pairs: config.pairs
		}));
	}

	function showScheduleContent() {
		$("#content_loader").addClass("hide");
		$("#day_table_row, #pair_table_row, #schedule_container").removeClass("hide");
	}

	function hideScheduleContent() {
		$("#content_loader").removeClass("hide");
		$("#day_table_row, #pair_table_row, #schedule_container").addClass("hide");
	}

	function setLoaderMessage(message) {
		$("#content_loader").text(message);
	}
	
	return {
		addGroup           : addGroup,
		showScheduleContent: showScheduleContent,
		hideScheduleContent: hideScheduleContent,
		setLoaderMessage   : setLoaderMessage
	};

});