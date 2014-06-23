define(['jquery',
		'underscore',
		'text!templates/group.html'
], function($, _, groupTemplate) {

	var $contentDiv = $(".schedule-container");
		console.log($contentDiv);

	function addGroup() {
		$contentDiv.append(_.template(groupTemplate));
	}
	
	return {
		addGroup: addGroup
	};

});