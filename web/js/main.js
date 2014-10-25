require.config({
	paths: {
		'jquery'    : 'bower_components/jquery/dist/jquery',
		'text'      : 'bower_components/requirejs-text/text',
		'bootstrap' : 'bower_components/bootstrap/dist/js/bootstrap',
		'underscore': 'bower_components/underscore/underscore'
	},
	shim: {
		'bootstrap' : ["jquery"],
	}
});

require([
	'bootstrap',
	'libs/socketEvents',
	'controllers/initController',
	'controllers/initDBController',
	'controllers/mainController',
	'controllers/contentController',
]);