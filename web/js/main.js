require.config({
	paths: {
		'jquery'    : 'bower_components/jquery/dist/jquery',
		'text'      : 'bower_components/requirejs-text/text',
		'bootstrap' : 'bower_components/bootstrap/dist/js/bootstrap',
		'underscore': 'bower_components/underscore/underscore'
	},
	shim: {
		'bootstrap' : ["jquery"],
		'underscore': ['jquery']
	}
});

require([
	'bootstrap',
	'controllers/initController',
	'controllers/mainController',
	'controllers/contentController',

]);