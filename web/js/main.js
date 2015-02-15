require.config({
	paths: {
		'jquery'        : 'bower_components/jquery/dist/jquery',
		'text'          : 'bower_components/requirejs-text/text',
		'react'         : 'bower_components/react/react-with-addons',
		"JSXTransformer": "bower_components/react/JSXTransformer",
		'jsx'           : 'jsx',
		'bootstrap'     : 'bower_components/bootstrap/dist/js/bootstrap',
		'underscore'    : 'bower_components/underscore/underscore'
	},
	shim: {
		'bootstrap' : ["jquery"],
	},
	jsx: {
		harmony: true
    }
});

require([
	'bootstrap',
	'libs/socketEvents',
	'controllers/initController',
	'jsx!controllers/initDBController',
	'controllers/mainController',
	'controllers/contentController',
	// 'controllers/dbController',
]);