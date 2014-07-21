define(['jquery',
		'underscore',
		'../config/config',
		'text!templates/group.html'
], function($, _, config, groupTemplate) {

	var $contentDiv = $(".schedule-container");

	function addGroup(name) {
		$contentDiv.append(_.template(groupTemplate, {
			group: name,
			days: config.days,
			pairs: config.pairs
		}));
	}
	
	return {
		addGroup: addGroup
	};

});