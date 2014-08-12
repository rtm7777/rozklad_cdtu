define(['jquery',
	
],function($) {

	var storage = localStorage;

	function savePath() {
		storage.setItem("path", "current_path");
	}

	function getPath() {
		storage.getItem("path");
	}

	return {
		savePath: savePath,
		getPath: getPath
	};

});