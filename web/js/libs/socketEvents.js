define(['jquery',
	'../services/socketInterface',
],function($, socket) {


	socket.onopen = function(event) {
		alert("connected");
	};

	socket.onmessage = function(event) {
		alert("message");
	};


});